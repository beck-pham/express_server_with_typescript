import 'reflect-metadata';
import express from 'express';

export const router = express.Router();

export function controller(routePrefix: string) {
  return function(target: Function) {
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