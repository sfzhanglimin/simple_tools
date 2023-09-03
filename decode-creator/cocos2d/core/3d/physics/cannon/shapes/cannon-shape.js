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
exports.CannonShape = void 0;
const cannon_1 = __importDefault(require("../../../../../../external/cannon/cannon"));
const util_1 = require("../../framework/util");
const cannon_util_1 = require("../cannon-util");
const TriggerEventObject = {
    type: 'trigger-enter',
    selfCollider: null,
    otherCollider: null,
};
const Vec3 = cc.Vec3;
const v3_0 = new Vec3();
class CannonShape {
    constructor() {
        this._offset = new cannon_1.default.Vec3();
        this._orient = new cannon_1.default.Quaternion();
        this._index = -1;
        this.onTriggerListener = this.onTrigger.bind(this);
    }
    get shape() { return this._shape; }
    get collider() { return this._collider; }
    get attachedRigidBody() {
        if (this._sharedBody.wrappedBody) {
            return this._sharedBody.wrappedBody.rigidBody;
        }
        return null;
    }
    get sharedBody() { return this._sharedBody; }
    set material(mat) {
        if (mat == null) {
            this._shape.material = null;
        }
        else {
            if (CannonShape.idToMaterial[mat._uuid] == null) {
                CannonShape.idToMaterial[mat._uuid] = new cannon_1.default.Material(mat._uuid);
            }
            this._shape.material = CannonShape.idToMaterial[mat._uuid];
            this._shape.material.friction = mat.friction;
            this._shape.material.restitution = mat.restitution;
        }
    }
    set isTrigger(v) {
        this._shape.collisionResponse = !v;
        if (this._index >= 0) {
            this._body.updateHasTrigger();
        }
    }
    set center(v) {
        this._setCenter(v);
        if (this._index >= 0) {
            (0, cannon_util_1.commitShapeUpdates)(this._body);
        }
    }
    get _body() { return this._sharedBody.body; }
    /** LIFECYCLE */
    __preload(comp) {
        this._collider = comp;
        (0, util_1.setWrap)(this._shape, this);
        this._shape.addEventListener('cc-trigger', this.onTriggerListener);
        this._sharedBody = cc.director.getPhysics3DManager().physicsWorld.getSharedBody(this._collider.node);
        this._sharedBody.reference = true;
    }
    onLoad() {
        this.center = this._collider.center;
        this.isTrigger = this._collider.isTrigger;
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
        this._shape.removeEventListener('cc-trigger', this.onTriggerListener);
        delete cannon_1.default.World['idToShapeMap'][this._shape.id];
        this._sharedBody = null;
        (0, util_1.setWrap)(this._shape, null);
        this._offset = null;
        this._orient = null;
        this._shape = null;
        this._collider = null;
        this.onTriggerListener = null;
    }
    /**
     * change scale will recalculate center & size \
     * size handle by child class
     * @param scale
     */
    setScale(scale) {
        this._setCenter(this._collider.center);
    }
    setIndex(index) {
        this._index = index;
    }
    setOffsetAndOrient(offset, orient) {
        cc.Vec3.copy(offset, this._offset);
        cc.Vec3.copy(orient, this._orient);
        this._offset = offset;
        this._orient = orient;
    }
    _setCenter(v) {
        const lpos = this._offset;
        Vec3.copy(lpos, v);
        this._collider.node.getWorldScale(v3_0);
        Vec3.multiply(lpos, lpos, v3_0);
    }
    onTrigger(event) {
        TriggerEventObject.type = event.event;
        const self = (0, util_1.getWrap)(event.selfShape);
        const other = (0, util_1.getWrap)(event.otherShape);
        if (self) {
            TriggerEventObject.selfCollider = self.collider;
            TriggerEventObject.otherCollider = other ? other.collider : null;
            TriggerEventObject.type = cannon_util_1.deprecatedEventMap[TriggerEventObject.type];
            this._collider.emit(TriggerEventObject.type, TriggerEventObject);
            // adapt 
            TriggerEventObject.type = event.event;
            this._collider.emit(TriggerEventObject.type, TriggerEventObject);
        }
    }
}
exports.CannonShape = CannonShape;
CannonShape.idToMaterial = {};
