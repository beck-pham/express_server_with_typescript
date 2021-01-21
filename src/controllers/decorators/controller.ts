import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetaDataKeys';

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();
    
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      // only attempt to associate a route handler with the router if we have successfully found a path property
      if (path) {
        router[method](`${routePrefix}${path}`, routeHandler)
      }
    }
  };
}