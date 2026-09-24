import { i as __esmMin } from "./preload-helper-C_PogYeJ.js";
//#region ../../node_modules/.pnpm/@loaders.gl+draco@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/draco/dist/lib/utils/version.js
var VERSION$1;
var init_version$1 = __esmMin((() => {
	VERSION$1 = "4.3.3";
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+draco@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/draco/dist/draco-loader.js
var DracoLoader$1;
var init_draco_loader = __esmMin((() => {
	init_version$1();
	DracoLoader$1 = {
		dataType: null,
		batchType: null,
		name: "Draco",
		id: "draco",
		module: "draco",
		version: VERSION$1,
		worker: true,
		extensions: ["drc"],
		mimeTypes: ["application/octet-stream"],
		binary: true,
		tests: ["DRACO"],
		options: { draco: {
			decoderType: typeof WebAssembly === "object" ? "wasm" : "js",
			libraryPath: "libs/",
			extraAttributes: {},
			attributeNameEntry: void 0
		} }
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+schema@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/schema/dist/lib/table/simple-table/data-type.js
/**
* Deduces a simple data type "descriptor from a typed array instance
*/
function getDataTypeFromTypedArray(array) {
	switch (array.constructor) {
		case Int8Array: return "int8";
		case Uint8Array:
		case Uint8ClampedArray: return "uint8";
		case Int16Array: return "int16";
		case Uint16Array: return "uint16";
		case Int32Array: return "int32";
		case Uint32Array: return "uint32";
		case Float32Array: return "float32";
		case Float64Array: return "float64";
		default: return "null";
	}
}
var init_data_type = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+schema@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/schema/dist/lib/mesh/mesh-utils.js
/**
* Get the (axis aligned) bounding box of a mesh
* @param attributes
* @returns array of two vectors representing the axis aligned bounding box
*/
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
	return [[
		minX,
		minY,
		minZ
	], [
		maxX,
		maxY,
		maxZ
	]];
}
var init_mesh_utils = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+schema@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/schema/dist/lib/mesh/deduce-mesh-schema.js
/**
* Create arrow-like schema field for mesh attribute
* @param attributeName
* @param attribute
* @param optionalMetadata
* @returns
*/
function deduceMeshField(name, attribute, optionalMetadata) {
	const type = getDataTypeFromTypedArray(attribute.value);
	const metadata = optionalMetadata ? optionalMetadata : makeMeshAttributeMetadata(attribute);
	return {
		name,
		type: {
			type: "fixed-size-list",
			listSize: attribute.size,
			children: [{
				name: "value",
				type
			}]
		},
		nullable: false,
		metadata
	};
}
/**
* Make metadata by mesh attribute properties
* @param attribute
* @returns
*/
function makeMeshAttributeMetadata(attribute) {
	const result = {};
	if ("byteOffset" in attribute) result.byteOffset = attribute.byteOffset.toString(10);
	if ("byteStride" in attribute) result.byteStride = attribute.byteStride.toString(10);
	if ("normalized" in attribute) result.normalized = attribute.normalized.toString();
	return result;
}
var init_deduce_mesh_schema = __esmMin((() => {
	init_data_type();
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+schema@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/schema/dist/index.js
var init_dist$2 = __esmMin((() => {
	init_mesh_utils();
	init_deduce_mesh_schema();
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+draco@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/draco/dist/lib/utils/get-draco-schema.js
/** Extract an arrow-like schema from a Draco mesh */
function getDracoSchema(attributes, loaderData, indices) {
	const metadata = makeMetadata(loaderData.metadata);
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
	return {
		fields,
		metadata
	};
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
	return deduceMeshField(attributeName, attribute, loaderData ? makeMetadata(loaderData.metadata) : void 0);
}
function makeMetadata(metadata) {
	Object.entries(metadata);
	const serializedMetadata = {};
	for (const key in metadata) serializedMetadata[`${key}.string`] = JSON.stringify(metadata[key]);
	return serializedMetadata;
}
var init_get_draco_schema = __esmMin((() => {
	init_dist$2();
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+draco@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/draco/dist/lib/draco-parser.js
/**
* Get draco specific data type by TypedArray constructor type
* @param attributeType
* @returns draco specific data type
*/
function getDracoDataType(draco, attributeType) {
	switch (attributeType) {
		case Float32Array: return draco.DT_FLOAT32;
		case Int8Array: return draco.DT_INT8;
		case Int16Array: return draco.DT_INT16;
		case Int32Array: return draco.DT_INT32;
		case Uint8Array: return draco.DT_UINT8;
		case Uint16Array: return draco.DT_UINT16;
		case Uint32Array: return draco.DT_UINT32;
		default: return draco.DT_INVALID;
	}
}
/**
* Copy a Draco int32 array into a JS typed array
*/
function getInt32Array(dracoArray) {
	const numValues = dracoArray.size();
	const intArray = new Int32Array(numValues);
	for (let i = 0; i < numValues; i++) intArray[i] = dracoArray.GetValue(i);
	return intArray;
}
/**
* Copy a Draco int32 array into a JS typed array
*/
function getUint32Array(dracoArray) {
	const numValues = dracoArray.size();
	const intArray = new Int32Array(numValues);
	for (let i = 0; i < numValues; i++) intArray[i] = dracoArray.GetValue(i);
	return intArray;
}
var DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP, DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP, INDEX_ITEM_SIZE, DracoParser;
var init_draco_parser = __esmMin((() => {
	init_dist$2();
	init_get_draco_schema();
	DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP = {
		POSITION: "POSITION",
		NORMAL: "NORMAL",
		COLOR: "COLOR_0",
		TEX_COORD: "TEXCOORD_0"
	};
	DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP = {
		1: Int8Array,
		2: Uint8Array,
		3: Int16Array,
		4: Uint16Array,
		5: Int32Array,
		6: Uint32Array,
		9: Float32Array
	};
	INDEX_ITEM_SIZE = 4;
	DracoParser = class {
		draco;
		decoder;
		metadataQuerier;
		constructor(draco) {
			this.draco = draco;
			this.decoder = new this.draco.Decoder();
			this.metadataQuerier = new this.draco.MetadataQuerier();
		}
		/**
		* Destroy draco resources
		*/
		destroy() {
			this.draco.destroy(this.decoder);
			this.draco.destroy(this.metadataQuerier);
		}
		/**
		* NOTE: caller must call `destroyGeometry` on the return value after using it
		* @param arrayBuffer
		* @param options
		*/
		parseSync(arrayBuffer, options = {}) {
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
					default: throw new Error("DRACO: Unknown geometry type.");
				}
				if (!dracoStatus.ok() || !dracoGeometry.ptr) {
					const message = `DRACO decompression failed: ${dracoStatus.error_msg()}`;
					throw new Error(message);
				}
				const loaderData = this._getDracoLoaderData(dracoGeometry, geometry_type, options);
				const geometry = this._getMeshData(dracoGeometry, loaderData, options);
				const boundingBox = getMeshBoundingBox(geometry.attributes);
				const schema = getDracoSchema(geometry.attributes, loaderData, geometry.indices);
				return {
					loader: "draco",
					loaderData,
					header: {
						vertexCount: dracoGeometry.num_points(),
						boundingBox
					},
					...geometry,
					schema
				};
			} finally {
				this.draco.destroy(buffer);
				if (dracoGeometry) this.draco.destroy(dracoGeometry);
			}
		}
		/**
		* Extract
		* @param dracoGeometry
		* @param geometry_type
		* @param options
		* @returns
		*/
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
		/**
		* Extract all draco provided information and metadata for each attribute
		* @param dracoGeometry
		* @param options
		* @returns
		*/
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
				if (quantization) dracoAttributes[dracoAttribute.unique_id()].quantization_transform = quantization;
				const octahedron = this._getOctahedronTransform(dracoAttribute, options);
				if (octahedron) dracoAttributes[dracoAttribute.unique_id()].octahedron_transform = octahedron;
			}
			return dracoAttributes;
		}
		/**
		* Get standard loaders.gl mesh category data
		* Extracts the geometry from draco
		* @param dracoGeometry
		* @param options
		*/
		_getMeshData(dracoGeometry, loaderData, options) {
			const attributes = this._getMeshAttributes(loaderData, dracoGeometry, options);
			if (!attributes.POSITION) throw new Error("DRACO: No position attribute found.");
			if (dracoGeometry instanceof this.draco.Mesh) switch (options.topology) {
				case "triangle-strip": return {
					topology: "triangle-strip",
					mode: 4,
					attributes,
					indices: {
						value: this._getTriangleStripIndices(dracoGeometry),
						size: 1
					}
				};
				default: return {
					topology: "triangle-list",
					mode: 5,
					attributes,
					indices: {
						value: this._getTriangleListIndices(dracoGeometry),
						size: 1
					}
				};
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
				const values = this._getAttributeValues(dracoGeometry, loaderAttribute);
				if (values) {
					const { value, size } = values;
					attributes[attributeName] = {
						value,
						size,
						byteOffset: loaderAttribute.byte_offset,
						byteStride: loaderAttribute.byte_stride,
						normalized: loaderAttribute.normalized
					};
				}
			}
			return attributes;
		}
		/**
		* For meshes, we need indices to define the faces.
		* @param dracoGeometry
		*/
		_getTriangleListIndices(dracoGeometry) {
			const numIndices = dracoGeometry.num_faces() * 3;
			const byteLength = numIndices * INDEX_ITEM_SIZE;
			const ptr = this.draco._malloc(byteLength);
			try {
				this.decoder.GetTrianglesUInt32Array(dracoGeometry, byteLength, ptr);
				return new Uint32Array(this.draco.HEAPF32.buffer, ptr, numIndices).slice();
			} finally {
				this.draco._free(ptr);
			}
		}
		/**
		* For meshes, we need indices to define the faces.
		* @param dracoGeometry
		*/
		_getTriangleStripIndices(dracoGeometry) {
			const dracoArray = new this.draco.DracoInt32Array();
			try {
				this.decoder.GetTriangleStripsFromMesh(dracoGeometry, dracoArray);
				return getUint32Array(dracoArray);
			} finally {
				this.draco.destroy(dracoArray);
			}
		}
		/**
		*
		* @param dracoGeometry
		* @param dracoAttribute
		* @param attributeName
		*/
		_getAttributeValues(dracoGeometry, attribute) {
			const TypedArrayCtor = DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP[attribute.data_type];
			if (!TypedArrayCtor) {
				console.warn(`DRACO: Unsupported attribute type ${attribute.data_type}`);
				return null;
			}
			const numComponents = attribute.num_components;
			const numValues = dracoGeometry.num_points() * numComponents;
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
		/**
		* DRACO does not store attribute names - We need to deduce an attribute name
		* for each attribute
		_getAttributeNames(
		dracoGeometry: Mesh | PointCloud,
		options: DracoParseOptions
		): {[unique_id: number]: string} {
		const attributeNames: {[unique_id: number]: string} = {};
		for (let attributeId = 0; attributeId < dracoGeometry.num_attributes(); attributeId++) {
		const dracoAttribute = this.decoder.GetAttribute(dracoGeometry, attributeId);
		const attributeName = this._deduceAttributeName(dracoAttribute, options);
		attributeNames[attributeName] = attributeName;
		}
		return attributeNames;
		}
		*/
		/**
		* Deduce an attribute name.
		* @note DRACO does not save attribute names, just general type (POSITION, COLOR)
		* to help optimize compression. We generate GLTF compatible names for the Draco-recognized
		* types
		* @param attributeData
		*/
		_deduceAttributeName(attribute, options) {
			const uniqueId = attribute.unique_id;
			for (const [attributeName, attributeUniqueId] of Object.entries(options.extraAttributes || {})) if (attributeUniqueId === uniqueId) return attributeName;
			const thisAttributeType = attribute.attribute_type;
			for (const dracoAttributeConstant in DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP) if (this.draco[dracoAttributeConstant] === thisAttributeType) return DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP[dracoAttributeConstant];
			const entryName = options.attributeNameEntry || "name";
			if (attribute.metadata[entryName]) return attribute.metadata[entryName].string;
			return `CUSTOM_ATTRIBUTE_${uniqueId}`;
		}
		/** Get top level metadata */
		_getTopLevelMetadata(dracoGeometry) {
			const dracoMetadata = this.decoder.GetMetadata(dracoGeometry);
			return this._getDracoMetadata(dracoMetadata);
		}
		/** Get per attribute metadata */
		_getAttributeMetadata(dracoGeometry, attributeId) {
			const dracoMetadata = this.decoder.GetAttributeMetadata(dracoGeometry, attributeId);
			return this._getDracoMetadata(dracoMetadata);
		}
		/**
		* Extract metadata field values
		* @param dracoMetadata
		* @returns
		*/
		_getDracoMetadata(dracoMetadata) {
			if (!dracoMetadata || !dracoMetadata.ptr) return {};
			const result = {};
			const numEntries = this.metadataQuerier.NumEntries(dracoMetadata);
			for (let entryIndex = 0; entryIndex < numEntries; entryIndex++) {
				const entryName = this.metadataQuerier.GetEntryName(dracoMetadata, entryIndex);
				result[entryName] = this._getDracoMetadataField(dracoMetadata, entryName);
			}
			return result;
		}
		/**
		* Extracts possible values for one metadata entry by name
		* @param dracoMetadata
		* @param entryName
		*/
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
		/** Skip transforms for specific attribute types */
		_disableAttributeTransforms(options) {
			const { quantizedAttributes = [], octahedronAttributes = [] } = options;
			const skipAttributes = [...quantizedAttributes, ...octahedronAttributes];
			for (const dracoAttributeName of skipAttributes) this.decoder.SkipAttributeTransform(this.draco[dracoAttributeName]);
		}
		/**
		* Extract (and apply?) Position Transform
		* @todo not used
		*/
		_getQuantizationTransform(dracoAttribute, options) {
			const { quantizedAttributes = [] } = options;
			const attribute_type = dracoAttribute.attribute_type();
			if (quantizedAttributes.map((type) => this.decoder[type]).includes(attribute_type)) {
				const transform = new this.draco.AttributeQuantizationTransform();
				try {
					if (transform.InitFromAttribute(dracoAttribute)) return {
						quantization_bits: transform.quantization_bits(),
						range: transform.range(),
						min_values: new Float32Array([
							1,
							2,
							3
						]).map((i) => transform.min_value(i))
					};
				} finally {
					this.draco.destroy(transform);
				}
			}
			return null;
		}
		_getOctahedronTransform(dracoAttribute, options) {
			const { octahedronAttributes = [] } = options;
			const attribute_type = dracoAttribute.attribute_type();
			if (octahedronAttributes.map((type) => this.decoder[type]).includes(attribute_type)) {
				const transform = new this.draco.AttributeQuantizationTransform();
				try {
					if (transform.InitFromAttribute(dracoAttribute)) return { quantization_bits: transform.quantization_bits() };
				} finally {
					this.draco.destroy(transform);
				}
			}
			return null;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+worker-utils@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/version.js
function getVersion() {
	if (!globalThis._loadersgl_?.version) {
		globalThis._loadersgl_ = globalThis._loadersgl_ || {};
		globalThis._loadersgl_.version = "4.3.3";
	}
	return globalThis._loadersgl_.version;
}
var VERSION;
var init_version = __esmMin((() => {
	VERSION = getVersion();
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+worker-utils@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/worker-utils/dist/lib/env-utils/assert.js
/** Throws an `Error` with the optional `message` if `condition` is falsy */
function assert(condition, message) {
	if (!condition) throw new Error(message || "loaders.gl assertion failed.");
}
var init_assert = __esmMin((() => {})), globals, isBrowser, isWorker, matches;
var init_globals = __esmMin((() => {
	globals = {
		self: typeof self !== "undefined" && self,
		window: typeof window !== "undefined" && window,
		global: typeof global !== "undefined" && global,
		document: typeof document !== "undefined" && document
	};
	globals.self || globals.window || globals.global;
	globals.window || globals.self || globals.global;
	globals.global || globals.self || globals.window;
	globals.document;
	isBrowser = typeof process !== "object" || String(process) !== "[object process]" || process.browser;
	isWorker = typeof importScripts === "function";
	typeof window !== "undefined" && window.orientation;
	matches = typeof process !== "undefined" && process.version && /v([0-9]*)/.exec(process.version);
	matches && parseFloat(matches[1]);
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+worker-utils@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/worker-utils/dist/lib/library-utils/library-utils.js
/**
* Dynamically loads a library ("module")
*
* - wasm library: Array buffer is returned
* - js library: Parse JS is returned
*
* Method depends on environment
* - browser - script element is created and installed on document
* - worker - eval is called on global context
* - node - file is required
*
* @param libraryUrl
* @param moduleName
* @param options
*/
async function loadLibrary(libraryUrl, moduleName = null, options = {}, libraryName = null) {
	if (moduleName) libraryUrl = getLibraryUrl(libraryUrl, moduleName, options, libraryName);
	loadLibraryPromises[libraryUrl] = loadLibraryPromises[libraryUrl] || loadLibraryFromFile(libraryUrl);
	return await loadLibraryPromises[libraryUrl];
}
function getLibraryUrl(library, moduleName, options = {}, libraryName = null) {
	if (!options.useLocalLibraries && library.startsWith("http")) return library;
	libraryName = libraryName || library;
	const modules = options.modules || {};
	if (modules[libraryName]) return modules[libraryName];
	if (!isBrowser) return `modules/${moduleName}/dist/libs/${libraryName}`;
	if (options.CDN) {
		assert(options.CDN.startsWith("http"));
		return `${options.CDN}/${moduleName}@${VERSION}/dist/libs/${libraryName}`;
	}
	if (isWorker) return `../src/libs/${libraryName}`;
	return `modules/${moduleName}/src/libs/${libraryName}`;
}
async function loadLibraryFromFile(libraryUrl) {
	if (libraryUrl.endsWith("wasm")) return await loadAsArrayBuffer(libraryUrl);
	if (!isBrowser) try {
		const { requireFromFile } = globalThis.loaders || {};
		return await requireFromFile?.(libraryUrl);
	} catch (error) {
		console.error(error);
		return null;
	}
	if (isWorker) return importScripts(libraryUrl);
	return loadLibraryFromString(await loadAsText(libraryUrl), libraryUrl);
}
function loadLibraryFromString(scriptSource, id) {
	if (!isBrowser) {
		const { requireFromString } = globalThis.loaders || {};
		return requireFromString?.(scriptSource, id);
	}
	if (isWorker) {
		eval.call(globalThis, scriptSource);
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
async function loadAsArrayBuffer(url) {
	const { readFileAsArrayBuffer } = globalThis.loaders || {};
	if (isBrowser || !readFileAsArrayBuffer || url.startsWith("http")) return await (await fetch(url)).arrayBuffer();
	return await readFileAsArrayBuffer(url);
}
/**
* Load a file from local file system
* @param filename
* @returns
*/
async function loadAsText(url) {
	const { readFileAsText } = globalThis.loaders || {};
	if (isBrowser || !readFileAsText || url.startsWith("http")) return await (await fetch(url)).text();
	return await readFileAsText(url);
}
var loadLibraryPromises;
var init_library_utils = __esmMin((() => {
	init_globals();
	init_assert();
	init_version();
	loadLibraryPromises = {};
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+worker-utils@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/worker-utils/dist/index.js
var init_dist$1 = __esmMin((() => {
	init_globals();
	init_version();
	init_library_utils();
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+draco@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/draco/dist/lib/draco-module-loader.js
async function loadDracoDecoderModule(options) {
	const modules = options.modules || {};
	if (modules.draco3d) loadDecoderPromise ||= modules.draco3d.createDecoderModule({}).then((draco) => {
		return { draco };
	});
	else loadDecoderPromise ||= loadDracoDecoder(options);
	return await loadDecoderPromise;
}
async function loadDracoDecoder(options) {
	let DracoDecoderModule;
	let wasmBinary;
	switch (options.draco && options.draco.decoderType) {
		case "js":
			DracoDecoderModule = await loadLibrary(DRACO_EXTERNAL_LIBRARY_URLS[DRACO_EXTERNAL_LIBRARIES.FALLBACK_DECODER], "draco", options, DRACO_EXTERNAL_LIBRARIES.FALLBACK_DECODER);
			break;
		default: [DracoDecoderModule, wasmBinary] = await Promise.all([await loadLibrary(DRACO_EXTERNAL_LIBRARY_URLS[DRACO_EXTERNAL_LIBRARIES.DECODER], "draco", options, DRACO_EXTERNAL_LIBRARIES.DECODER), await loadLibrary(DRACO_EXTERNAL_LIBRARY_URLS[DRACO_EXTERNAL_LIBRARIES.DECODER_WASM], "draco", options, DRACO_EXTERNAL_LIBRARIES.DECODER_WASM)]);
	}
	DracoDecoderModule = DracoDecoderModule || globalThis.DracoDecoderModule;
	return await initializeDracoDecoder(DracoDecoderModule, wasmBinary);
}
function initializeDracoDecoder(DracoDecoderModule, wasmBinary) {
	const options = {};
	if (wasmBinary) options.wasmBinary = wasmBinary;
	return new Promise((resolve) => {
		DracoDecoderModule({
			...options,
			onModuleLoaded: (draco) => resolve({ draco })
		});
	});
}
var DRACO_DECODER_VERSION, DRACO_ENCODER_VERSION, STATIC_DECODER_URL, DRACO_EXTERNAL_LIBRARIES, DRACO_EXTERNAL_LIBRARY_URLS, loadDecoderPromise;
var init_draco_module_loader = __esmMin((() => {
	init_dist$1();
	DRACO_DECODER_VERSION = "1.5.6";
	DRACO_ENCODER_VERSION = "1.4.1";
	STATIC_DECODER_URL = `https://www.gstatic.com/draco/versioned/decoders/${DRACO_DECODER_VERSION}`;
	DRACO_EXTERNAL_LIBRARIES = {
		/** The primary Draco3D encoder, javascript wrapper part */
		DECODER: "draco_wasm_wrapper.js",
		/** The primary draco decoder, compiled web assembly part */
		DECODER_WASM: "draco_decoder.wasm",
		/** Fallback decoder for non-webassebly environments. Very big bundle, lower performance */
		FALLBACK_DECODER: "draco_decoder.js",
		/** Draco encoder */
		ENCODER: "draco_encoder.js"
	};
	DRACO_EXTERNAL_LIBRARY_URLS = {
		[DRACO_EXTERNAL_LIBRARIES.DECODER]: `${STATIC_DECODER_URL}/${DRACO_EXTERNAL_LIBRARIES.DECODER}`,
		[DRACO_EXTERNAL_LIBRARIES.DECODER_WASM]: `${STATIC_DECODER_URL}/${DRACO_EXTERNAL_LIBRARIES.DECODER_WASM}`,
		[DRACO_EXTERNAL_LIBRARIES.FALLBACK_DECODER]: `${STATIC_DECODER_URL}/${DRACO_EXTERNAL_LIBRARIES.FALLBACK_DECODER}`,
		[DRACO_EXTERNAL_LIBRARIES.ENCODER]: `https://raw.githubusercontent.com/google/draco/${DRACO_ENCODER_VERSION}/javascript/${DRACO_EXTERNAL_LIBRARIES.ENCODER}`
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@loaders.gl+draco@4.3.4_@loaders.gl+core@4.3.4/node_modules/@loaders.gl/draco/dist/index.js
async function parse(arrayBuffer, options) {
	const { draco } = await loadDracoDecoderModule(options);
	const dracoParser = new DracoParser(draco);
	try {
		return dracoParser.parseSync(arrayBuffer, options?.draco);
	} finally {
		dracoParser.destroy();
	}
}
var DracoLoader;
//#endregion
__esmMin((() => {
	init_draco_loader();
	init_draco_parser();
	init_draco_module_loader();
	init_version$1();
	DracoLoader = {
		...DracoLoader$1,
		parse
	};
}))();
export { DracoLoader };
