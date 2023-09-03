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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinShape = void 0;
const Vec3 = cc.Vec3;
class BuiltinShape {
    constructor() {
        this.id = BuiltinShape.idCounter++;
    }
    set material(v) { }
    set isTrigger(v) { }
    get attachedRigidBody() { return null; }
    set center(v) {
        Vec3.copy(this._localShape.center, v);
    }
    get localShape() {
        return this._worldShape;
    }
    get worldShape() {
        return this._worldShape;
    }
    get sharedBody() {
        return this._sharedBody;
    }
    get collider() {
        return this._collider;
    }
    ;
    __preload(comp) {
        this._collider = comp;
        this._sharedBody = cc.director.getPhysics3DManager().physicsWorld.getSharedBody(this._collider.node);
        this._sharedBody.reference = true;
    }
    onLoad() {
        this.center = this._collider.center;
    }
    onEnable() {
        this._sharedBody.addShape(this);
        this._sharedBody.enabled = true;
    }
    onDisable() {
        this._sharedBody.removeShape(this);
        this._sharedBody.enabled = false;
    }
    onDestroy() {
        this._sharedBody.reference = false;
        this._collider = null;
        this._localShape = null;
        this._worldShape = null;
    }
    transform(m, pos, rot, scale) {
        this._localShape.transform(m, pos, rot, scale, this._worldShape);
    }
}
exports.BuiltinShape = BuiltinShape;
/** id generator */
BuiltinShape.idCounter = 0;
