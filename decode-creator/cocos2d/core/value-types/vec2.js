"use strict";
/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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
 ****************************************************************************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const value_type_1 = __importDefault(require("./value-type"));
const CCClass_1 = __importDefault(require("../platform/CCClass"));
const misc_1 = __importDefault(require("../utils/misc"));
const utils_1 = require("./utils");
let _x = 0.0;
let _y = 0.0;
/**
 * !#en Representation of 2D vectors and points.
 * !#zh 表示 2D 向量和坐标
 *
 * @class Vec2
 * @extends ValueType
 */
class Vec2 extends value_type_1.default {
    /**
     * !#en Subtracts one vector from this, and returns the new result.
     * !#zh 向量减法，并返回新结果。
     * @method sub
     * @param {Vec2} vector
     * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
     * @return {Vec2} the result
     * @example
     * var v = cc.v2(10, 10);
     * v.sub(cc.v2(5, 5));      // return Vec2 {x: 5, y: 5};
     * var v1 = new Vec2;
     * v.sub(cc.v2(5, 5), v1);  // return Vec2 {x: 5, y: 5};
     */
    sub(vector, out) {
        return Vec2.subtract(out || new Vec2(), this, vector);
    }
    /**
     * !#en Multiplies by a number, and returns the new result.
     * !#zh 缩放向量，并返回新结果。
     * @method mul
     * @param {number} num
     * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
     * @return {Vec2} the result
     * @example
     * var v = cc.v2(10, 10);
     * v.mul(5);      // return Vec2 {x: 50, y: 50};
     * var v1 = new Vec2;
     * v.mul(5, v1);  // return Vec2 {x: 50, y: 50};
     */
    mul(num, out) {
        return Vec2.multiplyScalar(out || new Vec2(), this, num);
    }
    /**
     * !#en Divides by a number, and returns the new result.
     * !#zh 向量除法，并返回新的结果。
     * @method div
     * @param {number} num
     * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
     * @return {Vec2} the result
     * @example
     * var v = cc.v2(10, 10);
     * v.div(5);      // return Vec2 {x: 2, y: 2};
     * var v1 = new Vec2;
     * v.div(5, v1);  // return Vec2 {x: 2, y: 2};
     */
    div(num, out) {
        return Vec2.multiplyScalar(out || new Vec2(), this, 1 / num);
    }
    /**
     * !#en Multiplies two vectors, and returns the new result.
     * !#zh 分量相乘，并返回新的结果。
     * @method scale
     * @param {Vec2} vector
     * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
     * @return {Vec2} the result
     * @example
     * var v = cc.v2(10, 10);
     * v.scale(cc.v2(5, 5));      // return Vec2 {x: 50, y: 50};
     * var v1 = new Vec2;
     * v.scale(cc.v2(5, 5), v1);  // return Vec2 {x: 50, y: 50};
     */
    scale(vector, out) {
        return Vec2.multiply(out || new Vec2(), this, vector);
    }
    /**
     * !#en Negates the components, and returns the new result.
     * !#zh 返回取反后的新向量。
     * @method neg
     * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
     * @return {Vec2} the result
     * @example
     * var v = cc.v2(10, 10);
     * var v1 = new Vec2;
     * v.neg(v1);  // return Vec2 {x: -10, y: -10};
     */
    neg(out) {
        return Vec2.negate(out || new Vec2(), this);
    }
    /**
     * !#en return a Vec2 object with x = 1 and y = 1.
     * !#zh 新 Vec2 对象。
     * @property ONE
     * @type Vec2
     * @static
     */
    static get ONE() { return new Vec2(1, 1); }
    ;
    /**
     * !#en return a Vec2 object with x = 0 and y = 0.
     * !#zh 返回 x = 0 和 y = 0 的 Vec2 对象。
     * @property {Vec2} ZERO
     * @static
     */
    static get ZERO() { return new Vec2(0, 0); }
    ;
    /**
     * !#en return a Vec2 object with x = 0 and y = 1.
     * !#zh 返回 x = 0 和 y = 1 的 Vec2 对象。
     * @property {Vec2} UP
     * @static
     */
    static get UP() { return new Vec2(0, 1); }
    ;
    /**
     * !#en return a readonly Vec2 object with x = 1 and y = 0.
     * !#zh 返回 x = 1 和 y = 0 的 Vec2 只读对象。
     * @property {Vec2} RIGHT
     * @static
     */
    static get RIGHT() { return new Vec2(1, 0); }
    ;
    /**
     * !#zh 获得指定向量的拷贝
     * @method clone
     * @typescript
     * clone <Out extends IVec2Like> (a: Out): Vec2
     * @static
     */
    static clone(a) {
        return new Vec2(a.x, a.y);
    }
    /**
     * !#zh 复制指定向量的值
     * @method copy
     * @typescript
     * copy <Out extends IVec2Like> (out: Out, a: Out): Out
     * @static
     */
    static copy(out, a) {
        out.x = a.x;
        out.y = a.y;
        return out;
    }
    /**
     * !#zh  设置向量值
     * @method set
     * @typescript
     * set <Out extends IVec2Like> (out: Out, x: number, y: number): Out
     * @static
     */
    static set(out, x, y) {
        out.x = x;
        out.y = y;
        return out;
    }
    /**
     * !#zh 逐元素向量加法
     * @method add
     * @typescript
     * add <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static add(out, a, b) {
        out.x = a.x + b.x;
        out.y = a.y + b.y;
        return out;
    }
    /**
     * !#zh 逐元素向量减法
     * @method subtract
     * @typescript
     * subtract <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static subtract(out, a, b) {
        out.x = a.x - b.x;
        out.y = a.y - b.y;
        return out;
    }
    /**
     * !#zh 逐元素向量乘法
     * @method multiply
     * @typescript
     * multiply <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static multiply(out, a, b) {
        out.x = a.x * b.x;
        out.y = a.y * b.y;
        return out;
    }
    /**
     * !#zh 逐元素向量除法
     * @method divide
     * @typescript
     * divide <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static divide(out, a, b) {
        out.x = a.x / b.x;
        out.y = a.y / b.y;
        return out;
    }
    /**
     * !#zh 逐元素向量向上取整
     * @method ceil
     * @typescript
     * ceil <Out extends IVec2Like> (out: Out, a: Out): Out
     * @static
     */
    static ceil(out, a) {
        out.x = Math.ceil(a.x);
        out.y = Math.ceil(a.y);
        return out;
    }
    /**
     * !#zh 逐元素向量向下取整
     * @method floor
     * @typescript
     * floor <Out extends IVec2Like> (out: Out, a: Out): Out
     * @static
     */
    static floor(out, a) {
        out.x = Math.floor(a.x);
        out.y = Math.floor(a.y);
        return out;
    }
    /**
     * !#zh 逐元素向量最小值
     * @method min
     * @typescript
     * min <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static min(out, a, b) {
        out.x = Math.min(a.x, b.x);
        out.y = Math.min(a.y, b.y);
        return out;
    }
    /**
     * !#zh 逐元素向量最大值
     * @method max
     * @typescript
     * max <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
     * @static
     */
    static max(out, a, b) {
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        return out;
    }
    /**
     * !#zh 逐元素向量四舍五入取整
     * @method round
     * @typescript
     * round <Out extends IVec2Like> (out: Out, a: Out): Out
     * @static
     */
    static round(out, a) {
        out.x = Math.round(a.x);
        out.y = Math.round(a.y);
        return out;
    }
    /**
     * !#zh 向量标量乘法
     * @method multiplyScalar
     * @typescript
     * multiplyScalar <Out extends IVec2Like> (out: Out, a: Out, b: number): Out
     * @static
     */
    static multiplyScalar(out, a, b) {
        out.x = a.x * b;
        out.y = a.y * b;
        return out;
    }
    /**
     * !#zh 逐元素向量乘加: A + B * scale
     * @method scaleAndAdd
     * @typescript
     * scaleAndAdd <Out extends IVec2Like> (out: Out, a: Out, b: Out, scale: number): Out
     * @static
     */
    static scaleAndAdd(out, a, b, scale) {
        out.x = a.x + (b.x * scale);
        out.y = a.y + (b.y * scale);
        return out;
    }
    /**
     * !#zh 求两向量的欧氏距离
     * @method distance
     * @typescript
     * distance <Out extends IVec2Like> (a: Out, b: Out): number
     * @static
     */
    static distance(a, b) {
        _x = b.x - a.x;
        _y = b.y - a.y;
        return Math.sqrt(_x * _x + _y * _y);
    }
    /**
     * !#zh 求两向量的欧氏距离平方
     * @method squaredDistance
     * @typescript
     * squaredDistance <Out extends IVec2Like> (a: Out, b: Out): number
     * @static
     */
    static squaredDistance(a, b) {
        _x = b.x - a.x;
        _y = b.y - a.y;
        return _x * _x + _y * _y;
    }
    /**
     * !#zh 求向量长度
     * @method len
     * @typescript
     * len <Out extends IVec2Like> (a: Out): number
     * @static
     */
    static len(a) {
        _x = a.x;
        _y = a.y;
        return Math.sqrt(_x * _x + _y * _y);
    }
    /**
     * !#zh 求向量长度平方
     * @method lengthSqr
     * @typescript
     * lengthSqr <Out extends IVec2Like> (a: Out): number
     * @static
     */
    static lengthSqr(a) {
        _x = a.x;
        _y = a.y;
        return _x * _x + _y * _y;
    }
    /**
     * !#zh 逐元素向量取负
     * @method negate
     * @typescript
     * negate <Out extends IVec2Like> (out: Out, a: Out): Out
     * @static
     */
    static negate(out, a) {
        out.x = -a.x;
        out.y = -a.y;
        return out;
    }
    /**
     * !#zh 逐元素向量取倒数，接近 0 时返回 Infinity
     * @method inverse
     * @typescript
     * inverse <Out extends IVec2Like> (out: Out, a: Out): Out
     * @static
     */
    static inverse(out, a) {
        out.x = 1.0 / a.x;
        out.y = 1.0 / a.y;
        return out;
    }
    /**
     * !#zh 逐元素向量取倒数，接近 0 时返回 0
     * @method inverseSafe
     * @typescript
     * inverseSafe <Out extends IVec2Like> (out: Out, a: Out): Out
     * @static
     */
    static inverseSafe(out, a) {
        _x = a.x;
        _y = a.y;
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
        return out;
    }
    /**
     * !#zh 归一化向量
     * @method normalize
     * @typescript
     * normalize <Out extends IVec2Like, Vec2Like extends IVec2Like> (out: Out, a: Vec2Like): Out
     * @static
     */
    static normalize(out, a) {
        _x = a.x;
        _y = a.y;
        let len = _x * _x + _y * _y;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out.x = _x * len;
            out.y = _y * len;
        }
        return out;
    }
    /**
     * !#zh 向量点积（数量积）
     * @method dot
     * @typescript
     * dot <Out extends IVec2Like> (a: Out, b: Out): number
     * @static
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    /**
     * !#zh 向量叉积（向量积），注意二维向量的叉积为与 Z 轴平行的三维向量
     * @method cross
     * @typescript
     * cross <Out extends IVec2Like> (out: Vec2, a: Out, b: Out): Vec2
     * @static
     */
    static cross(out, a, b) {
        out.x = out.y = 0;
        out.z = a.x * b.y - a.y * b.x;
        return out;
    }
    /**
     * !#zh 逐元素向量线性插值： A + t * (B - A)
     * @method lerp
     * @typescript
     * lerp <Out extends IVec2Like> (out: Out, a: Out, b: Out, t: number): Out
     * @static
     */
    static lerp(out, a, b, t) {
        _x = a.x;
        _y = a.y;
        out.x = _x + t * (b.x - _x);
        out.y = _y + t * (b.y - _y);
        return out;
    }
    /**
     * !#zh 生成一个在单位圆上均匀分布的随机向量
     * @method random
     * @typescript
     * random <Out extends IVec2Like> (out: Out, scale?: number): Out
     * @static
     */
    static random(out, scale) {
        scale = scale || 1.0;
        const r = (0, utils_1.random)() * 2.0 * Math.PI;
        out.x = Math.cos(r) * scale;
        out.y = Math.sin(r) * scale;
        return out;
    }
    /**
     * !#zh 向量与三维矩阵乘法，默认向量第三位为 1。
     * @method transformMat3
     * @typescript
     * transformMat3 <Out extends IVec2Like, MatLike extends IMat3Like> (out: Out, a: Out, mat: IMat3Like): Out
     * @static
     */
    static transformMat3(out, a, mat) {
        _x = a.x;
        _y = a.y;
        let m = mat.m;
        out.x = m[0] * _x + m[3] * _y + m[6];
        out.y = m[1] * _x + m[4] * _y + m[7];
        return out;
    }
    /**
     * !#zh 向量与四维矩阵乘法，默认向量第三位为 0，第四位为 1。
     * @method transformMat4
     * @typescript
     * transformMat4 <Out extends IVec2Like, MatLike extends IMat4Like> (out: Out, a: Out, mat: MatLike): Out
     * @static
     */
    static transformMat4(out, a, mat) {
        _x = a.x;
        _y = a.y;
        let m = mat.m;
        out.x = m[0] * _x + m[4] * _y + m[12];
        out.y = m[1] * _x + m[5] * _y + m[13];
        return out;
    }
    /**
     * !#zh 向量等价判断
     * @method strictEquals
     * @typescript
     * strictEquals <Out extends IVec2Like> (a: Out, b: Out): boolean
     * @static
     */
    static strictEquals(a, b) {
        return a.x === b.x && a.y === b.y;
    }
    /**
     * !#zh 排除浮点数误差的向量近似等价判断
     * @method equals
     * @typescript
     * equals <Out extends IVec2Like> (a: Out, b: Out,  epsilon?: number): boolean
     * @static
     */
    static equals(a, b, epsilon = utils_1.EPSILON) {
        return (Math.abs(a.x - b.x) <=
            epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) &&
            Math.abs(a.y - b.y) <=
                epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y)));
    }
    /**
     * !#zh 排除浮点数误差的向量近似等价判断
     * @method angle
     * @typescript
     * angle <Out extends IVec2Like> (a: Out, b: Out): number
     * @static
     */
    static angle(a, b) {
        Vec2.normalize(v2_1, a);
        Vec2.normalize(v2_2, b);
        const cosine = Vec2.dot(v2_1, v2_2);
        if (cosine > 1.0) {
            return 0;
        }
        if (cosine < -1.0) {
            return Math.PI;
        }
        return Math.acos(cosine);
    }
    /**
     * !#zh 向量转数组
     * @method toArray
     * @typescript
     * toArray <Out extends IWritableArrayLike<number>> (out: Out, v: IVec2Like, ofs?: number): Out
     * @static
     */
    static toArray(out, v, ofs = 0) {
        out[ofs + 0] = v.x;
        out[ofs + 1] = v.y;
        return out;
    }
    /**
     * !#zh 数组转向量
     * @method fromArray
     * @typescript
     * fromArray <Out extends IVec2Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
     * @static
     */
    static fromArray(out, arr, ofs = 0) {
        out.x = arr[ofs + 0];
        out.y = arr[ofs + 1];
        return out;
    }
    /**
     * !#en
     * Constructor
     * see {{#crossLink "cc/vec2:method"}}cc.v2{{/crossLink}} or {{#crossLink "cc/p:method"}}cc.p{{/crossLink}}
     * !#zh
     * 构造函数，可查看 {{#crossLink "cc/vec2:method"}}cc.v2{{/crossLink}} 或者 {{#crossLink "cc/p:method"}}cc.p{{/crossLink}}
     * @method constructor
     * @param {Number} [x=0]
     * @param {Number} [y=0]
     */
    constructor(x = 0, y = 0) {
        super();
        /**
         * !#en Returns the length of this vector.
         * !#zh 返回该向量的长度。
         * @method mag
         * @return {number} the result
         * @example
         * var v = cc.v2(10, 10);
         * v.mag(); // return 14.142135623730951;
         */
        this.mag = Vec2.prototype.len;
        /**
         * !#en Returns the squared length of this vector.
         * !#zh 返回该向量的长度平方。
         * @method magSqr
         * @return {number} the result
         * @example
         * var v = cc.v2(10, 10);
         * v.magSqr(); // return 200;
         */
        this.magSqr = Vec2.prototype.lengthSqr;
        /**
         * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
         * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
         * @method subSelf
         * @param {Vec2} vector
         * @return {Vec2} returns this
         * @chainable
         * @example
         * var v = cc.v2(10, 10);
         * v.subSelf(cc.v2(5, 5));// return Vec2 {x: 5, y: 5};
         */
        this.subSelf = Vec2.prototype.subtract;
        /**
         * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
         * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
         * @method mulSelf
         * @param {number} num
         * @return {Vec2} returns this
         * @chainable
         * @example
         * var v = cc.v2(10, 10);
         * v.mulSelf(5);// return Vec2 {x: 50, y: 50};
         */
        this.mulSelf = Vec2.prototype.multiplyScalar;
        /**
         * !#en Divides by a number. If you want to save result to another vector, use div() instead.
         * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
         * @method divSelf
         * @param {number} num
         * @return {Vec2} returns this
         * @chainable
         * @example
         * var v = cc.v2(10, 10);
         * v.divSelf(5); // return Vec2 {x: 2, y: 2};
         */
        this.divSelf = Vec2.prototype.divide;
        /**
         * !#en Multiplies two vectors.
         * !#zh 分量相乘。
         * @method scaleSelf
         * @param {Vec2} vector
         * @return {Vec2} returns this
         * @chainable
         * @example
         * var v = cc.v2(10, 10);
         * v.scaleSelf(cc.v2(5, 5));// return Vec2 {x: 50, y: 50};
         */
        this.scaleSelf = Vec2.prototype.multiply;
        /**
         * !#en Negates the components. If you want to save result to another vector, use neg() instead.
         * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
         * @method negSelf
         * @return {Vec2} returns this
         * @chainable
         * @example
         * var v = cc.v2(10, 10);
         * v.negSelf(); // return Vec2 {x: -10, y: -10};
         */
        this.negSelf = Vec2.prototype.negate;
        // compatible with vec3
        this.z = 0;
        if (x && typeof x === 'object') {
            this.x = x.x || 0;
            this.y = x.y || 0;
        }
        else {
            this.x = x || 0;
            this.y = y || 0;
        }
    }
    /**
     * !#en clone a Vec2 object
     * !#zh 克隆一个 Vec2 对象
     * @method clone
     * @return {Vec2}
     */
    clone() {
        return new Vec2(this.x, this.y);
    }
    /**
     * !#en Sets vector with another's value
     * !#zh 设置向量值。
     * @method set
     * @param {Vec2} newValue - !#en new value to set. !#zh 要设置的新值
     * @return {Vec2} returns this
     * @chainable
     */
    set(newValue) {
        this.x = newValue.x;
        this.y = newValue.y;
        return this;
    }
    /**
     * !#en Check whether two vector equal
     * !#zh 当前的向量是否与指定的向量相等。
     * @method equals
     * @param {Vec2} other
     * @return {Boolean}
     */
    equals(other) {
        return other && this.x === other.x && this.y === other.y;
    }
    /**
     * !#en Check whether two vector equal with some degree of variance.
     * !#zh
     * 近似判断两个点是否相等。<br/>
     * 判断 2 个向量是否在指定数值的范围之内，如果在则返回 true，反之则返回 false。
     * @method fuzzyEquals
     * @param {Vec2} other
     * @param {Number} variance
     * @return {Boolean}
     */
    fuzzyEquals(other, variance) {
        if (this.x - variance <= other.x && other.x <= this.x + variance) {
            if (this.y - variance <= other.y && other.y <= this.y + variance)
                return true;
        }
        return false;
    }
    /**
     * !#en Transform to string with vector informations
     * !#zh 转换为方便阅读的字符串。
     * @method toString
     * @return {string}
     */
    toString() {
        return "(" +
            this.x.toFixed(2) + ", " +
            this.y.toFixed(2) + ")";
    }
    /**
     * !#en Calculate linear interpolation result between this vector and another one with given ratio
     * !#zh 线性插值。
     * @method lerp
     * @param {Vec2} to
     * @param {Number} ratio - the interpolation coefficient
     * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
     * @return {Vec2}
     */
    lerp(to, ratio, out) {
        out = out || new Vec2();
        var x = this.x;
        var y = this.y;
        out.x = x + (to.x - x) * ratio;
        out.y = y + (to.y - y) * ratio;
        return out;
    }
    /**
     * !#en Clamp the vector between from float and to float.
     * !#zh
     * 返回指定限制区域后的向量。<br/>
     * 向量大于 max_inclusive 则返回 max_inclusive。<br/>
     * 向量小于 min_inclusive 则返回 min_inclusive。<br/>
     * 否则返回自身。
     * @method clampf
     * @param {Vec2} min_inclusive
     * @param {Vec2} max_inclusive
     * @return {Vec2}
     * @example
     * var min_inclusive = cc.v2(0, 0);
     * var max_inclusive = cc.v2(20, 20);
     * var v1 = cc.v2(20, 20).clampf(min_inclusive, max_inclusive); // Vec2 {x: 20, y: 20};
     * var v2 = cc.v2(0, 0).clampf(min_inclusive, max_inclusive);   // Vec2 {x: 0, y: 0};
     * var v3 = cc.v2(10, 10).clampf(min_inclusive, max_inclusive); // Vec2 {x: 10, y: 10};
     */
    clampf(min_inclusive, max_inclusive) {
        this.x = misc_1.default.clampf(this.x, min_inclusive.x, max_inclusive.x);
        this.y = misc_1.default.clampf(this.y, min_inclusive.y, max_inclusive.y);
        return this;
    }
    /**
     * !#en Adds this vector.
     * !#zh 向量加法。
     * @method add
     * @param {Vec2} vector
     * @param {Vec2} [out]
     * @return {Vec2} returns this
     * @chainable
     * @example
     * var v = cc.v2(10, 10);
     * v.add(cc.v2(5, 5));// return Vec2 {x: 15, y: 15};
     */
    add(vector, out) {
        out = out || new Vec2();
        out.x = this.x + vector.x;
        out.y = this.y + vector.y;
        return out;
    }
    /**
     * !#en Adds this vector. If you want to save result to another vector, use add() instead.
     * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
     * @method addSelf
     * @param {Vec2} vector
     * @return {Vec2} returns this
     * @chainable
     */
    addSelf(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    /**
     * !#en Subtracts one vector from this.
     * !#zh 向量减法。
     * @method subtract
     * @param {Vec2} vector
     * @return {Vec2} returns this
     * @chainable
     * @example
     * var v = cc.v2(10, 10);
     * v.subSelf(cc.v2(5, 5));// return Vec2 {x: 5, y: 5};
     */
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    /**
     * !#en Multiplies this by a number.
     * !#zh 缩放当前向量。
     * @method multiplyScalar
     * @param {number} num
     * @return {Vec2} returns this
     * @chainable
     * @example
     * var v = cc.v2(10, 10);
     * v.multiply(5);// return Vec2 {x: 50, y: 50};
     */
    multiplyScalar(num) {
        this.x *= num;
        this.y *= num;
        return this;
    }
    /**
     * !#en Multiplies two vectors.
     * !#zh 分量相乘。
     * @method multiply
     * @param {Vec2} vector
     * @return {Vec2} returns this
     * @chainable
     * @example
     * var v = cc.v2(10, 10);
     * v.multiply(cc.v2(5, 5));// return Vec2 {x: 50, y: 50};
     */
    multiply(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    }
    /**
     * !#en Divides by a number.
     * !#zh 向量除法。
     * @method divide
     * @param {number} num
     * @return {Vec2} returns this
     * @chainable
     * @example
     * var v = cc.v2(10, 10);
     * v.divide(5); // return Vec2 {x: 2, y: 2};
     */
    divide(num) {
        this.x /= num;
        this.y /= num;
        return this;
    }
    /**
     * !#en Negates the components.
     * !#zh 向量取反。
     * @method negate
     * @return {Vec2} returns this
     * @chainable
     * @example
     * var v = cc.v2(10, 10);
     * v.negate(); // return Vec2 {x: -10, y: -10};
     */
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    /**
     * !#en Dot product
     * !#zh 当前向量与指定向量进行点乘。
     * @method dot
     * @param {Vec2} [vector]
     * @return {number} the result
     * @example
     * var v = cc.v2(10, 10);
     * v.dot(cc.v2(5, 5)); // return 100;
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    /**
     * !#en Cross product
     * !#zh 当前向量与指定向量进行叉乘。
     * @method cross
     * @param {Vec2} [vector]
     * @return {number} the result
     * @example
     * var v = cc.v2(10, 10);
     * v.cross(cc.v2(5, 5)); // return 0;
     */
    cross(vector) {
        return this.x * vector.y - this.y * vector.x;
    }
    /**
     * !#en Returns the length of this vector.
     * !#zh 返回该向量的长度。
     * @method len
     * @return {number} the result
     * @example
     * var v = cc.v2(10, 10);
     * v.len(); // return 14.142135623730951;
     */
    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * !#en Returns the squared length of this vector.
     * !#zh 返回该向量的长度平方。
     * @method lengthSqr
     * @return {number} the result
     * @example
     * var v = cc.v2(10, 10);
     * v.lengthSqr(); // return 200;
     */
    lengthSqr() {
        return this.x * this.x + this.y * this.y;
    }
    /**
     * !#en Make the length of this vector to 1.
     * !#zh 向量归一化，让这个向量的长度为 1。
     * @method normalizeSelf
     * @return {Vec2} returns this
     * @chainable
     * @example
     * var v = cc.v2(10, 10);
     * v.normalizeSelf(); // return Vec2 {x: 0.7071067811865475, y: 0.7071067811865475};
     */
    normalizeSelf() {
        var magSqr = this.x * this.x + this.y * this.y;
        if (magSqr === 1.0)
            return this;
        if (magSqr === 0.0) {
            return this;
        }
        var invsqrt = 1.0 / Math.sqrt(magSqr);
        this.x *= invsqrt;
        this.y *= invsqrt;
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
     * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
     * @return {Vec2} result
     * var v = cc.v2(10, 10);
     * v.normalize();   // return Vec2 {x: 0.7071067811865475, y: 0.7071067811865475};
     */
    normalize(out) {
        out = out || new Vec2();
        out.x = this.x;
        out.y = this.y;
        out.normalizeSelf();
        return out;
    }
    /**
     * !#en Get angle in radian between this and vector.
     * !#zh 夹角的弧度。
     * @method angle
     * @param {Vec2} vector
     * @return {number} from 0 to Math.PI
     */
    angle(vector) {
        var magSqr1 = this.magSqr();
        var magSqr2 = vector.magSqr();
        if (magSqr1 === 0 || magSqr2 === 0) {
            console.warn("Can't get angle between zero vector");
            return 0.0;
        }
        var dot = this.dot(vector);
        var theta = dot / (Math.sqrt(magSqr1 * magSqr2));
        theta = misc_1.default.clampf(theta, -1.0, 1.0);
        return Math.acos(theta);
    }
    /**
     * !#en Get angle in radian between this and vector with direction.
     * !#zh 带方向的夹角的弧度。
     * @method signAngle
     * @param {Vec2} vector
     * @return {number} from -MathPI to Math.PI
     */
    signAngle(vector) {
        let angle = this.angle(vector);
        return this.cross(vector) < 0 ? -angle : angle;
    }
    /**
     * !#en rotate
     * !#zh 返回旋转给定弧度后的新向量。
     * @method rotate
     * @param {number} radians
     * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
     * @return {Vec2} the result
     */
    rotate(radians, out) {
        out = out || new Vec2();
        out.x = this.x;
        out.y = this.y;
        return out.rotateSelf(radians);
    }
    /**
     * !#en rotate self
     * !#zh 按指定弧度旋转向量。
     * @method rotateSelf
     * @param {number} radians
     * @return {Vec2} returns this
     * @chainable
     */
    rotateSelf(radians) {
        var sin = Math.sin(radians);
        var cos = Math.cos(radians);
        var x = this.x;
        this.x = cos * x - sin * this.y;
        this.y = sin * x + cos * this.y;
        return this;
    }
    /**
     * !#en Calculates the projection of the current vector over the given vector.
     * !#zh 返回当前向量在指定 vector 向量上的投影向量。
     * @method project
     * @param {Vec2} vector
     * @return {Vec2}
     * @example
     * var v1 = cc.v2(20, 20);
     * var v2 = cc.v2(5, 5);
     * v1.project(v2); // Vec2 {x: 20, y: 20};
     */
    project(vector) {
        return vector.multiplyScalar(this.dot(vector) / vector.dot(vector));
    }
    /**
     * Transforms the vec2 with a mat4. 3rd vector component is implicitly '0', 4th vector component is implicitly '1'
     * @method transformMat4
     * @param {Mat4} m matrix to transform with
     * @param {Vec2} [out] the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
     * @returns {Vec2} out
     */
    transformMat4(m, out) {
        out = out || new Vec2();
        Vec2.transformMat4(out, this, m);
        return out;
    }
    /**
     * Returns the maximum value in x, y.
     * @method maxAxis
     * @returns {number}
     */
    maxAxis() {
        return Math.max(this.x, this.y);
    }
}
// deprecated
Vec2.sub = Vec2.subtract;
Vec2.mul = Vec2.multiply;
Vec2.scale = Vec2.multiplyScalar;
Vec2.mag = Vec2.len;
Vec2.squaredMagnitude = Vec2.lengthSqr;
Vec2.div = Vec2.divide;
Vec2.ONE_R = Vec2.ONE;
/**
 * !#en return a readonly Vec2 object with x = 0 and y = 0.
 * !#zh 返回一个 x = 0 和 y = 0 的 Vec2 只读对象。
 * @property {Vec2} ZERO_R
 * @readonly
 * @static
 */
Vec2.ZERO_R = Vec2.ZERO;
/**
 * !#en return a readonly Vec2 object with x = 0 and y = 1.
 * !#zh 返回 x = 0 和 y = 1 的 Vec2 只读对象。
 * @property {Vec2} UP_R
 * @static
 * @readonly
 */
Vec2.UP_R = Vec2.UP;
/**
 * !#en return a Vec2 object with x = 1 and y = 0.
 * !#zh 返回 x = 1 和 y = 0 的 Vec2 对象。
 * @property {Vec2} RIGHT_R
 * @static
 * @readonly
 */
Vec2.RIGHT_R = Vec2.RIGHT;
exports.default = Vec2;
const v2_1 = new Vec2();
const v2_2 = new Vec2();
CCClass_1.default.fastDefine('cc.Vec2', Vec2, { x: 0, y: 0 });
/**
 * @module cc
 */
/**
 * !#en The convenience method to create a new {{#crossLink "Vec2"}}cc.Vec2{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Vec2"}}cc.Vec2{{/crossLink}} 对象。
 * @method v2
 * @param {Number|Object} [x=0]
 * @param {Number} [y=0]
 * @return {Vec2}
 * @example
 * var v1 = cc.v2();
 * var v2 = cc.v2(0, 0);
 * var v3 = cc.v2(v2);
 * var v4 = cc.v2({x: 100, y: 100});
 */
cc.v2 = function v2(x, y) {
    return new Vec2(x, y);
};
cc.Vec2 = Vec2;
