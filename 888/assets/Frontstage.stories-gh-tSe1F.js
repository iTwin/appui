var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { cD as reactIsExports, cE as LineSegment3d, cF as Point3d, i as StagePanelLocation, W as WidgetState, g as StagePanelState, j as StagePanelSection } from "./DefaultToolSettingsProvider-DIShliKp.js";
import { c as commonjsGlobal, g as getDefaultExportFromCjs } from "./_commonjsHelpers-LQfde5yM.js";
import { b as require$$0, c as createFrontstage, A as AppUiStory, P as Page, r as removeProperty } from "./AppUiStory-nqk_Q9zz.js";
import { d as dedent } from "./index-BdOSk9or.js";
import "./Key.enum-BpJjJDFT.js";
import "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import { A as AppUiDecorator } from "./Decorators-CzmLt7AA.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./iframe-pWcJHFO-.js";
import "../sb-preview/runtime.js";
import "./index-B47T7vRo.js";
import "./index-CUkxFfN0.js";
import "./index-Cp4dr_sK.js";
import "./index-ex9_VrIg.js";
import "./DemoIModel-DuWsADYF.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var build$1 = {};
var ansiStyles = { exports: {} };
ansiStyles.exports;
(function(module2) {
  const ANSI_BACKGROUND_OFFSET = 10;
  const wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
  const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
  function assembleStyles() {
    const codes = /* @__PURE__ */ new Map();
    const styles = {
      modifier: {
        reset: [0, 0],
        // 21 isn't widely supported and 22 does the same thing
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        // Bright color
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        // Bright color
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    styles.color.gray = styles.color.blackBright;
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    styles.color.grey = styles.color.blackBright;
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles, "codes", {
      value: codes,
      enumerable: false
    });
    styles.color.close = "\x1B[39m";
    styles.bgColor.close = "\x1B[49m";
    styles.color.ansi256 = wrapAnsi256();
    styles.color.ansi16m = wrapAnsi16m();
    styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
    styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
    Object.defineProperties(styles, {
      rgbToAnsi256: {
        value: (red, green, blue) => {
          if (red === green && green === blue) {
            if (red < 8) {
              return 16;
            }
            if (red > 248) {
              return 231;
            }
            return Math.round((red - 8) / 247 * 24) + 232;
          }
          return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
        },
        enumerable: false
      },
      hexToRgb: {
        value: (hex) => {
          const matches2 = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
          if (!matches2) {
            return [0, 0, 0];
          }
          let { colorString } = matches2.groups;
          if (colorString.length === 3) {
            colorString = colorString.split("").map((character) => character + character).join("");
          }
          const integer = Number.parseInt(colorString, 16);
          return [
            integer >> 16 & 255,
            integer >> 8 & 255,
            integer & 255
          ];
        },
        enumerable: false
      },
      hexToAnsi256: {
        value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
        enumerable: false
      }
    });
    return styles;
  }
  Object.defineProperty(module2, "exports", {
    enumerable: true,
    get: assembleStyles
  });
})(ansiStyles);
var ansiStylesExports = ansiStyles.exports;
var collections = {};
Object.defineProperty(collections, "__esModule", {
  value: true
});
collections.printIteratorEntries = printIteratorEntries;
collections.printIteratorValues = printIteratorValues;
collections.printListItems = printListItems;
collections.printObjectProperties = printObjectProperties;
const getKeysOfEnumerableProperties = (object, compareKeys) => {
  const keys8 = Object.keys(object).sort(compareKeys);
  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(object).forEach((symbol) => {
      if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
        keys8.push(symbol);
      }
    });
  }
  return keys8;
};
function printIteratorEntries(iterator, config2, indentation, depth, refs, printer2, separator = ": ") {
  let result = "";
  let current = iterator.next();
  if (!current.done) {
    result += config2.spacingOuter;
    const indentationNext = indentation + config2.indent;
    while (!current.done) {
      const name = printer2(
        current.value[0],
        config2,
        indentationNext,
        depth,
        refs
      );
      const value = printer2(
        current.value[1],
        config2,
        indentationNext,
        depth,
        refs
      );
      result += indentationNext + name + separator + value;
      current = iterator.next();
      if (!current.done) {
        result += "," + config2.spacingInner;
      } else if (!config2.min) {
        result += ",";
      }
    }
    result += config2.spacingOuter + indentation;
  }
  return result;
}
function printIteratorValues(iterator, config2, indentation, depth, refs, printer2) {
  let result = "";
  let current = iterator.next();
  if (!current.done) {
    result += config2.spacingOuter;
    const indentationNext = indentation + config2.indent;
    while (!current.done) {
      result += indentationNext + printer2(current.value, config2, indentationNext, depth, refs);
      current = iterator.next();
      if (!current.done) {
        result += "," + config2.spacingInner;
      } else if (!config2.min) {
        result += ",";
      }
    }
    result += config2.spacingOuter + indentation;
  }
  return result;
}
function printListItems(list, config2, indentation, depth, refs, printer2) {
  let result = "";
  if (list.length) {
    result += config2.spacingOuter;
    const indentationNext = indentation + config2.indent;
    for (let i = 0; i < list.length; i++) {
      result += indentationNext;
      if (i in list) {
        result += printer2(list[i], config2, indentationNext, depth, refs);
      }
      if (i < list.length - 1) {
        result += "," + config2.spacingInner;
      } else if (!config2.min) {
        result += ",";
      }
    }
    result += config2.spacingOuter + indentation;
  }
  return result;
}
function printObjectProperties(val, config2, indentation, depth, refs, printer2) {
  let result = "";
  const keys8 = getKeysOfEnumerableProperties(val, config2.compareKeys);
  if (keys8.length) {
    result += config2.spacingOuter;
    const indentationNext = indentation + config2.indent;
    for (let i = 0; i < keys8.length; i++) {
      const key = keys8[i];
      const name = printer2(key, config2, indentationNext, depth, refs);
      const value = printer2(val[key], config2, indentationNext, depth, refs);
      result += indentationNext + name + ": " + value;
      if (i < keys8.length - 1) {
        result += "," + config2.spacingInner;
      } else if (!config2.min) {
        result += ",";
      }
    }
    result += config2.spacingOuter + indentation;
  }
  return result;
}
var AsymmetricMatcher = {};
Object.defineProperty(AsymmetricMatcher, "__esModule", {
  value: true
});
AsymmetricMatcher.test = AsymmetricMatcher.serialize = AsymmetricMatcher.default = void 0;
var _collections$3 = collections;
var global$2 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  } else if (typeof global$2 !== "undefined") {
    return global$2;
  } else if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
}();
var Symbol$2 = global$2["jest-symbol-do-not-touch"] || global$2.Symbol;
const asymmetricMatcher = typeof Symbol$2 === "function" && Symbol$2.for ? Symbol$2.for("jest.asymmetricMatcher") : 1267621;
const SPACE$2 = " ";
const serialize$6 = (val, config2, indentation, depth, refs, printer2) => {
  const stringedValue = val.toString();
  if (stringedValue === "ArrayContaining" || stringedValue === "ArrayNotContaining") {
    if (++depth > config2.maxDepth) {
      return "[" + stringedValue + "]";
    }
    return stringedValue + SPACE$2 + "[" + (0, _collections$3.printListItems)(
      val.sample,
      config2,
      indentation,
      depth,
      refs,
      printer2
    ) + "]";
  }
  if (stringedValue === "ObjectContaining" || stringedValue === "ObjectNotContaining") {
    if (++depth > config2.maxDepth) {
      return "[" + stringedValue + "]";
    }
    return stringedValue + SPACE$2 + "{" + (0, _collections$3.printObjectProperties)(
      val.sample,
      config2,
      indentation,
      depth,
      refs,
      printer2
    ) + "}";
  }
  if (stringedValue === "StringMatching" || stringedValue === "StringNotMatching") {
    return stringedValue + SPACE$2 + printer2(val.sample, config2, indentation, depth, refs);
  }
  if (stringedValue === "StringContaining" || stringedValue === "StringNotContaining") {
    return stringedValue + SPACE$2 + printer2(val.sample, config2, indentation, depth, refs);
  }
  return val.toAsymmetricMatcher();
};
AsymmetricMatcher.serialize = serialize$6;
const test$7 = (val) => val && val.$$typeof === asymmetricMatcher;
AsymmetricMatcher.test = test$7;
const plugin$6 = {
  serialize: serialize$6,
  test: test$7
};
var _default$2p = plugin$6;
AsymmetricMatcher.default = _default$2p;
var ConvertAnsi = {};
var ansiRegex = ({ onlyFirst = false } = {}) => {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
};
Object.defineProperty(ConvertAnsi, "__esModule", {
  value: true
});
ConvertAnsi.test = ConvertAnsi.serialize = ConvertAnsi.default = void 0;
var _ansiRegex = _interopRequireDefault$d(ansiRegex);
var _ansiStyles$1 = _interopRequireDefault$d(ansiStylesExports);
function _interopRequireDefault$d(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const toHumanReadableAnsi = (text) => text.replace((0, _ansiRegex.default)(), (match) => {
  switch (match) {
    case _ansiStyles$1.default.red.close:
    case _ansiStyles$1.default.green.close:
    case _ansiStyles$1.default.cyan.close:
    case _ansiStyles$1.default.gray.close:
    case _ansiStyles$1.default.white.close:
    case _ansiStyles$1.default.yellow.close:
    case _ansiStyles$1.default.bgRed.close:
    case _ansiStyles$1.default.bgGreen.close:
    case _ansiStyles$1.default.bgYellow.close:
    case _ansiStyles$1.default.inverse.close:
    case _ansiStyles$1.default.dim.close:
    case _ansiStyles$1.default.bold.close:
    case _ansiStyles$1.default.reset.open:
    case _ansiStyles$1.default.reset.close:
      return "</>";
    case _ansiStyles$1.default.red.open:
      return "<red>";
    case _ansiStyles$1.default.green.open:
      return "<green>";
    case _ansiStyles$1.default.cyan.open:
      return "<cyan>";
    case _ansiStyles$1.default.gray.open:
      return "<gray>";
    case _ansiStyles$1.default.white.open:
      return "<white>";
    case _ansiStyles$1.default.yellow.open:
      return "<yellow>";
    case _ansiStyles$1.default.bgRed.open:
      return "<bgRed>";
    case _ansiStyles$1.default.bgGreen.open:
      return "<bgGreen>";
    case _ansiStyles$1.default.bgYellow.open:
      return "<bgYellow>";
    case _ansiStyles$1.default.inverse.open:
      return "<inverse>";
    case _ansiStyles$1.default.dim.open:
      return "<dim>";
    case _ansiStyles$1.default.bold.open:
      return "<bold>";
    default:
      return "";
  }
});
const test$6 = (val) => typeof val === "string" && !!val.match((0, _ansiRegex.default)());
ConvertAnsi.test = test$6;
const serialize$5 = (val, config2, indentation, depth, refs, printer2) => printer2(toHumanReadableAnsi(val), config2, indentation, depth, refs);
ConvertAnsi.serialize = serialize$5;
const plugin$5 = {
  serialize: serialize$5,
  test: test$6
};
var _default$2o = plugin$5;
ConvertAnsi.default = _default$2o;
var DOMCollection$1 = {};
Object.defineProperty(DOMCollection$1, "__esModule", {
  value: true
});
DOMCollection$1.test = DOMCollection$1.serialize = DOMCollection$1.default = void 0;
var _collections$2 = collections;
const SPACE$1 = " ";
const OBJECT_NAMES = ["DOMStringMap", "NamedNodeMap"];
const ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;
const testName = (name) => OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
const test$5 = (val) => val && val.constructor && !!val.constructor.name && testName(val.constructor.name);
DOMCollection$1.test = test$5;
const isNamedNodeMap = (collection) => collection.constructor.name === "NamedNodeMap";
const serialize$4 = (collection, config2, indentation, depth, refs, printer2) => {
  const name = collection.constructor.name;
  if (++depth > config2.maxDepth) {
    return "[" + name + "]";
  }
  return (config2.min ? "" : name + SPACE$1) + (OBJECT_NAMES.indexOf(name) !== -1 ? "{" + (0, _collections$2.printObjectProperties)(
    isNamedNodeMap(collection) ? Array.from(collection).reduce((props, attribute) => {
      props[attribute.name] = attribute.value;
      return props;
    }, {}) : { ...collection },
    config2,
    indentation,
    depth,
    refs,
    printer2
  ) + "}" : "[" + (0, _collections$2.printListItems)(
    Array.from(collection),
    config2,
    indentation,
    depth,
    refs,
    printer2
  ) + "]");
};
DOMCollection$1.serialize = serialize$4;
const plugin$4 = {
  serialize: serialize$4,
  test: test$5
};
var _default$2n = plugin$4;
DOMCollection$1.default = _default$2n;
var DOMElement = {};
var markup = {};
var escapeHTML$2 = {};
Object.defineProperty(escapeHTML$2, "__esModule", {
  value: true
});
escapeHTML$2.default = escapeHTML$1;
function escapeHTML$1(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
Object.defineProperty(markup, "__esModule", {
  value: true
});
markup.printText = markup.printProps = markup.printElementAsLeaf = markup.printElement = markup.printComment = markup.printChildren = void 0;
var _escapeHTML = _interopRequireDefault$c(escapeHTML$2);
function _interopRequireDefault$c(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const printProps$1 = (keys8, props, config2, indentation, depth, refs, printer2) => {
  const indentationNext = indentation + config2.indent;
  const colors = config2.colors;
  return keys8.map((key) => {
    const value = props[key];
    let printed = printer2(value, config2, indentationNext, depth, refs);
    if (typeof value !== "string") {
      if (printed.indexOf("\n") !== -1) {
        printed = config2.spacingOuter + indentationNext + printed + config2.spacingOuter + indentation;
      }
      printed = "{" + printed + "}";
    }
    return config2.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
  }).join("");
};
markup.printProps = printProps$1;
const printChildren$1 = (children, config2, indentation, depth, refs, printer2) => children.map(
  (child) => config2.spacingOuter + indentation + (typeof child === "string" ? printText$1(child, config2) : printer2(child, config2, indentation, depth, refs))
).join("");
markup.printChildren = printChildren$1;
const printText$1 = (text, config2) => {
  const contentColor = config2.colors.content;
  return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
};
markup.printText = printText$1;
const printComment$1 = (comment, config2) => {
  const commentColor = config2.colors.comment;
  return commentColor.open + "<!--" + (0, _escapeHTML.default)(comment) + "-->" + commentColor.close;
};
markup.printComment = printComment$1;
const printElement$1 = (type2, printedProps, printedChildren, config2, indentation) => {
  const tagColor = config2.colors.tag;
  return tagColor.open + "<" + type2 + (printedProps && tagColor.close + printedProps + config2.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config2.spacingOuter + indentation + tagColor.open + "</" + type2 : (printedProps && !config2.min ? "" : " ") + "/") + ">" + tagColor.close;
};
markup.printElement = printElement$1;
const printElementAsLeaf$1 = (type2, config2) => {
  const tagColor = config2.colors.tag;
  return tagColor.open + "<" + type2 + tagColor.close + " …" + tagColor.open + " />" + tagColor.close;
};
markup.printElementAsLeaf = printElementAsLeaf$1;
Object.defineProperty(DOMElement, "__esModule", {
  value: true
});
DOMElement.test = DOMElement.serialize = DOMElement.default = void 0;
var _markup$2 = markup;
const ELEMENT_NODE$2 = 1;
const TEXT_NODE$2 = 3;
const COMMENT_NODE$2 = 8;
const FRAGMENT_NODE$1 = 11;
const ELEMENT_REGEXP$1 = /^((HTML|SVG)\w*)?Element$/;
const testHasAttribute = (val) => {
  try {
    return typeof val.hasAttribute === "function" && val.hasAttribute("is");
  } catch {
    return false;
  }
};
const testNode$1 = (val) => {
  const constructorName = val.constructor.name;
  const { nodeType, tagName } = val;
  const isCustomElement = typeof tagName === "string" && tagName.includes("-") || testHasAttribute(val);
  return nodeType === ELEMENT_NODE$2 && (ELEMENT_REGEXP$1.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$2 && constructorName === "Text" || nodeType === COMMENT_NODE$2 && constructorName === "Comment" || nodeType === FRAGMENT_NODE$1 && constructorName === "DocumentFragment";
};
const test$4 = (val) => {
  var _val$constructor;
  return (val === null || val === void 0 ? void 0 : (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) && testNode$1(val);
};
DOMElement.test = test$4;
function nodeIsText$1(node) {
  return node.nodeType === TEXT_NODE$2;
}
function nodeIsComment$1(node) {
  return node.nodeType === COMMENT_NODE$2;
}
function nodeIsFragment$1(node) {
  return node.nodeType === FRAGMENT_NODE$1;
}
const serialize$3 = (node, config2, indentation, depth, refs, printer2) => {
  if (nodeIsText$1(node)) {
    return (0, _markup$2.printText)(node.data, config2);
  }
  if (nodeIsComment$1(node)) {
    return (0, _markup$2.printComment)(node.data, config2);
  }
  const type2 = nodeIsFragment$1(node) ? "DocumentFragment" : node.tagName.toLowerCase();
  if (++depth > config2.maxDepth) {
    return (0, _markup$2.printElementAsLeaf)(type2, config2);
  }
  return (0, _markup$2.printElement)(
    type2,
    (0, _markup$2.printProps)(
      nodeIsFragment$1(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(),
      nodeIsFragment$1(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
        props[attribute.name] = attribute.value;
        return props;
      }, {}),
      config2,
      indentation + config2.indent,
      depth,
      refs,
      printer2
    ),
    (0, _markup$2.printChildren)(
      Array.prototype.slice.call(node.childNodes || node.children),
      config2,
      indentation + config2.indent,
      depth,
      refs,
      printer2
    ),
    config2,
    indentation
  );
};
DOMElement.serialize = serialize$3;
const plugin$3 = {
  serialize: serialize$3,
  test: test$4
};
var _default$2m = plugin$3;
DOMElement.default = _default$2m;
var Immutable = {};
Object.defineProperty(Immutable, "__esModule", {
  value: true
});
Immutable.test = Immutable.serialize = Immutable.default = void 0;
var _collections$1 = collections;
const IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
const IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
const IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
const IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
const IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
const IS_RECORD_SENTINEL = "@@__IMMUTABLE_RECORD__@@";
const IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
const IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
const IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
const getImmutableName = (name) => "Immutable." + name;
const printAsLeaf = (name) => "[" + name + "]";
const SPACE = " ";
const LAZY = "…";
const printImmutableEntries = (val, config2, indentation, depth, refs, printer2, type2) => ++depth > config2.maxDepth ? printAsLeaf(getImmutableName(type2)) : getImmutableName(type2) + SPACE + "{" + (0, _collections$1.printIteratorEntries)(
  val.entries(),
  config2,
  indentation,
  depth,
  refs,
  printer2
) + "}";
function getRecordEntries(val) {
  let i = 0;
  return {
    next() {
      if (i < val._keys.length) {
        const key = val._keys[i++];
        return {
          done: false,
          value: [key, val.get(key)]
        };
      }
      return {
        done: true,
        value: void 0
      };
    }
  };
}
const printImmutableRecord = (val, config2, indentation, depth, refs, printer2) => {
  const name = getImmutableName(val._name || "Record");
  return ++depth > config2.maxDepth ? printAsLeaf(name) : name + SPACE + "{" + (0, _collections$1.printIteratorEntries)(
    getRecordEntries(val),
    config2,
    indentation,
    depth,
    refs,
    printer2
  ) + "}";
};
const printImmutableSeq = (val, config2, indentation, depth, refs, printer2) => {
  const name = getImmutableName("Seq");
  if (++depth > config2.maxDepth) {
    return printAsLeaf(name);
  }
  if (val[IS_KEYED_SENTINEL]) {
    return name + SPACE + "{" + // from Immutable collection of entries or from ECMAScript object
    (val._iter || val._object ? (0, _collections$1.printIteratorEntries)(
      val.entries(),
      config2,
      indentation,
      depth,
      refs,
      printer2
    ) : LAZY) + "}";
  }
  return name + SPACE + "[" + (val._iter || // from Immutable collection of values
  val._array || // from ECMAScript array
  val._collection || // from ECMAScript collection in immutable v4
  val._iterable ? (0, _collections$1.printIteratorValues)(
    val.values(),
    config2,
    indentation,
    depth,
    refs,
    printer2
  ) : LAZY) + "]";
};
const printImmutableValues = (val, config2, indentation, depth, refs, printer2, type2) => ++depth > config2.maxDepth ? printAsLeaf(getImmutableName(type2)) : getImmutableName(type2) + SPACE + "[" + (0, _collections$1.printIteratorValues)(
  val.values(),
  config2,
  indentation,
  depth,
  refs,
  printer2
) + "]";
const serialize$2 = (val, config2, indentation, depth, refs, printer2) => {
  if (val[IS_MAP_SENTINEL]) {
    return printImmutableEntries(
      val,
      config2,
      indentation,
      depth,
      refs,
      printer2,
      val[IS_ORDERED_SENTINEL] ? "OrderedMap" : "Map"
    );
  }
  if (val[IS_LIST_SENTINEL]) {
    return printImmutableValues(
      val,
      config2,
      indentation,
      depth,
      refs,
      printer2,
      "List"
    );
  }
  if (val[IS_SET_SENTINEL]) {
    return printImmutableValues(
      val,
      config2,
      indentation,
      depth,
      refs,
      printer2,
      val[IS_ORDERED_SENTINEL] ? "OrderedSet" : "Set"
    );
  }
  if (val[IS_STACK_SENTINEL]) {
    return printImmutableValues(
      val,
      config2,
      indentation,
      depth,
      refs,
      printer2,
      "Stack"
    );
  }
  if (val[IS_SEQ_SENTINEL]) {
    return printImmutableSeq(val, config2, indentation, depth, refs, printer2);
  }
  return printImmutableRecord(val, config2, indentation, depth, refs, printer2);
};
Immutable.serialize = serialize$2;
const test$3 = (val) => val && (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);
Immutable.test = test$3;
const plugin$2 = {
  serialize: serialize$2,
  test: test$3
};
var _default$2l = plugin$2;
Immutable.default = _default$2l;
var ReactElement = {};
Object.defineProperty(ReactElement, "__esModule", {
  value: true
});
ReactElement.test = ReactElement.serialize = ReactElement.default = void 0;
var ReactIs = _interopRequireWildcard(reactIsExports);
var _markup$1 = markup;
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function")
    return null;
  var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
  var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache = function(nodeInterop2) {
    return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return { default: obj };
  }
  var cache2 = _getRequireWildcardCache(nodeInterop);
  if (cache2 && cache2.has(obj)) {
    return cache2.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache2) {
    cache2.set(obj, newObj);
  }
  return newObj;
}
const getChildren = (arg, children = []) => {
  if (Array.isArray(arg)) {
    arg.forEach((item) => {
      getChildren(item, children);
    });
  } else if (arg != null && arg !== false) {
    children.push(arg);
  }
  return children;
};
const getType = (element) => {
  const type2 = element.type;
  if (typeof type2 === "string") {
    return type2;
  }
  if (typeof type2 === "function") {
    return type2.displayName || type2.name || "Unknown";
  }
  if (ReactIs.isFragment(element)) {
    return "React.Fragment";
  }
  if (ReactIs.isSuspense(element)) {
    return "React.Suspense";
  }
  if (typeof type2 === "object" && type2 !== null) {
    if (ReactIs.isContextProvider(element)) {
      return "Context.Provider";
    }
    if (ReactIs.isContextConsumer(element)) {
      return "Context.Consumer";
    }
    if (ReactIs.isForwardRef(element)) {
      if (type2.displayName) {
        return type2.displayName;
      }
      const functionName = type2.render.displayName || type2.render.name || "";
      return functionName !== "" ? "ForwardRef(" + functionName + ")" : "ForwardRef";
    }
    if (ReactIs.isMemo(element)) {
      const functionName = type2.displayName || type2.type.displayName || type2.type.name || "";
      return functionName !== "" ? "Memo(" + functionName + ")" : "Memo";
    }
  }
  return "UNDEFINED";
};
const getPropKeys$1 = (element) => {
  const { props } = element;
  return Object.keys(props).filter((key) => key !== "children" && props[key] !== void 0).sort();
};
const serialize$1 = (element, config2, indentation, depth, refs, printer2) => ++depth > config2.maxDepth ? (0, _markup$1.printElementAsLeaf)(getType(element), config2) : (0, _markup$1.printElement)(
  getType(element),
  (0, _markup$1.printProps)(
    getPropKeys$1(element),
    element.props,
    config2,
    indentation + config2.indent,
    depth,
    refs,
    printer2
  ),
  (0, _markup$1.printChildren)(
    getChildren(element.props.children),
    config2,
    indentation + config2.indent,
    depth,
    refs,
    printer2
  ),
  config2,
  indentation
);
ReactElement.serialize = serialize$1;
const test$2 = (val) => val != null && ReactIs.isElement(val);
ReactElement.test = test$2;
const plugin$1 = {
  serialize: serialize$1,
  test: test$2
};
var _default$2k = plugin$1;
ReactElement.default = _default$2k;
var ReactTestComponent = {};
Object.defineProperty(ReactTestComponent, "__esModule", {
  value: true
});
ReactTestComponent.test = ReactTestComponent.serialize = ReactTestComponent.default = void 0;
var _markup = markup;
var global$1 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  } else if (typeof global$1 !== "undefined") {
    return global$1;
  } else if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
}();
var Symbol$1 = global$1["jest-symbol-do-not-touch"] || global$1.Symbol;
const testSymbol = typeof Symbol$1 === "function" && Symbol$1.for ? Symbol$1.for("react.test.json") : 245830487;
const getPropKeys = (object) => {
  const { props } = object;
  return props ? Object.keys(props).filter((key) => props[key] !== void 0).sort() : [];
};
const serialize = (object, config2, indentation, depth, refs, printer2) => ++depth > config2.maxDepth ? (0, _markup.printElementAsLeaf)(object.type, config2) : (0, _markup.printElement)(
  object.type,
  object.props ? (0, _markup.printProps)(
    getPropKeys(object),
    object.props,
    config2,
    indentation + config2.indent,
    depth,
    refs,
    printer2
  ) : "",
  object.children ? (0, _markup.printChildren)(
    object.children,
    config2,
    indentation + config2.indent,
    depth,
    refs,
    printer2
  ) : "",
  config2,
  indentation
);
ReactTestComponent.serialize = serialize;
const test$1 = (val) => val && val.$$typeof === testSymbol;
ReactTestComponent.test = test$1;
const plugin = {
  serialize,
  test: test$1
};
var _default$2j = plugin;
ReactTestComponent.default = _default$2j;
Object.defineProperty(build$1, "__esModule", {
  value: true
});
var default_1 = build$1.default = DEFAULT_OPTIONS_1 = build$1.DEFAULT_OPTIONS = void 0;
var format_1 = build$1.format = format;
var plugins_1 = build$1.plugins = void 0;
var _ansiStyles = _interopRequireDefault$b(ansiStylesExports);
var _collections = collections;
var _AsymmetricMatcher = _interopRequireDefault$b(
  AsymmetricMatcher
);
var _ConvertAnsi = _interopRequireDefault$b(ConvertAnsi);
var _DOMCollection = _interopRequireDefault$b(DOMCollection$1);
var _DOMElement = _interopRequireDefault$b(DOMElement);
var _Immutable = _interopRequireDefault$b(Immutable);
var _ReactElement = _interopRequireDefault$b(ReactElement);
var _ReactTestComponent = _interopRequireDefault$b(
  ReactTestComponent
);
function _interopRequireDefault$b(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const toString$1 = Object.prototype.toString;
const toISOString = Date.prototype.toISOString;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const getConstructorName = (val) => typeof val.constructor === "function" && val.constructor.name || "Object";
const isWindow = (val) => typeof window !== "undefined" && val === window;
const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
const NEWLINE_REGEXP = /\n/gi;
class PrettyFormatPluginError extends Error {
  constructor(message, stack) {
    super(message);
    this.stack = stack;
    this.name = this.constructor.name;
  }
}
function isToStringedArrayType(toStringed) {
  return toStringed === "[object Array]" || toStringed === "[object ArrayBuffer]" || toStringed === "[object DataView]" || toStringed === "[object Float32Array]" || toStringed === "[object Float64Array]" || toStringed === "[object Int8Array]" || toStringed === "[object Int16Array]" || toStringed === "[object Int32Array]" || toStringed === "[object Uint8Array]" || toStringed === "[object Uint8ClampedArray]" || toStringed === "[object Uint16Array]" || toStringed === "[object Uint32Array]";
}
function printNumber(val) {
  return Object.is(val, -0) ? "-0" : String(val);
}
function printBigInt(val) {
  return String(`${val}n`);
}
function printFunction(val, printFunctionName) {
  if (!printFunctionName) {
    return "[Function]";
  }
  return "[Function " + (val.name || "anonymous") + "]";
}
function printSymbol(val) {
  return String(val).replace(SYMBOL_REGEXP, "Symbol($1)");
}
function printError(val) {
  return "[" + errorToString.call(val) + "]";
}
function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
  if (val === true || val === false) {
    return "" + val;
  }
  if (val === void 0) {
    return "undefined";
  }
  if (val === null) {
    return "null";
  }
  const typeOf = typeof val;
  if (typeOf === "number") {
    return printNumber(val);
  }
  if (typeOf === "bigint") {
    return printBigInt(val);
  }
  if (typeOf === "string") {
    if (escapeString) {
      return '"' + val.replace(/"|\\/g, "\\$&") + '"';
    }
    return '"' + val + '"';
  }
  if (typeOf === "function") {
    return printFunction(val, printFunctionName);
  }
  if (typeOf === "symbol") {
    return printSymbol(val);
  }
  const toStringed = toString$1.call(val);
  if (toStringed === "[object WeakMap]") {
    return "WeakMap {}";
  }
  if (toStringed === "[object WeakSet]") {
    return "WeakSet {}";
  }
  if (toStringed === "[object Function]" || toStringed === "[object GeneratorFunction]") {
    return printFunction(val, printFunctionName);
  }
  if (toStringed === "[object Symbol]") {
    return printSymbol(val);
  }
  if (toStringed === "[object Date]") {
    return isNaN(+val) ? "Date { NaN }" : toISOString.call(val);
  }
  if (toStringed === "[object Error]") {
    return printError(val);
  }
  if (toStringed === "[object RegExp]") {
    if (escapeRegex) {
      return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    return regExpToString.call(val);
  }
  if (val instanceof Error) {
    return printError(val);
  }
  return null;
}
function printComplexValue(val, config2, indentation, depth, refs, hasCalledToJSON) {
  if (refs.indexOf(val) !== -1) {
    return "[Circular]";
  }
  refs = refs.slice();
  refs.push(val);
  const hitMaxDepth = ++depth > config2.maxDepth;
  const min = config2.min;
  if (config2.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === "function" && !hasCalledToJSON) {
    return printer(val.toJSON(), config2, indentation, depth, refs, true);
  }
  const toStringed = toString$1.call(val);
  if (toStringed === "[object Arguments]") {
    return hitMaxDepth ? "[Arguments]" : (min ? "" : "Arguments ") + "[" + (0, _collections.printListItems)(
      val,
      config2,
      indentation,
      depth,
      refs,
      printer
    ) + "]";
  }
  if (isToStringedArrayType(toStringed)) {
    return hitMaxDepth ? "[" + val.constructor.name + "]" : (min ? "" : !config2.printBasicPrototype && val.constructor.name === "Array" ? "" : val.constructor.name + " ") + "[" + (0, _collections.printListItems)(
      val,
      config2,
      indentation,
      depth,
      refs,
      printer
    ) + "]";
  }
  if (toStringed === "[object Map]") {
    return hitMaxDepth ? "[Map]" : "Map {" + (0, _collections.printIteratorEntries)(
      val.entries(),
      config2,
      indentation,
      depth,
      refs,
      printer,
      " => "
    ) + "}";
  }
  if (toStringed === "[object Set]") {
    return hitMaxDepth ? "[Set]" : "Set {" + (0, _collections.printIteratorValues)(
      val.values(),
      config2,
      indentation,
      depth,
      refs,
      printer
    ) + "}";
  }
  return hitMaxDepth || isWindow(val) ? "[" + getConstructorName(val) + "]" : (min ? "" : !config2.printBasicPrototype && getConstructorName(val) === "Object" ? "" : getConstructorName(val) + " ") + "{" + (0, _collections.printObjectProperties)(
    val,
    config2,
    indentation,
    depth,
    refs,
    printer
  ) + "}";
}
function isNewPlugin(plugin2) {
  return plugin2.serialize != null;
}
function printPlugin(plugin2, val, config2, indentation, depth, refs) {
  let printed;
  try {
    printed = isNewPlugin(plugin2) ? plugin2.serialize(val, config2, indentation, depth, refs, printer) : plugin2.print(
      val,
      (valChild) => printer(valChild, config2, indentation, depth, refs),
      (str) => {
        const indentationNext = indentation + config2.indent;
        return indentationNext + str.replace(NEWLINE_REGEXP, "\n" + indentationNext);
      },
      {
        edgeSpacing: config2.spacingOuter,
        min: config2.min,
        spacing: config2.spacingInner
      },
      config2.colors
    );
  } catch (error) {
    throw new PrettyFormatPluginError(error.message, error.stack);
  }
  if (typeof printed !== "string") {
    throw new Error(
      `pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`
    );
  }
  return printed;
}
function findPlugin(plugins2, val) {
  for (let p = 0; p < plugins2.length; p++) {
    try {
      if (plugins2[p].test(val)) {
        return plugins2[p];
      }
    } catch (error) {
      throw new PrettyFormatPluginError(error.message, error.stack);
    }
  }
  return null;
}
function printer(val, config2, indentation, depth, refs, hasCalledToJSON) {
  const plugin2 = findPlugin(config2.plugins, val);
  if (plugin2 !== null) {
    return printPlugin(plugin2, val, config2, indentation, depth, refs);
  }
  const basicResult = printBasicValue(
    val,
    config2.printFunctionName,
    config2.escapeRegex,
    config2.escapeString
  );
  if (basicResult !== null) {
    return basicResult;
  }
  return printComplexValue(
    val,
    config2,
    indentation,
    depth,
    refs,
    hasCalledToJSON
  );
}
const DEFAULT_THEME = {
  comment: "gray",
  content: "reset",
  prop: "yellow",
  tag: "cyan",
  value: "green"
};
const DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
const DEFAULT_OPTIONS = {
  callToJSON: true,
  compareKeys: void 0,
  escapeRegex: false,
  escapeString: true,
  highlight: false,
  indent: 2,
  maxDepth: Infinity,
  min: false,
  plugins: [],
  printBasicPrototype: true,
  printFunctionName: true,
  theme: DEFAULT_THEME
};
var DEFAULT_OPTIONS_1 = build$1.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
function validateOptions(options) {
  Object.keys(options).forEach((key) => {
    if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
      throw new Error(`pretty-format: Unknown option "${key}".`);
    }
  });
  if (options.min && options.indent !== void 0 && options.indent !== 0) {
    throw new Error(
      'pretty-format: Options "min" and "indent" cannot be used together.'
    );
  }
  if (options.theme !== void 0) {
    if (options.theme === null) {
      throw new Error('pretty-format: Option "theme" must not be null.');
    }
    if (typeof options.theme !== "object") {
      throw new Error(
        `pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`
      );
    }
  }
}
const getColorsHighlight = (options) => DEFAULT_THEME_KEYS.reduce((colors, key) => {
  const value = options.theme && options.theme[key] !== void 0 ? options.theme[key] : DEFAULT_THEME[key];
  const color = value && _ansiStyles.default[value];
  if (color && typeof color.close === "string" && typeof color.open === "string") {
    colors[key] = color;
  } else {
    throw new Error(
      `pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`
    );
  }
  return colors;
}, /* @__PURE__ */ Object.create(null));
const getColorsEmpty = () => DEFAULT_THEME_KEYS.reduce((colors, key) => {
  colors[key] = {
    close: "",
    open: ""
  };
  return colors;
}, /* @__PURE__ */ Object.create(null));
const getPrintFunctionName = (options) => options && options.printFunctionName !== void 0 ? options.printFunctionName : DEFAULT_OPTIONS.printFunctionName;
const getEscapeRegex = (options) => options && options.escapeRegex !== void 0 ? options.escapeRegex : DEFAULT_OPTIONS.escapeRegex;
const getEscapeString = (options) => options && options.escapeString !== void 0 ? options.escapeString : DEFAULT_OPTIONS.escapeString;
const getConfig$2 = (options) => {
  var _options$printBasicPr;
  return {
    callToJSON: options && options.callToJSON !== void 0 ? options.callToJSON : DEFAULT_OPTIONS.callToJSON,
    colors: options && options.highlight ? getColorsHighlight(options) : getColorsEmpty(),
    compareKeys: options && typeof options.compareKeys === "function" ? options.compareKeys : DEFAULT_OPTIONS.compareKeys,
    escapeRegex: getEscapeRegex(options),
    escapeString: getEscapeString(options),
    indent: options && options.min ? "" : createIndent(
      options && options.indent !== void 0 ? options.indent : DEFAULT_OPTIONS.indent
    ),
    maxDepth: options && options.maxDepth !== void 0 ? options.maxDepth : DEFAULT_OPTIONS.maxDepth,
    min: options && options.min !== void 0 ? options.min : DEFAULT_OPTIONS.min,
    plugins: options && options.plugins !== void 0 ? options.plugins : DEFAULT_OPTIONS.plugins,
    printBasicPrototype: (_options$printBasicPr = options === null || options === void 0 ? void 0 : options.printBasicPrototype) !== null && _options$printBasicPr !== void 0 ? _options$printBasicPr : true,
    printFunctionName: getPrintFunctionName(options),
    spacingInner: options && options.min ? " " : "\n",
    spacingOuter: options && options.min ? "" : "\n"
  };
};
function createIndent(indent) {
  return new Array(indent + 1).join(" ");
}
function format(val, options) {
  if (options) {
    validateOptions(options);
    if (options.plugins) {
      const plugin2 = findPlugin(options.plugins, val);
      if (plugin2 !== null) {
        return printPlugin(plugin2, val, getConfig$2(options), "", 0, []);
      }
    }
  }
  const basicResult = printBasicValue(
    val,
    getPrintFunctionName(options),
    getEscapeRegex(options),
    getEscapeString(options)
  );
  if (basicResult !== null) {
    return basicResult;
  }
  return printComplexValue(val, getConfig$2(options), "", 0, []);
}
const plugins = {
  AsymmetricMatcher: _AsymmetricMatcher.default,
  ConvertAnsi: _ConvertAnsi.default,
  DOMCollection: _DOMCollection.default,
  DOMElement: _DOMElement.default,
  Immutable: _Immutable.default,
  ReactElement: _ReactElement.default,
  ReactTestComponent: _ReactTestComponent.default
};
plugins_1 = build$1.plugins = plugins;
var _default$2i = format;
default_1 = build$1.default = _default$2i;
const index = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  get DEFAULT_OPTIONS() {
    return DEFAULT_OPTIONS_1;
  },
  get default() {
    return default_1;
  },
  format: format_1,
  get plugins() {
    return plugins_1;
  }
}, [build$1]);
var toStr$a = Object.prototype.toString;
function isCallable$2(fn) {
  return typeof fn === "function" || toStr$a.call(fn) === "[object Function]";
}
function toInteger(value) {
  var number = Number(value);
  if (isNaN(number)) {
    return 0;
  }
  if (number === 0 || !isFinite(number)) {
    return number;
  }
  return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(value) {
  var len = toInteger(value);
  return Math.min(Math.max(len, 0), maxSafeInteger);
}
function arrayFrom(arrayLike, mapFn) {
  var C = Array;
  var items = Object(arrayLike);
  if (arrayLike == null) {
    throw new TypeError("Array.from requires an array-like object - not null or undefined");
  }
  if (typeof mapFn !== "undefined") {
    if (!isCallable$2(mapFn)) {
      throw new TypeError("Array.from: when provided, the second argument must be a function");
    }
  }
  var len = toLength(items.length);
  var A = isCallable$2(C) ? Object(new C(len)) : new Array(len);
  var k = 0;
  var kValue;
  while (k < len) {
    kValue = items[k];
    if (mapFn) {
      A[k] = mapFn(kValue, k);
    } else {
      A[k] = kValue;
    }
    k += 1;
  }
  A.length = len;
  return A;
}
function _typeof$2(obj) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$2(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(arg) {
  var key = _toPrimitive$1(arg, "string");
  return _typeof$2(key) === "symbol" ? key : String(key);
}
function _toPrimitive$1(input2, hint) {
  if (_typeof$2(input2) !== "object" || input2 === null)
    return input2;
  var prim = input2[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input2, hint || "default");
    if (_typeof$2(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input2);
}
var SetLike = /* @__PURE__ */ function() {
  function SetLike2() {
    var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    _classCallCheck(this, SetLike2);
    _defineProperty$2(this, "items", void 0);
    this.items = items;
  }
  _createClass(SetLike2, [{
    key: "add",
    value: function add(value) {
      if (this.has(value) === false) {
        this.items.push(value);
      }
      return this;
    }
  }, {
    key: "clear",
    value: function clear2() {
      this.items = [];
    }
  }, {
    key: "delete",
    value: function _delete(value) {
      var previousLength = this.items.length;
      this.items = this.items.filter(function(item) {
        return item !== value;
      });
      return previousLength !== this.items.length;
    }
  }, {
    key: "forEach",
    value: function forEach8(callbackfn) {
      var _this = this;
      this.items.forEach(function(item) {
        callbackfn(item, item, _this);
      });
    }
  }, {
    key: "has",
    value: function has7(value) {
      return this.items.indexOf(value) !== -1;
    }
  }, {
    key: "size",
    get: function get6() {
      return this.items.length;
    }
  }]);
  return SetLike2;
}();
const SetLike$1 = typeof Set === "undefined" ? Set : SetLike;
function getLocalName(element) {
  var _element$localName;
  return (
    // eslint-disable-next-line no-restricted-properties -- actual guard for environments without localName
    (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : (
      // eslint-disable-next-line no-restricted-properties -- required for the fallback
      element.tagName.toLowerCase()
    )
  );
}
var localNameToRoleMappings = {
  article: "article",
  aside: "complementary",
  button: "button",
  datalist: "listbox",
  dd: "definition",
  details: "group",
  dialog: "dialog",
  dt: "term",
  fieldset: "group",
  figure: "figure",
  // WARNING: Only with an accessible name
  form: "form",
  footer: "contentinfo",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  h5: "heading",
  h6: "heading",
  header: "banner",
  hr: "separator",
  html: "document",
  legend: "legend",
  li: "listitem",
  math: "math",
  main: "main",
  menu: "list",
  nav: "navigation",
  ol: "list",
  optgroup: "group",
  // WARNING: Only in certain context
  option: "option",
  output: "status",
  progress: "progressbar",
  // WARNING: Only with an accessible name
  section: "region",
  summary: "button",
  table: "table",
  tbody: "rowgroup",
  textarea: "textbox",
  tfoot: "rowgroup",
  // WARNING: Only in certain context
  td: "cell",
  th: "columnheader",
  thead: "rowgroup",
  tr: "row",
  ul: "list"
};
var prohibitedAttributes = {
  caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
  insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"])
};
function hasGlobalAriaAttributes(element, role) {
  return [
    "aria-atomic",
    "aria-busy",
    "aria-controls",
    "aria-current",
    "aria-describedby",
    "aria-details",
    // "disabled",
    "aria-dropeffect",
    // "errormessage",
    "aria-flowto",
    "aria-grabbed",
    // "haspopup",
    "aria-hidden",
    // "invalid",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-live",
    "aria-owns",
    "aria-relevant",
    "aria-roledescription"
  ].some(function(attributeName) {
    var _prohibitedAttributes;
    return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
  });
}
function ignorePresentationalRole(element, implicitRole) {
  return hasGlobalAriaAttributes(element, implicitRole);
}
function getRole(element) {
  var explicitRole = getExplicitRole(element);
  if (explicitRole === null || explicitRole === "presentation") {
    var implicitRole = getImplicitRole(element);
    if (explicitRole !== "presentation" || ignorePresentationalRole(element, implicitRole || "")) {
      return implicitRole;
    }
  }
  return explicitRole;
}
function getImplicitRole(element) {
  var mappedByTag = localNameToRoleMappings[getLocalName(element)];
  if (mappedByTag !== void 0) {
    return mappedByTag;
  }
  switch (getLocalName(element)) {
    case "a":
    case "area":
    case "link":
      if (element.hasAttribute("href")) {
        return "link";
      }
      break;
    case "img":
      if (element.getAttribute("alt") === "" && !ignorePresentationalRole(element, "img")) {
        return "presentation";
      }
      return "img";
    case "input": {
      var _ref = element, type2 = _ref.type;
      switch (type2) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return type2;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          if (element.hasAttribute("list")) {
            return "combobox";
          }
          return "textbox";
        case "search":
          if (element.hasAttribute("list")) {
            return "combobox";
          }
          return "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      if (element.hasAttribute("multiple") || element.size > 1) {
        return "listbox";
      }
      return "combobox";
  }
  return null;
}
function getExplicitRole(element) {
  var role = element.getAttribute("role");
  if (role !== null) {
    var explicitRole = role.trim().split(" ")[0];
    if (explicitRole.length > 0) {
      return explicitRole;
    }
  }
  return null;
}
function isElement$3(node) {
  return node !== null && node.nodeType === node.ELEMENT_NODE;
}
function isHTMLTableCaptionElement(node) {
  return isElement$3(node) && getLocalName(node) === "caption";
}
function isHTMLInputElement(node) {
  return isElement$3(node) && getLocalName(node) === "input";
}
function isHTMLOptGroupElement(node) {
  return isElement$3(node) && getLocalName(node) === "optgroup";
}
function isHTMLSelectElement(node) {
  return isElement$3(node) && getLocalName(node) === "select";
}
function isHTMLTableElement(node) {
  return isElement$3(node) && getLocalName(node) === "table";
}
function isHTMLTextAreaElement(node) {
  return isElement$3(node) && getLocalName(node) === "textarea";
}
function safeWindow(node) {
  var _ref = node.ownerDocument === null ? node : node.ownerDocument, defaultView = _ref.defaultView;
  if (defaultView === null) {
    throw new TypeError("no window available");
  }
  return defaultView;
}
function isHTMLFieldSetElement(node) {
  return isElement$3(node) && getLocalName(node) === "fieldset";
}
function isHTMLLegendElement(node) {
  return isElement$3(node) && getLocalName(node) === "legend";
}
function isHTMLSlotElement(node) {
  return isElement$3(node) && getLocalName(node) === "slot";
}
function isSVGElement(node) {
  return isElement$3(node) && node.ownerSVGElement !== void 0;
}
function isSVGSVGElement(node) {
  return isElement$3(node) && getLocalName(node) === "svg";
}
function isSVGTitleElement(node) {
  return isSVGElement(node) && getLocalName(node) === "title";
}
function queryIdRefs(node, attributeName) {
  if (isElement$3(node) && node.hasAttribute(attributeName)) {
    var ids = node.getAttribute(attributeName).split(" ");
    var root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    return ids.map(function(id) {
      return root.getElementById(id);
    }).filter(
      function(element) {
        return element !== null;
      }
      // TODO: why does this not narrow?
    );
  }
  return [];
}
function hasAnyConcreteRoles(node, roles2) {
  if (isElement$3(node)) {
    return roles2.indexOf(getRole(node)) !== -1;
  }
  return false;
}
function asFlatString(s) {
  return s.trim().replace(/\s\s+/g, " ");
}
function isHidden(node, getComputedStyleImplementation) {
  if (!isElement$3(node)) {
    return false;
  }
  if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") {
    return true;
  }
  var style = getComputedStyleImplementation(node);
  return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
}
function isControl(node) {
  return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
}
function hasAbstractRole(node, role) {
  if (!isElement$3(node)) {
    return false;
  }
  switch (role) {
    case "range":
      return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
    default:
      throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
  }
}
function querySelectorAllSubtree(element, selectors) {
  var elements = arrayFrom(element.querySelectorAll(selectors));
  queryIdRefs(element, "aria-owns").forEach(function(root) {
    elements.push.apply(elements, arrayFrom(root.querySelectorAll(selectors)));
  });
  return elements;
}
function querySelectedOptions(listbox) {
  if (isHTMLSelectElement(listbox)) {
    return listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]");
  }
  return querySelectorAllSubtree(listbox, '[aria-selected="true"]');
}
function isMarkedPresentational(node) {
  return hasAnyConcreteRoles(node, ["none", "presentation"]);
}
function isNativeHostLanguageTextAlternativeElement(node) {
  return isHTMLTableCaptionElement(node);
}
function allowsNameFromContent(node) {
  return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
}
function isDescendantOfNativeHostLanguageTextAlternativeElement(node) {
  return false;
}
function getValueOfTextbox(element) {
  if (isHTMLInputElement(element) || isHTMLTextAreaElement(element)) {
    return element.value;
  }
  return element.textContent || "";
}
function getTextualContent(declaration) {
  var content = declaration.getPropertyValue("content");
  if (/^["'].*["']$/.test(content)) {
    return content.slice(1, -1);
  }
  return "";
}
function isLabelableElement(element) {
  var localName = getLocalName(element);
  return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
}
function findLabelableElement(element) {
  if (isLabelableElement(element)) {
    return element;
  }
  var labelableElement = null;
  element.childNodes.forEach(function(childNode) {
    if (labelableElement === null && isElement$3(childNode)) {
      var descendantLabelableElement = findLabelableElement(childNode);
      if (descendantLabelableElement !== null) {
        labelableElement = descendantLabelableElement;
      }
    }
  });
  return labelableElement;
}
function getControlOfLabel(label) {
  if (label.control !== void 0) {
    return label.control;
  }
  var htmlFor = label.getAttribute("for");
  if (htmlFor !== null) {
    return label.ownerDocument.getElementById(htmlFor);
  }
  return findLabelableElement(label);
}
function getLabels$1(element) {
  var labelsProperty = element.labels;
  if (labelsProperty === null) {
    return labelsProperty;
  }
  if (labelsProperty !== void 0) {
    return arrayFrom(labelsProperty);
  }
  if (!isLabelableElement(element)) {
    return null;
  }
  var document2 = element.ownerDocument;
  return arrayFrom(document2.querySelectorAll("label")).filter(function(label) {
    return getControlOfLabel(label) === element;
  });
}
function getSlotContents(slot) {
  var assignedNodes = slot.assignedNodes();
  if (assignedNodes.length === 0) {
    return arrayFrom(slot.childNodes);
  }
  return assignedNodes;
}
function computeTextAlternative(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var consultedNodes = new SetLike$1();
  var window2 = safeWindow(root);
  var _options$compute = options.compute, compute = _options$compute === void 0 ? "name" : _options$compute, _options$computedStyl = options.computedStyleSupportsPseudoElements, computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== void 0 : _options$computedStyl, _options$getComputedS = options.getComputedStyle, getComputedStyle = _options$getComputedS === void 0 ? window2.getComputedStyle.bind(window2) : _options$getComputedS, _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? false : _options$hidden;
  function computeMiscTextAlternative(node, context) {
    var accumulatedText = "";
    if (isElement$3(node) && computedStyleSupportsPseudoElements) {
      var pseudoBefore = getComputedStyle(node, "::before");
      var beforeContent = getTextualContent(pseudoBefore);
      accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
    }
    var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
    childNodes.forEach(function(child) {
      var result = computeTextAlternative2(child, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false,
        recursion: true
      });
      var display = isElement$3(child) ? getComputedStyle(child).getPropertyValue("display") : "inline";
      var separator = display !== "inline" ? " " : "";
      accumulatedText += "".concat(separator).concat(result).concat(separator);
    });
    if (isElement$3(node) && computedStyleSupportsPseudoElements) {
      var pseudoAfter = getComputedStyle(node, "::after");
      var afterContent = getTextualContent(pseudoAfter);
      accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
    }
    return accumulatedText.trim();
  }
  function useAttribute(element, attributeName) {
    var attribute = element.getAttributeNode(attributeName);
    if (attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "") {
      consultedNodes.add(attribute);
      return attribute.value;
    }
    return null;
  }
  function computeTooltipAttributeValue(node) {
    if (!isElement$3(node)) {
      return null;
    }
    return useAttribute(node, "title");
  }
  function computeElementTextAlternative(node) {
    if (!isElement$3(node)) {
      return null;
    }
    if (isHTMLFieldSetElement(node)) {
      consultedNodes.add(node);
      var children = arrayFrom(node.childNodes);
      for (var i = 0; i < children.length; i += 1) {
        var child = children[i];
        if (isHTMLLegendElement(child)) {
          return computeTextAlternative2(child, {
            isEmbeddedInLabel: false,
            isReferenced: false,
            recursion: false
          });
        }
      }
    } else if (isHTMLTableElement(node)) {
      consultedNodes.add(node);
      var _children = arrayFrom(node.childNodes);
      for (var _i2 = 0; _i2 < _children.length; _i2 += 1) {
        var _child = _children[_i2];
        if (isHTMLTableCaptionElement(_child)) {
          return computeTextAlternative2(_child, {
            isEmbeddedInLabel: false,
            isReferenced: false,
            recursion: false
          });
        }
      }
    } else if (isSVGSVGElement(node)) {
      consultedNodes.add(node);
      var _children2 = arrayFrom(node.childNodes);
      for (var _i22 = 0; _i22 < _children2.length; _i22 += 1) {
        var _child2 = _children2[_i22];
        if (isSVGTitleElement(_child2)) {
          return _child2.textContent;
        }
      }
      return null;
    } else if (getLocalName(node) === "img" || getLocalName(node) === "area") {
      var nameFromAlt = useAttribute(node, "alt");
      if (nameFromAlt !== null) {
        return nameFromAlt;
      }
    } else if (isHTMLOptGroupElement(node)) {
      var nameFromLabel = useAttribute(node, "label");
      if (nameFromLabel !== null) {
        return nameFromLabel;
      }
    }
    if (isHTMLInputElement(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
      var nameFromValue = useAttribute(node, "value");
      if (nameFromValue !== null) {
        return nameFromValue;
      }
      if (node.type === "submit") {
        return "Submit";
      }
      if (node.type === "reset") {
        return "Reset";
      }
    }
    var labels = getLabels$1(node);
    if (labels !== null && labels.length !== 0) {
      consultedNodes.add(node);
      return arrayFrom(labels).map(function(element) {
        return computeTextAlternative2(element, {
          isEmbeddedInLabel: true,
          isReferenced: false,
          recursion: true
        });
      }).filter(function(label) {
        return label.length > 0;
      }).join(" ");
    }
    if (isHTMLInputElement(node) && node.type === "image") {
      var _nameFromAlt = useAttribute(node, "alt");
      if (_nameFromAlt !== null) {
        return _nameFromAlt;
      }
      var nameFromTitle = useAttribute(node, "title");
      if (nameFromTitle !== null) {
        return nameFromTitle;
      }
      return "Submit Query";
    }
    if (hasAnyConcreteRoles(node, ["button"])) {
      var nameFromSubTree = computeMiscTextAlternative(node, {
        isEmbeddedInLabel: false,
        isReferenced: false
      });
      if (nameFromSubTree !== "") {
        return nameFromSubTree;
      }
    }
    return null;
  }
  function computeTextAlternative2(current, context) {
    if (consultedNodes.has(current)) {
      return "";
    }
    if (!hidden && isHidden(current, getComputedStyle) && !context.isReferenced) {
      consultedNodes.add(current);
      return "";
    }
    var labelAttributeNode = isElement$3(current) ? current.getAttributeNode("aria-labelledby") : null;
    var labelElements = labelAttributeNode !== null && !consultedNodes.has(labelAttributeNode) ? queryIdRefs(current, "aria-labelledby") : [];
    if (compute === "name" && !context.isReferenced && labelElements.length > 0) {
      consultedNodes.add(labelAttributeNode);
      return labelElements.map(function(element) {
        return computeTextAlternative2(element, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: true,
          // this isn't recursion as specified, otherwise we would skip
          // `aria-label` in
          // <input id="myself" aria-label="foo" aria-labelledby="myself"
          recursion: false
        });
      }).join(" ");
    }
    var skipToStep2E = context.recursion && isControl(current) && compute === "name";
    if (!skipToStep2E) {
      var ariaLabel = (isElement$3(current) && current.getAttribute("aria-label") || "").trim();
      if (ariaLabel !== "" && compute === "name") {
        consultedNodes.add(current);
        return ariaLabel;
      }
      if (!isMarkedPresentational(current)) {
        var elementTextAlternative = computeElementTextAlternative(current);
        if (elementTextAlternative !== null) {
          consultedNodes.add(current);
          return elementTextAlternative;
        }
      }
    }
    if (hasAnyConcreteRoles(current, ["menu"])) {
      consultedNodes.add(current);
      return "";
    }
    if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
      if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
        consultedNodes.add(current);
        var selectedOptions = querySelectedOptions(current);
        if (selectedOptions.length === 0) {
          return isHTMLInputElement(current) ? current.value : "";
        }
        return arrayFrom(selectedOptions).map(function(selectedOption) {
          return computeTextAlternative2(selectedOption, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: false,
            recursion: true
          });
        }).join(" ");
      }
      if (hasAbstractRole(current, "range")) {
        consultedNodes.add(current);
        if (current.hasAttribute("aria-valuetext")) {
          return current.getAttribute("aria-valuetext");
        }
        if (current.hasAttribute("aria-valuenow")) {
          return current.getAttribute("aria-valuenow");
        }
        return current.getAttribute("value") || "";
      }
      if (hasAnyConcreteRoles(current, ["textbox"])) {
        consultedNodes.add(current);
        return getValueOfTextbox(current);
      }
    }
    if (allowsNameFromContent(current) || isElement$3(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement()) {
      var accumulatedText2F = computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false
      });
      if (accumulatedText2F !== "") {
        consultedNodes.add(current);
        return accumulatedText2F;
      }
    }
    if (current.nodeType === current.TEXT_NODE) {
      consultedNodes.add(current);
      return current.textContent || "";
    }
    if (context.recursion) {
      consultedNodes.add(current);
      return computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false
      });
    }
    var tooltipAttributeValue = computeTooltipAttributeValue(current);
    if (tooltipAttributeValue !== null) {
      consultedNodes.add(current);
      return tooltipAttributeValue;
    }
    consultedNodes.add(current);
    return "";
  }
  return asFlatString(computeTextAlternative2(root, {
    isEmbeddedInLabel: false,
    // by spec computeAccessibleDescription starts with the referenced elements as roots
    isReferenced: compute === "description",
    recursion: false
  }));
}
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
function ownKeys(object, enumerableOnly) {
  var keys8 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys8.push.apply(keys8, symbols);
  }
  return keys8;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof$1(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input2, hint) {
  if (_typeof$1(input2) !== "object" || input2 === null)
    return input2;
  var prim = input2[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input2, hint || "default");
    if (_typeof$1(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input2);
}
function computeAccessibleDescription(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var description = queryIdRefs(root, "aria-describedby").map(function(element) {
    return computeTextAlternative(element, _objectSpread(_objectSpread({}, options), {}, {
      compute: "description"
    }));
  }).join(" ");
  if (description === "") {
    var title = root.getAttribute("title");
    description = title === null ? "" : title;
  }
  return description;
}
function prohibitsNaming(node) {
  return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "presentation", "strong", "subscript", "superscript"]);
}
function computeAccessibleName(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (prohibitsNaming(root)) {
    return "";
  }
  return computeTextAlternative(root, options);
}
var lib = {};
var ariaPropsMap$1 = {};
var iterationDecorator$1 = {};
var iteratorProxy$1 = {};
Object.defineProperty(iteratorProxy$1, "__esModule", {
  value: true
});
iteratorProxy$1.default = void 0;
function iteratorProxy() {
  var values6 = this;
  var index2 = 0;
  var iter = {
    "@@iterator": function iterator() {
      return iter;
    },
    next: function next() {
      if (index2 < values6.length) {
        var value = values6[index2];
        index2 = index2 + 1;
        return {
          done: false,
          value
        };
      } else {
        return {
          done: true
        };
      }
    }
  };
  return iter;
}
var _default$2h = iteratorProxy;
iteratorProxy$1.default = _default$2h;
Object.defineProperty(iterationDecorator$1, "__esModule", {
  value: true
});
iterationDecorator$1.default = iterationDecorator;
var _iteratorProxy = _interopRequireDefault$a(iteratorProxy$1);
function _interopRequireDefault$a(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function iterationDecorator(collection, entries6) {
  if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
    Object.defineProperty(collection, Symbol.iterator, {
      value: _iteratorProxy.default.bind(entries6)
    });
  }
  return collection;
}
Object.defineProperty(ariaPropsMap$1, "__esModule", {
  value: true
});
ariaPropsMap$1.default = void 0;
var _iterationDecorator$4 = _interopRequireDefault$9(iterationDecorator$1);
function _interopRequireDefault$9(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _slicedToArray$4(arr, i) {
  return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$4(arr, i) {
  var _i2 = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i2 == null)
    return;
  var _arr = [];
  var _n2 = true;
  var _d2 = false;
  var _s, _e2;
  try {
    for (_i2 = _i2.call(arr); !(_n2 = (_s = _i2.next()).done); _n2 = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d2 = true;
    _e2 = err;
  } finally {
    try {
      if (!_n2 && _i2["return"] != null)
        _i2["return"]();
    } finally {
      if (_d2)
        throw _e2;
    }
  }
  return _arr;
}
function _arrayWithHoles$4(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _createForOfIteratorHelper$4(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e3) {
    didErr = true;
    err = _e3;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null)
        it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$4(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var properties = [["aria-activedescendant", {
  "type": "id"
}], ["aria-atomic", {
  "type": "boolean"
}], ["aria-autocomplete", {
  "type": "token",
  "values": ["inline", "list", "both", "none"]
}], ["aria-busy", {
  "type": "boolean"
}], ["aria-checked", {
  "type": "tristate"
}], ["aria-colcount", {
  type: "integer"
}], ["aria-colindex", {
  type: "integer"
}], ["aria-colspan", {
  type: "integer"
}], ["aria-controls", {
  "type": "idlist"
}], ["aria-current", {
  type: "token",
  values: ["page", "step", "location", "date", "time", true, false]
}], ["aria-describedby", {
  "type": "idlist"
}], ["aria-details", {
  "type": "id"
}], ["aria-disabled", {
  "type": "boolean"
}], ["aria-dropeffect", {
  "type": "tokenlist",
  "values": ["copy", "execute", "link", "move", "none", "popup"]
}], ["aria-errormessage", {
  "type": "id"
}], ["aria-expanded", {
  "type": "boolean",
  "allowundefined": true
}], ["aria-flowto", {
  "type": "idlist"
}], ["aria-grabbed", {
  "type": "boolean",
  "allowundefined": true
}], ["aria-haspopup", {
  "type": "token",
  "values": [false, true, "menu", "listbox", "tree", "grid", "dialog"]
}], ["aria-hidden", {
  "type": "boolean",
  "allowundefined": true
}], ["aria-invalid", {
  "type": "token",
  "values": ["grammar", false, "spelling", true]
}], ["aria-keyshortcuts", {
  type: "string"
}], ["aria-label", {
  "type": "string"
}], ["aria-labelledby", {
  "type": "idlist"
}], ["aria-level", {
  "type": "integer"
}], ["aria-live", {
  "type": "token",
  "values": ["assertive", "off", "polite"]
}], ["aria-modal", {
  type: "boolean"
}], ["aria-multiline", {
  "type": "boolean"
}], ["aria-multiselectable", {
  "type": "boolean"
}], ["aria-orientation", {
  "type": "token",
  "values": ["vertical", "undefined", "horizontal"]
}], ["aria-owns", {
  "type": "idlist"
}], ["aria-placeholder", {
  type: "string"
}], ["aria-posinset", {
  "type": "integer"
}], ["aria-pressed", {
  "type": "tristate"
}], ["aria-readonly", {
  "type": "boolean"
}], ["aria-relevant", {
  "type": "tokenlist",
  "values": ["additions", "all", "removals", "text"]
}], ["aria-required", {
  "type": "boolean"
}], ["aria-roledescription", {
  type: "string"
}], ["aria-rowcount", {
  type: "integer"
}], ["aria-rowindex", {
  type: "integer"
}], ["aria-rowspan", {
  type: "integer"
}], ["aria-selected", {
  "type": "boolean",
  "allowundefined": true
}], ["aria-setsize", {
  "type": "integer"
}], ["aria-sort", {
  "type": "token",
  "values": ["ascending", "descending", "none", "other"]
}], ["aria-valuemax", {
  "type": "number"
}], ["aria-valuemin", {
  "type": "number"
}], ["aria-valuenow", {
  "type": "number"
}], ["aria-valuetext", {
  "type": "string"
}]];
var ariaPropsMap = {
  entries: function entries() {
    return properties;
  },
  forEach: function forEach(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var _iterator = _createForOfIteratorHelper$4(properties), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _step$value = _slicedToArray$4(_step.value, 2), key = _step$value[0], values6 = _step$value[1];
        fn.call(thisArg, values6, key, properties);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  get: function get(key) {
    var item = properties.find(function(tuple) {
      return tuple[0] === key ? true : false;
    });
    return item && item[1];
  },
  has: function has(key) {
    return !!ariaPropsMap.get(key);
  },
  keys: function keys() {
    return properties.map(function(_ref) {
      var _ref2 = _slicedToArray$4(_ref, 1), key = _ref2[0];
      return key;
    });
  },
  values: function values() {
    return properties.map(function(_ref3) {
      var _ref4 = _slicedToArray$4(_ref3, 2), values6 = _ref4[1];
      return values6;
    });
  }
};
var _default$2g = (0, _iterationDecorator$4.default)(ariaPropsMap, ariaPropsMap.entries());
ariaPropsMap$1.default = _default$2g;
var domMap$1 = {};
Object.defineProperty(domMap$1, "__esModule", {
  value: true
});
domMap$1.default = void 0;
var _iterationDecorator$3 = _interopRequireDefault$8(iterationDecorator$1);
function _interopRequireDefault$8(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$3(arr, i) {
  var _i2 = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i2 == null)
    return;
  var _arr = [];
  var _n2 = true;
  var _d2 = false;
  var _s, _e2;
  try {
    for (_i2 = _i2.call(arr); !(_n2 = (_s = _i2.next()).done); _n2 = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d2 = true;
    _e2 = err;
  } finally {
    try {
      if (!_n2 && _i2["return"] != null)
        _i2["return"]();
    } finally {
      if (_d2)
        throw _e2;
    }
  }
  return _arr;
}
function _arrayWithHoles$3(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _createForOfIteratorHelper$3(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e3) {
    didErr = true;
    err = _e3;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null)
        it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var dom$1 = [["a", {
  reserved: false
}], ["abbr", {
  reserved: false
}], ["acronym", {
  reserved: false
}], ["address", {
  reserved: false
}], ["applet", {
  reserved: false
}], ["area", {
  reserved: false
}], ["article", {
  reserved: false
}], ["aside", {
  reserved: false
}], ["audio", {
  reserved: false
}], ["b", {
  reserved: false
}], ["base", {
  reserved: true
}], ["bdi", {
  reserved: false
}], ["bdo", {
  reserved: false
}], ["big", {
  reserved: false
}], ["blink", {
  reserved: false
}], ["blockquote", {
  reserved: false
}], ["body", {
  reserved: false
}], ["br", {
  reserved: false
}], ["button", {
  reserved: false
}], ["canvas", {
  reserved: false
}], ["caption", {
  reserved: false
}], ["center", {
  reserved: false
}], ["cite", {
  reserved: false
}], ["code", {
  reserved: false
}], ["col", {
  reserved: true
}], ["colgroup", {
  reserved: true
}], ["content", {
  reserved: false
}], ["data", {
  reserved: false
}], ["datalist", {
  reserved: false
}], ["dd", {
  reserved: false
}], ["del", {
  reserved: false
}], ["details", {
  reserved: false
}], ["dfn", {
  reserved: false
}], ["dialog", {
  reserved: false
}], ["dir", {
  reserved: false
}], ["div", {
  reserved: false
}], ["dl", {
  reserved: false
}], ["dt", {
  reserved: false
}], ["em", {
  reserved: false
}], ["embed", {
  reserved: false
}], ["fieldset", {
  reserved: false
}], ["figcaption", {
  reserved: false
}], ["figure", {
  reserved: false
}], ["font", {
  reserved: false
}], ["footer", {
  reserved: false
}], ["form", {
  reserved: false
}], ["frame", {
  reserved: false
}], ["frameset", {
  reserved: false
}], ["h1", {
  reserved: false
}], ["h2", {
  reserved: false
}], ["h3", {
  reserved: false
}], ["h4", {
  reserved: false
}], ["h5", {
  reserved: false
}], ["h6", {
  reserved: false
}], ["head", {
  reserved: true
}], ["header", {
  reserved: false
}], ["hgroup", {
  reserved: false
}], ["hr", {
  reserved: false
}], ["html", {
  reserved: true
}], ["i", {
  reserved: false
}], ["iframe", {
  reserved: false
}], ["img", {
  reserved: false
}], ["input", {
  reserved: false
}], ["ins", {
  reserved: false
}], ["kbd", {
  reserved: false
}], ["keygen", {
  reserved: false
}], ["label", {
  reserved: false
}], ["legend", {
  reserved: false
}], ["li", {
  reserved: false
}], ["link", {
  reserved: true
}], ["main", {
  reserved: false
}], ["map", {
  reserved: false
}], ["mark", {
  reserved: false
}], ["marquee", {
  reserved: false
}], ["menu", {
  reserved: false
}], ["menuitem", {
  reserved: false
}], ["meta", {
  reserved: true
}], ["meter", {
  reserved: false
}], ["nav", {
  reserved: false
}], ["noembed", {
  reserved: true
}], ["noscript", {
  reserved: true
}], ["object", {
  reserved: false
}], ["ol", {
  reserved: false
}], ["optgroup", {
  reserved: false
}], ["option", {
  reserved: false
}], ["output", {
  reserved: false
}], ["p", {
  reserved: false
}], ["param", {
  reserved: true
}], ["picture", {
  reserved: true
}], ["pre", {
  reserved: false
}], ["progress", {
  reserved: false
}], ["q", {
  reserved: false
}], ["rp", {
  reserved: false
}], ["rt", {
  reserved: false
}], ["rtc", {
  reserved: false
}], ["ruby", {
  reserved: false
}], ["s", {
  reserved: false
}], ["samp", {
  reserved: false
}], ["script", {
  reserved: true
}], ["section", {
  reserved: false
}], ["select", {
  reserved: false
}], ["small", {
  reserved: false
}], ["source", {
  reserved: true
}], ["spacer", {
  reserved: false
}], ["span", {
  reserved: false
}], ["strike", {
  reserved: false
}], ["strong", {
  reserved: false
}], ["style", {
  reserved: true
}], ["sub", {
  reserved: false
}], ["summary", {
  reserved: false
}], ["sup", {
  reserved: false
}], ["table", {
  reserved: false
}], ["tbody", {
  reserved: false
}], ["td", {
  reserved: false
}], ["textarea", {
  reserved: false
}], ["tfoot", {
  reserved: false
}], ["th", {
  reserved: false
}], ["thead", {
  reserved: false
}], ["time", {
  reserved: false
}], ["title", {
  reserved: true
}], ["tr", {
  reserved: false
}], ["track", {
  reserved: true
}], ["tt", {
  reserved: false
}], ["u", {
  reserved: false
}], ["ul", {
  reserved: false
}], ["var", {
  reserved: false
}], ["video", {
  reserved: false
}], ["wbr", {
  reserved: false
}], ["xmp", {
  reserved: false
}]];
var domMap = {
  entries: function entries2() {
    return dom$1;
  },
  forEach: function forEach2(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var _iterator = _createForOfIteratorHelper$3(dom$1), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _step$value = _slicedToArray$3(_step.value, 2), key = _step$value[0], values6 = _step$value[1];
        fn.call(thisArg, values6, key, dom$1);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  get: function get2(key) {
    var item = dom$1.find(function(tuple) {
      return tuple[0] === key ? true : false;
    });
    return item && item[1];
  },
  has: function has2(key) {
    return !!domMap.get(key);
  },
  keys: function keys2() {
    return dom$1.map(function(_ref) {
      var _ref2 = _slicedToArray$3(_ref, 1), key = _ref2[0];
      return key;
    });
  },
  values: function values2() {
    return dom$1.map(function(_ref3) {
      var _ref4 = _slicedToArray$3(_ref3, 2), values6 = _ref4[1];
      return values6;
    });
  }
};
var _default$2f = (0, _iterationDecorator$3.default)(domMap, domMap.entries());
domMap$1.default = _default$2f;
var rolesMap$1 = {};
var ariaAbstractRoles$1 = {};
var commandRole$1 = {};
Object.defineProperty(commandRole$1, "__esModule", {
  value: true
});
commandRole$1.default = void 0;
var commandRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "menuitem"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget"]]
};
var _default$2e = commandRole;
commandRole$1.default = _default$2e;
var compositeRole$1 = {};
Object.defineProperty(compositeRole$1, "__esModule", {
  value: true
});
compositeRole$1.default = void 0;
var compositeRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-activedescendant": null,
    "aria-disabled": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget"]]
};
var _default$2d = compositeRole;
compositeRole$1.default = _default$2d;
var inputRole$1 = {};
Object.defineProperty(inputRole$1, "__esModule", {
  value: true
});
inputRole$1.default = void 0;
var inputRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null
  },
  relatedConcepts: [{
    concept: {
      name: "input"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget"]]
};
var _default$2c = inputRole;
inputRole$1.default = _default$2c;
var landmarkRole$1 = {};
Object.defineProperty(landmarkRole$1, "__esModule", {
  value: true
});
landmarkRole$1.default = void 0;
var landmarkRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$2b = landmarkRole;
landmarkRole$1.default = _default$2b;
var rangeRole$1 = {};
Object.defineProperty(rangeRole$1, "__esModule", {
  value: true
});
rangeRole$1.default = void 0;
var rangeRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-valuemax": null,
    "aria-valuemin": null,
    "aria-valuenow": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$2a = rangeRole;
rangeRole$1.default = _default$2a;
var roletypeRole$1 = {};
Object.defineProperty(roletypeRole$1, "__esModule", {
  value: true
});
roletypeRole$1.default = void 0;
var roletypeRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  prohibitedProps: [],
  props: {
    "aria-atomic": null,
    "aria-busy": null,
    "aria-controls": null,
    "aria-current": null,
    "aria-describedby": null,
    "aria-details": null,
    "aria-dropeffect": null,
    "aria-flowto": null,
    "aria-grabbed": null,
    "aria-hidden": null,
    "aria-keyshortcuts": null,
    "aria-label": null,
    "aria-labelledby": null,
    "aria-live": null,
    "aria-owns": null,
    "aria-relevant": null,
    "aria-roledescription": null
  },
  relatedConcepts: [{
    concept: {
      name: "rel"
    },
    module: "HTML"
  }, {
    concept: {
      name: "role"
    },
    module: "XHTML"
  }, {
    concept: {
      name: "type"
    },
    module: "Dublin Core"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: []
};
var _default$29 = roletypeRole;
roletypeRole$1.default = _default$29;
var sectionRole$1 = {};
Object.defineProperty(sectionRole$1, "__esModule", {
  value: true
});
sectionRole$1.default = void 0;
var sectionRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "frontmatter"
    },
    module: "DTB"
  }, {
    concept: {
      name: "level"
    },
    module: "DTB"
  }, {
    concept: {
      name: "level"
    },
    module: "SMIL"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$28 = sectionRole;
sectionRole$1.default = _default$28;
var sectionheadRole$1 = {};
Object.defineProperty(sectionheadRole$1, "__esModule", {
  value: true
});
sectionheadRole$1.default = void 0;
var sectionheadRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$27 = sectionheadRole;
sectionheadRole$1.default = _default$27;
var selectRole$1 = {};
Object.defineProperty(selectRole$1, "__esModule", {
  value: true
});
selectRole$1.default = void 0;
var selectRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-orientation": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]]
};
var _default$26 = selectRole;
selectRole$1.default = _default$26;
var structureRole$1 = {};
Object.defineProperty(structureRole$1, "__esModule", {
  value: true
});
structureRole$1.default = void 0;
var structureRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype"]]
};
var _default$25 = structureRole;
structureRole$1.default = _default$25;
var widgetRole$1 = {};
Object.defineProperty(widgetRole$1, "__esModule", {
  value: true
});
widgetRole$1.default = void 0;
var widgetRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype"]]
};
var _default$24 = widgetRole;
widgetRole$1.default = _default$24;
var windowRole$1 = {};
Object.defineProperty(windowRole$1, "__esModule", {
  value: true
});
windowRole$1.default = void 0;
var windowRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-modal": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype"]]
};
var _default$23 = windowRole;
windowRole$1.default = _default$23;
Object.defineProperty(ariaAbstractRoles$1, "__esModule", {
  value: true
});
ariaAbstractRoles$1.default = void 0;
var _commandRole = _interopRequireDefault$7(commandRole$1);
var _compositeRole = _interopRequireDefault$7(compositeRole$1);
var _inputRole = _interopRequireDefault$7(inputRole$1);
var _landmarkRole = _interopRequireDefault$7(landmarkRole$1);
var _rangeRole = _interopRequireDefault$7(rangeRole$1);
var _roletypeRole = _interopRequireDefault$7(roletypeRole$1);
var _sectionRole = _interopRequireDefault$7(sectionRole$1);
var _sectionheadRole = _interopRequireDefault$7(sectionheadRole$1);
var _selectRole = _interopRequireDefault$7(selectRole$1);
var _structureRole = _interopRequireDefault$7(structureRole$1);
var _widgetRole = _interopRequireDefault$7(widgetRole$1);
var _windowRole = _interopRequireDefault$7(windowRole$1);
function _interopRequireDefault$7(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var ariaAbstractRoles = [["command", _commandRole.default], ["composite", _compositeRole.default], ["input", _inputRole.default], ["landmark", _landmarkRole.default], ["range", _rangeRole.default], ["roletype", _roletypeRole.default], ["section", _sectionRole.default], ["sectionhead", _sectionheadRole.default], ["select", _selectRole.default], ["structure", _structureRole.default], ["widget", _widgetRole.default], ["window", _windowRole.default]];
var _default$22 = ariaAbstractRoles;
ariaAbstractRoles$1.default = _default$22;
var ariaLiteralRoles$1 = {};
var alertRole$1 = {};
Object.defineProperty(alertRole$1, "__esModule", {
  value: true
});
alertRole$1.default = void 0;
var alertRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-atomic": "true",
    "aria-live": "assertive"
  },
  relatedConcepts: [{
    concept: {
      name: "alert"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$21 = alertRole;
alertRole$1.default = _default$21;
var alertdialogRole$1 = {};
Object.defineProperty(alertdialogRole$1, "__esModule", {
  value: true
});
alertdialogRole$1.default = void 0;
var alertdialogRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "alert"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]]
};
var _default$20 = alertdialogRole;
alertdialogRole$1.default = _default$20;
var applicationRole$1 = {};
Object.defineProperty(applicationRole$1, "__esModule", {
  value: true
});
applicationRole$1.default = void 0;
var applicationRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-activedescendant": null,
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "Device Independence Delivery Unit"
    }
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$1$ = applicationRole;
applicationRole$1.default = _default$1$;
var articleRole$1 = {};
Object.defineProperty(articleRole$1, "__esModule", {
  value: true
});
articleRole$1.default = void 0;
var articleRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-posinset": null,
    "aria-setsize": null
  },
  relatedConcepts: [{
    concept: {
      name: "article"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "document"]]
};
var _default$1_ = articleRole;
articleRole$1.default = _default$1_;
var bannerRole$1 = {};
Object.defineProperty(bannerRole$1, "__esModule", {
  value: true
});
bannerRole$1.default = void 0;
var bannerRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      constraints: ["direct descendant of document"],
      name: "header"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1Z = bannerRole;
bannerRole$1.default = _default$1Z;
var blockquoteRole$1 = {};
Object.defineProperty(blockquoteRole$1, "__esModule", {
  value: true
});
blockquoteRole$1.default = void 0;
var blockquoteRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1Y = blockquoteRole;
blockquoteRole$1.default = _default$1Y;
var buttonRole$1 = {};
Object.defineProperty(buttonRole$1, "__esModule", {
  value: true
});
buttonRole$1.default = void 0;
var buttonRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-pressed": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "aria-pressed"
      }, {
        name: "type",
        value: "checkbox"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "aria-expanded",
        value: "false"
      }],
      name: "summary"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "aria-expanded",
        value: "true"
      }],
      constraints: ["direct descendant of details element with the open attribute defined"],
      name: "summary"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "type",
        value: "button"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "type",
        value: "image"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "type",
        value: "reset"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "type",
        value: "submit"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      name: "button"
    },
    module: "HTML"
  }, {
    concept: {
      name: "trigger"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command"]]
};
var _default$1X = buttonRole;
buttonRole$1.default = _default$1X;
var captionRole$1 = {};
Object.defineProperty(captionRole$1, "__esModule", {
  value: true
});
captionRole$1.default = void 0;
var captionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: ["figure", "grid", "table"],
  requiredContextRole: ["figure", "grid", "table"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1W = captionRole;
captionRole$1.default = _default$1W;
var cellRole$1 = {};
Object.defineProperty(cellRole$1, "__esModule", {
  value: true
});
cellRole$1.default = void 0;
var cellRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-colindex": null,
    "aria-colspan": null,
    "aria-rowindex": null,
    "aria-rowspan": null
  },
  relatedConcepts: [{
    concept: {
      constraints: ["descendant of table"],
      name: "td"
    },
    module: "HTML"
  }],
  requireContextRole: ["row"],
  requiredContextRole: ["row"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1V = cellRole;
cellRole$1.default = _default$1V;
var checkboxRole$1 = {};
Object.defineProperty(checkboxRole$1, "__esModule", {
  value: true
});
checkboxRole$1.default = void 0;
var checkboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-checked": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-required": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "type",
        value: "checkbox"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      name: "option"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-checked": null
  },
  superClass: [["roletype", "widget", "input"]]
};
var _default$1U = checkboxRole;
checkboxRole$1.default = _default$1U;
var codeRole$1 = {};
Object.defineProperty(codeRole$1, "__esModule", {
  value: true
});
codeRole$1.default = void 0;
var codeRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1T = codeRole;
codeRole$1.default = _default$1T;
var columnheaderRole$1 = {};
Object.defineProperty(columnheaderRole$1, "__esModule", {
  value: true
});
columnheaderRole$1.default = void 0;
var columnheaderRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-sort": null
  },
  relatedConcepts: [{
    attributes: [{
      name: "scope",
      value: "col"
    }],
    concept: {
      name: "th"
    },
    module: "HTML"
  }],
  requireContextRole: ["row"],
  requiredContextRole: ["row"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
};
var _default$1S = columnheaderRole;
columnheaderRole$1.default = _default$1S;
var comboboxRole$1 = {};
Object.defineProperty(comboboxRole$1, "__esModule", {
  value: true
});
comboboxRole$1.default = void 0;
var comboboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-activedescendant": null,
    "aria-autocomplete": null,
    "aria-errormessage": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-required": null,
    "aria-expanded": "false",
    "aria-haspopup": "listbox"
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "email"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "search"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "tel"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "text"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "url"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "list"
      }, {
        name: "type",
        value: "url"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "multiple"
      }, {
        constraints: ["undefined"],
        name: "size"
      }],
      name: "select"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "multiple"
      }, {
        name: "size",
        value: 1
      }],
      name: "select"
    },
    module: "HTML"
  }, {
    concept: {
      name: "select"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-controls": null,
    "aria-expanded": "false"
  },
  superClass: [["roletype", "widget", "input"]]
};
var _default$1R = comboboxRole;
comboboxRole$1.default = _default$1R;
var complementaryRole$1 = {};
Object.defineProperty(complementaryRole$1, "__esModule", {
  value: true
});
complementaryRole$1.default = void 0;
var complementaryRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "aside"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1Q = complementaryRole;
complementaryRole$1.default = _default$1Q;
var contentinfoRole$1 = {};
Object.defineProperty(contentinfoRole$1, "__esModule", {
  value: true
});
contentinfoRole$1.default = void 0;
var contentinfoRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      constraints: ["direct descendant of document"],
      name: "footer"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1P = contentinfoRole;
contentinfoRole$1.default = _default$1P;
var definitionRole$1 = {};
Object.defineProperty(definitionRole$1, "__esModule", {
  value: true
});
definitionRole$1.default = void 0;
var definitionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "dd"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1O = definitionRole;
definitionRole$1.default = _default$1O;
var deletionRole$1 = {};
Object.defineProperty(deletionRole$1, "__esModule", {
  value: true
});
deletionRole$1.default = void 0;
var deletionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1N = deletionRole;
deletionRole$1.default = _default$1N;
var dialogRole$1 = {};
Object.defineProperty(dialogRole$1, "__esModule", {
  value: true
});
dialogRole$1.default = void 0;
var dialogRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "dialog"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "window"]]
};
var _default$1M = dialogRole;
dialogRole$1.default = _default$1M;
var directoryRole$1 = {};
Object.defineProperty(directoryRole$1, "__esModule", {
  value: true
});
directoryRole$1.default = void 0;
var directoryRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    module: "DAISY Guide"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "list"]]
};
var _default$1L = directoryRole;
directoryRole$1.default = _default$1L;
var documentRole$1 = {};
Object.defineProperty(documentRole$1, "__esModule", {
  value: true
});
documentRole$1.default = void 0;
var documentRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "Device Independence Delivery Unit"
    }
  }, {
    concept: {
      name: "body"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$1K = documentRole;
documentRole$1.default = _default$1K;
var emphasisRole$1 = {};
Object.defineProperty(emphasisRole$1, "__esModule", {
  value: true
});
emphasisRole$1.default = void 0;
var emphasisRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1J = emphasisRole;
emphasisRole$1.default = _default$1J;
var feedRole$1 = {};
Object.defineProperty(feedRole$1, "__esModule", {
  value: true
});
feedRole$1.default = void 0;
var feedRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["article"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "list"]]
};
var _default$1I = feedRole;
feedRole$1.default = _default$1I;
var figureRole$1 = {};
Object.defineProperty(figureRole$1, "__esModule", {
  value: true
});
figureRole$1.default = void 0;
var figureRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "figure"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1H = figureRole;
figureRole$1.default = _default$1H;
var formRole$1 = {};
Object.defineProperty(formRole$1, "__esModule", {
  value: true
});
formRole$1.default = void 0;
var formRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "aria-label"
      }],
      name: "form"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "aria-labelledby"
      }],
      name: "form"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "name"
      }],
      name: "form"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1G = formRole;
formRole$1.default = _default$1G;
var genericRole$1 = {};
Object.defineProperty(genericRole$1, "__esModule", {
  value: true
});
genericRole$1.default = void 0;
var genericRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "span"
    },
    module: "HTML"
  }, {
    concept: {
      name: "div"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$1F = genericRole;
genericRole$1.default = _default$1F;
var gridRole$1 = {};
Object.defineProperty(gridRole$1, "__esModule", {
  value: true
});
gridRole$1.default = void 0;
var gridRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-multiselectable": null,
    "aria-readonly": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "role",
        value: "grid"
      }],
      name: "table"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["row"], ["row", "rowgroup"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]]
};
var _default$1E = gridRole;
gridRole$1.default = _default$1E;
var gridcellRole$1 = {};
Object.defineProperty(gridcellRole$1, "__esModule", {
  value: true
});
gridcellRole$1.default = void 0;
var gridcellRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-required": null,
    "aria-selected": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "role",
        value: "gridcell"
      }],
      name: "td"
    },
    module: "HTML"
  }],
  requireContextRole: ["row"],
  requiredContextRole: ["row"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]]
};
var _default$1D = gridcellRole;
gridcellRole$1.default = _default$1D;
var groupRole$1 = {};
Object.defineProperty(groupRole$1, "__esModule", {
  value: true
});
groupRole$1.default = void 0;
var groupRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-activedescendant": null,
    "aria-disabled": null
  },
  relatedConcepts: [{
    concept: {
      name: "details"
    },
    module: "HTML"
  }, {
    concept: {
      name: "fieldset"
    },
    module: "HTML"
  }, {
    concept: {
      name: "optgroup"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1C = groupRole;
groupRole$1.default = _default$1C;
var headingRole$1 = {};
Object.defineProperty(headingRole$1, "__esModule", {
  value: true
});
headingRole$1.default = void 0;
var headingRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-level": "2"
  },
  relatedConcepts: [{
    concept: {
      name: "h1"
    },
    module: "HTML"
  }, {
    concept: {
      name: "h2"
    },
    module: "HTML"
  }, {
    concept: {
      name: "h3"
    },
    module: "HTML"
  }, {
    concept: {
      name: "h4"
    },
    module: "HTML"
  }, {
    concept: {
      name: "h5"
    },
    module: "HTML"
  }, {
    concept: {
      name: "h6"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-level": "2"
  },
  superClass: [["roletype", "structure", "sectionhead"]]
};
var _default$1B = headingRole;
headingRole$1.default = _default$1B;
var imgRole$1 = {};
Object.defineProperty(imgRole$1, "__esModule", {
  value: true
});
imgRole$1.default = void 0;
var imgRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "alt"
      }],
      name: "img"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "alt"
      }],
      name: "img"
    },
    module: "HTML"
  }, {
    concept: {
      name: "imggroup"
    },
    module: "DTB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1A = imgRole;
imgRole$1.default = _default$1A;
var insertionRole$1 = {};
Object.defineProperty(insertionRole$1, "__esModule", {
  value: true
});
insertionRole$1.default = void 0;
var insertionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1z = insertionRole;
insertionRole$1.default = _default$1z;
var linkRole$1 = {};
Object.defineProperty(linkRole$1, "__esModule", {
  value: true
});
linkRole$1.default = void 0;
var linkRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-expanded": null,
    "aria-haspopup": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "href"
      }],
      name: "a"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "href"
      }],
      name: "area"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "href"
      }],
      name: "link"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command"]]
};
var _default$1y = linkRole;
linkRole$1.default = _default$1y;
var listRole$1 = {};
Object.defineProperty(listRole$1, "__esModule", {
  value: true
});
listRole$1.default = void 0;
var listRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "menu"
    },
    module: "HTML"
  }, {
    concept: {
      name: "ol"
    },
    module: "HTML"
  }, {
    concept: {
      name: "ul"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["listitem"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1x = listRole;
listRole$1.default = _default$1x;
var listboxRole$1 = {};
Object.defineProperty(listboxRole$1, "__esModule", {
  value: true
});
listboxRole$1.default = void 0;
var listboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-invalid": null,
    "aria-multiselectable": null,
    "aria-readonly": null,
    "aria-required": null,
    "aria-orientation": "vertical"
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: [">1"],
        name: "size"
      }, {
        name: "multiple"
      }],
      name: "select"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: [">1"],
        name: "size"
      }],
      name: "select"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "multiple"
      }],
      name: "select"
    },
    module: "HTML"
  }, {
    concept: {
      name: "datalist"
    },
    module: "HTML"
  }, {
    concept: {
      name: "list"
    },
    module: "ARIA"
  }, {
    concept: {
      name: "select"
    },
    module: "XForms"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["option", "group"], ["option"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
};
var _default$1w = listboxRole;
listboxRole$1.default = _default$1w;
var listitemRole$1 = {};
Object.defineProperty(listitemRole$1, "__esModule", {
  value: true
});
listitemRole$1.default = void 0;
var listitemRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-level": null,
    "aria-posinset": null,
    "aria-setsize": null
  },
  relatedConcepts: [{
    concept: {
      constraints: ["direct descendant of ol, ul or menu"],
      name: "li"
    },
    module: "HTML"
  }, {
    concept: {
      name: "item"
    },
    module: "XForms"
  }],
  requireContextRole: ["directory", "list"],
  requiredContextRole: ["directory", "list"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1v = listitemRole;
listitemRole$1.default = _default$1v;
var logRole$1 = {};
Object.defineProperty(logRole$1, "__esModule", {
  value: true
});
logRole$1.default = void 0;
var logRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-live": "polite"
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1u = logRole;
logRole$1.default = _default$1u;
var mainRole$1 = {};
Object.defineProperty(mainRole$1, "__esModule", {
  value: true
});
mainRole$1.default = void 0;
var mainRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "main"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1t = mainRole;
mainRole$1.default = _default$1t;
var marqueeRole$1 = {};
Object.defineProperty(marqueeRole$1, "__esModule", {
  value: true
});
marqueeRole$1.default = void 0;
var marqueeRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1s = marqueeRole;
marqueeRole$1.default = _default$1s;
var mathRole$1 = {};
Object.defineProperty(mathRole$1, "__esModule", {
  value: true
});
mathRole$1.default = void 0;
var mathRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "math"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1r = mathRole;
mathRole$1.default = _default$1r;
var menuRole$1 = {};
Object.defineProperty(menuRole$1, "__esModule", {
  value: true
});
menuRole$1.default = void 0;
var menuRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-orientation": "vertical"
  },
  relatedConcepts: [{
    concept: {
      name: "MENU"
    },
    module: "JAPI"
  }, {
    concept: {
      name: "list"
    },
    module: "ARIA"
  }, {
    concept: {
      name: "select"
    },
    module: "XForms"
  }, {
    concept: {
      name: "sidebar"
    },
    module: "DTB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
};
var _default$1q = menuRole;
menuRole$1.default = _default$1q;
var menubarRole$1 = {};
Object.defineProperty(menubarRole$1, "__esModule", {
  value: true
});
menubarRole$1.default = void 0;
var menubarRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-orientation": "horizontal"
  },
  relatedConcepts: [{
    concept: {
      name: "toolbar"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]]
};
var _default$1p = menubarRole;
menubarRole$1.default = _default$1p;
var menuitemRole$1 = {};
Object.defineProperty(menuitemRole$1, "__esModule", {
  value: true
});
menuitemRole$1.default = void 0;
var menuitemRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-posinset": null,
    "aria-setsize": null
  },
  relatedConcepts: [{
    concept: {
      name: "MENU_ITEM"
    },
    module: "JAPI"
  }, {
    concept: {
      name: "listitem"
    },
    module: "ARIA"
  }, {
    concept: {
      name: "menuitem"
    },
    module: "HTML"
  }, {
    concept: {
      name: "option"
    },
    module: "ARIA"
  }],
  requireContextRole: ["group", "menu", "menubar"],
  requiredContextRole: ["group", "menu", "menubar"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command"]]
};
var _default$1o = menuitemRole;
menuitemRole$1.default = _default$1o;
var menuitemcheckboxRole$1 = {};
Object.defineProperty(menuitemcheckboxRole$1, "__esModule", {
  value: true
});
menuitemcheckboxRole$1.default = void 0;
var menuitemcheckboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "menuitem"
    },
    module: "ARIA"
  }],
  requireContextRole: ["group", "menu", "menubar"],
  requiredContextRole: ["group", "menu", "menubar"],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-checked": null
  },
  superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]]
};
var _default$1n = menuitemcheckboxRole;
menuitemcheckboxRole$1.default = _default$1n;
var menuitemradioRole$1 = {};
Object.defineProperty(menuitemradioRole$1, "__esModule", {
  value: true
});
menuitemradioRole$1.default = void 0;
var menuitemradioRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "menuitem"
    },
    module: "ARIA"
  }],
  requireContextRole: ["group", "menu", "menubar"],
  requiredContextRole: ["group", "menu", "menubar"],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-checked": null
  },
  superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]]
};
var _default$1m = menuitemradioRole;
menuitemradioRole$1.default = _default$1m;
var meterRole$1 = {};
Object.defineProperty(meterRole$1, "__esModule", {
  value: true
});
meterRole$1.default = void 0;
var meterRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-valuetext": null,
    "aria-valuemax": "100",
    "aria-valuemin": "0"
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-valuenow": null
  },
  superClass: [["roletype", "structure", "range"]]
};
var _default$1l = meterRole;
meterRole$1.default = _default$1l;
var navigationRole$1 = {};
Object.defineProperty(navigationRole$1, "__esModule", {
  value: true
});
navigationRole$1.default = void 0;
var navigationRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "nav"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1k = navigationRole;
navigationRole$1.default = _default$1k;
var noneRole$1 = {};
Object.defineProperty(noneRole$1, "__esModule", {
  value: true
});
noneRole$1.default = void 0;
var noneRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: []
};
var _default$1j = noneRole;
noneRole$1.default = _default$1j;
var noteRole$1 = {};
Object.defineProperty(noteRole$1, "__esModule", {
  value: true
});
noteRole$1.default = void 0;
var noteRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1i = noteRole;
noteRole$1.default = _default$1i;
var optionRole$1 = {};
Object.defineProperty(optionRole$1, "__esModule", {
  value: true
});
optionRole$1.default = void 0;
var optionRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-checked": null,
    "aria-posinset": null,
    "aria-setsize": null,
    "aria-selected": "false"
  },
  relatedConcepts: [{
    concept: {
      name: "item"
    },
    module: "XForms"
  }, {
    concept: {
      name: "listitem"
    },
    module: "ARIA"
  }, {
    concept: {
      name: "option"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-selected": "false"
  },
  superClass: [["roletype", "widget", "input"]]
};
var _default$1h = optionRole;
optionRole$1.default = _default$1h;
var paragraphRole$1 = {};
Object.defineProperty(paragraphRole$1, "__esModule", {
  value: true
});
paragraphRole$1.default = void 0;
var paragraphRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$1g = paragraphRole;
paragraphRole$1.default = _default$1g;
var presentationRole$1 = {};
Object.defineProperty(presentationRole$1, "__esModule", {
  value: true
});
presentationRole$1.default = void 0;
var presentationRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$1f = presentationRole;
presentationRole$1.default = _default$1f;
var progressbarRole$1 = {};
Object.defineProperty(progressbarRole$1, "__esModule", {
  value: true
});
progressbarRole$1.default = void 0;
var progressbarRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-valuetext": null
  },
  relatedConcepts: [{
    concept: {
      name: "progress"
    },
    module: "HTML"
  }, {
    concept: {
      name: "status"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
};
var _default$1e = progressbarRole;
progressbarRole$1.default = _default$1e;
var radioRole$1 = {};
Object.defineProperty(radioRole$1, "__esModule", {
  value: true
});
radioRole$1.default = void 0;
var radioRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-checked": null,
    "aria-posinset": null,
    "aria-setsize": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "type",
        value: "radio"
      }],
      name: "input"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-checked": null
  },
  superClass: [["roletype", "widget", "input"]]
};
var _default$1d = radioRole;
radioRole$1.default = _default$1d;
var radiogroupRole$1 = {};
Object.defineProperty(radiogroupRole$1, "__esModule", {
  value: true
});
radiogroupRole$1.default = void 0;
var radiogroupRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-required": null
  },
  relatedConcepts: [{
    concept: {
      name: "list"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["radio"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
};
var _default$1c = radiogroupRole;
radiogroupRole$1.default = _default$1c;
var regionRole$1 = {};
Object.defineProperty(regionRole$1, "__esModule", {
  value: true
});
regionRole$1.default = void 0;
var regionRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "aria-label"
      }],
      name: "section"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["set"],
        name: "aria-labelledby"
      }],
      name: "section"
    },
    module: "HTML"
  }, {
    concept: {
      name: "Device Independence Glossart perceivable unit"
    }
  }, {
    concept: {
      name: "frame"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$1b = regionRole;
regionRole$1.default = _default$1b;
var rowRole$1 = {};
Object.defineProperty(rowRole$1, "__esModule", {
  value: true
});
rowRole$1.default = void 0;
var rowRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-colindex": null,
    "aria-expanded": null,
    "aria-level": null,
    "aria-posinset": null,
    "aria-rowindex": null,
    "aria-selected": null,
    "aria-setsize": null
  },
  relatedConcepts: [{
    concept: {
      name: "tr"
    },
    module: "HTML"
  }],
  requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
  requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
  requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]]
};
var _default$1a = rowRole;
rowRole$1.default = _default$1a;
var rowgroupRole$1 = {};
Object.defineProperty(rowgroupRole$1, "__esModule", {
  value: true
});
rowgroupRole$1.default = void 0;
var rowgroupRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "tbody"
    },
    module: "HTML"
  }, {
    concept: {
      name: "tfoot"
    },
    module: "HTML"
  }, {
    concept: {
      name: "thead"
    },
    module: "HTML"
  }],
  requireContextRole: ["grid", "table", "treegrid"],
  requiredContextRole: ["grid", "table", "treegrid"],
  requiredOwnedElements: [["row"]],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$19 = rowgroupRole;
rowgroupRole$1.default = _default$19;
var rowheaderRole$1 = {};
Object.defineProperty(rowheaderRole$1, "__esModule", {
  value: true
});
rowheaderRole$1.default = void 0;
var rowheaderRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-sort": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "scope",
        value: "row"
      }],
      name: "th"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        name: "scope",
        value: "rowgroup"
      }],
      name: "th"
    },
    module: "HTML"
  }],
  requireContextRole: ["row", "rowgroup"],
  requiredContextRole: ["row", "rowgroup"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
};
var _default$18 = rowheaderRole;
rowheaderRole$1.default = _default$18;
var scrollbarRole$1 = {};
Object.defineProperty(scrollbarRole$1, "__esModule", {
  value: true
});
scrollbarRole$1.default = void 0;
var scrollbarRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-valuetext": null,
    "aria-orientation": "vertical",
    "aria-valuemax": "100",
    "aria-valuemin": "0"
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-controls": null,
    "aria-valuenow": null
  },
  superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
};
var _default$17 = scrollbarRole;
scrollbarRole$1.default = _default$17;
var searchRole$1 = {};
Object.defineProperty(searchRole$1, "__esModule", {
  value: true
});
searchRole$1.default = void 0;
var searchRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$16 = searchRole;
searchRole$1.default = _default$16;
var searchboxRole$1 = {};
Object.defineProperty(searchboxRole$1, "__esModule", {
  value: true
});
searchboxRole$1.default = void 0;
var searchboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "list"
      }, {
        name: "type",
        value: "search"
      }],
      name: "input"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "input", "textbox"]]
};
var _default$15 = searchboxRole;
searchboxRole$1.default = _default$15;
var separatorRole$1 = {};
Object.defineProperty(separatorRole$1, "__esModule", {
  value: true
});
separatorRole$1.default = void 0;
var separatorRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-orientation": "horizontal",
    "aria-valuemax": "100",
    "aria-valuemin": "0",
    "aria-valuenow": null,
    "aria-valuetext": null
  },
  relatedConcepts: [{
    concept: {
      name: "hr"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure"]]
};
var _default$14 = separatorRole;
separatorRole$1.default = _default$14;
var sliderRole$1 = {};
Object.defineProperty(sliderRole$1, "__esModule", {
  value: true
});
sliderRole$1.default = void 0;
var sliderRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-haspopup": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-valuetext": null,
    "aria-orientation": "horizontal",
    "aria-valuemax": "100",
    "aria-valuemin": "0"
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "type",
        value: "range"
      }],
      name: "input"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-valuenow": null
  },
  superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]]
};
var _default$13 = sliderRole;
sliderRole$1.default = _default$13;
var spinbuttonRole$1 = {};
Object.defineProperty(spinbuttonRole$1, "__esModule", {
  value: true
});
spinbuttonRole$1.default = void 0;
var spinbuttonRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null,
    "aria-readonly": null,
    "aria-required": null,
    "aria-valuetext": null,
    "aria-valuenow": "0"
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        name: "type",
        value: "number"
      }],
      name: "input"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]]
};
var _default$12 = spinbuttonRole;
spinbuttonRole$1.default = _default$12;
var statusRole$1 = {};
Object.defineProperty(statusRole$1, "__esModule", {
  value: true
});
statusRole$1.default = void 0;
var statusRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-atomic": "true",
    "aria-live": "polite"
  },
  relatedConcepts: [{
    concept: {
      name: "output"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$11 = statusRole;
statusRole$1.default = _default$11;
var strongRole$1 = {};
Object.defineProperty(strongRole$1, "__esModule", {
  value: true
});
strongRole$1.default = void 0;
var strongRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$10 = strongRole;
strongRole$1.default = _default$10;
var subscriptRole$1 = {};
Object.defineProperty(subscriptRole$1, "__esModule", {
  value: true
});
subscriptRole$1.default = void 0;
var subscriptRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$$ = subscriptRole;
subscriptRole$1.default = _default$$;
var superscriptRole$1 = {};
Object.defineProperty(superscriptRole$1, "__esModule", {
  value: true
});
superscriptRole$1.default = void 0;
var superscriptRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["prohibited"],
  prohibitedProps: ["aria-label", "aria-labelledby"],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$_ = superscriptRole;
superscriptRole$1.default = _default$_;
var switchRole$1 = {};
Object.defineProperty(switchRole$1, "__esModule", {
  value: true
});
switchRole$1.default = void 0;
var switchRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "button"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-checked": null
  },
  superClass: [["roletype", "widget", "input", "checkbox"]]
};
var _default$Z = switchRole;
switchRole$1.default = _default$Z;
var tabRole$1 = {};
Object.defineProperty(tabRole$1, "__esModule", {
  value: true
});
tabRole$1.default = void 0;
var tabRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-posinset": null,
    "aria-setsize": null,
    "aria-selected": "false"
  },
  relatedConcepts: [],
  requireContextRole: ["tablist"],
  requiredContextRole: ["tablist"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]]
};
var _default$Y = tabRole;
tabRole$1.default = _default$Y;
var tableRole$1 = {};
Object.defineProperty(tableRole$1, "__esModule", {
  value: true
});
tableRole$1.default = void 0;
var tableRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-colcount": null,
    "aria-rowcount": null
  },
  relatedConcepts: [{
    concept: {
      name: "table"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["row"], ["row", "rowgroup"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$X = tableRole;
tableRole$1.default = _default$X;
var tablistRole$1 = {};
Object.defineProperty(tablistRole$1, "__esModule", {
  value: true
});
tablistRole$1.default = void 0;
var tablistRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-level": null,
    "aria-multiselectable": null,
    "aria-orientation": "horizontal"
  },
  relatedConcepts: [{
    module: "DAISY",
    concept: {
      name: "guide"
    }
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["tab"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite"]]
};
var _default$W = tablistRole;
tablistRole$1.default = _default$W;
var tabpanelRole$1 = {};
Object.defineProperty(tabpanelRole$1, "__esModule", {
  value: true
});
tabpanelRole$1.default = void 0;
var tabpanelRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$V = tabpanelRole;
tabpanelRole$1.default = _default$V;
var termRole$1 = {};
Object.defineProperty(termRole$1, "__esModule", {
  value: true
});
termRole$1.default = void 0;
var termRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "dfn"
    },
    module: "HTML"
  }, {
    concept: {
      name: "dt"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$U = termRole;
termRole$1.default = _default$U;
var textboxRole$1 = {};
Object.defineProperty(textboxRole$1, "__esModule", {
  value: true
});
textboxRole$1.default = void 0;
var textboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-activedescendant": null,
    "aria-autocomplete": null,
    "aria-errormessage": null,
    "aria-haspopup": null,
    "aria-invalid": null,
    "aria-multiline": null,
    "aria-placeholder": null,
    "aria-readonly": null,
    "aria-required": null
  },
  relatedConcepts: [{
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "type"
      }, {
        constraints: ["undefined"],
        name: "list"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "list"
      }, {
        name: "type",
        value: "email"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "list"
      }, {
        name: "type",
        value: "tel"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "list"
      }, {
        name: "type",
        value: "text"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      attributes: [{
        constraints: ["undefined"],
        name: "list"
      }, {
        name: "type",
        value: "url"
      }],
      name: "input"
    },
    module: "HTML"
  }, {
    concept: {
      name: "input"
    },
    module: "XForms"
  }, {
    concept: {
      name: "textarea"
    },
    module: "HTML"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "input"]]
};
var _default$T = textboxRole;
textboxRole$1.default = _default$T;
var timeRole$1 = {};
Object.defineProperty(timeRole$1, "__esModule", {
  value: true
});
timeRole$1.default = void 0;
var timeRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$S = timeRole;
timeRole$1.default = _default$S;
var timerRole$1 = {};
Object.defineProperty(timerRole$1, "__esModule", {
  value: true
});
timerRole$1.default = void 0;
var timerRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "status"]]
};
var _default$R = timerRole;
timerRole$1.default = _default$R;
var toolbarRole$1 = {};
Object.defineProperty(toolbarRole$1, "__esModule", {
  value: true
});
toolbarRole$1.default = void 0;
var toolbarRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-orientation": "horizontal"
  },
  relatedConcepts: [{
    concept: {
      name: "menubar"
    },
    module: "ARIA"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "group"]]
};
var _default$Q = toolbarRole;
toolbarRole$1.default = _default$Q;
var tooltipRole$1 = {};
Object.defineProperty(tooltipRole$1, "__esModule", {
  value: true
});
tooltipRole$1.default = void 0;
var tooltipRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$P = tooltipRole;
tooltipRole$1.default = _default$P;
var treeRole$1 = {};
Object.defineProperty(treeRole$1, "__esModule", {
  value: true
});
treeRole$1.default = void 0;
var treeRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null,
    "aria-multiselectable": null,
    "aria-required": null,
    "aria-orientation": "vertical"
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
};
var _default$O = treeRole;
treeRole$1.default = _default$O;
var treegridRole$1 = {};
Object.defineProperty(treegridRole$1, "__esModule", {
  value: true
});
treegridRole$1.default = void 0;
var treegridRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["row"], ["row", "rowgroup"]],
  requiredProps: {},
  superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]]
};
var _default$N = treegridRole;
treegridRole$1.default = _default$N;
var treeitemRole$1 = {};
Object.defineProperty(treeitemRole$1, "__esModule", {
  value: true
});
treeitemRole$1.default = void 0;
var treeitemRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-expanded": null,
    "aria-haspopup": null
  },
  relatedConcepts: [],
  requireContextRole: ["group", "tree"],
  requiredContextRole: ["group", "tree"],
  requiredOwnedElements: [],
  requiredProps: {
    "aria-selected": null
  },
  superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]]
};
var _default$M = treeitemRole;
treeitemRole$1.default = _default$M;
Object.defineProperty(ariaLiteralRoles$1, "__esModule", {
  value: true
});
ariaLiteralRoles$1.default = void 0;
var _alertRole = _interopRequireDefault$6(alertRole$1);
var _alertdialogRole = _interopRequireDefault$6(alertdialogRole$1);
var _applicationRole = _interopRequireDefault$6(applicationRole$1);
var _articleRole = _interopRequireDefault$6(articleRole$1);
var _bannerRole = _interopRequireDefault$6(bannerRole$1);
var _blockquoteRole = _interopRequireDefault$6(blockquoteRole$1);
var _buttonRole = _interopRequireDefault$6(buttonRole$1);
var _captionRole = _interopRequireDefault$6(captionRole$1);
var _cellRole = _interopRequireDefault$6(cellRole$1);
var _checkboxRole = _interopRequireDefault$6(checkboxRole$1);
var _codeRole = _interopRequireDefault$6(codeRole$1);
var _columnheaderRole = _interopRequireDefault$6(columnheaderRole$1);
var _comboboxRole = _interopRequireDefault$6(comboboxRole$1);
var _complementaryRole = _interopRequireDefault$6(complementaryRole$1);
var _contentinfoRole = _interopRequireDefault$6(contentinfoRole$1);
var _definitionRole = _interopRequireDefault$6(definitionRole$1);
var _deletionRole = _interopRequireDefault$6(deletionRole$1);
var _dialogRole = _interopRequireDefault$6(dialogRole$1);
var _directoryRole = _interopRequireDefault$6(directoryRole$1);
var _documentRole = _interopRequireDefault$6(documentRole$1);
var _emphasisRole = _interopRequireDefault$6(emphasisRole$1);
var _feedRole = _interopRequireDefault$6(feedRole$1);
var _figureRole = _interopRequireDefault$6(figureRole$1);
var _formRole = _interopRequireDefault$6(formRole$1);
var _genericRole = _interopRequireDefault$6(genericRole$1);
var _gridRole = _interopRequireDefault$6(gridRole$1);
var _gridcellRole = _interopRequireDefault$6(gridcellRole$1);
var _groupRole = _interopRequireDefault$6(groupRole$1);
var _headingRole = _interopRequireDefault$6(headingRole$1);
var _imgRole = _interopRequireDefault$6(imgRole$1);
var _insertionRole = _interopRequireDefault$6(insertionRole$1);
var _linkRole = _interopRequireDefault$6(linkRole$1);
var _listRole = _interopRequireDefault$6(listRole$1);
var _listboxRole = _interopRequireDefault$6(listboxRole$1);
var _listitemRole = _interopRequireDefault$6(listitemRole$1);
var _logRole = _interopRequireDefault$6(logRole$1);
var _mainRole = _interopRequireDefault$6(mainRole$1);
var _marqueeRole = _interopRequireDefault$6(marqueeRole$1);
var _mathRole = _interopRequireDefault$6(mathRole$1);
var _menuRole = _interopRequireDefault$6(menuRole$1);
var _menubarRole = _interopRequireDefault$6(menubarRole$1);
var _menuitemRole = _interopRequireDefault$6(menuitemRole$1);
var _menuitemcheckboxRole = _interopRequireDefault$6(menuitemcheckboxRole$1);
var _menuitemradioRole = _interopRequireDefault$6(menuitemradioRole$1);
var _meterRole = _interopRequireDefault$6(meterRole$1);
var _navigationRole = _interopRequireDefault$6(navigationRole$1);
var _noneRole = _interopRequireDefault$6(noneRole$1);
var _noteRole = _interopRequireDefault$6(noteRole$1);
var _optionRole = _interopRequireDefault$6(optionRole$1);
var _paragraphRole = _interopRequireDefault$6(paragraphRole$1);
var _presentationRole = _interopRequireDefault$6(presentationRole$1);
var _progressbarRole = _interopRequireDefault$6(progressbarRole$1);
var _radioRole = _interopRequireDefault$6(radioRole$1);
var _radiogroupRole = _interopRequireDefault$6(radiogroupRole$1);
var _regionRole = _interopRequireDefault$6(regionRole$1);
var _rowRole = _interopRequireDefault$6(rowRole$1);
var _rowgroupRole = _interopRequireDefault$6(rowgroupRole$1);
var _rowheaderRole = _interopRequireDefault$6(rowheaderRole$1);
var _scrollbarRole = _interopRequireDefault$6(scrollbarRole$1);
var _searchRole = _interopRequireDefault$6(searchRole$1);
var _searchboxRole = _interopRequireDefault$6(searchboxRole$1);
var _separatorRole = _interopRequireDefault$6(separatorRole$1);
var _sliderRole = _interopRequireDefault$6(sliderRole$1);
var _spinbuttonRole = _interopRequireDefault$6(spinbuttonRole$1);
var _statusRole = _interopRequireDefault$6(statusRole$1);
var _strongRole = _interopRequireDefault$6(strongRole$1);
var _subscriptRole = _interopRequireDefault$6(subscriptRole$1);
var _superscriptRole = _interopRequireDefault$6(superscriptRole$1);
var _switchRole = _interopRequireDefault$6(switchRole$1);
var _tabRole = _interopRequireDefault$6(tabRole$1);
var _tableRole = _interopRequireDefault$6(tableRole$1);
var _tablistRole = _interopRequireDefault$6(tablistRole$1);
var _tabpanelRole = _interopRequireDefault$6(tabpanelRole$1);
var _termRole = _interopRequireDefault$6(termRole$1);
var _textboxRole = _interopRequireDefault$6(textboxRole$1);
var _timeRole = _interopRequireDefault$6(timeRole$1);
var _timerRole = _interopRequireDefault$6(timerRole$1);
var _toolbarRole = _interopRequireDefault$6(toolbarRole$1);
var _tooltipRole = _interopRequireDefault$6(tooltipRole$1);
var _treeRole = _interopRequireDefault$6(treeRole$1);
var _treegridRole = _interopRequireDefault$6(treegridRole$1);
var _treeitemRole = _interopRequireDefault$6(treeitemRole$1);
function _interopRequireDefault$6(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var ariaLiteralRoles = [["alert", _alertRole.default], ["alertdialog", _alertdialogRole.default], ["application", _applicationRole.default], ["article", _articleRole.default], ["banner", _bannerRole.default], ["blockquote", _blockquoteRole.default], ["button", _buttonRole.default], ["caption", _captionRole.default], ["cell", _cellRole.default], ["checkbox", _checkboxRole.default], ["code", _codeRole.default], ["columnheader", _columnheaderRole.default], ["combobox", _comboboxRole.default], ["complementary", _complementaryRole.default], ["contentinfo", _contentinfoRole.default], ["definition", _definitionRole.default], ["deletion", _deletionRole.default], ["dialog", _dialogRole.default], ["directory", _directoryRole.default], ["document", _documentRole.default], ["emphasis", _emphasisRole.default], ["feed", _feedRole.default], ["figure", _figureRole.default], ["form", _formRole.default], ["generic", _genericRole.default], ["grid", _gridRole.default], ["gridcell", _gridcellRole.default], ["group", _groupRole.default], ["heading", _headingRole.default], ["img", _imgRole.default], ["insertion", _insertionRole.default], ["link", _linkRole.default], ["list", _listRole.default], ["listbox", _listboxRole.default], ["listitem", _listitemRole.default], ["log", _logRole.default], ["main", _mainRole.default], ["marquee", _marqueeRole.default], ["math", _mathRole.default], ["menu", _menuRole.default], ["menubar", _menubarRole.default], ["menuitem", _menuitemRole.default], ["menuitemcheckbox", _menuitemcheckboxRole.default], ["menuitemradio", _menuitemradioRole.default], ["meter", _meterRole.default], ["navigation", _navigationRole.default], ["none", _noneRole.default], ["note", _noteRole.default], ["option", _optionRole.default], ["paragraph", _paragraphRole.default], ["presentation", _presentationRole.default], ["progressbar", _progressbarRole.default], ["radio", _radioRole.default], ["radiogroup", _radiogroupRole.default], ["region", _regionRole.default], ["row", _rowRole.default], ["rowgroup", _rowgroupRole.default], ["rowheader", _rowheaderRole.default], ["scrollbar", _scrollbarRole.default], ["search", _searchRole.default], ["searchbox", _searchboxRole.default], ["separator", _separatorRole.default], ["slider", _sliderRole.default], ["spinbutton", _spinbuttonRole.default], ["status", _statusRole.default], ["strong", _strongRole.default], ["subscript", _subscriptRole.default], ["superscript", _superscriptRole.default], ["switch", _switchRole.default], ["tab", _tabRole.default], ["table", _tableRole.default], ["tablist", _tablistRole.default], ["tabpanel", _tabpanelRole.default], ["term", _termRole.default], ["textbox", _textboxRole.default], ["time", _timeRole.default], ["timer", _timerRole.default], ["toolbar", _toolbarRole.default], ["tooltip", _tooltipRole.default], ["tree", _treeRole.default], ["treegrid", _treegridRole.default], ["treeitem", _treeitemRole.default]];
var _default$L = ariaLiteralRoles;
ariaLiteralRoles$1.default = _default$L;
var ariaDpubRoles$1 = {};
var docAbstractRole$1 = {};
Object.defineProperty(docAbstractRole$1, "__esModule", {
  value: true
});
docAbstractRole$1.default = void 0;
var docAbstractRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "abstract [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$K = docAbstractRole;
docAbstractRole$1.default = _default$K;
var docAcknowledgmentsRole$1 = {};
Object.defineProperty(docAcknowledgmentsRole$1, "__esModule", {
  value: true
});
docAcknowledgmentsRole$1.default = void 0;
var docAcknowledgmentsRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "acknowledgments [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$J = docAcknowledgmentsRole;
docAcknowledgmentsRole$1.default = _default$J;
var docAfterwordRole$1 = {};
Object.defineProperty(docAfterwordRole$1, "__esModule", {
  value: true
});
docAfterwordRole$1.default = void 0;
var docAfterwordRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "afterword [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$I = docAfterwordRole;
docAfterwordRole$1.default = _default$I;
var docAppendixRole$1 = {};
Object.defineProperty(docAppendixRole$1, "__esModule", {
  value: true
});
docAppendixRole$1.default = void 0;
var docAppendixRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "appendix [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$H = docAppendixRole;
docAppendixRole$1.default = _default$H;
var docBacklinkRole$1 = {};
Object.defineProperty(docBacklinkRole$1, "__esModule", {
  value: true
});
docBacklinkRole$1.default = void 0;
var docBacklinkRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "content"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "referrer [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command", "link"]]
};
var _default$G = docBacklinkRole;
docBacklinkRole$1.default = _default$G;
var docBiblioentryRole$1 = {};
Object.defineProperty(docBiblioentryRole$1, "__esModule", {
  value: true
});
docBiblioentryRole$1.default = void 0;
var docBiblioentryRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "EPUB biblioentry [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: ["doc-bibliography"],
  requiredContextRole: ["doc-bibliography"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "listitem"]]
};
var _default$F = docBiblioentryRole;
docBiblioentryRole$1.default = _default$F;
var docBibliographyRole$1 = {};
Object.defineProperty(docBibliographyRole$1, "__esModule", {
  value: true
});
docBibliographyRole$1.default = void 0;
var docBibliographyRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "bibliography [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["doc-biblioentry"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$E = docBibliographyRole;
docBibliographyRole$1.default = _default$E;
var docBibliorefRole$1 = {};
Object.defineProperty(docBibliorefRole$1, "__esModule", {
  value: true
});
docBibliorefRole$1.default = void 0;
var docBibliorefRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "biblioref [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command", "link"]]
};
var _default$D = docBibliorefRole;
docBibliorefRole$1.default = _default$D;
var docChapterRole$1 = {};
Object.defineProperty(docChapterRole$1, "__esModule", {
  value: true
});
docChapterRole$1.default = void 0;
var docChapterRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "chapter [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$C = docChapterRole;
docChapterRole$1.default = _default$C;
var docColophonRole$1 = {};
Object.defineProperty(docColophonRole$1, "__esModule", {
  value: true
});
docColophonRole$1.default = void 0;
var docColophonRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "colophon [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$B = docColophonRole;
docColophonRole$1.default = _default$B;
var docConclusionRole$1 = {};
Object.defineProperty(docConclusionRole$1, "__esModule", {
  value: true
});
docConclusionRole$1.default = void 0;
var docConclusionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "conclusion [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$A = docConclusionRole;
docConclusionRole$1.default = _default$A;
var docCoverRole$1 = {};
Object.defineProperty(docCoverRole$1, "__esModule", {
  value: true
});
docCoverRole$1.default = void 0;
var docCoverRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "cover [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "img"]]
};
var _default$z = docCoverRole;
docCoverRole$1.default = _default$z;
var docCreditRole$1 = {};
Object.defineProperty(docCreditRole$1, "__esModule", {
  value: true
});
docCreditRole$1.default = void 0;
var docCreditRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "credit [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$y = docCreditRole;
docCreditRole$1.default = _default$y;
var docCreditsRole$1 = {};
Object.defineProperty(docCreditsRole$1, "__esModule", {
  value: true
});
docCreditsRole$1.default = void 0;
var docCreditsRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "credits [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$x = docCreditsRole;
docCreditsRole$1.default = _default$x;
var docDedicationRole$1 = {};
Object.defineProperty(docDedicationRole$1, "__esModule", {
  value: true
});
docDedicationRole$1.default = void 0;
var docDedicationRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "dedication [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$w = docDedicationRole;
docDedicationRole$1.default = _default$w;
var docEndnoteRole$1 = {};
Object.defineProperty(docEndnoteRole$1, "__esModule", {
  value: true
});
docEndnoteRole$1.default = void 0;
var docEndnoteRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "rearnote [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: ["doc-endnotes"],
  requiredContextRole: ["doc-endnotes"],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "listitem"]]
};
var _default$v = docEndnoteRole;
docEndnoteRole$1.default = _default$v;
var docEndnotesRole$1 = {};
Object.defineProperty(docEndnotesRole$1, "__esModule", {
  value: true
});
docEndnotesRole$1.default = void 0;
var docEndnotesRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "rearnotes [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["doc-endnote"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$u = docEndnotesRole;
docEndnotesRole$1.default = _default$u;
var docEpigraphRole$1 = {};
Object.defineProperty(docEpigraphRole$1, "__esModule", {
  value: true
});
docEpigraphRole$1.default = void 0;
var docEpigraphRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "epigraph [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$t = docEpigraphRole;
docEpigraphRole$1.default = _default$t;
var docEpilogueRole$1 = {};
Object.defineProperty(docEpilogueRole$1, "__esModule", {
  value: true
});
docEpilogueRole$1.default = void 0;
var docEpilogueRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "epilogue [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$s = docEpilogueRole;
docEpilogueRole$1.default = _default$s;
var docErrataRole$1 = {};
Object.defineProperty(docErrataRole$1, "__esModule", {
  value: true
});
docErrataRole$1.default = void 0;
var docErrataRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "errata [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$r = docErrataRole;
docErrataRole$1.default = _default$r;
var docExampleRole$1 = {};
Object.defineProperty(docExampleRole$1, "__esModule", {
  value: true
});
docExampleRole$1.default = void 0;
var docExampleRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$q = docExampleRole;
docExampleRole$1.default = _default$q;
var docFootnoteRole$1 = {};
Object.defineProperty(docFootnoteRole$1, "__esModule", {
  value: true
});
docFootnoteRole$1.default = void 0;
var docFootnoteRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "footnote [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$p = docFootnoteRole;
docFootnoteRole$1.default = _default$p;
var docForewordRole$1 = {};
Object.defineProperty(docForewordRole$1, "__esModule", {
  value: true
});
docForewordRole$1.default = void 0;
var docForewordRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "foreword [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$o = docForewordRole;
docForewordRole$1.default = _default$o;
var docGlossaryRole$1 = {};
Object.defineProperty(docGlossaryRole$1, "__esModule", {
  value: true
});
docGlossaryRole$1.default = void 0;
var docGlossaryRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "glossary [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [["definition"], ["term"]],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$n = docGlossaryRole;
docGlossaryRole$1.default = _default$n;
var docGlossrefRole$1 = {};
Object.defineProperty(docGlossrefRole$1, "__esModule", {
  value: true
});
docGlossrefRole$1.default = void 0;
var docGlossrefRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "glossref [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command", "link"]]
};
var _default$m = docGlossrefRole;
docGlossrefRole$1.default = _default$m;
var docIndexRole$1 = {};
Object.defineProperty(docIndexRole$1, "__esModule", {
  value: true
});
docIndexRole$1.default = void 0;
var docIndexRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "index [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
};
var _default$l = docIndexRole;
docIndexRole$1.default = _default$l;
var docIntroductionRole$1 = {};
Object.defineProperty(docIntroductionRole$1, "__esModule", {
  value: true
});
docIntroductionRole$1.default = void 0;
var docIntroductionRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "introduction [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$k = docIntroductionRole;
docIntroductionRole$1.default = _default$k;
var docNoterefRole$1 = {};
Object.defineProperty(docNoterefRole$1, "__esModule", {
  value: true
});
docNoterefRole$1.default = void 0;
var docNoterefRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "noteref [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "widget", "command", "link"]]
};
var _default$j = docNoterefRole;
docNoterefRole$1.default = _default$j;
var docNoticeRole$1 = {};
Object.defineProperty(docNoticeRole$1, "__esModule", {
  value: true
});
docNoticeRole$1.default = void 0;
var docNoticeRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "notice [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "note"]]
};
var _default$i = docNoticeRole;
docNoticeRole$1.default = _default$i;
var docPagebreakRole$1 = {};
Object.defineProperty(docPagebreakRole$1, "__esModule", {
  value: true
});
docPagebreakRole$1.default = void 0;
var docPagebreakRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "pagebreak [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "separator"]]
};
var _default$h = docPagebreakRole;
docPagebreakRole$1.default = _default$h;
var docPagelistRole$1 = {};
Object.defineProperty(docPagelistRole$1, "__esModule", {
  value: true
});
docPagelistRole$1.default = void 0;
var docPagelistRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "page-list [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
};
var _default$g = docPagelistRole;
docPagelistRole$1.default = _default$g;
var docPartRole$1 = {};
Object.defineProperty(docPartRole$1, "__esModule", {
  value: true
});
docPartRole$1.default = void 0;
var docPartRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "part [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$f = docPartRole;
docPartRole$1.default = _default$f;
var docPrefaceRole$1 = {};
Object.defineProperty(docPrefaceRole$1, "__esModule", {
  value: true
});
docPrefaceRole$1.default = void 0;
var docPrefaceRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "preface [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$e = docPrefaceRole;
docPrefaceRole$1.default = _default$e;
var docPrologueRole$1 = {};
Object.defineProperty(docPrologueRole$1, "__esModule", {
  value: true
});
docPrologueRole$1.default = void 0;
var docPrologueRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "prologue [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark"]]
};
var _default$d = docPrologueRole;
docPrologueRole$1.default = _default$d;
var docPullquoteRole$1 = {};
Object.defineProperty(docPullquoteRole$1, "__esModule", {
  value: true
});
docPullquoteRole$1.default = void 0;
var docPullquoteRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {},
  relatedConcepts: [{
    concept: {
      name: "pullquote [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["none"]]
};
var _default$c = docPullquoteRole;
docPullquoteRole$1.default = _default$c;
var docQnaRole$1 = {};
Object.defineProperty(docQnaRole$1, "__esModule", {
  value: true
});
docQnaRole$1.default = void 0;
var docQnaRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "qna [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section"]]
};
var _default$b = docQnaRole;
docQnaRole$1.default = _default$b;
var docSubtitleRole$1 = {};
Object.defineProperty(docSubtitleRole$1, "__esModule", {
  value: true
});
docSubtitleRole$1.default = void 0;
var docSubtitleRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "subtitle [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "sectionhead"]]
};
var _default$a = docSubtitleRole;
docSubtitleRole$1.default = _default$a;
var docTipRole$1 = {};
Object.defineProperty(docTipRole$1, "__esModule", {
  value: true
});
docTipRole$1.default = void 0;
var docTipRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "help [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "note"]]
};
var _default$9 = docTipRole;
docTipRole$1.default = _default$9;
var docTocRole$1 = {};
Object.defineProperty(docTocRole$1, "__esModule", {
  value: true
});
docTocRole$1.default = void 0;
var docTocRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    concept: {
      name: "toc [EPUB-SSV]"
    },
    module: "EPUB"
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
};
var _default$8 = docTocRole;
docTocRole$1.default = _default$8;
Object.defineProperty(ariaDpubRoles$1, "__esModule", {
  value: true
});
ariaDpubRoles$1.default = void 0;
var _docAbstractRole = _interopRequireDefault$5(docAbstractRole$1);
var _docAcknowledgmentsRole = _interopRequireDefault$5(docAcknowledgmentsRole$1);
var _docAfterwordRole = _interopRequireDefault$5(docAfterwordRole$1);
var _docAppendixRole = _interopRequireDefault$5(docAppendixRole$1);
var _docBacklinkRole = _interopRequireDefault$5(docBacklinkRole$1);
var _docBiblioentryRole = _interopRequireDefault$5(docBiblioentryRole$1);
var _docBibliographyRole = _interopRequireDefault$5(docBibliographyRole$1);
var _docBibliorefRole = _interopRequireDefault$5(docBibliorefRole$1);
var _docChapterRole = _interopRequireDefault$5(docChapterRole$1);
var _docColophonRole = _interopRequireDefault$5(docColophonRole$1);
var _docConclusionRole = _interopRequireDefault$5(docConclusionRole$1);
var _docCoverRole = _interopRequireDefault$5(docCoverRole$1);
var _docCreditRole = _interopRequireDefault$5(docCreditRole$1);
var _docCreditsRole = _interopRequireDefault$5(docCreditsRole$1);
var _docDedicationRole = _interopRequireDefault$5(docDedicationRole$1);
var _docEndnoteRole = _interopRequireDefault$5(docEndnoteRole$1);
var _docEndnotesRole = _interopRequireDefault$5(docEndnotesRole$1);
var _docEpigraphRole = _interopRequireDefault$5(docEpigraphRole$1);
var _docEpilogueRole = _interopRequireDefault$5(docEpilogueRole$1);
var _docErrataRole = _interopRequireDefault$5(docErrataRole$1);
var _docExampleRole = _interopRequireDefault$5(docExampleRole$1);
var _docFootnoteRole = _interopRequireDefault$5(docFootnoteRole$1);
var _docForewordRole = _interopRequireDefault$5(docForewordRole$1);
var _docGlossaryRole = _interopRequireDefault$5(docGlossaryRole$1);
var _docGlossrefRole = _interopRequireDefault$5(docGlossrefRole$1);
var _docIndexRole = _interopRequireDefault$5(docIndexRole$1);
var _docIntroductionRole = _interopRequireDefault$5(docIntroductionRole$1);
var _docNoterefRole = _interopRequireDefault$5(docNoterefRole$1);
var _docNoticeRole = _interopRequireDefault$5(docNoticeRole$1);
var _docPagebreakRole = _interopRequireDefault$5(docPagebreakRole$1);
var _docPagelistRole = _interopRequireDefault$5(docPagelistRole$1);
var _docPartRole = _interopRequireDefault$5(docPartRole$1);
var _docPrefaceRole = _interopRequireDefault$5(docPrefaceRole$1);
var _docPrologueRole = _interopRequireDefault$5(docPrologueRole$1);
var _docPullquoteRole = _interopRequireDefault$5(docPullquoteRole$1);
var _docQnaRole = _interopRequireDefault$5(docQnaRole$1);
var _docSubtitleRole = _interopRequireDefault$5(docSubtitleRole$1);
var _docTipRole = _interopRequireDefault$5(docTipRole$1);
var _docTocRole = _interopRequireDefault$5(docTocRole$1);
function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var ariaDpubRoles = [["doc-abstract", _docAbstractRole.default], ["doc-acknowledgments", _docAcknowledgmentsRole.default], ["doc-afterword", _docAfterwordRole.default], ["doc-appendix", _docAppendixRole.default], ["doc-backlink", _docBacklinkRole.default], ["doc-biblioentry", _docBiblioentryRole.default], ["doc-bibliography", _docBibliographyRole.default], ["doc-biblioref", _docBibliorefRole.default], ["doc-chapter", _docChapterRole.default], ["doc-colophon", _docColophonRole.default], ["doc-conclusion", _docConclusionRole.default], ["doc-cover", _docCoverRole.default], ["doc-credit", _docCreditRole.default], ["doc-credits", _docCreditsRole.default], ["doc-dedication", _docDedicationRole.default], ["doc-endnote", _docEndnoteRole.default], ["doc-endnotes", _docEndnotesRole.default], ["doc-epigraph", _docEpigraphRole.default], ["doc-epilogue", _docEpilogueRole.default], ["doc-errata", _docErrataRole.default], ["doc-example", _docExampleRole.default], ["doc-footnote", _docFootnoteRole.default], ["doc-foreword", _docForewordRole.default], ["doc-glossary", _docGlossaryRole.default], ["doc-glossref", _docGlossrefRole.default], ["doc-index", _docIndexRole.default], ["doc-introduction", _docIntroductionRole.default], ["doc-noteref", _docNoterefRole.default], ["doc-notice", _docNoticeRole.default], ["doc-pagebreak", _docPagebreakRole.default], ["doc-pagelist", _docPagelistRole.default], ["doc-part", _docPartRole.default], ["doc-preface", _docPrefaceRole.default], ["doc-prologue", _docPrologueRole.default], ["doc-pullquote", _docPullquoteRole.default], ["doc-qna", _docQnaRole.default], ["doc-subtitle", _docSubtitleRole.default], ["doc-tip", _docTipRole.default], ["doc-toc", _docTocRole.default]];
var _default$7 = ariaDpubRoles;
ariaDpubRoles$1.default = _default$7;
var ariaGraphicsRoles$1 = {};
var graphicsDocumentRole$1 = {};
Object.defineProperty(graphicsDocumentRole$1, "__esModule", {
  value: true
});
graphicsDocumentRole$1.default = void 0;
var graphicsDocumentRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    module: "GRAPHICS",
    concept: {
      name: "graphics-object"
    }
  }, {
    module: "ARIA",
    concept: {
      name: "img"
    }
  }, {
    module: "ARIA",
    concept: {
      name: "article"
    }
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "document"]]
};
var _default$6 = graphicsDocumentRole;
graphicsDocumentRole$1.default = _default$6;
var graphicsObjectRole$1 = {};
Object.defineProperty(graphicsObjectRole$1, "__esModule", {
  value: true
});
graphicsObjectRole$1.default = void 0;
var graphicsObjectRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ["author", "contents"],
  prohibitedProps: [],
  props: {
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [{
    module: "GRAPHICS",
    concept: {
      name: "graphics-document"
    }
  }, {
    module: "ARIA",
    concept: {
      name: "group"
    }
  }, {
    module: "ARIA",
    concept: {
      name: "img"
    }
  }, {
    module: "GRAPHICS",
    concept: {
      name: "graphics-symbol"
    }
  }],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "group"]]
};
var _default$5 = graphicsObjectRole;
graphicsObjectRole$1.default = _default$5;
var graphicsSymbolRole$1 = {};
Object.defineProperty(graphicsSymbolRole$1, "__esModule", {
  value: true
});
graphicsSymbolRole$1.default = void 0;
var graphicsSymbolRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ["author"],
  prohibitedProps: [],
  props: {
    "aria-disabled": null,
    "aria-errormessage": null,
    "aria-expanded": null,
    "aria-haspopup": null,
    "aria-invalid": null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [["roletype", "structure", "section", "img"]]
};
var _default$4 = graphicsSymbolRole;
graphicsSymbolRole$1.default = _default$4;
Object.defineProperty(ariaGraphicsRoles$1, "__esModule", {
  value: true
});
ariaGraphicsRoles$1.default = void 0;
var _graphicsDocumentRole = _interopRequireDefault$4(graphicsDocumentRole$1);
var _graphicsObjectRole = _interopRequireDefault$4(graphicsObjectRole$1);
var _graphicsSymbolRole = _interopRequireDefault$4(graphicsSymbolRole$1);
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var ariaGraphicsRoles = [["graphics-document", _graphicsDocumentRole.default], ["graphics-object", _graphicsObjectRole.default], ["graphics-symbol", _graphicsSymbolRole.default]];
var _default$3 = ariaGraphicsRoles;
ariaGraphicsRoles$1.default = _default$3;
Object.defineProperty(rolesMap$1, "__esModule", {
  value: true
});
rolesMap$1.default = void 0;
var _ariaAbstractRoles = _interopRequireDefault$3(ariaAbstractRoles$1);
var _ariaLiteralRoles = _interopRequireDefault$3(ariaLiteralRoles$1);
var _ariaDpubRoles = _interopRequireDefault$3(ariaDpubRoles$1);
var _ariaGraphicsRoles = _interopRequireDefault$3(ariaGraphicsRoles$1);
var _iterationDecorator$2 = _interopRequireDefault$3(iterationDecorator$1);
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _createForOfIteratorHelper$2(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e3) {
    didErr = true;
    err = _e3;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null)
        it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _iterableToArrayLimit$2(arr, i) {
  var _i2 = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i2 == null)
    return;
  var _arr = [];
  var _n2 = true;
  var _d2 = false;
  var _s, _e2;
  try {
    for (_i2 = _i2.call(arr); !(_n2 = (_s = _i2.next()).done); _n2 = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d2 = true;
    _e2 = err;
  } finally {
    try {
      if (!_n2 && _i2["return"] != null)
        _i2["return"]();
    } finally {
      if (_d2)
        throw _e2;
    }
  }
  return _arr;
}
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr))
    return arr;
}
var roles$1 = [].concat(_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default, _ariaGraphicsRoles.default);
roles$1.forEach(function(_ref) {
  var _ref2 = _slicedToArray$2(_ref, 2), roleDefinition = _ref2[1];
  var _iterator = _createForOfIteratorHelper$2(roleDefinition.superClass), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var superClassIter = _step.value;
      var _iterator2 = _createForOfIteratorHelper$2(superClassIter), _step2;
      try {
        var _loop3 = function _loop4() {
          var superClassName = _step2.value;
          var superClassRoleTuple = roles$1.find(function(_ref3) {
            var _ref4 = _slicedToArray$2(_ref3, 1), name = _ref4[0];
            return name === superClassName;
          });
          if (superClassRoleTuple) {
            var superClassDefinition = superClassRoleTuple[1];
            for (var _i2 = 0, _Object$keys = Object.keys(superClassDefinition.props); _i2 < _Object$keys.length; _i2++) {
              var prop = _Object$keys[_i2];
              if (
                // $FlowIssue Accessing the hasOwnProperty on the Object prototype is fine.
                !Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)
              ) {
                Object.assign(roleDefinition.props, _defineProperty({}, prop, superClassDefinition.props[prop]));
              }
            }
          }
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          _loop3();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
});
var rolesMap = {
  entries: function entries3() {
    return roles$1;
  },
  forEach: function forEach3(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var _iterator3 = _createForOfIteratorHelper$2(roles$1), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var _step3$value = _slicedToArray$2(_step3.value, 2), key = _step3$value[0], values6 = _step3$value[1];
        fn.call(thisArg, values6, key, roles$1);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  },
  get: function get3(key) {
    var item = roles$1.find(function(tuple) {
      return tuple[0] === key ? true : false;
    });
    return item && item[1];
  },
  has: function has3(key) {
    return !!rolesMap.get(key);
  },
  keys: function keys3() {
    return roles$1.map(function(_ref5) {
      var _ref6 = _slicedToArray$2(_ref5, 1), key = _ref6[0];
      return key;
    });
  },
  values: function values3() {
    return roles$1.map(function(_ref7) {
      var _ref8 = _slicedToArray$2(_ref7, 2), values6 = _ref8[1];
      return values6;
    });
  }
};
var _default$2 = (0, _iterationDecorator$2.default)(rolesMap, rolesMap.entries());
rolesMap$1.default = _default$2;
var elementRoleMap$1 = {};
var toStr$9 = Object.prototype.toString;
var isArguments$3 = function isArguments(value) {
  var str = toStr$9.call(value);
  var isArgs2 = str === "[object Arguments]";
  if (!isArgs2) {
    isArgs2 = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr$9.call(value.callee) === "[object Function]";
  }
  return isArgs2;
};
var implementation$b;
var hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation)
    return implementation$b;
  hasRequiredImplementation = 1;
  var keysShim2;
  if (!Object.keys) {
    var has7 = Object.prototype.hasOwnProperty;
    var toStr2 = Object.prototype.toString;
    var isArgs2 = isArguments$3;
    var isEnumerable2 = Object.prototype.propertyIsEnumerable;
    var hasDontEnumBug = !isEnumerable2.call({ toString: null }, "toString");
    var hasProtoEnumBug = isEnumerable2.call(function() {
    }, "prototype");
    var dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ];
    var equalsConstructorPrototype = function(o) {
      var ctor = o.constructor;
      return ctor && ctor.prototype === o;
    };
    var excludedKeys = {
      $applicationCache: true,
      $console: true,
      $external: true,
      $frame: true,
      $frameElement: true,
      $frames: true,
      $innerHeight: true,
      $innerWidth: true,
      $onmozfullscreenchange: true,
      $onmozfullscreenerror: true,
      $outerHeight: true,
      $outerWidth: true,
      $pageXOffset: true,
      $pageYOffset: true,
      $parent: true,
      $scrollLeft: true,
      $scrollTop: true,
      $scrollX: true,
      $scrollY: true,
      $self: true,
      $webkitIndexedDB: true,
      $webkitStorageInfo: true,
      $window: true
    };
    var hasAutomationEqualityBug = function() {
      if (typeof window === "undefined") {
        return false;
      }
      for (var k in window) {
        try {
          if (!excludedKeys["$" + k] && has7.call(window, k) && window[k] !== null && typeof window[k] === "object") {
            try {
              equalsConstructorPrototype(window[k]);
            } catch (e) {
              return true;
            }
          }
        } catch (e) {
          return true;
        }
      }
      return false;
    }();
    var equalsConstructorPrototypeIfNotBuggy = function(o) {
      if (typeof window === "undefined" || !hasAutomationEqualityBug) {
        return equalsConstructorPrototype(o);
      }
      try {
        return equalsConstructorPrototype(o);
      } catch (e) {
        return false;
      }
    };
    keysShim2 = function keys8(object) {
      var isObject2 = object !== null && typeof object === "object";
      var isFunction2 = toStr2.call(object) === "[object Function]";
      var isArguments5 = isArgs2(object);
      var isString3 = isObject2 && toStr2.call(object) === "[object String]";
      var theKeys = [];
      if (!isObject2 && !isFunction2 && !isArguments5) {
        throw new TypeError("Object.keys called on a non-object");
      }
      var skipProto = hasProtoEnumBug && isFunction2;
      if (isString3 && object.length > 0 && !has7.call(object, 0)) {
        for (var i = 0; i < object.length; ++i) {
          theKeys.push(String(i));
        }
      }
      if (isArguments5 && object.length > 0) {
        for (var j = 0; j < object.length; ++j) {
          theKeys.push(String(j));
        }
      } else {
        for (var name in object) {
          if (!(skipProto && name === "prototype") && has7.call(object, name)) {
            theKeys.push(String(name));
          }
        }
      }
      if (hasDontEnumBug) {
        var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
        for (var k = 0; k < dontEnums.length; ++k) {
          if (!(skipConstructor && dontEnums[k] === "constructor") && has7.call(object, dontEnums[k])) {
            theKeys.push(dontEnums[k]);
          }
        }
      }
      return theKeys;
    };
  }
  implementation$b = keysShim2;
  return implementation$b;
}
var slice = Array.prototype.slice;
var isArgs = isArguments$3;
var origKeys = Object.keys;
var keysShim = origKeys ? function keys4(o) {
  return origKeys(o);
} : requireImplementation();
var originalKeys = Object.keys;
keysShim.shim = function shimObjectKeys() {
  if (Object.keys) {
    var keysWorksWithArguments = function() {
      var args = Object.keys(arguments);
      return args && args.length === arguments.length;
    }(1, 2);
    if (!keysWorksWithArguments) {
      Object.keys = function keys8(object) {
        if (isArgs(object)) {
          return originalKeys(slice.call(object));
        }
        return originalKeys(object);
      };
    }
  } else {
    Object.keys = keysShim;
  }
  return Object.keys || keysShim;
};
var objectKeys$2 = keysShim;
var shams$1 = function hasSymbols() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj = {};
  var sym = Symbol("test");
  var symObj = Object(sym);
  if (typeof sym === "string") {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
    return false;
  }
  var symVal = 42;
  obj[sym] = symVal;
  for (sym in obj) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }
  return true;
};
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = shams$1;
var hasSymbols$5 = function hasNativeSymbols() {
  if (typeof origSymbol !== "function") {
    return false;
  }
  if (typeof Symbol !== "function") {
    return false;
  }
  if (typeof origSymbol("foo") !== "symbol") {
    return false;
  }
  if (typeof Symbol("bar") !== "symbol") {
    return false;
  }
  return hasSymbolSham();
};
var test = {
  foo: {}
};
var $Object$1 = Object;
var hasProto$1 = function hasProto() {
  return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object$1);
};
var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var toStr$8 = Object.prototype.toString;
var max = Math.max;
var funcType = "[object Function]";
var concatty = function concatty2(a, b) {
  var arr = [];
  for (var i = 0; i < a.length; i += 1) {
    arr[i] = a[i];
  }
  for (var j = 0; j < b.length; j += 1) {
    arr[j + a.length] = b[j];
  }
  return arr;
};
var slicy = function slicy2(arrLike, offset) {
  var arr = [];
  for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
    arr[j] = arrLike[i];
  }
  return arr;
};
var joiny = function(arr, joiner) {
  var str = "";
  for (var i = 0; i < arr.length; i += 1) {
    str += arr[i];
    if (i + 1 < arr.length) {
      str += joiner;
    }
  }
  return str;
};
var implementation$a = function bind(that) {
  var target = this;
  if (typeof target !== "function" || toStr$8.apply(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slicy(arguments, 1);
  var bound2;
  var binder = function() {
    if (this instanceof bound2) {
      var result = target.apply(
        this,
        concatty(args, arguments)
      );
      if (Object(result) === result) {
        return result;
      }
      return this;
    }
    return target.apply(
      that,
      concatty(args, arguments)
    );
  };
  var boundLength = max(0, target.length - args.length);
  var boundArgs = [];
  for (var i = 0; i < boundLength; i++) {
    boundArgs[i] = "$" + i;
  }
  bound2 = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
  if (target.prototype) {
    var Empty = function Empty2() {
    };
    Empty.prototype = target.prototype;
    bound2.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound2;
};
var implementation$9 = implementation$a;
var functionBind = Function.prototype.bind || implementation$9;
var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind$1 = functionBind;
var hasown = bind$1.call(call, $hasOwn);
var undefined$1;
var $SyntaxError$2 = SyntaxError;
var $Function = Function;
var $TypeError$6 = TypeError;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e) {
  }
};
var $gOPD$2 = Object.getOwnPropertyDescriptor;
if ($gOPD$2) {
  try {
    $gOPD$2({}, "");
  } catch (e) {
    $gOPD$2 = null;
  }
}
var throwTypeError = function() {
  throw new $TypeError$6();
};
var ThrowTypeError = $gOPD$2 ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD$2(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols$4 = hasSymbols$5();
var hasProto2 = hasProto$1();
var getProto$1 = Object.getPrototypeOf || (hasProto2 ? function(x) {
  return x.__proto__;
} : null);
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" || !getProto$1 ? undefined$1 : getProto$1(Uint8Array);
var INTRINSICS = {
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols$4 && getProto$1 ? getProto$1([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols$4 && getProto$1 ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols$4 || !getProto$1 ? undefined$1 : getProto$1((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols$4 || !getProto$1 ? undefined$1 : getProto$1((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols$4 && getProto$1 ? getProto$1(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols$4 ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError$2,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError$6,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
};
if (getProto$1) {
  try {
    null.error;
  } catch (e) {
    var errorProto = getProto$1(getProto$1(e));
    INTRINSICS["%Error.prototype%"] = errorProto;
  }
}
var doEval = function doEval2(name) {
  var value;
  if (name === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name === "%AsyncGenerator%") {
    var fn = doEval2("%AsyncGeneratorFunction%");
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen && getProto$1) {
      value = getProto$1(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind2 = functionBind;
var hasOwn$2 = hasown;
var $concat$1 = bind2.call(Function.call, Array.prototype.concat);
var $spliceApply = bind2.call(Function.apply, Array.prototype.splice);
var $replace$1 = bind2.call(Function.call, String.prototype.replace);
var $strSlice = bind2.call(Function.call, String.prototype.slice);
var $exec$1 = bind2.call(Function.call, RegExp.prototype.exec);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);
  if (first === "%" && last !== "%") {
    throw new $SyntaxError$2("invalid intrinsic syntax, expected closing `%`");
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError$2("invalid intrinsic syntax, expected opening `%`");
  }
  var result = [];
  $replace$1(string, rePropName, function(match, number, quote2, subString) {
    result[result.length] = quote2 ? $replace$1(subString, reEscapeChar, "$1") : number || match;
  });
  return result;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn$2(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn$2(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError$6("intrinsic " + name + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError$2("intrinsic " + name + " does not exist!");
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError$6("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError$6('"allowMissing" argument must be a boolean');
  }
  if ($exec$1(/^%?[^%]*%?$/, name) === null) {
    throw new $SyntaxError$2("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  }
  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat$1([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
      throw new $SyntaxError$2("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn$2(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError$6("base intrinsic for " + name + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD$2 && i + 1 >= parts.length) {
        var desc = $gOPD$2(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn$2(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var GetIntrinsic$a = getIntrinsic;
var $defineProperty$1 = GetIntrinsic$a("%Object.defineProperty%", true);
var hasPropertyDescriptors$1 = function hasPropertyDescriptors() {
  if ($defineProperty$1) {
    try {
      $defineProperty$1({}, "a", { value: 1 });
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};
hasPropertyDescriptors$1.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
  if (!hasPropertyDescriptors$1()) {
    return null;
  }
  try {
    return $defineProperty$1([], "length", { value: 1 }).length !== 1;
  } catch (e) {
    return true;
  }
};
var hasPropertyDescriptors_1 = hasPropertyDescriptors$1;
var GetIntrinsic$9 = getIntrinsic;
var $gOPD$1 = GetIntrinsic$9("%Object.getOwnPropertyDescriptor%", true);
if ($gOPD$1) {
  try {
    $gOPD$1([], "length");
  } catch (e) {
    $gOPD$1 = null;
  }
}
var gopd$1 = $gOPD$1;
var hasPropertyDescriptors2 = hasPropertyDescriptors_1();
var GetIntrinsic$8 = getIntrinsic;
var $defineProperty = hasPropertyDescriptors2 && GetIntrinsic$8("%Object.defineProperty%", true);
if ($defineProperty) {
  try {
    $defineProperty({}, "a", { value: 1 });
  } catch (e) {
    $defineProperty = false;
  }
}
var $SyntaxError$1 = GetIntrinsic$8("%SyntaxError%");
var $TypeError$5 = GetIntrinsic$8("%TypeError%");
var gopd = gopd$1;
var defineDataProperty$1 = function defineDataProperty(obj, property, value) {
  if (!obj || typeof obj !== "object" && typeof obj !== "function") {
    throw new $TypeError$5("`obj` must be an object or a function`");
  }
  if (typeof property !== "string" && typeof property !== "symbol") {
    throw new $TypeError$5("`property` must be a string or a symbol`");
  }
  if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
    throw new $TypeError$5("`nonEnumerable`, if provided, must be a boolean or null");
  }
  if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
    throw new $TypeError$5("`nonWritable`, if provided, must be a boolean or null");
  }
  if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
    throw new $TypeError$5("`nonConfigurable`, if provided, must be a boolean or null");
  }
  if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
    throw new $TypeError$5("`loose`, if provided, must be a boolean");
  }
  var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
  var nonWritable = arguments.length > 4 ? arguments[4] : null;
  var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
  var loose = arguments.length > 6 ? arguments[6] : false;
  var desc = !!gopd && gopd(obj, property);
  if ($defineProperty) {
    $defineProperty(obj, property, {
      configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
      enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
      value,
      writable: nonWritable === null && desc ? desc.writable : !nonWritable
    });
  } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
    obj[property] = value;
  } else {
    throw new $SyntaxError$1("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }
};
var keys$2 = objectKeys$2;
var hasSymbols$3 = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
var toStr$7 = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty2 = defineDataProperty$1;
var isFunction = function(fn) {
  return typeof fn === "function" && toStr$7.call(fn) === "[object Function]";
};
var supportsDescriptors$2 = hasPropertyDescriptors_1();
var defineProperty$1 = function(object, name, value, predicate) {
  if (name in object) {
    if (predicate === true) {
      if (object[name] === value) {
        return;
      }
    } else if (!isFunction(predicate) || !predicate()) {
      return;
    }
  }
  if (supportsDescriptors$2) {
    defineDataProperty2(object, name, value, true);
  } else {
    defineDataProperty2(object, name, value);
  }
};
var defineProperties$1 = function(object, map) {
  var predicates = arguments.length > 2 ? arguments[2] : {};
  var props = keys$2(map);
  if (hasSymbols$3) {
    props = concat.call(props, Object.getOwnPropertySymbols(map));
  }
  for (var i = 0; i < props.length; i += 1) {
    defineProperty$1(object, props[i], map[props[i]], predicates[props[i]]);
  }
};
defineProperties$1.supportsDescriptors = !!supportsDescriptors$2;
var defineProperties_1 = defineProperties$1;
var callBind$6 = { exports: {} };
var GetIntrinsic$7 = getIntrinsic;
var define$5 = defineDataProperty$1;
var hasDescriptors$1 = hasPropertyDescriptors_1();
var gOPD$4 = gopd$1;
var $TypeError$4 = GetIntrinsic$7("%TypeError%");
var $floor$1 = GetIntrinsic$7("%Math.floor%");
var setFunctionLength = function setFunctionLength2(fn, length) {
  if (typeof fn !== "function") {
    throw new $TypeError$4("`fn` is not a function");
  }
  if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor$1(length) !== length) {
    throw new $TypeError$4("`length` must be a positive 32-bit integer");
  }
  var loose = arguments.length > 2 && !!arguments[2];
  var functionLengthIsConfigurable = true;
  var functionLengthIsWritable = true;
  if ("length" in fn && gOPD$4) {
    var desc = gOPD$4(fn, "length");
    if (desc && !desc.configurable) {
      functionLengthIsConfigurable = false;
    }
    if (desc && !desc.writable) {
      functionLengthIsWritable = false;
    }
  }
  if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
    if (hasDescriptors$1) {
      define$5(
        /** @type {Parameters<define>[0]} */
        fn,
        "length",
        length,
        true,
        true
      );
    } else {
      define$5(
        /** @type {Parameters<define>[0]} */
        fn,
        "length",
        length
      );
    }
  }
  return fn;
};
(function(module2) {
  var bind3 = functionBind;
  var GetIntrinsic3 = getIntrinsic;
  var setFunctionLength$1 = setFunctionLength;
  var $TypeError2 = GetIntrinsic3("%TypeError%");
  var $apply = GetIntrinsic3("%Function.prototype.apply%");
  var $call = GetIntrinsic3("%Function.prototype.call%");
  var $reflectApply = GetIntrinsic3("%Reflect.apply%", true) || bind3.call($call, $apply);
  var $defineProperty2 = GetIntrinsic3("%Object.defineProperty%", true);
  var $max = GetIntrinsic3("%Math.max%");
  if ($defineProperty2) {
    try {
      $defineProperty2({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty2 = null;
    }
  }
  module2.exports = function callBind2(originalFunction) {
    if (typeof originalFunction !== "function") {
      throw new $TypeError2("a function is required");
    }
    var func = $reflectApply(bind3, $call, arguments);
    return setFunctionLength$1(
      func,
      1 + $max(0, originalFunction.length - (arguments.length - 1)),
      true
    );
  };
  var applyBind = function applyBind2() {
    return $reflectApply(bind3, $apply, arguments);
  };
  if ($defineProperty2) {
    $defineProperty2(module2.exports, "apply", { value: applyBind });
  } else {
    module2.exports.apply = applyBind;
  }
})(callBind$6);
var callBindExports = callBind$6.exports;
var GetIntrinsic$6 = getIntrinsic;
var callBind$5 = callBindExports;
var $indexOf$1 = callBind$5(GetIntrinsic$6("String.prototype.indexOf"));
var callBound$c = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic$6(name, !!allowMissing);
  if (typeof intrinsic === "function" && $indexOf$1(name, ".prototype.") > -1) {
    return callBind$5(intrinsic);
  }
  return intrinsic;
};
var objectKeys$1 = objectKeys$2;
var hasSymbols$2 = shams$1();
var callBound$b = callBound$c;
var toObject = Object;
var $push = callBound$b("Array.prototype.push");
var $propIsEnumerable = callBound$b("Object.prototype.propertyIsEnumerable");
var originalGetSymbols = hasSymbols$2 ? Object.getOwnPropertySymbols : null;
var implementation$8 = function assign(target, source1) {
  if (target == null) {
    throw new TypeError("target must be an object");
  }
  var to = toObject(target);
  if (arguments.length === 1) {
    return to;
  }
  for (var s = 1; s < arguments.length; ++s) {
    var from = toObject(arguments[s]);
    var keys8 = objectKeys$1(from);
    var getSymbols = hasSymbols$2 && (Object.getOwnPropertySymbols || originalGetSymbols);
    if (getSymbols) {
      var syms = getSymbols(from);
      for (var j = 0; j < syms.length; ++j) {
        var key = syms[j];
        if ($propIsEnumerable(from, key)) {
          $push(keys8, key);
        }
      }
    }
    for (var i = 0; i < keys8.length; ++i) {
      var nextKey = keys8[i];
      if ($propIsEnumerable(from, nextKey)) {
        var propValue = from[nextKey];
        to[nextKey] = propValue;
      }
    }
  }
  return to;
};
var implementation$7 = implementation$8;
var lacksProperEnumerationOrder = function() {
  if (!Object.assign) {
    return false;
  }
  var str = "abcdefghijklmnopqrst";
  var letters = str.split("");
  var map = {};
  for (var i = 0; i < letters.length; ++i) {
    map[letters[i]] = letters[i];
  }
  var obj = Object.assign({}, map);
  var actual = "";
  for (var k in obj) {
    actual += k;
  }
  return str !== actual;
};
var assignHasPendingExceptions = function() {
  if (!Object.assign || !Object.preventExtensions) {
    return false;
  }
  var thrower = Object.preventExtensions({ 1: 2 });
  try {
    Object.assign(thrower, "xy");
  } catch (e) {
    return thrower[1] === "y";
  }
  return false;
};
var polyfill$4 = function getPolyfill() {
  if (!Object.assign) {
    return implementation$7;
  }
  if (lacksProperEnumerationOrder()) {
    return implementation$7;
  }
  if (assignHasPendingExceptions()) {
    return implementation$7;
  }
  return Object.assign;
};
var define$4 = defineProperties_1;
var getPolyfill$5 = polyfill$4;
var shim$5 = function shimAssign() {
  var polyfill2 = getPolyfill$5();
  define$4(
    Object,
    { assign: polyfill2 },
    { assign: function() {
      return Object.assign !== polyfill2;
    } }
  );
  return polyfill2;
};
var defineProperties = defineProperties_1;
var callBind$4 = callBindExports;
var implementation$6 = implementation$8;
var getPolyfill$4 = polyfill$4;
var shim$4 = shim$5;
var polyfill$3 = callBind$4.apply(getPolyfill$4());
var bound = function assign2(target, source1) {
  return polyfill$3(Object, arguments);
};
defineProperties(bound, {
  getPolyfill: getPolyfill$4,
  implementation: implementation$6,
  shim: shim$4
});
var object_assign = bound;
var functionsHaveNames = function functionsHaveNames2() {
  return typeof (function f() {
  }).name === "string";
};
var gOPD$3 = Object.getOwnPropertyDescriptor;
if (gOPD$3) {
  try {
    gOPD$3([], "length");
  } catch (e) {
    gOPD$3 = null;
  }
}
functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
  if (!functionsHaveNames() || !gOPD$3) {
    return false;
  }
  var desc = gOPD$3(function() {
  }, "name");
  return !!desc && !!desc.configurable;
};
var $bind = Function.prototype.bind;
functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
  return functionsHaveNames() && typeof $bind === "function" && (function f() {
  }).bind().name !== "";
};
var functionsHaveNames_1 = functionsHaveNames;
var define$3 = defineDataProperty$1;
var hasDescriptors = hasPropertyDescriptors_1();
var functionsHaveConfigurableNames2 = functionsHaveNames_1.functionsHaveConfigurableNames();
var $TypeError$3 = TypeError;
var setFunctionName$1 = function setFunctionName(fn, name) {
  if (typeof fn !== "function") {
    throw new $TypeError$3("`fn` is not a function");
  }
  var loose = arguments.length > 2 && !!arguments[2];
  if (!loose || functionsHaveConfigurableNames2) {
    if (hasDescriptors) {
      define$3(fn, "name", name, true, true);
    } else {
      define$3(fn, "name", name);
    }
  }
  return fn;
};
var setFunctionName2 = setFunctionName$1;
var $Object = Object;
var $TypeError$2 = TypeError;
var implementation$5 = setFunctionName2(function flags() {
  if (this != null && this !== $Object(this)) {
    throw new $TypeError$2("RegExp.prototype.flags getter called on non-object");
  }
  var result = "";
  if (this.hasIndices) {
    result += "d";
  }
  if (this.global) {
    result += "g";
  }
  if (this.ignoreCase) {
    result += "i";
  }
  if (this.multiline) {
    result += "m";
  }
  if (this.dotAll) {
    result += "s";
  }
  if (this.unicode) {
    result += "u";
  }
  if (this.unicodeSets) {
    result += "v";
  }
  if (this.sticky) {
    result += "y";
  }
  return result;
}, "get flags", true);
var implementation$4 = implementation$5;
var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;
var $gOPD = Object.getOwnPropertyDescriptor;
var polyfill$2 = function getPolyfill2() {
  if (supportsDescriptors$1 && /a/mig.flags === "gim") {
    var descriptor = $gOPD(RegExp.prototype, "flags");
    if (descriptor && typeof descriptor.get === "function" && typeof RegExp.prototype.dotAll === "boolean" && typeof RegExp.prototype.hasIndices === "boolean") {
      var calls = "";
      var o = {};
      Object.defineProperty(o, "hasIndices", {
        get: function() {
          calls += "d";
        }
      });
      Object.defineProperty(o, "sticky", {
        get: function() {
          calls += "y";
        }
      });
      if (calls === "dy") {
        return descriptor.get;
      }
    }
  }
  return implementation$4;
};
var supportsDescriptors = defineProperties_1.supportsDescriptors;
var getPolyfill$3 = polyfill$2;
var gOPD$2 = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var TypeErr = TypeError;
var getProto = Object.getPrototypeOf;
var regex = /a/;
var shim$3 = function shimFlags() {
  if (!supportsDescriptors || !getProto) {
    throw new TypeErr("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
  }
  var polyfill2 = getPolyfill$3();
  var proto = getProto(regex);
  var descriptor = gOPD$2(proto, "flags");
  if (!descriptor || descriptor.get !== polyfill2) {
    defineProperty(proto, "flags", {
      configurable: true,
      enumerable: false,
      get: polyfill2
    });
  }
  return polyfill2;
};
var define$2 = defineProperties_1;
var callBind$3 = callBindExports;
var implementation$3 = implementation$5;
var getPolyfill$2 = polyfill$2;
var shim$2 = shim$3;
var flagsBound = callBind$3(getPolyfill$2());
define$2(flagsBound, {
  getPolyfill: getPolyfill$2,
  implementation: implementation$3,
  shim: shim$2
});
var regexp_prototype_flags = flagsBound;
var esGetIterator = { exports: {} };
var hasSymbols$1 = shams$1;
var shams = function hasToStringTagShams() {
  return hasSymbols$1() && !!Symbol.toStringTag;
};
var hasToStringTag$7 = shams();
var callBound$a = callBound$c;
var $toString$3 = callBound$a("Object.prototype.toString");
var isStandardArguments = function isArguments2(value) {
  if (hasToStringTag$7 && value && typeof value === "object" && Symbol.toStringTag in value) {
    return false;
  }
  return $toString$3(value) === "[object Arguments]";
};
var isLegacyArguments = function isArguments3(value) {
  if (isStandardArguments(value)) {
    return true;
  }
  return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString$3(value) !== "[object Array]" && $toString$3(value.callee) === "[object Function]";
};
var supportsStandardArguments = function() {
  return isStandardArguments(arguments);
}();
isStandardArguments.isLegacyArguments = isLegacyArguments;
var isArguments$2 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
var hasMap = typeof Map === "function" && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === "function" && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice$1 = String.prototype.slice;
var $replace = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf$1 = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;
var gPO$1 = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
  return O.__proto__;
} : null);
function addNumericSeparator(num, str) {
  if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
    return str;
  }
  var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof num === "number") {
    var int = num < 0 ? -$floor(-num) : $floor(num);
    if (int !== num) {
      var intStr = String(int);
      var dec = $slice$1.call(str, intStr.length + 1);
      return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return $replace.call(str, sepRegex, "$&_");
}
var utilInspect = require$$0;
var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol$2(inspectCustom) ? inspectCustom : null;
var objectInspect = function inspect_(obj, options, depth, seen) {
  var opts = options || {};
  if (has$1(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  }
  if (has$1(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  }
  var customInspect = has$1(opts, "customInspect") ? opts.customInspect : true;
  if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  }
  if (has$1(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  }
  if (has$1(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  }
  var numericSeparator = opts.numericSeparator;
  if (typeof obj === "undefined") {
    return "undefined";
  }
  if (obj === null) {
    return "null";
  }
  if (typeof obj === "boolean") {
    return obj ? "true" : "false";
  }
  if (typeof obj === "string") {
    return inspectString(obj, opts);
  }
  if (typeof obj === "number") {
    if (obj === 0) {
      return Infinity / obj > 0 ? "0" : "-0";
    }
    var str = String(obj);
    return numericSeparator ? addNumericSeparator(obj, str) : str;
  }
  if (typeof obj === "bigint") {
    var bigIntStr = String(obj) + "n";
    return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
  }
  var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
  if (typeof depth === "undefined") {
    depth = 0;
  }
  if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
    return isArray$2(obj) ? "[Array]" : "[Object]";
  }
  var indent = getIndent(opts, depth);
  if (typeof seen === "undefined") {
    seen = [];
  } else if (indexOf(seen, obj) >= 0) {
    return "[Circular]";
  }
  function inspect2(value, from, noIndent) {
    if (from) {
      seen = $arrSlice.call(seen);
      seen.push(from);
    }
    if (noIndent) {
      var newOpts = {
        depth: opts.depth
      };
      if (has$1(opts, "quoteStyle")) {
        newOpts.quoteStyle = opts.quoteStyle;
      }
      return inspect_(value, newOpts, depth + 1, seen);
    }
    return inspect_(value, opts, depth + 1, seen);
  }
  if (typeof obj === "function" && !isRegExp(obj)) {
    var name = nameOf(obj);
    var keys8 = arrObjKeys(obj, inspect2);
    return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys8.length > 0 ? " { " + $join.call(keys8, ", ") + " }" : "");
  }
  if (isSymbol$2(obj)) {
    var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
    return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
  }
  if (isElement$2(obj)) {
    var s = "<" + $toLowerCase.call(String(obj.nodeName));
    var attrs = obj.attributes || [];
    for (var i = 0; i < attrs.length; i++) {
      s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
    }
    s += ">";
    if (obj.childNodes && obj.childNodes.length) {
      s += "...";
    }
    s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
    return s;
  }
  if (isArray$2(obj)) {
    if (obj.length === 0) {
      return "[]";
    }
    var xs = arrObjKeys(obj, inspect2);
    if (indent && !singleLineValues(xs)) {
      return "[" + indentedJoin(xs, indent) + "]";
    }
    return "[ " + $join.call(xs, ", ") + " ]";
  }
  if (isError(obj)) {
    var parts = arrObjKeys(obj, inspect2);
    if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
      return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect2(obj.cause), parts), ", ") + " }";
    }
    if (parts.length === 0) {
      return "[" + String(obj) + "]";
    }
    return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
  }
  if (typeof obj === "object" && customInspect) {
    if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
      return utilInspect(obj, { depth: maxDepth - depth });
    } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
      return obj.inspect();
    }
  }
  if (isMap$3(obj)) {
    var mapParts = [];
    if (mapForEach) {
      mapForEach.call(obj, function(value, key) {
        mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
      });
    }
    return collectionOf("Map", mapSize.call(obj), mapParts, indent);
  }
  if (isSet$3(obj)) {
    var setParts = [];
    if (setForEach) {
      setForEach.call(obj, function(value) {
        setParts.push(inspect2(value, obj));
      });
    }
    return collectionOf("Set", setSize.call(obj), setParts, indent);
  }
  if (isWeakMap$1(obj)) {
    return weakCollectionOf("WeakMap");
  }
  if (isWeakSet$1(obj)) {
    return weakCollectionOf("WeakSet");
  }
  if (isWeakRef(obj)) {
    return weakCollectionOf("WeakRef");
  }
  if (isNumber$1(obj)) {
    return markBoxed(inspect2(Number(obj)));
  }
  if (isBigInt$1(obj)) {
    return markBoxed(inspect2(bigIntValueOf$1.call(obj)));
  }
  if (isBoolean$1(obj)) {
    return markBoxed(booleanValueOf.call(obj));
  }
  if (isString$3(obj)) {
    return markBoxed(inspect2(String(obj)));
  }
  if (typeof window !== "undefined" && obj === window) {
    return "{ [object Window] }";
  }
  if (obj === commonjsGlobal) {
    return "{ [object globalThis] }";
  }
  if (!isDate$1(obj) && !isRegExp(obj)) {
    var ys = arrObjKeys(obj, inspect2);
    var isPlainObject = gPO$1 ? gPO$1(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
    var protoTag = obj instanceof Object ? "" : "null prototype";
    var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice$1.call(toStr$6(obj), 8, -1) : protoTag ? "Object" : "";
    var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
    var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
    if (ys.length === 0) {
      return tag + "{}";
    }
    if (indent) {
      return tag + "{" + indentedJoin(ys, indent) + "}";
    }
    return tag + "{ " + $join.call(ys, ", ") + " }";
  }
  return String(obj);
};
function wrapQuotes(s, defaultStyle, opts) {
  var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
  return quoteChar + s + quoteChar;
}
function quote(s) {
  return $replace.call(String(s), /"/g, "&quot;");
}
function isArray$2(obj) {
  return toStr$6(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isDate$1(obj) {
  return toStr$6(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isRegExp(obj) {
  return toStr$6(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isError(obj) {
  return toStr$6(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isString$3(obj) {
  return toStr$6(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isNumber$1(obj) {
  return toStr$6(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isBoolean$1(obj) {
  return toStr$6(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isSymbol$2(obj) {
  if (hasShammedSymbols) {
    return obj && typeof obj === "object" && obj instanceof Symbol;
  }
  if (typeof obj === "symbol") {
    return true;
  }
  if (!obj || typeof obj !== "object" || !symToString) {
    return false;
  }
  try {
    symToString.call(obj);
    return true;
  } catch (e) {
  }
  return false;
}
function isBigInt$1(obj) {
  if (!obj || typeof obj !== "object" || !bigIntValueOf$1) {
    return false;
  }
  try {
    bigIntValueOf$1.call(obj);
    return true;
  } catch (e) {
  }
  return false;
}
var hasOwn$1 = Object.prototype.hasOwnProperty || function(key) {
  return key in this;
};
function has$1(obj, key) {
  return hasOwn$1.call(obj, key);
}
function toStr$6(obj) {
  return objectToString.call(obj);
}
function nameOf(f) {
  if (f.name) {
    return f.name;
  }
  var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
  if (m) {
    return m[1];
  }
  return null;
}
function indexOf(xs, x) {
  if (xs.indexOf) {
    return xs.indexOf(x);
  }
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) {
      return i;
    }
  }
  return -1;
}
function isMap$3(x) {
  if (!mapSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    mapSize.call(x);
    try {
      setSize.call(x);
    } catch (s) {
      return true;
    }
    return x instanceof Map;
  } catch (e) {
  }
  return false;
}
function isWeakMap$1(x) {
  if (!weakMapHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakMapHas.call(x, weakMapHas);
    try {
      weakSetHas.call(x, weakSetHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakMap;
  } catch (e) {
  }
  return false;
}
function isWeakRef(x) {
  if (!weakRefDeref || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakRefDeref.call(x);
    return true;
  } catch (e) {
  }
  return false;
}
function isSet$3(x) {
  if (!setSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    setSize.call(x);
    try {
      mapSize.call(x);
    } catch (m) {
      return true;
    }
    return x instanceof Set;
  } catch (e) {
  }
  return false;
}
function isWeakSet$1(x) {
  if (!weakSetHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakSetHas.call(x, weakSetHas);
    try {
      weakMapHas.call(x, weakMapHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakSet;
  } catch (e) {
  }
  return false;
}
function isElement$2(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
    return true;
  }
  return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
}
function inspectString(str, opts) {
  if (str.length > opts.maxStringLength) {
    var remaining = str.length - opts.maxStringLength;
    var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
    return inspectString($slice$1.call(str, 0, opts.maxStringLength), opts) + trailer;
  }
  var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
  return wrapQuotes(s, "single", opts);
}
function lowbyte(c) {
  var n = c.charCodeAt(0);
  var x = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[n];
  if (x) {
    return "\\" + x;
  }
  return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
}
function markBoxed(str) {
  return "Object(" + str + ")";
}
function weakCollectionOf(type2) {
  return type2 + " { ? }";
}
function collectionOf(type2, size, entries6, indent) {
  var joinedEntries = indent ? indentedJoin(entries6, indent) : $join.call(entries6, ", ");
  return type2 + " (" + size + ") {" + joinedEntries + "}";
}
function singleLineValues(xs) {
  for (var i = 0; i < xs.length; i++) {
    if (indexOf(xs[i], "\n") >= 0) {
      return false;
    }
  }
  return true;
}
function getIndent(opts, depth) {
  var baseIndent;
  if (opts.indent === "	") {
    baseIndent = "	";
  } else if (typeof opts.indent === "number" && opts.indent > 0) {
    baseIndent = $join.call(Array(opts.indent + 1), " ");
  } else {
    return null;
  }
  return {
    base: baseIndent,
    prev: $join.call(Array(depth + 1), baseIndent)
  };
}
function indentedJoin(xs, indent) {
  if (xs.length === 0) {
    return "";
  }
  var lineJoiner = "\n" + indent.prev + indent.base;
  return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
}
function arrObjKeys(obj, inspect2) {
  var isArr = isArray$2(obj);
  var xs = [];
  if (isArr) {
    xs.length = obj.length;
    for (var i = 0; i < obj.length; i++) {
      xs[i] = has$1(obj, i) ? inspect2(obj[i], obj) : "";
    }
  }
  var syms = typeof gOPS === "function" ? gOPS(obj) : [];
  var symMap;
  if (hasShammedSymbols) {
    symMap = {};
    for (var k = 0; k < syms.length; k++) {
      symMap["$" + syms[k]] = syms[k];
    }
  }
  for (var key in obj) {
    if (!has$1(obj, key)) {
      continue;
    }
    if (isArr && String(Number(key)) === key && key < obj.length) {
      continue;
    }
    if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
      continue;
    } else if ($test.call(/[^\w$]/, key)) {
      xs.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
    } else {
      xs.push(key + ": " + inspect2(obj[key], obj));
    }
  }
  if (typeof gOPS === "function") {
    for (var j = 0; j < syms.length; j++) {
      if (isEnumerable.call(obj, syms[j])) {
        xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
      }
    }
  }
  return xs;
}
var GetIntrinsic$5 = getIntrinsic;
var callBound$9 = callBound$c;
var inspect = objectInspect;
var $TypeError$1 = GetIntrinsic$5("%TypeError%");
var $WeakMap$1 = GetIntrinsic$5("%WeakMap%", true);
var $Map$3 = GetIntrinsic$5("%Map%", true);
var $weakMapGet = callBound$9("WeakMap.prototype.get", true);
var $weakMapSet = callBound$9("WeakMap.prototype.set", true);
var $weakMapHas = callBound$9("WeakMap.prototype.has", true);
var $mapGet$1 = callBound$9("Map.prototype.get", true);
var $mapSet = callBound$9("Map.prototype.set", true);
var $mapHas$5 = callBound$9("Map.prototype.has", true);
var listGetNode = function(list, key) {
  for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
    if (curr.key === key) {
      prev.next = curr.next;
      curr.next = list.next;
      list.next = curr;
      return curr;
    }
  }
};
var listGet = function(objects, key) {
  var node = listGetNode(objects, key);
  return node && node.value;
};
var listSet = function(objects, key, value) {
  var node = listGetNode(objects, key);
  if (node) {
    node.value = value;
  } else {
    objects.next = {
      // eslint-disable-line no-param-reassign
      key,
      next: objects.next,
      value
    };
  }
};
var listHas = function(objects, key) {
  return !!listGetNode(objects, key);
};
var sideChannel = function getSideChannel() {
  var $wm;
  var $m;
  var $o;
  var channel2 = {
    assert: function(key) {
      if (!channel2.has(key)) {
        throw new $TypeError$1("Side channel does not contain " + inspect(key));
      }
    },
    get: function(key) {
      if ($WeakMap$1 && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapGet($wm, key);
        }
      } else if ($Map$3) {
        if ($m) {
          return $mapGet$1($m, key);
        }
      } else {
        if ($o) {
          return listGet($o, key);
        }
      }
    },
    has: function(key) {
      if ($WeakMap$1 && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapHas($wm, key);
        }
      } else if ($Map$3) {
        if ($m) {
          return $mapHas$5($m, key);
        }
      } else {
        if ($o) {
          return listHas($o, key);
        }
      }
      return false;
    },
    set: function(key, value) {
      if ($WeakMap$1 && key && (typeof key === "object" || typeof key === "function")) {
        if (!$wm) {
          $wm = new $WeakMap$1();
        }
        $weakMapSet($wm, key, value);
      } else if ($Map$3) {
        if (!$m) {
          $m = new $Map$3();
        }
        $mapSet($m, key, value);
      } else {
        if (!$o) {
          $o = { key: {}, next: null };
        }
        listSet($o, key, value);
      }
    }
  };
  return channel2;
};
var GetIntrinsic$4 = getIntrinsic;
var hasOwn = hasown;
var channel = sideChannel();
var $TypeError = GetIntrinsic$4("%TypeError%");
var SLOT$1 = {
  assert: function(O, slot) {
    if (!O || typeof O !== "object" && typeof O !== "function") {
      throw new $TypeError("`O` is not an object");
    }
    if (typeof slot !== "string") {
      throw new $TypeError("`slot` must be a string");
    }
    channel.assert(O);
    if (!SLOT$1.has(O, slot)) {
      throw new $TypeError("`" + slot + "` is not present on `O`");
    }
  },
  get: function(O, slot) {
    if (!O || typeof O !== "object" && typeof O !== "function") {
      throw new $TypeError("`O` is not an object");
    }
    if (typeof slot !== "string") {
      throw new $TypeError("`slot` must be a string");
    }
    var slots = channel.get(O);
    return slots && slots["$" + slot];
  },
  has: function(O, slot) {
    if (!O || typeof O !== "object" && typeof O !== "function") {
      throw new $TypeError("`O` is not an object");
    }
    if (typeof slot !== "string") {
      throw new $TypeError("`slot` must be a string");
    }
    var slots = channel.get(O);
    return !!slots && hasOwn(slots, "$" + slot);
  },
  set: function(O, slot, V) {
    if (!O || typeof O !== "object" && typeof O !== "function") {
      throw new $TypeError("`O` is not an object");
    }
    if (typeof slot !== "string") {
      throw new $TypeError("`slot` must be a string");
    }
    var slots = channel.get(O);
    if (!slots) {
      slots = {};
      channel.set(O, slots);
    }
    slots["$" + slot] = V;
  }
};
if (Object.freeze) {
  Object.freeze(SLOT$1);
}
var internalSlot = SLOT$1;
var SLOT = internalSlot;
var $SyntaxError = SyntaxError;
var $StopIteration = typeof StopIteration === "object" ? StopIteration : null;
var stopIterationIterator = function getStopIterationIterator(origIterator) {
  if (!$StopIteration) {
    throw new $SyntaxError("this environment lacks StopIteration");
  }
  SLOT.set(origIterator, "[[Done]]", false);
  var siIterator = {
    next: function next() {
      var iterator = SLOT.get(this, "[[Iterator]]");
      var done = SLOT.get(iterator, "[[Done]]");
      try {
        return {
          done,
          value: done ? void 0 : iterator.next()
        };
      } catch (e) {
        SLOT.set(iterator, "[[Done]]", true);
        if (e !== $StopIteration) {
          throw e;
        }
        return {
          done: true,
          value: void 0
        };
      }
    }
  };
  SLOT.set(siIterator, "[[Iterator]]", origIterator);
  return siIterator;
};
var toString = {}.toString;
var isarray = Array.isArray || function(arr) {
  return toString.call(arr) == "[object Array]";
};
var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject2(value) {
  try {
    strValue.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr$5 = Object.prototype.toString;
var strClass = "[object String]";
var hasToStringTag$6 = shams();
var isString$2 = function isString(value) {
  if (typeof value === "string") {
    return true;
  }
  if (typeof value !== "object") {
    return false;
  }
  return hasToStringTag$6 ? tryStringObject(value) : toStr$5.call(value) === strClass;
};
var $Map$2 = typeof Map === "function" && Map.prototype ? Map : null;
var $Set$3 = typeof Set === "function" && Set.prototype ? Set : null;
var exported$2;
if (!$Map$2) {
  exported$2 = function isMap3(x) {
    return false;
  };
}
var $mapHas$4 = $Map$2 ? Map.prototype.has : null;
var $setHas$4 = $Set$3 ? Set.prototype.has : null;
if (!exported$2 && !$mapHas$4) {
  exported$2 = function isMap3(x) {
    return false;
  };
}
var isMap$2 = exported$2 || function isMap(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    $mapHas$4.call(x);
    if ($setHas$4) {
      try {
        $setHas$4.call(x);
      } catch (e) {
        return true;
      }
    }
    return x instanceof $Map$2;
  } catch (e) {
  }
  return false;
};
var $Map$1 = typeof Map === "function" && Map.prototype ? Map : null;
var $Set$2 = typeof Set === "function" && Set.prototype ? Set : null;
var exported$1;
if (!$Set$2) {
  exported$1 = function isSet3(x) {
    return false;
  };
}
var $mapHas$3 = $Map$1 ? Map.prototype.has : null;
var $setHas$3 = $Set$2 ? Set.prototype.has : null;
if (!exported$1 && !$setHas$3) {
  exported$1 = function isSet3(x) {
    return false;
  };
}
var isSet$2 = exported$1 || function isSet(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    $setHas$3.call(x);
    if ($mapHas$3) {
      try {
        $mapHas$3.call(x);
      } catch (e) {
        return true;
      }
    }
    return x instanceof $Set$2;
  } catch (e) {
  }
  return false;
};
var isArguments$1 = isArguments$2;
var getStopIterationIterator2 = stopIterationIterator;
if (hasSymbols$5() || shams$1()) {
  var $iterator = Symbol.iterator;
  esGetIterator.exports = function getIterator2(iterable) {
    if (iterable != null && typeof iterable[$iterator] !== "undefined") {
      return iterable[$iterator]();
    }
    if (isArguments$1(iterable)) {
      return Array.prototype[$iterator].call(iterable);
    }
  };
} else {
  var isArray$1 = isarray;
  var isString$1 = isString$2;
  var GetIntrinsic$3 = getIntrinsic;
  var $Map = GetIntrinsic$3("%Map%", true);
  var $Set$1 = GetIntrinsic$3("%Set%", true);
  var callBound$8 = callBound$c;
  var $arrayPush = callBound$8("Array.prototype.push");
  var $charCodeAt = callBound$8("String.prototype.charCodeAt");
  var $stringSlice = callBound$8("String.prototype.slice");
  var advanceStringIndex = function advanceStringIndex2(S, index2) {
    var length = S.length;
    if (index2 + 1 >= length) {
      return index2 + 1;
    }
    var first = $charCodeAt(S, index2);
    if (first < 55296 || first > 56319) {
      return index2 + 1;
    }
    var second = $charCodeAt(S, index2 + 1);
    if (second < 56320 || second > 57343) {
      return index2 + 1;
    }
    return index2 + 2;
  };
  var getArrayIterator = function getArrayIterator2(arraylike) {
    var i = 0;
    return {
      next: function next() {
        var done = i >= arraylike.length;
        var value;
        if (!done) {
          value = arraylike[i];
          i += 1;
        }
        return {
          done,
          value
        };
      }
    };
  };
  var getNonCollectionIterator = function getNonCollectionIterator2(iterable, noPrimordialCollections) {
    if (isArray$1(iterable) || isArguments$1(iterable)) {
      return getArrayIterator(iterable);
    }
    if (isString$1(iterable)) {
      var i = 0;
      return {
        next: function next() {
          var nextIndex = advanceStringIndex(iterable, i);
          var value = $stringSlice(iterable, i, nextIndex);
          i = nextIndex;
          return {
            done: nextIndex > iterable.length,
            value
          };
        }
      };
    }
    if (noPrimordialCollections && typeof iterable["_es6-shim iterator_"] !== "undefined") {
      return iterable["_es6-shim iterator_"]();
    }
  };
  if (!$Map && !$Set$1) {
    esGetIterator.exports = function getIterator2(iterable) {
      if (iterable != null) {
        return getNonCollectionIterator(iterable, true);
      }
    };
  } else {
    var isMap$1 = isMap$2;
    var isSet$1 = isSet$2;
    var $mapForEach = callBound$8("Map.prototype.forEach", true);
    var $setForEach = callBound$8("Set.prototype.forEach", true);
    if (typeof process === "undefined" || !process.versions || !process.versions.node) {
      var $mapIterator = callBound$8("Map.prototype.iterator", true);
      var $setIterator = callBound$8("Set.prototype.iterator", true);
    }
    var $mapAtAtIterator = callBound$8("Map.prototype.@@iterator", true) || callBound$8("Map.prototype._es6-shim iterator_", true);
    var $setAtAtIterator = callBound$8("Set.prototype.@@iterator", true) || callBound$8("Set.prototype._es6-shim iterator_", true);
    var getCollectionIterator = function getCollectionIterator2(iterable) {
      if (isMap$1(iterable)) {
        if ($mapIterator) {
          return getStopIterationIterator2($mapIterator(iterable));
        }
        if ($mapAtAtIterator) {
          return $mapAtAtIterator(iterable);
        }
        if ($mapForEach) {
          var entries6 = [];
          $mapForEach(iterable, function(v, k) {
            $arrayPush(entries6, [k, v]);
          });
          return getArrayIterator(entries6);
        }
      }
      if (isSet$1(iterable)) {
        if ($setIterator) {
          return getStopIterationIterator2($setIterator(iterable));
        }
        if ($setAtAtIterator) {
          return $setAtAtIterator(iterable);
        }
        if ($setForEach) {
          var values6 = [];
          $setForEach(iterable, function(v) {
            $arrayPush(values6, v);
          });
          return getArrayIterator(values6);
        }
      }
    };
    esGetIterator.exports = function getIterator2(iterable) {
      return getCollectionIterator(iterable) || getNonCollectionIterator(iterable);
    };
  }
}
var esGetIteratorExports = esGetIterator.exports;
var numberIsNaN = function(value) {
  return value !== value;
};
var implementation$2 = function is(a, b) {
  if (a === 0 && b === 0) {
    return 1 / a === 1 / b;
  }
  if (a === b) {
    return true;
  }
  if (numberIsNaN(a) && numberIsNaN(b)) {
    return true;
  }
  return false;
};
var implementation$1 = implementation$2;
var polyfill$1 = function getPolyfill3() {
  return typeof Object.is === "function" ? Object.is : implementation$1;
};
var getPolyfill$1 = polyfill$1;
var define$1 = defineProperties_1;
var shim$1 = function shimObjectIs() {
  var polyfill2 = getPolyfill$1();
  define$1(Object, { is: polyfill2 }, {
    is: function testObjectIs() {
      return Object.is !== polyfill2;
    }
  });
  return polyfill2;
};
var define = defineProperties_1;
var callBind$2 = callBindExports;
var implementation = implementation$2;
var getPolyfill4 = polyfill$1;
var shim = shim$1;
var polyfill = callBind$2(getPolyfill4(), Object);
define(polyfill, {
  getPolyfill: getPolyfill4,
  implementation,
  shim
});
var objectIs = polyfill;
var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
  try {
    badArrayLike = Object.defineProperty({}, "length", {
      get: function() {
        throw isCallableMarker;
      }
    });
    isCallableMarker = {};
    reflectApply(function() {
      throw 42;
    }, null, badArrayLike);
  } catch (_) {
    if (_ !== isCallableMarker) {
      reflectApply = null;
    }
  }
} else {
  reflectApply = null;
}
var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
  try {
    var fnStr = fnToStr.call(value);
    return constructorRegex.test(fnStr);
  } catch (e) {
    return false;
  }
};
var tryFunctionObject = function tryFunctionToStr(value) {
  try {
    if (isES6ClassFn(value)) {
      return false;
    }
    fnToStr.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr$4 = Object.prototype.toString;
var objectClass = "[object Object]";
var fnClass = "[object Function]";
var genClass = "[object GeneratorFunction]";
var ddaClass = "[object HTMLAllCollection]";
var ddaClass2 = "[object HTML document.all class]";
var ddaClass3 = "[object HTMLCollection]";
var hasToStringTag$5 = typeof Symbol === "function" && !!Symbol.toStringTag;
var isIE68 = !(0 in [,]);
var isDDA = function isDocumentDotAll() {
  return false;
};
if (typeof document === "object") {
  var all = document.all;
  if (toStr$4.call(all) === toStr$4.call(document.all)) {
    isDDA = function isDocumentDotAll2(value) {
      if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
        try {
          var str = toStr$4.call(value);
          return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
        } catch (e) {
        }
      }
      return false;
    };
  }
}
var isCallable$1 = reflectApply ? function isCallable(value) {
  if (isDDA(value)) {
    return true;
  }
  if (!value) {
    return false;
  }
  if (typeof value !== "function" && typeof value !== "object") {
    return false;
  }
  try {
    reflectApply(value, null, badArrayLike);
  } catch (e) {
    if (e !== isCallableMarker) {
      return false;
    }
  }
  return !isES6ClassFn(value) && tryFunctionObject(value);
} : function isCallable2(value) {
  if (isDDA(value)) {
    return true;
  }
  if (!value) {
    return false;
  }
  if (typeof value !== "function" && typeof value !== "object") {
    return false;
  }
  if (hasToStringTag$5) {
    return tryFunctionObject(value);
  }
  if (isES6ClassFn(value)) {
    return false;
  }
  var strClass2 = toStr$4.call(value);
  if (strClass2 !== fnClass && strClass2 !== genClass && !/^\[object HTML/.test(strClass2)) {
    return false;
  }
  return tryFunctionObject(value);
};
var isCallable3 = isCallable$1;
var toStr$3 = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var forEachArray = function forEachArray2(array, iterator, receiver) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (hasOwnProperty.call(array, i)) {
      if (receiver == null) {
        iterator(array[i], i, array);
      } else {
        iterator.call(receiver, array[i], i, array);
      }
    }
  }
};
var forEachString = function forEachString2(string, iterator, receiver) {
  for (var i = 0, len = string.length; i < len; i++) {
    if (receiver == null) {
      iterator(string.charAt(i), i, string);
    } else {
      iterator.call(receiver, string.charAt(i), i, string);
    }
  }
};
var forEachObject = function forEachObject2(object, iterator, receiver) {
  for (var k in object) {
    if (hasOwnProperty.call(object, k)) {
      if (receiver == null) {
        iterator(object[k], k, object);
      } else {
        iterator.call(receiver, object[k], k, object);
      }
    }
  }
};
var forEach$1 = function forEach4(list, iterator, thisArg) {
  if (!isCallable3(iterator)) {
    throw new TypeError("iterator must be a function");
  }
  var receiver;
  if (arguments.length >= 3) {
    receiver = thisArg;
  }
  if (toStr$3.call(list) === "[object Array]") {
    forEachArray(list, iterator, receiver);
  } else if (typeof list === "string") {
    forEachString(list, iterator, receiver);
  } else {
    forEachObject(list, iterator, receiver);
  }
};
var forEach_1 = forEach$1;
var possibleNames = [
  "BigInt64Array",
  "BigUint64Array",
  "Float32Array",
  "Float64Array",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "Uint16Array",
  "Uint32Array",
  "Uint8Array",
  "Uint8ClampedArray"
];
var g$2 = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
var availableTypedArrays$1 = function availableTypedArrays() {
  var out = [];
  for (var i = 0; i < possibleNames.length; i++) {
    if (typeof g$2[possibleNames[i]] === "function") {
      out[out.length] = possibleNames[i];
    }
  }
  return out;
};
var forEach5 = forEach_1;
var availableTypedArrays2 = availableTypedArrays$1;
var callBind$1 = callBindExports;
var callBound$7 = callBound$c;
var gOPD$1 = gopd$1;
var $toString$2 = callBound$7("Object.prototype.toString");
var hasToStringTag$4 = shams();
var g$1 = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
var typedArrays = availableTypedArrays2();
var $slice = callBound$7("String.prototype.slice");
var getPrototypeOf = Object.getPrototypeOf;
var $indexOf = callBound$7("Array.prototype.indexOf", true) || function indexOf2(array, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
};
var cache = { __proto__: null };
if (hasToStringTag$4 && gOPD$1 && getPrototypeOf) {
  forEach5(typedArrays, function(typedArray) {
    var arr = new g$1[typedArray]();
    if (Symbol.toStringTag in arr) {
      var proto = getPrototypeOf(arr);
      var descriptor = gOPD$1(proto, Symbol.toStringTag);
      if (!descriptor) {
        var superProto = getPrototypeOf(proto);
        descriptor = gOPD$1(superProto, Symbol.toStringTag);
      }
      cache["$" + typedArray] = callBind$1(descriptor.get);
    }
  });
} else {
  forEach5(typedArrays, function(typedArray) {
    var arr = new g$1[typedArray]();
    var fn = arr.slice || arr.set;
    if (fn) {
      cache["$" + typedArray] = callBind$1(fn);
    }
  });
}
var tryTypedArrays = function tryAllTypedArrays(value) {
  var found = false;
  forEach5(cache, function(getter, typedArray) {
    if (!found) {
      try {
        if ("$" + getter(value) === typedArray) {
          found = $slice(typedArray, 1);
        }
      } catch (e) {
      }
    }
  });
  return found;
};
var trySlices = function tryAllSlices(value) {
  var found = false;
  forEach5(cache, function(getter, name) {
    if (!found) {
      try {
        getter(value);
        found = $slice(name, 1);
      } catch (e) {
      }
    }
  });
  return found;
};
var whichTypedArray$2 = function whichTypedArray(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (!hasToStringTag$4) {
    var tag = $slice($toString$2(value), 8, -1);
    if ($indexOf(typedArrays, tag) > -1) {
      return tag;
    }
    if (tag !== "Object") {
      return false;
    }
    return trySlices(value);
  }
  if (!gOPD$1) {
    return null;
  }
  return tryTypedArrays(value);
};
var whichTypedArray$1 = whichTypedArray$2;
var isTypedArray$1 = function isTypedArray(value) {
  return !!whichTypedArray$1(value);
};
var callBind = callBindExports;
var callBound$6 = callBound$c;
var GetIntrinsic$2 = getIntrinsic;
var isTypedArray2 = isTypedArray$1;
var $ArrayBuffer = GetIntrinsic$2("ArrayBuffer", true);
var $Float32Array = GetIntrinsic$2("Float32Array", true);
var $byteLength$2 = callBound$6("ArrayBuffer.prototype.byteLength", true);
var abSlice = $ArrayBuffer && !$byteLength$2 && new $ArrayBuffer().slice;
var $abSlice = abSlice && callBind(abSlice);
var isArrayBuffer$2 = $byteLength$2 || $abSlice ? function isArrayBuffer(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  try {
    if ($byteLength$2) {
      $byteLength$2(obj);
    } else {
      $abSlice(obj, 0);
    }
    return true;
  } catch (e) {
    return false;
  }
} : $Float32Array ? function IsArrayBuffer(obj) {
  try {
    return new $Float32Array(obj).buffer === obj && !isTypedArray2(obj);
  } catch (e) {
    return typeof obj === "object" && e.name === "RangeError";
  }
} : function isArrayBuffer2(obj) {
  return false;
};
var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
  try {
    getDay.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr$2 = Object.prototype.toString;
var dateClass = "[object Date]";
var hasToStringTag$3 = shams();
var isDateObject = function isDateObject2(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return hasToStringTag$3 ? tryDateObject(value) : toStr$2.call(value) === dateClass;
};
var callBound$5 = callBound$c;
var hasToStringTag$2 = shams();
var has4;
var $exec;
var isRegexMarker;
var badStringifier;
if (hasToStringTag$2) {
  has4 = callBound$5("Object.prototype.hasOwnProperty");
  $exec = callBound$5("RegExp.prototype.exec");
  isRegexMarker = {};
  var throwRegexMarker = function() {
    throw isRegexMarker;
  };
  badStringifier = {
    toString: throwRegexMarker,
    valueOf: throwRegexMarker
  };
  if (typeof Symbol.toPrimitive === "symbol") {
    badStringifier[Symbol.toPrimitive] = throwRegexMarker;
  }
}
var $toString$1 = callBound$5("Object.prototype.toString");
var gOPD = Object.getOwnPropertyDescriptor;
var regexClass = "[object RegExp]";
var isRegex$1 = hasToStringTag$2 ? function isRegex(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  var descriptor = gOPD(value, "lastIndex");
  var hasLastIndexDataProperty = descriptor && has4(descriptor, "value");
  if (!hasLastIndexDataProperty) {
    return false;
  }
  try {
    $exec(value, badStringifier);
  } catch (e) {
    return e === isRegexMarker;
  }
} : function isRegex2(value) {
  if (!value || typeof value !== "object" && typeof value !== "function") {
    return false;
  }
  return $toString$1(value) === regexClass;
};
var callBound$4 = callBound$c;
var $byteLength$1 = callBound$4("SharedArrayBuffer.prototype.byteLength", true);
var isSharedArrayBuffer$1 = $byteLength$1 ? function isSharedArrayBuffer(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  try {
    $byteLength$1(obj);
    return true;
  } catch (e) {
    return false;
  }
} : function isSharedArrayBuffer2(obj) {
  return false;
};
var numToStr = Number.prototype.toString;
var tryNumberObject = function tryNumberObject2(value) {
  try {
    numToStr.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr$1 = Object.prototype.toString;
var numClass = "[object Number]";
var hasToStringTag$1 = shams();
var isNumberObject = function isNumberObject2(value) {
  if (typeof value === "number") {
    return true;
  }
  if (typeof value !== "object") {
    return false;
  }
  return hasToStringTag$1 ? tryNumberObject(value) : toStr$1.call(value) === numClass;
};
var callBound$3 = callBound$c;
var $boolToStr = callBound$3("Boolean.prototype.toString");
var $toString = callBound$3("Object.prototype.toString");
var tryBooleanObject = function booleanBrandCheck(value) {
  try {
    $boolToStr(value);
    return true;
  } catch (e) {
    return false;
  }
};
var boolClass = "[object Boolean]";
var hasToStringTag = shams();
var isBooleanObject = function isBoolean(value) {
  if (typeof value === "boolean") {
    return true;
  }
  if (value === null || typeof value !== "object") {
    return false;
  }
  return hasToStringTag && Symbol.toStringTag in value ? tryBooleanObject(value) : $toString(value) === boolClass;
};
var isSymbol$1 = { exports: {} };
var toStr = Object.prototype.toString;
var hasSymbols2 = hasSymbols$5();
if (hasSymbols2) {
  var symToStr = Symbol.prototype.toString;
  var symStringRegex = /^Symbol\(.*\)$/;
  var isSymbolObject = function isRealSymbolObject(value) {
    if (typeof value.valueOf() !== "symbol") {
      return false;
    }
    return symStringRegex.test(symToStr.call(value));
  };
  isSymbol$1.exports = function isSymbol2(value) {
    if (typeof value === "symbol") {
      return true;
    }
    if (toStr.call(value) !== "[object Symbol]") {
      return false;
    }
    try {
      return isSymbolObject(value);
    } catch (e) {
      return false;
    }
  };
} else {
  isSymbol$1.exports = function isSymbol2(value) {
    return false;
  };
}
var isSymbolExports = isSymbol$1.exports;
var isBigint = { exports: {} };
var $BigInt = typeof BigInt !== "undefined" && BigInt;
var hasBigints = function hasNativeBigInts() {
  return typeof $BigInt === "function" && typeof BigInt === "function" && typeof $BigInt(42) === "bigint" && typeof BigInt(42) === "bigint";
};
var hasBigInts = hasBigints();
if (hasBigInts) {
  var bigIntValueOf = BigInt.prototype.valueOf;
  var tryBigInt = function tryBigIntObject(value) {
    try {
      bigIntValueOf.call(value);
      return true;
    } catch (e) {
    }
    return false;
  };
  isBigint.exports = function isBigInt2(value) {
    if (value === null || typeof value === "undefined" || typeof value === "boolean" || typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "function") {
      return false;
    }
    if (typeof value === "bigint") {
      return true;
    }
    return tryBigInt(value);
  };
} else {
  isBigint.exports = function isBigInt2(value) {
    return false;
  };
}
var isBigintExports = isBigint.exports;
var isString2 = isString$2;
var isNumber = isNumberObject;
var isBoolean2 = isBooleanObject;
var isSymbol = isSymbolExports;
var isBigInt = isBigintExports;
var whichBoxedPrimitive$1 = function whichBoxedPrimitive(value) {
  if (value == null || typeof value !== "object" && typeof value !== "function") {
    return null;
  }
  if (isString2(value)) {
    return "String";
  }
  if (isNumber(value)) {
    return "Number";
  }
  if (isBoolean2(value)) {
    return "Boolean";
  }
  if (isSymbol(value)) {
    return "Symbol";
  }
  if (isBigInt(value)) {
    return "BigInt";
  }
};
var $WeakMap = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap : null;
var $WeakSet$1 = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet : null;
var exported;
if (!$WeakMap) {
  exported = function isWeakMap3(x) {
    return false;
  };
}
var $mapHas$2 = $WeakMap ? $WeakMap.prototype.has : null;
var $setHas$2 = $WeakSet$1 ? $WeakSet$1.prototype.has : null;
if (!exported && !$mapHas$2) {
  exported = function isWeakMap3(x) {
    return false;
  };
}
var isWeakmap = exported || function isWeakMap(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    $mapHas$2.call(x, $mapHas$2);
    if ($setHas$2) {
      try {
        $setHas$2.call(x, $setHas$2);
      } catch (e) {
        return true;
      }
    }
    return x instanceof $WeakMap;
  } catch (e) {
  }
  return false;
};
var isWeakset = { exports: {} };
var GetIntrinsic$1 = getIntrinsic;
var callBound$2 = callBound$c;
var $WeakSet = GetIntrinsic$1("%WeakSet%", true);
var $setHas$1 = callBound$2("WeakSet.prototype.has", true);
if ($setHas$1) {
  var $mapHas$1 = callBound$2("WeakMap.prototype.has", true);
  isWeakset.exports = function isWeakSet2(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    try {
      $setHas$1(x, $setHas$1);
      if ($mapHas$1) {
        try {
          $mapHas$1(x, $mapHas$1);
        } catch (e) {
          return true;
        }
      }
      return x instanceof $WeakSet;
    } catch (e) {
    }
    return false;
  };
} else {
  isWeakset.exports = function isWeakSet2(x) {
    return false;
  };
}
var isWeaksetExports = isWeakset.exports;
var isMap2 = isMap$2;
var isSet2 = isSet$2;
var isWeakMap2 = isWeakmap;
var isWeakSet = isWeaksetExports;
var whichCollection$1 = function whichCollection(value) {
  if (value && typeof value === "object") {
    if (isMap2(value)) {
      return "Map";
    }
    if (isSet2(value)) {
      return "Set";
    }
    if (isWeakMap2(value)) {
      return "WeakMap";
    }
    if (isWeakSet(value)) {
      return "WeakSet";
    }
  }
  return false;
};
var callBound$1 = callBound$c;
var $byteLength = callBound$1("ArrayBuffer.prototype.byteLength", true);
var isArrayBuffer$1 = isArrayBuffer$2;
var arrayBufferByteLength = function byteLength(ab) {
  if (!isArrayBuffer$1(ab)) {
    return NaN;
  }
  return $byteLength ? $byteLength(ab) : ab.byteLength;
};
var assign3 = object_assign;
var callBound = callBound$c;
var flags2 = regexp_prototype_flags;
var GetIntrinsic2 = getIntrinsic;
var getIterator = esGetIteratorExports;
var getSideChannel2 = sideChannel;
var is2 = objectIs;
var isArguments4 = isArguments$2;
var isArray = isarray;
var isArrayBuffer3 = isArrayBuffer$2;
var isDate = isDateObject;
var isRegex3 = isRegex$1;
var isSharedArrayBuffer3 = isSharedArrayBuffer$1;
var objectKeys = objectKeys$2;
var whichBoxedPrimitive2 = whichBoxedPrimitive$1;
var whichCollection2 = whichCollection$1;
var whichTypedArray2 = whichTypedArray$2;
var byteLength2 = arrayBufferByteLength;
var sabByteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
var $getTime = callBound("Date.prototype.getTime");
var gPO = Object.getPrototypeOf;
var $objToString = callBound("Object.prototype.toString");
var $Set = GetIntrinsic2("%Set%", true);
var $mapHas = callBound("Map.prototype.has", true);
var $mapGet = callBound("Map.prototype.get", true);
var $mapSize = callBound("Map.prototype.size", true);
var $setAdd = callBound("Set.prototype.add", true);
var $setDelete = callBound("Set.prototype.delete", true);
var $setHas = callBound("Set.prototype.has", true);
var $setSize = callBound("Set.prototype.size", true);
function setHasEqualElement(set, val1, opts, channel2) {
  var i = getIterator(set);
  var result;
  while ((result = i.next()) && !result.done) {
    if (internalDeepEqual(val1, result.value, opts, channel2)) {
      $setDelete(set, result.value);
      return true;
    }
  }
  return false;
}
function findLooseMatchingPrimitives(prim) {
  if (typeof prim === "undefined") {
    return null;
  }
  if (typeof prim === "object") {
    return void 0;
  }
  if (typeof prim === "symbol") {
    return false;
  }
  if (typeof prim === "string" || typeof prim === "number") {
    return +prim === +prim;
  }
  return true;
}
function mapMightHaveLoosePrim(a, b, prim, item, opts, channel2) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }
  var curB = $mapGet(b, altValue);
  var looseOpts = assign3({}, opts, { strict: false });
  if (typeof curB === "undefined" && !$mapHas(b, altValue) || !internalDeepEqual(item, curB, looseOpts, channel2)) {
    return false;
  }
  return !$mapHas(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel2);
}
function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }
  return $setHas(b, altValue) && !$setHas(a, altValue);
}
function mapHasEqualEntry(set, map, key1, item1, opts, channel2) {
  var i = getIterator(set);
  var result;
  var key2;
  while ((result = i.next()) && !result.done) {
    key2 = result.value;
    if (
      // eslint-disable-next-line no-use-before-define
      internalDeepEqual(key1, key2, opts, channel2) && internalDeepEqual(item1, $mapGet(map, key2), opts, channel2)
    ) {
      $setDelete(set, key2);
      return true;
    }
  }
  return false;
}
function internalDeepEqual(actual, expected, options, channel2) {
  var opts = options || {};
  if (opts.strict ? is2(actual, expected) : actual === expected) {
    return true;
  }
  var actualBoxed = whichBoxedPrimitive2(actual);
  var expectedBoxed = whichBoxedPrimitive2(expected);
  if (actualBoxed !== expectedBoxed) {
    return false;
  }
  if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") {
    return opts.strict ? is2(actual, expected) : actual == expected;
  }
  var hasActual = channel2.has(actual);
  var hasExpected = channel2.has(expected);
  var sentinel;
  if (hasActual && hasExpected) {
    if (channel2.get(actual) === channel2.get(expected)) {
      return true;
    }
  } else {
    sentinel = {};
  }
  if (!hasActual) {
    channel2.set(actual, sentinel);
  }
  if (!hasExpected) {
    channel2.set(expected, sentinel);
  }
  return objEquiv(actual, expected, opts, channel2);
}
function isBuffer(x) {
  if (!x || typeof x !== "object" || typeof x.length !== "number") {
    return false;
  }
  if (typeof x.copy !== "function" || typeof x.slice !== "function") {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== "number") {
    return false;
  }
  return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
}
function setEquiv(a, b, opts, channel2) {
  if ($setSize(a) !== $setSize(b)) {
    return false;
  }
  var iA = getIterator(a);
  var iB = getIterator(b);
  var resultA;
  var resultB;
  var set;
  while ((resultA = iA.next()) && !resultA.done) {
    if (resultA.value && typeof resultA.value === "object") {
      if (!set) {
        set = new $Set();
      }
      $setAdd(set, resultA.value);
    } else if (!$setHas(b, resultA.value)) {
      if (opts.strict) {
        return false;
      }
      if (!setMightHaveLoosePrim(a, b, resultA.value)) {
        return false;
      }
      if (!set) {
        set = new $Set();
      }
      $setAdd(set, resultA.value);
    }
  }
  if (set) {
    while ((resultB = iB.next()) && !resultB.done) {
      if (resultB.value && typeof resultB.value === "object") {
        if (!setHasEqualElement(set, resultB.value, opts.strict, channel2)) {
          return false;
        }
      } else if (!opts.strict && !$setHas(a, resultB.value) && !setHasEqualElement(set, resultB.value, opts.strict, channel2)) {
        return false;
      }
    }
    return $setSize(set) === 0;
  }
  return true;
}
function mapEquiv(a, b, opts, channel2) {
  if ($mapSize(a) !== $mapSize(b)) {
    return false;
  }
  var iA = getIterator(a);
  var iB = getIterator(b);
  var resultA;
  var resultB;
  var set;
  var key;
  var item1;
  var item2;
  while ((resultA = iA.next()) && !resultA.done) {
    key = resultA.value[0];
    item1 = resultA.value[1];
    if (key && typeof key === "object") {
      if (!set) {
        set = new $Set();
      }
      $setAdd(set, key);
    } else {
      item2 = $mapGet(b, key);
      if (typeof item2 === "undefined" && !$mapHas(b, key) || !internalDeepEqual(item1, item2, opts, channel2)) {
        if (opts.strict) {
          return false;
        }
        if (!mapMightHaveLoosePrim(a, b, key, item1, opts, channel2)) {
          return false;
        }
        if (!set) {
          set = new $Set();
        }
        $setAdd(set, key);
      }
    }
  }
  if (set) {
    while ((resultB = iB.next()) && !resultB.done) {
      key = resultB.value[0];
      item2 = resultB.value[1];
      if (key && typeof key === "object") {
        if (!mapHasEqualEntry(set, a, key, item2, opts, channel2)) {
          return false;
        }
      } else if (!opts.strict && (!a.has(key) || !internalDeepEqual($mapGet(a, key), item2, opts, channel2)) && !mapHasEqualEntry(set, a, key, item2, assign3({}, opts, { strict: false }), channel2)) {
        return false;
      }
    }
    return $setSize(set) === 0;
  }
  return true;
}
function objEquiv(a, b, opts, channel2) {
  var i, key;
  if (typeof a !== typeof b) {
    return false;
  }
  if (a == null || b == null) {
    return false;
  }
  if ($objToString(a) !== $objToString(b)) {
    return false;
  }
  if (isArguments4(a) !== isArguments4(b)) {
    return false;
  }
  var aIsArray = isArray(a);
  var bIsArray = isArray(b);
  if (aIsArray !== bIsArray) {
    return false;
  }
  var aIsError = a instanceof Error;
  var bIsError = b instanceof Error;
  if (aIsError !== bIsError) {
    return false;
  }
  if (aIsError || bIsError) {
    if (a.name !== b.name || a.message !== b.message) {
      return false;
    }
  }
  var aIsRegex = isRegex3(a);
  var bIsRegex = isRegex3(b);
  if (aIsRegex !== bIsRegex) {
    return false;
  }
  if ((aIsRegex || bIsRegex) && (a.source !== b.source || flags2(a) !== flags2(b))) {
    return false;
  }
  var aIsDate = isDate(a);
  var bIsDate = isDate(b);
  if (aIsDate !== bIsDate) {
    return false;
  }
  if (aIsDate || bIsDate) {
    if ($getTime(a) !== $getTime(b)) {
      return false;
    }
  }
  if (opts.strict && gPO && gPO(a) !== gPO(b)) {
    return false;
  }
  var aWhich = whichTypedArray2(a);
  var bWhich = whichTypedArray2(b);
  if (aWhich !== bWhich) {
    return false;
  }
  if (aWhich || bWhich) {
    if (a.length !== b.length) {
      return false;
    }
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  var aIsBuffer = isBuffer(a);
  var bIsBuffer = isBuffer(b);
  if (aIsBuffer !== bIsBuffer) {
    return false;
  }
  if (aIsBuffer || bIsBuffer) {
    if (a.length !== b.length) {
      return false;
    }
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  var aIsArrayBuffer = isArrayBuffer3(a);
  var bIsArrayBuffer = isArrayBuffer3(b);
  if (aIsArrayBuffer !== bIsArrayBuffer) {
    return false;
  }
  if (aIsArrayBuffer || bIsArrayBuffer) {
    if (byteLength2(a) !== byteLength2(b)) {
      return false;
    }
    return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel2);
  }
  var aIsSAB = isSharedArrayBuffer3(a);
  var bIsSAB = isSharedArrayBuffer3(b);
  if (aIsSAB !== bIsSAB) {
    return false;
  }
  if (aIsSAB || bIsSAB) {
    if (sabByteLength(a) !== sabByteLength(b)) {
      return false;
    }
    return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel2);
  }
  if (typeof a !== typeof b) {
    return false;
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  if (ka.length !== kb.length) {
    return false;
  }
  ka.sort();
  kb.sort();
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) {
      return false;
    }
  }
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!internalDeepEqual(a[key], b[key], opts, channel2)) {
      return false;
    }
  }
  var aCollection = whichCollection2(a);
  var bCollection = whichCollection2(b);
  if (aCollection !== bCollection) {
    return false;
  }
  if (aCollection === "Set" || bCollection === "Set") {
    return setEquiv(a, b, opts, channel2);
  }
  if (aCollection === "Map") {
    return mapEquiv(a, b, opts, channel2);
  }
  return true;
}
var deepEqual = function deepEqual2(a, b, opts) {
  return internalDeepEqual(a, b, opts, getSideChannel2());
};
Object.defineProperty(elementRoleMap$1, "__esModule", {
  value: true
});
elementRoleMap$1.default = void 0;
var _deepEqual = _interopRequireDefault$2(deepEqual);
var _iterationDecorator$1 = _interopRequireDefault$2(iterationDecorator$1);
var _rolesMap$2 = _interopRequireDefault$2(rolesMap$1);
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$1(arr, i) {
  var _i2 = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i2 == null)
    return;
  var _arr = [];
  var _n2 = true;
  var _d2 = false;
  var _s, _e2;
  try {
    for (_i2 = _i2.call(arr); !(_n2 = (_s = _i2.next()).done); _n2 = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d2 = true;
    _e2 = err;
  } finally {
    try {
      if (!_n2 && _i2["return"] != null)
        _i2["return"]();
    } finally {
      if (_d2)
        throw _e2;
    }
  }
  return _arr;
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _createForOfIteratorHelper$1(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e3) {
    didErr = true;
    err = _e3;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null)
        it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var elementRoles$1 = [];
var keys$1 = _rolesMap$2.default.keys();
for (var i$1 = 0; i$1 < keys$1.length; i$1++) {
  var key = keys$1[i$1];
  var role = _rolesMap$2.default.get(key);
  if (role) {
    var concepts = [].concat(role.baseConcepts, role.relatedConcepts);
    for (var k = 0; k < concepts.length; k++) {
      var relation = concepts[k];
      if (relation.module === "HTML") {
        var concept = relation.concept;
        if (concept) {
          (function() {
            var conceptStr = JSON.stringify(concept);
            var elementRoleRelation = elementRoles$1.find(function(relation2) {
              return JSON.stringify(relation2[0]) === conceptStr;
            });
            var roles2 = void 0;
            if (elementRoleRelation) {
              roles2 = elementRoleRelation[1];
            } else {
              roles2 = [];
            }
            var isUnique = true;
            for (var _i2 = 0; _i2 < roles2.length; _i2++) {
              if (roles2[_i2] === key) {
                isUnique = false;
                break;
              }
            }
            if (isUnique) {
              roles2.push(key);
            }
            elementRoles$1.push([concept, roles2]);
          })();
        }
      }
    }
  }
}
var elementRoleMap = {
  entries: function entries4() {
    return elementRoles$1;
  },
  forEach: function forEach6(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var _iterator = _createForOfIteratorHelper$1(elementRoles$1), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _step$value = _slicedToArray$1(_step.value, 2), _key = _step$value[0], values6 = _step$value[1];
        fn.call(thisArg, values6, _key, elementRoles$1);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  get: function get4(key) {
    var item = elementRoles$1.find(function(tuple) {
      return (0, _deepEqual.default)(key, tuple[0]);
    });
    return item && item[1];
  },
  has: function has5(key) {
    return !!elementRoleMap.get(key);
  },
  keys: function keys5() {
    return elementRoles$1.map(function(_ref) {
      var _ref2 = _slicedToArray$1(_ref, 1), key = _ref2[0];
      return key;
    });
  },
  values: function values4() {
    return elementRoles$1.map(function(_ref3) {
      var _ref4 = _slicedToArray$1(_ref3, 2), values6 = _ref4[1];
      return values6;
    });
  }
};
var _default$1 = (0, _iterationDecorator$1.default)(elementRoleMap, elementRoleMap.entries());
elementRoleMap$1.default = _default$1;
var roleElementMap$1 = {};
Object.defineProperty(roleElementMap$1, "__esModule", {
  value: true
});
roleElementMap$1.default = void 0;
var _iterationDecorator = _interopRequireDefault$1(iterationDecorator$1);
var _rolesMap$1 = _interopRequireDefault$1(rolesMap$1);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit(arr, i) {
  var _i2 = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i2 == null)
    return;
  var _arr = [];
  var _n2 = true;
  var _d2 = false;
  var _s, _e2;
  try {
    for (_i2 = _i2.call(arr); !(_n2 = (_s = _i2.next()).done); _n2 = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d2 = true;
    _e2 = err;
  } finally {
    try {
      if (!_n2 && _i2["return"] != null)
        _i2["return"]();
    } finally {
      if (_d2)
        throw _e2;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e3) {
    didErr = true;
    err = _e3;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null)
        it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
var roleElement = [];
var keys6 = _rolesMap$1.default.keys();
var _loop = function _loop2(i) {
  var key = keys6[i];
  var role = _rolesMap$1.default.get(key);
  if (role) {
    var concepts = [].concat(role.baseConcepts, role.relatedConcepts);
    for (var k = 0; k < concepts.length; k++) {
      var relation = concepts[k];
      if (relation.module === "HTML") {
        var concept = relation.concept;
        if (concept) {
          var roleElementRelation = roleElement.find(function(item) {
            return item[0] === key;
          });
          var relationConcepts = void 0;
          if (roleElementRelation) {
            relationConcepts = roleElementRelation[1];
          } else {
            relationConcepts = [];
          }
          relationConcepts.push(concept);
          roleElement.push([key, relationConcepts]);
        }
      }
    }
  }
};
for (var i = 0; i < keys6.length; i++) {
  _loop(i);
}
var roleElementMap = {
  entries: function entries5() {
    return roleElement;
  },
  forEach: function forEach7(fn) {
    var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var _iterator = _createForOfIteratorHelper(roleElement), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], values6 = _step$value[1];
        fn.call(thisArg, values6, key, roleElement);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  get: function get5(key) {
    var item = roleElement.find(function(tuple) {
      return tuple[0] === key ? true : false;
    });
    return item && item[1];
  },
  has: function has6(key) {
    return !!roleElementMap.get(key);
  },
  keys: function keys7() {
    return roleElement.map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
      return key;
    });
  },
  values: function values5() {
    return roleElement.map(function(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2), values6 = _ref4[1];
      return values6;
    });
  }
};
var _default = (0, _iterationDecorator.default)(roleElementMap, roleElementMap.entries());
roleElementMap$1.default = _default;
Object.defineProperty(lib, "__esModule", {
  value: true
});
var roles_1 = lib.roles = roleElements_1 = lib.roleElements = elementRoles_1 = lib.elementRoles = lib.dom = lib.aria = void 0;
var _ariaPropsMap = _interopRequireDefault(ariaPropsMap$1);
var _domMap = _interopRequireDefault(domMap$1);
var _rolesMap = _interopRequireDefault(rolesMap$1);
var _elementRoleMap = _interopRequireDefault(elementRoleMap$1);
var _roleElementMap = _interopRequireDefault(roleElementMap$1);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var aria = _ariaPropsMap.default;
lib.aria = aria;
var dom = _domMap.default;
lib.dom = dom;
var roles = _rolesMap.default;
roles_1 = lib.roles = roles;
var elementRoles = _elementRoleMap.default;
var elementRoles_1 = lib.elementRoles = elementRoles;
var roleElements = _roleElementMap.default;
var roleElements_1 = lib.roleElements = roleElements;
var lzString$1 = { exports: {} };
lzString$1.exports;
(function(module2) {
  var LZString = function() {
    var f = String.fromCharCode;
    var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    var baseReverseDic = {};
    function getBaseValue(alphabet, character) {
      if (!baseReverseDic[alphabet]) {
        baseReverseDic[alphabet] = {};
        for (var i = 0; i < alphabet.length; i++) {
          baseReverseDic[alphabet][alphabet.charAt(i)] = i;
        }
      }
      return baseReverseDic[alphabet][character];
    }
    var LZString2 = {
      compressToBase64: function(input2) {
        if (input2 == null)
          return "";
        var res = LZString2._compress(input2, 6, function(a) {
          return keyStrBase64.charAt(a);
        });
        switch (res.length % 4) {
          default:
          case 0:
            return res;
          case 1:
            return res + "===";
          case 2:
            return res + "==";
          case 3:
            return res + "=";
        }
      },
      decompressFromBase64: function(input2) {
        if (input2 == null)
          return "";
        if (input2 == "")
          return null;
        return LZString2._decompress(input2.length, 32, function(index2) {
          return getBaseValue(keyStrBase64, input2.charAt(index2));
        });
      },
      compressToUTF16: function(input2) {
        if (input2 == null)
          return "";
        return LZString2._compress(input2, 15, function(a) {
          return f(a + 32);
        }) + " ";
      },
      decompressFromUTF16: function(compressed) {
        if (compressed == null)
          return "";
        if (compressed == "")
          return null;
        return LZString2._decompress(compressed.length, 16384, function(index2) {
          return compressed.charCodeAt(index2) - 32;
        });
      },
      //compress into uint8array (UCS-2 big endian format)
      compressToUint8Array: function(uncompressed) {
        var compressed = LZString2.compress(uncompressed);
        var buf = new Uint8Array(compressed.length * 2);
        for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
          var current_value = compressed.charCodeAt(i);
          buf[i * 2] = current_value >>> 8;
          buf[i * 2 + 1] = current_value % 256;
        }
        return buf;
      },
      //decompress from uint8array (UCS-2 big endian format)
      decompressFromUint8Array: function(compressed) {
        if (compressed === null || compressed === void 0) {
          return LZString2.decompress(compressed);
        } else {
          var buf = new Array(compressed.length / 2);
          for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
            buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
          }
          var result = [];
          buf.forEach(function(c) {
            result.push(f(c));
          });
          return LZString2.decompress(result.join(""));
        }
      },
      //compress into a string that is already URI encoded
      compressToEncodedURIComponent: function(input2) {
        if (input2 == null)
          return "";
        return LZString2._compress(input2, 6, function(a) {
          return keyStrUriSafe.charAt(a);
        });
      },
      //decompress from an output of compressToEncodedURIComponent
      decompressFromEncodedURIComponent: function(input2) {
        if (input2 == null)
          return "";
        if (input2 == "")
          return null;
        input2 = input2.replace(/ /g, "+");
        return LZString2._decompress(input2.length, 32, function(index2) {
          return getBaseValue(keyStrUriSafe, input2.charAt(index2));
        });
      },
      compress: function(uncompressed) {
        return LZString2._compress(uncompressed, 16, function(a) {
          return f(a);
        });
      },
      _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
        if (uncompressed == null)
          return "";
        var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
        for (ii = 0; ii < uncompressed.length; ii += 1) {
          context_c = uncompressed.charAt(ii);
          if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
            context_dictionary[context_c] = context_dictSize++;
            context_dictionaryToCreate[context_c] = true;
          }
          context_wc = context_w + context_c;
          if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
            context_w = context_wc;
          } else {
            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
              if (context_w.charCodeAt(0) < 256) {
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 8; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              } else {
                value = 1;
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = 0;
                }
                value = context_w.charCodeAt(0);
                for (i = 0; i < 16; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
              delete context_dictionaryToCreate[context_w];
            } else {
              value = context_dictionary[context_w];
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
            context_dictionary[context_wc] = context_dictSize++;
            context_w = String(context_c);
          }
        }
        if (context_w !== "") {
          if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 8; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            } else {
              value = 1;
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1 | value;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = 0;
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 16; i++) {
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = Math.pow(2, context_numBits);
              context_numBits++;
            }
            delete context_dictionaryToCreate[context_w];
          } else {
            value = context_dictionary[context_w];
            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | value & 1;
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
        }
        value = 2;
        for (i = 0; i < context_numBits; i++) {
          context_data_val = context_data_val << 1 | value & 1;
          if (context_data_position == bitsPerChar - 1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }
        while (true) {
          context_data_val = context_data_val << 1;
          if (context_data_position == bitsPerChar - 1) {
            context_data.push(getCharFromInt(context_data_val));
            break;
          } else
            context_data_position++;
        }
        return context_data.join("");
      },
      decompress: function(compressed) {
        if (compressed == null)
          return "";
        if (compressed == "")
          return null;
        return LZString2._decompress(compressed.length, 32768, function(index2) {
          return compressed.charCodeAt(index2);
        });
      },
      _decompress: function(length, resetValue, getNextValue) {
        var dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
        for (i = 0; i < 3; i += 1) {
          dictionary[i] = i;
        }
        bits = 0;
        maxpower = Math.pow(2, 2);
        power = 1;
        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position == 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }
        switch (bits) {
          case 0:
            bits = 0;
            maxpower = Math.pow(2, 8);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            c = f(bits);
            break;
          case 1:
            bits = 0;
            maxpower = Math.pow(2, 16);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            c = f(bits);
            break;
          case 2:
            return "";
        }
        dictionary[3] = c;
        w = c;
        result.push(c);
        while (true) {
          if (data.index > length) {
            return "";
          }
          bits = 0;
          maxpower = Math.pow(2, numBits);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          switch (c = bits) {
            case 0:
              bits = 0;
              maxpower = Math.pow(2, 8);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              dictionary[dictSize++] = f(bits);
              c = dictSize - 1;
              enlargeIn--;
              break;
            case 1:
              bits = 0;
              maxpower = Math.pow(2, 16);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              dictionary[dictSize++] = f(bits);
              c = dictSize - 1;
              enlargeIn--;
              break;
            case 2:
              return result.join("");
          }
          if (enlargeIn == 0) {
            enlargeIn = Math.pow(2, numBits);
            numBits++;
          }
          if (dictionary[c]) {
            entry = dictionary[c];
          } else {
            if (c === dictSize) {
              entry = w + w.charAt(0);
            } else {
              return null;
            }
          }
          result.push(entry);
          dictionary[dictSize++] = w + entry.charAt(0);
          enlargeIn--;
          w = entry;
          if (enlargeIn == 0) {
            enlargeIn = Math.pow(2, numBits);
            numBits++;
          }
        }
      }
    };
    return LZString2;
  }();
  if (module2 != null) {
    module2.exports = LZString;
  } else if (typeof angular !== "undefined" && angular != null) {
    angular.module("LZString", []).factory("LZString", function() {
      return LZString;
    });
  }
})(lzString$1);
var lzStringExports = lzString$1.exports;
const lzString = /* @__PURE__ */ getDefaultExportFromCjs(lzStringExports);
var define_process_env_default = {};
function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const printProps = (keys8, props, config2, indentation, depth, refs, printer2) => {
  const indentationNext = indentation + config2.indent;
  const colors = config2.colors;
  return keys8.map((key) => {
    const value = props[key];
    let printed = printer2(value, config2, indentationNext, depth, refs);
    if (typeof value !== "string") {
      if (printed.indexOf("\n") !== -1) {
        printed = config2.spacingOuter + indentationNext + printed + config2.spacingOuter + indentation;
      }
      printed = "{" + printed + "}";
    }
    return config2.spacingInner + indentation + colors.prop.open + key + colors.prop.close + "=" + colors.value.open + printed + colors.value.close;
  }).join("");
};
const NodeTypeTextNode = 3;
const printChildren = (children, config2, indentation, depth, refs, printer2) => children.map((child) => {
  const printedChild = typeof child === "string" ? printText(child, config2) : printer2(child, config2, indentation, depth, refs);
  if (printedChild === "" && typeof child === "object" && child !== null && child.nodeType !== NodeTypeTextNode) {
    return "";
  }
  return config2.spacingOuter + indentation + printedChild;
}).join("");
const printText = (text, config2) => {
  const contentColor = config2.colors.content;
  return contentColor.open + escapeHTML(text) + contentColor.close;
};
const printComment = (comment, config2) => {
  const commentColor = config2.colors.comment;
  return commentColor.open + "<!--" + escapeHTML(comment) + "-->" + commentColor.close;
};
const printElement = (type2, printedProps, printedChildren, config2, indentation) => {
  const tagColor = config2.colors.tag;
  return tagColor.open + "<" + type2 + (printedProps && tagColor.close + printedProps + config2.spacingOuter + indentation + tagColor.open) + (printedChildren ? ">" + tagColor.close + printedChildren + config2.spacingOuter + indentation + tagColor.open + "</" + type2 : (printedProps && !config2.min ? "" : " ") + "/") + ">" + tagColor.close;
};
const printElementAsLeaf = (type2, config2) => {
  const tagColor = config2.colors.tag;
  return tagColor.open + "<" + type2 + tagColor.close + " …" + tagColor.open + " />" + tagColor.close;
};
const ELEMENT_NODE$1 = 1;
const TEXT_NODE$1 = 3;
const COMMENT_NODE$1 = 8;
const FRAGMENT_NODE = 11;
const ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;
const testNode = (val) => {
  const constructorName = val.constructor.name;
  const {
    nodeType,
    tagName
  } = val;
  const isCustomElement = typeof tagName === "string" && tagName.includes("-") || typeof val.hasAttribute === "function" && val.hasAttribute("is");
  return nodeType === ELEMENT_NODE$1 && (ELEMENT_REGEXP.test(constructorName) || isCustomElement) || nodeType === TEXT_NODE$1 && constructorName === "Text" || nodeType === COMMENT_NODE$1 && constructorName === "Comment" || nodeType === FRAGMENT_NODE && constructorName === "DocumentFragment";
};
function nodeIsText(node) {
  return node.nodeType === TEXT_NODE$1;
}
function nodeIsComment(node) {
  return node.nodeType === COMMENT_NODE$1;
}
function nodeIsFragment(node) {
  return node.nodeType === FRAGMENT_NODE;
}
function createDOMElementFilter(filterNode) {
  return {
    test: (val) => {
      var _val$constructor2;
      return (val == null || (_val$constructor2 = val.constructor) == null ? void 0 : _val$constructor2.name) && testNode(val);
    },
    serialize: (node, config2, indentation, depth, refs, printer2) => {
      if (nodeIsText(node)) {
        return printText(node.data, config2);
      }
      if (nodeIsComment(node)) {
        return printComment(node.data, config2);
      }
      const type2 = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();
      if (++depth > config2.maxDepth) {
        return printElementAsLeaf(type2, config2);
      }
      return printElement(type2, printProps(nodeIsFragment(node) ? [] : Array.from(node.attributes).map((attr) => attr.name).sort(), nodeIsFragment(node) ? {} : Array.from(node.attributes).reduce((props, attribute) => {
        props[attribute.name] = attribute.value;
        return props;
      }, {}), config2, indentation + config2.indent, depth, refs, printer2), printChildren(Array.prototype.slice.call(node.childNodes || node.children).filter(filterNode), config2, indentation + config2.indent, depth, refs, printer2), config2, indentation);
    }
  };
}
let chalk = null;
let readFileSync = null;
let codeFrameColumns = null;
try {
  const nodeRequire = module && module.require;
  readFileSync = nodeRequire.call(module, "fs").readFileSync;
  codeFrameColumns = nodeRequire.call(module, "@babel/code-frame").codeFrameColumns;
  chalk = nodeRequire.call(module, "chalk");
} catch {
}
function getCodeFrame(frame) {
  const locationStart = frame.indexOf("(") + 1;
  const locationEnd = frame.indexOf(")");
  const frameLocation = frame.slice(locationStart, locationEnd);
  const frameLocationElements = frameLocation.split(":");
  const [filename, line, column] = [frameLocationElements[0], parseInt(frameLocationElements[1], 10), parseInt(frameLocationElements[2], 10)];
  let rawFileContents = "";
  try {
    rawFileContents = readFileSync(filename, "utf-8");
  } catch {
    return "";
  }
  const codeFrame = codeFrameColumns(rawFileContents, {
    start: {
      line,
      column
    }
  }, {
    highlightCode: true,
    linesBelow: 0
  });
  return chalk.dim(frameLocation) + "\n" + codeFrame + "\n";
}
function getUserCodeFrame() {
  if (!readFileSync || !codeFrameColumns) {
    return "";
  }
  const err = new Error();
  const firstClientCodeFrame = err.stack.split("\n").slice(1).find((frame) => !frame.includes("node_modules/"));
  return getCodeFrame(firstClientCodeFrame);
}
const TEXT_NODE = 3;
function jestFakeTimersAreEnabled() {
  if (typeof jest !== "undefined" && jest !== null) {
    return (
      // legacy timers
      setTimeout._isMockFunction === true || // modern timers
      // eslint-disable-next-line prefer-object-has-own -- not supported by our support matrix
      Object.prototype.hasOwnProperty.call(setTimeout, "clock")
    );
  }
  return false;
}
function getDocument$1() {
  if (typeof window === "undefined") {
    throw new Error("Could not find default container");
  }
  return window.document;
}
function getWindowFromNode(node) {
  if (node.defaultView) {
    return node.defaultView;
  } else if (node.ownerDocument && node.ownerDocument.defaultView) {
    return node.ownerDocument.defaultView;
  } else if (node.window) {
    return node.window;
  } else if (node.ownerDocument && node.ownerDocument.defaultView === null) {
    throw new Error("It looks like the window object is not available for the provided node.");
  } else if (node.then instanceof Function) {
    throw new Error("It looks like you passed a Promise object instead of a DOM node. Did you do something like `fireEvent.click(screen.findBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`, or await the findBy query `fireEvent.click(await screen.findBy...`?");
  } else if (Array.isArray(node)) {
    throw new Error("It looks like you passed an Array instead of a DOM node. Did you do something like `fireEvent.click(screen.getAllBy...` when you meant to use a `getBy` query `fireEvent.click(screen.getBy...`?");
  } else if (typeof node.debug === "function" && typeof node.logTestingPlaygroundURL === "function") {
    throw new Error("It looks like you passed a `screen` object. Did you do something like `fireEvent.click(screen, ...` when you meant to use a query, e.g. `fireEvent.click(screen.getBy..., `?");
  } else {
    throw new Error("The given node is not an Element, the node type is: " + typeof node + ".");
  }
}
function checkContainerType(container) {
  if (!container || !(typeof container.querySelector === "function") || !(typeof container.querySelectorAll === "function")) {
    throw new TypeError("Expected container to be an Element, a Document or a DocumentFragment but got " + getTypeName(container) + ".");
  }
  function getTypeName(object) {
    if (typeof object === "object") {
      return object === null ? "null" : object.constructor.name;
    }
    return typeof object;
  }
}
const shouldHighlight = () => {
  let colors;
  try {
    var _process;
    colors = JSON.parse((_process = process) == null || (_process = _process.env) == null ? void 0 : _process.COLORS);
  } catch (e) {
  }
  if (typeof colors === "boolean") {
    return colors;
  } else {
    return typeof process !== "undefined" && process.versions !== void 0 && process.versions.node !== void 0;
  }
};
const {
  DOMCollection
} = plugins_1;
const ELEMENT_NODE = 1;
const COMMENT_NODE = 8;
function filterCommentsAndDefaultIgnoreTagsTags(value) {
  return value.nodeType !== COMMENT_NODE && (value.nodeType !== ELEMENT_NODE || !value.matches(getConfig$1().defaultIgnore));
}
function prettyDOM$1(dom2, maxLength, options) {
  if (options === void 0) {
    options = {};
  }
  if (!dom2) {
    dom2 = getDocument$1().body;
  }
  if (typeof maxLength !== "number") {
    maxLength = typeof process !== "undefined" && define_process_env_default.DEBUG_PRINT_LIMIT || 7e3;
  }
  if (maxLength === 0) {
    return "";
  }
  if (dom2.documentElement) {
    dom2 = dom2.documentElement;
  }
  let domTypeName = typeof dom2;
  if (domTypeName === "object") {
    domTypeName = dom2.constructor.name;
  } else {
    dom2 = {};
  }
  if (!("outerHTML" in dom2)) {
    throw new TypeError("Expected an element or document but got " + domTypeName);
  }
  const {
    filterNode = filterCommentsAndDefaultIgnoreTagsTags,
    ...prettyFormatOptions
  } = options;
  const debugContent = format_1(dom2, {
    plugins: [createDOMElementFilter(filterNode), DOMCollection],
    printFunctionName: false,
    highlight: shouldHighlight(),
    ...prettyFormatOptions
  });
  return maxLength !== void 0 && dom2.outerHTML.length > maxLength ? debugContent.slice(0, maxLength) + "..." : debugContent;
}
const logDOM$1 = function() {
  const userCodeFrame = getUserCodeFrame();
  if (userCodeFrame) {
    console.log(prettyDOM$1(...arguments) + "\n\n" + userCodeFrame);
  } else {
    console.log(prettyDOM$1(...arguments));
  }
};
let config = {
  testIdAttribute: "data-testid",
  asyncUtilTimeout: 1e3,
  // asyncWrapper and advanceTimersWrapper is to support React's async `act` function.
  // forcing react-testing-library to wrap all async functions would've been
  // a total nightmare (consider wrapping every findBy* query and then also
  // updating `within` so those would be wrapped too. Total nightmare).
  // so we have this config option that's really only intended for
  // react-testing-library to use. For that reason, this feature will remain
  // undocumented.
  asyncWrapper: (cb) => cb(),
  unstable_advanceTimersWrapper: (cb) => cb(),
  eventWrapper: (cb) => cb(),
  // default value for the `hidden` option in `ByRole` queries
  defaultHidden: false,
  // default value for the `ignore` option in `ByText` queries
  defaultIgnore: "script, style",
  // showOriginalStackTrace flag to show the full error stack traces for async errors
  showOriginalStackTrace: false,
  // throw errors w/ suggestions for better queries. Opt in so off by default.
  throwSuggestions: false,
  // called when getBy* queries fail. (message, container) => Error
  getElementError(message, container) {
    const prettifiedDOM = prettyDOM$1(container);
    const error = new Error([message, "Ignored nodes: comments, " + config.defaultIgnore + "\n" + prettifiedDOM].filter(Boolean).join("\n\n"));
    error.name = "TestingLibraryElementError";
    return error;
  },
  _disableExpensiveErrorDiagnostics: false,
  computedStyleSupportsPseudoElements: false
};
function runWithExpensiveErrorDiagnosticsDisabled(callback) {
  try {
    config._disableExpensiveErrorDiagnostics = true;
    return callback();
  } finally {
    config._disableExpensiveErrorDiagnostics = false;
  }
}
function configure$1(newConfig) {
  if (typeof newConfig === "function") {
    newConfig = newConfig(config);
  }
  config = {
    ...config,
    ...newConfig
  };
}
function getConfig$1() {
  return config;
}
const labelledNodeNames = ["button", "meter", "output", "progress", "select", "textarea", "input"];
function getTextContent(node) {
  if (labelledNodeNames.includes(node.nodeName.toLowerCase())) {
    return "";
  }
  if (node.nodeType === TEXT_NODE)
    return node.textContent;
  return Array.from(node.childNodes).map((childNode) => getTextContent(childNode)).join("");
}
function getLabelContent(element) {
  let textContent;
  if (element.tagName.toLowerCase() === "label") {
    textContent = getTextContent(element);
  } else {
    textContent = element.value || element.textContent;
  }
  return textContent;
}
function getRealLabels(element) {
  if (element.labels !== void 0) {
    var _labels;
    return (_labels = element.labels) != null ? _labels : [];
  }
  if (!isLabelable(element))
    return [];
  const labels = element.ownerDocument.querySelectorAll("label");
  return Array.from(labels).filter((label) => label.control === element);
}
function isLabelable(element) {
  return /BUTTON|METER|OUTPUT|PROGRESS|SELECT|TEXTAREA/.test(element.tagName) || element.tagName === "INPUT" && element.getAttribute("type") !== "hidden";
}
function getLabels(container, element, _temp) {
  let {
    selector = "*"
  } = _temp === void 0 ? {} : _temp;
  const ariaLabelledBy = element.getAttribute("aria-labelledby");
  const labelsId = ariaLabelledBy ? ariaLabelledBy.split(" ") : [];
  return labelsId.length ? labelsId.map((labelId) => {
    const labellingElement = container.querySelector('[id="' + labelId + '"]');
    return labellingElement ? {
      content: getLabelContent(labellingElement),
      formControl: null
    } : {
      content: "",
      formControl: null
    };
  }) : Array.from(getRealLabels(element)).map((label) => {
    const textToMatch = getLabelContent(label);
    const formControlSelector = "button, input, meter, output, progress, select, textarea";
    const labelledFormControl = Array.from(label.querySelectorAll(formControlSelector)).filter((formControlElement) => formControlElement.matches(selector))[0];
    return {
      content: textToMatch,
      formControl: labelledFormControl
    };
  });
}
function assertNotNullOrUndefined(matcher) {
  if (matcher === null || matcher === void 0) {
    throw new Error(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- implicitly converting `T` to `string`
      "It looks like " + matcher + " was passed instead of a matcher. Did you do something like getByText(" + matcher + ")?"
    );
  }
}
function fuzzyMatches(textToMatch, node, matcher, normalizer) {
  if (typeof textToMatch !== "string") {
    return false;
  }
  assertNotNullOrUndefined(matcher);
  const normalizedText = normalizer(textToMatch);
  if (typeof matcher === "string" || typeof matcher === "number") {
    return normalizedText.toLowerCase().includes(matcher.toString().toLowerCase());
  } else if (typeof matcher === "function") {
    return matcher(normalizedText, node);
  } else {
    return matchRegExp(matcher, normalizedText);
  }
}
function matches(textToMatch, node, matcher, normalizer) {
  if (typeof textToMatch !== "string") {
    return false;
  }
  assertNotNullOrUndefined(matcher);
  const normalizedText = normalizer(textToMatch);
  if (matcher instanceof Function) {
    return matcher(normalizedText, node);
  } else if (matcher instanceof RegExp) {
    return matchRegExp(matcher, normalizedText);
  } else {
    return normalizedText === String(matcher);
  }
}
function getDefaultNormalizer$1(_temp) {
  let {
    trim = true,
    collapseWhitespace = true
  } = _temp === void 0 ? {} : _temp;
  return (text) => {
    let normalizedText = text;
    normalizedText = trim ? normalizedText.trim() : normalizedText;
    normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, " ") : normalizedText;
    return normalizedText;
  };
}
function makeNormalizer(_ref) {
  let {
    trim,
    collapseWhitespace,
    normalizer
  } = _ref;
  if (!normalizer) {
    return getDefaultNormalizer$1({
      trim,
      collapseWhitespace
    });
  }
  if (typeof trim !== "undefined" || typeof collapseWhitespace !== "undefined") {
    throw new Error('trim and collapseWhitespace are not supported with a normalizer. If you want to use the default trim and collapseWhitespace logic in your normalizer, use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
  }
  return normalizer;
}
function matchRegExp(matcher, text) {
  const match = matcher.test(text);
  if (matcher.global && matcher.lastIndex !== 0) {
    console.warn("To match all elements we had to reset the lastIndex of the RegExp because the global flag is enabled. We encourage to remove the global flag from the RegExp.");
    matcher.lastIndex = 0;
  }
  return match;
}
function getNodeText$1(node) {
  if (node.matches("input[type=submit], input[type=button], input[type=reset]")) {
    return node.value;
  }
  return Array.from(node.childNodes).filter((child) => child.nodeType === TEXT_NODE && Boolean(child.textContent)).map((c) => c.textContent).join("");
}
const elementRoleList = buildElementRoleList(elementRoles_1);
function isSubtreeInaccessible(element) {
  if (element.hidden === true) {
    return true;
  }
  if (element.getAttribute("aria-hidden") === "true") {
    return true;
  }
  const window2 = element.ownerDocument.defaultView;
  if (window2.getComputedStyle(element).display === "none") {
    return true;
  }
  return false;
}
function isInaccessible$1(element, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    isSubtreeInaccessible: isSubtreeInaccessibleImpl = isSubtreeInaccessible
  } = options;
  const window2 = element.ownerDocument.defaultView;
  if (window2.getComputedStyle(element).visibility === "hidden") {
    return true;
  }
  let currentElement = element;
  while (currentElement) {
    if (isSubtreeInaccessibleImpl(currentElement)) {
      return true;
    }
    currentElement = currentElement.parentElement;
  }
  return false;
}
function getImplicitAriaRoles(currentNode) {
  for (const {
    match,
    roles: roles2
  } of elementRoleList) {
    if (match(currentNode)) {
      return [...roles2];
    }
  }
  return [];
}
function buildElementRoleList(elementRolesMap) {
  function makeElementSelector(_ref) {
    let {
      name,
      attributes
    } = _ref;
    return "" + name + attributes.map((_ref2) => {
      let {
        name: attributeName,
        value,
        constraints = []
      } = _ref2;
      const shouldNotExist = constraints.indexOf("undefined") !== -1;
      if (shouldNotExist) {
        return ":not([" + attributeName + "])";
      } else if (value) {
        return "[" + attributeName + '="' + value + '"]';
      } else {
        return "[" + attributeName + "]";
      }
    }).join("");
  }
  function getSelectorSpecificity(_ref3) {
    let {
      attributes = []
    } = _ref3;
    return attributes.length;
  }
  function bySelectorSpecificity(_ref4, _ref5) {
    let {
      specificity: leftSpecificity
    } = _ref4;
    let {
      specificity: rightSpecificity
    } = _ref5;
    return rightSpecificity - leftSpecificity;
  }
  function match(element) {
    let {
      attributes = []
    } = element;
    const typeTextIndex = attributes.findIndex((attribute) => attribute.value && attribute.name === "type" && attribute.value === "text");
    if (typeTextIndex >= 0) {
      attributes = [...attributes.slice(0, typeTextIndex), ...attributes.slice(typeTextIndex + 1)];
    }
    const selector = makeElementSelector({
      ...element,
      attributes
    });
    return (node) => {
      if (typeTextIndex >= 0 && node.type !== "text") {
        return false;
      }
      return node.matches(selector);
    };
  }
  let result = [];
  for (const [element, roles2] of elementRolesMap.entries()) {
    result = [...result, {
      match: match(element),
      roles: Array.from(roles2),
      specificity: getSelectorSpecificity(element)
    }];
  }
  return result.sort(bySelectorSpecificity);
}
function getRoles$1(container, _temp) {
  let {
    hidden = false
  } = _temp === void 0 ? {} : _temp;
  function flattenDOM(node) {
    return [node, ...Array.from(node.children).reduce((acc, child) => [...acc, ...flattenDOM(child)], [])];
  }
  return flattenDOM(container).filter((element) => {
    return hidden === false ? isInaccessible$1(element) === false : true;
  }).reduce((acc, node) => {
    let roles2 = [];
    if (node.hasAttribute("role")) {
      roles2 = node.getAttribute("role").split(" ").slice(0, 1);
    } else {
      roles2 = getImplicitAriaRoles(node);
    }
    return roles2.reduce((rolesAcc, role) => Array.isArray(rolesAcc[role]) ? {
      ...rolesAcc,
      [role]: [...rolesAcc[role], node]
    } : {
      ...rolesAcc,
      [role]: [node]
    }, acc);
  }, {});
}
function prettyRoles(dom2, _ref6) {
  let {
    hidden,
    includeDescription
  } = _ref6;
  const roles2 = getRoles$1(dom2, {
    hidden
  });
  return Object.entries(roles2).filter((_ref7) => {
    let [role] = _ref7;
    return role !== "generic";
  }).map((_ref8) => {
    let [role, elements] = _ref8;
    const delimiterBar = "-".repeat(50);
    const elementsString = elements.map((el) => {
      const nameString = 'Name "' + computeAccessibleName(el, {
        computedStyleSupportsPseudoElements: getConfig$1().computedStyleSupportsPseudoElements
      }) + '":\n';
      const domString = prettyDOM$1(el.cloneNode(false));
      if (includeDescription) {
        const descriptionString = 'Description "' + computeAccessibleDescription(el, {
          computedStyleSupportsPseudoElements: getConfig$1().computedStyleSupportsPseudoElements
        }) + '":\n';
        return "" + nameString + descriptionString + domString;
      }
      return "" + nameString + domString;
    }).join("\n\n");
    return role + ":\n\n" + elementsString + "\n\n" + delimiterBar;
  }).join("\n");
}
const logRoles$1 = function(dom2, _temp2) {
  let {
    hidden = false
  } = _temp2 === void 0 ? {} : _temp2;
  return console.log(prettyRoles(dom2, {
    hidden
  }));
};
function computeAriaSelected(element) {
  if (element.tagName === "OPTION") {
    return element.selected;
  }
  return checkBooleanAttribute(element, "aria-selected");
}
function computeAriaBusy(element) {
  return element.getAttribute("aria-busy") === "true";
}
function computeAriaChecked(element) {
  if ("indeterminate" in element && element.indeterminate) {
    return void 0;
  }
  if ("checked" in element) {
    return element.checked;
  }
  return checkBooleanAttribute(element, "aria-checked");
}
function computeAriaPressed(element) {
  return checkBooleanAttribute(element, "aria-pressed");
}
function computeAriaCurrent(element) {
  var _ref9, _checkBooleanAttribut;
  return (_ref9 = (_checkBooleanAttribut = checkBooleanAttribute(element, "aria-current")) != null ? _checkBooleanAttribut : element.getAttribute("aria-current")) != null ? _ref9 : false;
}
function computeAriaExpanded(element) {
  return checkBooleanAttribute(element, "aria-expanded");
}
function checkBooleanAttribute(element, attribute) {
  const attributeValue = element.getAttribute(attribute);
  if (attributeValue === "true") {
    return true;
  }
  if (attributeValue === "false") {
    return false;
  }
  return void 0;
}
function computeHeadingLevel(element) {
  const implicitHeadingLevels = {
    H1: 1,
    H2: 2,
    H3: 3,
    H4: 4,
    H5: 5,
    H6: 6
  };
  const ariaLevelAttribute = element.getAttribute("aria-level") && Number(element.getAttribute("aria-level"));
  return ariaLevelAttribute || implicitHeadingLevels[element.tagName];
}
function computeAriaValueNow(element) {
  const valueNow = element.getAttribute("aria-valuenow");
  return valueNow === null ? void 0 : +valueNow;
}
function computeAriaValueMax(element) {
  const valueMax = element.getAttribute("aria-valuemax");
  return valueMax === null ? void 0 : +valueMax;
}
function computeAriaValueMin(element) {
  const valueMin = element.getAttribute("aria-valuemin");
  return valueMin === null ? void 0 : +valueMin;
}
function computeAriaValueText(element) {
  const valueText = element.getAttribute("aria-valuetext");
  return valueText === null ? void 0 : valueText;
}
const normalize = getDefaultNormalizer$1();
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}
function getRegExpMatcher(string) {
  return new RegExp(escapeRegExp(string.toLowerCase()), "i");
}
function makeSuggestion(queryName, element, content, _ref) {
  let {
    variant,
    name
  } = _ref;
  let warning = "";
  const queryOptions = {};
  const queryArgs = [["Role", "TestId"].includes(queryName) ? content : getRegExpMatcher(content)];
  if (name) {
    queryOptions.name = getRegExpMatcher(name);
  }
  if (queryName === "Role" && isInaccessible$1(element)) {
    queryOptions.hidden = true;
    warning = "Element is inaccessible. This means that the element and all its children are invisible to screen readers.\n    If you are using the aria-hidden prop, make sure this is the right choice for your case.\n    ";
  }
  if (Object.keys(queryOptions).length > 0) {
    queryArgs.push(queryOptions);
  }
  const queryMethod = variant + "By" + queryName;
  return {
    queryName,
    queryMethod,
    queryArgs,
    variant,
    warning,
    toString() {
      if (warning) {
        console.warn(warning);
      }
      let [text, options] = queryArgs;
      text = typeof text === "string" ? "'" + text + "'" : text;
      options = options ? ", { " + Object.entries(options).map((_ref2) => {
        let [k, v] = _ref2;
        return k + ": " + v;
      }).join(", ") + " }" : "";
      return queryMethod + "(" + text + options + ")";
    }
  };
}
function canSuggest(currentMethod, requestedMethod, data) {
  return data && (!requestedMethod || requestedMethod.toLowerCase() === currentMethod.toLowerCase());
}
function getSuggestedQuery$1(element, variant, method) {
  var _element$getAttribute, _getImplicitAriaRoles;
  if (variant === void 0) {
    variant = "get";
  }
  if (element.matches(getConfig$1().defaultIgnore)) {
    return void 0;
  }
  const role = (_element$getAttribute = element.getAttribute("role")) != null ? _element$getAttribute : (_getImplicitAriaRoles = getImplicitAriaRoles(element)) == null ? void 0 : _getImplicitAriaRoles[0];
  if (role !== "generic" && canSuggest("Role", method, role)) {
    return makeSuggestion("Role", element, role, {
      variant,
      name: computeAccessibleName(element, {
        computedStyleSupportsPseudoElements: getConfig$1().computedStyleSupportsPseudoElements
      })
    });
  }
  const labelText = getLabels(document, element).map((label) => label.content).join(" ");
  if (canSuggest("LabelText", method, labelText)) {
    return makeSuggestion("LabelText", element, labelText, {
      variant
    });
  }
  const placeholderText = element.getAttribute("placeholder");
  if (canSuggest("PlaceholderText", method, placeholderText)) {
    return makeSuggestion("PlaceholderText", element, placeholderText, {
      variant
    });
  }
  const textContent = normalize(getNodeText$1(element));
  if (canSuggest("Text", method, textContent)) {
    return makeSuggestion("Text", element, textContent, {
      variant
    });
  }
  if (canSuggest("DisplayValue", method, element.value)) {
    return makeSuggestion("DisplayValue", element, normalize(element.value), {
      variant
    });
  }
  const alt = element.getAttribute("alt");
  if (canSuggest("AltText", method, alt)) {
    return makeSuggestion("AltText", element, alt, {
      variant
    });
  }
  const title = element.getAttribute("title");
  if (canSuggest("Title", method, title)) {
    return makeSuggestion("Title", element, title, {
      variant
    });
  }
  const testId = element.getAttribute(getConfig$1().testIdAttribute);
  if (canSuggest("TestId", method, testId)) {
    return makeSuggestion("TestId", element, testId, {
      variant
    });
  }
  return void 0;
}
function copyStackTrace(target, source) {
  target.stack = source.stack.replace(source.message, target.message);
}
function waitFor$1(callback, _ref) {
  let {
    container = getDocument$1(),
    timeout = getConfig$1().asyncUtilTimeout,
    showOriginalStackTrace = getConfig$1().showOriginalStackTrace,
    stackTraceError,
    interval = 50,
    onTimeout = (error) => {
      Object.defineProperty(error, "message", {
        value: getConfig$1().getElementError(error.message, container).message
      });
      return error;
    },
    mutationObserverOptions = {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true
    }
  } = _ref;
  if (typeof callback !== "function") {
    throw new TypeError("Received `callback` arg must be a function");
  }
  return new Promise(async (resolve, reject) => {
    let lastError, intervalId, observer;
    let finished = false;
    let promiseStatus = "idle";
    const overallTimeoutTimer = setTimeout(handleTimeout, timeout);
    const usingJestFakeTimers = jestFakeTimersAreEnabled();
    if (usingJestFakeTimers) {
      const {
        unstable_advanceTimersWrapper: advanceTimersWrapper
      } = getConfig$1();
      checkCallback();
      while (!finished) {
        if (!jestFakeTimersAreEnabled()) {
          const error = new Error("Changed from using fake timers to real timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to real timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
          if (!showOriginalStackTrace)
            copyStackTrace(error, stackTraceError);
          reject(error);
          return;
        }
        await advanceTimersWrapper(async () => {
          jest.advanceTimersByTime(interval);
        });
        if (finished) {
          break;
        }
        checkCallback();
      }
    } else {
      try {
        checkContainerType(container);
      } catch (e) {
        reject(e);
        return;
      }
      intervalId = setInterval(checkRealTimersCallback, interval);
      const {
        MutationObserver
      } = getWindowFromNode(container);
      observer = new MutationObserver(checkRealTimersCallback);
      observer.observe(container, mutationObserverOptions);
      checkCallback();
    }
    function onDone(error, result) {
      finished = true;
      clearTimeout(overallTimeoutTimer);
      if (!usingJestFakeTimers) {
        clearInterval(intervalId);
        observer.disconnect();
      }
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }
    function checkRealTimersCallback() {
      if (jestFakeTimersAreEnabled()) {
        const error = new Error("Changed from using real timers to fake timers while using waitFor. This is not allowed and will result in very strange behavior. Please ensure you're awaiting all async things your test is doing before changing to fake timers. For more info, please go to https://github.com/testing-library/dom-testing-library/issues/830");
        if (!showOriginalStackTrace)
          copyStackTrace(error, stackTraceError);
        return reject(error);
      } else {
        return checkCallback();
      }
    }
    function checkCallback() {
      if (promiseStatus === "pending")
        return;
      try {
        const result = runWithExpensiveErrorDiagnosticsDisabled(callback);
        if (typeof (result == null ? void 0 : result.then) === "function") {
          promiseStatus = "pending";
          result.then((resolvedValue) => {
            promiseStatus = "resolved";
            onDone(null, resolvedValue);
          }, (rejectedValue) => {
            promiseStatus = "rejected";
            lastError = rejectedValue;
          });
        } else {
          onDone(null, result);
        }
      } catch (error) {
        lastError = error;
      }
    }
    function handleTimeout() {
      let error;
      if (lastError) {
        error = lastError;
        if (!showOriginalStackTrace && error.name === "TestingLibraryElementError") {
          copyStackTrace(error, stackTraceError);
        }
      } else {
        error = new Error("Timed out in waitFor.");
        if (!showOriginalStackTrace) {
          copyStackTrace(error, stackTraceError);
        }
      }
      onDone(onTimeout(error), null);
    }
  });
}
function waitForWrapper(callback, options) {
  const stackTraceError = new Error("STACK_TRACE_MESSAGE");
  return getConfig$1().asyncWrapper(() => waitFor$1(callback, {
    stackTraceError,
    ...options
  }));
}
function getElementError$1(message, container) {
  return getConfig$1().getElementError(message, container);
}
function getMultipleElementsFoundError(message, container) {
  return getElementError$1(message + "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).", container);
}
function queryAllByAttribute$1(attribute, container, text, _temp) {
  let {
    exact = true,
    collapseWhitespace,
    trim,
    normalizer
  } = _temp === void 0 ? {} : _temp;
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  return Array.from(container.querySelectorAll("[" + attribute + "]")).filter((node) => matcher(node.getAttribute(attribute), node, text, matchNormalizer));
}
function queryByAttribute$1(attribute, container, text, options) {
  const els = queryAllByAttribute$1(attribute, container, text, options);
  if (els.length > 1) {
    throw getMultipleElementsFoundError("Found multiple elements by [" + attribute + "=" + text + "]", container);
  }
  return els[0] || null;
}
function makeSingleQuery(allQuery, getMultipleError2) {
  return function(container) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    const els = allQuery(container, ...args);
    if (els.length > 1) {
      const elementStrings = els.map((element) => getElementError$1(null, element).message).join("\n\n");
      throw getMultipleElementsFoundError(getMultipleError2(container, ...args) + "\n\nHere are the matching elements:\n\n" + elementStrings, container);
    }
    return els[0] || null;
  };
}
function getSuggestionError(suggestion, container) {
  return getConfig$1().getElementError("A better query is available, try this:\n" + suggestion.toString() + "\n", container);
}
function makeGetAllQuery(allQuery, getMissingError2) {
  return function(container) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    const els = allQuery(container, ...args);
    if (!els.length) {
      throw getConfig$1().getElementError(getMissingError2(container, ...args), container);
    }
    return els;
  };
}
function makeFindQuery(getter) {
  return (container, text, options, waitForOptions) => {
    return waitForWrapper(() => {
      return getter(container, text, options);
    }, {
      container,
      ...waitForOptions
    });
  };
}
const wrapSingleQueryWithSuggestion = (query, queryAllByName, variant) => function(container) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  const element = query(container, ...args);
  const [{
    suggest = getConfig$1().throwSuggestions
  } = {}] = args.slice(-1);
  if (element && suggest) {
    const suggestion = getSuggestedQuery$1(element, variant);
    if (suggestion && !queryAllByName.endsWith(suggestion.queryName)) {
      throw getSuggestionError(suggestion.toString(), container);
    }
  }
  return element;
};
const wrapAllByQueryWithSuggestion = (query, queryAllByName, variant) => function(container) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }
  const els = query(container, ...args);
  const [{
    suggest = getConfig$1().throwSuggestions
  } = {}] = args.slice(-1);
  if (els.length && suggest) {
    const uniqueSuggestionMessages = [...new Set(els.map((element) => {
      var _getSuggestedQuery;
      return (_getSuggestedQuery = getSuggestedQuery$1(element, variant)) == null ? void 0 : _getSuggestedQuery.toString();
    }))];
    if (
      // only want to suggest if all the els have the same suggestion.
      uniqueSuggestionMessages.length === 1 && !queryAllByName.endsWith(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- TODO: Can this be null at runtime?
        getSuggestedQuery$1(els[0], variant).queryName
      )
    ) {
      throw getSuggestionError(uniqueSuggestionMessages[0], container);
    }
  }
  return els;
};
function buildQueries$1(queryAllBy, getMultipleError2, getMissingError2) {
  const queryBy = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllBy, getMultipleError2), queryAllBy.name, "query");
  const getAllBy = makeGetAllQuery(queryAllBy, getMissingError2);
  const getBy = makeSingleQuery(getAllBy, getMultipleError2);
  const getByWithSuggestions = wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "get");
  const getAllWithSuggestions = wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name.replace("query", "get"), "getAll");
  const findAllBy = makeFindQuery(wrapAllByQueryWithSuggestion(getAllBy, queryAllBy.name, "findAll"));
  const findBy = makeFindQuery(wrapSingleQueryWithSuggestion(getBy, queryAllBy.name, "find"));
  return [queryBy, getAllWithSuggestions, getByWithSuggestions, findAllBy, findBy];
}
var queryHelpers$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getElementError: getElementError$1,
  wrapAllByQueryWithSuggestion,
  wrapSingleQueryWithSuggestion,
  getMultipleElementsFoundError,
  queryAllByAttribute: queryAllByAttribute$1,
  queryByAttribute: queryByAttribute$1,
  makeSingleQuery,
  makeGetAllQuery,
  makeFindQuery,
  buildQueries: buildQueries$1
});
function queryAllLabels(container) {
  return Array.from(container.querySelectorAll("label,input")).map((node) => {
    return {
      node,
      textToMatch: getLabelContent(node)
    };
  }).filter((_ref) => {
    let {
      textToMatch
    } = _ref;
    return textToMatch !== null;
  });
}
const queryAllLabelsByText = function(container, text, _temp) {
  let {
    exact = true,
    trim,
    collapseWhitespace,
    normalizer
  } = _temp === void 0 ? {} : _temp;
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  const textToMatchByLabels = queryAllLabels(container);
  return textToMatchByLabels.filter((_ref2) => {
    let {
      node,
      textToMatch
    } = _ref2;
    return matcher(textToMatch, node, text, matchNormalizer);
  }).map((_ref3) => {
    let {
      node
    } = _ref3;
    return node;
  });
};
const queryAllByLabelText$1 = function(container, text, _temp2) {
  let {
    selector = "*",
    exact = true,
    collapseWhitespace,
    trim,
    normalizer
  } = _temp2 === void 0 ? {} : _temp2;
  checkContainerType(container);
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  const matchingLabelledElements = Array.from(container.querySelectorAll("*")).filter((element) => {
    return getRealLabels(element).length || element.hasAttribute("aria-labelledby");
  }).reduce((labelledElements, labelledElement) => {
    const labelList = getLabels(container, labelledElement, {
      selector
    });
    labelList.filter((label) => Boolean(label.formControl)).forEach((label) => {
      if (matcher(label.content, label.formControl, text, matchNormalizer) && label.formControl) {
        labelledElements.push(label.formControl);
      }
    });
    const labelsValue = labelList.filter((label) => Boolean(label.content)).map((label) => label.content);
    if (matcher(labelsValue.join(" "), labelledElement, text, matchNormalizer)) {
      labelledElements.push(labelledElement);
    }
    if (labelsValue.length > 1) {
      labelsValue.forEach((labelValue, index2) => {
        if (matcher(labelValue, labelledElement, text, matchNormalizer)) {
          labelledElements.push(labelledElement);
        }
        const labelsFiltered = [...labelsValue];
        labelsFiltered.splice(index2, 1);
        if (labelsFiltered.length > 1) {
          if (matcher(labelsFiltered.join(" "), labelledElement, text, matchNormalizer)) {
            labelledElements.push(labelledElement);
          }
        }
      });
    }
    return labelledElements;
  }, []).concat(queryAllByAttribute$1("aria-label", container, text, {
    exact,
    normalizer: matchNormalizer
  }));
  return Array.from(new Set(matchingLabelledElements)).filter((element) => element.matches(selector));
};
const getAllByLabelText$1 = function(container, text) {
  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }
  const els = queryAllByLabelText$1(container, text, ...rest);
  if (!els.length) {
    const labels = queryAllLabelsByText(container, text, ...rest);
    if (labels.length) {
      const tagNames = labels.map((label) => getTagNameOfElementAssociatedWithLabelViaFor(container, label)).filter((tagName) => !!tagName);
      if (tagNames.length) {
        throw getConfig$1().getElementError(tagNames.map((tagName) => "Found a label with the text of: " + text + ", however the element associated with this label (<" + tagName + " />) is non-labellable [https://html.spec.whatwg.org/multipage/forms.html#category-label]. If you really need to label a <" + tagName + " />, you can use aria-label or aria-labelledby instead.").join("\n\n"), container);
      } else {
        throw getConfig$1().getElementError("Found a label with the text of: " + text + `, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`, container);
      }
    } else {
      throw getConfig$1().getElementError("Unable to find a label with the text of: " + text, container);
    }
  }
  return els;
};
function getTagNameOfElementAssociatedWithLabelViaFor(container, label) {
  const htmlFor = label.getAttribute("for");
  if (!htmlFor) {
    return null;
  }
  const element = container.querySelector('[id="' + htmlFor + '"]');
  return element ? element.tagName.toLowerCase() : null;
}
const getMultipleError$7 = (c, text) => "Found multiple elements with the text of: " + text;
const queryByLabelText$1 = wrapSingleQueryWithSuggestion(makeSingleQuery(queryAllByLabelText$1, getMultipleError$7), queryAllByLabelText$1.name, "query");
const getByLabelText$1 = makeSingleQuery(getAllByLabelText$1, getMultipleError$7);
const findAllByLabelText$1 = makeFindQuery(wrapAllByQueryWithSuggestion(getAllByLabelText$1, getAllByLabelText$1.name, "findAll"));
const findByLabelText$1 = makeFindQuery(wrapSingleQueryWithSuggestion(getByLabelText$1, getAllByLabelText$1.name, "find"));
const getAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(getAllByLabelText$1, getAllByLabelText$1.name, "getAll");
const getByLabelTextWithSuggestions = wrapSingleQueryWithSuggestion(getByLabelText$1, getAllByLabelText$1.name, "get");
const queryAllByLabelTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByLabelText$1, queryAllByLabelText$1.name, "queryAll");
const queryAllByPlaceholderText$1 = function() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  checkContainerType(args[0]);
  return queryAllByAttribute$1("placeholder", ...args);
};
const getMultipleError$6 = (c, text) => "Found multiple elements with the placeholder text of: " + text;
const getMissingError$6 = (c, text) => "Unable to find an element with the placeholder text of: " + text;
const queryAllByPlaceholderTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByPlaceholderText$1, queryAllByPlaceholderText$1.name, "queryAll");
const [queryByPlaceholderText$1, getAllByPlaceholderText$1, getByPlaceholderText$1, findAllByPlaceholderText$1, findByPlaceholderText$1] = buildQueries$1(queryAllByPlaceholderText$1, getMultipleError$6, getMissingError$6);
const queryAllByText$1 = function(container, text, _temp) {
  let {
    selector = "*",
    exact = true,
    collapseWhitespace,
    trim,
    ignore = getConfig$1().defaultIgnore,
    normalizer
  } = _temp === void 0 ? {} : _temp;
  checkContainerType(container);
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  let baseArray = [];
  if (typeof container.matches === "function" && container.matches(selector)) {
    baseArray = [container];
  }
  return [...baseArray, ...Array.from(container.querySelectorAll(selector))].filter((node) => !ignore || !node.matches(ignore)).filter((node) => matcher(getNodeText$1(node), node, text, matchNormalizer));
};
const getMultipleError$5 = (c, text) => "Found multiple elements with the text: " + text;
const getMissingError$5 = function(c, text, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    collapseWhitespace,
    trim,
    normalizer,
    selector
  } = options;
  const matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  const normalizedText = matchNormalizer(text.toString());
  const isNormalizedDifferent = normalizedText !== text.toString();
  const isCustomSelector = (selector != null ? selector : "*") !== "*";
  return "Unable to find an element with the text: " + (isNormalizedDifferent ? normalizedText + " (normalized from '" + text + "')" : text) + (isCustomSelector ? ", which matches selector '" + selector + "'" : "") + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
};
const queryAllByTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByText$1, queryAllByText$1.name, "queryAll");
const [queryByText$1, getAllByText$1, getByText$1, findAllByText$1, findByText$1] = buildQueries$1(queryAllByText$1, getMultipleError$5, getMissingError$5);
const queryAllByDisplayValue$1 = function(container, value, _temp) {
  let {
    exact = true,
    collapseWhitespace,
    trim,
    normalizer
  } = _temp === void 0 ? {} : _temp;
  checkContainerType(container);
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  return Array.from(container.querySelectorAll("input,textarea,select")).filter((node) => {
    if (node.tagName === "SELECT") {
      const selectedOptions = Array.from(node.options).filter((option) => option.selected);
      return selectedOptions.some((optionNode) => matcher(getNodeText$1(optionNode), optionNode, value, matchNormalizer));
    } else {
      return matcher(node.value, node, value, matchNormalizer);
    }
  });
};
const getMultipleError$4 = (c, value) => "Found multiple elements with the display value: " + value + ".";
const getMissingError$4 = (c, value) => "Unable to find an element with the display value: " + value + ".";
const queryAllByDisplayValueWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByDisplayValue$1, queryAllByDisplayValue$1.name, "queryAll");
const [queryByDisplayValue$1, getAllByDisplayValue$1, getByDisplayValue$1, findAllByDisplayValue$1, findByDisplayValue$1] = buildQueries$1(queryAllByDisplayValue$1, getMultipleError$4, getMissingError$4);
const VALID_TAG_REGEXP = /^(img|input|area|.+-.+)$/i;
const queryAllByAltText$1 = function(container, alt, options) {
  if (options === void 0) {
    options = {};
  }
  checkContainerType(container);
  return queryAllByAttribute$1("alt", container, alt, options).filter((node) => VALID_TAG_REGEXP.test(node.tagName));
};
const getMultipleError$3 = (c, alt) => "Found multiple elements with the alt text: " + alt;
const getMissingError$3 = (c, alt) => "Unable to find an element with the alt text: " + alt;
const queryAllByAltTextWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByAltText$1, queryAllByAltText$1.name, "queryAll");
const [queryByAltText$1, getAllByAltText$1, getByAltText$1, findAllByAltText$1, findByAltText$1] = buildQueries$1(queryAllByAltText$1, getMultipleError$3, getMissingError$3);
const isSvgTitle = (node) => {
  var _node$parentElement;
  return node.tagName.toLowerCase() === "title" && ((_node$parentElement = node.parentElement) == null ? void 0 : _node$parentElement.tagName.toLowerCase()) === "svg";
};
const queryAllByTitle$1 = function(container, text, _temp) {
  let {
    exact = true,
    collapseWhitespace,
    trim,
    normalizer
  } = _temp === void 0 ? {} : _temp;
  checkContainerType(container);
  const matcher = exact ? matches : fuzzyMatches;
  const matchNormalizer = makeNormalizer({
    collapseWhitespace,
    trim,
    normalizer
  });
  return Array.from(container.querySelectorAll("[title], svg > title")).filter((node) => matcher(node.getAttribute("title"), node, text, matchNormalizer) || isSvgTitle(node) && matcher(getNodeText$1(node), node, text, matchNormalizer));
};
const getMultipleError$2 = (c, title) => "Found multiple elements with the title: " + title + ".";
const getMissingError$2 = (c, title) => "Unable to find an element with the title: " + title + ".";
const queryAllByTitleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTitle$1, queryAllByTitle$1.name, "queryAll");
const [queryByTitle$1, getAllByTitle$1, getByTitle$1, findAllByTitle$1, findByTitle$1] = buildQueries$1(queryAllByTitle$1, getMultipleError$2, getMissingError$2);
const queryAllByRole$1 = function(container, role, _temp) {
  let {
    hidden = getConfig$1().defaultHidden,
    name,
    description,
    queryFallbacks = false,
    selected,
    busy,
    checked,
    pressed,
    current,
    level,
    expanded,
    value: {
      now: valueNow,
      min: valueMin,
      max: valueMax,
      text: valueText
    } = {}
  } = _temp === void 0 ? {} : _temp;
  checkContainerType(container);
  if (selected !== void 0) {
    var _allRoles$get;
    if (((_allRoles$get = roles_1.get(role)) == null ? void 0 : _allRoles$get.props["aria-selected"]) === void 0) {
      throw new Error('"aria-selected" is not supported on role "' + role + '".');
    }
  }
  if (busy !== void 0) {
    var _allRoles$get2;
    if (((_allRoles$get2 = roles_1.get(role)) == null ? void 0 : _allRoles$get2.props["aria-busy"]) === void 0) {
      throw new Error('"aria-busy" is not supported on role "' + role + '".');
    }
  }
  if (checked !== void 0) {
    var _allRoles$get3;
    if (((_allRoles$get3 = roles_1.get(role)) == null ? void 0 : _allRoles$get3.props["aria-checked"]) === void 0) {
      throw new Error('"aria-checked" is not supported on role "' + role + '".');
    }
  }
  if (pressed !== void 0) {
    var _allRoles$get4;
    if (((_allRoles$get4 = roles_1.get(role)) == null ? void 0 : _allRoles$get4.props["aria-pressed"]) === void 0) {
      throw new Error('"aria-pressed" is not supported on role "' + role + '".');
    }
  }
  if (current !== void 0) {
    var _allRoles$get5;
    if (((_allRoles$get5 = roles_1.get(role)) == null ? void 0 : _allRoles$get5.props["aria-current"]) === void 0) {
      throw new Error('"aria-current" is not supported on role "' + role + '".');
    }
  }
  if (level !== void 0) {
    if (role !== "heading") {
      throw new Error('Role "' + role + '" cannot have "level" property.');
    }
  }
  if (valueNow !== void 0) {
    var _allRoles$get6;
    if (((_allRoles$get6 = roles_1.get(role)) == null ? void 0 : _allRoles$get6.props["aria-valuenow"]) === void 0) {
      throw new Error('"aria-valuenow" is not supported on role "' + role + '".');
    }
  }
  if (valueMax !== void 0) {
    var _allRoles$get7;
    if (((_allRoles$get7 = roles_1.get(role)) == null ? void 0 : _allRoles$get7.props["aria-valuemax"]) === void 0) {
      throw new Error('"aria-valuemax" is not supported on role "' + role + '".');
    }
  }
  if (valueMin !== void 0) {
    var _allRoles$get8;
    if (((_allRoles$get8 = roles_1.get(role)) == null ? void 0 : _allRoles$get8.props["aria-valuemin"]) === void 0) {
      throw new Error('"aria-valuemin" is not supported on role "' + role + '".');
    }
  }
  if (valueText !== void 0) {
    var _allRoles$get9;
    if (((_allRoles$get9 = roles_1.get(role)) == null ? void 0 : _allRoles$get9.props["aria-valuetext"]) === void 0) {
      throw new Error('"aria-valuetext" is not supported on role "' + role + '".');
    }
  }
  if (expanded !== void 0) {
    var _allRoles$get10;
    if (((_allRoles$get10 = roles_1.get(role)) == null ? void 0 : _allRoles$get10.props["aria-expanded"]) === void 0) {
      throw new Error('"aria-expanded" is not supported on role "' + role + '".');
    }
  }
  const subtreeIsInaccessibleCache = /* @__PURE__ */ new WeakMap();
  function cachedIsSubtreeInaccessible(element) {
    if (!subtreeIsInaccessibleCache.has(element)) {
      subtreeIsInaccessibleCache.set(element, isSubtreeInaccessible(element));
    }
    return subtreeIsInaccessibleCache.get(element);
  }
  return Array.from(container.querySelectorAll(
    // Only query elements that can be matched by the following filters
    makeRoleSelector(role)
  )).filter((node) => {
    const isRoleSpecifiedExplicitly = node.hasAttribute("role");
    if (isRoleSpecifiedExplicitly) {
      const roleValue = node.getAttribute("role");
      if (queryFallbacks) {
        return roleValue.split(" ").filter(Boolean).some((roleAttributeToken) => roleAttributeToken === role);
      }
      const [firstRoleAttributeToken] = roleValue.split(" ");
      return firstRoleAttributeToken === role;
    }
    const implicitRoles = getImplicitAriaRoles(node);
    return implicitRoles.some((implicitRole) => {
      return implicitRole === role;
    });
  }).filter((element) => {
    if (selected !== void 0) {
      return selected === computeAriaSelected(element);
    }
    if (busy !== void 0) {
      return busy === computeAriaBusy(element);
    }
    if (checked !== void 0) {
      return checked === computeAriaChecked(element);
    }
    if (pressed !== void 0) {
      return pressed === computeAriaPressed(element);
    }
    if (current !== void 0) {
      return current === computeAriaCurrent(element);
    }
    if (expanded !== void 0) {
      return expanded === computeAriaExpanded(element);
    }
    if (level !== void 0) {
      return level === computeHeadingLevel(element);
    }
    if (valueNow !== void 0 || valueMax !== void 0 || valueMin !== void 0 || valueText !== void 0) {
      let valueMatches = true;
      if (valueNow !== void 0) {
        valueMatches && (valueMatches = valueNow === computeAriaValueNow(element));
      }
      if (valueMax !== void 0) {
        valueMatches && (valueMatches = valueMax === computeAriaValueMax(element));
      }
      if (valueMin !== void 0) {
        valueMatches && (valueMatches = valueMin === computeAriaValueMin(element));
      }
      if (valueText !== void 0) {
        var _computeAriaValueText;
        valueMatches && (valueMatches = matches((_computeAriaValueText = computeAriaValueText(element)) != null ? _computeAriaValueText : null, element, valueText, (text) => text));
      }
      return valueMatches;
    }
    return true;
  }).filter((element) => {
    if (name === void 0) {
      return true;
    }
    return matches(computeAccessibleName(element, {
      computedStyleSupportsPseudoElements: getConfig$1().computedStyleSupportsPseudoElements
    }), element, name, (text) => text);
  }).filter((element) => {
    if (description === void 0) {
      return true;
    }
    return matches(computeAccessibleDescription(element, {
      computedStyleSupportsPseudoElements: getConfig$1().computedStyleSupportsPseudoElements
    }), element, description, (text) => text);
  }).filter((element) => {
    return hidden === false ? isInaccessible$1(element, {
      isSubtreeInaccessible: cachedIsSubtreeInaccessible
    }) === false : true;
  });
};
function makeRoleSelector(role) {
  var _roleElements$get;
  const explicitRoleSelector = '*[role~="' + role + '"]';
  const roleRelations = (_roleElements$get = roleElements_1.get(role)) != null ? _roleElements$get : /* @__PURE__ */ new Set();
  const implicitRoleSelectors = new Set(Array.from(roleRelations).map((_ref) => {
    let {
      name
    } = _ref;
    return name;
  }));
  return [explicitRoleSelector].concat(Array.from(implicitRoleSelectors)).join(",");
}
const getNameHint = (name) => {
  let nameHint = "";
  if (name === void 0) {
    nameHint = "";
  } else if (typeof name === "string") {
    nameHint = ' and name "' + name + '"';
  } else {
    nameHint = " and name `" + name + "`";
  }
  return nameHint;
};
const getMultipleError$1 = function(c, role, _temp2) {
  let {
    name
  } = _temp2 === void 0 ? {} : _temp2;
  return 'Found multiple elements with the role "' + role + '"' + getNameHint(name);
};
const getMissingError$1 = function(container, role, _temp3) {
  let {
    hidden = getConfig$1().defaultHidden,
    name,
    description
  } = _temp3 === void 0 ? {} : _temp3;
  if (getConfig$1()._disableExpensiveErrorDiagnostics) {
    return 'Unable to find role="' + role + '"' + getNameHint(name);
  }
  let roles2 = "";
  Array.from(container.children).forEach((childElement) => {
    roles2 += prettyRoles(childElement, {
      hidden,
      includeDescription: description !== void 0
    });
  });
  let roleMessage;
  if (roles2.length === 0) {
    if (hidden === false) {
      roleMessage = "There are no accessible roles. But there might be some inaccessible roles. If you wish to access them, then set the `hidden` option to `true`. Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole";
    } else {
      roleMessage = "There are no available roles.";
    }
  } else {
    roleMessage = ("\nHere are the " + (hidden === false ? "accessible" : "available") + " roles:\n\n  " + roles2.replace(/\n/g, "\n  ").replace(/\n\s\s\n/g, "\n\n") + "\n").trim();
  }
  let nameHint = "";
  if (name === void 0) {
    nameHint = "";
  } else if (typeof name === "string") {
    nameHint = ' and name "' + name + '"';
  } else {
    nameHint = " and name `" + name + "`";
  }
  let descriptionHint = "";
  if (description === void 0) {
    descriptionHint = "";
  } else if (typeof description === "string") {
    descriptionHint = ' and description "' + description + '"';
  } else {
    descriptionHint = " and description `" + description + "`";
  }
  return ("\nUnable to find an " + (hidden === false ? "accessible " : "") + 'element with the role "' + role + '"' + nameHint + descriptionHint + "\n\n" + roleMessage).trim();
};
const queryAllByRoleWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByRole$1, queryAllByRole$1.name, "queryAll");
const [queryByRole$1, getAllByRole$1, getByRole$1, findAllByRole$1, findByRole$1] = buildQueries$1(queryAllByRole$1, getMultipleError$1, getMissingError$1);
const getTestIdAttribute = () => getConfig$1().testIdAttribute;
const queryAllByTestId$1 = function() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  checkContainerType(args[0]);
  return queryAllByAttribute$1(getTestIdAttribute(), ...args);
};
const getMultipleError = (c, id) => "Found multiple elements by: [" + getTestIdAttribute() + '="' + id + '"]';
const getMissingError = (c, id) => "Unable to find an element by: [" + getTestIdAttribute() + '="' + id + '"]';
const queryAllByTestIdWithSuggestions = wrapAllByQueryWithSuggestion(queryAllByTestId$1, queryAllByTestId$1.name, "queryAll");
const [queryByTestId$1, getAllByTestId$1, getByTestId$1, findAllByTestId$1, findByTestId$1] = buildQueries$1(queryAllByTestId$1, getMultipleError, getMissingError);
var queries$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  queryAllByLabelText: queryAllByLabelTextWithSuggestions,
  queryByLabelText: queryByLabelText$1,
  getAllByLabelText: getAllByLabelTextWithSuggestions,
  getByLabelText: getByLabelTextWithSuggestions,
  findAllByLabelText: findAllByLabelText$1,
  findByLabelText: findByLabelText$1,
  queryByPlaceholderText: queryByPlaceholderText$1,
  queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
  getByPlaceholderText: getByPlaceholderText$1,
  getAllByPlaceholderText: getAllByPlaceholderText$1,
  findAllByPlaceholderText: findAllByPlaceholderText$1,
  findByPlaceholderText: findByPlaceholderText$1,
  queryByText: queryByText$1,
  queryAllByText: queryAllByTextWithSuggestions,
  getByText: getByText$1,
  getAllByText: getAllByText$1,
  findAllByText: findAllByText$1,
  findByText: findByText$1,
  queryByDisplayValue: queryByDisplayValue$1,
  queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
  getByDisplayValue: getByDisplayValue$1,
  getAllByDisplayValue: getAllByDisplayValue$1,
  findAllByDisplayValue: findAllByDisplayValue$1,
  findByDisplayValue: findByDisplayValue$1,
  queryByAltText: queryByAltText$1,
  queryAllByAltText: queryAllByAltTextWithSuggestions,
  getByAltText: getByAltText$1,
  getAllByAltText: getAllByAltText$1,
  findAllByAltText: findAllByAltText$1,
  findByAltText: findByAltText$1,
  queryByTitle: queryByTitle$1,
  queryAllByTitle: queryAllByTitleWithSuggestions,
  getByTitle: getByTitle$1,
  getAllByTitle: getAllByTitle$1,
  findAllByTitle: findAllByTitle$1,
  findByTitle: findByTitle$1,
  queryByRole: queryByRole$1,
  queryAllByRole: queryAllByRoleWithSuggestions,
  getAllByRole: getAllByRole$1,
  getByRole: getByRole$1,
  findAllByRole: findAllByRole$1,
  findByRole: findByRole$1,
  queryByTestId: queryByTestId$1,
  queryAllByTestId: queryAllByTestIdWithSuggestions,
  getByTestId: getByTestId$1,
  getAllByTestId: getAllByTestId$1,
  findAllByTestId: findAllByTestId$1,
  findByTestId: findByTestId$1
});
function getQueriesForElement$1(element, queries$1$1, initialValue2) {
  if (queries$1$1 === void 0) {
    queries$1$1 = queries$1;
  }
  if (initialValue2 === void 0) {
    initialValue2 = {};
  }
  return Object.keys(queries$1$1).reduce((helpers, key) => {
    const fn = queries$1$1[key];
    helpers[key] = fn.bind(null, element);
    return helpers;
  }, initialValue2);
}
const isRemoved = (result) => !result || Array.isArray(result) && !result.length;
function initialCheck(elements) {
  if (isRemoved(elements)) {
    throw new Error("The element(s) given to waitForElementToBeRemoved are already removed. waitForElementToBeRemoved requires that the element(s) exist(s) before waiting for removal.");
  }
}
async function waitForElementToBeRemoved$1(callback, options) {
  const timeoutError = new Error("Timed out in waitForElementToBeRemoved.");
  if (typeof callback !== "function") {
    initialCheck(callback);
    const elements = Array.isArray(callback) ? callback : [callback];
    const getRemainingElements = elements.map((element) => {
      let parent = element.parentElement;
      if (parent === null)
        return () => null;
      while (parent.parentElement)
        parent = parent.parentElement;
      return () => parent.contains(element) ? element : null;
    });
    callback = () => getRemainingElements.map((c) => c()).filter(Boolean);
  }
  initialCheck(callback());
  return waitForWrapper(() => {
    let result;
    try {
      result = callback();
    } catch (error) {
      if (error.name === "TestingLibraryElementError") {
        return void 0;
      }
      throw error;
    }
    if (!isRemoved(result)) {
      throw timeoutError;
    }
    return void 0;
  }, options);
}
const eventMap$1 = {
  // Clipboard Events
  copy: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  cut: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  paste: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  // Composition Events
  compositionEnd: {
    EventType: "CompositionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  compositionStart: {
    EventType: "CompositionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  compositionUpdate: {
    EventType: "CompositionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  // Keyboard Events
  keyDown: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  keyPress: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  keyUp: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      charCode: 0,
      composed: true
    }
  },
  // Focus Events
  focus: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  blur: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  focusIn: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  focusOut: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  // Form Events
  change: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  input: {
    EventType: "InputEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  invalid: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: true
    }
  },
  submit: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  reset: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  // Mouse Events
  click: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      button: 0,
      composed: true
    }
  },
  contextMenu: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dblClick: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  drag: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragEnd: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragEnter: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragExit: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragLeave: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  dragOver: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dragStart: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  drop: {
    EventType: "DragEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseDown: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseEnter: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  mouseLeave: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  mouseMove: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseOut: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseOver: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseUp: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  // Selection Events
  select: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  // Touch Events
  touchCancel: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  touchEnd: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  touchMove: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  touchStart: {
    EventType: "TouchEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  // UI Events
  resize: {
    EventType: "UIEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  scroll: {
    EventType: "UIEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  // Wheel Events
  wheel: {
    EventType: "WheelEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  // Media Events
  abort: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  canPlay: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  canPlayThrough: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  durationChange: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  emptied: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  encrypted: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  ended: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadedData: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadedMetadata: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  loadStart: {
    EventType: "ProgressEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  pause: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  play: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  playing: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  progress: {
    EventType: "ProgressEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  rateChange: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  seeked: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  seeking: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  stalled: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  suspend: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  timeUpdate: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  volumeChange: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  waiting: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  // Events
  load: {
    // TODO: load events can be UIEvent or Event depending on what generated them
    // This is where this abstraction breaks down.
    // But the common targets are <img />, <script /> and window.
    // Neither of these targets receive a UIEvent
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  error: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  // Animation Events
  animationStart: {
    EventType: "AnimationEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  animationEnd: {
    EventType: "AnimationEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  animationIteration: {
    EventType: "AnimationEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  // Transition Events
  transitionCancel: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  transitionEnd: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  },
  transitionRun: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  transitionStart: {
    EventType: "TransitionEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  // pointer events
  pointerOver: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerEnter: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  pointerDown: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerMove: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerUp: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerCancel: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  pointerOut: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerLeave: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  gotPointerCapture: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  lostPointerCapture: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  // history events
  popState: {
    EventType: "PopStateEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  // window events
  offline: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  online: {
    EventType: "Event",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  }
};
const eventAliasMap = {
  doubleClick: "dblClick"
};
function fireEvent$1(element, event) {
  return getConfig$1().eventWrapper(() => {
    if (!event) {
      throw new Error("Unable to fire an event - please provide an event object.");
    }
    if (!element) {
      throw new Error('Unable to fire a "' + event.type + '" event - please provide a DOM element.');
    }
    return element.dispatchEvent(event);
  });
}
function createEvent$2(eventName, node, init, _temp) {
  let {
    EventType = "Event",
    defaultInit = {}
  } = _temp === void 0 ? {} : _temp;
  if (!node) {
    throw new Error('Unable to fire a "' + eventName + '" event - please provide a DOM element.');
  }
  const eventInit = {
    ...defaultInit,
    ...init
  };
  const {
    target: {
      value,
      files,
      ...targetProperties
    } = {}
  } = eventInit;
  if (value !== void 0) {
    setNativeValue(node, value);
  }
  if (files !== void 0) {
    Object.defineProperty(node, "files", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: files
    });
  }
  Object.assign(node, targetProperties);
  const window2 = getWindowFromNode(node);
  const EventConstructor = window2[EventType] || window2.Event;
  let event;
  if (typeof EventConstructor === "function") {
    event = new EventConstructor(eventName, eventInit);
  } else {
    event = window2.document.createEvent(EventType);
    const {
      bubbles,
      cancelable,
      detail,
      ...otherInit
    } = eventInit;
    event.initEvent(eventName, bubbles, cancelable, detail);
    Object.keys(otherInit).forEach((eventKey) => {
      event[eventKey] = otherInit[eventKey];
    });
  }
  const dataTransferProperties = ["dataTransfer", "clipboardData"];
  dataTransferProperties.forEach((dataTransferKey) => {
    const dataTransferValue = eventInit[dataTransferKey];
    if (typeof dataTransferValue === "object") {
      if (typeof window2.DataTransfer === "function") {
        Object.defineProperty(event, dataTransferKey, {
          value: Object.getOwnPropertyNames(dataTransferValue).reduce((acc, propName) => {
            Object.defineProperty(acc, propName, {
              value: dataTransferValue[propName]
            });
            return acc;
          }, new window2.DataTransfer())
        });
      } else {
        Object.defineProperty(event, dataTransferKey, {
          value: dataTransferValue
        });
      }
    }
  });
  return event;
}
Object.keys(eventMap$1).forEach((key) => {
  const {
    EventType,
    defaultInit
  } = eventMap$1[key];
  const eventName = key.toLowerCase();
  createEvent$2[key] = (node, init) => createEvent$2(eventName, node, init, {
    EventType,
    defaultInit
  });
  fireEvent$1[key] = (node, init) => fireEvent$1(node, createEvent$2[key](node, init));
});
function setNativeValue(element, value) {
  const {
    set: valueSetter
  } = Object.getOwnPropertyDescriptor(element, "value") || {};
  const prototype = Object.getPrototypeOf(element);
  const {
    set: prototypeValueSetter
  } = Object.getOwnPropertyDescriptor(prototype, "value") || {};
  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    if (valueSetter) {
      valueSetter.call(element, value);
    } else {
      throw new Error("The given element does not have a value setter");
    }
  }
}
Object.keys(eventAliasMap).forEach((aliasKey) => {
  const key = eventAliasMap[aliasKey];
  fireEvent$1[aliasKey] = function() {
    return fireEvent$1[key](...arguments);
  };
});
function unindent(string) {
  return string.replace(/[ \t]*[\n][ \t]*/g, "\n");
}
function encode(value) {
  return lzString.compressToEncodedURIComponent(unindent(value));
}
function getPlaygroundUrl(markup2) {
  return "https://testing-playground.com/#markup=" + encode(markup2);
}
const debug = (element, maxLength, options) => Array.isArray(element) ? element.forEach((el) => logDOM$1(el, maxLength, options)) : logDOM$1(element, maxLength, options);
const logTestingPlaygroundURL = function(element) {
  if (element === void 0) {
    element = getDocument$1().body;
  }
  if (!element || !("innerHTML" in element)) {
    console.log("The element you're providing isn't a valid DOM element.");
    return;
  }
  if (!element.innerHTML) {
    console.log("The provided element doesn't have any children.");
    return;
  }
  const playgroundUrl = getPlaygroundUrl(element.innerHTML);
  console.log("Open this URL in your browser\n\n" + playgroundUrl);
  return playgroundUrl;
};
const initialValue = {
  debug,
  logTestingPlaygroundURL
};
const screen$1 = typeof document !== "undefined" && document.body ? getQueriesForElement$1(document.body, queries$1, initialValue) : Object.keys(queries$1).reduce((helpers, key) => {
  helpers[key] = () => {
    throw new TypeError("For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error");
  };
  return helpers;
}, initialValue);
const domTestingLibrary = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  buildQueries: buildQueries$1,
  configure: configure$1,
  createEvent: createEvent$2,
  findAllByAltText: findAllByAltText$1,
  findAllByDisplayValue: findAllByDisplayValue$1,
  findAllByLabelText: findAllByLabelText$1,
  findAllByPlaceholderText: findAllByPlaceholderText$1,
  findAllByRole: findAllByRole$1,
  findAllByTestId: findAllByTestId$1,
  findAllByText: findAllByText$1,
  findAllByTitle: findAllByTitle$1,
  findByAltText: findByAltText$1,
  findByDisplayValue: findByDisplayValue$1,
  findByLabelText: findByLabelText$1,
  findByPlaceholderText: findByPlaceholderText$1,
  findByRole: findByRole$1,
  findByTestId: findByTestId$1,
  findByText: findByText$1,
  findByTitle: findByTitle$1,
  fireEvent: fireEvent$1,
  getAllByAltText: getAllByAltText$1,
  getAllByDisplayValue: getAllByDisplayValue$1,
  getAllByLabelText: getAllByLabelTextWithSuggestions,
  getAllByPlaceholderText: getAllByPlaceholderText$1,
  getAllByRole: getAllByRole$1,
  getAllByTestId: getAllByTestId$1,
  getAllByText: getAllByText$1,
  getAllByTitle: getAllByTitle$1,
  getByAltText: getByAltText$1,
  getByDisplayValue: getByDisplayValue$1,
  getByLabelText: getByLabelTextWithSuggestions,
  getByPlaceholderText: getByPlaceholderText$1,
  getByRole: getByRole$1,
  getByTestId: getByTestId$1,
  getByText: getByText$1,
  getByTitle: getByTitle$1,
  getConfig: getConfig$1,
  getDefaultNormalizer: getDefaultNormalizer$1,
  getElementError: getElementError$1,
  getMultipleElementsFoundError,
  getNodeText: getNodeText$1,
  getQueriesForElement: getQueriesForElement$1,
  getRoles: getRoles$1,
  getSuggestedQuery: getSuggestedQuery$1,
  isInaccessible: isInaccessible$1,
  logDOM: logDOM$1,
  logRoles: logRoles$1,
  makeFindQuery,
  makeGetAllQuery,
  makeSingleQuery,
  prettyDOM: prettyDOM$1,
  prettyFormat: index,
  queries: queries$1,
  queryAllByAltText: queryAllByAltTextWithSuggestions,
  queryAllByAttribute: queryAllByAttribute$1,
  queryAllByDisplayValue: queryAllByDisplayValueWithSuggestions,
  queryAllByLabelText: queryAllByLabelTextWithSuggestions,
  queryAllByPlaceholderText: queryAllByPlaceholderTextWithSuggestions,
  queryAllByRole: queryAllByRoleWithSuggestions,
  queryAllByTestId: queryAllByTestIdWithSuggestions,
  queryAllByText: queryAllByTextWithSuggestions,
  queryAllByTitle: queryAllByTitleWithSuggestions,
  queryByAltText: queryByAltText$1,
  queryByAttribute: queryByAttribute$1,
  queryByDisplayValue: queryByDisplayValue$1,
  queryByLabelText: queryByLabelText$1,
  queryByPlaceholderText: queryByPlaceholderText$1,
  queryByRole: queryByRole$1,
  queryByTestId: queryByTestId$1,
  queryByText: queryByText$1,
  queryByTitle: queryByTitle$1,
  queryHelpers: queryHelpers$1,
  screen: screen$1,
  waitFor: waitForWrapper,
  waitForElementToBeRemoved: waitForElementToBeRemoved$1,
  within: getQueriesForElement$1,
  wrapAllByQueryWithSuggestion,
  wrapSingleQueryWithSuggestion
}, Symbol.toStringTag, { value: "Module" }));
function isElementType(element, tag, props) {
  if (element.namespaceURI && element.namespaceURI !== "http://www.w3.org/1999/xhtml") {
    return false;
  }
  tag = Array.isArray(tag) ? tag : [
    tag
  ];
  if (!tag.includes(element.tagName.toLowerCase())) {
    return false;
  }
  if (props) {
    return Object.entries(props).every(([k, v]) => element[k] === v);
  }
  return true;
}
var clickableInputTypes;
(function(clickableInputTypes2) {
  clickableInputTypes2["button"] = "button";
  clickableInputTypes2["color"] = "color";
  clickableInputTypes2["file"] = "file";
  clickableInputTypes2["image"] = "image";
  clickableInputTypes2["reset"] = "reset";
  clickableInputTypes2["submit"] = "submit";
  clickableInputTypes2["checkbox"] = "checkbox";
  clickableInputTypes2["radio"] = "radio";
})(clickableInputTypes || (clickableInputTypes = {}));
function isClickableInput(element) {
  return isElementType(element, "button") || isElementType(element, "input") && element.type in clickableInputTypes;
}
function getWindow(node) {
  var _node_ownerDocument;
  if (isDocument$1(node) && node.defaultView) {
    return node.defaultView;
  } else if ((_node_ownerDocument = node.ownerDocument) === null || _node_ownerDocument === void 0 ? void 0 : _node_ownerDocument.defaultView) {
    return node.ownerDocument.defaultView;
  }
  throw new Error(`Could not determine window of node. Node was ${describe(node)}`);
}
function isDocument$1(node) {
  return node.nodeType === 9;
}
function describe(val) {
  return typeof val === "function" ? `function ${val.name}` : val === null ? "null" : String(val);
}
function readBlobText(blob, FileReader) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onerror = rej;
    fr.onabort = rej;
    fr.onload = () => {
      res(String(fr.result));
    };
    fr.readAsText(blob);
  });
}
function createFileList(window2, files) {
  const list = {
    ...files,
    length: files.length,
    item: (index2) => list[index2],
    [Symbol.iterator]: function* nextFile() {
      for (let i = 0; i < list.length; i++) {
        yield list[i];
      }
    }
  };
  list.constructor = window2.FileList;
  if (window2.FileList) {
    Object.setPrototypeOf(list, window2.FileList.prototype);
  }
  Object.freeze(list);
  return list;
}
function _define_property$8(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class DataTransferItemStub {
  getAsFile() {
    return this.file;
  }
  getAsString(callback) {
    if (typeof this.data === "string") {
      callback(this.data);
    }
  }
  /* istanbul ignore next */
  webkitGetAsEntry() {
    throw new Error("not implemented");
  }
  constructor(dataOrFile, type2) {
    _define_property$8(this, "kind", void 0);
    _define_property$8(this, "type", void 0);
    _define_property$8(this, "file", null);
    _define_property$8(this, "data", void 0);
    if (typeof dataOrFile === "string") {
      this.kind = "string";
      this.type = String(type2);
      this.data = dataOrFile;
    } else {
      this.kind = "file";
      this.type = dataOrFile.type;
      this.file = dataOrFile;
    }
  }
}
class DataTransferItemListStub extends Array {
  add(...args) {
    const item = new DataTransferItemStub(args[0], args[1]);
    this.push(item);
    return item;
  }
  clear() {
    this.splice(0, this.length);
  }
  remove(index2) {
    this.splice(index2, 1);
  }
}
function getTypeMatcher(type2, exact) {
  const [group, sub] = type2.split("/");
  const isGroup = !sub || sub === "*";
  return (item) => {
    return exact ? item.type === (isGroup ? group : type2) : isGroup ? item.type.startsWith(`${group}/`) : item.type === group;
  };
}
function createDataTransferStub(window2) {
  return new class DataTransferStub {
    getData(format2) {
      var _this_items_find;
      const match = (_this_items_find = this.items.find(getTypeMatcher(format2, true))) !== null && _this_items_find !== void 0 ? _this_items_find : this.items.find(getTypeMatcher(format2, false));
      let text = "";
      match === null || match === void 0 ? void 0 : match.getAsString((t) => {
        text = t;
      });
      return text;
    }
    setData(format2, data) {
      const matchIndex = this.items.findIndex(getTypeMatcher(format2, true));
      const item = new DataTransferItemStub(data, format2);
      if (matchIndex >= 0) {
        this.items.splice(matchIndex, 1, item);
      } else {
        this.items.push(item);
      }
    }
    clearData(format2) {
      if (format2) {
        const matchIndex = this.items.findIndex(getTypeMatcher(format2, true));
        if (matchIndex >= 0) {
          this.items.remove(matchIndex);
        }
      } else {
        this.items.clear();
      }
    }
    get types() {
      const t = [];
      if (this.files.length) {
        t.push("Files");
      }
      this.items.forEach((i) => t.push(i.type));
      Object.freeze(t);
      return t;
    }
    /* istanbul ignore next */
    setDragImage() {
    }
    constructor() {
      _define_property$8(this, "dropEffect", "none");
      _define_property$8(this, "effectAllowed", "uninitialized");
      _define_property$8(this, "items", new DataTransferItemListStub());
      _define_property$8(this, "files", createFileList(window2, []));
    }
  }();
}
function createDataTransfer(window2, files = []) {
  const dt = typeof window2.DataTransfer === "undefined" ? createDataTransferStub(window2) : (
    /* istanbul ignore next */
    new window2.DataTransfer()
  );
  Object.defineProperty(dt, "files", {
    get: () => createFileList(window2, files)
  });
  return dt;
}
function getBlobFromDataTransferItem(window2, item) {
  if (item.kind === "file") {
    return item.getAsFile();
  }
  let data = "";
  item.getAsString((s) => {
    data = s;
  });
  return new window2.Blob([
    data
  ], {
    type: item.type
  });
}
function _define_property$7(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function createClipboardItem(window2, ...blobs) {
  const dataMap = Object.fromEntries(blobs.map((b) => [
    typeof b === "string" ? "text/plain" : b.type,
    Promise.resolve(b)
  ]));
  if (typeof window2.ClipboardItem !== "undefined") {
    return new window2.ClipboardItem(dataMap);
  }
  return new class ClipboardItem {
    get types() {
      return Array.from(Object.keys(this.data));
    }
    async getType(type2) {
      const value = await this.data[type2];
      if (!value) {
        throw new Error(`${type2} is not one of the available MIME types on this item.`);
      }
      return value instanceof window2.Blob ? value : new window2.Blob([
        value
      ], {
        type: type2
      });
    }
    constructor(d) {
      _define_property$7(this, "data", void 0);
      this.data = d;
    }
  }(dataMap);
}
const ClipboardStubControl = Symbol("Manage ClipboardSub");
function createClipboardStub(window2, control) {
  return Object.assign(new class Clipboard extends window2.EventTarget {
    async read() {
      return Array.from(this.items);
    }
    async readText() {
      let text = "";
      for (const item of this.items) {
        const type2 = item.types.includes("text/plain") ? "text/plain" : item.types.find((t) => t.startsWith("text/"));
        if (type2) {
          text += await item.getType(type2).then((b) => readBlobText(b, window2.FileReader));
        }
      }
      return text;
    }
    async write(data) {
      this.items = data;
    }
    async writeText(text) {
      this.items = [
        createClipboardItem(window2, text)
      ];
    }
    constructor(...args) {
      super(...args);
      _define_property$7(this, "items", []);
    }
  }(), {
    [ClipboardStubControl]: control
  });
}
function isClipboardStub(clipboard) {
  return !!(clipboard === null || clipboard === void 0 ? void 0 : clipboard[ClipboardStubControl]);
}
function attachClipboardStubToView(window2) {
  if (isClipboardStub(window2.navigator.clipboard)) {
    return window2.navigator.clipboard[ClipboardStubControl];
  }
  const realClipboard = Object.getOwnPropertyDescriptor(window2.navigator, "clipboard");
  let stub;
  const control = {
    resetClipboardStub: () => {
      stub = createClipboardStub(window2, control);
    },
    detachClipboardStub: () => {
      if (realClipboard) {
        Object.defineProperty(window2.navigator, "clipboard", realClipboard);
      } else {
        Object.defineProperty(window2.navigator, "clipboard", {
          value: void 0,
          configurable: true
        });
      }
    }
  };
  stub = createClipboardStub(window2, control);
  Object.defineProperty(window2.navigator, "clipboard", {
    get: () => stub,
    configurable: true
  });
  return stub[ClipboardStubControl];
}
function resetClipboardStubOnView(window2) {
  if (isClipboardStub(window2.navigator.clipboard)) {
    window2.navigator.clipboard[ClipboardStubControl].resetClipboardStub();
  }
}
function detachClipboardStubFromView(window2) {
  if (isClipboardStub(window2.navigator.clipboard)) {
    window2.navigator.clipboard[ClipboardStubControl].detachClipboardStub();
  }
}
async function readDataTransferFromClipboard(document2) {
  const window2 = document2.defaultView;
  const clipboard = window2 === null || window2 === void 0 ? void 0 : window2.navigator.clipboard;
  const items = clipboard && await clipboard.read();
  if (!items) {
    throw new Error("The Clipboard API is unavailable.");
  }
  const dt = createDataTransfer(window2);
  for (const item of items) {
    for (const type2 of item.types) {
      dt.setData(type2, await item.getType(type2).then((b) => readBlobText(b, window2.FileReader)));
    }
  }
  return dt;
}
async function writeDataTransferToClipboard(document2, clipboardData) {
  const window2 = getWindow(document2);
  const clipboard = window2.navigator.clipboard;
  const items = [];
  for (let i = 0; i < clipboardData.items.length; i++) {
    const dtItem = clipboardData.items[i];
    const blob = getBlobFromDataTransferItem(window2, dtItem);
    items.push(createClipboardItem(window2, blob));
  }
  const written = clipboard && await clipboard.write(items).then(
    () => true,
    // Can happen with other implementations that e.g. require permissions
    /* istanbul ignore next */
    () => false
  );
  if (!written) {
    throw new Error("The Clipboard API is unavailable.");
  }
}
const g = globalThis;
if (typeof g.afterEach === "function") {
  g.afterEach(() => resetClipboardStubOnView(globalThis.window));
}
if (typeof g.afterAll === "function") {
  g.afterAll(() => detachClipboardStubFromView(globalThis.window));
}
function isContentEditable(element) {
  return element.hasAttribute("contenteditable") && (element.getAttribute("contenteditable") == "true" || element.getAttribute("contenteditable") == "");
}
function getContentEditable(node) {
  const element = getElement$1(node);
  return element && (element.closest('[contenteditable=""]') || element.closest('[contenteditable="true"]'));
}
function getElement$1(node) {
  return node.nodeType === 1 ? node : node.parentElement;
}
function isEditable(element) {
  return isEditableInputOrTextArea(element) && !element.readOnly || isContentEditable(element);
}
var editableInputTypes;
(function(editableInputTypes2) {
  editableInputTypes2["text"] = "text";
  editableInputTypes2["date"] = "date";
  editableInputTypes2["datetime-local"] = "datetime-local";
  editableInputTypes2["email"] = "email";
  editableInputTypes2["month"] = "month";
  editableInputTypes2["number"] = "number";
  editableInputTypes2["password"] = "password";
  editableInputTypes2["search"] = "search";
  editableInputTypes2["tel"] = "tel";
  editableInputTypes2["time"] = "time";
  editableInputTypes2["url"] = "url";
  editableInputTypes2["week"] = "week";
})(editableInputTypes || (editableInputTypes = {}));
function isEditableInputOrTextArea(element) {
  return isElementType(element, "textarea") || isElementType(element, "input") && element.type in editableInputTypes;
}
var maxLengthSupportedTypes;
(function(maxLengthSupportedTypes2) {
  maxLengthSupportedTypes2["email"] = "email";
  maxLengthSupportedTypes2["password"] = "password";
  maxLengthSupportedTypes2["search"] = "search";
  maxLengthSupportedTypes2["telephone"] = "telephone";
  maxLengthSupportedTypes2["text"] = "text";
  maxLengthSupportedTypes2["url"] = "url";
})(maxLengthSupportedTypes || (maxLengthSupportedTypes = {}));
function getMaxLength(element) {
  var _element_getAttribute;
  const attr = (_element_getAttribute = element.getAttribute("maxlength")) !== null && _element_getAttribute !== void 0 ? _element_getAttribute : "";
  return /^\d+$/.test(attr) && Number(attr) >= 0 ? Number(attr) : void 0;
}
function supportsMaxLength(element) {
  return isElementType(element, "textarea") || isElementType(element, "input") && element.type in maxLengthSupportedTypes;
}
const FOCUSABLE_SELECTOR = [
  "input:not([type=hidden]):not([disabled])",
  "button:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[contenteditable=""]',
  '[contenteditable="true"]',
  "a[href]",
  "[tabindex]:not([disabled])"
].join(", ");
function isFocusable(element) {
  return element.matches(FOCUSABLE_SELECTOR);
}
var bracketDict;
(function(bracketDict2) {
  bracketDict2["{"] = "}";
  bracketDict2["["] = "]";
})(bracketDict || (bracketDict = {}));
function readNextDescriptor(text, context) {
  let pos = 0;
  const startBracket = text[pos] in bracketDict ? text[pos] : "";
  pos += startBracket.length;
  const isEscapedChar = new RegExp(`^\\${startBracket}{2}`).test(text);
  const type2 = isEscapedChar ? "" : startBracket;
  return {
    type: type2,
    ...type2 === "" ? readPrintableChar(text, pos, context) : readTag(text, pos, type2, context)
  };
}
function readPrintableChar(text, pos, context) {
  const descriptor = text[pos];
  assertDescriptor(descriptor, text, pos, context);
  pos += descriptor.length;
  return {
    consumedLength: pos,
    descriptor,
    releasePrevious: false,
    releaseSelf: true,
    repeat: 1
  };
}
function readTag(text, pos, startBracket, context) {
  var _text_slice_match, _text_slice_match1;
  const releasePreviousModifier = text[pos] === "/" ? "/" : "";
  pos += releasePreviousModifier.length;
  const escapedDescriptor = startBracket === "{" && text[pos] === "\\";
  pos += Number(escapedDescriptor);
  const descriptor = escapedDescriptor ? text[pos] : (_text_slice_match = text.slice(pos).match(startBracket === "{" ? /^\w+|^[^}>/]/ : /^\w+/)) === null || _text_slice_match === void 0 ? void 0 : _text_slice_match[0];
  assertDescriptor(descriptor, text, pos, context);
  pos += descriptor.length;
  var _text_slice_match_;
  const repeatModifier = (_text_slice_match_ = (_text_slice_match1 = text.slice(pos).match(/^>\d+/)) === null || _text_slice_match1 === void 0 ? void 0 : _text_slice_match1[0]) !== null && _text_slice_match_ !== void 0 ? _text_slice_match_ : "";
  pos += repeatModifier.length;
  const releaseSelfModifier = text[pos] === "/" || !repeatModifier && text[pos] === ">" ? text[pos] : "";
  pos += releaseSelfModifier.length;
  const expectedEndBracket = bracketDict[startBracket];
  const endBracket = text[pos] === expectedEndBracket ? expectedEndBracket : "";
  if (!endBracket) {
    throw new Error(getErrorMessage([
      !repeatModifier && "repeat modifier",
      !releaseSelfModifier && "release modifier",
      `"${expectedEndBracket}"`
    ].filter(Boolean).join(" or "), text[pos], text, context));
  }
  pos += endBracket.length;
  return {
    consumedLength: pos,
    descriptor,
    releasePrevious: !!releasePreviousModifier,
    repeat: repeatModifier ? Math.max(Number(repeatModifier.substr(1)), 1) : 1,
    releaseSelf: hasReleaseSelf(releaseSelfModifier, repeatModifier)
  };
}
function assertDescriptor(descriptor, text, pos, context) {
  if (!descriptor) {
    throw new Error(getErrorMessage("key descriptor", text[pos], text, context));
  }
}
function hasReleaseSelf(releaseSelfModifier, repeatModifier) {
  if (releaseSelfModifier) {
    return releaseSelfModifier === "/";
  }
  if (repeatModifier) {
    return false;
  }
}
function getErrorMessage(expected, found, text, context) {
  return `Expected ${expected} but found "${found !== null && found !== void 0 ? found : ""}" in "${text}"
    See ${context === "pointer" ? `https://testing-library.com/docs/user-event/pointer#pressing-a-button-or-touching-the-screen` : `https://testing-library.com/docs/user-event/keyboard`}
    for more information about how userEvent parses your input.`;
}
function cloneEvent(event) {
  return new event.constructor(event.type, event);
}
var ApiLevel;
(function(ApiLevel2) {
  ApiLevel2[ApiLevel2["Trigger"] = 2] = "Trigger";
  ApiLevel2[ApiLevel2["Call"] = 1] = "Call";
})(ApiLevel || (ApiLevel = {}));
function setLevelRef(instance, level) {
  instance.levelRefs[level] = {};
}
function getLevelRef(instance, level) {
  return instance.levelRefs[level];
}
var PointerEventsCheckLevel;
(function(PointerEventsCheckLevel2) {
  PointerEventsCheckLevel2[PointerEventsCheckLevel2["EachTrigger"] = 4] = "EachTrigger";
  PointerEventsCheckLevel2[PointerEventsCheckLevel2["EachApiCall"] = 2] = "EachApiCall";
  PointerEventsCheckLevel2[PointerEventsCheckLevel2["EachTarget"] = 1] = "EachTarget";
  PointerEventsCheckLevel2[PointerEventsCheckLevel2["Never"] = 0] = "Never";
})(PointerEventsCheckLevel || (PointerEventsCheckLevel = {}));
function isDisabled(element) {
  for (let el = element; el; el = el.parentElement) {
    if (isElementType(el, [
      "button",
      "input",
      "select",
      "textarea",
      "optgroup",
      "option"
    ])) {
      if (el.hasAttribute("disabled")) {
        return true;
      }
    } else if (isElementType(el, "fieldset")) {
      var _el_querySelector;
      if (el.hasAttribute("disabled") && !((_el_querySelector = el.querySelector(":scope > legend")) === null || _el_querySelector === void 0 ? void 0 : _el_querySelector.contains(element))) {
        return true;
      }
    } else if (el.tagName.includes("-")) {
      if (el.constructor.formAssociated && el.hasAttribute("disabled")) {
        return true;
      }
    }
  }
  return false;
}
function getActiveElement(document2) {
  const activeElement = document2.activeElement;
  if (activeElement === null || activeElement === void 0 ? void 0 : activeElement.shadowRoot) {
    return getActiveElement(activeElement.shadowRoot);
  } else {
    if (isDisabled(activeElement)) {
      return document2.ownerDocument ? (
        /* istanbul ignore next */
        document2.ownerDocument.body
      ) : document2.body;
    }
    return activeElement;
  }
}
function getActiveElementOrBody(document2) {
  var _getActiveElement;
  return (_getActiveElement = getActiveElement(document2)) !== null && _getActiveElement !== void 0 ? _getActiveElement : (
    /* istanbul ignore next */
    document2.body
  );
}
function findClosest(element, callback) {
  let el = element;
  do {
    if (callback(el)) {
      return el;
    }
    el = el.parentElement;
  } while (el && el !== element.ownerDocument.body);
  return void 0;
}
function hasOwnSelection(node) {
  return isElement$1(node) && isEditableInputOrTextArea(node);
}
function hasNoSelection(node) {
  return isElement$1(node) && isClickableInput(node);
}
function isElement$1(node) {
  return node.nodeType === 1;
}
function updateSelectionOnFocus(element) {
  const selection = element.ownerDocument.getSelection();
  if (!(selection === null || selection === void 0 ? void 0 : selection.focusNode)) {
    return;
  }
  if (hasOwnSelection(element)) {
    const contenteditable = getContentEditable(selection.focusNode);
    if (contenteditable) {
      if (!selection.isCollapsed) {
        var _contenteditable_firstChild;
        const focusNode = ((_contenteditable_firstChild = contenteditable.firstChild) === null || _contenteditable_firstChild === void 0 ? void 0 : _contenteditable_firstChild.nodeType) === 3 ? contenteditable.firstChild : contenteditable;
        selection.setBaseAndExtent(focusNode, 0, focusNode, 0);
      }
    } else {
      selection.setBaseAndExtent(element, 0, element, 0);
    }
  }
}
function wrapEvent(cb, _element) {
  return getConfig$1().eventWrapper(cb);
}
function focusElement(element) {
  const target = findClosest(element, isFocusable);
  const activeElement = getActiveElement(element.ownerDocument);
  if ((target !== null && target !== void 0 ? target : element.ownerDocument.body) === activeElement) {
    return;
  } else if (target) {
    wrapEvent(() => target.focus());
  } else {
    wrapEvent(() => activeElement === null || activeElement === void 0 ? void 0 : activeElement.blur());
  }
  updateSelectionOnFocus(target !== null && target !== void 0 ? target : element.ownerDocument.body);
}
function blurElement(element) {
  if (!isFocusable(element))
    return;
  const wasActive = getActiveElement(element.ownerDocument) === element;
  if (!wasActive)
    return;
  wrapEvent(() => element.blur());
}
const behavior = {};
behavior.click = (event, target, instance) => {
  const context = target.closest("button,input,label,select,textarea");
  const control = context && isElementType(context, "label") && context.control;
  if (control) {
    return () => {
      if (isFocusable(control)) {
        focusElement(control);
      }
      instance.dispatchEvent(control, cloneEvent(event));
    };
  } else if (isElementType(target, "input", {
    type: "file"
  })) {
    return () => {
      blurElement(target);
      target.dispatchEvent(new (getWindow(target)).Event("fileDialog"));
      focusElement(target);
    };
  }
};
const UIValue = Symbol("Displayed value in UI");
const UISelection = Symbol("Displayed selection in UI");
const InitialValue = Symbol("Initial value to compare on blur");
function isUIValue(value) {
  return typeof value === "object" && UIValue in value;
}
function isUISelectionStart(start) {
  return !!start && typeof start === "object" && UISelection in start;
}
function setUIValue(element, value) {
  if (element[InitialValue] === void 0) {
    element[InitialValue] = element.value;
  }
  element[UIValue] = value;
  element.value = Object.assign(new String(value), {
    [UIValue]: true
  });
}
function getUIValue(element) {
  return element[UIValue] === void 0 ? element.value : String(element[UIValue]);
}
function setUIValueClean(element) {
  element[UIValue] = void 0;
}
function clearInitialValue(element) {
  element[InitialValue] = void 0;
}
function getInitialValue(element) {
  return element[InitialValue];
}
function setUISelectionRaw(element, selection) {
  element[UISelection] = selection;
}
function setUISelection(element, { focusOffset: focusOffsetParam, anchorOffset: anchorOffsetParam = focusOffsetParam }, mode = "replace") {
  const valueLength = getUIValue(element).length;
  const sanitizeOffset = (o) => Math.max(0, Math.min(valueLength, o));
  const anchorOffset = mode === "replace" || element[UISelection] === void 0 ? sanitizeOffset(anchorOffsetParam) : element[UISelection].anchorOffset;
  const focusOffset = sanitizeOffset(focusOffsetParam);
  const startOffset = Math.min(anchorOffset, focusOffset);
  const endOffset = Math.max(anchorOffset, focusOffset);
  element[UISelection] = {
    anchorOffset,
    focusOffset
  };
  if (element.selectionStart === startOffset && element.selectionEnd === endOffset) {
    return;
  }
  const startObj = Object.assign(new Number(startOffset), {
    [UISelection]: true
  });
  try {
    element.setSelectionRange(startObj, endOffset);
  } catch {
  }
}
function getUISelection(element) {
  var _element_selectionStart, _element_selectionEnd, _element_UISelection;
  const sel = (_element_UISelection = element[UISelection]) !== null && _element_UISelection !== void 0 ? _element_UISelection : {
    anchorOffset: (_element_selectionStart = element.selectionStart) !== null && _element_selectionStart !== void 0 ? _element_selectionStart : 0,
    focusOffset: (_element_selectionEnd = element.selectionEnd) !== null && _element_selectionEnd !== void 0 ? _element_selectionEnd : 0
  };
  return {
    ...sel,
    startOffset: Math.min(sel.anchorOffset, sel.focusOffset),
    endOffset: Math.max(sel.anchorOffset, sel.focusOffset)
  };
}
function hasUISelection(element) {
  return !!element[UISelection];
}
function setUISelectionClean(element) {
  element[UISelection] = void 0;
}
const parseInt$1 = globalThis.parseInt;
function buildTimeValue(value) {
  const onlyDigitsValue = value.replace(/\D/g, "");
  if (onlyDigitsValue.length < 2) {
    return value;
  }
  const firstDigit = parseInt$1(onlyDigitsValue[0], 10);
  const secondDigit = parseInt$1(onlyDigitsValue[1], 10);
  if (firstDigit >= 3 || firstDigit === 2 && secondDigit >= 4) {
    let index2;
    if (firstDigit >= 3) {
      index2 = 1;
    } else {
      index2 = 2;
    }
    return build(onlyDigitsValue, index2);
  }
  if (value.length === 2) {
    return value;
  }
  return build(onlyDigitsValue, 2);
}
function build(onlyDigitsValue, index2) {
  const hours = onlyDigitsValue.slice(0, index2);
  const validHours = Math.min(parseInt$1(hours, 10), 23);
  const minuteCharacters = onlyDigitsValue.slice(index2);
  const parsedMinutes = parseInt$1(minuteCharacters, 10);
  const validMinutes = Math.min(parsedMinutes, 59);
  return `${validHours.toString().padStart(2, "0")}:${validMinutes.toString().padStart(2, "0")}`;
}
function isValidDateOrTimeValue(element, value) {
  const clone = element.cloneNode();
  clone.value = value;
  return clone.value === value;
}
function getNextCursorPosition(node, offset, direction, inputType) {
  if (isTextNode(node) && offset + direction >= 0 && offset + direction <= node.nodeValue.length) {
    return {
      node,
      offset: offset + direction
    };
  }
  const nextNode = getNextCharacterContentNode(node, offset, direction);
  if (nextNode) {
    if (isTextNode(nextNode)) {
      return {
        node: nextNode,
        offset: direction > 0 ? Math.min(1, nextNode.nodeValue.length) : Math.max(nextNode.nodeValue.length - 1, 0)
      };
    } else if (isElementType(nextNode, "br")) {
      const nextPlusOne = getNextCharacterContentNode(nextNode, void 0, direction);
      if (!nextPlusOne) {
        if (direction < 0 && inputType === "deleteContentBackward") {
          return {
            node: nextNode.parentNode,
            offset: getOffset(nextNode)
          };
        }
        return void 0;
      } else if (isTextNode(nextPlusOne)) {
        return {
          node: nextPlusOne,
          offset: direction > 0 ? 0 : nextPlusOne.nodeValue.length
        };
      } else if (direction < 0 && isElementType(nextPlusOne, "br")) {
        return {
          node: nextNode.parentNode,
          offset: getOffset(nextNode)
        };
      } else {
        return {
          node: nextPlusOne.parentNode,
          offset: getOffset(nextPlusOne) + (direction > 0 ? 0 : 1)
        };
      }
    } else {
      return {
        node: nextNode.parentNode,
        offset: getOffset(nextNode) + (direction > 0 ? 1 : 0)
      };
    }
  }
}
function getNextCharacterContentNode(node, offset, direction) {
  const nextOffset = Number(offset) + (direction < 0 ? -1 : 0);
  if (offset !== void 0 && isElement(node) && nextOffset >= 0 && nextOffset < node.children.length) {
    node = node.children[nextOffset];
  }
  return walkNodes(node, direction === 1 ? "next" : "previous", isTreatedAsCharacterContent);
}
function isTreatedAsCharacterContent(node) {
  if (isTextNode(node)) {
    return true;
  }
  if (isElement(node)) {
    if (isElementType(node, [
      "input",
      "textarea"
    ])) {
      return node.type !== "hidden";
    } else if (isElementType(node, "br")) {
      return true;
    }
  }
  return false;
}
function getOffset(node) {
  let i = 0;
  while (node.previousSibling) {
    i++;
    node = node.previousSibling;
  }
  return i;
}
function isElement(node) {
  return node.nodeType === 1;
}
function isTextNode(node) {
  return node.nodeType === 3;
}
function walkNodes(node, direction, callback) {
  for (; ; ) {
    var _node_ownerDocument;
    const sibling = node[`${direction}Sibling`];
    if (sibling) {
      node = getDescendant(sibling, direction === "next" ? "first" : "last");
      if (callback(node)) {
        return node;
      }
    } else if (node.parentNode && (!isElement(node.parentNode) || !isContentEditable(node.parentNode) && node.parentNode !== ((_node_ownerDocument = node.ownerDocument) === null || _node_ownerDocument === void 0 ? void 0 : _node_ownerDocument.body))) {
      node = node.parentNode;
    } else {
      break;
    }
  }
}
function getDescendant(node, direction) {
  while (node.hasChildNodes()) {
    node = node[`${direction}Child`];
  }
  return node;
}
const TrackChanges = Symbol("Track programmatic changes for React workaround");
function isReact17Element(element) {
  return Object.getOwnPropertyNames(element).some((k) => k.startsWith("__react")) && getWindow(element).REACT_VERSION === 17;
}
function startTrackValue(element) {
  if (!isReact17Element(element)) {
    return;
  }
  element[TrackChanges] = {
    previousValue: String(element.value),
    tracked: []
  };
}
function trackOrSetValue(element, v) {
  var _element_TrackChanges_tracked, _element_TrackChanges;
  (_element_TrackChanges = element[TrackChanges]) === null || _element_TrackChanges === void 0 ? void 0 : (_element_TrackChanges_tracked = _element_TrackChanges.tracked) === null || _element_TrackChanges_tracked === void 0 ? void 0 : _element_TrackChanges_tracked.push(v);
  if (!element[TrackChanges]) {
    setUIValueClean(element);
    setUISelection(element, {
      focusOffset: v.length
    });
  }
}
function commitValueAfterInput(element, cursorOffset) {
  var _changes_tracked;
  const changes = element[TrackChanges];
  element[TrackChanges] = void 0;
  if (!(changes === null || changes === void 0 ? void 0 : (_changes_tracked = changes.tracked) === null || _changes_tracked === void 0 ? void 0 : _changes_tracked.length)) {
    return;
  }
  const isJustReactStateUpdate = changes.tracked.length === 2 && changes.tracked[0] === changes.previousValue && changes.tracked[1] === element.value;
  if (!isJustReactStateUpdate) {
    setUIValueClean(element);
  }
  if (hasUISelection(element)) {
    setUISelection(element, {
      focusOffset: isJustReactStateUpdate ? cursorOffset : element.value.length
    });
  }
}
function getTargetTypeAndSelection(node) {
  const element = getElement(node);
  if (element && hasOwnSelection(element)) {
    return {
      type: "input",
      selection: getUISelection(element)
    };
  }
  const selection = element === null || element === void 0 ? void 0 : element.ownerDocument.getSelection();
  const isCE = getContentEditable(node) && (selection === null || selection === void 0 ? void 0 : selection.anchorNode) && getContentEditable(selection.anchorNode);
  return {
    type: isCE ? "contenteditable" : "default",
    selection
  };
}
function getElement(node) {
  return node.nodeType === 1 ? node : node.parentElement;
}
function getInputRange(focusNode) {
  const typeAndSelection = getTargetTypeAndSelection(focusNode);
  if (typeAndSelection.type === "input") {
    return typeAndSelection.selection;
  } else if (typeAndSelection.type === "contenteditable") {
    var _typeAndSelection_selection;
    return (_typeAndSelection_selection = typeAndSelection.selection) === null || _typeAndSelection_selection === void 0 ? void 0 : _typeAndSelection_selection.getRangeAt(0);
  }
}
function setSelection({ focusNode, focusOffset, anchorNode = focusNode, anchorOffset = focusOffset }) {
  var _anchorNode_ownerDocument_getSelection, _anchorNode_ownerDocument;
  const typeAndSelection = getTargetTypeAndSelection(focusNode);
  if (typeAndSelection.type === "input") {
    return setUISelection(focusNode, {
      anchorOffset,
      focusOffset
    });
  }
  (_anchorNode_ownerDocument = anchorNode.ownerDocument) === null || _anchorNode_ownerDocument === void 0 ? void 0 : (_anchorNode_ownerDocument_getSelection = _anchorNode_ownerDocument.getSelection()) === null || _anchorNode_ownerDocument_getSelection === void 0 ? void 0 : _anchorNode_ownerDocument_getSelection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
}
function isDateOrTime(element) {
  return isElementType(element, "input") && [
    "date",
    "time"
  ].includes(element.type);
}
function input(instance, element, data, inputType = "insertText") {
  const inputRange = getInputRange(element);
  if (!inputRange) {
    return;
  }
  if (!isDateOrTime(element)) {
    const unprevented = instance.dispatchUIEvent(element, "beforeinput", {
      inputType,
      data
    });
    if (!unprevented) {
      return;
    }
  }
  if ("startContainer" in inputRange) {
    editContenteditable(instance, element, inputRange, data, inputType);
  } else {
    editInputElement(instance, element, inputRange, data, inputType);
  }
}
function editContenteditable(instance, element, inputRange, data, inputType) {
  let del = false;
  if (!inputRange.collapsed) {
    del = true;
    inputRange.deleteContents();
  } else if ([
    "deleteContentBackward",
    "deleteContentForward"
  ].includes(inputType)) {
    const nextPosition = getNextCursorPosition(inputRange.startContainer, inputRange.startOffset, inputType === "deleteContentBackward" ? -1 : 1, inputType);
    if (nextPosition) {
      del = true;
      const delRange = inputRange.cloneRange();
      if (delRange.comparePoint(nextPosition.node, nextPosition.offset) < 0) {
        delRange.setStart(nextPosition.node, nextPosition.offset);
      } else {
        delRange.setEnd(nextPosition.node, nextPosition.offset);
      }
      delRange.deleteContents();
    }
  }
  if (data) {
    if (inputRange.endContainer.nodeType === 3) {
      const offset = inputRange.endOffset;
      inputRange.endContainer.insertData(offset, data);
      inputRange.setStart(inputRange.endContainer, offset + data.length);
      inputRange.setEnd(inputRange.endContainer, offset + data.length);
    } else {
      const text = element.ownerDocument.createTextNode(data);
      inputRange.insertNode(text);
      inputRange.setStart(text, data.length);
      inputRange.setEnd(text, data.length);
    }
  }
  if (del || data) {
    instance.dispatchUIEvent(element, "input", {
      inputType
    });
  }
}
function editInputElement(instance, element, inputRange, data, inputType) {
  let dataToInsert = data;
  if (supportsMaxLength(element)) {
    const maxLength = getMaxLength(element);
    if (maxLength !== void 0 && data.length > 0) {
      const spaceUntilMaxLength = maxLength - element.value.length;
      if (spaceUntilMaxLength > 0) {
        dataToInsert = data.substring(0, spaceUntilMaxLength);
      } else {
        return;
      }
    }
  }
  const { newValue, newOffset, oldValue } = calculateNewValue(dataToInsert, element, inputRange, inputType);
  if (newValue === oldValue && newOffset === inputRange.startOffset && newOffset === inputRange.endOffset) {
    return;
  }
  if (isElementType(element, "input", {
    type: "number"
  }) && !isValidNumberInput(newValue)) {
    return;
  }
  setUIValue(element, newValue);
  setSelection({
    focusNode: element,
    anchorOffset: newOffset,
    focusOffset: newOffset
  });
  if (isDateOrTime(element)) {
    if (isValidDateOrTimeValue(element, newValue)) {
      commitInput(instance, element, newOffset, {});
      instance.dispatchUIEvent(element, "change");
      clearInitialValue(element);
    }
  } else {
    commitInput(instance, element, newOffset, {
      data,
      inputType
    });
  }
}
function calculateNewValue(inputData, node, { startOffset, endOffset }, inputType) {
  const value = getUIValue(node);
  const prologEnd = Math.max(0, startOffset === endOffset && inputType === "deleteContentBackward" ? startOffset - 1 : startOffset);
  const prolog = value.substring(0, prologEnd);
  const epilogStart = Math.min(value.length, startOffset === endOffset && inputType === "deleteContentForward" ? startOffset + 1 : endOffset);
  const epilog = value.substring(epilogStart, value.length);
  let newValue = `${prolog}${inputData}${epilog}`;
  let newOffset = prologEnd + inputData.length;
  if (isElementType(node, "input", {
    type: "time"
  })) {
    const builtValue = buildTimeValue(newValue);
    if (builtValue !== "" && isValidDateOrTimeValue(node, builtValue)) {
      newValue = builtValue;
      newOffset = builtValue.length;
    }
  }
  return {
    oldValue: value,
    newValue,
    newOffset
  };
}
function commitInput(instance, element, newOffset, inputInit) {
  instance.dispatchUIEvent(element, "input", inputInit);
  commitValueAfterInput(element, newOffset);
}
function isValidNumberInput(value) {
  var _value_match, _value_match1;
  const valueParts = value.split("e", 2);
  return !(/[^\d.\-e]/.test(value) || Number((_value_match = value.match(/-/g)) === null || _value_match === void 0 ? void 0 : _value_match.length) > 2 || Number((_value_match1 = value.match(/\./g)) === null || _value_match1 === void 0 ? void 0 : _value_match1.length) > 1 || valueParts[1] && !/^-?\d*$/.test(valueParts[1]));
}
behavior.cut = (event, target, instance) => {
  return () => {
    if (isEditable(target)) {
      input(instance, target, "", "deleteByCut");
    }
  };
};
function getValueOrTextContent(element) {
  if (!element) {
    return null;
  }
  if (isContentEditable(element)) {
    return element.textContent;
  }
  return getUIValue(element);
}
function isVisible(element) {
  const window2 = getWindow(element);
  for (let el = element; el === null || el === void 0 ? void 0 : el.ownerDocument; el = el.parentElement) {
    const { display, visibility } = window2.getComputedStyle(el);
    if (display === "none") {
      return false;
    }
    if (visibility === "hidden") {
      return false;
    }
  }
  return true;
}
function getTabDestination(activeElement, shift) {
  const document2 = activeElement.ownerDocument;
  const focusableElements = document2.querySelectorAll(FOCUSABLE_SELECTOR);
  const enabledElements = Array.from(focusableElements).filter((el) => el === activeElement || !(Number(el.getAttribute("tabindex")) < 0 || isDisabled(el)));
  if (Number(activeElement.getAttribute("tabindex")) >= 0) {
    enabledElements.sort((a, b) => {
      const i = Number(a.getAttribute("tabindex"));
      const j = Number(b.getAttribute("tabindex"));
      if (i === j) {
        return 0;
      } else if (i === 0) {
        return 1;
      } else if (j === 0) {
        return -1;
      }
      return i - j;
    });
  }
  const checkedRadio = {};
  let prunedElements = [
    document2.body
  ];
  const activeRadioGroup = isElementType(activeElement, "input", {
    type: "radio"
  }) ? activeElement.name : void 0;
  enabledElements.forEach((currentElement) => {
    const el = currentElement;
    if (isElementType(el, "input", {
      type: "radio"
    }) && el.name) {
      if (el === activeElement) {
        prunedElements.push(el);
        return;
      } else if (el.name === activeRadioGroup) {
        return;
      }
      if (el.checked) {
        prunedElements = prunedElements.filter((e) => !isElementType(e, "input", {
          type: "radio",
          name: el.name
        }));
        prunedElements.push(el);
        checkedRadio[el.name] = el;
        return;
      }
      if (typeof checkedRadio[el.name] !== "undefined") {
        return;
      }
    }
    prunedElements.push(el);
  });
  for (let index2 = prunedElements.findIndex((el) => el === activeElement); ; ) {
    index2 += shift ? -1 : 1;
    if (index2 === prunedElements.length) {
      index2 = 0;
    } else if (index2 === -1) {
      index2 = prunedElements.length - 1;
    }
    if (prunedElements[index2] === activeElement || prunedElements[index2] === document2.body || isVisible(prunedElements[index2])) {
      return prunedElements[index2];
    }
  }
}
function moveSelection(node, direction) {
  if (hasOwnSelection(node)) {
    const selection = getUISelection(node);
    setSelection({
      focusNode: node,
      focusOffset: selection.startOffset === selection.endOffset ? selection.focusOffset + direction : direction < 0 ? selection.startOffset : selection.endOffset
    });
  } else {
    const selection = node.ownerDocument.getSelection();
    if (!(selection === null || selection === void 0 ? void 0 : selection.focusNode)) {
      return;
    }
    if (selection.isCollapsed) {
      const nextPosition = getNextCursorPosition(selection.focusNode, selection.focusOffset, direction);
      if (nextPosition) {
        setSelection({
          focusNode: nextPosition.node,
          focusOffset: nextPosition.offset
        });
      }
    } else {
      selection[direction < 0 ? "collapseToStart" : "collapseToEnd"]();
    }
  }
}
function selectAll(target) {
  if (hasOwnSelection(target)) {
    return setSelection({
      focusNode: target,
      anchorOffset: 0,
      focusOffset: getUIValue(target).length
    });
  }
  var _getContentEditable;
  const focusNode = (_getContentEditable = getContentEditable(target)) !== null && _getContentEditable !== void 0 ? _getContentEditable : target.ownerDocument.body;
  setSelection({
    focusNode,
    anchorOffset: 0,
    focusOffset: focusNode.childNodes.length
  });
}
function isAllSelected(target) {
  if (hasOwnSelection(target)) {
    return getUISelection(target).startOffset === 0 && getUISelection(target).endOffset === getUIValue(target).length;
  }
  var _getContentEditable;
  const focusNode = (_getContentEditable = getContentEditable(target)) !== null && _getContentEditable !== void 0 ? _getContentEditable : target.ownerDocument.body;
  const selection = target.ownerDocument.getSelection();
  return (selection === null || selection === void 0 ? void 0 : selection.anchorNode) === focusNode && selection.focusNode === focusNode && selection.anchorOffset === 0 && selection.focusOffset === focusNode.childNodes.length;
}
function setSelectionRange(element, anchorOffset, focusOffset) {
  var _element_firstChild;
  if (hasOwnSelection(element)) {
    return setSelection({
      focusNode: element,
      anchorOffset,
      focusOffset
    });
  }
  if (isContentEditable(element) && ((_element_firstChild = element.firstChild) === null || _element_firstChild === void 0 ? void 0 : _element_firstChild.nodeType) === 3) {
    return setSelection({
      focusNode: element.firstChild,
      anchorOffset,
      focusOffset
    });
  }
  throw new Error("Not implemented. The result of this interaction is unreliable.");
}
function walkRadio(instance, el, direction) {
  const window2 = getWindow(el);
  const group = Array.from(el.ownerDocument.querySelectorAll(el.name ? `input[type="radio"][name="${window2.CSS.escape(el.name)}"]` : `input[type="radio"][name=""], input[type="radio"]:not([name])`));
  for (let i = group.findIndex((e) => e === el) + direction; ; i += direction) {
    if (!group[i]) {
      i = direction > 0 ? 0 : group.length - 1;
    }
    if (group[i] === el) {
      return;
    }
    if (isDisabled(group[i])) {
      continue;
    }
    focusElement(group[i]);
    instance.dispatchUIEvent(group[i], "click");
  }
}
behavior.keydown = (event, target, instance) => {
  var _keydownBehavior_event_key;
  var _keydownBehavior_event_key1;
  return (_keydownBehavior_event_key1 = (_keydownBehavior_event_key = keydownBehavior[event.key]) === null || _keydownBehavior_event_key === void 0 ? void 0 : _keydownBehavior_event_key.call(keydownBehavior, event, target, instance)) !== null && _keydownBehavior_event_key1 !== void 0 ? _keydownBehavior_event_key1 : combinationBehavior(event, target, instance);
};
const keydownBehavior = {
  ArrowDown: (event, target, instance) => {
    if (isElementType(target, "input", {
      type: "radio"
    })) {
      return () => walkRadio(instance, target, -1);
    }
  },
  ArrowLeft: (event, target, instance) => {
    if (isElementType(target, "input", {
      type: "radio"
    })) {
      return () => walkRadio(instance, target, -1);
    }
    return () => moveSelection(target, -1);
  },
  ArrowRight: (event, target, instance) => {
    if (isElementType(target, "input", {
      type: "radio"
    })) {
      return () => walkRadio(instance, target, 1);
    }
    return () => moveSelection(target, 1);
  },
  ArrowUp: (event, target, instance) => {
    if (isElementType(target, "input", {
      type: "radio"
    })) {
      return () => walkRadio(instance, target, 1);
    }
  },
  Backspace: (event, target, instance) => {
    if (isEditable(target)) {
      return () => {
        input(instance, target, "", "deleteContentBackward");
      };
    }
  },
  Delete: (event, target, instance) => {
    if (isEditable(target)) {
      return () => {
        input(instance, target, "", "deleteContentForward");
      };
    }
  },
  End: (event, target) => {
    if (isElementType(target, [
      "input",
      "textarea"
    ]) || isContentEditable(target)) {
      return () => {
        var _getValueOrTextContent;
        var _getValueOrTextContent_length;
        const newPos = (_getValueOrTextContent_length = (_getValueOrTextContent = getValueOrTextContent(target)) === null || _getValueOrTextContent === void 0 ? void 0 : _getValueOrTextContent.length) !== null && _getValueOrTextContent_length !== void 0 ? _getValueOrTextContent_length : (
          /* istanbul ignore next */
          0
        );
        setSelectionRange(target, newPos, newPos);
      };
    }
  },
  Home: (event, target) => {
    if (isElementType(target, [
      "input",
      "textarea"
    ]) || isContentEditable(target)) {
      return () => {
        setSelectionRange(target, 0, 0);
      };
    }
  },
  PageDown: (event, target) => {
    if (isElementType(target, [
      "input"
    ])) {
      return () => {
        const newPos = getUIValue(target).length;
        setSelectionRange(target, newPos, newPos);
      };
    }
  },
  PageUp: (event, target) => {
    if (isElementType(target, [
      "input"
    ])) {
      return () => {
        setSelectionRange(target, 0, 0);
      };
    }
  },
  Tab: (event, target, instance) => {
    return () => {
      const dest = getTabDestination(target, instance.system.keyboard.modifiers.Shift);
      focusElement(dest);
      if (hasOwnSelection(dest)) {
        setUISelection(dest, {
          anchorOffset: 0,
          focusOffset: dest.value.length
        });
      }
    };
  }
};
const combinationBehavior = (event, target, instance) => {
  if (event.code === "KeyA" && instance.system.keyboard.modifiers.Control) {
    return () => selectAll(target);
  }
};
behavior.keypress = (event, target, instance) => {
  if (event.key === "Enter") {
    if (isElementType(target, "button") || isElementType(target, "input") && ClickInputOnEnter.includes(target.type) || isElementType(target, "a") && Boolean(target.href)) {
      return () => {
        instance.dispatchUIEvent(target, "click");
      };
    } else if (isElementType(target, "input")) {
      const form = target.form;
      const submit = form === null || form === void 0 ? void 0 : form.querySelector('input[type="submit"], button:not([type]), button[type="submit"]');
      if (submit) {
        return () => instance.dispatchUIEvent(submit, "click");
      } else if (form && SubmitSingleInputOnEnter.includes(target.type) && form.querySelectorAll("input").length === 1) {
        return () => instance.dispatchUIEvent(form, "submit");
      } else {
        return;
      }
    }
  }
  if (isEditable(target)) {
    const inputType = event.key === "Enter" ? isContentEditable(target) && !instance.system.keyboard.modifiers.Shift ? "insertParagraph" : "insertLineBreak" : "insertText";
    const inputData = event.key === "Enter" ? "\n" : event.key;
    return () => input(instance, target, inputData, inputType);
  }
};
const ClickInputOnEnter = [
  "button",
  "color",
  "file",
  "image",
  "reset",
  "submit"
];
const SubmitSingleInputOnEnter = [
  "email",
  "month",
  "password",
  "search",
  "tel",
  "text",
  "url",
  "week"
];
behavior.keyup = (event, target, instance) => {
  var _keyupBehavior_event_key;
  return (_keyupBehavior_event_key = keyupBehavior[event.key]) === null || _keyupBehavior_event_key === void 0 ? void 0 : _keyupBehavior_event_key.call(keyupBehavior, event, target, instance);
};
const keyupBehavior = {
  " ": (event, target, instance) => {
    if (isClickableInput(target)) {
      return () => instance.dispatchUIEvent(target, "click");
    }
  }
};
behavior.paste = (event, target, instance) => {
  if (isEditable(target)) {
    return () => {
      var _event_clipboardData;
      const insertData = (_event_clipboardData = event.clipboardData) === null || _event_clipboardData === void 0 ? void 0 : _event_clipboardData.getData("text");
      if (insertData) {
        input(instance, target, insertData, "insertFromPaste");
      }
    };
  }
};
const eventMap = {
  auxclick: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  beforeinput: {
    EventType: "InputEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  click: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  contextmenu: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  copy: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  change: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: false
    }
  },
  cut: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  dblclick: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  keydown: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  keypress: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  keyup: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  paste: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  input: {
    EventType: "InputEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  mousedown: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseenter: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  mouseleave: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false,
      composed: true
    }
  },
  mousemove: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseout: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseover: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  mouseup: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerover: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerenter: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  pointerdown: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointermove: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerup: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointercancel: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: false,
      composed: true
    }
  },
  pointerout: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: true,
      cancelable: true,
      composed: true
    }
  },
  pointerleave: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: false,
      cancelable: false
    }
  },
  submit: {
    EventType: "Event",
    defaultInit: {
      bubbles: true,
      cancelable: true
    }
  }
};
function getEventClass(type2) {
  return eventMap[type2].EventType;
}
const mouseEvents = [
  "MouseEvent",
  "PointerEvent"
];
function isMouseEvent(type2) {
  return mouseEvents.includes(getEventClass(type2));
}
function isKeyboardEvent(type2) {
  return getEventClass(type2) === "KeyboardEvent";
}
const eventInitializer = {
  ClipboardEvent: [
    initClipboardEvent
  ],
  Event: [],
  InputEvent: [
    initUIEvent,
    initInputEvent
  ],
  MouseEvent: [
    initUIEvent,
    initUIEventModififiers,
    initMouseEvent
  ],
  PointerEvent: [
    initUIEvent,
    initUIEventModififiers,
    initMouseEvent,
    initPointerEvent
  ],
  KeyboardEvent: [
    initUIEvent,
    initUIEventModififiers,
    initKeyboardEvent
  ]
};
function createEvent$1(type2, target, init) {
  const window2 = getWindow(target);
  const { EventType, defaultInit } = eventMap[type2];
  const event = new (getEventConstructors(window2))[EventType](type2, defaultInit);
  eventInitializer[EventType].forEach((f) => f(event, init !== null && init !== void 0 ? init : {}));
  return event;
}
function getEventConstructors(window2) {
  var _window_Event;
  const Event = (_window_Event = window2.Event) !== null && _window_Event !== void 0 ? _window_Event : class Event {
  };
  var _window_AnimationEvent;
  const AnimationEvent = (_window_AnimationEvent = window2.AnimationEvent) !== null && _window_AnimationEvent !== void 0 ? _window_AnimationEvent : class AnimationEvent extends Event {
  };
  var _window_ClipboardEvent;
  const ClipboardEvent = (_window_ClipboardEvent = window2.ClipboardEvent) !== null && _window_ClipboardEvent !== void 0 ? _window_ClipboardEvent : class ClipboardEvent extends Event {
  };
  var _window_PopStateEvent;
  const PopStateEvent = (_window_PopStateEvent = window2.PopStateEvent) !== null && _window_PopStateEvent !== void 0 ? _window_PopStateEvent : class PopStateEvent extends Event {
  };
  var _window_ProgressEvent;
  const ProgressEvent = (_window_ProgressEvent = window2.ProgressEvent) !== null && _window_ProgressEvent !== void 0 ? _window_ProgressEvent : class ProgressEvent extends Event {
  };
  var _window_TransitionEvent;
  const TransitionEvent = (_window_TransitionEvent = window2.TransitionEvent) !== null && _window_TransitionEvent !== void 0 ? _window_TransitionEvent : class TransitionEvent extends Event {
  };
  var _window_UIEvent;
  const UIEvent = (_window_UIEvent = window2.UIEvent) !== null && _window_UIEvent !== void 0 ? _window_UIEvent : class UIEvent extends Event {
  };
  var _window_CompositionEvent;
  const CompositionEvent = (_window_CompositionEvent = window2.CompositionEvent) !== null && _window_CompositionEvent !== void 0 ? _window_CompositionEvent : class CompositionEvent extends UIEvent {
  };
  var _window_FocusEvent;
  const FocusEvent = (_window_FocusEvent = window2.FocusEvent) !== null && _window_FocusEvent !== void 0 ? _window_FocusEvent : class FocusEvent extends UIEvent {
  };
  var _window_InputEvent;
  const InputEvent = (_window_InputEvent = window2.InputEvent) !== null && _window_InputEvent !== void 0 ? _window_InputEvent : class InputEvent extends UIEvent {
  };
  var _window_KeyboardEvent;
  const KeyboardEvent = (_window_KeyboardEvent = window2.KeyboardEvent) !== null && _window_KeyboardEvent !== void 0 ? _window_KeyboardEvent : class KeyboardEvent extends UIEvent {
  };
  var _window_MouseEvent;
  const MouseEvent = (_window_MouseEvent = window2.MouseEvent) !== null && _window_MouseEvent !== void 0 ? _window_MouseEvent : class MouseEvent extends UIEvent {
  };
  var _window_DragEvent;
  const DragEvent = (_window_DragEvent = window2.DragEvent) !== null && _window_DragEvent !== void 0 ? _window_DragEvent : class DragEvent extends MouseEvent {
  };
  var _window_PointerEvent;
  const PointerEvent = (_window_PointerEvent = window2.PointerEvent) !== null && _window_PointerEvent !== void 0 ? _window_PointerEvent : class PointerEvent extends MouseEvent {
  };
  var _window_TouchEvent;
  const TouchEvent = (_window_TouchEvent = window2.TouchEvent) !== null && _window_TouchEvent !== void 0 ? _window_TouchEvent : class TouchEvent extends UIEvent {
  };
  return {
    Event,
    AnimationEvent,
    ClipboardEvent,
    PopStateEvent,
    ProgressEvent,
    TransitionEvent,
    UIEvent,
    CompositionEvent,
    FocusEvent,
    InputEvent,
    KeyboardEvent,
    MouseEvent,
    DragEvent,
    PointerEvent,
    TouchEvent
  };
}
function assignProps(obj, props) {
  for (const [key, value] of Object.entries(props)) {
    Object.defineProperty(obj, key, {
      get: () => value !== null && value !== void 0 ? value : null
    });
  }
}
function sanitizeNumber(n) {
  return Number(n !== null && n !== void 0 ? n : 0);
}
function initClipboardEvent(event, { clipboardData }) {
  assignProps(event, {
    clipboardData
  });
}
function initInputEvent(event, { data, inputType, isComposing }) {
  assignProps(event, {
    data,
    isComposing: Boolean(isComposing),
    inputType: String(inputType)
  });
}
function initUIEvent(event, { view, detail }) {
  assignProps(event, {
    view,
    detail: sanitizeNumber(detail !== null && detail !== void 0 ? detail : 0)
  });
}
function initUIEventModififiers(event, { altKey, ctrlKey, metaKey, shiftKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierNumLock, modifierScrollLock, modifierSymbol, modifierSymbolLock }) {
  assignProps(event, {
    altKey: Boolean(altKey),
    ctrlKey: Boolean(ctrlKey),
    metaKey: Boolean(metaKey),
    shiftKey: Boolean(shiftKey),
    getModifierState(k) {
      return Boolean({
        Alt: altKey,
        AltGraph: modifierAltGraph,
        CapsLock: modifierCapsLock,
        Control: ctrlKey,
        Fn: modifierFn,
        FnLock: modifierFnLock,
        Meta: metaKey,
        NumLock: modifierNumLock,
        ScrollLock: modifierScrollLock,
        Shift: shiftKey,
        Symbol: modifierSymbol,
        SymbolLock: modifierSymbolLock
      }[k]);
    }
  });
}
function initKeyboardEvent(event, { key, code, location, repeat, isComposing, charCode }) {
  assignProps(event, {
    key: String(key),
    code: String(code),
    location: sanitizeNumber(location),
    repeat: Boolean(repeat),
    isComposing: Boolean(isComposing),
    charCode
  });
}
function initMouseEvent(event, { x, y, screenX, screenY, clientX = x, clientY = y, button, buttons, relatedTarget }) {
  assignProps(event, {
    screenX: sanitizeNumber(screenX),
    screenY: sanitizeNumber(screenY),
    clientX: sanitizeNumber(clientX),
    x: sanitizeNumber(clientX),
    clientY: sanitizeNumber(clientY),
    y: sanitizeNumber(clientY),
    button: sanitizeNumber(button),
    buttons: sanitizeNumber(buttons),
    relatedTarget
  });
}
function initPointerEvent(event, { pointerId, width, height, pressure, tangentialPressure, tiltX, tiltY, twist, pointerType, isPrimary }) {
  assignProps(event, {
    pointerId: sanitizeNumber(pointerId),
    width: sanitizeNumber(width),
    height: sanitizeNumber(height),
    pressure: sanitizeNumber(pressure),
    tangentialPressure: sanitizeNumber(tangentialPressure),
    tiltX: sanitizeNumber(tiltX),
    tiltY: sanitizeNumber(tiltY),
    twist: sanitizeNumber(twist),
    pointerType: String(pointerType),
    isPrimary: Boolean(isPrimary)
  });
}
function dispatchUIEvent(target, type2, init, preventDefault = false) {
  if (isMouseEvent(type2) || isKeyboardEvent(type2)) {
    init = {
      ...init,
      ...this.system.getUIEventModifiers()
    };
  }
  const event = createEvent$1(type2, target, init);
  return dispatchEvent.call(this, target, event, preventDefault);
}
function dispatchEvent(target, event, preventDefault = false) {
  var _behavior_type;
  const type2 = event.type;
  const behaviorImplementation = preventDefault ? () => {
  } : (_behavior_type = behavior[type2]) === null || _behavior_type === void 0 ? void 0 : _behavior_type.call(behavior, event, target, this);
  if (behaviorImplementation) {
    event.preventDefault();
    let defaultPrevented = false;
    Object.defineProperty(event, "defaultPrevented", {
      get: () => defaultPrevented
    });
    Object.defineProperty(event, "preventDefault", {
      value: () => {
        defaultPrevented = event.cancelable;
      }
    });
    wrapEvent(() => target.dispatchEvent(event));
    if (!defaultPrevented) {
      behaviorImplementation();
    }
    return !defaultPrevented;
  }
  return wrapEvent(() => target.dispatchEvent(event));
}
function dispatchDOMEvent(target, type2, init) {
  const event = createEvent$1(type2, target, init);
  wrapEvent(() => target.dispatchEvent(event));
}
const Interceptor = Symbol("Interceptor for programmatical calls");
function prepareInterceptor(element, propName, interceptorImpl) {
  const prototypeDescriptor = Object.getOwnPropertyDescriptor(element.constructor.prototype, propName);
  const objectDescriptor = Object.getOwnPropertyDescriptor(element, propName);
  const target = (prototypeDescriptor === null || prototypeDescriptor === void 0 ? void 0 : prototypeDescriptor.set) ? "set" : "value";
  if (typeof (prototypeDescriptor === null || prototypeDescriptor === void 0 ? void 0 : prototypeDescriptor[target]) !== "function" || prototypeDescriptor[target][Interceptor]) {
    throw new Error(`Element ${element.tagName} does not implement "${String(propName)}".`);
  }
  function intercept(...args) {
    const { applyNative = false, realArgs, then } = interceptorImpl.call(this, ...args);
    const realFunc = (!applyNative && objectDescriptor || prototypeDescriptor)[target];
    if (target === "set") {
      realFunc.call(this, realArgs);
    } else {
      realFunc.call(this, ...realArgs);
    }
    then === null || then === void 0 ? void 0 : then();
  }
  intercept[Interceptor] = Interceptor;
  Object.defineProperty(element, propName, {
    ...objectDescriptor !== null && objectDescriptor !== void 0 ? objectDescriptor : prototypeDescriptor,
    [target]: intercept
  });
}
function prepareValueInterceptor(element) {
  prepareInterceptor(element, "value", function interceptorImpl(v) {
    const isUI = isUIValue(v);
    if (isUI) {
      startTrackValue(this);
    }
    return {
      applyNative: !!isUI,
      realArgs: sanitizeValue(this, v),
      then: isUI ? void 0 : () => trackOrSetValue(this, String(v))
    };
  });
}
function sanitizeValue(element, v) {
  if (isElementType(element, "input", {
    type: "number"
  }) && String(v) !== "" && !Number.isNaN(Number(v))) {
    return String(Number(v));
  }
  return String(v);
}
function prepareSelectionInterceptor(element) {
  prepareInterceptor(element, "setSelectionRange", function interceptorImpl(start, ...others) {
    const isUI = isUISelectionStart(start);
    return {
      applyNative: !!isUI,
      realArgs: [
        Number(start),
        ...others
      ],
      then: () => isUI ? void 0 : setUISelectionClean(element)
    };
  });
  prepareInterceptor(element, "selectionStart", function interceptorImpl(v) {
    return {
      realArgs: v,
      then: () => setUISelectionClean(element)
    };
  });
  prepareInterceptor(element, "selectionEnd", function interceptorImpl(v) {
    return {
      realArgs: v,
      then: () => setUISelectionClean(element)
    };
  });
  prepareInterceptor(element, "select", function interceptorImpl() {
    return {
      realArgs: [],
      then: () => setUISelectionRaw(element, {
        anchorOffset: 0,
        focusOffset: getUIValue(element).length
      })
    };
  });
}
function prepareRangeTextInterceptor(element) {
  prepareInterceptor(element, "setRangeText", function interceptorImpl(...realArgs) {
    return {
      realArgs,
      then: () => {
        setUIValueClean(element);
        setUISelectionClean(element);
      }
    };
  });
}
const isPrepared = Symbol("Node prepared with document state workarounds");
function prepareDocument(document2) {
  if (document2[isPrepared]) {
    return;
  }
  document2.addEventListener("focus", (e) => {
    const el = e.target;
    prepareElement(el);
  }, {
    capture: true,
    passive: true
  });
  if (document2.activeElement) {
    prepareElement(document2.activeElement);
  }
  document2.addEventListener("blur", (e) => {
    const el = e.target;
    const initialValue2 = getInitialValue(el);
    if (initialValue2 !== void 0) {
      if (el.value !== initialValue2) {
        dispatchDOMEvent(el, "change");
      }
      clearInitialValue(el);
    }
  }, {
    capture: true,
    passive: true
  });
  document2[isPrepared] = isPrepared;
}
function prepareElement(el) {
  if (el[isPrepared]) {
    return;
  }
  if (isElementType(el, [
    "input",
    "textarea"
  ])) {
    prepareValueInterceptor(el);
    prepareSelectionInterceptor(el);
    prepareRangeTextInterceptor(el);
  }
  el[isPrepared] = isPrepared;
}
function getDocumentFromNode(el) {
  return isDocument(el) ? el : el.ownerDocument;
}
function isDocument(node) {
  return node.nodeType === 9;
}
function wait$1(config2) {
  const delay = config2.delay;
  if (typeof delay !== "number") {
    return;
  }
  return Promise.all([
    new Promise((resolve) => globalThis.setTimeout(() => resolve(), delay)),
    config2.advanceTimers(delay)
  ]);
}
function _define_property$6(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var DOM_KEY_LOCATION;
(function(DOM_KEY_LOCATION2) {
  DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["STANDARD"] = 0] = "STANDARD";
  DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["LEFT"] = 1] = "LEFT";
  DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["RIGHT"] = 2] = "RIGHT";
  DOM_KEY_LOCATION2[DOM_KEY_LOCATION2["NUMPAD"] = 3] = "NUMPAD";
})(DOM_KEY_LOCATION || (DOM_KEY_LOCATION = {}));
const modifierKeys = [
  "Alt",
  "AltGraph",
  "Control",
  "Fn",
  "Meta",
  "Shift",
  "Symbol"
];
function isModifierKey(key) {
  return modifierKeys.includes(key);
}
const modifierLocks = [
  "CapsLock",
  "FnLock",
  "NumLock",
  "ScrollLock",
  "SymbolLock"
];
function isModifierLock(key) {
  return modifierLocks.includes(key);
}
class KeyboardHost {
  isKeyPressed(keyDef) {
    return !!this.pressed[String(keyDef.code)];
  }
  getPressedKeys() {
    return Object.values(this.pressed).map((p) => p.keyDef);
  }
  /** Press a key */
  async keydown(instance, keyDef) {
    var _this_pressed, _code, _this_pressed_code;
    const key = String(keyDef.key);
    const code = String(keyDef.code);
    const target = getActiveElementOrBody(instance.config.document);
    this.setKeydownTarget(target);
    var _;
    (_ = (_this_pressed = this.pressed)[_code = code]) !== null && _ !== void 0 ? _ : _this_pressed[_code] = {
      keyDef,
      unpreventedDefault: false
    };
    if (isModifierKey(key)) {
      this.modifiers[key] = true;
    }
    const unprevented = instance.dispatchUIEvent(target, "keydown", {
      key,
      code
    });
    if (isModifierLock(key) && !this.modifiers[key]) {
      this.modifiers[key] = true;
      this.modifierLockStart[key] = true;
    }
    (_this_pressed_code = this.pressed[code]).unpreventedDefault || (_this_pressed_code.unpreventedDefault = unprevented);
    if (unprevented && this.hasKeyPress(key)) {
      instance.dispatchUIEvent(getActiveElementOrBody(instance.config.document), "keypress", {
        key,
        code,
        charCode: keyDef.key === "Enter" ? 13 : String(keyDef.key).charCodeAt(0)
      });
    }
  }
  /** Release a key */
  async keyup(instance, keyDef) {
    const key = String(keyDef.key);
    const code = String(keyDef.code);
    const unprevented = this.pressed[code].unpreventedDefault;
    delete this.pressed[code];
    if (isModifierKey(key) && !Object.values(this.pressed).find((p) => p.keyDef.key === key)) {
      this.modifiers[key] = false;
    }
    instance.dispatchUIEvent(getActiveElementOrBody(instance.config.document), "keyup", {
      key,
      code
    }, !unprevented);
    if (isModifierLock(key) && this.modifiers[key]) {
      if (this.modifierLockStart[key]) {
        this.modifierLockStart[key] = false;
      } else {
        this.modifiers[key] = false;
      }
    }
  }
  setKeydownTarget(target) {
    if (target !== this.lastKeydownTarget) {
      this.carryChar = "";
    }
    this.lastKeydownTarget = target;
  }
  hasKeyPress(key) {
    return (key.length === 1 || key === "Enter") && !this.modifiers.Control && !this.modifiers.Alt;
  }
  constructor(system) {
    _define_property$6(this, "system", void 0);
    _define_property$6(this, "modifiers", {
      Alt: false,
      AltGraph: false,
      CapsLock: false,
      Control: false,
      Fn: false,
      FnLock: false,
      Meta: false,
      NumLock: false,
      ScrollLock: false,
      Shift: false,
      Symbol: false,
      SymbolLock: false
    });
    _define_property$6(this, "pressed", {});
    _define_property$6(this, "carryChar", "");
    _define_property$6(this, "lastKeydownTarget", void 0);
    _define_property$6(this, "modifierLockStart", {});
    this.system = system;
  }
}
const defaultKeyMap$1 = [
  // alphanumeric keys
  ..."0123456789".split("").map((c) => ({
    code: `Digit${c}`,
    key: c
  })),
  ...")!@#$%^&*(".split("").map((c, i) => ({
    code: `Digit${i}`,
    key: c,
    shiftKey: true
  })),
  ..."abcdefghijklmnopqrstuvwxyz".split("").map((c) => ({
    code: `Key${c.toUpperCase()}`,
    key: c
  })),
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => ({
    code: `Key${c}`,
    key: c,
    shiftKey: true
  })),
  // alphanumeric block - functional
  {
    code: "Space",
    key: " "
  },
  {
    code: "AltLeft",
    key: "Alt",
    location: DOM_KEY_LOCATION.LEFT
  },
  {
    code: "AltRight",
    key: "Alt",
    location: DOM_KEY_LOCATION.RIGHT
  },
  {
    code: "ShiftLeft",
    key: "Shift",
    location: DOM_KEY_LOCATION.LEFT
  },
  {
    code: "ShiftRight",
    key: "Shift",
    location: DOM_KEY_LOCATION.RIGHT
  },
  {
    code: "ControlLeft",
    key: "Control",
    location: DOM_KEY_LOCATION.LEFT
  },
  {
    code: "ControlRight",
    key: "Control",
    location: DOM_KEY_LOCATION.RIGHT
  },
  {
    code: "MetaLeft",
    key: "Meta",
    location: DOM_KEY_LOCATION.LEFT
  },
  {
    code: "MetaRight",
    key: "Meta",
    location: DOM_KEY_LOCATION.RIGHT
  },
  {
    code: "OSLeft",
    key: "OS",
    location: DOM_KEY_LOCATION.LEFT
  },
  {
    code: "OSRight",
    key: "OS",
    location: DOM_KEY_LOCATION.RIGHT
  },
  {
    code: "Tab",
    key: "Tab"
  },
  {
    code: "CapsLock",
    key: "CapsLock"
  },
  {
    code: "Backspace",
    key: "Backspace"
  },
  {
    code: "Enter",
    key: "Enter"
  },
  // function
  {
    code: "Escape",
    key: "Escape"
  },
  // arrows
  {
    code: "ArrowUp",
    key: "ArrowUp"
  },
  {
    code: "ArrowDown",
    key: "ArrowDown"
  },
  {
    code: "ArrowLeft",
    key: "ArrowLeft"
  },
  {
    code: "ArrowRight",
    key: "ArrowRight"
  },
  // control pad
  {
    code: "Home",
    key: "Home"
  },
  {
    code: "End",
    key: "End"
  },
  {
    code: "Delete",
    key: "Delete"
  },
  {
    code: "PageUp",
    key: "PageUp"
  },
  {
    code: "PageDown",
    key: "PageDown"
  },
  // Special keys that are not part of a default US-layout but included for specific behavior
  {
    code: "Fn",
    key: "Fn"
  },
  {
    code: "Symbol",
    key: "Symbol"
  },
  {
    code: "AltRight",
    key: "AltGraph"
  }
];
const defaultKeyMap = [
  {
    name: "MouseLeft",
    pointerType: "mouse",
    button: "primary"
  },
  {
    name: "MouseRight",
    pointerType: "mouse",
    button: "secondary"
  },
  {
    name: "MouseMiddle",
    pointerType: "mouse",
    button: "auxiliary"
  },
  {
    name: "TouchA",
    pointerType: "touch"
  },
  {
    name: "TouchB",
    pointerType: "touch"
  },
  {
    name: "TouchC",
    pointerType: "touch"
  }
];
function _define_property$5(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class Buttons {
  getButtons() {
    let v = 0;
    for (const button of Object.keys(this.pressed)) {
      v |= 2 ** Number(button);
    }
    return v;
  }
  down(keyDef) {
    const button = getMouseButtonId(keyDef.button);
    if (button in this.pressed) {
      this.pressed[button].push(keyDef);
      return void 0;
    }
    this.pressed[button] = [
      keyDef
    ];
    return button;
  }
  up(keyDef) {
    const button = getMouseButtonId(keyDef.button);
    if (button in this.pressed) {
      this.pressed[button] = this.pressed[button].filter((k) => k.name !== keyDef.name);
      if (this.pressed[button].length === 0) {
        delete this.pressed[button];
        return button;
      }
    }
    return void 0;
  }
  constructor() {
    _define_property$5(this, "pressed", {});
  }
}
const MouseButton = {
  primary: 0,
  secondary: 1,
  auxiliary: 2,
  back: 3,
  X1: 3,
  forward: 4,
  X2: 4
};
function getMouseButtonId(button = 0) {
  if (button in MouseButton) {
    return MouseButton[button];
  }
  return Number(button);
}
const MouseButtonFlip = {
  1: 2,
  2: 1
};
function getMouseEventButton(button) {
  button = getMouseButtonId(button);
  if (button in MouseButtonFlip) {
    return MouseButtonFlip[button];
  }
  return button;
}
function _define_property$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class Device {
  get countPressed() {
    return this.pressedKeys.size;
  }
  isPressed(keyDef) {
    return this.pressedKeys.has(keyDef.name);
  }
  addPressed(keyDef) {
    return this.pressedKeys.add(keyDef.name);
  }
  removePressed(keyDef) {
    return this.pressedKeys.delete(keyDef.name);
  }
  constructor() {
    _define_property$4(this, "pressedKeys", /* @__PURE__ */ new Set());
  }
}
function getTreeDiff(a, b) {
  const treeA = [];
  for (let el = a; el; el = el.parentElement) {
    treeA.push(el);
  }
  const treeB = [];
  for (let el = b; el; el = el.parentElement) {
    treeB.push(el);
  }
  let i = 0;
  for (; ; i++) {
    if (i >= treeA.length || i >= treeB.length || treeA[treeA.length - 1 - i] !== treeB[treeB.length - 1 - i]) {
      break;
    }
  }
  return [
    treeA.slice(0, treeA.length - i),
    treeB.slice(0, treeB.length - i),
    treeB.slice(treeB.length - i)
  ];
}
function resolveCaretPosition({ target, node, offset }) {
  if (hasOwnSelection(target)) {
    return {
      node: target,
      offset: offset !== null && offset !== void 0 ? offset : getUIValue(target).length
    };
  } else if (node) {
    return {
      node,
      offset: offset !== null && offset !== void 0 ? offset : node.nodeType === 3 ? node.nodeValue.length : node.childNodes.length
    };
  }
  return findNodeAtTextOffset(target, offset);
}
function findNodeAtTextOffset(node, offset, isRoot = true) {
  let i = offset === void 0 ? node.childNodes.length - 1 : 0;
  const step = offset === void 0 ? -1 : 1;
  while (offset === void 0 ? i >= (isRoot ? Math.max(node.childNodes.length - 1, 0) : 0) : i <= node.childNodes.length) {
    if (offset && i === node.childNodes.length) {
      throw new Error("The given offset is out of bounds.");
    }
    const c = node.childNodes.item(i);
    const text = String(c.textContent);
    if (text.length) {
      if (offset !== void 0 && text.length < offset) {
        offset -= text.length;
      } else if (c.nodeType === 1) {
        return findNodeAtTextOffset(c, offset, false);
      } else {
        if (c.nodeType === 3) {
          return {
            node: c,
            offset: offset !== null && offset !== void 0 ? offset : c.nodeValue.length
          };
        }
      }
    }
    i += step;
  }
  return {
    node,
    offset: node.childNodes.length
  };
}
function setSelectionPerMouseDown({ document: document2, target, clickCount, node, offset }) {
  if (hasNoSelection(target)) {
    return;
  }
  const targetHasOwnSelection = hasOwnSelection(target);
  const text = String(targetHasOwnSelection ? getUIValue(target) : target.textContent);
  const [start, end] = node ? (
    // which elements might be considered in the same line of text.
    // TODO: support expanding initial range on multiple clicks if node is given
    [
      offset,
      offset
    ]
  ) : getTextRange(text, offset, clickCount);
  if (targetHasOwnSelection) {
    setUISelection(target, {
      anchorOffset: start !== null && start !== void 0 ? start : text.length,
      focusOffset: end !== null && end !== void 0 ? end : text.length
    });
    return {
      node: target,
      start: start !== null && start !== void 0 ? start : 0,
      end: end !== null && end !== void 0 ? end : text.length
    };
  } else {
    const { node: startNode, offset: startOffset } = resolveCaretPosition({
      target,
      node,
      offset: start
    });
    const { node: endNode, offset: endOffset } = resolveCaretPosition({
      target,
      node,
      offset: end
    });
    const range = target.ownerDocument.createRange();
    try {
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
    } catch (e) {
      throw new Error("The given offset is out of bounds.");
    }
    const selection = document2.getSelection();
    selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
    selection === null || selection === void 0 ? void 0 : selection.addRange(range.cloneRange());
    return range;
  }
}
function getTextRange(text, pos, clickCount) {
  if (clickCount % 3 === 1 || text.length === 0) {
    return [
      pos,
      pos
    ];
  }
  const textPos = pos !== null && pos !== void 0 ? pos : text.length;
  if (clickCount % 3 === 2) {
    return [
      textPos - text.substr(0, pos).match(/(\w+|\s+|\W)?$/)[0].length,
      pos === void 0 ? pos : pos + text.substr(pos).match(/^(\w+|\s+|\W)?/)[0].length
    ];
  }
  return [
    textPos - text.substr(0, pos).match(/[^\r\n]*$/)[0].length,
    pos === void 0 ? pos : pos + text.substr(pos).match(/^[^\r\n]*/)[0].length
  ];
}
function modifySelectionPerMouseMove(selectionRange, { document: document2, target, node, offset }) {
  const selectionFocus = resolveCaretPosition({
    target,
    node,
    offset
  });
  if ("node" in selectionRange) {
    if (selectionFocus.node === selectionRange.node) {
      const anchorOffset = selectionFocus.offset < selectionRange.start ? selectionRange.end : selectionRange.start;
      const focusOffset = selectionFocus.offset > selectionRange.end || selectionFocus.offset < selectionRange.start ? selectionFocus.offset : selectionRange.end;
      setUISelection(selectionRange.node, {
        anchorOffset,
        focusOffset
      });
    }
  } else {
    const range = selectionRange.cloneRange();
    const cmp = range.comparePoint(selectionFocus.node, selectionFocus.offset);
    if (cmp < 0) {
      range.setStart(selectionFocus.node, selectionFocus.offset);
    } else if (cmp > 0) {
      range.setEnd(selectionFocus.node, selectionFocus.offset);
    }
    const selection = document2.getSelection();
    selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
    selection === null || selection === void 0 ? void 0 : selection.addRange(range.cloneRange());
  }
}
function isDifferentPointerPosition(positionA, positionB) {
  var _positionA_coords, _positionB_coords, _positionA_coords1, _positionB_coords1, _positionA_caret, _positionB_caret, _positionA_caret1, _positionB_caret1;
  return positionA.target !== positionB.target || ((_positionA_coords = positionA.coords) === null || _positionA_coords === void 0 ? void 0 : _positionA_coords.x) !== ((_positionB_coords = positionB.coords) === null || _positionB_coords === void 0 ? void 0 : _positionB_coords.y) || ((_positionA_coords1 = positionA.coords) === null || _positionA_coords1 === void 0 ? void 0 : _positionA_coords1.y) !== ((_positionB_coords1 = positionB.coords) === null || _positionB_coords1 === void 0 ? void 0 : _positionB_coords1.y) || ((_positionA_caret = positionA.caret) === null || _positionA_caret === void 0 ? void 0 : _positionA_caret.node) !== ((_positionB_caret = positionB.caret) === null || _positionB_caret === void 0 ? void 0 : _positionB_caret.node) || ((_positionA_caret1 = positionA.caret) === null || _positionA_caret1 === void 0 ? void 0 : _positionA_caret1.offset) !== ((_positionB_caret1 = positionB.caret) === null || _positionB_caret1 === void 0 ? void 0 : _positionB_caret1.offset);
}
function _define_property$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class Mouse {
  move(instance, position) {
    const prevPosition = this.position;
    const prevTarget = this.getTarget(instance);
    this.position = position;
    if (!isDifferentPointerPosition(prevPosition, position)) {
      return;
    }
    const nextTarget = this.getTarget(instance);
    const init = this.getEventInit("mousemove");
    const [leave, enter] = getTreeDiff(prevTarget, nextTarget);
    return {
      leave: () => {
        if (prevTarget !== nextTarget) {
          instance.dispatchUIEvent(prevTarget, "mouseout", init);
          leave.forEach((el) => instance.dispatchUIEvent(el, "mouseleave", init));
        }
      },
      enter: () => {
        if (prevTarget !== nextTarget) {
          instance.dispatchUIEvent(nextTarget, "mouseover", init);
          enter.forEach((el) => instance.dispatchUIEvent(el, "mouseenter", init));
        }
      },
      move: () => {
        instance.dispatchUIEvent(nextTarget, "mousemove", init);
        this.modifySelecting(instance);
      }
    };
  }
  down(instance, keyDef, pointer2) {
    const button = this.buttons.down(keyDef);
    if (button === void 0) {
      return;
    }
    const target = this.getTarget(instance);
    this.buttonDownTarget[button] = target;
    const disabled = isDisabled(target);
    const init = this.getEventInit("mousedown", keyDef.button);
    if (disabled || instance.dispatchUIEvent(target, "mousedown", init)) {
      this.startSelecting(instance, init.detail);
      focusElement(target);
    }
    if (!disabled && getMouseEventButton(keyDef.button) === 2) {
      instance.dispatchUIEvent(target, "contextmenu", this.getEventInit("contextmenu", keyDef.button, pointer2));
    }
  }
  up(instance, keyDef, pointer2) {
    const button = this.buttons.up(keyDef);
    if (button === void 0) {
      return;
    }
    const target = this.getTarget(instance);
    if (!isDisabled(target)) {
      instance.dispatchUIEvent(target, "mouseup", this.getEventInit("mouseup", keyDef.button));
      this.endSelecting();
      const clickTarget = getTreeDiff(this.buttonDownTarget[button], target)[2][0];
      if (clickTarget) {
        const init = this.getEventInit("click", keyDef.button, pointer2);
        if (init.detail) {
          instance.dispatchUIEvent(clickTarget, init.button === 0 ? "click" : "auxclick", init);
          if (init.button === 0 && init.detail === 2) {
            instance.dispatchUIEvent(clickTarget, "dblclick", {
              ...this.getEventInit("dblclick", keyDef.button),
              detail: init.detail
            });
          }
        }
      }
    }
  }
  resetClickCount() {
    this.clickCount.reset();
  }
  getEventInit(type2, button, pointer2) {
    const init = {
      ...this.position.coords
    };
    if (pointer2) {
      init.pointerId = pointer2.pointerId;
      init.pointerType = pointer2.pointerType;
      init.isPrimary = pointer2.isPrimary;
    }
    init.button = getMouseEventButton(button);
    init.buttons = this.buttons.getButtons();
    if (type2 === "mousedown") {
      init.detail = this.clickCount.getOnDown(init.button);
    } else if (type2 === "mouseup") {
      init.detail = this.clickCount.getOnUp(init.button);
    } else if (type2 === "click" || type2 === "auxclick") {
      init.detail = this.clickCount.incOnClick(init.button);
    }
    return init;
  }
  getTarget(instance) {
    var _this_position_target;
    return (_this_position_target = this.position.target) !== null && _this_position_target !== void 0 ? _this_position_target : instance.config.document.body;
  }
  startSelecting(instance, clickCount) {
    var _this_position_caret, _this_position_caret1;
    this.selecting = setSelectionPerMouseDown({
      document: instance.config.document,
      target: this.getTarget(instance),
      node: (_this_position_caret = this.position.caret) === null || _this_position_caret === void 0 ? void 0 : _this_position_caret.node,
      offset: (_this_position_caret1 = this.position.caret) === null || _this_position_caret1 === void 0 ? void 0 : _this_position_caret1.offset,
      clickCount
    });
  }
  modifySelecting(instance) {
    var _this_position_caret, _this_position_caret1;
    if (!this.selecting) {
      return;
    }
    modifySelectionPerMouseMove(this.selecting, {
      document: instance.config.document,
      target: this.getTarget(instance),
      node: (_this_position_caret = this.position.caret) === null || _this_position_caret === void 0 ? void 0 : _this_position_caret.node,
      offset: (_this_position_caret1 = this.position.caret) === null || _this_position_caret1 === void 0 ? void 0 : _this_position_caret1.offset
    });
  }
  endSelecting() {
    this.selecting = void 0;
  }
  constructor() {
    _define_property$3(this, "position", {});
    _define_property$3(this, "buttons", new Buttons());
    _define_property$3(this, "selecting", void 0);
    _define_property$3(this, "buttonDownTarget", {});
    _define_property$3(this, "clickCount", new class {
      incOnClick(button) {
        const current = this.down[button] === void 0 ? void 0 : Number(this.down[button]) + 1;
        this.count = this.count[button] === void 0 ? {} : {
          [button]: Number(this.count[button]) + 1
        };
        return current;
      }
      getOnDown(button) {
        var _this_count_button;
        this.down = {
          [button]: (_this_count_button = this.count[button]) !== null && _this_count_button !== void 0 ? _this_count_button : 0
        };
        var _this_count_button1;
        this.count = {
          [button]: (_this_count_button1 = this.count[button]) !== null && _this_count_button1 !== void 0 ? _this_count_button1 : 0
        };
        return Number(this.count[button]) + 1;
      }
      getOnUp(button) {
        return this.down[button] === void 0 ? void 0 : Number(this.down[button]) + 1;
      }
      reset() {
        this.count = {};
      }
      constructor() {
        _define_property$3(this, "down", {});
        _define_property$3(this, "count", {});
      }
    }());
  }
}
function hasPointerEvents(instance, element) {
  var _checkPointerEvents;
  return ((_checkPointerEvents = checkPointerEvents(instance, element)) === null || _checkPointerEvents === void 0 ? void 0 : _checkPointerEvents.pointerEvents) !== "none";
}
function closestPointerEventsDeclaration(element) {
  const window2 = getWindow(element);
  for (let el = element, tree = []; el === null || el === void 0 ? void 0 : el.ownerDocument; el = el.parentElement) {
    tree.push(el);
    const pointerEvents = window2.getComputedStyle(el).pointerEvents;
    if (pointerEvents && ![
      "inherit",
      "unset"
    ].includes(pointerEvents)) {
      return {
        pointerEvents,
        tree
      };
    }
  }
  return void 0;
}
const PointerEventsCheck = Symbol("Last check for pointer-events");
function checkPointerEvents(instance, element) {
  const lastCheck = element[PointerEventsCheck];
  const needsCheck = instance.config.pointerEventsCheck !== PointerEventsCheckLevel.Never && (!lastCheck || hasBitFlag(instance.config.pointerEventsCheck, PointerEventsCheckLevel.EachApiCall) && lastCheck[ApiLevel.Call] !== getLevelRef(instance, ApiLevel.Call) || hasBitFlag(instance.config.pointerEventsCheck, PointerEventsCheckLevel.EachTrigger) && lastCheck[ApiLevel.Trigger] !== getLevelRef(instance, ApiLevel.Trigger));
  if (!needsCheck) {
    return lastCheck === null || lastCheck === void 0 ? void 0 : lastCheck.result;
  }
  const declaration = closestPointerEventsDeclaration(element);
  element[PointerEventsCheck] = {
    [ApiLevel.Call]: getLevelRef(instance, ApiLevel.Call),
    [ApiLevel.Trigger]: getLevelRef(instance, ApiLevel.Trigger),
    result: declaration
  };
  return declaration;
}
function assertPointerEvents(instance, element) {
  const declaration = checkPointerEvents(instance, element);
  if ((declaration === null || declaration === void 0 ? void 0 : declaration.pointerEvents) === "none") {
    throw new Error([
      `Unable to perform pointer interaction as the element ${declaration.tree.length > 1 ? "inherits" : "has"} \`pointer-events: none\`:`,
      "",
      printTree(declaration.tree)
    ].join("\n"));
  }
}
function printTree(tree) {
  return tree.reverse().map((el, i) => [
    "".padEnd(i),
    el.tagName,
    el.id && `#${el.id}`,
    el.hasAttribute("data-testid") && `(testId=${el.getAttribute("data-testid")})`,
    getLabelDescr(el),
    tree.length > 1 && i === 0 && "  <-- This element declared `pointer-events: none`",
    tree.length > 1 && i === tree.length - 1 && "  <-- Asserted pointer events here"
  ].filter(Boolean).join("")).join("\n");
}
function getLabelDescr(element) {
  var _element_labels;
  let label;
  if (element.hasAttribute("aria-label")) {
    label = element.getAttribute("aria-label");
  } else if (element.hasAttribute("aria-labelledby")) {
    var _element_ownerDocument_getElementById_textContent, _element_ownerDocument_getElementById;
    label = (_element_ownerDocument_getElementById = element.ownerDocument.getElementById(element.getAttribute("aria-labelledby"))) === null || _element_ownerDocument_getElementById === void 0 ? void 0 : (_element_ownerDocument_getElementById_textContent = _element_ownerDocument_getElementById.textContent) === null || _element_ownerDocument_getElementById_textContent === void 0 ? void 0 : _element_ownerDocument_getElementById_textContent.trim();
  } else if (isElementType(element, [
    "button",
    "input",
    "meter",
    "output",
    "progress",
    "select",
    "textarea"
  ]) && ((_element_labels = element.labels) === null || _element_labels === void 0 ? void 0 : _element_labels.length)) {
    label = Array.from(element.labels).map((el) => {
      var _el_textContent;
      return (_el_textContent = el.textContent) === null || _el_textContent === void 0 ? void 0 : _el_textContent.trim();
    }).join("|");
  } else if (isElementType(element, "button")) {
    var _element_textContent;
    label = (_element_textContent = element.textContent) === null || _element_textContent === void 0 ? void 0 : _element_textContent.trim();
  }
  label = label === null || label === void 0 ? void 0 : label.replace(/\n/g, "  ");
  if (Number(label === null || label === void 0 ? void 0 : label.length) > 30) {
    label = `${label === null || label === void 0 ? void 0 : label.substring(0, 29)}…`;
  }
  return label ? `(label=${label})` : "";
}
function hasBitFlag(conf, flag) {
  return (conf & flag) > 0;
}
function _define_property$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class Pointer {
  init(instance, position) {
    this.position = position;
    const target = this.getTarget(instance);
    const [, enter] = getTreeDiff(null, target);
    const init = this.getEventInit();
    assertPointerEvents(instance, target);
    instance.dispatchUIEvent(target, "pointerover", init);
    enter.forEach((el) => instance.dispatchUIEvent(el, "pointerenter", init));
    return this;
  }
  move(instance, position) {
    const prevPosition = this.position;
    const prevTarget = this.getTarget(instance);
    this.position = position;
    if (!isDifferentPointerPosition(prevPosition, position)) {
      return;
    }
    const nextTarget = this.getTarget(instance);
    const init = this.getEventInit();
    const [leave, enter] = getTreeDiff(prevTarget, nextTarget);
    return {
      leave: () => {
        if (hasPointerEvents(instance, prevTarget)) {
          if (prevTarget !== nextTarget) {
            instance.dispatchUIEvent(prevTarget, "pointerout", init);
            leave.forEach((el) => instance.dispatchUIEvent(el, "pointerleave", init));
          }
        }
      },
      enter: () => {
        assertPointerEvents(instance, nextTarget);
        if (prevTarget !== nextTarget) {
          instance.dispatchUIEvent(nextTarget, "pointerover", init);
          enter.forEach((el) => instance.dispatchUIEvent(el, "pointerenter", init));
        }
      },
      move: () => {
        instance.dispatchUIEvent(nextTarget, "pointermove", init);
      }
    };
  }
  down(instance, _keyDef) {
    if (this.isDown) {
      return;
    }
    const target = this.getTarget(instance);
    assertPointerEvents(instance, target);
    this.isDown = true;
    this.isPrevented = !instance.dispatchUIEvent(target, "pointerdown", this.getEventInit());
  }
  up(instance, _keyDef) {
    if (!this.isDown) {
      return;
    }
    const target = this.getTarget(instance);
    assertPointerEvents(instance, target);
    this.isDown = false;
    instance.dispatchUIEvent(target, "pointerup", this.getEventInit());
  }
  release(instance) {
    const target = this.getTarget(instance);
    const [leave] = getTreeDiff(target, null);
    const init = this.getEventInit();
    if (hasPointerEvents(instance, target)) {
      instance.dispatchUIEvent(target, "pointerout", init);
      leave.forEach((el) => instance.dispatchUIEvent(el, "pointerleave", init));
    }
    this.isCancelled = true;
  }
  getTarget(instance) {
    var _this_position_target;
    return (_this_position_target = this.position.target) !== null && _this_position_target !== void 0 ? _this_position_target : instance.config.document.body;
  }
  getEventInit() {
    return {
      ...this.position.coords,
      pointerId: this.pointerId,
      pointerType: this.pointerType,
      isPrimary: this.isPrimary
    };
  }
  constructor({ pointerId, pointerType, isPrimary }) {
    _define_property$2(this, "pointerId", void 0);
    _define_property$2(this, "pointerType", void 0);
    _define_property$2(this, "isPrimary", void 0);
    _define_property$2(this, "isMultitouch", false);
    _define_property$2(this, "isCancelled", false);
    _define_property$2(this, "isDown", false);
    _define_property$2(this, "isPrevented", false);
    _define_property$2(this, "position", {});
    this.pointerId = pointerId;
    this.pointerType = pointerType;
    this.isPrimary = isPrimary;
    this.isMultitouch = !isPrimary;
  }
}
function _define_property$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class PointerHost {
  isKeyPressed(keyDef) {
    return this.devices.get(keyDef.pointerType).isPressed(keyDef);
  }
  async press(instance, keyDef, position) {
    const pointerName = this.getPointerName(keyDef);
    const pointer2 = keyDef.pointerType === "touch" ? this.pointers.new(pointerName, keyDef).init(instance, position) : this.pointers.get(pointerName);
    pointer2.position = position;
    if (pointer2.pointerType !== "touch") {
      this.mouse.position = position;
    }
    this.devices.get(keyDef.pointerType).addPressed(keyDef);
    this.buttons.down(keyDef);
    pointer2.down(instance, keyDef);
    if (pointer2.pointerType !== "touch" && !pointer2.isPrevented) {
      this.mouse.down(instance, keyDef, pointer2);
    }
  }
  async move(instance, pointerName, position) {
    const pointer2 = this.pointers.get(pointerName);
    const pointermove = pointer2.move(instance, position);
    const mousemove = pointer2.pointerType === "touch" || pointer2.isPrevented && pointer2.isDown ? void 0 : this.mouse.move(instance, position);
    pointermove === null || pointermove === void 0 ? void 0 : pointermove.leave();
    mousemove === null || mousemove === void 0 ? void 0 : mousemove.leave();
    pointermove === null || pointermove === void 0 ? void 0 : pointermove.enter();
    mousemove === null || mousemove === void 0 ? void 0 : mousemove.enter();
    pointermove === null || pointermove === void 0 ? void 0 : pointermove.move();
    mousemove === null || mousemove === void 0 ? void 0 : mousemove.move();
  }
  async release(instance, keyDef, position) {
    const device = this.devices.get(keyDef.pointerType);
    device.removePressed(keyDef);
    this.buttons.up(keyDef);
    const pointer2 = this.pointers.get(this.getPointerName(keyDef));
    pointer2.position = position;
    if (pointer2.pointerType !== "touch") {
      this.mouse.position = position;
    }
    if (device.countPressed === 0) {
      pointer2.up(instance, keyDef);
    }
    if (pointer2.pointerType === "touch") {
      pointer2.release(instance);
    }
    if (!pointer2.isPrevented) {
      if (pointer2.pointerType === "touch" && !pointer2.isMultitouch) {
        const mousemove = this.mouse.move(instance, pointer2.position);
        mousemove === null || mousemove === void 0 ? void 0 : mousemove.leave();
        mousemove === null || mousemove === void 0 ? void 0 : mousemove.enter();
        mousemove === null || mousemove === void 0 ? void 0 : mousemove.move();
        this.mouse.down(instance, keyDef, pointer2);
      }
      if (!pointer2.isMultitouch) {
        const mousemove = this.mouse.move(instance, pointer2.position);
        mousemove === null || mousemove === void 0 ? void 0 : mousemove.leave();
        mousemove === null || mousemove === void 0 ? void 0 : mousemove.enter();
        mousemove === null || mousemove === void 0 ? void 0 : mousemove.move();
        this.mouse.up(instance, keyDef, pointer2);
      }
    }
  }
  getPointerName(keyDef) {
    return keyDef.pointerType === "touch" ? keyDef.name : keyDef.pointerType;
  }
  getPreviousPosition(pointerName) {
    return this.pointers.has(pointerName) ? this.pointers.get(pointerName).position : void 0;
  }
  resetClickCount() {
    this.mouse.resetClickCount();
  }
  getMouseTarget(instance) {
    var _this_mouse_position_target;
    return (_this_mouse_position_target = this.mouse.position.target) !== null && _this_mouse_position_target !== void 0 ? _this_mouse_position_target : instance.config.document.body;
  }
  setMousePosition(position) {
    this.mouse.position = position;
    this.pointers.get("mouse").position = position;
  }
  constructor(system) {
    _define_property$1(this, "system", void 0);
    _define_property$1(this, "mouse", void 0);
    _define_property$1(this, "buttons", void 0);
    _define_property$1(this, "devices", new class {
      get(k) {
        var _this_registry, _k2;
        var _;
        (_ = (_this_registry = this.registry)[_k2 = k]) !== null && _ !== void 0 ? _ : _this_registry[_k2] = new Device();
        return this.registry[k];
      }
      constructor() {
        _define_property$1(this, "registry", {});
      }
    }());
    _define_property$1(this, "pointers", new class {
      new(pointerName, keyDef) {
        const isPrimary = keyDef.pointerType !== "touch" || !Object.values(this.registry).some((p) => p.pointerType === "touch" && !p.isCancelled);
        if (!isPrimary) {
          Object.values(this.registry).forEach((p) => {
            if (p.pointerType === keyDef.pointerType && !p.isCancelled) {
              p.isMultitouch = true;
            }
          });
        }
        this.registry[pointerName] = new Pointer({
          pointerId: this.nextId++,
          pointerType: keyDef.pointerType,
          isPrimary
        });
        return this.registry[pointerName];
      }
      get(pointerName) {
        if (!this.has(pointerName)) {
          throw new Error(`Trying to access pointer "${pointerName}" which does not exist.`);
        }
        return this.registry[pointerName];
      }
      has(pointerName) {
        return pointerName in this.registry;
      }
      constructor() {
        _define_property$1(this, "registry", {
          mouse: new Pointer({
            pointerId: 1,
            pointerType: "mouse",
            isPrimary: true
          })
        });
        _define_property$1(this, "nextId", 2);
      }
    }());
    this.system = system;
    this.buttons = new Buttons();
    this.mouse = new Mouse();
  }
}
function _define_property(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class System {
  getUIEventModifiers() {
    return {
      altKey: this.keyboard.modifiers.Alt,
      ctrlKey: this.keyboard.modifiers.Control,
      metaKey: this.keyboard.modifiers.Meta,
      shiftKey: this.keyboard.modifiers.Shift,
      modifierAltGraph: this.keyboard.modifiers.AltGraph,
      modifierCapsLock: this.keyboard.modifiers.CapsLock,
      modifierFn: this.keyboard.modifiers.Fn,
      modifierFnLock: this.keyboard.modifiers.FnLock,
      modifierNumLock: this.keyboard.modifiers.NumLock,
      modifierScrollLock: this.keyboard.modifiers.ScrollLock,
      modifierSymbol: this.keyboard.modifiers.Symbol,
      modifierSymbolLock: this.keyboard.modifiers.SymbolLock
    };
  }
  constructor() {
    _define_property(this, "keyboard", new KeyboardHost(this));
    _define_property(this, "pointer", new PointerHost(this));
  }
}
async function click$1(element) {
  const pointerIn = [];
  if (!this.config.skipHover) {
    pointerIn.push({
      target: element
    });
  }
  pointerIn.push({
    keys: "[MouseLeft]",
    target: element
  });
  return this.pointer(pointerIn);
}
async function dblClick$1(element) {
  return this.pointer([
    {
      target: element
    },
    "[MouseLeft][MouseLeft]"
  ]);
}
async function tripleClick$1(element) {
  return this.pointer([
    {
      target: element
    },
    "[MouseLeft][MouseLeft][MouseLeft]"
  ]);
}
async function hover$1(element) {
  return this.pointer({
    target: element
  });
}
async function unhover$1(element) {
  assertPointerEvents(this, this.system.pointer.getMouseTarget(this));
  return this.pointer({
    target: element.ownerDocument.body
  });
}
async function tab$1({ shift } = {}) {
  return this.keyboard(shift === true ? "{Shift>}{Tab}{/Shift}" : shift === false ? "[/ShiftLeft][/ShiftRight]{Tab}" : "{Tab}");
}
function parseKeyDef$1(keyboardMap, text) {
  const defs = [];
  do {
    const { type: type2, descriptor, consumedLength, releasePrevious, releaseSelf = true, repeat } = readNextDescriptor(text, "keyboard");
    var _keyboardMap_find;
    const keyDef = (_keyboardMap_find = keyboardMap.find((def) => {
      if (type2 === "[") {
        var _def_code;
        return ((_def_code = def.code) === null || _def_code === void 0 ? void 0 : _def_code.toLowerCase()) === descriptor.toLowerCase();
      } else if (type2 === "{") {
        var _def_key;
        return ((_def_key = def.key) === null || _def_key === void 0 ? void 0 : _def_key.toLowerCase()) === descriptor.toLowerCase();
      }
      return def.key === descriptor;
    })) !== null && _keyboardMap_find !== void 0 ? _keyboardMap_find : {
      key: "Unknown",
      code: "Unknown",
      [type2 === "[" ? "code" : "key"]: descriptor
    };
    defs.push({
      keyDef,
      releasePrevious,
      releaseSelf,
      repeat
    });
    text = text.slice(consumedLength);
  } while (text);
  return defs;
}
async function keyboard$1(text) {
  const actions = parseKeyDef$1(this.config.keyboardMap, text);
  for (let i = 0; i < actions.length; i++) {
    await wait$1(this.config);
    await keyboardAction(this, actions[i]);
  }
}
async function keyboardAction(instance, { keyDef, releasePrevious, releaseSelf, repeat }) {
  const { system } = instance;
  if (system.keyboard.isKeyPressed(keyDef)) {
    await system.keyboard.keyup(instance, keyDef);
  }
  if (!releasePrevious) {
    for (let i = 1; i <= repeat; i++) {
      await system.keyboard.keydown(instance, keyDef);
      if (i < repeat) {
        await wait$1(instance.config);
      }
    }
    if (releaseSelf) {
      await system.keyboard.keyup(instance, keyDef);
    }
  }
}
async function releaseAllKeys(instance) {
  for (const k of instance.system.keyboard.getPressedKeys()) {
    await instance.system.keyboard.keyup(instance, k);
  }
}
function copySelection(target) {
  const data = hasOwnSelection(target) ? {
    "text/plain": readSelectedValueFromInput(target)
  } : {
    "text/plain": String(target.ownerDocument.getSelection())
  };
  const dt = createDataTransfer(getWindow(target));
  for (const type2 in data) {
    if (data[type2]) {
      dt.setData(type2, data[type2]);
    }
  }
  return dt;
}
function readSelectedValueFromInput(target) {
  const sel = getUISelection(target);
  const val = getUIValue(target);
  return val.substring(sel.startOffset, sel.endOffset);
}
async function copy$1() {
  const doc = this.config.document;
  var _doc_activeElement;
  const target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : (
    /* istanbul ignore next */
    doc.body
  );
  const clipboardData = copySelection(target);
  if (clipboardData.items.length === 0) {
    return;
  }
  if (this.dispatchUIEvent(target, "copy", {
    clipboardData
  }) && this.config.writeToClipboard) {
    await writeDataTransferToClipboard(doc, clipboardData);
  }
  return clipboardData;
}
async function cut$1() {
  const doc = this.config.document;
  var _doc_activeElement;
  const target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : (
    /* istanbul ignore next */
    doc.body
  );
  const clipboardData = copySelection(target);
  if (clipboardData.items.length === 0) {
    return;
  }
  if (this.dispatchUIEvent(target, "cut", {
    clipboardData
  }) && this.config.writeToClipboard) {
    await writeDataTransferToClipboard(target.ownerDocument, clipboardData);
  }
  return clipboardData;
}
async function paste$1(clipboardData) {
  const doc = this.config.document;
  var _doc_activeElement;
  const target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : (
    /* istanbul ignore next */
    doc.body
  );
  var _ref;
  const dataTransfer = (_ref = typeof clipboardData === "string" ? getClipboardDataFromString(doc, clipboardData) : clipboardData) !== null && _ref !== void 0 ? _ref : await readDataTransferFromClipboard(doc).catch(() => {
    throw new Error("`userEvent.paste()` without `clipboardData` requires the `ClipboardAPI` to be available.");
  });
  this.dispatchUIEvent(target, "paste", {
    clipboardData: dataTransfer
  });
}
function getClipboardDataFromString(doc, text) {
  const dt = createDataTransfer(getWindow(doc));
  dt.setData("text", text);
  return dt;
}
function parseKeyDef(pointerMap, keys8) {
  const defs = [];
  do {
    const { descriptor, consumedLength, releasePrevious, releaseSelf = true } = readNextDescriptor(keys8, "pointer");
    const keyDef = pointerMap.find((p) => p.name === descriptor);
    if (keyDef) {
      defs.push({
        keyDef,
        releasePrevious,
        releaseSelf
      });
    }
    keys8 = keys8.slice(consumedLength);
  } while (keys8);
  return defs;
}
async function pointer$1(input2) {
  const { pointerMap } = this.config;
  const actions = [];
  (Array.isArray(input2) ? input2 : [
    input2
  ]).forEach((actionInput) => {
    if (typeof actionInput === "string") {
      actions.push(...parseKeyDef(pointerMap, actionInput));
    } else if ("keys" in actionInput) {
      actions.push(...parseKeyDef(pointerMap, actionInput.keys).map((i) => ({
        ...actionInput,
        ...i
      })));
    } else {
      actions.push(actionInput);
    }
  });
  for (let i = 0; i < actions.length; i++) {
    await wait$1(this.config);
    await pointerAction(this, actions[i]);
  }
  this.system.pointer.resetClickCount();
}
async function pointerAction(instance, action) {
  var _previousPosition_caret, _previousPosition_caret1;
  const pointerName = "pointerName" in action && action.pointerName ? action.pointerName : "keyDef" in action ? instance.system.pointer.getPointerName(action.keyDef) : "mouse";
  const previousPosition = instance.system.pointer.getPreviousPosition(pointerName);
  var _action_target, _action_coords, _action_node, _action_offset;
  const position = {
    target: (_action_target = action.target) !== null && _action_target !== void 0 ? _action_target : getPrevTarget(instance, previousPosition),
    coords: (_action_coords = action.coords) !== null && _action_coords !== void 0 ? _action_coords : previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.coords,
    caret: {
      node: (_action_node = action.node) !== null && _action_node !== void 0 ? _action_node : hasCaretPosition(action) ? void 0 : previousPosition === null || previousPosition === void 0 ? void 0 : (_previousPosition_caret = previousPosition.caret) === null || _previousPosition_caret === void 0 ? void 0 : _previousPosition_caret.node,
      offset: (_action_offset = action.offset) !== null && _action_offset !== void 0 ? _action_offset : hasCaretPosition(action) ? void 0 : previousPosition === null || previousPosition === void 0 ? void 0 : (_previousPosition_caret1 = previousPosition.caret) === null || _previousPosition_caret1 === void 0 ? void 0 : _previousPosition_caret1.offset
    }
  };
  if ("keyDef" in action) {
    if (instance.system.pointer.isKeyPressed(action.keyDef)) {
      setLevelRef(instance, ApiLevel.Trigger);
      await instance.system.pointer.release(instance, action.keyDef, position);
    }
    if (!action.releasePrevious) {
      setLevelRef(instance, ApiLevel.Trigger);
      await instance.system.pointer.press(instance, action.keyDef, position);
      if (action.releaseSelf) {
        setLevelRef(instance, ApiLevel.Trigger);
        await instance.system.pointer.release(instance, action.keyDef, position);
      }
    }
  } else {
    setLevelRef(instance, ApiLevel.Trigger);
    await instance.system.pointer.move(instance, pointerName, position);
  }
}
function hasCaretPosition(action) {
  var _action_target, _ref;
  return !!((_ref = (_action_target = action.target) !== null && _action_target !== void 0 ? _action_target : action.node) !== null && _ref !== void 0 ? _ref : action.offset !== void 0);
}
function getPrevTarget(instance, position) {
  if (!position) {
    throw new Error("This pointer has no previous position. Provide a target property!");
  }
  var _position_target;
  return (_position_target = position.target) !== null && _position_target !== void 0 ? _position_target : instance.config.document.body;
}
async function clear$1(element) {
  if (!isEditable(element) || isDisabled(element)) {
    throw new Error("clear()` is only supported on editable elements.");
  }
  focusElement(element);
  if (element.ownerDocument.activeElement !== element) {
    throw new Error("The element to be cleared could not be focused.");
  }
  selectAll(element);
  if (!isAllSelected(element)) {
    throw new Error("The element content to be cleared could not be selected.");
  }
  input(this, element, "", "deleteContentBackward");
}
async function selectOptions$1(select, values6) {
  return selectOptionsBase.call(this, true, select, values6);
}
async function deselectOptions$1(select, values6) {
  return selectOptionsBase.call(this, false, select, values6);
}
async function selectOptionsBase(newValue, select, values6) {
  if (!newValue && !select.multiple) {
    throw getConfig$1().getElementError(`Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.`, select);
  }
  const valArray = Array.isArray(values6) ? values6 : [
    values6
  ];
  const allOptions = Array.from(select.querySelectorAll('option, [role="option"]'));
  const selectedOptions = valArray.map((val) => {
    if (typeof val !== "string" && allOptions.includes(val)) {
      return val;
    } else {
      const matchingOption = allOptions.find((o) => o.value === val || o.innerHTML === val);
      if (matchingOption) {
        return matchingOption;
      } else {
        throw getConfig$1().getElementError(`Value "${String(val)}" not found in options`, select);
      }
    }
  }).filter((option) => !isDisabled(option));
  if (isDisabled(select) || !selectedOptions.length)
    return;
  const selectOption = (option) => {
    option.selected = newValue;
    this.dispatchUIEvent(select, "input", {
      bubbles: true,
      cancelable: false,
      composed: true
    });
    this.dispatchUIEvent(select, "change");
  };
  if (isElementType(select, "select")) {
    if (select.multiple) {
      for (const option of selectedOptions) {
        const withPointerEvents = this.config.pointerEventsCheck === 0 ? true : hasPointerEvents(this, option);
        if (withPointerEvents) {
          this.dispatchUIEvent(option, "pointerover");
          this.dispatchUIEvent(select, "pointerenter");
          this.dispatchUIEvent(option, "mouseover");
          this.dispatchUIEvent(select, "mouseenter");
          this.dispatchUIEvent(option, "pointermove");
          this.dispatchUIEvent(option, "mousemove");
          this.dispatchUIEvent(option, "pointerdown");
          this.dispatchUIEvent(option, "mousedown");
        }
        focusElement(select);
        if (withPointerEvents) {
          this.dispatchUIEvent(option, "pointerup");
          this.dispatchUIEvent(option, "mouseup");
        }
        selectOption(option);
        if (withPointerEvents) {
          this.dispatchUIEvent(option, "click");
        }
        await wait$1(this.config);
      }
    } else if (selectedOptions.length === 1) {
      const withPointerEvents = this.config.pointerEventsCheck === 0 ? true : hasPointerEvents(this, select);
      if (withPointerEvents) {
        await this.click(select);
      } else {
        focusElement(select);
      }
      selectOption(selectedOptions[0]);
      if (withPointerEvents) {
        this.dispatchUIEvent(select, "pointerover");
        this.dispatchUIEvent(select, "pointerenter");
        this.dispatchUIEvent(select, "mouseover");
        this.dispatchUIEvent(select, "mouseenter");
        this.dispatchUIEvent(select, "pointerup");
        this.dispatchUIEvent(select, "mouseup");
        this.dispatchUIEvent(select, "click");
      }
      await wait$1(this.config);
    } else {
      throw getConfig$1().getElementError(`Cannot select multiple options on a non-multiple select`, select);
    }
  } else if (select.getAttribute("role") === "listbox") {
    for (const option of selectedOptions) {
      await this.click(option);
      await this.unhover(option);
    }
  } else {
    throw getConfig$1().getElementError(`Cannot select options on elements that are neither select nor listbox elements`, select);
  }
}
async function type$1(element, text, { skipClick = this.config.skipClick, skipAutoClose = this.config.skipAutoClose, initialSelectionStart, initialSelectionEnd } = {}) {
  if (element.disabled)
    return;
  if (!skipClick) {
    await this.click(element);
  }
  if (initialSelectionStart !== void 0) {
    setSelectionRange(element, initialSelectionStart, initialSelectionEnd !== null && initialSelectionEnd !== void 0 ? initialSelectionEnd : initialSelectionStart);
  }
  await this.keyboard(text);
  if (!skipAutoClose) {
    await releaseAllKeys(this);
  }
}
const fakeFiles = Symbol("files and value properties are mocked");
function restoreProperty(obj, prop, descriptor) {
  if (descriptor) {
    Object.defineProperty(obj, prop, descriptor);
  } else {
    delete obj[prop];
  }
}
function setFiles(el, files) {
  var _el_fakeFiles;
  (_el_fakeFiles = el[fakeFiles]) === null || _el_fakeFiles === void 0 ? void 0 : _el_fakeFiles.restore();
  const typeDescr = Object.getOwnPropertyDescriptor(el, "type");
  const valueDescr = Object.getOwnPropertyDescriptor(el, "value");
  const filesDescr = Object.getOwnPropertyDescriptor(el, "files");
  function restore() {
    restoreProperty(el, "type", typeDescr);
    restoreProperty(el, "value", valueDescr);
    restoreProperty(el, "files", filesDescr);
  }
  el[fakeFiles] = {
    restore
  };
  Object.defineProperties(el, {
    files: {
      configurable: true,
      get: () => files
    },
    value: {
      configurable: true,
      get: () => files.length ? `C:\\fakepath\\${files[0].name}` : "",
      set(v) {
        if (v === "") {
          restore();
        } else {
          var _valueDescr_set;
          valueDescr === null || valueDescr === void 0 ? void 0 : (_valueDescr_set = valueDescr.set) === null || _valueDescr_set === void 0 ? void 0 : _valueDescr_set.call(el, v);
        }
      }
    },
    type: {
      configurable: true,
      get: () => "file",
      set(v) {
        if (v !== "file") {
          restore();
          el.type = v;
        }
      }
    }
  });
}
async function upload$1(element, fileOrFiles) {
  const input2 = isElementType(element, "label") ? element.control : element;
  if (!input2 || !isElementType(input2, "input", {
    type: "file"
  })) {
    throw new TypeError(`The ${input2 === element ? "given" : "associated"} ${input2 === null || input2 === void 0 ? void 0 : input2.tagName} element does not accept file uploads`);
  }
  if (isDisabled(element))
    return;
  const files = (Array.isArray(fileOrFiles) ? fileOrFiles : [
    fileOrFiles
  ]).filter((file) => !this.config.applyAccept || isAcceptableFile(file, input2.accept)).slice(0, input2.multiple ? void 0 : 1);
  const fileDialog = () => {
    var _input_files;
    if (files.length === ((_input_files = input2.files) === null || _input_files === void 0 ? void 0 : _input_files.length) && files.every((f, i) => {
      var _input_files2;
      return f === ((_input_files2 = input2.files) === null || _input_files2 === void 0 ? void 0 : _input_files2.item(i));
    })) {
      return;
    }
    setFiles(input2, createFileList(getWindow(element), files));
    this.dispatchUIEvent(input2, "input");
    this.dispatchUIEvent(input2, "change");
  };
  input2.addEventListener("fileDialog", fileDialog);
  await this.click(element);
  input2.removeEventListener("fileDialog", fileDialog);
}
function isAcceptableFile(file, accept) {
  if (!accept) {
    return true;
  }
  const wildcards = [
    "audio/*",
    "image/*",
    "video/*"
  ];
  return accept.split(",").some((acceptToken) => {
    if (acceptToken.startsWith(".")) {
      return file.name.endsWith(acceptToken);
    } else if (wildcards.includes(acceptToken)) {
      return file.type.startsWith(acceptToken.substr(0, acceptToken.length - 1));
    }
    return file.type === acceptToken;
  });
}
const userEventApi = {
  click: click$1,
  dblClick: dblClick$1,
  tripleClick: tripleClick$1,
  hover: hover$1,
  unhover: unhover$1,
  tab: tab$1,
  keyboard: keyboard$1,
  copy: copy$1,
  cut: cut$1,
  paste: paste$1,
  pointer: pointer$1,
  clear: clear$1,
  deselectOptions: deselectOptions$1,
  selectOptions: selectOptions$1,
  type: type$1,
  upload: upload$1
};
function wrapAsync(implementation2) {
  return getConfig$1().asyncWrapper(implementation2);
}
const defaultOptionsDirect = {
  applyAccept: true,
  autoModify: true,
  delay: 0,
  document: globalThis.document,
  keyboardMap: defaultKeyMap$1,
  pointerMap: defaultKeyMap,
  pointerEventsCheck: PointerEventsCheckLevel.EachApiCall,
  skipAutoClose: false,
  skipClick: false,
  skipHover: false,
  writeToClipboard: false,
  advanceTimers: () => Promise.resolve()
};
const defaultOptionsSetup = {
  ...defaultOptionsDirect,
  writeToClipboard: true
};
function createConfig(options = {}, defaults = defaultOptionsSetup, node) {
  const document2 = getDocument(options, node, defaults);
  return {
    ...defaults,
    ...options,
    document: document2
  };
}
function setupMain(options = {}) {
  const config2 = createConfig(options);
  prepareDocument(config2.document);
  var _config_document_defaultView;
  const view = (_config_document_defaultView = config2.document.defaultView) !== null && _config_document_defaultView !== void 0 ? _config_document_defaultView : (
    /* istanbul ignore next */
    globalThis.window
  );
  attachClipboardStubToView(view);
  return createInstance(config2).api;
}
function setupDirect({ keyboardState, pointerState, ...options } = {}, node) {
  const config2 = createConfig(options, defaultOptionsDirect, node);
  prepareDocument(config2.document);
  var _ref;
  const system = (_ref = pointerState !== null && pointerState !== void 0 ? pointerState : keyboardState) !== null && _ref !== void 0 ? _ref : new System();
  return {
    api: createInstance(config2, system).api,
    system
  };
}
function setupSub(options) {
  return createInstance({
    ...this.config,
    ...options
  }, this.system).api;
}
function wrapAndBindImpl(instance, impl) {
  function method(...args) {
    setLevelRef(instance, ApiLevel.Call);
    return wrapAsync(() => impl.apply(instance, args).then(async (ret) => {
      await wait$1(instance.config);
      return ret;
    }));
  }
  Object.defineProperty(method, "name", {
    get: () => impl.name
  });
  return method;
}
function createInstance(config2, system = new System()) {
  const instance = {};
  Object.assign(instance, {
    config: config2,
    dispatchEvent: dispatchEvent.bind(instance),
    dispatchUIEvent: dispatchUIEvent.bind(instance),
    system,
    levelRefs: {},
    ...userEventApi
  });
  return {
    instance,
    api: {
      ...Object.fromEntries(Object.entries(userEventApi).map(([name, api]) => [
        name,
        wrapAndBindImpl(instance, api)
      ])),
      setup: setupSub.bind(instance)
    }
  };
}
function getDocument(options, node, defaults) {
  var _options_document, _ref;
  return (_ref = (_options_document = options.document) !== null && _options_document !== void 0 ? _options_document : node && getDocumentFromNode(node)) !== null && _ref !== void 0 ? _ref : defaults.document;
}
function clear(element) {
  return setupDirect().api.clear(element);
}
function click(element, options = {}) {
  return setupDirect(options, element).api.click(element);
}
function copy(options = {}) {
  return setupDirect(options).api.copy();
}
function cut(options = {}) {
  return setupDirect(options).api.cut();
}
function dblClick(element, options = {}) {
  return setupDirect(options).api.dblClick(element);
}
function deselectOptions(select, values6, options = {}) {
  return setupDirect(options).api.deselectOptions(select, values6);
}
function hover(element, options = {}) {
  return setupDirect(options).api.hover(element);
}
async function keyboard(text, options = {}) {
  const { api, system } = setupDirect(options);
  return api.keyboard(text).then(() => system);
}
async function pointer(input2, options = {}) {
  const { api, system } = setupDirect(options);
  return api.pointer(input2).then(() => system);
}
function paste(clipboardData, options) {
  return setupDirect(options).api.paste(clipboardData);
}
function selectOptions(select, values6, options = {}) {
  return setupDirect(options).api.selectOptions(select, values6);
}
function tripleClick(element, options = {}) {
  return setupDirect(options).api.tripleClick(element);
}
function type(element, text, options = {}) {
  return setupDirect(options, element).api.type(element, text, options);
}
function unhover(element, options = {}) {
  const { api, system } = setupDirect(options);
  system.pointer.setMousePosition({
    target: element
  });
  return api.unhover(element);
}
function upload(element, fileOrFiles, options = {}) {
  return setupDirect(options).api.upload(element, fileOrFiles);
}
function tab(options = {}) {
  return setupDirect().api.tab(options);
}
const directApi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clear,
  click,
  copy,
  cut,
  dblClick,
  deselectOptions,
  hover,
  keyboard,
  paste,
  pointer,
  selectOptions,
  tab,
  tripleClick,
  type,
  unhover,
  upload
}, Symbol.toStringTag, { value: "Module" }));
const userEvent = {
  ...directApi,
  setup: setupMain
};
var scope = (() => {
  let win;
  return typeof window < "u" ? win = window : typeof globalThis < "u" ? win = globalThis : typeof global < "u" ? win = global : typeof self < "u" ? win = self : win = {}, win;
})();
var { LOGLEVEL } = scope, levels = { trace: 1, debug: 2, info: 3, warn: 4, error: 5, silent: 10 }, currentLogLevelString = LOGLEVEL, currentLogLevelNumber = levels[currentLogLevelString] || levels.info, logger = { trace: (message, ...rest) => {
  currentLogLevelNumber <= levels.trace && console.trace(message, ...rest);
}, debug: (message, ...rest) => {
  currentLogLevelNumber <= levels.debug && console.debug(message, ...rest);
}, info: (message, ...rest) => {
  currentLogLevelNumber <= levels.info && console.info(message, ...rest);
}, warn: (message, ...rest) => {
  currentLogLevelNumber <= levels.warn && console.warn(message, ...rest);
}, error: (message, ...rest) => {
  currentLogLevelNumber <= levels.error && console.error(message, ...rest);
}, log: (message, ...rest) => {
  currentLogLevelNumber < levels.silent && console.log(message, ...rest);
} }, logged = /* @__PURE__ */ new Set(), once = (type2) => (message, ...rest) => {
  if (!logged.has(message))
    return logged.add(message), logger[type2](message, ...rest);
};
once.clear = () => logged.clear();
once.trace = once("trace");
once.debug = once("debug");
once.info = once("info");
once.warn = once("warn");
once.error = once("error");
once.log = once("log");
var isMulti = (args) => args.transports !== void 0, generateRandomId = () => Math.random().toString(16).slice(2), Channel = class {
  constructor(input2 = {}) {
    this.sender = generateRandomId(), this.events = {}, this.data = {}, this.transports = [], this.isAsync = input2.async || false, isMulti(input2) ? (this.transports = input2.transports || [], this.transports.forEach((t) => {
      t.setHandler((event) => this.handleEvent(event));
    })) : this.transports = input2.transport ? [input2.transport] : [], this.transports.forEach((t) => {
      t.setHandler((event) => this.handleEvent(event));
    });
  }
  get hasTransport() {
    return this.transports.length > 0;
  }
  addListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [], this.events[eventName].push(listener);
  }
  emit(eventName, ...args) {
    let event = { type: eventName, args, from: this.sender }, options = {};
    args.length >= 1 && args[0] && args[0].options && (options = args[0].options);
    let handler = () => {
      this.transports.forEach((t) => {
        t.send(event, options);
      }), this.handleEvent(event);
    };
    this.isAsync ? setImmediate(handler) : handler();
  }
  last(eventName) {
    return this.data[eventName];
  }
  eventNames() {
    return Object.keys(this.events);
  }
  listenerCount(eventName) {
    let listeners = this.listeners(eventName);
    return listeners ? listeners.length : 0;
  }
  listeners(eventName) {
    return this.events[eventName] || void 0;
  }
  once(eventName, listener) {
    let onceListener = this.onceListener(eventName, listener);
    this.addListener(eventName, onceListener);
  }
  removeAllListeners(eventName) {
    eventName ? this.events[eventName] && delete this.events[eventName] : this.events = {};
  }
  removeListener(eventName, listener) {
    let listeners = this.listeners(eventName);
    listeners && (this.events[eventName] = listeners.filter((l) => l !== listener));
  }
  on(eventName, listener) {
    this.addListener(eventName, listener);
  }
  off(eventName, listener) {
    this.removeListener(eventName, listener);
  }
  handleEvent(event) {
    let listeners = this.listeners(event.type);
    listeners && listeners.length && listeners.forEach((fn) => {
      fn.apply(event, event.args);
    }), this.data[event.type] = event.args;
  }
  onceListener(eventName, listener) {
    let onceListener = (...args) => (this.removeListener(eventName, onceListener), listener(...args));
    return onceListener;
  }
};
var events = ((events2) => (events2.CHANNEL_CREATED = "channelCreated", events2.CONFIG_ERROR = "configError", events2.STORY_INDEX_INVALIDATED = "storyIndexInvalidated", events2.STORY_SPECIFIED = "storySpecified", events2.SET_CONFIG = "setConfig", events2.SET_STORIES = "setStories", events2.SET_INDEX = "setIndex", events2.SET_CURRENT_STORY = "setCurrentStory", events2.CURRENT_STORY_WAS_SET = "currentStoryWasSet", events2.FORCE_RE_RENDER = "forceReRender", events2.FORCE_REMOUNT = "forceRemount", events2.PRELOAD_ENTRIES = "preloadStories", events2.STORY_PREPARED = "storyPrepared", events2.DOCS_PREPARED = "docsPrepared", events2.STORY_CHANGED = "storyChanged", events2.STORY_UNCHANGED = "storyUnchanged", events2.STORY_RENDERED = "storyRendered", events2.STORY_MISSING = "storyMissing", events2.STORY_ERRORED = "storyErrored", events2.STORY_THREW_EXCEPTION = "storyThrewException", events2.STORY_RENDER_PHASE_CHANGED = "storyRenderPhaseChanged", events2.PLAY_FUNCTION_THREW_EXCEPTION = "playFunctionThrewException", events2.UPDATE_STORY_ARGS = "updateStoryArgs", events2.STORY_ARGS_UPDATED = "storyArgsUpdated", events2.RESET_STORY_ARGS = "resetStoryArgs", events2.SET_GLOBALS = "setGlobals", events2.UPDATE_GLOBALS = "updateGlobals", events2.GLOBALS_UPDATED = "globalsUpdated", events2.REGISTER_SUBSCRIPTION = "registerSubscription", events2.PREVIEW_KEYDOWN = "previewKeydown", events2.PREVIEW_BUILDER_PROGRESS = "preview_builder_progress", events2.SELECT_STORY = "selectStory", events2.STORIES_COLLAPSE_ALL = "storiesCollapseAll", events2.STORIES_EXPAND_ALL = "storiesExpandAll", events2.DOCS_RENDERED = "docsRendered", events2.SHARED_STATE_CHANGED = "sharedStateChanged", events2.SHARED_STATE_SET = "sharedStateSet", events2.NAVIGATE_URL = "navigateUrl", events2.UPDATE_QUERY_PARAMS = "updateQueryParams", events2.REQUEST_WHATS_NEW_DATA = "requestWhatsNewData", events2.RESULT_WHATS_NEW_DATA = "resultWhatsNewData", events2.SET_WHATS_NEW_CACHE = "setWhatsNewCache", events2.TOGGLE_WHATS_NEW_NOTIFICATIONS = "toggleWhatsNewNotifications", events2.TELEMETRY_ERROR = "telemetryError", events2))(events || {});
var { CHANNEL_CREATED, CONFIG_ERROR, CURRENT_STORY_WAS_SET, DOCS_PREPARED, DOCS_RENDERED, FORCE_RE_RENDER, FORCE_REMOUNT, GLOBALS_UPDATED, NAVIGATE_URL, PLAY_FUNCTION_THREW_EXCEPTION, PRELOAD_ENTRIES, PREVIEW_BUILDER_PROGRESS, PREVIEW_KEYDOWN, REGISTER_SUBSCRIPTION, RESET_STORY_ARGS, SELECT_STORY, SET_CONFIG, SET_CURRENT_STORY, SET_GLOBALS, SET_INDEX, SET_STORIES, SHARED_STATE_CHANGED, SHARED_STATE_SET, STORIES_COLLAPSE_ALL, STORIES_EXPAND_ALL, STORY_ARGS_UPDATED, STORY_CHANGED, STORY_ERRORED, STORY_INDEX_INVALIDATED, STORY_MISSING, STORY_PREPARED, STORY_RENDER_PHASE_CHANGED, STORY_RENDERED, STORY_SPECIFIED, STORY_THREW_EXCEPTION, STORY_UNCHANGED, UPDATE_GLOBALS, UPDATE_QUERY_PARAMS, UPDATE_STORY_ARGS, REQUEST_WHATS_NEW_DATA, RESULT_WHATS_NEW_DATA, SET_WHATS_NEW_CACHE, TOGGLE_WHATS_NEW_NOTIFICATIONS, TELEMETRY_ERROR } = events, IGNORED_EXCEPTION = new Error("ignoredException");
function mockChannel() {
  let transport = { setHandler: () => {
  }, send: () => {
  } };
  return new Channel({ transport });
}
var AddonStore = class {
  constructor() {
    this.getChannel = () => {
      if (!this.channel) {
        let channel2 = mockChannel();
        return this.setChannel(channel2), channel2;
      }
      return this.channel;
    }, this.getServerChannel = () => {
      if (!this.serverChannel)
        throw new Error("Accessing non-existent serverChannel");
      return this.serverChannel;
    }, this.ready = () => this.promise, this.hasChannel = () => !!this.channel, this.hasServerChannel = () => !!this.serverChannel, this.setChannel = (channel2) => {
      this.channel = channel2, this.resolve();
    }, this.setServerChannel = (channel2) => {
      this.serverChannel = channel2;
    }, this.promise = new Promise((res) => {
      this.resolve = () => res(this.getChannel());
    });
  }
}, KEY = "__STORYBOOK_ADDONS_PREVIEW";
function getAddonsStore() {
  return scope[KEY] || (scope[KEY] = new AddonStore()), scope[KEY];
}
var addons = getAddonsStore();
var CallStates = ((CallStates2) => (CallStates2.DONE = "done", CallStates2.ERROR = "error", CallStates2.ACTIVE = "active", CallStates2.WAITING = "waiting", CallStates2))(CallStates || {}), EVENTS = { CALL: "storybook/instrumenter/call", SYNC: "storybook/instrumenter/sync", START: "storybook/instrumenter/start", BACK: "storybook/instrumenter/back", GOTO: "storybook/instrumenter/goto", NEXT: "storybook/instrumenter/next", END: "storybook/instrumenter/end" }, controlsDisabled = { start: false, back: false, goto: false, next: false, end: false }, alreadyCompletedException = new Error("This function ran after the play function completed. Did you forget to `await` it?"), isObject = (o) => Object.prototype.toString.call(o) === "[object Object]", isModule = (o) => Object.prototype.toString.call(o) === "[object Module]", isInstrumentable = (o) => {
  if (!isObject(o) && !isModule(o))
    return false;
  if (o.constructor === void 0)
    return true;
  let proto = o.constructor.prototype;
  return !(!isObject(proto) || Object.prototype.hasOwnProperty.call(proto, "isPrototypeOf") === false);
}, construct = (obj) => {
  try {
    return new obj.constructor();
  } catch {
    return {};
  }
}, getInitialState = () => ({ renderPhase: void 0, isDebugging: false, isPlaying: false, isLocked: false, cursor: 0, calls: [], shadowCalls: [], callRefsByResult: /* @__PURE__ */ new Map(), chainedCallIds: /* @__PURE__ */ new Set(), ancestors: [], playUntil: void 0, resolvers: {}, syncTimeout: void 0 }), getRetainedState = (state, isDebugging = false) => {
  let calls = (isDebugging ? state.shadowCalls : state.calls).filter((call2) => call2.retain);
  if (!calls.length)
    return;
  let callRefsByResult = new Map(Array.from(state.callRefsByResult.entries()).filter(([, ref]) => ref.retain));
  return { cursor: calls.length, calls, callRefsByResult };
}, Instrumenter = class {
  constructor() {
    this.initialized = false, this.channel = addons.getChannel(), this.state = scope.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__ || {};
    let resetState = ({ storyId, isPlaying = true, isDebugging = false }) => {
      let state = this.getState(storyId);
      this.setState(storyId, { ...getInitialState(), ...getRetainedState(state, isDebugging), shadowCalls: isDebugging ? state.shadowCalls : [], chainedCallIds: isDebugging ? state.chainedCallIds : /* @__PURE__ */ new Set(), playUntil: isDebugging ? state.playUntil : void 0, isPlaying, isDebugging }), this.sync(storyId);
    };
    this.channel.on(FORCE_REMOUNT, resetState), this.channel.on(STORY_RENDER_PHASE_CHANGED, ({ storyId, newPhase }) => {
      let { isDebugging } = this.getState(storyId);
      this.setState(storyId, { renderPhase: newPhase }), newPhase === "preparing" && isDebugging && resetState({ storyId }), newPhase === "playing" && resetState({ storyId, isDebugging }), newPhase === "played" && this.setState(storyId, { isLocked: false, isPlaying: false, isDebugging: false }), newPhase === "errored" && this.setState(storyId, { isLocked: false, isPlaying: false });
    }), this.channel.on(SET_CURRENT_STORY, () => {
      this.initialized ? this.cleanup() : this.initialized = true;
    });
    let start = ({ storyId, playUntil }) => {
      this.getState(storyId).isDebugging || this.setState(storyId, ({ calls }) => ({ calls: [], shadowCalls: calls.map((call2) => ({ ...call2, status: "waiting" })), isDebugging: true }));
      let log = this.getLog(storyId);
      this.setState(storyId, ({ shadowCalls }) => {
        var _a2;
        if (playUntil || !log.length)
          return { playUntil };
        let firstRowIndex = shadowCalls.findIndex((call2) => call2.id === log[0].callId);
        return { playUntil: (_a2 = shadowCalls.slice(0, firstRowIndex).filter((call2) => call2.interceptable && !call2.ancestors.length).slice(-1)[0]) == null ? void 0 : _a2.id };
      }), this.channel.emit(FORCE_REMOUNT, { storyId, isDebugging: true });
    }, back = ({ storyId }) => {
      var _a2;
      let log = this.getLog(storyId).filter((call2) => !call2.ancestors.length), last = log.reduceRight((res, item, index2) => res >= 0 || item.status === "waiting" ? res : index2, -1);
      start({ storyId, playUntil: (_a2 = log[last - 1]) == null ? void 0 : _a2.callId });
    }, goto = ({ storyId, callId }) => {
      var _a2;
      let { calls, shadowCalls, resolvers } = this.getState(storyId), call2 = calls.find(({ id }) => id === callId), shadowCall = shadowCalls.find(({ id }) => id === callId);
      if (!call2 && shadowCall && Object.values(resolvers).length > 0) {
        let nextId = (_a2 = this.getLog(storyId).find((c) => c.status === "waiting")) == null ? void 0 : _a2.callId;
        shadowCall.id !== nextId && this.setState(storyId, { playUntil: shadowCall.id }), Object.values(resolvers).forEach((resolve) => resolve());
      } else
        start({ storyId, playUntil: callId });
    }, next = ({ storyId }) => {
      var _a2;
      let { resolvers } = this.getState(storyId);
      if (Object.values(resolvers).length > 0)
        Object.values(resolvers).forEach((resolve) => resolve());
      else {
        let nextId = (_a2 = this.getLog(storyId).find((c) => c.status === "waiting")) == null ? void 0 : _a2.callId;
        nextId ? start({ storyId, playUntil: nextId }) : end({ storyId });
      }
    }, end = ({ storyId }) => {
      this.setState(storyId, { playUntil: void 0, isDebugging: false }), Object.values(this.getState(storyId).resolvers).forEach((resolve) => resolve());
    };
    this.channel.on(EVENTS.START, start), this.channel.on(EVENTS.BACK, back), this.channel.on(EVENTS.GOTO, goto), this.channel.on(EVENTS.NEXT, next), this.channel.on(EVENTS.END, end);
  }
  getState(storyId) {
    return this.state[storyId] || getInitialState();
  }
  setState(storyId, update) {
    let state = this.getState(storyId), patch = typeof update == "function" ? update(state) : update;
    this.state = { ...this.state, [storyId]: { ...state, ...patch } }, scope.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__ = this.state;
  }
  cleanup() {
    this.state = Object.entries(this.state).reduce((acc, [storyId, state]) => {
      let retainedState = getRetainedState(state);
      return retainedState && (acc[storyId] = Object.assign(getInitialState(), retainedState)), acc;
    }, {});
    let payload = { controlStates: controlsDisabled, logItems: [] };
    this.channel.emit(EVENTS.SYNC, payload), scope.window.parent.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER_STATE__ = this.state;
  }
  getLog(storyId) {
    let { calls, shadowCalls } = this.getState(storyId), merged = [...shadowCalls];
    calls.forEach((call2, index2) => {
      merged[index2] = call2;
    });
    let seen = /* @__PURE__ */ new Set();
    return merged.reduceRight((acc, call2) => (call2.args.forEach((arg) => {
      (arg == null ? void 0 : arg.__callId__) && seen.add(arg.__callId__);
    }), call2.path.forEach((node) => {
      node.__callId__ && seen.add(node.__callId__);
    }), (call2.interceptable || call2.exception) && !seen.has(call2.id) && (acc.unshift({ callId: call2.id, status: call2.status, ancestors: call2.ancestors }), seen.add(call2.id)), acc), []);
  }
  instrument(obj, options) {
    if (!isInstrumentable(obj))
      return obj;
    let { mutate = false, path = [] } = options;
    return Object.keys(obj).reduce((acc, key) => {
      let value = obj[key];
      return typeof value != "function" ? (acc[key] = this.instrument(value, { ...options, path: path.concat(key) }), acc) : typeof value.__originalFn__ == "function" ? (acc[key] = value, acc) : (acc[key] = (...args) => this.track(key, value, args, options), acc[key].__originalFn__ = value, Object.defineProperty(acc[key], "name", { value: key, writable: false }), Object.keys(value).length > 0 && Object.assign(acc[key], this.instrument({ ...value }, { ...options, path: path.concat(key) })), acc);
    }, mutate ? obj : construct(obj));
  }
  track(method, fn, args, options) {
    var _a2, _b2, _c2, _d2;
    let storyId = ((_a2 = args == null ? void 0 : args[0]) == null ? void 0 : _a2.__storyId__) || ((_d2 = (_c2 = (_b2 = scope.__STORYBOOK_PREVIEW__) == null ? void 0 : _b2.selectionStore) == null ? void 0 : _c2.selection) == null ? void 0 : _d2.storyId), { cursor, ancestors } = this.getState(storyId);
    this.setState(storyId, { cursor: cursor + 1 });
    let id = `${ancestors.slice(-1)[0] || storyId} [${cursor}] ${method}`, { path = [], intercept = false, retain = false } = options, interceptable = typeof intercept == "function" ? intercept(method, path) : intercept, call2 = { id, cursor, storyId, ancestors, path, method, args, interceptable, retain }, result = (interceptable && !ancestors.length ? this.intercept : this.invoke).call(this, fn, call2, options);
    return this.instrument(result, { ...options, mutate: true, path: [{ __callId__: call2.id }] });
  }
  intercept(fn, call2, options) {
    let { chainedCallIds, isDebugging, playUntil } = this.getState(call2.storyId), isChainedUpon = chainedCallIds.has(call2.id);
    return !isDebugging || isChainedUpon || playUntil ? (playUntil === call2.id && this.setState(call2.storyId, { playUntil: void 0 }), this.invoke(fn, call2, options)) : new Promise((resolve) => {
      this.setState(call2.storyId, ({ resolvers }) => ({ isLocked: false, resolvers: { ...resolvers, [call2.id]: resolve } }));
    }).then(() => (this.setState(call2.storyId, (state) => {
      let { [call2.id]: _, ...resolvers } = state.resolvers;
      return { isLocked: true, resolvers };
    }), this.invoke(fn, call2, options)));
  }
  invoke(fn, call2, options) {
    let { callRefsByResult, renderPhase } = this.getState(call2.storyId), serializeValues = (value) => {
      var _a2, _b2;
      if (callRefsByResult.has(value))
        return callRefsByResult.get(value);
      if (value instanceof Array)
        return value.map(serializeValues);
      if (value instanceof Date)
        return { __date__: { value: value.toISOString() } };
      if (value instanceof Error) {
        let { name, message, stack } = value;
        return { __error__: { name, message, stack } };
      }
      if (value instanceof RegExp) {
        let { flags: flags3, source } = value;
        return { __regexp__: { flags: flags3, source } };
      }
      if (value instanceof scope.window.HTMLElement) {
        let { prefix, localName, id, classList, innerText } = value, classNames = Array.from(classList);
        return { __element__: { prefix, localName, id, classNames, innerText } };
      }
      return typeof value == "function" ? { __function__: { name: value.name } } : typeof value == "symbol" ? { __symbol__: { description: value.description } } : typeof value == "object" && ((_a2 = value == null ? void 0 : value.constructor) == null ? void 0 : _a2.name) && ((_b2 = value == null ? void 0 : value.constructor) == null ? void 0 : _b2.name) !== "Object" ? { __class__: { name: value.constructor.name } } : Object.prototype.toString.call(value) === "[object Object]" ? Object.fromEntries(Object.entries(value).map(([key, val]) => [key, serializeValues(val)])) : value;
    }, info = { ...call2, args: call2.args.map(serializeValues) };
    call2.path.forEach((ref) => {
      (ref == null ? void 0 : ref.__callId__) && this.setState(call2.storyId, ({ chainedCallIds }) => ({ chainedCallIds: new Set(Array.from(chainedCallIds).concat(ref.__callId__)) }));
    });
    let handleException = (e) => {
      if (e instanceof Error) {
        let { name, message, stack, callId = call2.id } = e, exception = { name, message, stack, callId };
        if (this.update({ ...info, status: "error", exception }), this.setState(call2.storyId, (state) => ({ callRefsByResult: new Map([...Array.from(state.callRefsByResult.entries()), [e, { __callId__: call2.id, retain: call2.retain }]]) })), call2.ancestors.length)
          throw Object.prototype.hasOwnProperty.call(e, "callId") || Object.defineProperty(e, "callId", { value: call2.id }), e;
        if (e !== alreadyCompletedException)
          throw logger.warn(e), IGNORED_EXCEPTION;
      }
      throw e;
    };
    try {
      if (renderPhase === "played" && !call2.retain)
        throw alreadyCompletedException;
      let finalArgs = (options.getArgs ? options.getArgs(call2, this.getState(call2.storyId)) : call2.args).map((arg) => typeof arg != "function" || Object.keys(arg).length ? arg : (...args) => {
        let { cursor, ancestors } = this.getState(call2.storyId);
        this.setState(call2.storyId, { cursor: 0, ancestors: [...ancestors, call2.id] });
        let restore = () => this.setState(call2.storyId, { cursor, ancestors }), willRestore = false;
        try {
          let res = arg(...args);
          return res instanceof Promise ? (willRestore = true, res.finally(restore)) : res;
        } finally {
          willRestore || restore();
        }
      }), result = fn(...finalArgs);
      return result && ["object", "function", "symbol"].includes(typeof result) && this.setState(call2.storyId, (state) => ({ callRefsByResult: new Map([...Array.from(state.callRefsByResult.entries()), [result, { __callId__: call2.id, retain: call2.retain }]]) })), this.update({ ...info, status: result instanceof Promise ? "active" : "done" }), result instanceof Promise ? result.then((value) => (this.update({ ...info, status: "done" }), value), handleException) : result;
    } catch (e) {
      return handleException(e);
    }
  }
  update(call2) {
    this.channel.emit(EVENTS.CALL, call2), this.setState(call2.storyId, ({ calls }) => {
      let callsById = calls.concat(call2).reduce((a, c) => Object.assign(a, { [c.id]: c }), {});
      return { calls: Object.values(callsById).sort((a, b) => a.id.localeCompare(b.id, void 0, { numeric: true })) };
    }), this.sync(call2.storyId);
  }
  sync(storyId) {
    let synchronize = () => {
      var _a2;
      let { isLocked, isPlaying } = this.getState(storyId), logItems = this.getLog(storyId), pausedAt = (_a2 = logItems.filter(({ ancestors }) => !ancestors.length).find((item) => item.status === "waiting")) == null ? void 0 : _a2.callId, hasActive = logItems.some((item) => item.status === "active");
      if (isLocked || hasActive || logItems.length === 0) {
        let payload2 = { controlStates: controlsDisabled, logItems };
        this.channel.emit(EVENTS.SYNC, payload2);
        return;
      }
      let hasPrevious = logItems.some((item) => item.status === "done" || item.status === "error"), payload = { controlStates: { start: hasPrevious, back: hasPrevious, goto: true, next: isPlaying, end: isPlaying }, logItems, pausedAt };
      this.channel.emit(EVENTS.SYNC, payload);
    };
    this.setState(storyId, ({ syncTimeout }) => (clearTimeout(syncTimeout), { syncTimeout: setTimeout(synchronize, 0) }));
  }
};
function instrument(obj, options = {}) {
  var _a2, _b2, _c2, _d2;
  try {
    let forceInstrument = false, skipInstrument = false;
    return ((_b2 = (_a2 = scope.window.location) == null ? void 0 : _a2.search) == null ? void 0 : _b2.includes("instrument=true")) ? forceInstrument = true : ((_d2 = (_c2 = scope.window.location) == null ? void 0 : _c2.search) == null ? void 0 : _d2.includes("instrument=false")) && (skipInstrument = true), scope.window.parent === scope.window && !forceInstrument || skipInstrument ? obj : (scope.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__ || (scope.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__ = new Instrumenter()), scope.window.__STORYBOOK_ADDON_INTERACTIONS_INSTRUMENTER__.instrument(obj, options));
  } catch (e) {
    return once.warn(e), obj;
  }
}
var _userEvent = userEvent.default || userEvent, testingLibrary = instrument(
  { ...domTestingLibrary },
  {
    intercept: (method, path) => path[0] === "fireEvent" || method.startsWith("findBy") || method.startsWith("waitFor")
  }
);
testingLibrary.screen = Object.entries(testingLibrary.screen).reduce(
  (acc, [key, val]) => Object.defineProperty(acc, key, {
    get() {
      return once.warn(dedent`
          You are using Testing Library's \`screen\` object. Use \`within(canvasElement)\` instead.
          More info: https://storybook.js.org/docs/react/essentials/interactions
        `), val;
    }
  }),
  { ...testingLibrary.screen }
);
var {
  buildQueries,
  configure,
  createEvent,
  findAllByAltText,
  findAllByDisplayValue,
  findAllByLabelText,
  findAllByPlaceholderText,
  findAllByRole,
  findAllByTestId,
  findAllByText,
  findAllByTitle,
  findByAltText,
  findByDisplayValue,
  findByLabelText,
  findByPlaceholderText,
  findByRole,
  findByTestId,
  findByText,
  findByTitle,
  fireEvent,
  getAllByAltText,
  getAllByDisplayValue,
  getAllByLabelText,
  getAllByPlaceholderText,
  getAllByRole,
  getAllByTestId,
  getAllByText,
  getAllByTitle,
  getByAltText,
  getByDisplayValue,
  getByLabelText,
  getByPlaceholderText,
  getByRole,
  getByTestId,
  getByText,
  getByTitle,
  getConfig,
  getDefaultNormalizer,
  getElementError,
  getNodeText,
  getQueriesForElement,
  getRoles,
  getSuggestedQuery,
  isInaccessible,
  logDOM,
  logRoles,
  prettyDOM,
  queries,
  queryAllByAltText,
  queryAllByAttribute,
  queryAllByDisplayValue,
  queryAllByLabelText,
  queryAllByPlaceholderText,
  queryAllByRole,
  queryAllByTestId,
  queryAllByText,
  queryAllByTitle,
  queryByAltText,
  queryByAttribute,
  queryByDisplayValue,
  queryByLabelText,
  queryByPlaceholderText,
  queryByRole,
  queryByTestId,
  queryByText,
  queryByTitle,
  queryHelpers,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
  prettyFormat
} = testingLibrary;
instrument(
  { userEvent: _userEvent },
  { intercept: true }
).userEvent;
function FrontstageStory(props) {
  const frontstage = createFrontstage({
    ...props.frontstage,
    hideStatusBar: props.hideStatusBar,
    hideToolSettings: props.hideToolSettings
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { layout: "fullscreen", frontstages: [frontstage], ...props });
}
try {
  FrontstageStory.displayName = "FrontstageStory";
  FrontstageStory.__docgenInfo = { "description": "[FrontstageProvider](https://www.itwinjs.org/reference/appui-react/frontstage/frontstageprovider/) can be used to configure a frontstage.", "displayName": "FrontstageStory", "props": { "itemProviders": { "defaultValue": null, "description": "", "name": "itemProviders", "required": false, "type": { "name": "UiItemsProvider[]" } }, "hideToolSettings": { "defaultValue": null, "description": "Set to `true` if no tool setting dock is needed. Typically only used in modal stages.", "name": "hideToolSettings", "required": false, "type": { "name": "boolean" } }, "hideStatusBar": { "defaultValue": null, "description": "Set to `true` if no status bar is needed in stage", "name": "hideStatusBar", "required": false, "type": { "name": "boolean" } }, "frontstage": { "defaultValue": null, "description": "", "name": "frontstage", "required": false, "type": { "name": "Partial<StandardFrontstageProps>" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class VirtualCursorElement extends HTMLElement {
  constructor() {
    super(...arguments);
    __publicField(this, "_removeListeners", []);
    __publicField(this, "top", 100);
    __publicField(this, "left", 100);
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay");
    const cursor = document.createElement("div");
    cursor.setAttribute("class", "cursor");
    const cursorSize = 25;
    const style = document.createElement("style");
    style.textContent = `
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 9999;
      }

      .cursor {
        width: ${cursorSize}px;
        height: ${cursorSize}px;

        background: red;
        border-radius: 50%;
        border: 1px solid black;
        opacity: 0.5;
      }

      .cursor.down {
        background: yellow;
      }
    `;
    const setCursorPosition = (top, left) => {
      this.top = top;
      this.left = left;
      cursor.style.transform = `translate(${left}px, ${top}px)`;
    };
    const setCursorDown = (down) => {
      if (down)
        cursor.classList.add("down");
      if (!down)
        cursor.classList.remove("down");
    };
    setCursorPosition(this.top, this.left);
    setCursorDown(false);
    const getNewPosition = (e) => {
      const left = e.pageX - cursorSize / 2;
      const top = e.pageY - cursorSize / 2;
      return { left, top };
    };
    const handleMouseMove = (e) => {
      const { left, top } = getNewPosition(e);
      setCursorPosition(top, left);
    };
    const handleMouseDown = (e) => {
      const { left, top } = getNewPosition(e);
      setCursorPosition(top, left);
      setCursorDown(true);
    };
    const handleMouseUp = (e) => {
      const { left, top } = getNewPosition(e);
      setCursorPosition(top, left);
      setCursorDown(false);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    const stopPropagation = (e) => {
      e.stopPropagation();
    };
    overlay.addEventListener("mousemove", stopPropagation);
    overlay.addEventListener("mousedown", stopPropagation);
    overlay.addEventListener("mouseup", stopPropagation);
    this._removeListeners.push(
      () => document.removeEventListener("mousemove", handleMouseMove),
      () => document.removeEventListener("mousedown", handleMouseDown),
      () => document.removeEventListener("mouseup", handleMouseUp),
      () => overlay.removeEventListener("mousemove", stopPropagation),
      () => overlay.removeEventListener("mousedown", stopPropagation),
      () => overlay.removeEventListener("mouseup", stopPropagation)
    );
    shadow.appendChild(style);
    shadow.appendChild(overlay);
    overlay.appendChild(cursor);
  }
  disconnectedCallback() {
    for (const removeListener of this._removeListeners) {
      removeListener();
    }
  }
}
function createCursorEvents(initialPosition, onMove, options) {
  let currentPosition = initialPosition;
  const duration = (options == null ? void 0 : options.duration) ?? 250;
  return {
    move: async (to) => {
      const start = Date.now();
      const line = LineSegment3d.create(
        new Point3d(currentPosition.x, currentPosition.y, 0),
        new Point3d(to.x, to.y, 0)
      );
      return new Promise((resolve) => {
        const move = () => {
          const now = Date.now();
          const elapsed = now - start;
          const fraction = elapsed / duration;
          if (fraction < 1) {
            const position = line.fractionToPoint(fraction);
            onMove({ x: position.x, y: position.y });
            requestAnimationFrame(move);
            return;
          }
          onMove(to);
          currentPosition = to;
          resolve();
        };
        requestAnimationFrame(move);
      });
    }
  };
}
if (!customElements.get("virtual-cursor-element"))
  customElements.define("virtual-cursor-element", VirtualCursorElement);
const meta = {
  title: "Frontstage/FrontstageProvider",
  component: FrontstageStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  },
  args: {
    hideStatusBar: true,
    hideToolSettings: true
  },
  argTypes: {
    frontstage: removeProperty(),
    itemProviders: removeProperty()
  }
};
const Overview = {
  args: {
    itemProviders: [{
      id: "widgets",
      provideWidgets: (_stageId, _stageUsage, location) => {
        if (location === StagePanelLocation.Right)
          return [{
            id: "w2",
            label: "Widget 2",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
              children: "Widget content"
            })
          }, {
            id: "w1",
            label: "Widget 1",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
              children: "Widget content"
            }),
            defaultState: WidgetState.Floating,
            canFloat: {
              defaultPosition: {
                x: 20,
                y: 50
              },
              isResizable: true
            }
          }];
        return [];
      }
    }]
  }
};
const Panels = {
  args: {
    frontstage: {
      leftPanelProps: {
        defaultState: StagePanelState.Open,
        pinned: true,
        minSize: 120,
        size: 150
      },
      rightPanelProps: {
        minSize: 120,
        size: 150
      },
      topPanelProps: {
        defaultState: StagePanelState.Open,
        pinned: true,
        minSize: 90,
        size: 100
      },
      bottomPanelProps: {
        minSize: 90,
        size: 100
      }
    },
    itemProviders: [{
      id: "widgets",
      provideWidgets: (_stageId, _stageUsage, location) => {
        if (location === StagePanelLocation.Top)
          return [{
            id: "w1",
            label: "Widget 1",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
              children: "Top panel"
            })
          }];
        if (location === StagePanelLocation.Left)
          return [{
            id: "w2",
            label: "Widget 2",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
              children: "Left panel"
            })
          }];
        if (location === StagePanelLocation.Bottom)
          return [{
            id: "w3",
            label: "Widget 3",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
              children: "Bottom panel"
            })
          }];
        if (location === StagePanelLocation.Right)
          return [{
            id: "w4",
            label: "Widget 4",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
              children: "Right panel"
            })
          }];
        return [];
      }
    }]
  }
};
const PanelSections = {
  args: {
    frontstage: {
      rightPanelProps: {
        minSize: 120,
        size: 150
      },
      bottomPanelProps: {
        minSize: 90,
        size: 100
      }
    },
    itemProviders: [{
      id: "widgets",
      provideWidgets: (_stageId, _stageUsage, location, section) => {
        if (location === StagePanelLocation.Right && section === StagePanelSection.Start)
          return [{
            id: "w3",
            label: "Widget 3",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
              children: "Start section"
            })
          }];
        if (location === StagePanelLocation.Right && section === StagePanelSection.End)
          return [{
            id: "w4",
            label: "Widget 4",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
              children: "End section"
            })
          }];
        if (location === StagePanelLocation.Bottom && section === StagePanelSection.Start)
          return [{
            id: "w1",
            label: "Widget 1",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
              children: "Start section"
            })
          }];
        if (location === StagePanelLocation.Bottom && section === StagePanelSection.End)
          return [{
            id: "w2",
            label: "Widget 2",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
              children: "End section"
            })
          }];
        return [];
      }
    }]
  }
};
const FloatingWidgets = {
  args: {
    itemProviders: [{
      id: "widgets",
      provideWidgets: () => {
        return [{
          id: "w1",
          label: "Widget 1",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
            children: "Floating widget"
          }),
          defaultState: WidgetState.Floating,
          canFloat: {
            defaultPosition: {
              x: 20,
              y: 20
            }
          }
        }, {
          id: "w2",
          label: "Widget 2",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
            children: "Floating widget"
          }),
          defaultState: WidgetState.Floating,
          canFloat: {
            defaultPosition: {
              x: 20,
              y: 200
            }
          }
        }];
      }
    }]
  }
};
const WidgetContainer = {
  args: {
    frontstage: {
      rightPanelProps: {
        size: 300
      }
    },
    itemProviders: [{
      id: "widgets",
      provideWidgets: (_stageId, _stageUsage, location) => {
        if (location !== StagePanelLocation.Right)
          return [];
        return [{
          id: "w1",
          label: "Widget 1",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
            children: "Widget content"
          }),
          defaultState: WidgetState.Floating,
          canFloat: {
            defaultPosition: {
              x: 20,
              y: 20
            },
            containerId: "fw1"
          }
        }, {
          id: "w2",
          label: "Widget 2",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
            children: "Widget content"
          }),
          defaultState: WidgetState.Floating,
          canFloat: {
            containerId: "fw1"
          }
        }, {
          id: "w3",
          label: "Widget 3",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
            children: "Widget content"
          }),
          canFloat: {
            containerId: "fw1"
          }
        }, {
          id: "w4",
          label: "Widget 4",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
            children: "Widget content"
          }),
          canFloat: {
            containerId: "fw1"
          }
        }, {
          id: "w5",
          label: "Widget 5",
          content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", {
            children: "Widget content"
          }),
          canFloat: {
            containerId: "fw1"
          }
        }];
      }
    }]
  }
};
const Interaction = {
  args: {
    itemProviders: [{
      id: "widgets",
      provideWidgets: (_stageId, _stageUsage, location) => {
        if (location === StagePanelLocation.Right)
          return [{
            id: "w1",
            label: "Widget 1",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
              children: "Widget content"
            })
          }, {
            id: "w2",
            label: "Widget 2",
            content: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
              children: "Widget content"
            })
          }];
        return [];
      }
    }]
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const virtualMouse = new VirtualCursorElement();
    canvasElement.append(virtualMouse);
    const cursorEvents = createCursorEvents({
      x: virtualMouse.left,
      y: virtualMouse.top
    }, (to) => {
      fireEvent.mouseMove(canvasElement.ownerDocument, {
        clientX: to.x,
        clientY: to.y
      });
    });
    await step("test", async () => {
      const widget = await canvas.findByTitle("Widget 2", void 0, {
        timeout: 5e3
      });
      const initialBounds = widget.getBoundingClientRect();
      const startPos = {
        x: initialBounds.x + 10,
        y: initialBounds.y + 10
      };
      const moveTo = {
        x: initialBounds.x - 300,
        y: initialBounds.y + 200
      };
      await wait(1e3);
      await cursorEvents.move(startPos);
      await wait(1e3);
      fireEvent.mouseDown(widget, {
        clientX: startPos.x,
        clientY: startPos.y
      });
      await cursorEvents.move(moveTo);
      await wait(500);
      fireEvent.mouseUp(widget.ownerDocument, {
        clientX: moveTo.x,
        clientY: moveTo.y
      });
    });
  }
};
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
Overview.parameters = {
  ...Overview.parameters,
  docs: {
    ...(_a = Overview.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    itemProviders: [{\n      id: "widgets",\n      provideWidgets: (_stageId, _stageUsage, location) => {\n        if (location === StagePanelLocation.Right) return [{\n          id: "w2",\n          label: "Widget 2",\n          content: <>Widget content</>\n        }, {\n          id: "w1",\n          label: "Widget 1",\n          content: <>Widget content</>,\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            defaultPosition: {\n              x: 20,\n              y: 50\n            },\n            isResizable: true\n          }\n        }];\n        return [];\n      }\n    }]\n  }\n}',
      ...(_c = (_b = Overview.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Panels.parameters = {
  ...Panels.parameters,
  docs: {
    ...(_d = Panels.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstage: {\n      leftPanelProps: {\n        defaultState: StagePanelState.Open,\n        pinned: true,\n        minSize: 120,\n        size: 150\n      },\n      rightPanelProps: {\n        minSize: 120,\n        size: 150\n      },\n      topPanelProps: {\n        defaultState: StagePanelState.Open,\n        pinned: true,\n        minSize: 90,\n        size: 100\n      },\n      bottomPanelProps: {\n        minSize: 90,\n        size: 100\n      }\n    },\n    itemProviders: [{\n      id: "widgets",\n      provideWidgets: (_stageId, _stageUsage, location) => {\n        if (location === StagePanelLocation.Top) return [{\n          id: "w1",\n          label: "Widget 1",\n          content: <b>Top panel</b>\n        }];\n        if (location === StagePanelLocation.Left) return [{\n          id: "w2",\n          label: "Widget 2",\n          content: <b>Left panel</b>\n        }];\n        if (location === StagePanelLocation.Bottom) return [{\n          id: "w3",\n          label: "Widget 3",\n          content: <b>Bottom panel</b>\n        }];\n        if (location === StagePanelLocation.Right) return [{\n          id: "w4",\n          label: "Widget 4",\n          content: <b>Right panel</b>\n        }];\n        return [];\n      }\n    }]\n  }\n}',
      ...(_f = (_e = Panels.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
PanelSections.parameters = {
  ...PanelSections.parameters,
  docs: {
    ...(_g = PanelSections.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstage: {\n      rightPanelProps: {\n        minSize: 120,\n        size: 150\n      },\n      bottomPanelProps: {\n        minSize: 90,\n        size: 100\n      }\n    },\n    itemProviders: [{\n      id: "widgets",\n      provideWidgets: (_stageId, _stageUsage, location, section) => {\n        if (location === StagePanelLocation.Right && section === StagePanelSection.Start) return [{\n          id: "w3",\n          label: "Widget 3",\n          content: <b>Start section</b>\n        }];\n        if (location === StagePanelLocation.Right && section === StagePanelSection.End) return [{\n          id: "w4",\n          label: "Widget 4",\n          content: <b>End section</b>\n        }];\n        if (location === StagePanelLocation.Bottom && section === StagePanelSection.Start) return [{\n          id: "w1",\n          label: "Widget 1",\n          content: <b>Start section</b>\n        }];\n        if (location === StagePanelLocation.Bottom && section === StagePanelSection.End) return [{\n          id: "w2",\n          label: "Widget 2",\n          content: <b>End section</b>\n        }];\n        return [];\n      }\n    }]\n  }\n}',
      ...(_i = (_h = PanelSections.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
FloatingWidgets.parameters = {
  ...FloatingWidgets.parameters,
  docs: {
    ...(_j = FloatingWidgets.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    itemProviders: [{\n      id: "widgets",\n      provideWidgets: () => {\n        return [{\n          id: "w1",\n          label: "Widget 1",\n          content: <b>Floating widget</b>,\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            defaultPosition: {\n              x: 20,\n              y: 20\n            }\n          }\n        }, {\n          id: "w2",\n          label: "Widget 2",\n          content: <b>Floating widget</b>,\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            defaultPosition: {\n              x: 20,\n              y: 200\n            }\n          }\n        }];\n      }\n    }]\n  }\n}',
      ...(_l = (_k = FloatingWidgets.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
WidgetContainer.parameters = {
  ...WidgetContainer.parameters,
  docs: {
    ...(_m = WidgetContainer.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstage: {\n      rightPanelProps: {\n        size: 300\n      }\n    },\n    itemProviders: [{\n      id: "widgets",\n      provideWidgets: (_stageId, _stageUsage, location) => {\n        if (location !== StagePanelLocation.Right) return [];\n        return [{\n          id: "w1",\n          label: "Widget 1",\n          content: <b>Widget content</b>,\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            defaultPosition: {\n              x: 20,\n              y: 20\n            },\n            containerId: "fw1"\n          }\n        }, {\n          id: "w2",\n          label: "Widget 2",\n          content: <b>Widget content</b>,\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            containerId: "fw1"\n          }\n        }, {\n          id: "w3",\n          label: "Widget 3",\n          content: <b>Widget content</b>,\n          canFloat: {\n            containerId: "fw1"\n          }\n        }, {\n          id: "w4",\n          label: "Widget 4",\n          content: <b>Widget content</b>,\n          canFloat: {\n            containerId: "fw1"\n          }\n        }, {\n          id: "w5",\n          label: "Widget 5",\n          content: <b>Widget content</b>,\n          canFloat: {\n            containerId: "fw1"\n          }\n        }];\n      }\n    }]\n  }\n}',
      ...(_o = (_n = WidgetContainer.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
Interaction.parameters = {
  ...Interaction.parameters,
  docs: {
    ...(_p = Interaction.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: '{\n  args: {\n    itemProviders: [{\n      id: "widgets",\n      provideWidgets: (_stageId, _stageUsage, location) => {\n        if (location === StagePanelLocation.Right) return [{\n          id: "w1",\n          label: "Widget 1",\n          content: <>Widget content</>\n        }, {\n          id: "w2",\n          label: "Widget 2",\n          content: <>Widget content</>\n        }];\n        return [];\n      }\n    }]\n  },\n  play: async ({\n    canvasElement,\n    step\n  }) => {\n    const canvas = within(canvasElement);\n    const virtualMouse = new VirtualCursorElement();\n    canvasElement.append(virtualMouse);\n    const cursorEvents = createCursorEvents({\n      x: virtualMouse.left,\n      y: virtualMouse.top\n    }, to => {\n      fireEvent.mouseMove(canvasElement.ownerDocument, {\n        clientX: to.x,\n        clientY: to.y\n      });\n    });\n    await step("test", async () => {\n      const widget = await canvas.findByTitle("Widget 2", undefined, {\n        timeout: 5000\n      });\n      const initialBounds = widget.getBoundingClientRect();\n      const startPos = {\n        x: initialBounds.x + 10,\n        y: initialBounds.y + 10\n      };\n      const moveTo = {\n        x: initialBounds.x - 300,\n        y: initialBounds.y + 200\n      };\n      await wait(1000);\n      await cursorEvents.move(startPos);\n      await wait(1000);\n      fireEvent.mouseDown(widget, {\n        clientX: startPos.x,\n        clientY: startPos.y\n      });\n      await cursorEvents.move(moveTo);\n      await wait(500);\n      fireEvent.mouseUp(widget.ownerDocument, {\n        clientX: moveTo.x,\n        clientY: moveTo.y\n      });\n    });\n  }\n}',
      ...(_r = (_q = Interaction.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
const __namedExportsOrder = ["Overview", "Panels", "PanelSections", "FloatingWidgets", "WidgetContainer", "Interaction"];
export {
  FloatingWidgets,
  Interaction,
  Overview,
  PanelSections,
  Panels,
  WidgetContainer,
  __namedExportsOrder,
  meta as default
};
