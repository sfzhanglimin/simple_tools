"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = __importStar(require("./utils"));
const box_1 = __importDefault(require("./box"));
const cone_1 = __importDefault(require("./cone"));
const cylinder_1 = __importDefault(require("./cylinder"));
const plane_1 = __importDefault(require("./plane"));
const quad_1 = __importDefault(require("./quad"));
const sphere_1 = __importDefault(require("./sphere"));
const torus_1 = __importDefault(require("./torus"));
const capsule_1 = __importDefault(require("./capsule"));
const polyhedron_1 = require("./polyhedron");
const vertex_data_1 = __importDefault(require("./vertex-data"));
/**
 * !#en A basic module for creating vertex data for 3D objects. You can access this module by `cc.primitive`.
 * !#zh 一个创建 3D 物体顶点数据的基础模块，你可以通过 `cc.primitive` 来访问这个模块。
 * @module cc.primitive
 * @submodule cc.primitive
 * @main
 */
cc.primitive = Object.assign({
    /**
     * !#en Create box vertex data
     * !#zh 创建长方体顶点数据
     * @method box
     * @static
     * @param {Number} width
     * @param {Number} height
     * @param {Number} length
     * @param {Object} opts
     * @param {Number} opts.widthSegments
     * @param {Number} opts.heightSegments
     * @param {Number} opts.lengthSegments
     * @return {primitive.VertexData}
     */
    box: box_1.default,
    /**
     * !#en Create cone vertex data
     * !#zh 创建圆锥体顶点数据
     * @method cone
     * @static
     * @param {Number} radius
     * @param {Number} height
     * @param {Object} opts
     * @param {Number} opts.radialSegments
     * @param {Number} opts.heightSegments
     * @param {Boolean} opts.capped
     * @param {Number} opts.arc
     * @return {primitive.VertexData}
     */
    cone: cone_1.default,
    /**
     * !#en Create cylinder vertex data
     * !#zh 创建圆柱体顶点数据
     * @method cylinder
     * @static
     * @param {Number} radiusTop
     * @param {Number} radiusBottom
     * @param {Number} height
     * @param {Object} opts
     * @param {Number} opts.radialSegments
     * @param {Number} opts.heightSegments
     * @param {Boolean} opts.capped
     * @param {Number} opts.arc
     * @return {primitive.VertexData}
     */
    cylinder: cylinder_1.default,
    /**
     * !#en Create plane vertex data
     * !#zh 创建平台顶点数据
     * @method plane
     * @static
     * @param {Number} width
     * @param {Number} length
     * @param {Object} opts
     * @param {Number} opts.widthSegments
     * @param {Number} opts.lengthSegments
     * @return {primitive.VertexData}
     */
    plane: plane_1.default,
    /**
     * !#en Create quad vertex data
     * !#zh 创建面片顶点数据
     * @method quad
     * @static
     * @return {primitive.VertexData}
     */
    quad: quad_1.default,
    /**
     * !#en Create sphere vertex data
     * !#zh 创建球体顶点数据
     * @method sphere
     * @static
     * @param {Number} radius
     * @param {Object} opts
     * @param {Number} opts.segments
     * @return {primitive.VertexData}
     */
    sphere: sphere_1.default,
    /**
     * !#en Create torus vertex data
     * !#zh 创建圆环顶点数据
     * @method torus
     * @static
     * @param {Number} radius
     * @param {Number} tube
     * @param {Object} opts
     * @param {Number} opts.radialSegments
     * @param {Number} opts.tubularSegments
     * @param {Number} opts.arc
     * @return {primitive.VertexData}
     */
    torus: torus_1.default,
    /**
     * !#en Create capsule vertex data
     * !#zh 创建胶囊体顶点数据
     * @method capsule
     * @static
     * @param {Number} radiusTop
     * @param {Number} radiusBottom
     * @param {Number} height
     * @param {Object} opts
     * @param {Number} opts.sides
     * @param {Number} opts.heightSegments
     * @param {Boolean} opts.capped
     * @param {Number} opts.arc
     * @return {primitive.VertexData}
     */
    capsule: capsule_1.default,
    /**
     * !#en Create polyhedron vertex data
     * !#zh 创建多面体顶点数据
     * @method polyhedron
     * @static
     * @param {primitive.PolyhedronType} type
     * @param {Number} Size
     * @param {Object} opts
     * @param {Number} opts.sizeX
     * @param {Number} opts.sizeY
     * @param {Number} opts.sizeZ
     * @return {primitive.VertexData}
     */
    polyhedron: polyhedron_1.polyhedron,
    PolyhedronType: polyhedron_1.PolyhedronType,
    VertexData: vertex_data_1.default,
}, utils);
// fix submodule pollute ...
/**
 * @submodule cc
 */
