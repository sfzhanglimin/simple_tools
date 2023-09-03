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
exports.Mode = void 0;
const CCClassDecorator_1 = require("../../../platform/CCClassDecorator");
const CCEnum_1 = __importDefault(require("../../../platform/CCEnum"));
const value_types_1 = require("../../../value-types");
const curve_1 = require("../curve");
const SerializableTable = CC_EDITOR && [
    ["mode", "constant", "multiplier"],
    ["mode", "curve", "multiplier"],
    ["mode", "curveMin", "curveMax", "multiplier"],
    ["mode", "constantMin", "constantMax", "multiplier"]
];
exports.Mode = (0, CCEnum_1.default)({
    Constant: 0,
    Curve: 1,
    TwoCurves: 2,
    TwoConstants: 3,
});
let CurveRange = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.CurveRange')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _mode_decorators;
    let _mode_initializers = [];
    let _curve_decorators;
    let _curve_initializers = [];
    let _curveMin_decorators;
    let _curveMin_initializers = [];
    let _curveMax_decorators;
    let _curveMax_initializers = [];
    let _constant_decorators;
    let _constant_initializers = [];
    let _constantMin_decorators;
    let _constantMin_initializers = [];
    let _constantMax_decorators;
    let _constantMax_initializers = [];
    let _multiplier_decorators;
    let _multiplier_initializers = [];
    var CurveRange = _classThis = class {
        constructor() {
            /**
             * !#en Curve type.
             * !#zh 曲线类型。
             * @property {Mode} mode
             */
            this.mode = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _mode_initializers, exports.Mode.Constant));
            /**
             * !#en The curve to use when mode is Curve.
             * !#zh 当 mode 为 Curve 时，使用的曲线。
             * @property {AnimationCurve} curve
             */
            this.curve = __runInitializers(this, _curve_initializers, new curve_1.AnimationCurve());
            /**
             * !#en The lower limit of the curve to use when mode is TwoCurves
             * !#zh 当 mode 为 TwoCurves 时，使用的曲线下限。
             * @property {AnimationCurve} curveMin
             */
            this.curveMin = __runInitializers(this, _curveMin_initializers, new curve_1.AnimationCurve());
            /**
             * !#en The upper limit of the curve to use when mode is TwoCurves
             * !#zh 当 mode 为 TwoCurves 时，使用的曲线上限。
             * @property {AnimationCurve} curveMax
             */
            this.curveMax = __runInitializers(this, _curveMax_initializers, new curve_1.AnimationCurve());
            /**
             * !#en When mode is Constant, the value of the curve.
             * !#zh 当 mode 为 Constant 时，曲线的值。
             * @property {Number} constant
             */
            this.constant = __runInitializers(this, _constant_initializers, 0);
            /**
             * !#en The lower limit of the curve to use when mode is TwoConstants
             * !#zh 当 mode 为 TwoConstants 时，曲线的下限。
             * @property {Number} constantMin
             */
            this.constantMin = __runInitializers(this, _constantMin_initializers, 0);
            /**
             * !#en The upper limit of the curve to use when mode is TwoConstants
             * !#zh 当 mode 为 TwoConstants 时，曲线的上限。
             * @property {Number} constantMax
             */
            this.constantMax = __runInitializers(this, _constantMax_initializers, 0);
            /**
             * !#en Coefficients applied to curve interpolation.
             * !#zh 应用于曲线插值的系数。
             * @property {Number} multiplier
             */
            this.multiplier = __runInitializers(this, _multiplier_initializers, 1);
        }
        evaluate(time, rndRatio) {
            switch (this.mode) {
                case exports.Mode.Constant:
                    return this.constant;
                case exports.Mode.Curve:
                    return this.curve.evaluate(time) * this.multiplier;
                case exports.Mode.TwoCurves:
                    return (0, value_types_1.lerp)(this.curveMin.evaluate(time), this.curveMax.evaluate(time), rndRatio) * this.multiplier;
                case exports.Mode.TwoConstants:
                    return (0, value_types_1.lerp)(this.constantMin, this.constantMax, rndRatio);
            }
        }
        getMax() {
            switch (this.mode) {
                case exports.Mode.Constant:
                    return this.constant;
                case exports.Mode.Curve:
                    return this.multiplier;
                case exports.Mode.TwoConstants:
                    return this.constantMax;
                case exports.Mode.TwoCurves:
                    return this.multiplier;
            }
            return 0;
        }
    };
    __setFunctionName(_classThis, "CurveRange");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _mode_decorators = [(0, CCClassDecorator_1.property)({
                type: exports.Mode,
            })];
        _curve_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_1.AnimationCurve,
            })];
        _curveMin_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_1.AnimationCurve,
            })];
        _curveMax_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_1.AnimationCurve,
            })];
        _constant_decorators = [CCClassDecorator_1.property];
        _constantMin_decorators = [CCClassDecorator_1.property];
        _constantMax_decorators = [CCClassDecorator_1.property];
        _multiplier_decorators = [CCClassDecorator_1.property];
        __esDecorate(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode, set: (obj, value) => { obj.mode = value; } }, metadata: _metadata }, _mode_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _curve_decorators, { kind: "field", name: "curve", static: false, private: false, access: { has: obj => "curve" in obj, get: obj => obj.curve, set: (obj, value) => { obj.curve = value; } }, metadata: _metadata }, _curve_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _curveMin_decorators, { kind: "field", name: "curveMin", static: false, private: false, access: { has: obj => "curveMin" in obj, get: obj => obj.curveMin, set: (obj, value) => { obj.curveMin = value; } }, metadata: _metadata }, _curveMin_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _curveMax_decorators, { kind: "field", name: "curveMax", static: false, private: false, access: { has: obj => "curveMax" in obj, get: obj => obj.curveMax, set: (obj, value) => { obj.curveMax = value; } }, metadata: _metadata }, _curveMax_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _constant_decorators, { kind: "field", name: "constant", static: false, private: false, access: { has: obj => "constant" in obj, get: obj => obj.constant, set: (obj, value) => { obj.constant = value; } }, metadata: _metadata }, _constant_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _constantMin_decorators, { kind: "field", name: "constantMin", static: false, private: false, access: { has: obj => "constantMin" in obj, get: obj => obj.constantMin, set: (obj, value) => { obj.constantMin = value; } }, metadata: _metadata }, _constantMin_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _constantMax_decorators, { kind: "field", name: "constantMax", static: false, private: false, access: { has: obj => "constantMax" in obj, get: obj => obj.constantMax, set: (obj, value) => { obj.constantMax = value; } }, metadata: _metadata }, _constantMax_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _multiplier_decorators, { kind: "field", name: "multiplier", static: false, private: false, access: { has: obj => "multiplier" in obj, get: obj => obj.multiplier, set: (obj, value) => { obj.multiplier = value; } }, metadata: _metadata }, _multiplier_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CurveRange = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.Mode = exports.Mode;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CurveRange = _classThis;
})();
exports.default = CurveRange;
CC_EDITOR && (CurveRange.prototype._onBeforeSerialize = function (props) { return SerializableTable[this.mode]; });
cc.CurveRange = CurveRange;
