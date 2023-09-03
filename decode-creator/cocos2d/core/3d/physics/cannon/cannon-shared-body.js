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
exports.CannonSharedBody = void 0;
const cannon_1 = __importDefault(require("../../../../../external/cannon/cannon"));
const physics_enum_1 = require("../framework/physics-enum");
const util_1 = require("../framework/util");
const cannon_util_1 = require("./cannon-util");
const LocalDirtyFlag = cc.Node._LocalDirtyFlag;
const PHYSICS_SCALE = LocalDirtyFlag.PHYSICS_SCALE;
const Quat = cc.Quat;
const Vec3 = cc.Vec3;
const fastRemoveAt = cc.js.array.fastRemoveAt;
const v3_0 = new Vec3();
const quat_0 = new Quat();
const contactsPool = [];
const CollisionEventObject = {
    type: 'collision-enter',
    selfCollider: null,
    otherCollider: null,
    contacts: [],
};
/**
 * sharedbody, node : sharedbody = 1 : 1
 * static
 */
class CannonSharedBody {
    static getSharedBody(node, wrappedWorld) {
        const key = node._id;
        if (CannonSharedBody.sharedBodiesMap.has(key)) {
            return CannonSharedBody.sharedBodiesMap.get(key);
        }
        else {
            const newSB = new CannonSharedBody(node, wrappedWorld);
            CannonSharedBody.sharedBodiesMap.set(node._id, newSB);
            return newSB;
        }
    }
    /**
     * add or remove from world \
     * add, if enable \
     * remove, if disable & shapes.length == 0 & wrappedBody disable
     */
    set enabled(v) {
        if (v) {
            if (this.index < 0) {
                this.index = this.wrappedWorld.bodies.length;
                this.wrappedWorld.addSharedBody(this);
                var node = this.node;
                // body world aabb need to be recalculated
                this.body.aabbNeedsUpdate = true;
                node.getWorldPosition(v3_0);
                node.getWorldRotation(quat_0);
                var pos = this.body.position;
                pos.x = parseFloat(v3_0.x.toFixed(3));
                pos.y = parseFloat(v3_0.y.toFixed(3));
                pos.z = parseFloat(v3_0.z.toFixed(3));
                var rot = this.body.quaternion;
                rot.x = parseFloat(quat_0.x.toFixed(12));
                rot.y = parseFloat(quat_0.y.toFixed(12));
                rot.z = parseFloat(quat_0.z.toFixed(12));
                rot.w = parseFloat(quat_0.w.toFixed(12));
                if (node._localMatDirty & PHYSICS_SCALE) {
                    var wscale = node.__wscale;
                    for (var i = 0; i < this.shapes.length; i++) {
                        this.shapes[i].setScale(wscale);
                    }
                    (0, cannon_util_1.commitShapeUpdates)(this.body);
                }
                if (this.body.isSleeping()) {
                    this.body.wakeUp();
                }
            }
        }
        else {
            if (this.index >= 0) {
                const isRemove = (this.shapes.length == 0 && this.wrappedBody == null) ||
                    (this.shapes.length == 0 && this.wrappedBody != null && !this.wrappedBody.rigidBody.enabledInHierarchy) ||
                    (this.shapes.length == 0 && this.wrappedBody != null && !this.wrappedBody.isEnabled);
                if (isRemove) {
                    this.body.sleep(); // clear velocity etc.
                    this.index = -1;
                    this.wrappedWorld.removeSharedBody(this);
                }
            }
        }
    }
    set reference(v) {
        v ? this.ref++ : this.ref--;
        if (this.ref == 0) {
            this.destroy();
        }
    }
    constructor(node, wrappedWorld) {
        this.body = new cannon_1.default.Body();
        this.shapes = [];
        this.wrappedBody = null;
        this.index = -1;
        this.ref = 0;
        this.onCollidedListener = this.onCollided.bind(this);
        this.wrappedWorld = wrappedWorld;
        this.node = node;
        this.body.material = this.wrappedWorld.world.defaultMaterial;
        this.body.addEventListener('cc-collide', this.onCollidedListener);
        this._updateGroup();
        this.node.on(cc.Node.EventType.GROUP_CHANGED, this._updateGroup, this);
    }
    _updateGroup() {
        (0, cannon_util_1.groupIndexToBitMask)(this.node.groupIndex, this.body);
    }
    addShape(v) {
        const index = this.shapes.indexOf(v);
        if (index < 0) {
            const index = this.body.shapes.length;
            this.body.addShape(v.shape);
            this.shapes.push(v);
            v.setIndex(index);
            const offset = this.body.shapeOffsets[index];
            const orient = this.body.shapeOrientations[index];
            v.setOffsetAndOrient(offset, orient);
        }
    }
    removeShape(v) {
        const index = this.shapes.indexOf(v);
        if (index >= 0) {
            fastRemoveAt(this.shapes, index);
            this.body.removeShape(v.shape);
            v.setIndex(-1);
        }
    }
    syncSceneToPhysics(force = false) {
        let node = this.node;
        let needUpdateTransform = (0, util_1.worldDirty)(node);
        if (!force && !needUpdateTransform) {
            return;
        }
        // body world aabb need to be recalculated
        this.body.aabbNeedsUpdate = true;
        node.getWorldPosition(v3_0);
        node.getWorldRotation(quat_0);
        Vec3.copy(this.body.position, v3_0);
        Quat.copy(this.body.quaternion, quat_0);
        if (node._localMatDirty & PHYSICS_SCALE) {
            let wscale = node.__wscale;
            for (let i = 0; i < this.shapes.length; i++) {
                this.shapes[i].setScale(wscale);
            }
            (0, cannon_util_1.commitShapeUpdates)(this.body);
        }
        if (this.body.isSleeping()) {
            this.body.wakeUp();
        }
    }
    syncPhysicsToScene() {
        if (this.body.type != physics_enum_1.ERigidBodyType.STATIC && !this.body.isSleeping()) {
            Vec3.copy(v3_0, this.body.position);
            Quat.copy(quat_0, this.body.quaternion);
            this.node.setWorldPosition(v3_0);
            this.node.setWorldRotation(quat_0);
        }
    }
    destroy() {
        this.body.removeEventListener('cc-collide', this.onCollidedListener);
        this.node.off(cc.Node.EventType.GROUP_CHANGED, this._updateGroup, this);
        CannonSharedBody.sharedBodiesMap.delete(this.node._id);
        delete cannon_1.default.World['idToBodyMap'][this.body.id];
        this.node = null;
        this.wrappedWorld = null;
        this.body = null;
        this.shapes = null;
        this.onCollidedListener = null;
    }
    onCollided(event) {
        CollisionEventObject.type = event.event;
        const self = (0, util_1.getWrap)(event.selfShape);
        const other = (0, util_1.getWrap)(event.otherShape);
        if (self) {
            CollisionEventObject.selfCollider = self.collider;
            CollisionEventObject.otherCollider = other ? other.collider : null;
            let i = 0;
            for (i = CollisionEventObject.contacts.length; i--;) {
                contactsPool.push(CollisionEventObject.contacts.pop());
            }
            for (i = 0; i < event.contacts.length; i++) {
                const cq = event.contacts[i];
                if (contactsPool.length > 0) {
                    const c = contactsPool.pop();
                    Vec3.copy(c.contactA, cq.ri);
                    Vec3.copy(c.contactB, cq.rj);
                    Vec3.copy(c.normal, cq.ni);
                    CollisionEventObject.contacts.push(c);
                }
                else {
                    const c = {
                        contactA: Vec3.copy(new Vec3(), cq.ri),
                        contactB: Vec3.copy(new Vec3(), cq.rj),
                        normal: Vec3.copy(new Vec3(), cq.ni),
                    };
                    CollisionEventObject.contacts.push(c);
                }
            }
            for (i = 0; i < this.shapes.length; i++) {
                const shape = this.shapes[i];
                CollisionEventObject.type = cannon_util_1.deprecatedEventMap[CollisionEventObject.type];
                shape.collider.emit(CollisionEventObject.type, CollisionEventObject);
                // adapt 
                CollisionEventObject.type = event.event;
                shape.collider.emit(CollisionEventObject.type, CollisionEventObject);
            }
        }
    }
}
exports.CannonSharedBody = CannonSharedBody;
CannonSharedBody.sharedBodiesMap = new Map();
