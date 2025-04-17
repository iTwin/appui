import { d as demoIModelGlobalType, w as withDemoIModel } from "./DemoIModel-zibz9A5r.js";
import { r as resizerGlobalType } from "./Resizer-VP4qdPN_.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { r as reactExports, a as React, R as React$1 } from "./index-R26Bfrts.js";
import { c as cx, T as ThemeProvider } from "./SvgCloseSmall-QhdYiNU4.js";
import "./index-CHBBkG1-.js";
import "./iframe-B_Ok6LzO.js";
import "../sb-preview/runtime.js";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function hasOwnProperty(object, prop) {
  if (typeof Object.hasOwn === "function") {
    return Object.hasOwn(object, prop);
  }
  return Object.prototype.hasOwnProperty.call(object, prop);
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
function isValidElementWithRef(element) {
  if (!element) return false;
  if (!reactExports.isValidElement(element)) return false;
  if ("ref" in element.props) return true;
  if ("ref" in element) return true;
  return false;
}
function getRefProperty(element) {
  if (!isValidElementWithRef(element)) return null;
  const props = __spreadValues({}, element.props);
  return props.ref || element.ref;
}
function mergeProps(base, overrides) {
  const props = __spreadValues({}, base);
  for (const key in overrides) {
    if (!hasOwnProperty(overrides, key)) continue;
    if (key === "className") {
      const prop = "className";
      props[prop] = base[prop] ? `${base[prop]} ${overrides[prop]}` : overrides[prop];
      continue;
    }
    if (key === "style") {
      const prop = "style";
      props[prop] = base[prop] ? __spreadValues(__spreadValues({}, base[prop]), overrides[prop]) : overrides[prop];
      continue;
    }
    const overrideValue = overrides[key];
    if (typeof overrideValue === "function" && key.startsWith("on")) {
      const baseValue = base[key];
      if (typeof baseValue === "function") {
        props[key] = (...args) => {
          overrideValue(...args);
          baseValue(...args);
        };
        continue;
      }
    }
    props[key] = overrideValue;
  }
  return props;
}
var _React = __spreadValues({}, React);
_React.useId;
_React.useDeferredValue;
_React.useInsertionEffect;
function useMergeRefs(...refs) {
  return reactExports.useMemo(() => {
    if (!refs.some(Boolean)) return;
    return (value) => {
      for (const ref of refs) {
        setRef(ref, value);
      }
    };
  }, refs);
}
function forwardRef2(render) {
  const Role3 = reactExports.forwardRef((props, ref) => render(__spreadProps(__spreadValues({}, props), { ref })));
  Role3.displayName = render.displayName || render.name;
  return Role3;
}
function createElement(Type, props) {
  const _a = props, { wrapElement, render } = _a, rest = __objRest(_a, ["wrapElement", "render"]);
  const mergedRef = useMergeRefs(props.ref, getRefProperty(render));
  let element;
  if (reactExports.isValidElement(render)) {
    const renderProps = __spreadProps(__spreadValues({}, render.props), { ref: mergedRef });
    element = reactExports.cloneElement(render, mergeProps(rest, renderProps));
  } else if (render) {
    element = render(rest);
  } else {
    element = /* @__PURE__ */ jsxRuntimeExports.jsx(Type, __spreadValues({}, rest));
  }
  if (wrapElement) {
    return wrapElement(element);
  }
  return element;
}
var TagName = "div";
var elements = [
  "a",
  "button",
  "details",
  "dialog",
  "div",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "section",
  "select",
  "span",
  "summary",
  "textarea",
  "ul",
  "svg"
];
var Role = forwardRef2(
  // @ts-expect-error
  function Role2(props) {
    return createElement(TagName, props);
  }
);
Object.assign(
  Role,
  elements.reduce((acc, element) => {
    acc[element] = forwardRef2(function Role3(props) {
      return createElement(element, props);
    });
    return acc;
  }, {})
);
var styles_default$1 = String.raw`@layer reset{*,:before,:after{box-sizing:border-box;margin:0;padding:0}:where([hidden]:not([hidden=until-found])){display:none!important}:where(html){-webkit-text-size-adjust:auto}:where(html:has(dialog:modal[open])){overflow:clip}:where(input,button,textarea,select){font:inherit;color:inherit}:where(img,picture,svg,video){block-size:auto;max-inline-size:100%;display:block}:where(p,h1,h2,h3,h4,h5,h6){overflow-wrap:break-word}:where(dialog,[popover]){color:inherit;inset:unset;max-width:unset;max-height:unset;overflow:unset;background:0 0;border:none}:where(dialog:not([open],[popover]),[popover]:not(:popover-open)){display:none!important}}@layer kiwi.foundations{html:where([data-color-scheme=light]),:host([data-color-scheme=light]),.🥝-root:where([data-kiwi-theme=light]){--kiwi-color-border-shadow-base:var(--kiwi-color-border-neutral-base);--kiwi-color-border-shadow-strong:#0000001f}@supports (color:lab(0% 0 0)){html:where([data-color-scheme=light]),:host([data-color-scheme=light]),.🥝-root:where([data-kiwi-theme=light]){--kiwi-color-border-shadow-strong:lab(0% 0 0/.12)}}:is(html:where([data-color-scheme=light]),:host([data-color-scheme=light]),.🥝-root:where([data-kiwi-theme=light])){--kiwi-color-bg-mono-base:#6b737d;--kiwi-color-bg-mono-muted:#fbfcfd;--kiwi-color-bg-mono-faded:#36393f;--kiwi-color-bg-accent-base:#188166;--kiwi-color-bg-accent-muted:#cae2dc;--kiwi-color-bg-accent-faded:#0d4133;--kiwi-color-bg-info-base:#0470dd;--kiwi-color-bg-info-muted:#c8dff8;--kiwi-color-bg-info-faded:#033970;--kiwi-color-bg-positive-base:#228404;--kiwi-color-bg-positive-muted:#cde3c6;--kiwi-color-bg-positive-faded:#114302;--kiwi-color-bg-attention-base:#9a6804;--kiwi-color-bg-attention-muted:#ecdbb9;--kiwi-color-bg-attention-faded:#4e3402;--kiwi-color-bg-critical-base:#df1c41;--kiwi-color-bg-critical-muted:#f9d4db;--kiwi-color-bg-critical-faded:#730e22;--kiwi-color-bg-surface-secondary:#edeeef;--kiwi-color-bg-surface-primary:#f7f8f9;--kiwi-color-bg-surface-tertiary:#e1e3e6;--kiwi-color-bg-surface-emphasis:#090a0b;--kiwi-color-bg-surface-base:#fbfcfd;--kiwi-color-bg-surface-quaternary:#111213;--kiwi-color-bg-neutral-base:#fbfcfd;--kiwi-color-bg-neutral-muted:#25282c;--kiwi-color-bg-neutral-faded:#edeeef;--kiwi-color-bg-neutral-inverse:#fbfcfd;--kiwi-color-bg-glow-base-hover-\%:4.0%;--kiwi-color-bg-glow-base-pressed-\%:8.0%;--kiwi-color-bg-glow-on-surface-accent-hover:#1881661f;--kiwi-color-bg-glow-on-surface-accent-pressed:#18816629;--kiwi-color-bg-glow-on-surface-neutral-hover:#0000000a;--kiwi-color-bg-glow-on-surface-neutral-pressed:#00000014;--kiwi-color-bg-glow-on-surface-critical-pressed:#df1c4129;--kiwi-color-bg-glow-on-surface-critical-hover:#df1c411f;--kiwi-color-bg-glow-on-surface-disabled:#0000000a;--kiwi-color-bg-glow-on-surface-overlay:#0000003d;--kiwi-color-bg-glow-on-surface-neutral-hover-\%:4.0%;--kiwi-color-bg-glow-on-surface-neutral-pressed-\%:8.0%;--kiwi-color-bg-glow-strong-pressed-\%:16.0%;--kiwi-color-bg-glow-strong-hover-\%:8.0%;--kiwi-color-icon-neutral-hover:#25282c;--kiwi-color-icon-neutral-base:#6b737d;--kiwi-color-icon-neutral-secondary:#969ca4;--kiwi-color-icon-neutral-tertiary:#acb1b7;--kiwi-color-icon-neutral-disabled:#acb1b7;--kiwi-color-icon-neutral-emphasis:#fff;--kiwi-color-icon-neutral-muted:#b8bdc1;--kiwi-color-icon-accent-base:#188166;--kiwi-color-icon-accent-strong:#188166;--kiwi-color-icon-accent-faded:#146b54;--kiwi-color-icon-info-base:#0470dd;--kiwi-color-icon-info-faded:#035db8;--kiwi-color-icon-positive-base:#228404;--kiwi-color-icon-positive-faded:#1c6d01;--kiwi-color-icon-attention-base:#9a6804;--kiwi-color-icon-attention-faded:#805604;--kiwi-color-icon-critical-base:#df1c41;--kiwi-color-icon-critical-faded:#ba1536;--kiwi-color-icon-mono-base:#6b737d;--kiwi-color-icon-mono-faded:#585f68;--kiwi-color-icon-glow-base-hover-\%:8.0%;--kiwi-color-icon-glow-base-pressed-\%:12.0%;--kiwi-color-icon-glow-strong-hover-\%:8.0%;--kiwi-color-icon-glow-strong-pressed-\%:16.0%;--kiwi-color-border-mono-base:#6b737d;--kiwi-color-border-mono-faded:#474c53;--kiwi-color-border-mono-muted:#808791;--kiwi-color-border-accent-base:#188166;--kiwi-color-border-accent-faded:#125544;--kiwi-color-border-accent-muted:#a7cfc4;--kiwi-color-border-accent-strong:#188166;--kiwi-color-border-info-base:#0470dd;--kiwi-color-border-info-faded:#024a93;--kiwi-color-border-info-muted:#a3caf3;--kiwi-color-border-positive-base:#228404;--kiwi-color-border-positive-muted:#acd1a0;--kiwi-color-border-positive-faded:#175801;--kiwi-color-border-attention-base:#9a6804;--kiwi-color-border-attention-muted:#dfc38a;--kiwi-color-border-attention-faded:#664502;--kiwi-color-border-critical-base:#df1c41;--kiwi-color-border-critical-muted:#f5b6c2;--kiwi-color-border-critical-faded:#96122c;--kiwi-color-border-glow-base-hover-\%:8.0%;--kiwi-color-border-glow-base-pressed-\%:12.0%;--kiwi-color-border-glow-on-surface-faded:#0000000a;--kiwi-color-border-glow-on-surface-disabled:#00000014;--kiwi-color-border-glow-strong-hover-\%:8.0%;--kiwi-color-border-glow-strong-pressed-\%:16.0%;--kiwi-color-border-neutral-base:#d4d7da;--kiwi-color-border-neutral-muted:#edeeef;--kiwi-color-border-neutral-faded:#c3c7cb;--kiwi-color-border-neutral-inverse:#090a0b;--kiwi-color-border-neutral-disabled:#acb1b7;--kiwi-color-border-surface-primary:#000000a3;--kiwi-color-text-mono-base:#6b737d;--kiwi-color-text-mono-faded:#585f68;--kiwi-color-text-accent-base:#188166;--kiwi-color-text-accent-faded:#146b54;--kiwi-color-text-accent-strong:#188166;--kiwi-color-text-info-base:#0470dd;--kiwi-color-text-info-faded:#035db8;--kiwi-color-text-positive-base:#228404;--kiwi-color-text-positive-faded:#1c6d01;--kiwi-color-text-attention-base:#9a6804;--kiwi-color-text-attention-faded:#805604;--kiwi-color-text-critical-base:#df1c41;--kiwi-color-text-critical-faded:#ba1536;--kiwi-color-text-neutral-emphasis:#fff;--kiwi-color-text-neutral-primary:#25282c;--kiwi-color-text-neutral-secondary:#474c53;--kiwi-color-text-neutral-tertiary:#585f68;--kiwi-color-text-neutral-disabled:#acb1b7;--kiwi-color-text-glow-base-hover-\%:8.0%;--kiwi-color-text-glow-base-pressed-\%:12.0%;--kiwi-color-text-glow-strong-hover-\%:8.0%;--kiwi-color-text-glow-strong-pressed-\%:16.0%;--kiwi-color-static-black:#000;--kiwi-color-static-white:#fff;--kiwi-color-static-accent:#188166;--kiwi-color-glow-hue:#000;--kiwi-shadow-surface-xs:0px 1px 0px 0px #0000000a,0px 0px 0px 1px #0000000a,inset 0px 0px 0px 1px #ffffff14,0px 1px 1px -.5px #0000000a;--kiwi-shadow-surface-sm:0px 1px 0px 0px #0000000a,0px 0px 0px 1px #0000000a,inset 0px 0px 0px 1px #ffffff14,0px 1px 1px -.5px #0000000a,0px 3px 3px -1.5px #0000000a;--kiwi-shadow-surface-md:0px 1px 0px 0px #0000000a,0px 0px 0px 1px #0000000a,0px 1px 1px -.5px #0000000a,inset 0px 0px 0px 1px #ffffff14,0px 3px 3px -1.5px #0000000a,0px 6px 6px -3px #0000000a;--kiwi-shadow-surface-lg:0px 1px 0px 0px #0000000a,0px 0px 0px 1px #0000000a,inset 0px 0px 0px 1px #ffffff14,0px 1px 1px -.5px #0000000a,0px 3px 3px -1.5px #0000000a,0px 6px 6px -3px #0000000a,0px 12px 12px -6px #0000000a;--kiwi-shadow-surface-xl:0px 1px 0px 0px #0000000a,0px 0px 0px 1px #0000000a,inset 0px 0px 0px 1px #ffffff14,0px 1px 1px -.5px #0000000a,0px 3px 3px -1.5px #0000000a,0px 6px 6px -3px #0000000a,0px 12px 12px -6px #0000000a,0px 24px 24px -12px #0000000a;--kiwi-shadow-button-base-drop:0px 1px 1px -.5px #0000000a,0px 3px 3px -1.5px #0000000a;--kiwi-shadow-button-base-inset:inset 0px -1px 0px 0px #00000014;--kiwi-shadow-input-base:inset 0px 1px 1px 0px #0000000a,inset 0px 2px 4px 0px #0000000a;--kiwi-shadow-tooltip-base:0px 1px 1px -.5px #0000000a,0px 3px 3px -1.5px #0000000a,0px 6px 6px -3px #0000000a,0px 12px 12px -6px #0000000a;--kiwi-shadow-toolbar-base:0px 1px 0px 0px #0000000a,0px 0px 0px 1px #000c,inset 0px 0px 0px 1px #ffffff14,0px 1px 1px -.5px #0000000a,0px 3px 3px -1.5px #0000000a,0px 6px 6px -3px #0000000a,0px 12px 12px -6px #0000000a,0px 24px 24px -12px #0000000a}@supports (color:lab(0% 0 0)){:is(html:where([data-color-scheme=light]),:host([data-color-scheme=light]),.🥝-root:where([data-kiwi-theme=light])){--kiwi-color-bg-mono-base:lab(48.0166% -1.43915 -6.5074);--kiwi-color-bg-mono-muted:lab(98.9092% -.247031 -.706732);--kiwi-color-bg-mono-faded:lab(23.8534% -.214189 -4.11189);--kiwi-color-bg-accent-base:lab(47.9563% -34.9245 6.19844);--kiwi-color-bg-accent-muted:lab(87.9759% -9.19014 .0959873);--kiwi-color-bg-accent-faded:lab(23.9375% -20.5725 3.46543);--kiwi-color-bg-info-base:lab(47.0129% 6.89358 -64.3085);--kiwi-color-bg-info-muted:lab(87.698% -4.01369 -14.8192);--kiwi-color-bg-info-faded:lab(23.4622% 1.99829 -36.9401);--kiwi-color-bg-positive-base:lab(48.1335% -44.6409 49.5307);--kiwi-color-bg-positive-muted:lab(88.0118% -11.6213 11.7514);--kiwi-color-bg-positive-faded:lab(24.1751% -26.9395 30.542);--kiwi-color-bg-attention-base:lab(48.4136% 15.4963 54.4339);--kiwi-color-bg-attention-muted:lab(88.1498% 2.15477 19.165);--kiwi-color-bg-attention-faded:lab(24.1971% 8.78102 32.5961);--kiwi-color-bg-critical-base:lab(48.9224% 71.0533 33.7629);--kiwi-color-bg-critical-muted:lab(88.2422% 14.0584 1.58488);--kiwi-color-bg-critical-faded:lab(24.3988% 42.8858 18.0549);--kiwi-color-bg-surface-secondary:lab(94.0372% -.246972 -.706685);--kiwi-color-bg-surface-primary:lab(97.5288% -.247031 -.706697);--kiwi-color-bg-surface-tertiary:lab(90.1495% -.315368 -1.86194);--kiwi-color-bg-surface-emphasis:lab(2.6968% -.176921 -.525138);--kiwi-color-bg-surface-base:lab(98.9092% -.247031 -.706732);--kiwi-color-bg-surface-quaternary:lab(5.39981% -.273019 -.834915);--kiwi-color-bg-neutral-base:lab(98.9092% -.247031 -.706732);--kiwi-color-bg-neutral-muted:lab(15.9236% -.636965 -3.2773);--kiwi-color-bg-neutral-faded:lab(94.0372% -.246972 -.706685);--kiwi-color-bg-neutral-inverse:lab(98.9092% -.247031 -.706732);--kiwi-color-bg-glow-on-surface-accent-hover:lab(47.9563% -34.9245 6.19844/.12);--kiwi-color-bg-glow-on-surface-accent-pressed:lab(47.9563% -34.9245 6.19844/.16);--kiwi-color-bg-glow-on-surface-neutral-hover:lab(0% 0 0/.04);--kiwi-color-bg-glow-on-surface-neutral-pressed:lab(0% 0 0/.08);--kiwi-color-bg-glow-on-surface-critical-pressed:lab(48.9224% 71.0533 33.7629/.16);--kiwi-color-bg-glow-on-surface-critical-hover:lab(48.9224% 71.0533 33.7629/.12);--kiwi-color-bg-glow-on-surface-disabled:lab(0% 0 0/.04);--kiwi-color-bg-glow-on-surface-overlay:lab(0% 0 0/.24);--kiwi-color-icon-neutral-hover:lab(15.9236% -.636965 -3.2773);--kiwi-color-icon-neutral-base:lab(48.0166% -1.43915 -6.5074);--kiwi-color-icon-neutral-secondary:lab(64.054% -1.04737 -5.12308);--kiwi-color-icon-neutral-tertiary:lab(71.9356% -.923872 -3.62363);--kiwi-color-icon-neutral-disabled:lab(71.9356% -.923872 -3.62363);--kiwi-color-icon-neutral-emphasis:lab(100% 0 0);--kiwi-color-icon-neutral-muted:lab(76.2989% -1.2362 -2.68073);--kiwi-color-icon-accent-base:lab(47.9563% -34.9245 6.19844);--kiwi-color-icon-accent-strong:lab(47.9563% -34.9245 6.19844);--kiwi-color-icon-accent-faded:lab(39.9909% -30.3487 5.56632);--kiwi-color-icon-info-base:lab(47.0129% 6.89358 -64.3085);--kiwi-color-icon-info-faded:lab(39.1976% 5.53149 -55.6635);--kiwi-color-icon-positive-base:lab(48.1335% -44.6409 49.5307);--kiwi-color-icon-positive-faded:lab(39.9631% -38.7919 43.5088);--kiwi-color-icon-attention-base:lab(48.4136% 15.4963 54.4339);--kiwi-color-icon-attention-faded:lab(40.3825% 13.3977 47.2814);--kiwi-color-icon-critical-base:lab(48.9224% 71.0533 33.7629);--kiwi-color-icon-critical-faded:lab(40.7732% 62.087 28.9054);--kiwi-color-icon-mono-base:lab(48.0166% -1.43915 -6.5074);--kiwi-color-icon-mono-faded:lab(39.9415% -1.2762 -6.16004);--kiwi-color-border-mono-base:lab(48.0166% -1.43915 -6.5074);--kiwi-color-border-mono-faded:lab(32.0457% -.837266 -4.75932);--kiwi-color-border-mono-muted:lab(55.9762% -1.06928 -6.24512);--kiwi-color-border-accent-base:lab(47.9563% -34.9245 6.19844);--kiwi-color-border-accent-faded:lab(31.7715% -24.8213 3.70236);--kiwi-color-border-accent-muted:lab(79.9997% -15.3805 .888169);--kiwi-color-border-accent-strong:lab(47.9563% -34.9245 6.19844);--kiwi-color-border-info-base:lab(47.0129% 6.89358 -64.3085);--kiwi-color-border-info-faded:lab(31.1021% 4.10384 -46.6708);--kiwi-color-border-info-muted:lab(79.5683% -6.13773 -24.6515);--kiwi-color-border-positive-base:lab(48.1335% -44.6409 49.5307);--kiwi-color-border-positive-muted:lab(80.1967% -19.5707 20.2529);--kiwi-color-border-positive-faded:lab(32.2353% -32.9313 37.368);--kiwi-color-border-attention-base:lab(48.4136% 15.4963 54.4339);--kiwi-color-border-attention-muted:lab(80.2272% 4.41358 32.3333);--kiwi-color-border-attention-faded:lab(32.3185% 10.6467 40.4656);--kiwi-color-border-critical-base:lab(48.9224% 71.0533 33.7629);--kiwi-color-border-critical-muted:lab(80.2428% 24.9421 3.36735);--kiwi-color-border-critical-faded:lab(32.6435% 52.4911 23.3912);--kiwi-color-border-glow-on-surface-faded:lab(0% 0 0/.04);--kiwi-color-border-glow-on-surface-disabled:lab(0% 0 0/.08);--kiwi-color-border-neutral-base:lab(85.8119% -.611454 -1.76426);--kiwi-color-border-neutral-muted:lab(94.0372% -.246972 -.706685);--kiwi-color-border-neutral-faded:lab(80.0111% -.849456 -2.46736);--kiwi-color-border-neutral-inverse:lab(2.6968% -.176921 -.525138);--kiwi-color-border-neutral-disabled:lab(71.9356% -.923872 -3.62363);--kiwi-color-border-surface-primary:lab(0% 0 0/.64);--kiwi-color-text-mono-base:lab(48.0166% -1.43915 -6.5074);--kiwi-color-text-mono-faded:lab(39.9415% -1.2762 -6.16004);--kiwi-color-text-accent-base:lab(47.9563% -34.9245 6.19844);--kiwi-color-text-accent-faded:lab(39.9909% -30.3487 5.56632);--kiwi-color-text-accent-strong:lab(47.9563% -34.9245 6.19844);--kiwi-color-text-info-base:lab(47.0129% 6.89358 -64.3085);--kiwi-color-text-info-faded:lab(39.1976% 5.53149 -55.6635);--kiwi-color-text-positive-base:lab(48.1335% -44.6409 49.5307);--kiwi-color-text-positive-faded:lab(39.9631% -38.7919 43.5088);--kiwi-color-text-attention-base:lab(48.4136% 15.4963 54.4339);--kiwi-color-text-attention-faded:lab(40.3825% 13.3977 47.2814);--kiwi-color-text-critical-base:lab(48.9224% 71.0533 33.7629);--kiwi-color-text-critical-faded:lab(40.7732% 62.087 28.9054);--kiwi-color-text-neutral-emphasis:lab(100% 0 0);--kiwi-color-text-neutral-primary:lab(15.9236% -.636965 -3.2773);--kiwi-color-text-neutral-secondary:lab(32.0457% -.837266 -4.75932);--kiwi-color-text-neutral-tertiary:lab(39.9415% -1.2762 -6.16004);--kiwi-color-text-neutral-disabled:lab(71.9356% -.923872 -3.62363);--kiwi-color-static-black:lab(0% 0 0);--kiwi-color-static-white:lab(100% 0 0);--kiwi-color-static-accent:lab(47.9563% -34.9245 6.19844);--kiwi-color-glow-hue:lab(0% 0 0);--kiwi-shadow-surface-xs:0px 1px 0px 0px lab(0% 0 0/.04),0px 0px 0px 1px lab(0% 0 0/.04),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 1px 1px -.5px lab(0% 0 0/.04);--kiwi-shadow-surface-sm:0px 1px 0px 0px lab(0% 0 0/.04),0px 0px 0px 1px lab(0% 0 0/.04),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 1px 1px -.5px lab(0% 0 0/.04),0px 3px 3px -1.5px lab(0% 0 0/.04);--kiwi-shadow-surface-md:0px 1px 0px 0px lab(0% 0 0/.04),0px 0px 0px 1px lab(0% 0 0/.04),0px 1px 1px -.5px lab(0% 0 0/.04),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 3px 3px -1.5px lab(0% 0 0/.04),0px 6px 6px -3px lab(0% 0 0/.04);--kiwi-shadow-surface-lg:0px 1px 0px 0px lab(0% 0 0/.04),0px 0px 0px 1px lab(0% 0 0/.04),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 1px 1px -.5px lab(0% 0 0/.04),0px 3px 3px -1.5px lab(0% 0 0/.04),0px 6px 6px -3px lab(0% 0 0/.04),0px 12px 12px -6px lab(0% 0 0/.04);--kiwi-shadow-surface-xl:0px 1px 0px 0px lab(0% 0 0/.04),0px 0px 0px 1px lab(0% 0 0/.04),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 1px 1px -.5px lab(0% 0 0/.04),0px 3px 3px -1.5px lab(0% 0 0/.04),0px 6px 6px -3px lab(0% 0 0/.04),0px 12px 12px -6px lab(0% 0 0/.04),0px 24px 24px -12px lab(0% 0 0/.04);--kiwi-shadow-button-base-drop:0px 1px 1px -.5px lab(0% 0 0/.04),0px 3px 3px -1.5px lab(0% 0 0/.04);--kiwi-shadow-button-base-inset:inset 0px -1px 0px 0px lab(0% 0 0/.08);--kiwi-shadow-input-base:inset 0px 1px 1px 0px lab(0% 0 0/.04),inset 0px 2px 4px 0px lab(0% 0 0/.04);--kiwi-shadow-tooltip-base:0px 1px 1px -.5px lab(0% 0 0/.04),0px 3px 3px -1.5px lab(0% 0 0/.04),0px 6px 6px -3px lab(0% 0 0/.04),0px 12px 12px -6px lab(0% 0 0/.04);--kiwi-shadow-toolbar-base:0px 1px 0px 0px lab(0% 0 0/.04),0px 0px 0px 1px lab(0% 0 0/.8),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 1px 1px -.5px lab(0% 0 0/.04),0px 3px 3px -1.5px lab(0% 0 0/.04),0px 6px 6px -3px lab(0% 0 0/.04),0px 12px 12px -6px lab(0% 0 0/.04),0px 24px 24px -12px lab(0% 0 0/.04)}}html:where([data-color-scheme=dark]),:host([data-color-scheme=dark]),.🥝-root:where([data-kiwi-theme=dark]){--kiwi-color-border-shadow-base:#ffffff14;--kiwi-color-border-shadow-strong:#ffffff29}@supports (color:lab(0% 0 0)){html:where([data-color-scheme=dark]),:host([data-color-scheme=dark]),.🥝-root:where([data-kiwi-theme=dark]){--kiwi-color-border-shadow-base:lab(100% 0 0/.08);--kiwi-color-border-shadow-strong:lab(100% 0 0/.16)}}:is(html:where([data-color-scheme=dark]),:host([data-color-scheme=dark]),.🥝-root:where([data-kiwi-theme=dark])){--kiwi-color-bg-mono-base:#6b737d;--kiwi-color-bg-mono-muted:#36393f;--kiwi-color-bg-mono-faded:#969ca4;--kiwi-color-bg-accent-base:#188166;--kiwi-color-bg-accent-muted:#0d4133;--kiwi-color-bg-accent-faded:#61a896;--kiwi-color-bg-info-base:#0470dd;--kiwi-color-bg-info-muted:#033970;--kiwi-color-bg-info-faded:#589fe9;--kiwi-color-bg-positive-base:#228404;--kiwi-color-bg-positive-muted:#114302;--kiwi-color-bg-positive-faded:#68ab53;--kiwi-color-bg-attention-base:#9a6804;--kiwi-color-bg-attention-muted:#4e3402;--kiwi-color-bg-attention-faded:#c6922c;--kiwi-color-bg-critical-base:#df1c41;--kiwi-color-bg-critical-muted:#730e22;--kiwi-color-bg-critical-faded:#ec768d;--kiwi-color-bg-surface-secondary:#212327;--kiwi-color-bg-surface-primary:#25282c;--kiwi-color-bg-surface-tertiary:#1a1c1e;--kiwi-color-bg-surface-emphasis:#090a0b;--kiwi-color-bg-surface-base:#25282c;--kiwi-color-bg-surface-quaternary:#111213;--kiwi-color-bg-neutral-base:#36393f;--kiwi-color-bg-neutral-muted:#25282c;--kiwi-color-bg-neutral-faded:#585f68;--kiwi-color-bg-neutral-inverse:#fbfcfd;--kiwi-color-bg-glow-base-hover-\%:4.0%;--kiwi-color-bg-glow-base-pressed-\%:8.0%;--kiwi-color-bg-glow-on-surface-accent-hover:#1881661f;--kiwi-color-bg-glow-on-surface-accent-pressed:#18816629;--kiwi-color-bg-glow-on-surface-critical-pressed:#df1c4129;--kiwi-color-bg-glow-on-surface-critical-hover:#df1c411f;--kiwi-color-bg-glow-on-surface-disabled:#ffffff0a;--kiwi-color-bg-glow-on-surface-overlay:#ffffff52;--kiwi-color-bg-glow-on-surface-neutral-hover-\%:4.0%;--kiwi-color-bg-glow-on-surface-neutral-pressed-\%:8.0%;--kiwi-color-bg-glow-strong-pressed-\%:16.0%;--kiwi-color-bg-glow-strong-hover-\%:8.0%;--kiwi-color-icon-neutral-hover:#fbfcfd;--kiwi-color-icon-neutral-base:#acb1b7;--kiwi-color-icon-neutral-secondary:#808791;--kiwi-color-icon-neutral-tertiary:#6b737d;--kiwi-color-icon-neutral-disabled:#585f68;--kiwi-color-icon-neutral-emphasis:#fff;--kiwi-color-icon-neutral-muted:#585f68;--kiwi-color-icon-accent-base:#61a896;--kiwi-color-icon-accent-strong:#06fac2;--kiwi-color-icon-accent-faded:#84bcad;--kiwi-color-icon-info-base:#589fe9;--kiwi-color-icon-info-faded:#7eb5ee;--kiwi-color-icon-positive-base:#68ab53;--kiwi-color-icon-positive-faded:#8abe7a;--kiwi-color-icon-attention-base:#c6922c;--kiwi-color-icon-attention-faded:#d3ab5b;--kiwi-color-icon-critical-base:#ec768d;--kiwi-color-icon-critical-faded:#f097a9;--kiwi-color-icon-mono-base:#969ca4;--kiwi-color-icon-mono-faded:#acb1b7;--kiwi-color-icon-glow-base-hover-\%:8.0%;--kiwi-color-icon-glow-base-pressed-\%:12.0%;--kiwi-color-icon-glow-strong-hover-\%:16.0%;--kiwi-color-icon-glow-strong-pressed-\%:24.0%;--kiwi-color-border-mono-base:#808791;--kiwi-color-border-mono-faded:#b8bdc1;--kiwi-color-border-mono-muted:#474c53;--kiwi-color-border-accent-base:#3d957e;--kiwi-color-border-accent-faded:#a7cfc4;--kiwi-color-border-accent-muted:#125544;--kiwi-color-border-accent-strong:#06fac2;--kiwi-color-border-info-base:#3088e4;--kiwi-color-border-info-faded:#a3caf3;--kiwi-color-border-info-muted:#024a93;--kiwi-color-border-positive-base:#46982c;--kiwi-color-border-positive-muted:#175801;--kiwi-color-border-positive-faded:#acd1a0;--kiwi-color-border-attention-base:#b67a02;--kiwi-color-border-attention-muted:#664502;--kiwi-color-border-attention-faded:#dfc38a;--kiwi-color-border-critical-base:#e7516e;--kiwi-color-border-critical-muted:#96122c;--kiwi-color-border-critical-faded:#f5b6c2;--kiwi-color-border-glow-base-hover-\%:8.0%;--kiwi-color-border-glow-base-pressed-\%:12.0%;--kiwi-color-border-glow-on-surface-faded:#ffffff0a;--kiwi-color-border-glow-on-surface-disabled:#ffffff14;--kiwi-color-border-glow-strong-hover-\%:16.0%;--kiwi-color-border-glow-strong-pressed-\%:24.0%;--kiwi-color-border-neutral-base:#474c53;--kiwi-color-border-neutral-muted:#36393f;--kiwi-color-border-neutral-faded:#808791;--kiwi-color-border-neutral-inverse:#fbfcfd;--kiwi-color-border-neutral-disabled:#585f68;--kiwi-color-border-surface-primary:#000000a3;--kiwi-color-text-mono-base:#969ca4;--kiwi-color-text-mono-faded:#acb1b7;--kiwi-color-text-accent-base:#61a896;--kiwi-color-text-accent-faded:#84bcad;--kiwi-color-text-accent-strong:#06fac2;--kiwi-color-text-info-base:#589fe9;--kiwi-color-text-info-faded:#7eb5ee;--kiwi-color-text-positive-base:#68ab53;--kiwi-color-text-positive-faded:#8abe7a;--kiwi-color-text-attention-base:#c6922c;--kiwi-color-text-attention-faded:#d3ab5b;--kiwi-color-text-critical-base:#ec768d;--kiwi-color-text-critical-faded:#f097a9;--kiwi-color-text-neutral-emphasis:#fff;--kiwi-color-text-neutral-primary:#fbfcfd;--kiwi-color-text-neutral-secondary:#b8bdc1;--kiwi-color-text-neutral-tertiary:#969ca4;--kiwi-color-text-neutral-disabled:#585f68;--kiwi-color-text-glow-base-hover-\%:8.0%;--kiwi-color-text-glow-base-pressed-\%:12.0%;--kiwi-color-text-glow-strong-hover-\%:16.0%;--kiwi-color-text-glow-strong-pressed-\%:24.0%;--kiwi-color-static-black:#000;--kiwi-color-static-white:#fff;--kiwi-color-static-accent:#188166;--kiwi-color-glow-hue:#fff;--kiwi-shadow-surface-xs:0px 1px 0px 0px #00000014,0px 0px 0px 1px #00000029,inset 0px 0px 0px 1px #ffffff14,0px 1px 1px -.5px #00000029;--kiwi-shadow-surface-sm:0px 1px 0px 0px #00000014,0px 0px 0px 1px #00000029,inset 0px 0px 0px 1px #ffffff14,0px 1px 1px -.5px #00000029,0px 3px 3px -1.5px #00000029;--kiwi-shadow-surface-md:0px 1px 0px 0px #00000014,0px 0px 0px 1px #00000029,0px 1px 1px -.5px #00000029,inset 0px 0px 0px 1px #ffffff14,0px 3px 3px -1.5px #00000029,0px 6px 6px -3px #00000029;--kiwi-shadow-surface-lg:0px 1px 0px 0px #00000014,0px 0px 0px 1px #00000029,inset 0px 0px 0px 1px #ffffff14,0px 1px 1px -.5px #00000029,0px 3px 3px -1.5px #00000029,0px 6px 6px -3px #00000029,0px 12px 12px -6px #00000029;--kiwi-shadow-surface-xl:0px 1px 0px 0px #00000014,0px 0px 0px 1px #00000029,inset 0px 0px 0px 1px #ffffff14,0px 1px 1px -.5px #00000029,0px 3px 3px -1.5px #00000029,0px 6px 6px -3px #00000029,0px 12px 12px -6px #00000029,0px 24px 24px -12px #00000029;--kiwi-shadow-button-base-drop:0px 1px 1px -.5px #00000029,0px 3px 3px -1.5px #00000029;--kiwi-shadow-button-base-inset:inset 0px -1px 0px 0px #00000014;--kiwi-shadow-input-base:inset 0px 1px 2px 0px #00000029,inset 0px 2px 4px 0px #00000029;--kiwi-shadow-tooltip-base:0px 1px 1px -.5px #00000029,0px 3px 3px -1.5px #00000029,0px 6px 6px -3px #00000029,0px 12px 12px -6px #00000029;--kiwi-shadow-toolbar-base:0px 1px 0px 0px #00000014,0px 0px 0px 1px #000c,inset 0px 0px 0px 1px #ffffff14,0px 1px 1px -.5px #00000029,0px 3px 3px -1.5px #00000029,0px 6px 6px -3px #00000029,0px 12px 12px -6px #00000029,0px 24px 24px -12px #00000029}@supports (color:lab(0% 0 0)){:is(html:where([data-color-scheme=dark]),:host([data-color-scheme=dark]),.🥝-root:where([data-kiwi-theme=dark])){--kiwi-color-bg-mono-base:lab(48.0166% -1.43915 -6.5074);--kiwi-color-bg-mono-muted:lab(23.8534% -.214189 -4.11189);--kiwi-color-bg-mono-faded:lab(64.054% -1.04737 -5.12308);--kiwi-color-bg-accent-base:lab(47.9563% -34.9245 6.19844);--kiwi-color-bg-accent-muted:lab(23.9375% -20.5725 3.46543);--kiwi-color-bg-accent-faded:lab(63.8151% -26.6434 1.96097);--kiwi-color-bg-info-base:lab(47.0129% 6.89358 -64.3085);--kiwi-color-bg-info-muted:lab(23.4622% 1.99829 -36.9401);--kiwi-color-bg-info-faded:lab(63.3151% -5.85896 -44.7124);--kiwi-color-bg-positive-base:lab(48.1335% -44.6409 49.5307);--kiwi-color-bg-positive-muted:lab(24.1751% -26.9395 30.542);--kiwi-color-bg-positive-faded:lab(63.9985% -35.01 38.0049);--kiwi-color-bg-attention-base:lab(48.4136% 15.4963 54.4339);--kiwi-color-bg-attention-muted:lab(24.1971% 8.78102 32.5961);--kiwi-color-bg-attention-faded:lab(64.4222% 13.6025 58.3401);--kiwi-color-bg-critical-base:lab(48.9224% 71.0533 33.7629);--kiwi-color-bg-critical-muted:lab(24.3988% 42.8858 18.0549);--kiwi-color-bg-critical-faded:lab(64.3708% 48.1797 9.98121);--kiwi-color-bg-surface-secondary:lab(13.6245% -.157475 -2.99128);--kiwi-color-bg-surface-primary:lab(15.9236% -.636965 -3.2773);--kiwi-color-bg-surface-tertiary:lab(10.1205% -.583336 -1.75366);--kiwi-color-bg-surface-emphasis:lab(2.6968% -.176921 -.525138);--kiwi-color-bg-surface-base:lab(15.9236% -.636965 -3.2773);--kiwi-color-bg-surface-quaternary:lab(5.39981% -.273019 -.834915);--kiwi-color-bg-neutral-base:lab(23.8534% -.214189 -4.11189);--kiwi-color-bg-neutral-muted:lab(15.9236% -.636965 -3.2773);--kiwi-color-bg-neutral-faded:lab(39.9415% -1.2762 -6.16004);--kiwi-color-bg-neutral-inverse:lab(98.9092% -.247031 -.706732);--kiwi-color-bg-glow-on-surface-accent-hover:lab(47.9563% -34.9245 6.19844/.12);--kiwi-color-bg-glow-on-surface-accent-pressed:lab(47.9563% -34.9245 6.19844/.16);--kiwi-color-bg-glow-on-surface-critical-pressed:lab(48.9224% 71.0533 33.7629/.16);--kiwi-color-bg-glow-on-surface-critical-hover:lab(48.9224% 71.0533 33.7629/.12);--kiwi-color-bg-glow-on-surface-disabled:lab(100% 0 0/.04);--kiwi-color-bg-glow-on-surface-overlay:lab(100% 0 0/.32);--kiwi-color-icon-neutral-hover:lab(98.9092% -.247031 -.706732);--kiwi-color-icon-neutral-base:lab(71.9356% -.923872 -3.62363);--kiwi-color-icon-neutral-secondary:lab(55.9762% -1.06928 -6.24512);--kiwi-color-icon-neutral-tertiary:lab(48.0166% -1.43915 -6.5074);--kiwi-color-icon-neutral-disabled:lab(39.9415% -1.2762 -6.16004);--kiwi-color-icon-neutral-emphasis:lab(100% 0 0);--kiwi-color-icon-neutral-muted:lab(39.9415% -1.2762 -6.16004);--kiwi-color-icon-accent-base:lab(63.8151% -26.6434 1.96097);--kiwi-color-icon-accent-strong:lab(87.9135% -61.1161 12.4515);--kiwi-color-icon-accent-faded:lab(72.0306% -21.3089 1.44627);--kiwi-color-icon-info-base:lab(63.3151% -5.85896 -44.7124);--kiwi-color-icon-info-faded:lab(71.5249% -7.08985 -34.6622);--kiwi-color-icon-positive-base:lab(63.9985% -35.01 38.0049);--kiwi-color-icon-positive-faded:lab(72.0603% -27.3667 28.6884);--kiwi-color-icon-attention-base:lab(64.4222% 13.6025 58.3401);--kiwi-color-icon-attention-faded:lab(72.4404% 8.26526 46.2542);--kiwi-color-icon-critical-base:lab(64.3708% 48.1797 9.98121);--kiwi-color-icon-critical-faded:lab(72.2102% 36.0258 5.42828);--kiwi-color-icon-mono-base:lab(64.054% -1.04737 -5.12308);--kiwi-color-icon-mono-faded:lab(71.9356% -.923872 -3.62363);--kiwi-color-border-mono-base:lab(55.9762% -1.06928 -6.24512);--kiwi-color-border-mono-faded:lab(76.2989% -1.2362 -2.68073);--kiwi-color-border-mono-muted:lab(32.0457% -.837266 -4.75932);--kiwi-color-border-accent-base:lab(55.9371% -32.0364 3.90248);--kiwi-color-border-accent-faded:lab(79.9997% -15.3805 .888169);--kiwi-color-border-accent-muted:lab(31.7715% -24.8213 3.70236);--kiwi-color-border-accent-strong:lab(87.9135% -61.1161 12.4515);--kiwi-color-border-info-base:lab(55.0934% -1.51214 -54.9444);--kiwi-color-border-info-faded:lab(79.5683% -6.13773 -24.6515);--kiwi-color-border-info-muted:lab(31.1021% 4.10384 -46.6708);--kiwi-color-border-positive-base:lab(56.1124% -41.2107 46.1777);--kiwi-color-border-positive-muted:lab(32.2353% -32.9313 37.368);--kiwi-color-border-positive-faded:lab(80.1967% -19.5707 20.2529);--kiwi-color-border-attention-base:lab(56.4461% 18.5372 61.9135);--kiwi-color-border-attention-muted:lab(32.3185% 10.6467 40.4656);--kiwi-color-border-attention-faded:lab(80.2272% 4.41358 32.3333);--kiwi-color-border-critical-base:lab(56.7098% 60.1448 17.1741);--kiwi-color-border-critical-muted:lab(32.6435% 52.4911 23.3912);--kiwi-color-border-critical-faded:lab(80.2428% 24.9421 3.36735);--kiwi-color-border-glow-on-surface-faded:lab(100% 0 0/.04);--kiwi-color-border-glow-on-surface-disabled:lab(100% 0 0/.08);--kiwi-color-border-neutral-base:lab(32.0457% -.837266 -4.75932);--kiwi-color-border-neutral-muted:lab(23.8534% -.214189 -4.11189);--kiwi-color-border-neutral-faded:lab(55.9762% -1.06928 -6.24512);--kiwi-color-border-neutral-inverse:lab(98.9092% -.247031 -.706732);--kiwi-color-border-neutral-disabled:lab(39.9415% -1.2762 -6.16004);--kiwi-color-border-surface-primary:lab(0% 0 0/.64);--kiwi-color-text-mono-base:lab(64.054% -1.04737 -5.12308);--kiwi-color-text-mono-faded:lab(71.9356% -.923872 -3.62363);--kiwi-color-text-accent-base:lab(63.8151% -26.6434 1.96097);--kiwi-color-text-accent-faded:lab(72.0306% -21.3089 1.44627);--kiwi-color-text-accent-strong:lab(87.9135% -61.1161 12.4515);--kiwi-color-text-info-base:lab(63.3151% -5.85896 -44.7124);--kiwi-color-text-info-faded:lab(71.5249% -7.08985 -34.6622);--kiwi-color-text-positive-base:lab(63.9985% -35.01 38.0049);--kiwi-color-text-positive-faded:lab(72.0603% -27.3667 28.6884);--kiwi-color-text-attention-base:lab(64.4222% 13.6025 58.3401);--kiwi-color-text-attention-faded:lab(72.4404% 8.26526 46.2542);--kiwi-color-text-critical-base:lab(64.3708% 48.1797 9.98121);--kiwi-color-text-critical-faded:lab(72.2102% 36.0258 5.42828);--kiwi-color-text-neutral-emphasis:lab(100% 0 0);--kiwi-color-text-neutral-primary:lab(98.9092% -.247031 -.706732);--kiwi-color-text-neutral-secondary:lab(76.2989% -1.2362 -2.68073);--kiwi-color-text-neutral-tertiary:lab(64.054% -1.04737 -5.12308);--kiwi-color-text-neutral-disabled:lab(39.9415% -1.2762 -6.16004);--kiwi-color-static-black:lab(0% 0 0);--kiwi-color-static-white:lab(100% 0 0);--kiwi-color-static-accent:lab(47.9563% -34.9245 6.19844);--kiwi-color-glow-hue:lab(100% 0 0);--kiwi-shadow-surface-xs:0px 1px 0px 0px lab(0% 0 0/.08),0px 0px 0px 1px lab(0% 0 0/.16),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 1px 1px -.5px lab(0% 0 0/.16);--kiwi-shadow-surface-sm:0px 1px 0px 0px lab(0% 0 0/.08),0px 0px 0px 1px lab(0% 0 0/.16),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 1px 1px -.5px lab(0% 0 0/.16),0px 3px 3px -1.5px lab(0% 0 0/.16);--kiwi-shadow-surface-md:0px 1px 0px 0px lab(0% 0 0/.08),0px 0px 0px 1px lab(0% 0 0/.16),0px 1px 1px -.5px lab(0% 0 0/.16),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 3px 3px -1.5px lab(0% 0 0/.16),0px 6px 6px -3px lab(0% 0 0/.16);--kiwi-shadow-surface-lg:0px 1px 0px 0px lab(0% 0 0/.08),0px 0px 0px 1px lab(0% 0 0/.16),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 1px 1px -.5px lab(0% 0 0/.16),0px 3px 3px -1.5px lab(0% 0 0/.16),0px 6px 6px -3px lab(0% 0 0/.16),0px 12px 12px -6px lab(0% 0 0/.16);--kiwi-shadow-surface-xl:0px 1px 0px 0px lab(0% 0 0/.08),0px 0px 0px 1px lab(0% 0 0/.16),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 1px 1px -.5px lab(0% 0 0/.16),0px 3px 3px -1.5px lab(0% 0 0/.16),0px 6px 6px -3px lab(0% 0 0/.16),0px 12px 12px -6px lab(0% 0 0/.16),0px 24px 24px -12px lab(0% 0 0/.16);--kiwi-shadow-button-base-drop:0px 1px 1px -.5px lab(0% 0 0/.16),0px 3px 3px -1.5px lab(0% 0 0/.16);--kiwi-shadow-button-base-inset:inset 0px -1px 0px 0px lab(0% 0 0/.08);--kiwi-shadow-input-base:inset 0px 1px 2px 0px lab(0% 0 0/.16),inset 0px 2px 4px 0px lab(0% 0 0/.16);--kiwi-shadow-tooltip-base:0px 1px 1px -.5px lab(0% 0 0/.16),0px 3px 3px -1.5px lab(0% 0 0/.16),0px 6px 6px -3px lab(0% 0 0/.16),0px 12px 12px -6px lab(0% 0 0/.16);--kiwi-shadow-toolbar-base:0px 1px 0px 0px lab(0% 0 0/.08),0px 0px 0px 1px lab(0% 0 0/.8),inset 0px 0px 0px 1px lab(100% 0 0/.08),0px 1px 1px -.5px lab(0% 0 0/.16),0px 3px 3px -1.5px lab(0% 0 0/.16),0px 6px 6px -3px lab(0% 0 0/.16),0px 12px 12px -6px lab(0% 0 0/.16),0px 24px 24px -12px lab(0% 0 0/.16)}}:root,:host{--kiwi-font-family-sans:"InterVariable","Noto Sans","Open Sans",sans-serif;--kiwi-font-family-mono:"Geist Mono","Noto Sans Mono",ui-monospace,"Segoe UI Mono",Consolas,monospace}:is(:root,:host){--kiwi-font-size-8:.5rem;--kiwi-font-size-10:.625rem;--kiwi-font-size-11:.6875rem;--kiwi-font-size-12:.75rem;--kiwi-font-size-14:.875rem;--kiwi-font-size-16:1rem;--kiwi-font-size-20:1.25rem;--kiwi-font-size-24:1.5rem;--kiwi-font-size-28:1.75rem;--kiwi-font-size-32:2rem;--kiwi-font-size-40:2.5rem;--kiwi-font-size-48:3rem}.🥝-root:where([data-kiwi-density=dense]){font-size:var(--kiwi-font-size-12);letter-spacing:0;line-height:1.3333}html{background-color:var(--kiwi-color-bg-surface-primary)}body{font-size:var(--kiwi-font-size-14);letter-spacing:0;line-height:1.4286}:is(body,.🥝-root){font-family:var(--kiwi-font-family-sans);color:var(--kiwi-color-text-neutral-primary)}:focus-visible{outline:2px solid var(--kiwi-color-border-accent-strong);outline-offset:1px}}`;
var styles_css_default$1 = styles_default$1;
var styles_default = String.raw`@layer kiwi.components.base,kiwi.components.modifiers,kiwi.components.states;@layer kiwi.components{@layer base{.🥝-icon{width:var(--🥝icon-size);height:var(--🥝icon-size);color:var(--🥝icon-color);flex-shrink:0;transition:color .15s ease-out}}@layer modifiers{.🥝-icon:where([data-kiwi-size=regular]){--🥝icon-size:1rem}.🥝-icon:where([data-kiwi-size=large]){--🥝icon-size:1.5rem}}@layer base{.🥝-disclosure-arrow{rotate:var(--🥝disclosure-arrow-rotate);margin-inline-end:-8px}@media (prefers-reduced-motion:no-preference){.🥝-disclosure-arrow{transition:rotate .15s ease-in-out}}}@layer base{.🥝-anchor{cursor:pointer;font-size:var(--kiwi-font-size-12);text-underline-offset:.25ex;-webkit-text-decoration-color:inherit;text-decoration-color:inherit;color:var(--🥝anchor-color);border-radius:4px;font-weight:500;transition:color .15s ease-out,text-decoration-color .15s ease-out}.🥝-anchor:where(button){background:0 0;border:none}}@layer modifiers{.🥝-anchor:where([data-kiwi-tone=neutral]){--🥝anchor-color:var(--kiwi-color-text-neutral-primary)}.🥝-anchor:where([data-kiwi-tone=accent]){--🥝anchor-color:var(--kiwi-color-text-accent-strong)}.🥝-anchor:where([data-kiwi-tone=critical]){--🥝anchor-color:var(--kiwi-color-text-critical-base)}.🥝-anchor:where([data-kiwi-tone=critical]):focus-visible{outline-color:var(--🥝anchor-color)}}@layer states{@media (any-hover:hover){.🥝-anchor:where(:hover){text-decoration-color:#0000}}.🥝-anchor:where(:active){text-decoration-color:#0000}.🥝-anchor:where([disabled],:disabled,[aria-disabled=true]){--🥝anchor-color-text:var(--kiwi-color-text-neutral-disabled);cursor:not-allowed;text-decoration-color:#0000}}@layer base{.🥝-button{white-space:nowrap;-webkit-user-select:none;user-select:none;cursor:pointer;line-height:1.2;font-size:var(--kiwi-font-size-12);block-size:1.5rem;padding-inline:var(--🥝button-padding-inline,12px);background-color:var(--🥝button-background-color);color:var(--🥝button-color,var(--kiwi-color-text-neutral-primary));-webkit-tap-highlight-color:color-mix(in oklch,var(--🥝button-bg--solid-default)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-pressed-\%));--🥝icon-color:var(--🌀button-state--default,var(--kiwi-color-icon-neutral-base))var(--🌀button-state--hover,var(--kiwi-color-icon-neutral-hover))var(--🌀button-state--pressed,var(--kiwi-color-icon-neutral-hover))var(--🌀button-state--active,var(--kiwi-color-icon-accent-strong))var(--🌀button-state--disabled,var(--kiwi-color-icon-neutral-disabled));border:none;border-radius:4px;flex-shrink:0;justify-content:center;align-items:center;gap:4px;font-weight:500;text-decoration:none;transition:background-color .15s ease-out;display:inline-flex}@media (forced-colors:active){.🥝-button{color:buttontext;--🥝icon-color:ButtonText;background-color:buttonface;border:1px solid buttonborder}}}@layer modifiers{.🥝-button:where([data-kiwi-variant=solid]){--🥝button-background-color:var(--🌀button-state--default,var(--🥝button-bg--solid-default))var(--🌀button-state--hover,color-mix(in oklch,var(--🥝button-bg--solid-default)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-hover-\%)))var(--🌀button-state--pressed,color-mix(in oklch,var(--🥝button-bg--solid-default)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-pressed-\%)))var(--🌀button-state--disabled,var(--kiwi-color-bg-glow-on-surface-disabled));box-shadow:var(--🌀button-state--default,var(--kiwi-shadow-button-base-inset),0px 0px 0px 1px var(--🥝button-border-color)inset,var(--kiwi-shadow-button-base-drop))var(--🌀button-state--hover,var(--kiwi-shadow-button-base-inset),0px 0px 0px 1px var(--🥝button-border-color)inset,var(--kiwi-shadow-button-base-drop))var(--🌀button-state--pressed,0px 0px 0px 1px var(--🥝button-border-color)inset)var(--🌀button-state--disabled,none)}.🥝-button:where([data-kiwi-variant=solid]):where([data-kiwi-tone=neutral]){--🥝button-bg--solid-default:var(--kiwi-color-bg-neutral-base);--🥝button-border-color:var(--🌀button-state--default,var(--kiwi-color-border-shadow-base))var(--🌀button-state--hover,color-mix(in oklch,var(--kiwi-color-border-shadow-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-base-hover-\%)))var(--🌀button-state--pressed,color-mix(in oklch,var(--kiwi-color-border-shadow-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-base-pressed-\%)))var(--🌀button-state--disabled,transparent)}.🥝-button:where([data-kiwi-variant=solid]):where([data-kiwi-tone=accent]){--🥝button-bg--solid-default:var(--kiwi-color-bg-accent-base);--🥝button-border-color:var(--🌀button-state--default,var(--kiwi-color-border-shadow-strong))var(--🌀button-state--hover,color-mix(in oklch,var(--kiwi-color-border-shadow-strong)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-strong-hover-\%)))var(--🌀button-state--pressed,color-mix(in oklch,var(--kiwi-color-border-shadow-strong)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-strong-pressed-\%)))var(--🌀button-state--disabled,transparent);--🥝button-color:var(--kiwi-color-text-neutral-emphasis);--🥝icon-color:var(--🌀button-state--default,var(--kiwi-color-icon-neutral-emphasis))var(--🌀button-state--hover,var(--kiwi-color-icon-strong-hover))var(--🌀button-state--pressed,var(--kiwi-color-icon-neutral-hover))var(--🌀button-state--disabled,var(--kiwi-color-icon-neutral-disabled))}@media (forced-colors:active){.🥝-button:where([data-kiwi-variant=solid]):where([data-kiwi-tone=accent]){--🥝icon-color:ButtonText}}.🥝-button:where([data-kiwi-variant=outline]){--🥝button-background-color:var(--🌀button-state--default,transparent)var(--🌀button-state--hover,color-mix(in oklch,transparent 100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-hover-\%)))var(--🌀button-state--pressed,color-mix(in oklch,transparent 100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-pressed-\%)))var(--🌀button-state--disabled,transparent);--🥝button-border-color:var(--🌀button-state--default,var(--kiwi-color-border-neutral-base))var(--🌀button-state--hover,color-mix(in oklch,var(--kiwi-color-border-neutral-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-base-hover-\%)))var(--🌀button-state--pressed,color-mix(in oklch,var(--kiwi-color-border-neutral-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-base-pressed-\%)))var(--🌀button-state--disabled,var(--kiwi-color-border-glow-on-surface-disabled));box-shadow:0px 0px 0px 1px var(--🥝button-border-color)inset}.🥝-button:where([data-kiwi-variant=ghost]){--🥝button-background-color:var(--🌀button-state--default,transparent)var(--🌀button-state--hover,color-mix(in oklch,transparent 100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-hover-\%)))var(--🌀button-state--pressed,color-mix(in oklch,transparent 100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-pressed-\%)))var(--🌀button-state--active,var(--kiwi-color-bg-glow-on-surface-accent-pressed))var(--🌀button-state--disabled,transparent)}}@layer states{@media (any-hover:hover){.🥝-button:where(:hover){--🌀button-state:var(--🌀button-state--hover)}}.🥝-button:where(:active){--🌀button-state:var(--🌀button-state--pressed)}.🥝-button:where([data-kiwi-variant=ghost][aria-pressed=true]){--🌀button-state:var(--🌀button-state--active)}@media (forced-colors:active){.🥝-button:where([data-kiwi-variant=ghost][aria-pressed=true]){color:selecteditemtext;--🥝icon-color:SelectedItemText;background-color:selecteditem}}.🥝-button:where([disabled],:disabled,[aria-disabled=true]){--🌀button-state:var(--🌀button-state--disabled);color:var(--kiwi-color-text-neutral-disabled);cursor:not-allowed}@media (forced-colors:active){.🥝-button:where([disabled],:disabled,[aria-disabled=true]){color:graytext;--🥝icon-color:GrayText;border-color:graytext}}}@layer base.🌀{.🥝-button{--🌀button-state:var(--🌀button-state--default);--🌀button-state--default:var(--🌀button-state, );--🌀button-state--hover:var(--🌀button-state, );--🌀button-state--pressed:var(--🌀button-state, );--🌀button-state--active:var(--🌀button-state, );--🌀button-state--disabled:var(--🌀button-state, )}}@layer base{.🥝-checkbox{--🥝checkbox-color-svg:var(--kiwi-color-icon-neutral-emphasis);--🥝checkbox-border-radius:4px;--🥝checkbox-unchecked-svg:url("data:image/svg+xml;utf8,<svg viewBox=\"0 0 16 16\"></svg>");--🥝checkbox-checkmark-svg:url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M11.2 5.6 6.8 10l-2-2\"/></svg>");--🥝checkbox-indeterminate-svg:url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M5 8h6.5\"/></svg>");appearance:none;cursor:pointer;background-color:var(--🌀checkbox-visual-state--default,var(--kiwi-color-bg-neutral-base))var(--🌀checkbox-visual-state--hover,color-mix(in oklch,var(--kiwi-color-bg-neutral-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-hover-\%)))var(--🌀checkbox-visual-state--checked,var(--kiwi-color-bg-accent-base))var(--🌀checkbox-visual-state--checked-hover,color-mix(in oklch,var(--kiwi-color-bg-accent-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-pressed-\%)))var(--🌀checkbox-visual-state--disabled,var(--kiwi-color-bg-glow-on-surface-disabled));border-radius:var(--🥝checkbox-border-radius);block-size:1rem;inline-size:1rem;color:var(--🌀checkbox-aria-state--unchecked,transparent)var(--🌀checkbox-aria-state--checked,var(--🥝checkbox-color-svg))var(--🌀checkbox-aria-state--indeterminate,var(--🥝checkbox-color-svg));box-shadow:var(--kiwi-shadow-button-base-inset),0px 0px 0px 1px var(--🥝checkbox-border-color)inset,var(--kiwi-shadow-button-base-drop);--🥝checkbox-border-color:var(--🌀checkbox-visual-state--default,var(--kiwi-color-border-shadow-base))var(--🌀checkbox-visual-state--hover,color-mix(in oklch,var(--kiwi-color-border-shadow-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-base-hover-\%)))var(--🌀checkbox-visual-state--checked,var(--kiwi-color-border-shadow-strong))var(--🌀checkbox-visual-state--checked-hover,color-mix(in oklch,var(--kiwi-color-border-shadow-strong)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-base-pressed-\%)))var(--🌀checkbox-visual-state--disabled,transparent);--🥝checkbox-mask-image:var(--🌀checkbox-aria-state--unchecked,var(--🥝checkbox-unchecked-svg))var(--🌀checkbox-aria-state--checked,var(--🥝checkbox-checkmark-svg))var(--🌀checkbox-aria-state--indeterminate,var(--🥝checkbox-indeterminate-svg));transition:background-color .15s ease-out,border-color .15s ease-out,box-shadow .15s ease-out,--🥝checkbox-border-color .15s ease-out;position:relative}.🥝-checkbox:before,.🥝-checkbox:after{content:"";position:absolute;inset:0}.🥝-checkbox:before{inset:calc(.5rem - 12px)}.🥝-checkbox:after{-webkit-mask-image:var(--🥝checkbox-mask-image,initial);mask-image:var(--🥝checkbox-mask-image,initial);background-color:currentColor;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}@media (forced-colors:active){.🥝-checkbox:after{background-color:canvastext}}}@layer states{@media (forced-colors:active){.🥝-checkbox{border:1px solid canvastext}}@media (any-hover:hover){.🥝-checkbox:where(:hover){--🌀checkbox-visual-state:var(--🌀checkbox-visual-state--hover)}}.🥝-checkbox:where(:checked,[aria-checked=true]){--🌀checkbox-visual-state:var(--🌀checkbox-visual-state--checked);--🌀checkbox-aria-state:var(--🌀checkbox-aria-state--checked)}@media (any-hover:hover){.🥝-checkbox:where(:checked,[aria-checked=true]):where(:hover){--🌀checkbox-visual-state:var(--🌀checkbox-visual-state--checked-hover)}}.🥝-checkbox:where(:indeterminate,[aria-checked=mixed]){--🌀checkbox-visual-state:var(--🌀checkbox-visual-state--checked);--🌀checkbox-aria-state:var(--🌀checkbox-aria-state--indeterminate)}.🥝-checkbox:where([disabled],:disabled,[aria-disabled=true]){--🌀checkbox-visual-state:var(--🌀checkbox-visual-state--disabled);--🥝checkbox-color-svg:var(--kiwi-color-icon-neutral-disabled);cursor:not-allowed;box-shadow:none}@media (forced-colors:active){.🥝-checkbox:where([disabled],:disabled,[aria-disabled=true]){border-color:graytext}.🥝-checkbox:where([disabled],:disabled,[aria-disabled=true]):after{background-color:graytext}}}@layer base.🌀{.🥝-checkbox{--🌀checkbox-visual-state:var(--🌀checkbox-visual-state--default);--🌀checkbox-visual-state--default:var(--🌀checkbox-visual-state, );--🌀checkbox-visual-state--hover:var(--🌀checkbox-visual-state, );--🌀checkbox-visual-state--checked:var(--🌀checkbox-visual-state, );--🌀checkbox-visual-state--checked-hover:var(--🌀checkbox-visual-state, );--🌀checkbox-visual-state--disabled:var(--🌀checkbox-visual-state, );--🌀checkbox-aria-state:var(--🌀checkbox-aria-state--unchecked);--🌀checkbox-aria-state--unchecked:var(--🌀checkbox-aria-state, );--🌀checkbox-aria-state--checked:var(--🌀checkbox-aria-state, );--🌀checkbox-aria-state--indeterminate:var(--🌀checkbox-aria-state, )}}@layer base{.🥝-chip{isolation:isolate;--🥝chip-padding-inline:.5rem;padding-inline:var(--🥝chip-padding-inline);border:none;border-radius:9999px;align-items:center;min-block-size:1.5rem;display:inline-flex;position:relative}}.🥝-chip:before{z-index:-1;content:"";border-radius:inherit;border:1px solid var(--kiwi-color-border-neutral-base);pointer-events:none;position:absolute;inset:0}@layer modifiers{.🥝-chip:where([data-kiwi-variant=solid]){background-color:var(--kiwi-color-bg-neutral-base)}.🥝-chip:where([data-kiwi-variant=outline]){background-color:var(--kiwi-color-bg-surface-primary)}}@layer base{.🥝-chip-dismiss-button.🥝-icon-button{border-radius:inherit;margin-inline-end:calc(-1*var(--🥝chip-padding-inline));position:relative}}@layer modifiers{.🥝-description.🥝-text:where([data-kiwi-tone=neutral]){color:var(--kiwi-color-text-neutral-tertiary)}.🥝-description.🥝-text:where([data-kiwi-tone=critical]){color:var(--kiwi-color-text-critical-base)}}.🥝-divider{background-color:var(--kiwi-color-border-neutral-muted);flex:none;align-self:stretch}@media (forced-colors:active){.🥝-divider{background-color:canvastext}}.🥝-divider:is(hr){border:none;margin:0}.🥝-divider:not([aria-orientation=vertical],[data-kiwi-orientation=vertical]){block-size:1px}.🥝-divider:is([aria-orientation=vertical],[data-kiwi-orientation=vertical]){min-block-size:100%;inline-size:1px}@layer base{.🥝-dropdown-menu{background-color:var(--kiwi-color-bg-surface-tertiary);min-inline-size:min(95vi,164px);box-shadow:var(--kiwi-shadow-surface-xl);border-radius:8px;flex-direction:column;padding:.5rem;display:flex}}@layer states{.🥝-dropdown-menu-button:where([aria-expanded=true]){--🥝disclosure-arrow-rotate:.5turn}}@layer base{.🥝-dropdown-menu-item.🥝-list-item{border-radius:4px}}@layer states{.🥝-dropdown-menu-item.🥝-list-item:where([role=menuitemcheckbox]:not([aria-checked=true])){--🥝dropdown-menu-checkmark-visibility:hidden}}@layer base{.🥝-dropdown-menu-checkmark{visibility:var(--🥝dropdown-menu-checkmark-visibility)}}@layer base{.🥝-dropdown-menu-item-shortcuts{margin-inline-start:.5rem}}@layer base{.🥝-icon-button.🥝-button{aspect-ratio:1;--🥝button-padding-inline:4px}}@layer base{.🥝-kbd{color:var(--kiwi-color-text-neutral-secondary);min-block-size:16px;font-family:inherit;font-weight:500;font-size:var(--kiwi-font-size-12);letter-spacing:0;flex-shrink:0;justify-content:center;align-items:center;line-height:1.3333;display:inline-flex}}@layer modifiers{.🥝-kbd:where([data-kiwi-variant=solid],[data-kiwi-variant=muted]){background-color:var(--kiwi-color-bg-neutral-base);border-radius:4px;padding-inline:4px}.🥝-kbd:where([data-kiwi-variant=solid]){box-shadow:var(--kiwi-shadow-button-base-inset),0px 0px 0px 1px var(--kiwi-color-border-shadow-base)inset,var(--kiwi-shadow-button-base-drop)}.🥝-kbd:where([data-kiwi-variant=ghost]){color:var(--kiwi-color-text-neutral-tertiary)}}@layer base{.🥝-label{color:var(--kiwi-color-text-neutral-secondary);cursor:default;font-size:var(--kiwi-font-size-12)}.🥝-label:is(label){cursor:pointer}}@layer states{.🥝-label:has(+:where(:disabled,[disabled],[aria-disabled=true])){color:var(--kiwi-color-text-neutral-disabled)}.🥝-label:has(+:where(:disabled,[disabled],[aria-disabled=true])):is(label){cursor:not-allowed}}.🥝-radio.🥝-checkbox{--🥝checkbox-border-radius:9999px;--🥝checkbox-checkmark-svg:url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" ><circle cx=\"8\" cy=\"8\" r=\"4\" /></svg>");--🥝checkbox-indeterminate-svg:var(--🥝checkbox-unchecked-svg)}@layer states{.🥝-radio.🥝-checkbox:where(:indeterminate){--🌀checkbox-visual-state:var(--🌀checkbox-visual-state--default)}}@layer base{.🥝-list-item{cursor:pointer;line-height:1.2;font-size:var(--kiwi-font-size-12);background-color:var(--🥝list-item-background-color);--🥝list-item-background-color:var(--🌀list-item-state--default,transparent)var(--🌀list-item-state--hover,color-mix(in oklch,transparent 100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-on-surface-neutral-hover-\%)))var(--🌀list-item-state--pressed,color-mix(in oklch,transparent 100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-on-surface-neutral-pressed-\%)))var(--🌀list-item-state--active,var(--kiwi-color-bg-glow-on-surface-accent-pressed))var(--🌀list-item-state--active-hover,var(--kiwi-color-bg-glow-on-surface-accent-pressed))var(--🌀list-item-state--active-child,color-mix(in oklch,var(--kiwi-color-bg-glow-on-surface-accent-pressed),transparent 50.0%))var(--🌀list-item-state--active-child-hover,color-mix(in oklch,color-mix(in oklch,var(--kiwi-color-bg-glow-on-surface-accent-pressed),transparent 50.0%)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-hover-\%)))var(--🌀list-item-state--disabled,transparent);min-block-size:1.75rem;color:var(--🌀list-item-state--default,var(--kiwi-color-text-neutral-primary))var(--🌀list-item-state--hover,var(--kiwi-color-text-neutral-primary))var(--🌀list-item-state--pressed,var(--kiwi-color-text-neutral-primary))var(--🌀list-item-state--active,var(--kiwi-color-text-accent-strong))var(--🌀list-item-state--active-hover,var(--kiwi-color-text-accent-strong))var(--🌀list-item-state--active-child,var(--kiwi-color-text-neutral-primary))var(--🌀list-item-state--active-child-hover,var(--kiwi-color-text-neutral-primary))var(--🌀list-item-state--disabled,var(--kiwi-color-text-neutral-disabled));--🥝icon-color:var(--🌀list-item-state--default,var(--kiwi-color-icon-neutral-base))var(--🌀list-item-state--hover,var(--kiwi-color-icon-neutral-hover))var(--🌀list-item-state--pressed,var(--kiwi-color-icon-neutral-hover))var(--🌀list-item-state--active,var(--kiwi-color-icon-accent-strong))var(--🌀list-item-state--active-hover,var(--kiwi-color-icon-accent-strong))var(--🌀list-item-state--active-child,var(--kiwi-color-icon-neutral-base))var(--🌀list-item-state--active-child-hover,var(--kiwi-color-icon-neutral-base))var(--🌀list-item-state--disabled,var(--kiwi-color-icon-neutral-disabled));align-items:center;gap:.25rem;padding-inline:.5rem;display:flex}}@layer states{@media (any-hover:hover){.🥝-list-item:where(:hover){--🌀list-item-state:var(--🌀list-item-state--hover)}}.🥝-list-item:where(:active){--🌀list-item-state:var(--🌀list-item-state--pressed)}.🥝-list-item:where([disabled],:disabled,[aria-disabled=true]){--🌀list-item-state:var(--🌀list-item-state--disabled);cursor:not-allowed}}@layer base.🌀{.🥝-list-item{--🌀list-item-state:var(--🌀list-item-state--default);--🌀list-item-state--default:var(--🌀list-item-state, );--🌀list-item-state--hover:var(--🌀list-item-state, );--🌀list-item-state--pressed:var(--🌀list-item-state, );--🌀list-item-state--active:var(--🌀list-item-state, );--🌀list-item-state--active-hover:var(--🌀list-item-state, );--🌀list-item-state--active-child:var(--🌀list-item-state, );--🌀list-item-state--active-child-hover:var(--🌀list-item-state, );--🌀list-item-state--disabled:var(--🌀list-item-state, )}}.🥝-list-item-content{flex-grow:1}@layer base{.🥝-spinner{color:var(--🥝spinner-color);block-size:var(--🥝spinner-size);inline-size:var(--🥝spinner-size);display:inline-block}}@layer modifiers{.🥝-spinner:where([data-kiwi-tone=neutral]){--🥝spinner-color:var(--kiwi-color-icon-neutral-base)}.🥝-spinner:where([data-kiwi-tone=accent]){--🥝spinner-color:var(--kiwi-color-icon-accent-strong)}.🥝-spinner:where([data-kiwi-size=small]){--🥝spinner-size:1rem}.🥝-spinner:where([data-kiwi-size=medium]){--🥝spinner-size:1.5rem}.🥝-spinner:where([data-kiwi-size=large]){--🥝spinner-size:2rem}.🥝-spinner:where([data-kiwi-size=xlarge]){--🥝spinner-size:3rem}}@layer base{.🥝-spinner-svg{block-size:inherit;inline-size:inherit;fill:none;animation:1s linear infinite both --🥝spinner-spin}@media (prefers-reduced-motion){.🥝-spinner-svg{animation-duration:4s;animation-timing-function:steps(4,end)}}}@keyframes --🥝spinner-spin{to{rotate:360deg}}@layer base{.🥝-select-root:where(:has(select.🥝-select),[data-kiwi-has-select=true]){--🥝button-padding-inline:8px calc(4px + 16px + 4px);align-items:center;display:inline-grid}.🥝-select-root:where(:has(select.🥝-select),[data-kiwi-has-select=true])>*{grid-area:1/1/-1/-1}}@layer base{.🥝-select.🥝-button:where(select:not([multiple])){appearance:none}}@layer base{.🥝-select-arrow.🥝-disclosure-arrow{pointer-events:none;--🥝icon-color:var(--🌀select-arrow-state--default,var(--kiwi-color-icon-neutral-base))var(--🌀select-arrow-state--hover,var(--kiwi-color-icon-neutral-hover))var(--🌀select-arrow-state--disabled,var(--kiwi-color-icon-neutral-disabled));justify-self:end;margin-inline-end:4px}}@layer states{@media (any-hover:hover){:where(.🥝-select:hover)+.🥝-select-arrow.🥝-disclosure-arrow{--🌀select-arrow-state:var(--🌀select-arrow-state--hover)}}:where(.🥝-select:disabled)+.🥝-select-arrow.🥝-disclosure-arrow{--🌀select-arrow-state:var(--🌀select-arrow-state--disabled)}}@layer base.🌀{.🥝-select-arrow.🥝-disclosure-arrow{--🌀select-arrow-state:var(--🌀select-arrow-state--default);--🌀select-arrow-state--default:var(--🌀select-arrow-state, );--🌀select-arrow-state--hover:var(--🌀select-arrow-state, );--🌀select-arrow-state--disabled:var(--🌀select-arrow-state, )}}@layer base{.🥝-switch{appearance:none;cursor:pointer;background-color:var(--🌀switch-state--default,var(--kiwi-color-bg-surface-primary))var(--🌀switch-state--hover,color-mix(in oklch,var(--kiwi-color-bg-surface-primary)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-hover-\%)))var(--🌀switch-state--pressed,color-mix(in oklch,var(--kiwi-color-bg-surface-primary)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-hover-\%)))var(--🌀switch-state--checked,var(--kiwi-color-bg-accent-base))var(--🌀switch-state--checked-hover,color-mix(in oklch,var(--kiwi-color-bg-accent-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-strong-hover-\%)))var(--🌀switch-state--disabled,var(--kiwi-color-bg-surface-primary));border:1px solid #0000;border-color:var(--🌀switch-state--default,var(--kiwi-color-border-neutral-base))var(--🌀switch-state--hover,color-mix(in oklch,var(--kiwi-color-border-neutral-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-base-hover-\%)))var(--🌀switch-state--pressed,color-mix(in oklch,var(--kiwi-color-border-neutral-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-base-pressed-\%)))var(--🌀switch-state--checked,color-mix(in oklch,var(--kiwi-color-bg-accent-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-strong-hover-\%)))var(--🌀switch-state--checked-hover,color-mix(in oklch,var(--kiwi-color-bg-accent-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-strong-hover-\%)))var(--🌀switch-state--disabled,var(--kiwi-color-border-glow-on-surface-disabled));border-radius:9999px;align-items:center;inline-size:2rem;transition:background-color .15s ease-out,border-color .15s ease-out;display:inline-grid;position:relative}.🥝-switch:before,.🥝-switch:after{content:"";grid-area:1/1/-1/-1;display:block}.🥝-switch:before{block-size:24px;inline-size:2rem;margin:-1px;position:absolute}.🥝-switch:after{aspect-ratio:var(--🥝switch-thumb-aspect-ratio);background-color:var(--🥝switch-thumb-color);block-size:1rem;box-shadow:var(--kiwi-shadow-button-base-inset),0px 0px 0px 1px var(--kiwi-color-border-shadow-base)inset,var(--kiwi-shadow-button-base-drop);justify-self:var(--🥝switch-thumb-placement);border-radius:9999px;margin:calc(.125rem - 1px)}@media (prefers-reduced-motion:no-preference){.🥝-switch:after{will-change:aspect-ratio;transition:aspect-ratio .15s ease-out}}@media (forced-colors:active){.🥝-switch:after{background-color:canvastext}}}@layer states{.🥝-switch{--🥝switch-thumb-color:var(--kiwi-color-bg-neutral-inverse);--🥝switch-thumb-placement:start;--🥝switch-thumb-aspect-ratio:1/1}@media (any-hover:hover){.🥝-switch:where(:hover){--🌀switch-state:var(--🌀switch-state--hover)}}.🥝-switch:where(:checked,[aria-checked=true]){--🌀switch-state:var(--🌀switch-state--checked);--🥝switch-thumb-placement:end}@media (any-hover:hover){.🥝-switch:where(:checked,[aria-checked=true]):where(:hover){--🌀switch-state:var(--🌀switch-state--checked-hover)}}.🥝-switch:where(:active){--🌀switch-state:var(--🌀switch-state--pressed);--🥝switch-thumb-aspect-ratio:1.75}.🥝-switch:where([disabled],:disabled,[aria-disabled=true]){--🌀switch-state:var(--🌀switch-state--disabled);--🥝switch-thumb-color:var(--kiwi-color-icon-neutral-disabled);cursor:not-allowed}.🥝-switch:where([disabled],:disabled,[aria-disabled=true]):after{box-shadow:none}}@layer base.🌀{.🥝-switch{--🌀switch-state:var(--🌀switch-state--default);--🌀switch-state--default:var(--🌀switch-state, );--🌀switch-state--hover:var(--🌀switch-state, );--🌀switch-state--pressed:var(--🌀switch-state, );--🌀switch-state--checked:var(--🌀switch-state, );--🌀switch-state--checked-hover:var(--🌀switch-state, );--🌀switch-state--disabled:var(--🌀switch-state, )}}@layer base{.🥝-tab-list{--🥝tab-active-stripe-gap:6px;gap:8px;display:flex}}@layer modifiers{.🥝-tab-list[aria-orientation=horizontal]{padding-block-end:var(--🥝tab-active-stripe-gap)}}@layer base{.🥝-tab{font-size:var(--kiwi-font-size-12);color:var(--🥝tab-color);background-color:var(--🥝tab-bg);-webkit-user-select:none;user-select:none;white-space:nowrap;cursor:pointer;border:none;border-radius:4px;block-size:1.25rem;padding-inline:4px;transition:background-color .15s ease-out,color .15s ease-out;position:relative}@media (forced-colors:active){.🥝-tab{color:buttontext}}.🥝-tab:before{content:"";inset-inline:0;inset-block:0 calc(var(--🥝tab-active-stripe-gap)*-1);position:absolute}}@layer modifiers{:where(.🥝-tab-list[data-kiwi-tone=neutral]) .🥝-tab{--🥝tab-active-stripe-color:var(--kiwi-color-border-neutral-inverse);--🥝tab-bg:var(--🌀tab-state--default,transparent)var(--🌀tab-state--hover,color-mix(in oklch,transparent 100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-on-surface-neutral-hover-\%)))var(--🌀tab-state--selected,transparent)var(--🌀tab-state--disabled,transparent);--🥝tab-color:var(--🌀tab-state--default,var(--kiwi-color-text-neutral-tertiary))var(--🌀tab-state--hover,var(--kiwi-color-text-neutral-primary))var(--🌀tab-state--selected,var(--kiwi-color-text-neutral-primary))var(--🌀tab-state--disabled,var(--kiwi-color-text-neutral-disabled));-webkit-tap-highlight-color:color-mix(in oklch,transparent 100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-on-surface-neutral-hover-\%))}:where(.🥝-tab-list[data-kiwi-tone=accent]) .🥝-tab{--🥝tab-active-stripe-color:var(--kiwi-color-border-accent-strong);--🥝tab-bg:var(--🌀tab-state--default,transparent)var(--🌀tab-state--hover,var(--kiwi-color-bg-glow-on-surface-accent-hover))var(--🌀tab-state--selected,transparent)var(--🌀tab-state--disabled,transparent);--🥝tab-color:var(--🌀tab-state--default,var(--kiwi-color-text-neutral-tertiary))var(--🌀tab-state--hover,var(--kiwi-color-text-accent-strong))var(--🌀tab-state--selected,var(--kiwi-color-text-accent-strong))var(--🌀tab-state--disabled,var(--kiwi-color-text-neutral-disabled));-webkit-tap-highlight-color:var(--kiwi-color-bg-glow-on-surface-accent-hover)}}@layer states{.🥝-tab:where([aria-selected=true]){--🌀tab-state:var(--🌀tab-state--selected)}.🥝-tab:where([aria-selected=true]):after{content:"";background-color:var(--🥝tab-active-stripe-color);block-size:2px;inset-inline:4px;inset-block:auto calc(var(--🥝tab-active-stripe-gap)*-1);position:absolute}@media (prefers-reduced-motion:no-preference){.🥝-tab:where([aria-selected=true]):after{view-transition-name:var(--🥝tab-active-stripe-view-transition-name)}}@media (forced-colors:active){.🥝-tab:where([aria-selected=true]):after{background-color:selecteditem}}@media (any-hover:hover){.🥝-tab:where(:hover){--🌀tab-state:var(--🌀tab-state--hover)}}.🥝-tab:where([disabled],:disabled,[aria-disabled=true]){--🌀tab-state:var(--🌀tab-state--disabled);--🥝tab-active-stripe-color:var(--kiwi-color-border-neutral-disabled);cursor:not-allowed}@media (forced-colors:active){.🥝-tab:where([disabled],:disabled,[aria-disabled=true]){color:graytext}.🥝-tab:where([disabled],:disabled,[aria-disabled=true]):after{background-color:graytext}}}@layer base.🌀{.🥝-tab{--🌀tab-state:var(--🌀tab-state--default);--🌀tab-state--default:var(--🌀tab-state, );--🌀tab-state--hover:var(--🌀tab-state, );--🌀tab-state--selected:var(--🌀tab-state, );--🌀tab-state--disabled:var(--🌀tab-state, )}}@layer base{.🥝-tab-panel{outline-offset:-2px}.🥝-tab-panel:not([data-open]){display:none!important}}@layer modifiers{.🥝-text:where([data-kiwi-text-variant=display-lg]){font-size:var(--kiwi-font-size-48);letter-spacing:0;line-height:1.1667}.🥝-text:where([data-kiwi-text-variant=display-md]){font-size:var(--kiwi-font-size-40);letter-spacing:0;line-height:1.2}.🥝-text:where([data-kiwi-text-variant=display-sm]){font-size:var(--kiwi-font-size-32);letter-spacing:0;line-height:1.25}.🥝-text:where([data-kiwi-text-variant=headline-lg]){font-size:var(--kiwi-font-size-28);letter-spacing:0;line-height:1.2857}.🥝-text:where([data-kiwi-text-variant=headline-md]){font-size:var(--kiwi-font-size-24);letter-spacing:0;line-height:1.3333}.🥝-text:where([data-kiwi-text-variant=headline-sm]){font-size:var(--kiwi-font-size-20);letter-spacing:0;line-height:1.4}.🥝-text:where([data-kiwi-text-variant=body-lg]){font-size:var(--kiwi-font-size-16);letter-spacing:0;line-height:1.5}.🥝-text:where([data-kiwi-text-variant=body-md]){font-size:var(--kiwi-font-size-14);letter-spacing:0;line-height:1.4286}.🥝-text:where([data-kiwi-text-variant=body-sm]){font-size:var(--kiwi-font-size-12);letter-spacing:0;line-height:1.3333}.🥝-text:where([data-kiwi-text-variant=caption-lg]){font-size:var(--kiwi-font-size-11);letter-spacing:0;line-height:1.4545}.🥝-text:where([data-kiwi-text-variant=caption-md]){font-size:var(--kiwi-font-size-10);letter-spacing:0;line-height:1.2}.🥝-text:where([data-kiwi-text-variant=caption-sm]){font-size:var(--kiwi-font-size-8);letter-spacing:0;line-height:1.5}.🥝-text:where([data-kiwi-text-variant=mono-sm]){font-family:var(--kiwi-font-family-mono);font-size:var(--kiwi-font-size-12);letter-spacing:0;line-height:1.3333}}@layer base{.🥝-text-box{cursor:var(--🥝text-box-cursor);font-size:var(--kiwi-font-size-12);background-color:var(--🥝text-box-background-color);min-block-size:1.5rem;min-inline-size:0;box-shadow:var(--kiwi-shadow-input-base);color:var(--kiwi-color-text-neutral-primary);--🥝text-box-cursor:text;--🥝text-box-background-color:var(--🌀text-box-state--default,var(--kiwi-color-bg-surface-primary))var(--🌀text-box-state--hover,color-mix(in oklch,var(--kiwi-color-bg-surface-primary)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-bg-glow-base-hover-\%)))var(--🌀text-box-state--disabled,var(--kiwi-color-bg-surface-base));--🥝text-box-border-color:var(--🌀text-box-state--default,var(--kiwi-color-border-neutral-base))var(--🌀text-box-state--hover,color-mix(in oklch,var(--kiwi-color-border-neutral-base)100.0%,var(--kiwi-color-glow-hue)var(--kiwi-color-border-glow-base-hover-\%)))var(--🌀text-box-state--disabled,var(--kiwi-color-border-glow-on-surface-disabled));border-radius:4px;padding-inline:8px;transition:background-color .15s ease-out,border-color .15s ease-out}.🥝-text-box:where(:not(input,textarea)){align-items:center;gap:4px;display:inline-flex;position:relative}.🥝-text-box:where(:not(input,textarea)):before{content:"";border-radius:inherit;pointer-events:none;border:1px solid var(--🥝text-box-border-color);transition:border-color .15s ease-out;position:absolute;inset:0}.🥝-text-box:where(input,textarea),.🥝-text-box :where(input,textarea){appearance:none;border:1px solid var(--🥝text-box-border-color);min-inline-size:0;cursor:var(--🥝text-box-cursor);padding-block:max(0px,.75rem - 1px - .5lh);line-height:1.3}:is(.🥝-text-box:where(input,textarea),.🥝-text-box :where(input,textarea))::placeholder{color:var(--kiwi-color-text-neutral-secondary);opacity:1;-webkit-user-select:none;user-select:none}.🥝-text-box:where(textarea),.🥝-text-box :where(textarea){resize:vertical;resize:block}.🥝-text-box :where(input,textarea){background-color:var(--🥝text-box-background-color);outline:unset;border:none;flex:999;align-self:stretch;transition:background-color .15s ease-out}}@layer states{@media (any-hover:hover){.🥝-text-box:where(:hover){--🌀text-box-state:var(--🌀text-box-state--hover)}}.🥝-text-box:where(:has(:is(input,textarea):focus-visible),:is(input,textarea):focus-visible){outline:2px solid var(--kiwi-color-border-accent-base);outline-offset:1px;--🥝text-box-border-color:var(--kiwi-color-border-accent-strong);--🥝icon-color:var(--kiwi-color-icon-accent-strong)}@supports not selector(:has(+ *)){.🥝-text-box:where(:not(input,textarea):focus-within){outline:2px solid var(--kiwi-color-border-accent-base);outline-offset:1px;--🥝text-box-border-color:var(--kiwi-color-border-accent-strong);--🥝icon-color:var(--kiwi-color-icon-accent-strong)}}.🥝-text-box:where([disabled],:disabled,[aria-disabled=true],[data-kiwi-disabled=true],:has(:is(input,textarea):disabled)){--🌀text-box-state:var(--🌀text-box-state--disabled);box-shadow:none;color:var(--kiwi-color-text-neutral-disabled);--🥝text-box-cursor:not-allowed}}@layer base.🌀{.🥝-text-box{--🌀text-box-state:var(--🌀text-box-state--default);--🌀text-box-state--default:var(--🌀text-box-state, );--🌀text-box-state--hover:var(--🌀text-box-state, );--🌀text-box-state--disabled:var(--🌀text-box-state, )}}@layer base{.🥝-text-box-decoration{flex-shrink:0}}@layer base{.🥝-tooltip{background-color:var(--kiwi-color-bg-surface-emphasis);box-shadow:var(--kiwi-shadow-tooltip-base);color:var(--kiwi-color-text-neutral-emphasis);border:1px solid var(--kiwi-color-border-surface-primary);min-block-size:1rem;max-inline-size:12.25rem;font-size:var(--kiwi-font-size-12);letter-spacing:0;border-radius:.25rem;justify-content:center;gap:.25rem;padding-block:calc(.25rem - 1px);padding-inline:calc(.625rem - 1px);line-height:1.3333;display:flex}}@layer base{.🥝-tree{background-color:var(--kiwi-color-bg-surface-primary);align-content:start;display:grid;overflow:auto}}@layer base{.🥝-tree-item{min-inline-size:max-content;position:relative}}@layer states{.🥝-tree-item:focus-visible{isolation:isolate;outline:none}.🥝-tree-item:focus-visible:before{content:"";z-index:1;pointer-events:none;outline:2px solid var(--kiwi-color-border-accent-strong);outline-offset:-1px;position:absolute;inset:0}@media (any-hover:hover){.🥝-tree-item:where(:not(:hover,:focus-within)){--🥝tree-item-action-visibility:hidden}}}@layer base{.🥝-tree-item-node.🥝-list-item{isolation:isolate;padding-inline-start:calc(8px + 6px*(var(--🥝tree-item-level) - 1));padding-inline-end:0;position:relative}}@layer states{.🥝-tree-item-node.🥝-list-item:where([data-kiwi-selected=true]){--🌀list-item-state:var(--🌀list-item-state--active)}.🥝-tree-item-node.🥝-list-item:where([data-kiwi-expanded=false]){--🥝tree-chevron-rotate:-.25turn}.🥝-tree-item-node.🥝-list-item:where(:not([data-kiwi-expanded])){--🥝tree-item-expander-visibility:hidden}}@layer base{.🥝-tree-item-content.🥝-list-item-content{white-space:nowrap}}@layer base{.🥝-tree-item-actions{background-color:var(--kiwi-color-bg-surface-primary);visibility:var(--🥝tree-item-actions-visibility,var(--🥝tree-item-action-visibility));padding-inline-end:4px;display:inline-flex;position:sticky;inset-inline-end:0}.🥝-tree-item-actions:before{content:"";background-color:var(--🥝list-item-background-color);z-index:-1;position:absolute;inset:0}}@layer modifiers{.🥝-tree-item-actions:where(:has(.🥝-tree-item-action[data-kiwi-visible=true])){--🥝tree-item-actions-visibility:visible}@supports not selector(:has(+ *)){.🥝-tree-item-actions{--🥝tree-item-actions-visibility:visible}}}@layer base{.🥝-tree-item-action.🥝-icon-button{visibility:var(--🥝tree-item-action-visibility)}}@layer modifiers{.🥝-tree-item-action.🥝-icon-button:where([data-kiwi-visible=false]){--🥝tree-item-action-visibility:hidden}.🥝-tree-item-action.🥝-icon-button:where([data-kiwi-visible=true]){--🥝tree-item-action-visibility:visible}}@layer base{.🥝-tree-item-expander.🥝-icon-button{visibility:var(--🥝tree-item-expander-visibility);z-index:1}}@layer base{.🥝-tree-chevron{rotate:var(--🥝tree-chevron-rotate)}@media (prefers-reduced-motion:no-preference){.🥝-tree-chevron{transition:rotate .15s ease-in-out}}}@layer base{.🥝-field{--🥝field-description-column:label-start/label-end;grid-template-columns:[label-start]auto[label-end control-start]auto[control-end];justify-content:start;align-items:center;gap:.5rem;display:grid}.🥝-field:where([data-kiwi-control-type=checkable][data-kiwi-label-placement=after]){grid-template-columns:[control-start]auto[control-end label-start]auto[label-end]}.🥝-field:where([data-kiwi-control-type=textlike]){--🥝field-description-column:control-start/control-end;align-items:baseline}.🥝-field:where([data-kiwi-control-type=textlike]):where(:not([data-kiwi-layout=inline])){grid-template-columns:[label-start control-start]auto[label-end control-end]}.🥝-field :where(.🥝-description){grid-column:var(--🥝field-description-column)}}}`;
var styles_css_default = styles_default;
const isBrowser = typeof document !== "undefined";
const forwardRef = reactExports.forwardRef;
function useMergedRefs(...refs) {
  return reactExports.useCallback(
    (instance) => {
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(instance);
        } else if (ref) {
          ref.current = instance;
        }
      }
    },
    [...refs]
  );
}
const css = styles_css_default$1 + styles_css_default;
const Root = forwardRef((props, forwardedRef) => {
  const { children, synchronizeColorScheme = false, ...rest } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RootInternal, { ...rest, ref: forwardedRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Styles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Fonts, {}),
    synchronizeColorScheme ? /* @__PURE__ */ jsxRuntimeExports.jsx(SynchronizeColorScheme, { colorScheme: props.colorScheme }) : null,
    children
  ] });
});
const RootNodeContext = reactExports.createContext(null);
function useRootNode() {
  return reactExports.useContext(RootNodeContext);
}
const RootInternal = forwardRef(
  (props, forwardedRef) => {
    const { children, colorScheme, density, ...rest } = props;
    const [rootNode, setRootNode] = reactExports.useState(null);
    const findRootNodeFromRef = reactExports.useCallback((element) => {
      if (!element) return;
      const rootNode2 = element.getRootNode();
      if (!isDocument(rootNode2) && !isShadow(rootNode2)) return;
      setRootNode(rootNode2);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Role,
      {
        ...rest,
        className: cx("🥝-root", props.className),
        "data-kiwi-theme": colorScheme,
        "data-kiwi-density": density,
        ref: useMergedRefs(forwardedRef, findRootNodeFromRef),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(RootNodeContext.Provider, { value: rootNode, children })
      }
    );
  }
);
function SynchronizeColorScheme({
  colorScheme
}) {
  const rootNode = useRootNode();
  useLayoutEffect(() => {
    if (!rootNode) return;
    if (isDocument(rootNode)) {
      rootNode.documentElement.dataset.colorScheme = colorScheme;
      const meta = rootNode.querySelector("meta[name='color-scheme']");
      if (meta) meta.content = colorScheme;
    } else if (isShadow(rootNode)) {
      rootNode.host.dataset.colorScheme = colorScheme;
    }
  }, [rootNode, colorScheme]);
  return null;
}
function Styles() {
  const rootNode = useRootNode();
  useLayoutEffect(() => {
    if (!rootNode) return;
    loadStyles(rootNode, { css });
  }, [rootNode]);
  return null;
}
const styleSheets = /* @__PURE__ */ new WeakMap();
function loadStyles(rootNode, { css: css2 }) {
  const loaded = (() => {
    if (!isBrowser) return false;
    const ownerDocument = getOwnerDocument(rootNode);
    const _window = getWindow(rootNode);
    if (!ownerDocument || !_window) return false;
    if (!supportsAdoptedStylesheets && !rootNode.querySelector("style[data-kiwi]")) {
      const styleElement = ownerDocument.createElement("style");
      styleElement.dataset.kiwi = "true";
      styleElement.textContent = css2;
      (rootNode.head || rootNode).appendChild(styleElement);
      return true;
    }
    const styleSheet = styleSheets.get(_window) || new _window.CSSStyleSheet();
    if (!styleSheets.has(_window)) {
      styleSheets.set(_window, styleSheet);
    }
    styleSheet.replaceSync(css2);
    if (!rootNode.adoptedStyleSheets.includes(styleSheet)) {
      rootNode.adoptedStyleSheets.push(styleSheet);
    }
    return true;
  })();
  return { loaded };
}
function Fonts() {
  const rootNode = useRootNode();
  useLayoutEffect(() => {
    if (!rootNode) return;
    loadFonts(rootNode);
  }, [rootNode]);
  return null;
}
function loadFonts(rootNode) {
  const ownerWindow = getWindow(rootNode);
  if (!ownerWindow || Array.from(ownerWindow.document.fonts).some(
    (font) => font.family === "InterVariable"
  )) {
    return;
  }
  const interStyles = {
    normal: "https://rsms.me/inter/font-files/InterVariable.woff2?v=4.1",
    italic: "https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.1"
  };
  for (const [style, url] of Object.entries(interStyles)) {
    const font = new ownerWindow.FontFace(
      "InterVariable",
      `url(${url}) format("woff2")`,
      {
        display: "swap",
        weight: "100 900",
        style
      }
    );
    ownerWindow.document.fonts.add(font);
  }
}
const supportsAdoptedStylesheets = isBrowser && "adoptedStyleSheets" in Document.prototype;
function isShadow(node) {
  return node instanceof ShadowRoot || (node == null ? void 0 : node.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && !!(node == null ? void 0 : node.host);
}
function isDocument(node) {
  return (node == null ? void 0 : node.nodeType) === Node.DOCUMENT_NODE;
}
function getOwnerDocument(node) {
  return (isDocument(node) ? node : node.ownerDocument) || null;
}
function getWindow(node) {
  const ownerDocument = getOwnerDocument(node);
  return (ownerDocument == null ? void 0 : ownerDocument.defaultView) || null;
}
const useLayoutEffect = isBrowser ? reactExports.useLayoutEffect : reactExports.useEffect;
const withThemeBridge = (Story, context) => {
  const themeBridge = !!context.globals.themeBridge;
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  if (themeBridge) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        colorScheme: prefersDark ? "dark" : "light",
        density: "dense",
        synchronizeColorScheme: true,
        render: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { future: { themeBridge }, ...props }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) });
};
function useMediaQuery(query) {
  const getClientSnapshot = React$1.useCallback(() => {
    var _a;
    return (_a = window.matchMedia) == null ? void 0 : _a.call(window, query).matches;
  }, [query]);
  const subscribe = React$1.useCallback(
    (onChange) => {
      var _a, _b;
      const mediaQueryList = (_a = window.matchMedia) == null ? void 0 : _a.call(window, query);
      (_b = mediaQueryList == null ? void 0 : mediaQueryList.addEventListener) == null ? void 0 : _b.call(mediaQueryList, "change", onChange);
      return () => {
        var _a2;
        return (_a2 = mediaQueryList == null ? void 0 : mediaQueryList.removeEventListener) == null ? void 0 : _a2.call(mediaQueryList, "change", onChange);
      };
    },
    [query]
  );
  return React$1.useSyncExternalStore(subscribe, getClientSnapshot);
}
const themeBridgeGlobalType = {
  description: "iTwinUI v5 theme bridge",
  defaultValue: void 0,
  toolbar: {
    title: "Theme bridge",
    icon: "paintbrush",
    items: [
      { title: "Enable", value: "true" },
      { title: "Disable", type: "reset" }
    ]
  }
};
withThemeBridge.__docgenInfo = { "description": "", "methods": [], "displayName": "withThemeBridge" };
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      default: "background",
      values: [
        {
          name: "background",
          value: "white"
        },
        {
          name: "background-backdrop",
          value: "#eef0f1"
        }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Components",
          "Frontstage",
          "Widget",
          "Hooks",
          "PreviewFeatures",
          "Deprecated"
        ]
      }
    }
  },
  globalTypes: {
    iModel: demoIModelGlobalType,
    resizer: resizerGlobalType,
    themeBridge: themeBridgeGlobalType
  },
  decorators: [withDemoIModel, withThemeBridge]
};
export {
  preview as default
};
