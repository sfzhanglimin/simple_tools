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
const value_types_1 = require("../../../value-types");
const gfx_1 = __importDefault(require("../../../../renderer/gfx"));
const particle_batch_model_1 = __importDefault(require("./particle-batch-model"));
const material_variant_1 = __importDefault(require("../../../assets/material/material-variant"));
const recycle_pool_1 = __importDefault(require("../../../../renderer/memop/recycle-pool"));
const enum_1 = require("../enum");
const particle_1 = __importDefault(require("../particle"));
const assembler_1 = __importDefault(require("../../../renderer/assembler"));
const particle_system_3d_1 = __importDefault(require("../particle-system-3d"));
const { ccclass, property } = require('../../../platform/CCClassDecorator');
// tslint:disable: max-line-length
const _tempAttribUV = new value_types_1.Vec3();
const _tempAttribUV0 = new value_types_1.Vec2();
const _tempAttribColor = new value_types_1.Vec4();
const _tempWorldTrans = new value_types_1.Mat4();
const _uvs = [
    0, 0,
    1, 0,
    0, 1,
    1, 1, // top-right
];
const CC_USE_WORLD_SPACE = 'CC_USE_WORLD_SPACE';
const CC_USE_BILLBOARD = 'CC_USE_BILLBOARD';
const CC_USE_STRETCHED_BILLBOARD = 'CC_USE_STRETCHED_BILLBOARD';
const CC_USE_HORIZONTAL_BILLBOARD = 'CC_USE_HORIZONTAL_BILLBOARD';
const CC_USE_VERTICAL_BILLBOARD = 'CC_USE_VERTICAL_BILLBOARD';
const CC_USE_MESH = 'CC_USE_MESH';
//const CC_DRAW_WIRE_FRAME = 'CC_DRAW_WIRE_FRAME'; // <wireframe debug>
var vfmtNormal = new gfx_1.default.VertexFormat([
    { name: gfx_1.default.ATTR_POSITION, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_TEX_COORD, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_TEX_COORD1, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_TEX_COORD2, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_COLOR, type: gfx_1.default.ATTR_TYPE_UINT8, num: 4, normalize: true },
]);
vfmtNormal.name = 'vfmtNormal';
var vfmtStretch = new gfx_1.default.VertexFormat([
    { name: gfx_1.default.ATTR_POSITION, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_TEX_COORD, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_TEX_COORD1, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_TEX_COORD2, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_COLOR, type: gfx_1.default.ATTR_TYPE_UINT8, num: 4, normalize: true },
    { name: gfx_1.default.ATTR_COLOR1, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 }
]);
vfmtStretch.name = 'vfmtStretch';
var vfmtMesh = new gfx_1.default.VertexFormat([
    { name: gfx_1.default.ATTR_POSITION, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_TEX_COORD, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_TEX_COORD1, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_TEX_COORD2, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_COLOR, type: gfx_1.default.ATTR_TYPE_UINT8, num: 4, normalize: true },
    { name: gfx_1.default.ATTR_TEX_COORD3, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_NORMAL, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
    { name: gfx_1.default.ATTR_COLOR1, type: gfx_1.default.ATTR_TYPE_UINT8, num: 4, normalize: true }
]);
vfmtMesh.name = 'vfmtMesh';
let ParticleSystem3DAssembler = (() => {
    let _classDecorators = [ccclass('cc.ParticleSystem3DAssembler')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = assembler_1.default;
    var ParticleSystem3DAssembler = _classThis = class extends _classSuper {
        constructor() {
            super();
            this._defines = null;
            this._trailDefines = null;
            this._model = null;
            this.frameTile_velLenScale = null;
            this.attrs = [];
            this._vertFormat = [];
            this._particleSystem = null;
            this._particles = null;
            this._defaultMat = null;
            this._isAssetReady = false;
            this._defaultTrailMat = null;
            this._customProperties = null;
            this._node_scale = null;
            this._model = null;
            this.frameTile_velLenScale = cc.v4(1, 1, 0, 0);
            this._node_scale = cc.v4();
            this.attrs = new Array(5);
            this._trailDefines = {
                CC_USE_WORLD_SPACE: true,
                //CC_DRAW_WIRE_FRAME: true,   // <wireframe debug>
            };
        }
        onInit(ps) {
            this._particleSystem = ps;
            this._particles = new recycle_pool_1.default(() => {
                return new particle_1.default(this);
            }, 16);
            this._setVertexAttrib();
            this.onEnable();
            this._updateModel();
            this._updateMaterialParams();
            this._updateTrailMaterial();
        }
        onEnable() {
            if (!this._particleSystem) {
                return;
            }
            if (this._model == null) {
                this._model = new particle_batch_model_1.default();
            }
            if (!this._model.inited) {
                this._model.setCapacity(this._particleSystem.capacity);
            }
            this._model.enabled = this._particleSystem.enabledInHierarchy;
        }
        onDisable() {
            if (this._model) {
                this._model.enabled = this._particleSystem.enabledInHierarchy;
            }
        }
        onDestroy() {
            this._model = null;
        }
        clear() {
            this._particles.reset();
            this.updateParticleBuffer();
        }
        _getFreeParticle() {
            if (this._particles.length >= this._particleSystem.capacity) {
                return null;
            }
            return this._particles.add();
        }
        _setNewParticle(p) {
        }
        _updateParticles(dt) {
            this._particleSystem.node.getWorldMatrix(_tempWorldTrans);
            switch (this._particleSystem.scaleSpace) {
                case enum_1.Space.Local:
                    this._particleSystem.node.getScale(this._node_scale);
                    break;
                case enum_1.Space.World:
                    this._particleSystem.node.getWorldScale(this._node_scale);
                    break;
            }
            let material = this._particleSystem.materials[0];
            let mat = material ? this._particleSystem.particleMaterial : this._defaultMat;
            mat.setProperty('scale', this._node_scale);
            if (this._particleSystem.velocityOvertimeModule.enable) {
                this._particleSystem.velocityOvertimeModule.update(this._particleSystem._simulationSpace, _tempWorldTrans);
            }
            if (this._particleSystem.forceOvertimeModule.enable) {
                this._particleSystem.forceOvertimeModule.update(this._particleSystem._simulationSpace, _tempWorldTrans);
            }
            if (this._particleSystem.trailModule.enable) {
                this._particleSystem.trailModule.update();
            }
            for (let i = 0; i < this._particles.length; ++i) {
                const p = this._particles.data[i];
                p.remainingLifetime -= dt;
                value_types_1.Vec3.set(p.animatedVelocity, 0, 0, 0);
                if (p.remainingLifetime < 0.0) {
                    if (this._particleSystem.trailModule.enable) {
                        this._particleSystem.trailModule.removeParticle(p);
                    }
                    this._particles.remove(i);
                    --i;
                    continue;
                }
                p.velocity.y -= this._particleSystem.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, p.randomSeed) * 9.8 * dt; // apply gravity.
                if (this._particleSystem.sizeOvertimeModule.enable) {
                    this._particleSystem.sizeOvertimeModule.animate(p);
                }
                if (this._particleSystem.colorOverLifetimeModule.enable) {
                    this._particleSystem.colorOverLifetimeModule.animate(p);
                }
                if (this._particleSystem.forceOvertimeModule.enable) {
                    this._particleSystem.forceOvertimeModule.animate(p, dt);
                }
                if (this._particleSystem.velocityOvertimeModule.enable) {
                    this._particleSystem.velocityOvertimeModule.animate(p);
                }
                else {
                    value_types_1.Vec3.copy(p.ultimateVelocity, p.velocity);
                }
                if (this._particleSystem.limitVelocityOvertimeModule.enable) {
                    this._particleSystem.limitVelocityOvertimeModule.animate(p);
                }
                if (this._particleSystem.rotationOvertimeModule.enable) {
                    this._particleSystem.rotationOvertimeModule.animate(p, dt);
                }
                if (this._particleSystem.textureAnimationModule.enable) {
                    this._particleSystem.textureAnimationModule.animate(p);
                }
                value_types_1.Vec3.scaleAndAdd(p.position, p.position, p.ultimateVelocity, dt); // apply velocity.
                if (this._particleSystem.trailModule.enable) {
                    this._particleSystem.trailModule.animate(p, dt);
                }
            }
            return this._particles.length;
        }
        // internal function
        updateParticleBuffer() {
            // update vertex buffer
            let idx = 0;
            const uploadVel = this._particleSystem.renderMode === enum_1.RenderMode.StrecthedBillboard;
            for (let i = 0; i < this._particles.length; ++i) {
                const p = this._particles.data[i];
                let fi = 0;
                if (this._particleSystem.textureAnimationModule.enable) {
                    fi = p.frameIndex;
                }
                idx = i * 4;
                let attrNum = 0;
                if (this._particleSystem.renderMode !== enum_1.RenderMode.Mesh) {
                    for (let j = 0; j < 4; ++j) { // four verts per particle.
                        attrNum = 0;
                        this.attrs[attrNum++] = p.position;
                        _tempAttribUV.x = _uvs[2 * j];
                        _tempAttribUV.y = _uvs[2 * j + 1];
                        _tempAttribUV.z = fi;
                        this.attrs[attrNum++] = _tempAttribUV;
                        this.attrs[attrNum++] = p.size;
                        this.attrs[attrNum++] = p.rotation;
                        this.attrs[attrNum++] = p.color._val;
                        if (uploadVel) {
                            this.attrs[attrNum++] = p.ultimateVelocity;
                        }
                        else {
                            this.attrs[attrNum++] = null;
                        }
                        this._model.addParticleVertexData(idx++, this.attrs);
                    }
                }
                else {
                    attrNum = 0;
                    this.attrs[attrNum++] = p.position;
                    _tempAttribUV.z = fi;
                    this.attrs[attrNum++] = _tempAttribUV;
                    this.attrs[attrNum++] = p.size;
                    this.attrs[attrNum++] = p.rotation;
                    this.attrs[attrNum++] = p.color._val;
                    this._model.addParticleVertexData(i, this.attrs);
                }
            }
            this.updateIA(0, this._particles.length * this._model._indexCount, true);
        }
        updateShaderUniform() {
        }
        updateIA(index, count, vDirty, iDirty) {
            if (!this._model)
                return;
            this._model.updateIA(index, count, vDirty, iDirty);
        }
        getParticleCount() {
            return this._particles.data.length;
        }
        _onMaterialModified(index, material) {
            if (index === 0) {
                this._updateModel();
                this._updateMaterialParams();
            }
            else {
                this._updateTrailMaterial();
            }
        }
        _onRebuildPSO(index, material) {
            if (this._model && index === 0) {
                this._model.setModelMaterial(material);
            }
            if (this._particleSystem.trailModule._trailModel && index === 1) {
                this._particleSystem.trailModule._trailModel.setModelMaterial(material);
            }
        }
        _ensureLoadMesh() {
            if (this._particleSystem.mesh && !this._particleSystem.mesh.loaded) {
                cc.assetManager.postLoadNative(this._particleSystem.mesh);
            }
        }
        setCapacity(capacity) {
            if (!this._model)
                return;
            this._model.setCapacity(capacity);
        }
        _setVertexAttrib() {
            switch (this._particleSystem.renderMode) {
                case enum_1.RenderMode.StrecthedBillboard:
                    this._vertFormat = vfmtStretch;
                    break;
                case enum_1.RenderMode.Mesh:
                    this._vertFormat = vfmtMesh;
                    break;
                default:
                    this._vertFormat = vfmtNormal;
            }
        }
        _updateMaterialParams() {
            if (!this._particleSystem) {
                return;
            }
            let mat = this._particleSystem.materials[0];
            if (mat == null && this._defaultMat == null) {
                mat = this._defaultMat = material_variant_1.default.createWithBuiltin('3d-particle', this);
            }
            else {
                mat = material_variant_1.default.create(mat, this._particleSystem);
            }
            mat = mat || this._defaultMat;
            if (this._particleSystem._simulationSpace === enum_1.Space.World) {
                mat.define(CC_USE_WORLD_SPACE, true);
            }
            else {
                mat.define(CC_USE_WORLD_SPACE, false);
            }
            if (this._particleSystem.renderMode === enum_1.RenderMode.Billboard) {
                mat.define(CC_USE_BILLBOARD, true);
                mat.define(CC_USE_STRETCHED_BILLBOARD, false);
                mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
                mat.define(CC_USE_VERTICAL_BILLBOARD, false);
                mat.define(CC_USE_MESH, false);
            }
            else if (this._particleSystem.renderMode === enum_1.RenderMode.StrecthedBillboard) {
                mat.define(CC_USE_BILLBOARD, false);
                mat.define(CC_USE_STRETCHED_BILLBOARD, true);
                mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
                mat.define(CC_USE_VERTICAL_BILLBOARD, false);
                mat.define(CC_USE_MESH, false);
                this.frameTile_velLenScale.z = this._particleSystem.velocityScale;
                this.frameTile_velLenScale.w = this._particleSystem.lengthScale;
            }
            else if (this._particleSystem.renderMode === enum_1.RenderMode.HorizontalBillboard) {
                mat.define(CC_USE_BILLBOARD, false);
                mat.define(CC_USE_STRETCHED_BILLBOARD, false);
                mat.define(CC_USE_HORIZONTAL_BILLBOARD, true);
                mat.define(CC_USE_VERTICAL_BILLBOARD, false);
                mat.define(CC_USE_MESH, false);
            }
            else if (this._particleSystem.renderMode === enum_1.RenderMode.VerticalBillboard) {
                mat.define(CC_USE_BILLBOARD, false);
                mat.define(CC_USE_STRETCHED_BILLBOARD, false);
                mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
                mat.define(CC_USE_VERTICAL_BILLBOARD, true);
                mat.define(CC_USE_MESH, false);
            }
            else if (this._particleSystem.renderMode === enum_1.RenderMode.Mesh) {
                mat.define(CC_USE_BILLBOARD, false);
                mat.define(CC_USE_STRETCHED_BILLBOARD, false);
                mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
                mat.define(CC_USE_VERTICAL_BILLBOARD, false);
                mat.define(CC_USE_MESH, true);
            }
            else {
                console.warn(`particle system renderMode ${this._particleSystem.renderMode} not support.`);
            }
            if (this._particleSystem.textureAnimationModule.enable) {
                value_types_1.Vec2.set(this.frameTile_velLenScale, this._particleSystem.textureAnimationModule.numTilesX, this._particleSystem.textureAnimationModule.numTilesY);
            }
            mat.setProperty('frameTile_velLenScale', this.frameTile_velLenScale);
            this._particleSystem.setMaterial(0, mat);
        }
        _updateTrailMaterial() {
            // Here need to create a material variant through the getter call.
            let mat = this._particleSystem.trailMaterial;
            if (this._particleSystem.trailModule.enable) {
                if (mat === null && this._defaultTrailMat === null) {
                    this._defaultTrailMat = material_variant_1.default.createWithBuiltin('3d-trail', this);
                }
                if (mat === null) {
                    mat = this._defaultTrailMat;
                    this._particleSystem.trailMaterial = mat;
                }
                if (this._particleSystem._simulationSpace === enum_1.Space.World || this._particleSystem.trailModule.space === enum_1.Space.World) {
                    mat.define(CC_USE_WORLD_SPACE, true);
                }
                else {
                    mat.define(CC_USE_WORLD_SPACE, false);
                }
                //mat.define(CC_DRAW_WIRE_FRAME, true); // <wireframe debug>
                this._particleSystem.trailModule._updateMaterial();
            }
        }
        _updateTrailEnable(enable) {
            if (!this._model) {
                return;
            }
            let subData = this._model._subDatas[1];
            if (subData) {
                subData.enable = enable;
            }
        }
        _updateModel() {
            if (!this._model) {
                return;
            }
            this._model.setVertexAttributes(this._particleSystem.renderMode === enum_1.RenderMode.Mesh ? this._particleSystem.mesh : null, this._vertFormat);
        }
        setVertexAttributes(mesh, vfmt) {
            if (!this._model) {
                return;
            }
            this._model.setVertexAttributes(mesh, vfmt);
        }
        fillBuffers(comp, renderer) {
            if (!this._model)
                return;
            this._model._uploadData();
            let submeshes = this._model._subMeshes;
            let subDatas = this._model._subDatas;
            let materials = comp.materials;
            renderer._flush();
            for (let i = 0, len = submeshes.length; i < len; i++) {
                let ia = submeshes[i];
                let meshData = subDatas[i];
                let material = materials[i];
                if (meshData.enable) {
                    renderer.material = material;
                    renderer.cullingMask = comp.node._cullingMask;
                    renderer.node = comp.node;
                    renderer._flushIA(ia);
                }
            }
        }
    };
    __setFunctionName(_classThis, "ParticleSystem3DAssembler");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ParticleSystem3DAssembler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ParticleSystem3DAssembler = _classThis;
})();
exports.default = ParticleSystem3DAssembler;
Object.assign(ParticleSystem3DAssembler, { uv: _uvs });
assembler_1.default.register(particle_system_3d_1.default, ParticleSystem3DAssembler);
