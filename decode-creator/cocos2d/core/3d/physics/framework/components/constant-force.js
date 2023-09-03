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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantForce = void 0;
const rigid_body_component_1 = require("./rigid-body-component");
const { ccclass, executeInEditMode, executionOrder, menu, property, requireComponent, disallowMultiple, } = cc._decorator;
const Vec3 = cc.Vec3;
/**
 * !#en
 * Each frame applies a constant force to a rigid body, depending on the RigidBody3D
 * !#zh
 * 在每帧对一个刚体施加持续的力，依赖 RigidBody3D 组件
 * @class ConstantForce
 * @extends Component
 */
let ConstantForce = (() => {
    let _classDecorators = [ccclass('cc.ConstantForce'), executionOrder(98), requireComponent(rigid_body_component_1.RigidBody3D), menu('i18n:MAIN_MENU.component.physics/Constant Force 3D'), disallowMultiple, executeInEditMode];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = cc.Component;
    let _instanceExtraInitializers = [];
    let __force_decorators;
    let __force_initializers = [];
    let __localForce_decorators;
    let __localForce_initializers = [];
    let __torque_decorators;
    let __torque_initializers = [];
    let __localTorque_decorators;
    let __localTorque_initializers = [];
    let _get_force_decorators;
    let _get_localForce_decorators;
    let _get_torque_decorators;
    let _get_localTorque_decorators;
    var ConstantForce = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this._rigidbody = (__runInitializers(this, _instanceExtraInitializers), null);
            this._force = __runInitializers(this, __force_initializers, new Vec3());
            this._localForce = __runInitializers(this, __localForce_initializers, new Vec3());
            this._torque = __runInitializers(this, __torque_initializers, new Vec3());
            this._localTorque = __runInitializers(this, __localTorque_initializers, new Vec3());
            this._mask = 0;
        }
        /**
         * !#en
         * Set the force used in the world coordinate system, use `this.force = otherVec3`.
         * !#zh
         * 设置世界坐标系中使用的力，设置时请用 `this.force = otherVec3` 的方式。
         * @property {Vec3} force
         */
        get force() {
            return this._force;
        }
        set force(value) {
            Vec3.copy(this._force, value);
            this._maskUpdate(this._force, 1);
        }
        /**
         * !#en
         * Set the force used in the local coordinate system, using `this.localforce = otherVec3`.
         * !#zh
         * 获取和设置本地坐标系中使用的力，设置时请用 `this.localForce = otherVec3` 的方式。
         * @property {Vec3} localForce
         */
        get localForce() {
            return this._localForce;
        }
        set localForce(value) {
            Vec3.copy(this._localForce, value);
            this._maskUpdate(this.localForce, 2);
        }
        /**
         * !#en
         * Torque applied to the world orientation
         * !#zh
         * 对世界朝向施加的扭矩
         * @note
         * 设置时请用 this.torque = otherVec3 的方式
         * @property {Vec3} torque
         */
        get torque() {
            return this._torque;
        }
        set torque(value) {
            Vec3.copy(this._torque, value);
            this._maskUpdate(this._torque, 4);
        }
        /**
         * !#en
         * Torque applied to local orientation, using `this.localtorque = otherVec3`.
         * !#zh
         * 对本地朝向施加的扭矩，设置时请用 `this.localTorque = otherVec3` 的方式。
         * @property {Vec3} localTorque
         */
        get localTorque() {
            return this._localTorque;
        }
        set localTorque(value) {
            Vec3.copy(this._localTorque, value);
            this._maskUpdate(this._localTorque, 8);
        }
        onLoad() {
            if (!CC_PHYSICS_BUILTIN) {
                this._rigidbody = this.node.getComponent(rigid_body_component_1.RigidBody3D);
                this._maskUpdate(this._force, 1);
                this._maskUpdate(this._localForce, 2);
                this._maskUpdate(this._torque, 4);
                this._maskUpdate(this._localTorque, 8);
            }
        }
        lateUpdate(dt) {
            if (!CC_PHYSICS_BUILTIN) {
                if (this._rigidbody != null && this._mask != 0) {
                    if (this._mask & 1) {
                        this._rigidbody.applyForce(this._force);
                    }
                    if (this._mask & 2) {
                        this._rigidbody.applyLocalForce(this.localForce);
                    }
                    if (this._mask & 4) {
                        this._rigidbody.applyTorque(this._torque);
                    }
                    if (this._mask & 8) {
                        this._rigidbody.applyLocalTorque(this._localTorque);
                    }
                }
            }
        }
        _maskUpdate(t, m) {
            if (Vec3.strictEquals(t, Vec3.ZERO)) {
                this._mask &= ~m;
            }
            else {
                this._mask |= m;
            }
        }
    };
    __setFunctionName(_classThis, "ConstantForce");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __force_decorators = [property];
        __localForce_decorators = [property];
        __torque_decorators = [property];
        __localTorque_decorators = [property];
        _get_force_decorators = [property({
                displayOrder: 0
            })];
        _get_localForce_decorators = [property({
                displayOrder: 1
            })];
        _get_torque_decorators = [property({
                displayOrder: 2
            })];
        _get_localTorque_decorators = [property({
                displayOrder: 3
            })];
        __esDecorate(_classThis, null, _get_force_decorators, { kind: "getter", name: "force", static: false, private: false, access: { has: obj => "force" in obj, get: obj => obj.force }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_localForce_decorators, { kind: "getter", name: "localForce", static: false, private: false, access: { has: obj => "localForce" in obj, get: obj => obj.localForce }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_torque_decorators, { kind: "getter", name: "torque", static: false, private: false, access: { has: obj => "torque" in obj, get: obj => obj.torque }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_localTorque_decorators, { kind: "getter", name: "localTorque", static: false, private: false, access: { has: obj => "localTorque" in obj, get: obj => obj.localTorque }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, __force_decorators, { kind: "field", name: "_force", static: false, private: false, access: { has: obj => "_force" in obj, get: obj => obj._force, set: (obj, value) => { obj._force = value; } }, metadata: _metadata }, __force_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __localForce_decorators, { kind: "field", name: "_localForce", static: false, private: false, access: { has: obj => "_localForce" in obj, get: obj => obj._localForce, set: (obj, value) => { obj._localForce = value; } }, metadata: _metadata }, __localForce_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __torque_decorators, { kind: "field", name: "_torque", static: false, private: false, access: { has: obj => "_torque" in obj, get: obj => obj._torque, set: (obj, value) => { obj._torque = value; } }, metadata: _metadata }, __torque_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __localTorque_decorators, { kind: "field", name: "_localTorque", static: false, private: false, access: { has: obj => "_localTorque" in obj, get: obj => obj._localTorque, set: (obj, value) => { obj._localTorque = value; } }, metadata: _metadata }, __localTorque_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ConstantForce = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ConstantForce = _classThis;
})();
exports.ConstantForce = ConstantForce;
