"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_variant_1 = __importDefault(require("../assets/material/material-variant"));
const Material = require('../assets/material/CCMaterial');
/**
 * An internal helper class for switching render component's material between normal sprite material and gray sprite material.
 * @class GraySpriteState
 */
let GraySpriteState = cc.Class({
    properties: {
        _normalMaterial: null,
        /**
         * !#en The normal material.
         * !#zh 正常状态的材质。
         * @property normalMaterial
         * @type {Material}
         * @default null
         */
        normalMaterial: {
            get() {
                return this._normalMaterial;
            },
            set(val) {
                this._normalMaterial = val;
                this._updateDisabledState && this._updateDisabledState();
            },
            type: Material,
            tooltip: CC_DEV && 'i18n:COMPONENT.button.normal_material',
            animatable: false
        },
        _grayMaterial: null,
        /**
         * !#en The gray material.
         * !#zh 置灰状态的材质。
         * @property grayMaterial
         * @type {Material}
         * @default null
         */
        grayMaterial: {
            get() {
                return this._grayMaterial;
            },
            set(val) {
                this._grayMaterial = val;
                this._updateDisabledState && this._updateDisabledState();
            },
            type: Material,
            tooltip: CC_DEV && 'i18n:COMPONENT.button.gray_material',
            animatable: false
        }
    },
    _switchGrayMaterial(useGrayMaterial, renderComp) {
        let material;
        if (useGrayMaterial) {
            material = this._grayMaterial;
            if (!material) {
                material = Material.getBuiltinMaterial('2d-gray-sprite');
            }
            material = this._grayMaterial = material_variant_1.default.create(material, renderComp);
        }
        else {
            material = this._normalMaterial;
            if (!material) {
                material = Material.getBuiltinMaterial('2d-sprite', renderComp);
            }
            material = this._normalMaterial = material_variant_1.default.create(material, renderComp);
        }
        renderComp.setMaterial(0, material);
    }
});
module.exports = GraySpriteState;
