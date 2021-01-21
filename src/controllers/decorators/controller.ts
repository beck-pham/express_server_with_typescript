import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { NextFunction, RequestHandler, Request, Response } from 'express';

function bodyValidators(keys: string): RequestHandler { // this is a function that builds up the individual validation middle
  return function(req: Request, res: Response, next: NextFunction) {
    // check any keys in the req.body that exist
    // If there aren't any, response with an error,
    // Else, call the next function
    if(!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }
    
    next();
  }
}

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();
    
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
      const requireBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];

      const validator = bodyValidators(requireBodyProps)
      // only attempt to associate a route handler with the router if we have successfully found a path property
      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler)
      }
    }
  };
}