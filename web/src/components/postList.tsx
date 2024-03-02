import React from "react";
import Post from './post';
import { Post as PostData } from '../rpc/types';

type PostListParams = {
    posts: PostData[] | undefined;
    loading: boolean;
}

function PostList({ posts, loading }: PostListParams) {

  return <>
    { loading || posts === undefined ?
      <em>Loading...</em> :
      <ol>
        {posts.map((post, index) => 
          <li key={`post_${index}`}>
            <Post {...post}/>
          </li>
        )}
      </ol>
    }
  </>;
}

export default PostList;