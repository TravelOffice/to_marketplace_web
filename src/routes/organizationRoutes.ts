import { RouteObject } from 'react-router-dom';

const organizationRoutes: RouteObject = {
  path: '/organizations',
  children: [
    {
      index: true,
      async lazy() {
        const OrganizationList = await import('@/pages/Organization/OrganizationList');
        return { Component: OrganizationList.default };
      },
    },
    {
      path: ':organizationId',
      async lazy() {
        const Component = await import('@/pages/Organization/Profile');
        return { Component: Component.default };
      },
    },
  ],
};

export default organizationRoutes;
