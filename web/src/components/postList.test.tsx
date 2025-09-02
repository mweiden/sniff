import React from 'react';
import { render, screen } from '@testing-library/react';
import PostList from './postList';
import { Post as PostData } from '../rpc/types';

test('maintains element identity when post order changes', () => {
  const posts: PostData[] = [
    { id: '1', title: 'First', body: 'Body1', created_at: '2023-01-01' },
    { id: '2', title: 'Second', body: 'Body2', created_at: '2023-01-02' },
  ];

  const { rerender } = render(<PostList posts={posts} loading={false} />);

  const firstNodeInitial = screen.getByText('First').closest('li');
  const secondNodeInitial = screen.getByText('Second').closest('li');

  rerender(<PostList posts={[posts[1], posts[0]]} loading={false} />);

  const firstNodeAfter = screen.getByText('First').closest('li');
  const secondNodeAfter = screen.getByText('Second').closest('li');

  expect(firstNodeAfter).toBe(firstNodeInitial);
  expect(secondNodeAfter).toBe(secondNodeInitial);
});

