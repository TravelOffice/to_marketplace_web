import React from 'react';
import { RouteObject } from 'react-router-dom';
import meRoutes from '@/routes/meRoutes';
import Root from '@/pages/Root';
import postRoutes from './postRoutes';
import rootRoutes from './rootRoutes';

const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <div>404 Not Found</div>,
    element: <Root />,
    children: [
      rootRoutes,
      postRoutes,
      meRoutes,
    ],
  },
];

export default routes;
