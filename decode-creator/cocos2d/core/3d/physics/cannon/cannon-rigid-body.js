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
exports.CannonRigidBody = void 0;
const cannon_1 = __importDefault(require("../../../../../external/cannon/cannon"));
const v3_cannon0 = new cannon_1.default.Vec3();
const v3_cannon1 = new cannon_1.default.Vec3();
const Vec3 = cc.Vec3;
/**
 * wraped shared body
 * dynamic
 * kinematic
 */
class CannonRigidBody {
    constructor() {
        this._isEnabled = false;
    }
    get isAwake() {
        return this._sharedBody.body.isAwake();
    }
    get isSleepy() {
        return this._sharedBody.body.isSleepy();
    }
    get isSleeping() {
        return this._sharedBody.body.isSleeping();
    }
    set allowSleep(v) {
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        body.allowSleep = v;
    }
    set mass(value) {
        let body = this._sharedBody.body;
        body.mass = value;
        if (body.mass == 0) {
            body.type = cannon_1.default.Body.STATIC;
        }
        else {
            body.type = this._rigidBody.isKinematic ? cannon_1.default.Body.KINEMATIC : cannon_1.default.Body.DYNAMIC;
        }
        body.updateMassProperties();
        if (body.isSleeping()) {
            body.wakeUp();
        }
    }
    set isKinematic(value) {
        let body = this._sharedBody.body;
        if (body.mass == 0) {
            body.type = cannon_1.default.Body.STATIC;
        }
        else {
            if (value) {
                body.type = cannon_1.default.Body.KINEMATIC;
            }
            else {
                body.type = cannon_1.default.Body.DYNAMIC;
            }
        }
    }
    set fixedRotation(value) {
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        body.fixedRotation = value;
        body.updateMassProperties();
    }
    set linearDamping(value) {
        this._sharedBody.body.linearDamping = value;
    }
    set angularDamping(value) {
        this._sharedBody.body.angularDamping = value;
    }
    set useGravity(value) {
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        body.useGravity = value;
    }
    set linearFactor(value) {
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        Vec3.copy(body.linearFactor, value);
    }
    set angularFactor(value) {
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        Vec3.copy(body.angularFactor, value);
    }
    get rigidBody() {
        return this._rigidBody;
    }
    get sharedBody() {
        return this._sharedBody;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    /** LIFECYCLE */
    __preload(com) {
        this._rigidBody = com;
        this._sharedBody = cc.director.getPhysics3DManager().physicsWorld.getSharedBody(this._rigidBody.node);
        this._sharedBody.reference = true;
        this._sharedBody.wrappedBody = this;
    }
    onLoad() {
    }
    onEnable() {
        this._isEnabled = true;
        this.mass = this._rigidBody.mass;
        this.allowSleep = this._rigidBody.allowSleep;
        this.linearDamping = this._rigidBody.linearDamping;
        this.angularDamping = this._rigidBody.angularDamping;
        this.useGravity = this._rigidBody.useGravity;
        this.isKinematic = this._rigidBody.isKinematic;
        this.fixedRotation = this._rigidBody.fixedRotation;
        this.linearFactor = this._rigidBody.linearFactor;
        this.angularFactor = this._rigidBody.angularFactor;
        this._sharedBody.enabled = true;
    }
    onDisable() {
        this._isEnabled = false;
        this._sharedBody.enabled = false;
    }
    onDestroy() {
        this._sharedBody.reference = false;
        this._rigidBody = null;
        this._sharedBody = null;
    }
    /** INTERFACE */
    wakeUp() {
        return this._sharedBody.body.wakeUp();
    }
    sleep() {
        return this._sharedBody.body.sleep();
    }
    getLinearVelocity(out) {
        Vec3.copy(out, this._sharedBody.body.velocity);
        return out;
    }
    setLinearVelocity(value) {
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        Vec3.copy(body.velocity, value);
    }
    getAngularVelocity(out) {
        Vec3.copy(out, this._sharedBody.body.angularVelocity);
        return out;
    }
    setAngularVelocity(value) {
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        Vec3.copy(body.angularVelocity, value);
    }
    applyForce(force, worldPoint) {
        if (worldPoint == null) {
            worldPoint = Vec3.ZERO;
        }
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        body.applyForce(Vec3.copy(v3_cannon0, force), Vec3.copy(v3_cannon1, worldPoint));
    }
    applyImpulse(impulse, worldPoint) {
        if (worldPoint == null) {
            worldPoint = Vec3.ZERO;
        }
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        body.applyImpulse(Vec3.copy(v3_cannon0, impulse), Vec3.copy(v3_cannon1, worldPoint));
    }
    applyLocalForce(force, localPoint) {
        if (localPoint == null) {
            localPoint = Vec3.ZERO;
        }
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        body.applyLocalForce(Vec3.copy(v3_cannon0, force), Vec3.copy(v3_cannon1, localPoint));
    }
    applyLocalImpulse(impulse, localPoint) {
        if (localPoint == null) {
            localPoint = Vec3.ZERO;
        }
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        body.applyLocalImpulse(Vec3.copy(v3_cannon0, impulse), Vec3.copy(v3_cannon1, localPoint));
    }
    applyTorque(torque) {
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        body.torque.x += torque.x;
        body.torque.y += torque.y;
        body.torque.z += torque.z;
    }
    applyLocalTorque(torque) {
        let body = this._sharedBody.body;
        if (body.isSleeping()) {
            body.wakeUp();
        }
        Vec3.copy(v3_cannon0, torque);
        body.vectorToWorldFrame(v3_cannon0, v3_cannon0);
        body.torque.x += v3_cannon0.x;
        body.torque.y += v3_cannon0.y;
        body.torque.z += v3_cannon0.z;
    }
}
exports.CannonRigidBody = CannonRigidBody;
