"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const timsort_1 = __importDefault(require("./timsort"));
/**
 * Recycle Pool
 * @class RecyclePool
 */
class RecyclePool {
    constructor(fn, size) {
        this._fn = fn;
        this._count = 0;
        this._data = new Array(size);
        for (let i = 0; i < size; ++i) {
            this._data[i] = fn();
        }
    }
    get length() {
        return this._count;
    }
    get data() {
        return this._data;
    }
    reset() {
        this._count = 0;
    }
    resize(size) {
        if (size > this._data.length) {
            for (let i = this._data.length; i < size; ++i) {
                this._data[i] = this._fn();
            }
        }
    }
    add() {
        if (this._count >= this._data.length) {
            this.resize(this._data.length * 2);
        }
        return this._data[this._count++];
    }
    remove(idx) {
        if (idx >= this._count) {
            return;
        }
        let last = this._count - 1;
        let tmp = this._data[idx];
        this._data[idx] = this._data[last];
        this._data[last] = tmp;
        this._count -= 1;
    }
    sort(cmp) {
        return (0, timsort_1.default)(this._data, 0, this._count, cmp);
    }
}
exports.default = RecyclePool;
cc.RecyclePool = RecyclePool;
