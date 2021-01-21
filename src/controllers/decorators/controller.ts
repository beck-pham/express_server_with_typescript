import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';


export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();
    
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata('path', target.prototype, key);
      // only attempt to associate a route handler with the router if we have successfully found a path property
      if (path) {
        router.get(`${routePrefix}${path}`, routeHandler)
      }
    }
  };
}