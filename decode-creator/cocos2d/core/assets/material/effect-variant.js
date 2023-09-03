"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const murmurhash2_gc_1 = __importDefault(require("../../../renderer/murmurhash2_gc"));
const utils_1 = __importDefault(require("./utils"));
const effect_base_1 = __importDefault(require("./effect-base"));
const gfx = cc.gfx;
class EffectVariant extends effect_base_1.default {
    get effect() {
        return this._effect;
    }
    get name() {
        return this._effect && (this._effect.name + ' (variant)');
    }
    get passes() {
        return this._passes;
    }
    get stagePasses() {
        return this._stagePasses;
    }
    constructor(effect) {
        super();
        this._passes = [];
        this._stagePasses = {};
        this._hash = 0;
        this.init(effect);
    }
    _onEffectChanged() {
    }
    init(effect) {
        if (effect instanceof EffectVariant) {
            effect = effect.effect;
        }
        this._effect = effect;
        this._dirty = true;
        if (effect) {
            let passes = effect.passes;
            let variantPasses = this._passes;
            variantPasses.length = 0;
            let stagePasses = this._stagePasses = {};
            for (let i = 0; i < passes.length; i++) {
                let variant = variantPasses[i] = Object.setPrototypeOf({}, passes[i]);
                variant._properties = Object.setPrototypeOf({}, passes[i]._properties);
                variant._defines = Object.setPrototypeOf({}, passes[i]._defines);
                if (!stagePasses[variant._stage]) {
                    stagePasses[variant._stage] = [];
                }
                stagePasses[variant._stage].push(variant);
            }
        }
    }
    updateHash(hash) {
    }
    getHash() {
        if (!this._dirty)
            return this._hash;
        this._dirty = false;
        let hash = '';
        hash += utils_1.default.serializePasses(this._passes);
        let effect = this._effect;
        if (effect) {
            hash += utils_1.default.serializePasses(effect.passes);
        }
        this._hash = (0, murmurhash2_gc_1.default)(hash, 666);
        this.updateHash(this._hash);
        return this._hash;
    }
}
exports.default = EffectVariant;
cc.EffectVariant = EffectVariant;
