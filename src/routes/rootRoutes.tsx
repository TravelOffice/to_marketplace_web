import React from 'react';
import { RouteObject } from 'react-router-dom';

const rootRoutes: RouteObject = {
  path: '/',
  children: [
    {
      index: true,
      async lazy() {
        const Component = await import('@/pages/Dashboard');
        return { Component: Component.default };
      },
    },
    {
      path: 'about',
      element: <div>About</div>,
    },
  ],
};

export default rootRoutes;
