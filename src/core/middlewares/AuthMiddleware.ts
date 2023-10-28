import { TokenManager } from 'src/core/utils';
import { NavigationGuardNext, RouteLocation } from 'vue-router';

export const auth = ({
  to,
  next,
}: {
  to: RouteLocation;
  from: RouteLocation;
  next: NavigationGuardNext;
}) => {
  console.log(to.fullPath);
  if (!TokenManager.hasToken()) {
    next('/login');
    return false;
  } else {
    next();
  }
};
