import { RouteObject } from 'react-router-dom';

const meRoutes: RouteObject = {
  path: 'me',
  children: [
    {
      path: 'profile',
      async lazy() {
        const Component = await import('@/pages/Me/Profile');
        return { Component: Component.default };
      },
    },
    {
      path: 'organization',
      async lazy() {
        const Component = await import('@/pages/Me/Organization');
        return { Component: Component.default };
      },
    },
  ],
};

export default meRoutes;
