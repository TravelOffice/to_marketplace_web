import React from 'react';
import { RouteObject } from 'react-router-dom';
import meRoutes from '@/routes/meRoutes';
import postRoutes from './postRoutes';
import rootRoutes from './rootRoutes';

const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <div>404 Not Found</div>,
    children: [
      rootRoutes,
      postRoutes,
      meRoutes,
    ],
  },
];

export default routes;
