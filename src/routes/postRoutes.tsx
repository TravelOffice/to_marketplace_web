import React from 'react';
import { RouteObject } from 'react-router-dom';

const postRoutes: RouteObject = {
  path: 'posts',
  children: [
    {
      index: true,
      async lazy() {
        const Component = await import('@/pages/Posts/List');
        return { Component: Component.default };
      },
    },
    {
      path: ':postId',
      element: <div>Post</div>,
    },
  ],
};

export default postRoutes;
