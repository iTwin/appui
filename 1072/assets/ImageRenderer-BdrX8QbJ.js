import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { K as UiCore, L as enablePatches, j as Icon, P as WebFontIcon, Q as UiError } from "./appui-react-Cfb3yxNv.js";
import { L as Logger } from "./Dialog-1en_A-Pg.js";
const _UiComponents = class _UiComponents {
  /**
   * Registers the localization service namespace for UiComponents. Also initializes UiCore.
   * @param localization The internationalization service created by the host application.
   */
  static async initialize(localization) {
    if (_UiComponents._initialized) {
      Logger.logInfo(
        _UiComponents.loggerCategory("UiComponents"),
        `UiComponents.initialize already called`
      );
      return;
    }
    enablePatches();
    _UiComponents._localization = localization;
    await _UiComponents._localization.registerNamespace(
      _UiComponents.localizationNamespace
    );
    await UiCore.initialize(_UiComponents._localization);
    _UiComponents._initialized = true;
  }
  /** Unregisters the UiComponents localization namespace */
  static terminate() {
    if (_UiComponents._localization)
      _UiComponents._localization.unregisterNamespace(
        _UiComponents.localizationNamespace
      );
    _UiComponents._localization = void 0;
    UiCore.terminate();
    _UiComponents._initialized = false;
  }
  /** Determines if UiComponents has been initialized */
  static get initialized() {
    return _UiComponents._initialized;
  }
  /** The internationalization service namespace. */
  static get localizationNamespace() {
    return "UiComponents";
  }
  /** @internal */
  static get packageName() {
    return "components-react";
  }
  /** Calls localization.getLocalizedString with the "UiComponents" namespace. Do NOT include the namespace in the key.
   * @internal
   */
  static translate(key) {
    if (!_UiComponents._localization) {
      Logger.logError(
        _UiComponents.loggerCategory("UiComponents"),
        `translate: UiComponents.initialize has not been called. Returning blank string.`
      );
      return "";
    }
    return _UiComponents._localization.getLocalizedString(
      `${_UiComponents.localizationNamespace}:${key}`
    );
  }
  /** @internal */
  static loggerCategory(name) {
    return `${_UiComponents.packageName}.${name}`;
  }
};
_UiComponents._initialized = false;
let UiComponents = _UiComponents;
const _ImageRenderer = class _ImageRenderer {
  hexToBase64(hexstring) {
    const match = hexstring.match(/\w{2}/g);
    if (!match) return "";
    return window.btoa(
      match.map((a) => {
        return String.fromCharCode(parseInt(a, 16));
      }).join("")
    );
  }
  /** Render raw binary image */
  renderBinary(data, format) {
    const dataAsBase64 = this.hexToBase64(data);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `data:image/${format};base64,${dataAsBase64}`, alt: "" });
  }
  isSvg(input) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "application/xml");
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
      return false;
    }
    const rootNode = doc.documentElement.nodeName.toLowerCase();
    return "svg" === rootNode;
  }
  convertSvgToDataUri(svg) {
    if (!this.isSvg(svg)) {
      return "";
    }
    const svgAsBase64 = window.btoa(svg);
    return `data:image/svg+xml;base64,${svgAsBase64}`;
  }
  /** Render svg string into JSX */
  renderSvg(svg) {
    let svgAsDataUri = _ImageRenderer._svgCache.get(svg);
    if (void 0 === svgAsDataUri) {
      svgAsDataUri = this.convertSvgToDataUri(svg.trim());
      _ImageRenderer._svgCache.set(svg, svgAsDataUri);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: svgAsDataUri }) });
  }
  /** Render image from an url */
  renderUrl(url) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "" });
  }
  /** Render image as core-react icon */
  renderCoreIcon(iconName) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(WebFontIcon, { iconName });
  }
  /** Replaces the escaped instances of "\:" with ":" */
  normalizeEscapedIconString(escapedIconString) {
    return escapedIconString.replace(/\\:/g, ":");
  }
  /**
   * Extract class and name from icon name, if the name follows format "{className}:{fontName}".
   * className and fontName can be escaped using \ if : is needed.
   */
  extractIconClassAndName(iconName) {
    const matches = iconName.match(/(\\.|[^:])+/g);
    if (!matches || matches.length !== 2)
      return {
        iconClassName: void 0,
        iconName
      };
    return {
      iconClassName: this.normalizeEscapedIconString(matches[0]),
      iconName: this.normalizeEscapedIconString(matches[1])
    };
  }
  /**
   * Render image as provided webfont icon.
   * Defaults to core-react icon if iconName does not contain className.
   */
  renderWebfontIcon(iconName) {
    const iconInfo = this.extractIconClassAndName(iconName);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(WebFontIcon, { ...iconInfo });
  }
  /** Render image from data provided by an image loader */
  render(loadedImage) {
    switch (loadedImage.sourceType) {
      case "binary":
        const image = loadedImage;
        return this.renderBinary(image.value, image.fileFormat);
      case "url":
        return this.renderUrl(loadedImage.value);
      case "svg":
        return this.renderSvg(loadedImage.value);
      case "core-icon":
        return this.renderCoreIcon(loadedImage.value);
      case "webfont-icon":
        return this.renderWebfontIcon(loadedImage.value);
      default:
        const unhandledSourceType = loadedImage.sourceType;
        throw new UiError(
          UiComponents.loggerCategory("ImageRenderer"),
          `Can't handle sourceType: "${unhandledSourceType}"`
        );
    }
  }
};
_ImageRenderer._svgCache = /* @__PURE__ */ new Map();
let ImageRenderer = _ImageRenderer;
export {
  ImageRenderer as I,
  UiComponents as U
};
