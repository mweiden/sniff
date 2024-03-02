export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: PostResult;
  deletePost: PostResult;
  updatePost: PostResult;
};

export type MutationCreatePostArgs = {
  body: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationDeletePostArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdatePostArgs = {
  body?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * The specification includes the pagination metadata
 * in a common type.
 */
export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type Post = {
  __typename?: "Post";
  body: Scalars["String"]["output"];
  created_at: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
};

/**
 * This wrapper type contains the list of "edges" and
 * pagination metadata.
 */
export type PostConnection = {
  __typename?: "PostConnection";
  edges: Array<PostEdge>;
  pageInfo: PageInfo;
};

/**
 * The "edge" wrapper contains metadata about the item in the
 * list. By default it's just a cursor indicating the position
 * of the item in the list, but additional metadata is allowed.
 */
export type PostEdge = {
  __typename?: "PostEdge";
  cursor: Scalars["String"]["output"];
  /** The "node" is the actual item in the list. */
  node: Post;
};

export type PostResult = {
  __typename?: "PostResult";
  errors?: Maybe<Array<Scalars["String"]["output"]>>;
  post: Post;
  success: Scalars["Boolean"]["output"];
};

export type Query = {
  __typename?: "Query";
  getPost: PostResult;
  listPosts: PostConnection;
};

export type QueryGetPostArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryListPostsArgs = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  limit: Scalars["Int"]["input"];
};
