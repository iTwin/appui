import { d as dedent } from "./index-BdOSk9or.js";
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var StorybookError = class extends Error {
  constructor() {
    super(...arguments);
    this.data = {};
    this.documentation = false;
    this.fromStorybook = true;
  }
  get fullErrorCode() {
    let paddedCode = String(this.code).padStart(4, "0");
    return `SB_${this.category}_${paddedCode}`;
  }
  get name() {
    let errorName = this.constructor.name;
    return `${this.fullErrorCode} (${errorName})`;
  }
  get message() {
    let page;
    return this.documentation === true ? page = `https://storybook.js.org/error/${this.fullErrorCode}` : typeof this.documentation == "string" ? page = this.documentation : Array.isArray(this.documentation) && (page = `
${this.documentation.map((doc) => `	- ${doc}`).join(`
`)}`), `${this.template()}${page != null ? `

More info: ${page}
` : ""}`;
  }
};
var Category = ((Category2) => (Category2.PREVIEW_CLIENT_LOGGER = "PREVIEW_CLIENT-LOGGER", Category2.PREVIEW_CHANNELS = "PREVIEW_CHANNELS", Category2.PREVIEW_CORE_EVENTS = "PREVIEW_CORE-EVENTS", Category2.PREVIEW_INSTRUMENTER = "PREVIEW_INSTRUMENTER", Category2.PREVIEW_API = "PREVIEW_API", Category2.PREVIEW_REACT_DOM_SHIM = "PREVIEW_REACT-DOM-SHIM", Category2.PREVIEW_ROUTER = "PREVIEW_ROUTER", Category2.PREVIEW_THEMING = "PREVIEW_THEMING", Category2.RENDERER_HTML = "RENDERER_HTML", Category2.RENDERER_PREACT = "RENDERER_PREACT", Category2.RENDERER_REACT = "RENDERER_REACT", Category2.RENDERER_SERVER = "RENDERER_SERVER", Category2.RENDERER_SVELTE = "RENDERER_SVELTE", Category2.RENDERER_VUE = "RENDERER_VUE", Category2.RENDERER_VUE3 = "RENDERER_VUE3", Category2.RENDERER_WEB_COMPONENTS = "RENDERER_WEB-COMPONENTS", Category2))(Category || {}), ImplicitActionsDuringRendering = class extends StorybookError {
  constructor(data) {
    super();
    this.data = data;
    this.category = "PREVIEW_API";
    this.code = 2;
    this.documentation = "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function";
  }
  template() {
    return dedent`
      We detected that you use an implicit action arg during ${this.data.phase} of your story.  
      ${this.data.deprecated ? `
This is deprecated and won't work in Storybook 8 anymore.
` : ""}
      Please provide an explicit spy to your args like this:
        import { fn } from '@storybook/test';
        ... 
        args: {
         ${this.data.name}: fn()
        }
    `;
  }
};
export {
  ImplicitActionsDuringRendering as I,
  v4 as v
};
