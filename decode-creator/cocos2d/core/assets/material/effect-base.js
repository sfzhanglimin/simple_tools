"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pass_1 = __importDefault(require("../../../renderer/core/pass"));
const enums_1 = __importDefault(require("../../../renderer/enums"));
const gfx = cc.gfx;
class EffectBase {
    constructor() {
        this._dirty = true;
        this._name = '';
        this._technique = null;
    }
    get name() {
        return this._name;
    }
    get technique() {
        return this._technique;
    }
    get passes() {
        return [];
    }
    _createPassProp(name, pass) {
        let prop = pass._properties[name];
        if (!prop) {
            return;
        }
        let uniform = Object.create(null);
        uniform.name = name;
        uniform.type = prop.type;
        if (prop.value instanceof Float32Array) {
            uniform.value = new Float32Array(prop.value);
        }
        else if (prop.value instanceof Float64Array) {
            uniform.value = new Float64Array(prop.value);
        }
        else {
            uniform.value = prop.value;
        }
        pass._properties[name] = uniform;
        return uniform;
    }
    _setPassProperty(name, value, pass, directly) {
        let properties = pass._properties;
        if (!properties.hasOwnProperty(name)) {
            this._createPassProp(name, pass);
        }
        let prop = properties[name];
        let compareValue = value;
        if (prop.type === enums_1.default.PARAM_TEXTURE_2D) {
            compareValue = value && value.getImpl();
        }
        if (prop.value === compareValue) {
            return true;
        }
        this._dirty = true;
        return pass_1.default.prototype.setProperty.call(pass, name, value, directly);
    }
    setProperty(name, value, passIdx, directly) {
        let success = false;
        let passes = this.passes;
        let start = 0, end = passes.length;
        if (passIdx !== undefined) {
            start = passIdx, end = passIdx + 1;
        }
        for (let i = start; i < end; i++) {
            if (this._setPassProperty(name, value, passes[i], directly)) {
                success = true;
            }
        }
        if (!success) {
            cc.warnID(9103, this.name, name);
        }
    }
    getProperty(name, passIdx) {
        let passes = this.passes;
        if (passIdx >= passes.length)
            return;
        let start = 0, end = passes.length;
        if (passIdx !== undefined) {
            start = passIdx, end = passIdx + 1;
        }
        for (let i = start; i < end; i++) {
            let value = passes[i].getProperty(name);
            if (value !== undefined) {
                return value;
            }
        }
    }
    define(name, value, passIdx, force) {
        let success = false;
        let passes = this.passes;
        let start = 0, end = passes.length;
        if (passIdx !== undefined) {
            start = passIdx, end = passIdx + 1;
        }
        for (let i = start; i < end; i++) {
            if (passes[i].define(name, value, force)) {
                success = true;
            }
        }
        if (!success) {
            cc.warnID(9104, this.name, name);
        }
    }
    getDefine(name, passIdx) {
        let passes = this.passes;
        if (passIdx >= passes.length)
            return;
        let start = 0, end = passes.length;
        if (passIdx !== undefined) {
            start = passIdx, end = passIdx + 1;
        }
        for (let i = start; i < end; i++) {
            let value = passes[i].getDefine(name);
            if (value !== undefined) {
                return value;
            }
        }
    }
    setCullMode(cullMode = gfx.CULL_BACK, passIdx) {
        let passes = this.passes;
        let start = 0, end = passes.length;
        if (passIdx !== undefined) {
            start = passIdx, end = passIdx + 1;
        }
        for (let i = start; i < end; i++) {
            passes[i].setCullMode(cullMode);
        }
        this._dirty = true;
    }
    setDepth(depthTest, depthWrite, depthFunc, passIdx) {
        let passes = this.passes;
        let start = 0, end = passes.length;
        if (passIdx !== undefined) {
            start = passIdx, end = passIdx + 1;
        }
        for (let i = start; i < end; i++) {
            passes[i].setDepth(depthTest, depthWrite, depthFunc);
        }
        this._dirty = true;
    }
    setBlend(enabled, blendEq, blendSrc, blendDst, blendAlphaEq, blendSrcAlpha, blendDstAlpha, blendColor, passIdx) {
        let passes = this.passes;
        let start = 0, end = passes.length;
        if (passIdx !== undefined) {
            start = passIdx, end = passIdx + 1;
        }
        for (let i = start; i < end; i++) {
            passes[i].setBlend(enabled, blendEq, blendSrc, blendDst, blendAlphaEq, blendSrcAlpha, blendDstAlpha, blendColor);
        }
        this._dirty = true;
    }
    setStencilEnabled(stencilTest = gfx.STENCIL_INHERIT, passIdx) {
        let passes = this.passes;
        let start = 0, end = passes.length;
        if (passIdx !== undefined) {
            start = passIdx, end = passIdx + 1;
        }
        for (let i = start; i < end; i++) {
            passes[i].setStencilEnabled(stencilTest);
        }
        this._dirty = true;
    }
    setStencil(enabled, stencilFunc, stencilRef, stencilMask, stencilFailOp, stencilZFailOp, stencilZPassOp, stencilWriteMask, passIdx) {
        let passes = this.passes;
        let start = 0, end = passes.length;
        if (passIdx !== undefined) {
            start = passIdx, end = passIdx + 1;
        }
        for (let i = start; i < end; i++) {
            let pass = passes[i];
            pass.setStencilFront(enabled, stencilFunc, stencilRef, stencilMask, stencilFailOp, stencilZFailOp, stencilZPassOp, stencilWriteMask);
            pass.setStencilBack(enabled, stencilFunc, stencilRef, stencilMask, stencilFailOp, stencilZFailOp, stencilZPassOp, stencilWriteMask);
        }
        this._dirty = true;
    }
}
exports.default = EffectBase;
cc.EffectBase = EffectBase;
