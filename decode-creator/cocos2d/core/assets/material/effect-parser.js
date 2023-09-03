"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEffect = void 0;
const pass_1 = __importDefault(require("../../../renderer/core/pass"));
const types_1 = require("../../../renderer/types");
const enums_1 = __importDefault(require("../../../renderer/enums"));
const effect_1 = __importDefault(require("./effect"));
const technique_1 = __importDefault(require("../../../renderer/core/technique"));
function getInvolvedProgram(programName) {
    let lib = cc.renderer._forward?._programLib;
    return lib?.getTemplate(programName);
}
// extract properties from each passes and check whether properties is defined but not used.
function parseProperties(effectAsset, passJson) {
    let propertiesJson = passJson.properties || {};
    let program = getInvolvedProgram(passJson.program);
    // check whether properties are defined in the shaders 
    for (let prop in propertiesJson) {
        let uniformInfo = program.uniforms.find(u => u.name === prop);
        // the property is not defined in all the shaders used in techs
        if (!uniformInfo) {
            cc.warnID(9107, effectAsset.name, prop);
            continue;
        }
    }
    // create properties
    let properties = {};
    program.uniforms.forEach(u => {
        let name = u.name, prop = properties[name] = Object.assign({}, u), propInfo = propertiesJson[name];
        let value;
        if (propInfo) {
            if (propInfo.type === enums_1.default.PARAM_TEXTURE_2D) {
                value = null;
            }
            else if (propInfo.type === enums_1.default.PARAM_INT || propInfo.type === enums_1.default.PARAM_FLOAT) {
                value = Array.isArray(propInfo.value) ? propInfo.value[0] : propInfo.value;
            }
            else {
                value = new Float32Array(propInfo.value);
            }
        }
        else {
            value = types_1.enums2default[u.type];
        }
        if (value === undefined) {
            value = null;
        }
        prop.value = value;
    });
    return properties;
}
;
function passDefines(pass) {
    let defines = {};
    let program = getInvolvedProgram(pass.program);
    program.defines.forEach(d => {
        defines[d.name] = types_1.enums2default[d.type];
    });
    return defines;
}
function parseTechniques(effectAsset) {
    let techNum = effectAsset.techniques.length;
    let techniques = new Array(techNum);
    for (let j = 0; j < techNum; ++j) {
        let tech = effectAsset.techniques[j];
        let techName = tech.name || j;
        let passNum = tech.passes.length;
        let passes = new Array(passNum);
        for (let k = 0; k < passNum; ++k) {
            let pass = tech.passes[k];
            let passName = pass.name || k;
            let detailName = `${effectAsset.name}-${techName}-${passName}`;
            let stage = pass.stage || 'opaque';
            let properties = parseProperties(effectAsset, pass);
            let defines = passDefines(pass);
            let newPass = passes[k] = new pass_1.default(passName, detailName, pass.program, stage, properties, defines);
            // rasterizer state
            if (pass.rasterizerState) {
                newPass.setCullMode(pass.rasterizerState.cullMode);
            }
            // blend state
            let blendState = pass.blendState && pass.blendState.targets[0];
            if (blendState) {
                newPass.setBlend(blendState.blend, blendState.blendEq, blendState.blendSrc, blendState.blendDst, blendState.blendAlphaEq, blendState.blendSrcAlpha, blendState.blendDstAlpha, blendState.blendColor);
            }
            // depth stencil state
            let depthStencilState = pass.depthStencilState;
            if (depthStencilState) {
                newPass.setDepth(depthStencilState.depthTest, depthStencilState.depthWrite, depthStencilState.depthFunc);
                newPass.setStencilFront(depthStencilState.stencilTest, depthStencilState.stencilFuncFront, depthStencilState.stencilRefFront, depthStencilState.stencilMaskFront, depthStencilState.stencilFailOpFront, depthStencilState.stencilZFailOpFront, depthStencilState.stencilZPassOpFront, depthStencilState.stencilWriteMaskFront);
                newPass.setStencilBack(depthStencilState.stencilTest, depthStencilState.stencilFuncBack, depthStencilState.stencilRefBack, depthStencilState.stencilMaskBack, depthStencilState.stencilFailOpBack, depthStencilState.stencilZFailOpBack, depthStencilState.stencilZPassOpBack, depthStencilState.stencilWriteMaskBack);
            }
        }
        techniques[j] = new technique_1.default(techName, passes);
    }
    return techniques;
}
;
function parseEffect(effect) {
    let techniques = parseTechniques(effect);
    return new effect_1.default(effect.name, techniques, 0, effect);
}
exports.parseEffect = parseEffect;
;
if (CC_EDITOR) {
    // inspector only need properties defined in CCEffect
    effect_1.default.parseForInspector = function (effectAsset) {
        return effectAsset.techniques.map((tech, techIdx) => {
            let passes = tech.passes.map((pass, passIdx) => {
                let program = getInvolvedProgram(pass.program);
                let newProps = {};
                let props = pass.properties;
                for (let name in props) {
                    newProps[name] = (0, types_1.getInspectorProps)(props[name]);
                    let u = program.uniforms.find(u => u.name === name);
                    newProps[name].defines = u.defines || [];
                }
                let newDefines = {};
                program.defines.map(def => {
                    newDefines[def.name] = (0, types_1.getInspectorProps)(def);
                });
                return {
                    name: pass.name || passIdx,
                    props: newProps,
                    defines: newDefines,
                };
            });
            return {
                name: tech.name || techIdx,
                passes: passes,
            };
        });
    };
}
