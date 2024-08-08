var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
import { j as jsxRuntimeExports } from "./jsx-runtime-D2-sc1j1.js";
import { f as PropertyValueFormat, S as StandardTypeNames, A as AlternateDateFormats, n as TimeDisplay, L as Logger, c as classnames, o as Id64, K as Key_enum, R as RelativePosition, p as PropertyEditorParamTypes, q as StandardEditorNames, U as UiAdmin, M as MessageSeverity, B as Button, m as PropertyRecord, r as BentleyError, s as BentleyStatus, t as assert, I as IconButton, G as Guid, j as BeEvent, e as ProgressRadial, u as ToolbarItemUtilities, l as BeUiEvent } from "./Key.enum-BB2gw-WQ.js";
import { U as UiComponents$1, I as ImageRenderer } from "./ImageRenderer-DezzSBNZ.js";
import { bn as Rectangle, c5 as LinkifyIt, c6 as Orientation$1, c7 as TimeFormat$1, c8 as isPromiseLike, bD as from, bt as mergeMap, bu as observeOn, bv as subscribeOn, y as Input, am as usePackageTranslation, f as Icon, c9 as SvgChevronLeft, ca as SvgChevronRight, cb as Popup, ac as Text, cc as IconInput, aA as Checkbox, cd as SvgChevronDown, ce as Div, b3 as SvgCheckmark, aW as SvgRemove, p as placeholderSvg, a9 as Select, cf as ImageCheckBox, cg as NumberInput, ah as Slider, ch as Textarea, ci as ToggleSwitch, cj as ElementSeparator, ck as UnderlinedButton, cl as ResizableContainerObserver, aK as SvgSearch, aL as SvgClose, cm as LocalizationProvider$1, b as MenuItem, cn as ComboBox, a6 as Flex, aV as SvgAdd, co as SvgDelete, aB as SvgStatusError, bH as fn, cp as Anchor, s as UiError, q as getObjectClassName, cq as L, cr as UiGeometry, E as ExpandableBlock, cs as VariableSizeList, ct as areEqual, cu as useTargeted, av as useWidgetOpacityContext, cv as getToolbarBackgroundColor, cw as getToolbarBoxShadow, cx as getToolbarBackdropFilter, cy as TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT, cz as TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT, cA as calculateToolbarOpacity, cB as calculateBoxShadowOpacity, cC as calculateBackdropFilterBlur, cD as useResizeObserver, cE as useRefState, cF as TOOLBAR_OPACITY_DEFAULT, aZ as IconHelper, ax as ConditionalStringValue, aU as ConditionalBooleanValue, b8 as Badge, cG as Point, cH as Timer, g as ConditionalIconItem, S as SvgPlaceholder, bw as isNavigationKey, bx as ItemKeyboardNavigator, bT as Observable, bA as map, bB as concatAll, bC as concat, bE as mergeAll, cI as TreeNodePlaceholder, cJ as TreeNode, cK as Tree, cL as timer, bM as FillCentered } from "./DefaultToolSettingsProvider-B6B80iEN.js";
import { r as reactExports, R as React } from "./index-DM9bPmif.js";
import "./index-EDRsojbr.js";
import { S as Subject, t as tap, q as queueScheduler, a as asapScheduler, o as onErrorResumeNextWith, d as defer, c as connectable, i as iif, E as EMPTY, f as finalize, k as share, s as shareReplay, m as merge, b as of, e as distinctUntilChanged, g as filter, h as concatMap, j as toArray } from "./tap-CmoZDVsL.js";
import { A as AppUiDecorator } from "./Decorators-CU-vvLY2.js";
import "./iframe-C1TMdbVu.js";
import "../sb-preview/runtime.js";
import "./_commonjsHelpers-LQfde5yM.js";
import "./inheritsLoose-CwB_PDSN.js";
import "./getPrototypeOf-BiGzxcdS.js";
import "./index-B47T7vRo.js";
var SelectionModeFlags = /* @__PURE__ */ ((SelectionModeFlags2) => {
  SelectionModeFlags2[SelectionModeFlags2["SelectionLimitOne"] = 1] = "SelectionLimitOne";
  SelectionModeFlags2[SelectionModeFlags2["DragEnabled"] = 2] = "DragEnabled";
  SelectionModeFlags2[SelectionModeFlags2["ToggleEnabled"] = 4] = "ToggleEnabled";
  SelectionModeFlags2[SelectionModeFlags2["KeysEnabled"] = 8] = "KeysEnabled";
  SelectionModeFlags2[SelectionModeFlags2["None"] = 16] = "None";
  return SelectionModeFlags2;
})(SelectionModeFlags || {});
var SelectionMode = /* @__PURE__ */ ((SelectionMode2) => {
  SelectionMode2[
    SelectionMode2["Single"] = 1
    /* SelectionLimitOne */
  ] = "Single";
  SelectionMode2[SelectionMode2["Multiple"] = 6] = "Multiple";
  SelectionMode2[SelectionMode2["Extended"] = 12] = "Extended";
  SelectionMode2[SelectionMode2["SingleAllowDeselect"] = 5] = "SingleAllowDeselect";
  SelectionMode2[
    SelectionMode2["None"] = 16
    /* None */
  ] = "None";
  return SelectionMode2;
})(SelectionMode || {});
const hasSelectionModeFlag = (selectionMode, flag) => {
  return (selectionMode & flag) !== 0;
};
class BatchSelectionOperation {
  constructor(componentSelectionHandler, shouldReplace) {
    this.selections = new Array();
    this.deselections = new Array();
    this.shouldReplace = shouldReplace;
    this._componentSelectionHandler = componentSelectionHandler;
  }
  select(node) {
    this.addNodes(
      node,
      this.selections,
      this.shouldReplace ? void 0 : this.deselections
    );
  }
  deselect(node) {
    this.addNodes(
      node,
      this.deselections,
      this.shouldReplace ? void 0 : this.selections
    );
  }
  addNodes(node, addTo, removeFrom) {
    if (Array.isArray(node)) {
      for (const n of node) {
        if (removeFrom) {
          const index = removeFrom.findIndex(
            (x) => this._componentSelectionHandler.areEqual(x, n)
          );
          if (index > -1) {
            removeFrom.splice(index, 1);
            continue;
          }
        }
        addTo.push(n);
      }
    } else {
      this.addNodes([node], addTo, removeFrom);
    }
  }
}
class DragAction {
  constructor(componentSelectionHandler, itemSelectionHandlers, firstItem) {
    this._itemSelectionHandlers = itemSelectionHandlers;
    this._componentSelectionHandler = componentSelectionHandler;
    const itemPos = this.findItem(this._itemSelectionHandlers, firstItem);
    this._previousRow = itemPos.y;
    this._previousColumn = itemPos.x;
    this._firstItemRow = itemPos.y;
    this._firstItemColumn = itemPos.x;
    this._firstItemSelected = false;
  }
  updateDragAction(latestItem) {
    const currentPos = this.findItem(this._itemSelectionHandlers, latestItem);
    if (currentPos.y === this._previousRow && currentPos.x === this._previousColumn || currentPos.x < 0 || currentPos.y < 0)
      return { selections: [], deselections: [] };
    const currentRange = Rectangle.createXYXY(
      this._firstItemColumn,
      this._firstItemRow,
      currentPos.x,
      currentPos.y
    );
    const previousRange = Rectangle.createXYXY(
      this._firstItemColumn,
      this._firstItemRow,
      this._previousColumn,
      this._previousRow
    );
    const wholeRange = Rectangle.createXYXY(
      currentRange.right > previousRange.right ? currentRange.right : previousRange.right,
      currentRange.bottom > previousRange.bottom ? currentRange.bottom : previousRange.bottom,
      currentRange.left < previousRange.left ? currentRange.left : previousRange.left,
      currentRange.top < previousRange.top ? currentRange.top : previousRange.top
    );
    const selections = [];
    const deselections = [];
    if (!this._firstItemSelected) {
      const handler = this._itemSelectionHandlers[this._firstItemRow][this._firstItemColumn];
      if (handler.isSelected())
        deselections.push(handler.item());
      else
        selections.push(handler.item());
      this._firstItemSelected = true;
    }
    for (let r = wholeRange.top; r <= wholeRange.bottom; r++) {
      for (let c = wholeRange.left; c <= wholeRange.right; c++) {
        const insidePrevious = previousRange.containsXY(c, r);
        const insideCurrent = currentRange.containsXY(c, r);
        if ((insidePrevious || insideCurrent) && insideCurrent !== insidePrevious) {
          const itemHandler = this._itemSelectionHandlers[r][c];
          if (itemHandler.isSelected())
            deselections.push(itemHandler.item());
          else
            selections.push(itemHandler.item());
        }
      }
    }
    this._previousRow = currentPos.y;
    this._previousColumn = currentPos.x;
    return { selections, deselections };
  }
  findItem(itemSelectionHandlers, item) {
    if (this._previousRow !== void 0 && this._previousRow !== -1 && this._previousColumn !== void 0 && this._previousColumn !== -1 && this._componentSelectionHandler.areEqual(
      itemSelectionHandlers[this._previousRow][this._previousColumn].item(),
      item
    )) {
      return { y: this._previousRow, x: this._previousColumn };
    }
    for (let row = 0; row < itemSelectionHandlers.length; row++) {
      for (let column = 0; column < itemSelectionHandlers[row].length; column++) {
        if (this._componentSelectionHandler.areEqual(
          itemSelectionHandlers[row][column].item(),
          item
        ))
          return { x: column, y: row };
      }
    }
    return { x: -1, y: -1 };
  }
}
class SelectionHandler {
  // needed for drag selection
  constructor(selectionMode, onItemsSelectedCallback, onItemsDeselectedCallback) {
    this.selectionMode = selectionMode;
    this.onItemsSelectedCallback = onItemsSelectedCallback;
    this.onItemsDeselectedCallback = onItemsDeselectedCallback;
  }
  /** Get the onSelectionChange processed item */
  get processedItem() {
    return this._processedItem;
  }
  /** Creates a function that should be called when selection changes. */
  createSelectionFunction(componentHandler, itemHandler) {
    const onSelectionChange = (shiftDown, ctrlDown) => {
      this._processedItem = itemHandler.item();
      if (this.selectionMode === SelectionMode.None) {
        return;
      }
      let operationCreated = false;
      let shiftSelected = false;
      if (!this._currentOperation) {
        const shouldReplace = hasSelectionModeFlag(
          this.selectionMode,
          SelectionModeFlags.KeysEnabled
        ) && !ctrlDown || hasSelectionModeFlag(
          this.selectionMode,
          SelectionModeFlags.SelectionLimitOne
        );
        this._currentOperation = new BatchSelectionOperation(
          componentHandler,
          shouldReplace
        );
        operationCreated = true;
      }
      if (hasSelectionModeFlag(this.selectionMode, SelectionModeFlags.KeysEnabled)) {
        if (!ctrlDown)
          componentHandler.deselectAll();
        if (shiftDown && this._lastItem !== void 0) {
          const selected = componentHandler.selectBetween(
            this._lastItem,
            itemHandler.item()
          );
          this._currentOperation.select(selected);
          shiftSelected = true;
        }
      }
      if (!shiftSelected) {
        itemHandler.preselect();
        if (hasSelectionModeFlag(
          this.selectionMode,
          SelectionModeFlags.SelectionLimitOne
        ) && !(hasSelectionModeFlag(
          this.selectionMode,
          SelectionModeFlags.ToggleEnabled
        ) && itemHandler.isSelected())) {
          componentHandler.deselectAll();
        }
        if (itemHandler.isSelected()) {
          itemHandler.deselect();
          this._currentOperation.deselect(itemHandler.item());
        } else {
          itemHandler.select();
          this._currentOperation.select(itemHandler.item());
        }
        this._lastItem = itemHandler.item();
      }
      if (operationCreated)
        this.completeOperation();
    };
    return onSelectionChange.bind(this);
  }
  completeOperation() {
    if (!this._currentOperation)
      return;
    if (0 !== this._currentOperation.selections.length) {
      if (this.onItemsSelectedCallback) {
        this.onItemsSelectedCallback(
          this._currentOperation.selections,
          this._currentOperation.shouldReplace
        );
        if (this._currentOperation.shouldReplace) {
          this._currentOperation = void 0;
          return;
        }
      }
    }
    if (0 !== this._currentOperation.deselections.length) {
      if (this.onItemsDeselectedCallback)
        this.onItemsDeselectedCallback(this._currentOperation.deselections);
    }
    this._currentOperation = void 0;
  }
  /**
   * Creates drag action.
   * @param componentSelectionHandler Component selection handler.
   * @param items Ordered item selection handlers separated into arrays by rows.
   * @param firstItem Item on which drag action was started.
   */
  createDragAction(componentSelectionHandler, items, firstItem) {
    if (!hasSelectionModeFlag(this.selectionMode, SelectionModeFlags.DragEnabled))
      return;
    this._dragAction = new DragAction(
      componentSelectionHandler,
      items,
      firstItem
    );
    this._componentSelectionHandler = componentSelectionHandler;
  }
  /**
   * Updates existing drag action.
   * @param latestItem Latest item in drag action.
   */
  updateDragAction(latestItem) {
    if (!hasSelectionModeFlag(this.selectionMode, SelectionModeFlags.DragEnabled))
      return;
    if (!this._dragAction || !this._componentSelectionHandler)
      return;
    this._lastItem = latestItem;
    const selectionChanges = this._dragAction.updateDragAction(latestItem);
    if (selectionChanges.deselections.length !== 0 || selectionChanges.selections.length !== 0) {
      if (!this._currentOperation)
        this._currentOperation = new BatchSelectionOperation(
          this._componentSelectionHandler,
          false
        );
      this._currentOperation.select(selectionChanges.selections);
      this._currentOperation.deselect(selectionChanges.deselections);
      this._componentSelectionHandler.updateSelection(
        selectionChanges.selections,
        selectionChanges.deselections
      );
    }
  }
  /**
   * Completes drag action.
   */
  completeDragAction() {
    this._dragAction = void 0;
    this._componentSelectionHandler = void 0;
    this.completeOperation();
  }
}
function adjustDateToTimezone(inDateTime, utcOffset) {
  return new Date(
    inDateTime.getTime() + (inDateTime.getTimezoneOffset() + utcOffset) * 6e4
  );
}
const _HighlightingEngine = class _HighlightingEngine {
  constructor(props) {
    this._searchText = props.searchText;
    this._activeMatch = props.activeMatch;
  }
  isNodeActive(node) {
    return this._activeMatch && node.id === this._activeMatch.nodeId;
  }
  getActiveMatchIndex(node) {
    return this.isNodeActive(node) ? this._activeMatch.matchIndex : void 0;
  }
  createRenderProps(node) {
    return {
      searchText: this._searchText,
      activeMatchIndex: this.getActiveMatchIndex(node)
    };
  }
  static renderNodeLabel(text, props) {
    if (props.searchText)
      return /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightedText, { text, ...props });
    return text;
  }
};
_HighlightingEngine.ACTIVE_CLASS_NAME = "components-activehighlight";
let HighlightingEngine = _HighlightingEngine;
try {
  HighlightingEngine.displayName = "HighlightingEngine";
  HighlightingEngine.__docgenInfo = { "description": "Tree highlighting engine", "displayName": "HighlightingEngine", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function HighlightedText(props) {
  const { searchText, activeMatchIndex, text, caseSensitive } = props;
  const chunks = reactExports.useMemo(
    () => findChunks(text, searchText, caseSensitive),
    [text, searchText, caseSensitive]
  );
  const markedChunks = reactExports.useMemo(
    () => markChunks(text, chunks, activeMatchIndex),
    [text, chunks, activeMatchIndex]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: markedChunks });
}
function findChunks(text, searchText, caseSensitive) {
  const chunks = [];
  const contentText = caseSensitive ? text : text.toLowerCase();
  const inputText = caseSensitive ? searchText : searchText.toLowerCase();
  let index = contentText.indexOf(inputText);
  while (index !== -1) {
    chunks.push({ start: index, end: index + inputText.length });
    index = contentText.indexOf(inputText, index + 1);
  }
  return chunks;
}
function markChunks(text, chunks, activeChunk) {
  const markedText = [];
  let previousIndex = 0;
  const { mergedChunks, newActiveIndex } = mergeChunks(chunks, activeChunk);
  for (let i = 0; i < mergedChunks.length; i++) {
    const { start, end } = mergedChunks[i];
    const nonMarkedText = text.substring(previousIndex, start);
    if (nonMarkedText.length) {
      markedText.push(/* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: nonMarkedText }, previousIndex));
    }
    markedText.push(
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "mark",
        {
          className: i === newActiveIndex ? HighlightingEngine.ACTIVE_CLASS_NAME : void 0,
          children: text.substring(start, end)
        },
        start
      )
    );
    previousIndex = end;
  }
  const lastNonMarkedText = text.substring(previousIndex, text.length);
  if (lastNonMarkedText.length) {
    markedText.push(/* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lastNonMarkedText }, previousIndex));
  }
  return markedText;
}
function mergeChunks(chunks, activeChunk) {
  const mergedChunks = [];
  let lastChunk;
  let newActiveIndex;
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const isActive = i === activeChunk;
    if (lastChunk && lastChunk.info.end === chunk.start && !isActive && !lastChunk.isActive) {
      lastChunk.info.end = chunk.end;
      continue;
    }
    isActive && (newActiveIndex = mergedChunks.length);
    const newChunk = { start: chunk.start, end: chunk.end };
    lastChunk = { isActive, info: newChunk };
    mergedChunks.push(newChunk);
  }
  return { mergedChunks, newActiveIndex };
}
try {
  HighlightedText.displayName = "HighlightedText";
  HighlightedText.__docgenInfo = { "description": "Highlighted text\nUsed for highlighting parts in the 'text' which match with 'searchText'\nAlso actively highlights one matched part which is selected with 'activeMatchIndex'", "displayName": "HighlightedText", "props": { "searchText": { "defaultValue": null, "description": "", "name": "searchText", "required": true, "type": { "name": "string" } }, "activeMatchIndex": { "defaultValue": null, "description": "", "name": "activeMatchIndex", "required": false, "type": { "name": "number" } }, "text": { "defaultValue": null, "description": "", "name": "text", "required": true, "type": { "name": "string" } }, "caseSensitive": { "defaultValue": null, "description": "Should search be case sensitive", "name": "caseSensitive", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const linkify = new LinkifyIt({ fuzzyLink: false });
linkify.add("pw:", {
  validate: (text, pos, self) => {
    const tail = text.slice(pos);
    if (!self.re.pw) {
      self.re.pw = new RegExp(
        `(//|\\\\\\\\)${self.re.src_host}:([a-zA-Z0-9-._~!$&'()*+,;=@%{}]+/)+[a-zA-Z0-9-._~!$&'()*+,;=@%{}]*`,
        "i"
      );
    }
    if (self.re.pw.test(tail)) {
      const matches = tail.match(self.re.pw);
      if (matches !== null)
        return matches[0].length;
    }
    return 0;
  }
}).add("www.", {
  validate: (text, pos, self) => {
    const tail = text.slice(pos);
    if (!self.re.www) {
      self.re.www = new RegExp(
        `^${self.re.src_auth}${self.re.src_host_port_strict}${self.re.src_path}`,
        "i"
      );
    }
    if (self.re.www.test(tail)) {
      const matches = tail.match(self.re.www);
      if (matches !== null)
        return matches[0].length;
    }
    return 0;
  },
  normalize: (match) => {
    match.schema = "http:";
    match.url = `http://${match.url}`;
  }
});
const matchLinks = (text) => {
  const head = text.slice(0, 5);
  if (head === "pw://" || head === "pw:\\\\")
    return Array({
      index: 0,
      lastIndex: text.length,
      schema: "pw:",
      url: text
    });
  const matches = linkify.match(text);
  return matches ? matches : [];
};
const Orientation = Orientation$1;
const TimeFormat = TimeFormat$1;
function useAsyncValue(value) {
  const [result, setResult] = reactExports.useState(() => {
    if (isPromiseLike(value)) {
      return void 0;
    }
    return value;
  });
  reactExports.useEffect(() => {
    if (isPromiseLike(value)) {
      const subscription = from(value).subscribe({
        next: (resolvedValue) => setResult(resolvedValue)
      });
      return () => subscription.unsubscribe();
    }
    setResult(value);
    return;
  }, [value]);
  return result;
}
try {
  useAsyncValue.displayName = "useAsyncValue";
  useAsyncValue.__docgenInfo = { "description": "Custom hook for working with possibly async values.", "displayName": "useAsyncValue", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const MAX_CONCURRENT_SUBSCRIPTIONS = 1;
class SubscriptionScheduler {
  constructor() {
    this._scheduler = new Subject();
    this._scheduler.pipe(
      mergeMap(
        (sourceObservable) => sourceObservable.pipe(
          // connect source observable when scheduler subscribes
          tap({
            subscribe: () => {
              sourceObservable.connect();
            }
          }),
          // Guard against stack overflow when a lot of observables are scheduled. Without this operation `mergeMap`
          // will process each observable that is present in the pipeline recursively.
          observeOn(queueScheduler),
          // Delay the connection until another event loop task
          subscribeOn(asapScheduler),
          // Ignore errors in this pipeline without suppressing them for other subscribers
          onErrorResumeNextWith()
        ),
        MAX_CONCURRENT_SUBSCRIPTIONS
      )
    ).subscribe();
  }
  /**
   * Schedules `source` for subscription in the current scheduler.
   *
   * The actual scheduling is performed when the returned observable is subscribed to. To cancel, remove all subscribers
   * from the returned observable.
   *
   * @param source Input observable for which to schedule a subscription.
   * @returns Hot observable which starts emitting `source` values after subscription.
   */
  scheduleSubscription(source) {
    return defer(() => {
      let unsubscribed = false;
      const connectableObservable = connectable(
        iif(() => unsubscribed, EMPTY, source),
        {
          connector: () => new Subject(),
          resetOnDisconnect: false
        }
      );
      this._scheduler.next(connectableObservable);
      return connectableObservable.pipe(finalize(() => unsubscribed = true));
    });
  }
}
function scheduleSubscription(scheduler) {
  return (source) => scheduler.scheduleSubscription(source);
}
function useDebouncedAsyncValue(valueToBeResolved) {
  const [scheduler] = reactExports.useState(() => new SubscriptionScheduler());
  const [{ result, inProgress }, setState] = reactExports.useState({
    result: void 0,
    inProgress: false
  });
  reactExports.useEffect(() => {
    if (!valueToBeResolved) {
      setState((prev) => ({ ...prev, result: void 0, inProgress: false }));
      return;
    }
    setState((prev) => ({
      ...prev,
      inProgress: true
    }));
    const subscription = defer(valueToBeResolved).pipe(
      share({
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: true
      }),
      scheduleSubscription(scheduler)
    ).subscribe({
      next: (data) => {
        setState((prev) => ({ ...prev, result: data, inProgress: false }));
      },
      error: (err) => {
        setState((prev) => ({
          ...prev,
          result: { error: err, hasError: true },
          inProgress: false
        }));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [valueToBeResolved, scheduler]);
  if (isErrorResult(result)) {
    throw result.error ?? new Error("Exception in `useDebouncedAsyncValue`");
  }
  return { value: result, inProgress };
}
function isErrorResult(obj) {
  return obj !== void 0 && obj.hasError;
}
class TypeConverter {
  /** Converts a primitive value to a string */
  convertToString(value) {
    if (value === void 0)
      return "";
    return value.toString();
  }
  /** Default implementation just calls convertToString with no options */
  convertToStringWithOptions(value, _options) {
    return this.convertToString(value);
  }
  /** Converts a string to a primitive value */
  convertFromString(_value) {
    return void 0;
  }
  /** Default implementation just calls convertFromString with no options */
  convertFromStringWithOptions(value, _options) {
    return this.convertFromString(value);
  }
  /** Converts a value associated with a property description to a string */
  convertPropertyToString(propertyDescription, value) {
    var _a3;
    return this.convertToStringWithOptions(
      value,
      (_a3 = propertyDescription.converter) == null ? void 0 : _a3.options
    );
  }
  /** Converts a string with a property record to a property value */
  async convertFromStringToPropertyValue(value, propertyRecord) {
    const converterOptions = propertyRecord && propertyRecord.property.converter ? propertyRecord.property.converter.options : void 0;
    const stringValue = await this.convertFromStringWithOptions(
      value,
      converterOptions
    );
    const propertyValue = {
      valueFormat: PropertyValueFormat.Primitive,
      value: stringValue,
      displayValue: ""
    };
    return propertyValue;
  }
  /** Determines if two primitive values are equal */
  isEqualTo(valueA, valueB) {
    return valueA === valueB;
  }
  /** Determines if two primitive values are not equal */
  isNotEqualTo(valueA, valueB) {
    return valueA !== valueB;
  }
  /** Determines if a primitive value is null or undefined */
  isNull(value) {
    return value === null || value === void 0;
  }
  /** Determines if a primitive value is not null or not undefined */
  isNotNull(value) {
    return value !== null && value !== void 0;
  }
  /** Determines if the converter is for a string type */
  get isStringType() {
    return false;
  }
  /** Determines if the converter is for a numeric type */
  get isLessGreaterType() {
    return false;
  }
  /** Determines if the converter is for a boolean type */
  get isBooleanType() {
    return false;
  }
  /** Determines if the converter is for a nullable type */
  get isNullableType() {
    return true;
  }
}
class StringTypeConverter extends TypeConverter {
  convertToString(value) {
    return value ? value.toString() : "";
  }
  convertFromString(value) {
    return value;
  }
  sortCompare(valueA, valueB, ignoreCase) {
    if (!this.checkArgTypes(valueA, valueB))
      return 0;
    if (ignoreCase)
      return valueA.toLocaleLowerCase().localeCompare(valueB.toLocaleLowerCase());
    else
      return valueA.localeCompare(valueB);
  }
  get isStringType() {
    return true;
  }
  startsWith(valueA, valueB, caseSensitive) {
    if (!valueA || !valueB || !this.checkArgTypes(valueA, valueB))
      return false;
    if (caseSensitive)
      return valueA.substring(0, valueB.length) === valueB;
    return valueA.toLocaleUpperCase().substring(0, valueB.length) === valueB.toLocaleUpperCase();
  }
  endsWith(valueA, valueB, caseSensitive) {
    if (!valueA || !valueB || !this.checkArgTypes(valueA, valueB))
      return false;
    const position = valueA.length - valueB.length;
    if (position < 0)
      return false;
    let lastIndex;
    if (caseSensitive)
      lastIndex = valueA.indexOf(valueB, position);
    else
      lastIndex = valueA.toLocaleUpperCase().indexOf(valueB.toLocaleUpperCase(), position);
    return lastIndex !== -1 && lastIndex === position;
  }
  contains(valueA, valueB, caseSensitive) {
    if (!valueA || !valueB || !this.checkArgTypes(valueA, valueB))
      return false;
    if (valueB.length > valueA.length)
      return false;
    if (caseSensitive)
      return valueA.indexOf(valueB, 0) !== -1;
    return valueA.toLocaleUpperCase().indexOf(valueB.toLocaleUpperCase(), 0) !== -1;
  }
  doesNotContain(valueA, valueB, caseSensitive) {
    return !this.contains(valueA, valueB, caseSensitive);
  }
  isContainedIn(valueA, valueB, caseSensitive) {
    return this.contains(valueB, valueA, caseSensitive);
  }
  isNotContainedIn(valueA, valueB, caseSensitive) {
    return this.doesNotContain(valueB, valueA, caseSensitive);
  }
  isEmpty(valueA) {
    if (!this.checkArgTypes(valueA))
      return true;
    return valueA.length === 0;
  }
  isNotEmpty(valueA) {
    return !this.isEmpty(valueA);
  }
  checkArgTypes(valueA, valueB) {
    if (typeof valueA !== "string")
      return false;
    if (valueB && typeof valueB !== "string")
      return false;
    return true;
  }
}
const _TypeConverterManager = class _TypeConverterManager {
  static getFullConverterName(typename, converterName) {
    let fullConverterName = typename;
    if (converterName)
      fullConverterName += `:${converterName}`;
    return fullConverterName;
  }
  static registerConverter(typename, converter, converterName) {
    const fullConverterName = _TypeConverterManager.getFullConverterName(
      typename,
      converterName
    );
    if (_TypeConverterManager._converters.hasOwnProperty(fullConverterName)) {
      const nameOfConverter = _TypeConverterManager._converters[fullConverterName].constructor.name;
      throw Error(
        `TypeConverterManager.registerConverter error: type '${typename}' already registered to '${nameOfConverter}'`
      );
    }
    const instance = new converter();
    _TypeConverterManager._converters[fullConverterName] = instance;
  }
  static unregisterConverter(typename, converterName) {
    const fullConverterName = _TypeConverterManager.getFullConverterName(
      typename,
      converterName
    );
    if (_TypeConverterManager._converters.hasOwnProperty(fullConverterName)) {
      delete _TypeConverterManager._converters[fullConverterName];
    }
  }
  static getConverter(typename, converterName) {
    const fullConverterName = _TypeConverterManager.getFullConverterName(
      typename,
      converterName
    );
    if (_TypeConverterManager._converters.hasOwnProperty(fullConverterName))
      return _TypeConverterManager._converters[fullConverterName];
    if (!_TypeConverterManager._defaultTypeConverter) {
      _TypeConverterManager._defaultTypeConverter = new StringTypeConverter();
    }
    return _TypeConverterManager._defaultTypeConverter;
  }
};
_TypeConverterManager._converters = {};
let TypeConverterManager = _TypeConverterManager;
TypeConverterManager.registerConverter(
  StandardTypeNames.Text,
  StringTypeConverter
);
TypeConverterManager.registerConverter(
  StandardTypeNames.String,
  StringTypeConverter
);
TypeConverterManager.registerConverter(
  StandardTypeNames.URL,
  StringTypeConverter
);
const _BooleanTypeConverter = class _BooleanTypeConverter extends TypeConverter {
  /** @internal */
  static getLocalizedTrueFalse() {
    if (!_BooleanTypeConverter.sl10nTrue)
      _BooleanTypeConverter.sl10nTrue = UiComponents$1.translate("general.true");
    if (!_BooleanTypeConverter.sl10nFalse)
      _BooleanTypeConverter.sl10nFalse = UiComponents$1.translate("general.false");
  }
  convertToString(value) {
    if (value === void 0)
      return "";
    _BooleanTypeConverter.getLocalizedTrueFalse();
    if (value === _BooleanTypeConverter.sl10nTrue || value === _BooleanTypeConverter.sl10nFalse)
      return value;
    return value ? _BooleanTypeConverter.sl10nTrue : _BooleanTypeConverter.sl10nFalse;
  }
  convertFromString(value) {
    _BooleanTypeConverter.getLocalizedTrueFalse();
    const booleanValue = 0 === value.toLocaleLowerCase().localeCompare(_BooleanTypeConverter.sl10nTrue.toLocaleLowerCase());
    return booleanValue;
  }
  sortCompare(a, b, _ignoreCase) {
    if (!!a === !!b)
      return 0;
    if (!!a && !b)
      return 1;
    return -1;
  }
  get isBooleanType() {
    return true;
  }
};
_BooleanTypeConverter.sl10nTrue = "";
_BooleanTypeConverter.sl10nFalse = "";
let BooleanTypeConverter = _BooleanTypeConverter;
TypeConverterManager.registerConverter(
  StandardTypeNames.Boolean,
  BooleanTypeConverter
);
TypeConverterManager.registerConverter(
  StandardTypeNames.Bool,
  BooleanTypeConverter
);
function formatInputDate(inputDate, timeDisplay, customFormatter, alternateDateFormat) {
  if (customFormatter) {
    return customFormatter.formateDate(inputDate);
  }
  if (alternateDateFormat) {
    switch (alternateDateFormat) {
      case AlternateDateFormats.IsoDateTime:
        return inputDate.toISOString();
      case AlternateDateFormats.IsoShort:
        return inputDate.toISOString().slice(0, 10);
      case AlternateDateFormats.UtcDateTime:
        return inputDate.toUTCString().slice(5);
      case AlternateDateFormats.UtcShort:
        return inputDate.toUTCString().slice(5, 16);
      case AlternateDateFormats.UtcDateTimeWithDay:
        return inputDate.toUTCString();
      case AlternateDateFormats.UtcShortWithDay:
        return inputDate.toUTCString().slice(0, 16);
    }
  } else {
    const dateString = inputDate.toLocaleDateString(void 0, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    let timeString = "";
    if (timeDisplay) {
      switch (timeDisplay) {
        case TimeDisplay.H12MC:
          timeString = inputDate.toLocaleTimeString(void 0, {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit"
          });
          break;
        case TimeDisplay.H12MSC:
          timeString = inputDate.toLocaleTimeString(void 0, {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
          break;
        case TimeDisplay.H24M:
          timeString = inputDate.toLocaleTimeString(void 0, {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"
          });
          if (timeString === "24:00")
            timeString = "00:00";
          break;
        case TimeDisplay.H24MS:
          timeString = inputDate.toLocaleTimeString(void 0, {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
          if (timeString === "24:00:00")
            timeString = "00:00:00";
          break;
      }
    }
    return timeString.length ? `${dateString}, ${timeString}` : dateString;
  }
}
function DateField({
  initialDate,
  onDateChange,
  readOnly,
  dateFormatter,
  timeDisplay,
  style,
  className
}) {
  const initialDateRef = reactExports.useRef(initialDate);
  const [hasBadInput, setHasBadInput] = reactExports.useState(false);
  const [inputValue, setInputValue] = reactExports.useState(
    formatInputDate(initialDate, timeDisplay, dateFormatter)
  );
  reactExports.useEffect(() => {
    if (initialDate.getTime() !== initialDateRef.current.getTime()) {
      initialDateRef.current = initialDate;
    }
    setInputValue(formatInputDate(initialDate, timeDisplay, dateFormatter));
  }, [initialDate, dateFormatter, timeDisplay]);
  const handleInputChange = reactExports.useCallback(
    (event) => {
      setInputValue(event.currentTarget.value);
    },
    []
  );
  const parseDate = reactExports.useCallback(
    (dateString) => {
      try {
        if (dateFormatter && dateFormatter.parseDate)
          return dateFormatter.parseDate(dateString);
        const newDateValue = Date.parse(dateString);
        if (newDateValue)
          return new Date(newDateValue);
      } catch (_error) {
        Logger.logInfo(
          "DateField",
          `Encountered error parsing input value '${dateString}' as a date.`
        );
        return void 0;
      }
      return void 0;
    },
    [dateFormatter]
  );
  const updateInputDate = reactExports.useCallback(
    (dateString) => {
      try {
        const newDateValue = parseDate(dateString);
        if (newDateValue) {
          const newDate = new Date(newDateValue);
          onDateChange && onDateChange(newDate);
          setHasBadInput(false);
        } else {
          setHasBadInput(true);
        }
      } catch (_error) {
        setHasBadInput(true);
      }
    },
    [onDateChange, parseDate]
  );
  const handleOnBlur = reactExports.useCallback(
    (event) => {
      updateInputDate(event.target.value);
    },
    [updateInputDate]
  );
  function onInputKeyDown(event) {
    if (event.key === "Enter") {
      updateInputDate(event.currentTarget.value);
      event.preventDefault();
    }
  }
  const classNames = classnames(
    className,
    "components-date-input",
    hasBadInput && "components-date-has-error"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      "data-testid": "components-date-input",
      style,
      className: classNames,
      onKeyDown: onInputKeyDown,
      onBlur: handleOnBlur,
      onChange: handleInputChange,
      value: inputValue,
      disabled: readOnly || dateFormatter && !dateFormatter.parseDate,
      size: "small"
    }
  );
}
try {
  formatInputDate.displayName = "formatInputDate";
  formatInputDate.__docgenInfo = { "description": "Function to format a Date object that is used in control, type editor, and type converter\nto produce a consistent formatted Date string.", "displayName": "formatInputDate", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  DateField.displayName = "DateField";
  DateField.__docgenInfo = { "description": "Date input component. This component is typically used by the [[DatePickerPopupButton]] to display and edit date and time.", "displayName": "DateField", "props": { "initialDate": { "defaultValue": null, "description": "Defines initial date and time for component.", "name": "initialDate", "required": true, "type": { "name": "Date" } }, "onDateChange": { "defaultValue": null, "description": "Function to call when the date or time is changed.", "name": "onDateChange", "required": false, "type": { "name": "((day: Date) => void)" } }, "readOnly": { "defaultValue": null, "description": "Optional value to define if edit field allows editing. If a DateFormatter is provided\nit must provide a parseData function or the field will be read only no matter the setting of this value.", "name": "readOnly", "required": false, "type": { "name": "boolean" } }, "dateFormatter": { "defaultValue": null, "description": "Optional date formatter that produces an explicit date display", "name": "dateFormatter", "required": false, "type": { "name": "DateFormatter" } }, "timeDisplay": { "defaultValue": null, "description": "This property has two purposes, the first is specify that the display of time is desired and the second is to define the format of the time display.", "name": "timeDisplay", "required": false, "type": { "name": "enum", "value": [{ "value": '"hh:mm aa"' }, { "value": '"hh:mm:ss aa"' }, { "value": '"hh:mm"' }, { "value": '"hh:mm:ss"' }] } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class DateTimeTypeConverterBase extends TypeConverter {
  convertToString(value) {
    if (value === void 0)
      return "";
    if (typeof value === "string")
      value = new Date(value);
    if (value instanceof Date) {
      switch (this.getTimeFormat()) {
        case TimeFormat.Short:
          return value.toLocaleDateString();
        case TimeFormat.Long:
          return value.toLocaleString();
      }
      return value.toISOString();
    }
    return value.toString();
  }
  static isValidTimeDisplay(type) {
    return Object.keys(TimeDisplay).some(
      (key) => TimeDisplay[key] === type
    );
  }
  static isAlternateDateFormats(type) {
    return Object.keys(AlternateDateFormats).some(
      (key) => AlternateDateFormats[key] === type
    );
  }
  // supported options:
  //    timeDisplay?: TimeDisplay
  //    alternateDateFormat?: AlternateDateFormats
  convertToStringWithOptions(value, options) {
    if (value === void 0)
      return "";
    if (options) {
      let timeDisplay = this.getTimeFormat() === TimeFormat.Long ? TimeDisplay.H12MC : void 0;
      let alternateDateFormat = AlternateDateFormats.None;
      if ("alternateDateFormat" in options && DateTimeTypeConverterBase.isAlternateDateFormats(
        options.alternateDateFormat
      )) {
        alternateDateFormat = options.alternateDateFormat;
      }
      if (this.getTimeFormat() === TimeFormat.Long) {
        if ("timeDisplay" in options) {
          if (alternateDateFormat) {
            Logger.logInfo(
              UiComponents$1.loggerCategory(this),
              `Invalid specification of timeDisplay with alternateDateFormat specification`
            );
          } else {
            if (DateTimeTypeConverterBase.isValidTimeDisplay(options.timeDisplay))
              timeDisplay = options.timeDisplay;
          }
        }
      }
      if (typeof value === "string") {
        value = new Date(value);
        if (value instanceof Date && alternateDateFormat) {
          value = adjustDateToTimezone(value, value.getTimezoneOffset() * -1);
        }
      }
      if (value instanceof Date) {
        if (this.getTimeFormat() === TimeFormat.Long) {
          if (alternateDateFormat === AlternateDateFormats.IsoShort)
            alternateDateFormat = AlternateDateFormats.IsoDateTime;
          if (alternateDateFormat === AlternateDateFormats.UtcShort)
            alternateDateFormat = AlternateDateFormats.UtcDateTime;
          if (alternateDateFormat === AlternateDateFormats.UtcShortWithDay)
            alternateDateFormat = AlternateDateFormats.UtcDateTimeWithDay;
        } else {
          if (alternateDateFormat === AlternateDateFormats.IsoDateTime)
            alternateDateFormat = AlternateDateFormats.IsoShort;
          if (alternateDateFormat === AlternateDateFormats.UtcDateTime)
            alternateDateFormat = AlternateDateFormats.UtcShort;
          if (alternateDateFormat === AlternateDateFormats.UtcDateTimeWithDay)
            alternateDateFormat = AlternateDateFormats.UtcShortWithDay;
        }
        const formattedDateTime = formatInputDate(
          value,
          timeDisplay,
          void 0,
          alternateDateFormat
        );
        if (formattedDateTime)
          return formattedDateTime;
      }
    }
    return this.convertToString(value);
  }
  /** Default implementation just calls convertFromString with no options */
  convertFromStringWithOptions(value, options) {
    if (!value)
      return void 0;
    if (options) {
      let alternateDateFormat = AlternateDateFormats.None;
      if ("alternateDateFormat" in options && DateTimeTypeConverterBase.isAlternateDateFormats(
        options.alternateDateFormat
      )) {
        alternateDateFormat = options.alternateDateFormat;
      }
      let date = new Date(value);
      if (date instanceof Date && alternateDateFormat) {
        date = adjustDateToTimezone(date, date.getTimezoneOffset() * -1);
      }
    }
    return this.convertFromString(value);
  }
  isDateValid(date) {
    return date instanceof Date && !isNaN(+date);
  }
  convertFromString(value) {
    if (!value)
      return void 0;
    const dateValue = new Date(value);
    if (!this.isDateValid(dateValue))
      return void 0;
    return dateValue;
  }
  get isLessGreaterType() {
    return true;
  }
  sortCompare(valueA, valueB, _ignoreCase) {
    return valueA.valueOf() - valueB.valueOf();
  }
  isEqualTo(valueA, valueB) {
    return valueA.valueOf() === valueB.valueOf();
  }
  isNotEqualTo(valueA, valueB) {
    return valueA.valueOf() !== valueB.valueOf();
  }
  isLessThan(a, b) {
    return a.valueOf() < b.valueOf();
  }
  isLessThanOrEqualTo(a, b) {
    return a.valueOf() <= b.valueOf();
  }
  isGreaterThan(a, b) {
    return a.valueOf() > b.valueOf();
  }
  isGreaterThanOrEqualTo(a, b) {
    return a.valueOf() >= b.valueOf();
  }
}
class ShortDateTypeConverter extends DateTimeTypeConverterBase {
  getTimeFormat() {
    return TimeFormat.Short;
  }
}
TypeConverterManager.registerConverter(
  StandardTypeNames.ShortDate,
  ShortDateTypeConverter
);
class DateTimeTypeConverter extends DateTimeTypeConverterBase {
  getTimeFormat() {
    return TimeFormat.Long;
  }
}
TypeConverterManager.registerConverter(
  StandardTypeNames.DateTime,
  DateTimeTypeConverter
);
class EnumTypeConverter extends TypeConverter {
  convertPropertyToString(propertyDescription, value) {
    if (value === void 0)
      return "";
    if (propertyDescription.enum) {
      return this.getMatchingStringValue(propertyDescription.enum, value);
    }
    return super.convertToString(value);
  }
  async getMatchingStringValue(enumVal, value) {
    let choices = [];
    if (enumVal.choices instanceof Promise) {
      choices = await enumVal.choices;
    } else {
      choices = enumVal.choices;
    }
    const pos = this.getPosition(choices, value);
    if (-1 !== pos)
      return choices[pos].label;
    return this.convertToString(value);
  }
  getPosition(choices, value) {
    for (let i = 0; i < choices.length; ++i) {
      if (choices[i].value === value)
        return i;
    }
    return -1;
  }
  sortCompare(a, b, ignoreCase) {
    if (isNaN(+a) || isNaN(+b)) {
      return TypeConverterManager.getConverter("string").sortCompare(
        a,
        b,
        ignoreCase
      );
    }
    return +a - +b;
  }
}
TypeConverterManager.registerConverter(
  StandardTypeNames.Enum,
  EnumTypeConverter
);
class HexadecimalTypeConverter extends TypeConverter {
  convertToString(value) {
    if (value === void 0)
      return "";
    const hexString = value.toString();
    return `0x${hexString.substring(2, hexString.length).toUpperCase()}`;
  }
  convertFromString(value) {
    if (value.substring(0, 2) !== "0x")
      value = `0x${value}`;
    value = Id64.fromString(value);
    if (Id64.isValidId64(value))
      return value;
    return void 0;
  }
  sortCompare(a, b) {
    a = Id64.fromString(a);
    b = Id64.fromString(b);
    if (a === b)
      return 0;
    if (a > b)
      return 1;
    return -1;
  }
}
TypeConverterManager.registerConverter(
  StandardTypeNames.Hex,
  HexadecimalTypeConverter
);
TypeConverterManager.registerConverter(
  StandardTypeNames.Hexadecimal,
  HexadecimalTypeConverter
);
class NavigationPropertyTypeConverter extends TypeConverter {
  convertPropertyToString(propertyDescription, value) {
    return value === void 0 ? "" : propertyDescription.displayLabel;
  }
  sortCompare(a, b, ignoreCase) {
    return TypeConverterManager.getConverter(
      StandardTypeNames.Hexadecimal
    ).sortCompare(
      a.id,
      b.id,
      ignoreCase
    );
  }
}
TypeConverterManager.registerConverter(
  StandardTypeNames.Navigation,
  NavigationPropertyTypeConverter
);
class NumericTypeConverterBase extends TypeConverter {
  get isLessGreaterType() {
    return true;
  }
  isLessThan(a, b) {
    return a < b;
  }
  isLessThanOrEqualTo(a, b) {
    return a <= b;
  }
  isGreaterThan(a, b) {
    return a > b;
  }
  isGreaterThanOrEqualTo(a, b) {
    return a >= b;
  }
  sortCompare(a, b, _ignoreCase) {
    return +a - +b;
  }
}
class FloatTypeConverter extends NumericTypeConverterBase {
  static parseString(value) {
    const parsedValue = parseFloat(value);
    return Number.isNaN(parsedValue) ? void 0 : parsedValue;
  }
  convertToString(value) {
    if (value === void 0)
      return "";
    let numericValue = 0;
    if (typeof value === "string") {
      if (value === "-" || value === "" || value === "-0.0" || value === "-0") {
        numericValue = 0;
      } else {
        numericValue = FloatTypeConverter.parseString(value) ?? 0;
      }
    } else {
      numericValue = value;
    }
    let stringValue = (Math.round(100 * numericValue) / 100).toString();
    if (stringValue.indexOf(".") === -1)
      stringValue += ".0";
    return stringValue;
  }
  convertFromString(value) {
    return FloatTypeConverter.parseString(value);
  }
}
TypeConverterManager.registerConverter(
  StandardTypeNames.Float,
  FloatTypeConverter
);
TypeConverterManager.registerConverter(
  StandardTypeNames.Double,
  FloatTypeConverter
);
TypeConverterManager.registerConverter(
  StandardTypeNames.Number,
  FloatTypeConverter
);
class IntTypeConverter extends NumericTypeConverterBase {
  static parseString(value) {
    const parsedValue = parseInt(value, 10);
    return Number.isNaN(parsedValue) ? void 0 : parsedValue;
  }
  convertToString(value) {
    if (value === void 0)
      return "";
    let numericValue = 0;
    if (typeof value === "string") {
      if (value === "-" || value === "" || value === "-0") {
        numericValue = 0;
      } else {
        numericValue = IntTypeConverter.parseString(value) ?? 0;
      }
    } else {
      numericValue = value;
    }
    return Math.round(numericValue).toString();
  }
  convertFromString(value) {
    return IntTypeConverter.parseString(value);
  }
}
TypeConverterManager.registerConverter(StandardTypeNames.Int, IntTypeConverter);
TypeConverterManager.registerConverter(
  StandardTypeNames.Integer,
  IntTypeConverter
);
class BasePointTypeConverter extends TypeConverter {
  constructor(componentConverterName = StandardTypeNames.Double) {
    super();
    this.componentConverterName = componentConverterName;
  }
  formatValue(value) {
    if (typeof value === "string")
      value = parseFloat(value);
    return TypeConverterManager.getConverter(
      this.componentConverterName
    ).convertToString(value);
  }
  convertToString(value) {
    if (!value)
      return "";
    let components = new Array();
    if (Array.isArray(value)) {
      if (value.length === 0)
        return "";
      components = value.map(
        (c) => this.formatValue(c)
      );
    } else {
      components = [this.formatValue(value.x), this.formatValue(value.y)];
      if (void 0 !== value.z)
        components.push(this.formatValue(value.z));
    }
    const hasAsyncComponents = components.some(isPromiseLike);
    if (hasAsyncComponents) {
      return Promise.all(
        components.map(async (c) => isPromiseLike(c) ? c : Promise.resolve(c))
      ).then((c) => c.join(", "));
    }
    return components.join(", ");
  }
  convertFromString(value) {
    return this.constructPoint(value.split(","));
  }
  sortCompare(a, b, _ignoreCase) {
    const aLength = this.getVectorLength(a);
    const bLength = this.getVectorLength(b);
    if (aLength === bLength)
      return 0;
    if (aLength === void 0)
      return -1;
    if (bLength === void 0)
      return 1;
    return aLength - bLength;
  }
}
class Point2dTypeConverter extends BasePointTypeConverter {
  constructor(componentConverterName) {
    super(componentConverterName);
  }
  getVectorLength(point) {
    const derivedPoint = this.constructPoint(point);
    if (derivedPoint === void 0)
      return void 0;
    return Math.sqrt(Math.pow(derivedPoint.x, 2) + Math.pow(derivedPoint.y, 2));
  }
  constructPoint(values) {
    if (Array.isArray(values)) {
      if (values.length !== 2 || isNaN(+values[0]) || isNaN(+values[1]))
        return void 0;
      return { x: +values[0], y: +values[1] };
    }
    return values;
  }
}
TypeConverterManager.registerConverter(
  StandardTypeNames.Point2d,
  Point2dTypeConverter
);
class Point3dTypeConverter extends BasePointTypeConverter {
  constructor(componentConverterName) {
    super(componentConverterName);
  }
  getVectorLength(point) {
    const derivedPoint = this.constructPoint(point);
    if (derivedPoint === void 0)
      return void 0;
    return Math.sqrt(
      Math.pow(derivedPoint.x, 2) + Math.pow(derivedPoint.y, 2) + Math.pow(derivedPoint.z, 2)
    );
  }
  constructPoint(values) {
    if (Array.isArray(values)) {
      if (values.length !== 3 || isNaN(+values[0]) || isNaN(+values[1]) || isNaN(+values[2]))
        return void 0;
      return { x: +values[0], y: +values[1], z: +values[2] };
    }
    const z = values.z;
    return { ...values, z: z ? z : 0 };
  }
}
TypeConverterManager.registerConverter(
  StandardTypeNames.Point3d,
  Point3dTypeConverter
);
class CompositeTypeConverter extends TypeConverter {
  convertToString(value) {
    if (value === void 0)
      return "";
    return createDisplayValue(value);
  }
  sortCompare(valueA, valueB, ignoreCase) {
    const length = Math.min(valueA.parts.length, valueB.parts.length);
    const separatorComparison = compareStrings(
      valueA.separator,
      valueB.separator,
      ignoreCase
    );
    for (let i = 0; i < length; i++) {
      const lhs = valueA.parts[i];
      const rhs = valueB.parts[i];
      const compareResult = lhs.typeName !== rhs.typeName ? compareStrings(lhs.displayValue, rhs.displayValue, ignoreCase) : TypeConverterManager.getConverter(lhs.typeName).sortCompare(
        lhs.rawValue,
        rhs.rawValue,
        ignoreCase
      );
      if (compareResult !== 0)
        return compareResult;
      if (i === 0 && separatorComparison !== 0)
        return separatorComparison;
    }
    if (valueA.parts.length !== valueB.parts.length)
      return valueA.parts.length - valueB.parts.length;
    return 0;
  }
}
TypeConverterManager.registerConverter(
  StandardTypeNames.Composite,
  CompositeTypeConverter
);
const compareStrings = (lhs, rhs, ignoreCase) => {
  if (ignoreCase)
    return lhs.toLocaleLowerCase().localeCompare(rhs.toLocaleLowerCase());
  else
    return lhs.localeCompare(rhs);
};
const createDisplayValue = async (compositeValue) => {
  const parts = [];
  for (const part of compositeValue.parts) {
    let valueString;
    if (part.typeName === "composite") {
      valueString = await createDisplayValue(
        part.rawValue
      );
    } else {
      valueString = await TypeConverterManager.getConverter(
        part.typeName
      ).convertToString(part.rawValue);
    }
    parts.push(valueString);
  }
  return parts.join(compositeValue.separator);
};
const general = {
  "true": "true",
  "false": "false",
  loading: "loading",
  noData: "The data required for this tree layout is not available in this iModel.",
  length: "Length",
  label: "Label",
  of: "of",
  search: "Search",
  clear: "Clear"
};
const button = {
  label: {
    search: "Search",
    cancel: "Cancel",
    settings: "Settings",
    filter: "Filter",
    selectAll: "Select All"
  }
};
const breadcrumb = {
  invalidBreadcrumbPath: "Path not found.",
  errorUnknownMode: "Error: Unknown Breadcrumb mode.",
  name: "Name",
  icon: "Icon",
  description: "Description"
};
const tree = {
  noResultsForFilter: '0 matches found for "{{searchText}}"'
};
const table = {
  filter: {
    numericTooltip: "Input Methods: Range (x-y), Greater Then (>x), Less Then (<y)",
    numericPlaceholder: "e.g. 3,10-15,>20"
  }
};
const showhide = {
  noLabel: "[unlabeled]",
  showAll: "Show all",
  list: "List...",
  title: "Show/Hide"
};
const property = {
  varies: "*** Varies ***",
  arrayLength: "Number of Items",
  expand: "See more",
  collapse: "See less"
};
const timepicker = {
  "day-period-am": "AM",
  "day-period-pm": "PM"
};
const datepicker = {
  selectDate: "Select Date",
  time: "Time",
  previousMonth: "Previous Month",
  nextMonth: "Next Month"
};
const month = {
  long: {
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December"
  },
  short: {
    january: "Jan",
    february: "Feb",
    march: "Mar",
    april: "Apr",
    may: "May",
    june: "Jun",
    july: "Jul",
    august: "Aug",
    september: "Sep",
    october: "Oct",
    november: "Nov",
    december: "Dec"
  }
};
const days = {
  long: {
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday"
  },
  short: {
    sunday: "Su",
    monday: "Mo",
    tuesday: "Tu",
    wednesday: "We",
    thursday: "Th",
    friday: "Fr",
    saturday: "Sa"
  }
};
const time = {
  am: "am",
  pm: "pm"
};
const filteringInput = {
  placeholder: "Search..."
};
const toolbar = {
  overflow: "More toolbar items"
};
const editor = {
  "enum": "Enum Editor",
  text: "Text Editor",
  textarea: "Textarea Editor"
};
const filterBuilder = {
  rule: "Rule",
  ruleGroup: "Rule Group",
  add: "Add",
  "delete": "Delete",
  operators: {
    isTrue: "Is true",
    isFalse: "Is false",
    equal: "Equal",
    notEqual: "Not equal",
    contains: "Contains",
    isNull: "Is null",
    isNotNull: "Is not null",
    and: "And",
    or: "Or",
    between: "Between",
    notBetween: "Not between"
  },
  chooseProperty: "Choose property",
  errorMessages: {
    emptyValue: "Value is required",
    invalidRange: "Invalid range"
  }
};
const dialog = {
  ok: "OK",
  cancel: "Cancel"
};
const UiComponents = {
  general,
  button,
  breadcrumb,
  tree,
  table,
  showhide,
  property,
  timepicker,
  datepicker,
  month,
  days,
  time,
  filteringInput,
  toolbar,
  editor,
  filterBuilder,
  dialog
};
const defaults = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  breadcrumb,
  button,
  datepicker,
  days,
  default: UiComponents,
  dialog,
  editor,
  filterBuilder,
  filteringInput,
  general,
  month,
  property,
  showhide,
  table,
  time,
  timepicker,
  toolbar,
  tree
}, Symbol.toStringTag, { value: "Module" }));
function useTranslation() {
  const fallback = reactExports.useCallback((key) => {
    if (!UiComponents$1.initialized) {
      return void 0;
    }
    return UiComponents$1.translate(key);
  }, []);
  return usePackageTranslation({
    namespace: UiComponents$1.localizationNamespace,
    fallback,
    defaults
  });
}
try {
  useTranslation.displayName = "useTranslation";
  useTranslation.__docgenInfo = { "description": "Returns a translation function.", "displayName": "useTranslation", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function isSameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function DatePicker(props) {
  const { translate } = useTranslation();
  const previousMonthLabel = translate("datepicker.previousMonth");
  const nextMonthLabel = translate("datepicker.nextMonth");
  const monthsLong = [
    translate("month.long.january"),
    translate("month.long.february"),
    translate("month.long.march"),
    translate("month.long.april"),
    translate("month.long.may"),
    translate("month.long.june"),
    translate("month.long.july"),
    translate("month.long.august"),
    translate("month.long.september"),
    translate("month.long.october"),
    translate("month.long.november"),
    translate("month.long.december")
  ];
  const daysLong = [
    translate("days.long.sunday"),
    translate("days.long.monday"),
    translate("days.long.tuesday"),
    translate("days.long.wednesday"),
    translate("days.long.thursday"),
    translate("days.long.friday"),
    translate("days.long.saturday")
  ];
  const daysShort = [
    translate("days.short.sunday"),
    translate("days.short.monday"),
    translate("days.short.tuesday"),
    translate("days.short.wednesday"),
    translate("days.short.thursday"),
    translate("days.short.friday"),
    translate("days.short.saturday")
  ];
  const [selectedDay, setSelectedDay] = reactExports.useState(
    new Date(props.selected.getTime())
  );
  const [displayedMonthIndex, setDisplayedMonthIndex] = reactExports.useState(
    selectedDay.getMonth()
  );
  const [displayedYear, setDisplayedYear] = reactExports.useState(
    selectedDay.getFullYear()
  );
  const [focusedDay, setFocusedDay] = reactExports.useState(selectedDay);
  reactExports.useEffect(() => {
    const newSelectedDay = new Date(props.selected);
    setSelectedDay(new Date(props.selected));
    setDisplayedMonthIndex(newSelectedDay.getMonth());
    setDisplayedYear(newSelectedDay.getFullYear());
    setFocusedDay(newSelectedDay);
  }, [props.selected]);
  const days2 = reactExports.useMemo(() => {
    const msFirstDayOfMonth = new Date(
      displayedYear,
      displayedMonthIndex,
      1
    ).getTime();
    let offsetToFirst = new Date(msFirstDayOfMonth).getDay();
    if (0 === offsetToFirst)
      offsetToFirst = 7;
    const daysInMonth = [];
    for (let i = 0; i < 42; i++) {
      const adjustedDay = 1 + i - offsetToFirst;
      daysInMonth.push(
        new Date(displayedYear, displayedMonthIndex, adjustedDay)
      );
    }
    return daysInMonth;
  }, [displayedMonthIndex, displayedYear]);
  const weeks = reactExports.useMemo(() => {
    const weeksInMonth = [];
    const weekCount = Math.ceil(days2.length / 7);
    for (let i = 0; i < weekCount; i++) {
      weeksInMonth.push(days2.slice(i * 7, (i + 1) * 7));
    }
    return weeksInMonth;
  }, [days2]);
  const setMonthAndYear = reactExports.useCallback(
    (newMonth, newYear) => {
      setDisplayedMonthIndex(newMonth);
      setDisplayedYear(newYear);
      if (selectedDay.getFullYear() === newYear && selectedDay.getMonth() === newMonth) {
        setFocusedDay(new Date(selectedDay.getTime()));
      } else {
        const newFocusDay = new Date(focusedDay.getTime());
        newFocusDay.setFullYear(newYear, newMonth, 1);
        setFocusedDay(newFocusDay);
      }
    },
    [focusedDay, selectedDay]
  );
  const handleMoveToPreviousMonth = reactExports.useCallback(() => {
    const newMonth = displayedMonthIndex !== 0 ? displayedMonthIndex - 1 : 11;
    const newYear = displayedMonthIndex !== 0 ? displayedYear : displayedYear - 1;
    setMonthAndYear(newMonth, newYear);
  }, [displayedMonthIndex, displayedYear, setMonthAndYear]);
  const handleMoveToNextMonth = reactExports.useCallback(() => {
    const newMonth = displayedMonthIndex !== 11 ? displayedMonthIndex + 1 : 0;
    const newYear = displayedMonthIndex !== 11 ? displayedYear : displayedYear + 1;
    setMonthAndYear(newMonth, newYear);
  }, [displayedMonthIndex, displayedYear, setMonthAndYear]);
  const handleOnDayChange = reactExports.useCallback(
    (day) => () => {
      setSelectedDay(day);
      setFocusedDay(day);
      props.onDateChange && props.onDateChange(day);
    },
    [props]
  );
  const handleCalendarKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === Key_enum.Key.ArrowDown.valueOf()) {
        const focusedDayIndex = days2.findIndex(
          (day) => isSameDay(day, focusedDay)
        );
        if (focusedDayIndex + 7 > 41)
          setFocusedDay(days2[focusedDayIndex % 7]);
        else
          setFocusedDay(days2[focusedDayIndex + 7]);
        event.preventDefault();
      }
      if (event.key === Key_enum.Key.ArrowUp.valueOf()) {
        const focusedDayIndex = days2.findIndex(
          (day) => isSameDay(day, focusedDay)
        );
        if (focusedDayIndex - 7 < 0)
          setFocusedDay(days2[focusedDayIndex % 7 + 35]);
        else
          setFocusedDay(days2[focusedDayIndex - 7]);
        event.preventDefault();
      }
      if (event.key === Key_enum.Key.ArrowLeft.valueOf()) {
        const focusedDayIndex = days2.findIndex(
          (day) => isSameDay(day, focusedDay)
        );
        if (focusedDayIndex - 1 >= 0)
          setFocusedDay(days2[focusedDayIndex - 1]);
        event.preventDefault();
      }
      if (event.key === Key_enum.Key.ArrowRight.valueOf()) {
        const focusedDayIndex = days2.findIndex(
          (day) => isSameDay(day, focusedDay)
        );
        if (focusedDayIndex + 1 <= 41)
          setFocusedDay(days2[focusedDayIndex + 1]);
        event.preventDefault();
      }
      if (event.key === Key_enum.Key.Enter.valueOf() || event.key === " ") {
        handleOnDayChange(focusedDay)();
        event.preventDefault();
      }
    },
    [days2, focusedDay, handleOnDayChange]
  );
  const previousButtonClass = classnames(
    "components-previous-month",
    props.showFocusOutline && "showFocusOutline"
  );
  const nextButtonClass = classnames(
    "components-next-month",
    props.showFocusOutline && "showFocusOutline"
  );
  const calendarClass = classnames(
    "components-date-picker-calendar-month",
    props.showFocusOutline && "showFocusOutline"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "components-date-picker-calendar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "components-date-picker-calendar-header-months", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: previousButtonClass,
          title: previousMonthLabel,
          onClick: handleMoveToPreviousMonth,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgChevronLeft, {}) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "components-month-year", children: [
        monthsLong[displayedMonthIndex],
        " ",
        displayedYear
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: nextButtonClass,
          title: nextMonthLabel,
          onClick: handleMoveToNextMonth,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgChevronRight, {}) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-date-picker-calendar-header-weekdays", children: [0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "components-date-picker-calendar-header-day-short",
        title: daysLong[dayOfWeek],
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: daysShort[dayOfWeek] })
      },
      `day-${dayOfWeek}`
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "ul",
      {
        tabIndex: 0,
        onKeyDown: handleCalendarKeyDown,
        "data-testid": "components-date-picker-calendar-list",
        className: calendarClass,
        role: "listbox",
        children: weeks.map((weekdays, weekIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: weekdays.map((day, dayIndex) => {
          const isActive = selectedDay && day && isSameDay(selectedDay, day);
          const isFocused = focusedDay && day && isSameDay(focusedDay, day) && props.showFocusOutline;
          const isCurrentMonth = day.getMonth() === displayedMonthIndex;
          const classNames = classnames(
            "components-date-picker-calendar-day",
            isActive && "selected",
            !isCurrentMonth && "notCurrentMonth",
            isFocused && "focused"
          );
          const dateValue = day.getDate();
          return (
            /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: classNames,
                onClick: handleOnDayChange(day),
                role: "option",
                "aria-selected": isActive,
                "data-value": day.getTime(),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dateValue })
              },
              `${displayedYear}.${displayedMonthIndex}.day.${dayIndex}`
            )
          );
        }) }, `week-${weekIndex}`))
      }
    )
  ] });
}
try {
  DatePicker.displayName = "DatePicker";
  DatePicker.__docgenInfo = { "description": "DatePicker component. Show a month selector and a day calendar to select a specific date.", "displayName": "DatePicker", "props": { "selected": { "defaultValue": null, "description": "defines both date and time", "name": "selected", "required": true, "type": { "name": "Date" } }, "onDateChange": { "defaultValue": null, "description": "function to call when date or time has changed", "name": "onDateChange", "required": false, "type": { "name": "((day: Date) => void)" } }, "showFocusOutline": { "defaultValue": null, "description": "show focus outlines, useful for keyboard navigation", "name": "showFocusOutline", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function getValidInt(intText, min, max, defaultValue) {
  try {
    const newValue = parseInt(intText, 10);
    if (newValue >= min && newValue <= max)
      return newValue;
  } catch (_e2) {
    return defaultValue;
  }
  return defaultValue;
}
function isSameTime(a, b) {
  return a.hours === b.hours && a.minutes === b.minutes && a.seconds === b.seconds;
}
function TimeField({
  time: time2,
  timeDisplay,
  readOnly,
  onTimeChange
}) {
  const { translate } = useTranslation();
  const initialDateRef = reactExports.useRef(time2);
  const amLabel = translate("timepicker.day-period-am");
  const pmLabel = translate("timepicker.day-period-pm");
  const [timeSpec, setTimeSpec] = reactExports.useState(time2);
  const { hours, minutes, seconds } = timeSpec;
  const showDayPeriod = -1 !== timeDisplay.search("aa");
  const getDisplayHours = reactExports.useCallback(
    (timeHours) => {
      if (!showDayPeriod) {
        return timeHours;
      }
      const outHours = 0 === timeHours ? 12 : timeHours > 12 ? timeHours - 12 : timeHours;
      return outHours;
    },
    [showDayPeriod]
  );
  reactExports.useEffect(() => {
    if (!isSameTime(time2, initialDateRef.current)) {
      setTimeSpec(time2);
      initialDateRef.current = time2;
    }
  }, [time2]);
  const displayHour = getDisplayHours(hours);
  const [dayPeriodText, setDayPeriodText] = reactExports.useState(
    showDayPeriod ? hours >= 12 ? pmLabel : amLabel : void 0
  );
  const [hoursText, setHoursText] = reactExports.useState(
    displayHour.toString().padStart(2, "0")
  );
  const [minutesText, setMinutesText] = reactExports.useState(
    minutes.toString().padStart(2, "0")
  );
  const [secondsText, setSecondsText] = reactExports.useState(
    seconds.toString().padStart(2, "0")
  );
  const updateTimeSpec = reactExports.useCallback(
    (newTime) => {
      if (newTime.hours !== timeSpec.hours || newTime.minutes !== timeSpec.minutes || newTime.seconds !== timeSpec.seconds) {
        setTimeSpec(newTime);
        onTimeChange && onTimeChange(newTime);
      }
    },
    [onTimeChange, timeSpec.hours, timeSpec.minutes, timeSpec.seconds]
  );
  const handleHoursChange = reactExports.useCallback(
    (event) => {
      setHoursText(event.currentTarget.value);
    },
    []
  );
  const handleMinutesChange = reactExports.useCallback(
    (event) => {
      setMinutesText(event.currentTarget.value);
    },
    []
  );
  const handleSecondsChange = reactExports.useCallback(
    (event) => {
      setSecondsText(event.currentTarget.value);
    },
    []
  );
  const handleDayPeriodChange = reactExports.useCallback(
    (event) => {
      setDayPeriodText(event.currentTarget.value);
    },
    []
  );
  const handleHoursOnBlur = reactExports.useCallback(() => {
    const newHours = getValidInt(hoursText, 0, 24, hours);
    setHoursText(getDisplayHours(newHours).toString().padStart(2, "0"));
    updateTimeSpec({ ...timeSpec, hours: newHours });
    showDayPeriod && setDayPeriodText(newHours >= 12 ? pmLabel : amLabel);
  }, [
    amLabel,
    getDisplayHours,
    hours,
    hoursText,
    pmLabel,
    showDayPeriod,
    timeSpec,
    updateTimeSpec
  ]);
  const handleMinutesOnBlur = reactExports.useCallback(() => {
    const newMinutes = getValidInt(minutesText, 0, 59, minutes);
    setMinutesText(newMinutes.toString().padStart(2, "0"));
    updateTimeSpec({ ...timeSpec, minutes: newMinutes });
  }, [minutes, minutesText, timeSpec, updateTimeSpec]);
  const handleSecondsOnBlur = reactExports.useCallback(() => {
    const newSeconds = getValidInt(secondsText, 0, 59, seconds);
    setSecondsText(newSeconds.toString().padStart(2, "0"));
    updateTimeSpec({ ...timeSpec, seconds: newSeconds });
  }, [seconds, secondsText, timeSpec, updateTimeSpec]);
  const handleDayPeriodOnBlur = reactExports.useCallback(() => {
    let newPeriodText;
    if (dayPeriodText === "AM" || dayPeriodText === "am" || dayPeriodText === amLabel)
      newPeriodText = amLabel;
    else if (dayPeriodText === "PM" || dayPeriodText === "pm" || dayPeriodText === pmLabel)
      newPeriodText = pmLabel;
    if (void 0 !== newPeriodText) {
      setDayPeriodText(newPeriodText);
      if (newPeriodText === amLabel && hours > 12) {
        updateTimeSpec({ ...timeSpec, hours: hours - 12 });
      } else if (newPeriodText === pmLabel && hours <= 11) {
        updateTimeSpec({ ...timeSpec, hours: hours + 12 });
      }
    }
  }, [amLabel, dayPeriodText, hours, pmLabel, timeSpec, updateTimeSpec]);
  const handleHoursOnKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === Key_enum.Key.ArrowDown.valueOf() || event.key === Key_enum.Key.ArrowUp.valueOf()) {
        let newHours = hours + (event.key === Key_enum.Key.ArrowDown.valueOf() ? -1 : 1);
        if (newHours < 0)
          newHours = 24;
        if (newHours > 24 || newHours > 23 && minutes + seconds > 0)
          newHours = 0;
        setHoursText(getDisplayHours(newHours).toString().padStart(2, "0"));
        updateTimeSpec({ ...timeSpec, hours: newHours });
        showDayPeriod && setDayPeriodText(newHours >= 12 ? pmLabel : amLabel);
        event.preventDefault();
      } else if (event.key === Key_enum.Key.Enter.valueOf()) {
        const newHours = getValidInt(hoursText, 0, 24, hours);
        setHoursText(getDisplayHours(newHours).toString().padStart(2, "0"));
        updateTimeSpec({ ...timeSpec, hours: newHours });
        showDayPeriod && setDayPeriodText(newHours >= 12 ? pmLabel : amLabel);
        event.preventDefault();
      }
    },
    [
      amLabel,
      getDisplayHours,
      hours,
      hoursText,
      minutes,
      pmLabel,
      seconds,
      showDayPeriod,
      timeSpec,
      updateTimeSpec
    ]
  );
  const handleMinutesOnKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === Key_enum.Key.ArrowDown.valueOf()) {
        const newMinutes = minutes === 0 ? 59 : minutes - 1;
        setMinutesText(newMinutes.toString().padStart(2, "0"));
        updateTimeSpec({ ...timeSpec, minutes: newMinutes });
        event.preventDefault();
      } else if (event.key === Key_enum.Key.ArrowUp.valueOf()) {
        const newMinutes = minutes === 59 ? 0 : minutes + 1;
        setMinutesText(newMinutes.toString().padStart(2, "0"));
        updateTimeSpec({ ...timeSpec, minutes: newMinutes });
        event.preventDefault();
      } else if (event.key === Key_enum.Key.Home.valueOf() || event.key === Key_enum.Key.End.valueOf()) {
        const newMinutes = event.key === Key_enum.Key.Home.valueOf() ? 0 : 59;
        setMinutesText(newMinutes.toString().padStart(2, "0"));
        updateTimeSpec({ ...timeSpec, minutes: newMinutes });
        event.preventDefault();
      } else if (event.key === Key_enum.Key.Enter.valueOf()) {
        const newMinutes = getValidInt(minutesText, 0, 59, minutes);
        setMinutesText(newMinutes.toString().padStart(2, "0"));
        updateTimeSpec({ ...timeSpec, minutes: newMinutes });
        event.preventDefault();
      }
    },
    [minutesText, minutes, timeSpec, updateTimeSpec]
  );
  const handleSecondsOnKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === Key_enum.Key.ArrowDown.valueOf()) {
        const newSeconds = seconds === 0 ? 59 : seconds - 1;
        setSecondsText(newSeconds.toString().padStart(2, "0"));
        updateTimeSpec({ ...timeSpec, seconds: newSeconds });
        event.preventDefault();
      } else if (event.key === Key_enum.Key.ArrowUp.valueOf()) {
        const newSeconds = seconds === 59 ? 0 : seconds + 1;
        setSecondsText(newSeconds.toString().padStart(2, "0"));
        updateTimeSpec({ ...timeSpec, seconds: newSeconds });
        event.preventDefault();
      } else if (event.key === Key_enum.Key.Home.valueOf() || event.key === Key_enum.Key.End.valueOf()) {
        const newSeconds = event.key === Key_enum.Key.Home.valueOf() ? 0 : 59;
        setSecondsText(newSeconds.toString().padStart(2, "0"));
        updateTimeSpec({ ...timeSpec, seconds: newSeconds });
        event.preventDefault();
      } else if (event.key === Key_enum.Key.Enter.valueOf()) {
        const newSeconds = getValidInt(secondsText, 0, 59, seconds);
        setSecondsText(newSeconds.toString().padStart(2, "0"));
        updateTimeSpec({ ...timeSpec, seconds: newSeconds });
        event.preventDefault();
      }
    },
    [seconds, secondsText, timeSpec, updateTimeSpec]
  );
  const handleDayPeriodOnKeyDown = reactExports.useCallback(
    (event) => {
      let newPeriodText;
      if (event.key === Key_enum.Key.ArrowDown.valueOf() || event.key === Key_enum.Key.Home.valueOf() || event.key === "a" || event.key === "A") {
        newPeriodText = amLabel;
        event.preventDefault();
      } else if (event.key === Key_enum.Key.ArrowUp.valueOf() || event.key === Key_enum.Key.End.valueOf() || event.key === "p" || event.key === "P") {
        newPeriodText = pmLabel;
        event.preventDefault();
      } else if (event.key === Key_enum.Key.Enter.valueOf()) {
        if (dayPeriodText === "AM" || dayPeriodText === "am" || dayPeriodText === amLabel)
          newPeriodText = amLabel;
        else if (dayPeriodText === "PM" || dayPeriodText === "pm" || dayPeriodText === pmLabel)
          newPeriodText = pmLabel;
        event.preventDefault();
      }
      if (void 0 !== newPeriodText) {
        setDayPeriodText(newPeriodText);
        if (newPeriodText === amLabel && hours > 12) {
          updateTimeSpec({ ...timeSpec, hours: hours - 12 });
        } else if (newPeriodText === pmLabel && hours <= 11) {
          updateTimeSpec({ ...timeSpec, hours: hours + 12 });
        }
      }
    },
    [amLabel, dayPeriodText, hours, pmLabel, timeSpec, updateTimeSpec]
  );
  const showSeconds = -1 !== timeDisplay.search(":ss");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-testid": "components-time-input", className: "components-time", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        className: classnames("components-time-input", "components-input"),
        onKeyDown: handleHoursOnKeyDown,
        onBlur: handleHoursOnBlur,
        onChange: handleHoursChange,
        value: hoursText,
        disabled: readOnly,
        size: "small"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "component-time-separator", children: ":" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        className: classnames("components-time-input", "components-input"),
        onKeyDown: handleMinutesOnKeyDown,
        onBlur: handleMinutesOnBlur,
        onChange: handleMinutesChange,
        value: minutesText,
        disabled: readOnly,
        size: "small"
      }
    ),
    showSeconds && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "component-time-separator", children: ":" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: classnames("components-time-input", "components-input"),
          onKeyDown: handleSecondsOnKeyDown,
          onBlur: handleSecondsOnBlur,
          onChange: handleSecondsChange,
          value: secondsText,
          disabled: readOnly,
          size: "small"
        }
      )
    ] }),
    dayPeriodText && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        className: classnames(
          "components-time-period-input",
          "components-input"
        ),
        onKeyDown: handleDayPeriodOnKeyDown,
        onBlur: handleDayPeriodOnBlur,
        onChange: handleDayPeriodChange,
        value: dayPeriodText,
        disabled: readOnly,
        size: "small"
      }
    )
  ] });
}
try {
  TimeField.displayName = "TimeField";
  TimeField.__docgenInfo = { "description": "Field used to set the Hour:Minutes:Seconds in the [[DatePicker]] Popup panel. The user may key-in the value or use up/down keys to\nchange the time.", "displayName": "TimeField", "props": { "time": { "defaultValue": null, "description": "", "name": "time", "required": true, "type": { "name": "TimeSpec" } }, "timeDisplay": { "defaultValue": null, "description": "", "name": "timeDisplay", "required": true, "type": { "name": "enum", "value": [{ "value": '"hh:mm aa"' }, { "value": '"hh:mm:ss aa"' }, { "value": '"hh:mm"' }, { "value": '"hh:mm:ss"' }] } }, "onTimeChange": { "defaultValue": null, "description": "", "name": "onTimeChange", "required": false, "type": { "name": "((time: TimeSpec) => void)" } }, "readOnly": { "defaultValue": null, "description": "", "name": "readOnly", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function DatePickerPopupButton({
  displayEditField,
  timeDisplay,
  selected,
  onDateChange,
  dateFormatter,
  buttonToolTip,
  fieldStyle,
  fieldClassName,
  style
}) {
  const { translate } = useTranslation();
  const [workingDate, setWorkingDate] = reactExports.useState(
    new Date(selected.getTime())
  );
  const [isSettingsOpen, setIsSettingsOpen] = reactExports.useState(false);
  const toolTipLabel = buttonToolTip ?? translate("datepicker.selectDate");
  reactExports.useEffect(() => {
    const newWorkingDate = new Date(selected.getTime());
    setWorkingDate(newWorkingDate);
  }, [selected]);
  const buttonRef = reactExports.useRef(null);
  const togglePopupDisplay = reactExports.useCallback(
    (event) => {
      event.preventDefault();
      setShowFocusOutline(false);
      setIsSettingsOpen((prev) => !prev);
    },
    [setIsSettingsOpen]
  );
  const handleCloseSetting = reactExports.useCallback(() => {
    setIsSettingsOpen(false);
  }, [setIsSettingsOpen]);
  const handleOnDateChanged = (day) => {
    const newWorkingDate = new Date(day.getTime());
    newWorkingDate.setHours(
      workingDate.getHours(),
      workingDate.getMinutes(),
      workingDate.getSeconds()
    );
    onDateChange && onDateChange(newWorkingDate);
    !timeDisplay && setIsSettingsOpen(false);
  };
  const handleOnTimeChanged = (time2) => {
    const newWorkingDate = new Date(workingDate.getTime());
    newWorkingDate.setHours(time2.hours, time2.minutes, time2.seconds);
    setWorkingDate(newWorkingDate);
    onDateChange && onDateChange(newWorkingDate);
  };
  const [showFocusOutline, setShowFocusOutline] = reactExports.useState(false);
  const handlePopupKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === " ") {
        setShowFocusOutline(true);
        setIsSettingsOpen(true);
      }
    },
    []
  );
  const timeSpec = {
    hours: workingDate.getHours(),
    minutes: workingDate.getMinutes(),
    seconds: workingDate.getSeconds()
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        title: toolTipLabel,
        style,
        className: "components-date-picker-calendar-popup-button",
        onKeyDown: handlePopupKeyDown,
        "data-testid": "components-date-picker-calendar-popup-button",
        onPointerDown: togglePopupDisplay,
        ref: buttonRef,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "datepicker-button", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13,13H9V10h4ZM16,3V15a1,1,0,0,1-1,1H1a1,1,0,0,1-1-1V3A1,1,0,0,1,1,2H3V0H4V2h8V0h1V2h2A1,1,0,0,1,16,3ZM15,6H1v9H15Z" }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Popup,
      {
        isOpen: isSettingsOpen,
        position: RelativePosition.BottomLeft,
        onClose: handleCloseSetting,
        target: buttonRef.current,
        closeOnEnter: false,
        moveFocus: showFocusOutline,
        closeOnNestedPopupOutsideClick: true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "components-date-picker-calendar-popup-panel",
            "data-testid": "components-date-picker-calendar-popup-panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DatePicker,
                {
                  selected: workingDate,
                  onDateChange: handleOnDateChanged,
                  showFocusOutline
                }
              ),
              timeDisplay && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "time-container", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "body", className: "time-label", children: translate("datepicker.time") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TimeField,
                  {
                    time: timeSpec,
                    timeDisplay,
                    onTimeChange: handleOnTimeChanged
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    !!displayEditField && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DateField,
      {
        style: fieldStyle,
        className: fieldClassName,
        initialDate: workingDate,
        timeDisplay,
        dateFormatter,
        onDateChange: handleOnDateChanged
      }
    )
  ] });
}
try {
  DatePickerPopupButton.displayName = "DatePickerPopupButton";
  DatePickerPopupButton.__docgenInfo = { "description": "Component that displays a button used to pick a date and optionally a time.", "displayName": "DatePickerPopupButton", "props": { "selected": { "defaultValue": null, "description": "Date to be shown as the selected date.", "name": "selected", "required": true, "type": { "name": "Date" } }, "displayEditField": { "defaultValue": null, "description": "If true show the date (and optionally time) edit field next to button", "name": "displayEditField", "required": false, "type": { "name": "boolean" } }, "timeDisplay": { "defaultValue": null, "description": "", "name": "timeDisplay", "required": false, "type": { "name": "enum", "value": [{ "value": '"hh:mm aa"' }, { "value": '"hh:mm:ss aa"' }, { "value": '"hh:mm"' }, { "value": '"hh:mm:ss"' }] } }, "onDateChange": { "defaultValue": null, "description": "Function called when Date changes.", "name": "onDateChange", "required": false, "type": { "name": "((day: Date) => void)" } }, "buttonToolTip": { "defaultValue": null, "description": "Optional tooltip", "name": "buttonToolTip", "required": false, "type": { "name": "string" } }, "dateFormatter": { "defaultValue": null, "description": "", "name": "dateFormatter", "required": false, "type": { "name": "DateFormatter" } }, "fieldClassName": { "defaultValue": null, "description": "User defined class name for edit field.", "name": "fieldClassName", "required": false, "type": { "name": "string" } }, "fieldStyle": { "defaultValue": null, "description": "User defined style for edit field.", "name": "fieldStyle", "required": false, "type": { "name": "CSSProperties" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class TextEditor extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this._inputElement = reactExports.createRef();
    this.state = {
      inputValue: "",
      readonly: false
    };
    this._updateInputValue = (e) => {
      if (this._isMounted)
        this.setState(
          {
            inputValue: e.target.value
          },
          async () => {
            if (this.props.shouldCommitOnChange && this.props.onCommit && this.props.propertyRecord) {
              const newValue = await this.getPropertyValue();
              if (newValue)
                this.props.onCommit({
                  propertyRecord: this.props.propertyRecord,
                  newValue
                });
            }
          }
        );
    };
  }
  async getPropertyValue() {
    var _a3;
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = await TypeConverterManager.getConverter(
        record.property.typename,
        (_a3 = record.property.converter) == null ? void 0 : _a3.name
      ).convertFromStringToPropertyValue(this.state.inputValue, record);
      propertyValue.displayValue = this.state.inputValue;
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._inputElement.current;
  }
  get hasFocus() {
    return document.activeElement === this._inputElement.current;
  }
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  async setStateFromProps() {
    var _a3;
    const record = this.props.propertyRecord;
    let initialValue = "";
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      const value = record.value.value;
      initialValue = await TypeConverterManager.getConverter(
        record.property.typename,
        (_a3 = record.property.converter) == null ? void 0 : _a3.name
      ).convertPropertyToString(record.property, value);
    }
    const readonly = record && void 0 !== record.isReadonly ? record.isReadonly : false;
    let size;
    let maxLength;
    let iconSpec;
    const isDisabled = record ? record.isDisabled : void 0;
    if (record && record.property && record.property.editor && record.property.editor.params) {
      const editorSizeParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.InputEditorSize.valueOf()
      );
      if (editorSizeParams) {
        if (editorSizeParams.size)
          size = editorSizeParams.size;
        if (editorSizeParams.maxLength)
          maxLength = editorSizeParams.maxLength;
      }
      const iconParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.Icon.valueOf()
      );
      if (iconParams) {
        iconSpec = iconParams.definition.iconSpec;
      }
    }
    if (this._isMounted)
      this.setState({
        inputValue: initialValue,
        readonly,
        size,
        maxLength,
        isDisabled,
        iconSpec
      });
  }
  render() {
    var _a3;
    const className = classnames(
      "components-cell-editor",
      "components-text-editor",
      this.props.className
    );
    const minSize = this.state.size ? this.state.size : 8;
    const minWidthStyle = {
      minWidth: `${minSize * 0.75}em`
    };
    const inputProps = {
      type: "text",
      className,
      style: this.props.style ? this.props.style : minWidthStyle,
      readOnly: this.state.readonly,
      disabled: this.state.isDisabled,
      maxLength: this.state.maxLength,
      value: this.state.inputValue,
      onBlur: this.props.onBlur,
      onChange: this._updateInputValue,
      autoFocus: this.props.setFocus && !this.state.isDisabled
    };
    inputProps["aria-label"] = UiComponents$1.translate("editor.text");
    let reactNode;
    if (this.state.iconSpec) {
      const icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: this.state.iconSpec });
      reactNode = // eslint-disable-next-line deprecation/deprecation
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconInput,
        {
          ...inputProps,
          ref: this._inputElement,
          icon,
          "data-testid": "components-text-editor"
        }
      );
    } else {
      reactNode = /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          ...inputProps,
          ref: this._inputElement,
          "data-testid": "components-text-editor",
          size: "small",
          id: (_a3 = this.props.propertyRecord) == null ? void 0 : _a3.property.name
        }
      );
    }
    return reactNode;
  }
}
try {
  TextEditor.displayName = "TextEditor";
  TextEditor.__docgenInfo = { "description": "TextEditor React component that is a property editor with text input", "displayName": "TextEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class PropertyEditorBase {
  constructor() {
    this.customDataController = void 0;
  }
  get containerHandlesBlur() {
    return true;
  }
  get containerHandlesEscape() {
    return true;
  }
  get containerHandlesEnter() {
    return true;
  }
  get containerHandlesTab() {
    return true;
  }
  get containerStopsKeydownPropagation() {
    return true;
  }
  applyEditorParams(_property, _record) {
  }
  async commitValue(newValue, record) {
    if (this.customDataController)
      return this.customDataController.commitValue(newValue, record);
    return { encounteredError: false };
  }
  async validateValue(newValue, record) {
    if (this.customDataController)
      return this.customDataController.validateValue(newValue, record);
    return { encounteredError: false };
  }
}
class DataControllerBase {
  async commitValue(_newValue, _record) {
    return { encounteredError: false };
  }
  async validateValue(_newValue, _record) {
    return { encounteredError: false };
  }
}
const _PropertyEditorManager = class _PropertyEditorManager {
  static registerEditor(editType, editor2, editorName) {
    const fullEditorName = _PropertyEditorManager.getFullEditorName(
      editType,
      editorName
    );
    if (_PropertyEditorManager._editors.hasOwnProperty(fullEditorName)) {
      const nameOfEditor = _PropertyEditorManager._editors[fullEditorName].name;
      throw Error(
        `PropertyEditorManager.registerEditor error: type '${fullEditorName}' already registered to '${nameOfEditor}'`
      );
    }
    _PropertyEditorManager._editors[fullEditorName] = editor2;
  }
  static getFullEditorName(editType, editorName) {
    let fullEditorName = editType;
    if (editorName)
      fullEditorName += `:${editorName}`;
    return fullEditorName;
  }
  static registerDataController(controllerName, controller) {
    if (_PropertyEditorManager._dataControllers.hasOwnProperty(controllerName)) {
      throw Error(
        `PropertyEditorManager.registerDataController error: type '${controllerName}' already registered to '${(typeof _PropertyEditorManager._dataControllers[controllerName]).toString()}'`
      );
    }
    _PropertyEditorManager._dataControllers[controllerName] = controller;
  }
  /** @internal */
  static deregisterDataController(controllerName) {
    if (_PropertyEditorManager._dataControllers.hasOwnProperty(controllerName)) {
      delete _PropertyEditorManager._dataControllers[controllerName];
    }
  }
  static createEditor(editType, editorName, dataControllerName) {
    const fullEditorName = _PropertyEditorManager.getFullEditorName(
      editType,
      editorName
    );
    let editor2;
    if (_PropertyEditorManager._editors.hasOwnProperty(fullEditorName))
      editor2 = new _PropertyEditorManager._editors[fullEditorName]();
    else if (_PropertyEditorManager._editors.hasOwnProperty(editType))
      editor2 = new _PropertyEditorManager._editors[editType]();
    else
      editor2 = new BasicPropertyEditor();
    if (dataControllerName) {
      if (_PropertyEditorManager._dataControllers.hasOwnProperty(
        dataControllerName
      ))
        editor2.customDataController = new _PropertyEditorManager._dataControllers[dataControllerName]();
      else
        throw Error(
          `PropertyEditorManager.createEditor error: data controller '${dataControllerName}' is not registered`
        );
    }
    return editor2;
  }
  static hasCustomEditor(editType, editorName) {
    const fullEditorName = _PropertyEditorManager.getFullEditorName(
      editType,
      editorName
    );
    return _PropertyEditorManager._editors.hasOwnProperty(fullEditorName);
  }
};
_PropertyEditorManager._editors = {};
_PropertyEditorManager._dataControllers = {};
let PropertyEditorManager = _PropertyEditorManager;
class BasicPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TextEditor, {});
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Text,
  BasicPropertyEditor
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.String,
  BasicPropertyEditor
);
try {
  PropertyEditorBase.displayName = "PropertyEditorBase";
  PropertyEditorBase.__docgenInfo = { "description": "PropertyEditor is the base class for all property editors.", "displayName": "PropertyEditorBase", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  DataControllerBase.displayName = "DataControllerBase";
  DataControllerBase.__docgenInfo = { "description": "DataControllerBase is the base class for all Data Controllers.", "displayName": "DataControllerBase", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PropertyEditorManager.displayName = "PropertyEditorManager";
  PropertyEditorManager.__docgenInfo = { "description": "Manages Property Editors. Property Editors are registered with and created by the manager.", "displayName": "PropertyEditorManager", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  BasicPropertyEditor.displayName = "BasicPropertyEditor";
  BasicPropertyEditor.__docgenInfo = { "description": 'Basic Property Editor registered for the "text" and "string" type names.\nIt uses the [[TextEditor]] React component.', "displayName": "BasicPropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class BooleanEditor extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this._inputElement = reactExports.createRef();
    this.state = {
      checkboxValue: false,
      isDisabled: false
    };
    this._updateCheckboxValue = (e) => {
      if (this._isMounted) {
        const checkboxValue = !!e.target.checked;
        this.setState(
          {
            checkboxValue
          },
          () => {
            if (this.props.propertyRecord && this.props.onCommit) {
              const propertyValue = this.getPropertyValueSync();
              if (propertyValue !== void 0) {
                this.props.onCommit({
                  propertyRecord: this.props.propertyRecord,
                  newValue: propertyValue
                });
              }
            }
          }
        );
      }
    };
  }
  async getPropertyValue() {
    return this.getPropertyValueSync();
  }
  getPropertyValueSync() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.checkboxValue,
        displayValue: ""
      };
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._inputElement.current;
  }
  get hasFocus() {
    return document.activeElement === this._inputElement.current;
  }
  componentDidMount() {
    this._isMounted = true;
    this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      this.setStateFromProps();
    }
  }
  setStateFromProps() {
    const { propertyRecord } = this.props;
    let checkboxValue = false;
    let isDisabled = false;
    if (propertyRecord && propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
      const primitiveValue = propertyRecord.value.value;
      checkboxValue = primitiveValue;
    }
    if (propertyRecord && propertyRecord.isDisabled)
      isDisabled = propertyRecord.isDisabled;
    if (this._isMounted)
      this.setState({ checkboxValue, isDisabled });
  }
  render() {
    const className = classnames(
      "components-cell-editor",
      "components-boolean-editor",
      this.props.className
    );
    const checked = this.state.checkboxValue;
    const isDisabled = !!this.state.isDisabled;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Checkbox,
      {
        ref: this._inputElement,
        onBlur: this.props.onBlur,
        className,
        style: this.props.style,
        checked,
        onChange: this._updateCheckboxValue,
        autoFocus: this.props.setFocus,
        disabled: isDisabled,
        "data-testid": "components-checkbox-editor"
      }
    );
  }
}
class BooleanPropertyEditor extends PropertyEditorBase {
  get containerHandlesBlur() {
    return false;
  }
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BooleanEditor, {});
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Bool,
  BooleanPropertyEditor
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Boolean,
  BooleanPropertyEditor
);
try {
  BooleanEditor.displayName = "BooleanEditor";
  BooleanEditor.__docgenInfo = { "description": "BooleanEditor React component that is a property editor with checkbox input", "displayName": "BooleanEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  BooleanPropertyEditor.displayName = "BooleanPropertyEditor";
  BooleanPropertyEditor.__docgenInfo = { "description": 'Boolean Property Editor registered for the "bool" and "boolean" type names.\nIt uses the [[BooleanEditor]] React component.', "displayName": "BooleanPropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class CustomNumberEditor extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this._inputElement = reactExports.createRef();
    this.state = {
      inputValue: ""
    };
    this._updateInputValue = (e) => {
      this._applyUpdatedValue(e.target.value);
    };
    this._onKeyPress = (e) => {
      if (e.key === Key_enum.Key.Escape.valueOf()) {
        const initialDisplayValue = (this._lastValidValue && this._lastValidValue.displayValue) ?? this._getInitialDisplayValue();
        if (initialDisplayValue !== this.state.inputValue) {
          e.preventDefault();
          e.stopPropagation();
          this._resetToLastValidDisplayValue();
        } else {
          if (this.props.onCancel)
            this.props.onCancel();
        }
      }
      if (e.key !== Key_enum.Key.Enter.valueOf()) {
        UiAdmin.messagePresenter.closeInputFieldMessage();
      }
    };
    this._onFocus = (e) => {
      e.target.select();
    };
  }
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record.isReadonly) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: record.value.value,
        displayValue: record.value.displayValue
      };
    }
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      const parseResults = this._formatParams.parseFunction(this.state.inputValue);
      if (!parseResults.parseError && void 0 !== parseResults.value) {
        const newDisplayValue = this._formatParams.formatFunction(parseResults.value);
        propertyValue = {
          valueFormat: PropertyValueFormat.Primitive,
          value: parseResults.value,
          displayValue: newDisplayValue
        };
        this._lastValidValue = { ...propertyValue };
        if (newDisplayValue !== this.state.inputValue) {
          this.setState({ inputValue: newDisplayValue });
        }
      } else {
        if (this.htmlElement) {
          UiAdmin.messagePresenter.displayInputFieldMessage(
            this.htmlElement,
            MessageSeverity.Error,
            parseResults.parseError ? parseResults.parseError : UiComponents$1.translate("errors.unable-to-parse-quantity")
          );
          this.htmlElement.focus();
        } else {
          UiAdmin.messagePresenter.displayMessage(
            MessageSeverity.Error,
            parseResults.parseError ? parseResults.parseError : UiComponents$1.translate("errors.unable-to-parse-quantity")
          );
        }
        const displayValue = record.value.displayValue && record.value.displayValue.length > 0 ? record.value.displayValue : this._formatParams.formatFunction(record.value.value);
        propertyValue = this._lastValidValue ? { ...this._lastValidValue } : {
          valueFormat: PropertyValueFormat.Primitive,
          value: record.value.value,
          displayValue
        };
      }
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._inputElement.current;
  }
  get hasFocus() {
    return document.activeElement === this._inputElement.current;
  }
  shouldSetFocus() {
    if (!this.props.setFocus)
      return false;
    const record = this.props.propertyRecord;
    const disabled = record && !record.isDisabled ? false : true;
    const readonly = record && !record.isReadonly ? false : true;
    return !disabled && !readonly;
  }
  _applyUpdatedValue(userInput) {
    const record = this.props.propertyRecord;
    const readonly = record && !record.isReadonly ? false : true;
    const disabled = record && !record.isDisabled ? false : true;
    if (readonly || disabled)
      return;
    if (this._isMounted)
      this.setState({
        inputValue: userInput
      });
  }
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  _getInitialDisplayValue() {
    const record = this.props.propertyRecord;
    let initialDisplayValue = "";
    let numberValue = 0;
    if (record) {
      if (record.value.valueFormat === PropertyValueFormat.Primitive) {
        const primitiveValue = record.value;
        numberValue = void 0 !== primitiveValue.value ? primitiveValue.value : 0;
        if (primitiveValue.displayValue)
          initialDisplayValue = primitiveValue.displayValue;
        else
          initialDisplayValue = this._formatParams.formatFunction(numberValue);
      }
    }
    return initialDisplayValue;
  }
  async setStateFromProps() {
    const record = this.props.propertyRecord;
    if (!record || !record.property) {
      Logger.logError(
        UiComponents$1.loggerCategory(this),
        "PropertyRecord must be defined to use CustomNumberPropertyEditor"
      );
      return;
    }
    if (record.property && record.property.editor && record.property.editor.params) {
      this._formatParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.CustomFormattedNumber.valueOf()
      );
    }
    if (!this._formatParams) {
      Logger.logError(
        UiComponents$1.loggerCategory(this),
        `CustomFormattedNumberParams must be defined for property ${record.property.name}`
      );
      return;
    }
    const initialDisplayValue = this._getInitialDisplayValue();
    this._lastValidValue = {
      valueFormat: PropertyValueFormat.Primitive,
      value: record.value.value,
      displayValue: initialDisplayValue
    };
    let size;
    let maxLength;
    let iconSpec;
    if (record.property && record.property.editor && record.property.editor.params) {
      const editorSizeParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.InputEditorSize.valueOf()
      );
      if (editorSizeParams) {
        if (editorSizeParams.size)
          size = editorSizeParams.size;
        if (editorSizeParams.maxLength)
          maxLength = editorSizeParams.maxLength;
      }
      const iconParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.Icon.valueOf()
      );
      if (iconParams) {
        iconSpec = iconParams.definition.iconSpec;
      }
    }
    if (this._isMounted)
      this.setState({
        inputValue: initialDisplayValue,
        size,
        maxLength,
        iconSpec
      });
  }
  _resetToLastValidDisplayValue() {
    const initialDisplayValue = (this._lastValidValue && this._lastValidValue.displayValue) ?? this._getInitialDisplayValue();
    this.setState({ inputValue: initialDisplayValue });
  }
  render() {
    var _a3;
    const minSize = this.state.size ? this.state.size : 8;
    const minWidthStyle = {
      minWidth: `${minSize * 0.75}em`
    };
    const record = this.props.propertyRecord;
    if (!record || !this._formatParams)
      return null;
    const readOnly = !record.isReadonly ? false : true;
    const disabled = !record.isDisabled ? false : true;
    const className = classnames(
      "components-cell-editor",
      "components-customnumber-editor",
      this.props.className
    );
    const inputProps = {
      className,
      style: this.props.style ? this.props.style : minWidthStyle,
      readOnly,
      disabled,
      maxLength: this.state.maxLength,
      value: this.state.inputValue,
      onChange: this._updateInputValue,
      onBlur: this.props.onBlur,
      onFocus: this._onFocus,
      autoFocus: this.shouldSetFocus(),
      onKeyDown: this._onKeyPress
    };
    let reactNode;
    if (this.state.iconSpec) {
      const icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: this.state.iconSpec });
      reactNode = // eslint-disable-next-line deprecation/deprecation
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconInput,
        {
          ...inputProps,
          ref: this._inputElement,
          icon,
          "data-testid": "components-customnumber-editor"
        }
      );
    } else {
      reactNode = /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          ...inputProps,
          ref: this._inputElement,
          "data-testid": "components-customnumber-editor",
          size: "small",
          id: (_a3 = this.props.propertyRecord) == null ? void 0 : _a3.property.name
        }
      );
    }
    return reactNode;
  }
}
class CustomNumberPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomNumberEditor, {});
  }
  get containerHandlesEscape() {
    return false;
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Number,
  CustomNumberPropertyEditor,
  StandardEditorNames.NumberCustom
);
try {
  CustomNumberEditor.displayName = "CustomNumberEditor";
  CustomNumberEditor.__docgenInfo = { "description": "CustomNumberEditor is a React component that is a property editor for numbers that specify custom formatting and parsing functions.", "displayName": "CustomNumberEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  CustomNumberPropertyEditor.displayName = "CustomNumberPropertyEditor";
  CustomNumberPropertyEditor.__docgenInfo = { "description": 'Custom Property Editor registered for the "number" type name and the "number-custom" editor name.\nIt uses the [[CustomNumberEditor]] React component.', "displayName": "CustomNumberPropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class PopupButton extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._buttonRef = reactExports.createRef();
    this.state = {
      showPopup: false
    };
    this._togglePopup = (event) => {
      this.setState(
        (prevState) => ({ showPopup: !prevState.showPopup }),
        () => this.props.onClick && this.props.onClick(event)
      );
    };
    this._closePopup = () => {
      this.setState({ showPopup: false }, () => {
        this.props.onClose && this.props.onClose();
        if (this._buttonRef.current)
          this._buttonRef.current.focus();
      });
    };
    this._handleKeyDown = (event) => {
      if ((event.key === Key_enum.Key.ArrowDown.valueOf() || event.key === " " || event.key === Key_enum.Key.Enter.valueOf()) && !this.state.showPopup) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showPopup: true });
      }
    };
  }
  componentDidMount() {
    if (this.props.setFocus && this._buttonRef.current)
      this._buttonRef.current.focus();
  }
  closePopup() {
    this._closePopup();
  }
  render() {
    var _a3;
    const showArrow = this.props.showArrow ?? false;
    const showShadow = this.props.showShadow ?? false;
    const moveFocus = this.props.moveFocus ?? true;
    const showPlaceholder = this.props.label === void 0 && this.props.placeholder !== void 0;
    const classNames = classnames(
      "components-popup-button",
      this.state.showPopup && "components-popup-expanded"
    );
    const valueClassNames = classnames(
      "components-popup-button-value",
      showPlaceholder && "components-popup-button-placeholder"
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: this.props.className, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: classNames,
          onClick: this._togglePopup,
          onKeyDown: this._handleKeyDown,
          "data-testid": "components-popup-button",
          tabIndex: 0,
          ref: this._buttonRef,
          title: this.props.title,
          role: "button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: valueClassNames, children: this.props.label || this.props.placeholder }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-popup-button-arrow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: classnames(
                  "components-popup-button-arrow-icon",
                  "icon"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgChevronDown, {}) })
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Popup,
        {
          className: "components-popup-button-popup",
          isOpen: this.state.showPopup,
          position: RelativePosition.Bottom,
          onClose: this._closePopup,
          onEnter: this.props.onEnter,
          closeOnEnter: this.props.closeOnEnter,
          target: this._buttonRef.current,
          showArrow,
          showShadow,
          moveFocus,
          focusTarget: this.props.focusTarget,
          portalTarget: ((_a3 = this._buttonRef.current) == null ? void 0 : _a3.ownerDocument.querySelector(
            ".uifw-configurableui-portalContainer"
          )) ?? void 0,
          children: this.props.children
        }
      )
    ] });
  }
}
function PopupContent(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Div, { ...props, mainClassName: "components-editor-popup-content" });
}
function PopupOkCancelButtons(props) {
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "components-popup-bottom-buttons", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: classnames(
          "components-popup-large-button",
          "components-popup-ok-button"
        ),
        "data-testid": "components-popup-ok-button",
        styleType: "cta",
        title: translate("dialog.ok"),
        onClick: props.onOk,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgCheckmark, {}) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: classnames(
          "components-popup-large-button",
          "components-popup-cancel-button"
        ),
        "data-testid": "components-popup-cancel-button",
        title: translate("dialog.cancel"),
        onClick: props.onCancel,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgRemove, {}) })
      }
    )
  ] });
}
try {
  PopupContent.displayName = "PopupContent";
  PopupContent.__docgenInfo = { "description": "Popup content with padding", "displayName": "PopupContent", "props": { "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PopupOkCancelButtons.displayName = "PopupOkCancelButtons";
  PopupOkCancelButtons.__docgenInfo = { "description": "OK/Cancel Buttons", "displayName": "PopupOkCancelButtons", "props": { "onOk": { "defaultValue": null, "description": "", "name": "onOk", "required": true, "type": { "name": "(event: MouseEvent<Element, MouseEvent>) => void" } }, "onCancel": { "defaultValue": null, "description": "", "name": "onCancel", "required": true, "type": { "name": "(event: MouseEvent<Element, MouseEvent>) => void" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PopupButton.displayName = "PopupButton";
  PopupButton.__docgenInfo = { "description": "PopupButton React component that is a button and property editor popup host", "displayName": "PopupButton", "props": { "label": { "defaultValue": null, "description": "Label to display in click area.", "name": "label", "required": false, "type": { "name": "ReactNode" } }, "placeholder": { "defaultValue": null, "description": "", "name": "placeholder", "required": false, "type": { "name": "string" } }, "children": { "defaultValue": null, "description": "Contents of the popup", "name": "children", "required": true, "type": { "name": "ReactNode" } }, "title": { "defaultValue": null, "description": "Title to display as tooltip.", "name": "title", "required": false, "type": { "name": "string" } }, "moveFocus": { "defaultValue": null, "description": "Set focus to popup - default is to set focus", "name": "moveFocus", "required": false, "type": { "name": "boolean" } }, "focusTarget": { "defaultValue": null, "description": "Element to receive focus, specified by React.RefObject or CSS selector string. If undefined and moveFocus is true then focus is moved to first focusable element.", "name": "focusTarget", "required": false, "type": { "name": "string | RefObject<HTMLElement>" } }, "showShadow": { "defaultValue": null, "description": "Show or hide the box shadow (defaults to false)", "name": "showShadow", "required": false, "type": { "name": "boolean" } }, "showArrow": { "defaultValue": null, "description": "Show or hide the arrow (defaults to false)", "name": "showArrow", "required": false, "type": { "name": "boolean" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether to set focus to the input element", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "closeOnEnter": { "defaultValue": null, "description": "Indicates whether to close the popup when Enter is pressed (defaults to true)", "name": "closeOnEnter", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Listens for click events on button area", "name": "onClick", "required": false, "type": { "name": "((event: MouseEvent<Element, MouseEvent>) => void)" } }, "onClose": { "defaultValue": null, "description": "Listens for popup close events", "name": "onClose", "required": false, "type": { "name": "(() => void)" } }, "onEnter": { "defaultValue": null, "description": "Listens for Enter key in popup", "name": "onEnter", "required": false, "type": { "name": "(() => void)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class DateTimeEditor extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this._enterKey = false;
    this._divElement = reactExports.createRef();
    this.state = {
      value: /* @__PURE__ */ new Date(),
      editInUtc: false
    };
    this._handleChange = (newValue) => {
      if (this._isMounted && this.state.typeConverter) {
        if (this.state.editInUtc) {
          newValue = adjustDateToTimezone(
            newValue,
            newValue.getTimezoneOffset() * -1
          );
        }
        void this.processDateChange(this.state.typeConverter, newValue);
      }
    };
    this._handleTimeChange = (time2) => {
      if (this.state.editInUtc) {
        const newWorkingDate = adjustDateToTimezone(this.state.value, 0);
        newWorkingDate.setUTCHours(time2.hours, time2.minutes, time2.seconds);
        this._handleChange(newWorkingDate);
      } else {
        const newWorkingDate = new Date(this.state.value.getTime());
        newWorkingDate.setHours(time2.hours, time2.minutes, time2.seconds);
        this._handleChange(newWorkingDate);
      }
    };
    this._handleEnter = async () => {
      this._enterKey = true;
      await this._handleCommit();
    };
    this._handleClose = async () => {
      if (this._enterKey) {
        this._enterKey = false;
      } else {
        if (this.props.onCancel)
          this.props.onCancel();
      }
    };
    this._handleOk = async (_event) => {
      await this._handleCommit();
    };
    this._handleCancel = (_event) => {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    };
    this._handleCommit = async () => {
      if (this.props.propertyRecord && this.props.onCommit) {
        const propertyValue = await this.getPropertyValue();
        if (propertyValue !== void 0) {
          this.props.onCommit({
            propertyRecord: this.props.propertyRecord,
            newValue: propertyValue
          });
        }
      }
    };
  }
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.value,
        displayValue: this.state.displayValue
      };
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._divElement.current;
  }
  get hasFocus() {
    let containsFocus = false;
    if (this.htmlElement)
      containsFocus = this.htmlElement.contains(document.activeElement);
    return containsFocus;
  }
  async processDateChange(typeConverter, newValue) {
    if (this.props.propertyRecord) {
      const displayValue = await typeConverter.convertPropertyToString(
        this.props.propertyRecord.property,
        newValue
      );
      this.setState({
        value: newValue,
        displayValue
      });
    }
  }
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  async setStateFromProps() {
    var _a3, _b2;
    const record = this.props.propertyRecord;
    let initialValue;
    let typeConverter;
    let timeDisplay;
    let alternateDateFormat = AlternateDateFormats.None;
    let editInUtc = false;
    if (this.props.showTime)
      timeDisplay = TimeDisplay.H12MC;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      if (record.value.value instanceof Date)
        initialValue = new Date(record.value.value);
      else if (typeof record.value.value === "string")
        initialValue = new Date(record.value.value);
      else if (record.value.value === void 0)
        initialValue = /* @__PURE__ */ new Date();
      typeConverter = TypeConverterManager.getConverter(
        record.property.typename,
        (_a3 = record.property.converter) == null ? void 0 : _a3.name
      );
      const options = (_b2 = record.property.converter) == null ? void 0 : _b2.options;
      if (options) {
        if ("alternateDateFormat" in options) {
          if (DateTimeTypeConverterBase.isAlternateDateFormats(
            options.alternateDateFormat
          )) {
            timeDisplay = TimeDisplay.H24MS;
            alternateDateFormat = options.alternateDateFormat;
          }
        }
        if ("timeDisplay" in options && this.props.showTime) {
          timeDisplay = options.timeDisplay;
          if (alternateDateFormat && timeDisplay !== TimeDisplay.H24MS && timeDisplay !== TimeDisplay.H24M)
            timeDisplay = TimeDisplay.H24MS;
        }
        if (alternateDateFormat) {
          editInUtc = true;
          if (this.props.showTime) {
            if (alternateDateFormat === AlternateDateFormats.IsoShort) {
              alternateDateFormat = AlternateDateFormats.IsoDateTime;
            }
            if (alternateDateFormat === AlternateDateFormats.UtcShort) {
              alternateDateFormat = AlternateDateFormats.UtcDateTime;
            }
            if (alternateDateFormat === AlternateDateFormats.UtcShortWithDay) {
              alternateDateFormat = AlternateDateFormats.UtcDateTimeWithDay;
            }
          } else {
            timeDisplay = void 0;
            if (alternateDateFormat === AlternateDateFormats.IsoDateTime)
              alternateDateFormat = AlternateDateFormats.IsoShort;
            if (alternateDateFormat === AlternateDateFormats.UtcDateTime)
              alternateDateFormat = AlternateDateFormats.UtcShort;
            if (alternateDateFormat === AlternateDateFormats.UtcDateTimeWithDay)
              alternateDateFormat = AlternateDateFormats.UtcShortWithDay;
          }
        }
      }
    }
    if (!initialValue) {
      throw new Error("Bad Value");
    }
    if (!typeConverter) {
      throw new Error("Unable to determine TypeConverter");
    }
    const isDisabled = record && !!record.isDisabled;
    const displayValue = await typeConverter.convertPropertyToString(
      record.property,
      initialValue
    );
    if (this._isMounted)
      this.setState({
        value: initialValue,
        isDisabled,
        timeDisplay,
        typeConverter,
        displayValue,
        editInUtc
      });
  }
  render() {
    const date = this.state.editInUtc ? adjustDateToTimezone(this.state.value, 0) : this.state.value;
    const timeSpec = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    };
    const className = classnames(
      "components-cell-editor",
      "components-datetime-editor",
      this.props.className
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, ref: this._divElement, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopupButton,
      {
        label: this.state.displayValue,
        onClose: this._handleClose,
        onEnter: this._handleEnter,
        setFocus: this.props.setFocus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PopupContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "components-date-picker-calendar-popup-panel",
              "data-testid": "components-date-picker-calendar-popup-panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DatePicker,
                  {
                    selected: date,
                    onDateChange: this._handleChange,
                    showFocusOutline: false
                  }
                ),
                this.state.timeDisplay && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "time-container", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { variant: "body", className: "time-label", children: "Time" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TimeField,
                    {
                      time: timeSpec,
                      timeDisplay: this.state.timeDisplay,
                      onTimeChange: this._handleTimeChange
                    }
                  )
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PopupOkCancelButtons,
            {
              onOk: this._handleOk,
              onCancel: this._handleCancel
            }
          )
        ] })
      }
    ) });
  }
}
class ShortDateTimePropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DateTimeEditor, { showTime: false });
  }
  get containerHandlesTab() {
    return false;
  }
}
class DateTimePropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DateTimeEditor, { showTime: true });
  }
  get containerHandlesTab() {
    return false;
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.ShortDate,
  ShortDateTimePropertyEditor
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.DateTime,
  DateTimePropertyEditor
);
try {
  DateTimeEditor.displayName = "DateTimeEditor";
  DateTimeEditor.__docgenInfo = { "description": "DateTimeEditor React component that is a property editor for selection of date and time.", "displayName": "DateTimeEditor", "props": { "showTime": { "defaultValue": null, "description": "", "name": "showTime", "required": false, "type": { "name": "boolean" } }, "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ShortDateTimePropertyEditor.displayName = "ShortDateTimePropertyEditor";
  ShortDateTimePropertyEditor.__docgenInfo = { "description": 'DateTime Property Editor registered for the "number" type name and "DateTime" editor name.\nIt uses the [[DateTimeEditor]] React component.', "displayName": "ShortDateTimePropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  DateTimePropertyEditor.displayName = "DateTimePropertyEditor";
  DateTimePropertyEditor.__docgenInfo = { "description": 'DateTime Property Editor registered for the "number" type name and "DateTime" editor name.\nIt uses the [[DateTimeEditor]] React component.', "displayName": "DateTimePropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function EditorContainer(props) {
  const {
    ignoreEditorBlur,
    title,
    shouldCommitOnChange,
    propertyRecord,
    setFocus,
    onCommit,
    onCancel,
    ...rest
  } = props;
  const editorRef = reactExports.useRef();
  const propertyEditorRef = reactExports.useRef();
  const handleClick2 = (e) => e.stopPropagation();
  const handleContainerBlur = (e) => e.stopPropagation();
  const handleEditorCommit = (args) => void commit(args);
  const handleContainerCommit = async () => {
    var _a3;
    const newValue = editorRef && await ((_a3 = editorRef.current) == null ? void 0 : _a3.getPropertyValue());
    if (newValue === void 0)
      return;
    void commit({
      propertyRecord,
      newValue
    });
  };
  const onPressEscape = (e) => {
    var _a3;
    if (!((_a3 = propertyEditorRef.current) == null ? void 0 : _a3.containerHandlesEscape))
      return;
    e.stopPropagation();
    onCancel();
  };
  const onPressEnter = (e) => {
    var _a3, _b2;
    if (!((_a3 = propertyEditorRef.current) == null ? void 0 : _a3.containerHandlesEnter))
      return;
    if ((_b2 = editorRef == null ? void 0 : editorRef.current) == null ? void 0 : _b2.hasFocus)
      e.stopPropagation();
    void handleContainerCommit();
  };
  const onPressTab = (e) => {
    var _a3;
    if (!((_a3 = propertyEditorRef.current) == null ? void 0 : _a3.containerHandlesTab))
      return;
    e.stopPropagation();
    e.preventDefault();
    void handleContainerCommit();
  };
  const handleKeyDown = (e) => {
    var _a3;
    switch (e.key) {
      case Key_enum.Key.Escape.valueOf():
        onPressEscape(e);
        break;
      case Key_enum.Key.Enter.valueOf():
        onPressEnter(e);
        break;
      case Key_enum.Key.Tab.valueOf():
        onPressTab(e);
        break;
      default:
        if ((_a3 = propertyEditorRef.current) == null ? void 0 : _a3.containerStopsKeydownPropagation)
          e.stopPropagation();
    }
  };
  const handleEditorBlur = () => {
    var _a3;
    if (ignoreEditorBlur)
      return;
    if (!((_a3 = propertyEditorRef.current) == null ? void 0 : _a3.containerHandlesBlur))
      return;
    void handleContainerCommit();
  };
  const isNewValueValid = async (value) => {
    if (!propertyEditorRef.current)
      return false;
    if (!propertyRecord)
      return false;
    const validateResult = await propertyEditorRef.current.validateValue(
      value,
      propertyRecord
    );
    if (validateResult.encounteredError) {
      displayOutputMessage(validateResult.errorMessage);
      return false;
    }
    return true;
  };
  const displayOutputMessage = (errorMessage) => {
    var _a3;
    if (!errorMessage)
      return;
    if (!editorRef)
      return;
    const htmlElement = (_a3 = editorRef.current) == null ? void 0 : _a3.htmlElement;
    if (htmlElement)
      UiAdmin.messagePresenter.displayInputFieldMessage(
        htmlElement,
        errorMessage.severity,
        errorMessage.briefMessage,
        errorMessage.detailedMessage
      );
    else
      UiAdmin.messagePresenter.displayMessage(
        errorMessage.severity,
        errorMessage.briefMessage,
        errorMessage.detailedMessage,
        errorMessage.messageType
      );
  };
  const commit = async (args) => {
    const oldValue = args.propertyRecord.value;
    const newValue = args.newValue;
    if (!shouldCommit(oldValue, newValue)) {
      return;
    }
    const isValid = await isNewValueValid(newValue);
    if (!isValid)
      return;
    if (propertyEditorRef.current && args.propertyRecord) {
      const commitResult = await propertyEditorRef.current.commitValue(
        newValue,
        args.propertyRecord
      );
      if (commitResult.encounteredError) {
        displayOutputMessage(commitResult.errorMessage);
        return;
      }
    }
    onCommit(args);
  };
  const editorProps = {
    ref: (ref) => {
      editorRef.current = ref ?? void 0;
    },
    onCommit: handleEditorCommit,
    onCancel,
    onBlur: handleEditorBlur,
    setFocus: setFocus !== void 0 ? setFocus : true,
    propertyRecord,
    shouldCommitOnChange,
    ...rest
  };
  const propDescription = propertyRecord.property;
  const editorName = propDescription.editor !== void 0 ? propDescription.editor.name : void 0;
  propertyEditorRef.current = PropertyEditorManager.createEditor(
    propDescription.typename,
    editorName,
    propDescription.dataController
  );
  const clonedNode = reactExports.isValidElement(propertyEditorRef.current.reactNode) ? reactExports.cloneElement(propertyEditorRef.current.reactNode, editorProps) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "components-editor-container",
      onBlur: handleContainerBlur,
      onKeyDown: handleKeyDown,
      onClick: handleClick2,
      onContextMenu: handleClick2,
      title,
      "data-testid": "editor-container",
      role: "presentation",
      children: clonedNode
    }
  );
}
function arePrimitiveValuesEqual(oldValue, newValue) {
  if (typeof oldValue !== typeof newValue) {
    return false;
  }
  if (typeof newValue !== "object" || newValue instanceof Date) {
    return newValue === oldValue;
  }
  if (newValue instanceof Array) {
    if (!(oldValue instanceof Array)) {
      return false;
    }
    if (newValue.length !== oldValue.length) {
      return false;
    }
    for (let i = 0; i < newValue.length; i++) {
      if (oldValue[i] !== newValue[i]) {
        return false;
      }
    }
    return true;
  }
  if ("x" in newValue) {
    if (typeof oldValue !== "object" || !("x" in oldValue)) {
      return false;
    }
    if ("z" in newValue) {
      if (!("z" in oldValue)) {
        return false;
      }
      return newValue.x === oldValue.x && newValue.y === oldValue.y && newValue.z === oldValue.z;
    } else if ("z" in oldValue) {
      return false;
    }
    return newValue.x === oldValue.x && newValue.y === oldValue.y;
  }
  if ("className" in newValue) {
    if (typeof oldValue !== "object" || !("className" in oldValue)) {
      return false;
    }
    return oldValue.className === newValue.className && oldValue.id === newValue.id;
  }
  return false;
}
function shouldCommit(oldValue, newValue) {
  if (oldValue.valueFormat !== newValue.valueFormat || newValue.valueFormat !== PropertyValueFormat.Primitive) {
    return true;
  }
  const oldPrimitiveValue = oldValue;
  if (!oldPrimitiveValue.value && !newValue.value) {
    return false;
  }
  if (!oldPrimitiveValue.value && newValue.value || oldPrimitiveValue.value && !newValue.value) {
    return true;
  }
  return !arePrimitiveValuesEqual(oldPrimitiveValue.value, newValue.value);
}
try {
  EditorContainer.displayName = "EditorContainer";
  EditorContainer.__docgenInfo = { "description": "EditorContainer React component used by the Tree and PropertyGrid for cell editing.", "displayName": "EditorContainer", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": true, "type": { "name": "PropertyRecord" } }, "title": { "defaultValue": null, "description": "Tooltip text", "name": "title", "required": false, "type": { "name": "string" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": true, "type": { "name": "(args: PropertyUpdatedArgs) => void" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": true, "type": { "name": "() => void" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "ignoreEditorBlur": { "defaultValue": null, "description": "@internal", "name": "ignoreEditorBlur", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class EnumButtonGroupEditor extends reactExports.Component {
  constructor() {
    super(...arguments);
    this._btnRefs = /* @__PURE__ */ new Map();
    this._divElement = reactExports.createRef();
    this.state = {
      selectValue: "",
      enumIcons: [],
      choices: []
    };
    this._handleButtonClick = (index) => {
      const propertyRecord = this.props.propertyRecord;
      if (this.state.choices && this.state.choices.length > index) {
        const selectValue = this.state.choices[index].value;
        this.setState(
          {
            selectValue
          },
          async () => {
            if (propertyRecord && this.props.onCommit) {
              const propertyValue = await this.getPropertyValue();
              if (propertyValue !== void 0) {
                this.props.onCommit({ propertyRecord, newValue: propertyValue });
              }
            }
          }
        );
      }
    };
  }
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.selectValue,
        displayValue: ""
      };
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._divElement.current;
  }
  get hasFocus() {
    let containsFocus = false;
    if (this._divElement.current)
      containsFocus = this._divElement.current.contains(document.activeElement);
    return containsFocus;
  }
  componentDidMount() {
    void this.setStateFromProps();
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  async setStateFromProps() {
    const { propertyRecord } = this.props;
    if (propertyRecord && propertyRecord.property.enum && propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
      const primitiveValue = propertyRecord.value.value;
      let selectValue;
      if (typeof primitiveValue === "string") {
        selectValue = primitiveValue;
      } else {
        selectValue = primitiveValue;
      }
      let choices = [];
      if (propertyRecord && propertyRecord.property.enum) {
        if (propertyRecord.property.enum.choices instanceof Promise) {
          choices = await propertyRecord.property.enum.choices;
        } else {
          choices = propertyRecord.property.enum.choices;
        }
      }
      const numChoices = choices.length;
      const enumIcons = new Array(numChoices);
      enumIcons.fill({ iconSpec: placeholderSvg });
      if (propertyRecord.property.editor && propertyRecord.property.editor.params) {
        if (propertyRecord.property.editor && propertyRecord.property.editor.params) {
          const bgParams = propertyRecord.property.editor.params.find(
            (param) => param.type === PropertyEditorParamTypes.ButtonGroupData.valueOf()
          );
          if (bgParams) {
            bgParams.buttons.forEach(
              (iconDef, index) => {
                if (index < numChoices) {
                  enumIcons[index] = iconDef;
                }
              }
            );
          }
        }
      }
      this.setState({ selectValue, enumIcons, choices });
    }
  }
  getButton(choice, index) {
    const choiceValue = this.state.choices ? this.state.choices[index].value : 0;
    const isActive = choiceValue === this.state.selectValue ? true : false;
    let isDisabled = false;
    const isEnabledFunction = this.state.enumIcons[index].isEnabledFunction;
    if (isEnabledFunction) {
      isDisabled = !isEnabledFunction();
    }
    const className = classnames(
      "components-enumbuttongroup-button",
      isDisabled && "nz-is-disabled",
      isActive && "nz-is-active"
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        ref: (ref) => ref && this._btnRefs.set(choiceValue, ref),
        "data-testid": choice.label,
        className,
        title: choice.label,
        onClick: () => this._handleButtonClick(index),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: this.state.enumIcons[index].iconSpec })
      },
      choice.label
    );
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: classnames(
          "components-enumbuttongroup-editor",
          this.props.className
        ),
        style: this.props.style,
        ref: this._divElement,
        children: this.state.choices && this.state.enumIcons.length && this.state.choices.map(
          (choice, index) => this.getButton(choice, index)
        )
      }
    );
  }
}
class EnumPropertyButtonGroupEditor extends PropertyEditorBase {
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EnumButtonGroupEditor, {});
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Enum,
  EnumPropertyButtonGroupEditor,
  StandardEditorNames.EnumButtonGroup
);
try {
  EnumButtonGroupEditor.displayName = "EnumButtonGroupEditor";
  EnumButtonGroupEditor.__docgenInfo = { "description": "EnumButtonGroupEditor React component that is a property editor with select input", "displayName": "EnumButtonGroupEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  EnumPropertyButtonGroupEditor.displayName = "EnumPropertyButtonGroupEditor";
  EnumPropertyButtonGroupEditor.__docgenInfo = { "description": 'Enum Property Button Group Editor registered for the "enum" type name and the "enum-buttongroup" editor name.\nIt uses the [[EnumButtonGroupEditor]] React component.', "displayName": "EnumPropertyButtonGroupEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class EnumEditor extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this._divElement = reactExports.createRef();
    this.state = {
      selectValue: "",
      valueIsNumber: false,
      options: [],
      parentDiv: null
    };
    this._updateSelectValue = (newValue) => {
      if (this._isMounted) {
        let selectValue;
        if (this.state.valueIsNumber)
          selectValue = parseInt(newValue, 10);
        else
          selectValue = newValue;
        this.setState(
          {
            selectValue
          },
          async () => {
            if (this.props.propertyRecord && this.props.onCommit) {
              const propertyValue = await this.getPropertyValue();
              if (propertyValue) {
                this.props.onCommit({
                  propertyRecord: this.props.propertyRecord,
                  newValue: propertyValue
                });
              }
            }
          }
        );
      }
    };
  }
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.selectValue,
        displayValue: ""
      };
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._divElement.current;
  }
  get hasFocus() {
    let containsFocus = false;
    if (this._divElement.current)
      containsFocus = this._divElement.current.contains(document.activeElement);
    return containsFocus;
  }
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  async setStateFromProps() {
    const { propertyRecord } = this.props;
    let initialValue = "";
    let valueIsNumber = false;
    if (propertyRecord && propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
      const primitiveValue = propertyRecord.value.value;
      if (typeof primitiveValue === "string") {
        initialValue = primitiveValue;
        valueIsNumber = false;
      } else {
        initialValue = primitiveValue;
        valueIsNumber = true;
      }
    }
    let choices;
    if (propertyRecord && propertyRecord.property.enum) {
      if (propertyRecord.property.enum.choices instanceof Promise) {
        choices = await propertyRecord.property.enum.choices;
      } else {
        choices = propertyRecord.property.enum.choices;
      }
    }
    const options = [];
    if (choices) {
      choices.forEach((choice) => {
        options.push({ value: choice.value.toString(), label: choice.label });
      });
    }
    if (this._isMounted)
      this.setState({
        selectValue: initialValue,
        valueIsNumber,
        options,
        parentDiv: this._divElement.current
      });
  }
  render() {
    const className = classnames(
      "components-cell-editor",
      "components-enum-editor",
      this.props.className
    );
    const selectValue = this.state.selectValue !== void 0 ? this.state.selectValue.toString() : void 0;
    const minWidthStyle = {
      minWidth: `6em`
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: this._divElement, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        className,
        style: this.props.style ? this.props.style : minWidthStyle,
        value: selectValue,
        onChange: this._updateSelectValue,
        "data-testid": "components-select-editor",
        options: this.state.options,
        triggerProps: {
          ref: (el) => {
            if (!this.props.setFocus)
              return;
            el == null ? void 0 : el.focus();
          },
          className: "components-button"
        },
        "aria-label": UiComponents$1.translate("editor.enum"),
        size: "small"
      }
    ) });
  }
}
class EnumPropertyEditor extends PropertyEditorBase {
  get containerHandlesEnter() {
    return false;
  }
  get containerStopsKeydownPropagation() {
    return false;
  }
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EnumEditor, {});
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Enum,
  EnumPropertyEditor
);
try {
  EnumEditor.displayName = "EnumEditor";
  EnumEditor.__docgenInfo = { "description": "EnumEditor React component that is a property editor with select input", "displayName": "EnumEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  EnumPropertyEditor.displayName = "EnumPropertyEditor";
  EnumPropertyEditor.__docgenInfo = { "description": 'Enum Property Button Group Editor registered for the "enum" type name.\nIt uses the [[EnumEditor]] React component.', "displayName": "EnumPropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class IconItem extends reactExports.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      onClick,
      icon,
      // do not pass on item specific props
      ...otherProps
    } = this.props;
    const handleClick2 = (_e2) => {
      if (onClick)
        onClick();
    };
    const classes = classnames("components-icon-swatch", this.props.className);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        ...otherProps,
        className: classes,
        style: this.props.style,
        onClick: handleClick2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: icon })
      }
    );
  }
}
const _IconPickerButton = class _IconPickerButton extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    this._target = reactExports.createRef();
    this._togglePopup = () => {
      if (this.props.readonly)
        return;
      this.setState((prevState) => ({ showPopup: !prevState.showPopup }));
    };
    this._closePopup = () => {
      this.setState({ showPopup: false });
    };
    this._handleIconPicked = (icon) => {
      this.setState({ showPopup: false, icon }, () => {
        if (this.props.onIconChange)
          this.props.onIconChange(icon);
      });
    };
    this.state = { showPopup: false, icon: this.props.icon };
  }
  renderPopup(title) {
    const containerStyle = {
      gridTemplateColumns: `repeat(${this.props.numColumns}, 1fr)`
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "components-iconpicker-popup-container", children: [
      title && /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-testid": "components-iconpicker-popup-icons",
          className: "components-iconpicker-popup-icons",
          style: containerStyle,
          children: this.props.icons.map((icon, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            IconItem,
            {
              icon,
              onClick: this._handleIconPicked.bind(this, icon)
            },
            index
          ))
        }
      )
    ] });
  }
  render() {
    const buttonStyle = { ...this.props.style };
    const buttonClassNames = classnames(
      "components-iconpicker-button",
      this.props.readonly && "readonly",
      this.props.className
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          "data-testid": "components-iconpicker-button",
          onClick: this._togglePopup,
          className: buttonClassNames,
          style: buttonStyle,
          disabled: this.props.disabled,
          ref: this._target,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Icon,
              {
                className: "iconpicker-button-sprite",
                iconSpec: this.state.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgChevronDown, {}) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Popup,
        {
          className: "components-iconpicker-popup",
          isOpen: this.state.showPopup,
          position: RelativePosition.BottomLeft,
          onClose: this._closePopup,
          target: this._target.current,
          children: this.renderPopup(this.props.dropDownTitle)
        }
      )
    ] });
  }
};
_IconPickerButton.defaultProps = {
  numColumns: 4
};
let IconPickerButton = _IconPickerButton;
try {
  IconPickerButton.displayName = "IconPickerButton";
  IconPickerButton.__docgenInfo = { "description": "IconPickerButton component", "displayName": "IconPickerButton", "props": { "icon": { "defaultValue": null, "description": "active string", "name": "icon", "required": true, "type": { "name": "string" } }, "icons": { "defaultValue": null, "description": "available icons", "name": "icons", "required": true, "type": { "name": "string[]" } }, "onIconChange": { "defaultValue": null, "description": "function to run when user selects icon", "name": "onIconChange", "required": false, "type": { "name": "((icon: string) => void)" } }, "disabled": { "defaultValue": null, "description": "Disabled or not", "name": "disabled", "required": false, "type": { "name": "boolean" } }, "readonly": { "defaultValue": null, "description": "Readonly or not", "name": "readonly", "required": false, "type": { "name": "boolean" } }, "dropDownTitle": { "defaultValue": null, "description": "Title to show at top of DropDown", "name": "dropDownTitle", "required": false, "type": { "name": "string" } }, "numColumns": { "defaultValue": { value: "4" }, "description": "Number of columns", "name": "numColumns", "required": false, "type": { "name": "number" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class IconEditor extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    this._control = null;
    this._isMounted = false;
    this._divElement = reactExports.createRef();
    this._onIconChange = (icon2) => {
      const propertyRecord = this.props.propertyRecord;
      this.setState(
        {
          icon: icon2
        },
        async () => {
          if (propertyRecord && this.props.onCommit) {
            const propertyValue = await this.getPropertyValue();
            if (propertyValue) {
              this.props.onCommit({ propertyRecord, newValue: propertyValue });
            }
          }
        }
      );
    };
    let icon = "";
    let numColumns = 4;
    const icons = [];
    const readonly = false;
    const record = props.propertyRecord;
    if (record && record.property && record.property.editor && record.property.editor.params) {
      const iconParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.IconListData.valueOf()
      );
      if (iconParams) {
        if (iconParams.iconValue)
          icon = iconParams.iconValue;
        if (iconParams.numColumns)
          numColumns = iconParams.numColumns;
        if (iconParams.iconValues)
          iconParams.iconValues.forEach((i) => icons.push(i));
      }
    }
    this.state = { icon, icons, numColumns, readonly };
  }
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.icon,
        displayValue: ""
      };
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._divElement.current;
  }
  get hasFocus() {
    let containsFocus = false;
    if (this._divElement.current)
      containsFocus = this._divElement.current.contains(document.activeElement);
    return containsFocus;
  }
  setFocus() {
    if (this._control && !this.state.isDisabled) {
      this._control.setFocus();
    }
  }
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  async setStateFromProps() {
    const record = this.props.propertyRecord;
    let initialValue = "";
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      initialValue = record.value.value;
    }
    const readonly = record && void 0 !== record.isReadonly ? record.isReadonly : false;
    const isDisabled = record ? record.isDisabled : void 0;
    if (this._isMounted)
      this.setState({ icon: initialValue, readonly, isDisabled }, () => {
        if (this.props.setFocus) {
          this.setFocus();
        }
      });
  }
  render() {
    const { icon, icons, numColumns } = this.state;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: classnames("components-icon-editor", this.props.className),
        style: this.props.style,
        ref: this._divElement,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          IconPickerButton,
          {
            ref: (control) => this._control = control,
            icon,
            icons,
            numColumns,
            disabled: this.state.isDisabled,
            readonly: this.state.readonly,
            onIconChange: this._onIconChange,
            "data-testid": "components-icon-editor"
          }
        )
      }
    );
  }
}
class IconPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IconEditor, {});
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Text,
  IconPropertyEditor,
  StandardEditorNames.IconPicker
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.String,
  IconPropertyEditor,
  StandardEditorNames.IconPicker
);
try {
  IconEditor.displayName = "IconEditor";
  IconEditor.__docgenInfo = { "description": "IconEditor React component that is a property editor with button and popup", "displayName": "IconEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  IconPropertyEditor.displayName = "IconPropertyEditor";
  IconPropertyEditor.__docgenInfo = { "description": 'Icon Property Editor registered for the "text" and "string" type names and the "icon-picker" editor name.\nIt uses the [[IconEditor]] React component.', "displayName": "IconPropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class ImageCheckBoxEditor extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this._inputElement = reactExports.createRef();
    this.state = {
      imageOff: "",
      imageOn: "",
      checkboxValue: false,
      isDisabled: false
    };
    this._handleClick = (checked) => {
      this.setState(
        {
          checkboxValue: checked
        },
        async () => {
          if (this.props.propertyRecord && this.props.onCommit) {
            const propertyValue = await this.getPropertyValue();
            if (this._isMounted && propertyValue !== void 0) {
              this.props.onCommit({
                propertyRecord: this.props.propertyRecord,
                newValue: propertyValue
              });
            }
          }
        }
      );
    };
  }
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.checkboxValue,
        displayValue: ""
      };
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._inputElement.current;
  }
  get hasFocus() {
    return document.activeElement === this._inputElement.current;
  }
  componentDidMount() {
    this._isMounted = true;
    this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      this.setStateFromProps();
    }
  }
  setStateFromProps() {
    const { propertyRecord } = this.props;
    let checkboxValue = false;
    let imageOn = "";
    let imageOff = "";
    let isDisabled = false;
    if (propertyRecord && propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
      const primitiveValue = propertyRecord.value.value;
      checkboxValue = primitiveValue;
    }
    if (propertyRecord && propertyRecord.isDisabled)
      isDisabled = propertyRecord.isDisabled;
    if (propertyRecord && propertyRecord.property && propertyRecord.property.editor && propertyRecord.property.editor.params) {
      const imageCheckBoxParams = propertyRecord.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.CheckBoxImages.valueOf()
      );
      if (imageCheckBoxParams) {
        imageOn = imageCheckBoxParams.imageOn;
        imageOff = imageCheckBoxParams.imageOff;
      }
    }
    this.setState({ imageOn, imageOff, checkboxValue, isDisabled });
  }
  render() {
    const className = classnames(
      "components-cell-editor",
      "components-imagecheckbox-editor",
      this.props.className
    );
    const checked = this.state.checkboxValue;
    const isDisabled = !!this.state.isDisabled;
    return (
      // eslint-disable-next-line deprecation/deprecation
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageCheckBox,
        {
          inputRef: this._inputElement,
          imageOff: this.state.imageOff,
          imageOn: this.state.imageOn,
          className,
          border: true,
          style: this.props.style,
          checked,
          disabled: isDisabled,
          onClick: this._handleClick,
          "data-testid": "components-imagecheckbox-editor"
        }
      )
    );
  }
}
class ImageCheckBoxPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ImageCheckBoxEditor, {});
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Boolean,
  ImageCheckBoxPropertyEditor,
  StandardEditorNames.ImageCheckBox
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Bool,
  ImageCheckBoxPropertyEditor,
  StandardEditorNames.ImageCheckBox
);
try {
  ImageCheckBoxEditor.displayName = "ImageCheckBoxEditor";
  ImageCheckBoxEditor.__docgenInfo = { "description": "[[ImageCheckBoxEditor]]\nBoolean editor that renders with an image instead of checkbox", "displayName": "ImageCheckBoxEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ImageCheckBoxPropertyEditor.displayName = "ImageCheckBoxPropertyEditor";
  ImageCheckBoxPropertyEditor.__docgenInfo = { "description": 'ImageCheckBox Property Editor registered for the "bool" and "boolean" type names.\nIt uses the [[ImageCheckBoxEditor]] React component.', "displayName": "ImageCheckBoxPropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class NumericInputEditor extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this._inputElement = reactExports.createRef();
    this.hasFocus = false;
    this.state = {
      value: 0,
      readonly: false
    };
    this._handleCommit = async () => {
      if (this.props.propertyRecord && this.props.onCommit) {
        const propertyValue = await this.getPropertyValue();
        if (propertyValue !== void 0) {
          this.props.onCommit({
            propertyRecord: this.props.propertyRecord,
            newValue: propertyValue
          });
        }
      }
    };
    this._updateValue = (value, _stringValue) => {
      const newValue = value !== void 0 ? value : 0;
      if (this._isMounted)
        this.setState(
          {
            value: newValue
          },
          async () => {
            await this._handleCommit();
          }
        );
    };
  }
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.value,
        displayValue: ""
      };
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._inputElement.current;
  }
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  async setStateFromProps() {
    const record = this.props.propertyRecord;
    let initialValue = 0;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      initialValue = record.value.value;
    }
    const readonly = record && void 0 !== record.isReadonly ? record.isReadonly : false;
    let size;
    let maxLength;
    let min;
    let max;
    let step;
    let precision;
    const isDisabled = record ? record.isDisabled : void 0;
    if (record && record.property && record.property.editor && record.property.editor.params) {
      const editorSizeParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.InputEditorSize.valueOf()
      );
      if (editorSizeParams) {
        if (editorSizeParams.size)
          size = editorSizeParams.size;
        if (editorSizeParams.maxLength)
          maxLength = editorSizeParams.maxLength;
      }
      const rangeParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.Range.valueOf()
      );
      if (rangeParams) {
        min = rangeParams.minimum;
        max = rangeParams.maximum;
        step = rangeParams.step;
        precision = rangeParams.precision;
      }
    }
    if (this._isMounted)
      this.setState({
        value: initialValue,
        readonly,
        size,
        maxLength,
        isDisabled,
        min,
        max,
        step,
        precision
      });
  }
  render() {
    const className = classnames(
      "components-cell-editor",
      "components-numeric-input-editor",
      this.props.className
    );
    const minSize = this.state.size ? this.state.size : 8;
    const style = {
      ...this.props.style,
      minWidth: `${minSize * 0.75}em`
    };
    return (
      // eslint-disable-next-line deprecation/deprecation
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberInput,
        {
          ref: this._inputElement,
          className,
          style,
          value: this.state.value,
          min: this.state.min,
          max: this.state.max,
          step: this.state.step,
          precision: this.state.precision,
          readOnly: this.state.readonly,
          maxLength: this.state.maxLength,
          onBlur: this.props.onBlur,
          onChange: this._updateValue,
          autoFocus: this.props.setFocus && !this.state.isDisabled,
          isControlled: this.props.shouldCommitOnChange
        }
      )
    );
  }
}
class NumericInputPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NumericInputEditor, {});
  }
  get containerHandlesEnter() {
    return false;
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Number,
  NumericInputPropertyEditor,
  StandardEditorNames.NumericInput
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Int,
  NumericInputPropertyEditor,
  StandardEditorNames.NumericInput
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Float,
  NumericInputPropertyEditor,
  StandardEditorNames.NumericInput
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Double,
  NumericInputPropertyEditor,
  StandardEditorNames.NumericInput
);
try {
  NumericInputEditor.displayName = "NumericInputEditor";
  NumericInputEditor.__docgenInfo = { "description": "NumericInputEditor React component that is a property editor with numeric input & up/down buttons", "displayName": "NumericInputEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  NumericInputPropertyEditor.displayName = "NumericInputPropertyEditor";
  NumericInputPropertyEditor.__docgenInfo = { "description": 'Numeric Input Property Editor registered for the "number" type name and "numeric-input" editor name.\nIt uses the [[NumericInputEditor]] React component.', "displayName": "NumericInputPropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class SliderEditor extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this._enterKey = false;
    this._divElement = reactExports.createRef();
    this.state = {
      value: 0,
      min: 0,
      max: 100
    };
    this._handleChange = (values) => {
      const newValue = values[0];
      if (this._isMounted)
        this.setState({
          value: newValue
        });
    };
    this.internalFormatTooltip = (value, step = 1) => {
      if (Number.isInteger(step))
        return value.toFixed(0);
      const stepString = step.toString();
      const decimalIndex = stepString.indexOf(".");
      const numDecimals = step.toString().length - (decimalIndex + 1);
      return value.toFixed(numDecimals);
    };
    this._handleEnter = async () => {
      this._enterKey = true;
      await this._handleCommit();
    };
    this._handleClose = async () => {
      if (this._enterKey) {
        this._enterKey = false;
      } else {
        if (this.props.onCancel)
          this.props.onCancel();
      }
    };
    this._handleOk = async (_event) => {
      await this._handleCommit();
    };
    this._handleCancel = (_event) => {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    };
    this._handleCommit = async () => {
      if (this.props.propertyRecord && this.props.onCommit) {
        const propertyValue = await this.getPropertyValue();
        if (propertyValue !== void 0) {
          this.props.onCommit({
            propertyRecord: this.props.propertyRecord,
            newValue: propertyValue
          });
        }
      }
    };
    this.tooltipProps = (_index, val) => {
      const content = this.state.formatTooltip ? this.state.formatTooltip(val) : this.internalFormatTooltip(val, this.state.step);
      return {
        placement: this.state.tooltipBelow ? "bottom" : "top",
        content,
        visible: this.state.showTooltip
      };
    };
  }
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.value,
        displayValue: ""
      };
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._divElement.current;
  }
  get hasFocus() {
    let containsFocus = false;
    if (this.htmlElement)
      containsFocus = this.htmlElement.contains(document.activeElement);
    return containsFocus;
  }
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  async setStateFromProps() {
    const record = this.props.propertyRecord;
    let initialValue = 0;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      initialValue = record.value.value;
    }
    let size;
    let min = 0;
    let max = 100;
    let step;
    let showTooltip;
    let tooltipBelow;
    let formatTooltip;
    let tickLabels;
    let minLabel;
    let maxLabel;
    let trackDisplayMode;
    let thumbMode;
    const isDisabled = record ? record.isDisabled : void 0;
    if (record && record.property && record.property.editor && record.property.editor.params) {
      const sliderParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.Slider.valueOf()
      );
      if (sliderParams) {
        min = sliderParams.minimum;
        max = sliderParams.maximum;
        size = sliderParams.size;
        step = sliderParams.step;
        thumbMode = 1 === sliderParams.mode ? "allow-crossing" : "inhibit-crossing";
        trackDisplayMode = !sliderParams.reversed ? "auto" : "odd-segments";
        showTooltip = sliderParams.showTooltip;
        tooltipBelow = sliderParams.tooltipBelow;
        formatTooltip = sliderParams.formatTooltip;
        minLabel = !sliderParams.showMinMax ? "" : sliderParams.minIconSpec ? (
          // eslint-disable-next-line deprecation/deprecation
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: sliderParams.minIconSpec })
        ) : void 0;
        maxLabel = !sliderParams.showMinMax ? "" : sliderParams.maxIconSpec ? (
          // eslint-disable-next-line deprecation/deprecation
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: sliderParams.maxIconSpec })
        ) : void 0;
        if (sliderParams.showTicks) {
          const count = sliderParams.getTickCount ? sliderParams.getTickCount() : 0;
          if (count) {
            tickLabels = [];
            const increment = (max - min) / count;
            for (let i = 0; i <= count; i++) {
              const value = i * increment + min;
              if (sliderParams.showTickLabels) {
                const label = sliderParams.formatTick ? sliderParams.formatTick(value) : this.internalFormatTooltip(value, step);
                tickLabels.push(label);
              } else {
                tickLabels.push("");
              }
            }
          } else if (sliderParams.getTickValues) {
            tickLabels = sliderParams.getTickValues().map(
              (val) => sliderParams.formatTick ? sliderParams.formatTick(val) : this.internalFormatTooltip(val, step)
            );
          }
        }
      }
    }
    if (this._isMounted)
      this.setState({
        value: initialValue,
        isDisabled,
        size,
        min,
        max,
        step,
        trackDisplayMode,
        showTooltip,
        tooltipBelow,
        formatTooltip,
        minLabel,
        maxLabel,
        tickLabels,
        thumbMode
      });
  }
  render() {
    const className = classnames(
      "components-cell-editor",
      "components-slider-editor",
      this.props.className
    );
    const minSize = this.state.size ? this.state.size : 100;
    const style = {
      ...this.props.style,
      minWidth: `${minSize}px`
    };
    const tickProps = {
      "data-testid": "components-tick"
    };
    const popupContent = /* @__PURE__ */ jsxRuntimeExports.jsx(
      Slider,
      {
        className: "components-slider-editor-slider",
        style,
        values: [this.state.value],
        min: this.state.min,
        max: this.state.max,
        step: this.state.step,
        thumbMode: this.state.thumbMode,
        trackDisplayMode: this.state.trackDisplayMode,
        disabled: this.state.isDisabled,
        minLabel: this.state.minLabel,
        maxLabel: this.state.maxLabel,
        tooltipProps: this.tooltipProps,
        tickLabels: this.state.tickLabels,
        tickProps,
        onChange: this._handleChange
      }
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, ref: this._divElement, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopupButton,
      {
        label: this.state.value,
        onClose: this._handleClose,
        onEnter: this._handleEnter,
        setFocus: this.props.setFocus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PopupContent, { children: [
          popupContent,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PopupOkCancelButtons,
            {
              onOk: this._handleOk,
              onCancel: this._handleCancel
            }
          )
        ] })
      }
    ) });
  }
}
class SliderPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SliderEditor, {});
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Number,
  SliderPropertyEditor,
  StandardEditorNames.Slider
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Int,
  SliderPropertyEditor,
  StandardEditorNames.Slider
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Float,
  SliderPropertyEditor,
  StandardEditorNames.Slider
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Double,
  SliderPropertyEditor,
  StandardEditorNames.Slider
);
try {
  SliderEditor.displayName = "SliderEditor";
  SliderEditor.__docgenInfo = { "description": "SliderEditor React component that is a property editor with numeric input & up/down buttons", "displayName": "SliderEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  SliderPropertyEditor.displayName = "SliderPropertyEditor";
  SliderPropertyEditor.__docgenInfo = { "description": 'Slider Property Editor registered for the "number" type name and "slider" editor name.\nIt uses the [[SliderEditor]] React component.', "displayName": "SliderPropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const DEFAULT_ROWS = 3;
class TextareaEditor extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this._divElement = reactExports.createRef();
    this._textAreaElement = reactExports.createRef();
    this.state = {
      inputValue: "",
      readonly: false,
      rows: DEFAULT_ROWS
    };
    this._updateTextareaValue = (e) => {
      if (this._isMounted)
        this.setState({
          inputValue: e.target.value
        });
    };
    this._handleOk = async (_event) => {
      if (this.props.propertyRecord && this.props.onCommit) {
        const propertyValue = await this.getPropertyValue();
        if (propertyValue !== void 0) {
          this.props.onCommit({
            propertyRecord: this.props.propertyRecord,
            newValue: propertyValue
          });
        }
      }
    };
    this._handleCancel = (_event) => {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    };
  }
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = await TypeConverterManager.getConverter(
        record.property.typename
      ).convertFromStringToPropertyValue(this.state.inputValue, record);
      propertyValue.displayValue = this.state.inputValue;
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._divElement.current;
  }
  get hasFocus() {
    let containsFocus = false;
    if (this._divElement.current)
      containsFocus = this._divElement.current.contains(document.activeElement);
    return containsFocus;
  }
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  async setStateFromProps() {
    const record = this.props.propertyRecord;
    let initialValue = "";
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      const value = record.value.value;
      initialValue = await TypeConverterManager.getConverter(
        record.property.typename
      ).convertPropertyToString(record.property, value);
    }
    const readonly = record && void 0 !== record.isReadonly ? record.isReadonly : false;
    let size;
    let maxLength;
    let rows = DEFAULT_ROWS;
    const isDisabled = record ? record.isDisabled : void 0;
    if (record && record.property && record.property.editor && record.property.editor.params) {
      const editorSizeParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.InputEditorSize.valueOf()
      );
      if (editorSizeParams) {
        if (editorSizeParams.size)
          size = editorSizeParams.size;
        if (editorSizeParams.maxLength)
          maxLength = editorSizeParams.maxLength;
      }
      const multilineParams = record.property.editor.params.find(
        (param) => param.type === PropertyEditorParamTypes.MultilineText.valueOf()
      );
      if (multilineParams) {
        rows = multilineParams.rows;
      }
    }
    if (this._isMounted)
      this.setState({
        inputValue: initialValue,
        readonly,
        size,
        maxLength,
        isDisabled,
        rows
      });
  }
  render() {
    const className = classnames(
      "components-cell-editor",
      "components-textarea-editor",
      this.props.className
    );
    const minSize = this.state.size ? this.state.size : 8;
    const style = {
      ...this.props.style,
      minWidth: `${minSize * 0.75}em`
    };
    const textareaProps = {
      className: "components-textarea-editor-textarea",
      style,
      rows: this.state.rows,
      readOnly: this.state.readonly,
      disabled: this.state.isDisabled,
      maxLength: this.state.maxLength,
      value: this.state.inputValue,
      onChange: this._updateTextareaValue,
      autoFocus: this.props.setFocus && !this.state.isDisabled
    };
    textareaProps["aria-label"] = UiComponents$1.translate("editor.textarea");
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, ref: this._divElement, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopupButton,
      {
        label: this.state.inputValue,
        closeOnEnter: false,
        setFocus: this.props.setFocus,
        focusTarget: this._textAreaElement,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PopupContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              ...textareaProps,
              "data-testid": "components-textarea-editor",
              ref: this._textAreaElement
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PopupOkCancelButtons,
            {
              onOk: this._handleOk,
              onCancel: this._handleCancel
            }
          )
        ] })
      }
    ) });
  }
}
class TextareaPropertyEditor extends PropertyEditorBase {
  get containerHandlesBlur() {
    return false;
  }
  get containerHandlesEnter() {
    return false;
  }
  get containerHandlesTab() {
    return false;
  }
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TextareaEditor, {});
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Text,
  TextareaPropertyEditor,
  StandardEditorNames.MultiLine
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.String,
  TextareaPropertyEditor,
  StandardEditorNames.MultiLine
);
try {
  TextareaEditor.displayName = "TextareaEditor";
  TextareaEditor.__docgenInfo = { "description": "TextareaEditor React component that is a property editor with text input", "displayName": "TextareaEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  TextareaPropertyEditor.displayName = "TextareaPropertyEditor";
  TextareaPropertyEditor.__docgenInfo = { "description": 'Textarea Property Editor registered for the "text" and "string" type names and "multi-line" editor name.\nIt uses the [[TextareaEditor]] React component.', "displayName": "TextareaPropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class ToggleEditor extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._isMounted = false;
    this._inputElement = reactExports.createRef();
    this.state = {
      toggleValue: false,
      isDisabled: false
    };
    this._updateToggleValue = (e) => {
      if (this._isMounted) {
        if (this._isMounted) {
          const toggleValue = !!e.target.checked;
          this.setState(
            {
              toggleValue
            },
            async () => {
              if (this.props.propertyRecord && this.props.onCommit) {
                const propertyValue = await this.getPropertyValue();
                if (propertyValue !== void 0) {
                  this.props.onCommit({
                    propertyRecord: this.props.propertyRecord,
                    newValue: propertyValue
                  });
                }
              }
            }
          );
        }
      }
    };
  }
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = {
        valueFormat: PropertyValueFormat.Primitive,
        value: this.state.toggleValue,
        displayValue: ""
      };
    }
    return propertyValue;
  }
  get htmlElement() {
    return this._inputElement.current;
  }
  get hasFocus() {
    return document.activeElement === this._inputElement.current;
  }
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  async setStateFromProps() {
    const { propertyRecord } = this.props;
    let toggleValue = false;
    let isDisabled = false;
    if (propertyRecord && propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
      const primitiveValue = propertyRecord.value.value;
      toggleValue = primitiveValue;
    }
    if (propertyRecord && propertyRecord.isDisabled)
      isDisabled = propertyRecord.isDisabled;
    if (this._isMounted)
      this.setState({ toggleValue, isDisabled });
  }
  render() {
    const className = classnames(
      "components-cell-editor",
      "components-toggle-editor",
      this.props.className
    );
    const isChecked = this.state.toggleValue;
    const isDisabled = !!this.state.isDisabled;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ToggleSwitch,
      {
        ref: this._inputElement,
        onBlur: this.props.onBlur,
        className,
        style: this.props.style,
        checked: isChecked,
        disabled: isDisabled,
        onChange: this._updateToggleValue,
        "data-testid": "components-toggle-editor",
        autoFocus: this.props.setFocus
      }
    );
  }
}
class TogglePropertyEditor extends PropertyEditorBase {
  get containerHandlesBlur() {
    return false;
  }
  get reactNode() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleEditor, {});
  }
}
PropertyEditorManager.registerEditor(
  StandardTypeNames.Bool,
  TogglePropertyEditor,
  StandardEditorNames.Toggle
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Boolean,
  TogglePropertyEditor,
  StandardEditorNames.Toggle
);
try {
  ToggleEditor.displayName = "ToggleEditor";
  ToggleEditor.__docgenInfo = { "description": "ToggleEditor React component that is a property editor with checkbox input", "displayName": "ToggleEditor", "props": { "propertyRecord": { "defaultValue": null, "description": "The property being updated.", "name": "propertyRecord", "required": false, "type": { "name": "PropertyRecord" } }, "onCommit": { "defaultValue": null, "description": "Handler for commit", "name": "onCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onCancel": { "defaultValue": null, "description": "Handler for cancel", "name": "onCancel", "required": false, "type": { "name": "(() => void)" } }, "onBlur": { "defaultValue": null, "description": "Handler for blur", "name": "onBlur", "required": false, "type": { "name": "((event: FocusEvent<Element, Element>) => void)" } }, "setFocus": { "defaultValue": null, "description": "Indicates whether the Property Editor should set focus", "name": "setFocus", "required": false, "type": { "name": "boolean" } }, "shouldCommitOnChange": { "defaultValue": null, "description": "Indicates whether value change should call onCommit().\n@internal", "name": "shouldCommitOnChange", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  TogglePropertyEditor.displayName = "TogglePropertyEditor";
  TogglePropertyEditor.__docgenInfo = { "description": 'Toggle Property Editor registered for the "bool" and "boolean" type names and "toggle" editor name.\nIt uses the [[ToggleEditor]] React component.', "displayName": "TogglePropertyEditor", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function countMatchesInString(str, lookup) {
  if (!str.length || !lookup.length)
    return 0;
  let n = 0, pos = 0;
  const step = lookup.length;
  while (true) {
    pos = str.indexOf(lookup, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else
      break;
  }
  return n;
}
class CommonPropertyRenderer {
  static getLabelOffset(indentation, orientation, width, columnRatio, minColumnLabelWidth) {
    if (!indentation)
      return 0;
    const maxIndent = 17;
    const minIndent = 6;
    if (orientation !== Orientation.Horizontal || !width || !columnRatio || !minColumnLabelWidth)
      return indentation * maxIndent;
    const currentSize = Math.ceil(width * columnRatio);
    const shrinkThreshold = minColumnLabelWidth + maxIndent * indentation;
    if (currentSize >= shrinkThreshold)
      return indentation * maxIndent;
    const minShrink = minColumnLabelWidth + minIndent + maxIndent * (indentation - 1);
    if (currentSize <= minShrink)
      return minIndent + this.getLabelOffset(
        indentation - 1,
        orientation,
        width,
        columnRatio,
        minColumnLabelWidth
      );
    return currentSize - minColumnLabelWidth;
  }
  static createNewDisplayValue(orientation, propertyRecord, indentation, propertyValueRendererManager, isExpanded, onExpansionToggled, onHeightChanged, highlight) {
    const highlightCallback = (highlight == null ? void 0 : highlight.applyOnValue) ? CommonPropertyRenderer.createHighlightCallback(
      highlight,
      propertyRecord
    ) : void 0;
    const rendererContext = {
      orientation,
      containerType: PropertyContainerType.PropertyPane,
      isExpanded,
      onExpansionToggled,
      onHeightChanged,
      textHighlighter: highlightCallback
    };
    let displayValue;
    if (propertyValueRendererManager)
      displayValue = propertyValueRendererManager.render(
        propertyRecord,
        rendererContext
      );
    else
      displayValue = PropertyValueRendererManager.defaultManager.render(
        propertyRecord,
        rendererContext
      );
    if (orientation === Orientation.Vertical)
      displayValue = /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          style: {
            paddingLeft: CommonPropertyRenderer.getLabelOffset(
              indentation,
              orientation
            )
          },
          children: displayValue
        }
      );
    return displayValue;
  }
  static createHighlightCallback(highlight, propertyRecord) {
    const activeMatch = highlight.activeHighlight;
    const propertyName = activeMatch == null ? void 0 : activeMatch.highlightedItemIdentifier;
    const matchIndex = (activeMatch == null ? void 0 : activeMatch.highlightIndex) ?? 0;
    let labelMatches;
    if (highlight.applyOnLabel) {
      labelMatches = countMatchesInString(
        propertyRecord.property.displayLabel.toLowerCase(),
        highlight.highlightedText
      );
    } else {
      labelMatches = 0;
    }
    const activeMatchIndex = propertyRecord.property.name === propertyName && matchIndex - labelMatches >= 0 ? matchIndex - labelMatches : void 0;
    const highlightCallback = (text) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      HighlightedText,
      {
        text,
        activeMatchIndex,
        searchText: highlight.highlightedText
      }
    );
    return highlightCallback;
  }
}
class PropertyLabelRenderer extends reactExports.PureComponent {
  /** Get React CSS style object based on provided offset from the left side */
  static getStyle(offset) {
    offset = offset ? offset : 0;
    return {
      paddingLeft: offset,
      width: `calc(100% - ${offset}px)`
    };
  }
  render() {
    const title = this.props.tooltip ?? (typeof this.props.children == "string" ? this.props.children : void 0);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: classnames(
          "components-property-label-renderer",
          this.props.renderColon && "components-property-label-renderer-colon"
        ),
        title,
        children: this.props.children
      }
    ) });
  }
}
try {
  PropertyLabelRenderer.displayName = "PropertyLabelRenderer";
  PropertyLabelRenderer.__docgenInfo = { "description": "", "displayName": "PropertyLabelRenderer", "props": { "children": { "defaultValue": null, "description": "Label to be rendered", "name": "children", "required": true, "type": { "name": "string | ReactElement<any, string | JSXElementConstructor<any>>" } }, "renderColon": { "defaultValue": null, "description": "Indicates whether to render a colon after the label", "name": "renderColon", "required": false, "type": { "name": "boolean" } }, "tooltip": { "defaultValue": null, "description": "Custom tooltip for the component.", "name": "tooltip", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class NonPrimitivePropertyLabelRenderer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._onClick = () => {
      if (this.props.isExpanded)
        this.props.onCollapse();
      else
        this.props.onExpand();
    };
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: PropertyLabelRenderer.getStyle(this.props.offset),
        className: `components-nonprimitive-property-label-renderer ${this.props.className ? this.props.className : ""}`,
        onClick: this._onClick,
        role: "presentation",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: this.props.isExpanded ? "components-expanded" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgChevronRight, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyLabelRenderer, { renderColon: this.props.renderColon, children: this.props.children })
        ]
      }
    );
  }
}
try {
  NonPrimitivePropertyLabelRenderer.displayName = "NonPrimitivePropertyLabelRenderer";
  NonPrimitivePropertyLabelRenderer.__docgenInfo = { "description": "A React component that renders a non-primitive property label.\nIt renders an animated arrow with text which expands when label is clicked.", "displayName": "NonPrimitivePropertyLabelRenderer", "props": { "isExpanded": { "defaultValue": null, "description": "", "name": "isExpanded", "required": true, "type": { "name": "boolean" } }, "onExpand": { "defaultValue": null, "description": "", "name": "onExpand", "required": true, "type": { "name": "() => void" } }, "onCollapse": { "defaultValue": null, "description": "", "name": "onCollapse", "required": true, "type": { "name": "() => void" } }, "className": { "defaultValue": null, "description": "Additional class name for the label wrapper", "name": "className", "required": false, "type": { "name": "string" } }, "offset": { "defaultValue": null, "description": "Offset from the left side in pixels.", "name": "offset", "required": false, "type": { "name": "number" } }, "children": { "defaultValue": null, "description": "Label to be rendered", "name": "children", "required": true, "type": { "name": "string | ReactElement<any, string | JSXElementConstructor<any>>" } }, "renderColon": { "defaultValue": null, "description": "Indicates whether to render a colon after the label", "name": "renderColon", "required": false, "type": { "name": "boolean" } }, "tooltip": { "defaultValue": null, "description": "Custom tooltip for the component.", "name": "tooltip", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class PrimitivePropertyLabelRenderer extends reactExports.PureComponent {
  render() {
    const { className, offset, children, ...rest } = this.props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `components-primitive-property-label-renderer ${className ? className : ""}`,
        style: PropertyLabelRenderer.getStyle(offset),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyLabelRenderer, { ...rest, children })
      }
    );
  }
}
try {
  PrimitivePropertyLabelRenderer.displayName = "PrimitivePropertyLabelRenderer";
  PrimitivePropertyLabelRenderer.__docgenInfo = { "description": "A React component that renders a primitive property label", "displayName": "PrimitivePropertyLabelRenderer", "props": { "className": { "defaultValue": null, "description": "Additional class name for the label wrapper", "name": "className", "required": false, "type": { "name": "string" } }, "offset": { "defaultValue": null, "description": "Offset from the left side in pixels.", "name": "offset", "required": false, "type": { "name": "number" } }, "children": { "defaultValue": null, "description": "Label to be rendered", "name": "children", "required": true, "type": { "name": "string | ReactElement<any, string | JSXElementConstructor<any>>" } }, "renderColon": { "defaultValue": null, "description": "Indicates whether to render a colon after the label", "name": "renderColon", "required": false, "type": { "name": "boolean" } }, "tooltip": { "defaultValue": null, "description": "Custom tooltip for the component.", "name": "tooltip", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class ActionButtonList extends reactExports.PureComponent {
  getClassName(orientation) {
    return orientation === Orientation.Horizontal ? "components-property-action-button-list--horizontal" : "components-property-action-button-list--vertical";
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: this.getClassName(this.props.orientation), children: this.props.actionButtonRenderers.map((renderer, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionButtonContainer,
      {
        renderer,
        rendererProps: {
          property: this.props.property,
          isPropertyHovered: this.props.isPropertyHovered
        }
      },
      index
    )) });
  }
}
function ActionButtonContainer(props) {
  const actionButton = props.renderer(props.rendererProps);
  if (!actionButton)
    return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-action-button-container", children: actionButton });
}
try {
  ActionButtonList.displayName = "ActionButtonList";
  ActionButtonList.__docgenInfo = { "description": "ActionButtonList React component.", "displayName": "ActionButtonList", "props": { "orientation": { "defaultValue": null, "description": "Orientation to use for displaying the action buttons", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "property": { "defaultValue": null, "description": "Property that action buttons belong to", "name": "property", "required": true, "type": { "name": "PropertyRecord" } }, "actionButtonRenderers": { "defaultValue": null, "description": "Array of action button renderers", "name": "actionButtonRenderers", "required": true, "type": { "name": "ActionButtonRenderer[]" } }, "isPropertyHovered": { "defaultValue": null, "description": "Indicated whether a property is hovered", "name": "isPropertyHovered", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class PropertyGridColumnStyleProvider {
  constructor(columnInfo) {
    this._minLabelWidth = 0;
    this._minValueWidth = 0;
    this._actionButtonWidth = 0;
    if (!columnInfo) {
      this._isMinimumColumnSizeEnabled = false;
      return;
    }
    this._minLabelWidth = columnInfo.minLabelWidth;
    this._minValueWidth = columnInfo.minValueWidth;
    this._actionButtonWidth = columnInfo.actionButtonWidth;
    this._isMinimumColumnSizeEnabled = columnInfo.isMinimumColumnSizeEnabled;
  }
  get minLabelWidth() {
    return this._minLabelWidth;
  }
  get minValueWidth() {
    return this._minValueWidth;
  }
  get actionButtonWidth() {
    return this._actionButtonWidth;
  }
  get isMinimumColumnSizeEnabled() {
    return this._isMinimumColumnSizeEnabled;
  }
  getStyle(orientation, needActionButtons, ratio, needElementSeparator) {
    switch (orientation) {
      case Orientation.Horizontal:
        return this.getHorizontalStyle(
          needActionButtons,
          ratio,
          needElementSeparator
        );
      case Orientation.Vertical:
        return this.getVerticalStyle(needActionButtons);
      default:
        const unhandledOrientationType = orientation;
        throw new Error(
          `Unhandled orientation type: ${unhandledOrientationType}. Was new orientation added ? `
        );
    }
  }
  /** Join columns together in sequence, filtering out undefined column definitions */
  columnStyleBuilder(columns) {
    columns = columns.filter((el) => el !== void 0);
    return { gridTemplateColumns: columns.join(" ") };
  }
  getHorizontalStyle(needActionButtons, ratio, needElementSeparator) {
    const separatorColumn = needElementSeparator ? "auto" : void 0;
    const actionButtonColumn = needActionButtons ? this.actionButtonWidth ? `${this.actionButtonWidth}px` : "auto" : void 0;
    if (!this.isMinimumColumnSizeEnabled)
      return this.columnStyleBuilder([
        `${ratio * 100}%`,
        separatorColumn,
        "auto",
        actionButtonColumn
      ]);
    const labelColumn = `minmax(${this.minLabelWidth}px, ${ratio * 100}%)`;
    const valueColumn = `minmax(${this.minValueWidth}px, 1fr)`;
    return this.columnStyleBuilder([
      labelColumn,
      separatorColumn,
      valueColumn,
      actionButtonColumn
    ]);
  }
  getVerticalStyle(needActionButtons) {
    return this.columnStyleBuilder([
      "auto",
      needActionButtons ? "auto" : void 0
    ]);
  }
}
class PropertyView extends reactExports.Component {
  constructor(props) {
    super(props);
    this._onClick = () => {
      if (this.props.onClick)
        this.props.onClick(this.props.propertyRecord, this.props.uniqueKey);
    };
    this._onMouseEnter = () => {
      if (this.props.isHoverable)
        this.setState({ isHovered: true });
    };
    this._onMouseLeave = () => {
      if (this.props.isHoverable)
        this.setState({ isHovered: false });
    };
    this._onContextMenu = (e) => {
      if (this.props.onContextMenu) {
        this.props.onContextMenu(this.props.propertyRecord, e);
        e.preventDefault();
      }
      if (this.props.onRightClick) {
        this.props.onRightClick(this.props.propertyRecord, this.props.uniqueKey);
        e.preventDefault();
      }
      return false;
    };
    this.state = {
      isHovered: false
    };
  }
  getClassName(props) {
    let propertyRecordClassName = props.orientation === Orientation.Horizontal ? "components-property-record--horizontal" : "components-property-record--vertical";
    if (props.isSelected)
      propertyRecordClassName += " components--selected";
    if (props.onClick)
      propertyRecordClassName += " components--clickable";
    if (props.isHoverable)
      propertyRecordClassName += " components--hoverable";
    return propertyRecordClassName;
  }
  render() {
    const ratio = this.props.columnRatio ? this.props.columnRatio : 0.25;
    const needElementSeparator = this.props.orientation === Orientation.Horizontal && !!this.props.onColumnRatioChanged;
    const needActionButtons = !!this.props.actionButtonRenderers;
    const columnsStyleProvider = new PropertyGridColumnStyleProvider(
      this.props.columnInfo
    );
    const renderValueElement = !!(this.props.valueElement || this.props.valueElementRenderer);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: columnsStyleProvider.getStyle(
          this.props.orientation,
          needActionButtons,
          ratio,
          needElementSeparator
        ),
        className: this.getClassName(this.props),
        onClick: this._onClick,
        onContextMenu: this._onContextMenu,
        onMouseEnter: this._onMouseEnter,
        onMouseLeave: this._onMouseLeave,
        role: "presentation",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-property-record-label", children: this.props.labelElement }),
          needElementSeparator ? (
            // eslint-disable-next-line deprecation/deprecation
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ElementSeparator,
              {
                style: { margin: 0 },
                movableArea: this.props.width,
                onRatioChanged: this.props.onColumnRatioChanged,
                ratio,
                orientation: this.props.orientation,
                isResizeHandleHovered: this.props.isResizeHandleHovered,
                onResizeHandleHoverChanged: this.props.onResizeHandleHoverChanged,
                isResizeHandleBeingDragged: this.props.isResizeHandleBeingDragged,
                onResizeHandleDragChanged: this.props.onResizeHandleDragChanged
              }
            )
          ) : void 0,
          renderValueElement ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-property-record-value", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: this.props.valueElementRenderer ? this.props.valueElementRenderer() : this.props.valueElement }) }) : void 0,
          this.props.actionButtonRenderers ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButtonList,
            {
              orientation: this.props.orientation,
              property: this.props.propertyRecord,
              isPropertyHovered: this.state.isHovered,
              actionButtonRenderers: this.props.actionButtonRenderers
            }
          ) : void 0
        ]
      }
    );
  }
}
try {
  PropertyView.displayName = "PropertyView";
  PropertyView.__docgenInfo = { "description": "A React component that renders property as label/value pair", "displayName": "PropertyView", "props": { "labelElement": { "defaultValue": null, "description": "Property label as a React element", "name": "labelElement", "required": true, "type": { "name": "ReactNode" } }, "valueElement": { "defaultValue": null, "description": "Property value as a React element", "name": "valueElement", "required": false, "type": { "name": "ReactNode" } }, "valueElementRenderer": { "defaultValue": null, "description": "Render callback for property value. If specified, `valueElement` is ignored", "name": "valueElementRenderer", "required": false, "type": { "name": "(() => ReactNode)" } }, "propertyRecord": { "defaultValue": null, "description": "PropertyRecord to render", "name": "propertyRecord", "required": true, "type": { "name": "PropertyRecord" } }, "uniqueKey": { "defaultValue": null, "description": "Unique string, that identifies this property component. Should be used if onClick or onRightClick are provided", "name": "uniqueKey", "required": false, "type": { "name": "string" } }, "orientation": { "defaultValue": null, "description": "Orientation to use for displaying the property", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "isSelected": { "defaultValue": null, "description": "Controls component selection", "name": "isSelected", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Called when property gets clicked. If undefined, clicking is disabled", "name": "onClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onRightClick": { "defaultValue": null, "description": "Called when property gets right clicked. If undefined, right clicking is not working", "name": "onRightClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onContextMenu": { "defaultValue": null, "description": "Called to show a context menu for properties", "name": "onContextMenu", "required": false, "type": { "name": "((property: PropertyRecord, e: MouseEvent<Element, MouseEvent>) => void)" } }, "columnRatio": { "defaultValue": null, "description": "Ratio between label and value cells", "name": "columnRatio", "required": false, "type": { "name": "number" } }, "onColumnRatioChanged": { "defaultValue": null, "description": "Callback to column ratio changed event", "name": "onColumnRatioChanged", "required": false, "type": { "name": "((ratio: number) => void | { ratio: number; })" } }, "isHoverable": { "defaultValue": null, "description": "Indicates that properties have *hover* effect", "name": "isHoverable", "required": false, "type": { "name": "boolean" } }, "isSelectable": { "defaultValue": null, "description": "Indicates that properties can be selected", "name": "isSelectable", "required": false, "type": { "name": "boolean" } }, "width": { "defaultValue": null, "description": "Width of the whole property element", "name": "width", "required": false, "type": { "name": "number" } }, "actionButtonRenderers": { "defaultValue": null, "description": "Array of action button renderers", "name": "actionButtonRenderers", "required": false, "type": { "name": "ActionButtonRenderer[]" } }, "isResizeHandleHovered": { "defaultValue": null, "description": "Is resize handle hovered", "name": "isResizeHandleHovered", "required": false, "type": { "name": "boolean" } }, "onResizeHandleHoverChanged": { "defaultValue": null, "description": "Callback to hover event change", "name": "onResizeHandleHoverChanged", "required": false, "type": { "name": "((isHovered: boolean) => void)" } }, "isResizeHandleBeingDragged": { "defaultValue": null, "description": "Is resize handle being dragged", "name": "isResizeHandleBeingDragged", "required": false, "type": { "name": "boolean" } }, "onResizeHandleDragChanged": { "defaultValue": null, "description": "Callback to drag event change", "name": "onResizeHandleDragChanged", "required": false, "type": { "name": "((isDragStarted: boolean) => void)" } }, "columnInfo": { "defaultValue": null, "description": "Information for styling property grid columns", "name": "columnInfo", "required": false, "type": { "name": "PropertyGridColumnInfo" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function CustomizablePropertyRenderer(props) {
  var _a3, _b2;
  const { indentation, highlight, ...passthroughProps } = props;
  const displayLabel = props.propertyRecord.property.displayLabel;
  const offset = CommonPropertyRenderer.getLabelOffset(
    indentation,
    passthroughProps.orientation,
    passthroughProps.width,
    passthroughProps.columnRatio,
    (_a3 = passthroughProps.columnInfo) == null ? void 0 : _a3.minLabelWidth
  );
  const activeMatchIndex = props.propertyRecord.property.name === ((_b2 = highlight == null ? void 0 : highlight.activeHighlight) == null ? void 0 : _b2.highlightedItemIdentifier) ? highlight.activeHighlight.highlightIndex : void 0;
  const label = highlight ? HighlightedText({
    text: displayLabel,
    searchText: highlight.highlightedText,
    activeMatchIndex
  }) : displayLabel;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PropertyView,
    {
      ...passthroughProps,
      labelElement: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PrimitivePropertyLabelRenderer,
        {
          offset,
          renderColon: props.orientation === Orientation.Horizontal,
          tooltip: displayLabel,
          children: label
        }
      )
    }
  );
}
try {
  CustomizablePropertyRenderer.displayName = "CustomizablePropertyRenderer";
  CustomizablePropertyRenderer.__docgenInfo = { "description": "React Component that renders customizable properties", "displayName": "CustomizablePropertyRenderer", "props": { "valueElement": { "defaultValue": null, "description": "Property value as a React element", "name": "valueElement", "required": false, "type": { "name": "ReactNode" } }, "valueElementRenderer": { "defaultValue": null, "description": "Render callback for property value. If specified, `valueElement` is ignored", "name": "valueElementRenderer", "required": false, "type": { "name": "(() => ReactNode)" } }, "indentation": { "defaultValue": null, "description": "Multiplier of how much the property is indented to the right", "name": "indentation", "required": false, "type": { "name": "number" } }, "highlight": { "defaultValue": null, "description": "Properties used for highlighting", "name": "highlight", "required": false, "type": { "name": "HighlightingComponentProps" } }, "propertyRecord": { "defaultValue": null, "description": "PropertyRecord to render", "name": "propertyRecord", "required": true, "type": { "name": "PropertyRecord" } }, "uniqueKey": { "defaultValue": null, "description": "Unique string, that identifies this property component. Should be used if onClick or onRightClick are provided", "name": "uniqueKey", "required": false, "type": { "name": "string" } }, "orientation": { "defaultValue": null, "description": "Orientation to use for displaying the property", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "isSelected": { "defaultValue": null, "description": "Controls component selection", "name": "isSelected", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Called when property gets clicked. If undefined, clicking is disabled", "name": "onClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onRightClick": { "defaultValue": null, "description": "Called when property gets right clicked. If undefined, right clicking is not working", "name": "onRightClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onContextMenu": { "defaultValue": null, "description": "Called to show a context menu for properties", "name": "onContextMenu", "required": false, "type": { "name": "((property: PropertyRecord, e: MouseEvent<Element, MouseEvent>) => void)" } }, "columnRatio": { "defaultValue": null, "description": "Ratio between label and value cells", "name": "columnRatio", "required": false, "type": { "name": "number" } }, "onColumnRatioChanged": { "defaultValue": null, "description": "Callback to column ratio changed event", "name": "onColumnRatioChanged", "required": false, "type": { "name": "((ratio: number) => void | { ratio: number; })" } }, "isHoverable": { "defaultValue": null, "description": "Indicates that properties have *hover* effect", "name": "isHoverable", "required": false, "type": { "name": "boolean" } }, "isSelectable": { "defaultValue": null, "description": "Indicates that properties can be selected", "name": "isSelectable", "required": false, "type": { "name": "boolean" } }, "width": { "defaultValue": null, "description": "Width of the whole property element", "name": "width", "required": false, "type": { "name": "number" } }, "actionButtonRenderers": { "defaultValue": null, "description": "Array of action button renderers", "name": "actionButtonRenderers", "required": false, "type": { "name": "ActionButtonRenderer[]" } }, "isResizeHandleHovered": { "defaultValue": null, "description": "Is resize handle hovered", "name": "isResizeHandleHovered", "required": false, "type": { "name": "boolean" } }, "onResizeHandleHoverChanged": { "defaultValue": null, "description": "Callback to hover event change", "name": "onResizeHandleHoverChanged", "required": false, "type": { "name": "((isHovered: boolean) => void)" } }, "isResizeHandleBeingDragged": { "defaultValue": null, "description": "Is resize handle being dragged", "name": "isResizeHandleBeingDragged", "required": false, "type": { "name": "boolean" } }, "onResizeHandleDragChanged": { "defaultValue": null, "description": "Callback to drag event change", "name": "onResizeHandleDragChanged", "required": false, "type": { "name": "((isDragStarted: boolean) => void)" } }, "columnInfo": { "defaultValue": null, "description": "Information for styling property grid columns", "name": "columnInfo", "required": false, "type": { "name": "PropertyGridColumnInfo" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class PrimitivePropertyRenderer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomizablePropertyRenderer, { ...this.props });
  }
}
try {
  PrimitivePropertyRenderer.displayName = "PrimitivePropertyRenderer";
  PrimitivePropertyRenderer.__docgenInfo = { "description": "React Component that renders primitive properties", "displayName": "PrimitivePropertyRenderer", "props": { "valueElement": { "defaultValue": null, "description": "Property value as a React element", "name": "valueElement", "required": false, "type": { "name": "ReactNode" } }, "valueElementRenderer": { "defaultValue": null, "description": "Render callback for property value. If specified, `valueElement` is ignored", "name": "valueElementRenderer", "required": false, "type": { "name": "(() => ReactNode)" } }, "indentation": { "defaultValue": null, "description": "Multiplier of how much the property is indented to the right", "name": "indentation", "required": false, "type": { "name": "number" } }, "highlight": { "defaultValue": null, "description": "Properties used for highlighting", "name": "highlight", "required": false, "type": { "name": "HighlightingComponentProps" } }, "propertyRecord": { "defaultValue": null, "description": "PropertyRecord to render", "name": "propertyRecord", "required": true, "type": { "name": "PropertyRecord" } }, "uniqueKey": { "defaultValue": null, "description": "Unique string, that identifies this property component. Should be used if onClick or onRightClick are provided", "name": "uniqueKey", "required": false, "type": { "name": "string" } }, "orientation": { "defaultValue": null, "description": "Orientation to use for displaying the property", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "isSelected": { "defaultValue": null, "description": "Controls component selection", "name": "isSelected", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Called when property gets clicked. If undefined, clicking is disabled", "name": "onClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onRightClick": { "defaultValue": null, "description": "Called when property gets right clicked. If undefined, right clicking is not working", "name": "onRightClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onContextMenu": { "defaultValue": null, "description": "Called to show a context menu for properties", "name": "onContextMenu", "required": false, "type": { "name": "((property: PropertyRecord, e: MouseEvent<Element, MouseEvent>) => void)" } }, "columnRatio": { "defaultValue": null, "description": "Ratio between label and value cells", "name": "columnRatio", "required": false, "type": { "name": "number" } }, "onColumnRatioChanged": { "defaultValue": null, "description": "Callback to column ratio changed event", "name": "onColumnRatioChanged", "required": false, "type": { "name": "((ratio: number) => void | { ratio: number; })" } }, "isHoverable": { "defaultValue": null, "description": "Indicates that properties have *hover* effect", "name": "isHoverable", "required": false, "type": { "name": "boolean" } }, "isSelectable": { "defaultValue": null, "description": "Indicates that properties can be selected", "name": "isSelectable", "required": false, "type": { "name": "boolean" } }, "width": { "defaultValue": null, "description": "Width of the whole property element", "name": "width", "required": false, "type": { "name": "number" } }, "actionButtonRenderers": { "defaultValue": null, "description": "Array of action button renderers", "name": "actionButtonRenderers", "required": false, "type": { "name": "ActionButtonRenderer[]" } }, "isResizeHandleHovered": { "defaultValue": null, "description": "Is resize handle hovered", "name": "isResizeHandleHovered", "required": false, "type": { "name": "boolean" } }, "onResizeHandleHoverChanged": { "defaultValue": null, "description": "Callback to hover event change", "name": "onResizeHandleHoverChanged", "required": false, "type": { "name": "((isHovered: boolean) => void)" } }, "isResizeHandleBeingDragged": { "defaultValue": null, "description": "Is resize handle being dragged", "name": "isResizeHandleBeingDragged", "required": false, "type": { "name": "boolean" } }, "onResizeHandleDragChanged": { "defaultValue": null, "description": "Callback to drag event change", "name": "onResizeHandleDragChanged", "required": false, "type": { "name": "((isDragStarted: boolean) => void)" } }, "columnInfo": { "defaultValue": null, "description": "Information for styling property grid columns", "name": "columnInfo", "required": false, "type": { "name": "PropertyGridColumnInfo" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class PropertyRenderer extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: UiComponents$1.translate("general.loading")
    };
    this._onEditCommit = (args) => {
      if (this.props.onEditCommit)
        this.props.onEditCommit(args);
    };
    this._onEditCancel = () => {
      if (this.props.onEditCancel)
        this.props.onEditCancel();
    };
  }
  static getLabelOffset(indentation, orientation, width, columnRatio, minColumnLabelWidth) {
    return CommonPropertyRenderer.getLabelOffset(
      indentation,
      orientation,
      width,
      columnRatio,
      minColumnLabelWidth
    );
  }
  updateDisplayValue(props) {
    if (props.isEditing) {
      this.updateDisplayValueAsEditor(props);
      return;
    }
    const displayValue = CommonPropertyRenderer.createNewDisplayValue(
      props.orientation,
      props.propertyRecord,
      props.indentation,
      props.propertyValueRendererManager
    );
    this.setState({ displayValue });
  }
  /** Display property record value in an editor */
  updateDisplayValueAsEditor(props) {
    this.setState({
      displayValue: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EditorContainer,
        {
          propertyRecord: props.propertyRecord,
          onCommit: this._onEditCommit,
          onCancel: this._onEditCancel,
          setFocus: true
        }
      )
    });
  }
  componentDidMount() {
    this.updateDisplayValue(this.props);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.propertyRecord !== this.props.propertyRecord || prevProps.isEditing !== this.props.isEditing || prevProps.orientation !== this.props.orientation)
      this.updateDisplayValue(this.props);
  }
  render() {
    const {
      propertyValueRendererManager,
      isEditing,
      onEditCommit,
      onEditCancel,
      ...props
    } = this.props;
    const primitiveRendererProps = {
      ...props,
      valueElement: this.state.displayValue,
      indentation: this.props.indentation
    };
    switch (this.props.propertyRecord.value.valueFormat) {
      case PropertyValueFormat.Primitive:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PrimitivePropertyRenderer, { ...primitiveRendererProps });
      case PropertyValueFormat.Array:
        if (this.props.propertyRecord.value.valueFormat === PropertyValueFormat.Array && this.props.propertyRecord.value.items.length === 0)
          return /* @__PURE__ */ jsxRuntimeExports.jsx(PrimitivePropertyRenderer, { ...primitiveRendererProps });
      case PropertyValueFormat.Struct:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          NonPrimitivePropertyRenderer,
          {
            isCollapsible: true,
            ...primitiveRendererProps
          }
        );
    }
  }
}
try {
  PropertyRenderer.displayName = "PropertyRenderer";
  PropertyRenderer.__docgenInfo = { "description": "A React component that renders properties", "displayName": "PropertyRenderer", "props": { "propertyValueRendererManager": { "defaultValue": null, "description": "Custom value renderer", "name": "propertyValueRendererManager", "required": false, "type": { "name": "PropertyValueRendererManager" } }, "indentation": { "defaultValue": null, "description": "Multiplier of how much the property is indented to the right", "name": "indentation", "required": false, "type": { "name": "number" } }, "isEditing": { "defaultValue": null, "description": "Indicates property is being edited", "name": "isEditing", "required": false, "type": { "name": "boolean" } }, "onEditCommit": { "defaultValue": null, "description": "Called when property edit is committed.", "name": "onEditCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs) => void)" } }, "onEditCancel": { "defaultValue": null, "description": "Called when property edit is cancelled.", "name": "onEditCancel", "required": false, "type": { "name": "(() => void)" } }, "highlight": { "defaultValue": null, "description": "Props used for highlighting.", "name": "highlight", "required": false, "type": { "name": "HighlightingComponentProps" } }, "propertyRecord": { "defaultValue": null, "description": "PropertyRecord to render", "name": "propertyRecord", "required": true, "type": { "name": "PropertyRecord" } }, "uniqueKey": { "defaultValue": null, "description": "Unique string, that identifies this property component. Should be used if onClick or onRightClick are provided", "name": "uniqueKey", "required": false, "type": { "name": "string" } }, "orientation": { "defaultValue": null, "description": "Orientation to use for displaying the property", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "isSelected": { "defaultValue": null, "description": "Controls component selection", "name": "isSelected", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Called when property gets clicked. If undefined, clicking is disabled", "name": "onClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onRightClick": { "defaultValue": null, "description": "Called when property gets right clicked. If undefined, right clicking is not working", "name": "onRightClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onContextMenu": { "defaultValue": null, "description": "Called to show a context menu for properties", "name": "onContextMenu", "required": false, "type": { "name": "((property: PropertyRecord, e: MouseEvent<Element, MouseEvent>) => void)" } }, "columnRatio": { "defaultValue": null, "description": "Ratio between label and value cells", "name": "columnRatio", "required": false, "type": { "name": "number" } }, "onColumnRatioChanged": { "defaultValue": null, "description": "Callback to column ratio changed event", "name": "onColumnRatioChanged", "required": false, "type": { "name": "((ratio: number) => void | { ratio: number; })" } }, "isHoverable": { "defaultValue": null, "description": "Indicates that properties have *hover* effect", "name": "isHoverable", "required": false, "type": { "name": "boolean" } }, "isSelectable": { "defaultValue": null, "description": "Indicates that properties can be selected", "name": "isSelectable", "required": false, "type": { "name": "boolean" } }, "width": { "defaultValue": null, "description": "Width of the whole property element", "name": "width", "required": false, "type": { "name": "number" } }, "actionButtonRenderers": { "defaultValue": null, "description": "Array of action button renderers", "name": "actionButtonRenderers", "required": false, "type": { "name": "ActionButtonRenderer[]" } }, "isResizeHandleHovered": { "defaultValue": null, "description": "Is resize handle hovered", "name": "isResizeHandleHovered", "required": false, "type": { "name": "boolean" } }, "onResizeHandleHoverChanged": { "defaultValue": null, "description": "Callback to hover event change", "name": "onResizeHandleHoverChanged", "required": false, "type": { "name": "((isHovered: boolean) => void)" } }, "isResizeHandleBeingDragged": { "defaultValue": null, "description": "Is resize handle being dragged", "name": "isResizeHandleBeingDragged", "required": false, "type": { "name": "boolean" } }, "onResizeHandleDragChanged": { "defaultValue": null, "description": "Callback to drag event change", "name": "onResizeHandleDragChanged", "required": false, "type": { "name": "((isDragStarted: boolean) => void)" } }, "columnInfo": { "defaultValue": null, "description": "Information for styling property grid columns", "name": "columnInfo", "required": false, "type": { "name": "PropertyGridColumnInfo" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class NonPrimitivePropertyRenderer extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      /** If it's not collapsible, that means it's expanded by default and can't be collapsed */
      isExpanded: !this.props.isCollapsible || this.props.propertyRecord.autoExpand
    };
    this._onExpanded = () => {
      this.setState({ isExpanded: true });
    };
    this._onCollapsed = () => {
      this.setState({ isExpanded: false });
    };
    this._renderPropertyForItem = (item) => {
      const prefix = this.props.uniqueKey ? this.props.uniqueKey : this.props.propertyRecord.property.name;
      const uniqueKey = `${prefix}_${item.property.name}`;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PropertyRenderer,
        {
          uniqueKey,
          propertyRecord: item,
          indentation: this.props.indentation ? this.props.indentation + 1 : 1,
          orientation: this.props.orientation,
          columnRatio: this.props.columnRatio,
          actionButtonRenderers: this.props.actionButtonRenderers,
          onColumnRatioChanged: this.props.onColumnRatioChanged,
          width: this.props.width,
          isResizeHandleHovered: this.props.isResizeHandleHovered,
          onResizeHandleHoverChanged: this.props.onResizeHandleHoverChanged,
          isResizeHandleBeingDragged: this.props.isResizeHandleBeingDragged,
          onResizeHandleDragChanged: this.props.onResizeHandleDragChanged,
          columnInfo: this.props.columnInfo
        },
        uniqueKey
      );
    };
  }
  getLabel(props, state) {
    const { orientation, indentation, width, columnRatio, columnInfo } = props;
    const minLabelWidth = columnInfo == null ? void 0 : columnInfo.minLabelWidth;
    const offset = CommonPropertyRenderer.getLabelOffset(
      indentation,
      orientation,
      width,
      columnRatio,
      minLabelWidth
    );
    let displayLabel = props.propertyRecord.property.displayLabel;
    if (this.props.propertyRecord.value.valueFormat === PropertyValueFormat.Array)
      displayLabel = `${displayLabel} (${this.props.propertyRecord.value.items.length})`;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      NonPrimitivePropertyLabelRenderer,
      {
        isExpanded: !!state.isExpanded,
        onExpand: this._onExpanded,
        onCollapse: this._onCollapsed,
        offset,
        renderColon: false,
        children: displayLabel
      }
    );
  }
  overrideArrayChildrenNames(items) {
    const modifiedProperties = items.map(
      (item, index) => {
        const newProperty = { ...item.property };
        newProperty.displayLabel = `[${index + 1}]`;
        newProperty.name = `${newProperty.name}_${index}`;
        return new PropertyRecord(item.value, newProperty);
      }
    );
    return modifiedProperties;
  }
  render() {
    let items = this.props.propertyRecord.getChildrenRecords();
    if (this.props.propertyRecord.value.valueFormat === PropertyValueFormat.Array)
      items = this.overrideArrayChildrenNames(items);
    const { indentation, ...props } = this.props;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      this.props.isCollapsible ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        PropertyView,
        {
          labelElement: this.getLabel(this.props, this.state),
          ...props
        }
      ) : void 0,
      this.state.isExpanded ? items.map(this._renderPropertyForItem) : void 0
    ] });
  }
}
try {
  NonPrimitivePropertyRenderer.displayName = "NonPrimitivePropertyRenderer";
  NonPrimitivePropertyRenderer.__docgenInfo = { "description": "React Component that renders struct and array properties", "displayName": "NonPrimitivePropertyRenderer", "props": { "isCollapsible": { "defaultValue": null, "description": "Can struct/array property be collapsed", "name": "isCollapsible", "required": false, "type": { "name": "boolean" } }, "valueElement": { "defaultValue": null, "description": "Property value as a React element", "name": "valueElement", "required": false, "type": { "name": "ReactNode" } }, "valueElementRenderer": { "defaultValue": null, "description": "Render callback for property value. If specified, `valueElement` is ignored", "name": "valueElementRenderer", "required": false, "type": { "name": "(() => ReactNode)" } }, "indentation": { "defaultValue": null, "description": "Multiplier of how much the property is indented to the right", "name": "indentation", "required": false, "type": { "name": "number" } }, "highlight": { "defaultValue": null, "description": "Properties used for highlighting", "name": "highlight", "required": false, "type": { "name": "HighlightingComponentProps" } }, "propertyRecord": { "defaultValue": null, "description": "PropertyRecord to render", "name": "propertyRecord", "required": true, "type": { "name": "PropertyRecord" } }, "uniqueKey": { "defaultValue": null, "description": "Unique string, that identifies this property component. Should be used if onClick or onRightClick are provided", "name": "uniqueKey", "required": false, "type": { "name": "string" } }, "orientation": { "defaultValue": null, "description": "Orientation to use for displaying the property", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "isSelected": { "defaultValue": null, "description": "Controls component selection", "name": "isSelected", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Called when property gets clicked. If undefined, clicking is disabled", "name": "onClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onRightClick": { "defaultValue": null, "description": "Called when property gets right clicked. If undefined, right clicking is not working", "name": "onRightClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onContextMenu": { "defaultValue": null, "description": "Called to show a context menu for properties", "name": "onContextMenu", "required": false, "type": { "name": "((property: PropertyRecord, e: MouseEvent<Element, MouseEvent>) => void)" } }, "columnRatio": { "defaultValue": null, "description": "Ratio between label and value cells", "name": "columnRatio", "required": false, "type": { "name": "number" } }, "onColumnRatioChanged": { "defaultValue": null, "description": "Callback to column ratio changed event", "name": "onColumnRatioChanged", "required": false, "type": { "name": "((ratio: number) => void | { ratio: number; })" } }, "isHoverable": { "defaultValue": null, "description": "Indicates that properties have *hover* effect", "name": "isHoverable", "required": false, "type": { "name": "boolean" } }, "isSelectable": { "defaultValue": null, "description": "Indicates that properties can be selected", "name": "isSelectable", "required": false, "type": { "name": "boolean" } }, "width": { "defaultValue": null, "description": "Width of the whole property element", "name": "width", "required": false, "type": { "name": "number" } }, "actionButtonRenderers": { "defaultValue": null, "description": "Array of action button renderers", "name": "actionButtonRenderers", "required": false, "type": { "name": "ActionButtonRenderer[]" } }, "isResizeHandleHovered": { "defaultValue": null, "description": "Is resize handle hovered", "name": "isResizeHandleHovered", "required": false, "type": { "name": "boolean" } }, "onResizeHandleHoverChanged": { "defaultValue": null, "description": "Callback to hover event change", "name": "onResizeHandleHoverChanged", "required": false, "type": { "name": "((isHovered: boolean) => void)" } }, "isResizeHandleBeingDragged": { "defaultValue": null, "description": "Is resize handle being dragged", "name": "isResizeHandleBeingDragged", "required": false, "type": { "name": "boolean" } }, "onResizeHandleDragChanged": { "defaultValue": null, "description": "Callback to drag event change", "name": "onResizeHandleDragChanged", "required": false, "type": { "name": "((isDragStarted: boolean) => void)" } }, "columnInfo": { "defaultValue": null, "description": "Information for styling property grid columns", "name": "columnInfo", "required": false, "type": { "name": "PropertyGridColumnInfo" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class TableNonPrimitiveValueRenderer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._onClick = () => {
      if (!this.props.onDialogOpen)
        return;
      const dialogState = {
        content: this.props.dialogContents,
        title: this.props.dialogTitle
      };
      this.props.onDialogOpen(dialogState);
    };
  }
  // TODO: Enable, when table gets refactored
  // Disabled fancy tooltips, because table controls it's state.
  // But, because everything is in table state and there is no shouldComponentUpdate,
  // tooltips cause rerender of the whole table
  // private _showTooltip = () => {
  //   if (!this.props.onPopupShow)
  //     return;
  //   const buttonElement = this._buttonRef.current;
  //   if (!buttonElement)
  //     return;
  //   const buttonBox = buttonElement.getBoundingClientRect();
  //   const popupState: PropertyPopupState = {
  //     fixedPosition: {
  //       top: buttonBox.top - 10,
  //       left: buttonBox.left + buttonBox.width / 2,
  //     },
  //     content:
  //       <span className="components-table-value-popup">
  //         {`View ${this.props.buttonLabel} in more detail.`}
  //       </span>,
  //   };
  //   this.props.onPopupShow(popupState);
  // }
  // private _hideTooltip = () => {
  //   if (this.props.onPopupHide)
  //     this.props.onPopupHide();
  // }
  render() {
    return (
      // eslint-disable-next-line deprecation/deprecation
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UnderlinedButton,
        {
          className: "components-table-value-button",
          onClick: this._onClick,
          title: `View ${this.props.buttonLabel} in more detail.`,
          children: this.props.buttonLabel
        }
      )
    );
  }
}
try {
  TableNonPrimitiveValueRenderer.displayName = "TableNonPrimitiveValueRenderer";
  TableNonPrimitiveValueRenderer.__docgenInfo = { "description": "A React component that renders non primitive values as a button with text.\nWhen clicked, a dialog appears that shows the value in greater detail.", "displayName": "TableNonPrimitiveValueRenderer", "props": { "dialogTitle": { "defaultValue": null, "description": "Title of the dialog that shows property in more detail.", "name": "dialogTitle", "required": true, "type": { "name": "string" } }, "dialogContents": { "defaultValue": null, "description": "Contents of the dialog. Should be the property record shown in more detail.", "name": "dialogContents", "required": true, "type": { "name": "ReactNode" } }, "buttonLabel": { "defaultValue": null, "description": "Text that will be rendered in the table cell, in other words - Property value", "name": "buttonLabel", "required": true, "type": { "name": "string" } }, "onDialogOpen": { "defaultValue": null, "description": "Callback to request for dialog to be opened.", "name": "onDialogOpen", "required": false, "type": { "name": "((dialogState: PropertyDialogState) => void)" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class TableArrayValueRenderer extends reactExports.PureComponent {
  getButtonLabel(props) {
    const value = props.propertyRecord.value;
    return value.items.length !== 0 ? `${value.itemsTypeName}[${value.items.length}]` : "[]";
  }
  getDialogContents() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      NonPrimitivePropertyRenderer,
      {
        uniqueKey: `table_array_${this.props.propertyRecord.property.name}`,
        orientation: this.props.orientation,
        propertyRecord: this.props.propertyRecord
      }
    );
  }
  render() {
    const typeName = this.props.propertyRecord.value.itemsTypeName;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TableNonPrimitiveValueRenderer,
      {
        buttonLabel: this.getButtonLabel(this.props),
        dialogContents: this.getDialogContents(),
        dialogTitle: `Array of type "${typeName}"`,
        onDialogOpen: this.props.onDialogOpen
      }
    );
  }
}
try {
  TableArrayValueRenderer.displayName = "TableArrayValueRenderer";
  TableArrayValueRenderer.__docgenInfo = { "description": "A react component which renders array property value as a button with text", "displayName": "TableArrayValueRenderer", "props": { "propertyRecord": { "defaultValue": null, "description": "Property record", "name": "propertyRecord", "required": true, "type": { "name": "PropertyRecord" } }, "orientation": { "defaultValue": null, "description": "Orientation of the rendered property", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "onDialogOpen": { "defaultValue": null, "description": "Callback to request for dialog to be opened.", "name": "onDialogOpen", "required": false, "type": { "name": "((dialogState: PropertyDialogState) => void)" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const withContextStyle = (node, context) => {
  if (!context || !context.style)
    return node;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: context.style, children: node });
};
try {
  withContextStyle.displayName = "withContextStyle";
  withContextStyle.__docgenInfo = { "description": "Wraps a React component with a span element with a given style attribute", "displayName": "withContextStyle", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class ArrayPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Array;
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(record, context) {
    const recordItems = record.value.items;
    if (context && context.containerType === PropertyContainerType.Table) {
      return withContextStyle(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableArrayValueRenderer,
          {
            propertyRecord: record,
            onDialogOpen: context.onDialogOpen,
            orientation: context.orientation ? context.orientation : Orientation.Horizontal
          }
        ),
        context
      );
    }
    if (context && context.containerType === PropertyContainerType.PropertyPane) {
      return withContextStyle("", context);
    }
    return withContextStyle(
      recordItems.length !== 0 ? `${record.value.itemsTypeName}[${recordItems.length}]` : `${record.value.itemsTypeName}[]`,
      context
    );
  }
}
try {
  ArrayPropertyValueRenderer.displayName = "ArrayPropertyValueRenderer";
  ArrayPropertyValueRenderer.__docgenInfo = { "description": "Default Array Property Renderer", "displayName": "ArrayPropertyValueRenderer", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class MergedPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return !!record.isMerged && record.value.valueFormat === PropertyValueFormat.Primitive;
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(_record, context) {
    return withContextStyle(UiComponents$1.translate("property.varies"), context);
  }
}
try {
  MergedPropertyValueRenderer.displayName = "MergedPropertyValueRenderer";
  MergedPropertyValueRenderer.__docgenInfo = { "description": "Default Merged Property Renderer", "displayName": "MergedPropertyValueRenderer", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const _PropertyGridCommons = class _PropertyGridCommons {
  static getCurrentOrientation(width, preferredOrientation, isOrientationFixed, horizontalOrientationMinWidth) {
    const orientation = preferredOrientation ?? Orientation.Horizontal;
    if (isOrientationFixed)
      return orientation;
    horizontalOrientationMinWidth = horizontalOrientationMinWidth ?? 300;
    if (width < horizontalOrientationMinWidth)
      return Orientation.Vertical;
    return orientation;
  }
  /**
   * Helper method to handle link clicks
   * @internal
   */
  static handleLinkClick(text) {
    const linksArray = matchLinks(text);
    if (linksArray.length <= 0)
      return;
    const foundLink = linksArray[0];
    if (foundLink && foundLink.url) {
      if (foundLink.schema === "mailto:") {
        location.href = foundLink.url;
      } else {
        const windowOpen = window.open(foundLink.url, "_blank");
        windowOpen == null ? void 0 : windowOpen.focus();
      }
    }
  }
};
_PropertyGridCommons.getLinks = (value) => {
  return matchLinks(value).map(
    (linkInfo) => {
      return { start: linkInfo.index, end: linkInfo.lastIndex };
    }
  );
};
let PropertyGridCommons = _PropertyGridCommons;
function renderTag(text, links, highlight) {
  return (
    // eslint-disable-next-line deprecation/deprecation
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UnderlinedButton,
      {
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          links.onClick(text);
        },
        children: highlight ? highlight(text) : text
      }
    )
  );
}
function matchComparison(matchA, matchB) {
  if (matchA.start > matchB.start)
    return 1;
  if (matchB.start > matchA.start)
    return -1;
  return 0;
}
function renderTextPart(text, highlight) {
  return highlight ? highlight(text) : text;
}
function renderText(text, links, highlight) {
  const { matcher } = links;
  if (!matcher)
    return renderTag(text, links, highlight);
  const matches = matcher(text);
  matches.sort(matchComparison);
  const parts = [];
  let lastIndex = 0;
  for (const match of matches) {
    if (lastIndex > match.start)
      throw new BentleyError(
        BentleyStatus.ERROR,
        "renderText: matcher returned overlapping matches"
      );
    if (lastIndex < match.start)
      parts.push(
        renderTextPart(text.substring(lastIndex, match.start), highlight)
      );
    const anchorText = text.substring(match.start, match.end);
    parts.push(renderTag(anchorText, links, highlight));
    lastIndex = match.end;
  }
  if (text.length > lastIndex)
    parts.push(renderTextPart(text.substring(lastIndex), highlight));
  return parts.map((part, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: part }, index));
}
function renderHighlighted(text, highlight) {
  return highlight(text);
}
const renderLinks = (text, links, highlight) => {
  return renderText(text, links, highlight);
};
const withLinks = (stringValue, links, highlight) => {
  if (links)
    return renderLinks(stringValue, links, highlight);
  if (highlight)
    return renderHighlighted(stringValue, highlight);
  return stringValue;
};
function LinksRenderer(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: withLinks(props.value, props.links, props.highlighter) });
}
try {
  LinksRenderer.displayName = "LinksRenderer";
  LinksRenderer.__docgenInfo = { "description": "React component for rendering string with links.", "displayName": "LinksRenderer", "props": { "value": { "defaultValue": null, "description": "", "name": "value", "required": true, "type": { "name": "string" } }, "links": { "defaultValue": null, "description": "", "name": "links", "required": false, "type": { "name": "LinkElementsInfo" } }, "highlighter": { "defaultValue": null, "description": "", "name": "highlighter", "required": false, "type": { "name": "((text: string) => ReactNode)" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  renderLinks.displayName = "renderLinks";
  renderLinks.__docgenInfo = { "description": "Renders anchor tag by wrapping or splitting provided text", "displayName": "renderLinks", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  withLinks.displayName = "withLinks";
  withLinks.__docgenInfo = { "description": "If record has links, wraps stringValue in them, otherwise returns unchanged stringValue\nOptionally it can highlight text", "displayName": "withLinks", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function convertRecordToString(record) {
  var _a3;
  const primitive = record.value;
  return primitive.displayValue || TypeConverterManager.getConverter(
    record.property.typename,
    (_a3 = record.property.converter) == null ? void 0 : _a3.name
  ).convertPropertyToString(record.property, primitive.value);
}
class PrimitivePropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Primitive;
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(record, context) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PrimitivePropertyValueRendererImpl,
      {
        record,
        context,
        stringValueCalculator: convertRecordToString
      }
    );
  }
}
function PrimitivePropertyValueRendererImpl(props) {
  var _a3;
  const { stringValue, element } = useRenderedStringValue(
    props.record,
    props.stringValueCalculator,
    props.context,
    props.linksHandler
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: (_a3 = props.context) == null ? void 0 : _a3.style, title: stringValue, children: element });
}
const DEFAULT_LINKS_HANDLER = {
  matcher: PropertyGridCommons.getLinks,
  onClick: PropertyGridCommons.handleLinkClick
};
function useRenderedStringValue(record, stringValueCalculator, context, linksHandler) {
  const stringValue = useAsyncValue(stringValueCalculator(record));
  const el = stringValue === void 0 ? context == null ? void 0 : context.defaultValue : /* @__PURE__ */ jsxRuntimeExports.jsx(
    LinksRenderer,
    {
      value: stringValue,
      links: record.links ?? linksHandler ?? DEFAULT_LINKS_HANDLER,
      highlighter: context == null ? void 0 : context.textHighlighter
    }
  );
  return { stringValue, element: el };
}
try {
  PrimitivePropertyValueRendererImpl.displayName = "PrimitivePropertyValueRendererImpl";
  PrimitivePropertyValueRendererImpl.__docgenInfo = { "description": "", "displayName": "PrimitivePropertyValueRendererImpl", "props": { "record": { "defaultValue": null, "description": "", "name": "record", "required": true, "type": { "name": "PropertyRecord" } }, "stringValueCalculator": { "defaultValue": null, "description": "", "name": "stringValueCalculator", "required": true, "type": { "name": "(record: PropertyRecord) => string | Promise<string>" } }, "context": { "defaultValue": null, "description": "", "name": "context", "required": false, "type": { "name": "PropertyValueRendererContext" } }, "linksHandler": { "defaultValue": null, "description": "", "name": "linksHandler", "required": false, "type": { "name": "LinkElementsInfo" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PrimitivePropertyValueRenderer.displayName = "PrimitivePropertyValueRenderer";
  PrimitivePropertyValueRenderer.__docgenInfo = { "description": "Default Primitive Property Renderer", "displayName": "PrimitivePropertyValueRenderer", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  DEFAULT_LINKS_HANDLER.displayName = "DEFAULT_LINKS_HANDLER";
  DEFAULT_LINKS_HANDLER.__docgenInfo = { "description": "Default link handler used for handling records,\nwhich did not have any specified LinkElementsInfo.\n\nDefault matcher matches all URLs using regex.\nDefault onClick opens window or sets location.href with found URL.", "displayName": "DEFAULT_LINKS_HANDLER", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class MultilineTextPropertyValueRenderer {
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Primitive;
  }
  render(record, context) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MultilineTextPropertyValueRendererImpl,
      {
        record,
        context
      }
    );
  }
}
const MultilineTextPropertyValueRendererImpl = (props) => {
  var _a3, _b2, _c2, _d2;
  const { stringValue, element } = useRenderedStringValue(
    props.record,
    convertRecordToString,
    props.context
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MultilineTextRenderer,
    {
      style: (_a3 = props.context) == null ? void 0 : _a3.style,
      stringValue,
      isExpanded: (_b2 = props.context) == null ? void 0 : _b2.isExpanded,
      onExpansionToggled: (_c2 = props.context) == null ? void 0 : _c2.onExpansionToggled,
      onHeightChanged: (_d2 = props.context) == null ? void 0 : _d2.onHeightChanged,
      children: element
    }
  );
};
const MultilineTextRenderer = (props) => {
  const { translate } = useTranslation();
  const spanRef = reactExports.useRef(null);
  const divRef = reactExports.useRef(null);
  const [contentOverflows, setContentOverflows] = reactExports.useState(false);
  reactExports.useLayoutEffect(() => {
    assert(divRef.current !== null && spanRef.current !== null);
    setContentOverflows(
      spanRef.current.clientWidth < spanRef.current.scrollWidth
    );
  });
  const handleExpansionToggleClick = (event) => {
    var _a3;
    (_a3 = props.onExpansionToggled) == null ? void 0 : _a3.call(props);
    event.stopPropagation();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: divRef, className: "multiline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        ref: spanRef,
        className: classnames("content", { expanded: props.isExpanded }),
        style: props.style,
        title: props.isExpanded ? void 0 : props.stringValue,
        children: [
          props.children,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "expand-toggle",
              style: { display: props.isExpanded ? "inline-block" : "none" },
              onClick: handleExpansionToggleClick,
              children: translate("property.collapse")
            }
          )
        ]
      }
    ),
    contentOverflows && !props.isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "expand-toggle", onClick: handleExpansionToggleClick, children: translate("property.expand") })
  ] });
};
try {
  MultilineTextRenderer.displayName = "MultilineTextRenderer";
  MultilineTextRenderer.__docgenInfo = { "description": "", "displayName": "MultilineTextRenderer", "props": { "stringValue": { "defaultValue": null, "description": "", "name": "stringValue", "required": false, "type": { "name": "string" } }, "isExpanded": { "defaultValue": null, "description": "", "name": "isExpanded", "required": false, "type": { "name": "boolean" } }, "onExpansionToggled": { "defaultValue": null, "description": "", "name": "onExpansionToggled", "required": false, "type": { "name": "(() => void)" } }, "onHeightChanged": { "defaultValue": null, "description": "", "name": "onHeightChanged", "required": false, "type": { "name": "((newHeight: number) => void)" } }, "style": { "defaultValue": null, "description": "", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "children": { "defaultValue": null, "description": "Content", "name": "children", "required": false, "type": { "name": "ReactNode" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class TableStructValueRenderer extends reactExports.PureComponent {
  getButtonLabel(props) {
    return `{${props.propertyRecord.property.typename}}`;
  }
  getDialogContents() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      NonPrimitivePropertyRenderer,
      {
        uniqueKey: `table_struct_${this.props.propertyRecord.property.name}`,
        orientation: this.props.orientation,
        propertyRecord: this.props.propertyRecord
      }
    );
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TableNonPrimitiveValueRenderer,
      {
        buttonLabel: this.getButtonLabel(this.props),
        dialogTitle: `Struct of type "${this.props.propertyRecord.property.typename}"`,
        dialogContents: this.getDialogContents(),
        onDialogOpen: this.props.onDialogOpen
      }
    );
  }
}
try {
  TableStructValueRenderer.displayName = "TableStructValueRenderer";
  TableStructValueRenderer.__docgenInfo = { "description": "A react component which renders struct property value as a button with text", "displayName": "TableStructValueRenderer", "props": { "propertyRecord": { "defaultValue": null, "description": "Property record", "name": "propertyRecord", "required": true, "type": { "name": "PropertyRecord" } }, "orientation": { "defaultValue": null, "description": "Orientation of the rendered property", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "onDialogOpen": { "defaultValue": null, "description": "Callback to request for dialog to be opened.", "name": "onDialogOpen", "required": false, "type": { "name": "((dialogState: PropertyDialogState) => void)" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class StructPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Struct;
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(record, context) {
    if (context && context.containerType === PropertyContainerType.Table) {
      return withContextStyle(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableStructValueRenderer,
          {
            propertyRecord: record,
            onDialogOpen: context.onDialogOpen,
            orientation: context.orientation ? context.orientation : Orientation.Horizontal
          }
        ),
        context
      );
    }
    if (context && context.containerType === PropertyContainerType.PropertyPane) {
      return withContextStyle("", context);
    }
    return withContextStyle(`{${record.property.typename}}`, context);
  }
}
try {
  StructPropertyValueRenderer.displayName = "StructPropertyValueRenderer";
  StructPropertyValueRenderer.__docgenInfo = { "description": "Default Struct Property Renderer", "displayName": "StructPropertyValueRenderer", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class UrlPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Primitive && [
      StandardTypeNames.URL,
      StandardTypeNames.String,
      StandardTypeNames.Text
    ].includes(record.property.typename);
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(record, context) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PrimitivePropertyValueRendererImpl,
      {
        record,
        context,
        stringValueCalculator: convertRecordToString,
        linksHandler: URI_PROPERTY_LINK_HANDLER
      }
    );
  }
}
function handleClick(text) {
  if (text.startsWith("mailto:")) {
    location.href = text;
  } else {
    const windowOpen = window.open(text, "_blank");
    windowOpen == null ? void 0 : windowOpen.focus();
  }
}
const URI_PROPERTY_LINK_HANDLER = {
  onClick: handleClick
};
try {
  UrlPropertyValueRenderer.displayName = "UrlPropertyValueRenderer";
  UrlPropertyValueRenderer.__docgenInfo = { "description": "URL property value renderer that renders the whole value as a URL without matching it\nagainst URL regex.", "displayName": "UrlPropertyValueRenderer", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
var PropertyContainerType = /* @__PURE__ */ ((PropertyContainerType2) => {
  PropertyContainerType2["PropertyPane"] = "pane";
  PropertyContainerType2["Table"] = "table";
  PropertyContainerType2["Tree"] = "tree";
  return PropertyContainerType2;
})(PropertyContainerType || {});
class PropertyValueRendererManager {
  constructor() {
    this._propertyRenderers = /* @__PURE__ */ new Map();
    this._defaultPrimitiveValueRenderer = new PrimitivePropertyValueRenderer();
    this._defaultArrayValueRenderer = new ArrayPropertyValueRenderer();
    this._defaultStructValueRenderer = new StructPropertyValueRenderer();
    this._defaultMergedValueRenderer = new MergedPropertyValueRenderer();
  }
  getCustomRenderer(record) {
    if (record.property.renderer && this._propertyRenderers.has(record.property.renderer.name))
      return this._propertyRenderers.get(record.property.renderer.name);
    if (this._defaultMergedValueRenderer.canRender(record))
      return this._defaultMergedValueRenderer;
    if (this._propertyRenderers.has(record.property.typename))
      return this._propertyRenderers.get(record.property.typename);
    return void 0;
  }
  selectRenderer(record) {
    const customRenderer = this.getCustomRenderer(record);
    if (customRenderer)
      return customRenderer;
    switch (record.value.valueFormat) {
      case PropertyValueFormat.Primitive:
        return this._defaultPrimitiveValueRenderer;
      case PropertyValueFormat.Array:
        return this._defaultArrayValueRenderer;
      case PropertyValueFormat.Struct:
        return this._defaultStructValueRenderer;
      default:
        return void 0;
    }
  }
  /** Render property into JSX element */
  render(record, context) {
    const selectedRenderer = this.selectRenderer(record);
    if (!selectedRenderer || !selectedRenderer.canRender(record, context))
      return void 0;
    return selectedRenderer.render(record, context);
  }
  /** Register a specified property type renderer */
  registerRenderer(rendererType, propertyRenderer, overwrite = false) {
    if (!overwrite && this._propertyRenderers.has(rendererType)) {
      throw Error(
        `PropertyValueRendererManager.registerRenderer error: type '${rendererType}' already registered to '${propertyRenderer.constructor.name}'`
      );
    }
    this._propertyRenderers.set(rendererType, propertyRenderer);
  }
  /** Unregister a specified property type renderer */
  unregisterRenderer(rendererType) {
    this._propertyRenderers.delete(rendererType);
  }
  /** Get the specified property type renderer instance */
  getRegisteredRenderer(rendererType) {
    return this._propertyRenderers.get(rendererType);
  }
  /** Check whether a property record has a custom renderer registered that can render it */
  hasCustomRenderer(record) {
    const customRenderer = this.getCustomRenderer(record);
    return !!(customRenderer && customRenderer.canRender(record));
  }
  /** Returns default PropertyValueRendererManager instance */
  static get defaultManager() {
    if (!this._defaultRendererManager)
      this._defaultRendererManager = new PropertyValueRendererManager();
    return this._defaultRendererManager;
  }
}
PropertyValueRendererManager.defaultManager.registerRenderer(
  "url",
  new UrlPropertyValueRenderer()
);
PropertyValueRendererManager.defaultManager.registerRenderer(
  "multiline",
  new MultilineTextPropertyValueRenderer()
);
try {
  PropertyContainerType.displayName = "PropertyContainerType";
  PropertyContainerType.__docgenInfo = { "description": "Types of property containers", "displayName": "PropertyContainerType", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PropertyValueRendererManager.displayName = "PropertyValueRendererManager";
  PropertyValueRendererManager.__docgenInfo = { "description": "Default implementation of property value renderer manager", "displayName": "PropertyValueRendererManager", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PropertyValueRendererManager._defaultRendererManager.displayName = "PropertyValueRendererManager._defaultRendererManager";
  PropertyValueRendererManager._defaultRendererManager.__docgenInfo = { "description": "Default implementation of property value renderer manager", "displayName": "PropertyValueRendererManager._defaultRendererManager", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PropertyValueRendererManager.defaultManager.displayName = "PropertyValueRendererManager.defaultManager";
  PropertyValueRendererManager.defaultManager.__docgenInfo = { "description": "Returns default PropertyValueRendererManager instance", "displayName": "PropertyValueRendererManager.defaultManager", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function getPropertyKey(propertyCategory, propertyRecord) {
  return propertyCategory.name + propertyRecord.property.name;
}
class PropertyList extends reactExports.Component {
  constructor(props) {
    super(props);
    this._listRef = reactExports.createRef();
    this._onEditCommit = (args) => {
      if (this.props.onEditCommit && this.props.category)
        this.props.onEditCommit(args, this.props.category);
    };
  }
  render() {
    const propertyListClassName = classnames(
      this.props.orientation === Orientation.Horizontal ? "components-property-list--horizontal" : "components-property-list--vertical",
      this.props.className
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: propertyListClassName,
        style: this.props.style,
        ref: this._listRef,
        children: this.props.properties.map((propertyRecord) => {
          const key = this.props.category ? getPropertyKey(this.props.category, propertyRecord) : propertyRecord.property.name;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            PropertyRenderer,
            {
              uniqueKey: key,
              isHoverable: this.props.isPropertyHoverEnabled,
              isSelectable: this.props.isPropertySelectionEnabled,
              isSelected: key === this.props.selectedPropertyKey,
              propertyRecord,
              orientation: this.props.orientation,
              onClick: propertyRecord.value.valueFormat === PropertyValueFormat.Primitive ? this.props.onPropertyClicked : void 0,
              onRightClick: propertyRecord.value.valueFormat === PropertyValueFormat.Primitive ? this.props.onPropertyRightClicked : void 0,
              onContextMenu: this.props.onPropertyContextMenu,
              columnRatio: this.props.columnRatio,
              onColumnRatioChanged: this.props.onColumnChanged,
              propertyValueRendererManager: this.props.propertyValueRendererManager,
              isEditing: key === this.props.editingPropertyKey,
              onEditCommit: this._onEditCommit,
              onEditCancel: this.props.onEditCancel,
              width: this.props.width,
              actionButtonRenderers: this.props.actionButtonRenderers,
              isResizeHandleHovered: this.props.isResizeHandleHovered,
              onResizeHandleHoverChanged: this.props.onResizeHandleHoverChanged,
              isResizeHandleBeingDragged: this.props.isResizeHandleBeingDragged,
              onResizeHandleDragChanged: this.props.onResizeHandleDragChanged,
              columnInfo: this.props.columnInfo
            },
            key
          );
        })
      }
    );
  }
}
try {
  getPropertyKey.displayName = "getPropertyKey";
  getPropertyKey.__docgenInfo = { "description": "Get unique key for property record", "displayName": "getPropertyKey", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PropertyList.displayName = "PropertyList";
  PropertyList.__docgenInfo = { "description": "A React component that renders multiple properties within a category as a list.", "displayName": "PropertyList", "props": { "orientation": { "defaultValue": null, "description": "", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "width": { "defaultValue": null, "description": "", "name": "width", "required": true, "type": { "name": "number" } }, "category": { "defaultValue": null, "description": "", "name": "category", "required": false, "type": { "name": "PropertyCategory" } }, "properties": { "defaultValue": null, "description": "", "name": "properties", "required": true, "type": { "name": "PropertyRecord[]" } }, "selectedPropertyKey": { "defaultValue": null, "description": "", "name": "selectedPropertyKey", "required": false, "type": { "name": "string" } }, "onPropertyClicked": { "defaultValue": null, "description": "", "name": "onPropertyClicked", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onPropertyRightClicked": { "defaultValue": null, "description": "", "name": "onPropertyRightClicked", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onPropertyContextMenu": { "defaultValue": null, "description": "", "name": "onPropertyContextMenu", "required": false, "type": { "name": "((property: PropertyRecord, e: MouseEvent<Element, MouseEvent>) => void)" } }, "columnRatio": { "defaultValue": null, "description": "", "name": "columnRatio", "required": false, "type": { "name": "number" } }, "onColumnChanged": { "defaultValue": null, "description": "Callback to column ratio changed event", "name": "onColumnChanged", "required": false, "type": { "name": "((ratio: number) => void | { ratio: number; })" } }, "propertyValueRendererManager": { "defaultValue": null, "description": "", "name": "propertyValueRendererManager", "required": false, "type": { "name": "PropertyValueRendererManager" } }, "editingPropertyKey": { "defaultValue": null, "description": "", "name": "editingPropertyKey", "required": false, "type": { "name": "string" } }, "onEditCommit": { "defaultValue": null, "description": "", "name": "onEditCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs, category: PropertyCategory) => void)" } }, "onEditCancel": { "defaultValue": null, "description": "", "name": "onEditCancel", "required": false, "type": { "name": "(() => void)" } }, "isPropertyHoverEnabled": { "defaultValue": null, "description": "Enables/disables property hovering effect", "name": "isPropertyHoverEnabled", "required": false, "type": { "name": "boolean" } }, "isPropertySelectionEnabled": { "defaultValue": null, "description": "Enables/disables property selection", "name": "isPropertySelectionEnabled", "required": false, "type": { "name": "boolean" } }, "isPropertyRightClickSelectionEnabled": { "defaultValue": null, "description": "Enables/disables property right click selection", "name": "isPropertyRightClickSelectionEnabled", "required": false, "type": { "name": "boolean" } }, "actionButtonRenderers": { "defaultValue": null, "description": "Array of action button renderers", "name": "actionButtonRenderers", "required": false, "type": { "name": "ActionButtonRenderer[]" } }, "isResizeHandleHovered": { "defaultValue": null, "description": "Is resize handle hovered", "name": "isResizeHandleHovered", "required": false, "type": { "name": "boolean" } }, "onResizeHandleHoverChanged": { "defaultValue": null, "description": "Callback to hover event change", "name": "onResizeHandleHoverChanged", "required": false, "type": { "name": "((isHovered: boolean) => void)" } }, "isResizeHandleBeingDragged": { "defaultValue": null, "description": "Is resize handle being dragged", "name": "isResizeHandleBeingDragged", "required": false, "type": { "name": "boolean" } }, "onResizeHandleDragChanged": { "defaultValue": null, "description": "Callback to drag event change", "name": "onResizeHandleDragChanged", "required": false, "type": { "name": "((isDragStarted: boolean) => void)" } }, "columnInfo": { "defaultValue": null, "description": "Information for styling property grid columns", "name": "columnInfo", "required": false, "type": { "name": "PropertyGridColumnInfo" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function FavoritePropertyList(props) {
  const [listWidth, setListWidth] = reactExports.useState();
  const onListResize = reactExports.useCallback(setListWidth, [setListWidth]);
  if (props.propertyData.records.Favorite !== void 0) {
    const propertyValueRendererManager = props.propertyValueRendererManager ?? PropertyValueRendererManager.defaultManager;
    const orientation = props.orientation ?? Orientation.Horizontal;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "components-favorite-property-list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableContainerObserver, { onResize: onListResize }),
      listWidth ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        PropertyList,
        {
          orientation,
          width: listWidth,
          properties: props.propertyData.records.Favorite,
          columnRatio: 1 / 3,
          propertyValueRendererManager
        }
      ) : null
    ] });
  }
  return null;
}
try {
  FavoritePropertyList.displayName = "FavoritePropertyList";
  FavoritePropertyList.__docgenInfo = { "description": "Favorite Property List React component", "displayName": "FavoritePropertyList", "props": { "propertyData": { "defaultValue": null, "description": "", "name": "propertyData", "required": true, "type": { "name": "PropertyData" } }, "propertyValueRendererManager": { "defaultValue": null, "description": "", "name": "propertyValueRendererManager", "required": false, "type": { "name": "PropertyValueRendererManager" } }, "orientation": { "defaultValue": null, "description": "", "name": "orientation", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class ResultSelector extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    this._onClickPrevious = () => {
      if (this.state.selectedResultInEditMode) {
        this._onSelectedResultConfirmed();
        return;
      }
      if (this.state.selectedResultId > 1) {
        this.props.onSelectedChanged(this.state.selectedResultId - 1);
        this.setState((state) => ({
          selectedResultId: state.selectedResultId - 1
        }));
      }
    };
    this._onClickNext = () => {
      if (this.state.selectedResultInEditMode) {
        this._onSelectedResultConfirmed();
        return;
      }
      if (this.state.selectedResultId < this.props.resultCount) {
        this.props.onSelectedChanged(this.state.selectedResultId + 1);
        this.setState((state) => ({
          selectedResultId: state.selectedResultId + 1
        }));
      }
    };
    this._onSelectedResultChanged = (event) => {
      if (event.target.value.length <= this._maxSelectedResultInputLength)
        this.setState({ selectedResultEdit: event.target.value });
    };
    this._onSelectedResultConfirmed = () => {
      let selectedId = +this.state.selectedResultEdit;
      if (selectedId > this.props.resultCount)
        selectedId = this.props.resultCount;
      else if (selectedId < 1)
        selectedId = 1;
      this.setState({
        selectedResultInEditMode: false,
        selectedResultId: selectedId
      });
      this.props.onSelectedChanged(selectedId);
    };
    this._onSelectedResultClick = () => {
      this.setState((state) => ({
        selectedResultInEditMode: true,
        selectedResultEdit: state.selectedResultId.toString()
      }));
    };
    this._onSelectedResultKeyDown = (event) => {
      if (event.key === Key_enum.Key.Enter.valueOf())
        this._onSelectedResultConfirmed();
    };
    this.state = {
      selectedResultId: props.resultCount ? 1 : 0,
      selectedResultEdit: "",
      selectedResultInEditMode: false
    };
  }
  get _maxSelectedResultInputLength() {
    return this.props.resultCount.toString().length;
  }
  componentDidMount() {
    this.props.onSelectedChanged(this.props.resultCount ? 1 : 0);
  }
  componentDidUpdate(prevProps) {
    if (this.props.resultCount !== prevProps.resultCount) {
      this.props.onSelectedChanged(this.props.resultCount ? 1 : 0);
    }
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: classnames(
          "components-result-selector",
          this.props.className
        ),
        style: this.props.style,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: classnames("components-result-selector-button", "icon"),
              "data-testid": "previous-button",
              onClick: this._onClickPrevious,
              disabled: this.props.resultCount <= 0,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgChevronLeft, {}) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              style: { pointerEvents: this.props.resultCount ? "auto" : "none" },
              className: "components-result-selector-current-result",
              onClick: this._onSelectedResultClick,
              role: "presentation",
              children: [
                this.state.selectedResultInEditMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    style: {
                      width: `${this.state.selectedResultEdit.length * 0.6 + 1}em`
                    },
                    value: this.state.selectedResultEdit,
                    onChange: this._onSelectedResultChanged,
                    onBlur: this._onSelectedResultConfirmed,
                    onKeyDown: this._onSelectedResultKeyDown
                  }
                ) : this.state.selectedResultId,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "5px", marginRight: "5px" }, children: UiComponents$1.translate("general.of") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: this.props.resultCount })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "components-result-selector-button icon",
              "data-testid": "next-button",
              onClick: this._onClickNext,
              disabled: this.props.resultCount <= 0,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgChevronRight, {}) })
            }
          )
        ]
      }
    );
  }
}
try {
  ResultSelector.displayName = "ResultSelector";
  ResultSelector.__docgenInfo = { "description": "Component for stepping through results/entries", "displayName": "ResultSelector", "props": { "resultCount": { "defaultValue": null, "description": "Total number of results/entries", "name": "resultCount", "required": true, "type": { "name": "number" } }, "onSelectedChanged": { "defaultValue": null, "description": "Callback to currently selected result/entry change", "name": "onSelectedChanged", "required": true, "type": { "name": "(index: number) => void" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
var FilteringInputStatus = /* @__PURE__ */ ((FilteringInputStatus2) => {
  FilteringInputStatus2[FilteringInputStatus2["ReadyToFilter"] = 0] = "ReadyToFilter";
  FilteringInputStatus2[FilteringInputStatus2["FilteringInProgress"] = 1] = "FilteringInProgress";
  FilteringInputStatus2[FilteringInputStatus2["FilteringFinished"] = 2] = "FilteringFinished";
  return FilteringInputStatus2;
})(FilteringInputStatus || {});
class FilteringInput extends reactExports.PureComponent {
  constructor(props) {
    super(props);
    this._inputElement = reactExports.createRef();
    this._onSearchButtonClick = () => {
      if (!this.state.searchText) {
        this.setState({ searchStarted: false, searchText: "" });
        this.props.onFilterClear();
        return;
      }
      this.props.onFilterStart(this.state.searchText);
      this.setState({ searchStarted: true });
    };
    this._onCancelButtonClick = () => {
      this.setState({ searchStarted: false, searchText: "" });
      this.props.onFilterCancel();
      this.focus();
    };
    this._onClearButtonClick = () => {
      this.setState({ searchStarted: false, searchText: "" });
      this.props.onFilterClear();
      this.focus();
    };
    this._onFilterKeyDown = (e) => {
      if (e.key !== Key_enum.Key.Enter.valueOf())
        return;
      if (!this.state.searchText)
        return;
      this.props.onFilterStart(this.state.searchText);
      this.setState({ searchStarted: true });
      e.stopPropagation();
    };
    this._onInputChanged = (e) => {
      if (this.state.searchStarted) {
        this.props.onFilterCancel();
      }
      this.setState({ searchText: e.target.value, searchStarted: false });
    };
    this.state = {
      searchText: "",
      searchStarted: false,
      resultSelectorKey: 0
    };
  }
  focus() {
    if (this._inputElement.current)
      this._inputElement.current.focus();
  }
  componentDidUpdate(prevProps) {
    if (this.props.resultSelectorProps !== prevProps.resultSelectorProps) {
      this.setState((state) => ({
        resultSelectorKey: state.resultSelectorKey + 1
      }));
    }
  }
  render() {
    const status = this.props.status;
    const searchLabel = UiComponents$1.translate("general.search");
    return (
      // TODO: What is filtering-input-preload-images?
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: classnames(
            "components-filtering-input",
            "filtering-input-preload-images",
            this.props.className
          ),
          style: this.props.style,
          onKeyDown: this._onFilterKeyDown,
          role: "presentation",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "components-filtering-input-input", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "text",
                placeholder: UiComponents$1.translate("filteringInput.placeholder"),
                autoFocus: this.props.autoFocus,
                onKeyDown: this._onFilterKeyDown,
                value: this.state.searchText,
                onChange: this._onInputChanged,
                "aria-label": searchLabel,
                size: "small"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "components-filtering-input-input-components", children: [
              status === 2 && this.props.resultSelectorProps ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                ResultSelector,
                {
                  ...this.props.resultSelectorProps
                },
                this.state.resultSelectorKey
              ) : void 0,
              status === 0 ? (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "icon",
                    onClick: this._onSearchButtonClick,
                    "data-testid": "filter-input-search",
                    role: "button",
                    tabIndex: -1,
                    title: searchLabel,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgSearch, {}) })
                  }
                )
              ) : void 0,
              status === 1 ? (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "icon",
                    onClick: this._onCancelButtonClick,
                    "data-testid": "filter-input-close",
                    role: "button",
                    tabIndex: -1,
                    title: UiComponents$1.translate("dialog.cancel"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgClose, {}) })
                  }
                )
              ) : void 0,
              status === 2 ? (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "components-filtering-input-clear icon",
                    onClick: this._onClearButtonClick,
                    "data-testid": "filter-input-close",
                    role: "button",
                    tabIndex: -1,
                    title: UiComponents$1.translate("general.clear"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgClose, {}) })
                  }
                )
              ) : void 0
            ] })
          ] })
        }
      )
    );
  }
}
try {
  FilteringInputStatus.displayName = "FilteringInputStatus";
  FilteringInputStatus.__docgenInfo = { "description": "Enumeration of possible component contexts", "displayName": "FilteringInputStatus", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  FilteringInputStatus.ReadyToFilter.displayName = "FilteringInputStatus.ReadyToFilter";
  FilteringInputStatus.ReadyToFilter.__docgenInfo = { "description": "Component is ready to filter", "displayName": "FilteringInputStatus.ReadyToFilter", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  FilteringInputStatus.FilteringInProgress.displayName = "FilteringInputStatus.FilteringInProgress";
  FilteringInputStatus.FilteringInProgress.__docgenInfo = { "description": "Component's parent is currently filtering", "displayName": "FilteringInputStatus.FilteringInProgress", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  FilteringInputStatus.FilteringFinished.displayName = "FilteringInputStatus.FilteringFinished";
  FilteringInputStatus.FilteringFinished.__docgenInfo = { "description": "Component's parent has finished filtering", "displayName": "FilteringInputStatus.FilteringFinished", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  FilteringInput.displayName = "FilteringInput";
  FilteringInput.__docgenInfo = { "description": "A helper component for filtering trees and stepping through results", "displayName": "FilteringInput", "props": { "onFilterStart": { "defaultValue": null, "description": "Filtering should start", "name": "onFilterStart", "required": true, "type": { "name": "(searchText: string) => void" } }, "onFilterCancel": { "defaultValue": null, "description": "Filtering is canceled while still in progress", "name": "onFilterCancel", "required": true, "type": { "name": "() => void" } }, "onFilterClear": { "defaultValue": null, "description": "Filtering is cleared after everything's loaded", "name": "onFilterClear", "required": true, "type": { "name": "() => void" } }, "status": { "defaultValue": null, "description": "Tells the component what is the status of filtering.", "name": "status", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }] } }, "resultSelectorProps": { "defaultValue": null, "description": "[[ResultSelector]] React Component properties.\nAttribute should be memoized and updated when [[ResultSelector]] state needs to be reset.\nThis allows resetting the selected active match index back to 0.", "name": "resultSelectorProps", "required": false, "type": { "name": "ResultSelectorProps" } }, "autoFocus": { "defaultValue": null, "description": "Specify that the <input> element should automatically get focus", "name": "autoFocus", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
reactExports.forwardRef(function ForwardRefParsedInput2({
  initialValue,
  formatValue,
  parseString,
  readonly,
  className,
  style,
  onChange
}, ref) {
  const currentValueRef = reactExports.useRef(initialValue);
  const isMountedRef = reactExports.useRef(false);
  const lastFormattedValueRef = reactExports.useRef(formatValue(initialValue));
  const [formattedValue, setFormattedValue] = reactExports.useState(
    () => lastFormattedValueRef.current
  );
  const [hasBadInput, setHasBadInput] = reactExports.useState(false);
  reactExports.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  reactExports.useEffect(() => {
    currentValueRef.current = initialValue;
    const currentFormattedValue = formatValue(currentValueRef.current);
    if (currentFormattedValue !== lastFormattedValueRef.current) {
      lastFormattedValueRef.current = currentFormattedValue;
      setFormattedValue(lastFormattedValueRef.current);
      setHasBadInput(false);
    }
  }, [formatValue, initialValue]);
  const handleChange = reactExports.useCallback(
    (event) => {
      setFormattedValue(event.currentTarget.value);
    },
    []
  );
  const updateValueFromString = reactExports.useCallback(
    (strVal) => {
      if (lastFormattedValueRef.current === strVal)
        return;
      const parseResults = parseString(strVal);
      if (!parseResults.parseError) {
        if (void 0 !== parseResults.value && typeof parseResults.value === "number") {
          const currentValue = parseResults.value;
          if (currentValue !== currentValueRef.current) {
            currentValueRef.current = currentValue;
            onChange && onChange(currentValueRef.current);
          }
          if (isMountedRef.current) {
            lastFormattedValueRef.current = formatValue(currentValue);
            setFormattedValue(lastFormattedValueRef.current);
            setHasBadInput(false);
          }
        }
      } else {
        setHasBadInput(true);
      }
    },
    [formatValue, onChange, parseString]
  );
  const handleBlur = reactExports.useCallback(
    (event) => {
      updateValueFromString(event.target.value);
    },
    [updateValueFromString]
  );
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === Key_enum.Key.Enter.valueOf()) {
        updateValueFromString(event.currentTarget.value);
        event.preventDefault();
      }
      if (event.key === Key_enum.Key.Escape.valueOf()) {
        setFormattedValue(formatValue(currentValueRef.current));
        setHasBadInput(false);
        event.preventDefault();
      }
    },
    [formatValue, updateValueFromString]
  );
  const classNames = classnames(
    className,
    "components-parsed-input",
    hasBadInput && "components-parsed-input-has-error"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      "data-testid": "components-parsed-input",
      ref,
      style,
      className: classNames,
      onKeyDown: handleKeyDown,
      onBlur: handleBlur,
      onChange: handleChange,
      value: formattedValue,
      disabled: readonly,
      size: "small"
    }
  );
});
function LocalizationProvider(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LocalizationProvider$1, { ...props });
}
try {
  LocalizationProvider.displayName = "LocalizationProvider";
  LocalizationProvider.__docgenInfo = { "description": "Provides localization capability to the components.", "displayName": "LocalizationProvider", "props": { "localization": { "defaultValue": null, "description": "", "name": "localization", "required": true, "type": { "name": "Localization" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const PropertyFilterBuilderContext = reactExports.createContext(null);
const PropertyFilterBuilderRuleRenderingContext = reactExports.createContext({});
try {
  PropertyFilterBuilderContext.displayName = "PropertyFilterBuilderContext";
  PropertyFilterBuilderContext.__docgenInfo = { "description": "Context used to store data for rules and rule groups rendered inside [[PropertyFilterBuilder]] component.", "displayName": "PropertyFilterBuilderContext", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PropertyFilterBuilderRuleRenderingContext.displayName = "PropertyFilterBuilderRuleRenderingContext";
  PropertyFilterBuilderRuleRenderingContext.__docgenInfo = { "description": "Context for rendering rules and rule groups inside [[PropertyFilterBuilder]] component.", "displayName": "PropertyFilterBuilderRuleRenderingContext", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function getPropertyFilterBuilderOperators(property2) {
  const typename = property2.typename;
  if (typename === StandardTypeNames.Bool.valueOf() || typename === StandardTypeNames.Boolean.valueOf()) {
    return ["is-true", "is-false"];
  }
  const operators = [
    "is-equal",
    "is-not-equal",
    "is-null",
    "is-not-null"
  ];
  if (typename === StandardTypeNames.Number.valueOf() || typename === StandardTypeNames.Int.valueOf() || typename === StandardTypeNames.Integer.valueOf() || typename === StandardTypeNames.Double.valueOf() || typename === StandardTypeNames.Float.valueOf() || typename === StandardTypeNames.Hex.valueOf() || typename === StandardTypeNames.Hexadecimal.valueOf() || typename === StandardTypeNames.ShortDate.valueOf() || typename === StandardTypeNames.DateTime.valueOf()) {
    return [
      ...operators,
      "greater",
      "greater-or-equal",
      "less",
      "less-or-equal",
      "between",
      "not-between"
    ];
  }
  if (typename === StandardTypeNames.String.valueOf() || typename === StandardTypeNames.Text.valueOf()) {
    return ["like", ...operators];
  }
  return operators;
}
function isUnaryPropertyFilterBuilderOperator(operator) {
  return operator !== "between" && operator !== "not-between" && isUnaryPropertyFilterOperator(operator);
}
function isUnaryPropertyFilterOperator(operator) {
  switch (operator) {
    case "is-true":
    case "is-false":
    case "is-null":
    case "is-not-null":
      return true;
  }
  return false;
}
function PropertyFilterBuilderRuleOperatorRenderer(props) {
  const { operator, property: property2, onChange } = props;
  const availableOperators = reactExports.useMemo(
    () => getPropertyFilterBuilderOperators(property2),
    [property2]
  );
  const selectedOperator = availableOperators.find((op) => op === operator) ?? availableOperators[0];
  reactExports.useEffect(() => {
    onChange(selectedOperator);
  }, [onChange, selectedOperator]);
  const availableOptions = reactExports.useMemo(
    () => availableOperators.map((op) => ({
      value: op,
      label: getPropertyFilterBuilderOperatorLabel(op)
    })),
    [availableOperators]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fb-row-condition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      options: availableOptions,
      value: selectedOperator,
      onChange,
      size: "small"
    }
  ) });
}
function getPropertyFilterBuilderOperatorLabel(operator) {
  switch (operator) {
    case "is-true":
      return UiComponents$1.translate("filterBuilder.operators.isTrue");
    case "is-false":
      return UiComponents$1.translate("filterBuilder.operators.isFalse");
    case "is-equal":
      return UiComponents$1.translate("filterBuilder.operators.equal");
    case "is-not-equal":
      return UiComponents$1.translate("filterBuilder.operators.notEqual");
    case "greater":
      return ">";
    case "greater-or-equal":
      return ">=";
    case "less":
      return "<";
    case "less-or-equal":
      return "<=";
    case "like":
      return UiComponents$1.translate("filterBuilder.operators.contains");
    case "is-null":
      return UiComponents$1.translate("filterBuilder.operators.isNull");
    case "is-not-null":
      return UiComponents$1.translate("filterBuilder.operators.isNotNull");
    case "between":
      return UiComponents$1.translate("filterBuilder.operators.between");
    case "not-between":
      return UiComponents$1.translate("filterBuilder.operators.notBetween");
  }
}
try {
  PropertyFilterBuilderRuleOperatorRenderer.displayName = "PropertyFilterBuilderRuleOperatorRenderer";
  PropertyFilterBuilderRuleOperatorRenderer.__docgenInfo = { "description": "Component that renders [[PropertyFilterBuilderRuleRenderer]] operator selector.", "displayName": "PropertyFilterBuilderRuleOperatorRenderer", "props": { "operator": { "defaultValue": null, "description": "Currently selected operator.", "name": "operator", "required": false, "type": { "name": "enum", "value": [{ "value": '"is-true"' }, { "value": '"is-false"' }, { "value": '"is-equal"' }, { "value": '"is-not-equal"' }, { "value": '"greater"' }, { "value": '"greater-or-equal"' }, { "value": '"less"' }, { "value": '"less-or-equal"' }, { "value": '"like"' }, { "value": '"is-null"' }, { "value": '"is-not-null"' }, { "value": '"between"' }, { "value": '"not-between"' }] } }, "property": { "defaultValue": null, "description": "Property used in rule for which this operator will be used.", "name": "property", "required": true, "type": { "name": "PropertyDescription" } }, "onChange": { "defaultValue": null, "description": "Callback that is invoked when selected operator changes.", "name": "onChange", "required": true, "type": { "name": "(operator: PropertyFilterBuilderRuleOperator) => void" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  getPropertyFilterBuilderOperatorLabel.displayName = "getPropertyFilterBuilderOperatorLabel";
  getPropertyFilterBuilderOperatorLabel.__docgenInfo = { "description": "Function that returns display label for [[PropertyFilterBuilderRuleOperator]].", "displayName": "getPropertyFilterBuilderOperatorLabel", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function PropertyFilterBuilderRuleProperty(props) {
  const {
    selectedProperty,
    properties,
    onSelectedPropertyChanged,
    propertyRenderer,
    isDisabled
  } = props;
  const { translate } = useTranslation();
  const selectOptions = reactExports.useMemo(
    () => properties.map((property2) => ({
      id: property2.name,
      label: property2.displayLabel,
      value: property2.name
    })),
    [properties]
  );
  const onPropertyChanged = reactExports.useCallback(
    (name) => {
      onSelectedPropertyChanged(
        properties.find((property2) => property2.name === name)
      );
    },
    [properties, onSelectedPropertyChanged]
  );
  reactExports.useEffect(() => {
    const currentSelectedProperty = properties.find(
      (property2) => property2.name === (selectedProperty == null ? void 0 : selectedProperty.name)
    );
    if ((currentSelectedProperty == null ? void 0 : currentSelectedProperty.name) !== (selectedProperty == null ? void 0 : selectedProperty.name))
      onSelectedPropertyChanged(currentSelectedProperty);
  }, [properties, selectedProperty, onSelectedPropertyChanged]);
  const itemRenderer = reactExports.useCallback(
    (selectOption, { isSelected, id }) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { id, isSelected, children: propertyRenderer ? propertyRenderer(selectOption.value) : selectOption.label }, id);
    },
    [propertyRenderer]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fb-property-name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboBox,
    {
      options: selectOptions,
      onChange: onPropertyChanged,
      value: selectedProperty == null ? void 0 : selectedProperty.name,
      inputProps: {
        placeholder: translate("filterBuilder.chooseProperty"),
        disabled: isDisabled,
        size: "small"
      },
      itemRenderer,
      enableVirtualization: true
    }
  ) });
}
try {
  PropertyFilterBuilderRuleProperty.displayName = "PropertyFilterBuilderRuleProperty";
  PropertyFilterBuilderRuleProperty.__docgenInfo = { "description": "Component that renders [[PropertyFilterBuilderRuleRenderer]] property selector.", "displayName": "PropertyFilterBuilderRuleProperty", "props": { "properties": { "defaultValue": null, "description": "List of available properties.", "name": "properties", "required": true, "type": { "name": "PropertyDescription[]" } }, "selectedProperty": { "defaultValue": null, "description": "Currently selected property.", "name": "selectedProperty", "required": false, "type": { "name": "PropertyDescription" } }, "onSelectedPropertyChanged": { "defaultValue": null, "description": "Callback that is invoked when selected property changes.", "name": "onSelectedPropertyChanged", "required": true, "type": { "name": "(property?: PropertyDescription | undefined) => void" } }, "propertyRenderer": { "defaultValue": null, "description": "Custom renderer for property item inside selector.", "name": "propertyRenderer", "required": false, "type": { "name": "((name: string) => ReactNode)" } }, "isDisabled": { "defaultValue": null, "description": "Specifies whether selector should be disabled or not.", "name": "isDisabled", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
var PropertyFilterBuilderRuleRangeValue;
((PropertyFilterBuilderRuleRangeValue2) => {
  function parse(val) {
    return parseRangeValue(val);
  }
  PropertyFilterBuilderRuleRangeValue2.parse = parse;
  function serialize(val) {
    return {
      valueFormat: PropertyValueFormat.Primitive,
      value: JSON.stringify(val)
    };
  }
  PropertyFilterBuilderRuleRangeValue2.serialize = serialize;
  function isRangeValid({
    from: from2,
    to
  }) {
    if (isNumericValue(from2) && isNumericValue(to)) {
      return from2.value < to.value;
    }
    if (isDateValue(from2) && isDateValue(to)) {
      return new Date(from2.value) < new Date(to.value);
    }
    return false;
  }
  PropertyFilterBuilderRuleRangeValue2.isRangeValid = isRangeValid;
})(PropertyFilterBuilderRuleRangeValue || (PropertyFilterBuilderRuleRangeValue = {}));
function isNumericValue(value) {
  return typeof value.value === "number";
}
function isDateValue(value) {
  return typeof value.value === "string" || value.value instanceof Date;
}
function parseRangeValue(val) {
  if (!val || val.valueFormat !== PropertyValueFormat.Primitive || typeof val.value !== "string") {
    return {
      from: { valueFormat: PropertyValueFormat.Primitive },
      to: { valueFormat: PropertyValueFormat.Primitive }
    };
  }
  try {
    const value = JSON.parse(val.value);
    if (value.from !== void 0 && value.to !== void 0) {
      return value;
    }
  } catch {
  }
  return {
    from: { valueFormat: PropertyValueFormat.Primitive },
    to: { valueFormat: PropertyValueFormat.Primitive }
  };
}
function PropertyFilterBuilderRuleValue(props) {
  const { operator, ...restProps } = props;
  return operator === "between" || operator === "not-between" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBuilderRuleRangeValueRenderer, { ...restProps }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBuilderRulePrimitiveValueRenderer, { ...restProps });
}
function FilterBuilderRulePrimitiveValueRenderer({
  property: property2,
  value,
  onChange
}) {
  const propertyRecord = reactExports.useMemo(() => {
    return new PropertyRecord(
      value ?? { valueFormat: PropertyValueFormat.Primitive },
      property2
    );
  }, [value, property2]);
  const onValueChange = reactExports.useCallback(
    ({ newValue }) => {
      onChange(newValue);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    EditorContainer,
    {
      propertyRecord,
      onCancel: () => {
      },
      onCommit: onValueChange,
      setFocus: false,
      shouldCommitOnChange: false
    }
  );
}
function FilterBuilderRuleRangeValueRenderer({
  property: property2,
  value,
  onChange
}) {
  const { translate } = useTranslation();
  const { from: from2, to } = reactExports.useMemo(() => {
    const rangeValue = PropertyFilterBuilderRuleRangeValue.parse(value);
    return {
      from: new PropertyRecord(rangeValue.from, property2),
      to: new PropertyRecord(rangeValue.to, property2)
    };
  }, [property2, value]);
  const handleFromValue = reactExports.useCallback(
    ({ newValue }) => {
      onChange(getSerializedRangeValue(newValue, to.value));
    },
    [onChange, to]
  );
  const handleToValue = reactExports.useCallback(
    ({ newValue }) => {
      onChange(getSerializedRangeValue(from2.value, newValue));
    },
    [onChange, from2]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Flex,
    {
      className: "rule-value-range",
      display: "inline-flex",
      flexDirection: "row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flex.Item, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditorContainer,
          {
            propertyRecord: from2,
            onCancel: () => {
            },
            onCommit: handleFromValue,
            setFocus: false,
            shouldCommitOnChange: false
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: translate("filterBuilder.operators.and").toLowerCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flex.Item, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditorContainer,
          {
            propertyRecord: to,
            onCancel: () => {
            },
            onCommit: handleToValue,
            setFocus: false,
            shouldCommitOnChange: false
          }
        ) })
      ]
    }
  );
}
function getSerializedRangeValue(from2, to) {
  return PropertyFilterBuilderRuleRangeValue.serialize({
    from: from2.valueFormat === PropertyValueFormat.Primitive ? from2 : { valueFormat: PropertyValueFormat.Primitive },
    to: to.valueFormat === PropertyValueFormat.Primitive ? to : { valueFormat: PropertyValueFormat.Primitive }
  });
}
try {
  PropertyFilterBuilderRuleValue.displayName = "PropertyFilterBuilderRuleValue";
  PropertyFilterBuilderRuleValue.__docgenInfo = { "description": "Component that renders [[PropertyFilterBuilderRuleRenderer]] value input.", "displayName": "PropertyFilterBuilderRuleValue", "props": { "operator": { "defaultValue": null, "description": "Current operator.", "name": "operator", "required": true, "type": { "name": "enum", "value": [{ "value": '"is-true"' }, { "value": '"is-false"' }, { "value": '"is-equal"' }, { "value": '"is-not-equal"' }, { "value": '"greater"' }, { "value": '"greater-or-equal"' }, { "value": '"less"' }, { "value": '"less-or-equal"' }, { "value": '"like"' }, { "value": '"is-null"' }, { "value": '"is-not-null"' }, { "value": '"between"' }, { "value": '"not-between"' }] } }, "value": { "defaultValue": null, "description": "Currently entered value.", "name": "value", "required": false, "type": { "name": "PropertyValue" } }, "property": { "defaultValue": null, "description": "Property used in rule to which this value will be compared to.", "name": "property", "required": true, "type": { "name": "PropertyDescription" } }, "onChange": { "defaultValue": null, "description": "Callback that is invoked when value changes.", "name": "onChange", "required": true, "type": { "name": "(value: PropertyValue) => void" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const PropertyFilterBuilderToolbar = (props) => {
  const { onAddChild, onDelete } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Flex,
    {
      className: "fb-toolbar fb-row-toolbar",
      gap: "0",
      justifyContent: "flex-end",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IconButton,
          {
            size: "small",
            className: "fb-add-rule-button",
            label: translate("filterBuilder.add"),
            styleType: "borderless",
            onClick: onAddChild,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgAdd, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IconButton,
          {
            size: "small",
            className: "fb-remove-rule-button",
            label: translate("filterBuilder.delete"),
            styleType: "borderless",
            onClick: onDelete,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgDelete, {})
          }
        )
      ]
    }
  );
};
try {
  PropertyFilterBuilderToolbar.displayName = "PropertyFilterBuilderToolbar";
  PropertyFilterBuilderToolbar.__docgenInfo = { "description": 'Toolbar displaying the "add" and "delete" row buttons in the filter builder', "displayName": "PropertyFilterBuilderToolbar", "props": { "onAddChild": { "defaultValue": null, "description": "Function to add child of current group.", "name": "onAddChild", "required": true, "type": { "name": "() => void" } }, "onDelete": { "defaultValue": null, "description": "Function to remove child from current group.", "name": "onDelete", "required": true, "type": { "name": "() => void" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function PropertyFilterBuilderRuleRenderer(props) {
  const { path, rule, onRuleAdded } = props;
  const { properties, actions, onRulePropertySelected } = reactExports.useContext(
    PropertyFilterBuilderContext
  );
  const {
    ruleOperatorRenderer,
    ruleValueRenderer,
    propertyRenderer,
    isDisabled
  } = reactExports.useContext(PropertyFilterBuilderRuleRenderingContext);
  const { property: property2, operator, value } = rule;
  const onSelectedPropertyChanged = reactExports.useCallback(
    (newProperty) => {
      actions.setRuleProperty(path, newProperty);
      if (onRulePropertySelected && newProperty)
        onRulePropertySelected(newProperty);
    },
    [path, onRulePropertySelected, actions]
  );
  const onRuleOperatorChange = reactExports.useCallback(
    (newOperator) => {
      actions.setRuleOperator(path, newOperator);
    },
    [path, actions]
  );
  const onRuleValueChange = reactExports.useCallback(
    (newValue) => {
      actions.setRuleValue(path, newValue);
    },
    [path, actions]
  );
  const removeRule = () => actions.removeItem(path);
  const handleRuleAdded = () => {
    actions.addItem([], "RULE");
    onRuleAdded();
  };
  const operatorRenderer = reactExports.useCallback(
    (prop) => {
      if (ruleOperatorRenderer)
        return ruleOperatorRenderer({
          property: prop,
          operator,
          onChange: onRuleOperatorChange
        });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PropertyFilterBuilderRuleOperatorRenderer,
        {
          property: prop,
          onChange: onRuleOperatorChange,
          operator
        }
      );
    },
    [operator, ruleOperatorRenderer, onRuleOperatorChange]
  );
  const valueRenderer = reactExports.useCallback(
    (prop, op) => {
      if (ruleValueRenderer)
        return ruleValueRenderer({
          property: prop,
          value,
          onChange: onRuleValueChange,
          operator: op
        });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PropertyFilterBuilderRuleValue,
        {
          property: prop,
          onChange: onRuleValueChange,
          value,
          operator: op
        }
      );
    },
    [value, ruleValueRenderer, onRuleValueChange]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fb-component-row", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { className: "fb-row-container", gap: "s", alignItems: "flex-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PropertyFilterBuilderRuleProperty,
      {
        properties,
        selectedProperty: rule.property,
        onSelectedPropertyChanged,
        propertyRenderer,
        isDisabled
      }
    ),
    property2 !== void 0 ? operatorRenderer(property2) : null,
    property2 !== void 0 && operator !== void 0 && !isUnaryPropertyFilterBuilderOperator(operator) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fb-property-value", children: [
      valueRenderer(property2, operator),
      rule.errorMessage ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SvgStatusError, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: rule.errorMessage })
      ] }) : null
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PropertyFilterBuilderToolbar,
      {
        onAddChild: handleRuleAdded,
        onDelete: removeRule
      }
    )
  ] }) });
}
try {
  PropertyFilterBuilderRuleRenderer.displayName = "PropertyFilterBuilderRuleRenderer";
  PropertyFilterBuilderRuleRenderer.__docgenInfo = { "description": "Component that renders single rule in [[PropertyFilterBuilder]] component.", "displayName": "PropertyFilterBuilderRuleRenderer", "props": { "path": { "defaultValue": null, "description": "Path from [[PropertyFilterBuilder]] root to this rule.", "name": "path", "required": true, "type": { "name": "string[]" } }, "rule": { "defaultValue": null, "description": "Rule to render.", "name": "rule", "required": true, "type": { "name": "PropertyFilterBuilderRule" } }, "onRuleAdded": { "defaultValue": null, "description": "Function to add rule to group", "name": "onRuleAdded", "required": true, "type": { "name": "() => void" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function isPropertyFilterRuleGroup(filter2) {
  return filter2.rules !== void 0;
}
function isPropertyFilterBuilderRuleGroup(item) {
  return item.items !== void 0;
}
class PropertyFilterBuilderActions {
  constructor(setState) {
    this.setState = setState;
  }
  updateState(updater) {
    this.setState(fn(updater));
  }
  /** Adds new rule or group of rules to the group specified by path. */
  addItem(path, item) {
    this.updateState((state) => {
      const parentGroup = findRuleGroup(state.rootGroup, path);
      if (!parentGroup)
        return;
      if (item === "RULE" || item === "RULE_GROUP") {
        const newItem = item === "RULE_GROUP" ? createEmptyRuleGroup(parentGroup.id) : createEmptyRule(parentGroup.id);
        parentGroup.items.push(newItem);
        return;
      }
      if (isPropertyFilterRuleGroup(item)) {
        const itemId = Guid.createValue();
        const newItem = {
          id: itemId,
          groupId: parentGroup.id,
          operator: item.operator,
          items: item.rules.map((rule) => getRuleGroupItem(rule, itemId))
        };
        parentGroup.items.push(newItem);
        return;
      }
      parentGroup.items.push(getRuleItem(item, parentGroup.id));
    });
  }
  /** Removes item specified by path. */
  removeItem(path) {
    function removeItemFromGroup(state, pathToItem) {
      const pathToParent = pathToItem.slice(0, -1);
      const parentGroup = findRuleGroup(state.rootGroup, pathToParent);
      if (!parentGroup) {
        return;
      }
      const itemId = pathToItem[pathToItem.length - 1];
      const itemIndex = parentGroup.items.findIndex(
        (item) => item.id === itemId
      );
      if (itemIndex === -1) {
        return;
      }
      if (parentGroup.items.length === 1) {
        parentGroup.items[0] = createEmptyRule(parentGroup.id);
        return;
      }
      parentGroup.items.splice(itemIndex, 1);
    }
    this.updateState((state) => {
      removeItemFromGroup(state, path);
    });
  }
  /** Removes all items from root group. */
  removeAllItems() {
    this.updateState((state) => {
      state.rootGroup = createEmptyRuleGroup();
    });
  }
  /** Sets operator of rule group specified by the path. */
  setRuleGroupOperator(path, operator) {
    this.updateState((state) => {
      const group = findRuleGroup(state.rootGroup, path);
      if (!group) {
        return;
      }
      group.operator = operator;
    });
  }
  /** Sets property of rule specified by the path. */
  setRuleProperty(path, property2) {
    this.updateState((state) => {
      const rule = findRule(state.rootGroup, path);
      if (!rule) {
        return;
      }
      rule.property = property2;
      rule.operator = void 0;
      rule.value = void 0;
      rule.errorMessage = void 0;
    });
  }
  /** Sets operator of rule specified by the path. */
  setRuleOperator(path, operator) {
    this.updateState((state) => {
      const rule = findRule(state.rootGroup, path);
      if (!rule) {
        return;
      }
      if (isUnaryPropertyFilterBuilderOperator(operator)) {
        rule.value = void 0;
      }
      if (operator !== rule.operator && !areOperatorsSimilar(operator, rule.operator)) {
        rule.value = void 0;
      }
      rule.operator = operator;
    });
  }
  /** Sets value of rule specified by the path. */
  setRuleValue(path, value) {
    this.updateState((state) => {
      const rule = findRule(state.rootGroup, path);
      if (!rule) {
        return;
      }
      rule.value = value;
    });
  }
  /**
   * Sets error messages of the rules specified by id.
   * If rule id is not present in the map, then its error message will be cleared.
   */
  setRuleErrorMessages(ruleIdsAndErrorMessages) {
    this.updateState((state) => {
      const setErrorMessages = (item) => {
        if (isPropertyFilterBuilderRuleGroup(item)) {
          item.items.forEach((itm) => {
            setErrorMessages(itm);
          });
        } else {
          item.errorMessage = ruleIdsAndErrorMessages.get(item.id);
        }
      };
      setErrorMessages(state.rootGroup);
    });
  }
}
function usePropertyFilterBuilder(props) {
  const { initialFilter, ruleValidator } = props ?? {
    initialFilter: void 0,
    ruleValidator: void 0
  };
  const [state, setState] = reactExports.useState(
    initialFilter ? convertFilterToState(initialFilter) : { rootGroup: createEmptyRuleGroup() }
  );
  const [actions] = reactExports.useState(
    () => new PropertyFilterBuilderActions(setState)
  );
  const buildFilter = reactExports.useCallback(
    (options) => {
      const ruleErrors = validateRules(state.rootGroup, ruleValidator);
      if (!(options == null ? void 0 : options.ignoreErrors)) {
        actions.setRuleErrorMessages(ruleErrors);
      }
      return ruleErrors.size === 0 ? buildPropertyFilter(state.rootGroup) : void 0;
    },
    [state.rootGroup, actions, ruleValidator]
  );
  return { rootGroup: state.rootGroup, actions, buildFilter };
}
function validateRules(rule, ruleValidator) {
  const ruleIdsAndErrorMessages = /* @__PURE__ */ new Map();
  const validateRulesInner = (item) => {
    if (isPropertyFilterBuilderRuleGroup(item)) {
      item.items.forEach((itm) => {
        validateRulesInner(itm);
      });
    } else {
      const errorMessage = ruleValidator ? ruleValidator(item) : defaultPropertyFilterBuilderRuleValidator(item);
      if (errorMessage)
        ruleIdsAndErrorMessages.set(item.id, errorMessage);
    }
  };
  validateRulesInner(rule);
  return ruleIdsAndErrorMessages;
}
function defaultPropertyFilterBuilderRuleValidator(item) {
  if (item.property === void 0 || item.operator === void 0 || isUnaryPropertyFilterBuilderOperator(item.operator)) {
    return void 0;
  }
  if (item.operator === "between" || item.operator === "not-between") {
    return rangeRuleValidator(item.value);
  }
  if (isEmptyValue(item.value)) {
    return UiComponents$1.translate("filterBuilder.errorMessages.emptyValue");
  }
  return void 0;
}
function rangeRuleValidator(value) {
  const range = PropertyFilterBuilderRuleRangeValue.parse(value);
  if (isEmptyValue(range.from) || isEmptyValue(range.to)) {
    return UiComponents$1.translate("filterBuilder.errorMessages.emptyValue");
  }
  if (!PropertyFilterBuilderRuleRangeValue.isRangeValid(range)) {
    return UiComponents$1.translate("filterBuilder.errorMessages.invalidRange");
  }
  return void 0;
}
function buildPropertyFilter(groupItem) {
  if (isPropertyFilterBuilderRuleGroup(groupItem))
    return buildPropertyFilterFromRuleGroup(groupItem);
  return buildPropertyFilterFromRule(groupItem);
}
function buildPropertyFilterFromRuleGroup(rootGroup) {
  const rules = new Array();
  for (const item of rootGroup.items) {
    const rule = buildPropertyFilter(item);
    if (rule)
      rules.push(rule);
  }
  if (rules.length === 0)
    return void 0;
  if (rules.length === 1 && !isPropertyFilterRuleGroup(rules[0])) {
    return rules[0];
  }
  return {
    operator: rootGroup.operator,
    rules
  };
}
function buildPropertyFilterFromRule(rule) {
  const { property: property2, operator, value } = rule;
  if (!property2 || operator === void 0) {
    return void 0;
  }
  if (operator === "between" || operator === "not-between") {
    return buildPropertyFilterFromRangeRule({
      ...rule,
      property: property2,
      operator,
      value
    });
  }
  if (!isUnaryPropertyFilterOperator(operator) && isEmptyValue(value)) {
    return void 0;
  }
  return { property: property2, operator, value };
}
function buildPropertyFilterFromRangeRule(rule) {
  const { property: property2, operator, value } = rule;
  if (!value || value.valueFormat !== PropertyValueFormat.Primitive || typeof value.value !== "string") {
    return void 0;
  }
  const { to, from: from2 } = PropertyFilterBuilderRuleRangeValue.parse(value);
  if (isEmptyValue(to) || isEmptyValue(from2)) {
    return void 0;
  }
  return {
    operator: operator === "between" ? "and" : "or",
    rules: [
      {
        property: property2,
        operator: operator === "between" ? "greater-or-equal" : "less",
        value: from2
      },
      {
        property: property2,
        operator: operator === "between" ? "less-or-equal" : "greater",
        value: to
      }
    ]
  };
}
function createEmptyRule(groupId) {
  return {
    id: Guid.createValue(),
    groupId
  };
}
function createEmptyRuleGroup(groupId) {
  const id = Guid.createValue();
  return {
    id,
    groupId,
    operator: "and",
    items: [createEmptyRule(id)]
  };
}
function findRuleGroup(rootGroup, path) {
  if (path.length === 0)
    return rootGroup;
  const [currentItemId, ...rest] = path;
  const currentItem = rootGroup.items.find((item) => item.id === currentItemId);
  if (!currentItem || !isPropertyFilterBuilderRuleGroup(currentItem))
    return void 0;
  return findRuleGroup(currentItem, rest);
}
function findRule(rootGroup, path) {
  if (path.length === 0)
    return void 0;
  const [currentItemId, ...rest] = path;
  const currentItem = rootGroup.items.find((item) => item.id === currentItemId);
  if (!currentItem)
    return void 0;
  if (isPropertyFilterBuilderRuleGroup(currentItem))
    return findRule(currentItem, rest);
  return currentItem;
}
function getRuleGroupItem(filter2, parentId) {
  const id = Guid.createValue();
  if (isPropertyFilterRuleGroup(filter2)) {
    const rangeRule = getRangeRuleItems(filter2, parentId);
    return rangeRule ? rangeRule : {
      id,
      groupId: parentId,
      operator: filter2.operator,
      items: filter2.rules.map((rule) => getRuleGroupItem(rule, id))
    };
  }
  return getRuleItem(filter2, id);
}
function getRuleItem(filter2, parentId) {
  return {
    id: Guid.createValue(),
    groupId: parentId,
    property: filter2.property,
    operator: filter2.operator,
    value: filter2.value
  };
}
function getRangeRuleItems(group, parentId) {
  if (group.rules.length !== 2) {
    return void 0;
  }
  const [from2, to] = group.rules;
  if (isPropertyFilterRuleGroup(from2) || !from2.value || from2.value.valueFormat !== PropertyValueFormat.Primitive || isPropertyFilterRuleGroup(to) || !to.value || to.value.valueFormat !== PropertyValueFormat.Primitive || from2.property.name !== to.property.name) {
    return void 0;
  }
  if (from2.operator === "greater-or-equal" && to.operator === "less-or-equal" && group.operator === "and") {
    return {
      id: Guid.createValue(),
      groupId: parentId,
      operator: "between",
      property: from2.property,
      value: PropertyFilterBuilderRuleRangeValue.serialize({
        from: from2.value,
        to: to.value
      })
    };
  }
  if (from2.operator === "less" && to.operator === "greater" && group.operator === "or") {
    return {
      id: Guid.createValue(),
      groupId: parentId,
      operator: "not-between",
      property: from2.property,
      value: PropertyFilterBuilderRuleRangeValue.serialize({
        from: from2.value,
        to: to.value
      })
    };
  }
  return void 0;
}
function convertFilterToState(filter2) {
  const id = Guid.createValue();
  if (isPropertyFilterRuleGroup(filter2)) {
    return {
      rootGroup: {
        id,
        operator: filter2.operator,
        items: filter2.rules.map((rule) => getRuleGroupItem(rule, id))
      }
    };
  }
  return {
    rootGroup: {
      id,
      operator: "and",
      items: [getRuleItem(filter2, id)]
    }
  };
}
function isEmptyValue(value) {
  return (value == null ? void 0 : value.valueFormat) !== PropertyValueFormat.Primitive || value.value === void 0 || value.value === "";
}
function areOperatorsSimilar(firstOperator, secondOperator) {
  return isOperatorEqualOrIsNotEqual(firstOperator) && isOperatorEqualOrIsNotEqual(secondOperator) || isInequalityOperator(firstOperator) && isInequalityOperator(secondOperator) || isRangeOperator(firstOperator) && isRangeOperator(secondOperator);
}
function isOperatorEqualOrIsNotEqual(operator) {
  return operator === "is-equal" || operator === "is-not-equal";
}
function isInequalityOperator(operator) {
  return operator === "less" || operator === "less-or-equal" || operator === "greater" || operator === "greater-or-equal";
}
function isRangeOperator(operator) {
  return operator === "between" || operator === "not-between";
}
const PropertyFilterBuilderLogicalOperator = (props) => {
  const { isDisabled, operator, onOperatorChange, className } = props;
  const { translate } = useTranslation();
  const toggle = () => operator === "and" ? "or" : "and";
  const operatorDisplayText = operator === "and" ? translate("filterBuilder.operators.and") : translate("filterBuilder.operators.or");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classnames("fb-logical-operator", className), children: isDisabled ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: operatorDisplayText }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Anchor,
    {
      className: "fb-logical-operator-toggle",
      onClick: () => onOperatorChange(toggle()),
      children: operatorDisplayText
    }
  ) });
};
try {
  PropertyFilterBuilderLogicalOperator.displayName = "PropertyFilterBuilderLogicalOperator";
  PropertyFilterBuilderLogicalOperator.__docgenInfo = { "description": "Component to render the operator inside of the filter builder", "displayName": "PropertyFilterBuilderLogicalOperator", "props": { "isDisabled": { "defaultValue": null, "description": "Allows toggling of operator by clicking operator text.", "name": "isDisabled", "required": false, "type": { "name": "boolean" } }, "operator": { "defaultValue": null, "description": 'Operator to combine FilterBuilderRules. Must be either "and" or "or".', "name": "operator", "required": true, "type": { "name": "enum", "value": [{ "value": '"and"' }, { "value": '"or"' }] } }, "onOperatorChange": { "defaultValue": null, "description": "Callback that is invoked when operator changes.", "name": "onOperatorChange", "required": true, "type": { "name": '(operator: "and" | "or") => void' } }, "className": { "defaultValue": null, "description": "Classname to specify CSS styling", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function PropertyFilterBuilderRuleGroupRenderer(props) {
  const { path, group, isGroupOperatorDisabled } = props;
  const { actions } = reactExports.useContext(PropertyFilterBuilderContext);
  const { onRuleAdded, groupRef } = useRulePropertyFocus(group.items.length);
  const onOperatorChange = reactExports.useCallback(
    (operator) => {
      actions.setRuleGroupOperator(path, operator);
    },
    [path, actions]
  );
  const showOperator = group.items.length > 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Flex,
    {
      ref: groupRef,
      style: { alignSelf: "flex-start" },
      className: "fb-group",
      gap: "0px",
      children: [
        showOperator ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          PropertyFilterBuilderRuleGroupOperator,
          {
            operator: group.operator,
            onChange: onOperatorChange,
            isGroupOperatorDisabled
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fb-wrapper", children: group.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fb-row", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PropertyFilterBuilderGroupOrRule,
          {
            path,
            item,
            onRuleAdded
          }
        ) }, item.id)) })
      ]
    }
  );
}
function PropertyFilterBuilderRuleGroupOperator(props) {
  const { operator, isGroupOperatorDisabled, onChange } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Flex.Item, { alignSelf: "stretch", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PropertyFilterBuilderLogicalOperator,
    {
      className: "fb-group-operator",
      operator,
      onOperatorChange: onChange,
      isDisabled: isGroupOperatorDisabled
    }
  ) });
}
const PropertyFilterBuilderGroupOrRule = reactExports.memo(
  function PropertyFilterBuilderGroupOrRule2({
    path,
    item,
    onRuleAdded
  }) {
    const itemPath = [...path, item.id];
    if (isPropertyFilterBuilderRuleGroup(item))
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyFilterBuilderRuleGroupRenderer, { path: itemPath, group: item });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PropertyFilterBuilderRuleRenderer,
      {
        path: itemPath,
        rule: item,
        onRuleAdded
      }
    );
  }
);
const useRulePropertyFocus = (currentGroupItemsLength) => {
  const previousGroupItemsLength = reactExports.useRef(0);
  const isNewRuleAdded = reactExports.useRef(false);
  const groupRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isNewRuleAdded.current && previousGroupItemsLength.current < currentGroupItemsLength && groupRef.current) {
      const ruleProperties = groupRef.current.querySelectorAll(
        ".fb-property-name input"
      );
      ruleProperties[ruleProperties.length - 1].focus();
      isNewRuleAdded.current = false;
    }
    previousGroupItemsLength.current = currentGroupItemsLength;
  }, [currentGroupItemsLength]);
  return { onRuleAdded: () => isNewRuleAdded.current = true, groupRef };
};
try {
  PropertyFilterBuilderRuleGroupRenderer.displayName = "PropertyFilterBuilderRuleGroupRenderer";
  PropertyFilterBuilderRuleGroupRenderer.__docgenInfo = { "description": "Component that renders group of rules in [[PropertyFilterBuilder]] component.", "displayName": "PropertyFilterBuilderRuleGroupRenderer", "props": { "path": { "defaultValue": null, "description": "Path from [[PropertyFilterBuilder]] root to this rule group.", "name": "path", "required": true, "type": { "name": "string[]" } }, "group": { "defaultValue": null, "description": "Rule group to render.", "name": "group", "required": true, "type": { "name": "PropertyFilterBuilderRuleGroup" } }, "isGroupOperatorDisabled": { "defaultValue": null, "description": "Controls whether the group operator is toggle-able.", "name": "isGroupOperatorDisabled", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PropertyFilterBuilderRuleGroupOperator.displayName = "PropertyFilterBuilderRuleGroupOperator";
  PropertyFilterBuilderRuleGroupOperator.__docgenInfo = { "description": "Component that renders [[PropertyFilterBuilderRuleGroup]] operator selector.", "displayName": "PropertyFilterBuilderRuleGroupOperator", "props": { "operator": { "defaultValue": null, "description": "Currently selected operator.", "name": "operator", "required": true, "type": { "name": "enum", "value": [{ "value": '"and"' }, { "value": '"or"' }] } }, "onChange": { "defaultValue": null, "description": "Callback that is invoked when selected operator changes.", "name": "onChange", "required": true, "type": { "name": '(operator: "and" | "or") => void' } }, "isGroupOperatorDisabled": { "defaultValue": null, "description": "Controls whether the group operator is toggle-able.", "name": "isGroupOperatorDisabled", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function PropertyFilterBuilder(props) {
  const { initialFilter, onFilterChanged } = props;
  const { actions, rootGroup } = usePropertyFilterBuilder({
    initialFilter
  });
  const firstRender = reactExports.useRef(true);
  const filter2 = reactExports.useMemo(
    () => buildPropertyFilter(rootGroup),
    [rootGroup]
  );
  reactExports.useEffect(() => {
    if (!firstRender.current)
      onFilterChanged(filter2);
    firstRender.current = false;
  }, [filter2, onFilterChanged]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PropertyFilterBuilderRenderer,
    {
      ...props,
      actions,
      rootGroup
    }
  );
}
const ROOT_GROUP_PATH = [];
function PropertyFilterBuilderRenderer(props) {
  const {
    rootGroup,
    actions,
    properties,
    onRulePropertySelected,
    ruleOperatorRenderer,
    ruleValueRenderer,
    propertyRenderer,
    isDisabled,
    isGroupOperatorDisabled
  } = props;
  const contextValue = reactExports.useMemo(
    () => ({
      actions,
      properties,
      onRulePropertySelected
    }),
    [actions, properties, onRulePropertySelected]
  );
  const renderingContextValue = reactExports.useMemo(
    () => ({
      ruleOperatorRenderer,
      ruleValueRenderer,
      propertyRenderer,
      isDisabled
    }),
    [ruleOperatorRenderer, ruleValueRenderer, propertyRenderer, isDisabled]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PropertyFilterBuilderRuleRenderingContext.Provider,
    {
      value: renderingContextValue,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyFilterBuilderContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PropertyFilterBuilderRuleGroupRenderer,
        {
          path: ROOT_GROUP_PATH,
          group: rootGroup,
          isGroupOperatorDisabled
        }
      ) })
    }
  );
}
try {
  PropertyFilterBuilder.displayName = "PropertyFilterBuilder";
  PropertyFilterBuilder.__docgenInfo = { "description": "Component for building complex filters. It allows to create filter rules or rule groups based on provided list of properties.", "displayName": "PropertyFilterBuilder", "props": { "onFilterChanged": { "defaultValue": null, "description": "Callback that is invoked when filter changes.", "name": "onFilterChanged", "required": true, "type": { "name": "(filter?: PropertyFilter | undefined) => void" } }, "properties": { "defaultValue": null, "description": "List of properties available to be used in filter rules.", "name": "properties", "required": true, "type": { "name": "PropertyDescription[]" } }, "onRulePropertySelected": { "defaultValue": null, "description": "Callback that is invoked when property is selected in any rule.", "name": "onRulePropertySelected", "required": false, "type": { "name": "((property: PropertyDescription) => void)" } }, "ruleOperatorRenderer": { "defaultValue": null, "description": "Custom renderer for rule operator selector.", "name": "ruleOperatorRenderer", "required": false, "type": { "name": "((props: PropertyFilterBuilderRuleOperatorProps) => ReactNode)" } }, "ruleValueRenderer": { "defaultValue": null, "description": "Custom renderer for rule value input.", "name": "ruleValueRenderer", "required": false, "type": { "name": "((props: PropertyFilterBuilderRuleValueRendererProps) => ReactNode)" } }, "propertyRenderer": { "defaultValue": null, "description": "Custom renderer for property selector in rule.", "name": "propertyRenderer", "required": false, "type": { "name": "((name: string) => ReactNode)" } }, "ruleGroupDepthLimit": { "defaultValue": null, "description": "Specifies how deep rule groups can be nested.\n@deprecated in 4.9.0. Nesting is no longer supported moving forward.", "name": "ruleGroupDepthLimit", "required": false, "type": { "name": "number" } }, "isDisabled": { "defaultValue": null, "description": "Specifies whether component is disabled or not.", "name": "isDisabled", "required": false, "type": { "name": "boolean" } }, "isGroupOperatorDisabled": { "defaultValue": null, "description": "Controls whether the group operator is toggle-able.", "name": "isGroupOperatorDisabled", "required": false, "type": { "name": "boolean" } }, "initialFilter": { "defaultValue": null, "description": "Initial filter for [[PropertyFilterBuilder]]", "name": "initialFilter", "required": false, "type": { "name": "PropertyFilter" } }, "ruleValidator": { "defaultValue": null, "description": "Custom rule validator to be used when [[UsePropertyFilterBuilderResult.buildFilter]] is invoked. Should return error message or `undefined`, if rule is valid.", "name": "ruleValidator", "required": false, "type": { "name": "((rule: PropertyFilterBuilderRule) => string)" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PropertyFilterBuilderRenderer.displayName = "PropertyFilterBuilderRenderer";
  PropertyFilterBuilderRenderer.__docgenInfo = { "description": "Renderer for [[PropertyFilterBuilder]] component.", "displayName": "PropertyFilterBuilderRenderer", "props": { "rootGroup": { "defaultValue": null, "description": "Root group of rules in [[PropertyFilterBuilder]] component.", "name": "rootGroup", "required": true, "type": { "name": "PropertyFilterBuilderRuleGroup" } }, "actions": { "defaultValue": null, "description": "Actions for modifying [[PropertyFilterBuilder]] state.", "name": "actions", "required": true, "type": { "name": "PropertyFilterBuilderActions" } }, "properties": { "defaultValue": null, "description": "List of properties available to be used in filter rules.", "name": "properties", "required": true, "type": { "name": "PropertyDescription[]" } }, "onRulePropertySelected": { "defaultValue": null, "description": "Callback that is invoked when property is selected in any rule.", "name": "onRulePropertySelected", "required": false, "type": { "name": "((property: PropertyDescription) => void)" } }, "ruleOperatorRenderer": { "defaultValue": null, "description": "Custom renderer for rule operator selector.", "name": "ruleOperatorRenderer", "required": false, "type": { "name": "((props: PropertyFilterBuilderRuleOperatorProps) => ReactNode)" } }, "ruleValueRenderer": { "defaultValue": null, "description": "Custom renderer for rule value input.", "name": "ruleValueRenderer", "required": false, "type": { "name": "((props: PropertyFilterBuilderRuleValueRendererProps) => ReactNode)" } }, "propertyRenderer": { "defaultValue": null, "description": "Custom renderer for property selector in rule.", "name": "propertyRenderer", "required": false, "type": { "name": "((name: string) => ReactNode)" } }, "ruleGroupDepthLimit": { "defaultValue": null, "description": "Specifies how deep rule groups can be nested.\n@deprecated in 4.9.0. Nesting is no longer supported moving forward.", "name": "ruleGroupDepthLimit", "required": false, "type": { "name": "number" } }, "isDisabled": { "defaultValue": null, "description": "Specifies whether component is disabled or not.", "name": "isDisabled", "required": false, "type": { "name": "boolean" } }, "isGroupOperatorDisabled": { "defaultValue": null, "description": "Controls whether the group operator is toggle-able.", "name": "isGroupOperatorDisabled", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class DoublePropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Primitive && record.property.typename === StandardTypeNames.Double.valueOf();
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(record, context) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PrimitivePropertyValueRendererImpl,
      {
        record,
        context,
        stringValueCalculator: convertRecordToString
      }
    );
  }
}
try {
  DoublePropertyValueRenderer.displayName = "DoublePropertyValueRenderer";
  DoublePropertyValueRenderer.__docgenInfo = { "description": "Default Double Property Renderer", "displayName": "DoublePropertyValueRenderer", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class NavigationPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Primitive && record.property.typename === StandardTypeNames.Navigation.valueOf();
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(record, context) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PrimitivePropertyValueRendererImpl,
      {
        record,
        context,
        stringValueCalculator: convertRecordToString
      }
    );
  }
}
try {
  NavigationPropertyValueRenderer.displayName = "NavigationPropertyValueRenderer";
  NavigationPropertyValueRenderer.__docgenInfo = { "description": "Default Navigation Property Renderer", "displayName": "NavigationPropertyValueRenderer", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const colorDecimalToHex = (decimal) => `#${decimal.toString(16).padStart(6, "0")}`;
function getBackgroundColor(isSelected, colorOverrides) {
  if (!colorOverrides)
    return void 0;
  if (isSelected)
    return colorOverrides.backgroundColorSelected !== void 0 ? colorDecimalToHex(colorOverrides.backgroundColorSelected) : void 0;
  if (colorOverrides.backgroundColor)
    return colorDecimalToHex(colorOverrides.backgroundColor);
  return void 0;
}
function getForegroundColor(isSelected, colorOverrides) {
  if (!colorOverrides)
    return void 0;
  if (isSelected)
    return colorOverrides.colorSelected !== void 0 ? colorDecimalToHex(colorOverrides.colorSelected) : void 0;
  if (colorOverrides.color)
    return colorDecimalToHex(colorOverrides.color);
  return void 0;
}
const ItemStyleProvider = {
  /**
   * Create CSS style from [[ItemStyle]]
   */
  createStyle: ({ colorOverrides, isBold, isItalic }, isSelected) => ({
    color: getForegroundColor(!!isSelected, colorOverrides),
    backgroundColor: getBackgroundColor(!!isSelected, colorOverrides),
    fontWeight: isBold ? "bold" : void 0,
    fontStyle: isItalic ? "italic" : void 0
  })
};
const _PropertyCategoryRendererManager = class _PropertyCategoryRendererManager {
  constructor() {
    this._categoryRenderers = /* @__PURE__ */ new Map();
  }
  /** Retrieves a category rendering component based for the passed category item. */
  getCategoryComponent(categoryItem) {
    var _a3;
    if (categoryItem.derivedCategory.renderer === void 0) {
      return void 0;
    }
    return (_a3 = this._categoryRenderers.get(
      categoryItem.derivedCategory.renderer.name
    )) == null ? void 0 : _a3(categoryItem);
  }
  /** Registers a renderer factory function to be invoked on categories with specific renderer name. */
  addRenderer(rendererName, categoryRenderer, override = false) {
    if (this._categoryRenderers.has(rendererName) && !override) {
      const className = _PropertyCategoryRendererManager.name;
      const methodName = _PropertyCategoryRendererManager.prototype.addRenderer.name;
      throw new Error(
        `${className}.${methodName} error: renderer '${rendererName}' has already been added. Did you mean to override it?`
      );
    }
    this._categoryRenderers.set(rendererName, categoryRenderer);
  }
  /** Removes previous renderer factory registration. */
  removeRenderer(rendererName) {
    this._categoryRenderers.delete(rendererName);
  }
};
_PropertyCategoryRendererManager.defaultManager = new _PropertyCategoryRendererManager();
let PropertyCategoryRendererManager = _PropertyCategoryRendererManager;
class PropertyDataChangeEvent extends BeEvent {
}
function createContextWithMandatoryProvider(contextName) {
  const context = React.createContext(void 0);
  function useContextWithoutDefaultValue(ConsumingComponent) {
    const value = React.useContext(context);
    if (value === void 0) {
      throw new UiError(
        UiComponents$1.loggerCategory(ConsumingComponent),
        `'${getObjectClassName(
          ConsumingComponent
        )}' expects to be wrapped by a '${contextName}' provider.`
      );
    }
    return value;
  }
  return [context.Provider, context.Consumer, useContextWithoutDefaultValue];
}
var FilteredType = /* @__PURE__ */ ((FilteredType2) => {
  FilteredType2[FilteredType2["Category"] = 0] = "Category";
  FilteredType2[FilteredType2["Label"] = 1] = "Label";
  FilteredType2[FilteredType2["Value"] = 2] = "Value";
  return FilteredType2;
})(FilteredType || {});
var _a$1;
var FlatGridItemType = /* @__PURE__ */ ((FlatGridItemType2) => {
  FlatGridItemType2[FlatGridItemType2["Category"] = 0] = "Category";
  FlatGridItemType2[FlatGridItemType2["Primitive"] = 1] = "Primitive";
  FlatGridItemType2[FlatGridItemType2["Array"] = 2] = "Array";
  FlatGridItemType2[FlatGridItemType2["Struct"] = 3] = "Struct";
  return FlatGridItemType2;
})(FlatGridItemType || {});
class MutableFlatPropertyGridItem {
  constructor(_depth, _parentSelectionKey, _parentCategorySelectionKey) {
    this._depth = _depth;
    this._parentSelectionKey = _parentSelectionKey;
    this._parentCategorySelectionKey = _parentCategorySelectionKey;
    this[_a$1] = true;
    this.key = Guid.createValue();
    this._isExpanded = false;
    this._lastInNumberOfCategories = 0;
    this._isLastInRootCategory = false;
    if (this._depth < 0)
      throw new Error("Depth cannot be negative");
  }
  get depth() {
    return this._depth;
  }
  get parentSelectionKey() {
    return this._parentSelectionKey;
  }
  get parentCategorySelectionKey() {
    return this._parentCategorySelectionKey;
  }
  get isExpanded() {
    return this._isExpanded;
  }
  set isExpanded(value) {
    this._isExpanded = value;
  }
  getDescendants() {
    const descendants = [];
    this.getChildren().forEach(
      (child) => descendants.push(...child.getDescendantsAndSelf())
    );
    return descendants;
  }
  /**
   * Gets a flat list of all FlatGridItems beneath this flat grid item including itself in depth first visiting order.
   */
  getDescendantsAndSelf() {
    return [this.getSelf(), ...this.getDescendants()];
  }
  /**
   * Gets a flat list of visible FlatGridItems beneath this flat grid item.
   */
  getVisibleDescendants() {
    const descendants = [];
    if (this.isExpanded)
      this.getChildren().forEach(
        (child) => descendants.push(...child.getVisibleDescendantsAndSelf())
      );
    return descendants;
  }
  /**
   * Gets a flat list of visible FlatGridItems beneath this flat grid item and itself in depth first visiting order.
   */
  getVisibleDescendantsAndSelf() {
    return [this.getSelf(), ...this.getVisibleDescendants()];
  }
  /**
   * @returns self if item is not expanded, last visible descendant of this item otherwise.
   */
  getLastVisibleDescendantOrSelf() {
    if (!this.isExpanded)
      return this.getSelf();
    const children = this.getChildren();
    if (children.length < 1)
      return this.getSelf();
    return children[children.length - 1].getLastVisibleDescendantOrSelf();
  }
  /**
   * Sets lastInNumberOfCategories value and sends it down to this items last child
   * @internal
   */
  get lastInNumberOfCategories() {
    if (this.isExpanded && this.getChildren().length > 0)
      return 0;
    return this._lastInNumberOfCategories;
  }
  set lastInNumberOfCategories(value) {
    this._lastInNumberOfCategories = value;
    const children = this.getChildren();
    if (children.length < 1)
      return;
    children[children.length - 1].lastInNumberOfCategories = value;
  }
  /**
   * Gets and sets isLastInRootCategory value and sends it down to this items last child
   * @internal
   */
  get isLastInRootCategory() {
    if (this.isExpanded && this.getChildren().length > 0)
      return false;
    return this._isLastInRootCategory;
  }
  set isLastInRootCategory(value) {
    this._isLastInRootCategory = value;
    const children = this.getChildren();
    if (children.length < 1)
      return;
    children[children.length - 1].isLastInRootCategory = value;
  }
}
_a$1 = L;
class MutableCategorizedProperty extends MutableFlatPropertyGridItem {
  constructor(type, record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    super(depth, parentSelectionKey, parentCategorySelectionKey);
    const recordType = this.valueTypeToFlatGridType(record.value.valueFormat);
    if (recordType !== type) {
      const expectedTypeStr = FlatGridItemType[type];
      const actualTypeStr = FlatGridItemType[recordType];
      throw Error(
        `Record with incorrect value format passed to property: expected ${expectedTypeStr}, got ${actualTypeStr}`
      );
    }
    const overridenProperty = this.makeOverridenProperty(
      record.property,
      overrideName,
      overrideDisplayLabel
    );
    this._derivedRecord = this.makeDerivedRecord(record, overridenProperty);
    this._selectionKey = `${this.parentSelectionKey}_${this.derivedRecord.property.name}`;
    this._isExpanded = !!record.autoExpand;
  }
  /**
   * Maps PropertyRecord valueFormat to FlatGridItemType
   * @param valueType valueFormat to map
   * @returns mapped FlatGridItemType
   */
  valueTypeToFlatGridType(valueType) {
    switch (valueType) {
      case PropertyValueFormat.Primitive:
        return 1;
      case PropertyValueFormat.Array:
        return 2;
      case PropertyValueFormat.Struct:
        return 3;
      default:
        const unhandledType = valueType;
        throw Error(`Property Value Format not handled: ${unhandledType}`);
    }
  }
  /**
   * Make new property description with overriden fields.
   * @param propertyDescription property description to override.
   * @param overrideName property description name to override.
   * @param overrideDisplay  property description display name to override.
   */
  makeOverridenProperty(propertyDescription, overrideName, overrideDisplay) {
    const { name, displayLabel, ...property2 } = { ...propertyDescription };
    const newName = overrideName ?? name;
    const newDisplayLabel = overrideDisplay ?? displayLabel;
    return { ...property2, name: newName, displayLabel: newDisplayLabel };
  }
  /**
   * Gets derived property record that has it's property description field overriden
   */
  makeDerivedRecord(record, overridenPropertyDescription) {
    const { value, property: property2, ...others } = record;
    const newRecord = new PropertyRecord(value, overridenPropertyDescription);
    return Object.assign(newRecord, others);
  }
  getSelf() {
    return this;
  }
  get parentCategorySelectionKey() {
    return super.parentCategorySelectionKey;
  }
  get parentSelectionKey() {
    return super.parentSelectionKey;
  }
  /**
   * Unique selection key made of parent selectionKey and this property name.
   */
  get selectionKey() {
    return this._selectionKey;
  }
  get label() {
    return this._derivedRecord.property.displayLabel;
  }
  /**
   * Record with overriden property description.
   */
  get derivedRecord() {
    return this._derivedRecord;
  }
}
class MutableCategorizedPrimitiveProperty extends MutableCategorizedProperty {
  constructor(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    super(
      FlatGridItemType.Primitive,
      record,
      parentSelectionKey,
      parentCategorySelectionKey,
      depth,
      overrideName,
      overrideDisplayLabel
    );
  }
  get type() {
    return FlatGridItemType.Primitive;
  }
  getChildren() {
    return [];
  }
}
class MutableCustomGridCategory extends MutableFlatPropertyGridItem {
  constructor(category, recordsDict, gridItemFactory, parentSelectionKey, depth) {
    super(depth, parentSelectionKey, parentSelectionKey);
    this.type = FlatGridItemType.Category;
    this.name = category.name;
    this.label = category.label;
    this.isExpanded = category.expand;
    this.selectionKey = parentSelectionKey === void 0 ? this.name : `${parentSelectionKey}_${this.name}`;
    this._renderer = category.renderer;
    const categoryRecords = recordsDict[category.name] ?? [];
    this._children = categoryRecords.map(
      (value) => gridItemFactory.createCategorizedProperty(
        value,
        this.selectionKey,
        this.selectionKey,
        0
      )
    );
    this.lastInNumberOfCategories = -1;
  }
  get derivedCategory() {
    return {
      name: this.name,
      label: this.label,
      expand: this.isExpanded,
      renderer: this._renderer
    };
  }
  get isRootCategory() {
    return this.depth === 0;
  }
  get lastInNumberOfCategories() {
    return this._lastInNumberOfCategories;
  }
  set lastInNumberOfCategories(value) {
    this._lastInNumberOfCategories = value + 1;
  }
  getSelf() {
    return this;
  }
  getChildren() {
    return this._children;
  }
  getVisibleDescendantsAndSelf() {
    return [this];
  }
}
class MutableGridCategory extends MutableFlatPropertyGridItem {
  constructor(category, recordsDict, gridItemFactory, parentSelectionKey, depth = 0) {
    super(depth, parentSelectionKey, parentSelectionKey);
    this._category = {
      name: category.name,
      label: category.label,
      expand: category.expand
    };
    if (parentSelectionKey !== void 0)
      this._selectionKey = `${parentSelectionKey}_${category.name}`;
    else
      this._selectionKey = category.name;
    this._isExpanded = category.expand;
    const categoryRecords = recordsDict[category.name] ?? [];
    this._children = categoryRecords.map(
      (value) => gridItemFactory.createCategorizedProperty(
        value,
        this.selectionKey,
        this.selectionKey,
        0
      )
    );
    const childCategories = category.childCategories ?? [];
    const child = childCategories.map(
      (childCategory) => gridItemFactory.createGridCategory(
        childCategory,
        recordsDict,
        this.selectionKey,
        this.depth + 1
      )
    );
    this._children.push(...child);
    this.lastInNumberOfCategories = 0;
    this.isLastInRootCategory = this.isRootCategory;
  }
  /**
   * Category is considered to be root category if its depth is 0
   */
  get isRootCategory() {
    return this.depth === 0;
  }
  get selectionKey() {
    return this._selectionKey;
  }
  get type() {
    return FlatGridItemType.Category;
  }
  get name() {
    return this._category.name;
  }
  get label() {
    return this._category.label;
  }
  get derivedCategory() {
    return { ...this._category, expand: this.isExpanded };
  }
  getSelf() {
    return this;
  }
  getChildren() {
    return this._children;
  }
  /**
   * Gets and Sets lastInNumberOfCategories.
   * Setter increments set value by one to account self as category.
   * New value is sent down to this items last child
   * @internal
   */
  get lastInNumberOfCategories() {
    if (this.isExpanded && this.getChildren().length > 0)
      return 0;
    return this._lastInNumberOfCategories - 1;
  }
  set lastInNumberOfCategories(value) {
    super.lastInNumberOfCategories = value + 1;
  }
}
class FlatNonPrimitivePropertyRenderer extends reactExports.Component {
  constructor(props) {
    super(props);
    this._onExpanded = () => {
      if (!this.props.isExpanded)
        this.props.onExpandToggled();
    };
    this._onCollapsed = () => {
      if (this.props.isExpanded)
        this.props.onExpandToggled();
    };
  }
  getLabel(props) {
    const { orientation, indentation, width, columnRatio, columnInfo } = props;
    const offset = CommonPropertyRenderer.getLabelOffset(
      indentation,
      orientation,
      width,
      columnRatio,
      columnInfo == null ? void 0 : columnInfo.minLabelWidth
    );
    let displayLabel = props.propertyRecord.property.displayLabel;
    if (props.propertyRecord.value.valueFormat === PropertyValueFormat.Array)
      displayLabel = `${displayLabel} (${props.propertyRecord.value.items.length})`;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      NonPrimitivePropertyLabelRenderer,
      {
        isExpanded: props.isExpanded,
        onExpand: this._onExpanded,
        onCollapse: this._onCollapsed,
        offset,
        renderColon: false,
        children: displayLabel
      }
    );
  }
  render() {
    const { indentation, ...props } = this.props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyView, { labelElement: this.getLabel(this.props), ...props });
  }
}
try {
  FlatNonPrimitivePropertyRenderer.displayName = "FlatNonPrimitivePropertyRenderer";
  FlatNonPrimitivePropertyRenderer.__docgenInfo = { "description": "React Component that renders flat struct and array properties", "displayName": "FlatNonPrimitivePropertyRenderer", "props": { "isExpanded": { "defaultValue": null, "description": "", "name": "isExpanded", "required": true, "type": { "name": "boolean" } }, "onExpandToggled": { "defaultValue": null, "description": "", "name": "onExpandToggled", "required": true, "type": { "name": "() => void" } }, "valueElement": { "defaultValue": null, "description": "Property value as a React element", "name": "valueElement", "required": false, "type": { "name": "ReactNode" } }, "valueElementRenderer": { "defaultValue": null, "description": "Render callback for property value. If specified, `valueElement` is ignored", "name": "valueElementRenderer", "required": false, "type": { "name": "(() => ReactNode)" } }, "indentation": { "defaultValue": null, "description": "Multiplier of how much the property is indented to the right", "name": "indentation", "required": false, "type": { "name": "number" } }, "highlight": { "defaultValue": null, "description": "Properties used for highlighting", "name": "highlight", "required": false, "type": { "name": "HighlightingComponentProps" } }, "propertyRecord": { "defaultValue": null, "description": "PropertyRecord to render", "name": "propertyRecord", "required": true, "type": { "name": "PropertyRecord" } }, "uniqueKey": { "defaultValue": null, "description": "Unique string, that identifies this property component. Should be used if onClick or onRightClick are provided", "name": "uniqueKey", "required": false, "type": { "name": "string" } }, "orientation": { "defaultValue": null, "description": "Orientation to use for displaying the property", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "isSelected": { "defaultValue": null, "description": "Controls component selection", "name": "isSelected", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Called when property gets clicked. If undefined, clicking is disabled", "name": "onClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onRightClick": { "defaultValue": null, "description": "Called when property gets right clicked. If undefined, right clicking is not working", "name": "onRightClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onContextMenu": { "defaultValue": null, "description": "Called to show a context menu for properties", "name": "onContextMenu", "required": false, "type": { "name": "((property: PropertyRecord, e: MouseEvent<Element, MouseEvent>) => void)" } }, "columnRatio": { "defaultValue": null, "description": "Ratio between label and value cells", "name": "columnRatio", "required": false, "type": { "name": "number" } }, "onColumnRatioChanged": { "defaultValue": null, "description": "Callback to column ratio changed event", "name": "onColumnRatioChanged", "required": false, "type": { "name": "((ratio: number) => void | { ratio: number; })" } }, "isHoverable": { "defaultValue": null, "description": "Indicates that properties have *hover* effect", "name": "isHoverable", "required": false, "type": { "name": "boolean" } }, "isSelectable": { "defaultValue": null, "description": "Indicates that properties can be selected", "name": "isSelectable", "required": false, "type": { "name": "boolean" } }, "width": { "defaultValue": null, "description": "Width of the whole property element", "name": "width", "required": false, "type": { "name": "number" } }, "actionButtonRenderers": { "defaultValue": null, "description": "Array of action button renderers", "name": "actionButtonRenderers", "required": false, "type": { "name": "ActionButtonRenderer[]" } }, "isResizeHandleHovered": { "defaultValue": null, "description": "Is resize handle hovered", "name": "isResizeHandleHovered", "required": false, "type": { "name": "boolean" } }, "onResizeHandleHoverChanged": { "defaultValue": null, "description": "Callback to hover event change", "name": "onResizeHandleHoverChanged", "required": false, "type": { "name": "((isHovered: boolean) => void)" } }, "isResizeHandleBeingDragged": { "defaultValue": null, "description": "Is resize handle being dragged", "name": "isResizeHandleBeingDragged", "required": false, "type": { "name": "boolean" } }, "onResizeHandleDragChanged": { "defaultValue": null, "description": "Callback to drag event change", "name": "onResizeHandleDragChanged", "required": false, "type": { "name": "((isDragStarted: boolean) => void)" } }, "columnInfo": { "defaultValue": null, "description": "Information for styling property grid columns", "name": "columnInfo", "required": false, "type": { "name": "PropertyGridColumnInfo" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const FlatPropertyRenderer = (props) => {
  const {
    category,
    propertyValueRendererManager,
    isEditing,
    onEditCommit,
    onEditCancel,
    onHeightChanged,
    highlight,
    ...passthroughProps
  } = props;
  const valueElementRenderer = () => /* @__PURE__ */ jsxRuntimeExports.jsx(
    DisplayValue,
    {
      propertyRecord: passthroughProps.propertyRecord,
      orientation: passthroughProps.orientation,
      columnRatio: passthroughProps.columnRatio,
      width: passthroughProps.width,
      category,
      propertyValueRendererManager,
      isEditing,
      onEditCommit,
      onEditCancel,
      isExpanded: passthroughProps.isExpanded,
      onExpansionToggled: passthroughProps.onExpansionToggled,
      onHeightChanged,
      highlight,
      indentation: props.indentation
    }
  );
  const primitiveRendererProps = {
    ...passthroughProps,
    valueElementRenderer,
    indentation: props.indentation
  };
  const rendererManager2 = propertyValueRendererManager ?? PropertyValueRendererManager.defaultManager;
  const hasCustomRenderer = rendererManager2.hasCustomRenderer(
    passthroughProps.propertyRecord
  );
  switch (props.propertyRecord.value.valueFormat) {
    case PropertyValueFormat.Primitive:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        CustomizablePropertyRenderer,
        {
          highlight: (highlight == null ? void 0 : highlight.applyOnLabel) ? highlight : void 0,
          ...primitiveRendererProps
        }
      );
    case PropertyValueFormat.Array:
      if (props.propertyRecord.value.items.length === 0 || hasCustomRenderer)
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          CustomizablePropertyRenderer,
          {
            highlight: (highlight == null ? void 0 : highlight.applyOnLabel) ? highlight : void 0,
            ...primitiveRendererProps
          }
        );
    case PropertyValueFormat.Struct:
      if (hasCustomRenderer) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          CustomizablePropertyRenderer,
          {
            highlight: (highlight == null ? void 0 : highlight.applyOnLabel) ? highlight : void 0,
            ...primitiveRendererProps
          }
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        FlatNonPrimitivePropertyRenderer,
        {
          ...primitiveRendererProps,
          isExpanded: props.isExpanded,
          onExpandToggled: props.onExpansionToggled,
          valueElement: void 0,
          valueElementRenderer: void 0
        }
      );
  }
};
const DisplayValue = (props) => {
  useResetHeightOnEdit(
    props.orientation,
    props.isEditing,
    props.onHeightChanged
  );
  if (props.isEditing) {
    const _onEditCommit = (args) => {
      var _a3;
      if (props.category)
        (_a3 = props.onEditCommit) == null ? void 0 : _a3.call(props, args, props.category);
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditorContainer,
      {
        propertyRecord: props.propertyRecord,
        onCommit: _onEditCommit,
        onCancel: props.onEditCancel ?? (() => {
        }),
        setFocus: true
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: CommonPropertyRenderer.createNewDisplayValue(
    props.orientation,
    props.propertyRecord,
    props.indentation,
    props.propertyValueRendererManager,
    props.isExpanded,
    props.onExpansionToggled,
    props.onHeightChanged,
    props.highlight
  ) });
};
function useResetHeightOnEdit(orientation, isEditing, onHeightChanged) {
  const previousEditingStatusRef = reactExports.useRef(isEditing);
  reactExports.useEffect(() => {
    if (!previousEditingStatusRef.current && isEditing) {
      onHeightChanged == null ? void 0 : onHeightChanged(orientation === Orientation.Vertical ? 48 : 28);
    }
    previousEditingStatusRef.current = isEditing;
  });
}
try {
  FlatPropertyRenderer.displayName = "FlatPropertyRenderer";
  FlatPropertyRenderer.__docgenInfo = { "description": "A React component that renders flat properties", "displayName": "FlatPropertyRenderer", "props": { "category": { "defaultValue": null, "description": "", "name": "category", "required": false, "type": { "name": "PropertyCategory" } }, "propertyValueRendererManager": { "defaultValue": null, "description": "Custom value renderer", "name": "propertyValueRendererManager", "required": false, "type": { "name": "PropertyValueRendererManager" } }, "indentation": { "defaultValue": null, "description": "Multiplier of how much the property is indented to the right", "name": "indentation", "required": false, "type": { "name": "number" } }, "isEditing": { "defaultValue": null, "description": "Indicates property is being edited", "name": "isEditing", "required": false, "type": { "name": "boolean" } }, "onEditCommit": { "defaultValue": null, "description": "Called when property edit is committed.", "name": "onEditCommit", "required": false, "type": { "name": "((args: PropertyUpdatedArgs, category: PropertyCategory) => void)" } }, "onEditCancel": { "defaultValue": null, "description": "Called when property edit is cancelled.", "name": "onEditCancel", "required": false, "type": { "name": "(() => void)" } }, "isExpanded": { "defaultValue": null, "description": "Whether property value is displayed in expanded state.", "name": "isExpanded", "required": true, "type": { "name": "boolean" } }, "onExpansionToggled": { "defaultValue": null, "description": "Called when toggling between expanded and collapsed property value display state.", "name": "onExpansionToggled", "required": true, "type": { "name": "() => void" } }, "onHeightChanged": { "defaultValue": null, "description": "Reports property height changes.", "name": "onHeightChanged", "required": false, "type": { "name": "((newHeight: number) => void)" } }, "highlight": { "defaultValue": null, "description": "", "name": "highlight", "required": false, "type": { "name": "(HighlightingComponentProps & { applyOnLabel: boolean; applyOnValue: boolean; })" } }, "propertyRecord": { "defaultValue": null, "description": "PropertyRecord to render", "name": "propertyRecord", "required": true, "type": { "name": "PropertyRecord" } }, "uniqueKey": { "defaultValue": null, "description": "Unique string, that identifies this property component. Should be used if onClick or onRightClick are provided", "name": "uniqueKey", "required": false, "type": { "name": "string" } }, "orientation": { "defaultValue": null, "description": "Orientation to use for displaying the property", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "isSelected": { "defaultValue": null, "description": "Controls component selection", "name": "isSelected", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Called when property gets clicked. If undefined, clicking is disabled", "name": "onClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onRightClick": { "defaultValue": null, "description": "Called when property gets right clicked. If undefined, right clicking is not working", "name": "onRightClick", "required": false, "type": { "name": "((property: PropertyRecord, key?: string) => void)" } }, "onContextMenu": { "defaultValue": null, "description": "Called to show a context menu for properties", "name": "onContextMenu", "required": false, "type": { "name": "((property: PropertyRecord, e: MouseEvent<Element, MouseEvent>) => void)" } }, "columnRatio": { "defaultValue": null, "description": "Ratio between label and value cells", "name": "columnRatio", "required": false, "type": { "name": "number" } }, "onColumnRatioChanged": { "defaultValue": null, "description": "Callback to column ratio changed event", "name": "onColumnRatioChanged", "required": false, "type": { "name": "((ratio: number) => void | { ratio: number; })" } }, "isHoverable": { "defaultValue": null, "description": "Indicates that properties have *hover* effect", "name": "isHoverable", "required": false, "type": { "name": "boolean" } }, "isSelectable": { "defaultValue": null, "description": "Indicates that properties can be selected", "name": "isSelectable", "required": false, "type": { "name": "boolean" } }, "width": { "defaultValue": null, "description": "Width of the whole property element", "name": "width", "required": false, "type": { "name": "number" } }, "actionButtonRenderers": { "defaultValue": null, "description": "Array of action button renderers", "name": "actionButtonRenderers", "required": false, "type": { "name": "ActionButtonRenderer[]" } }, "isResizeHandleHovered": { "defaultValue": null, "description": "Is resize handle hovered", "name": "isResizeHandleHovered", "required": false, "type": { "name": "boolean" } }, "onResizeHandleHoverChanged": { "defaultValue": null, "description": "Callback to hover event change", "name": "onResizeHandleHoverChanged", "required": false, "type": { "name": "((isHovered: boolean) => void)" } }, "isResizeHandleBeingDragged": { "defaultValue": null, "description": "Is resize handle being dragged", "name": "isResizeHandleBeingDragged", "required": false, "type": { "name": "boolean" } }, "onResizeHandleDragChanged": { "defaultValue": null, "description": "Callback to drag event change", "name": "onResizeHandleDragChanged", "required": false, "type": { "name": "((isDragStarted: boolean) => void)" } }, "columnInfo": { "defaultValue": null, "description": "Information for styling property grid columns", "name": "columnInfo", "required": false, "type": { "name": "PropertyGridColumnInfo" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const BORDER_WIDTH = 10;
const PROPERTY_PADDING = 16;
const VALUE_MIN_WIDTH = 10;
const _ColumnResizingPropertyListPropsSupplier = class _ColumnResizingPropertyListPropsSupplier extends reactExports.Component {
  constructor() {
    super(...arguments);
    this._initialRatio = 0.25;
    this._defaultMinRatio = 0.15;
    this._defaultMaxRatio = 0.6;
    this._minRatio = this._defaultMinRatio;
    this._maxRatio = this._defaultMaxRatio;
    this.state = {
      columnRatio: this._initialRatio,
      isResizeHandleHovered: false,
      isResizeHandleBeingDragged: false
    };
    this._onColumnRatioChanged = (ratio) => {
      ratio = UiGeometry.clamp(ratio, this._minRatio, this._maxRatio);
      if (this.state.columnRatio === ratio)
        return { ratio };
      this.setState({ columnRatio: ratio });
      return { ratio };
    };
    this._onResizeHandleHoverChanged = (isHovered) => {
      this.setState({ isResizeHandleHovered: isHovered });
    };
    this._onResizeHandleDragChanged = (isDragStarted) => {
      this.setState({ isResizeHandleBeingDragged: isDragStarted });
    };
  }
  isMinimumColumnSizeEnabled() {
    if (this.props.orientation !== Orientation.Horizontal)
      return false;
    const bordersWidth = this.props.maxPropertyDepth ? this.props.maxPropertyDepth * BORDER_WIDTH : 0;
    const actionButtonWidth = this.props.actionButtonWidth ?? 0;
    const propertyWidth = this.props.minLabelWidth + 1 + this.props.minValueWidth + actionButtonWidth + bordersWidth + PROPERTY_PADDING;
    if (this.props.width < propertyWidth) {
      this._minRatio = this._defaultMinRatio;
      this._maxRatio = this.props.actionButtonWidth ? (this.props.width - this.props.actionButtonWidth - bordersWidth - PROPERTY_PADDING - VALUE_MIN_WIDTH) / this.props.width : this._defaultMaxRatio;
      return false;
    }
    this._minRatio = this.props.minLabelWidth / this.props.width;
    this._maxRatio = (this.props.width - actionButtonWidth - this.props.minValueWidth) / this.props.width;
    return true;
  }
  getValidColumnRatio() {
    return UiGeometry.clamp(
      this.state.columnRatio,
      this._minRatio,
      this._maxRatio
    );
  }
  render() {
    const listProps = {
      orientation: this.props.orientation,
      width: this.props.width,
      onColumnChanged: this._onColumnRatioChanged,
      columnRatio: this.getValidColumnRatio(),
      isResizeHandleHovered: this.state.isResizeHandleHovered,
      onResizeHandleHoverChanged: this._onResizeHandleHoverChanged,
      isResizeHandleBeingDragged: this.state.isResizeHandleBeingDragged,
      onResizeHandleDragChanged: this._onResizeHandleDragChanged,
      columnInfo: {
        minLabelWidth: this.props.minLabelWidth,
        minValueWidth: this.props.minValueWidth,
        actionButtonWidth: this.props.actionButtonWidth,
        isMinimumColumnSizeEnabled: this.isMinimumColumnSizeEnabled()
      }
    };
    return this.props.children(listProps);
  }
};
_ColumnResizingPropertyListPropsSupplier.defaultProps = {
  minLabelWidth: 100,
  minValueWidth: 100
};
let ColumnResizingPropertyListPropsSupplier = _ColumnResizingPropertyListPropsSupplier;
try {
  ColumnResizingPropertyListPropsSupplier.displayName = "ColumnResizingPropertyListPropsSupplier";
  ColumnResizingPropertyListPropsSupplier.__docgenInfo = { "description": "Wrapped PropertyCategoryBlock React component with list of properties and render optimization", "displayName": "ColumnResizingPropertyListPropsSupplier", "props": { "orientation": { "defaultValue": null, "description": "Orientation of the properties", "name": "orientation", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "width": { "defaultValue": null, "description": "Width of the property list", "name": "width", "required": true, "type": { "name": "number" } }, "minLabelWidth": { "defaultValue": { value: "100" }, "description": "Minimum allowed label column width, after which resizing stops", "name": "minLabelWidth", "required": false, "type": { "name": "number" } }, "minValueWidth": { "defaultValue": { value: "100" }, "description": "Minimum allowed value column width, after which resizing stops", "name": "minValueWidth", "required": false, "type": { "name": "number" } }, "actionButtonWidth": { "defaultValue": null, "description": "Fixed action button column width", "name": "actionButtonWidth", "required": false, "type": { "name": "number" } }, "maxPropertyDepth": { "defaultValue": null, "description": "Maximum depth of the properties shown", "name": "maxPropertyDepth", "required": false, "type": { "name": "number" } }, "children": { "defaultValue": null, "description": "A callback that receives the required column-resize-related props for the [[PropertyList]] component", "name": "children", "required": true, "type": { "name": '(props: Required<Pick<PropertyListProps, "width" | "orientation" | "columnRatio" | "isResizeHandleHovered" | "onResizeHandleHoverChanged" | "isResizeHandleBeingDragged" | "onResizeHandleDragChanged" | "columnInfo" | "onColumnChanged">>) => ReactNode' } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function FlatItemNestedBorderWrapper(props) {
  if (props.borderCount <= 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: props.className, children: props.children });
  }
  const isBottomBorderNeeded = props.bottomBorderCount >= 0 && props.bottomBorderCount >= props.borderCount;
  const classNames = classnames(
    "nested-border-middle",
    isBottomBorderNeeded ? "nested-border-bottom" : void 0
  );
  let currentBottomBorderCount = props.bottomBorderCount;
  if (isBottomBorderNeeded)
    currentBottomBorderCount--;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classNames, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    FlatItemNestedBorderWrapper,
    {
      className: props.className,
      borderCount: props.borderCount - 1,
      bottomBorderCount: currentBottomBorderCount,
      children: props.children
    }
  ) });
}
try {
  FlatItemNestedBorderWrapper.displayName = "FlatItemNestedBorderWrapper";
  FlatItemNestedBorderWrapper.__docgenInfo = { "description": "FlatItemNestedBorderWrapper React component.\nWraps provided ReactNode in nested borders recursively according to provided borderCount.", "displayName": "FlatItemNestedBorderWrapper", "props": { "className": { "defaultValue": null, "description": "", "name": "className", "required": false, "type": { "name": "string" } }, "bottomBorderCount": { "defaultValue": null, "description": "Number of bottom borders to draw (no more than side borders)", "name": "bottomBorderCount", "required": true, "type": { "name": "number" } }, "borderCount": { "defaultValue": null, "description": "Number of side borders to draw", "name": "borderCount", "required": true, "type": { "name": "number" } }, "children": { "defaultValue": null, "description": "Node to wrap around", "name": "children", "required": true, "type": { "name": "ReactNode" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class PropertyCategoryBlock extends reactExports.Component {
  constructor(props) {
    super(props);
    this._handleToggle = (_isExpanding) => {
      this.toggleExpansion();
    };
  }
  toggleExpansion() {
    if (this.props.onExpansionToggled)
      this.props.onExpansionToggled(this.props.category.name);
  }
  render() {
    var _a3;
    const { highlight, category, children, onExpansionToggled, ...other } = this.props;
    const activeMatchIndex = this.props.category.name === ((_a3 = highlight == null ? void 0 : highlight.activeHighlight) == null ? void 0 : _a3.highlightedItemIdentifier) ? highlight.activeHighlight.highlightIndex : void 0;
    const label = highlight ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      HighlightedText,
      {
        text: category.label,
        activeMatchIndex,
        searchText: highlight.highlightedText
      }
    ) : category.label;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ExpandableBlock.Wrapper,
      {
        isExpanded: category.expand,
        onToggle: this._handleToggle,
        size: "small",
        ...other,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableBlock.Trigger, { label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExpandableBlock.Content, { className: "components-expandable-content", children: category.expand && children })
        ]
      }
    );
  }
}
try {
  PropertyCategoryBlock.displayName = "PropertyCategoryBlock";
  PropertyCategoryBlock.__docgenInfo = { "description": "PropertyCategoryBlock React component", "displayName": "PropertyCategoryBlock", "props": { "category": { "defaultValue": null, "description": "Category of the properties", "name": "category", "required": true, "type": { "name": "PropertyCategory" } }, "onExpansionToggled": { "defaultValue": null, "description": "Callback to when PropertyCategoryBlock gets expended or collapsed", "name": "onExpansionToggled", "required": false, "type": { "name": "((categoryName: string) => void)" } }, "highlight": { "defaultValue": null, "description": "Properties used for highlighting", "name": "highlight", "required": false, "type": { "name": "HighlightingComponentProps" } }, "children": { "defaultValue": null, "description": "Content", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class PropertyGridEventsRelatedPropsSupplier extends reactExports.Component {
  constructor(props) {
    super(props);
    this._onPropertyRightClicked = (property2, key) => {
      if (this._isRightClickSupported())
        this.onEnabledPropertyRightClicked(property2, key);
    };
    this._onPropertyClicked = (property2, key) => {
      if (this._isClickSupported())
        this.onEnabledPropertyLeftClicked(property2, key);
    };
    this._onPropertyContextMenu = (property2, e) => {
      if (this.props.onPropertyContextMenu) {
        this.props.onPropertyContextMenu({ propertyRecord: property2, event: e });
      }
    };
    this._onEditCommit = async (args, category) => {
      if (this.props.onPropertyUpdated) {
        await this.props.onPropertyUpdated(args, category);
        this.setState({ editingPropertyKey: void 0 });
      }
    };
    this._onEditCancel = () => {
      this.setState({ editingPropertyKey: void 0 });
    };
    this.state = {};
  }
  _isClickSupported() {
    return this.props.isPropertySelectionEnabled || this.props.isPropertyEditingEnabled;
  }
  _isRightClickSupported() {
    return this.props.isPropertySelectionOnRightClickEnabled;
  }
  onEnabledPropertyRightClicked(property2, key) {
    let selectedPropertyKey = this.state.selectedPropertyKey;
    let editingPropertyKey = this.state.editingPropertyKey;
    editingPropertyKey = void 0;
    if (selectedPropertyKey !== key)
      selectedPropertyKey = key;
    if (this.props.onPropertySelectionChanged)
      this.props.onPropertySelectionChanged(property2);
    this.setState({ selectedPropertyKey, editingPropertyKey });
  }
  onEnabledPropertyLeftClicked(property2, key) {
    let selectedPropertyKey = this.state.selectedPropertyKey;
    let editingPropertyKey = this.state.editingPropertyKey;
    const isEditingEnabled = this.props.isPropertyEditingEnabled;
    const isSelectionEnabled = this.props.isPropertySelectionEnabled;
    if (isEditingEnabled) {
      editingPropertyKey = isSelectionEnabled && selectedPropertyKey !== key ? void 0 : key;
    }
    if (editingPropertyKey === key) {
      this.setState({ editingPropertyKey });
      return;
    }
    selectedPropertyKey = selectedPropertyKey !== key ? key : void 0;
    if (this.props.onPropertySelectionChanged)
      this.props.onPropertySelectionChanged(property2);
    this.setState({ selectedPropertyKey, editingPropertyKey });
  }
  render() {
    const renderContext = {
      isPropertyHoverEnabled: this.props.isPropertyHoverEnabled,
      isPropertySelectionEnabled: this.props.isPropertySelectionEnabled,
      isPropertySelectionOnRightClickEnabled: this.props.isPropertySelectionOnRightClickEnabled,
      isPropertyEditingEnabled: this.props.isPropertyEditingEnabled,
      selectedPropertyKey: this.state.selectedPropertyKey,
      editingPropertyKey: this.state.editingPropertyKey,
      onEditCommit: this._onEditCommit,
      onEditCancel: this._onEditCancel,
      onPropertyClicked: this._isClickSupported() ? this._onPropertyClicked : void 0,
      onPropertyRightClicked: this._isRightClickSupported() ? this._onPropertyRightClicked : void 0,
      onPropertyContextMenu: this.props.onPropertyContextMenu ? this._onPropertyContextMenu : void 0
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: this.props.children(renderContext) });
  }
}
try {
  PropertyGridEventsRelatedPropsSupplier.displayName = "PropertyGridEventsRelatedPropsSupplier";
  PropertyGridEventsRelatedPropsSupplier.__docgenInfo = { "description": "PropertyGridEventsRelatedPropsSupplier React component.", "displayName": "PropertyGridEventsRelatedPropsSupplier", "props": { "onPropertyContextMenu": { "defaultValue": null, "description": "Called to show a context menu when properties are right-clicked", "name": "onPropertyContextMenu", "required": false, "type": { "name": "((args: PropertyGridContextMenuArgs) => void)" } }, "isPropertySelectionOnRightClickEnabled": { "defaultValue": null, "description": "Enables/disables property selection with right click", "name": "isPropertySelectionOnRightClickEnabled", "required": false, "type": { "name": "boolean" } }, "onPropertySelectionChanged": { "defaultValue": null, "description": "Callback to property selection", "name": "onPropertySelectionChanged", "required": false, "type": { "name": "((property: PropertyRecord) => void)" } }, "isPropertyEditingEnabled": { "defaultValue": null, "description": "Enables/disables property editing", "name": "isPropertyEditingEnabled", "required": false, "type": { "name": "boolean" } }, "onPropertyUpdated": { "defaultValue": null, "description": "Callback for when properties are updated", "name": "onPropertyUpdated", "required": false, "type": { "name": "((args: PropertyUpdatedArgs, category: PropertyCategory) => Promise<boolean>)" } }, "isPropertyHoverEnabled": { "defaultValue": null, "description": "Enables/disables property hovering effect", "name": "isPropertyHoverEnabled", "required": false, "type": { "name": "boolean" } }, "isPropertySelectionEnabled": { "defaultValue": null, "description": "Enables/disables property selection", "name": "isPropertySelectionEnabled", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function useElementsScrollStorage(elementsClassName) {
  const ref = reactExports.useRef(null);
  const scrollTop = reactExports.useRef([]);
  const getElements = () => {
    if (!ref.current) {
      return [];
    }
    return ref.current.getElementsByClassName(elementsClassName);
  };
  const persist = () => {
    const elements = getElements();
    const offsets = [];
    for (const element of elements) {
      offsets.push(element.scrollTop);
    }
    scrollTop.current = offsets;
  };
  const restore = () => {
    const elements = getElements();
    if (elements.length !== scrollTop.current.length) {
      scrollTop.current = [];
      return;
    }
    for (let i = 0; i < scrollTop.current.length; i++) {
      elements[i].scrollTop = scrollTop.current[i];
    }
    scrollTop.current = [];
  };
  return { ref, persist, restore };
}
const [
  PropertyGridInternalContextProvider,
  _PropertyGridInternalContextConsumer,
  usePropertyGridInternalContext
] = createContextWithMandatoryProvider(
  "PropertyGridInternalContext"
);
const ACTION_BUTTON_DEFAULT_WIDTH = 90;
const CATEGORY_HEADER_HEIGHT = 42;
const CATEGORY_PROPERTY_HEIGHT = 28;
const VERTICAL_CATEGORY_PROPERTY_HEIGHT = 48;
class VirtualizedPropertyGrid extends reactExports.Component {
  constructor(props) {
    super(props);
    this._listRef = reactExports.createRef();
    this._handleNodeHeightChange = (index, key, newHeight) => {
      if (this.state.dynamicNodeHeights.get(key) === newHeight) {
        return;
      }
      this.setState(
        (state) => {
          return {
            ...state,
            dynamicNodeHeights: new Map(state.dynamicNodeHeights).set(
              key,
              newHeight
            )
          };
        },
        () => this._listRef.current.resetAfterIndex(index)
      );
    };
    this._calculateNodeHeightByIndex = (index) => {
      const node = this.state.gridItems[index];
      return this.calculateNodeHeight(node);
    };
    this._getNodeKey = (index) => {
      const node = this.state.gridItems[index];
      return node.key;
    };
    this._getMaxItemDepth = () => {
      let depth = 0;
      for (const item of this.state.gridItems) {
        if (depth < item.depth) {
          depth = item.depth;
        }
      }
      return depth + 1;
    };
    this.state = {
      gridItems: [],
      orientation: props.orientation ?? PropertyGridCommons.getCurrentOrientation(
        props.width,
        void 0,
        props.isOrientationFixed,
        props.horizontalOrientationMinWidth
      ),
      dynamicNodeHeights: /* @__PURE__ */ new Map()
    };
  }
  componentDidUpdate(prevProps) {
    var _a3;
    if (this.props.orientation !== prevProps.orientation || this.props.isOrientationFixed !== prevProps.isOrientationFixed || this.props.horizontalOrientationMinWidth !== prevProps.horizontalOrientationMinWidth || this.props.width !== prevProps.width)
      this.updateOrientation(this.props.width);
    if (this.props.model !== prevProps.model) {
      if (this._listRef.current)
        this._listRef.current.resetAfterIndex(0);
    }
    if (this.props.highlight !== prevProps.highlight && ((_a3 = this.props.highlight) == null ? void 0 : _a3.activeHighlight) && this.state.gridItems.length !== 0) {
      let index = 0;
      let foundMatchingItem = false;
      for (const item of this.state.gridItems) {
        if (item instanceof MutableCategorizedPrimitiveProperty && this.props.highlight.activeHighlight.highlightedItemIdentifier === item.derivedRecord.property.name || item instanceof MutableGridCategory && this.props.highlight.activeHighlight.highlightedItemIdentifier === item.name) {
          foundMatchingItem = true;
          break;
        }
        index++;
      }
      if (foundMatchingItem) {
        if (this._listRef.current)
          this._listRef.current.scrollToItem(index);
      }
    }
  }
  /** @internal */
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      gridItems: props.model.getVisibleFlatGrid()
    };
  }
  updateOrientation(width) {
    const { orientation, isOrientationFixed, horizontalOrientationMinWidth } = {
      ...this.props
    };
    const currentOrientation = PropertyGridCommons.getCurrentOrientation(
      width,
      orientation,
      isOrientationFixed,
      horizontalOrientationMinWidth
    );
    if (currentOrientation !== this.state.orientation) {
      this.setState({ orientation: currentOrientation });
    }
  }
  /**
   * Calculate given node height depending on it's type, position in category, parent category depth and current orientation.
   * @param node FlatGridItem node for which to calculate height
   * @returns current height of node.
   */
  calculateNodeHeight(node) {
    return getPropertyHeight(this.state);
    function getPropertyHeight(state) {
      const dynamicHeight = state.dynamicNodeHeights.get(node.key);
      if (dynamicHeight !== void 0) {
        if (node instanceof MutableCustomGridCategory) {
          return CATEGORY_HEADER_HEIGHT + (node.isExpanded ? dynamicHeight : 0);
        }
        return dynamicHeight;
      }
      if (node.type === FlatGridItemType.Category) {
        return CATEGORY_HEADER_HEIGHT;
      }
      return state.orientation === Orientation.Vertical ? VERTICAL_CATEGORY_PROPERTY_HEIGHT : CATEGORY_PROPERTY_HEIGHT;
    }
  }
  calculateEstimatedHeight() {
    let sum = 0;
    for (const node of this.state.gridItems)
      sum += this.calculateNodeHeight(node);
    return Math.ceil(sum / this.state.gridItems.length);
  }
  render() {
    var _a3;
    const defaultActionButtonWidth = (((_a3 = this.props.actionButtonRenderers) == null ? void 0 : _a3.length) ?? 0) > 0 ? ACTION_BUTTON_DEFAULT_WIDTH : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ColumnResizingPropertyListPropsSupplier,
      {
        orientation: this.state.orientation,
        width: this.props.width,
        minLabelWidth: this.props.minLabelWidth,
        minValueWidth: this.props.minValueWidth,
        actionButtonWidth: this.props.actionButtonWidth !== void 0 ? this.props.actionButtonWidth : defaultActionButtonWidth,
        maxPropertyDepth: this._getMaxItemDepth(),
        children: (columnResizeContext) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PropertyGridEventsRelatedPropsSupplier,
          {
            isPropertySelectionEnabled: this.props.isPropertySelectionEnabled ?? false,
            isPropertySelectionOnRightClickEnabled: this.props.isPropertySelectionOnRightClickEnabled,
            isPropertyEditingEnabled: this.props.isPropertyEditingEnabled,
            onPropertyContextMenu: this.props.onPropertyContextMenu,
            onPropertyUpdated: this.props.onPropertyUpdated,
            onPropertySelectionChanged: this.props.onPropertySelectionChanged,
            isPropertyHoverEnabled: this.props.isPropertyHoverEnabled ?? false,
            children: (selectionContext) => {
              const gridContext = {
                orientation: columnResizeContext.orientation,
                gridWidth: this.props.width,
                isPropertyHoverEnabled: selectionContext.isPropertyHoverEnabled,
                isPropertySelectionEnabled: selectionContext.isPropertySelectionEnabled,
                selectedPropertyKey: selectionContext.selectedPropertyKey,
                onPropertyClicked: selectionContext.onPropertyClicked,
                onPropertyRightClicked: selectionContext.onPropertyRightClicked,
                onPropertyContextMenu: selectionContext.onPropertyContextMenu,
                editingPropertyKey: selectionContext.editingPropertyKey,
                onEditCommit: selectionContext.onEditCommit,
                onEditCancel: selectionContext.onEditCancel,
                eventHandler: this.props.eventHandler,
                dataProvider: this.props.dataProvider,
                actionButtonRenderers: this.props.actionButtonRenderers,
                propertyValueRendererManager: this.props.propertyValueRendererManager,
                propertyCategoryRendererManager: this.props.propertyCategoryRendererManager,
                columnRatio: columnResizeContext.columnRatio,
                columnInfo: columnResizeContext.columnInfo,
                isResizeHandleBeingDragged: columnResizeContext.isResizeHandleBeingDragged,
                isResizeHandleHovered: columnResizeContext.isResizeHandleHovered,
                onColumnRatioChanged: columnResizeContext.onColumnChanged,
                onResizeHandleDragChanged: columnResizeContext.onResizeHandleDragChanged,
                onResizeHandleHoverChanged: columnResizeContext.onResizeHandleHoverChanged,
                highlight: this.props.highlight
              };
              const renderContext = {
                gridItems: this.state.gridItems,
                gridEventHandler: this.props.eventHandler,
                gridModel: this.props.model,
                style: this.props.style,
                className: this.props.className,
                onItemHeightChanged: this._handleNodeHeightChange,
                gridContext
              };
              return /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyGridInternalContextProvider, { value: renderContext, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                VirtualizedPropertyGridInternal,
                {
                  width: this.props.width,
                  height: this.props.height,
                  itemCount: this.state.gridItems.length,
                  itemSize: this._calculateNodeHeightByIndex,
                  estimatedItemSize: this.calculateEstimatedHeight(),
                  overscanCount: 10,
                  layout: "vertical",
                  style: this.props.style,
                  itemKey: this._getNodeKey,
                  ref: this._listRef
                }
              ) });
            }
          }
        )
      }
    );
  }
}
const VirtualizedPropertyGridInternal = reactExports.forwardRef(
  function VirtualizedPropertyGridInternal2(props, ref) {
    const { gridContext } = usePropertyGridInternalContext(FlatGridItemNode);
    reactExports.useEffect(() => {
      return gridContext.dataProvider.onDataChanged.addListener(() => {
        var _a3;
        (_a3 = gridContext.onEditCancel) == null ? void 0 : _a3.call(gridContext);
      });
    }, [gridContext]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: classnames(
          "components-virtualized-property-grid",
          "components-smallEditor-host"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          VariableSizeList,
          {
            ...props,
            className: classnames(
              "components-property-grid-wrapper",
              "ReactWindow__VariableSizeList",
              props.className
            ),
            ref,
            children: FlatGridItemNode
          }
        )
      }
    );
  }
);
const FlatGridItemNode = reactExports.memo(
  ({ index, style: virtualizedListStyle }) => {
    const {
      gridItems,
      gridEventHandler,
      gridModel,
      gridContext,
      className,
      style,
      onItemHeightChanged
    } = usePropertyGridInternalContext(FlatGridItemNode);
    const node = gridItems[index];
    const divRef = reactExports.useRef(null);
    const previousHeightRef = reactExports.useRef(0);
    const onExpansionToggled = reactExports.useCallback(
      () => gridEventHandler.onExpansionToggled(node.selectionKey),
      [gridEventHandler, node.selectionKey]
    );
    const onHeightChanged = reactExports.useCallback(
      (newHeight) => onItemHeightChanged(index, node.key, newHeight),
      [onItemHeightChanged, index, node.key]
    );
    const minHeight = reactExports.useMemo(() => {
      if (node.type === FlatGridItemType.Category)
        return CATEGORY_HEADER_HEIGHT;
      return gridContext.orientation === Orientation.Vertical ? VERTICAL_CATEGORY_PROPERTY_HEIGHT : CATEGORY_PROPERTY_HEIGHT;
    }, [gridContext.orientation, node.type]);
    reactExports.useLayoutEffect(() => {
      assert(divRef.current !== null);
      const refHeight = divRef.current.getBoundingClientRect().height;
      const currentHeight = Math.max(refHeight, minHeight);
      if (currentHeight !== previousHeightRef.current) {
        onHeightChanged(currentHeight);
        previousHeightRef.current = currentHeight;
      }
    });
    function getDisplayNode() {
      var _a3, _b2, _c2, _d2;
      const lastInNumberOfCategories = node.lastInNumberOfCategories;
      switch (node.type) {
        case FlatGridItemType.Category:
          const categoryRendererManager = gridContext.propertyCategoryRendererManager ?? PropertyCategoryRendererManager.defaultManager;
          const customRenderer = categoryRendererManager.getCategoryComponent(node);
          const wrapperClassName = classnames(
            "virtualized-grid-node-content",
            customRenderer !== void 0 ? "virtualized-grid-node-custom-category" : "virtualized-grid-node-category"
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            FlatItemNestedBorderWrapper,
            {
              borderCount: node.depth,
              bottomBorderCount: lastInNumberOfCategories,
              className: wrapperClassName,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                PropertyCategoryBlock,
                {
                  className,
                  style,
                  category: node.derivedCategory,
                  onExpansionToggled,
                  highlight: ((_b2 = (_a3 = gridContext.highlight) == null ? void 0 : _a3.filteredTypes) == null ? void 0 : _b2.includes(
                    FilteredType.Category
                  )) ? gridContext.highlight : void 0,
                  children: customRenderer !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CustomCategoryContent,
                    {
                      renderer: customRenderer,
                      categoryItem: node,
                      gridContext,
                      onHeightChanged
                    }
                  )
                }
              )
            }
          );
        case FlatGridItemType.Array:
        case FlatGridItemType.Struct:
        case FlatGridItemType.Primitive:
          const selectionKey = node.selectionKey;
          const parentCategoryItem = gridModel.getItem(
            node.parentCategorySelectionKey
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            FlatItemNestedBorderWrapper,
            {
              borderCount: parentCategoryItem.depth + 1,
              bottomBorderCount: lastInNumberOfCategories,
              className: "virtualized-grid-node-content",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                FlatPropertyRenderer,
                {
                  uniqueKey: selectionKey,
                  propertyRecord: node.derivedRecord,
                  orientation: gridContext.orientation,
                  indentation: node.depth,
                  width: gridContext.gridWidth,
                  isHoverable: gridContext.isPropertyHoverEnabled,
                  isSelectable: gridContext.isPropertySelectionEnabled,
                  isSelected: selectionKey === gridContext.selectedPropertyKey,
                  onClick: gridContext.onPropertyClicked,
                  onRightClick: gridContext.onPropertyRightClicked,
                  onContextMenu: gridContext.onPropertyContextMenu,
                  category: parentCategoryItem.derivedCategory,
                  isEditing: selectionKey === gridContext.editingPropertyKey,
                  onEditCommit: gridContext.onEditCommit,
                  onEditCancel: gridContext.onEditCancel,
                  isExpanded: node.isExpanded,
                  onExpansionToggled,
                  onHeightChanged,
                  actionButtonRenderers: gridContext.actionButtonRenderers,
                  propertyValueRendererManager: gridContext.propertyValueRendererManager,
                  columnRatio: gridContext.columnRatio,
                  columnInfo: gridContext.columnInfo,
                  isResizeHandleBeingDragged: gridContext.isResizeHandleBeingDragged,
                  isResizeHandleHovered: gridContext.isResizeHandleHovered,
                  onColumnRatioChanged: gridContext.onColumnRatioChanged,
                  onResizeHandleDragChanged: gridContext.onResizeHandleDragChanged,
                  onResizeHandleHoverChanged: gridContext.onResizeHandleHoverChanged,
                  highlight: gridContext.highlight ? {
                    applyOnLabel: ((_c2 = gridContext.highlight.filteredTypes) == null ? void 0 : _c2.includes(
                      FilteredType.Label
                    )) ?? false,
                    applyOnValue: ((_d2 = gridContext.highlight.filteredTypes) == null ? void 0 : _d2.includes(
                      FilteredType.Value
                    )) ?? false,
                    ...gridContext.highlight
                  } : void 0
                },
                node.key
              )
            }
          );
      }
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "virtualized-grid-node", style: virtualizedListStyle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "virtualized-grid-node-content-wrapper",
        style: {
          minHeight: `${minHeight}px`,
          display: "grid"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: divRef,
            className: "virtualized-grid-node-content-wrapper-item",
            children: getDisplayNode()
          }
        )
      }
    ) });
  },
  areEqual
);
FlatGridItemNode.displayName = "FlatGridItemNode";
const CustomCategoryContent = (props) => {
  const { onHeightChanged } = props;
  const divRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    assert(divRef.current !== null);
    const contentHeight = divRef.current.getBoundingClientRect().height;
    onHeightChanged(contentHeight);
  }, [props.gridContext.orientation, onHeightChanged]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: divRef, children: reactExports.createElement(props.renderer, props) });
};
try {
  FlatGridItemNode.displayName = "FlatGridItemNode";
  FlatGridItemNode.__docgenInfo = { "description": "Returns callbacks for persisting and restoring [[VirtualizedPropertyGrid]] layout state.\nReturned `ref` should be set on container containing [[VirtualizedPropertyGrid]].", "displayName": "FlatGridItemNode", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
class MutableCategorizedArrayProperty extends MutableCategorizedProperty {
  constructor(record, parentSelectionKey, parentCategorySelectionKey, depth, gridItemFactory, overrideName, overrideDisplayLabel) {
    super(
      FlatGridItemType.Array,
      record,
      parentSelectionKey,
      parentCategorySelectionKey,
      depth,
      overrideName,
      overrideDisplayLabel
    );
    this._renderLabel = !record.property.hideCompositePropertyLabel;
    const childrenDepth = depth + (this._renderLabel ? 1 : 0);
    this._children = record.getChildrenRecords().map((child, index) => {
      const newName = `${child.property.name}_${index}`;
      let newDisplayLabel = `[${index + 1}]`;
      if (child.description && child.value.valueFormat !== PropertyValueFormat.Primitive) {
        newDisplayLabel += ` ${child.description}`;
      }
      return gridItemFactory.createCategorizedProperty(
        child,
        this.selectionKey,
        parentCategorySelectionKey,
        childrenDepth,
        newName,
        newDisplayLabel
      );
    });
  }
  get type() {
    return FlatGridItemType.Array;
  }
  getChildren() {
    return this._children;
  }
  getDescendantsAndSelf() {
    return this._renderLabel ? super.getDescendantsAndSelf() : this.getDescendants();
  }
  getVisibleDescendants() {
    const descendants = [];
    if (this.isExpanded || !this._renderLabel) {
      this.getChildren().forEach(
        (child) => descendants.push(...child.getVisibleDescendantsAndSelf())
      );
    }
    return descendants;
  }
  getVisibleDescendantsAndSelf() {
    return this._renderLabel ? super.getVisibleDescendantsAndSelf() : this.getVisibleDescendants();
  }
}
class MutableCategorizedStructProperty extends MutableCategorizedProperty {
  constructor(record, parentSelectionKey, parentCategorySelectionKey, depth, gridItemFactory, overrideName, overrideDisplayLabel) {
    super(
      FlatGridItemType.Struct,
      record,
      parentSelectionKey,
      parentCategorySelectionKey,
      depth,
      overrideName,
      overrideDisplayLabel
    );
    this._renderLabel = !record.property.hideCompositePropertyLabel;
    const childrenDepth = depth + (this._renderLabel ? 1 : 0);
    this._children = record.getChildrenRecords().map((value) => {
      return gridItemFactory.createCategorizedProperty(
        value,
        this.selectionKey,
        this.parentCategorySelectionKey,
        childrenDepth
      );
    });
  }
  get type() {
    return FlatGridItemType.Struct;
  }
  getChildren() {
    return this._children;
  }
  getDescendantsAndSelf() {
    return this._renderLabel ? super.getDescendantsAndSelf() : this.getDescendants();
  }
  getVisibleDescendants() {
    const descendants = [];
    if (this.isExpanded || !this._renderLabel) {
      this.getChildren().forEach(
        (child) => descendants.push(...child.getVisibleDescendantsAndSelf())
      );
    }
    return descendants;
  }
  getVisibleDescendantsAndSelf() {
    return this._renderLabel ? super.getVisibleDescendantsAndSelf() : this.getVisibleDescendants();
  }
}
class MutableGridItemFactory {
  createPrimitiveProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    return new MutableCategorizedPrimitiveProperty(
      record,
      parentSelectionKey,
      parentCategorySelectionKey,
      depth,
      overrideName,
      overrideDisplayLabel
    );
  }
  createArrayProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    return new MutableCategorizedArrayProperty(
      record,
      parentSelectionKey,
      parentCategorySelectionKey,
      depth,
      this,
      overrideName,
      overrideDisplayLabel
    );
  }
  createStructProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    return new MutableCategorizedStructProperty(
      record,
      parentSelectionKey,
      parentCategorySelectionKey,
      depth,
      this,
      overrideName,
      overrideDisplayLabel
    );
  }
  /**
   * Converts record into FlatGridItem.
   * @param record record to convert to a FlatGridItem.
   * @param parentSelectionKey parent selection key of provided `record`.
   * @param parentCategorySelectionKey parent category selection key of provided `record`.
   * @param depth current depth counting from parent category.
   * @param overrideName property name that overrides original record property name.
   * @param overrideDisplayLabel property display label that overrides original record property display label.
   * @returns converted CategorizedProperty.
   */
  createCategorizedProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    const valueFormat = record.value.valueFormat;
    switch (valueFormat) {
      case PropertyValueFormat.Primitive:
        return this.createPrimitiveProperty(
          record,
          parentSelectionKey,
          parentCategorySelectionKey,
          depth,
          overrideName,
          overrideDisplayLabel
        );
      case PropertyValueFormat.Array:
        return this.createArrayProperty(
          record,
          parentSelectionKey,
          parentCategorySelectionKey,
          depth,
          overrideName,
          overrideDisplayLabel
        );
      case PropertyValueFormat.Struct:
        return this.createStructProperty(
          record,
          parentSelectionKey,
          parentCategorySelectionKey,
          depth,
          overrideName,
          overrideDisplayLabel
        );
      default:
        const unhandledRecordType = valueFormat;
        throw new Error(
          `Unhandled property record type. Was a new type added? ${unhandledRecordType}`
        );
    }
  }
  /**
   * Converts category into GridCategoryItem.
   * @param category PropertyCategory to convert.
   * @param recordsDict dictionary of category records.
   * @param parentSelectionKey parent selection key of this category.
   * @param depth current depth counting from root category.
   * @returns converted GridCategory.
   */
  createGridCategory(category, recordsDict, parentSelectionKey, depth) {
    if (category.renderer !== void 0)
      return new MutableCustomGridCategory(
        category,
        recordsDict,
        this,
        parentSelectionKey,
        depth ?? 0
      );
    if (parentSelectionKey !== void 0 && depth !== void 0)
      return new MutableGridCategory(
        category,
        recordsDict,
        this,
        parentSelectionKey,
        depth
      );
    return new MutableGridCategory(category, recordsDict, this);
  }
}
class PropertyGridEventHandler {
  constructor(_modelSource) {
    this._modelSource = _modelSource;
    this.onExpansionToggled = (selectionKey) => {
      this._modelSource.modifyModel((draftModel) => {
        const item = draftModel.getItem(selectionKey);
        item.isExpanded = !item.isExpanded;
      });
    };
  }
}
var _a;
class MutablePropertyGridModel {
  constructor(propertyData, _gridItemFactory) {
    this._gridItemFactory = _gridItemFactory;
    this[_a] = true;
    this._categories = propertyData.categories.map(
      (category) => this._gridItemFactory.createGridCategory(category, propertyData.records)
    );
  }
  /**
   * Retrieves grid item from model.
   * @param selectionKey unique key for identifying item to retrieve.
   */
  getItem(selectionKey) {
    const item = this.findItem(this._categories, selectionKey);
    if (!item)
      throw new Error(`Grid item at provided key not found: ${selectionKey}`);
    return item;
  }
  /**
   * Walks the grid item hierarchy and finds item matching key
   * @param items items and their descendants to check
   * @param selectionKey unique key for identifying item
   * @returns FlatGridItem if items with key exists, undefined otherwise
   */
  findItem(items, selectionKey) {
    for (const item of items) {
      if (!selectionKey.startsWith(item.selectionKey))
        continue;
      if (item.selectionKey === selectionKey)
        return item;
      const foundItem = this.findItem(item.getChildren(), selectionKey);
      if (foundItem)
        return foundItem;
    }
    return void 0;
  }
  /**
   * Gets all GridCategoryItems that do not have parent categories.
   * @returns array of GridCategoryItems
   */
  getRootCategories() {
    return this._categories;
  }
  /**
   * Gets an array of all FlatGridItems.
   * @returns 1-Dimensional array of GridCategories and CategorizedProperties
   */
  getFlatGrid() {
    const flatGrid = [];
    this._categories.forEach(
      (category) => flatGrid.push(...category.getDescendantsAndSelf())
    );
    return flatGrid;
  }
  /**
   * Gets an array of all currently visible FlatGridItems.
   * @returns 1-Dimensional array of GridCategories and CategorizedProperties
   */
  getVisibleFlatGrid() {
    const visibleItems = [];
    this._categories.forEach(
      (category) => visibleItems.push(...category.getVisibleDescendantsAndSelf())
    );
    return visibleItems;
  }
}
_a = L;
class PropertyGridModelChangeEvent extends BeEvent {
}
class PropertyGridModelSource {
  constructor(_gridFactory) {
    this._gridFactory = _gridFactory;
    this.onModelChanged = new PropertyGridModelChangeEvent();
  }
  getFullModelMap(fullModel) {
    const fullModelMap = /* @__PURE__ */ new Map();
    for (const item of fullModel) {
      const key = item.selectionKey;
      fullModelMap.set(key, item);
    }
    return fullModelMap;
  }
  moveOldModelState(oldModel, newModel) {
    const oldModelMap = this.getFullModelMap(oldModel.getFlatGrid());
    const flatGrid = newModel.getFlatGrid();
    flatGrid.forEach((gridItem) => {
      const oldGridItem = oldModelMap.get(gridItem.selectionKey);
      if (oldGridItem)
        gridItem.isExpanded = oldGridItem.isExpanded;
    });
  }
  setPropertyData(data) {
    const newModel = new MutablePropertyGridModel(data, this._gridFactory);
    if (this._model !== void 0 && data.reusePropertyDataState)
      this.moveOldModelState(this._model, newModel);
    this._model = newModel;
    this.onModelChanged.raiseEvent();
  }
  /**
   * Modifies property grid model using provided callback.
   * If changes to model are detected, onModelChanged emits an event to all subscribers.
   */
  modifyModel(callback) {
    if (!this._model)
      return;
    this._model = fn(this._model, callback);
    this.onModelChanged.raiseEvent();
  }
  /** Returns property grid model. */
  getModel() {
    return this._model;
  }
}
function usePropertyData(props) {
  const { dataProvider } = props;
  const [forcedUpdate, triggerForcedUpdate] = reactExports.useReducer(() => ({}), {});
  reactExports.useEffect(() => {
    return dataProvider.onDataChanged.addListener(() => {
      triggerForcedUpdate();
    });
  }, [dataProvider]);
  return useDebouncedAsyncValue(
    reactExports.useCallback(
      async () => dataProvider.getData(),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dataProvider, forcedUpdate]
    )
  );
}
function useTrackedPropertyGridModelSource(props) {
  const { value: propertyData, inProgress } = usePropertyData(props);
  const { dataProvider } = { ...props };
  const modelSource = reactExports.useMemo(
    () => new PropertyGridModelSource(new MutableGridItemFactory()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataProvider]
  );
  reactExports.useEffect(() => {
    if (propertyData)
      modelSource.setPropertyData(propertyData);
  }, [modelSource, propertyData]);
  return { modelSource, inProgress };
}
function usePropertyGridEventHandler(props) {
  return reactExports.useMemo(
    () => new PropertyGridEventHandler(props.modelSource),
    [props.modelSource]
  );
}
function usePropertyGridModel(props) {
  const { modelSource } = { ...props };
  const [model, setModel] = reactExports.useState();
  reactExports.useEffect(() => {
    const modelChanged = () => {
      setModel(modelSource.getModel());
    };
    modelChanged();
    return modelSource.onModelChanged.addListener(modelChanged);
  }, [modelSource]);
  return model;
}
function VirtualizedPropertyGridWithDataProvider(props) {
  const { modelSource, inProgress } = useTrackedPropertyGridModelSource({
    dataProvider: props.dataProvider
  });
  const model = usePropertyGridModel({ modelSource });
  const eventHandler = usePropertyGridEventHandler({ modelSource });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DelayedLoaderRenderer, { shouldRenderLoader: inProgress || !model, children: model && /* @__PURE__ */ jsxRuntimeExports.jsx(
    VirtualizedPropertyGrid,
    {
      ...props,
      model,
      eventHandler
    }
  ) });
}
function DelayedLoaderRenderer({
  children,
  shouldRenderLoader
}) {
  const [showSpinner, setShowSpinner] = reactExports.useState(shouldRenderLoader);
  reactExports.useEffect(() => {
    if (!shouldRenderLoader) {
      setShowSpinner(shouldRenderLoader);
      return;
    }
    const timeout = setTimeout(() => {
      setShowSpinner(shouldRenderLoader);
    }, 250);
    return () => clearTimeout(timeout);
  }, [shouldRenderLoader]);
  return !showSpinner ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-virtualized-property-grid-loader", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRadial, { indeterminate: true, size: "large" }) });
}
try {
  VirtualizedPropertyGridWithDataProvider.displayName = "VirtualizedPropertyGridWithDataProvider";
  VirtualizedPropertyGridWithDataProvider.__docgenInfo = { "description": "[[VirtualizedPropertyGrid]] React Component which takes a data provider and\nsets up default implementations for [[IPropertyGridModelSource]] and [[IPropertyGridEventHandler]]", "displayName": "VirtualizedPropertyGridWithDataProvider", "props": { "dataProvider": { "defaultValue": null, "description": "Property data provider used by the property grid", "name": "dataProvider", "required": true, "type": { "name": "IPropertyDataProvider" } }, "highlight": { "defaultValue": null, "description": "Properties for highlighting property data in the grid.", "name": "highlight", "required": false, "type": { "name": "PropertyGridContentHighlightProps" } }, "propertyCategoryRendererManager": { "defaultValue": null, "description": "Custom property category renderer manager. Defaults to [[PropertyCategoryRendererManager.defaultManager]].", "name": "propertyCategoryRendererManager", "required": false, "type": { "name": "PropertyCategoryRendererManager" } }, "width": { "defaultValue": null, "description": "Width of the property grid component.", "name": "width", "required": true, "type": { "name": "number" } }, "height": { "defaultValue": null, "description": "Height of the property grid component.", "name": "height", "required": true, "type": { "name": "number" } }, "orientation": { "defaultValue": null, "description": "Grid orientation. When not defined, it is chosen automatically based on width of the grid.", "name": "orientation", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "isPropertyHoverEnabled": { "defaultValue": null, "description": "Enables/disables property hovering effect", "name": "isPropertyHoverEnabled", "required": false, "type": { "name": "boolean" } }, "onPropertyContextMenu": { "defaultValue": null, "description": "Called to show a context menu when properties are right-clicked", "name": "onPropertyContextMenu", "required": false, "type": { "name": "((args: PropertyGridContextMenuArgs) => void)" } }, "isPropertySelectionEnabled": { "defaultValue": null, "description": "Enables/disables property selection", "name": "isPropertySelectionEnabled", "required": false, "type": { "name": "boolean" } }, "isPropertySelectionOnRightClickEnabled": { "defaultValue": null, "description": "Enables/disables property selection with right click", "name": "isPropertySelectionOnRightClickEnabled", "required": false, "type": { "name": "boolean" } }, "onPropertySelectionChanged": { "defaultValue": null, "description": "Callback to property selection", "name": "onPropertySelectionChanged", "required": false, "type": { "name": "((property: PropertyRecord) => void)" } }, "isPropertyEditingEnabled": { "defaultValue": null, "description": "Enables/disables property editing", "name": "isPropertyEditingEnabled", "required": false, "type": { "name": "boolean" } }, "onPropertyEditing": { "defaultValue": null, "description": "Callback for when properties are being edited", "name": "onPropertyEditing", "required": false, "type": { "name": "((args: PropertyEditingArgs, category: PropertyCategory) => void)" } }, "onPropertyUpdated": { "defaultValue": null, "description": "Callback for when properties are updated", "name": "onPropertyUpdated", "required": false, "type": { "name": "((args: PropertyUpdatedArgs, category: PropertyCategory) => Promise<boolean>)" } }, "propertyValueRendererManager": { "defaultValue": null, "description": "Custom property value renderer manager", "name": "propertyValueRendererManager", "required": false, "type": { "name": "PropertyValueRendererManager" } }, "isOrientationFixed": { "defaultValue": null, "description": "Indicates whether the orientation is fixed and does not auto-switch to Vertical when the width is too narrow. Defaults to false.", "name": "isOrientationFixed", "required": false, "type": { "name": "boolean" } }, "horizontalOrientationMinWidth": { "defaultValue": null, "description": "The minimum width before the auto-switch to Vertical when the width is too narrow. Defaults to 300.", "name": "horizontalOrientationMinWidth", "required": false, "type": { "name": "number" } }, "minLabelWidth": { "defaultValue": null, "description": "Minimum allowed label column width, after which resizing stops", "name": "minLabelWidth", "required": false, "type": { "name": "number" } }, "minValueWidth": { "defaultValue": null, "description": "Minimum allowed value column width, after which resizing stops", "name": "minValueWidth", "required": false, "type": { "name": "number" } }, "actionButtonWidth": { "defaultValue": null, "description": "Fixed action button column width", "name": "actionButtonWidth", "required": false, "type": { "name": "number" } }, "actionButtonRenderers": { "defaultValue": null, "description": "Array of action button renderers. Each renderer is called for each property and can decide\nto render an action button for the property or not.", "name": "actionButtonRenderers", "required": false, "type": { "name": "ActionButtonRenderer[]" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function ControlledSelectableContent(props) {
  const { onSelectedContentIdChanged, disabled } = props;
  const onContentIdSelected = reactExports.useCallback(
    (newValue) => {
      onSelectedContentIdChanged && onSelectedContentIdChanged(newValue);
    },
    [onSelectedContentIdChanged]
  );
  const selectedContent = props.children.find(
    (contentDef) => contentDef.id === props.selectedContentId
  ) ?? props.children[0];
  const options = reactExports.useMemo(() => {
    return props.children.map((componentDef) => ({
      label: componentDef.label,
      value: componentDef.id
    }));
  }, [props.children]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "components-selectable-content", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-selectable-content-header", children: options.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        onChange: onContentIdSelected,
        size: "small",
        className: "components-selectable-content-selector",
        "aria-label": props.selectAriaLabel,
        value: selectedContent.id,
        options,
        disabled
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-selectable-content-wrapper", children: selectedContent == null ? void 0 : selectedContent.render() })
  ] });
}
function SelectableContent(props) {
  const [selectedContentId, setSelectedContentId] = reactExports.useState(
    props.defaultSelectedContentId
  );
  const onSelectedContentIdChanged = reactExports.useCallback((id) => {
    setSelectedContentId(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ControlledSelectableContent,
    {
      selectedContentId,
      onSelectedContentIdChanged,
      selectAriaLabel: props.selectAriaLabel,
      disabled: props.disabled,
      children: props.children
    }
  );
}
try {
  ControlledSelectableContent.displayName = "ControlledSelectableContent";
  ControlledSelectableContent.__docgenInfo = { "description": "A fully-controlled component that accepts a list of child components with ids and labels and\nrenders a select box at the top, allowing to choose which of the provided child components\nshould be rendered at the bottom.", "displayName": "ControlledSelectableContent", "props": { "selectedContentId": { "defaultValue": null, "description": "", "name": "selectedContentId", "required": true, "type": { "name": "string" } }, "onSelectedContentIdChanged": { "defaultValue": null, "description": "", "name": "onSelectedContentIdChanged", "required": false, "type": { "name": "((contentId: string) => void)" } }, "selectAriaLabel": { "defaultValue": null, "description": "", "name": "selectAriaLabel", "required": false, "type": { "name": "string" } }, "disabled": { "defaultValue": null, "description": "", "name": "disabled", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  SelectableContent.displayName = "SelectableContent";
  SelectableContent.__docgenInfo = { "description": "An uncontrolled component that accepts a list of child components with ids and labels and\nrenders a select box at the top, allowing to choose which of the provided child components\nshould be rendered at the bottom.", "displayName": "SelectableContent", "props": { "defaultSelectedContentId": { "defaultValue": null, "description": "", "name": "defaultSelectedContentId", "required": true, "type": { "name": "string" } }, "selectAriaLabel": { "defaultValue": null, "description": "", "name": "selectAriaLabel", "required": false, "type": { "name": "string" } }, "disabled": { "defaultValue": null, "description": "", "name": "disabled", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function GroupTool(props) {
  const ref = reactExports.useRef(null);
  const targeted = useTargeted(ref);
  const itemClassName = classnames(
    "components-toolbar-item-expandable-group-tool-item",
    props.isActive && "components-active",
    props.isFocused && "components-focused",
    props.isDisabled && "components-disabled",
    props.onPointerUp && "components-pointer-up",
    targeted && "components-targeted",
    props.className
  );
  const handleClick2 = reactExports.useCallback(() => {
    if (!props.isDisabled && props.onClick)
      props.onClick(props.item);
  }, [props]);
  const handlePointerUp = reactExports.useCallback(() => {
    if (!props.isDisabled && props.onPointerUp)
      props.onPointerUp(props.item);
  }, [props]);
  const providerId = "providerId" in props.item ? props.item.providerId : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: itemClassName,
      onClick: handleClick2,
      onKeyDown: props.onKeyDown,
      onPointerUp: handlePointerUp,
      "data-item-id": props.item.id,
      "data-item-type": "popup-tool-panel-item",
      "data-item-priority": props.item.itemPriority,
      "data-item-provider-id": providerId,
      ref,
      style: props.style,
      role: "button",
      tabIndex: 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "components-icon", children: [
          props.icon,
          props.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-badge", children: props.badge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-label", children: props.label }),
        props.children
      ]
    }
  );
}
try {
  GroupTool.displayName = "GroupTool";
  GroupTool.__docgenInfo = { "description": "Tool entry of tool group panel. Used in [[GroupColumn]].", "displayName": "GroupTool", "props": { "children": { "defaultValue": null, "description": "Additional content, besides icon and label.", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "icon": { "defaultValue": null, "description": "Tool icon.", "name": "icon", "required": false, "type": { "name": "ReactNode" } }, "isActive": { "defaultValue": null, "description": "Describes if the item is active.", "name": "isActive", "required": false, "type": { "name": "boolean" } }, "isDisabled": { "defaultValue": null, "description": "Describes if the item is disabled.", "name": "isDisabled", "required": false, "type": { "name": "boolean" } }, "isFocused": { "defaultValue": null, "description": "Describes if the item is focused.", "name": "isFocused", "required": false, "type": { "name": "boolean" } }, "label": { "defaultValue": null, "description": "Tool label.", "name": "label", "required": false, "type": { "name": "string" } }, "onClick": { "defaultValue": null, "description": "Function called when the item is clicked.", "name": "onClick", "required": false, "type": { "name": "((item: ActionButton | GroupButton) => void)" } }, "onPointerUp": { "defaultValue": null, "description": "Function called when pointer up event is received.", "name": "onPointerUp", "required": false, "type": { "name": "((item: ActionButton | GroupButton) => void)" } }, "badge": { "defaultValue": null, "description": "A badge to draw.", "name": "badge", "required": false, "type": { "name": "ReactNode" } }, "item": { "defaultValue": null, "description": "GroupButton item", "name": "item", "required": true, "type": { "name": "ActionButton | GroupButton" } }, "onKeyDown": { "defaultValue": null, "description": "Optional function to call on any KeyDown events processed by toolbar", "name": "onKeyDown", "required": false, "type": { "name": "((e: KeyboardEvent<Element>) => void)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function GroupColumn(props) {
  const className = classnames(
    "components-toolbar-item-expandable-group-column",
    props.className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, style: props.style, children: props.children });
}
try {
  GroupColumn.displayName = "GroupColumn";
  GroupColumn.__docgenInfo = { "description": "Tool group column. Used in [[Group]] components.", "displayName": "GroupColumn", "props": { "children": { "defaultValue": null, "description": "Actual content. I.e. tool items: [[GroupToolExpander]], [[GroupTool]]", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function Columns(props) {
  const className = classnames(
    "components-toolbar-item-expandable-group-columns",
    props.className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, style: props.style, children: props.children });
}
try {
  Columns.displayName = "Columns";
  Columns.__docgenInfo = { "description": "Columns of tool group. Used in [[Group]], [[NestedGroup]] components.", "displayName": "Columns", "props": { "children": { "defaultValue": null, "description": "Actual columns. I.e. [[GroupColumn]]", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function Panel(props) {
  const className = classnames(
    "components-toolbar-item-expandable-group-panel",
    props.className
  );
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className,
        style: props.style,
        onKeyDown: props.onKeyDown,
        role: "region",
        children: props.children
      }
    )
  );
}
try {
  Panel.displayName = "Panel";
  Panel.__docgenInfo = { "description": "Basic panel used in Toolbar popups. Used as base in [[Group]] and [[NestedGroup]] components.", "displayName": "Panel", "props": { "children": { "defaultValue": null, "description": "Panel content.", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "onKeyDown": { "defaultValue": null, "description": "", "name": "onKeyDown", "required": false, "type": { "name": "((e: KeyboardEvent<Element>) => void)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function Title(props) {
  const className = classnames(
    "components-toolbar-item-expandable-group-title",
    props.className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, style: props.style, children: props.children });
}
try {
  Title.displayName = "Title";
  Title.__docgenInfo = { "description": "Tool group title.", "displayName": "Title", "props": { "children": { "defaultValue": null, "description": "Actual title.", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const ToolbarButtonItem = reactExports.memo(
  (props) => {
    const className = classnames(
      "components-toolbar-button-item",
      props.isActive && "components-active",
      props.isDisabled && "components-disabled",
      props.className
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        "data-item-id": props.itemId,
        "data-item-type": "action-tool-button",
        "data-item-group-priority": props.groupPriority,
        "data-item-priority": props.itemPriority,
        "data-item-provider-id": props.providerId,
        disabled: props.isDisabled,
        onClick: props.onClick,
        onKeyDown: props.onKeyDown,
        className,
        style: props.style,
        title: props.title,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-icon", children: props.icon }),
          props.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-badge", children: props.badge })
        ]
      }
    );
  }
);
try {
  ToolbarButtonItem.displayName = "ToolbarButtonItem";
  ToolbarButtonItem.__docgenInfo = { "description": "Toolbar item component. Used in [[Toolbar]] component.", "displayName": "ToolbarButtonItem", "props": { "icon": { "defaultValue": null, "description": "button icon.", "name": "icon", "required": false, "type": { "name": "ReactNode" } }, "isActive": { "defaultValue": null, "description": "Describes if item is active.", "name": "isActive", "required": false, "type": { "name": "boolean" } }, "isDisabled": { "defaultValue": null, "description": "Describes if the item is disabled.", "name": "isDisabled", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Function called when the item is clicked.", "name": "onClick", "required": false, "type": { "name": "(() => void)" } }, "onKeyDown": { "defaultValue": null, "description": "Function called when a key is pressed.", "name": "onKeyDown", "required": false, "type": { "name": "((e: KeyboardEvent<Element>) => void)" } }, "title": { "defaultValue": null, "description": "Title for the item.", "name": "title", "required": true, "type": { "name": "string" } }, "badge": { "defaultValue": null, "description": "A badge to draw.", "name": "badge", "required": false, "type": { "name": "ReactNode" } }, "addGroupSeparator": { "defaultValue": null, "description": "If true add a gap before button. Default to false.", "name": "addGroupSeparator", "required": false, "type": { "name": "boolean" } }, "providerId": { "defaultValue": null, "description": "value added to DOM element as a data attribute to hold name of items provider. If specified in `FrontstageProvider` then this will be undefined", "name": "providerId", "required": false, "type": { "name": "string" } }, "itemPriority": { "defaultValue": null, "description": "value added to DOM element as a data attribute, shows 0 is undefined", "name": "itemPriority", "required": false, "type": { "name": "number" } }, "groupPriority": { "defaultValue": null, "description": "value added to DOM element as a data attribute", "name": "groupPriority", "required": false, "type": { "name": "number" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
var Direction = /* @__PURE__ */ ((Direction2) => {
  Direction2[Direction2["Left"] = 1] = "Left";
  Direction2[Direction2["Top"] = 2] = "Top";
  Direction2[Direction2["Right"] = 3] = "Right";
  Direction2[Direction2["Bottom"] = 4] = "Bottom";
  return Direction2;
})(Direction || {});
const _DirectionHelpers = class _DirectionHelpers {
  /** @returns Class name of specified [[Direction]] */
  static getCssClassName(direction) {
    switch (direction) {
      case 1:
        return _DirectionHelpers.LEFT_CLASS_NAME;
      case 2:
        return _DirectionHelpers.TOP_CLASS_NAME;
      case 3:
        return _DirectionHelpers.RIGHT_CLASS_NAME;
      case 4:
        return _DirectionHelpers.BOTTOM_CLASS_NAME;
    }
  }
  /** @returns Orthogonal direction of specified [[Direction]] */
  static getOrthogonalDirection(direction) {
    switch (direction) {
      case 1:
      case 3:
        return 1;
      case 2:
      case 4:
        return 0;
    }
  }
};
_DirectionHelpers.LEFT_CLASS_NAME = "components-direction-left";
_DirectionHelpers.TOP_CLASS_NAME = "components-direction-top";
_DirectionHelpers.RIGHT_CLASS_NAME = "components-direction-right";
_DirectionHelpers.BOTTOM_CLASS_NAME = "components-direction-bottom";
let DirectionHelpers = _DirectionHelpers;
var OrthogonalDirection = /* @__PURE__ */ ((OrthogonalDirection2) => {
  OrthogonalDirection2[OrthogonalDirection2["Vertical"] = 0] = "Vertical";
  OrthogonalDirection2[OrthogonalDirection2["Horizontal"] = 1] = "Horizontal";
  return OrthogonalDirection2;
})(OrthogonalDirection || {});
const _OrthogonalDirectionHelpers = class _OrthogonalDirectionHelpers {
  /** @returns Class name of specified [[OrthogonalDirection]] */
  static getCssClassName(direction) {
    switch (direction) {
      case 0:
        return _OrthogonalDirectionHelpers.VERTICAL_CLASS_NAME;
      case 1:
        return _OrthogonalDirectionHelpers.HORIZONTAL_CLASS_NAME;
    }
  }
  /** @returns Opposite of specified [[OrthogonalDirection]] */
  static inverse(direction) {
    switch (direction) {
      case 0:
        return 1;
      case 1:
        return 0;
    }
  }
};
_OrthogonalDirectionHelpers.VERTICAL_CLASS_NAME = "components-vertical";
_OrthogonalDirectionHelpers.HORIZONTAL_CLASS_NAME = "components-horizontal";
let OrthogonalDirectionHelpers = _OrthogonalDirectionHelpers;
function ToolbarItems(props) {
  const ref = reactExports.useRef(null);
  const { toolbarOpacitySetting, openPopupCount, overflowDisplayActive } = useToolbarWithOverflowDirectionContext();
  const useTransparentBackground = toolbarOpacitySetting === ToolbarOpacitySetting.Transparent;
  let toolbarOpacity = useTransparentBackground ? 0 : Number(
    document.documentElement.style.getPropertyValue(
      "--buic-toolbar-opacity"
    )
  );
  let boxShadowOpacity = useTransparentBackground ? 0 : TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT;
  let filterBlur = useTransparentBackground ? 0 : TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT;
  let showSeparators = toolbarOpacitySetting === ToolbarOpacitySetting.Transparent ? false : true;
  const isInitialMount = reactExports.useRef(true);
  const { onElementRef, proximityScale } = useWidgetOpacityContext();
  reactExports.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      onElementRef(ref);
    }
  }, [onElementRef]);
  if (toolbarOpacitySetting === ToolbarOpacitySetting.Proximity && openPopupCount < 1 && !overflowDisplayActive) {
    toolbarOpacity = calculateToolbarOpacity(proximityScale);
    boxShadowOpacity = calculateBoxShadowOpacity(proximityScale);
    filterBlur = calculateBackdropFilterBlur(proximityScale);
    if (proximityScale < 0.25)
      showSeparators = false;
  }
  const divStyle = {
    backgroundColor: getToolbarBackgroundColor(toolbarOpacity),
    boxShadow: getToolbarBoxShadow(boxShadowOpacity),
    backdropFilter: getToolbarBackdropFilter(filterBlur),
    ...props.style
  };
  const className = classnames(
    "components-toolbar-items-container",
    OrthogonalDirectionHelpers.getCssClassName(props.direction),
    showSeparators && "components-toolbar-show-decorators",
    props.className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, style: divStyle, ref, children: props.children });
}
try {
  ToolbarItems.displayName = "ToolbarItems";
  ToolbarItems.__docgenInfo = { "description": "Toolbar items container. Used in [[ToolbarWithOverflow]] component.", "displayName": "ToolbarItems", "props": { "children": { "defaultValue": null, "description": "Toolbar items.", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "direction": { "defaultValue": null, "description": "Toolbar items direction.", "name": "direction", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function ItemWrapper(props) {
  const { expandsTo, direction, overflowExpandsTo, overflowDirection } = useToolbarWithOverflowDirectionContext();
  const { hasOverflow, onResize, useHeight } = useToolItemEntryContext();
  const ref = useResizeObserverSingleDimension(
    onResize,
    useHeight
  );
  const className = classnames(
    "components-toolbar-item-container",
    hasOverflow && "components-overflown",
    OrthogonalDirectionHelpers.getCssClassName(
      hasOverflow ? overflowDirection : direction
    ),
    DirectionHelpers.getCssClassName(
      hasOverflow ? overflowExpandsTo : expandsTo
    ),
    props.className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, ref, style: props.style, children: props.children });
}
function useResizeObserverSingleDimension(onResize, useHeight) {
  const handleResize = reactExports.useCallback(
    (w, h) => {
      if (useHeight)
        return onResize(h);
      return onResize(w);
    },
    [useHeight, onResize]
  );
  return useResizeObserver(handleResize);
}
try {
  ItemWrapper.displayName = "ItemWrapper";
  ItemWrapper.__docgenInfo = { "description": "Used in a [[ItemWrapper]] component to display a setting.", "displayName": "ItemWrapper", "props": { "children": { "defaultValue": null, "description": "Tool setting content.", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function ToolbarOverflowButton(props) {
  const { onResize, useHeight } = useToolItemEntryContext();
  const [targetRef, target] = useRefState();
  const ref = useResizeObserverSingleDimension(
    onResize,
    useHeight
  );
  const isHidden = useToolbarPopupAutoHideContext();
  const popupClassName = classnames(
    "components-toolbar-overflow_popup",
    isHidden && "nz-hidden"
  );
  const className = classnames(
    "components-toolbar-item-container",
    "components-toolbar-overflow-button",
    props.className
  );
  const buttonClassName = classnames(
    "components-toolbar-button-item",
    "components-ellipsis-icon"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, ref: targetRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        ref,
        onClick: props.onClick,
        className: buttonClassName,
        style: props.style,
        title: props.title,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-ellipsis" }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Popup,
      {
        className: popupClassName,
        offset: 0,
        showShadow: false,
        isOpen: props.open,
        onClose: props.onClose,
        position: toToolbarOverflowRelativePosition(props.expandsTo),
        target,
        children: props.panelNode
      }
    )
  ] });
}
function toToolbarOverflowRelativePosition(expandsTo) {
  switch (expandsTo) {
    case Direction.Bottom:
      return RelativePosition.Bottom;
    case Direction.Left:
      return RelativePosition.Left;
    case Direction.Right:
      return RelativePosition.Right;
    case Direction.Top:
      return RelativePosition.Top;
  }
}
try {
  ToolbarOverflowButton.displayName = "ToolbarOverflowButton";
  ToolbarOverflowButton.__docgenInfo = { "description": "Button to toggle display of overflown tools.", "displayName": "ToolbarOverflowButton", "props": { "onClick": { "defaultValue": null, "description": "Function called when button is clicked.", "name": "onClick", "required": false, "type": { "name": "(() => void)" } }, "onClose": { "defaultValue": null, "description": "Function called when panel is closed.", "name": "onClose", "required": false, "type": { "name": "(() => void)" } }, "open": { "defaultValue": null, "description": "Describes if the panel is open.", "name": "open", "required": false, "type": { "name": "boolean" } }, "expandsTo": { "defaultValue": null, "description": "Panel expand direction.", "name": "expandsTo", "required": true, "type": { "name": "enum", "value": [{ "value": "1" }, { "value": "2" }, { "value": "3" }, { "value": "4" }] } }, "panelNode": { "defaultValue": null, "description": "Panel element containing the overflown buttons", "name": "panelNode", "required": false, "type": { "name": "ReactNode" } }, "title": { "defaultValue": null, "description": "Title for the item.", "name": "title", "required": false, "type": { "name": "string" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  toToolbarOverflowRelativePosition.displayName = "toToolbarOverflowRelativePosition";
  toToolbarOverflowRelativePosition.__docgenInfo = { "description": "", "displayName": "toToolbarOverflowRelativePosition", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function ToolbarOverflowPanel(props) {
  const {
    toolbarOpacitySetting,
    openPopupCount,
    overflowDisplayActive,
    expandsTo,
    overflowExpandsTo,
    overflowDirection
  } = useToolbarWithOverflowDirectionContext();
  const { proximityScale } = useWidgetOpacityContext();
  const useTransparentBackground = toolbarOpacitySetting === ToolbarOpacitySetting.Transparent;
  let toolbarOpacity = useTransparentBackground ? 0 : TOOLBAR_OPACITY_DEFAULT;
  let boxShadowOpacity = useTransparentBackground ? 0 : TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT;
  let filterBlur = useTransparentBackground ? 0 : TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT;
  let showSeparators = toolbarOpacitySetting === ToolbarOpacitySetting.Transparent ? false : true;
  if (toolbarOpacitySetting === ToolbarOpacitySetting.Proximity && openPopupCount < 1 && !overflowDisplayActive) {
    toolbarOpacity = calculateToolbarOpacity(proximityScale);
    boxShadowOpacity = calculateBoxShadowOpacity(proximityScale);
    filterBlur = calculateBackdropFilterBlur(proximityScale);
    if (proximityScale < 0.25)
      showSeparators = false;
  }
  const divStyle = {
    backgroundColor: getToolbarBackgroundColor(toolbarOpacity),
    boxShadow: getToolbarBoxShadow(boxShadowOpacity),
    backdropFilter: getToolbarBackdropFilter(filterBlur),
    ...props.style
  };
  const className = classnames(
    "components-toolbar-overflow-panel",
    "components-toolbar-items-container",
    OrthogonalDirectionHelpers.getCssClassName(overflowDirection),
    `${OrthogonalDirectionHelpers.getCssClassName(
      overflowDirection
    )}-${DirectionHelpers.getCssClassName(expandsTo)}`,
    showSeparators && "components-toolbar-show-decorators",
    DirectionHelpers.getCssClassName(overflowExpandsTo),
    props.className
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, style: divStyle, children: props.children });
}
try {
  ToolbarOverflowPanel.displayName = "ToolbarOverflowPanel";
  ToolbarOverflowPanel.__docgenInfo = { "description": "Displays overflown tool settings.", "displayName": "ToolbarOverflowPanel", "props": { "children": { "defaultValue": null, "description": "Panel content.", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const BackArrow = reactExports.memo(
  (props) => {
    const ref = reactExports.useRef(null);
    const targeted = useTargeted(ref);
    const className = classnames(
      "components-toolbar-item-expandable-group-backArrow",
      targeted && "components-targeted",
      props.className
    );
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className,
          onClick: props.onClick,
          onPointerUp: props.onPointerUp,
          ref,
          style: props.style,
          role: "button",
          tabIndex: -1
        }
      )
    );
  }
);
try {
  BackArrow.displayName = "BackArrow";
  BackArrow.__docgenInfo = { "description": "Back arrow used in [[NestedGroup]] component.", "displayName": "BackArrow", "props": { "onClick": { "defaultValue": null, "description": "Function called when arrow is clicked.", "name": "onClick", "required": false, "type": { "name": "(() => void)" } }, "onPointerUp": { "defaultValue": null, "description": "Function called when pointer up event is received.", "name": "onPointerUp", "required": false, "type": { "name": "(() => void)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const GroupToolExpander = reactExports.memo(
  (props) => {
    const { className, ...otherProps } = props;
    const expanderClassName = classnames(
      "components-toolbar-item-expandable-group-tool-expander",
      className
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(GroupTool, { className: expanderClassName, ...otherProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-expansion-indicator" }) });
  }
);
try {
  GroupToolExpander.displayName = "GroupToolExpander";
  GroupToolExpander.__docgenInfo = { "description": "Expandable entry of tool group panel. Used in [[GroupColumn]] to select nested Groups.", "displayName": "GroupToolExpander", "props": { "isDisabled": { "defaultValue": null, "description": "Describes if the item is disabled.", "name": "isDisabled", "required": false, "type": { "name": "boolean" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } }, "onClick": { "defaultValue": null, "description": "Function called when the item is clicked.", "name": "onClick", "required": false, "type": { "name": "((item: ActionButton | GroupButton) => void)" } }, "label": { "defaultValue": null, "description": "Tool label.", "name": "label", "required": false, "type": { "name": "string" } }, "onKeyDown": { "defaultValue": null, "description": "Optional function to call on any KeyDown events processed by toolbar", "name": "onKeyDown", "required": false, "type": { "name": "((e: KeyboardEvent<Element>) => void)" } }, "onPointerUp": { "defaultValue": null, "description": "Function called when pointer up event is received.", "name": "onPointerUp", "required": false, "type": { "name": "((item: ActionButton | GroupButton) => void)" } }, "icon": { "defaultValue": null, "description": "Tool icon.", "name": "icon", "required": false, "type": { "name": "ReactNode" } }, "badge": { "defaultValue": null, "description": "A badge to draw.", "name": "badge", "required": false, "type": { "name": "ReactNode" } }, "isFocused": { "defaultValue": null, "description": "Describes if the item is focused.", "name": "isFocused", "required": false, "type": { "name": "boolean" } }, "item": { "defaultValue": null, "description": "GroupButton item", "name": "item", "required": true, "type": { "name": "ActionButton | GroupButton" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function getNumItemsInColumn(numTotalItems) {
  if (numTotalItems <= 6)
    return numTotalItems;
  if (numTotalItems <= 24)
    return Math.ceil(numTotalItems / 2);
  if (numTotalItems <= 36)
    return Math.ceil(numTotalItems / 3);
  return Math.ceil(numTotalItems / 4);
}
function PopupItemsPanel(props) {
  const [groupArray, setGroupArray] = reactExports.useState([props.groupItem]);
  const activeGroup = reactExports.useMemo(() => groupArray[0], [groupArray]);
  const items = reactExports.useMemo(() => activeGroup.items, [activeGroup]);
  const preferredNumItemsInColumn = getNumItemsInColumn(items.length);
  const numberOfColumns = Math.ceil(items.length / preferredNumItemsInColumn);
  const numItemsPerColumn = Math.ceil(items.length / numberOfColumns);
  const columnToItems = reactExports.useMemo(
    () => items.reduce((acc, item, index) => {
      const columnIndex = Math.floor(index / numItemsPerColumn);
      if (columnIndex >= acc.length) {
        return [...acc, [item]];
      }
      return [
        ...acc.slice(0, columnIndex),
        [...acc[columnIndex], item],
        ...acc.slice(columnIndex + 1)
      ];
    }, []),
    [items, numItemsPerColumn]
  );
  const handleGroupItemClick = reactExports.useCallback(
    (item) => {
      if (ToolbarItemUtilities.isGroupButton(item)) {
        setGroupArray([item, ...groupArray]);
      }
    },
    [groupArray]
  );
  const handleBackArrowClick = reactExports.useCallback(() => {
    if (groupArray.length > 1) {
      setGroupArray(groupArray.slice(1));
    }
  }, [groupArray]);
  const { closePanel, setSelectedItem } = useToolbarPopupContext();
  const { onItemExecuted, onKeyDown } = useToolbarWithOverflowDirectionContext();
  const handleOnPointerUp = reactExports.useCallback(
    (panelItem) => {
      if (ToolbarItemUtilities.isActionButton(panelItem)) {
        props.activateOnPointerUp && setSelectedItem && setSelectedItem(panelItem);
        props.activateOnPointerUp && panelItem.execute();
        onItemExecuted(panelItem);
        props.activateOnPointerUp && closePanel();
      }
    },
    [props.activateOnPointerUp, setSelectedItem, closePanel, onItemExecuted]
  );
  const handleActionItemClick = reactExports.useCallback(
    (panelItem) => {
      if (ToolbarItemUtilities.isActionButton(panelItem)) {
        setSelectedItem && setSelectedItem(panelItem);
        panelItem.execute();
        onItemExecuted(panelItem);
        closePanel();
      }
    },
    [setSelectedItem, closePanel, onItemExecuted]
  );
  const handleOnKeyDown = reactExports.useCallback(
    (e) => {
      onKeyDown(e);
    },
    [onKeyDown]
  );
  const columns = reactExports.useMemo(
    () => columnToItems.map((columnItems, columnIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(GroupColumn, { children: columnItems.map((panelItem) => {
      const icon = IconHelper.getIconReactNode(
        panelItem.icon,
        panelItem.internalData
      );
      const label = ConditionalStringValue.getValue(panelItem.label);
      if (ToolbarItemUtilities.isGroupButton(panelItem)) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          GroupToolExpander,
          {
            isDisabled: ConditionalBooleanValue.getValue(
              panelItem.isDisabled
            ),
            label,
            icon,
            badge: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { type: panelItem.badgeKind || panelItem.badgeType }),
            item: panelItem,
            onClick: handleGroupItemClick
          },
          panelItem.id
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        GroupTool,
        {
          isDisabled: ConditionalBooleanValue.getValue(
            panelItem.isDisabled
          ),
          isActive: !!panelItem.isActive,
          label,
          icon,
          item: panelItem,
          onClick: handleActionItemClick,
          onPointerUp: handleOnPointerUp,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { type: panelItem.badgeKind || panelItem.badgeType })
        },
        panelItem.id
      );
    }) }, columnIndex)),
    [
      columnToItems,
      handleActionItemClick,
      handleGroupItemClick,
      handleOnPointerUp
    ]
  );
  const titleString = activeGroup.panelLabel ? activeGroup.panelLabel : activeGroup.label;
  const panelTitle = reactExports.useMemo(
    () => ConditionalStringValue.getValue(titleString),
    [titleString]
  );
  const className = classnames(
    1 === groupArray.length && "components-toolbar-item-expandable-group-group",
    groupArray.length > 1 && "components-toolbar-item-expandable-group-nested"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Panel, { className, onKeyDown: handleOnKeyDown, children: [
    groupArray.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(BackArrow, { className: "components-back", onClick: handleBackArrowClick }),
    panelTitle && /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { children: panelTitle }),
    columns && /* @__PURE__ */ jsxRuntimeExports.jsx(Columns, { children: columns })
  ] });
}
try {
  PopupItemsPanel.displayName = "PopupItemsPanel";
  PopupItemsPanel.__docgenInfo = { "description": "Component that displays a list of tools in a panel.", "displayName": "PopupItemsPanel", "props": { "groupItem": { "defaultValue": null, "description": "", "name": "groupItem", "required": true, "type": { "name": "GroupButtonWithBadgeKind" } }, "activateOnPointerUp": { "defaultValue": null, "description": "", "name": "activateOnPointerUp", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const getDragDistance = (from2, to) => {
  return from2.getDistanceTo(to);
};
function useDrag(args) {
  const { initialPosition, onDrag } = args;
  const handlePointerMove = reactExports.useCallback(
    (e) => {
      if (!initialPosition.current)
        return;
      const newPosition = new Point(e.clientX, e.clientY);
      const dragDistance = getDragDistance(
        initialPosition.current,
        newPosition
      );
      if (dragDistance < 20)
        return;
      onDrag();
    },
    [initialPosition, onDrag]
  );
  return { handlePointerMove };
}
function useLongPress(args) {
  const longPressTimer = reactExports.useRef(new Timer(500));
  const handlePointerDown = reactExports.useCallback(() => {
    longPressTimer.current.start();
  }, []);
  const handlePointerUp = reactExports.useCallback(() => {
    longPressTimer.current.stop();
  }, []);
  const handlePointerMove = reactExports.useCallback(
    (e) => {
      if (!args.initialPosition.current)
        return;
      const newPosition = new Point(e.clientX, e.clientY);
      const distance = args.initialPosition.current.getDistanceTo(newPosition);
      distance >= 10 && longPressTimer.current.stop();
    },
    [args.initialPosition]
  );
  reactExports.useEffect(() => {
    longPressTimer.current.setOnExecute(args.onLongPress);
    return () => {
      longPressTimer.current.setOnExecute(void 0);
    };
  }, [args.onLongPress]);
  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
function useDragInteraction(onClick, onOpenPanel) {
  const initialPosition = reactExports.useRef(void 0);
  const skipClick = reactExports.useRef(false);
  const handleOpenPanel = reactExports.useCallback(() => {
    initialPosition.current = void 0;
    skipClick.current = true;
    onOpenPanel && onOpenPanel();
  }, [onOpenPanel]);
  const { handlePointerMove: dragPointerMove } = useDrag({
    initialPosition,
    onDrag: handleOpenPanel
  });
  const {
    handlePointerDown: longPressPointerDown,
    handlePointerMove: longPressPointerMove,
    handlePointerUp: longPressPointerUp
  } = useLongPress({
    initialPosition,
    onLongPress: handleOpenPanel
  });
  const handleButtonClick = reactExports.useCallback(() => {
    if (skipClick.current)
      return;
    onClick && onClick();
  }, [onClick]);
  const handlePointerDown = reactExports.useCallback(
    (e) => {
      e.target instanceof Element && e.target.releasePointerCapture(e.pointerId);
      initialPosition.current = new Point(e.clientX, e.clientY);
      skipClick.current = false;
      longPressPointerDown();
    },
    [longPressPointerDown]
  );
  const handlePointerMove = reactExports.useCallback(
    (e) => {
      dragPointerMove(e);
      longPressPointerMove(e);
    },
    [dragPointerMove, longPressPointerMove]
  );
  const handlePointerUp = reactExports.useCallback(() => {
    initialPosition.current = void 0;
    longPressPointerUp();
  }, [longPressPointerUp]);
  reactExports.useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);
  return { handlePointerDown, handleButtonClick };
}
try {
  useDragInteraction.displayName = "useDragInteraction";
  useDragInteraction.__docgenInfo = { "description": "Hook used on expandable item that require drag or long press to open", "displayName": "useDragInteraction", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function tryFindActiveAction(item) {
  for (const childItem of item.items) {
    if (ToolbarItemUtilities.isActionButton(childItem)) {
      if (childItem.isActive)
        return childItem;
    } else if (ToolbarItemUtilities.isGroupButton(childItem)) {
      const nestedChild = tryFindActiveAction(childItem);
      if (nestedChild)
        return nestedChild;
    }
  }
  return void 0;
}
function getFirstAvailableChildActionItem(item) {
  for (const childItem of item.items) {
    if (ToolbarItemUtilities.isActionButton(childItem)) {
      return childItem;
    } else {
      if (ToolbarItemUtilities.isGroupButton(childItem)) {
        const nestedChild = getFirstAvailableChildActionItem(childItem);
        if (nestedChild)
          return nestedChild;
      }
    }
  }
  return void 0;
}
function getActiveAction(item) {
  const activeItem = tryFindActiveAction(item);
  if (activeItem)
    return activeItem;
  for (const childItem of item.items) {
    if (ToolbarItemUtilities.isActionButton(childItem)) {
      return childItem;
    }
  }
  return getFirstAvailableChildActionItem(item);
}
function PopupItemWithDrag(props) {
  const [isPanelShown, setPanelShown] = reactExports.useState(false);
  const [activeAction, setActiveAction] = reactExports.useState(getActiveAction(props.groupItem));
  const {
    expandsTo,
    overflowExpandsTo,
    panelAlignment,
    onPopupPanelOpenClose
  } = useToolbarWithOverflowDirectionContext();
  reactExports.useEffect(() => {
    const newActiveAction = getActiveAction(props.groupItem);
    if (newActiveAction) {
      if (newActiveAction.isActive) {
        setActiveAction(newActiveAction);
      } else {
        if (activeAction && activeAction.isActive) {
          setActiveAction({ ...activeAction, isActive: false });
        }
      }
    }
  }, [props.groupItem, activeAction]);
  const processPanelOpenClose = reactExports.useCallback(
    (isOpening) => {
      setPanelShown((prev) => {
        if (prev !== isOpening)
          onPopupPanelOpenClose(isOpening);
        return isOpening;
      });
    },
    [setPanelShown, onPopupPanelOpenClose]
  );
  const onOpenPanel = reactExports.useCallback(() => {
    processPanelOpenClose(!isPanelShown);
  }, [isPanelShown, processPanelOpenClose]);
  const onGroupButtonClick = reactExports.useCallback(() => {
    activeAction && !ConditionalBooleanValue.getValue(activeAction.isDisabled) && activeAction.execute();
  }, [activeAction]);
  const icon = activeAction ? IconHelper.getIconReactNode(activeAction.icon, activeAction.internalData) : props.icon;
  const title = activeAction ? ConditionalStringValue.getValue(activeAction.label) : props.title;
  const isActive = activeAction ? activeAction.isActive : props.isActive;
  const isDisabled = ConditionalBooleanValue.getValue(
    activeAction ? activeAction.isDisabled : props.isDisabled
  );
  const { handlePointerDown, handleButtonClick } = useDragInteraction(
    onGroupButtonClick,
    onOpenPanel
  );
  const className = classnames(
    "components-toolbar-button-item",
    "components-toolbar-expandable-button",
    isActive && "components-active",
    isDisabled && "components-disabled-drag",
    props.className
  );
  const [targetRef, target] = useRefState();
  const handleClose = reactExports.useCallback(() => {
    processPanelOpenClose(false);
  }, [processPanelOpenClose]);
  const { hasOverflow } = useToolItemEntryContext();
  const expandsToDirection = hasOverflow ? overflowExpandsTo : expandsTo;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ToolbarPopupContext.Provider,
    {
      value: {
        closePanel: () => processPanelOpenClose(false),
        setSelectedItem: (buttonItem) => setActiveAction(buttonItem)
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            "data-item-id": props.itemId,
            "data-item-type": "action-tool-button",
            "data-item-group-priority": props.groupPriority,
            "data-item-priority": props.itemPriority,
            "data-item-provider-id": props.providerId,
            ref: targetRef,
            onPointerDown: handlePointerDown,
            onClick: handleButtonClick,
            onKeyDown: props.onKeyDown,
            className,
            style: props.style,
            title,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-icon", children: icon }),
              props.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-badge", children: activeAction ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { type: activeAction.badgeKind || activeAction.badgeType }) : props.badge }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-triangle" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PopupItemPopup,
          {
            isOpen: isPanelShown,
            onClose: handleClose,
            position: toToolbarPopupRelativePosition(
              expandsToDirection,
              panelAlignment
            ),
            target,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              PopupItemsPanel,
              {
                groupItem: props.groupItem,
                activateOnPointerUp: true
              }
            )
          }
        )
      ]
    }
  );
}
function toToolbarPopupRelativePosition(expandsTo, alignment) {
  switch (expandsTo) {
    case Direction.Bottom: {
      if (alignment === ToolbarPanelAlignment.End)
        return RelativePosition.BottomRight;
      return RelativePosition.BottomLeft;
    }
    case Direction.Left:
      return RelativePosition.LeftTop;
    case Direction.Right:
      return RelativePosition.RightTop;
    case Direction.Top:
      return RelativePosition.Top;
  }
}
try {
  PopupItemWithDrag.displayName = "PopupItemWithDrag";
  PopupItemWithDrag.__docgenInfo = { "description": "Expandable group button item with drag.", "displayName": "PopupItemWithDrag", "props": { "groupItem": { "defaultValue": null, "description": "Panel of the toolbar.", "name": "groupItem", "required": true, "type": { "name": "GroupButton" } }, "icon": { "defaultValue": null, "description": "button icon.", "name": "icon", "required": false, "type": { "name": "ReactNode" } }, "isActive": { "defaultValue": null, "description": "Describes if item is active.", "name": "isActive", "required": false, "type": { "name": "boolean" } }, "isDisabled": { "defaultValue": null, "description": "Describes if the item is disabled.", "name": "isDisabled", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Function called when the item is clicked.", "name": "onClick", "required": false, "type": { "name": "(() => void)" } }, "onKeyDown": { "defaultValue": null, "description": "Function called when a key is pressed.", "name": "onKeyDown", "required": false, "type": { "name": "((e: KeyboardEvent<Element>) => void)" } }, "title": { "defaultValue": null, "description": "Title for the item.", "name": "title", "required": true, "type": { "name": "string" } }, "badge": { "defaultValue": null, "description": "A badge to draw.", "name": "badge", "required": false, "type": { "name": "ReactNode" } }, "addGroupSeparator": { "defaultValue": null, "description": "If true add a gap before button. Default to false.", "name": "addGroupSeparator", "required": false, "type": { "name": "boolean" } }, "providerId": { "defaultValue": null, "description": "value added to DOM element as a data attribute to hold name of items provider. If specified in `FrontstageProvider` then this will be undefined", "name": "providerId", "required": false, "type": { "name": "string" } }, "itemPriority": { "defaultValue": null, "description": "value added to DOM element as a data attribute, shows 0 is undefined", "name": "itemPriority", "required": false, "type": { "name": "number" } }, "groupPriority": { "defaultValue": null, "description": "value added to DOM element as a data attribute", "name": "groupPriority", "required": false, "type": { "name": "number" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const ToolbarPopupContext = reactExports.createContext({
  /** function used to close popup panel */
  closePanel: () => {
  },
  /** if popup panel is a GroupButton then this is call to set the selected action item within the panel */
  setSelectedItem: (_buttonItem) => {
  }
});
function useToolbarPopupContext() {
  return reactExports.useContext(ToolbarPopupContext);
}
function PopupItem(props) {
  const [isPanelShown, setPanelShown] = reactExports.useState(false);
  const {
    expandsTo,
    overflowExpandsTo,
    panelAlignment,
    onPopupPanelOpenClose
  } = useToolbarWithOverflowDirectionContext();
  const processPanelOpenClose = reactExports.useCallback(
    (isOpening) => {
      setPanelShown((prev) => {
        if (prev !== isOpening)
          onPopupPanelOpenClose(isOpening);
        return isOpening;
      });
    },
    [setPanelShown, onPopupPanelOpenClose]
  );
  const onButtonClick = reactExports.useCallback(() => {
    processPanelOpenClose(!isPanelShown);
    if (props.onClick)
      props.onClick();
  }, [props, isPanelShown, processPanelOpenClose]);
  const className = classnames(
    "components-toolbar-button-item",
    "components-toolbar-expandable-button",
    props.isDisabled && "components-disabled",
    props.className
  );
  const [targetRef, target] = useRefState();
  const handleClose = reactExports.useCallback(() => {
    processPanelOpenClose(false);
  }, [processPanelOpenClose]);
  const { hasOverflow } = useToolItemEntryContext();
  const expandsToDirection = hasOverflow ? overflowExpandsTo : expandsTo;
  const { hideIndicator, panel } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ToolbarPopupContext.Provider,
    {
      value: {
        closePanel: () => processPanelOpenClose(false)
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            "data-item-id": props.itemId,
            "data-item-type": "tool-button-popup",
            "data-item-group-priority": props.groupPriority,
            "data-item-priority": props.itemPriority,
            "data-item-provider-id": props.providerId,
            ref: targetRef,
            disabled: props.isDisabled,
            onClick: onButtonClick,
            onKeyDown: props.onKeyDown,
            className,
            style: props.style,
            title: props.title,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-icon", children: props.icon }),
              props.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-badge", children: props.badge }),
              hideIndicator ? void 0 : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-triangle" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PopupItemPopup,
          {
            isOpen: isPanelShown,
            onClose: handleClose,
            position: toToolbarPopupRelativePosition(
              expandsToDirection,
              panelAlignment
            ),
            target,
            keepContentsMounted: props.keepContentsMounted,
            children: panel
          }
        )
      ]
    }
  );
}
function PopupItemPopup(props) {
  const isHidden = useToolbarPopupAutoHideContext();
  const className = classnames(
    "components-toolbar-popupItem_popupItemPopup",
    isHidden && "nz-hidden"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Popup, { className, offset: 0, showShadow: false, ...props });
}
try {
  useToolbarPopupContext.displayName = "useToolbarPopupContext";
  useToolbarPopupContext.__docgenInfo = { "description": "React hook used to retrieve the ToolbarPopupContext.", "displayName": "useToolbarPopupContext", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PopupItem.displayName = "PopupItem";
  PopupItem.__docgenInfo = { "description": "Popup toolbar item that displays a panel.", "displayName": "PopupItem", "props": { "hideIndicator": { "defaultValue": null, "description": "Describes if expandable item triangle indicator should be hidden.", "name": "hideIndicator", "required": false, "type": { "name": "boolean" } }, "panel": { "defaultValue": null, "description": "Panel of the toolbar.", "name": "panel", "required": false, "type": { "name": "ReactNode" } }, "keepContentsMounted": { "defaultValue": null, "description": "If true the popup panel is mounted once and unmounted when button is unmounted. If false the\ncontent node is unmounted each time the popup is closed.", "name": "keepContentsMounted", "required": false, "type": { "name": "boolean" } }, "icon": { "defaultValue": null, "description": "button icon.", "name": "icon", "required": false, "type": { "name": "ReactNode" } }, "isActive": { "defaultValue": null, "description": "Describes if item is active.", "name": "isActive", "required": false, "type": { "name": "boolean" } }, "isDisabled": { "defaultValue": null, "description": "Describes if the item is disabled.", "name": "isDisabled", "required": false, "type": { "name": "boolean" } }, "onClick": { "defaultValue": null, "description": "Function called when the item is clicked.", "name": "onClick", "required": false, "type": { "name": "(() => void)" } }, "onKeyDown": { "defaultValue": null, "description": "Function called when a key is pressed.", "name": "onKeyDown", "required": false, "type": { "name": "((e: KeyboardEvent<Element>) => void)" } }, "title": { "defaultValue": null, "description": "Title for the item.", "name": "title", "required": true, "type": { "name": "string" } }, "badge": { "defaultValue": null, "description": "A badge to draw.", "name": "badge", "required": false, "type": { "name": "ReactNode" } }, "addGroupSeparator": { "defaultValue": null, "description": "If true add a gap before button. Default to false.", "name": "addGroupSeparator", "required": false, "type": { "name": "boolean" } }, "providerId": { "defaultValue": null, "description": "value added to DOM element as a data attribute to hold name of items provider. If specified in `FrontstageProvider` then this will be undefined", "name": "providerId", "required": false, "type": { "name": "string" } }, "itemPriority": { "defaultValue": null, "description": "value added to DOM element as a data attribute, shows 0 is undefined", "name": "itemPriority", "required": false, "type": { "name": "number" } }, "groupPriority": { "defaultValue": null, "description": "value added to DOM element as a data attribute", "name": "groupPriority", "required": false, "type": { "name": "number" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  PopupItemPopup.displayName = "PopupItemPopup";
  PopupItemPopup.__docgenInfo = { "description": "", "displayName": "PopupItemPopup", "props": { "isOpen": { "defaultValue": null, "description": "", "name": "isOpen", "required": false, "type": { "name": "boolean" } }, "onClose": { "defaultValue": null, "description": "", "name": "onClose", "required": true, "type": { "name": "() => void" } }, "position": { "defaultValue": null, "description": "", "name": "position", "required": true, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }, { "value": "3" }, { "value": "4" }, { "value": "5" }, { "value": "6" }, { "value": "7" }, { "value": "8" }, { "value": "9" }] } }, "target": { "defaultValue": null, "description": "", "name": "target", "required": false, "type": { "name": "HTMLElement" } }, "keepContentsMounted": { "defaultValue": null, "description": "", "name": "keepContentsMounted", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarPopupContext.displayName = "ToolbarPopupContext";
  ToolbarPopupContext.__docgenInfo = { "description": "Context used by Toolbar items in popups to close the popup panel.", "displayName": "ToolbarPopupContext", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function gatherSyncIds(eventIds, items) {
  for (const item of items) {
    for (const [, entry] of Object.entries(item)) {
      if (entry instanceof ConditionalBooleanValue) {
        entry.syncEventIds.forEach(
          (eventId) => eventIds.add(eventId.toLowerCase())
        );
      } else if (entry instanceof ConditionalStringValue) {
        entry.syncEventIds.forEach(
          (eventId) => eventIds.add(eventId.toLowerCase())
        );
      } else if (entry instanceof ConditionalIconItem) {
        entry.syncEventIds.forEach(
          (eventId) => eventIds.add(eventId.toLowerCase())
        );
      }
    }
    if ("items" in item) {
      gatherSyncIds(eventIds, item.items);
    }
  }
}
function refreshItems(items, eventIds) {
  if (0 === eventIds.size)
    return null;
  let itemsUpdated = false;
  const updatedItems = [];
  for (const item of items) {
    let updatedItem = { ...item };
    if ("items" in updatedItem) {
      const childItems = refreshItems(updatedItem.items, eventIds);
      updatedItem = {
        ...updatedItem,
        items: childItems ?? updatedItem.items
      };
      itemsUpdated || (itemsUpdated = !!childItems);
    }
    for (const [, entry] of Object.entries(updatedItem)) {
      if (entry instanceof ConditionalBooleanValue && ConditionalBooleanValue.refreshValue(entry, eventIds) || entry instanceof ConditionalStringValue && ConditionalStringValue.refreshValue(entry, eventIds) || // eslint-disable-next-line deprecation/deprecation
      entry instanceof ConditionalIconItem && // eslint-disable-next-line deprecation/deprecation
      ConditionalIconItem.refreshValue(entry, eventIds)) {
        itemsUpdated = true;
      }
    }
    updatedItems.push(updatedItem);
  }
  return itemsUpdated ? updatedItems : null;
}
function useConditionalSynchedItems(items, syncUiEvent) {
  const [eventSynchedItems, setEventSynchedItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const ids = /* @__PURE__ */ new Set();
    gatherSyncIds(ids, items);
    setEventSynchedItems(refreshItems(items, ids) ?? items);
    const syncIdsOfInterest = [...ids.values()];
    return syncUiEvent == null ? void 0 : syncUiEvent.addListener((args) => {
      if (0 === syncIdsOfInterest.length)
        return;
      if (syncIdsOfInterest.some(
        (value) => args.eventIds.has(value.toLowerCase())
      )) {
        setEventSynchedItems(
          (current) => refreshItems(current, args.eventIds) ?? current
        );
      }
    });
  }, [syncUiEvent, items]);
  return eventSynchedItems;
}
const ToolbarPopupAutoHideContext = reactExports.createContext(false);
function useToolbarPopupAutoHideContext() {
  return reactExports.useContext(ToolbarPopupAutoHideContext);
}
function isCustomToolbarItem(item) {
  return !!item.isCustom && "panelContentNode" in item;
}
const getToolbarDirection = (expandsTo) => {
  const orthogonalDirection = DirectionHelpers.getOrthogonalDirection(expandsTo);
  return OrthogonalDirectionHelpers.inverse(orthogonalDirection);
};
var ToolbarPanelAlignment = /* @__PURE__ */ ((ToolbarPanelAlignment2) => {
  ToolbarPanelAlignment2[ToolbarPanelAlignment2["Start"] = 0] = "Start";
  ToolbarPanelAlignment2[ToolbarPanelAlignment2["End"] = 1] = "End";
  return ToolbarPanelAlignment2;
})(ToolbarPanelAlignment || {});
var ToolbarOpacitySetting = /* @__PURE__ */ ((ToolbarOpacitySetting2) => {
  ToolbarOpacitySetting2[ToolbarOpacitySetting2["Defaults"] = 0] = "Defaults";
  ToolbarOpacitySetting2[ToolbarOpacitySetting2["Proximity"] = 1] = "Proximity";
  ToolbarOpacitySetting2[ToolbarOpacitySetting2["Transparent"] = 2] = "Transparent";
  return ToolbarOpacitySetting2;
})(ToolbarOpacitySetting || {});
const _ToolbarPanelAlignmentHelpers = class _ToolbarPanelAlignmentHelpers {
  /** @returns Class name of specified [[ToolbarPanelAlignment]] */
  static getCssClassName(panelAlignment) {
    switch (panelAlignment) {
      case 0:
        return _ToolbarPanelAlignmentHelpers.START_CLASS_NAME;
      case 1:
        return _ToolbarPanelAlignmentHelpers.END_CLASS_NAME;
    }
  }
};
_ToolbarPanelAlignmentHelpers.START_CLASS_NAME = "components-panel-alignment-start";
_ToolbarPanelAlignmentHelpers.END_CLASS_NAME = "components-panel-alignment-end";
let ToolbarPanelAlignmentHelpers = _ToolbarPanelAlignmentHelpers;
const ToolbarWithOverflowDirectionContext = reactExports.createContext({
  expandsTo: Direction.Bottom,
  direction: OrthogonalDirection.Horizontal,
  overflowExpandsTo: Direction.Right,
  overflowDirection: OrthogonalDirection.Vertical,
  panelAlignment: 0,
  useDragInteraction: false,
  toolbarOpacitySetting: 1,
  openPopupCount: 0,
  onPopupPanelOpenClose: (_isOpening) => {
  },
  overflowDisplayActive: false,
  onItemExecuted: (_item) => void 0,
  onKeyDown: (_e2) => void 0
});
function CustomItem({
  item,
  addGroupSeparator,
  badgeKind
}) {
  const { useDragInteraction: useDragInteraction2 } = useToolbarWithOverflowDirectionContext();
  const icon = reactExports.useMemo(
    () => item.icon && // eslint-disable-next-line deprecation/deprecation
    IconHelper.getIconReactNode(item.icon, item.internalData) || // eslint-disable-next-line deprecation/deprecation
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "icon", iconSpec: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgPlaceholder, {}) }),
    [item.icon, item.internalData]
  );
  const isDisabled = reactExports.useMemo(
    () => ConditionalBooleanValue.getValue(item.isDisabled),
    [item.isDisabled]
  );
  const title = reactExports.useMemo(
    () => ConditionalStringValue.getValue(item.label) ?? item.id,
    [item.id, item.label]
  );
  return (
    // eslint-disable-next-line deprecation/deprecation
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopupItem,
      {
        itemId: item.id,
        icon,
        isDisabled,
        title,
        panel: item.panelContentNode,
        hideIndicator: useDragInteraction2,
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { type: badgeKind || item.badgeType }),
        addGroupSeparator,
        keepContentsMounted: item.keepContentsLoaded
      },
      item.id
    )
  );
}
function GroupPopupItem({
  item,
  addGroupSeparator,
  badgeKind
}) {
  const { useDragInteraction: useDragInteraction2 } = useToolbarWithOverflowDirectionContext();
  const title = ConditionalStringValue.getValue(item.label);
  const panel = reactExports.useMemo(
    () => /* @__PURE__ */ jsxRuntimeExports.jsx(PopupItemsPanel, { groupItem: item, activateOnPointerUp: false }),
    [item]
  );
  const providerId = "providerId" in item ? item.providerId : void 0;
  if (useDragInteraction2) {
    return (
      // eslint-disable-next-line deprecation/deprecation
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PopupItemWithDrag,
        {
          itemId: item.id,
          providerId,
          itemPriority: item.itemPriority,
          groupPriority: item.groupPriority,
          icon: IconHelper.getIconReactNode(item.icon, item.internalData),
          isDisabled: ConditionalBooleanValue.getValue(item.isDisabled),
          title,
          groupItem: item,
          badge: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { type: badgeKind || item.badgeType }),
          addGroupSeparator
        },
        item.id
      )
    );
  }
  return (
    // eslint-disable-next-line deprecation/deprecation
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopupItem,
      {
        itemId: item.id,
        providerId,
        itemPriority: item.itemPriority,
        groupPriority: item.groupPriority,
        icon: IconHelper.getIconReactNode(item.icon, item.internalData),
        isDisabled: ConditionalBooleanValue.getValue(item.isDisabled),
        title,
        panel,
        badge: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { type: badgeKind || item.badgeType }),
        hideIndicator: useDragInteraction2,
        addGroupSeparator
      },
      item.id
    )
  );
}
function ActionItem({
  item,
  addGroupSeparator,
  badgeKind
}) {
  const title = ConditionalStringValue.getValue(item.label);
  const { onItemExecuted } = useToolbarWithOverflowDirectionContext();
  const onExecute = reactExports.useCallback(() => {
    item.execute();
    onItemExecuted(item);
  }, [item, onItemExecuted]);
  const providerId = "providerId" in item ? item.providerId : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolbarButtonItem,
    {
      itemId: item.id,
      providerId,
      itemPriority: item.itemPriority,
      groupPriority: item.groupPriority,
      isDisabled: ConditionalBooleanValue.getValue(item.isDisabled),
      title,
      icon: IconHelper.getIconReactNode(item.icon, item.internalData),
      isActive: item.isActive,
      onClick: onExecute,
      badge: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { type: badgeKind || item.badgeType }),
      addGroupSeparator
    },
    item.id
  );
}
function ToolbarItemComponent({
  item,
  addGroupSeparator,
  badgeKind
}) {
  if (ToolbarItemUtilities.isGroupButton(item)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      GroupPopupItem,
      {
        item,
        addGroupSeparator,
        badgeKind
      }
    );
  } else if (isCustomToolbarItem(item)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CustomItem,
      {
        item,
        addGroupSeparator,
        badgeKind
      }
    );
  } else {
    if (ToolbarItemUtilities.isActionButton(item)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActionItem,
        {
          item,
          addGroupSeparator,
          badgeKind
        }
      );
    }
  }
  return null;
}
function useToolbarWithOverflowDirectionContext() {
  return reactExports.useContext(ToolbarWithOverflowDirectionContext);
}
function OverflowItemsContainer(p) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: p.children });
}
function getItemWrapperClass(child) {
  if (reactExports.isValidElement(child)) {
    if (child.props && child.props.addGroupSeparator)
      return "components-toolbar-button-add-gap-before";
  }
  return void 0;
}
function filterHiddenItems(items) {
  return items.filter((item) => !ConditionalBooleanValue.getValue(item.isHidden)).map((i) => {
    if ("items" in i) {
      return { ...i, items: filterHiddenItems(i.items) };
    }
    return i;
  });
}
function InternalToolbarComponent(props) {
  var _a3;
  const expandsTo = props.expandsTo ? props.expandsTo : Direction.Bottom;
  const useDragInteraction2 = !!props.useDragInteraction;
  const panelAlignment = props.panelAlignment ? props.panelAlignment : 0;
  const useHeight = expandsTo === Direction.Right || expandsTo === Direction.Left;
  const { translate } = useTranslation();
  const [isOverflowPanelOpen, setIsOverflowPanelOpen] = reactExports.useState(false);
  const [popupPanelCount, setPopupPanelCount] = reactExports.useState(0);
  const isMounted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });
  const handlePopupPanelOpenClose = reactExports.useCallback((isOpening) => {
    setTimeout(() => {
      if (!isMounted.current)
        return;
      setPopupPanelCount((prev) => {
        const nextCount = isOpening ? prev + 1 : prev - 1;
        return nextCount < 0 ? 0 : nextCount;
      });
    });
  }, []);
  const width = reactExports.useRef(void 0);
  const eventSynchedItems = useConditionalSynchedItems(
    props.items,
    props.syncUiEvent
  );
  const availableNodes = reactExports.useMemo(() => {
    const filteredItems = filterHiddenItems(eventSynchedItems);
    return filteredItems.map((item, index) => {
      let addGroupSeparator = false;
      if (index > 0)
        addGroupSeparator = item.groupPriority !== filteredItems[index - 1].groupPriority;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolbarItemComponent,
        {
          item,
          addGroupSeparator: !!addGroupSeparator,
          badgeKind: item.badgeKind
        },
        item.id
      );
    });
  }, [eventSynchedItems]);
  const [
    overflowItemKeys,
    handleContainerResize,
    handleOverflowResize,
    handleEntryResize
  ] = useOverflow(
    availableNodes,
    panelAlignment === 1
    /* End */
  );
  const handleResize = reactExports.useCallback(
    (w) => {
      width.current = w;
      width.current !== void 0 && handleContainerResize(width.current);
    },
    [handleContainerResize]
  );
  const resizeObserverRef = useResizeObserverSingleDimension(
    handleResize,
    useHeight
  );
  const handleClick2 = reactExports.useCallback(() => {
    setIsOverflowPanelOpen((prev) => !prev);
  }, []);
  const handleClose = reactExports.useCallback(() => {
    setIsOverflowPanelOpen(false);
  }, []);
  const ref = props.enableOverflow ? resizeObserverRef : void 0;
  const availableItems = reactExports.Children.toArray(availableNodes);
  const displayedItems = availableItems.reduce((acc, child, index) => {
    const key = getChildKey(child, index);
    if (!overflowItemKeys || overflowItemKeys.indexOf(key) < 0) {
      acc.push([key, child]);
    }
    return acc;
  }, []);
  const overflowPanelItems = overflowItemKeys ? availableItems.reduce(
    (acc, child, index) => {
      const key = getChildKey(child, index);
      if (overflowItemKeys.indexOf(key) >= 0) {
        acc.push([key, child]);
      }
      return acc;
    },
    []
  ) : [];
  const direction = getToolbarDirection(expandsTo);
  const overflowExpandsTo = typeof props.enableOverflow !== "boolean" && ((_a3 = props.enableOverflow) == null ? void 0 : _a3.overflowExpandsTo) || Direction.Right;
  const addOverflowButton = reactExports.useCallback(
    (atStart) => {
      const overflowItems = !!atStart ? overflowPanelItems.reverse() : overflowPanelItems;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolbarItemContext.Provider,
        {
          value: {
            hasOverflow: false,
            useHeight,
            onResize: handleOverflowResize
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToolbarOverflowButton,
            {
              expandsTo,
              onClick: handleClick2,
              onClose: handleClose,
              open: overflowItems.length > 0 && isOverflowPanelOpen,
              panelNode: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarOverflowPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OverflowItemsContainer, { children: overflowItems.map(([key, child]) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ToolbarItemContext.Provider,
                  {
                    value: {
                      hasOverflow: true,
                      useHeight,
                      onResize: () => {
                      }
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemWrapper, { className: getItemWrapperClass(child), children: child })
                  },
                  key
                );
              }) }) }),
              title: translate("toolbar.overflow")
            }
          )
        }
      );
    },
    [
      overflowPanelItems,
      useHeight,
      handleOverflowResize,
      expandsTo,
      handleClick2,
      handleClose,
      isOverflowPanelOpen,
      translate
    ]
  );
  const className = classnames(
    "components-toolbar-overflow-sizer",
    OrthogonalDirectionHelpers.getCssClassName(direction),
    props.className
  );
  const showOverflowAtStart = direction === OrthogonalDirection.Horizontal && panelAlignment === 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolbarWithOverflowDirectionContext.Provider,
    {
      value: {
        expandsTo,
        direction,
        overflowExpandsTo,
        panelAlignment,
        useDragInteraction: useDragInteraction2,
        toolbarOpacitySetting: props.toolbarOpacitySetting ?? 1,
        overflowDirection: direction === OrthogonalDirection.Horizontal ? OrthogonalDirection.Vertical : OrthogonalDirection.Horizontal,
        openPopupCount: popupPanelCount,
        onPopupPanelOpenClose: handlePopupPanelOpenClose,
        overflowDisplayActive: overflowPanelItems.length > 0 && isOverflowPanelOpen,
        onItemExecuted: props.onItemExecuted ? props.onItemExecuted : () => {
        },
        onKeyDown: props.onKeyDown ? props.onKeyDown : (_e2) => {
        }
      },
      children: availableItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className,
          ref,
          style: props.style,
          onKeyDown: props.onKeyDown,
          role: "presentation",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ToolbarItems, { className: "components-items", direction, children: [
            props.enableOverflow && (!overflowItemKeys || overflowItemKeys.length > 0) && showOverflowAtStart && addOverflowButton(true),
            displayedItems.map(([key, child]) => {
              const onEntryResize = handleEntryResize(key);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToolbarItemContext.Provider,
                {
                  value: {
                    hasOverflow: false,
                    useHeight,
                    onResize: onEntryResize
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemWrapper, { className: getItemWrapperClass(child), children: child })
                },
                key
              );
            }),
            props.enableOverflow && (!overflowItemKeys || overflowItemKeys.length > 0) && !showOverflowAtStart && addOverflowButton(false)
          ] })
        }
      )
    }
  );
}
function getChildKey(child, index) {
  if (reactExports.isValidElement(child) && child.key !== null) {
    return child.key.toString();
  }
  return index.toString();
}
function determineOverflowItems(size, entries, overflowButtonSize, overflowButtonAtStart) {
  let toolbarSize = 0;
  const buttonPadding = 2;
  if (overflowButtonAtStart && entries.length > 0) {
    let i = entries.length - 1;
    for (; i >= 0; i--) {
      const w = entries[i][1] + buttonPadding;
      const newSettingsWidth = toolbarSize + w;
      if (newSettingsWidth > size) {
        toolbarSize += overflowButtonSize + buttonPadding;
        break;
      }
      toolbarSize = newSettingsWidth;
    }
    if (i >= 0) {
      let j = i + 1;
      for (; j < entries.length; j++) {
        if (toolbarSize <= size)
          break;
        const w = entries[j][1] + buttonPadding;
        toolbarSize -= w;
      }
      return entries.slice(0, j).map((e) => e[0]);
    } else {
      return [];
    }
  } else {
    let i = 0;
    for (; i < entries.length; i++) {
      const w = entries[i][1] + buttonPadding;
      const newSettingsWidth = toolbarSize + w;
      if (newSettingsWidth > size) {
        toolbarSize += overflowButtonSize + buttonPadding;
        break;
      }
      toolbarSize = newSettingsWidth;
    }
    let j = i;
    for (; j > 0; j--) {
      if (toolbarSize <= size)
        break;
      const w = entries[j][1] + buttonPadding;
      toolbarSize -= w;
    }
    return entries.slice(j).map((e) => e[0]);
  }
}
function useOverflow(availableItems, overflowButtonAtStart) {
  const [overflowItemKeys, setOverflown] = reactExports.useState();
  const itemSizes = reactExports.useRef(/* @__PURE__ */ new Map());
  const size = reactExports.useRef(void 0);
  const overflowButtonSize = reactExports.useRef(void 0);
  const calculateOverflow = reactExports.useCallback(() => {
    const sizes = verifiedMapEntries(itemSizes.current);
    if (size.current === void 0 || sizes === void 0 || overflowButtonSize.current === void 0) {
      setOverflown(void 0);
      return;
    }
    const newOverflown = determineOverflowItems(
      size.current,
      [...sizes.entries()],
      overflowButtonSize.current,
      overflowButtonAtStart
    );
    setOverflown((prevOverflown) => {
      return eql(prevOverflown, newOverflown) ? prevOverflown : newOverflown;
    });
  }, [overflowButtonAtStart]);
  reactExports.useLayoutEffect(() => {
    const newEntryWidths = /* @__PURE__ */ new Map();
    const array = reactExports.Children.toArray(availableItems);
    for (let i = 0; i < array.length; i++) {
      const child = array[i];
      const key = getChildKey(child, i);
      const lastW = itemSizes.current.get(key);
      newEntryWidths.set(key, lastW);
    }
    itemSizes.current = newEntryWidths;
    calculateOverflow();
  }, [availableItems, calculateOverflow]);
  const handleContainerResize = reactExports.useCallback(
    (w) => {
      const calculate = size.current !== w;
      size.current = w;
      calculate && calculateOverflow();
    },
    [calculateOverflow]
  );
  const handleOverflowResize = reactExports.useCallback(
    (w) => {
      const calculate = overflowButtonSize.current !== w;
      overflowButtonSize.current = w;
      calculate && calculateOverflow();
    },
    [calculateOverflow]
  );
  const handleEntryResize = reactExports.useCallback(
    (key) => (w) => {
      const oldW = itemSizes.current.get(key);
      if (oldW !== w) {
        itemSizes.current.set(key, w);
        calculateOverflow();
      }
    },
    [calculateOverflow]
  );
  return [
    overflowItemKeys,
    handleContainerResize,
    handleOverflowResize,
    handleEntryResize
  ];
}
const ToolbarItemContext = reactExports.createContext({
  hasOverflow: false,
  useHeight: false,
  onResize: () => {
  }
});
function useToolItemEntryContext() {
  return reactExports.useContext(ToolbarItemContext);
}
function verifiedMapEntries(map2) {
  for (const [, val] of map2) {
    if (val === void 0)
      return void 0;
  }
  return map2;
}
function eql(prev, value) {
  if (!prev)
    return false;
  if (prev.length !== value.length)
    return false;
  for (let i = 0; i < prev.length; i++) {
    const p = prev[i];
    const v = value[i];
    if (p !== v)
      return false;
  }
  return true;
}
try {
  useToolbarPopupAutoHideContext.displayName = "useToolbarPopupAutoHideContext";
  useToolbarPopupAutoHideContext.__docgenInfo = { "description": "React hook used to retrieve the ToolbarPopupAutoHideContext.", "displayName": "useToolbarPopupAutoHideContext", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  isCustomToolbarItem.displayName = "isCustomToolbarItem";
  isCustomToolbarItem.__docgenInfo = { "description": "CustomToolbarItem type guard.", "displayName": "isCustomToolbarItem", "props": { "panelContentNode": { "defaultValue": null, "description": "defines the content to display in popup panel", "name": "panelContentNode", "required": false, "type": { "name": "ReactNode" } }, "keepContentsLoaded": { "defaultValue": null, "description": "If true the popup panel is mounted once and unmounted when button is unmounted. If false the\ncontent node is unmounted each time the popup is closed.", "name": "keepContentsLoaded", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarItemComponent.displayName = "ToolbarItemComponent";
  ToolbarItemComponent.__docgenInfo = { "description": "", "displayName": "ToolbarItemComponent", "props": { "item": { "defaultValue": null, "description": "", "name": "item", "required": true, "type": { "name": "ToolbarItem" } }, "addGroupSeparator": { "defaultValue": null, "description": "", "name": "addGroupSeparator", "required": true, "type": { "name": "boolean" } }, "badgeKind": { "defaultValue": null, "description": "", "name": "badgeKind", "required": false, "type": { "name": "BadgeKind" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  InternalToolbarComponent.displayName = "InternalToolbarComponent";
  InternalToolbarComponent.__docgenInfo = { "description": "Component that displays toolbar items.", "displayName": "InternalToolbarComponent", "props": { "expandsTo": { "defaultValue": null, "description": "Describes to which direction the popup panels are expanded. Defaults to: [[Direction.Bottom]]", "name": "expandsTo", "required": false, "type": { "name": "enum", "value": [{ "value": "1" }, { "value": "2" }, { "value": "3" }, { "value": "4" }] } }, "enableOverflow": { "defaultValue": null, "description": "Describes if items that do not fit available space should move to an expandable panel. Defaults to: false", "name": "enableOverflow", "required": false, "type": { "name": "boolean | { overflowExpandsTo?: Direction; }" } }, "items": { "defaultValue": null, "description": "Definitions for items of the toolbar. Items are expected to be already sorted by group and item.", "name": "items", "required": true, "type": { "name": "CommonToolbarItemWithBadgeKind[]" } }, "panelAlignment": { "defaultValue": null, "description": "Describes how expanded panels are aligned. Defaults to: [[ToolbarPanelAlignment.Start]]", "name": "panelAlignment", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "useDragInteraction": { "defaultValue": null, "description": "Use Drag Interaction to open popups with nest action buttons.", "name": "useDragInteraction", "required": false, "type": { "name": "boolean" } }, "toolbarOpacitySetting": { "defaultValue": null, "description": "Determines whether to use mouse proximity to alter the opacity of the toolbar.", "name": "toolbarOpacitySetting", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }] } }, "onItemExecuted": { "defaultValue": null, "description": "Optional function to call on any item execution.", "name": "onItemExecuted", "required": false, "type": { "name": "OnItemExecutedFunc" } }, "onKeyDown": { "defaultValue": null, "description": "Optional function to call on any KeyDown events processed by toolbar.", "name": "onKeyDown", "required": false, "type": { "name": "((e: KeyboardEvent<Element>) => void)" } }, "syncUiEvent": { "defaultValue": null, "description": "SyncEvents on which the conditional should listen to.", "name": "syncUiEvent", "required": false, "type": { "name": "BeEvent<(args: { eventIds: Set<string>; }) => void>" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarPopupAutoHideContext.displayName = "ToolbarPopupAutoHideContext";
  ToolbarPopupAutoHideContext.__docgenInfo = { "description": "Context used by Toolbar items to know if popup panel should be hidden - via AutoHide.", "displayName": "ToolbarPopupAutoHideContext", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  getToolbarDirection.displayName = "getToolbarDirection";
  getToolbarDirection.__docgenInfo = { "description": "", "displayName": "getToolbarDirection", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarPanelAlignment.displayName = "ToolbarPanelAlignment";
  ToolbarPanelAlignment.__docgenInfo = { "description": "Available alignment modes of [[Toolbar]] panels.", "displayName": "ToolbarPanelAlignment", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarOpacitySetting.displayName = "ToolbarOpacitySetting";
  ToolbarOpacitySetting.__docgenInfo = { "description": "Enumeration of Toolbar Opacity setting.", "displayName": "ToolbarOpacitySetting", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarOpacitySetting.Defaults.displayName = "ToolbarOpacitySetting.Defaults";
  ToolbarOpacitySetting.Defaults.__docgenInfo = { "description": "Use the default background, box-shadow opacity and backdrop-filter blur", "displayName": "ToolbarOpacitySetting.Defaults", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarOpacitySetting.Proximity.displayName = "ToolbarOpacitySetting.Proximity";
  ToolbarOpacitySetting.Proximity.__docgenInfo = { "description": "Alter the opacity from transparent to the defaults based on mouse proximity", "displayName": "ToolbarOpacitySetting.Proximity", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarOpacitySetting.Transparent.displayName = "ToolbarOpacitySetting.Transparent";
  ToolbarOpacitySetting.Transparent.__docgenInfo = { "description": "Use a transparent background, box-shadow opacity and backdrop-filter blur", "displayName": "ToolbarOpacitySetting.Transparent", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarPanelAlignmentHelpers.displayName = "ToolbarPanelAlignmentHelpers";
  ToolbarPanelAlignmentHelpers.__docgenInfo = { "description": "Helpers for [[ToolbarPanelAlignment]].", "displayName": "ToolbarPanelAlignmentHelpers", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarPanelAlignmentHelpers.START_CLASS_NAME.displayName = "ToolbarPanelAlignmentHelpers.START_CLASS_NAME";
  ToolbarPanelAlignmentHelpers.START_CLASS_NAME.__docgenInfo = { "description": "Class name of [[ToolbarPanelAlignment.Start]]", "displayName": "ToolbarPanelAlignmentHelpers.START_CLASS_NAME", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarPanelAlignmentHelpers.END_CLASS_NAME.displayName = "ToolbarPanelAlignmentHelpers.END_CLASS_NAME";
  ToolbarPanelAlignmentHelpers.END_CLASS_NAME.__docgenInfo = { "description": "Class name of [[ToolbarPanelAlignment.End]]", "displayName": "ToolbarPanelAlignmentHelpers.END_CLASS_NAME", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarWithOverflowDirectionContext.displayName = "ToolbarWithOverflowDirectionContext";
  ToolbarWithOverflowDirectionContext.__docgenInfo = { "description": "Context used by Toolbar component to provide Direction to child components.", "displayName": "ToolbarWithOverflowDirectionContext", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  ToolbarItemContext.displayName = "ToolbarItemContext";
  ToolbarItemContext.__docgenInfo = { "description": "Interface toolbars use to define context for its items.", "displayName": "ToolbarItemContext", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
function Toolbar(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InternalToolbarComponent, { ...props });
}
try {
  Toolbar.displayName = "Toolbar";
  Toolbar.__docgenInfo = { "description": "Component that displays toolbar items.", "displayName": "Toolbar", "props": { "expandsTo": { "defaultValue": null, "description": "Describes to which direction the popup panels are expanded, also defines the orientation of the toolbar (Top/Bottom will create an horizontal toolbar, Left/Right will create a vertical toolbar). Defaults to: [[Direction.Bottom]]", "name": "expandsTo", "required": false, "type": { "name": "enum", "value": [{ "value": "1" }, { "value": "2" }, { "value": "3" }, { "value": "4" }] } }, "items": { "defaultValue": null, "description": "Definitions for items of the toolbar. Items are expected to be already sorted by group and item.", "name": "items", "required": true, "type": { "name": "CommonToolbarItem[]" } }, "panelAlignment": { "defaultValue": null, "description": "Describes how expanded panels are aligned. Defaults to: [[ToolbarPanelAlignment.Start]]", "name": "panelAlignment", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "useDragInteraction": { "defaultValue": null, "description": "Use Drag Interaction to open popups with nest action buttons", "name": "useDragInteraction", "required": false, "type": { "name": "boolean" } }, "toolbarOpacitySetting": { "defaultValue": null, "description": "Determines whether to use mouse proximity to alter the opacity of the toolbar", "name": "toolbarOpacitySetting", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }] } }, "onItemExecuted": { "defaultValue": null, "description": "Optional function to call on any item execution", "name": "onItemExecuted", "required": false, "type": { "name": "OnItemExecutedFunc" } }, "onKeyDown": { "defaultValue": null, "description": "Optional function to call on any KeyDown events processed by toolbar", "name": "onKeyDown", "required": false, "type": { "name": "((e: KeyboardEvent<Element>) => void)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function ToolbarWithOverflow(props) {
  const { overflowExpandsTo, ...internalProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InternalToolbarComponent,
    {
      enableOverflow: { overflowExpandsTo },
      ...internalProps
    }
  );
}
try {
  ToolbarWithOverflow.displayName = "ToolbarWithOverflow";
  ToolbarWithOverflow.__docgenInfo = { "description": "Component that displays toolbar items, displaying only the elements that can fit in the available space,\nand put the other items into a single panel.", "displayName": "ToolbarWithOverflow", "props": { "expandsTo": { "defaultValue": null, "description": "Describes to which direction the popup panels are expanded, also defines the orientation of the toolbar (Top/Bottom will create an horizontal toolbar, Left/Right will create a vertical toolbar). Defaults to: [[Direction.Bottom]]", "name": "expandsTo", "required": false, "type": { "name": "enum", "value": [{ "value": "1" }, { "value": "2" }, { "value": "3" }, { "value": "4" }] } }, "overflowExpandsTo": { "defaultValue": null, "description": "Describes to which direction the overflow popup panels are expanded. Defaults to: [[Direction.Right]]", "name": "overflowExpandsTo", "required": false, "type": { "name": "enum", "value": [{ "value": "1" }, { "value": "2" }, { "value": "3" }, { "value": "4" }] } }, "items": { "defaultValue": null, "description": "Definitions for items of the toolbar. Items are expected to be already sorted by group and item.", "name": "items", "required": true, "type": { "name": "CommonToolbarItem[]" } }, "panelAlignment": { "defaultValue": null, "description": "Describes how expanded panels are aligned. Defaults to: [[ToolbarPanelAlignment.Start]]", "name": "panelAlignment", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }] } }, "useDragInteraction": { "defaultValue": null, "description": "Use Drag Interaction to open popups with nest action buttons", "name": "useDragInteraction", "required": false, "type": { "name": "boolean" } }, "toolbarOpacitySetting": { "defaultValue": null, "description": "Determines whether to use mouse proximity to alter the opacity of the toolbar", "name": "toolbarOpacitySetting", "required": false, "type": { "name": "enum", "value": [{ "value": "0" }, { "value": "1" }, { "value": "2" }] } }, "onItemExecuted": { "defaultValue": null, "description": "Optional function to call on any item execution", "name": "onItemExecuted", "required": false, "type": { "name": "OnItemExecutedFunc" } }, "onKeyDown": { "defaultValue": null, "description": "Optional function to call on any KeyDown events processed by toolbar", "name": "onKeyDown", "required": false, "type": { "name": "((e: KeyboardEvent<Element>) => void)" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
class TreeImageLoader {
  /** Loads image data from either [[TreeNodeItem]] */
  load(item) {
    if (!item.icon)
      return void 0;
    return {
      sourceType: "webfont-icon",
      value: item.icon
    };
  }
}
function isTreeModelNode(obj) {
  return obj !== void 0 && !isTreeModelNodePlaceholder(obj) && !isTreeModelRootNode(obj);
}
function isTreeModelNodePlaceholder(obj) {
  return obj !== void 0 && "childIndex" in obj;
}
function isTreeModelRootNode(obj) {
  return obj !== void 0 && obj.id === void 0 && !("childIndex" in obj);
}
function computeVisibleNodes(model) {
  const result = getVisibleDescendants(model, model.getRootNode());
  return {
    getNumNodes: () => result.length,
    getAtIndex: (index) => {
      return result[index];
    },
    getModel: () => model,
    getNumRootNodes: () => model.getRootNode().numChildren,
    [Symbol.iterator]: () => result[Symbol.iterator](),
    getIndexOfNode: (nodeId) => {
      return result.findIndex(
        (visibleNode) => visibleNode.id === nodeId
      );
    }
  };
}
function getVisibleDescendants(model, parentNode, result = []) {
  const children = model.getChildren(parentNode.id);
  if (!children) {
    return result;
  }
  let index = 0;
  for (const childId of children) {
    if (childId === void 0) {
      result.push({
        parentId: parentNode.id,
        depth: parentNode.depth + 1,
        childIndex: index
      });
    } else {
      const childNode = model.getNode(childId);
      if (childNode === void 0) {
        result.push({
          parentId: parentNode.id,
          depth: parentNode.depth + 1,
          childIndex: index
        });
      } else {
        result.push(childNode);
        if (childNode.isExpanded && childNode.numChildren !== void 0) {
          getVisibleDescendants(model, childNode, result);
        }
      }
    }
    ++index;
  }
  return result;
}
function isRangeSelection(selection) {
  return selection && typeof selection.from === "string" && typeof selection.to === "string";
}
class TreeSelectionManager {
  constructor(selectionMode, getVisibleNodes) {
    this.onSelectionChanged = new BeUiEvent();
    this.onSelectionReplaced = new BeUiEvent();
    this.onDragSelection = new BeUiEvent();
    this._onKeyboardEvent = (e, actions, isKeyDown) => {
      const processedNodeId = this._selectionHandler.processedItem;
      if (!isNavigationKey(e.key) || !isIndividualSelection(processedNodeId)) {
        return;
      }
      const isExpandable = (node) => !node.isLoading && node.numChildren !== 0;
      const isEditing = (node) => node.editingInfo !== void 0;
      const processedNode = this._getVisibleNodes().getModel().getNode(processedNodeId);
      if (!processedNode || isEditing(processedNode))
        return;
      const handleKeyboardSelectItem = (index) => {
        const node = this.getVisibleNodeAtIndex(this._getVisibleNodes(), index);
        if (!node || isEditing(node))
          return;
        const selectionFunc = this._selectionHandler.createSelectionFunction(
          ...this.createSelectionHandlers(node.id)
        );
        selectionFunc(e.shiftKey, e.ctrlKey);
      };
      const handleKeyboardActivateItem = (_index) => {
        if (isExpandable(processedNode)) {
          if (!processedNode.isExpanded)
            actions.onNodeExpanded(processedNode.id);
          else
            actions.onNodeCollapsed(processedNode.id);
        } else {
          actions.onNodeEditorActivated(processedNode.id);
        }
      };
      const handleCrossAxisArrowKey = (forward) => {
        if (!isExpandable(processedNode))
          return;
        if (forward && !processedNode.isExpanded)
          actions.onNodeExpanded(processedNode.id);
        else if (!forward && processedNode.isExpanded)
          actions.onNodeCollapsed(processedNode.id);
      };
      const itemKeyboardNavigator = new ItemKeyboardNavigator(
        handleKeyboardSelectItem,
        handleKeyboardActivateItem
      );
      itemKeyboardNavigator.orientation = Orientation.Vertical;
      itemKeyboardNavigator.crossAxisArrowKeyHandler = handleCrossAxisArrowKey;
      itemKeyboardNavigator.allowWrap = false;
      itemKeyboardNavigator.itemCount = this._getVisibleNodes().getNumNodes();
      const processedNodeIndex = this._getVisibleNodes().getIndexOfNode(processedNodeId);
      isKeyDown ? itemKeyboardNavigator.handleKeyDownEvent(e, processedNodeIndex) : itemKeyboardNavigator.handleKeyUpEvent(e, processedNodeIndex);
    };
    this._getVisibleNodes = getVisibleNodes;
    const onItemsSelected = (selections, replacement) => {
      if (isIndividualSelection(selections[0])) {
        if (replacement) {
          this.onSelectionReplaced.emit({
            selectedNodeIds: selections
          });
        } else {
          this.onSelectionChanged.emit({
            selectedNodes: selections,
            deselectedNodes: []
          });
        }
      } else {
        if (replacement) {
          this.onSelectionReplaced.emit({
            selectedNodeIds: selections[0]
          });
        } else {
          this.onSelectionChanged.emit({
            selectedNodes: selections[0],
            deselectedNodes: []
          });
        }
      }
    };
    const onItemsDeselected = (deselections) => {
      this.onSelectionChanged.emit({
        selectedNodes: [],
        deselectedNodes: deselections
      });
    };
    this._selectionHandler = new SelectionHandler(
      selectionMode,
      onItemsSelected,
      onItemsDeselected
    );
    const _this = this;
    const itemHandlers = new Proxy(
      {},
      {
        get(_target, prop) {
          if (prop === "length") {
            return _this._getVisibleNodes().getNumNodes();
          }
          const index = +prop;
          const node = _this.getVisibleNodeAtIndex(
            _this._getVisibleNodes(),
            index
          );
          return new ItemHandler(node);
        }
      }
    );
    this._itemHandlers = [itemHandlers];
  }
  getVisibleNodeAtIndex(nodes, index) {
    const foundNode = nodes !== void 0 ? nodes.getAtIndex(index) : void 0;
    return isTreeModelNode(foundNode) ? foundNode : void 0;
  }
  onNodeClicked(nodeId, event) {
    const selectionFunc = this._selectionHandler.createSelectionFunction(
      ...this.createSelectionHandlers(nodeId)
    );
    selectionFunc(event.shiftKey, event.ctrlKey || event.metaKey);
  }
  onNodeMouseDown(nodeId) {
    this._selectionHandler.createDragAction(
      this.createSelectionHandlers(nodeId)[0],
      this._itemHandlers,
      nodeId
    );
    window.addEventListener(
      "mouseup",
      () => {
        this._selectionHandler.completeDragAction();
        if (this._dragSelectionOperation) {
          this._dragSelectionOperation.complete();
          this._dragSelectionOperation = void 0;
        }
      },
      { once: true }
    );
  }
  onNodeMouseMove(nodeId) {
    this._selectionHandler.updateDragAction(nodeId);
  }
  createSelectionHandlers(nodeId) {
    let deselectedAll = false;
    const multiSelectionHandler = {
      selectBetween: (item1, item2) => [
        { from: item1, to: item2 }
      ],
      updateSelection: (selections, deselections) => {
        if (!this._dragSelectionOperation) {
          this._dragSelectionOperation = new Subject();
          this.onDragSelection.emit({
            selectionChanges: this._dragSelectionOperation
          });
        }
        const selectedNodeIds = selections;
        const deselectedNodeIds = deselections;
        this._dragSelectionOperation.next({
          selectedNodes: selectedNodeIds,
          deselectedNodes: deselectedNodeIds
        });
      },
      deselectAll: () => {
        deselectedAll = true;
      },
      areEqual: (item1, item2) => item1 === item2
    };
    const singleSelectionHandler = {
      preselect: () => {
      },
      select: () => {
      },
      deselect: () => {
      },
      isSelected: () => {
        if (deselectedAll) {
          return false;
        }
        const node = this._getVisibleNodes().getModel().getNode(nodeId);
        return node !== void 0 && node.isSelected;
      },
      item: () => nodeId
    };
    return [multiSelectionHandler, singleSelectionHandler];
  }
  onTreeKeyDown(event, actions) {
    this._onKeyboardEvent(event, actions, true);
  }
  onTreeKeyUp(event, actions) {
    this._onKeyboardEvent(event, actions, false);
  }
}
function isIndividualSelection(selection) {
  return typeof selection === "string";
}
class ItemHandler {
  constructor(node) {
    this._node = node;
  }
  preselect() {
  }
  select() {
  }
  deselect() {
  }
  // eslint-disable-next-line @itwin/prefer-get
  isSelected() {
    var _a3;
    return !!((_a3 = this._node) == null ? void 0 : _a3.isSelected);
  }
  item() {
    var _a3;
    return ((_a3 = this._node) == null ? void 0 : _a3.id) ?? "";
  }
}
function toRxjsObservable(observable) {
  return new Observable((subscriber) => {
    observable.subscribe(subscriber);
  });
}
class TreeEventDispatcher {
  constructor(treeEvents, nodeLoader, selectionMode, getVisibleNodes) {
    this._activeSelections = /* @__PURE__ */ new Set();
    this._treeEvents = treeEvents;
    this._nodeLoader = nodeLoader;
    this._getVisibleNodes = getVisibleNodes;
    this._selectionManager = new TreeSelectionManager(
      selectionMode,
      this._getVisibleNodes
    );
    this._selectionManager.onDragSelection.addListener(
      ({ selectionChanges }) => {
        const modifications = selectionChanges.pipe(
          map(
            ({ selectedNodes, deselectedNodes }) => this.collectSelectionChanges(selectedNodes, []).pipe(
              concatMap(({ selectedNodeItems }) => from(selectedNodeItems)),
              toArray(),
              map((collectedIds) => ({
                selectedNodeItems: collectedIds,
                deselectedNodeItems: this.collectNodeItems(deselectedNodes)
              }))
            )
          ),
          concatAll(),
          shareReplay({
            refCount: true
          })
        );
        if (this._treeEvents.onSelectionModified !== void 0)
          this._treeEvents.onSelectionModified({ modifications });
      }
    );
    this._selectionManager.onSelectionChanged.addListener(
      ({ selectedNodes, deselectedNodes }) => {
        const modifications = merge(
          defer(() => {
            this._activeSelections.add(modifications);
            return EMPTY;
          }),
          this.collectSelectionChanges(selectedNodes, deselectedNodes)
        ).pipe(
          finalize(() => {
            this._activeSelections.delete(modifications);
          }),
          shareReplay({
            refCount: true
          })
        );
        if (this._treeEvents.onSelectionModified !== void 0)
          this._treeEvents.onSelectionModified({ modifications });
      }
    );
    this._selectionManager.onSelectionReplaced.addListener(
      ({ selectedNodeIds }) => {
        const replacements = merge(
          defer(() => {
            this._activeSelections.add(replacements);
            return EMPTY;
          }),
          this.collectSelectionChanges(selectedNodeIds, [])
        ).pipe(
          finalize(() => {
            this._activeSelections.delete(replacements);
          }),
          shareReplay({
            refCount: true
          })
        );
        if (this._treeEvents.onSelectionReplaced !== void 0)
          this._treeEvents.onSelectionReplaced({ replacements });
      }
    );
  }
  onNodeCheckboxClicked(nodeId, newState) {
    const visibleNodes = this._getVisibleNodes();
    const clickedNode = visibleNodes.getModel().getNode(nodeId);
    if (clickedNode === void 0)
      return;
    const immediateStateChanges = [{ nodeItem: clickedNode.item, newState }];
    if (clickedNode.isSelected) {
      for (const node of visibleNodes) {
        if (isTreeModelNode(node) && node.id !== clickedNode.id && node.isSelected && node.checkbox.state !== newState) {
          immediateStateChanges.push({ nodeItem: node.item, newState });
        }
      }
    }
    const stateChanges = concat(
      of(immediateStateChanges),
      from(this._activeSelections).pipe(
        mergeAll(),
        map(
          ({ selectedNodeItems }) => selectedNodeItems.map((item) => ({ nodeItem: item, newState }))
        )
      )
    ).pipe(
      shareReplay({
        refCount: true
      })
    );
    if (this._treeEvents.onCheckboxStateChanged !== void 0)
      this._treeEvents.onCheckboxStateChanged({ stateChanges });
  }
  onNodeExpanded(nodeId) {
    if (this._treeEvents.onNodeExpanded !== void 0)
      this._treeEvents.onNodeExpanded({ nodeId });
  }
  onNodeCollapsed(nodeId) {
    if (this._treeEvents.onNodeCollapsed !== void 0)
      this._treeEvents.onNodeCollapsed({ nodeId });
  }
  onNodeClicked(nodeId, event) {
    const node = this._getVisibleNodes().getModel().getNode(nodeId);
    const isNodeSelected = node && node.isSelected;
    if (event.detail === 2 && this._treeEvents.onNodeDoubleClick !== void 0) {
      this._treeEvents.onNodeDoubleClick({ nodeId });
      !isNodeSelected && this._selectionManager.onNodeClicked(nodeId, event);
    } else {
      this._selectionManager.onNodeClicked(nodeId, event);
    }
    if (isNodeSelected && this._treeEvents.onDelayedNodeClick !== void 0) {
      this._treeEvents.onDelayedNodeClick({ nodeId });
    }
  }
  onNodeMouseDown(nodeId) {
    this._selectionManager.onNodeMouseDown(nodeId);
  }
  onNodeMouseMove(nodeId) {
    this._selectionManager.onNodeMouseMove(nodeId);
  }
  onNodeEditorActivated(nodeId) {
    const node = this._getVisibleNodes().getModel().getNode(nodeId);
    const isNodeSelected = node ? node.isSelected : false;
    if (isNodeSelected && this._treeEvents.onNodeEditorActivated !== void 0) {
      this._treeEvents.onNodeEditorActivated({ nodeId });
    }
  }
  onTreeKeyDown(event) {
    this._selectionManager.onTreeKeyDown(event, this);
  }
  onTreeKeyUp(event) {
    this._selectionManager.onTreeKeyUp(event, this);
  }
  collectSelectionChanges(selection, deselection) {
    const deselectedItems = this.collectNodeItems(deselection);
    if (isRangeSelection(selection)) {
      return this.collectNodesBetween(selection.from, selection.to).pipe(
        map((selectedNodeItems, index) => {
          return {
            selectedNodeItems,
            deselectedNodeItems: index === 0 ? deselectedItems : []
          };
        })
      );
    }
    const selectedItems = this.collectNodeItems(selection);
    return of({
      selectedNodeItems: selectedItems,
      deselectedNodeItems: deselectedItems
    });
  }
  collectNodesBetween(nodeId1, nodeId2) {
    const [readyNodes, nodesToLoad] = TreeEventDispatcher.groupNodesByLoadingState(
      this.iterateNodesBetween(nodeId1, nodeId2)
    );
    const loadedSelectedNodes = from(
      nodesToLoad.map((node) => {
        const parentNode = node.parentId ? this._getVisibleNodes().getModel().getNode(node.parentId) : this._getVisibleNodes().getModel().getRootNode();
        return parentNode ? toRxjsObservable(
          this._nodeLoader.loadNode(parentNode, node.childIndex)
        ) : EMPTY;
      })
    ).pipe(
      // We have requested multiple nodes that may belong to the same page.
      // When the page loads we only want to process the loaded nodes once.
      // Making assumption that loaded nodes from the same page will be emitted without interruptions.
      // Maybe we could simplify this to `this._nodeLoader.loadNodes(nodesToLoad)`?
      mergeAll(),
      distinctUntilChanged()
    );
    return concat(
      of(
        readyNodes.filter((node) => !node.isSelectionDisabled).map((node) => node.item)
      ),
      loadedSelectedNodes.pipe(
        map(
          ({ loadedNodes }) => loadedNodes.filter((item) => !item.isSelectionDisabled)
        )
      )
    ).pipe(
      filter((nodeItems) => nodeItems.length > 0),
      // Give enough time for multiple subscribers to subscribe before any emissions begin
      subscribeOn(asapScheduler)
    );
  }
  *iterateNodesBetween(nodeId1, nodeId2) {
    let firstNodeFound = false;
    for (const node of this._getVisibleNodes()) {
      if (firstNodeFound) {
        yield node;
      }
      if (isTreeModelNode(node)) {
        if (nodeId1 === nodeId2 && node.id === nodeId1) {
          yield node;
          return;
        }
        if (node.id === nodeId1 || node.id === nodeId2) {
          if (firstNodeFound) {
            return;
          }
          firstNodeFound = true;
          yield node;
        }
      }
    }
  }
  collectNodeItems(nodeIds) {
    const items = [];
    for (const nodeId of nodeIds) {
      const node = this._getVisibleNodes().getModel().getNode(nodeId);
      if (node !== void 0 && !node.isSelectionDisabled) {
        items.push(node.item);
      }
    }
    return items;
  }
  static groupNodesByLoadingState(nodes) {
    const loadedNodeItems = [];
    const nodesToLoad = [];
    for (const node of nodes) {
      if (isTreeModelNode(node)) {
        loadedNodeItems.push(node);
      } else {
        nodesToLoad.push(node);
      }
    }
    return [loadedNodeItems, nodesToLoad];
  }
}
function DelayedSpinner(props) {
  const delay = props.delay ?? 500;
  const [loadStart] = reactExports.useState(props.loadStart || /* @__PURE__ */ new Date());
  const currTime = /* @__PURE__ */ new Date();
  const diff = currTime.getTime() - loadStart.getTime();
  const update = useForceUpdate();
  reactExports.useEffect(() => {
    if (diff >= delay)
      return;
    const timer2 = setTimeout(update, delay - diff);
    return () => clearTimeout(timer2);
  });
  if (diff < delay)
    return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProgressRadial,
    {
      "data-testid": "components-delayed-spinner",
      indeterminate: true,
      size: props.size ?? "large"
    }
  );
}
const useForceUpdate = () => {
  const [value, set] = reactExports.useState(true);
  return () => set(!value);
};
try {
  DelayedSpinner.displayName = "DelayedSpinner";
  DelayedSpinner.__docgenInfo = { "description": "Spinner that is rendered with delay.", "displayName": "DelayedSpinner", "props": { "loadStart": { "defaultValue": null, "description": "", "name": "loadStart", "required": false, "type": { "name": "Date" } }, "delay": { "defaultValue": null, "description": "", "name": "delay", "required": false, "type": { "name": "number" } }, "size": { "defaultValue": null, "description": "", "name": "size", "required": false, "type": { "name": "enum", "value": [{ "value": '""' }, { "value": '"small"' }, { "value": '"x-small"' }, { "value": '"large"' }] } } } };
} catch (__react_docgen_typescript_loader_error) {
}
var TreeComponentTestId = /* @__PURE__ */ ((TreeComponentTestId2) => {
  TreeComponentTestId2["Node"] = "tree-node";
  TreeComponentTestId2["NodeContents"] = "tree-node-contents";
  TreeComponentTestId2["NodeExpansionToggle"] = "tree-node-expansion-toggle";
  TreeComponentTestId2["NodeCheckbox"] = "tree-node-checkbox";
  return TreeComponentTestId2;
})(TreeComponentTestId || {});
function TreeNodeEditor(props) {
  const onCommit = (args) => {
    const newValue = args.newValue.value;
    props.onCommit(props.node, newValue);
  };
  const propertyRecord = createPropertyRecord(props.node.item.label);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: props.style, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    EditorContainer,
    {
      propertyRecord,
      title: propertyRecord.description,
      onCommit,
      onCancel: props.onCancel,
      ignoreEditorBlur: props.ignoreEditorBlur,
      setFocus: true
    }
  ) });
}
function createPropertyRecord(label) {
  const property2 = {
    name: "tree-node-editor",
    displayLabel: "Tree Node Editor",
    typename: label.property.typename
  };
  const record = new PropertyRecord(label.value, property2);
  record.description = "";
  record.isReadonly = false;
  return record;
}
try {
  TreeNodeEditor.displayName = "TreeNodeEditor";
  TreeNodeEditor.__docgenInfo = { "description": "React component for displaying tree node editor.", "displayName": "TreeNodeEditor", "props": { "node": { "defaultValue": null, "description": "Tree node which is in editing mode.", "name": "node", "required": true, "type": { "name": "TreeModelNode" } }, "onCommit": { "defaultValue": null, "description": "Callback that is called when changes are committed.", "name": "onCommit", "required": true, "type": { "name": "(node: TreeModelNode, newValue: string) => void" } }, "onCancel": { "defaultValue": null, "description": "Callback that is called when editing is canceled.", "name": "onCancel", "required": true, "type": { "name": "() => void" } }, "style": { "defaultValue": null, "description": "Editor style.", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "ignoreEditorBlur": { "defaultValue": null, "description": "@internal", "name": "ignoreEditorBlur", "required": false, "type": { "name": "boolean" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function TreeNodeContent(props) {
  const { node, onLabelRendered, highlightProps } = props;
  const label = reactExports.useMemo(
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    () => getLabel(node, highlightProps),
    [node, highlightProps]
  );
  reactExports.useEffect(() => {
    onLabelRendered && onLabelRendered(node);
  }, [label, node, onLabelRendered]);
  let editor2;
  if (props.node.editingInfo) {
    const style = getStyle(props.node.item.style, props.node.isSelected);
    const editorProps = {
      node: props.node,
      onCancel: props.node.editingInfo.onCancel,
      onCommit: props.node.editingInfo.onCommit,
      style
    };
    editor2 = props.nodeEditorRenderer ? props.nodeEditorRenderer(editorProps) : /* @__PURE__ */ jsxRuntimeExports.jsx(TreeNodeEditor, { ...editorProps });
  }
  const isDescriptionEnabled = props.node.item.description && props.showDescription;
  const containerClassName = classnames(
    "components-controlledTree-node-content",
    isDescriptionEnabled ? "with-description" : void 0,
    props.className
  );
  const descriptionClassName = classnames(
    "components-controlledTree-node-description",
    editor2 ? "with-editor" : void 0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: containerClassName, style: props.style, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    editor2 ? editor2 : label,
    isDescriptionEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: descriptionClassName, children: props.node.item.description }) : void 0
  ] }) });
}
function getLabel(node, highlightProps) {
  const highlightCallback = highlightProps ? (text) => HighlightingEngine.renderNodeLabel(text, highlightProps) : void 0;
  const context = {
    containerType: PropertyContainerType.Tree,
    style: getStyle(node.item.style, node.isSelected),
    textHighlighter: highlightCallback,
    defaultValue: (
      // eslint-disable-next-line deprecation/deprecation
      /* @__PURE__ */ jsxRuntimeExports.jsx(TreeNodePlaceholder, { level: 0, "data-testid": "node-label-placeholder" })
    )
  };
  return PropertyValueRendererManager.defaultManager.render(
    node.item.label,
    context
  );
}
function getStyle(style, isSelected) {
  return ItemStyleProvider.createStyle(style ? style : {}, isSelected);
}
try {
  TreeNodeContent.displayName = "TreeNodeContent";
  TreeNodeContent.__docgenInfo = { "description": "React component for displaying [[TreeNode]] label", "displayName": "TreeNodeContent", "props": { "node": { "defaultValue": null, "description": "Tree node to render label for.", "name": "node", "required": true, "type": { "name": "TreeModelNode" } }, "showDescription": { "defaultValue": null, "description": "Flag that specified whether the description should be shown or not.", "name": "showDescription", "required": false, "type": { "name": "boolean" } }, "highlightProps": { "defaultValue": null, "description": "Props for highlighting label parts that matches filter when tree is filtered.", "name": "highlightProps", "required": false, "type": { "name": "HighlightableTreeNodeProps" } }, "onLabelRendered": { "defaultValue": null, "description": "Callback used to detect when label is rendered.", "name": "onLabelRendered", "required": false, "type": { "name": "((node: TreeModelNode) => void)" } }, "nodeEditorRenderer": { "defaultValue": null, "description": "Callback to render custom node editor when node is in editing mode.", "name": "nodeEditorRenderer", "required": false, "type": { "name": "TreeNodeEditorRenderer" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const TreeNodeRenderer = reactExports.memo(function TreeNodeRenderer2(props) {
  const label = /* @__PURE__ */ jsxRuntimeExports.jsx(
    TreeNodeContent,
    {
      node: props.node,
      showDescription: props.descriptionEnabled,
      highlightProps: props.nodeHighlightProps,
      onLabelRendered: props.onLabelRendered,
      nodeEditorRenderer: props.nodeEditorRenderer
    },
    props.node.id
  );
  function onExpansionToggle() {
    if (props.node.isExpanded)
      props.treeActions.onNodeCollapsed(props.node.id);
    else
      props.treeActions.onNodeExpanded(props.node.id);
  }
  function onContextMenu(e) {
    e.preventDefault();
    props.onContextMenu && props.onContextMenu(e, props.node);
  }
  const createCheckboxProps = (checkboxInfo) => ({
    state: checkboxInfo.state,
    tooltip: checkboxInfo.tooltip,
    isDisabled: checkboxInfo.isDisabled,
    onClick: (newState) => props.treeActions.onNodeCheckboxClicked(props.node.id, newState)
  });
  return (
    // eslint-disable-next-line deprecation/deprecation
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TreeNode,
      {
        "data-testid": TreeComponentTestId.Node,
        className: props.className,
        checkboxProps: props.node.checkbox.isVisible ? createCheckboxProps(props.node.checkbox) : void 0,
        style: props.style,
        isExpanded: props.node.isExpanded,
        isSelected: props.node.isSelected,
        isLoading: props.node.isLoading,
        isLeaf: props.node.numChildren === 0,
        icon: props.imageLoader ? /* @__PURE__ */ jsxRuntimeExports.jsx(TreeNodeIcon, { node: props.node, imageLoader: props.imageLoader }) : void 0,
        label,
        level: props.node.depth,
        onClick: (event) => props.treeActions.onNodeClicked(props.node.id, event),
        onMouseDown: () => props.treeActions.onNodeMouseDown(props.node.id),
        onMouseMove: () => props.treeActions.onNodeMouseMove(props.node.id),
        onClickExpansionToggle: onExpansionToggle,
        onContextMenu,
        renderOverrides: { renderCheckbox: props.checkboxRenderer },
        children: props.children
      }
    )
  );
});
function TreeNodeIcon(props) {
  const { imageLoader, node } = props;
  const image = imageLoader.load(node.item);
  if (!image)
    return null;
  const renderer = new ImageRenderer();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderer.render(image) });
}
try {
  TreeNodeIcon.displayName = "TreeNodeIcon";
  TreeNodeIcon.__docgenInfo = { "description": "React component that renders icon for [[TreeNode]].", "displayName": "TreeNodeIcon", "props": { "node": { "defaultValue": null, "description": "Tree node to render icon for.", "name": "node", "required": true, "type": { "name": "TreeModelNode" } }, "imageLoader": { "defaultValue": null, "description": "Image loader used to load tree node icon.", "name": "imageLoader", "required": true, "type": { "name": "ITreeImageLoader" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  TreeNodeRenderer.displayName = "TreeNodeRenderer";
  TreeNodeRenderer.__docgenInfo = { "description": "Default component for rendering tree node.", "displayName": "TreeNodeRenderer", "props": { "node": { "defaultValue": null, "description": "Tree node to render.", "name": "node", "required": true, "type": { "name": "TreeModelNode" } }, "treeActions": { "defaultValue": null, "description": "Action handler.", "name": "treeActions", "required": true, "type": { "name": "TreeActions" } }, "nodeHighlightProps": { "defaultValue": null, "description": "Properties used to highlight matches when tree is filtered.", "name": "nodeHighlightProps", "required": false, "type": { "name": "HighlightableTreeNodeProps" } }, "descriptionEnabled": { "defaultValue": null, "description": "Specifies whether to show descriptions or not.", "name": "descriptionEnabled", "required": false, "type": { "name": "boolean" } }, "imageLoader": { "defaultValue": null, "description": "Image loader for node icons.", "name": "imageLoader", "required": false, "type": { "name": "ITreeImageLoader" } }, "checkboxRenderer": { "defaultValue": null, "description": "Callback to render custom checkbox.", "name": "checkboxRenderer", "required": false, "type": { "name": "((props: CheckboxRendererProps) => ReactNode)" } }, "nodeEditorRenderer": { "defaultValue": null, "description": "Callback to render custom node editor when node is in editing mode.", "name": "nodeEditorRenderer", "required": false, "type": { "name": "TreeNodeEditorRenderer" } }, "onLabelRendered": { "defaultValue": null, "description": "Callback used to detect when label is rendered. It is used by TreeRenderer for scrolling to active match.\n@internal", "name": "onLabelRendered", "required": false, "type": { "name": "((node: TreeModelNode) => void)" } }, "onContextMenu": { "defaultValue": null, "description": "Callback that is invoked when context menu should be opened.", "name": "onContextMenu", "required": false, "type": { "name": "((e: MouseEvent<Element, MouseEvent>, node: TreeModelNode) => void)" } }, "children": { "defaultValue": null, "description": "Child components to render inside the node.", "name": "children", "required": false, "type": { "name": "ReactNode" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
const NODE_LOAD_DELAY = 500;
const [
  /** Context of [[TreeRenderer]] provider. */
  TreeRendererContextProvider,
  /** Context of [[TreeRenderer]] consumer. */
  _TreeRendererContextConsumer,
  /** Custom hook to use [[TreeRenderer]] context. */
  useTreeRendererContext
] = createContextWithMandatoryProvider(
  "TreeRendererContext"
);
class TreeRenderer extends reactExports.Component {
  constructor() {
    super(...arguments);
    this._ref = reactExports.createRef();
  }
  /** @inheritdoc */
  scrollToNode(nodeId, alignment) {
    if (this._ref.current)
      this._ref.current.scrollToNode(nodeId, alignment);
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TreeRendererInner, { ref: this._ref, ...this.props });
  }
}
const TreeRendererInner = reactExports.forwardRef((props, ref) => {
  const variableSizeListRef = reactExports.useRef(null);
  useTreeRendererAttributes(ref, variableSizeListRef, props.visibleNodes);
  const previousVisibleNodes = usePrevious(props.visibleNodes);
  const previousNodeHeight = usePrevious(props.nodeHeight);
  if (previousVisibleNodes !== void 0 && previousVisibleNodes !== props.visibleNodes || previousNodeHeight !== void 0 && previousNodeHeight !== props.nodeHeight) {
    if (variableSizeListRef.current) {
      variableSizeListRef.current.resetAfterIndex(0, false);
    }
  }
  const coreTreeRef = reactExports.useRef(null);
  const onLabelRendered = useScrollToActiveMatch(
    coreTreeRef,
    props.nodeHighlightingProps
  );
  const highlightingEngine = reactExports.useMemo(
    () => props.nodeHighlightingProps && new HighlightingEngine(props.nodeHighlightingProps),
    [props.nodeHighlightingProps]
  );
  const rendererContext = reactExports.useMemo(
    () => ({
      nodeRenderer: props.nodeRenderer ? props.nodeRenderer : (nodeProps) => /* @__PURE__ */ jsxRuntimeExports.jsx(TreeNodeRenderer, { ...nodeProps }),
      treeActions: props.treeActions,
      nodeLoader: props.nodeLoader,
      visibleNodes: props.visibleNodes,
      onLabelRendered,
      highlightingEngine,
      onNodeEditorClosed: () => {
        setFocusToSelected(coreTreeRef);
        props.onNodeEditorClosed && props.onNodeEditorClosed();
      }
    }),
    [props, onLabelRendered, highlightingEngine]
  );
  const itemKey = reactExports.useCallback(
    (index) => getNodeKey(props.visibleNodes.getAtIndex(index)),
    [props.visibleNodes]
  );
  const { nodeHeight, visibleNodes } = props;
  const itemSize = reactExports.useCallback(
    (index) => nodeHeight(visibleNodes.getAtIndex(index), index),
    [nodeHeight, visibleNodes]
  );
  const { nodeHighlightingProps } = props;
  reactExports.useEffect(() => {
    const highlightedNodeId = getHighlightedNodeId(nodeHighlightingProps);
    if (!highlightedNodeId)
      return;
    let index = 0;
    for (const node of visibleNodes) {
      if (isTreeModelNode(node) && node.id === highlightedNodeId)
        break;
      index++;
    }
    assert(variableSizeListRef.current !== null);
    variableSizeListRef.current.scrollToItem(index);
  }, [nodeHighlightingProps]);
  const handleKeyDown = reactExports.useCallback(
    (e) => {
      props.treeActions.onTreeKeyDown(e);
    },
    [props.treeActions]
  );
  const handleKeyUp = reactExports.useCallback(
    (e) => {
      props.treeActions.onTreeKeyUp(e);
    },
    [props.treeActions]
  );
  const onItemsRendered = props.onItemsRendered;
  const handleRenderedItemsChange = reactExports.useCallback(
    (onItemsRenderedProps) => {
      onItemsRendered && onItemsRendered({ ...onItemsRenderedProps });
    },
    [onItemsRendered]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TreeRendererContextProvider, { value: rendererContext, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tree,
    {
      ref: coreTreeRef,
      className: classnames(
        "components-controlledTree",
        "components-smallEditor-host"
      ),
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        VariableSizeList,
        {
          ref: variableSizeListRef,
          className: "ReactWindow__VariableSizeList",
          width: props.width,
          height: props.height,
          itemCount: props.visibleNodes.getNumNodes(),
          itemSize,
          estimatedItemSize: 25,
          overscanCount: 10,
          itemKey,
          onItemsRendered: handleRenderedItemsChange,
          children: Node
        }
      )
    }
  ) });
});
function getNodeKey(node) {
  if (isTreeModelNode(node)) {
    return node.id;
  }
  return `${node.parentId || ""}-${node.childIndex}`;
}
const Node = reactExports.memo(
  function Node2(props) {
    const { index, style } = props;
    const {
      nodeRenderer,
      visibleNodes,
      treeActions,
      nodeLoader,
      onLabelRendered,
      highlightingEngine,
      onNodeEditorClosed
    } = useTreeRendererContext(Node2);
    const node = visibleNodes.getAtIndex(index);
    useNodeLoading(node, visibleNodes, nodeLoader);
    const className = classnames("node-wrapper", {
      "is-selected": isTreeModelNode(node) && node.isSelected
    });
    const isEditing = reactExports.useRef(false);
    reactExports.useEffect(() => {
      if (!isTreeModelNode(node))
        return;
      if (!isEditing.current && node.editingInfo) {
        isEditing.current = true;
      } else if (isEditing.current && node.editingInfo === void 0) {
        isEditing.current = false;
        if (onNodeEditorClosed)
          onNodeEditorClosed();
      }
    }, [node, onNodeEditorClosed]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, style, children: reactExports.useMemo(() => {
      if (isTreeModelNode(node)) {
        const nodeHighlightProps = highlightingEngine ? highlightingEngine.createRenderProps(node) : void 0;
        return nodeRenderer({
          node,
          treeActions,
          onLabelRendered,
          nodeHighlightProps
        });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TreeNodePlaceholder, { level: node.depth });
    }, [
      node,
      treeActions,
      nodeRenderer,
      onLabelRendered,
      highlightingEngine
    ]) });
  },
  areEqual
);
function useNodeLoading(node, visibleNodes, nodeLoader) {
  reactExports.useEffect(
    () => {
      if (!isTreeModelNodePlaceholder(node)) {
        return;
      }
      const treeModel = visibleNodes.getModel();
      const parentNode = node.parentId ? treeModel.getNode(node.parentId) : treeModel.getRootNode();
      if (!isTreeModelNode(parentNode) && !isTreeModelRootNode(parentNode)) {
        return;
      }
      const subscription = concat(
        timer(NODE_LOAD_DELAY),
        toRxjsObservable(nodeLoader.loadNode(parentNode, node.childIndex))
      ).subscribe();
      return () => subscription.unsubscribe();
    },
    // Mounted node component never changes its node key, thus it's safe to run this effect only once for every
    // nodeLoader change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodeLoader]
  );
}
function useTreeRendererAttributes(ref, variableSizeListRef, visibleNodes) {
  const visibleNodesRef = reactExports.useRef(visibleNodes);
  visibleNodesRef.current = visibleNodes;
  reactExports.useImperativeHandle(
    ref,
    () => ({
      scrollToNode: (nodeId, alignment) => {
        assert(variableSizeListRef.current !== null);
        variableSizeListRef.current.scrollToItem(
          visibleNodesRef.current.getIndexOfNode(nodeId),
          alignment
        );
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
function usePrevious(value) {
  const ref = reactExports.useRef();
  reactExports.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
function getHighlightedNodeId(highlightableTreeProps) {
  return highlightableTreeProps && highlightableTreeProps.activeMatch ? highlightableTreeProps.activeMatch.nodeId : void 0;
}
function useScrollToActiveMatch(treeRef, highlightableTreeProps) {
  const scrollToActive = reactExports.useRef(false);
  reactExports.useEffect(() => {
    scrollToActive.current = true;
  }, [highlightableTreeProps]);
  const onLabelRendered = reactExports.useCallback(
    (node) => {
      const highlightedNodeId = getHighlightedNodeId(highlightableTreeProps);
      if (!treeRef.current || !scrollToActive.current || !highlightedNodeId || highlightedNodeId !== node.id)
        return;
      scrollToActive.current = false;
      const scrollTo = [
        ...treeRef.current.getElementsByClassName(
          HighlightingEngine.ACTIVE_CLASS_NAME
        )
      ];
      if (scrollTo.length > 0 && scrollTo[0].scrollIntoView !== void 0)
        scrollTo[0].scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "end"
        });
    },
    [highlightableTreeProps, treeRef]
  );
  return onLabelRendered;
}
function setFocusToSelected(treeRef) {
  if (treeRef.current)
    treeRef.current.setFocusByClassName(".core-tree-node.is-selected");
}
try {
  TreeRenderer.displayName = "TreeRenderer";
  TreeRenderer.__docgenInfo = { "description": "Default tree rendering component.", "displayName": "TreeRenderer", "props": { "treeActions": { "defaultValue": null, "description": "", "name": "treeActions", "required": true, "type": { "name": "TreeActions" } }, "nodeLoader": { "defaultValue": null, "description": "", "name": "nodeLoader", "required": true, "type": { "name": "ITreeNodeLoader" } }, "nodeHeight": { "defaultValue": null, "description": "Callback that is used to determine node height.", "name": "nodeHeight", "required": true, "type": { "name": "(node: TreeModelNode | TreeModelNodePlaceholder, index: number) => number" } }, "visibleNodes": { "defaultValue": null, "description": "Flat list of nodes to be rendered.", "name": "visibleNodes", "required": true, "type": { "name": "VisibleTreeNodes" } }, "nodeRenderer": { "defaultValue": null, "description": "Callback to render custom node.", "name": "nodeRenderer", "required": false, "type": { "name": "((props: TreeNodeRendererProps) => ReactNode)" } }, "nodeHighlightingProps": { "defaultValue": null, "description": "Properties used to highlight nodes and scroll to active match while filtering.", "name": "nodeHighlightingProps", "required": false, "type": { "name": "HighlightableTreeProps" } }, "onItemsRendered": { "defaultValue": null, "description": "Callback that is called when rendered items range changes.", "name": "onItemsRendered", "required": false, "type": { "name": "((renderedItems: RenderedItemsRange) => void)" } }, "onNodeEditorClosed": { "defaultValue": null, "description": "Callback used when an editor closes\n@internal", "name": "onNodeEditorClosed", "required": false, "type": { "name": "(() => void)" } }, "width": { "defaultValue": null, "description": "Width of the tree area.", "name": "width", "required": true, "type": { "name": "number" } }, "height": { "defaultValue": null, "description": "Height of the tree area.", "name": "height", "required": true, "type": { "name": "number" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
function ControlledTree(props) {
  const nodeHeight = useNodeHeight(!!props.descriptionsEnabled);
  const imageLoader = reactExports.useMemo(() => new TreeImageLoader(), []);
  const nodeRenderer = reactExports.useCallback(
    (nodeProps) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TreeNodeRenderer,
      {
        ...nodeProps,
        descriptionEnabled: props.descriptionsEnabled,
        imageLoader: props.iconsEnabled ? imageLoader : void 0
      }
    ),
    [props.descriptionsEnabled, props.iconsEnabled, imageLoader]
  );
  const visibleNodesRef = reactExports.useRef();
  visibleNodesRef.current = reactExports.useMemo(
    () => computeVisibleNodes(props.model),
    [props.model]
  );
  const eventDispatcher = reactExports.useMemo(
    () => new TreeEventDispatcher(
      props.eventsHandler,
      props.nodeLoader,
      props.selectionMode,
      () => visibleNodesRef.current
    ),
    [props.eventsHandler, props.nodeLoader, props.selectionMode]
  );
  const treeProps = {
    nodeRenderer,
    nodeHeight,
    visibleNodes: visibleNodesRef.current,
    treeActions: eventDispatcher,
    nodeLoader: props.nodeLoader,
    nodeHighlightingProps: props.nodeHighlightingProps,
    onItemsRendered: props.onItemsRendered,
    width: props.width,
    height: props.height
  };
  const loading = useRootNodeLoader(visibleNodesRef.current, props.nodeLoader);
  const noData = visibleNodesRef.current.getNumRootNodes() === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Loader,
    {
      loading,
      noData,
      spinnerRenderer: props.spinnerRenderer,
      noDataRenderer: props.noDataRenderer,
      children: props.treeRenderer ? props.treeRenderer(treeProps) : /* @__PURE__ */ jsxRuntimeExports.jsx(TreeRenderer, { ...treeProps })
    }
  );
}
function useControlledTreeLayoutStorage() {
  return useElementsScrollStorage("ReactWindow__VariableSizeList");
}
function useRootNodeLoader(visibleNodes, nodeLoader) {
  reactExports.useEffect(() => {
    if (visibleNodes.getNumRootNodes() === void 0) {
      const subscription = nodeLoader.loadNode(visibleNodes.getModel().getRootNode(), 0).subscribe();
      return () => subscription.unsubscribe();
    }
    return () => {
    };
  }, [visibleNodes, nodeLoader]);
  return visibleNodes.getNumRootNodes() === void 0;
}
function Loader(props) {
  const { translate } = useTranslation();
  if (props.loading) {
    return props.spinnerRenderer ? props.spinnerRenderer() : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-controlledTree-loader", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DelayedSpinner, { size: "large" }) });
  }
  if (props.noData) {
    return props.noDataRenderer ? props.noDataRenderer() : (
      // eslint-disable-next-line deprecation/deprecation
      /* @__PURE__ */ jsxRuntimeExports.jsx(FillCentered, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "components-controlledTree-errorMessage", children: translate("general.noData") }) })
    );
  }
  return props.children;
}
function useNodeHeight(descriptionsEnabled) {
  return reactExports.useCallback(
    (node) => {
      const contentHeight = isTreeModelNode(node) && descriptionsEnabled && node && node.description ? 43 : 24;
      const borderSize = 1;
      return contentHeight + borderSize;
    },
    [descriptionsEnabled]
  );
}
try {
  ControlledTree.displayName = "ControlledTree";
  ControlledTree.__docgenInfo = { "description": "React tree component which rendering is fully controlled from outside.", "displayName": "ControlledTree", "props": { "model": { "defaultValue": null, "description": "Model of the tree to display.", "name": "model", "required": true, "type": { "name": "TreeModel" } }, "nodeLoader": { "defaultValue": null, "description": "Node loader used to load root nodes and placeholder nodes.", "name": "nodeLoader", "required": true, "type": { "name": "ITreeNodeLoader" } }, "eventsHandler": { "defaultValue": null, "description": "Tree events handler.", "name": "eventsHandler", "required": true, "type": { "name": "TreeEvents" } }, "selectionMode": { "defaultValue": null, "description": "Mode of nodes' selection in tree.", "name": "selectionMode", "required": true, "type": { "name": "enum", "value": [{ "value": "1" }, { "value": "6" }, { "value": "12" }, { "value": "5" }, { "value": "16" }] } }, "descriptionsEnabled": { "defaultValue": null, "description": "Specifies whether to show node description or not. It is used in default node renderer and to determine node height.\nIf custom node renderer and node height callbacks are used it does nothing.", "name": "descriptionsEnabled", "required": false, "type": { "name": "boolean" } }, "iconsEnabled": { "defaultValue": null, "description": "Specifies whether to show node icon or not. It is used in default node renderer.\nIf custom node renderer is used it does nothing.", "name": "iconsEnabled", "required": false, "type": { "name": "boolean" } }, "nodeHighlightingProps": { "defaultValue": null, "description": "Used to highlight matches when filtering tree.\nIt is passed to treeRenderer.", "name": "nodeHighlightingProps", "required": false, "type": { "name": "HighlightableTreeProps" } }, "treeRenderer": { "defaultValue": null, "description": "Custom renderer to be used to render a tree.", "name": "treeRenderer", "required": false, "type": { "name": "((props: TreeRendererProps) => ReactElement<any, string | JSXElementConstructor<any>>)" } }, "spinnerRenderer": { "defaultValue": null, "description": "Custom renderer to be used while root nodes is loading.", "name": "spinnerRenderer", "required": false, "type": { "name": "(() => ReactElement<any, string | JSXElementConstructor<any>>)" } }, "noDataRenderer": { "defaultValue": null, "description": "Custom renderer to be used when there is no data to show in tree.", "name": "noDataRenderer", "required": false, "type": { "name": "(() => ReactElement<any, string | JSXElementConstructor<any>>)" } }, "onItemsRendered": { "defaultValue": null, "description": "Callback that is invoked when rendered items range changes.", "name": "onItemsRendered", "required": false, "type": { "name": "((items: RenderedItemsRange) => void)" } }, "width": { "defaultValue": null, "description": "Width of the tree renderer.", "name": "width", "required": true, "type": { "name": "number" } }, "height": { "defaultValue": null, "description": "Height of the tree renderer.", "name": "height", "required": true, "type": { "name": "number" } }, "style": { "defaultValue": null, "description": "Custom CSS style properties", "name": "style", "required": false, "type": { "name": "CSSProperties" } }, "itemId": { "defaultValue": null, "description": "Optional unique identifier for item. If defined it will be added to DOM Element attribute as data-item-id", "name": "itemId", "required": false, "type": { "name": "string" } }, "className": { "defaultValue": null, "description": "Custom CSS class name", "name": "className", "required": false, "type": { "name": "string" } } } };
} catch (__react_docgen_typescript_loader_error) {
}
try {
  useControlledTreeLayoutStorage.displayName = "useControlledTreeLayoutStorage";
  useControlledTreeLayoutStorage.__docgenInfo = { "description": "Returns callbacks for persisting and restoring [[ControlledTree]] layout state.\nReturned `ref` should be set on container containing ControlledTree.", "displayName": "useControlledTreeLayoutStorage", "props": {} };
} catch (__react_docgen_typescript_loader_error) {
}
const PaddingDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    style: {
      padding: "5px"
    },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {})
  });
};
const rendererManager = new PropertyValueRendererManager();
const meta = {
  title: "Components/PropertyGrid",
  component: VirtualizedPropertyGridWithDataProvider,
  tags: ["autodocs"],
  decorators: [PaddingDecorator, AppUiDecorator],
  args: {
    height: 600,
    width: 1300
  }
};
const Basic = {
  args: {
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [{
          name: "Group_1",
          label: "Group 1",
          expand: true
        }, {
          name: "Group_2",
          label: "Group 2",
          expand: false
        }],
        records: {
          Group_1: [PropertyRecord.fromString("Record 1_1"), PropertyRecord.fromString("Record 1_2")],
          Group_2: [PropertyRecord.fromString("Record 2_1"), PropertyRecord.fromString("Record 2_2")]
        }
      }),
      onDataChanged: new PropertyDataChangeEvent()
    },
    onPropertyContextMenu: void 0
  }
};
const StructRendering = {
  args: {
    orientation: Orientation$1.Vertical,
    propertyValueRendererManager: rendererManager,
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [{
          name: "structPropertyRendering",
          label: "Struct property rendering",
          expand: true
        }],
        records: {
          structPropertyRendering: [new PropertyRecord({
            valueFormat: PropertyValueFormat.Primitive,
            value: "string value"
          }, {
            name: "simpleProperty",
            displayLabel: "Simple property",
            typename: "string"
          }), new PropertyRecord({
            valueFormat: PropertyValueFormat.Primitive,
            value: multilineString
          }, {
            name: "multilineProperty",
            displayLabel: "Multiline property",
            typename: "string",
            renderer: {
              name: "multiline"
            }
          }), new PropertyRecord({
            valueFormat: PropertyValueFormat.Primitive,
            value: void 0
          }, {
            name: "noValueStruct",
            displayLabel: "Struct property with no value",
            typename: "struct"
          }), new PropertyRecord({
            valueFormat: PropertyValueFormat.Struct,
            members: structMembers
          }, {
            name: "noRendererStructProperty",
            displayLabel: "Struct property (no renderer)",
            typename: "struct"
          }), new PropertyRecord({
            valueFormat: PropertyValueFormat.Struct,
            members: structMembers
          }, {
            name: "defaultRendererStructProperty",
            displayLabel: "Struct property (default renderer)",
            typename: "struct",
            renderer: {
              name: "defaultRendererPropertyRenderer"
            }
          }), new PropertyRecord({
            valueFormat: PropertyValueFormat.Struct,
            members: structMembers
          }, {
            name: "customRendererStructProperty",
            displayLabel: "Struct property (custom renderer)",
            typename: "struct",
            renderer: {
              name: "customRendererStructPropertyRenderer"
            }
          })]
        }
      }),
      onDataChanged: new PropertyDataChangeEvent()
    }
  }
};
const ArrayRendering = {
  args: {
    orientation: Orientation$1.Horizontal,
    propertyValueRendererManager: rendererManager,
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [{
          name: "arrayPropertyRendering",
          label: "Array property rendering",
          expand: true
        }],
        records: {
          arrayPropertyRendering: [new PropertyRecord({
            valueFormat: PropertyValueFormat.Primitive,
            value: "string value"
          }, {
            name: "simpleProperty",
            displayLabel: "Simple property",
            typename: "string"
          }), new PropertyRecord({
            valueFormat: PropertyValueFormat.Primitive,
            value: multilineString
          }, {
            name: "multilineProperty",
            displayLabel: "Multiline property",
            typename: "string",
            renderer: {
              name: "multiline"
            }
          }), new PropertyRecord({
            valueFormat: PropertyValueFormat.Array,
            items: [],
            itemsTypeName: "array"
          }, {
            name: "emptyArray",
            displayLabel: "Array property with no items",
            typename: "array"
          }), new PropertyRecord({
            valueFormat: PropertyValueFormat.Array,
            items: arrayMembers,
            itemsTypeName: "array"
          }, {
            name: "noRendererStructProperty",
            displayLabel: "Array property (no renderer)",
            typename: "array"
          }), new PropertyRecord({
            valueFormat: PropertyValueFormat.Array,
            items: arrayMembers,
            itemsTypeName: "array"
          }, {
            name: "defaultRendererArrayProperty",
            displayLabel: "Array property (default renderer)",
            typename: "array",
            renderer: {
              name: "defaultRendererPropertyRenderer"
            }
          }), new PropertyRecord({
            valueFormat: PropertyValueFormat.Array,
            items: arrayMembers,
            itemsTypeName: "array"
          }, {
            name: "customRendererArrayPropertyRenderer",
            displayLabel: "Array property (custom renderer)",
            typename: "struct",
            renderer: {
              name: "customRendererArrayPropertyRenderer"
            }
          })]
        }
      }),
      onDataChanged: new PropertyDataChangeEvent()
    }
  }
};
const NestedCategories = {
  args: {
    orientation: Orientation$1.Horizontal,
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [{
          name: "category1",
          label: "Category 1",
          expand: true,
          childCategories: [{
            name: "category11",
            label: "Category 1-1",
            expand: true,
            childCategories: [{
              name: "category111",
              label: "Category 1-1-1",
              expand: true
            }, {
              name: "category112",
              label: "Category 1-1-2",
              expand: true
            }]
          }, {
            name: "category12",
            label: "Category 1-2",
            expand: true
          }]
        }, {
          name: "category2",
          label: "Category 2",
          expand: true,
          childCategories: [{
            name: "category21",
            label: "Category 2-1",
            expand: true,
            childCategories: [{
              name: "category211",
              label: "Category 2-1-1",
              expand: true
            }, {
              name: "category212",
              label: "Category 2-1-2",
              expand: true
            }]
          }, {
            name: "category22",
            label: "Category 2-2",
            expand: true
          }]
        }],
        records: {
          category1: createDefaultRecords(),
          category11: createDefaultRecords(),
          category111: createDefaultRecords(),
          category112: createDefaultRecords(),
          category12: createDefaultRecords(),
          category2: createDefaultRecords(),
          category21: createDefaultRecords(),
          category211: createDefaultRecords(),
          category212: createDefaultRecords(),
          category22: createDefaultRecords()
        }
      }),
      onDataChanged: new PropertyDataChangeEvent()
    }
  }
};
const Links = {
  args: {
    dataProvider: {
      getData: async () => ({
        label: PropertyRecord.fromString("Record 1"),
        categories: [{
          name: "Group_1",
          label: "Group 1",
          expand: true
        }],
        records: {
          Group_1: [PropertyRecord.fromString("https://www.bentley.com"), PropertyRecord.fromString("pw://test")]
        }
      }),
      onDataChanged: new PropertyDataChangeEvent()
    },
    onPropertyContextMenu: void 0
  }
};
rendererManager.registerRenderer("customRendererStructPropertyRenderer", {
  canRender: () => true,
  render: (record) => {
    const entries = Object.entries(record.value.members);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", {
      children: entries.map((entry) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", {
          children: [entry[0], " = ", entry[1].value.displayValue]
        }, entry[0]);
      })
    });
  }
});
rendererManager.registerRenderer("customRendererArrayPropertyRenderer", {
  canRender: () => true,
  render: (record) => {
    const items = record.value.items;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("ol", {
      children: items.map((item, index) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", {
          children: item.value.displayValue
        }, index);
      })
    });
  }
});
rendererManager.registerRenderer("defaultRendererPropertyRenderer", {
  canRender: () => false,
  render: () => {
  }
});
rendererManager.registerRenderer("multiline", new MultilineTextPropertyValueRenderer());
const structMembers = {
  member1: PropertyRecord.fromString("Value 1", "Member 1"),
  member2: PropertyRecord.fromString("Value 2", "Member 2"),
  member3: PropertyRecord.fromString("Value 3", "Member 3")
};
const arrayMembers = [PropertyRecord.fromString("Value 1", "Item 1"), PropertyRecord.fromString("Value 2", "Item 2"), PropertyRecord.fromString("Value 3", "Item 3")];
const multilineString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n";
function createDefaultRecords() {
  return [new PropertyRecord({
    valueFormat: PropertyValueFormat.Primitive,
    value: "string value"
  }, {
    name: "stringProperty",
    displayLabel: "String property",
    typename: "string"
  }), new PropertyRecord({
    valueFormat: PropertyValueFormat.Primitive,
    value: 123
  }, {
    name: "intProperty",
    displayLabel: "Int property",
    typename: "int"
  }), new PropertyRecord({
    valueFormat: PropertyValueFormat.Primitive,
    value: 123.456
  }, {
    name: "doubleProperty",
    displayLabel: "DoubleProperty",
    typename: "double"
  })];
}
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...(_a2 = Basic.parameters) == null ? void 0 : _a2.docs,
    source: {
      originalSource: '{\n  args: {\n    dataProvider: {\n      getData: async () => ({\n        label: PropertyRecord.fromString("Record 1"),\n        categories: [{\n          name: "Group_1",\n          label: "Group 1",\n          expand: true\n        }, {\n          name: "Group_2",\n          label: "Group 2",\n          expand: false\n        }],\n        records: {\n          Group_1: [PropertyRecord.fromString("Record 1_1"), PropertyRecord.fromString("Record 1_2")],\n          Group_2: [PropertyRecord.fromString("Record 2_1"), PropertyRecord.fromString("Record 2_2")]\n        }\n      }),\n      onDataChanged: new PropertyDataChangeEvent()\n    },\n    onPropertyContextMenu: undefined\n  }\n}',
      ...(_c = (_b = Basic.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
StructRendering.parameters = {
  ...StructRendering.parameters,
  docs: {
    ...(_d = StructRendering.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {\n    orientation: Orientation.Vertical,\n    propertyValueRendererManager: rendererManager,\n    dataProvider: {\n      getData: async () => ({\n        label: PropertyRecord.fromString("Record 1"),\n        categories: [{\n          name: "structPropertyRendering",\n          label: "Struct property rendering",\n          expand: true\n        }],\n        records: {\n          structPropertyRendering: [new PropertyRecord({\n            valueFormat: PropertyValueFormat.Primitive,\n            value: "string value"\n          }, {\n            name: "simpleProperty",\n            displayLabel: "Simple property",\n            typename: "string"\n          }), new PropertyRecord({\n            valueFormat: PropertyValueFormat.Primitive,\n            value: multilineString\n          }, {\n            name: "multilineProperty",\n            displayLabel: "Multiline property",\n            typename: "string",\n            renderer: {\n              name: "multiline"\n            }\n          }), new PropertyRecord({\n            valueFormat: PropertyValueFormat.Primitive,\n            value: undefined\n          }, {\n            name: "noValueStruct",\n            displayLabel: "Struct property with no value",\n            typename: "struct"\n          }), new PropertyRecord({\n            valueFormat: PropertyValueFormat.Struct,\n            members: structMembers\n          }, {\n            name: "noRendererStructProperty",\n            displayLabel: "Struct property (no renderer)",\n            typename: "struct"\n          }), new PropertyRecord({\n            valueFormat: PropertyValueFormat.Struct,\n            members: structMembers\n          }, {\n            name: "defaultRendererStructProperty",\n            displayLabel: "Struct property (default renderer)",\n            typename: "struct",\n            renderer: {\n              name: "defaultRendererPropertyRenderer"\n            }\n          }), new PropertyRecord({\n            valueFormat: PropertyValueFormat.Struct,\n            members: structMembers\n          }, {\n            name: "customRendererStructProperty",\n            displayLabel: "Struct property (custom renderer)",\n            typename: "struct",\n            renderer: {\n              name: "customRendererStructPropertyRenderer"\n            }\n          })]\n        }\n      }),\n      onDataChanged: new PropertyDataChangeEvent()\n    }\n  }\n}',
      ...(_f = (_e = StructRendering.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
ArrayRendering.parameters = {
  ...ArrayRendering.parameters,
  docs: {
    ...(_g = ArrayRendering.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  args: {\n    orientation: Orientation.Horizontal,\n    propertyValueRendererManager: rendererManager,\n    dataProvider: {\n      getData: async () => ({\n        label: PropertyRecord.fromString("Record 1"),\n        categories: [{\n          name: "arrayPropertyRendering",\n          label: "Array property rendering",\n          expand: true\n        }],\n        records: {\n          arrayPropertyRendering: [new PropertyRecord({\n            valueFormat: PropertyValueFormat.Primitive,\n            value: "string value"\n          }, {\n            name: "simpleProperty",\n            displayLabel: "Simple property",\n            typename: "string"\n          }), new PropertyRecord({\n            valueFormat: PropertyValueFormat.Primitive,\n            value: multilineString\n          }, {\n            name: "multilineProperty",\n            displayLabel: "Multiline property",\n            typename: "string",\n            renderer: {\n              name: "multiline"\n            }\n          }), new PropertyRecord({\n            valueFormat: PropertyValueFormat.Array,\n            items: [],\n            itemsTypeName: "array"\n          }, {\n            name: "emptyArray",\n            displayLabel: "Array property with no items",\n            typename: "array"\n          }), new PropertyRecord({\n            valueFormat: PropertyValueFormat.Array,\n            items: arrayMembers,\n            itemsTypeName: "array"\n          }, {\n            name: "noRendererStructProperty",\n            displayLabel: "Array property (no renderer)",\n            typename: "array"\n          }), new PropertyRecord({\n            valueFormat: PropertyValueFormat.Array,\n            items: arrayMembers,\n            itemsTypeName: "array"\n          }, {\n            name: "defaultRendererArrayProperty",\n            displayLabel: "Array property (default renderer)",\n            typename: "array",\n            renderer: {\n              name: "defaultRendererPropertyRenderer"\n            }\n          }), new PropertyRecord({\n            valueFormat: PropertyValueFormat.Array,\n            items: arrayMembers,\n            itemsTypeName: "array"\n          }, {\n            name: "customRendererArrayPropertyRenderer",\n            displayLabel: "Array property (custom renderer)",\n            typename: "struct",\n            renderer: {\n              name: "customRendererArrayPropertyRenderer"\n            }\n          })]\n        }\n      }),\n      onDataChanged: new PropertyDataChangeEvent()\n    }\n  }\n}',
      ...(_i = (_h = ArrayRendering.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
NestedCategories.parameters = {
  ...NestedCategories.parameters,
  docs: {
    ...(_j = NestedCategories.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    orientation: Orientation.Horizontal,\n    dataProvider: {\n      getData: async () => ({\n        label: PropertyRecord.fromString("Record 1"),\n        categories: [{\n          name: "category1",\n          label: "Category 1",\n          expand: true,\n          childCategories: [{\n            name: "category11",\n            label: "Category 1-1",\n            expand: true,\n            childCategories: [{\n              name: "category111",\n              label: "Category 1-1-1",\n              expand: true\n            }, {\n              name: "category112",\n              label: "Category 1-1-2",\n              expand: true\n            }]\n          }, {\n            name: "category12",\n            label: "Category 1-2",\n            expand: true\n          }]\n        }, {\n          name: "category2",\n          label: "Category 2",\n          expand: true,\n          childCategories: [{\n            name: "category21",\n            label: "Category 2-1",\n            expand: true,\n            childCategories: [{\n              name: "category211",\n              label: "Category 2-1-1",\n              expand: true\n            }, {\n              name: "category212",\n              label: "Category 2-1-2",\n              expand: true\n            }]\n          }, {\n            name: "category22",\n            label: "Category 2-2",\n            expand: true\n          }]\n        }],\n        records: {\n          category1: createDefaultRecords(),\n          category11: createDefaultRecords(),\n          category111: createDefaultRecords(),\n          category112: createDefaultRecords(),\n          category12: createDefaultRecords(),\n          category2: createDefaultRecords(),\n          category21: createDefaultRecords(),\n          category211: createDefaultRecords(),\n          category212: createDefaultRecords(),\n          category22: createDefaultRecords()\n        }\n      }),\n      onDataChanged: new PropertyDataChangeEvent()\n    }\n  }\n}',
      ...(_l = (_k = NestedCategories.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
Links.parameters = {
  ...Links.parameters,
  docs: {
    ...(_m = Links.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: '{\n  args: {\n    dataProvider: {\n      getData: async () => ({\n        label: PropertyRecord.fromString("Record 1"),\n        categories: [{\n          name: "Group_1",\n          label: "Group 1",\n          expand: true\n        }],\n        records: {\n          Group_1: [PropertyRecord.fromString("https://www.bentley.com"), PropertyRecord.fromString("pw://test")]\n        }\n      }),\n      onDataChanged: new PropertyDataChangeEvent()\n    },\n    onPropertyContextMenu: undefined\n  }\n}',
      ...(_o = (_n = Links.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
const __namedExportsOrder = ["Basic", "StructRendering", "ArrayRendering", "NestedCategories", "Links"];
export {
  ArrayRendering,
  Basic,
  Links,
  NestedCategories,
  StructRendering,
  __namedExportsOrder,
  meta as default
};
