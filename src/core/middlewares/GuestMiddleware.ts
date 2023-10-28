import { TokenManager } from 'src/core/utils';
import { NavigationGuardNext, RouteLocation } from 'vue-router';

export const guest = ({
  to,
  from,
  next,
}: {
  to: RouteLocation;
  from: RouteLocation;
  next: NavigationGuardNext;
}) => {
  if (TokenManager.hasToken() && from.path != to.path) {
    next('/');
  } else {
    next();
  }
};
