import React from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '@/pages/Home';

const rootRoutes: RouteObject = {
  path: '/',
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: 'about',
      element: <div>About</div>,
    },
  ],
};

export default rootRoutes;
