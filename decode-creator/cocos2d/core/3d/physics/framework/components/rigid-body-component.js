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
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RigidBody3D = void 0;
const instance_1 = require("../instance");
const { ccclass, disallowMultiple, executeInEditMode, executionOrder, menu, property, } = cc._decorator;
const Vec3 = cc.Vec3;
/**
 * !#en
 * RigidBody is the basic object that make up the physical world, and it can make a node physically affected and react.
 * !#zh
 * 刚体是组成物理世界的基本对象，可以让一个节点受到物理影响并产生反应。该组件在使用 Builtin 物理引擎时无效。
 * @class RigidBody3D
 * @extends Component
 */
let RigidBody3D = (() => {
    let _classDecorators = [ccclass('cc.RigidBody3D'), executionOrder(99), menu('i18n:MAIN_MENU.component.physics/Rigid Body 3D'), executeInEditMode, disallowMultiple];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = cc.Component;
    let _instanceExtraInitializers = [];
    let _get_mass_decorators;
    let _get_linearDamping_decorators;
    let _get_angularDamping_decorators;
    let _get_isKinematic_decorators;
    let _get_useGravity_decorators;
    let _get_fixedRotation_decorators;
    let _get_linearFactor_decorators;
    let _get_angularFactor_decorators;
    let __mass_decorators;
    let __mass_initializers = [];
    let __linearDamping_decorators;
    let __linearDamping_initializers = [];
    let __angularDamping_decorators;
    let __angularDamping_initializers = [];
    let __fixedRotation_decorators;
    let __fixedRotation_initializers = [];
    let __isKinematic_decorators;
    let __isKinematic_initializers = [];
    let __useGravity_decorators;
    let __useGravity_initializers = [];
    let __linearFactor_decorators;
    let __linearFactor_initializers = [];
    let __angularFactor_decorators;
    let __angularFactor_initializers = [];
    var RigidBody3D = _classThis = class extends _classSuper {
        /// PUBLIC PROPERTY GETTER\SETTER ///
        /**
         * !#en
         * Whether sleep is allowed.
         * !#zh
         * 是否允许休眠。
         * @property {boolean} allowSleep
         */
        get allowSleep() {
            return this._allowSleep;
        }
        set allowSleep(v) {
            this._allowSleep = v;
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.allowSleep = v;
            }
        }
        /**
         * !#en
         * The mass of the rigidbody.
         * !#zh
         * 刚体的质量。
         * @property {number} mass
         */
        get mass() {
            return this._mass;
        }
        set mass(value) {
            this._mass = value;
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.mass = value;
            }
        }
        /**
         * !#en
         * Used to reduce the linear rate of rigidbody. The larger the value, the slower the rigidbody moves.
         * !#zh
         * 线性阻尼，用于减小刚体的线性速率，值越大物体移动越慢。
         * @property {number} linearDamping
         */
        get linearDamping() {
            return this._linearDamping;
        }
        set linearDamping(value) {
            this._linearDamping = value;
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.linearDamping = value;
            }
        }
        /**
         * !#en
         * Used to reduce the rotation rate of rigidbody. The larger the value, the slower the rigidbody rotates.
         * !#zh
         * 角阻尼，用于减小刚体的旋转速率，值越大刚体旋转越慢。
         * @property {number} angularDamping
         */
        get angularDamping() {
            return this._angularDamping;
        }
        set angularDamping(value) {
            this._angularDamping = value;
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.angularDamping = value;
            }
        }
        /**
         * !#en
         * If enabled, the developer controls the displacement and rotation of the rigidbody, not the physics engine.
         * !#zh
         * 是否由开发者来控制刚体的位移和旋转，而不是受物理引擎的影响。
         * @property {boolean} isKinematic
         */
        get isKinematic() {
            return this._isKinematic;
        }
        set isKinematic(value) {
            this._isKinematic = value;
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.isKinematic = value;
            }
        }
        /**
         * !#en
         * If enabled, the rigidbody is affected by gravity.
         * !#zh
         * 如果开启，刚体会受到重力影响。
         * @property {boolean} useGravity
         */
        get useGravity() {
            return this._useGravity;
        }
        set useGravity(value) {
            this._useGravity = value;
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.useGravity = value;
            }
        }
        /**
         * !#en
         * If enabled, the rigidbody will be fixed without rotation during a collision.
         * !#zh
         * 如果开启，发生碰撞时会固定刚体不产生旋转。
         * @property {boolean} fixedRotation
         */
        get fixedRotation() {
            return this._fixedRotation;
        }
        set fixedRotation(value) {
            this._fixedRotation = value;
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.fixedRotation = value;
            }
        }
        /**
         * !#en
         * It can affect the linear velocity change of the rigidbody in each axis. The larger the value, the faster the rigidbody moves.
         * !#zh
         * 线性因子，可影响刚体在每个轴向的线性速度变化，值越大刚体移动越快。
         * @property {Vec3} linearFactor
         */
        get linearFactor() {
            return this._linearFactor;
        }
        set linearFactor(value) {
            Vec3.copy(this._linearFactor, value);
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.linearFactor = this._linearFactor;
            }
        }
        /**
         * !#en
         * It can affect the rotation speed change of the rigidbody in each axis. The larger the value, the faster the rigidbody rotates.
         * !#zh
         * 旋转因子，可影响刚体在每个轴向的旋转速度变化，值越大刚体旋转越快。
         * @property {Vec3} angularFactor
         */
        get angularFactor() {
            return this._angularFactor;
        }
        set angularFactor(value) {
            Vec3.copy(this._angularFactor, value);
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.angularFactor = this._angularFactor;
            }
        }
        /**
         * !#en
         * The rigidbody is awake.
         * !#zh
         * 刚体是否为唤醒的状态。
         * @property {boolean} isAwake
         * @readonly
         */
        get isAwake() {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                return this._body.isAwake;
            }
            return false;
        }
        /**
         * !#en
         * The rigidbody can enter hibernation.
         * !#zh
         * 刚体是否为可进入休眠的状态。
         * @property {boolean} isSleepy
         * @readonly
         */
        get isSleepy() {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                return this._body.isSleepy;
            }
            return false;
        }
        /**
         * !#en
         * The rigidbody is sleeping.
         * !#zh
         * 刚体是否为正在休眠的状态。
         * @property {boolean} isSleeping
         * @readonly
         */
        get isSleeping() {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                return this._body.isSleeping;
            }
            return false;
        }
        /**
         * !#en
         * Get the rigidbody object inside the physics engine.
         * !#zh
         * 获得物理引擎内部刚体对象。
         * @property {IRigidBody} rigidBody
         * @readonly
         */
        get rigidBody() {
            return this._body;
        }
        get _assertOnload() {
            const r = this._isOnLoadCalled == 0;
            if (r) {
                cc.error('Physics Error: Please make sure that the node has been added to the scene');
            }
            return !r;
        }
        constructor() {
            super();
            this._body = (__runInitializers(this, _instanceExtraInitializers), void 0);
            /// PRIVATE PROPERTY ///
            // @property
            this._allowSleep = true;
            this._mass = __runInitializers(this, __mass_initializers, 10);
            this._linearDamping = __runInitializers(this, __linearDamping_initializers, 0.1);
            this._angularDamping = __runInitializers(this, __angularDamping_initializers, 0.1);
            this._fixedRotation = __runInitializers(this, __fixedRotation_initializers, false);
            this._isKinematic = __runInitializers(this, __isKinematic_initializers, false);
            this._useGravity = __runInitializers(this, __useGravity_initializers, true);
            this._linearFactor = __runInitializers(this, __linearFactor_initializers, new Vec3(1, 1, 1));
            this._angularFactor = __runInitializers(this, __angularFactor_initializers, new Vec3(1, 1, 1));
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body = (0, instance_1.createRigidBody)();
            }
        }
        /// COMPONENT LIFECYCLE ///
        __preload() {
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.__preload(this);
            }
        }
        onEnable() {
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.onEnable();
            }
        }
        onDisable() {
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.onDisable();
            }
        }
        onDestroy() {
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.onDestroy();
            }
        }
        /// PUBLIC METHOD ///
        /**
         * !#en
         * A force is applied to a rigid body at a point in world space.
         * !#zh
         * 在世界空间中的某点上对刚体施加一个作用力。
         * @method applyForce
         * @param {Vec3} force
         * @param {Vec3} relativePoint The point of action, relative to the center of the rigid body.
         */
        applyForce(force, relativePoint) {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.applyForce(force, relativePoint);
            }
        }
        /**
         * !#en
         * Apply a force on the rigid body at a point in local space.
         * !#zh
         * 在本地空间中的某点上对刚体施加一个作用力。
         * @method applyLocalForce
         * @param {Vec3} force
         * @param {Vec3} localPoint Point of application
         */
        applyLocalForce(force, localPoint) {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.applyLocalForce(force, localPoint);
            }
        }
        /**
         * !#en
         * Apply an impulse to a rigid body at a point in world space.
         * !#zh
         * 在世界空间的某点上对刚体施加一个冲量。
         * @method applyImpulse
         * @param {Vec3} impulse
         * @param {Vec3} relativePoint The point of action, relative to the center of the rigid body.
         */
        applyImpulse(impulse, relativePoint) {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.applyImpulse(impulse, relativePoint);
            }
        }
        /**
         * !#en
         * Apply an impulse to the rigid body at a point in local space.
         * !#zh
         * 在本地空间的某点上对刚体施加一个冲量。
         * @method applyLocalImpulse
         * @param {Vec3} impulse
         * @param {Vec3} localPoint Point of application
         */
        applyLocalImpulse(impulse, localPoint) {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.applyLocalImpulse(impulse, localPoint);
            }
        }
        /**
         * !#en
         * Apply a torque to the rigid body.
         * !#zh
         * 对刚体施加扭转力。
         * @method applyTorque
         * @param {Vec3} torque
         */
        applyTorque(torque) {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.applyTorque(torque);
            }
        }
        /**
         * !#en
         * Apply a local torque to the rigid body.
         * !#zh
         * 对刚体施加本地扭转力。
         * @method applyLocalTorque
         * @param {Vec3} torque
         */
        applyLocalTorque(torque) {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.applyLocalTorque(torque);
            }
        }
        /**
         * !#en
         * Awaken the rigid body.
         * !#zh
         * 唤醒刚体。
         * @method wakeUp
         */
        wakeUp() {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.wakeUp();
            }
        }
        /**
         * !#en
         * Dormant rigid body.
         * !#zh
         * 休眠刚体。
         * @method sleep
         */
        sleep() {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.sleep();
            }
        }
        /**
         * !#en
         * Get linear velocity.
         * !#zh
         * 获取线性速度。
         * @method getLinearVelocity
         * @param {Vec3} out
         */
        getLinearVelocity(out) {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.getLinearVelocity(out);
            }
        }
        /**
         * !#en
         * Set linear speed.
         * !#zh
         * 设置线性速度。
         * @method setLinearVelocity
         * @param {Vec3} value
         */
        setLinearVelocity(value) {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.setLinearVelocity(value);
            }
        }
        /**
         * !#en
         * Gets the rotation speed.
         * !#zh
         * 获取旋转速度。
         * @method getAngularVelocity
         * @param {Vec3} out
         */
        getAngularVelocity(out) {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.getAngularVelocity(out);
            }
        }
        /**
         * !#en
         * Set rotation speed.
         * !#zh
         * 设置旋转速度。
         * @method setAngularVelocity
         * @param {Vec3} value
         */
        setAngularVelocity(value) {
            if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this._body.setAngularVelocity(value);
            }
        }
    };
    __setFunctionName(_classThis, "RigidBody3D");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_mass_decorators = [property({
                displayOrder: 0
            })];
        _get_linearDamping_decorators = [property({
                displayOrder: 1
            })];
        _get_angularDamping_decorators = [property({
                displayOrder: 2
            })];
        _get_isKinematic_decorators = [property({
                displayOrder: 3
            })];
        _get_useGravity_decorators = [property({
                displayOrder: 4
            })];
        _get_fixedRotation_decorators = [property({
                displayOrder: 5
            })];
        _get_linearFactor_decorators = [property({
                displayOrder: 6
            })];
        _get_angularFactor_decorators = [property({
                displayOrder: 7
            })];
        __mass_decorators = [property];
        __linearDamping_decorators = [property];
        __angularDamping_decorators = [property];
        __fixedRotation_decorators = [property];
        __isKinematic_decorators = [property];
        __useGravity_decorators = [property];
        __linearFactor_decorators = [property];
        __angularFactor_decorators = [property];
        __esDecorate(_classThis, null, _get_mass_decorators, { kind: "getter", name: "mass", static: false, private: false, access: { has: obj => "mass" in obj, get: obj => obj.mass }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_linearDamping_decorators, { kind: "getter", name: "linearDamping", static: false, private: false, access: { has: obj => "linearDamping" in obj, get: obj => obj.linearDamping }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_angularDamping_decorators, { kind: "getter", name: "angularDamping", static: false, private: false, access: { has: obj => "angularDamping" in obj, get: obj => obj.angularDamping }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isKinematic_decorators, { kind: "getter", name: "isKinematic", static: false, private: false, access: { has: obj => "isKinematic" in obj, get: obj => obj.isKinematic }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_useGravity_decorators, { kind: "getter", name: "useGravity", static: false, private: false, access: { has: obj => "useGravity" in obj, get: obj => obj.useGravity }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_fixedRotation_decorators, { kind: "getter", name: "fixedRotation", static: false, private: false, access: { has: obj => "fixedRotation" in obj, get: obj => obj.fixedRotation }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_linearFactor_decorators, { kind: "getter", name: "linearFactor", static: false, private: false, access: { has: obj => "linearFactor" in obj, get: obj => obj.linearFactor }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_angularFactor_decorators, { kind: "getter", name: "angularFactor", static: false, private: false, access: { has: obj => "angularFactor" in obj, get: obj => obj.angularFactor }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, __mass_decorators, { kind: "field", name: "_mass", static: false, private: false, access: { has: obj => "_mass" in obj, get: obj => obj._mass, set: (obj, value) => { obj._mass = value; } }, metadata: _metadata }, __mass_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __linearDamping_decorators, { kind: "field", name: "_linearDamping", static: false, private: false, access: { has: obj => "_linearDamping" in obj, get: obj => obj._linearDamping, set: (obj, value) => { obj._linearDamping = value; } }, metadata: _metadata }, __linearDamping_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __angularDamping_decorators, { kind: "field", name: "_angularDamping", static: false, private: false, access: { has: obj => "_angularDamping" in obj, get: obj => obj._angularDamping, set: (obj, value) => { obj._angularDamping = value; } }, metadata: _metadata }, __angularDamping_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __fixedRotation_decorators, { kind: "field", name: "_fixedRotation", static: false, private: false, access: { has: obj => "_fixedRotation" in obj, get: obj => obj._fixedRotation, set: (obj, value) => { obj._fixedRotation = value; } }, metadata: _metadata }, __fixedRotation_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __isKinematic_decorators, { kind: "field", name: "_isKinematic", static: false, private: false, access: { has: obj => "_isKinematic" in obj, get: obj => obj._isKinematic, set: (obj, value) => { obj._isKinematic = value; } }, metadata: _metadata }, __isKinematic_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __useGravity_decorators, { kind: "field", name: "_useGravity", static: false, private: false, access: { has: obj => "_useGravity" in obj, get: obj => obj._useGravity, set: (obj, value) => { obj._useGravity = value; } }, metadata: _metadata }, __useGravity_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __linearFactor_decorators, { kind: "field", name: "_linearFactor", static: false, private: false, access: { has: obj => "_linearFactor" in obj, get: obj => obj._linearFactor, set: (obj, value) => { obj._linearFactor = value; } }, metadata: _metadata }, __linearFactor_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __angularFactor_decorators, { kind: "field", name: "_angularFactor", static: false, private: false, access: { has: obj => "_angularFactor" in obj, get: obj => obj._angularFactor, set: (obj, value) => { obj._angularFactor = value; } }, metadata: _metadata }, __angularFactor_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RigidBody3D = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RigidBody3D = _classThis;
})();
exports.RigidBody3D = RigidBody3D;
