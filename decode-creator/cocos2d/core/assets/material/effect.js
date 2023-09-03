"use strict";
// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const effect_base_1 = __importDefault(require("./effect-base"));
class Effect extends effect_base_1.default {
    get technique() {
        return this._technique;
    }
    get passes() {
        return this._technique.passes;
    }
    /**
     * @param {Array} techniques
     */
    constructor(name, techniques, techniqueIndex, asset) {
        super();
        this._techniques = [];
        this._asset = null;
        this.init(name, techniques, techniqueIndex, asset, true);
    }
    init(name, techniques, techniqueIndex, asset, createNative) {
        this._name = name;
        this._techniques = techniques;
        this._technique = techniques[techniqueIndex];
        this._asset = asset;
    }
    switchTechnique(index) {
        if (index >= this._techniques.length) {
            cc.warn(`Can not switch to technique with index [${index}]`);
            return;
        }
        this._technique = this._techniques[index];
    }
    clear() {
        this._techniques = [];
    }
    clone() {
        let techniques = [];
        for (let i = 0; i < this._techniques.length; i++) {
            techniques.push(this._techniques[i].clone());
        }
        let techniqueIndex = this._techniques.indexOf(this._technique);
        return new Effect(this._name, techniques, techniqueIndex, this._asset);
    }
}
exports.default = Effect;
cc.Effect = Effect;
