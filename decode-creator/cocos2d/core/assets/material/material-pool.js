"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./utils"));
const pool_1 = __importDefault(require("../../utils/pool"));
/**
 * {
 *   effectUuid: {
 *     defineSerializeKey: []
 *   }
 * }
 */
class MaterialPool extends pool_1.default {
    constructor() {
        super(...arguments);
        // default disabled material pool
        this.enabled = false;
        this._pool = {};
    }
    get(exampleMat, renderComponent) {
        let pool = this._pool;
        if (exampleMat instanceof cc.MaterialVariant) {
            if (exampleMat._owner) {
                if (exampleMat._owner === renderComponent) {
                    return exampleMat;
                }
                else {
                    exampleMat = exampleMat.material;
                }
            }
            else {
                exampleMat._owner = renderComponent;
                return exampleMat;
            }
        }
        let instance;
        if (this.enabled) {
            let uuid = exampleMat.effectAsset._uuid;
            if (pool[uuid]) {
                let key = utils_1.default.serializeDefines(exampleMat._effect._defines) +
                    utils_1.default.serializeTechniques(exampleMat._effect._techniques);
                instance = pool[uuid][key] && pool[uuid][key].pop();
            }
        }
        if (!instance) {
            instance = new cc.MaterialVariant(exampleMat);
            instance._name = exampleMat._name + ' (Instance)';
            instance._uuid = exampleMat._uuid;
        }
        else {
            this.count--;
        }
        instance._owner = renderComponent;
        return instance;
    }
    put(mat) {
        if (!this.enabled || !mat._owner) {
            return;
        }
        let pool = this._pool;
        let uuid = mat.effectAsset._uuid;
        if (!pool[uuid]) {
            pool[uuid] = {};
        }
        let key = utils_1.default.serializeDefines(mat._effect._defines) +
            utils_1.default.serializeTechniques(mat._effect._techniques);
        if (!pool[uuid][key]) {
            pool[uuid][key] = [];
        }
        if (this.count > this.maxSize)
            return;
        this._clean(mat);
        pool[uuid][key].push(mat);
        this.count++;
    }
    clear() {
        this._pool = {};
        this.count = 0;
    }
    _clean(mat) {
        mat._owner = null;
    }
}
let materialPool = new MaterialPool();
pool_1.default.register('material', materialPool);
exports.default = materialPool;
