"use strict";
// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const value_types_1 = require("../../core/value-types");
const enums_1 = __importDefault(require("../enums"));
let _m4_tmp = new value_types_1.Mat4();
let _genID = 0;
/**
 * A representation of a single camera view
 */
class View {
    /**
     * Setup a default view
     */
    constructor() {
        this._id = _genID++;
        // priority. the smaller one will be rendered first
        this._priority = 0;
        // viewport
        this._rect = {
            x: 0, y: 0, w: 1, h: 1
        };
        // TODO:
        // this._scissor = {
        //   x: 0, y: 0, w: 1, h: 1
        // };
        // clear options
        this._color = new value_types_1.Vec4(0.3, 0.3, 0.3, 1);
        this._depth = 1;
        this._stencil = 0;
        this._clearFlags = enums_1.default.CLEAR_COLOR | enums_1.default.CLEAR_DEPTH;
        this._clearModel = null;
        // matrix
        this._matView = cc.mat4();
        this._matViewInv = cc.mat4();
        this._matProj = cc.mat4();
        this._matViewProj = cc.mat4();
        this._matInvViewProj = cc.mat4();
        // stages & framebuffer
        this._stages = [];
        this._cullingByID = false;
        this._framebuffer = null;
        this._shadowLight = null; // TODO: should not refer light in view.
        this._cullingMask = 0xffffffff;
    }
    /**
     * Get the view's forward direction
     * @param {Vec3} out the receiving vector
     * @returns {Vec3} the receiving vector
     */
    getForward(out) {
        let m = this._matView.m;
        return value_types_1.Vec3.set(out, -m[2], -m[6], -m[10]);
    }
    /**
     * Get the view's observing location
     * @param {Vec3} out the receiving vector
     * @returns {Vec3} the receiving vector
     */
    getPosition(out) {
        value_types_1.Mat4.invert(_m4_tmp, this._matView);
        return value_types_1.Mat4.getTranslation(out, _m4_tmp);
    }
}
exports.default = View;
