import { r as reactExports, R as React, j as jsxRuntimeExports, c as classnames } from "./iframe-DNdoMX4Q.js";
import { a as BeEvent, g as PropertyValueFormat, d as ProgressRadial, l as BentleyError, m as BentleyStatus, i as assert, n as PropertyRecord, S as StandardTypeNames } from "./Key.enum-YmMvjtrc.js";
import { cq as MutableCategorizedProperty, cr as FlatGridItemType, cs as MutableCategorizedPrimitiveProperty, ct as MutableCustomGridCategory, cu as MutableGridCategory, cv as DRAFTABLE, cw as produce, cx as VirtualizedPropertyGrid, cy as from, cz as LinkifyIt, cA as Orientation$1, cB as UnderlinedButton, aI as usePackageTranslation, cC as PropertyValueRendererManager } from "./appui-react-glMK-yaN.js";
import { U as UiComponents$1 } from "./UiComponents-BLH-V4SI.js";
import { A as AppUiDecorator } from "./Decorators-DePPLJKx.js";
import { S as SubscriptionScheduler, d as defer, s as share, a as scheduleSubscription } from "./SubscriptionScheduler-BkzG0hl-.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-7SU87-Ux.js";
import "./index-C9p5eh_j.js";
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
    const subscription = defer(valueToBeResolved).pipe(share({
      resetOnError: false,
      resetOnComplete: false,
      resetOnRefCountZero: true
    }), scheduleSubscription(scheduler)).subscribe({
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
class PropertyDataChangeEvent extends BeEvent {
}
class MutableCategorizedArrayProperty extends MutableCategorizedProperty {
  _renderLabel;
  _children;
  constructor(record, parentSelectionKey, parentCategorySelectionKey, depth, gridItemFactory, overrideName, overrideDisplayLabel) {
    super(FlatGridItemType.Array, record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel);
    this._renderLabel = !record.property.hideCompositePropertyLabel;
    const childrenDepth = depth + (this._renderLabel ? 1 : 0);
    this._children = record.getChildrenRecords().map((child, index) => {
      const newName = `${child.property.name}_${index}`;
      let newDisplayLabel = `[${index + 1}]`;
      if (child.description && child.value.valueFormat !== PropertyValueFormat.Primitive) {
        newDisplayLabel += ` ${child.description}`;
      }
      return gridItemFactory.createCategorizedProperty(child, this.selectionKey, parentCategorySelectionKey, childrenDepth, newName, newDisplayLabel);
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
      this.getChildren().forEach((child) => descendants.push(...child.getVisibleDescendantsAndSelf()));
    }
    return descendants;
  }
  getVisibleDescendantsAndSelf() {
    return this._renderLabel ? super.getVisibleDescendantsAndSelf() : this.getVisibleDescendants();
  }
}
class MutableCategorizedStructProperty extends MutableCategorizedProperty {
  _renderLabel;
  _children;
  constructor(record, parentSelectionKey, parentCategorySelectionKey, depth, gridItemFactory, overrideName, overrideDisplayLabel) {
    super(FlatGridItemType.Struct, record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel);
    this._renderLabel = !record.property.hideCompositePropertyLabel;
    const childrenDepth = depth + (this._renderLabel ? 1 : 0);
    this._children = record.getChildrenRecords().map((value) => {
      return gridItemFactory.createCategorizedProperty(value, this.selectionKey, this.parentCategorySelectionKey, childrenDepth);
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
      this.getChildren().forEach((child) => descendants.push(...child.getVisibleDescendantsAndSelf()));
    }
    return descendants;
  }
  getVisibleDescendantsAndSelf() {
    return this._renderLabel ? super.getVisibleDescendantsAndSelf() : this.getVisibleDescendants();
  }
}
class MutableGridItemFactory {
  createPrimitiveProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    return new MutableCategorizedPrimitiveProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel);
  }
  createArrayProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    return new MutableCategorizedArrayProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, this, overrideName, overrideDisplayLabel);
  }
  createStructProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    return new MutableCategorizedStructProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, this, overrideName, overrideDisplayLabel);
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
        return this.createPrimitiveProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel);
      case PropertyValueFormat.Array:
        return this.createArrayProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel);
      case PropertyValueFormat.Struct:
        return this.createStructProperty(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel);
      default:
        const unhandledRecordType = valueFormat;
        throw new Error(`Unhandled property record type. Was a new type added? ${String(unhandledRecordType)}`);
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
      return new MutableCustomGridCategory(category, recordsDict, this, parentSelectionKey, depth ?? 0);
    if (parentSelectionKey !== void 0 && depth !== void 0)
      return new MutableGridCategory(category, recordsDict, this, parentSelectionKey, depth);
    return new MutableGridCategory(category, recordsDict, this);
  }
}
class PropertyGridEventHandler {
  _modelSource;
  constructor(_modelSource) {
    this._modelSource = _modelSource;
  }
  /**
   * Flips isExpand on item by given selectionKey
   * @param selectionKey item to be modified
   */
  onExpansionToggled = (selectionKey) => {
    this._modelSource.modifyModel((draftModel) => {
      const item = draftModel.getItem(selectionKey);
      item.isExpanded = !item.isExpanded;
    });
  };
}
class MutablePropertyGridModel {
  _gridItemFactory;
  [DRAFTABLE] = true;
  _categories;
  constructor(propertyData, _gridItemFactory) {
    this._gridItemFactory = _gridItemFactory;
    this._categories = propertyData.categories.map((category) => this._gridItemFactory.createGridCategory(category, propertyData.records));
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
    this._categories.forEach((category) => flatGrid.push(...category.getDescendantsAndSelf()));
    return flatGrid;
  }
  /**
   * Gets an array of all currently visible FlatGridItems.
   * @returns 1-Dimensional array of GridCategories and CategorizedProperties
   */
  getVisibleFlatGrid() {
    const visibleItems = [];
    this._categories.forEach((category) => visibleItems.push(...category.getVisibleDescendantsAndSelf()));
    return visibleItems;
  }
}
class PropertyGridModelChangeEvent extends BeEvent {
}
class PropertyGridModelSource {
  _gridFactory;
  _model;
  /** Event that is emitted every time property model is changed. */
  onModelChanged = new PropertyGridModelChangeEvent();
  constructor(_gridFactory) {
    this._gridFactory = _gridFactory;
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
  return useDebouncedAsyncValue(reactExports.useCallback(
    async () => dataProvider.getData(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataProvider, forcedUpdate]
  ));
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
  return reactExports.useMemo(() => new PropertyGridEventHandler(props.modelSource), [props.modelSource]);
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
  return React.createElement(DelayedLoaderRenderer, { shouldRenderLoader: inProgress || !model }, model && React.createElement(VirtualizedPropertyGrid, { ...props, model, eventHandler, editorSystem: props.editorSystem ?? "legacy" }));
}
function DelayedLoaderRenderer({ children, shouldRenderLoader }) {
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
  return !showSpinner ? React.createElement(React.Fragment, null, children) : React.createElement(
    "div",
    { className: "components-virtualized-property-grid-loader" },
    React.createElement(ProgressRadial, { indeterminate: true, size: "large" })
  );
}
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
const openLink = (url) => {
  if (url.startsWith("mailto:")) {
    location.href = url;
    return;
  }
  const openAndFocus = (link) => {
    const windowOpen = window.open(link, "_blank");
    windowOpen?.focus();
  };
  if (url.startsWith("pw:")) {
    const validUrl = url.replace(/pw:\/\/|pw:\\\\/g, "pw:");
    openAndFocus(validUrl);
    return;
  }
  openAndFocus(url);
};
const Orientation = Orientation$1;
class PropertyGridCommons {
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
    if (!foundLink || !foundLink.url) {
      return;
    }
    openLink(foundLink.url);
  }
  /**
   * A helper method to get links from string.
   * @internal
   */
  static getLinks = (value) => {
    return matchLinks(value).map(
      (linkInfo) => {
        return { start: linkInfo.index, end: linkInfo.lastIndex };
      }
    );
  };
}
function renderTag(text, links, highlight) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
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
    return this.convertToStringWithOptions(
      value,
      propertyDescription.converter?.options
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
class TypeConverterManager {
  static _converters = {};
  static _defaultTypeConverter;
  static getFullConverterName(typename, converterName) {
    let fullConverterName = typename;
    if (converterName) fullConverterName += `:${converterName}`;
    return fullConverterName;
  }
  static registerConverter(typename, converter, converterName) {
    const fullConverterName = TypeConverterManager.getFullConverterName(
      typename,
      converterName
    );
    if (TypeConverterManager._converters.hasOwnProperty(fullConverterName)) {
      const nameOfConverter = TypeConverterManager._converters[fullConverterName].constructor.name;
      throw Error(
        `TypeConverterManager.registerConverter error: type '${typename}' already registered to '${nameOfConverter}'`
      );
    }
    const instance = new converter();
    TypeConverterManager._converters[fullConverterName] = instance;
  }
  static unregisterConverter(typename, converterName) {
    const fullConverterName = TypeConverterManager.getFullConverterName(
      typename,
      converterName
    );
    if (TypeConverterManager._converters.hasOwnProperty(fullConverterName)) {
      delete TypeConverterManager._converters[fullConverterName];
    }
  }
  static getConverter(typename, converterName) {
    const fullConverterName = TypeConverterManager.getFullConverterName(
      typename,
      converterName
    );
    if (TypeConverterManager._converters.hasOwnProperty(fullConverterName))
      return TypeConverterManager._converters[fullConverterName];
    if (!TypeConverterManager._defaultTypeConverter) {
      TypeConverterManager._defaultTypeConverter = new StringTypeConverter();
    }
    return TypeConverterManager._defaultTypeConverter;
  }
}
function convertRecordToString(record) {
  const primitive = record.value;
  return primitive.displayValue || TypeConverterManager.getConverter(
    record.property.typename,
    record.property.converter?.name
  ).convertPropertyToString(record.property, primitive.value);
}
const DEFAULT_LINKS_HANDLER = {
  matcher: PropertyGridCommons.getLinks,
  onClick: PropertyGridCommons.handleLinkClick
};
function useRenderedStringValue(record, stringValueCalculator, context, linksHandler) {
  const stringValue = useAsyncValue(stringValueCalculator(record));
  const el = stringValue === void 0 ? context?.defaultValue : /* @__PURE__ */ jsxRuntimeExports.jsx(
    LinksRenderer,
    {
      value: stringValue,
      links: record.links ?? linksHandler ?? DEFAULT_LINKS_HANDLER,
      highlighter: context?.textHighlighter
    }
  );
  return { stringValue, element: el };
}
const general = { "true": "true", "false": "false", "loading": "loading", "noData": "The data required for this tree layout is not available in this iModel.", "length": "Length", "label": "Label", "of": "of", "search": "Search", "clear": "Clear" };
const button = { "label": { "search": "Search", "cancel": "Cancel", "settings": "Settings", "filter": "Filter", "selectAll": "Select All" } };
const breadcrumb = { "invalidBreadcrumbPath": "Path not found.", "errorUnknownMode": "Error: Unknown Breadcrumb mode.", "name": "Name", "icon": "Icon", "description": "Description" };
const tree = { "noResultsForFilter": '0 matches found for "{{searchText}}"' };
const table = { "filter": { "numericTooltip": "Input Methods: Range (x-y), Greater Then (>x), Less Then (<y)", "numericPlaceholder": "e.g. 3,10-15,>20" } };
const showhide = { "noLabel": "[unlabeled]", "showAll": "Show all", "list": "List...", "title": "Show/Hide" };
const property = { "varies": "*** Varies ***", "arrayLength": "Number of Items", "expand": "See more", "collapse": "See less" };
const timepicker = { "day-period-am": "AM", "day-period-pm": "PM" };
const datepicker = { "selectDate": "Select Date", "time": "Time", "previousMonth": "Previous Month", "nextMonth": "Next Month" };
const month = { "long": { "january": "January", "february": "February", "march": "March", "april": "April", "may": "May", "june": "June", "july": "July", "august": "August", "september": "September", "october": "October", "november": "November", "december": "December" }, "short": { "january": "Jan", "february": "Feb", "march": "Mar", "april": "Apr", "may": "May", "june": "Jun", "july": "Jul", "august": "Aug", "september": "Sep", "october": "Oct", "november": "Nov", "december": "Dec" } };
const days = { "long": { "sunday": "Sunday", "monday": "Monday", "tuesday": "Tuesday", "wednesday": "Wednesday", "thursday": "Thursday", "friday": "Friday", "saturday": "Saturday" }, "short": { "sunday": "Su", "monday": "Mo", "tuesday": "Tu", "wednesday": "We", "thursday": "Th", "friday": "Fr", "saturday": "Sa" } };
const time = { "am": "am", "pm": "pm" };
const filteringInput = { "placeholder": "Search..." };
const toolbar = { "overflow": "More toolbar items" };
const editor = { "enum": "Enum Editor", "text": "Text Editor", "textarea": "Textarea Editor" };
const filterBuilder = { "rule": "Rule", "ruleGroup": "Rule Group", "add": "Add", "delete": "Delete", "operators": { "isTrue": "Is true", "isFalse": "Is false", "equal": "Equal", "notEqual": "Not equal", "contains": "Contains", "isNull": "Is null", "isNotNull": "Is not null", "and": "And", "or": "Or", "between": "Between", "notBetween": "Not between" }, "chooseProperty": "Choose property", "errorMessages": { "emptyValue": "Value is required", "invalidRange": "Invalid range" } };
const dialog = { "ok": "OK", "cancel": "Cancel" };
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
  const { stringValue, element } = useRenderedStringValue(
    props.record,
    convertRecordToString,
    props.context
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MultilineTextRenderer,
    {
      style: props.context?.style,
      stringValue,
      isExpanded: props.context?.isExpanded,
      onExpansionToggled: props.context?.onExpansionToggled,
      onHeightChanged: props.context?.onHeightChanged,
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
    props.onExpansionToggled?.();
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
function PropertyGridStory(props) {
  const { data, ...rest } = props;
  const provider = reactExports.useMemo(
    () => ({
      getData: async () => data,
      onDataChanged: new PropertyDataChangeEvent()
    }),
    [data]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    VirtualizedPropertyGridWithDataProvider,
    {
      ...rest,
      dataProvider: provider
    }
  );
}
PropertyGridStory.__docgenInfo = { "description": "", "methods": [], "displayName": "PropertyGridStory", "props": { "data": { "required": true, "tsType": { "name": "PropertyData" }, "description": "" } }, "composes": ["Omit"] };
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const structMembers = {
  member1: PropertyRecord.fromString("Value 1", "Member 1"),
  member2: PropertyRecord.fromString("Value 2", "Member 2"),
  member3: PropertyRecord.fromString("Value 3", "Member 3")
};
const arrayMembers = [PropertyRecord.fromString("Value 1", "Item 1"), PropertyRecord.fromString("Value 2", "Item 2"), PropertyRecord.fromString("Value 3", "Item 3")];
const multilineString = (
  // cspell:disable-next-line
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n"
);
const PaddingDecorator = (Story) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    padding: "5px"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Story, {}) });
};
const rendererManager = new PropertyValueRendererManager();
const meta = {
  title: "Components/PropertyGrid",
  component: PropertyGridStory,
  tags: ["autodocs"],
  decorators: [PaddingDecorator, AppUiDecorator],
  args: {
    height: 600,
    width: 1300
  }
};
const Basic = {
  args: {
    data: {
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
    },
    onPropertyContextMenu: void 0
  }
};
const StructRendering = {
  args: {
    orientation: Orientation$1.Vertical,
    propertyValueRendererManager: rendererManager,
    data: {
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
    }
  }
};
const ArrayRendering = {
  args: {
    orientation: Orientation$1.Horizontal,
    propertyValueRendererManager: rendererManager,
    data: {
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
    }
  }
};
const NestedCategories = {
  args: {
    orientation: Orientation$1.Horizontal,
    data: {
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
    }
  }
};
const Links = {
  args: {
    data: {
      label: PropertyRecord.fromString("Record 1"),
      categories: [{
        name: "Group_1",
        label: "Group 1",
        expand: true
      }],
      records: {
        Group_1: [PropertyRecord.fromString("https://www.bentley.com"), PropertyRecord.fromString("pw://test")]
      }
    },
    onPropertyContextMenu: void 0
  }
};
const Editable = {
  args: {
    height: 1e3,
    isPropertyEditingEnabled: true,
    onPropertyUpdated: async ({
      propertyRecord,
      newValue
    }) => {
      action("onPropertyUpdated")(`Property "${propertyRecord.property.name}" updated to: ${newValue.value}`);
      return true;
    },
    data: {
      label: PropertyRecord.fromString("Record 1"),
      categories: [{
        name: "Editable",
        label: "Editable",
        expand: true
      }, {
        name: "Readonly",
        label: "Readonly",
        expand: true
      }, {
        name: "Disabled",
        label: "Disabled",
        expand: true
      }],
      records: {
        Editable: createPropertyRecords("editable_"),
        Readonly: createPropertyRecords("readonly_", {
          isReadonly: true
        }),
        Disabled: createPropertyRecords("disabled_", {
          isDisabled: true
        })
      }
    }
  }
};
const AlwaysVisibleEditor = {
  args: {
    data: {
      label: PropertyRecord.fromString("Record 1"),
      categories: [{
        name: "Group_1",
        label: "Group 1",
        expand: true
      }, {
        name: "Group_2",
        label: "Group 2",
        expand: true
      }],
      records: {
        Group_1: [new PropertyRecord({
          valueFormat: PropertyValueFormat.Primitive,
          value: true
        }, {
          name: "toggleProperty",
          displayLabel: "Always visible toggle editor",
          typename: "boolean",
          editor: {
            name: "toggle"
          }
        }), new PropertyRecord({
          valueFormat: PropertyValueFormat.Primitive,
          value: false
        }, {
          name: "toggleProperty2",
          displayLabel: "Always visible toggle editor",
          typename: "boolean",
          editor: {
            name: "toggle"
          }
        })],
        Group_2: [new PropertyRecord({
          valueFormat: PropertyValueFormat.Primitive,
          value: true
        }, {
          name: "toggleProperty3",
          displayLabel: "Not always visible boolean editor",
          typename: "boolean"
        }), new PropertyRecord({
          valueFormat: PropertyValueFormat.Primitive,
          value: "Text"
        }, {
          name: "stringProperty",
          displayLabel: "Not always visible string editor",
          typename: "string"
        })],
        Group_3: []
      }
    },
    onPropertyContextMenu: void 0,
    isPropertyEditingEnabled: true,
    alwaysShowEditor: (propertyRecord) => propertyRecord.property.editor?.name === "toggle"
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Should not render" });
  }
});
rendererManager.registerRenderer("multiline", new MultilineTextPropertyValueRenderer());
function createPropertyRecords(prefix = "", recordProps) {
  return [createPropertyRecord({
    valueFormat: PropertyValueFormat.Primitive,
    value: "text value"
  }, {
    name: `${prefix}stringProperty`,
    displayLabel: "String Property",
    typename: StandardTypeNames.String
  }, recordProps), createPropertyRecord({
    valueFormat: PropertyValueFormat.Primitive,
    value: 42
  }, {
    name: `${prefix}intProperty`,
    displayLabel: "Int Property",
    typename: StandardTypeNames.Int
  }, recordProps), createPropertyRecord({
    valueFormat: PropertyValueFormat.Primitive,
    value: true,
    displayValue: "True"
  }, {
    name: `${prefix}boolProperty`,
    displayLabel: "Boolean Property",
    typename: StandardTypeNames.Boolean
  }, recordProps), createPropertyRecord({
    valueFormat: PropertyValueFormat.Primitive,
    value: /* @__PURE__ */ new Date()
  }, {
    name: `${prefix}dateProperty`,
    displayLabel: "Date Property",
    typename: StandardTypeNames.ShortDate
  }, recordProps), createPropertyRecord({
    valueFormat: PropertyValueFormat.Primitive,
    value: /* @__PURE__ */ new Date()
  }, {
    name: `${prefix}dateTimeProperty`,
    displayLabel: "DateTime Property",
    typename: StandardTypeNames.DateTime
  }, recordProps), createPropertyRecord({
    valueFormat: PropertyValueFormat.Primitive,
    value: 1
  }, {
    name: `${prefix}enumProperty`,
    displayLabel: "Enum Property",
    typename: StandardTypeNames.Enum,
    enum: {
      choices: [{
        value: 1,
        label: "Choice 1"
      }, {
        value: 2,
        label: "Choice 2"
      }, {
        value: 3,
        label: "Choice 3"
      }]
    }
  }, recordProps)];
}
function createPropertyRecord(value, property2, recordProps) {
  const record = new PropertyRecord(value, property2);
  record.isDisabled = recordProps?.isDisabled;
  record.isReadonly = recordProps?.isReadonly;
  return record;
}
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
    ...Basic.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    data: {\n      label: PropertyRecord.fromString("Record 1"),\n      categories: [{\n        name: "Group_1",\n        label: "Group 1",\n        expand: true\n      }, {\n        name: "Group_2",\n        label: "Group 2",\n        expand: false\n      }],\n      records: {\n        Group_1: [PropertyRecord.fromString("Record 1_1"), PropertyRecord.fromString("Record 1_2")],\n        Group_2: [PropertyRecord.fromString("Record 2_1"), PropertyRecord.fromString("Record 2_2")]\n      }\n    },\n    onPropertyContextMenu: undefined\n  }\n}',
      ...Basic.parameters?.docs?.source
    }
  }
};
StructRendering.parameters = {
  ...StructRendering.parameters,
  docs: {
    ...StructRendering.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    orientation: Orientation.Vertical,\n    propertyValueRendererManager: rendererManager,\n    data: {\n      label: PropertyRecord.fromString("Record 1"),\n      categories: [{\n        name: "structPropertyRendering",\n        label: "Struct property rendering",\n        expand: true\n      }],\n      records: {\n        structPropertyRendering: [new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: "string value"\n        }, {\n          name: "simpleProperty",\n          displayLabel: "Simple property",\n          typename: "string"\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: multilineString\n        }, {\n          name: "multilineProperty",\n          displayLabel: "Multiline property",\n          typename: "string",\n          renderer: {\n            name: "multiline"\n          }\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: undefined\n        }, {\n          name: "noValueStruct",\n          displayLabel: "Struct property with no value",\n          typename: "struct"\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Struct,\n          members: structMembers\n        }, {\n          name: "noRendererStructProperty",\n          displayLabel: "Struct property (no renderer)",\n          typename: "struct"\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Struct,\n          members: structMembers\n        }, {\n          name: "defaultRendererStructProperty",\n          displayLabel: "Struct property (default renderer)",\n          typename: "struct",\n          renderer: {\n            name: "defaultRendererPropertyRenderer"\n          }\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Struct,\n          members: structMembers\n        }, {\n          name: "customRendererStructProperty",\n          displayLabel: "Struct property (custom renderer)",\n          typename: "struct",\n          renderer: {\n            name: "customRendererStructPropertyRenderer"\n          }\n        })]\n      }\n    }\n  }\n}',
      ...StructRendering.parameters?.docs?.source
    }
  }
};
ArrayRendering.parameters = {
  ...ArrayRendering.parameters,
  docs: {
    ...ArrayRendering.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    orientation: Orientation.Horizontal,\n    propertyValueRendererManager: rendererManager,\n    data: {\n      label: PropertyRecord.fromString("Record 1"),\n      categories: [{\n        name: "arrayPropertyRendering",\n        label: "Array property rendering",\n        expand: true\n      }],\n      records: {\n        arrayPropertyRendering: [new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: "string value"\n        }, {\n          name: "simpleProperty",\n          displayLabel: "Simple property",\n          typename: "string"\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: multilineString\n        }, {\n          name: "multilineProperty",\n          displayLabel: "Multiline property",\n          typename: "string",\n          renderer: {\n            name: "multiline"\n          }\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Array,\n          items: [],\n          itemsTypeName: "array"\n        }, {\n          name: "emptyArray",\n          displayLabel: "Array property with no items",\n          typename: "array"\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Array,\n          items: arrayMembers,\n          itemsTypeName: "array"\n        }, {\n          name: "noRendererStructProperty",\n          displayLabel: "Array property (no renderer)",\n          typename: "array"\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Array,\n          items: arrayMembers,\n          itemsTypeName: "array"\n        }, {\n          name: "defaultRendererArrayProperty",\n          displayLabel: "Array property (default renderer)",\n          typename: "array",\n          renderer: {\n            name: "defaultRendererPropertyRenderer"\n          }\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Array,\n          items: arrayMembers,\n          itemsTypeName: "array"\n        }, {\n          name: "customRendererArrayPropertyRenderer",\n          displayLabel: "Array property (custom renderer)",\n          typename: "struct",\n          renderer: {\n            name: "customRendererArrayPropertyRenderer"\n          }\n        })]\n      }\n    }\n  }\n}',
      ...ArrayRendering.parameters?.docs?.source
    }
  }
};
NestedCategories.parameters = {
  ...NestedCategories.parameters,
  docs: {
    ...NestedCategories.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    orientation: Orientation.Horizontal,\n    data: {\n      label: PropertyRecord.fromString("Record 1"),\n      categories: [{\n        name: "category1",\n        label: "Category 1",\n        expand: true,\n        childCategories: [{\n          name: "category11",\n          label: "Category 1-1",\n          expand: true,\n          childCategories: [{\n            name: "category111",\n            label: "Category 1-1-1",\n            expand: true\n          }, {\n            name: "category112",\n            label: "Category 1-1-2",\n            expand: true\n          }]\n        }, {\n          name: "category12",\n          label: "Category 1-2",\n          expand: true\n        }]\n      }, {\n        name: "category2",\n        label: "Category 2",\n        expand: true,\n        childCategories: [{\n          name: "category21",\n          label: "Category 2-1",\n          expand: true,\n          childCategories: [{\n            name: "category211",\n            label: "Category 2-1-1",\n            expand: true\n          }, {\n            name: "category212",\n            label: "Category 2-1-2",\n            expand: true\n          }]\n        }, {\n          name: "category22",\n          label: "Category 2-2",\n          expand: true\n        }]\n      }],\n      records: {\n        category1: createDefaultRecords(),\n        category11: createDefaultRecords(),\n        category111: createDefaultRecords(),\n        category112: createDefaultRecords(),\n        category12: createDefaultRecords(),\n        category2: createDefaultRecords(),\n        category21: createDefaultRecords(),\n        category211: createDefaultRecords(),\n        category212: createDefaultRecords(),\n        category22: createDefaultRecords()\n      }\n    }\n  }\n}',
      ...NestedCategories.parameters?.docs?.source
    }
  }
};
Links.parameters = {
  ...Links.parameters,
  docs: {
    ...Links.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    data: {\n      label: PropertyRecord.fromString("Record 1"),\n      categories: [{\n        name: "Group_1",\n        label: "Group 1",\n        expand: true\n      }],\n      records: {\n        Group_1: [PropertyRecord.fromString("https://www.bentley.com"), PropertyRecord.fromString("pw://test")]\n      }\n    },\n    onPropertyContextMenu: undefined\n  }\n}',
      ...Links.parameters?.docs?.source
    }
  }
};
Editable.parameters = {
  ...Editable.parameters,
  docs: {
    ...Editable.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    height: 1000,\n    isPropertyEditingEnabled: true,\n    onPropertyUpdated: async ({\n      propertyRecord,\n      newValue\n    }) => {\n      action("onPropertyUpdated")(`Property "${propertyRecord.property.name}" updated to: ${(newValue as PrimitiveValue).value}`);\n      return true;\n    },\n    data: {\n      label: PropertyRecord.fromString("Record 1"),\n      categories: [{\n        name: "Editable",\n        label: "Editable",\n        expand: true\n      }, {\n        name: "Readonly",\n        label: "Readonly",\n        expand: true\n      }, {\n        name: "Disabled",\n        label: "Disabled",\n        expand: true\n      }],\n      records: {\n        Editable: createPropertyRecords("editable_"),\n        Readonly: createPropertyRecords("readonly_", {\n          isReadonly: true\n        }),\n        Disabled: createPropertyRecords("disabled_", {\n          isDisabled: true\n        })\n      }\n    }\n  }\n}',
      ...Editable.parameters?.docs?.source
    }
  }
};
AlwaysVisibleEditor.parameters = {
  ...AlwaysVisibleEditor.parameters,
  docs: {
    ...AlwaysVisibleEditor.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    data: {\n      label: PropertyRecord.fromString("Record 1"),\n      categories: [{\n        name: "Group_1",\n        label: "Group 1",\n        expand: true\n      }, {\n        name: "Group_2",\n        label: "Group 2",\n        expand: true\n      }],\n      records: {\n        Group_1: [new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: true\n        }, {\n          name: "toggleProperty",\n          displayLabel: "Always visible toggle editor",\n          typename: "boolean",\n          editor: {\n            name: "toggle"\n          }\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: false\n        }, {\n          name: "toggleProperty2",\n          displayLabel: "Always visible toggle editor",\n          typename: "boolean",\n          editor: {\n            name: "toggle"\n          }\n        })],\n        Group_2: [new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: true\n        }, {\n          name: "toggleProperty3",\n          displayLabel: "Not always visible boolean editor",\n          typename: "boolean"\n        }), new PropertyRecord({\n          valueFormat: PropertyValueFormat.Primitive,\n          value: "Text"\n        }, {\n          name: "stringProperty",\n          displayLabel: "Not always visible string editor",\n          typename: "string"\n        })],\n        Group_3: []\n      }\n    },\n    onPropertyContextMenu: undefined,\n    isPropertyEditingEnabled: true,\n    alwaysShowEditor: (propertyRecord: PropertyRecord) => propertyRecord.property.editor?.name === "toggle"\n  }\n}',
      ...AlwaysVisibleEditor.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic", "StructRendering", "ArrayRendering", "NestedCategories", "Links", "Editable", "AlwaysVisibleEditor"];
export {
  AlwaysVisibleEditor,
  ArrayRendering,
  Basic,
  Editable,
  Links,
  NestedCategories,
  StructRendering,
  __namedExportsOrder,
  meta as default
};
