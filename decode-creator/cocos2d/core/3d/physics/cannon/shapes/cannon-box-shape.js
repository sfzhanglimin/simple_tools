"use strict";
/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannonBoxShape = void 0;
const cannon_1 = __importDefault(require("../../../../../../external/cannon/cannon"));
const cannon_util_1 = require("../cannon-util");
const cannon_shape_1 = require("./cannon-shape");
const Vec3 = cc.Vec3;
const v3_0 = new Vec3();
class CannonBoxShape extends cannon_shape_1.CannonShape {
    get boxCollider() {
        return this.collider;
    }
    get box() {
        return this._shape;
    }
    constructor(size) {
        super();
        this.halfExtent = new cannon_1.default.Vec3();
        Vec3.multiplyScalar(this.halfExtent, size, 0.5);
        this._shape = new cannon_1.default.Box(this.halfExtent.clone());
    }
    set size(v) {
        this.collider.node.getWorldScale(v3_0);
        v3_0.x = Math.abs(v3_0.x);
        v3_0.y = Math.abs(v3_0.y);
        v3_0.z = Math.abs(v3_0.z);
        Vec3.multiplyScalar(this.halfExtent, v, 0.5);
        Vec3.multiply(this.box.halfExtents, this.halfExtent, v3_0);
        this.box.updateConvexPolyhedronRepresentation();
        if (this._index != -1) {
            (0, cannon_util_1.commitShapeUpdates)(this._body);
        }
    }
    onLoad() {
        super.onLoad();
        this.size = this.boxCollider.size;
    }
    setScale(scale) {
        super.setScale(scale);
        this.size = this.boxCollider.size;
    }
}
exports.CannonBoxShape = CannonBoxShape;
