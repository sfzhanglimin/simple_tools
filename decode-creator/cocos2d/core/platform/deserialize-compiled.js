"use strict";
/****************************************************************************
 Copyright (c) present Xiamen Yaji Software Co., Ltd.

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
exports.getDependUuidList = exports.hasNativeDep = exports.packCustomObjData = exports.unpackJSONs = void 0;
const js_1 = __importDefault(require("./js"));
const vec2_1 = __importDefault(require("../value-types/vec2"));
const vec3_1 = __importDefault(require("../value-types/vec3"));
const vec4_1 = __importDefault(require("../value-types/vec4"));
const color_1 = __importDefault(require("../value-types/color"));
const size_1 = __importDefault(require("../value-types/size"));
const rect_1 = __importDefault(require("../value-types/rect"));
const quat_1 = __importDefault(require("../value-types/quat"));
const mat4_1 = __importDefault(require("../value-types/mat4"));
// import Attr from './attribute';
/****************************************************************************
 * BUILT-IN TYPES / CONSTAINTS
 ****************************************************************************/
const SUPPORT_MIN_FORMAT_VERSION = 1;
const EMPTY_PLACEHOLDER = 0;
// Used for Data.ValueType.
// If a value type is not registered in this list, it will be serialized to Data.Class.
const BuiltinValueTypes = [
    vec2_1.default,
    vec3_1.default,
    vec4_1.default,
    quat_1.default,
    color_1.default,
    size_1.default,
    rect_1.default,
    mat4_1.default, // 7
];
// Used for Data.ValueTypeCreated.
function BuiltinValueTypeParsers_xyzw(obj, data) {
    obj.x = data[1];
    obj.y = data[2];
    obj.z = data[3];
    obj.w = data[4];
}
const BuiltinValueTypeSetters = [
    function (obj, data) {
        if (!obj) return;
        obj.x = data[1];
        obj.y = data[2];
    },
    function (obj, data) {
        if (!obj) return;
        obj.x = data[1];
        obj.y = data[2];
        obj.z = data[3];
    },
    BuiltinValueTypeParsers_xyzw,
    BuiltinValueTypeParsers_xyzw,
    function (obj, data) {
        if (!obj) return;
        obj._val = data[1];
    },
    function (obj, data) {
        if (!obj) return;
        obj.width = data[1];
        obj.height = data[2];
    },
    function (obj, data) {
        if (!obj) return;
        obj.x = data[1];
        obj.y = data[2];
        obj.width = data[3];
        obj.height = data[4];
    },
    function (obj, data) {
        if (!obj) return;
        mat4_1.default.fromArray(obj, data, 1);
    }
];
function serializeBuiltinValueTypes(obj) {
    let ctor = obj.constructor;
    let typeId = BuiltinValueTypes.indexOf(ctor);
    switch (ctor) {
        case vec2_1.default:
            // @ts-ignore
            return [typeId, obj.x, obj.y];
        case vec3_1.default:
            // @ts-ignore
            return [typeId, obj.x, obj.y, obj.z];
        case vec4_1.default:
        case quat_1.default:
            // @ts-ignore
            return [typeId, obj.x, obj.y, obj.z, obj.w];
        case color_1.default:
            // @ts-ignore
            return [typeId, obj._val];
        case size_1.default:
            // @ts-ignore
            return [typeId, obj.width, obj.height];
        case rect_1.default:
            // @ts-ignore
            return [typeId, obj.x, obj.y, obj.width, obj.height];
        case mat4_1.default:
            // @ts-ignore
            let res = new Array(1 + 16);
            res[VALUETYPE_SETTER] = typeId;
            mat4_1.default.toArray(res, obj, 1);
            return res;
        default:
            return null;
    }
}
/**
 * If the value type is different, different Classes will be generated
 */
const CLASS_TYPE = 0;
const CLASS_KEYS = 1;
const CLASS_PROP_TYPE_OFFSET = 2;
/**
 * Mask is used to define the properties and types that need to be deserialized.
 * Instances of the same class may have different Masks due to different default properties removed.
 */
const MASK_CLASS = 0;
const OBJ_DATA_MASK = 0;
const CUSTOM_OBJ_DATA_CLASS = 0;
const CUSTOM_OBJ_DATA_CONTENT = 1;
const VALUETYPE_SETTER = 0;
const DICT_JSON_LAYOUT = 0;
const ARRAY_ITEM_VALUES = 0;
const PACKED_SECTIONS = 5 /* File.Instances */;
/****************************************************************************
 * IMPLEMENTS
 ****************************************************************************/
/**
 * !#en Contains meta information collected during deserialization
 * !#zh 包含反序列化后附带的元信息
 * @class Details
 */
class Details {
    constructor() {
        /**
         * the obj list whose field needs to load asset by uuid
         * @property {Object[]} uuidObjList
         */
        this.uuidObjList = null;
        /**
         * the corresponding field name which referenced to the asset
         * @property {(String|Number)[]} uuidPropList
         */
        this.uuidPropList = null;
        /**
         * list of the depends assets' uuid
         * @property {String[]} uuidList
         */
        this.uuidList = null;
    }
    /**
     * @method init
     * @param {Object} data
     */
    init(data) {
        this.uuidObjList = data[8 /* File.DependObjs */];
        this.uuidPropList = data[9 /* File.DependKeys */];
        this.uuidList = data[10 /* File.DependUuidIndices */];
    }
    /**
     * @method reset
     */
    reset() {
        this.uuidList = null;
        this.uuidObjList = null;
        this.uuidPropList = null;
    }
    ;
    /**
     * @method push
     * @param {Object} obj
     * @param {String} propName
     * @param {String} uuid
     */
    push(obj, propName, uuid) {
        this.uuidObjList.push(obj);
        this.uuidPropList.push(propName);
        this.uuidList.push(uuid);
    }
    ;
}
Details.pool = new js_1.default.Pool(function (obj) {
    obj.reset();
}, 5);
Details.pool.get = function () {
    return this._get() || new Details();
};
if (CC_EDITOR || CC_TEST) {
    // @ts-ignore
    Details.prototype.assignAssetsBy = function (getter) {
        for (var i = 0, len = this.uuidList.length; i < len; i++) {
            var obj = this.uuidObjList[i];
            var prop = this.uuidPropList[i];
            var uuid = this.uuidList[i];
            obj[prop] = getter(uuid);
        }
    };
}
function dereference(refs, instances, strings) {
    let dataLength = refs.length - 1;
    let i = 0;
    // owner is object
    let instanceOffset = refs[dataLength] * 3 /* Refs.EACH_RECORD_LENGTH */;
    for (; i < instanceOffset; i += 3 /* Refs.EACH_RECORD_LENGTH */) {
        const owner = refs[i];
        const target = instances[refs[i + 2 /* Refs.TARGET_OFFSET */]];
        const keyIndex = refs[i + 1 /* Refs.KEY_OFFSET */];
        if (keyIndex >= 0) {
            owner[strings[keyIndex]] = target;
        }
        else {
            owner[~keyIndex] = target;
        }
    }
    // owner is instance index
    for (; i < dataLength; i += 3 /* Refs.EACH_RECORD_LENGTH */) {
        const owner = instances[refs[i]];
        const target = instances[refs[i + 2 /* Refs.TARGET_OFFSET */]];
        const keyIndex = refs[i + 1 /* Refs.KEY_OFFSET */];
        if (keyIndex >= 0) {
            owner[strings[keyIndex]] = target;
        }
        else {
            owner[~keyIndex] = target;
        }
    }
}
//
function deserializeCCObject(data, objectData) {
    let mask = data[4 /* File.SharedMasks */][objectData[OBJ_DATA_MASK]];
    let clazz = mask[MASK_CLASS];
    let ctor = clazz[CLASS_TYPE];
    // if (!ctor) {
    //     return null;
    // }
    let obj = new ctor();
    let keys = clazz[CLASS_KEYS];
    let classTypeOffset = clazz[CLASS_PROP_TYPE_OFFSET];
    let maskTypeOffset = mask[mask.length - 1];
    // parse simple type
    let i = MASK_CLASS + 1;
    for (; i < maskTypeOffset; ++i) {
        let key = keys[mask[i]];
        obj[key] = objectData[i];
    }
    // parse advanced type
    for (; i < objectData.length; ++i) {
        let key = keys[mask[i]];
        let type = clazz[mask[i] + classTypeOffset];
        let op = ASSIGNMENTS[type];
        op(data, obj, key, objectData[i]);
    }
    return obj;
}
function deserializeCustomCCObject(data, ctor, value) {
    let obj = new ctor();
    if (obj._deserialize) {
        obj._deserialize(value, data[0 /* File.Context */]);
    }
    else {
        cc.errorID(5303, js_1.default.getClassName(ctor));
    }
    return obj;
}
function assignSimple(data, owner, key, value) {
    owner[key] = value;
}
function assignInstanceRef(data, owner, key, value) {
    if (value >= 0) {
        owner[key] = data[5 /* File.Instances */][value];
    }
    else {
        data[7 /* File.Refs */][(~value) * 3 /* Refs.EACH_RECORD_LENGTH */] = owner;
    }
}
function genArrayParser(parser) {
    return function (data, owner, key, value) {
        owner[key] = value;
        for (let i = 0; i < value.length; ++i) {
            // @ts-ignore
            parser(data, value, i, value[i]);
        }
    };
}
function parseAssetRefByInnerObj(data, owner, key, value) {
    owner[key] = null;
    data[8 /* File.DependObjs */][value] = owner;
}
function parseClass(data, owner, key, value) {
    owner[key] = deserializeCCObject(data, value);
}
function parseCustomClass(data, owner, key, value) {
    let ctor = data[3 /* File.SharedClasses */][value[CUSTOM_OBJ_DATA_CLASS]];
    owner[key] = deserializeCustomCCObject(data, ctor, value[CUSTOM_OBJ_DATA_CONTENT]);
}
function parseValueTypeCreated(data, owner, key, value) {
    BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](owner[key], value);
}
function parseValueType(data, owner, key, value) {
    let val = new BuiltinValueTypes[value[VALUETYPE_SETTER]]();
    BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](val, value);
    owner[key] = val;
}
function parseTRS(data, owner, key, value) {
    let typedArray = owner[key];
    typedArray.set(value);
}
function parseDict(data, owner, key, value) {
    let dict = value[DICT_JSON_LAYOUT];
    owner[key] = dict;
    for (let i = DICT_JSON_LAYOUT + 1; i < value.length; i += 3) {
        let key = value[i];
        let type = value[i + 1];
        let subValue = value[i + 2];
        let op = ASSIGNMENTS[type];
        op(data, dict, key, subValue);
    }
}
function parseArray(data, owner, key, value) {
    let array = value[ARRAY_ITEM_VALUES];
    owner[key] = array;
    for (let i = 0; i < array.length; ++i) {
        let subValue = array[i];
        let type = value[i + 1];
        if (type !== 0 /* DataTypeID.SimpleType */) {
            let op = ASSIGNMENTS[type];
            // @ts-ignore
            op(data, array, i, subValue);
        }
    }
}
// function parseTypedArray (data: IFileData, owner: any, key: string, value: ITypedArrayData) {
//     let val: ValueType = new TypedArrays[value[TYPEDARRAY_TYPE]]();
//     BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](val, value);
//     // obj = new window[serialized.ctor](array.length);
//     // for (let i = 0; i < array.length; ++i) {
//     //     obj[i] = array[i];
//     // }
//     // return obj;
//     owner[key] = val;
// }
const ASSIGNMENTS = new Array(13 /* DataTypeID.ARRAY_LENGTH */);
ASSIGNMENTS[0 /* DataTypeID.SimpleType */] = assignSimple; // Only be used in the instances array
ASSIGNMENTS[1 /* DataTypeID.InstanceRef */] = assignInstanceRef;
ASSIGNMENTS[2 /* DataTypeID.Array_InstanceRef */] = genArrayParser(assignInstanceRef);
ASSIGNMENTS[3 /* DataTypeID.Array_AssetRefByInnerObj */] = genArrayParser(parseAssetRefByInnerObj);
ASSIGNMENTS[4 /* DataTypeID.Class */] = parseClass;
ASSIGNMENTS[5 /* DataTypeID.ValueTypeCreated */] = parseValueTypeCreated;
ASSIGNMENTS[6 /* DataTypeID.AssetRefByInnerObj */] = parseAssetRefByInnerObj;
ASSIGNMENTS[7 /* DataTypeID.TRS */] = parseTRS;
ASSIGNMENTS[8 /* DataTypeID.ValueType */] = parseValueType;
ASSIGNMENTS[9 /* DataTypeID.Array_Class */] = genArrayParser(parseClass);
ASSIGNMENTS[10 /* DataTypeID.CustomizedClass */] = parseCustomClass;
ASSIGNMENTS[11 /* DataTypeID.Dict */] = parseDict;
ASSIGNMENTS[12 /* DataTypeID.Array */] = parseArray;
// ASSIGNMENTS[DataTypeID.TypedArray] = parseTypedArray;
function parseInstances(data) {
    let instances = data[5 /* File.Instances */];
    let instanceTypes = data[6 /* File.InstanceTypes */];
    let instanceTypesLen = instanceTypes === EMPTY_PLACEHOLDER ? 0 : instanceTypes.length;
    let rootIndex = instances[instances.length - 1];
    let normalObjectCount = instances.length - instanceTypesLen;
    if (typeof rootIndex !== 'number') {
        rootIndex = 0;
    }
    else {
        if (rootIndex < 0) {
            rootIndex = ~rootIndex;
        }
        --normalObjectCount;
    }
    // DataTypeID.Class
    let insIndex = 0;
    for (; insIndex < normalObjectCount; ++insIndex) {
        instances[insIndex] = deserializeCCObject(data, instances[insIndex]);
    }
    let classes = data[3 /* File.SharedClasses */];
    for (let typeIndex = 0; typeIndex < instanceTypesLen; ++typeIndex, ++insIndex) {
        let type = instanceTypes[typeIndex];
        let eachData = instances[insIndex];
        if (type >= 0) {
            // class index for DataTypeID.CustomizedClass
            let ctor = classes[type]; // class
            instances[insIndex] = deserializeCustomCCObject(data, ctor, eachData);
        }
        else {
            // Other
            type = (~type);
            let op = ASSIGNMENTS[type];
            // @ts-ignore
            op(data, instances, insIndex, eachData);
        }
    }
    return rootIndex;
}
// const DESERIALIZE_AS = Attr.DELIMETER + 'deserializeAs';
// function deserializeAs(klass: AnyCCClass, klassLayout: IClass) {
//     var attrs = Attr.getClassAttrs(klass);
//     let keys = klassLayout[CLASS_KEYS];
//     for (let i = 0; i < keys.length; ++i) {
//         let newKey = attrs[keys[i] + DESERIALIZE_AS];
//         if (newKey) {
//             // @ts-ignore
//             if (keys.includes(newKey)) {
//                 // %s cannot be deserialized by property %s because %s was also present in the serialized data.
//                 cc.warnID(, newKey, keys[i], newKey);
//             }
//             else {
//                 keys[i] = newKey;
//             }
//         }
//     }
// }
function getMissingClass(hasCustomFinder, type) {
    if (!hasCustomFinder) {
        // @ts-ignore
        deserialize.reportMissingClass(type);
    }
    return Object;
}
function doLookupClass(classFinder, type, container, index, silent, hasCustomFinder) {
    let klass = classFinder(type);
    if (!klass) {
        // if (klass.__FSA__) {
        //     deserializeAs(klass, klassLayout as IClass);
        // }
        if (silent) {
            // generate a lazy proxy for ctor
            container[index] = (function (container, index, type) {
                return function proxy() {
                    let klass = classFinder(type) || getMissingClass(hasCustomFinder, type);
                    container[index] = klass;
                    return new klass();
                };
            })(container, index, type);
            return;
        }
        else {
            klass = getMissingClass(hasCustomFinder, type);
        }
    }
    container[index] = klass;
}
function lookupClasses(data, silent, customFinder) {
    let classFinder = customFinder || js_1.default._getClassById;
    let classes = data[3 /* File.SharedClasses */];
    for (let i = 0; i < classes.length; ++i) {
        let klassLayout = classes[i];
        if (typeof klassLayout !== 'string') {
            if (CC_DEBUG) {
                if (typeof klassLayout[CLASS_TYPE] === 'function') {
                    throw new Error('Can not deserialize the same JSON data again.');
                }
            }
            let type = klassLayout[CLASS_TYPE];
            doLookupClass(classFinder, type, klassLayout, CLASS_TYPE, silent, customFinder);
        }
        else {
            doLookupClass(classFinder, klassLayout, classes, i, silent, customFinder);
        }
    }
}
function cacheMasks(data) {
    let masks = data[4 /* File.SharedMasks */];
    if (masks) {
        let classes = data[3 /* File.SharedClasses */];
        for (let i = 0; i < masks.length; ++i) {
            let mask = masks[i];
            // @ts-ignore
            mask[MASK_CLASS] = classes[mask[MASK_CLASS]];
        }
    }
}
function parseResult(data) {
    let instances = data[5 /* File.Instances */];
    let sharedStrings = data[2 /* File.SharedStrings */];
    let dependSharedUuids = data[1 /* File.SharedUuids */];
    let dependObjs = data[8 /* File.DependObjs */];
    let dependKeys = data[9 /* File.DependKeys */];
    let dependUuids = data[10 /* File.DependUuidIndices */];
    for (let i = 0; i < dependObjs.length; ++i) {
        let obj = dependObjs[i];
        if (typeof obj === 'number') {
            dependObjs[i] = instances[obj];
        }
        else {
            // assigned by DataTypeID.AssetRefByInnerObj or added by Details object directly in _deserialize
        }
        let key = dependKeys[i];
        if (typeof key === 'number') {
            if (key >= 0) {
                key = sharedStrings[key];
            }
            else {
                key = ~key;
            }
            dependKeys[i] = key;
        }
        else {
            // added by Details object directly in _deserialize
        }
        let uuid = dependUuids[i];
        if (typeof uuid === 'number') {
            dependUuids[i] = dependSharedUuids[uuid];
        }
        else {
            // added by Details object directly in _deserialize
        }
    }
}
function deserialize(data, details, options) {
    // @ts-ignore
    if (CC_EDITOR && Buffer.isBuffer(data)) {
        // @ts-ignore
        data = data.toString();
    }
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }
    let borrowDetails = !details;
    details = details || Details.pool.get();
    details.init(data);
    options = options || {};
    let version = data[0 /* File.Version */];
    let preprocessed = false;
    if (typeof version === 'object') {
        preprocessed = version.preprocessed;
        version = version.version;
    }
    if (version < SUPPORT_MIN_FORMAT_VERSION) {
        throw new Error(cc.debug.getError(5304, version));
    }
    options._version = version;
    options.result = details;
    data[0 /* File.Context */] = options;
    if (!preprocessed) {
        lookupClasses(data, false, options.classFinder);
        cacheMasks(data);
    }
    cc.game._isCloning = true;
    let instances = data[5 /* File.Instances */];
    let rootIndex = parseInstances(data);
    cc.game._isCloning = false;
    if (data[7 /* File.Refs */]) {
        dereference(data[7 /* File.Refs */], instances, data[2 /* File.SharedStrings */]);
    }
    parseResult(data);
    if (borrowDetails) {
        Details.pool.put(details);
    }
    return instances[rootIndex];
}
exports.default = deserialize;
;
deserialize.Details = Details;
class FileInfo {
    constructor(version) {
        this.preprocessed = true;
        this.version = version;
    }
}
function unpackJSONs(data, classFinder) {
    if (data[0 /* File.Version */] < SUPPORT_MIN_FORMAT_VERSION) {
        throw new Error(cc.debug.getError(5304, data[0 /* File.Version */]));
    }
    lookupClasses(data, true, classFinder);
    cacheMasks(data);
    let version = new FileInfo(data[0 /* File.Version */]);
    let sharedUuids = data[1 /* File.SharedUuids */];
    let sharedStrings = data[2 /* File.SharedStrings */];
    let sharedClasses = data[3 /* File.SharedClasses */];
    let sharedMasks = data[4 /* File.SharedMasks */];
    let sections = data[PACKED_SECTIONS];
    for (let i = 0; i < sections.length; ++i) {
        sections[i].unshift(version, sharedUuids, sharedStrings, sharedClasses, sharedMasks);
    }
    return sections;
}
exports.unpackJSONs = unpackJSONs;
function packCustomObjData(type, data, hasNativeDep) {
    return [
        SUPPORT_MIN_FORMAT_VERSION, EMPTY_PLACEHOLDER, EMPTY_PLACEHOLDER,
        [type],
        EMPTY_PLACEHOLDER,
        hasNativeDep ? [data, ~0] : [data],
        [0],
        EMPTY_PLACEHOLDER, [], [], []
    ];
}
exports.packCustomObjData = packCustomObjData;
function hasNativeDep(data) {
    let instances = data[5 /* File.Instances */];
    let rootInfo = instances[instances.length - 1];
    if (typeof rootInfo !== 'number') {
        return false;
    }
    else {
        return rootInfo < 0;
    }
}
exports.hasNativeDep = hasNativeDep;
if (CC_PREVIEW) {
    deserialize.isCompiledJson = function (json) {
        if (Array.isArray(json)) {
            let version = json[0];
            // array[0] will not be a number in the editor version
            return typeof version === 'number' || version instanceof FileInfo;
        }
        else {
            return false;
        }
    };
}
function getDependUuidList(json) {
    let sharedUuids = json[1 /* File.SharedUuids */];
    return json[10 /* File.DependUuidIndices */].map(index => sharedUuids[index]);
}
exports.getDependUuidList = getDependUuidList;
if (CC_EDITOR || CC_TEST) {
    cc._deserializeCompiled = deserialize;
    deserialize.macros = {
        EMPTY_PLACEHOLDER,
        CUSTOM_OBJ_DATA_CLASS,
        CUSTOM_OBJ_DATA_CONTENT,
        CLASS_TYPE,
        CLASS_KEYS,
        CLASS_PROP_TYPE_OFFSET,
        MASK_CLASS,
        OBJ_DATA_MASK,
        DICT_JSON_LAYOUT,
        ARRAY_ITEM_VALUES,
        PACKED_SECTIONS,
    };
    deserialize._BuiltinValueTypes = BuiltinValueTypes;
    deserialize._serializeBuiltinValueTypes = serializeBuiltinValueTypes;
}
if (CC_TEST) {
    cc._Test.deserializeCompiled = {
        deserialize,
        dereference,
        deserializeCCObject,
        deserializeCustomCCObject,
        parseInstances,
        parseResult,
        cacheMasks,
        File: {
            Version: 0 /* File.Version */,
            Context: 0 /* File.Context */,
            SharedUuids: 1 /* File.SharedUuids */,
            SharedStrings: 2 /* File.SharedStrings */,
            SharedClasses: 3 /* File.SharedClasses */,
            SharedMasks: 4 /* File.SharedMasks */,
            Instances: 5 /* File.Instances */,
            InstanceTypes: 6 /* File.InstanceTypes */,
            Refs: 7 /* File.Refs */,
            DependObjs: 8 /* File.DependObjs */,
            DependKeys: 9 /* File.DependKeys */,
            DependUuidIndices: 10 /* File.DependUuidIndices */,
            // ArrayLength: File.ArrayLength,
        },
        DataTypeID: {
            SimpleType: 0 /* DataTypeID.SimpleType */,
            InstanceRef: 1 /* DataTypeID.InstanceRef */,
            Array_InstanceRef: 2 /* DataTypeID.Array_InstanceRef */,
            Array_AssetRefByInnerObj: 3 /* DataTypeID.Array_AssetRefByInnerObj */,
            Class: 4 /* DataTypeID.Class */,
            ValueTypeCreated: 5 /* DataTypeID.ValueTypeCreated */,
            AssetRefByInnerObj: 6 /* DataTypeID.AssetRefByInnerObj */,
            TRS: 7 /* DataTypeID.TRS */,
            ValueType: 8 /* DataTypeID.ValueType */,
            Array_Class: 9 /* DataTypeID.Array_Class */,
            CustomizedClass: 10 /* DataTypeID.CustomizedClass */,
            Dict: 11 /* DataTypeID.Dict */,
            Array: 12 /* DataTypeID.Array */,
            // TypedArray: DataTypeID.TypedArray,
        },
        BuiltinValueTypes,
        unpackJSONs,
    };
}
