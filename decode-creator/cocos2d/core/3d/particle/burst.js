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
const CCClassDecorator_1 = require("../../platform/CCClassDecorator");
const value_types_1 = require("../../value-types");
const curve_range_1 = __importDefault(require("./animator/curve-range"));
let Burst = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.Burst')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let __time_decorators;
    let __time_initializers = [];
    let _get_time_decorators;
    let _minCount_decorators;
    let _minCount_initializers = [];
    let _maxCount_decorators;
    let _maxCount_initializers = [];
    let __repeatCount_decorators;
    let __repeatCount_initializers = [];
    let _get_repeatCount_decorators;
    let _repeatInterval_decorators;
    let _repeatInterval_initializers = [];
    let _count_decorators;
    let _count_initializers = [];
    var Burst = _classThis = class {
        /**
         * !#en Time between the start of the particle system and the trigger of this Brust
         * !#zh 粒子系统开始运行到触发此次 Brust 的时间
         * @property {Number} time
         */
        get time() {
            return this._time;
        }
        set time(val) {
            this._time = val;
            this._curTime = val;
        }
        /**
         * !#en The number of times Burst was triggered.
         * !#zh Burst 的触发次数
         * @property {Number} repeatCount
         */
        get repeatCount() {
            return this._repeatCount;
        }
        set repeatCount(val) {
            this._repeatCount = val;
            this._remainingCount = val;
        }
        constructor() {
            this._time = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, __time_initializers, 0));
            /**
             * !#en Minimum number of emitted particles
             * !#zh 发射粒子的最小数量
             * @property {Number} minCount
             */
            this.minCount = __runInitializers(this, _minCount_initializers, 30);
            /**
             * !#en Maximum number of emitted particles
             * !#zh 发射粒子的最大数量
             * @property {Number} maxCount
             */
            this.maxCount = __runInitializers(this, _maxCount_initializers, 30);
            this._repeatCount = __runInitializers(this, __repeatCount_initializers, 1);
            /**
             * !#en Interval of each trigger
             * !#zh 每次触发的间隔时间
             * @property {Number} repeatInterval
             */
            this.repeatInterval = __runInitializers(this, _repeatInterval_initializers, 1);
            /**
             * !#en Number of particles emitted
             * !#zh 发射的粒子的数量
             * @property {CurveRange} count
             */
            this.count = __runInitializers(this, _count_initializers, new curve_range_1.default());
            this._remainingCount = 0;
            this._curTime = 0;
            this._remainingCount = 0;
            this._curTime = 0.0;
        }
        update(psys, dt) {
            if (this._remainingCount === 0) {
                this._remainingCount = this._repeatCount;
                this._curTime = this._time;
            }
            if (this._remainingCount > 0) {
                let preFrameTime = (0, value_types_1.repeat)(psys._time - psys.startDelay.evaluate(0, 1), psys.duration) - dt;
                preFrameTime = (preFrameTime > 0.0) ? preFrameTime : 0.0;
                const curFrameTime = (0, value_types_1.repeat)(psys.time - psys.startDelay.evaluate(0, 1), psys.duration);
                if (this._curTime >= preFrameTime && this._curTime < curFrameTime) {
                    psys.emit(this.count.evaluate(this._curTime / psys.duration, 1), dt - (curFrameTime - this._curTime));
                    this._curTime += this.repeatInterval;
                    --this._remainingCount;
                }
            }
        }
        getMaxCount(psys) {
            return this.count.getMax() * Math.min(Math.ceil(psys.duration / this.repeatInterval), this.repeatCount);
        }
    };
    __setFunctionName(_classThis, "Burst");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __time_decorators = [CCClassDecorator_1.property];
        _get_time_decorators = [CCClassDecorator_1.property];
        _minCount_decorators = [CCClassDecorator_1.property];
        _maxCount_decorators = [CCClassDecorator_1.property];
        __repeatCount_decorators = [CCClassDecorator_1.property];
        _get_repeatCount_decorators = [CCClassDecorator_1.property];
        _repeatInterval_decorators = [CCClassDecorator_1.property];
        _count_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
            })];
        __esDecorate(_classThis, null, _get_time_decorators, { kind: "getter", name: "time", static: false, private: false, access: { has: obj => "time" in obj, get: obj => obj.time }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_repeatCount_decorators, { kind: "getter", name: "repeatCount", static: false, private: false, access: { has: obj => "repeatCount" in obj, get: obj => obj.repeatCount }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, __time_decorators, { kind: "field", name: "_time", static: false, private: false, access: { has: obj => "_time" in obj, get: obj => obj._time, set: (obj, value) => { obj._time = value; } }, metadata: _metadata }, __time_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _minCount_decorators, { kind: "field", name: "minCount", static: false, private: false, access: { has: obj => "minCount" in obj, get: obj => obj.minCount, set: (obj, value) => { obj.minCount = value; } }, metadata: _metadata }, _minCount_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _maxCount_decorators, { kind: "field", name: "maxCount", static: false, private: false, access: { has: obj => "maxCount" in obj, get: obj => obj.maxCount, set: (obj, value) => { obj.maxCount = value; } }, metadata: _metadata }, _maxCount_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __repeatCount_decorators, { kind: "field", name: "_repeatCount", static: false, private: false, access: { has: obj => "_repeatCount" in obj, get: obj => obj._repeatCount, set: (obj, value) => { obj._repeatCount = value; } }, metadata: _metadata }, __repeatCount_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _repeatInterval_decorators, { kind: "field", name: "repeatInterval", static: false, private: false, access: { has: obj => "repeatInterval" in obj, get: obj => obj.repeatInterval, set: (obj, value) => { obj.repeatInterval = value; } }, metadata: _metadata }, _repeatInterval_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _count_decorators, { kind: "field", name: "count", static: false, private: false, access: { has: obj => "count" in obj, get: obj => obj.count, set: (obj, value) => { obj.count = value; } }, metadata: _metadata }, _count_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Burst = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Burst = _classThis;
})();
exports.default = Burst;
