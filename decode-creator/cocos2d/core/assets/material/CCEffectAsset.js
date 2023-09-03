"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CCAsset_1 = __importDefault(require("../CCAsset"));
const effect_parser_1 = require("./effect-parser");
/**
 * !#en Effect Asset.
 * !#zh Effect 资源类型。
 * @class EffectAsset
 * @extends Asset
 */
let EffectAsset = cc.Class({
    name: 'cc.EffectAsset',
    extends: CCAsset_1.default,
    ctor() {
        this._effect = null;
    },
    properties: {
        properties: Object,
        techniques: [],
        shaders: []
    },
    onLoad() {
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
            return;
        }
        return;
        let lib = cc.renderer._forward?._programLib;
        
        for (let i = 0; i < this.shaders.length; i++) {
            lib.define(this.shaders[i]);
        }
        this._initEffect();
    },
    _initEffect() {
        if (this._effect)
            return;
        this._effect = (0, effect_parser_1.parseEffect)(this);
        Object.freeze(this._effect);
    },
    getInstantiatedEffect() {
        this._initEffect();
        return this._effect.clone();
    },
    getEffect() {
        this._initEffect();
        return this._effect;
    }
});
module.exports = cc.EffectAsset = EffectAsset;
