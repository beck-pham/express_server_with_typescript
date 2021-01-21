"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.put = exports.post = exports.get = void 0;
require("reflect-metadata");
function routerBinder(method) {
    // factory decorator - A decorator that return a function
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', method, target, key);
        };
    };
}
exports.get = routerBinder('get');
exports.post = routerBinder('post');
exports.put = routerBinder('put');
exports.del = routerBinder('del');
exports.patch = routerBinder('patch');
