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
const curve_range_1 = __importDefault(require("./curve-range"));
// tslint:disable: max-line-length
const SIZE_OVERTIME_RAND_OFFSET = 39825;
let SizeOvertimeModule = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.SizeOvertimeModule')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _enable_decorators;
    let _enable_initializers = [];
    let _separateAxes_decorators;
    let _separateAxes_initializers = [];
    let _size_decorators;
    let _size_initializers = [];
    let _x_decorators;
    let _x_initializers = [];
    let _y_decorators;
    let _y_initializers = [];
    let _z_decorators;
    let _z_initializers = [];
    var SizeOvertimeModule = _classThis = class {
        constructor() {
            /**
             * !#en The enable of SizeOvertimeModule.
             * !#zh 是否启用
             * @property {Boolean} enable
             */
            this.enable = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _enable_initializers, false));
            /**
             * !#en Decide whether to control particle size independently on each axis.
             * !#zh 决定是否在每个轴上独立控制粒子大小。
             * @property {Boolean} separateAxes
             */
            this.separateAxes = __runInitializers(this, _separateAxes_initializers, false);
            /**
             * !#en Define a curve to determine the size change of particles during their life cycle.
             * !#zh 定义一条曲线来决定粒子在其生命周期中的大小变化。
             * @property {CurveRange} size
             */
            this.size = __runInitializers(this, _size_initializers, new curve_range_1.default());
            /**
             * !#en Defines a curve to determine the size change of particles in the X-axis direction during their life cycle.
             * !#zh 定义一条曲线来决定粒子在其生命周期中 X 轴方向上的大小变化。
             * @property {CurveRange} x
             */
            this.x = __runInitializers(this, _x_initializers, new curve_range_1.default());
            /**
             * !#en Defines a curve to determine the size change of particles in the Y-axis direction during their life cycle.
             * !#zh 定义一条曲线来决定粒子在其生命周期中 Y 轴方向上的大小变化。
             * @property {CurveRange} y
             */
            this.y = __runInitializers(this, _y_initializers, new curve_range_1.default());
            /**
             * !#en Defines a curve to determine the size change of particles in the Z-axis direction during their life cycle.
             * !#zh 定义一条曲线来决定粒子在其生命周期中 Z 轴方向上的大小变化。
             * @property {CurveRange} z
             */
            this.z = __runInitializers(this, _z_initializers, new curve_range_1.default());
        }
        animate(particle) {
            if (!this.separateAxes) {
                value_types_1.Vec3.scale(particle.size, particle.startSize, this.size.evaluate(1 - particle.remainingLifetime / particle.startLifetime, (0, value_types_1.pseudoRandom)(particle.randomSeed + SIZE_OVERTIME_RAND_OFFSET)));
            }
            else {
                const currLifetime = 1 - particle.remainingLifetime / particle.startLifetime;
                const sizeRand = (0, value_types_1.pseudoRandom)(particle.randomSeed + SIZE_OVERTIME_RAND_OFFSET);
                particle.size.x = particle.startSize.x * this.x.evaluate(currLifetime, sizeRand);
                particle.size.y = particle.startSize.y * this.y.evaluate(currLifetime, sizeRand);
                particle.size.z = particle.startSize.z * this.z.evaluate(currLifetime, sizeRand);
            }
        }
    };
    __setFunctionName(_classThis, "SizeOvertimeModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _enable_decorators = [CCClassDecorator_1.property];
        _separateAxes_decorators = [CCClassDecorator_1.property];
        _size_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                visible: function () {
                    return !this.separateAxes;
                }
            })];
        _x_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                visible: function () {
                    return this.separateAxes;
                }
            })];
        _y_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                visible: function () {
                    return this.separateAxes;
                }
            })];
        _z_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                visible: function () {
                    return this.separateAxes;
                }
            })];
        __esDecorate(null, null, _enable_decorators, { kind: "field", name: "enable", static: false, private: false, access: { has: obj => "enable" in obj, get: obj => obj.enable, set: (obj, value) => { obj.enable = value; } }, metadata: _metadata }, _enable_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _separateAxes_decorators, { kind: "field", name: "separateAxes", static: false, private: false, access: { has: obj => "separateAxes" in obj, get: obj => obj.separateAxes, set: (obj, value) => { obj.separateAxes = value; } }, metadata: _metadata }, _separateAxes_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: obj => "size" in obj, get: obj => obj.size, set: (obj, value) => { obj.size = value; } }, metadata: _metadata }, _size_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _x_decorators, { kind: "field", name: "x", static: false, private: false, access: { has: obj => "x" in obj, get: obj => obj.x, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, _x_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _z_decorators, { kind: "field", name: "z", static: false, private: false, access: { has: obj => "z" in obj, get: obj => obj.z, set: (obj, value) => { obj.z = value; } }, metadata: _metadata }, _z_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SizeOvertimeModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SizeOvertimeModule = _classThis;
})();
exports.default = SizeOvertimeModule;
