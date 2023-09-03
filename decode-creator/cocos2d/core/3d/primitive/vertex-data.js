"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class primitive.VertexData
 * @param {number[]} positions
 * @param {number[]} normals
 * @param {number[]} uvs
 * @param {number[]} indices
 * @param {Vec3} minPos
 * @param {Vec3} maxPos
 * @param {number} boundingRadius
 */
class VertexData {
    constructor(positions, normals, uvs, indices, minPos, maxPos, boundingRadius) {
        this.positions = positions;
        this.normals = normals;
        this.uvs = uvs;
        this.indices = indices;
        this.minPos = minPos;
        this.maxPos = maxPos;
        this.boundingRadius = boundingRadius;
    }
}
exports.default = VertexData;
