import React from 'react';
import { RouteObject } from 'react-router-dom';

const postRoutes: RouteObject = {
  path: 'posts',
  children: [
    {
      index: true,
      element: <div>Posts</div>,
    },
    {
      path: ':postId',
      element: <div>Post</div>,
    },
  ],
};

export default postRoutes;
