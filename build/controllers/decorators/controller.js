"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetaDataKeys_1 = require("./MetaDataKeys");
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetaDataKeys_1.MetadataKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetaDataKeys_1.MetadataKeys.method, target.prototype, key);
            // only attempt to associate a route handler with the router if we have successfully found a path property
            if (path) {
                router[method]("" + routePrefix + path, routeHandler);
            }
        }
    };
}
exports.controller = controller;
