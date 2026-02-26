import { r as reactExports, j as jsxRuntimeExports, R as React } from "./iframe-BENp4d1r.js";
import { h as BeUiEvent, d as ProgressRadial, n as PropertyRecord } from "./Key.enum-CnwI7CFN.js";
import { bR as __extends, cC as dateTimestampProvider, cD as popScheduler, cx as from, cE as popNumber, c0 as innerFrom, cF as mergeAll, c3 as operate, c6 as createOperatorSubscriber, c8 as mergeMap, c7 as isFunction, c5 as identity, c2 as noop, cG as toRxjsObservable, cH as MutableTreeModel, cv as produce, cI as concatAll, aZ as UiError, ar as UiComponents, cJ as map, cK as isTreeModelNode, cL as hasSelectionModeFlag, cM as SelectionModeFlags, cN as SelectionMode, cO as Rectangle, cP as isNavigationKey, cQ as ItemKeyboardNavigator, ac as Orientation, cR as concat, ca as subscribeOn, cS as TreeNodeRenderer, cT as computeVisibleNodes, cU as TreeRenderer, cV as useTranslation, co as FillCentered, j as IModelApp, U as UiFramework } from "./appui-react-CEufDDhs.js";
import { A as AppUiDecorator } from "./Decorators-DexZH3uj.js";
import { b as Subject, E as EMPTY, s as share, S as SubscriptionScheduler, d as defer, a as scheduleSubscription, f as finalize, c as asapScheduler } from "./SubscriptionScheduler-CMGkv2CE.js";
import "./preload-helper-UZRgTS1n.js";
import "./client-S7MnCWX8.js";
import "./index-CsG4pdOs.js";
function useDisposable(createDisposable) {
  const [value, setValue] = reactExports.useState(() => createDisposable());
  const prevValue = reactExports.useRef(value);
  const useInitialValue = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (!useInitialValue.current) {
      prevValue.current = createDisposable();
      setValue(prevValue.current);
    }
    useInitialValue.current = false;
    return () => {
      prevValue.current.dispose();
    };
  }, [createDisposable]);
  return value;
}
var ReplaySubject = function(_super) {
  __extends(ReplaySubject2, _super);
  function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
    if (_bufferSize === void 0) {
      _bufferSize = Infinity;
    }
    if (_windowTime === void 0) {
      _windowTime = Infinity;
    }
    if (_timestampProvider === void 0) {
      _timestampProvider = dateTimestampProvider;
    }
    var _this = _super.call(this) || this;
    _this._bufferSize = _bufferSize;
    _this._windowTime = _windowTime;
    _this._timestampProvider = _timestampProvider;
    _this._buffer = [];
    _this._infiniteTimeWindow = true;
    _this._infiniteTimeWindow = _windowTime === Infinity;
    _this._bufferSize = Math.max(1, _bufferSize);
    _this._windowTime = Math.max(1, _windowTime);
    return _this;
  }
  ReplaySubject2.prototype.next = function(value) {
    var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
    if (!isStopped) {
      _buffer.push(value);
      !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
    }
    this._trimBuffer();
    _super.prototype.next.call(this, value);
  };
  ReplaySubject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._trimBuffer();
    var subscription = this._innerSubscribe(subscriber);
    var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
    var copy = _buffer.slice();
    for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(copy[i]);
    }
    this._checkFinalizedStatuses(subscriber);
    return subscription;
  };
  ReplaySubject2.prototype._trimBuffer = function() {
    var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
    var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
    _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
    if (!_infiniteTimeWindow) {
      var now = _timestampProvider.now();
      var last = 0;
      for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
        last = i;
      }
      last && _buffer.splice(0, last + 1);
    }
  };
  return ReplaySubject2;
}(Subject);
function of() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  return from(args, scheduler);
}
function merge() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  var concurrent = popNumber(args, Infinity);
  var sources = args;
  return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
}
function filter(predicate, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}
function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
  return function(source, subscriber) {
    var hasState = hasSeed;
    var state = seed;
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var i = index++;
      state = hasState ? accumulator(state, value, i) : (hasState = true, value);
    }, function() {
      hasState && subscriber.next(state);
      subscriber.complete();
    }));
  };
}
function reduce(accumulator, seed) {
  return operate(scanInternals(accumulator, seed, arguments.length >= 2, false, true));
}
var arrReducer = function(arr, value) {
  return arr.push(value), arr;
};
function toArray() {
  return operate(function(source, subscriber) {
    reduce(arrReducer, [])(source).subscribe(subscriber);
  });
}
function concatMap(project, resultSelector) {
  return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
}
function distinctUntilChanged(comparator, keySelector) {
  if (keySelector === void 0) {
    keySelector = identity;
  }
  comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
  return operate(function(source, subscriber) {
    var previousKey;
    var first = true;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var currentKey = keySelector(value);
      if (first || !comparator(previousKey, currentKey)) {
        first = false;
        previousKey = currentKey;
        subscriber.next(value);
      }
    }));
  });
}
function defaultCompare(a, b) {
  return a === b;
}
function shareReplay(configOrBufferSize, windowTime, scheduler) {
  var _a, _b, _c;
  var bufferSize;
  var refCount = false;
  if (configOrBufferSize && typeof configOrBufferSize === "object") {
    _a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler;
  } else {
    bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
  }
  return share({
    connector: function() {
      return new ReplaySubject(bufferSize, windowTime, scheduler);
    },
    resetOnError: true,
    resetOnComplete: false,
    resetOnRefCountZero: refCount
  });
}
function takeUntil(notifier) {
  return operate(function(source, subscriber) {
    innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
      return subscriber.complete();
    }, noop));
    !subscriber.closed && source.subscribe(subscriber);
  });
}
const isTreeDataProviderRaw = (provider) => {
  return Array.isArray(provider);
};
const isTreeDataProviderPromise = (provider) => {
  return void 0 !== provider.then;
};
const isTreeDataProviderMethod = (provider) => {
  return typeof provider === "function";
};
const isTreeDataProviderInterface = (provider) => {
  const candidate = provider;
  return void 0 !== candidate.getNodes && void 0 !== candidate.getNodesCount;
};
class SimpleTreeDataProvider {
  _hierarchy;
  constructor(hierarchy) {
    this._hierarchy = hierarchy;
  }
  getNodesByParentId(parentId, pageOptions) {
    const nodes = this._hierarchy.get(parentId);
    if (!nodes)
      return [];
    if (!pageOptions)
      return [...nodes];
    let pageEndIndex;
    if (pageOptions.size !== void 0 && pageOptions.size !== 0) {
      pageEndIndex = pageOptions.size;
      pageEndIndex += pageOptions.start ? pageOptions.start : 0;
    }
    return nodes.slice(pageOptions.start, pageEndIndex);
  }
  async getNodes(parent, pageOptions) {
    return this.getNodesByParentId(parent ? parent.id : void 0, pageOptions);
  }
  async getNodesCount(parent) {
    return this.getNodesByParentId(parent ? parent.id : void 0).length;
  }
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
class TreeModelMutator {
  _modelSource;
  _nodeLoader;
  _collapsedChildrenDisposalEnabled;
  constructor(modelSource, nodeLoader, collapsedChildrenDisposalEnabled) {
    this._modelSource = modelSource;
    this._nodeLoader = nodeLoader;
    this._collapsedChildrenDisposalEnabled = collapsedChildrenDisposalEnabled;
  }
  get modelSource() {
    return this._modelSource;
  }
  expandNode(nodeId) {
    let needToLoadChildren = false;
    this._modelSource.modifyModel((model) => {
      const node = model.getNode(nodeId);
      if (node === void 0 || node.isExpanded) {
        return;
      }
      needToLoadChildren = node.numChildren === void 0;
      node.isExpanded = true;
      if (needToLoadChildren) {
        node.isLoading = true;
      }
    });
    const expandedNode = this._modelSource.getModel().getNode(nodeId);
    return needToLoadChildren && expandedNode ? this._nodeLoader.loadNode(expandedNode, 0) : EMPTY;
  }
  collapseNode(nodeId) {
    this._modelSource.modifyModel((model) => {
      const node = model.getNode(nodeId);
      if (node === void 0 || !node.isExpanded) {
        return;
      }
      node.isExpanded = false;
      if (this._collapsedChildrenDisposalEnabled) {
        model.clearChildren(node.id);
      }
    });
  }
  modifySelection(nodesToSelect, nodesToDeselect) {
    this._modelSource.modifyModel((model) => {
      for (const nodeItem of nodesToSelect) {
        const node = model.getNode(nodeItem.id);
        if (node !== void 0) {
          node.isSelected = true;
        }
      }
      for (const nodeItem of nodesToDeselect) {
        const node = model.getNode(nodeItem.id);
        if (node !== void 0) {
          node.isSelected = false;
        }
      }
    });
  }
  replaceSelection(nodesToSelect) {
    this._modelSource.modifyModel((model) => {
      for (const node of model.iterateTreeModelNodes()) {
        node.isSelected = false;
      }
      for (const nodeItem of nodesToSelect) {
        const node = model.getNode(nodeItem.id);
        if (node !== void 0) {
          node.isSelected = true;
        }
      }
    });
  }
  clearNodeSelection() {
    this._modelSource.modifyModel((model) => {
      for (const node of model.iterateTreeModelNodes()) {
        node.isSelected = false;
      }
    });
  }
  setCheckboxStates(stateChanges) {
    this._modelSource.modifyModel((model) => {
      for (const { nodeItem, newState } of stateChanges) {
        const node = model.getNode(nodeItem.id);
        if (node !== void 0) {
          node.checkbox.state = newState;
        }
      }
    });
  }
  activateEditing(nodeId, onCommit) {
    this._modelSource.modifyModel((model) => {
      const node = model.getNode(nodeId);
      if (!node)
        return;
      if (node.item.isEditable) {
        node.editingInfo = this.createNodeEditingInfo(nodeId, onCommit);
      }
    });
  }
  createNodeEditingInfo(nodeId, onCommit) {
    const closeEditing = () => {
      this._modelSource.modifyModel((model) => {
        const node = model.getNode(nodeId);
        if (!node)
          return;
        node.editingInfo = void 0;
      });
    };
    const onEditCommitted = (node, newValue) => {
      onCommit(node, newValue);
      closeEditing();
    };
    return { onCommit: onEditCommitted, onCancel: closeEditing };
  }
}
class TreeEventHandler {
  _modelMutator;
  _editingParams;
  _disposed = new Subject();
  _selectionReplaced = new Subject();
  constructor(params) {
    this._modelMutator = new TreeModelMutator(params.modelSource, params.nodeLoader, !!params.collapsedChildrenDisposalEnabled);
    this._editingParams = params.editingParams;
  }
  #dispose() {
    this._disposed.next();
  }
  /** Destructor. Must be called to clean up.  */
  [Symbol.dispose]() {
    this.#dispose();
  }
  /** Disposes tree event handler.
   * @deprecated in 5.5.0. Use `[Symbol.dispose]` instead.
   */
  dispose() {
    this.#dispose();
  }
  get modelSource() {
    return this._modelMutator.modelSource;
  }
  /** Expands node and starts loading children. */
  onNodeExpanded({ nodeId }) {
    toRxjsObservable(this._modelMutator.expandNode(nodeId)).pipe(takeUntil(this._disposed)).subscribe();
  }
  /** Collapses node */
  onNodeCollapsed({ nodeId }) {
    this._modelMutator.collapseNode(nodeId);
  }
  /** Selects and deselects nodes until event is handled, handler is disposed or selection replaced event occurs. */
  onSelectionModified({ modifications }) {
    return toRxjsObservable(modifications).pipe(takeUntil(this._disposed), takeUntil(this._selectionReplaced)).subscribe({
      next: ({ selectedNodeItems, deselectedNodeItems }) => {
        this._modelMutator.modifySelection(selectedNodeItems, deselectedNodeItems);
      }
    });
  }
  /** Replaces currently selected nodes until event is handled, handler is disposed or another selection replaced event occurs. */
  onSelectionReplaced({ replacements }) {
    this._selectionReplaced.next();
    let firstEmission = true;
    return toRxjsObservable(replacements).pipe(takeUntil(this._disposed), takeUntil(this._selectionReplaced)).subscribe({
      next: ({ selectedNodeItems }) => {
        if (firstEmission) {
          firstEmission = false;
          this._modelMutator.replaceSelection(selectedNodeItems);
        }
        this._modelMutator.modifySelection(selectedNodeItems, []);
      }
    });
  }
  /** Changes nodes checkbox states. */
  onCheckboxStateChanged({ stateChanges }) {
    return stateChanges.subscribe((changes) => this._modelMutator.setCheckboxStates(changes));
  }
  /** Activates node editing if editing parameters are supplied and node is editable. */
  onDelayedNodeClick({ nodeId }) {
    this.activateEditor(nodeId);
  }
  /** This method is declared here to be overridden by classes that extend TreeEventHandler */
  onNodeDoubleClick(_) {
  }
  /** Activates node editing if editing parameters are supplied and node is editable. */
  onNodeEditorActivated({ nodeId }) {
    this.activateEditor(nodeId);
  }
  /** Activates node editing if editing parameters are supplied and node is editable. */
  activateEditor(nodeId) {
    if (this._editingParams === void 0)
      return;
    this._modelMutator.activateEditing(nodeId, this._editingParams.onNodeUpdated);
  }
}
class TreeModelSource {
  _model;
  /** Event that is emitted every time tree model is changed. */
  onModelChanged = new BeUiEvent();
  constructor(_model = new MutableTreeModel()) {
    this._model = _model;
  }
  /**
   * Modifies tree model using provided callback.
   * If changes to tree model is detected then onModelChanged event is emitted.
   */
  modifyModel(callback) {
    let changes = {
      addedNodeIds: [],
      modifiedNodeIds: [],
      removedNodeIds: []
    };
    const newModel = produce(this._model, (draft) => callback(draft), (patches) => {
      changes = this.collectModelChanges(patches);
    });
    if (newModel !== this._model) {
      this._model = newModel;
      this.onModelChanged.emit([this._model, changes]);
    }
  }
  /** Returns tree model. */
  getModel() {
    return this._model;
  }
  collectModelChanges(modelPatches) {
    const addedNodeIds = [];
    const modifiedNodeIds = /* @__PURE__ */ new Set();
    const removedNodeIds = [];
    for (const patch of modelPatches) {
      if (patch.path.length >= 3 && patch.path[0] === "_tree" && patch.path[1] === "_idToNode") {
        const nodeId = patch.path[2];
        if (patch.path.length > 3) {
          modifiedNodeIds.add(nodeId);
          continue;
        }
        switch (patch.op) {
          case "add":
            addedNodeIds.push(nodeId);
            break;
          case "remove":
            removedNodeIds.push(nodeId);
            break;
          case "replace":
            modifiedNodeIds.add(nodeId);
            break;
        }
      }
    }
    return {
      addedNodeIds,
      modifiedNodeIds: [...modifiedNodeIds],
      removedNodeIds
    };
  }
}
class AbstractTreeNodeLoader {
  _treeModelSource;
  _loadScheduler = new SubscriptionScheduler();
  constructor(modelSource) {
    this._treeModelSource = modelSource;
  }
  get modelSource() {
    return this._treeModelSource;
  }
  /** Do not override this method. @see `load` */
  loadNode(parent, childIndex) {
    return toRxjsObservable(this.load(parent, childIndex)).pipe(scheduleSubscription(this._loadScheduler), map((loadedHierarchy) => {
      this.updateModel(loadedHierarchy);
      return {
        loadedNodes: collectTreeNodeItems(loadedHierarchy.hierarchyItems)
      };
    }));
  }
  /**
   * A method that's called when `load` loads some nodes and we need to put them into model source. The
   * default implementation simply puts loaded child nodes under their parent at correct positions. Concrete
   * implementation may override this method to handle loaded nodes in a a custom way (put them at custom locations
   * in the hierarchy, etc.)
   */
  updateModel(loadedHierarchy) {
    handleLoadedNodeHierarchy(this._treeModelSource, loadedHierarchy);
  }
}
class AbstractTreeNodeLoaderWithProvider extends AbstractTreeNodeLoader {
  _dataProvider;
  constructor(modelSource, dataProvider) {
    super(modelSource);
    this._dataProvider = dataProvider;
  }
  get dataProvider() {
    return this._dataProvider;
  }
}
class TreeNodeLoader extends AbstractTreeNodeLoaderWithProvider {
  _treeDataSource;
  _activeRequests = /* @__PURE__ */ new Map();
  _scheduler = new SubscriptionScheduler();
  constructor(dataProvider, modelSource) {
    super(modelSource, dataProvider);
    this._treeDataSource = new TreeDataSource(dataProvider);
  }
  /**
   * Schedules to load children of node and returns an Observable.
   * @note It does not start loading node until '.subscribe()' is called on returned Observable.
   */
  loadNode(parent, _childIndex) {
    return defer(() => {
      const parentItem = isTreeModelNode(parent) ? parent.item : void 0;
      const parentId = parentItem?.id;
      const activeRequest = this._activeRequests.get(parentId);
      if (activeRequest) {
        return activeRequest;
      }
      const newRequest = requestLoadedHierarchy(parentItem, this._treeDataSource, 0, 0, parent.numChildren === void 0).pipe(scheduleSubscription(this._scheduler), map((loadedHierarchy) => {
        this.updateModel(loadedHierarchy);
        return {
          loadedNodes: collectTreeNodeItems(loadedHierarchy.hierarchyItems)
        };
      }), finalize(() => this._activeRequests.delete(parentId)));
      this._activeRequests.set(parentId, newRequest);
      return newRequest;
    });
  }
  load() {
    throw new Error("Method not implemented.");
  }
}
function requestLoadedHierarchy(parentItem, dataSource, start, take, requestNumChildren) {
  const parentId = parentItem && parentItem.id;
  return dataSource.requestItems(parentItem, start, take, requestNumChildren).pipe(concatMap(({ numChildren, loadedItems }) => loadHierarchy(loadedItems, dataSource, take).pipe(map((hierarchyItems) => ({
    parentId,
    offset: start,
    hierarchyItems,
    numChildren
  })))));
}
function loadHierarchy(rootItems, dataSource, take) {
  return from(rootItems).pipe(concatMap((item) => {
    if (!item.autoExpand || item.children) {
      return of(convertToLoadedNodeHierarchyItem(item));
    }
    return dataSource.requestItems(item, 0, take, true).pipe(concatMap(({ numChildren, loadedItems }) => loadHierarchy(loadedItems, dataSource, take).pipe(map((children) => ({ item, children, numChildren })))));
  }), toArray());
}
function convertToLoadedNodeHierarchyItem(item) {
  return {
    item,
    children: item.children ? item.children.map((child) => convertToLoadedNodeHierarchyItem(child)) : void 0,
    numChildren: item.children ? item.children.length : void 0
  };
}
function collectTreeNodeItems(hierarchyItems, result = []) {
  for (const hierarchyItem of hierarchyItems) {
    result.push(hierarchyItem.item);
    if (hierarchyItem.children)
      collectTreeNodeItems(hierarchyItem.children, result);
  }
  return result;
}
function handleLoadedNodeHierarchy(modelSource, loadedHierarchy) {
  modelSource.modifyModel((model) => {
    if (loadedHierarchy.parentId !== void 0) {
      if (model.getNode(loadedHierarchy.parentId) === void 0)
        return;
    }
    updateChildren(model, loadedHierarchy.parentId, loadedHierarchy.hierarchyItems, loadedHierarchy.offset, loadedHierarchy.numChildren);
    if (loadedHierarchy.parentId !== void 0) {
      const parentNode = model.getNode(loadedHierarchy.parentId);
      if (parentNode && parentNode.isLoading && parentNode.numChildren !== void 0) {
        parentNode.isLoading = false;
      }
    }
  });
}
function updateChildren(model, parentId, hierarchyItems, startIndex, numChildren) {
  if (numChildren !== void 0) {
    model.setNumChildren(parentId, numChildren);
  }
  if (model.getChildren(parentId) === void 0) {
    return;
  }
  let offset = startIndex;
  for (const hierarchyItem of hierarchyItems) {
    const nodeInput = convertToTreeModelNodeInput(hierarchyItem.item);
    const existingNode = model.getNode(hierarchyItem.item.id);
    if (!existingNode || !existingNode.isExpanded || model.getChildOffset(parentId, existingNode.id) !== offset || nodeInput.numChildren === 0) {
      model.setChildren(parentId, [nodeInput], offset);
    } else {
      existingNode.label = nodeInput.label;
      existingNode.description = nodeInput.description ?? "";
      existingNode.item = nodeInput.item;
    }
    if (hierarchyItem.children) {
      updateChildren(model, hierarchyItem.item.id, hierarchyItem.children, 0, hierarchyItem.numChildren);
    }
    offset++;
  }
}
function convertToTreeModelNodeInput(item) {
  let numChildren;
  if (item.children) {
    numChildren = item.children.length;
  } else if (!item.hasChildren) {
    numChildren = 0;
  }
  return {
    description: item.description,
    isExpanded: !!item.autoExpand,
    id: item.id,
    item,
    label: item.label,
    isLoading: false,
    numChildren,
    isSelected: false
  };
}
class TreeDataSource {
  _dataProvider;
  constructor(dataProvider) {
    this._dataProvider = dataProvider;
  }
  requestItems(parent, firstItemIndex, numItems, requestNumChildren) {
    return defer(async () => {
      if (isTreeDataProviderInterface(this._dataProvider)) {
        const dataProvider = this._dataProvider;
        return from(requestNumChildren ? dataProvider.getNodesCount(parent) : [void 0]).pipe(concatMap(async (numChildren) => {
          const pageOptions = numItems !== 0 ? { size: numItems, start: firstItemIndex } : void 0;
          return {
            loadedItems: await dataProvider.getNodes(parent, pageOptions),
            numChildren
          };
        }));
      }
      return from(this.getItems(parent)).pipe(map((loadedItems) => ({
        loadedItems: numItems !== 0 ? loadedItems.slice(firstItemIndex, firstItemIndex + numItems) : loadedItems,
        numChildren: loadedItems.length
      })));
    }).pipe(concatAll(), share({
      resetOnError: false,
      resetOnComplete: false,
      resetOnRefCountZero: true
    }));
  }
  async getItems(parent) {
    if (isTreeDataProviderRaw(this._dataProvider)) {
      return this.getChildren(this._dataProvider, parent);
    }
    if (isTreeDataProviderMethod(this._dataProvider)) {
      return this._dataProvider(parent);
    }
    if (isTreeDataProviderPromise(this._dataProvider)) {
      this._dataProvider = await this._dataProvider;
      return this.getChildren(this._dataProvider, parent);
    }
    throw new UiError(UiComponents.loggerCategory("TreeDataSource"), "Unsupported TreeDataProvider.");
  }
  getChildren(rawProvider, parent) {
    if (parent === void 0)
      return rawProvider;
    return parent.children ?? [];
  }
}
function useTreeModel(modelSource) {
  const [_, setState] = reactExports.useState({});
  reactExports.useEffect(() => {
    const forceRender = () => setState({});
    forceRender();
    return modelSource.onModelChanged.addListener(forceRender);
  }, [modelSource]);
  return modelSource.getModel();
}
function useTreeNodeLoader(dataProvider, modelSource) {
  return reactExports.useMemo(() => new TreeNodeLoader(dataProvider, modelSource), [dataProvider, modelSource]);
}
function useTreeModelSource(dataProvider) {
  return reactExports.useMemo(() => new TreeModelSource(), [dataProvider]);
}
function useTreeEventsHandler(factoryOrParams) {
  const factory = reactExports.useCallback(() => {
    if (typeof factoryOrParams === "function")
      return factoryOrParams();
    return new TreeEventHandler(factoryOrParams);
  }, [factoryOrParams]);
  return useDisposable(factory);
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
    const timer = setTimeout(update, delay - diff);
    return () => clearTimeout(timer);
  });
  if (diff < delay)
    return null;
  return reactExports.createElement(ProgressRadial, { "data-testid": "components-delayed-spinner", indeterminate: true, size: props.size ?? "large" });
}
const useForceUpdate = () => {
  const [value, set] = reactExports.useState(true);
  return () => set(!value);
};
class BatchSelectionOperation {
  selections = new Array();
  deselections = new Array();
  shouldReplace;
  _componentSelectionHandler;
  constructor(componentSelectionHandler, shouldReplace) {
    this.shouldReplace = shouldReplace;
    this._componentSelectionHandler = componentSelectionHandler;
  }
  select(node) {
    this.addNodes(node, this.selections, this.shouldReplace ? void 0 : this.deselections);
  }
  deselect(node) {
    this.addNodes(node, this.deselections, this.shouldReplace ? void 0 : this.selections);
  }
  addNodes(node, addTo, removeFrom) {
    if (Array.isArray(node)) {
      for (const n of node) {
        if (removeFrom) {
          const index = removeFrom.findIndex((x) => this._componentSelectionHandler.areEqual(x, n));
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
  _itemSelectionHandlers;
  _componentSelectionHandler;
  _previousRow;
  _previousColumn;
  _firstItemRow;
  _firstItemColumn;
  _firstItemSelected;
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
    const currentRange = Rectangle.createXYXY(this._firstItemColumn, this._firstItemRow, currentPos.x, currentPos.y);
    const previousRange = Rectangle.createXYXY(this._firstItemColumn, this._firstItemRow, this._previousColumn, this._previousRow);
    const wholeRange = Rectangle.createXYXY(currentRange.right > previousRange.right ? currentRange.right : previousRange.right, currentRange.bottom > previousRange.bottom ? currentRange.bottom : previousRange.bottom, currentRange.left < previousRange.left ? currentRange.left : previousRange.left, currentRange.top < previousRange.top ? currentRange.top : previousRange.top);
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
    if (this._previousRow !== void 0 && this._previousRow !== -1 && this._previousColumn !== void 0 && this._previousColumn !== -1 && this._componentSelectionHandler.areEqual(itemSelectionHandlers[this._previousRow][this._previousColumn].item(), item)) {
      return { y: this._previousRow, x: this._previousColumn };
    }
    for (let row = 0; row < itemSelectionHandlers.length; row++) {
      for (let column = 0; column < itemSelectionHandlers[row].length; column++) {
        if (this._componentSelectionHandler.areEqual(itemSelectionHandlers[row][column].item(), item))
          return { x: column, y: row };
      }
    }
    return { x: -1, y: -1 };
  }
}
class SelectionHandler {
  /** Selection mode. */
  selectionMode;
  onItemsSelectedCallback;
  onItemsDeselectedCallback;
  _currentOperation;
  _lastItem;
  // keeps track of last item interacted with for shift selection
  _processedItem;
  // last item interacted with
  _dragAction;
  _componentSelectionHandler;
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
        const shouldReplace = hasSelectionModeFlag(this.selectionMode, SelectionModeFlags.KeysEnabled) && !ctrlDown || hasSelectionModeFlag(this.selectionMode, SelectionModeFlags.SelectionLimitOne);
        this._currentOperation = new BatchSelectionOperation(componentHandler, shouldReplace);
        operationCreated = true;
      }
      if (hasSelectionModeFlag(this.selectionMode, SelectionModeFlags.KeysEnabled)) {
        if (!ctrlDown)
          componentHandler.deselectAll();
        if (shiftDown && this._lastItem !== void 0) {
          const selected = componentHandler.selectBetween(this._lastItem, itemHandler.item());
          this._currentOperation.select(selected);
          shiftSelected = true;
        }
      }
      if (!shiftSelected) {
        itemHandler.preselect();
        if (hasSelectionModeFlag(this.selectionMode, SelectionModeFlags.SelectionLimitOne) && !(hasSelectionModeFlag(this.selectionMode, SelectionModeFlags.ToggleEnabled) && itemHandler.isSelected())) {
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
        this.onItemsSelectedCallback(this._currentOperation.selections, this._currentOperation.shouldReplace);
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
    this._dragAction = new DragAction(componentSelectionHandler, items, firstItem);
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
        this._currentOperation = new BatchSelectionOperation(this._componentSelectionHandler, false);
      this._currentOperation.select(selectionChanges.selections);
      this._currentOperation.deselect(selectionChanges.deselections);
      this._componentSelectionHandler.updateSelection(selectionChanges.selections, selectionChanges.deselections);
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
function isRangeSelection(selection) {
  return selection && typeof selection.from === "string" && typeof selection.to === "string";
}
class TreeSelectionManager {
  _selectionHandler;
  _dragSelectionOperation;
  _itemHandlers;
  _getVisibleNodes;
  onSelectionChanged = new BeUiEvent();
  onSelectionReplaced = new BeUiEvent();
  onDragSelection = new BeUiEvent();
  constructor(selectionMode, getVisibleNodes) {
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
    this._selectionHandler = new SelectionHandler(selectionMode, onItemsSelected, onItemsDeselected);
    const _this = this;
    const itemHandlers = new Proxy({}, {
      get(_target, prop) {
        if (prop === "length") {
          return _this._getVisibleNodes().getNumNodes();
        }
        const index = +prop;
        const node = _this.getVisibleNodeAtIndex(_this._getVisibleNodes(), index);
        return new ItemHandler(node);
      }
    });
    this._itemHandlers = [itemHandlers];
  }
  getVisibleNodeAtIndex(nodes, index) {
    const foundNode = nodes !== void 0 ? nodes.getAtIndex(index) : void 0;
    return isTreeModelNode(foundNode) ? foundNode : void 0;
  }
  onNodeClicked(nodeId, event) {
    const selectionFunc = this._selectionHandler.createSelectionFunction(...this.createSelectionHandlers(nodeId));
    selectionFunc(event.shiftKey, event.ctrlKey || event.metaKey);
  }
  onNodeMouseDown(nodeId) {
    this._selectionHandler.createDragAction(this.createSelectionHandlers(nodeId)[0], this._itemHandlers, nodeId);
    window.addEventListener("mouseup", () => {
      this._selectionHandler.completeDragAction();
      if (this._dragSelectionOperation) {
        this._dragSelectionOperation.complete();
        this._dragSelectionOperation = void 0;
      }
    }, { once: true });
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
  _onKeyboardEvent = (e, actions, isKeyDown) => {
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
      const selectionFunc = this._selectionHandler.createSelectionFunction(...this.createSelectionHandlers(node.id));
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
    const itemKeyboardNavigator = new ItemKeyboardNavigator(handleKeyboardSelectItem, handleKeyboardActivateItem);
    itemKeyboardNavigator.orientation = Orientation.Vertical;
    itemKeyboardNavigator.crossAxisArrowKeyHandler = handleCrossAxisArrowKey;
    itemKeyboardNavigator.allowWrap = false;
    itemKeyboardNavigator.itemCount = this._getVisibleNodes().getNumNodes();
    const processedNodeIndex = this._getVisibleNodes().getIndexOfNode(processedNodeId);
    isKeyDown ? itemKeyboardNavigator.handleKeyDownEvent(e, processedNodeIndex) : itemKeyboardNavigator.handleKeyUpEvent(e, processedNodeIndex);
  };
}
function isIndividualSelection(selection) {
  return typeof selection === "string";
}
class ItemHandler {
  _node;
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
    return !!this._node?.isSelected;
  }
  item() {
    return this._node?.id ?? "";
  }
}
class TreeEventDispatcher {
  _treeEvents;
  _nodeLoader;
  _getVisibleNodes;
  _selectionManager;
  _activeSelections = /* @__PURE__ */ new Set();
  constructor(treeEvents, nodeLoader, selectionMode, getVisibleNodes) {
    this._treeEvents = treeEvents;
    this._nodeLoader = nodeLoader;
    this._getVisibleNodes = getVisibleNodes;
    this._selectionManager = new TreeSelectionManager(selectionMode, this._getVisibleNodes);
    this._selectionManager.onDragSelection.addListener(({ selectionChanges }) => {
      const modifications = selectionChanges.pipe(map(({ selectedNodes, deselectedNodes }) => this.collectSelectionChanges(selectedNodes, []).pipe(concatMap(({ selectedNodeItems }) => from(selectedNodeItems)), toArray(), map((collectedIds) => ({
        selectedNodeItems: collectedIds,
        deselectedNodeItems: this.collectNodeItems(deselectedNodes)
      })))), concatAll(), shareReplay({
        refCount: true
      }));
      if (this._treeEvents.onSelectionModified !== void 0)
        this._treeEvents.onSelectionModified({ modifications });
    });
    this._selectionManager.onSelectionChanged.addListener(({ selectedNodes, deselectedNodes }) => {
      const modifications = merge(defer(() => {
        this._activeSelections.add(modifications);
        return EMPTY;
      }), this.collectSelectionChanges(selectedNodes, deselectedNodes)).pipe(finalize(() => {
        this._activeSelections.delete(modifications);
      }), shareReplay({
        refCount: true
      }));
      if (this._treeEvents.onSelectionModified !== void 0)
        this._treeEvents.onSelectionModified({ modifications });
    });
    this._selectionManager.onSelectionReplaced.addListener(({ selectedNodeIds }) => {
      const replacements = merge(defer(() => {
        this._activeSelections.add(replacements);
        return EMPTY;
      }), this.collectSelectionChanges(selectedNodeIds, [])).pipe(finalize(() => {
        this._activeSelections.delete(replacements);
      }), shareReplay({
        refCount: true
      }));
      if (this._treeEvents.onSelectionReplaced !== void 0)
        this._treeEvents.onSelectionReplaced({ replacements });
    });
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
    const stateChanges = concat(of(immediateStateChanges), from(this._activeSelections).pipe(mergeAll(), map(({ selectedNodeItems }) => selectedNodeItems.map((item) => ({ nodeItem: item, newState }))))).pipe(shareReplay({
      refCount: true
    }));
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
      return this.collectNodesBetween(selection.from, selection.to).pipe(map((selectedNodeItems, index) => {
        return {
          selectedNodeItems,
          deselectedNodeItems: index === 0 ? deselectedItems : []
        };
      }));
    }
    const selectedItems = this.collectNodeItems(selection);
    return of({
      selectedNodeItems: selectedItems,
      deselectedNodeItems: deselectedItems
    });
  }
  collectNodesBetween(nodeId1, nodeId2) {
    const [readyNodes, nodesToLoad] = TreeEventDispatcher.groupNodesByLoadingState(this.iterateNodesBetween(nodeId1, nodeId2));
    const loadedSelectedNodes = from(nodesToLoad.map((node) => {
      const parentNode = node.parentId ? this._getVisibleNodes().getModel().getNode(node.parentId) : this._getVisibleNodes().getModel().getRootNode();
      return parentNode ? toRxjsObservable(this._nodeLoader.loadNode(parentNode, node.childIndex)) : EMPTY;
    })).pipe(
      // We have requested multiple nodes that may belong to the same page.
      // When the page loads we only want to process the loaded nodes once.
      // Making assumption that loaded nodes from the same page will be emitted without interruptions.
      // Maybe we could simplify this to `this._nodeLoader.loadNodes(nodesToLoad)`?
      mergeAll(),
      distinctUntilChanged()
    );
    return concat(of(readyNodes.filter((node) => !node.isSelectionDisabled).map((node) => node.item)), loadedSelectedNodes.pipe(map(({ loadedNodes }) => loadedNodes.filter((item) => !item.isSelectionDisabled)))).pipe(
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
function ControlledTree(props) {
  const nodeHeight = useNodeHeight(!!props.descriptionsEnabled);
  const imageLoader = reactExports.useMemo(() => new TreeImageLoader(), []);
  const nodeRenderer = reactExports.useCallback((nodeProps) => reactExports.createElement(TreeNodeRenderer, { ...nodeProps, descriptionEnabled: props.descriptionsEnabled, imageLoader: props.iconsEnabled ? imageLoader : void 0 }), [props.descriptionsEnabled, props.iconsEnabled, imageLoader]);
  const visibleNodesRef = reactExports.useRef(void 0);
  visibleNodesRef.current = reactExports.useMemo(() => computeVisibleNodes(props.model), [props.model]);
  const eventDispatcher = reactExports.useMemo(() => new TreeEventDispatcher(props.eventsHandler, props.nodeLoader, props.selectionMode, () => visibleNodesRef.current), [props.eventsHandler, props.nodeLoader, props.selectionMode]);
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
  return reactExports.createElement(Loader, { loading, noData, spinnerRenderer: props.spinnerRenderer, noDataRenderer: props.noDataRenderer }, props.treeRenderer ? props.treeRenderer(treeProps) : reactExports.createElement(TreeRenderer, { ...treeProps }));
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
    return props.spinnerRenderer ? props.spinnerRenderer() : reactExports.createElement(
      "div",
      { className: "components-controlledTree-loader" },
      reactExports.createElement(DelayedSpinner, { size: "large" })
    );
  }
  if (props.noData) {
    return props.noDataRenderer ? props.noDataRenderer() : (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      reactExports.createElement(
        FillCentered,
        null,
        reactExports.createElement("p", { className: "components-controlledTree-errorMessage" }, translate("general.noData"))
      )
    );
  }
  return props.children;
}
function useNodeHeight(descriptionsEnabled) {
  return reactExports.useCallback((node) => {
    const contentHeight = isTreeModelNode(node) && descriptionsEnabled && node && node.description ? 43 : 24;
    const borderSize = 1;
    return contentHeight + borderSize;
  }, [descriptionsEnabled]);
}
const meta = {
  title: "Components/ControlledTree",
  component: TreeWidgetComponent,
  tags: ["autodocs"],
  decorators: [AppUiDecorator]
};
const Basic = {
  args: {
    width: 300,
    height: 300
  },
  render: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(TreeWidgetComponent, { ...props })
};
const createTreeNodeItem = (id, parentId) => {
  return {
    id,
    parentId,
    label: PropertyRecord.fromString(id, id)
  };
};
const createHierarchy = (rootNodeCount, childrenNodeCount) => {
  const hierarchy = /* @__PURE__ */ new Map();
  const rootNodes = [];
  for (let i = 0; i < rootNodeCount; i++) {
    rootNodes[i] = createTreeNodeItem(`Node ${i.toString()}`);
    const nodes = [];
    if (i !== 1) {
      for (let x = 0; x < childrenNodeCount; x++) {
        nodes[x] = createTreeNodeItem(`Node ${i.toString()}-${x.toString()}`, rootNodes[i].id);
        const innerNodes = [];
        if (x !== 1) {
          for (let y = 0; y < 3; y++) {
            innerNodes[y] = createTreeNodeItem(`Node ${i}-${x}-${y}`, rootNodes[i].id);
          }
          nodes[x].children = innerNodes;
        }
      }
      rootNodes[i].children = nodes;
      hierarchy.set(rootNodes[i].id, nodes);
    }
  }
  hierarchy.set(void 0, rootNodes);
  return hierarchy;
};
const hierarchyTest = createHierarchy(3, 3);
function TreeWidgetComponent(props) {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    void async function() {
      await IModelApp.startup();
      await UiFramework.initialize(void 0);
      setInitialized(true);
    }();
  }, []);
  const [dataProvider] = React.useState(() => new SimpleTreeDataProvider(hierarchyTest));
  const modelSource = useTreeModelSource(dataProvider);
  const nodeLoader = useTreeNodeLoader(dataProvider, modelSource);
  const eventsHandler = useTreeEventsHandler(React.useMemo(() => ({
    modelSource,
    nodeLoader
  }), [modelSource, nodeLoader]));
  const model = useTreeModel(modelSource);
  const defaultProps = {
    model,
    nodeLoader,
    eventsHandler,
    selectionMode: SelectionMode.Single,
    width: props.width,
    height: props.height
  };
  if (!initialized) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ControlledTree, { ...defaultProps });
}
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{\n  args: {\n    width: 300,\n    height: 300\n  },\n  render: props => <TreeWidgetComponent {...props} />\n}",
      ...Basic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
