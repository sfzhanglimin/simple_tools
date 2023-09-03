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
const curve_range_1 = __importDefault(require("../animator/curve-range"));
const particle_general_function_1 = require("../particle-general-function");
const enum_1 = require("../enum");
// tslint:disable: max-line-length
const _intermediVec = new value_types_1.Vec3(0, 0, 0);
const _intermediArr = new Array();
const _unitBoxExtent = new value_types_1.Vec3(0.5, 0.5, 0.5);
let ShapeModule = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.ShapeModule')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _enable_decorators;
    let _enable_initializers = [];
    let __shapeType_decorators;
    let __shapeType_initializers = [];
    let _get_shapeType_decorators;
    let _emitFrom_decorators;
    let _emitFrom_initializers = [];
    let _radius_decorators;
    let _radius_initializers = [];
    let _radiusThickness_decorators;
    let _radiusThickness_initializers = [];
    let __angle_decorators;
    let __angle_initializers = [];
    let _get_angle_decorators;
    let __arc_decorators;
    let __arc_initializers = [];
    let _get_arc_decorators;
    let _arcMode_decorators;
    let _arcMode_initializers = [];
    let _arcSpread_decorators;
    let _arcSpread_initializers = [];
    let _arcSpeed_decorators;
    let _arcSpeed_initializers = [];
    let _length_decorators;
    let _length_initializers = [];
    let _boxThickness_decorators;
    let _boxThickness_initializers = [];
    let __position_decorators;
    let __position_initializers = [];
    let _get_position_decorators;
    let __rotation_decorators;
    let __rotation_initializers = [];
    let _get_rotation_decorators;
    let __scale_decorators;
    let __scale_initializers = [];
    let _get_scale_decorators;
    let _alignToDirection_decorators;
    let _alignToDirection_initializers = [];
    let _randomDirectionAmount_decorators;
    let _randomDirectionAmount_initializers = [];
    let _sphericalDirectionAmount_decorators;
    let _sphericalDirectionAmount_initializers = [];
    let _randomPositionAmount_decorators;
    let _randomPositionAmount_initializers = [];
    var ShapeModule = _classThis = class {
        /**
         * !#en Particle emitter type.
         * !#zh 粒子发射器类型。
         * @property {ShapeType} shapeType
         */
        get shapeType() {
            return this._shapeType;
        }
        set shapeType(val) {
            this._shapeType = val;
            switch (this._shapeType) {
                case enum_1.ShapeType.Box:
                    if (this.emitFrom === enum_1.EmitLocation.Base) {
                        this.emitFrom = enum_1.EmitLocation.Volume;
                    }
                    break;
                case enum_1.ShapeType.Cone:
                    if (this.emitFrom === enum_1.EmitLocation.Edge) {
                        this.emitFrom = enum_1.EmitLocation.Base;
                    }
                    break;
                case enum_1.ShapeType.Sphere:
                case enum_1.ShapeType.Hemisphere:
                    if (this.emitFrom === enum_1.EmitLocation.Base || this.emitFrom === enum_1.EmitLocation.Edge) {
                        this.emitFrom = enum_1.EmitLocation.Volume;
                    }
                    break;
            }
        }
        /**
         * !#en The angle between the axis of the cone and the generatrix<bg>
         * Determines the opening and closing of the cone launcher
         * !#zh 圆锥的轴与母线的夹角<bg>。
         * 决定圆锥发射器的开合程度。
         * @property {Number} angle
         */
        get angle() {
            return Math.round((0, value_types_1.toDegree)(this._angle) * 100) / 100;
        }
        set angle(val) {
            this._angle = (0, value_types_1.toRadian)(val);
        }
        /**
         * !#en Particle emitters emit in a fan-shaped range.
         * !#zh 粒子发射器在一个扇形范围内发射。
         * @property {Number} arc
         */
        get arc() {
            return (0, value_types_1.toDegree)(this._arc);
        }
        set arc(val) {
            this._arc = (0, value_types_1.toRadian)(val);
        }
        /**
         * !#en Particle Emitter Position
         * !#zh 粒子发射器位置。
         * @property {Vec3} position
         */
        get position() {
            return this._position;
        }
        set position(val) {
            this._position = val;
            this.constructMat();
        }
        /**
         * !#en Particle emitter rotation angle.
         * !#zh 粒子发射器旋转角度。
         * @property {Vec3} rotation
         */
        get rotation() {
            return this._rotation;
        }
        set rotation(val) {
            this._rotation = val;
            this.constructMat();
        }
        /**
         * !#en Particle emitter scaling
         * !#zh 粒子发射器缩放比例。
         * @property {Vec3} scale
         */
        get scale() {
            return this._scale;
        }
        set scale(val) {
            this._scale = val;
            this.constructMat();
        }
        constructor() {
            /**
             * !#en The enable of shapeModule.
             * !#zh 是否启用
             * @property {Boolean} enable
             */
            this.enable = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _enable_initializers, false));
            this._shapeType = __runInitializers(this, __shapeType_initializers, enum_1.ShapeType.Cone);
            /**
             * !#en The emission site of the particle.
             * !#zh 粒子从发射器哪个部位发射。
             * @property {EmitLocation} emitFrom
             */
            this.emitFrom = __runInitializers(this, _emitFrom_initializers, enum_1.EmitLocation.Volume);
            /**
             * !#en Particle emitter radius.
             * !#zh 粒子发射器半径。
             * @property {Number} radius
             */
            this.radius = __runInitializers(this, _radius_initializers, 1);
            /**
             * !#en Particle emitter emission position (not valid for Box type emitters)：<bg>
             * - 0 means emitted from the surface;
             * - 1 means launch from the center;
             * - 0 ~ 1 indicates emission from the center to the surface.
             * !#zh 粒子发射器发射位置（对 Box 类型的发射器无效）：<bg>
             * - 0 表示从表面发射；
             * - 1 表示从中心发射；
             * - 0 ~ 1 之间表示在中心到表面之间发射。
             * @property {Number} radiusThickness
             */
            this.radiusThickness = __runInitializers(this, _radiusThickness_initializers, 1);
            this._angle = __runInitializers(this, __angle_initializers, (0, value_types_1.toRadian)(25));
            this._arc = __runInitializers(this, __arc_initializers, (0, value_types_1.toRadian)(360));
            /**
             * !#en How particles are emitted in the sector range.
             * !#zh 粒子在扇形范围内的发射方式。
             * @property {ArcMode} arcMode
             */
            this.arcMode = __runInitializers(this, _arcMode_initializers, enum_1.ArcMode.Random);
            /**
             * !#en Controls the discrete intervals around the arcs where particles might be generated.
             * !#zh 控制可能产生粒子的弧周围的离散间隔。
             * @property {Number} arcSpread
             */
            this.arcSpread = __runInitializers(this, _arcSpread_initializers, 0);
            /**
             * !#en The speed at which particles are emitted around the circumference.
             * !#zh 粒子沿圆周发射的速度。
             * @property {CurveRange} arcSpeed
             */
            this.arcSpeed = __runInitializers(this, _arcSpeed_initializers, new curve_range_1.default());
            /**
             * !#en Axis length from top of cone to bottom of cone <bg>.
             * Determines the height of the cone emitter.
             * !#zh 圆锥顶部截面距离底部的轴长<bg>。
             * 决定圆锥发射器的高度。
             * @property {Number} length
             */
            this.length = __runInitializers(this, _length_initializers, 5);
            /**
             * !#en Particle emitter emission location (for box-type particle emitters).
             * !#zh 粒子发射器发射位置（针对 Box 类型的粒子发射器。
             * @property {Vec3} boxThickness
             */
            this.boxThickness = __runInitializers(this, _boxThickness_initializers, new value_types_1.Vec3(0, 0, 0));
            this._position = __runInitializers(this, __position_initializers, new value_types_1.Vec3(0, 0, 0));
            this._rotation = __runInitializers(this, __rotation_initializers, new value_types_1.Vec3(0, 0, 0));
            this._scale = __runInitializers(this, __scale_initializers, new value_types_1.Vec3(1, 1, 1));
            /**
             * !#en The direction of particle movement is determined based on the initial direction of the particles.
             * !#zh 根据粒子的初始方向决定粒子的移动方向。
             * @property {Boolean} alignToDirection
             */
            this.alignToDirection = __runInitializers(this, _alignToDirection_initializers, false);
            /**
             * !#en Set particle generation direction randomly.
             * !#zh 粒子生成方向随机设定。
             * @property {Number} randomDirectionAmount
             */
            this.randomDirectionAmount = __runInitializers(this, _randomDirectionAmount_initializers, 0);
            /**
             * !#en Interpolation between the current emission direction and the direction from the current position to the center of the node.
             * !#zh 表示当前发射方向与当前位置到结点中心连线方向的插值。
             * @property {Number} sphericalDirectionAmount
             */
            this.sphericalDirectionAmount = __runInitializers(this, _sphericalDirectionAmount_initializers, 0);
            /**
             * !#en Set the particle generation position randomly (setting this value to a value other than 0 will cause the particle generation position to exceed the generator size range)
             * !#zh 粒子生成位置随机设定（设定此值为非 0 会使粒子生成位置超出生成器大小范围）。
             */
            this.randomPositionAmount = __runInitializers(this, _randomPositionAmount_initializers, 0);
            this.mat = null;
            this.Quat = null;
            this.particleSystem = null;
            this.lastTime = null;
            this.totalAngle = null;
            this.mat = new value_types_1.Mat4();
            this.quat = new value_types_1.Quat();
            this.particleSystem = null;
            this.lastTime = 0;
            this.totalAngle = 0;
        }
        onInit(ps) {
            this.particleSystem = ps;
            this.constructMat();
            this.lastTime = this.particleSystem._time;
        }
        constructMat() {
            value_types_1.Quat.fromEuler(this.quat, this._rotation.x, this._rotation.y, this._rotation.z);
            value_types_1.Mat4.fromRTS(this.mat, this.quat, this._position, this._scale);
        }
        emit(p) {
            switch (this.shapeType) {
                case enum_1.ShapeType.Box:
                    boxEmit(this.emitFrom, this.boxThickness, p.position, p.velocity);
                    break;
                case enum_1.ShapeType.Circle:
                    circleEmit(this.radius, this.radiusThickness, this.generateArcAngle(), p.position, p.velocity);
                    break;
                case enum_1.ShapeType.Cone:
                    coneEmit(this.emitFrom, this.radius, this.radiusThickness, this.generateArcAngle(), this._angle, this.length, p.position, p.velocity);
                    break;
                case enum_1.ShapeType.Sphere:
                    sphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
                    break;
                case enum_1.ShapeType.Hemisphere:
                    hemisphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
                    break;
                default:
                    console.warn(this.shapeType + ' shapeType is not supported by ShapeModule.');
            }
            if (this.randomPositionAmount > 0) {
                p.position.x += (0, value_types_1.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
                p.position.y += (0, value_types_1.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
                p.position.z += (0, value_types_1.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
            }
            value_types_1.Vec3.transformQuat(p.velocity, p.velocity, this.quat);
            value_types_1.Vec3.transformMat4(p.position, p.position, this.mat);
            if (this.sphericalDirectionAmount > 0) {
                const sphericalVel = value_types_1.Vec3.normalize(_intermediVec, p.position);
                value_types_1.Vec3.lerp(p.velocity, p.velocity, sphericalVel, this.sphericalDirectionAmount);
            }
            this.lastTime = this.particleSystem._time;
        }
        generateArcAngle() {
            if (this.arcMode === enum_1.ArcMode.Random) {
                return (0, value_types_1.randomRange)(0, this._arc);
            }
            let angle = this.totalAngle + 2 * Math.PI * this.arcSpeed.evaluate(this.particleSystem._time, 1) * (this.particleSystem._time - this.lastTime);
            this.totalAngle = angle;
            if (this.arcSpread !== 0) {
                angle = Math.floor(angle / (this._arc * this.arcSpread)) * this._arc * this.arcSpread;
            }
            switch (this.arcMode) {
                case enum_1.ArcMode.Loop:
                    return (0, value_types_1.repeat)(angle, this._arc);
                case enum_1.ArcMode.PingPong:
                    return (0, value_types_1.pingPong)(angle, this._arc);
            }
        }
    };
    __setFunctionName(_classThis, "ShapeModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _enable_decorators = [CCClassDecorator_1.property];
        __shapeType_decorators = [CCClassDecorator_1.property];
        _get_shapeType_decorators = [(0, CCClassDecorator_1.property)({
                type: enum_1.ShapeType,
            })];
        _emitFrom_decorators = [(0, CCClassDecorator_1.property)({
                type: enum_1.EmitLocation,
            })];
        _radius_decorators = [CCClassDecorator_1.property];
        _radiusThickness_decorators = [CCClassDecorator_1.property];
        __angle_decorators = [CCClassDecorator_1.property];
        _get_angle_decorators = [CCClassDecorator_1.property];
        __arc_decorators = [CCClassDecorator_1.property];
        _get_arc_decorators = [CCClassDecorator_1.property];
        _arcMode_decorators = [(0, CCClassDecorator_1.property)({
                type: enum_1.ArcMode,
            })];
        _arcSpread_decorators = [CCClassDecorator_1.property];
        _arcSpeed_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
            })];
        _length_decorators = [CCClassDecorator_1.property];
        _boxThickness_decorators = [CCClassDecorator_1.property];
        __position_decorators = [CCClassDecorator_1.property];
        _get_position_decorators = [CCClassDecorator_1.property];
        __rotation_decorators = [CCClassDecorator_1.property];
        _get_rotation_decorators = [CCClassDecorator_1.property];
        __scale_decorators = [CCClassDecorator_1.property];
        _get_scale_decorators = [CCClassDecorator_1.property];
        _alignToDirection_decorators = [CCClassDecorator_1.property];
        _randomDirectionAmount_decorators = [CCClassDecorator_1.property];
        _sphericalDirectionAmount_decorators = [CCClassDecorator_1.property];
        _randomPositionAmount_decorators = [CCClassDecorator_1.property];
        __esDecorate(_classThis, null, _get_shapeType_decorators, { kind: "getter", name: "shapeType", static: false, private: false, access: { has: obj => "shapeType" in obj, get: obj => obj.shapeType }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_angle_decorators, { kind: "getter", name: "angle", static: false, private: false, access: { has: obj => "angle" in obj, get: obj => obj.angle }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_arc_decorators, { kind: "getter", name: "arc", static: false, private: false, access: { has: obj => "arc" in obj, get: obj => obj.arc }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_position_decorators, { kind: "getter", name: "position", static: false, private: false, access: { has: obj => "position" in obj, get: obj => obj.position }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_rotation_decorators, { kind: "getter", name: "rotation", static: false, private: false, access: { has: obj => "rotation" in obj, get: obj => obj.rotation }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_scale_decorators, { kind: "getter", name: "scale", static: false, private: false, access: { has: obj => "scale" in obj, get: obj => obj.scale }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _enable_decorators, { kind: "field", name: "enable", static: false, private: false, access: { has: obj => "enable" in obj, get: obj => obj.enable, set: (obj, value) => { obj.enable = value; } }, metadata: _metadata }, _enable_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __shapeType_decorators, { kind: "field", name: "_shapeType", static: false, private: false, access: { has: obj => "_shapeType" in obj, get: obj => obj._shapeType, set: (obj, value) => { obj._shapeType = value; } }, metadata: _metadata }, __shapeType_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _emitFrom_decorators, { kind: "field", name: "emitFrom", static: false, private: false, access: { has: obj => "emitFrom" in obj, get: obj => obj.emitFrom, set: (obj, value) => { obj.emitFrom = value; } }, metadata: _metadata }, _emitFrom_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _radius_decorators, { kind: "field", name: "radius", static: false, private: false, access: { has: obj => "radius" in obj, get: obj => obj.radius, set: (obj, value) => { obj.radius = value; } }, metadata: _metadata }, _radius_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _radiusThickness_decorators, { kind: "field", name: "radiusThickness", static: false, private: false, access: { has: obj => "radiusThickness" in obj, get: obj => obj.radiusThickness, set: (obj, value) => { obj.radiusThickness = value; } }, metadata: _metadata }, _radiusThickness_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __angle_decorators, { kind: "field", name: "_angle", static: false, private: false, access: { has: obj => "_angle" in obj, get: obj => obj._angle, set: (obj, value) => { obj._angle = value; } }, metadata: _metadata }, __angle_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __arc_decorators, { kind: "field", name: "_arc", static: false, private: false, access: { has: obj => "_arc" in obj, get: obj => obj._arc, set: (obj, value) => { obj._arc = value; } }, metadata: _metadata }, __arc_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _arcMode_decorators, { kind: "field", name: "arcMode", static: false, private: false, access: { has: obj => "arcMode" in obj, get: obj => obj.arcMode, set: (obj, value) => { obj.arcMode = value; } }, metadata: _metadata }, _arcMode_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _arcSpread_decorators, { kind: "field", name: "arcSpread", static: false, private: false, access: { has: obj => "arcSpread" in obj, get: obj => obj.arcSpread, set: (obj, value) => { obj.arcSpread = value; } }, metadata: _metadata }, _arcSpread_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _arcSpeed_decorators, { kind: "field", name: "arcSpeed", static: false, private: false, access: { has: obj => "arcSpeed" in obj, get: obj => obj.arcSpeed, set: (obj, value) => { obj.arcSpeed = value; } }, metadata: _metadata }, _arcSpeed_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _length_decorators, { kind: "field", name: "length", static: false, private: false, access: { has: obj => "length" in obj, get: obj => obj.length, set: (obj, value) => { obj.length = value; } }, metadata: _metadata }, _length_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _boxThickness_decorators, { kind: "field", name: "boxThickness", static: false, private: false, access: { has: obj => "boxThickness" in obj, get: obj => obj.boxThickness, set: (obj, value) => { obj.boxThickness = value; } }, metadata: _metadata }, _boxThickness_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __position_decorators, { kind: "field", name: "_position", static: false, private: false, access: { has: obj => "_position" in obj, get: obj => obj._position, set: (obj, value) => { obj._position = value; } }, metadata: _metadata }, __position_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __rotation_decorators, { kind: "field", name: "_rotation", static: false, private: false, access: { has: obj => "_rotation" in obj, get: obj => obj._rotation, set: (obj, value) => { obj._rotation = value; } }, metadata: _metadata }, __rotation_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __scale_decorators, { kind: "field", name: "_scale", static: false, private: false, access: { has: obj => "_scale" in obj, get: obj => obj._scale, set: (obj, value) => { obj._scale = value; } }, metadata: _metadata }, __scale_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _alignToDirection_decorators, { kind: "field", name: "alignToDirection", static: false, private: false, access: { has: obj => "alignToDirection" in obj, get: obj => obj.alignToDirection, set: (obj, value) => { obj.alignToDirection = value; } }, metadata: _metadata }, _alignToDirection_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _randomDirectionAmount_decorators, { kind: "field", name: "randomDirectionAmount", static: false, private: false, access: { has: obj => "randomDirectionAmount" in obj, get: obj => obj.randomDirectionAmount, set: (obj, value) => { obj.randomDirectionAmount = value; } }, metadata: _metadata }, _randomDirectionAmount_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _sphericalDirectionAmount_decorators, { kind: "field", name: "sphericalDirectionAmount", static: false, private: false, access: { has: obj => "sphericalDirectionAmount" in obj, get: obj => obj.sphericalDirectionAmount, set: (obj, value) => { obj.sphericalDirectionAmount = value; } }, metadata: _metadata }, _sphericalDirectionAmount_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _randomPositionAmount_decorators, { kind: "field", name: "randomPositionAmount", static: false, private: false, access: { has: obj => "randomPositionAmount" in obj, get: obj => obj.randomPositionAmount, set: (obj, value) => { obj.randomPositionAmount = value; } }, metadata: _metadata }, _randomPositionAmount_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ShapeModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ShapeModule = _classThis;
})();
exports.default = ShapeModule;
function sphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
    switch (emitFrom) {
        case enum_1.EmitLocation.Volume:
            (0, particle_general_function_1.randomPointBetweenSphere)(pos, radius * (1 - radiusThickness), radius);
            value_types_1.Vec3.copy(dir, pos);
            value_types_1.Vec3.normalize(dir, dir);
            break;
        case enum_1.EmitLocation.Shell:
            (0, particle_general_function_1.randomUnitVector)(pos);
            value_types_1.Vec3.scale(pos, pos, radius);
            value_types_1.Vec3.copy(dir, pos);
            break;
        default:
            console.warn(emitFrom + ' is not supported for sphere emitter.');
    }
}
function hemisphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
    switch (emitFrom) {
        case enum_1.EmitLocation.Volume:
            (0, particle_general_function_1.randomPointBetweenSphere)(pos, radius * (1 - radiusThickness), radius);
            if (pos.z > 0) {
                pos.z *= -1;
            }
            value_types_1.Vec3.copy(dir, pos);
            value_types_1.Vec3.normalize(dir, dir);
            break;
        case enum_1.EmitLocation.Shell:
            (0, particle_general_function_1.randomUnitVector)(pos);
            value_types_1.Vec3.scale(pos, pos, radius);
            if (pos.z < 0) {
                pos.z *= -1;
            }
            value_types_1.Vec3.copy(dir, pos);
            break;
        default:
            console.warn(emitFrom + ' is not supported for hemisphere emitter.');
    }
}
function coneEmit(emitFrom, radius, radiusThickness, theta, angle, length, pos, dir) {
    switch (emitFrom) {
        case enum_1.EmitLocation.Base:
            (0, particle_general_function_1.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);
            value_types_1.Vec2.scale(dir, pos, Math.sin(angle));
            dir.z = -Math.cos(angle) * radius;
            value_types_1.Vec3.normalize(dir, dir);
            pos.z = 0;
            break;
        case enum_1.EmitLocation.Shell:
            (0, particle_general_function_1.fixedAngleUnitVector2)(pos, theta);
            value_types_1.Vec2.scale(dir, pos, Math.sin(angle));
            dir.z = -Math.cos(angle);
            value_types_1.Vec3.normalize(dir, dir);
            value_types_1.Vec2.scale(pos, pos, radius);
            pos.z = 0;
            break;
        case enum_1.EmitLocation.Volume:
            (0, particle_general_function_1.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);
            value_types_1.Vec2.scale(dir, pos, Math.sin(angle));
            dir.z = -Math.cos(angle) * radius;
            value_types_1.Vec3.normalize(dir, dir);
            pos.z = 0;
            value_types_1.Vec3.add(pos, pos, value_types_1.Vec3.scale(_intermediVec, dir, length * (0, value_types_1.random)() / -dir.z));
            break;
        default:
            console.warn(emitFrom + ' is not supported for cone emitter.');
    }
}
function boxEmit(emitFrom, boxThickness, pos, dir) {
    switch (emitFrom) {
        case enum_1.EmitLocation.Volume:
            (0, particle_general_function_1.randomPointInCube)(pos, _unitBoxExtent);
            // randomPointBetweenCube(pos, Vec3.multiply(_intermediVec, _unitBoxExtent, boxThickness), _unitBoxExtent);
            break;
        case enum_1.EmitLocation.Shell:
            _intermediArr.splice(0, _intermediArr.length);
            _intermediArr.push((0, value_types_1.randomRange)(-0.5, 0.5));
            _intermediArr.push((0, value_types_1.randomRange)(-0.5, 0.5));
            _intermediArr.push((0, particle_general_function_1.randomSign)() * 0.5);
            (0, particle_general_function_1.randomSortArray)(_intermediArr);
            applyBoxThickness(_intermediArr, boxThickness);
            value_types_1.Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);
            break;
        case enum_1.EmitLocation.Edge:
            _intermediArr.splice(0, _intermediArr.length);
            _intermediArr.push((0, value_types_1.randomRange)(-0.5, 0.5));
            _intermediArr.push((0, particle_general_function_1.randomSign)() * 0.5);
            _intermediArr.push((0, particle_general_function_1.randomSign)() * 0.5);
            (0, particle_general_function_1.randomSortArray)(_intermediArr);
            applyBoxThickness(_intermediArr, boxThickness);
            value_types_1.Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);
            break;
        default:
            console.warn(emitFrom + ' is not supported for box emitter.');
    }
    value_types_1.Vec3.copy(dir, particle_general_function_1.particleEmitZAxis);
}
function circleEmit(radius, radiusThickness, theta, pos, dir) {
    (0, particle_general_function_1.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);
    value_types_1.Vec3.normalize(dir, pos);
}
function applyBoxThickness(pos, thickness) {
    if (thickness.x > 0) {
        pos[0] += 0.5 * (0, value_types_1.randomRange)(-thickness.x, thickness.x);
        pos[0] = (0, value_types_1.clamp)(pos[0], -0.5, 0.5);
    }
    if (thickness.y > 0) {
        pos[1] += 0.5 * (0, value_types_1.randomRange)(-thickness.y, thickness.y);
        pos[1] = (0, value_types_1.clamp)(pos[1], -0.5, 0.5);
    }
    if (thickness.z > 0) {
        pos[2] += 0.5 * (0, value_types_1.randomRange)(-thickness.z, thickness.z);
        pos[2] = (0, value_types_1.clamp)(pos[2], -0.5, 0.5);
    }
}
