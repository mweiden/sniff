import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import { AllPostsDocument } from './rpc/operations/AllPosts.generated';

test('renders app title', () => {
  const mocks = [
    {
      request: {
        query: AllPostsDocument,
        variables: { cursor: null, limit: 10 },
      },
      result: {
        data: {
          listPosts: {
            edges: [],
            pageInfo: {
              endCursor: null,
              startCursor: null,
              hasPreviousPage: false,
              hasNextPage: false,
            },
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>,
  );

  expect(screen.getByText(/sniff/i)).toBeInTheDocument();
});

