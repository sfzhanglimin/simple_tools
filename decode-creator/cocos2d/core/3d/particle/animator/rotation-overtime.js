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
const ROTATION_OVERTIME_RAND_OFFSET = 125292;
let RotationOvertimeModule = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.RotationOvertimeModule')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _enable_decorators;
    let _enable_initializers = [];
    let __separateAxes_decorators;
    let __separateAxes_initializers = [];
    let _get_separateAxes_decorators;
    let _x_decorators;
    let _x_initializers = [];
    let _y_decorators;
    let _y_initializers = [];
    let _z_decorators;
    let _z_initializers = [];
    var RotationOvertimeModule = _classThis = class {
        /**
         * !#en Whether to set the rotation of three axes separately (not currently supported)
         * !#zh 是否三个轴分开设定旋转（暂不支持）。
         * @property {Boolean} separateAxes
         */
        get separateAxes() {
            return this._separateAxes;
        }
        set separateAxes(val) {
            this._separateAxes = val;
        }
        constructor() {
            /**
             * !#en The enable of RotationOvertimeModule.
             * !#zh 是否启用
             * @property {Boolean} enable
             */
            this.enable = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _enable_initializers, false));
            this._separateAxes = __runInitializers(this, __separateAxes_initializers, false);
            /**
             * !#en Set rotation around X axis.
             * !#zh 绕 X 轴设定旋转。
             * @property {CurveRange} x
             */
            this.x = __runInitializers(this, _x_initializers, new curve_range_1.default());
            /**
             * !#en Set rotation around Y axis.
             * !#zh 绕 Y 轴设定旋转。
             * @property {CurveRange} y
             */
            this.y = __runInitializers(this, _y_initializers, new curve_range_1.default());
            /**
             * !#en Set rotation around Z axis.
             * !#zh 绕 Z 轴设定旋转。
             * @property {CurveRange} z
             */
            this.z = __runInitializers(this, _z_initializers, new curve_range_1.default());
        }
        animate(p, dt) {
            const normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
            if (!this._separateAxes) {
                p.rotation.x += this.z.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + ROTATION_OVERTIME_RAND_OFFSET)) * dt;
            }
            else {
                // TODO: separateAxes is temporarily not supported!
                const rotationRand = (0, value_types_1.pseudoRandom)(p.randomSeed + ROTATION_OVERTIME_RAND_OFFSET);
                p.rotation.x += this.x.evaluate(normalizedTime, rotationRand) * dt;
                p.rotation.y += this.y.evaluate(normalizedTime, rotationRand) * dt;
                p.rotation.z += this.z.evaluate(normalizedTime, rotationRand) * dt;
            }
        }
    };
    __setFunctionName(_classThis, "RotationOvertimeModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _enable_decorators = [CCClassDecorator_1.property];
        __separateAxes_decorators = [CCClassDecorator_1.property];
        _get_separateAxes_decorators = [CCClassDecorator_1.property];
        _x_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                range: [-1, 1],
                radian: true,
                visible: function () {
                    return this._separateAxes;
                }
            })];
        _y_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                range: [-1, 1],
                radian: true,
                visible: function () {
                    return this._separateAxes;
                }
            })];
        _z_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                range: [-1, 1],
                radian: true,
            })];
        __esDecorate(_classThis, null, _get_separateAxes_decorators, { kind: "getter", name: "separateAxes", static: false, private: false, access: { has: obj => "separateAxes" in obj, get: obj => obj.separateAxes }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _enable_decorators, { kind: "field", name: "enable", static: false, private: false, access: { has: obj => "enable" in obj, get: obj => obj.enable, set: (obj, value) => { obj.enable = value; } }, metadata: _metadata }, _enable_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __separateAxes_decorators, { kind: "field", name: "_separateAxes", static: false, private: false, access: { has: obj => "_separateAxes" in obj, get: obj => obj._separateAxes, set: (obj, value) => { obj._separateAxes = value; } }, metadata: _metadata }, __separateAxes_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _x_decorators, { kind: "field", name: "x", static: false, private: false, access: { has: obj => "x" in obj, get: obj => obj.x, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, _x_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _z_decorators, { kind: "field", name: "z", static: false, private: false, access: { has: obj => "z" in obj, get: obj => obj.z, set: (obj, value) => { obj.z = value; } }, metadata: _metadata }, _z_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RotationOvertimeModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RotationOvertimeModule = _classThis;
})();
exports.default = RotationOvertimeModule;
