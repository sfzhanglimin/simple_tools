"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quat_1 = __importDefault(require("./quat"));
let tmp_quat = new quat_1.default();
class Trs {
    static toRotation(out, a) {
        out.x = a[3];
        out.y = a[4];
        out.z = a[5];
        out.w = a[6];
        return out;
    }
    static fromRotation(out, a) {
        out[3] = a.x;
        out[4] = a.y;
        out[5] = a.z;
        out[6] = a.w;
        return out;
    }
    static toEuler(out, a) {
        Trs.toRotation(tmp_quat, a);
        quat_1.default.toEuler(out, tmp_quat);
        return out;
    }
    static fromEuler(out, a) {
        quat_1.default.fromEuler(tmp_quat, a.x, a.y, a.z);
        Trs.fromRotation(out, tmp_quat);
        return out;
    }
    static fromEulerNumber(out, x, y, z) {
        quat_1.default.fromEuler(tmp_quat, x, y, z);
        Trs.fromRotation(out, tmp_quat);
        return out;
    }
    static toScale(out, a) {
        out.x = a[7];
        out.y = a[8];
        out.z = a[9];
        return out;
    }
    static fromScale(out, a) {
        out[7] = a.x;
        out[8] = a.y;
        out[9] = a.z;
        return out;
    }
    static toPosition(out, a) {
        out.x = a[0];
        out.y = a[1];
        out.z = a[2];
        return out;
    }
    static fromPosition(out, a) {
        out[0] = a.x;
        out[1] = a.y;
        out[2] = a.z;
        return out;
    }
    static fromAngleZ(out, a) {
        quat_1.default.fromAngleZ(tmp_quat, a);
        Trs.fromRotation(out, tmp_quat);
        return out;
    }
    static toMat4(out, trs) {
        let x = trs[3], y = trs[4], z = trs[5], w = trs[6];
        let x2 = x + x;
        let y2 = y + y;
        let z2 = z + z;
        let xx = x * x2;
        let xy = x * y2;
        let xz = x * z2;
        let yy = y * y2;
        let yz = y * z2;
        let zz = z * z2;
        let wx = w * x2;
        let wy = w * y2;
        let wz = w * z2;
        let sx = trs[7];
        let sy = trs[8];
        let sz = trs[9];
        let m = out.m;
        m[0] = (1 - (yy + zz)) * sx;
        m[1] = (xy + wz) * sx;
        m[2] = (xz - wy) * sx;
        m[3] = 0;
        m[4] = (xy - wz) * sy;
        m[5] = (1 - (xx + zz)) * sy;
        m[6] = (yz + wx) * sy;
        m[7] = 0;
        m[8] = (xz + wy) * sz;
        m[9] = (yz - wx) * sz;
        m[10] = (1 - (xx + yy)) * sz;
        m[11] = 0;
        m[12] = trs[0];
        m[13] = trs[1];
        m[14] = trs[2];
        m[15] = 1;
        return out;
    }
}
exports.default = Trs;
cc.Trs = Trs;
