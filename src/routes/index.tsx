import React from 'react';
import { RouteObject } from 'react-router-dom';
import meRoutes from '@/routes/meRoutes';
import Root from '@/pages/Root';
import onboardingRoutes from '@/routes/onboardingRoutes';
import userRoutes from '@/routes/userRoutes';
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
      userRoutes,
    ],
  },
  {
    ...onboardingRoutes,
  },
];

export default routes;
