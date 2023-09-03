"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationCurve = exports.evalOptCurve = exports.OptimizedKey = exports.Keyframe = void 0;
const CCEnum_1 = __importDefault(require("../../platform/CCEnum"));
const value_types_1 = require("../../value-types");
const CCClassDecorator_1 = require("../../platform/CCClassDecorator");
const LOOK_FORWARD = 3;
/**
 * !#en The wrap mode
 * !#zh 循环模式
 * @static
 * @enum AnimationCurve.WrapMode
 */
const WrapMode = (0, CCEnum_1.default)({
    /**
     * !#en Default
     * !#zh 默认模式
     * @property Default
     * @readonly
     * @type {Number}
     */
    Default: 0,
    /**
     * !#en Once Mode
     * !#zh Once 模式
     * @property Once
     * @readonly
     * @type {Number}
     */
    Once: 1,
    /**
     * !#en Loop Mode
     * !#zh Loop 模式
     * @property Loop
     * @readonly
     * @type {Number}
     */
    Loop: 2,
    /**
     * !#en PingPong Mode
     * !#zh PingPong 模式
     * @property PingPong
     * @readonly
     * @type {Number}
     */
    PingPong: 3,
    /**
     * !#en ClampForever Mode
     * !#zh ClampForever 模式
     * @property ClampForever
     * @readonly
     * @type {Number}
     */
    ClampForever: 4,
});
let Keyframe = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.Keyframe')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _time_decorators;
    let _time_initializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _inTangent_decorators;
    let _inTangent_initializers = [];
    let _outTangent_decorators;
    let _outTangent_initializers = [];
    var Keyframe = _classThis = class {
        constructor(time, value, inTangent, outTangent) {
            /**
             * !#en Time.
             * !#zh 时间。
             * @property {Number} time
             */
            this.time = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _time_initializers, 0));
            /**
             * !#en Key value.
             * !#zh 关键值。
             * @property {Number} value
             */
            this.value = __runInitializers(this, _value_initializers, 0);
            /**
             * !#en In tangent value.
             * !#zh 左切值。
             * @property {Number} inTangent
             */
            this.inTangent = __runInitializers(this, _inTangent_initializers, 0);
            /**
             * !#en Out tangent value.
             * !#zh 右切值。
             * @property {Number} outTangent
             */
            this.outTangent = __runInitializers(this, _outTangent_initializers, 0);
            this.time = time || 0;
            this.value = value || 0;
            this.inTangent = inTangent || 0;
            this.outTangent = outTangent || 0;
        }
    };
    __setFunctionName(_classThis, "Keyframe");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _time_decorators = [CCClassDecorator_1.property];
        _value_decorators = [CCClassDecorator_1.property];
        _inTangent_decorators = [CCClassDecorator_1.property];
        _outTangent_decorators = [CCClassDecorator_1.property];
        __esDecorate(null, null, _time_decorators, { kind: "field", name: "time", static: false, private: false, access: { has: obj => "time" in obj, get: obj => obj.time, set: (obj, value) => { obj.time = value; } }, metadata: _metadata }, _time_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _inTangent_decorators, { kind: "field", name: "inTangent", static: false, private: false, access: { has: obj => "inTangent" in obj, get: obj => obj.inTangent, set: (obj, value) => { obj.inTangent = value; } }, metadata: _metadata }, _inTangent_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _outTangent_decorators, { kind: "field", name: "outTangent", static: false, private: false, access: { has: obj => "outTangent" in obj, get: obj => obj.outTangent, set: (obj, value) => { obj.outTangent = value; } }, metadata: _metadata }, _outTangent_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Keyframe = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Keyframe = _classThis;
})();
exports.Keyframe = Keyframe;
class OptimizedKey {
    constructor() {
        this.index = 0;
        this.time = 0;
        this.endTime = 0;
        this.coefficient = null;
        this.index = -1;
        this.time = 0;
        this.endTime = 0;
        this.coefficient = new Float32Array(4);
    }
    evaluate(T) {
        const t = T - this.time;
        return evalOptCurve(t, this.coefficient);
    }
}
exports.OptimizedKey = OptimizedKey;
function evalOptCurve(t, coefs) {
    return (t * (t * (t * coefs[0] + coefs[1]) + coefs[2])) + coefs[3];
}
exports.evalOptCurve = evalOptCurve;
const defaultKFStart = new Keyframe(0, 1, 0, 0);
const defaultKFEnd = new Keyframe(1, 1, 0, 0);
/**
 * !#en The animation curve of 3d particle.
 * !#zh 3D 粒子动画曲线
 * @class AnimationCurve
 */
let AnimationCurve = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.AnimationCurve')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _keyFrames_decorators;
    let _keyFrames_initializers = [];
    let _preWrapMode_decorators;
    let _preWrapMode_initializers = [];
    let _postWrapMode_decorators;
    let _postWrapMode_initializers = [];
    var AnimationCurve = _classThis = class {
        constructor(keyFrames = null) {
            /**
             * !#en Array of key value.
             * !#zh 关键值列表。
             * @property {[Keyframe]} keyFrames
             */
            this.keyFrames = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _keyFrames_initializers, new Array()));
            /**
             * !#en Pre-wrap mode.
             * !#zh 前置循环模式。
             * @property {WrapMode} preWrapMode
             */
            this.preWrapMode = __runInitializers(this, _preWrapMode_initializers, WrapMode.ClampForever);
            /**
             * !#en Post-wrap mode.
             * !#zh 后置循环模式。
             * @property {WrapMode} postWrapMode
             */
            this.postWrapMode = __runInitializers(this, _postWrapMode_initializers, WrapMode.ClampForever);
            this.cachedKey = null;
            if (keyFrames) {
                this.keyFrames = keyFrames;
            }
            else {
                this.keyFrames.push(defaultKFStart);
                this.keyFrames.push(defaultKFEnd);
            }
            this.cachedKey = new OptimizedKey();
        }
        addKey(keyFrame) {
            if (this.keyFrames == null) {
                this.keyFrames = [];
            }
            this.keyFrames.push(keyFrame);
        }
        // cubic Hermite spline
        evaluate_slow(time) {
            let wrappedTime = time;
            const wrapMode = time < 0 ? this.preWrapMode : this.postWrapMode;
            const startTime = this.keyFrames[0].time;
            const endTime = this.keyFrames[this.keyFrames.length - 1].time;
            switch (wrapMode) {
                case WrapMode.Loop:
                    wrappedTime = (0, value_types_1.repeat)(time - startTime, endTime - startTime) + startTime;
                    break;
                case WrapMode.PingPong:
                    wrappedTime = (0, value_types_1.pingPong)(time - startTime, endTime - startTime) + startTime;
                    break;
                case WrapMode.ClampForever:
                    wrappedTime = (0, value_types_1.clamp)(time, startTime, endTime);
                    break;
            }
            let preKFIndex = 0;
            if (wrappedTime > this.keyFrames[0].time) {
                if (wrappedTime >= this.keyFrames[this.keyFrames.length - 1].time) {
                    preKFIndex = this.keyFrames.length - 2;
                }
                else {
                    for (let i = 0; i < this.keyFrames.length - 1; i++) {
                        if (wrappedTime >= this.keyFrames[0].time && wrappedTime <= this.keyFrames[i + 1].time) {
                            preKFIndex = i;
                            break;
                        }
                    }
                }
            }
            const keyframe0 = this.keyFrames[preKFIndex];
            const keyframe1 = this.keyFrames[preKFIndex + 1];
            const t = (0, value_types_1.inverseLerp)(keyframe0.time, keyframe1.time, wrappedTime);
            const dt = keyframe1.time - keyframe0.time;
            const m0 = keyframe0.outTangent * dt;
            const m1 = keyframe1.inTangent * dt;
            const t2 = t * t;
            const t3 = t2 * t;
            const a = 2 * t3 - 3 * t2 + 1;
            const b = t3 - 2 * t2 + t;
            const c = t3 - t2;
            const d = -2 * t3 + 3 * t2;
            return a * keyframe0.value + b * m0 + c * m1 + d * keyframe1.value;
        }
        evaluate(time) {
            let wrappedTime = time;
            const wrapMode = time < 0 ? this.preWrapMode : this.postWrapMode;
            const startTime = this.keyFrames[0].time;
            const endTime = this.keyFrames[this.keyFrames.length - 1].time;
            switch (wrapMode) {
                case WrapMode.Loop:
                    wrappedTime = (0, value_types_1.repeat)(time - startTime, endTime - startTime) + startTime;
                    break;
                case WrapMode.PingPong:
                    wrappedTime = (0, value_types_1.pingPong)(time - startTime, endTime - startTime) + startTime;
                    break;
                case WrapMode.ClampForever:
                    wrappedTime = (0, value_types_1.clamp)(time, startTime, endTime);
                    break;
            }
            if (!CC_EDITOR) {
                if (wrappedTime >= this.cachedKey.time && wrappedTime < this.cachedKey.endTime) {
                    return this.cachedKey.evaluate(wrappedTime);
                }
            }
            const leftIndex = this.findIndex(this.cachedKey, wrappedTime);
            const rightIndex = Math.min(leftIndex + 1, this.keyFrames.length - 1);
            this.calcOptimizedKey(this.cachedKey, leftIndex, rightIndex);
            return this.cachedKey.evaluate(wrappedTime);
        }
        calcOptimizedKey(optKey, leftIndex, rightIndex) {
            const lhs = this.keyFrames[leftIndex];
            const rhs = this.keyFrames[rightIndex];
            optKey.index = leftIndex;
            optKey.time = lhs.time;
            optKey.endTime = rhs.time;
            const dx = rhs.time - lhs.time;
            const dy = rhs.value - lhs.value;
            const length = 1 / (dx * dx);
            const d1 = lhs.outTangent * dx;
            const d2 = rhs.inTangent * dx;
            optKey.coefficient[0] = (d1 + d2 - dy - dy) * length / dx;
            optKey.coefficient[1] = (dy + dy + dy - d1 - d1 - d2) * length;
            optKey.coefficient[2] = lhs.outTangent;
            optKey.coefficient[3] = lhs.value;
        }
        findIndex(optKey, t) {
            const cachedIndex = optKey.index;
            if (cachedIndex !== -1) {
                const cachedTime = this.keyFrames[cachedIndex].time;
                if (t > cachedTime) {
                    for (let i = 0; i < LOOK_FORWARD; i++) {
                        const currIndex = cachedIndex + i;
                        if (currIndex + 1 < this.keyFrames.length && this.keyFrames[currIndex + 1].time > t) {
                            return currIndex;
                        }
                    }
                }
                else {
                    for (let i = 0; i < LOOK_FORWARD; i++) {
                        const currIndex = cachedIndex - i;
                        if ((currIndex - 1) >= 0 && this.keyFrames[currIndex - 1].time <= t) {
                            return currIndex - 1;
                        }
                    }
                }
            }
            let left = 0;
            let right = this.keyFrames.length;
            let mid;
            while (right - left > 1) {
                mid = Math.floor((left + right) / 2);
                if (this.keyFrames[mid].time >= t) {
                    right = mid;
                }
                else {
                    left = mid;
                }
            }
            return left;
        }
    };
    __setFunctionName(_classThis, "AnimationCurve");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _keyFrames_decorators = [(0, CCClassDecorator_1.property)({
                type: [Keyframe],
            })];
        _preWrapMode_decorators = [(0, CCClassDecorator_1.property)({
                type: cc.Enum(WrapMode),
                visible: false,
            })];
        _postWrapMode_decorators = [(0, CCClassDecorator_1.property)({
                type: cc.Enum(WrapMode),
                visible: false,
            })];
        __esDecorate(null, null, _keyFrames_decorators, { kind: "field", name: "keyFrames", static: false, private: false, access: { has: obj => "keyFrames" in obj, get: obj => obj.keyFrames, set: (obj, value) => { obj.keyFrames = value; } }, metadata: _metadata }, _keyFrames_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _preWrapMode_decorators, { kind: "field", name: "preWrapMode", static: false, private: false, access: { has: obj => "preWrapMode" in obj, get: obj => obj.preWrapMode, set: (obj, value) => { obj.preWrapMode = value; } }, metadata: _metadata }, _preWrapMode_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _postWrapMode_decorators, { kind: "field", name: "postWrapMode", static: false, private: false, access: { has: obj => "postWrapMode" in obj, get: obj => obj.postWrapMode, set: (obj, value) => { obj.postWrapMode = value; } }, metadata: _metadata }, _postWrapMode_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnimationCurve = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnimationCurve = _classThis;
})();
exports.AnimationCurve = AnimationCurve;
cc.Keyframe = Keyframe;
cc.AnimationCurve = AnimationCurve;
