import { MetadataKeys } from './MetadataKeys';

export function validatorKey(...keys: string[]) { // decorator that accepts a list of strings.
  return function(target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key)
  };
}

//validatorKey('email', 'password', 'passwordConfimation', ...)