import * as Types from "../types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type AllPostsQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  limit?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
}>;

export type AllPostsQuery = {
  __typename?: "Query";
  listPosts: {
    __typename?: "PostConnection";
    edges: Array<{
      __typename?: "PostEdge";
      cursor: string;
      node: {
        __typename?: "Post";
        id: string;
        title: string;
        body: string;
        created_at: string;
      };
    }>;
    pageInfo: {
      __typename?: "PageInfo";
      endCursor?: string | null;
      startCursor?: string | null;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    };
  };
};

export const AllPostsDocument = gql`
  query AllPosts($cursor: String = null, $limit: Int = 10) {
    listPosts(cursor: $cursor, limit: $limit) {
      edges {
        cursor
        node {
          id
          title
          body
          created_at
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAllPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(
    AllPostsDocument,
    options,
  );
}
export function useAllPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllPostsQuery,
    AllPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(
    AllPostsDocument,
    options,
  );
}
export function useAllPostsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    AllPostsQuery,
    AllPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AllPostsQuery, AllPostsQueryVariables>(
    AllPostsDocument,
    options,
  );
}
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<
  typeof useAllPostsLazyQuery
>;
export type AllPostsSuspenseQueryHookResult = ReturnType<
  typeof useAllPostsSuspenseQuery
>;
export type AllPostsQueryResult = Apollo.QueryResult<
  AllPostsQuery,
  AllPostsQueryVariables
>;
