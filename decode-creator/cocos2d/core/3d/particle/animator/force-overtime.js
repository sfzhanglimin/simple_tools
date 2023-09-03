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
const CCClassDecorator_1 = require("../../../platform/CCClassDecorator");
const value_types_1 = require("../../../value-types");
const enum_1 = require("../enum");
const particle_general_function_1 = require("../particle-general-function");
const curve_range_1 = __importDefault(require("./curve-range"));
// tslint:disable: max-line-length
const FORCE_OVERTIME_RAND_OFFSET = 212165;
const _temp_v3 = cc.v3();
let ForceOvertimeModule = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.ForceOvertimeModule')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _enable_decorators;
    let _enable_initializers = [];
    let _space_decorators;
    let _space_initializers = [];
    let _x_decorators;
    let _x_initializers = [];
    let _y_decorators;
    let _y_initializers = [];
    let _z_decorators;
    let _z_initializers = [];
    var ForceOvertimeModule = _classThis = class {
        constructor() {
            /**
             * !#en The enable of ColorOvertimeModule.
             * !#zh 是否启用
             * @property {Boolean} enable
             */
            this.enable = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _enable_initializers, false));
            /**
             * !#en Coordinate system used in acceleration calculation.
             * !#zh 加速度计算时采用的坐标系。
             * @property {Space} space
             */
            this.space = __runInitializers(this, _space_initializers, enum_1.Space.Local);
            /**
             * !#en X-axis acceleration component.
             * !#zh X 轴方向上的加速度分量。
             * @property {CurveRange} x
             */
            this.x = __runInitializers(this, _x_initializers, new curve_range_1.default());
            /**
             * !#en Y-axis acceleration component.
             * !#zh Y 轴方向上的加速度分量。
             * @property {CurveRange} y
             */
            this.y = __runInitializers(this, _y_initializers, new curve_range_1.default());
            /**
             * !#en Z-axis acceleration component.
             * !#zh Z 轴方向上的加速度分量。
             * @property {CurveRange} z
             */
            this.z = __runInitializers(this, _z_initializers, new curve_range_1.default());
            // TODO:currently not supported
            this.randomized = false;
            this.rotation = null;
            this.needTransform = false;
            this.rotation = new value_types_1.Quat();
            this.needTransform = false;
        }
        update(space, worldTransform) {
            this.needTransform = (0, particle_general_function_1.calculateTransform)(space, this.space, worldTransform, this.rotation);
        }
        animate(p, dt) {
            const normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
            const force = value_types_1.Vec3.set(_temp_v3, this.x.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)), this.y.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)), this.z.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)));
            if (this.needTransform) {
                value_types_1.Vec3.transformQuat(force, force, this.rotation);
            }
            value_types_1.Vec3.scaleAndAdd(p.velocity, p.velocity, force, dt);
        }
    };
    __setFunctionName(_classThis, "ForceOvertimeModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _enable_decorators = [CCClassDecorator_1.property];
        _space_decorators = [(0, CCClassDecorator_1.property)({
                type: enum_1.Space,
            })];
        _x_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                range: [-1, 1],
            })];
        _y_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                range: [-1, 1],
            })];
        _z_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                range: [-1, 1],
                displayOrder: 4,
            })];
        __esDecorate(null, null, _enable_decorators, { kind: "field", name: "enable", static: false, private: false, access: { has: obj => "enable" in obj, get: obj => obj.enable, set: (obj, value) => { obj.enable = value; } }, metadata: _metadata }, _enable_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _space_decorators, { kind: "field", name: "space", static: false, private: false, access: { has: obj => "space" in obj, get: obj => obj.space, set: (obj, value) => { obj.space = value; } }, metadata: _metadata }, _space_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _x_decorators, { kind: "field", name: "x", static: false, private: false, access: { has: obj => "x" in obj, get: obj => obj.x, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, _x_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _z_decorators, { kind: "field", name: "z", static: false, private: false, access: { has: obj => "z" in obj, get: obj => obj.z, set: (obj, value) => { obj.z = value; } }, metadata: _metadata }, _z_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ForceOvertimeModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ForceOvertimeModule = _classThis;
})();
exports.default = ForceOvertimeModule;
