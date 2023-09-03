"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPow2 = void 0;
function isPow2(v) {
    return !(v & (v - 1)) && (!!v);
}
exports.isPow2 = isPow2;
