'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cylinder_1 = __importDefault(require("./cylinder"));
/**
 * @param {Number} radius
 * @param {Number} height
 * @param {Object} opts
 * @param {Number} opts.radialSegments
 * @param {Number} opts.heightSegments
 * @param {Boolean} opts.capped
 * @param {Number} opts.arc
 */
function default_1(radius = 0.5, height = 1, opts = { radialSegments: 32, heightSegments: 1, capped: true, arc: 2.0 * Math.PI }) {
    return (0, cylinder_1.default)(0, radius, height, opts);
}
exports.default = default_1;
