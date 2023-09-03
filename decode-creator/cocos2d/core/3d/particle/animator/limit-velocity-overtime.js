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
const curve_range_1 = __importDefault(require("./curve-range"));
// tslint:disable: max-line-length
const LIMIT_VELOCITY_RAND_OFFSET = 23541;
const _temp_v3 = cc.v3();
const _temp_v3_1 = cc.v3();
function dampenBeyondLimit(vel, limit, dampen) {
    const sgn = Math.sign(vel);
    let abs = Math.abs(vel);
    if (abs > limit) {
        abs = (0, value_types_1.lerp)(abs, limit, dampen);
    }
    return abs * sgn;
}
let LimitVelocityOvertimeModule = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.LimitVelocityOvertimeModule')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _enable_decorators;
    let _enable_initializers = [];
    let _space_decorators;
    let _space_initializers = [];
    let _separateAxes_decorators;
    let _separateAxes_initializers = [];
    let _limit_decorators;
    let _limit_initializers = [];
    let _limitX_decorators;
    let _limitX_initializers = [];
    let _limitY_decorators;
    let _limitY_initializers = [];
    let _limitZ_decorators;
    let _limitZ_initializers = [];
    let _dampen_decorators;
    let _dampen_initializers = [];
    var LimitVelocityOvertimeModule = _classThis = class {
        constructor() {
            /**
             * !#en The enable of LimitVelocityOvertimeModule.
             * !#zh 是否启用
             * @property {Boolean} enable
             */
            this.enable = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _enable_initializers, false));
            /**
             * !#en The coordinate system used when calculating the lower speed limit.
             * !#zh 计算速度下限时采用的坐标系。
             * @property {Space} space
             */
            this.space = __runInitializers(this, _space_initializers, enum_1.Space.Local);
            /**
             * !#en Whether to limit the three axes separately.
             * !#zh 是否三个轴分开限制。
             * @property {Boolean} separateAxes
             */
            this.separateAxes = __runInitializers(this, _separateAxes_initializers, false);
            /**
             * !#en Lower speed limit
             * !#zh 速度下限。
             * @property {CurveRange} limit
             */
            this.limit = __runInitializers(this, _limit_initializers, new curve_range_1.default());
            /**
             * !#en Lower speed limit in X direction.
             * !#zh X 轴方向上的速度下限。
             * @property {CurveRange} limitX
             */
            this.limitX = __runInitializers(this, _limitX_initializers, new curve_range_1.default());
            /**
             * !#en Lower speed limit in Y direction.
             * !#zh Y 轴方向上的速度下限。
             * @property {CurveRange} limitY
             */
            this.limitY = __runInitializers(this, _limitY_initializers, new curve_range_1.default());
            /**
             * !#en Lower speed limit in Z direction.
             * !#zh Z 轴方向上的速度下限。
             * @property {CurveRange} limitZ
             */
            this.limitZ = __runInitializers(this, _limitZ_initializers, new curve_range_1.default());
            /**
             * !#en Interpolation of current speed and lower speed limit.
             * !#zh 当前速度与速度下限的插值。
             * @property {Number} dampen
             */
            this.dampen = __runInitializers(this, _dampen_initializers, 3);
            // TODO:functions related to drag are temporarily not supported
            this.drag = null;
            this.multiplyDragByParticleSize = false;
            this.multiplyDragByParticleVelocity = false;
            this.rotation = null;
            this.needTransform = false;
            this.rotation = new value_types_1.Quat();
            this.needTransform = false;
        }
        update(space, worldTransform) {
            this.needTransform = calculateTransform(space, this.space, worldTransform, this.rotation);
        }
        animate(p) {
            const normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
            const dampedVel = _temp_v3;
            if (this.separateAxes) {
                value_types_1.Vec3.set(_temp_v3_1, this.limitX.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitY.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitZ.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)));
                if (this.needTransform) {
                    value_types_1.Vec3.transformQuat(_temp_v3_1, _temp_v3_1, this.rotation);
                }
                value_types_1.Vec3.set(dampedVel, dampenBeyondLimit(p.ultimateVelocity.x, _temp_v3_1.x, this.dampen), dampenBeyondLimit(p.ultimateVelocity.y, _temp_v3_1.y, this.dampen), dampenBeyondLimit(p.ultimateVelocity.z, _temp_v3_1.z, this.dampen));
            }
            else {
                value_types_1.Vec3.normalize(dampedVel, p.ultimateVelocity);
                value_types_1.Vec3.scale(dampedVel, dampedVel, dampenBeyondLimit(p.ultimateVelocity.len(), this.limit.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.dampen));
            }
            value_types_1.Vec3.copy(p.ultimateVelocity, dampedVel);
        }
    };
    __setFunctionName(_classThis, "LimitVelocityOvertimeModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _enable_decorators = [CCClassDecorator_1.property];
        _space_decorators = [(0, CCClassDecorator_1.property)({
                type: enum_1.Space,
            })];
        _separateAxes_decorators = [CCClassDecorator_1.property];
        _limit_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                range: [-1, 1],
                visible: function () {
                    return !this.separateAxes;
                }
            })];
        _limitX_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                range: [-1, 1],
                visible: function () {
                    return this.separateAxes;
                }
            })];
        _limitY_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                range: [-1, 1],
                visible: function () {
                    return this.separateAxes;
                }
            })];
        _limitZ_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
                range: [-1, 1],
                visible: function () {
                    return this.separateAxes;
                }
            })];
        _dampen_decorators = [CCClassDecorator_1.property];
        __esDecorate(null, null, _enable_decorators, { kind: "field", name: "enable", static: false, private: false, access: { has: obj => "enable" in obj, get: obj => obj.enable, set: (obj, value) => { obj.enable = value; } }, metadata: _metadata }, _enable_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _space_decorators, { kind: "field", name: "space", static: false, private: false, access: { has: obj => "space" in obj, get: obj => obj.space, set: (obj, value) => { obj.space = value; } }, metadata: _metadata }, _space_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _separateAxes_decorators, { kind: "field", name: "separateAxes", static: false, private: false, access: { has: obj => "separateAxes" in obj, get: obj => obj.separateAxes, set: (obj, value) => { obj.separateAxes = value; } }, metadata: _metadata }, _separateAxes_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: obj => "limit" in obj, get: obj => obj.limit, set: (obj, value) => { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _limitX_decorators, { kind: "field", name: "limitX", static: false, private: false, access: { has: obj => "limitX" in obj, get: obj => obj.limitX, set: (obj, value) => { obj.limitX = value; } }, metadata: _metadata }, _limitX_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _limitY_decorators, { kind: "field", name: "limitY", static: false, private: false, access: { has: obj => "limitY" in obj, get: obj => obj.limitY, set: (obj, value) => { obj.limitY = value; } }, metadata: _metadata }, _limitY_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _limitZ_decorators, { kind: "field", name: "limitZ", static: false, private: false, access: { has: obj => "limitZ" in obj, get: obj => obj.limitZ, set: (obj, value) => { obj.limitZ = value; } }, metadata: _metadata }, _limitZ_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _dampen_decorators, { kind: "field", name: "dampen", static: false, private: false, access: { has: obj => "dampen" in obj, get: obj => obj.dampen, set: (obj, value) => { obj.dampen = value; } }, metadata: _metadata }, _dampen_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LimitVelocityOvertimeModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LimitVelocityOvertimeModule = _classThis;
})();
exports.default = LimitVelocityOvertimeModule;
