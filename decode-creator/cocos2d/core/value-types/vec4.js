"use strict";
/*
 Copyright (c) 2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v4 = void 0;
const CCClass_1 = __importDefault(require("../platform/CCClass"));
const value_type_1 = __importDefault(require("./value-type"));
const utils_1 = require("./utils");
let _x = 0.0;
let _y = 0.0;
let _z = 0.0;
let _w = 0.0;
/**
 * !#en Representation of 3D vectors and points.
 * !#zh 表示 3D 向量和坐标
 *
 * @class Vec4
 * @extends ValueType
 */
class Vec4 extends value_type_1.default {
    /**
     * !#en Subtracts one vector from this, and returns the new result.
     * !#zh 向量减法，并返回新结果。
     * @method sub
     * @param {Vec4} vector
     * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
     * @return {Vec4} the result
     */
    sub(vector, out) {
        return Vec4.subtract(out || new Vec4(), this, vector);
    }
    /**
     * !#en Multiplies by a number, and returns the new result.
     * !#zh 缩放向量，并返回新结果。
     * @method mul
     * @param {number} num
     * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
     * @return {Vec4} the result
     */
    mul(num, out) {
        return Vec4.multiplyScalar(out || new Vec4(), this, num);
    }
    /**
     * !#en Divides by a number, and returns the new result.
     * !#zh 向量除法，并返回新的结果。
     * @method div
     * @param {number} num
     * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
     * @return {Vec4} the result
     */
    div(num, out) {
        return Vec4.multiplyScalar(out || new Vec4(), this, 1 / num);
    }
    /**
     * !#en Multiplies two vectors, and returns the new result.
     * !#zh 分量相乘，并返回新的结果。
     * @method scale
     * @param {Vec4} vector
     * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
     * @return {Vec4} the result
     */
    scale(vector, out) {
        return Vec4.multiply(out || new Vec4(), this, vector);
    }
    /**
     * !#en Negates the components, and returns the new result.
     * !#zh 返回取反后的新向量。
     * @method neg
     * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
     * @return {Vec4} the result
     */
    neg(out) {
        return Vec4.negate(out || new Vec4(), this);
    }
    static get ZERO() { return new Vec4(0, 0, 0, 0); }
    static get ONE() { return new Vec4(1, 1, 1, 1); }
    static get NEG_ONE() { return new Vec4(-1, -1, -1, -1); }
    /**
     * !#zh 获得指定向量的拷贝
     * !#en Obtaining copy vectors designated
     * @method clone
     * @typescript
     * clone <Out extends IVec4Like> (a: Out): Vec4
     * @static
     */
    static clone(a) {
        return new Vec4(a.x, a.y, a.z, a.w);
    }
    /**
     * !#zh 复制目标向量
     * !#en Copy the target vector
     * @method copy
     * @typescript
     * copy <Out extends IVec4Like> (out: Out, a: Out): Out
     * @static
     */
    static copy(out, a) {
        out.x = a.x;
        out.y = a.y;
        out.z = a.z;
        out.w = a.w;
        return out;
    }
    /**
     * !#zh 设置向量值
     * !#en Set to value
     * @method set
     * @typescript
     * set <Out extends IVec4Like> (out: Out, x: number, y: number, z: number, w: number): Out
     * @static
     */
    static set(out, x, y, z, w) {
        out.x = x;
        out.y = y;
        out.z = z;
        out.w = w;
        return out;
    }
    /**
     * !#zh 逐元素向量加法
     * !#en Element-wise vector addition
     * @method add
     * @typescript
     * add <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static add(out, a, b) {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        out.z = a.z + b.z;
        out.w = a.w + b.w;
        return out;
    }
    /**
     * !#zh 逐元素向量减法
     * !#en Element-wise vector subtraction
     * @method subtract
     * @typescript
     * subtract <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static subtract(out, a, b) {
        out.x = a.x - b.x;
        out.y = a.y - b.y;
        out.z = a.z - b.z;
        out.w = a.w - b.w;
        return out;
    }
    /**
     * !#zh 逐元素向量乘法
     * !#en Element-wise vector multiplication
     * @method multiply
     * @typescript
     * multiply <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static multiply(out, a, b) {
        out.x = a.x * b.x;
        out.y = a.y * b.y;
        out.z = a.z * b.z;
        out.w = a.w * b.w;
        return out;
    }
    /**
     * !#zh 逐元素向量除法
     * !#en Element-wise vector division
     * @method divide
     * @typescript
     * divide <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static divide(out, a, b) {
        out.x = a.x / b.x;
        out.y = a.y / b.y;
        out.z = a.z / b.z;
        out.w = a.w / b.w;
        return out;
    }
    /**
     * !#zh 逐元素向量向上取整
     * !#en Rounding up by elements of the vector
     * @method ceil
     * @typescript
     * ceil <Out extends IVec4Like> (out: Out, a: Out): Out
     * @static
     */
    static ceil(out, a) {
        out.x = Math.ceil(a.x);
        out.y = Math.ceil(a.y);
        out.z = Math.ceil(a.z);
        out.w = Math.ceil(a.w);
        return out;
    }
    /**
     * !#zh 逐元素向量向下取整
     * !#en Element vector by rounding down
     * @method floor
     * @typescript
     * floor <Out extends IVec4Like> (out: Out, a: Out): Out
     * @static
     */
    static floor(out, a) {
        out.x = Math.floor(a.x);
        out.y = Math.floor(a.y);
        out.z = Math.floor(a.z);
        out.w = Math.floor(a.w);
        return out;
    }
    /**
     * !#zh 逐元素向量最小值
     * !#en The minimum by-element vector
     * @method min
     * @typescript
     * min <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static min(out, a, b) {
        out.x = Math.min(a.x, b.x);
        out.y = Math.min(a.y, b.y);
        out.z = Math.min(a.z, b.z);
        out.w = Math.min(a.w, b.w);
        return out;
    }
    /**
     * !#zh 逐元素向量最大值
     * !#en The maximum value of the element-wise vector
     * @method max
     * @typescript
     * max <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static max(out, a, b) {
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        out.z = Math.max(a.z, b.z);
        out.w = Math.max(a.w, b.w);
        return out;
    }
    /**
     * !#zh 逐元素向量四舍五入取整
     * !#en Element-wise vector of rounding to whole
     * @method round
     * @typescript
     * round <Out extends IVec4Like> (out: Out, a: Out): Out
     * @static
     */
    static round(out, a) {
        out.x = Math.round(a.x);
        out.y = Math.round(a.y);
        out.z = Math.round(a.z);
        out.w = Math.round(a.w);
        return out;
    }
    /**
     * !#zh 向量标量乘法
     * !#en Vector scalar multiplication
     * @method multiplyScalar
     * @typescript
     * multiplyScalar <Out extends IVec4Like> (out: Out, a: Out, b: number): Out
     * @static
     */
    static multiplyScalar(out, a, b) {
        out.x = a.x * b;
        out.y = a.y * b;
        out.z = a.z * b;
        out.w = a.w * b;
        return out;
    }
    /**
     * !#zh 逐元素向量乘加: A + B * scale
     * !#en Element-wise vector multiply add: A + B * scale
     * @method scaleAndAdd
     * @typescript
     * scaleAndAdd <Out extends IVec4Like> (out: Out, a: Out, b: Out, scale: number): Out
     * @static
     */
    static scaleAndAdd(out, a, b, scale) {
        out.x = a.x + (b.x * scale);
        out.y = a.y + (b.y * scale);
        out.z = a.z + (b.z * scale);
        out.w = a.w + (b.w * scale);
        return out;
    }
    /**
     * !#zh 求两向量的欧氏距离
     * !#en Seeking two vectors Euclidean distance
     * @method distance
     * @typescript
     * distance <Out extends IVec4Like> (a: Out, b: Out): number
     * @static
     */
    static distance(a, b) {
        const x = b.x - a.x;
        const y = b.y - a.y;
        const z = b.z - a.z;
        const w = b.w - a.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * !#zh 求两向量的欧氏距离平方
     * !#en Euclidean distance squared seeking two vectors
     * @method squaredDistance
     * @typescript
     * squaredDistance <Out extends IVec4Like> (a: Out, b: Out): number
     * @static
     */
    static squaredDistance(a, b) {
        const x = b.x - a.x;
        const y = b.y - a.y;
        const z = b.z - a.z;
        const w = b.w - a.w;
        return x * x + y * y + z * z + w * w;
    }
    /**
     * !#zh 求向量长度
     * !#en Seeking vector length
     * @method len
     * @typescript
     * len <Out extends IVec4Like> (a: Out): number
     * @static
     */
    static len(a) {
        _x = a.x;
        _y = a.y;
        _z = a.z;
        _w = a.w;
        return Math.sqrt(_x * _x + _y * _y + _z * _z + _w * _w);
    }
    /**
     * !#zh 求向量长度平方
     * !#en Seeking squared vector length
     * @method lengthSqr
     * @typescript
     * lengthSqr <Out extends IVec4Like> (a: Out): number
     * @static
     */
    static lengthSqr(a) {
        _x = a.x;
        _y = a.y;
        _z = a.z;
        _w = a.w;
        return _x * _x + _y * _y + _z * _z + _w * _w;
    }
    /**
     * !#zh 逐元素向量取负
     * !#en By taking the negative elements of the vector
     * @method negate
     * @typescript
     * negate <Out extends IVec4Like> (out: Out, a: Out): Out
     * @static
     */
    static negate(out, a) {
        out.x = -a.x;
        out.y = -a.y;
        out.z = -a.z;
        out.w = -a.w;
        return out;
    }
    /**
     * !#zh 逐元素向量取倒数，接近 0 时返回 Infinity
     * !#en Element vector by taking the inverse, return near 0 Infinity
     * @method inverse
     * @typescript
     * inverse <Out extends IVec4Like> (out: Out, a: Out): Out
     * @static
     */
    static inverse(out, a) {
        out.x = 1.0 / a.x;
        out.y = 1.0 / a.y;
        out.z = 1.0 / a.z;
        out.w = 1.0 / a.w;
        return out;
    }
    /**
     * !#zh 逐元素向量取倒数，接近 0 时返回 0
     * !#en Element vector by taking the inverse, return near 0 0
     * @method inverseSafe
     * @typescript
     * inverseSafe <Out extends IVec4Like> (out: Out, a: Out): Out
     * @static
     */
    static inverseSafe(out, a) {
        _x = a.x;
        _y = a.y;
        _z = a.z;
        _w = a.w;
        if (Math.abs(_x) < utils_1.EPSILON) {
            out.x = 0;
        }
        else {
            out.x = 1.0 / _x;
        }
        if (Math.abs(_y) < utils_1.EPSILON) {
            out.y = 0;
        }
        else {
            out.y = 1.0 / _y;
        }
        if (Math.abs(_z) < utils_1.EPSILON) {
            out.z = 0;
        }
        else {
            out.z = 1.0 / _z;
        }
        if (Math.abs(_w) < utils_1.EPSILON) {
            out.w = 0;
        }
        else {
            out.w = 1.0 / _w;
        }
        return out;
    }
    /**
     * !#zh 归一化向量
     * !#en Normalized vector
     * @method normalize
     * @typescript
     * normalize <Out extends IVec4Like> (out: Out, a: Out): Out
     * @static
     */
    static normalize(out, a) {
        _x = a.x;
        _y = a.y;
        _z = a.z;
        _w = a.w;
        let len = _x * _x + _y * _y + _z * _z + _w * _w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = _x * len;
            out.y = _y * len;
            out.z = _z * len;
            out.w = _w * len;
        }
        return out;
    }
    /**
     * !#zh 向量点积（数量积）
     * !#en Vector dot product (scalar product)
     * @method dot
     * @typescript
     * dot <Out extends IVec4Like> (a: Out, b: Out): number
     * @static
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }
    /**
     * !#zh 逐元素向量线性插值： A + t * (B - A)
     * !#en Vector element by element linear interpolation: A + t * (B - A)
     * @method lerp
     * @typescript
     * lerp <Out extends IVec4Like> (out: Out, a: Out, b: Out, t: number): Out
     * @static
     */
    static lerp(out, a, b, t) {
        out.x = a.x + t * (b.x - a.x);
        out.y = a.y + t * (b.y - a.y);
        out.z = a.z + t * (b.z - a.z);
        out.w = a.w + t * (b.w - a.w);
        return out;
    }
    /**
     * !#zh 生成一个在单位球体上均匀分布的随机向量
     * !#en Generates a uniformly distributed random vectors on the unit sphere
     * @method random
     * @typescript
     * random <Out extends IVec4Like> (out: Out, scale?: number): Out
     * @param scale 生成的向量长度
     * @static
     */
    static random(out, scale) {
        scale = scale || 1.0;
        const phi = (0, utils_1.random)() * 2.0 * Math.PI;
        const cosTheta = (0, utils_1.random)() * 2 - 1;
        const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
        out.x = sinTheta * Math.cos(phi) * scale;
        out.y = sinTheta * Math.sin(phi) * scale;
        out.z = cosTheta * scale;
        out.w = 0;
        return out;
    }
    /**
     * !#zh 向量矩阵乘法
     * !#en Vector matrix multiplication
     * @method transformMat4
     * @typescript
     * transformMat4 <Out extends IVec4Like, MatLike extends IMat4Like> (out: Out, a: Out, mat: MatLike): Out
     * @static
     */
    static transformMat4(out, a, mat) {
        _x = a.x;
        _y = a.y;
        _z = a.z;
        _w = a.w;
        let m = mat.m;
        out.x = m[0] * _x + m[4] * _y + m[8] * _z + m[12] * _w;
        out.y = m[1] * _x + m[5] * _y + m[9] * _z + m[13] * _w;
        out.z = m[2] * _x + m[6] * _y + m[10] * _z + m[14] * _w;
        out.w = m[3] * _x + m[7] * _y + m[11] * _z + m[15] * _w;
        return out;
    }
    /**
     * !#zh 向量仿射变换
     * !#en Affine transformation vector
     * @method transformAffine
     * @typescript
     * transformAffine<Out extends IVec4Like, VecLike extends IVec4Like, MatLike extends IMat4Like>(out: Out, v: VecLike, mat: MatLike): Out
     * @static
     */
    static transformAffine(out, v, mat) {
        _x = v.x;
        _y = v.y;
        _z = v.z;
        _w = v.w;
        let m = mat.m;
        out.x = m[0] * _x + m[1] * _y + m[2] * _z + m[3] * _w;
        out.y = m[4] * _x + m[5] * _y + m[6] * _z + m[7] * _w;
        out.x = m[8] * _x + m[9] * _y + m[10] * _z + m[11] * _w;
        out.w = v.w;
        return out;
    }
    /**
     * !#zh 向量四元数乘法
     * !#en Vector quaternion multiplication
     * @method transformQuat
     * @typescript
     * transformQuat <Out extends IVec4Like, QuatLike extends IQuatLike> (out: Out, a: Out, q: QuatLike): Out
     * @static
     */
    static transformQuat(out, a, q) {
        const { x, y, z } = a;
        _x = q.x;
        _y = q.y;
        _z = q.z;
        _w = q.w;
        // calculate quat * vec
        const ix = _w * x + _y * z - _z * y;
        const iy = _w * y + _z * x - _x * z;
        const iz = _w * z + _x * y - _y * x;
        const iw = -_x * x - _y * y - _z * z;
        // calculate result * inverse quat
        out.x = ix * _w + iw * -_x + iy * -_z - iz * -_y;
        out.y = iy * _w + iw * -_y + iz * -_x - ix * -_z;
        out.z = iz * _w + iw * -_z + ix * -_y - iy * -_x;
        out.w = a.w;
        return out;
    }
    /**
     * !#zh 向量等价判断
     * !#en Equivalent vectors Analyzing
     * @method strictEquals
     * @typescript
     * strictEquals <Out extends IVec4Like> (a: Out, b: Out): boolean
     * @static
     */
    static strictEquals(a, b) {
        return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
    }
    /**
     * !#zh 排除浮点数误差的向量近似等价判断
     * !#en Negative error vector floating point approximately equivalent Analyzing
     * @method equals
     * @typescript
     * equals <Out extends IVec4Like> (a: Out, b: Out, epsilon?: number): boolean
     * @static
     */
    static equals(a, b, epsilon = utils_1.EPSILON) {
        return (Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) &&
            Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y)) &&
            Math.abs(a.z - b.z) <= epsilon * Math.max(1.0, Math.abs(a.z), Math.abs(b.z)) &&
            Math.abs(a.w - b.w) <= epsilon * Math.max(1.0, Math.abs(a.w), Math.abs(b.w)));
    }
    /**
     * !#zh 向量转数组
     * !#en Vector transfer array
     * @method toArray
     * @typescript
     * toArray <Out extends IWritableArrayLike<number>> (out: Out, v: IVec4Like, ofs?: number): Out
     * @param ofs 数组起始偏移量
     * @static
     */
    static toArray(out, v, ofs = 0) {
        out[ofs + 0] = v.x;
        out[ofs + 1] = v.y;
        out[ofs + 2] = v.z;
        out[ofs + 3] = v.w;
        return out;
    }
    /**
     * !#zh 数组转向量
     * !#en Array steering amount
     * @method fromArray
     * @typescript
     * fromArray <Out extends IVec4Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
     * @param ofs 数组起始偏移量
     * @static
     */
    static fromArray(out, arr, ofs = 0) {
        out.x = arr[ofs + 0];
        out.y = arr[ofs + 1];
        out.z = arr[ofs + 2];
        out.w = arr[ofs + 3];
        return out;
    }
    /**
     * !#en
     * Constructor
     * see {{#crossLink "cc/vec4:method"}}cc.v4{{/crossLink}}
     * !#zh
     * 构造函数，可查看 {{#crossLink "cc/vec4:method"}}cc.v4{{/crossLink}}
     * @method constructor
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {number} [z=0]
     * @param {number} [w=0]
     */
    constructor(x = 0, y = 0, z = 0, w = 0) {
        super();
        this.mag = Vec4.prototype.len;
        this.magSqr = Vec4.prototype.lengthSqr;
        /**
         * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
         * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
         * @method subSelf
         * @param {Vec4} vector
         * @return {Vec4} returns this
         * @chainable
         */
        this.subSelf = Vec4.prototype.subtract;
        /**
         * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
         * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
         * @method mulSelf
         * @param {number} num
         * @return {Vec4} returns this
         * @chainable
         */
        this.mulSelf = Vec4.prototype.multiplyScalar;
        /**
         * !#en Divides by a number. If you want to save result to another vector, use div() instead.
         * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
         * @method divSelf
         * @param {number} num
         * @return {Vec4} returns this
         * @chainable
         */
        this.divSelf = Vec4.prototype.divide;
        /**
         * !#en Multiplies two vectors.
         * !#zh 分量相乘。
         * @method scaleSelf
         * @param {Vec4} vector
         * @return {Vec4} returns this
         * @chainable
         */
        this.scaleSelf = Vec4.prototype.multiply;
        /**
         * !#en Negates the components. If you want to save result to another vector, use neg() instead.
         * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
         * @method negSelf
         * @return {Vec4} returns this
         * @chainable
         */
        this.negSelf = Vec4.prototype.negate;
        if (x && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = x.w;
        }
        else {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
    }
    /**
     * !#en clone a Vec4 value
     * !#zh 克隆一个 Vec4 值
     * @method clone
     * @return {Vec4}
     */
    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }
    set(x, y, z, w) {
        if (x && typeof x === 'object') {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = x.w;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w || 0;
        }
        return this;
    }
    /**
     * !#en Check whether the vector equals another one
     * !#zh 当前的向量是否与指定的向量相等。
     * @method equals
     * @param {Vec4} other
     * @param {number} [epsilon]
     * @return {Boolean}
     */
    equals(other, epsilon = utils_1.EPSILON) {
        return (Math.abs(this.x - other.x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x)) &&
            Math.abs(this.y - other.y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y)) &&
            Math.abs(this.z - other.z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(other.z)) &&
            Math.abs(this.w - other.w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(other.w)));
    }
    /**
     * !#en Check whether the vector equals another one
     * !#zh 判断当前向量是否在误差范围内与指定分量的向量相等。
     * @method equals4f
     * @param {number} x - 相比较的向量的 x 分量。
     * @param {number} y - 相比较的向量的 y 分量。
     * @param {number} z - 相比较的向量的 z 分量。
     * @param {number} w - 相比较的向量的 w 分量。
     * @param {number} [epsilon] - 允许的误差，应为非负数。
     * @returns {Boolean} - 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
     */
    equals4f(x, y, z, w, epsilon = utils_1.EPSILON) {
        return (Math.abs(this.x - x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(x)) &&
            Math.abs(this.y - y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(y)) &&
            Math.abs(this.z - z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(z)) &&
            Math.abs(this.w - w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(w)));
    }
    /**
     * !#en Check whether strict equals other Vec4
     * !#zh 判断当前向量是否与指定向量相等。两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
     * @method strictEquals
     * @param {Vec4} other - 相比较的向量。
     * @returns {boolean}
     */
    strictEquals(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
    }
    /**
     * !#en Check whether strict equals other Vec4
     * !#zh 判断当前向量是否与指定分量的向量相等。两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
     * @method strictEquals4f
     * @param {number} x - 指定向量的 x 分量。
     * @param {number} y - 指定向量的 y 分量。
     * @param {number} z - 指定向量的 z 分量。
     * @param {number} w - 指定向量的 w 分量。
     * @returns {boolean}
     */
    strictEquals4f(x, y, z, w) {
        return this.x === x && this.y === y && this.z === z && this.w === w;
    }
    /**
     * !#en Calculate linear interpolation result between this vector and another one with given ratio
     * !#zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
     * @method lerp
     * @param {Vec4} to 目标向量。
     * @param {number} ratio 插值比率，范围为 [0,1]。
     * @returns {Vec4}
     */
    lerp(to, ratio) {
        _x = this.x;
        _y = this.y;
        _z = this.z;
        _w = this.w;
        this.x = _x + ratio * (to.x - _x);
        this.y = _y + ratio * (to.y - _y);
        this.z = _z + ratio * (to.z - _z);
        this.w = _w + ratio * (to.w - _w);
        return this;
    }
    /**
     * !#en Transform to string with vector informations
     * !#zh 返回当前向量的字符串表示。
     * @method toString
     * @returns {string} 当前向量的字符串表示。
     */
    toString() {
        return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.z.toFixed(2)}, ${this.w.toFixed(2)})`;
    }
    /**
     * !#en Clamp the vector between minInclusive and maxInclusive.
     * !#zh 设置当前向量的值，使其各个分量都处于指定的范围内。
     * @method clampf
     * @param {Vec4} minInclusive 每个分量都代表了对应分量允许的最小值。
     * @param {Vec4} maxInclusive 每个分量都代表了对应分量允许的最大值。
     * @returns {Vec4}
     */
    clampf(minInclusive, maxInclusive) {
        this.x = (0, utils_1.clamp)(this.x, minInclusive.x, maxInclusive.x);
        this.y = (0, utils_1.clamp)(this.y, minInclusive.y, maxInclusive.y);
        this.z = (0, utils_1.clamp)(this.z, minInclusive.z, maxInclusive.z);
        this.w = (0, utils_1.clamp)(this.w, minInclusive.w, maxInclusive.w);
        return this;
    }
    /**
     * !#en Adds this vector. If you want to save result to another vector, use add() instead.
     * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
     * @method addSelf
     * @param {Vec4} vector
     * @return {Vec4} returns this
     * @chainable
     */
    addSelf(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        this.w += vector.w;
        return this;
    }
    /**
     * !#en Adds two vectors, and returns the new result.
     * !#zh 向量加法，并返回新结果。
     * @method add
     * @param {Vec4} vector
     * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
     * @return {Vec4} the result
     */
    add(vector, out) {
        out = out || new Vec4();
        out.x = this.x + vector.x;
        out.y = this.y + vector.y;
        out.z = this.z + vector.z;
        out.w = this.w + vector.w;
        return out;
    }
    /**
     * !#en Subtracts one vector from this, and returns the new result.
     * !#zh 向量减法，并返回新结果。
     * @method subtract
     * @param {Vec4} vector
     * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
     * @return {Vec4} the result
     */
    subtract(vector, out) {
        out = out || new Vec4();
        out.x = this.x - vector.x;
        out.y = this.y - vector.y;
        out.z = this.z - vector.z;
        out.w = this.w - vector.w;
        return out;
    }
    /**
     * !#en Multiplies this by a number.
     * !#zh 缩放当前向量。
     * @method multiplyScalar
     * @param {number} num
     * @return {Vec4} returns this
     * @chainable
     */
    multiplyScalar(num) {
        this.x *= num;
        this.y *= num;
        this.z *= num;
        this.w *= num;
        return this;
    }
    /**
     * !#en Multiplies two vectors.
     * !#zh 分量相乘。
     * @method multiply
     * @param {Vec4} vector
     * @return {Vec4} returns this
     * @chainable
     */
    multiply(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;
        this.w *= vector.w;
        return this;
    }
    /**
     * !#en Divides by a number.
     * !#zh 向量除法。
     * @method divide
     * @param {number} num
     * @return {Vec4} returns this
     * @chainable
     */
    divide(num) {
        this.x /= num;
        this.y /= num;
        this.z /= num;
        this.w /= num;
        return this;
    }
    /**
     * !#en Negates the components.
     * !#zh 向量取反
     * @method negate
     * @return {Vec4} returns this
     * @chainable
     */
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }
    /**
     * !#en Dot product
     * !#zh 当前向量与指定向量进行点乘。
     * @method dot
     * @param {Vec4} [vector]
     * @return {number} the result
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
    }
    /**
     * !#en Cross product
     * !#zh 当前向量与指定向量进行叉乘。
     * @method cross
     * @param {Vec4} vector
     * @param {Vec4} [out]
     * @return {Vec4} the result
     */
    cross(vector, out) {
        out = out || new Vec4();
        const { x: ax, y: ay, z: az } = this;
        const { x: bx, y: by, z: bz } = vector;
        out.x = ay * bz - az * by;
        out.y = az * bx - ax * bz;
        out.z = ax * by - ay * bx;
        return out;
    }
    /**
     * !#en Returns the length of this vector.
     * !#zh 返回该向量的长度。
     * @method len
     * @return {number} the result
     * @example
     * var v = cc.v4(10, 10);
     * v.len(); // return 14.142135623730951;
     */
    len() {
        let x = this.x, y = this.y, z = this.z, w = this.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * !#en Returns the squared length of this vector.
     * !#zh 返回该向量的长度平方。
     * @method lengthSqr
     * @return {number} the result
     */
    lengthSqr() {
        let x = this.x, y = this.y, z = this.z, w = this.w;
        return x * x + y * y + z * z + w * w;
    }
    /**
     * !#en Make the length of this vector to 1.
     * !#zh 向量归一化，让这个向量的长度为 1。
     * @method normalizeSelf
     * @return {Vec4} returns this
     * @chainable
     */
    normalizeSelf() {
        this.normalize(this);
        return this;
    }
    /**
     * !#en
     * Returns this vector with a magnitude of 1.<br/>
     * <br/>
     * Note that the current vector is unchanged and a new normalized vector is returned. If you want to normalize the current vector, use normalizeSelf function.
     * !#zh
     * 返回归一化后的向量。<br/>
     * <br/>
     * 注意，当前向量不变，并返回一个新的归一化向量。如果你想来归一化当前向量，可使用 normalizeSelf 函数。
     * @method normalize
     * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
     * @return {Vec4} result
     */
    normalize(out) {
        out = out || new Vec4();
        _x = this.x;
        _y = this.y;
        _z = this.z;
        _w = this.w;
        let len = _x * _x + _y * _y + _z * _z + _w * _w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = _x * len;
            out.y = _y * len;
            out.z = _z * len;
            out.w = _w * len;
        }
        return out;
    }
    /**
     * Transforms the vec4 with a mat4. 4th vector component is implicitly '1'
     * @method transformMat4
     * @param {Mat4} m matrix to transform with
     * @param {Vec4} [out] the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
     * @returns {Vec4} out
     */
    transformMat4(matrix, out) {
        out = out || new Vec4();
        _x = this.x;
        _y = this.y;
        _z = this.z;
        _w = this.w;
        let m = matrix.m;
        out.x = m[0] * _x + m[4] * _y + m[8] * _z + m[12] * _w;
        out.y = m[1] * _x + m[5] * _y + m[9] * _z + m[13] * _w;
        out.z = m[2] * _x + m[6] * _y + m[10] * _z + m[14] * _w;
        out.w = m[3] * _x + m[7] * _y + m[11] * _z + m[15] * _w;
        return out;
    }
    /**
     * Returns the maximum value in x, y, z, w.
     * @method maxAxis
     * @returns {number}
     */
    maxAxis() {
        return Math.max(this.x, this.y, this.z, this.w);
    }
}
// deprecated
Vec4.sub = Vec4.subtract;
Vec4.mul = Vec4.multiply;
Vec4.div = Vec4.divide;
Vec4.scale = Vec4.multiplyScalar;
Vec4.mag = Vec4.len;
Vec4.squaredMagnitude = Vec4.lengthSqr;
Vec4.ZERO_R = Vec4.ZERO;
Vec4.ONE_R = Vec4.ONE;
Vec4.NEG_ONE_R = Vec4.NEG_ONE;
exports.default = Vec4;
CCClass_1.default.fastDefine('cc.Vec4', Vec4, { x: 0, y: 0, z: 0, w: 0 });
function v4(x, y, z, w) {
    return new Vec4(x, y, z, w);
}
exports.v4 = v4;
cc.v4 = v4;
cc.Vec4 = Vec4;
