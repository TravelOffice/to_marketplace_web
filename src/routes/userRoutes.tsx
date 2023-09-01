import { RouteObject } from 'react-router-dom';

const userRoutes: RouteObject = {
  path: 'users',
  children: [
    {
      path: ':userId',
      async lazy() {
        const Component = await import('@/pages/Me/Profile');
        return { Component: Component.default };
      },
    },
  ],
};

export default userRoutes;
