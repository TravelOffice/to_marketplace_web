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
      path: 'create',
      async lazy() {
        const Component = await import('@/pages/Posts/Create');
        return { Component: Component.default };
      },
    },
    {
      path: ':postId',
      async lazy() {
        const Component = await import('@/pages/Posts/Detail');
        return { Component: Component.default };
      },
    },
  ],
};

export default postRoutes;
