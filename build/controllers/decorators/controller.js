"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function bodyValidators(keys) {
    return function (req, res, next) {
        // check any keys in the req.body that exist
        // If there aren't any, response with an error,
        // Else, call the next function
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send("Missing property " + key);
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) || [];
            var requireBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validator, target.prototype, key) || [];
            var validator = bodyValidators(requireBodyProps);
            // only attempt to associate a route handler with the router if we have successfully found a path property
            if (path) {
                router[method].apply(router, __spreadArrays(["" + routePrefix + path], middlewares, [validator, routeHandler]));
            }
        }
    };
}
exports.controller = controller;
