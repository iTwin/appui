import { r as reactExports, C as useResizeObserver, A as useMergedRefs, e as reactDomExports, R as React, B as Box, c as classnames, aw as StatusIconMap, I as IconButton, y as polymorphic, D as getWindow, V as VisuallyHidden, x as getBoundedValue, S as Svg, ax as useFloatingTree, ay as useFloatingNodeId, az as useFloatingParentNodeId, aA as useControlledState, aB as usePopover, aC as useInteractions, aD as useListNavigation, L as useSyncExternalStore, z as mergeEventHandlers, aE as cloneElementWithRef, aF as mergeRefs, G as Portal, M as PopoverOpenContext, aG as FloatingNode, aH as FloatingTree, N as ButtonBase, g as Tooltip, aI as FloatingDelayGroup, aJ as defaultTooltipDelay, aK as SvgCloseSmall, aL as OverflowContainer, aM as useSafeContext, K as useLatestRef, E as useIsomorphicLayoutEffect$1, F as ShadowRoot, aN as useId, aO as PopoverInitialFocusContext, aP as isReact17or18, aQ as CompositeItem, aR as Composite, aS as useFutureFlag, T as ThemeProvider, h as commonjsGlobal, i as getDefaultExportFromCjs, k as requireReact, P as Popover, aT as ButtonGroup } from "./iframe-D6etZYKx.js";
import { o as useFocusableElements, e as ProgressRadial, u as useEventListener, l as BentleyError, m as BentleyStatus, g as BeUiEvent, L as Logger, k as BadgeType$1, K as Key_enumExports, R as RelativePosition, G as Guid, f as PropertyValueFormat, A as AlternateDateFormats, T as TimeDisplay, p as Id64, S as StandardTypeNames, B as Button, c as PropertyEditorParamTypes, d as StandardEditorNames, M as MessageSeverity, n as PropertyRecord, h as assert, q as lowerBound } from "./Key.enum-DxiaZ4K2.js";
import "./client-8d8O9vwT.js";
const isBefore = (beforeDate, afterDate) => {
  if (!beforeDate || !afterDate) return false;
  let firstDate = new Date(beforeDate);
  let secondDate = new Date(afterDate);
  firstDate && firstDate.setHours(0, 0, 0, 0);
  secondDate && secondDate.setHours(0, 0, 0, 0);
  return firstDate < secondDate;
};
const useContainerWidth = (watchResizes = true) => {
  let [contentWidth, setContentWidth] = reactExports.useState(0);
  let ref = reactExports.useCallback((element) => {
    if (!element) return;
    setContentWidth(element.getBoundingClientRect().width);
  }, []);
  let updateWidth = reactExports.useCallback(
    ({ width }) => setContentWidth(width),
    []
  );
  let [resizeRef, resizeObserver] = useResizeObserver(updateWidth);
  if (!watchResizes) resizeObserver?.disconnect();
  let refs = useMergedRefs(ref, watchResizes ? resizeRef : void 0);
  return [refs, contentWidth];
};
function memo(getDeps, fn, opts) {
  let deps = opts.initialDeps ?? [];
  let result;
  let isInitial = true;
  function memoizedFunction() {
    var _a, _b, _c;
    let depTime;
    if (opts.key && ((_a = opts.debug) == null ? void 0 : _a.call(opts))) depTime = Date.now();
    const newDeps = getDeps();
    const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep);
    if (!depsChanged) {
      return result;
    }
    deps = newDeps;
    let resultTime;
    if (opts.key && ((_b = opts.debug) == null ? void 0 : _b.call(opts))) resultTime = Date.now();
    result = fn(...newDeps);
    if (opts.key && ((_c = opts.debug) == null ? void 0 : _c.call(opts))) {
      const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
      const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
      const resultFpsPercentage = resultEndTime / 16;
      const pad = (str, num) => {
        str = String(str);
        while (str.length < num) {
          str = " " + str;
        }
        return str;
      };
      console.info(
        `%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * resultFpsPercentage, 120)
        )}deg 100% 31%);`,
        opts == null ? void 0 : opts.key
      );
    }
    if ((opts == null ? void 0 : opts.onChange) && !(isInitial && opts.skipInitialOnChange)) {
      opts.onChange(result);
    }
    isInitial = false;
    return result;
  }
  memoizedFunction.updateDeps = (newDeps) => {
    deps = newDeps;
  };
  return memoizedFunction;
}
function notUndefined(value, msg) {
  if (value === void 0) {
    throw new Error(`Unexpected undefined${""}`);
  } else {
    return value;
  }
}
const approxEqual = (a, b) => Math.abs(a - b) < 1.01;
const debounce = (targetWindow, fn, ms) => {
  let timeoutId;
  return function(...args) {
    targetWindow.clearTimeout(timeoutId);
    timeoutId = targetWindow.setTimeout(() => fn.apply(this, args), ms);
  };
};
const getRect = (element) => {
  const { offsetWidth, offsetHeight } = element;
  return { width: offsetWidth, height: offsetHeight };
};
const defaultKeyExtractor = (index) => index;
const defaultRangeExtractor = (range) => {
  const start = Math.max(range.startIndex - range.overscan, 0);
  const end = Math.min(range.endIndex + range.overscan, range.count - 1);
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};
const observeElementRect = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const targetWindow = instance.targetWindow;
  if (!targetWindow) {
    return;
  }
  const handler = (rect) => {
    const { width, height } = rect;
    cb({ width: Math.round(width), height: Math.round(height) });
  };
  handler(getRect(element));
  if (!targetWindow.ResizeObserver) {
    return () => {
    };
  }
  const observer = new targetWindow.ResizeObserver((entries2) => {
    const run = () => {
      const entry = entries2[0];
      if (entry == null ? void 0 : entry.borderBoxSize) {
        const box = entry.borderBoxSize[0];
        if (box) {
          handler({ width: box.inlineSize, height: box.blockSize });
          return;
        }
      }
      handler(getRect(element));
    };
    instance.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
  });
  observer.observe(element, { box: "border-box" });
  return () => {
    observer.unobserve(element);
  };
};
const addEventListenerOptions = {
  passive: true
};
const supportsScrollend = typeof window == "undefined" ? true : "onscrollend" in window;
const observeElementOffset = (instance, cb) => {
  const element = instance.scrollElement;
  if (!element) {
    return;
  }
  const targetWindow = instance.targetWindow;
  if (!targetWindow) {
    return;
  }
  let offset = 0;
  const fallback = instance.options.useScrollendEvent && supportsScrollend ? () => void 0 : debounce(
    targetWindow,
    () => {
      cb(offset, false);
    },
    instance.options.isScrollingResetDelay
  );
  const createHandler = (isScrolling) => () => {
    const { horizontal, isRtl } = instance.options;
    offset = horizontal ? element["scrollLeft"] * (isRtl && -1 || 1) : element["scrollTop"];
    fallback();
    cb(offset, isScrolling);
  };
  const handler = createHandler(true);
  const endHandler = createHandler(false);
  element.addEventListener("scroll", handler, addEventListenerOptions);
  const registerScrollendEvent = instance.options.useScrollendEvent && supportsScrollend;
  if (registerScrollendEvent) {
    element.addEventListener("scrollend", endHandler, addEventListenerOptions);
  }
  return () => {
    element.removeEventListener("scroll", handler);
    if (registerScrollendEvent) {
      element.removeEventListener("scrollend", endHandler);
    }
  };
};
const measureElement = (element, entry, instance) => {
  if (entry == null ? void 0 : entry.borderBoxSize) {
    const box = entry.borderBoxSize[0];
    if (box) {
      const size2 = Math.round(
        box[instance.options.horizontal ? "inlineSize" : "blockSize"]
      );
      return size2;
    }
  }
  return element[instance.options.horizontal ? "offsetWidth" : "offsetHeight"];
};
const elementScroll = (offset, {
  adjustments = 0,
  behavior
}, instance) => {
  var _a, _b;
  const toOffset = offset + adjustments;
  (_b = (_a = instance.scrollElement) == null ? void 0 : _a.scrollTo) == null ? void 0 : _b.call(_a, {
    [instance.options.horizontal ? "left" : "top"]: toOffset,
    behavior
  });
};
class Virtualizer {
  constructor(opts) {
    this.unsubs = [];
    this.scrollElement = null;
    this.targetWindow = null;
    this.isScrolling = false;
    this.scrollState = null;
    this.measurementsCache = [];
    this.itemSizeCache = /* @__PURE__ */ new Map();
    this.laneAssignments = /* @__PURE__ */ new Map();
    this.pendingMeasuredCacheIndexes = [];
    this.prevLanes = void 0;
    this.lanesChangedFlag = false;
    this.lanesSettling = false;
    this.scrollRect = null;
    this.scrollOffset = null;
    this.scrollDirection = null;
    this.scrollAdjustments = 0;
    this.elementsCache = /* @__PURE__ */ new Map();
    this.now = () => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = this.targetWindow) == null ? void 0 : _a.performance) == null ? void 0 : _b.now) == null ? void 0 : _c.call(_b)) ?? Date.now();
    };
    this.observer = /* @__PURE__ */ (() => {
      let _ro = null;
      const get2 = () => {
        if (_ro) {
          return _ro;
        }
        if (!this.targetWindow || !this.targetWindow.ResizeObserver) {
          return null;
        }
        return _ro = new this.targetWindow.ResizeObserver((entries2) => {
          entries2.forEach((entry) => {
            const run = () => {
              const node = entry.target;
              const index = this.indexFromElement(node);
              if (!node.isConnected) {
                this.observer.unobserve(node);
                return;
              }
              if (this.shouldMeasureDuringScroll(index)) {
                this.resizeItem(
                  index,
                  this.options.measureElement(node, entry, this)
                );
              }
            };
            this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
          });
        });
      };
      return {
        disconnect: () => {
          var _a;
          (_a = get2()) == null ? void 0 : _a.disconnect();
          _ro = null;
        },
        observe: (target) => {
          var _a;
          return (_a = get2()) == null ? void 0 : _a.observe(target, { box: "border-box" });
        },
        unobserve: (target) => {
          var _a;
          return (_a = get2()) == null ? void 0 : _a.unobserve(target);
        }
      };
    })();
    this.range = null;
    this.setOptions = (opts2) => {
      Object.entries(opts2).forEach(([key, value]) => {
        if (typeof value === "undefined") delete opts2[key];
      });
      this.options = {
        debug: false,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: false,
        getItemKey: defaultKeyExtractor,
        rangeExtractor: defaultRangeExtractor,
        onChange: () => {
        },
        measureElement,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        isScrollingResetDelay: 150,
        enabled: true,
        isRtl: false,
        useScrollendEvent: false,
        useAnimationFrameWithResizeObserver: false,
        ...opts2
      };
    };
    this.notify = (sync) => {
      var _a, _b;
      (_b = (_a = this.options).onChange) == null ? void 0 : _b.call(_a, this, sync);
    };
    this.maybeNotify = memo(
      () => {
        this.calculateRange();
        return [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ];
      },
      (isScrolling) => {
        this.notify(isScrolling);
      },
      {
        key: false,
        debug: () => this.options.debug,
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    );
    this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((d) => d());
      this.unsubs = [];
      this.observer.disconnect();
      if (this.rafId != null && this.targetWindow) {
        this.targetWindow.cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.scrollState = null;
      this.scrollElement = null;
      this.targetWindow = null;
    };
    this._didMount = () => {
      return () => {
        this.cleanup();
      };
    };
    this._willUpdate = () => {
      var _a;
      const scrollElement = this.options.enabled ? this.options.getScrollElement() : null;
      if (this.scrollElement !== scrollElement) {
        this.cleanup();
        if (!scrollElement) {
          this.maybeNotify();
          return;
        }
        this.scrollElement = scrollElement;
        if (this.scrollElement && "ownerDocument" in this.scrollElement) {
          this.targetWindow = this.scrollElement.ownerDocument.defaultView;
        } else {
          this.targetWindow = ((_a = this.scrollElement) == null ? void 0 : _a.window) ?? null;
        }
        this.elementsCache.forEach((cached) => {
          this.observer.observe(cached);
        });
        this.unsubs.push(
          this.options.observeElementRect(this, (rect) => {
            this.scrollRect = rect;
            this.maybeNotify();
          })
        );
        this.unsubs.push(
          this.options.observeElementOffset(this, (offset, isScrolling) => {
            this.scrollAdjustments = 0;
            this.scrollDirection = isScrolling ? this.getScrollOffset() < offset ? "forward" : "backward" : null;
            this.scrollOffset = offset;
            this.isScrolling = isScrolling;
            if (this.scrollState) {
              this.scheduleScrollReconcile();
            }
            this.maybeNotify();
          })
        );
        this._scrollToOffset(this.getScrollOffset(), {
          adjustments: void 0,
          behavior: void 0
        });
      }
    };
    this.rafId = null;
    this.getSize = () => {
      if (!this.options.enabled) {
        this.scrollRect = null;
        return 0;
      }
      this.scrollRect = this.scrollRect ?? this.options.initialRect;
      return this.scrollRect[this.options.horizontal ? "width" : "height"];
    };
    this.getScrollOffset = () => {
      if (!this.options.enabled) {
        this.scrollOffset = null;
        return 0;
      }
      this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset === "function" ? this.options.initialOffset() : this.options.initialOffset);
      return this.scrollOffset;
    };
    this.getFurthestMeasurement = (measurements, index) => {
      const furthestMeasurementsFound = /* @__PURE__ */ new Map();
      const furthestMeasurements = /* @__PURE__ */ new Map();
      for (let m = index - 1; m >= 0; m--) {
        const measurement = measurements[m];
        if (furthestMeasurementsFound.has(measurement.lane)) {
          continue;
        }
        const previousFurthestMeasurement = furthestMeasurements.get(
          measurement.lane
        );
        if (previousFurthestMeasurement == null || measurement.end > previousFurthestMeasurement.end) {
          furthestMeasurements.set(measurement.lane, measurement);
        } else if (measurement.end < previousFurthestMeasurement.end) {
          furthestMeasurementsFound.set(measurement.lane, true);
        }
        if (furthestMeasurementsFound.size === this.options.lanes) {
          break;
        }
      }
      return furthestMeasurements.size === this.options.lanes ? Array.from(furthestMeasurements.values()).sort((a, b) => {
        if (a.end === b.end) {
          return a.index - b.index;
        }
        return a.end - b.end;
      })[0] : void 0;
    };
    this.getMeasurementOptions = memo(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey,
        this.options.enabled,
        this.options.lanes
      ],
      (count, paddingStart, scrollMargin, getItemKey, enabled, lanes) => {
        const lanesChanged = this.prevLanes !== void 0 && this.prevLanes !== lanes;
        if (lanesChanged) {
          this.lanesChangedFlag = true;
        }
        this.prevLanes = lanes;
        this.pendingMeasuredCacheIndexes = [];
        return {
          count,
          paddingStart,
          scrollMargin,
          getItemKey,
          enabled,
          lanes
        };
      },
      {
        key: false
      }
    );
    this.getMeasurements = memo(
      () => [this.getMeasurementOptions(), this.itemSizeCache],
      ({ count, paddingStart, scrollMargin, getItemKey, enabled, lanes }, itemSizeCache) => {
        if (!enabled) {
          this.measurementsCache = [];
          this.itemSizeCache.clear();
          this.laneAssignments.clear();
          return [];
        }
        if (this.laneAssignments.size > count) {
          for (const index of this.laneAssignments.keys()) {
            if (index >= count) {
              this.laneAssignments.delete(index);
            }
          }
        }
        if (this.lanesChangedFlag) {
          this.lanesChangedFlag = false;
          this.lanesSettling = true;
          this.measurementsCache = [];
          this.itemSizeCache.clear();
          this.laneAssignments.clear();
          this.pendingMeasuredCacheIndexes = [];
        }
        if (this.measurementsCache.length === 0 && !this.lanesSettling) {
          this.measurementsCache = this.options.initialMeasurementsCache;
          this.measurementsCache.forEach((item) => {
            this.itemSizeCache.set(item.key, item.size);
          });
        }
        const min = this.lanesSettling ? 0 : this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        if (this.lanesSettling && this.measurementsCache.length === count) {
          this.lanesSettling = false;
        }
        const measurements = this.measurementsCache.slice(0, min);
        const laneLastIndex = new Array(lanes).fill(
          void 0
        );
        for (let m = 0; m < min; m++) {
          const item = measurements[m];
          if (item) {
            laneLastIndex[item.lane] = m;
          }
        }
        for (let i = min; i < count; i++) {
          const key = getItemKey(i);
          const cachedLane = this.laneAssignments.get(i);
          let lane;
          let start;
          if (cachedLane !== void 0 && this.options.lanes > 1) {
            lane = cachedLane;
            const prevIndex = laneLastIndex[lane];
            const prevInLane = prevIndex !== void 0 ? measurements[prevIndex] : void 0;
            start = prevInLane ? prevInLane.end + this.options.gap : paddingStart + scrollMargin;
          } else {
            const furthestMeasurement = this.options.lanes === 1 ? measurements[i - 1] : this.getFurthestMeasurement(measurements, i);
            start = furthestMeasurement ? furthestMeasurement.end + this.options.gap : paddingStart + scrollMargin;
            lane = furthestMeasurement ? furthestMeasurement.lane : i % this.options.lanes;
            if (this.options.lanes > 1) {
              this.laneAssignments.set(i, lane);
            }
          }
          const measuredSize = itemSizeCache.get(key);
          const size2 = typeof measuredSize === "number" ? measuredSize : this.options.estimateSize(i);
          const end = start + size2;
          measurements[i] = {
            index: i,
            start,
            size: size2,
            end,
            key,
            lane
          };
          laneLastIndex[lane] = i;
        }
        this.measurementsCache = measurements;
        return measurements;
      },
      {
        key: false,
        debug: () => this.options.debug
      }
    );
    this.calculateRange = memo(
      () => [
        this.getMeasurements(),
        this.getSize(),
        this.getScrollOffset(),
        this.options.lanes
      ],
      (measurements, outerSize, scrollOffset, lanes) => {
        return this.range = measurements.length > 0 && outerSize > 0 ? calculateRange({
          measurements,
          outerSize,
          scrollOffset,
          lanes
        }) : null;
      },
      {
        key: false,
        debug: () => this.options.debug
      }
    );
    this.getVirtualIndexes = memo(
      () => {
        let startIndex = null;
        let endIndex = null;
        const range = this.calculateRange();
        if (range) {
          startIndex = range.startIndex;
          endIndex = range.endIndex;
        }
        this.maybeNotify.updateDeps([this.isScrolling, startIndex, endIndex]);
        return [
          this.options.rangeExtractor,
          this.options.overscan,
          this.options.count,
          startIndex,
          endIndex
        ];
      },
      (rangeExtractor, overscan, count, startIndex, endIndex) => {
        return startIndex === null || endIndex === null ? [] : rangeExtractor({
          startIndex,
          endIndex,
          overscan,
          count
        });
      },
      {
        key: false,
        debug: () => this.options.debug
      }
    );
    this.indexFromElement = (node) => {
      const attributeName = this.options.indexAttribute;
      const indexStr = node.getAttribute(attributeName);
      if (!indexStr) {
        console.warn(
          `Missing attribute name '${attributeName}={index}' on measured element.`
        );
        return -1;
      }
      return parseInt(indexStr, 10);
    };
    this.shouldMeasureDuringScroll = (index) => {
      var _a;
      if (!this.scrollState || this.scrollState.behavior !== "smooth") {
        return true;
      }
      const scrollIndex = this.scrollState.index ?? ((_a = this.getVirtualItemForOffset(this.scrollState.lastTargetOffset)) == null ? void 0 : _a.index);
      if (scrollIndex !== void 0 && this.range) {
        const bufferSize = Math.max(
          this.options.overscan,
          Math.ceil((this.range.endIndex - this.range.startIndex) / 2)
        );
        const minIndex = Math.max(0, scrollIndex - bufferSize);
        const maxIndex = Math.min(
          this.options.count - 1,
          scrollIndex + bufferSize
        );
        return index >= minIndex && index <= maxIndex;
      }
      return true;
    };
    this.measureElement = (node) => {
      if (!node) {
        this.elementsCache.forEach((cached, key2) => {
          if (!cached.isConnected) {
            this.observer.unobserve(cached);
            this.elementsCache.delete(key2);
          }
        });
        return;
      }
      const index = this.indexFromElement(node);
      const key = this.options.getItemKey(index);
      const prevNode = this.elementsCache.get(key);
      if (prevNode !== node) {
        if (prevNode) {
          this.observer.unobserve(prevNode);
        }
        this.observer.observe(node);
        this.elementsCache.set(key, node);
      }
      if ((!this.isScrolling || this.scrollState) && this.shouldMeasureDuringScroll(index)) {
        this.resizeItem(index, this.options.measureElement(node, void 0, this));
      }
    };
    this.resizeItem = (index, size2) => {
      var _a;
      const item = this.measurementsCache[index];
      if (!item) return;
      const itemSize = this.itemSizeCache.get(item.key) ?? item.size;
      const delta = size2 - itemSize;
      if (delta !== 0) {
        if (((_a = this.scrollState) == null ? void 0 : _a.behavior) !== "smooth" && (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(item, delta, this) : item.start < this.getScrollOffset() + this.scrollAdjustments)) {
          this._scrollToOffset(this.getScrollOffset(), {
            adjustments: this.scrollAdjustments += delta,
            behavior: void 0
          });
        }
        this.pendingMeasuredCacheIndexes.push(item.index);
        this.itemSizeCache = new Map(this.itemSizeCache.set(item.key, size2));
        this.notify(false);
      }
    };
    this.getVirtualItems = memo(
      () => [this.getVirtualIndexes(), this.getMeasurements()],
      (indexes, measurements) => {
        const virtualItems = [];
        for (let k = 0, len = indexes.length; k < len; k++) {
          const i = indexes[k];
          const measurement = measurements[i];
          virtualItems.push(measurement);
        }
        return virtualItems;
      },
      {
        key: false,
        debug: () => this.options.debug
      }
    );
    this.getVirtualItemForOffset = (offset) => {
      const measurements = this.getMeasurements();
      if (measurements.length === 0) {
        return void 0;
      }
      return notUndefined(
        measurements[findNearestBinarySearch(
          0,
          measurements.length - 1,
          (index) => notUndefined(measurements[index]).start,
          offset
        )]
      );
    };
    this.getMaxScrollOffset = () => {
      if (!this.scrollElement) return 0;
      if ("scrollHeight" in this.scrollElement) {
        return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
      } else {
        const doc = this.scrollElement.document.documentElement;
        return this.options.horizontal ? doc.scrollWidth - this.scrollElement.innerWidth : doc.scrollHeight - this.scrollElement.innerHeight;
      }
    };
    this.getOffsetForAlignment = (toOffset, align, itemSize = 0) => {
      if (!this.scrollElement) return 0;
      const size2 = this.getSize();
      const scrollOffset = this.getScrollOffset();
      if (align === "auto") {
        align = toOffset >= scrollOffset + size2 ? "end" : "start";
      }
      if (align === "center") {
        toOffset += (itemSize - size2) / 2;
      } else if (align === "end") {
        toOffset -= size2;
      }
      const maxOffset = this.getMaxScrollOffset();
      return Math.max(Math.min(maxOffset, toOffset), 0);
    };
    this.getOffsetForIndex = (index, align = "auto") => {
      index = Math.max(0, Math.min(index, this.options.count - 1));
      const size2 = this.getSize();
      const scrollOffset = this.getScrollOffset();
      const item = this.measurementsCache[index];
      if (!item) return;
      if (align === "auto") {
        if (item.end >= scrollOffset + size2 - this.options.scrollPaddingEnd) {
          align = "end";
        } else if (item.start <= scrollOffset + this.options.scrollPaddingStart) {
          align = "start";
        } else {
          return [scrollOffset, align];
        }
      }
      if (align === "end" && index === this.options.count - 1) {
        return [this.getMaxScrollOffset(), align];
      }
      const toOffset = align === "end" ? item.end + this.options.scrollPaddingEnd : item.start - this.options.scrollPaddingStart;
      return [
        this.getOffsetForAlignment(toOffset, align, item.size),
        align
      ];
    };
    this.scrollToOffset = (toOffset, { align = "start", behavior = "auto" } = {}) => {
      const offset = this.getOffsetForAlignment(toOffset, align);
      const now2 = this.now();
      this.scrollState = {
        index: null,
        align,
        behavior,
        startedAt: now2,
        lastTargetOffset: offset,
        stableFrames: 0
      };
      this._scrollToOffset(offset, { adjustments: void 0, behavior });
      this.scheduleScrollReconcile();
    };
    this.scrollToIndex = (index, {
      align: initialAlign = "auto",
      behavior = "auto"
    } = {}) => {
      index = Math.max(0, Math.min(index, this.options.count - 1));
      const offsetInfo = this.getOffsetForIndex(index, initialAlign);
      if (!offsetInfo) {
        return;
      }
      const [offset, align] = offsetInfo;
      const now2 = this.now();
      this.scrollState = {
        index,
        align,
        behavior,
        startedAt: now2,
        lastTargetOffset: offset,
        stableFrames: 0
      };
      this._scrollToOffset(offset, { adjustments: void 0, behavior });
      this.scheduleScrollReconcile();
    };
    this.scrollBy = (delta, { behavior = "auto" } = {}) => {
      const offset = this.getScrollOffset() + delta;
      const now2 = this.now();
      this.scrollState = {
        index: null,
        align: "start",
        behavior,
        startedAt: now2,
        lastTargetOffset: offset,
        stableFrames: 0
      };
      this._scrollToOffset(offset, { adjustments: void 0, behavior });
      this.scheduleScrollReconcile();
    };
    this.getTotalSize = () => {
      var _a;
      const measurements = this.getMeasurements();
      let end;
      if (measurements.length === 0) {
        end = this.options.paddingStart;
      } else if (this.options.lanes === 1) {
        end = ((_a = measurements[measurements.length - 1]) == null ? void 0 : _a.end) ?? 0;
      } else {
        const endByLane = Array(this.options.lanes).fill(null);
        let endIndex = measurements.length - 1;
        while (endIndex >= 0 && endByLane.some((val) => val === null)) {
          const item = measurements[endIndex];
          if (endByLane[item.lane] === null) {
            endByLane[item.lane] = item.end;
          }
          endIndex--;
        }
        end = Math.max(...endByLane.filter((val) => val !== null));
      }
      return Math.max(
        end - this.options.scrollMargin + this.options.paddingEnd,
        0
      );
    };
    this._scrollToOffset = (offset, {
      adjustments,
      behavior
    }) => {
      this.options.scrollToFn(offset, { behavior, adjustments }, this);
    };
    this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map();
      this.laneAssignments = /* @__PURE__ */ new Map();
      this.notify(false);
    };
    this.setOptions(opts);
  }
  scheduleScrollReconcile() {
    if (!this.targetWindow) {
      this.scrollState = null;
      return;
    }
    if (this.rafId != null) return;
    this.rafId = this.targetWindow.requestAnimationFrame(() => {
      this.rafId = null;
      this.reconcileScroll();
    });
  }
  reconcileScroll() {
    if (!this.scrollState) return;
    const el = this.scrollElement;
    if (!el) return;
    const MAX_RECONCILE_MS = 5e3;
    if (this.now() - this.scrollState.startedAt > MAX_RECONCILE_MS) {
      this.scrollState = null;
      return;
    }
    const offsetInfo = this.scrollState.index != null ? this.getOffsetForIndex(this.scrollState.index, this.scrollState.align) : void 0;
    const targetOffset = offsetInfo ? offsetInfo[0] : this.scrollState.lastTargetOffset;
    const STABLE_FRAMES = 1;
    const targetChanged = targetOffset !== this.scrollState.lastTargetOffset;
    if (!targetChanged && approxEqual(targetOffset, this.getScrollOffset())) {
      this.scrollState.stableFrames++;
      if (this.scrollState.stableFrames >= STABLE_FRAMES) {
        this.scrollState = null;
        return;
      }
    } else {
      this.scrollState.stableFrames = 0;
      if (targetChanged) {
        this.scrollState.lastTargetOffset = targetOffset;
        this.scrollState.behavior = "auto";
        this._scrollToOffset(targetOffset, {
          adjustments: void 0,
          behavior: "auto"
        });
      }
    }
    this.scheduleScrollReconcile();
  }
}
const findNearestBinarySearch = (low, high, getCurrentValue, value) => {
  while (low <= high) {
    const middle = (low + high) / 2 | 0;
    const currentValue = getCurrentValue(middle);
    if (currentValue < value) {
      low = middle + 1;
    } else if (currentValue > value) {
      high = middle - 1;
    } else {
      return middle;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};
function calculateRange({
  measurements,
  outerSize,
  scrollOffset,
  lanes
}) {
  const lastIndex = measurements.length - 1;
  const getOffset = (index) => measurements[index].start;
  if (measurements.length <= lanes) {
    return {
      startIndex: 0,
      endIndex: lastIndex
    };
  }
  let startIndex = findNearestBinarySearch(
    0,
    lastIndex,
    getOffset,
    scrollOffset
  );
  let endIndex = startIndex;
  if (lanes === 1) {
    while (endIndex < lastIndex && measurements[endIndex].end < scrollOffset + outerSize) {
      endIndex++;
    }
  } else if (lanes > 1) {
    const endPerLane = Array(lanes).fill(0);
    while (endIndex < lastIndex && endPerLane.some((pos) => pos < scrollOffset + outerSize)) {
      const item = measurements[endIndex];
      endPerLane[item.lane] = item.end;
      endIndex++;
    }
    const startPerLane = Array(lanes).fill(scrollOffset + outerSize);
    while (startIndex >= 0 && startPerLane.some((pos) => pos >= scrollOffset)) {
      const item = measurements[startIndex];
      startPerLane[item.lane] = item.start;
      startIndex--;
    }
    startIndex = Math.max(0, startIndex - startIndex % lanes);
    endIndex = Math.min(lastIndex, endIndex + (lanes - 1 - endIndex % lanes));
  }
  return { startIndex, endIndex };
}
const useIsomorphicLayoutEffect = typeof document !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function useVirtualizerBase({
  useFlushSync = true,
  ...options
}) {
  const rerender = reactExports.useReducer(() => ({}), {})[1];
  const resolvedOptions = {
    ...options,
    onChange: (instance2, sync) => {
      var _a;
      if (useFlushSync && sync) {
        reactDomExports.flushSync(rerender);
      } else {
        rerender();
      }
      (_a = options.onChange) == null ? void 0 : _a.call(options, instance2, sync);
    }
  };
  const [instance] = reactExports.useState(
    () => new Virtualizer(resolvedOptions)
  );
  instance.setOptions(resolvedOptions);
  useIsomorphicLayoutEffect(() => {
    return instance._didMount();
  }, []);
  useIsomorphicLayoutEffect(() => {
    return instance._willUpdate();
  });
  return instance;
}
function useVirtualizer(options) {
  return useVirtualizerBase({
    observeElementRect,
    observeElementOffset,
    scrollToFn: elementScroll,
    ...options
  });
}
let css = `
:host {
  contain: layout;
  background-color: var(--iui-color-background);
}
[data-iui-virtualizer='root'] {
  min-inline-size: 100%;
  position: relative;
}
::slotted([data-iui-virtualizer='item']) {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
}
`;
const useVirtualScroll = (params) => {
  let { ...rest } = params;
  let _virtualizer = useVirtualizer({
    indexAttribute: "data-iui-index",
    overscan: 10,
    ...rest
  });
  let scrollToIndex = React.useCallback(
    (index, options) => {
      setTimeout(() => {
        _virtualizer.scrollToIndex(index, {
          align: "auto",
          ...options
        });
      });
    },
    [_virtualizer]
  );
  let virtualizer = React.useMemo(
    () => ({
      ..._virtualizer,
      scrollToIndex
    }),
    [_virtualizer, scrollToIndex]
  );
  return React.useMemo(
    () => ({
      virtualizer,
      css
    }),
    [virtualizer]
  );
};
const Label = reactExports.forwardRef((props, forwardedRef) => {
  let {
    displayStyle = "block",
    required,
    disabled,
    className,
    children,
    ...rest
  } = props;
  return reactExports.createElement(
    Box,
    {
      as: "label",
      className: classnames(
        "iui-input-label",
        {
          "iui-inline": "inline" === displayStyle,
          "iui-required": required
        },
        className
      ),
      "data-iui-disabled": disabled ? true : void 0,
      ref: forwardedRef,
      ...rest
    },
    children
  );
});
let getSizeValue = (size2) => {
  switch (size2) {
    case "small":
      return "s";
    case "medium":
      return "m";
    case "large":
      return "l";
    default:
      return size2;
  }
};
const Icon$1 = reactExports.forwardRef((props, ref) => {
  let {
    size: size2 = "medium",
    fill = "default",
    className,
    padded = false,
    ...rest
  } = props;
  return reactExports.createElement(Box, {
    as: "span",
    className: classnames("iui-svg-icon", className),
    "data-iui-icon-size": getSizeValue(size2),
    "data-iui-icon-color": fill,
    "data-iui-padded": padded ? "true" : void 0,
    ref,
    ...rest
  });
});
const StatusMessage = reactExports.forwardRef((props, ref) => {
  let {
    children,
    startIcon: userStartIcon,
    status,
    className,
    iconProps,
    contentProps,
    ...rest
  } = props;
  let icon = userStartIcon ?? (status && StatusIconMap[status]());
  let shouldShowIcon = null !== userStartIcon && !!icon;
  return reactExports.createElement(
    Box,
    {
      className: classnames("iui-status-message", className),
      "data-iui-status": status,
      ref,
      ...rest
    },
    shouldShowIcon ? reactExports.createElement(
      Icon$1,
      {
        "aria-hidden": true,
        ...iconProps
      },
      icon
    ) : null,
    reactExports.createElement(Box, contentProps, children)
  );
});
const InputContainer = reactExports.forwardRef((props, forwardedRef) => {
  let {
    label,
    disabled,
    required,
    status,
    message,
    icon,
    isLabelInline,
    children,
    className,
    style,
    statusMessage,
    inputId,
    labelId,
    ...rest
  } = props;
  return reactExports.createElement(
    Box,
    {
      className: classnames("iui-input-grid", className),
      "data-iui-status": status,
      "data-iui-label-placement": isLabelInline ? "inline" : void 0,
      style,
      ref: forwardedRef,
      ...rest
    },
    label && reactExports.createElement(
      Label,
      {
        as: inputId && "label" !== props.as ? "label" : "div",
        required,
        disabled,
        htmlFor: inputId,
        id: labelId
      },
      label
    ),
    children,
    statusMessage ? statusMessage : message && reactExports.createElement(
      StatusMessage,
      {
        startIcon: icon,
        status
      },
      message
    )
  );
});
const InputFlexContainer = reactExports.forwardRef((props, ref) => {
  let { isDisabled, status, children, className, size: size2, style, ...rest } = props;
  return reactExports.createElement(
    Box,
    {
      className: classnames("iui-input-flex-container", className),
      "data-iui-status": status,
      "data-iui-size": size2,
      "data-iui-disabled": isDisabled ? "true" : void 0,
      ref,
      style,
      ...rest
    },
    children
  );
});
const InputFlexContainerButton = reactExports.forwardRef((props, ref) => {
  let { className, ...rest } = props;
  return reactExports.createElement(IconButton, {
    ref,
    className: classnames("iui-input-flex-container-icon", className),
    styleType: "borderless",
    ...rest
  });
});
const InputFlexContainerIcon = reactExports.forwardRef((props, ref) => {
  let { className, ...rest } = props;
  return reactExports.createElement(Icon$1, {
    ref,
    className: classnames("iui-input-flex-container-icon", className),
    padded: true,
    ...rest
  });
});
const InputWithIcon = polymorphic.div("iui-input-with-icon");
const AutoclearingHiddenLiveRegion = ({ text: text2, ...props }) => {
  let [maybeText, setMaybeText] = reactExports.useState(text2);
  reactExports.useEffect(() => {
    setMaybeText(text2);
    let timeout = getWindow()?.setTimeout(() => setMaybeText(""), 5e3);
    return () => void getWindow()?.clearTimeout(timeout);
  }, [text2]);
  return reactExports.createElement(
    VisuallyHidden,
    {
      as: "div",
      "aria-live": "polite",
      "aria-atomic": "true",
      ...props
    },
    maybeText
  );
};
function _define_property(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else obj[key] = value;
  return obj;
}
let scratchBytes = new Uint8Array(4);
let scratchUInt32 = new Uint32Array(scratchBytes.buffer);
const isRgbColor = (value) => "string" != typeof value && "r" in value && "g" in value && "b" in value;
const isHslColor = (value) => "string" != typeof value && "h" in value && "s" in value && "l" in value;
const isHsvColor = (value) => "string" != typeof value && "h" in value && "s" in value && "v" in value;
class ColorValue {
  static create(val) {
    if (!val) return ColorValue.fromTbgr(0);
    if (isRgbColor(val)) return ColorValue.fromRGB(val);
    if (isHslColor(val)) return ColorValue.fromHSL(val);
    if (isHsvColor(val)) return ColorValue.fromHSV(val);
    if ("string" == typeof val)
      return ColorValue.fromString(val, ColorValue.fromTbgr(0));
    return ColorValue.fromTbgr(0);
  }
  toTbgr() {
    return this._tbgr;
  }
  static fromTbgr(tbgr) {
    return new ColorValue(tbgr);
  }
  static fromRgbt(red, green, blue, transparency) {
    return this.fromTbgr(
      this.computeTbgrFromComponents(red, green, blue, transparency)
    );
  }
  static computeTbgrFromComponents(red, green, blue, transparency) {
    scratchBytes[0] = red;
    scratchBytes[1] = green;
    scratchBytes[2] = blue;
    scratchBytes[3] = transparency || 0;
    return scratchUInt32[0];
  }
  static fromString(val, defaultColorIfNotParsed) {
    let [tbgr, hue] = this.computeTbgrFromString(
      val,
      defaultColorIfNotParsed?.toTbgr()
    );
    return new ColorValue(tbgr, hue);
  }
  static fromHSL(hsl) {
    let alpha = hsl.a ?? 1;
    return new ColorValue(
      this.computeTbgrFromHSL(
        hsl.h / 360,
        hsl.s / 100,
        hsl.l / 100,
        Math.round((1 - alpha) * 255)
      ),
      hsl.h
    );
  }
  static fromRGB(rgb) {
    let alpha = rgb.a ?? 1;
    return ColorValue.fromRgbt(
      rgb.r,
      rgb.g,
      rgb.b,
      Math.round((1 - alpha) * 255)
    );
  }
  static fromHSV(hsv) {
    let alpha = hsv.a ?? 1;
    let transparency = Math.round((1 - alpha) * 255);
    if (!hsv.s || -1 === hsv.h) {
      let white = 255 & Math.floor(255 * hsv.v / 100 + 0.5 + 3e-14);
      return ColorValue.fromRgbt(white, white, white, 0);
    }
    let dhue = hsv.h, dsaturation = hsv.s, dvalue = hsv.v;
    if (360 === dhue) dhue = 0;
    dhue /= 60;
    let hueIntpart = Math.floor(dhue);
    let hueFractpart = dhue - hueIntpart;
    dvalue /= 100;
    dsaturation /= 100;
    let p = 255 & Math.floor(dvalue * (1 - dsaturation) * 255 + 0.5);
    let q = 255 & Math.floor(dvalue * (1 - dsaturation * hueFractpart) * 255 + 0.5);
    let t = 255 & Math.floor(
      dvalue * (1 - dsaturation * (1 - hueFractpart)) * 255 + 0.5
    );
    let v = 255 & Math.floor(255 * dvalue + 0.5);
    let r = 0, b = 0, g = 0;
    switch (hueIntpart) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q, g = v;
        b = p;
        break;
      case 2:
        r = p, g = v;
        b = t;
        break;
      case 3:
        r = p, g = q;
        b = v;
        break;
      case 4:
        r = t, g = p;
        b = v;
        break;
      case 5:
        r = v, g = p;
        b = q;
        break;
    }
    return new ColorValue(
      ColorValue.computeTbgrFromComponents(r, g, b, transparency),
      hsv.h
    );
  }
  static computeTbgrFromString(val, defaultColorIfNotParsed) {
    val = val.toLowerCase();
    let m = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(val);
    if (m) {
      let color;
      let name = m[1];
      let components = m[2];
      let hasPercent = (str) => "%" === str[str.length - 1];
      let floatOrPercent = (str) => {
        let v = parseFloat(str);
        return 255 * getBoundedValue(hasPercent(str) ? v / 100 : v, 0, 1);
      };
      let intOrPercent = (str) => {
        let v = hasPercent(str) ? parseFloat(str) / 100 * 255 : parseInt(str, 10);
        return getBoundedValue(v, 0, 255);
      };
      switch (name) {
        case "rgb":
        case "rgba":
          color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
            components
          );
          if (color)
            return [
              this.computeTbgrFromComponents(
                intOrPercent(color[1]),
                intOrPercent(color[2]),
                intOrPercent(color[3]),
                "string" == typeof color[4] ? 255 - floatOrPercent(color[4]) : 0
              ),
              void 0
            ];
          break;
        case "hsl":
        case "hsla":
          color = /^(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(
            components
          );
          if (color) {
            let h = parseFloat(color[1]);
            let s = parseInt(color[2], 10) / 100;
            let l = parseInt(color[3], 10) / 100;
            let t = "string" == typeof color[4] ? 255 - floatOrPercent(color[4]) : 0;
            return [this.computeTbgrFromHSL(h / 360, s, l, t), h];
          }
          break;
      }
    } else if (m = /^\#([A-Fa-f\d]+)$/.exec(val)) {
      let hex = m[1];
      let size2 = hex.length;
      if (3 === size2)
        return [
          this.computeTbgrFromComponents(
            parseInt(hex.charAt(0) + hex.charAt(0), 16),
            parseInt(hex.charAt(1) + hex.charAt(1), 16),
            parseInt(hex.charAt(2) + hex.charAt(2), 16),
            0
          ),
          void 0
        ];
      if (6 === size2)
        return [
          this.computeTbgrFromComponents(
            parseInt(hex.charAt(0) + hex.charAt(1), 16),
            parseInt(hex.charAt(2) + hex.charAt(3), 16),
            parseInt(hex.charAt(4) + hex.charAt(5), 16),
            0
          ),
          void 0
        ];
      if (8 === size2)
        return [
          this.computeTbgrFromComponents(
            parseInt(hex.charAt(0) + hex.charAt(1), 16),
            parseInt(hex.charAt(2) + hex.charAt(3), 16),
            parseInt(hex.charAt(4) + hex.charAt(5), 16),
            255 - parseInt(hex.charAt(6) + hex.charAt(7), 16)
          ),
          void 0
        ];
    }
    if (defaultColorIfNotParsed) return [defaultColorIfNotParsed, void 0];
    throw new Error("unable to parse string into ColorValue");
  }
  static getColors(tbgr) {
    scratchUInt32[0] = tbgr;
    return {
      b: scratchBytes[2],
      g: scratchBytes[1],
      r: scratchBytes[0],
      t: scratchBytes[3]
    };
  }
  getRgb(includeAlpha) {
    scratchUInt32[0] = this._tbgr;
    if (includeAlpha)
      return (scratchBytes[0] << 24) + (scratchBytes[1] << 16) + (scratchBytes[2] << 8) + (255 - scratchBytes[3]);
    return (scratchBytes[0] << 16) + (scratchBytes[1] << 8) + scratchBytes[2];
  }
  getAlpha() {
    return ColorValue.getAlpha(this._tbgr);
  }
  static getAlpha(tbgr) {
    scratchUInt32[0] = tbgr;
    return 255 - scratchBytes[3];
  }
  toHexString(includeAlpha) {
    if (includeAlpha) {
      let value = this.getRgb(includeAlpha);
      if (value < 0) value = 4294967295 + value + 1;
      return `#${`00000000${value.toString(16)}`.slice(-8)}`;
    }
    return `#${`000000${this.getRgb().toString(16)}`.slice(-6)}`;
  }
  static computeTbgrFromHSL(h, s, l, transparency = 0) {
    let torgb = (p1, q1, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p1 + (q1 - p1) * 6 * t;
      if (t < 0.5) return q1;
      if (t < 2 / 3) return p1 + (q1 - p1) * 6 * (2 / 3 - t);
      return p1;
    };
    let hue2rgb = (p1, q1, t) => Math.round(255 * torgb(p1, q1, t));
    let modulo = (n, m) => (n % m + m) % m;
    h = modulo(h, 1);
    s = getBoundedValue(s, 0, 1);
    l = getBoundedValue(l, 0, 1);
    if (0 === s) {
      l *= 255;
      return this.computeTbgrFromComponents(l, l, l, transparency);
    }
    let p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
    let q = 2 * l - p;
    return this.computeTbgrFromComponents(
      hue2rgb(q, p, h + 1 / 3),
      hue2rgb(q, p, h),
      hue2rgb(q, p, h - 1 / 3),
      transparency
    );
  }
  toHslColor() {
    return {
      ...ColorValue.toHsl(this._tbgr),
      ...void 0 != this._hue && {
        h: this._hue
      }
    };
  }
  static toHsl(tbgr) {
    let { r, g, b } = ColorValue.getColors(tbgr);
    let red = r / 255;
    let green = g / 255;
    let blue = b / 255;
    let cMin = Math.min(red, green, blue);
    let cMax = Math.max(red, green, blue);
    let delta = cMax - cMin;
    let hue = 0;
    let saturation = 0;
    hue = 0 === delta ? 0 : red === cMax ? (green - blue) / delta % 6 : green === cMax ? (blue - red) / delta + 2 : (red - green) / delta + 4;
    hue = Math.round(60 * hue);
    if (hue < 0) hue += 360;
    let lightness = (cMax + cMin) / 2;
    saturation = 0 === delta ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
    saturation = Number((100 * saturation).toFixed(1));
    lightness = Number((100 * lightness).toFixed(1));
    return {
      h: hue,
      s: saturation,
      l: lightness,
      a: this.getAlpha(tbgr) / 255
    };
  }
  toRgbColor() {
    let { r, g, b } = ColorValue.getColors(this._tbgr);
    return {
      r,
      g,
      b,
      a: this.getAlpha() / 255
    };
  }
  toHsvColor() {
    return {
      ...ColorValue.toHsv(this._tbgr),
      ...void 0 != this._hue && {
        h: this._hue
      }
    };
  }
  static toHsv(tbgr) {
    let { r, g, b } = ColorValue.getColors(tbgr);
    let red = r / 255;
    let green = g / 255;
    let blue = b / 255;
    let cMin = Math.min(red, green, blue);
    let cMax = Math.max(red, green, blue);
    let delta = cMax - cMin;
    let hue = 0;
    hue = 0 === delta ? 0 : red === cMax ? (green - blue) / delta % 6 : green === cMax ? (blue - red) / delta + 2 : (red - green) / delta + 4;
    hue = Math.round(60 * hue);
    if (hue < 0) hue += 360;
    let brightness = cMax;
    let saturation = 0 === cMax ? 0 : delta / cMax;
    saturation = Number((100 * saturation).toFixed(1));
    brightness = Number((100 * brightness).toFixed(1));
    return {
      h: hue,
      s: saturation,
      v: brightness,
      a: this.getAlpha(tbgr) / 255
    };
  }
  equals(other) {
    return this._tbgr === other._tbgr;
  }
  static getFormattedColorNumber(value, precision = 1) {
    if (0 === precision) Math.round(value).toString();
    return Number(value.toFixed(precision)).toString();
  }
  toRgbString(includeAlpha) {
    let rgb = this.toRgbColor();
    let rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    if (includeAlpha) {
      let alpha = rgb.a ?? 1;
      return `rgba(${rgbString}, ${ColorValue.getFormattedColorNumber(
        alpha,
        2
      )})`;
    }
    return `rgb(${rgbString})`;
  }
  toHslString(includeAlpha) {
    let hsl = this.toHslColor();
    let hslString = `${ColorValue.getFormattedColorNumber(
      this._hue ?? hsl.h
    )}, ${ColorValue.getFormattedColorNumber(
      hsl.s
    )}%, ${ColorValue.getFormattedColorNumber(hsl.l)}%`;
    if (includeAlpha) {
      let alpha = hsl.a ?? 1;
      return `hsla(${hslString}, ${ColorValue.getFormattedColorNumber(
        alpha,
        2
      )})`;
    }
    return `hsl(${hslString})`;
  }
  toHsvString(includeAlpha) {
    let hsv = this.toHsvColor();
    let hsvString = `${this._hue ?? hsv.h}, ${hsv.s}%, ${hsv.v}%`;
    if (includeAlpha) {
      let alpha = hsv.a ?? 1;
      return `hsva(${hsvString}, ${ColorValue.getFormattedColorNumber(
        alpha,
        2
      )})`;
    }
    return `hsv(${hsvString})`;
  }
  constructor(tbgr, hue) {
    _define_property(this, "_tbgr", void 0);
    _define_property(this, "_hue", void 0);
    scratchUInt32[0] = tbgr;
    this._tbgr = scratchUInt32[0];
    this._hue = hue;
  }
}
const SvgChevronLeft$1 = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m11.3 0 1.4 1.4-6.6 6.6 6.6 6.6-1.4 1.4-8-8z"
  })
);
const SvgChevronRight$1 = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m4.7 0-1.4 1.4 6.6 6.6-6.6 6.6 1.4 1.4 8-8z"
  })
);
const SvgChevronRightSmall = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m5.525 2-1.05 1.05L9.425 8l-4.95 4.95L5.525 14l6-6-6-6Z"
  })
);
const SvgChevronLeftDouble = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m14.6 0 1.4 1.4-6.6 6.6 6.6 6.6-1.4 1.4-8-8zm-6.6 0 1.4 1.4-6.6 6.6 6.6 6.6-1.4 1.4-8-8z"
  })
);
const SvgChevronRightDouble = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m1.4 0-1.4 1.4 6.6 6.6-6.6 6.6 1.4 1.4 8-8zm6.6 0-1.4 1.4 6.6 6.6-6.6 6.6 1.4 1.4 8-8z"
  })
);
const SvgCaretDownSmall$1 = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "M4.807 6h6.395a.28.28 0 0 1 .24.443L8.27 9.9a.34.34 0 0 1-.481 0L4.566 6.443A.27.27 0 0 1 4.806 6z"
  })
);
const SvgCaretRightSmall$1 = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "M6.003 4.807v6.4a.28.28 0 0 0 .443.24L9.9 8.27a.34.34 0 0 0 0-.48L6.446 4.566a.269.269 0 0 0-.443.24z"
  })
);
const SvgCheckmark$1 = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "M6,14L0,8l2-2l4,4l8-8l2,2L6,14z"
  })
);
const Text = reactExports.forwardRef((props, ref) => {
  let {
    variant = "body",
    className,
    isMuted = false,
    isSkeleton = false,
    ...rest
  } = props;
  return reactExports.createElement(
    TextContext.Provider,
    {
      value: true
    },
    reactExports.createElement(Box, {
      className: classnames(
        {
          [`iui-text-${variant}`]: "body" !== variant,
          "iui-text-block": "body" === variant,
          "iui-text-muted": isMuted,
          "iui-skeleton": isSkeleton
        },
        className
      ),
      ref,
      ...rest
    })
  );
});
const TextContext = reactExports.createContext(false);
const Anchor = reactExports.forwardRef((props, forwardedRef) => {
  let isInsideText = reactExports.useContext(TextContext);
  let { isExternal, underline = isInsideText, children, ...rest } = props;
  return reactExports.createElement(
    Box,
    {
      as: "a",
      "data-iui-underline": underline ? "true" : void 0,
      ...rest,
      ref: forwardedRef,
      className: classnames(
        "iui-anchor",
        {
          "iui-anchor-external": isExternal
        },
        props.className
      )
    },
    children,
    "_blank" === props.target && reactExports.createElement(VisuallyHidden, null, " (opens in new tab)")
  );
});
const Menu = reactExports.forwardRef((props, ref) => {
  let {
    className,
    trigger,
    positionReference,
    portal: portalProp,
    popoverProps: popoverPropsProp,
    children,
    ...rest
  } = props;
  let menuPortalContext = reactExports.useContext(MenuPortalContext);
  let portal = portalProp ?? menuPortalContext;
  let tree2 = useFloatingTree();
  let nodeId = useFloatingNodeId();
  let parentId = useFloatingParentNodeId();
  let {
    interactions: interactionsProp,
    visible: visibleProp,
    onVisibleChange: onVisibleChangeProp,
    ...restPopoverProps
  } = popoverPropsProp ?? {};
  let {
    listNavigation: listNavigationPropsProp,
    hover: hoverProp,
    ...restInteractionsProps
  } = interactionsProp ?? {};
  let [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChangeProp
  );
  let [hasFocusedNodeInSubmenu, setHasFocusedNodeInSubmenu] = reactExports.useState(false);
  let [menuElement, setMenuElement] = reactExports.useState(null);
  let { focusableElementsRef, focusableElements } = useFocusableElements(
    menuElement,
    {
      filter: (allElements) => allElements.filter(
        (i) => !allElements?.some((p) => p.contains(i.parentElement))
      )
    }
  );
  let [activeIndex, setActiveIndex] = reactExports.useState(null);
  let popover = usePopover({
    nodeId,
    visible,
    onVisibleChange: (open) => open ? setVisible(true) : close(),
    interactions: {
      hover: null == tree2 ? hoverProp : {
        enabled: !!hoverProp && !hasFocusedNodeInSubmenu,
        ...hoverProp
      },
      ...restInteractionsProps
    },
    ...restPopoverProps,
    middleware: {
      size: {
        maxHeight: "var(--iui-menu-max-height)"
      },
      ...restPopoverProps.middleware
    }
  });
  let { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useListNavigation(popover.context, {
      activeIndex,
      focusItemOnHover: false,
      listRef: focusableElementsRef,
      onNavigate: setActiveIndex,
      ...listNavigationPropsProp
    })
  ]);
  reactExports.useEffect(() => {
    let setPositionReference = popover.refs.setPositionReference;
    if (void 0 !== positionReference) setPositionReference(positionReference);
  }, [popover.refs.setPositionReference, positionReference]);
  let refs = useMergedRefs(setMenuElement, ref, popover.refs.setFloating);
  let triggerRef = reactExports.useRef(null);
  let close = reactExports.useCallback(() => {
    setVisible(false);
    if (null == parentId)
      triggerRef.current?.focus({
        preventScroll: true
      });
  }, [parentId, setVisible]);
  useSyncExternalStore(
    reactExports.useCallback(() => {
      let closeUnrelatedMenus = (event) => {
        if (parentId === event.parentId && nodeId !== event.nodeId || parentId === event.nodeId) {
          setVisible(false);
          setHasFocusedNodeInSubmenu(false);
        }
      };
      tree2?.events.on("onNodeFocused", closeUnrelatedMenus);
      return () => {
        tree2?.events.off("onNodeFocused", closeUnrelatedMenus);
      };
    }, [nodeId, parentId, tree2?.events, setVisible]),
    () => void 0,
    () => void 0
  );
  let popoverGetItemProps = reactExports.useCallback(
    ({ focusableItemIndex, userProps }) => getItemProps({
      ...userProps,
      tabIndex: null != activeIndex && activeIndex >= 0 && null != focusableItemIndex && focusableItemIndex >= 0 && activeIndex === focusableItemIndex ? 0 : -1,
      onFocus: mergeEventHandlers(userProps?.onFocus, () => {
        queueMicrotask(() => {
          setHasFocusedNodeInSubmenu(true);
        });
        tree2?.events.emit("onNodeFocused", {
          nodeId,
          parentId
        });
      }),
      onMouseEnter: mergeEventHandlers(userProps?.onMouseEnter, (event) => {
        if (null != focusableItemIndex && focusableItemIndex >= 0)
          setActiveIndex(focusableItemIndex);
        if (event.target === event.currentTarget)
          event.currentTarget.focus({
            focusVisible: false
          });
      })
    }),
    [activeIndex, getItemProps, nodeId, parentId, tree2?.events]
  );
  let reference = cloneElementWithRef(
    trigger,
    (triggerChild) => getReferenceProps(
      popover.getReferenceProps({
        "aria-haspopup": "menu",
        ...triggerChild.props,
        "aria-expanded": popover.open,
        ref: mergeRefs(triggerRef, popover.refs.setReference)
      })
    )
  );
  let floating = popover.open && reactExports.createElement(
    Portal,
    {
      portal
    },
    reactExports.createElement(
      Box,
      {
        as: "div",
        className: classnames("iui-menu", className),
        ref: refs,
        ...getFloatingProps(
          popover.getFloatingProps({
            role: "menu",
            ...rest
          })
        )
      },
      children
    )
  );
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(
      MenuContext.Provider,
      {
        value: reactExports.useMemo(
          () => ({
            popoverGetItemProps,
            focusableElements
          }),
          [focusableElements, popoverGetItemProps]
        )
      },
      reactExports.createElement(
        MenuPortalContext.Provider,
        {
          value: portal
        },
        reactExports.createElement(
          PopoverOpenContext.Provider,
          {
            value: popover.open
          },
          reference
        ),
        null != tree2 ? reactExports.createElement(
          FloatingNode,
          {
            id: nodeId
          },
          floating
        ) : floating
      )
    )
  );
});
const MenuContext = reactExports.createContext(void 0);
const MenuPortalContext = reactExports.createContext(void 0);
const DropdownMenu = reactExports.forwardRef(
  (props, forwardedRef) => reactExports.createElement(
    FloatingTree,
    null,
    reactExports.createElement(DropdownMenuContent, {
      ref: forwardedRef,
      ...props
    })
  )
);
let DropdownMenuContent = reactExports.forwardRef((props, forwardedRef) => {
  let {
    menuItems,
    children,
    role = "menu",
    visible: visibleProp,
    placement = "bottom-start",
    matchWidth = false,
    onVisibleChange,
    portal = true,
    middleware,
    closeOnItemClick = true,
    ...rest
  } = props;
  let [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChange
  );
  let close = reactExports.useCallback(() => {
    setVisible(false);
  }, [setVisible]);
  let menuContent = reactExports.useMemo(() => {
    if ("function" == typeof menuItems) return menuItems(close);
    return menuItems;
  }, [close, menuItems]);
  let dropdownMenuContextValue = reactExports.useMemo(
    () => ({
      close
    }),
    [close]
  );
  return reactExports.createElement(
    DropdownMenuCloseOnClickContext.Provider,
    {
      value: closeOnItemClick
    },
    reactExports.createElement(
      DropdownMenuContext.Provider,
      {
        value: dropdownMenuContextValue
      },
      reactExports.createElement(
        Menu,
        {
          trigger: children,
          onKeyDown: mergeEventHandlers(props.onKeyDown, (e) => {
            if (e.defaultPrevented) return;
            if ("Tab" === e.key) setVisible(false);
          }),
          role,
          ref: forwardedRef,
          portal,
          popoverProps: reactExports.useMemo(
            () => ({
              placement,
              matchWidth,
              visible,
              onVisibleChange: setVisible,
              middleware
            }),
            [matchWidth, middleware, placement, setVisible, visible]
          ),
          ...rest
        },
        menuContent
      )
    )
  );
});
const DropdownMenuContext = reactExports.createContext(void 0);
const DropdownMenuCloseOnClickContext = reactExports.createContext(void 0);
const Checkbox = reactExports.forwardRef((props, ref) => {
  let {
    className,
    disabled = false,
    indeterminate = false,
    label,
    status,
    variant = "default",
    isLoading = false,
    wrapperProps = {},
    labelProps = {},
    style,
    ...rest
  } = props;
  let inputElementRef = reactExports.useRef(null);
  let refs = useMergedRefs(inputElementRef, ref);
  reactExports.useEffect(() => {
    if (inputElementRef.current) {
      inputElementRef.current.indeterminate = indeterminate;
      inputElementRef.current.checked = indeterminate ? false : inputElementRef.current.checked;
    }
  });
  let checkbox = reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(Box, {
      as: "input",
      className: classnames(
        "iui-checkbox",
        {
          "iui-checkbox-visibility": "eyeball" === variant
        },
        className
      ),
      style,
      "data-iui-loading": isLoading ? "true" : void 0,
      disabled: disabled || isLoading,
      type: "checkbox",
      ref: refs,
      ...rest
    }),
    isLoading && reactExports.createElement(ProgressRadial, {
      size: "x-small",
      indeterminate: true
    })
  );
  let { className: wrapperClassName, ...restWrapperProps } = wrapperProps;
  let { className: labelClassName, ...restLabelProps } = labelProps;
  return label ? reactExports.createElement(
    Box,
    {
      as: "label",
      className: classnames("iui-checkbox-wrapper", wrapperClassName),
      "data-iui-disabled": disabled ? "true" : void 0,
      "data-iui-status": status,
      "data-iui-loading": isLoading ? "true" : void 0,
      ...restWrapperProps
    },
    checkbox,
    label && reactExports.createElement(
      Box,
      {
        as: "span",
        className: classnames("iui-checkbox-label", labelClassName),
        ...restLabelProps
      },
      label
    )
  ) : checkbox;
});
const ColorPickerContext = reactExports.createContext(void 0);
const useColorPickerContext = () => {
  let context = reactExports.useContext(ColorPickerContext);
  if (void 0 == context)
    throw new Error(
      "useColorPickerContext must be used within a ColorPickerContext.Provider"
    );
  return context;
};
const getColorValue = (color) => {
  if (color instanceof ColorValue) return color;
  return ColorValue.create(color);
};
const ColorPicker = reactExports.forwardRef((props, forwardedRef) => {
  let {
    children,
    className,
    selectedColor,
    onChange,
    onChangeComplete,
    showAlpha = false,
    applyBackground = true,
    ...rest
  } = props;
  let ref = reactExports.useRef(null);
  let inColor = reactExports.useMemo(
    () => getColorValue(selectedColor),
    [selectedColor]
  );
  let activeColorTbgr = reactExports.useRef(inColor.toTbgr());
  let [activeColor, setActiveColor] = reactExports.useState(inColor);
  reactExports.useEffect(() => {
    setActiveColor(inColor);
  }, [inColor]);
  let [hsvColor, setHsvColor] = reactExports.useState(() => activeColor.toHsvColor());
  reactExports.useEffect(() => {
    if (inColor.toTbgr() !== activeColorTbgr.current) {
      activeColorTbgr.current = inColor.toTbgr();
      setHsvColor(inColor.toHsvColor());
    }
  }, [inColor]);
  let applyHsvColorChange = reactExports.useCallback(
    (newColor, selectionChanged, newColorValue) => {
      setHsvColor(newColor);
      let newActiveColor = newColorValue ?? ColorValue.create(newColor);
      if (selectionChanged) onChangeComplete?.(newActiveColor);
      else onChange?.(newActiveColor);
      activeColorTbgr.current = newActiveColor.toTbgr();
      setActiveColor(newActiveColor);
    },
    [onChange, onChangeComplete]
  );
  return reactExports.createElement(
    Box,
    {
      className: classnames(
        "iui-color-picker",
        {
          "iui-popover-surface": applyBackground
        },
        className
      ),
      ref: useMergedRefs(ref, forwardedRef),
      ...rest
    },
    reactExports.createElement(
      ColorPickerContext.Provider,
      {
        value: {
          activeColor,
          setActiveColor,
          hsvColor,
          applyHsvColorChange,
          onChangeComplete,
          showAlpha
        }
      },
      children
    )
  );
});
const ColorSwatch = reactExports.forwardRef((props, ref) => {
  let { color, style, onClick, isActive, className, ...rest } = props;
  let colorString = reactExports.useMemo(
    () => "string" == typeof color ? color : getColorValue(color).toHslString(true),
    [color]
  );
  return reactExports.createElement(
    Box,
    {
      as: onClick ? ButtonBase : "span",
      className: classnames(
        "iui-color-swatch",
        {
          "iui-active": isActive
        },
        className
      ),
      style: {
        "--iui-color-swatch-background": colorString,
        ...style
      },
      onClick,
      "aria-pressed": !!onClick && isActive ? "true" : void 0,
      ref,
      ...rest
    },
    props.children ?? reactExports.createElement(VisuallyHidden, null, colorString.toUpperCase())
  );
});
function shouldDisplaySegment(segmentIndex, mode) {
  if ("odd-segments" === mode && 0 === (segmentIndex + 1) % 2) return true;
  if ("even-segments" === mode && 0 === segmentIndex % 2) return true;
  return false;
}
function generateSegments(values, min, max) {
  let segments = [];
  let newValues = [...values];
  newValues.sort((a, b) => a - b);
  if (0 === newValues.length || newValues[0] < min || newValues[newValues.length - 1] > max || min === max)
    return [];
  let lastValue = min;
  for (let i = 0; i < newValues.length; i++) {
    segments.push({
      left: lastValue,
      right: newValues[i]
    });
    lastValue = newValues[i];
  }
  segments.push({
    left: lastValue,
    right: max
  });
  return segments;
}
const Track = (props) => {
  let {
    className,
    trackDisplayMode,
    sliderMin,
    sliderMax,
    values,
    orientation
  } = props;
  let [segments, setSegments] = reactExports.useState(
    () => generateSegments(values, sliderMin, sliderMax)
  );
  reactExports.useEffect(() => {
    setSegments(generateSegments(values, sliderMin, sliderMax));
  }, [values, sliderMin, sliderMax]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    "none" !== trackDisplayMode && segments.map((segment, index) => {
      let lowPercent = segment.left >= sliderMin && sliderMax !== sliderMin ? 100 * (segment.left - sliderMin) / (sliderMax - sliderMin) : 0;
      let highPercent = segment.right >= sliderMin && sliderMax !== sliderMin ? 100 - 100 * (segment.right - sliderMin) / (sliderMax - sliderMin) : 100;
      return reactExports.createElement(
        reactExports.Fragment,
        {
          key: index
        },
        shouldDisplaySegment(index, trackDisplayMode) ? reactExports.createElement(Box, {
          className: classnames("iui-slider-track", className),
          style: {
            ..."horizontal" === orientation ? {
              insetInlineStart: `${lowPercent}%`,
              insetInlineEnd: `${highPercent}%`
            } : {
              insetBlockStart: `${highPercent}%`,
              insetBlockEnd: `${lowPercent}%`
            }
          }
        }) : null
      );
    })
  );
};
const Thumb = (props) => {
  let {
    value,
    index,
    minVal,
    maxVal,
    step,
    sliderMin,
    sliderMax,
    isActive,
    onThumbActivated,
    onThumbValueChanged,
    tooltipProps,
    thumbProps,
    disabled
  } = props;
  let thumbRef = reactExports.useRef(null);
  let handleOnKeyboardEvent = reactExports.useCallback(
    (event, keyboardReleased) => {
      if (disabled || event.altKey) return;
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowDown":
          onThumbValueChanged(
            index,
            Math.max(value - step, minVal),
            keyboardReleased
          );
          break;
        case "ArrowRight":
        case "ArrowUp":
          onThumbValueChanged(
            index,
            Math.min(value + step, maxVal),
            keyboardReleased
          );
          break;
        case "Home":
          onThumbValueChanged(index, minVal, keyboardReleased);
          break;
        case "End":
          onThumbValueChanged(index, maxVal, keyboardReleased);
          break;
        default:
          return;
      }
      event.preventDefault();
    },
    [disabled, onThumbValueChanged, index, value, step, minVal, maxVal]
  );
  let handlePointerDownOnThumb = reactExports.useCallback(() => {
    disabled || onThumbActivated(index);
  }, [disabled, index, onThumbActivated]);
  let adjustedValue = reactExports.useMemo(() => {
    if (value < sliderMin) return sliderMin;
    if (value > sliderMax) return sliderMax;
    return value;
  }, [sliderMax, sliderMin, value]);
  let lowPercent = reactExports.useMemo(() => {
    if (sliderMax === sliderMin) return 0;
    return 100 * (adjustedValue - sliderMin) / (sliderMax - sliderMin);
  }, [adjustedValue, sliderMax, sliderMin]);
  let { style, className, ...rest } = thumbProps || {};
  return reactExports.createElement(
    Tooltip,
    {
      placement: "top",
      autoUpdateOptions: {
        animationFrame: true
      },
      ariaStrategy: "none",
      ...tooltipProps
    },
    reactExports.createElement(Box, {
      ...rest,
      ref: useMergedRefs(thumbRef, thumbProps?.ref),
      style: {
        ...style,
        "--iui-slider-thumb-position": `${lowPercent}%`
      },
      className: classnames(
        "iui-slider-thumb",
        {
          "iui-active": isActive
        },
        className
      ),
      role: "slider",
      tabIndex: disabled ? void 0 : 0,
      "aria-valuemin": minVal,
      "aria-valuenow": value,
      "aria-valuemax": maxVal,
      "aria-disabled": disabled,
      onPointerDown: handlePointerDownOnThumb,
      onKeyDown: (event) => handleOnKeyboardEvent(event, false),
      onKeyUp: (event) => handleOnKeyboardEvent(event, true)
    })
  );
};
let getPercentageOfRectangle = (rect, pointerX, pointerY, orientation) => {
  if ("horizontal" === orientation) {
    let position2 = getBoundedValue(pointerX, rect.left, rect.right);
    return (position2 - rect.left) / rect.width;
  }
  let position = getBoundedValue(pointerY, rect.top, rect.bottom);
  return (rect.bottom - position) / rect.height;
};
let getClosestValueIndex = (values, pointerValue) => {
  if (1 === values.length) return 0;
  let distances = values.map((value) => Math.abs(value - pointerValue));
  let smallest = Math.min(...distances);
  return distances.indexOf(smallest);
};
let getDefaultTrackDisplay = (trackDisplayMode, values) => {
  if ("auto" !== trackDisplayMode) return trackDisplayMode;
  return values.length % 2 ? "even-segments" : "odd-segments";
};
let roundValueToClosestStep = (value, step, min) => Math.round((value - min) / step) * step + min;
let formatNumberValue = (value, step, numDecimals) => {
  if (Number.isInteger(step)) return value.toFixed(0);
  return value.toFixed(numDecimals);
};
let focusThumb = (sliderContainer, activeIndex) => {
  let doc = sliderContainer.ownerDocument;
  if (!sliderContainer.contains(doc.activeElement) || Number(doc.activeElement?.getAttribute("data-index")) !== activeIndex) {
    let thumbToFocus = sliderContainer.querySelector(
      `[data-index="${activeIndex}"]`
    );
    thumbToFocus && thumbToFocus.focus();
  }
};
const Slider = reactExports.forwardRef((props, ref) => {
  let {
    min = 0,
    max = 100,
    values,
    step = 1,
    tooltipProps,
    disabled = false,
    tickLabels,
    minLabel,
    maxLabel,
    trackDisplayMode = "auto",
    thumbMode = "inhibit-crossing",
    onChange,
    onUpdate,
    thumbProps,
    className,
    trackContainerProps,
    minProps,
    maxProps,
    trackProps,
    tickProps,
    ticksProps,
    orientation = "horizontal",
    ...rest
  } = props;
  let [currentValues, setCurrentValues] = reactExports.useState(values);
  reactExports.useEffect(() => {
    setCurrentValues(values);
  }, [values]);
  let [minValueLabel, setMinValueLabel] = reactExports.useState(
    () => minLabel ?? min.toString()
  );
  reactExports.useEffect(() => {
    setMinValueLabel(minLabel ?? min.toString());
  }, [minLabel, min]);
  let [maxValueLabel, setMaxValueLabel] = reactExports.useState(
    () => maxLabel ?? max.toString()
  );
  reactExports.useEffect(() => {
    setMaxValueLabel(maxLabel ?? max.toString());
  }, [maxLabel, max]);
  let [trackDisplay, setTrackDisplay] = reactExports.useState(
    () => getDefaultTrackDisplay(trackDisplayMode, currentValues)
  );
  reactExports.useEffect(() => {
    setTrackDisplay(getDefaultTrackDisplay(trackDisplayMode, currentValues));
  }, [trackDisplayMode, currentValues]);
  let containerRef = reactExports.useRef(null);
  let getNumDecimalPlaces = reactExports.useMemo(() => {
    let stepString = step.toString();
    let decimalIndex = stepString.indexOf(".");
    return stepString.length - (decimalIndex + 1);
  }, [step]);
  let getAllowableThumbRange = reactExports.useCallback(
    (index) => {
      if ("inhibit-crossing" === thumbMode) {
        let minVal = 0 === index ? min : currentValues[index - 1] + step;
        let maxVal = index < currentValues.length - 1 ? currentValues[index + 1] - step : max;
        return [minVal, maxVal];
      }
      return [min, max];
    },
    [max, min, step, thumbMode, currentValues]
  );
  let [activeThumbIndex, setActiveThumbIndex] = reactExports.useState(void 0);
  let updateThumbValue = reactExports.useCallback(
    (event, callbackType) => {
      if (containerRef.current && void 0 !== activeThumbIndex) {
        let percent = getPercentageOfRectangle(
          containerRef.current.getBoundingClientRect(),
          event.clientX,
          event.clientY,
          orientation
        );
        let pointerValue = min + (max - min) * percent;
        pointerValue = roundValueToClosestStep(pointerValue, step, min);
        let [minVal, maxVal] = getAllowableThumbRange(activeThumbIndex);
        pointerValue = getBoundedValue(pointerValue, minVal, maxVal);
        if (pointerValue !== currentValues[activeThumbIndex]) {
          let newValues = [...currentValues];
          newValues[activeThumbIndex] = pointerValue;
          setCurrentValues(newValues);
          "onChange" === callbackType ? onChange?.(newValues) : onUpdate?.(newValues);
        } else if ("onChange" === callbackType) onChange?.(currentValues);
      }
    },
    [
      activeThumbIndex,
      min,
      max,
      step,
      getAllowableThumbRange,
      currentValues,
      onUpdate,
      onChange,
      orientation
    ]
  );
  let handlePointerMove = reactExports.useCallback(
    (event) => {
      if (void 0 === activeThumbIndex) return;
      event.preventDefault();
      event.stopPropagation();
      updateThumbValue(event, "onUpdate");
    },
    [activeThumbIndex, updateThumbValue]
  );
  let onThumbValueChanged = reactExports.useCallback(
    (index, value, keyboardReleased) => {
      if (currentValues[index] === value && !keyboardReleased) return;
      if (keyboardReleased) onChange?.(currentValues);
      else {
        let newValues = [...currentValues];
        newValues[index] = value;
        onUpdate?.(newValues);
        setCurrentValues(newValues);
      }
    },
    [currentValues, onUpdate, onChange]
  );
  let onThumbActivated = reactExports.useCallback((index) => {
    setActiveThumbIndex(index);
  }, []);
  let handlePointerUp = reactExports.useCallback(
    (event) => {
      if (void 0 === activeThumbIndex) return;
      updateThumbValue(event, "onChange");
      setActiveThumbIndex(void 0);
      event.preventDefault();
      event.stopPropagation();
    },
    [activeThumbIndex, updateThumbValue]
  );
  let handlePointerDownOnSlider = reactExports.useCallback(
    (event) => {
      if (containerRef.current) {
        let percent = getPercentageOfRectangle(
          containerRef.current.getBoundingClientRect(),
          event.clientX,
          event.clientY,
          orientation
        );
        let pointerValue = min + (max - min) * percent;
        pointerValue = roundValueToClosestStep(pointerValue, step, min);
        let closestValueIndex = getClosestValueIndex(
          currentValues,
          pointerValue
        );
        let [minVal, maxVal] = getAllowableThumbRange(closestValueIndex);
        pointerValue = getBoundedValue(pointerValue, minVal, maxVal);
        if (pointerValue === currentValues[closestValueIndex]) return;
        let newValues = [...currentValues];
        newValues[closestValueIndex] = pointerValue;
        setCurrentValues(newValues);
        onChange?.(newValues);
        onUpdate?.(newValues);
        focusThumb(containerRef.current, closestValueIndex);
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [
      min,
      max,
      step,
      currentValues,
      getAllowableThumbRange,
      onChange,
      onUpdate,
      orientation
    ]
  );
  useEventListener(
    "pointermove",
    handlePointerMove,
    containerRef.current?.ownerDocument
  );
  useEventListener(
    "pointerup",
    handlePointerUp,
    containerRef.current?.ownerDocument
  );
  let tickMarkArea = reactExports.useMemo(() => {
    if (!tickLabels) return null;
    if (Array.isArray(tickLabels))
      return reactExports.createElement(
        Box,
        {
          as: "div",
          ...ticksProps,
          className: classnames("iui-slider-ticks", ticksProps?.className)
        },
        tickLabels.map(
          (label, index) => reactExports.createElement(
            Box,
            {
              as: "span",
              ...tickProps,
              key: index,
              className: classnames("iui-slider-tick", tickProps?.className)
            },
            label
          )
        )
      );
    return tickLabels;
  }, [tickLabels, tickProps, ticksProps]);
  let generateTooltipProps = reactExports.useCallback(
    (index, val) => {
      let outProps = tooltipProps ? tooltipProps(index, val, step) : {};
      return {
        ...outProps,
        content: outProps.content ? outProps.content : formatNumberValue(val, step, getNumDecimalPlaces)
      };
    },
    [getNumDecimalPlaces, step, tooltipProps]
  );
  return reactExports.createElement(
    Box,
    {
      ref,
      className: classnames("iui-slider-container", className),
      "data-iui-orientation": orientation,
      "data-iui-disabled": disabled ? "true" : void 0,
      ...rest
    },
    minValueLabel && reactExports.createElement(
      Box,
      {
        as: "span",
        ...minProps,
        className: classnames("iui-slider-min", minProps?.className)
      },
      minValueLabel
    ),
    reactExports.createElement(
      FloatingDelayGroup,
      {
        delay: defaultTooltipDelay
      },
      reactExports.createElement(
        Box,
        {
          ref: containerRef,
          ...trackContainerProps,
          className: classnames(
            "iui-slider",
            {
              "iui-grabbing": void 0 !== activeThumbIndex
            },
            trackContainerProps?.className
          ),
          onPointerDown: handlePointerDownOnSlider
        },
        currentValues.map((thumbValue, index) => {
          let [minVal, maxVal] = getAllowableThumbRange(index);
          let thisThumbProps = thumbProps?.(index);
          return reactExports.createElement(Thumb, {
            key: thisThumbProps?.id ?? index,
            index,
            disabled,
            isActive: activeThumbIndex === index,
            onThumbActivated,
            onThumbValueChanged,
            minVal,
            maxVal,
            value: thumbValue,
            tooltipProps: generateTooltipProps(index, thumbValue),
            thumbProps: thisThumbProps,
            step,
            sliderMin: min,
            sliderMax: max
          });
        }),
        reactExports.createElement(Track, {
          trackDisplayMode: trackDisplay,
          sliderMin: min,
          sliderMax: max,
          values: currentValues,
          orientation,
          ...trackProps
        })
      )
    ),
    tickMarkArea,
    maxValueLabel && reactExports.createElement(
      Box,
      {
        as: "span",
        ...maxProps,
        className: classnames("iui-slider-max", maxProps?.className)
      },
      maxValueLabel
    )
  );
});
const Input$1 = reactExports.forwardRef((props, ref) => {
  let { size: size2, htmlSize, status, className, ...rest } = props;
  let inputRef = reactExports.useRef(null);
  let refs = useMergedRefs(inputRef, ref);
  return reactExports.createElement(Box, {
    as: "input",
    className: classnames("iui-input", "iui-field", className),
    "data-iui-size": size2,
    "data-iui-status": status,
    size: htmlSize,
    ref: refs,
    ...rest
  });
});
const ColorPalette = reactExports.forwardRef((props, ref) => {
  let {
    colors,
    label,
    labelProps,
    className,
    children,
    paletteContainerProps,
    ...rest
  } = props;
  let { activeColor, setActiveColor, onChangeComplete } = useColorPickerContext();
  return reactExports.createElement(
    Box,
    {
      className: classnames("iui-color-palette-wrapper", className),
      ref,
      ...rest
    },
    label && reactExports.createElement(
      Box,
      {
        as: "div",
        ...labelProps,
        className: classnames(
          "iui-color-picker-section-label",
          labelProps?.className
        )
      },
      label
    ),
    reactExports.createElement(
      Box,
      {
        as: "div",
        ...paletteContainerProps,
        className: classnames("iui-color-palette", paletteContainerProps?.className)
      },
      children,
      colors && colors.map((_color, index) => {
        let color = getColorValue(_color);
        return reactExports.createElement(ColorSwatch, {
          key: index,
          color,
          onClick: () => {
            onChangeComplete?.(color);
            setActiveColor(color);
          },
          isActive: color.equals(activeColor)
        });
      })
    )
  );
});
const MenuExtraContent = polymorphic.div("iui-menu-content");
const LinkAction = reactExports.forwardRef((props, forwardedRef) => {
  let { as: asProp = !!props.href ? "a" : "button" } = props;
  return reactExports.createElement(Box, {
    ...props,
    as: asProp,
    className: classnames("iui-link-action", props.className),
    ref: forwardedRef
  });
});
const LinkBox = polymorphic.div("iui-link-box");
const Tag = reactExports.forwardRef((props, forwardedRef) => {
  let {
    className,
    variant = "default",
    children,
    onRemove,
    onClick,
    labelProps,
    removeButtonProps,
    ...rest
  } = props;
  let shouldUseLinkAction = !!onClick && !!onRemove;
  return reactExports.createElement(
    Box,
    {
      as: shouldUseLinkAction ? LinkBox : onClick ? ButtonBase : "span",
      className: classnames(
        {
          "iui-tag-basic": "basic" === variant,
          "iui-tag": "default" === variant
        },
        className
      ),
      ref: forwardedRef,
      onClick: shouldUseLinkAction ? void 0 : onClick,
      ...rest
    },
    "default" === variant ? reactExports.createElement(
      Box,
      {
        as: shouldUseLinkAction ? LinkAction : "span",
        ...labelProps,
        onClick: mergeEventHandlers(
          labelProps?.onClick,
          shouldUseLinkAction ? onClick : void 0
        ),
        className: classnames("iui-tag-label", labelProps?.className)
      },
      children
    ) : children,
    onRemove && reactExports.createElement(
      IconButton,
      {
        styleType: "borderless",
        size: "small",
        "aria-label": "Delete tag",
        ...removeButtonProps,
        onClick: mergeEventHandlers(removeButtonProps?.onClick, onRemove),
        className: classnames("iui-tag-button", removeButtonProps?.className)
      },
      reactExports.createElement(SvgCloseSmall, {
        "aria-hidden": true
      })
    )
  );
});
const SelectTag = reactExports.forwardRef((props, forwardedRef) => {
  let { className, label, ...rest } = props;
  return reactExports.createElement(
    Tag,
    {
      className: classnames("iui-select-tag", className),
      labelProps: {
        className: "iui-select-tag-label"
      },
      removeButtonProps: {
        className: "iui-select-tag-button",
        "aria-label": `Deselect ${label}`
      },
      ref: forwardedRef,
      ...rest
    },
    label
  );
});
const ComboBoxRefsContext = reactExports.createContext(void 0);
const ComboBoxStateContext = reactExports.createContext(void 0);
const ComboBoxEndIcon = reactExports.forwardRef((props, forwardedRef) => {
  let { className, children, disabled, isOpen, ...rest } = props;
  return reactExports.createElement(
    Icon$1,
    {
      as: "span",
      ref: forwardedRef,
      className: classnames(
        "iui-end-icon",
        {
          "iui-disabled": disabled,
          "iui-open": isOpen
        },
        className
      ),
      ...rest
    },
    children ?? reactExports.createElement(SvgCaretDownSmall$1, {
      "aria-hidden": true
    })
  );
});
const SelectTagContainer = reactExports.forwardRef((props, forwardedRef) => {
  let { tags: tagsProp, className, ...rest } = props;
  let tags = reactExports.useMemo(() => reactExports.Children.toArray(tagsProp), [tagsProp]);
  return reactExports.createElement(
    OverflowContainer,
    {
      itemsCount: tags.length,
      className: classnames("iui-select-tag-container", className),
      ref: forwardedRef,
      ...rest
    },
    reactExports.createElement(SelectTagContainerContent, {
      ...props,
      tags
    })
  );
});
let SelectTagContainerContent = (props) => {
  let { tags } = props;
  let { visibleCount } = OverflowContainer.useContext();
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    visibleCount < tags.length ? tags.slice(0, visibleCount - 1) : tags,
    reactExports.createElement(
      OverflowContainer.OverflowNode,
      null,
      reactExports.createElement(SelectTag, {
        label: `+${tags.length - visibleCount + 1} item(s)`
      })
    )
  );
};
const ComboBoxMultipleContainer = reactExports.forwardRef((props, ref) => {
  let { selectedItems = [], ...rest } = props;
  return reactExports.createElement(SelectTagContainer, {
    ref,
    tags: selectedItems,
    ...rest
  });
});
const ComboBoxInput = reactExports.forwardRef((props, forwardedRef) => {
  let { selectTags, size: size2, style, ...rest } = props;
  let {
    isOpen,
    id,
    focusedIndex,
    setFocusedIndex,
    enableVirtualization,
    multiple,
    onClickHandler,
    popover,
    show,
    hide
  } = useSafeContext(ComboBoxStateContext);
  let { inputRef, menuRef, optionsExtraInfo } = useSafeContext(ComboBoxRefsContext);
  let refs = useMergedRefs(inputRef, popover.refs.setReference, forwardedRef);
  let focusedIndexRef = useLatestRef(focusedIndex ?? -1);
  let getIdFromIndex = (index) => menuRef.current?.querySelector(`[data-iui-index="${index}"]`)?.id ?? "";
  let handleKeyDown = reactExports.useCallback(
    (event) => {
      let length = Object.keys(optionsExtraInfo).length ?? 0;
      if (event.altKey) return;
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          if (!isOpen) return show();
          if (0 === length) return;
          if (-1 === focusedIndexRef.current) {
            let currentElement = menuRef.current?.querySelector("[data-iui-index]");
            return setFocusedIndex(
              Number(currentElement?.getAttribute("data-iui-index") ?? 0)
            );
          }
          if (enableVirtualization && !menuRef.current?.querySelector(
            `[data-iui-index="${focusedIndexRef.current}"]`
          )?.nextElementSibling)
            return;
          let nextIndex = focusedIndexRef.current;
          do {
            let currentElement = menuRef.current?.querySelector(
              `[data-iui-index="${nextIndex}"]`
            );
            let nextElement = currentElement?.nextElementSibling ?? menuRef.current?.querySelector("[data-iui-index]");
            nextIndex = Number(nextElement?.getAttribute("data-iui-index"));
            if (nextElement) return setFocusedIndex(nextIndex);
          } while (nextIndex !== focusedIndexRef.current);
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          if (!isOpen) return show();
          if (0 === length) return;
          if (enableVirtualization && !menuRef.current?.querySelector(
            `[data-iui-index="${focusedIndexRef.current}"]`
          )?.previousElementSibling)
            return;
          if (-1 === focusedIndexRef.current)
            return setFocusedIndex(
              Object.values(optionsExtraInfo)?.[length - 1].__originalIndex ?? -1
            );
          let prevIndex = focusedIndexRef.current;
          do {
            let currentElement = menuRef.current?.querySelector(
              `[data-iui-index="${prevIndex}"]`
            );
            let prevElement = currentElement?.previousElementSibling ?? menuRef.current?.querySelector("[data-iui-index]:last-of-type");
            prevIndex = Number(prevElement?.getAttribute("data-iui-index"));
            if (prevElement) return setFocusedIndex(prevIndex);
          } while (prevIndex !== focusedIndexRef.current);
          break;
        }
        case "Enter":
          event.preventDefault();
          if (isOpen) {
            if (focusedIndexRef.current > -1)
              onClickHandler?.(focusedIndexRef.current);
          } else show();
          break;
        case "Escape":
          event.preventDefault();
          hide();
          break;
        case "Tab":
          hide();
          break;
      }
    },
    [
      setFocusedIndex,
      enableVirtualization,
      focusedIndexRef,
      isOpen,
      menuRef,
      onClickHandler,
      optionsExtraInfo,
      show,
      hide
    ]
  );
  let wasOpenBeforeClick = reactExports.useRef(false);
  let handlePointerDown = reactExports.useCallback(() => {
    wasOpenBeforeClick.current = isOpen;
  }, [isOpen]);
  let handleClick = reactExports.useCallback(() => {
    if (wasOpenBeforeClick.current) hide();
    else show();
    wasOpenBeforeClick.current = false;
  }, [hide, show]);
  let [tagContainerWidthRef, tagContainerWidth] = useContainerWidth();
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(Input$1, {
      ref: refs,
      "aria-expanded": isOpen,
      "aria-activedescendant": isOpen && void 0 != focusedIndex && focusedIndex > -1 ? getIdFromIndex(focusedIndex) : void 0,
      role: "combobox",
      "aria-controls": isOpen ? `${id}-list` : void 0,
      "aria-autocomplete": "list",
      spellCheck: false,
      autoCapitalize: "none",
      autoCorrect: "off",
      style: {
        ...multiple && {
          paddingInlineStart: tagContainerWidth + 18
        },
        ...style
      },
      size: size2,
      ...popover.getReferenceProps({
        ...rest,
        onPointerDown: mergeEventHandlers(
          props.onPointerDown,
          handlePointerDown
        ),
        onClick: mergeEventHandlers(props.onClick, handleClick),
        onKeyDown: mergeEventHandlers(props.onKeyDown, handleKeyDown)
      })
    }),
    multiple && selectTags ? reactExports.createElement(ComboBoxMultipleContainer, {
      ref: tagContainerWidthRef,
      selectedItems: selectTags
    }) : null
  );
});
const ComboBoxInputContainer = reactExports.forwardRef(
  (props, forwardedRef) => {
    let { className, status, message, children, ...rest } = props;
    let { id } = useSafeContext(ComboBoxStateContext);
    return reactExports.createElement(
      InputContainer,
      {
        className,
        status,
        statusMessage: "string" == typeof message ? reactExports.createElement(
          StatusMessage,
          {
            status
          },
          message
        ) : reactExports.isValidElement(message) && reactExports.cloneElement(message, {
          status
        }),
        ref: forwardedRef,
        ...rest,
        id
      },
      reactExports.createElement(InputWithIcon, null, children)
    );
  }
);
const List = reactExports.forwardRef((props, ref) => {
  let { className, ...rest } = props;
  return reactExports.createElement(
    FloatingDelayGroup,
    {
      delay: defaultTooltipDelay
    },
    reactExports.createElement(Box, {
      as: "div",
      ref,
      role: "list",
      ...rest,
      className: classnames("iui-list", className)
    })
  );
});
let VirtualizedComboBoxMenu = (props) => {
  let { children, ...rest } = props;
  let { filteredOptions, getMenuItem, focusedIndex } = useSafeContext(ComboBoxStateContext);
  let { menuRef } = useSafeContext(ComboBoxRefsContext);
  let mostlySubLabeled = reactExports.useMemo(() => {
    let numberOfSubLabels = 0;
    for (let i = 0; i < Math.min(5, filteredOptions.length); i++)
      if (filteredOptions[i].sublabel) numberOfSubLabels++;
    return numberOfSubLabels >= Math.min(3, filteredOptions.length);
  }, [filteredOptions]);
  let focusedVisibleIndex = reactExports.useMemo(() => {
    let currentElement = menuRef.current?.querySelector(
      `[data-iui-index="${focusedIndex}"]`
    );
    if (!currentElement) return focusedIndex;
    return Number(
      currentElement.getAttribute("data-iui-filtered-index") ?? focusedIndex
    );
  }, [focusedIndex, menuRef]);
  let { virtualizer, css: virtualizerCss } = useVirtualScroll({
    count: filteredOptions.length || 1,
    getScrollElement: () => menuRef.current,
    estimateSize: () => mostlySubLabeled ? 48 : 36,
    gap: -1
  });
  useIsomorphicLayoutEffect$1(() => {
    virtualizer.scrollToIndex(focusedVisibleIndex);
  }, [virtualizer, focusedVisibleIndex]);
  let virtualItemRenderer = reactExports.useCallback(
    (virtualItem) => {
      let menuItem = filteredOptions.length > 0 ? getMenuItem(filteredOptions[virtualItem.index], virtualItem.index) : children;
      return reactExports.cloneElement(menuItem, {
        key: virtualItem.key,
        ref: virtualizer.measureElement,
        "data-iui-virtualizer": "item",
        style: {
          width: "100%",
          transform: `translateY(${virtualItem.start}px)`
        }
      });
    },
    [filteredOptions, getMenuItem, children, virtualizer.measureElement]
  );
  return reactExports.createElement(
    "div",
    {
      style: {
        display: "contents"
      }
    },
    reactExports.createElement(
      ShadowRoot,
      {
        css: virtualizerCss
      },
      reactExports.createElement(
        Box,
        {
          as: "div",
          "data-iui-virtualizer": "root",
          ...rest,
          style: {
            minBlockSize: virtualizer.getTotalSize(),
            ...props.style
          }
        },
        reactExports.createElement("slot", null)
      )
    ),
    reactExports.createElement(
      reactExports.Fragment,
      null,
      virtualizer.getVirtualItems().map((virtualItem) => virtualItemRenderer(virtualItem))
    )
  );
};
const ComboBoxMenu = reactExports.forwardRef((props, forwardedRef) => {
  let { className, children, style, portal = true, ...rest } = props;
  let { id, enableVirtualization, popover } = useSafeContext(ComboBoxStateContext);
  let { menuRef } = useSafeContext(ComboBoxRefsContext);
  let refs = useMergedRefs(popover.refs.setFloating, forwardedRef, menuRef);
  return popover.open && reactExports.createElement(
    Portal,
    {
      portal
    },
    reactExports.createElement(
      List,
      {
        as: "div",
        className: classnames("iui-menu", className),
        id: `${id}-list`,
        role: "listbox",
        ref: refs,
        ...popover.getFloatingProps({
          style: enableVirtualization ? {
            maxInlineSize: 0,
            ...style
          } : style,
          ...rest
        })
      },
      enableVirtualization ? reactExports.createElement(VirtualizedComboBoxMenu, null, children) : children
    )
  );
});
let ListItemComponent = reactExports.forwardRef((props, ref) => {
  let {
    size: size2 = "default",
    disabled = false,
    active = false,
    actionable = false,
    focused = false,
    className,
    ...rest
  } = props;
  return reactExports.createElement(Box, {
    role: "listitem",
    className: classnames("iui-list-item", className),
    "data-iui-active": active ? "true" : void 0,
    "data-iui-disabled": disabled ? "true" : void 0,
    "data-iui-size": "large" === size2 ? "large" : void 0,
    "data-iui-actionable": actionable ? "true" : void 0,
    "data-iui-focused": focused ? "true" : void 0,
    ref,
    ...rest
  });
});
let ListItemIcon = polymorphic.div("iui-list-item-icon");
let ListItemContent = polymorphic.div("iui-list-item-content");
let ListItemDescription = polymorphic.div("iui-list-item-description");
let ListItemAction = LinkAction;
const ListItem = Object.assign(ListItemComponent, {
  Icon: ListItemIcon,
  Content: ListItemContent,
  Description: ListItemDescription,
  Action: ListItemAction
});
const ComboBoxMenuItem = reactExports.memo(
  reactExports.forwardRef((props, forwardedRef) => {
    let {
      children,
      isSelected,
      disabled,
      value,
      onClick,
      sublabel,
      size: size2 = !!sublabel ? "large" : "default",
      startIcon,
      endIcon,
      role = "option",
      index,
      ...rest
    } = props;
    let { focusedIndex, enableVirtualization } = useSafeContext(ComboBoxStateContext);
    let focusRef = (el) => {
      if (!enableVirtualization && focusedIndex === index)
        el?.scrollIntoView({
          block: "nearest"
        });
    };
    let refs = useMergedRefs(forwardedRef, focusRef);
    return reactExports.createElement(
      ListItem,
      {
        as: "div",
        actionable: true,
        size: size2,
        active: isSelected,
        disabled,
        focused: focusedIndex === index,
        ref: refs,
        onClick: () => onClick?.(),
        role,
        tabIndex: "presentation" === role ? void 0 : -1,
        "aria-selected": isSelected,
        "aria-disabled": disabled,
        "data-iui-index": index,
        ...rest
      },
      startIcon && reactExports.createElement(
        ListItem.Icon,
        {
          as: "span",
          "aria-hidden": true
        },
        startIcon
      ),
      reactExports.createElement(
        ListItem.Content,
        null,
        children,
        sublabel && reactExports.createElement(ListItem.Description, null, sublabel)
      ),
      endIcon || isSelected && reactExports.createElement(
        ListItem.Icon,
        {
          as: "span",
          "aria-hidden": true
        },
        endIcon ?? reactExports.createElement(SvgCheckmark$1, null)
      )
    );
  })
);
let isMultipleEnabled$1 = (variable, multiple) => multiple && (Array.isArray(variable) || null == variable);
let isSingleOnChange$2 = (onChange, multiple) => !multiple;
let getOptionId = (option, idPrefix) => {
  if (option.id) return option.id;
  if ("string" == typeof option.value || "number" == typeof option.value)
    return `${idPrefix}-option-${option.value.toString().replace(/\s/g, "-")}`;
  return `${idPrefix}-option-${option.label.replace(/\s/g, "-")}`;
};
const ComboBox = reactExports.forwardRef((props, forwardedRef) => {
  let idPrefix = useId();
  let defaultFilterFunction = reactExports.useCallback(
    (options2, inputValue2) => options2.filter(
      (option) => option.label.toLowerCase().includes(inputValue2.toLowerCase())
    ),
    []
  );
  let {
    options,
    value: valueProp,
    onChange,
    filterFunction = defaultFilterFunction,
    inputProps,
    endIconProps,
    dropdownMenuProps: { middleware, ...dropdownMenuProps } = {},
    emptyStateMessage = "No options found",
    itemRenderer,
    enableVirtualization = false,
    multiple = false,
    onShow: onShowProp,
    onHide: onHideProp,
    id = inputProps?.id ? `iui-${inputProps.id}-cb` : idPrefix,
    defaultValue,
    clearFilterOnOptionToggle = true,
    ...rest
  } = props;
  let inputRef = reactExports.useRef(null);
  let menuRef = reactExports.useRef(null);
  let onChangeProp = useLatestRef(onChange);
  let optionsRef = useLatestRef(options);
  let filterFunctionRef = useLatestRef(filterFunction);
  let optionsExtraInfo = reactExports.useMemo(() => {
    let newOptionsExtraInfo = {};
    options.forEach((option, index) => {
      newOptionsExtraInfo[getOptionId(option, id)] = {
        __originalIndex: index
      };
    });
    return newOptionsExtraInfo;
  }, [id, options]);
  let getSelectedIndexes = reactExports.useCallback(
    (value) => {
      if (void 0 === value) return;
      if (!isMultipleEnabled$1(value, multiple))
        return options.findIndex((option) => option.value === value);
      {
        let indexArray = [];
        value?.forEach((value2) => {
          let indexToAdd = options.findIndex(
            (option) => option.value === value2
          );
          if (indexToAdd > -1) indexArray.push(indexToAdd);
        });
        return indexArray;
      }
    },
    [multiple, options]
  );
  let [selectedIndexes, setSelectedIndexes] = useControlledState(
    getSelectedIndexes(defaultValue) ?? (multiple ? [] : -1),
    getSelectedIndexes(valueProp)
  );
  let previousValue = reactExports.useRef(valueProp);
  useIsomorphicLayoutEffect$1(() => {
    if (valueProp !== previousValue.current) {
      previousValue.current = valueProp;
      if (void 0 === valueProp)
        isMultipleEnabled$1(selectedIndexes, multiple) ? setSelectedIndexes([]) : setSelectedIndexes(-1);
    }
  }, [multiple, selectedIndexes, setSelectedIndexes, valueProp]);
  let [isOpen, setIsOpen] = reactExports.useState(false);
  let [focusedIndex, setFocusedIndex] = reactExports.useState(-1);
  let onShowRef = useLatestRef(onShowProp);
  let onHideRef = useLatestRef(onHideProp);
  let show = reactExports.useCallback(() => {
    setIsOpen(true);
    onShowRef.current?.();
  }, [onShowRef]);
  let hide = reactExports.useCallback(() => {
    setIsOpen(false);
    onHideRef.current?.();
  }, [onHideRef]);
  useIsomorphicLayoutEffect$1(() => {
    if (isOpen) {
      inputRef.current?.focus();
      if (!isMultipleEnabled$1(selectedIndexes, multiple))
        setFocusedIndex(selectedIndexes ?? -1);
    } else {
      setFocusedIndex(-1);
      isMultipleEnabled$1(selectedIndexes, multiple) ? setInputValue("") : setInputValue(
        selectedIndexes >= 0 ? optionsRef.current[selectedIndexes]?.label ?? "" : ""
      );
      setIsInputDirty(false);
    }
  }, [isOpen, multiple, optionsRef, selectedIndexes]);
  let previousOptions = reactExports.useRef(options);
  reactExports.useEffect(() => {
    if (options !== previousOptions.current) {
      previousOptions.current = options;
      onOptionsChange();
    }
    function onOptionsChange() {
      isMultipleEnabled$1(selectedIndexes, multiple) ? setFocusedIndex(-1) : setFocusedIndex(selectedIndexes);
      if (!isMultipleEnabled$1(selectedIndexes, multiple) && !isOpen)
        setInputValue(
          selectedIndexes >= 0 ? options[selectedIndexes]?.label : ""
        );
    }
  }, [options, isOpen, multiple, selectedIndexes]);
  let [inputValue, setInputValue] = reactExports.useState(
    inputProps?.value?.toString() ?? ""
  );
  let [isInputDirty, setIsInputDirty] = reactExports.useState(false);
  let filteredOptions = reactExports.useMemo(() => {
    if (!isInputDirty) return options;
    return filterFunctionRef.current?.(options, inputValue);
  }, [filterFunctionRef, inputValue, options, isInputDirty]);
  let [liveRegionSelection, setLiveRegionSelection] = reactExports.useState("");
  let handleOnInput = reactExports.useCallback(
    (event) => {
      let { value } = event.currentTarget;
      setInputValue(value);
      show();
      setIsInputDirty(true);
      if (-1 != focusedIndex) setFocusedIndex(-1);
      inputProps?.onChange?.(event);
    },
    [focusedIndex, inputProps, show]
  );
  let isMenuItemSelected = reactExports.useCallback(
    (index) => {
      if (isMultipleEnabled$1(selectedIndexes, multiple))
        return selectedIndexes.includes(index);
      return selectedIndexes === index;
    },
    [multiple, selectedIndexes]
  );
  let selectedChangeHandler = reactExports.useCallback(
    (__originalIndex, action) => {
      if (!isMultipleEnabled$1(selectedIndexes, multiple)) return;
      if ("added" === action) return [...selectedIndexes, __originalIndex];
      return selectedIndexes?.filter((index) => index !== __originalIndex);
    },
    [selectedIndexes, multiple]
  );
  let onChangeHandler = reactExports.useCallback(
    (__originalIndex, actionType, newSelectedIndexes) => {
      if (isSingleOnChange$2(onChangeProp.current, multiple))
        onChangeProp.current?.(optionsRef.current[__originalIndex]?.value);
      else
        actionType && newSelectedIndexes && onChangeProp.current?.(
          newSelectedIndexes?.map(
            (index) => optionsRef.current[index]?.value
          ),
          {
            value: optionsRef.current[__originalIndex]?.value,
            type: actionType
          }
        );
    },
    [multiple, onChangeProp, optionsRef]
  );
  let handleOptionSelection = reactExports.useCallback(
    (__originalIndex) => {
      inputRef.current?.focus({
        preventScroll: true
      });
      if (optionsRef.current[__originalIndex]?.disabled) return;
      if (multiple) {
        let actionType = isMenuItemSelected(__originalIndex) ? "removed" : "added";
        let newSelectedIndexes = selectedChangeHandler(
          __originalIndex,
          actionType
        );
        if (null == newSelectedIndexes) return;
        setSelectedIndexes(newSelectedIndexes);
        onChangeHandler(__originalIndex, actionType, newSelectedIndexes);
        setLiveRegionSelection(
          newSelectedIndexes.map((item) => optionsRef.current[item]?.label).filter(Boolean).join(", ")
        );
        if (clearFilterOnOptionToggle) {
          setInputValue("");
          setIsInputDirty(false);
        }
      } else {
        setSelectedIndexes(__originalIndex);
        hide();
        onChangeHandler(__originalIndex);
      }
    },
    [
      optionsRef,
      multiple,
      isMenuItemSelected,
      selectedChangeHandler,
      setSelectedIndexes,
      onChangeHandler,
      clearFilterOnOptionToggle,
      hide
    ]
  );
  let getMenuItem = reactExports.useCallback(
    (option, filteredIndex) => {
      let optionId = getOptionId(option, id);
      let { __originalIndex } = optionsExtraInfo[optionId];
      let { icon, startIcon: startIconProp, label, ...restOptions } = option;
      let startIcon = startIconProp ?? icon;
      let customItem = itemRenderer ? itemRenderer(option, {
        isFocused: focusedIndex === __originalIndex,
        isSelected: isMenuItemSelected(__originalIndex),
        index: __originalIndex,
        id: optionId
      }) : null;
      return customItem ? reactExports.cloneElement(customItem, {
        onClick: (e) => {
          handleOptionSelection(__originalIndex);
          customItem.props.onClick?.(e);
        },
        focused: focusedIndex === __originalIndex,
        "data-iui-index": __originalIndex,
        "data-iui-filtered-index": filteredIndex,
        ref: mergeRefs(customItem.props.ref, (el) => {
          if (!enableVirtualization && focusedIndex === __originalIndex)
            el?.scrollIntoView({
              block: "nearest"
            });
        })
      }) : reactExports.createElement(
        ComboBoxMenuItem,
        {
          key: optionId,
          id: optionId,
          startIcon,
          ...restOptions,
          isSelected: isMenuItemSelected(__originalIndex),
          onClick: () => {
            handleOptionSelection(__originalIndex);
          },
          index: __originalIndex,
          "data-iui-filtered-index": filteredIndex
        },
        label
      );
    },
    [
      enableVirtualization,
      focusedIndex,
      id,
      isMenuItemSelected,
      itemRenderer,
      handleOptionSelection,
      optionsExtraInfo
    ]
  );
  let emptyContent = reactExports.useMemo(
    () => reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.isValidElement(emptyStateMessage) ? emptyStateMessage : reactExports.createElement(
        MenuExtraContent,
        null,
        reactExports.createElement(
          Text,
          {
            isMuted: true
          },
          emptyStateMessage
        )
      )
    ),
    [emptyStateMessage]
  );
  let popover = usePopover({
    visible: isOpen,
    onVisibleChange: (open) => open ? show() : hide(),
    matchWidth: true,
    middleware: {
      size: {
        maxHeight: "var(--iui-menu-max-height)"
      },
      ...middleware
    },
    closeOnOutsideClick: true,
    interactions: {
      click: false,
      focus: true
    }
  });
  return reactExports.createElement(
    ComboBoxRefsContext.Provider,
    {
      value: reactExports.useMemo(
        () => ({
          inputRef,
          menuRef,
          optionsExtraInfo
        }),
        [optionsExtraInfo]
      )
    },
    reactExports.createElement(
      ComboBoxStateContext.Provider,
      {
        value: reactExports.useMemo(
          () => ({
            id,
            isOpen,
            focusedIndex,
            setFocusedIndex,
            onClickHandler: handleOptionSelection,
            enableVirtualization,
            filteredOptions,
            getMenuItem,
            multiple,
            popover,
            show,
            hide
          }),
          [
            enableVirtualization,
            filteredOptions,
            focusedIndex,
            getMenuItem,
            handleOptionSelection,
            hide,
            id,
            isOpen,
            multiple,
            popover,
            show
          ]
        )
      },
      reactExports.createElement(
        ComboBoxInputContainer,
        {
          ref: forwardedRef,
          disabled: inputProps?.disabled,
          ...rest
        },
        reactExports.createElement(ComboBoxInput, {
          value: inputValue,
          disabled: inputProps?.disabled,
          ...inputProps,
          onChange: handleOnInput,
          "aria-describedby": [
            multiple ? `${id}-selected-live` : void 0,
            inputProps?.["aria-describedby"]
          ].filter(Boolean).join(" "),
          selectTags: isMultipleEnabled$1(selectedIndexes, multiple) ? selectedIndexes?.map((index) => {
            let option = options[index];
            let optionId = getOptionId(option, id);
            let { __originalIndex } = optionsExtraInfo[optionId];
            return reactExports.createElement(SelectTag, {
              key: option.label,
              label: option.label,
              onRemove: inputProps?.disabled ? void 0 : () => {
                handleOptionSelection(__originalIndex);
                hide();
              }
            });
          }).filter(Boolean) : void 0
        }),
        reactExports.createElement(ComboBoxEndIcon, {
          ...endIconProps,
          disabled: inputProps?.disabled,
          isOpen
        }),
        multiple ? reactExports.createElement(AutoclearingHiddenLiveRegion, {
          text: liveRegionSelection,
          id: `${id}-selected-live`
        }) : null
      ),
      reactExports.createElement(
        ComboBoxMenu,
        {
          as: "div",
          ...dropdownMenuProps
        },
        filteredOptions.length > 0 && !enableVirtualization ? filteredOptions.map(getMenuItem) : emptyContent
      )
    )
  );
});
let isSameHour = (date1, date2, meridiem) => {
  let adjustedHours = meridiem ? formatHourFrom12(date1.getHours(), meridiem) : date1.getHours();
  if (!!meridiem)
    return !!date2 && adjustedHours % 12 === date2.getHours() % 12;
  return !!date2 && adjustedHours === date2.getHours();
};
let isSameMinute = (date1, date2) => !!date2 && date1.getMinutes() === date2.getMinutes();
let isSameSecond = (date1, date2) => !!date2 && date1.getSeconds() === date2.getSeconds();
let isSameTime$1 = (date1, date2, precision, meridiem) => {
  let isSameTime2 = true;
  switch (precision) {
    case "seconds":
      isSameTime2 = isSameSecond(date1, date2);
      if (!isSameTime2) break;
    case "minutes":
      isSameTime2 = isSameMinute(date1, date2);
      if (!isSameTime2) break;
    case "hours":
      isSameTime2 = isSameHour(date1, date2, meridiem);
  }
  return isSameTime2;
};
let isSameMeridiem = (meridiem, date) => !!date && ("AM" === meridiem ? date.getHours() < 12 : date.getHours() >= 12);
let formatHourFrom12 = (hour, meridiem) => {
  let adjustedHour = hour % 12;
  return "PM" === meridiem ? adjustedHour + 12 : adjustedHour;
};
let setHours = (hour, date) => new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate(),
  hour,
  date.getMinutes(),
  date.getSeconds()
);
let defaultCombinedRenderer = (date, precision) => {
  let dateString = "";
  switch (precision) {
    case "seconds":
      dateString = ":" + date.getSeconds().toLocaleString(void 0, {
        minimumIntegerDigits: 2
      });
    case "minutes":
      dateString = ":" + date.getMinutes().toLocaleString(void 0, {
        minimumIntegerDigits: 2
      }) + dateString;
    case "hours":
      dateString = date.getHours().toLocaleString(void 0, {
        minimumIntegerDigits: 2
      }) + dateString;
  }
  return dateString;
};
const TimePicker = reactExports.forwardRef((props, forwardedRef) => {
  let {
    date,
    onChange,
    use12Hours = false,
    precision = "minutes",
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    setFocusHour = false,
    hourRenderer = (date2) => date2.getHours().toLocaleString(void 0, {
      minimumIntegerDigits: 2
    }),
    minuteRenderer = (date2) => date2.getMinutes().toLocaleString(void 0, {
      minimumIntegerDigits: 2
    }),
    secondRenderer = (date2) => date2.getSeconds().toLocaleString(void 0, {
      minimumIntegerDigits: 2
    }),
    meridiemRenderer = (meridiem2) => meridiem2,
    useCombinedRenderer = false,
    combinedRenderer = defaultCombinedRenderer,
    className,
    ...rest
  } = props;
  let [selectedTime, setSelectedTime] = reactExports.useState(date);
  let [focusedTime, setFocusedTime] = reactExports.useState(
    selectedTime ?? /* @__PURE__ */ new Date()
  );
  let [meridiem, setMeridiem] = reactExports.useState(
    use12Hours ? focusedTime?.getHours() > 11 ? "PM" : "AM" : void 0
  );
  reactExports.useEffect(() => {
    setFocusedTime(date ?? /* @__PURE__ */ new Date());
    setSelectedTime(date);
  }, [date]);
  let onHourClick = (date2) => {
    let adjustedHour = use12Hours ? formatHourFrom12(date2.getHours(), meridiem) : date2.getHours();
    let adjustedSelectedTime = setHours(
      adjustedHour,
      selectedTime ?? /* @__PURE__ */ new Date()
    );
    updateCurrentTime(adjustedSelectedTime);
  };
  let onTimeClick = (date2) => {
    let adjustedHour = use12Hours ? formatHourFrom12(date2.getHours(), meridiem) : date2.getHours();
    let adjustedSelectedTime = setHours(adjustedHour, date2);
    updateCurrentTime(adjustedSelectedTime);
  };
  let onMeridiemClick = (value) => {
    let adjustedSelectedTime = selectedTime ?? /* @__PURE__ */ new Date();
    let currentHours = adjustedSelectedTime.getHours();
    setMeridiem(value);
    if ("AM" === value && currentHours > 11)
      adjustedSelectedTime = setHours(currentHours - 12, adjustedSelectedTime);
    if ("PM" === value && currentHours <= 12)
      adjustedSelectedTime = setHours(currentHours + 12, adjustedSelectedTime);
    updateCurrentTime(adjustedSelectedTime);
  };
  let updateCurrentTime = (time22) => {
    let adjustedTime = time22;
    if ("hours" === precision)
      adjustedTime = new Date(
        time22.getFullYear(),
        time22.getMonth(),
        time22.getDate(),
        time22.getHours(),
        0,
        0
      );
    if ("minutes" === precision)
      adjustedTime = new Date(
        time22.getFullYear(),
        time22.getMonth(),
        time22.getDate(),
        time22.getHours(),
        time22.getMinutes(),
        0
      );
    setFocusedTime(adjustedTime);
    setSelectedTime(adjustedTime);
    onChange?.(adjustedTime);
  };
  let onHourFocus = (date2) => {
    let adjustedHour = use12Hours ? formatHourFrom12(date2.getHours(), meridiem) : date2.getHours();
    setFocusedTime(setHours(adjustedHour, focusedTime));
  };
  let onTimeFocus = (date2) => {
    let adjustedHour = use12Hours ? formatHourFrom12(date2.getHours(), meridiem) : date2.getHours();
    setFocusedTime(setHours(adjustedHour, date2));
  };
  let onMeridiemFocus = (value) => {
    let adjustedSelectedTime = selectedTime ?? /* @__PURE__ */ new Date();
    let currentHours = adjustedSelectedTime.getHours();
    if ("AM" === value && currentHours > 11) {
      setMeridiem(value);
      adjustedSelectedTime = setHours(currentHours - 12, adjustedSelectedTime);
    }
    if ("PM" === value && currentHours <= 12) {
      setMeridiem(value);
      adjustedSelectedTime = setHours(currentHours + 12, adjustedSelectedTime);
    }
    setFocusedTime(adjustedSelectedTime);
  };
  let generateDataList = (size2, value, step) => {
    let data = [];
    for (let i = 0; i < size2; i++) if (i % step === 0) data.push(value(i));
    return data;
  };
  let time2 = reactExports.useMemo(() => {
    let time22 = selectedTime ?? /* @__PURE__ */ new Date();
    let data = [];
    let hoursArray = Array.from(Array(use12Hours ? 12 : 24).keys()).filter((i) => i % hourStep === 0).map((i) => use12Hours && 0 === i ? 12 : i);
    let minutesArray = Array.from(Array(60).keys()).filter(
      (i) => i % minuteStep === 0
    );
    let secondsArray = Array.from(Array(60).keys()).filter(
      (i) => i % secondStep === 0
    );
    hoursArray.forEach((hour) => {
      if ("hours" === precision)
        data.push(
          new Date(
            time22.getFullYear(),
            time22.getMonth(),
            time22.getDate(),
            hour,
            time22.getMinutes(),
            time22.getSeconds()
          )
        );
      else
        minutesArray.forEach((minute) => {
          if ("minutes" === precision)
            data.push(
              new Date(
                time22.getFullYear(),
                time22.getMonth(),
                time22.getDate(),
                hour,
                minute,
                time22.getSeconds()
              )
            );
          else
            secondsArray.forEach((second) => {
              data.push(
                new Date(
                  time22.getFullYear(),
                  time22.getMonth(),
                  time22.getDate(),
                  hour,
                  minute,
                  second
                )
              );
            });
        });
    });
    return data;
  }, [hourStep, minuteStep, secondStep, selectedTime, use12Hours, precision]);
  let hours = reactExports.useMemo(() => {
    let time22 = selectedTime ?? /* @__PURE__ */ new Date();
    return generateDataList(
      use12Hours ? 12 : 24,
      (i) => new Date(
        time22.getFullYear(),
        time22.getMonth(),
        time22.getDate(),
        use12Hours && 0 === i ? 12 : i,
        time22.getMinutes(),
        time22.getSeconds()
      ),
      hourStep
    );
  }, [hourStep, selectedTime, use12Hours]);
  let minutes = reactExports.useMemo(() => {
    let time22 = selectedTime ?? /* @__PURE__ */ new Date();
    return generateDataList(
      60,
      (i) => new Date(
        time22.getFullYear(),
        time22.getMonth(),
        time22.getDate(),
        time22.getHours(),
        i,
        time22.getSeconds()
      ),
      minuteStep
    );
  }, [minuteStep, selectedTime]);
  let seconds = reactExports.useMemo(() => {
    let time22 = selectedTime ?? /* @__PURE__ */ new Date();
    return generateDataList(
      60,
      (i) => new Date(
        time22.getFullYear(),
        time22.getMonth(),
        time22.getDate(),
        time22.getHours(),
        time22.getMinutes(),
        i
      ),
      secondStep
    );
  }, [secondStep, selectedTime]);
  return reactExports.createElement(
    Box,
    {
      className: classnames("iui-time-picker", className),
      ref: forwardedRef,
      ...rest
    },
    useCombinedRenderer ? reactExports.createElement(TimePickerColumn, {
      data: time2,
      isSameFocused: (val) => isSameTime$1(
        val,
        focusedTime,
        precision,
        use12Hours ? meridiem : void 0
      ),
      isSameSelected: (val) => isSameTime$1(
        val,
        selectedTime,
        precision,
        use12Hours ? meridiem : void 0
      ),
      onFocusChange: onTimeFocus,
      onSelectChange: onTimeClick,
      setFocus: setFocusHour,
      precision,
      valueRenderer: combinedRenderer
    }) : reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement(TimePickerColumn, {
        data: hours,
        isSameFocused: (val) => isSameHour(val, focusedTime, use12Hours ? meridiem : void 0),
        isSameSelected: (val) => isSameHour(val, selectedTime, use12Hours ? meridiem : void 0),
        onFocusChange: onHourFocus,
        onSelectChange: onHourClick,
        setFocus: setFocusHour,
        valueRenderer: hourRenderer
      }),
      "hours" !== precision && reactExports.createElement(TimePickerColumn, {
        data: minutes,
        isSameFocused: (val) => isSameMinute(val, focusedTime),
        isSameSelected: (val) => isSameMinute(val, selectedTime),
        onFocusChange: (date2) => setFocusedTime(date2),
        onSelectChange: (date2) => updateCurrentTime(date2),
        valueRenderer: minuteRenderer
      }),
      "seconds" === precision && reactExports.createElement(TimePickerColumn, {
        data: seconds,
        isSameFocused: (val) => isSameSecond(val, focusedTime),
        isSameSelected: (val) => isSameSecond(val, selectedTime),
        onFocusChange: (date2) => setFocusedTime(date2),
        onSelectChange: (date2) => updateCurrentTime(date2),
        valueRenderer: secondRenderer
      })
    ),
    use12Hours && reactExports.createElement(TimePickerColumn, {
      data: ["AM", "PM"],
      isSameFocused: (val) => isSameMeridiem(val, focusedTime),
      isSameSelected: (val) => isSameMeridiem(val, selectedTime),
      onFocusChange: (date2) => onMeridiemFocus(date2),
      onSelectChange: (value) => onMeridiemClick(value),
      valueRenderer: meridiemRenderer,
      className: "iui-period"
    })
  );
});
let TimePickerColumn = (props) => {
  let {
    data,
    onFocusChange,
    onSelectChange,
    isSameFocused,
    isSameSelected,
    setFocus = false,
    valueRenderer,
    precision = "minutes",
    className = "iui-time"
  } = props;
  let needFocus = reactExports.useRef(setFocus);
  let handleTimeKeyDown = (event, maxValue, onFocus, onSelect, currentValue) => {
    if (event.altKey) return;
    switch (event.key) {
      case "ArrowDown":
        if (currentValue + 1 > maxValue) break;
        onFocus(currentValue + 1);
        needFocus.current = true;
        event.preventDefault();
        break;
      case "ArrowUp":
        if (currentValue - 1 < 0) break;
        onFocus(currentValue - 1);
        needFocus.current = true;
        event.preventDefault();
        break;
      case "Enter":
      case " ":
      case "Spacebar":
        onSelect(currentValue);
        event.preventDefault();
        break;
    }
  };
  return reactExports.createElement(
    Box,
    {
      className: `${className}`
    },
    reactExports.createElement(
      "ol",
      null,
      data.map((value, index) => {
        let isSameFocus = isSameFocused(value);
        return reactExports.createElement(
          Box,
          {
            as: "li",
            onKeyDown: (event) => {
              handleTimeKeyDown(
                event,
                data.length - 1,
                (index2) => onFocusChange(data[index2]),
                (index2) => onSelectChange(data[index2]),
                index
              );
            },
            className: classnames({
              "iui-selected": isSameSelected(value)
            }),
            key: index,
            tabIndex: isSameFocus ? 0 : void 0,
            ref: (ref) => {
              if (!ref || !isSameFocus) return;
              setTimeout(() => {
                ref.scrollIntoView({
                  block: "nearest",
                  inline: "nearest"
                });
                if (needFocus.current) {
                  ref.focus();
                  needFocus.current = false;
                }
              });
            },
            onClick: () => {
              onSelectChange(value);
            }
          },
          valueRenderer(value, precision)
        );
      })
    )
  );
};
let isSameDay$1 = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
let isInDateRange = (date, startDate, endDate) => {
  if (!date || !startDate || !endDate) return false;
  let minDate = new Date(startDate);
  let maxDate = new Date(endDate);
  let testDate = new Date(date);
  testDate && testDate.setHours(0, 0, 0, 0);
  minDate && minDate.setHours(0, 0, 0, 0);
  maxDate && maxDate.setHours(0, 0, 0, 0);
  return testDate > minDate && testDate < maxDate;
};
let isSingleOnChange$1 = (onChange, enableRangeSelect) => !enableRangeSelect;
let defaultMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let defaultShortDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
let defaultLongDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const DatePicker$1 = reactExports.forwardRef((props, forwardedRef) => {
  let {
    date,
    onChange,
    localizedNames,
    className,
    setFocus = false,
    showTime = false,
    use12Hours = false,
    precision,
    hourStep,
    minuteStep,
    secondStep,
    useCombinedRenderer,
    combinedRenderer,
    hourRenderer,
    minuteRenderer,
    secondRenderer,
    meridiemRenderer,
    showYearSelection = false,
    enableRangeSelect = false,
    startDate,
    endDate,
    monthYearProps,
    calendarProps,
    monthProps,
    weekDayProps,
    dayProps,
    weekProps,
    isDateDisabled,
    applyBackground = true,
    showDatesOutsideMonth = true,
    ...rest
  } = props;
  let monthNames = localizedNames?.months ?? defaultMonths;
  let shortDays = localizedNames?.shortDays ?? defaultShortDays;
  let longDays = localizedNames?.days ?? defaultLongDays;
  let [selectedDay, setSelectedDay] = reactExports.useState(date);
  let [selectedStartDay, setSelectedStartDay] = reactExports.useState(startDate);
  let [selectedEndDay, setSelectedEndDay] = reactExports.useState(endDate);
  let [focusedDay, setFocusedDay] = reactExports.useState(
    selectedStartDay ?? selectedDay ?? /* @__PURE__ */ new Date()
  );
  let [displayedMonthIndex, setDisplayedMonthIndex] = reactExports.useState(
    selectedStartDay?.getMonth() ?? selectedDay?.getMonth() ?? (/* @__PURE__ */ new Date()).getMonth()
  );
  let [displayedYear, setDisplayedYear] = reactExports.useState(
    selectedStartDay?.getFullYear() ?? selectedDay?.getFullYear() ?? (/* @__PURE__ */ new Date()).getFullYear()
  );
  let [isSelectingStartDate, setIsSelectingStartDate] = reactExports.useState(true);
  let needFocus = reactExports.useRef(setFocus);
  reactExports.useEffect(() => {
    if (needFocus.current) needFocus.current = false;
  });
  let setMonthAndYear = reactExports.useCallback((newMonth, newYear) => {
    setDisplayedMonthIndex(newMonth);
    setDisplayedYear(newYear);
  }, []);
  reactExports.useEffect(() => {
    let currentDate = /* @__PURE__ */ new Date();
    setSelectedDay(date);
    setSelectedStartDay(startDate);
    setSelectedEndDay(endDate);
    if (!enableRangeSelect) setFocusedDay(date ?? currentDate);
    setMonthAndYear(
      startDate?.getMonth() ?? date?.getMonth() ?? currentDate.getMonth(),
      startDate?.getFullYear() ?? date?.getFullYear() ?? currentDate.getFullYear()
    );
  }, [date, setMonthAndYear, startDate, endDate, enableRangeSelect]);
  let popoverInitialFocusContext = reactExports.useContext(PopoverInitialFocusContext);
  useIsomorphicLayoutEffect$1(() => {
    if (setFocus && popoverInitialFocusContext)
      popoverInitialFocusContext.setInitialFocus(-1);
  }, [popoverInitialFocusContext, setFocus]);
  let days2 = reactExports.useMemo(() => {
    let offsetToFirst = new Date(
      displayedYear,
      displayedMonthIndex,
      1
    ).getDay();
    if (0 === offsetToFirst && showDatesOutsideMonth) offsetToFirst = 7;
    let daysInMonth = [];
    for (let i = 1; i <= 42; i++) {
      let adjustedDay = i - offsetToFirst;
      daysInMonth.push(
        new Date(displayedYear, displayedMonthIndex, adjustedDay)
      );
    }
    return daysInMonth;
  }, [displayedMonthIndex, displayedYear, showDatesOutsideMonth]);
  let weeks = reactExports.useMemo(() => {
    let weeksInMonth = [];
    let weekCount = Math.ceil(days2.length / 7);
    for (let i = 0; i < weekCount; i++)
      weeksInMonth.push(days2.slice(7 * i, (i + 1) * 7));
    return weeksInMonth;
  }, [days2]);
  let getNewFocusedDate = (newYear, newMonth) => {
    let currentDate = selectedStartDay ?? selectedDay ?? /* @__PURE__ */ new Date();
    let newDate = new Date(
      newYear,
      newMonth,
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
    );
    return newDate;
  };
  let handleMoveToPreviousYear = () => {
    let newYear = displayedYear - 1;
    setMonthAndYear(displayedMonthIndex, newYear);
    setFocusedDay(getNewFocusedDate(newYear, displayedMonthIndex));
  };
  let handleMoveToNextYear = () => {
    let newYear = displayedYear + 1;
    setMonthAndYear(displayedMonthIndex, newYear);
    setFocusedDay(getNewFocusedDate(newYear, displayedMonthIndex));
  };
  let handleMoveToPreviousMonth = () => {
    let newMonth = 0 !== displayedMonthIndex ? displayedMonthIndex - 1 : 11;
    let newYear = 0 !== displayedMonthIndex ? displayedYear : displayedYear - 1;
    setMonthAndYear(newMonth, newYear);
    setFocusedDay(getNewFocusedDate(newYear, newMonth));
  };
  let handleMoveToNextMonth = () => {
    let newMonth = 11 !== displayedMonthIndex ? displayedMonthIndex + 1 : 0;
    let newYear = 11 !== displayedMonthIndex ? displayedYear : displayedYear + 1;
    setMonthAndYear(newMonth, newYear);
    setFocusedDay(getNewFocusedDate(newYear, newMonth));
  };
  let onDayClick = (day) => {
    if (enableRangeSelect)
      if (isSelectingStartDate) {
        if (day.getMonth() !== selectedStartDay?.getMonth())
          setMonthAndYear(day.getMonth(), day.getFullYear());
        let currentStartDate = selectedStartDay ?? /* @__PURE__ */ new Date();
        let newStartDate = new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate(),
          currentStartDate.getHours(),
          currentStartDate.getMinutes(),
          currentStartDate.getSeconds()
        );
        setSelectedStartDay(newStartDate);
        setFocusedDay(newStartDate);
        if (isBefore(newStartDate, selectedEndDay))
          selectedEndDay && onChange?.(newStartDate, selectedEndDay);
        else {
          setSelectedEndDay(newStartDate);
          onChange?.(newStartDate, newStartDate);
        }
        setIsSelectingStartDate(false);
      } else {
        if (day.getMonth() !== selectedEndDay?.getMonth())
          setMonthAndYear(day.getMonth(), day.getFullYear());
        let currentEndDate = selectedEndDay ?? /* @__PURE__ */ new Date();
        let newEndDate = new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate(),
          currentEndDate.getHours(),
          currentEndDate.getMinutes(),
          currentEndDate.getSeconds()
        );
        setFocusedDay(newEndDate);
        if (isBefore(newEndDate, selectedStartDay)) {
          setSelectedStartDay(newEndDate);
          selectedEndDay && onChange?.(newEndDate, selectedEndDay);
        } else {
          setSelectedEndDay(newEndDate);
          selectedStartDay && onChange?.(selectedStartDay, newEndDate);
          setIsSelectingStartDate(true);
        }
      }
    else {
      if (day.getMonth() !== selectedDay?.getMonth())
        setMonthAndYear(day.getMonth(), day.getFullYear());
      let currentDate = selectedDay ?? /* @__PURE__ */ new Date();
      let newDate = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      );
      setSelectedDay(newDate);
      setFocusedDay(newDate);
      isSingleOnChange$1(onChange, enableRangeSelect) && onChange?.(newDate);
    }
  };
  let handleCalendarKeyDown = (event) => {
    if (event.altKey) return;
    if (!focusedDay) return;
    let adjustedFocusedDay = new Date(focusedDay);
    switch (event.key) {
      case "ArrowDown":
        adjustedFocusedDay.setDate(focusedDay.getDate() + 7);
        if (adjustedFocusedDay.getMonth() !== displayedMonthIndex)
          handleMoveToNextMonth();
        setFocusedDay(adjustedFocusedDay);
        needFocus.current = true;
        event.preventDefault();
        break;
      case "ArrowUp":
        adjustedFocusedDay.setDate(focusedDay.getDate() - 7);
        if (adjustedFocusedDay.getMonth() !== displayedMonthIndex)
          handleMoveToPreviousMonth();
        setFocusedDay(adjustedFocusedDay);
        needFocus.current = true;
        event.preventDefault();
        break;
      case "ArrowLeft":
        adjustedFocusedDay.setDate(focusedDay.getDate() - 1);
        if (adjustedFocusedDay.getMonth() !== displayedMonthIndex)
          handleMoveToPreviousMonth();
        setFocusedDay(adjustedFocusedDay);
        needFocus.current = true;
        event.preventDefault();
        break;
      case "ArrowRight":
        adjustedFocusedDay.setDate(focusedDay.getDate() + 1);
        if (adjustedFocusedDay.getMonth() !== displayedMonthIndex)
          handleMoveToNextMonth();
        setFocusedDay(adjustedFocusedDay);
        needFocus.current = true;
        event.preventDefault();
        break;
      case "Enter":
      case " ":
      case "Spacebar":
        if (!isDateDisabled?.(focusedDay)) onDayClick(focusedDay);
        event.preventDefault();
        break;
    }
  };
  let getDayClass = (day) => {
    if (day.getMonth() !== displayedMonthIndex)
      return "iui-calendar-day-outside-month";
    let dayClass = "iui-calendar-day";
    let isSelectedDay = isSameDay$1(day, selectedDay) || isSameDay$1(day, selectedStartDay) && isSameDay$1(day, selectedEndDay);
    if (isSelectedDay) dayClass += "-selected";
    else if (isSameDay$1(day, selectedStartDay)) dayClass += "-range-start";
    else if (isSameDay$1(day, selectedEndDay)) dayClass += "-range-end";
    if (selectedStartDay && selectedEndDay && isInDateRange(day, selectedStartDay, selectedEndDay))
      dayClass += "-range";
    if (isSameDay$1(day, /* @__PURE__ */ new Date())) dayClass += "-today";
    return dayClass;
  };
  let dateTableId = useId();
  return reactExports.createElement(
    Box,
    {
      className: classnames(
        "iui-date-picker",
        {
          "iui-popover-surface": applyBackground
        },
        className
      ),
      ref: forwardedRef,
      ...rest
    },
    reactExports.createElement(
      "div",
      null,
      reactExports.createElement(
        Box,
        {
          as: "div",
          ...monthYearProps,
          className: classnames("iui-calendar-month-year", monthYearProps?.className)
        },
        showYearSelection && reactExports.createElement(
          IconButton,
          {
            styleType: "borderless",
            onClick: handleMoveToPreviousYear,
            "aria-label": "Previous year",
            size: "small"
          },
          reactExports.createElement(SvgChevronLeftDouble, null)
        ),
        reactExports.createElement(
          IconButton,
          {
            styleType: "borderless",
            onClick: handleMoveToPreviousMonth,
            "aria-label": "Previous month",
            size: "small"
          },
          reactExports.createElement(SvgChevronLeft$1, null)
        ),
        reactExports.createElement(
          "span",
          {
            "aria-live": "polite"
          },
          reactExports.createElement(
            Box,
            {
              as: "span",
              id: dateTableId,
              title: monthNames[displayedMonthIndex],
              ...monthProps,
              className: classnames("iui-calendar-month", monthProps?.className)
            },
            monthNames[displayedMonthIndex]
          ),
          " ",
          displayedYear
        ),
        reactExports.createElement(
          IconButton,
          {
            styleType: "borderless",
            onClick: handleMoveToNextMonth,
            "aria-label": "Next month",
            size: "small"
          },
          reactExports.createElement(SvgChevronRight$1, null)
        ),
        showYearSelection && reactExports.createElement(
          IconButton,
          {
            styleType: "borderless",
            onClick: handleMoveToNextYear,
            "aria-label": "Next year",
            size: "small"
          },
          reactExports.createElement(SvgChevronRightDouble, null)
        )
      ),
      reactExports.createElement(
        Box,
        {
          as: "div",
          ...weekDayProps,
          className: classnames("iui-calendar-weekdays", weekDayProps?.className)
        },
        shortDays.map(
          (day, index) => reactExports.createElement(
            "div",
            {
              key: day,
              title: longDays[index]
            },
            day
          )
        )
      ),
      reactExports.createElement(
        "div",
        {
          onKeyDown: handleCalendarKeyDown,
          role: "listbox",
          "aria-labelledby": dateTableId,
          ...calendarProps
        },
        weeks.map(
          (weekDays, weekIndex) => reactExports.createElement(
            Box,
            {
              as: "div",
              key: `week-${displayedMonthIndex}-${weekIndex}`,
              ...weekProps,
              className: classnames("iui-calendar-week", weekProps?.className)
            },
            weekDays.map((weekDay, dayIndex) => {
              let dateValue = weekDay.getDate();
              let isDisabled = isDateDisabled?.(weekDay);
              let isOutsideMonth = weekDay.getMonth() !== displayedMonthIndex;
              if (isOutsideMonth && !showDatesOutsideMonth)
                return reactExports.createElement(Box, {
                  key: `day-${displayedMonthIndex}-${dayIndex}`,
                  className: classnames(getDayClass(weekDay), dayProps?.className),
                  "aria-hidden": true
                });
              return reactExports.createElement(
                Box,
                {
                  as: "div",
                  key: `day-${displayedMonthIndex}-${dayIndex}`,
                  onClick: () => !isDisabled && onDayClick(weekDay),
                  role: "option",
                  tabIndex: isSameDay$1(weekDay, focusedDay) ? 0 : -1,
                  "aria-disabled": isDisabled ? "true" : void 0,
                  ref: (element) => {
                    if (isSameDay$1(weekDay, focusedDay) && needFocus.current)
                      setTimeout(() => {
                        element?.focus();
                      });
                  },
                  ...dayProps,
                  className: classnames(getDayClass(weekDay), dayProps?.className)
                },
                dateValue
              );
            })
          )
        )
      )
    ),
    showTime && reactExports.createElement(TimePicker, {
      date: selectedStartDay ?? selectedDay,
      use12Hours,
      precision,
      hourStep,
      minuteStep,
      secondStep,
      useCombinedRenderer,
      combinedRenderer,
      hourRenderer,
      minuteRenderer,
      secondRenderer,
      meridiemRenderer,
      onChange: (date2) => isSingleOnChange$1(onChange, enableRangeSelect) ? onChange?.(date2) : onChange?.(
        new Date(
          selectedStartDay?.getFullYear() ?? date2.getFullYear(),
          selectedStartDay?.getMonth() ?? date2.getMonth(),
          selectedStartDay?.getDate() ?? date2.getDate(),
          date2.getHours(),
          date2.getMinutes(),
          date2.getSeconds()
        ),
        new Date(
          selectedEndDay?.getFullYear() ?? date2.getFullYear(),
          selectedEndDay?.getMonth() ?? date2.getMonth(),
          selectedEndDay?.getDate() ?? date2.getDate(),
          date2.getHours(),
          date2.getMinutes(),
          date2.getSeconds()
        )
      )
    })
  );
});
let ExpandableBlockContext = reactExports.createContext(void 0);
let ExpandableBlockComponent = reactExports.forwardRef((props, forwardedRef) => {
  let { children, title, caption, endIcon, ...rest } = props;
  return reactExports.createElement(
    ExpandableBlock.Wrapper,
    {
      ...rest,
      ref: forwardedRef
    },
    reactExports.createElement(ExpandableBlock.Trigger, {
      label: title,
      caption,
      endIcon
    }),
    reactExports.createElement(ExpandableBlock.Content, null, children)
  );
});
const ExpandableBlockWrapper = reactExports.forwardRef(
  (props, forwardedRef) => {
    let {
      children,
      className,
      onToggle,
      style,
      isExpanded,
      status,
      size: size2 = "default",
      styleType = "default",
      disabled = false,
      ...rest
    } = props;
    let [expandedState, setExpanded] = reactExports.useState(isExpanded ?? false);
    let expanded = isExpanded ?? expandedState;
    let [descriptionId, setDescriptionId] = reactExports.useState(void 0);
    return reactExports.createElement(
      ExpandableBlockContext.Provider,
      {
        value: {
          status,
          isExpanded: expanded,
          onToggle,
          size: size2,
          styleType,
          disabled,
          setExpanded,
          children,
          descriptionId,
          setDescriptionId
        }
      },
      reactExports.createElement(
        Box,
        {
          className: classnames("iui-expandable-block", className),
          "data-iui-expanded": expanded,
          "data-iui-size": size2,
          "data-iui-variant": "default" !== styleType ? styleType : void 0,
          style,
          ref: forwardedRef,
          ...rest
        },
        children
      )
    );
  }
);
const ExpandableBlockTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    let { className, children, label, caption, expandIcon, endIcon, ...rest } = props;
    let { disabled, status } = useSafeContext(ExpandableBlockContext);
    return reactExports.createElement(
      LinkBox,
      {
        className: classnames("iui-expandable-header", className),
        "data-iui-disabled": disabled ? "true" : void 0,
        ref: forwardedRef,
        ...rest
      },
      children ?? reactExports.createElement(
        reactExports.Fragment,
        null,
        expandIcon ?? reactExports.createElement(ExpandableBlock.ExpandIcon, null),
        reactExports.createElement(
          ExpandableBlock.LabelArea,
          null,
          reactExports.createElement(ExpandableBlock.Title, null, label),
          caption && reactExports.createElement(ExpandableBlock.Caption, null, caption)
        ),
        endIcon || status ? reactExports.createElement(ExpandableBlock.EndIcon, null, endIcon) : null
      )
    );
  }
);
let ExpandableBlockExpandIcon = reactExports.forwardRef((props, forwardedRef) => {
  let { className, children, ...rest } = props;
  return reactExports.createElement(
    Icon$1,
    {
      className: classnames("iui-expandable-block-icon", className),
      ref: forwardedRef,
      ...rest
    },
    children ?? reactExports.createElement(SvgChevronRightSmall, {
      "aria-hidden": true
    })
  );
});
let ExpandableBlockLabelArea = polymorphic.span("iui-expandable-block-label");
let ExpandableBlockTitle = reactExports.forwardRef((props, forwardedRef) => {
  let { className, children, onClick: onClickProp, ...rest } = props;
  let { isExpanded, setExpanded, disabled, onToggle, descriptionId } = useSafeContext(ExpandableBlockContext);
  return reactExports.createElement(
    ButtonBase,
    {
      className: classnames("iui-expandable-block-title", "iui-link-action", className),
      "aria-expanded": isExpanded,
      "aria-disabled": disabled,
      onClick: mergeEventHandlers(onClickProp, () => {
        if (disabled) return;
        setExpanded(!isExpanded);
        onToggle?.(!isExpanded);
      }),
      ref: forwardedRef,
      "aria-describedby": descriptionId,
      ...rest
    },
    children
  );
});
let ExpandableBlockCaption = reactExports.forwardRef((props, forwardedRef) => {
  let fallbackId = useId();
  let { setDescriptionId } = useSafeContext(ExpandableBlockContext);
  reactExports.useEffect(() => {
    setDescriptionId(props.id || fallbackId);
    return () => setDescriptionId(void 0);
  }, [props.id, fallbackId, setDescriptionId]);
  return reactExports.createElement(Box, {
    ref: forwardedRef,
    id: fallbackId,
    ...props,
    className: classnames("iui-expandable-block-caption", props?.className)
  });
});
let ExpandableBlockEndIcon = reactExports.forwardRef((props, forwardedRef) => {
  let { children, ...rest } = props;
  let { status } = useSafeContext(ExpandableBlockContext);
  let icon = children ?? (status && StatusIconMap[status]());
  return reactExports.createElement(
    Icon$1,
    {
      fill: status,
      ref: forwardedRef,
      ...rest
    },
    icon
  );
});
const ExpandableBlockContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    let { className, children, innerProps, ...rest } = props;
    return reactExports.createElement(
      Box,
      {
        className: classnames("iui-expandable-content", className),
        ref: forwardedRef,
        ...rest
      },
      reactExports.createElement(Box, innerProps, children)
    );
  }
);
const ExpandableBlock = Object.assign(ExpandableBlockComponent, {
  Wrapper: ExpandableBlockWrapper,
  Trigger: ExpandableBlockTrigger,
  ExpandIcon: ExpandableBlockExpandIcon,
  LabelArea: ExpandableBlockLabelArea,
  Title: ExpandableBlockTitle,
  Caption: ExpandableBlockCaption,
  EndIcon: ExpandableBlockEndIcon,
  Content: ExpandableBlockContent
});
let InputWithDecorationsContext = reactExports.createContext(void 0);
let InputWithDecorationsComponent = reactExports.forwardRef((props, ref) => {
  let { children, size: size2, isDisabled, ...rest } = props;
  return reactExports.createElement(
    InputWithDecorationsContext.Provider,
    {
      value: {
        size: size2,
        isDisabled
      }
    },
    reactExports.createElement(
      InputFlexContainer,
      {
        isDisabled,
        size: size2,
        ref,
        ...rest
      },
      children
    )
  );
});
let InputWithDecorationsInput = reactExports.forwardRef((props, ref) => {
  let { id: idProp, size: size2, disabled: localDisabled, ...rest } = props;
  let { size: contextSize, isDisabled } = useSafeContext(
    InputWithDecorationsContext
  );
  return reactExports.createElement(Box, {
    as: "input",
    ref,
    "data-iui-size": size2 ?? contextSize,
    disabled: localDisabled ?? isDisabled,
    id: idProp,
    ...rest
  });
});
let InputWithDecorationsButton = reactExports.forwardRef((props, ref) => {
  let { children, size: size2, disabled: localDisabled, ...rest } = props;
  let { size: contextSize, isDisabled } = useSafeContext(
    InputWithDecorationsContext
  );
  return reactExports.createElement(
    InputFlexContainerButton,
    {
      ref,
      size: size2 ?? contextSize,
      disabled: localDisabled ?? isDisabled,
      ...rest
    },
    children
  );
});
let InputWithDecorationsIcon = InputFlexContainerIcon;
const InputWithDecorations = Object.assign(
  InputWithDecorationsComponent,
  {
    Input: InputWithDecorationsInput,
    Button: InputWithDecorationsButton,
    Icon: InputWithDecorationsIcon
  }
);
const Textarea = reactExports.forwardRef(
  (props, forwardedRef) => reactExports.createElement(Input$1, {
    as: "textarea",
    rows: 3,
    ref: forwardedRef,
    ...props
  })
);
const MenuItem = reactExports.forwardRef((props, forwardedRef) => {
  let {
    className,
    children,
    isSelected,
    disabled,
    value,
    onClick: onClickProp,
    sublabel,
    size: size2 = !!sublabel ? "large" : "default",
    icon,
    startIcon = icon,
    badge,
    endIcon = badge,
    role = "menuitem",
    subMenuItems = [],
    ...rest
  } = props;
  let hasSubMenu = reactExports.useMemo(
    () => subMenuItems.length > 0,
    [subMenuItems.length]
  );
  let parentMenu = reactExports.useContext(MenuContext);
  let dropdownMenu = reactExports.useContext(DropdownMenuContext);
  let shouldCloseMenuOnClick = reactExports.useContext(DropdownMenuCloseOnClickContext) && !hasSubMenu;
  let menuItemRef = reactExports.useRef(null);
  let submenuId = useId();
  let popoverProps = reactExports.useMemo(
    () => ({
      placement: "right-start",
      interactions: {
        click: true,
        hover: true,
        listNavigation: {
          nested: hasSubMenu,
          openOnArrowKeyDown: true
        }
      }
    }),
    [hasSubMenu]
  );
  let onClick = (event) => {
    if (disabled) return;
    if (shouldCloseMenuOnClick) dropdownMenu?.close();
    onClickProp?.(value ?? event);
  };
  let focusableItemIndex = parentMenu?.focusableElements.findIndex(
    (el) => el === menuItemRef.current
  );
  let trigger = reactExports.createElement(
    ListItem,
    {
      as: "button",
      type: "button",
      className: classnames("iui-button-base", className),
      actionable: true,
      size: size2,
      active: isSelected,
      disabled,
      ref: useMergedRefs(menuItemRef, forwardedRef),
      role,
      tabIndex: isSelected ? 0 : -1,
      "aria-selected": isSelected,
      "aria-haspopup": hasSubMenu ? "true" : void 0,
      "aria-controls": hasSubMenu ? submenuId : void 0,
      "aria-disabled": disabled,
      ...parentMenu?.popoverGetItemProps != null ? parentMenu.popoverGetItemProps({
        focusableItemIndex,
        userProps: {
          onClick
        }
      }) : {
        onClick
      },
      ...rest
    },
    startIcon && reactExports.createElement(
      ListItem.Icon,
      {
        as: "span",
        "aria-hidden": true
      },
      startIcon
    ),
    reactExports.createElement(
      ListItem.Content,
      null,
      reactExports.createElement("div", null, children),
      sublabel && reactExports.createElement(ListItem.Description, null, sublabel)
    ),
    !endIcon && hasSubMenu && reactExports.createElement(
      ListItem.Icon,
      {
        as: "span",
        "aria-hidden": true
      },
      reactExports.createElement(SvgCaretRightSmall$1, null)
    ),
    endIcon && reactExports.createElement(
      ListItem.Icon,
      {
        as: "span",
        "aria-hidden": true
      },
      endIcon
    )
  );
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    hasSubMenu && !disabled ? reactExports.createElement(
      Menu,
      {
        id: submenuId,
        trigger,
        popoverProps
      },
      subMenuItems
    ) : trigger
  );
});
const Select = reactExports.forwardRef((props, forwardedRef) => {
  let { native, ...rest } = props;
  let Component = native ? NativeSelect : CustomSelect;
  return reactExports.createElement(Component, {
    ...rest,
    ref: forwardedRef
  });
});
let NativeSelect = reactExports.forwardRef((props, forwardedRef) => {
  let {
    triggerProps,
    options,
    disabled,
    placeholder,
    defaultValue: defaultValueProp = void 0 !== placeholder ? "" : void 0,
    value: valueProp,
    onChange: onChangeProp,
    size: size2,
    status,
    styleType,
    required,
    ...rest
  } = props;
  return reactExports.createElement(
    InputWithIcon,
    {
      ...rest,
      ref: forwardedRef
    },
    reactExports.createElement(
      SelectButton,
      {
        as: "select",
        size: size2,
        status,
        styleType,
        disabled,
        defaultValue: void 0 === valueProp ? defaultValueProp : void 0,
        value: null === valueProp ? "" : valueProp,
        required,
        ...triggerProps,
        onKeyDown: mergeEventHandlers(triggerProps?.onKeyDown, (event) => {
          if ("Enter" === event.key) event.currentTarget.showPicker?.();
        }),
        onChange: mergeEventHandlers(triggerProps?.onChange, (event) => {
          onChangeProp?.(event.currentTarget.value, event);
        })
      },
      "borderless" !== styleType && void 0 !== placeholder ? reactExports.createElement(
        "option",
        {
          value: "",
          disabled: true
        },
        placeholder
      ) : null,
      options.map(
        (option) => reactExports.createElement(
          "option",
          {
            key: option.value,
            ...option
          },
          option.label
        )
      )
    ),
    reactExports.createElement(SelectEndIcon, {
      disabled
    })
  );
});
let CustomSelect = reactExports.forwardRef((props, forwardedRef) => {
  let uid = useId();
  let {
    options,
    value: valueProp,
    onChange: onChangeProp,
    placeholder,
    disabled = false,
    size: size2,
    itemRenderer,
    selectedItemRenderer,
    menuClassName,
    menuStyle,
    multiple = false,
    triggerProps,
    status,
    popoverProps: { portal = true, ...popoverProps } = {},
    styleType,
    ...rest
  } = props;
  let [isOpen, setIsOpen] = reactExports.useState(false);
  let [liveRegionSelection, setLiveRegionSelection] = reactExports.useState("");
  let [uncontrolledValue, setUncontrolledValue] = reactExports.useState();
  let value = void 0 !== valueProp ? valueProp : uncontrolledValue;
  let onChangeRef = useLatestRef(onChangeProp);
  let selectRef = reactExports.useRef(null);
  let show = reactExports.useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    popoverProps?.onVisibleChange?.(true);
  }, [disabled, popoverProps]);
  let hide = reactExports.useCallback(() => {
    setIsOpen(false);
    selectRef.current?.focus({
      preventScroll: true
    });
    popoverProps?.onVisibleChange?.(false);
  }, [popoverProps]);
  let handleOptionSelection = reactExports.useCallback(
    (option, { isSelected = false } = {}) => {
      if (isSingleOnChange(onChangeRef.current, multiple)) {
        setUncontrolledValue(option.value);
        onChangeRef.current?.(option.value);
        hide();
      } else {
        setUncontrolledValue(
          (prev) => isSelected ? prev?.filter((i) => option.value !== i) : [...prev ?? [], option.value]
        );
        onChangeRef.current?.(option.value, isSelected ? "removed" : "added");
      }
      if (isMultipleEnabled(value, multiple)) {
        let prevSelectedValue = value || [];
        let newSelectedValue = isSelected ? prevSelectedValue.filter((i) => option.value !== i) : [...prevSelectedValue, option.value];
        setLiveRegionSelection(
          options.filter((i) => newSelectedValue.includes(i.value)).map((item) => item.label).filter(Boolean).join(", ")
        );
      }
    },
    [hide, multiple, onChangeRef, options, value]
  );
  let menuItems = reactExports.useMemo(
    () => options.map((option, index) => {
      let isSelected = isMultipleEnabled(value, multiple) ? value?.includes(option.value) ?? false : value === option.value;
      let menuItem = itemRenderer ? itemRenderer(option, {
        close: () => setIsOpen(false),
        isSelected
      }) : reactExports.createElement(MenuItem, null, option.label);
      let {
        label,
        icon,
        startIcon: startIconProp,
        value: _,
        ...restOption
      } = option;
      let startIcon = startIconProp ?? icon;
      return reactExports.cloneElement(menuItem, {
        key: `${label}-${index}`,
        isSelected,
        startIcon,
        endIcon: isSelected ? reactExports.createElement(SvgCheckmark$1, {
          "aria-hidden": true
        }) : null,
        onClick: () => {
          if (option.disabled) return;
          handleOptionSelection(option, {
            isSelected
          });
        },
        ref: (el) => {
          if (isSelected && !multiple)
            el?.scrollIntoView({
              block: "nearest"
            });
        },
        role: "option",
        ...restOption,
        ...menuItem.props
      });
    }),
    [handleOptionSelection, itemRenderer, multiple, options, value]
  );
  let selectedItems = reactExports.useMemo(() => {
    if (null == value) return;
    return isMultipleEnabled(value, multiple) ? options.filter((option) => value.some((val) => val === option.value)) : options.find((option) => option.value === value);
  }, [multiple, options, value]);
  let defaultFocusedIndex = reactExports.useMemo(() => {
    let index = 0;
    if (Array.isArray(value) && value.length > 0)
      index = options.findIndex((option) => option.value === value[0]);
    else if (value)
      index = options.findIndex((option) => option.value === value);
    return index >= 0 ? index : 0;
  }, [options, value]);
  let tagRenderer = reactExports.useCallback(
    (option) => reactExports.createElement(SelectTag, {
      key: option.label,
      label: option.label,
      onRemove: disabled ? void 0 : () => {
        handleOptionSelection(option, {
          isSelected: true
        });
        selectRef.current?.focus();
      }
    }),
    [disabled, handleOptionSelection]
  );
  let popover = usePopover({
    visible: isOpen,
    matchWidth: true,
    closeOnOutsideClick: true,
    middleware: {
      size: {
        maxHeight: "var(--iui-menu-max-height)"
      }
    },
    ...popoverProps,
    onVisibleChange: (open) => open ? show() : hide()
  });
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(
      InputWithIcon,
      {
        ...rest,
        ref: useMergedRefs(popover.refs.setPositionReference, forwardedRef)
      },
      reactExports.createElement(
        SelectButton,
        {
          ...popover.getReferenceProps(),
          tabIndex: 0,
          role: "combobox",
          size: size2,
          status,
          "aria-disabled": disabled ? "true" : void 0,
          "data-iui-disabled": disabled ? "true" : void 0,
          "aria-autocomplete": "none",
          "aria-expanded": isOpen,
          "aria-haspopup": "listbox",
          "aria-controls": `${uid}-menu`,
          styleType,
          ...triggerProps,
          ref: useMergedRefs(
            selectRef,
            triggerProps?.ref,
            popover.refs.setReference
          ),
          className: classnames(
            {
              "iui-placeholder": (!selectedItems || 0 === selectedItems.length) && !!placeholder
            },
            triggerProps?.className
          ),
          "data-iui-multi": multiple
        },
        (!selectedItems || 0 === selectedItems.length) && reactExports.createElement(
          Box,
          {
            as: "span",
            className: "iui-content"
          },
          placeholder
        ),
        isMultipleEnabled(selectedItems, multiple) ? reactExports.createElement(AutoclearingHiddenLiveRegion, {
          text: liveRegionSelection
        }) : reactExports.createElement(SingleSelectButton, {
          selectedItem: selectedItems,
          selectedItemRenderer
        })
      ),
      reactExports.createElement(SelectEndIcon, {
        disabled,
        isOpen
      }),
      isMultipleEnabled(selectedItems, multiple) ? reactExports.createElement(MultipleSelectButton, {
        selectedItems,
        selectedItemsRenderer: selectedItemRenderer,
        tagRenderer,
        size: "small" === size2 ? "small" : void 0
      }) : null
    ),
    popover.open && reactExports.createElement(
      Portal,
      {
        portal
      },
      reactExports.createElement(
        SelectListbox,
        {
          defaultFocusedIndex,
          className: menuClassName,
          id: `${uid}-menu`,
          key: `${uid}-menu`,
          ...popover.getFloatingProps({
            style: menuStyle,
            onKeyDown: ({ key }) => {
              if ("Tab" === key) hide();
            }
          }),
          ref: popover.refs.setFloating
        },
        menuItems
      )
    )
  );
});
let isMultipleEnabled = (variable, multiple) => multiple;
let isSingleOnChange = (onChange, multiple) => !multiple;
let SelectButton = reactExports.forwardRef((props, forwardedRef) => {
  let { size: size2, status, styleType = "default", ...rest } = props;
  return reactExports.createElement(Box, {
    "data-iui-size": size2,
    "data-iui-status": status,
    "data-iui-variant": "default" !== styleType ? styleType : void 0,
    ...rest,
    ref: forwardedRef,
    className: classnames("iui-select-button", "iui-field", props.className)
  });
});
let SelectEndIcon = reactExports.forwardRef((props, forwardedRef) => {
  let { disabled, isOpen, ...rest } = props;
  return reactExports.createElement(
    Icon$1,
    {
      "aria-hidden": true,
      ...rest,
      ref: forwardedRef,
      className: classnames(
        "iui-end-icon",
        {
          "iui-disabled": disabled,
          "iui-open": isOpen
        },
        props.className
      )
    },
    reactExports.createElement(SvgCaretDownSmall$1, null)
  );
});
let SingleSelectButton = ({ selectedItem, selectedItemRenderer }) => {
  let startIcon = selectedItem?.startIcon ?? selectedItem?.icon;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    selectedItem && selectedItemRenderer && selectedItemRenderer(selectedItem),
    selectedItem && !selectedItemRenderer && reactExports.createElement(
      reactExports.Fragment,
      null,
      startIcon && reactExports.createElement(
        Box,
        {
          as: "span",
          className: "iui-icon",
          "aria-hidden": true
        },
        startIcon
      ),
      reactExports.createElement(
        Box,
        {
          as: "span",
          className: "iui-content"
        },
        selectedItem.label
      )
    )
  );
};
let MultipleSelectButton = ({
  selectedItems,
  selectedItemsRenderer,
  tagRenderer,
  size: size2
}) => {
  let selectedItemsElements = reactExports.useMemo(() => {
    if (!selectedItems) return [];
    return selectedItems.map((item) => tagRenderer(item));
  }, [selectedItems, tagRenderer]);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    selectedItems && reactExports.createElement(
      Box,
      {
        as: "span",
        className: "iui-content"
      },
      selectedItemsRenderer ? selectedItemsRenderer(selectedItems) : reactExports.createElement(SelectTagContainer, {
        tags: selectedItemsElements,
        "data-iui-size": size2
      })
    )
  );
};
let SelectListbox = reactExports.forwardRef((props, forwardedRef) => {
  let {
    defaultFocusedIndex = 0,
    autoFocus = true,
    children: childrenProp,
    className,
    ...rest
  } = props;
  let [focusedIndex, setFocusedIndex] = reactExports.useState(defaultFocusedIndex);
  let autoFocusRef = reactExports.useCallback((element) => {
    queueMicrotask(() => {
      let firstFocusable = element?.querySelector('[tabindex="0"]');
      firstFocusable?.focus();
    });
  }, []);
  let children = reactExports.useMemo(
    () => reactExports.Children.map(childrenProp, (child, index) => {
      if (reactExports.isValidElement(child)) {
        let ref = isReact17or18 ? child.ref : child.props.ref;
        return reactExports.createElement(CompositeItem, {
          key: index,
          ref,
          render: child
        });
      }
      return child;
    }),
    [childrenProp]
  );
  return reactExports.createElement(
    Composite,
    {
      render: reactExports.createElement(List, {
        as: "div",
        className: classnames("iui-menu", className)
      }),
      orientation: "vertical",
      role: "listbox",
      activeIndex: focusedIndex,
      onNavigate: setFocusedIndex,
      ref: useMergedRefs(forwardedRef, autoFocus ? autoFocusRef : void 0),
      ...rest
    },
    children
  );
});
let sizeTokens = ["3xs", "2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl"];
let getValueForToken = (token) => {
  if (sizeTokens.includes(token)) return `var(--iui-size-${token})`;
  return token;
};
let FlexComponent = reactExports.forwardRef((props, ref) => {
  let {
    display,
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    flexWrap,
    className,
    style,
    ...rest
  } = props;
  return reactExports.createElement(Box, {
    className: classnames("iui-flex", className),
    style: {
      "--iui-flex-display": display,
      "--iui-flex-direction": flexDirection,
      "--iui-flex-justify": justifyContent,
      "--iui-flex-align": alignItems,
      "--iui-flex-gap": getValueForToken(gap),
      "--iui-flex-wrap": flexWrap,
      ...style
    },
    ref,
    ...rest
  });
});
let FlexSpacer = reactExports.forwardRef((props, ref) => {
  let { flex, className, style, ...rest } = props;
  return reactExports.createElement(Box, {
    className: classnames("iui-flex-spacer", className),
    style: {
      "--iui-flex-spacer-flex": flex,
      ...style
    },
    ref,
    ...rest
  });
});
let FlexItem = reactExports.forwardRef((props, ref) => {
  let { gapBefore, gapAfter, flex, alignSelf, className, style, ...rest } = props;
  let _style = {
    "--iui-flex-item-flex": flex,
    "--iui-flex-item-align": alignSelf,
    "--iui-flex-item-gap-before": getValueForToken(gapBefore),
    "--iui-flex-item-gap-after": getValueForToken(gapAfter),
    ...void 0 !== gapBefore && {
      "--iui-flex-item-gap-before-toggle": "var(--iui-on)"
    },
    ...void 0 !== gapAfter && {
      "--iui-flex-item-gap-after-toggle": "var(--iui-on)"
    },
    ...style
  };
  return reactExports.createElement(Box, {
    className: classnames("iui-flex-item", className),
    ref,
    style: _style,
    ...rest
  });
});
const Flex = Object.assign(FlexComponent, {
  Item: FlexItem,
  Spacer: FlexSpacer
});
const ToggleSwitch = reactExports.forwardRef((props, ref) => {
  let {
    disabled = false,
    labelPosition = "right",
    label,
    className,
    style,
    size: size2 = "default",
    labelProps = {},
    wrapperProps,
    icon: iconProp,
    ...rest
  } = props;
  let { consistentPropsSpread } = useFutureFlag("ToggleSwitch") || {};
  let shouldApplyClassNameAndStyleOnInput = null != wrapperProps || consistentPropsSpread;
  let shouldShowIcon = void 0 === iconProp || null !== iconProp && "small" !== size2;
  return reactExports.createElement(
    Box,
    {
      as: label ? "label" : "div",
      style: shouldApplyClassNameAndStyleOnInput ? void 0 : style,
      ...wrapperProps,
      className: classnames(
        "iui-toggle-switch-wrapper",
        {
          "iui-disabled": disabled,
          "iui-label-on-right": label && "right" === labelPosition,
          "iui-label-on-left": label && "left" === labelPosition
        },
        shouldApplyClassNameAndStyleOnInput ? void 0 : className,
        wrapperProps?.className
      ),
      "data-iui-size": size2
    },
    reactExports.createElement(Box, {
      as: "input",
      type: "checkbox",
      role: "switch",
      style: shouldApplyClassNameAndStyleOnInput ? style : void 0,
      ...rest,
      className: classnames(
        "iui-toggle-switch",
        shouldApplyClassNameAndStyleOnInput ? className : void 0
      ),
      disabled,
      ref
    }),
    shouldShowIcon && reactExports.createElement(
      Box,
      {
        as: "span",
        className: "iui-toggle-switch-icon",
        "aria-hidden": true
      },
      iconProp || reactExports.createElement(SvgCheckmark$1, null)
    ),
    label && reactExports.createElement(
      Box,
      {
        as: "span",
        ...labelProps,
        className: classnames("iui-toggle-switch-label", labelProps?.className)
      },
      label
    )
  );
});
function compareWithTolerance(a, b, tolerance = 0.1) {
  if (a < b - tolerance)
    return -1;
  else if (a > b + tolerance)
    return 1;
  else
    return 0;
}
function compareNumbers(a, b) {
  return a - b;
}
function compareBooleans(a, b) {
  return a !== b ? a < b ? -1 : 1 : 0;
}
function compareStrings$1(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}
function comparePossiblyUndefined(compareDefined, lhs, rhs) {
  if (void 0 === lhs)
    return void 0 === rhs ? 0 : -1;
  else if (void 0 === rhs)
    return 1;
  else
    return compareDefined(lhs, rhs);
}
function compareStringsOrUndefined(lhs, rhs) {
  return comparePossiblyUndefined(compareStrings$1, lhs, rhs);
}
function compareNumbersOrUndefined(lhs, rhs) {
  return comparePossiblyUndefined(compareNumbers, lhs, rhs);
}
function compareBooleansOrUndefined(lhs, rhs) {
  return comparePossiblyUndefined(compareBooleans, lhs, rhs);
}
function compareSimpleTypes(lhs, rhs) {
  let cmp = 0;
  cmp = compareStrings$1(typeof lhs, typeof rhs);
  if (cmp !== 0) {
    return cmp;
  }
  switch (typeof lhs) {
    case "number":
      return compareNumbers(lhs, rhs);
    case "string":
      return compareStrings$1(lhs, rhs);
    case "boolean":
      return compareBooleans(lhs, rhs);
  }
  return cmp;
}
function compareSimpleArrays(lhs, rhs) {
  if (void 0 === lhs)
    return void 0 === rhs ? 0 : -1;
  else if (void 0 === rhs)
    return 1;
  else if (lhs.length === 0 && rhs.length === 0) {
    return 0;
  } else if (lhs.length !== rhs.length) {
    return lhs.length - rhs.length;
  }
  let cmp = 0;
  for (let i = 0; i < lhs.length; i++) {
    cmp = compareSimpleTypes(lhs[i], rhs[i]);
    if (cmp !== 0) {
      break;
    }
  }
  return cmp;
}
function compareArrays(lhs, rhs, compare) {
  let diff = compareNumbers(lhs.length, rhs.length);
  if (!diff) {
    for (let i = 0; i < lhs.length; i++) {
      diff = compare(lhs[i], rhs[i]);
      if (diff) {
        break;
      }
    }
  }
  return diff;
}
class GenericUiEvent extends BeUiEvent {
}
class UiAdmin {
  _featureFlags = {};
  static _messagePresenter;
  /** The MessagePresenter used to display messages. */
  static get messagePresenter() {
    if (!UiAdmin._messagePresenter) {
      const error = new BentleyError(BentleyStatus.ERROR, "UiAdmin.messagePresenter not set");
      error.category = "messagePresenter";
      throw error;
    }
    return UiAdmin._messagePresenter;
  }
  static set messagePresenter(mp) {
    UiAdmin._messagePresenter = mp;
  }
  get featureFlags() {
    return { ...this._featureFlags };
  }
  updateFeatureFlags(uiFlags) {
    this._featureFlags = { ...this._featureFlags, ...uiFlags };
  }
  /** @internal */
  onInitialized() {
  }
  /** Get the cursor X and Y position. */
  get cursorPosition() {
    return { x: 0, y: 0 };
  }
  /** Create a PointProps object.
  * @deprecated in 4.2.0 - will not be removed until after 2026-06-13. Please use @core/geometry [[XAndY]] or a custom implementation.
  */
  createXAndY(x, y) {
    return { x, y };
  }
  /** Determines if focus is set to Home */
  get isFocusOnHome() {
    return false;
  }
  /** Sets focus to Home */
  setFocusToHome() {
  }
  /** Show a context menu at a particular location.
   * @param _menuItemsProps Properties of the menu items to display.
   * @param _location Location of the context menu, relative to the origin of htmlElement or the window.
   * @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the menu was displayed, false if the menu could not be displayed.
   */
  showContextMenu(_menuItemsProps, _location, _htmlElement) {
    return false;
  }
  /** Show a Toolbar at a particular location.
   * @param _toolbarProps Properties of the Toolbar to display.
   * @param _location Location of the Toolbar, relative to the origin of htmlElement or the window.
   * @param _offset Offset of the Toolbar from the location.
   * @param _onItemExecuted Function invoked after a Toolbar item is executed
   * @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the Toolbar
   * @param _relativePosition Position relative to the given location. Defaults to TopRight.
   * @param _htmlElement The HTMLElement that anchors the Toolbar. If undefined, the location is relative to the overall window.
   * @return true if the Toolbar was displayed, false if the Toolbar could not be displayed.
   */
  showToolbar(_toolbarProps, _location, _offset, _onItemExecuted, _onCancel, _relativePosition, _htmlElement) {
    return false;
  }
  /** Hides the toolbar. */
  hideToolbar() {
    return false;
  }
  /** Show a menu button at a particular location. A menu button opens a context menu.
   * @param _id Id of the menu button. Multiple menu buttons may be displayed.
   * @param _menuItemsProps Properties of the menu items to display.
   * @param _location Location of the context menu, relative to the origin of htmlElement or the window.
   * @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the button was displayed, false if the button could not be displayed.
   */
  showMenuButton(_id, _menuItemsProps, _location, _htmlElement) {
    return false;
  }
  /** Hides a menu button.
   * @param _id Id of the menu button. Multiple menu buttons may be displayed.
   * @return true if the menu was hidden, false if the menu could not be hidden.
   */
  hideMenuButton(_id) {
    return false;
  }
  /** Show a calculator at a particular location.
   * @param _initialValue Value initially displayed in the calculator.
   * @param _resultIcon Icon displayed to the left of the value.
   * @param _location Location of the calculator, relative to the origin of htmlElement or the window.
   * @param _onCommit Function called when the OK button or the Enter key is pressed.
   * @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the calculator was displayed, false if the calculator could not be displayed.
   */
  showCalculator(_initialValue, _resultIcon, _location, _onCommit, _onCancel, _htmlElement) {
    return false;
  }
  /** Hides the calculator. */
  hideCalculator() {
    return false;
  }
  /** Show an input editor for an angle value at a particular location.
   * @param _initialValue Value initially displayed in the editor.
   * @param _location Location of the editor, relative to the origin of htmlElement or the window.
   * @param _onCommit Function called when the OK button or the Enter key is pressed.
   * @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   */
  showAngleEditor(_initialValue, _location, _onCommit, _onCancel, _htmlElement) {
    return false;
  }
  /** Show an input editor for a length value at a particular location.
   * @param _initialValue Value initially displayed in the editor.
   * @param _location Location of the editor, relative to the origin of htmlElement or the window.
   * @param _onCommit Function called when the OK button or the Enter key is pressed.
   * @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   */
  showLengthEditor(_initialValue, _location, _onCommit, _onCancel, _htmlElement) {
    return false;
  }
  /** Show an input editor for a height value at a particular location.
   * @param _initialValue Value initially displayed in the editor.
   * @param _location Location of the editor, relative to the origin of htmlElement or the window.
   * @param _onCommit Function called when the OK button or the Enter key is pressed.
   * @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   */
  showHeightEditor(_initialValue, _location, _onCommit, _onCancel, _htmlElement) {
    return false;
  }
  /** Show an input editor for a primitive value at a particular location.
   * @param _initialValue Value initially displayed in the editor.
   * @param _propertyDescription Description of the primitive value property.
   * @param _location Location of the editor, relative to the origin of htmlElement or the window.
   * @param _onCommit Function called when the OK button or the Enter key is pressed.
   * @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
   * @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
   * @return true if the editor was displayed, false if the editor could not be displayed.
   */
  showInputEditor(_initialValue, _propertyDescription, _location, _onCommit, _onCancel, _htmlElement) {
    return false;
  }
  /** Hides the input editor. */
  hideInputEditor() {
    return false;
  }
  /** Show an HTML element at a particular location.
   * @param _displayElement The HTMLElement to display
   * @param _location Location of the tool settings, relative to the origin of anchorElement or the window
   * @param _offset Offset of the display element from the location
   * @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the display element
   * @param _relativePosition Position relative to the given location. Defaults to TopRight.
   * @param _anchorElement The HTMLElement that anchors the display element. If undefined, the location is relative to the overall window.
   * @return true if the display element was displayed, false if the display element could not be displayed.
   */
  showHTMLElement(_displayElement, _location, _offset, _onCancel, _relativePosition, _anchorElement) {
    return false;
  }
  /** Hides the HTML Element. */
  hideHTMLElement() {
    return false;
  }
  /** Show a Card containing content, a title and a toolbar at a particular location.
   * @param _content The HTMLElement of the content to display
   * @param _title Title to display at the top of the card.
   * @param _toolbarProps Properties of the Toolbar to display.
   * @param _location Location of the Card, relative to the origin of anchorElement or the window.
   * @param _offset Offset of the Card from the location.
   * @param _onItemExecuted Function invoked after a Toolbar item is executed
   * @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the Card
   * @param _relativePosition Position relative to the given location. Defaults to TopRight.
   * @param _anchorElement The HTMLElement that anchors the Card. If undefined, the location is relative to the overall window.
   * @return true if the Card was displayed, false if the Card could not be displayed.
   */
  showCard(_content, _title, _toolbarProps, _location, _offset, _onItemExecuted, _onCancel, _relativePosition, _anchorElement) {
    return false;
  }
  /** Hides the Card. */
  hideCard() {
    return false;
  }
  /** Opens a Tool Settings Ui popup at a particular location.
   * @param _dataProvider The UiDataProvider for the tool settings
   * @param _location Location of the tool settings, relative to the origin of anchorElement or the window
   * @param _offset Offset of the tool settings from the location
   * @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the tool settings
   * @param _relativePosition Position relative to the given location. Defaults to TopRight.
   * @param _anchorElement The HTMLElement that anchors the tool settings. If undefined, the location is relative to the overall window.
   * @return true if the tool settings were displayed, false if the tool settings could not be displayed.
   */
  openToolSettingsPopup(_dataProvider, _location, _offset, _onCancel, _relativePosition, _anchorElement) {
    return false;
  }
  /** Closes the Tool Settings Ui popup. */
  closeToolSettingsPopup() {
    return false;
  }
  /** Show the Keyin Palette to display all support Tool key-ins.
   * @param _htmlElement The HTMLElement that anchors the Keyin Palette. If undefined, the location is relative to the overall window.
   * @return true if the Keyin Palette was displayed, false if it could not be displayed.
   */
  showKeyinPalette(_htmlElement) {
    return false;
  }
  /** Hides the Keyin Palette. */
  hideKeyinPalette() {
    return false;
  }
  /** Send a UI event */
  static sendUiEvent(args) {
    UiAdmin.onGenericUiEvent.emit(args);
  }
  /** GenericUiEvent  */
  static onGenericUiEvent = new GenericUiEvent();
  /** Opens a Dialog and automatically populates it using the properties defined by the UiDataProvider.
   * @param _uiDataProvider The DialogLayoutDataProvider for the dialog
   * @param _title Specify title for dialog.
   * @param _isModal Specify if the dialog is opened as a modal or modeless.
   * @param _id Id of the dialog that is used to close it.
   * @param _optionalProps Optional props for Dialog construction.
   * @return true if the tool settings were displayed, false if the tool settings could not be displayed.
   */
  openDialog(_uiDataProvider, _title, _isModal, _id, _optionalProps) {
    return false;
  }
  /** Closes the Dialog with a given Id. */
  closeDialog(_dialogId) {
    return false;
  }
}
class ConditionalBooleanValue {
  testFunc;
  syncEventIds;
  _value;
  /**
   * Constructor for ConditionalBooleanValue. It is important that the same ConditionalBooleanValue instance is not used by multiple UI item definitions in order that the control's state is always rendered correctly.
   * @param testFunc Function to run to retrieve the value for the conditional. This function is run when refresh method is called or if the value is not defined in the constructor.
   * @param syncEventIds An array of eventId that should be monitored to determine when to run the refresh method.
   * @param value The default value for the conditional value. If not specified then the function is run to set the value when the value is retrieved.
   */
  constructor(testFunc, syncEventIds, value) {
    this.testFunc = testFunc;
    this.syncEventIds = syncEventIds;
    this._value = value;
  }
  /** The current boolean value of the conditional. */
  get value() {
    if (void 0 !== this._value)
      return this._value;
    this._value = this.testFunc();
    return this._value;
  }
  /** Called to update the value by running the testFunc */
  refresh() {
    const newValue = this.testFunc();
    if (newValue !== this._value) {
      this._value = newValue;
      return true;
    }
    return false;
  }
  /** helper function to process properties defined as type ConditionalBooleanValue | boolean | undefined */
  static refreshValue(conditionalValue, eventIds) {
    if (void 0 === conditionalValue || !(conditionalValue instanceof ConditionalBooleanValue))
      return false;
    if (conditionalValue.syncEventIds.some((value) => eventIds.has(value.toLowerCase())))
      return conditionalValue.refresh();
    return false;
  }
  /** helper function to get boolean from a ConditionalBooleanValue | boolean | undefined */
  static getValue(conditionalValue) {
    if (void 0 === conditionalValue)
      return false;
    if (conditionalValue instanceof ConditionalBooleanValue)
      return conditionalValue.value;
    return conditionalValue;
  }
}
class ConditionalStringValue {
  stringGetter;
  syncEventIds;
  _value;
  /**
   * Constructor for ConditionalStringValue. It is important that the same ConditionalStringValue instance is not used by multiple UI item definitions in order that the control's state is always rendered correctly.
   * @param stringGetter Function to run to retrieve the value for the conditional. This function is run when refresh method is called or if the value is not defined in the constructor.
   * @param syncEventIds An array of eventId that should be monitored to determine when to run the refresh method.
   * @param value The default value for the conditional value. If not specified then the function is run to set the value when the value is retrieved.
   */
  constructor(stringGetter, syncEventIds, value) {
    this.stringGetter = stringGetter;
    this.syncEventIds = syncEventIds;
    this._value = value;
  }
  /** The current boolean value of the conditional. */
  get value() {
    if (void 0 !== this._value)
      return this._value;
    this._value = this.stringGetter();
    return this._value;
  }
  /** Called to update the value by running the stringGetter */
  refresh() {
    const newValue = this.stringGetter();
    if (newValue !== this._value) {
      this._value = newValue;
      return true;
    }
    return false;
  }
  /** helper function to process properties defined as type ConditionalStringValue | string | undefined
   * Return true if the value was updated.
   */
  static refreshValue(conditionalValue, eventIds) {
    if (void 0 === conditionalValue || !(conditionalValue instanceof ConditionalStringValue))
      return false;
    if (conditionalValue.syncEventIds.some((value) => eventIds.has(value.toLowerCase())))
      return conditionalValue.refresh();
    return false;
  }
  /** helper function to get string from a ConditionalStringValue | string | undefined */
  static getValue(conditionalValue) {
    if (void 0 === conditionalValue)
      return void 0;
    if (conditionalValue instanceof ConditionalStringValue)
      return conditionalValue.value;
    return conditionalValue;
  }
}
class UiError extends BentleyError {
  category;
  /** Constructs UiError using BentleyError. */
  constructor(category, message, errorNumber = BentleyStatus.ERROR, getMetaData) {
    super(errorNumber, message, getMetaData);
    this.category = category;
  }
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}
var NOTHING = /* @__PURE__ */ Symbol.for("immer-nothing");
var DRAFTABLE = /* @__PURE__ */ Symbol.for("immer-draftable");
var DRAFT_STATE = /* @__PURE__ */ Symbol.for("immer-state");
function die(error, ...args) {
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var getPrototypeOf$1 = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = Object.getPrototypeOf(value);
  if (proto === null || proto === Object.prototype)
    return true;
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  if (typeof Ctor !== "function")
    return false;
  let ctorString = cachedCtorStrings.get(Ctor);
  if (ctorString === void 0) {
    ctorString = Function.toString.call(Ctor);
    cachedCtorStrings.set(Ctor, ctorString);
  }
  return ctorString === objectCtorString;
}
function each(obj, iter, strict = true) {
  if (getArchtype(obj) === 0) {
    const keys = strict ? Reflect.ownKeys(obj) : Object.keys(obj);
    keys.forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function get(thing, prop) {
  return getArchtype(thing) === 2 ? thing.get(prop) : thing[prop];
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2)
    thing.set(propOrOldValue, value);
  else if (t === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf$1(base), descriptors);
  } else {
    const proto = getPrototypeOf$1(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze$1(obj, deep = false) {
  if (isFrozen$1(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    Object.defineProperties(obj, {
      set: dontMutateMethodOverride,
      add: dontMutateMethodOverride,
      clear: dontMutateMethodOverride,
      delete: dontMutateMethodOverride
    });
  }
  Object.freeze(obj);
  if (deep)
    Object.values(obj).forEach((value) => freeze$1(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
var dontMutateMethodOverride = {
  value: dontMutateFrozenCollections
};
function isFrozen$1(obj) {
  if (obj === null || typeof obj !== "object")
    return true;
  return Object.isFrozen(obj);
}
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
function loadPlugin(pluginKey, implementation) {
  if (!plugins[pluginKey])
    plugins[pluginKey] = implementation;
}
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen$1(value))
    return value;
  const useStrictIteration = rootScope.immer_.shouldUseStrictIteration();
  const state = value[DRAFT_STATE];
  if (!state) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path),
      useStrictIteration
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(
      resultEach,
      (key, childValue) => finalizeProperty(
        rootScope,
        state,
        result,
        key,
        childValue,
        path,
        isSet2
      ),
      useStrictIteration
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (childValue == null) {
    return;
  }
  if (typeof childValue !== "object" && !targetIsSet) {
    return;
  }
  const childIsFrozen = isFrozen$1(childValue);
  if (childIsFrozen && !targetIsSet) {
    return;
  }
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !childIsFrozen) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    if (parentState && parentState.base_ && parentState.base_[prop] === childValue && childIsFrozen) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && (isMap(targetObject) ? targetObject.has(prop) : Object.prototype.propertyIsEnumerable.call(targetObject, prop)))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze$1(value, deep);
  }
}
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf$1(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf$1(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf$1(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config2) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.useStrictIteration_ = true;
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self2 = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self2.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze$1(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof config2?.autoFreeze === "boolean")
      this.setAutoFreeze(config2.autoFreeze);
    if (typeof config2?.useStrictShallowCopy === "boolean")
      this.setUseStrictShallowCopy(config2.useStrictShallowCopy);
    if (typeof config2?.useStrictIteration === "boolean")
      this.setUseStrictIteration(config2.useStrictIteration);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(value) {
    this.useStrictIteration_ = value;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen$1(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  let strict = true;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
    strict = state.scope_.immer_.shouldUseStrictIteration();
  } else {
    copy = shallowCopy(value, true);
  }
  each(
    copy,
    (key, childValue) => {
      set(copy, key, currentImpl(childValue));
    },
    strict
  );
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}
function enablePatches() {
  const errorOffset = 16;
  const REPLACE = "replace";
  const ADD = "add";
  const REMOVE = "remove";
  function generatePatches_(state, basePath, patches, inversePatches) {
    switch (state.type_) {
      case 0:
      case 2:
        return generatePatchesFromAssigned(
          state,
          basePath,
          patches,
          inversePatches
        );
      case 1:
        return generateArrayPatches(state, basePath, patches, inversePatches);
      case 3:
        return generateSetPatches(
          state,
          basePath,
          patches,
          inversePatches
        );
    }
  }
  function generateArrayPatches(state, basePath, patches, inversePatches) {
    let { base_, assigned_ } = state;
    let copy_ = state.copy_;
    if (copy_.length < base_.length) {
      [base_, copy_] = [copy_, base_];
      [patches, inversePatches] = [inversePatches, patches];
    }
    for (let i = 0; i < base_.length; i++) {
      if (assigned_[i] && copy_[i] !== base_[i]) {
        const path = basePath.concat([i]);
        patches.push({
          op: REPLACE,
          path,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: clonePatchValueIfNeeded(copy_[i])
        });
        inversePatches.push({
          op: REPLACE,
          path,
          value: clonePatchValueIfNeeded(base_[i])
        });
      }
    }
    for (let i = base_.length; i < copy_.length; i++) {
      const path = basePath.concat([i]);
      patches.push({
        op: ADD,
        path,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: clonePatchValueIfNeeded(copy_[i])
      });
    }
    for (let i = copy_.length - 1; base_.length <= i; --i) {
      const path = basePath.concat([i]);
      inversePatches.push({
        op: REMOVE,
        path
      });
    }
  }
  function generatePatchesFromAssigned(state, basePath, patches, inversePatches) {
    const { base_, copy_ } = state;
    each(state.assigned_, (key, assignedValue) => {
      const origValue = get(base_, key);
      const value = get(copy_, key);
      const op = !assignedValue ? REMOVE : has(base_, key) ? REPLACE : ADD;
      if (origValue === value && op === REPLACE)
        return;
      const path = basePath.concat(key);
      patches.push(op === REMOVE ? { op, path } : { op, path, value });
      inversePatches.push(
        op === ADD ? { op: REMOVE, path } : op === REMOVE ? { op: ADD, path, value: clonePatchValueIfNeeded(origValue) } : { op: REPLACE, path, value: clonePatchValueIfNeeded(origValue) }
      );
    });
  }
  function generateSetPatches(state, basePath, patches, inversePatches) {
    let { base_, copy_ } = state;
    let i = 0;
    base_.forEach((value) => {
      if (!copy_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: REMOVE,
          path,
          value
        });
        inversePatches.unshift({
          op: ADD,
          path,
          value
        });
      }
      i++;
    });
    i = 0;
    copy_.forEach((value) => {
      if (!base_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: ADD,
          path,
          value
        });
        inversePatches.unshift({
          op: REMOVE,
          path,
          value
        });
      }
      i++;
    });
  }
  function generateReplacementPatches_(baseValue, replacement, patches, inversePatches) {
    patches.push({
      op: REPLACE,
      path: [],
      value: replacement === NOTHING ? void 0 : replacement
    });
    inversePatches.push({
      op: REPLACE,
      path: [],
      value: baseValue
    });
  }
  function applyPatches_(draft, patches) {
    patches.forEach((patch) => {
      const { path, op } = patch;
      let base = draft;
      for (let i = 0; i < path.length - 1; i++) {
        const parentType = getArchtype(base);
        let p = path[i];
        if (typeof p !== "string" && typeof p !== "number") {
          p = "" + p;
        }
        if ((parentType === 0 || parentType === 1) && (p === "__proto__" || p === "constructor"))
          die(errorOffset + 3);
        if (typeof base === "function" && p === "prototype")
          die(errorOffset + 3);
        base = get(base, p);
        if (typeof base !== "object")
          die(errorOffset + 2, path.join("/"));
      }
      const type = getArchtype(base);
      const value = deepClonePatchValue(patch.value);
      const key = path[path.length - 1];
      switch (op) {
        case REPLACE:
          switch (type) {
            case 2:
              return base.set(key, value);
            case 3:
              die(errorOffset);
            default:
              return base[key] = value;
          }
        case ADD:
          switch (type) {
            case 1:
              return key === "-" ? base.push(value) : base.splice(key, 0, value);
            case 2:
              return base.set(key, value);
            case 3:
              return base.add(value);
            default:
              return base[key] = value;
          }
        case REMOVE:
          switch (type) {
            case 1:
              return base.splice(key, 1);
            case 2:
              return base.delete(key);
            case 3:
              return base.delete(patch.value);
            default:
              return delete base[key];
          }
        default:
          die(errorOffset + 1, op);
      }
    });
    return draft;
  }
  function deepClonePatchValue(obj) {
    if (!isDraftable(obj))
      return obj;
    if (Array.isArray(obj))
      return obj.map(deepClonePatchValue);
    if (isMap(obj))
      return new Map(
        Array.from(obj.entries()).map(([k, v]) => [k, deepClonePatchValue(v)])
      );
    if (isSet(obj))
      return new Set(Array.from(obj).map(deepClonePatchValue));
    const cloned = Object.create(getPrototypeOf$1(obj));
    for (const key in obj)
      cloned[key] = deepClonePatchValue(obj[key]);
    if (has(obj, DRAFTABLE))
      cloned[DRAFTABLE] = obj[DRAFTABLE];
    return cloned;
  }
  function clonePatchValueIfNeeded(obj) {
    if (isDraft(obj)) {
      return deepClonePatchValue(obj);
    } else
      return obj;
  }
  loadPlugin("Patches", {
    applyPatches_,
    generatePatches_,
    generateReplacementPatches_
  });
}
var immer = new Immer2();
var produce = immer.produce;
function castDraft(value) {
  return value;
}
let UiCore$1 = class UiCore {
  static _initialized = false;
  static _localization;
  /**
   * Registers the Localization service namespace for UiCore.
   * @param localization The internationalization service created by the host application.
   */
  static async initialize(localization) {
    if (UiCore._initialized) {
      Logger.logInfo(UiCore.loggerCategory("UiCore"), `UiCore.initialize already called`);
      return;
    }
    UiCore._localization = localization;
    await UiCore._localization.registerNamespace(UiCore.localizationNamespace);
    UiCore._initialized = true;
  }
  /** Unregisters the UiCore localization namespace */
  static terminate() {
    if (UiCore._localization)
      UiCore._localization.unregisterNamespace(UiCore.localizationNamespace);
    UiCore._localization = void 0;
    UiCore._initialized = false;
  }
  /** Determines if UiCore has been initialized */
  static get initialized() {
    return UiCore._initialized;
  }
  /** The internationalization service namespace. */
  static get localizationNamespace() {
    return "UiCore";
  }
  /** Calls localization.getLocalizedString with the "UiCore" namespace. Do NOT include the namespace in the key.
   * @deprecated in 4.12.0. Do not use this internally, this is replaced by `useTranslation`.
   * @internal
   */
  static translate(key) {
    if (!UiCore._localization) {
      Logger.logError(UiCore.loggerCategory("UiCore"), `translate: UiCore must be initialize with a localization provider. Returning blank string.`);
      return "";
    }
    return UiCore._localization.getLocalizedString(`${UiCore.localizationNamespace}:${String(key)}`);
  }
  /** @internal */
  static get packageName() {
    return "core-react";
  }
  /** @internal */
  static loggerCategory(name) {
    return `${UiCore.packageName}.${name}`;
  }
};
const BadgeType = BadgeType$1;
function Div(props) {
  const { mainClassName, className, style, children, ...divProps } = props;
  return reactExports.createElement("div", { ...divProps, className: classnames(mainClassName, className), style }, children);
}
const withOnOutsideClick = (Component, defaultOnOutsideClick, useCapture = true, usePointerEvents = true) => {
  return class WithOnOutsideClick extends reactExports.PureComponent {
    /** @internal */
    outsideClickContainerDiv = null;
    /** @internal */
    isDownOutside = false;
    /** @internal */
    isInCorePopup(element) {
      if (element.nodeName === "DIV") {
        if (element.classList && element.classList.contains("core-popup"))
          return true;
        if (element.parentElement && this.isInCorePopup(element.parentElement))
          return true;
      } else {
        if (element.parentElement && this.isInCorePopup(element.parentElement))
          return true;
      }
      return false;
    }
    /** @internal */
    onOutsideClick(e) {
      if (e.target instanceof Node && e.target.nodeType === Node.ELEMENT_NODE) {
        if (!this.props.closeOnNestedPopupOutsideClick && this.isInCorePopup(e.target))
          return;
      }
      if (this.props.onOutsideClick)
        return this.props.onOutsideClick(e);
    }
    /** @internal */
    handleDocumentClick = (e) => {
      if (!this.outsideClickContainerDiv || !(e.target instanceof Node) || this.outsideClickContainerDiv.contains(e.target))
        return;
      return this.onOutsideClick(e);
    };
    /** @internal */
    handleDocumentPointerDown = (e) => {
      this.isDownOutside = true;
      if (this.outsideClickContainerDiv) {
        this.isDownOutside = !!e.target && !this.outsideClickContainerDiv.contains(e.target);
      }
    };
    /** @internal */
    handleDocumentPointerUp = (e) => {
      let isUpOutside = true;
      if (this.outsideClickContainerDiv) {
        isUpOutside = !!e.target && !this.outsideClickContainerDiv.contains(e.target);
      }
      const isOutsideClick = isUpOutside && this.isDownOutside;
      this.isDownOutside = false;
      isOutsideClick && this.onOutsideClick(e);
    };
    handleOutsideClickContainerDivSet = (outsideClickContainerDiv) => {
      this.outsideClickContainerDiv = outsideClickContainerDiv;
    };
    getParentDocument() {
      return this.outsideClickContainerDiv?.ownerDocument ?? document;
    }
    componentDidMount() {
      const outsideClickParentDocument = this.getParentDocument();
      if (usePointerEvents) {
        outsideClickParentDocument.addEventListener("pointerdown", this.handleDocumentPointerDown, useCapture);
        outsideClickParentDocument.addEventListener("pointerup", this.handleDocumentPointerUp, useCapture);
      } else
        outsideClickParentDocument.addEventListener("click", this.handleDocumentClick, useCapture);
    }
    componentWillUnmount() {
      const outsideClickParentDocument = this.getParentDocument();
      if (usePointerEvents) {
        outsideClickParentDocument.removeEventListener("pointerdown", this.handleDocumentPointerDown, useCapture);
        outsideClickParentDocument.removeEventListener("pointerup", this.handleDocumentPointerUp, useCapture);
      } else
        outsideClickParentDocument.removeEventListener("click", this.handleDocumentClick, useCapture);
    }
    render() {
      const { onOutsideClick, closeOnNestedPopupOutsideClick, ...props } = this.props;
      return reactExports.createElement(
        "div",
        { ref: this.handleOutsideClickContainerDivSet },
        reactExports.createElement(Component, { ...props })
      );
    }
  };
};
const DivWithOutsideClick = withOnOutsideClick(
  (props) => reactExports.createElement("div", { ...props })
  // eslint-disable-line @typescript-eslint/no-deprecated
);
function UnderlinedButton(props) {
  const handleKeyUp = reactExports.useCallback((event) => {
    const key = event.key;
    switch (key) {
      case Key_enumExports.Key.Enter.valueOf():
      case " ":
        props.onActivate && props.onActivate();
        break;
    }
  }, [props]);
  const handleClick = reactExports.useCallback((e) => {
    props.onClick && props.onClick(e);
    props.onActivate && props.onActivate();
  }, [props]);
  const className = classnames("core-underlined-button", props.className ? props.className : void 0);
  return reactExports.createElement("span", { className, title: props.title, onClick: handleClick, onKeyUp: handleKeyUp, tabIndex: 0, role: "link" }, props.children);
}
var ContextMenuDirection;
(function(ContextMenuDirection2) {
  ContextMenuDirection2["None"] = "";
  ContextMenuDirection2["TopLeft"] = "top left";
  ContextMenuDirection2["Top"] = "top";
  ContextMenuDirection2["TopRight"] = "top right";
  ContextMenuDirection2["Left"] = "left";
  ContextMenuDirection2["Center"] = "center";
  ContextMenuDirection2["Right"] = "right";
  ContextMenuDirection2["BottomLeft"] = "bottom left";
  ContextMenuDirection2["Bottom"] = "bottom";
  ContextMenuDirection2["BottomRight"] = "bottom right";
})(ContextMenuDirection || (ContextMenuDirection = {}));
class TildeFinder {
  /**
   * Find character following a tilde character within a React.ReactNode.
   * @param node react node to search within for a tilde.
   * @returns character that was found, and the same node with tilde removed, and following character with an underline.
   */
  static findAfterTilde = (node) => {
    if (typeof node === "string") {
      const tildeIndex = node.indexOf("~");
      if (tildeIndex !== -1 && tildeIndex <= node.length - 2) {
        const ch = node.charAt(tildeIndex + 1);
        const s1 = node.substring(0, tildeIndex);
        const n = reactExports.createElement("u", { key: "hotkey" }, ch);
        const s2 = node.substring(tildeIndex + 2);
        return { character: ch.toUpperCase(), node: [s1, n, s2] };
      }
    } else if (node && typeof node === "object") {
      if (Array.isArray(node)) {
        let ret = {
          character: void 0
        };
        node = node.map((child) => {
          const r = TildeFinder.findAfterTilde(child);
          if (r.character) {
            ret = r;
            return r.node;
          }
          return child;
        });
        if (ret.character) {
          return { character: ret.character, node };
        }
      } else if (reactExports.isValidElement(node)) {
        const ret = {
          character: void 0,
          node
        };
        ret.node = reactExports.cloneElement(node, {
          children: reactExports.Children.map(node.props.children, (child) => {
            const r = TildeFinder.findAfterTilde(child);
            if (r.character) {
              ret.character = r.character;
              return r.node;
            }
            return child;
          })
        });
        if (ret.character) {
          return ret;
        }
      }
    }
    return { character: void 0, node };
  };
}
const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object;
let {
  apply,
  construct
} = typeof Reflect !== "undefined" && Reflect;
if (!freeze) {
  freeze = function freeze2(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal2(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply2(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct2(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(Func) {
  return function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
function addToSet(set2, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set2, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set2[element] = true;
  }
  return set2;
}
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
function clone(object) {
  const newObject = create(null);
  for (const [property2, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property2);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property2] = cleanArray(value);
      } else if (value && typeof value === "object" && value.constructor === Object) {
        newObject[property2] = clone(value);
      } else {
        newObject[property2] = value;
      }
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
const text = freeze(["#text"]);
const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
const IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR,
  ATTR_WHITESPACE,
  CUSTOM_ELEMENT,
  DATA_ATTR,
  DOCTYPE_NAME,
  ERB_EXPR,
  IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR,
  TMPLIT_EXPR
});
const NODE_TYPE = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
};
const getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html2) {
        return html2;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
const _createHooksMap = function _createHooksMap2() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  const DOMPurify = (root) => createDOMPurify(root);
  DOMPurify.version = "3.4.0";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document: document2
  } = window2;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node: Node3,
    Element: Element2,
    NodeFilter,
    NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser: DOMParser2,
    trustedTypes
  } = window2;
  const ElementPrototype = Element2.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const remove = lookupGetter(ElementPrototype, "remove");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document2;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: MUSTACHE_EXPR2,
    ERB_EXPR: ERB_EXPR2,
    TMPLIT_EXPR: TMPLIT_EXPR2,
    DATA_ATTR: DATA_ATTR2,
    ARIA_ATTR: ARIA_ATTR2,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
    ATTR_WHITESPACE: ATTR_WHITESPACE2,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT2
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let SAFE_FOR_XML = true;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || typeof cfg !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || create(null);
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = create(null);
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    EXTRA_ELEMENT_HANDLING.tagCheck = null;
    EXTRA_ELEMENT_HANDLING.attributeCheck = null;
    if (cfg.ADD_TAGS) {
      if (typeof cfg.ADD_TAGS === "function") {
        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      } else {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (cfg.ADD_ATTR) {
      if (typeof cfg.ADD_ATTR === "function") {
        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      } else {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (cfg.ADD_FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      emptyHTML = trustedTypesPolicy.createHTML("");
    } else {
      if (trustedTypesPolicy === void 0) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
        emptyHTML = trustedTypesPolicy.createHTML("");
      }
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    let parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  const _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      getParentNode(node).removeChild(node);
    } catch (_) {
      remove(node);
    }
  };
  const _removeAttribute = function _removeAttribute2(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    if (name === "is") {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {
        }
      } else {
        try {
          element.setAttribute(name, "");
        } catch (_) {
        }
      }
    }
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser2().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root) {
    return createNodeIterator.call(
      root.ownerDocument || root,
      root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
      null
    );
  };
  const _isClobbered = function _isClobbered2(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
  };
  const _isNode = function _isNode2(value) {
    return typeof Node3 === "function" && value instanceof Node3;
  };
  function _executeHooks(hooks2, currentNode, data) {
    arrayForEach(hooks2, (hook) => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  const _sanitizeElements = function _sanitizeElements2(currentNode) {
    let content = null;
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(currentNode.nodeName);
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && tagName === "style" && _isNode(currentNode.firstElementChild)) {
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element2 && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        content = stringReplace(content, expr, " ");
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (FORBID_ATTR[lcName]) {
      return false;
    }
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
    else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag)) ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      ) ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if (value) {
      return false;
    } else ;
    return true;
  };
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: void 0
    };
    let l = attributes.length;
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === "value" ? initValue : stringTrim(initValue);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (lcName === "attributename" && stringMatch(value, "href")) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          value = stringReplace(value, expr, " ");
        });
      }
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
        if (namespaceURI) ;
        else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML": {
              value = trustedTypesPolicy.createHTML(value);
              break;
            }
            case "TrustedScriptURL": {
              value = trustedTypesPolicy.createScriptURL(value);
              break;
            }
          }
        }
      }
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      _sanitizeElements(shadowNode);
      _sanitizeAttributes(shadowNode);
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
    }
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString === "function") {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      } else {
        throw typeErrorCreate("toString is not a function");
      }
    }
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node3) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      _sanitizeElements(currentNode);
      _sanitizeAttributes(currentNode);
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(currentNode.content);
      }
    }
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (SAFE_FOR_TEMPLATES) {
        body.normalize();
        let html2 = body.innerHTML;
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          html2 = stringReplace(html2, expr, " ");
        });
        body.innerHTML = html2;
      }
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        serializedHTML = stringReplace(serializedHTML, expr, " ");
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint, hookFunction) {
    if (hookFunction !== void 0) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function(entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function() {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();
class ConditionalIconItem {
  iconGetter;
  syncEventIds;
  _value;
  /** Constructor for ConditionalIconItem
   * @param iconGetter Function to retrieve the icon that matches the condition. Returns an IconSpec.
   * @param syncEventIds The array of event ids to be monitored. These events are triggered when the condition(s) that control the icon change.
   * @param value The default IconSpec. If this is not specified, the function is run to get the initial value.
   */
  constructor(iconGetter, syncEventIds, value) {
    this.iconGetter = iconGetter;
    this.syncEventIds = syncEventIds;
    this._value = value;
  }
  /** The current IconSpec according to conditions */
  get value() {
    if (void 0 !== this._value)
      return this._value;
    this._value = this.iconGetter();
    return this._value;
  }
  /** Called to update the value by running the iconGetter */
  refresh() {
    const newValue = this.iconGetter();
    if (newValue !== this._value) {
      this._value = newValue;
      return true;
    }
    return false;
  }
  /** A helper function that updates the IconSpec value when the specified events are triggered */
  static refreshValue(conditionalValue, eventIds) {
    if (void 0 === conditionalValue || !(conditionalValue instanceof ConditionalIconItem))
      return false;
    const iconItem = conditionalValue;
    if (iconItem.syncEventIds.some((value) => eventIds.has(value.toLowerCase())))
      return iconItem.refresh();
    return false;
  }
  /** helper function to get the iconSpec from a ConditionIconItem as IconSpec | undefined*/
  static getValue(conditionalValue) {
    if (void 0 === conditionalValue)
      return void 0;
    if (conditionalValue instanceof ConditionalIconItem) {
      const iconItem = conditionalValue;
      return iconItem.value;
    }
    return conditionalValue;
  }
}
function getWebComponentSource(iconSpec) {
  if (iconSpec.startsWith("webSvg:") && iconSpec.length > 7) {
    return iconSpec.slice(7);
  }
  return void 0;
}
function Icon(props) {
  if (!props.iconSpec)
    return null;
  const iconSpecValue = getIconSpecValue(props.iconSpec);
  if (typeof iconSpecValue === "string") {
    const iconString = iconSpecValue;
    const webComponentString = getWebComponentSource(iconString);
    if (iconString.startsWith("data:") || iconString.endsWith(".svg") || webComponentString) {
      const definitiveIconString = webComponentString ? webComponentString : iconString;
      const svgLoader = `<svg-loader src="${definitiveIconString}"></svg-loader>`;
      const svgDiv = `<div>${svgLoader}</div>`;
      const sanitizerConfig = {
        ALLOWED_TAGS: ["svg-loader"],
        ADD_URI_SAFE_ATTR: definitiveIconString.startsWith("data:") ? ["src"] : []
      };
      const sanitizedIconString = purify.sanitize(svgDiv, sanitizerConfig);
      const webComponentNode = (
        // we can safely disable jam3/no-sanitizer-with-danger as we are sanitizing above
        // eslint-disable-next-line jam3/no-sanitizer-with-danger
        reactExports.createElement("div", { dangerouslySetInnerHTML: { __html: sanitizedIconString } })
      );
      return reactExports.createElement("i", { className: classnames("icon", "core-svg-icon", props.className) }, webComponentNode);
    }
    return reactExports.createElement("i", { className: classnames("icon", "core-css-icon", iconString, props.className), style: props.style });
  }
  return reactExports.createElement("i", { className: classnames("icon", "core-svg-icon", props.className), style: props.style }, iconSpecValue);
}
function getIconSpecValue(iconSpec) {
  let value = iconSpec;
  while (true) {
    if (value instanceof ConditionalIconItem) {
      value = ConditionalIconItem.getValue(value);
      continue;
    }
    if (value instanceof ConditionalStringValue) {
      value = ConditionalStringValue.getValue(value);
      break;
    }
    break;
  }
  return value;
}
function TechnicalPreviewBadge() {
  return reactExports.createElement(
    Icon$1,
    { className: "core-badge-technicalPreviewBadge" },
    reactExports.createElement(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", viewBox: "0 0 16 16" },
      reactExports.createElement(
        "defs",
        null,
        reactExports.createElement(
          "linearGradient",
          { id: "technical-preview-fill", x1: "8", y1: "15", x2: "8", y2: "1", gradientUnits: "userSpaceOnUse" },
          reactExports.createElement("stop", { offset: "0", stopColor: "#ffc335" }),
          reactExports.createElement("stop", { offset: "1", stopColor: "#ffdf52" })
        )
      ),
      reactExports.createElement("path", { d: "M15,1V15L1,1H15", fill: "url(#technical-preview-fill)" }),
      reactExports.createElement("path", { d: "M15,1V15L1,1H15m0-1H1A.87458.87458,0,0,0,.1.6.91284.91284,0,0,0,.3,1.7l14,14a.90783.90783,0,0,0,.7.3.60123.60123,0,0,0,.4-.1A.961.961,0,0,0,16,15V1A.94477.94477,0,0,0,15,0Z", fill: "#ffc000" }),
      reactExports.createElement("circle", { cx: "11", cy: "5", r: "2", opacity: "0.9", style: { isolation: "isolate" } })
    )
  );
}
function NewBadge() {
  return reactExports.createElement(
    Icon$1,
    { className: "core-badge-newBadge" },
    reactExports.createElement(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", enableBackground: "new 0 0 16 16" },
      reactExports.createElement("path", { d: "m15 0h-14c-.4 0-.8.2-.9.6s-.1.8.2 1.1l14 14c.2.2.4.3.7.3.1 0 .3 0 .4-.1.4-.2.6-.5.6-.9v-14c0-.6-.4-1-1-1m-4 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2" })
    )
  );
}
function DeprecatedBadge() {
  return reactExports.createElement(
    Icon$1,
    { className: "core-badge-deprecatedBadge" },
    reactExports.createElement(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", width: "1rem", height: "1rem" },
      reactExports.createElement(
        "defs",
        null,
        reactExports.createElement(
          "linearGradient",
          { id: "deprecated-fill", x1: "8.00287", y1: "1.00273", x2: "8.00287", y2: "15.00273", gradientTransform: "translate(0 16.00546) scale(1 -1)", gradientUnits: "userSpaceOnUse" },
          reactExports.createElement("stop", { offset: "0", stopColor: "#ff1e35" }),
          reactExports.createElement("stop", { offset: "1", stopColor: "#ff5352" })
        )
      ),
      reactExports.createElement("path", { d: "m15.00287,1.00273v14L1.00287,1.00273h14", fill: "url(#deprecated-fill)", style: { strokeWidth: 0 } }),
      reactExports.createElement("path", { d: "m15.00287,1.00273v14L1.00287,1.00273h14M15.00287.00273H1.00287C.60033-.02901.22839.21895.10287.60273-.08907.97211-.00681,1.42455.30287,1.70273l14,14c.17808.19777.43397.30744.7.3.14095.01486.28262-.02056.4-.1.36588-.14828.60385-.50524.6-.9V1.00273c.03145-.52083-.36527-.96855-.8861-1-.03793-.00229-.07596-.00229-.1139,0Z", fill: "red", style: { strokeWidth: 0 } }),
      reactExports.createElement("polygon", { points: "13.15377 6.20045 12.20059 7.15363 11.00287 5.95591 9.80515 7.15363 8.85197 6.20045 10.04969 5.00273 8.85197 3.80501 9.80515 2.85183 11.00287 4.04955 12.20059 2.85183 13.15377 3.80501 11.95606 5.00273 13.15377 6.20045", style: { strokeWidth: 0 } })
    )
  );
}
function Badge({ type }) {
  if (type === BadgeType.TechnicalPreview || type === "technical-preview")
    return reactExports.createElement(TechnicalPreviewBadge, null);
  if (type === BadgeType.New || type === "new")
    return reactExports.createElement(NewBadge, null);
  if (type === "deprecated")
    return reactExports.createElement(DeprecatedBadge, null);
  return null;
}
class ContextMenuItem extends reactExports.PureComponent {
  _root = null;
  _lastChildren;
  _parsedChildren;
  static defaultProps = {
    disabled: false,
    hidden: false,
    isSelected: false
  };
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const { onClick, className, style, onSelect, icon, disabled, hidden, onHover, isSelected, parentMenu, onHotKeyParsed, badgeType, badgeKind, iconRight, hideIconContainer, ...props } = this.props;
    const isDisabled = ConditionalBooleanValue.getValue(disabled);
    const isHidden = ConditionalBooleanValue.getValue(hidden);
    if (this._lastChildren !== this.props.children) {
      this._parsedChildren = TildeFinder.findAfterTilde(this.props.children).node;
      this._lastChildren = this.props.children;
    }
    return reactExports.createElement(
      "div",
      { ...props, ref: (el) => {
        this._root = el;
      }, onClick: this._handleClick, style, onFocus: this._handleFocus, onKeyUp: this._handleKeyUp, onMouseOver: this._handleMouseOver, "data-testid": "core-context-menu-item", className: classnames("core-context-menu-item", className, isDisabled && "core-context-menu-disabled", isHidden && "core-context-menu-hidden", isSelected && "core-context-menu-is-selected"), role: "menuitem", tabIndex: isSelected ? 0 : -1, "aria-disabled": isDisabled, "aria-hidden": isHidden },
      !hideIconContainer && reactExports.createElement("div", { className: "core-context-menu-icon" }, icon !== void 0 && reactExports.createElement(Icon, { iconSpec: icon })),
      reactExports.createElement("div", { className: "core-context-menu-content" }, this._parsedChildren),
      iconRight && reactExports.createElement(
        "div",
        { className: classnames("core-context-menu-icon", "core-context-menu-icon-right") },
        reactExports.createElement(Icon, { iconSpec: iconRight })
      ),
      (badgeKind || badgeType) && reactExports.createElement(
        "div",
        { className: "core-context-menu-badge" },
        reactExports.createElement(Badge, { type: badgeKind || badgeType })
      )
    );
  }
  componentDidMount() {
    this._updateHotkey(this.props.children);
  }
  /** @internal */
  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this._updateHotkey(this.props.children);
    }
  }
  _updateHotkey = (node) => {
    let hotKey;
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    const isHidden = ConditionalBooleanValue.getValue(this.props.hidden);
    if (!isDisabled && !isHidden)
      hotKey = TildeFinder.findAfterTilde(node).character;
    else
      hotKey = void 0;
    if (hotKey && hotKey !== this.state.hotKey) {
      this.setState({ hotKey });
      if (this.props.onHotKeyParsed)
        this.props.onHotKeyParsed(hotKey);
    }
  };
  _handleFocus = (event) => {
    event.stopPropagation();
  };
  _handleMouseOver = (_event) => {
    if (this._root && this._root.style.visibility !== "hidden" && this.props.onHover) {
      this.props.onHover();
    }
  };
  select = () => {
    if (this._root) {
      this._root.click();
      if (this.props.parentMenu && this.props.parentMenu.props.parentSubmenu)
        this.props.parentMenu.props.parentSubmenu.close(true);
    }
  };
  _handleClick = (event) => {
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    if (isDisabled)
      return;
    if (this.props.onClick)
      this.props.onClick(event);
    if (this.props.onSelect)
      this.props.onSelect(event);
  };
  _handleKeyUp = (event) => {
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    if (event.key === Key_enumExports.Key.Enter.valueOf() && this.props.onSelect !== void 0 && !isDisabled) {
      this.props.onSelect(event);
    }
  };
}
const SvgAdd = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M7 1v6H1v2h6v6h2V9h6V7H9V1H7z" })
  );
};
const SvgCaretDownSmall = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M4.807 6h6.395a.28.28 0 01.24.443L8.27 9.9a.34.34 0 01-.481 0L4.566 6.443A.27.27 0 014.806 6z" })
  );
};
const SvgCaretDown = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M1.4 3.3h13.3a.634.634 0 01.5 1l-6.6 7.8a.668.668 0 01-1 0L.9 4.3a.608.608 0 01.5-1z" })
  );
};
const SvgCaretRightSmall = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M6.003 4.807v6.4a.28.28 0 00.443.24L9.9 8.27a.34.34 0 000-.48L6.446 4.566a.269.269 0 00-.443.24z" })
  );
};
const SvgCaretUpSmall = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M4.807 9.997h6.395a.28.28 0 00.24-.443L8.27 6.097a.34.34 0 00-.48 0h-.001L4.566 9.554a.27.27 0 00.24.443z" })
  );
};
const SvgCaretUp = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M14.7 12.4H1.4a.634.634 0 01-.5-1l6.6-7.8a.668.668 0 011 0l6.6 7.8c.4.3.1 1-.4 1z" })
  );
};
const SvgCheckmark = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M6 14L0 8l2-2 4 4 8-8 2 2L6 14z" })
  );
};
const SvgChevronDown = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M16 4.7l-1.4-1.4L8 9.9 1.4 3.3 0 4.7l8 8z" })
  );
};
const SvgChevronLeft = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M11.3 0l1.4 1.4L6.1 8l6.6 6.6-1.4 1.4-8-8z" })
  );
};
const SvgChevronRight = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M4.7 0L3.3 1.4 9.9 8l-6.6 6.6L4.7 16l8-8z" })
  );
};
const SvgClose = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M14 0L8 6 2 0 0 2l6 6-6 6 2 2 6-6 6 6 2-2-6-6 6-6" })
  );
};
const SvgDelete = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M14 1v1H2V1h3l1-1h4l1 1zM3 3h10v12a1 1 0 01-1 1H4a1 1 0 01-1-1zm6 11h1V5H9zm-3 0h1V5H6z" })
  );
};
const SvgPlaceholder = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M0 0v16h16V0zm14.857 1.943v12.114L8.8 8zM8 7.2L1.943 1.143h12.114zm-.8.8l-6.057 6.057V1.943zm.8.8l6.057 6.057H1.943z" })
  );
};
const SvgRemove = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M14.7 2.7l-1.4-1.4L8 6.6 2.7 1.3 1.3 2.7 6.6 8l-5.3 5.3 1.4 1.4L8 9.4l5.3 5.3 1.4-1.4L9.4 8z" })
  );
};
const SvgSearch = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M11 9.7c.7-1 1.1-2.2 1.1-3.5.1-3.5-2.7-6.2-6-6.2C2.7 0 0 2.7 0 6.1s2.7 6.1 6.1 6.1c1.3 0 2.5-.4 3.5-1.1l4.9 4.9 1.4-1.4zm-5 .5c-2.3 0-4.1-1.8-4.1-4.1S3.7 2 6 2s4.1 1.8 4.1 4.1-1.8 4.1-4.1 4.1" })
  );
};
const SvgStatusError = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M9 12H7v-2h2v2zm0-3H7V4h2v5zm2.314-9H4.686L0 4.686v6.628L4.686 16h6.628L16 11.314V4.686L11.314 0z" })
  );
};
const SvgStatusSuccess = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M8 0a8 8 0 108 8 8 8 0 00-8-8zM6.65 12L3 8.59l1.4-1.3 2.36 2.2L11.59 5 13 6.29z" })
  );
};
const SvgStatusWarning = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M15.868 13.267l-6.77-11.62a1.15 1.15 0 00-1.1-.67 1.17 1.17 0 00-1.1.69l-6.77 11.59a1.2 1.2 0 001.1 1.72h13.45a1.19 1.19 0 001.19-1.71zm-6.87-.29h-2v-2h2zm0-3h-2v-5h2z" })
  );
};
class ContextSubMenu extends reactExports.Component {
  _menuElement = null;
  _subMenuElement = null;
  _menuButtonElement = null;
  _lastLabel;
  _parsedLabel;
  static defaultProps = {
    direction: ContextMenuDirection.BottomRight,
    disabled: false,
    hidden: false,
    autoflip: true,
    isSelected: false,
    selectedIndex: 0
  };
  state;
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      direction: props.direction
    };
  }
  render() {
    const { label, opened, direction, onOutsideClick, onEsc, autoflip, edgeLimit, selectedIndex, floating, parentMenu, parentSubmenu, onSelect, icon, disabled, hidden, onHover, isSelected, onHotKeyParsed, children, onClick, className, badgeType, badgeKind, hideIconContainer, ...props } = this.props;
    const onOutsideClickWrapper = (event) => {
      this.close();
      onOutsideClick && onOutsideClick(event);
    };
    const contextMenuProps = {
      onOutsideClick: onOutsideClickWrapper,
      onSelect,
      onEsc,
      autoflip,
      edgeLimit,
      selectedIndex,
      floating,
      parentMenu
    };
    const renderDirection = this.state.direction;
    const isDisabled = ConditionalBooleanValue.getValue(disabled);
    const isHidden = ConditionalBooleanValue.getValue(hidden);
    if (this._lastLabel !== label) {
      this._parsedLabel = TildeFinder.findAfterTilde(label).node;
      this._lastLabel = label;
    }
    return reactExports.createElement(
      "div",
      {
        className: classnames("core-context-submenu", ContextMenu.getCSSClassNameFromDirection(renderDirection), className),
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        onMouseOver: this._handleMouseOver,
        ref: (el) => {
          this._subMenuElement = el;
        },
        "data-testid": "core-context-submenu",
        ...props
      },
      reactExports.createElement(
        "div",
        { onClick: this._handleClick, ref: (el) => {
          this._menuButtonElement = el;
        }, className: classnames("core-context-menu-item", "core-context-submenu-container", isDisabled && "core-context-menu-disabled", isHidden && "core-context-menu-hidden", isSelected && "core-context-menu-is-selected"), "data-testid": "core-context-submenu-container", role: "menuitem", tabIndex: isSelected ? 0 : -1, "aria-disabled": isDisabled, "aria-hidden": isHidden, "aria-haspopup": true },
        !hideIconContainer && reactExports.createElement("div", { className: "core-context-menu-icon" }, icon !== void 0 && reactExports.createElement(Icon, { iconSpec: icon })),
        reactExports.createElement("div", { className: "core-context-menu-content" }, this._parsedLabel),
        reactExports.createElement(
          "div",
          { className: classnames("core-context-submenu-arrow", "icon") },
          reactExports.createElement(Icon, { iconSpec: reactExports.createElement(SvgCaretRightSmall, null) })
        ),
        (badgeKind || badgeType) && reactExports.createElement(
          "div",
          { className: "core-context-menu-badge" },
          reactExports.createElement(Badge, { type: badgeKind || badgeType })
        )
      ),
      reactExports.createElement(ContextMenu, { ref: (el) => {
        this._menuElement = el;
      }, className: "core-context-submenu-popup", opened: this.state.opened, direction: renderDirection, parentSubmenu: this, ...contextMenuProps }, children)
    );
  }
  componentDidMount() {
    document.addEventListener("click", this._handleClickGlobal);
    this._updateHotkey(this.props.label);
    this.checkRenderDirection();
  }
  componentWillUnmount() {
    document.removeEventListener("click", this._handleClickGlobal);
  }
  /** @internal */
  componentDidUpdate(prevProps, prevState) {
    const direction = this.props.direction;
    if (this.state.opened !== prevState.opened && direction !== this.state.direction || prevProps.direction !== direction)
      this.checkRenderDirection();
    if (this.props.label !== prevProps.label) {
      this._updateHotkey(this.props.label);
    }
  }
  getWindow() {
    const el = this._subMenuElement;
    const parentDocument = el.ownerDocument;
    return parentDocument.defaultView;
  }
  checkRenderDirection() {
    const { autoflip } = this.props;
    const parentWindow = this.getWindow();
    let renderDirection = this.state.direction;
    if (parentWindow && autoflip && this._menuElement) {
      const menuRect = this._menuElement.getRect();
      renderDirection = ContextMenu.autoFlip(renderDirection, menuRect, parentWindow.innerWidth, parentWindow.innerHeight);
      if (renderDirection !== this.state.direction)
        this.setState({ direction: renderDirection });
    }
  }
  _updateHotkey = (node) => {
    let hotKey;
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    const isHidden = ConditionalBooleanValue.getValue(this.props.hidden);
    if (!isDisabled && !isHidden)
      hotKey = TildeFinder.findAfterTilde(node).character;
    else
      hotKey = void 0;
    if (hotKey && hotKey !== this.state.hotKey) {
      this.setState({ hotKey });
      if (this.props.onHotKeyParsed)
        this.props.onHotKeyParsed(hotKey);
    }
  };
  select = () => {
    this.setState({ opened: true }, () => {
      if (this._menuElement)
        this._menuElement.focus();
      if (this.props.onSelect !== void 0)
        this.props.onSelect(void 0);
    });
  };
  close = (propagate) => {
    this.setState({ opened: false }, () => {
      if (this._menuElement)
        this._menuElement.blur();
    });
    if (propagate && this.props.parentMenu && this.props.parentMenu.props.parentSubmenu) {
      this.props.parentMenu.props.parentSubmenu.close(true);
    }
  };
  _handleMouseOver = (_event) => {
    if (this._menuButtonElement && this._menuButtonElement.style.visibility !== "hidden" && this.props.onHover) {
      this.props.onHover();
    }
  };
  _handleClick = (event) => {
    event.stopPropagation();
    const isDisabled = ConditionalBooleanValue.getValue(this.props.disabled);
    if (!isDisabled) {
      if (this.props.onClick !== void 0)
        this.props.onClick(event);
      if (this.props.opened)
        this.close();
      else
        this.select();
    }
  };
  _handleClickGlobal = (event) => {
    if (this._subMenuElement && !this._subMenuElement.contains(event.target))
      this.setState((_prevState) => ({ opened: false }));
  };
}
class ContextMenu extends reactExports.PureComponent {
  _rootElement = null;
  _menuElement = null;
  _selectedElement = null;
  _length = 0;
  _hotKeyMap = /* @__PURE__ */ new Map();
  _lastChildren;
  _lastDirection = ContextMenuDirection.BottomRight;
  _lastSelectedIndex = 0;
  _injectedChildren;
  _parentWindowHeight = 0;
  _parentWindowWidth = 0;
  static defaultProps = {
    direction: ContextMenuDirection.BottomRight,
    autoflip: true,
    edgeLimit: true,
    hotkeySelect: true,
    selectedIndex: -1,
    floating: true
  };
  state;
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex,
      direction: props.direction,
      ignoreNextKeyUp: props.ignoreNextKeyUp
    };
  }
  /** @internal */
  static autoFlip = (dir, rect, windowWidth, windowHeight) => {
    if (rect.right > windowWidth) {
      switch (dir) {
        case ContextMenuDirection.TopRight:
          dir = ContextMenuDirection.TopLeft;
          break;
        case ContextMenuDirection.Right:
          dir = ContextMenuDirection.Left;
          break;
        case ContextMenuDirection.BottomRight:
          dir = ContextMenuDirection.BottomLeft;
          break;
      }
    }
    if (rect.left < 0) {
      switch (dir) {
        case ContextMenuDirection.TopLeft:
          dir = ContextMenuDirection.TopRight;
          break;
        case ContextMenuDirection.Left:
          dir = ContextMenuDirection.Right;
          break;
        case ContextMenuDirection.BottomLeft:
          dir = ContextMenuDirection.BottomRight;
          break;
      }
    }
    if (rect.bottom > windowHeight) {
      switch (dir) {
        case ContextMenuDirection.BottomLeft:
          dir = ContextMenuDirection.TopLeft;
          break;
        case ContextMenuDirection.Bottom:
          dir = ContextMenuDirection.Top;
          break;
        case ContextMenuDirection.BottomRight:
          dir = ContextMenuDirection.TopRight;
          break;
      }
    }
    if (rect.top < 0) {
      switch (dir) {
        case ContextMenuDirection.TopLeft:
          dir = ContextMenuDirection.BottomLeft;
          break;
        case ContextMenuDirection.Top:
          dir = ContextMenuDirection.Bottom;
          break;
        case ContextMenuDirection.TopRight:
          dir = ContextMenuDirection.BottomRight;
          break;
      }
    }
    return dir;
  };
  _handleHotKeyParsed = (index, hotKey) => {
    this._hotKeyMap.set(index, hotKey);
  };
  _handleOnOutsideClick = (event) => {
    if (this.props.opened && this.props.onOutsideClick)
      this.props.onOutsideClick(event);
  };
  render() {
    const { opened, direction, onOutsideClick, onSelect, onEsc, autoflip, edgeLimit, hotkeySelect, selectedIndex, floating, parentMenu, parentSubmenu, children, className, ignoreNextKeyUp, offset = 0, ...props } = this.props;
    const renderDirection = parentMenu === void 0 ? this.state.direction : direction;
    if (this._lastChildren !== children || this._lastDirection !== renderDirection || this._lastSelectedIndex !== this.state.selectedIndex) {
      this._injectedChildren = this._injectMenuItemProps(children, renderDirection, this.state.selectedIndex);
      this._lastChildren = children;
      this._lastDirection = renderDirection;
      this._lastSelectedIndex = this.state.selectedIndex;
    }
    return reactExports.createElement(
      "div",
      { role: "presentation", className: classnames("core-context-menu", className), onKeyUp: this._handleKeyUp, onClick: this._handleClick, "data-testid": "core-context-menu-root", ...props, ref: this._rootRef },
      reactExports.createElement(
        DivWithOutsideClick,
        { onOutsideClick: this._handleOnOutsideClick },
        reactExports.createElement("div", { ref: this._menuRef, role: "menu", tabIndex: 0, "data-testid": "core-context-menu-container", className: classnames("core-context-menu-container", opened && "core-context-menu-opened", floating && "core-context-menu-floating", ContextMenu.getCSSClassNameFromDirection(renderDirection)), style: {
          "--_core-context-menu-offset": `${offset}px`
        } }, this._injectedChildren)
      )
    );
  }
  /** @internal */
  static getCSSClassNameFromDirection = (direction) => {
    let className = "";
    if (direction === void 0)
      direction = ContextMenuDirection.BottomRight;
    if (direction === ContextMenuDirection.None)
      return "";
    switch (direction) {
      case ContextMenuDirection.TopLeft:
        className = "core-context-menu-top core-context-menu-left";
        break;
      case ContextMenuDirection.Top:
        className = "core-context-menu-top";
        break;
      case ContextMenuDirection.TopRight:
        className = "core-context-menu-top core-context-menu-right";
        break;
      case ContextMenuDirection.Left:
        className = "core-context-menu-left";
        break;
      case ContextMenuDirection.Center:
        className = "core-context-menu-center";
        break;
      case ContextMenuDirection.Right:
        className = "core-context-menu-right";
        break;
      case ContextMenuDirection.BottomLeft:
        className = "core-context-menu-bottom core-context-menu-left";
        break;
      case ContextMenuDirection.Bottom:
        className = "core-context-menu-bottom";
        break;
      case ContextMenuDirection.BottomRight:
        className = "core-context-menu-bottom core-context-menu-right";
        break;
    }
    return className;
  };
  _injectMenuItemProps = (children, direction, selectedIndex) => {
    let index = 0;
    const ch = reactExports.Children.map(children, (child) => {
      if (child && typeof child === "object" && "props" in child && (child.type === ContextSubMenu || child.type === ContextMenuItem) && reactExports.isValidElement(child) && !ConditionalBooleanValue.getValue(child.props.disabled) && !ConditionalBooleanValue.getValue(child.props.hidden)) {
        const id = index;
        const onHover = () => {
          this.setState({ selectedIndex: id });
          this.focus();
        };
        const ref = (el) => {
          if (selectedIndex === id)
            this._selectedElement = el;
        };
        const boundHandleHotKeyParse = this._handleHotKeyParsed.bind(this, id);
        const childProps = {
          parentMenu: this,
          ref,
          onHover,
          isSelected: selectedIndex === id,
          onHotKeyParsed: boundHandleHotKeyParse
        };
        if (child.type === ContextSubMenu && reactExports.isValidElement(child)) {
          childProps.direction = child.props.direction || direction;
        }
        index++;
        return reactExports.cloneElement(child, childProps);
      } else
        return child;
    });
    this._length = index;
    return ch;
  };
  _rootRef = (el) => {
    this._rootElement = el;
  };
  _menuRef = (el) => {
    this._menuElement = el;
  };
  getWindow() {
    const el = this._rootElement ? this._rootElement : this._menuElement;
    const parentDocument = el.ownerDocument;
    return parentDocument.defaultView ?? window;
  }
  componentDidMount() {
    const parentWindow = this.getWindow();
    parentWindow.addEventListener("focus", this._handleFocusChange);
    parentWindow.addEventListener("mouseup", this._handleFocusChange);
    this.checkRenderDirection();
    if (this.props.opened)
      this.focus();
  }
  componentWillUnmount() {
    const parentWindow = this.getWindow();
    parentWindow.removeEventListener("focus", this._handleFocusChange);
    parentWindow.removeEventListener("mouseup", this._handleFocusChange);
  }
  checkRenderDirection() {
    const { direction, autoflip, parentMenu } = this.props;
    const parentWindow = this.getWindow();
    let renderDirection = parentMenu === void 0 ? this.state.direction : direction;
    if (parentWindow.innerHeight === this._parentWindowHeight && parentWindow.innerWidth === this._parentWindowWidth)
      return;
    this._parentWindowHeight = parentWindow.innerHeight;
    this._parentWindowWidth = parentWindow.innerWidth;
    if (parentWindow && autoflip && parentMenu === void 0) {
      const menuRect = this.getRect();
      renderDirection = ContextMenu.autoFlip(renderDirection, menuRect, parentWindow.innerWidth, parentWindow.innerHeight);
      if (renderDirection !== this.state.direction)
        this.setState({ direction: renderDirection });
    }
  }
  focus = () => {
    if (this._menuElement)
      this._menuElement.focus();
  };
  blur = () => {
    if (this._menuElement)
      this._menuElement.blur();
  };
  getRect = () => {
    let clientRect = DOMRect.fromRect({ x: 0, y: 0, width: 0, height: 0 });
    if (this._menuElement) {
      clientRect = this._menuElement.getBoundingClientRect();
    }
    return clientRect;
  };
  _handleFocusChange = (event) => {
    if (this._rootElement && this.props.opened && event.target instanceof Node && this.props.onOutsideClick && !this._rootElement.contains(event.target))
      this.props.onOutsideClick(event);
  };
  _handleClick = (event) => {
    if (this.props.onSelect)
      this.props.onSelect(event);
  };
  _handleKeyUp = (event) => {
    if (this.state.ignoreNextKeyUp) {
      this.setState({ ignoreNextKeyUp: false });
      return;
    }
    if (event.key) {
      for (const [key, value] of this._hotKeyMap) {
        if (!this.props.hotkeySelect && key > this.state.selectedIndex) {
          if (event.key.toUpperCase() === value) {
            this.setState({ selectedIndex: key });
            return;
          }
        }
      }
      for (const [key, value] of this._hotKeyMap) {
        if (event.key.toUpperCase() === value) {
          this.setState({ selectedIndex: key }, () => {
            if (this.props.hotkeySelect && this._selectedElement) {
              this._selectedElement.select();
            }
          });
          event.stopPropagation();
          return;
        }
      }
    }
    if (event.key === Key_enumExports.Key.ArrowLeft.valueOf()) {
      event.stopPropagation();
      if (this.props.parentMenu && this.props.parentSubmenu) {
        this.props.parentSubmenu.close();
        this.props.parentMenu.focus();
      }
      if (this.props.onEsc)
        this.props.onEsc(event);
    }
    if (event.key === Key_enumExports.Key.Escape.valueOf()) {
      if (this.props.onEsc)
        this.props.onEsc(event);
    }
    if ((event.key === Key_enumExports.Key.Enter.valueOf() || event.key === Key_enumExports.Key.ArrowRight.valueOf()) && this._selectedElement) {
      event.stopPropagation();
      if (event.key === Key_enumExports.Key.Enter.valueOf() || this._selectedElement instanceof ContextSubMenu) {
        if (this._selectedElement.select)
          this._selectedElement.select();
      }
    }
    let { selectedIndex } = this.state;
    if (event.key === Key_enumExports.Key.ArrowUp.valueOf() || event.key === Key_enumExports.Key.ArrowDown.valueOf()) {
      event.stopPropagation();
      if (selectedIndex === -1) {
        selectedIndex = 0;
      } else {
        if (event.key === Key_enumExports.Key.ArrowUp.valueOf()) {
          if (this.state.selectedIndex === 0)
            selectedIndex = this._length - 1;
          else
            selectedIndex--;
        }
        if (event.key === Key_enumExports.Key.ArrowDown.valueOf()) {
          if (this.state.selectedIndex === this._length - 1)
            selectedIndex = 0;
          else
            selectedIndex++;
        }
      }
    }
    this.setState({ selectedIndex });
  };
  /** @internal */
  componentDidUpdate(prevProps) {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.setState((_, props) => ({ selectedIndex: props.selectedIndex }));
    }
    if (!prevProps.opened && this.props.opened) {
      this.setState((_, props) => ({ selectedIndex: props.selectedIndex }));
    }
    if (!this.props.parentMenu) {
      this.checkRenderDirection();
    }
  }
}
function isFocusable(element) {
  if (!element || element.tabIndex < 0)
    return false;
  if (element.classList && element.classList.contains("core-focus-trap-ignore-initial"))
    return false;
  if (element.getAttribute && typeof element.getAttribute === "function" && element.getAttribute("disabled") !== null)
    return false;
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null)
    return true;
  switch (element.nodeName) {
    case "A":
      const anchorElement = element;
      return !!anchorElement.href && anchorElement.rel !== "ignore";
    case "INPUT":
      const inputElement = element;
      return inputElement.type !== "hidden" && inputElement.type !== "file";
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return true;
    default:
      return false;
  }
}
function processFindFocusableDescendant(element) {
  if (!element)
    return null;
  for (const child of element.childNodes) {
    if (isFocusable(child))
      return child;
    const focusable = processFindFocusableDescendant(child);
    if (focusable)
      return focusable;
  }
  return null;
}
function findFirstFocusableDescendant(focusContainer) {
  return processFindFocusableDescendant(focusContainer);
}
function processFindLastFocusableDescendant(element) {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i];
    const focusable = processFindLastFocusableDescendant(child);
    if (focusable)
      return focusable;
    if (isFocusable(child))
      return child;
  }
  return null;
}
function findLastFocusableDescendant(focusContainer) {
  return processFindLastFocusableDescendant(focusContainer);
}
function getInitialFocusElement(focusContainer, initialFocusSpec) {
  if (!focusContainer)
    return null;
  if (initialFocusSpec) {
    if (typeof initialFocusSpec === "string") {
      const node = focusContainer.querySelector(initialFocusSpec);
      if (node) {
        return node;
      } else {
        Logger.logError(`${UiCore$1.packageName}.FocusTrap`, `Unable to locate element via selector ${initialFocusSpec}`);
      }
    } else {
      return initialFocusSpec.current;
    }
  }
  return findFirstFocusableDescendant(focusContainer);
}
function attemptFocus(element, preventScroll) {
  if (!isFocusable(element))
    return false;
  try {
    if (document.activeElement !== element)
      element.focus({
        preventScroll: preventScroll ? true : false
      });
  } catch {
    return false;
  }
  return document.activeElement === element;
}
function focusIntoContainer(focusContainer, initialFocusElement) {
  let result = false;
  const focusElement = getInitialFocusElement(focusContainer, initialFocusElement);
  if (focusElement) {
    setTimeout(() => {
      attemptFocus(focusElement, true);
    }, 60);
    result = true;
  }
  return result;
}
function FocusTrap(props) {
  const restoreFocusElement = reactExports.useRef(null);
  const initialFocusElement = reactExports.useRef(null);
  const focusContainer = reactExports.useRef(null);
  const isInitialMount = reactExports.useRef(true);
  const timeoutRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (props.active) {
        if (props.returnFocusOnDeactivate) {
          restoreFocusElement.current = document.activeElement;
        }
        initialFocusElement.current = getInitialFocusElement(focusContainer.current, props.initialFocusElement);
        if (initialFocusElement.current) {
          timeoutRef.current = window.setTimeout(() => {
            attemptFocus(initialFocusElement.current, true);
          }, 60);
        }
      }
    }
  }, [
    props.children,
    props.initialFocusElement,
    props.active,
    props.returnFocusOnDeactivate
  ]);
  reactExports.useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
      if (restoreFocusElement.current)
        restoreFocusElement.current.focus({
          preventScroll: true
        });
    };
  }, []);
  const cycleFocusToEnd = reactExports.useCallback((event) => {
    if (!props.active)
      return;
    if (focusContainer.current && event.target === focusContainer.current) {
      event.stopPropagation();
      event.preventDefault();
      const focusable = findLastFocusableDescendant(focusContainer.current);
      if (focusable) {
        focusable.focus();
      } else {
        if (initialFocusElement.current && initialFocusElement.current !== document.activeElement)
          attemptFocus(initialFocusElement.current, true);
      }
    }
  }, [props.active]);
  const cycleFocusToStart = reactExports.useCallback((event) => {
    if (!props.active)
      return;
    event.stopPropagation();
    if (initialFocusElement.current && initialFocusElement.current !== document.activeElement)
      initialFocusElement.current.focus();
  }, [props.active]);
  if (!props.children)
    return null;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement("div", {
      "data-testid": "focus-trap-div",
      onFocus: cycleFocusToEnd,
      ref: focusContainer,
      /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
      tabIndex: 0,
      style: { outline: "none", WebkitTapHighlightColor: "rgba(0,0,0,0)" }
    }, props.children),
    reactExports.createElement("div", {
      "data-testid": "focus-trap-limit-div",
      onFocus: cycleFocusToStart,
      /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
      tabIndex: 0
    })
  );
}
class Point {
  x;
  y;
  /** Creates point from PointProps */
  static create(pointProps) {
    return new Point(pointProps.x, pointProps.y);
  }
  /** Creates a new point. */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  /** Calculates Euclidean distance to other point. */
  getDistanceTo(other) {
    const offset = this.getOffsetTo(other);
    return Math.sqrt(Math.pow(offset.x, 2) + Math.pow(offset.y, 2));
  }
  /** Gets offset to other point. */
  getOffsetTo(other) {
    return new Point(other.x - this.x, other.y - this.y);
  }
  /** @returns New [[Point]] that is offset along the X and Y axes. */
  offset(offset) {
    return new Point(this.x + offset.x, this.y + offset.y);
  }
  /** @returns New [[Point]] that is offset along the X axis. */
  offsetX(offset) {
    return new Point(this.x + offset, this.y);
  }
  /** @returns New [[Point]] that is offset along the Y axis. */
  offsetY(offset) {
    return new Point(this.x, this.y + offset);
  }
  /** @returns True if position of this and other points are equal. */
  equals(other) {
    return other.x === this.x && other.y === this.y;
  }
  /** @returns New [[Point]] with modified x value. */
  setX(x) {
    return new Point(x, this.y);
  }
  /** @returns New [[Point]] with modified y value. */
  setY(y) {
    return new Point(this.x, y);
  }
  /** @returns New [[Point]] with coordinates multiplied by specified factor. */
  multiply(factor) {
    return new Point(this.x * factor, this.y * factor);
  }
  /** @returns PointProps object for this point. */
  toProps() {
    return {
      x: this.x,
      y: this.y
    };
  }
}
var Corner;
(function(Corner2) {
  Corner2[Corner2["TopLeft"] = 0] = "TopLeft";
  Corner2[Corner2["TopRight"] = 1] = "TopRight";
  Corner2[Corner2["BottomRight"] = 2] = "BottomRight";
  Corner2[Corner2["BottomLeft"] = 3] = "BottomLeft";
})(Corner || (Corner = {}));
class Rectangle {
  left;
  top;
  right;
  bottom;
  /** Creates rectangle from [[RectangleProps]]. */
  static create(props) {
    return new Rectangle(props.left, props.top, props.right, props.bottom);
  }
  /** Creates rectangle from [[SizeProps]]. */
  static createFromSize(size2) {
    return new Rectangle(0, 0, size2.width, size2.height);
  }
  /** Create a rectangle with 2 pairs of xy candidates. Theses are compared and shuffled as needed for the rectangle. */
  static createXYXY(xA, yA, xB, yB) {
    return new Rectangle(Math.min(xA, xB), Math.min(yA, yB), Math.max(xA, xB), Math.max(yA, yB));
  }
  /** Creates rectangle with specified bounds. */
  constructor(left = 0, top = 0, right = 0, bottom = 0) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
  /** @returns Size of this rectangle. */
  getSize() {
    const width = this.getWidth();
    const height = this.getHeight();
    return { width, height };
  }
  /** @returns Width of this rectangle. */
  getWidth() {
    return this.right - this.left;
  }
  /** @returns Height of this rectangle. */
  getHeight() {
    return this.bottom - this.top;
  }
  /** @returns Position of specified corner. */
  getCorner(corner) {
    switch (corner) {
      case Corner.TopLeft: {
        return this.topLeft();
      }
      case Corner.TopRight: {
        return new Point(this.right, this.top);
      }
      case Corner.BottomLeft: {
        return new Point(this.left, this.bottom);
      }
      case Corner.BottomRight: {
        return new Point(this.right, this.bottom);
      }
    }
  }
  /**
   * Inset the bounds of this rectangle.
   * @note Negative arguments will increase the size of rectangle.
   * @returns New [[Rectangle]] with modified bounds.
   */
  inset(left, top, right, bottom) {
    return new Rectangle(this.left + left, this.top + top, this.right - right, this.bottom - bottom);
  }
  /**
   * Offsets the rectangle along the X and Y axes.
   * @returns New [[Rectangle]] with modified position.
   */
  offset(offset) {
    return new Rectangle(this.left + offset.x, this.top + offset.y, this.right + offset.x, this.bottom + offset.y);
  }
  /**
   * Offsets the rectangle along the X axis.
   * @returns New [[Rectangle]] with modified position along X axis.
   */
  offsetX(offset) {
    return new Rectangle(this.left + offset, this.top, this.right + offset, this.bottom);
  }
  /**
   * Offsets the rectangle along the Y axis.
   * @returns New [[Rectangle]] with modified position along Y axis.
   */
  offsetY(offset) {
    return new Rectangle(this.left, this.top + offset, this.right, this.bottom + offset);
  }
  /**
   * Moves the top left corner of rectangle to specified point.
   * @returns New [[Rectangle]] with modified position.
   */
  setPosition(position) {
    return new Rectangle(position.x, position.y, position.x + this.getWidth(), position.y + this.getHeight());
  }
  /**
   * Sets the height of the rectangle.
   * @note Only [[Edge.Bottom]] is subject to change.
   * @returns New [[Rectangle]] with modified height.
   */
  setHeight(height) {
    return new Rectangle(this.left, this.top, this.right, this.top + height);
  }
  /**
   * Sets the width of the rectangle.
   * @note Only [[Edge.Right]] is subject to change.
   * @returns New [[Rectangle]] with modified width.
   */
  setWidth(width) {
    return new Rectangle(this.left, this.top, this.left + width, this.bottom);
  }
  /**
   * Sets the height and width of the rectangle.
   * @note Only [[Edge.Bottom]] and [[Edge.Right]] are subjects to change.
   * @returns New [[Rectangle]] with modified height.
   */
  setSize(size2) {
    return new Rectangle(this.left, this.top, this.left + size2.width, this.top + size2.height);
  }
  /** Checks if bounds of two rectangles match. */
  equals(other) {
    if (this.left === other.left && this.top === other.top && this.right === other.right && this.bottom === other.bottom)
      return true;
    return false;
  }
  /**
   * Checks if point is within bounds of the rectangle.
   * @note Inclusive.
   */
  containsPoint(point) {
    return point.x >= this.left && point.x <= this.right && point.y >= this.top && point.y <= this.bottom;
  }
  /**
   * Checks if a point given as x,y is within the rectangle.
   * @note Inclusive.
   */
  containsXY(x, y) {
    return this.containsPoint({ x, y });
  }
  /**
   * @returns true if this rectangle contains other rectangle.
   * @note Inclusive.
   */
  contains(other) {
    return other.left >= this.left && other.right <= this.right && other.top >= this.top && other.bottom <= this.bottom;
  }
  /** @returns New [[Rectangle]] which is contained in other rectangle. */
  containIn(other) {
    let contained = this.containVerticallyIn(other);
    contained = contained.containHorizontallyIn(other);
    return contained;
  }
  /** @returns New [[Rectangle]] which is vertically contained in other rectangle. */
  containVerticallyIn(other) {
    const contained = this.offsetY(Math.min(other.bottom - this.bottom, 0));
    return contained.offsetY(Math.max(other.top - contained.top, 0));
  }
  /** @returns New [[Rectangle]] which is horizontally contained in other rectangle. */
  containHorizontallyIn(other) {
    const contained = this.offsetX(Math.min(other.right - this.right, 0));
    return contained.offsetX(Math.max(other.left - contained.left, 0));
  }
  /** @returns [[Corner.TopLeft]] position of this rectangle. */
  topLeft() {
    return new Point(this.left, this.top);
  }
  /** @returns Center point position of this rectangle. */
  center() {
    const x = this.left + (this.right - this.left) / 2;
    const y = this.top + (this.bottom - this.top) / 2;
    return new Point(x, y);
  }
  /** @returns true if this rectangle intersects other rectangle. */
  intersects(other) {
    return this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top;
  }
  /**
   * Merges outer edges of this and other rectangles.
   * @returns New [[Rectangle]] with merged bounds.
   */
  outerMergeWith(other) {
    const left = Math.min(this.left, other.left);
    const top = Math.min(this.top, other.top);
    const right = Math.max(this.right, other.right);
    const bottom = Math.max(this.bottom, other.bottom);
    return new Rectangle(left, top, right, bottom);
  }
  /**
   * Vertically divides this rectangle into specified number of equal height segments.
   * @returns Vertical rectangle segment.
   */
  getVerticalSegmentBounds(segmentId, numberOfSegments) {
    const segmentHeight = this.getHeight() / numberOfSegments;
    const top = segmentId * segmentHeight;
    return this.inset(0, top, 0, 0).setHeight(segmentHeight);
  }
  /**
   * Horizontally divides this rectangle into specified number of equal width segments.
   * @returns Horizontal rectangle segment.
   */
  getHorizontalSegmentBounds(segmentId, numberOfSegments) {
    const segmentWidth = this.getWidth() / numberOfSegments;
    const left = segmentId * segmentWidth;
    return this.inset(left, 0, 0, 0).setWidth(segmentWidth);
  }
  /**
   * Calculates the shortest distance between this rectangle and a given point.
   * @returns The shortest distance to a point.
   */
  getShortestDistanceToPoint(point) {
    let shortestDistance = 0;
    if (point.x < this.left) {
      if (point.y < this.top)
        shortestDistance = hypotenuseXY(this.left - point.x, this.top - point.y);
      else if (point.y <= this.bottom)
        shortestDistance = this.left - point.x;
      else
        shortestDistance = hypotenuseXY(this.left - point.x, this.bottom - point.y);
    } else if (point.x <= this.right) {
      if (point.y < this.top)
        shortestDistance = this.top - point.y;
      else if (point.y <= this.bottom)
        shortestDistance = 0;
      else
        shortestDistance = point.y - this.bottom;
    } else {
      if (point.y < this.top)
        shortestDistance = hypotenuseXY(this.right - point.x, this.top - point.y);
      else if (point.y <= this.bottom)
        shortestDistance = point.x - this.right;
      else
        shortestDistance = hypotenuseXY(this.right - point.x, this.bottom - point.y);
    }
    return shortestDistance;
  }
  /** @returns [[RectangleProps]] object for this rectangle. */
  toProps() {
    return {
      bottom: this.bottom,
      left: this.left,
      right: this.right,
      top: this.top
    };
  }
}
function hypotenuseXY(x, y) {
  return Math.sqrt(x * x + y * y);
}
const PopupContext = reactExports.createContext(void 0);
class Popup extends reactExports.Component {
  _popup = null;
  /** @internal */
  static contextType = PopupContext;
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(props) {
    super(props);
    const parentDocument = this.props.target?.ownerDocument ?? document;
    this.state = {
      animationEnded: false,
      isOpen: this.props.isOpen,
      top: 0,
      left: 0,
      position: this.props.position,
      parentDocument
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  static defaultProps = {
    position: RelativePosition.Bottom,
    showShadow: true,
    showArrow: false,
    isOpen: false,
    offset: 4,
    top: -1,
    left: -1
  };
  componentDidMount() {
    if (this.props.isOpen) {
      this._onShow();
    }
  }
  getParentWindow() {
    return this.state.parentDocument.defaultView ?? window;
  }
  /** @internal */
  componentDidUpdate(previousProps, prevState) {
    if (this.state.position !== prevState.position) {
      this.setState({ animationEnded: false });
    }
    if (this.props.target !== previousProps.target) {
      {
        const parentDocument = this.props.target?.ownerDocument ?? document;
        if (parentDocument !== this.state.parentDocument) {
          this._unBindWindowEvents();
          this.setState({ parentDocument });
        }
      }
    }
    if (this.props.isOpen === previousProps.isOpen) {
      if (this.props.isOpen) {
        const position = this._toggleRelativePosition();
        const point = this._fitPopup(this._getPosition(position));
        if (Math.abs(this.state.left - point.x) < 3 && Math.abs(this.state.top - point.y) < 3 && this.state.position === position)
          return;
        this.setState({
          left: point.x,
          top: point.y,
          position
        });
      }
      return;
    }
    if (this.props.isOpen) {
      this._onShow();
    } else {
      this._onClose();
    }
  }
  componentWillUnmount() {
    this._unBindWindowEvents();
  }
  _bindWindowEvents = () => {
    const activeWindow = this.getParentWindow();
    activeWindow.addEventListener("pointerdown", this._handleOutsideClick);
    activeWindow.addEventListener("resize", this._resize);
    activeWindow.addEventListener("contextmenu", this._handleContextMenu);
    activeWindow.addEventListener("scroll", this._hide);
    activeWindow.addEventListener("wheel", this._handleWheel);
    activeWindow.addEventListener("keydown", this._handleKeyboard);
  };
  _unBindWindowEvents = () => {
    const activeWindow = this.getParentWindow();
    activeWindow.removeEventListener("pointerdown", this._handleOutsideClick);
    activeWindow.removeEventListener("resize", this._resize);
    activeWindow.removeEventListener("contextmenu", this._handleContextMenu);
    activeWindow.removeEventListener("scroll", this._hide);
    activeWindow.removeEventListener("wheel", this._handleWheel);
    activeWindow.removeEventListener("keydown", this._handleKeyboard);
  };
  _handleWheel = (event) => {
    if (this._popup && this._popup.contains(event.target))
      return;
    if (this.props.onWheel)
      return this.props.onWheel(event);
    const closeOnWheel = this.props.closeOnWheel !== void 0 ? this.props.closeOnWheel : true;
    if (closeOnWheel)
      this._hide();
  };
  isInCorePopup(element) {
    if (element.nodeName === "DIV") {
      if (element.classList && element.classList.contains("core-popup"))
        return true;
      if (element.parentElement && this.isInCorePopup(element.parentElement))
        return true;
    } else {
      if (element.parentElement && this.isInCorePopup(element.parentElement))
        return true;
    }
    return false;
  }
  _handleOutsideClick = (event) => {
    if (this._popup && this._popup.contains(event.target))
      return;
    if (this.props.isPinned)
      return;
    if (!this.props.closeOnNestedPopupOutsideClick && this.isInCorePopup(event.target))
      return;
    if (this.props.onOutsideClick)
      return this.props.onOutsideClick(event);
    if (this.props.target && this.props.target.contains(event.target))
      return;
    this._onClose();
  };
  _handleContextMenu = (event) => {
    if (this._popup && this._popup.contains(event.target))
      return;
    if (this.props.onContextMenu)
      return this.props.onContextMenu(event);
    const closeOnContextMenu = this.props.closeOnContextMenu !== void 0 ? this.props.closeOnContextMenu : true;
    if (closeOnContextMenu)
      this._hide();
  };
  _handleKeyboard = (event) => {
    if (this.props.isPinned)
      return;
    if (event.key === Key_enumExports.Key.Escape.valueOf() || event.key === Key_enumExports.Key.Enter.valueOf()) {
      const closeOnEnter = this.props.closeOnEnter !== void 0 ? this.props.closeOnEnter : true;
      if (event.key === Key_enumExports.Key.Enter.valueOf()) {
        if (closeOnEnter)
          this._onClose(true);
        else
          this.props.onEnter && this.props.onEnter();
      } else {
        this._onClose(false);
      }
    }
  };
  _resize = () => {
    if (this.props.repositionOnResize) {
      const position = this._toggleRelativePosition();
      const point = this._fitPopup(this._getPosition(position));
      this.setState({ left: point.x, top: point.y, position });
    } else {
      this._hide();
    }
  };
  _hide = () => {
    if (this.props.isPinned)
      return;
    this._onClose();
  };
  _onShow() {
    this._bindWindowEvents();
    const position = this._toggleRelativePosition();
    const point = this._fitPopup(this._getPosition(position));
    this.setState({ left: point.x, top: point.y, isOpen: true, position }, () => {
      if (this.props.onOpen)
        this.props.onOpen();
    });
  }
  _onClose(enterKey) {
    if (!this.state.isOpen)
      return;
    this._unBindWindowEvents();
    this.setState({ isOpen: false }, () => {
      if (enterKey && this.props.onEnter)
        this.props.onEnter();
      if (this.props.onClose)
        this.props.onClose();
    });
  }
  _isPositionAbsolute() {
    return this.props.top !== -1 && this.props.left !== -1;
  }
  _getClassNameByPosition(position) {
    if (!this._isPositionAbsolute()) {
      switch (position) {
        case RelativePosition.TopLeft:
          return "core-popup-top-left";
        case RelativePosition.TopRight:
          return "core-popup-top-right";
        case RelativePosition.BottomLeft:
          return "core-popup-bottom-left";
        case RelativePosition.BottomRight:
          return "core-popup-bottom-right";
        case RelativePosition.Top:
          return "core-popup-top";
        case RelativePosition.Left:
          return "core-popup-left";
        case RelativePosition.Right:
          return "core-popup-right";
        case RelativePosition.Bottom:
          return "core-popup-bottom";
        case RelativePosition.LeftTop:
          return "core-popup-left-top";
        case RelativePosition.RightTop:
          return "core-popup-right-top";
      }
    }
    return "";
  }
  _getPopupDimensions() {
    let popupWidth = 0;
    let popupHeight = 0;
    if (this._popup) {
      const activeWindow = this.getParentWindow();
      const style = activeWindow.getComputedStyle(this._popup);
      const borderLeftWidth = parsePxString(style.borderLeftWidth);
      const borderRightWidth = parsePxString(style.borderRightWidth);
      const borderTopWidth = parsePxString(style.borderTopWidth);
      const borderBottomWidth = parsePxString(style.borderBottomWidth);
      popupWidth = this._popup.clientWidth + borderLeftWidth + borderRightWidth;
      popupHeight = this._popup.clientHeight + borderTopWidth + borderBottomWidth;
    }
    return { popupWidth, popupHeight };
  }
  _getPosition = (position) => {
    const activeWindow = this.getParentWindow();
    const { target, offset, top, left } = this.props;
    const offsetArrow = this.props.showArrow ? 6 : 0;
    if (this._isPositionAbsolute())
      return { x: left, y: top };
    const point = { x: 0, y: 0 };
    if (!this._popup || !target)
      return point;
    const scrollY = activeWindow.scrollY;
    const scrollX = activeWindow.scrollX;
    const container = this.getContainer();
    const containerBounds = container.getBoundingClientRect();
    const targetRect = Rectangle.create(target.getBoundingClientRect()).offset({
      x: -containerBounds.left,
      y: -containerBounds.top
    });
    const { popupWidth, popupHeight } = this._getPopupDimensions();
    switch (position) {
      case RelativePosition.Top:
        point.y = scrollY + targetRect.top - popupHeight - offset - offsetArrow;
        point.x = scrollX + targetRect.left + targetRect.getWidth() / 2 - popupWidth / 2;
        break;
      case RelativePosition.TopLeft:
        point.y = scrollY + targetRect.top - popupHeight - offset - offsetArrow;
        point.x = scrollX + targetRect.left;
        break;
      case RelativePosition.TopRight:
        point.y = scrollY + targetRect.top - popupHeight - offset - offsetArrow;
        point.x = scrollX + targetRect.right - popupWidth;
        break;
      case RelativePosition.Bottom:
        point.y = scrollY + targetRect.bottom + offset + offsetArrow;
        point.x = scrollX + targetRect.left + targetRect.getWidth() / 2 - popupWidth / 2;
        break;
      case RelativePosition.BottomLeft:
        point.y = scrollY + targetRect.bottom + offset + offsetArrow;
        point.x = scrollX + targetRect.left;
        break;
      case RelativePosition.BottomRight:
        point.y = scrollY + targetRect.bottom + offset + offsetArrow;
        point.x = scrollX + targetRect.right - popupWidth;
        break;
      case RelativePosition.Left:
        point.y = scrollY + targetRect.top + targetRect.getHeight() / 2 - popupHeight / 2;
        point.x = scrollX + targetRect.left - popupWidth - offset - offsetArrow;
        break;
      case RelativePosition.LeftTop:
        point.y = scrollY + targetRect.top;
        point.x = scrollX + targetRect.left - popupWidth - offset - offsetArrow;
        break;
      case RelativePosition.Right:
        point.y = scrollY + targetRect.top + targetRect.getHeight() / 2 - popupHeight / 2;
        point.x = scrollX + targetRect.right + offset + offsetArrow;
        break;
      case RelativePosition.RightTop:
        point.y = scrollY + targetRect.top;
        point.x = scrollX + targetRect.right + offset + offsetArrow;
        break;
    }
    return point;
  };
  _toggleRelativePosition() {
    const { target, position, offset } = this.props;
    if (!this._popup || !target)
      return position;
    if (this._isPositionAbsolute())
      return position;
    let newPosition = position;
    const activeWindow = this.getParentWindow();
    const viewportRect = {
      left: activeWindow.scrollX,
      top: activeWindow.scrollY,
      right: activeWindow.scrollX + activeWindow.innerWidth,
      bottom: activeWindow.scrollY + activeWindow.innerHeight
    };
    const targetRect = target.getBoundingClientRect();
    const { popupWidth, popupHeight } = this._getPopupDimensions();
    const containerStyle = activeWindow.getComputedStyle(target);
    const offsetArrow = this.props.showArrow ? 10 : 2;
    const bottomMargin = parseMargin(containerStyle.marginBottom);
    if (targetRect.bottom + popupHeight + bottomMargin + offsetArrow + offset > viewportRect.bottom) {
      if (newPosition === RelativePosition.Bottom)
        newPosition = RelativePosition.Top;
      else if (newPosition === RelativePosition.BottomLeft)
        newPosition = RelativePosition.TopLeft;
      else if (newPosition === RelativePosition.BottomRight)
        newPosition = RelativePosition.TopRight;
    }
    const topMargin = parseMargin(containerStyle.marginTop);
    if (targetRect.top - popupHeight - topMargin - offsetArrow - offset < viewportRect.top) {
      if (newPosition === RelativePosition.Top)
        newPosition = RelativePosition.Bottom;
      else if (newPosition === RelativePosition.TopLeft)
        newPosition = RelativePosition.BottomLeft;
      else if (newPosition === RelativePosition.TopRight)
        newPosition = RelativePosition.BottomRight;
    }
    const leftMargin = parseMargin(containerStyle.marginLeft);
    if (targetRect.left - popupWidth - leftMargin - offsetArrow - offset < viewportRect.left) {
      if (newPosition === RelativePosition.Left)
        newPosition = RelativePosition.Right;
      else if (newPosition === RelativePosition.LeftTop)
        newPosition = RelativePosition.RightTop;
    }
    const rightMargin = parseMargin(containerStyle.marginRight);
    if (targetRect.right + popupWidth + rightMargin + offsetArrow + offset > viewportRect.right) {
      if (newPosition === RelativePosition.Right)
        newPosition = RelativePosition.Left;
      else if (newPosition === RelativePosition.RightTop)
        newPosition = RelativePosition.LeftTop;
    }
    return newPosition;
  }
  // fit the popup within the extents of the view port
  _fitPopup = (point) => {
    const fittedPoint = point;
    if (!this._popup) {
      return fittedPoint;
    }
    const { popupWidth, popupHeight } = this._getPopupDimensions();
    const container = this.getContainer();
    const containerBounds = container.getBoundingClientRect();
    if (fittedPoint.y + popupHeight > containerBounds.height) {
      fittedPoint.y = containerBounds.height - popupHeight;
    }
    if (fittedPoint.x + popupWidth > containerBounds.width) {
      fittedPoint.x = containerBounds.width - popupWidth;
    }
    if (fittedPoint.y < 0) {
      fittedPoint.y = 0;
    }
    if (fittedPoint.x < 0) {
      fittedPoint.x = 0;
    }
    return fittedPoint;
  };
  _handleAnimationEnd = (event) => {
    if (event.target === this._popup) {
      this.setState({ animationEnded: true });
    }
  };
  _handleThemeProviderRef = (el) => {
    this.setState({ portalContainer: el ?? void 0 });
  };
  render() {
    const animate = this.props.animate !== void 0 ? this.props.animate : true;
    const className = classnames("core-popup", this._getClassNameByPosition(this.state.position), this.props.showShadow && "core-popup-shadow", this.props.showArrow && "arrow", !animate && "core-popup-animation-none", this.props.className, this.state.animationEnded && "core-animation-ended", !this.props.isOpen && this.props.keepContentsMounted && "core-popup-hidden");
    const style = {
      top: this.state.top,
      left: this.state.left,
      ...this.props.style
    };
    const role = this.props.role ? this.props.role : "dialog";
    if (!this.props.isOpen && !this.props.keepContentsMounted) {
      return null;
    }
    return reactDomExports.createPortal(reactExports.createElement(
      "div",
      { className, "data-testid": "core-popup", ref: (element) => {
        this._popup = element;
      }, style, role, "aria-modal": true, tabIndex: -1, "aria-label": this.props.ariaLabel, onAnimationEnd: this._handleAnimationEnd },
      reactExports.createElement(
        ThemeProvider,
        { ref: this._handleThemeProviderRef, portalContainer: this.state.portalContainer },
        reactExports.createElement(FocusTrap, { active: !!this.props.moveFocus, initialFocusElement: this.props.focusTarget, returnFocusOnDeactivate: true }, this.props.children)
      )
    ), this.getContainer());
  }
  getContainer() {
    return this.props.portalTarget ?? this.context ?? this.state.parentDocument.body.querySelector('[data-root-container="appui-root-id"]') ?? this.state.parentDocument.body;
  }
}
function parsePxString(pxStr) {
  const parsed = parseInt(pxStr, 10);
  return parsed || 0;
}
function parseMargin(value) {
  return value ? parseFloat(value) : 0;
}
const form = { "submitButtonLabel": "Submit", "errorPrefix": "Error:", "errorSuffix": "Please review input and try again." };
const general$1 = { "search": "Search", "clear": "Clear" };
const dialog$1 = { "ok": "OK", "retry": "Retry", "yes": "Yes", "no": "No", "cancel": "Cancel", "close": "Close", "next": "Next", "previous": "Previous" };
const reactselect = { "noSelectOption": "Option not found" };
const tree$1 = { "expand": "Expand", "collapse": "Collapse" };
const elementSeparator = { "label": "Resizer" };
const UiCore2 = {
  form,
  general: general$1,
  dialog: dialog$1,
  reactselect,
  tree: tree$1,
  elementSeparator
};
const defaults$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UiCore2,
  dialog: dialog$1,
  elementSeparator,
  form,
  general: general$1,
  reactselect,
  tree: tree$1
}, Symbol.toStringTag, { value: "Module" }));
const LocalizationContext = reactExports.createContext(void 0);
function useLocalization() {
  const localization = reactExports.useContext(LocalizationContext);
  return localization;
}
function usePackageTranslation({ namespace, fallback, defaults: defaults2 }) {
  const localization = useLocalization();
  const [registered, setRegistered] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!localization)
      return;
    let ignore = false;
    setRegistered(false);
    void (async () => {
      await localization.registerNamespace(namespace);
      if (ignore)
        return;
      setRegistered(true);
    })();
    return () => {
      ignore = true;
    };
  }, [localization, namespace]);
  const translate = reactExports.useCallback((key) => {
    if (localization && registered) {
      return localization.getLocalizedString(`${namespace}:${key}`);
    }
    const fallbackTranslation = fallback(key);
    if (fallbackTranslation !== void 0) {
      return fallbackTranslation;
    }
    const defaultValue = getDefaultValue(defaults2, key);
    return defaultValue ?? key;
  }, [localization, namespace, fallback, defaults2, registered]);
  return { translate };
}
function getDefaultValue(defaults2, propertyKey) {
  const keys = propertyKey.split(".");
  let prop = defaults2;
  for (const key of keys) {
    if (!(key in prop)) {
      prop = void 0;
      break;
    }
    prop = prop[key];
  }
  if (typeof prop !== "string") {
    return void 0;
  }
  return prop;
}
function useTranslation$1() {
  const fallback = reactExports.useCallback((key) => {
    if (!UiCore$1.initialized) {
      return void 0;
    }
    return UiCore$1.translate(key);
  }, []);
  return usePackageTranslation({
    namespace: UiCore$1.localizationNamespace,
    fallback,
    defaults: defaults$1
  });
}
var DialogAlignment;
(function(DialogAlignment2) {
  DialogAlignment2["TopLeft"] = "top-left";
  DialogAlignment2["Top"] = "top";
  DialogAlignment2["TopRight"] = "top-right";
  DialogAlignment2["Left"] = "left";
  DialogAlignment2["Center"] = "center";
  DialogAlignment2["Right"] = "right";
  DialogAlignment2["BottomLeft"] = "bottom-left";
  DialogAlignment2["Bottom"] = "bottom";
  DialogAlignment2["BottomRight"] = "bottom-right";
})(DialogAlignment || (DialogAlignment = {}));
var Orientation$1;
(function(Orientation2) {
  Orientation2[Orientation2["Horizontal"] = 0] = "Horizontal";
  Orientation2[Orientation2["Vertical"] = 1] = "Vertical";
})(Orientation$1 || (Orientation$1 = {}));
var isObject_1;
var hasRequiredIsObject;
function requireIsObject() {
  if (hasRequiredIsObject) return isObject_1;
  hasRequiredIsObject = 1;
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  isObject_1 = isObject;
  return isObject_1;
}
var _freeGlobal;
var hasRequired_freeGlobal;
function require_freeGlobal() {
  if (hasRequired_freeGlobal) return _freeGlobal;
  hasRequired_freeGlobal = 1;
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  _freeGlobal = freeGlobal;
  return _freeGlobal;
}
var _root;
var hasRequired_root;
function require_root() {
  if (hasRequired_root) return _root;
  hasRequired_root = 1;
  var freeGlobal = require_freeGlobal();
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  _root = root;
  return _root;
}
var now_1;
var hasRequiredNow;
function requireNow() {
  if (hasRequiredNow) return now_1;
  hasRequiredNow = 1;
  var root = require_root();
  var now2 = function() {
    return root.Date.now();
  };
  now_1 = now2;
  return now_1;
}
var _trimmedEndIndex;
var hasRequired_trimmedEndIndex;
function require_trimmedEndIndex() {
  if (hasRequired_trimmedEndIndex) return _trimmedEndIndex;
  hasRequired_trimmedEndIndex = 1;
  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {
    }
    return index;
  }
  _trimmedEndIndex = trimmedEndIndex;
  return _trimmedEndIndex;
}
var _baseTrim;
var hasRequired_baseTrim;
function require_baseTrim() {
  if (hasRequired_baseTrim) return _baseTrim;
  hasRequired_baseTrim = 1;
  var trimmedEndIndex = require_trimmedEndIndex();
  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
  }
  _baseTrim = baseTrim;
  return _baseTrim;
}
var _Symbol;
var hasRequired_Symbol;
function require_Symbol() {
  if (hasRequired_Symbol) return _Symbol;
  hasRequired_Symbol = 1;
  var root = require_root();
  var Symbol2 = root.Symbol;
  _Symbol = Symbol2;
  return _Symbol;
}
var _getRawTag;
var hasRequired_getRawTag;
function require_getRawTag() {
  if (hasRequired_getRawTag) return _getRawTag;
  hasRequired_getRawTag = 1;
  var Symbol2 = require_Symbol();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  _getRawTag = getRawTag;
  return _getRawTag;
}
var _objectToString;
var hasRequired_objectToString;
function require_objectToString() {
  if (hasRequired_objectToString) return _objectToString;
  hasRequired_objectToString = 1;
  var objectProto = Object.prototype;
  var nativeObjectToString = objectProto.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  _objectToString = objectToString;
  return _objectToString;
}
var _baseGetTag;
var hasRequired_baseGetTag;
function require_baseGetTag() {
  if (hasRequired_baseGetTag) return _baseGetTag;
  hasRequired_baseGetTag = 1;
  var Symbol2 = require_Symbol(), getRawTag = require_getRawTag(), objectToString = require_objectToString();
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  _baseGetTag = baseGetTag;
  return _baseGetTag;
}
var isObjectLike_1;
var hasRequiredIsObjectLike;
function requireIsObjectLike() {
  if (hasRequiredIsObjectLike) return isObjectLike_1;
  hasRequiredIsObjectLike = 1;
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  isObjectLike_1 = isObjectLike;
  return isObjectLike_1;
}
var isSymbol_1;
var hasRequiredIsSymbol;
function requireIsSymbol() {
  if (hasRequiredIsSymbol) return isSymbol_1;
  hasRequiredIsSymbol = 1;
  var baseGetTag = require_baseGetTag(), isObjectLike = requireIsObjectLike();
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  isSymbol_1 = isSymbol;
  return isSymbol_1;
}
var toNumber_1;
var hasRequiredToNumber;
function requireToNumber() {
  if (hasRequiredToNumber) return toNumber_1;
  hasRequiredToNumber = 1;
  var baseTrim = require_baseTrim(), isObject = requireIsObject(), isSymbol = requireIsSymbol();
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  toNumber_1 = toNumber;
  return toNumber_1;
}
var debounce_1;
var hasRequiredDebounce;
function requireDebounce() {
  if (hasRequiredDebounce) return debounce_1;
  hasRequiredDebounce = 1;
  var isObject = requireIsObject(), now2 = requireNow(), toNumber = requireToNumber();
  var FUNC_ERROR_TEXT = "Expected a function";
  var nativeMax = Math.max, nativeMin = Math.min;
  function debounce2(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time2) {
      var args = lastArgs, thisArg = lastThis;
      lastArgs = lastThis = void 0;
      lastInvokeTime = time2;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time2) {
      lastInvokeTime = time2;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time2) : result;
    }
    function remainingWait(time2) {
      var timeSinceLastCall = time2 - lastCallTime, timeSinceLastInvoke = time2 - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time2) {
      var timeSinceLastCall = time2 - lastCallTime, timeSinceLastInvoke = time2 - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time2 = now2();
      if (shouldInvoke(time2)) {
        return trailingEdge(time2);
      }
      timerId = setTimeout(timerExpired, remainingWait(time2));
    }
    function trailingEdge(time2) {
      timerId = void 0;
      if (trailing && lastArgs) {
        return invokeFunc(time2);
      }
      lastArgs = lastThis = void 0;
      return result;
    }
    function cancel() {
      if (timerId !== void 0) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush() {
      return timerId === void 0 ? result : trailingEdge(now2());
    }
    function debounced() {
      var time2 = now2(), isInvoking = shouldInvoke(time2);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time2;
      if (isInvoking) {
        if (timerId === void 0) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === void 0) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  debounce_1 = debounce2;
  return debounce_1;
}
var throttle_1;
var hasRequiredThrottle;
function requireThrottle() {
  if (hasRequiredThrottle) return throttle_1;
  hasRequiredThrottle = 1;
  var debounce2 = requireDebounce(), isObject = requireIsObject();
  var FUNC_ERROR_TEXT = "Expected a function";
  function throttle2(func, wait, options) {
    var leading = true, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    if (isObject(options)) {
      leading = "leading" in options ? !!options.leading : leading;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    return debounce2(func, wait, {
      "leading": leading,
      "maxWait": wait,
      "trailing": trailing
    });
  }
  throttle_1 = throttle2;
  return throttle_1;
}
var throttleExports = requireThrottle();
const throttle = /* @__PURE__ */ getDefaultExportFromCjs(throttleExports);
const defaultOptions = {
  leading: false,
  trailing: true
};
function useThrottledFn(functionToThrottle, waitTime, dependencies, options = defaultOptions) {
  const throttledFunction = throttle(functionToThrottle, waitTime, options);
  return reactExports.useCallback(throttledFunction, dependencies);
}
function getCurrentGlobalPosition(orientation, e) {
  return orientation === Orientation$1.Horizontal ? e.clientX : e.clientY;
}
const useConditionalCleanup = (condition, cleanup) => {
  const conditionRef = reactExports.useRef(condition);
  const cleanupRef = reactExports.useRef(cleanup);
  conditionRef.current = condition;
  cleanupRef.current = cleanup;
  reactExports.useEffect(() => {
    return () => {
      if (conditionRef.current)
        cleanupRef.current();
    };
  }, []);
};
const useElementSeparatorPointerHandler = ({ onResizeHandleDragChanged, onResizeHandleHoverChanged, isResizeHandleBeingDragged, isResizeHandleHovered, movableArea, ratio, orientation, onRatioChanged }) => {
  const globalPosition = reactExports.useRef(0);
  const pointerOutOfBounds = reactExports.useRef(false);
  const [isElementDragged, setIsDragged] = reactExports.useState(false);
  const [isElementHovered, setIsHovered] = reactExports.useState(false);
  const isGroupDragged = isResizeHandleBeingDragged ?? isElementDragged;
  const isGroupHovered = isResizeHandleHovered ?? isElementHovered;
  useConditionalCleanup(isElementDragged && !!onResizeHandleDragChanged, () => onResizeHandleDragChanged(false));
  useConditionalCleanup(isElementHovered && !!onResizeHandleHoverChanged, () => onResizeHandleHoverChanged(false));
  if (isGroupHovered && pointerOutOfBounds.current)
    pointerOutOfBounds.current = false;
  const stopDrag = reactExports.useCallback(() => {
    if (isGroupDragged) {
      setIsDragged(false);
      if (onResizeHandleDragChanged)
        onResizeHandleDragChanged(false);
    }
  }, [isGroupDragged, onResizeHandleDragChanged]);
  const startDrag = reactExports.useCallback((e) => {
    globalPosition.current = getCurrentGlobalPosition(orientation, e);
    if (!isGroupDragged) {
      setIsDragged(true);
      if (onResizeHandleDragChanged)
        onResizeHandleDragChanged(true);
    }
  }, [isGroupDragged, orientation, onResizeHandleDragChanged]);
  const onPointerUp = reactExports.useCallback(() => {
    stopDrag();
  }, [stopDrag]);
  const onThrottledPointerMove = useThrottledFn((e) => {
    if (!movableArea) {
      stopDrag();
      return;
    }
    const currentPosition = getCurrentGlobalPosition(orientation, e);
    const positionChange = currentPosition - globalPosition.current;
    if (Math.abs(positionChange) < 1)
      return;
    const currentLocalPosition = movableArea * ratio + positionChange;
    const newRatio = currentLocalPosition / movableArea;
    globalPosition.current = currentPosition;
    if (pointerOutOfBounds.current || !onRatioChanged)
      return;
    const result = onRatioChanged(newRatio);
    if (result && result.ratio === ratio && !isGroupHovered && !pointerOutOfBounds.current)
      pointerOutOfBounds.current = true;
  }, 16, [stopDrag, isGroupHovered, ratio, movableArea, onRatioChanged, orientation]);
  reactExports.useEffect(() => {
    return () => onThrottledPointerMove.cancel();
  }, [onThrottledPointerMove]);
  reactExports.useLayoutEffect(() => {
    if (isElementDragged) {
      document.addEventListener("pointerup", onPointerUp);
      document.addEventListener("pointermove", onThrottledPointerMove);
    }
    return () => {
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointermove", onThrottledPointerMove);
    };
  }, [isElementDragged, onPointerUp, onThrottledPointerMove]);
  const onPointerDown = reactExports.useCallback((e) => {
    if (!isGroupDragged) {
      startDrag(e);
    } else {
      stopDrag();
    }
  }, [isGroupDragged, startDrag, stopDrag]);
  const onPointerOver = reactExports.useCallback(() => {
    if (isGroupHovered)
      return;
    setIsHovered(true);
    if (onResizeHandleHoverChanged)
      onResizeHandleHoverChanged(true);
  }, [isGroupHovered, onResizeHandleHoverChanged]);
  const onPointerOut = reactExports.useCallback(() => {
    if (!isGroupHovered)
      return;
    setIsHovered(false);
    if (onResizeHandleHoverChanged)
      onResizeHandleHoverChanged(false);
  }, [isGroupHovered, onResizeHandleHoverChanged]);
  return {
    isHovered: isGroupHovered,
    isDragged: isGroupDragged,
    onPointerDown,
    onPointerOver,
    onPointerOut
  };
};
function getStyle$1(orientation, separatorSize) {
  separatorSize = separatorSize || 30;
  if (orientation === Orientation$1.Horizontal)
    return {
      width: separatorSize,
      margin: `0px ${-Math.floor(separatorSize / 2)}px`
    };
  return {
    height: separatorSize,
    margin: `${-Math.floor(separatorSize / 2)}px 1px`
  };
}
const ElementSeparator = (props) => {
  const { translate } = useTranslation$1();
  const [hasHoverHappened, setHasHoverHappened] = reactExports.useState(false);
  const { isDragged, isHovered, onPointerDown, onPointerOver, onPointerOut } = useElementSeparatorPointerHandler(props);
  const isHoverNeeded = isHovered || isDragged;
  if (!hasHoverHappened && isHoverNeeded)
    setHasHoverHappened(isHoverNeeded);
  const unhoverClass = hasHoverHappened ? "core-element-separator-group-unhovered" : "";
  const classNames = classnames("core-element-separator", props.orientation === Orientation$1.Horizontal ? "core-element-separator--horizontal" : "core-element-separator--vertical", props.className, isHoverNeeded ? "core-element-separator-group-hovered" : unhoverClass);
  const orientation = props.orientation;
  const separatorSize = props.separatorSize;
  const style = reactExports.useMemo(() => getStyle$1(orientation, separatorSize), [orientation, separatorSize]);
  const styles = {
    ...style,
    ...props.style
  };
  return reactExports.createElement("button", { style: styles, className: classNames, onPointerDown, onPointerOver, onPointerOut, "aria-label": translate("elementSeparator.label"), tabIndex: -1 });
};
var HorizontalAlignment;
(function(HorizontalAlignment2) {
  HorizontalAlignment2["Left"] = "left";
  HorizontalAlignment2["Center"] = "center";
  HorizontalAlignment2["Right"] = "right";
  HorizontalAlignment2["Justify"] = "justify";
})(HorizontalAlignment || (HorizontalAlignment = {}));
var VerticalAlignment;
(function(VerticalAlignment2) {
  VerticalAlignment2[VerticalAlignment2["Top"] = 1] = "Top";
  VerticalAlignment2[VerticalAlignment2["Middle"] = 2] = "Middle";
  VerticalAlignment2[VerticalAlignment2["Bottom"] = 3] = "Bottom";
})(VerticalAlignment || (VerticalAlignment = {}));
var CheckBoxState$1;
(function(CheckBoxState2) {
  CheckBoxState2[CheckBoxState2["Off"] = 0] = "Off";
  CheckBoxState2[CheckBoxState2["On"] = 1] = "On";
  CheckBoxState2[CheckBoxState2["Partial"] = 2] = "Partial";
})(CheckBoxState$1 || (CheckBoxState$1 = {}));
var SortDirection;
(function(SortDirection2) {
  SortDirection2[SortDirection2["NoSort"] = 0] = "NoSort";
  SortDirection2[SortDirection2["Ascending"] = 1] = "Ascending";
  SortDirection2[SortDirection2["Descending"] = 2] = "Descending";
})(SortDirection || (SortDirection = {}));
var TimeFormat$1;
(function(TimeFormat2) {
  TimeFormat2[TimeFormat2["None"] = 0] = "None";
  TimeFormat2[TimeFormat2["Short"] = 1] = "Short";
  TimeFormat2[TimeFormat2["Long"] = 2] = "Long";
})(TimeFormat$1 || (TimeFormat$1 = {}));
function WebFontIcon(props) {
  const className = classnames(props.iconClassName || "bui-webfont-icon", props.iconName, props.iconSize ? `uicore-icons-${props.iconSize}` : void 0, props.className);
  return reactExports.createElement("span", { className, title: props.title, style: props.style, onClick: props.onClick, role: "presentation" });
}
var Autosuggest = {};
var propTypes = { exports: {} };
var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;
function requireReactPropTypesSecret() {
  if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
  hasRequiredReactPropTypesSecret = 1;
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  ReactPropTypesSecret_1 = ReactPropTypesSecret;
  return ReactPropTypesSecret_1;
}
var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;
function requireFactoryWithThrowingShims() {
  if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
  hasRequiredFactoryWithThrowingShims = 1;
  var ReactPropTypesSecret = /* @__PURE__ */ requireReactPropTypesSecret();
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location2, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        return;
      }
      var err = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      err.name = "Invariant Violation";
      throw err;
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    var ReactPropTypes = {
      array: shim,
      bigint: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  return factoryWithThrowingShims;
}
var hasRequiredPropTypes;
function requirePropTypes() {
  if (hasRequiredPropTypes) return propTypes.exports;
  hasRequiredPropTypes = 1;
  {
    propTypes.exports = /* @__PURE__ */ requireFactoryWithThrowingShims()();
  }
  return propTypes.exports;
}
var arrays;
var hasRequiredArrays;
function requireArrays() {
  if (hasRequiredArrays) return arrays;
  hasRequiredArrays = 1;
  function shallowEqualArrays(arrA, arrB) {
    if (arrA === arrB) {
      return true;
    }
    if (!arrA || !arrB) {
      return false;
    }
    var len = arrA.length;
    if (arrB.length !== len) {
      return false;
    }
    for (var i = 0; i < len; i++) {
      if (arrA[i] !== arrB[i]) {
        return false;
      }
    }
    return true;
  }
  arrays = shallowEqualArrays;
  return arrays;
}
var Autowhatever = {};
var dist$2;
var hasRequiredDist$2;
function requireDist$2() {
  if (hasRequiredDist$2) return dist$2;
  hasRequiredDist$2 = 1;
  var _slicedToArray = /* @__PURE__ */ (function() {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    return function(arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();
  dist$2 = function(_ref) {
    var data = _ref.data;
    var multiSection = _ref.multiSection;
    function nextNonEmptySectionIndex(sectionIndex) {
      if (sectionIndex === null) {
        sectionIndex = 0;
      } else {
        sectionIndex++;
      }
      while (sectionIndex < data.length && data[sectionIndex] === 0) {
        sectionIndex++;
      }
      return sectionIndex === data.length ? null : sectionIndex;
    }
    function prevNonEmptySectionIndex(sectionIndex) {
      if (sectionIndex === null) {
        sectionIndex = data.length - 1;
      } else {
        sectionIndex--;
      }
      while (sectionIndex >= 0 && data[sectionIndex] === 0) {
        sectionIndex--;
      }
      return sectionIndex === -1 ? null : sectionIndex;
    }
    function next(position) {
      var _position = _slicedToArray(position, 2);
      var sectionIndex = _position[0];
      var itemIndex = _position[1];
      if (multiSection) {
        if (itemIndex === null || itemIndex === data[sectionIndex] - 1) {
          sectionIndex = nextNonEmptySectionIndex(sectionIndex);
          if (sectionIndex === null) {
            return [null, null];
          }
          return [sectionIndex, 0];
        }
        return [sectionIndex, itemIndex + 1];
      }
      if (data === 0 || itemIndex === data - 1) {
        return [null, null];
      }
      if (itemIndex === null) {
        return [null, 0];
      }
      return [null, itemIndex + 1];
    }
    function prev(position) {
      var _position2 = _slicedToArray(position, 2);
      var sectionIndex = _position2[0];
      var itemIndex = _position2[1];
      if (multiSection) {
        if (itemIndex === null || itemIndex === 0) {
          sectionIndex = prevNonEmptySectionIndex(sectionIndex);
          if (sectionIndex === null) {
            return [null, null];
          }
          return [sectionIndex, data[sectionIndex] - 1];
        }
        return [sectionIndex, itemIndex - 1];
      }
      if (data === 0 || itemIndex === 0) {
        return [null, null];
      }
      if (itemIndex === null) {
        return [null, data - 1];
      }
      return [null, itemIndex - 1];
    }
    function isLast(position) {
      return next(position)[1] === null;
    }
    return {
      next,
      prev,
      isLast
    };
  };
  return dist$2;
}
var dist$1 = { exports: {} };
var objectAssign;
var hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign) return objectAssign;
  hasRequiredObjectAssign = 1;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function ToObject(val) {
    if (val == null) {
      throw new TypeError("Object.assign cannot be called with null or undefined");
    }
    return Object(val);
  }
  function ownEnumerableKeys(obj) {
    var keys = Object.getOwnPropertyNames(obj);
    if (Object.getOwnPropertySymbols) {
      keys = keys.concat(Object.getOwnPropertySymbols(obj));
    }
    return keys.filter(function(key) {
      return propIsEnumerable.call(obj, key);
    });
  }
  objectAssign = Object.assign || function(target, source) {
    var from2;
    var keys;
    var to = ToObject(target);
    for (var s = 1; s < arguments.length; s++) {
      from2 = arguments[s];
      keys = ownEnumerableKeys(Object(from2));
      for (var i = 0; i < keys.length; i++) {
        to[keys[i]] = from2[keys[i]];
      }
    }
    return to;
  };
  return objectAssign;
}
var hasRequiredDist$1;
function requireDist$1() {
  if (hasRequiredDist$1) return dist$1.exports;
  hasRequiredDist$1 = 1;
  (function(module, exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    var _slicedToArray = /* @__PURE__ */ (function() {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    })();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      } else {
        return Array.from(arr);
      }
    }
    var _objectAssign = requireObjectAssign();
    var _objectAssign2 = _interopRequireDefault(_objectAssign);
    var truthy = function truthy2(x) {
      return x;
    };
    exports$1["default"] = function(input) {
      var _ref = Array.isArray(input) && input.length === 2 ? input : [input, null];
      var _ref2 = _slicedToArray(_ref, 2);
      var theme2 = _ref2[0];
      var classNameDecorator = _ref2[1];
      return function(key) {
        for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          names[_key - 1] = arguments[_key];
        }
        var styles = names.map(function(name) {
          return theme2[name];
        }).filter(truthy);
        return typeof styles[0] === "string" || typeof classNameDecorator === "function" ? { key, className: classNameDecorator ? classNameDecorator.apply(void 0, _toConsumableArray(styles)) : styles.join(" ") } : { key, style: _objectAssign2["default"].apply(void 0, [{}].concat(_toConsumableArray(styles))) };
      };
    };
    module.exports = exports$1["default"];
  })(dist$1, dist$1.exports);
  return dist$1.exports;
}
var SectionTitle = {};
var compareObjects = {};
var hasRequiredCompareObjects;
function requireCompareObjects() {
  if (hasRequiredCompareObjects) return compareObjects;
  hasRequiredCompareObjects = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    exports$1["default"] = compareObjects2;
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function compareObjects2(objA, objB) {
      var keys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (objA === objB) {
        return false;
      }
      var aKeys = Object.keys(objA);
      var bKeys = Object.keys(objB);
      if (aKeys.length !== bKeys.length) {
        return true;
      }
      var keysMap = {};
      var i, len;
      for (i = 0, len = keys.length; i < len; i++) {
        keysMap[keys[i]] = true;
      }
      for (i = 0, len = aKeys.length; i < len; i++) {
        var key = aKeys[i];
        var aValue = objA[key];
        var bValue = objB[key];
        if (aValue === bValue) {
          continue;
        }
        if (!keysMap[key] || aValue === null || bValue === null || _typeof(aValue) !== "object" || _typeof(bValue) !== "object") {
          return true;
        }
        var aValueKeys = Object.keys(aValue);
        var bValueKeys = Object.keys(bValue);
        if (aValueKeys.length !== bValueKeys.length) {
          return true;
        }
        for (var n = 0, length = aValueKeys.length; n < length; n++) {
          var aValueKey = aValueKeys[n];
          if (aValue[aValueKey] !== bValue[aValueKey]) {
            return true;
          }
        }
      }
      return false;
    }
  })(compareObjects);
  return compareObjects;
}
var hasRequiredSectionTitle;
function requireSectionTitle() {
  if (hasRequiredSectionTitle) return SectionTitle;
  hasRequiredSectionTitle = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    exports$1["default"] = void 0;
    var _react = _interopRequireWildcard(requireReact());
    var _propTypes = _interopRequireDefault(/* @__PURE__ */ requirePropTypes());
    var _compareObjects = _interopRequireDefault(requireCompareObjects());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache2 = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache2;
      };
      return cache2;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache();
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
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
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      return Constructor;
    }
    function _createSuper(Derived) {
      return function() {
        var Super = _getPrototypeOf(Derived), result;
        if (_isNativeReflectConstruct()) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self2);
    }
    function _assertThisInitialized2(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass) _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SectionTitle2 = /* @__PURE__ */ (function(_Component) {
      _inherits(SectionTitle3, _Component);
      var _super = _createSuper(SectionTitle3);
      function SectionTitle3() {
        _classCallCheck(this, SectionTitle3);
        return _super.apply(this, arguments);
      }
      _createClass(SectionTitle3, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
          return (0, _compareObjects["default"])(nextProps, this.props);
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props, section = _this$props.section, renderSectionTitle = _this$props.renderSectionTitle, theme2 = _this$props.theme, sectionKeyPrefix = _this$props.sectionKeyPrefix;
          var sectionTitle = renderSectionTitle(section);
          if (!sectionTitle) {
            return null;
          }
          return /* @__PURE__ */ _react["default"].createElement("div", theme2("".concat(sectionKeyPrefix, "title"), "sectionTitle"), sectionTitle);
        }
      }]);
      return SectionTitle3;
    })(_react.Component);
    exports$1["default"] = SectionTitle2;
    _defineProperty2(SectionTitle2, "propTypes", {
      section: _propTypes["default"].any.isRequired,
      renderSectionTitle: _propTypes["default"].func.isRequired,
      theme: _propTypes["default"].func.isRequired,
      sectionKeyPrefix: _propTypes["default"].string.isRequired
    });
  })(SectionTitle);
  return SectionTitle;
}
var ItemList = {};
var Item = {};
var hasRequiredItem;
function requireItem() {
  if (hasRequiredItem) return Item;
  hasRequiredItem = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    exports$1["default"] = void 0;
    var _react = _interopRequireWildcard(requireReact());
    var _propTypes = _interopRequireDefault(/* @__PURE__ */ requirePropTypes());
    var _compareObjects = _interopRequireDefault(requireCompareObjects());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache2 = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache2;
      };
      return cache2;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache();
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _extends2() {
      _extends2 = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends2.apply(this, arguments);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose2(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose2(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
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
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      return Constructor;
    }
    function _createSuper(Derived) {
      return function() {
        var Super = _getPrototypeOf(Derived), result;
        if (_isNativeReflectConstruct()) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self2);
    }
    function _assertThisInitialized2(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass) _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var Item2 = /* @__PURE__ */ (function(_Component) {
      _inherits(Item3, _Component);
      var _super = _createSuper(Item3);
      function Item3() {
        var _this;
        _classCallCheck(this, Item3);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "storeItemReference", function(item) {
          if (item !== null) {
            _this.item = item;
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "onMouseEnter", function(event) {
          var _this$props = _this.props, sectionIndex = _this$props.sectionIndex, itemIndex = _this$props.itemIndex;
          _this.props.onMouseEnter(event, {
            sectionIndex,
            itemIndex
          });
        });
        _defineProperty2(_assertThisInitialized2(_this), "onMouseLeave", function(event) {
          var _this$props2 = _this.props, sectionIndex = _this$props2.sectionIndex, itemIndex = _this$props2.itemIndex;
          _this.props.onMouseLeave(event, {
            sectionIndex,
            itemIndex
          });
        });
        _defineProperty2(_assertThisInitialized2(_this), "onMouseDown", function(event) {
          var _this$props3 = _this.props, sectionIndex = _this$props3.sectionIndex, itemIndex = _this$props3.itemIndex;
          _this.props.onMouseDown(event, {
            sectionIndex,
            itemIndex
          });
        });
        _defineProperty2(_assertThisInitialized2(_this), "onClick", function(event) {
          var _this$props4 = _this.props, sectionIndex = _this$props4.sectionIndex, itemIndex = _this$props4.itemIndex;
          _this.props.onClick(event, {
            sectionIndex,
            itemIndex
          });
        });
        return _this;
      }
      _createClass(Item3, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
          return (0, _compareObjects["default"])(nextProps, this.props, ["renderItemData"]);
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props5 = this.props, isHighlighted = _this$props5.isHighlighted, item = _this$props5.item, renderItem = _this$props5.renderItem, renderItemData = _this$props5.renderItemData, restProps = _objectWithoutProperties(_this$props5, ["isHighlighted", "item", "renderItem", "renderItemData"]);
          delete restProps.sectionIndex;
          delete restProps.itemIndex;
          if (typeof restProps.onMouseEnter === "function") {
            restProps.onMouseEnter = this.onMouseEnter;
          }
          if (typeof restProps.onMouseLeave === "function") {
            restProps.onMouseLeave = this.onMouseLeave;
          }
          if (typeof restProps.onMouseDown === "function") {
            restProps.onMouseDown = this.onMouseDown;
          }
          if (typeof restProps.onClick === "function") {
            restProps.onClick = this.onClick;
          }
          return /* @__PURE__ */ _react["default"].createElement("li", _extends2({
            role: "option"
          }, restProps, {
            ref: this.storeItemReference
          }), renderItem(item, _objectSpread({
            isHighlighted
          }, renderItemData)));
        }
      }]);
      return Item3;
    })(_react.Component);
    exports$1["default"] = Item2;
    _defineProperty2(Item2, "propTypes", {
      sectionIndex: _propTypes["default"].number,
      isHighlighted: _propTypes["default"].bool.isRequired,
      itemIndex: _propTypes["default"].number.isRequired,
      item: _propTypes["default"].any.isRequired,
      renderItem: _propTypes["default"].func.isRequired,
      renderItemData: _propTypes["default"].object.isRequired,
      onMouseEnter: _propTypes["default"].func,
      onMouseLeave: _propTypes["default"].func,
      onMouseDown: _propTypes["default"].func,
      onClick: _propTypes["default"].func
    });
  })(Item);
  return Item;
}
var hasRequiredItemList;
function requireItemList() {
  if (hasRequiredItemList) return ItemList;
  hasRequiredItemList = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    exports$1["default"] = void 0;
    var _react = _interopRequireWildcard(requireReact());
    var _propTypes = _interopRequireDefault(/* @__PURE__ */ requirePropTypes());
    var _Item = _interopRequireDefault(requireItem());
    var _compareObjects = _interopRequireDefault(requireCompareObjects());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache2 = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache2;
      };
      return cache2;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache();
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _extends2() {
      _extends2 = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends2.apply(this, arguments);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
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
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      return Constructor;
    }
    function _createSuper(Derived) {
      return function() {
        var Super = _getPrototypeOf(Derived), result;
        if (_isNativeReflectConstruct()) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self2);
    }
    function _assertThisInitialized2(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass) _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var ItemsList = /* @__PURE__ */ (function(_Component) {
      _inherits(ItemsList2, _Component);
      var _super = _createSuper(ItemsList2);
      function ItemsList2() {
        var _this;
        _classCallCheck(this, ItemsList2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty2(_assertThisInitialized2(_this), "storeHighlightedItemReference", function(highlightedItem) {
          _this.props.onHighlightedItemChange(highlightedItem === null ? null : highlightedItem.item);
        });
        return _this;
      }
      _createClass(ItemsList2, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
          return (0, _compareObjects["default"])(nextProps, this.props, ["itemProps"]);
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;
          var _this$props = this.props, items = _this$props.items, itemProps = _this$props.itemProps, renderItem = _this$props.renderItem, renderItemData = _this$props.renderItemData, sectionIndex = _this$props.sectionIndex, highlightedItemIndex = _this$props.highlightedItemIndex, getItemId = _this$props.getItemId, theme2 = _this$props.theme, keyPrefix = _this$props.keyPrefix;
          var sectionPrefix = sectionIndex === null ? keyPrefix : "".concat(keyPrefix, "section-").concat(sectionIndex, "-");
          var isItemPropsFunction = typeof itemProps === "function";
          return /* @__PURE__ */ _react["default"].createElement("ul", _extends2({
            role: "listbox"
          }, theme2("".concat(sectionPrefix, "items-list"), "itemsList")), items.map(function(item, itemIndex) {
            var isFirst = itemIndex === 0;
            var isHighlighted = itemIndex === highlightedItemIndex;
            var itemKey = "".concat(sectionPrefix, "item-").concat(itemIndex);
            var itemPropsObj = isItemPropsFunction ? itemProps({
              sectionIndex,
              itemIndex
            }) : itemProps;
            var allItemProps = _objectSpread({
              id: getItemId(sectionIndex, itemIndex),
              "aria-selected": isHighlighted
            }, theme2(itemKey, "item", isFirst && "itemFirst", isHighlighted && "itemHighlighted"), {}, itemPropsObj);
            if (isHighlighted) {
              allItemProps.ref = _this2.storeHighlightedItemReference;
            }
            return /* @__PURE__ */ _react["default"].createElement(_Item["default"], _extends2({}, allItemProps, {
              sectionIndex,
              isHighlighted,
              itemIndex,
              item,
              renderItem,
              renderItemData
            }));
          }));
        }
      }]);
      return ItemsList2;
    })(_react.Component);
    exports$1["default"] = ItemsList;
    _defineProperty2(ItemsList, "propTypes", {
      items: _propTypes["default"].array.isRequired,
      itemProps: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
      renderItem: _propTypes["default"].func.isRequired,
      renderItemData: _propTypes["default"].object.isRequired,
      sectionIndex: _propTypes["default"].number,
      highlightedItemIndex: _propTypes["default"].number,
      onHighlightedItemChange: _propTypes["default"].func.isRequired,
      getItemId: _propTypes["default"].func.isRequired,
      theme: _propTypes["default"].func.isRequired,
      keyPrefix: _propTypes["default"].string.isRequired
    });
    _defineProperty2(ItemsList, "defaultProps", {
      sectionIndex: null
    });
  })(ItemList);
  return ItemList;
}
var hasRequiredAutowhatever;
function requireAutowhatever() {
  if (hasRequiredAutowhatever) return Autowhatever;
  hasRequiredAutowhatever = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    exports$1["default"] = void 0;
    var _react = _interopRequireWildcard(requireReact());
    var _propTypes = _interopRequireDefault(/* @__PURE__ */ requirePropTypes());
    var _sectionIterator = _interopRequireDefault(requireDist$2());
    var _reactThemeable = _interopRequireDefault(requireDist$1());
    var _SectionTitle = _interopRequireDefault(requireSectionTitle());
    var _ItemList = _interopRequireDefault(requireItemList());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache2 = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache2;
      };
      return cache2;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache();
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
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
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      return Constructor;
    }
    function _createSuper(Derived) {
      return function() {
        var Super = _getPrototypeOf(Derived), result;
        if (_isNativeReflectConstruct()) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self2);
    }
    function _assertThisInitialized2(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass) _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var emptyObject = {};
    var defaultRenderInputComponent = function defaultRenderInputComponent2(props) {
      return /* @__PURE__ */ _react["default"].createElement("input", props);
    };
    var defaultRenderItemsContainer = function defaultRenderItemsContainer2(_ref) {
      var containerProps = _ref.containerProps, children = _ref.children;
      return /* @__PURE__ */ _react["default"].createElement("div", containerProps, children);
    };
    var defaultTheme = {
      container: "react-autowhatever__container",
      containerOpen: "react-autowhatever__container--open",
      input: "react-autowhatever__input",
      inputOpen: "react-autowhatever__input--open",
      inputFocused: "react-autowhatever__input--focused",
      itemsContainer: "react-autowhatever__items-container",
      itemsContainerOpen: "react-autowhatever__items-container--open",
      itemsList: "react-autowhatever__items-list",
      item: "react-autowhatever__item",
      itemFirst: "react-autowhatever__item--first",
      itemHighlighted: "react-autowhatever__item--highlighted",
      sectionContainer: "react-autowhatever__section-container",
      sectionContainerFirst: "react-autowhatever__section-container--first",
      sectionTitle: "react-autowhatever__section-title"
    };
    var Autowhatever2 = /* @__PURE__ */ (function(_Component) {
      _inherits(Autowhatever3, _Component);
      var _super = _createSuper(Autowhatever3);
      function Autowhatever3(props) {
        var _this;
        _classCallCheck(this, Autowhatever3);
        _this = _super.call(this, props);
        _defineProperty2(_assertThisInitialized2(_this), "storeInputReference", function(input) {
          if (input !== null) {
            _this.input = input;
          }
          var userRef = _this.props.inputProps.ref;
          if (userRef) {
            if (typeof userRef === "function") {
              userRef(input);
            } else if (_typeof(userRef) === "object" && Object.prototype.hasOwnProperty.call(userRef, "current")) {
              userRef.current = input;
            }
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "storeItemsContainerReference", function(itemsContainer) {
          if (itemsContainer !== null) {
            _this.itemsContainer = itemsContainer;
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "onHighlightedItemChange", function(highlightedItem) {
          _this.highlightedItem = highlightedItem;
        });
        _defineProperty2(_assertThisInitialized2(_this), "getItemId", function(sectionIndex, itemIndex) {
          if (itemIndex === null) {
            return null;
          }
          var id = _this.props.id;
          var section = sectionIndex === null ? "" : "section-".concat(sectionIndex);
          return "react-autowhatever-".concat(id, "-").concat(section, "-item-").concat(itemIndex);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onFocus", function(event) {
          var inputProps = _this.props.inputProps;
          _this.setState({
            isInputFocused: true
          });
          inputProps.onFocus && inputProps.onFocus(event);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onBlur", function(event) {
          var inputProps = _this.props.inputProps;
          _this.setState({
            isInputFocused: false
          });
          inputProps.onBlur && inputProps.onBlur(event);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onKeyDown", function(event) {
          var _this$props = _this.props, inputProps = _this$props.inputProps, highlightedSectionIndex = _this$props.highlightedSectionIndex, highlightedItemIndex = _this$props.highlightedItemIndex;
          var keyCode = event.keyCode;
          switch (keyCode) {
            case 40:
            // ArrowDown
            case 38: {
              var nextPrev = keyCode === 40 ? "next" : "prev";
              var _this$sectionIterator = _this.sectionIterator[nextPrev]([highlightedSectionIndex, highlightedItemIndex]), _this$sectionIterator2 = _slicedToArray(_this$sectionIterator, 2), newHighlightedSectionIndex = _this$sectionIterator2[0], newHighlightedItemIndex = _this$sectionIterator2[1];
              inputProps.onKeyDown(event, {
                newHighlightedSectionIndex,
                newHighlightedItemIndex
              });
              break;
            }
            default:
              inputProps.onKeyDown(event, {
                highlightedSectionIndex,
                highlightedItemIndex
              });
          }
        });
        _this.highlightedItem = null;
        _this.state = {
          isInputFocused: false
        };
        _this.setSectionsItems(props);
        _this.setSectionIterator(props);
        _this.setTheme(props);
        return _this;
      }
      _createClass(Autowhatever3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.ensureHighlightedItemIsVisible();
        }
        // eslint-disable-next-line camelcase, react/sort-comp
      }, {
        key: "UNSAFE_componentWillReceiveProps",
        value: function UNSAFE_componentWillReceiveProps(nextProps) {
          if (nextProps.items !== this.props.items) {
            this.setSectionsItems(nextProps);
          }
          if (nextProps.items !== this.props.items || nextProps.multiSection !== this.props.multiSection) {
            this.setSectionIterator(nextProps);
          }
          if (nextProps.theme !== this.props.theme) {
            this.setTheme(nextProps);
          }
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          this.ensureHighlightedItemIsVisible();
        }
      }, {
        key: "setSectionsItems",
        value: function setSectionsItems(props) {
          if (props.multiSection) {
            this.sectionsItems = props.items.map(function(section) {
              return props.getSectionItems(section);
            });
            this.sectionsLengths = this.sectionsItems.map(function(items) {
              return items.length;
            });
            this.allSectionsAreEmpty = this.sectionsLengths.every(function(itemsCount) {
              return itemsCount === 0;
            });
          }
        }
      }, {
        key: "setSectionIterator",
        value: function setSectionIterator(props) {
          this.sectionIterator = (0, _sectionIterator["default"])({
            multiSection: props.multiSection,
            data: props.multiSection ? this.sectionsLengths : props.items.length
          });
        }
      }, {
        key: "setTheme",
        value: function setTheme(props) {
          this.theme = (0, _reactThemeable["default"])(props.theme);
        }
      }, {
        key: "renderSections",
        value: function renderSections() {
          var _this2 = this;
          if (this.allSectionsAreEmpty) {
            return null;
          }
          var theme2 = this.theme;
          var _this$props2 = this.props, id = _this$props2.id, items = _this$props2.items, renderItem = _this$props2.renderItem, renderItemData = _this$props2.renderItemData, renderSectionTitle = _this$props2.renderSectionTitle, highlightedSectionIndex = _this$props2.highlightedSectionIndex, highlightedItemIndex = _this$props2.highlightedItemIndex, itemProps = _this$props2.itemProps;
          return items.map(function(section, sectionIndex) {
            var keyPrefix = "react-autowhatever-".concat(id, "-");
            var sectionKeyPrefix = "".concat(keyPrefix, "section-").concat(sectionIndex, "-");
            var isFirstSection = sectionIndex === 0;
            return /* @__PURE__ */ _react["default"].createElement("div", theme2("".concat(sectionKeyPrefix, "container"), "sectionContainer", isFirstSection && "sectionContainerFirst"), /* @__PURE__ */ _react["default"].createElement(_SectionTitle["default"], {
              section,
              renderSectionTitle,
              theme: theme2,
              sectionKeyPrefix
            }), /* @__PURE__ */ _react["default"].createElement(_ItemList["default"], {
              items: _this2.sectionsItems[sectionIndex],
              itemProps,
              renderItem,
              renderItemData,
              sectionIndex,
              highlightedItemIndex: highlightedSectionIndex === sectionIndex ? highlightedItemIndex : null,
              onHighlightedItemChange: _this2.onHighlightedItemChange,
              getItemId: _this2.getItemId,
              theme: theme2,
              keyPrefix,
              ref: _this2.storeItemsListReference
            }));
          });
        }
      }, {
        key: "renderItems",
        value: function renderItems() {
          var items = this.props.items;
          if (items.length === 0) {
            return null;
          }
          var theme2 = this.theme;
          var _this$props3 = this.props, id = _this$props3.id, renderItem = _this$props3.renderItem, renderItemData = _this$props3.renderItemData, highlightedSectionIndex = _this$props3.highlightedSectionIndex, highlightedItemIndex = _this$props3.highlightedItemIndex, itemProps = _this$props3.itemProps;
          return /* @__PURE__ */ _react["default"].createElement(_ItemList["default"], {
            items,
            itemProps,
            renderItem,
            renderItemData,
            highlightedItemIndex: highlightedSectionIndex === null ? highlightedItemIndex : null,
            onHighlightedItemChange: this.onHighlightedItemChange,
            getItemId: this.getItemId,
            theme: theme2,
            keyPrefix: "react-autowhatever-".concat(id, "-")
          });
        }
      }, {
        key: "ensureHighlightedItemIsVisible",
        value: function ensureHighlightedItemIsVisible() {
          var highlightedItem = this.highlightedItem;
          if (!highlightedItem) {
            return;
          }
          var itemsContainer = this.itemsContainer;
          var itemOffsetRelativeToContainer = highlightedItem.offsetParent === itemsContainer ? highlightedItem.offsetTop : highlightedItem.offsetTop - itemsContainer.offsetTop;
          var scrollTop = itemsContainer.scrollTop;
          if (itemOffsetRelativeToContainer < scrollTop) {
            scrollTop = itemOffsetRelativeToContainer;
          } else if (itemOffsetRelativeToContainer + highlightedItem.offsetHeight > scrollTop + itemsContainer.offsetHeight) {
            scrollTop = itemOffsetRelativeToContainer + highlightedItem.offsetHeight - itemsContainer.offsetHeight;
          }
          if (scrollTop !== itemsContainer.scrollTop) {
            itemsContainer.scrollTop = scrollTop;
          }
        }
      }, {
        key: "render",
        value: function render() {
          var theme2 = this.theme;
          var _this$props4 = this.props, id = _this$props4.id, multiSection = _this$props4.multiSection, renderInputComponent = _this$props4.renderInputComponent, renderItemsContainer = _this$props4.renderItemsContainer, highlightedSectionIndex = _this$props4.highlightedSectionIndex, highlightedItemIndex = _this$props4.highlightedItemIndex;
          var isInputFocused = this.state.isInputFocused;
          var renderedItems = multiSection ? this.renderSections() : this.renderItems();
          var isOpen = renderedItems !== null;
          var ariaActivedescendant = this.getItemId(highlightedSectionIndex, highlightedItemIndex);
          var itemsContainerId = "react-autowhatever-".concat(id);
          var containerProps = _objectSpread({
            role: "combobox",
            "aria-haspopup": "listbox",
            "aria-owns": itemsContainerId,
            "aria-expanded": isOpen
          }, theme2("react-autowhatever-".concat(id, "-container"), "container", isOpen && "containerOpen"), {}, this.props.containerProps);
          var inputComponent = renderInputComponent(_objectSpread({
            type: "text",
            value: "",
            autoComplete: "off",
            "aria-autocomplete": "list",
            "aria-controls": itemsContainerId,
            "aria-activedescendant": ariaActivedescendant
          }, theme2("react-autowhatever-".concat(id, "-input"), "input", isOpen && "inputOpen", isInputFocused && "inputFocused"), {}, this.props.inputProps, {
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown,
            ref: this.storeInputReference
          }));
          var itemsContainer = renderItemsContainer({
            containerProps: _objectSpread({
              id: itemsContainerId,
              role: "listbox"
            }, theme2("react-autowhatever-".concat(id, "-items-container"), "itemsContainer", isOpen && "itemsContainerOpen"), {
              ref: this.storeItemsContainerReference
            }),
            children: renderedItems
          });
          return /* @__PURE__ */ _react["default"].createElement("div", containerProps, inputComponent, itemsContainer);
        }
      }]);
      return Autowhatever3;
    })(_react.Component);
    exports$1["default"] = Autowhatever2;
    _defineProperty2(Autowhatever2, "propTypes", {
      id: _propTypes["default"].string,
      // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
      multiSection: _propTypes["default"].bool,
      // Indicates whether a multi section layout should be rendered.
      renderInputComponent: _propTypes["default"].func,
      // When specified, it is used to render the input element.
      renderItemsContainer: _propTypes["default"].func,
      // Renders the items container.
      items: _propTypes["default"].array.isRequired,
      // Array of items or sections to render.
      renderItem: _propTypes["default"].func,
      // This function renders a single item.
      renderItemData: _propTypes["default"].object,
      // Arbitrary data that will be passed to renderItem()
      renderSectionTitle: _propTypes["default"].func,
      // This function gets a section and renders its title.
      getSectionItems: _propTypes["default"].func,
      // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
      containerProps: _propTypes["default"].object,
      // Arbitrary container props
      inputProps: _propTypes["default"].object,
      // Arbitrary input props
      itemProps: _propTypes["default"].oneOfType([
        // Arbitrary item props
        _propTypes["default"].object,
        _propTypes["default"].func
      ]),
      highlightedSectionIndex: _propTypes["default"].number,
      // Section index of the highlighted item
      highlightedItemIndex: _propTypes["default"].number,
      // Highlighted item index (within a section)
      theme: _propTypes["default"].oneOfType([
        // Styles. See: https://github.com/markdalgleish/react-themeable
        _propTypes["default"].object,
        _propTypes["default"].array
      ])
    });
    _defineProperty2(Autowhatever2, "defaultProps", {
      id: "1",
      multiSection: false,
      renderInputComponent: defaultRenderInputComponent,
      renderItemsContainer: defaultRenderItemsContainer,
      renderItem: function renderItem() {
        throw new Error("`renderItem` must be provided");
      },
      renderItemData: emptyObject,
      renderSectionTitle: function renderSectionTitle() {
        throw new Error("`renderSectionTitle` must be provided");
      },
      getSectionItems: function getSectionItems() {
        throw new Error("`getSectionItems` must be provided");
      },
      containerProps: emptyObject,
      inputProps: emptyObject,
      itemProps: emptyObject,
      highlightedSectionIndex: null,
      highlightedItemIndex: null,
      theme: defaultTheme
    });
  })(Autowhatever);
  return Autowhatever;
}
var theme = {};
var hasRequiredTheme;
function requireTheme() {
  if (hasRequiredTheme) return theme;
  hasRequiredTheme = 1;
  Object.defineProperty(theme, "__esModule", {
    value: true
  });
  theme.mapToAutowhateverTheme = theme.defaultTheme = void 0;
  var defaultTheme = {
    container: "react-autosuggest__container",
    containerOpen: "react-autosuggest__container--open",
    input: "react-autosuggest__input",
    inputOpen: "react-autosuggest__input--open",
    inputFocused: "react-autosuggest__input--focused",
    suggestionsContainer: "react-autosuggest__suggestions-container",
    suggestionsContainerOpen: "react-autosuggest__suggestions-container--open",
    suggestionsList: "react-autosuggest__suggestions-list",
    suggestion: "react-autosuggest__suggestion",
    suggestionFirst: "react-autosuggest__suggestion--first",
    suggestionHighlighted: "react-autosuggest__suggestion--highlighted",
    sectionContainer: "react-autosuggest__section-container",
    sectionContainerFirst: "react-autosuggest__section-container--first",
    sectionTitle: "react-autosuggest__section-title"
  };
  theme.defaultTheme = defaultTheme;
  var mapToAutowhateverTheme = function mapToAutowhateverTheme2(theme2) {
    var result = {};
    for (var key in theme2) {
      switch (key) {
        case "suggestionsContainer":
          result["itemsContainer"] = theme2[key];
          break;
        case "suggestionsContainerOpen":
          result["itemsContainerOpen"] = theme2[key];
          break;
        case "suggestion":
          result["item"] = theme2[key];
          break;
        case "suggestionFirst":
          result["itemFirst"] = theme2[key];
          break;
        case "suggestionHighlighted":
          result["itemHighlighted"] = theme2[key];
          break;
        case "suggestionsList":
          result["itemsList"] = theme2[key];
          break;
        default:
          result[key] = theme2[key];
      }
    }
    return result;
  };
  theme.mapToAutowhateverTheme = mapToAutowhateverTheme;
  return theme;
}
var hasRequiredAutosuggest;
function requireAutosuggest() {
  if (hasRequiredAutosuggest) return Autosuggest;
  hasRequiredAutosuggest = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", {
      value: true
    });
    exports$1["default"] = void 0;
    var _react = _interopRequireWildcard(requireReact());
    var _propTypes = _interopRequireDefault(/* @__PURE__ */ requirePropTypes());
    var _arrays = _interopRequireDefault(requireArrays());
    var _Autowhatever = _interopRequireDefault(requireAutowhatever());
    var _theme = requireTheme();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache2 = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache2;
      };
      return cache2;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache();
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty2(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
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
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      return Constructor;
    }
    function _createSuper(Derived) {
      return function() {
        var Super = _getPrototypeOf(Derived), result;
        if (_isNativeReflectConstruct()) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self2, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized2(self2);
    }
    function _assertThisInitialized2(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if (typeof Proxy === "function") return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass) _setPrototypeOf2(subClass, superClass);
    }
    function _setPrototypeOf2(o, p) {
      _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf2(o, p);
    }
    function _defineProperty2(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var alwaysTrue = function alwaysTrue2() {
      return true;
    };
    var defaultShouldRenderSuggestions = function defaultShouldRenderSuggestions2(value) {
      return value.trim().length > 0;
    };
    var defaultRenderSuggestionsContainer = function defaultRenderSuggestionsContainer2(_ref) {
      var containerProps = _ref.containerProps, children = _ref.children;
      return /* @__PURE__ */ _react["default"].createElement("div", containerProps, children);
    };
    var REASON_SUGGESTIONS_REVEALED = "suggestions-revealed";
    var REASON_SUGGESTIONS_UPDATED = "suggestions-updated";
    var REASON_SUGGESTION_SELECTED = "suggestion-selected";
    var REASON_INPUT_FOCUSED = "input-focused";
    var REASON_INPUT_CHANGED = "input-changed";
    var REASON_INPUT_BLURRED = "input-blurred";
    var REASON_ESCAPE_PRESSED = "escape-pressed";
    var Autosuggest2 = /* @__PURE__ */ (function(_Component) {
      _inherits(Autosuggest3, _Component);
      var _super = _createSuper(Autosuggest3);
      function Autosuggest3(_ref2) {
        var _this;
        var _alwaysRenderSuggestions = _ref2.alwaysRenderSuggestions;
        _classCallCheck(this, Autosuggest3);
        _this = _super.call(this);
        _defineProperty2(_assertThisInitialized2(_this), "onDocumentMouseDown", function(event) {
          _this.justClickedOnSuggestionsContainer = false;
          var node = event.detail && event.detail.target || // This is for testing only. Please show me a better way to emulate this.
          event.target;
          while (node !== null && node !== document) {
            if (node.getAttribute && node.getAttribute("data-suggestion-index") !== null) {
              return;
            }
            if (node === _this.suggestionsContainer) {
              _this.justClickedOnSuggestionsContainer = true;
              return;
            }
            node = node.parentNode;
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "storeAutowhateverRef", function(autowhatever) {
          if (autowhatever !== null) {
            _this.autowhatever = autowhatever;
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "onSuggestionMouseEnter", function(event, _ref3) {
          var sectionIndex = _ref3.sectionIndex, itemIndex = _ref3.itemIndex;
          _this.updateHighlightedSuggestion(sectionIndex, itemIndex);
          if (event.target === _this.pressedSuggestion) {
            _this.justSelectedSuggestion = true;
          }
          _this.justMouseEntered = true;
          setTimeout(function() {
            _this.justMouseEntered = false;
          });
        });
        _defineProperty2(_assertThisInitialized2(_this), "highlightFirstSuggestion", function() {
          _this.updateHighlightedSuggestion(_this.props.multiSection ? 0 : null, 0);
        });
        _defineProperty2(_assertThisInitialized2(_this), "onDocumentMouseUp", function() {
          if (_this.pressedSuggestion && !_this.justSelectedSuggestion) {
            _this.input.focus();
          }
          _this.pressedSuggestion = null;
        });
        _defineProperty2(_assertThisInitialized2(_this), "onSuggestionMouseDown", function(event) {
          if (!_this.justSelectedSuggestion) {
            _this.justSelectedSuggestion = true;
            _this.pressedSuggestion = event.target;
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "onSuggestionsClearRequested", function() {
          var onSuggestionsClearRequested = _this.props.onSuggestionsClearRequested;
          onSuggestionsClearRequested && onSuggestionsClearRequested();
        });
        _defineProperty2(_assertThisInitialized2(_this), "onSuggestionSelected", function(event, data) {
          var _this$props = _this.props, alwaysRenderSuggestions = _this$props.alwaysRenderSuggestions, onSuggestionSelected = _this$props.onSuggestionSelected, onSuggestionsFetchRequested = _this$props.onSuggestionsFetchRequested;
          onSuggestionSelected && onSuggestionSelected(event, data);
          var keepSuggestionsOnSelect = _this.props.shouldKeepSuggestionsOnSelect(data.suggestion);
          if (alwaysRenderSuggestions || keepSuggestionsOnSelect) {
            onSuggestionsFetchRequested({
              value: data.suggestionValue,
              reason: REASON_SUGGESTION_SELECTED
            });
          } else {
            _this.onSuggestionsClearRequested();
          }
          _this.resetHighlightedSuggestion();
        });
        _defineProperty2(_assertThisInitialized2(_this), "onSuggestionClick", function(event) {
          var _this$props2 = _this.props, alwaysRenderSuggestions = _this$props2.alwaysRenderSuggestions, focusInputOnSuggestionClick = _this$props2.focusInputOnSuggestionClick;
          var _this$getSuggestionIn = _this.getSuggestionIndices(_this.findSuggestionElement(event.target)), sectionIndex = _this$getSuggestionIn.sectionIndex, suggestionIndex = _this$getSuggestionIn.suggestionIndex;
          var clickedSuggestion = _this.getSuggestion(sectionIndex, suggestionIndex);
          var clickedSuggestionValue = _this.props.getSuggestionValue(clickedSuggestion);
          _this.maybeCallOnChange(event, clickedSuggestionValue, "click");
          _this.onSuggestionSelected(event, {
            suggestion: clickedSuggestion,
            suggestionValue: clickedSuggestionValue,
            suggestionIndex,
            sectionIndex,
            method: "click"
          });
          var keepSuggestionsOnSelect = _this.props.shouldKeepSuggestionsOnSelect(clickedSuggestion);
          if (!(alwaysRenderSuggestions || keepSuggestionsOnSelect)) {
            _this.closeSuggestions();
          }
          if (focusInputOnSuggestionClick === true) {
            _this.input.focus();
          } else {
            _this.onBlur();
          }
          setTimeout(function() {
            _this.justSelectedSuggestion = false;
          });
        });
        _defineProperty2(_assertThisInitialized2(_this), "onBlur", function() {
          var _this$props3 = _this.props, inputProps = _this$props3.inputProps, shouldRenderSuggestions = _this$props3.shouldRenderSuggestions;
          var value = inputProps.value, onBlur = inputProps.onBlur;
          var highlightedSuggestion = _this.getHighlightedSuggestion();
          var shouldRender = shouldRenderSuggestions(value, REASON_INPUT_BLURRED);
          _this.setState({
            isFocused: false,
            highlightedSectionIndex: null,
            highlightedSuggestionIndex: null,
            highlightedSuggestion: null,
            valueBeforeUpDown: null,
            isCollapsed: !shouldRender
          });
          onBlur && onBlur(_this.blurEvent, {
            highlightedSuggestion
          });
        });
        _defineProperty2(_assertThisInitialized2(_this), "onSuggestionMouseLeave", function(event) {
          _this.resetHighlightedSuggestion(false);
          if (_this.justSelectedSuggestion && event.target === _this.pressedSuggestion) {
            _this.justSelectedSuggestion = false;
          }
        });
        _defineProperty2(_assertThisInitialized2(_this), "onSuggestionTouchStart", function() {
          _this.justSelectedSuggestion = true;
        });
        _defineProperty2(_assertThisInitialized2(_this), "onSuggestionTouchMove", function() {
          _this.justSelectedSuggestion = false;
          _this.pressedSuggestion = null;
          _this.input.focus();
        });
        _defineProperty2(_assertThisInitialized2(_this), "itemProps", function(_ref4) {
          var sectionIndex = _ref4.sectionIndex, itemIndex = _ref4.itemIndex;
          return {
            "data-section-index": sectionIndex,
            "data-suggestion-index": itemIndex,
            onMouseEnter: _this.onSuggestionMouseEnter,
            onMouseLeave: _this.onSuggestionMouseLeave,
            onMouseDown: _this.onSuggestionMouseDown,
            onTouchStart: _this.onSuggestionTouchStart,
            onTouchMove: _this.onSuggestionTouchMove,
            onClick: _this.onSuggestionClick
          };
        });
        _defineProperty2(_assertThisInitialized2(_this), "renderSuggestionsContainer", function(_ref5) {
          var containerProps = _ref5.containerProps, children = _ref5.children;
          var renderSuggestionsContainer = _this.props.renderSuggestionsContainer;
          return renderSuggestionsContainer({
            containerProps,
            children,
            query: _this.getQuery()
          });
        });
        _this.state = {
          isFocused: false,
          isCollapsed: !_alwaysRenderSuggestions,
          highlightedSectionIndex: null,
          highlightedSuggestionIndex: null,
          highlightedSuggestion: null,
          valueBeforeUpDown: null
        };
        _this.justPressedUpDown = false;
        _this.justMouseEntered = false;
        _this.pressedSuggestion = null;
        return _this;
      }
      _createClass(Autosuggest3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          document.addEventListener("mousedown", this.onDocumentMouseDown);
          document.addEventListener("mouseup", this.onDocumentMouseUp);
          this.input = this.autowhatever.input;
          this.suggestionsContainer = this.autowhatever.itemsContainer;
        }
        // eslint-disable-next-line camelcase, react/sort-comp
      }, {
        key: "UNSAFE_componentWillReceiveProps",
        value: function UNSAFE_componentWillReceiveProps(nextProps) {
          var shouldResetHighlighting = this.state.highlightedSuggestionIndex === 0 && this.props.highlightFirstSuggestion && !nextProps.highlightFirstSuggestion;
          if ((0, _arrays["default"])(nextProps.suggestions, this.props.suggestions)) {
            if (nextProps.highlightFirstSuggestion && nextProps.suggestions.length > 0 && this.justPressedUpDown === false && this.justMouseEntered === false) {
              this.highlightFirstSuggestion();
            } else if (shouldResetHighlighting) {
              this.resetHighlightedSuggestion();
            }
          } else {
            if (this.willRenderSuggestions(nextProps, REASON_SUGGESTIONS_UPDATED)) {
              if (this.state.isCollapsed && !this.justSelectedSuggestion) {
                this.revealSuggestions();
              }
              if (shouldResetHighlighting) {
                this.resetHighlightedSuggestion();
              }
            } else {
              this.resetHighlightedSuggestion();
            }
          }
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
          var _this$props4 = this.props, suggestions = _this$props4.suggestions, onSuggestionHighlighted = _this$props4.onSuggestionHighlighted, highlightFirstSuggestion = _this$props4.highlightFirstSuggestion;
          if (!(0, _arrays["default"])(suggestions, prevProps.suggestions) && suggestions.length > 0 && highlightFirstSuggestion) {
            this.highlightFirstSuggestion();
            return;
          }
          if (onSuggestionHighlighted) {
            var highlightedSuggestion = this.getHighlightedSuggestion();
            var prevHighlightedSuggestion = prevState.highlightedSuggestion;
            if (highlightedSuggestion != prevHighlightedSuggestion) {
              onSuggestionHighlighted({
                suggestion: highlightedSuggestion
              });
            }
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          document.removeEventListener("mousedown", this.onDocumentMouseDown);
          document.removeEventListener("mouseup", this.onDocumentMouseUp);
        }
      }, {
        key: "updateHighlightedSuggestion",
        value: function updateHighlightedSuggestion(sectionIndex, suggestionIndex, prevValue) {
          var _this2 = this;
          this.setState(function(state) {
            var valueBeforeUpDown = state.valueBeforeUpDown;
            if (suggestionIndex === null) {
              valueBeforeUpDown = null;
            } else if (valueBeforeUpDown === null && typeof prevValue !== "undefined") {
              valueBeforeUpDown = prevValue;
            }
            return {
              highlightedSectionIndex: sectionIndex,
              highlightedSuggestionIndex: suggestionIndex,
              highlightedSuggestion: suggestionIndex === null ? null : _this2.getSuggestion(sectionIndex, suggestionIndex),
              valueBeforeUpDown
            };
          });
        }
      }, {
        key: "resetHighlightedSuggestion",
        value: function resetHighlightedSuggestion() {
          var shouldResetValueBeforeUpDown = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
          this.setState(function(state) {
            var valueBeforeUpDown = state.valueBeforeUpDown;
            return {
              highlightedSectionIndex: null,
              highlightedSuggestionIndex: null,
              highlightedSuggestion: null,
              valueBeforeUpDown: shouldResetValueBeforeUpDown ? null : valueBeforeUpDown
            };
          });
        }
      }, {
        key: "revealSuggestions",
        value: function revealSuggestions() {
          this.setState({
            isCollapsed: false
          });
        }
      }, {
        key: "closeSuggestions",
        value: function closeSuggestions() {
          this.setState({
            highlightedSectionIndex: null,
            highlightedSuggestionIndex: null,
            highlightedSuggestion: null,
            valueBeforeUpDown: null,
            isCollapsed: true
          });
        }
      }, {
        key: "getSuggestion",
        value: function getSuggestion(sectionIndex, suggestionIndex) {
          var _this$props5 = this.props, suggestions = _this$props5.suggestions, multiSection = _this$props5.multiSection, getSectionSuggestions = _this$props5.getSectionSuggestions;
          if (multiSection) {
            return getSectionSuggestions(suggestions[sectionIndex])[suggestionIndex];
          }
          return suggestions[suggestionIndex];
        }
      }, {
        key: "getHighlightedSuggestion",
        value: function getHighlightedSuggestion() {
          var _this$state = this.state, highlightedSectionIndex = _this$state.highlightedSectionIndex, highlightedSuggestionIndex = _this$state.highlightedSuggestionIndex;
          if (highlightedSuggestionIndex === null) {
            return null;
          }
          return this.getSuggestion(highlightedSectionIndex, highlightedSuggestionIndex);
        }
      }, {
        key: "getSuggestionValueByIndex",
        value: function getSuggestionValueByIndex(sectionIndex, suggestionIndex) {
          var getSuggestionValue = this.props.getSuggestionValue;
          return getSuggestionValue(this.getSuggestion(sectionIndex, suggestionIndex));
        }
      }, {
        key: "getSuggestionIndices",
        value: function getSuggestionIndices(suggestionElement) {
          var sectionIndex = suggestionElement.getAttribute("data-section-index");
          var suggestionIndex = suggestionElement.getAttribute("data-suggestion-index");
          return {
            sectionIndex: typeof sectionIndex === "string" ? parseInt(sectionIndex, 10) : null,
            suggestionIndex: parseInt(suggestionIndex, 10)
          };
        }
      }, {
        key: "findSuggestionElement",
        value: function findSuggestionElement(startNode) {
          var node = startNode;
          do {
            if (node.getAttribute && node.getAttribute("data-suggestion-index") !== null) {
              return node;
            }
            node = node.parentNode;
          } while (node !== null);
          console.error("Clicked element:", startNode);
          throw new Error("Couldn't find suggestion element");
        }
      }, {
        key: "maybeCallOnChange",
        value: function maybeCallOnChange(event, newValue, method) {
          var _this$props$inputProp = this.props.inputProps, value = _this$props$inputProp.value, onChange = _this$props$inputProp.onChange;
          if (newValue !== value) {
            onChange(event, {
              newValue,
              method
            });
          }
        }
      }, {
        key: "willRenderSuggestions",
        value: function willRenderSuggestions(props, reason) {
          var suggestions = props.suggestions, inputProps = props.inputProps, shouldRenderSuggestions = props.shouldRenderSuggestions;
          var value = inputProps.value;
          return suggestions.length > 0 && shouldRenderSuggestions(value, reason);
        }
      }, {
        key: "getQuery",
        value: function getQuery() {
          var inputProps = this.props.inputProps;
          var value = inputProps.value;
          var valueBeforeUpDown = this.state.valueBeforeUpDown;
          return (valueBeforeUpDown === null ? value : valueBeforeUpDown).trim();
        }
      }, {
        key: "render",
        value: function render() {
          var _this3 = this;
          var _this$props6 = this.props, suggestions = _this$props6.suggestions, renderInputComponent = _this$props6.renderInputComponent, onSuggestionsFetchRequested = _this$props6.onSuggestionsFetchRequested, renderSuggestion = _this$props6.renderSuggestion, inputProps = _this$props6.inputProps, multiSection = _this$props6.multiSection, renderSectionTitle = _this$props6.renderSectionTitle, id = _this$props6.id, getSectionSuggestions = _this$props6.getSectionSuggestions, theme2 = _this$props6.theme, getSuggestionValue = _this$props6.getSuggestionValue, alwaysRenderSuggestions = _this$props6.alwaysRenderSuggestions, highlightFirstSuggestion = _this$props6.highlightFirstSuggestion, containerProps = _this$props6.containerProps;
          var _this$state2 = this.state, isFocused = _this$state2.isFocused, isCollapsed = _this$state2.isCollapsed, highlightedSectionIndex = _this$state2.highlightedSectionIndex, highlightedSuggestionIndex = _this$state2.highlightedSuggestionIndex, valueBeforeUpDown = _this$state2.valueBeforeUpDown;
          var shouldRenderSuggestions = alwaysRenderSuggestions ? alwaysTrue : this.props.shouldRenderSuggestions;
          var value = inputProps.value, _onFocus = inputProps.onFocus, _onKeyDown = inputProps.onKeyDown;
          var willRenderSuggestions = this.willRenderSuggestions(this.props, "render");
          var isOpen = alwaysRenderSuggestions || isFocused && !isCollapsed && willRenderSuggestions;
          var items = isOpen ? suggestions : [];
          var autowhateverInputProps = _objectSpread({}, inputProps, {
            onFocus: function onFocus(event) {
              if (!_this3.justSelectedSuggestion && !_this3.justClickedOnSuggestionsContainer) {
                var shouldRender = shouldRenderSuggestions(value, REASON_INPUT_FOCUSED);
                _this3.setState({
                  isFocused: true,
                  isCollapsed: !shouldRender
                });
                _onFocus && _onFocus(event);
                if (shouldRender) {
                  onSuggestionsFetchRequested({
                    value,
                    reason: REASON_INPUT_FOCUSED
                  });
                }
              }
            },
            onBlur: function onBlur(event) {
              if (_this3.justClickedOnSuggestionsContainer) {
                _this3.input.focus();
                return;
              }
              _this3.blurEvent = event;
              if (!_this3.justSelectedSuggestion) {
                _this3.onBlur();
                _this3.onSuggestionsClearRequested();
              }
            },
            onChange: function onChange(event) {
              var value2 = event.target.value;
              var shouldRender = shouldRenderSuggestions(value2, REASON_INPUT_CHANGED);
              _this3.maybeCallOnChange(event, value2, "type");
              if (_this3.suggestionsContainer) {
                _this3.suggestionsContainer.scrollTop = 0;
              }
              _this3.setState(_objectSpread({}, highlightFirstSuggestion ? {} : {
                highlightedSectionIndex: null,
                highlightedSuggestionIndex: null,
                highlightedSuggestion: null
              }, {
                valueBeforeUpDown: null,
                isCollapsed: !shouldRender
              }));
              if (shouldRender) {
                onSuggestionsFetchRequested({
                  value: value2,
                  reason: REASON_INPUT_CHANGED
                });
              } else {
                _this3.onSuggestionsClearRequested();
              }
            },
            onKeyDown: function onKeyDown(event, data) {
              var keyCode = event.keyCode;
              switch (keyCode) {
                case 40:
                // ArrowDown
                case 38:
                  if (isCollapsed) {
                    if (shouldRenderSuggestions(value, REASON_SUGGESTIONS_REVEALED)) {
                      onSuggestionsFetchRequested({
                        value,
                        reason: REASON_SUGGESTIONS_REVEALED
                      });
                      _this3.revealSuggestions();
                      event.preventDefault();
                    }
                  } else if (suggestions.length > 0) {
                    var newHighlightedSectionIndex = data.newHighlightedSectionIndex, newHighlightedItemIndex = data.newHighlightedItemIndex;
                    var newValue;
                    if (newHighlightedItemIndex === null) {
                      newValue = valueBeforeUpDown === null ? value : valueBeforeUpDown;
                    } else {
                      newValue = _this3.getSuggestionValueByIndex(newHighlightedSectionIndex, newHighlightedItemIndex);
                    }
                    _this3.updateHighlightedSuggestion(newHighlightedSectionIndex, newHighlightedItemIndex, value);
                    _this3.maybeCallOnChange(event, newValue, keyCode === 40 ? "down" : "up");
                    event.preventDefault();
                  }
                  _this3.justPressedUpDown = true;
                  setTimeout(function() {
                    _this3.justPressedUpDown = false;
                  });
                  break;
                // Enter
                case 13: {
                  if (event.keyCode === 229) {
                    break;
                  }
                  var highlightedSuggestion = _this3.getHighlightedSuggestion();
                  if (isOpen && !alwaysRenderSuggestions) {
                    _this3.closeSuggestions();
                  }
                  if (highlightedSuggestion != null) {
                    event.preventDefault();
                    var _newValue = getSuggestionValue(highlightedSuggestion);
                    _this3.maybeCallOnChange(event, _newValue, "enter");
                    _this3.onSuggestionSelected(event, {
                      suggestion: highlightedSuggestion,
                      suggestionValue: _newValue,
                      suggestionIndex: highlightedSuggestionIndex,
                      sectionIndex: highlightedSectionIndex,
                      method: "enter"
                    });
                    _this3.justSelectedSuggestion = true;
                    setTimeout(function() {
                      _this3.justSelectedSuggestion = false;
                    });
                  }
                  break;
                }
                // Escape
                case 27: {
                  if (isOpen) {
                    event.preventDefault();
                  }
                  var willCloseSuggestions = isOpen && !alwaysRenderSuggestions;
                  if (valueBeforeUpDown === null) {
                    if (!willCloseSuggestions) {
                      var _newValue2 = "";
                      _this3.maybeCallOnChange(event, _newValue2, "escape");
                      if (shouldRenderSuggestions(_newValue2, REASON_ESCAPE_PRESSED)) {
                        onSuggestionsFetchRequested({
                          value: _newValue2,
                          reason: REASON_ESCAPE_PRESSED
                        });
                      } else {
                        _this3.onSuggestionsClearRequested();
                      }
                    }
                  } else {
                    _this3.maybeCallOnChange(event, valueBeforeUpDown, "escape");
                  }
                  if (willCloseSuggestions) {
                    _this3.onSuggestionsClearRequested();
                    _this3.closeSuggestions();
                  } else {
                    _this3.resetHighlightedSuggestion();
                  }
                  break;
                }
              }
              _onKeyDown && _onKeyDown(event);
            }
          });
          var renderSuggestionData = {
            query: this.getQuery()
          };
          return /* @__PURE__ */ _react["default"].createElement(_Autowhatever["default"], {
            multiSection,
            items,
            renderInputComponent,
            renderItemsContainer: this.renderSuggestionsContainer,
            renderItem: renderSuggestion,
            renderItemData: renderSuggestionData,
            renderSectionTitle,
            getSectionItems: getSectionSuggestions,
            highlightedSectionIndex,
            highlightedItemIndex: highlightedSuggestionIndex,
            containerProps,
            inputProps: autowhateverInputProps,
            itemProps: this.itemProps,
            theme: (0, _theme.mapToAutowhateverTheme)(theme2),
            id,
            ref: this.storeAutowhateverRef
          });
        }
      }]);
      return Autosuggest3;
    })(_react.Component);
    exports$1["default"] = Autosuggest2;
    _defineProperty2(Autosuggest2, "propTypes", {
      suggestions: _propTypes["default"].array.isRequired,
      onSuggestionsFetchRequested: function onSuggestionsFetchRequested(props, propName) {
        var onSuggestionsFetchRequested2 = props[propName];
        if (typeof onSuggestionsFetchRequested2 !== "function") {
          throw new Error("'onSuggestionsFetchRequested' must be implemented. See: https://github.com/moroshko/react-autosuggest#onSuggestionsFetchRequestedProp");
        }
      },
      onSuggestionsClearRequested: function onSuggestionsClearRequested(props, propName) {
        var onSuggestionsClearRequested2 = props[propName];
        if (props.alwaysRenderSuggestions === false && typeof onSuggestionsClearRequested2 !== "function") {
          throw new Error("'onSuggestionsClearRequested' must be implemented. See: https://github.com/moroshko/react-autosuggest#onSuggestionsClearRequestedProp");
        }
      },
      shouldKeepSuggestionsOnSelect: _propTypes["default"].func,
      onSuggestionSelected: _propTypes["default"].func,
      onSuggestionHighlighted: _propTypes["default"].func,
      renderInputComponent: _propTypes["default"].func,
      renderSuggestionsContainer: _propTypes["default"].func,
      getSuggestionValue: _propTypes["default"].func.isRequired,
      renderSuggestion: _propTypes["default"].func.isRequired,
      inputProps: function inputProps(props, propName) {
        var inputProps2 = props[propName];
        if (!inputProps2) {
          throw new Error("'inputProps' must be passed.");
        }
        if (!Object.prototype.hasOwnProperty.call(inputProps2, "value")) {
          throw new Error("'inputProps' must have 'value'.");
        }
        if (!Object.prototype.hasOwnProperty.call(inputProps2, "onChange")) {
          throw new Error("'inputProps' must have 'onChange'.");
        }
      },
      shouldRenderSuggestions: _propTypes["default"].func,
      alwaysRenderSuggestions: _propTypes["default"].bool,
      multiSection: _propTypes["default"].bool,
      renderSectionTitle: function renderSectionTitle(props, propName) {
        var renderSectionTitle2 = props[propName];
        if (props.multiSection === true && typeof renderSectionTitle2 !== "function") {
          throw new Error("'renderSectionTitle' must be implemented. See: https://github.com/moroshko/react-autosuggest#renderSectionTitleProp");
        }
      },
      getSectionSuggestions: function getSectionSuggestions(props, propName) {
        var getSectionSuggestions2 = props[propName];
        if (props.multiSection === true && typeof getSectionSuggestions2 !== "function") {
          throw new Error("'getSectionSuggestions' must be implemented. See: https://github.com/moroshko/react-autosuggest#getSectionSuggestionsProp");
        }
      },
      focusInputOnSuggestionClick: _propTypes["default"].bool,
      highlightFirstSuggestion: _propTypes["default"].bool,
      theme: _propTypes["default"].object,
      id: _propTypes["default"].string,
      containerProps: _propTypes["default"].object
      // Arbitrary container props
    });
    _defineProperty2(Autosuggest2, "defaultProps", {
      renderSuggestionsContainer: defaultRenderSuggestionsContainer,
      shouldRenderSuggestions: defaultShouldRenderSuggestions,
      alwaysRenderSuggestions: false,
      multiSection: false,
      shouldKeepSuggestionsOnSelect: function shouldKeepSuggestionsOnSelect() {
        return false;
      },
      focusInputOnSuggestionClick: true,
      highlightFirstSuggestion: false,
      theme: _theme.defaultTheme,
      id: "1",
      containerProps: {}
    });
  })(Autosuggest);
  return Autosuggest;
}
var dist;
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  dist = requireAutosuggest()["default"];
  return dist;
}
var distExports = requireDist();
const ReactAutosuggest = /* @__PURE__ */ getDefaultExportFromCjs(distExports);
class ImageCheckBox extends reactExports.PureComponent {
  _onChange = (e) => {
    if (e && e.stopPropagation)
      e.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick(e.target.checked);
    }
  };
  _onInputClick = (e) => {
    if (e && e.stopPropagation)
      e.stopPropagation();
  };
  _onLabelClick = (e) => {
    if (e && e.stopPropagation)
      e.stopPropagation();
  };
  render() {
    const checkBoxClass = classnames("core-image-checkbox", this.props.className);
    const imageClass = classnames("image", this.props.border && "image-checkbox-border");
    const iconSpec = this.props.checked ? this.props.imageOn : this.props.imageOff;
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      reactExports.createElement(
        "label",
        { className: checkBoxClass, style: this.props.style, onClick: this._onLabelClick, title: this.props.tooltip },
        reactExports.createElement("input", { type: "checkbox", id: this.props.id, className: this.props.inputClassName, style: this.props.inputStyle, checked: this.props.checked, disabled: this.props.disabled, onChange: this._onChange, onClick: this._onInputClick, ref: this.props.inputRef }),
        reactExports.createElement(
          "span",
          { className: imageClass },
          reactExports.createElement(Icon, { iconSpec })
        )
      )
    );
  }
}
var InputStatus;
(function(InputStatus2) {
  InputStatus2["Success"] = "success";
  InputStatus2["Warning"] = "warning";
  InputStatus2["Error"] = "error";
})(InputStatus || (InputStatus = {}));
({
  [InputStatus.Error]: reactExports.createElement(SvgStatusError, null),
  [InputStatus.Success]: reactExports.createElement(SvgStatusSuccess, null),
  [InputStatus.Warning]: reactExports.createElement(SvgStatusWarning, null)
});
function isRefCallback(ref) {
  return typeof ref === "function";
}
function useRefs(...refs) {
  return reactExports.useCallback(
    (instance) => {
      for (const ref of refs) {
        if (ref) {
          if (isRefCallback(ref)) {
            ref(instance);
          } else {
            ref.current = instance;
          }
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refs]
  );
}
const ForwardRefInput = reactExports.forwardRef(function ForwardRefInput2(props, ref) {
  const { className, style, setFocus, nativeKeyHandler, size: size2, ...otherProps } = props;
  const inputElementRef = reactExports.useRef(null);
  const refs = useRefs(inputElementRef, ref);
  reactExports.useEffect(() => {
    const currentElement = inputElementRef.current;
    const currentHandler = nativeKeyHandler;
    if (currentElement && currentHandler) {
      currentElement.addEventListener("keydown", currentHandler);
    }
    return () => {
      if (currentHandler && currentElement) {
        currentElement.removeEventListener("keydown", currentHandler);
      }
    };
  }, [nativeKeyHandler]);
  reactExports.useEffect(() => {
    if (inputElementRef.current && setFocus)
      inputElementRef.current.focus();
  }, [setFocus]);
  const handleFocus = reactExports.useCallback((event) => {
    event.currentTarget.select();
  }, []);
  return reactExports.createElement(Input$1, { ref: refs, type: "text", ...otherProps, onFocus: handleFocus, className: classnames("uicore-inputs-input", className), style });
});
const Input = ForwardRefInput;
const ForwardRefIconInput = reactExports.forwardRef(function ForwardRefIconInput2(props, ref) {
  const { className, icon, containerClassName, size: size2, ...otherProps } = props;
  return reactExports.createElement(
    "div",
    { className: classnames("core-iconInput-container", containerClassName) },
    reactExports.createElement(Input, { ref, className: classnames("core-input", className), ...otherProps }),
    reactExports.createElement("div", { className: "core-iconInput-icon" }, icon)
  );
});
const IconInput = ForwardRefIconInput;
const ForwardRefNumberInput = reactExports.forwardRef(function ForwardRefNumberInput2(props, ref) {
  const { containerClassName, className, value, min, max, precision, format, parse, onChange, onBlur, onKeyDown, step, snap, showTouchButtons, containerStyle, isControlled, ...otherProps } = props;
  const currentValueRef = reactExports.useRef(value);
  const parseInternal = reactExports.useCallback((x) => {
    let n;
    if (parse)
      n = parse(x);
    if (void 0 === n || null === n) {
      n = parseFloat(x);
      if (isNaN(n) || !isFinite(n)) {
        n = 0;
      }
    }
    const localPrecision = void 0 === precision ? 10 : precision;
    const q = Math.pow(10, localPrecision);
    const localMin = void 0 === min ? Number.MIN_SAFE_INTEGER : min;
    const localMax = void 0 === max ? Number.MAX_SAFE_INTEGER : max;
    n = Math.min(Math.max(n, localMin), localMax);
    n = Math.round(n * q) / q;
    return n;
  }, [parse, precision, min, max]);
  const formatInternal = reactExports.useCallback((num) => {
    const localPrecision = void 0 === precision || null === precision ? 0 : precision;
    const str = void 0 === num || null === num ? "" : num.toFixed(localPrecision);
    if (format)
      return format(num, str);
    return str;
  }, [format, precision]);
  const [formattedValue, setFormattedValue] = reactExports.useState(() => formatInternal(value));
  reactExports.useEffect(() => {
    currentValueRef.current = value;
    const currentFormattedValue = formatInternal(currentValueRef.current);
    setFormattedValue(currentFormattedValue);
  }, [formatInternal, value]);
  const handleChange = reactExports.useCallback((event) => {
    const newVal = event.currentTarget.value;
    setFormattedValue(newVal);
    isControlled && onChange && onChange(parseInternal(newVal), newVal);
  }, [isControlled, onChange, parseInternal]);
  const updateValue = reactExports.useCallback((newVal) => {
    const newFormattedVal = formatInternal(newVal);
    onChange && onChange(newVal, newFormattedVal);
    setFormattedValue(newFormattedVal);
  }, [onChange, formatInternal]);
  const updateValueFromString = reactExports.useCallback((strValue) => {
    const newVal = parseInternal(strValue);
    updateValue(newVal);
  }, [parseInternal, updateValue]);
  const handleBlur = reactExports.useCallback((event) => {
    const newVal = parseInternal(event.target.value);
    onBlur && onBlur(event);
    updateValue(newVal);
  }, [parseInternal, updateValue, onBlur]);
  const getIncrementValue = reactExports.useCallback((increment) => {
    if (typeof step === "function") {
      const stepVal = step(increment ? "up" : "down");
      return stepVal ? stepVal : 1;
    }
    return !step ? 1 : step;
  }, [step]);
  const applyStep = reactExports.useCallback((increment) => {
    const incrementValue = getIncrementValue(increment);
    let num = parseInternal(formattedValue) + (increment ? incrementValue : -incrementValue);
    if (snap) {
      num = Math.round(num / incrementValue) * incrementValue;
    }
    const localMin = void 0 === min ? Number.MIN_SAFE_INTEGER : min;
    const localMax = void 0 === max ? Number.MAX_SAFE_INTEGER : max;
    num = Math.min(Math.max(num, localMin), localMax);
    updateValue(num);
  }, [
    formattedValue,
    getIncrementValue,
    max,
    min,
    parseInternal,
    snap,
    updateValue
  ]);
  const handleKeyDown = reactExports.useCallback((event) => {
    if (event.key === Key_enumExports.Key.Enter.valueOf()) {
      updateValueFromString(event.currentTarget.value);
      event.preventDefault();
      event.stopPropagation();
    } else if (event.key === Key_enumExports.Key.Escape.valueOf()) {
      setFormattedValue(formatInternal(currentValueRef.current));
      event.preventDefault();
    } else if (event.key === Key_enumExports.Key.ArrowDown.valueOf()) {
      applyStep(false);
      event.preventDefault();
      event.stopPropagation();
    } else if (event.key === Key_enumExports.Key.ArrowUp.valueOf()) {
      applyStep(true);
      event.preventDefault();
      event.stopPropagation();
    }
    onKeyDown && onKeyDown(event);
  }, [applyStep, formatInternal, updateValueFromString, onKeyDown]);
  const handleDownClick = reactExports.useCallback((event) => {
    applyStep(false);
    event.preventDefault();
  }, [applyStep]);
  const handleUpClick = reactExports.useCallback((event) => {
    applyStep(true);
    event.preventDefault();
  }, [applyStep]);
  const handleFocus = reactExports.useCallback((event) => {
    event.currentTarget.select();
  }, []);
  const isDisabled = !!otherProps.disabled;
  const containerClasses = classnames("core-number-input-container", containerClassName, showTouchButtons && "core-number-buttons-for-touch", isDisabled && "core-number-input-disabled");
  const caretUp = showTouchButtons ? reactExports.createElement(SvgCaretUp, null) : reactExports.createElement(SvgCaretUpSmall, null);
  const caretDown = showTouchButtons ? reactExports.createElement(SvgCaretDown, null) : reactExports.createElement(SvgCaretDownSmall, null);
  return reactExports.createElement(
    "div",
    { className: containerClasses, style: containerStyle },
    reactExports.createElement(Input$1, { ref, value: formattedValue, onChange: handleChange, onKeyDown: handleKeyDown, onFocus: handleFocus, onBlur: handleBlur, size: "small", className: classnames("core-input", className), ...otherProps }),
    reactExports.createElement(
      "div",
      { className: classnames("core-number-input-buttons-container", showTouchButtons && "core-number-buttons-for-touch") },
      reactExports.createElement(
        "div",
        { className: "core-number-input-button core-number-input-button-up", tabIndex: -1, onClick: handleUpClick, role: "presentation" },
        reactExports.createElement(Icon, { iconSpec: caretUp })
      ),
      reactExports.createElement(
        "div",
        { className: "core-number-input-button core-number-input-button-down", tabIndex: -1, onClick: handleDownClick, role: "presentation" },
        reactExports.createElement(Icon, { iconSpec: caretDown })
      )
    )
  );
});
const NumberInput = ForwardRefNumberInput;
const ListboxContext = reactExports.createContext({
  onListboxValueChange: (_newValue) => {
  }
});
function makeId(...args) {
  return args.filter((val) => val != null).join("--");
}
function getOptionValueArray(childNodes) {
  return reactExports.Children.toArray(childNodes).filter((node) => reactExports.isValidElement(node) && !!node.props.value).map((optionNode) => optionNode.props);
}
function processKeyboardNavigation(optionValues, itemIndex, key) {
  let keyProcessed = false;
  let newIndex = itemIndex >= 0 ? itemIndex : 0;
  if (key === Key_enumExports.Key.ArrowDown.valueOf() || key === Key_enumExports.Key.PageDown.valueOf()) {
    for (let i = itemIndex + 1; i < optionValues.length; i++) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key_enumExports.Key.ArrowUp.valueOf() || key === Key_enumExports.Key.PageUp.valueOf()) {
    for (let i = itemIndex - 1; i >= 0; i--) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key_enumExports.Key.Home.valueOf()) {
    for (let i = 0; i < optionValues.length; i++) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key_enumExports.Key.End.valueOf()) {
    for (let i = optionValues.length - 1; i >= 0; i--) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  }
  return [newIndex, keyProcessed];
}
function Listbox(props) {
  const { ariaLabel, ariaLabelledBy, id, children, selectedValue, className, onListboxValueChange, onKeyDown, ...otherProps } = props;
  const listRef = reactExports.useRef(null);
  const [listId] = reactExports.useState(() => {
    return id ?? Guid.createValue();
  });
  const optionValues = reactExports.useMemo(() => getOptionValueArray(children), [children]);
  const classes = reactExports.useMemo(() => classnames("core-listbox", className), [className]);
  const [currentValue, setCurrentValue] = reactExports.useState(selectedValue);
  const [focusValue, setFocusValue] = reactExports.useState(currentValue);
  reactExports.useEffect(() => {
    setCurrentValue(selectedValue);
    setFocusValue(selectedValue);
  }, [selectedValue]);
  const scrollTopRef = reactExports.useRef(0);
  const handleValueChange = reactExports.useCallback((newValue, isControlOrCommandPressed) => {
    if (newValue !== currentValue) {
      setCurrentValue(newValue);
      setFocusValue(newValue);
      if (onListboxValueChange)
        onListboxValueChange(newValue, isControlOrCommandPressed);
    }
  }, [setCurrentValue, currentValue, onListboxValueChange]);
  const focusOption = reactExports.useCallback((itemIndex) => {
    if (itemIndex >= 0 && itemIndex < optionValues.length) {
      const newSelection = optionValues[itemIndex];
      const listElement = listRef.current;
      const optionToFocus = listElement.querySelector(`li[data-value="${newSelection.value}"]`);
      if (optionToFocus && listElement) {
        let newScrollTop = listElement.scrollTop;
        if (listElement.scrollHeight > listElement.clientHeight) {
          const scrollBottom = listElement.clientHeight + listElement.scrollTop;
          const elementBottom = optionToFocus.offsetTop + optionToFocus.offsetHeight;
          if (elementBottom > scrollBottom) {
            newScrollTop = elementBottom - listElement.clientHeight;
          } else if (optionToFocus.offsetTop < listElement.scrollTop) {
            newScrollTop = optionToFocus.offsetTop;
          }
          scrollTopRef.current = newScrollTop;
        }
        setFocusValue(newSelection.value);
      }
    }
  }, [optionValues]);
  const handleKeyDown = reactExports.useCallback((event) => {
    if (optionValues.length < 1)
      return;
    const itemIndex = void 0 === focusValue ? -1 : optionValues.findIndex((optionValue) => optionValue.value === focusValue);
    if (event.key === " ") {
      event.preventDefault();
      if (focusValue)
        handleValueChange(focusValue, event.getModifierState("Control") || event.getModifierState("Meta"));
      return;
    } else {
      const [newItemIndex, keyProcessed] = processKeyboardNavigation(optionValues, itemIndex, event.key);
      if (keyProcessed) {
        event.preventDefault();
        focusOption(newItemIndex);
        return;
      }
    }
    if (onKeyDown)
      onKeyDown(event);
  }, [focusValue, optionValues, focusOption, onKeyDown, handleValueChange]);
  const isInitialMount = reactExports.useRef(true);
  reactExports.useEffect(() => {
    const list = listRef.current;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (void 0 !== focusValue) {
        const itemIndex = optionValues.findIndex((optionValue) => optionValue.value === focusValue);
        focusOption(itemIndex);
      }
    } else {
      list.scrollTop = scrollTopRef.current;
    }
  }, [focusValue, focusOption, optionValues]);
  const handleOnScroll = reactExports.useCallback((_event) => {
    if (listRef.current)
      scrollTopRef.current = listRef.current.scrollTop;
  }, []);
  const handleOnFocus = reactExports.useCallback((_event) => {
    if (!focusValue || 0 === focusValue.length) {
      if (currentValue) {
        setFocusValue(currentValue);
      } else {
        if (optionValues.length > 0)
          setFocusValue(optionValues[0].value);
      }
    }
  }, [currentValue, focusValue, optionValues]);
  return reactExports.createElement(
    "ul",
    {
      className: classes,
      "aria-labelledby": ariaLabel ? void 0 : ariaLabelledBy,
      "aria-label": ariaLabel,
      // An element that contains or owns all the listbox options has role
      // listbox.
      // https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox
      role: "listbox",
      // https://www.w3.org/TR/wai-aria-practices-1.2/examples/listbox/listbox-collapsible.html
      tabIndex: 0,
      "aria-activedescendant": makeId(currentValue, listId),
      ...otherProps,
      ref: listRef,
      id: listId,
      onKeyDown: handleKeyDown,
      onScroll: handleOnScroll,
      "data-value": currentValue,
      "data-focusvalue": focusValue,
      onFocus: handleOnFocus
    },
    reactExports.createElement(ListboxContext.Provider, { value: {
      listboxValue: currentValue,
      focusValue,
      listboxId: listId,
      onListboxValueChange: handleValueChange,
      listboxRef: listRef
    } }, children)
  );
}
function ListboxItem(props) {
  const { children, value, className, disabled, ...otherProps } = props;
  const { listboxValue, focusValue, listboxId, onListboxValueChange } = reactExports.useContext(ListboxContext);
  const hasFocus = focusValue === value;
  const classes = reactExports.useMemo(() => classnames("core-listbox-item", hasFocus && "focused", className), [className, hasFocus]);
  const itemRef = reactExports.useRef(null);
  const isSelected = listboxValue === value;
  const handleClick = reactExports.useCallback((event) => {
    event.preventDefault();
    const selectedValue = event.currentTarget?.dataset?.value;
    if (void 0 !== selectedValue) {
      onListboxValueChange(selectedValue, event.ctrlKey);
    }
  }, [onListboxValueChange]);
  const getItemId = reactExports.useCallback(() => {
    return makeId(value, listboxId);
  }, [listboxId, value]);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    reactExports.createElement("li", {
      "aria-selected": isSelected,
      "aria-disabled": disabled || void 0,
      // Each option in the listbox has role `option` and is a DOM descendant
      // of the element with role `listbox`.
      // https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox
      role: "option",
      className: classes,
      ...otherProps,
      ref: itemRef,
      id: getItemId(),
      "data-value": value,
      onClick: handleClick
    }, children)
  );
}
class SearchBox extends reactExports.Component {
  _inputElement = null;
  _timeoutId = 0;
  state = {
    value: this.props.initialValue || ""
  };
  constructor(props) {
    super(props);
  }
  render() {
    const searchClassName = classnames("core-searchbox", this.props.className);
    const emptyString = this.state.value === "";
    const iconClassName = classnames("core-searchbox-icon", "icon");
    const iconSpec = emptyString ? reactExports.createElement(SvgSearch, null) : reactExports.createElement(SvgClose, null);
    return reactExports.createElement(
      "div",
      { className: searchClassName, style: this.props.style, "data-testid": "core-searchbox-instance" },
      reactExports.createElement(SearchBoxInput, { defaultValue: this.props.initialValue, ref: (el) => {
        this._inputElement = el;
      }, onChange: this._trackChange, onKeyDown: this._handleKeyDown, onPaste: this._trackChange, onCut: this._trackChange, placeholder: this.props.placeholder, role: "searchbox", "data-testid": "core-searchbox-input" }),
      reactExports.createElement(
        SearchBoxButton,
        { className: "core-searchbox-button", onClick: this._handleIconClick, role: "button", tabIndex: -1, emptyString },
        reactExports.createElement(
          "span",
          { className: iconClassName },
          reactExports.createElement(Icon, { iconSpec })
        )
      )
    );
  }
  /** Wrapper for onValueChanged to make sure we don't call search unless the new value is different from the previous value */
  _onValueChanged = (value, previousValue) => {
    if (value === previousValue)
      return;
    this.setState((_prevState) => {
      return {
        value
      };
    }, () => {
      this.props.onValueChanged(this.state.value);
    });
  };
  _trackChange = (_event) => {
    let value = "";
    const previousValue = this.state.value;
    if (this._inputElement)
      value = this._inputElement.value;
    if (this.props.valueChangedDelay) {
      this._unsetTimeout();
      this._timeoutId = window.setTimeout(() => {
        this._onValueChanged(value, previousValue);
      }, this.props.valueChangedDelay);
    } else {
      this._onValueChanged(value, previousValue);
    }
  };
  _handleKeyDown = (e) => {
    switch (e.key) {
      case Key_enumExports.Key.Escape.valueOf():
        if (this.props.onEscPressed)
          this.props.onEscPressed();
        break;
      case Key_enumExports.Key.Enter.valueOf():
        if (this.props.onEnterPressed)
          this.props.onEnterPressed();
        break;
    }
  };
  _handleIconClick = (_event) => {
    if (this._inputElement) {
      const clear = this.state.value !== "";
      this._inputElement.value = "";
      if (clear && this.props.onClear)
        this.props.onClear();
      this._inputElement.focus();
    }
    this._trackChange();
  };
  _unsetTimeout = () => {
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
      this._timeoutId = 0;
    }
  };
  componentWillUnmount() {
    this._unsetTimeout();
  }
  focus() {
    if (this._inputElement)
      this._inputElement.focus();
  }
}
const SearchBoxInput = reactExports.forwardRef(function SearchBoxInput2({ placeholder, ...props }, ref) {
  const { translate } = useTranslation$1();
  return reactExports.createElement(Input$1, { ref, placeholder: placeholder || translate("general.search"), ...props });
});
function SearchBoxButton({ emptyString, ...props }) {
  const { translate } = useTranslation$1();
  const buttonTitle = translate(emptyString ? "general.search" : "general.clear");
  return reactExports.createElement("div", { title: buttonTitle, ...props });
}
function ExpansionToggle(props) {
  const { translate } = useTranslation$1();
  const className = classnames("core-tree-expansionToggle", props.isExpanded && "is-expanded", props.className);
  const label = translate(props.isExpanded ? "tree.collapse" : "tree.expand");
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    reactExports.createElement(
      "div",
      { onMouseDown: (e) => e.stopPropagation(), onClick: props.onClick, className, style: props.style, "data-testid": props["data-testid"], role: "button", tabIndex: -1, "aria-label": label },
      reactExports.createElement(Icon, { className: "toggle icon", iconSpec: reactExports.createElement(SvgChevronRight, null) })
    )
  );
}
const LEVEL_OFFSET = 20;
const EXPANSION_TOGGLE_WIDTH = 24;
class TreeNode extends reactExports.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const className = classnames("core-tree-node", this.props.isFocused && "is-focused", this.props.isSelected && "is-selected", this.props.isHoverDisabled && "is-hover-disabled", this.props.className);
    let offset = this.props.level * LEVEL_OFFSET;
    if (!this.props.isLoading && this.props.isLeaf)
      offset += EXPANSION_TOGGLE_WIDTH;
    let checkbox;
    if (this.props.checkboxProps) {
      const props = {
        label: "",
        checked: this.props.checkboxProps.state === CheckBoxState$1.On,
        indeterminate: this.props.checkboxProps.state === CheckBoxState$1.Partial,
        disabled: this.props.checkboxProps.isDisabled,
        title: this.props.checkboxProps.tooltip,
        onClick: this._onCheckboxClick,
        onChange: this._onCheckboxChange
      };
      if (this.props.renderOverrides && this.props.renderOverrides.renderCheckbox) {
        checkbox = this.props.renderOverrides.renderCheckbox(props);
      } else {
        checkbox = reactExports.createElement(Checkbox, { ...props, onChange: (e) => this._onCheckboxChange(e.target.checked), "data-testid": this.createSubComponentTestId("checkbox") });
      }
    }
    const icon = this.props.icon ? reactExports.createElement("div", { className: "core-tree-node-icon" }, this.props.icon) : void 0;
    const toggle = this.props.isLoading ? void 0 : this.props.isLeaf ? reactExports.createElement("div", null) : reactExports.createElement(ExpansionToggle, { className: "expansion-toggle", "data-testid": this.createSubComponentTestId("expansion-toggle"), onClick: this._onClickExpansionToggle, isExpanded: this.props.isExpanded });
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      reactExports.createElement(
        "div",
        { className, style: this.props.style, "data-testid": this.props["data-testid"], onClick: this._onClick, onContextMenu: this.props.onContextMenu, onMouseDown: this.props.onMouseDown, onMouseUp: this.props.onMouseUp, onMouseMove: this.props.onMouseMove, role: "treeitem", "aria-selected": this.props.isSelected ? "true" : "false", tabIndex: -1 },
        reactExports.createElement(
          "div",
          { className: "contents", style: { marginLeft: offset }, "data-testid": this.createSubComponentTestId("contents") },
          this.props.isLoading && reactExports.createElement(ProgressRadial, { size: "x-small", indeterminate: true, className: "core-progress-indicator" }),
          toggle,
          checkbox,
          icon,
          this.props.label
        ),
        this.props.children
      )
    );
  }
  createSubComponentTestId(subId) {
    if (!this.props["data-testid"])
      return void 0;
    return `${this.props["data-testid"]}-${subId}`;
  }
  _onCheckboxChange = (checked) => {
    if (this.props.checkboxProps && this.props.checkboxProps.onClick && !this.props.checkboxProps.isDisabled)
      this.props.checkboxProps.onClick(checked ? CheckBoxState$1.On : CheckBoxState$1.Off);
  };
  _onCheckboxClick = (e) => {
    e.stopPropagation();
  };
  _onClickExpansionToggle = (e) => {
    e.stopPropagation();
    if (this.props.onClickExpansionToggle)
      this.props.onClickExpansionToggle();
  };
  _onClick = (e) => {
    e.stopPropagation();
    this.props.onClick?.(e);
  };
}
class Tree extends reactExports.PureComponent {
  _treeElement = reactExports.createRef();
  get _scrollableContainer() {
    if (!this._treeElement.current)
      return void 0;
    const isScrollable = (element) => {
      const style = window.getComputedStyle(element);
      return style.overflow === "auto" || style.overflow === "scroll" || style.overflowY === "auto" || style.overflowY === "scroll" || style.overflowX === "auto" || style.overflowX === "scroll";
    };
    let scrollableContainer = this._treeElement.current;
    while (scrollableContainer && !isScrollable(scrollableContainer))
      scrollableContainer = scrollableContainer.children.length > 0 ? scrollableContainer.children[0] : void 0;
    return scrollableContainer;
  }
  scrollToElement(element) {
    const container = this._scrollableContainer;
    if (!container)
      return;
    if (!Element.prototype.scrollTo) {
      element.scrollIntoView();
      return;
    }
    const elementBox = element.getBoundingClientRect();
    const elementRange = Rectangle.createXYXY(elementBox.left, elementBox.top, elementBox.right, elementBox.bottom);
    const containerBox = container.getBoundingClientRect();
    const containerRange = Rectangle.createXYXY(containerBox.left - container.scrollLeft, containerBox.top - container.scrollTop, containerBox.right - container.scrollLeft, containerBox.bottom - container.scrollTop);
    let left;
    if (container.scrollLeft > 0 && elementRange.right <= containerRange.right) {
      left = 0;
    } else if (containerRange.left <= elementRange.left && containerRange.right >= elementRange.right) {
      left = container.scrollLeft;
    } else {
      left = elementRange.left - containerRange.left;
    }
    let top;
    if (containerRange.top <= elementRange.top && containerRange.bottom >= elementRange.bottom) {
      top = container.scrollTop;
    } else {
      top = elementRange.top - containerRange.top;
    }
    container.scrollTo({ left, top });
  }
  getElementsByClassName(className) {
    if (!this._treeElement.current)
      return [];
    const elements = new Array();
    const collection = this._treeElement.current.getElementsByClassName(className);
    for (let i = 0; i < collection.length; ++i)
      elements.push(collection.item(i));
    return elements;
  }
  setFocusByClassName(selector) {
    let status = false;
    if (this._treeElement.current) {
      const element = this._treeElement.current.querySelector(selector);
      if (element && element.focus) {
        element.focus();
        status = true;
      }
    }
    return status;
  }
  render() {
    const className = classnames("core-tree", this.props.className);
    return reactExports.createElement("div", { ref: this._treeElement, className, style: this.props.style, onMouseDown: this.props.onMouseDown, onMouseMove: this.props.onMouseMove, onMouseUp: this.props.onMouseUp, onKeyDown: this.props.onKeyDown, onKeyUp: this.props.onKeyUp, role: "tree", tabIndex: -1 }, this.props.children);
  }
}
class TreeNodePlaceholder extends reactExports.PureComponent {
  render() {
    const className = classnames("core-tree-placeholder", this.props.className);
    const offset = this.props.level * LEVEL_OFFSET;
    const min = this.props.minWidth || 50;
    const max = this.props.maxWidth || 200;
    const width = Math.floor(min + Math.random() * (max - min));
    const style = { ...this.props.style, paddingLeft: `${offset}px` };
    return reactExports.createElement(
      "div",
      { className, style, "data-testid": this.props["data-testid"] },
      reactExports.createElement("div", { className: "contents", style: { width: `${width}px` } })
    );
  }
}
var UiStateStorageStatus;
(function(UiStateStorageStatus2) {
  UiStateStorageStatus2[UiStateStorageStatus2["Success"] = 0] = "Success";
  UiStateStorageStatus2[UiStateStorageStatus2["NotFound"] = 1] = "NotFound";
  UiStateStorageStatus2[UiStateStorageStatus2["UnknownError"] = 2] = "UnknownError";
  UiStateStorageStatus2[UiStateStorageStatus2["Uninitialized"] = 3] = "Uninitialized";
  UiStateStorageStatus2[UiStateStorageStatus2["AuthorizationError"] = 4] = "AuthorizationError";
})(UiStateStorageStatus || (UiStateStorageStatus = {}));
async function reuseOrCreatePromise(id, createPromise, cache2) {
  let getPromise = cache2.get(id);
  if (!getPromise) {
    getPromise = createPromise().catch((e) => {
      cache2.delete(id);
      throw e;
    });
    cache2.set(id, getPromise);
  }
  return getPromise;
}
const cache = /* @__PURE__ */ new Map();
function parseSvgFromDataUri(src, element) {
  const dataUriParts = src.split(",");
  if (dataUriParts.length !== 2 && "data:image/svg+xml;base64" === dataUriParts[0] || "data:image/svg+xml;base64" !== dataUriParts[0] && "data:image/svg+xml" !== dataUriParts[0]) {
    Logger.logError(UiCore$1.loggerCategory(element), "Unable to load icon.");
    return;
  }
  let rawSvg = "";
  if ("data:image/svg+xml;base64" === dataUriParts[0]) {
    rawSvg = window.atob(dataUriParts[1]);
  } else {
    rawSvg = decodeURIComponent(dataUriParts.slice(1).join(","));
  }
  const sanitizedSvg = purify.sanitize(rawSvg);
  const parsedSvg = new window.DOMParser().parseFromString(sanitizedSvg, "text/xml");
  const errorNode = parsedSvg.querySelector("parsererror");
  if (errorNode || "svg" !== parsedSvg.documentElement.nodeName.toLowerCase()) {
    throw new UiError(UiCore$1.loggerCategory(element), "Unable to load icon.");
  }
  return parsedSvg.documentElement;
}
async function fetchSvg(src, element) {
  const response = await fetch(src).catch((_error) => {
    Logger.logError(UiCore$1.loggerCategory(element), "Unable to load icon.");
  });
  if (!response || !response.ok) {
    throw new UiError(UiCore$1.loggerCategory(element), "Unable to load icon.");
  }
  const str = await response.text();
  if (str === void 0) {
    throw new UiError(UiCore$1.loggerCategory(element), "Unable to load icon.");
  }
  const data = new window.DOMParser().parseFromString(str, "text/xml");
  return data.documentElement;
}
async function getSvg(src, element) {
  if (src.startsWith("data:")) {
    return parseSvgFromDataUri(src, element);
  }
  return fetchSvg(src, element);
}
class IconWebComponent extends HTMLElement {
  async connectedCallback() {
    await this.loadSvg();
    this.dispatchEvent(new CustomEvent("load"));
  }
  async loadSvg() {
    if (this.childNodes.length)
      return;
    const src = this.getAttribute("src") || "";
    if (!src)
      return;
    const svg2 = await reuseOrCreatePromise(src, async () => getSvg(src, this), cache);
    if (svg2 && !this.childNodes.length) {
      this.append(svg2.cloneNode(true));
    }
  }
}
function registerIconWebComponent() {
  if (window.customElements.get("svg-loader") === void 0)
    window.customElements.define("svg-loader", IconWebComponent);
}
registerIconWebComponent();
let UiComponents$1 = class UiComponents {
  static _initialized = false;
  static _localization;
  /**
   * Registers the localization service namespace for UiComponents. Also initializes UiCore.
   * @param localization The internationalization service created by the host application.
   */
  static async initialize(localization) {
    if (UiComponents._initialized) {
      Logger.logInfo(UiComponents.loggerCategory("UiComponents"), `UiComponents.initialize already called`);
      return;
    }
    enablePatches();
    UiComponents._localization = localization;
    await UiComponents._localization.registerNamespace(UiComponents.localizationNamespace);
    await UiCore$1.initialize(UiComponents._localization);
    UiComponents._initialized = true;
  }
  /** Unregisters the UiComponents localization namespace */
  static terminate() {
    if (UiComponents._localization)
      UiComponents._localization.unregisterNamespace(UiComponents.localizationNamespace);
    UiComponents._localization = void 0;
    UiCore$1.terminate();
    UiComponents._initialized = false;
  }
  /** Determines if UiComponents has been initialized */
  static get initialized() {
    return UiComponents._initialized;
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
    if (!UiComponents._localization) {
      Logger.logError(UiComponents.loggerCategory("UiComponents"), `translate: UiComponents.initialize has not been called. Returning blank string.`);
      return "";
    }
    return UiComponents._localization.getLocalizedString(`${UiComponents.localizationNamespace}:${String(key)}`);
  }
  /** @internal */
  static loggerCategory(name) {
    return `${UiComponents.packageName}.${name}`;
  }
};
var SelectionModeFlags;
(function(SelectionModeFlags2) {
  SelectionModeFlags2[SelectionModeFlags2["SelectionLimitOne"] = 1] = "SelectionLimitOne";
  SelectionModeFlags2[SelectionModeFlags2["DragEnabled"] = 2] = "DragEnabled";
  SelectionModeFlags2[SelectionModeFlags2["ToggleEnabled"] = 4] = "ToggleEnabled";
  SelectionModeFlags2[SelectionModeFlags2["KeysEnabled"] = 8] = "KeysEnabled";
  SelectionModeFlags2[SelectionModeFlags2["None"] = 16] = "None";
})(SelectionModeFlags || (SelectionModeFlags = {}));
var SelectionMode;
(function(SelectionMode2) {
  SelectionMode2[SelectionMode2["Single"] = 1] = "Single";
  SelectionMode2[SelectionMode2["Multiple"] = 6] = "Multiple";
  SelectionMode2[SelectionMode2["Extended"] = 12] = "Extended";
  SelectionMode2[SelectionMode2["SingleAllowDeselect"] = 5] = "SingleAllowDeselect";
  SelectionMode2[SelectionMode2["None"] = 16] = "None";
})(SelectionMode || (SelectionMode = {}));
const hasSelectionModeFlag = (selectionMode, flag) => {
  return (selectionMode & flag) !== 0;
};
const CheckBoxState = CheckBoxState$1;
function adjustDateToTimezone(inDateTime, utcOffset) {
  return new Date(inDateTime.getTime() + (inDateTime.getTimezoneOffset() + utcOffset) * 6e4);
}
const toDateString = (date, timeZoneOffset, formatOptions) => {
  if (formatOptions) {
    return void 0 === timeZoneOffset ? date.toLocaleDateString(formatOptions.locales, formatOptions.options) : adjustDateToTimezone(date, timeZoneOffset).toLocaleDateString(formatOptions.locales, formatOptions.options);
  }
  return void 0 === timeZoneOffset ? date.toLocaleDateString() : adjustDateToTimezone(date, timeZoneOffset).toLocaleDateString();
};
const toTimeString = (date, timeZoneOffset, formatOptions) => {
  if (formatOptions) {
    return void 0 === timeZoneOffset ? date.toLocaleTimeString(formatOptions.locales, formatOptions.options) : adjustDateToTimezone(date, timeZoneOffset).toLocaleTimeString(formatOptions.locales, formatOptions.options);
  }
  return void 0 === timeZoneOffset ? date.toLocaleTimeString() : adjustDateToTimezone(date, timeZoneOffset).toLocaleTimeString();
};
const HIGHLIGHT_ACTIVE_CLASS_NAME = "components-activehighlight";
function HighlightedText(props) {
  const { searchText, activeMatchIndex, text: text2, caseSensitive } = props;
  const chunks = reactExports.useMemo(() => findChunks(text2, searchText, caseSensitive), [text2, searchText, caseSensitive]);
  const markedChunks = reactExports.useMemo(() => markChunks(text2, chunks, activeMatchIndex), [text2, chunks, activeMatchIndex]);
  return React.createElement(React.Fragment, null, markedChunks);
}
function findChunks(text2, searchText, caseSensitive) {
  const chunks = [];
  const contentText = caseSensitive ? text2 : text2.toLowerCase();
  const inputText = caseSensitive ? searchText : searchText.toLowerCase();
  let index = contentText.indexOf(inputText);
  while (index !== -1) {
    chunks.push({ start: index, end: index + inputText.length });
    index = contentText.indexOf(inputText, index + 1);
  }
  return chunks;
}
function markChunks(text2, chunks, activeChunk) {
  const markedText = [];
  let previousIndex = 0;
  const { mergedChunks, newActiveIndex } = mergeChunks(chunks, activeChunk);
  for (let i = 0; i < mergedChunks.length; i++) {
    const { start, end } = mergedChunks[i];
    const nonMarkedText = text2.substring(previousIndex, start);
    if (nonMarkedText.length) {
      markedText.push(React.createElement("span", { key: previousIndex }, nonMarkedText));
    }
    markedText.push(React.createElement("mark", { key: start, className: i === newActiveIndex ? HIGHLIGHT_ACTIVE_CLASS_NAME : void 0 }, text2.substring(start, end)));
    previousIndex = end;
  }
  const lastNonMarkedText = text2.substring(previousIndex, text2.length);
  if (lastNonMarkedText.length) {
    markedText.push(React.createElement("span", { key: previousIndex }, lastNonMarkedText));
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
var regex$3;
var hasRequiredRegex$3;
function requireRegex$3() {
  if (hasRequiredRegex$3) return regex$3;
  hasRequiredRegex$3 = 1;
  regex$3 = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  return regex$3;
}
var regex$2;
var hasRequiredRegex$2;
function requireRegex$2() {
  if (hasRequiredRegex$2) return regex$2;
  hasRequiredRegex$2 = 1;
  regex$2 = /[\0-\x1F\x7F-\x9F]/;
  return regex$2;
}
var regex$1;
var hasRequiredRegex$1;
function requireRegex$1() {
  if (hasRequiredRegex$1) return regex$1;
  hasRequiredRegex$1 = 1;
  regex$1 = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
  return regex$1;
}
var regex;
var hasRequiredRegex;
function requireRegex() {
  if (hasRequiredRegex) return regex;
  hasRequiredRegex = 1;
  regex = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
  return regex;
}
var re;
var hasRequiredRe;
function requireRe() {
  if (hasRequiredRe) return re;
  hasRequiredRe = 1;
  re = function(opts) {
    var re2 = {};
    re2.src_Any = requireRegex$3().source;
    re2.src_Cc = requireRegex$2().source;
    re2.src_Z = requireRegex$1().source;
    re2.src_P = requireRegex().source;
    re2.src_ZPCc = [re2.src_Z, re2.src_P, re2.src_Cc].join("|");
    re2.src_ZCc = [re2.src_Z, re2.src_Cc].join("|");
    var text_separators = "[><｜]";
    re2.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re2.src_ZPCc + ")" + re2.src_Any + ")";
    re2.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    re2.src_auth = "(?:(?:(?!" + re2.src_ZCc + "|[@/\\[\\]()]).)+@)?";
    re2.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
    re2.src_host_terminator = "(?=$|" + text_separators + "|" + re2.src_ZPCc + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + re2.src_ZPCc + "))";
    re2.src_path = "(?:[/?#](?:(?!" + re2.src_ZCc + "|" + text_separators + `|[()[\\]{}.,"'?!\\-]).|\\[(?:(?!` + re2.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re2.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re2.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + re2.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + re2.src_ZCc + "|[']).)+\\'|\\'(?=" + re2.src_pseudo_letter + "|[-]).|\\.{2,4}[a-zA-Z0-9%/]|\\.(?!" + re2.src_ZCc + "|[.]).|" + (opts && opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + "\\,(?!" + re2.src_ZCc + ").|\\!(?!" + re2.src_ZCc + "|[!]).|\\?(?!" + re2.src_ZCc + "|[?]).)+|\\/)?";
    re2.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
    re2.src_xn = "xn--[a-z0-9\\-]{1,59}";
    re2.src_domain_root = // Allow letters & digits (http://test1)
    "(?:" + re2.src_xn + "|" + re2.src_pseudo_letter + "{1,63})";
    re2.src_domain = "(?:" + re2.src_xn + "|(?:" + re2.src_pseudo_letter + ")|(?:" + re2.src_pseudo_letter + "(?:-|" + re2.src_pseudo_letter + "){0,61}" + re2.src_pseudo_letter + "))";
    re2.src_host = "(?:(?:(?:(?:" + re2.src_domain + ")\\.)*" + re2.src_domain + "))";
    re2.tpl_host_fuzzy = "(?:" + re2.src_ip4 + "|(?:(?:(?:" + re2.src_domain + ")\\.)+(?:%TLDS%)))";
    re2.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re2.src_domain + ")\\.)+(?:%TLDS%))";
    re2.src_host_strict = re2.src_host + re2.src_host_terminator;
    re2.tpl_host_fuzzy_strict = re2.tpl_host_fuzzy + re2.src_host_terminator;
    re2.src_host_port_strict = re2.src_host + re2.src_port + re2.src_host_terminator;
    re2.tpl_host_port_fuzzy_strict = re2.tpl_host_fuzzy + re2.src_port + re2.src_host_terminator;
    re2.tpl_host_port_no_ip_fuzzy_strict = re2.tpl_host_no_ip_fuzzy + re2.src_port + re2.src_host_terminator;
    re2.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re2.src_ZPCc + "|>|$))";
    re2.tpl_email_fuzzy = "(^|" + text_separators + '|"|\\(|' + re2.src_ZCc + ")(" + re2.src_email_name + "@" + re2.tpl_host_fuzzy_strict + ")";
    re2.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re2.src_ZPCc + "))((?![$+<=>^`|｜])" + re2.tpl_host_port_fuzzy_strict + re2.src_path + ")";
    re2.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
    // but can start with > (markdown blockquote)
    "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re2.src_ZPCc + "))((?![$+<=>^`|｜])" + re2.tpl_host_port_no_ip_fuzzy_strict + re2.src_path + ")";
    return re2;
  };
  return re;
}
var linkifyIt;
var hasRequiredLinkifyIt;
function requireLinkifyIt() {
  if (hasRequiredLinkifyIt) return linkifyIt;
  hasRequiredLinkifyIt = 1;
  function assign(obj) {
    var sources = Array.prototype.slice.call(arguments, 1);
    sources.forEach(function(source) {
      if (!source) {
        return;
      }
      Object.keys(source).forEach(function(key) {
        obj[key] = source[key];
      });
    });
    return obj;
  }
  function _class(obj) {
    return Object.prototype.toString.call(obj);
  }
  function isString(obj) {
    return _class(obj) === "[object String]";
  }
  function isObject(obj) {
    return _class(obj) === "[object Object]";
  }
  function isRegExp(obj) {
    return _class(obj) === "[object RegExp]";
  }
  function isFunction2(obj) {
    return _class(obj) === "[object Function]";
  }
  function escapeRE(str) {
    return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
  }
  var defaultOptions2 = {
    fuzzyLink: true,
    fuzzyEmail: true,
    fuzzyIP: false
  };
  function isOptionsObj(obj) {
    return Object.keys(obj || {}).reduce(function(acc, k) {
      return acc || defaultOptions2.hasOwnProperty(k);
    }, false);
  }
  var defaultSchemas = {
    "http:": {
      validate: function(text2, pos, self2) {
        var tail = text2.slice(pos);
        if (!self2.re.http) {
          self2.re.http = new RegExp(
            "^\\/\\/" + self2.re.src_auth + self2.re.src_host_port_strict + self2.re.src_path,
            "i"
          );
        }
        if (self2.re.http.test(tail)) {
          return tail.match(self2.re.http)[0].length;
        }
        return 0;
      }
    },
    "https:": "http:",
    "ftp:": "http:",
    "//": {
      validate: function(text2, pos, self2) {
        var tail = text2.slice(pos);
        if (!self2.re.no_http) {
          self2.re.no_http = new RegExp(
            "^" + self2.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
            // with code comments
            "(?:localhost|(?:(?:" + self2.re.src_domain + ")\\.)+" + self2.re.src_domain_root + ")" + self2.re.src_port + self2.re.src_host_terminator + self2.re.src_path,
            "i"
          );
        }
        if (self2.re.no_http.test(tail)) {
          if (pos >= 3 && text2[pos - 3] === ":") {
            return 0;
          }
          if (pos >= 3 && text2[pos - 3] === "/") {
            return 0;
          }
          return tail.match(self2.re.no_http)[0].length;
        }
        return 0;
      }
    },
    "mailto:": {
      validate: function(text2, pos, self2) {
        var tail = text2.slice(pos);
        if (!self2.re.mailto) {
          self2.re.mailto = new RegExp(
            "^" + self2.re.src_email_name + "@" + self2.re.src_host_strict,
            "i"
          );
        }
        if (self2.re.mailto.test(tail)) {
          return tail.match(self2.re.mailto)[0].length;
        }
        return 0;
      }
    }
  };
  var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
  var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
  function resetScanCache(self2) {
    self2.__index__ = -1;
    self2.__text_cache__ = "";
  }
  function createValidator(re2) {
    return function(text2, pos) {
      var tail = text2.slice(pos);
      if (re2.test(tail)) {
        return tail.match(re2)[0].length;
      }
      return 0;
    };
  }
  function createNormalizer() {
    return function(match, self2) {
      self2.normalize(match);
    };
  }
  function compile(self2) {
    var re2 = self2.re = requireRe()(self2.__opts__);
    var tlds = self2.__tlds__.slice();
    self2.onCompile();
    if (!self2.__tlds_replaced__) {
      tlds.push(tlds_2ch_src_re);
    }
    tlds.push(re2.src_xn);
    re2.src_tlds = tlds.join("|");
    function untpl(tpl) {
      return tpl.replace("%TLDS%", re2.src_tlds);
    }
    re2.email_fuzzy = RegExp(untpl(re2.tpl_email_fuzzy), "i");
    re2.link_fuzzy = RegExp(untpl(re2.tpl_link_fuzzy), "i");
    re2.link_no_ip_fuzzy = RegExp(untpl(re2.tpl_link_no_ip_fuzzy), "i");
    re2.host_fuzzy_test = RegExp(untpl(re2.tpl_host_fuzzy_test), "i");
    var aliases = [];
    self2.__compiled__ = {};
    function schemaError(name, val) {
      throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
    }
    Object.keys(self2.__schemas__).forEach(function(name) {
      var val = self2.__schemas__[name];
      if (val === null) {
        return;
      }
      var compiled = { validate: null, link: null };
      self2.__compiled__[name] = compiled;
      if (isObject(val)) {
        if (isRegExp(val.validate)) {
          compiled.validate = createValidator(val.validate);
        } else if (isFunction2(val.validate)) {
          compiled.validate = val.validate;
        } else {
          schemaError(name, val);
        }
        if (isFunction2(val.normalize)) {
          compiled.normalize = val.normalize;
        } else if (!val.normalize) {
          compiled.normalize = createNormalizer();
        } else {
          schemaError(name, val);
        }
        return;
      }
      if (isString(val)) {
        aliases.push(name);
        return;
      }
      schemaError(name, val);
    });
    aliases.forEach(function(alias) {
      if (!self2.__compiled__[self2.__schemas__[alias]]) {
        return;
      }
      self2.__compiled__[alias].validate = self2.__compiled__[self2.__schemas__[alias]].validate;
      self2.__compiled__[alias].normalize = self2.__compiled__[self2.__schemas__[alias]].normalize;
    });
    self2.__compiled__[""] = { validate: null, normalize: createNormalizer() };
    var slist = Object.keys(self2.__compiled__).filter(function(name) {
      return name.length > 0 && self2.__compiled__[name];
    }).map(escapeRE).join("|");
    self2.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + re2.src_ZPCc + "))(" + slist + ")", "i");
    self2.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + re2.src_ZPCc + "))(" + slist + ")", "ig");
    self2.re.pretest = RegExp(
      "(" + self2.re.schema_test.source + ")|(" + self2.re.host_fuzzy_test.source + ")|@",
      "i"
    );
    resetScanCache(self2);
  }
  function Match(self2, shift) {
    var start = self2.__index__, end = self2.__last_index__, text2 = self2.__text_cache__.slice(start, end);
    this.schema = self2.__schema__.toLowerCase();
    this.index = start + shift;
    this.lastIndex = end + shift;
    this.raw = text2;
    this.text = text2;
    this.url = text2;
  }
  function createMatch(self2, shift) {
    var match = new Match(self2, shift);
    self2.__compiled__[match.schema].normalize(match, self2);
    return match;
  }
  function LinkifyIt2(schemas, options) {
    if (!(this instanceof LinkifyIt2)) {
      return new LinkifyIt2(schemas, options);
    }
    if (!options) {
      if (isOptionsObj(schemas)) {
        options = schemas;
        schemas = {};
      }
    }
    this.__opts__ = assign({}, defaultOptions2, options);
    this.__index__ = -1;
    this.__last_index__ = -1;
    this.__schema__ = "";
    this.__text_cache__ = "";
    this.__schemas__ = assign({}, defaultSchemas, schemas);
    this.__compiled__ = {};
    this.__tlds__ = tlds_default;
    this.__tlds_replaced__ = false;
    this.re = {};
    compile(this);
  }
  LinkifyIt2.prototype.add = function add(schema, definition) {
    this.__schemas__[schema] = definition;
    compile(this);
    return this;
  };
  LinkifyIt2.prototype.set = function set2(options) {
    this.__opts__ = assign(this.__opts__, options);
    return this;
  };
  LinkifyIt2.prototype.test = function test(text2) {
    this.__text_cache__ = text2;
    this.__index__ = -1;
    if (!text2.length) {
      return false;
    }
    var m, ml, me, len, shift, next, re2, tld_pos, at_pos;
    if (this.re.schema_test.test(text2)) {
      re2 = this.re.schema_search;
      re2.lastIndex = 0;
      while ((m = re2.exec(text2)) !== null) {
        len = this.testSchemaAt(text2, m[2], re2.lastIndex);
        if (len) {
          this.__schema__ = m[2];
          this.__index__ = m.index + m[1].length;
          this.__last_index__ = m.index + m[0].length + len;
          break;
        }
      }
    }
    if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
      tld_pos = text2.search(this.re.host_fuzzy_test);
      if (tld_pos >= 0) {
        if (this.__index__ < 0 || tld_pos < this.__index__) {
          if ((ml = text2.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
            shift = ml.index + ml[1].length;
            if (this.__index__ < 0 || shift < this.__index__) {
              this.__schema__ = "";
              this.__index__ = shift;
              this.__last_index__ = ml.index + ml[0].length;
            }
          }
        }
      }
    }
    if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
      at_pos = text2.indexOf("@");
      if (at_pos >= 0) {
        if ((me = text2.match(this.re.email_fuzzy)) !== null) {
          shift = me.index + me[1].length;
          next = me.index + me[0].length;
          if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
            this.__schema__ = "mailto:";
            this.__index__ = shift;
            this.__last_index__ = next;
          }
        }
      }
    }
    return this.__index__ >= 0;
  };
  LinkifyIt2.prototype.pretest = function pretest(text2) {
    return this.re.pretest.test(text2);
  };
  LinkifyIt2.prototype.testSchemaAt = function testSchemaAt(text2, schema, pos) {
    if (!this.__compiled__[schema.toLowerCase()]) {
      return 0;
    }
    return this.__compiled__[schema.toLowerCase()].validate(text2, pos, this);
  };
  LinkifyIt2.prototype.match = function match(text2) {
    var shift = 0, result = [];
    if (this.__index__ >= 0 && this.__text_cache__ === text2) {
      result.push(createMatch(this, shift));
      shift = this.__last_index__;
    }
    var tail = shift ? text2.slice(shift) : text2;
    while (this.test(tail)) {
      result.push(createMatch(this, shift));
      tail = tail.slice(this.__last_index__);
      shift += this.__last_index__;
    }
    if (result.length) {
      return result;
    }
    return null;
  };
  LinkifyIt2.prototype.tlds = function tlds(list, keepOld) {
    list = Array.isArray(list) ? list : [list];
    if (!keepOld) {
      this.__tlds__ = list.slice();
      this.__tlds_replaced__ = true;
      compile(this);
      return this;
    }
    this.__tlds__ = this.__tlds__.concat(list).sort().filter(function(el, idx, arr) {
      return el !== arr[idx - 1];
    }).reverse();
    compile(this);
    return this;
  };
  LinkifyIt2.prototype.normalize = function normalize(match) {
    if (!match.schema) {
      match.url = "http://" + match.url;
    }
    if (match.schema === "mailto:" && !/^mailto:/i.test(match.url)) {
      match.url = "mailto:" + match.url;
    }
  };
  LinkifyIt2.prototype.onCompile = function onCompile() {
  };
  linkifyIt = LinkifyIt2;
  return linkifyIt;
}
var linkifyItExports = requireLinkifyIt();
const LinkifyIt = /* @__PURE__ */ getDefaultExportFromCjs(linkifyItExports);
const linkify = new LinkifyIt({ fuzzyLink: false });
linkify.add("pw:", {
  validate: (text2, pos, self2) => {
    const tail = text2.slice(pos);
    if (!self2.re.pw) {
      self2.re.pw = new RegExp(`(//|\\\\\\\\)${self2.re.src_host}:([a-zA-Z0-9-._~!$&'()*+,;=@%{}]+/)+[a-zA-Z0-9-._~!$&'()*+,;=@%{}]*`, "i");
    }
    if (self2.re.pw.test(tail)) {
      const matches = tail.match(self2.re.pw);
      if (matches !== null)
        return matches[0].length;
    }
    return 0;
  }
}).add("www.", {
  validate: (text2, pos, self2) => {
    const tail = text2.slice(pos);
    if (!self2.re.www) {
      self2.re.www = new RegExp(`^${self2.re.src_auth}${self2.re.src_host_port_strict}${self2.re.src_path}`, "i");
    }
    if (self2.re.www.test(tail)) {
      const matches = tail.match(self2.re.www);
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
const matchLinks = (text2) => {
  const head = text2.slice(0, 5);
  if (head === "pw://" || head === "pw:\\\\")
    return Array({
      index: 0,
      lastIndex: text2.length,
      schema: "pw:",
      url: text2
    });
  const matches = linkify.match(text2);
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
const TimeFormat = TimeFormat$1;
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from2.length, ar; i < l; i++) {
    if (ar || !(i in from2)) {
      if (!ar) ar = Array.prototype.slice.call(from2, 0, i);
      ar[i] = from2[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function isFunction(value) {
  return typeof value === "function";
}
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
var Subscription = (function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = (function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  })();
  return Subscription2;
})();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}
var config = {
  Promise: void 0
};
var timeoutProvider = {
  setTimeout: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    return clearTimeout(handle);
  },
  delegate: void 0
};
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    {
      throw err;
    }
  });
}
function noop() {
}
function errorContext(cb) {
  {
    cb();
  }
}
var Subscriber = (function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) ;
    else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) ;
    else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) ;
    else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
})(Subscription);
var ConsumerObserver = (function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
})();
var SafeSubscriber = (function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
})(Subscriber);
function handleUnhandledError(error) {
  {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};
var observable = (function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
})();
function identity(x) {
  return x;
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
var Observable = (function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
})();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = (function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
})(Subscriber);
var dateTimestampProvider = {
  now: function() {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: void 0
};
var Action = (function(_super) {
  __extends(Action2, _super);
  function Action2(scheduler, work) {
    return _super.call(this) || this;
  }
  Action2.prototype.schedule = function(state, delay) {
    return this;
  };
  return Action2;
})(Subscription);
var intervalProvider = {
  setInterval: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearInterval: function(handle) {
    return clearInterval(handle);
  },
  delegate: void 0
};
var AsyncAction = (function(_super) {
  __extends(AsyncAction2, _super);
  function AsyncAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  AsyncAction2.prototype.schedule = function(state, delay) {
    var _a;
    if (delay === void 0) {
      delay = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }
    this.pending = true;
    this.delay = delay;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
    return this;
  };
  AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  };
  AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }
    if (id != null) {
      intervalProvider.clearInterval(id);
    }
    return void 0;
  };
  AsyncAction2.prototype.execute = function(state, delay) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    var error = this._execute(state, delay);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction2.prototype._execute = function(state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var _a = this, id = _a.id, scheduler = _a.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction2;
})(Action);
var Scheduler = (function() {
  function Scheduler2(schedulerActionCtor, now2) {
    if (now2 === void 0) {
      now2 = Scheduler2.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now2;
  }
  Scheduler2.prototype.schedule = function(work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  };
  Scheduler2.now = dateTimestampProvider.now;
  return Scheduler2;
})();
var AsyncScheduler = (function(_super) {
  __extends(AsyncScheduler2, _super);
  function AsyncScheduler2(SchedulerAction, now2) {
    if (now2 === void 0) {
      now2 = Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now2) || this;
    _this.actions = [];
    _this._active = false;
    return _this;
  }
  AsyncScheduler2.prototype.flush = function(action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler2;
})(Scheduler);
var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;
function isScheduler(value) {
  return value && isFunction(value.schedule);
}
function last(arr) {
  return arr[arr.length - 1];
}
function popScheduler(args) {
  return isScheduler(last(args)) ? args.pop() : void 0;
}
function popNumber(args, defaultValue) {
  return typeof last(args) === "number" ? args.pop() : defaultValue;
}
var isArrayLike = (function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
});
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
function isInteropObservable(input) {
  return isFunction(input[observable]);
}
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2) throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}
function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay);
    }));
  });
}
function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay));
  });
}
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator$1;
    executeSchedule(subscriber, scheduler, function() {
      iterator$1 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator$1.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
    };
  });
}
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
  var buffer = [];
  var active = 0;
  var index = 0;
  var isComplete = false;
  var checkComplete = function() {
    if (isComplete && !buffer.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function(value) {
    return active < concurrent ? doInnerSub(value) : buffer.push(value);
  };
  var doInnerSub = function(value) {
    active++;
    var innerComplete = false;
    innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
      {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function() {
            var bufferedValue = buffer.shift();
            if (innerSubScheduler) ;
            else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
  };
}
function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction(resultSelector)) {
    return mergeMap(function(a, i) {
      return map(function(b, ii) {
        return resultSelector(a, b, i, ii);
      })(innerFrom(project(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate(function(source, subscriber) {
    return mergeInternals(source, subscriber, project, concurrent);
  });
}
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return mergeMap(identity, concurrent);
}
function concatAll() {
  return mergeAll(1);
}
function concat() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return concatAll()(from(args, popScheduler(args)));
}
function timer(dueTime, intervalOrScheduler, scheduler) {
  if (scheduler === void 0) {
    scheduler = async;
  }
  return new Observable(function(subscriber) {
    var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    var n = 0;
    return scheduler.schedule(function() {
      if (!subscriber.closed) {
        subscriber.next(n++);
        {
          subscriber.complete();
        }
      }
    }, due);
  });
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
    return this.convertToStringWithOptions(value, propertyDescription.converter?.options);
  }
  /** Converts a string with a property record to a property value */
  async convertFromStringToPropertyValue(value, propertyRecord) {
    const converterOptions = propertyRecord && propertyRecord.property.converter ? propertyRecord.property.converter.options : void 0;
    const stringValue = await this.convertFromStringWithOptions(value, converterOptions);
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
class TypeConverterManager {
  static _converters = {};
  static _defaultTypeConverter;
  static getFullConverterName(typename, converterName) {
    let fullConverterName = typename;
    if (converterName)
      fullConverterName += `:${converterName}`;
    return fullConverterName;
  }
  static registerConverter(typename, converter, converterName) {
    const fullConverterName = TypeConverterManager.getFullConverterName(typename, converterName);
    if (TypeConverterManager._converters.hasOwnProperty(fullConverterName)) {
      const nameOfConverter = TypeConverterManager._converters[fullConverterName].constructor.name;
      throw Error(`TypeConverterManager.registerConverter error: type '${typename}' already registered to '${nameOfConverter}'`);
    }
    const instance = new converter();
    TypeConverterManager._converters[fullConverterName] = instance;
  }
  static unregisterConverter(typename, converterName) {
    const fullConverterName = TypeConverterManager.getFullConverterName(typename, converterName);
    if (TypeConverterManager._converters.hasOwnProperty(fullConverterName)) {
      delete TypeConverterManager._converters[fullConverterName];
    }
  }
  static getConverter(typename, converterName) {
    const fullConverterName = TypeConverterManager.getFullConverterName(typename, converterName);
    if (TypeConverterManager._converters.hasOwnProperty(fullConverterName))
      return TypeConverterManager._converters[fullConverterName];
    if (!TypeConverterManager._defaultTypeConverter) {
      TypeConverterManager._defaultTypeConverter = new StringTypeConverter();
    }
    return TypeConverterManager._defaultTypeConverter;
  }
}
class BooleanTypeConverter extends TypeConverter {
  /** @internal */
  static sl10nTrue = "";
  /** @internal */
  static sl10nFalse = "";
  /** @internal */
  static getLocalizedTrueFalse() {
    if (!BooleanTypeConverter.sl10nTrue)
      BooleanTypeConverter.sl10nTrue = UiComponents$1.translate("general.true");
    if (!BooleanTypeConverter.sl10nFalse)
      BooleanTypeConverter.sl10nFalse = UiComponents$1.translate("general.false");
  }
  convertToString(value) {
    if (value === void 0)
      return "";
    BooleanTypeConverter.getLocalizedTrueFalse();
    if (value === BooleanTypeConverter.sl10nTrue || value === BooleanTypeConverter.sl10nFalse)
      return value;
    return value ? BooleanTypeConverter.sl10nTrue : BooleanTypeConverter.sl10nFalse;
  }
  convertFromString(value) {
    BooleanTypeConverter.getLocalizedTrueFalse();
    const booleanValue = 0 === value.toLocaleLowerCase().localeCompare(BooleanTypeConverter.sl10nTrue.toLocaleLowerCase());
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
}
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
    return Object.keys(TimeDisplay).some((key) => TimeDisplay[key] === type);
  }
  static isAlternateDateFormats(type) {
    return Object.keys(AlternateDateFormats).some((key) => AlternateDateFormats[key] === type);
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
      if ("alternateDateFormat" in options && DateTimeTypeConverterBase.isAlternateDateFormats(options.alternateDateFormat)) {
        alternateDateFormat = options.alternateDateFormat;
      }
      if (this.getTimeFormat() === TimeFormat.Long) {
        if ("timeDisplay" in options) {
          if (alternateDateFormat) {
            Logger.logInfo(UiComponents$1.loggerCategory("DateTimeTypeConverterBase"), `Invalid specification of timeDisplay with alternateDateFormat specification`);
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
        const formattedDateTime = formatInputDate(value, timeDisplay, void 0, alternateDateFormat);
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
      if ("alternateDateFormat" in options && DateTimeTypeConverterBase.isAlternateDateFormats(options.alternateDateFormat)) {
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
class DateTimeTypeConverter extends DateTimeTypeConverterBase {
  getTimeFormat() {
    return TimeFormat.Long;
  }
}
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
      return TypeConverterManager.getConverter("string").sortCompare(a, b, ignoreCase);
    }
    return +a - +b;
  }
}
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
class NavigationPropertyTypeConverter extends TypeConverter {
  convertPropertyToString(propertyDescription, value) {
    return value === void 0 ? "" : propertyDescription.displayLabel;
  }
  sortCompare(a, b, ignoreCase) {
    return TypeConverterManager.getConverter(StandardTypeNames.Hexadecimal).sortCompare(a.id, b.id, ignoreCase);
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
class BasePointTypeConverter extends TypeConverter {
  componentConverterName;
  constructor(componentConverterName = StandardTypeNames.Double) {
    super();
    this.componentConverterName = componentConverterName;
  }
  formatValue(value) {
    if (typeof value === "string")
      value = parseFloat(value);
    return TypeConverterManager.getConverter(this.componentConverterName).convertToString(value);
  }
  convertToString(value) {
    if (!value)
      return "";
    let components = new Array();
    if (Array.isArray(value)) {
      if (value.length === 0)
        return "";
      components = value.map((c) => this.formatValue(c));
    } else {
      components = [this.formatValue(value.x), this.formatValue(value.y)];
      if (void 0 !== value.z)
        components.push(this.formatValue(value.z));
    }
    const hasAsyncComponents = components.some(isPromiseLike);
    if (hasAsyncComponents) {
      return Promise.all(components.map(async (c) => isPromiseLike(c) ? c : Promise.resolve(c))).then((c) => c.join(", "));
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
class Point3dTypeConverter extends BasePointTypeConverter {
  constructor(componentConverterName) {
    super(componentConverterName);
  }
  getVectorLength(point) {
    const derivedPoint = this.constructPoint(point);
    if (derivedPoint === void 0)
      return void 0;
    return Math.sqrt(Math.pow(derivedPoint.x, 2) + Math.pow(derivedPoint.y, 2) + Math.pow(derivedPoint.z, 2));
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
    if (value === void 0)
      return "";
    return createDisplayValue(value);
  }
  sortCompare(valueA, valueB, ignoreCase) {
    const length = Math.min(valueA.parts.length, valueB.parts.length);
    const separatorComparison = compareStrings(valueA.separator, valueB.separator, ignoreCase);
    for (let i = 0; i < length; i++) {
      const lhs = valueA.parts[i];
      const rhs = valueB.parts[i];
      const compareResult = lhs.typeName !== rhs.typeName ? compareStrings(lhs.displayValue, rhs.displayValue, ignoreCase) : TypeConverterManager.getConverter(lhs.typeName).sortCompare(lhs.rawValue, rhs.rawValue, ignoreCase);
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
      valueString = await createDisplayValue(part.rawValue);
    } else {
      valueString = await TypeConverterManager.getConverter(part.typeName).convertToString(part.rawValue);
    }
    parts.push(valueString);
  }
  return parts.join(compositeValue.separator);
};
const general = { "true": "true", "false": "false", "loading": "loading", "noData": "The data required for this tree layout is not available in this iModel.", "length": "Length", "label": "Label", "of": "of", "search": "Search", "clear": "Clear" };
const button = { "label": { "search": "Search", "cancel": "Cancel", "settings": "Settings", "filter": "Filter", "selectAll": "Select All" } };
const breadcrumb = { "invalidBreadcrumbPath": "Path not found.", "errorUnknownMode": "Error: Unknown Breadcrumb mode.", "name": "Name", "icon": "Icon", "description": "Description" };
const tree = { "noResultsForFilter": '0 matches found for "{{searchText}}"' };
const table = { "filter": { "numericTooltip": "Input Methods: Range (x-y), Greater Then (>x), Less Then (<y)", "numericPlaceholder": "e.g. 3,10-15,>20" } };
const showhide = { "noLabel": "[unlabeled]", "showAll": "Show all", "list": "List...", "title": "Show/Hide" };
const property = { "arrayLength": "Number of Items", "expand": "See more", "collapse": "See less" };
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
const UiComponents2 = {
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
  default: UiComponents2,
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
function useRefState() {
  const [element, setElement] = reactExports.useState();
  const ref = reactExports.useCallback((instance) => {
    setElement(instance || void 0);
  }, []);
  return [ref, element];
}
const useTargeted = (ref) => {
  const [targeted, setTargeted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleDocumentPointerMove = (e) => {
      setTargeted(!!ref.current && !!e.target && e.target instanceof Node && ref.current.contains(e.target));
    };
    document.addEventListener("pointermove", handleDocumentPointerMove);
    return () => {
      document.removeEventListener("pointermove", handleDocumentPointerMove);
    };
  }, [ref]);
  return targeted;
};
const WidgetOpacityContext = reactExports.createContext({
  proximityScale: 1,
  addRef: () => {
  },
  removeRef: () => {
  }
});
function useWidgetOpacityContext() {
  const ref = reactExports.useRef(null);
  const { addRef, removeRef, proximityScale } = reactExports.useContext(WidgetOpacityContext);
  reactExports.useEffect(() => {
    addRef(ref);
    return () => {
      removeRef(ref);
    };
  }, [addRef, removeRef]);
  return { ref, proximityScale };
}
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
  const [selectedDay, setSelectedDay] = reactExports.useState(new Date(props.selected.getTime()));
  const [displayedMonthIndex, setDisplayedMonthIndex] = reactExports.useState(selectedDay.getMonth());
  const [displayedYear, setDisplayedYear] = reactExports.useState(selectedDay.getFullYear());
  const [focusedDay, setFocusedDay] = reactExports.useState(selectedDay);
  reactExports.useEffect(() => {
    const newSelectedDay = new Date(props.selected);
    setSelectedDay(new Date(props.selected));
    setDisplayedMonthIndex(newSelectedDay.getMonth());
    setDisplayedYear(newSelectedDay.getFullYear());
    setFocusedDay(newSelectedDay);
  }, [props.selected]);
  const days2 = reactExports.useMemo(() => {
    const msFirstDayOfMonth = new Date(displayedYear, displayedMonthIndex, 1).getTime();
    let offsetToFirst = new Date(msFirstDayOfMonth).getDay();
    if (0 === offsetToFirst)
      offsetToFirst = 7;
    const daysInMonth = [];
    for (let i = 0; i < 42; i++) {
      const adjustedDay = 1 + i - offsetToFirst;
      daysInMonth.push(new Date(displayedYear, displayedMonthIndex, adjustedDay));
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
  const setMonthAndYear = reactExports.useCallback((newMonth, newYear) => {
    setDisplayedMonthIndex(newMonth);
    setDisplayedYear(newYear);
    if (selectedDay.getFullYear() === newYear && selectedDay.getMonth() === newMonth) {
      setFocusedDay(new Date(selectedDay.getTime()));
    } else {
      const newFocusDay = new Date(focusedDay.getTime());
      newFocusDay.setFullYear(newYear, newMonth, 1);
      setFocusedDay(newFocusDay);
    }
  }, [focusedDay, selectedDay]);
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
  const handleOnDayChange = reactExports.useCallback((day) => () => {
    setSelectedDay(day);
    setFocusedDay(day);
    props.onDateChange && props.onDateChange(day);
  }, [props]);
  const handleCalendarKeyDown = reactExports.useCallback((event) => {
    if (event.key === Key_enumExports.Key.ArrowDown.valueOf()) {
      const focusedDayIndex = days2.findIndex((day) => isSameDay(day, focusedDay));
      if (focusedDayIndex + 7 > 41)
        setFocusedDay(days2[focusedDayIndex % 7]);
      else
        setFocusedDay(days2[focusedDayIndex + 7]);
      event.preventDefault();
    }
    if (event.key === Key_enumExports.Key.ArrowUp.valueOf()) {
      const focusedDayIndex = days2.findIndex((day) => isSameDay(day, focusedDay));
      if (focusedDayIndex - 7 < 0)
        setFocusedDay(days2[focusedDayIndex % 7 + 35]);
      else
        setFocusedDay(days2[focusedDayIndex - 7]);
      event.preventDefault();
    }
    if (event.key === Key_enumExports.Key.ArrowLeft.valueOf()) {
      const focusedDayIndex = days2.findIndex((day) => isSameDay(day, focusedDay));
      if (focusedDayIndex - 1 >= 0)
        setFocusedDay(days2[focusedDayIndex - 1]);
      event.preventDefault();
    }
    if (event.key === Key_enumExports.Key.ArrowRight.valueOf()) {
      const focusedDayIndex = days2.findIndex((day) => isSameDay(day, focusedDay));
      if (focusedDayIndex + 1 <= 41)
        setFocusedDay(days2[focusedDayIndex + 1]);
      event.preventDefault();
    }
    if (event.key === Key_enumExports.Key.Enter.valueOf() || event.key === " ") {
      handleOnDayChange(focusedDay)();
      event.preventDefault();
    }
  }, [days2, focusedDay, handleOnDayChange]);
  const previousButtonClass = classnames("components-previous-month", props.showFocusOutline && "showFocusOutline");
  const nextButtonClass = classnames("components-next-month", props.showFocusOutline && "showFocusOutline");
  const calendarClass = classnames("components-date-picker-calendar-month", props.showFocusOutline && "showFocusOutline");
  return reactExports.createElement(
    "div",
    { className: "components-date-picker-calendar" },
    reactExports.createElement(
      "div",
      { className: "components-date-picker-calendar-header-months" },
      reactExports.createElement(
        "button",
        { className: previousButtonClass, title: previousMonthLabel, onClick: handleMoveToPreviousMonth },
        reactExports.createElement(Icon, { iconSpec: reactExports.createElement(SvgChevronLeft, null) })
      ),
      reactExports.createElement(
        "span",
        { className: "components-month-year" },
        monthsLong[displayedMonthIndex],
        " ",
        displayedYear
      ),
      reactExports.createElement(
        "button",
        { className: nextButtonClass, title: nextMonthLabel, onClick: handleMoveToNextMonth },
        reactExports.createElement(Icon, { iconSpec: reactExports.createElement(SvgChevronRight, null) })
      )
    ),
    reactExports.createElement("div", { className: "components-date-picker-calendar-header-weekdays" }, [0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => reactExports.createElement(
      "div",
      { key: `day-${dayOfWeek}`, className: "components-date-picker-calendar-header-day-short", title: daysLong[dayOfWeek] },
      reactExports.createElement("span", null, daysShort[dayOfWeek])
    ))),
    reactExports.createElement("ul", { tabIndex: 0, onKeyDown: handleCalendarKeyDown, "data-testid": "components-date-picker-calendar-list", className: calendarClass, role: "listbox" }, weeks.map((weekdays, weekIndex) => reactExports.createElement(reactExports.Fragment, { key: `week-${weekIndex}` }, weekdays.map((day, dayIndex) => {
      const isActive = selectedDay && day && isSameDay(selectedDay, day);
      const isFocused = focusedDay && day && isSameDay(focusedDay, day) && props.showFocusOutline;
      const isCurrentMonth = day.getMonth() === displayedMonthIndex;
      const classNames = classnames("components-date-picker-calendar-day", isActive && "selected", !isCurrentMonth && "notCurrentMonth", isFocused && "focused");
      const dateValue = day.getDate();
      return (
        /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
        reactExports.createElement(
          "li",
          { className: classNames, key: `${displayedYear}.${displayedMonthIndex}.day.${dayIndex}`, onClick: handleOnDayChange(day), role: "option", "aria-selected": isActive, "data-value": day.getTime() },
          reactExports.createElement("span", null, dateValue)
        )
      );
    }))))
  );
}
function getValidInt(intText, min, max, defaultValue) {
  try {
    const newValue = parseInt(intText, 10);
    if (newValue >= min && newValue <= max)
      return newValue;
  } catch {
    return defaultValue;
  }
  return defaultValue;
}
function isSameTime(a, b) {
  return a.hours === b.hours && a.minutes === b.minutes && a.seconds === b.seconds;
}
function TimeField({ time: time2, timeDisplay, readOnly, onTimeChange }) {
  const { translate } = useTranslation();
  const initialDateRef = reactExports.useRef(time2);
  const amLabel = translate("timepicker.day-period-am");
  const pmLabel = translate("timepicker.day-period-pm");
  const [timeSpec, setTimeSpec] = reactExports.useState(time2);
  const { hours, minutes, seconds } = timeSpec;
  const showDayPeriod = -1 !== timeDisplay.search("aa");
  const getDisplayHours = reactExports.useCallback((timeHours) => {
    if (!showDayPeriod) {
      return timeHours;
    }
    const outHours = 0 === timeHours ? 12 : timeHours > 12 ? timeHours - 12 : timeHours;
    return outHours;
  }, [showDayPeriod]);
  reactExports.useEffect(() => {
    if (!isSameTime(time2, initialDateRef.current)) {
      setTimeSpec(time2);
      initialDateRef.current = time2;
    }
  }, [time2]);
  const displayHour = getDisplayHours(hours);
  const [dayPeriodText, setDayPeriodText] = reactExports.useState(showDayPeriod ? hours >= 12 ? pmLabel : amLabel : void 0);
  const [hoursText, setHoursText] = reactExports.useState(displayHour.toString().padStart(2, "0"));
  const [minutesText, setMinutesText] = reactExports.useState(minutes.toString().padStart(2, "0"));
  const [secondsText, setSecondsText] = reactExports.useState(seconds.toString().padStart(2, "0"));
  const updateTimeSpec = reactExports.useCallback((newTime) => {
    if (newTime.hours !== timeSpec.hours || newTime.minutes !== timeSpec.minutes || newTime.seconds !== timeSpec.seconds) {
      setTimeSpec(newTime);
      onTimeChange && onTimeChange(newTime);
    }
  }, [onTimeChange, timeSpec.hours, timeSpec.minutes, timeSpec.seconds]);
  const handleHoursChange = reactExports.useCallback((event) => {
    setHoursText(event.currentTarget.value);
  }, []);
  const handleMinutesChange = reactExports.useCallback((event) => {
    setMinutesText(event.currentTarget.value);
  }, []);
  const handleSecondsChange = reactExports.useCallback((event) => {
    setSecondsText(event.currentTarget.value);
  }, []);
  const handleDayPeriodChange = reactExports.useCallback((event) => {
    setDayPeriodText(event.currentTarget.value);
  }, []);
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
  const handleHoursOnKeyDown = reactExports.useCallback((event) => {
    if (event.key === Key_enumExports.Key.ArrowDown.valueOf() || event.key === Key_enumExports.Key.ArrowUp.valueOf()) {
      let newHours = hours + (event.key === Key_enumExports.Key.ArrowDown.valueOf() ? -1 : 1);
      if (newHours < 0)
        newHours = 24;
      if (newHours > 24 || newHours > 23 && minutes + seconds > 0)
        newHours = 0;
      setHoursText(getDisplayHours(newHours).toString().padStart(2, "0"));
      updateTimeSpec({ ...timeSpec, hours: newHours });
      showDayPeriod && setDayPeriodText(newHours >= 12 ? pmLabel : amLabel);
      event.preventDefault();
    } else if (event.key === Key_enumExports.Key.Enter.valueOf()) {
      const newHours = getValidInt(hoursText, 0, 24, hours);
      setHoursText(getDisplayHours(newHours).toString().padStart(2, "0"));
      updateTimeSpec({ ...timeSpec, hours: newHours });
      showDayPeriod && setDayPeriodText(newHours >= 12 ? pmLabel : amLabel);
      event.preventDefault();
    }
  }, [
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
  ]);
  const handleMinutesOnKeyDown = reactExports.useCallback((event) => {
    if (event.key === Key_enumExports.Key.ArrowDown.valueOf()) {
      const newMinutes = minutes === 0 ? 59 : minutes - 1;
      setMinutesText(newMinutes.toString().padStart(2, "0"));
      updateTimeSpec({ ...timeSpec, minutes: newMinutes });
      event.preventDefault();
    } else if (event.key === Key_enumExports.Key.ArrowUp.valueOf()) {
      const newMinutes = minutes === 59 ? 0 : minutes + 1;
      setMinutesText(newMinutes.toString().padStart(2, "0"));
      updateTimeSpec({ ...timeSpec, minutes: newMinutes });
      event.preventDefault();
    } else if (event.key === Key_enumExports.Key.Home.valueOf() || event.key === Key_enumExports.Key.End.valueOf()) {
      const newMinutes = event.key === Key_enumExports.Key.Home.valueOf() ? 0 : 59;
      setMinutesText(newMinutes.toString().padStart(2, "0"));
      updateTimeSpec({ ...timeSpec, minutes: newMinutes });
      event.preventDefault();
    } else if (event.key === Key_enumExports.Key.Enter.valueOf()) {
      const newMinutes = getValidInt(minutesText, 0, 59, minutes);
      setMinutesText(newMinutes.toString().padStart(2, "0"));
      updateTimeSpec({ ...timeSpec, minutes: newMinutes });
      event.preventDefault();
    }
  }, [minutesText, minutes, timeSpec, updateTimeSpec]);
  const handleSecondsOnKeyDown = reactExports.useCallback((event) => {
    if (event.key === Key_enumExports.Key.ArrowDown.valueOf()) {
      const newSeconds = seconds === 0 ? 59 : seconds - 1;
      setSecondsText(newSeconds.toString().padStart(2, "0"));
      updateTimeSpec({ ...timeSpec, seconds: newSeconds });
      event.preventDefault();
    } else if (event.key === Key_enumExports.Key.ArrowUp.valueOf()) {
      const newSeconds = seconds === 59 ? 0 : seconds + 1;
      setSecondsText(newSeconds.toString().padStart(2, "0"));
      updateTimeSpec({ ...timeSpec, seconds: newSeconds });
      event.preventDefault();
    } else if (event.key === Key_enumExports.Key.Home.valueOf() || event.key === Key_enumExports.Key.End.valueOf()) {
      const newSeconds = event.key === Key_enumExports.Key.Home.valueOf() ? 0 : 59;
      setSecondsText(newSeconds.toString().padStart(2, "0"));
      updateTimeSpec({ ...timeSpec, seconds: newSeconds });
      event.preventDefault();
    } else if (event.key === Key_enumExports.Key.Enter.valueOf()) {
      const newSeconds = getValidInt(secondsText, 0, 59, seconds);
      setSecondsText(newSeconds.toString().padStart(2, "0"));
      updateTimeSpec({ ...timeSpec, seconds: newSeconds });
      event.preventDefault();
    }
  }, [seconds, secondsText, timeSpec, updateTimeSpec]);
  const handleDayPeriodOnKeyDown = reactExports.useCallback((event) => {
    let newPeriodText;
    if (event.key === Key_enumExports.Key.ArrowDown.valueOf() || event.key === Key_enumExports.Key.Home.valueOf() || event.key === "a" || event.key === "A") {
      newPeriodText = amLabel;
      event.preventDefault();
    } else if (event.key === Key_enumExports.Key.ArrowUp.valueOf() || event.key === Key_enumExports.Key.End.valueOf() || event.key === "p" || event.key === "P") {
      newPeriodText = pmLabel;
      event.preventDefault();
    } else if (event.key === Key_enumExports.Key.Enter.valueOf()) {
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
  }, [amLabel, dayPeriodText, hours, pmLabel, timeSpec, updateTimeSpec]);
  const showSeconds = -1 !== timeDisplay.search(":ss");
  return reactExports.createElement(
    "div",
    { "data-testid": "components-time-input", className: "components-time" },
    reactExports.createElement(Input$1, { className: classnames("components-time-input", "components-input"), onKeyDown: handleHoursOnKeyDown, onBlur: handleHoursOnBlur, onChange: handleHoursChange, value: hoursText, disabled: readOnly, size: "small" }),
    reactExports.createElement("span", { className: "component-time-separator" }, ":"),
    reactExports.createElement(Input$1, { className: classnames("components-time-input", "components-input"), onKeyDown: handleMinutesOnKeyDown, onBlur: handleMinutesOnBlur, onChange: handleMinutesChange, value: minutesText, disabled: readOnly, size: "small" }),
    showSeconds && reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement("span", { className: "component-time-separator" }, ":"),
      reactExports.createElement(Input$1, { className: classnames("components-time-input", "components-input"), onKeyDown: handleSecondsOnKeyDown, onBlur: handleSecondsOnBlur, onChange: handleSecondsChange, value: secondsText, disabled: readOnly, size: "small" })
    ),
    dayPeriodText && reactExports.createElement(Input$1, { className: classnames("components-time-period-input", "components-input"), onKeyDown: handleDayPeriodOnKeyDown, onBlur: handleDayPeriodOnBlur, onChange: handleDayPeriodChange, value: dayPeriodText, disabled: readOnly, size: "small" })
  );
}
function isText(value) {
  return "value" in value && typeof value.value === "string";
}
function isNumeric(value) {
  return "rawValue" in value && "displayValue" in value;
}
function isBoolean(value) {
  return "value" in value && typeof value.value === "boolean";
}
function isDate(value) {
  return "value" in value && value.value instanceof Date;
}
function isEnum(value) {
  return "choice" in value;
}
function isInstanceKey(value) {
  return "key" in value && "id" in value.key && "className" in value.key;
}
function areEqual$1(lhs, rhs) {
  if (lhs === void 0 && rhs === void 0) {
    return true;
  }
  if (lhs === void 0) {
    return false;
  }
  if (rhs === void 0) {
    return false;
  }
  if (isNumeric(lhs) && isNumeric(rhs)) {
    return lhs.rawValue === rhs.rawValue;
  }
  if (isText(lhs) && isText(rhs)) {
    return lhs.value === rhs.value;
  }
  if (isBoolean(lhs) && isBoolean(rhs)) {
    return lhs.value === rhs.value;
  }
  if (isDate(lhs) && isDate(rhs)) {
    return lhs.value === rhs.value;
  }
  if (isInstanceKey(lhs) && isInstanceKey(rhs)) {
    return lhs.key.id === rhs.key.id && lhs.key.className === rhs.key.className;
  }
  if (isEnum(lhs) && isEnum(rhs)) {
    return lhs.choice === rhs.choice;
  }
  return false;
}
const EditorsRegistryContext = reactExports.createContext({
  editors: []
});
EditorsRegistryContext.displayName = "uifw:EditorsRegistryContext";
function EditorsRegistryProvider({ children, editors: editors2 }) {
  const parentContext = reactExports.useContext(EditorsRegistryContext);
  const value = reactExports.useMemo(() => {
    if (typeof editors2 === "function") {
      return { editors: editors2(parentContext.editors) };
    }
    return {
      editors: [...editors2, ...parentContext.editors]
    };
  }, [parentContext, editors2]);
  return reactExports.createElement(EditorsRegistryContext.Provider, { value }, children);
}
function createEditorSpec({ Editor, isMetadataSupported, isValueSupported }) {
  return {
    applies: (metadata, value) => isMetadataSupported(metadata) && (value === void 0 || isValueSupported(value)),
    // typeguards in `applies` function will take care of casting
    Editor
  };
}
function BooleanEditor$1({ value, onChange, commit, disabled, id }) {
  const currentValue = value?.value ?? false;
  const handleChange = (e) => {
    const newValue = { value: e.target.checked };
    onChange(newValue);
    commit?.();
  };
  return reactExports.createElement(Checkbox, { id, checked: currentValue, onChange: handleChange, disabled });
}
function DateInput({ value, onChange, onClose, size: size2, showTimePicker, disabled, id }) {
  const currentValue = value ?? /* @__PURE__ */ new Date();
  const dateStr = showTimePicker ? currentValue.toLocaleString() : currentValue.toLocaleDateString();
  return reactExports.createElement(
    Popover,
    { placement: "bottom", content: reactExports.createElement(DatePicker$1, { date: currentValue, onChange, showDatesOutsideMonth: false, showTime: showTimePicker }), onVisibleChange: (visible) => {
      if (!visible) {
        onClose?.();
      }
    } },
    reactExports.createElement(Button, { id, style: { width: "100%" }, size: size2, disabled }, dateStr)
  );
}
function DateTimeEditor$1({ value, onChange, commit, size: size2, disabled, id }) {
  return reactExports.createElement(DateInput, { value: value?.value, onChange: (newValue) => {
    onChange({ value: newValue });
  }, onClose: commit, size: size2, disabled, showTimePicker: true, id });
}
function EnumEditor$2({ metadata, value, onChange, commit, size: size2, disabled, id }) {
  const choices = metadata.choices;
  const currentValue = getEnumValue(value, choices);
  const handleChange = (newChoice) => {
    const choice = choices.find((c) => c.value === newChoice);
    const newValue = { choice: newChoice, label: choice?.label ?? "" };
    onChange(newValue);
    commit?.();
  };
  return reactExports.createElement(Select, { id, size: size2, value: currentValue.choice, onChange: handleChange, options: choices.map((c) => ({ value: c.value, label: c.label })), disabled });
}
function getEnumValue(value, choices) {
  const defaultValue = choices.length > 0 ? { choice: choices[0].value, label: choices[0].label } : { choice: "", label: "" };
  return value ? value : defaultValue;
}
function getNumericConstraints(constraints) {
  if (constraints && ("minimumValue" in constraints || "maximumValue" in constraints)) {
    return {
      min: constraints.minimumValue,
      max: constraints.maximumValue
    };
  }
  return { min: void 0, max: void 0 };
}
function applyNumericConstraints({ value, min, max }) {
  let clamped = value;
  if (min !== void 0) {
    clamped = Math.max(clamped, min);
  }
  if (max !== void 0) {
    clamped = Math.min(clamped, max);
  }
  return clamped;
}
function getStringConstraints(constraints) {
  if (constraints && ("minimumLength" in constraints || "maximumLength" in constraints)) {
    return {
      minLength: constraints.minimumLength,
      maxLength: constraints.maximumLength
    };
  }
  return { minLength: void 0, maxLength: void 0 };
}
function NumericEditor$1({ metadata, value, onChange, size: size2, disabled, id }) {
  const currentValue = getNumericValue(value);
  return reactExports.createElement(Input$1, { id, value: currentValue.displayValue, onChange: (e) => {
    const parsedValue = parseFloat(e.target.value);
    onChange({
      rawValue: Number.isNaN(parsedValue) ? void 0 : applyNumericConstraints({
        ...getNumericConstraints(metadata.constraints),
        value: parsedValue
      }),
      displayValue: e.target.value
    });
  }, size: size2, disabled });
}
function getNumericValue(value) {
  return value ? value : { rawValue: void 0, displayValue: "" };
}
function TextEditor$1({ metadata, value, onChange, size: size2, disabled, id }) {
  const currentValue = value ? value : { value: "" };
  const { maxLength, minLength } = getStringConstraints(metadata.constraints);
  return reactExports.createElement(Input$1, { id, value: currentValue.value, onChange: (e) => onChange({ value: e.target.value }), maxLength, minLength, size: size2, disabled });
}
function isPropertyRecordEditorMetadata(metadata) {
  return metadata.typename !== void 0;
}
function useCustomFormattedNumberParams(metadata) {
  return reactExports.useMemo(() => metadata.params?.find((param) => param.type === PropertyEditorParamTypes.CustomFormattedNumber.valueOf()), [metadata]);
}
function useInputEditorSizeParams(metadata) {
  return reactExports.useMemo(() => metadata.params?.find((param) => param.type === PropertyEditorParamTypes.InputEditorSize.valueOf()), [metadata]);
}
function useIconEditorParams(metadata) {
  return reactExports.useMemo(() => metadata.params?.find((param) => param.type === PropertyEditorParamTypes.Icon.valueOf()), [metadata]);
}
function useButtonGroupEditorParams(metadata) {
  return reactExports.useMemo(() => metadata.params?.find((param) => param.type === PropertyEditorParamTypes.ButtonGroupData.valueOf()), [metadata]);
}
function useColorEditorParams(metadata) {
  return reactExports.useMemo(() => metadata.params?.find((param) => param.type === PropertyEditorParamTypes.ColorData.valueOf()), [metadata]);
}
function useRangeEditorParams(metadata) {
  return reactExports.useMemo(() => metadata.params?.find((param) => param.type === PropertyEditorParamTypes.Range.valueOf()), [metadata]);
}
function useSliderEditorParams(metadata) {
  return reactExports.useMemo(() => metadata.params?.find((param) => param.type === PropertyEditorParamTypes.Slider.valueOf()), [metadata]);
}
const ColorEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => isPropertyRecordEditorMetadata(metadata) && metadata.type === "number" && !!metadata.params?.find((param) => param.type === PropertyEditorParamTypes.ColorData.valueOf()) && metadata.preferredEditor === StandardEditorNames.ColorPicker,
  isValueSupported: isNumeric,
  Editor: ColorEditor
});
function ColorEditor({ value, metadata, onChange, commit, size: size2, id }) {
  const colorParams = useColorEditorParams(metadata);
  const colors = colorParams?.colorValues ?? [];
  const currentValue = value ? value : { rawValue: colors[0] };
  const colorsList = colors.map((color) => ColorValue.fromTbgr(color));
  const activeColor = currentValue.rawValue !== void 0 ? ColorValue.fromTbgr(currentValue.rawValue) : colorsList[0];
  const onColorChanged = (color) => {
    onChange({ rawValue: color.toTbgr(), displayValue: "" });
  };
  return reactExports.createElement(
    Popover,
    { content: reactExports.createElement(
      ColorPicker,
      { selectedColor: activeColor, onChangeComplete: onColorChanged },
      reactExports.createElement(ColorPalette, { colors: colorsList })
    ), onVisibleChange: (visible) => {
      if (!visible) {
        commit?.();
      }
    } },
    reactExports.createElement(
      IconButton,
      { id, size: size2 },
      reactExports.createElement(ColorSwatch, { color: activeColor })
    )
  );
}
function findIcon(iconName) {
  if (!iconName) {
    return reactExports.createElement(SvgPlaceholder, null);
  }
  const icon = webfontIconsMap[iconName];
  return icon ? icon : reactExports.createElement(SvgPlaceholder, null);
}
const webfontIconsMap = {
  "icon-select-single": reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m15 7h-1.0922a6.0081 6.0081 0 0 0 -4.9078-4.9078v-1.0922a1 1 0 0 0 -2 0v1.0922a6.0081 6.0081 0 0 0 -4.9078 4.9078h-1.0922a1 1 0 0 0 0 2h1.0923a6.008 6.008 0 0 0 4.9077 4.9078v1.0922a1 1 0 0 0 2 0v-1.0922a6.008 6.008 0 0 0 4.9077-4.9078h1.0923a1 1 0 0 0 0-2zm-2.4769 1.923a4.6245 4.6245 0 0 1 -3.6 3.6 4.6572 4.6572 0 0 1 -1.8462 0 4.6245 4.6245 0 0 1 -3.6-3.6 4.6617 4.6617 0 0 1 0-1.8461 4.6243 4.6243 0 0 1 3.6-3.6 4.6622 4.6622 0 0 1 1.8462 0 4.6243 4.6243 0 0 1 3.6 3.6 4.6617 4.6617 0 0 1 0 1.8461z" })
  ),
  "icon-select-line": reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "M14.35352,1.35352l-.707-.707L.64648,13.646481l.707,.707" })
  ),
  "icon-select-box": reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m14 2v12h-12v-12zm1-1h-14v14h14z" })
  ),
  "icon-replace": reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m0 0h7v7h-7zm16 16h-7v-7h7zm-6-1h5v-5h-5zm-6.8484-6.0734-.7425-.7424-1.7678 1.7677 1.0253.0354a3.87023 3.87023 0 0 0 1.096 3.5002 4 4 0 0 0 5.3033.3536l-.7071-.7071a3.02646 3.02646 0 0 1 -4.7023-3.076l1.6617.0354zm10.0932-6.9317a3.99992 3.99992 0 0 0 -5.2679-.3182l.7071.7071a3 3 0 0 1 3.8537.3182 2.85982 2.85982 0 0 1 .7778 2.8284h-1.4849l1.7678 1.7678 1.7678-1.7678h-.9899a4.16081 4.16081 0 0 0 -1.1315-3.5355" })
  ),
  "icon-select-plus": reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m1 1v14h14v-14zm11 8h-3v3h-2v-3h-3v-2h3v-3h2v3h3z" })
  ),
  "icon-select-minus": reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm5 9h-10v-2h10z" })
  ),
  "icon-app-1": reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "M13,1a2.0023,2.0023,0,0,1,2,2V13a2.0023,2.0023,0,0,1-2,2H3a2.0023,2.0023,0,0,1-2-2V3A2.0023,2.0023,0,0,1,3,1H13m0-1H3A3,3,0,0,0,0,3V13a3,3,0,0,0,3,3H13a3,3,0,0,0,3-3V3a3,3,0,0,0-3-3Z" }),
    reactExports.createElement("path", { d: "m8.695 12.223h-.87v-5.597q0-.698.043-1.321-.113.113-.252.236t-1.278 1.047l-.473-.612 2.078-1.606h.752" })
  ),
  "icon-app-2": reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "M13,1a2.0023,2.0023,0,0,1,2,2V13a2.0023,2.0023,0,0,1-2,2H3a2.0023,2.0023,0,0,1-2-2V3A2.0023,2.0023,0,0,1,3,1H13m0-1H3A3,3,0,0,0,0,3V13a3,3,0,0,0,3,3H13a3,3,0,0,0,3-3V3a3,3,0,0,0-3-3Z" }),
    reactExports.createElement("path", { d: "M10.5537,12.2227H5.3926v-.7676L7.46,9.376A15.0726,15.0726,0,0,0,8.7061,8.0117a3.43,3.43,0,0,0,.4512-.7949,2.2694,2.2694,0,0,0,.15-.8325,1.3218,1.3218,0,0,0-.3809-.9966A1.4635,1.4635,0,0,0,7.8682,5.02a2.6559,2.6559,0,0,0-.9258.1611,3.7028,3.7028,0,0,0-.9756.5854L5.4941,5.16a3.6219,3.6219,0,0,1,2.3633-.9023,2.4962,2.4962,0,0,1,1.7354.5669,1.9478,1.9478,0,0,1,.6279,1.5225,2.9407,2.9407,0,0,1-.4189,1.4771A9.38,9.38,0,0,1,8.2334,9.6719L6.5146,11.3525v.043h4.0391Z" })
  ),
  "icon-apps-itwin": reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" },
    reactExports.createElement("path", { d: "m15.99733 3.94971a1.40456 1.40456 0 0 0 -.68186-1.12171l-3.41455-2.02581a1.39719 1.39719 0 0 0 -1.42644 0l-.17514.10392-1.01734.60359-2.22207 1.3183a1.404 1.404 0 0 0 -.68443 1.20209v1.11318l-.85-.50428a1.39692 1.39692 0 0 0 -1.42644 0l-2.15676 1.2796-.99578.59082-.262.15542a1.40386 1.40386 0 0 0 -.68452 1.20205v4.103c0 .0269.00112.05367.00268.08037a1.40454 1.40454 0 0 0 .68186 1.12175l3.41454 2.02584a1.39719 1.39719 0 0 0 1.42644 0l.17515-.10391 1.01733-.60362 2.22207-1.31831a1.404 1.404 0 0 0 .68444-1.202v-1.11327l.85.50429a1.39695 1.39695 0 0 0 1.42644 0l2.15678-1.27961.99579-.59081.262-.15543a1.40386 1.40386 0 0 0 .68448-1.20205v-4.103c0-.02694-.00111-.05371-.00267-.08041zm-11.17745 2.66922a.74413.74413 0 1 1 -.74414.74413.74412.74412 0 0 1 .74414-.74413zm2.037 6.37484-.29972.18471-1.07162.66036-.3669.22609-.18956.11682a.17417.17417 0 0 1 -.04294.02113.25282.25282 0 0 1 -.17289-.013l-.01771-.00815-.10292-.06342-1.82494-1.12454v-1.13313s.00612-.2441.31679-.06657l1.12588.69234v-2.42875l-.70151-.43238v-1.13314s.00612-.24409.31679-.06657l1.58222.973v3.09173l1.1322-.69623c.31067-.17753.31678.06657.31678.06657zm8.54852-7.88831v3.02766a.80664.80664 0 0 1 -.39331.69067l-.262.15543-.99579.59078-2.1568 1.27962a.80236.80236 0 0 1 -.81962 0l-1.15337-.68428v-2.29846a1.40368 1.40368 0 0 0 -.68444-1.202l-1.12365-.66671-.84632-.50212v-1.466a.80677.80677 0 0 1 .39323-.69068l2.22205-1.3183 1.01736-.60359.17516-.10393a.8026.8026 0 0 1 .81963 0l3.41447 2.0258a.814.814 0 0 1 .39176.645c.00088.01519.00166.0304.00166.04571zm-3.95807-2.71336 2.15631 1.32879v1.33893s-.00723.28842-.37432.07866l-1.33032-.81808v2.86984l.82891.5109v1.33893s-.00723.28843-.37432.07867l-1.86959-1.14966v-3.65328l-1.33781.82268c-.3671.20976-.37432-.07866-.37432-.07866v-1.33893l.35413-.21824 1.26623-.7803.43353-.26717.224-.138a.20549.20549 0 0 1 .05074-.025.29863.29863 0 0 1 .2043.01532l.02092.00964z" })
  )
};
const CustomNumberEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => isPropertyRecordEditorMetadata(metadata) && metadata.type === "number" && !!metadata.params?.find((param) => param.type === PropertyEditorParamTypes.CustomFormattedNumber.valueOf()) && metadata.preferredEditor === StandardEditorNames.NumberCustom,
  isValueSupported: isNumeric,
  Editor: CustomNumberEditor$1
});
function CustomNumberEditor$1({ metadata, value, onChange, size: size2, disabled, decoration, id }) {
  const formatParams = useCustomFormattedNumberParams(metadata);
  const sizeParams = useInputEditorSizeParams(metadata);
  const iconParams = useIconEditorParams(metadata);
  const inputRef = reactExports.useRef(null);
  const [inputValue, setInputValue] = reactExports.useState(() => {
    return value?.rawValue !== void 0 && formatParams ? formatParams.formatFunction(value.rawValue) : "";
  });
  if (!formatParams) {
    return null;
  }
  const style = sizeParams?.size !== void 0 ? {
    minWidth: `${sizeParams?.size * 0.75}em`,
    maxWidth: sizeParams?.maxSize !== void 0 ? `${sizeParams?.maxSize * 0.75}em` : void 0
  } : void 0;
  const icon = iconParams?.definition?.iconSpec !== void 0 ? findIcon(iconParams.definition.iconSpec) : void 0;
  const handleChange = (e) => {
    const currentValue = e.target.value;
    const result = formatParams.parseFunction(currentValue);
    const parsedValue = typeof result.value === "number" ? applyNumericConstraints({
      ...getNumericConstraints(metadata.constraints),
      value: result.value
    }) : void 0;
    setInputValue(currentValue);
    onChange({
      rawValue: parsedValue,
      displayValue: currentValue
    });
  };
  return reactExports.createElement(
    InputWithDecorations,
    { size: size2 },
    icon !== void 0 ? reactExports.createElement(InputWithDecorations.Icon, null, icon) : null,
    reactExports.createElement(InputWithDecorations.Input, { id, ref: inputRef, style, disabled, onChange: handleChange, value: inputValue }),
    decoration
  );
}
function useEnumMetadata(oldMetadata) {
  const [metadata, setMetadata] = reactExports.useState(() => ({
    type: "enum",
    choices: [],
    isStrict: false
  }));
  reactExports.useEffect(() => {
    let disposed = false;
    const loadChoices = async () => {
      const loadedChoices = oldMetadata.enum === void 0 ? [] : oldMetadata.enum.choices instanceof Promise ? [...await oldMetadata.enum.choices] : [...oldMetadata.enum.choices];
      if (!disposed) {
        setMetadata({
          type: "enum",
          choices: loadedChoices,
          isStrict: oldMetadata.enum?.isStrict ?? false
        });
      }
    };
    void loadChoices();
    return () => {
      disposed = true;
    };
  }, [oldMetadata]);
  return metadata;
}
const EnumEditorSpec$1 = createEditorSpec({
  isMetadataSupported: (metadata) => isPropertyRecordEditorMetadata(metadata) && metadata.type === "enum",
  isValueSupported: isEnum,
  Editor: EnumEditor$1
});
function EnumEditor$1(props) {
  const newMetadata = useEnumMetadata(props.metadata);
  return reactExports.createElement(EnumEditor$2, { ...props, metadata: newMetadata });
}
const EnumButtonGroupEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => isPropertyRecordEditorMetadata(metadata) && metadata.type === "enum" && metadata.preferredEditor === StandardEditorNames.EnumButtonGroup,
  isValueSupported: isEnum,
  Editor: EnumButtonGroupEditor$1
});
function EnumButtonGroupEditor$1({ value, onChange, commit, size: size2, disabled, metadata, id }) {
  const enumMetadata = useEnumMetadata(metadata);
  const buttonGroupParams = useButtonGroupEditorParams(metadata);
  const enumIcons = reactExports.useMemo(() => {
    return buttonGroupParams ? createIconsMap(enumMetadata.choices, buttonGroupParams) : void 0;
  }, [enumMetadata, buttonGroupParams]);
  const firstChoice = enumMetadata.choices[0];
  const currentValue = value ? value : { choice: firstChoice?.value ?? "" };
  return reactExports.createElement(ButtonGroup, { id, orientation: "horizontal" }, enumMetadata.choices.map((choice) => {
    const icon = findIcon(enumIcons?.get(choice.value));
    return reactExports.createElement(IconButton, { key: choice.value, onClick: () => {
      onChange({ choice: choice.value });
      commit?.();
    }, label: choice.label, isActive: choice.value === currentValue.choice, size: size2, disabled }, icon);
  }));
}
function createIconsMap(choices, params) {
  const icons = /* @__PURE__ */ new Map();
  for (let i = 0; i < choices.length; i++) {
    const iconDef = params.buttons[i];
    icons.set(choices[i].value, iconDef.iconSpec);
  }
  return icons;
}
const MultilineEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => isPropertyRecordEditorMetadata(metadata) && metadata.type === "string" && metadata.preferredEditor === StandardEditorNames.MultiLine,
  isValueSupported: isText,
  Editor: TextAreaEditor
});
function TextAreaEditor({ value, onChange, commit, size: size2, disabled, id }) {
  const currentValue = value ?? { value: "" };
  return reactExports.createElement(
    Popover,
    { placement: "bottom", content: reactExports.createElement(Textarea, { value: currentValue.value, onChange: (e) => {
      const newValue = e.currentTarget.value;
      onChange({ value: newValue });
    } }), onVisibleChange: (visible) => {
      if (!visible) {
        commit?.();
      }
    } },
    reactExports.createElement(Button, { id, style: { width: "100%" }, size: size2, disabled }, currentValue.value)
  );
}
const SliderEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => isPropertyRecordEditorMetadata(metadata) && metadata.type === "number" && !!metadata.params?.find((param) => param.type === PropertyEditorParamTypes.Slider.valueOf()) && metadata.preferredEditor === StandardEditorNames.Slider,
  isValueSupported: isNumeric,
  Editor: SliderEditor$1
});
function SliderEditor$1({ metadata, value, disabled, onChange, commit, size: size2, id }) {
  const sliderParams = useSliderEditorParams(metadata);
  if (!sliderParams) {
    return null;
  }
  const minLabel = sliderParams.showMinMax && sliderParams.minIconSpec ? reactExports.createElement(Icon$1, null, findIcon(sliderParams.minIconSpec)) : void 0;
  const maxLabel = sliderParams.showMinMax && sliderParams.maxIconSpec ? reactExports.createElement(Icon$1, null, findIcon(sliderParams.maxIconSpec)) : void 0;
  const handleChange = (values) => {
    const newValue = values[0];
    onChange({ rawValue: newValue, displayValue: `${newValue}` });
  };
  const currentValue = value?.rawValue ?? sliderParams.minimum;
  const slider = reactExports.createElement(Slider, { values: [currentValue], min: sliderParams.minimum, max: sliderParams.maximum, step: sliderParams.step, thumbMode: 1 === sliderParams.mode ? "allow-crossing" : "inhibit-crossing", trackDisplayMode: !sliderParams.reversed ? "auto" : "odd-segments", minLabel, maxLabel, tooltipProps: (_index, tooltipValue) => {
    return {
      placement: sliderParams.tooltipBelow ? "bottom" : "top",
      content: formatTickLabel(tooltipValue, sliderParams),
      visible: sliderParams.showTooltip
    };
  }, tickLabels: getTickLabels(sliderParams), onChange: handleChange, disabled });
  return reactExports.createElement(
    Popover,
    { placement: "bottom", style: { minWidth: "300px", padding: "8px" }, content: slider, onVisibleChange: (visible) => {
      if (!visible) {
        commit?.();
      }
    }, applyBackground: true },
    reactExports.createElement(Button, { id, style: { width: "100%" }, size: size2, disabled }, currentValue)
  );
}
function getTickLabels(sliderParams) {
  if (!sliderParams.showTicks || !sliderParams.showTickLabels) {
    return void 0;
  }
  const count = sliderParams.getTickCount ? sliderParams.getTickCount() : 0;
  if (count > 0) {
    const increment = (sliderParams.maximum - sliderParams.minimum) / count;
    return Array.from({ length: count + 1 }, (_, i) => formatTickLabel(i * increment + sliderParams.minimum, sliderParams));
  }
  return sliderParams.getTickValues?.().map((val) => formatTickLabel(val, sliderParams));
}
function formatTickLabel(value, params) {
  return params.formatTooltip ? params.formatTooltip(value) : `${value}`;
}
const NumericInputEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => isPropertyRecordEditorMetadata(metadata) && metadata.type === "number" && metadata.preferredEditor === StandardEditorNames.NumericInput,
  isValueSupported: isNumeric,
  Editor: NumericInputEditor$1
});
function NumericInputEditor$1({ metadata, value, onChange, size: size2, disabled, id }) {
  const sizeParams = useInputEditorSizeParams(metadata);
  const rangeParams = useRangeEditorParams(metadata);
  const { min: constraintMin, max: constraintMax } = getNumericConstraints(metadata.constraints);
  const effectiveMin = rangeParams?.minimum !== void 0 ? constraintMin !== void 0 ? Math.max(rangeParams.minimum, constraintMin) : rangeParams.minimum : constraintMin;
  const effectiveMax = rangeParams?.maximum !== void 0 ? constraintMax !== void 0 ? Math.min(rangeParams.maximum, constraintMax) : rangeParams.maximum : constraintMax;
  const handleChange = (newValue) => {
    onChange({
      displayValue: newValue,
      rawValue: parseFloat(newValue)
    });
  };
  const style = sizeParams?.size !== void 0 ? {
    minWidth: `${sizeParams?.size * 0.75}em`,
    maxWidth: sizeParams?.maxSize !== void 0 ? `${sizeParams?.maxSize * 0.75}em` : void 0
  } : void 0;
  const inputProps = useNumericInput({
    min: effectiveMin,
    max: effectiveMax,
    precision: rangeParams?.precision,
    step: rangeParams?.step,
    maxLength: sizeParams?.maxLength,
    onChange: handleChange,
    value: value?.displayValue ?? ""
  });
  return reactExports.createElement(Input$1, { id, style, size: size2, disabled, ...inputProps });
}
function useNumericInput({ min, max, step, precision, maxLength, value, onChange }) {
  const formatValue = (val) => {
    const appliedMin = min ?? Number.MIN_VALUE;
    const appliedMax = max ?? Number.MAX_VALUE;
    const valueInRange = Math.min(appliedMax, Math.max(appliedMin, val));
    return precision ? valueInRange.toFixed(precision) : valueInRange.toString();
  };
  const [formattedValue, setFormattedValue] = reactExports.useState(() => {
    return value.length !== 0 ? formatValue(Number(value)) : value;
  });
  const handleChange = (event) => {
    const currentValue = event.target.value;
    if (maxLength && currentValue.length > maxLength) {
      return;
    }
    setFormattedValue(currentValue);
    onChange(currentValue);
  };
  const handleBlur = () => {
    if (precision) {
      const newFormattedValue = formatValue(Number(formattedValue));
      if (newFormattedValue !== formattedValue) {
        setFormattedValue(newFormattedValue);
        onChange(newFormattedValue);
      }
    }
  };
  return {
    type: "number",
    min,
    max,
    step,
    value: formattedValue,
    onChange: handleChange,
    onBlur: handleBlur
  };
}
function ToggleEditor$1({ value, onChange, commit, disabled, size: size2, id }) {
  const currentValue = value ?? { value: false };
  const handleChange = (e) => {
    const newValue = { value: e.target.checked };
    onChange(newValue);
    commit?.();
  };
  return reactExports.createElement(ToggleSwitch, { id, checked: currentValue.value, onChange: handleChange, disabled, size: size2 === "small" ? "small" : void 0 });
}
function DateEditor({ value, onChange, commit, size: size2, disabled, id }) {
  return reactExports.createElement(DateInput, { value: value?.value, onChange: (newValue) => {
    onChange({ value: newValue });
  }, onClose: commit, size: size2, disabled, id });
}
const TextEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => metadata.type === "string",
  isValueSupported: isText,
  Editor: TextEditor$1
});
const DateEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => metadata.type === "date",
  isValueSupported: isDate,
  Editor: DateEditor
});
const DateTimeEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => metadata.type === "dateTime",
  isValueSupported: isDate,
  Editor: DateTimeEditor$1
});
const BoolEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => metadata.type === "bool",
  isValueSupported: isBoolean,
  Editor: BooleanEditor$1
});
const NumericEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => metadata.type === "number",
  isValueSupported: isNumeric,
  Editor: NumericEditor$1
});
const EnumEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => metadata.type === "enum",
  isValueSupported: isEnum,
  Editor: EnumEditor$2
});
const ToggleEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata) => metadata.type === "bool" && metadata.preferredEditor === StandardEditorNames.Toggle,
  isValueSupported: isBoolean,
  Editor: ToggleEditor$1
});
const defaultEditorSpecs = [
  // list editors with preferred editor check first
  ToggleEditorSpec,
  // list editors that checks only value type
  TextEditorSpec,
  BoolEditorSpec,
  NumericEditorSpec,
  DateEditorSpec,
  DateTimeEditorSpec,
  EnumEditorSpec
];
const interopEditorSpecs = [
  SliderEditorSpec,
  EnumButtonGroupEditorSpec,
  NumericInputEditorSpec,
  CustomNumberEditorSpec,
  ColorEditorSpec,
  MultilineEditorSpec,
  EnumEditorSpec$1
];
function FallbackEditor({ value, size: size2, id }) {
  return reactExports.createElement(Input$1, { id, readOnly: true, value: getTextValue(value), size: size2 });
}
function getTextValue(value) {
  if (value === void 0) {
    return value;
  }
  if (isBoolean(value)) {
    return value.value ? "true" : "false";
  }
  if (isDate(value)) {
    return value.value.toDateString();
  }
  if (isEnum(value)) {
    return value.choice;
  }
  if (isNumeric(value)) {
    return value.displayValue;
  }
  if (isText(value)) {
    return value.value;
  }
  if (isInstanceKey(value)) {
    return value.label;
  }
  return "";
}
function useEditor(metadata, value) {
  const { editors: editors2 } = reactExports.useContext(EditorsRegistryContext);
  const registeredEditor = editors2.find((editor2) => editor2.applies(metadata, value))?.Editor;
  if (registeredEditor) {
    return registeredEditor;
  }
  const oldEditor = interopEditorSpecs.find((editor2) => editor2.applies(metadata, value))?.Editor;
  if (oldEditor) {
    return oldEditor;
  }
  const defaultEditor = defaultEditorSpecs.find((editor2) => editor2.applies(metadata, value))?.Editor;
  if (defaultEditor) {
    return defaultEditor;
  }
  return FallbackEditor;
}
function EditorRenderer({ statusMessage, ...editorProps }) {
  const { metadata, value } = editorProps;
  const TypeEditor = useEditor(metadata, value);
  if (!TypeEditor) {
    return null;
  }
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(TypeEditor, { ...editorProps }),
    statusMessage && typeof statusMessage === "string" ? reactExports.createElement(StatusMessage, { status: "negative" }, statusMessage) : statusMessage
  );
}
function useCommittableValue({ initialValue, onCancel, onCommit }) {
  const initialValueRef = reactExports.useRef(initialValue);
  const [currentValue, setCurrentValue] = reactExports.useState(initialValue);
  const currentValueRef = reactExports.useRef({
    state: "initial",
    value: initialValue
  });
  const handleChange = (newValue) => {
    currentValueRef.current = {
      state: "changed",
      value: newValue
    };
    setCurrentValue(newValue);
  };
  const handleCommit = () => {
    if (currentValueRef.current.state === "changed" && !areEqual$1(currentValueRef.current.value, initialValueRef.current)) {
      onCommit(currentValueRef.current.value);
      return;
    }
    if (currentValueRef.current.state === "cancelled") {
      return;
    }
    onCancel?.();
  };
  const handleCancel = () => {
    currentValueRef.current = { state: "cancelled" };
    onCancel?.();
  };
  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === "Enter" || e.key === "Tab") {
      handleCommit();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };
  return {
    onChange: handleChange,
    onKeydown: handleKeyDown,
    commit: handleCommit,
    cancel: handleCancel,
    value: currentValue
  };
}
var EditorInterop;
(function(EditorInterop2) {
  function getMetadataAndValue(propertyRecord) {
    const baseMetadata = {
      preferredEditor: propertyRecord.property.editor?.name,
      params: propertyRecord.property.editor?.params,
      extendedData: propertyRecord.extendedData,
      enum: propertyRecord.property.enum,
      typename: propertyRecord.property.typename,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      quantityType: propertyRecord.property.quantityType,
      constraints: propertyRecord.property.constraints
    };
    const primitiveValue = propertyRecord.value;
    switch (propertyRecord.property.typename) {
      case "text":
      case "string":
        return {
          metadata: {
            ...baseMetadata,
            type: "string"
          },
          value: {
            value: primitiveValue.value ?? ""
          }
        };
      case "dateTime":
      case "shortdate":
        return {
          metadata: {
            ...baseMetadata,
            type: propertyRecord.property.typename === "shortdate" ? "date" : "dateTime"
          },
          value: {
            value: primitiveValue.value ?? /* @__PURE__ */ new Date()
          }
        };
      case "boolean":
      case "bool":
        return {
          metadata: {
            ...baseMetadata,
            type: "bool"
          },
          value: {
            value: primitiveValue.value ?? false
          }
        };
      case "float":
      case "double":
      case "int":
      case "integer":
      case "number":
        return {
          metadata: {
            ...baseMetadata,
            type: "number"
          },
          value: {
            rawValue: primitiveValue.value,
            displayValue: primitiveValue.displayValue ? primitiveValue.displayValue : primitiveValue.value !== void 0 ? `${primitiveValue.value}` : "",
            roundingError: primitiveValue.roundingError
          }
        };
      case "enum":
        return {
          metadata: {
            ...baseMetadata,
            type: "enum"
          },
          value: {
            choice: primitiveValue.value
          }
        };
      case "navigation":
        return {
          metadata: {
            ...baseMetadata,
            type: "instanceKey"
          },
          value: {
            key: primitiveValue.value,
            label: primitiveValue.displayValue ?? ""
          }
        };
    }
    return {
      metadata: void 0,
      value: void 0
    };
  }
  EditorInterop2.getMetadataAndValue = getMetadataAndValue;
  function convertToPrimitiveValue(newValue) {
    if (isText(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value
      };
    }
    if (isNumeric(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.rawValue,
        displayValue: newValue.displayValue,
        roundingError: newValue.roundingError
      };
    }
    if (isBoolean(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value.toString()
      };
    }
    if (isDate(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.value,
        displayValue: newValue.value.toString()
      };
    }
    if (isEnum(newValue)) {
      return {
        valueFormat: PropertyValueFormat.Primitive,
        value: newValue.choice
      };
    }
    throw new Error("Unsupported value type");
  }
  EditorInterop2.convertToPrimitiveValue = convertToPrimitiveValue;
})(EditorInterop || (EditorInterop = {}));
class TextEditor extends reactExports.PureComponent {
  _isMounted = false;
  _inputElement = reactExports.createRef();
  state = {
    inputValue: "",
    originalValue: ""
  };
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = await TypeConverterManager.getConverter(record.property.typename, record.property.converter?.name).convertFromStringToPropertyValue(this.state.inputValue, record);
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
  _onFocus = () => {
    if (this._isMounted && this.props.propertyRecord?.isMerged) {
      this.setState((prevState) => ({
        ...prevState,
        inputValue: prevState.originalValue
      }));
    }
  };
  _updateInputValue = (e) => {
    if (this._isMounted)
      this.setState({
        inputValue: e.target.value
      }, async () => {
        if (this.props.shouldCommitOnChange && this.props.onCommit && this.props.propertyRecord) {
          const newValue = await this.getPropertyValue();
          if (newValue)
            this.props.onCommit({
              propertyRecord: this.props.propertyRecord,
              newValue
            });
        }
      });
  };
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  /** @internal */
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
      initialValue = await TypeConverterManager.getConverter(record.property.typename, record.property.converter?.name).convertPropertyToString(record.property, value);
    }
    let size2;
    let maxSize;
    let maxLength;
    let iconSpec;
    if (record && record.property && record.property.editor && record.property.editor.params) {
      const editorSizeParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.InputEditorSize.valueOf());
      if (editorSizeParams) {
        if (editorSizeParams.size)
          size2 = editorSizeParams.size;
        if (editorSizeParams.maxSize)
          maxSize = editorSizeParams.maxSize;
        if (editorSizeParams.maxLength)
          maxLength = editorSizeParams.maxLength;
      }
      const iconParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.Icon.valueOf());
      if (iconParams) {
        iconSpec = iconParams.definition.iconSpec;
      }
    }
    if (this._isMounted)
      this.setState({
        inputValue: record?.isMerged && !this.hasFocus ? "--" : initialValue,
        originalValue: initialValue,
        size: size2,
        maxSize,
        maxLength,
        iconSpec
      });
  }
  render() {
    const { decoration } = this.props;
    const className = classnames("components-cell-editor", "components-text-editor", this.props.className);
    const minSize = this.state.size ? this.state.size : 8;
    const style = {
      minWidth: `${minSize * 0.75}em`,
      maxWidth: this.state.maxSize ? `${this.state.maxSize * 0.75}em` : void 0
    };
    const inputProps = {
      type: "text",
      className,
      style: this.props.style ? this.props.style : style,
      readOnly: this.props.propertyRecord?.isReadonly,
      disabled: this.props.propertyRecord?.isDisabled,
      maxLength: this.state.maxLength,
      value: this.state.inputValue,
      onBlur: this.props.onBlur,
      onFocus: this._onFocus,
      onChange: this._updateInputValue,
      autoFocus: this.props.setFocus && !this.props.propertyRecord?.isDisabled,
      "aria-label": UiComponents$1.translate("editor.text")
    };
    const icon = this.state.iconSpec ? reactExports.createElement(Icon, { iconSpec: this.state.iconSpec }) : void 0;
    return reactExports.createElement(LockTextEditor, { ...inputProps, ref: this._inputElement, id: this.props.propertyRecord?.property.name, icon, decoration });
  }
}
const LockTextEditor = reactExports.forwardRef(function LockTextEditor2(props, forwardedRef) {
  const { icon, decoration, ...rest } = props;
  if (decoration) {
    return reactExports.createElement(
      InputWithDecorations,
      { size: "small" },
      icon && reactExports.createElement(InputWithDecorations.Icon, { size: "small" }, icon),
      reactExports.createElement(InputWithDecorations.Input, { ...rest, ref: forwardedRef, "data-testid": "components-text-editor", size: "small" }),
      decoration
    );
  }
  if (icon) {
    return reactExports.createElement(IconInput, { ...rest, ref: forwardedRef, icon, "data-testid": "components-text-editor" });
  }
  return reactExports.createElement(Input$1, { ...rest, ref: forwardedRef, "data-testid": "components-text-editor", size: "small" });
});
class PropertyEditorBase {
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
  customDataController = void 0;
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
const editors = {};
class PropertyEditorManager {
  static _dataControllers = {};
  static registerEditor(editType, editor2, editorName) {
    const fullEditorName = getFullEditorName(editType, editorName);
    if (editors.hasOwnProperty(fullEditorName)) {
      const nameOfEditor = editors[fullEditorName].name;
      throw Error(`PropertyEditorManager.registerEditor error: type '${fullEditorName}' already registered to '${nameOfEditor}'`);
    }
    editors[fullEditorName] = editor2;
  }
  static registerDataController(controllerName, controller) {
    if (PropertyEditorManager._dataControllers.hasOwnProperty(controllerName)) {
      throw Error(`PropertyEditorManager.registerDataController error: type '${controllerName}' already registered to '${(typeof PropertyEditorManager._dataControllers[controllerName]).toString()}'`);
    }
    PropertyEditorManager._dataControllers[controllerName] = controller;
  }
  /** @internal */
  static deregisterDataController(controllerName) {
    if (PropertyEditorManager._dataControllers.hasOwnProperty(controllerName)) {
      delete PropertyEditorManager._dataControllers[controllerName];
    }
  }
  static createEditor(editType, editorName, dataControllerName) {
    const fullEditorName = getFullEditorName(editType, editorName);
    let editor2;
    if (editors.hasOwnProperty(fullEditorName))
      editor2 = new editors[fullEditorName]();
    else if (editors.hasOwnProperty(editType))
      editor2 = new editors[editType]();
    else
      editor2 = new BasicPropertyEditor();
    if (dataControllerName) {
      if (PropertyEditorManager._dataControllers.hasOwnProperty(dataControllerName))
        editor2.customDataController = new PropertyEditorManager._dataControllers[dataControllerName]();
      else
        throw Error(`PropertyEditorManager.createEditor error: data controller '${dataControllerName}' is not registered`);
    }
    return editor2;
  }
  static hasCustomEditor(editType, editorName) {
    const fullEditorName = getFullEditorName(editType, editorName);
    return editors.hasOwnProperty(fullEditorName);
  }
}
class BasicPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return reactExports.createElement(TextEditor, null);
  }
}
function getFullEditorName(editType, editorName) {
  let fullEditorName = editType;
  if (editorName)
    fullEditorName += `:${editorName}`;
  return fullEditorName;
}
function registerDefaultPropertyEditor(editType, editor2, editorName, override = false) {
  const fullEditorName = getFullEditorName(editType, editorName);
  if (editors.hasOwnProperty(fullEditorName) && !override)
    return;
  editors[fullEditorName] = editor2;
}
function EditorContainer(props) {
  const { ignoreEditorBlur, title, shouldCommitOnChange, propertyRecord, setFocus, onCommit, onCancel, onClick, ...rest } = props;
  const editorRef = reactExports.useRef(void 0);
  const propertyEditorRef = reactExports.useRef(void 0);
  const committedByTab = reactExports.useRef(false);
  const handleClick = (e) => {
    onClick?.();
    e.stopPropagation();
  };
  const handleContextMenu = (e) => e.stopPropagation();
  const handleContainerBlur = (e) => e.stopPropagation();
  const handleEditorCommit = (args) => void commit(args);
  const handleContainerCommit = async () => {
    const newValue = editorRef && await editorRef.current?.getPropertyValue();
    if (newValue === void 0)
      return;
    void commit({
      propertyRecord,
      newValue
    });
  };
  const onPressEscape = (e) => {
    if (!propertyEditorRef.current?.containerHandlesEscape)
      return;
    e.stopPropagation();
    onCancel();
  };
  const onPressEnter = (e) => {
    if (!propertyEditorRef.current?.containerHandlesEnter)
      return;
    if (editorRef?.current?.hasFocus)
      e.stopPropagation();
    void handleContainerCommit();
  };
  const onPressTab = (e) => {
    if (!propertyEditorRef.current?.containerHandlesTab)
      return;
    e.stopPropagation();
    void handleContainerCommit();
    committedByTab.current = true;
  };
  const handleKeyDown = (e) => {
    switch (e.key) {
      case Key_enumExports.Key.Escape.valueOf():
        onPressEscape(e);
        break;
      case Key_enumExports.Key.Enter.valueOf():
        onPressEnter(e);
        break;
      case Key_enumExports.Key.Tab.valueOf():
        onPressTab(e);
        break;
      default:
        if (propertyEditorRef.current?.containerStopsKeydownPropagation)
          e.stopPropagation();
    }
  };
  const handleEditorBlur = () => {
    if (committedByTab.current) {
      committedByTab.current = false;
      return;
    }
    if (ignoreEditorBlur)
      return;
    if (!propertyEditorRef.current?.containerHandlesBlur)
      return;
    void handleContainerCommit();
  };
  const isNewValueValid = async (value) => {
    if (!propertyEditorRef.current)
      return false;
    if (!propertyRecord)
      return false;
    const validateResult = await propertyEditorRef.current.validateValue(value, propertyRecord);
    if (validateResult.encounteredError) {
      displayOutputMessage(validateResult.errorMessage);
      return false;
    }
    return true;
  };
  const displayOutputMessage = (errorMessage) => {
    if (!errorMessage)
      return;
    if (!editorRef)
      return;
    const htmlElement = editorRef.current?.htmlElement;
    if (htmlElement)
      UiAdmin.messagePresenter.displayInputFieldMessage(htmlElement, errorMessage.severity, errorMessage.briefMessage, errorMessage.detailedMessage);
    else
      UiAdmin.messagePresenter.displayMessage(errorMessage.severity, errorMessage.briefMessage, errorMessage.detailedMessage, errorMessage.messageType);
  };
  const commit = async (args) => {
    const oldValue = args.propertyRecord.value;
    const newValue = args.newValue;
    if (!shouldCommit(oldValue, newValue)) {
      onCancel();
      return;
    }
    const isValid = await isNewValueValid(newValue);
    if (!isValid)
      return;
    if (propertyEditorRef.current && args.propertyRecord) {
      const commitResult = await propertyEditorRef.current.commitValue(newValue, args.propertyRecord);
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
  propertyEditorRef.current = PropertyEditorManager.createEditor(propDescription.typename, editorName, propDescription.dataController);
  const clonedNode = reactExports.isValidElement(propertyEditorRef.current.reactNode) ? reactExports.cloneElement(propertyEditorRef.current.reactNode, editorProps) : void 0;
  return reactExports.createElement("span", { className: "components-editor-container", onBlur: handleContainerBlur, onKeyDown: handleKeyDown, onClick: handleClick, onContextMenu: handleContextMenu, title, "data-testid": "editor-container", role: "presentation" }, clonedNode);
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
const PropertyRecordEditor = ({
  propertyRecord,
  onCommit,
  onCancel,
  onClick,
  setFocus,
  size: size2,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  editorSystem
}) => {
  const { metadata, value } = EditorInterop.getMetadataAndValue(propertyRecord);
  if (editorSystem === "new" && metadata && value) {
    return reactExports.createElement(CommittingEditor, { metadata, initialValue: value, onCommit: (newValue) => {
      onCommit({
        propertyRecord,
        newValue: newValue === void 0 ? { valueFormat: PropertyValueFormat.Primitive } : EditorInterop.convertToPrimitiveValue(newValue)
      });
    }, onCancel, onClick, disabled: propertyRecord.isDisabled || propertyRecord.isReadonly, size: size2, id: propertyRecord.property.name });
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    reactExports.createElement(EditorContainer, { propertyRecord, onCommit, onCancel, onClick, setFocus })
  );
};
function CommittingEditor({ metadata, initialValue, onCancel, onCommit, onClick, disabled, size: size2, id }) {
  const { value, onChange, onKeydown, commit, cancel } = useCommittableValue({
    initialValue,
    onCommit,
    onCancel
  });
  return reactExports.createElement(
    "div",
    { onKeyDown: onKeydown, onBlur: commit, onClick, role: "presentation" },
    reactExports.createElement(EditorRenderer, { metadata, value, onChange, commit, cancel, disabled, size: size2, id })
  );
}
class BooleanEditor extends reactExports.PureComponent {
  _isMounted = false;
  _inputElement = reactExports.createRef();
  state = {
    checkboxValue: false
  };
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
  _updateCheckboxValue = (e) => {
    if (this._isMounted) {
      const checkboxValue = !!e.target.checked;
      this.setState({
        checkboxValue
      }, () => {
        if (this.props.propertyRecord && this.props.onCommit) {
          const propertyValue = this.getPropertyValueSync();
          if (propertyValue !== void 0) {
            this.props.onCommit({
              propertyRecord: this.props.propertyRecord,
              newValue: propertyValue
            });
          }
        }
      });
    }
  };
  componentDidMount() {
    this._isMounted = true;
    this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  /** @internal */
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      this.setStateFromProps();
    }
  }
  setStateFromProps() {
    const { propertyRecord } = this.props;
    let checkboxValue = false;
    if (propertyRecord && propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
      const primitiveValue = propertyRecord.value.value;
      checkboxValue = primitiveValue;
    }
    if (this._isMounted)
      this.setState({
        checkboxValue
      });
  }
  render() {
    const className = classnames("components-cell-editor", "components-boolean-editor", this.props.className);
    const checked = this.state.checkboxValue;
    return reactExports.createElement(Checkbox, { ref: this._inputElement, onBlur: this.props.onBlur, className, style: this.props.style, checked, onChange: this._updateCheckboxValue, autoFocus: this.props.setFocus, disabled: this.props.propertyRecord?.isDisabled || this.props.propertyRecord?.isReadonly, "data-testid": "components-checkbox-editor", id: this.props.propertyRecord?.property.name });
  }
}
class BooleanPropertyEditor extends PropertyEditorBase {
  get containerHandlesBlur() {
    return false;
  }
  get reactNode() {
    return reactExports.createElement(BooleanEditor, null);
  }
}
class CustomNumberEditor extends reactExports.PureComponent {
  _isMounted = false;
  _formatParams;
  _inputElement = reactExports.createRef();
  _lastValidValue;
  // Used to track the last user typed value.
  _lastInputValue;
  _lastValue;
  state = {
    inputValue: ""
  };
  async getPropertyValue() {
    this._lastInputValue = void 0;
    this._lastValue = void 0;
    const value = await this.#getPropertyValue();
    if (this.props.shouldCommitOnChange && this._formatParams && isPrimitiveValue(value) && typeof value.value === "number") {
      const newDisplayValue = this._formatParams.formatFunction(value.value);
      this.setState({
        inputValue: newDisplayValue
      });
    }
    return value;
  }
  async #getPropertyValue() {
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
        if (
          // This should not happen in a getter, for now fix only if shouldCommitOnChange is true.
          !this.props.shouldCommitOnChange && newDisplayValue !== this.state.inputValue
        ) {
          this.setState({ inputValue: newDisplayValue });
        }
      } else {
        if (this.htmlElement) {
          UiAdmin.messagePresenter.displayInputFieldMessage(this.htmlElement, MessageSeverity.Error, parseResults.parseError ? parseResults.parseError : UiComponents$1.translate("errors.unable-to-parse-quantity"));
          this.htmlElement.focus();
        } else {
          UiAdmin.messagePresenter.displayMessage(MessageSeverity.Error, parseResults.parseError ? parseResults.parseError : UiComponents$1.translate("errors.unable-to-parse-quantity"));
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
      }, async () => {
        if (!this.props.shouldCommitOnChange)
          return;
        if (!this.props.onCommit)
          return;
        if (!this.props.propertyRecord)
          return;
        const newValue = await this.#getPropertyValue();
        if (!newValue)
          return;
        this._lastInputValue = this.state.inputValue;
        this._lastValue = newValue;
        this.props.onCommit({
          propertyRecord: this.props.propertyRecord,
          newValue
        });
      });
  }
  _updateInputValue = (e) => {
    this._applyUpdatedValue(e.target.value);
  };
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
  setStateFromProps() {
    if (!this._isMounted)
      return;
    const record = this.props.propertyRecord;
    if (!record || !record.property) {
      Logger.logError(UiComponents$1.loggerCategory("CustomNumberEditor"), "PropertyRecord must be defined to use CustomNumberPropertyEditor");
      return;
    }
    if (record.property && record.property.editor && record.property.editor.params) {
      this._formatParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.CustomFormattedNumber.valueOf());
    }
    if (!this._formatParams) {
      Logger.logError(UiComponents$1.loggerCategory("CustomNumberEditor"), `CustomFormattedNumberParams must be defined for property ${record.property.name}`);
      return;
    }
    const initialDisplayValue = this._getInitialDisplayValue();
    this._lastValidValue = {
      valueFormat: PropertyValueFormat.Primitive,
      value: record.value.value,
      displayValue: initialDisplayValue
    };
    let size2;
    let maxSize;
    let maxLength;
    let iconSpec;
    if (record.property && record.property.editor && record.property.editor.params) {
      const editorSizeParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.InputEditorSize.valueOf());
      if (editorSizeParams) {
        if (editorSizeParams.size)
          size2 = editorSizeParams.size;
        if (editorSizeParams.maxSize)
          maxSize = editorSizeParams.maxSize;
        if (editorSizeParams.maxLength)
          maxLength = editorSizeParams.maxLength;
      }
      const iconParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.Icon.valueOf());
      if (iconParams) {
        iconSpec = iconParams.definition.iconSpec;
      }
      const iconNodeParam = record.property.editor.params.find((param) => param.type === "appui-icon-node");
      if (iconNodeParam) {
        iconSpec = iconNodeParam.icon;
      }
    }
    let inputValue = initialDisplayValue;
    if (this.props.shouldCommitOnChange && this._lastInputValue && isPrimitiveValue(this._lastValue) && isPrimitiveValue(this.props.propertyRecord?.value) && this._lastValue.value === this.props.propertyRecord.value.value) {
      inputValue = this._lastInputValue;
    }
    this.setState({
      inputValue,
      size: size2,
      maxLength,
      maxSize,
      iconSpec
    });
  }
  _resetToLastValidDisplayValue() {
    const initialDisplayValue = (this._lastValidValue && this._lastValidValue.displayValue) ?? this._getInitialDisplayValue();
    this.setState({ inputValue: initialDisplayValue });
  }
  _onKeyPress = (e) => {
    if (e.key === Key_enumExports.Key.Escape.valueOf()) {
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
    if (e.key !== Key_enumExports.Key.Enter.valueOf()) {
      UiAdmin.messagePresenter.closeInputFieldMessage();
    }
  };
  _onFocus = (e) => {
    e.target.select();
  };
  render() {
    const { decoration } = this.props;
    const minSize = this.state.size ? this.state.size : 8;
    const style = {
      minWidth: `${minSize * 0.75}em`,
      maxWidth: this.state.maxSize ? `${this.state.maxSize * 0.75}em` : void 0
    };
    const record = this.props.propertyRecord;
    if (!record || !this._formatParams)
      return null;
    const readOnly = !record.isReadonly ? false : true;
    const disabled = !record.isDisabled ? false : true;
    const className = classnames("components-cell-editor", "components-customnumber-editor", this.props.className);
    const inputProps = {
      className,
      style: this.props.style ? this.props.style : style,
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
    const icon = this.state.iconSpec ? reactExports.createElement(Icon, { iconSpec: this.state.iconSpec }) : void 0;
    return reactExports.createElement(LockNumberEditor, { ...inputProps, ref: this._inputElement, id: this.props.propertyRecord?.property.name, icon, decoration });
  }
}
let CustomNumberPropertyEditor$1 = class CustomNumberPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return reactExports.createElement(CustomNumberEditor, null);
  }
  get containerHandlesEscape() {
    return false;
  }
};
const LockNumberEditor = reactExports.forwardRef(function LockNumberEditor2(props, forwardedRef) {
  const { icon, decoration, ...rest } = props;
  if (decoration) {
    return reactExports.createElement(
      InputWithDecorations,
      { size: "small" },
      icon && reactExports.createElement(InputWithDecorations.Icon, { size: "small" }, icon),
      reactExports.createElement(InputWithDecorations.Input, { ...rest, ref: forwardedRef, "data-testid": "components-customnumber-editor", size: "small" }),
      decoration
    );
  }
  if (icon) {
    return reactExports.createElement(IconInput, { ...rest, ref: forwardedRef, icon, "data-testid": "components-customnumber-editor" });
  }
  return reactExports.createElement(Input$1, { ...rest, ref: forwardedRef, "data-testid": "components-customnumber-editor", size: "small" });
});
function isPrimitiveValue(value) {
  return value?.valueFormat === PropertyValueFormat.Primitive;
}
class EnumButtonGroupEditor extends reactExports.Component {
  _btnRefs = /* @__PURE__ */ new Map();
  _divElement = reactExports.createRef();
  state = {
    selectValue: "",
    enumIcons: [],
    choices: []
  };
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
  /** @internal */
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
      enumIcons.fill({ iconSpec: "" });
      if (propertyRecord.property.editor && propertyRecord.property.editor.params) {
        if (propertyRecord.property.editor && propertyRecord.property.editor.params) {
          const bgParams = propertyRecord.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.ButtonGroupData.valueOf());
          if (bgParams) {
            bgParams.buttons.forEach((iconDef, index) => {
              if (index < numChoices) {
                enumIcons[index] = iconDef;
              }
            });
          }
        }
      }
      this.setState({ selectValue, enumIcons, choices });
    }
  }
  _handleButtonClick = (index) => {
    const propertyRecord = this.props.propertyRecord;
    if (this.state.choices && this.state.choices.length > index) {
      const selectValue = this.state.choices[index].value;
      this.setState({
        selectValue
      }, async () => {
        if (propertyRecord && this.props.onCommit) {
          const propertyValue = await this.getPropertyValue();
          if (propertyValue !== void 0) {
            this.props.onCommit({ propertyRecord, newValue: propertyValue });
          }
        }
      });
    }
  };
  getButton(choice, index, disabled) {
    const choiceValue = this.state.choices ? this.state.choices[index].value : 0;
    const isActive = choiceValue === this.state.selectValue ? true : false;
    let isDisabled = disabled;
    const isEnabledFunction = this.state.enumIcons[index].isEnabledFunction;
    if (isEnabledFunction && !isDisabled) {
      isDisabled = !isEnabledFunction();
    }
    const className = classnames("components-enumbuttongroup-button", isDisabled && "nz-is-disabled", isActive && "nz-is-active");
    return reactExports.createElement(
      "button",
      { ref: (btn) => {
        btn && this._btnRefs.set(choiceValue, btn);
      }, "data-testid": choice.label, className, title: choice.label, key: choice.label, onClick: () => this._handleButtonClick(index) },
      reactExports.createElement(Icon, { iconSpec: this.state.enumIcons[index].iconSpec === "" ? reactExports.createElement(SvgPlaceholder, null) : this.state.enumIcons[index].iconSpec })
    );
  }
  render() {
    return reactExports.createElement("div", { className: classnames("components-enumbuttongroup-editor", this.props.className), style: this.props.style, ref: this._divElement, id: this.props.propertyRecord?.property.name }, this.state.choices && this.state.enumIcons.length && this.state.choices.map((choice, index) => this.getButton(choice, index, this.props.propertyRecord?.isDisabled || this.props.propertyRecord?.isReadonly)));
  }
}
class EnumPropertyButtonGroupEditor extends PropertyEditorBase {
  get reactNode() {
    return reactExports.createElement(EnumButtonGroupEditor, null);
  }
}
class EnumEditor extends reactExports.PureComponent {
  _isMounted = false;
  _divElement = reactExports.createRef();
  state = {
    selectValue: "",
    valueIsNumber: false,
    options: [],
    parentDiv: null
  };
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
  _updateSelectValue = (newValue) => {
    if (this._isMounted) {
      let selectValue;
      if (this.state.valueIsNumber)
        selectValue = parseInt(newValue, 10);
      else
        selectValue = newValue;
      this.setState({
        selectValue
      }, async () => {
        if (this.props.propertyRecord && this.props.onCommit) {
          const propertyValue = await this.getPropertyValue();
          if (propertyValue) {
            this.props.onCommit({
              propertyRecord: this.props.propertyRecord,
              newValue: propertyValue
            });
          }
        }
      });
    }
  };
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  /** @internal */
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
    const className = classnames("components-cell-editor", "components-enum-editor", this.props.className);
    const selectValue = this.state.selectValue !== void 0 ? this.state.selectValue.toString() : void 0;
    const minWidthStyle = {
      minWidth: `6em`
    };
    return reactExports.createElement(
      "div",
      { ref: this._divElement },
      reactExports.createElement(Select, { className, style: this.props.style ? this.props.style : minWidthStyle, value: selectValue, onChange: this._updateSelectValue, "data-testid": "components-select-editor", options: this.state.options, triggerProps: {
        id: this.props.propertyRecord?.property.name,
        ref: (el) => {
          if (!this.props.setFocus)
            return;
          el?.focus();
        },
        className: "components-button"
      }, "aria-label": UiComponents$1.translate("editor.enum"), size: "small", disabled: this.props.propertyRecord?.isDisabled || this.props.propertyRecord?.isReadonly })
    );
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
    return reactExports.createElement(EnumEditor, null);
  }
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
    const handleClick = (_e) => {
      if (onClick)
        onClick();
    };
    const classes = classnames("components-icon-swatch", this.props.className);
    return reactExports.createElement(
      "button",
      { ...otherProps, className: classes, style: this.props.style, onClick: handleClick },
      reactExports.createElement(Icon, { iconSpec: icon })
    );
  }
}
class IconPickerButton extends reactExports.PureComponent {
  _target = reactExports.createRef();
  static defaultProps = {
    numColumns: 4
  };
  constructor(props) {
    super(props);
    this.state = { showPopup: false, icon: this.props.icon };
  }
  _togglePopup = () => {
    if (this.props.readonly)
      return;
    this.setState((prevState) => ({ showPopup: !prevState.showPopup }));
  };
  _closePopup = () => {
    this.setState({ showPopup: false });
  };
  _handleIconPicked = (icon) => {
    this.setState({ showPopup: false, icon }, () => {
      if (this.props.onIconChange)
        this.props.onIconChange(icon);
    });
  };
  renderPopup(title) {
    const containerStyle = {
      gridTemplateColumns: `repeat(${this.props.numColumns}, 1fr)`
    };
    return reactExports.createElement(
      "div",
      { className: "components-iconpicker-popup-container" },
      title && reactExports.createElement("h4", null, title),
      reactExports.createElement("div", { "data-testid": "components-iconpicker-popup-icons", className: "components-iconpicker-popup-icons", style: containerStyle }, this.props.icons.map((icon, index) => reactExports.createElement(IconItem, { key: index, icon, onClick: this._handleIconPicked.bind(this, icon) })))
    );
  }
  render() {
    const buttonStyle = { ...this.props.style };
    const buttonClassNames = classnames("components-iconpicker-button", this.props.readonly && "readonly", this.props.className);
    return reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement(
        "button",
        { "data-testid": "components-iconpicker-button", onClick: this._togglePopup, className: buttonClassNames, style: buttonStyle, disabled: this.props.disabled, ref: this._target },
        reactExports.createElement(Icon, { className: "iconpicker-button-sprite", iconSpec: this.state.icon }),
        reactExports.createElement(
          "span",
          { className: "icon" },
          reactExports.createElement(Icon, { iconSpec: reactExports.createElement(SvgChevronDown, null) })
        )
      ),
      reactExports.createElement(Popup, { className: "components-iconpicker-popup", isOpen: this.state.showPopup, position: RelativePosition.BottomLeft, onClose: this._closePopup, target: this._target.current }, this.renderPopup(this.props.dropDownTitle))
    );
  }
}
class IconEditor extends reactExports.PureComponent {
  _control = null;
  _isMounted = false;
  _divElement = reactExports.createRef();
  constructor(props) {
    super(props);
    let icon = "";
    let numColumns = 4;
    const icons = [];
    const record = props.propertyRecord;
    if (record && record.property && record.property.editor && record.property.editor.params) {
      const iconParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.IconListData.valueOf());
      if (iconParams) {
        if (iconParams.iconValue)
          icon = iconParams.iconValue;
        if (iconParams.numColumns)
          numColumns = iconParams.numColumns;
        if (iconParams.iconValues)
          iconParams.iconValues.forEach((i) => icons.push(i));
      }
    }
    this.state = { icon, icons, numColumns };
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
    if (this._control && !this.props.propertyRecord?.isDisabled) {
      this._control.setFocus();
    }
  }
  _onIconChange = (icon) => {
    const propertyRecord = this.props.propertyRecord;
    this.setState({
      icon
    }, async () => {
      if (propertyRecord && this.props.onCommit) {
        const propertyValue = await this.getPropertyValue();
        if (propertyValue) {
          this.props.onCommit({ propertyRecord, newValue: propertyValue });
        }
      }
    });
  };
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
    if (this._isMounted)
      this.setState({ icon: initialValue }, () => {
        if (this.props.setFocus) {
          this.setFocus();
        }
      });
  }
  render() {
    const { icon, icons, numColumns } = this.state;
    return reactExports.createElement(
      "div",
      { className: classnames("components-icon-editor", this.props.className), style: this.props.style, ref: this._divElement },
      reactExports.createElement(IconPickerButton, { ref: (control) => {
        this._control = control;
      }, icon, icons, numColumns, disabled: this.props.propertyRecord?.isDisabled, readonly: this.props.propertyRecord?.isReadonly, onIconChange: this._onIconChange, "data-testid": "components-icon-editor", id: this.props.propertyRecord?.property.name })
    );
  }
}
class IconPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return reactExports.createElement(IconEditor, null);
  }
}
class ImageCheckBoxEditor extends reactExports.PureComponent {
  _isMounted = false;
  _inputElement = reactExports.createRef();
  state = {
    imageOff: "",
    imageOn: "",
    checkboxValue: false
  };
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
  /** @internal */
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
    if (propertyRecord && propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
      const primitiveValue = propertyRecord.value.value;
      checkboxValue = primitiveValue;
    }
    if (propertyRecord && propertyRecord.property && propertyRecord.property.editor && propertyRecord.property.editor.params) {
      const imageCheckBoxParams = propertyRecord.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.CheckBoxImages.valueOf());
      if (imageCheckBoxParams) {
        imageOn = imageCheckBoxParams.imageOn;
        imageOff = imageCheckBoxParams.imageOff;
      }
    }
    this.setState({ imageOn, imageOff, checkboxValue });
  }
  _handleClick = (checked) => {
    this.setState({
      checkboxValue: checked
    }, async () => {
      if (this.props.propertyRecord && this.props.onCommit) {
        const propertyValue = await this.getPropertyValue();
        if (this._isMounted && propertyValue !== void 0) {
          this.props.onCommit({
            propertyRecord: this.props.propertyRecord,
            newValue: propertyValue
          });
        }
      }
    });
  };
  render() {
    const className = classnames("components-cell-editor", "components-imagecheckbox-editor", this.props.className);
    const checked = this.state.checkboxValue;
    const isDisabled = this.props.propertyRecord?.isDisabled || this.props.propertyRecord?.isReadonly;
    return reactExports.createElement(ImageCheckBox, { inputRef: this._inputElement, imageOff: this.state.imageOff, imageOn: this.state.imageOn, className, border: true, style: this.props.style, checked, disabled: isDisabled, onClick: this._handleClick, "data-testid": "components-imagecheckbox-editor", id: this.props.propertyRecord?.property.name });
  }
}
class ImageCheckBoxPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return reactExports.createElement(ImageCheckBoxEditor, null);
  }
}
class NumericInputEditor extends reactExports.PureComponent {
  _isMounted = false;
  _inputElement = reactExports.createRef();
  hasFocus = false;
  // hot used since containerHandlesEnter is false
  state = {
    value: 0
  };
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
  _handleCommit = async () => {
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
  _updateValue = (value, _stringValue) => {
    const newValue = value !== void 0 ? value : 0;
    if (this._isMounted)
      this.setState({
        value: newValue
      }, async () => {
        await this._handleCommit();
      });
  };
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  /** @internal */
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
    let size2;
    let maxSize;
    let maxLength;
    let min;
    let max;
    let step;
    let precision;
    if (record && record.property && record.property.editor && record.property.editor.params) {
      const editorSizeParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.InputEditorSize.valueOf());
      if (editorSizeParams) {
        if (editorSizeParams.size)
          size2 = editorSizeParams.size;
        if (editorSizeParams.maxSize)
          maxSize = editorSizeParams.maxSize;
        if (editorSizeParams.maxLength)
          maxLength = editorSizeParams.maxLength;
      }
      const rangeParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.Range.valueOf());
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
        size: size2,
        maxSize,
        maxLength,
        min,
        max,
        step,
        precision
      });
  }
  render() {
    const { decoration } = this.props;
    const className = classnames("components-cell-editor", "components-numeric-input-editor", this.props.className);
    const minSize = this.state.size ? this.state.size : 8;
    const style = {
      ...this.props.style,
      minWidth: `${minSize * 0.75}em`,
      maxWidth: this.state.maxSize ? `${this.state.maxSize * 0.75}em` : void 0
    };
    return reactExports.createElement(NumericEditor, {
      ref: this._inputElement,
      id: this.props.propertyRecord?.property.name,
      className,
      style,
      value: this.state.value,
      min: this.state.min,
      max: this.state.max,
      step: this.state.step,
      precision: this.state.precision,
      readOnly: this.props.propertyRecord?.isReadonly,
      disabled: this.props.propertyRecord?.isDisabled,
      maxLength: this.state.maxLength,
      onBlur: this.props.onBlur,
      onChange: this._updateValue,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: this.props.setFocus && !this.props.propertyRecord?.isDisabled,
      isControlled: this.props.shouldCommitOnChange,
      decoration
    });
  }
}
let NumericInputPropertyEditor$1 = class NumericInputPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return reactExports.createElement(NumericInputEditor, null);
  }
  get containerHandlesEnter() {
    return false;
  }
};
const NumericEditor = reactExports.forwardRef(function NumericEditor2(props, forwardedRef) {
  const { decoration, ...rest } = props;
  if (decoration) {
    return reactExports.createElement(LockNumericEditor, { ...rest, ref: forwardedRef, decoration });
  }
  return reactExports.createElement(NumberInput, { ref: forwardedRef, ...rest });
});
const LockNumericEditor = reactExports.forwardRef(function LockNumericEditor2(props, forwardedRef) {
  const { decoration, precision, onChange, isControlled, ...rest } = props;
  const handleChange = (event) => {
    const value = event.target.value;
    onChange?.(Number(value), value);
  };
  return reactExports.createElement(
    InputWithDecorations,
    { size: "small" },
    reactExports.createElement(InputWithDecorations.Input, { ...rest, ref: forwardedRef, type: "number", onChange: handleChange, size: "small" }),
    decoration
  );
});
class PopupButton extends reactExports.PureComponent {
  _buttonRef = reactExports.createRef();
  state = {
    showPopup: false
  };
  componentDidMount() {
    if (this.props.setFocus && this._buttonRef.current)
      this._buttonRef.current.focus();
  }
  _togglePopup = (event) => {
    if (this.props.readonly || this.props.disabled)
      return;
    this.setState((prevState) => ({ showPopup: !prevState.showPopup }), () => this.props.onClick && this.props.onClick(event));
  };
  closePopup() {
    this._closePopup();
  }
  _closePopup = () => {
    this.setState({ showPopup: false }, () => {
      this.props.onClose && this.props.onClose();
      if (this._buttonRef.current)
        this._buttonRef.current.focus();
    });
  };
  _handleKeyDown = (event) => {
    if ((event.key === Key_enumExports.Key.ArrowDown.valueOf() || event.key === " " || event.key === Key_enumExports.Key.Enter.valueOf()) && !this.state.showPopup) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ showPopup: true });
    }
  };
  render() {
    const showArrow = this.props.showArrow ?? false;
    const showShadow = this.props.showShadow ?? false;
    const moveFocus = this.props.moveFocus ?? true;
    const showPlaceholder = this.props.label === void 0 && this.props.placeholder !== void 0;
    const classNames = classnames("components-popup-button", this.state.showPopup && "components-popup-expanded", this.props.readonly && "components-readonly", this.props.disabled && "components-disabled");
    const valueClassNames = classnames("components-popup-button-value", showPlaceholder && "components-popup-button-placeholder");
    return reactExports.createElement(
      "div",
      { className: this.props.className },
      reactExports.createElement(
        "div",
        { className: classNames, onClick: this._togglePopup, onKeyDown: this._handleKeyDown, "data-testid": "components-popup-button", tabIndex: 0, ref: this._buttonRef, title: this.props.title, "aria-disabled": this.props.disabled, role: "button", id: this.props.id },
        reactExports.createElement("div", { className: valueClassNames }, this.props.label || this.props.placeholder),
        reactExports.createElement(
          "div",
          { className: "components-popup-button-arrow" },
          reactExports.createElement(
            "div",
            { className: classnames("components-popup-button-arrow-icon", "icon") },
            reactExports.createElement(Icon, { iconSpec: reactExports.createElement(SvgChevronDown, null) })
          )
        )
      ),
      reactExports.createElement(Popup, { className: "components-popup-button-popup", isOpen: this.state.showPopup, position: RelativePosition.Bottom, onClose: this._closePopup, onEnter: this.props.onEnter, closeOnEnter: this.props.closeOnEnter, target: this._buttonRef.current, showArrow, showShadow, moveFocus, focusTarget: this.props.focusTarget, portalTarget: this._buttonRef.current?.ownerDocument.querySelector(".uifw-configurableui-portalContainer") ?? void 0 }, this.props.children)
    );
  }
}
function PopupContent(props) {
  return reactExports.createElement(Div, { ...props, mainClassName: "components-editor-popup-content" });
}
function PopupOkCancelButtons(props) {
  const { translate } = useTranslation();
  return reactExports.createElement(
    "div",
    { className: "components-popup-bottom-buttons" },
    reactExports.createElement(
      Button,
      { className: classnames("components-popup-large-button", "components-popup-ok-button"), "data-testid": "components-popup-ok-button", styleType: "cta", title: translate("dialog.ok"), onClick: props.onOk },
      reactExports.createElement(Icon, { iconSpec: reactExports.createElement(SvgCheckmark, null) })
    ),
    reactExports.createElement(
      Button,
      { className: classnames("components-popup-large-button", "components-popup-cancel-button"), "data-testid": "components-popup-cancel-button", title: translate("dialog.cancel"), onClick: props.onCancel },
      reactExports.createElement(Icon, { iconSpec: reactExports.createElement(SvgRemove, null) })
    )
  );
}
class SliderEditor extends reactExports.PureComponent {
  _isMounted = false;
  _enterKey = false;
  _divElement = reactExports.createRef();
  state = {
    value: 0,
    min: 0,
    max: 100
  };
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
  _handleChange = (values) => {
    const newValue = values[0];
    if (this._isMounted)
      this.setState({
        value: newValue
      });
  };
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  /** @internal */
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  internalFormatTooltip = (value, step = 1) => {
    if (Number.isInteger(step))
      return value.toFixed(0);
    const stepString = step.toString();
    const decimalIndex = stepString.indexOf(".");
    const numDecimals = step.toString().length - (decimalIndex + 1);
    return value.toFixed(numDecimals);
  };
  async setStateFromProps() {
    const record = this.props.propertyRecord;
    let initialValue = 0;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      initialValue = record.value.value;
    }
    let size2;
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
    if (record && record.property && record.property.editor && record.property.editor.params) {
      const sliderParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.Slider.valueOf());
      if (sliderParams) {
        min = sliderParams.minimum;
        max = sliderParams.maximum;
        size2 = sliderParams.size;
        step = sliderParams.step;
        thumbMode = 1 === sliderParams.mode ? "allow-crossing" : "inhibit-crossing";
        trackDisplayMode = !sliderParams.reversed ? "auto" : "odd-segments";
        showTooltip = sliderParams.showTooltip;
        tooltipBelow = sliderParams.tooltipBelow;
        formatTooltip = sliderParams.formatTooltip;
        minLabel = !sliderParams.showMinMax ? "" : sliderParams.minIconSpec ? reactExports.createElement(Icon, { iconSpec: sliderParams.minIconSpec }) : void 0;
        maxLabel = !sliderParams.showMinMax ? "" : sliderParams.maxIconSpec ? reactExports.createElement(Icon, { iconSpec: sliderParams.maxIconSpec }) : void 0;
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
            tickLabels = sliderParams.getTickValues().map((val) => sliderParams.formatTick ? sliderParams.formatTick(val) : this.internalFormatTooltip(val, step));
          }
        }
      }
    }
    if (this._isMounted)
      this.setState({
        value: initialValue,
        size: size2,
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
  _handleEnter = async () => {
    this._enterKey = true;
    await this._handleCommit();
  };
  _handleClose = async () => {
    if (this._enterKey) {
      this._enterKey = false;
    } else {
      if (this.props.onCancel)
        this.props.onCancel();
    }
  };
  _handleOk = async (_event) => {
    await this._handleCommit();
  };
  _handleCancel = (_event) => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };
  _handleCommit = async () => {
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
  tooltipProps = (_index, val) => {
    const content = this.state.formatTooltip ? this.state.formatTooltip(val) : this.internalFormatTooltip(val, this.state.step);
    return {
      placement: this.state.tooltipBelow ? "bottom" : "top",
      content,
      visible: this.state.showTooltip
    };
  };
  render() {
    const className = classnames("components-cell-editor", "components-slider-editor", this.props.className);
    const minSize = this.state.size ? this.state.size : 100;
    const style = {
      ...this.props.style,
      minWidth: `${minSize}px`
    };
    const tickProps = {
      "data-testid": "components-tick"
    };
    const popupContent = reactExports.createElement(Slider, { className: "components-slider-editor-slider", style, values: [this.state.value], min: this.state.min, max: this.state.max, step: this.state.step, thumbMode: this.state.thumbMode, trackDisplayMode: this.state.trackDisplayMode, disabled: this.props.propertyRecord?.isDisabled, minLabel: this.state.minLabel, maxLabel: this.state.maxLabel, tooltipProps: this.tooltipProps, tickLabels: this.state.tickLabels, tickProps, onChange: this._handleChange });
    return reactExports.createElement(
      "div",
      { className, ref: this._divElement },
      reactExports.createElement(
        PopupButton,
        { id: this.props.propertyRecord?.property.name, label: this.state.value, onClose: this._handleClose, onEnter: this._handleEnter, setFocus: this.props.setFocus, disabled: this.props.propertyRecord?.isDisabled, readonly: this.props.propertyRecord?.isReadonly },
        reactExports.createElement(
          PopupContent,
          null,
          popupContent,
          reactExports.createElement(PopupOkCancelButtons, { onOk: this._handleOk, onCancel: this._handleCancel })
        )
      )
    );
  }
}
class SliderPropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return reactExports.createElement(SliderEditor, null);
  }
}
const DEFAULT_ROWS = 3;
class TextareaEditor extends reactExports.PureComponent {
  _isMounted = false;
  _divElement = reactExports.createRef();
  _textAreaElement = reactExports.createRef();
  state = {
    inputValue: "",
    rows: DEFAULT_ROWS
  };
  async getPropertyValue() {
    const record = this.props.propertyRecord;
    let propertyValue;
    if (record && record.value.valueFormat === PropertyValueFormat.Primitive) {
      propertyValue = await TypeConverterManager.getConverter(record.property.typename).convertFromStringToPropertyValue(this.state.inputValue, record);
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
  _updateTextareaValue = (e) => {
    if (this._isMounted)
      this.setState({
        inputValue: e.target.value
      });
  };
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  /** @internal */
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
      initialValue = await TypeConverterManager.getConverter(record.property.typename).convertPropertyToString(record.property, value);
    }
    let size2;
    let maxSize;
    let maxLength;
    let rows = DEFAULT_ROWS;
    if (record && record.property && record.property.editor && record.property.editor.params) {
      const editorSizeParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.InputEditorSize.valueOf());
      if (editorSizeParams) {
        if (editorSizeParams.size)
          size2 = editorSizeParams.size;
        if (editorSizeParams.maxSize)
          maxSize = editorSizeParams.maxSize;
        if (editorSizeParams.maxLength)
          maxLength = editorSizeParams.maxLength;
      }
      const multilineParams = record.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.MultilineText.valueOf());
      if (multilineParams) {
        rows = multilineParams.rows;
      }
    }
    if (this._isMounted)
      this.setState({
        inputValue: initialValue,
        size: size2,
        maxSize,
        maxLength,
        rows
      });
  }
  _handleOk = async (_event) => {
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
  _handleCancel = (_event) => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };
  render() {
    const className = classnames("components-cell-editor", "components-textarea-editor", this.props.className);
    const minSize = this.state.size ? this.state.size : 8;
    const style = {
      ...this.props.style,
      minWidth: `${minSize * 0.75}em`,
      maxWidth: this.state.maxSize ? `${this.state.maxSize * 0.75}em` : void 0
    };
    const textareaProps = {
      className: "components-textarea-editor-textarea",
      style,
      rows: this.state.rows,
      readOnly: this.props.propertyRecord?.isReadonly,
      disabled: this.props.propertyRecord?.isDisabled,
      maxLength: this.state.maxLength,
      value: this.state.inputValue,
      onChange: this._updateTextareaValue,
      autoFocus: this.props.setFocus && !this.props.propertyRecord?.isDisabled
    };
    textareaProps["aria-label"] = UiComponents$1.translate("editor.textarea");
    return reactExports.createElement(
      "div",
      { className, ref: this._divElement },
      reactExports.createElement(
        PopupButton,
        { id: this.props.propertyRecord?.property.name, label: this.state.inputValue, closeOnEnter: false, setFocus: this.props.setFocus, focusTarget: this._textAreaElement },
        reactExports.createElement(
          PopupContent,
          null,
          reactExports.createElement(Textarea, { ...textareaProps, "data-testid": "components-textarea-editor", ref: this._textAreaElement }),
          reactExports.createElement(PopupOkCancelButtons, { onOk: this._handleOk, onCancel: this._handleCancel })
        )
      )
    );
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
    return reactExports.createElement(TextareaEditor, null);
  }
}
class ToggleEditor extends reactExports.PureComponent {
  _isMounted = false;
  _inputElement = reactExports.createRef();
  state = {
    toggleValue: false,
    isLoaded: false
  };
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
  _updateToggleValue = (e) => {
    if (this._isMounted) {
      if (this._isMounted) {
        const toggleValue = !!e.target.checked;
        this.setState({
          toggleValue
        }, async () => {
          if (this.props.propertyRecord && this.props.onCommit) {
            const propertyValue = await this.getPropertyValue();
            if (propertyValue !== void 0) {
              this.props.onCommit({
                propertyRecord: this.props.propertyRecord,
                newValue: propertyValue
              });
            }
          }
        });
      }
    }
  };
  componentDidMount() {
    this._isMounted = true;
    void this.setStateFromProps();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  /** @internal */
  componentDidUpdate(prevProps) {
    if (this.props.propertyRecord !== prevProps.propertyRecord) {
      void this.setStateFromProps();
    }
  }
  async setStateFromProps() {
    const { propertyRecord } = this.props;
    let toggleValue = false;
    if (propertyRecord && propertyRecord.value.valueFormat === PropertyValueFormat.Primitive) {
      const primitiveValue = propertyRecord.value.value;
      toggleValue = primitiveValue;
    }
    if (this._isMounted)
      this.setState({
        toggleValue,
        isLoaded: true
      });
  }
  render() {
    if (!this.state.isLoaded) {
      return null;
    }
    const className = classnames("components-cell-editor", "components-toggle-editor", this.props.className);
    const isChecked = this.state.toggleValue;
    return reactExports.createElement(ToggleSwitch, { ref: this._inputElement, onBlur: this.props.onBlur, className, style: this.props.style, checked: isChecked, readOnly: this.props.propertyRecord?.isReadonly, disabled: this.props.propertyRecord?.isDisabled, onChange: this._updateToggleValue, "data-testid": "components-toggle-editor", id: this.props.propertyRecord?.property.name, autoFocus: this.props.setFocus });
  }
}
class TogglePropertyEditor extends PropertyEditorBase {
  get containerHandlesBlur() {
    return false;
  }
  get reactNode() {
    return reactExports.createElement(ToggleEditor, null);
  }
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
      return minIndent + this.getLabelOffset(indentation - 1, orientation, width, columnRatio, minColumnLabelWidth);
    return currentSize - minColumnLabelWidth;
  }
  static createNewDisplayValue(orientation, propertyRecord, indentation, propertyValueRendererManager, isExpanded, onExpansionToggled, onHeightChanged, highlight) {
    const highlightCallback = highlight?.applyOnValue ? CommonPropertyRenderer.createHighlightCallback(highlight, propertyRecord) : void 0;
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
      displayValue = propertyValueRendererManager.render(propertyRecord, rendererContext);
    else
      displayValue = PropertyValueRendererManager.defaultManager.render(propertyRecord, rendererContext);
    if (orientation === Orientation.Vertical)
      displayValue = reactExports.createElement("span", { style: {
        paddingLeft: CommonPropertyRenderer.getLabelOffset(indentation, orientation)
      } }, displayValue);
    return displayValue;
  }
  static createHighlightCallback(highlight, propertyRecord) {
    const activeMatch = highlight.activeHighlight;
    const propertyName = activeMatch?.highlightedItemIdentifier;
    const matchIndex = activeMatch?.highlightIndex ?? 0;
    let labelMatches;
    if (highlight.applyOnLabel) {
      labelMatches = countMatchesInString(propertyRecord.property.displayLabel.toLowerCase(), highlight.highlightedText);
    } else {
      labelMatches = 0;
    }
    const activeMatchIndex = propertyRecord.property.name === propertyName && matchIndex - labelMatches >= 0 ? matchIndex - labelMatches : void 0;
    const highlightCallback = (text2) => reactExports.createElement(HighlightedText, { text: text2, activeMatchIndex, searchText: highlight.highlightedText });
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
    return reactExports.createElement(
      reactExports.Fragment,
      null,
      reactExports.createElement("span", { className: classnames("components-property-label-renderer", this.props.renderColon && "components-property-label-renderer-colon"), title }, this.props.children)
    );
  }
}
class NonPrimitivePropertyLabelRenderer extends reactExports.PureComponent {
  _onClick = () => {
    if (this.props.isExpanded)
      this.props.onCollapse();
    else
      this.props.onExpand();
  };
  render() {
    return reactExports.createElement(
      "div",
      { style: PropertyLabelRenderer.getStyle(this.props.offset), className: `components-nonprimitive-property-label-renderer ${this.props.className ? this.props.className : ""}`, onClick: this._onClick, role: "presentation" },
      reactExports.createElement(
        "div",
        { className: this.props.isExpanded ? "components-expanded" : "" },
        reactExports.createElement(SvgChevronRight, null)
      ),
      reactExports.createElement(PropertyLabelRenderer, { renderColon: this.props.renderColon }, this.props.children)
    );
  }
}
class PrimitivePropertyLabelRenderer extends reactExports.PureComponent {
  render() {
    const { className, offset, children, ...rest } = this.props;
    return reactExports.createElement(
      "span",
      { className: `components-primitive-property-label-renderer ${className ? className : ""}`, style: PropertyLabelRenderer.getStyle(offset) },
      reactExports.createElement(PropertyLabelRenderer, { ...rest }, children)
    );
  }
}
class ActionButtonList extends reactExports.PureComponent {
  getClassName(orientation) {
    return orientation === Orientation.Horizontal ? "components-property-action-button-list--horizontal" : "components-property-action-button-list--vertical";
  }
  render() {
    return reactExports.createElement("div", { className: this.getClassName(this.props.orientation) }, this.props.actionButtonRenderers.map((renderer, index) => reactExports.createElement(ActionButtonContainer, { key: index, renderer, rendererProps: {
      property: this.props.property,
      isPropertyHovered: this.props.isPropertyHovered
    } })));
  }
}
function ActionButtonContainer(props) {
  const actionButton = props.renderer(props.rendererProps);
  if (!actionButton)
    return null;
  return reactExports.createElement("div", { className: "components-action-button-container" }, actionButton);
}
class PropertyGridColumnStyleProvider {
  _minLabelWidth = 0;
  _minValueWidth = 0;
  _actionButtonWidth = 0;
  _isMinimumColumnSizeEnabled;
  constructor(columnInfo) {
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
        return this.getHorizontalStyle(needActionButtons, ratio, needElementSeparator);
      case Orientation.Vertical:
        return this.getVerticalStyle(needActionButtons);
      default:
        const unhandledOrientationType = orientation;
        throw new Error(`Unhandled orientation type: ${String(unhandledOrientationType)}. Was new orientation added ? `);
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
    this.state = {
      isHovered: false
    };
  }
  _onClick = () => {
    if (this.props.onClick)
      this.props.onClick(this.props.propertyRecord, this.props.uniqueKey);
  };
  _onMouseEnter = () => {
    if (this.props.isHoverable)
      this.setState({ isHovered: true });
  };
  _onMouseLeave = () => {
    if (this.props.isHoverable)
      this.setState({ isHovered: false });
  };
  _onContextMenu = (e) => {
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
    const columnsStyleProvider = new PropertyGridColumnStyleProvider(this.props.columnInfo);
    const renderValueElement = !!(this.props.valueElement || this.props.valueElementRenderer);
    return reactExports.createElement(
      "div",
      { style: columnsStyleProvider.getStyle(this.props.orientation, needActionButtons, ratio, needElementSeparator), className: this.getClassName(this.props), onClick: this._onClick, onContextMenu: this._onContextMenu, onMouseEnter: this._onMouseEnter, onMouseLeave: this._onMouseLeave, role: "presentation" },
      reactExports.createElement("div", { className: "components-property-record-label" }, this.props.labelElement),
      needElementSeparator ? (
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        reactExports.createElement(ElementSeparator, { style: { margin: 0 }, movableArea: this.props.width, onRatioChanged: this.props.onColumnRatioChanged, ratio, orientation: this.props.orientation, isResizeHandleHovered: this.props.isResizeHandleHovered, onResizeHandleHoverChanged: this.props.onResizeHandleHoverChanged, isResizeHandleBeingDragged: this.props.isResizeHandleBeingDragged, onResizeHandleDragChanged: this.props.onResizeHandleDragChanged })
      ) : void 0,
      renderValueElement ? reactExports.createElement(
        "div",
        { className: "components-property-record-value" },
        reactExports.createElement("span", null, this.props.valueElementRenderer ? this.props.valueElementRenderer() : this.props.valueElement)
      ) : void 0,
      this.props.actionButtonRenderers ? reactExports.createElement(ActionButtonList, { orientation: this.props.orientation, property: this.props.propertyRecord, isPropertyHovered: this.state.isHovered, actionButtonRenderers: this.props.actionButtonRenderers }) : void 0
    );
  }
}
function CustomizablePropertyRenderer(props) {
  const { indentation, highlight, ...passthroughProps } = props;
  const displayLabel = props.propertyRecord.property.displayLabel;
  const offset = CommonPropertyRenderer.getLabelOffset(indentation, passthroughProps.orientation, passthroughProps.width, passthroughProps.columnRatio, passthroughProps.columnInfo?.minLabelWidth);
  const activeMatchIndex = props.propertyRecord.property.name === highlight?.activeHighlight?.highlightedItemIdentifier ? highlight.activeHighlight.highlightIndex : void 0;
  const label = highlight ? HighlightedText({
    text: displayLabel,
    searchText: highlight.highlightedText,
    activeMatchIndex
  }) : displayLabel;
  return reactExports.createElement(PropertyView, { ...passthroughProps, labelElement: reactExports.createElement(PrimitivePropertyLabelRenderer, { offset, renderColon: props.orientation === Orientation.Horizontal, tooltip: displayLabel }, label) });
}
class PrimitivePropertyRenderer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(CustomizablePropertyRenderer, { ...this.props });
  }
}
const PropertyRenderer = (props) => {
  const { translate } = useTranslation();
  const [displayValue, setDisplayValue] = reactExports.useState(() => translate("general.loading"));
  const {
    isEditing,
    orientation,
    propertyRecord,
    indentation,
    propertyValueRendererManager,
    onEditCommit,
    onEditCancel,
    alwaysShowEditor,
    isPropertyEditingEnabled,
    onClick,
    uniqueKey,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    editorSystem,
    ...restProps
  } = props;
  const onCommit = reactExports.useCallback((args) => {
    if (onEditCommit)
      onEditCommit(args);
  }, [onEditCommit]);
  const onCancel = reactExports.useCallback(() => {
    if (onEditCancel)
      onEditCancel();
  }, [onEditCancel]);
  const alwaysShowsEditor = props.alwaysShowEditor ? props.alwaysShowEditor(props.propertyRecord) : false;
  reactExports.useEffect(() => {
    if (isEditing || alwaysShowsEditor && isPropertyEditingEnabled) {
      setDisplayValue(reactExports.createElement(PropertyRecordEditor, {
        propertyRecord,
        onCommit,
        onCancel,
        setFocus: isEditing,
        onClick: () => onClick?.(propertyRecord, uniqueKey),
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        editorSystem
      }));
      return;
    }
    setDisplayValue(CommonPropertyRenderer.createNewDisplayValue(orientation, propertyRecord, indentation, propertyValueRendererManager));
  }, [
    orientation,
    propertyRecord,
    indentation,
    propertyValueRendererManager,
    onCommit,
    onCancel,
    isEditing,
    alwaysShowsEditor,
    isPropertyEditingEnabled,
    onClick,
    uniqueKey,
    editorSystem
  ]);
  const primitiveRendererProps = {
    ...restProps,
    onClick,
    uniqueKey,
    propertyRecord,
    orientation,
    indentation,
    valueElement: displayValue
  };
  switch (props.propertyRecord.value.valueFormat) {
    case PropertyValueFormat.Primitive:
      return reactExports.createElement(PrimitivePropertyRenderer, { ...primitiveRendererProps });
    case PropertyValueFormat.Array:
      if (props.propertyRecord.value.valueFormat === PropertyValueFormat.Array && props.propertyRecord.value.items.length === 0)
        return reactExports.createElement(PrimitivePropertyRenderer, { ...primitiveRendererProps });
    // eslint-disable-next-line no-fallthrough
    case PropertyValueFormat.Struct:
      return reactExports.createElement(NonPrimitivePropertyRenderer, { isCollapsible: true, ...primitiveRendererProps });
  }
};
PropertyRenderer.getLabelOffset = (indentation, orientation, width, columnRatio, minColumnLabelWidth) => {
  return CommonPropertyRenderer.getLabelOffset(indentation, orientation, width, columnRatio, minColumnLabelWidth);
};
class NonPrimitivePropertyRenderer extends reactExports.Component {
  state = {
    /** If it's not collapsible, that means it's expanded by default and can't be collapsed */
    isExpanded: !this.props.isCollapsible || this.props.propertyRecord.autoExpand
  };
  constructor(props) {
    super(props);
  }
  _onExpanded = () => {
    this.setState({ isExpanded: true });
  };
  _onCollapsed = () => {
    this.setState({ isExpanded: false });
  };
  getLabel(props, state) {
    const { orientation, indentation, width, columnRatio, columnInfo } = props;
    const minLabelWidth = columnInfo?.minLabelWidth;
    const offset = CommonPropertyRenderer.getLabelOffset(indentation, orientation, width, columnRatio, minLabelWidth);
    let displayLabel = props.propertyRecord.property.displayLabel;
    if (this.props.propertyRecord.value.valueFormat === PropertyValueFormat.Array)
      displayLabel = `${displayLabel} (${this.props.propertyRecord.value.items.length})`;
    return reactExports.createElement(NonPrimitivePropertyLabelRenderer, { isExpanded: !!state.isExpanded, onExpand: this._onExpanded, onCollapse: this._onCollapsed, offset, renderColon: false }, displayLabel);
  }
  overrideArrayChildrenNames(items) {
    const modifiedProperties = items.map((item, index) => {
      const newProperty = { ...item.property };
      newProperty.displayLabel = `[${index + 1}]`;
      newProperty.name = `${newProperty.name}_${index}`;
      return new PropertyRecord(item.value, newProperty);
    });
    return modifiedProperties;
  }
  _renderPropertyForItem = (item) => {
    const prefix = this.props.uniqueKey ? this.props.uniqueKey : this.props.propertyRecord.property.name;
    const uniqueKey = `${prefix}_${item.property.name}`;
    return (
      // does not use editing capabilities, so editorSystem is not needed --- IGNORE ---
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      reactExports.createElement(PropertyRenderer, { key: uniqueKey, uniqueKey, propertyRecord: item, indentation: this.props.indentation ? this.props.indentation + 1 : 1, orientation: this.props.orientation, columnRatio: this.props.columnRatio, actionButtonRenderers: this.props.actionButtonRenderers, onColumnRatioChanged: this.props.onColumnRatioChanged, width: this.props.width, isResizeHandleHovered: this.props.isResizeHandleHovered, onResizeHandleHoverChanged: this.props.onResizeHandleHoverChanged, isResizeHandleBeingDragged: this.props.isResizeHandleBeingDragged, onResizeHandleDragChanged: this.props.onResizeHandleDragChanged, columnInfo: this.props.columnInfo })
    );
  };
  render() {
    let items = this.props.propertyRecord.getChildrenRecords();
    if (this.props.propertyRecord.value.valueFormat === PropertyValueFormat.Array)
      items = this.overrideArrayChildrenNames(items);
    const { indentation, ...props } = this.props;
    return reactExports.createElement(
      reactExports.Fragment,
      null,
      this.props.isCollapsible ? reactExports.createElement(PropertyView, { labelElement: this.getLabel(this.props, this.state), ...props }) : void 0,
      this.state.isExpanded ? items.map(this._renderPropertyForItem) : void 0
    );
  }
}
class TableNonPrimitiveValueRenderer extends reactExports.PureComponent {
  // private _buttonRef = React.createRef<HTMLButtonElement>();
  _onClick = () => {
    if (!this.props.onDialogOpen)
      return;
    const dialogState = {
      content: this.props.dialogContents,
      title: this.props.dialogTitle
    };
    this.props.onDialogOpen(dialogState);
  };
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
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      reactExports.createElement(
        UnderlinedButton,
        {
          // ref={this._buttonRef}
          className: "components-table-value-button",
          onClick: this._onClick,
          // onMouseEnter={this._showTooltip}
          // onMouseLeave={this._hideTooltip}
          title: `View ${this.props.buttonLabel} in more detail.`
        },
        this.props.buttonLabel
      )
    );
  }
}
class TableArrayValueRenderer extends reactExports.PureComponent {
  getButtonLabel(props) {
    const value = props.propertyRecord.value;
    return value.items.length !== 0 ? `${value.itemsTypeName}[${value.items.length}]` : "[]";
  }
  getDialogContents() {
    return reactExports.createElement(NonPrimitivePropertyRenderer, { uniqueKey: `table_array_${this.props.propertyRecord.property.name}`, orientation: this.props.orientation, propertyRecord: this.props.propertyRecord });
  }
  render() {
    const typeName = this.props.propertyRecord.value.itemsTypeName;
    return reactExports.createElement(TableNonPrimitiveValueRenderer, { buttonLabel: this.getButtonLabel(this.props), dialogContents: this.getDialogContents(), dialogTitle: `Array of type "${typeName}"`, onDialogOpen: this.props.onDialogOpen });
  }
}
const withContextStyle = (node, context) => {
  if (!context || !context.style)
    return node;
  return reactExports.createElement("span", { style: context.style }, node);
};
class ArrayPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Array;
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(record, context) {
    const recordItems = record.value.items;
    if (context && context.containerType === PropertyContainerType.Table) {
      return withContextStyle(reactExports.createElement(TableArrayValueRenderer, { propertyRecord: record, onDialogOpen: context.onDialogOpen, orientation: context.orientation ? context.orientation : Orientation.Horizontal }), context);
    }
    if (context && context.containerType === PropertyContainerType.PropertyPane) {
      return withContextStyle("", context);
    }
    return withContextStyle(recordItems.length !== 0 ? `${record.value.itemsTypeName}[${recordItems.length}]` : `${record.value.itemsTypeName}[]`, context);
  }
}
class MergedPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return !!record.isMerged && record.value.valueFormat === PropertyValueFormat.Primitive;
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(record, context) {
    const displayValue = record.value.displayValue;
    const text2 = displayValue?.startsWith("--") ? displayValue : "--";
    return withContextStyle(reactExports.createElement(reactExports.Fragment, null, text2), context);
  }
}
class PropertyGridCommons {
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
  static handleLinkClick(text2) {
    const linksArray = matchLinks(text2);
    if (linksArray.length <= 0)
      return;
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
    return matchLinks(value).map((linkInfo) => {
      return { start: linkInfo.index, end: linkInfo.lastIndex };
    });
  };
}
function renderTag(text2, links, highlight) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    reactExports.createElement(UnderlinedButton, { onClick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      links.onClick(text2);
    } }, highlight ? highlight(text2) : text2)
  );
}
function matchComparison(matchA, matchB) {
  if (matchA.start > matchB.start)
    return 1;
  if (matchB.start > matchA.start)
    return -1;
  return 0;
}
function renderTextPart(text2, highlight) {
  return highlight ? highlight(text2) : text2;
}
function renderText(text2, links, highlight) {
  const { matcher } = links;
  if (!matcher)
    return renderTag(text2, links, highlight);
  const matches = matcher(text2);
  matches.sort(matchComparison);
  const parts = [];
  let lastIndex = 0;
  for (const match of matches) {
    if (lastIndex > match.start)
      throw new BentleyError(BentleyStatus.ERROR, "renderText: matcher returned overlapping matches");
    if (lastIndex < match.start)
      parts.push(renderTextPart(text2.substring(lastIndex, match.start), highlight));
    const anchorText = text2.substring(match.start, match.end);
    parts.push(renderTag(anchorText, links, highlight));
    lastIndex = match.end;
  }
  if (text2.length > lastIndex)
    parts.push(renderTextPart(text2.substring(lastIndex), highlight));
  return parts.map((part, index) => reactExports.createElement(reactExports.Fragment, { key: index }, part));
}
function renderHighlighted(text2, highlight) {
  return highlight(text2);
}
const renderLinks = (text2, links, highlight) => {
  return renderText(text2, links, highlight);
};
const withLinks = (stringValue, links, highlight) => {
  if (links)
    return renderLinks(stringValue, links, highlight);
  if (highlight)
    return renderHighlighted(stringValue, highlight);
  return stringValue;
};
function LinksRenderer(props) {
  return reactExports.createElement(reactExports.Fragment, null, withLinks(props.value, props.links, props.highlighter));
}
function convertRecordToString(record) {
  const primitive = record.value;
  return primitive.displayValue || TypeConverterManager.getConverter(record.property.typename, record.property.converter?.name).convertPropertyToString(record.property, primitive.value);
}
class PrimitivePropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Primitive;
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(record, context) {
    return reactExports.createElement(PrimitivePropertyValueRendererImpl, { record, context, stringValueCalculator: convertRecordToString });
  }
}
function PrimitivePropertyValueRendererImpl(props) {
  const { stringValue, element } = useRenderedStringValue(props.record, props.stringValueCalculator, props.context, props.linksHandler);
  return reactExports.createElement("span", { style: props.context?.style, title: stringValue }, element);
}
const DEFAULT_LINKS_HANDLER = {
  matcher: PropertyGridCommons.getLinks,
  onClick: PropertyGridCommons.handleLinkClick
};
function useRenderedStringValue(record, stringValueCalculator, context, linksHandler) {
  const stringValue = useAsyncValue(stringValueCalculator(record));
  const el = stringValue === void 0 ? context?.defaultValue : reactExports.createElement(LinksRenderer, { value: stringValue, links: record.links ?? linksHandler ?? DEFAULT_LINKS_HANDLER, highlighter: context?.textHighlighter });
  return { stringValue, element: el };
}
class TableStructValueRenderer extends reactExports.PureComponent {
  getButtonLabel(props) {
    return `{${props.propertyRecord.property.typename}}`;
  }
  getDialogContents() {
    return reactExports.createElement(NonPrimitivePropertyRenderer, { uniqueKey: `table_struct_${this.props.propertyRecord.property.name}`, orientation: this.props.orientation, propertyRecord: this.props.propertyRecord });
  }
  render() {
    return reactExports.createElement(TableNonPrimitiveValueRenderer, { buttonLabel: this.getButtonLabel(this.props), dialogTitle: `Struct of type "${this.props.propertyRecord.property.typename}"`, dialogContents: this.getDialogContents(), onDialogOpen: this.props.onDialogOpen });
  }
}
class StructPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Struct;
  }
  /** Method that returns a JSX representation of PropertyRecord */
  render(record, context) {
    if (context && context.containerType === PropertyContainerType.Table) {
      return withContextStyle(reactExports.createElement(TableStructValueRenderer, { propertyRecord: record, onDialogOpen: context.onDialogOpen, orientation: context.orientation ? context.orientation : Orientation.Horizontal }), context);
    }
    if (context && context.containerType === PropertyContainerType.PropertyPane) {
      return withContextStyle("", context);
    }
    return withContextStyle(`{${record.property.typename}}`, context);
  }
}
var PropertyContainerType;
(function(PropertyContainerType2) {
  PropertyContainerType2["PropertyPane"] = "pane";
  PropertyContainerType2["Table"] = "table";
  PropertyContainerType2["Tree"] = "tree";
})(PropertyContainerType || (PropertyContainerType = {}));
class PropertyValueRendererManager {
  static _defaultRendererManager;
  _propertyRenderers = /* @__PURE__ */ new Map();
  _defaultPrimitiveValueRenderer = new PrimitivePropertyValueRenderer();
  _defaultArrayValueRenderer = new ArrayPropertyValueRenderer();
  _defaultStructValueRenderer = new StructPropertyValueRenderer();
  _defaultMergedValueRenderer = new MergedPropertyValueRenderer();
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
      throw Error(`PropertyValueRendererManager.registerRenderer error: type '${rendererType}' already registered to '${propertyRenderer.constructor.name}'`);
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
var FilteringInputStatus;
(function(FilteringInputStatus2) {
  FilteringInputStatus2[FilteringInputStatus2["ReadyToFilter"] = 0] = "ReadyToFilter";
  FilteringInputStatus2[FilteringInputStatus2["FilteringInProgress"] = 1] = "FilteringInProgress";
  FilteringInputStatus2[FilteringInputStatus2["FilteringFinished"] = 2] = "FilteringFinished";
})(FilteringInputStatus || (FilteringInputStatus = {}));
reactExports.forwardRef(function ForwardRefParsedInput({ initialValue, formatValue, parseString, readonly, className, style, onChange }, ref) {
  const currentValueRef = reactExports.useRef(initialValue);
  const isMountedRef = reactExports.useRef(false);
  const lastFormattedValueRef = reactExports.useRef(formatValue(initialValue));
  const [formattedValue, setFormattedValue] = reactExports.useState(() => lastFormattedValueRef.current);
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
  const handleChange = reactExports.useCallback((event) => {
    setFormattedValue(event.currentTarget.value);
  }, []);
  const updateValueFromString = reactExports.useCallback((strVal) => {
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
  }, [formatValue, onChange, parseString]);
  const handleBlur = reactExports.useCallback((event) => {
    updateValueFromString(event.target.value);
  }, [updateValueFromString]);
  const handleKeyDown = reactExports.useCallback((event) => {
    if (event.key === Key_enumExports.Key.Enter.valueOf()) {
      updateValueFromString(event.currentTarget.value);
      event.preventDefault();
    }
    if (event.key === Key_enumExports.Key.Escape.valueOf()) {
      setFormattedValue(formatValue(currentValueRef.current));
      setHasBadInput(false);
      event.preventDefault();
    }
  }, [formatValue, updateValueFromString]);
  const classNames = classnames(className, "components-parsed-input", hasBadInput && "components-parsed-input-has-error");
  return reactExports.createElement(Input$1, { "data-testid": "components-parsed-input", ref, style, className: classNames, onKeyDown: handleKeyDown, onBlur: handleBlur, onChange: handleChange, value: formattedValue, disabled: readonly, size: "small" });
});
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
    return reactExports.createElement(PrimitivePropertyValueRendererImpl, { record, context, stringValueCalculator: convertRecordToString, linksHandler: URI_PROPERTY_LINK_HANDLER });
  }
}
const URI_PROPERTY_LINK_HANDLER = {
  onClick: openLink
};
const PropertyFilterBuilderContext = reactExports.createContext(null);
const PropertyFilterBuilderRuleRenderingContext = reactExports.createContext({});
var PropertyFilterRuleGroupOperator;
(function(PropertyFilterRuleGroupOperator2) {
  PropertyFilterRuleGroupOperator2["And"] = "and";
  PropertyFilterRuleGroupOperator2["Or"] = "or";
})(PropertyFilterRuleGroupOperator || (PropertyFilterRuleGroupOperator = {}));
var PropertyFilterRuleOperator;
(function(PropertyFilterRuleOperator2) {
  PropertyFilterRuleOperator2["IsTrue"] = "is-true";
  PropertyFilterRuleOperator2["IsFalse"] = "is-false";
  PropertyFilterRuleOperator2["IsEqual"] = "is-equal";
  PropertyFilterRuleOperator2["IsNotEqual"] = "is-not-equal";
  PropertyFilterRuleOperator2["Greater"] = "greater";
  PropertyFilterRuleOperator2["GreaterOrEqual"] = "greater-or-equal";
  PropertyFilterRuleOperator2["Less"] = "less";
  PropertyFilterRuleOperator2["LessOrEqual"] = "less-or-equal";
  PropertyFilterRuleOperator2["Like"] = "like";
  PropertyFilterRuleOperator2["IsNull"] = "is-null";
  PropertyFilterRuleOperator2["IsNotNull"] = "is-not-null";
})(PropertyFilterRuleOperator || (PropertyFilterRuleOperator = {}));
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
  const availableOperators = reactExports.useMemo(() => getPropertyFilterBuilderOperators(property2), [property2]);
  const selectedOperator = availableOperators.find((op) => op === operator) ?? availableOperators[0];
  reactExports.useEffect(() => {
    onChange(selectedOperator);
  }, [onChange, selectedOperator]);
  const availableOptions = reactExports.useMemo(() => availableOperators.map((op) => ({
    value: op,
    label: getLabel2(op)
  })), [availableOperators, getLabel2]);
  return reactExports.createElement(
    "div",
    { className: "fb-row-condition" },
    reactExports.createElement(Select, { options: availableOptions, value: selectedOperator, onChange, size: "small" })
  );
}
function usePropertyFilterBuilderOperatorLabels() {
  const { translate } = useTranslation();
  return reactExports.useCallback((operator) => {
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
  }, [translate]);
}
function PropertyFilterBuilderRuleProperty(props) {
  const { selectedProperty, properties, onSelectedPropertyChanged, propertyRenderer, isDisabled } = props;
  const { translate } = useTranslation();
  const selectOptions = reactExports.useMemo(() => properties.map((property2) => ({
    id: property2.name,
    label: property2.displayLabel,
    value: property2.name
  })), [properties]);
  const onPropertyChanged = reactExports.useCallback((name) => {
    onSelectedPropertyChanged(properties.find((property2) => property2.name === name));
  }, [properties, onSelectedPropertyChanged]);
  reactExports.useEffect(() => {
    const currentSelectedProperty = properties.find((property2) => property2.name === selectedProperty?.name);
    if (currentSelectedProperty?.name !== selectedProperty?.name)
      onSelectedPropertyChanged(currentSelectedProperty);
  }, [properties, selectedProperty, onSelectedPropertyChanged]);
  const itemRenderer = reactExports.useCallback((selectOption, { isSelected, id }) => {
    return reactExports.createElement(MenuItem, { key: id, id, isSelected }, propertyRenderer ? propertyRenderer(selectOption.value) : selectOption.label);
  }, [propertyRenderer]);
  return reactExports.createElement(
    "div",
    { className: "fb-property-name" },
    reactExports.createElement(ComboBox, { options: selectOptions, onChange: onPropertyChanged, value: selectedProperty?.name, inputProps: {
      placeholder: translate("filterBuilder.chooseProperty"),
      disabled: isDisabled,
      size: "small"
    }, itemRenderer, enableVirtualization: true })
  );
}
var PropertyFilterBuilderRuleRangeValue;
(function(PropertyFilterBuilderRuleRangeValue2) {
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
  function isRangeValid({ from: from2, to }) {
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
const PropertyFilterBuilderRuleValue = (props) => {
  const { operator, ...restProps } = props;
  return operator === "between" || operator === "not-between" ? reactExports.createElement(FilterBuilderRuleRangeValueRenderer, { ...restProps }) : reactExports.createElement(FilterBuilderRulePrimitiveValueRenderer, { ...restProps });
};
function FilterBuilderRulePrimitiveValueRenderer({
  property: property2,
  value,
  onChange,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  editorSystem
}) {
  const propertyRecord = reactExports.useMemo(() => {
    return new PropertyRecord(value ?? { valueFormat: PropertyValueFormat.Primitive }, property2);
  }, [value, property2]);
  const onValueChange = reactExports.useCallback(({ newValue }) => {
    onChange(newValue);
  }, [onChange]);
  return reactExports.createElement(PropertyRecordEditor, {
    propertyRecord,
    onCancel: () => {
    },
    onCommit: onValueChange,
    size: "small",
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    editorSystem
  });
}
function FilterBuilderRuleRangeValueRenderer({
  property: property2,
  value,
  onChange,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  editorSystem
}) {
  const { translate } = useTranslation();
  const { from: from2, to } = reactExports.useMemo(() => {
    const rangeValue = PropertyFilterBuilderRuleRangeValue.parse(value);
    return {
      from: new PropertyRecord(rangeValue.from, property2),
      to: new PropertyRecord(rangeValue.to, property2)
    };
  }, [property2, value]);
  const handleFromValue = reactExports.useCallback(({ newValue }) => {
    onChange(getSerializedRangeValue(newValue, to.value));
  }, [onChange, to]);
  const handleToValue = reactExports.useCallback(({ newValue }) => {
    onChange(getSerializedRangeValue(from2.value, newValue));
  }, [onChange, from2]);
  return reactExports.createElement(
    Flex,
    { className: "rule-value-range", display: "inline-flex", flexDirection: "row" },
    reactExports.createElement(
      Flex.Item,
      null,
      reactExports.createElement(PropertyRecordEditor, {
        propertyRecord: from2,
        onCancel: () => {
        },
        onCommit: handleFromValue,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        editorSystem
      })
    ),
    reactExports.createElement(Text, null, translate("filterBuilder.operators.and").toLowerCase()),
    reactExports.createElement(
      Flex.Item,
      null,
      reactExports.createElement(PropertyRecordEditor, {
        propertyRecord: to,
        onCancel: () => {
        },
        onCommit: handleToValue,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        editorSystem
      })
    )
  );
}
function getSerializedRangeValue(from2, to) {
  return PropertyFilterBuilderRuleRangeValue.serialize({
    from: from2.valueFormat === PropertyValueFormat.Primitive ? from2 : { valueFormat: PropertyValueFormat.Primitive },
    to: to.valueFormat === PropertyValueFormat.Primitive ? to : { valueFormat: PropertyValueFormat.Primitive }
  });
}
const PropertyFilterBuilderToolbar = (props) => {
  const { onAddChild, onDelete } = props;
  const { translate } = useTranslation();
  return React.createElement(
    Flex,
    { className: "fb-toolbar fb-row-toolbar" },
    React.createElement(
      IconButton,
      { size: "small", className: "fb-add-rule-button", label: translate("filterBuilder.add"), onClick: onAddChild },
      React.createElement(SvgAdd, null)
    ),
    React.createElement(
      IconButton,
      { size: "small", className: "fb-remove-rule-button", label: translate("filterBuilder.delete"), styleType: "borderless", onClick: onDelete },
      React.createElement(SvgDelete, null)
    )
  );
};
function PropertyFilterBuilderRuleRenderer(props) {
  const { path, rule, onRuleAdded, allowLastRuleDelete, editorSystem } = props;
  const { properties, actions, onRulePropertySelected } = reactExports.useContext(PropertyFilterBuilderContext);
  const { ruleOperatorRenderer, ruleValueRenderer, propertyRenderer, isDisabled } = reactExports.useContext(PropertyFilterBuilderRuleRenderingContext);
  const { property: property2, operator, value } = rule;
  const onSelectedPropertyChanged = reactExports.useCallback((newProperty) => {
    actions.setRuleProperty(path, newProperty);
    if (onRulePropertySelected && newProperty)
      onRulePropertySelected(newProperty);
  }, [path, onRulePropertySelected, actions]);
  const onRuleOperatorChange = reactExports.useCallback((newOperator) => {
    actions.setRuleOperator(path, newOperator);
  }, [path, actions]);
  const onRuleValueChange = reactExports.useCallback((newValue) => {
    actions.setRuleValue(path, newValue);
  }, [path, actions]);
  const removeRule = () => actions.removeItem(path, allowLastRuleDelete);
  const handleRuleAdded = () => {
    actions.addItem([], "RULE");
    onRuleAdded();
  };
  const operatorRenderer = reactExports.useCallback((prop) => {
    if (ruleOperatorRenderer)
      return ruleOperatorRenderer({
        property: prop,
        operator,
        onChange: onRuleOperatorChange
      });
    return reactExports.createElement(PropertyFilterBuilderRuleOperatorRenderer, { property: prop, onChange: onRuleOperatorChange, operator });
  }, [operator, ruleOperatorRenderer, onRuleOperatorChange]);
  const valueRenderer = reactExports.useCallback((prop, op) => {
    if (ruleValueRenderer)
      return ruleValueRenderer({
        property: prop,
        value,
        onChange: onRuleValueChange,
        operator: op
      });
    return reactExports.createElement(PropertyFilterBuilderRuleValue, {
      property: prop,
      onChange: onRuleValueChange,
      value,
      operator: op,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      editorSystem
    });
  }, [value, ruleValueRenderer, onRuleValueChange, editorSystem]);
  return reactExports.createElement(
    "div",
    { className: "fb-component-row" },
    reactExports.createElement(
      Flex,
      { className: "fb-row-container" },
      reactExports.createElement(PropertyFilterBuilderRuleProperty, { properties, selectedProperty: rule.property, onSelectedPropertyChanged, propertyRenderer, isDisabled }),
      property2 !== void 0 ? operatorRenderer(property2) : null,
      property2 !== void 0 && operator !== void 0 && !isUnaryPropertyFilterBuilderOperator(operator) ? reactExports.createElement(
        "div",
        { className: "fb-property-value" },
        valueRenderer(property2, operator),
        rule.errorMessage ? reactExports.createElement(StatusMessage, { status: "negative" }, rule.errorMessage) : null
      ) : null,
      reactExports.createElement(PropertyFilterBuilderToolbar, { onAddChild: handleRuleAdded, onDelete: removeRule })
    )
  );
}
function isPropertyFilterRuleGroup(filter) {
  return filter.rules !== void 0;
}
function isPropertyFilterBuilderRuleGroup(item) {
  return item.items !== void 0;
}
class PropertyFilterBuilderActions {
  setState;
  constructor(setState) {
    this.setState = setState;
  }
  updateState(updater) {
    this.setState(produce(updater));
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
  removeItem(path, allowLastRuleDelete = false) {
    function removeItemFromGroup(state, pathToItem) {
      const pathToParent = pathToItem.slice(0, -1);
      const parentGroup = findRuleGroup(state.rootGroup, pathToParent);
      if (!parentGroup) {
        return;
      }
      const itemId = pathToItem[pathToItem.length - 1];
      const itemIndex = parentGroup.items.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) {
        return;
      }
      if (parentGroup.items.length === 1 && !allowLastRuleDelete) {
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
  const [state, setState] = reactExports.useState(initialFilter ? convertFilterToState(initialFilter) : { rootGroup: createEmptyRuleGroup() });
  const [actions] = reactExports.useState(() => new PropertyFilterBuilderActions(setState));
  const validateRules = useRulesValidation(ruleValidator);
  const buildFilter = reactExports.useCallback((options) => {
    const ruleErrors = validateRules(state.rootGroup);
    if (!options?.ignoreErrors) {
      actions.setRuleErrorMessages(ruleErrors);
    }
    return ruleErrors.size === 0 ? buildPropertyFilter(state.rootGroup) : void 0;
  }, [state.rootGroup, actions, validateRules]);
  return { rootGroup: state.rootGroup, actions, buildFilter };
}
function useRulesValidation(ruleValidator) {
  const defaultValidator = useDefaultPropertyFilterBuilderRuleValidator();
  const { translate } = useTranslation();
  return reactExports.useCallback((rootRule) => {
    const ruleIdsAndErrorMessages = /* @__PURE__ */ new Map();
    const validateRulesInner = (item) => {
      if (isPropertyFilterBuilderRuleGroup(item)) {
        item.items.forEach((itm) => {
          validateRulesInner(itm);
        });
      } else {
        const errorMessage = ruleValidator ? ruleValidator(item) : defaultValidator(item);
        if (errorMessage)
          ruleIdsAndErrorMessages.set(
            item.id,
            // need to check if error message is a key for translation in case `ruleValidator` is using `defaultPropertyFilterBuilderRuleValidator` internally
            errorMessage.startsWith("filterBuilder.errorMessages") ? translate(errorMessage) : errorMessage
          );
      }
    };
    validateRulesInner(rootRule);
    return ruleIdsAndErrorMessages;
  }, [ruleValidator, defaultValidator, translate]);
}
function useDefaultPropertyFilterBuilderRuleValidator() {
  const { translate } = useTranslation();
  return reactExports.useCallback((item) => {
    const errorMessage = defaultPropertyFilterBuilderRuleValidator(item);
    return errorMessage ? translate(errorMessage) : void 0;
  }, [translate]);
}
function defaultPropertyFilterBuilderRuleValidator(item) {
  if (item.property === void 0 || item.operator === void 0 || isUnaryPropertyFilterBuilderOperator(item.operator)) {
    return void 0;
  }
  if (item.operator === "between" || item.operator === "not-between") {
    return rangeRuleValidator(item.value);
  }
  if (isEmptyValue(item.value)) {
    return "filterBuilder.errorMessages.emptyValue";
  }
  return void 0;
}
function rangeRuleValidator(value) {
  const range = PropertyFilterBuilderRuleRangeValue.parse(value);
  if (isEmptyValue(range.from) || isEmptyValue(range.to)) {
    return "filterBuilder.errorMessages.emptyValue";
  }
  if (!PropertyFilterBuilderRuleRangeValue.isRangeValid(range)) {
    return "filterBuilder.errorMessages.invalidRange";
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
function getRuleGroupItem(filter, parentId) {
  const id = Guid.createValue();
  if (isPropertyFilterRuleGroup(filter)) {
    const rangeRule = getRangeRuleItems(filter, parentId);
    return rangeRule ? rangeRule : {
      id,
      groupId: parentId,
      operator: filter.operator,
      items: filter.rules.map((rule) => getRuleGroupItem(rule, id))
    };
  }
  return getRuleItem(filter, id);
}
function getRuleItem(filter, parentId) {
  return {
    id: Guid.createValue(),
    groupId: parentId,
    property: filter.property,
    operator: filter.operator,
    value: filter.value
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
function convertFilterToState(filter) {
  const id = Guid.createValue();
  if (isPropertyFilterRuleGroup(filter)) {
    return {
      rootGroup: {
        id,
        operator: filter.operator,
        items: filter.rules.map((rule) => getRuleGroupItem(rule, id))
      }
    };
  }
  return {
    rootGroup: {
      id,
      operator: "and",
      items: [getRuleItem(filter, id)]
    }
  };
}
function isEmptyValue(value) {
  return value?.valueFormat !== PropertyValueFormat.Primitive || value.value === void 0 || value.value === "";
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
  return React.createElement("div", { className: classnames("fb-logical-operator", className) }, isDisabled ? React.createElement("span", null, operatorDisplayText) : React.createElement(Anchor, { className: "fb-logical-operator-toggle", onClick: () => onOperatorChange(toggle()) }, operatorDisplayText));
};
function PropertyFilterBuilderRuleGroupRenderer(props) {
  const { path, group, isGroupOperatorDisabled, allowLastRuleDelete, editorSystem } = props;
  const { actions } = reactExports.useContext(PropertyFilterBuilderContext);
  const { onRuleAdded, groupRef } = useRulePropertyFocus(group.items.length);
  const onOperatorChange = reactExports.useCallback((operator) => {
    actions.setRuleGroupOperator(path, operator);
  }, [path, actions]);
  return reactExports.createElement(
    Flex,
    { ref: groupRef, style: { alignSelf: "flex-start" }, className: "fb-group", gap: "0px" },
    reactExports.createElement(PropertyFilterBuilderRuleGroupOperator, { operator: group.operator, onChange: onOperatorChange, isGroupOperatorDisabled }),
    reactExports.createElement("div", { className: "fb-wrapper" }, group.items.map((item) => reactExports.createElement(
      "div",
      { className: "fb-row", key: item.id },
      reactExports.createElement(PropertyFilterBuilderGroupOrRule, { path, item, onRuleAdded, allowLastRuleDelete, editorSystem })
    )))
  );
}
function PropertyFilterBuilderRuleGroupOperator(props) {
  const { operator, isGroupOperatorDisabled, onChange } = props;
  return reactExports.createElement(
    Flex.Item,
    { alignSelf: "stretch" },
    reactExports.createElement(PropertyFilterBuilderLogicalOperator, { className: "fb-group-operator", operator, onOperatorChange: onChange, isDisabled: isGroupOperatorDisabled })
  );
}
const PropertyFilterBuilderGroupOrRule = reactExports.memo(function PropertyFilterBuilderGroupOrRule2({ path, item, onRuleAdded, allowLastRuleDelete, editorSystem }) {
  const itemPath = [...path, item.id];
  if (isPropertyFilterBuilderRuleGroup(item))
    return reactExports.createElement(PropertyFilterBuilderRuleGroupRenderer, { path: itemPath, group: item, editorSystem });
  return reactExports.createElement(PropertyFilterBuilderRuleRenderer, { path: itemPath, rule: item, onRuleAdded, allowLastRuleDelete, editorSystem });
});
const useRulePropertyFocus = (currentGroupItemsLength) => {
  const previousGroupItemsLength = reactExports.useRef(0);
  const isNewRuleAdded = reactExports.useRef(false);
  const groupRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isNewRuleAdded.current && previousGroupItemsLength.current < currentGroupItemsLength && groupRef.current) {
      const ruleProperties = groupRef.current.querySelectorAll(".fb-property-name input");
      ruleProperties[ruleProperties.length - 1].focus();
      isNewRuleAdded.current = false;
    }
    previousGroupItemsLength.current = currentGroupItemsLength;
  }, [currentGroupItemsLength]);
  return { onRuleAdded: () => isNewRuleAdded.current = true, groupRef };
};
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
class PropertyCategoryRendererManager {
  _categoryRenderers = /* @__PURE__ */ new Map();
  static defaultManager = new PropertyCategoryRendererManager();
  /** Retrieves a category rendering component based for the passed category item. */
  getCategoryComponent(categoryItem) {
    if (categoryItem.derivedCategory.renderer === void 0) {
      return void 0;
    }
    return this._categoryRenderers.get(categoryItem.derivedCategory.renderer.name)?.(categoryItem);
  }
  /** Registers a renderer factory function to be invoked on categories with specific renderer name. */
  addRenderer(rendererName, categoryRenderer, override = false) {
    if (this._categoryRenderers.has(rendererName) && !override) {
      const className = PropertyCategoryRendererManager.name;
      const methodName = PropertyCategoryRendererManager.prototype.addRenderer.name;
      throw new Error(`${className}.${methodName} error: renderer '${rendererName}' has already been added. Did you mean to override it?`);
    }
    this._categoryRenderers.set(rendererName, categoryRenderer);
  }
  /** Removes previous renderer factory registration. */
  removeRenderer(rendererName) {
    this._categoryRenderers.delete(rendererName);
  }
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
var safeIsNaN = Number.isNaN || function ponyfill(value) {
  return typeof value === "number" && value !== value;
};
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual2) {
  if (isEqual2 === void 0) {
    isEqual2 = areInputsEqual;
  }
  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (calledOnce && lastThis === this && isEqual2(newArgs, lastArgs)) {
      return lastResult;
    }
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }
  return memoized;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var hasNativePerformanceNow = typeof performance === "object" && typeof performance.now === "function";
var now = hasNativePerformanceNow ? function() {
  return performance.now();
} : function() {
  return Date.now();
};
function cancelTimeout(timeoutID) {
  cancelAnimationFrame(timeoutID.id);
}
function requestTimeout(callback, delay) {
  var start = now();
  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      timeoutID.id = requestAnimationFrame(tick);
    }
  }
  var timeoutID = {
    id: requestAnimationFrame(tick)
  };
  return timeoutID;
}
var size = -1;
function getScrollbarSize(recalculate) {
  if (recalculate === void 0) {
    recalculate = false;
  }
  if (size === -1 || recalculate) {
    var div = document.createElement("div");
    var style = div.style;
    style.width = "50px";
    style.height = "50px";
    style.overflow = "scroll";
    document.body.appendChild(div);
    size = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  }
  return size;
}
var cachedRTLResult = null;
function getRTLOffsetType(recalculate) {
  if (recalculate === void 0) {
    recalculate = false;
  }
  if (cachedRTLResult === null || recalculate) {
    var outerDiv = document.createElement("div");
    var outerStyle = outerDiv.style;
    outerStyle.width = "50px";
    outerStyle.height = "50px";
    outerStyle.overflow = "scroll";
    outerStyle.direction = "rtl";
    var innerDiv = document.createElement("div");
    var innerStyle = innerDiv.style;
    innerStyle.width = "100px";
    innerStyle.height = "100px";
    outerDiv.appendChild(innerDiv);
    document.body.appendChild(outerDiv);
    if (outerDiv.scrollLeft > 0) {
      cachedRTLResult = "positive-descending";
    } else {
      outerDiv.scrollLeft = 1;
      if (outerDiv.scrollLeft === 0) {
        cachedRTLResult = "negative";
      } else {
        cachedRTLResult = "positive-ascending";
      }
    }
    document.body.removeChild(outerDiv);
    return cachedRTLResult;
  }
  return cachedRTLResult;
}
var IS_SCROLLING_DEBOUNCE_INTERVAL$1 = 150;
var defaultItemKey$1 = function defaultItemKey3(index, data) {
  return index;
};
function createListComponent(_ref) {
  var _class;
  var getItemOffset3 = _ref.getItemOffset, getEstimatedTotalSize4 = _ref.getEstimatedTotalSize, getItemSize3 = _ref.getItemSize, getOffsetForIndexAndAlignment5 = _ref.getOffsetForIndexAndAlignment, getStartIndexForOffset3 = _ref.getStartIndexForOffset, getStopIndexForStartIndex3 = _ref.getStopIndexForStartIndex, initInstanceProps5 = _ref.initInstanceProps, shouldResetStyleCacheOnItemSizeChange = _ref.shouldResetStyleCacheOnItemSizeChange, validateProps5 = _ref.validateProps;
  return _class = /* @__PURE__ */ (function(_PureComponent) {
    _inheritsLoose(List2, _PureComponent);
    function List2(props) {
      var _this;
      _this = _PureComponent.call(this, props) || this;
      _this._instanceProps = initInstanceProps5(_this.props, _assertThisInitialized(_this));
      _this._outerRef = void 0;
      _this._resetIsScrollingTimeoutId = null;
      _this.state = {
        instance: _assertThisInitialized(_this),
        isScrolling: false,
        scrollDirection: "forward",
        scrollOffset: typeof _this.props.initialScrollOffset === "number" ? _this.props.initialScrollOffset : 0,
        scrollUpdateWasRequested: false
      };
      _this._callOnItemsRendered = void 0;
      _this._callOnItemsRendered = memoizeOne(function(overscanStartIndex, overscanStopIndex, visibleStartIndex, visibleStopIndex) {
        return _this.props.onItemsRendered({
          overscanStartIndex,
          overscanStopIndex,
          visibleStartIndex,
          visibleStopIndex
        });
      });
      _this._callOnScroll = void 0;
      _this._callOnScroll = memoizeOne(function(scrollDirection, scrollOffset, scrollUpdateWasRequested) {
        return _this.props.onScroll({
          scrollDirection,
          scrollOffset,
          scrollUpdateWasRequested
        });
      });
      _this._getItemStyle = void 0;
      _this._getItemStyle = function(index) {
        var _this$props = _this.props, direction = _this$props.direction, itemSize = _this$props.itemSize, layout = _this$props.layout;
        var itemStyleCache = _this._getItemStyleCache(shouldResetStyleCacheOnItemSizeChange && itemSize, shouldResetStyleCacheOnItemSizeChange && layout, shouldResetStyleCacheOnItemSizeChange && direction);
        var style;
        if (itemStyleCache.hasOwnProperty(index)) {
          style = itemStyleCache[index];
        } else {
          var _offset = getItemOffset3(_this.props, index, _this._instanceProps);
          var size2 = getItemSize3(_this.props, index, _this._instanceProps);
          var isHorizontal = direction === "horizontal" || layout === "horizontal";
          var isRtl = direction === "rtl";
          var offsetHorizontal = isHorizontal ? _offset : 0;
          itemStyleCache[index] = style = {
            position: "absolute",
            left: isRtl ? void 0 : offsetHorizontal,
            right: isRtl ? offsetHorizontal : void 0,
            top: !isHorizontal ? _offset : 0,
            height: !isHorizontal ? size2 : "100%",
            width: isHorizontal ? size2 : "100%"
          };
        }
        return style;
      };
      _this._getItemStyleCache = void 0;
      _this._getItemStyleCache = memoizeOne(function(_, __, ___) {
        return {};
      });
      _this._onScrollHorizontal = function(event) {
        var _event$currentTarget = event.currentTarget, clientWidth = _event$currentTarget.clientWidth, scrollLeft = _event$currentTarget.scrollLeft, scrollWidth = _event$currentTarget.scrollWidth;
        _this.setState(function(prevState) {
          if (prevState.scrollOffset === scrollLeft) {
            return null;
          }
          var direction = _this.props.direction;
          var scrollOffset = scrollLeft;
          if (direction === "rtl") {
            switch (getRTLOffsetType()) {
              case "negative":
                scrollOffset = -scrollLeft;
                break;
              case "positive-descending":
                scrollOffset = scrollWidth - clientWidth - scrollLeft;
                break;
            }
          }
          scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth));
          return {
            isScrolling: true,
            scrollDirection: prevState.scrollOffset < scrollOffset ? "forward" : "backward",
            scrollOffset,
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };
      _this._onScrollVertical = function(event) {
        var _event$currentTarget2 = event.currentTarget, clientHeight = _event$currentTarget2.clientHeight, scrollHeight = _event$currentTarget2.scrollHeight, scrollTop = _event$currentTarget2.scrollTop;
        _this.setState(function(prevState) {
          if (prevState.scrollOffset === scrollTop) {
            return null;
          }
          var scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
          return {
            isScrolling: true,
            scrollDirection: prevState.scrollOffset < scrollOffset ? "forward" : "backward",
            scrollOffset,
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };
      _this._outerRefSetter = function(ref) {
        var outerRef = _this.props.outerRef;
        _this._outerRef = ref;
        if (typeof outerRef === "function") {
          outerRef(ref);
        } else if (outerRef != null && typeof outerRef === "object" && outerRef.hasOwnProperty("current")) {
          outerRef.current = ref;
        }
      };
      _this._resetIsScrollingDebounced = function() {
        if (_this._resetIsScrollingTimeoutId !== null) {
          cancelTimeout(_this._resetIsScrollingTimeoutId);
        }
        _this._resetIsScrollingTimeoutId = requestTimeout(_this._resetIsScrolling, IS_SCROLLING_DEBOUNCE_INTERVAL$1);
      };
      _this._resetIsScrolling = function() {
        _this._resetIsScrollingTimeoutId = null;
        _this.setState({
          isScrolling: false
        }, function() {
          _this._getItemStyleCache(-1, null);
        });
      };
      return _this;
    }
    List2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      validateSharedProps$1(nextProps, prevState);
      validateProps5(nextProps);
      return null;
    };
    var _proto = List2.prototype;
    _proto.scrollTo = function scrollTo(scrollOffset) {
      scrollOffset = Math.max(0, scrollOffset);
      this.setState(function(prevState) {
        if (prevState.scrollOffset === scrollOffset) {
          return null;
        }
        return {
          scrollDirection: prevState.scrollOffset < scrollOffset ? "forward" : "backward",
          scrollOffset,
          scrollUpdateWasRequested: true
        };
      }, this._resetIsScrollingDebounced);
    };
    _proto.scrollToItem = function scrollToItem(index, align) {
      if (align === void 0) {
        align = "auto";
      }
      var _this$props2 = this.props, itemCount = _this$props2.itemCount, layout = _this$props2.layout;
      var scrollOffset = this.state.scrollOffset;
      index = Math.max(0, Math.min(index, itemCount - 1));
      var scrollbarSize = 0;
      if (this._outerRef) {
        var outerRef = this._outerRef;
        if (layout === "vertical") {
          scrollbarSize = outerRef.scrollWidth > outerRef.clientWidth ? getScrollbarSize() : 0;
        } else {
          scrollbarSize = outerRef.scrollHeight > outerRef.clientHeight ? getScrollbarSize() : 0;
        }
      }
      this.scrollTo(getOffsetForIndexAndAlignment5(this.props, index, align, scrollOffset, this._instanceProps, scrollbarSize));
    };
    _proto.componentDidMount = function componentDidMount() {
      var _this$props3 = this.props, direction = _this$props3.direction, initialScrollOffset = _this$props3.initialScrollOffset, layout = _this$props3.layout;
      if (typeof initialScrollOffset === "number" && this._outerRef != null) {
        var outerRef = this._outerRef;
        if (direction === "horizontal" || layout === "horizontal") {
          outerRef.scrollLeft = initialScrollOffset;
        } else {
          outerRef.scrollTop = initialScrollOffset;
        }
      }
      this._callPropsCallbacks();
    };
    _proto.componentDidUpdate = function componentDidUpdate() {
      var _this$props4 = this.props, direction = _this$props4.direction, layout = _this$props4.layout;
      var _this$state = this.state, scrollOffset = _this$state.scrollOffset, scrollUpdateWasRequested = _this$state.scrollUpdateWasRequested;
      if (scrollUpdateWasRequested && this._outerRef != null) {
        var outerRef = this._outerRef;
        if (direction === "horizontal" || layout === "horizontal") {
          if (direction === "rtl") {
            switch (getRTLOffsetType()) {
              case "negative":
                outerRef.scrollLeft = -scrollOffset;
                break;
              case "positive-ascending":
                outerRef.scrollLeft = scrollOffset;
                break;
              default:
                var clientWidth = outerRef.clientWidth, scrollWidth = outerRef.scrollWidth;
                outerRef.scrollLeft = scrollWidth - clientWidth - scrollOffset;
                break;
            }
          } else {
            outerRef.scrollLeft = scrollOffset;
          }
        } else {
          outerRef.scrollTop = scrollOffset;
        }
      }
      this._callPropsCallbacks();
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId);
      }
    };
    _proto.render = function render() {
      var _this$props5 = this.props, children = _this$props5.children, className = _this$props5.className, direction = _this$props5.direction, height = _this$props5.height, innerRef = _this$props5.innerRef, innerElementType = _this$props5.innerElementType, innerTagName = _this$props5.innerTagName, itemCount = _this$props5.itemCount, itemData = _this$props5.itemData, _this$props5$itemKey = _this$props5.itemKey, itemKey = _this$props5$itemKey === void 0 ? defaultItemKey$1 : _this$props5$itemKey, layout = _this$props5.layout, outerElementType = _this$props5.outerElementType, outerTagName = _this$props5.outerTagName, style = _this$props5.style, useIsScrolling = _this$props5.useIsScrolling, width = _this$props5.width;
      var isScrolling = this.state.isScrolling;
      var isHorizontal = direction === "horizontal" || layout === "horizontal";
      var onScroll = isHorizontal ? this._onScrollHorizontal : this._onScrollVertical;
      var _this$_getRangeToRend = this._getRangeToRender(), startIndex = _this$_getRangeToRend[0], stopIndex = _this$_getRangeToRend[1];
      var items = [];
      if (itemCount > 0) {
        for (var _index = startIndex; _index <= stopIndex; _index++) {
          items.push(reactExports.createElement(children, {
            data: itemData,
            key: itemKey(_index, itemData),
            index: _index,
            isScrolling: useIsScrolling ? isScrolling : void 0,
            style: this._getItemStyle(_index)
          }));
        }
      }
      var estimatedTotalSize = getEstimatedTotalSize4(this.props, this._instanceProps);
      return reactExports.createElement(outerElementType || outerTagName || "div", {
        className,
        onScroll,
        ref: this._outerRefSetter,
        style: _extends({
          position: "relative",
          height,
          width,
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          willChange: "transform",
          direction
        }, style)
      }, reactExports.createElement(innerElementType || innerTagName || "div", {
        children: items,
        ref: innerRef,
        style: {
          height: isHorizontal ? "100%" : estimatedTotalSize,
          pointerEvents: isScrolling ? "none" : void 0,
          width: isHorizontal ? estimatedTotalSize : "100%"
        }
      }));
    };
    _proto._callPropsCallbacks = function _callPropsCallbacks() {
      if (typeof this.props.onItemsRendered === "function") {
        var itemCount = this.props.itemCount;
        if (itemCount > 0) {
          var _this$_getRangeToRend2 = this._getRangeToRender(), _overscanStartIndex = _this$_getRangeToRend2[0], _overscanStopIndex = _this$_getRangeToRend2[1], _visibleStartIndex = _this$_getRangeToRend2[2], _visibleStopIndex = _this$_getRangeToRend2[3];
          this._callOnItemsRendered(_overscanStartIndex, _overscanStopIndex, _visibleStartIndex, _visibleStopIndex);
        }
      }
      if (typeof this.props.onScroll === "function") {
        var _this$state2 = this.state, _scrollDirection = _this$state2.scrollDirection, _scrollOffset = _this$state2.scrollOffset, _scrollUpdateWasRequested = _this$state2.scrollUpdateWasRequested;
        this._callOnScroll(_scrollDirection, _scrollOffset, _scrollUpdateWasRequested);
      }
    };
    _proto._getRangeToRender = function _getRangeToRender() {
      var _this$props6 = this.props, itemCount = _this$props6.itemCount, overscanCount = _this$props6.overscanCount;
      var _this$state3 = this.state, isScrolling = _this$state3.isScrolling, scrollDirection = _this$state3.scrollDirection, scrollOffset = _this$state3.scrollOffset;
      if (itemCount === 0) {
        return [0, 0, 0, 0];
      }
      var startIndex = getStartIndexForOffset3(this.props, scrollOffset, this._instanceProps);
      var stopIndex = getStopIndexForStartIndex3(this.props, startIndex, scrollOffset, this._instanceProps);
      var overscanBackward = !isScrolling || scrollDirection === "backward" ? Math.max(1, overscanCount) : 1;
      var overscanForward = !isScrolling || scrollDirection === "forward" ? Math.max(1, overscanCount) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    };
    return List2;
  })(reactExports.PureComponent), _class.defaultProps = {
    direction: "ltr",
    itemData: void 0,
    layout: "vertical",
    overscanCount: 2,
    useIsScrolling: false
  }, _class;
}
var validateSharedProps$1 = function validateSharedProps3(_ref2, _ref3) {
  _ref2.children;
  _ref2.direction;
  _ref2.height;
  _ref2.layout;
  _ref2.innerTagName;
  _ref2.outerTagName;
  _ref2.width;
  _ref3.instance;
};
var DEFAULT_ESTIMATED_ITEM_SIZE$1 = 50;
var getItemMetadata$1 = function getItemMetadata3(props, index, instanceProps) {
  var _ref = props, itemSize = _ref.itemSize;
  var itemMetadataMap = instanceProps.itemMetadataMap, lastMeasuredIndex = instanceProps.lastMeasuredIndex;
  if (index > lastMeasuredIndex) {
    var offset = 0;
    if (lastMeasuredIndex >= 0) {
      var itemMetadata = itemMetadataMap[lastMeasuredIndex];
      offset = itemMetadata.offset + itemMetadata.size;
    }
    for (var i = lastMeasuredIndex + 1; i <= index; i++) {
      var size2 = itemSize(i);
      itemMetadataMap[i] = {
        offset,
        size: size2
      };
      offset += size2;
    }
    instanceProps.lastMeasuredIndex = index;
  }
  return itemMetadataMap[index];
};
var findNearestItem$1 = function findNearestItem3(props, instanceProps, offset) {
  var itemMetadataMap = instanceProps.itemMetadataMap, lastMeasuredIndex = instanceProps.lastMeasuredIndex;
  var lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;
  if (lastMeasuredItemOffset >= offset) {
    return findNearestItemBinarySearch$1(props, instanceProps, lastMeasuredIndex, 0, offset);
  } else {
    return findNearestItemExponentialSearch$1(props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
  }
};
var findNearestItemBinarySearch$1 = function findNearestItemBinarySearch3(props, instanceProps, high, low, offset) {
  while (low <= high) {
    var middle = low + Math.floor((high - low) / 2);
    var currentOffset = getItemMetadata$1(props, middle, instanceProps).offset;
    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }
  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};
var findNearestItemExponentialSearch$1 = function findNearestItemExponentialSearch3(props, instanceProps, index, offset) {
  var itemCount = props.itemCount;
  var interval = 1;
  while (index < itemCount && getItemMetadata$1(props, index, instanceProps).offset < offset) {
    index += interval;
    interval *= 2;
  }
  return findNearestItemBinarySearch$1(props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
};
var getEstimatedTotalSize = function getEstimatedTotalSize2(_ref2, _ref3) {
  var itemCount = _ref2.itemCount;
  var itemMetadataMap = _ref3.itemMetadataMap, estimatedItemSize = _ref3.estimatedItemSize, lastMeasuredIndex = _ref3.lastMeasuredIndex;
  var totalSizeOfMeasuredItems = 0;
  if (lastMeasuredIndex >= itemCount) {
    lastMeasuredIndex = itemCount - 1;
  }
  if (lastMeasuredIndex >= 0) {
    var itemMetadata = itemMetadataMap[lastMeasuredIndex];
    totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size;
  }
  var numUnmeasuredItems = itemCount - lastMeasuredIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize;
  return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
};
var VariableSizeList = /* @__PURE__ */ createListComponent({
  getItemOffset: function getItemOffset(props, index, instanceProps) {
    return getItemMetadata$1(props, index, instanceProps).offset;
  },
  getItemSize: function getItemSize(props, index, instanceProps) {
    return instanceProps.itemMetadataMap[index].size;
  },
  getEstimatedTotalSize,
  getOffsetForIndexAndAlignment: function getOffsetForIndexAndAlignment3(props, index, align, scrollOffset, instanceProps, scrollbarSize) {
    var direction = props.direction, height = props.height, layout = props.layout, width = props.width;
    var isHorizontal = direction === "horizontal" || layout === "horizontal";
    var size2 = isHorizontal ? width : height;
    var itemMetadata = getItemMetadata$1(props, index, instanceProps);
    var estimatedTotalSize = getEstimatedTotalSize(props, instanceProps);
    var maxOffset = Math.max(0, Math.min(estimatedTotalSize - size2, itemMetadata.offset));
    var minOffset = Math.max(0, itemMetadata.offset - size2 + itemMetadata.size + scrollbarSize);
    if (align === "smart") {
      if (scrollOffset >= minOffset - size2 && scrollOffset <= maxOffset + size2) {
        align = "auto";
      } else {
        align = "center";
      }
    }
    switch (align) {
      case "start":
        return maxOffset;
      case "end":
        return minOffset;
      case "center":
        return Math.round(minOffset + (maxOffset - minOffset) / 2);
      case "auto":
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }
    }
  },
  getStartIndexForOffset: function getStartIndexForOffset(props, offset, instanceProps) {
    return findNearestItem$1(props, instanceProps, offset);
  },
  getStopIndexForStartIndex: function getStopIndexForStartIndex(props, startIndex, scrollOffset, instanceProps) {
    var direction = props.direction, height = props.height, itemCount = props.itemCount, layout = props.layout, width = props.width;
    var isHorizontal = direction === "horizontal" || layout === "horizontal";
    var size2 = isHorizontal ? width : height;
    var itemMetadata = getItemMetadata$1(props, startIndex, instanceProps);
    var maxOffset = scrollOffset + size2;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;
    while (stopIndex < itemCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata$1(props, stopIndex, instanceProps).size;
    }
    return stopIndex;
  },
  initInstanceProps: function initInstanceProps2(props, instance) {
    var _ref4 = props, estimatedItemSize = _ref4.estimatedItemSize;
    var instanceProps = {
      itemMetadataMap: {},
      estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATED_ITEM_SIZE$1,
      lastMeasuredIndex: -1
    };
    instance.resetAfterIndex = function(index, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }
      instanceProps.lastMeasuredIndex = Math.min(instanceProps.lastMeasuredIndex, index - 1);
      instance._getItemStyleCache(-1);
      if (shouldForceUpdate) {
        instance.forceUpdate();
      }
    };
    return instanceProps;
  },
  shouldResetStyleCacheOnItemSizeChange: false,
  validateProps: function validateProps2(_ref5) {
    _ref5.itemSize;
  }
});
function shallowDiffers(prev, next) {
  for (var attribute in prev) {
    if (!(attribute in next)) {
      return true;
    }
  }
  for (var _attribute in next) {
    if (prev[_attribute] !== next[_attribute]) {
      return true;
    }
  }
  return false;
}
var _excluded = ["style"], _excluded2 = ["style"];
function areEqual(prevProps, nextProps) {
  var prevStyle = prevProps.style, prevRest = _objectWithoutPropertiesLoose(prevProps, _excluded);
  var nextStyle = nextProps.style, nextRest = _objectWithoutPropertiesLoose(nextProps, _excluded2);
  return !shallowDiffers(prevStyle, nextStyle) && !shallowDiffers(prevRest, nextRest);
}
function createContextWithMandatoryProvider(contextName) {
  const context = React.createContext(void 0);
  function useContextWithoutDefaultValue(ConsumingComponent) {
    const value = React.useContext(context);
    if (value === void 0) {
      throw new UiError(UiComponents$1.loggerCategory("createContextWithMandatoryProvider"), `'${ConsumingComponent.displayName}' expects to be wrapped by a '${contextName}' provider.`);
    }
    return value;
  }
  return [context.Provider, context.Consumer, useContextWithoutDefaultValue];
}
var FilteredType;
(function(FilteredType2) {
  FilteredType2[FilteredType2["Category"] = 0] = "Category";
  FilteredType2[FilteredType2["Label"] = 1] = "Label";
  FilteredType2[FilteredType2["Value"] = 2] = "Value";
})(FilteredType || (FilteredType = {}));
var FlatGridItemType;
(function(FlatGridItemType2) {
  FlatGridItemType2[FlatGridItemType2["Category"] = 0] = "Category";
  FlatGridItemType2[FlatGridItemType2["Primitive"] = 1] = "Primitive";
  FlatGridItemType2[FlatGridItemType2["Array"] = 2] = "Array";
  FlatGridItemType2[FlatGridItemType2["Struct"] = 3] = "Struct";
})(FlatGridItemType || (FlatGridItemType = {}));
class MutableFlatPropertyGridItem {
  _depth;
  _parentSelectionKey;
  _parentCategorySelectionKey;
  [DRAFTABLE] = true;
  key = Guid.createValue();
  _isExpanded = false;
  _lastInNumberOfCategories = 0;
  _isLastInRootCategory = false;
  constructor(_depth, _parentSelectionKey, _parentCategorySelectionKey) {
    this._depth = _depth;
    this._parentSelectionKey = _parentSelectionKey;
    this._parentCategorySelectionKey = _parentCategorySelectionKey;
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
    this.getChildren().forEach((child) => descendants.push(...child.getDescendantsAndSelf()));
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
      this.getChildren().forEach((child) => descendants.push(...child.getVisibleDescendantsAndSelf()));
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
class MutableCategorizedProperty extends MutableFlatPropertyGridItem {
  _derivedRecord;
  _selectionKey;
  constructor(type, record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    super(depth, parentSelectionKey, parentCategorySelectionKey);
    const recordType = this.valueTypeToFlatGridType(record.value.valueFormat);
    if (recordType !== type) {
      const expectedTypeStr = FlatGridItemType[type];
      const actualTypeStr = FlatGridItemType[recordType];
      throw Error(`Record with incorrect value format passed to property: expected ${expectedTypeStr}, got ${actualTypeStr}`);
    }
    const overriddenProperty = this.makeOverriddenProperty(record.property, overrideName, overrideDisplayLabel);
    this._derivedRecord = this.makeDerivedRecord(record, overriddenProperty);
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
        return FlatGridItemType.Primitive;
      case PropertyValueFormat.Array:
        return FlatGridItemType.Array;
      case PropertyValueFormat.Struct:
        return FlatGridItemType.Struct;
      default:
        const unhandledType = valueType;
        throw Error(`Property Value Format not handled: ${String(unhandledType)}`);
    }
  }
  /**
   * Make new property description with overridden fields.
   * @param propertyDescription property description to override.
   * @param overrideName property description name to override.
   * @param overrideDisplay  property description display name to override.
   */
  makeOverriddenProperty(propertyDescription, overrideName, overrideDisplay) {
    const { name, displayLabel, ...property2 } = { ...propertyDescription };
    const newName = overrideName ?? name;
    const newDisplayLabel = overrideDisplay ?? displayLabel;
    return { ...property2, name: newName, displayLabel: newDisplayLabel };
  }
  /**
   * Gets derived property record that has it's property description field overridden
   */
  makeDerivedRecord(record, overriddenPropertyDescription) {
    const { value, property: property2, ...others } = record;
    const newRecord = new PropertyRecord(value, overriddenPropertyDescription);
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
   * Record with overridden property description.
   */
  get derivedRecord() {
    return this._derivedRecord;
  }
}
class MutableCategorizedPrimitiveProperty extends MutableCategorizedProperty {
  constructor(record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel) {
    super(FlatGridItemType.Primitive, record, parentSelectionKey, parentCategorySelectionKey, depth, overrideName, overrideDisplayLabel);
  }
  get type() {
    return FlatGridItemType.Primitive;
  }
  getChildren() {
    return [];
  }
}
class MutableCustomGridCategory extends MutableFlatPropertyGridItem {
  _children;
  _renderer;
  type = FlatGridItemType.Category;
  label;
  name;
  selectionKey;
  constructor(category, recordsDict, gridItemFactory, parentSelectionKey, depth) {
    super(depth, parentSelectionKey, parentSelectionKey);
    this.name = category.name;
    this.label = category.label;
    this.isExpanded = category.expand;
    this.selectionKey = parentSelectionKey === void 0 ? this.name : `${parentSelectionKey}_${this.name}`;
    this._renderer = category.renderer;
    const categoryRecords = recordsDict[category.name] ?? [];
    this._children = categoryRecords.map((value) => gridItemFactory.createCategorizedProperty(value, this.selectionKey, this.selectionKey, 0));
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
  _children;
  _selectionKey;
  _category;
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
    this._children = categoryRecords.map((value) => gridItemFactory.createCategorizedProperty(value, this.selectionKey, this.selectionKey, 0));
    const childCategories = category.childCategories ?? [];
    const child = childCategories.map((childCategory) => gridItemFactory.createGridCategory(childCategory, recordsDict, this.selectionKey, this.depth + 1));
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
  }
  _onExpanded = () => {
    if (!this.props.isExpanded)
      this.props.onExpandToggled();
  };
  _onCollapsed = () => {
    if (this.props.isExpanded)
      this.props.onExpandToggled();
  };
  getLabel(props) {
    const { orientation, indentation, width, columnRatio, columnInfo } = props;
    const offset = CommonPropertyRenderer.getLabelOffset(indentation, orientation, width, columnRatio, columnInfo?.minLabelWidth);
    let displayLabel = props.propertyRecord.property.displayLabel;
    if (props.propertyRecord.value.valueFormat === PropertyValueFormat.Array)
      displayLabel = `${displayLabel} (${props.propertyRecord.value.items.length})`;
    return reactExports.createElement(NonPrimitivePropertyLabelRenderer, { isExpanded: props.isExpanded, onExpand: this._onExpanded, onCollapse: this._onCollapsed, offset, renderColon: false }, displayLabel);
  }
  render() {
    const { indentation, ...props } = this.props;
    return reactExports.createElement(PropertyView, { labelElement: this.getLabel(this.props), ...props });
  }
}
const FlatPropertyRenderer = (props) => {
  const { propertyValueRendererManager, highlight, ...passthroughProps } = props;
  const valueElementRenderer = () => reactExports.createElement(DisplayValue, { ...props, editorSystem: props.editorSystem ?? "legacy" });
  const primitiveRendererProps = {
    ...passthroughProps,
    valueElementRenderer,
    indentation: props.indentation
  };
  const rendererManager = propertyValueRendererManager ?? PropertyValueRendererManager.defaultManager;
  const hasCustomRenderer = rendererManager.hasCustomRenderer(passthroughProps.propertyRecord);
  switch (props.propertyRecord.value.valueFormat) {
    case PropertyValueFormat.Primitive:
      return reactExports.createElement(CustomizablePropertyRenderer, { highlight: highlight?.applyOnLabel ? highlight : void 0, ...primitiveRendererProps });
    case PropertyValueFormat.Array:
      if (props.propertyRecord.value.items.length === 0 || hasCustomRenderer)
        return reactExports.createElement(CustomizablePropertyRenderer, { highlight: highlight?.applyOnLabel ? highlight : void 0, ...primitiveRendererProps });
    // eslint-disable-next-line no-fallthrough
    case PropertyValueFormat.Struct:
      if (hasCustomRenderer) {
        return reactExports.createElement(CustomizablePropertyRenderer, { highlight: highlight?.applyOnLabel ? highlight : void 0, ...primitiveRendererProps });
      }
      return reactExports.createElement(FlatNonPrimitivePropertyRenderer, { ...primitiveRendererProps, isExpanded: props.isExpanded, onExpandToggled: props.onExpansionToggled, valueElement: void 0, valueElementRenderer: void 0 });
  }
};
const DisplayValue = (props) => {
  useResetHeightOnEdit(props.orientation, props.isEditing, props.onHeightChanged);
  const alwaysShowsEditor = props.alwaysShowEditor ? props.alwaysShowEditor(props.propertyRecord) : false;
  if (props.isEditing || alwaysShowsEditor && props.isPropertyEditingEnabled) {
    const _onEditCommit = (args) => {
      if (props.category)
        props.onEditCommit?.(args, props.category);
    };
    return reactExports.createElement(PropertyRecordEditor, {
      propertyRecord: props.propertyRecord,
      onCommit: _onEditCommit,
      onCancel: props.onEditCancel ?? (() => {
      }),
      onClick: () => props.onClick?.(props.propertyRecord, props.uniqueKey),
      setFocus: props.isEditing,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      editorSystem: props.editorSystem,
      size: "small"
    });
  }
  return CommonPropertyRenderer.createNewDisplayValue(props.orientation, props.propertyRecord, props.indentation, props.propertyValueRendererManager, props.isExpanded, props.onExpansionToggled, props.onHeightChanged, props.highlight);
};
function useResetHeightOnEdit(orientation, isEditing, onHeightChanged) {
  const previousEditingStatusRef = reactExports.useRef(isEditing);
  reactExports.useEffect(() => {
    if (!previousEditingStatusRef.current && isEditing) {
      onHeightChanged?.(orientation === Orientation.Vertical ? 48 : 28);
    }
    previousEditingStatusRef.current = isEditing;
  });
}
const BORDER_WIDTH = 10;
const PROPERTY_PADDING = 16;
const VALUE_MIN_WIDTH = 10;
class ColumnResizingPropertyListPropsSupplier extends reactExports.Component {
  _initialRatio = 0.25;
  _defaultMinRatio = 0.15;
  _defaultMaxRatio = 0.6;
  _minRatio = this._defaultMinRatio;
  _maxRatio = this._defaultMaxRatio;
  state = {
    columnRatio: this._initialRatio,
    isResizeHandleHovered: false,
    isResizeHandleBeingDragged: false
  };
  static defaultProps = {
    minLabelWidth: 100,
    minValueWidth: 100
  };
  _onColumnRatioChanged = (ratio) => {
    ratio = clamp(ratio, this._minRatio, this._maxRatio);
    if (this.state.columnRatio === ratio)
      return { ratio };
    this.setState({ columnRatio: ratio });
    return { ratio };
  };
  _onResizeHandleHoverChanged = (isHovered) => {
    this.setState({ isResizeHandleHovered: isHovered });
  };
  _onResizeHandleDragChanged = (isDragStarted) => {
    this.setState({ isResizeHandleBeingDragged: isDragStarted });
  };
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
    return clamp(this.state.columnRatio, this._minRatio, this._maxRatio);
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
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function FlatItemNestedBorderWrapper(props) {
  if (props.borderCount <= 0) {
    return reactExports.createElement("div", { className: props.className }, props.children);
  }
  const isBottomBorderNeeded = props.bottomBorderCount >= 0 && props.bottomBorderCount >= props.borderCount;
  const classNames = classnames("nested-border-middle", isBottomBorderNeeded ? "nested-border-bottom" : void 0);
  let currentBottomBorderCount = props.bottomBorderCount;
  if (isBottomBorderNeeded)
    currentBottomBorderCount--;
  return reactExports.createElement(
    "div",
    { className: classNames },
    reactExports.createElement(FlatItemNestedBorderWrapper, { className: props.className, borderCount: props.borderCount - 1, bottomBorderCount: currentBottomBorderCount }, props.children)
  );
}
class PropertyCategoryBlock extends reactExports.Component {
  constructor(props) {
    super(props);
  }
  toggleExpansion() {
    if (this.props.onExpansionToggled)
      this.props.onExpansionToggled(this.props.category.name);
  }
  _handleToggle = (_isExpanding) => {
    this.toggleExpansion();
  };
  render() {
    const { highlight, category, children, onExpansionToggled, ...other } = this.props;
    const activeMatchIndex = this.props.category.name === highlight?.activeHighlight?.highlightedItemIdentifier ? highlight.activeHighlight.highlightIndex : void 0;
    const label = highlight ? reactExports.createElement(HighlightedText, { text: category.label, activeMatchIndex, searchText: highlight.highlightedText }) : category.label;
    return reactExports.createElement(
      ExpandableBlock.Wrapper,
      { isExpanded: category.expand, onToggle: this._handleToggle, size: "small", ...other },
      reactExports.createElement(ExpandableBlock.Trigger, { label }),
      reactExports.createElement(ExpandableBlock.Content, { className: "components-expandable-content" }, category.expand && children)
    );
  }
}
class PropertyGridEventsRelatedPropsSupplier extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _isClickSupported() {
    return this.props.isPropertySelectionEnabled || this.props.isPropertyEditingEnabled;
  }
  _isRightClickSupported() {
    return this.props.isPropertySelectionOnRightClickEnabled;
  }
  _onPropertyRightClicked = (property2, key) => {
    if (this._isRightClickSupported())
      this.onEnabledPropertyRightClicked(property2, key);
  };
  _onPropertyClicked = (property2, key) => {
    if (this._isClickSupported())
      this.onEnabledPropertyLeftClicked(property2, key);
  };
  _onPropertyContextMenu = (property2, e) => {
    if (this.props.onPropertyContextMenu) {
      this.props.onPropertyContextMenu({ propertyRecord: property2, event: e });
    }
  };
  _onEditCommit = async (args, category) => {
    if (this.props.onPropertyUpdated) {
      await this.props.onPropertyUpdated(args, category);
      this.setState({ editingPropertyKey: void 0 });
    }
  };
  _onEditCancel = () => {
    this.setState({ editingPropertyKey: void 0 });
  };
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
    return reactExports.createElement(reactExports.Fragment, null, this.props.children(renderContext));
  }
}
const [PropertyGridInternalContextProvider, _PropertyGridInternalContextConsumer, usePropertyGridInternalContext] = createContextWithMandatoryProvider("PropertyGridInternalContext");
const ACTION_BUTTON_DEFAULT_WIDTH = 90;
const CATEGORY_HEADER_HEIGHT = 42;
const CATEGORY_PROPERTY_HEIGHT = 28;
const VERTICAL_CATEGORY_PROPERTY_HEIGHT = 48;
const VirtualizedPropertyGrid = (props) => {
  return reactExports.createElement(VirtualizedPropertyGridImpl, { ...props });
};
class VirtualizedPropertyGridImpl extends reactExports.Component {
  _listRef = reactExports.createRef();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(props) {
    super(props);
    this.state = {
      gridItems: [],
      orientation: props.orientation ?? PropertyGridCommons.getCurrentOrientation(props.width, void 0, props.isOrientationFixed, props.horizontalOrientationMinWidth),
      dynamicNodeHeights: /* @__PURE__ */ new Map()
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  componentDidUpdate(prevProps) {
    if (this.props.orientation !== prevProps.orientation || this.props.isOrientationFixed !== prevProps.isOrientationFixed || this.props.horizontalOrientationMinWidth !== prevProps.horizontalOrientationMinWidth || this.props.width !== prevProps.width)
      this.updateOrientation(this.props.width);
    if (this.props.model !== prevProps.model) {
      if (this._listRef.current)
        this._listRef.current.resetAfterIndex(0);
    }
    if (this.props.highlight !== prevProps.highlight && this.props.highlight?.activeHighlight && this.state.gridItems.length !== 0) {
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
    const currentOrientation = PropertyGridCommons.getCurrentOrientation(width, orientation, isOrientationFixed, horizontalOrientationMinWidth);
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
  _handleNodeHeightChange = (index, key, newHeight) => {
    if (this.state.dynamicNodeHeights.get(key) === newHeight) {
      return;
    }
    this.setState((state) => {
      return {
        ...state,
        dynamicNodeHeights: new Map(state.dynamicNodeHeights).set(key, newHeight)
      };
    }, () => this._listRef.current.resetAfterIndex(index));
  };
  _calculateNodeHeightByIndex = (index) => {
    const node = this.state.gridItems[index];
    return this.calculateNodeHeight(node);
  };
  calculateEstimatedHeight() {
    let sum = 0;
    for (const node of this.state.gridItems)
      sum += this.calculateNodeHeight(node);
    return Math.ceil(sum / this.state.gridItems.length);
  }
  _getNodeKey = (index) => {
    const node = this.state.gridItems[index];
    return node.key;
  };
  _getMaxItemDepth = () => {
    let depth = 0;
    for (const item of this.state.gridItems) {
      if (depth < item.depth) {
        depth = item.depth;
      }
    }
    return depth + 1;
  };
  render() {
    const defaultActionButtonWidth = (this.props.actionButtonRenderers?.length ?? 0) > 0 ? ACTION_BUTTON_DEFAULT_WIDTH : void 0;
    return reactExports.createElement(ColumnResizingPropertyListPropsSupplier, { orientation: this.state.orientation, width: this.props.width, minLabelWidth: this.props.minLabelWidth, minValueWidth: this.props.minValueWidth, actionButtonWidth: this.props.actionButtonWidth !== void 0 ? this.props.actionButtonWidth : defaultActionButtonWidth, maxPropertyDepth: this._getMaxItemDepth() }, (columnResizeContext) => reactExports.createElement(PropertyGridEventsRelatedPropsSupplier, { isPropertySelectionEnabled: this.props.isPropertySelectionEnabled ?? false, isPropertySelectionOnRightClickEnabled: this.props.isPropertySelectionOnRightClickEnabled, isPropertyEditingEnabled: this.props.isPropertyEditingEnabled, onPropertyContextMenu: this.props.onPropertyContextMenu, onPropertyUpdated: this.props.onPropertyUpdated, onPropertySelectionChanged: this.props.onPropertySelectionChanged, isPropertyHoverEnabled: this.props.isPropertyHoverEnabled ?? false }, (selectionContext) => {
      const gridContext = {
        orientation: columnResizeContext.orientation,
        gridWidth: this.props.width,
        isPropertyHoverEnabled: selectionContext.isPropertyHoverEnabled,
        isPropertySelectionEnabled: selectionContext.isPropertySelectionEnabled,
        selectedPropertyKey: selectionContext.selectedPropertyKey,
        isPropertyEditingEnabled: this.props.isPropertyEditingEnabled,
        alwaysShowEditor: this.props.alwaysShowEditor,
        onPropertyClicked: selectionContext.onPropertyClicked,
        onPropertyRightClicked: selectionContext.onPropertyRightClicked,
        onPropertyContextMenu: selectionContext.onPropertyContextMenu,
        editingPropertyKey: selectionContext.editingPropertyKey,
        onEditCommit: selectionContext.onEditCommit,
        onEditCancel: selectionContext.onEditCancel,
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        editorSystem: this.props.editorSystem ?? "legacy",
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
      return reactExports.createElement(
        PropertyGridInternalContextProvider,
        { value: renderContext },
        reactExports.createElement(VirtualizedPropertyGridInternal, { width: this.props.width, height: this.props.height, itemCount: this.state.gridItems.length, itemSize: this._calculateNodeHeightByIndex, estimatedItemSize: this.calculateEstimatedHeight(), overscanCount: 10, layout: "vertical", style: this.props.style, itemKey: this._getNodeKey, ref: this._listRef })
      );
    }));
  }
}
const VirtualizedPropertyGridInternal = reactExports.forwardRef(function VirtualizedPropertyGridInternal2(props, ref) {
  const { gridContext } = usePropertyGridInternalContext(FlatGridItemNode);
  reactExports.useEffect(() => {
    return gridContext.dataProvider.onDataChanged.addListener(() => {
      gridContext.onEditCancel?.();
    });
  }, [gridContext]);
  return reactExports.createElement(
    "div",
    { className: classnames("components-virtualized-property-grid", "components-smallEditor-host") },
    reactExports.createElement(VariableSizeList, { ...props, className: classnames("components-property-grid-wrapper", "ReactWindow__VariableSizeList", props.className), ref }, FlatGridItemNode)
  );
});
const FlatGridItemNode = reactExports.memo(({ index, style: virtualizedListStyle }) => {
  const { gridItems, gridEventHandler, gridModel, gridContext, className, style, onItemHeightChanged } = usePropertyGridInternalContext(FlatGridItemNode);
  const node = gridItems[index];
  const divRef = reactExports.useRef(null);
  const previousHeightRef = reactExports.useRef(0);
  const onExpansionToggled = reactExports.useCallback(() => gridEventHandler.onExpansionToggled(node.selectionKey), [gridEventHandler, node.selectionKey]);
  const onHeightChanged = reactExports.useCallback((newHeight) => onItemHeightChanged(index, node.key, newHeight), [onItemHeightChanged, index, node.key]);
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
    const lastInNumberOfCategories = node.lastInNumberOfCategories;
    switch (node.type) {
      case FlatGridItemType.Category:
        const categoryRendererManager = gridContext.propertyCategoryRendererManager ?? PropertyCategoryRendererManager.defaultManager;
        const customRenderer = categoryRendererManager.getCategoryComponent(node);
        const wrapperClassName = classnames("virtualized-grid-node-content", customRenderer !== void 0 ? "virtualized-grid-node-custom-category" : "virtualized-grid-node-category");
        return reactExports.createElement(
          FlatItemNestedBorderWrapper,
          { borderCount: node.depth, bottomBorderCount: lastInNumberOfCategories, className: wrapperClassName },
          reactExports.createElement(PropertyCategoryBlock, { className, style, category: node.derivedCategory, onExpansionToggled, highlight: gridContext.highlight?.filteredTypes?.includes(FilteredType.Category) ? gridContext.highlight : void 0 }, customRenderer !== void 0 && reactExports.createElement(CustomCategoryContent, { renderer: customRenderer, categoryItem: node, gridContext, onHeightChanged }))
        );
      case FlatGridItemType.Array:
      case FlatGridItemType.Struct:
      case FlatGridItemType.Primitive:
        const selectionKey = node.selectionKey;
        const parentCategoryItem = gridModel.getItem(node.parentCategorySelectionKey);
        return reactExports.createElement(
          FlatItemNestedBorderWrapper,
          { borderCount: parentCategoryItem.depth + 1, bottomBorderCount: lastInNumberOfCategories, className: "virtualized-grid-node-content" },
          reactExports.createElement(FlatPropertyRenderer, { key: node.key, uniqueKey: selectionKey, propertyRecord: node.derivedRecord, orientation: gridContext.orientation, indentation: node.depth, width: gridContext.gridWidth, isHoverable: gridContext.isPropertyHoverEnabled, isSelectable: gridContext.isPropertySelectionEnabled, isSelected: selectionKey === gridContext.selectedPropertyKey, onClick: gridContext.onPropertyClicked, onRightClick: gridContext.onPropertyRightClicked, onContextMenu: gridContext.onPropertyContextMenu, category: parentCategoryItem.derivedCategory, isEditing: selectionKey === gridContext.editingPropertyKey, isPropertyEditingEnabled: gridContext.isPropertyEditingEnabled, alwaysShowEditor: gridContext.alwaysShowEditor, onEditCommit: gridContext.onEditCommit, onEditCancel: gridContext.onEditCancel, editorSystem: gridContext.editorSystem, isExpanded: node.isExpanded, onExpansionToggled, onHeightChanged, actionButtonRenderers: gridContext.actionButtonRenderers, propertyValueRendererManager: gridContext.propertyValueRendererManager, columnRatio: gridContext.columnRatio, columnInfo: gridContext.columnInfo, isResizeHandleBeingDragged: gridContext.isResizeHandleBeingDragged, isResizeHandleHovered: gridContext.isResizeHandleHovered, onColumnRatioChanged: gridContext.onColumnRatioChanged, onResizeHandleDragChanged: gridContext.onResizeHandleDragChanged, onResizeHandleHoverChanged: gridContext.onResizeHandleHoverChanged, highlight: gridContext.highlight ? {
            applyOnLabel: gridContext.highlight.filteredTypes?.includes(FilteredType.Label) ?? false,
            applyOnValue: gridContext.highlight.filteredTypes?.includes(FilteredType.Value) ?? false,
            ...gridContext.highlight
          } : void 0 })
        );
    }
  }
  return reactExports.createElement(
    "div",
    { className: "virtualized-grid-node", style: virtualizedListStyle },
    reactExports.createElement(
      "div",
      { className: "virtualized-grid-node-content-wrapper", style: {
        minHeight: `${minHeight}px`,
        display: "grid"
      } },
      reactExports.createElement("div", { ref: divRef, className: "virtualized-grid-node-content-wrapper-item" }, getDisplayNode())
    )
  );
}, areEqual);
FlatGridItemNode.displayName = "FlatGridItemNode";
const CustomCategoryContent = (props) => {
  const { onHeightChanged } = props;
  const divRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    assert(divRef.current !== null);
    const contentHeight = divRef.current.getBoundingClientRect().height;
    onHeightChanged(contentHeight);
  }, [props.gridContext.orientation, onHeightChanged]);
  return reactExports.createElement("div", { ref: divRef }, reactExports.createElement(props.renderer, props));
};
Symbol.dispose ??= /* @__PURE__ */ Symbol("Symbol.dispose");
Symbol.asyncDispose ??= /* @__PURE__ */ Symbol("Symbol.asyncDispose");
var CompositeFilterType;
(function(CompositeFilterType2) {
  CompositeFilterType2[CompositeFilterType2["And"] = 0] = "And";
  CompositeFilterType2[CompositeFilterType2["Or"] = 1] = "Or";
})(CompositeFilterType || (CompositeFilterType = {}));
reactExports.memo((props) => {
  const className = classnames("components-toolbar-button-item", props.isActive && "components-active", props.isDisabled && "components-disabled", props.className);
  return reactExports.createElement(
    "button",
    { "data-item-id": props.itemId, "data-item-type": "action-tool-button", "data-item-group-priority": props.groupPriority, "data-item-priority": props.itemPriority, "data-item-provider-id": props.providerId, disabled: props.isDisabled, onClick: props.onClick, onKeyDown: props.onKeyDown, className, style: props.style, title: props.title },
    reactExports.createElement("div", { className: "components-icon" }, props.icon),
    props.badge && reactExports.createElement("div", { className: "components-badge" }, props.badge)
  );
});
var Direction;
(function(Direction2) {
  Direction2[Direction2["Left"] = 1] = "Left";
  Direction2[Direction2["Top"] = 2] = "Top";
  Direction2[Direction2["Right"] = 3] = "Right";
  Direction2[Direction2["Bottom"] = 4] = "Bottom";
})(Direction || (Direction = {}));
var OrthogonalDirection;
(function(OrthogonalDirection2) {
  OrthogonalDirection2[OrthogonalDirection2["Vertical"] = 0] = "Vertical";
  OrthogonalDirection2[OrthogonalDirection2["Horizontal"] = 1] = "Horizontal";
})(OrthogonalDirection || (OrthogonalDirection = {}));
reactExports.memo((props) => {
  const ref = reactExports.useRef(null);
  const targeted = useTargeted(ref);
  const className = classnames("components-toolbar-item-expandable-group-backArrow", targeted && "components-targeted", props.className);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    reactExports.createElement("div", { className, onClick: props.onClick, onPointerUp: props.onPointerUp, ref, style: props.style, role: "button", tabIndex: -1 })
  );
});
function GroupTool(props) {
  const ref = reactExports.useRef(null);
  const targeted = useTargeted(ref);
  const itemClassName = classnames("components-toolbar-item-expandable-group-tool-item", props.isActive && "components-active", props.isFocused && "components-focused", props.isDisabled && "components-disabled", props.onPointerUp && "components-pointer-up", targeted && "components-targeted", props.className);
  const handleClick = reactExports.useCallback(() => {
    if (!props.isDisabled && props.onClick)
      props.onClick(props.item);
  }, [props]);
  const handlePointerUp = reactExports.useCallback(() => {
    if (!props.isDisabled && props.onPointerUp)
      props.onPointerUp(props.item);
  }, [props]);
  const providerId = "providerId" in props.item ? props.item.providerId : void 0;
  return reactExports.createElement(
    "div",
    { className: itemClassName, onClick: handleClick, onKeyDown: props.onKeyDown, onPointerUp: handlePointerUp, "data-item-id": props.item.id, "data-item-type": "popup-tool-panel-item", "data-item-priority": props.item.itemPriority, "data-item-provider-id": providerId, ref, style: props.style, role: "button", tabIndex: 0 },
    reactExports.createElement(
      "div",
      { className: "components-icon" },
      props.icon,
      props.badge && reactExports.createElement("div", { className: "components-badge" }, props.badge)
    ),
    reactExports.createElement("div", { className: "components-label" }, props.label),
    props.children
  );
}
reactExports.memo((props) => {
  const { className, ...otherProps } = props;
  const expanderClassName = classnames("components-toolbar-item-expandable-group-tool-expander", className);
  return reactExports.createElement(
    GroupTool,
    { className: expanderClassName, ...otherProps },
    reactExports.createElement("div", { className: "components-expansion-indicator" })
  );
});
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
const ToolbarPopupContext = reactExports.createContext({
  /** function used to close popup panel */
  closePanel: () => {
  },
  /** if popup panel is a GroupButton then this is call to set the selected action item within the panel */
  setSelectedItem: (_buttonItem) => {
  }
});
function PopupItem(props) {
  const [isPanelShown, setPanelShown] = reactExports.useState(false);
  const { expandsTo, overflowExpandsTo, panelAlignment, onPopupPanelOpenClose } = useToolbarWithOverflowDirectionContext();
  const processPanelOpenClose = reactExports.useCallback((isOpening) => {
    setPanelShown((prev) => {
      if (prev !== isOpening)
        onPopupPanelOpenClose(isOpening);
      return isOpening;
    });
  }, [setPanelShown, onPopupPanelOpenClose]);
  const onButtonClick = reactExports.useCallback(() => {
    processPanelOpenClose(!isPanelShown);
    if (props.onClick)
      props.onClick();
  }, [props, isPanelShown, processPanelOpenClose]);
  const className = classnames("components-toolbar-button-item", "components-toolbar-expandable-button", props.isDisabled && "components-disabled", props.className);
  const [targetRef, target] = useRefState();
  const handleClose = reactExports.useCallback(() => {
    processPanelOpenClose(false);
  }, [processPanelOpenClose]);
  const { hasOverflow } = useToolItemEntryContext();
  const expandsToDirection = hasOverflow ? overflowExpandsTo : expandsTo;
  const { hideIndicator, panel } = props;
  return reactExports.createElement(
    ToolbarPopupContext.Provider,
    { value: {
      closePanel: () => processPanelOpenClose(false)
    } },
    reactExports.createElement(
      "button",
      { "data-item-id": props.itemId, "data-item-type": "tool-button-popup", "data-item-group-priority": props.groupPriority, "data-item-priority": props.itemPriority, "data-item-provider-id": props.providerId, ref: targetRef, disabled: props.isDisabled, onClick: onButtonClick, onKeyDown: props.onKeyDown, className, style: props.style, title: props.title },
      reactExports.createElement("div", { className: "components-icon" }, props.icon),
      props.badge && reactExports.createElement("div", { className: "components-badge" }, props.badge),
      hideIndicator ? void 0 : reactExports.createElement("div", { className: "components-triangle" })
    ),
    reactExports.createElement(PopupItemPopup, { isOpen: isPanelShown, onClose: handleClose, position: toToolbarPopupRelativePosition(expandsToDirection, panelAlignment), target, keepContentsMounted: props.keepContentsMounted }, panel)
  );
}
function PopupItemPopup(props) {
  const isHidden = useToolbarPopupAutoHideContext();
  const className = classnames("components-toolbar-popupItem_popupItemPopup", isHidden && "nz-hidden");
  return reactExports.createElement(Popup, { className, offset: 0, showShadow: false, ...props });
}
const ToolbarPopupAutoHideContext = reactExports.createContext(false);
function useToolbarPopupAutoHideContext() {
  return reactExports.useContext(ToolbarPopupAutoHideContext);
}
var ToolbarPanelAlignment;
(function(ToolbarPanelAlignment2) {
  ToolbarPanelAlignment2[ToolbarPanelAlignment2["Start"] = 0] = "Start";
  ToolbarPanelAlignment2[ToolbarPanelAlignment2["End"] = 1] = "End";
})(ToolbarPanelAlignment || (ToolbarPanelAlignment = {}));
var ToolbarOpacitySetting;
(function(ToolbarOpacitySetting2) {
  ToolbarOpacitySetting2[ToolbarOpacitySetting2["Defaults"] = 0] = "Defaults";
  ToolbarOpacitySetting2[ToolbarOpacitySetting2["Proximity"] = 1] = "Proximity";
  ToolbarOpacitySetting2[ToolbarOpacitySetting2["Transparent"] = 2] = "Transparent";
})(ToolbarOpacitySetting || (ToolbarOpacitySetting = {}));
const ToolbarWithOverflowDirectionContext = reactExports.createContext({
  expandsTo: Direction.Bottom,
  direction: OrthogonalDirection.Horizontal,
  overflowExpandsTo: Direction.Right,
  overflowDirection: OrthogonalDirection.Vertical,
  panelAlignment: ToolbarPanelAlignment.Start,
  useDragInteraction: false,
  toolbarOpacitySetting: ToolbarOpacitySetting.Proximity,
  openPopupCount: 0,
  onPopupPanelOpenClose: (_isOpening) => {
  },
  overflowDisplayActive: false,
  onItemExecuted: (_item) => void 0,
  onKeyDown: (_e) => void 0
});
function useToolbarWithOverflowDirectionContext() {
  return reactExports.useContext(ToolbarWithOverflowDirectionContext);
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
class HighlightingEngine {
  _searchText;
  _activeMatch;
  /** @deprecated in 5.28.0. Use `HIGHLIGHT_ACTIVE_CLASS_NAME` instead. */
  static ACTIVE_CLASS_NAME = "components-activehighlight";
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
  static renderNodeLabel(text2, props) {
    if (props.searchText)
      return reactExports.createElement(HighlightedText, { text: text2, ...props });
    return text2;
  }
}
function toRxjsObservable(observable2) {
  return new Observable((subscriber) => {
    observable2.subscribe(subscriber);
  });
}
var _listCacheClear;
var hasRequired_listCacheClear;
function require_listCacheClear() {
  if (hasRequired_listCacheClear) return _listCacheClear;
  hasRequired_listCacheClear = 1;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  _listCacheClear = listCacheClear;
  return _listCacheClear;
}
var eq_1;
var hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  eq_1 = eq;
  return eq_1;
}
var _assocIndexOf;
var hasRequired_assocIndexOf;
function require_assocIndexOf() {
  if (hasRequired_assocIndexOf) return _assocIndexOf;
  hasRequired_assocIndexOf = 1;
  var eq = requireEq();
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  _assocIndexOf = assocIndexOf;
  return _assocIndexOf;
}
var _listCacheDelete;
var hasRequired_listCacheDelete;
function require_listCacheDelete() {
  if (hasRequired_listCacheDelete) return _listCacheDelete;
  hasRequired_listCacheDelete = 1;
  var assocIndexOf = require_assocIndexOf();
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  _listCacheDelete = listCacheDelete;
  return _listCacheDelete;
}
var _listCacheGet;
var hasRequired_listCacheGet;
function require_listCacheGet() {
  if (hasRequired_listCacheGet) return _listCacheGet;
  hasRequired_listCacheGet = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  _listCacheGet = listCacheGet;
  return _listCacheGet;
}
var _listCacheHas;
var hasRequired_listCacheHas;
function require_listCacheHas() {
  if (hasRequired_listCacheHas) return _listCacheHas;
  hasRequired_listCacheHas = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  _listCacheHas = listCacheHas;
  return _listCacheHas;
}
var _listCacheSet;
var hasRequired_listCacheSet;
function require_listCacheSet() {
  if (hasRequired_listCacheSet) return _listCacheSet;
  hasRequired_listCacheSet = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  _listCacheSet = listCacheSet;
  return _listCacheSet;
}
var _ListCache;
var hasRequired_ListCache;
function require_ListCache() {
  if (hasRequired_ListCache) return _ListCache;
  hasRequired_ListCache = 1;
  var listCacheClear = require_listCacheClear(), listCacheDelete = require_listCacheDelete(), listCacheGet = require_listCacheGet(), listCacheHas = require_listCacheHas(), listCacheSet = require_listCacheSet();
  function ListCache(entries2) {
    var index = -1, length = entries2 == null ? 0 : entries2.length;
    this.clear();
    while (++index < length) {
      var entry = entries2[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  _ListCache = ListCache;
  return _ListCache;
}
var _stackClear;
var hasRequired_stackClear;
function require_stackClear() {
  if (hasRequired_stackClear) return _stackClear;
  hasRequired_stackClear = 1;
  var ListCache = require_ListCache();
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  _stackClear = stackClear;
  return _stackClear;
}
var _stackDelete;
var hasRequired_stackDelete;
function require_stackDelete() {
  if (hasRequired_stackDelete) return _stackDelete;
  hasRequired_stackDelete = 1;
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  _stackDelete = stackDelete;
  return _stackDelete;
}
var _stackGet;
var hasRequired_stackGet;
function require_stackGet() {
  if (hasRequired_stackGet) return _stackGet;
  hasRequired_stackGet = 1;
  function stackGet(key) {
    return this.__data__.get(key);
  }
  _stackGet = stackGet;
  return _stackGet;
}
var _stackHas;
var hasRequired_stackHas;
function require_stackHas() {
  if (hasRequired_stackHas) return _stackHas;
  hasRequired_stackHas = 1;
  function stackHas(key) {
    return this.__data__.has(key);
  }
  _stackHas = stackHas;
  return _stackHas;
}
var isFunction_1;
var hasRequiredIsFunction;
function requireIsFunction() {
  if (hasRequiredIsFunction) return isFunction_1;
  hasRequiredIsFunction = 1;
  var baseGetTag = require_baseGetTag(), isObject = requireIsObject();
  var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction2(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  isFunction_1 = isFunction2;
  return isFunction_1;
}
var _coreJsData;
var hasRequired_coreJsData;
function require_coreJsData() {
  if (hasRequired_coreJsData) return _coreJsData;
  hasRequired_coreJsData = 1;
  var root = require_root();
  var coreJsData = root["__core-js_shared__"];
  _coreJsData = coreJsData;
  return _coreJsData;
}
var _isMasked;
var hasRequired_isMasked;
function require_isMasked() {
  if (hasRequired_isMasked) return _isMasked;
  hasRequired_isMasked = 1;
  var coreJsData = require_coreJsData();
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  })();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  _isMasked = isMasked;
  return _isMasked;
}
var _toSource;
var hasRequired_toSource;
function require_toSource() {
  if (hasRequired_toSource) return _toSource;
  hasRequired_toSource = 1;
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  _toSource = toSource;
  return _toSource;
}
var _baseIsNative;
var hasRequired_baseIsNative;
function require_baseIsNative() {
  if (hasRequired_baseIsNative) return _baseIsNative;
  hasRequired_baseIsNative = 1;
  var isFunction2 = requireIsFunction(), isMasked = require_isMasked(), isObject = requireIsObject(), toSource = require_toSource();
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto = Function.prototype, objectProto = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  _baseIsNative = baseIsNative;
  return _baseIsNative;
}
var _getValue;
var hasRequired_getValue;
function require_getValue() {
  if (hasRequired_getValue) return _getValue;
  hasRequired_getValue = 1;
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  _getValue = getValue;
  return _getValue;
}
var _getNative;
var hasRequired_getNative;
function require_getNative() {
  if (hasRequired_getNative) return _getNative;
  hasRequired_getNative = 1;
  var baseIsNative = require_baseIsNative(), getValue = require_getValue();
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  _getNative = getNative;
  return _getNative;
}
var _Map;
var hasRequired_Map;
function require_Map() {
  if (hasRequired_Map) return _Map;
  hasRequired_Map = 1;
  var getNative = require_getNative(), root = require_root();
  var Map2 = getNative(root, "Map");
  _Map = Map2;
  return _Map;
}
var _nativeCreate;
var hasRequired_nativeCreate;
function require_nativeCreate() {
  if (hasRequired_nativeCreate) return _nativeCreate;
  hasRequired_nativeCreate = 1;
  var getNative = require_getNative();
  var nativeCreate = getNative(Object, "create");
  _nativeCreate = nativeCreate;
  return _nativeCreate;
}
var _hashClear;
var hasRequired_hashClear;
function require_hashClear() {
  if (hasRequired_hashClear) return _hashClear;
  hasRequired_hashClear = 1;
  var nativeCreate = require_nativeCreate();
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  _hashClear = hashClear;
  return _hashClear;
}
var _hashDelete;
var hasRequired_hashDelete;
function require_hashDelete() {
  if (hasRequired_hashDelete) return _hashDelete;
  hasRequired_hashDelete = 1;
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  _hashDelete = hashDelete;
  return _hashDelete;
}
var _hashGet;
var hasRequired_hashGet;
function require_hashGet() {
  if (hasRequired_hashGet) return _hashGet;
  hasRequired_hashGet = 1;
  var nativeCreate = require_nativeCreate();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  _hashGet = hashGet;
  return _hashGet;
}
var _hashHas;
var hasRequired_hashHas;
function require_hashHas() {
  if (hasRequired_hashHas) return _hashHas;
  hasRequired_hashHas = 1;
  var nativeCreate = require_nativeCreate();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  _hashHas = hashHas;
  return _hashHas;
}
var _hashSet;
var hasRequired_hashSet;
function require_hashSet() {
  if (hasRequired_hashSet) return _hashSet;
  hasRequired_hashSet = 1;
  var nativeCreate = require_nativeCreate();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  _hashSet = hashSet;
  return _hashSet;
}
var _Hash;
var hasRequired_Hash;
function require_Hash() {
  if (hasRequired_Hash) return _Hash;
  hasRequired_Hash = 1;
  var hashClear = require_hashClear(), hashDelete = require_hashDelete(), hashGet = require_hashGet(), hashHas = require_hashHas(), hashSet = require_hashSet();
  function Hash(entries2) {
    var index = -1, length = entries2 == null ? 0 : entries2.length;
    this.clear();
    while (++index < length) {
      var entry = entries2[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  _Hash = Hash;
  return _Hash;
}
var _mapCacheClear;
var hasRequired_mapCacheClear;
function require_mapCacheClear() {
  if (hasRequired_mapCacheClear) return _mapCacheClear;
  hasRequired_mapCacheClear = 1;
  var Hash = require_Hash(), ListCache = require_ListCache(), Map2 = require_Map();
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map2 || ListCache)(),
      "string": new Hash()
    };
  }
  _mapCacheClear = mapCacheClear;
  return _mapCacheClear;
}
var _isKeyable;
var hasRequired_isKeyable;
function require_isKeyable() {
  if (hasRequired_isKeyable) return _isKeyable;
  hasRequired_isKeyable = 1;
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  _isKeyable = isKeyable;
  return _isKeyable;
}
var _getMapData;
var hasRequired_getMapData;
function require_getMapData() {
  if (hasRequired_getMapData) return _getMapData;
  hasRequired_getMapData = 1;
  var isKeyable = require_isKeyable();
  function getMapData(map2, key) {
    var data = map2.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  _getMapData = getMapData;
  return _getMapData;
}
var _mapCacheDelete;
var hasRequired_mapCacheDelete;
function require_mapCacheDelete() {
  if (hasRequired_mapCacheDelete) return _mapCacheDelete;
  hasRequired_mapCacheDelete = 1;
  var getMapData = require_getMapData();
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  _mapCacheDelete = mapCacheDelete;
  return _mapCacheDelete;
}
var _mapCacheGet;
var hasRequired_mapCacheGet;
function require_mapCacheGet() {
  if (hasRequired_mapCacheGet) return _mapCacheGet;
  hasRequired_mapCacheGet = 1;
  var getMapData = require_getMapData();
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  _mapCacheGet = mapCacheGet;
  return _mapCacheGet;
}
var _mapCacheHas;
var hasRequired_mapCacheHas;
function require_mapCacheHas() {
  if (hasRequired_mapCacheHas) return _mapCacheHas;
  hasRequired_mapCacheHas = 1;
  var getMapData = require_getMapData();
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  _mapCacheHas = mapCacheHas;
  return _mapCacheHas;
}
var _mapCacheSet;
var hasRequired_mapCacheSet;
function require_mapCacheSet() {
  if (hasRequired_mapCacheSet) return _mapCacheSet;
  hasRequired_mapCacheSet = 1;
  var getMapData = require_getMapData();
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size2 = data.size;
    data.set(key, value);
    this.size += data.size == size2 ? 0 : 1;
    return this;
  }
  _mapCacheSet = mapCacheSet;
  return _mapCacheSet;
}
var _MapCache;
var hasRequired_MapCache;
function require_MapCache() {
  if (hasRequired_MapCache) return _MapCache;
  hasRequired_MapCache = 1;
  var mapCacheClear = require_mapCacheClear(), mapCacheDelete = require_mapCacheDelete(), mapCacheGet = require_mapCacheGet(), mapCacheHas = require_mapCacheHas(), mapCacheSet = require_mapCacheSet();
  function MapCache(entries2) {
    var index = -1, length = entries2 == null ? 0 : entries2.length;
    this.clear();
    while (++index < length) {
      var entry = entries2[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  _MapCache = MapCache;
  return _MapCache;
}
var _stackSet;
var hasRequired_stackSet;
function require_stackSet() {
  if (hasRequired_stackSet) return _stackSet;
  hasRequired_stackSet = 1;
  var ListCache = require_ListCache(), Map2 = require_Map(), MapCache = require_MapCache();
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  _stackSet = stackSet;
  return _stackSet;
}
var _Stack;
var hasRequired_Stack;
function require_Stack() {
  if (hasRequired_Stack) return _Stack;
  hasRequired_Stack = 1;
  var ListCache = require_ListCache(), stackClear = require_stackClear(), stackDelete = require_stackDelete(), stackGet = require_stackGet(), stackHas = require_stackHas(), stackSet = require_stackSet();
  function Stack(entries2) {
    var data = this.__data__ = new ListCache(entries2);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  _Stack = Stack;
  return _Stack;
}
var _arrayEach;
var hasRequired_arrayEach;
function require_arrayEach() {
  if (hasRequired_arrayEach) return _arrayEach;
  hasRequired_arrayEach = 1;
  function arrayEach(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  _arrayEach = arrayEach;
  return _arrayEach;
}
var _defineProperty;
var hasRequired_defineProperty;
function require_defineProperty() {
  if (hasRequired_defineProperty) return _defineProperty;
  hasRequired_defineProperty = 1;
  var getNative = require_getNative();
  var defineProperty = (function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  })();
  _defineProperty = defineProperty;
  return _defineProperty;
}
var _baseAssignValue;
var hasRequired_baseAssignValue;
function require_baseAssignValue() {
  if (hasRequired_baseAssignValue) return _baseAssignValue;
  hasRequired_baseAssignValue = 1;
  var defineProperty = require_defineProperty();
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty) {
      defineProperty(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  _baseAssignValue = baseAssignValue;
  return _baseAssignValue;
}
var _assignValue;
var hasRequired_assignValue;
function require_assignValue() {
  if (hasRequired_assignValue) return _assignValue;
  hasRequired_assignValue = 1;
  var baseAssignValue = require_baseAssignValue(), eq = requireEq();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  _assignValue = assignValue;
  return _assignValue;
}
var _copyObject;
var hasRequired_copyObject;
function require_copyObject() {
  if (hasRequired_copyObject) return _copyObject;
  hasRequired_copyObject = 1;
  var assignValue = require_assignValue(), baseAssignValue = require_baseAssignValue();
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }
  _copyObject = copyObject;
  return _copyObject;
}
var _baseTimes;
var hasRequired_baseTimes;
function require_baseTimes() {
  if (hasRequired_baseTimes) return _baseTimes;
  hasRequired_baseTimes = 1;
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  _baseTimes = baseTimes;
  return _baseTimes;
}
var _baseIsArguments;
var hasRequired_baseIsArguments;
function require_baseIsArguments() {
  if (hasRequired_baseIsArguments) return _baseIsArguments;
  hasRequired_baseIsArguments = 1;
  var baseGetTag = require_baseGetTag(), isObjectLike = requireIsObjectLike();
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }
  _baseIsArguments = baseIsArguments;
  return _baseIsArguments;
}
var isArguments_1;
var hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments) return isArguments_1;
  hasRequiredIsArguments = 1;
  var baseIsArguments = require_baseIsArguments(), isObjectLike = requireIsObjectLike();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  isArguments_1 = isArguments;
  return isArguments_1;
}
var isArray_1;
var hasRequiredIsArray;
function requireIsArray() {
  if (hasRequiredIsArray) return isArray_1;
  hasRequiredIsArray = 1;
  var isArray = Array.isArray;
  isArray_1 = isArray;
  return isArray_1;
}
var isBuffer = { exports: {} };
var stubFalse_1;
var hasRequiredStubFalse;
function requireStubFalse() {
  if (hasRequiredStubFalse) return stubFalse_1;
  hasRequiredStubFalse = 1;
  function stubFalse() {
    return false;
  }
  stubFalse_1 = stubFalse;
  return stubFalse_1;
}
isBuffer.exports;
var hasRequiredIsBuffer;
function requireIsBuffer() {
  if (hasRequiredIsBuffer) return isBuffer.exports;
  hasRequiredIsBuffer = 1;
  (function(module, exports$1) {
    var root = require_root(), stubFalse = requireStubFalse();
    var freeExports = exports$1 && !exports$1.nodeType && exports$1;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer2 = nativeIsBuffer || stubFalse;
    module.exports = isBuffer2;
  })(isBuffer, isBuffer.exports);
  return isBuffer.exports;
}
var _isIndex;
var hasRequired_isIndex;
function require_isIndex() {
  if (hasRequired_isIndex) return _isIndex;
  hasRequired_isIndex = 1;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  _isIndex = isIndex;
  return _isIndex;
}
var isLength_1;
var hasRequiredIsLength;
function requireIsLength() {
  if (hasRequiredIsLength) return isLength_1;
  hasRequiredIsLength = 1;
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  isLength_1 = isLength;
  return isLength_1;
}
var _baseIsTypedArray;
var hasRequired_baseIsTypedArray;
function require_baseIsTypedArray() {
  if (hasRequired_baseIsTypedArray) return _baseIsTypedArray;
  hasRequired_baseIsTypedArray = 1;
  var baseGetTag = require_baseGetTag(), isLength = requireIsLength(), isObjectLike = requireIsObjectLike();
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  _baseIsTypedArray = baseIsTypedArray;
  return _baseIsTypedArray;
}
var _baseUnary;
var hasRequired_baseUnary;
function require_baseUnary() {
  if (hasRequired_baseUnary) return _baseUnary;
  hasRequired_baseUnary = 1;
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  _baseUnary = baseUnary;
  return _baseUnary;
}
var _nodeUtil = { exports: {} };
_nodeUtil.exports;
var hasRequired_nodeUtil;
function require_nodeUtil() {
  if (hasRequired_nodeUtil) return _nodeUtil.exports;
  hasRequired_nodeUtil = 1;
  (function(module, exports$1) {
    var freeGlobal = require_freeGlobal();
    var freeExports = exports$1 && !exports$1.nodeType && exports$1;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    module.exports = nodeUtil;
  })(_nodeUtil, _nodeUtil.exports);
  return _nodeUtil.exports;
}
var isTypedArray_1;
var hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray) return isTypedArray_1;
  hasRequiredIsTypedArray = 1;
  var baseIsTypedArray = require_baseIsTypedArray(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  isTypedArray_1 = isTypedArray;
  return isTypedArray_1;
}
var _arrayLikeKeys;
var hasRequired_arrayLikeKeys;
function require_arrayLikeKeys() {
  if (hasRequired_arrayLikeKeys) return _arrayLikeKeys;
  hasRequired_arrayLikeKeys = 1;
  var baseTimes = require_baseTimes(), isArguments = requireIsArguments(), isArray = requireIsArray(), isBuffer2 = requireIsBuffer(), isIndex = require_isIndex(), isTypedArray = requireIsTypedArray();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  _arrayLikeKeys = arrayLikeKeys;
  return _arrayLikeKeys;
}
var _isPrototype;
var hasRequired_isPrototype;
function require_isPrototype() {
  if (hasRequired_isPrototype) return _isPrototype;
  hasRequired_isPrototype = 1;
  var objectProto = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  _isPrototype = isPrototype;
  return _isPrototype;
}
var _overArg;
var hasRequired_overArg;
function require_overArg() {
  if (hasRequired_overArg) return _overArg;
  hasRequired_overArg = 1;
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  _overArg = overArg;
  return _overArg;
}
var _nativeKeys;
var hasRequired_nativeKeys;
function require_nativeKeys() {
  if (hasRequired_nativeKeys) return _nativeKeys;
  hasRequired_nativeKeys = 1;
  var overArg = require_overArg();
  var nativeKeys = overArg(Object.keys, Object);
  _nativeKeys = nativeKeys;
  return _nativeKeys;
}
var _baseKeys;
var hasRequired_baseKeys;
function require_baseKeys() {
  if (hasRequired_baseKeys) return _baseKeys;
  hasRequired_baseKeys = 1;
  var isPrototype = require_isPrototype(), nativeKeys = require_nativeKeys();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  _baseKeys = baseKeys;
  return _baseKeys;
}
var isArrayLike_1;
var hasRequiredIsArrayLike;
function requireIsArrayLike() {
  if (hasRequiredIsArrayLike) return isArrayLike_1;
  hasRequiredIsArrayLike = 1;
  var isFunction2 = requireIsFunction(), isLength = requireIsLength();
  function isArrayLike2(value) {
    return value != null && isLength(value.length) && !isFunction2(value);
  }
  isArrayLike_1 = isArrayLike2;
  return isArrayLike_1;
}
var keys_1;
var hasRequiredKeys;
function requireKeys() {
  if (hasRequiredKeys) return keys_1;
  hasRequiredKeys = 1;
  var arrayLikeKeys = require_arrayLikeKeys(), baseKeys = require_baseKeys(), isArrayLike2 = requireIsArrayLike();
  function keys(object) {
    return isArrayLike2(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  keys_1 = keys;
  return keys_1;
}
var _baseAssign;
var hasRequired_baseAssign;
function require_baseAssign() {
  if (hasRequired_baseAssign) return _baseAssign;
  hasRequired_baseAssign = 1;
  var copyObject = require_copyObject(), keys = requireKeys();
  function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object);
  }
  _baseAssign = baseAssign;
  return _baseAssign;
}
var _nativeKeysIn;
var hasRequired_nativeKeysIn;
function require_nativeKeysIn() {
  if (hasRequired_nativeKeysIn) return _nativeKeysIn;
  hasRequired_nativeKeysIn = 1;
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  _nativeKeysIn = nativeKeysIn;
  return _nativeKeysIn;
}
var _baseKeysIn;
var hasRequired_baseKeysIn;
function require_baseKeysIn() {
  if (hasRequired_baseKeysIn) return _baseKeysIn;
  hasRequired_baseKeysIn = 1;
  var isObject = requireIsObject(), isPrototype = require_isPrototype(), nativeKeysIn = require_nativeKeysIn();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  _baseKeysIn = baseKeysIn;
  return _baseKeysIn;
}
var keysIn_1;
var hasRequiredKeysIn;
function requireKeysIn() {
  if (hasRequiredKeysIn) return keysIn_1;
  hasRequiredKeysIn = 1;
  var arrayLikeKeys = require_arrayLikeKeys(), baseKeysIn = require_baseKeysIn(), isArrayLike2 = requireIsArrayLike();
  function keysIn(object) {
    return isArrayLike2(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }
  keysIn_1 = keysIn;
  return keysIn_1;
}
var _baseAssignIn;
var hasRequired_baseAssignIn;
function require_baseAssignIn() {
  if (hasRequired_baseAssignIn) return _baseAssignIn;
  hasRequired_baseAssignIn = 1;
  var copyObject = require_copyObject(), keysIn = requireKeysIn();
  function baseAssignIn(object, source) {
    return object && copyObject(source, keysIn(source), object);
  }
  _baseAssignIn = baseAssignIn;
  return _baseAssignIn;
}
var _cloneBuffer = { exports: {} };
_cloneBuffer.exports;
var hasRequired_cloneBuffer;
function require_cloneBuffer() {
  if (hasRequired_cloneBuffer) return _cloneBuffer.exports;
  hasRequired_cloneBuffer = 1;
  (function(module, exports$1) {
    var root = require_root();
    var freeExports = exports$1 && !exports$1.nodeType && exports$1;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    module.exports = cloneBuffer;
  })(_cloneBuffer, _cloneBuffer.exports);
  return _cloneBuffer.exports;
}
var _copyArray;
var hasRequired_copyArray;
function require_copyArray() {
  if (hasRequired_copyArray) return _copyArray;
  hasRequired_copyArray = 1;
  function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  _copyArray = copyArray;
  return _copyArray;
}
var _arrayFilter;
var hasRequired_arrayFilter;
function require_arrayFilter() {
  if (hasRequired_arrayFilter) return _arrayFilter;
  hasRequired_arrayFilter = 1;
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  _arrayFilter = arrayFilter;
  return _arrayFilter;
}
var stubArray_1;
var hasRequiredStubArray;
function requireStubArray() {
  if (hasRequiredStubArray) return stubArray_1;
  hasRequiredStubArray = 1;
  function stubArray() {
    return [];
  }
  stubArray_1 = stubArray;
  return stubArray_1;
}
var _getSymbols;
var hasRequired_getSymbols;
function require_getSymbols() {
  if (hasRequired_getSymbols) return _getSymbols;
  hasRequired_getSymbols = 1;
  var arrayFilter = require_arrayFilter(), stubArray = requireStubArray();
  var objectProto = Object.prototype;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  _getSymbols = getSymbols;
  return _getSymbols;
}
var _copySymbols;
var hasRequired_copySymbols;
function require_copySymbols() {
  if (hasRequired_copySymbols) return _copySymbols;
  hasRequired_copySymbols = 1;
  var copyObject = require_copyObject(), getSymbols = require_getSymbols();
  function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object);
  }
  _copySymbols = copySymbols;
  return _copySymbols;
}
var _arrayPush;
var hasRequired_arrayPush;
function require_arrayPush() {
  if (hasRequired_arrayPush) return _arrayPush;
  hasRequired_arrayPush = 1;
  function arrayPush2(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  _arrayPush = arrayPush2;
  return _arrayPush;
}
var _getPrototype;
var hasRequired_getPrototype;
function require_getPrototype() {
  if (hasRequired_getPrototype) return _getPrototype;
  hasRequired_getPrototype = 1;
  var overArg = require_overArg();
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  _getPrototype = getPrototype;
  return _getPrototype;
}
var _getSymbolsIn;
var hasRequired_getSymbolsIn;
function require_getSymbolsIn() {
  if (hasRequired_getSymbolsIn) return _getSymbolsIn;
  hasRequired_getSymbolsIn = 1;
  var arrayPush2 = require_arrayPush(), getPrototype = require_getPrototype(), getSymbols = require_getSymbols(), stubArray = requireStubArray();
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
    var result = [];
    while (object) {
      arrayPush2(result, getSymbols(object));
      object = getPrototype(object);
    }
    return result;
  };
  _getSymbolsIn = getSymbolsIn;
  return _getSymbolsIn;
}
var _copySymbolsIn;
var hasRequired_copySymbolsIn;
function require_copySymbolsIn() {
  if (hasRequired_copySymbolsIn) return _copySymbolsIn;
  hasRequired_copySymbolsIn = 1;
  var copyObject = require_copyObject(), getSymbolsIn = require_getSymbolsIn();
  function copySymbolsIn(source, object) {
    return copyObject(source, getSymbolsIn(source), object);
  }
  _copySymbolsIn = copySymbolsIn;
  return _copySymbolsIn;
}
var _baseGetAllKeys;
var hasRequired_baseGetAllKeys;
function require_baseGetAllKeys() {
  if (hasRequired_baseGetAllKeys) return _baseGetAllKeys;
  hasRequired_baseGetAllKeys = 1;
  var arrayPush2 = require_arrayPush(), isArray = requireIsArray();
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush2(result, symbolsFunc(object));
  }
  _baseGetAllKeys = baseGetAllKeys;
  return _baseGetAllKeys;
}
var _getAllKeys;
var hasRequired_getAllKeys;
function require_getAllKeys() {
  if (hasRequired_getAllKeys) return _getAllKeys;
  hasRequired_getAllKeys = 1;
  var baseGetAllKeys = require_baseGetAllKeys(), getSymbols = require_getSymbols(), keys = requireKeys();
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  _getAllKeys = getAllKeys;
  return _getAllKeys;
}
var _getAllKeysIn;
var hasRequired_getAllKeysIn;
function require_getAllKeysIn() {
  if (hasRequired_getAllKeysIn) return _getAllKeysIn;
  hasRequired_getAllKeysIn = 1;
  var baseGetAllKeys = require_baseGetAllKeys(), getSymbolsIn = require_getSymbolsIn(), keysIn = requireKeysIn();
  function getAllKeysIn(object) {
    return baseGetAllKeys(object, keysIn, getSymbolsIn);
  }
  _getAllKeysIn = getAllKeysIn;
  return _getAllKeysIn;
}
var _DataView;
var hasRequired_DataView;
function require_DataView() {
  if (hasRequired_DataView) return _DataView;
  hasRequired_DataView = 1;
  var getNative = require_getNative(), root = require_root();
  var DataView = getNative(root, "DataView");
  _DataView = DataView;
  return _DataView;
}
var _Promise;
var hasRequired_Promise;
function require_Promise() {
  if (hasRequired_Promise) return _Promise;
  hasRequired_Promise = 1;
  var getNative = require_getNative(), root = require_root();
  var Promise2 = getNative(root, "Promise");
  _Promise = Promise2;
  return _Promise;
}
var _Set;
var hasRequired_Set;
function require_Set() {
  if (hasRequired_Set) return _Set;
  hasRequired_Set = 1;
  var getNative = require_getNative(), root = require_root();
  var Set2 = getNative(root, "Set");
  _Set = Set2;
  return _Set;
}
var _WeakMap;
var hasRequired_WeakMap;
function require_WeakMap() {
  if (hasRequired_WeakMap) return _WeakMap;
  hasRequired_WeakMap = 1;
  var getNative = require_getNative(), root = require_root();
  var WeakMap2 = getNative(root, "WeakMap");
  _WeakMap = WeakMap2;
  return _WeakMap;
}
var _getTag;
var hasRequired_getTag;
function require_getTag() {
  if (hasRequired_getTag) return _getTag;
  hasRequired_getTag = 1;
  var DataView = require_DataView(), Map2 = require_Map(), Promise2 = require_Promise(), Set2 = require_Set(), WeakMap2 = require_WeakMap(), baseGetTag = require_baseGetTag(), toSource = require_toSource();
  var mapTag = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
  var dataViewTag = "[object DataView]";
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
    getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  _getTag = getTag;
  return _getTag;
}
var _initCloneArray;
var hasRequired_initCloneArray;
function require_initCloneArray() {
  if (hasRequired_initCloneArray) return _initCloneArray;
  hasRequired_initCloneArray = 1;
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function initCloneArray(array) {
    var length = array.length, result = new array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  _initCloneArray = initCloneArray;
  return _initCloneArray;
}
var _Uint8Array;
var hasRequired_Uint8Array;
function require_Uint8Array() {
  if (hasRequired_Uint8Array) return _Uint8Array;
  hasRequired_Uint8Array = 1;
  var root = require_root();
  var Uint8Array2 = root.Uint8Array;
  _Uint8Array = Uint8Array2;
  return _Uint8Array;
}
var _cloneArrayBuffer;
var hasRequired_cloneArrayBuffer;
function require_cloneArrayBuffer() {
  if (hasRequired_cloneArrayBuffer) return _cloneArrayBuffer;
  hasRequired_cloneArrayBuffer = 1;
  var Uint8Array2 = require_Uint8Array();
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
    return result;
  }
  _cloneArrayBuffer = cloneArrayBuffer;
  return _cloneArrayBuffer;
}
var _cloneDataView;
var hasRequired_cloneDataView;
function require_cloneDataView() {
  if (hasRequired_cloneDataView) return _cloneDataView;
  hasRequired_cloneDataView = 1;
  var cloneArrayBuffer = require_cloneArrayBuffer();
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  _cloneDataView = cloneDataView;
  return _cloneDataView;
}
var _cloneRegExp;
var hasRequired_cloneRegExp;
function require_cloneRegExp() {
  if (hasRequired_cloneRegExp) return _cloneRegExp;
  hasRequired_cloneRegExp = 1;
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  _cloneRegExp = cloneRegExp;
  return _cloneRegExp;
}
var _cloneSymbol;
var hasRequired_cloneSymbol;
function require_cloneSymbol() {
  if (hasRequired_cloneSymbol) return _cloneSymbol;
  hasRequired_cloneSymbol = 1;
  var Symbol2 = require_Symbol();
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  _cloneSymbol = cloneSymbol;
  return _cloneSymbol;
}
var _cloneTypedArray;
var hasRequired_cloneTypedArray;
function require_cloneTypedArray() {
  if (hasRequired_cloneTypedArray) return _cloneTypedArray;
  hasRequired_cloneTypedArray = 1;
  var cloneArrayBuffer = require_cloneArrayBuffer();
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  _cloneTypedArray = cloneTypedArray;
  return _cloneTypedArray;
}
var _initCloneByTag;
var hasRequired_initCloneByTag;
function require_initCloneByTag() {
  if (hasRequired_initCloneByTag) return _initCloneByTag;
  hasRequired_initCloneByTag = 1;
  var cloneArrayBuffer = require_cloneArrayBuffer(), cloneDataView = require_cloneDataView(), cloneRegExp = require_cloneRegExp(), cloneSymbol = require_cloneSymbol(), cloneTypedArray = require_cloneTypedArray();
  var boolTag = "[object Boolean]", dateTag = "[object Date]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag:
        return cloneArrayBuffer(object);
      case boolTag:
      case dateTag:
        return new Ctor(+object);
      case dataViewTag:
        return cloneDataView(object, isDeep);
      case float32Tag:
      case float64Tag:
      case int8Tag:
      case int16Tag:
      case int32Tag:
      case uint8Tag:
      case uint8ClampedTag:
      case uint16Tag:
      case uint32Tag:
        return cloneTypedArray(object, isDeep);
      case mapTag:
        return new Ctor();
      case numberTag:
      case stringTag:
        return new Ctor(object);
      case regexpTag:
        return cloneRegExp(object);
      case setTag:
        return new Ctor();
      case symbolTag:
        return cloneSymbol(object);
    }
  }
  _initCloneByTag = initCloneByTag;
  return _initCloneByTag;
}
var _baseCreate;
var hasRequired_baseCreate;
function require_baseCreate() {
  if (hasRequired_baseCreate) return _baseCreate;
  hasRequired_baseCreate = 1;
  var isObject = requireIsObject();
  var objectCreate = Object.create;
  var baseCreate = /* @__PURE__ */ (function() {
    function object() {
    }
    return function(proto) {
      if (!isObject(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  })();
  _baseCreate = baseCreate;
  return _baseCreate;
}
var _initCloneObject;
var hasRequired_initCloneObject;
function require_initCloneObject() {
  if (hasRequired_initCloneObject) return _initCloneObject;
  hasRequired_initCloneObject = 1;
  var baseCreate = require_baseCreate(), getPrototype = require_getPrototype(), isPrototype = require_isPrototype();
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
  }
  _initCloneObject = initCloneObject;
  return _initCloneObject;
}
var _baseIsMap;
var hasRequired_baseIsMap;
function require_baseIsMap() {
  if (hasRequired_baseIsMap) return _baseIsMap;
  hasRequired_baseIsMap = 1;
  var getTag = require_getTag(), isObjectLike = requireIsObjectLike();
  var mapTag = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike(value) && getTag(value) == mapTag;
  }
  _baseIsMap = baseIsMap;
  return _baseIsMap;
}
var isMap_1;
var hasRequiredIsMap;
function requireIsMap() {
  if (hasRequiredIsMap) return isMap_1;
  hasRequiredIsMap = 1;
  var baseIsMap = require_baseIsMap(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil();
  var nodeIsMap = nodeUtil && nodeUtil.isMap;
  var isMap2 = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
  isMap_1 = isMap2;
  return isMap_1;
}
var _baseIsSet;
var hasRequired_baseIsSet;
function require_baseIsSet() {
  if (hasRequired_baseIsSet) return _baseIsSet;
  hasRequired_baseIsSet = 1;
  var getTag = require_getTag(), isObjectLike = requireIsObjectLike();
  var setTag = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike(value) && getTag(value) == setTag;
  }
  _baseIsSet = baseIsSet;
  return _baseIsSet;
}
var isSet_1;
var hasRequiredIsSet;
function requireIsSet() {
  if (hasRequiredIsSet) return isSet_1;
  hasRequiredIsSet = 1;
  var baseIsSet = require_baseIsSet(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil();
  var nodeIsSet = nodeUtil && nodeUtil.isSet;
  var isSet2 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
  isSet_1 = isSet2;
  return isSet_1;
}
var _baseClone;
var hasRequired_baseClone;
function require_baseClone() {
  if (hasRequired_baseClone) return _baseClone;
  hasRequired_baseClone = 1;
  var Stack = require_Stack(), arrayEach = require_arrayEach(), assignValue = require_assignValue(), baseAssign = require_baseAssign(), baseAssignIn = require_baseAssignIn(), cloneBuffer = require_cloneBuffer(), copyArray = require_copyArray(), copySymbols = require_copySymbols(), copySymbolsIn = require_copySymbolsIn(), getAllKeys = require_getAllKeys(), getAllKeysIn = require_getAllKeysIn(), getTag = require_getTag(), initCloneArray = require_initCloneArray(), initCloneByTag = require_initCloneByTag(), initCloneObject = require_initCloneObject(), isArray = requireIsArray(), isBuffer2 = requireIsBuffer(), isMap2 = requireIsMap(), isObject = requireIsObject(), isSet2 = requireIsSet(), keys = requireKeys(), keysIn = requireKeysIn();
  var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject(value)) {
      return value;
    }
    var isArr = isArray(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
      if (isBuffer2(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag || tag == argsTag || isFunc && !object) {
        result = isFlat || isFunc ? {} : initCloneObject(value);
        if (!isDeep) {
          return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (isSet2(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap2(value)) {
      value.forEach(function(subValue, key2) {
        result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
    }
    var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
    var props = isArr ? void 0 : keysFunc(value);
    arrayEach(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
    return result;
  }
  _baseClone = baseClone;
  return _baseClone;
}
var cloneDeep_1;
var hasRequiredCloneDeep;
function requireCloneDeep() {
  if (hasRequiredCloneDeep) return cloneDeep_1;
  hasRequiredCloneDeep = 1;
  var baseClone = require_baseClone();
  var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
  function cloneDeep2(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
  }
  cloneDeep_1 = cloneDeep2;
  return cloneDeep_1;
}
var cloneDeepExports = requireCloneDeep();
const cloneDeep = /* @__PURE__ */ getDefaultExportFromCjs(cloneDeepExports);
class SparseTree {
  [DRAFTABLE];
  _rootNodes = new SparseArray();
  _parentToChildren = {};
  _idToNode = {};
  constructor() {
    this[DRAFTABLE] = true;
  }
  getNode(nodeId) {
    return this._idToNode[nodeId];
  }
  getChildOffset(parentId, childId) {
    const children = this.getChildren(parentId);
    if (!children)
      return void 0;
    return children.getIndex(childId);
  }
  getChildren(parentId, createIfNotExist = false) {
    if (parentId === void 0) {
      return this._rootNodes;
    }
    if (this._parentToChildren[parentId] === void 0 && createIfNotExist) {
      this._parentToChildren[parentId] = new SparseArray();
    }
    return this._parentToChildren[parentId];
  }
  setChildren(parentId, children, offset) {
    const existingChildren = this.getChildren(parentId, true);
    children.forEach((child, index) => {
      const existingChildId = existingChildren.get(offset + index);
      if (existingChildId !== void 0) {
        this.deleteSubtree(existingChildId);
      }
      existingChildren.set(offset + index, child.id);
      this._idToNode[child.id] = child;
    });
  }
  insertChild(parentId, child, offset) {
    const existingChildren = this.getChildren(parentId, true);
    existingChildren.insert(offset, child.id);
    this._idToNode[child.id] = child;
  }
  setNodeId(parentId, index, newId) {
    const previousNodeId = this.getChildren(parentId)?.get(index);
    if (previousNodeId === void 0) {
      return false;
    }
    if (previousNodeId === newId) {
      return true;
    }
    if (this.getNode(newId) !== void 0) {
      return false;
    }
    this._idToNode[newId] = this._idToNode[previousNodeId];
    delete this._idToNode[previousNodeId];
    this._parentToChildren[newId] = this._parentToChildren[previousNodeId];
    delete this._parentToChildren[previousNodeId];
    if (parentId === void 0) {
      this._rootNodes.set(index, newId);
    } else {
      this._parentToChildren[parentId].set(index, newId);
    }
    return true;
  }
  moveNode(sourceParentId, sourceNodeId, targetParentId, targetIndex) {
    const sourceNodeSiblings = this.getChildren(sourceParentId);
    const sourceIndex = this.getChildOffset(sourceParentId, sourceNodeId);
    sourceNodeSiblings.remove(sourceIndex);
    if (targetParentId === sourceParentId && targetIndex > sourceIndex) {
      targetIndex -= 1;
    }
    const targetNodeSiblings = this.getChildren(targetParentId, true);
    targetNodeSiblings.insert(targetIndex, sourceNodeId);
  }
  setNumChildren(parentId, numChildren) {
    const children = this.getChildren(parentId, true);
    for (const [childId] of children.iterateValues()) {
      this.deleteSubtree(childId);
    }
    children.setLength(numChildren);
  }
  removeChild(parentId, child) {
    const children = this.getChildren(parentId);
    if (children === void 0)
      return;
    if (typeof child === "string") {
      const childIndex = children.getIndex(child);
      if (childIndex !== void 0) {
        children.remove(childIndex);
      }
      this.deleteSubtree(child);
    } else {
      const childId = children.get(child);
      children.remove(child);
      if (childId !== void 0) {
        this.deleteSubtree(childId);
      }
    }
  }
  deleteSubtree(parentId, deleteParent = true) {
    const children = this.getChildren(parentId);
    if (children !== void 0) {
      for (const [childId] of children.iterateValues()) {
        this.deleteSubtree(childId);
      }
    }
    if (parentId === void 0) {
      this._rootNodes.setLength(0);
      return;
    }
    if (deleteParent) {
      delete this._idToNode[parentId];
    }
    delete this._parentToChildren[parentId];
  }
}
class SparseArray {
  [DRAFTABLE];
  _length = 0;
  _array = [];
  constructor() {
    this[DRAFTABLE] = true;
  }
  /** Returns length of array including intermediate 'undefined' values */
  getLength() {
    return this._length;
  }
  /** Sets length of array. */
  setLength(length) {
    const { index } = this.lowerBound(length);
    this._array.length = index;
    this._length = length;
  }
  /** Returns index of supplied value.
   *
   * @returns index of value or undefined if value is not found.
   */
  getIndex(lookupValue) {
    for (const [value, index] of this._array) {
      if (value === lookupValue)
        return index;
    }
    return void 0;
  }
  /** Returns value at specific position.
   *
   * @returns stored value or undefined.
   */
  get(index) {
    const { index: i, equal } = this.lowerBound(index);
    return equal ? this._array[i][0] : void 0;
  }
  /** Sets value at specific position. Overrides any existing value. */
  set(index, value) {
    const { index: i, equal } = this.lowerBound(index);
    this._array.splice(i, equal ? 1 : 0, [value, index]);
    this._length = Math.max(this._length, index + 1);
  }
  /** Inserts value at specific position. Increases array length by one. */
  insert(index, value) {
    const { index: i } = this.lowerBound(index);
    this._array.splice(i, 0, [value, index]);
    for (let j = i + 1; j < this._array.length; j++) {
      this._array[j][1]++;
    }
    this._length = Math.max(this._length + 1, index + 1);
  }
  /** Removes value at specified index and reduces array length by one. */
  remove(index) {
    if (index >= this._length) {
      return;
    }
    const { index: i, equal } = this.lowerBound(index);
    this._array.splice(i, equal ? 1 : 0);
    for (let j = i; j < this._array.length; j++) {
      this._array[j][1]--;
    }
    this._length = Math.max(0, this._length - 1);
  }
  /**
   * Iterates values that are stored in the array
   * @returns `[value, index]` tuples.
   */
  iterateValues() {
    return this._array[Symbol.iterator]();
  }
  /** Iterates the array with all intermediate `undefined` values */
  [Symbol.iterator]() {
    const array = this._array;
    const length = this._length;
    return (function* () {
      let currentIndex = 0;
      for (const [value, index] of array) {
        for (; currentIndex < index; ++currentIndex) {
          yield void 0;
        }
        yield value;
        ++currentIndex;
      }
      for (; currentIndex < length; ++currentIndex) {
        yield void 0;
      }
    })();
  }
  lowerBound(index) {
    return lowerBound(index, this._array, SparseArray.compare);
  }
  static compare(index, value) {
    return compareNumbers(index, value[1]);
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
class MutableTreeModel {
  [DRAFTABLE] = true;
  _tree = new SparseTree();
  _rootNode = {
    depth: -1,
    id: void 0,
    numChildren: void 0
  };
  constructor(seed) {
    if (!seed) {
      return;
    }
    cloneSubtree(seed, this, void 0);
  }
  /** Returns root node of a tree. This node is not visible and is there to allow having multiple visible root nodes. */
  getRootNode() {
    return this._rootNode;
  }
  getNode(nodeId, childIndex) {
    if (childIndex === void 0) {
      return this._tree.getNode(nodeId);
    }
    const children = this._tree.getChildren(nodeId);
    const childId = children !== void 0 ? children.get(childIndex) : void 0;
    if (childId !== void 0) {
      return this._tree.getNode(childId);
    }
    const parentNode = nodeId === void 0 ? this._rootNode : this._tree.getNode(nodeId);
    if (parentNode !== void 0) {
      return {
        childIndex,
        depth: parentNode.depth + 1,
        parentId: nodeId
      };
    }
    return void 0;
  }
  /** Returns children for specific parent.
   * @param parentId id of parent node.
   * @returns children of parent node or root nodes if undefined is passed as parent id.
   */
  getChildren(parentId) {
    return this._tree.getChildren(parentId);
  }
  /** Returns children offset in children array for specific parent. */
  getChildOffset(parentId, childId) {
    return this._tree.getChildOffset(parentId, childId);
  }
  /**
   * Sets children for parent node starting from the specific offset.
   * If offset overlaps with already added nodes, the overlapping nodes are overwritten.
   */
  setChildren(parentId, nodeInputs, offset) {
    const parentNode = parentId === void 0 ? this._rootNode : this._tree.getNode(parentId);
    if (parentNode === void 0)
      return;
    const children = [];
    for (const input of nodeInputs) {
      const child = MutableTreeModel.createTreeModelNode(parentNode, input);
      children.push(child);
    }
    this._tree.setChildren(parentNode.id, children, offset);
    MutableTreeModel.setNumChildrenForNode(parentNode, this._tree.getChildren(parentNode.id));
  }
  /**
   * Inserts child in the specified position.
   * If offset is higher then current length of children array, the length is increased.
   */
  insertChild(parentId, childNodeInput, offset) {
    const parentNode = parentId === void 0 ? this._rootNode : this._tree.getNode(parentId);
    if (parentNode === void 0)
      return;
    const child = MutableTreeModel.createTreeModelNode(parentNode, childNodeInput);
    this._tree.insertChild(parentNode.id, child, offset);
    MutableTreeModel.setNumChildrenForNode(parentNode, this._tree.getChildren(parentNode.id));
  }
  /**
   * Changes the id of target node.
   * @returns `true` on success, `false` otherwise.
   */
  changeNodeId(currentId, newId) {
    const node = this.getNode(currentId);
    if (node === void 0) {
      return false;
    }
    if (currentId === newId) {
      return true;
    }
    const index = this.getChildOffset(node.parentId, currentId);
    if (!this._tree.setNodeId(node.parentId, index, newId)) {
      return false;
    }
    node.id = newId;
    for (const [childId] of this.getChildren(newId)?.iterateValues() ?? []) {
      const child = this.getNode(childId);
      child.parentId = newId;
    }
    return true;
  }
  /**
   * Transfers node along with its children to a new location. Fails if destination has undefined child count.
   * @param sourceNodeId Node that is being moved.
   * @param targetParentId Node that will receive a new child.
   * @param targetIndex Insertion location among target's *current* children.
   * @returns `true` on success, `false` otherwise.
   */
  moveNode(sourceNodeId, targetParentId, targetIndex) {
    const sourceNode = this.getNode(sourceNodeId);
    if (sourceNode === void 0) {
      return false;
    }
    const targetParent = targetParentId === void 0 ? this._rootNode : this.getNode(targetParentId);
    if (targetParent === void 0 || targetParent.numChildren === void 0) {
      return false;
    }
    if (targetParentId !== void 0 && this.areNodesRelated(sourceNodeId, targetParentId)) {
      return false;
    }
    this._tree.moveNode(sourceNode.parentId, sourceNodeId, targetParentId, targetIndex);
    const sourceParent = sourceNode.parentId === void 0 ? this._rootNode : this.getNode(sourceNode.parentId);
    MutableTreeModel.setNumChildrenForNode(sourceParent, this._tree.getChildren(sourceNode.parentId));
    MutableTreeModel.setNumChildrenForNode(targetParent, this._tree.getChildren(targetParentId));
    sourceNode.parentId = targetParentId;
    const updateDepths = (parentId, depth) => {
      const node = this.getNode(parentId);
      node.depth = depth;
      for (const [nodeId] of this.getChildren(parentId)?.iterateValues() ?? []) {
        updateDepths(nodeId, depth + 1);
      }
    };
    updateDepths(sourceNodeId, targetParent.depth + 1);
    return true;
  }
  areNodesRelated(ancestorNodeId, descendantNodeId) {
    const node = this.getNode(descendantNodeId);
    if (node === void 0 || node.parentId === void 0) {
      return false;
    }
    return node.parentId === ancestorNodeId ? true : this.areNodesRelated(ancestorNodeId, node.parentId);
  }
  /**
   * Sets the number of child nodes a parent is expected to contain. All child nodes of this parent will be subsequently
   * removed.
   */
  setNumChildren(parentId, numChildren) {
    const parentNode = parentId === void 0 ? this._rootNode : this._tree.getNode(parentId);
    if (parentNode === void 0) {
      return;
    }
    parentNode.numChildren = numChildren;
    this._tree.setNumChildren(parentId, numChildren ?? 0);
  }
  /** Removes children specified by id.
   * @param parentId id of the parent node.
   * @param child child node id or index that should be removed.
   */
  removeChild(parentId, child) {
    const parentNode = parentId === void 0 ? this._rootNode : this._tree.getNode(parentId);
    this._tree.removeChild(parentId, child);
    if (parentNode)
      MutableTreeModel.setNumChildrenForNode(parentNode, this._tree.getChildren(parentNode.id));
  }
  /** Removes all children for parent specified by id.
   * @param parentId id of parent node or undefined to remove root nodes.
   */
  clearChildren(parentId) {
    const parentNode = parentId === void 0 ? this._rootNode : this._tree.getNode(parentId);
    if (parentNode !== void 0) {
      parentNode.numChildren = void 0;
    }
    this._tree.deleteSubtree(parentId, false);
  }
  /** Iterates over all nodes present in the tree model. */
  *iterateTreeModelNodes(parentId) {
    const _this = this;
    function* iterateDescendants(subParentId) {
      const children = _this.getChildren(subParentId);
      if (children === void 0) {
        return;
      }
      for (const [nodeId] of children.iterateValues()) {
        const node = _this.getNode(nodeId);
        if (node !== void 0) {
          yield node;
          yield* iterateDescendants(nodeId);
        }
      }
    }
    yield* iterateDescendants(parentId);
  }
  static setNumChildrenForNode(node, children) {
    const numChildren = children ? children.getLength() : void 0;
    if (node.numChildren === numChildren)
      return;
    node.numChildren = numChildren;
  }
  static createTreeModelNode(parentNode, input) {
    return {
      id: input.id,
      parentId: parentNode.id,
      depth: parentNode.depth + 1,
      isLoading: input.isLoading,
      numChildren: input.numChildren,
      description: input.description || "",
      isExpanded: input.isExpanded,
      label: input.label,
      isSelected: input.isSelected,
      isSelectionDisabled: input.item.isSelectionDisabled,
      checkbox: {
        state: input.item.checkBoxState || CheckBoxState.Off,
        isDisabled: !!input.item.isCheckboxDisabled,
        isVisible: !!input.item.isCheckboxVisible
      },
      item: cloneDeep(input.item)
    };
  }
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
      return result.findIndex((visibleNode) => visibleNode.id === nodeId);
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
function cloneSubtree(source, target, parentId) {
  target.setNumChildren(parentId, (parentId === void 0 ? source.getRootNode() : source.getNode(parentId)).numChildren);
  for (const [childId, index] of source.getChildren(parentId)?.iterateValues() ?? []) {
    const node = source.getNode(childId);
    target.setChildren(parentId, [{ ...node, isLoading: !!node.isLoading }], index);
    cloneSubtree(source, target, childId);
  }
}
class ImageRenderer {
  static _svgCache = /* @__PURE__ */ new Map();
  hexToBase64(hexstring) {
    const match = hexstring.match(/\w{2}/g);
    if (!match)
      return "";
    return window.btoa(match.map((a) => {
      return String.fromCharCode(parseInt(a, 16));
    }).join(""));
  }
  /** Render raw binary image */
  renderBinary(data, format) {
    const dataAsBase64 = this.hexToBase64(data);
    return reactExports.createElement("img", { src: `data:image/${format};base64,${dataAsBase64}`, alt: "" });
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
  convertSvgToDataUri(svg2) {
    if (!this.isSvg(svg2)) {
      return "";
    }
    const svgAsBase64 = window.btoa(svg2);
    return `data:image/svg+xml;base64,${svgAsBase64}`;
  }
  /** Render svg string into JSX */
  renderSvg(svg2) {
    let svgAsDataUri = ImageRenderer._svgCache.get(svg2);
    if (void 0 === svgAsDataUri) {
      svgAsDataUri = this.convertSvgToDataUri(svg2.trim());
      ImageRenderer._svgCache.set(svg2, svgAsDataUri);
    }
    return reactExports.createElement(
      "div",
      null,
      reactExports.createElement(Icon, { iconSpec: svgAsDataUri })
    );
  }
  /** Render image from an url */
  renderUrl(url) {
    return reactExports.createElement("img", { src: url, alt: "" });
  }
  /** Render image as core-react icon */
  renderCoreIcon(iconName) {
    return reactExports.createElement(WebFontIcon, { iconName });
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
    return reactExports.createElement(WebFontIcon, { ...iconInfo });
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
        throw new UiError(UiComponents$1.loggerCategory("ImageRenderer"), `Can't handle sourceType: "${String(unhandledSourceType)}"`);
    }
  }
}
var TreeComponentTestId;
(function(TreeComponentTestId2) {
  TreeComponentTestId2["Node"] = "tree-node";
  TreeComponentTestId2["NodeContents"] = "tree-node-contents";
  TreeComponentTestId2["NodeExpansionToggle"] = "tree-node-expansion-toggle";
  TreeComponentTestId2["NodeCheckbox"] = "tree-node-checkbox";
})(TreeComponentTestId || (TreeComponentTestId = {}));
function TreeNodeEditor(props) {
  const onCommit = (args) => {
    const newValue = args.newValue.value;
    props.onCommit(props.node, newValue);
  };
  const propertyRecord = createPropertyRecord(props.node.item.label);
  return reactExports.createElement(
    "span",
    { style: props.style },
    reactExports.createElement(EditorContainer, { propertyRecord, title: propertyRecord.description, onCommit, onCancel: props.onCancel, ignoreEditorBlur: props.ignoreEditorBlur, setFocus: true })
  );
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
function TreeNodeContent(props) {
  const { node, onLabelRendered, highlightProps } = props;
  const label = reactExports.useMemo(() => getLabel(node, highlightProps), [node, highlightProps]);
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
    editor2 = props.nodeEditorRenderer ? props.nodeEditorRenderer(editorProps) : reactExports.createElement(TreeNodeEditor, { ...editorProps });
  }
  const isDescriptionEnabled = props.node.item.description && props.showDescription;
  const containerClassName = classnames("components-controlledTree-node-content", isDescriptionEnabled ? "with-description" : void 0, props.className);
  const descriptionClassName = classnames("components-controlledTree-node-description", editor2 ? "with-editor" : void 0);
  return reactExports.createElement(
    "div",
    { className: containerClassName, style: props.style },
    reactExports.createElement(
      reactExports.Fragment,
      null,
      editor2 ? editor2 : label,
      isDescriptionEnabled ? reactExports.createElement("div", { className: descriptionClassName }, props.node.item.description) : void 0
    )
  );
}
function getLabel(node, highlightProps) {
  const highlightCallback = highlightProps ? (text2) => HighlightingEngine.renderNodeLabel(text2, highlightProps) : void 0;
  const context = {
    containerType: PropertyContainerType.Tree,
    style: getStyle(node.item.style, node.isSelected),
    textHighlighter: highlightCallback,
    defaultValue: reactExports.createElement(TreeNodePlaceholder, { level: 0, "data-testid": "node-label-placeholder" })
  };
  return PropertyValueRendererManager.defaultManager.render(node.item.label, context);
}
function getStyle(style, isSelected) {
  return ItemStyleProvider.createStyle(style ? style : {}, isSelected);
}
const TreeNodeRenderer = reactExports.memo(function TreeNodeRenderer2(props) {
  const label = reactExports.createElement(TreeNodeContent, { key: props.node.id, node: props.node, showDescription: props.descriptionEnabled, highlightProps: props.nodeHighlightProps, onLabelRendered: props.onLabelRendered, nodeEditorRenderer: props.nodeEditorRenderer });
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
  return reactExports.createElement(TreeNode, { "data-testid": TreeComponentTestId.Node, className: props.className, checkboxProps: props.node.checkbox.isVisible ? createCheckboxProps(props.node.checkbox) : void 0, style: props.style, isExpanded: props.node.isExpanded, isSelected: props.node.isSelected, isLoading: props.node.isLoading, isLeaf: props.node.numChildren === 0, icon: props.imageLoader ? reactExports.createElement(TreeNodeIcon, { node: props.node, imageLoader: props.imageLoader }) : void 0, label, level: props.node.depth, onClick: (event) => props.treeActions.onNodeClicked(props.node.id, event), onMouseDown: () => props.treeActions.onNodeMouseDown(props.node.id), onMouseMove: () => props.treeActions.onNodeMouseMove(props.node.id), onClickExpansionToggle: onExpansionToggle, onContextMenu, renderOverrides: { renderCheckbox: props.checkboxRenderer } }, props.children);
});
function TreeNodeIcon(props) {
  const { imageLoader, node } = props;
  const image = imageLoader.load(node.item);
  if (!image)
    return null;
  const renderer = new ImageRenderer();
  return reactExports.createElement(reactExports.Fragment, null, renderer.render(image));
}
const NODE_LOAD_DELAY = 500;
const [
  /** Context of [[TreeRenderer]] provider. */
  TreeRendererContextProvider,
  /** Context of [[TreeRenderer]] consumer. */
  _TreeRendererContextConsumer,
  /** Custom hook to use [[TreeRenderer]] context. */
  useTreeRendererContext
] = createContextWithMandatoryProvider("TreeRendererContext");
class TreeRenderer extends reactExports.Component {
  _ref = reactExports.createRef();
  /** @inheritdoc */
  scrollToNode(nodeId, alignment) {
    if (this._ref.current)
      this._ref.current.scrollToNode(nodeId, alignment);
  }
  render() {
    return reactExports.createElement(TreeRendererInner, { ref: this._ref, ...this.props });
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
  const onLabelRendered = useScrollToActiveMatch(coreTreeRef, props.nodeHighlightingProps);
  const highlightingEngine = reactExports.useMemo(() => props.nodeHighlightingProps && new HighlightingEngine(props.nodeHighlightingProps), [props.nodeHighlightingProps]);
  const rendererContext = reactExports.useMemo(() => ({
    nodeRenderer: props.nodeRenderer ? props.nodeRenderer : (nodeProps) => reactExports.createElement(TreeNodeRenderer, { ...nodeProps }),
    treeActions: props.treeActions,
    nodeLoader: props.nodeLoader,
    visibleNodes: props.visibleNodes,
    onLabelRendered,
    highlightingEngine,
    onNodeEditorClosed: () => {
      setFocusToSelected(coreTreeRef);
      props.onNodeEditorClosed && props.onNodeEditorClosed();
    }
  }), [props, onLabelRendered, highlightingEngine]);
  const itemKey = reactExports.useCallback((index) => getNodeKey(props.visibleNodes.getAtIndex(index)), [props.visibleNodes]);
  const { nodeHeight, visibleNodes } = props;
  const itemSize = reactExports.useCallback((index) => nodeHeight(visibleNodes.getAtIndex(index), index), [nodeHeight, visibleNodes]);
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
  const handleKeyDown = reactExports.useCallback((e) => {
    props.treeActions.onTreeKeyDown(e);
  }, [props.treeActions]);
  const handleKeyUp = reactExports.useCallback((e) => {
    props.treeActions.onTreeKeyUp(e);
  }, [props.treeActions]);
  const onItemsRendered = props.onItemsRendered;
  const handleRenderedItemsChange = reactExports.useCallback((onItemsRenderedProps) => {
    onItemsRendered && onItemsRendered({ ...onItemsRenderedProps });
  }, [onItemsRendered]);
  return reactExports.createElement(
    TreeRendererContextProvider,
    { value: rendererContext },
    reactExports.createElement(
      Tree,
      { ref: coreTreeRef, className: classnames("components-controlledTree", "components-smallEditor-host"), onKeyDown: handleKeyDown, onKeyUp: handleKeyUp },
      reactExports.createElement(VariableSizeList, { ref: variableSizeListRef, className: "ReactWindow__VariableSizeList", width: props.width, height: props.height, itemCount: props.visibleNodes.getNumNodes(), itemSize, estimatedItemSize: 25, overscanCount: 10, itemKey, onItemsRendered: handleRenderedItemsChange }, Node$1)
    )
  );
});
function getNodeKey(node) {
  if (isTreeModelNode(node)) {
    return node.id;
  }
  return `${node.parentId || ""}-${node.childIndex}`;
}
const Node$1 = reactExports.memo(function Node2(props) {
  const { index, style } = props;
  const { nodeRenderer, visibleNodes, treeActions, nodeLoader, onLabelRendered, highlightingEngine, onNodeEditorClosed } = useTreeRendererContext(Node2);
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
  return reactExports.createElement("div", { className, style }, reactExports.useMemo(() => {
    if (isTreeModelNode(node)) {
      const nodeHighlightProps = highlightingEngine ? highlightingEngine.createRenderProps(node) : void 0;
      return nodeRenderer({
        node,
        treeActions,
        onLabelRendered,
        nodeHighlightProps
      });
    }
    return reactExports.createElement(TreeNodePlaceholder, { level: node.depth });
  }, [
    node,
    treeActions,
    nodeRenderer,
    onLabelRendered,
    highlightingEngine
  ]));
}, areEqual);
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
      const subscription = concat(timer(NODE_LOAD_DELAY), toRxjsObservable(nodeLoader.loadNode(parentNode, node.childIndex))).subscribe();
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
        variableSizeListRef.current.scrollToItem(visibleNodesRef.current.getIndexOfNode(nodeId), alignment);
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
function usePrevious(value) {
  const ref = reactExports.useRef(void 0);
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
  const onLabelRendered = reactExports.useCallback((node) => {
    const highlightedNodeId = getHighlightedNodeId(highlightableTreeProps);
    if (!treeRef.current || !scrollToActive.current || !highlightedNodeId || highlightedNodeId !== node.id)
      return;
    scrollToActive.current = false;
    const scrollTo = [
      ...treeRef.current.getElementsByClassName(HighlightingEngine.ACTIVE_CLASS_NAME)
    ];
    if (scrollTo.length > 0 && scrollTo[0].scrollIntoView !== void 0)
      scrollTo[0].scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "end"
      });
  }, [highlightableTreeProps, treeRef]);
  return onLabelRendered;
}
function setFocusToSelected(treeRef) {
  if (treeRef.current)
    treeRef.current.setFocusByClassName(".core-tree-node.is-selected");
}
class DateTimeEditor extends reactExports.PureComponent {
  _isMounted = false;
  _enterKey = false;
  _divElement = reactExports.createRef();
  state = {
    value: /* @__PURE__ */ new Date(),
    editInUtc: false
  };
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
      const displayValue = await typeConverter.convertPropertyToString(this.props.propertyRecord.property, newValue);
      this.setState({
        value: newValue,
        displayValue
      });
    }
  }
  _handleChange = (newValue) => {
    if (this._isMounted && this.state.typeConverter) {
      if (this.state.editInUtc) {
        newValue = adjustDateToTimezone(newValue, newValue.getTimezoneOffset() * -1);
      }
      void this.processDateChange(this.state.typeConverter, newValue);
    }
  };
  _handleTimeChange = (time2) => {
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
      typeConverter = TypeConverterManager.getConverter(record.property.typename, record.property.converter?.name);
      const options = record.property.converter?.options;
      if (options) {
        if ("alternateDateFormat" in options) {
          if (DateTimeTypeConverterBase.isAlternateDateFormats(options.alternateDateFormat)) {
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
    const displayValue = await typeConverter.convertPropertyToString(record.property, initialValue);
    if (this._isMounted)
      this.setState({
        value: initialValue,
        timeDisplay,
        typeConverter,
        displayValue,
        editInUtc
      });
  }
  _handleEnter = async () => {
    this._enterKey = true;
    await this._handleCommit();
  };
  _handleClose = async () => {
    if (this._enterKey) {
      this._enterKey = false;
    } else {
      if (this.props.onCancel)
        this.props.onCancel();
    }
  };
  _handleOk = async (_event) => {
    await this._handleCommit();
  };
  _handleCancel = (_event) => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };
  _handleCommit = async () => {
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
  render() {
    const date = this.state.editInUtc ? adjustDateToTimezone(this.state.value, 0) : this.state.value;
    const timeSpec = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    };
    const className = classnames("components-cell-editor", "components-datetime-editor", this.props.className);
    return reactExports.createElement(
      "div",
      { className, ref: this._divElement },
      reactExports.createElement(
        PopupButton,
        { id: this.props.propertyRecord?.property.name, label: this.state.displayValue, onClose: this._handleClose, onEnter: this._handleEnter, setFocus: this.props.setFocus, disabled: this.props.propertyRecord?.isDisabled, readonly: this.props.propertyRecord?.isReadonly },
        reactExports.createElement(
          PopupContent,
          null,
          reactExports.createElement(
            reactExports.Fragment,
            null,
            reactExports.createElement(
              "div",
              { className: "components-date-picker-calendar-popup-panel", "data-testid": "components-date-picker-calendar-popup-panel" },
              reactExports.createElement(DatePicker, { selected: date, onDateChange: this._handleChange, showFocusOutline: false }),
              this.state.timeDisplay && reactExports.createElement(
                "div",
                { className: "time-container" },
                reactExports.createElement(Text, { variant: "body", className: "time-label" }, "Time"),
                reactExports.createElement(TimeField, { time: timeSpec, timeDisplay: this.state.timeDisplay, onTimeChange: this._handleTimeChange })
              )
            )
          ),
          reactExports.createElement(PopupOkCancelButtons, { onOk: this._handleOk, onCancel: this._handleCancel })
        )
      )
    );
  }
}
class ShortDateTimePropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return reactExports.createElement(DateTimeEditor, { showTime: false });
  }
  get containerHandlesTab() {
    return false;
  }
}
class DateTimePropertyEditor extends PropertyEditorBase {
  get reactNode() {
    return reactExports.createElement(DateTimeEditor, { showTime: true });
  }
  get containerHandlesTab() {
    return false;
  }
}
function registerEditors() {
  registerDefaultPropertyEditor(StandardTypeNames.Bool, BooleanPropertyEditor);
  registerDefaultPropertyEditor(StandardTypeNames.Boolean, BooleanPropertyEditor);
  registerDefaultPropertyEditor(StandardTypeNames.Boolean, ImageCheckBoxPropertyEditor, StandardEditorNames.ImageCheckBox);
  registerDefaultPropertyEditor(StandardTypeNames.Bool, ImageCheckBoxPropertyEditor, StandardEditorNames.ImageCheckBox);
  registerDefaultPropertyEditor(StandardTypeNames.Bool, TogglePropertyEditor, StandardEditorNames.Toggle);
  registerDefaultPropertyEditor(StandardTypeNames.Boolean, TogglePropertyEditor, StandardEditorNames.Toggle);
  registerDefaultPropertyEditor(StandardTypeNames.Number, NumericInputPropertyEditor$1, StandardEditorNames.NumericInput);
  registerDefaultPropertyEditor(StandardTypeNames.Int, NumericInputPropertyEditor$1, StandardEditorNames.NumericInput);
  registerDefaultPropertyEditor(StandardTypeNames.Float, NumericInputPropertyEditor$1, StandardEditorNames.NumericInput);
  registerDefaultPropertyEditor(StandardTypeNames.Double, NumericInputPropertyEditor$1, StandardEditorNames.NumericInput);
  registerDefaultPropertyEditor(StandardTypeNames.Number, SliderPropertyEditor, StandardEditorNames.Slider);
  registerDefaultPropertyEditor(StandardTypeNames.Int, SliderPropertyEditor, StandardEditorNames.Slider);
  registerDefaultPropertyEditor(StandardTypeNames.Float, SliderPropertyEditor, StandardEditorNames.Slider);
  registerDefaultPropertyEditor(StandardTypeNames.Double, SliderPropertyEditor, StandardEditorNames.Slider);
  registerDefaultPropertyEditor(StandardTypeNames.Number, CustomNumberPropertyEditor$1, StandardEditorNames.NumberCustom);
  registerDefaultPropertyEditor(StandardTypeNames.Text, BasicPropertyEditor);
  registerDefaultPropertyEditor(StandardTypeNames.String, BasicPropertyEditor);
  registerDefaultPropertyEditor(StandardTypeNames.Text, IconPropertyEditor, StandardEditorNames.IconPicker);
  registerDefaultPropertyEditor(StandardTypeNames.String, IconPropertyEditor, StandardEditorNames.IconPicker);
  registerDefaultPropertyEditor(StandardTypeNames.Text, TextareaPropertyEditor, StandardEditorNames.MultiLine);
  registerDefaultPropertyEditor(StandardTypeNames.String, TextareaPropertyEditor, StandardEditorNames.MultiLine);
  registerDefaultPropertyEditor(StandardTypeNames.Enum, EnumPropertyButtonGroupEditor, StandardEditorNames.EnumButtonGroup);
  registerDefaultPropertyEditor(StandardTypeNames.Enum, EnumPropertyEditor);
  registerDefaultPropertyEditor(StandardTypeNames.ShortDate, ShortDateTimePropertyEditor);
  registerDefaultPropertyEditor(StandardTypeNames.DateTime, DateTimePropertyEditor);
}
function registerConverters() {
  TypeConverterManager.registerConverter(StandardTypeNames.Boolean, BooleanTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Bool, BooleanTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Int, IntTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Integer, IntTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Float, FloatTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Double, FloatTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Number, FloatTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Text, StringTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.String, StringTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.URL, StringTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Composite, CompositeTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.ShortDate, ShortDateTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.DateTime, DateTimeTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Enum, EnumTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Hex, HexadecimalTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Hexadecimal, HexadecimalTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Navigation, NavigationPropertyTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Point2d, Point2dTypeConverter);
  TypeConverterManager.registerConverter(StandardTypeNames.Point3d, Point3dTypeConverter);
}
class MultilineTextPropertyValueRenderer {
  canRender(record) {
    return record.value.valueFormat === PropertyValueFormat.Primitive;
  }
  render(record, context) {
    return reactExports.createElement(MultilineTextPropertyValueRendererImpl, { record, context });
  }
}
const MultilineTextPropertyValueRendererImpl = (props) => {
  const { stringValue, element } = useRenderedStringValue(props.record, convertRecordToString, props.context);
  return reactExports.createElement(MultilineTextRenderer, { style: props.context?.style, stringValue, isExpanded: props.context?.isExpanded, onExpansionToggled: props.context?.onExpansionToggled, onHeightChanged: props.context?.onHeightChanged }, element);
};
const MultilineTextRenderer = (props) => {
  const { translate } = useTranslation();
  const spanRef = reactExports.useRef(null);
  const divRef = reactExports.useRef(null);
  const [contentOverflows, setContentOverflows] = reactExports.useState(false);
  reactExports.useLayoutEffect(() => {
    assert(divRef.current !== null && spanRef.current !== null);
    setContentOverflows(spanRef.current.clientWidth < spanRef.current.scrollWidth);
  });
  const handleExpansionToggleClick = (event) => {
    props.onExpansionToggled?.();
    event.stopPropagation();
  };
  return reactExports.createElement(
    "div",
    { ref: divRef, className: "multiline" },
    reactExports.createElement(
      "span",
      { ref: spanRef, className: classnames("content", { expanded: props.isExpanded }), style: props.style, title: props.isExpanded ? void 0 : props.stringValue },
      props.children,
      reactExports.createElement("button", { className: "expand-toggle", style: { display: props.isExpanded ? "inline-block" : "none" }, onClick: handleExpansionToggleClick }, translate("property.collapse"))
    ),
    contentOverflows && !props.isExpanded && reactExports.createElement("button", { className: "expand-toggle", onClick: handleExpansionToggleClick }, translate("property.expand"))
  );
};
registerEditors();
registerConverters();
PropertyValueRendererManager.defaultManager.registerRenderer("url", new UrlPropertyValueRenderer());
PropertyValueRendererManager.defaultManager.registerRenderer("multiline", new MultilineTextPropertyValueRenderer());
export {
  SvgSearch as $,
  Checkbox as A,
  BadgeType as B,
  ColorPicker as C,
  DropdownMenu as D,
  EditorRenderer as E,
  Flex as F,
  UiError as G,
  ConditionalIconItem as H,
  Input$1 as I,
  SvgStatusWarning as J,
  SvgStatusSuccess as K,
  Label as L,
  MenuItem as M,
  SvgStatusError as N,
  Orientation as O,
  PropertyFilterBuilderRuleRenderingContext as P,
  InputStatus as Q,
  ReactAutosuggest as R,
  SvgPlaceholder as S,
  Text as T,
  UiCore$1 as U,
  SvgCaretUp as V,
  WebFontIcon as W,
  SvgCaretUpSmall as X,
  SvgCaretDown as Y,
  SvgCaretDownSmall as Z,
  Point as _,
  EditorsRegistryProvider as a,
  SelectionModeFlags as a$,
  SvgClose as a0,
  ConditionalBooleanValue as a1,
  throttle as a2,
  SvgAdd as a3,
  SvgRemove as a4,
  isPropertyRecordEditorMetadata as a5,
  Tag as a6,
  PropertyEditorBase as a7,
  PropertyEditorManager as a8,
  toDateString as a9,
  isFunction as aA,
  mergeMap as aB,
  observeOn as aC,
  subscribeOn as aD,
  MutableCategorizedProperty as aE,
  FlatGridItemType as aF,
  MutableCategorizedPrimitiveProperty as aG,
  MutableCustomGridCategory as aH,
  MutableGridCategory as aI,
  DRAFTABLE as aJ,
  produce as aK,
  VirtualizedPropertyGrid as aL,
  from as aM,
  LinkifyIt as aN,
  Orientation$1 as aO,
  UnderlinedButton as aP,
  PropertyValueRendererManager as aQ,
  dateTimestampProvider as aR,
  popScheduler as aS,
  popNumber as aT,
  mergeAll as aU,
  toRxjsObservable as aV,
  MutableTreeModel as aW,
  concatAll as aX,
  map as aY,
  isTreeModelNode as aZ,
  hasSelectionModeFlag as a_,
  toTimeString as aa,
  UiAdmin as ab,
  SvgCheckmark as ac,
  Badge as ad,
  SvgCaretRightSmall as ae,
  ContextSubMenu as af,
  ContextMenuItem as ag,
  createErrorClass as ah,
  __extends as ai,
  EMPTY_SUBSCRIPTION as aj,
  Subscription as ak,
  arrRemove as al,
  Observable as am,
  errorContext as an,
  __values as ao,
  __spreadArray as ap,
  __read as aq,
  AsyncAction as ar,
  AsyncScheduler as as,
  innerFrom as at,
  OperatorSubscriber as au,
  noop as av,
  operate as aw,
  SafeSubscriber as ax,
  identity as ay,
  createOperatorSubscriber as az,
  StatusMessage as b,
  requireDebounce as b$,
  SelectionMode as b0,
  Rectangle as b1,
  concat as b2,
  TreeNodeRenderer as b3,
  computeVisibleNodes as b4,
  TreeRenderer as b5,
  useTranslation as b6,
  Listbox as b7,
  ListboxItem as b8,
  EditorContainer as b9,
  Popup as bA,
  applyNumericConstraints as bB,
  castDraft as bC,
  SearchBox as bD,
  SvgChevronLeft as bE,
  SvgChevronRight as bF,
  GroupTool as bG,
  require_MapCache as bH,
  require_Symbol as bI,
  require_Uint8Array as bJ,
  requireEq as bK,
  require_getAllKeys as bL,
  require_Stack as bM,
  require_getTag as bN,
  requireIsBuffer as bO,
  requireIsTypedArray as bP,
  requireIsArray as bQ,
  requireIsObjectLike as bR,
  _inheritsLoose as bS,
  _objectWithoutPropertiesLoose as bT,
  _extends as bU,
  HorizontalAlignment as bV,
  PopupContext as bW,
  InputWithDecorations as bX,
  isBoolean as bY,
  CustomNumberEditorSpec as bZ,
  CustomNumberEditor$1 as b_,
  PropertyRecordEditor as ba,
  SvgCaretDownSmall$1 as bb,
  useColorPickerContext as bc,
  ColorValue as bd,
  useContainerWidth as be,
  InputFlexContainer as bf,
  InputFlexContainerButton as bg,
  InputFlexContainerIcon as bh,
  compareNumbers as bi,
  compareStrings$1 as bj,
  compareBooleans as bk,
  compareArrays as bl,
  comparePossiblyUndefined as bm,
  compareStringsOrUndefined as bn,
  compareBooleansOrUndefined as bo,
  compareNumbersOrUndefined as bp,
  GenericUiEvent as bq,
  _setPrototypeOf as br,
  _assertThisInitialized as bs,
  compareWithTolerance as bt,
  compareSimpleArrays as bu,
  compareSimpleTypes as bv,
  Div as bw,
  ContextMenu as bx,
  UiStateStorageStatus as by,
  useRefs as bz,
  createEditorSpec as c,
  ToolbarPopupAutoHideContext as c0,
  MenuExtraContent as c1,
  useWidgetOpacityContext as c2,
  Direction as c3,
  ToolbarPanelAlignment as c4,
  DivWithOutsideClick as c5,
  FocusTrap as c6,
  ToolbarOpacitySetting as c7,
  focusIntoContainer as c8,
  IconInput as c9,
  WidgetOpacityContext as ca,
  PopupItem as cb,
  SvgChevronDown as cc,
  CustomNumberEditor as cd,
  CustomNumberPropertyEditor$1 as ce,
  TextEditor as cf,
  BasicPropertyEditor as cg,
  NumericInputEditor as ch,
  NumericInputPropertyEditor$1 as ci,
  registerDefaultPropertyEditor as cj,
  isText as d,
  Slider as e,
  Textarea as f,
  ToggleSwitch as g,
  enablePatches as h,
  isNumeric as i,
  Icon as j,
  ExpandableBlock as k,
  PropertyFilterBuilderContext as l,
  PropertyFilterBuilderRuleGroupRenderer as m,
  usePropertyFilterBuilder as n,
  PropertyFilterBuilderRuleValue as o,
  PropertyFilterRuleGroupOperator as p,
  UiComponents$1 as q,
  adjustDateToTimezone as r,
  DatePicker$1 as s,
  Select as t,
  useCommittableValue as u,
  ColorPalette as v,
  Icon$1 as w,
  usePackageTranslation as x,
  purify as y,
  ConditionalStringValue as z
};
