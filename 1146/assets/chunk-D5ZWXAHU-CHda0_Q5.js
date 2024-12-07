import { v as v4 } from "./v4-BL5qiJc1.js";
const { addons } = __STORYBOOK_MODULE_PREVIEW_API__;
const { ImplicitActionsDuringRendering } = __STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;
const { global } = __STORYBOOK_MODULE_GLOBAL__;
var ADDON_ID = "storybook/actions", EVENT_ID = `${ADDON_ID}/action-event`;
var config = { depth: 10, clearOnStoryChange: true, limit: 50 };
var findProto = (obj, callback) => {
  let proto = Object.getPrototypeOf(obj);
  return !proto || callback(proto) ? proto : findProto(proto, callback);
}, isReactSyntheticEvent = (e) => !!(typeof e == "object" && e && findProto(e, (proto) => /^Synthetic(?:Base)?Event$/.test(proto.constructor.name)) && typeof e.persist == "function"), serializeArg = (a) => {
  if (isReactSyntheticEvent(a)) {
    let e = Object.create(a.constructor.prototype, Object.getOwnPropertyDescriptors(a));
    e.persist();
    let viewDescriptor = Object.getOwnPropertyDescriptor(e, "view"), view = viewDescriptor == null ? void 0 : viewDescriptor.value;
    return typeof view == "object" && (view == null ? void 0 : view.constructor.name) === "Window" && Object.defineProperty(e, "view", { ...viewDescriptor, value: Object.create(view.constructor.prototype) }), e;
  }
  return a;
}, generateId = () => typeof crypto == "object" && typeof crypto.getRandomValues == "function" ? v4() : Date.now().toString(36) + Math.random().toString(36).substring(2);
function action(name, options = {}) {
  let actionOptions = { ...config, ...options }, handler = function(...args) {
    var _a, _b;
    if (options.implicit) {
      let storyRenderer = (_a = "__STORYBOOK_PREVIEW__" in global ? global.__STORYBOOK_PREVIEW__ : void 0) == null ? void 0 : _a.storyRenders.find((render) => render.phase === "playing" || render.phase === "rendering");
      if (storyRenderer) {
        let deprecated = !((_b = window == null ? void 0 : window.FEATURES) == null ? void 0 : _b.disallowImplicitActionsInRenderV8), error = new ImplicitActionsDuringRendering({ phase: storyRenderer.phase, name, deprecated });
        if (deprecated) console.warn(error);
        else throw error;
      }
    }
    let channel = addons.getChannel(), id = generateId(), minDepth = 5, serializedArgs = args.map(serializeArg), normalizedArgs = args.length > 1 ? serializedArgs : serializedArgs[0], actionDisplayToEmit = { id, count: 0, data: { name, args: normalizedArgs }, options: { ...actionOptions, maxDepth: minDepth + (actionOptions.depth || 3), allowFunction: actionOptions.allowFunction || false } };
    channel.emit(EVENT_ID, actionDisplayToEmit);
  };
  return handler.isAction = true, handler.implicit = options.implicit, handler;
}
export {
  action as a
};
