"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pool {
    constructor() {
        this.enabled = false;
        this.count = 0;
        this.maxSize = 1024;
    }
    get() {
    }
    put() {
    }
    clear() {
    }
}
exports.default = Pool;
cc.pool = {};
Pool.register = function (name, pool) {
    cc.pool[name] = pool;
};
