"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorKey = void 0;
var MetadataKeys_1 = require("./MetadataKeys");
function validatorKey() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.validator, keys, target, key);
    };
}
exports.validatorKey = validatorKey;
//validatorKey('email', 'password', 'passwordConfimation', ...)
