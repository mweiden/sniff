import React from 'react';
import './App.css';
import PostForm from './components/postForm';
import PostList from './components/postList';
import { useAllPostsQuery } from './rpc/operations/AllPosts.generated';

import { styled } from "styled-components";

const AppContainer = styled.div`
  padding: 10px 25px 0px 25px;
  display: grid;
  grid-template-columns: [left-start] 500px [left-end] 40px [right-start] auto [right-end];
  grid-template-rows: [top] 75px [title-end] auto [bottom];

  font-family: 'Courier New', monospace;
`;

const AppTitle = styled.div`
  grid-column-start: left-start;
  grid-column-end: right-end;
  grid-row-start: top;
  grid-row-end: title-end;
  > h1 {
    margin-top: 10px;
    font-size: 3em;
  }
`;

const AppLeftPane = styled.div`
  grid-column-start: left-start;
  grid-column-end: left-end;
  grid-row-start: title-end;
  grid-row-end: bottom;
`;

const AppRightPane = styled.div`
  grid-column-start: right-start;
  grid-column-end: right-end;
  grid-row-start: title-end;
  grid-row-end: bottom;
`;

function App() {
  const { data, loading, refetch } = useAllPostsQuery();

  return (
    <AppContainer>
      <AppTitle>
        <h1>sniff 🐕‍🦺</h1>
      </AppTitle>
      <AppLeftPane>
        <h2>Post</h2>
        <PostForm onSubmit={() => setTimeout(refetch, 500)}/>
      </AppLeftPane>
      <AppRightPane>
        <h2>Read</h2>
        <PostList
          loading={loading}
          posts={data?.listPosts.edges.map(edge => edge.node) || []}
        />
      </AppRightPane>
    </AppContainer>
  );
}

export default App;
