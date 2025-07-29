"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MEMBERS, GET_VERIFICATION_STATUS, GET_STATUS } from "@/graphQL/queries";
import { Member, MemberEdges } from "@/lib/types";

export function useGetMembers() {
  const { data, loading, fetchMore } = useQuery(GET_MEMBERS, {
    variables: { first: 500 },
    fetchPolicy: "cache-and-network"
  });

  const [members, setMembers] = useState<Member[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialFetched, setInitialFetched] = useState(false);

  useEffect(() => {
    if (data?.members && !initialFetched) {
      const newMembers = data.members.edges.map((edge: MemberEdges) => edge.node);
      setMembers(newMembers);
      setCursor(data.members.pageInfo.endCursor);
      setHasMore(data.members.pageInfo.hasNextPage);
      setInitialFetched(true);
    }
  }, [data, initialFetched]);

  useEffect(() => {
    const fetchRemaining = async () => {
      if (!loading && hasMore && cursor) {
        const { data: moreData } = await fetchMore({
          variables: { first: 500, after: cursor }
        });

        const newMembers = moreData.members.edges.map((edge: MemberEdges) => edge.node);
        setMembers((prev) => [...prev, ...newMembers]);

        const pageInfo = moreData.members.pageInfo;
        setCursor(pageInfo.endCursor);
        setHasMore(pageInfo.hasNextPage);
      }
    };

    fetchRemaining();
  }, [cursor, hasMore, loading, fetchMore]);

  return { members, loading };
}

export function useGetVerificationStatus() {
  const { data, loading } = useQuery(GET_VERIFICATION_STATUS, {
    variables: { first: 500 },
    fetchPolicy: "cache-and-network"
  });

  let verificationStatus = [];

  if (!loading) {
    verificationStatus = data?.__type?.enumValues;
  }

  return { verificationStatus };
}

export function useGetStatus() {
  const { data, loading } = useQuery(GET_STATUS, {
    variables: { first: 500 },
    fetchPolicy: "cache-and-network"
  });

  let status = [];

  if (!loading) {
    status = data?.__type?.enumValues;
  }

  return { status };
}
