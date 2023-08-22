import { RouteObject } from 'react-router-dom';

const onboardingRoutes: RouteObject = {
  path: 'onboarding',
  children: [
    {
      index: true,
      async lazy() {
        const Component = await import('@/pages/Onboarding/index');
        return { Component: Component.default };
      },
    },
    {
      path: 'term-of-conditions',
      async lazy() {
        const Component = await import('@/pages/Onboarding/TermOfConditions');
        return { Component: Component.default };
      },
    },
  ],
};

export default onboardingRoutes;
