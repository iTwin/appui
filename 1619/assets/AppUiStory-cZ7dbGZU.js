import { a as __toESM, n as __esmMin, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-htSClZ5J.js";
import { t as require_react } from "./react-Dtiv5CLt.js";
import { c as Primary, d as Title3, f as init_blocks, i as Description2, r as Controls3, u as Subtitle2 } from "./blocks-CKY4b78G.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BpuwJHEg.js";
import { C as init_ThemeProvider, J as init_Box, M as init_VisuallyHidden, Ot as getWindow, S as ThemeProvider, St as init_useMergedRefs, _ as Popover, a as Svg, b as init_Popover, bt as init_useResizeObserver, dt as useIsomorphicLayoutEffect, et as init_styles, ft as init_useLatestRef, g as init_IconButton, h as IconButton, j as VisuallyHidden, jt as require_classnames, kt as init_dom, l as ShadowRoot, nt as init_useWarningLogger, o as init_Svg, ot as init_useId, pt as useLatestRef, q as Box, rt as useWarningLogger, st as useId, tt as u, u as init_ShadowRoot, ut as init_useIsomorphicLayoutEffect, vt as init_useGlobals, wt as useMergedRefs, xt as useResizeObserver, yt as useGlobals } from "./SvgCloseSmall-D4ZjyCAN.js";
import { $c as DropdownMenu, $r as SvgUpload, Gr as SvgWindowAdd, Mc as init_ComboBox, Mr as init_esm$3, Qc as init_Checkbox, Sc as init_MenuItem, Sl as useVirtualScroll, Ua as SvgFeedback, Vi as SvgPlaceholder, Vt as init_internal$1, Ya as SvgDownload, Zc as Checkbox, Zi as SvgPanorama, _c as Flex, _i as SvgSearch, bc as init_Select, cl as init_SvgChevronRightSmall, el as init_DropdownMenu, ft as EditorContainer, gc as init_ProgressLinear, hc as ProgressLinear, hn as init_core_react, ho as SvgCopy, il as init_Text, ji as SvgRefresh, rl as Text, sl as SvgChevronRightSmall, so as SvgDetails, t as init_components_react, ut as PropertyRecordEditor, vc as init_Flex, xc as MenuItem, xl as init_useVirtualScroll, yc as Select, zr as SvgWindowPopout } from "./components-react-2-ltnsUD.js";
import { Ft as BeEvent, I as PropertyValueFormat, P as PropertyRecord, R as StandardTypeNames, V as PropertyEditorParamTypes, Vt as Logger, X as init_core_bentley, an as Dialog, c as ToolbarItemUtilities, cn as init_Button, ln as ProgressRadial, m as StandardEditorNames, on as init_Dialog, qt as ITwinError, r as init_appui_abstract, sn as Button, t as require_Key_enum, un as init_ProgressRadial } from "./Key.enum-CqsoxW_A.js";
import { $ as ContentControl, A as BackstageAppButton, Ar as ColorByName, Cn as ToolUtilities, Er as Cartographic, Fr as init_Range, G as DefaultViewOverlay, Gt as ContentGroup, Hr as Divider, In as AngleDescription, Jt as UiItemsManager, Kn as ToolAssistance, Kt as ContentGroupProvider, Lt as StageUsage, M as FrontstageUtilities, Mt as LocalStateStorage, Nn as init_core_frontend, Or as ColorDef, P as ViewToolWidgetComposer, Pn as ViewCreator3d, Pr as Range3d, Qn as SpatialViewState, Rn as CheckpointConnection, Sn as init_imodel_components_react, Sr as IModelReadRpcInterface, Tn as ViewportComponent, Tt as useActiveIModelConnection, U as IModelViewportControl, Ur as init_Divider, Wn as IModelApp, Xn as SurveyLengthDescription, Y as StageContentLayout, Yn as LengthDescription, Z as FloatingViewportContent, ar as Tool, at as FrameworkAccuDraw, b as Provider_default, br as IModelTileRpcInterface, dr as NotifyMessageDetails, er as QuantityType, fr as OutputMessagePriority, gr as BentleyCloudRpcManager, hr as init_core_common, ir as EventHandled, kn as ViewportComponentEvents, ln as CursorInformation, lt as UiFramework, n as FrameworkToolAdmin, nr as PrimitiveTool, q as StandardContentLayouts, qn as ToolAssistanceImage, sr as BlankConnection, t as init_appui_react, vr as SnapshotIModelRpcInterface, w as AppNotificationManager, x as init_react_redux, xt as ConfigurableUiContent, yt as ThemeManager } from "./appui-react-p-O3mm3j.js";
import { c as init_DemoIModel, l as useDemoIModel } from "./iframe-CuQ4nhpA.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-bQd6hcpG.js";
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/hooks/useIntersection.js
var import_react$70, useIntersection;
function init_useIntersection() {
	return (init_useIntersection = __esmMin((() => {
		import_react$70 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_dom();
		useIntersection = (onIntersect, options = {}, once = true) => {
			let { root, rootMargin, threshold } = options;
			let cleanupRef = import_react$70.useRef(() => {});
			return import_react$70.useCallback((node) => {
				cleanupRef.current?.();
				cleanupRef.current = () => {};
				if (!node || !getWindow()?.IntersectionObserver) return;
				let observer = new IntersectionObserver(([entry], obs) => {
					if (entry.isIntersecting) {
						if (once) obs.disconnect();
						onIntersect();
					}
				}, {
					root,
					rootMargin,
					threshold
				});
				observer.observe(node);
				cleanupRef.current = () => observer.disconnect();
			}, [
				onIntersect,
				once,
				root,
				rootMargin,
				threshold
			]);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/components/lineClamp.js
var className, css, lineClamp;
function init_lineClamp() {
	return (init_lineClamp = __esmMin((() => {
		className = "_iui-line-clamp";
		css = `
.${className} {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: var(--_iui-line-clamp, 3);
  -webkit-box-orient: vertical;
}
`;
		lineClamp = {
			css,
			className
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgSortUp.js
var import_react$69, SvgSortUp;
function init_SvgSortUp() {
	return (init_SvgSortUp = __esmMin((() => {
		import_react$69 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgSortUp = (props) => import_react$69.createElement(Svg, props, import_react$69.createElement("path", { d: "m9 16v-12.7l3.8 3.7 1.2-1.2-6-5.8-1.2 1.2-4.8 4.6 1.2 1.2 3.8-3.7v12.7z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgSortDown.js
var import_react$68, SvgSortDown;
function init_SvgSortDown() {
	return (init_SvgSortDown = __esmMin((() => {
		import_react$68 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgSortDown = (props) => import_react$68.createElement(Svg, props, import_react$68.createElement("path", { d: "m7 0v12.7l-3.8-3.7-1.2 1.2 6 5.8 1.2-1.2 4.8-4.6-1.2-1.2-3.8 3.7v-12.7z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgFilter.js
var import_react$67, SvgFilter;
function init_SvgFilter() {
	return (init_SvgFilter = __esmMin((() => {
		import_react$67 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgFilter = (props) => import_react$67.createElement(Svg, props, import_react$67.createElement("path", { d: "m0 0v2l6 5v9l4-3v-6l6-5v-2z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/utils/icons/SvgFilterHollow.js
var import_react$66, SvgFilterHollow;
function init_SvgFilterHollow() {
	return (init_SvgFilterHollow = __esmMin((() => {
		import_react$66 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Svg();
		SvgFilterHollow = (props) => import_react$66.createElement(Svg, props, import_react$66.createElement("path", { d: "M15 1v.5L9.4 6.2l-.4.3v6L7 14V6.5l-.4-.3L1 1.5V1zm1-1H0v2l6 5v9l4-3V7l6-5z" }));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/react-table@7.8.0_react@19.2.5/node_modules/react-table/dist/react-table.production.min.js
var require_react_table_production_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? t(exports, require_react()) : "function" == typeof define && define.amd ? define(["exports", "react"], t) : t((e = e || self).ReactTable = {}, e.React);
	})(exports, (function(e, t) {
		"use strict";
		function n(e, t, n, o, r, i, u) {
			try {
				var l = e[i](u), s = l.value;
			} catch (e) {
				n(e);
				return;
			}
			l.done ? t(s) : Promise.resolve(s).then(o, r);
		}
		function o(e) {
			return function() {
				var t = this, o = arguments;
				return new Promise((function(r, i) {
					var u = e.apply(t, o);
					function l(e) {
						n(u, r, i, l, s, "next", e);
					}
					function s(e) {
						n(u, r, i, l, s, "throw", e);
					}
					l(void 0);
				}));
			};
		}
		function r() {
			return (r = Object.assign || function(e) {
				for (var t = 1; t < arguments.length; t++) {
					var n = arguments[t];
					for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				}
				return e;
			}).apply(this, arguments);
		}
		function i(e, t) {
			if (null == e) return {};
			var n, o, r = {}, i = Object.keys(e);
			for (o = 0; o < i.length; o++) n = i[o], t.indexOf(n) >= 0 || (r[n] = e[n]);
			return r;
		}
		function u(e) {
			var t = function(e, t) {
				if ("object" != typeof e || null === e) return e;
				var n = e[Symbol.toPrimitive];
				if (void 0 !== n) {
					var o = n.call(e, t || "default");
					if ("object" != typeof o) return o;
					throw new TypeError("@@toPrimitive must return a primitive value.");
				}
				return ("string" === t ? String : Number)(e);
			}(e, "string");
			return "symbol" == typeof t ? t : String(t);
		}
		t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
		var l = { init: "init" }, s = function(e) {
			var t = e.value;
			return void 0 === t ? "" : t;
		}, a = function() {
			return t.createElement(t.Fragment, null, "\xA0");
		}, c = {
			Cell: s,
			width: 150,
			minWidth: 0,
			maxWidth: Number.MAX_SAFE_INTEGER
		};
		function d() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			return t.reduce((function(e, t) {
				var n = t.style, o = t.className;
				return e = r({}, e, {}, i(t, ["style", "className"])), n && (e.style = e.style ? r({}, e.style || {}, {}, n || {}) : n), o && (e.className = e.className ? e.className + " " + o : o), "" === e.className && delete e.className, e;
			}), {});
		}
		var f = function(e, t) {
			return void 0 === t && (t = {}), function(n) {
				return void 0 === n && (n = {}), [].concat(e, [n]).reduce((function(e, o) {
					return function e(t, n, o) {
						return "function" == typeof n ? e({}, n(t, o)) : Array.isArray(n) ? d.apply(void 0, [t].concat(n)) : d(t, n);
					}(e, o, r({}, t, { userProps: n }));
				}), {});
			};
		}, p = function(e, t, n, o) {
			return void 0 === n && (n = {}), e.reduce((function(e, t) {
				return t(e, n);
			}), t);
		}, g = function(e, t, n) {
			return void 0 === n && (n = {}), e.forEach((function(e) {
				e(t, n);
			}));
		};
		function v(e, t, n, o) {
			e.findIndex((function(e) {
				return e.pluginName === n;
			}));
			t.forEach((function(t) {
				e.findIndex((function(e) {
					return e.pluginName === t;
				}));
			}));
		}
		function m(e, t) {
			return "function" == typeof e ? e(t) : e;
		}
		function h(e) {
			var n = t.useRef();
			return n.current = e, t.useCallback((function() {
				return n.current;
			}), []);
		}
		var y = "undefined" != typeof document ? t.useLayoutEffect : t.useEffect;
		function w(e, n) {
			var o = t.useRef(!1);
			y((function() {
				o.current && e(), o.current = !0;
			}), n);
		}
		function R(e, t, n) {
			return void 0 === n && (n = {}), function(o, i) {
				void 0 === i && (i = {});
				var u = "string" == typeof o ? t[o] : o;
				if (void 0 === u) throw console.info(t), /* @__PURE__ */ new Error("Renderer Error ☝️");
				return b(u, r({}, e, { column: t }, n, {}, i));
			};
		}
		function b(e, n) {
			return function(e) {
				return "function" == typeof e && (t = Object.getPrototypeOf(e)).prototype && t.prototype.isReactComponent;
				var t;
			}(o = e) || "function" == typeof o || function(e) {
				return "object" == typeof e && "symbol" == typeof e.$$typeof && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
			}(o) ? t.createElement(e, n) : e;
			var o;
		}
		function S(e, t, n) {
			return void 0 === n && (n = 0), e.map((function(e) {
				return x(e = r({}, e, {
					parent: t,
					depth: n
				})), e.columns && (e.columns = S(e.columns, e, n + 1)), e;
			}));
		}
		function C(e) {
			return G(e, "columns");
		}
		function x(e) {
			var t = e.id, n = e.accessor, o = e.Header;
			if ("string" == typeof n) {
				t = t || n;
				var r = n.split(".");
				n = function(e) {
					return function(e, t, n) {
						if (!t) return e;
						var o, r = "function" == typeof t ? t : JSON.stringify(t), i = E.get(r) || function() {
							var e = function(e) {
								return function e(t, n) {
									void 0 === n && (n = []);
									if (Array.isArray(t)) for (var o = 0; o < t.length; o += 1) e(t[o], n);
									else n.push(t);
									return n;
								}(e).map((function(e) {
									return String(e).replace(".", "_");
								})).join(".").replace(T, ".").replace(O, "").split(".");
							}(t);
							return E.set(r, e), e;
						}();
						try {
							o = i.reduce((function(e, t) {
								return e[t];
							}), e);
						} catch (e) {}
						return void 0 !== o ? o : n;
					}(e, r);
				};
			}
			if (!t && "string" == typeof o && o && (t = o), !t && e.columns) throw console.error(e), /* @__PURE__ */ new Error("A column ID (or unique \"Header\" value) is required!");
			if (!t) throw console.error(e), /* @__PURE__ */ new Error("A column ID (or string accessor) is required!");
			return Object.assign(e, {
				id: t,
				accessor: n
			}), e;
		}
		function P(e, t) {
			if (!t) throw new Error();
			return Object.assign(e, r({
				Header: a,
				Footer: a
			}, c, {}, t, {}, e)), Object.assign(e, { originalWidth: e.width }), e;
		}
		function B(e, t, n) {
			void 0 === n && (n = function() {
				return {};
			});
			for (var o = [], i = e, u = 0, l = function() {
				return u++;
			}, s = function() {
				var e = { headers: [] }, u = [], s = i.some((function(e) {
					return e.parent;
				}));
				i.forEach((function(o) {
					var i, a = [].concat(u).reverse()[0];
					if (s) {
						if (o.parent) i = r({}, o.parent, {
							originalId: o.parent.id,
							id: o.parent.id + "_" + l(),
							headers: [o]
						}, n(o));
						else i = P(r({
							originalId: o.id + "_placeholder",
							id: o.id + "_placeholder_" + l(),
							placeholderOf: o,
							headers: [o]
						}, n(o)), t);
						a && a.originalId === i.originalId ? a.headers.push(o) : u.push(i);
					}
					e.headers.push(o);
				})), o.push(e), i = u;
			}; i.length;) s();
			return o.reverse();
		}
		var E = /* @__PURE__ */ new Map();
		function I() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			for (var o = 0; o < t.length; o += 1) if (void 0 !== t[o]) return t[o];
		}
		function F(e) {
			if ("function" == typeof e) return e;
		}
		function G(e, t) {
			var n = [];
			return function e(o) {
				o.forEach((function(o) {
					o[t] ? e(o[t]) : n.push(o);
				}));
			}(e), n;
		}
		function A(e, t) {
			var n = t.manualExpandedKey, o = t.expanded, r = t.expandSubRows, i = void 0 === r || r, u = [];
			return e.forEach((function(e) {
				return function e(t, r) {
					void 0 === r && (r = !0), t.isExpanded = t.original && t.original[n] || o[t.id], t.canExpand = t.subRows && !!t.subRows.length, r && u.push(t), t.subRows && t.subRows.length && t.isExpanded && t.subRows.forEach((function(t) {
						return e(t, i);
					}));
				}(e);
			})), u;
		}
		function k(e, t, n) {
			return F(e) || t[e] || n[e] || n.text;
		}
		function H(e, t, n) {
			return e ? e(t, n) : void 0 === t;
		}
		function W() {
			throw new Error("React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.");
		}
		var z = null;
		var T = /\[/g, O = /\]/g;
		var M = function(e) {
			return r({ role: "table" }, e);
		}, j = function(e) {
			return r({ role: "rowgroup" }, e);
		}, L = function(e, t) {
			var n = t.column;
			return r({
				key: "header_" + n.id,
				colSpan: n.totalVisibleHeaderCount,
				role: "columnheader"
			}, e);
		}, N = function(e, t) {
			var n = t.column;
			return r({
				key: "footer_" + n.id,
				colSpan: n.totalVisibleHeaderCount
			}, e);
		}, D = function(e, t) {
			return r({
				key: "headerGroup_" + t.index,
				role: "row"
			}, e);
		}, V = function(e, t) {
			return r({ key: "footerGroup_" + t.index }, e);
		}, _ = function(e, t) {
			return r({
				key: "row_" + t.row.id,
				role: "row"
			}, e);
		}, X = function(e, t) {
			var n = t.cell;
			return r({
				key: "cell_" + n.row.id + "_" + n.column.id,
				role: "cell"
			}, e);
		};
		function q() {
			return {
				useOptions: [],
				stateReducers: [],
				useControlledState: [],
				columns: [],
				columnsDeps: [],
				allColumns: [],
				allColumnsDeps: [],
				accessValue: [],
				materializedColumns: [],
				materializedColumnsDeps: [],
				useInstanceAfterData: [],
				visibleColumns: [],
				visibleColumnsDeps: [],
				headerGroups: [],
				headerGroupsDeps: [],
				useInstanceBeforeDimensions: [],
				useInstance: [],
				prepareRow: [],
				getTableProps: [M],
				getTableBodyProps: [j],
				getHeaderGroupProps: [D],
				getFooterGroupProps: [V],
				getHeaderProps: [L],
				getFooterProps: [N],
				getRowProps: [_],
				getCellProps: [X],
				useFinalInstance: []
			};
		}
		l.resetHiddenColumns = "resetHiddenColumns", l.toggleHideColumn = "toggleHideColumn", l.setHiddenColumns = "setHiddenColumns", l.toggleHideAllColumns = "toggleHideAllColumns";
		var K = function(e) {
			e.getToggleHiddenProps = [U], e.getToggleHideAllColumnsProps = [$], e.stateReducers.push(J), e.useInstanceBeforeDimensions.push(Y), e.headerGroupsDeps.push((function(e, t) {
				var n = t.instance;
				return [].concat(e, [n.state.hiddenColumns]);
			})), e.useInstance.push(Q);
		};
		K.pluginName = "useColumnVisibility";
		var U = function(e, t) {
			var n = t.column;
			return [e, {
				onChange: function(e) {
					n.toggleHidden(!e.target.checked);
				},
				style: { cursor: "pointer" },
				checked: n.isVisible,
				title: "Toggle Column Visible"
			}];
		}, $ = function(e, t) {
			var n = t.instance;
			return [e, {
				onChange: function(e) {
					n.toggleHideAllColumns(!e.target.checked);
				},
				style: { cursor: "pointer" },
				checked: !n.allColumnsHidden && !n.state.hiddenColumns.length,
				title: "Toggle All Columns Hidden",
				indeterminate: !n.allColumnsHidden && n.state.hiddenColumns.length
			}];
		};
		function J(e, t, n, o) {
			if (t.type === l.init) return r({ hiddenColumns: [] }, e);
			if (t.type === l.resetHiddenColumns) return r({}, e, { hiddenColumns: o.initialState.hiddenColumns || [] });
			if (t.type === l.toggleHideColumn) {
				var i = (void 0 !== t.value ? t.value : !e.hiddenColumns.includes(t.columnId)) ? [].concat(e.hiddenColumns, [t.columnId]) : e.hiddenColumns.filter((function(e) {
					return e !== t.columnId;
				}));
				return r({}, e, { hiddenColumns: i });
			}
			return t.type === l.setHiddenColumns ? r({}, e, { hiddenColumns: m(t.value, e.hiddenColumns) }) : t.type === l.toggleHideAllColumns ? r({}, e, { hiddenColumns: (void 0 !== t.value ? t.value : !e.hiddenColumns.length) ? o.allColumns.map((function(e) {
				return e.id;
			})) : [] }) : void 0;
		}
		function Y(e) {
			var n = e.headers, o = e.state.hiddenColumns;
			t.useRef(!1).current;
			var r = 0;
			n.forEach((function(e) {
				return r += function e(t, n) {
					t.isVisible = n && !o.includes(t.id);
					var r = 0;
					return t.headers && t.headers.length ? t.headers.forEach((function(n) {
						return r += e(n, t.isVisible);
					})) : r = t.isVisible ? 1 : 0, t.totalVisibleHeaderCount = r, r;
				}(e, !0);
			}));
		}
		function Q(e) {
			var n = e.columns, o = e.flatHeaders, r = e.dispatch, i = e.allColumns, u = e.getHooks, s = e.state.hiddenColumns, a = e.autoResetHiddenColumns, c = void 0 === a || a, d = h(e), p = i.length === s.length, g = t.useCallback((function(e, t) {
				return r({
					type: l.toggleHideColumn,
					columnId: e,
					value: t
				});
			}), [r]), v = t.useCallback((function(e) {
				return r({
					type: l.setHiddenColumns,
					value: e
				});
			}), [r]), m = t.useCallback((function(e) {
				return r({
					type: l.toggleHideAllColumns,
					value: e
				});
			}), [r]), y = f(u().getToggleHideAllColumnsProps, { instance: d() });
			o.forEach((function(e) {
				e.toggleHidden = function(t) {
					r({
						type: l.toggleHideColumn,
						columnId: e.id,
						value: t
					});
				}, e.getToggleHiddenProps = f(u().getToggleHiddenProps, {
					instance: d(),
					column: e
				});
			}));
			var R = h(c);
			w((function() {
				R() && r({ type: l.resetHiddenColumns });
			}), [r, n]), Object.assign(e, {
				allColumnsHidden: p,
				toggleHideColumn: g,
				setHiddenColumns: v,
				toggleHideAllColumns: m,
				getToggleHideAllColumnsProps: y
			});
		}
		var Z = {}, ee = {}, te = function(e, t, n) {
			return e;
		}, ne = function(e, t) {
			return e.subRows || [];
		}, oe = function(e, t, n) {
			return "" + (n ? [n.id, t].join(".") : t);
		}, re = function(e) {
			return e;
		};
		function ie(e) {
			var t = e.initialState, n = void 0 === t ? Z : t, o = e.defaultColumn, u = void 0 === o ? ee : o, l = e.getSubRows, s = void 0 === l ? ne : l, a = e.getRowId, c = void 0 === a ? oe : a, d = e.stateReducer, f = void 0 === d ? te : d, p = e.useControlledState, g = void 0 === p ? re : p;
			return r({}, i(e, [
				"initialState",
				"defaultColumn",
				"getSubRows",
				"getRowId",
				"stateReducer",
				"useControlledState"
			]), {
				initialState: n,
				defaultColumn: u,
				getSubRows: s,
				getRowId: c,
				stateReducer: f,
				useControlledState: g
			});
		}
		function ue(e, t) {
			void 0 === t && (t = 0);
			var n = 0, o = 0, r = 0, i = 0;
			return e.forEach((function(e) {
				var u = e.headers;
				if (e.totalLeft = t, u && u.length) {
					var l = ue(u, t), s = l[0], a = l[1], c = l[2], d = l[3];
					e.totalMinWidth = s, e.totalWidth = a, e.totalMaxWidth = c, e.totalFlexWidth = d;
				} else e.totalMinWidth = e.minWidth, e.totalWidth = Math.min(Math.max(e.minWidth, e.width), e.maxWidth), e.totalMaxWidth = e.maxWidth, e.totalFlexWidth = e.canResize ? e.totalWidth : 0;
				e.isVisible && (t += e.totalWidth, n += e.totalMinWidth, o += e.totalWidth, r += e.totalMaxWidth, i += e.totalFlexWidth);
			})), [
				n,
				o,
				r,
				i
			];
		}
		function le(e) {
			var t = e.data, n = e.rows, o = e.flatRows, r = e.rowsById, i = e.column, u = e.getRowId, l = e.getSubRows, s = e.accessValueHooks, a = e.getInstance;
			t.forEach((function(e, c) {
				return function e(n, c, d, f, g) {
					void 0 === d && (d = 0);
					var v = n, m = u(n, c, f), h = r[m];
					if (h) h.subRows && h.originalSubRows.forEach((function(t, n) {
						return e(t, n, d + 1, h);
					}));
					else if ((h = {
						id: m,
						original: v,
						index: c,
						depth: d,
						cells: [{}]
					}).cells.map = W, h.cells.filter = W, h.cells.forEach = W, h.cells[0].getCellProps = W, h.values = {}, g.push(h), o.push(h), r[m] = h, h.originalSubRows = l(n, c), h.originalSubRows) {
						var y = [];
						h.originalSubRows.forEach((function(t, n) {
							return e(t, n, d + 1, h, y);
						})), h.subRows = y;
					}
					i.accessor && (h.values[i.id] = i.accessor(n, c, h, g, t)), h.values[i.id] = p(s, h.values[i.id], {
						row: h,
						column: i,
						instance: a()
					});
				}(e, c, 0, void 0, n);
			}));
		}
		l.resetExpanded = "resetExpanded", l.toggleRowExpanded = "toggleRowExpanded", l.toggleAllRowsExpanded = "toggleAllRowsExpanded";
		var se = function(e) {
			e.getToggleAllRowsExpandedProps = [ae], e.getToggleRowExpandedProps = [ce], e.stateReducers.push(de), e.useInstance.push(fe), e.prepareRow.push(pe);
		};
		se.pluginName = "useExpanded";
		var ae = function(e, t) {
			var n = t.instance;
			return [e, {
				onClick: function(e) {
					n.toggleAllRowsExpanded();
				},
				style: { cursor: "pointer" },
				title: "Toggle All Rows Expanded"
			}];
		}, ce = function(e, t) {
			var n = t.row;
			return [e, {
				onClick: function() {
					n.toggleRowExpanded();
				},
				style: { cursor: "pointer" },
				title: "Toggle Row Expanded"
			}];
		};
		function de(e, t, n, o) {
			if (t.type === l.init) return r({ expanded: {} }, e);
			if (t.type === l.resetExpanded) return r({}, e, { expanded: o.initialState.expanded || {} });
			if (t.type === l.toggleAllRowsExpanded) {
				var s = t.value, a = o.rowsById, c = Object.keys(a).length === Object.keys(e.expanded).length;
				if (void 0 !== s ? s : !c) {
					var d = {};
					return Object.keys(a).forEach((function(e) {
						d[e] = !0;
					})), r({}, e, { expanded: d });
				}
				return r({}, e, { expanded: {} });
			}
			if (t.type === l.toggleRowExpanded) {
				var f, p = t.id, g = t.value, v = e.expanded[p], m = void 0 !== g ? g : !v;
				if (!v && m) return r({}, e, { expanded: r({}, e.expanded, (f = {}, f[p] = !0, f)) });
				if (v && !m) {
					var h = e.expanded;
					h[p];
					return r({}, e, { expanded: i(h, [p].map(u)) });
				}
				return e;
			}
		}
		function fe(e) {
			var n = e.data, o = e.rows, r = e.rowsById, i = e.manualExpandedKey, u = void 0 === i ? "expanded" : i, s = e.paginateExpandedRows, a = void 0 === s || s, c = e.expandSubRows, d = void 0 === c || c, p = e.autoResetExpanded, g = void 0 === p || p, m = e.getHooks, y = e.plugins, R = e.state.expanded, b = e.dispatch;
			v(y, [
				"useSortBy",
				"useGroupBy",
				"usePivotColumns",
				"useGlobalFilter"
			], "useExpanded");
			var S = h(g), C = Boolean(Object.keys(r).length && Object.keys(R).length);
			C && Object.keys(r).some((function(e) {
				return !R[e];
			})) && (C = !1), w((function() {
				S() && b({ type: l.resetExpanded });
			}), [b, n]);
			var x = t.useCallback((function(e, t) {
				b({
					type: l.toggleRowExpanded,
					id: e,
					value: t
				});
			}), [b]), P = t.useCallback((function(e) {
				return b({
					type: l.toggleAllRowsExpanded,
					value: e
				});
			}), [b]), B = t.useMemo((function() {
				return a ? A(o, {
					manualExpandedKey: u,
					expanded: R,
					expandSubRows: d
				}) : o;
			}), [
				a,
				o,
				u,
				R,
				d
			]), E = t.useMemo((function() {
				return function(e) {
					var t = 0;
					return Object.keys(e).forEach((function(e) {
						var n = e.split(".");
						t = Math.max(t, n.length);
					})), t;
				}(R);
			}), [R]), I = h(e), F = f(m().getToggleAllRowsExpandedProps, { instance: I() });
			Object.assign(e, {
				preExpandedRows: o,
				expandedRows: B,
				rows: B,
				expandedDepth: E,
				isAllRowsExpanded: C,
				toggleRowExpanded: x,
				toggleAllRowsExpanded: P,
				getToggleAllRowsExpandedProps: F
			});
		}
		function pe(e, t) {
			var n = t.instance.getHooks, o = t.instance;
			e.toggleRowExpanded = function(t) {
				return o.toggleRowExpanded(e.id, t);
			}, e.getToggleRowExpandedProps = f(n().getToggleRowExpandedProps, {
				instance: o,
				row: e
			});
		}
		var ge = function(e, t, n) {
			return e = e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return String(o).toLowerCase().includes(String(n).toLowerCase());
				}));
			}));
		};
		ge.autoRemove = function(e) {
			return !e;
		};
		var ve = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return void 0 === o || String(o).toLowerCase() === String(n).toLowerCase();
				}));
			}));
		};
		ve.autoRemove = function(e) {
			return !e;
		};
		var me = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return void 0 === o || String(o) === String(n);
				}));
			}));
		};
		me.autoRemove = function(e) {
			return !e;
		};
		var he = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					return e.values[t].includes(n);
				}));
			}));
		};
		he.autoRemove = function(e) {
			return !e || !e.length;
		};
		var ye = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return o && o.length && n.every((function(e) {
						return o.includes(e);
					}));
				}));
			}));
		};
		ye.autoRemove = function(e) {
			return !e || !e.length;
		};
		var we = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return o && o.length && n.some((function(e) {
						return o.includes(e);
					}));
				}));
			}));
		};
		we.autoRemove = function(e) {
			return !e || !e.length;
		};
		var Re = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					var o = e.values[t];
					return n.includes(o);
				}));
			}));
		};
		Re.autoRemove = function(e) {
			return !e || !e.length;
		};
		var be = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					return e.values[t] === n;
				}));
			}));
		};
		be.autoRemove = function(e) {
			return void 0 === e;
		};
		var Se = function(e, t, n) {
			return e.filter((function(e) {
				return t.some((function(t) {
					return e.values[t] == n;
				}));
			}));
		};
		Se.autoRemove = function(e) {
			return null == e;
		};
		var Ce = function(e, t, n) {
			var o = n || [], r = o[0], i = o[1];
			if ((r = "number" == typeof r ? r : -1 / 0) > (i = "number" == typeof i ? i : 1 / 0)) {
				var u = r;
				r = i, i = u;
			}
			return e.filter((function(e) {
				return t.some((function(t) {
					var n = e.values[t];
					return n >= r && n <= i;
				}));
			}));
		};
		Ce.autoRemove = function(e) {
			return !e || "number" != typeof e[0] && "number" != typeof e[1];
		};
		var xe = Object.freeze({
			__proto__: null,
			text: ge,
			exactText: ve,
			exactTextCase: me,
			includes: he,
			includesAll: ye,
			includesSome: we,
			includesValue: Re,
			exact: be,
			equals: Se,
			between: Ce
		});
		l.resetFilters = "resetFilters", l.setFilter = "setFilter", l.setAllFilters = "setAllFilters";
		var Pe = function(e) {
			e.stateReducers.push(Be), e.useInstance.push(Ee);
		};
		function Be(e, t, n, o) {
			if (t.type === l.init) return r({ filters: [] }, e);
			if (t.type === l.resetFilters) return r({}, e, { filters: o.initialState.filters || [] });
			if (t.type === l.setFilter) {
				var i = t.columnId, u = t.filterValue, s = o.allColumns, a = o.filterTypes, c = s.find((function(e) {
					return e.id === i;
				}));
				if (!c) throw new Error("React-Table: Could not find a column with id: " + i);
				var d = k(c.filter, a || {}, xe), f = e.filters.find((function(e) {
					return e.id === i;
				})), p = m(u, f && f.value);
				return H(d.autoRemove, p, c) ? r({}, e, { filters: e.filters.filter((function(e) {
					return e.id !== i;
				})) }) : r({}, e, f ? { filters: e.filters.map((function(e) {
					return e.id === i ? {
						id: i,
						value: p
					} : e;
				})) } : { filters: [].concat(e.filters, [{
					id: i,
					value: p
				}]) });
			}
			if (t.type === l.setAllFilters) {
				var g = t.filters, v = o.allColumns, h = o.filterTypes;
				return r({}, e, { filters: m(g, e.filters).filter((function(e) {
					var t = v.find((function(t) {
						return t.id === e.id;
					}));
					return !H(k(t.filter, h || {}, xe).autoRemove, e.value, t);
				})) });
			}
		}
		function Ee(e) {
			var n = e.data, o = e.rows, r = e.flatRows, i = e.rowsById, u = e.allColumns, s = e.filterTypes, a = e.manualFilters, c = e.defaultCanFilter, d = void 0 !== c && c, f = e.disableFilters, p = e.state.filters, g = e.dispatch, v = e.autoResetFilters, m = void 0 === v || v, y = t.useCallback((function(e, t) {
				g({
					type: l.setFilter,
					columnId: e,
					filterValue: t
				});
			}), [g]), R = t.useCallback((function(e) {
				g({
					type: l.setAllFilters,
					filters: e
				});
			}), [g]);
			u.forEach((function(e) {
				var t = e.id, n = e.accessor, o = e.defaultCanFilter, r = e.disableFilters;
				e.canFilter = n ? I(!0 !== r && void 0, !0 !== f && void 0, !0) : I(o, d, !1), e.setFilter = function(t) {
					return y(e.id, t);
				};
				var i = p.find((function(e) {
					return e.id === t;
				}));
				e.filterValue = i && i.value;
			}));
			var b = t.useMemo((function() {
				if (a || !p.length) return [
					o,
					r,
					i
				];
				var e = [], t = {};
				return [
					function n(o, r) {
						void 0 === r && (r = 0);
						var i = o;
						return (i = p.reduce((function(e, t) {
							var n = t.id, o = t.value, i = u.find((function(e) {
								return e.id === n;
							}));
							if (!i) return e;
							0 === r && (i.preFilteredRows = e);
							var l = k(i.filter, s || {}, xe);
							return l ? (i.filteredRows = l(e, [n], o), i.filteredRows) : (console.warn("Could not find a valid 'column.filter' for column with the ID: " + i.id + "."), e);
						}), o)).forEach((function(o) {
							e.push(o), t[o.id] = o, o.subRows && (o.subRows = o.subRows && o.subRows.length > 0 ? n(o.subRows, r + 1) : o.subRows);
						})), i;
					}(o),
					e,
					t
				];
			}), [
				a,
				p,
				o,
				r,
				i,
				u,
				s
			]), S = b[0], C = b[1], x = b[2];
			t.useMemo((function() {
				u.filter((function(e) {
					return !p.find((function(t) {
						return t.id === e.id;
					}));
				})).forEach((function(e) {
					e.preFilteredRows = S, e.filteredRows = S;
				}));
			}), [
				S,
				p,
				u
			]);
			var P = h(m);
			w((function() {
				P() && g({ type: l.resetFilters });
			}), [g, a ? null : n]), Object.assign(e, {
				preFilteredRows: o,
				preFilteredFlatRows: r,
				preFilteredRowsById: i,
				filteredRows: S,
				filteredFlatRows: C,
				filteredRowsById: x,
				rows: S,
				flatRows: C,
				rowsById: x,
				setFilter: y,
				setAllFilters: R
			});
		}
		Pe.pluginName = "useFilters", l.resetGlobalFilter = "resetGlobalFilter", l.setGlobalFilter = "setGlobalFilter";
		var Ie = function(e) {
			e.stateReducers.push(Fe), e.useInstance.push(Ge);
		};
		function Fe(e, t, n, o) {
			if (t.type === l.resetGlobalFilter) return r({}, e, { globalFilter: o.initialState.globalFilter || void 0 });
			if (t.type === l.setGlobalFilter) {
				var u = t.filterValue, s = o.userFilterTypes, a = k(o.globalFilter, s || {}, xe), c = m(u, e.globalFilter);
				if (H(a.autoRemove, c)) {
					e.globalFilter;
					return i(e, ["globalFilter"]);
				}
				return r({}, e, { globalFilter: c });
			}
		}
		function Ge(e) {
			var n = e.data, o = e.rows, r = e.flatRows, i = e.rowsById, u = e.allColumns, s = e.filterTypes, a = e.globalFilter, c = e.manualGlobalFilter, d = e.state.globalFilter, f = e.dispatch, p = e.autoResetGlobalFilter, g = void 0 === p || p, v = e.disableGlobalFilter, m = t.useCallback((function(e) {
				f({
					type: l.setGlobalFilter,
					filterValue: e
				});
			}), [f]), y = t.useMemo((function() {
				if (c || void 0 === d) return [
					o,
					r,
					i
				];
				var e = [], t = {}, n = k(a, s || {}, xe);
				if (!n) return console.warn("Could not find a valid 'globalFilter' option."), o;
				u.forEach((function(e) {
					var t = e.disableGlobalFilter;
					e.canFilter = I(!0 !== t && void 0, !0 !== v && void 0, !0);
				}));
				var l = u.filter((function(e) {
					return !0 === e.canFilter;
				}));
				return [
					function o(r) {
						return (r = n(r, l.map((function(e) {
							return e.id;
						})), d)).forEach((function(n) {
							e.push(n), t[n.id] = n, n.subRows = n.subRows && n.subRows.length ? o(n.subRows) : n.subRows;
						})), r;
					}(o),
					e,
					t
				];
			}), [
				c,
				d,
				a,
				s,
				u,
				o,
				r,
				i,
				v
			]), R = y[0], b = y[1], S = y[2], C = h(g);
			w((function() {
				C() && f({ type: l.resetGlobalFilter });
			}), [f, c ? null : n]), Object.assign(e, {
				preGlobalFilteredRows: o,
				preGlobalFilteredFlatRows: r,
				preGlobalFilteredRowsById: i,
				globalFilteredRows: R,
				globalFilteredFlatRows: b,
				globalFilteredRowsById: S,
				rows: R,
				flatRows: b,
				rowsById: S,
				setGlobalFilter: m,
				disableGlobalFilter: v
			});
		}
		function Ae(e, t) {
			return t.reduce((function(e, t) {
				return e + ("number" == typeof t ? t : 0);
			}), 0);
		}
		Ie.pluginName = "useGlobalFilter";
		var ke = Object.freeze({
			__proto__: null,
			sum: Ae,
			min: function(e) {
				var t = e[0] || 0;
				return e.forEach((function(e) {
					"number" == typeof e && (t = Math.min(t, e));
				})), t;
			},
			max: function(e) {
				var t = e[0] || 0;
				return e.forEach((function(e) {
					"number" == typeof e && (t = Math.max(t, e));
				})), t;
			},
			minMax: function(e) {
				var t = e[0] || 0, n = e[0] || 0;
				return e.forEach((function(e) {
					"number" == typeof e && (t = Math.min(t, e), n = Math.max(n, e));
				})), t + ".." + n;
			},
			average: function(e) {
				return Ae(0, e) / e.length;
			},
			median: function(e) {
				if (!e.length) return null;
				var t = Math.floor(e.length / 2), n = [].concat(e).sort((function(e, t) {
					return e - t;
				}));
				return e.length % 2 != 0 ? n[t] : (n[t - 1] + n[t]) / 2;
			},
			unique: function(e) {
				return Array.from(new Set(e).values());
			},
			uniqueCount: function(e) {
				return new Set(e).size;
			},
			count: function(e) {
				return e.length;
			}
		}), He = [], We = {};
		l.resetGroupBy = "resetGroupBy", l.setGroupBy = "setGroupBy", l.toggleGroupBy = "toggleGroupBy";
		var ze = function(e) {
			e.getGroupByToggleProps = [Te], e.stateReducers.push(Oe), e.visibleColumnsDeps.push((function(e, t) {
				var n = t.instance;
				return [].concat(e, [n.state.groupBy]);
			})), e.visibleColumns.push(Me), e.useInstance.push(Le), e.prepareRow.push(Ne);
		};
		ze.pluginName = "useGroupBy";
		var Te = function(e, t) {
			var n = t.header;
			return [e, {
				onClick: n.canGroupBy ? function(e) {
					e.persist(), n.toggleGroupBy();
				} : void 0,
				style: { cursor: n.canGroupBy ? "pointer" : void 0 },
				title: "Toggle GroupBy"
			}];
		};
		function Oe(e, t, n, o) {
			if (t.type === l.init) return r({ groupBy: [] }, e);
			if (t.type === l.resetGroupBy) return r({}, e, { groupBy: o.initialState.groupBy || [] });
			if (t.type === l.setGroupBy) return r({}, e, { groupBy: t.value });
			if (t.type === l.toggleGroupBy) {
				var i = t.columnId, u = t.value, s = void 0 !== u ? u : !e.groupBy.includes(i);
				return r({}, e, s ? { groupBy: [].concat(e.groupBy, [i]) } : { groupBy: e.groupBy.filter((function(e) {
					return e !== i;
				})) });
			}
		}
		function Me(e, t) {
			var n = t.instance.state.groupBy, o = n.map((function(t) {
				return e.find((function(e) {
					return e.id === t;
				}));
			})).filter(Boolean), r = e.filter((function(e) {
				return !n.includes(e.id);
			}));
			return (e = [].concat(o, r)).forEach((function(e) {
				e.isGrouped = n.includes(e.id), e.groupedIndex = n.indexOf(e.id);
			})), e;
		}
		var je = {};
		function Le(e) {
			var n = e.data, o = e.rows, i = e.flatRows, u = e.rowsById, s = e.allColumns, a = e.flatHeaders, c = e.groupByFn, d = void 0 === c ? De : c, p = e.manualGroupBy, g = e.aggregations, m = void 0 === g ? je : g, y = e.plugins, R = e.state.groupBy, b = e.dispatch, S = e.autoResetGroupBy, C = void 0 === S || S, x = e.disableGroupBy, P = e.defaultCanGroupBy, B = e.getHooks;
			v(y, ["useColumnOrder", "useFilters"], "useGroupBy");
			var E = h(e);
			s.forEach((function(t) {
				var n = t.accessor, o = t.defaultGroupBy, r = t.disableGroupBy;
				t.canGroupBy = n ? I(t.canGroupBy, !0 !== r && void 0, !0 !== x && void 0, !0) : I(t.canGroupBy, o, P, !1), t.canGroupBy && (t.toggleGroupBy = function() {
					return e.toggleGroupBy(t.id);
				}), t.Aggregated = t.Aggregated || t.Cell;
			}));
			var F = t.useCallback((function(e, t) {
				b({
					type: l.toggleGroupBy,
					columnId: e,
					value: t
				});
			}), [b]), A = t.useCallback((function(e) {
				b({
					type: l.setGroupBy,
					value: e
				});
			}), [b]);
			a.forEach((function(e) {
				e.getGroupByToggleProps = f(B().getGroupByToggleProps, {
					instance: E(),
					header: e
				});
			}));
			var k = t.useMemo((function() {
				if (p || !R.length) return [
					o,
					i,
					u,
					He,
					We,
					i,
					u
				];
				var e = R.filter((function(e) {
					return s.find((function(t) {
						return t.id === e;
					}));
				})), t = [], n = {}, l = [], a = {}, c = [], f = {}, g = function o(i, u, p) {
					if (void 0 === u && (u = 0), u === e.length) return i.map((function(e) {
						return r({}, e, { depth: u });
					}));
					var g = e[u], v = d(i, g);
					return Object.entries(v).map((function(r, i) {
						var d = r[0], v = r[1], h = g + ":" + d, y = o(v, u + 1, h = p ? p + ">" + h : h), w = u ? G(v, "leafRows") : v, R = function(t, n, o) {
							var r = {};
							return s.forEach((function(i) {
								if (e.includes(i.id)) r[i.id] = n[0] ? n[0].values[i.id] : null;
								else {
									var u = "function" == typeof i.aggregate ? i.aggregate : m[i.aggregate] || ke[i.aggregate];
									if (u) {
										var l = n.map((function(e) {
											return e.values[i.id];
										})), s = t.map((function(e) {
											var t = e.values[i.id];
											if (!o && i.aggregateValue) {
												var n = "function" == typeof i.aggregateValue ? i.aggregateValue : m[i.aggregateValue] || ke[i.aggregateValue];
												if (!n) throw console.info({ column: i }), /* @__PURE__ */ new Error("React Table: Invalid column.aggregateValue option for column listed above");
												t = n(t, e, i);
											}
											return t;
										}));
										r[i.id] = u(s, l);
									} else {
										if (i.aggregate) throw console.info({ column: i }), /* @__PURE__ */ new Error("React Table: Invalid column.aggregate option for column listed above");
										r[i.id] = null;
									}
								}
							})), r;
						}(w, v, u), b = {
							id: h,
							isGrouped: !0,
							groupByID: g,
							groupByVal: d,
							values: R,
							subRows: y,
							leafRows: w,
							depth: u,
							index: i
						};
						return y.forEach((function(e) {
							t.push(e), n[e.id] = e, e.isGrouped ? (l.push(e), a[e.id] = e) : (c.push(e), f[e.id] = e);
						})), b;
					}));
				}(o);
				return g.forEach((function(e) {
					t.push(e), n[e.id] = e, e.isGrouped ? (l.push(e), a[e.id] = e) : (c.push(e), f[e.id] = e);
				})), [
					g,
					t,
					n,
					l,
					a,
					c,
					f
				];
			}), [
				p,
				R,
				o,
				i,
				u,
				s,
				m,
				d
			]), H = k[0], W = k[1], z = k[2], T = k[3], O = k[4], M = k[5], j = k[6], L = h(C);
			w((function() {
				L() && b({ type: l.resetGroupBy });
			}), [b, p ? null : n]), Object.assign(e, {
				preGroupedRows: o,
				preGroupedFlatRow: i,
				preGroupedRowsById: u,
				groupedRows: H,
				groupedFlatRows: W,
				groupedRowsById: z,
				onlyGroupedFlatRows: T,
				onlyGroupedRowsById: O,
				nonGroupedFlatRows: M,
				nonGroupedRowsById: j,
				rows: H,
				flatRows: W,
				rowsById: z,
				toggleGroupBy: F,
				setGroupBy: A
			});
		}
		function Ne(e) {
			e.allCells.forEach((function(t) {
				var n;
				t.isGrouped = t.column.isGrouped && t.column.id === e.groupByID, t.isPlaceholder = !t.isGrouped && t.column.isGrouped, t.isAggregated = !t.isGrouped && !t.isPlaceholder && (null == (n = e.subRows) ? void 0 : n.length);
			}));
		}
		function De(e, t) {
			return e.reduce((function(e, n, o) {
				var r = "" + n.values[t];
				return e[r] = Array.isArray(e[r]) ? e[r] : [], e[r].push(n), e;
			}), {});
		}
		var Ve = /([0-9]+)/gm;
		function _e(e, t) {
			return e === t ? 0 : e > t ? 1 : -1;
		}
		function Xe(e, t, n) {
			return [e.values[n], t.values[n]];
		}
		function qe(e) {
			return "number" == typeof e ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : "string" == typeof e ? e : "";
		}
		var Ke = Object.freeze({
			__proto__: null,
			alphanumeric: function(e, t, n) {
				var o = Xe(e, t, n), r = o[0], i = o[1];
				for (r = qe(r), i = qe(i), r = r.split(Ve).filter(Boolean), i = i.split(Ve).filter(Boolean); r.length && i.length;) {
					var u = r.shift(), l = i.shift(), s = parseInt(u, 10), a = parseInt(l, 10), c = [s, a].sort();
					if (isNaN(c[0])) {
						if (u > l) return 1;
						if (l > u) return -1;
					} else {
						if (isNaN(c[1])) return isNaN(s) ? -1 : 1;
						if (s > a) return 1;
						if (a > s) return -1;
					}
				}
				return r.length - i.length;
			},
			datetime: function(e, t, n) {
				var o = Xe(e, t, n), r = o[0], i = o[1];
				return _e(r = r.getTime(), i = i.getTime());
			},
			basic: function(e, t, n) {
				var o = Xe(e, t, n);
				return _e(o[0], o[1]);
			},
			string: function(e, t, n) {
				var o = Xe(e, t, n), r = o[0], i = o[1];
				for (r = r.split("").filter(Boolean), i = i.split("").filter(Boolean); r.length && i.length;) {
					var u = r.shift(), l = i.shift(), s = u.toLowerCase(), a = l.toLowerCase();
					if (s > a) return 1;
					if (a > s) return -1;
					if (u > l) return 1;
					if (l > u) return -1;
				}
				return r.length - i.length;
			},
			number: function(e, t, n) {
				var o = Xe(e, t, n), r = o[0], i = o[1], u = /[^0-9.]/gi;
				return _e(r = Number(String(r).replace(u, "")), i = Number(String(i).replace(u, "")));
			}
		});
		l.resetSortBy = "resetSortBy", l.setSortBy = "setSortBy", l.toggleSortBy = "toggleSortBy", l.clearSortBy = "clearSortBy", c.sortType = "alphanumeric", c.sortDescFirst = !1;
		var Ue = function(e) {
			e.getSortByToggleProps = [$e], e.stateReducers.push(Je), e.useInstance.push(Ye);
		};
		Ue.pluginName = "useSortBy";
		var $e = function(e, t) {
			var n = t.instance, o = t.column, r = n.isMultiSortEvent, i = void 0 === r ? function(e) {
				return e.shiftKey;
			} : r;
			return [e, {
				onClick: o.canSort ? function(e) {
					e.persist(), o.toggleSortBy(void 0, !n.disableMultiSort && i(e));
				} : void 0,
				style: { cursor: o.canSort ? "pointer" : void 0 },
				title: o.canSort ? "Toggle SortBy" : void 0
			}];
		};
		function Je(e, t, n, o) {
			if (t.type === l.init) return r({ sortBy: [] }, e);
			if (t.type === l.resetSortBy) return r({}, e, { sortBy: o.initialState.sortBy || [] });
			if (t.type === l.clearSortBy) return r({}, e, { sortBy: e.sortBy.filter((function(e) {
				return e.id !== t.columnId;
			})) });
			if (t.type === l.setSortBy) return r({}, e, { sortBy: t.sortBy });
			if (t.type === l.toggleSortBy) {
				var i, u = t.columnId, s = t.desc, a = t.multi, c = o.allColumns, d = o.disableMultiSort, f = o.disableSortRemove, p = o.disableMultiRemove, g = o.maxMultiSortColCount, v = void 0 === g ? Number.MAX_SAFE_INTEGER : g, m = e.sortBy, h = c.find((function(e) {
					return e.id === u;
				})).sortDescFirst, y = m.find((function(e) {
					return e.id === u;
				})), w = m.findIndex((function(e) {
					return e.id === u;
				})), R = null != s, b = [];
				return "toggle" !== (i = !d && a ? y ? "toggle" : "add" : w !== m.length - 1 || 1 !== m.length ? "replace" : y ? "toggle" : "replace") || f || R || a && p || !(y && y.desc && !h || !y.desc && h) || (i = "remove"), "replace" === i ? b = [{
					id: u,
					desc: R ? s : h
				}] : "add" === i ? (b = [].concat(m, [{
					id: u,
					desc: R ? s : h
				}])).splice(0, b.length - v) : "toggle" === i ? b = m.map((function(e) {
					return e.id === u ? r({}, e, { desc: R ? s : !y.desc }) : e;
				})) : "remove" === i && (b = m.filter((function(e) {
					return e.id !== u;
				}))), r({}, e, { sortBy: b });
			}
		}
		function Ye(e) {
			var n = e.data, o = e.rows, r = e.flatRows, i = e.allColumns, u = e.orderByFn, s = void 0 === u ? Qe : u, a = e.sortTypes, c = e.manualSortBy, d = e.defaultCanSort, p = e.disableSortBy, g = e.flatHeaders, m = e.state.sortBy, y = e.dispatch, R = e.plugins, b = e.getHooks, S = e.autoResetSortBy, C = void 0 === S || S;
			v(R, [
				"useFilters",
				"useGlobalFilter",
				"useGroupBy",
				"usePivotColumns"
			], "useSortBy");
			var x = t.useCallback((function(e) {
				y({
					type: l.setSortBy,
					sortBy: e
				});
			}), [y]), P = t.useCallback((function(e, t, n) {
				y({
					type: l.toggleSortBy,
					columnId: e,
					desc: t,
					multi: n
				});
			}), [y]), B = h(e);
			g.forEach((function(e) {
				var t = e.accessor, n = e.canSort, o = e.disableSortBy, r = e.id;
				e.canSort = t ? I(!0 !== o && void 0, !0 !== p && void 0, !0) : I(d, n, !1), e.canSort && (e.toggleSortBy = function(t, n) {
					return P(e.id, t, n);
				}, e.clearSortBy = function() {
					y({
						type: l.clearSortBy,
						columnId: e.id
					});
				}), e.getSortByToggleProps = f(b().getSortByToggleProps, {
					instance: B(),
					column: e
				});
				var u = m.find((function(e) {
					return e.id === r;
				}));
				e.isSorted = !!u, e.sortedIndex = m.findIndex((function(e) {
					return e.id === r;
				})), e.isSortedDesc = e.isSorted ? u.desc : void 0;
			}));
			var E = t.useMemo((function() {
				if (c || !m.length) return [o, r];
				var e = [], t = m.filter((function(e) {
					return i.find((function(t) {
						return t.id === e.id;
					}));
				}));
				return [function n(o) {
					var r = s(o, t.map((function(e) {
						var t = i.find((function(t) {
							return t.id === e.id;
						}));
						if (!t) throw new Error("React-Table: Could not find a column with id: " + e.id + " while sorting");
						var n = t.sortType, o = F(n) || (a || {})[n] || Ke[n];
						if (!o) throw new Error("React-Table: Could not find a valid sortType of '" + n + "' for column '" + e.id + "'.");
						return function(t, n) {
							return o(t, n, e.id, e.desc);
						};
					})), t.map((function(e) {
						var t = i.find((function(t) {
							return t.id === e.id;
						}));
						return t && t.sortInverted ? e.desc : !e.desc;
					})));
					return r.forEach((function(t) {
						e.push(t), t.subRows && 0 !== t.subRows.length && (t.subRows = n(t.subRows));
					})), r;
				}(o), e];
			}), [
				c,
				m,
				o,
				r,
				i,
				s,
				a
			]), G = E[0], A = E[1], k = h(C);
			w((function() {
				k() && y({ type: l.resetSortBy });
			}), [c ? null : n]), Object.assign(e, {
				preSortedRows: o,
				preSortedFlatRows: r,
				sortedRows: G,
				sortedFlatRows: A,
				rows: G,
				flatRows: A,
				setSortBy: x,
				toggleSortBy: P
			});
		}
		function Qe(e, t, n) {
			return [].concat(e).sort((function(e, o) {
				for (var r = 0; r < t.length; r += 1) {
					var i = t[r], u = !1 === n[r] || "desc" === n[r], l = i(e, o);
					if (0 !== l) return u ? -l : l;
				}
				return n[0] ? e.index - o.index : o.index - e.index;
			}));
		}
		l.resetPage = "resetPage", l.gotoPage = "gotoPage", l.setPageSize = "setPageSize";
		var Ze = function(e) {
			e.stateReducers.push(et), e.useInstance.push(tt);
		};
		function et(e, t, n, o) {
			if (t.type === l.init) return r({
				pageSize: 10,
				pageIndex: 0
			}, e);
			if (t.type === l.resetPage) return r({}, e, { pageIndex: o.initialState.pageIndex || 0 });
			if (t.type === l.gotoPage) {
				var i = o.pageCount, u = o.page, s = m(t.pageIndex, e.pageIndex), a = !1;
				return s > e.pageIndex ? a = -1 === i ? u.length >= e.pageSize : s < i : s < e.pageIndex && (a = s > -1), a ? r({}, e, { pageIndex: s }) : e;
			}
			if (t.type === l.setPageSize) {
				var c = t.pageSize, d = e.pageSize * e.pageIndex;
				return r({}, e, {
					pageIndex: Math.floor(d / c),
					pageSize: c
				});
			}
		}
		function tt(e) {
			var n = e.rows, o = e.autoResetPage, r = void 0 === o || o, i = e.manualExpandedKey, u = void 0 === i ? "expanded" : i, s = e.plugins, a = e.pageCount, c = e.paginateExpandedRows, d = void 0 === c || c, f = e.expandSubRows, p = void 0 === f || f, g = e.state, m = g.pageSize, y = g.pageIndex, R = g.expanded, b = g.globalFilter, S = g.filters, C = g.groupBy, x = g.sortBy, P = e.dispatch, B = e.data, E = e.manualPagination;
			v(s, [
				"useGlobalFilter",
				"useFilters",
				"useGroupBy",
				"useSortBy",
				"useExpanded"
			], "usePagination");
			var I = h(r);
			w((function() {
				I() && P({ type: l.resetPage });
			}), [
				P,
				E ? null : B,
				b,
				S,
				C,
				x
			]);
			var F = E ? a : Math.ceil(n.length / m), G = t.useMemo((function() {
				return F > 0 ? [].concat(new Array(F)).fill(null).map((function(e, t) {
					return t;
				})) : [];
			}), [F]), k = t.useMemo((function() {
				var e;
				if (E) e = n;
				else {
					var t = m * y, o = t + m;
					e = n.slice(t, o);
				}
				return d ? e : A(e, {
					manualExpandedKey: u,
					expanded: R,
					expandSubRows: p
				});
			}), [
				p,
				R,
				u,
				E,
				y,
				m,
				d,
				n
			]), H = y > 0, W = -1 === F ? k.length >= m : y < F - 1, z = t.useCallback((function(e) {
				P({
					type: l.gotoPage,
					pageIndex: e
				});
			}), [P]), T = t.useCallback((function() {
				return z((function(e) {
					return e - 1;
				}));
			}), [z]), O = t.useCallback((function() {
				return z((function(e) {
					return e + 1;
				}));
			}), [z]), M = t.useCallback((function(e) {
				P({
					type: l.setPageSize,
					pageSize: e
				});
			}), [P]);
			Object.assign(e, {
				pageOptions: G,
				pageCount: F,
				page: k,
				canPreviousPage: H,
				canNextPage: W,
				gotoPage: z,
				previousPage: T,
				nextPage: O,
				setPageSize: M
			});
		}
		Ze.pluginName = "usePagination", l.resetPivot = "resetPivot", l.togglePivot = "togglePivot";
		var nt = function(e) {
			e.getPivotToggleProps = [rt], e.stateReducers.push(it), e.useInstanceAfterData.push(ut), e.allColumns.push(lt), e.accessValue.push(st), e.materializedColumns.push(at), e.materializedColumnsDeps.push(ct), e.visibleColumns.push(dt), e.visibleColumnsDeps.push(ft), e.useInstance.push(pt), e.prepareRow.push(gt);
		};
		nt.pluginName = "usePivotColumns";
		var ot = [], rt = function(e, t) {
			var n = t.header;
			return [e, {
				onClick: n.canPivot ? function(e) {
					e.persist(), n.togglePivot();
				} : void 0,
				style: { cursor: n.canPivot ? "pointer" : void 0 },
				title: "Toggle Pivot"
			}];
		};
		function it(e, t, n, o) {
			if (t.type === l.init) return r({ pivotColumns: ot }, e);
			if (t.type === l.resetPivot) return r({}, e, { pivotColumns: o.initialState.pivotColumns || ot });
			if (t.type === l.togglePivot) {
				var i = t.columnId, u = t.value, s = void 0 !== u ? u : !e.pivotColumns.includes(i);
				return r({}, e, s ? { pivotColumns: [].concat(e.pivotColumns, [i]) } : { pivotColumns: e.pivotColumns.filter((function(e) {
					return e !== i;
				})) });
			}
		}
		function ut(e) {
			e.allColumns.forEach((function(t) {
				t.isPivotSource = e.state.pivotColumns.includes(t.id);
			}));
		}
		function lt(e, t) {
			var n = t.instance;
			return e.forEach((function(e) {
				e.isPivotSource = n.state.pivotColumns.includes(e.id), e.uniqueValues = /* @__PURE__ */ new Set();
			})), e;
		}
		function st(e, t) {
			var n = t.column;
			return n.uniqueValues && void 0 !== e && n.uniqueValues.add(e), e;
		}
		function at(e, t) {
			var n = t.instance, o = n.allColumns, i = n.state;
			if (!i.pivotColumns.length || !i.groupBy || !i.groupBy.length) return e;
			var u = i.pivotColumns.map((function(e) {
				return o.find((function(t) {
					return t.id === e;
				}));
			})).filter(Boolean), l = o.filter((function(e) {
				return !e.isPivotSource && !i.groupBy.includes(e.id) && !i.pivotColumns.includes(e.id);
			})), s = C(function e(t, n, o) {
				void 0 === t && (t = 0), void 0 === o && (o = []);
				var i = u[t];
				return i ? Array.from(i.uniqueValues).sort().map((function(u) {
					var l = r({}, i, {
						Header: i.PivotHeader || "string" == typeof i.header ? i.Header + ": " + u : u,
						isPivotGroup: !0,
						parent: n,
						depth: t,
						id: n ? n.id + "." + i.id + "." + u : i.id + "." + u,
						pivotValue: u
					});
					return l.columns = e(t + 1, l, [].concat(o, [function(e) {
						return e.values[i.id] === u;
					}])), l;
				})) : l.map((function(e) {
					return r({}, e, {
						canPivot: !1,
						isPivoted: !0,
						parent: n,
						depth: t,
						id: "" + (n ? n.id + "." + e.id : e.id),
						accessor: function(t, n, r) {
							if (o.every((function(e) {
								return e(r);
							}))) return r.values[e.id];
						}
					});
				}));
			}());
			return [].concat(e, s);
		}
		function ct(e, t) {
			var n = t.instance.state, o = n.pivotColumns, r = n.groupBy;
			return [].concat(e, [o, r]);
		}
		function dt(e, t) {
			var n = t.instance.state;
			return e = e.filter((function(e) {
				return !e.isPivotSource;
			})), n.pivotColumns.length && n.groupBy && n.groupBy.length && (e = e.filter((function(e) {
				return e.isGrouped || e.isPivoted;
			}))), e;
		}
		function ft(e, t) {
			var n = t.instance;
			return [].concat(e, [n.state.pivotColumns, n.state.groupBy]);
		}
		function pt(e) {
			var t = e.columns, n = e.allColumns, o = e.flatHeaders, r = e.getHooks, i = e.plugins, u = e.dispatch, s = e.autoResetPivot, a = void 0 === s || s, c = e.manaulPivot, d = e.disablePivot, p = e.defaultCanPivot;
			v(i, ["useGroupBy"], "usePivotColumns");
			var g = h(e);
			n.forEach((function(t) {
				var n = t.accessor, o = t.defaultPivot, r = t.disablePivot;
				t.canPivot = n ? I(t.canPivot, !0 !== r && void 0, !0 !== d && void 0, !0) : I(t.canPivot, o, p, !1), t.canPivot && (t.togglePivot = function() {
					return e.togglePivot(t.id);
				}), t.Aggregated = t.Aggregated || t.Cell;
			}));
			o.forEach((function(e) {
				e.getPivotToggleProps = f(r().getPivotToggleProps, {
					instance: g(),
					header: e
				});
			}));
			var m = h(a);
			w((function() {
				m() && u({ type: l.resetPivot });
			}), [u, c ? null : t]), Object.assign(e, { togglePivot: function(e, t) {
				u({
					type: l.togglePivot,
					columnId: e,
					value: t
				});
			} });
		}
		function gt(e) {
			e.allCells.forEach((function(e) {
				e.isPivoted = e.column.isPivoted;
			}));
		}
		l.resetSelectedRows = "resetSelectedRows", l.toggleAllRowsSelected = "toggleAllRowsSelected", l.toggleRowSelected = "toggleRowSelected", l.toggleAllPageRowsSelected = "toggleAllPageRowsSelected";
		var vt = function(e) {
			e.getToggleRowSelectedProps = [mt], e.getToggleAllRowsSelectedProps = [ht], e.getToggleAllPageRowsSelectedProps = [yt], e.stateReducers.push(wt), e.useInstance.push(Rt), e.prepareRow.push(bt);
		};
		vt.pluginName = "useRowSelect";
		var mt = function(e, t) {
			var n = t.instance, o = t.row, r = n.manualRowSelectedKey, i = void 0 === r ? "isSelected" : r;
			return [e, {
				onChange: function(e) {
					o.toggleRowSelected(e.target.checked);
				},
				style: { cursor: "pointer" },
				checked: !(!o.original || !o.original[i]) || o.isSelected,
				title: "Toggle Row Selected",
				indeterminate: o.isSomeSelected
			}];
		}, ht = function(e, t) {
			var n = t.instance;
			return [e, {
				onChange: function(e) {
					n.toggleAllRowsSelected(e.target.checked);
				},
				style: { cursor: "pointer" },
				checked: n.isAllRowsSelected,
				title: "Toggle All Rows Selected",
				indeterminate: Boolean(!n.isAllRowsSelected && Object.keys(n.state.selectedRowIds).length)
			}];
		}, yt = function(e, t) {
			var n = t.instance;
			return [e, {
				onChange: function(e) {
					n.toggleAllPageRowsSelected(e.target.checked);
				},
				style: { cursor: "pointer" },
				checked: n.isAllPageRowsSelected,
				title: "Toggle All Current Page Rows Selected",
				indeterminate: Boolean(!n.isAllPageRowsSelected && n.page.some((function(e) {
					var t = e.id;
					return n.state.selectedRowIds[t];
				})))
			}];
		};
		function wt(e, t, n, o) {
			if (t.type === l.init) return r({ selectedRowIds: {} }, e);
			if (t.type === l.resetSelectedRows) return r({}, e, { selectedRowIds: o.initialState.selectedRowIds || {} });
			if (t.type === l.toggleAllRowsSelected) {
				var i = t.value, u = o.isAllRowsSelected, s = o.rowsById, a = o.nonGroupedRowsById, c = void 0 === a ? s : a, d = void 0 !== i ? i : !u, f = Object.assign({}, e.selectedRowIds);
				return d ? Object.keys(c).forEach((function(e) {
					f[e] = !0;
				})) : Object.keys(c).forEach((function(e) {
					delete f[e];
				})), r({}, e, { selectedRowIds: f });
			}
			if (t.type === l.toggleRowSelected) {
				var p = t.id, g = t.value, v = o.rowsById, m = o.selectSubRows, h = void 0 === m || m, y = o.getSubRows, w = e.selectedRowIds[p], R = void 0 !== g ? g : !w;
				if (w === R) return e;
				var b = r({}, e.selectedRowIds);
				return function e(t) {
					var n = v[t];
					if (n && (n.isGrouped || (R ? b[t] = !0 : delete b[t]), h && y(n))) return y(n).forEach((function(t) {
						return e(t.id);
					}));
				}(p), r({}, e, { selectedRowIds: b });
			}
			if (t.type === l.toggleAllPageRowsSelected) {
				var S = t.value, C = o.page, x = o.rowsById, P = o.selectSubRows, B = void 0 === P || P, E = o.isAllPageRowsSelected, I = o.getSubRows, F = void 0 !== S ? S : !E, G = r({}, e.selectedRowIds);
				return C.forEach((function(e) {
					return function e(t) {
						var n = x[t];
						if (n.isGrouped || (F ? G[t] = !0 : delete G[t]), B && I(n)) return I(n).forEach((function(t) {
							return e(t.id);
						}));
					}(e.id);
				})), r({}, e, { selectedRowIds: G });
			}
			return e;
		}
		function Rt(e) {
			var n = e.data, o = e.rows, r = e.getHooks, i = e.plugins, u = e.rowsById, s = e.nonGroupedRowsById, a = void 0 === s ? u : s, c = e.autoResetSelectedRows, d = void 0 === c || c, p = e.state.selectedRowIds, g = e.selectSubRows, m = void 0 === g || g, y = e.dispatch, R = e.page, b = e.getSubRows;
			v(i, [
				"useFilters",
				"useGroupBy",
				"useSortBy",
				"useExpanded",
				"usePagination"
			], "useRowSelect");
			var S = t.useMemo((function() {
				var e = [];
				return o.forEach((function(t) {
					var n = m ? function e(t, n, o) {
						if (n[t.id]) return !0;
						var r = o(t);
						if (r && r.length) {
							var i = !0, u = !1;
							return r.forEach((function(t) {
								u && !i || (e(t, n, o) ? u = !0 : i = !1);
							})), !!i || !!u && null;
						}
						return !1;
					}(t, p, b) : !!p[t.id];
					t.isSelected = !!n, t.isSomeSelected = null === n, n && e.push(t);
				})), e;
			}), [
				o,
				m,
				p,
				b
			]), C = Boolean(Object.keys(a).length && Object.keys(p).length), x = C;
			C && Object.keys(a).some((function(e) {
				return !p[e];
			})) && (C = !1), C || R && R.length && R.some((function(e) {
				return !p[e.id];
			})) && (x = !1);
			var P = h(d);
			w((function() {
				P() && y({ type: l.resetSelectedRows });
			}), [y, n]);
			var B = t.useCallback((function(e) {
				return y({
					type: l.toggleAllRowsSelected,
					value: e
				});
			}), [y]), E = t.useCallback((function(e) {
				return y({
					type: l.toggleAllPageRowsSelected,
					value: e
				});
			}), [y]), I = t.useCallback((function(e, t) {
				return y({
					type: l.toggleRowSelected,
					id: e,
					value: t
				});
			}), [y]), F = h(e), G = f(r().getToggleAllRowsSelectedProps, { instance: F() }), A = f(r().getToggleAllPageRowsSelectedProps, { instance: F() });
			Object.assign(e, {
				selectedFlatRows: S,
				isAllRowsSelected: C,
				isAllPageRowsSelected: x,
				toggleRowSelected: I,
				toggleAllRowsSelected: B,
				getToggleAllRowsSelectedProps: G,
				getToggleAllPageRowsSelectedProps: A,
				toggleAllPageRowsSelected: E
			});
		}
		function bt(e, t) {
			var n = t.instance;
			e.toggleRowSelected = function(t) {
				return n.toggleRowSelected(e.id, t);
			}, e.getToggleRowSelectedProps = f(n.getHooks().getToggleRowSelectedProps, {
				instance: n,
				row: e
			});
		}
		var St = function(e) {
			return {};
		}, Ct = function(e) {
			return {};
		};
		l.setRowState = "setRowState", l.setCellState = "setCellState", l.resetRowState = "resetRowState";
		var xt = function(e) {
			e.stateReducers.push(Pt), e.useInstance.push(Bt), e.prepareRow.push(Et);
		};
		function Pt(e, t, n, o) {
			var i = o.initialRowStateAccessor, u = void 0 === i ? St : i, s = o.initialCellStateAccessor, a = void 0 === s ? Ct : s, c = o.rowsById;
			if (t.type === l.init) return r({ rowState: {} }, e);
			if (t.type === l.resetRowState) return r({}, e, { rowState: o.initialState.rowState || {} });
			if (t.type === l.setRowState) {
				var d, f = t.rowId, p = t.value, g = void 0 !== e.rowState[f] ? e.rowState[f] : u(c[f]);
				return r({}, e, { rowState: r({}, e.rowState, (d = {}, d[f] = m(p, g), d)) });
			}
			if (t.type === l.setCellState) {
				var v, h, y, w, R, b = t.rowId, S = t.columnId, C = t.value, x = void 0 !== e.rowState[b] ? e.rowState[b] : u(c[b]), P = void 0 !== (null == x ? void 0 : null == (v = x.cellState) ? void 0 : v[S]) ? x.cellState[S] : a(null == (h = c[b]) ? void 0 : null == (y = h.cells) ? void 0 : y.find((function(e) {
					return e.column.id === S;
				})));
				return r({}, e, { rowState: r({}, e.rowState, (R = {}, R[b] = r({}, x, { cellState: r({}, x.cellState || {}, (w = {}, w[S] = m(C, P), w)) }), R)) });
			}
		}
		function Bt(e) {
			var n = e.autoResetRowState, o = void 0 === n || n, r = e.data, i = e.dispatch, u = t.useCallback((function(e, t) {
				return i({
					type: l.setRowState,
					rowId: e,
					value: t
				});
			}), [i]), s = t.useCallback((function(e, t, n) {
				return i({
					type: l.setCellState,
					rowId: e,
					columnId: t,
					value: n
				});
			}), [i]), a = h(o);
			w((function() {
				a() && i({ type: l.resetRowState });
			}), [r]), Object.assign(e, {
				setRowState: u,
				setCellState: s
			});
		}
		function Et(e, t) {
			var n = t.instance, o = n.initialRowStateAccessor, r = void 0 === o ? St : o, i = n.initialCellStateAccessor, u = void 0 === i ? Ct : i, l = n.state.rowState;
			e && (e.state = void 0 !== l[e.id] ? l[e.id] : r(e), e.setState = function(t) {
				return n.setRowState(e.id, t);
			}, e.cells.forEach((function(t) {
				e.state.cellState || (e.state.cellState = {}), t.state = void 0 !== e.state.cellState[t.column.id] ? e.state.cellState[t.column.id] : u(t), t.setState = function(o) {
					return n.setCellState(e.id, t.column.id, o);
				};
			})));
		}
		xt.pluginName = "useRowState", l.resetColumnOrder = "resetColumnOrder", l.setColumnOrder = "setColumnOrder";
		var It = function(e) {
			e.stateReducers.push(Ft), e.visibleColumnsDeps.push((function(e, t) {
				var n = t.instance;
				return [].concat(e, [n.state.columnOrder]);
			})), e.visibleColumns.push(Gt), e.useInstance.push(At);
		};
		function Ft(e, t, n, o) {
			return t.type === l.init ? r({ columnOrder: [] }, e) : t.type === l.resetColumnOrder ? r({}, e, { columnOrder: o.initialState.columnOrder || [] }) : t.type === l.setColumnOrder ? r({}, e, { columnOrder: m(t.columnOrder, e.columnOrder) }) : void 0;
		}
		function Gt(e, t) {
			var n = t.instance.state.columnOrder;
			if (!n || !n.length) return e;
			for (var o = [].concat(n), r = [].concat(e), i = [], u = function() {
				var e = o.shift(), t = r.findIndex((function(t) {
					return t.id === e;
				}));
				t > -1 && i.push(r.splice(t, 1)[0]);
			}; r.length && o.length;) u();
			return [].concat(i, r);
		}
		function At(e) {
			var n = e.dispatch;
			e.setColumnOrder = t.useCallback((function(e) {
				return n({
					type: l.setColumnOrder,
					columnOrder: e
				});
			}), [n]);
		}
		It.pluginName = "useColumnOrder", c.canResize = !0, l.columnStartResizing = "columnStartResizing", l.columnResizing = "columnResizing", l.columnDoneResizing = "columnDoneResizing", l.resetResize = "resetResize";
		var kt = function(e) {
			e.getResizerProps = [Ht], e.getHeaderProps.push({ style: { position: "relative" } }), e.stateReducers.push(Wt), e.useInstance.push(Tt), e.useInstanceBeforeDimensions.push(zt);
		}, Ht = function(e, t) {
			var n = t.instance, o = t.header, r = n.dispatch, i = function(e, t) {
				var n = !1;
				if ("touchstart" === e.type) {
					if (e.touches && e.touches.length > 1) return;
					n = !0;
				}
				var o, i, u = function(e) {
					var t = [];
					return function e(n) {
						n.columns && n.columns.length && n.columns.map(e);
						t.push(n);
					}(e), t;
				}(t).map((function(e) {
					return [e.id, e.totalWidth];
				})), s = n ? Math.round(e.touches[0].clientX) : e.clientX, a = function() {
					window.cancelAnimationFrame(o), o = null, r({ type: l.columnDoneResizing });
				}, c = function() {
					window.cancelAnimationFrame(o), o = null, r({
						type: l.columnResizing,
						clientX: i
					});
				}, d = function(e) {
					i = e, o || (o = window.requestAnimationFrame(c));
				}, f = {
					mouse: {
						moveEvent: "mousemove",
						moveHandler: function(e) {
							return d(e.clientX);
						},
						upEvent: "mouseup",
						upHandler: function(e) {
							document.removeEventListener("mousemove", f.mouse.moveHandler), document.removeEventListener("mouseup", f.mouse.upHandler), a();
						}
					},
					touch: {
						moveEvent: "touchmove",
						moveHandler: function(e) {
							return e.cancelable && (e.preventDefault(), e.stopPropagation()), d(e.touches[0].clientX), !1;
						},
						upEvent: "touchend",
						upHandler: function(e) {
							document.removeEventListener(f.touch.moveEvent, f.touch.moveHandler), document.removeEventListener(f.touch.upEvent, f.touch.moveHandler), a();
						}
					}
				}, p = n ? f.touch : f.mouse, g = !!function() {
					if ("boolean" == typeof z) return z;
					var e = !1;
					try {
						var t = { get passive() {
							return e = !0, !1;
						} };
						window.addEventListener("test", null, t), window.removeEventListener("test", null, t);
					} catch (t) {
						e = !1;
					}
					return z = e;
				}() && { passive: !1 };
				document.addEventListener(p.moveEvent, p.moveHandler, g), document.addEventListener(p.upEvent, p.upHandler, g), r({
					type: l.columnStartResizing,
					columnId: t.id,
					columnWidth: t.totalWidth,
					headerIdWidths: u,
					clientX: s
				});
			};
			return [e, {
				onMouseDown: function(e) {
					return e.persist() || i(e, o);
				},
				onTouchStart: function(e) {
					return e.persist() || i(e, o);
				},
				style: { cursor: "col-resize" },
				draggable: !1,
				role: "separator"
			}];
		};
		function Wt(e, t) {
			if (t.type === l.init) return r({ columnResizing: { columnWidths: {} } }, e);
			if (t.type === l.resetResize) return r({}, e, { columnResizing: { columnWidths: {} } });
			if (t.type === l.columnStartResizing) {
				var n = t.clientX, o = t.columnId, i = t.columnWidth, u = t.headerIdWidths;
				return r({}, e, { columnResizing: r({}, e.columnResizing, {
					startX: n,
					headerIdWidths: u,
					columnWidth: i,
					isResizingColumn: o
				}) });
			}
			if (t.type === l.columnResizing) {
				var s = t.clientX, a = e.columnResizing, c = a.startX, d = a.columnWidth, f = a.headerIdWidths, p = (s - c) / d, g = {};
				return (void 0 === f ? [] : f).forEach((function(e) {
					var t = e[0], n = e[1];
					g[t] = Math.max(n + n * p, 0);
				})), r({}, e, { columnResizing: r({}, e.columnResizing, { columnWidths: r({}, e.columnResizing.columnWidths, {}, g) }) });
			}
			return t.type === l.columnDoneResizing ? r({}, e, { columnResizing: r({}, e.columnResizing, {
				startX: null,
				isResizingColumn: null
			}) }) : void 0;
		}
		kt.pluginName = "useResizeColumns";
		var zt = function(e) {
			var t = e.flatHeaders, n = e.disableResizing, o = e.getHooks, r = e.state.columnResizing, i = h(e);
			t.forEach((function(e) {
				var t = I(!0 !== e.disableResizing && void 0, !0 !== n && void 0, !0);
				e.canResize = t, e.width = r.columnWidths[e.id] || e.originalWidth || e.width, e.isResizing = r.isResizingColumn === e.id, t && (e.getResizerProps = f(o().getResizerProps, {
					instance: i(),
					header: e
				}));
			}));
		};
		function Tt(e) {
			var n = e.plugins, o = e.dispatch, r = e.autoResetResize, i = void 0 === r || r, u = e.columns;
			v(n, ["useAbsoluteLayout"], "useResizeColumns");
			var s = h(i);
			w((function() {
				s() && o({ type: l.resetResize });
			}), [u]);
			var a = t.useCallback((function() {
				return o({ type: l.resetResize });
			}), [o]);
			Object.assign(e, { resetResizing: a });
		}
		var Ot = {
			position: "absolute",
			top: 0
		}, Mt = function(e) {
			e.getTableBodyProps.push(jt), e.getRowProps.push(jt), e.getHeaderGroupProps.push(jt), e.getFooterGroupProps.push(jt), e.getHeaderProps.push((function(e, t) {
				var n = t.column;
				return [e, { style: r({}, Ot, {
					left: n.totalLeft + "px",
					width: n.totalWidth + "px"
				}) }];
			})), e.getCellProps.push((function(e, t) {
				var n = t.cell;
				return [e, { style: r({}, Ot, {
					left: n.column.totalLeft + "px",
					width: n.column.totalWidth + "px"
				}) }];
			})), e.getFooterProps.push((function(e, t) {
				var n = t.column;
				return [e, { style: r({}, Ot, {
					left: n.totalLeft + "px",
					width: n.totalWidth + "px"
				}) }];
			}));
		};
		Mt.pluginName = "useAbsoluteLayout";
		var jt = function(e, t) {
			return [e, { style: {
				position: "relative",
				width: t.instance.totalColumnsWidth + "px"
			} }];
		}, Lt = {
			display: "inline-block",
			boxSizing: "border-box"
		}, Nt = function(e, t) {
			return [e, { style: {
				display: "flex",
				width: t.instance.totalColumnsWidth + "px"
			} }];
		}, Dt = function(e) {
			e.getRowProps.push(Nt), e.getHeaderGroupProps.push(Nt), e.getFooterGroupProps.push(Nt), e.getHeaderProps.push((function(e, t) {
				var n = t.column;
				return [e, { style: r({}, Lt, { width: n.totalWidth + "px" }) }];
			})), e.getCellProps.push((function(e, t) {
				var n = t.cell;
				return [e, { style: r({}, Lt, { width: n.column.totalWidth + "px" }) }];
			})), e.getFooterProps.push((function(e, t) {
				var n = t.column;
				return [e, { style: r({}, Lt, { width: n.totalWidth + "px" }) }];
			}));
		};
		function Vt(e) {
			e.getTableProps.push(_t), e.getRowProps.push(Xt), e.getHeaderGroupProps.push(Xt), e.getFooterGroupProps.push(Xt), e.getHeaderProps.push(qt), e.getCellProps.push(Kt), e.getFooterProps.push(Ut);
		}
		Dt.pluginName = "useBlockLayout", Vt.pluginName = "useFlexLayout";
		var _t = function(e, t) {
			return [e, { style: { minWidth: t.instance.totalColumnsMinWidth + "px" } }];
		}, Xt = function(e, t) {
			return [e, { style: {
				display: "flex",
				flex: "1 0 auto",
				minWidth: t.instance.totalColumnsMinWidth + "px"
			} }];
		}, qt = function(e, t) {
			var n = t.column;
			return [e, { style: {
				boxSizing: "border-box",
				flex: n.totalFlexWidth ? n.totalFlexWidth + " 0 auto" : void 0,
				minWidth: n.totalMinWidth + "px",
				width: n.totalWidth + "px"
			} }];
		}, Kt = function(e, t) {
			var n = t.cell;
			return [e, { style: {
				boxSizing: "border-box",
				flex: n.column.totalFlexWidth + " 0 auto",
				minWidth: n.column.totalMinWidth + "px",
				width: n.column.totalWidth + "px"
			} }];
		}, Ut = function(e, t) {
			var n = t.column;
			return [e, { style: {
				boxSizing: "border-box",
				flex: n.totalFlexWidth ? n.totalFlexWidth + " 0 auto" : void 0,
				minWidth: n.totalMinWidth + "px",
				width: n.totalWidth + "px"
			} }];
		};
		function $t(e) {
			e.stateReducers.push(Zt), e.getTableProps.push(Jt), e.getHeaderProps.push(Yt), e.getRowProps.push(Qt);
		}
		l.columnStartResizing = "columnStartResizing", l.columnResizing = "columnResizing", l.columnDoneResizing = "columnDoneResizing", l.resetResize = "resetResize", $t.pluginName = "useGridLayout";
		var Jt = function(e, t) {
			var n = t.instance;
			return [e, { style: {
				display: "grid",
				gridTemplateColumns: n.visibleColumns.map((function(e) {
					var t;
					return n.state.gridLayout.columnWidths[e.id] ? n.state.gridLayout.columnWidths[e.id] + "px" : (null == (t = n.state.columnResizing) ? void 0 : t.isResizingColumn) ? n.state.gridLayout.startWidths[e.id] + "px" : "number" == typeof e.width ? e.width + "px" : e.width;
				})).join(" ")
			} }];
		}, Yt = function(e, t) {
			var n = t.column;
			return [e, {
				id: "header-cell-" + n.id,
				style: {
					position: "sticky",
					gridColumn: "span " + n.totalVisibleHeaderCount
				}
			}];
		}, Qt = function(e, t) {
			var n = t.row;
			return n.isExpanded ? [e, { style: { gridColumn: "1 / " + (n.cells.length + 1) } }] : [e, {}];
		};
		function Zt(e, t, n, o) {
			if (t.type === l.init) return r({ gridLayout: { columnWidths: {} } }, e);
			if (t.type === l.resetResize) return r({}, e, { gridLayout: { columnWidths: {} } });
			if (t.type === l.columnStartResizing) {
				var i = t.columnId, u = t.headerIdWidths, s = en(i);
				if (void 0 !== s) {
					var a = o.visibleColumns.reduce((function(e, t) {
						var n;
						return r({}, e, ((n = {})[t.id] = en(t.id), n));
					}), {}), c = o.visibleColumns.reduce((function(e, t) {
						var n;
						return r({}, e, ((n = {})[t.id] = t.minWidth, n));
					}), {}), d = o.visibleColumns.reduce((function(e, t) {
						var n;
						return r({}, e, ((n = {})[t.id] = t.maxWidth, n));
					}), {}), f = u.map((function(e) {
						var t = e[0];
						return [t, en(t)];
					}));
					return r({}, e, { gridLayout: r({}, e.gridLayout, {
						startWidths: a,
						minWidths: c,
						maxWidths: d,
						headerIdGridWidths: f,
						columnWidth: s
					}) });
				}
				return e;
			}
			if (t.type === l.columnResizing) {
				var p = t.clientX, g = e.columnResizing.startX, v = e.gridLayout, m = v.columnWidth, h = v.minWidths, y = v.maxWidths, w = v.headerIdGridWidths, R = (p - g) / m, b = {};
				return (void 0 === w ? [] : w).forEach((function(e) {
					var t = e[0], n = e[1];
					b[t] = Math.min(Math.max(h[t], n + n * R), y[t]);
				})), r({}, e, { gridLayout: r({}, e.gridLayout, { columnWidths: r({}, e.gridLayout.columnWidths, {}, b) }) });
			}
			return t.type === l.columnDoneResizing ? r({}, e, { gridLayout: r({}, e.gridLayout, {
				startWidths: {},
				minWidths: {},
				maxWidths: {}
			}) }) : void 0;
		}
		function en(e) {
			var t, n = null == (t = document.getElementById("header-cell-" + e)) ? void 0 : t.offsetWidth;
			if (void 0 !== n) return n;
		}
		e._UNSTABLE_usePivotColumns = nt, e.actions = l, e.defaultColumn = c, e.defaultGroupByFn = De, e.defaultOrderByFn = Qe, e.defaultRenderer = s, e.emptyRenderer = a, e.ensurePluginOrder = v, e.flexRender = b, e.functionalUpdate = m, e.loopHooks = g, e.makePropGetter = f, e.makeRenderer = R, e.reduceHooks = p, e.safeUseLayoutEffect = y, e.useAbsoluteLayout = Mt, e.useAsyncDebounce = function(e, n) {
			void 0 === n && (n = 0);
			var r = t.useRef({}), i = h(e), u = h(n);
			return t.useCallback(function() {
				var e = o(regeneratorRuntime.mark((function e() {
					var t, n, l, s = arguments;
					return regeneratorRuntime.wrap((function(e) {
						for (;;) switch (e.prev = e.next) {
							case 0:
								for (t = s.length, n = new Array(t), l = 0; l < t; l++) n[l] = s[l];
								return r.current.promise || (r.current.promise = new Promise((function(e, t) {
									r.current.resolve = e, r.current.reject = t;
								}))), r.current.timeout && clearTimeout(r.current.timeout), r.current.timeout = setTimeout(o(regeneratorRuntime.mark((function e() {
									return regeneratorRuntime.wrap((function(e) {
										for (;;) switch (e.prev = e.next) {
											case 0: return delete r.current.timeout, e.prev = 1, e.t0 = r.current, e.next = 5, i().apply(void 0, n);
											case 5:
												e.t1 = e.sent, e.t0.resolve.call(e.t0, e.t1), e.next = 12;
												break;
											case 9: e.prev = 9, e.t2 = e.catch(1), r.current.reject(e.t2);
											case 12: return e.prev = 12, delete r.current.promise, e.finish(12);
											case 15:
											case "end": return e.stop();
										}
									}), e, null, [[
										1,
										9,
										12,
										15
									]]);
								}))), u()), e.abrupt("return", r.current.promise);
							case 5:
							case "end": return e.stop();
						}
					}), e);
				})));
				return function() {
					return e.apply(this, arguments);
				};
			}(), [i, u]);
		}, e.useBlockLayout = Dt, e.useColumnOrder = It, e.useExpanded = se, e.useFilters = Pe, e.useFlexLayout = Vt, e.useGetLatest = h, e.useGlobalFilter = Ie, e.useGridLayout = $t, e.useGroupBy = ze, e.useMountedLayoutEffect = w, e.usePagination = Ze, e.useResizeColumns = kt, e.useRowSelect = vt, e.useRowState = xt, e.useSortBy = Ue, e.useTable = function(e) {
			for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) o[i - 1] = arguments[i];
			e = ie(e), o = [K].concat(o);
			var s = h(t.useRef({}).current);
			Object.assign(s(), r({}, e, {
				plugins: o,
				hooks: q()
			})), o.filter(Boolean).forEach((function(e) {
				e(s().hooks);
			}));
			var a = h(s().hooks);
			s().getHooks = a, delete s().hooks, Object.assign(s(), p(a().useOptions, ie(e)));
			var c = s(), d = c.data, v = c.columns, m = c.initialState, y = c.defaultColumn, w = c.getSubRows, b = c.getRowId, E = c.stateReducer, I = c.useControlledState, F = h(E), G = t.useCallback((function(e, t) {
				if (!t.type) throw console.info({ action: t }), /* @__PURE__ */ new Error("Unknown Action 👆");
				return [].concat(a().stateReducers, Array.isArray(F()) ? F() : [F()]).reduce((function(n, o) {
					return o(n, t, e, s()) || n;
				}), e);
			}), [
				a,
				F,
				s
			]), A = t.useReducer(G, void 0, (function() {
				return G(m, { type: l.init });
			})), k = A[0], H = A[1], W = p([].concat(a().useControlledState, [I]), k, { instance: s() });
			Object.assign(s(), {
				state: W,
				dispatch: H
			});
			var z = t.useMemo((function() {
				return S(p(a().columns, v, { instance: s() }));
			}), [
				a,
				s,
				v
			].concat(p(a().columnsDeps, [], { instance: s() })));
			s().columns = z;
			var T = t.useMemo((function() {
				return p(a().allColumns, C(z), { instance: s() }).map(x);
			}), [
				z,
				a,
				s
			].concat(p(a().allColumnsDeps, [], { instance: s() })));
			s().allColumns = T;
			var O = t.useMemo((function() {
				for (var e = [], t = [], n = {}, o = [].concat(T); o.length;) le({
					data: d,
					rows: e,
					flatRows: t,
					rowsById: n,
					column: o.shift(),
					getRowId: b,
					getSubRows: w,
					accessValueHooks: a().accessValue,
					getInstance: s
				});
				return [
					e,
					t,
					n
				];
			}), [
				T,
				d,
				b,
				w,
				a,
				s
			]), M = O[0], j = O[1], L = O[2];
			Object.assign(s(), {
				rows: M,
				initialRows: [].concat(M),
				flatRows: j,
				rowsById: L
			}), g(a().useInstanceAfterData, s());
			var N = t.useMemo((function() {
				return p(a().visibleColumns, T, { instance: s() }).map((function(e) {
					return P(e, y);
				}));
			}), [
				a,
				T,
				s,
				y
			].concat(p(a().visibleColumnsDeps, [], { instance: s() })));
			T = t.useMemo((function() {
				var e = [].concat(N);
				return T.forEach((function(t) {
					e.find((function(e) {
						return e.id === t.id;
					})) || e.push(t);
				})), e;
			}), [T, N]), s().allColumns = T;
			var D = t.useMemo((function() {
				return p(a().headerGroups, B(N, y), s());
			}), [
				a,
				N,
				y,
				s
			].concat(p(a().headerGroupsDeps, [], { instance: s() })));
			s().headerGroups = D;
			var V = t.useMemo((function() {
				return D.length ? D[0].headers : [];
			}), [D]);
			s().headers = V, s().flatHeaders = D.reduce((function(e, t) {
				return [].concat(e, t.headers);
			}), []), g(a().useInstanceBeforeDimensions, s());
			var _ = N.filter((function(e) {
				return e.isVisible;
			})).map((function(e) {
				return e.id;
			})).sort().join("_");
			N = t.useMemo((function() {
				return N.filter((function(e) {
					return e.isVisible;
				}));
			}), [N, _]), s().visibleColumns = N;
			var X = ue(V), U = X[0], $ = X[1], J = X[2];
			return s().totalColumnsMinWidth = U, s().totalColumnsWidth = $, s().totalColumnsMaxWidth = J, g(a().useInstance, s()), [].concat(s().flatHeaders, s().allColumns).forEach((function(e) {
				e.render = R(s(), e), e.getHeaderProps = f(a().getHeaderProps, {
					instance: s(),
					column: e
				}), e.getFooterProps = f(a().getFooterProps, {
					instance: s(),
					column: e
				});
			})), s().headerGroups = t.useMemo((function() {
				return D.filter((function(e, t) {
					return e.headers = e.headers.filter((function(e) {
						return e.headers ? function e(t) {
							return t.filter((function(t) {
								return t.headers ? e(t.headers) : t.isVisible;
							})).length;
						}(e.headers) : e.isVisible;
					})), !!e.headers.length && (e.getHeaderGroupProps = f(a().getHeaderGroupProps, {
						instance: s(),
						headerGroup: e,
						index: t
					}), e.getFooterGroupProps = f(a().getFooterGroupProps, {
						instance: s(),
						headerGroup: e,
						index: t
					}), !0);
				}));
			}), [
				D,
				s,
				a
			]), s().footerGroups = [].concat(s().headerGroups).reverse(), s().prepareRow = t.useCallback((function(e) {
				e.getRowProps = f(a().getRowProps, {
					instance: s(),
					row: e
				}), e.allCells = T.map((function(t) {
					var n = e.values[t.id], o = {
						column: t,
						row: e,
						value: n
					};
					return o.getCellProps = f(a().getCellProps, {
						instance: s(),
						cell: o
					}), o.render = R(s(), t, {
						row: e,
						cell: o,
						value: n
					}), o;
				})), e.cells = N.map((function(t) {
					return e.allCells.find((function(e) {
						return e.column.id === t.id;
					}));
				})), g(a().prepareRow, e, { instance: s() });
			}), [
				a,
				s,
				T,
				N
			]), s().getTableProps = f(a().getTableProps, { instance: s() }), s().getTableBodyProps = f(a().getTableBodyProps, { instance: s() }), g(a().useFinalInstance, s()), s();
		}, Object.defineProperty(e, "__esModule", { value: !0 });
	}));
}));
//#endregion
//#region ../../node_modules/.pnpm/react-table@7.8.0_react@19.2.5/node_modules/react-table/index.js
var require_react_table = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_table_production_min();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/utils.js
var import_react$65, getCellStyle, getStickyStyle, getSubRowStyle, TableInstanceContext;
function init_utils() {
	return (init_utils = __esmMin((() => {
		import_react$65 = /* @__PURE__ */ __toESM(require_react(), 1);
		getCellStyle = (column, isTableResizing) => {
			let style = {};
			style.flex = "1 1 145px";
			if (column.width) {
				let width = "string" == typeof column.width ? column.width : `${column.width}px`;
				style.width = width;
				if (isTableResizing && column.canResize) style.flex = `${Number(column.width)} ${Number(column.width)} ${width}`;
				else style.flex = `0 0 ${width}`;
			}
			if (column.maxWidth) style.maxWidth = `${column.maxWidth}px`;
			if (column.minWidth) style.minWidth = `${column.minWidth}px`;
			return style;
		};
		getStickyStyle = (column, columnList) => {
			if (!column.sticky) return {};
			let left = 0;
			for (let col of columnList) {
				if (col.id === column.id) break;
				left += Number(col.width || col.resizeWidth || 0);
			}
			let right = 0;
			for (let col of [...columnList].reverse()) {
				if (col.id === column.id) break;
				right += Number(col.width || col.resizeWidth || 0);
			}
			return {
				"--iui-table-sticky-left": "left" === column.sticky ? `${left}px` : void 0,
				"--iui-table-sticky-right": "right" === column.sticky ? `${right}px` : void 0
			};
		};
		getSubRowStyle = ({ density = "default", depth = 1 }) => {
			let cellPadding = 16;
			let expanderMargin = 8;
			if ("condensed" === density) {
				cellPadding = 12;
				expanderMargin = 4;
			} else if ("extra-condensed" === density) {
				cellPadding = 8;
				expanderMargin = 4;
			}
			let multiplier = 26 + expanderMargin;
			return { paddingInlineStart: cellPadding + depth * multiplier };
		};
		TableInstanceContext = import_react$65.createContext(void 0);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/SubRowExpander.js
var import_react$64, SubRowExpander;
function init_SubRowExpander() {
	return (init_SubRowExpander = __esmMin((() => {
		import_react$64 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_SvgChevronRightSmall();
		init_IconButton();
		SubRowExpander = (props) => {
			let { cell, isDisabled, cellProps, expanderCell, density, ...rest } = props;
			return import_react$64.createElement(import_react$64.Fragment, null, expanderCell ? expanderCell(cellProps) : import_react$64.createElement(IconButton, {
				"aria-label": "Toggle sub row",
				"aria-expanded": cell.row.isExpanded ? "true" : "false",
				style: { marginInlineEnd: "default" === density || void 0 === density ? 8 : 4 },
				className: "iui-table-row-expander",
				styleType: "borderless",
				size: "small",
				onClick: (e) => {
					e.stopPropagation();
					cell.row.toggleRowExpanded();
				},
				disabled: isDisabled,
				...rest
			}, import_react$64.createElement(SvgChevronRightSmall, { style: { transform: cell.row.isExpanded ? "rotate(90deg)" : void 0 } })));
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/cells/DefaultCell.js
var import_react$63, import_react_table$4, import_classnames$7, DefaultCellContext, DefaultCell;
function init_DefaultCell() {
	return (init_DefaultCell = __esmMin((() => {
		import_react$63 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_react_table$4 = require_react_table();
		import_classnames$7 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box();
		init_utils();
		DefaultCellContext = import_react$63.createContext({});
		DefaultCell = (props) => {
			let instance = import_react$63.useContext(TableInstanceContext);
			let isCustomCell = import_react$63.useMemo(() => instance?.columns.find(({ id }) => props.cellProps.column.id === id)?.Cell !== import_react_table$4.defaultColumn.Cell, [instance, props.cellProps.column.id]);
			let defaultCellContext = import_react$63.useContext(DefaultCellContext);
			let isCellRendererChildrenCustom = defaultCellContext.children !== props.children;
			let isDefaultTextCell = "string" == typeof props.cellProps.value && !isCustomCell && !isCellRendererChildrenCustom;
			let { cellElementProps: { className: cellElementClassName, style: cellElementStyle, ...cellElementProps }, children, startIcon, endIcon, cellProps, isDisabled, className, style, status, text = isDefaultTextCell ? cellProps.value : void 0, clamp = !!text, ...rest } = props;
			let { key: cellElementKey, ...cellElementPropsRest } = cellElementProps;
			let decorations = {
				start: startIcon ? import_react$63.createElement(Box, {
					className: "iui-table-cell-start-icon",
					key: `${cellElementKey}-start`
				}, startIcon) : null,
				end: endIcon ? import_react$63.createElement(Box, {
					className: "iui-table-cell-end-icon",
					key: `${cellElementKey}-end`
				}, endIcon) : null
			};
			return import_react$63.createElement(Box, {
				...cellElementPropsRest,
				key: cellElementKey,
				...rest,
				className: (0, import_classnames$7.default)(cellElementClassName, className),
				"aria-disabled": isDisabled?.(cellProps.row.original) || void 0,
				"data-iui-status": status,
				style: {
					...cellElementStyle,
					...style
				}
			}, (() => {
				if (text) return import_react$63.createElement(import_react$63.Fragment, null, decorations.start, defaultCellContext.expander, import_react$63.createElement(Box, {
					className: "iui-table-cell-default-content",
					onClick: (e) => e.stopPropagation()
				}, clamp ? import_react$63.createElement(Box, { className: "iui-line-clamp" }, text) : text), decorations.end, defaultCellContext.shadows);
				return import_react$63.createElement(import_react$63.Fragment, null, decorations.start, children, decorations.end);
			})());
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/columns/selectionColumn.js
var import_react$62, SELECTION_CELL_ID, SelectionColumn;
function init_selectionColumn() {
	return (init_selectionColumn = __esmMin((() => {
		import_react$62 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Checkbox();
		init_DefaultCell();
		init_Table();
		SELECTION_CELL_ID = "iui-table-checkbox-selector";
		SelectionColumn = (props = {}) => {
			let { isDisabled, density } = props;
			let densityWidth = "condensed" === density ? 42 : "extra-condensed" === density ? 34 : 48;
			return {
				id: SELECTION_CELL_ID,
				disableResizing: true,
				disableGroupBy: true,
				disableReordering: true,
				minWidth: densityWidth,
				width: densityWidth,
				maxWidth: densityWidth,
				columnClassName: "iui-slot",
				cellClassName: "iui-slot",
				Header: ({ getToggleAllRowsSelectedProps, toggleAllRowsSelected, rows, preFilteredFlatRows, state }) => {
					let disabled = preFilteredFlatRows.every((row) => isDisabled?.(row.original));
					let checked = preFilteredFlatRows.every((row) => state.selectedRowIds[row.id] || isDisabled?.(row.original));
					let indeterminate = !checked && Object.keys(state.selectedRowIds).length > 0 && Object.values(state.selectedRowIds).some((v) => true === v);
					let nextToggleState = !rows.some((row) => row.isSelected);
					return import_react$62.createElement(Checkbox, {
						...getToggleAllRowsSelectedProps(),
						style: {},
						title: "",
						checked: checked && !disabled,
						indeterminate,
						disabled,
						"aria-label": `${nextToggleState ? "Select" : "Deselect"} all rows`,
						onChange: () => toggleAllRowsSelected(nextToggleState)
					});
				},
				Cell: ({ row, selectSubRows = true }) => import_react$62.createElement(Checkbox, {
					...row.getToggleRowSelectedProps(),
					style: {},
					title: "",
					disabled: isDisabled?.(row.original),
					onClick: (e) => e.stopPropagation(),
					"aria-label": `${row.isSelected ? "Deselect" : "Select"} row`,
					onChange: () => {
						if (row.subRows.length > 0 && selectSubRows && void 0 === row.initialSubRows[0].original[iuiId]) row.toggleRowSelected(!row.subRows.every((subRow) => subRow.isSelected || isDisabled?.(subRow.original)));
						else row.toggleRowSelected(!row.isSelected);
					}
				}),
				cellRenderer: (props) => import_react$62.createElement(DefaultCell, {
					...props,
					isDisabled: (rowData) => !!isDisabled?.(rowData)
				})
			};
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/columns/expanderColumn.js
var import_react$61, EXPANDER_CELL_ID, ExpanderColumn;
function init_expanderColumn() {
	return (init_expanderColumn = __esmMin((() => {
		import_react$61 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_SvgChevronRightSmall();
		init_IconButton();
		init_DefaultCell();
		EXPANDER_CELL_ID = "iui-table-expander";
		ExpanderColumn = (props = {}) => {
			let { subComponent, isDisabled } = props;
			return {
				id: EXPANDER_CELL_ID,
				disableResizing: true,
				disableGroupBy: true,
				disableReordering: true,
				minWidth: 48,
				width: 48,
				maxWidth: 48,
				columnClassName: "iui-slot",
				cellClassName: "iui-slot",
				Cell: (props) => {
					let { row } = props;
					if (!subComponent?.(row)) return null;
					return import_react$61.createElement(IconButton, {
						"aria-label": "Toggle expandable content",
						className: "iui-table-row-expander",
						styleType: "borderless",
						size: "small",
						onClick: (e) => {
							e.stopPropagation();
							row.toggleRowExpanded();
						},
						disabled: isDisabled?.(props.row.original),
						"aria-expanded": row.isExpanded
					}, import_react$61.createElement(SvgChevronRightSmall, null));
				},
				cellRenderer: (props) => import_react$61.createElement(DefaultCell, {
					...props,
					isDisabled: (rowData) => !!isDisabled?.(rowData)
				})
			};
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/TableCell.js
var import_react$60, import_classnames$6, TableCell;
function init_TableCell() {
	return (init_TableCell = __esmMin((() => {
		import_react$60 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$6 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_utils();
		init_SubRowExpander();
		init_selectionColumn();
		init_DefaultCell();
		init_Box();
		TableCell = (props) => {
			let { cell, cellIndex, isDisabled, tableHasSubRows, tableInstance, expanderCell, density } = props;
			let hasSubRowExpander = cellIndex === cell.row.cells.findIndex((c) => c.column.id !== SELECTION_CELL_ID);
			let cellElementProps = cell.getCellProps({
				className: (0, import_classnames$6.default)("iui-table-cell", cell.column.cellClassName, { "iui-table-cell-sticky": !!cell.column.sticky }),
				style: {
					...getCellStyle(cell.column, !!tableInstance.state.isTableResizing),
					...tableHasSubRows && hasSubRowExpander && getSubRowStyle({
						density,
						depth: cell.row.depth + (cell.row.canExpand ? 0 : 1)
					}),
					...getStickyStyle(cell.column, tableInstance.visibleColumns)
				}
			});
			let cellProps = import_react$60.useMemo(() => ({
				...tableInstance,
				cell,
				row: cell.row,
				value: cell.value,
				column: cell.column
			}), [cell, tableInstance]);
			let expander = import_react$60.useMemo(() => tableHasSubRows && hasSubRowExpander && cell.row.canExpand ? import_react$60.createElement(SubRowExpander, {
				cell,
				isDisabled,
				cellProps,
				expanderCell,
				density,
				slot: "start"
			}) : null, [
				cell,
				cellProps,
				density,
				expanderCell,
				hasSubRowExpander,
				isDisabled,
				tableHasSubRows
			]);
			let cellContent = import_react$60.useMemo(() => cell.render("Cell"), [cell]);
			let shadows = import_react$60.useMemo(() => import_react$60.createElement(import_react$60.Fragment, null, "left" === cell.column.sticky && tableInstance.state.sticky.isScrolledToRight && import_react$60.createElement(Box, { className: "iui-table-cell-shadow-right" }), "right" === cell.column.sticky && tableInstance.state.sticky.isScrolledToLeft && import_react$60.createElement(Box, { className: "iui-table-cell-shadow-left" })), [
				cell.column.sticky,
				tableInstance.state.sticky.isScrolledToLeft,
				tableInstance.state.sticky.isScrolledToRight
			]);
			let defaultCellRendererChildren = import_react$60.useMemo(() => import_react$60.createElement(import_react$60.Fragment, null, expander, cellContent, shadows), [
				cellContent,
				expander,
				shadows
			]);
			let cellRendererProps = import_react$60.useMemo(() => ({
				cellElementProps,
				cellProps,
				children: defaultCellRendererChildren
			}), [
				cellElementProps,
				cellProps,
				defaultCellRendererChildren
			]);
			return import_react$60.createElement(import_react$60.Fragment, null, import_react$60.createElement(DefaultCellContext.Provider, { value: import_react$60.useMemo(() => ({
				children: defaultCellRendererChildren,
				expander,
				shadows
			}), [
				defaultCellRendererChildren,
				expander,
				shadows
			]) }, cell.column.cellRenderer ? cell.column.cellRenderer({
				...cellRendererProps,
				isDisabled: () => isDisabled
			}) : import_react$60.createElement(DefaultCell, {
				...cellRendererProps,
				isDisabled: () => isDisabled
			})));
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/TableRowMemoized.js
var import_react$59, import_classnames$5, TableRow, hasAnySelectedSubRow, TableRowMemoized;
function init_TableRowMemoized() {
	return (init_TableRowMemoized = __esmMin((() => {
		import_react$59 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$5 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_Box(), init_useIntersection(), init_useMergedRefs();
		init_TableCell();
		TableRow = (props) => {
			let { row, rowProps, isLast, onRowInViewport, onBottomReached, intersectionMargin, onClick, subComponent, isDisabled, tableHasSubRows, tableInstance, expanderCell, scrollContainerRef, tableRowRef, density, virtualItem, virtualizer } = props;
			let onIntersect = import_react$59.useCallback(() => {
				onRowInViewport.current?.(row.original);
				isLast && onBottomReached.current?.();
			}, [
				isLast,
				onBottomReached,
				onRowInViewport,
				row.original
			]);
			let intersectionRoot = import_react$59.useMemo(() => {
				if ((scrollContainerRef?.scrollHeight ?? 0) > (scrollContainerRef?.offsetHeight ?? 0)) return scrollContainerRef;
			}, [scrollContainerRef]);
			let intersectionRef = useIntersection(onIntersect, {
				rootMargin: `${intersectionMargin}px`,
				root: intersectionRoot
			});
			let userRowProps = rowProps?.(row) ?? {};
			let { status, isLoading, ...restUserRowProps } = userRowProps;
			let mergedProps = {
				...row.getRowProps({ style: {
					flex: "0 0 auto",
					minWidth: "100%",
					...null != virtualItem ? { transform: `translateY(${virtualItem.start}px)` } : {}
				} }),
				...restUserRowProps,
				className: (0, import_classnames$5.default)("iui-table-row", {
					"iui-table-row-expanded": row.isExpanded && subComponent,
					"iui-loading": isLoading
				}, userRowProps?.className),
				"aria-selected": row.isSelected || void 0,
				"aria-disabled": isDisabled || void 0,
				"data-iui-status": status,
				"data-iui-index": virtualItem?.index,
				...null != virtualItem && { "data-iui-virtualizer": "item" }
			};
			let refs = useMergedRefs(intersectionRef, mergedProps.ref, tableRowRef, virtualizer?.measureElement);
			return import_react$59.createElement(import_react$59.Fragment, null, import_react$59.createElement(Box, {
				...mergedProps,
				key: mergedProps.key,
				ref: refs,
				onClick: (event) => {
					mergedProps?.onClick?.(event);
					onClick?.(event, row);
				}
			}, row.cells.map((cell, index) => import_react$59.createElement(TableCell, {
				key: cell.getCellProps().key,
				cell,
				cellIndex: index,
				isDisabled,
				tableHasSubRows,
				tableInstance,
				expanderCell,
				density
			}))));
		};
		hasAnySelectedSubRow = (row, selectedRowIds) => {
			if (selectedRowIds?.[row.id]) return true;
			return row.subRows.some((subRow) => hasAnySelectedSubRow(subRow, selectedRowIds));
		};
		TableRowMemoized = import_react$59.memo(TableRow, (prevProp, nextProp) => prevProp.isLast === nextProp.isLast && prevProp.state.hiddenColumns?.length === nextProp.state.hiddenColumns?.length && !!prevProp.state.hiddenColumns?.every((column, index) => nextProp.state.hiddenColumns?.[index] === column) && prevProp.onRowInViewport === nextProp.onRowInViewport && prevProp.onBottomReached === nextProp.onBottomReached && prevProp.onClick === nextProp.onClick && prevProp.row.original === nextProp.row.original && prevProp.state.selectedRowIds?.[prevProp.row.id] === nextProp.state.selectedRowIds?.[nextProp.row.id] && prevProp.row.subRows.some((subRow) => hasAnySelectedSubRow(subRow, prevProp.state.selectedRowIds)) === nextProp.row.subRows.some((subRow) => hasAnySelectedSubRow(subRow, nextProp.state.selectedRowIds)) && prevProp.state.expanded?.[prevProp.row.id] === nextProp.state.expanded?.[nextProp.row.id] && prevProp.subComponent === nextProp.subComponent && prevProp.row.cells.every((cell, index) => nextProp.row.cells[index].column === cell.column) && prevProp.isDisabled === nextProp.isDisabled && prevProp.rowProps === nextProp.rowProps && prevProp.expanderCell === nextProp.expanderCell && prevProp.tableHasSubRows === nextProp.tableHasSubRows && prevProp.scrollContainerRef === nextProp.scrollContainerRef && prevProp.state.columnOrder === nextProp.state.columnOrder && !nextProp.state.columnResizing.isResizingColumn && prevProp.state.isTableResizing === nextProp.state.isTableResizing && prevProp.state.sticky.isScrolledToLeft === nextProp.state.sticky.isScrolledToLeft && prevProp.state.sticky.isScrolledToRight === nextProp.state.sticky.isScrolledToRight && prevProp.density === nextProp.density && prevProp.virtualizer === nextProp.virtualizer && prevProp.virtualItem?.index === nextProp.virtualItem?.index && prevProp.virtualItem?.start === nextProp.virtualItem?.start);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/filters/customFilterFunctions.js
var isValidDate, betweenDate, customFilterFunctions;
function init_customFilterFunctions() {
	return (init_customFilterFunctions = __esmMin((() => {
		isValidDate = (date) => !!date && !isNaN(date.valueOf());
		betweenDate = (rows, ids, filterValue) => {
			let [min, max] = filterValue || [];
			let MAX_DATE_VALUE = 864e13;
			let minValue = isValidDate(min) ? min : /* @__PURE__ */ new Date(-864e13);
			let maxValue = isValidDate(max) ? max : /* @__PURE__ */ new Date(MAX_DATE_VALUE);
			return rows.filter((row) => ids.some((id) => {
				let rowValue = row.values[id];
				return rowValue.valueOf() >= minValue.valueOf() && rowValue.valueOf() <= maxValue.valueOf();
			}));
		};
		betweenDate.autoRemove = (val) => !val || !isValidDate(val[0]) && !isValidDate(val[1]);
		customFilterFunctions = { betweenDate };
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useExpanderCell.js
var import_react$58, useExpanderCell;
function init_useExpanderCell() {
	return (init_useExpanderCell = __esmMin((() => {
		import_react$58 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_expanderColumn();
		useExpanderCell = (subComponent, expanderCell, isRowDisabled) => (hooks) => {
			if (!subComponent) return;
			hooks.allColumns.push((columns) => {
				if (columns.find((c) => c.id === "iui-table-expander")) return columns;
				let expanderColumn = ExpanderColumn({
					subComponent,
					isDisabled: isRowDisabled
				});
				return [{
					...expanderColumn,
					Cell: expanderCell ? (cellProps) => import_react$58.createElement(import_react$58.Fragment, null, expanderCell(cellProps)) : expanderColumn.Cell
				}, ...columns];
			});
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useSelectionCell.js
var useSelectionCell;
function init_useSelectionCell() {
	return (init_useSelectionCell = __esmMin((() => {
		init_selectionColumn();
		useSelectionCell = (isSelectable, selectionMode, isRowDisabled, density = "default") => (hooks) => {
			if (!isSelectable) return;
			hooks.allColumns.push((columns) => "single" === selectionMode || columns.find((c) => c.id === "iui-table-checkbox-selector") ? columns : [SelectionColumn({
				isDisabled: isRowDisabled,
				density
			}), ...columns]);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/filters/defaultFilterFunctions.js
var text, exactText, exactTextCase, includes, includesAll, includesSome, includesValue, exact, equals, between, defaultFilterFunctions;
function init_defaultFilterFunctions() {
	return (init_defaultFilterFunctions = __esmMin((() => {
		text = (rows, ids, filterValue) => {
			rows = rows.filter((row) => ids.some((id) => {
				let rowValue = row.values[id];
				return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
			}));
			return rows;
		};
		text.autoRemove = (val) => !val;
		exactText = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
			let rowValue = row.values[id];
			return void 0 !== rowValue ? String(rowValue).toLowerCase() === String(filterValue).toLowerCase() : true;
		}));
		exactText.autoRemove = (val) => !val;
		exactTextCase = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
			let rowValue = row.values[id];
			return void 0 !== rowValue ? String(rowValue) === String(filterValue) : true;
		}));
		exactTextCase.autoRemove = (val) => !val;
		includes = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
			return row.values[id].includes(filterValue);
		}));
		includes.autoRemove = (val) => !val || !val.length;
		includesAll = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
			let rowValue = row.values[id];
			return rowValue && rowValue.length && filterValue.every((val) => rowValue.includes(val));
		}));
		includesAll.autoRemove = (val) => !val || !val.length;
		includesSome = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
			let rowValue = row.values[id];
			return rowValue && rowValue.length && filterValue.some((val) => rowValue.includes(val));
		}));
		includesSome.autoRemove = (val) => !val || !val.length;
		includesValue = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
			let rowValue = row.values[id];
			return filterValue.includes(rowValue);
		}));
		includesValue.autoRemove = (val) => !val || !val.length;
		exact = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
			return row.values[id] === filterValue;
		}));
		exact.autoRemove = (val) => void 0 === val;
		equals = (rows, ids, filterValue) => rows.filter((row) => ids.some((id) => {
			return row.values[id] == filterValue;
		}));
		equals.autoRemove = (val) => null == val;
		between = (rows, ids, filterValue) => {
			let [min, max] = filterValue || [];
			min = "number" == typeof min ? min : -1 / 0;
			max = "number" == typeof max ? max : 1 / 0;
			if (min > max) {
				let temp = min;
				min = max;
				max = temp;
			}
			return rows.filter((row) => ids.some((id) => {
				let rowValue = row.values[id];
				return rowValue >= min && rowValue <= max;
			}));
		};
		between.autoRemove = (val) => !val || "number" != typeof val[0] && "number" != typeof val[1];
		defaultFilterFunctions = {
			text,
			exactText,
			exactTextCase,
			includes,
			includesAll,
			includesSome,
			includesValue,
			between
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useSubRowFiltering.js
var import_react$57, useSubRowFiltering, useInstance$3, handleRowFiltering;
function init_useSubRowFiltering() {
	return (init_useSubRowFiltering = __esmMin((() => {
		import_react$57 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_defaultFilterFunctions();
		useSubRowFiltering = (hasAnySubRows) => (hooks) => {
			hooks.useInstance.push(useInstance$3.bind({}, hasAnySubRows));
		};
		useInstance$3 = (hasAnySubRows, instance) => {
			let setInitialSubRows = (rows) => {
				rows.forEach((row) => {
					if (!row.initialSubRows) row.initialSubRows = row.subRows;
					setInitialSubRows(row.subRows);
				});
			};
			setInitialSubRows(instance.initialRows);
			let { filteredRows = instance.filteredRows, filteredFlatRows = instance.filteredFlatRows, filteredRowsById = instance.filteredRowsById } = import_react$57.useMemo(() => {
				if (!hasAnySubRows) return {};
				let setSubRows = (rows) => {
					rows.forEach((row) => {
						row.subRows = row.initialSubRows ?? [];
						setSubRows(row.subRows);
					});
				};
				setSubRows(instance.initialRows);
				let currentlyFilteredRows = [...instance.initialRows];
				instance.state.filters.forEach(({ id: columnId, value: filterValue }) => {
					let column = instance.allColumns.find((c) => c.id === columnId);
					if (!column) return;
					let filterTypes = {
						...defaultFilterFunctions,
						...instance.filterTypes
					};
					let filterFn = "function" == typeof column.filter ? column.filter : filterTypes[column.filter ?? "text"];
					currentlyFilteredRows = currentlyFilteredRows.filter((row) => handleRowFiltering(row, filterFn, columnId, filterValue));
				});
				let filteredRows = [];
				let filteredFlatRows = [];
				let filteredRowsById = {};
				let populateRows = (row) => {
					if (0 === row.depth) filteredRows.push(row);
					filteredFlatRows.push(row);
					filteredRowsById[row.id] = row;
					if (row.subRows.length) row.subRows.forEach((r) => populateRows(r));
				};
				currentlyFilteredRows.forEach((row) => populateRows(row));
				return {
					filteredRows,
					filteredFlatRows,
					filteredRowsById
				};
			}, [
				instance.allColumns,
				instance.filterTypes,
				instance.initialRows,
				instance.state.filters,
				hasAnySubRows
			]);
			Object.assign(instance, {
				filteredRows,
				filteredFlatRows,
				filteredRowsById,
				rows: filteredRows,
				flatRows: filteredFlatRows,
				rowsById: filteredRowsById
			});
		};
		handleRowFiltering = (row, filterFn, columnId, filterValue) => {
			let hasFilteredSubRows = false;
			row.subRows = row.initialSubRows.filter((subRow) => {
				let result = handleRowFiltering(subRow, filterFn, columnId, filterValue);
				if (result) hasFilteredSubRows = true;
				return result;
			});
			if (hasFilteredSubRows) return true;
			return !!filterFn([row], [columnId], filterValue).length;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useSubRowSelection.js
var import_react$56, useSubRowSelection, useInstance$2;
function init_useSubRowSelection() {
	return (init_useSubRowSelection = __esmMin((() => {
		import_react$56 = /* @__PURE__ */ __toESM(require_react(), 1);
		useSubRowSelection = (hooks) => {
			hooks.useInstance.push(useInstance$2);
		};
		useInstance$2 = (instance) => {
			let selectedFlatRows = import_react$56.useMemo(() => {
				let selectedFlatRows = [];
				let setSelectionState = (row, selectedRowIds) => {
					let isSomeSubRowsSelected = false;
					row.initialSubRows.forEach((subRow) => {
						setSelectionState(subRow, selectedRowIds);
						if (subRow.isSelected || subRow.isSomeSelected) isSomeSubRowsSelected = true;
					});
					if (selectedRowIds[row.id]) {
						row.isSelected = true;
						row.isSomeSelected = false;
						selectedFlatRows.push(row);
					} else {
						row.isSelected = false;
						row.isSomeSelected = isSomeSubRowsSelected;
					}
				};
				instance.rows.forEach((row) => setSelectionState(row, instance.state.selectedRowIds));
				return selectedFlatRows;
			}, [instance.rows, instance.state.selectedRowIds]);
			Object.assign(instance, { selectedFlatRows });
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useResizeColumns.js
function getLeafHeaders(header) {
	let leafHeaders = [];
	let recurseHeader = (header) => {
		if (header.columns && header.columns.length) header.columns.map(recurseHeader);
		leafHeaders.push(header);
	};
	recurseHeader(header);
	return leafHeaders;
}
var import_react_table$3, useResizeColumns, isTouchEvent, defaultGetResizerProps, reducer$2, getColumnWidths, isNewColumnWidthsValid, isNewTableWidthValid, useInstanceBeforeDimensions, getPreviousResizableHeader, getNextResizableHeader, getHeaderWidth, calculateTableWidth, passiveSupported, passiveEventSupported;
function init_useResizeColumns() {
	return (init_useResizeColumns = __esmMin((() => {
		import_react_table$3 = require_react_table();
		useResizeColumns = (ownerDocument) => (hooks) => {
			hooks.getResizerProps = [defaultGetResizerProps(ownerDocument)];
			hooks.stateReducers.push(reducer$2);
			hooks.useInstanceBeforeDimensions.push(useInstanceBeforeDimensions);
		};
		isTouchEvent = (event) => "touchstart" === event.type;
		defaultGetResizerProps = (ownerDocument) => (props, { instance, header, nextHeader }) => {
			let { dispatch } = instance;
			let onResizeStart = (e, header) => {
				if (isTouchEvent(e) && e.touches && e.touches.length > 1) return;
				let headerIdWidths = getLeafHeaders(header).map((d) => [d.id, getHeaderWidth(d)]);
				let nextHeaderIdWidths = nextHeader ? getLeafHeaders(nextHeader).map((d) => [d.id, getHeaderWidth(d)]) : [];
				let clientX = isTouchEvent(e) ? Math.round(e.touches[0].clientX) : e.clientX;
				let dispatchMove = (clientXPos) => dispatch({
					type: import_react_table$3.actions.columnResizing,
					clientX: clientXPos
				});
				let dispatchEnd = () => dispatch({ type: import_react_table$3.actions.columnDoneResizing });
				let handlersAndEvents = {
					mouse: {
						moveEvent: "mousemove",
						moveHandler: (e) => dispatchMove(e.clientX),
						upEvent: "mouseup",
						upHandler: () => {
							ownerDocument.current?.removeEventListener("mousemove", handlersAndEvents.mouse.moveHandler);
							ownerDocument.current?.removeEventListener("mouseup", handlersAndEvents.mouse.upHandler);
							ownerDocument.current?.removeEventListener("mouseleave", handlersAndEvents.mouse.upHandler);
							dispatchEnd();
						}
					},
					touch: {
						moveEvent: "touchmove",
						moveHandler: (e) => {
							if (e.cancelable) {
								e.preventDefault();
								e.stopPropagation();
							}
							dispatchMove(e.touches[0].clientX);
						},
						upEvent: "touchend",
						upHandler: () => {
							ownerDocument.current?.removeEventListener(handlersAndEvents.touch.moveEvent, handlersAndEvents.touch.moveHandler);
							ownerDocument.current?.removeEventListener(handlersAndEvents.touch.upEvent, handlersAndEvents.touch.moveHandler);
							dispatchEnd();
						}
					}
				};
				let events = isTouchEvent(e) ? handlersAndEvents.touch : handlersAndEvents.mouse;
				let passiveIfSupported = passiveEventSupported() ? { passive: false } : false;
				ownerDocument.current?.addEventListener(events.moveEvent, events.moveHandler, passiveIfSupported);
				ownerDocument.current?.addEventListener(events.upEvent, events.upHandler, passiveIfSupported);
				if (!isTouchEvent(e)) ownerDocument.current?.addEventListener("mouseleave", handlersAndEvents.mouse.upHandler, passiveIfSupported);
				dispatch({
					type: import_react_table$3.actions.columnStartResizing,
					columnId: header.id,
					columnWidth: getHeaderWidth(header),
					nextColumnWidth: getHeaderWidth(nextHeader),
					headerIdWidths,
					nextHeaderIdWidths,
					clientX
				});
			};
			return [props, {
				onClick: (e) => {
					e.stopPropagation();
				},
				onMouseDown: (e) => {
					e.persist();
					e.preventDefault();
					e.stopPropagation();
					onResizeStart(e, header);
				},
				onTouchStart: (e) => {
					e.persist();
					e.preventDefault();
					onResizeStart(e, header);
				},
				style: { cursor: "col-resize" },
				draggable: false,
				role: "separator"
			}];
		};
		useResizeColumns.pluginName = "useResizeColumns";
		reducer$2 = (newState, action, previousState, instance) => {
			if (action.type === import_react_table$3.actions.init) return {
				...newState,
				columnResizing: { columnWidths: {} }
			};
			if (action.type === import_react_table$3.actions.resetResize) return {
				...newState,
				columnResizing: { columnWidths: {} }
			};
			if (action.type === import_react_table$3.actions.columnStartResizing) {
				let { clientX, columnId, columnWidth, nextColumnWidth, headerIdWidths, nextHeaderIdWidths } = action;
				return {
					...newState,
					columnResizing: {
						...newState.columnResizing,
						startX: clientX,
						columnWidth,
						nextColumnWidth,
						headerIdWidths,
						nextHeaderIdWidths,
						isResizingColumn: columnId
					}
				};
			}
			if (action.type === import_react_table$3.actions.columnResizing) {
				let { clientX } = action;
				let { startX = 0, columnWidth = 1, nextColumnWidth = 1, headerIdWidths = [], nextHeaderIdWidths = [] } = newState.columnResizing;
				if (!instance) return newState;
				let deltaX = clientX - startX;
				let newColumnWidths = getColumnWidths(headerIdWidths, deltaX / columnWidth);
				let isTableWidthDecreasing = calculateTableWidth(newColumnWidths, instance.flatHeaders) < instance.tableWidth;
				let newNextColumnWidths = instance?.columnResizeMode === "fit" || instance?.columnResizeMode === "expand" && isTableWidthDecreasing ? getColumnWidths(nextHeaderIdWidths, -deltaX / nextColumnWidth) : {};
				if (!isNewColumnWidthsValid(newColumnWidths, instance.flatHeaders) || !isNewColumnWidthsValid(newNextColumnWidths, instance.flatHeaders) || !isNewTableWidthValid({
					...newColumnWidths,
					...newNextColumnWidths
				}, instance)) return newState;
				instance?.flatHeaders.forEach((h) => {
					if (!h.width) h.width = h.resizeWidth;
				});
				return {
					...newState,
					columnResizing: {
						...newState.columnResizing,
						columnWidths: {
							...newState.columnResizing.columnWidths,
							...newColumnWidths,
							...newNextColumnWidths
						}
					}
				};
			}
			if (action.type === import_react_table$3.actions.columnDoneResizing) return {
				...newState,
				columnResizing: {
					...newState.columnResizing,
					startX: void 0,
					isResizingColumn: void 0
				}
			};
			return newState;
		};
		getColumnWidths = (headerIdWidths, deltaPercentage) => {
			let columnWidths = {};
			headerIdWidths.forEach(([headerId, headerWidth]) => {
				columnWidths[headerId] = Math.max(headerWidth + headerWidth * deltaPercentage, 0);
			});
			return columnWidths;
		};
		isNewColumnWidthsValid = (columnWidths, headers) => {
			if (Object.values(columnWidths).some((width) => width <= 1)) return false;
			for (let [headerId, width] of Object.entries(columnWidths)) {
				let header = headers?.find((h) => h.id === headerId);
				if (!header) continue;
				let minWidth = header.minWidth || 0;
				let maxWidth = header.maxWidth || 1 / 0;
				if (width < minWidth || width > maxWidth) return false;
			}
			return true;
		};
		isNewTableWidthValid = (columnWidths, instance) => {
			if ("fit" === instance.columnResizeMode) return true;
			let newTableWidth = 0;
			for (let header of instance.flatHeaders) newTableWidth += columnWidths[header.id] ? columnWidths[header.id] : getHeaderWidth(header);
			if (Math.round(newTableWidth) < instance.tableWidth) return false;
			return true;
		};
		useInstanceBeforeDimensions = (instance) => {
			let { flatHeaders, getHooks, state: { columnResizing }, columnResizeMode } = instance;
			let getInstance = (0, import_react_table$3.useGetLatest)(instance);
			flatHeaders.forEach((header, index) => {
				header.width = columnResizing.columnWidths[header.id] || header.width || header.originalWidth;
				header.isResizing = columnResizing.isResizingColumn === header.id;
				let headerToResize = header.disableResizing && "fit" === columnResizeMode ? getPreviousResizableHeader(header, instance) : header;
				let nextResizableHeader = "expand" === columnResizeMode && index === flatHeaders.length - 1 ? getPreviousResizableHeader(header, instance) : getNextResizableHeader(header, instance);
				header.canResize = null != header.disableResizing ? !header.disableResizing : true;
				if ("fit" === columnResizeMode) header.isResizerVisible = header.canResize && !!nextResizableHeader || headerToResize && !!instance.flatHeaders[index + 1]?.canResize;
				else header.isResizerVisible = header.canResize && !!headerToResize;
				header.getResizerProps = (0, import_react_table$3.makePropGetter)(getHooks().getResizerProps, {
					instance: getInstance(),
					header: headerToResize,
					nextHeader: nextResizableHeader
				});
			});
		};
		getPreviousResizableHeader = (headerColumn, instance) => {
			let headersList = (headerColumn.parent?.columns || instance.flatHeaders).filter(({ isVisible }) => isVisible);
			let headerIndex = headersList.findIndex((h) => h.id === headerColumn.id);
			return [...headersList].slice(0, headerIndex).reverse().find((h) => !h.disableResizing);
		};
		getNextResizableHeader = (headerColumn, instance) => {
			let headersList = (headerColumn.parent?.columns || instance.flatHeaders).filter(({ isVisible }) => isVisible);
			let headerIndex = headersList.findIndex((h) => h.id === headerColumn.id);
			return [...headersList].slice(headerIndex + 1).find((h) => !h.disableResizing);
		};
		getHeaderWidth = (header) => {
			if (!header) return 0;
			return "string" == typeof header.width && Number.isNaN(Number(header.width)) ? Number(header.resizeWidth || 0) : Number(header.width || header.resizeWidth || 0);
		};
		calculateTableWidth = (columnWidths, headers) => {
			let newTableWidth = 0;
			for (let header of headers) newTableWidth += columnWidths[header.id] ? columnWidths[header.id] : getHeaderWidth(header);
			return newTableWidth;
		};
		passiveSupported = null;
		passiveEventSupported = () => {
			if (null != passiveSupported) return passiveSupported;
			try {
				window.addEventListener("test", () => {}, {
					once: true,
					get passive() {
						passiveSupported = true;
						return false;
					}
				});
			} catch {
				passiveSupported = false;
			}
			return passiveSupported;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useColumnDragAndDrop.js
var import_react_table$2, leftClassName, rightClassName, REORDER_ACTIONS, useColumnDragAndDrop, defaultGetDragAndDropProps, reducer$1, useInstance$1;
function init_useColumnDragAndDrop() {
	return (init_useColumnDragAndDrop = __esmMin((() => {
		import_react_table$2 = require_react_table();
		init_styles();
		leftClassName = u["iui-table-reorder-column-left"];
		rightClassName = u["iui-table-reorder-column-right"];
		REORDER_ACTIONS = {
			columnDragStart: "columnDragStart",
			columnDragEnd: "columnDragEnd"
		};
		useColumnDragAndDrop = (isEnabled) => (hooks) => {
			hooks.getDragAndDropProps = [defaultGetDragAndDropProps(isEnabled)];
			hooks.stateReducers.push(reducer$1);
			hooks.useInstance.push(useInstance$1);
		};
		defaultGetDragAndDropProps = (isEnabled) => (props, { instance, header }) => {
			if (!isEnabled || header.disableReordering) return props;
			let onDragStart = () => {
				instance.dispatch({
					type: REORDER_ACTIONS.columnDragStart,
					columnIndex: instance.flatHeaders.indexOf(header)
				});
			};
			let setOnDragColumnStyle = (event, position) => {
				let columnElement = event.currentTarget;
				if ("left" === position) {
					columnElement.classList.remove(rightClassName);
					columnElement.classList.add(leftClassName);
				} else if ("right" === position) {
					columnElement.classList.remove(leftClassName);
					columnElement.classList.add(rightClassName);
				} else {
					columnElement.classList.remove(leftClassName);
					columnElement.classList.remove(rightClassName);
				}
			};
			let reorderColumns = (tableColumns, srcIndex, dstIndex) => {
				let newTableColumns = [...tableColumns];
				let [removed] = newTableColumns.splice(srcIndex, 1);
				newTableColumns.splice(dstIndex, 0, removed);
				return newTableColumns;
			};
			let onDragOver = (event) => {
				event.preventDefault();
				let headerIndex = instance.flatHeaders.indexOf(header);
				if (instance.state.columnReorderStartIndex !== headerIndex) setOnDragColumnStyle(event, instance.state.columnReorderStartIndex > headerIndex ? "left" : "right");
			};
			let onDragLeave = (event) => {
				setOnDragColumnStyle(event);
			};
			let onDrop = (event) => {
				event.preventDefault();
				setOnDragColumnStyle(event);
				let columnIds = instance.allColumns.map((x) => x.id);
				let srcIndex = instance.state.columnReorderStartIndex;
				let dstIndex = columnIds.findIndex((x) => x === header.id);
				if (srcIndex === dstIndex || -1 === srcIndex || -1 === dstIndex) return;
				instance.setColumnOrder(reorderColumns(columnIds, srcIndex, dstIndex));
				instance.dispatch({
					type: REORDER_ACTIONS.columnDragEnd,
					columnIndex: -1
				});
			};
			return [props, {
				draggable: true,
				onDragStart,
				onDragOver,
				onDragLeave,
				onDrop
			}];
		};
		reducer$1 = (newState, action) => {
			switch (action.type) {
				case import_react_table$2.actions.init: return {
					...newState,
					columnReorderStartIndex: -1
				};
				case REORDER_ACTIONS.columnDragStart: return {
					...newState,
					columnReorderStartIndex: action.columnIndex
				};
				case REORDER_ACTIONS.columnDragEnd: return {
					...newState,
					columnReorderStartIndex: -1
				};
				default: return newState;
			}
		};
		useInstance$1 = (instance) => {
			let { flatHeaders, getHooks } = instance;
			let getInstance = (0, import_react_table$2.useGetLatest)(instance);
			flatHeaders.forEach((header) => {
				header.getDragAndDropProps = (0, import_react_table$2.makePropGetter)(getHooks().getDragAndDropProps, {
					instance: getInstance(),
					header
				});
			});
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useScrollToRow.js
function useScrollToRow({ data, enableVirtualization, page, paginatorRenderer, scrollToRow }) {
	let rowRefs = import_react$55.useRef({});
	let pageRef = import_react$55.useRef(page);
	pageRef.current = page;
	let dataRef = import_react$55.useRef(data);
	dataRef.current = data;
	let scrollToIndex = import_react$55.useMemo(() => {
		if (!scrollToRow || paginatorRenderer) return;
		let index = scrollToRow(pageRef.current, dataRef.current);
		return index < 0 ? void 0 : index;
	}, [paginatorRenderer, scrollToRow]);
	import_react$55.useEffect(() => {
		if (enableVirtualization || null == scrollToIndex || scrollToIndex < 0) return;
		rowRefs.current[pageRef.current[scrollToIndex]?.id]?.scrollIntoView();
	}, [enableVirtualization, scrollToIndex]);
	return {
		scrollToIndex,
		tableRowRef: import_react$55.useCallback((row) => (element) => {
			rowRefs.current[row.id] = element;
		}, [])
	};
}
var import_react$55;
function init_useScrollToRow() {
	return (init_useScrollToRow = __esmMin((() => {
		import_react$55 = /* @__PURE__ */ __toESM(require_react(), 1);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/hooks/useStickyColumns.js
var import_react_table$1, useStickyColumns, reducer, useInstance;
function init_useStickyColumns() {
	return (init_useStickyColumns = __esmMin((() => {
		import_react_table$1 = require_react_table();
		import_react_table$1.actions.setScrolledLeft = "setScrolledLeft";
		import_react_table$1.actions.setScrolledRight = "setScrolledRight";
		useStickyColumns = (hooks) => {
			hooks.stateReducers.push(reducer);
			hooks.useInstance.push(useInstance);
		};
		reducer = (newState, action) => {
			if (action.type === import_react_table$1.actions.init) return {
				...newState,
				sticky: {}
			};
			if (action.type === import_react_table$1.actions.setScrolledLeft && newState.sticky?.isScrolledToLeft !== action.value) return {
				...newState,
				sticky: {
					...newState.sticky,
					isScrolledToLeft: action.value
				}
			};
			if (action.type === import_react_table$1.actions.setScrolledRight && newState.sticky?.isScrolledToRight !== action.value) return {
				...newState,
				sticky: {
					...newState.sticky,
					isScrolledToRight: action.value
				}
			};
			return newState;
		};
		useInstance = (instance) => {
			let { flatHeaders } = instance;
			flatHeaders.forEach((header) => {
				if (!header.originalSticky) header.originalSticky = header.sticky ?? "none";
				header.sticky = "none" === header.originalSticky ? void 0 : header.originalSticky;
			});
			let hasLeftStickyColumn = false;
			[...flatHeaders].reverse().forEach((header) => {
				if ("left" === header.sticky) hasLeftStickyColumn = true;
				if (hasLeftStickyColumn) header.sticky = "left";
			});
			let hasRightStickyColumn = false;
			flatHeaders.forEach((header) => {
				if ("right" === header.sticky) hasRightStickyColumn = true;
				if (hasRightStickyColumn) header.sticky = "right";
			});
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/actionHandlers/expandHandler.js
var onExpandHandler;
function init_expandHandler() {
	return (init_expandHandler = __esmMin((() => {
		onExpandHandler = (newState, instance, onExpand) => {
			if (!instance?.preFilteredFlatRows.length) return void onExpand?.([], newState);
			let expandedData = [];
			instance.preFilteredFlatRows.forEach((row) => {
				if (newState.expanded[row.id]) expandedData.push(row.original);
			});
			onExpand?.(expandedData, newState);
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/actionHandlers/filterHandler.js
var onFilterHandler;
function init_filterHandler() {
	return (init_filterHandler = __esmMin((() => {
		onFilterHandler = (newState, action, previousState, currentFilter, instance) => {
			if (previousState.filters.find((f) => f.id === action.columnId)?.value != action.filterValue) return newState.filters.map((f) => {
				let column = instance?.allColumns.find((c) => c.id === f.id);
				return {
					id: f.id,
					value: f.value,
					fieldType: column?.fieldType ?? "text",
					filterType: column?.filter ?? "text"
				};
			});
			return currentFilter;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/actionHandlers/selectHandler.js
var onSelectHandler, onToggleHandler, onSingleSelectHandler, onShiftSelectHandler, getSelectedData;
function init_selectHandler() {
	return (init_selectHandler = __esmMin((() => {
		init_Table();
		onSelectHandler = (newState, instance, onSelect, isRowDisabled) => {
			if (!instance?.rows.length) return void onSelect?.([], newState);
			let newSelectedRowIds = {};
			let handleRow = (row) => {
				if (isRowDisabled?.(row.original)) return false;
				let hasSubComponents = !!row.initialSubRows[0]?.original[iuiId];
				let hasSubRows = row.subRows.length > 0 && !hasSubComponents;
				let isAllSubSelected = true;
				if (hasSubRows) row.initialSubRows.forEach((subRow) => {
					if (!handleRow(subRow)) isAllSubSelected = false;
				});
				if (newState.selectedRowIds[row.id] && (!instance.selectSubRows || !hasSubRows) || hasSubRows && isAllSubSelected) newSelectedRowIds[row.id] = true;
				return !!newSelectedRowIds[row.id];
			};
			instance.initialRows.forEach((row) => handleRow(row));
			let selectedData = getSelectedData(newSelectedRowIds, instance);
			newState.selectedRowIds = newSelectedRowIds;
			onSelect?.(selectedData, newState);
		};
		onToggleHandler = (newState, action, instance, onSelect, isRowDisabled) => {
			onSelectHandler(newState, instance, onSelect, isRowDisabled);
			newState.lastSelectedRowId = action.id;
		};
		onSingleSelectHandler = (state, action, instance, onSelect, isRowDisabled) => {
			let selectedRowIds = { [action.id]: true };
			if (instance?.selectSubRows) {
				let handleRow = (row) => {
					selectedRowIds[row.id] = true;
					row.subRows.forEach((r) => handleRow(r));
				};
				handleRow(instance.rowsById[action.id]);
			}
			let newState = {
				...state,
				lastSelectedRowId: action.id,
				selectedRowIds
			};
			onSelectHandler(newState, instance, onSelect, isRowDisabled);
			return newState;
		};
		onShiftSelectHandler = (state, action, instance, onSelect, isRowDisabled) => {
			if (null == instance) return state;
			let startIndex = Math.max(0, instance.flatRows.findIndex((row) => row.id === state.lastSelectedRowId));
			let endIndex = Math.max(0, instance.flatRows.findIndex((row) => row.id === action.id));
			if (startIndex > endIndex) {
				let temp = startIndex;
				startIndex = endIndex;
				endIndex = temp;
			}
			let isLastSelectedRowIdSelected = null == state.lastSelectedRowId || !!state.selectedRowIds[state.lastSelectedRowId];
			let selectedRowIds = action.ctrlPressed ? { ...state.selectedRowIds } : {};
			instance.flatRows.slice(startIndex, endIndex + 1).forEach((r) => selectedRowIds[r.id] = isLastSelectedRowIdSelected);
			let handleRow = (row) => {
				selectedRowIds[row.id] = isLastSelectedRowIdSelected;
				row.subRows.forEach((r) => handleRow(r));
			};
			handleRow(instance.flatRows[endIndex]);
			let newState = {
				...state,
				selectedRowIds
			};
			onSelectHandler(newState, instance, onSelect, isRowDisabled);
			return newState;
		};
		getSelectedData = (selectedRowIds, instance) => {
			let selectedData = [];
			let setSelectedData = (row) => {
				if (selectedRowIds[row.id]) selectedData.push(row.original);
				row.initialSubRows.forEach((subRow) => setSelectedData(subRow));
			};
			instance?.initialRows.forEach((row) => setSelectedData(row));
			return selectedData;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/actionHandlers/resizeHandler.js
var onTableResizeStart, onTableResizeEnd;
function init_resizeHandler() {
	return (init_resizeHandler = __esmMin((() => {
		onTableResizeStart = (state) => ({
			...state,
			isTableResizing: true
		});
		onTableResizeEnd = (state, action) => ({
			...state,
			isTableResizing: false,
			columnResizing: {
				...state.columnResizing,
				columnWidths: { ...action.columnWidths }
			}
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/filters/FilterToggle.js
var import_react$54, import_classnames$4, FilterToggle;
function init_FilterToggle() {
	return (init_FilterToggle = __esmMin((() => {
		import_react$54 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$4 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		init_useGlobals(), init_SvgFilterHollow(), init_SvgFilter();
		init_IconButton();
		init_Popover();
		FilterToggle = (props) => {
			let { column, className, ...rest } = props;
			useGlobals();
			let [isVisible, setIsVisible] = import_react$54.useState(false);
			let close = import_react$54.useCallback(() => setIsVisible(false), []);
			let setFilter = import_react$54.useCallback((filterValue) => {
				column.setFilter(filterValue);
				close();
			}, [close, column]);
			let clearFilter = import_react$54.useCallback(() => {
				column.setFilter(void 0);
				close();
			}, [close, column]);
			let isColumnFiltered = null != column.filterValue && "" !== column.filterValue;
			return import_react$54.createElement(import_react$54.Fragment, null, column.canFilter && column.Filter && import_react$54.createElement(Popover, {
				content: column.render("Filter", {
					close,
					setFilter,
					clearFilter
				}),
				placement: "bottom-start",
				visible: isVisible,
				onVisibleChange: setIsVisible,
				closeOnOutsideClick: true,
				applyBackground: true
			}, import_react$54.createElement(IconButton, {
				styleType: "borderless",
				isActive: isVisible || isColumnFiltered,
				className: (0, import_classnames$4.default)("iui-table-filter-button", className),
				"aria-label": "Filter",
				onClick: (e) => {
					e.stopPropagation();
				},
				"data-iui-shift": "left",
				...rest
			}, isColumnFiltered ? import_react$54.createElement(SvgFilter, null) : import_react$54.createElement(SvgFilterHollow, null))));
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/ColumnHeader.js
var import_react$53, import_classnames$3, ColumnHeader;
function init_ColumnHeader() {
	return (init_ColumnHeader = __esmMin((() => {
		import_react$53 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Box(), init_ShadowRoot(), init_lineClamp(), init_SvgSortDown(), init_SvgSortUp(), init_useMergedRefs();
		init_FilterToggle();
		init_utils();
		import_classnames$3 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		ColumnHeader = import_react$53.forwardRef((props, forwardedRef) => {
			let { column, areFiltersSet, isResizable, columnResizeMode, enableColumnReordering, density, columnHasExpanders, isLast, isTableEmpty, ...rest } = props;
			let isHeaderDirectClick = import_react$53.useRef(false);
			let instance = import_react$53.useContext(TableInstanceContext);
			let COLUMN_MIN_WIDTHS = {
				default: 72,
				withExpander: 108
			};
			let showFilterButton = (column) => (!isTableEmpty || areFiltersSet) && column.canFilter && !!column.Filter;
			let showSortButton = (column) => !isTableEmpty && column.canSort;
			let { onClick, ...restSortProps } = column.getSortByToggleProps();
			if ([void 0, 0].includes(column.minWidth)) {
				column.minWidth = columnHasExpanders ? COLUMN_MIN_WIDTHS.withExpander : COLUMN_MIN_WIDTHS.default;
				if ("number" == typeof column.width && column.minWidth > column.width) column.minWidth = column.width;
			}
			let columnProps = column.getHeaderProps({
				...restSortProps,
				className: (0, import_classnames$3.default)("iui-table-cell", {
					"iui-actionable": column.canSort,
					"iui-sorted": column.isSorted,
					"iui-table-cell-sticky": !!column.sticky
				}, column.columnClassName),
				style: {
					...getCellStyle(column, !!instance?.state.isTableResizing),
					...columnHasExpanders && getSubRowStyle({ density }),
					...getStickyStyle(column, instance?.visibleColumns ?? []),
					flexWrap: "wrap",
					columnGap: "var(--iui-size-xs)"
				}
			});
			return import_react$53.createElement(Box, {
				...columnProps,
				...rest,
				key: columnProps.key,
				title: void 0,
				ref: useMergedRefs(import_react$53.useCallback((el) => {
					if (el) column.resizeWidth = el.getBoundingClientRect().width;
				}, [column]), forwardedRef),
				onMouseDown: () => {
					isHeaderDirectClick.current = true;
				},
				onClick: (e) => {
					if (isHeaderDirectClick.current) {
						onClick?.(e);
						isHeaderDirectClick.current = false;
					}
				},
				tabIndex: showSortButton(column) ? 0 : void 0,
				onKeyDown: (e) => {
					if ("Enter" == e.key && showSortButton(column)) column.toggleSortBy();
				}
			}, import_react$53.createElement(import_react$53.Fragment, null, "string" == typeof column.Header ? import_react$53.createElement(ShadowRoot, { css: lineClamp.css }, import_react$53.createElement("div", { className: lineClamp.className }, import_react$53.createElement("slot", null)), import_react$53.createElement("slot", { name: "actions" }), import_react$53.createElement("slot", { name: "resizers" }), import_react$53.createElement("slot", { name: "shadows" })) : null, column.render("Header"), (showFilterButton(column) || showSortButton(column)) && import_react$53.createElement(Box, {
				className: "iui-table-header-actions-container",
				onKeyDown: (e) => e.stopPropagation(),
				slot: "actions"
			}, showFilterButton(column) && import_react$53.createElement(FilterToggle, { column }), showSortButton(column) && import_react$53.createElement(Box, { className: "iui-table-cell-end-icon" }, column.isSortedDesc || !column.isSorted && column.sortDescFirst ? import_react$53.createElement(SvgSortDown, {
				className: "iui-table-sort",
				"aria-hidden": true
			}) : import_react$53.createElement(SvgSortUp, {
				className: "iui-table-sort",
				"aria-hidden": true
			}))), isResizable && column.isResizerVisible && (!isLast || "expand" === columnResizeMode) && import_react$53.createElement(Box, {
				...column.getResizerProps(),
				className: "iui-table-resizer",
				slot: "resizers"
			}, import_react$53.createElement(Box, { className: "iui-table-resizer-bar" })), enableColumnReordering && !column.disableReordering && import_react$53.createElement(Box, {
				className: "iui-table-reorder-bar",
				slot: "resizers"
			}), "left" === column.sticky && instance?.state.sticky.isScrolledToRight && import_react$53.createElement(Box, {
				className: "iui-table-cell-shadow-right",
				slot: "shadows"
			}), "right" === column.sticky && instance?.state.sticky.isScrolledToLeft && import_react$53.createElement(Box, {
				className: "iui-table-cell-shadow-left",
				slot: "shadows"
			})));
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/TableExpandableContentMemoized.js
var import_classnames$2, import_react$52, TableExpandableContent, TableExpandableContentMemoized;
function init_TableExpandableContentMemoized() {
	return (init_TableExpandableContentMemoized = __esmMin((() => {
		import_classnames$2 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		import_react$52 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Box();
		TableExpandableContent = import_react$52.forwardRef((props, ref) => {
			let { children, className, style, isDisabled, virtualItem, ...rest } = props;
			return import_react$52.createElement(Box, {
				className: (0, import_classnames$2.default)("iui-table-row", "iui-table-expanded-content", className),
				style: {
					flex: "0 0 auto",
					minWidth: "100%",
					...null != virtualItem ? { transform: `translateY(${virtualItem.start}px)` } : {},
					...style
				},
				"aria-disabled": isDisabled,
				"data-iui-index": virtualItem?.index,
				...null != virtualItem && { "data-iui-virtualizer": "item" },
				ref,
				...rest
			}, children);
		});
		TableExpandableContentMemoized = import_react$52.memo(TableExpandableContent);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+itwinui-react@3.20.2_@stratakit+mui@1.0.0_@mui+material@9.4.0_@emotion+react@11._ea6ddafa4f1e1a4bc59d594e8b7a53d9/node_modules/@itwin/itwinui-react/esm/core/Table/Table.js
var import_react$51, import_classnames$1, import_react_table, singleRowSelectedAction, shiftRowSelectedAction, tableResizeStartAction, tableResizeEndAction, iuiId, flattenColumns, Table, TableBodyExtraWrapper, TableEmptyWrapper;
function init_Table() {
	return (init_Table = __esmMin((() => {
		import_react$51 = /* @__PURE__ */ __toESM(require_react(), 1);
		import_classnames$1 = /* @__PURE__ */ __toESM(require_classnames(), 1);
		import_react_table = require_react_table();
		init_ProgressRadial();
		init_useGlobals(), init_useResizeObserver(), init_useIsomorphicLayoutEffect(), init_Box(), init_useWarningLogger(), init_ShadowRoot(), init_useMergedRefs(), init_useLatestRef(), init_useVirtualScroll(), init_useId();
		init_utils();
		init_TableRowMemoized();
		init_customFilterFunctions();
		init_useExpanderCell(), init_useSelectionCell(), init_useSubRowFiltering(), init_useSubRowSelection(), init_useResizeColumns(), init_useColumnDragAndDrop(), init_useScrollToRow(), init_useStickyColumns();
		init_expandHandler(), init_filterHandler(), init_selectHandler(), init_resizeHandler();
		init_selectionColumn();
		init_ColumnHeader();
		init_TableExpandableContentMemoized();
		init_VisuallyHidden();
		singleRowSelectedAction = "singleRowSelected";
		shiftRowSelectedAction = "shiftRowSelected";
		tableResizeStartAction = "tableResizeStart";
		tableResizeEndAction = "tableResizeEnd";
		iuiId = Symbol("iui-id");
		flattenColumns = (columns) => {
			let flatColumns = [];
			columns.forEach((column) => {
				flatColumns.push(column);
				if ("columns" in column) flatColumns.push(...flattenColumns(column.columns));
			});
			return flatColumns;
		};
		Table = (props) => {
			let { data, columns, isLoading = false, emptyTableContent, className, style, id, isSelectable = false, onSelect, onRowClick, selectionMode = "multi", isSortable = false, onSort, stateReducer, onBottomReached, onRowInViewport, intersectionMargin = 300, subComponent, onExpand, onFilter, globalFilterValue, emptyFilteredTableContent, filterTypes: filterFunctions, expanderCell, isRowDisabled, rowProps, density = "default", selectSubRows = true, getSubRows, selectRowOnClick = true, paginatorRenderer, pageSize = 25, isResizable = false, columnResizeMode = "fit", styleType = "default", enableVirtualization = false, enableColumnReordering = false, headerWrapperProps, headerProps, bodyProps, tableProps, emptyTableContentProps, getRowId, caption = "Table", role, scrollToRow, useControlledState, autoResetExpanded, autoResetFilters, autoResetGlobalFilter, autoResetHiddenColumns, autoResetPage, autoResetResize, autoResetSelectedRows, autoResetSortBy, defaultCanFilter, defaultCanSort, defaultColumn: defaultColumnProp, disableFilters, disableGlobalFilter, disableMultiSort, disableSortRemove, disabledMultiRemove, expandSubRows, globalFilter, initialState, isMultiSortEvent, manualExpandedKey, manualFilters, manualGlobalFilter, manualRowSelectedKey, manualSortBy, maxMultiSortColCount, orderByFn, pageCount, sortTypes, manualPagination, paginateExpandedRows, ..._rest } = props;
			let { ariaRestAttributes, nonAriaRestAttributes } = import_react$51.useMemo(() => Object.entries(_rest).reduce((result, [key, value]) => {
				if (key.startsWith("aria-")) result.ariaRestAttributes[key] = value;
				else result.nonAriaRestAttributes[key] = value;
				return result;
			}, {
				ariaRestAttributes: {},
				nonAriaRestAttributes: {}
			}), [_rest]);
			let { outerAriaRestAttributes, innerAriaRestAttributes } = import_react$51.useMemo(() => {
				if (tableProps || role) return {
					outerAriaRestAttributes: { ...ariaRestAttributes },
					innerAriaRestAttributes: {}
				};
				return {
					outerAriaRestAttributes: {},
					innerAriaRestAttributes: { ...ariaRestAttributes }
				};
			}, [
				ariaRestAttributes,
				role,
				tableProps
			]);
			useGlobals();
			let ownerDocument = import_react$51.useRef(void 0);
			let defaultColumn = import_react$51.useMemo(() => ({
				maxWidth: 0,
				minWidth: 0,
				width: 0,
				...defaultColumnProp
			}), [defaultColumnProp]);
			let rowHeight = import_react$51.useMemo(() => {
				if ("condensed" === density) return 50;
				if ("extra-condensed" === density) return 38;
				return 62;
			}, [density]);
			let onBottomReachedRef = useLatestRef(onBottomReached);
			let onRowInViewportRef = useLatestRef(onRowInViewport);
			let hasManualSelectionColumn = import_react$51.useMemo(() => {
				return flattenColumns(columns).some((column) => column.id === SELECTION_CELL_ID);
			}, [columns]);
			let disableUserSelect = import_react$51.useCallback((e) => {
				if ("Shift" === e.key) ownerDocument.current && (ownerDocument.current.documentElement.style.userSelect = "none");
			}, []);
			let enableUserSelect = import_react$51.useCallback((e) => {
				if ("Shift" === e.key) ownerDocument.current && (ownerDocument.current.documentElement.style.userSelect = "");
			}, []);
			import_react$51.useEffect(() => {
				if (!isSelectable || "multi" !== selectionMode) return;
				let ownerDoc = ownerDocument.current;
				ownerDoc?.addEventListener("keydown", disableUserSelect);
				ownerDoc?.addEventListener("keyup", enableUserSelect);
				return () => {
					ownerDoc?.removeEventListener("keydown", disableUserSelect);
					ownerDoc?.removeEventListener("keyup", enableUserSelect);
				};
			}, [
				isSelectable,
				selectionMode,
				ownerDocument,
				disableUserSelect,
				enableUserSelect
			]);
			let previousFilter = import_react$51.useRef([]);
			let currentFilter = import_react$51.useRef(previousFilter.current);
			let tableStateReducer = import_react$51.useCallback((newState, action, previousState, instance) => {
				switch (action.type) {
					case import_react_table.actions.toggleSortBy:
						onSort?.(newState);
						break;
					case import_react_table.actions.setFilter:
						currentFilter.current = onFilterHandler(newState, action, previousState, currentFilter.current, instance);
						break;
					case import_react_table.actions.toggleRowExpanded:
					case import_react_table.actions.toggleAllRowsExpanded:
						onExpandHandler(newState, instance, onExpand);
						break;
					case singleRowSelectedAction:
						newState = onSingleSelectHandler(newState, action, instance, onSelect, hasManualSelectionColumn ? void 0 : isRowDisabled);
						break;
					case shiftRowSelectedAction:
						newState = onShiftSelectHandler(newState, action, instance, onSelect, hasManualSelectionColumn ? void 0 : isRowDisabled);
						break;
					case import_react_table.actions.toggleRowSelected:
					case import_react_table.actions.toggleAllRowsSelected:
					case import_react_table.actions.toggleAllPageRowsSelected:
						onToggleHandler(newState, action, instance, onSelect, hasManualSelectionColumn ? void 0 : isRowDisabled);
						break;
					case tableResizeStartAction:
						newState = onTableResizeStart(newState);
						break;
					case tableResizeEndAction: newState = onTableResizeEnd(newState, action);
				}
				return stateReducer ? stateReducer(newState, action, previousState, instance) : newState;
			}, [
				hasManualSelectionColumn,
				isRowDisabled,
				onExpand,
				onSelect,
				onSort,
				stateReducer
			]);
			let filterTypes = import_react$51.useMemo(() => ({
				...customFilterFunctions,
				...filterFunctions
			}), [filterFunctions]);
			let hasAnySubRows = import_react$51.useMemo(() => data.some((item, index) => getSubRows ? getSubRows(item, index) : item.subRows), [data, getSubRows]);
			let getSubRowsWithSubComponents = import_react$51.useCallback((originalRow, relativeIndex) => {
				if (originalRow[iuiId]) return [];
				if (originalRow.subRows) return originalRow.subRows;
				return [{
					[iuiId]: `subcomponent-${relativeIndex}`,
					...originalRow
				}];
			}, []);
			let getRowIdWithSubComponents = import_react$51.useCallback((originalRow, relativeIndex, parent) => {
				let defaultRowId = parent ? `${parent.id}.${relativeIndex}` : `${relativeIndex}`;
				let rowIdFromUser = getRowId?.(originalRow, relativeIndex, parent);
				if (void 0 !== rowIdFromUser && originalRow[iuiId]) return `${rowIdFromUser}-${defaultRowId}`;
				return rowIdFromUser ?? defaultRowId;
			}, [getRowId]);
			let instance = (0, import_react_table.useTable)({
				manualPagination: manualPagination ?? !paginatorRenderer,
				paginateExpandedRows: paginateExpandedRows ?? false,
				useControlledState,
				autoResetExpanded,
				autoResetFilters,
				autoResetGlobalFilter,
				autoResetHiddenColumns,
				autoResetPage,
				autoResetResize,
				autoResetSelectedRows,
				autoResetSortBy,
				defaultCanFilter,
				defaultCanSort,
				disableFilters,
				disableGlobalFilter,
				disableMultiSort,
				disableSortRemove,
				disabledMultiRemove,
				expandSubRows,
				globalFilter,
				isMultiSortEvent,
				manualExpandedKey,
				manualFilters,
				manualGlobalFilter,
				manualRowSelectedKey,
				manualSortBy,
				maxMultiSortColCount,
				orderByFn,
				pageCount: pageCount ?? -1,
				sortTypes,
				columns,
				defaultColumn,
				disableSortBy: !isSortable,
				stateReducer: tableStateReducer,
				filterTypes,
				selectSubRows,
				data,
				getSubRows: subComponent ? getSubRowsWithSubComponents : getSubRows,
				initialState: {
					pageSize,
					...initialState
				},
				columnResizeMode,
				getRowId: subComponent ? getRowIdWithSubComponents : getRowId
			}, import_react_table.useFlexLayout, useResizeColumns(ownerDocument), import_react_table.useFilters, useSubRowFiltering(hasAnySubRows), import_react_table.useGlobalFilter, import_react_table.useSortBy, import_react_table.useExpanded, import_react_table.usePagination, import_react_table.useRowSelect, useSubRowSelection, useExpanderCell(subComponent, expanderCell, isRowDisabled), useSelectionCell(isSelectable, selectionMode, isRowDisabled, density), import_react_table.useColumnOrder, useColumnDragAndDrop(enableColumnReordering), useStickyColumns);
			let { getTableProps, rows, headerGroups: _headerGroups, getTableBodyProps, prepareRow, state, allColumns, dispatch, page, gotoPage, setPageSize, flatHeaders, setGlobalFilter } = instance;
			let headerGroups = _headerGroups;
			useWarningLogger();
			if (1 === columns.length && "columns" in columns[0]) headerGroups = _headerGroups.slice(1);
			let areFiltersSet = allColumns.some((column) => null != column.filterValue && "" !== column.filterValue) || !!globalFilterValue;
			let onRowClickHandler = import_react$51.useCallback((event, row) => {
				let isDisabled = isRowDisabled?.(row.original);
				let ctrlPressed = event.ctrlKey || event.metaKey;
				if (!isDisabled) onRowClick?.(event, row);
				if (isSelectable && !isDisabled && selectRowOnClick && !event.isDefaultPrevented()) if ("multi" === selectionMode && event.shiftKey) dispatch({
					type: shiftRowSelectedAction,
					id: row.id,
					ctrlPressed
				});
				else if (row.isSelected || "single" !== selectionMode && ctrlPressed) row.toggleRowSelected(!row.isSelected);
				else dispatch({
					type: singleRowSelectedAction,
					id: row.id
				});
			}, [
				isRowDisabled,
				isSelectable,
				selectRowOnClick,
				selectionMode,
				dispatch,
				onRowClick
			]);
			import_react$51.useEffect(() => {
				setGlobalFilter(globalFilterValue);
			}, [globalFilterValue, setGlobalFilter]);
			import_react$51.useEffect(() => {
				setPageSize(pageSize);
			}, [pageSize, setPageSize]);
			import_react$51.useEffect(() => {
				if (previousFilter.current !== currentFilter.current) {
					previousFilter.current = currentFilter.current;
					onFilter?.(currentFilter.current, state, instance.filteredRows);
				}
			}, [
				state,
				instance.filteredRows,
				onFilter
			]);
			let lastPassedColumns = import_react$51.useRef([]);
			import_react$51.useEffect(() => {
				if (lastPassedColumns.current.length > 0 && JSON.stringify(lastPassedColumns.current) !== JSON.stringify(columns)) instance.setColumnOrder([]);
				lastPassedColumns.current = columns;
			}, [columns, instance]);
			let paginatorRendererProps = import_react$51.useMemo(() => ({
				currentPage: state.pageIndex,
				pageSize: state.pageSize,
				totalRowsCount: rows.length,
				size: "default" !== density ? "small" : "default",
				isLoading,
				onPageChange: gotoPage,
				onPageSizeChange: setPageSize,
				totalSelectedRowsCount: "single" === selectionMode ? 0 : instance.selectedFlatRows.length
			}), [
				density,
				gotoPage,
				isLoading,
				rows.length,
				setPageSize,
				state.pageIndex,
				state.pageSize,
				instance.selectedFlatRows,
				selectionMode
			]);
			let tableRef = import_react$51.useRef(null);
			let { scrollToIndex, tableRowRef } = useScrollToRow({
				...props,
				scrollToRow,
				page
			});
			let columnRefs = import_react$51.useRef({});
			let previousTableWidth = import_react$51.useRef(0);
			let onTableResize = import_react$51.useCallback(({ width }) => {
				if (!isResizable) return;
				instance.tableWidth = width;
				if (width === previousTableWidth.current) return;
				previousTableWidth.current = width;
				flatHeaders.forEach((header) => {
					if (columnRefs.current[header.id]) header.resizeWidth = columnRefs.current[header.id].getBoundingClientRect().width;
				});
				if (0 === Object.keys(state.columnResizing.columnWidths).length) return;
				dispatch({ type: tableResizeStartAction });
			}, [
				dispatch,
				state.columnResizing.columnWidths,
				flatHeaders,
				instance,
				isResizable
			]);
			let [resizeRef] = useResizeObserver(onTableResize);
			useIsomorphicLayoutEffect(() => {
				if (state.isTableResizing) {
					let newColumnWidths = {};
					flatHeaders.forEach((column) => {
						if (columnRefs.current[column.id]) newColumnWidths[column.id] = columnRefs.current[column.id].getBoundingClientRect().width;
					});
					dispatch({
						type: tableResizeEndAction,
						columnWidths: newColumnWidths
					});
				}
			});
			let { virtualizer, css: virtualizerCss } = useVirtualScroll({
				enabled: enableVirtualization,
				count: page.length,
				getScrollElement: () => tableRef.current,
				estimateSize: () => rowHeight,
				getItemKey: import_react$51.useCallback((index) => page[index].id, [page]),
				overscan: 1
			});
			useIsomorphicLayoutEffect(() => {
				if (scrollToIndex) virtualizer.scrollToIndex(scrollToIndex, { align: "start" });
			}, [virtualizer, scrollToIndex]);
			let getPreparedRow = import_react$51.useCallback((index, virtualItem, virtualizer) => {
				let row = page[index];
				prepareRow(row);
				if (!!row.original[iuiId] && !!subComponent) return import_react$51.createElement(TableExpandableContentMemoized, {
					key: row.getRowProps().key,
					virtualItem,
					ref: enableVirtualization ? virtualizer?.measureElement : tableRowRef(row),
					isDisabled: !!isRowDisabled?.(row.original)
				}, subComponent(row));
				return import_react$51.createElement(TableRowMemoized, {
					row,
					rowProps,
					isLast: index === page.length - 1,
					onRowInViewport: onRowInViewportRef,
					onBottomReached: onBottomReachedRef,
					intersectionMargin,
					state,
					key: row.getRowProps().key,
					onClick: onRowClickHandler,
					subComponent,
					isDisabled: !!isRowDisabled?.(row.original),
					tableHasSubRows: hasAnySubRows,
					tableInstance: instance,
					expanderCell,
					scrollContainerRef: tableRef.current,
					tableRowRef: enableVirtualization ? void 0 : tableRowRef(row),
					density,
					virtualItem,
					virtualizer
				});
			}, [
				page,
				prepareRow,
				subComponent,
				rowProps,
				onRowInViewportRef,
				onBottomReachedRef,
				intersectionMargin,
				state,
				onRowClickHandler,
				isRowDisabled,
				hasAnySubRows,
				instance,
				expanderCell,
				enableVirtualization,
				tableRowRef,
				density
			]);
			let updateStickyState = () => {
				if (!tableRef.current || flatHeaders.every((header) => !header.sticky)) return;
				0 !== tableRef.current.scrollLeft ? dispatch({
					type: import_react_table.actions.setScrolledRight,
					value: true
				}) : dispatch({
					type: import_react_table.actions.setScrolledRight,
					value: false
				});
				tableRef.current.scrollLeft !== tableRef.current.scrollWidth - tableRef.current.clientWidth ? dispatch({
					type: import_react_table.actions.setScrolledLeft,
					value: true
				}) : dispatch({
					type: import_react_table.actions.setScrolledLeft,
					value: false
				});
			};
			import_react$51.useEffect(() => {
				updateStickyState();
			}, []);
			let captionId = useId();
			return import_react$51.createElement(TableInstanceContext.Provider, { value: instance }, import_react$51.createElement(Box, {
				ref: useMergedRefs(tableRef, resizeRef, import_react$51.useCallback((element) => {
					ownerDocument.current = element?.ownerDocument;
				}, [])),
				id,
				...getTableProps({
					className: (0, import_classnames$1.default)("iui-table", className),
					style: {
						minWidth: 0,
						...style
					}
				}),
				role,
				onScroll: () => updateStickyState(),
				"data-iui-size": "default" === density ? void 0 : density,
				...outerAriaRestAttributes,
				...nonAriaRestAttributes
			}, import_react$51.createElement(ShadowRoot, null, import_react$51.createElement("div", {
				role: "table",
				...innerAriaRestAttributes,
				...tableProps,
				"aria-labelledby": captionId
			}, import_react$51.createElement(VisuallyHidden, { id: captionId }, caption), import_react$51.createElement("slot", { name: "iui-table-header-wrapper" }), import_react$51.createElement("slot", { name: "iui-table-body" })), import_react$51.createElement("slot", { name: "iui-table-body-extra" }), import_react$51.createElement("slot", null)), headerGroups.map((headerGroup) => {
				headerGroup.headers = headerGroup.headers.filter((header) => !header.id.includes("iui-table-checkbox-selector_placeholder") && !header.id.includes("iui-table-expander_placeholder"));
				let headerGroupProps = headerGroup.getHeaderGroupProps({ className: "iui-table-row" });
				return import_react$51.createElement(Box, {
					slot: "iui-table-header-wrapper",
					as: "div",
					key: headerGroupProps.key,
					...headerWrapperProps,
					className: (0, import_classnames$1.default)("iui-table-header-wrapper", headerWrapperProps?.className)
				}, import_react$51.createElement(Box, {
					as: "div",
					...headerProps,
					className: (0, import_classnames$1.default)("iui-table-header", headerProps?.className)
				}, import_react$51.createElement(Box, {
					...headerGroupProps,
					key: headerGroupProps.key
				}, headerGroup.headers.map((column, index) => {
					let dragAndDropProps = column.getDragAndDropProps();
					return import_react$51.createElement(ColumnHeader, {
						...dragAndDropProps,
						key: dragAndDropProps.key || column.id || index,
						column,
						areFiltersSet,
						columnHasExpanders: hasAnySubRows && index === headerGroup.headers.findIndex((c) => c.id !== "iui-table-checkbox-selector"),
						isLast: index === headerGroup.headers.length - 1,
						isTableEmpty: 0 === data.length,
						isResizable,
						columnResizeMode,
						enableColumnReordering,
						density,
						ref: (el) => {
							if (el) columnRefs.current[column.id] = el;
						}
					});
				}))));
			}), import_react$51.createElement(Box, {
				slot: "iui-table-body",
				as: "div",
				...bodyProps,
				...getTableBodyProps({ className: (0, import_classnames$1.default)("iui-table-body", { "iui-zebra-striping": "zebra-rows" === styleType }, bodyProps?.className) }),
				role: void 0
			}, import_react$51.createElement(ShadowRoot, {
				css: virtualizerCss,
				flush: false
			}, enableVirtualization && 0 !== data.length ? import_react$51.createElement("div", {
				"data-iui-virtualizer": "root",
				style: { minBlockSize: virtualizer.getTotalSize() }
			}, import_react$51.createElement("slot", null)) : import_react$51.createElement("slot", null)), 0 !== data.length && import_react$51.createElement(import_react$51.Fragment, null, enableVirtualization ? virtualizer.getVirtualItems().map((virtualItem) => getPreparedRow(virtualItem.index, virtualItem, virtualizer)) : page.map((_, index) => getPreparedRow(index)))), isLoading && 0 === data.length && import_react$51.createElement(TableBodyExtraWrapper, null, import_react$51.createElement(TableEmptyWrapper, emptyTableContentProps, import_react$51.createElement(ProgressRadial, { indeterminate: true }))), !isLoading && 0 === data.length && !areFiltersSet && import_react$51.createElement(TableBodyExtraWrapper, null, import_react$51.createElement(TableEmptyWrapper, emptyTableContentProps, import_react$51.createElement("div", null, emptyTableContent))), !isLoading && (0 === data.length || 0 === rows.length) && areFiltersSet && import_react$51.createElement(TableBodyExtraWrapper, null, import_react$51.createElement(TableEmptyWrapper, emptyTableContentProps, import_react$51.createElement("div", null, emptyFilteredTableContent))), isLoading && 0 !== data.length && import_react$51.createElement(TableBodyExtraWrapper, { "data-iui-loading": "true" }, import_react$51.createElement(ProgressRadial, {
				indeterminate: true,
				size: "small"
			})), paginatorRenderer?.(paginatorRendererProps)));
		};
		TableBodyExtraWrapper = import_react$51.forwardRef((props, ref) => {
			let { children, ...rest } = props;
			return import_react$51.createElement(Box, {
				as: "div",
				ref,
				slot: "iui-table-body-extra",
				...rest,
				className: (0, import_classnames$1.default)("iui-table-body-extra", rest.className)
			}, children);
		});
		TableEmptyWrapper = import_react$51.forwardRef((props, ref) => {
			let { children, ...rest } = props;
			return import_react$51.createElement(Box, {
				as: "div",
				ref,
				...rest,
				className: (0, import_classnames$1.default)("iui-table-empty", rest.className)
			}, children);
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/IModelInterfaces.js
var IModelState, ContainerTypes;
function init_IModelInterfaces() {
	return (init_IModelInterfaces = __esmMin((() => {
		(function(IModelState) {
			/**
			* Not initialized iModel. iModel is not yet initialized and the server-side background initialization
			* process is still running. Initialization could take several minutes.
			*/
			IModelState["NotInitialized"] = "notInitialized";
			/** Initialized iModel. It means that iModel initialization has completed and iModel is ready to use. */
			IModelState["Initialized"] = "initialized";
		})(IModelState || (IModelState = {}));
		(function(ContainerTypes) {
			ContainerTypes[ContainerTypes["None"] = 0] = "None";
			ContainerTypes[ContainerTypes["SchemaSync"] = 1] = "SchemaSync";
			ContainerTypes[ContainerTypes["CodeStore"] = 2] = "CodeStore";
			ContainerTypes[ContainerTypes["ViewStore"] = 4] = "ViewStore";
		})(ContainerTypes || (ContainerTypes = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/ChangesetInterfaces.js
var ChangesetState, ContainingChanges;
function init_ChangesetInterfaces() {
	return (init_ChangesetInterfaces = __esmMin((() => {
		(function(ChangesetState) {
			/** Changeset instance is created but file is not uploaded. The Changeset creation is not complete. */
			ChangesetState["WaitingForFile"] = "waitingForFile";
			/** The Changeset file is uploaded and creation is complete. */
			ChangesetState["FileUploaded"] = "fileUploaded";
		})(ChangesetState || (ChangesetState = {}));
		(function(ContainingChanges) {
			ContainingChanges[ContainingChanges["Regular"] = 0] = "Regular";
			ContainingChanges[ContainingChanges["Schema"] = 1] = "Schema";
			ContainingChanges[ContainingChanges["Definition"] = 2] = "Definition";
			ContainingChanges[ContainingChanges["SpatialData"] = 4] = "SpatialData";
			ContainingChanges[ContainingChanges["SheetsAndDrawings"] = 8] = "SheetsAndDrawings";
			ContainingChanges[ContainingChanges["ViewsAndModels"] = 16] = "ViewsAndModels";
			ContainingChanges[ContainingChanges["GlobalProperties"] = 32] = "GlobalProperties";
			ContainingChanges[ContainingChanges["SchemaSync"] = 64] = "SchemaSync";
		})(ContainingChanges || (ContainingChanges = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/ChangesetGroupInterfaces.js
var ChangesetGroupState;
function init_ChangesetGroupInterfaces() {
	return (init_ChangesetGroupInterfaces = __esmMin((() => {
		(function(ChangesetGroupState) {
			/** Changeset Group is in progress and Changesets can be pushed to it. */
			ChangesetGroupState["InProgress"] = "inProgress";
			/** Changeset Group is closed and Changesets cannot be pushed to it anymore. */
			ChangesetGroupState["Completed"] = "completed";
			/** Changeset Group was not completed within the specified timeout period so it was closed by the service. */
			ChangesetGroupState["TimedOut"] = "timedOut";
			/** Changeset group was forcibly closed before cloning to the target iModel. */
			ChangesetGroupState["ForciblyClosed"] = "forciblyClosed";
		})(ChangesetGroupState || (ChangesetGroupState = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/NamedVersionInterfaces.js
var NamedVersionState;
function init_NamedVersionInterfaces() {
	return (init_NamedVersionInterfaces = __esmMin((() => {
		(function(NamedVersionState) {
			/** Visible. Named Version should be present in displayed Named Version lists. */
			NamedVersionState["Visible"] = "visible";
			/** Hidden. Named Version is intended to be hidden in displayed Named Version lists. */
			NamedVersionState["Hidden"] = "hidden";
		})(NamedVersionState || (NamedVersionState = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/CheckpointInterfaces.js
var CheckpointState;
function init_CheckpointInterfaces() {
	return (init_CheckpointInterfaces = __esmMin((() => {
		(function(CheckpointState) {
			/** Checkpoint generation completed successfully. */
			CheckpointState["Successful"] = "successful";
			/** Checkpoint generation is not yet complete, the background job is scheduled. */
			CheckpointState["Scheduled"] = "scheduled";
			/** Checkpoint generation failed. */
			CheckpointState["Failed"] = "failed";
			/** Checkpoint is not generated and the background job is not scheduled. */
			CheckpointState["NotGenerated"] = "notGenerated";
		})(CheckpointState || (CheckpointState = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/ThumbnailInterfaces.js
var ThumbnailSize;
function init_ThumbnailInterfaces() {
	return (init_ThumbnailInterfaces = __esmMin((() => {
		(function(ThumbnailSize) {
			/** A small Thumbnail is a 400x250 PNG image. */
			ThumbnailSize["Small"] = "small";
			/** A large Thumbnail is a 800x500 PNG image. */
			ThumbnailSize["Large"] = "large";
		})(ThumbnailSize || (ThumbnailSize = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/UserPermissionInterfaces.js
var IModelPermission;
function init_UserPermissionInterfaces() {
	return (init_UserPermissionInterfaces = __esmMin((() => {
		(function(IModelPermission) {
			/** Allows to view iModel in web browser, but does not allow to get its local copy and view in desktop app. */
			IModelPermission["WebView"] = "imodels_webview";
			/** Allows to open and view an iModel only in read-only state. */
			IModelPermission["Read"] = "imodels_read";
			/**
			* Allows to make changes to an iModel. Allows to create and modify Named Versions. Allows to create mapping
			* between PW connection and iModel to facilitate connectors.
			*/
			IModelPermission["Write"] = "imodels_write";
			/**
			* Allows to create an iModel. Allows to configure access per iModel. Allows to manage Locks or local copies
			* for the entire iModel. This Permission is both iModel and iTwin level Permission, but Create iModel operation
			* requires that user has `imodels_manage` Permission on the iTwin level. Use
			* {@link https://developer.bentley.com/apis/access-control/operations/get-itwin-permissions/ Access Control API}
			* to check if user can create an iModel on a given iTwin.
			*/
			IModelPermission["Manage"] = "imodels_manage";
			/**
			* Allows to delete an iModel. This Permission is only available on the iTwin level. Use
			* {@link https://developer.bentley.com/apis/access-control/operations/get-itwin-permissions/ Access Control API}
			* to check if user can delete iModels on a given iTwin. */
			IModelPermission["Delete"] = "imodels-delete";
		})(IModelPermission || (IModelPermission = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/OperationInterfaces.js
var IModelCreationState;
function init_OperationInterfaces() {
	return (init_OperationInterfaces = __esmMin((() => {
		(function(IModelCreationState) {
			/** iModel creation process completed successfully. */
			IModelCreationState["Successful"] = "successful";
			/** iModel is being created from a Baseline File and the file upload to file storage has not been completed yet. */
			IModelCreationState["WaitingForFile"] = "waitingForFile";
			/** iModel creation process is scheduled or in progress. */
			IModelCreationState["Scheduled"] = "scheduled";
			/** iModel creation process failed. */
			IModelCreationState["Failed"] = "failed";
			/** iModel fork creation failed because some elements in the main iModel do not have FederationGuid property set. */
			IModelCreationState["MainIModelIsMissingFederationGuids"] = "mainIModelIsMissingFederationGuids";
		})(IModelCreationState || (IModelCreationState = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/iterators/IteratorUtilFunctions.js
/**
* Transforms an iterator of entity pages into an iterator of entities.
* @param {AsyncIterableIterator<TEntity[]>} pagedIterator iterator of entity pages.
* @returns {AsyncIterableIterator<TEntity>} iterator of entities.
*/
async function* flatten(pagedIterator) {
	for await (const entityChunk of pagedIterator) for (const entity of entityChunk) yield entity;
}
/**
* Loads all entities from an iterator into an array.
* @param {AsyncIterableIterator<TEntity>} iterator entity iterator.
* @returns {Promise<TEntity[]>} entity array.
*/
async function toArray$1(iterator) {
	const result = [];
	for await (const entity of iterator) result.push(entity);
	return result;
}
/**
* Loads top n entities from an iterator into an array.
* @param {AsyncIterableIterator<TSource>} iterator source entity iterator.
* @param {number} entityCount number of entities to load.
* @returns {Promise<TEntity[]>} entity array that contains a number of top elements specified. If iterator contains
* less items than specified in `entityCount` length of the array will be less than `entityCount`. If
* iterator contains no entities the array will be empty.
*/
async function take(iterator, entityCount) {
	const result = [];
	for await (const entity of iterator) {
		result.push(entity);
		if (result.length === entityCount) break;
	}
	return result;
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/RestClient.js
var ContentType;
function init_RestClient() {
	return (init_RestClient = __esmMin((() => {
		(function(ContentType) {
			ContentType["Json"] = "application/json";
			ContentType["Png"] = "image/png";
			ContentType["Jpeg"] = "image/jpeg";
		})(ContentType || (ContentType = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/CommonInterfaces.js
var OrderByOperator, PreferReturn;
function init_CommonInterfaces() {
	return (init_CommonInterfaces = __esmMin((() => {
		(function(OrderByOperator) {
			/** Ascending. Entities will be returned in ascending order. */
			OrderByOperator["Ascending"] = "asc";
			/** Descending. Entities will be returned in descending order. */
			OrderByOperator["Descending"] = "desc";
		})(OrderByOperator || (OrderByOperator = {}));
		(function(PreferReturn) {
			/** Instructs the server to return minimal entity representation. */
			PreferReturn["Minimal"] = "minimal";
			/** Instructs the server to return full entity representation. */
			PreferReturn["Representation"] = "representation";
		})(PreferReturn || (PreferReturn = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/IModelsErrorInterfaces.js
function isIModelsApiError(error) {
	const errorCode = error?.code;
	return errorCode !== void 0 && typeof errorCode === "string";
}
var IModelsErrorScope, IModelsErrorCode;
function init_IModelsErrorInterfaces() {
	return (init_IModelsErrorInterfaces = __esmMin((() => {
		IModelsErrorScope = "imodels-clients";
		(function(IModelsErrorCode) {
			IModelsErrorCode["AnotherUserPushing"] = "AnotherUserPushing";
			IModelsErrorCode["BaselineFileInitializationFailed"] = "BaselineFileInitializationFailed";
			IModelsErrorCode["BaselineFileInitializationTimedOut"] = "BaselineFileInitializationTimedOut";
			IModelsErrorCode["BaselineFileNotFound"] = "BaselineFileNotFound";
			IModelsErrorCode["BriefcaseNotFound"] = "BriefcaseNotFound";
			IModelsErrorCode["CannotAcquire"] = "CannotAcquire";
			IModelsErrorCode["ChangesetDownloadFailed"] = "ChangesetDownloadFailed";
			IModelsErrorCode["ChangesetExists"] = "ChangesetExists";
			IModelsErrorCode["ChangesetExtendedDataNotFound"] = "ChangesetExtendedDataNotFound";
			IModelsErrorCode["ChangesetGroupNotFound"] = "ChangesetGroupNotFound";
			IModelsErrorCode["ChangesetNotFound"] = "ChangesetNotFound";
			IModelsErrorCode["CheckpointNotFound"] = "CheckpointNotFound";
			IModelsErrorCode["ClonedIModelInitializationFailed"] = "ClonedIModelInitializationFailed";
			IModelsErrorCode["ClonedIModelInitializationTimedOut"] = "ClonedIModelInitializationTimedOut";
			IModelsErrorCode["ConflictWithAnotherUser"] = "ConflictWithAnotherUser";
			IModelsErrorCode["DataConflict"] = "DataConflict";
			IModelsErrorCode["DownloadAborted"] = "DownloadAborted";
			IModelsErrorCode["DownloadCancelled"] = "DownloadCancelled";
			IModelsErrorCode["EmptyIModelInitializationFailed"] = "EmptyIModelInitializationFailed";
			IModelsErrorCode["FileNotFound"] = "FileNotFound";
			IModelsErrorCode["IModelExists"] = "iModelExists";
			IModelsErrorCode["IModelForkInitializationFailed"] = "IModelForkInitializationFailed";
			IModelsErrorCode["IModelForkInitializationTimedOut"] = "IModelForkInitializationTimedOut";
			IModelsErrorCode["IModelFromTemplateInitializationFailed"] = "IModelFromTemplateInitializationFailed";
			IModelsErrorCode["IModelFromTemplateInitializationTimedOut"] = "IModelFromTemplateInitializationTimedOut";
			IModelsErrorCode["IModelNotFound"] = "iModelNotFound";
			IModelsErrorCode["InsufficientPermissions"] = "InsufficientPermissions";
			IModelsErrorCode["InvalidChange"] = "InvalidChange";
			IModelsErrorCode["InvalidHeaderValue"] = "InvalidHeaderValue";
			IModelsErrorCode["InvalidIModelGCSCreationMode"] = "InvalidIModelGCSCreationMode";
			IModelsErrorCode["InvalidIModelsRequest"] = "InvalidiModelsRequest";
			IModelsErrorCode["InvalidRequestBody"] = "InvalidRequestBody";
			IModelsErrorCode["InvalidThumbnailFormat"] = "InvalidThumbnailFormat";
			IModelsErrorCode["InvalidValue"] = "InvalidValue";
			IModelsErrorCode["ITwinNotFound"] = "iTwinNotFound";
			IModelsErrorCode["LockNotFound"] = "LockNotFound";
			IModelsErrorCode["LockOwnedByAnotherBriefcase"] = "LockOwnedByAnotherBriefcase";
			IModelsErrorCode["MainIModelIsMissingFederationGuids"] = "MainIModelIsMissingFederationGuids";
			IModelsErrorCode["MaximumNumberOfBriefcasesPerUser"] = "MaximumNumberOfBriefcasesPerUser";
			IModelsErrorCode["MaximumNumberOfBriefcasesPerUserPerMinute"] = "MaximumNumberOfBriefcasesPerUserPerMinute";
			IModelsErrorCode["MissingRequestBody"] = "MissingRequestBody";
			IModelsErrorCode["MissingRequiredHeader"] = "MissingRequiredHeader";
			IModelsErrorCode["MissingRequiredParameter"] = "MissingRequiredParameter";
			IModelsErrorCode["MissingRequiredProperty"] = "MissingRequiredProperty";
			IModelsErrorCode["MutuallyExclusiveParametersProvided"] = "MutuallyExclusiveParametersProvided";
			IModelsErrorCode["MutuallyExclusivePropertiesProvided"] = "MutuallyExclusivePropertiesProvided";
			IModelsErrorCode["NamedVersionNotFound"] = "NamedVersionNotFound";
			IModelsErrorCode["NamedVersionOnChangesetExists"] = "NamedVersionOnChangesetExists";
			IModelsErrorCode["NewerChangesExist"] = "NewerChangesExist";
			IModelsErrorCode["RateLimitExceeded"] = "RateLimitExceeded";
			IModelsErrorCode["RequestTooLarge"] = "RequestTooLarge";
			IModelsErrorCode["ResourceQuotaExceeded"] = "ResourceQuotaExceeded";
			IModelsErrorCode["StorageTypeNotSupported"] = "StorageTypeNotSupported";
			IModelsErrorCode["TooManyRequests"] = "TooManyRequests";
			IModelsErrorCode["Unauthorized"] = "Unauthorized";
			IModelsErrorCode["Unknown"] = "Unknown";
			IModelsErrorCode["Unrecognized"] = "Unrecognized";
			IModelsErrorCode["UserNotFound"] = "UserNotFound";
			IModelsErrorCode["VersionExists"] = "NamedVersionExists";
		})(IModelsErrorCode || (IModelsErrorCode = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/index.js
function init_types() {
	return (init_types = __esmMin((() => {
		init_IModelInterfaces();
		init_ChangesetInterfaces();
		init_ChangesetGroupInterfaces();
		init_NamedVersionInterfaces();
		init_CheckpointInterfaces();
		init_ThumbnailInterfaces();
		init_UserPermissionInterfaces();
		init_OperationInterfaces();
		init_RestClient();
		init_CommonInterfaces();
		init_IModelsErrorInterfaces();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/iterators/EntityPageListIterator.js
var EntityPageListIterator;
function init_EntityPageListIterator() {
	return (init_EntityPageListIterator = __esmMin((() => {
		EntityPageListIterator = class {
			_entityPages;
			constructor(pageQueryFunc) {
				this._entityPages = this.queryPages(pageQueryFunc);
			}
			[Symbol.asyncIterator]() {
				return this;
			}
			async next() {
				return this._entityPages.next();
			}
			async *queryPages(pageQueryFunc) {
				let nextPageQueryFunc = pageQueryFunc;
				while (nextPageQueryFunc) {
					const entityPage = await nextPageQueryFunc();
					nextPageQueryFunc = entityPage.next;
					yield entityPage.entities;
				}
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/iterators/EntityListIteratorImpl.js
var EntityListIteratorImpl;
function init_EntityListIteratorImpl() {
	return (init_EntityListIteratorImpl = __esmMin((() => {
		init_types();
		init_EntityPageListIterator();
		EntityListIteratorImpl = class {
			_entityPages;
			_entities;
			constructor(pageQueryFunc) {
				this._entityPages = new EntityPageListIterator(pageQueryFunc);
				this._entities = flatten(this._entityPages);
			}
			[Symbol.asyncIterator]() {
				return this;
			}
			async next() {
				return this._entities.next();
			}
			byPage() {
				return this._entityPages;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/IModelsErrorParser.js
var IModelsErrorBaseImpl, IModelsErrorImpl, IModelsErrorParser;
function init_IModelsErrorParser() {
	return (init_IModelsErrorParser = __esmMin((() => {
		init_types();
		IModelsErrorBaseImpl = class extends Error {
			code;
			originalError;
			constructor(params) {
				super();
				this.name = this.code = params.code;
				this.message = params.message;
				this.originalError = params.originalError;
			}
		};
		IModelsErrorImpl = class extends IModelsErrorBaseImpl {
			details;
			statusCode;
			constructor(params) {
				super(params);
				this.details = params.details;
				this.statusCode = params.statusCode;
			}
		};
		IModelsErrorParser = class IModelsErrorParser {
			static _defaultErrorMessage = "Unknown error occurred";
			static _defaultUnauthorizedMessage = "Authorization failed";
			static parse(response, originalError) {
				if (!response.body) return IModelsErrorParser.createUnrecognizedError(response, originalError);
				if (response.statusCode === 401) return IModelsErrorParser.createUnauthorizedError(response, originalError);
				const errorFromApi = response.body;
				const errorCode = IModelsErrorParser.parseCode(errorFromApi?.error?.code);
				if (errorCode === IModelsErrorCode.Unrecognized) return IModelsErrorParser.createUnrecognizedError(response, originalError);
				const errorDetails = IModelsErrorParser.parseDetails(errorFromApi.error?.details);
				const errorMessage = IModelsErrorParser.parseAndFormatMessage(errorFromApi?.error?.message, errorDetails);
				return new IModelsErrorImpl({
					code: errorCode,
					statusCode: response.statusCode,
					originalError,
					message: errorMessage,
					details: errorDetails
				});
			}
			static parseCode(errorCode) {
				if (!errorCode) return IModelsErrorCode.Unrecognized;
				const adjustedErrorCode = IModelsErrorParser.adjustErrorCodeCaseToMatchEnum(errorCode);
				let parsedCode = IModelsErrorCode[adjustedErrorCode];
				if (!parsedCode) parsedCode = IModelsErrorCode.Unrecognized;
				return parsedCode;
			}
			static adjustErrorCodeCaseToMatchEnum(errorCode) {
				return errorCode.replace("iModel", "IModel").replace("iTwin", "ITwin");
			}
			static parseDetails(details) {
				if (!details) return void 0;
				return details.map((unparsedDetail) => {
					return {
						...unparsedDetail,
						code: this.parseCode(unparsedDetail.code)
					};
				});
			}
			static parseAndFormatMessage(message, errorDetails) {
				let result = message ?? IModelsErrorParser._defaultErrorMessage;
				if (!errorDetails || errorDetails.length === 0) return result;
				result += " Details:\n";
				for (let i = 0; i < errorDetails.length; i++) {
					result += `${i + 1}. ${errorDetails[i].code}: ${errorDetails[i].message}`;
					if (errorDetails[i].target) result += ` Target: ${errorDetails[i].target}.`;
					result += "\n";
				}
				return result;
			}
			static createUnrecognizedError(response, originalError) {
				return new IModelsErrorImpl({
					code: IModelsErrorCode.Unrecognized,
					statusCode: response.statusCode,
					originalError,
					message: `${IModelsErrorParser._defaultErrorMessage}.\nOriginal error message: ${originalError.message},\noriginal error code: ${originalError.code},\nresponse status code: ${response.statusCode},\nresponse body: ${JSON.stringify(response.body)}`,
					details: void 0
				});
			}
			static createUnauthorizedError(response, originalError) {
				const errorMessage = response.body?.error?.message ?? response.body?.message ?? IModelsErrorParser._defaultUnauthorizedMessage;
				return new IModelsErrorImpl({
					code: IModelsErrorCode.Unauthorized,
					statusCode: response.statusCode,
					originalError,
					message: errorMessage,
					details: void 0
				});
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/Constants.js
var Constants$1;
function init_Constants() {
	return (init_Constants = __esmMin((() => {
		Constants$1 = class {
			static api = {
				baseUrl: "https://api.bentley.com/imodels",
				version: "itwin-platform.v2"
			};
			static headers = {
				accept: "Accept",
				authorization: "Authorization",
				contentType: "Content-Type",
				prefer: "Prefer",
				location: "Location"
			};
			static time = {
				sleepPeriodInMs: 1e3,
				iModelInitializationTimeOutInMs: 3e5
			};
			static httpStatusCodes = { internalServerError: 500 };
			static retryPolicy = {
				maxRetries: 3,
				baseDelayInMs: 300,
				delayFactor: 3
			};
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/OperationsBase.js
var OperationsBase;
function init_OperationsBase() {
	return (init_OperationsBase = __esmMin((() => {
		init_Constants();
		init_types();
		init_IModelsErrorParser();
		OperationsBase = class {
			_options;
			constructor(_options) {
				this._options = _options;
			}
			async sendGetRequest(params) {
				const urlAndHeaders = {
					url: params.url,
					headers: await this.formHeaders(params)
				};
				if (params.responseType === ContentType.Png) return this.executeRequest(async () => this._options.restClient.sendGetRequest({
					responseType: ContentType.Png,
					...urlAndHeaders
				}));
				const responseType = params.responseType ?? ContentType.Json;
				return this.executeRequest(async () => this._options.restClient.sendGetRequest({
					responseType,
					...urlAndHeaders
				}));
			}
			async sendPostRequest(params) {
				return this.executeRequest(async () => this._options.restClient.sendPostRequest({
					url: params.url,
					body: {
						contentType: ContentType.Json,
						content: params.body
					},
					headers: await this.formHeaders({
						...params,
						contentType: ContentType.Json
					})
				}));
			}
			async sendPutRequest(params) {
				const body = params.contentType ? {
					contentType: params.contentType,
					content: params.body
				} : void 0;
				return this.executeRequest(async () => this._options.restClient.sendPutRequest({
					url: params.url,
					body,
					headers: await this.formHeaders({
						...params,
						contentType: params.contentType
					})
				}));
			}
			async sendPatchRequest(params) {
				return this.executeRequest(async () => this._options.restClient.sendPatchRequest({
					url: params.url,
					body: {
						contentType: ContentType.Json,
						content: params.body
					},
					headers: await this.formHeaders({
						...params,
						contentType: ContentType.Json
					})
				}));
			}
			async sendDeleteRequest(params) {
				return this.executeRequest(async () => this._options.restClient.sendDeleteRequest({
					url: params.url,
					headers: await this.formHeaders(params)
				}));
			}
			async getEntityCollectionPage(params) {
				const response = await this.executeRequest(async () => this.sendGetRequest(params));
				return {
					entities: params.entityCollectionAccessor(response),
					next: response.body._links.next ? async () => this.getEntityCollectionPage({
						...params,
						url: response.body._links.next.href
					}) : void 0
				};
			}
			async executeRequest(requestFunc) {
				try {
					return await requestFunc();
				} catch (error) {
					if (error instanceof IModelsErrorBaseImpl) throw error;
					throw this._options.parseErrorFunc({
						statusCode: error.response?.status,
						body: error.response?.data
					}, error);
				}
			}
			resolveHeaderValue(headerOrHeaderFactory) {
				if (typeof headerOrHeaderFactory === "function") return headerOrHeaderFactory();
				return headerOrHeaderFactory;
			}
			addOrUpdateHeaders(existingHeaders, additionalHeaders) {
				if (!additionalHeaders) return;
				for (const headerName in additionalHeaders) if (Object.prototype.hasOwnProperty.call(additionalHeaders, headerName)) {
					const headerValue = this.resolveHeaderValue(additionalHeaders[headerName]);
					if (typeof headerValue === "string") existingHeaders[headerName] = headerValue;
					else delete existingHeaders[headerName];
				}
			}
			async formHeaders(params) {
				const headers = {};
				const authorizationInfo = await params.authorization();
				headers[Constants$1.headers.authorization] = `${authorizationInfo.scheme} ${authorizationInfo.token}`;
				headers[Constants$1.headers.accept] = `application/vnd.bentley.${this._options.api.version}+json`;
				if (params.preferReturn) headers[Constants$1.headers.prefer] = `return=${params.preferReturn}`;
				if (params.contentType) headers[Constants$1.headers.contentType] = params.contentType;
				this.addOrUpdateHeaders(headers, this._options.headers);
				this.addOrUpdateHeaders(headers, params.headers);
				return headers;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/UtilityFunctions.js
var UtilityFunctions;
function init_UtilityFunctions() {
	return (init_UtilityFunctions = __esmMin((() => {
		init_Constants();
		(function(UtilityFunctions) {
			async function sleep(ms) {
				return new Promise((resolve) => setTimeout(resolve, ms));
			}
			UtilityFunctions.sleep = sleep;
			async function waitForCondition(params) {
				const sleepPeriodInMs = Constants$1.time.sleepPeriodInMs;
				const timeOutInMs = params.timeOutInMs ?? Constants$1.time.iModelInitializationTimeOutInMs;
				for (let retries = Math.ceil(timeOutInMs / sleepPeriodInMs); retries > 0; --retries) {
					if (await params.conditionToSatisfy()) return;
					await sleep(sleepPeriodInMs);
				}
				throw params.timeoutErrorFactory();
			}
			UtilityFunctions.waitForCondition = waitForCondition;
		})(UtilityFunctions || (UtilityFunctions = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/index.js
function init_internal() {
	return (init_internal = __esmMin((() => {
		init_EntityListIteratorImpl();
		init_IModelsErrorParser();
		init_OperationsBase();
		init_UtilityFunctions();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/axios/AxiosResponseHeadersAdapter.js
var AxiosResponseHeadersAdapter;
function init_AxiosResponseHeadersAdapter() {
	return (init_AxiosResponseHeadersAdapter = __esmMin((() => {
		AxiosResponseHeadersAdapter = class {
			_response;
			constructor(response) {
				this._response = response;
			}
			get(headerName) {
				if (this._response.headers.get instanceof Function) return this._response.headers.get(headerName);
				return this._response.headers[headerName.toLowerCase()];
			}
			getAll() {
				return this._response.headers;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/bind.js
/**
* Create a bound version of a function with a specified `this` context
*
* @param {Function} fn - The function to bind
* @param {*} thisArg - The value to be passed as the `this` parameter
* @returns {Function} A new function that will call the original function with the specified `this` context
*/
function bind(fn, thisArg) {
	return function wrap() {
		return fn.apply(thisArg, arguments);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/utils.js
/**
* Determine if a value is a Buffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Buffer, otherwise false
*/
function isBuffer(val) {
	return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
/**
* Determine if a value is a view on an ArrayBuffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
*/
function isArrayBufferView(val) {
	let result;
	if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
	else result = val && val.buffer && isArrayBuffer(val.buffer);
	return result;
}
/**
* Determine if a value is a FormData
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value is an FormData, otherwise false
*/
function getGlobal() {
	if (typeof globalThis !== "undefined") return globalThis;
	if (typeof self !== "undefined") return self;
	if (typeof window !== "undefined") return window;
	if (typeof global !== "undefined") return global;
	return {};
}
/**
* Iterate over an Array or an Object invoking a function for each item.
*
* If `obj` is an Array callback will be called passing
* the value, index, and complete array for each item.
*
* If 'obj' is an Object callback will be called passing
* the value, key, and complete object for each property.
*
* @param {Object|Array<unknown>} obj The object to iterate
* @param {Function} fn The callback to invoke for each item
*
* @param {Object} [options]
* @param {Boolean} [options.allOwnKeys = false]
* @returns {any}
*/
function forEach(obj, fn, { allOwnKeys = false } = {}) {
	if (obj === null || typeof obj === "undefined") return;
	let i;
	let l;
	if (typeof obj !== "object") obj = [obj];
	if (isArray(obj)) for (i = 0, l = obj.length; i < l; i++) fn.call(null, obj[i], i, obj);
	else {
		if (isBuffer(obj)) return;
		const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
		const len = keys.length;
		let key;
		for (i = 0; i < len; i++) {
			key = keys[i];
			fn.call(null, obj[key], key, obj);
		}
	}
}
/**
* Finds a key in an object, case-insensitive, returning the actual key name.
* Returns null if the object is a Buffer or if no match is found.
*
* @param {Object} obj - The object to search.
* @param {string} key - The key to find (case-insensitive).
* @returns {?string} The actual key name if found, otherwise null.
*/
function findKey(obj, key) {
	if (isBuffer(obj)) return null;
	key = key.toLowerCase();
	const keys = Object.keys(obj);
	let i = keys.length;
	let _key;
	while (i-- > 0) {
		_key = keys[i];
		if (key === _key.toLowerCase()) return _key;
	}
	return null;
}
/**
* Accepts varargs expecting each argument to be an object, then
* immutably merges the properties of each object and returns result.
*
* When multiple objects contain the same key the later object in
* the arguments list will take precedence.
*
* Example:
*
* ```js
* const result = merge({foo: 123}, {foo: 456});
* console.log(result.foo); // outputs 456
* ```
*
* @param {Object} obj1 Object to merge
*
* @returns {Object} Result of all merge properties
*/
function merge(...objs) {
	const { caseless, skipUndefined } = isContextDefined(this) && this || {};
	const result = {};
	const assignValue = (val, key) => {
		if (key === "__proto__" || key === "constructor" || key === "prototype") return;
		const targetKey = caseless && typeof key === "string" && findKey(result, key) || key;
		const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : void 0;
		if (isPlainObject(existing) && isPlainObject(val)) result[targetKey] = merge(existing, val);
		else if (isPlainObject(val)) result[targetKey] = merge({}, val);
		else if (isArray(val)) result[targetKey] = val.slice();
		else if (!skipUndefined || !isUndefined(val)) result[targetKey] = val;
	};
	for (let i = 0, l = objs.length; i < l; i++) {
		const source = objs[i];
		if (!source || isBuffer(source)) continue;
		forEach(source, assignValue);
		if (typeof source !== "object" || isArray(source)) continue;
		const symbols = Object.getOwnPropertySymbols(source);
		for (let j = 0; j < symbols.length; j++) {
			const symbol = symbols[j];
			if (propertyIsEnumerable.call(source, symbol)) assignValue(source[symbol], symbol);
		}
	}
	return result;
}
/**
* If the thing is a FormData object, return true, otherwise return false.
*
* @param {unknown} thing - The thing to check.
*
* @returns {boolean}
*/
function isSpecCompliantForm(thing) {
	return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
var toString, getPrototypeOf, iterator, toStringTag, hasOwnProperty, hasOwnInPrototypeChain, getSafeProp, kindOf, kindOfTest, typeOfTest, isArray, isUndefined, isArrayBuffer, isString, isFunction$1, isNumber, isObject, isBoolean, isPlainObject, isEmptyObject, isDate, isFile, isReactNativeBlob, isReactNative, isBlob, isFileList, isStream, G, FormDataCtor, isFormData, isURLSearchParams, isReadableStream, isRequest, isResponse, isHeaders, trim, _global, isContextDefined, extend, stripBOM, inherits, toFlatObject, endsWith, toArray, isTypedArray, forEachEntry, matchAll, isHTMLForm, toCamelCase, propertyIsEnumerable, isRegExp, reduceDescriptors, freezeMethods, toObjectSet, noop, toFiniteNumber, toJSONObject, isAsyncFn, isThenable, _setImmediate, asap, isIterable, isSafeIterable, utils_default;
function init_utils$1() {
	return (init_utils$1 = __esmMin((() => {
		({toString} = Object.prototype);
		({getPrototypeOf} = Object);
		({iterator, toStringTag} = Symbol);
		hasOwnProperty = (({ hasOwnProperty }) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);
		hasOwnInPrototypeChain = (thing, prop) => {
			let obj = thing;
			const seen = [];
			while (obj != null && obj !== Object.prototype) {
				if (seen.indexOf(obj) !== -1) return false;
				seen.push(obj);
				if (hasOwnProperty(obj, prop)) return true;
				obj = getPrototypeOf(obj);
			}
			return false;
		};
		getSafeProp = (obj, prop) => obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : void 0;
		kindOf = ((cache) => (thing) => {
			const str = toString.call(thing);
			return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
		})(Object.create(null));
		kindOfTest = (type) => {
			type = type.toLowerCase();
			return (thing) => kindOf(thing) === type;
		};
		typeOfTest = (type) => (thing) => typeof thing === type;
		({isArray} = Array);
		isUndefined = typeOfTest("undefined");
		isArrayBuffer = kindOfTest("ArrayBuffer");
		isString = typeOfTest("string");
		isFunction$1 = typeOfTest("function");
		isNumber = typeOfTest("number");
		isObject = (thing) => thing !== null && typeof thing === "object";
		isBoolean = (thing) => thing === true || thing === false;
		isPlainObject = (val) => {
			if (!isObject(val)) return false;
			const prototype = getPrototypeOf(val);
			return (prototype === null || prototype === Object.prototype || getPrototypeOf(prototype) === null) && !hasOwnInPrototypeChain(val, toStringTag) && !hasOwnInPrototypeChain(val, iterator);
		};
		isEmptyObject = (val) => {
			if (!isObject(val) || isBuffer(val)) return false;
			try {
				return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
			} catch (e) {
				return false;
			}
		};
		isDate = kindOfTest("Date");
		isFile = kindOfTest("File");
		isReactNativeBlob = (value) => {
			return !!(value && typeof value.uri !== "undefined");
		};
		isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
		isBlob = kindOfTest("Blob");
		isFileList = kindOfTest("FileList");
		isStream = (val) => isObject(val) && isFunction$1(val.pipe);
		G = getGlobal();
		FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
		isFormData = (thing) => {
			if (!thing) return false;
			if (FormDataCtor && thing instanceof FormDataCtor) return true;
			const proto = getPrototypeOf(thing);
			if (!proto || proto === Object.prototype) return false;
			if (!isFunction$1(thing.append)) return false;
			const kind = kindOf(thing);
			return kind === "formdata" || kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]";
		};
		isURLSearchParams = kindOfTest("URLSearchParams");
		[isReadableStream, isRequest, isResponse, isHeaders] = [
			"ReadableStream",
			"Request",
			"Response",
			"Headers"
		].map(kindOfTest);
		trim = (str) => {
			return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
		};
		_global = (() => {
			if (typeof globalThis !== "undefined") return globalThis;
			return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
		})();
		isContextDefined = (context) => !isUndefined(context) && context !== _global;
		extend = (a, b, thisArg, { allOwnKeys } = {}) => {
			forEach(b, (val, key) => {
				if (thisArg && isFunction$1(val)) Object.defineProperty(a, key, {
					__proto__: null,
					value: bind(val, thisArg),
					writable: true,
					enumerable: true,
					configurable: true
				});
				else Object.defineProperty(a, key, {
					__proto__: null,
					value: val,
					writable: true,
					enumerable: true,
					configurable: true
				});
			}, { allOwnKeys });
			return a;
		};
		stripBOM = (content) => {
			if (content.charCodeAt(0) === 65279) content = content.slice(1);
			return content;
		};
		inherits = (constructor, superConstructor, props, descriptors) => {
			constructor.prototype = Object.create(superConstructor.prototype, descriptors);
			Object.defineProperty(constructor.prototype, "constructor", {
				__proto__: null,
				value: constructor,
				writable: true,
				enumerable: false,
				configurable: true
			});
			Object.defineProperty(constructor, "super", {
				__proto__: null,
				value: superConstructor.prototype
			});
			props && Object.assign(constructor.prototype, props);
		};
		toFlatObject = (sourceObj, destObj, filter, propFilter) => {
			let props;
			let i;
			let prop;
			const merged = {};
			destObj = destObj || {};
			if (sourceObj == null) return destObj;
			do {
				props = Object.getOwnPropertyNames(sourceObj);
				i = props.length;
				while (i-- > 0) {
					prop = props[i];
					if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
						destObj[prop] = sourceObj[prop];
						merged[prop] = true;
					}
				}
				sourceObj = filter !== false && getPrototypeOf(sourceObj);
			} while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
			return destObj;
		};
		endsWith = (str, searchString, position) => {
			str = String(str);
			if (position === void 0 || position > str.length) position = str.length;
			position -= searchString.length;
			const lastIndex = str.indexOf(searchString, position);
			return lastIndex !== -1 && lastIndex === position;
		};
		toArray = (thing) => {
			if (!thing) return null;
			if (isArray(thing)) return thing;
			let i = thing.length;
			if (!isNumber(i)) return null;
			const arr = new Array(i);
			while (i-- > 0) arr[i] = thing[i];
			return arr;
		};
		isTypedArray = ((TypedArray) => {
			return (thing) => {
				return TypedArray && thing instanceof TypedArray;
			};
		})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
		forEachEntry = (obj, fn) => {
			const _iterator = (obj && obj[iterator]).call(obj);
			let result;
			while ((result = _iterator.next()) && !result.done) {
				const pair = result.value;
				fn.call(obj, pair[0], pair[1]);
			}
		};
		matchAll = (regExp, str) => {
			let matches;
			const arr = [];
			while ((matches = regExp.exec(str)) !== null) arr.push(matches);
			return arr;
		};
		isHTMLForm = kindOfTest("HTMLFormElement");
		toCamelCase = (str) => {
			return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
				return p1.toUpperCase() + p2;
			});
		};
		({propertyIsEnumerable} = Object.prototype);
		isRegExp = kindOfTest("RegExp");
		reduceDescriptors = (obj, reducer) => {
			const descriptors = Object.getOwnPropertyDescriptors(obj);
			const reducedDescriptors = {};
			forEach(descriptors, (descriptor, name) => {
				let ret;
				if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
			});
			Object.defineProperties(obj, reducedDescriptors);
		};
		freezeMethods = (obj) => {
			reduceDescriptors(obj, (descriptor, name) => {
				if (isFunction$1(obj) && [
					"arguments",
					"caller",
					"callee"
				].includes(name)) return false;
				const value = obj[name];
				if (!isFunction$1(value)) return;
				descriptor.enumerable = false;
				if ("writable" in descriptor) {
					descriptor.writable = false;
					return;
				}
				if (!descriptor.set) descriptor.set = () => {
					throw Error("Can not rewrite read-only method '" + name + "'");
				};
			});
		};
		toObjectSet = (arrayOrString, delimiter) => {
			const obj = {};
			const define = (arr) => {
				arr.forEach((value) => {
					obj[value] = true;
				});
			};
			isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
			return obj;
		};
		noop = () => {};
		toFiniteNumber = (value, defaultValue) => {
			return value != null && Number.isFinite(value = +value) ? value : defaultValue;
		};
		toJSONObject = (obj) => {
			const visited = /* @__PURE__ */ new WeakSet();
			const visit = (source) => {
				if (isObject(source)) {
					if (visited.has(source)) return;
					if (isBuffer(source)) return source;
					if (!("toJSON" in source)) {
						visited.add(source);
						const target = isArray(source) ? [] : {};
						forEach(source, (value, key) => {
							const reducedValue = visit(value);
							!isUndefined(reducedValue) && (target[key] = reducedValue);
						});
						visited.delete(source);
						return target;
					}
				}
				return source;
			};
			return visit(obj);
		};
		isAsyncFn = kindOfTest("AsyncFunction");
		isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
		_setImmediate = ((setImmediateSupported, postMessageSupported) => {
			if (setImmediateSupported) return setImmediate;
			return postMessageSupported ? ((token, callbacks) => {
				_global.addEventListener("message", ({ source, data }) => {
					if (source === _global && data === token) callbacks.length && callbacks.shift()();
				}, false);
				return (cb) => {
					callbacks.push(cb);
					_global.postMessage(token, "*");
				};
			})(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
		})(typeof setImmediate === "function", isFunction$1(_global.postMessage));
		asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
		isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
		isSafeIterable = (thing) => thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);
		utils_default = {
			isArray,
			isArrayBuffer,
			isBuffer,
			isFormData,
			isArrayBufferView,
			isString,
			isNumber,
			isBoolean,
			isObject,
			isPlainObject,
			isEmptyObject,
			isReadableStream,
			isRequest,
			isResponse,
			isHeaders,
			isUndefined,
			isDate,
			isFile,
			isReactNativeBlob,
			isReactNative,
			isBlob,
			isRegExp,
			isFunction: isFunction$1,
			isStream,
			isURLSearchParams,
			isTypedArray,
			isFileList,
			forEach,
			merge,
			extend,
			trim,
			stripBOM,
			inherits,
			toFlatObject,
			kindOf,
			kindOfTest,
			endsWith,
			toArray,
			forEachEntry,
			matchAll,
			isHTMLForm,
			hasOwnProperty,
			hasOwnProp: hasOwnProperty,
			hasOwnInPrototypeChain,
			getSafeProp,
			reduceDescriptors,
			freezeMethods,
			toObjectSet,
			toCamelCase,
			noop,
			toFiniteNumber,
			findKey,
			global: _global,
			isContextDefined,
			isSpecCompliantForm,
			toJSONObject,
			isAsyncFn,
			isThenable,
			setImmediate: _setImmediate,
			asap,
			isIterable,
			isSafeIterable
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf, parseHeaders_default;
function init_parseHeaders() {
	return (init_parseHeaders = __esmMin((() => {
		init_utils$1();
		ignoreDuplicateOf = utils_default.toObjectSet([
			"age",
			"authorization",
			"content-length",
			"content-type",
			"etag",
			"expires",
			"from",
			"host",
			"if-modified-since",
			"if-unmodified-since",
			"last-modified",
			"location",
			"max-forwards",
			"proxy-authorization",
			"referer",
			"retry-after",
			"user-agent"
		]);
		parseHeaders_default = (rawHeaders) => {
			const parsed = {};
			let key;
			let val;
			let i;
			rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
				i = line.indexOf(":");
				key = line.substring(0, i).trim().toLowerCase();
				val = line.substring(i + 1).trim();
				if (!key || parsed[key] && ignoreDuplicateOf[key]) return;
				if (key === "set-cookie") {
					if (parsed[key]) parsed[key].push(val);
					else parsed[key] = [val];
				} else parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
			});
			return parsed;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function trimSPorHTAB(str) {
	let start = 0;
	let end = str.length;
	while (start < end) {
		const code = str.charCodeAt(start);
		if (code !== 9 && code !== 32) break;
		start += 1;
	}
	while (end > start) {
		const code = str.charCodeAt(end - 1);
		if (code !== 9 && code !== 32) break;
		end -= 1;
	}
	return start === 0 && end === str.length ? str : str.slice(start, end);
}
function sanitizeValue(value, invalidChars) {
	if (utils_default.isArray(value)) return value.map((item) => sanitizeValue(item, invalidChars));
	return trimSPorHTAB(String(value).replace(invalidChars, ""));
}
function toByteStringHeaderObject(headers) {
	const byteStringHeaders = Object.create(null);
	utils_default.forEach(headers.toJSON(), (value, header) => {
		byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
	});
	return byteStringHeaders;
}
var INVALID_UNICODE_HEADER_VALUE_CHARS, INVALID_BYTE_STRING_HEADER_VALUE_CHARS, sanitizeHeaderValue, sanitizeByteStringHeaderValue;
function init_sanitizeHeaderValue() {
	return (init_sanitizeHeaderValue = __esmMin((() => {
		init_utils$1();
		INVALID_UNICODE_HEADER_VALUE_CHARS = /* @__PURE__ */ new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g");
		INVALID_BYTE_STRING_HEADER_VALUE_CHARS = /* @__PURE__ */ new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
		sanitizeHeaderValue = (value) => sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);
		sanitizeByteStringHeaderValue = (value) => sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/AxiosHeaders.js
function normalizeHeader(header) {
	return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
	if (value === false || value == null) return value;
	return utils_default.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
}
function parseTokens(str) {
	const tokens = Object.create(null);
	const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	let match;
	while (match = tokensRE.exec(str)) tokens[match[1]] = match[2];
	return tokens;
}
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
	if (utils_default.isFunction(filter)) return filter.call(this, value, header);
	if (isHeaderNameFilter) value = header;
	if (!utils_default.isString(value)) return;
	if (utils_default.isString(filter)) return value.indexOf(filter) !== -1;
	if (utils_default.isRegExp(filter)) return filter.test(value);
}
function formatHeader(header) {
	return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
		return char.toUpperCase() + str;
	});
}
function buildAccessors(obj, header) {
	const accessorName = utils_default.toCamelCase(" " + header);
	[
		"get",
		"set",
		"has"
	].forEach((methodName) => {
		Object.defineProperty(obj, methodName + accessorName, {
			__proto__: null,
			value: function(arg1, arg2, arg3) {
				return this[methodName].call(this, header, arg1, arg2, arg3);
			},
			configurable: true
		});
	});
}
var $internals, isValidHeaderName, AxiosHeaders$1;
function init_AxiosHeaders() {
	return (init_AxiosHeaders = __esmMin((() => {
		init_utils$1();
		init_parseHeaders();
		init_sanitizeHeaderValue();
		$internals = Symbol("internals");
		isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
		AxiosHeaders$1 = class {
			constructor(headers) {
				headers && this.set(headers);
			}
			set(header, valueOrRewrite, rewrite) {
				const self = this;
				function setHeader(_value, _header, _rewrite) {
					const lHeader = normalizeHeader(_header);
					if (!lHeader) return;
					const key = utils_default.findKey(self, lHeader);
					if (!key || self[key] === void 0 || _rewrite === true || _rewrite === void 0 && self[key] !== false) self[key || _header] = normalizeValue(_value);
				}
				const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
				if (utils_default.isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite);
				else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders(parseHeaders_default(header), valueOrRewrite);
				else if (utils_default.isObject(header) && utils_default.isSafeIterable(header)) {
					let obj = Object.create(null), dest, key;
					for (const entry of header) {
						if (!utils_default.isArray(entry)) throw new TypeError("Object iterator must return a key-value pair");
						key = entry[0];
						if (utils_default.hasOwnProp(obj, key)) {
							dest = obj[key];
							obj[key] = utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]];
						} else obj[key] = entry[1];
					}
					setHeaders(obj, valueOrRewrite);
				} else header != null && setHeader(valueOrRewrite, header, rewrite);
				return this;
			}
			get(header, parser) {
				header = normalizeHeader(header);
				if (header) {
					const key = utils_default.findKey(this, header);
					if (key) {
						const value = this[key];
						if (!parser) return value;
						if (parser === true) return parseTokens(value);
						if (utils_default.isFunction(parser)) return parser.call(this, value, key);
						if (utils_default.isRegExp(parser)) return parser.exec(value);
						throw new TypeError("parser must be boolean|regexp|function");
					}
				}
			}
			has(header, matcher) {
				header = normalizeHeader(header);
				if (header) {
					const key = utils_default.findKey(this, header);
					return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
				}
				return false;
			}
			delete(header, matcher) {
				const self = this;
				let deleted = false;
				function deleteHeader(_header) {
					_header = normalizeHeader(_header);
					if (_header) {
						const key = utils_default.findKey(self, _header);
						if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
							delete self[key];
							deleted = true;
						}
					}
				}
				if (utils_default.isArray(header)) header.forEach(deleteHeader);
				else deleteHeader(header);
				return deleted;
			}
			clear(matcher) {
				const keys = Object.keys(this);
				let i = keys.length;
				let deleted = false;
				while (i--) {
					const key = keys[i];
					if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
						delete this[key];
						deleted = true;
					}
				}
				return deleted;
			}
			normalize(format) {
				const self = this;
				const headers = {};
				utils_default.forEach(this, (value, header) => {
					const key = utils_default.findKey(headers, header);
					if (key) {
						self[key] = normalizeValue(value);
						delete self[header];
						return;
					}
					const normalized = format ? formatHeader(header) : String(header).trim();
					if (normalized !== header) delete self[header];
					self[normalized] = normalizeValue(value);
					headers[normalized] = true;
				});
				return this;
			}
			concat(...targets) {
				return this.constructor.concat(this, ...targets);
			}
			toJSON(asStrings) {
				const obj = Object.create(null);
				utils_default.forEach(this, (value, header) => {
					value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
				});
				return obj;
			}
			[Symbol.iterator]() {
				return Object.entries(this.toJSON())[Symbol.iterator]();
			}
			toString() {
				return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
			}
			getSetCookie() {
				return this.get("set-cookie") || [];
			}
			get [Symbol.toStringTag]() {
				return "AxiosHeaders";
			}
			static from(thing) {
				return thing instanceof this ? thing : new this(thing);
			}
			static concat(first, ...targets) {
				const computed = new this(first);
				targets.forEach((target) => computed.set(target));
				return computed;
			}
			static accessor(header) {
				const accessors = (this[$internals] = this[$internals] = { accessors: {} }).accessors;
				const prototype = this.prototype;
				function defineAccessor(_header) {
					const lHeader = normalizeHeader(_header);
					if (!accessors[lHeader]) {
						buildAccessors(prototype, _header);
						accessors[lHeader] = true;
					}
				}
				utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
				return this;
			}
		};
		AxiosHeaders$1.accessor([
			"Content-Type",
			"Content-Length",
			"Accept",
			"Accept-Encoding",
			"User-Agent",
			"Authorization"
		]);
		utils_default.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
			let mapped = key[0].toUpperCase() + key.slice(1);
			return {
				get: () => value,
				set(headerValue) {
					this[mapped] = headerValue;
				}
			};
		});
		utils_default.freezeMethods(AxiosHeaders$1);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/AxiosError.js
function hasOwnOrPrototypeToJSON(source) {
	if (utils_default.hasOwnProp(source, "toJSON")) return true;
	let prototype = Object.getPrototypeOf(source);
	while (prototype && prototype !== Object.prototype) {
		if (utils_default.hasOwnProp(prototype, "toJSON")) return true;
		prototype = Object.getPrototypeOf(prototype);
	}
	return false;
}
function redactConfig(config, redactKeys) {
	const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
	const seen = [];
	const visit = (source) => {
		if (source === null || typeof source !== "object") return source;
		if (utils_default.isBuffer(source)) return source;
		if (seen.indexOf(source) !== -1) return void 0;
		if (source instanceof AxiosHeaders$1) source = source.toJSON();
		seen.push(source);
		let result;
		if (utils_default.isArray(source)) {
			result = [];
			source.forEach((v, i) => {
				const reducedValue = visit(v);
				if (!utils_default.isUndefined(reducedValue)) result[i] = reducedValue;
			});
		} else {
			if (!utils_default.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
				seen.pop();
				return source;
			}
			result = Object.create(null);
			for (const [key, value] of Object.entries(source)) {
				const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
				if (!utils_default.isUndefined(reducedValue)) result[key] = reducedValue;
			}
		}
		seen.pop();
		return result;
	};
	return visit(config);
}
var REDACTED, AxiosError$1;
function init_AxiosError() {
	return (init_AxiosError = __esmMin((() => {
		init_utils$1();
		init_AxiosHeaders();
		REDACTED = "[REDACTED ****]";
		AxiosError$1 = class AxiosError$1 extends Error {
			static from(error, code, config, request, response, customProps) {
				const axiosError = new AxiosError$1(error.message, code || error.code, config, request, response);
				Object.defineProperty(axiosError, "cause", {
					__proto__: null,
					value: error,
					writable: true,
					enumerable: false,
					configurable: true
				});
				axiosError.name = error.name;
				if (error.status != null && axiosError.status == null) axiosError.status = error.status;
				customProps && Object.assign(axiosError, customProps);
				return axiosError;
			}
			/**
			* Create an Error with the specified message, config, error code, request and response.
			*
			* @param {string} message The error message.
			* @param {string} [code] The error code (for example, 'ECONNABORTED').
			* @param {Object} [config] The config.
			* @param {Object} [request] The request.
			* @param {Object} [response] The response.
			*
			* @returns {Error} The created error.
			*/
			constructor(message, code, config, request, response) {
				super(message);
				Object.defineProperty(this, "message", {
					__proto__: null,
					value: message,
					enumerable: true,
					writable: true,
					configurable: true
				});
				this.name = "AxiosError";
				this.isAxiosError = true;
				code && (this.code = code);
				config && (this.config = config);
				request && (this.request = request);
				if (response) {
					this.response = response;
					this.status = response.status;
				}
			}
			toJSON() {
				const config = this.config;
				const redactKeys = config && utils_default.hasOwnProp(config, "redact") ? config.redact : void 0;
				const serializedConfig = utils_default.isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : utils_default.toJSONObject(config);
				return {
					message: this.message,
					name: this.name,
					description: this.description,
					number: this.number,
					fileName: this.fileName,
					lineNumber: this.lineNumber,
					columnNumber: this.columnNumber,
					stack: this.stack,
					config: serializedConfig,
					code: this.code,
					status: this.status
				};
			}
		};
		AxiosError$1.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
		AxiosError$1.ERR_BAD_OPTION = "ERR_BAD_OPTION";
		AxiosError$1.ECONNABORTED = "ECONNABORTED";
		AxiosError$1.ETIMEDOUT = "ETIMEDOUT";
		AxiosError$1.ECONNREFUSED = "ECONNREFUSED";
		AxiosError$1.ERR_NETWORK = "ERR_NETWORK";
		AxiosError$1.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
		AxiosError$1.ERR_DEPRECATED = "ERR_DEPRECATED";
		AxiosError$1.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
		AxiosError$1.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
		AxiosError$1.ERR_CANCELED = "ERR_CANCELED";
		AxiosError$1.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
		AxiosError$1.ERR_INVALID_URL = "ERR_INVALID_URL";
		AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/toFormData.js
/**
* Determines if the given thing is a array or js object.
*
* @param {string} thing - The object or array to be visited.
*
* @returns {boolean}
*/
function isVisitable(thing) {
	return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
/**
* It removes the brackets from the end of a string
*
* @param {string} key - The key of the parameter.
*
* @returns {string} the key without the brackets.
*/
function removeBrackets(key) {
	return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
/**
* It takes a path, a key, and a boolean, and returns a string
*
* @param {string} path - The path to the current key.
* @param {string} key - The key of the current object being iterated over.
* @param {string} dots - If true, the key will be rendered with dots instead of brackets.
*
* @returns {string} The path to the current key.
*/
function renderKey(path, key, dots) {
	if (!path) return key;
	return path.concat(key).map(function each(token, i) {
		token = removeBrackets(token);
		return !dots && i ? "[" + token + "]" : token;
	}).join(dots ? "." : "");
}
/**
* If the array is an array and none of its elements are visitable, then it's a flat array.
*
* @param {Array<any>} arr - The array to check
*
* @returns {boolean}
*/
function isFlatArray(arr) {
	return utils_default.isArray(arr) && !arr.some(isVisitable);
}
/**
* Convert a data object to FormData
*
* @param {Object} obj
* @param {?Object} [formData]
* @param {?Object} [options]
* @param {Function} [options.visitor]
* @param {Boolean} [options.metaTokens = true]
* @param {Boolean} [options.dots = false]
* @param {?Boolean} [options.indexes = false]
*
* @returns {Object}
**/
/**
* It converts an object into a FormData object
*
* @param {Object<any, any>} obj - The object to convert to form data.
* @param {string} formData - The FormData object to append to.
* @param {Object<string, any>} options
*
* @returns
*/
function toFormData$1(obj, formData, options) {
	if (!utils_default.isObject(obj)) throw new TypeError("target must be an object");
	formData = formData || new FormData();
	options = utils_default.toFlatObject(options, {
		metaTokens: true,
		dots: false,
		indexes: false
	}, false, function defined(option, source) {
		return !utils_default.isUndefined(source[option]);
	});
	const metaTokens = options.metaTokens;
	const visitor = options.visitor || defaultVisitor;
	const dots = options.dots;
	const indexes = options.indexes;
	const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
	const maxDepth = options.maxDepth === void 0 ? 100 : options.maxDepth;
	const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
	const stack = [];
	if (!utils_default.isFunction(visitor)) throw new TypeError("visitor must be a function");
	function convertValue(value) {
		if (value === null) return "";
		if (utils_default.isDate(value)) return value.toISOString();
		if (utils_default.isBoolean(value)) return value.toString();
		if (!useBlob && utils_default.isBlob(value)) throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
		if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
			if (useBlob && typeof _Blob === "function") return new _Blob([value]);
			if (typeof Buffer !== "undefined") return Buffer.from(value);
			throw new AxiosError$1("Blob is not supported. Use a Buffer instead.", AxiosError$1.ERR_NOT_SUPPORT);
		}
		return value;
	}
	function throwIfMaxDepthExceeded(depth) {
		if (depth > maxDepth) throw new AxiosError$1("Object is too deeply nested (" + depth + " levels). Max depth: " + maxDepth, AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function stringifyWithDepthLimit(value, depth) {
		if (maxDepth === Infinity) return JSON.stringify(value);
		const ancestors = [];
		return JSON.stringify(value, function limitDepth(_key, currentValue) {
			if (!utils_default.isObject(currentValue)) return currentValue;
			while (ancestors.length && ancestors[ancestors.length - 1] !== this) ancestors.pop();
			ancestors.push(currentValue);
			throwIfMaxDepthExceeded(depth + ancestors.length - 1);
			return currentValue;
		});
	}
	/**
	* Default visitor.
	*
	* @param {*} value
	* @param {String|Number} key
	* @param {Array<String|Number>} path
	* @this {FormData}
	*
	* @returns {boolean} return true to visit the each prop of the value recursively
	*/
	function defaultVisitor(value, key, path) {
		let arr = value;
		if (utils_default.isReactNative(formData) && utils_default.isReactNativeBlob(value)) {
			formData.append(renderKey(path, key, dots), convertValue(value));
			return false;
		}
		if (value && !path && typeof value === "object") {
			if (utils_default.endsWith(key, "{}")) {
				key = metaTokens ? key : key.slice(0, -2);
				value = stringifyWithDepthLimit(value, 1);
			} else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
				key = removeBrackets(key);
				arr.forEach(function each(el, index) {
					!(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
				});
				return false;
			}
		}
		if (isVisitable(value)) return true;
		formData.append(renderKey(path, key, dots), convertValue(value));
		return false;
	}
	const exposedHelpers = Object.assign(predicates, {
		defaultVisitor,
		convertValue,
		isVisitable
	});
	function build(value, path, depth = 0) {
		if (utils_default.isUndefined(value)) return;
		throwIfMaxDepthExceeded(depth);
		if (stack.indexOf(value) !== -1) throw new Error("Circular reference detected in " + path.join("."));
		stack.push(value);
		utils_default.forEach(value, function each(el, key) {
			if ((!(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers)) === true) build(el, path ? path.concat(key) : [key], depth + 1);
		});
		stack.pop();
	}
	if (!utils_default.isObject(obj)) throw new TypeError("data must be an object");
	build(obj);
	return formData;
}
var predicates;
function init_toFormData() {
	return (init_toFormData = __esmMin((() => {
		init_utils$1();
		init_AxiosError();
		predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
			return /^is[A-Z]/.test(prop);
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/AxiosURLSearchParams.js
/**
* It encodes a string by replacing all characters that are not in the unreserved set with
* their percent-encoded equivalents
*
* @param {string} str - The string to encode.
*
* @returns {string} The encoded string.
*/
function encode$1(str) {
	const charMap = {
		"!": "%21",
		"'": "%27",
		"(": "%28",
		")": "%29",
		"~": "%7E",
		"%20": "+"
	};
	return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
		return charMap[match];
	});
}
/**
* It takes a params object and converts it to a FormData object
*
* @param {Object<string, any>} params - The parameters to be converted to a FormData object.
* @param {Object<string, any>} options - The options object passed to the Axios constructor.
*
* @returns {void}
*/
function AxiosURLSearchParams(params, options) {
	this._pairs = [];
	params && toFormData$1(params, this, options);
}
var prototype;
function init_AxiosURLSearchParams() {
	return (init_AxiosURLSearchParams = __esmMin((() => {
		init_toFormData();
		prototype = AxiosURLSearchParams.prototype;
		prototype.append = function append(name, value) {
			this._pairs.push([name, value]);
		};
		prototype.toString = function toString(encoder) {
			const _encode = encoder ? (value) => encoder.call(this, value, encode$1) : encode$1;
			return this._pairs.map(function each(pair) {
				return _encode(pair[0]) + "=" + _encode(pair[1]);
			}, "").join("&");
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/buildURL.js
/**
* It replaces URL-encoded forms of `:`, `$`, `,`, and spaces with
* their plain counterparts (`:`, `$`, `,`, `+`).
*
* @param {string} val The value to be encoded.
*
* @returns {string} The encoded value.
*/
function encode(val) {
	return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
/**
* Build a URL by appending params to the end
*
* @param {string} url The base of the url (e.g., http://www.google.com)
* @param {object} [params] The params to be appended
* @param {?(object|Function)} options
*
* @returns {string} The formatted url
*/
function buildURL(url, params, options) {
	if (!params) return url;
	url = url || "";
	const _options = utils_default.isFunction(options) ? { serialize: options } : options;
	const _encode = utils_default.getSafeProp(_options, "encode") || encode;
	const serializeFn = utils_default.getSafeProp(_options, "serialize");
	let serializedParams;
	if (serializeFn) serializedParams = serializeFn(params, _options);
	else serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
	if (serializedParams) {
		const hashmarkIndex = url.indexOf("#");
		if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
		url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
	}
	return url;
}
function init_buildURL() {
	return (init_buildURL = __esmMin((() => {
		init_utils$1();
		init_AxiosURLSearchParams();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/InterceptorManager.js
var InterceptorManager;
function init_InterceptorManager() {
	return (init_InterceptorManager = __esmMin((() => {
		init_utils$1();
		InterceptorManager = class {
			constructor() {
				this.handlers = [];
			}
			/**
			* Add a new interceptor to the stack
			*
			* @param {Function} fulfilled The function to handle `then` for a `Promise`
			* @param {Function} rejected The function to handle `reject` for a `Promise`
			* @param {Object} options The options for the interceptor, synchronous and runWhen
			*
			* @return {Number} An ID used to remove interceptor later
			*/
			use(fulfilled, rejected, options) {
				this.handlers.push({
					fulfilled,
					rejected,
					synchronous: options ? options.synchronous : false,
					runWhen: options ? options.runWhen : null
				});
				return this.handlers.length - 1;
			}
			/**
			* Remove an interceptor from the stack
			*
			* @param {Number} id The ID that was returned by `use`
			*
			* @returns {void}
			*/
			eject(id) {
				if (this.handlers[id]) this.handlers[id] = null;
			}
			/**
			* Clear all interceptors from the stack
			*
			* @returns {void}
			*/
			clear() {
				if (this.handlers) this.handlers = [];
			}
			/**
			* Iterate over all the registered interceptors
			*
			* This method is particularly useful for skipping over any
			* interceptors that may have become `null` calling `eject`.
			*
			* @param {Function} fn The function to call for each interceptor
			*
			* @returns {void}
			*/
			forEach(fn) {
				utils_default.forEach(this.handlers, function forEachHandler(h) {
					if (h !== null) fn(h);
				});
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/defaults/transitional.js
var transitional_default;
function init_transitional() {
	return (init_transitional = __esmMin((() => {
		transitional_default = {
			silentJSONParsing: true,
			forcedJSONParsing: true,
			clarifyTimeoutError: false,
			legacyInterceptorReqResOrdering: true,
			advertiseZstdAcceptEncoding: false,
			validateStatusUndefinedResolves: true
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
var URLSearchParams_default;
function init_URLSearchParams() {
	return (init_URLSearchParams = __esmMin((() => {
		init_AxiosURLSearchParams();
		URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/browser/classes/FormData.js
var FormData_default;
function init_FormData() {
	return (init_FormData = __esmMin((() => {
		FormData_default = typeof FormData !== "undefined" ? FormData : null;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/browser/classes/Blob.js
var Blob_default;
function init_Blob() {
	return (init_Blob = __esmMin((() => {
		Blob_default = typeof Blob !== "undefined" ? Blob : null;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/browser/index.js
var browser_default;
function init_browser() {
	return (init_browser = __esmMin((() => {
		init_URLSearchParams();
		init_FormData();
		init_Blob();
		browser_default = {
			isBrowser: true,
			classes: {
				URLSearchParams: URLSearchParams_default,
				FormData: FormData_default,
				Blob: Blob_default
			},
			protocols: [
				"http",
				"https",
				"file",
				"blob",
				"url",
				"data"
			]
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/common/utils.js
var utils_exports = /* @__PURE__ */ __exportAll({
	hasBrowserEnv: () => hasBrowserEnv,
	hasStandardBrowserEnv: () => hasStandardBrowserEnv,
	hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
	navigator: () => _navigator,
	origin: () => origin
});
var hasBrowserEnv, _navigator, hasStandardBrowserEnv, hasStandardBrowserWebWorkerEnv, origin;
function init_utils$2() {
	return (init_utils$2 = __esmMin((() => {
		hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
		_navigator = typeof navigator === "object" && navigator || void 0;
		hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || [
			"ReactNative",
			"NativeScript",
			"NS"
		].indexOf(_navigator.product) < 0);
		hasStandardBrowserWebWorkerEnv = (() => {
			return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
		})();
		origin = hasBrowserEnv && window.location.href || "http://localhost";
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/index.js
var platform_default;
function init_platform() {
	return (init_platform = __esmMin((() => {
		init_browser();
		init_utils$2();
		platform_default = {
			...utils_exports,
			...browser_default
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
	return toFormData$1(data, new platform_default.classes.URLSearchParams(), {
		visitor: function(value, key, path, helpers) {
			if (platform_default.isNode && utils_default.isBuffer(value)) {
				this.append(key, value.toString("base64"));
				return false;
			}
			return helpers.defaultVisitor.apply(this, arguments);
		},
		...options
	});
}
function init_toURLEncodedForm() {
	return (init_toURLEncodedForm = __esmMin((() => {
		init_utils$1();
		init_toFormData();
		init_platform();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/formDataToJSON.js
function throwIfDepthExceeded(index) {
	if (index > MAX_DEPTH) throw new AxiosError$1("FormData field is too deeply nested (" + index + " levels). Max depth: " + MAX_DEPTH, AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
/**
* It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
*
* @param {string} name - The name of the property to get.
*
* @returns An array of strings.
*/
function parsePropPath(name) {
	const path = [];
	const pattern = /\w+|\[(\w*)]/g;
	let match;
	while ((match = pattern.exec(name)) !== null) {
		throwIfDepthExceeded(path.length);
		path.push(match[0] === "[]" ? "" : match[1] || match[0]);
	}
	return path;
}
/**
* Convert an array to an object.
*
* @param {Array<any>} arr - The array to convert to an object.
*
* @returns An object with the same keys and values as the array.
*/
function arrayToObject(arr) {
	const obj = {};
	const keys = Object.keys(arr);
	let i;
	const len = keys.length;
	let key;
	for (i = 0; i < len; i++) {
		key = keys[i];
		obj[key] = arr[key];
	}
	return obj;
}
/**
* It takes a FormData object and returns a JavaScript object
*
* @param {string} formData The FormData object to convert to JSON.
*
* @returns {Object<string, any> | null} The converted object.
*/
function formDataToJSON(formData) {
	function buildPath(path, value, target, index) {
		throwIfDepthExceeded(index);
		let name = path[index++];
		if (name === "__proto__") return true;
		const isNumericKey = Number.isFinite(+name);
		const isLast = index >= path.length;
		name = !name && utils_default.isArray(target) ? target.length : name;
		if (isLast) {
			if (utils_default.hasOwnProp(target, name)) target[name] = utils_default.isArray(target[name]) ? target[name].concat(value) : [target[name], value];
			else target[name] = value;
			return !isNumericKey;
		}
		if (!utils_default.hasOwnProp(target, name) || !utils_default.isObject(target[name])) target[name] = [];
		if (buildPath(path, value, target[name], index) && utils_default.isArray(target[name])) target[name] = arrayToObject(target[name]);
		return !isNumericKey;
	}
	if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
		const obj = {};
		utils_default.forEachEntry(formData, (name, value) => {
			buildPath(parsePropPath(name), value, obj, 0);
		});
		return obj;
	}
	return null;
}
var MAX_DEPTH;
function init_formDataToJSON() {
	return (init_formDataToJSON = __esmMin((() => {
		init_utils$1();
		init_AxiosError();
		init_toFormData();
		MAX_DEPTH = 100;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/defaults/index.js
/**
* It takes a string, tries to parse it, and if it fails, it returns the stringified version
* of the input
*
* @param {any} rawValue - The value to be stringified.
* @param {Function} parser - A function that parses a string into a JavaScript object.
* @param {Function} encoder - A function that takes a value and returns a string.
*
* @returns {string} A stringified version of the rawValue.
*/
function stringifySafely(rawValue, parser, encoder) {
	if (utils_default.isString(rawValue)) try {
		(parser || JSON.parse)(rawValue);
		return utils_default.trim(rawValue);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (encoder || JSON.stringify)(rawValue);
}
var own, defaults;
function init_defaults() {
	return (init_defaults = __esmMin((() => {
		init_utils$1();
		init_AxiosError();
		init_transitional();
		init_toFormData();
		init_toURLEncodedForm();
		init_platform();
		init_formDataToJSON();
		own = (obj, key) => obj != null && utils_default.hasOwnProp(obj, key) ? obj[key] : void 0;
		defaults = {
			transitional: transitional_default,
			adapter: [
				"xhr",
				"http",
				"fetch"
			],
			transformRequest: [function transformRequest(data, headers) {
				const contentType = headers.getContentType() || "";
				const hasJSONContentType = contentType.indexOf("application/json") > -1;
				const isObjectPayload = utils_default.isObject(data);
				if (isObjectPayload && utils_default.isHTMLForm(data)) data = new FormData(data);
				if (utils_default.isFormData(data)) return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
				if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) return data;
				if (utils_default.isArrayBufferView(data)) return data.buffer;
				if (utils_default.isURLSearchParams(data)) {
					headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
					return data.toString();
				}
				let isFileList;
				if (isObjectPayload) {
					const formSerializer = own(this, "formSerializer");
					if (contentType.indexOf("application/x-www-form-urlencoded") > -1) return toURLEncodedForm(data, formSerializer).toString();
					if ((isFileList = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
						const env = own(this, "env");
						const _FormData = env && env.FormData;
						return toFormData$1(isFileList ? { "files[]": data } : data, _FormData && new _FormData(), formSerializer);
					}
				}
				if (isObjectPayload || hasJSONContentType) {
					headers.setContentType("application/json", false);
					return stringifySafely(data);
				}
				return data;
			}],
			transformResponse: [function transformResponse(data) {
				const transitional = own(this, "transitional") || defaults.transitional;
				const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
				const responseType = own(this, "responseType");
				const JSONRequested = responseType === "json";
				if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) return data;
				if (data && utils_default.isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
					const strictJSONParsing = !(transitional && transitional.silentJSONParsing) && JSONRequested;
					try {
						return JSON.parse(data, own(this, "parseReviver"));
					} catch (e) {
						if (strictJSONParsing) {
							if (e.name === "SyntaxError") throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, own(this, "response"));
							throw e;
						}
					}
				}
				return data;
			}],
			/**
			* A timeout in milliseconds to abort a request. If set to 0 (default) a
			* timeout is not created.
			*/
			timeout: 0,
			xsrfCookieName: "XSRF-TOKEN",
			xsrfHeaderName: "X-XSRF-TOKEN",
			maxContentLength: -1,
			maxBodyLength: -1,
			env: {
				FormData: platform_default.classes.FormData,
				Blob: platform_default.classes.Blob
			},
			validateStatus: function validateStatus(status) {
				return status >= 200 && status < 300;
			},
			headers: { common: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": void 0
			} }
		};
		utils_default.forEach([
			"delete",
			"get",
			"head",
			"post",
			"put",
			"patch",
			"query"
		], (method) => {
			defaults.headers[method] = {};
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/transformData.js
/**
* Transform the data for a request or a response
*
* @param {Array|Function} fns A single function or Array of functions
* @param {?Object} response The response object
*
* @returns {*} The resulting transformed data
*/
function transformData(fns, response) {
	const config = this || defaults;
	const context = response || config;
	const headers = AxiosHeaders$1.from(context.headers);
	let data = context.data;
	utils_default.forEach(fns, function transform(fn) {
		data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
	});
	headers.normalize();
	return data;
}
function init_transformData() {
	return (init_transformData = __esmMin((() => {
		init_utils$1();
		init_defaults();
		init_AxiosHeaders();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/isCancel.js
function isCancel$1(value) {
	return !!(value && value.__CANCEL__);
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/CanceledError.js
var CanceledError$1;
function init_CanceledError() {
	return (init_CanceledError = __esmMin((() => {
		init_AxiosError();
		CanceledError$1 = class extends AxiosError$1 {
			/**
			* A `CanceledError` is an object that is thrown when an operation is canceled.
			*
			* @param {string=} message The message.
			* @param {Object=} config The config.
			* @param {Object=} request The request.
			*
			* @returns {CanceledError} The created error.
			*/
			constructor(message, config, request) {
				super(message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
				this.name = "CanceledError";
				this.__CANCEL__ = true;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/settle.js
/**
* Resolve or reject a Promise based on response status.
*
* @param {Function} resolve A function that resolves the promise.
* @param {Function} reject A function that rejects the promise.
* @param {object} response The response.
*
* @returns {object} The response.
*/
function settle(resolve, reject, response) {
	const validateStatus = response.config.validateStatus;
	if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
	else reject(new AxiosError$1("Request failed with status code " + response.status, response.status >= 400 && response.status < 500 ? AxiosError$1.ERR_BAD_REQUEST : AxiosError$1.ERR_BAD_RESPONSE, response.config, response.request, response));
}
function init_settle() {
	return (init_settle = __esmMin((() => {
		init_AxiosError();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url) {
	const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
	return match && match[1] || "";
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/speedometer.js
/**
* Calculate data maxRate
* @param {Number} [samplesCount= 10]
* @param {Number} [min= 1000]
* @returns {Function}
*/
function speedometer(samplesCount, min) {
	samplesCount = samplesCount || 10;
	const bytes = new Array(samplesCount);
	const timestamps = new Array(samplesCount);
	let head = 0;
	let tail = 0;
	let firstSampleTS;
	min = min !== void 0 ? min : 1e3;
	return function push(chunkLength) {
		const now = Date.now();
		const startedAt = timestamps[tail];
		if (!firstSampleTS) firstSampleTS = now;
		bytes[head] = chunkLength;
		timestamps[head] = now;
		let i = tail;
		let bytesCount = 0;
		while (i !== head) {
			bytesCount += bytes[i++];
			i = i % samplesCount;
		}
		head = (head + 1) % samplesCount;
		if (head === tail) tail = (tail + 1) % samplesCount;
		if (now - firstSampleTS < min) return;
		const passed = startedAt && now - startedAt;
		return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
	};
}
function init_speedometer() {
	return (init_speedometer = __esmMin((() => {})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/throttle.js
/**
* Throttle decorator
* @param {Function} fn
* @param {Number} freq
* @return {Function}
*/
function throttle(fn, freq) {
	let timestamp = 0;
	let threshold = 1e3 / freq;
	let lastArgs;
	let timer;
	const invoke = (args, now = Date.now()) => {
		timestamp = now;
		lastArgs = null;
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		fn(...args);
	};
	const throttled = (...args) => {
		const now = Date.now();
		const passed = now - timestamp;
		if (passed >= threshold) invoke(args, now);
		else {
			lastArgs = args;
			if (!timer) timer = setTimeout(() => {
				timer = null;
				invoke(lastArgs);
			}, threshold - passed);
		}
	};
	const flush = () => lastArgs && invoke(lastArgs);
	return [throttled, flush];
}
function init_throttle() {
	return (init_throttle = __esmMin((() => {})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer, progressEventDecorator, asyncDecorator;
function init_progressEventReducer() {
	return (init_progressEventReducer = __esmMin((() => {
		init_speedometer();
		init_throttle();
		init_utils$1();
		progressEventReducer = (listener, isDownloadStream, freq = 3) => {
			let bytesNotified = 0;
			const _speedometer = speedometer(50, 250);
			return throttle((e) => {
				if (!e || typeof e.loaded !== "number") return;
				const rawLoaded = e.loaded;
				const total = e.lengthComputable ? e.total : void 0;
				const loaded = total != null ? Math.min(rawLoaded, total) : rawLoaded;
				const progressBytes = Math.max(0, loaded - bytesNotified);
				const rate = _speedometer(progressBytes);
				bytesNotified = Math.max(bytesNotified, loaded);
				listener({
					loaded,
					total,
					progress: total ? loaded / total : void 0,
					bytes: progressBytes,
					rate: rate ? rate : void 0,
					estimated: rate && total ? (total - loaded) / rate : void 0,
					event: e,
					lengthComputable: total != null,
					[isDownloadStream ? "download" : "upload"]: true
				});
			}, freq);
		};
		progressEventDecorator = (total, throttled) => {
			const lengthComputable = total != null;
			return [(loaded) => throttled[0]({
				lengthComputable,
				total,
				loaded
			}), throttled[1]];
		};
		asyncDecorator = (fn) => (...args) => utils_default.asap(() => fn(...args));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default;
function init_isURLSameOrigin() {
	return (init_isURLSameOrigin = __esmMin((() => {
		init_platform();
		isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
			url = new URL(url, platform_default.origin);
			return origin.protocol === url.protocol && origin.host === url.host && (isMSIE || origin.port === url.port);
		})(new URL(platform_default.origin), platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)) : () => true;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/cookies.js
var cookies_default;
function init_cookies() {
	return (init_cookies = __esmMin((() => {
		init_utils$1();
		init_platform();
		cookies_default = platform_default.hasStandardBrowserEnv ? {
			write(name, value, expires, path, domain, secure, sameSite) {
				if (typeof document === "undefined") return;
				const cookie = [`${name}=${encodeURIComponent(value)}`];
				if (utils_default.isNumber(expires)) cookie.push(`expires=${new Date(expires).toUTCString()}`);
				if (utils_default.isString(path)) cookie.push(`path=${path}`);
				if (utils_default.isString(domain)) cookie.push(`domain=${domain}`);
				if (secure === true) cookie.push("secure");
				if (utils_default.isString(sameSite)) cookie.push(`SameSite=${sameSite}`);
				document.cookie = cookie.join("; ");
			},
			read(name) {
				if (typeof document === "undefined") return null;
				const cookies = document.cookie.split(";");
				for (let i = 0; i < cookies.length; i++) {
					const cookie = cookies[i].replace(/^\s+/, "");
					const eq = cookie.indexOf("=");
					if (eq !== -1 && cookie.slice(0, eq) === name) try {
						return decodeURIComponent(cookie.slice(eq + 1));
					} catch (e) {
						return cookie.slice(eq + 1);
					}
				}
				return null;
			},
			remove(name) {
				this.write(name, "", Date.now() - 864e5, "/");
			}
		} : {
			write() {},
			read() {
				return null;
			},
			remove() {}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/isAbsoluteURL.js
/**
* Determines whether the specified URL is absolute
*
* @param {string} url The URL to test
*
* @returns {boolean} True if the specified URL is absolute, otherwise false
*/
function isAbsoluteURL(url) {
	if (typeof url !== "string") return false;
	return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/combineURLs.js
/**
* Creates a new URL by combining the specified URLs
*
* @param {string} baseURL The base URL
* @param {string} relativeURL The relative URL
*
* @returns {string} The combined URL
*/
function combineURLs(baseURL, relativeURL) {
	return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/buildFullPath.js
function stripLeadingC0ControlOrSpace(url) {
	let i = 0;
	while (i < url.length && url.charCodeAt(i) <= 32) i++;
	return url.slice(i);
}
function normalizeURLForProtocolCheck(url) {
	return stripLeadingC0ControlOrSpace(url).replace(httpProtocolControlCharacters, "");
}
function assertValidHttpProtocolURL(url, config) {
	if (typeof url === "string" && malformedHttpProtocol.test(normalizeURLForProtocolCheck(url))) throw new AxiosError$1("Invalid URL: missing \"//\" after protocol", AxiosError$1.ERR_INVALID_URL, config);
}
/**
* Creates a new URL by combining the baseURL with the requestedURL,
* only when the requestedURL is not already an absolute URL.
* If the requestURL is absolute, this function returns the requestedURL untouched.
*
* @param {string} baseURL The base URL
* @param {string} requestedURL Absolute or relative URL to combine
*
* @returns {string} The combined full path
*/
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
	assertValidHttpProtocolURL(requestedURL, config);
	let isRelativeUrl = !isAbsoluteURL(requestedURL);
	if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
		assertValidHttpProtocolURL(baseURL, config);
		return combineURLs(baseURL, requestedURL);
	}
	return requestedURL;
}
var malformedHttpProtocol, httpProtocolControlCharacters;
function init_buildFullPath() {
	return (init_buildFullPath = __esmMin((() => {
		init_AxiosError();
		malformedHttpProtocol = /^https?:(?!\/\/)/i;
		httpProtocolControlCharacters = /[\t\n\r]/g;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/mergeConfig.js
/**
* Config-specific merge-function which creates a new config-object
* by merging two configuration objects together.
*
* @param {Object} config1
* @param {Object} config2
*
* @returns {Object} New object resulting from merging config2 to config1
*/
function mergeConfig$1(config1, config2) {
	config1 = config1 || {};
	config2 = config2 || {};
	const config = Object.create(null);
	Object.defineProperty(config, "hasOwnProperty", {
		__proto__: null,
		value: Object.prototype.hasOwnProperty,
		enumerable: false,
		writable: true,
		configurable: true
	});
	function getMergedValue(target, source, prop, caseless) {
		if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) return utils_default.merge.call({ caseless }, target, source);
		else if (utils_default.isPlainObject(source)) return utils_default.merge({}, source);
		else if (utils_default.isArray(source)) return source.slice();
		return source;
	}
	function mergeDeepProperties(a, b, prop, caseless) {
		if (!utils_default.isUndefined(b)) return getMergedValue(a, b, prop, caseless);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a, prop, caseless);
	}
	function valueFromConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
	}
	function defaultToConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a);
	}
	function getMergedTransitionalOption(prop) {
		const transitional2 = utils_default.hasOwnProp(config2, "transitional") ? config2.transitional : void 0;
		if (!utils_default.isUndefined(transitional2)) {
			if (utils_default.isPlainObject(transitional2)) {
				if (utils_default.hasOwnProp(transitional2, prop)) return transitional2[prop];
			} else return;
		}
		const transitional1 = utils_default.hasOwnProp(config1, "transitional") ? config1.transitional : void 0;
		if (utils_default.isPlainObject(transitional1) && utils_default.hasOwnProp(transitional1, prop)) return transitional1[prop];
	}
	function mergeDirectKeys(a, b, prop) {
		if (utils_default.hasOwnProp(config2, prop)) return getMergedValue(a, b);
		else if (utils_default.hasOwnProp(config1, prop)) return getMergedValue(void 0, a);
	}
	const mergeMap = {
		url: valueFromConfig2,
		method: valueFromConfig2,
		data: valueFromConfig2,
		baseURL: defaultToConfig2,
		transformRequest: defaultToConfig2,
		transformResponse: defaultToConfig2,
		paramsSerializer: defaultToConfig2,
		timeout: defaultToConfig2,
		timeoutMessage: defaultToConfig2,
		withCredentials: defaultToConfig2,
		withXSRFToken: defaultToConfig2,
		adapter: defaultToConfig2,
		responseType: defaultToConfig2,
		xsrfCookieName: defaultToConfig2,
		xsrfHeaderName: defaultToConfig2,
		onUploadProgress: defaultToConfig2,
		onDownloadProgress: defaultToConfig2,
		decompress: defaultToConfig2,
		maxContentLength: defaultToConfig2,
		maxBodyLength: defaultToConfig2,
		beforeRedirect: defaultToConfig2,
		transport: defaultToConfig2,
		httpAgent: defaultToConfig2,
		httpsAgent: defaultToConfig2,
		cancelToken: defaultToConfig2,
		socketPath: defaultToConfig2,
		allowedSocketPaths: defaultToConfig2,
		responseEncoding: defaultToConfig2,
		validateStatus: mergeDirectKeys,
		headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
	};
	utils_default.forEach(Object.keys({
		...config1,
		...config2
	}), function computeConfigValue(prop) {
		if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
		const merge = utils_default.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
		const configValue = merge(utils_default.hasOwnProp(config1, prop) ? config1[prop] : void 0, utils_default.hasOwnProp(config2, prop) ? config2[prop] : void 0, prop);
		utils_default.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
	});
	if (utils_default.hasOwnProp(config2, "validateStatus") && utils_default.isUndefined(config2.validateStatus) && getMergedTransitionalOption("validateStatusUndefinedResolves") === false) {
		if (utils_default.hasOwnProp(config1, "validateStatus")) config.validateStatus = getMergedValue(void 0, config1.validateStatus);
		else delete config.validateStatus;
	}
	return config;
}
var headersToObject;
function init_mergeConfig() {
	return (init_mergeConfig = __esmMin((() => {
		init_utils$1();
		init_AxiosHeaders();
		headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/resolveConfig.js
function setFormDataHeaders(headers, formHeaders, policy) {
	if (policy !== "content-only") {
		headers.set(formHeaders);
		return;
	}
	Object.entries(formHeaders || {}).forEach(([key, val]) => {
		if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) headers.set(key, val);
	});
}
function resolveConfig(config) {
	const newConfig = mergeConfig$1({}, config);
	const own = (key) => utils_default.hasOwnProp(newConfig, key) ? newConfig[key] : void 0;
	const data = own("data");
	let withXSRFToken = own("withXSRFToken");
	const xsrfHeaderName = own("xsrfHeaderName");
	const xsrfCookieName = own("xsrfCookieName");
	let headers = own("headers");
	const auth = own("auth");
	const baseURL = own("baseURL");
	const allowAbsoluteUrls = own("allowAbsoluteUrls");
	const url = own("url");
	newConfig.headers = headers = AxiosHeaders$1.from(headers);
	newConfig.url = buildURL(buildFullPath(baseURL, url, allowAbsoluteUrls, newConfig), own("params"), own("paramsSerializer"));
	if (auth) {
		const username = utils_default.getSafeProp(auth, "username") || "";
		const password = utils_default.getSafeProp(auth, "password") || "";
		try {
			headers.set("Authorization", "Basic " + btoa(username + ":" + (password ? encodeUTF8$1(password) : "")));
		} catch (e) {
			throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_OPTION_VALUE, config);
		}
	}
	if (utils_default.isFormData(data)) {
		if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv || utils_default.isReactNative(data)) headers.setContentType(void 0);
		else if (utils_default.isFunction(data.getHeaders)) setFormDataHeaders(headers, data.getHeaders(), own("formDataHeaderPolicy"));
	}
	if (platform_default.hasStandardBrowserEnv) {
		if (utils_default.isFunction(withXSRFToken)) withXSRFToken = withXSRFToken(newConfig);
		if (withXSRFToken === true || withXSRFToken == null && isURLSameOrigin_default(newConfig.url)) {
			const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
			if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
		}
	}
	return newConfig;
}
var FORM_DATA_CONTENT_HEADERS, encodeUTF8$1;
function init_resolveConfig() {
	return (init_resolveConfig = __esmMin((() => {
		init_platform();
		init_utils$1();
		init_AxiosError();
		init_isURLSameOrigin();
		init_cookies();
		init_buildFullPath();
		init_mergeConfig();
		init_AxiosHeaders();
		init_buildURL();
		FORM_DATA_CONTENT_HEADERS = ["content-type", "content-length"];
		encodeUTF8$1 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/adapters/xhr.js
var isXHRAdapterSupported, xhr_default;
function init_xhr() {
	return (init_xhr = __esmMin((() => {
		init_utils$1();
		init_settle();
		init_transitional();
		init_AxiosError();
		init_CanceledError();
		init_platform();
		init_AxiosHeaders();
		init_progressEventReducer();
		init_resolveConfig();
		init_sanitizeHeaderValue();
		isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
		xhr_default = isXHRAdapterSupported && function(config) {
			return new Promise(function dispatchXhrRequest(resolve, reject) {
				const _config = resolveConfig(config);
				let requestData = _config.data;
				const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
				let { responseType, onUploadProgress, onDownloadProgress } = _config;
				let onCanceled;
				let uploadThrottled, downloadThrottled;
				let flushUpload, flushDownload;
				function done() {
					flushUpload && flushUpload();
					flushDownload && flushDownload();
					_config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
					_config.signal && _config.signal.removeEventListener("abort", onCanceled);
				}
				let request = new XMLHttpRequest();
				request.open(_config.method.toUpperCase(), _config.url, true);
				request.timeout = _config.timeout;
				function onloadend() {
					if (!request) return;
					const responseHeaders = AxiosHeaders$1.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
					settle(function _resolve(value) {
						resolve(value);
						done();
					}, function _reject(err) {
						reject(err);
						done();
					}, {
						data: !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response,
						status: request.status,
						statusText: request.statusText,
						headers: responseHeaders,
						config,
						request
					});
					request = null;
				}
				if ("onloadend" in request) request.onloadend = onloadend;
				else request.onreadystatechange = function handleLoad() {
					if (!request || request.readyState !== 4) return;
					if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith("file:"))) return;
					setTimeout(onloadend);
				};
				request.onabort = function handleAbort() {
					if (!request) return;
					reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
					done();
					request = null;
				};
				request.onerror = function handleError(event) {
					const msg = event && event.message ? event.message : "Network Error";
					const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
					err.event = event || null;
					reject(err);
					done();
					request = null;
				};
				request.ontimeout = function handleTimeout() {
					let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
					const transitional = _config.transitional || transitional_default;
					if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
					reject(new AxiosError$1(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED, config, request));
					done();
					request = null;
				};
				requestData === void 0 && requestHeaders.setContentType(null);
				if ("setRequestHeader" in request) utils_default.forEach(toByteStringHeaderObject(requestHeaders), function setRequestHeader(val, key) {
					request.setRequestHeader(key, val);
				});
				if (!utils_default.isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
				if (responseType && responseType !== "json") request.responseType = _config.responseType;
				if (onDownloadProgress) {
					[downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
					request.addEventListener("progress", downloadThrottled);
				}
				if (onUploadProgress && request.upload) {
					[uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
					request.upload.addEventListener("progress", uploadThrottled);
					request.upload.addEventListener("loadend", flushUpload);
				}
				if (_config.cancelToken || _config.signal) {
					onCanceled = (cancel) => {
						if (!request) return;
						reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
						request.abort();
						done();
						request = null;
					};
					_config.cancelToken && _config.cancelToken.subscribe(onCanceled);
					if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
				}
				const protocol = parseProtocol(_config.url);
				if (protocol && !platform_default.protocols.includes(protocol)) {
					reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
					done();
					return;
				}
				request.send(requestData || null);
			});
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/composeSignals.js
var composeSignals;
function init_composeSignals() {
	return (init_composeSignals = __esmMin((() => {
		init_CanceledError();
		init_AxiosError();
		init_utils$1();
		composeSignals = (signals, timeout) => {
			signals = signals ? signals.filter(Boolean) : [];
			if (!timeout && !signals.length) return;
			const controller = new AbortController();
			let aborted = false;
			const onabort = function(reason) {
				if (!aborted) {
					aborted = true;
					unsubscribe();
					const err = reason instanceof Error ? reason : this.reason;
					controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
				}
			};
			let timer = timeout && setTimeout(() => {
				timer = null;
				onabort(new AxiosError$1(`timeout of ${timeout}ms exceeded`, AxiosError$1.ETIMEDOUT));
			}, timeout);
			const unsubscribe = () => {
				if (!signals) return;
				timer && clearTimeout(timer);
				timer = null;
				signals.forEach((signal) => {
					signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener("abort", onabort);
				});
				signals = null;
			};
			signals.forEach((signal) => signal.addEventListener("abort", onabort, { once: true }));
			const { signal } = controller;
			signal.unsubscribe = () => utils_default.asap(unsubscribe);
			return signal;
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/trackStream.js
var streamChunk, readBytes, readStream, trackStream;
function init_trackStream() {
	return (init_trackStream = __esmMin((() => {
		streamChunk = function* (chunk, chunkSize) {
			let len = chunk.byteLength;
			if (!chunkSize || len < chunkSize) {
				yield chunk;
				return;
			}
			let pos = 0;
			let end;
			while (pos < len) {
				end = pos + chunkSize;
				yield chunk.slice(pos, end);
				pos = end;
			}
		};
		readBytes = async function* (iterable, chunkSize) {
			for await (const chunk of readStream(iterable)) yield* streamChunk(chunk, chunkSize);
		};
		readStream = async function* (stream) {
			if (stream[Symbol.asyncIterator]) {
				yield* stream;
				return;
			}
			const reader = stream.getReader();
			try {
				for (;;) {
					const { done, value } = await reader.read();
					if (done) break;
					yield value;
				}
			} finally {
				await reader.cancel();
			}
		};
		trackStream = (stream, chunkSize, onProgress, onFinish) => {
			const iterator = readBytes(stream, chunkSize);
			let bytes = 0;
			let done;
			let _onFinish = (e) => {
				if (!done) {
					done = true;
					onFinish && onFinish(e);
				}
			};
			return new ReadableStream({
				async pull(controller) {
					try {
						const { done, value } = await iterator.next();
						if (done) {
							_onFinish();
							controller.close();
							return;
						}
						let len = value.byteLength;
						if (onProgress) onProgress(bytes += len);
						controller.enqueue(new Uint8Array(value));
					} catch (err) {
						_onFinish(err);
						throw err;
					}
				},
				cancel(reason) {
					_onFinish(reason);
					return iterator.return();
				}
			}, { highWaterMark: 2 });
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js
function estimateDataURLDecodedBytes(url) {
	if (!url || typeof url !== "string") return 0;
	if (!url.startsWith("data:")) return 0;
	const comma = url.indexOf(",");
	if (comma < 0) return 0;
	const meta = url.slice(5, comma);
	const body = url.slice(comma + 1);
	if (/;base64/i.test(meta)) {
		let effectiveLen = body.length;
		const len = body.length;
		for (let i = 0; i < len; i++) if (body.charCodeAt(i) === 37 && i + 2 < len) {
			const a = body.charCodeAt(i + 1);
			const b = body.charCodeAt(i + 2);
			if (isHexDigit(a) && isHexDigit(b)) {
				effectiveLen -= 2;
				i += 2;
			}
		}
		let pad = 0;
		let idx = len - 1;
		const tailIsPct3D = (j) => j >= 2 && body.charCodeAt(j - 2) === 37 && body.charCodeAt(j - 1) === 51 && (body.charCodeAt(j) === 68 || body.charCodeAt(j) === 100);
		if (idx >= 0) {
			if (body.charCodeAt(idx) === 61) {
				pad++;
				idx--;
			} else if (tailIsPct3D(idx)) {
				pad++;
				idx -= 3;
			}
		}
		if (pad === 1 && idx >= 0) {
			if (body.charCodeAt(idx) === 61) pad++;
			else if (tailIsPct3D(idx)) pad++;
		}
		const bytes = Math.floor(effectiveLen / 4) * 3 - (pad || 0);
		return bytes > 0 ? bytes : 0;
	}
	let bytes = 0;
	for (let i = 0, len = body.length; i < len; i++) {
		const c = body.charCodeAt(i);
		if (c === 37 && isPercentEncodedByte(body, i, len)) {
			bytes += 1;
			i += 2;
		} else if (c < 128) bytes += 1;
		else if (c < 2048) bytes += 2;
		else if (c >= 55296 && c <= 56319 && i + 1 < len) {
			const next = body.charCodeAt(i + 1);
			if (next >= 56320 && next <= 57343) {
				bytes += 4;
				i++;
			} else bytes += 3;
		} else bytes += 3;
	}
	return bytes;
}
var isHexDigit, isPercentEncodedByte;
function init_estimateDataURLDecodedBytes() {
	return (init_estimateDataURLDecodedBytes = __esmMin((() => {
		isHexDigit = (charCode) => charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 70 || charCode >= 97 && charCode <= 102;
		isPercentEncodedByte = (str, i, len) => i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/env/data.js
var VERSION$1;
function init_data() {
	return (init_data = __esmMin((() => {
		VERSION$1 = "1.18.1";
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/adapters/fetch.js
var DEFAULT_CHUNK_SIZE, isFunction, encodeUTF8, decodeURIComponentSafe, test, maybeWithAuthCredentials, factory, seedCache, getFetch;
function init_fetch() {
	return (init_fetch = __esmMin((() => {
		init_platform();
		init_utils$1();
		init_AxiosError();
		init_composeSignals();
		init_trackStream();
		init_AxiosHeaders();
		init_progressEventReducer();
		init_resolveConfig();
		init_settle();
		init_estimateDataURLDecodedBytes();
		init_data();
		init_sanitizeHeaderValue();
		DEFAULT_CHUNK_SIZE = 65536;
		({isFunction} = utils_default);
		encodeUTF8 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
		decodeURIComponentSafe = (value) => {
			if (!utils_default.isString(value)) return value;
			try {
				return decodeURIComponent(value);
			} catch (error) {
				return value;
			}
		};
		test = (fn, ...args) => {
			try {
				return !!fn(...args);
			} catch (e) {
				return false;
			}
		};
		maybeWithAuthCredentials = (url) => {
			const protocolIndex = url.indexOf("://");
			let urlToCheck = url;
			if (protocolIndex !== -1) urlToCheck = urlToCheck.slice(protocolIndex + 3);
			return urlToCheck.includes("@") || urlToCheck.includes(":");
		};
		factory = (env) => {
			const globalObject = utils_default.global !== void 0 && utils_default.global !== null ? utils_default.global : globalThis;
			const { ReadableStream, TextEncoder } = globalObject;
			env = utils_default.merge.call({ skipUndefined: true }, {
				Request: globalObject.Request,
				Response: globalObject.Response
			}, env);
			const { fetch: envFetch, Request, Response } = env;
			const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
			const isRequestSupported = isFunction(Request);
			const isResponseSupported = isFunction(Response);
			if (!isFetchSupported) return false;
			const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);
			const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
			const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
				let duplexAccessed = false;
				const request = new Request(platform_default.origin, {
					body: new ReadableStream(),
					method: "POST",
					get duplex() {
						duplexAccessed = true;
						return "half";
					}
				});
				const hasContentType = request.headers.has("Content-Type");
				if (request.body != null) request.body.cancel();
				return duplexAccessed && !hasContentType;
			});
			const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
			const resolvers = { stream: supportsResponseStream && ((res) => res.body) };
			isFetchSupported && (() => {
				[
					"text",
					"arrayBuffer",
					"blob",
					"formData",
					"stream"
				].forEach((type) => {
					!resolvers[type] && (resolvers[type] = (res, config) => {
						let method = res && res[type];
						if (method) return method.call(res);
						throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
					});
				});
			})();
			const getBodyLength = async (body) => {
				if (body == null) return 0;
				if (utils_default.isBlob(body)) return body.size;
				if (utils_default.isSpecCompliantForm(body)) return (await new Request(platform_default.origin, {
					method: "POST",
					body
				}).arrayBuffer()).byteLength;
				if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) return body.byteLength;
				if (utils_default.isURLSearchParams(body)) body = body + "";
				if (utils_default.isString(body)) return (await encodeText(body)).byteLength;
			};
			const resolveBodyLength = async (headers, body) => {
				const length = utils_default.toFiniteNumber(headers.getContentLength());
				return length == null ? getBodyLength(body) : length;
			};
			return async (config) => {
				let { url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = "same-origin", fetchOptions, maxContentLength, maxBodyLength } = resolveConfig(config);
				const hasMaxContentLength = utils_default.isNumber(maxContentLength) && maxContentLength > -1;
				const hasMaxBodyLength = utils_default.isNumber(maxBodyLength) && maxBodyLength > -1;
				const own = (key) => utils_default.hasOwnProp(config, key) ? config[key] : void 0;
				let _fetch = envFetch || fetch;
				responseType = responseType ? (responseType + "").toLowerCase() : "text";
				let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
				let request = null;
				const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
					composedSignal.unsubscribe();
				});
				let requestContentLength;
				let pendingBodyError = null;
				const maxBodyLengthError = () => new AxiosError$1("Request body larger than maxBodyLength limit", AxiosError$1.ERR_BAD_REQUEST, config, request);
				try {
					let auth = void 0;
					const configAuth = own("auth");
					if (configAuth) auth = {
						username: utils_default.getSafeProp(configAuth, "username") || "",
						password: utils_default.getSafeProp(configAuth, "password") || ""
					};
					if (maybeWithAuthCredentials(url)) {
						const parsedURL = new URL(url, platform_default.origin);
						if (!auth && (parsedURL.username || parsedURL.password)) auth = {
							username: decodeURIComponentSafe(parsedURL.username),
							password: decodeURIComponentSafe(parsedURL.password)
						};
						if (parsedURL.username || parsedURL.password) {
							parsedURL.username = "";
							parsedURL.password = "";
							url = parsedURL.href;
						}
					}
					if (auth) {
						headers.delete("authorization");
						headers.set("Authorization", "Basic " + btoa(encodeUTF8((auth.username || "") + ":" + (auth.password || ""))));
					}
					if (hasMaxContentLength && typeof url === "string" && url.startsWith("data:")) {
						if (estimateDataURLDecodedBytes(url) > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
					}
					if (hasMaxBodyLength && method !== "get" && method !== "head") {
						const outboundLength = await getBodyLength(data);
						if (typeof outboundLength === "number" && isFinite(outboundLength)) {
							requestContentLength = outboundLength;
							if (outboundLength > maxBodyLength) throw maxBodyLengthError();
						}
					}
					const mustEnforceStreamBody = hasMaxBodyLength && (utils_default.isReadableStream(data) || utils_default.isStream(data));
					const trackRequestStream = (stream, onProgress, flush) => trackStream(stream, DEFAULT_CHUNK_SIZE, (loadedBytes) => {
						if (hasMaxBodyLength && loadedBytes > maxBodyLength) throw pendingBodyError = maxBodyLengthError();
						onProgress && onProgress(loadedBytes);
					}, flush);
					if (supportsRequestStream && method !== "get" && method !== "head" && (onUploadProgress || mustEnforceStreamBody)) {
						requestContentLength = requestContentLength == null ? await resolveBodyLength(headers, data) : requestContentLength;
						if (requestContentLength !== 0 || mustEnforceStreamBody) {
							let _request = new Request(url, {
								method: "POST",
								body: data,
								duplex: "half"
							});
							let contentTypeHeader;
							if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) headers.setContentType(contentTypeHeader);
							if (_request.body) {
								const [onProgress, flush] = onUploadProgress && progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress))) || [];
								data = trackRequestStream(_request.body, onProgress, flush);
							}
						}
					} else if (mustEnforceStreamBody && !isRequestSupported && isReadableStreamSupported && method !== "get" && method !== "head") data = trackRequestStream(data);
					else if (mustEnforceStreamBody && isRequestSupported && !supportsRequestStream && method !== "get" && method !== "head") throw new AxiosError$1("Stream request bodies are not supported by the current fetch implementation", AxiosError$1.ERR_NOT_SUPPORT, config, request);
					if (!utils_default.isString(withCredentials)) withCredentials = withCredentials ? "include" : "omit";
					const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
					if (utils_default.isFormData(data)) {
						const contentType = headers.getContentType();
						if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) headers.delete("content-type");
					}
					headers.set("User-Agent", "axios/" + VERSION$1, false);
					const resolvedOptions = {
						...fetchOptions,
						signal: composedSignal,
						method: method.toUpperCase(),
						headers: toByteStringHeaderObject(headers.normalize()),
						body: data,
						duplex: "half",
						credentials: isCredentialsSupported ? withCredentials : void 0
					};
					request = isRequestSupported && new Request(url, resolvedOptions);
					let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
					const responseHeaders = AxiosHeaders$1.from(response.headers);
					if (hasMaxContentLength) {
						const declaredLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
						if (declaredLength != null && declaredLength > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
					}
					const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
					if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
						const options = {};
						[
							"status",
							"statusText",
							"headers"
						].forEach((prop) => {
							options[prop] = response[prop];
						});
						const responseContentLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
						const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
						let bytesRead = 0;
						const onChunkProgress = (loadedBytes) => {
							if (hasMaxContentLength) {
								bytesRead = loadedBytes;
								if (bytesRead > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
							}
							onProgress && onProgress(loadedBytes);
						};
						response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
							flush && flush();
							unsubscribe && unsubscribe();
						}), options);
					}
					responseType = responseType || "text";
					let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
					if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
						let materializedSize;
						if (responseData != null) {
							if (typeof responseData.byteLength === "number") materializedSize = responseData.byteLength;
							else if (typeof responseData.size === "number") materializedSize = responseData.size;
							else if (typeof responseData === "string") materializedSize = typeof TextEncoder === "function" ? new TextEncoder().encode(responseData).byteLength : responseData.length;
						}
						if (typeof materializedSize === "number" && materializedSize > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
					}
					!isStreamResponse && unsubscribe && unsubscribe();
					return await new Promise((resolve, reject) => {
						settle(resolve, reject, {
							data: responseData,
							headers: AxiosHeaders$1.from(response.headers),
							status: response.status,
							statusText: response.statusText,
							config,
							request
						});
					});
				} catch (err) {
					unsubscribe && unsubscribe();
					if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError$1) {
						const canceledError = composedSignal.reason;
						canceledError.config = config;
						request && (canceledError.request = request);
						if (err !== canceledError) Object.defineProperty(canceledError, "cause", {
							__proto__: null,
							value: err,
							writable: true,
							enumerable: false,
							configurable: true
						});
						throw canceledError;
					}
					if (pendingBodyError) {
						request && !pendingBodyError.request && (pendingBodyError.request = request);
						throw pendingBodyError;
					}
					if (err instanceof AxiosError$1) {
						request && !err.request && (err.request = request);
						throw err;
					}
					if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
						const networkError = new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request, err && err.response);
						Object.defineProperty(networkError, "cause", {
							__proto__: null,
							value: err.cause || err,
							writable: true,
							enumerable: false,
							configurable: true
						});
						throw networkError;
					}
					throw AxiosError$1.from(err, err && err.code, config, request, err && err.response);
				}
			};
		};
		seedCache = /* @__PURE__ */ new Map();
		getFetch = (config) => {
			let env = config && config.env || {};
			const { fetch, Request, Response } = env;
			const seeds = [
				Request,
				Response,
				fetch
			];
			let i = seeds.length, seed, target, map = seedCache;
			while (i--) {
				seed = seeds[i];
				target = map.get(seed);
				target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
				map = target;
			}
			return target;
		};
		getFetch();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/adapters/adapters.js
/**
* Get the first suitable adapter from the provided list.
* Tries each adapter in order until a supported one is found.
* Throws an AxiosError if no adapter is suitable.
*
* @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
* @param {Object} config - Axios request configuration
* @throws {AxiosError} If no suitable adapter is available
* @returns {Function} The resolved adapter function
*/
function getAdapter$1(adapters, config) {
	adapters = utils_default.isArray(adapters) ? adapters : [adapters];
	const { length } = adapters;
	let nameOrAdapter;
	let adapter;
	const rejectedReasons = {};
	for (let i = 0; i < length; i++) {
		nameOrAdapter = adapters[i];
		let id;
		adapter = nameOrAdapter;
		if (!isResolvedHandle(nameOrAdapter)) {
			adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
			if (adapter === void 0) throw new AxiosError$1(`Unknown adapter '${id}'`);
		}
		if (adapter && (utils_default.isFunction(adapter) || (adapter = adapter.get(config)))) break;
		rejectedReasons[id || "#" + i] = adapter;
	}
	if (!adapter) {
		const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build"));
		let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
		throw new AxiosError$1(`There is no suitable adapter to dispatch the request ` + s, AxiosError$1.ERR_NOT_SUPPORT);
	}
	return adapter;
}
var knownAdapters, renderReason, isResolvedHandle, adapters_default;
function init_adapters() {
	return (init_adapters = __esmMin((() => {
		init_utils$1();
		init_xhr();
		init_fetch();
		init_AxiosError();
		knownAdapters = {
			http: null,
			xhr: xhr_default,
			fetch: { get: getFetch }
		};
		utils_default.forEach(knownAdapters, (fn, value) => {
			if (fn) {
				try {
					Object.defineProperty(fn, "name", {
						__proto__: null,
						value
					});
				} catch (e) {}
				Object.defineProperty(fn, "adapterName", {
					__proto__: null,
					value
				});
			}
		});
		renderReason = (reason) => `- ${reason}`;
		isResolvedHandle = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
		adapters_default = {
			/**
			* Resolve an adapter from a list of adapter names or functions.
			* @type {Function}
			*/
			getAdapter: getAdapter$1,
			/**
			* Exposes all known adapters
			* @type {Object<string, Function|Object>}
			*/
			adapters: knownAdapters
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/dispatchRequest.js
/**
* Throws a `CanceledError` if cancellation has been requested.
*
* @param {Object} config The config that is to be used for the request
*
* @returns {void}
*/
function throwIfCancellationRequested(config) {
	if (config.cancelToken) config.cancelToken.throwIfRequested();
	if (config.signal && config.signal.aborted) throw new CanceledError$1(null, config);
}
/**
* Dispatch a request to the server using the configured adapter.
*
* @param {object} config The config that is to be used for the request
*
* @returns {Promise} The Promise to be fulfilled
*/
function dispatchRequest(config) {
	throwIfCancellationRequested(config);
	config.headers = AxiosHeaders$1.from(config.headers);
	config.data = transformData.call(config, config.transformRequest);
	if ([
		"post",
		"put",
		"patch"
	].indexOf(config.method) !== -1) config.headers.setContentType("application/x-www-form-urlencoded", false);
	return adapters_default.getAdapter(config.adapter || defaults.adapter, config)(config).then(function onAdapterResolution(response) {
		throwIfCancellationRequested(config);
		config.response = response;
		try {
			response.data = transformData.call(config, config.transformResponse, response);
		} finally {
			delete config.response;
		}
		response.headers = AxiosHeaders$1.from(response.headers);
		return response;
	}, function onAdapterRejection(reason) {
		if (!isCancel$1(reason)) {
			throwIfCancellationRequested(config);
			if (reason && reason.response) {
				config.response = reason.response;
				try {
					reason.response.data = transformData.call(config, config.transformResponse, reason.response);
				} finally {
					delete config.response;
				}
				reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
			}
		}
		return Promise.reject(reason);
	});
}
function init_dispatchRequest() {
	return (init_dispatchRequest = __esmMin((() => {
		init_transformData();
		init_defaults();
		init_CanceledError();
		init_AxiosHeaders();
		init_adapters();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/validator.js
/**
* Assert object's properties type
*
* @param {object} options
* @param {object} schema
* @param {boolean?} allowUnknown
*
* @returns {object}
*/
function assertOptions(options, schema, allowUnknown) {
	if (typeof options !== "object" || options === null) throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
	const keys = Object.keys(options);
	let i = keys.length;
	while (i-- > 0) {
		const opt = keys[i];
		const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : void 0;
		if (validator) {
			const value = options[opt];
			const result = value === void 0 || validator(value, opt, options);
			if (result !== true) throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (allowUnknown !== true) throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
	}
}
var validators$1, deprecatedWarnings, validator_default;
function init_validator() {
	return (init_validator = __esmMin((() => {
		init_data();
		init_AxiosError();
		validators$1 = {};
		[
			"object",
			"boolean",
			"number",
			"function",
			"string",
			"symbol"
		].forEach((type, i) => {
			validators$1[type] = function validator(thing) {
				return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
			};
		});
		deprecatedWarnings = {};
		/**
		* Transitional option validator
		*
		* @param {function|boolean?} validator - set to false if the transitional option has been removed
		* @param {string?} version - deprecated version / removed since version
		* @param {string?} message - some message with additional info
		*
		* @returns {function}
		*/
		validators$1.transitional = function transitional(validator, version, message) {
			function formatMessage(opt, desc) {
				return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
			}
			return (value, opt, opts) => {
				if (validator === false) throw new AxiosError$1(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError$1.ERR_DEPRECATED);
				if (version && !deprecatedWarnings[opt]) {
					deprecatedWarnings[opt] = true;
					console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
				}
				return validator ? validator(value, opt, opts) : true;
			};
		};
		validators$1.spelling = function spelling(correctSpelling) {
			return (value, opt) => {
				console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
				return true;
			};
		};
		validator_default = {
			assertOptions,
			validators: validators$1
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/Axios.js
var validators, Axios$1;
function init_Axios() {
	return (init_Axios = __esmMin((() => {
		init_utils$1();
		init_buildURL();
		init_InterceptorManager();
		init_dispatchRequest();
		init_mergeConfig();
		init_buildFullPath();
		init_validator();
		init_AxiosHeaders();
		init_transitional();
		validators = validator_default.validators;
		Axios$1 = class {
			constructor(instanceConfig) {
				this.defaults = instanceConfig || {};
				this.interceptors = {
					request: new InterceptorManager(),
					response: new InterceptorManager()
				};
			}
			/**
			* Dispatch a request
			*
			* @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
			* @param {?Object} config
			*
			* @returns {Promise} The Promise to be fulfilled
			*/
			async request(configOrUrl, config) {
				try {
					return await this._request(configOrUrl, config);
				} catch (err) {
					if (err instanceof Error) {
						let dummy = {};
						Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = /* @__PURE__ */ new Error();
						const stack = (() => {
							if (!dummy.stack) return "";
							const firstNewlineIndex = dummy.stack.indexOf("\n");
							return firstNewlineIndex === -1 ? "" : dummy.stack.slice(firstNewlineIndex + 1);
						})();
						try {
							if (!err.stack) err.stack = stack;
							else if (stack) {
								const firstNewlineIndex = stack.indexOf("\n");
								const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
								const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
								if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) err.stack += "\n" + stack;
							}
						} catch (e) {}
					}
					throw err;
				}
			}
			_request(configOrUrl, config) {
				if (typeof configOrUrl === "string") {
					config = config || {};
					config.url = configOrUrl;
				} else config = configOrUrl || {};
				config = mergeConfig$1(this.defaults, config);
				const { transitional, paramsSerializer, headers } = config;
				if (transitional !== void 0) validator_default.assertOptions(transitional, {
					silentJSONParsing: validators.transitional(validators.boolean),
					forcedJSONParsing: validators.transitional(validators.boolean),
					clarifyTimeoutError: validators.transitional(validators.boolean),
					legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
					advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
					validateStatusUndefinedResolves: validators.transitional(validators.boolean)
				}, false);
				if (paramsSerializer != null) {
					if (utils_default.isFunction(paramsSerializer)) config.paramsSerializer = { serialize: paramsSerializer };
					else validator_default.assertOptions(paramsSerializer, {
						encode: validators.function,
						serialize: validators.function
					}, true);
				}
				if (config.allowAbsoluteUrls !== void 0) {} else if (this.defaults.allowAbsoluteUrls !== void 0) config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
				else config.allowAbsoluteUrls = true;
				validator_default.assertOptions(config, {
					baseUrl: validators.spelling("baseURL"),
					withXsrfToken: validators.spelling("withXSRFToken")
				}, true);
				config.method = (config.method || this.defaults.method || "get").toLowerCase();
				let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
				headers && utils_default.forEach([
					"delete",
					"get",
					"head",
					"post",
					"put",
					"patch",
					"query",
					"common"
				], (method) => {
					delete headers[method];
				});
				config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
				const requestInterceptorChain = [];
				let synchronousRequestInterceptors = true;
				this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
					if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) return;
					synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
					const transitional = config.transitional || transitional_default;
					if (transitional && transitional.legacyInterceptorReqResOrdering) requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
					else requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
				});
				const responseInterceptorChain = [];
				this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
					responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
				});
				let promise;
				let i = 0;
				let len;
				if (!synchronousRequestInterceptors) {
					const chain = [dispatchRequest.bind(this), void 0];
					chain.unshift(...requestInterceptorChain);
					chain.push(...responseInterceptorChain);
					len = chain.length;
					promise = Promise.resolve(config);
					while (i < len) promise = promise.then(chain[i++], chain[i++]);
					return promise;
				}
				len = requestInterceptorChain.length;
				let newConfig = config;
				while (i < len) {
					const onFulfilled = requestInterceptorChain[i++];
					const onRejected = requestInterceptorChain[i++];
					try {
						newConfig = onFulfilled(newConfig);
					} catch (error) {
						onRejected.call(this, error);
						break;
					}
				}
				try {
					promise = dispatchRequest.call(this, newConfig);
				} catch (error) {
					return Promise.reject(error);
				}
				i = 0;
				len = responseInterceptorChain.length;
				while (i < len) promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
				return promise;
			}
			getUri(config) {
				config = mergeConfig$1(this.defaults, config);
				return buildURL(buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls, config), config.params, config.paramsSerializer);
			}
		};
		utils_default.forEach([
			"delete",
			"get",
			"head",
			"options"
		], function forEachMethodNoData(method) {
			Axios$1.prototype[method] = function(url, config) {
				return this.request(mergeConfig$1(config || {}, {
					method,
					url,
					data: config && utils_default.hasOwnProp(config, "data") ? config.data : void 0
				}));
			};
		});
		utils_default.forEach([
			"post",
			"put",
			"patch",
			"query"
		], function forEachMethodWithData(method) {
			function generateHTTPMethod(isForm) {
				return function httpMethod(url, data, config) {
					return this.request(mergeConfig$1(config || {}, {
						method,
						headers: isForm ? { "Content-Type": "multipart/form-data" } : {},
						url,
						data
					}));
				};
			}
			Axios$1.prototype[method] = generateHTTPMethod();
			if (method !== "query") Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/CancelToken.js
var CancelToken$1;
function init_CancelToken() {
	return (init_CancelToken = __esmMin((() => {
		init_CanceledError();
		CancelToken$1 = class CancelToken$1 {
			constructor(executor) {
				if (typeof executor !== "function") throw new TypeError("executor must be a function.");
				let resolvePromise;
				this.promise = new Promise(function promiseExecutor(resolve) {
					resolvePromise = resolve;
				});
				const token = this;
				this.promise.then((cancel) => {
					if (!token._listeners) return;
					let i = token._listeners.length;
					while (i-- > 0) token._listeners[i](cancel);
					token._listeners = null;
				});
				this.promise.then = (onfulfilled) => {
					let _resolve;
					const promise = new Promise((resolve) => {
						token.subscribe(resolve);
						_resolve = resolve;
					}).then(onfulfilled);
					promise.cancel = function reject() {
						token.unsubscribe(_resolve);
					};
					return promise;
				};
				executor(function cancel(message, config, request) {
					if (token.reason) return;
					token.reason = new CanceledError$1(message, config, request);
					resolvePromise(token.reason);
				});
			}
			/**
			* Throws a `CanceledError` if cancellation has been requested.
			*/
			throwIfRequested() {
				if (this.reason) throw this.reason;
			}
			/**
			* Subscribe to the cancel signal
			*/
			subscribe(listener) {
				if (this.reason) {
					listener(this.reason);
					return;
				}
				if (this._listeners) this._listeners.push(listener);
				else this._listeners = [listener];
			}
			/**
			* Unsubscribe from the cancel signal
			*/
			unsubscribe(listener) {
				if (!this._listeners) return;
				const index = this._listeners.indexOf(listener);
				if (index !== -1) this._listeners.splice(index, 1);
			}
			toAbortSignal() {
				const controller = new AbortController();
				const abort = (err) => {
					controller.abort(err);
				};
				this.subscribe(abort);
				controller.signal.unsubscribe = () => this.unsubscribe(abort);
				return controller.signal;
			}
			/**
			* Returns an object that contains a new `CancelToken` and a function that, when called,
			* cancels the `CancelToken`.
			*/
			static source() {
				let cancel;
				return {
					token: new CancelToken$1(function executor(c) {
						cancel = c;
					}),
					cancel
				};
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/spread.js
/**
* Syntactic sugar for invoking a function and expanding an array for arguments.
*
* Common use case would be to use `Function.prototype.apply`.
*
*  ```js
*  function f(x, y, z) {}
*  const args = [1, 2, 3];
*  f.apply(null, args);
*  ```
*
* With `spread` this example can be re-written.
*
*  ```js
*  spread(function(x, y, z) {})([1, 2, 3]);
*  ```
*
* @param {Function} callback
*
* @returns {Function}
*/
function spread$1(callback) {
	return function wrap(arr) {
		return callback.apply(null, arr);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/isAxiosError.js
/**
* Determines whether the payload is an error thrown by Axios
*
* @param {*} payload The value to test
*
* @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
*/
function isAxiosError$1(payload) {
	return utils_default.isObject(payload) && payload.isAxiosError === true;
}
function init_isAxiosError() {
	return (init_isAxiosError = __esmMin((() => {
		init_utils$1();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode$1;
function init_HttpStatusCode() {
	return (init_HttpStatusCode = __esmMin((() => {
		HttpStatusCode$1 = {
			Continue: 100,
			SwitchingProtocols: 101,
			Processing: 102,
			EarlyHints: 103,
			Ok: 200,
			Created: 201,
			Accepted: 202,
			NonAuthoritativeInformation: 203,
			NoContent: 204,
			ResetContent: 205,
			PartialContent: 206,
			MultiStatus: 207,
			AlreadyReported: 208,
			ImUsed: 226,
			MultipleChoices: 300,
			MovedPermanently: 301,
			Found: 302,
			SeeOther: 303,
			NotModified: 304,
			UseProxy: 305,
			Unused: 306,
			TemporaryRedirect: 307,
			PermanentRedirect: 308,
			BadRequest: 400,
			Unauthorized: 401,
			PaymentRequired: 402,
			Forbidden: 403,
			NotFound: 404,
			MethodNotAllowed: 405,
			NotAcceptable: 406,
			ProxyAuthenticationRequired: 407,
			RequestTimeout: 408,
			Conflict: 409,
			Gone: 410,
			LengthRequired: 411,
			PreconditionFailed: 412,
			PayloadTooLarge: 413,
			UriTooLong: 414,
			UnsupportedMediaType: 415,
			RangeNotSatisfiable: 416,
			ExpectationFailed: 417,
			ImATeapot: 418,
			MisdirectedRequest: 421,
			UnprocessableEntity: 422,
			Locked: 423,
			FailedDependency: 424,
			TooEarly: 425,
			UpgradeRequired: 426,
			PreconditionRequired: 428,
			TooManyRequests: 429,
			RequestHeaderFieldsTooLarge: 431,
			UnavailableForLegalReasons: 451,
			InternalServerError: 500,
			NotImplemented: 501,
			BadGateway: 502,
			ServiceUnavailable: 503,
			GatewayTimeout: 504,
			HttpVersionNotSupported: 505,
			VariantAlsoNegotiates: 506,
			InsufficientStorage: 507,
			LoopDetected: 508,
			NotExtended: 510,
			NetworkAuthenticationRequired: 511,
			WebServerIsDown: 521,
			ConnectionTimedOut: 522,
			OriginIsUnreachable: 523,
			TimeoutOccurred: 524,
			SslHandshakeFailed: 525,
			InvalidSslCertificate: 526
		};
		Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
			HttpStatusCode$1[value] = key;
		});
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/axios.js
/**
* Create an instance of Axios
*
* @param {Object} defaultConfig The default config for the instance
*
* @returns {Axios} A new instance of Axios
*/
function createInstance(defaultConfig) {
	const context = new Axios$1(defaultConfig);
	const instance = bind(Axios$1.prototype.request, context);
	utils_default.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
	utils_default.extend(instance, context, null, { allOwnKeys: true });
	instance.create = function create(instanceConfig) {
		return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
	};
	return instance;
}
var axios;
function init_axios() {
	return (init_axios = __esmMin((() => {
		init_utils$1();
		init_Axios();
		init_mergeConfig();
		init_defaults();
		init_formDataToJSON();
		init_CanceledError();
		init_CancelToken();
		init_data();
		init_toFormData();
		init_AxiosError();
		init_isAxiosError();
		init_AxiosHeaders();
		init_adapters();
		init_HttpStatusCode();
		axios = createInstance(defaults);
		axios.Axios = Axios$1;
		axios.CanceledError = CanceledError$1;
		axios.CancelToken = CancelToken$1;
		axios.isCancel = isCancel$1;
		axios.VERSION = VERSION$1;
		axios.toFormData = toFormData$1;
		axios.AxiosError = AxiosError$1;
		axios.Cancel = axios.CanceledError;
		axios.all = function all(promises) {
			return Promise.all(promises);
		};
		axios.spread = spread$1;
		axios.isAxiosError = isAxiosError$1;
		axios.mergeConfig = mergeConfig$1;
		axios.AxiosHeaders = AxiosHeaders$1;
		axios.formToJSON = (thing) => formDataToJSON(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
		axios.getAdapter = adapters_default.getAdapter;
		axios.HttpStatusCode = HttpStatusCode$1;
		axios.default = axios;
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/index.js
var Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig, create;
function init_axios$1() {
	return (init_axios$1 = __esmMin((() => {
		init_axios();
		({Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig, create} = axios);
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/axios/AxiosRestClient.js
var AxiosRestClient;
function init_AxiosRestClient() {
	return (init_AxiosRestClient = __esmMin((() => {
		init_axios$1();
		init_internal();
		init_RestClient();
		init_AxiosResponseHeadersAdapter();
		AxiosRestClient = class AxiosRestClient {
			static retryCountUpperBound = 10;
			_retryPolicy;
			constructor(retryPolicy) {
				this._retryPolicy = retryPolicy;
			}
			async sendGetRequest(params) {
				const requestConfig = { headers: params.headers };
				if (params.responseType === ContentType.Png) {
					requestConfig.responseType = "arraybuffer";
					const response = await this.executeRequest(async () => axios.get(params.url, requestConfig));
					const data = response.body;
					if (data instanceof ArrayBuffer) return {
						...response,
						body: new Uint8Array(data)
					};
					return response;
				}
				return this.executeRequest(async () => axios.get(params.url, requestConfig));
			}
			async sendPostRequest(params) {
				const requestConfig = { headers: params.headers };
				return this.executeRequest(async () => axios.post(params.url, params.body.content ?? {}, requestConfig));
			}
			async sendPutRequest(params) {
				const requestConfig = { headers: params.headers };
				return this.executeRequest(async () => axios.put(params.url, params.body?.content, requestConfig));
			}
			async sendPatchRequest(params) {
				const requestConfig = { headers: params.headers };
				return this.executeRequest(async () => axios.patch(params.url, params.body.content ?? {}, requestConfig));
			}
			async sendDeleteRequest(params) {
				const requestConfig = { headers: params.headers };
				return this.executeRequest(async () => axios.delete(params.url, requestConfig));
			}
			async executeRequest(requestFunc) {
				const response = await this.executeWithRetry(requestFunc);
				return {
					body: response.data,
					headers: new AxiosResponseHeadersAdapter(response)
				};
			}
			async executeWithRetry(requestFunc) {
				let retriesInvoked = 0;
				for (;;) try {
					return await requestFunc();
				} catch (error) {
					if (this._retryPolicy === null || retriesInvoked >= this._retryPolicy.maxRetries || retriesInvoked >= AxiosRestClient.retryCountUpperBound || !await this._retryPolicy.shouldRetry({
						retriesInvoked,
						error
					})) throw error;
					const sleepDurationInMs = this._retryPolicy.getSleepDurationInMs({ retriesInvoked: retriesInvoked++ });
					if (sleepDurationInMs > 0) await UtilityFunctions.sleep(sleepDurationInMs);
				}
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/axios/AxiosRetryPolicy.js
var AxiosRetryPolicy;
function init_AxiosRetryPolicy() {
	return (init_AxiosRetryPolicy = __esmMin((() => {
		init_axios$1();
		init_Constants();
		AxiosRetryPolicy = class {
			_backoffAlgorithm;
			constructor(params) {
				this.maxRetries = params.maxRetries;
				this._backoffAlgorithm = params.backoffAlgorithm;
			}
			maxRetries;
			shouldRetry(params) {
				if (isAxiosError(params.error) && params.error.response?.status != null) return params.error.response.status >= Constants$1.httpStatusCodes.internalServerError;
				return true;
			}
			getSleepDurationInMs(params) {
				return this._backoffAlgorithm.getSleepDurationInMs(params.retriesInvoked);
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/axios/ExponentialBackoffAlgorithm.js
var ExponentialBackoffAlgorithm;
function init_ExponentialBackoffAlgorithm() {
	return (init_ExponentialBackoffAlgorithm = __esmMin((() => {
		ExponentialBackoffAlgorithm = class {
			_baseDelayInMs;
			_factor;
			constructor(params) {
				this._baseDelayInMs = params.baseDelayInMs;
				this._factor = params.factor;
			}
			getSleepDurationInMs(attempt) {
				return Math.pow(this._factor, attempt) * this._baseDelayInMs;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/axios/index.js
function init_axios$2() {
	return (init_axios$2 = __esmMin((() => {
		init_AxiosRestClient();
		init_AxiosRetryPolicy();
		init_ExponentialBackoffAlgorithm();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/SharedFunctions.js
async function getUser(authorization, userOperations, urlFormatter, userLink, headers) {
	if (!userLink) return void 0;
	const { iModelId, userId } = urlFormatter.parseUserUrl(userLink);
	return userOperations.getSingle({
		authorization,
		iModelId,
		userId,
		headers
	});
}
function assertStringHeaderValue(headerName, headerValue) {
	if (!(typeof headerValue === "string" || headerValue instanceof String)) throw new Error(`Assertion failed: header's ${headerName} value is not a string.`);
}
function assertLink(link) {
	if (!link || !link.href) throw new Error("Assertion failed: link is falsy.");
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/imodel/IModelOperations.js
var IModelOperations;
function init_IModelOperations() {
	return (init_IModelOperations = __esmMin((() => {
		init_internal();
		init_types();
		init_Constants();
		IModelOperations = class extends OperationsBase {
			_iModelsClient;
			constructor(options, _iModelsClient) {
				super(options);
				this._iModelsClient = _iModelsClient;
			}
			/**
			* Gets iModels for a specific iTwin. This method returns iModels in their minimal representation. The returned iterator
			* internally queries entities in pages. Wraps the {@link https://developer.bentley.com/apis/imodels-v2/operations/get-itwin-imodels/ Get iTwin iModels}
			* operation from iModels API.
			* @param {GetIModelListParams} params parameters for this operation. See {@link GetIModelListParams}.
			* @returns {EntityListIterator<MinimalIModel>} iterator for iModel list. See {@link EntityListIterator}, {@link MinimalIModel}.
			*/
			getMinimalList(params) {
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getIModelListUrl({ urlParams: params.urlParams }),
					preferReturn: PreferReturn.Minimal,
					entityCollectionAccessor: (response) => response.body.iModels,
					headers: params.headers
				}));
			}
			/**
			* Gets iModels for a specific iTwin. This method returns iModels in their full representation. The returned iterator
			* internally queries entities in pages. Wraps the {@link https://developer.bentley.com/apis/imodels-v2/operations/get-itwin-imodels/ Get iTwin iModels}
			* operation from iModels API.
			* @param {GetIModelListParams} params parameters for this operation. See {@link GetIModelListParams}.
			* @returns {EntityListIterator<IModel>} iterator for iModel list. See {@link EntityListIterator}, {@link IModel}.
			*/
			getRepresentationList(params) {
				const entityCollectionAccessor = (response) => {
					return response.body.iModels.map((iModel) => this.appendRelatedEntityCallbacks(params.authorization, iModel, params.headers));
				};
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getIModelListUrl({ urlParams: params.urlParams }),
					preferReturn: PreferReturn.Representation,
					entityCollectionAccessor,
					headers: params.headers
				}));
			}
			/**
			* Gets a single iModel by its id. This method returns an iModel in its full representation. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-details/ Get iModel} operation from iModels API.
			* @param {GetSingleIModelParams} params parameters for this operation. See {@link GetSingleIModelParams}.
			* @returns {Promise<iModel>} an iModel with specified id. See {@link IModel}.
			*/
			async getSingle(params) {
				const response = await this.sendGetRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getSingleIModelUrl({ iModelId: params.iModelId }),
					headers: params.headers
				});
				return this.appendRelatedEntityCallbacks(params.authorization, response.body.iModel, params.headers);
			}
			/**
			* Creates an empty iModel with specified properties. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/create-imodel/ Create iModel} operation from iModels API.
			* @param {CreateEmptyIModelParams} params parameters for this operation. See {@link CreateEmptyIModelParams}.
			* @returns {Promise<iModel>} newly created iModel. See {@link IModel}.
			*/
			async createEmpty(params) {
				const createIModelBody = this.getCreateEmptyIModelRequestBody(params.iModelProperties);
				if (createIModelBody.geographicCoordinateSystem && createIModelBody.creationMode !== "empty") throw new IModelsErrorImpl({
					code: IModelsErrorCode.InvalidIModelGCSCreationMode,
					message: "For empty iModels, GeographicCoordinateSystem can only be set when creationMode is 'empty'.",
					originalError: void 0,
					statusCode: void 0,
					details: void 0
				});
				let createdIModel = await this.sendIModelPostRequest(params.authorization, createIModelBody, params.headers);
				if (createdIModel.state === IModelState.NotInitialized) {
					await this.waitForEmptyIModelInitialization({
						authorization: params.authorization,
						headers: params.headers,
						iModelId: createdIModel.id,
						timeOutInMs: params.timeOutInMs
					});
					createdIModel = await this.getSingle({
						authorization: params.authorization,
						iModelId: createdIModel.id
					});
				}
				return this.appendRelatedEntityCallbacks(params.authorization, createdIModel, params.headers);
			}
			/**
			* Creates an iModel from a template. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/create-imodel/ Create iModel} operation from iModels API.
			* It uses the `template` request body property to specify the source iModel which will be used as a template. Internally
			* this method creates the iModel instance and then repeatedly queries the iModel state until the iModel is initialized.
			* The execution of this method can take up to several minutes due to waiting for initialization to complete.
			* @param {CreateIModelFromTemplateParams} params parameters for this operation. See {@link CreateIModelFromTemplateParams}.
			* @returns {Promise<iModel>} newly created iModel. See {@link IModel}.
			* @throws an error that implements `iModelsError` interface with code {@link IModelsErrorCode.IModelFromTemplateInitializationFailed} if
			* iModel initialization failed or did not complete in time. See {@link IModelsErrorCode}.
			*/
			async createFromTemplate(params) {
				const createIModelBody = this.getCreateIModelFromTemplateRequestBody(params.iModelProperties);
				const createdIModel = await this.sendIModelPostRequest(params.authorization, createIModelBody, params.headers);
				await this.waitForTemplatedIModelInitialization({
					authorization: params.authorization,
					iModelId: createdIModel.id,
					headers: params.headers,
					timeOutInMs: params.timeOutInMs
				});
				return this.getSingle({
					authorization: params.authorization,
					iModelId: createdIModel.id,
					headers: params.headers
				});
			}
			/**
			* Clones the specified iModel. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/clone-imodel/ Clone iModel} operation from iModels API.
			* Internally this method clones the iModel and then repeatedly queries the new iModel's state until it is initialized.
			* The execution of this method can take up to several minutes due to waiting for initialization to complete.
			* @param {CloneIModelParams} params parameters for this operation. See {@link CloneIModelParams}.
			* @returns {Promise<IModel>} newly created iModel. See {@link IModel}.
			* @throws an error that implements `iModelsError` interface with code {@link IModelsErrorCode.ClonedIModelInitializationFailed} if
			* iModel initialization failed or {@link IModelsErrorCode.ClonedIModelInitializationTimedOut} if operation did not complete in time.
			* See {@link IModelsErrorCode}.
			*/
			async clone(params) {
				const cloneIModelBody = this.getCloneIModelRequestBody(params.iModelProperties);
				const locationHeaderValue = (await this.sendPostRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getCloneIModelUrl({ iModelId: params.iModelId }),
					body: cloneIModelBody,
					headers: params.headers
				})).headers.get(Constants$1.headers.location);
				assertStringHeaderValue(Constants$1.headers.location, locationHeaderValue);
				const { iModelId: clonedIModelId } = this._options.urlFormatter.parseIModelUrl(locationHeaderValue);
				await this.waitForClonedIModelInitialization({
					authorization: params.authorization,
					iModelId: clonedIModelId,
					headers: params.headers,
					timeOutInMs: params.timeOutInMs
				});
				return this.getSingle({
					authorization: params.authorization,
					iModelId: clonedIModelId
				});
			}
			/**
			* Forks the specified iModel. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/fork-imodel/ Fork iModel} operation from iModels API.
			* Internally this method forks the iModel and then repeatedly queries the new iModel's creation state until it is succeeded.
			* The execution of this method can take up to several minutes due to waiting for initialization to complete.
			* @param {ForkIModelParams} params parameters for this operation. See {@link ForkIModelParams}.
			* @returns {Promise<IModel>} newly created iModel. See {@link IModel}.
			* @throws an error that implements `iModelsError` interface with code {@link IModelsErrorCode.IModelForkInitializationFailed} if
			* iModel initialization failed, {@link IModelsErrorCode.IModelForkInitializationTimedOut} if operation did not complete in time or
			* {@link IModelsErrorCode.MainIModelIsMissingFederationGuids} if the iModel from which user is attempting to create a fork does not
			* have {@link https://www.itwinjs.org/bis/guide/fundamentals/federationguids/ FederationGuid} property set on all its elements.
			* See {@link IModelsErrorCode}.
			*/
			async fork(params) {
				const forkIModelBody = this.getForkIModelRequestBody(params.iModelProperties);
				const locationHeaderValue = (await this.sendPostRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getForkIModelUrl({ iModelId: params.iModelId }),
					body: forkIModelBody,
					headers: params.headers
				})).headers.get(Constants$1.headers.location);
				assertStringHeaderValue(Constants$1.headers.location, locationHeaderValue);
				const { iModelId: forkIModelId } = this._options.urlFormatter.parseIModelUrl(locationHeaderValue);
				await this.waitForIModelForkInitialization({
					authorization: params.authorization,
					iModelId: forkIModelId,
					headers: params.headers,
					timeOutInMs: params.timeOutInMs
				});
				return this.getSingle({
					authorization: params.authorization,
					iModelId: forkIModelId
				});
			}
			/**
			* Updates iModel properties. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/update-imodel/ Update iModel} operation from iModels API.
			* @param {UpdateIModelParams} params parameters for this operation. See {@link UpdateIModelParams}.
			* @returns {Promise<IModel>} updated iModel. See {@link IModel}.
			*/
			async update(params) {
				const updateIModelBody = this.getUpdateIModelRequestBody(params.iModelProperties);
				const updateIModelResponse = await this.sendPatchRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getSingleIModelUrl({ iModelId: params.iModelId }),
					body: updateIModelBody,
					headers: params.headers
				});
				return this.appendRelatedEntityCallbacks(params.authorization, updateIModelResponse.body.iModel, params.headers);
			}
			/**
			* Deletes an iModel with specified id. Wraps the {@link https://developer.bentley.com/apis/imodels-v2/operations/delete-imodel/ Delete iModel}
			* operation from iModels API.
			* @param {DeleteIModelParams} params parameters for this operation. See {@link DeleteIModelParams}.
			* @returns {Promise<void>} a promise that resolves after operation completes.
			*/
			async delete(params) {
				await this.sendDeleteRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getSingleIModelUrl({ iModelId: params.iModelId }),
					headers: params.headers
				});
			}
			appendRelatedEntityCallbacks(authorization, iModel, headers) {
				const getCreator = async () => this.getCreator(authorization, iModel._links.creator?.href, headers);
				return {
					...iModel,
					getCreator
				};
			}
			getCreateEmptyIModelRequestBody(iModelProperties) {
				return {
					iTwinId: iModelProperties.iTwinId,
					name: iModelProperties.name,
					description: iModelProperties.description,
					extent: iModelProperties.extent,
					containersEnabled: iModelProperties.containersEnabled,
					creationMode: iModelProperties.creationMode,
					geographicCoordinateSystem: iModelProperties.geographicCoordinateSystem
				};
			}
			async sendIModelPostRequest(authorization, createIModelBody, headers) {
				return (await this.sendPostRequest({
					authorization,
					url: this._options.urlFormatter.getCreateIModelUrl(),
					body: createIModelBody,
					headers
				})).body.iModel;
			}
			async getCreator(authorization, creatorLink, headers) {
				if (!creatorLink) return void 0;
				const { iModelId, userId } = this._options.urlFormatter.parseUserUrl(creatorLink);
				return this._iModelsClient.users.getSingle({
					authorization,
					iModelId,
					userId,
					headers
				});
			}
			getCreateIModelFromTemplateRequestBody(iModelProperties) {
				return {
					...this.getCreateEmptyIModelRequestBody(iModelProperties),
					template: {
						iModelId: iModelProperties.template.iModelId,
						changesetId: iModelProperties.template.changesetId
					}
				};
			}
			getCloneIModelRequestBody(iModelProperties) {
				return {
					iTwinId: iModelProperties.iTwinId,
					name: iModelProperties.name,
					description: iModelProperties.description,
					changesetId: iModelProperties.changesetId,
					changesetIndex: iModelProperties.changesetIndex,
					containersEnabled: iModelProperties.containersEnabled
				};
			}
			getForkIModelRequestBody(iModelProperties) {
				return {
					iTwinId: iModelProperties.iTwinId,
					name: iModelProperties.name,
					description: iModelProperties.description,
					changesetId: iModelProperties.changesetId,
					changesetIndex: iModelProperties.changesetIndex,
					preserveHistory: iModelProperties.preserveHistory,
					containersEnabled: iModelProperties.containersEnabled
				};
			}
			getUpdateIModelRequestBody(iModelProperties) {
				return {
					name: iModelProperties.name,
					description: iModelProperties.description,
					extent: iModelProperties.extent
				};
			}
			async isIModelInitialized(params) {
				const { state } = await this._iModelsClient.operations.getCreateIModelDetails({
					authorization: params.authorization,
					iModelId: params.iModelId,
					headers: params.headers
				});
				if (state !== IModelCreationState.Scheduled && state !== IModelCreationState.WaitingForFile && state !== IModelCreationState.Successful) throw new IModelsErrorImpl({
					code: params.errorCodeOnFailure,
					message: `iModel initialization failed with state '${state}'`,
					originalError: void 0,
					statusCode: void 0,
					details: void 0
				});
				return state === IModelCreationState.Successful;
			}
			async isIModelForkInitialized(params) {
				const { state } = await this._iModelsClient.operations.getCreateIModelDetails({
					authorization: params.authorization,
					iModelId: params.iModelId,
					headers: params.headers
				});
				if (state === IModelCreationState.MainIModelIsMissingFederationGuids) throw new IModelsErrorImpl({
					code: IModelsErrorCode.MainIModelIsMissingFederationGuids,
					message: "iModel fork initialization failed because some elements in the main iModel do not have FederationGuid property set.",
					originalError: void 0,
					statusCode: void 0,
					details: void 0
				});
				if (state !== IModelCreationState.Scheduled && state !== IModelCreationState.WaitingForFile && state !== IModelCreationState.Successful) throw new IModelsErrorImpl({
					code: IModelsErrorCode.IModelForkInitializationFailed,
					message: `iModel fork initialization failed with state '${state}'`,
					originalError: void 0,
					statusCode: void 0,
					details: void 0
				});
				return state === IModelCreationState.Successful;
			}
			async waitForEmptyIModelInitialization(params) {
				return UtilityFunctions.waitForCondition({
					conditionToSatisfy: async () => this.isIModelInitialized({
						authorization: params.authorization,
						iModelId: params.iModelId,
						errorCodeOnFailure: IModelsErrorCode.EmptyIModelInitializationFailed,
						headers: params.headers
					}),
					timeoutErrorFactory: () => new IModelsErrorImpl({
						code: IModelsErrorCode.EmptyIModelInitializationFailed,
						message: "Timed out waiting for empty iModel initialization.",
						originalError: void 0,
						statusCode: void 0,
						details: void 0
					}),
					timeOutInMs: params.timeOutInMs
				});
			}
			async waitForTemplatedIModelInitialization(params) {
				return UtilityFunctions.waitForCondition({
					conditionToSatisfy: async () => this.isIModelInitialized({
						authorization: params.authorization,
						iModelId: params.iModelId,
						errorCodeOnFailure: IModelsErrorCode.IModelFromTemplateInitializationFailed,
						headers: params.headers
					}),
					timeoutErrorFactory: () => new IModelsErrorImpl({
						code: IModelsErrorCode.IModelFromTemplateInitializationTimedOut,
						message: "Timed out waiting for Baseline File initialization.",
						originalError: void 0,
						statusCode: void 0,
						details: void 0
					}),
					timeOutInMs: params.timeOutInMs
				});
			}
			async waitForClonedIModelInitialization(params) {
				return UtilityFunctions.waitForCondition({
					conditionToSatisfy: async () => this.isIModelInitialized({
						authorization: params.authorization,
						iModelId: params.iModelId,
						errorCodeOnFailure: IModelsErrorCode.ClonedIModelInitializationFailed,
						headers: params.headers
					}),
					timeoutErrorFactory: () => new IModelsErrorImpl({
						code: IModelsErrorCode.ClonedIModelInitializationTimedOut,
						message: "Timed out waiting for Cloned iModel initialization.",
						originalError: void 0,
						statusCode: void 0,
						details: void 0
					}),
					timeOutInMs: params.timeOutInMs
				});
			}
			async waitForIModelForkInitialization(params) {
				return UtilityFunctions.waitForCondition({
					conditionToSatisfy: async () => this.isIModelForkInitialized({
						authorization: params.authorization,
						iModelId: params.iModelId,
						headers: params.headers
					}),
					timeoutErrorFactory: () => new IModelsErrorImpl({
						code: IModelsErrorCode.IModelForkInitializationTimedOut,
						message: "Timed out waiting for iModel fork initialization.",
						originalError: void 0,
						statusCode: void 0,
						details: void 0
					}),
					timeOutInMs: params.timeOutInMs
				});
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/briefcase/BriefcaseOperations.js
var BriefcaseOperations;
function init_BriefcaseOperations() {
	return (init_BriefcaseOperations = __esmMin((() => {
		init_internal();
		init_types();
		BriefcaseOperations = class extends OperationsBase {
			_iModelsClient;
			constructor(options, _iModelsClient) {
				super(options);
				this._iModelsClient = _iModelsClient;
			}
			/**
			* Gets Briefcases of a specific iModel. This method returns Briefcases in their minimal representation. The returned iterator
			* internally queries entities in pages. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-briefcases/ Get iModel Briefcases}
			* operation from iModels API.
			* @param {GetBriefcaseListParams} params parameters for this operation. See {@link GetBriefcaseListParams}.
			* @returns {EntityListIterator<MinimalBriefcase>} iterator for Briefcase list. See {@link EntityListIterator},
			* {@link MinimalBriefcase}.
			*/
			getMinimalList(params) {
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getBriefcaseListUrl({
						iModelId: params.iModelId,
						urlParams: params.urlParams
					}),
					preferReturn: PreferReturn.Minimal,
					entityCollectionAccessor: (response) => response.body.briefcases,
					headers: params.headers
				}));
			}
			/**
			* Gets Briefcases of a specific iModel. This method returns Briefcases in their full representation. The returned iterator
			* internally queries entities in pages. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-briefcases/ Get iModel Briefcases}
			* operation from iModels API.
			* @param {GetBriefcaseListParams} params parameters for this operation. See {@link GetBriefcaseListParams}.
			* @returns {EntityListIterator<Briefcase>} iterator for Briefcase list. See {@link EntityListIterator}, {@link Briefcase}.
			*/
			getRepresentationList(params) {
				const entityCollectionAccessor = (response) => {
					return response.body.briefcases.map((briefcase) => this.appendRelatedEntityCallbacks(params.authorization, briefcase, params.headers));
				};
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getBriefcaseListUrl({
						iModelId: params.iModelId,
						urlParams: params.urlParams
					}),
					preferReturn: PreferReturn.Representation,
					entityCollectionAccessor,
					headers: params.headers
				}));
			}
			/**
			* Gets a single Briefcase by its id. This method returns a Briefcase in its full representation. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-briefcase-details/ Get iModel Briefcase}
			* operation from iModels API.
			* @param {GetSingleBriefcaseParams} params parameters for this operation. See {@link GetSingleBriefcaseParams}.
			* @returns {Promise<Briefcase>} an Briefcase with specified id. See {@link iModel}.
			*/
			async getSingle(params) {
				const response = await this.sendGetRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getSingleBriefcaseUrl({
						iModelId: params.iModelId,
						briefcaseId: params.briefcaseId
					}),
					headers: params.headers
				});
				return this.appendRelatedEntityCallbacks(params.authorization, response.body.briefcase, params.headers);
			}
			appendRelatedEntityCallbacks(authorization, briefcase, headers) {
				const getOwner = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, briefcase._links.owner?.href, headers);
				const checkpointLink = briefcase._links.checkpoint;
				assertLink(checkpointLink);
				const getCheckpoint = async () => {
					return (await this.sendGetRequest({
						authorization,
						url: checkpointLink.href,
						headers
					})).body.checkpoint;
				};
				return {
					...briefcase,
					getOwner,
					getCheckpoint
				};
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset/ChangesetOperations.js
var ChangesetOperations;
function init_ChangesetOperations() {
	return (init_ChangesetOperations = __esmMin((() => {
		init_internal();
		init_types();
		ChangesetOperations = class extends OperationsBase {
			_iModelsClient;
			constructor(options, _iModelsClient) {
				super(options);
				this._iModelsClient = _iModelsClient;
			}
			/**
			* Gets Changesets for a specific iModel. This method returns Changesets in their minimal representation. The
			* returned iterator internally queries entities in pages. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changesets/ Get iModel Changesets}
			* operation from iModels API.
			* @param {GetChangesetListParams} params parameters for this operation. See {@link GetChangesetListParams}.
			* @returns {EntityListIterator<MinimalChangeset>} iterator for Changeset list. See {@link EntityListIterator},
			* {@link MinimalChangeset}.
			*/
			getMinimalList(params) {
				const entityCollectionAccessor = (response) => {
					return response.body.changesets.map((changeset) => this.appendRelatedMinimalEntityCallbacks(params.authorization, changeset, params.headers));
				};
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getChangesetListUrl({
						iModelId: params.iModelId,
						urlParams: params.urlParams
					}),
					preferReturn: PreferReturn.Minimal,
					entityCollectionAccessor,
					headers: params.headers
				}));
			}
			/**
			* Gets Changesets for a specific iModel. This method returns Changesets in their full representation. The returned
			* iterator internally queries entities in pages. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changesets/ Get iModel Changesets}
			* operation from iModels API.
			* @param {GetChangesetListParams} params parameters for this operation. See {@link GetChangesetListParams}.
			* @returns {EntityListIterator<Changeset>} iterator for Changeset list. See {@link EntityListIterator},
			* {@link Changeset}.
			*/
			getRepresentationList(params) {
				const entityCollectionAccessor = (response) => {
					return response.body.changesets.map((changeset) => this.appendRelatedEntityCallbacks(params.authorization, changeset, params.headers));
				};
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getChangesetListUrl({
						iModelId: params.iModelId,
						urlParams: params.urlParams
					}),
					preferReturn: PreferReturn.Representation,
					entityCollectionAccessor,
					headers: params.headers
				}));
			}
			/**
			* Gets a single Changeset identified by either index or id. This method returns a Changeset in its full representation.
			* Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changeset-details/ Get iModel Changeset}
			* operation from iModels API.
			* @param {GetSingleChangesetParams} params parameters for this operation. See {@link GetSingleChangesetParams}.
			* @returns {Promise<Changeset>} a Changeset with specified id or index. See {@link Changeset}.
			*/
			async getSingle(params) {
				return await this.querySingleInternal(params);
			}
			async querySingleInternal(params) {
				const { authorization, iModelId, headers, ...changesetIdOrIndex } = params;
				const response = await this.sendGetRequest({
					authorization,
					url: this._options.urlFormatter.getSingleChangesetUrl({
						iModelId,
						...changesetIdOrIndex
					}),
					headers
				});
				return this.appendRelatedEntityCallbacks(params.authorization, response.body.changeset, params.headers);
			}
			appendRelatedMinimalEntityCallbacks(authorization, changeset, headers) {
				const getCreator = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, changeset._links.creator?.href, headers);
				return {
					...changeset,
					getCreator
				};
			}
			appendRelatedEntityCallbacks(authorization, changeset, headers) {
				const getNamedVersion = async () => this.getNamedVersion(authorization, changeset._links.namedVersion?.href, headers);
				const getCurrentOrPrecedingCheckpoint = async () => this.getCurrentOrPrecedingCheckpoint(authorization, changeset._links.currentOrPrecedingCheckpoint?.href, headers);
				return {
					...this.appendRelatedMinimalEntityCallbacks(authorization, changeset, headers),
					getNamedVersion,
					getCurrentOrPrecedingCheckpoint
				};
			}
			async getNamedVersion(authorization, namedVersionLink, headers) {
				if (!namedVersionLink) return void 0;
				const { iModelId, namedVersionId } = this._options.urlFormatter.parseNamedVersionUrl(namedVersionLink);
				return this._iModelsClient.namedVersions.getSingle({
					authorization,
					iModelId,
					namedVersionId,
					headers
				});
			}
			async getCurrentOrPrecedingCheckpoint(authorization, currentOrPrecedingCheckpointLink, headers) {
				if (!currentOrPrecedingCheckpointLink) return void 0;
				const entityIds = this._options.urlFormatter.parseCheckpointUrl(currentOrPrecedingCheckpointLink);
				return this._iModelsClient.checkpoints.getSingle({
					authorization,
					...entityIds,
					headers
				});
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset-extended-data/ChangesetExtendedDataOperations.js
var ChangesetExtendedDataOperations;
function init_ChangesetExtendedDataOperations() {
	return (init_ChangesetExtendedDataOperations = __esmMin((() => {
		init_internal();
		ChangesetExtendedDataOperations = class extends OperationsBase {
			constructor(options) {
				super(options);
			}
			/**
			* Gets Changesets Extended Data for a specific iModel. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changesets-extended-data/ Get iModel Changesets Extended Data}
			* operation from iModels API.
			* @param {GetChangesetExtendedDataListParams} params parameters for this operation. See {@link GetChangesetExtendedDataListParams}.
			* @returns {EntityListIterator<ChangesetExtendedData>} iterator for Changeset Extended Data list. See {@link EntityListIterator}.
			*/
			getList(params) {
				const entityCollectionAccessor = (response) => {
					return response.body.extendedData.map((extendedData) => this.convertToChangesetExtendedData(extendedData));
				};
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getChangesetExtendedDataListUrl({
						iModelId: params.iModelId,
						urlParams: params.urlParams
					}),
					entityCollectionAccessor,
					headers: params.headers
				}));
			}
			/**
			* Gets a single Changeset Extended Data identified by either Changeset index or id. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changeset-extended-data-details/ Get iModel Changeset Extended Data}
			* operation from iModels API.
			* @param {GetSingleChangesetExtendedDataParams} params parameters for this operation. See {@link GetSingleChangesetExtendedDataParams}.
			* @returns {Promise<ChangesetExtendedData>} a Changeset Extended Data with the specified changeset id or index. See {@link ChangesetExtendedData}.
			*/
			async getSingle(params) {
				const { authorization, iModelId, headers, ...changesetIdOrIndex } = params;
				const response = await this.sendGetRequest({
					authorization,
					url: this._options.urlFormatter.getSingleChangesetExtendedDataUrl({
						iModelId,
						...changesetIdOrIndex
					}),
					headers
				});
				return this.convertToChangesetExtendedData(response.body.extendedData);
			}
			convertToChangesetExtendedData(changesetExtendedDataApiResponse) {
				return {
					changesetId: changesetExtendedDataApiResponse.changesetId,
					changesetIndex: changesetExtendedDataApiResponse.changesetIndex,
					data: this.convertBase64StringToObject(changesetExtendedDataApiResponse.data)
				};
			}
			convertBase64StringToObject(input) {
				if (typeof window !== "undefined") {
					const binString = atob(input);
					const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
					return JSON.parse(new TextDecoder().decode(bytes));
				} else {
					const decodedString = Buffer.from(input, "base64").toString("utf8");
					return JSON.parse(decodedString);
				}
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset-group/ChangesetGroupOperations.js
var ChangesetGroupOperations;
function init_ChangesetGroupOperations() {
	return (init_ChangesetGroupOperations = __esmMin((() => {
		init_internal();
		ChangesetGroupOperations = class extends OperationsBase {
			_iModelsClient;
			constructor(options, _iModelsClient) {
				super(options);
				this._iModelsClient = _iModelsClient;
			}
			/**
			* Gets Changeset Groups for a specific iModel. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changeset-groups/ Get iModel Changeset Groups}
			* operation from iModels API.
			* @param {GetChangesetGroupListParams} params parameters for this operation. See {@link GetChangesetGroupListParams}.
			* @returns {EntityListIterator<ChangesetGroup>} iterator for Changeset Group list, which internally queries entities in pages.
			* See {@link EntityListIterator}, {@link ChangesetGroup}.
			*/
			getList(params) {
				const entityCollectionAccessor = (response) => {
					return response.body.changesetGroups.map((changesetGroup) => this.appendRelatedEntityCallbacks(params.authorization, changesetGroup, params.headers));
				};
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getChangesetGroupListUrl({
						iModelId: params.iModelId,
						urlParams: params.urlParams
					}),
					entityCollectionAccessor,
					headers: params.headers
				}));
			}
			/**
			* Gets a single Changeset Group identified by id. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changeset-group-details/ Get iModel Changeset Group}
			* operation from iModels API.
			* @param {GetSingleChangesetGroupParams} params parameters for this operation. See {@link GetSingleChangesetGroupParams}.
			* @returns {Promise<ChangesetGroup>} a Changeset Group with the specified id. See {@link ChangesetGroup}.
			*/
			async getSingle(params) {
				const response = await this.sendGetRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getSingleChangesetGroupUrl({
						iModelId: params.iModelId,
						changesetGroupId: params.changesetGroupId
					}),
					headers: params.headers
				});
				return this.appendRelatedEntityCallbacks(params.authorization, response.body.changesetGroup, params.headers);
			}
			appendRelatedEntityCallbacks(authorization, changesetGroup, headers) {
				const getCreator = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, changesetGroup._links.creator?.href, headers);
				return {
					...changesetGroup,
					getCreator
				};
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/named-version/NamedVersionOperations.js
var NamedVersionOperations;
function init_NamedVersionOperations() {
	return (init_NamedVersionOperations = __esmMin((() => {
		init_internal();
		init_types();
		NamedVersionOperations = class extends OperationsBase {
			_iModelsClient;
			constructor(options, _iModelsClient) {
				super(options);
				this._iModelsClient = _iModelsClient;
			}
			/**
			* Gets Named Versions of a specific iModel. This method returns Named Versions in their minimal representation. The
			* returned iterator internally queries entities in pages. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-named-versions/ Get iModel Named Versions}
			* operation from iModels API.
			* @param {GetNamedVersionListParams} params parameters for this operation. See {@link GetNamedVersionListParams}.
			* @returns {EntityListIterator<MinimalNamedVersion>} iterator for Named Version list. See {@link EntityListIterator},
			* {@link MinimalNamedVersion}.
			*/
			getMinimalList(params) {
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getNamedVersionListUrl({
						iModelId: params.iModelId,
						urlParams: params.urlParams
					}),
					preferReturn: PreferReturn.Minimal,
					entityCollectionAccessor: (response) => response.body.namedVersions,
					headers: params.headers
				}));
			}
			/**
			* Gets Named Versions of a specific iModel. This method returns Named Versions in their full representation. The
			* returned iterator internally queries entities in pages. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-named-versions/
			* Get iModel Named Versions} operation from iModels API.
			* @param {GetNamedVersionListParams} params parameters for this operation. See {@link GetNamedVersionListParams}.
			* @returns {EntityListIterator<NamedVersion>} iterator for Named Version list. See {@link EntityListIterator},
			* {@link NamedVersion}.
			*/
			getRepresentationList(params) {
				const entityCollectionAccessor = (response) => {
					return response.body.namedVersions.map((namedVersion) => this.appendRelatedEntityCallbacks(params.authorization, namedVersion, params.headers));
				};
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getNamedVersionListUrl({
						iModelId: params.iModelId,
						urlParams: params.urlParams
					}),
					preferReturn: PreferReturn.Representation,
					entityCollectionAccessor,
					headers: params.headers
				}));
			}
			/**
			* Gets a single Named Version by its id. This method returns a Named Version in its full representation. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-named-version-details/
			* Get iModel Named Version} operation from iModels API.
			* @param {GetSingleNamedVersionParams} params parameters for this operation. See {@link GetSingleNamedVersionParams}.
			* @returns {Promise<NamedVersion>} a Named Version with specified id. See {@link NamedVersion}.
			*/
			async getSingle(params) {
				const response = await this.sendGetRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getSingleNamedVersionUrl({
						iModelId: params.iModelId,
						namedVersionId: params.namedVersionId
					}),
					headers: params.headers
				});
				return this.appendRelatedEntityCallbacks(params.authorization, response.body.namedVersion, params.headers);
			}
			/**
			* Creates a Named Version with specified properties. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/create-imodel-named-version/
			* Create iModel Named Version} operation from iModels API.
			* @param {CreateNamedVersionParams} params parameters for this operation. See {@link CreateNamedVersionParams}.
			* @returns {Promise<NamedVersion>} newly created Named Version. See {@link NamedVersion}.
			*/
			async create(params) {
				const createNamedVersionBody = this.getCreateNamedVersionRequestBody(params.namedVersionProperties);
				const createNamedVersionResponse = await this.sendPostRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getNamedVersionListUrl({ iModelId: params.iModelId }),
					body: createNamedVersionBody,
					headers: params.headers
				});
				return this.appendRelatedEntityCallbacks(params.authorization, createNamedVersionResponse.body.namedVersion, params.headers);
			}
			/**
			* Updates Named Version with specified properties. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/update-imodel-named-version/
			* Update iModel Named Version} operation from iModels API.
			* @param {UpdateNamedVersionParams} params parameters for this operation. See {@link UpdateNamedVersionParams}.
			* @returns {Promise<NamedVersion>} updated Named Version. See {@link NamedVersion}.
			*/
			async update(params) {
				const updateNamedVersionBody = this.getUpdateNamedVersionRequestBody(params.namedVersionProperties);
				const updateNamedVersionResponse = await this.sendPatchRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getSingleNamedVersionUrl({
						iModelId: params.iModelId,
						namedVersionId: params.namedVersionId
					}),
					body: updateNamedVersionBody,
					headers: params.headers
				});
				return this.appendRelatedEntityCallbacks(params.authorization, updateNamedVersionResponse.body.namedVersion, params.headers);
			}
			getCreateNamedVersionRequestBody(namedVersionProperties) {
				return {
					name: namedVersionProperties.name,
					description: namedVersionProperties.description,
					changesetId: namedVersionProperties.changesetId
				};
			}
			getUpdateNamedVersionRequestBody(namedVersionProperties) {
				return {
					name: namedVersionProperties.name,
					description: namedVersionProperties.description,
					state: namedVersionProperties.state
				};
			}
			appendRelatedEntityCallbacks(authorization, namedVersion, headers) {
				const getCreator = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, namedVersion._links.creator?.href, headers);
				const getChangeset = async () => this.getChangeset(authorization, namedVersion._links.changeset?.href, headers);
				return {
					...namedVersion,
					getCreator,
					getChangeset
				};
			}
			async getChangeset(authorization, changesetLink, headers) {
				if (!changesetLink) return void 0;
				const entityIds = this._options.urlFormatter.parseChangesetUrl(changesetLink);
				return this._iModelsClient.changesets.getSingle({
					authorization,
					...entityIds,
					headers
				});
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/checkpoint/CheckpointOperations.js
var CheckpointOperations;
function init_CheckpointOperations() {
	return (init_CheckpointOperations = __esmMin((() => {
		init_internal();
		CheckpointOperations = class extends OperationsBase {
			/**
			* Gets a single Checkpoint generated either on a specific Changeset or for a specific Named Version. This method
			* returns a Checkpoint in its full representation. Wraps
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-changeset-checkpoint/ Get Changeset Checkpoint},
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-named-version-checkpoint/ Get Named Version Checkpoint} and
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-briefcase-checkpoint/ Get Briefcase Checkpoint}
			* operations from iModels API.
			* @param {GetSingleCheckpointParams} params parameters for this operation. See {@link GetSingleCheckpointParams}.
			* @returns {Promise<Checkpoint>} a Checkpoint for the specified parent entity. See {@link Checkpoint}.
			*/
			async getSingle(params) {
				const { authorization, iModelId, headers, ...parentEntityId } = params;
				return (await this.sendGetRequest({
					authorization,
					url: this._options.urlFormatter.getCheckpointUrl({
						iModelId,
						...parentEntityId
					}),
					headers
				})).body.checkpoint;
			}
			/**
			* Reschedules failed Named Version Checkpoint. This method
			* returns a Checkpoint in its full representation. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/update-named-version-checkpoint/
			* Update Named Version Checkpoint} operation from iModels API.
			* @param {GetSingleNamedVersionParams} params parameters for this operation. See {@link GetSingleNamedVersionParams}.
			* @returns {Promise<Checkpoint>} a Checkpoint for the specified parent entity. See {@link Checkpoint}.
			*/
			async updateNamedVersionCheckpoint(params) {
				return (await this.sendPutRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getCheckpointUrl({
						iModelId: params.iModelId,
						namedVersionId: params.namedVersionId
					}),
					headers: params.headers,
					body: /* @__PURE__ */ new Uint8Array()
				})).body.checkpoint;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/thumbnail/ThumbnailOperations.js
var ThumbnailOperations;
function init_ThumbnailOperations() {
	return (init_ThumbnailOperations = __esmMin((() => {
		init_internal();
		init_types();
		ThumbnailOperations = class extends OperationsBase {
			/**
			* Downloads a thumbnail for a specific iModel. The Thumbnail returned is either a default one or a custom
			* uploaded one. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-thumbnail/ Download iModel Thumbnail}
			* operation from iModels API.
			* @param {DownloadThumbnailParams} params parameters for this operation. See {@link DownloadThumbnailParams}.
			* @returns {Promise<Thumbnail>} downloaded Thumbnail. See {@link Thumbnail}. The method returns the data in binary
			* form which can then be consumed depending on the environment.
			* @example
			* Save data to local file (Node.js):
			* ```
			*  const thumbnail: Thumbnail = await iModelsClient.thumbnails.download({ ... });
			*  await fs.promises.writeFile("thumbnail.png", Buffer.from(thumbnail.data.buffer), "binary");
			* ```
			*/
			async download(params) {
				const urlParams = {
					...params.urlParams,
					size: params.urlParams?.size ?? ThumbnailSize.Small
				};
				const url = this._options.urlFormatter.getThumbnailUrl({
					iModelId: params.iModelId,
					urlParams
				});
				const response = await this.sendGetRequest({
					authorization: params.authorization,
					url,
					responseType: ContentType.Png,
					headers: params.headers
				});
				return {
					size: urlParams.size,
					imageType: ContentType.Png,
					image: response.body
				};
			}
			/**
			* Uploads a custom iModel Thumbnail. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/upload-imodel-thumbnail/ Upload iModel Thumbnail}
			* operation from iModels API.
			* @param {UploadThumbnailParams} params parameters for this operation. See {@link UploadThumbnailParams}.
			* @returns {Promise<void>} a promise that resolves after operation completes.
			*/
			async upload(params) {
				const url = this._options.urlFormatter.getThumbnailUrl({ iModelId: params.iModelId });
				await this.sendPutRequest({
					authorization: params.authorization,
					url,
					contentType: params.thumbnailProperties.imageType,
					body: params.thumbnailProperties.image,
					headers: params.headers
				});
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user/UserOperations.js
var UserOperations;
function init_UserOperations() {
	return (init_UserOperations = __esmMin((() => {
		init_internal();
		init_types();
		UserOperations = class extends OperationsBase {
			/** Gets Users who have ever been connected to the iModel specified by the iModel id. This method returns Users in
			* their minimal representation. The returned iterator internally queries entities in pages. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-users/ Get iModel Users}
			* operation from iModels API.
			* @param {GetUserListParams} params parameters for this operation. See {@link GetUserListParams}.
			* @returns {EntityListIterator<MinimalUser>} iterator for User list. See {@link EntityListIterator}, {@link MinimalUser}.
			*/
			getMinimalList(params) {
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getUserListUrl({
						iModelId: params.iModelId,
						urlParams: params.urlParams
					}),
					preferReturn: PreferReturn.Minimal,
					entityCollectionAccessor: (response) => response.body.users,
					headers: params.headers
				}));
			}
			/**
			* Gets Users who have ever been connected to the iModel specified by the iModel id. This method returns Users in their
			* full representation. The returned iterator internally queries entities in pages. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-users/ Get iModel Users}
			* operation from iModels API.
			* @param {GetUserListParams} params parameters for this operation. See {@link GetUserListParams}.
			* @returns {EntityListIterator<User>} iterator for User list. See {@link EntityListIterator}, {@link User}.
			*/
			getRepresentationList(params) {
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getUserListUrl({
						iModelId: params.iModelId,
						urlParams: params.urlParams
					}),
					preferReturn: PreferReturn.Representation,
					entityCollectionAccessor: (response) => response.body.users,
					headers: params.headers
				}));
			}
			/**
			* Gets a single User by its id. This method returns a User in its full representation. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-user-details/ Get iModel User}
			* operation from iModels API.
			* @param {GetSingleUserParams} params parameters for this operation. See {@link GetSingleUserParams}.
			* @returns {Promise<User>} a User with specified id. See {@link User}.
			*/
			async getSingle(params) {
				return (await this.sendGetRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getSingleUserUrl({
						iModelId: params.iModelId,
						userId: params.userId
					}),
					headers: params.headers
				})).body.user;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user-permission/UserPermissionOperations.js
var UserPermissionOperations;
function init_UserPermissionOperations() {
	return (init_UserPermissionOperations = __esmMin((() => {
		init_internal();
		UserPermissionOperations = class extends OperationsBase {
			/**
			* Retrieves Permissions the current user has for the specified iModel. The current user is determined based on
			* passed authorization information. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-user-permissions/ Get iModel User Permissions}
			* operation from iModels API. iModels Permissions may be configured on a iTwin level or an iModel level.
			* This operation will return Permissions configured for this specific iModel or iTwin Permissions if iModel
			* Permissions are not configured.
			* @param {GetUserPermissionsParams} params parameters for this operation. See {@link GetUserPermissionsParams}.
			* @returns {Promise<UserPermissions>} User Permissions. See {@link UserPermissions}.
			*/
			async get(params) {
				return (await this.sendGetRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getUserPermissionsUrl({ iModelId: params.iModelId }),
					headers: params.headers
				})).body;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/operation/OperationOperations.js
var OperationOperations;
function init_OperationOperations() {
	return (init_OperationOperations = __esmMin((() => {
		init_internal();
		OperationOperations = class extends OperationsBase {
			constructor(options) {
				super(options);
			}
			/**
			* Returns the information about iModel creation process. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-create-imodel-operation-details/ Get Create iModel Operation Details}
			* operation from iModels API.
			* @param {GetCreateIModelOperationDetailsParams} params parameters for this operation. See {@link GetCreateIModelOperationDetailsParams}.
			* @returns {Promise<CreateIModelOperationDetails>} iModel creation details. See {@link CreateIModelOperationDetails}.
			*/
			async getCreateIModelDetails(params) {
				return (await this.sendGetRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getCreateIModelOperationDetailsUrl({ iModelId: params.iModelId }),
					headers: params.headers
				})).body.createOperation;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/favorite-imodel/FavoriteIModelOperations.js
var FavoriteIModelOperations;
function init_FavoriteIModelOperations() {
	return (init_FavoriteIModelOperations = __esmMin((() => {
		init_internal();
		init_types();
		FavoriteIModelOperations = class extends OperationsBase {
			/**
			* Gets favorite iModels for a specific iTwin. This method returns iModels in their minimal representation. The returned iterator
			* internally queries entities in pages. Wraps the {@link https://developer.bentley.com/apis/imodels-v2/operations/get-my-favorite-imodels/ Get My Favorite iTwin iModels}
			* operation from iModels API.
			* @param {GetFavoriteIModelListParams} params parameters for this operation. See {@link GetFavoriteIModelListParams}.
			* @returns {EntityListIterator<MinimalIModel>} iterator for favorite iModel list. See {@link EntityListIterator}, {@link MinimalIModel}.
			*/
			getMinimalList(params) {
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getFavoriteIModelListUrl({ urlParams: params.urlParams }),
					preferReturn: PreferReturn.Minimal,
					entityCollectionAccessor: (response) => response.body.iModels,
					headers: params.headers
				}));
			}
			/**
			* Gets favorite iModels for a specific iTwin. This method returns iModels in their full representation. The returned iterator
			* internally queries entities in pages. Wraps the {@link https://developer.bentley.com/apis/imodels-v2/operations/get-my-favorite-imodels/ Get My Favorite iTwin iModels}
			* operation from iModels API.
			* @param {GetFavoriteIModelListParams} params parameters for this operation. See {@link GetFavoriteIModelListParams}.
			* @returns {EntityListIterator<IModel>} iterator for favorite iModel list. See {@link EntityListIterator}, {@link IModel}.
			*/
			getRepresentationList(params) {
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getFavoriteIModelListUrl({ urlParams: params.urlParams }),
					preferReturn: PreferReturn.Representation,
					entityCollectionAccessor: (response) => response.body.iModels,
					headers: params.headers
				}));
			}
			/**
			* Adds an iModel to the calling user's favorites list. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/add-imodel-to-my-favorites/ Add iModel to My Favorites}
			* operation from iModels API.
			* @param {AddIModelToFavoritesParams} params parameters for this operation. See {@link AddIModelToFavoritesParams}.
			* @returns {Promise<void>}
			*/
			async add(params) {
				await this.sendPutRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getFavoriteIModelUrl({ iModelId: params.iModelId }),
					headers: params.headers,
					body: /* @__PURE__ */ new Uint8Array()
				});
			}
			/**
			* Removes an iModel from the calling user's favorites list. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/remove-imodel-from-my-favorites/ Remove iModel from My Favorites}
			* operation from iModels API.
			* @param {RemoveIModelFromFavoritesParams} params parameters for this operation. See {@link RemoveIModelFromFavoritesParams}.
			* @returns {Promise<void>}
			*/
			async remove(params) {
				await this.sendDeleteRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getFavoriteIModelUrl({ iModelId: params.iModelId }),
					headers: params.headers
				});
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/recent-imodel/RecentIModelOperations.js
var RecentIModelOperations;
function init_RecentIModelOperations() {
	return (init_RecentIModelOperations = __esmMin((() => {
		init_internal();
		init_types();
		RecentIModelOperations = class extends OperationsBase {
			/**
			* Gets recently used iModels for a specific iTwin. A user can only have 25 recently used iModels.
			* They are returned in order with the most recently used iModel first in the list. This method returns iModels in their minimal representation.
			* The returned iterator internally queries entities in pages. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-my-recently-used-imodels/ Get My Recently Used iTwin iModels}
			* operation from iModels API.
			* @param {GetRecentIModelListParams} params parameters for this operation. See {@link GetRecentIModelListParams}.
			* @returns {EntityListIterator<MinimalIModel>} iterator for recent iModel list. See {@link EntityListIterator}, {@link MinimalIModel}.
			*/
			getMinimalList(params) {
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getRecentIModelListUrl({ urlParams: params.urlParams }),
					preferReturn: PreferReturn.Minimal,
					entityCollectionAccessor: (response) => response.body.iModels,
					headers: params.headers
				}));
			}
			/**
			* Gets recently used iModels for a specific iTwin. A user can only have 25 recently used iModels.
			* They are returned in order with the most recently used iModel first in the list. This method returns iModels in their full representation.
			* The returned iterator internally queries entities in pages. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/get-my-recently-used-imodels/ Get My Recently Used iTwin iModels}
			* operation from iModels API.
			* @param {GetRecentIModelListParams} params parameters for this operation. See {@link GetRecentIModelListParams}.
			* @returns {EntityListIterator<IModel>} iterator for recent iModel list. See {@link EntityListIterator}, {@link IModel}.
			*/
			getRepresentationList(params) {
				return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
					authorization: params.authorization,
					url: this._options.urlFormatter.getRecentIModelListUrl({ urlParams: params.urlParams }),
					preferReturn: PreferReturn.Representation,
					entityCollectionAccessor: (response) => response.body.iModels,
					headers: params.headers
				}));
			}
			/**
			* Adds an iModel to the calling user's recently used iModels list. No more than 25 iModels are
			* stored in the recently used list. Older ones are removed to make room for new ones. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/add-imodel-to-my-recents/ Add iModel to My Recents}
			* operation from iModels API.
			* @param {AddIModelToRecentsParams} params parameters for this operation. See {@link AddIModelToRecentsParams}.
			* @returns {Promise<void>}
			*/
			async add(params) {
				await this.sendPostRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getRecentIModelUrl({ iModelId: params.iModelId }),
					headers: params.headers,
					body: void 0
				});
			}
			/**
			* Removes an iModel from the calling user's recents list. Wraps the
			* {@link https://developer.bentley.com/apis/imodels-v2/operations/remove-imodel-from-my-recents/ Remove iModel from My Recents}
			* operation from iModels API.
			* @param {RemoveIModelFromRecentsParams} params parameters for this operation. See {@link RemoveIModelFromRecentsParams}.
			* @returns {Promise<void>}
			*/
			async remove(params) {
				await this.sendDeleteRequest({
					authorization: params.authorization,
					url: this._options.urlFormatter.getRecentIModelUrl({ iModelId: params.iModelId }),
					headers: params.headers
				});
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/OperationExports.js
function init_OperationExports() {
	return (init_OperationExports = __esmMin((() => {
		init_IModelOperations();
		init_BriefcaseOperations();
		init_ChangesetOperations();
		init_ChangesetExtendedDataOperations();
		init_ChangesetGroupOperations();
		init_NamedVersionOperations();
		init_CheckpointOperations();
		init_ThumbnailOperations();
		init_UserOperations();
		init_UserPermissionOperations();
		init_OperationOperations();
		init_FavoriteIModelOperations();
		init_RecentIModelOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/imodel/IModelOperationParams.js
var IModelOrderByProperty;
function init_IModelOperationParams() {
	return (init_IModelOperationParams = __esmMin((() => {
		(function(IModelOrderByProperty) {
			IModelOrderByProperty["Name"] = "name";
			IModelOrderByProperty["CreatedDateTime"] = "createdDateTime";
		})(IModelOrderByProperty || (IModelOrderByProperty = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/briefcase/BriefcaseOperationParams.js
var BriefcaseOrderByProperty;
function init_BriefcaseOperationParams() {
	return (init_BriefcaseOperationParams = __esmMin((() => {
		(function(BriefcaseOrderByProperty) {
			BriefcaseOrderByProperty["AcquiredDateTime"] = "acquiredDateTime";
		})(BriefcaseOrderByProperty || (BriefcaseOrderByProperty = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset/ChangesetOperationParams.js
var ChangesetOrderByProperty;
function init_ChangesetOperationParams() {
	return (init_ChangesetOperationParams = __esmMin((() => {
		(function(ChangesetOrderByProperty) {
			ChangesetOrderByProperty["Index"] = "index";
		})(ChangesetOrderByProperty || (ChangesetOrderByProperty = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/named-version/NamedVersionOperationParams.js
var NamedVersionOrderByProperty;
function init_NamedVersionOperationParams() {
	return (init_NamedVersionOperationParams = __esmMin((() => {
		(function(NamedVersionOrderByProperty) {
			NamedVersionOrderByProperty["ChangesetIndex"] = "changesetIndex";
			NamedVersionOrderByProperty["CreatedDateTime"] = "createdDateTime";
		})(NamedVersionOrderByProperty || (NamedVersionOrderByProperty = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user/UserOperationParams.js
var UserOrderByProperty;
function init_UserOperationParams() {
	return (init_UserOperationParams = __esmMin((() => {
		(function(UserOrderByProperty) {
			UserOrderByProperty["GivenName"] = "givenName";
			UserOrderByProperty["Surname"] = "surname";
		})(UserOrderByProperty || (UserOrderByProperty = {}));
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/OperationParamExports.js
function init_OperationParamExports() {
	return (init_OperationParamExports = __esmMin((() => {
		init_IModelOperationParams();
		init_BriefcaseOperationParams();
		init_ChangesetOperationParams();
		init_NamedVersionOperationParams();
		init_UserOperationParams();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/IModelsApiUrlFormatter.js
var IModelsApiUrlFormatter;
function init_IModelsApiUrlFormatter() {
	return (init_IModelsApiUrlFormatter = __esmMin((() => {
		IModelsApiUrlFormatter = class {
			baseUrl;
			_regexIgnoreCaseOption = "i";
			_groupNames = {
				iModelId: "iModelId",
				changesetIdOrIndex: "changesetIdOrIndex",
				namedVersionId: "namedVersionId",
				userId: "userId"
			};
			_numericRegex = /* @__PURE__ */ new RegExp("^\\d+$");
			_changesetUrlRegex = new RegExp(`/iModels/(?<${this._groupNames.iModelId}>.*)/changesets/(?<${this._groupNames.changesetIdOrIndex}>[^/]*)`, this._regexIgnoreCaseOption);
			_checkpointUrlRegex = new RegExp(`/iModels/(?<${this._groupNames.iModelId}>.*)/changesets/(?<${this._groupNames.changesetIdOrIndex}>.*)/checkpoint`, this._regexIgnoreCaseOption);
			_namedVersionUrlRegex = new RegExp(`/iModels/(?<${this._groupNames.iModelId}>.*)/namedversions/(?<${this._groupNames.namedVersionId}>[^/]*)`, this._regexIgnoreCaseOption);
			_userUrlRegex = new RegExp(`/iModels/(?<${this._groupNames.iModelId}>.*)/users/(?<${this._groupNames.userId}>[^/]*)`, this._regexIgnoreCaseOption);
			_iModelUrlRegex = new RegExp(`/iModels/(?<${this._groupNames.iModelId}>[^/]*)`, this._regexIgnoreCaseOption);
			constructor(baseUrl) {
				this.baseUrl = baseUrl;
			}
			getCreateIModelUrl() {
				return this.baseUrl;
			}
			getCloneIModelUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/clone`;
			}
			getForkIModelUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/fork`;
			}
			getSingleIModelUrl(params) {
				return `${this.baseUrl}/${params.iModelId}`;
			}
			getIModelListUrl(params) {
				return `${this.baseUrl}${this.formQueryString({ ...params.urlParams })}`;
			}
			getSingleBriefcaseUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/briefcases/${params.briefcaseId}`;
			}
			getBriefcaseListUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/briefcases${this.formQueryString({ ...params.urlParams })}`;
			}
			getSingleChangesetUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/changesets/${params.changesetId ?? params.changesetIndex}`;
			}
			getChangesetListUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/changesets${this.formQueryString({ ...params.urlParams })}`;
			}
			getSingleChangesetExtendedDataUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/changesets/${params.changesetId ?? params.changesetIndex}/extendeddata`;
			}
			getChangesetExtendedDataListUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/changesets/extendeddata${this.formQueryString({ ...params.urlParams })}`;
			}
			getSingleChangesetGroupUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/changesetgroups/${params.changesetGroupId}`;
			}
			getChangesetGroupListUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/changesetgroups${this.formQueryString({ ...params.urlParams })}`;
			}
			parseChangesetUrl(url) {
				const matchedGroups = this._changesetUrlRegex.exec(url).groups;
				return {
					iModelId: matchedGroups[this._groupNames.iModelId],
					...this.parseChangesetIdOrIndex(matchedGroups[this._groupNames.changesetIdOrIndex])
				};
			}
			getSingleNamedVersionUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/namedversions/${params.namedVersionId}`;
			}
			getNamedVersionListUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/namedversions${this.formQueryString({ ...params.urlParams })}`;
			}
			getCheckpointUrl(params) {
				let parentEntityUrlPath;
				if (params.namedVersionId) parentEntityUrlPath = `namedversions/${params.namedVersionId}`;
				else if (params.changesetId || params.changesetIndex != null) parentEntityUrlPath = `changesets/${params.changesetId ?? params.changesetIndex}`;
				else parentEntityUrlPath = "briefcases";
				return `${this.baseUrl}/${params.iModelId}/${parentEntityUrlPath}/checkpoint`;
			}
			getThumbnailUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/thumbnail${this.formQueryString({ ...params.urlParams })}`;
			}
			getUserListUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/users${this.formQueryString({ ...params.urlParams })}`;
			}
			getSingleUserUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/users/${params.userId}`;
			}
			getUserPermissionsUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/permissions`;
			}
			getFavoriteIModelListUrl(params) {
				return `${this.baseUrl}/favorites${this.formQueryString({ ...params.urlParams })}`;
			}
			getFavoriteIModelUrl(params) {
				return `${this.baseUrl}/favorites/${params.iModelId}`;
			}
			getRecentIModelListUrl(params) {
				return `${this.baseUrl}/recents${this.formQueryString({ ...params.urlParams })}`;
			}
			getRecentIModelUrl(params) {
				return `${this.baseUrl}/recents/${params.iModelId}`;
			}
			getCreateIModelOperationDetailsUrl(params) {
				return `${this.baseUrl}/${params.iModelId}/operations/create`;
			}
			parseCheckpointUrl(url) {
				const matchedGroups = this._checkpointUrlRegex.exec(url).groups;
				return {
					iModelId: matchedGroups[this._groupNames.iModelId],
					...this.parseChangesetIdOrIndex(matchedGroups[this._groupNames.changesetIdOrIndex])
				};
			}
			parseNamedVersionUrl(url) {
				const matchedGroups = this._namedVersionUrlRegex.exec(url).groups;
				return {
					iModelId: matchedGroups[this._groupNames.iModelId],
					namedVersionId: matchedGroups[this._groupNames.namedVersionId]
				};
			}
			parseUserUrl(url) {
				const matchedGroups = this._userUrlRegex.exec(url).groups;
				return {
					iModelId: matchedGroups[this._groupNames.iModelId],
					userId: matchedGroups[this._groupNames.userId]
				};
			}
			parseIModelUrl(url) {
				return { iModelId: this._iModelUrlRegex.exec(url).groups[this._groupNames.iModelId] };
			}
			formQueryString(urlParameters) {
				let queryString = "";
				for (const urlParameterKey in urlParameters) {
					if (!Object.prototype.hasOwnProperty.call(urlParameters, urlParameterKey)) continue;
					const urlParameterValue = urlParameters[urlParameterKey];
					if (!this.shouldAppendToUrl(urlParameterValue)) continue;
					queryString = this.appendToQueryString(queryString, urlParameterKey, urlParameterValue);
				}
				return queryString;
			}
			/**
			* API could return Changeset urls that either contain id or index since both are valid identifiers
			* so here we handle both scenarios. We assume if the value contains only digits and is shorter than 40
			* symbols it is a numeric index, otherwise, it is a string id.
			*/
			parseChangesetIdOrIndex(changesetIdOrIndex) {
				if (this._numericRegex.test(changesetIdOrIndex) && changesetIdOrIndex.length < 40) return { changesetIndex: parseInt(changesetIdOrIndex, 10) };
				return { changesetId: changesetIdOrIndex };
			}
			shouldAppendToUrl(urlParameterValue) {
				if (urlParameterValue === null || urlParameterValue === void 0) return false;
				if (typeof urlParameterValue === "string" && !urlParameterValue.trim()) return false;
				return true;
			}
			appendToQueryString(existingQueryString, parameterKey, parameterValue) {
				return `${existingQueryString}${existingQueryString.length === 0 ? "?" : "&"}${parameterKey}=${this.stringify(parameterValue)}`;
			}
			stringify(urlParameterValue) {
				if (this.isSingleOrderBy(urlParameterValue)) return this.stringifyOrderByParameterValue([urlParameterValue]);
				else if (this.isMultipleOrderBy(urlParameterValue)) return this.stringifyOrderByParameterValue(urlParameterValue);
				return urlParameterValue.toString();
			}
			isSingleOrderBy(parameterValue) {
				return parameterValue.property !== void 0;
			}
			isMultipleOrderBy(parameterValue) {
				return parameterValue?.[0]?.property !== void 0;
			}
			stringifyOrderByParameterValue(orderByCriteria) {
				let result = "";
				for (let i = 0; i < orderByCriteria.length; i++) {
					if (i !== 0) result += ",";
					const criterion = orderByCriteria[i];
					result += criterion.property;
					if (criterion.operator !== void 0) result += ` ${criterion.operator}`;
				}
				return result;
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/briefcase/index.js
function init_briefcase() {
	return (init_briefcase = __esmMin((() => {
		init_BriefcaseOperationParams();
		init_BriefcaseOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset/index.js
function init_changeset() {
	return (init_changeset = __esmMin((() => {
		init_ChangesetOperationParams();
		init_ChangesetOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset-extended-data/index.js
function init_changeset_extended_data() {
	return (init_changeset_extended_data = __esmMin((() => {
		init_ChangesetExtendedDataOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset-group/index.js
function init_changeset_group() {
	return (init_changeset_group = __esmMin((() => {
		init_ChangesetGroupOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/checkpoint/index.js
function init_checkpoint() {
	return (init_checkpoint = __esmMin((() => {
		init_CheckpointOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/favorite-imodel/index.js
function init_favorite_imodel() {
	return (init_favorite_imodel = __esmMin((() => {
		init_FavoriteIModelOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/imodel/index.js
function init_imodel() {
	return (init_imodel = __esmMin((() => {
		init_IModelOperationParams();
		init_IModelOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/named-version/index.js
function init_named_version() {
	return (init_named_version = __esmMin((() => {
		init_NamedVersionOperationParams();
		init_NamedVersionOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/operation/index.js
function init_operation() {
	return (init_operation = __esmMin((() => {
		init_OperationOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/recent-imodel/index.js
function init_recent_imodel() {
	return (init_recent_imodel = __esmMin((() => {
		init_RecentIModelOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/thumbnail/index.js
function init_thumbnail() {
	return (init_thumbnail = __esmMin((() => {
		init_ThumbnailOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user/index.js
function init_user() {
	return (init_user = __esmMin((() => {
		init_UserOperationParams();
		init_UserOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user-permission/index.js
function init_user_permission() {
	return (init_user_permission = __esmMin((() => {
		init_UserPermissionOperations();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/index.js
function init_operations() {
	return (init_operations = __esmMin((() => {
		init_OperationExports();
		init_OperationParamExports();
		init_briefcase();
		init_changeset();
		init_changeset_extended_data();
		init_changeset_group();
		init_checkpoint();
		init_favorite_imodel();
		init_imodel();
		init_named_version();
		init_operation();
		init_recent_imodel();
		init_thumbnail();
		init_user();
		init_user_permission();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/IModelsClient.js
var IModelsClient;
function init_IModelsClient() {
	return (init_IModelsClient = __esmMin((() => {
		init_axios$2();
		init_internal();
		init_Constants();
		init_operations();
		init_ChangesetExtendedDataOperations();
		init_ChangesetGroupOperations();
		init_CheckpointOperations();
		init_IModelsApiUrlFormatter();
		IModelsClient = class IModelsClient {
			_operationsOptions;
			/**
			* Class constructor.
			* @param {iModelsClientOptions} options client options. If `options` are `undefined` or if some of the properties
			* are `undefined` the client uses defaults. See {@link iModelsClientOptions}.
			*/
			constructor(options) {
				const filledIModelsClientOptions = IModelsClient.fillManagementClientConfiguration(options);
				this._operationsOptions = {
					...filledIModelsClientOptions,
					parseErrorFunc: (response, originalError) => IModelsErrorParser.parse(response, originalError),
					urlFormatter: new IModelsApiUrlFormatter(filledIModelsClientOptions.api.baseUrl)
				};
			}
			/** iModel operations. See {@link iModelOperations}. */
			get iModels() {
				return new IModelOperations(this._operationsOptions, this);
			}
			/** Briefcase operations. See {@link BriefcaseOperations}. */
			get briefcases() {
				return new BriefcaseOperations(this._operationsOptions, this);
			}
			/** Changeset operations. See {@link ChangesetOperations}. */
			get changesets() {
				return new ChangesetOperations(this._operationsOptions, this);
			}
			/** Changeset Extended Data operations. See {@link ChangesetExtendedDataOperations}. */
			get changesetExtendedData() {
				return new ChangesetExtendedDataOperations(this._operationsOptions);
			}
			/** Changeset Group operations. See {@link ChangesetGroupOperations}. */
			get changesetGroups() {
				return new ChangesetGroupOperations(this._operationsOptions, this);
			}
			/** Named version operations. See {@link NamedVersionOperations}. */
			get namedVersions() {
				return new NamedVersionOperations(this._operationsOptions, this);
			}
			/** Checkpoint operations. See {@link CheckpointOperations}. */
			get checkpoints() {
				return new CheckpointOperations(this._operationsOptions);
			}
			/** Thumbnail operations. See {@link ThumbnailOperations}. */
			get thumbnails() {
				return new ThumbnailOperations(this._operationsOptions);
			}
			/** User operations. See {@link UserOperations}. */
			get users() {
				return new UserOperations(this._operationsOptions);
			}
			/** User Permission operations. See {@link UserPermissionOperations}. */
			get userPermissions() {
				return new UserPermissionOperations(this._operationsOptions);
			}
			/** Operation operations. See {@link OperationOperations}. */
			get operations() {
				return new OperationOperations(this._operationsOptions);
			}
			/** Favorite iModel operations. See {@link FavoriteIModelOperations}. */
			get favoriteIModels() {
				return new FavoriteIModelOperations(this._operationsOptions);
			}
			/** Recent iModel operations. See {@link RecentIModelOperations}. */
			get recentIModels() {
				return new RecentIModelOperations(this._operationsOptions);
			}
			static fillManagementClientConfiguration(options) {
				const retryPolicy = options?.retryPolicy ?? new AxiosRetryPolicy({
					maxRetries: Constants$1.retryPolicy.maxRetries,
					backoffAlgorithm: new ExponentialBackoffAlgorithm({
						baseDelayInMs: Constants$1.retryPolicy.baseDelayInMs,
						factor: Constants$1.retryPolicy.delayFactor
					})
				});
				return {
					api: this.fillApiConfiguration(options?.api),
					restClient: options?.restClient ?? new AxiosRestClient(retryPolicy),
					headers: options?.headers ?? {},
					retryPolicy
				};
			}
			static fillApiConfiguration(apiOptions) {
				return {
					baseUrl: apiOptions?.baseUrl ?? Constants$1.api.baseUrl,
					version: apiOptions?.version ?? Constants$1.api.version
				};
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/index.js
function init_esm() {
	return (init_esm = __esmMin((() => {
		init_types();
		init_internal();
		init_axios$2();
		init_operations();
		init_IModelsClient();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/AccessTokenAdapter.js
var AccessTokenAdapter;
function init_AccessTokenAdapter() {
	return (init_AccessTokenAdapter = __esmMin((() => {
		init_core_bentley();
		init_esm();
		AccessTokenAdapter = class AccessTokenAdapter {
			static toAuthorization(accessToken) {
				const splitAccessToken = accessToken.split(" ");
				if (splitAccessToken.length !== 2) ITwinError.throwError({
					iTwinErrorId: {
						key: IModelsErrorCode.InvalidIModelsRequest,
						scope: IModelsErrorScope
					},
					message: "Unsupported access token format"
				});
				return {
					scheme: splitAccessToken[0],
					token: splitAccessToken[1]
				};
			}
			static toAuthorizationCallback(accessToken) {
				if (typeof accessToken === "function") return async () => {
					const token = await accessToken();
					return AccessTokenAdapter.toAuthorization(token);
				};
				else return () => Promise.resolve(AccessTokenAdapter.toAuthorization(accessToken));
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/ErrorAdapter.js
var ErrorAdapter;
function init_ErrorAdapter() {
	return (init_ErrorAdapter = __esmMin((() => {
		init_core_bentley();
		init_esm();
		ErrorAdapter = class ErrorAdapter {
			static toITwinError(error, operationName) {
				if (!isIModelsApiError(error)) return error;
				if (error.code === IModelsErrorCode.Unrecognized) return error;
				if (ErrorAdapter.isAPIAuthError(error.code)) return error;
				if (ErrorAdapter.isIncorrectAPIUsageError(error.code)) return error;
				if (ErrorAdapter.isAPIErrorWithoutCorrespondingStatus(error.code)) return error;
				if (error.code === IModelsErrorCode.InvalidIModelsRequest) return ErrorAdapter.adaptInvalidRequestErrorIfPossible(error);
				let errorCode = ErrorAdapter.tryMapGenericErrorCode(error.code, operationName);
				if (!errorCode) errorCode = ErrorAdapter.mapErrorCode(error.code);
				if ("conflictingLocks" in error) return ITwinError.create({
					iTwinErrorId: {
						key: errorCode,
						scope: IModelsErrorScope
					},
					message: error.message,
					conflictingLocks: error.conflictingLocks
				});
				return ITwinError.create({
					iTwinErrorId: {
						key: errorCode,
						scope: IModelsErrorScope
					},
					message: error.message
				});
			}
			static isAPIAuthError(apiErrorCode) {
				switch (apiErrorCode) {
					case IModelsErrorCode.Unauthorized:
					case IModelsErrorCode.InsufficientPermissions: return true;
					default: return false;
				}
			}
			static isIncorrectAPIUsageError(apiErrorCode) {
				switch (apiErrorCode) {
					case IModelsErrorCode.TooManyRequests:
					case IModelsErrorCode.RequestTooLarge:
					case IModelsErrorCode.InvalidValue:
					case IModelsErrorCode.InvalidHeaderValue:
					case IModelsErrorCode.InvalidRequestBody:
					case IModelsErrorCode.InvalidThumbnailFormat:
					case IModelsErrorCode.MutuallyExclusivePropertiesProvided:
					case IModelsErrorCode.MutuallyExclusiveParametersProvided:
					case IModelsErrorCode.MissingRequestBody:
					case IModelsErrorCode.MissingRequiredProperty:
					case IModelsErrorCode.MissingRequiredParameter:
					case IModelsErrorCode.MissingRequiredHeader:
					case IModelsErrorCode.InvalidChange:
					case IModelsErrorCode.DataConflict: return true;
					default: return false;
				}
			}
			static isAPIErrorWithoutCorrespondingStatus(apiErrorCode) {
				switch (apiErrorCode) {
					case IModelsErrorCode.NamedVersionNotFound:
					case IModelsErrorCode.UserNotFound:
					case IModelsErrorCode.ChangesetGroupNotFound:
					case IModelsErrorCode.BaselineFileNotFound:
					case IModelsErrorCode.BaselineFileInitializationFailed:
					case IModelsErrorCode.IModelFromTemplateInitializationFailed:
					case IModelsErrorCode.EmptyIModelInitializationFailed:
					case IModelsErrorCode.ClonedIModelInitializationFailed:
					case IModelsErrorCode.ChangesetDownloadFailed: return true;
					default: return false;
				}
			}
			static adaptInvalidRequestErrorIfPossible(originalError) {
				if (!originalError.details) return originalError;
				for (const errorDetail of originalError.details) if (errorDetail.innerError?.code === IModelsErrorCode.MaximumNumberOfBriefcasesPerUser) return ITwinError.create({
					iTwinErrorId: {
						key: IModelsErrorCode.MaximumNumberOfBriefcasesPerUser,
						scope: IModelsErrorScope
					},
					message: originalError.message
				});
				return originalError;
			}
			static tryMapGenericErrorCode(apiErrorCode, operationName) {
				if (!operationName) return;
				if (apiErrorCode === IModelsErrorCode.RateLimitExceeded && operationName === "acquireBriefcase") return IModelsErrorCode.MaximumNumberOfBriefcasesPerUserPerMinute;
				if (apiErrorCode === IModelsErrorCode.DownloadAborted && operationName === "downloadChangesets") return IModelsErrorCode.DownloadCancelled;
				if (apiErrorCode === IModelsErrorCode.ConflictWithAnotherUser) {
					if (operationName === "createChangeset") return IModelsErrorCode.AnotherUserPushing;
					else if (operationName === "updateLocks") return IModelsErrorCode.LockOwnedByAnotherBriefcase;
				}
			}
			static mapErrorCode(apiErrorCode) {
				switch (apiErrorCode) {
					case IModelsErrorCode.Unknown:
					case IModelsErrorCode.ITwinNotFound:
					case IModelsErrorCode.IModelNotFound:
					case IModelsErrorCode.ChangesetNotFound:
					case IModelsErrorCode.BriefcaseNotFound:
					case IModelsErrorCode.FileNotFound:
					case IModelsErrorCode.CheckpointNotFound:
					case IModelsErrorCode.LockNotFound:
					case IModelsErrorCode.IModelExists:
					case IModelsErrorCode.VersionExists:
					case IModelsErrorCode.ChangesetExists:
					case IModelsErrorCode.NamedVersionOnChangesetExists:
					case IModelsErrorCode.NewerChangesExist:
					case IModelsErrorCode.BaselineFileInitializationTimedOut:
					case IModelsErrorCode.IModelFromTemplateInitializationTimedOut:
					case IModelsErrorCode.ClonedIModelInitializationTimedOut: return apiErrorCode;
					default: return IModelsErrorCode.Unknown;
				}
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/ErrorHandlingFunctions.js
async function handleAPIErrors(func, operationName) {
	try {
		return await func();
	} catch (error) {
		throw ErrorAdapter.toITwinError(error, operationName);
	}
}
function init_ErrorHandlingFunctions() {
	return (init_ErrorHandlingFunctions = __esmMin((() => {
		init_ErrorAdapter();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/ChangesetFunctions.js
async function getLatestMinimalChangesetIfExists(iModelsClient, iModelScopedOperationParams) {
	return getLatestChangeset((getChangesetListParams) => iModelsClient.changesets.getMinimalList(getChangesetListParams), iModelScopedOperationParams);
}
async function getNamedVersionChangeset(iModelsClient, iModelScopedOperationParams, versionName) {
	const getNamedVersionListParams = {
		...iModelScopedOperationParams,
		urlParams: { name: versionName }
	};
	const namedVersionsIterator = iModelsClient.namedVersions.getMinimalList(getNamedVersionListParams);
	const namedVersions = await handleAPIErrors(async () => toArray$1(namedVersionsIterator));
	if (namedVersions.length === 0 || !namedVersions[0].changesetId) ITwinError.throwError({
		iTwinErrorId: {
			key: IModelsErrorCode.NamedVersionNotFound,
			scope: IModelsErrorScope
		},
		message: `Named version ${versionName} not found`
	});
	return {
		id: namedVersions[0].changesetId,
		index: namedVersions[0].changesetIndex
	};
}
async function getLatestChangeset(changesetQueryFunc, iModelScopedOperationParams) {
	const changesetsIterator = changesetQueryFunc({
		...iModelScopedOperationParams,
		urlParams: {
			$top: 1,
			$orderBy: {
				property: ChangesetOrderByProperty.Index,
				operator: OrderByOperator.Descending
			}
		}
	});
	const changesets = await handleAPIErrors(async () => take(changesetsIterator, 1));
	if (changesets.length === 0) return void 0;
	return changesets[0];
}
function init_ChangesetFunctions() {
	return (init_ChangesetFunctions = __esmMin((() => {
		init_core_bentley();
		init_esm();
		init_ErrorHandlingFunctions();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/Constants.js
var Constants;
function init_Constants$1() {
	return (init_Constants$1 = __esmMin((() => {
		Constants = class {
			static ChangeSet0 = {
				id: "",
				changesType: 0,
				description: "initialChangeset",
				parentId: "",
				briefcaseId: 0,
				pushDate: "",
				userCreated: "",
				index: 0,
				size: 0
			};
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/IModelsClientsErrorInterfaces.js
function init_IModelsClientsErrorInterfaces() {
	return (init_IModelsClientsErrorInterfaces = __esmMin((() => {
		init_core_bentley();
		init_esm();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/index.js
function init_esm$1() {
	return (init_esm$1 = __esmMin((() => {
		init_AccessTokenAdapter();
		init_ChangesetFunctions();
		init_Constants$1();
		init_ErrorAdapter();
		init_ErrorHandlingFunctions();
		init_IModelsClientsErrorInterfaces();
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-frontend@6.1.0_@itwin+core-bentley@5.8.1_@itwin+core-frontend@5.8_6ec6a8c5b6bc5d83687d1fe789c5aae3/node_modules/@itwin/imodels-access-frontend/lib/esm/FrontendIModelsAccess.js
var FrontendIModelsAccess;
function init_FrontendIModelsAccess() {
	return (init_FrontendIModelsAccess = __esmMin((() => {
		init_core_bentley();
		init_core_frontend();
		init_esm$1();
		init_esm();
		FrontendIModelsAccess = class {
			_emptyChangeset = {
				index: Constants.ChangeSet0.index,
				id: Constants.ChangeSet0.id
			};
			_iModelsClient;
			constructor(iModelsClient) {
				this._iModelsClient = iModelsClient instanceof IModelsClient ? iModelsClient : new IModelsClient(iModelsClient);
			}
			get iModelsClient() {
				return this._iModelsClient;
			}
			async getChangesetFromId(arg) {
				const getSingleChangesetParams = {
					...this.getIModelScopedOperationParams(arg),
					changesetId: arg.changeSetId
				};
				const changeset = await handleAPIErrors(async () => this._iModelsClient.changesets.getSingle(getSingleChangesetParams));
				if (!changeset) ITwinError.throwError({
					iTwinErrorId: {
						key: IModelsErrorCode.ChangesetNotFound,
						scope: IModelsErrorScope
					},
					message: `Changeset ${arg.changeSetId} not found`
				});
				return {
					index: changeset.index,
					id: changeset.id
				};
			}
			async getLatestChangeset(arg) {
				const latestChangeset = await getLatestMinimalChangesetIfExists(this._iModelsClient, this.getIModelScopedOperationParams(arg));
				if (!latestChangeset) return this._emptyChangeset;
				return {
					index: latestChangeset.index,
					id: latestChangeset.id
				};
			}
			async getChangesetFromVersion(arg) {
				const version = arg.version;
				if (version.isFirst) return this._emptyChangeset;
				const namedVersionChangesetId = version.getAsOfChangeSet();
				if (namedVersionChangesetId) return this.getChangesetFromId({
					...arg,
					changeSetId: namedVersionChangesetId
				});
				const namedVersionName = version.getName();
				if (namedVersionName) return this.getChangesetFromNamedVersion({
					...arg,
					versionName: namedVersionName
				});
				return this.getLatestChangeset(arg);
			}
			async getChangesetFromNamedVersion(arg) {
				if (!arg.versionName) return this.getChangesetFromLatestNamedVersion(arg);
				return getNamedVersionChangeset(this._iModelsClient, this.getIModelScopedOperationParams(arg), arg.versionName);
			}
			getIModelScopedOperationParams(arg) {
				return {
					authorization: arg.accessToken ? () => Promise.resolve(AccessTokenAdapter.toAuthorization(arg.accessToken)) : AccessTokenAdapter.toAuthorizationCallback(() => IModelApp.getAccessToken()),
					iModelId: arg.iModelId
				};
			}
			async getChangesetFromLatestNamedVersion(arg) {
				const getNamedVersionListParams = {
					...this.getIModelScopedOperationParams(arg),
					urlParams: {
						$top: 1,
						$orderBy: {
							property: NamedVersionOrderByProperty.ChangesetIndex,
							operator: OrderByOperator.Descending
						}
					}
				};
				const namedVersionsIterator = this._iModelsClient.namedVersions.getMinimalList(getNamedVersionListParams);
				const namedVersions = await handleAPIErrors(async () => take(namedVersionsIterator, 1));
				if (namedVersions.length === 0 || !namedVersions[0].changesetIndex || !namedVersions[0].changesetId) ITwinError.throwError({
					iTwinErrorId: {
						key: IModelsErrorCode.NamedVersionNotFound,
						scope: IModelsErrorScope
					},
					message: "No named versions found"
				});
				return {
					index: namedVersions[0].changesetIndex,
					id: namedVersions[0].changesetId
				};
			}
		};
	})))();
}
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-frontend@6.1.0_@itwin+core-bentley@5.8.1_@itwin+core-frontend@5.8_6ec6a8c5b6bc5d83687d1fe789c5aae3/node_modules/@itwin/imodels-access-frontend/lib/esm/index.js
function init_esm$2() {
	return (init_esm$2 = __esmMin((() => {
		init_FrontendIModelsAccess();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/ViewportContent.js
function ViewportContent({ contentId, imodel, viewState, renderViewOverlay }) {
	let [iModel] = import_react$50.useState(UiFramework.getIModelConnection());
	const [defaultViewState] = import_react$50.useState(UiFramework.getDefaultViewState());
	const [viewport, setViewport] = import_react$50.useState(void 0);
	const viewportRef = import_react$50.useRef(void 0);
	import_react$50.useEffect(() => {
		return IModelApp.viewManager.onSelectedViewportChanged.addListener((selectedViewport) => {
			if (!viewportRef.current) return;
			if (selectedViewport.current === viewportRef.current) return;
			if (UiFramework.content.getActiveId() !== contentId) return;
			IModelApp.viewManager.setSelectedView(viewportRef.current);
		});
	}, [contentId, viewport]);
	iModel = imodel ?? iModel;
	viewState = viewState ?? defaultViewState;
	if (!iModel) return null;
	return import_react$50.createElement(import_react$50.Fragment, null, import_react$50.createElement(ViewportComponent, {
		viewState,
		imodel: iModel,
		viewportRef: (v) => {
			viewportRef.current = v;
			setViewport(v);
		}
	}), import_react$50.createElement(ViewOverlayRenderer, {
		viewport,
		renderViewOverlay
	}));
}
function ViewOverlayRenderer({ viewport, renderViewOverlay }) {
	if (!viewport) return null;
	if (renderViewOverlay) return renderViewOverlay(viewport);
	return import_react$50.createElement(DefaultViewOverlay, {
		viewport,
		analysisTimeline: true,
		solarTimeline: true,
		scheduleAnimation: true
	});
}
var import_react$50;
function init_ViewportContent() {
	return (init_ViewportContent = __esmMin((() => {
		import_react$50 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_core_frontend();
		init_imodel_components_react();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/ContentLayoutTools.js
function getIModelSpecificKey(inKey, iModelConnection) {
	return `[${iModelConnection?.iModelId ?? "unknownImodel"}]${inKey}`;
}
async function getSavedViewLayoutProps(activeFrontstageId, iModelConnection) {
	const result = await new LocalStateStorage().getSetting("ContentGroupLayout", getIModelSpecificKey(activeFrontstageId, iModelConnection));
	if (!result.setting) return void 0;
	return result.setting;
}
var import_react$49, SaveContentLayoutToolBase, RestoreSavedContentLayoutToolBase;
function init_ContentLayoutTools() {
	return (init_ContentLayoutTools = __esmMin((() => {
		import_react$49 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_abstract();
		init_appui_react();
		init_core_frontend();
		init_imodel_components_react();
		init_esm$3();
		init_ViewportContent();
		SaveContentLayoutToolBase = class extends Tool {
			static toolId = "SaveContentLayoutTool";
			static get minArgs() {
				return 0;
			}
			static get maxArgs() {
				return 0;
			}
			static get keyin() {
				return "content layout save";
			}
			static get englishKeyin() {
				return this.keyin;
			}
			async run() {
				const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
				if (!frontstageDef) return true;
				const activeLayout = UiFramework.content.layouts.activeLayout;
				if (!activeLayout) return true;
				const activeContentGroup = UiFramework.content.layouts.activeContentGroup;
				if (!activeContentGroup) return true;
				const localSettings = new LocalStateStorage();
				const savedViewLayoutProps = StageContentLayout.viewLayoutToProps(activeLayout, activeContentGroup, true);
				if (savedViewLayoutProps.contentLayoutProps) delete savedViewLayoutProps.contentLayoutProps;
				if (frontstageDef.contentGroupProvider) savedViewLayoutProps.contentGroupProps = frontstageDef.contentGroupProvider.prepareToSaveProps(savedViewLayoutProps.contentGroupProps);
				savedViewLayoutProps.contentGroupProps.contents = savedViewLayoutProps.contentGroupProps.contents.map((content) => {
					const newContent = content;
					delete newContent.content;
					return newContent;
				});
				await localSettings.saveSetting("ContentGroupLayout", getIModelSpecificKey(frontstageDef.id, UiFramework.getIModelConnection()), savedViewLayoutProps);
				return true;
			}
		};
		ToolUtilities.defineIcon(SaveContentLayoutToolBase, import_react$49.createElement(SvgUpload, null));
		RestoreSavedContentLayoutToolBase = class extends Tool {
			static toolId = "RestoreSavedContentLayoutTool";
			static get minArgs() {
				return 0;
			}
			static get maxArgs() {
				return 0;
			}
			static get keyin() {
				return "content layout restore";
			}
			static get englishKeyin() {
				return this.keyin;
			}
			async run() {
				const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
				if (!frontstageDef) return true;
				const iModelConnection = UiFramework.getIModelConnection();
				if (!iModelConnection) return true;
				const savedViewLayoutProps = await getSavedViewLayoutProps(frontstageDef.id, iModelConnection);
				if (!savedViewLayoutProps) return true;
				let contentGroupProps = savedViewLayoutProps.contentGroupProps;
				if (frontstageDef.contentGroupProvider) contentGroupProps = frontstageDef.contentGroupProvider.applyUpdatesToSavedProps(savedViewLayoutProps.contentGroupProps);
				const contentGroup = new ContentGroup({
					...contentGroupProps,
					contents: contentGroupProps.contents.map((content) => {
						return {
							...content,
							content: import_react$49.createElement(ViewportContent, null)
						};
					})
				});
				await UiFramework.content.layouts.setActiveContentGroup(contentGroup);
				StageContentLayout.emphasizeElementsFromProps(contentGroup, savedViewLayoutProps);
				return true;
			}
		};
		ToolUtilities.defineIcon(RestoreSavedContentLayoutToolBase, import_react$49.createElement(SvgDownload, null));
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/InspectUiItemInfoTool.js
var import_react$48, InspectUiItemInfoToolBase, InspectUiItemInfoTool;
function init_InspectUiItemInfoTool() {
	return (init_InspectUiItemInfoTool = __esmMin((() => {
		import_react$48 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_core_frontend();
		init_imodel_components_react();
		init_esm$3();
		InspectUiItemInfoToolBase = class extends PrimitiveTool {
			_timerId;
			_currentX = 0;
			_currentY = 0;
			_lastElement = null;
			static toolId = "InspectUiItemInfoTool";
			static get minArgs() {
				return 0;
			}
			static get maxArgs() {
				return 0;
			}
			requireWriteableTarget() {
				return false;
			}
			static get flyover() {
				return "inspect ui components";
			}
			static get keyin() {
				return "inspect ui components";
			}
			static get englishKeyin() {
				return "inspect ui components";
			}
			processMove() {
				const element = document.elementFromPoint(this._currentX, this._currentY);
				if (element && element !== this._lastElement) {
					console.log(`type = ${element.tagName}`);
					let item = element.querySelector("[data-item-id]");
					if (!item) item = element.closest("[data-item-id]");
					if (item) {
						console.log(`item = ${item.tagName}`);
						const para = document.createElement("div");
						let out = "";
						const names = [
							"type",
							"id",
							"priority",
							"location",
							"group",
							"provider"
						];
						[
							"data-item-type",
							"data-item-id",
							"data-item-priority",
							"data-item-location",
							"data-item-group-priority",
							"data-item-provider-id"
						].forEach((value, index) => {
							const attValue = item?.getAttribute(value);
							if (attValue) out += `${names[index]}: ${attValue}<br>`;
						});
						para.innerHTML = out;
						IModelApp.notifications.openToolTip(item.ownerDocument.body, para, {
							x: this._currentX,
							y: this._currentY
						});
					}
				}
				this._timerId = void 0;
			}
			_mouseMove = (ev) => {
				this._currentX = ev.pageX;
				this._currentY = ev.pageY;
				if (!this._timerId) this._timerId = window.setTimeout(() => this.processMove(), 100);
			};
			async run(..._args) {
				const status = await super.run(_args);
				if (status) window.addEventListener("mousemove", this._mouseMove);
				return status;
			}
			async cleanup() {
				if (this._timerId) {
					window.clearTimeout(this._timerId);
					this._timerId = void 0;
				}
				window.removeEventListener("mousemove", this._mouseMove);
				console.log("inspect listener removed");
			}
			async onCleanup() {
				await super.onCleanup();
				await this.cleanup();
			}
			async exitTool() {
				await this.cleanup();
				return IModelApp.toolAdmin.startDefaultTool();
			}
			async onRestartTool() {
				if (!await new InspectUiItemInfoTool().run()) return this.exitTool();
			}
			async onDataButtonDown(_ev) {
				this.setupAndPromptForNextAction();
				return EventHandled.No;
			}
			async onResetButtonUp(_ev) {
				await this.exitTool();
				return EventHandled.Yes;
			}
			setupAndPromptForNextAction() {
				IModelApp.notifications.outputPrompt("click over UI item");
			}
		};
		InspectUiItemInfoTool = ToolUtilities.defineIcon(InspectUiItemInfoToolBase, import_react$48.createElement(SvgSearch, null));
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/TestUiProviderDialog.js
var ColorOptions;
function init_TestUiProviderDialog() {
	return (init_TestUiProviderDialog = __esmMin((() => {
		init_core_common();
		init_core_frontend();
		init_appui_abstract();
		(function(ColorOptions) {
			ColorOptions[ColorOptions["Red"] = 0] = "Red";
			ColorOptions[ColorOptions["White"] = 1] = "White";
			ColorOptions[ColorOptions["Blue"] = 2] = "Blue";
			ColorOptions[ColorOptions["Yellow"] = 3] = "Yellow";
			ColorOptions[ColorOptions["Orange"] = 4] = "Orange";
		})(ColorOptions || (ColorOptions = {}));
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/AppUiTestProviders.js
var AppUiTestProviders;
function init_AppUiTestProviders() {
	return (init_AppUiTestProviders = __esmMin((() => {
		init_core_frontend();
		AppUiTestProviders = class AppUiTestProviders {
			static localizationNamespace = "AppuiTestProviders";
			static syncUiEventId = {
				hideCustomDialogButton: "appui-test-providers:hide-custom-dialog-button",
				hideCustomViewOverlay: "appui-test-providers:hide-custom-view-overlay-button",
				toggle3dManipulations: "appui-test-providers:toggle-3d-manipulations"
			};
			/** convenience method for getting localized strings from keys */
			static translate(key) {
				return IModelApp.localization.getLocalizedString(`${AppUiTestProviders.localizationNamespace}:${key}`);
			}
		};
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/OpenAbstractModalDialogTool.js
function init_OpenAbstractModalDialogTool() {
	return (init_OpenAbstractModalDialogTool = __esmMin((() => {
		init_core_frontend();
		init_TestUiProviderDialog();
		init_AppUiTestProviders();
		init_appui_react();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/useTranslation.js
/**
* Returns a translation function.
* @internal
*/
function useTranslation() {
	return { translate: import_react$47.useCallback((key) => {
		return AppUiTestProviders.translate(key);
	}, []) };
}
var import_react$47;
function init_useTranslation() {
	return (init_useTranslation = __esmMin((() => {
		import_react$47 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_AppUiTestProviders();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/SampleModalDialog.js
/**
*  This is an example of how to create a React-based modal dialog that can be opened via a toolbutton or a key-in.
*/
function SampleModalDialog() {
	const { translate } = useTranslation();
	const closeDialog = import_react$46.useCallback(() => {
		UiFramework.dialogs.modal.close();
	}, []);
	const handleOK = import_react$46.useCallback(() => {
		closeDialog();
	}, [closeDialog]);
	const handleCancel = import_react$46.useCallback(() => {
		closeDialog();
	}, [closeDialog]);
	return import_react$46.createElement(Dialog, {
		isOpen: true,
		onClose: handleCancel,
		closeOnEsc: true,
		closeOnExternalClick: true,
		preventDocumentScroll: true
	}, import_react$46.createElement(Dialog.Backdrop, null), import_react$46.createElement(Dialog.Main, { style: {
		width: 450,
		height: 300
	} }, import_react$46.createElement(Dialog.TitleBar, { titleText: translate("Dialogs.SampleModal.title") }), import_react$46.createElement(Dialog.Content, null, "Lorem ipsum dolor sit amet, posse imperdiet ius in, mundi cotidieque ei per. Vel scripta ornatus assentior cu. Duo nonumy equidem te, per ad malis deserunt consetetur. In per invidunt conceptam. Ea pri aeque corrumpit. Eum ea ipsum perfecto vulputate, an cum oblique ornatus."), import_react$46.createElement(Dialog.ButtonBar, null, import_react$46.createElement(Button, {
		styleType: "high-visibility",
		onClick: handleOK
	}, "OK"), import_react$46.createElement(Button, { onClick: handleCancel }, "Cancel"))));
}
var import_react$46;
function init_SampleModalDialog() {
	return (init_SampleModalDialog = __esmMin((() => {
		import_react$46 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_useTranslation();
		init_Button(), init_Dialog();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/OpenCustomDialogTool.js
var import_react$45, OpenCustomDialogToolBase;
function init_OpenCustomDialogTool() {
	return (init_OpenCustomDialogTool = __esmMin((() => {
		import_react$45 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_core_frontend();
		init_imodel_components_react();
		init_esm$3();
		init_SampleModalDialog();
		init_AppUiTestProviders();
		OpenCustomDialogToolBase = class extends Tool {
			static toolId = "appuiTestProviders-OpenCustomDialogTool";
			static get minArgs() {
				return 0;
			}
			static get maxArgs() {
				return 0;
			}
			async run() {
				UiFramework.dialogs.modal.open(import_react$45.createElement(SampleModalDialog, null));
				return true;
			}
			static get flyover() {
				return AppUiTestProviders.translate("tools.open-custom-dialog-tool");
			}
			static get keyin() {
				return this.englishKeyin;
			}
			static get englishKeyin() {
				return "open custom dialog";
			}
		};
		ToolUtilities.defineIcon(OpenCustomDialogToolBase, import_react$45.createElement(SvgRefresh, null));
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/components/ViewDefinitionSelector.js
async function getViewDefinitions(imodel) {
	return (await imodel.views.queryProps({ wantPrivate: false })).filter((spec) => !spec.isPrivate).map((spec) => ({
		id: spec.id,
		class: spec.classFullName,
		label: spec.userLabel ?? spec.code.value
	}));
}
function ViewDefinitionSelector(props) {
	const [selectOptions, setSelectOptions] = import_react$44.useState([]);
	import_react$44.useEffect(() => {
		getViewDefinitions(props.imodel).then((result) => {
			const options = result.map((definition) => ({
				value: definition.id,
				label: definition.label
			}));
			setSelectOptions(options);
		});
	}, [props.imodel]);
	return import_react$44.createElement("div", null, import_react$44.createElement(Select, {
		onChange: props.onViewDefinitionSelected,
		value: props.selectedViewDefinition,
		options: selectOptions,
		size: "small"
	}));
}
var import_react$44;
function init_ViewDefinitionSelector() {
	return (init_ViewDefinitionSelector = __esmMin((() => {
		import_react$44 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Select();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/components/ViewsTable.js
function ViewsTable() {
	const activeIModelConnection = useActiveIModelConnection();
	const [iModelViews, setIModelViews] = import_react$43.useState([]);
	import_react$43.useEffect(() => {
		if (activeIModelConnection) getViewDefinitions(activeIModelConnection).then((result) => {
			setIModelViews(result);
		});
	}, [activeIModelConnection]);
	const viewData = import_react$43.useMemo(() => {
		return iModelViews.map((spec) => ({
			id: spec.id,
			class: spec.class,
			label: spec.label
		}));
	}, [iModelViews]);
	const columns = import_react$43.useMemo(() => [
		{
			Header: "View Id",
			accessor: "id"
		},
		{
			Header: "Class Name",
			accessor: "class"
		},
		{
			Header: "Label",
			accessor: "label"
		}
	], []);
	return import_react$43.createElement(Table, {
		columns,
		data: viewData,
		emptyTableContent: "No views to display."
	});
}
var import_react$43;
function init_ViewsTable() {
	return (init_ViewsTable = __esmMin((() => {
		import_react$43 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_Table();
		init_appui_react();
		init_ViewDefinitionSelector();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/PopoutDialog.js
function PopoutDialog() {
	return import_react$42.createElement("div", { className: "test-popout-dialog" }, import_react$42.createElement(ViewsTable, null));
}
var import_react$42;
function init_PopoutDialog$1() {
	return (init_PopoutDialog$1 = __esmMin((() => {
		import_react$42 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_ViewsTable();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/OpenPopoutDialogTool.js
var import_react$41, OpenPopoutDialogToolBase, OpenPopoutDialogTool;
function init_OpenPopoutDialogTool() {
	return (init_OpenPopoutDialogTool = __esmMin((() => {
		import_react$41 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_core_frontend();
		init_appui_abstract();
		init_appui_react();
		init_imodel_components_react();
		init_esm$3();
		init_PopoutDialog$1();
		OpenPopoutDialogToolBase = class extends Tool {
			static toolId = "appuiTestProviders-OpenPopoutDialogTool";
			static get minArgs() {
				return 0;
			}
			static get maxArgs() {
				return 0;
			}
			async run() {
				if (UiFramework.childWindows.find("DialogPopout")) return false;
				UiFramework.childWindows.open("DialogPopout", "Dialog Popout", import_react$41.createElement(PopoutDialog, null), {
					width: 800,
					height: 600,
					left: 100,
					top: 100
				});
				return true;
			}
			static get flyover() {
				return "open popout dialog";
			}
			static get keyin() {
				return this.englishKeyin;
			}
			static get englishKeyin() {
				return "open popout dialog";
			}
			static getActionButtonDef(itemPriority, groupPriority, isHidden) {
				const overrides = {
					groupPriority,
					isHidden
				};
				return ToolbarItemUtilities.createActionButton(OpenPopoutDialogTool.toolId, itemPriority, this.iconSpec, OpenPopoutDialogTool.flyover, async () => {
					await IModelApp.tools.run(OpenPopoutDialogTool.toolId);
				}, overrides);
			}
		};
		OpenPopoutDialogTool = ToolUtilities.defineIcon(OpenPopoutDialogToolBase, import_react$41.createElement(SvgWindowAdd, null));
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/PopupTestView.js
function PopupTestView({ contentId, showViewPicker }) {
	const menuItems = import_react$40.useMemo(() => {
		return [
			{
				id: "Item1",
				label: "Item ~1",
				icon: "icon-placeholder",
				submenu: [{
					id: "0",
					item: {
						label: "SubMenu Item ~1",
						icon: "icon-placeholder",
						execute: () => {}
					}
				}, {
					id: "1",
					item: {
						label: "SubMenu Item ~2",
						icon: "icon-placeholder",
						execute: () => {}
					}
				}]
			},
			{
				id: "Item2",
				item: {
					label: "Item ~2",
					icon: "icon-placeholder",
					execute: () => {}
				}
			},
			{
				id: "Item3",
				item: {
					label: "Item ~3",
					icon: "icon-placeholder",
					execute: () => {}
				}
			}
		];
	}, []);
	const activeIModelConnection = useActiveIModelConnection();
	const divRef = import_react$40.useRef(null);
	const [initialViewState, setInitialViewState] = import_react$40.useState(UiFramework.getDefaultViewState());
	const viewportRef = import_react$40.useRef(null);
	import_react$40.useEffect(() => {
		async function fetchView() {
			if (void 0 === initialViewState && activeIModelConnection) {
				const definitions = await getViewDefinitions(activeIModelConnection);
				if (definitions && definitions.length) {
					const viewState = await activeIModelConnection.views.load(definitions[0].id);
					setInitialViewState(viewState);
				}
			}
		}
		fetchView();
	}, [activeIModelConnection, initialViewState]);
	const onViewDefinitionChanged = import_react$40.useCallback(async (viewId) => {
		if (activeIModelConnection && viewId) {
			const viewState = await activeIModelConnection.views.load(viewId);
			setInitialViewState(viewState);
		}
	}, [activeIModelConnection]);
	const handleContextMenu = import_react$40.useCallback((e) => {
		e.preventDefault();
		UiFramework.openContextMenu(menuItems, {
			x: e.pageX,
			y: e.pageY
		});
		return false;
	}, [menuItems]);
	return import_react$40.createElement("div", {
		ref: divRef,
		style: {
			display: "grid",
			gridTemplateRows: "auto 1fr",
			height: "100%",
			position: "relative",
			minWidth: "400px",
			minHeight: "300px"
		}
	}, !!showViewPicker && initialViewState && import_react$40.createElement("div", null, import_react$40.createElement(ViewDefinitionSelector, {
		imodel: initialViewState.iModel,
		selectedViewDefinition: initialViewState.id,
		onViewDefinitionSelected: onViewDefinitionChanged
	})), initialViewState && import_react$40.createElement("div", null, import_react$40.createElement(FloatingViewportContent, {
		contentId,
		initialViewState,
		onContextMenu: handleContextMenu,
		viewportRef
	})), import_react$40.createElement(Button, { onClick: () => {
		viewportRef?.current?.openToolTip("Test tooltip", {
			x: 100,
			y: 50
		});
	} }, "Open tooltip"));
}
var import_react$40;
function init_PopupTestView$1() {
	return (init_PopupTestView$1 = __esmMin((() => {
		import_react$40 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_ViewDefinitionSelector();
		init_Button();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/OpenPopoutViewTool.js
var import_react$39, OpenPopoutViewToolBase, OpenPopoutViewTool;
function init_OpenPopoutViewTool() {
	return (init_OpenPopoutViewTool = __esmMin((() => {
		import_react$39 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_abstract();
		init_appui_react();
		init_core_frontend();
		init_imodel_components_react();
		init_esm$3();
		init_PopupTestView$1();
		OpenPopoutViewToolBase = class extends Tool {
			static _counter = 0;
			static toolId = "OpenViewPopout";
			static get dialogId() {
				return `appui-test-app:popup-view-dialog-${OpenPopoutViewTool._counter}`;
			}
			static get minArgs() {
				return 0;
			}
			static get maxArgs() {
				return 0;
			}
			async run() {
				await this._run();
				return true;
			}
			async _run() {
				UiFramework.childWindows.open("ViewPopout", "View Popout", import_react$39.createElement(PopupTestView, {
					contentId: "appui-test-app:popout-test",
					showViewPicker: true
				}), {
					width: 800,
					height: 600,
					left: 0,
					top: 0
				});
			}
			static get flyover() {
				return "open view popout";
			}
			static get keyin() {
				return "open view popout";
			}
			static get englishKeyin() {
				return "open view popout";
			}
			static getActionButtonDef(itemPriority, groupPriority) {
				const overrides = { groupPriority };
				return ToolbarItemUtilities.createActionButton(OpenPopoutViewTool.toolId, itemPriority, OpenPopoutViewTool.iconSpec, OpenPopoutViewTool.flyover, async () => {
					await IModelApp.tools.run(OpenPopoutViewTool.toolId);
				}, overrides);
			}
		};
		OpenPopoutViewTool = ToolUtilities.defineIcon(OpenPopoutViewToolBase, import_react$39.createElement(SvgWindowPopout, null));
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/SynchronizedFloatingViewComponent.js
function SynchronizedFloatingView({ contentId, viewport }) {
	const activeIModelConnection = useActiveIModelConnection();
	const divRef = import_react$38.useRef(null);
	const [floatingViewport, setFloatingViewport] = import_react$38.useState();
	const [initialViewState, setInitialViewState] = import_react$38.useState(void 0);
	const [twoDViewDefinitions, setTwoDViewDefinitions] = import_react$38.useState([]);
	const [threeDViewDefinitions, setThreeDViewDefinitions] = import_react$38.useState([]);
	const [noViewsMessage, setNoViewsMessage] = import_react$38.useState("No 2D views available.");
	import_react$38.useEffect(() => {
		if (!activeIModelConnection) return;
		const acceptedSpatialViewClasses = ["BisCore:SpatialViewDefinition", "BisCore:OrthographicViewDefinition"];
		const acceptedDrawingViewClasses = ["BisCore:DrawingViewDefinition", "BisCore:SheetViewDefinition"];
		getViewDefinitions(activeIModelConnection).then((viewDefinitions) => {
			const localThreeTwoDViewDefs = viewDefinitions.filter((def) => {
				return acceptedSpatialViewClasses.indexOf(def.class) > -1;
			});
			const localTwoTwoDViewDefs = viewDefinitions.filter((def) => {
				return acceptedDrawingViewClasses.indexOf(def.class) > -1;
			});
			setTwoDViewDefinitions(localTwoTwoDViewDefs);
			setThreeDViewDefinitions(localThreeTwoDViewDefs);
			const isMainViewport3d = viewport.view.is3d();
			setNoViewsMessage(isMainViewport3d ? "No 2d views available." : "No 3d views available.");
			let initialViewIdToLoad;
			if (isMainViewport3d && localTwoTwoDViewDefs && localTwoTwoDViewDefs.length > 0) initialViewIdToLoad = localTwoTwoDViewDefs[0].id;
			else if (!isMainViewport3d && localThreeTwoDViewDefs && localThreeTwoDViewDefs.length > 0) initialViewIdToLoad = localThreeTwoDViewDefs[0].id;
			if (initialViewIdToLoad) activeIModelConnection.views.load(initialViewIdToLoad).then((viewState) => {
				setInitialViewState(viewState);
			});
		});
	}, [activeIModelConnection, viewport]);
	import_react$38.useEffect(() => {
		return ViewportComponentEvents.onViewIdChangedEvent.addListener(async (args) => {
			if (args.newId === args.oldId) return;
			if (!UiFramework.frontstages.activeFrontstageDef) return;
			if (floatingViewport === args.viewport) {
				if (!(args.viewport.view.is2d() && viewport.view.is3d() || args.viewport.view.is3d() && viewport.view.is2d())) {
					if (args.viewport.view.is2d() && threeDViewDefinitions.length > 0) await activeIModelConnection?.views.load(threeDViewDefinitions[0].id).then((newViewStateForMainVP) => {
						viewport.changeView(newViewStateForMainVP);
					});
					else if (args.viewport.view.is3d() && twoDViewDefinitions.length > 0) await activeIModelConnection?.views.load(twoDViewDefinitions[0].id).then((newViewStateForMainVP) => {
						viewport.changeView(newViewStateForMainVP);
					});
				}
			} else if (!(args.viewport.view.is2d() && floatingViewport?.view.is3d() || args.viewport.view.is3d() && floatingViewport?.view.is2d())) {
				if (args.viewport.view.is2d() && threeDViewDefinitions.length > 0) await activeIModelConnection?.views.load(threeDViewDefinitions[0].id).then((newViewStateForFloatingVP) => {
					setInitialViewState(newViewStateForFloatingVP);
				});
				else if (args.viewport.view.is3d() && twoDViewDefinitions.length > 0) await activeIModelConnection?.views.load(twoDViewDefinitions[0].id).then((newViewStateForFloatingVP) => {
					setInitialViewState(newViewStateForFloatingVP);
				});
			}
		}, [
			activeIModelConnection?.views,
			contentId,
			threeDViewDefinitions,
			twoDViewDefinitions
		]);
	}, [
		activeIModelConnection,
		contentId,
		floatingViewport,
		viewport,
		threeDViewDefinitions,
		twoDViewDefinitions
	]);
	if (initialViewState) return import_react$38.createElement("div", {
		className: "test-syncrhonized-test-view",
		ref: divRef
	}, import_react$38.createElement("div", { id: "floatingviewportcontainerdiv" }, initialViewState && import_react$38.createElement(FloatingViewportContent, {
		contentId,
		initialViewState,
		viewportRef: (v) => {
			setFloatingViewport(v ?? void 0);
		}
	})));
	else return import_react$38.createElement("div", {
		className: "test-popup-test-view",
		ref: divRef
	}, import_react$38.createElement("div", { className: "no-views-message" }, noViewsMessage));
}
var import_react$38;
function init_SynchronizedFloatingViewComponent$1() {
	return (init_SynchronizedFloatingViewComponent$1 = __esmMin((() => {
		import_react$38 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_imodel_components_react();
		init_ViewDefinitionSelector();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/OpenSynchronizedViewTool.js
function IModelViewDialog({ x, y, id, title }) {
	const [viewport] = import_react$37.useState(() => IModelApp.viewManager.selectedView);
	const initialOffset = x || y ? {
		left: x ?? 0,
		top: y ?? 0,
		transform: "none"
	} : {};
	if (!viewport) return null;
	return import_react$37.createElement(Dialog, {
		isOpen: true,
		onClose: () => {
			UiFramework.dialogs.modeless.close(id);
		},
		closeOnEsc: true,
		isDraggable: true,
		isResizable: true,
		preventDocumentScroll: true
	}, import_react$37.createElement(Dialog.Main, { style: {
		width: "40vw",
		height: "40vh",
		...initialOffset
	} }, import_react$37.createElement(Dialog.TitleBar, { titleText: title }), import_react$37.createElement(Dialog.Content, { style: { padding: 0 } }, import_react$37.createElement(SynchronizedFloatingView, {
		contentId: id,
		viewport
	}))));
}
var import_react$37, OpenSynchronizedViewToolBase, OpenSynchronizedViewTool;
function init_OpenSynchronizedViewTool() {
	return (init_OpenSynchronizedViewTool = __esmMin((() => {
		import_react$37 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_core_frontend();
		init_imodel_components_react();
		init_Dialog();
		init_esm$3();
		init_SynchronizedFloatingViewComponent$1();
		OpenSynchronizedViewToolBase = class extends Tool {
			static _counter = 0;
			static toolId = "OpenViewDialog";
			static get dialogId() {
				return `ui-test-app:popup-view-dialog-${OpenSynchronizedViewTool._counter}`;
			}
			static get minArgs() {
				return 0;
			}
			static get maxArgs() {
				return 0;
			}
			async run() {
				await this._run();
				return true;
			}
			async _run() {
				OpenSynchronizedViewTool._counter = OpenSynchronizedViewTool._counter + 1;
				let x;
				let y;
				const stage = UiFramework.frontstages.activeFrontstageDef;
				if (stage && stage.nineZoneState) {
					const floatingContentCount = stage.floatingContentControls?.length ?? 0;
					if (floatingContentCount < 1 && stage.nineZoneState.size.width > 800 && stage.nineZoneState.size.height > 600) {
						x = .3 * stage.nineZoneState.size.width + 40 * (floatingContentCount - 1);
						y = .3 * stage.nineZoneState.size.height + 40 * (floatingContentCount - 1);
					}
				}
				UiFramework.dialogs.modeless.open(import_react$37.createElement(IModelViewDialog, {
					x,
					y,
					id: OpenSynchronizedViewTool.dialogId,
					title: `IModel View (${OpenSynchronizedViewTool._counter})`
				}), OpenSynchronizedViewTool.dialogId);
			}
			static get flyover() {
				return "open synchronized view dialog";
			}
			static get keyin() {
				return "open synchronized view dialog";
			}
			static get englishKeyin() {
				return "open view dialog";
			}
		};
		OpenSynchronizedViewTool = ToolUtilities.defineIcon(OpenSynchronizedViewToolBase, import_react$37.createElement(SvgPanorama, null));
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/RegisterUiProviderTool.js
function init_RegisterUiProviderTool() {
	return (init_RegisterUiProviderTool = __esmMin((() => {
		init_appui_react();
		init_core_frontend();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/SampleTool.js
var import_react$36, ToolOptions, SampleToolBase, SampleTool;
function init_SampleTool() {
	return (init_SampleTool = __esmMin((() => {
		import_react$36 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_core_frontend();
		init_appui_abstract();
		init_core_bentley();
		init_core_common();
		init_appui_react();
		init_AppUiTestProviders();
		init_esm$3();
		init_imodel_components_react();
		(function(ToolOptions) {
			ToolOptions[ToolOptions["Red"] = 0] = "Red";
			ToolOptions[ToolOptions["White"] = 1] = "White";
			ToolOptions[ToolOptions["Blue"] = 2] = "Blue";
			ToolOptions[ToolOptions["Yellow"] = 3] = "Yellow";
			ToolOptions[ToolOptions["Green"] = 4] = "Green";
			ToolOptions[ToolOptions["Pink"] = 5] = "Pink";
		})(ToolOptions || (ToolOptions = {}));
		SampleToolBase = class extends PrimitiveTool {
			static toolId = "uiItemsProvidersTest-SampleTool";
			points = [];
			_showCoordinatesOnPointerMove = false;
			_stationFormatterSpec;
			toggleCoordinateUpdate() {
				this._showCoordinatesOnPointerMove = !this._showCoordinatesOnPointerMove;
			}
			static getPrompt(name) {
				const key = `tools.${this.toolId}.Prompts.${name}`;
				return AppUiTestProviders.translate(key);
			}
			static getOptionString(name) {
				const key = `tools.${this.toolId}.Options.${name}`;
				return AppUiTestProviders.translate(key);
			}
			_getChoices = () => {
				return [
					{
						label: SampleTool.getOptionString("Red"),
						value: ToolOptions.Red
					},
					{
						label: SampleTool.getOptionString("White"),
						value: ToolOptions.White
					},
					{
						label: SampleTool.getOptionString("Blue"),
						value: ToolOptions.Blue
					},
					{
						label: SampleTool.getOptionString("Yellow"),
						value: ToolOptions.Yellow
					},
					{
						label: SampleTool.getOptionString("Green"),
						value: ToolOptions.Green
					},
					{
						label: SampleTool.getOptionString("Pink"),
						value: ToolOptions.Pink
					}
				];
			};
			static _optionsName = "enumAsPicklist";
			_getEnumAsPicklistDescription = () => {
				return {
					name: SampleTool._optionsName,
					displayLabel: SampleTool.getPrompt("Options"),
					typename: "enum",
					enum: { choices: this._getChoices() }
				};
			};
			_optionsValue = { value: ToolOptions.Blue };
			get option() {
				return this._optionsValue.value;
			}
			set option(option) {
				this._optionsValue.value = option;
			}
			static _colorName = "color";
			static _getColorDescription = () => {
				return {
					name: SampleTool._colorName,
					displayLabel: SampleTool.getPrompt("Color"),
					typename: "number",
					editor: {
						name: "color-picker",
						params: [{
							type: PropertyEditorParamTypes.ColorData,
							colorValues: [
								ColorByName.blue,
								ColorByName.red,
								ColorByName.green,
								ColorByName.yellow,
								ColorByName.black,
								ColorByName.gray,
								ColorByName.purple,
								ColorByName.pink
							],
							numColumns: 2
						}]
					}
				};
			};
			_colorValue = { value: ColorByName.blue };
			get colorValue() {
				return this._colorValue.value;
			}
			set colorValue(colorVal) {
				this._colorValue.value = colorVal;
			}
			get colorDef() {
				return ColorDef.create(this._colorValue.value);
			}
			set colorDef(colorVal) {
				this._colorValue.value = colorVal.tbgr;
			}
			static _weightName = "weight";
			static _getWeightDescription = () => {
				return {
					name: SampleTool._weightName,
					displayLabel: SampleTool.getPrompt("Weight"),
					typename: "number",
					editor: { name: StandardEditorNames.WeightPicker }
				};
			};
			_weightValue = { value: 3 };
			get weight() {
				return this._weightValue.value;
			}
			set weight(weightVal) {
				this._weightValue.value = weightVal;
			}
			static _lockToggleName = "lockToggle";
			static _getLockToggleDescription = () => {
				return {
					name: SampleTool._lockToggleName,
					displayLabel: SampleTool.getPrompt("Lock"),
					typename: "boolean",
					editor: { name: "toggle" }
				};
			};
			_lockValue = { value: true };
			get lock() {
				return this._lockValue.value;
			}
			set lock(option) {
				this._lockValue.value = option;
			}
			static _cityName = "city";
			static _getCityDescription = () => {
				return {
					name: SampleTool._cityName,
					displayLabel: SampleTool.getPrompt("City"),
					typename: "string"
				};
			};
			_cityValue = { value: "Exton" };
			get city() {
				return this._cityValue.value;
			}
			set city(option) {
				this._cityValue.value = option;
			}
			static _stateName = "state";
			static _getStateDescription = () => {
				return {
					name: SampleTool._stateName,
					displayLabel: SampleTool.getPrompt("State"),
					typename: "string",
					editor: { params: [{
						type: PropertyEditorParamTypes.InputEditorSize,
						size: 1,
						maxSize: 6
					}] }
				};
			};
			_stateValue = { value: "PA" };
			get state() {
				return this._stateValue.value;
			}
			set state(option) {
				this._stateValue.value = option;
			}
			static _coordinateName = "coordinate";
			static _getCoordinateDescription = () => {
				return {
					name: SampleTool._coordinateName,
					displayLabel: SampleTool.getPrompt("Coordinate"),
					typename: "string"
				};
			};
			_coordinateValue = { value: "0.0, 0.0, 0.0" };
			get coordinate() {
				return this._coordinateValue.value;
			}
			set coordinate(option) {
				this._coordinateValue.value = option;
			}
			get stationFormatterSpec() {
				if (this._stationFormatterSpec) return this._stationFormatterSpec;
				const formatterSpec = IModelApp.quantityFormatter.findFormatterSpecByQuantityType(QuantityType.Stationing);
				if (formatterSpec) {
					this._stationFormatterSpec = formatterSpec;
					return formatterSpec;
				}
				Logger.logError("UITestApp.SampleTool", "Station formatterSpec was expected to be set before tool started.");
			}
			static _stationName = "station";
			static _getStationDescription = () => {
				return {
					name: SampleTool._stationName,
					displayLabel: SampleTool.getPrompt("Station"),
					typename: "string"
				};
			};
			formatStation(numberValue) {
				if (this.stationFormatterSpec) return IModelApp.quantityFormatter.formatQuantity(numberValue, this.stationFormatterSpec);
				return numberValue.toFixed(2);
			}
			_stationValue = { value: this.formatStation(0) };
			get station() {
				return this._stationValue.value;
			}
			set station(option) {
				this._stationValue.value = option;
			}
			static _useLengthName = "useLength";
			static _getUseLengthDescription = () => {
				return {
					name: SampleTool._useLengthName,
					displayLabel: "",
					typename: "boolean",
					editor: { params: [{
						type: PropertyEditorParamTypes.SuppressEditorLabel,
						suppressLabelPlaceholder: true
					}] }
				};
			};
			_useLengthValue = { value: true };
			get useLength() {
				return this._useLengthValue.value;
			}
			set useLength(option) {
				this._useLengthValue.value = option;
			}
			static _lengthName = "length";
			_lengthValue = { value: 1.5 };
			get length() {
				return this._lengthValue.value;
			}
			set length(option) {
				this._lengthValue.value = option;
			}
			_lengthDescription = new LengthDescription();
			static _surveyLengthName = "surveyLength";
			_surveyLengthValue = { value: 51.25 };
			get surveyLength() {
				return this._surveyLengthValue.value;
			}
			set surveyLength(option) {
				this._surveyLengthValue.value = option;
			}
			_surveyLengthDescription = new SurveyLengthDescription(SampleTool._surveyLengthName, "Survey");
			_angleValue = { value: 0 };
			get angle() {
				return this._angleValue.value;
			}
			set angle(option) {
				this._angleValue.value = option;
			}
			requireWriteableTarget() {
				return false;
			}
			async onPostInstall() {
				await super.onPostInstall();
				this.setupAndPromptForNextAction();
			}
			async onUnsuspend() {
				this.provideToolAssistance();
			}
			/** Establish current tool state and initialize drawing aides following onPostInstall, onDataButtonDown, onUndoPreviousStep, or other events that advance or back up the current tool state.
			* Enable snapping or auto-locate for AccuSnap.
			* Setup AccuDraw using AccuDrawHintBuilder.
			* Set view cursor when default cursor isn't applicable.
			* Provide tool assistance.
			*/
			setupAndPromptForNextAction() {
				this.provideToolAssistance();
			}
			/** A tool is responsible for providing tool assistance appropriate to the current tool state following significant events.
			* After onPostInstall to establish instructions for the initial tool state.
			* After onUnsuspend to reestablish instructions when no longer suspended by a ViewTool or InputCollector.
			* After onDataButtonDown (or other tool event) advances or backs up the current tool state.
			* After onUndoPreviousStep or onRedoPreviousStep modifies the current tool state.
			*/
			provideToolAssistance() {
				const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, SampleTool.getPrompt("GetPoint"));
				const instructions = ToolAssistance.createInstructions(mainInstruction);
				IModelApp.notifications.setToolAssistance(instructions);
			}
			showInfoFromCursorMenu(label) {
				const msg = `Context Menu selection - ${label}`;
				IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, msg));
			}
			async onKeyTransition(down, ev) {
				if (down && ev.key === "q") {
					this._stateValue.value = ev.key.concat(this._stateValue.value ?? "");
					this.syncToolSettingsProperties([{
						propertyName: SampleTool._stateName,
						value: this._stateValue
					}]);
				}
				return EventHandled.Yes;
			}
			async onDataButtonDown(ev) {
				if (ev.isAltKey) {
					const menuItems = [];
					menuItems.push({
						id: "entry1",
						label: "Label1",
						iconNode: import_react$36.createElement(SvgPlaceholder, null),
						execute: () => {
							this.showInfoFromCursorMenu("hello from entry1");
						}
					});
					menuItems.push({
						id: "entry2",
						item: {
							label: "Label2",
							icon: "icon-placeholder",
							execute: () => {
								this.showInfoFromCursorMenu("hello from entry2");
							}
						}
					});
					menuItems.push({
						id: "entry3",
						item: {
							label: "Label3",
							execute: () => {
								this.showInfoFromCursorMenu("hello from entry3");
							}
						},
						iconRight: "icon-placeholder"
					});
					menuItems.push({
						id: "entry4",
						item: {
							label: "Label4",
							execute: () => {
								this.showInfoFromCursorMenu("hello from entry4");
							}
						},
						iconRightNode: import_react$36.createElement(SvgPlaceholder, null)
					});
					UiFramework.openCursorMenu({
						items: menuItems,
						position: {
							x: CursorInformation.cursorX,
							y: CursorInformation.cursorY
						}
					});
					return EventHandled.No;
				}
				if (this.points.length < 2) this.points.push(ev.point.clone());
				else this.points[1] = ev.point.clone();
				this.toggleCoordinateUpdate();
				this.setupAndPromptForNextAction();
				return EventHandled.No;
			}
			async onResetButtonUp(_ev) {
				await this.onReinitialize();
				return EventHandled.No;
			}
			syncCoordinateValue(coordinate, station, distance) {
				const syncItem = {
					value: { value: coordinate },
					propertyName: SampleTool._coordinateName,
					isDisabled: true
				};
				const stationSyncItem = {
					value: { value: station },
					propertyName: SampleTool._stationName,
					isDisabled: true
				};
				const surveySyncItem = {
					value: {
						value: distance,
						displayValue: this._surveyLengthDescription.format(distance)
					},
					propertyName: SampleTool._surveyLengthName,
					isDisabled: true
				};
				this.syncToolSettingsProperties([
					syncItem,
					stationSyncItem,
					surveySyncItem
				]);
			}
			async onMouseMotion(ev) {
				if (!this._showCoordinatesOnPointerMove) return;
				const point = ev.point.clone();
				const formattedString = `${point.x.toFixed(2)}, ${point.y.toFixed(2)}, ${point.z.toFixed(2)}`;
				let distance = 0;
				if (this.points.length > 0) distance = point.distance(this.points[0]);
				this.syncCoordinateValue(formattedString, this.formatStation(distance), distance);
			}
			async onRestartTool() {
				if (!await new SampleTool().run()) return this.exitTool();
			}
			/** Used to supply DefaultToolSettingProvider with a list of properties to use to generate ToolSettings.  If undefined then no ToolSettings will be displayed */
			supplyToolSettingsProperties() {
				const readonly = true;
				const toolSettings = new Array();
				toolSettings.push({
					value: this._optionsValue,
					property: this._getEnumAsPicklistDescription(),
					editorPosition: {
						rowPriority: 0,
						columnIndex: 2
					}
				});
				toolSettings.push({
					value: this._colorValue,
					property: SampleTool._getColorDescription(),
					editorPosition: {
						rowPriority: 2,
						columnIndex: 2
					}
				});
				toolSettings.push({
					value: this._weightValue,
					property: SampleTool._getWeightDescription(),
					editorPosition: {
						rowPriority: 3,
						columnIndex: 2
					}
				});
				toolSettings.push({
					value: this._lockValue,
					property: SampleTool._getLockToggleDescription(),
					editorPosition: {
						rowPriority: 5,
						columnIndex: 2
					}
				});
				toolSettings.push({
					value: this._cityValue,
					property: SampleTool._getCityDescription(),
					editorPosition: {
						rowPriority: 10,
						columnIndex: 2
					}
				});
				toolSettings.push({
					value: { ...this._stateValue },
					property: SampleTool._getStateDescription(),
					editorPosition: {
						rowPriority: 10,
						columnIndex: 4
					}
				});
				toolSettings.push({
					value: this._coordinateValue,
					property: SampleTool._getCoordinateDescription(),
					editorPosition: {
						rowPriority: 15,
						columnIndex: 2
					},
					isDisabled: readonly
				});
				toolSettings.push({
					value: this._stationValue,
					property: SampleTool._getStationDescription(),
					editorPosition: {
						rowPriority: 16,
						columnIndex: 2
					},
					isDisabled: readonly
				});
				const lengthLock = {
					value: this._useLengthValue,
					property: SampleTool._getUseLengthDescription(),
					editorPosition: {
						rowPriority: 20,
						columnIndex: 0
					}
				};
				toolSettings.push({
					value: this._lengthValue,
					property: this._lengthDescription,
					editorPosition: {
						rowPriority: 20,
						columnIndex: 2
					},
					isDisabled: false,
					lockProperty: lengthLock
				});
				toolSettings.push({
					value: this._surveyLengthValue,
					property: this._surveyLengthDescription,
					editorPosition: {
						rowPriority: 21,
						columnIndex: 2
					},
					isDisabled: readonly
				});
				toolSettings.push({
					value: this._angleValue,
					property: new AngleDescription(),
					editorPosition: {
						rowPriority: 25,
						columnIndex: 2
					}
				});
				return toolSettings;
			}
			showColorInfoFromUi(updatedValue) {
				const msg = `Property '${updatedValue.propertyName}' updated to value ${this.colorDef.toRgbString()}`;
				IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, msg));
			}
			showInfoFromUi(updatedValue) {
				const msg = `Property '${updatedValue.propertyName}' updated to value ${String(updatedValue.value.value)}`;
				IModelApp.notifications.outputMessage(new NotifyMessageDetails(OutputMessagePriority.Info, msg));
			}
			syncLengthState() {
				const syncItem = {
					value: {
						value: this.length,
						displayValue: this._lengthDescription.format(this.length)
					},
					propertyName: SampleTool._lengthName,
					isDisabled: !this.useLength
				};
				this.syncToolSettingsProperties([syncItem]);
			}
			/** Used to send changes from UI back to Tool */
			async applyToolSettingPropertyChange(updatedValue) {
				if (updatedValue.propertyName === SampleTool._optionsName) {
					if (this._optionsValue.value !== updatedValue.value.value) {
						this.option = updatedValue.value.value;
						this.showInfoFromUi(updatedValue);
					}
				} else if (updatedValue.propertyName === SampleTool._lockToggleName) {
					this.lock = updatedValue.value.value;
					this.showInfoFromUi(updatedValue);
				} else if (updatedValue.propertyName === SampleTool._cityName) {
					this.city = updatedValue.value.value;
					this.showInfoFromUi(updatedValue);
				} else if (updatedValue.propertyName === SampleTool._stateName) {
					this.state = updatedValue.value.value;
					this.showInfoFromUi(updatedValue);
				} else if (updatedValue.propertyName === SampleTool._useLengthName) {
					this.useLength = updatedValue.value.value;
					this.showInfoFromUi(updatedValue);
					this.syncLengthState();
				} else if (updatedValue.propertyName === SampleTool._lengthName) {
					this.length = updatedValue.value.value;
					this.showInfoFromUi(updatedValue);
				} else if (updatedValue.propertyName === SampleTool._surveyLengthName) {
					this.surveyLength = updatedValue.value.value;
					this.showInfoFromUi(updatedValue);
				} else if (updatedValue.propertyName === SampleTool._colorName) {
					this.colorValue = updatedValue.value.value;
					this.showColorInfoFromUi(updatedValue);
				} else if (updatedValue.propertyName === SampleTool._weightName) {
					this.weight = updatedValue.value.value;
					this.showInfoFromUi(updatedValue);
				}
				return true;
			}
		};
		SampleTool = ToolUtilities.defineIcon(SampleToolBase, import_react$36.createElement(SvgFeedback, null));
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/ToolWithDynamicSettings.js
var import_react$35, StateOptions, cities, ToolWithDynamicSettingsBase, ToolWithDynamicSettings;
function init_ToolWithDynamicSettings() {
	return (init_ToolWithDynamicSettings = __esmMin((() => {
		import_react$35 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_core_frontend();
		init_imodel_components_react();
		init_esm$3();
		init_AppUiTestProviders();
		(function(StateOptions) {
			StateOptions[StateOptions["None"] = 0] = "None";
			StateOptions[StateOptions["Alabama"] = 1] = "Alabama";
			StateOptions[StateOptions["California"] = 2] = "California";
			StateOptions[StateOptions["Pennsylvania"] = 3] = "Pennsylvania";
			StateOptions[StateOptions["NewYork"] = 4] = "NewYork";
		})(StateOptions || (StateOptions = {}));
		cities = [
			{
				state: StateOptions.None,
				cities: []
			},
			{
				state: StateOptions.Alabama,
				cities: [
					"Birmingham",
					"Montgomery",
					"Huntsville",
					"Mobile"
				]
			},
			{
				state: StateOptions.California,
				cities: [
					"Los Angeles",
					"San Diego",
					"San Jose",
					"San Francisco"
				]
			},
			{
				state: StateOptions.Pennsylvania,
				cities: [
					"Philadelphia",
					"Pittsburgh",
					"Allentown",
					"Erie"
				]
			},
			{
				state: StateOptions.NewYork,
				cities: [
					"New York",
					"Buffalo",
					"Rochester",
					"Yonkers"
				]
			}
		];
		ToolWithDynamicSettingsBase = class extends PrimitiveTool {
			static toolId = "uiItemsProvidersTest-ToolWithDynamicSettings";
			points = [];
			static translate(str) {
				return AppUiTestProviders.translate(`tools.${this.toolId}.${str}`);
			}
			static _statePropertyName = "state";
			static getStateDescription() {
				return {
					name: this._statePropertyName,
					displayLabel: this.translate("Prompts.State"),
					typename: "enum",
					enum: { choices: [
						{
							label: this.translate("State.None"),
							value: StateOptions.None
						},
						{
							label: this.translate("State.Alabama"),
							value: StateOptions.Alabama
						},
						{
							label: this.translate("State.California"),
							value: StateOptions.California
						},
						{
							label: this.translate("State.Pennsylvania"),
							value: StateOptions.Pennsylvania
						},
						{
							label: this.translate("State.NewYork"),
							value: StateOptions.NewYork
						}
					] }
				};
			}
			_stateValue = { value: StateOptions.None };
			get state() {
				return this._stateValue.value;
			}
			set state(option) {
				this._stateValue.value = option;
			}
			static _cityPropertyName = "city";
			static getCityDescription(stateId) {
				const availableCitiesChoices = cities[stateId].cities.map((cityName) => {
					return {
						label: cityName,
						value: cityName
					};
				});
				return {
					name: this._cityPropertyName,
					displayLabel: this.translate("Prompts.City"),
					typename: "enum",
					enum: { choices: availableCitiesChoices }
				};
			}
			_cityValue = { value: "" };
			get city() {
				return this._cityValue.value;
			}
			set city(option) {
				this._cityValue.value = option;
			}
			requireWriteableTarget() {
				return false;
			}
			async onPostInstall() {
				await super.onPostInstall();
				this.setupAndPromptForNextAction();
				this.points = [];
			}
			async onUnsuspend() {
				this.provideToolAssistance();
			}
			/** Establish current tool state and initialize drawing aides following onPostInstall, onDataButtonDown, onUndoPreviousStep, or other events that advance or back up the current tool state.
			* Enable snapping or auto-locate for AccuSnap.
			* Setup AccuDraw using AccuDrawHintBuilder.
			* Set view cursor when default cursor isn't applicable.
			* Provide tool assistance.
			*/
			setupAndPromptForNextAction() {
				this.provideToolAssistance();
			}
			/** A tool is responsible for providing tool assistance appropriate to the current tool state following significant events.
			* After onPostInstall to establish instructions for the initial tool state.
			* After onUnsuspend to reestablish instructions when no longer suspended by a ViewTool or InputCollector.
			* After onDataButtonDown (or other tool event) advances or backs up the current tool state.
			* After onUndoPreviousStep or onRedoPreviousStep modifies the current tool state.
			*/
			provideToolAssistance() {
				const mainInstruction = ToolAssistance.createInstruction(ToolAssistanceImage.CursorClick, ToolWithDynamicSettings.translate("Prompts.GetPoint"));
				const instructions = ToolAssistance.createInstructions(mainInstruction);
				IModelApp.notifications.setToolAssistance(instructions);
			}
			async onDataButtonDown(_ev) {
				this.setupAndPromptForNextAction();
				return EventHandled.No;
			}
			async onResetButtonUp(_ev) {
				await this.onReinitialize();
				return EventHandled.No;
			}
			async onRestartTool() {
				if (!await new ToolWithDynamicSettings().run()) return this.exitTool();
			}
			/** Used to supply DefaultToolSettingProvider with a list of properties to use to generate ToolSettings.  If undefined then no ToolSettings will be displayed */
			supplyToolSettingsProperties() {
				const toolSettings = new Array();
				toolSettings.push({
					value: this._stateValue,
					property: ToolWithDynamicSettings.getStateDescription(),
					editorPosition: {
						rowPriority: 1,
						columnIndex: 1
					}
				});
				if (this.state.valueOf() > 0 && this.state.valueOf() < cities.length) toolSettings.push({
					value: this._cityValue,
					property: ToolWithDynamicSettings.getCityDescription(this.state),
					editorPosition: {
						rowPriority: 2,
						columnIndex: 1
					}
				});
				return toolSettings;
			}
			/** Called from UI to update properties in tool */
			async applyToolSettingPropertyChange(updatedValue) {
				if (updatedValue.propertyName === ToolWithDynamicSettings._statePropertyName) {
					const newStateValue = updatedValue.value.value;
					if (this.state.valueOf() !== newStateValue) {
						this.state = newStateValue;
						this.city = cities[this.state].cities[0];
						this.reloadToolSettingsProperties();
					}
				}
				if (updatedValue.propertyName === ToolWithDynamicSettings._cityPropertyName) {
					const newCityValue = updatedValue.value.value;
					if (this.city.valueOf() !== newCityValue) this.city = newCityValue;
				}
				return true;
			}
		};
		ToolWithDynamicSettings = ToolUtilities.defineIcon(ToolWithDynamicSettingsBase, import_react$35.createElement(SvgCopy, null));
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/tools/UiLayoutTools.js
function init_UiLayoutTools() {
	return (init_UiLayoutTools = __esmMin((() => {
		init_appui_react();
		init_core_frontend();
	})))();
}
function init_ViewSelectorPanel$1() {
	return (init_ViewSelectorPanel$1 = __esmMin((() => {
		require_react();
		init_appui_react();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/components/EditorExampleComponent.js
/** Create a property record to test, allowing editors to be defined. */
function createPropertyRecord(type, value, editor) {
	return new PropertyRecord({
		valueFormat: PropertyValueFormat.Primitive,
		value
	}, {
		typename: type,
		name: "",
		displayLabel: "",
		editor: typeof editor === "string" ? { name: editor } : editor
	});
}
/** Create Enum typed property record, with filled "yellow", "red", "green" choices.  */
function createEnumProperty(editor) {
	const record = createPropertyRecord(StandardTypeNames.Enum, "red", editor);
	record.property.enum = {
		choices: [
			{
				label: "Yellow",
				value: "yellow"
			},
			{
				label: "Red",
				value: "red"
			},
			{
				label: "Green",
				value: "green"
			}
		],
		isStrict: false
	};
	return record;
}
/** Component that display at least 1 of each variety of editors registered by default in Components-react. */
function EditorExampleComponent() {
	return import_react$33.createElement(Flex, {
		flexDirection: "column",
		alignItems: "flex-start",
		gap: "m",
		style: { width: "100%" }
	}, propertyRecords.map((record, index) => {
		const editorKey = createEditorKey(record);
		const editorId = editorKey.replace(/[^A-Za-z]/g, "");
		return import_react$33.createElement(Flex, {
			key: index,
			flexDirection: "column"
		}, import_react$33.createElement(Flex, {
			flexDirection: "row",
			gap: "xl"
		}, import_react$33.createElement(Flex.Item, {
			id: `Legacy${editorId}`,
			alignSelf: "flex-start",
			style: { width: "300px" }
		}, import_react$33.createElement(OldEditorRenderer, { record })), import_react$33.createElement(Divider, { orientation: "vertical" }), import_react$33.createElement(Flex.Item, {
			id: `New${editorId}`,
			alignSelf: "flex-end",
			style: { width: "300px" }
		}, import_react$33.createElement(NewEditorRenderer, { record }))), import_react$33.createElement(Flex.Item, { alignSelf: "flex-start" }, import_react$33.createElement(Text, {
			variant: "small",
			isMuted: true
		}, editorKey, record.property.editor && import_react$33.createElement(DropdownMenu, { menuItems: (close) => [import_react$33.createElement(MenuItem, {
			key: 1,
			onClick: close
		}, import_react$33.createElement(Text, { variant: "leading" }, "Editor config:"), import_react$33.createElement("code", { style: {
			whiteSpace: "pre",
			display: "block"
		} }, JSON.stringify(record.property.editor, void 0, 2)))] }, import_react$33.createElement(IconButton, {
			styleType: "borderless",
			size: "small"
		}, import_react$33.createElement(SvgDetails, null))))));
	}));
}
function OldEditorRenderer({ record }) {
	return import_react$33.createElement(Flex, {
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "flex-end"
	}, availableSizes.map((localSize) => import_react$33.createElement(Flex.Item, { key: localSize }, import_react$33.createElement(EditorContainer, {
		propertyRecord: record,
		onCommit: () => void 0,
		onCancel: () => void 0
	}))));
}
function NewEditorRenderer({ record }) {
	return import_react$33.createElement(Flex, {
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "flex-end"
	}, availableSizes.map((localSize) => import_react$33.createElement(Flex.Item, { key: localSize }, import_react$33.createElement(PropertyRecordEditor, {
		propertyRecord: record,
		onCommit: () => void 0,
		onCancel: () => void 0,
		editorSystem: "new",
		size: "small"
	}))));
}
function createEditorKey(record) {
	return `${PropertyValueFormat[record.value.valueFormat]}:${record.property.typename}:${record.property.editor?.name ?? "Default"}[${record.property.editor?.params?.map((p) => p.type).join(",") ?? ""}]`.replace("[]", "");
}
var import_react$33, availableSizes, customFormattedNumberParams, inputEditorSizeParams, propertyRecords;
function init_EditorExampleComponent() {
	return (init_EditorExampleComponent = __esmMin((() => {
		import_react$33 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_abstract();
		init_components_react();
		init_Divider(), init_DropdownMenu(), init_Flex(), init_IconButton(), init_MenuItem(), init_Text();
		init_esm$3();
		availableSizes = ["default"];
		customFormattedNumberParams = {
			type: PropertyEditorParamTypes.CustomFormattedNumber,
			formatFunction: (numberValue) => numberValue.toFixed(2),
			parseFunction: (stringValue) => ({ value: Number.parseFloat(stringValue) })
		};
		inputEditorSizeParams = {
			type: PropertyEditorParamTypes.InputEditorSize,
			size: 5,
			maxLength: 5
		};
		propertyRecords = [
			createPropertyRecord(StandardTypeNames.String, "hi"),
			createPropertyRecord(StandardTypeNames.String, "hi", {
				name: StandardEditorNames.MultiLine,
				params: [{
					type: PropertyEditorParamTypes.MultilineText,
					rows: 5
				}]
			}),
			createPropertyRecord(StandardTypeNames.DateTime, new Date(2018, 0, 1)),
			createPropertyRecord(StandardTypeNames.ShortDate, new Date(2018, 0, 1)),
			createPropertyRecord(StandardTypeNames.Number, 1, {
				name: StandardEditorNames.Slider,
				params: [{
					type: PropertyEditorParamTypes.Slider,
					minimum: 0,
					maximum: 10
				}]
			}),
			createPropertyRecord(StandardTypeNames.Number, 1, {
				name: StandardEditorNames.NumberCustom,
				params: [customFormattedNumberParams]
			}),
			createPropertyRecord(StandardTypeNames.Number, 1, {
				name: StandardEditorNames.NumberCustom,
				params: [customFormattedNumberParams, {
					type: PropertyEditorParamTypes.Icon,
					definition: { iconSpec: "icon-placeholder" }
				}]
			}),
			createPropertyRecord(StandardTypeNames.Number, 1, StandardEditorNames.NumericInput),
			createPropertyRecord(StandardTypeNames.Number, 1, {
				name: StandardEditorNames.NumericInput,
				params: [inputEditorSizeParams]
			}),
			createPropertyRecord(StandardTypeNames.Number, 1, {
				name: StandardEditorNames.NumericInput,
				params: [{
					type: PropertyEditorParamTypes.Range,
					minimum: 0,
					maximum: 10,
					step: .5,
					precision: 1
				}]
			}),
			createPropertyRecord(StandardTypeNames.Number, 1, {
				name: StandardEditorNames.NumericInput,
				params: [inputEditorSizeParams, {
					type: PropertyEditorParamTypes.Range,
					minimum: 0,
					maximum: 10,
					step: .25,
					precision: 2
				}]
			}),
			createPropertyRecord(StandardTypeNames.Boolean, true),
			createPropertyRecord(StandardTypeNames.Boolean, true, StandardEditorNames.Toggle),
			createPropertyRecord(StandardTypeNames.Boolean, true, {
				name: "image-check-box",
				params: [{
					type: PropertyEditorParamTypes.CheckBoxImages,
					imageOff: "icon-visibility-hide-2",
					imageOn: "icon-visibility"
				}]
			}),
			createEnumProperty(),
			createEnumProperty(StandardEditorNames.EnumButtonGroup),
			createEnumProperty({
				name: StandardEditorNames.EnumButtonGroup,
				params: [{
					type: PropertyEditorParamTypes.ButtonGroupData,
					buttons: [
						{ iconSpec: "icon-app-1" },
						{ iconSpec: "icon-app-2" },
						{ iconSpec: "icon-apps-itwin" }
					]
				}]
			})
		];
	})))();
}
function init_LanguageSelect$1() {
	return (init_LanguageSelect$1 = __esmMin((() => {
		require_react();
		init_useTranslation();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/widgets/TreeWidget.js
var createTreeNodeItem, createHierarchy;
function init_TreeWidget() {
	return (init_TreeWidget = __esmMin((() => {
		require_react();
		init_components_react();
		init_appui_abstract();
		createTreeNodeItem = (id, parentId) => {
			return {
				id,
				parentId,
				label: PropertyRecord.fromString(id, id)
			};
		};
		createHierarchy = (rootNodeCount, childrenNodeCount) => {
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
							for (let y = 0; y < 3; y++) innerNodes[y] = createTreeNodeItem(`Node ${i}-${x}-${y}`, rootNodes[i].id);
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
		createHierarchy(3, 3);
	})))();
}
function init_PropertyGridWidget() {
	return (init_PropertyGridWidget = __esmMin((() => {
		require_react();
		init_appui_abstract();
		init_components_react();
	})))();
}
function init_ComponentExamplesProvider() {
	return (init_ComponentExamplesProvider = __esmMin((() => {
		require_react();
		init_internal$1();
		init_appui_react();
		init_core_frontend();
		init_appui_abstract();
		init_TreeWidget();
		init_imodel_components_react();
		init_EditorExampleComponent();
		init_PropertyGridWidget();
	})))();
}
function init_ComponentExamples$1() {
	return (init_ComponentExamples$1 = __esmMin((() => {
		require_react();
		init_core_react();
		init_appui_react();
		init_ComponentExamplesProvider();
		init_AppUiTestProviders();
		init_useTranslation();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/ContentLayoutFrontstage.js
function createContentLayoutFrontstage() {
	return FrontstageUtilities.createStandardFrontstage({
		id: createContentLayoutFrontstage.stageId,
		contentGroupProps: contentGroupProvider,
		cornerButton: import_react$27.createElement(BackstageAppButton, { icon: "icon-bentley-systems" }),
		usage: StageUsage.General
	});
}
var import_react$27, ContentLayoutStageContentGroupProvider, contentGroupProvider;
function init_ContentLayoutFrontstage() {
	return (init_ContentLayoutFrontstage = __esmMin((() => {
		import_react$27 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_ContentLayoutTools();
		init_ViewportContent();
		ContentLayoutStageContentGroupProvider = class extends ContentGroupProvider {
			async contentGroup(config) {
				const primaryViewState = UiFramework.getDefaultViewState()?.clone();
				if (primaryViewState) primaryViewState.description = "imodel-view-primary";
				const id = "primaryContent";
				const defaultContent = new ContentGroup({
					id: "content-layout-stage-frontstage-main-content-group",
					layout: StandardContentLayouts.singleView,
					contents: [{
						id,
						classId: "",
						content: import_react$27.createElement(ViewportContent, {
							contentId: id,
							renderViewOverlay: () => void 0,
							viewState: primaryViewState
						})
					}]
				});
				const iModelConnection = UiFramework.getIModelConnection();
				if (!iModelConnection) return defaultContent;
				const savedViewLayoutProps = await getSavedViewLayoutProps(config.id, iModelConnection);
				if (!savedViewLayoutProps) return defaultContent;
				const viewStates = await StageContentLayout.viewStatesFromProps(iModelConnection, savedViewLayoutProps);
				if (viewStates.length > 0) {
					const defaultViewState = viewStates[0];
					if (defaultViewState) UiFramework.setDefaultViewState(defaultViewState);
				}
				return new ContentGroup({
					...savedViewLayoutProps.contentGroupProps,
					contents: savedViewLayoutProps.contentGroupProps.contents.map((content, index) => {
						const viewState = viewStates[index];
						return {
							...content,
							content: import_react$27.createElement(ViewportContent, {
								viewState,
								renderViewOverlay: () => void 0
							})
						};
					})
				});
			}
		};
		contentGroupProvider = new ContentLayoutStageContentGroupProvider();
		createContentLayoutFrontstage.stageId = "content-layout";
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/content/SampleContentControl.js
var import_react$26, SampleContentControl;
function init_SampleContentControl$1() {
	return (init_SampleContentControl$1 = __esmMin((() => {
		import_react$26 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_Flex();
		SampleContentControl = class extends ContentControl {
			constructor(info, options) {
				super(info, options);
				this.reactNode = import_react$26.createElement("div", { className: "test-content-container" }, import_react$26.createElement(Flex, { justifyContent: "center" }, "Hello World!"));
			}
		};
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/useActiveContentId.js
function useActiveContentId() {
	const [activeId, setActiveId] = import_react$25.useState(UiFramework.content.getActiveId());
	import_react$25.useEffect(() => {
		return UiFramework.content.onActiveContentChangedEvent.addListener((args) => {
			setActiveId(args.id);
		});
	}, []);
	return activeId;
}
var import_react$25;
function init_useActiveContentId() {
	return (init_useActiveContentId = __esmMin((() => {
		import_react$25 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/CustomContentFrontstage.js
function CustomViewToolWidgetComposer() {
	const hideNavigationAid = useActiveContentId() === "sample-content";
	return import_react$24.createElement(ViewToolWidgetComposer, { hideNavigationAid });
}
function createCustomContentFrontstage() {
	const frontstage = FrontstageUtilities.createStandardFrontstage({
		id: createCustomContentFrontstage.stageId,
		usage: StageUsage.General,
		contentGroupProps: {
			id: "content-group",
			layout: {
				...StandardContentLayouts.twoHorizontalSplit,
				horizontalSplit: {
					...StandardContentLayouts.twoHorizontalSplit.horizontalSplit,
					minSizeBottom: 100,
					percentage: .8
				}
			},
			contents: [{
				id: "primary-content",
				classId: IModelViewportControl,
				applicationData: {
					viewState: UiFramework.getDefaultViewState,
					iModelConnection: UiFramework.getIModelConnection,
					featureOptions: { defaultViewOverlay: {
						enableScheduleAnimationViewOverlay: true,
						enableAnalysisTimelineViewOverlay: true,
						enableSolarTimelineViewOverlay: true
					} }
				}
			}, {
				id: "sample-content",
				classId: SampleContentControl,
				renderActiveStrip: false
			}]
		},
		cornerButton: import_react$24.createElement(BackstageAppButton, null)
	});
	return {
		...frontstage,
		viewNavigation: {
			...frontstage.viewNavigation,
			content: import_react$24.createElement(CustomViewToolWidgetComposer, null)
		}
	};
}
var import_react$24;
function init_CustomContentFrontstage() {
	return (init_CustomContentFrontstage = __esmMin((() => {
		import_react$24 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_SampleContentControl$1();
		init_useActiveContentId();
		createCustomContentFrontstage.stageId = "custom-content";
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/CustomFrontstageProvider.js
var import_react$23;
function init_CustomFrontstageProvider() {
	return (init_CustomFrontstageProvider = __esmMin((() => {
		import_react$23 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		new ContentGroup({
			id: "content-group",
			layout: StandardContentLayouts.singleView,
			contents: [{
				id: "content",
				classId: "",
				content: import_react$23.createElement("h1", null, "Custom Content")
			}]
		});
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/PopoutWindowsFrontstage.js
function createPopoutWindowsFrontstage() {
	return FrontstageUtilities.createStandardFrontstage({
		id: createPopoutWindowsFrontstage.stageId,
		usage: StageUsage.General,
		contentGroupProps: {
			id: "popout-windows-stage-frontstage-main-content-group",
			layout: StandardContentLayouts.singleView,
			contents: [{
				id: "primaryContent",
				classId: "",
				content: import_react$22.createElement(ViewportContent, null)
			}]
		},
		cornerButton: import_react$22.createElement(BackstageAppButton, { icon: "icon-bentley-systems" })
	});
}
var import_react$22;
function init_PopoutWindowsFrontstage() {
	return (init_PopoutWindowsFrontstage = __esmMin((() => {
		import_react$22 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_ViewportContent();
		createPopoutWindowsFrontstage.stageId = "appui-test-providers:PopoutWindowsFrontstage";
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/registerCustomFrontstage.js
function init_registerCustomFrontstage() {
	return (init_registerCustomFrontstage = __esmMin((() => {
		init_appui_react();
		init_CustomFrontstageProvider();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/SynchronizedViewportFrontstage.js
function createSynchronizedViewportFrontstage() {
	return FrontstageUtilities.createStandardFrontstage({
		id: createSynchronizedViewportFrontstage.stageId,
		contentGroupProps: {
			id: "synchronized-floating-viewport-stage-frontstage-main-content-group",
			layout: StandardContentLayouts.singleView,
			contents: [{
				id: "primaryContent",
				classId: "",
				content: import_react$21.createElement(ViewportContent, null)
			}]
		},
		cornerButton: import_react$21.createElement(BackstageAppButton, { icon: "icon-bentley-systems" }),
		usage: StageUsage.General
	});
}
var import_react$21;
function init_SynchronizedViewportFrontstage() {
	return (init_SynchronizedViewportFrontstage = __esmMin((() => {
		import_react$21 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_ViewportContent();
		createSynchronizedViewportFrontstage.stageId = "appui-test-providers:SynchronizedViewport";
	})))();
}
function init_UnitsField() {
	return (init_UnitsField = __esmMin((() => {
		require_react();
		init_esm$3();
		init_core_frontend();
		init_appui_react();
	})))();
}
function init_AbstractUiItemsProvider() {
	return (init_AbstractUiItemsProvider = __esmMin((() => {
		require_react();
		init_appui_react();
		init_SampleTool();
		init_AppUiTestProviders();
		init_OpenAbstractModalDialogTool();
		init_ToolWithDynamicSettings();
		init_UnitsField();
	})))();
}
function init_DisplayStyleField$1() {
	return (init_DisplayStyleField$1 = __esmMin((() => {
		require_classnames();
		require_react();
		init_core_frontend();
		init_useTranslation();
	})))();
}
function init_ControlViewportWidget() {
	return (init_ControlViewportWidget = __esmMin((() => {
		require_react();
		init_appui_react();
		init_core_bentley();
		init_ViewDefinitionSelector();
	})))();
}
function init_ViewportWidget() {
	return (init_ViewportWidget = __esmMin((() => {
		require_react();
		init_appui_react();
		init_imodel_components_react();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/providers/WidgetContentProvider.js
var import_react$15;
function init_WidgetContentProvider() {
	return (init_WidgetContentProvider = __esmMin((() => {
		import_react$15 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		import_react$15.createContext({
			activeId: void 0,
			setActiveId: () => {}
		});
	})))();
}
function init_ContentLayoutStageUiItemsProvider() {
	return (init_ContentLayoutStageUiItemsProvider = __esmMin((() => {
		require_react();
		init_appui_react();
		init_ContentLayoutTools();
		init_AppUiTestProviders();
		init_ViewSelectorPanel$1();
		init_DisplayStyleField$1();
		init_core_frontend();
		init_ControlViewportWidget();
		init_ViewportWidget();
		init_WidgetContentProvider();
		init_ContentLayoutFrontstage();
		init_useActiveContentId();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/SampleModelessDialog.js
var import_react$13;
function init_SampleModelessDialog$1() {
	return (init_SampleModelessDialog$1 = __esmMin((() => {
		import_react$13 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_core_frontend();
		init_appui_react();
		init_Button(), init_ComboBox();
		import_react$13.Component;
	})))();
}
function init_SelectedElementDataWidget() {
	return (init_SelectedElementDataWidget = __esmMin((() => {
		init_appui_react();
		require_react();
	})))();
}
function init_SampleNonModalDialog$1() {
	return (init_SampleNonModalDialog$1 = __esmMin((() => {
		require_react();
		init_core_frontend();
		init_appui_react();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/store.js
function createStore() {
	const state = initialState;
	const onChanged = new BeEvent();
	return {
		state,
		onChanged,
		setHideCustomDialogButton: (hide) => {
			state.hideCustomDialogButton = hide;
			onChanged.raiseEvent();
		},
		setShowCustomViewOverlay: (show) => {
			state.showCustomViewOverlay = show;
			onChanged.raiseEvent();
		},
		setAllow3dManipulations: (allow) => {
			state.allow3dManipulations = allow;
			onChanged.raiseEvent();
		}
	};
}
var initialState;
function init_store() {
	return (init_store = __esmMin((() => {
		init_core_bentley();
		initialState = {
			hideCustomDialogButton: false,
			showCustomViewOverlay: false,
			allow3dManipulations: true
		};
		createStore();
	})))();
}
function init_CustomContentStageUiProvider() {
	return (init_CustomContentStageUiProvider = __esmMin((() => {
		require_react();
		init_appui_abstract();
		init_appui_react();
		init_core_frontend();
		init_AppUiTestProviders();
		init_OpenCustomDialogTool();
		init_SampleModelessDialog$1();
		init_SelectedElementDataWidget();
		init_esm$3();
		init_SampleNonModalDialog$1();
		init_CustomContentFrontstage();
		init_store();
	})))();
}
function init_ViewAttributesWidget() {
	return (init_ViewAttributesWidget = __esmMin((() => {
		require_react();
		init_appui_react();
		init_core_common();
		init_core_frontend();
	})))();
}
function init_LogLifecycleWidget() {
	return (init_LogLifecycleWidget = __esmMin((() => {
		require_react();
		init_appui_react();
	})))();
}
function init_FloatingWidgetsUiItemsProvider() {
	return (init_FloatingWidgetsUiItemsProvider = __esmMin((() => {
		require_react();
		init_ViewAttributesWidget();
		init_appui_react();
		init_LogLifecycleWidget();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/providers/InspectUiItemInfoToolProvider.js
function init_InspectUiItemInfoToolProvider() {
	return (init_InspectUiItemInfoToolProvider = __esmMin((() => {
		init_appui_react();
		init_InspectUiItemInfoTool();
	})))();
}
function init_MessageUiItemsProvider() {
	return (init_MessageUiItemsProvider = __esmMin((() => {
		require_react();
		init_appui_react();
		init_core_bentley();
		init_core_frontend();
		init_esm$3();
	})))();
}
function init_PopoutWindowsProvider() {
	return (init_PopoutWindowsProvider = __esmMin((() => {
		require_react();
		init_appui_react();
		init_AppUiTestProviders();
		init_ViewSelectorPanel$1();
		init_PopoutWindowsFrontstage();
		init_DisplayStyleField$1();
		init_OpenPopoutViewTool();
		init_OpenPopoutDialogTool();
		init_ViewAttributesWidget();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/providers/PreviewFeaturesToggleProvider.js
var import_react$4;
function init_PreviewFeaturesToggleProvider() {
	return (init_PreviewFeaturesToggleProvider = __esmMin((() => {
		import_react$4 = /* @__PURE__ */ __toESM(require_react(), 1);
		init_appui_react();
		init_esm$3();
		import_react$4.createContext(void 0);
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/ui/providers/SynchronizedViewportProvider.js
function init_SynchronizedViewportProvider() {
	return (init_SynchronizedViewportProvider = __esmMin((() => {
		init_appui_react();
		init_OpenSynchronizedViewTool();
		init_SynchronizedViewportFrontstage();
		init_AppUiTestProviders();
		init_ViewSelectorPanel$1();
	})))();
}
function init_UpdatedUiItemsProvider() {
	return (init_UpdatedUiItemsProvider = __esmMin((() => {
		require_react();
		init_appui_react();
		init_esm$3();
	})))();
}
function init_LayoutWidget() {
	return (init_LayoutWidget = __esmMin((() => {
		require_react();
		require_Key_enum();
		init_core_frontend();
		init_appui_react();
		init_core_react();
		UiFramework.frontstages;
	})))();
}
function init_UseWidgetHookWidget() {
	return (init_UseWidgetHookWidget = __esmMin((() => {
		require_react();
		init_appui_react();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/createBlankConnection.js
function createBlankConnection() {
	return BlankConnection.create({
		name: "Exton PA",
		location: Cartographic.fromDegrees({
			longitude: -75.686694,
			latitude: 40.065757,
			height: 0
		}),
		extents: new Range3d(-1e3, -1e3, -100, 1e3, 1e3, 100)
	});
}
function createBlankViewState(iModel) {
	const ext = iModel.projectExtents;
	const viewState = SpatialViewState.createBlank(iModel, ext.low, ext.high.minus(ext.low));
	viewState.setAllow3dManipulations(true);
	viewState.displayStyle.backgroundColor = ColorDef.white;
	updateViewFlags(viewState);
	IModelApp.viewManager.onViewOpen.addOnce((vp) => {
		if (vp.view.hasSameCoordinates(viewState)) vp.applyViewState(viewState);
	});
	return viewState;
}
function updateViewFlags(viewState) {
	viewState.viewFlags = viewState.viewFlags.copy({
		acsTriad: true,
		grid: true
	});
	return viewState;
}
function init_createBlankConnection() {
	return (init_createBlankConnection = __esmMin((() => {
		init_core_common();
		init_core_frontend();
		init_Range();
	})))();
}
//#endregion
//#region ../../apps/test-providers/lib/appui-test-providers.js
function init_appui_test_providers() {
	return (init_appui_test_providers = __esmMin((() => {
		init_ContentLayoutTools();
		init_InspectUiItemInfoTool();
		init_OpenAbstractModalDialogTool();
		init_OpenCustomDialogTool();
		init_OpenPopoutDialogTool();
		init_OpenPopoutViewTool();
		init_OpenSynchronizedViewTool();
		init_RegisterUiProviderTool();
		init_SampleTool();
		init_ToolWithDynamicSettings();
		init_UiLayoutTools();
		init_ViewSelectorPanel$1();
		init_EditorExampleComponent();
		init_LanguageSelect$1();
		init_SampleModalDialog();
		init_ComponentExamples$1();
		init_ContentLayoutFrontstage();
		init_CustomContentFrontstage();
		init_CustomFrontstageProvider();
		init_PopoutWindowsFrontstage();
		init_registerCustomFrontstage();
		init_SynchronizedViewportFrontstage();
		init_AbstractUiItemsProvider();
		init_ContentLayoutStageUiItemsProvider();
		init_CustomContentStageUiProvider();
		init_FloatingWidgetsUiItemsProvider();
		init_InspectUiItemInfoToolProvider();
		init_MessageUiItemsProvider();
		init_PopoutWindowsProvider();
		init_PreviewFeaturesToggleProvider();
		init_SynchronizedViewportProvider();
		init_UpdatedUiItemsProvider();
		init_WidgetContentProvider();
		init_LayoutWidget();
		init_LogLifecycleWidget();
		init_UseWidgetHookWidget();
		init_useActiveContentId();
		init_ViewportContent();
		init_AppUiTestProviders();
		init_createBlankConnection();
		init_store();
	})))();
}
//#endregion
//#region src/openDemoIModel.ts
async function openDemoIModel(demoIModel) {
	let iModelConnection;
	let viewState;
	if (demoIModel === "blank") {
		iModelConnection = createBlankConnection();
		viewState = createBlankViewState(iModelConnection);
	} else {
		iModelConnection = await CheckpointConnection.openRemote(demoIModel.iTwinId, demoIModel.iModelId);
		viewState = await new ViewCreator3d(iModelConnection).createDefaultView();
	}
	UiFramework.setIModelConnection(iModelConnection, true);
	UiFramework.setDefaultViewState(viewState, true);
}
function init_openDemoIModel() {
	return (init_openDemoIModel = __esmMin((() => {
		init_appui_react();
		init_appui_test_providers();
		init_core_frontend();
	})))();
}
//#endregion
//#region src/AppUiStory.tsx
function AppUiStory(props) {
	const demoIModel = useStoryDemoIModel(props);
	const [initialized, setInitialized] = import_react.useState(false);
	import_react.useEffect(() => {
		let ignore = false;
		const startup = async () => {
			await IModelApp.startup({
				accuDraw: new FrameworkAccuDraw(),
				toolAdmin: new FrameworkToolAdmin(),
				hubAccess: new FrontendIModelsAccess({ api: { baseUrl: "https://api.bentley.com/imodels" } }),
				authorizationClient: new DemoAuthClient(),
				notifications: new AppNotificationManager()
			});
			await UiFramework.initialize(void 0);
			await IModelApp.quantityFormatter.setActiveUnitSystem("metric");
			BentleyCloudRpcManager.initializeClient({
				info: {
					title: "visualization",
					version: "v4.0"
				},
				pathPrefix: "https://api.bentley.com/imodeljs"
			}, [
				IModelReadRpcInterface,
				IModelTileRpcInterface,
				SnapshotIModelRpcInterface
			]);
			demoIModel && await openDemoIModel(demoIModel);
			await props.onInitialize?.();
			for (const provider of props.itemProviders ?? []) UiItemsManager.register(provider);
			const frontstages = getFrontstages(props.frontstages);
			for (const frontstage of frontstages) UiFramework.frontstages.addFrontstage(frontstage);
			if (ignore) return;
			setInitialized(true);
		};
		const shutdown = async () => {
			await UiFramework.getIModelConnection()?.close();
			await UiFramework.frontstages.setActiveFrontstageDef(void 0);
			UiFramework.frontstages.clearFrontstageProviders();
			for (const provider of props.itemProviders ?? []) UiItemsManager.unregister(provider.id);
			UiFramework.terminate();
			await IModelApp.shutdown();
		};
		const cleanup = appInitializer.initialize(startup, shutdown);
		return () => {
			ignore = true;
			setInitialized(false);
			cleanup();
		};
	}, [props, demoIModel]);
	if (!initialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Initializer, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Initialized, { ...props });
}
function Initialized(props) {
	const { frontstages: frontstagesGetter, onFrontstageActivated } = props;
	import_react.useEffect(() => {
		let ignore = false;
		const frontstage = getFrontstages(frontstagesGetter)[0];
		(async function() {
			if (!frontstage) return;
			await UiFramework.frontstages.setActiveFrontstage(frontstage.id);
			if (ignore) return;
			onFrontstageActivated?.();
		})();
		return () => {
			ignore = true;
		};
	}, [frontstagesGetter, onFrontstageActivated]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider_default, {
		store: UiFramework.store,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeManager, { children: [props.children, !props.displayChildrenOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigurableUiContent, {
			style: { height: props.layout === "fullscreen" ? "100vh" : "calc(100vh - 2rem)" },
			appBackstage: props.appBackstage,
			widgetIcon: true,
			renderModalFrontstage: props.renderModalFrontstage
		})] })
	}) });
}
function Initializer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressLinear, {
		indeterminate: true,
		labels: ["Getting things ready!"]
	}) });
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title3, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle2, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primary, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controls3, {})
	] });
}
function getFrontstages(frontstages) {
	if (!frontstages) return [createFrontstage()];
	if (Array.isArray(frontstages)) return frontstages;
	return frontstages();
}
function useStoryDemoIModel(props) {
	const demoIModel = useDemoIModel();
	if (!props.demoIModel) return void 0;
	if (props.demoIModel === true) return demoIModel;
	return demoIModel ?? props.demoIModel?.default;
}
var import_react, import_jsx_runtime, DemoAuthClient, appInitializer;
function init_AppUiStory() {
	return (init_AppUiStory = __esmMin((() => {
		import_react = /* @__PURE__ */ __toESM(require_react(), 1);
		init_react_redux();
		init_blocks();
		init_appui_react();
		init_core_common();
		init_core_frontend();
		init_esm$2();
		init_ProgressLinear(), init_ThemeProvider();
		init_Utils();
		init_DemoIModel();
		init_openDemoIModel();
		import_jsx_runtime = require_jsx_runtime();
		DemoAuthClient = class {
			accessToken = void 0;
			async getAccessToken() {
				this.accessToken ??= (async () => {
					const result = await (await fetch("https://connect-itwinjscodesandbox.bentley.com/api/userToken")).json();
					setTimeout(() => this.accessToken = void 0, new Date(result._expiresAt).getTime() - (/* @__PURE__ */ new Date()).getTime() - 5e3);
					return `Bearer ${result._jwt}`;
				})();
				return this.accessToken;
			}
		};
		appInitializer = (() => {
			let latestStartup;
			let initializer;
			return { initialize: (startup, shutdown) => {
				latestStartup = startup;
				let ignore = false;
				(async () => {
					if (initializer) await initializer.cleanup();
					if (ignore) return;
					if (startup !== latestStartup) return;
					let shutdownPromise;
					initializer = {
						cleanup: async () => {
							if (shutdownPromise) {
								await shutdownPromise;
								return;
							}
							await startupPromise;
							shutdownPromise = shutdown();
							await shutdownPromise;
						},
						startup
					};
					const startupPromise = startup();
					await startupPromise;
				})();
				return () => {
					ignore = true;
					if (initializer?.startup !== startup) return;
					initializer.cleanup();
				};
			} };
		})();
		AppUiStory.__docgenInfo = {
			"description": "",
			"methods": [],
			"displayName": "AppUiStory",
			"props": {
				"children": {
					"required": false,
					"tsType": {
						"name": "ReactReactNode",
						"raw": "React.ReactNode"
					},
					"description": ""
				},
				"demoIModel": {
					"required": false,
					"tsType": {
						"name": "union",
						"raw": "boolean | { default: DemoIModel }",
						"elements": [{ "name": "boolean" }, {
							"name": "signature",
							"type": "object",
							"raw": "{ default: DemoIModel }",
							"signature": { "properties": [{
								"key": "default",
								"value": {
									"name": "union",
									"raw": "RemoteIModel | \"blank\"",
									"elements": [{ "name": "RemoteIModel" }, {
										"name": "literal",
										"value": "\"blank\""
									}],
									"required": true
								}
							}] }
						}]
					},
					"description": ""
				},
				"frontstages": {
					"required": false,
					"tsType": {
						"name": "union",
						"raw": "Frontstage[] | (() => Frontstage[])",
						"elements": [{
							"name": "Array",
							"elements": [{ "name": "Frontstage" }],
							"raw": "Frontstage[]"
						}, { "name": "unknown" }]
					},
					"description": ""
				},
				"itemProviders": {
					"required": false,
					"tsType": {
						"name": "Array",
						"elements": [{ "name": "UiItemsProvider" }],
						"raw": "UiItemsProvider[]"
					},
					"description": ""
				},
				"layout": {
					"required": false,
					"tsType": {
						"name": "literal",
						"value": "\"fullscreen\""
					},
					"description": ""
				},
				"onInitialize": {
					"required": false,
					"tsType": {
						"name": "signature",
						"type": "function",
						"raw": "() => Promise<void>",
						"signature": {
							"arguments": [],
							"return": {
								"name": "Promise",
								"elements": [{ "name": "void" }],
								"raw": "Promise<void>"
							}
						}
					},
					"description": ""
				},
				"onFrontstageActivated": {
					"required": false,
					"tsType": {
						"name": "signature",
						"type": "function",
						"raw": "() => void",
						"signature": {
							"arguments": [],
							"return": { "name": "void" }
						}
					},
					"description": ""
				},
				"displayChildrenOnly": {
					"required": false,
					"tsType": { "name": "boolean" },
					"description": "Only display provided children, otherwise, add ConfigurableUIContent component below children. Defaults to false;"
				}
			},
			"composes": ["Pick"]
		};
		Page.__docgenInfo = {
			"description": "",
			"methods": [],
			"displayName": "Page"
		};
	})))();
}
//#endregion
export { EditorExampleComponent as a, init_ViewportContent as c, init_appui_test_providers as i, Page as n, init_EditorExampleComponent as o, init_AppUiStory as r, ViewportContent as s, AppUiStory as t };
