"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.put = exports.post = exports.get = void 0;
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetaDataKeys_1 = require("./MetaDataKeys");
function routerBinder(method) {
    // factory decorator - A decorator that return a function
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetaDataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetaDataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.get = routerBinder(Methods_1.Methods.get);
exports.post = routerBinder(Methods_1.Methods.post);
exports.put = routerBinder(Methods_1.Methods.put);
exports.del = routerBinder(Methods_1.Methods.del);
exports.patch = routerBinder(Methods_1.Methods.patch);
