"use client";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphQL/apollo-client";

interface ApolloProviderProps {
  children: React.ReactNode;
}

export function ApolloProviderWrapper({ children }: ApolloProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
