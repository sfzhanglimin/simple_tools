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
exports.Collider3D = void 0;
const physics_material_1 = require("../../assets/physics-material");
const { ccclass, property } = cc._decorator;
const Vec3 = cc.Vec3;
/**
 * !#en
 * The base class of the collider.
 * !#zh
 * 碰撞器的基类。
 * @class Collider3D
 * @extends Component
 * @uses EventTarget
 */
let Collider3D = (() => {
    let _classDecorators = [ccclass('cc.Collider3D')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = cc.Component;
    let _instanceExtraInitializers = [];
    let _get_sharedMaterial_decorators;
    let _get_isTrigger_decorators;
    let _get_center_decorators;
    let __material_decorators;
    let __material_initializers = [];
    let __isTrigger_decorators;
    let __isTrigger_initializers = [];
    let __center_decorators;
    let __center_initializers = [];
    var Collider3D = _classThis = class extends _classSuper {
        /**
         * @property {PhysicsMaterial} sharedMaterial
         */
        get sharedMaterial() {
            return this._material;
        }
        set sharedMaterial(value) {
            this.material = value;
        }
        get material() {
            if (!CC_PHYSICS_BUILTIN) {
                if (this._isSharedMaterial && this._material != null) {
                    this._material.off('physics_material_update', this._updateMaterial, this);
                    this._material = this._material.clone();
                    this._material.on('physics_material_update', this._updateMaterial, this);
                    this._isSharedMaterial = false;
                }
            }
            return this._material;
        }
        set material(value) {
            if (CC_EDITOR || CC_PHYSICS_BUILTIN) {
                this._material = value;
                return;
            }
            if (value != null && this._material != null) {
                if (this._material._uuid != value._uuid) {
                    this._material.off('physics_material_update', this._updateMaterial, this);
                    value.on('physics_material_update', this._updateMaterial, this);
                    this._isSharedMaterial = false;
                    this._material = value;
                }
            }
            else if (value != null && this._material == null) {
                value.on('physics_material_update', this._updateMaterial, this);
                this._material = value;
            }
            else if (value == null && this._material != null) {
                this._material.off('physics_material_update', this._updateMaterial, this);
                this._material = value;
            }
            this._updateMaterial();
        }
        /**
         * !#en
         * get or set the collider is trigger, this will be always trigger if using builtin.
         * !#zh
         * 获取或设置碰撞器是否为触发器。
         * @property {Boolean} isTrigger
         */
        get isTrigger() {
            return this._isTrigger;
        }
        set isTrigger(value) {
            this._isTrigger = value;
            if (!CC_EDITOR) {
                this._shape.isTrigger = this._isTrigger;
            }
        }
        /**
         * !#en
         * get or set the center of the collider, in local space.
         * !#zh
         * 获取或设置碰撞器的中心点。
         * @property {Vec3} center
         */
        get center() {
            return this._center;
        }
        set center(value) {
            Vec3.copy(this._center, value);
            if (!CC_EDITOR) {
                this._shape.center = this._center;
            }
        }
        /**
         * !#en
         * get the collider attached rigidbody, this may be null.
         * !#zh
         * 获取碰撞器所绑定的刚体组件，可能为 null。
         * @property {RigidBody3D|null} attachedRigidbody
         * @readonly
         */
        get attachedRigidbody() {
            return this.shape.attachedRigidBody;
        }
        /**
         * !#en
         * get collider shape.
         * !#zh
         * 获取碰撞器形状。
         * @property {IBaseShape} shape
         * @readonly
         */
        get shape() {
            return this._shape;
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
            /// PRIVATE PROPERTY ///
            this._shape = (__runInitializers(this, _instanceExtraInitializers), void 0);
            this._isSharedMaterial = true;
            this._material = __runInitializers(this, __material_initializers, null);
            this._isTrigger = __runInitializers(this, __isTrigger_initializers, false);
            this._center = __runInitializers(this, __center_initializers, new Vec3());
            cc.EventTarget.call(this);
        }
        /// EVENT INTERFACE ///
        /**
         * !#en
         * Register an callback of a specific event type on the EventTarget.
         * This type of event should be triggered via `emit`.
         * !#zh
         * 注册事件目标的特定事件类型回调。这种类型的事件应该被 `emit` 触发。
         *
         * @method on
         * @param {String} type - The type of collider event can be `trigger-enter`, `trigger-stay`, `trigger-exit` or `collision-enter`, `collision-stay`, `collision-exit`.
         * @param {Function} callback - The callback that will be invoked when the event is dispatched.
         * The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param {ITriggerEvent|ICollisionEvent} callback.event Callback function argument
         * @param {Object} [target] - The target (this object) to invoke the callback, can be null.
         * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
         * @typescript
         * on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
         * @example
         * eventTarget.on('fire', function (event) {
         *     // event is ITriggerEvent or ICollisionEvent
         * }, node);
         */
        on(type, callback, target, useCapture) {
        }
        /**
         * !#en
         * Removes the listeners previously registered with the same type, callback, target and or useCapture,
         * if only type is passed as parameter, all listeners registered with that type will be removed.
         * !#zh
         * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
         *
         * @method off
         * @param {String} type - The type of collider event can be `trigger-enter`, `trigger-stay`, `trigger-exit` or `collision-enter`, `collision-stay`, `collision-exit`.
         * @param {Function} [callback] - The callback to remove.
         * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed.
         * @example
         * // register fire eventListener
         * var callback = eventTarget.on('fire', function () {
         *     cc.log("fire in the hole");
         * }, target);
         * // remove fire event listener
         * eventTarget.off('fire', callback, target);
         * // remove all fire event listeners
         * eventTarget.off('fire');
         */
        off(type, callback, target) {
        }
        /**
         * !#en
         * Register an callback of a specific event type on the EventTarget,
         * the callback will remove itself after the first time it is triggered.
         * !#zh
         * 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身。
         *
         * @method once
         * @param {String} type - The type of collider event can be `trigger-enter`, `trigger-stay`, `trigger-exit` or `collision-enter`, `collision-stay`, `collision-exit`.
         * @param {Function} callback - The callback that will be invoked when the event is dispatched.
         * The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param {ITriggerEvent|ICollisionEvent} callback.event callback function argument.
         * @param {Object} [target] - The target (this object) to invoke the callback, can be null.
         * @example
         * eventTarget.once('fire', function (event) {
         *     // event is ITriggerEvent or ICollisionEvent
         * }, node);
         */
        once(type, callback, target) {
        }
        /* declare for typescript tip */
        emit(key, ...args) {
        }
        /// COMPONENT LIFECYCLE ///
        __preload() {
            if (!CC_EDITOR) {
                this._shape.__preload(this);
            }
        }
        onLoad() {
            if (!CC_EDITOR) {
                if (!CC_PHYSICS_BUILTIN) {
                    this.sharedMaterial = this._material == null ? cc.director.getPhysics3DManager().defaultMaterial : this._material;
                }
                this._shape.onLoad();
            }
        }
        onEnable() {
            if (!CC_EDITOR) {
                this._shape.onEnable();
            }
        }
        onDisable() {
            if (!CC_EDITOR) {
                this._shape.onDisable();
            }
        }
        onDestroy() {
            if (!CC_EDITOR) {
                if (this._material) {
                    this._material.off('physics_material_update', this._updateMaterial, this);
                }
                this._shape.onDestroy();
            }
        }
        _updateMaterial() {
            if (!CC_EDITOR) {
                this._shape.material = this._material;
            }
        }
    };
    __setFunctionName(_classThis, "Collider3D");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_sharedMaterial_decorators = [property({
                type: physics_material_1.PhysicsMaterial,
                displayName: 'Material',
                displayOrder: -1
            })];
        _get_isTrigger_decorators = [property({
                displayOrder: 0
            })];
        _get_center_decorators = [property({
                type: cc.Vec3,
                displayOrder: 1
            })];
        __material_decorators = [property({ type: physics_material_1.PhysicsMaterial })];
        __isTrigger_decorators = [property];
        __center_decorators = [property];
        __esDecorate(_classThis, null, _get_sharedMaterial_decorators, { kind: "getter", name: "sharedMaterial", static: false, private: false, access: { has: obj => "sharedMaterial" in obj, get: obj => obj.sharedMaterial }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_isTrigger_decorators, { kind: "getter", name: "isTrigger", static: false, private: false, access: { has: obj => "isTrigger" in obj, get: obj => obj.isTrigger }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_center_decorators, { kind: "getter", name: "center", static: false, private: false, access: { has: obj => "center" in obj, get: obj => obj.center }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, __material_decorators, { kind: "field", name: "_material", static: false, private: false, access: { has: obj => "_material" in obj, get: obj => obj._material, set: (obj, value) => { obj._material = value; } }, metadata: _metadata }, __material_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __isTrigger_decorators, { kind: "field", name: "_isTrigger", static: false, private: false, access: { has: obj => "_isTrigger" in obj, get: obj => obj._isTrigger, set: (obj, value) => { obj._isTrigger = value; } }, metadata: _metadata }, __isTrigger_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __center_decorators, { kind: "field", name: "_center", static: false, private: false, access: { has: obj => "_center" in obj, get: obj => obj._center, set: (obj, value) => { obj._center = value; } }, metadata: _metadata }, __center_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Collider3D = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Collider3D = _classThis;
})();
exports.Collider3D = Collider3D;
cc.js.mixin(Collider3D.prototype, cc.EventTarget.prototype);
