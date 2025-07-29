"use client";

//Components
import { FilterTable } from "@/components/filters/filter-table";
import { columns } from "@/components/table/column";
import { DataTable } from "@/components/table/data-table";

//Icons
import { LoaderCircle } from "lucide-react";

//GraphQL hooks
import { useGetMembers } from "@/graphQL/hooks";

//global state
import { useFilterState } from "@/store/filter-store";

export function MemberTable() {
  const { members, loading } = useGetMembers();
  const {
    filterMemberList,
    nameList,
    emailList,
    verificationStatusList,
    mobileNumberList,
    domainList,
    dateRegistered,
    StatusList,
    dateTimeLastActiveFrom,
    dateTimeLastActiveTo
  } = useFilterState();

  const hasActiveFilters =
    nameList.length > 0 ||
    emailList.length > 0 ||
    verificationStatusList !== "" ||
    mobileNumberList.length > 0 ||
    domainList.length > 0 ||
    dateRegistered.from != "" ||
    dateRegistered.to != "" ||
    StatusList !== "" ||
    dateTimeLastActiveFrom != "" ||
    dateTimeLastActiveTo != "";

  const membersData = hasActiveFilters ? filterMemberList : members;

  return (
    <div className="rounded-md border-2">
      <FilterTable members={members} />
      {loading ? (
        <div className="bg-table text-muted-foreground flex h-12 items-center justify-center gap-2">
          <LoaderCircle className="-ms-2 animate-spin" strokeWidth={3} />
          <span>Loading data. Please wait...</span>
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={membersData} />
        </>
      )}
    </div>
  );
}
