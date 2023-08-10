import React from 'react';
import { RouteObject } from 'react-router-dom';
import postRoutes from './postRoutes';
import rootRoutes from './rootRoutes';

const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <div>404 Not Found</div>,
    children: [
      rootRoutes,
      postRoutes,
    ],
  },
];

export default routes;
