import { bO as _defineProperty } from "./appui-react-CxqBCL1K.js";
import "./iframe-MZ9GDAUV.js";
import "./Key.enum-BlUwKc_n.js";
import "./client-CdcWlIUh.js";
function assert$1(condition, message) {
  if (!condition) {
    throw new Error("loaders.gl assertion failed.");
  }
}
const globals = {
  self: typeof self !== "undefined" && self,
  window: typeof window !== "undefined" && window,
  global: typeof global !== "undefined" && global
};
const global_ = globals.global || globals.self || globals.window || {};
const isBrowser = typeof process !== "object" || String(process) !== "[object process]" || process.browser;
const isWorker = typeof importScripts === "function";
const matches = typeof process !== "undefined" && process.version && /v([0-9]*)/.exec(process.version);
matches && parseFloat(matches[1]) || 0;
const readFileAsArrayBuffer = null;
const readFileAsText = null;
const requireFromFile = null;
const requireFromString = null;
const node = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  readFileAsArrayBuffer,
  readFileAsText,
  requireFromFile,
  requireFromString
}, Symbol.toStringTag, { value: "Module" }));
const VERSION$1 = "3.4.15";
const loadLibraryPromises = {};
async function loadLibrary(libraryUrl) {
  let moduleName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (moduleName) {
    libraryUrl = getLibraryUrl(libraryUrl, moduleName, options);
  }
  loadLibraryPromises[libraryUrl] = loadLibraryPromises[libraryUrl] || loadLibraryFromFile(libraryUrl);
  return await loadLibraryPromises[libraryUrl];
}
function getLibraryUrl(library, moduleName, options) {
  if (library.startsWith("http")) {
    return library;
  }
  const modules = options.modules || {};
  if (modules[library]) {
    return modules[library];
  }
  if (!isBrowser) {
    return "modules/".concat(moduleName, "/dist/libs/").concat(library);
  }
  if (options.CDN) {
    assert$1(options.CDN.startsWith("http"));
    return "".concat(options.CDN, "/").concat(moduleName, "@").concat(VERSION$1, "/dist/libs/").concat(library);
  }
  if (isWorker) {
    return "../src/libs/".concat(library);
  }
  return "modules/".concat(moduleName, "/src/libs/").concat(library);
}
async function loadLibraryFromFile(libraryUrl) {
  if (libraryUrl.endsWith("wasm")) {
    const response2 = await fetch(libraryUrl);
    return await response2.arrayBuffer();
  }
  if (!isBrowser) {
    try {
      return node && requireFromFile && await requireFromFile(libraryUrl);
    } catch {
      return null;
    }
  }
  if (isWorker) {
    return importScripts(libraryUrl);
  }
  const response = await fetch(libraryUrl);
  const scriptSource = await response.text();
  return loadLibraryFromString(scriptSource, libraryUrl);
}
function loadLibraryFromString(scriptSource, id) {
  if (!isBrowser) {
    return requireFromString;
  }
  if (isWorker) {
    eval.call(global_, scriptSource);
    return null;
  }
  const script = document.createElement("script");
  script.id = id;
  try {
    script.appendChild(document.createTextNode(scriptSource));
  } catch (e) {
    script.text = scriptSource;
  }
  document.body.appendChild(script);
  return null;
}
const VERSION = "3.4.15";
const DEFAULT_DRACO_OPTIONS = {
  draco: {
    decoderType: typeof WebAssembly === "object" ? "wasm" : "js",
    libraryPath: "libs/",
    extraAttributes: {},
    attributeNameEntry: void 0
  }
};
const DracoLoader$1 = {
  name: "Draco",
  id: isBrowser ? "draco" : "draco-nodejs",
  module: "draco",
  shapes: ["mesh"],
  version: VERSION,
  worker: true,
  extensions: ["drc"],
  mimeTypes: ["application/octet-stream"],
  binary: true,
  tests: ["DRACO"],
  options: DEFAULT_DRACO_OPTIONS
};
function getMeshBoundingBox(attributes) {
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  const positions = attributes.POSITION ? attributes.POSITION.value : [];
  const len = positions && positions.length;
  for (let i = 0; i < len; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    minZ = z < minZ ? z : minZ;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    maxZ = z > maxZ ? z : maxZ;
  }
  return [[minX, minY, minZ], [maxX, maxY, maxZ]];
}
function assert(condition, message) {
  if (!condition) {
    throw new Error("loader assertion failed.");
  }
}
class Schema {
  constructor(fields, metadata) {
    _defineProperty(this, "fields", void 0);
    _defineProperty(this, "metadata", void 0);
    assert(Array.isArray(fields));
    checkNames(fields);
    this.fields = fields;
    this.metadata = metadata || /* @__PURE__ */ new Map();
  }
  compareTo(other) {
    if (this.metadata !== other.metadata) {
      return false;
    }
    if (this.fields.length !== other.fields.length) {
      return false;
    }
    for (let i = 0; i < this.fields.length; ++i) {
      if (!this.fields[i].compareTo(other.fields[i])) {
        return false;
      }
    }
    return true;
  }
  select() {
    const nameMap = /* @__PURE__ */ Object.create(null);
    for (var _len = arguments.length, columnNames = new Array(_len), _key = 0; _key < _len; _key++) {
      columnNames[_key] = arguments[_key];
    }
    for (const name of columnNames) {
      nameMap[name] = true;
    }
    const selectedFields = this.fields.filter((field) => nameMap[field.name]);
    return new Schema(selectedFields, this.metadata);
  }
  selectAt() {
    for (var _len2 = arguments.length, columnIndices = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      columnIndices[_key2] = arguments[_key2];
    }
    const selectedFields = columnIndices.map((index) => this.fields[index]).filter(Boolean);
    return new Schema(selectedFields, this.metadata);
  }
  assign(schemaOrFields) {
    let fields;
    let metadata = this.metadata;
    if (schemaOrFields instanceof Schema) {
      const otherSchema = schemaOrFields;
      fields = otherSchema.fields;
      metadata = mergeMaps(mergeMaps(/* @__PURE__ */ new Map(), this.metadata), otherSchema.metadata);
    } else {
      fields = schemaOrFields;
    }
    const fieldMap = /* @__PURE__ */ Object.create(null);
    for (const field of this.fields) {
      fieldMap[field.name] = field;
    }
    for (const field of fields) {
      fieldMap[field.name] = field;
    }
    const mergedFields = Object.values(fieldMap);
    return new Schema(mergedFields, metadata);
  }
}
function checkNames(fields) {
  const usedNames = {};
  for (const field of fields) {
    if (usedNames[field.name]) {
      console.warn("Schema: duplicated field name", field.name, field);
    }
    usedNames[field.name] = true;
  }
}
function mergeMaps(m1, m2) {
  return new Map([...m1 || /* @__PURE__ */ new Map(), ...m2 || /* @__PURE__ */ new Map()]);
}
class Field {
  constructor(name, type) {
    let nullable = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    let metadata = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : /* @__PURE__ */ new Map();
    _defineProperty(this, "name", void 0);
    _defineProperty(this, "type", void 0);
    _defineProperty(this, "nullable", void 0);
    _defineProperty(this, "metadata", void 0);
    this.name = name;
    this.type = type;
    this.nullable = nullable;
    this.metadata = metadata;
  }
  get typeId() {
    return this.type && this.type.typeId;
  }
  clone() {
    return new Field(this.name, this.type, this.nullable, this.metadata);
  }
  compareTo(other) {
    return this.name === other.name && this.type === other.type && this.nullable === other.nullable && this.metadata === other.metadata;
  }
  toString() {
    return "".concat(this.type).concat(this.nullable ? ", nullable" : "").concat(this.metadata ? ", metadata: ".concat(this.metadata) : "");
  }
}
let Type = function(Type2) {
  Type2[Type2["NONE"] = 0] = "NONE";
  Type2[Type2["Null"] = 1] = "Null";
  Type2[Type2["Int"] = 2] = "Int";
  Type2[Type2["Float"] = 3] = "Float";
  Type2[Type2["Binary"] = 4] = "Binary";
  Type2[Type2["Utf8"] = 5] = "Utf8";
  Type2[Type2["Bool"] = 6] = "Bool";
  Type2[Type2["Decimal"] = 7] = "Decimal";
  Type2[Type2["Date"] = 8] = "Date";
  Type2[Type2["Time"] = 9] = "Time";
  Type2[Type2["Timestamp"] = 10] = "Timestamp";
  Type2[Type2["Interval"] = 11] = "Interval";
  Type2[Type2["List"] = 12] = "List";
  Type2[Type2["Struct"] = 13] = "Struct";
  Type2[Type2["Union"] = 14] = "Union";
  Type2[Type2["FixedSizeBinary"] = 15] = "FixedSizeBinary";
  Type2[Type2["FixedSizeList"] = 16] = "FixedSizeList";
  Type2[Type2["Map"] = 17] = "Map";
  Type2[Type2["Dictionary"] = -1] = "Dictionary";
  Type2[Type2["Int8"] = -2] = "Int8";
  Type2[Type2["Int16"] = -3] = "Int16";
  Type2[Type2["Int32"] = -4] = "Int32";
  Type2[Type2["Int64"] = -5] = "Int64";
  Type2[Type2["Uint8"] = -6] = "Uint8";
  Type2[Type2["Uint16"] = -7] = "Uint16";
  Type2[Type2["Uint32"] = -8] = "Uint32";
  Type2[Type2["Uint64"] = -9] = "Uint64";
  Type2[Type2["Float16"] = -10] = "Float16";
  Type2[Type2["Float32"] = -11] = "Float32";
  Type2[Type2["Float64"] = -12] = "Float64";
  Type2[Type2["DateDay"] = -13] = "DateDay";
  Type2[Type2["DateMillisecond"] = -14] = "DateMillisecond";
  Type2[Type2["TimestampSecond"] = -15] = "TimestampSecond";
  Type2[Type2["TimestampMillisecond"] = -16] = "TimestampMillisecond";
  Type2[Type2["TimestampMicrosecond"] = -17] = "TimestampMicrosecond";
  Type2[Type2["TimestampNanosecond"] = -18] = "TimestampNanosecond";
  Type2[Type2["TimeSecond"] = -19] = "TimeSecond";
  Type2[Type2["TimeMillisecond"] = -20] = "TimeMillisecond";
  Type2[Type2["TimeMicrosecond"] = -21] = "TimeMicrosecond";
  Type2[Type2["TimeNanosecond"] = -22] = "TimeNanosecond";
  Type2[Type2["DenseUnion"] = -23] = "DenseUnion";
  Type2[Type2["SparseUnion"] = -24] = "SparseUnion";
  Type2[Type2["IntervalDayTime"] = -25] = "IntervalDayTime";
  Type2[Type2["IntervalYearMonth"] = -26] = "IntervalYearMonth";
  return Type2;
}({});
let _Symbol$toStringTag, _Symbol$toStringTag2, _Symbol$toStringTag7;
class DataType {
  static isNull(x) {
    return x && x.typeId === Type.Null;
  }
  static isInt(x) {
    return x && x.typeId === Type.Int;
  }
  static isFloat(x) {
    return x && x.typeId === Type.Float;
  }
  static isBinary(x) {
    return x && x.typeId === Type.Binary;
  }
  static isUtf8(x) {
    return x && x.typeId === Type.Utf8;
  }
  static isBool(x) {
    return x && x.typeId === Type.Bool;
  }
  static isDecimal(x) {
    return x && x.typeId === Type.Decimal;
  }
  static isDate(x) {
    return x && x.typeId === Type.Date;
  }
  static isTime(x) {
    return x && x.typeId === Type.Time;
  }
  static isTimestamp(x) {
    return x && x.typeId === Type.Timestamp;
  }
  static isInterval(x) {
    return x && x.typeId === Type.Interval;
  }
  static isList(x) {
    return x && x.typeId === Type.List;
  }
  static isStruct(x) {
    return x && x.typeId === Type.Struct;
  }
  static isUnion(x) {
    return x && x.typeId === Type.Union;
  }
  static isFixedSizeBinary(x) {
    return x && x.typeId === Type.FixedSizeBinary;
  }
  static isFixedSizeList(x) {
    return x && x.typeId === Type.FixedSizeList;
  }
  static isMap(x) {
    return x && x.typeId === Type.Map;
  }
  static isDictionary(x) {
    return x && x.typeId === Type.Dictionary;
  }
  get typeId() {
    return Type.NONE;
  }
  compareTo(other) {
    return this === other;
  }
}
_Symbol$toStringTag = Symbol.toStringTag;
class Int extends DataType {
  constructor(isSigned, bitWidth) {
    super();
    _defineProperty(this, "isSigned", void 0);
    _defineProperty(this, "bitWidth", void 0);
    this.isSigned = isSigned;
    this.bitWidth = bitWidth;
  }
  get typeId() {
    return Type.Int;
  }
  get [_Symbol$toStringTag]() {
    return "Int";
  }
  toString() {
    return "".concat(this.isSigned ? "I" : "Ui", "nt").concat(this.bitWidth);
  }
}
class Int8 extends Int {
  constructor() {
    super(true, 8);
  }
}
class Int16 extends Int {
  constructor() {
    super(true, 16);
  }
}
class Int32 extends Int {
  constructor() {
    super(true, 32);
  }
}
class Uint8 extends Int {
  constructor() {
    super(false, 8);
  }
}
class Uint16 extends Int {
  constructor() {
    super(false, 16);
  }
}
class Uint32 extends Int {
  constructor() {
    super(false, 32);
  }
}
const Precision = {
  SINGLE: 32,
  DOUBLE: 64
};
_Symbol$toStringTag2 = Symbol.toStringTag;
class Float extends DataType {
  constructor(precision) {
    super();
    _defineProperty(this, "precision", void 0);
    this.precision = precision;
  }
  get typeId() {
    return Type.Float;
  }
  get [_Symbol$toStringTag2]() {
    return "Float";
  }
  toString() {
    return "Float".concat(this.precision);
  }
}
class Float32 extends Float {
  constructor() {
    super(Precision.SINGLE);
  }
}
class Float64 extends Float {
  constructor() {
    super(Precision.DOUBLE);
  }
}
_Symbol$toStringTag7 = Symbol.toStringTag;
class FixedSizeList extends DataType {
  constructor(listSize, child) {
    super();
    _defineProperty(this, "listSize", void 0);
    _defineProperty(this, "children", void 0);
    this.listSize = listSize;
    this.children = [child];
  }
  get typeId() {
    return Type.FixedSizeList;
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get [_Symbol$toStringTag7]() {
    return "FixedSizeList";
  }
  toString() {
    return "FixedSizeList[".concat(this.listSize, "]<").concat(this.valueType, ">");
  }
}
function getArrowTypeFromTypedArray(array) {
  switch (array.constructor) {
    case Int8Array:
      return new Int8();
    case Uint8Array:
      return new Uint8();
    case Int16Array:
      return new Int16();
    case Uint16Array:
      return new Uint16();
    case Int32Array:
      return new Int32();
    case Uint32Array:
      return new Uint32();
    case Float32Array:
      return new Float32();
    case Float64Array:
      return new Float64();
    default:
      throw new Error("array type not supported");
  }
}
function deduceMeshField(attributeName, attribute, optionalMetadata) {
  const type = getArrowTypeFromTypedArray(attribute.value);
  const metadata = optionalMetadata ? optionalMetadata : makeMeshAttributeMetadata(attribute);
  const field = new Field(attributeName, new FixedSizeList(attribute.size, new Field("value", type)), false, metadata);
  return field;
}
function makeMeshAttributeMetadata(attribute) {
  const result = /* @__PURE__ */ new Map();
  if ("byteOffset" in attribute) {
    result.set("byteOffset", attribute.byteOffset.toString(10));
  }
  if ("byteStride" in attribute) {
    result.set("byteStride", attribute.byteStride.toString(10));
  }
  if ("normalized" in attribute) {
    result.set("normalized", attribute.normalized.toString());
  }
  return result;
}
function getDracoSchema(attributes, loaderData, indices) {
  const metadataMap = makeMetadata(loaderData.metadata);
  const fields = [];
  const namedLoaderDataAttributes = transformAttributesLoaderData(loaderData.attributes);
  for (const attributeName in attributes) {
    const attribute = attributes[attributeName];
    const field = getArrowFieldFromAttribute(attributeName, attribute, namedLoaderDataAttributes[attributeName]);
    fields.push(field);
  }
  if (indices) {
    const indicesField = getArrowFieldFromAttribute("indices", indices);
    fields.push(indicesField);
  }
  return new Schema(fields, metadataMap);
}
function transformAttributesLoaderData(loaderData) {
  const result = {};
  for (const key in loaderData) {
    const dracoAttribute = loaderData[key];
    result[dracoAttribute.name || "undefined"] = dracoAttribute;
  }
  return result;
}
function getArrowFieldFromAttribute(attributeName, attribute, loaderData) {
  const metadataMap = loaderData ? makeMetadata(loaderData.metadata) : void 0;
  const field = deduceMeshField(attributeName, attribute, metadataMap);
  return field;
}
function makeMetadata(metadata) {
  const metadataMap = /* @__PURE__ */ new Map();
  for (const key in metadata) {
    metadataMap.set("".concat(key, ".string"), JSON.stringify(metadata[key]));
  }
  return metadataMap;
}
const DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP = {
  POSITION: "POSITION",
  NORMAL: "NORMAL",
  COLOR: "COLOR_0",
  TEX_COORD: "TEXCOORD_0"
};
const DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP = {
  1: Int8Array,
  2: Uint8Array,
  3: Int16Array,
  4: Uint16Array,
  5: Int32Array,
  6: Uint32Array,
  9: Float32Array
};
const INDEX_ITEM_SIZE = 4;
class DracoParser {
  constructor(draco) {
    _defineProperty(this, "draco", void 0);
    _defineProperty(this, "decoder", void 0);
    _defineProperty(this, "metadataQuerier", void 0);
    this.draco = draco;
    this.decoder = new this.draco.Decoder();
    this.metadataQuerier = new this.draco.MetadataQuerier();
  }
  destroy() {
    this.draco.destroy(this.decoder);
    this.draco.destroy(this.metadataQuerier);
  }
  parseSync(arrayBuffer) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const buffer = new this.draco.DecoderBuffer();
    buffer.Init(new Int8Array(arrayBuffer), arrayBuffer.byteLength);
    this._disableAttributeTransforms(options);
    const geometry_type = this.decoder.GetEncodedGeometryType(buffer);
    const dracoGeometry = geometry_type === this.draco.TRIANGULAR_MESH ? new this.draco.Mesh() : new this.draco.PointCloud();
    try {
      let dracoStatus;
      switch (geometry_type) {
        case this.draco.TRIANGULAR_MESH:
          dracoStatus = this.decoder.DecodeBufferToMesh(buffer, dracoGeometry);
          break;
        case this.draco.POINT_CLOUD:
          dracoStatus = this.decoder.DecodeBufferToPointCloud(buffer, dracoGeometry);
          break;
        default:
          throw new Error("DRACO: Unknown geometry type.");
      }
      if (!dracoStatus.ok() || !dracoGeometry.ptr) {
        const message = "DRACO decompression failed: ".concat(dracoStatus.error_msg());
        throw new Error(message);
      }
      const loaderData = this._getDracoLoaderData(dracoGeometry, geometry_type, options);
      const geometry = this._getMeshData(dracoGeometry, loaderData, options);
      const boundingBox = getMeshBoundingBox(geometry.attributes);
      const schema = getDracoSchema(geometry.attributes, loaderData, geometry.indices);
      const data = {
        loader: "draco",
        loaderData,
        header: {
          vertexCount: dracoGeometry.num_points(),
          boundingBox
        },
        ...geometry,
        schema
      };
      return data;
    } finally {
      this.draco.destroy(buffer);
      if (dracoGeometry) {
        this.draco.destroy(dracoGeometry);
      }
    }
  }
  _getDracoLoaderData(dracoGeometry, geometry_type, options) {
    const metadata = this._getTopLevelMetadata(dracoGeometry);
    const attributes = this._getDracoAttributes(dracoGeometry, options);
    return {
      geometry_type,
      num_attributes: dracoGeometry.num_attributes(),
      num_points: dracoGeometry.num_points(),
      num_faces: dracoGeometry instanceof this.draco.Mesh ? dracoGeometry.num_faces() : 0,
      metadata,
      attributes
    };
  }
  _getDracoAttributes(dracoGeometry, options) {
    const dracoAttributes = {};
    for (let attributeId = 0; attributeId < dracoGeometry.num_attributes(); attributeId++) {
      const dracoAttribute = this.decoder.GetAttribute(dracoGeometry, attributeId);
      const metadata = this._getAttributeMetadata(dracoGeometry, attributeId);
      dracoAttributes[dracoAttribute.unique_id()] = {
        unique_id: dracoAttribute.unique_id(),
        attribute_type: dracoAttribute.attribute_type(),
        data_type: dracoAttribute.data_type(),
        num_components: dracoAttribute.num_components(),
        byte_offset: dracoAttribute.byte_offset(),
        byte_stride: dracoAttribute.byte_stride(),
        normalized: dracoAttribute.normalized(),
        attribute_index: attributeId,
        metadata
      };
      const quantization = this._getQuantizationTransform(dracoAttribute, options);
      if (quantization) {
        dracoAttributes[dracoAttribute.unique_id()].quantization_transform = quantization;
      }
      const octahedron = this._getOctahedronTransform(dracoAttribute, options);
      if (octahedron) {
        dracoAttributes[dracoAttribute.unique_id()].octahedron_transform = octahedron;
      }
    }
    return dracoAttributes;
  }
  _getMeshData(dracoGeometry, loaderData, options) {
    const attributes = this._getMeshAttributes(loaderData, dracoGeometry, options);
    const positionAttribute = attributes.POSITION;
    if (!positionAttribute) {
      throw new Error("DRACO: No position attribute found.");
    }
    if (dracoGeometry instanceof this.draco.Mesh) {
      switch (options.topology) {
        case "triangle-strip":
          return {
            topology: "triangle-strip",
            mode: 4,
            attributes,
            indices: {
              value: this._getTriangleStripIndices(dracoGeometry),
              size: 1
            }
          };
        case "triangle-list":
        default:
          return {
            topology: "triangle-list",
            mode: 5,
            attributes,
            indices: {
              value: this._getTriangleListIndices(dracoGeometry),
              size: 1
            }
          };
      }
    }
    return {
      topology: "point-list",
      mode: 0,
      attributes
    };
  }
  _getMeshAttributes(loaderData, dracoGeometry, options) {
    const attributes = {};
    for (const loaderAttribute of Object.values(loaderData.attributes)) {
      const attributeName = this._deduceAttributeName(loaderAttribute, options);
      loaderAttribute.name = attributeName;
      const {
        value,
        size
      } = this._getAttributeValues(dracoGeometry, loaderAttribute);
      attributes[attributeName] = {
        value,
        size,
        byteOffset: loaderAttribute.byte_offset,
        byteStride: loaderAttribute.byte_stride,
        normalized: loaderAttribute.normalized
      };
    }
    return attributes;
  }
  _getTriangleListIndices(dracoGeometry) {
    const numFaces = dracoGeometry.num_faces();
    const numIndices = numFaces * 3;
    const byteLength = numIndices * INDEX_ITEM_SIZE;
    const ptr = this.draco._malloc(byteLength);
    try {
      this.decoder.GetTrianglesUInt32Array(dracoGeometry, byteLength, ptr);
      return new Uint32Array(this.draco.HEAPF32.buffer, ptr, numIndices).slice();
    } finally {
      this.draco._free(ptr);
    }
  }
  _getTriangleStripIndices(dracoGeometry) {
    const dracoArray = new this.draco.DracoInt32Array();
    try {
      this.decoder.GetTriangleStripsFromMesh(dracoGeometry, dracoArray);
      return getUint32Array(dracoArray);
    } finally {
      this.draco.destroy(dracoArray);
    }
  }
  _getAttributeValues(dracoGeometry, attribute) {
    const TypedArrayCtor = DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP[attribute.data_type];
    const numComponents = attribute.num_components;
    const numPoints = dracoGeometry.num_points();
    const numValues = numPoints * numComponents;
    const byteLength = numValues * TypedArrayCtor.BYTES_PER_ELEMENT;
    const dataType = getDracoDataType(this.draco, TypedArrayCtor);
    let value;
    const ptr = this.draco._malloc(byteLength);
    try {
      const dracoAttribute = this.decoder.GetAttribute(dracoGeometry, attribute.attribute_index);
      this.decoder.GetAttributeDataArrayForAllPoints(dracoGeometry, dracoAttribute, dataType, byteLength, ptr);
      value = new TypedArrayCtor(this.draco.HEAPF32.buffer, ptr, numValues).slice();
    } finally {
      this.draco._free(ptr);
    }
    return {
      value,
      size: numComponents
    };
  }
  _deduceAttributeName(attribute, options) {
    const uniqueId = attribute.unique_id;
    for (const [attributeName, attributeUniqueId] of Object.entries(options.extraAttributes || {})) {
      if (attributeUniqueId === uniqueId) {
        return attributeName;
      }
    }
    const thisAttributeType = attribute.attribute_type;
    for (const dracoAttributeConstant in DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP) {
      const attributeType = this.draco[dracoAttributeConstant];
      if (attributeType === thisAttributeType) {
        return DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP[dracoAttributeConstant];
      }
    }
    const entryName = options.attributeNameEntry || "name";
    if (attribute.metadata[entryName]) {
      return attribute.metadata[entryName].string;
    }
    return "CUSTOM_ATTRIBUTE_".concat(uniqueId);
  }
  _getTopLevelMetadata(dracoGeometry) {
    const dracoMetadata = this.decoder.GetMetadata(dracoGeometry);
    return this._getDracoMetadata(dracoMetadata);
  }
  _getAttributeMetadata(dracoGeometry, attributeId) {
    const dracoMetadata = this.decoder.GetAttributeMetadata(dracoGeometry, attributeId);
    return this._getDracoMetadata(dracoMetadata);
  }
  _getDracoMetadata(dracoMetadata) {
    if (!dracoMetadata || !dracoMetadata.ptr) {
      return {};
    }
    const result = {};
    const numEntries = this.metadataQuerier.NumEntries(dracoMetadata);
    for (let entryIndex = 0; entryIndex < numEntries; entryIndex++) {
      const entryName = this.metadataQuerier.GetEntryName(dracoMetadata, entryIndex);
      result[entryName] = this._getDracoMetadataField(dracoMetadata, entryName);
    }
    return result;
  }
  _getDracoMetadataField(dracoMetadata, entryName) {
    const dracoArray = new this.draco.DracoInt32Array();
    try {
      this.metadataQuerier.GetIntEntryArray(dracoMetadata, entryName, dracoArray);
      const intArray = getInt32Array(dracoArray);
      return {
        int: this.metadataQuerier.GetIntEntry(dracoMetadata, entryName),
        string: this.metadataQuerier.GetStringEntry(dracoMetadata, entryName),
        double: this.metadataQuerier.GetDoubleEntry(dracoMetadata, entryName),
        intArray
      };
    } finally {
      this.draco.destroy(dracoArray);
    }
  }
  _disableAttributeTransforms(options) {
    const {
      quantizedAttributes = [],
      octahedronAttributes = []
    } = options;
    const skipAttributes = [...quantizedAttributes, ...octahedronAttributes];
    for (const dracoAttributeName of skipAttributes) {
      this.decoder.SkipAttributeTransform(this.draco[dracoAttributeName]);
    }
  }
  _getQuantizationTransform(dracoAttribute, options) {
    const {
      quantizedAttributes = []
    } = options;
    const attribute_type = dracoAttribute.attribute_type();
    const skip = quantizedAttributes.map((type) => this.decoder[type]).includes(attribute_type);
    if (skip) {
      const transform = new this.draco.AttributeQuantizationTransform();
      try {
        if (transform.InitFromAttribute(dracoAttribute)) {
          return {
            quantization_bits: transform.quantization_bits(),
            range: transform.range(),
            min_values: new Float32Array([1, 2, 3]).map((i) => transform.min_value(i))
          };
        }
      } finally {
        this.draco.destroy(transform);
      }
    }
    return null;
  }
  _getOctahedronTransform(dracoAttribute, options) {
    const {
      octahedronAttributes = []
    } = options;
    const attribute_type = dracoAttribute.attribute_type();
    const octahedron = octahedronAttributes.map((type) => this.decoder[type]).includes(attribute_type);
    if (octahedron) {
      const transform = new this.draco.AttributeQuantizationTransform();
      try {
        if (transform.InitFromAttribute(dracoAttribute)) {
          return {
            quantization_bits: transform.quantization_bits()
          };
        }
      } finally {
        this.draco.destroy(transform);
      }
    }
    return null;
  }
}
function getDracoDataType(draco, attributeType) {
  switch (attributeType) {
    case Float32Array:
      return draco.DT_FLOAT32;
    case Int8Array:
      return draco.DT_INT8;
    case Int16Array:
      return draco.DT_INT16;
    case Int32Array:
      return draco.DT_INT32;
    case Uint8Array:
      return draco.DT_UINT8;
    case Uint16Array:
      return draco.DT_UINT16;
    case Uint32Array:
      return draco.DT_UINT32;
    default:
      return draco.DT_INVALID;
  }
}
function getInt32Array(dracoArray) {
  const numValues = dracoArray.size();
  const intArray = new Int32Array(numValues);
  for (let i = 0; i < numValues; i++) {
    intArray[i] = dracoArray.GetValue(i);
  }
  return intArray;
}
function getUint32Array(dracoArray) {
  const numValues = dracoArray.size();
  const intArray = new Int32Array(numValues);
  for (let i = 0; i < numValues; i++) {
    intArray[i] = dracoArray.GetValue(i);
  }
  return intArray;
}
const DRACO_DECODER_VERSION = "1.5.5";
const STATIC_DECODER_URL = "https://www.gstatic.com/draco/versioned/decoders/".concat(DRACO_DECODER_VERSION);
const DRACO_JS_DECODER_URL = "".concat(STATIC_DECODER_URL, "/draco_decoder.js");
const DRACO_WASM_WRAPPER_URL = "".concat(STATIC_DECODER_URL, "/draco_wasm_wrapper.js");
const DRACO_WASM_DECODER_URL = "".concat(STATIC_DECODER_URL, "/draco_decoder.wasm");
let loadDecoderPromise;
async function loadDracoDecoderModule(options) {
  const modules = options.modules || {};
  if (modules.draco3d) {
    loadDecoderPromise = loadDecoderPromise || modules.draco3d.createDecoderModule({}).then((draco) => {
      return {
        draco
      };
    });
  } else {
    loadDecoderPromise = loadDecoderPromise || loadDracoDecoder(options);
  }
  return await loadDecoderPromise;
}
async function loadDracoDecoder(options) {
  let DracoDecoderModule;
  let wasmBinary;
  switch (options.draco && options.draco.decoderType) {
    case "js":
      DracoDecoderModule = await loadLibrary(DRACO_JS_DECODER_URL, "draco", options);
      break;
    case "wasm":
    default:
      [DracoDecoderModule, wasmBinary] = await Promise.all([await loadLibrary(DRACO_WASM_WRAPPER_URL, "draco", options), await loadLibrary(DRACO_WASM_DECODER_URL, "draco", options)]);
  }
  DracoDecoderModule = DracoDecoderModule || globalThis.DracoDecoderModule;
  return await initializeDracoDecoder(DracoDecoderModule, wasmBinary);
}
function initializeDracoDecoder(DracoDecoderModule, wasmBinary) {
  const options = {};
  if (wasmBinary) {
    options.wasmBinary = wasmBinary;
  }
  return new Promise((resolve) => {
    DracoDecoderModule({
      ...options,
      onModuleLoaded: (draco) => resolve({
        draco
      })
    });
  });
}
const DracoLoader = {
  ...DracoLoader$1,
  parse
};
async function parse(arrayBuffer, options) {
  const {
    draco
  } = await loadDracoDecoderModule(options);
  const dracoParser = new DracoParser(draco);
  try {
    return dracoParser.parseSync(arrayBuffer, options === null || options === void 0 ? void 0 : options.draco);
  } finally {
    dracoParser.destroy();
  }
}
export {
  DracoLoader,
  DracoLoader$1 as DracoWorkerLoader
};
