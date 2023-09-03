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
exports.Physics3DManager = void 0;
const instance_1 = require("./instance");
const physics_material_1 = require("./assets/physics-material");
const physics_ray_result_1 = require("./physics-ray-result");
const { property, ccclass } = cc._decorator;
/**
 * !#en
 * Physical systems manager.
 * !#zh
 * 物理系统管理器。
 * @class Physics3DManager
 */
let Physics3DManager = (() => {
    let _classDecorators = [ccclass("cc.Physics3DManager")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let __enabled_decorators;
    let __enabled_initializers = [];
    let __allowSleep_decorators;
    let __allowSleep_initializers = [];
    let __gravity_decorators;
    let __gravity_initializers = [];
    let __maxSubStep_decorators;
    let __maxSubStep_initializers = [];
    let __fixedTime_decorators;
    let __fixedTime_initializers = [];
    let __useFixedTime_decorators;
    let __useFixedTime_initializers = [];
    var Physics3DManager = _classThis = class {
        /**
         * !#en
         * Whether to enable the physics system, default is false.
         * !#zh
         * 是否启用物理系统，默认不启用。
         * @property {boolean} enabled
         */
        get enabled() {
            return this._enabled;
        }
        set enabled(value) {
            this._enabled = value;
        }
        /**
         * !#en
         * Whether to allow the physics system to automatically hibernate, default is true.
         * !#zh
         * 物理系统是否允许自动休眠，默认为 true。
         * @property {boolean} allowSleep
         */
        get allowSleep() {
            return this._allowSleep;
        }
        set allowSleep(v) {
            this._allowSleep = v;
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this.physicsWorld.allowSleep = this._allowSleep;
            }
        }
        /**
         * !#en
         * The maximum number of sub-steps a full step is permitted to be broken into, default is 2.
         * !#zh
         * 物理每帧模拟的最大子步数，默认为 2。
         * @property {number} maxSubStep
         */
        get maxSubStep() {
            return this._maxSubStep;
        }
        set maxSubStep(value) {
            this._maxSubStep = value;
        }
        /**
         * !#en
         * Time spent in each simulation of physics, default is 1/60s.
         * !#zh
         * 物理每步模拟消耗的固定时间，默认为 1/60 秒。
         * @property {number} deltaTime
         */
        get deltaTime() {
            return this._fixedTime;
        }
        set deltaTime(value) {
            this._fixedTime = value;
        }
        /**
         * !#en
         * Whether to use a fixed time step.
         * !#zh
         * 是否使用固定的时间步长。
         * @property {boolean} useFixedTime
         */
        get useFixedTime() {
            return this._useFixedTime;
        }
        set useFixedTime(value) {
            this._useFixedTime = value;
        }
        /**
         * !#en
         * Gravity value of the physics simulation, default is (0, -10, 0).
         * !#zh
         * 物理世界的重力数值，默认为 (0, -10, 0)。
         * @property {Vec3} gravity
         */
        get gravity() {
            return this._gravity;
        }
        set gravity(gravity) {
            this._gravity.set(gravity);
            if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
                this.physicsWorld.gravity = gravity;
            }
        }
        /**
         * !#en
         * Gets the global default physical material. Note that builtin is null.
         * !#zh
         * 获取全局的默认物理材质，注意：builtin 时为 null。
         * @property {PhysicsMaterial | null} defaultMaterial
         * @readonly
         */
        get defaultMaterial() {
            return this._material;
        }
        constructor() {
            this.physicsWorld = (__runInitializers(this, _instanceExtraInitializers), void 0);
            this.raycastClosestResult = new physics_ray_result_1.PhysicsRayResult();
            this.raycastResults = [];
            this._enabled = __runInitializers(this, __enabled_initializers, false);
            this._allowSleep = __runInitializers(this, __allowSleep_initializers, true);
            this._gravity = __runInitializers(this, __gravity_initializers, new cc.Vec3(0, -10, 0));
            this._maxSubStep = __runInitializers(this, __maxSubStep_initializers, 1);
            this._fixedTime = __runInitializers(this, __fixedTime_initializers, 1.0 / 60.0);
            this._useFixedTime = __runInitializers(this, __useFixedTime_initializers, true);
            this.useAccumulator = false;
            this._accumulator = 0;
            this.useFixedDigit = false;
            this.useInternalTime = false;
            this.fixDigits = {
                position: 5,
                rotation: 12,
                timeNow: 3,
            };
            this._deltaTime = 0;
            this._lastTime = 0;
            this._material = null;
            this.raycastOptions = {
                'groupIndex': -1,
                'queryTrigger': true,
                'maxDistance': Infinity
            };
            this.raycastResultPool = new cc.RecyclePool(() => {
                return new physics_ray_result_1.PhysicsRayResult();
            }, 1);
            cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
            this.physicsWorld = (0, instance_1.createPhysicsWorld)();
            this._lastTime = performance.now();
            if (!CC_PHYSICS_BUILTIN) {
                this.gravity = this._gravity;
                this.allowSleep = this._allowSleep;
                this._material = new physics_material_1.PhysicsMaterial();
                this._material.friction = 0.1;
                this._material.restitution = 0.1;
                this._material.on('physics_material_update', this._updateMaterial, this);
                this.physicsWorld.defaultMaterial = this._material;
            }
        }
        /**
         * !#en
         * A physical system simulation is performed once and will now be performed automatically once per frame.
         * !#zh
         * 执行一次物理系统的模拟，目前将在每帧自动执行一次。
         * @method update
         * @param {number} deltaTime The time difference from the last execution is currently elapsed per frame
         */
        update(deltaTime) {
            if (CC_EDITOR) {
                return;
            }
            if (!this._enabled) {
                return;
            }
            if (this.useInternalTime) {
                var now = parseFloat(performance.now().toFixed(this.fixDigits.timeNow));
                this._deltaTime = now > this._lastTime ? (now - this._lastTime) / 1000 : 0;
                this._lastTime = now;
            }
            else {
                this._deltaTime = deltaTime;
            }
            cc.director.emit(cc.Director.EVENT_BEFORE_PHYSICS);
            if (CC_PHYSICS_BUILTIN) {
                this.physicsWorld.step(this._fixedTime);
            }
            else {
                if (this._useFixedTime) {
                    this.physicsWorld.step(this._fixedTime);
                }
                else {
                    if (this.useAccumulator) {
                        let i = 0;
                        this._accumulator += this._deltaTime;
                        while (i < this._maxSubStep && this._accumulator > this._fixedTime) {
                            this.physicsWorld.step(this._fixedTime);
                            this._accumulator -= this._fixedTime;
                            i++;
                        }
                    }
                    else {
                        this.physicsWorld.step(this._fixedTime, this._deltaTime, this._maxSubStep);
                    }
                }
            }
            cc.director.emit(cc.Director.EVENT_AFTER_PHYSICS);
        }
        /**
         * !#en Detect all collision boxes and return all detected results, or null if none is detected. Note that the return value is taken from the object pool, so do not save the result reference or modify the result.
         * !#zh 检测所有的碰撞盒，并返回所有被检测到的结果，若没有检测到，则返回空值。注意返回值是从对象池中取的，所以请不要保存结果引用或者修改结果。
         * @method raycast
         * @param {Ray} worldRay A ray in world space
         * @param {number|string} groupIndexOrName Collision group index or group name
         * @param {number} maxDistance Maximum detection distance
         * @param {boolean} queryTrigger Detect trigger or not
         * @return {PhysicsRayResult[] | null} Detected result
         */
        raycast(worldRay, groupIndexOrName = 0, maxDistance = Infinity, queryTrigger = true) {
            this.raycastResultPool.reset();
            this.raycastResults.length = 0;
            if (typeof groupIndexOrName == "string") {
                let groupIndex = cc.game.groupList.indexOf(groupIndexOrName);
                if (groupIndex == -1)
                    groupIndex = 0;
                this.raycastOptions.groupIndex = groupIndex;
            }
            else {
                this.raycastOptions.groupIndex = groupIndexOrName;
            }
            this.raycastOptions.maxDistance = maxDistance;
            this.raycastOptions.queryTrigger = queryTrigger;
            let result = this.physicsWorld.raycast(worldRay, this.raycastOptions, this.raycastResultPool, this.raycastResults);
            if (result)
                return this.raycastResults;
            return null;
        }
        /**
         * !#en Detect all collision boxes and return the detection result with the shortest ray distance. If not, return null value. Note that the return value is taken from the object pool, so do not save the result reference or modify the result.
         * !#zh 检测所有的碰撞盒，并返回射线距离最短的检测结果，若没有，则返回空值。注意返回值是从对象池中取的，所以请不要保存结果引用或者修改结果。
         * @method raycastClosest
         * @param {Ray} worldRay A ray in world space
         * @param {number|string} groupIndexOrName Collision group index or group name
         * @param {number} maxDistance Maximum detection distance
         * @param {boolean} queryTrigger Detect trigger or not
         * @return {PhysicsRayResult|null} Detected result
         */
        raycastClosest(worldRay, groupIndexOrName = 0, maxDistance = Infinity, queryTrigger = true) {
            if (typeof groupIndexOrName == "string") {
                let groupIndex = cc.game.groupList.indexOf(groupIndexOrName);
                if (groupIndex == -1)
                    groupIndex = 0;
                this.raycastOptions.groupIndex = groupIndex;
            }
            else {
                this.raycastOptions.groupIndex = groupIndexOrName;
            }
            this.raycastOptions.maxDistance = maxDistance;
            this.raycastOptions.queryTrigger = queryTrigger;
            let result = this.physicsWorld.raycastClosest(worldRay, this.raycastOptions, this.raycastClosestResult);
            if (result)
                return this.raycastClosestResult;
            return null;
        }
        _updateMaterial() {
            if (!CC_PHYSICS_BUILTIN) {
                this.physicsWorld.defaultMaterial = this._material;
            }
        }
    };
    __setFunctionName(_classThis, "Physics3DManager");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __enabled_decorators = [property];
        __allowSleep_decorators = [property];
        __gravity_decorators = [property];
        __maxSubStep_decorators = [property];
        __fixedTime_decorators = [property];
        __useFixedTime_decorators = [property];
        __esDecorate(null, null, __enabled_decorators, { kind: "field", name: "_enabled", static: false, private: false, access: { has: obj => "_enabled" in obj, get: obj => obj._enabled, set: (obj, value) => { obj._enabled = value; } }, metadata: _metadata }, __enabled_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __allowSleep_decorators, { kind: "field", name: "_allowSleep", static: false, private: false, access: { has: obj => "_allowSleep" in obj, get: obj => obj._allowSleep, set: (obj, value) => { obj._allowSleep = value; } }, metadata: _metadata }, __allowSleep_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __gravity_decorators, { kind: "field", name: "_gravity", static: false, private: false, access: { has: obj => "_gravity" in obj, get: obj => obj._gravity, set: (obj, value) => { obj._gravity = value; } }, metadata: _metadata }, __gravity_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __maxSubStep_decorators, { kind: "field", name: "_maxSubStep", static: false, private: false, access: { has: obj => "_maxSubStep" in obj, get: obj => obj._maxSubStep, set: (obj, value) => { obj._maxSubStep = value; } }, metadata: _metadata }, __maxSubStep_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __fixedTime_decorators, { kind: "field", name: "_fixedTime", static: false, private: false, access: { has: obj => "_fixedTime" in obj, get: obj => obj._fixedTime, set: (obj, value) => { obj._fixedTime = value; } }, metadata: _metadata }, __fixedTime_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __useFixedTime_decorators, { kind: "field", name: "_useFixedTime", static: false, private: false, access: { has: obj => "_useFixedTime" in obj, get: obj => obj._useFixedTime, set: (obj, value) => { obj._useFixedTime = value; } }, metadata: _metadata }, __useFixedTime_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Physics3DManager = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Physics3DManager = _classThis;
})();
exports.Physics3DManager = Physics3DManager;
