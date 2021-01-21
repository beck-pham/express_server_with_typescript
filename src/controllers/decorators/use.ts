import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || []; // initiate empty [] for undefined case
    //middlewares.push(middleware);
    Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key) // take that middleware as an array and assign it back to the metadata object
  }
}