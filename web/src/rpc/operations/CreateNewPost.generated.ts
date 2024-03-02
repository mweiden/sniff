import * as Types from "../types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type CreateNewPostMutationVariables = Types.Exact<{
  title: Types.Scalars["String"]["input"];
  body: Types.Scalars["String"]["input"];
}>;

export type CreateNewPostMutation = {
  __typename?: "Mutation";
  createPost: {
    __typename?: "PostResult";
    success: boolean;
    errors?: Array<string> | null;
    post: {
      __typename?: "Post";
      id: string;
      title: string;
      body: string;
      created_at: string;
    };
  };
};

export const CreateNewPostDocument = gql`
  mutation CreateNewPost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      post {
        id
        title
        body
        created_at
      }
      success
      errors
    }
  }
`;
export type CreateNewPostMutationFn = Apollo.MutationFunction<
  CreateNewPostMutation,
  CreateNewPostMutationVariables
>;

/**
 * __useCreateNewPostMutation__
 *
 * To run a mutation, you first call `useCreateNewPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewPostMutation, { data, loading, error }] = useCreateNewPostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateNewPostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewPostMutation,
    CreateNewPostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNewPostMutation,
    CreateNewPostMutationVariables
  >(CreateNewPostDocument, options);
}
export type CreateNewPostMutationHookResult = ReturnType<
  typeof useCreateNewPostMutation
>;
export type CreateNewPostMutationResult =
  Apollo.MutationResult<CreateNewPostMutation>;
export type CreateNewPostMutationOptions = Apollo.BaseMutationOptions<
  CreateNewPostMutation,
  CreateNewPostMutationVariables
>;
