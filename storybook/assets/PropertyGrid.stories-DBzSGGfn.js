var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
import { j as jsxRuntimeExports } from "./jsx-runtime-CC5-Dj7Q.js";
import { e as PropertyValueFormat, A as AlternateDateFormats, m as TimeDisplay, L as Logger, n as Id64, S as StandardTypeNames, K as Key_enum, c as classnames, o as PropertyEditorParamTypes, U as UiAdmin, M as MessageSeverity, R as RelativePosition, B as Button, l as PropertyRecord, p as BentleyError, q as BentleyStatus, I as IconButton, i as BeEvent, G as Guid, r as assert, d as ProgressRadial, s as StandardEditorNames } from "./Dialog-CEvMa41g.js";
import { U as UiComponents$1, I as ImageRenderer } from "./ImageRenderer-Dnj8khNw.js";
import { r as reactExports, R as React } from "./index-DDLqOySG.js";
import { cb as LinkifyIt, cc as Orientation$1, cd as TimeFormat$1, bO as from, bR as mergeMap, bS as observeOn, bT as subscribeOn, ay as usePackageTranslation, j as Icon, ce as SvgChevronLeft, cf as SvgChevronRight, $ as Input, cg as IconInput, aL as Checkbox, p as placeholderSvg, al as Select, ch as SvgChevronDown, ci as Popup, cj as ImageCheckBox, ck as NumberInput, cl as Div, bd as SvgCheckmark, z as SvgRemove, at as Slider, cm as Textarea, cn as ToggleSwitch, co as ElementSeparator, cp as UnderlinedButton, aV as SvgSearch, aW as SvgClose, b as MenuItem, cq as ComboBox, ai as Flex, ao as Text, y as SvgAdd, cr as SvgDelete, aM as SvgStatusError, cs as Anchor, Q as UiError, ct as DRAFTABLE, cu as Geometry, V as ExpandableBlock, cv as VariableSizeList, cw as areEqual, bW as produce, cx as useTargeted, bz as Observable, cy as TreeNodePlaceholder, cz as TreeNode, cA as Tree, c5 as concat, cB as timer } from "./appui-react-DXa87bBS.js";
import "./client-D6MDPju-.js";
import { S as Subject, t as tap, q as queueScheduler, a as asapScheduler, o as onErrorResumeNextWith, d as defer, c as connectable, i as iif, E as EMPTY, f as finalize, s as share } from "./tap-DoLZ4_UW.js";
import { A as AppUiDecorator } from "./Decorators-aDkAb0Lg.js";
import "./iframe-B83tQhF-.js";
import "../sb-preview/runtime.js";
import "./index-BwI9SQDf.js";
import "./inheritsLoose-HEqISCW8.js";
import "./_commonjs-dynamic-modules-DTCOR0lh.js";
import "./index-BZqLgkBR.js";
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
    if (props.searchText) return /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightedText, { text, ...props });
    return text;
  }
};
_HighlightingEngine.ACTIVE_CLASS_NAME = "components-activehighlight";
let HighlightingEngine = _HighlightingEngine;
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
HighlightedText.__docgenInfo = { "description": "Highlighted text\nUsed for highlighting parts in the 'text' which match with 'searchText'\nAlso actively highlights one matched part which is selected with 'activeMatchIndex'\n@public", "methods": [], "displayName": "HighlightedText", "props": { "searchText": { "required": true, "tsType": { "name": "string" }, "description": "" }, "activeMatchIndex": { "required": false, "tsType": { "name": "number" }, "description": "" }, "text": { "required": true, "tsType": { "name": "string" }, "description": "" }, "caseSensitive": { "required": false, "tsType": { "name": "boolean" }, "description": "Should search be case sensitive" } } };
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
      if (matches !== null) return matches[0].length;
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
      if (matches !== null) return matches[0].length;
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
function isPromiseLike(obj) {
  return typeof obj === "object" && typeof obj.then === "function";
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
    if (value === void 0) return "";
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
    if (!this.checkArgTypes(valueA, valueB)) return 0;
    if (ignoreCase)
      return valueA.toLocaleLowerCase().localeCompare(valueB.toLocaleLowerCase());
    else return valueA.localeCompare(valueB);
  }
  get isStringType() {
    return true;
  }
  startsWith(valueA, valueB, caseSensitive) {
    if (!valueA || !valueB || !this.checkArgTypes(valueA, valueB)) return false;
    if (caseSensitive) return valueA.substring(0, valueB.length) === valueB;
    return valueA.toLocaleUpperCase().substring(0, valueB.length) === valueB.toLocaleUpperCase();
  }
  endsWith(valueA, valueB, caseSensitive) {
    if (!valueA || !valueB || !this.checkArgTypes(valueA, valueB)) return false;
    const position = valueA.length - valueB.length;
    if (position < 0) return false;
    let lastIndex;
    if (caseSensitive) lastIndex = valueA.indexOf(valueB, position);
    else
      lastIndex = valueA.toLocaleUpperCase().indexOf(valueB.toLocaleUpperCase(), position);
    return lastIndex !== -1 && lastIndex === position;
  }
  contains(valueA, valueB, caseSensitive) {
    if (!valueA || !valueB || !this.checkArgTypes(valueA, valueB)) return false;
    if (valueB.length > valueA.length) return false;
    if (caseSensitive) return valueA.indexOf(valueB, 0) !== -1;
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
    if (!this.checkArgTypes(valueA)) return true;
    return valueA.length === 0;
  }
  isNotEmpty(valueA) {
    return !this.isEmpty(valueA);
  }
  checkArgTypes(valueA, valueB) {
    if (typeof valueA !== "string") return false;
    if (valueB && typeof valueB !== "string") return false;
    return true;
  }
}
const _TypeConverterManager = class _TypeConverterManager {
  static getFullConverterName(typename, converterName) {
    let fullConverterName = typename;
    if (converterName) fullConverterName += `:${converterName}`;
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
const _BooleanTypeConverter = class _BooleanTypeConverter extends TypeConverter {
  /** @internal */
  static getLocalizedTrueFalse() {
    if (!_BooleanTypeConverter.sl10nTrue)
      _BooleanTypeConverter.sl10nTrue = UiComponents$1.translate("general.true");
    if (!_BooleanTypeConverter.sl10nFalse)
      _BooleanTypeConverter.sl10nFalse = UiComponents$1.translate("general.false");
  }
  convertToString(value) {
    if (value === void 0) return "";
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
    if (!!a === !!b) return 0;
    if (!!a && !b) return 1;
    return -1;
  }
  get isBooleanType() {
    return true;
  }
};
_BooleanTypeConverter.sl10nTrue = "";
_BooleanTypeConverter.sl10nFalse = "";
let BooleanTypeConverter = _BooleanTypeConverter;
function formatInputDate(inputDate, timeDisplay, customFormatter, alternateDateFormat) {
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
          if (timeString === "24:00") timeString = "00:00";
          break;
        case TimeDisplay.H24MS:
          timeString = inputDate.toLocaleTimeString(void 0, {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });
          if (timeString === "24:00:00") timeString = "00:00:00";
          break;
      }
    }
    return timeString.length ? `${dateString}, ${timeString}` : dateString;
  }
}
class DateTimeTypeConverterBase extends TypeConverter {
  convertToString(value) {
    if (value === void 0) return "";
    if (typeof value === "string") value = new Date(value);
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
    if (value === void 0) return "";
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
              UiComponents$1.loggerCategory("DateTimeTypeConverterBase"),
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
        if (formattedDateTime) return formattedDateTime;
      }
    }
    return this.convertToString(value);
  }
  /** Default implementation just calls convertFromString with no options */
  convertFromStringWithOptions(value, options) {
    if (!value) return void 0;
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
    if (!value) return void 0;
    const dateValue = new Date(value);
    if (!this.isDateValid(dateValue)) return void 0;
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
class DateTimeTypeConverter extends DateTimeTypeConverterBase {
  getTimeFormat() {
    return TimeFormat.Long;
  }
}
class EnumTypeConverter extends TypeConverter {
  convertPropertyToString(propertyDescription, value) {
    if (value === void 0) return "";
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
    if (-1 !== pos) return choices[pos].label;
    return this.convertToString(value);
  }
  getPosition(choices, value) {
    for (let i = 0; i < choices.length; ++i) {
      if (choices[i].value === value) return i;
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
class HexadecimalTypeConverter extends TypeConverter {
  convertToString(value) {
    if (value === void 0) return "";
    const hexString = value.toString();
    return `0x${hexString.substring(2, hexString.length).toUpperCase()}`;
  }
  convertFromString(value) {
    if (value.substring(0, 2) !== "0x") value = `0x${value}`;
    value = Id64.fromString(value);
    if (Id64.isValidId64(value)) return value;
    return void 0;
  }
  sortCompare(a, b) {
    a = Id64.fromString(a);
    b = Id64.fromString(b);
    if (a === b) return 0;
    if (a > b) return 1;
    return -1;
  }
}
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
    if (value === void 0) return "";
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
    if (stringValue.indexOf(".") === -1) stringValue += ".0";
    return stringValue;
  }
  convertFromString(value) {
    return FloatTypeConverter.parseString(value);
  }
}
class IntTypeConverter extends NumericTypeConverterBase {
  static parseString(value) {
    const parsedValue = parseInt(value, 10);
    return Number.isNaN(parsedValue) ? void 0 : parsedValue;
  }
  convertToString(value) {
    if (value === void 0) return "";
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
class BasePointTypeConverter extends TypeConverter {
  constructor(componentConverterName = StandardTypeNames.Double) {
    super();
    this.componentConverterName = componentConverterName;
  }
  formatValue(value) {
    if (typeof value === "string") value = parseFloat(value);
    return TypeConverterManager.getConverter(
      this.componentConverterName
    ).convertToString(value);
  }
  convertToString(value) {
    if (!value) return "";
    let components = new Array();
    if (Array.isArray(value)) {
      if (value.length === 0) return "";
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
    if (aLength === bLength) return 0;
    if (aLength === void 0) return -1;
    if (bLength === void 0) return 1;
    return aLength - bLength;
  }
}
class Point2dTypeConverter extends BasePointTypeConverter {
  constructor(componentConverterName) {
    super(componentConverterName);
  }
  getVectorLength(point) {
    const derivedPoint = this.constructPoint(point);
    if (derivedPoint === void 0) return void 0;
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
class Point3dTypeConverter extends BasePointTypeConverter {
  constructor(componentConverterName) {
    super(componentConverterName);
  }
  getVectorLength(point) {
    const derivedPoint = this.constructPoint(point);
    if (derivedPoint === void 0) return void 0;
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
class CompositeTypeConverter extends TypeConverter {
  convertToString(value) {
    if (value === void 0) return "";
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
      if (compareResult !== 0) return compareResult;
      if (i === 0 && separatorComparison !== 0) return separatorComparison;
    }
    if (valueA.parts.length !== valueB.parts.length)
      return valueA.parts.length - valueB.parts.length;
    return 0;
  }
}
const compareStrings = (lhs, rhs, ignoreCase) => {
  if (ignoreCase)
    return lhs.toLocaleLowerCase().localeCompare(rhs.toLocaleLowerCase());
  else return lhs.localeCompare(rhs);
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
    if (0 === offsetToFirst) offsetToFirst = 7;
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
        if (focusedDayIndex + 7 > 41) setFocusedDay(days2[focusedDayIndex % 7]);
        else setFocusedDay(days2[focusedDayIndex + 7]);
        event.preventDefault();
      }
      if (event.key === Key_enum.Key.ArrowUp.valueOf()) {
        const focusedDayIndex = days2.findIndex(
          (day) => isSameDay(day, focusedDay)
        );
        if (focusedDayIndex - 7 < 0)
          setFocusedDay(days2[focusedDayIndex % 7 + 35]);
        else setFocusedDay(days2[focusedDayIndex - 7]);
        event.preventDefault();
      }
      if (event.key === Key_enum.Key.ArrowLeft.valueOf()) {
        const focusedDayIndex = days2.findIndex(
          (day) => isSameDay(day, focusedDay)
        );
        if (focusedDayIndex - 1 >= 0) setFocusedDay(days2[focusedDayIndex - 1]);
        event.preventDefault();
      }
      if (event.key === Key_enum.Key.ArrowRight.valueOf()) {
        const focusedDayIndex = days2.findIndex(
          (day) => isSameDay(day, focusedDay)
        );
        if (focusedDayIndex + 1 <= 41) setFocusedDay(days2[focusedDayIndex + 1]);
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
DatePicker.__docgenInfo = { "description": "DatePicker component. Show a month selector and a day calendar to select a specific date.\n@alpha\n@deprecated in 4.11.0. Use {@link https://itwinui.bentley.com/docs/datepicker iTwinUI date picker} instead.", "methods": [], "displayName": "DatePicker", "props": { "selected": { "required": true, "tsType": { "name": "Date" }, "description": "defines both date and time" }, "onDateChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(day: Date) => void", "signature": { "arguments": [{ "type": { "name": "Date" }, "name": "day" }], "return": { "name": "void" } } }, "description": "function to call when date or time has changed" }, "showFocusOutline": { "required": false, "tsType": { "name": "boolean" }, "description": "show focus outlines, useful for keyboard navigation" } } };
function getValidInt(intText, min, max, defaultValue) {
  try {
    const newValue = parseInt(intText, 10);
    if (newValue >= min && newValue <= max) return newValue;
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
        if (newHours < 0) newHours = 24;
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
TimeField.__docgenInfo = { "description": "Field used to set the Hour:Minutes:Seconds in the [[DatePicker]] Popup panel. The user may key-in the value or use up/down keys to\nchange the time.\n@internal", "methods": [], "displayName": "TimeField", "props": { "time": { "required": true, "tsType": { "name": "TimeSpec" }, "description": "" }, "timeDisplay": { "required": true, "tsType": { "name": "TimeDisplay" }, "description": "" }, "onTimeChange": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(time: TimeSpec) => void", "signature": { "arguments": [{ "type": { "name": "TimeSpec" }, "name": "time" }], "return": { "name": "void" } } }, "description": "" }, "readOnly": { "required": false, "tsType": { "name": "boolean" }, "description": "" } } };
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
        if (editorSizeParams.size) size = editorSizeParams.size;
        if (editorSizeParams.maxLength) maxLength = editorSizeParams.maxLength;
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
TextEditor.__docgenInfo = { "description": "TextEditor React component that is a property editor with text input\n@public", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }], "displayName": "TextEditor" };
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
    if (editorName) fullEditorName += `:${editorName}`;
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
    else editor2 = new BasicPropertyEditor();
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
    if (this._isMounted) this.setState({ checkboxValue, isDisabled });
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
BooleanEditor.__docgenInfo = { "description": "BooleanEditor React component that is a property editor with checkbox input\n@public", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }], "displayName": "BooleanEditor" };
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
          if (this.props.onCancel) this.props.onCancel();
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
    if (!this.props.setFocus) return false;
    const record = this.props.propertyRecord;
    const disabled = record && !record.isDisabled ? false : true;
    const readonly = record && !record.isReadonly ? false : true;
    return !disabled && !readonly;
  }
  _applyUpdatedValue(userInput) {
    const record = this.props.propertyRecord;
    const readonly = record && !record.isReadonly ? false : true;
    const disabled = record && !record.isDisabled ? false : true;
    if (readonly || disabled) return;
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
        UiComponents$1.loggerCategory("CustomNumberEditor"),
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
        UiComponents$1.loggerCategory("CustomNumberEditor"),
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
        if (editorSizeParams.size) size = editorSizeParams.size;
        if (editorSizeParams.maxLength) maxLength = editorSizeParams.maxLength;
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
    if (!record || !this._formatParams) return null;
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
CustomNumberEditor.__docgenInfo = { "description": "CustomNumberEditor is a React component that is a property editor for numbers that specify custom formatting and parsing functions.\n@alpha", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }], "displayName": "CustomNumberEditor" };
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
    if (newValue === void 0) return;
    void commit({
      propertyRecord,
      newValue
    });
  };
  const onPressEscape = (e) => {
    var _a3;
    if (!((_a3 = propertyEditorRef.current) == null ? void 0 : _a3.containerHandlesEscape)) return;
    e.stopPropagation();
    onCancel();
  };
  const onPressEnter = (e) => {
    var _a3, _b2;
    if (!((_a3 = propertyEditorRef.current) == null ? void 0 : _a3.containerHandlesEnter)) return;
    if ((_b2 = editorRef == null ? void 0 : editorRef.current) == null ? void 0 : _b2.hasFocus) e.stopPropagation();
    void handleContainerCommit();
  };
  const onPressTab = (e) => {
    var _a3;
    if (!((_a3 = propertyEditorRef.current) == null ? void 0 : _a3.containerHandlesTab)) return;
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
    if (ignoreEditorBlur) return;
    if (!((_a3 = propertyEditorRef.current) == null ? void 0 : _a3.containerHandlesBlur)) return;
    void handleContainerCommit();
  };
  const isNewValueValid = async (value) => {
    if (!propertyEditorRef.current) return false;
    if (!propertyRecord) return false;
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
    if (!errorMessage) return;
    if (!editorRef) return;
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
    if (!isValid) return;
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
EditorContainer.__docgenInfo = { "description": "EditorContainer React component used by the Tree and PropertyGrid for cell editing.\n@public", "methods": [], "displayName": "EditorContainer", "props": { "propertyRecord": { "required": true, "tsType": { "name": "PropertyRecord" }, "description": "The property being updated." }, "title": { "required": false, "tsType": { "name": "string" }, "description": "Tooltip text" }, "onCommit": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(args: PropertyUpdatedArgs) => void", "signature": { "arguments": [{ "type": { "name": "PropertyUpdatedArgs" }, "name": "args" }], "return": { "name": "void" } } }, "description": "Handler for commit" }, "onCancel": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Handler for cancel" }, "setFocus": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the Property Editor should set focus" }, "ignoreEditorBlur": { "required": false, "tsType": { "name": "boolean" }, "description": "@internal" }, "shouldCommitOnChange": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether value change should call onCommit().\n@internal" } }, "composes": ["CommonProps"] };
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
EnumButtonGroupEditor.__docgenInfo = { "description": "EnumButtonGroupEditor React component that is a property editor with select input\n@public", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }], "displayName": "EnumButtonGroupEditor" };
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
        if (this.state.valueIsNumber) selectValue = parseInt(newValue, 10);
        else selectValue = newValue;
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
            if (!this.props.setFocus) return;
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
EnumEditor.__docgenInfo = { "description": "EnumEditor React component that is a property editor with select input\n@public", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }], "displayName": "EnumEditor" };
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
      if (onClick) onClick();
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
      if (this.props.readonly) return;
      this.setState((prevState) => ({ showPopup: !prevState.showPopup }));
    };
    this._closePopup = () => {
      this.setState({ showPopup: false });
    };
    this._handleIconPicked = (icon) => {
      this.setState({ showPopup: false, icon }, () => {
        if (this.props.onIconChange) this.props.onIconChange(icon);
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
IconPickerButton.__docgenInfo = { "description": "IconPickerButton component\n@internal", "methods": [], "displayName": "IconPickerButton", "props": { "icon": { "required": true, "tsType": { "name": "string" }, "description": "active string" }, "icons": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "string" }], "raw": "string[]" }, "description": "available icons" }, "onIconChange": { "required": false, "tsType": { "name": "union", "raw": "((icon: string) => void) | undefined", "elements": [{ "name": "unknown" }, { "name": "undefined" }] }, "description": "function to run when user selects icon" }, "disabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Disabled or not" }, "readonly": { "required": false, "tsType": { "name": "boolean" }, "description": "Readonly or not" }, "dropDownTitle": { "required": false, "tsType": { "name": "string" }, "description": "Title to show at top of DropDown" }, "numColumns": { "required": false, "tsType": { "name": "number" }, "description": "Number of columns", "defaultValue": { "value": "4", "computed": false } } }, "composes": ["CommonProps"] };
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
        if (iconParams.iconValue) icon = iconParams.iconValue;
        if (iconParams.numColumns) numColumns = iconParams.numColumns;
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
IconEditor.__docgenInfo = { "description": "IconEditor React component that is a property editor with button and popup\n@alpha", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }], "displayName": "IconEditor" };
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
ImageCheckBoxEditor.__docgenInfo = { "description": "[[ImageCheckBoxEditor]]\nBoolean editor that renders with an image instead of checkbox\n@public", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }], "displayName": "ImageCheckBoxEditor" };
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
        if (editorSizeParams.size) size = editorSizeParams.size;
        if (editorSizeParams.maxLength) maxLength = editorSizeParams.maxLength;
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
NumericInputEditor.__docgenInfo = { "description": "NumericInputEditor React component that is a property editor with numeric input & up/down buttons\n@public", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }], "displayName": "NumericInputEditor" };
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
        if (this._buttonRef.current) this._buttonRef.current.focus();
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
PopupButton.__docgenInfo = { "description": "PopupButton React component that is a button and property editor popup host\n@alpha", "methods": [{ "name": "closePopup", "docblock": null, "modifiers": [], "params": [], "returns": null }], "displayName": "PopupButton", "props": { "label": { "required": false, "tsType": { "name": "union", "raw": "string | React.ReactNode", "elements": [{ "name": "string" }, { "name": "ReactReactNode", "raw": "React.ReactNode" }] }, "description": "Label to display in click area." }, "placeholder": { "required": false, "tsType": { "name": "string" }, "description": "" }, "children": { "required": true, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Contents of the popup" }, "title": { "required": false, "tsType": { "name": "string" }, "description": "Title to display as tooltip." }, "moveFocus": { "required": false, "tsType": { "name": "boolean" }, "description": "Set focus to popup - default is to set focus" }, "focusTarget": { "required": false, "tsType": { "name": "union", "raw": "React.RefObject<HTMLElement> | string", "elements": [{ "name": "ReactRefObject", "raw": "React.RefObject<HTMLElement>", "elements": [{ "name": "HTMLElement" }] }, { "name": "string" }] }, "description": "Element to receive focus, specified by React.RefObject or CSS selector string. If undefined and moveFocus is true then focus is moved to first focusable element." }, "showShadow": { "required": false, "tsType": { "name": "boolean" }, "description": "Show or hide the box shadow (defaults to false)" }, "showArrow": { "required": false, "tsType": { "name": "boolean" }, "description": "Show or hide the arrow (defaults to false)" }, "setFocus": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether to set focus to the input element" }, "closeOnEnter": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether to close the popup when Enter is pressed (defaults to true)" }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(event: React.MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent" }, "name": "event" }], "return": { "name": "void" } } }, "description": "Listens for click events on button area" }, "onClose": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Listens for popup close events" }, "onEnter": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Listens for Enter key in popup" } }, "composes": ["CommonProps"] };
PopupContent.__docgenInfo = { "description": "Popup content with padding\n@alpha", "methods": [], "displayName": "PopupContent" };
PopupOkCancelButtons.__docgenInfo = { "description": "OK/Cancel Buttons\n@alpha", "methods": [], "displayName": "PopupOkCancelButtons", "props": { "onOk": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(event: React.MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent" }, "name": "event" }], "return": { "name": "void" } } }, "description": "" }, "onCancel": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(event: React.MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent" }, "name": "event" }], "return": { "name": "void" } } }, "description": "" } } };
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
      if (Number.isInteger(step)) return value.toFixed(0);
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
        if (this.props.onCancel) this.props.onCancel();
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
SliderEditor.__docgenInfo = { "description": "SliderEditor React component that is a property editor with numeric input & up/down buttons\n@public", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }], "displayName": "SliderEditor" };
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
        if (editorSizeParams.size) size = editorSizeParams.size;
        if (editorSizeParams.maxLength) maxLength = editorSizeParams.maxLength;
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
TextareaEditor.__docgenInfo = { "description": "TextareaEditor React component that is a property editor with text input\n@public", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }], "displayName": "TextareaEditor" };
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
    if (this._isMounted) this.setState({ toggleValue, isDisabled });
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
ToggleEditor.__docgenInfo = { "description": "ToggleEditor React component that is a property editor with checkbox input\n@public", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }], "displayName": "ToggleEditor" };
function countMatchesInString(str, lookup) {
  if (!str.length || !lookup.length) return 0;
  let n = 0, pos = 0;
  const step = lookup.length;
  while (true) {
    pos = str.indexOf(lookup, pos);
    if (pos >= 0) {
      ++n;
      pos += step;
    } else break;
  }
  return n;
}
class CommonPropertyRenderer {
  static getLabelOffset(indentation, orientation, width, columnRatio, minColumnLabelWidth) {
    if (!indentation) return 0;
    const maxIndent = 17;
    const minIndent = 6;
    if (orientation !== Orientation.Horizontal || !width || !columnRatio || !minColumnLabelWidth)
      return indentation * maxIndent;
    const currentSize = Math.ceil(width * columnRatio);
    const shrinkThreshold = minColumnLabelWidth + maxIndent * indentation;
    if (currentSize >= shrinkThreshold) return indentation * maxIndent;
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
PropertyLabelRenderer.__docgenInfo = { "description": "@internal", "methods": [{ "name": "getStyle", "docblock": "Get React CSS style object based on provided offset from the left side", "modifiers": ["static"], "params": [{ "name": "offset", "optional": true, "type": { "name": "number" } }], "returns": { "type": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" } }, "description": "Get React CSS style object based on provided offset from the left side" }], "displayName": "PropertyLabelRenderer", "props": { "children": { "required": true, "tsType": { "name": "union", "raw": "string | React.ReactElement", "elements": [{ "name": "string" }, { "name": "ReactReactElement", "raw": "React.ReactElement" }] }, "description": "Label to be rendered" }, "renderColon": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether to render a colon after the label" }, "tooltip": { "required": false, "tsType": { "name": "string" }, "description": "Custom tooltip for the component." } } };
class NonPrimitivePropertyLabelRenderer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._onClick = () => {
      if (this.props.isExpanded) this.props.onCollapse();
      else this.props.onExpand();
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
NonPrimitivePropertyLabelRenderer.__docgenInfo = { "description": "A React component that renders a non-primitive property label.\nIt renders an animated arrow with text which expands when label is clicked.\n@public", "methods": [], "displayName": "NonPrimitivePropertyLabelRenderer", "props": { "isExpanded": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "onExpand": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "onCollapse": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" } }, "composes": ["PrimitivePropertyLabelRendererProps"] };
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
PrimitivePropertyLabelRenderer.__docgenInfo = { "description": "A React component that renders a primitive property label\n@public", "methods": [], "displayName": "PrimitivePropertyLabelRenderer", "props": { "className": { "required": false, "tsType": { "name": "string" }, "description": "Additional class name for the label wrapper" }, "offset": { "required": false, "tsType": { "name": "number" }, "description": "Offset from the left side in pixels." } }, "composes": ["PropertyLabelRendererProps"] };
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
  if (!actionButton) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "components-action-button-container", children: actionButton });
}
ActionButtonList.__docgenInfo = { "description": "ActionButtonList React component.\n@public", "methods": [], "displayName": "ActionButtonList", "props": { "orientation": { "required": true, "tsType": { "name": "_Orientation" }, "description": "Orientation to use for displaying the action buttons" }, "property": { "required": true, "tsType": { "name": "PropertyRecord" }, "description": "Property that action buttons belong to" }, "actionButtonRenderers": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "ActionButtonRenderer" }], "raw": "ActionButtonRenderer[]" }, "description": "Array of action button renderers" }, "isPropertyHovered": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicated whether a property is hovered" } } };
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
      if (this.props.isHoverable) this.setState({ isHovered: true });
    };
    this._onMouseLeave = () => {
      if (this.props.isHoverable) this.setState({ isHovered: false });
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
    if (props.isSelected) propertyRecordClassName += " components--selected";
    if (props.onClick) propertyRecordClassName += " components--clickable";
    if (props.isHoverable) propertyRecordClassName += " components--hoverable";
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
PropertyView.__docgenInfo = { "description": "A React component that renders property as label/value pair\n@public", "methods": [], "displayName": "PropertyView", "props": { "labelElement": { "required": true, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Property label as a React element" }, "valueElement": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Property value as a React element" }, "valueElementRenderer": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => React.ReactNode", "signature": { "arguments": [], "return": { "name": "ReactReactNode", "raw": "React.ReactNode" } } }, "description": "Render callback for property value. If specified, `valueElement` is ignored" } }, "composes": ["SharedRendererProps"] };
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
CustomizablePropertyRenderer.__docgenInfo = { "description": "React Component that renders customizable properties\n@public", "methods": [], "displayName": "CustomizablePropertyRenderer", "props": { "valueElement": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Property value as a React element" }, "valueElementRenderer": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => React.ReactNode", "signature": { "arguments": [], "return": { "name": "ReactReactNode", "raw": "React.ReactNode" } } }, "description": "Render callback for property value. If specified, `valueElement` is ignored" }, "indentation": { "required": false, "tsType": { "name": "number" }, "description": "Multiplier of how much the property is indented to the right" }, "highlight": { "required": false, "tsType": { "name": "HighlightingComponentProps" }, "description": "Properties used for highlighting" } }, "composes": ["SharedRendererProps"] };
class PrimitivePropertyRenderer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomizablePropertyRenderer, { ...this.props });
  }
}
PrimitivePropertyRenderer.__docgenInfo = { "description": "React Component that renders primitive properties\n@public", "methods": [], "displayName": "PrimitivePropertyRenderer", "props": { "valueElement": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Property value as a React element" }, "valueElementRenderer": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => React.ReactNode", "signature": { "arguments": [], "return": { "name": "ReactReactNode", "raw": "React.ReactNode" } } }, "description": "Render callback for property value. If specified, `valueElement` is ignored" }, "indentation": { "required": false, "tsType": { "name": "number" }, "description": "Multiplier of how much the property is indented to the right" }, "highlight": { "required": false, "tsType": { "name": "HighlightingComponentProps" }, "description": "Properties used for highlighting" } }, "composes": ["SharedRendererProps"] };
const PropertyRenderer = (props) => {
  const { translate } = useTranslation();
  const [displayValue, setDisplayValue] = reactExports.useState(
    () => translate("general.loading")
  );
  const {
    isEditing,
    orientation,
    propertyRecord,
    indentation,
    propertyValueRendererManager,
    onEditCommit,
    onEditCancel,
    ...restProps
  } = props;
  const onCommit = reactExports.useCallback(
    (args) => {
      if (onEditCommit) onEditCommit(args);
    },
    [onEditCommit]
  );
  const onCancel = reactExports.useCallback(() => {
    if (onEditCancel) onEditCancel();
  }, [onEditCancel]);
  reactExports.useEffect(() => {
    if (isEditing) {
      setDisplayValue(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EditorContainer,
          {
            propertyRecord,
            onCommit,
            onCancel,
            setFocus: true
          }
        )
      );
      return;
    }
    setDisplayValue(
      CommonPropertyRenderer.createNewDisplayValue(
        orientation,
        propertyRecord,
        indentation,
        propertyValueRendererManager
      )
    );
  }, [
    orientation,
    propertyRecord,
    indentation,
    propertyValueRendererManager,
    onCommit,
    onCancel,
    isEditing
  ]);
  const primitiveRendererProps = {
    ...restProps,
    propertyRecord,
    orientation,
    indentation,
    valueElement: displayValue
  };
  switch (props.propertyRecord.value.valueFormat) {
    case PropertyValueFormat.Primitive:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PrimitivePropertyRenderer, { ...primitiveRendererProps });
    case PropertyValueFormat.Array:
      if (props.propertyRecord.value.valueFormat === PropertyValueFormat.Array && props.propertyRecord.value.items.length === 0)
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
};
PropertyRenderer.getLabelOffset = (indentation, orientation, width, columnRatio, minColumnLabelWidth) => {
  return CommonPropertyRenderer.getLabelOffset(
    indentation,
    orientation,
    width,
    columnRatio,
    minColumnLabelWidth
  );
};
PropertyRenderer.__docgenInfo = { "description": "A React component that renders properties\n@public", "methods": [{ "name": "getLabelOffset", "docblock": null, "modifiers": ["static"], "params": [{ "name": "indentation", "optional": true, "type": { "name": "number" } }, { "name": "orientation", "optional": true, "type": { "name": "_Orientation", "alias": "Orientation" } }, { "name": "width", "optional": true, "type": { "name": "number" } }, { "name": "columnRatio", "optional": true, "type": { "name": "number" } }, { "name": "minColumnLabelWidth", "optional": true, "type": { "name": "number" } }], "returns": null }], "displayName": "PropertyRenderer", "props": { "propertyRecord": { "required": true, "tsType": { "name": "PropertyRecord" }, "description": "PropertyRecord to render" }, "uniqueKey": { "required": false, "tsType": { "name": "string" }, "description": "Unique string, that identifies this property component. Should be used if onClick or onRightClick are provided" }, "orientation": { "required": true, "tsType": { "name": "_Orientation" }, "description": "Orientation to use for displaying the property" }, "isSelected": { "required": false, "tsType": { "name": "boolean" }, "description": "Controls component selection" }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(property: PropertyRecord, key?: string) => void", "signature": { "arguments": [{ "type": { "name": "PropertyRecord" }, "name": "property" }, { "type": { "name": "string" }, "name": "key" }], "return": { "name": "void" } } }, "description": "Called when property gets clicked. If undefined, clicking is disabled" }, "onRightClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(property: PropertyRecord, key?: string) => void", "signature": { "arguments": [{ "type": { "name": "PropertyRecord" }, "name": "property" }, { "type": { "name": "string" }, "name": "key" }], "return": { "name": "void" } } }, "description": "Called when property gets right clicked. If undefined, right clicking is not working" }, "onContextMenu": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(property: PropertyRecord, e: React.MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "PropertyRecord" }, "name": "property" }, { "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent" }, "name": "e" }], "return": { "name": "void" } } }, "description": "Called to show a context menu for properties" }, "columnRatio": { "required": false, "tsType": { "name": "number" }, "description": "Ratio between label and value cells" }, "onColumnRatioChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(ratio: number) => void | {\n  ratio: number;\n}", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "ratio" }], "return": { "name": "union", "raw": "void | {\n  ratio: number;\n}", "elements": [{ "name": "void" }, { "name": "signature", "type": "object", "raw": "{\n  ratio: number;\n}", "signature": { "properties": [{ "key": "ratio", "value": { "name": "number", "required": true } }] } }] } } }, "description": "Callback to column ratio changed event" }, "isHoverable": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates that properties have *hover* effect" }, "isSelectable": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates that properties can be selected" }, "width": { "required": false, "tsType": { "name": "number" }, "description": "Width of the whole property element" }, "actionButtonRenderers": { "required": false, "tsType": { "name": "Array", "elements": [{ "name": "ActionButtonRenderer" }], "raw": "ActionButtonRenderer[]" }, "description": "Array of action button renderers" }, "isResizeHandleHovered": { "required": false, "tsType": { "name": "boolean" }, "description": "Is resize handle hovered" }, "onResizeHandleHoverChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(isHovered: boolean) => void", "signature": { "arguments": [{ "type": { "name": "boolean" }, "name": "isHovered" }], "return": { "name": "void" } } }, "description": "Callback to hover event change" }, "isResizeHandleBeingDragged": { "required": false, "tsType": { "name": "boolean" }, "description": "Is resize handle being dragged" }, "onResizeHandleDragChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(isDragStarted: boolean) => void", "signature": { "arguments": [{ "type": { "name": "boolean" }, "name": "isDragStarted" }], "return": { "name": "void" } } }, "description": "Callback to drag event change" }, "columnInfo": { "required": false, "tsType": { "name": "PropertyGridColumnInfo" }, "description": "Information for styling property grid columns" }, "propertyValueRendererManager": { "required": false, "tsType": { "name": "PropertyValueRendererManager" }, "description": "Custom value renderer" }, "indentation": { "required": false, "tsType": { "name": "number" }, "description": "Multiplier of how much the property is indented to the right" }, "isEditing": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates property is being edited" }, "onEditCommit": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(args: PropertyUpdatedArgs) => void", "signature": { "arguments": [{ "type": { "name": "PropertyUpdatedArgs" }, "name": "args" }], "return": { "name": "void" } } }, "description": "Called when property edit is committed." }, "onEditCancel": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Called when property edit is cancelled." }, "highlight": { "required": false, "tsType": { "name": "HighlightingComponentProps" }, "description": "Props used for highlighting." } } };
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
NonPrimitivePropertyRenderer.__docgenInfo = { "description": "React Component that renders struct and array properties\n@public", "methods": [], "displayName": "NonPrimitivePropertyRenderer", "props": { "isCollapsible": { "required": false, "tsType": { "name": "boolean" }, "description": "Can struct/array property be collapsed" } }, "composes": ["PrimitiveRendererProps"] };
class TableNonPrimitiveValueRenderer extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    this._onClick = () => {
      if (!this.props.onDialogOpen) return;
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
TableNonPrimitiveValueRenderer.__docgenInfo = { "description": "A React component that renders non primitive values as a button with text.\nWhen clicked, a dialog appears that shows the value in greater detail.\n@public", "methods": [], "displayName": "TableNonPrimitiveValueRenderer", "props": { "onDialogOpen": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(dialogState: PropertyDialogState) => void", "signature": { "arguments": [{ "type": { "name": "PropertyDialogState" }, "name": "dialogState" }], "return": { "name": "void" } } }, "description": "Callback to request for dialog to be opened." }, "dialogTitle": { "required": true, "tsType": { "name": "string" }, "description": "Title of the dialog that shows property in more detail." }, "dialogContents": { "required": true, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Contents of the dialog. Should be the property record shown in more detail." }, "buttonLabel": { "required": true, "tsType": { "name": "string" }, "description": "Text that will be rendered in the table cell, in other words - Property value" } } };
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
TableArrayValueRenderer.__docgenInfo = { "description": "A react component which renders array property value as a button with text\n@public", "methods": [], "displayName": "TableArrayValueRenderer" };
const withContextStyle = (node, context) => {
  if (!context || !context.style) return node;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: context.style, children: node });
};
withContextStyle.__docgenInfo = { "description": "Wraps a React component with a span element with a given style attribute\n@public", "methods": [], "displayName": "withContextStyle" };
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
class MergedPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return !!record.isMerged && record.value.valueFormat === PropertyValueFormat.Primitive;
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(_record, context) {
    return withContextStyle(/* @__PURE__ */ jsxRuntimeExports.jsx(VariesRenderer, {}), context);
  }
}
function VariesRenderer() {
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: translate("property.varies") });
}
const _PropertyGridCommons = class _PropertyGridCommons {
  static getCurrentOrientation(width, preferredOrientation, isOrientationFixed, horizontalOrientationMinWidth) {
    const orientation = preferredOrientation ?? Orientation.Horizontal;
    if (isOrientationFixed) return orientation;
    horizontalOrientationMinWidth = horizontalOrientationMinWidth ?? 300;
    if (width < horizontalOrientationMinWidth) return Orientation.Vertical;
    return orientation;
  }
  /**
   * Helper method to handle link clicks
   * @internal
   */
  static handleLinkClick(text) {
    const linksArray = matchLinks(text);
    if (linksArray.length <= 0) return;
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
  if (matchA.start > matchB.start) return 1;
  if (matchB.start > matchA.start) return -1;
  return 0;
}
function renderTextPart(text, highlight) {
  return highlight ? highlight(text) : text;
}
function renderText(text, links, highlight) {
  const { matcher } = links;
  if (!matcher) return renderTag(text, links, highlight);
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
  if (links) return renderLinks(stringValue, links, highlight);
  if (highlight) return renderHighlighted(stringValue, highlight);
  return stringValue;
};
function LinksRenderer(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: withLinks(props.value, props.links, props.highlighter) });
}
renderLinks.__docgenInfo = { "description": "Renders anchor tag by wrapping or splitting provided text\n@public", "methods": [], "displayName": "renderLinks" };
withLinks.__docgenInfo = { "description": "If record has links, wraps stringValue in them, otherwise returns unchanged stringValue\nOptionally it can highlight text\n@public", "methods": [], "displayName": "withLinks" };
LinksRenderer.__docgenInfo = { "description": "React component for rendering string with links.\n@public", "methods": [], "displayName": "LinksRenderer", "props": { "value": { "required": true, "tsType": { "name": "string" }, "description": "" }, "links": { "required": false, "tsType": { "name": "LinkElementsInfo" }, "description": "" }, "highlighter": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(text: string) => React.ReactNode", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "text" }], "return": { "name": "ReactReactNode", "raw": "React.ReactNode" } } }, "description": "" } } };
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
PrimitivePropertyValueRendererImpl.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "PrimitivePropertyValueRendererImpl", "props": { "record": { "required": true, "tsType": { "name": "PropertyRecord" }, "description": "" }, "stringValueCalculator": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(record: PropertyRecord) => string | Promise<string>", "signature": { "arguments": [{ "type": { "name": "PropertyRecord" }, "name": "record" }], "return": { "name": "union", "raw": "string | Promise<string>", "elements": [{ "name": "string" }, { "name": "Promise", "elements": [{ "name": "string" }], "raw": "Promise<string>" }] } } }, "description": "" }, "context": { "required": false, "tsType": { "name": "PropertyValueRendererContext" }, "description": "" }, "linksHandler": { "required": false, "tsType": { "name": "LinkElementsInfo" }, "description": "" } } };
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
TableStructValueRenderer.__docgenInfo = { "description": "A react component which renders struct property value as a button with text\n@public", "methods": [], "displayName": "TableStructValueRenderer" };
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
    if (customRenderer) return customRenderer;
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
PropertyList.__docgenInfo = { "description": "A React component that renders multiple properties within a category as a list.\n@public", "methods": [], "displayName": "PropertyList", "props": { "orientation": { "required": true, "tsType": { "name": "_Orientation" }, "description": "" }, "width": { "required": true, "tsType": { "name": "number" }, "description": "" }, "category": { "required": false, "tsType": { "name": "PropertyCategory" }, "description": "" }, "properties": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "PropertyRecord" }], "raw": "PropertyRecord[]" }, "description": "" }, "selectedPropertyKey": { "required": false, "tsType": { "name": "string" }, "description": "" }, "onPropertyClicked": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(property: PropertyRecord, key?: string) => void", "signature": { "arguments": [{ "type": { "name": "PropertyRecord" }, "name": "property" }, { "type": { "name": "string" }, "name": "key" }], "return": { "name": "void" } } }, "description": "" }, "onPropertyRightClicked": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(property: PropertyRecord, key?: string) => void", "signature": { "arguments": [{ "type": { "name": "PropertyRecord" }, "name": "property" }, { "type": { "name": "string" }, "name": "key" }], "return": { "name": "void" } } }, "description": "" }, "onPropertyContextMenu": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(\n  property: PropertyRecord,\n  e: React.MouseEvent\n) => void", "signature": { "arguments": [{ "type": { "name": "PropertyRecord" }, "name": "property" }, { "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent" }, "name": "e" }], "return": { "name": "void" } } }, "description": "" }, "columnRatio": { "required": false, "tsType": { "name": "number" }, "description": "" }, "onColumnChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(ratio: number) => void | {\n  ratio: number;\n}", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "ratio" }], "return": { "name": "union", "raw": "void | {\n  ratio: number;\n}", "elements": [{ "name": "void" }, { "name": "signature", "type": "object", "raw": "{\n  ratio: number;\n}", "signature": { "properties": [{ "key": "ratio", "value": { "name": "number", "required": true } }] } }] } } }, "description": "Callback to column ratio changed event" }, "propertyValueRendererManager": { "required": false, "tsType": { "name": "PropertyValueRendererManager" }, "description": "" }, "editingPropertyKey": { "required": false, "tsType": { "name": "string" }, "description": "" }, "onEditCommit": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(\n  args: PropertyUpdatedArgs,\n  category: PropertyCategory\n) => void", "signature": { "arguments": [{ "type": { "name": "PropertyUpdatedArgs" }, "name": "args" }, { "type": { "name": "PropertyCategory" }, "name": "category" }], "return": { "name": "void" } } }, "description": "" }, "onEditCancel": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "isPropertyHoverEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property hovering effect" }, "isPropertySelectionEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property selection" }, "isPropertyRightClickSelectionEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property right click selection" }, "actionButtonRenderers": { "required": false, "tsType": { "name": "Array", "elements": [{ "name": "ActionButtonRenderer" }], "raw": "ActionButtonRenderer[]" }, "description": "Array of action button renderers" }, "isResizeHandleHovered": { "required": false, "tsType": { "name": "boolean" }, "description": "Is resize handle hovered" }, "onResizeHandleHoverChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(isHovered: boolean) => void", "signature": { "arguments": [{ "type": { "name": "boolean" }, "name": "isHovered" }], "return": { "name": "void" } } }, "description": "Callback to hover event change" }, "isResizeHandleBeingDragged": { "required": false, "tsType": { "name": "boolean" }, "description": "Is resize handle being dragged" }, "onResizeHandleDragChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(isDragStarted: boolean) => void", "signature": { "arguments": [{ "type": { "name": "boolean" }, "name": "isDragStarted" }], "return": { "name": "void" } } }, "description": "Callback to drag event change" }, "columnInfo": { "required": false, "tsType": { "name": "PropertyGridColumnInfo" }, "description": "Information for styling property grid columns" } }, "composes": ["CommonProps"] };
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
      else if (selectedId < 1) selectedId = 1;
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
      if (event.key === Key_enum.Key.Enter.valueOf()) this._onSelectedResultConfirmed();
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
ResultSelector.__docgenInfo = { "description": "Component for stepping through results/entries\n@public", "methods": [], "displayName": "ResultSelector", "props": { "resultCount": { "required": true, "tsType": { "name": "number" }, "description": "Total number of results/entries" }, "onSelectedChanged": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(index: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "index" }], "return": { "name": "void" } } }, "description": "Callback to currently selected result/entry change" } }, "composes": ["CommonProps"] };
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
      if (e.key !== Key_enum.Key.Enter.valueOf()) return;
      if (!this.state.searchText) return;
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
    if (this._inputElement.current) this._inputElement.current.focus();
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
FilteringInput.__docgenInfo = { "description": "A helper component for filtering trees and stepping through results\n@public", "methods": [], "displayName": "FilteringInput", "props": { "onFilterStart": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(searchText: string) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "searchText" }], "return": { "name": "void" } } }, "description": "Filtering should start" }, "onFilterCancel": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Filtering is canceled while still in progress" }, "onFilterClear": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Filtering is cleared after everything's loaded" }, "status": { "required": true, "tsType": { "name": "FilteringInputStatus" }, "description": "Tells the component what is the status of filtering." }, "resultSelectorProps": { "required": false, "tsType": { "name": "ResultSelectorProps" }, "description": "[[ResultSelector]] React Component properties.\nAttribute should be memoized and updated when [[ResultSelector]] state needs to be reset.\nThis allows resetting the selected active match index back to 0." }, "autoFocus": { "required": false, "tsType": { "name": "boolean" }, "description": "Specify that the <input> element should automatically get focus" } }, "composes": ["CommonProps"] };
const ForwardRefParsedInput = reactExports.forwardRef(function ForwardRefParsedInput2({
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
      if (lastFormattedValueRef.current === strVal) return;
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
ForwardRefParsedInput.__docgenInfo = { "description": "", "methods": [], "displayName": "ForwardRefParsedInput" };
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
const PropertyFilterBuilderContext = reactExports.createContext(null);
const PropertyFilterBuilderRuleRenderingContext = reactExports.createContext({});
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
  const getLabel2 = usePropertyFilterBuilderOperatorLabels();
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
      label: getLabel2(op)
    })),
    [availableOperators, getLabel2]
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
function usePropertyFilterBuilderOperatorLabels() {
  const { translate } = useTranslation();
  return reactExports.useCallback(
    (operator) => {
      switch (operator) {
        case "is-true":
          return translate("filterBuilder.operators.isTrue");
        case "is-false":
          return translate("filterBuilder.operators.isFalse");
        case "is-equal":
          return translate("filterBuilder.operators.equal");
        case "is-not-equal":
          return translate("filterBuilder.operators.notEqual");
        case "greater":
          return ">";
        case "greater-or-equal":
          return ">=";
        case "less":
          return "<";
        case "less-or-equal":
          return "<=";
        case "like":
          return translate("filterBuilder.operators.contains");
        case "is-null":
          return translate("filterBuilder.operators.isNull");
        case "is-not-null":
          return translate("filterBuilder.operators.isNotNull");
        case "between":
          return translate("filterBuilder.operators.between");
        case "not-between":
          return translate("filterBuilder.operators.notBetween");
      }
    },
    [translate]
  );
}
PropertyFilterBuilderRuleOperatorRenderer.__docgenInfo = { "description": "Component that renders [[PropertyFilterBuilderRuleRenderer]] operator selector.\n@internal", "methods": [], "displayName": "PropertyFilterBuilderRuleOperatorRenderer", "props": { "operator": { "required": false, "tsType": { "name": "union", "raw": '| `${PropertyFilterRuleOperator}`\n| "between"\n| "not-between"', "elements": [{ "name": "literal", "value": "`${PropertyFilterRuleOperator}`" }, { "name": "literal", "value": '"between"' }, { "name": "literal", "value": '"not-between"' }] }, "description": "Currently selected operator." }, "property": { "required": true, "tsType": { "name": "PropertyDescription" }, "description": "Property used in rule for which this operator will be used." }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(operator: PropertyFilterBuilderRuleOperator) => void", "signature": { "arguments": [{ "type": { "name": "union", "raw": '| `${PropertyFilterRuleOperator}`\n| "between"\n| "not-between"', "elements": [{ "name": "literal", "value": "`${PropertyFilterRuleOperator}`" }, { "name": "literal", "value": '"between"' }, { "name": "literal", "value": '"not-between"' }] }, "name": "operator" }], "return": { "name": "void" } } }, "description": "Callback that is invoked when selected operator changes." } } };
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
PropertyFilterBuilderRuleProperty.__docgenInfo = { "description": "Component that renders [[PropertyFilterBuilderRuleRenderer]] property selector.\n@internal", "methods": [], "displayName": "PropertyFilterBuilderRuleProperty", "props": { "properties": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "PropertyDescription" }], "raw": "PropertyDescription[]" }, "description": "List of available properties." }, "selectedProperty": { "required": false, "tsType": { "name": "PropertyDescription" }, "description": "Currently selected property." }, "onSelectedPropertyChanged": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(property?: PropertyDescription) => void", "signature": { "arguments": [{ "type": { "name": "PropertyDescription" }, "name": "property" }], "return": { "name": "void" } } }, "description": "Callback that is invoked when selected property changes." }, "propertyRenderer": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(name: string) => React.ReactNode", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "name" }], "return": { "name": "ReactReactNode", "raw": "React.ReactNode" } } }, "description": "Custom renderer for property item inside selector." }, "isDisabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Specifies whether selector should be disabled or not." } } };
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
PropertyFilterBuilderRuleValue.__docgenInfo = { "description": "Component that renders [[PropertyFilterBuilderRuleRenderer]] value input.\n@beta", "methods": [], "displayName": "PropertyFilterBuilderRuleValue", "props": { "value": { "required": false, "tsType": { "name": "PropertyValue" }, "description": "Currently entered value." }, "property": { "required": true, "tsType": { "name": "PropertyDescription" }, "description": "Property used in rule to which this value will be compared to." }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(value: PropertyValue) => void", "signature": { "arguments": [{ "type": { "name": "PropertyValue" }, "name": "value" }], "return": { "name": "void" } } }, "description": "Callback that is invoked when value changes." }, "operator": { "required": true, "tsType": { "name": "union", "raw": '| `${PropertyFilterRuleOperator}`\n| "between"\n| "not-between"', "elements": [{ "name": "literal", "value": "`${PropertyFilterRuleOperator}`" }, { "name": "literal", "value": '"between"' }, { "name": "literal", "value": '"not-between"' }] }, "description": "Current operator." } } };
const PropertyFilterBuilderToolbar = (props) => {
  const { onAddChild, onDelete } = props;
  const { translate } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { className: "fb-toolbar fb-row-toolbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconButton,
      {
        size: "small",
        className: "fb-add-rule-button",
        label: translate("filterBuilder.add"),
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
  ] });
};
PropertyFilterBuilderToolbar.__docgenInfo = { "description": 'Toolbar displaying the "add" and "delete" row buttons in the filter builder\n@beta', "methods": [], "displayName": "PropertyFilterBuilderToolbar", "props": { "onAddChild": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function to add child of current group." }, "onDelete": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function to remove child from current group." } } };
function PropertyFilterBuilderRuleRenderer(props) {
  const { path, rule, onRuleAdded, allowLastRuleDelete } = props;
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
  const removeRule = () => actions.removeItem(path, allowLastRuleDelete);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fb-component-row", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { className: "fb-row-container", children: [
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
PropertyFilterBuilderRuleRenderer.__docgenInfo = { "description": "Component that renders single rule in [[PropertyFilterBuilder]] component.\n@internal", "methods": [], "displayName": "PropertyFilterBuilderRuleRenderer", "props": { "path": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "string" }], "raw": "string[]" }, "description": "Path from [[PropertyFilterBuilder]] root to this rule." }, "rule": { "required": true, "tsType": { "name": "PropertyFilterBuilderRule" }, "description": "Rule to render." }, "onRuleAdded": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function to add rule to group" }, "allowLastRuleDelete": { "required": false, "tsType": { "name": "boolean" }, "description": "Boolean to allow last rule to be removed" } } };
function isPropertyFilterBuilderRuleGroup(item) {
  return item.items !== void 0;
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
PropertyFilterBuilderLogicalOperator.__docgenInfo = { "description": "Component to render the operator inside of the filter builder\n@beta", "methods": [], "displayName": "PropertyFilterBuilderLogicalOperator", "props": { "isDisabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Allows toggling of operator by clicking operator text." }, "operator": { "required": true, "tsType": { "name": "literal", "value": "`${PropertyFilterRuleGroupOperator}`" }, "description": 'Operator to combine FilterBuilderRules. Must be either "and" or "or".' }, "onOperatorChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(operator: `${PropertyFilterRuleGroupOperator}`) => void", "signature": { "arguments": [{ "type": { "name": "literal", "value": "`${PropertyFilterRuleGroupOperator}`" }, "name": "operator" }], "return": { "name": "void" } } }, "description": "Callback that is invoked when operator changes." }, "className": { "required": false, "tsType": { "name": "string" }, "description": "Classname to specify CSS styling" } } };
function PropertyFilterBuilderRuleGroupRenderer(props) {
  const { path, group, isGroupOperatorDisabled, allowLastRuleDelete } = props;
  const { actions } = reactExports.useContext(PropertyFilterBuilderContext);
  const { onRuleAdded, groupRef } = useRulePropertyFocus(group.items.length);
  const onOperatorChange = reactExports.useCallback(
    (operator) => {
      actions.setRuleGroupOperator(path, operator);
    },
    [path, actions]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Flex,
    {
      ref: groupRef,
      style: { alignSelf: "flex-start" },
      className: "fb-group",
      gap: "0px",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PropertyFilterBuilderRuleGroupOperator,
          {
            operator: group.operator,
            onChange: onOperatorChange,
            isGroupOperatorDisabled
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fb-wrapper", children: group.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fb-row", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PropertyFilterBuilderGroupOrRule,
          {
            path,
            item,
            onRuleAdded,
            allowLastRuleDelete
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
    onRuleAdded,
    allowLastRuleDelete
  }) {
    const itemPath = [...path, item.id];
    if (isPropertyFilterBuilderRuleGroup(item))
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyFilterBuilderRuleGroupRenderer, { path: itemPath, group: item });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PropertyFilterBuilderRuleRenderer,
      {
        path: itemPath,
        rule: item,
        onRuleAdded,
        allowLastRuleDelete
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
PropertyFilterBuilderRuleGroupRenderer.__docgenInfo = { "description": "Component that renders group of rules in [[PropertyFilterBuilder]] component.\n@internal", "methods": [], "displayName": "PropertyFilterBuilderRuleGroupRenderer", "props": { "path": { "required": true, "tsType": { "name": "Array", "elements": [{ "name": "string" }], "raw": "string[]" }, "description": "Path from [[PropertyFilterBuilder]] root to this rule group." }, "group": { "required": true, "tsType": { "name": "PropertyFilterBuilderRuleGroup" }, "description": "Rule group to render." }, "isGroupOperatorDisabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Controls whether the group operator is toggle-able." }, "allowLastRuleDelete": { "required": false, "tsType": { "name": "boolean" }, "description": "Controls whether the last rule remaining in a group is deletable" } } };
PropertyFilterBuilderRuleGroupOperator.__docgenInfo = { "description": "Component that renders [[PropertyFilterBuilderRuleGroup]] operator selector.\n@internal", "methods": [], "displayName": "PropertyFilterBuilderRuleGroupOperator", "props": { "operator": { "required": true, "tsType": { "name": "literal", "value": "`${PropertyFilterRuleGroupOperator}`" }, "description": "Currently selected operator." }, "onChange": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(operator: `${PropertyFilterRuleGroupOperator}`) => void", "signature": { "arguments": [{ "type": { "name": "literal", "value": "`${PropertyFilterRuleGroupOperator}`" }, "name": "operator" }], "return": { "name": "void" } } }, "description": "Callback that is invoked when selected operator changes." }, "isGroupOperatorDisabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Controls whether the group operator is toggle-able." } } };
const colorDecimalToHex = (decimal) => `#${decimal.toString(16).padStart(6, "0")}`;
function getBackgroundColor(isSelected, colorOverrides) {
  if (!colorOverrides) return void 0;
  if (isSelected)
    return colorOverrides.backgroundColorSelected !== void 0 ? colorDecimalToHex(colorOverrides.backgroundColorSelected) : void 0;
  if (colorOverrides.backgroundColor)
    return colorDecimalToHex(colorOverrides.backgroundColor);
  return void 0;
}
function getForegroundColor(isSelected, colorOverrides) {
  if (!colorOverrides) return void 0;
  if (isSelected)
    return colorOverrides.colorSelected !== void 0 ? colorDecimalToHex(colorOverrides.colorSelected) : void 0;
  if (colorOverrides.color) return colorDecimalToHex(colorOverrides.color);
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
        UiComponents$1.loggerCategory("createContextWithMandatoryProvider"),
        `'${ConsumingComponent.displayName}' expects to be wrapped by a '${contextName}' provider.`
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
_a$1 = DRAFTABLE;
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
    if (this._depth < 0) throw new Error("Depth cannot be negative");
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
    if (!this.isExpanded) return this.getSelf();
    const children = this.getChildren();
    if (children.length < 1) return this.getSelf();
    return children[children.length - 1].getLastVisibleDescendantOrSelf();
  }
  /**
   * Sets lastInNumberOfCategories value and sends it down to this items last child
   * @internal
   */
  get lastInNumberOfCategories() {
    if (this.isExpanded && this.getChildren().length > 0) return 0;
    return this._lastInNumberOfCategories;
  }
  set lastInNumberOfCategories(value) {
    this._lastInNumberOfCategories = value;
    const children = this.getChildren();
    if (children.length < 1) return;
    children[children.length - 1].lastInNumberOfCategories = value;
  }
  /**
   * Gets and sets isLastInRootCategory value and sends it down to this items last child
   * @internal
   */
  get isLastInRootCategory() {
    if (this.isExpanded && this.getChildren().length > 0) return false;
    return this._isLastInRootCategory;
  }
  set isLastInRootCategory(value) {
    this._isLastInRootCategory = value;
    const children = this.getChildren();
    if (children.length < 1) return;
    children[children.length - 1].isLastInRootCategory = value;
  }
}
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
    else this._selectionKey = category.name;
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
    if (this.isExpanded && this.getChildren().length > 0) return 0;
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
      if (!this.props.isExpanded) this.props.onExpandToggled();
    };
    this._onCollapsed = () => {
      if (this.props.isExpanded) this.props.onExpandToggled();
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
FlatNonPrimitivePropertyRenderer.__docgenInfo = { "description": "React Component that renders flat struct and array properties\n@internal", "methods": [], "displayName": "FlatNonPrimitivePropertyRenderer", "props": { "isExpanded": { "required": true, "tsType": { "name": "boolean" }, "description": "" }, "onExpandToggled": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" } }, "composes": ["PrimitiveRendererProps"] };
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
      if (props.category) (_a3 = props.onEditCommit) == null ? void 0 : _a3.call(props, args, props.category);
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
FlatPropertyRenderer.__docgenInfo = { "description": "A React component that renders flat properties\n@internal", "methods": [], "displayName": "FlatPropertyRenderer", "props": { "category": { "required": false, "tsType": { "name": "PropertyCategory" }, "description": "" }, "propertyValueRendererManager": { "required": false, "tsType": { "name": "PropertyValueRendererManager" }, "description": "Custom value renderer" }, "indentation": { "required": false, "tsType": { "name": "number" }, "description": "Multiplier of how much the property is indented to the right" }, "isEditing": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates property is being edited" }, "onEditCommit": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(\n  args: PropertyUpdatedArgs,\n  category: PropertyCategory\n) => void", "signature": { "arguments": [{ "type": { "name": "PropertyUpdatedArgs" }, "name": "args" }, { "type": { "name": "PropertyCategory" }, "name": "category" }], "return": { "name": "void" } } }, "description": "Called when property edit is committed." }, "onEditCancel": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Called when property edit is cancelled." }, "isExpanded": { "required": true, "tsType": { "name": "boolean" }, "description": "Whether property value is displayed in expanded state." }, "onExpansionToggled": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Called when toggling between expanded and collapsed property value display state." }, "onHeightChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(newHeight: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "newHeight" }], "return": { "name": "void" } } }, "description": "Reports property height changes." }, "highlight": { "required": false, "tsType": { "name": "intersection", "raw": "HighlightingComponentProps & {\n  applyOnLabel: boolean;\n  applyOnValue: boolean;\n}", "elements": [{ "name": "HighlightingComponentProps" }, { "name": "signature", "type": "object", "raw": "{\n  applyOnLabel: boolean;\n  applyOnValue: boolean;\n}", "signature": { "properties": [{ "key": "applyOnLabel", "value": { "name": "boolean", "required": true } }, { "key": "applyOnValue", "value": { "name": "boolean", "required": true } }] } }] }, "description": "" }, "children": { "required": false, "tsType": { "name": "never" }, "description": "" } }, "composes": ["SharedRendererProps"] };
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
      ratio = Geometry.clamp(ratio, this._minRatio, this._maxRatio);
      if (this.state.columnRatio === ratio) return { ratio };
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
    if (this.props.orientation !== Orientation.Horizontal) return false;
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
    return Geometry.clamp(
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
ColumnResizingPropertyListPropsSupplier.__docgenInfo = { "description": "Wrapped PropertyCategoryBlock React component with list of properties and render optimization\n@internal", "methods": [], "displayName": "ColumnResizingPropertyListPropsSupplier", "props": { "orientation": { "required": true, "tsType": { "name": "_Orientation" }, "description": "Orientation of the properties" }, "width": { "required": true, "tsType": { "name": "number" }, "description": "Width of the property list" }, "minLabelWidth": { "required": false, "tsType": { "name": "number" }, "description": "Minimum allowed label column width, after which resizing stops", "defaultValue": { "value": "100", "computed": false } }, "minValueWidth": { "required": false, "tsType": { "name": "number" }, "description": "Minimum allowed value column width, after which resizing stops", "defaultValue": { "value": "100", "computed": false } }, "actionButtonWidth": { "required": false, "tsType": { "name": "number" }, "description": "Fixed action button column width" }, "maxPropertyDepth": { "required": false, "tsType": { "name": "number" }, "description": "Maximum depth of the properties shown" }, "children": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(props: ColumnResizeRelatedPropertyListProps) => React.ReactNode", "signature": { "arguments": [{ "type": { "name": "Required", "elements": [{ "name": "Pick", "elements": [{ "name": "PropertyListProps" }, { "name": "union", "raw": '| "onColumnChanged"\n| "columnRatio"\n| "isResizeHandleHovered"\n| "onResizeHandleHoverChanged"\n| "isResizeHandleBeingDragged"\n| "onResizeHandleDragChanged"\n| "columnInfo"\n| "orientation"\n| "width"', "elements": [{ "name": "literal", "value": '"onColumnChanged"' }, { "name": "literal", "value": '"columnRatio"' }, { "name": "literal", "value": '"isResizeHandleHovered"' }, { "name": "literal", "value": '"onResizeHandleHoverChanged"' }, { "name": "literal", "value": '"isResizeHandleBeingDragged"' }, { "name": "literal", "value": '"onResizeHandleDragChanged"' }, { "name": "literal", "value": '"columnInfo"' }, { "name": "literal", "value": '"orientation"' }, { "name": "literal", "value": '"width"' }] }], "raw": 'Pick<\n  PropertyListProps,\n  | "onColumnChanged"\n  | "columnRatio"\n  | "isResizeHandleHovered"\n  | "onResizeHandleHoverChanged"\n  | "isResizeHandleBeingDragged"\n  | "onResizeHandleDragChanged"\n  | "columnInfo"\n  | "orientation"\n  | "width"\n>' }], "raw": 'Required<\n  Pick<\n    PropertyListProps,\n    | "onColumnChanged"\n    | "columnRatio"\n    | "isResizeHandleHovered"\n    | "onResizeHandleHoverChanged"\n    | "isResizeHandleBeingDragged"\n    | "onResizeHandleDragChanged"\n    | "columnInfo"\n    | "orientation"\n    | "width"\n  >\n>' }, "name": "props" }], "return": { "name": "ReactReactNode", "raw": "React.ReactNode" } } }, "description": "A callback that receives the required column-resize-related props for the [[PropertyList]] component" } } };
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
  if (isBottomBorderNeeded) currentBottomBorderCount--;
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
FlatItemNestedBorderWrapper.__docgenInfo = { "description": "FlatItemNestedBorderWrapper React component.\nWraps provided ReactNode in nested borders recursively according to provided borderCount.\n@internal", "methods": [], "displayName": "FlatItemNestedBorderWrapper", "props": { "className": { "required": false, "tsType": { "name": "string" }, "description": "" }, "bottomBorderCount": { "required": true, "tsType": { "name": "number" }, "description": "Number of bottom borders to draw (no more than side borders)" }, "borderCount": { "required": true, "tsType": { "name": "number" }, "description": "Number of side borders to draw" }, "children": { "required": true, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Node to wrap around" } } };
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
PropertyCategoryBlock.__docgenInfo = { "description": "PropertyCategoryBlock React component\n@public", "methods": [], "displayName": "PropertyCategoryBlock", "props": { "category": { "required": true, "tsType": { "name": "PropertyCategory" }, "description": "Category of the properties" }, "onExpansionToggled": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(categoryName: string) => void", "signature": { "arguments": [{ "type": { "name": "string" }, "name": "categoryName" }], "return": { "name": "void" } } }, "description": "Callback to when PropertyCategoryBlock gets expended or collapsed" }, "highlight": { "required": false, "tsType": { "name": "HighlightingComponentProps" }, "description": "Properties used for highlighting" }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Content" } }, "composes": ["CommonProps"] };
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
    if (selectedPropertyKey !== key) selectedPropertyKey = key;
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
PropertyGridEventsRelatedPropsSupplier.__docgenInfo = { "description": "PropertyGridEventsRelatedPropsSupplier React component.\n@internal", "methods": [], "displayName": "PropertyGridEventsRelatedPropsSupplier", "props": { "children": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(context: PropertyGridEventsRelatedProps) => React.ReactNode", "signature": { "arguments": [{ "type": { "name": "intersection", "raw": 'Pick<\n  PropertyListProps,\n  | "onPropertyClicked"\n  | "onPropertyRightClicked"\n  | "onPropertyContextMenu"\n  | "onEditCommit"\n  | "onEditCancel"\n  | "selectedPropertyKey"\n  | "editingPropertyKey"\n> &\n  Pick<\n    CommonPropertyGridProps,\n    "isPropertySelectionOnRightClickEnabled" | "isPropertyEditingEnabled"\n  > &\n  Required<\n    Pick<\n      CommonPropertyGridProps,\n      "isPropertyHoverEnabled" | "isPropertySelectionEnabled"\n    >\n  >', "elements": [{ "name": "Pick", "elements": [{ "name": "PropertyListProps" }, { "name": "union", "raw": '| "onPropertyClicked"\n| "onPropertyRightClicked"\n| "onPropertyContextMenu"\n| "onEditCommit"\n| "onEditCancel"\n| "selectedPropertyKey"\n| "editingPropertyKey"', "elements": [{ "name": "literal", "value": '"onPropertyClicked"' }, { "name": "literal", "value": '"onPropertyRightClicked"' }, { "name": "literal", "value": '"onPropertyContextMenu"' }, { "name": "literal", "value": '"onEditCommit"' }, { "name": "literal", "value": '"onEditCancel"' }, { "name": "literal", "value": '"selectedPropertyKey"' }, { "name": "literal", "value": '"editingPropertyKey"' }] }], "raw": 'Pick<\n  PropertyListProps,\n  | "onPropertyClicked"\n  | "onPropertyRightClicked"\n  | "onPropertyContextMenu"\n  | "onEditCommit"\n  | "onEditCancel"\n  | "selectedPropertyKey"\n  | "editingPropertyKey"\n>' }, { "name": "Pick", "elements": [{ "name": "CommonPropertyGridProps" }, { "name": "union", "raw": '"isPropertySelectionOnRightClickEnabled" | "isPropertyEditingEnabled"', "elements": [{ "name": "literal", "value": '"isPropertySelectionOnRightClickEnabled"' }, { "name": "literal", "value": '"isPropertyEditingEnabled"' }] }], "raw": 'Pick<\n  CommonPropertyGridProps,\n  "isPropertySelectionOnRightClickEnabled" | "isPropertyEditingEnabled"\n>' }, { "name": "Required", "elements": [{ "name": "Pick", "elements": [{ "name": "CommonPropertyGridProps" }, { "name": "union", "raw": '"isPropertyHoverEnabled" | "isPropertySelectionEnabled"', "elements": [{ "name": "literal", "value": '"isPropertyHoverEnabled"' }, { "name": "literal", "value": '"isPropertySelectionEnabled"' }] }], "raw": 'Pick<\n  CommonPropertyGridProps,\n  "isPropertyHoverEnabled" | "isPropertySelectionEnabled"\n>' }], "raw": 'Required<\n  Pick<\n    CommonPropertyGridProps,\n    "isPropertyHoverEnabled" | "isPropertySelectionEnabled"\n  >\n>' }] }, "name": "context" }], "return": { "name": "ReactReactNode", "raw": "React.ReactNode" } } }, "description": "" } } };
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
      if (this._listRef.current) this._listRef.current.resetAfterIndex(0);
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
        if (this._listRef.current) this._listRef.current.scrollToItem(index);
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
VirtualizedPropertyGrid.__docgenInfo = { "description": "VirtualizedPropertyGrid React component.\n@public", "methods": [], "displayName": "VirtualizedPropertyGrid", "props": { "orientation": { "required": false, "tsType": { "name": "_Orientation" }, "description": "Grid orientation. When not defined, it is chosen automatically based on width of the grid." }, "isPropertyHoverEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property hovering effect" }, "onPropertyContextMenu": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(args: PropertyGridContextMenuArgs) => void", "signature": { "arguments": [{ "type": { "name": "PropertyGridContextMenuArgs" }, "name": "args" }], "return": { "name": "void" } } }, "description": "Called to show a context menu when properties are right-clicked" }, "isPropertySelectionEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property selection" }, "isPropertySelectionOnRightClickEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property selection with right click" }, "onPropertySelectionChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(property: PropertyRecord) => void", "signature": { "arguments": [{ "type": { "name": "PropertyRecord" }, "name": "property" }], "return": { "name": "void" } } }, "description": "Callback to property selection" }, "isPropertyEditingEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property editing" }, "onPropertyEditing": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(\n  args: PropertyEditingArgs,\n  category: PropertyCategory\n) => void", "signature": { "arguments": [{ "type": { "name": "PropertyEditingArgs" }, "name": "args" }, { "type": { "name": "PropertyCategory" }, "name": "category" }], "return": { "name": "void" } } }, "description": "Callback for when properties are being edited" }, "onPropertyUpdated": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(\n  args: PropertyUpdatedArgs,\n  category: PropertyCategory\n) => Promise<boolean>", "signature": { "arguments": [{ "type": { "name": "PropertyUpdatedArgs" }, "name": "args" }, { "type": { "name": "PropertyCategory" }, "name": "category" }], "return": { "name": "Promise", "elements": [{ "name": "boolean" }], "raw": "Promise<boolean>" } } }, "description": "Callback for when properties are updated" }, "propertyValueRendererManager": { "required": false, "tsType": { "name": "PropertyValueRendererManager" }, "description": "Custom property value renderer manager" }, "isOrientationFixed": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the orientation is fixed and does not auto-switch to Vertical when the width is too narrow. Defaults to false." }, "horizontalOrientationMinWidth": { "required": false, "tsType": { "name": "number" }, "description": "The minimum width before the auto-switch to Vertical when the width is too narrow. Defaults to 300." }, "minLabelWidth": { "required": false, "tsType": { "name": "number" }, "description": "Minimum allowed label column width, after which resizing stops" }, "minValueWidth": { "required": false, "tsType": { "name": "number" }, "description": "Minimum allowed value column width, after which resizing stops" }, "actionButtonWidth": { "required": false, "tsType": { "name": "number" }, "description": "Fixed action button column width" }, "actionButtonRenderers": { "required": false, "tsType": { "name": "Array", "elements": [{ "name": "ActionButtonRenderer" }], "raw": "ActionButtonRenderer[]" }, "description": "Array of action button renderers. Each renderer is called for each property and can decide\nto render an action button for the property or not." }, "model": { "required": true, "tsType": { "name": "IPropertyGridModel" }, "description": "Property grid view model that defines what needs to be rendered" }, "eventHandler": { "required": true, "tsType": { "name": "IPropertyGridEventHandler" }, "description": "Handler of the events raised from the property grid" }, "dataProvider": { "required": true, "tsType": { "name": "IPropertyDataProvider" }, "description": "Property data provider used by the property grid" }, "highlight": { "required": false, "tsType": { "name": "PropertyGridContentHighlightProps" }, "description": "Properties for highlighting property data in the grid." }, "propertyCategoryRendererManager": { "required": false, "tsType": { "name": "PropertyCategoryRendererManager" }, "description": "Custom property category renderer manager. Defaults to [[PropertyCategoryRendererManager.defaultManager]]." }, "width": { "required": true, "tsType": { "name": "number" }, "description": "Width of the property grid component." }, "height": { "required": true, "tsType": { "name": "number" }, "description": "Height of the property grid component." } }, "composes": ["CommonProps"] };
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
_a = DRAFTABLE;
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
      if (!selectionKey.startsWith(item.selectionKey)) continue;
      if (item.selectionKey === selectionKey) return item;
      const foundItem = this.findItem(item.getChildren(), selectionKey);
      if (foundItem) return foundItem;
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
      if (oldGridItem) gridItem.isExpanded = oldGridItem.isExpanded;
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
    if (!this._model) return;
    this._model = produce(this._model, callback);
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
    if (propertyData) modelSource.setPropertyData(propertyData);
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
VirtualizedPropertyGridWithDataProvider.__docgenInfo = { "description": "[[VirtualizedPropertyGrid]] React Component which takes a data provider and\nsets up default implementations for `IPropertyGridModelSource` and `IPropertyGridEventHandler`\n@public", "methods": [], "displayName": "VirtualizedPropertyGridWithDataProvider", "props": { "orientation": { "required": false, "tsType": { "name": "_Orientation" }, "description": "Grid orientation. When not defined, it is chosen automatically based on width of the grid." }, "isPropertyHoverEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property hovering effect" }, "onPropertyContextMenu": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(args: PropertyGridContextMenuArgs) => void", "signature": { "arguments": [{ "type": { "name": "PropertyGridContextMenuArgs" }, "name": "args" }], "return": { "name": "void" } } }, "description": "Called to show a context menu when properties are right-clicked" }, "isPropertySelectionEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property selection" }, "isPropertySelectionOnRightClickEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property selection with right click" }, "onPropertySelectionChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(property: PropertyRecord) => void", "signature": { "arguments": [{ "type": { "name": "PropertyRecord" }, "name": "property" }], "return": { "name": "void" } } }, "description": "Callback to property selection" }, "isPropertyEditingEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Enables/disables property editing" }, "onPropertyEditing": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(\n  args: PropertyEditingArgs,\n  category: PropertyCategory\n) => void", "signature": { "arguments": [{ "type": { "name": "PropertyEditingArgs" }, "name": "args" }, { "type": { "name": "PropertyCategory" }, "name": "category" }], "return": { "name": "void" } } }, "description": "Callback for when properties are being edited" }, "onPropertyUpdated": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(\n  args: PropertyUpdatedArgs,\n  category: PropertyCategory\n) => Promise<boolean>", "signature": { "arguments": [{ "type": { "name": "PropertyUpdatedArgs" }, "name": "args" }, { "type": { "name": "PropertyCategory" }, "name": "category" }], "return": { "name": "Promise", "elements": [{ "name": "boolean" }], "raw": "Promise<boolean>" } } }, "description": "Callback for when properties are updated" }, "propertyValueRendererManager": { "required": false, "tsType": { "name": "PropertyValueRendererManager" }, "description": "Custom property value renderer manager" }, "isOrientationFixed": { "required": false, "tsType": { "name": "boolean" }, "description": "Indicates whether the orientation is fixed and does not auto-switch to Vertical when the width is too narrow. Defaults to false." }, "horizontalOrientationMinWidth": { "required": false, "tsType": { "name": "number" }, "description": "The minimum width before the auto-switch to Vertical when the width is too narrow. Defaults to 300." }, "minLabelWidth": { "required": false, "tsType": { "name": "number" }, "description": "Minimum allowed label column width, after which resizing stops" }, "minValueWidth": { "required": false, "tsType": { "name": "number" }, "description": "Minimum allowed value column width, after which resizing stops" }, "actionButtonWidth": { "required": false, "tsType": { "name": "number" }, "description": "Fixed action button column width" }, "actionButtonRenderers": { "required": false, "tsType": { "name": "Array", "elements": [{ "name": "ActionButtonRenderer" }], "raw": "ActionButtonRenderer[]" }, "description": "Array of action button renderers. Each renderer is called for each property and can decide\nto render an action button for the property or not." }, "dataProvider": { "required": true, "tsType": { "name": "IPropertyDataProvider" }, "description": "Property data provider used by the property grid" }, "highlight": { "required": false, "tsType": { "name": "PropertyGridContentHighlightProps" }, "description": "Properties for highlighting property data in the grid." }, "propertyCategoryRendererManager": { "required": false, "tsType": { "name": "PropertyCategoryRendererManager" }, "description": "Custom property category renderer manager. Defaults to [[PropertyCategoryRendererManager.defaultManager]]." }, "width": { "required": true, "tsType": { "name": "number" }, "description": "Width of the property grid component." }, "height": { "required": true, "tsType": { "name": "number" }, "description": "Height of the property grid component." } }, "composes": ["CommonProps"] };
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
ToolbarButtonItem.__docgenInfo = { "description": "Toolbar item component. Used in [[Toolbar]] component.\n@public", "methods": [], "displayName": "ToolbarButtonItem", "props": { "icon": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "button icon." }, "isActive": { "required": false, "tsType": { "name": "boolean" }, "description": "Describes if item is active." }, "isDisabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Describes if the item is disabled." }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function called when the item is clicked." }, "onKeyDown": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(e: React.KeyboardEvent) => void", "signature": { "arguments": [{ "type": { "name": "ReactKeyboardEvent", "raw": "React.KeyboardEvent" }, "name": "e" }], "return": { "name": "void" } } }, "description": "Function called when a key is pressed." }, "title": { "required": true, "tsType": { "name": "string" }, "description": "Title for the item." }, "badge": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "A badge to draw." }, "addGroupSeparator": { "required": false, "tsType": { "name": "boolean" }, "description": "If true add a gap before button. Default to false." }, "providerId": { "required": false, "tsType": { "name": "string" }, "description": "value added to DOM element as a data attribute to hold name of items provider. If specified in `FrontstageProvider` then this will be undefined" }, "itemPriority": { "required": false, "tsType": { "name": "number" }, "description": "value added to DOM element as a data attribute, shows 0 is undefined" }, "groupPriority": { "required": false, "tsType": { "name": "number" }, "description": "value added to DOM element as a data attribute" } }, "composes": ["CommonProps"] };
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
BackArrow.__docgenInfo = { "description": "Back arrow used in [[NestedGroup]] component.\n@internal", "methods": [], "displayName": "BackArrow", "props": { "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function called when arrow is clicked." }, "onPointerUp": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Function called when pointer up event is received." } }, "composes": ["CommonProps", "NoChildrenProps"] };
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
    if (!props.isDisabled && props.onClick) props.onClick(props.item);
  }, [props]);
  const handlePointerUp = reactExports.useCallback(() => {
    if (!props.isDisabled && props.onPointerUp) props.onPointerUp(props.item);
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
GroupTool.__docgenInfo = { "description": "Tool entry of tool group panel. Used in [[GroupColumn]].\n@internal", "methods": [], "displayName": "GroupTool", "props": { "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Additional content, besides icon and label." }, "icon": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Tool icon." }, "isActive": { "required": false, "tsType": { "name": "boolean" }, "description": "Describes if the item is active." }, "isDisabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Describes if the item is disabled." }, "isFocused": { "required": false, "tsType": { "name": "boolean" }, "description": "Describes if the item is focused." }, "label": { "required": false, "tsType": { "name": "string" }, "description": "Tool label." }, "onClick": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(item: GroupButton | ActionButton) => void", "signature": { "arguments": [{ "type": { "name": "union", "raw": "GroupButton | ActionButton", "elements": [{ "name": "GroupButton" }, { "name": "ActionButton" }] }, "name": "item" }], "return": { "name": "void" } } }, "description": "Function called when the item is clicked." }, "onPointerUp": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(item: GroupButton | ActionButton) => void", "signature": { "arguments": [{ "type": { "name": "union", "raw": "GroupButton | ActionButton", "elements": [{ "name": "GroupButton" }, { "name": "ActionButton" }] }, "name": "item" }], "return": { "name": "void" } } }, "description": "Function called when pointer up event is received." }, "badge": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "A badge to draw." }, "item": { "required": true, "tsType": { "name": "union", "raw": "GroupButton | ActionButton", "elements": [{ "name": "GroupButton" }, { "name": "ActionButton" }] }, "description": "GroupButton item" }, "onKeyDown": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(e: React.KeyboardEvent) => void", "signature": { "arguments": [{ "type": { "name": "ReactKeyboardEvent", "raw": "React.KeyboardEvent" }, "name": "e" }], "return": { "name": "void" } } }, "description": "Optional function to call on any KeyDown events processed by toolbar" } }, "composes": ["CommonProps"] };
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
GroupToolExpander.__docgenInfo = { "description": "Expandable entry of tool group panel. Used in [[GroupColumn]] to select nested Groups.\n@internal", "methods": [], "displayName": "GroupToolExpander", "composes": ["Omit", "NoChildrenProps"] };
reactExports.createContext({
  /** function used to close popup panel */
  closePanel: () => {
  },
  /** if popup panel is a GroupButton then this is call to set the selected action item within the panel */
  setSelectedItem: (_buttonItem) => {
  }
});
reactExports.createContext(false);
reactExports.createContext({
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
reactExports.createContext({
  hasOverflow: false,
  useHeight: false,
  onResize: () => {
  }
});
function toRxjsObservable(observable) {
  return new Observable((subscriber) => {
    observable.subscribe(subscriber);
  });
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
TreeNodeEditor.__docgenInfo = { "description": "React component for displaying tree node editor.\n@public", "methods": [], "displayName": "TreeNodeEditor", "props": { "node": { "required": true, "tsType": { "name": "TreeModelNode" }, "description": "Tree node which is in editing mode." }, "onCommit": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "(node: TreeModelNode, newValue: string) => void", "signature": { "arguments": [{ "type": { "name": "TreeModelNode" }, "name": "node" }, { "type": { "name": "string" }, "name": "newValue" }], "return": { "name": "void" } } }, "description": "Callback that is called when changes are committed." }, "onCancel": { "required": true, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "Callback that is called when editing is canceled." }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "Editor style." }, "ignoreEditorBlur": { "required": false, "tsType": { "name": "boolean" }, "description": "@internal" } } };
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
TreeNodeContent.__docgenInfo = { "description": "React component for displaying [[TreeNode]] label\n@public", "methods": [], "displayName": "TreeNodeContent", "props": { "node": { "required": true, "tsType": { "name": "TreeModelNode" }, "description": "Tree node to render label for." }, "showDescription": { "required": false, "tsType": { "name": "boolean" }, "description": "Flag that specified whether the description should be shown or not." }, "highlightProps": { "required": false, "tsType": { "name": "HighlightableTreeNodeProps" }, "description": "Props for highlighting label parts that matches filter when tree is filtered." }, "onLabelRendered": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(node: TreeModelNode) => void", "signature": { "arguments": [{ "type": { "name": "TreeModelNode" }, "name": "node" }], "return": { "name": "void" } } }, "description": "Callback used to detect when label is rendered." }, "nodeEditorRenderer": { "required": false, "tsType": { "name": "TreeNodeEditorRenderer" }, "description": "Callback to render custom node editor when node is in editing mode." } }, "composes": ["CommonProps"] };
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
    if (props.node.isExpanded) props.treeActions.onNodeCollapsed(props.node.id);
    else props.treeActions.onNodeExpanded(props.node.id);
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
  if (!image) return null;
  const renderer = new ImageRenderer();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderer.render(image) });
}
TreeNodeRenderer.__docgenInfo = { "description": "Default component for rendering tree node.\n@public", "methods": [], "displayName": "TreeNodeRenderer", "props": { "node": { "required": true, "tsType": { "name": "TreeModelNode" }, "description": "Tree node to render." }, "treeActions": { "required": true, "tsType": { "name": "TreeActions" }, "description": "Action handler." }, "nodeHighlightProps": { "required": false, "tsType": { "name": "HighlightableTreeNodeProps" }, "description": "Properties used to highlight matches when tree is filtered." }, "descriptionEnabled": { "required": false, "tsType": { "name": "boolean" }, "description": "Specifies whether to show descriptions or not." }, "imageLoader": { "required": false, "tsType": { "name": "ITreeImageLoader" }, "description": "Image loader for node icons." }, "checkboxRenderer": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(props: CheckboxRendererProps) => React.ReactNode", "signature": { "arguments": [{ "type": { "name": "intersection", "raw": 'Omit<CheckboxProps, "onChange" | "onClick"> & {\n  onChange: (checked: boolean) => void;\n  onClick: (e: React.MouseEvent) => void;\n}', "elements": [{ "name": "Omit", "elements": [{ "name": "ReactComponentPropsWithoutRef", "raw": "React.ComponentPropsWithoutRef<typeof Checkbox>", "elements": [{ "name": "Checkbox" }] }, { "name": "union", "raw": '"onChange" | "onClick"', "elements": [{ "name": "literal", "value": '"onChange"' }, { "name": "literal", "value": '"onClick"' }] }], "raw": 'Omit<CheckboxProps, "onChange" | "onClick">' }, { "name": "signature", "type": "object", "raw": "{\n  onChange: (checked: boolean) => void;\n  onClick: (e: React.MouseEvent) => void;\n}", "signature": { "properties": [{ "key": "onChange", "value": { "name": "signature", "type": "function", "raw": "(checked: boolean) => void", "signature": { "arguments": [{ "type": { "name": "boolean" }, "name": "checked" }], "return": { "name": "void" } }, "required": true } }, { "key": "onClick", "value": { "name": "signature", "type": "function", "raw": "(e: React.MouseEvent) => void", "signature": { "arguments": [{ "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent" }, "name": "e" }], "return": { "name": "void" } }, "required": true } }] } }] }, "name": "props" }], "return": { "name": "ReactReactNode", "raw": "React.ReactNode" } } }, "description": "Callback to render custom checkbox." }, "nodeEditorRenderer": { "required": false, "tsType": { "name": "TreeNodeEditorRenderer" }, "description": "Callback to render custom node editor when node is in editing mode." }, "onLabelRendered": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(node: TreeModelNode) => void", "signature": { "arguments": [{ "type": { "name": "TreeModelNode" }, "name": "node" }], "return": { "name": "void" } } }, "description": "Callback used to detect when label is rendered. It is used by TreeRenderer for scrolling to active match.\n@internal" }, "onContextMenu": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(e: React.MouseEvent, node: TreeModelNode) => void", "signature": { "arguments": [{ "type": { "name": "ReactMouseEvent", "raw": "React.MouseEvent" }, "name": "e" }, { "type": { "name": "TreeModelNode" }, "name": "node" }], "return": { "name": "void" } } }, "description": "Callback that is invoked when context menu should be opened." }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Child components to render inside the node." } }, "composes": ["CommonProps"] };
TreeNodeIcon.__docgenInfo = { "description": "React component that renders icon for [[TreeNode]].\n@public", "methods": [], "displayName": "TreeNodeIcon", "props": { "node": { "required": true, "tsType": { "name": "TreeModelNode" }, "description": "Tree node to render icon for." }, "imageLoader": { "required": true, "tsType": { "name": "ITreeImageLoader" }, "description": "Image loader used to load tree node icon." } } };
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
    if (this._ref.current) this._ref.current.scrollToNode(nodeId, alignment);
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
    if (!highlightedNodeId) return;
    let index = 0;
    for (const node of visibleNodes) {
      if (isTreeModelNode(node) && node.id === highlightedNodeId) break;
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
      if (!isTreeModelNode(node)) return;
      if (!isEditing.current && node.editingInfo) {
        isEditing.current = true;
      } else if (isEditing.current && node.editingInfo === void 0) {
        isEditing.current = false;
        if (onNodeEditorClosed) onNodeEditorClosed();
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
TreeRenderer.__docgenInfo = { "description": "Default tree rendering component.\n@public", "methods": [{ "name": "scrollToNode", "docblock": "@inheritdoc", "modifiers": [], "params": [{ "name": "nodeId", "optional": false, "type": { "name": "string" } }, { "name": "alignment", "optional": true, "type": { "name": "union", "raw": '"auto" | "smart" | "center" | "end" | "start"', "elements": [{ "name": "literal", "value": '"auto"' }, { "name": "literal", "value": '"smart"' }, { "name": "literal", "value": '"center"' }, { "name": "literal", "value": '"end"' }, { "name": "literal", "value": '"start"' }], "alias": "Alignment" } }], "returns": null, "description": null }], "displayName": "TreeRenderer" };
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
        if (this.props.onCancel) this.props.onCancel();
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
    if (this.props.showTime) timeDisplay = TimeDisplay.H12MC;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      if (record.value.value instanceof Date)
        initialValue = new Date(record.value.value);
      else if (typeof record.value.value === "string")
        initialValue = new Date(record.value.value);
      else if (record.value.value === void 0) initialValue = /* @__PURE__ */ new Date();
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
DateTimeEditor.__docgenInfo = { "description": "DateTimeEditor React component that is a property editor for selection of date and time.\n@internal", "methods": [{ "name": "getPropertyValue", "docblock": null, "modifiers": ["async"], "params": [], "returns": { "type": { "name": "Promise", "elements": [{ "name": "union", "raw": "PropertyValue | undefined", "elements": [{ "name": "PropertyValue" }, { "name": "undefined" }] }], "raw": "Promise<PropertyValue | undefined>" } } }, { "name": "htmlElement", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "union", "raw": "HTMLElement | null", "elements": [{ "name": "HTMLElement" }, { "name": "null" }] } } }, { "name": "hasFocus", "docblock": null, "modifiers": ["get"], "params": [], "returns": { "type": { "name": "boolean" } } }, { "name": "processDateChange", "docblock": null, "modifiers": ["async"], "params": [{ "name": "typeConverter", "optional": false, "type": { "name": "TypeConverter", "alias": "TypeConverter" } }, { "name": "newValue", "optional": false, "type": { "name": "Date", "alias": "Date" } }], "returns": { "type": { "name": "Promise", "elements": [{ "name": "void" }], "raw": "Promise<void>" } } }], "displayName": "DateTimeEditor" };
function registerEditors() {
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Bool,
    BooleanPropertyEditor
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Boolean,
    BooleanPropertyEditor
  );
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
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Number,
    CustomNumberPropertyEditor,
    StandardEditorNames.NumberCustom
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Text,
    BasicPropertyEditor
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.String,
    BasicPropertyEditor
  );
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
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Enum,
    EnumPropertyButtonGroupEditor,
    StandardEditorNames.EnumButtonGroup
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.Enum,
    EnumPropertyEditor
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.ShortDate,
    ShortDateTimePropertyEditor
  );
  PropertyEditorManager.registerEditor(
    StandardTypeNames.DateTime,
    DateTimePropertyEditor
  );
}
function registerConverters() {
  TypeConverterManager.registerConverter(
    StandardTypeNames.Boolean,
    BooleanTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Bool,
    BooleanTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Int,
    IntTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Integer,
    IntTypeConverter
  );
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
  TypeConverterManager.registerConverter(
    StandardTypeNames.Composite,
    CompositeTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.ShortDate,
    ShortDateTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.DateTime,
    DateTimeTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Enum,
    EnumTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Hex,
    HexadecimalTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Hexadecimal,
    HexadecimalTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Navigation,
    NavigationPropertyTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Point2d,
    Point2dTypeConverter
  );
  TypeConverterManager.registerConverter(
    StandardTypeNames.Point3d,
    Point3dTypeConverter
  );
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
MultilineTextRenderer.__docgenInfo = { "description": "@internal", "methods": [], "displayName": "MultilineTextRenderer", "props": { "stringValue": { "required": false, "tsType": { "name": "string" }, "description": "" }, "isExpanded": { "required": false, "tsType": { "name": "boolean" }, "description": "" }, "onExpansionToggled": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "onHeightChanged": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "(newHeight: number) => void", "signature": { "arguments": [{ "type": { "name": "number" }, "name": "newHeight" }], "return": { "name": "void" } } }, "description": "" }, "style": { "required": false, "tsType": { "name": "ReactCSSProperties", "raw": "React.CSSProperties" }, "description": "" }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "Content" } } };
registerEditors();
registerConverters();
PropertyValueRendererManager.defaultManager.registerRenderer(
  "url",
  new UrlPropertyValueRenderer()
);
PropertyValueRendererManager.defaultManager.registerRenderer(
  "multiline",
  new MultilineTextPropertyValueRenderer()
);
const PaddingDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    padding: "5px"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) });
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: entries.map((entry) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        entry[0],
        " = ",
        entry[1].value.displayValue
      ] }, entry[0]);
    }) });
  }
});
rendererManager.registerRenderer("customRendererArrayPropertyRenderer", {
  canRender: () => true,
  render: (record) => {
    const items = record.value.items;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { children: items.map((item, index) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: item.value.displayValue }, index);
    }) });
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
