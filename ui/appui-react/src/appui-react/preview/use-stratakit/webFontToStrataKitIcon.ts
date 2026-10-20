/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { StrataKitIcon } from "./StrataKitIcon.js";

type StrataKitIconProps = React.ComponentProps<typeof StrataKitIcon>;
type StrataKitIconHrefFn = NonNullable<StrataKitIconProps>["href"];

// cSpell:disable

/**
 * Maps web font icon names from @bentley/icons-generic-webfont to StrataKit icon modules.
 * @internal
 */
export const webFontToStrataKitIcon: {
  [key: string]: StrataKitIconHrefFn;
} = {
  "icon-2d": (importIcon) => importIcon("@stratakit/icons/2d").svg2D,
  // "icon-3d-photo": undefined,
  // "icon-3d-render": undefined,
  "icon-3d": (importIcon) => importIcon("@stratakit/icons/3d").svg3D,
  // "icon-accusnaps": undefined,
  "icon-active": (importIcon) =>
    importIcon("@stratakit/icons/checkmark").svgCheckmark,
  "icon-activity": (importIcon) =>
    importIcon("@stratakit/icons/activity").svgActivity,
  "icon-add-circular": (importIcon) =>
    importIcon("@stratakit/icons/add-circle").svgAddCircle,
  "icon-add": (importIcon) => importIcon("@stratakit/icons/add").svgAdd,
  "icon-airplane": (importIcon) =>
    importIcon("@stratakit/icons/airplane").svgAirplane,
  // "icon-airport": undefined,
  // "icon-alarm-alarm": undefined,
  // "icon-alarm-critical-alarm": undefined,
  // "icon-alarm-early-warning": undefined,
  // "icon-alarm-priority-1": undefined,
  // "icon-alarm-priority-2": undefined,
  // "icon-alarm-priority-3": undefined,
  // "icon-alarm-priority-4": undefined,
  // "icon-alarm-warning": undefined,
  // "icon-alarms-alarm": undefined,
  // "icon-alarms-critical-alarm": undefined,
  // "icon-alarms-early-warning": undefined,
  // "icon-alarms-priority-1": undefined,
  // "icon-alarms-priority-2": undefined,
  // "icon-alarms-priority-3": undefined,
  // "icon-alarms-priority-4": undefined,
  // "icon-alarms-warning": undefined,
  "icon-align-align-bottom": (importIcon) =>
    importIcon("@stratakit/icons/align-bottom").svgAlignBottom,
  "icon-align-align-center-horizontal": (importIcon) =>
    importIcon("@stratakit/icons/align-center-horizontal")
      .svgAlignCenterHorizontal,
  "icon-align-align-center-vertical": (importIcon) =>
    importIcon("@stratakit/icons/align-center-vertical").svgAlignCenterVertical,
  "icon-align-align-left": (importIcon) =>
    importIcon("@stratakit/icons/align-left").svgAlignLeft,
  "icon-align-align-right": (importIcon) =>
    importIcon("@stratakit/icons/align-right").svgAlignRight,
  "icon-align-align-top": (importIcon) =>
    importIcon("@stratakit/icons/align-top").svgAlignTop,
  "icon-angle-measure": (importIcon) =>
    importIcon("@stratakit/icons/measure-angle").svgMeasureAngle,
  // "icon-annotation-add": undefined,
  // "icon-annotation-info": undefined,
  // "icon-annotation-manager": undefined,
  // "icon-annotation-settings": undefined,
  // "icon-annotation-show": undefined,
  "icon-annotation": (importIcon) =>
    importIcon("@stratakit/icons/annotation").svgAnnotation,
  // "icon-app-1": undefined,
  // "icon-app-2": undefined,
  // "icon-app-launcher": undefined,
  // "icon-applications": undefined,
  // "icon-apps-assetwise-2": undefined,
  // "icon-apps-assetwise": undefined,
  // "icon-apps-connect": undefined,
  // "icon-apps-issue-resolution": undefined,
  "icon-apps-itwin": (importIcon) =>
    importIcon("@stratakit/icons/itwin").svgITwin,
  // "icon-apps-projectwise": undefined,
  // "icon-apps-sharepoint-2": undefined,
  // "icon-apps-sharepoint": undefined,
  "icon-archived": (importIcon) =>
    importIcon("@stratakit/icons/archive").svgArchive,
  "icon-arrow-down": (importIcon) =>
    importIcon("@stratakit/icons/arrow-down").svgArrowDown,
  "icon-arrow-left": (importIcon) =>
    importIcon("@stratakit/icons/arrow-left").svgArrowLeft,
  "icon-arrow-right": (importIcon) =>
    importIcon("@stratakit/icons/arrow-right").svgArrowRight,
  "icon-arrow-up": (importIcon) =>
    importIcon("@stratakit/icons/arrow-up").svgArrowUp,
  // "icon-asset-classification-hide": undefined,
  // "icon-asset-isolate": undefined,
  "icon-attach": (importIcon) =>
    importIcon("@stratakit/icons/attach").svgAttach,
  "icon-automatic": (importIcon) =>
    importIcon("@stratakit/icons/automagic").svgAutomagic,
  // "icon-automation": undefined,
  "icon-away": (importIcon) =>
    importIcon("@stratakit/icons/user-away").svgUserAway,
  "icon-basket": (importIcon) =>
    importIcon("@stratakit/icons/basket").svgBasket,
  "icon-bentley-systems": (importIcon) =>
    importIcon("@stratakit/icons/brand-bentley-systems").svgBrandBentleySystems,
  // "icon-blank": undefined,
  "icon-bolt-2": (importIcon) => importIcon("@stratakit/icons/bolt").svgBolt,
  "icon-bookmark": (importIcon) =>
    importIcon("@stratakit/icons/bookmark").svgBookmark,
  // "icon-boundary-offset": undefined,
  // "icon-browse-2": undefined,
  // "icon-browse": undefined,
  "icon-calendar": (importIcon) =>
    importIcon("@stratakit/icons/calendar").svgCalendar,
  // "icon-callout": undefined,
  "icon-camera-animation-disabled": (importIcon) =>
    importIcon("@stratakit/icons/camera-video-disabled").svgCameraVideoDisabled,
  "icon-camera-animation": (importIcon) =>
    importIcon("@stratakit/icons/camera-video").svgCameraVideo,
  // "icon-camera-eye": undefined,
  // "icon-camera-location": undefined,
  "icon-camera": (importIcon) =>
    importIcon("@stratakit/icons/camera").svgCamera,
  // "icon-caret-down-2": undefined,
  "icon-caret-down": (importIcon) =>
    importIcon("@stratakit/icons/caret-down").svgCaretDown,
  "icon-caret-left": (importIcon) =>
    importIcon("@stratakit/icons/caret-left").svgCaretLeft,
  "icon-caret-right": (importIcon) =>
    importIcon("@stratakit/icons/caret-right").svgCaretRight,
  // "icon-caret-up-2": undefined,
  "icon-caret-up": (importIcon) =>
    importIcon("@stratakit/icons/caret-up").svgCaretUp,
  // "icon-cell": undefined,
  "icon-charts": (importIcon) =>
    importIcon("@stratakit/icons/chart-bar").svgChartBar,
  // "icon-chat-new": undefined,
  "icon-chat": (importIcon) => importIcon("@stratakit/icons/chat").svgChat,
  // "icon-check-in-document": undefined,
  // "icon-check-in": undefined,
  // "icon-check-out-document": undefined,
  // "icon-check-out": undefined,
  "icon-checkbox-deselect": (importIcon) =>
    importIcon("@stratakit/icons/checkbox-deselect").svgCheckboxDeselect,
  "icon-checkbox-select": (importIcon) =>
    importIcon("@stratakit/icons/checkbox-select").svgCheckboxSelect,
  "icon-checkmark": (importIcon) =>
    importIcon("@stratakit/icons/checkmark").svgCheckmark,
  "icon-chevron-down": (importIcon) =>
    importIcon("@stratakit/icons/chevron-down").svgChevronDown,
  "icon-chevron-left": (importIcon) =>
    importIcon("@stratakit/icons/chevron-left").svgChevronLeft,
  "icon-chevron-right": (importIcon) =>
    importIcon("@stratakit/icons/chevron-right").svgChevronRight,
  "icon-chevron-up": (importIcon) =>
    importIcon("@stratakit/icons/chevron-up").svgChevronUp,
  "icon-circle": (importIcon) =>
    importIcon("@stratakit/icons/circle").svgCircle,
  "icon-clear-day": (importIcon) => importIcon("@stratakit/icons/sun").svgSun,
  "icon-clear-night": (importIcon) =>
    importIcon("@stratakit/icons/moon").svgMoon,
  "icon-clipboard": (importIcon) =>
    importIcon("@stratakit/icons/clipboard").svgClipboard,
  // "icon-clipboard-copy-2": undefined,
  // "icon-clipboard-copy-3": undefined,
  // "icon-clipboard-copy": undefined,
  // "icon-clipboard-cut": undefined,
  // "icon-clipboard-paste-2": undefined,
  // "icon-clipboard-paste": undefined,
  "icon-clock": (importIcon) => importIcon("@stratakit/icons/clock").svgClock,
  // "icon-close-2": undefined,
  "icon-close-circular": (importIcon) =>
    importIcon("@stratakit/icons/dismiss-circle").svgDismissCircle,
  "icon-close": (importIcon) =>
    importIcon("@stratakit/icons/dismiss").svgDismiss,
  "icon-cloud-download": (importIcon) =>
    importIcon("@stratakit/icons/cloud-download").svgCloudDownload,
  "icon-cloud-upload": (importIcon) =>
    importIcon("@stratakit/icons/cloud-upload").svgCloudUpload,
  "icon-cloud": (importIcon) => importIcon("@stratakit/icons/cloud").svgCloud,
  // "icon-clouds-broken": undefined,
  // "icon-clouds-scattered-day": undefined,
  // "icon-clouds-scattered-night": undefined,
  // "icon-coating-system-concrete": undefined,
  // "icon-coating-system-steelwork": undefined,
  "icon-collapse-all": (importIcon) =>
    importIcon("@stratakit/icons/collapse-rows-all").svgCollapseRowsAll,
  "icon-collapse": (importIcon) =>
    importIcon("@stratakit/icons/collapse-rows").svgCollapseRows,
  // "icon-comments-add": undefined,
  // "icon-comments": undefined,
  "icon-compare": (importIcon) =>
    importIcon("@stratakit/icons/compare").svgCompare,
  "icon-computer": (importIcon) =>
    importIcon("@stratakit/icons/computer").svgComputer,
  // "icon-concrete-block": undefined,
  // "icon-consequence-failure": undefined,
  // "icon-construction-work-area": undefined,
  // "icon-convert": undefined,
  "icon-crop": (importIcon) => importIcon("@stratakit/icons/crop").svgCrop,
  // "icon-cross-section-alignment": undefined,
  // "icon-cross-section-dynamic": undefined,
  "icon-cross-section": (importIcon) =>
    importIcon("@stratakit/icons/cross-section").svgCrossSection,
  // "icon-cube-faces-bottom": undefined,
  // "icon-cube-faces-front": undefined,
  // "icon-cube-faces-iso-left": undefined,
  // "icon-cube-faces-iso-right": undefined,
  // "icon-cube-faces-left": undefined,
  // "icon-cube-faces-none": undefined,
  // "icon-cube-faces-rear": undefined,
  // "icon-cube-faces-right": undefined,
  // "icon-cube-faces-top": undefined,
  "icon-cursor-click": (importIcon) =>
    importIcon("@stratakit/icons/cursor-click").svgCursorClick,
  "icon-cursor": (importIcon) =>
    importIcon("@stratakit/icons/cursor").svgCursor,
  "icon-dashboard-2": (importIcon) =>
    importIcon("@stratakit/icons/dashboard").svgDashboard,
  // "icon-data-visualization": undefined,
  "icon-database": (importIcon) =>
    importIcon("@stratakit/icons/database").svgDatabase,
  "icon-delete": (importIcon) =>
    importIcon("@stratakit/icons/delete").svgDelete,
  "icon-deliverable": (importIcon) =>
    importIcon("@stratakit/icons/deliverables").svgDeliverables,
  // "icon-design-review": undefined,
  "icon-details": (importIcon) =>
    importIcon("@stratakit/icons/details").svgDetails,
  "icon-developer": (importIcon) =>
    importIcon("@stratakit/icons/developer").svgDeveloper,
  "icon-disconnect": (importIcon) =>
    importIcon("@stratakit/icons/disconnect").svgDisconnect,
  // "icon-distance": undefined,
  // "icon-distribute-distribute-bottom": undefined,
  "icon-distribute-distribute-center-horizontal": (importIcon) =>
    importIcon("@stratakit/icons/distribute-center-horizontal")
      .svgDistributeCenterHorizontal,
  "icon-distribute-distribute-center-vertical": (importIcon) =>
    importIcon("@stratakit/icons/distribute-center-vertical")
      .svgDistributeCenterVertical,
  "icon-distribute-distribute-left": (importIcon) =>
    importIcon("@stratakit/icons/distribute-left").svgDistributeLeft,
  "icon-distribute-distribute-right": (importIcon) =>
    importIcon("@stratakit/icons/distribute-right").svgDistributeRight,
  "icon-distribute-distribute-top": (importIcon) =>
    importIcon("@stratakit/icons/distribute-top").svgDistributeTop,
  // "icon-document-compare": undefined,
  "icon-document-lock": (importIcon) =>
    importIcon("@stratakit/icons/document-locked").svgDocumentLocked,
  "icon-document-reference": (importIcon) =>
    importIcon("@stratakit/icons/document-reference").svgDocumentReference,
  // "icon-document-set": undefined,
  "icon-document": (importIcon) =>
    importIcon("@stratakit/icons/document-blank").svgDocumentBlank,
  "icon-documentation": (importIcon) =>
    importIcon("@stratakit/icons/documentation").svgDocumentation,
  "icon-download": (importIcon) =>
    importIcon("@stratakit/icons/download").svgDownload,
  // "icon-drag": undefined,
  "icon-draw": (importIcon) => importIcon("@stratakit/icons/draw").svgDraw,
  "icon-duplicate": (importIcon) =>
    importIcon("@stratakit/icons/duplicate").svgDuplicate,
  // "icon-ec-class": undefined,
  // "icon-ec-schema": undefined,
  "icon-edit-all": (importIcon) =>
    importIcon("@stratakit/icons/edit-all").svgEditAll,
  "icon-edit-object": (importIcon) =>
    importIcon("@stratakit/icons/object-edit").svgObjectEdit,
  "icon-edit": (importIcon) => importIcon("@stratakit/icons/edit").svgEdit,
  // "icon-element": undefined,
  "icon-ellipse": (importIcon) =>
    importIcon("@stratakit/icons/ellipse").svgEllipse,
  "icon-email-at": (importIcon) =>
    importIcon("@stratakit/icons/email-at").svgEmailAt,
  "icon-email": (importIcon) => importIcon("@stratakit/icons/email").svgEmail,
  "icon-exit": (importIcon) => importIcon("@stratakit/icons/exit").svgExit,
  "icon-expand-all": (importIcon) =>
    importIcon("@stratakit/icons/expand-rows-all").svgExpandRowsAll,
  "icon-expand": (importIcon) =>
    importIcon("@stratakit/icons/expand-rows").svgExpandRows,
  "icon-export": (importIcon) =>
    importIcon("@stratakit/icons/export").svgExport,
  // "icon-external-apps": undefined,
  "icon-eyedropper-drop": (importIcon) =>
    importIcon("@stratakit/icons/eyedropper-drop").svgEyedropperDrop,
  "icon-eyedropper-filled": (importIcon) =>
    importIcon("@stratakit/icons/eyedropper-filled").svgEyedropperFilled,
  "icon-eyedropper": (importIcon) =>
    importIcon("@stratakit/icons/eyedropper").svgEyedropper,
  "icon-feedback": (importIcon) =>
    importIcon("@stratakit/icons/feedback").svgFeedback,
  // "icon-file-types-amim": undefined,
  // "icon-file-types-archive": undefined,
  // "icon-file-types-audio": undefined,
  // "icon-file-types-autocad": undefined,
  // "icon-file-types-creative-cloud": undefined,
  // "icon-file-types-dgn-db-2": undefined,
  // "icon-file-types-dgn-db": undefined,
  // "icon-file-types-document": undefined,
  // "icon-file-types-dwg": undefined,
  // "icon-file-types-forms-shared-help": undefined,
  // "icon-file-types-forms-shared-success": undefined,
  // "icon-file-types-forms-shared": undefined,
  // "icon-file-types-forms-unshared-help": undefined,
  // "icon-file-types-forms-unshared-success": undefined,
  // "icon-file-types-image": undefined,
  // "icon-file-types-microstation": undefined,
  // "icon-file-types-mism": undefined,
  // "icon-file-types-msg": undefined,
  // "icon-file-types-pdf-markup": undefined,
  "icon-file-types-pdf": (importIcon) =>
    importIcon("@stratakit/icons/document-pdf").svgDocumentPDF,
  // "icon-file-types-ppt": undefined,
  // "icon-file-types-raster": undefined,
  // "icon-file-types-revit": undefined,
  // "icon-file-types-rfa": undefined,
  // "icon-file-types-sketchup": undefined,
  // "icon-file-types-system": undefined,
  // "icon-file-types-txt-2": undefined,
  // "icon-file-types-txt": undefined,
  // "icon-file-types-unknown": undefined,
  // "icon-file-types-vector": undefined,
  // "icon-file-types-video": undefined,
  // "icon-file-types-visio": undefined,
  // "icon-file-types-word": undefined,
  // "icon-file-types-xls": undefined,
  "icon-filter-outlined": (importIcon) =>
    importIcon("@stratakit/icons/filter").svgFilter,
  "icon-filter": (importIcon) =>
    importIcon("@stratakit/icons/filter").svgFilter,
  "icon-find": (importIcon) => importIcon("@stratakit/icons/find").svgFind,
  "icon-fire-extinguisher": (importIcon) =>
    importIcon("@stratakit/icons/fire-extinguisher").svgFireExtinguisher,
  "icon-fit-to-view": (importIcon) =>
    importIcon("@stratakit/icons/fit-to-view").svgFitToView,
  "icon-flag-2": (importIcon) => importIcon("@stratakit/icons/flag").svgFlag,
  "icon-flag": (importIcon) => importIcon("@stratakit/icons/flag").svgFlag,
  "icon-folder-add": (importIcon) =>
    importIcon("@stratakit/icons/folder-add").svgFolderAdd,
  "icon-folder-chevron-down": (importIcon) =>
    importIcon("@stratakit/icons/folder-chevron-down").svgFolderChevronDown,
  "icon-folder-chevron-up": (importIcon) =>
    importIcon("@stratakit/icons/folder-chevron-up").svgFolderChevronUp,
  "icon-folder-export": (importIcon) =>
    importIcon("@stratakit/icons/folder-export").svgFolderExport,
  "icon-folder-import": (importIcon) =>
    importIcon("@stratakit/icons/folder-import").svgFolderImport,
  // "icon-folder-large": undefined,
  "icon-folder-lock": (importIcon) =>
    importIcon("@stratakit/icons/folder-lock").svgFolderLock,
  "icon-folder-opened": (importIcon) =>
    importIcon("@stratakit/icons/folder-open").svgFolderOpen,
  "icon-folder-remove-2": (importIcon) =>
    importIcon("@stratakit/icons/folder-remove").svgFolderRemove,
  "icon-folder-remove": (importIcon) =>
    importIcon("@stratakit/icons/folder-remove").svgFolderRemove,
  "icon-folder-shortcut": (importIcon) =>
    importIcon("@stratakit/icons/folder-shortcut").svgFolderShortcut,
  "icon-folder": (importIcon) =>
    importIcon("@stratakit/icons/folder").svgFolder,
  "icon-font-bold": (importIcon) =>
    importIcon("@stratakit/icons/font-bold").svgFontBold,
  "icon-font-color": (importIcon) =>
    importIcon("@stratakit/icons/font-color").svgFontColor,
  "icon-font-italic": (importIcon) =>
    importIcon("@stratakit/icons/font-italic").svgFontItalic,
  "icon-font-size": (importIcon) =>
    importIcon("@stratakit/icons/font-size").svgFontSize,
  "icon-function": (importIcon) =>
    importIcon("@stratakit/icons/function").svgFunction,
  "icon-gesture-one-finger-drag": (importIcon) =>
    importIcon("@stratakit/icons/gesture-one-finger-drag")
      .svgGestureOneFingerDrag,
  "icon-gesture-one-finger-tap-double": (importIcon) =>
    importIcon("@stratakit/icons/gesture-one-finger-double-tap")
      .svgGestureOneFingerDoubleTap,
  "icon-gesture-one-finger-tap": (importIcon) =>
    importIcon("@stratakit/icons/gesture-one-finger-tap")
      .svgGestureOneFingerTap,
  "icon-gesture-pinch": (importIcon) =>
    importIcon("@stratakit/icons/gesture-pinch").svgGesturePinch,
  "icon-gesture-touch": (importIcon) =>
    importIcon("@stratakit/icons/gesture-touch").svgGestureTouch,
  "icon-gesture-two-finger-drag": (importIcon) =>
    importIcon("@stratakit/icons/gesture-two-finger-drag")
      .svgGestureTwoFingerDrag,
  "icon-gesture-two-finger-tap": (importIcon) =>
    importIcon("@stratakit/icons/gesture-two-finger-tap")
      .svgGestureTwoFingerTap,
  "icon-gesture-two-finger": (importIcon) =>
    importIcon("@stratakit/icons/gesture-two-finger").svgGestureTwoFinger,
  "icon-globe": (importIcon) => importIcon("@stratakit/icons/globe").svgGlobe,
  "icon-graph-bar": (importIcon) =>
    importIcon("@stratakit/icons/chart-bar").svgChartBar,
  "icon-graph-pie-chart": (importIcon) =>
    importIcon("@stratakit/icons/chart-pie").svgChartPie,
  "icon-graph-scatter-chart": (importIcon) =>
    importIcon("@stratakit/icons/graph-scatter-chart").svgGraphScatterChart,
  "icon-graph": (importIcon) =>
    importIcon("@stratakit/icons/chart-line").svgChartLine,
  "icon-group-ungroup": (importIcon) =>
    importIcon("@stratakit/icons/ungroup").svgUngroup,
  "icon-group": (importIcon) => importIcon("@stratakit/icons/group").svgGroup,
  // "icon-gyroscope": undefined,
  "icon-hand-2": (importIcon) => importIcon("@stratakit/icons/hand").svgHand,
  "icon-help-hollow": (importIcon) =>
    importIcon("@stratakit/icons/help").svgHelp,
  "icon-help": (importIcon) => importIcon("@stratakit/icons/help").svgHelp,
  "icon-hierarchy-tree": (importIcon) =>
    importIcon("@stratakit/icons/hierarchy-tree").svgHierarchyTree,
  "icon-history": (importIcon) =>
    importIcon("@stratakit/icons/history").svgHistory,
  "icon-home": (importIcon) => importIcon("@stratakit/icons/home").svgHome,
  "icon-hourglass": (importIcon) =>
    importIcon("@stratakit/icons/hourglass").svgHourglass,
  // "icon-hub": undefined,
  "icon-i-beam": (importIcon) => importIcon("@stratakit/icons/i-beam").svgIBeam,
  "icon-image-2": (importIcon) => importIcon("@stratakit/icons/image").svgImage,
  "icon-image": (importIcon) => importIcon("@stratakit/icons/image").svgImage,
  "icon-imodel-2": (importIcon) =>
    importIcon("@stratakit/icons/imodel").svgIModel,
  "icon-imodel-hollow-2": (importIcon) =>
    importIcon("@stratakit/icons/imodel").svgIModel,
  "icon-imodel-hollow": (importIcon) =>
    importIcon("@stratakit/icons/imodel").svgIModel,
  // "icon-imodel-hub-sync": undefined,
  // "icon-imodel-hub": undefined,
  // "icon-imodel-schema": undefined,
  "icon-imodel": (importIcon) =>
    importIcon("@stratakit/icons/imodel").svgIModel,
  // "icon-imodeljs": undefined,
  "icon-import": (importIcon) =>
    importIcon("@stratakit/icons/import").svgImport,
  "icon-important-very": (importIcon) =>
    importIcon("@stratakit/icons/important-very").svgImportantVery,
  "icon-important": (importIcon) =>
    importIcon("@stratakit/icons/important").svgImportant,
  "icon-info-2": (importIcon) => importIcon("@stratakit/icons/info").svgInfo,
  "icon-info-hollow": (importIcon) =>
    importIcon("@stratakit/icons/info").svgInfo,
  "icon-info": (importIcon) => importIcon("@stratakit/icons/info").svgInfo,
  "icon-install": (importIcon) =>
    importIcon("@stratakit/icons/install").svgInstall,
  "icon-isolate": (importIcon) =>
    importIcon("@stratakit/icons/isolate").svgIsolate,
  "icon-issue-report": (importIcon) =>
    importIcon("@stratakit/icons/issue").svgIssue,
  // "icon-issue-resolution-add": undefined,
  // "icon-issue-resolution": undefined,
  // "icon-item": undefined,
  // "icon-itwin-mapping": undefined,
  "icon-label": (importIcon) => importIcon("@stratakit/icons/label").svgLabel,
  // "icon-layers-hide": undefined,
  // "icon-layers-isolate": undefined,
  "icon-layers": (importIcon) =>
    importIcon("@stratakit/icons/layers").svgLayers,
  "icon-lightbulb-2": (importIcon) =>
    importIcon("@stratakit/icons/lightbulb").svgLightbulb,
  "icon-lightbulb": (importIcon) =>
    importIcon("@stratakit/icons/lightbulb").svgLightbulb,
  "icon-line": (importIcon) => importIcon("@stratakit/icons/line").svgLine,
  "icon-link": (importIcon) => importIcon("@stratakit/icons/link").svgLink,
  "icon-list": (importIcon) => importIcon("@stratakit/icons/list").svgList,
  "icon-location": (importIcon) =>
    importIcon("@stratakit/icons/location").svgLocation,
  "icon-lock-unlocked": (importIcon) =>
    importIcon("@stratakit/icons/lock-unlocked").svgLockUnlocked,
  "icon-lock": (importIcon) => importIcon("@stratakit/icons/lock").svgLock,
  "icon-manager": (importIcon) =>
    importIcon("@stratakit/icons/manager").svgManager,
  "icon-map": (importIcon) => importIcon("@stratakit/icons/map").svgMap,
  // "icon-measure-2d-hide": undefined,
  // "icon-measure-2d-show": undefined,
  // "icon-measure-2d": undefined,
  // "icon-measure-3d": undefined,
  "icon-measure-angle": (importIcon) =>
    importIcon("@stratakit/icons/measure-angle").svgMeasureAngle,
  // "icon-measure-arc": undefined,
  "icon-measure-area": (importIcon) =>
    importIcon("@stratakit/icons/measure-area").svgMeasureArea,
  // "icon-measure-clear-3": undefined,
  // "icon-measure-clear": undefined,
  "icon-measure-distance": (importIcon) =>
    importIcon("@stratakit/icons/measure-distance").svgMeasureDistance,
  "icon-measure-location": (importIcon) =>
    importIcon("@stratakit/icons/measure-location").svgMeasureLocation,
  "icon-measure-perpendicular": (importIcon) =>
    importIcon("@stratakit/icons/measure-perpendicular-distance")
      .svgMeasurePerpendicularDistance,
  // "icon-measure-station": undefined,
  "icon-measure": (importIcon) =>
    importIcon("@stratakit/icons/measure").svgMeasure,
  "icon-media-controls-circular-pause": (importIcon) =>
    importIcon("@stratakit/icons/pause-circle").svgPauseCircle,
  "icon-media-controls-circular-play": (importIcon) =>
    importIcon("@stratakit/icons/play-circle").svgPlayCircle,
  "icon-media-controls-circular-stop": (importIcon) =>
    importIcon("@stratakit/icons/stop-circle").svgStopCircle,
  "icon-media-controls-fast-backward": (importIcon) =>
    importIcon("@stratakit/icons/fast-backward").svgFastBackward,
  "icon-media-controls-fast-forward": (importIcon) =>
    importIcon("@stratakit/icons/fast-forward").svgFastForward,
  "icon-media-controls-frame-backward": (importIcon) =>
    importIcon("@stratakit/icons/frame-backward").svgFrameBackward,
  "icon-media-controls-frame-forward": (importIcon) =>
    importIcon("@stratakit/icons/frame-forward").svgFrameForward,
  "icon-media-controls-go-to-end": (importIcon) =>
    importIcon("@stratakit/icons/go-to-end").svgGoToEnd,
  "icon-media-controls-go-to-start": (importIcon) =>
    importIcon("@stratakit/icons/go-to-start").svgGoToStart,
  "icon-media-controls-loop": (importIcon) =>
    importIcon("@stratakit/icons/loop").svgLoop,
  "icon-media-controls-pause": (importIcon) =>
    importIcon("@stratakit/icons/pause").svgPause,
  "icon-media-controls-play-backward": (importIcon) =>
    importIcon("@stratakit/icons/play-backward").svgPlayBackward,
  // "icon-media-controls-play-section": undefined,
  "icon-media-controls-play": (importIcon) =>
    importIcon("@stratakit/icons/play").svgPlay,
  "icon-media-controls-record": (importIcon) =>
    importIcon("@stratakit/icons/record").svgRecord,
  "icon-media-controls-stop": (importIcon) =>
    importIcon("@stratakit/icons/stop").svgStop,
  "icon-menu": (importIcon) => importIcon("@stratakit/icons/menu").svgMenu,
  "icon-merge": (importIcon) => importIcon("@stratakit/icons/merge").svgMerge,
  // "icon-mist": undefined,
  // "icon-model-hide": undefined,
  // "icon-model-isolate": undefined,
  "icon-model": (importIcon) => importIcon("@stratakit/icons/model").svgModel,
  // "icon-more-2": undefined,
  // "icon-more-circular-vertical": undefined,
  "icon-more-circular": (importIcon) =>
    importIcon("@stratakit/icons/more-horizontal-circle")
      .svgMoreHorizontalCircle,
  // "icon-more-vertical-2": undefined,
  "icon-more-vertical-circular": (importIcon) =>
    importIcon("@stratakit/icons/more-vertical-circle").svgMoreVerticalCircle,
  "icon-more-vertical": (importIcon) =>
    importIcon("@stratakit/icons/more-vertical").svgMoreVertical,
  "icon-more": (importIcon) =>
    importIcon("@stratakit/icons/more-horizontal").svgMoreHorizontal,
  "icon-mouse-click-left": (importIcon) =>
    importIcon("@stratakit/icons/mouse-click-left").svgMouseClickLeft,
  "icon-mouse-click-right": (importIcon) =>
    importIcon("@stratakit/icons/mouse-click-right").svgMouseClickRight,
  "icon-mouse-click-wheel": (importIcon) =>
    importIcon("@stratakit/icons/mouse-click-middle").svgMouseClickMiddle,
  "icon-mouse-click": (importIcon) =>
    importIcon("@stratakit/icons/mouse-click").svgMouseClick,
  // "icon-move-2": undefined,
  // "icon-move-below": undefined,
  "icon-move": (importIcon) => importIcon("@stratakit/icons/move").svgMove,
  "icon-network": (importIcon) =>
    importIcon("@stratakit/icons/network").svgNetwork,
  "icon-new": (importIcon) => importIcon("@stratakit/icons/new").svgNew,
  // "icon-node-query-connected": undefined,
  // "icon-node-query-disconnected": undefined,
  // "icon-node-query-downstream": undefined,
  // "icon-node-query-multi": undefined,
  // "icon-node-query-upstream": undefined,
  "icon-notification-settings": (importIcon) =>
    importIcon("@stratakit/icons/notifications-settings")
      .svgNotificationsSettings,
  "icon-notification": (importIcon) =>
    importIcon("@stratakit/icons/notifications").svgNotifications,
  "icon-paintbrush": (importIcon) =>
    importIcon("@stratakit/icons/paint-brush").svgPaintBrush,
  "icon-palette": (importIcon) =>
    importIcon("@stratakit/icons/palette").svgPalette,
  "icon-panorama-model": (importIcon) =>
    importIcon("@stratakit/icons/panorama-model").svgPanoramaModel,
  "icon-panorama": (importIcon) =>
    importIcon("@stratakit/icons/panorama").svgPanorama,
  "icon-perspective": (importIcon) =>
    importIcon("@stratakit/icons/perspective").svgPerspective,
  "icon-pin": (importIcon) => importIcon("@stratakit/icons/pin").svgPin,
  "icon-placeholder": (importIcon) =>
    importIcon("@stratakit/icons/placeholder").svgPlaceholder,
  // "icon-plan-drawing": undefined,
  // "icon-plan-floor": undefined,
  // "icon-plane": undefined,
  "icon-polygon": (importIcon) =>
    importIcon("@stratakit/icons/polygon").svgPolygon,
  "icon-print-preview": (importIcon) =>
    importIcon("@stratakit/icons/print-preview").svgPrintPreview,
  "icon-print-settings": (importIcon) =>
    importIcon("@stratakit/icons/print-settings").svgPrintSettings,
  "icon-print": (importIcon) => importIcon("@stratakit/icons/print").svgPrint,
  // "icon-probability-failure": undefined,
  // "icon-probability": undefined,
  "icon-process": (importIcon) =>
    importIcon("@stratakit/icons/process").svgProcess,
  // "icon-profile": undefined,
  // "icon-progress-backward-2": undefined,
  // "icon-progress-backward-3": undefined,
  "icon-progress-backward": (importIcon) =>
    importIcon("@stratakit/icons/chevron-left").svgChevronLeft,
  // "icon-progress-forward-2": undefined,
  // "icon-progress-forward-3": undefined,
  "icon-progress-forward": (importIcon) =>
    importIcon("@stratakit/icons/chevron-right").svgChevronRight,
  "icon-project-large": (importIcon) =>
    importIcon("@stratakit/icons/project").svgProject,
  "icon-properties-list": (importIcon) =>
    importIcon("@stratakit/icons/settings").svgSettings,
  "icon-properties": (importIcon) =>
    importIcon("@stratakit/icons/properties").svgProperties,
  "icon-puzzle": (importIcon) =>
    importIcon("@stratakit/icons/puzzle").svgPuzzle,
  // "icon-pw-project": undefined,
  // "icon-pw-workarea": undefined,
  // "icon-quantities": undefined,
  // "icon-rain-day": undefined,
  // "icon-rain-night": undefined,
  // "icon-rain-shower": undefined,
  // "icon-range": undefined,
  "icon-re-center": (importIcon) =>
    importIcon("@stratakit/icons/re-center").svgReCenter,
  "icon-read-only": (importIcon) =>
    importIcon("@stratakit/icons/read-only").svgReadOnly,
  "icon-records": (importIcon) =>
    importIcon("@stratakit/icons/records").svgRecords,
  "icon-rectangle": (importIcon) =>
    importIcon("@stratakit/icons/rectangle").svgRectangle,
  "icon-redo": (importIcon) => importIcon("@stratakit/icons/redo").svgRedo,
  "icon-refresh": (importIcon) =>
    importIcon("@stratakit/icons/refresh").svgRefresh,
  // "icon-remove-2": undefined,
  "icon-remove": (importIcon) =>
    importIcon("@stratakit/icons/dismiss").svgDismiss,
  "icon-rename": (importIcon) =>
    importIcon("@stratakit/icons/rename").svgRename,
  "icon-reorder": (importIcon) =>
    importIcon("@stratakit/icons/reorder").svgReorder,
  // "icon-repair": undefined,
  "icon-replace": (importIcon) =>
    importIcon("@stratakit/icons/replace").svgReplace,
  // "icon-reporting-alignment-data": undefined,
  "icon-reports": (importIcon) =>
    importIcon("@stratakit/icons/report").svgReport,
  "icon-road": (importIcon) => importIcon("@stratakit/icons/road").svgRoad,
  "icon-rotate-left": (importIcon) =>
    importIcon("@stratakit/icons/rotate-left").svgRotateLeft,
  "icon-rotate-right": (importIcon) =>
    importIcon("@stratakit/icons/rotate-right").svgRotateRight,
  // "icon-rotate": undefined,
  // "icon-rules": undefined,
  // "icon-safetibase": undefined,
  "icon-save-as": (importIcon) =>
    importIcon("@stratakit/icons/save-as").svgSaveAs,
  "icon-save-settings": (importIcon) =>
    importIcon("@stratakit/icons/save-settings").svgSaveSettings,
  // "icon-save-update": undefined,
  "icon-save": (importIcon) => importIcon("@stratakit/icons/save").svgSave,
  // "icon-saved-searches": undefined,
  // "icon-saved-view-annotate": undefined,
  // "icon-saved-view-chat": undefined,
  "icon-saved-view": (importIcon) =>
    importIcon("@stratakit/icons/saved-views").svgSavedViews,
  // "icon-saved-views-move": undefined,
  // "icon-scale-2": undefined,
  "icon-scale": (importIcon) =>
    importIcon("@stratakit/icons/object-scale").svgObjectScale,
  "icon-screenshare-stop": (importIcon) =>
    importIcon("@stratakit/icons/screenshare-stop").svgScreenshareStop,
  "icon-screenshare": (importIcon) =>
    importIcon("@stratakit/icons/screenshare").svgScreenshare,
  "icon-script-run": (importIcon) =>
    importIcon("@stratakit/icons/script-run").svgScriptRun,
  "icon-script-status": (importIcon) =>
    importIcon("@stratakit/icons/script-status").svgScriptStatus,
  "icon-script": (importIcon) =>
    importIcon("@stratakit/icons/script").svgScript,
  "icon-search": (importIcon) =>
    importIcon("@stratakit/icons/search").svgSearch,
  // "icon-section-clear": undefined,
  // "icon-section-element": undefined,
  // "icon-section-hide": undefined,
  // "icon-section-plane": undefined,
  // "icon-section-range": undefined,
  // "icon-section-shape": undefined,
  // "icon-section-show": undefined,
  // "icon-section-tool": undefined,
  "icon-select-box": (importIcon) =>
    importIcon("@stratakit/icons/rectangle").svgRectangle,
  "icon-select-line": (importIcon) =>
    importIcon("@stratakit/icons/line").svgLine,
  "icon-select-minus": (importIcon) =>
    importIcon("@stratakit/icons/minus-circle").svgMinusCircle,
  "icon-select-plus": (importIcon) =>
    importIcon("@stratakit/icons/add-square").svgAddSquare,
  "icon-select-single": (importIcon) =>
    importIcon("@stratakit/icons/cursor-click").svgCursorClick,
  "icon-selection-clear": (importIcon) =>
    importIcon("@stratakit/icons/selection-clear").svgSelectionClear,
  "icon-selection": (importIcon) =>
    importIcon("@stratakit/icons/selection").svgSelection,
  "icon-send": (importIcon) => importIcon("@stratakit/icons/send").svgSend,
  "icon-settings": (importIcon) =>
    importIcon("@stratakit/icons/settings").svgSettings,
  // "icon-shape": undefined,
  "icon-share": (importIcon) => importIcon("@stratakit/icons/share").svgShare,
  // "icon-shortcut-add": undefined,
  // "icon-sitemap": undefined,
  "icon-smartphone": (importIcon) =>
    importIcon("@stratakit/icons/smartphone").svgSmartphone,
  "icon-smiley-happy-2": (importIcon) =>
    importIcon("@stratakit/icons/smiley-happy").svgSmileyHappy,
  "icon-smiley-happy-very-2": (importIcon) =>
    importIcon("@stratakit/icons/smiley-very-happy").svgSmileyVeryHappy,
  "icon-smiley-happy-very": (importIcon) =>
    importIcon("@stratakit/icons/smiley-very-happy").svgSmileyVeryHappy,
  "icon-smiley-happy": (importIcon) =>
    importIcon("@stratakit/icons/smiley-happy").svgSmileyHappy,
  "icon-smiley-neutral-2": (importIcon) =>
    importIcon("@stratakit/icons/smiley-neutral").svgSmileyNeutral,
  "icon-smiley-neutral": (importIcon) =>
    importIcon("@stratakit/icons/smiley-neutral").svgSmileyNeutral,
  "icon-smiley-sad-2": (importIcon) =>
    importIcon("@stratakit/icons/smiley-sad").svgSmileySad,
  "icon-smiley-sad-very-2": (importIcon) =>
    importIcon("@stratakit/icons/smiley-very-sad").svgSmileyVerySad,
  "icon-smiley-sad-very": (importIcon) =>
    importIcon("@stratakit/icons/smiley-very-sad").svgSmileyVerySad,
  "icon-smiley-sad": (importIcon) =>
    importIcon("@stratakit/icons/smiley-sad").svgSmileySad,
  "icon-snaps-bisector": (importIcon) =>
    importIcon("@stratakit/icons/snap-bisector").svgSnapBisector,
  "icon-snaps-center": (importIcon) =>
    importIcon("@stratakit/icons/snap-center").svgSnapCenter,
  "icon-snaps-intersection": (importIcon) =>
    importIcon("@stratakit/icons/snap-intersection").svgSnapIntersection,
  "icon-snaps-midpoint": (importIcon) =>
    importIcon("@stratakit/icons/snap-midpoint").svgSnapMidpoint,
  // "icon-snaps-multione": undefined,
  // "icon-snaps-multithree": undefined,
  // "icon-snaps-multitwo": undefined,
  "icon-snaps-nearest": (importIcon) =>
    importIcon("@stratakit/icons/snap-nearest").svgSnapNearest,
  "icon-snaps-origin": (importIcon) =>
    importIcon("@stratakit/icons/snap-origin").svgSnapOrigin,
  "icon-snaps": (importIcon) =>
    importIcon("@stratakit/icons/snap-keypoint").svgSnapKeypoint,
  "icon-snow": (importIcon) =>
    importIcon("@stratakit/icons/snowflake").svgSnowflake,
  "icon-sort-down": (importIcon) =>
    importIcon("@stratakit/icons/sort-ascending").svgSortAscending,
  "icon-sort-menu": (importIcon) =>
    importIcon("@stratakit/icons/sorting").svgSorting,
  "icon-sort-up": (importIcon) =>
    importIcon("@stratakit/icons/sort-descending").svgSortDescending,
  // "icon-spaces": undefined,
  // "icon-spatial-view-apply": undefined,
  "icon-spin": (importIcon) => importIcon("@stratakit/icons/spin").svgSpin,
  "icon-star-hollow": (importIcon) =>
    importIcon("@stratakit/icons/star").svgStar,
  "icon-star": (importIcon) => importIcon("@stratakit/icons/star").svgStar,
  "icon-status-draft": (importIcon) =>
    importIcon("@stratakit/icons/status-draft").svgStatusDraft,
  "icon-status-error-hollow": (importIcon) =>
    importIcon("@stratakit/icons/status-error").svgStatusError,
  "icon-status-error": (importIcon) =>
    importIcon("@stratakit/icons/status-error").svgStatusError,
  // "icon-status-pass-hollow": undefined,
  // "icon-status-pass": undefined,
  "icon-status-pending-hollow": (importIcon) =>
    importIcon("@stratakit/icons/status-pending").svgStatusPending,
  "icon-status-pending": (importIcon) =>
    importIcon("@stratakit/icons/status-pending").svgStatusPending,
  "icon-status-rejected-hollow": (importIcon) =>
    importIcon("@stratakit/icons/status-rejected").svgStatusRejected,
  "icon-status-rejected": (importIcon) =>
    importIcon("@stratakit/icons/status-rejected").svgStatusRejected,
  "icon-status-running": (importIcon) =>
    importIcon("@stratakit/icons/status-running").svgStatusRunning,
  "icon-status-success-hollow": (importIcon) =>
    importIcon("@stratakit/icons/status-success").svgStatusSuccess,
  "icon-status-success": (importIcon) =>
    importIcon("@stratakit/icons/status-success").svgStatusSuccess,
  "icon-status-update": (importIcon) =>
    importIcon("@stratakit/icons/status-update").svgStatusUpdate,
  "icon-status-warning": (importIcon) =>
    importIcon("@stratakit/icons/status-warning").svgStatusWarning,
  // "icon-sunrise": undefined,
  // "icon-sunset": undefined,
  // "icon-symbol": undefined,
  "icon-sync-disabled": (importIcon) =>
    importIcon("@stratakit/icons/cloud-offline").svgCloudOffline,
  "icon-sync": (importIcon) => importIcon("@stratakit/icons/loop").svgLoop,
  "icon-table-2": (importIcon) => importIcon("@stratakit/icons/table").svgTable,
  "icon-table-of-contents": (importIcon) =>
    importIcon("@stratakit/icons/table-of-contents").svgTableOfContents,
  "icon-table": (importIcon) => importIcon("@stratakit/icons/table").svgTable,
  "icon-tag-2": (importIcon) => importIcon("@stratakit/icons/tag").svgTag,
  "icon-technical-preview-badge-bw": (importIcon) =>
    importIcon("@stratakit/icons/technical-preview-badge")
      .svgTechnicalPreviewBadge,
  "icon-technical-preview-badge": (importIcon) =>
    importIcon("@stratakit/icons/technical-preview-badge")
      .svgTechnicalPreviewBadge,
  "icon-technical-preview-bw": (importIcon) =>
    importIcon("@stratakit/icons/technical-preview").svgTechnicalPreview,
  "icon-technical-preview-mini-bw": (importIcon) =>
    importIcon("@stratakit/icons/technical-preview").svgTechnicalPreview,
  "icon-technical-preview-mini": (importIcon) =>
    importIcon("@stratakit/icons/technical-preview").svgTechnicalPreview,
  "icon-technical-preview": (importIcon) =>
    importIcon("@stratakit/icons/technical-preview").svgTechnicalPreview,
  // "icon-test": undefined,
  "icon-text-align-text-align-center": (importIcon) =>
    importIcon("@stratakit/icons/text-align-center").svgTextAlignCenter,
  "icon-text-align-text-align-justify": (importIcon) =>
    importIcon("@stratakit/icons/text-align-justify").svgTextAlignJustify,
  "icon-text-align-text-align-left": (importIcon) =>
    importIcon("@stratakit/icons/text-align-left").svgTextAlignLeft,
  "icon-text-align-text-align-right": (importIcon) =>
    importIcon("@stratakit/icons/text-align-right").svgTextAlignRight,
  // "icon-text-medium": undefined,
  // "icon-text-small": undefined,
  "icon-text": (importIcon) => importIcon("@stratakit/icons/text").svgText,
  // "icon-three-points-circular-arc": undefined,
  // "icon-thumbnails": undefined,
  "icon-thunderstorm": (importIcon) =>
    importIcon("@stratakit/icons/cloud-lightning").svgCloudLightning,
  "icon-timeline": (importIcon) =>
    importIcon("@stratakit/icons/timeline").svgTimeline,
  "icon-timer": (importIcon) => importIcon("@stratakit/icons/timer").svgTimer,
  // "icon-tools": undefined,
  // "icon-tree": undefined,
  "icon-underline": (importIcon) =>
    importIcon("@stratakit/icons/font-underline").svgFontUnderline,
  "icon-undo": (importIcon) => importIcon("@stratakit/icons/undo").svgUndo,
  "icon-unlink": (importIcon) =>
    importIcon("@stratakit/icons/unlink").svgUnlink,
  "icon-upgrade": (importIcon) =>
    importIcon("@stratakit/icons/update").svgUpdate,
  "icon-upload-to-cloud": (importIcon) =>
    importIcon("@stratakit/icons/cloud-upload").svgCloudUpload,
  "icon-upload": (importIcon) =>
    importIcon("@stratakit/icons/upload").svgUpload,
  "icon-user-add": (importIcon) =>
    importIcon("@stratakit/icons/user-add").svgUserAdd,
  "icon-user": (importIcon) => importIcon("@stratakit/icons/user").svgUser,
  "icon-users": (importIcon) => importIcon("@stratakit/icons/users").svgUsers,
  "icon-validate": (importIcon) =>
    importIcon("@stratakit/icons/validate").svgValidate,
  // "icon-versions": undefined,
  "icon-vertex": (importIcon) =>
    importIcon("@stratakit/icons/vertex").svgVertex,
  // "icon-view-layouts": undefined,
  // "icon-view-navigation": undefined,
  "icon-visibility-half": (importIcon) =>
    importIcon("@stratakit/icons/visibility-partial").svgVisibilityPartial,
  "icon-visibility-hide-2": (importIcon) =>
    importIcon("@stratakit/icons/visibility-hide").svgVisibilityHide,
  "icon-visibility-hide": (importIcon) =>
    importIcon("@stratakit/icons/visibility-hide").svgVisibilityHide,
  "icon-visibility-invert": (importIcon) =>
    importIcon("@stratakit/icons/visibility-invert").svgVisibilityInvert,
  // "icon-visibility-semi-transparent": undefined,
  "icon-visibility": (importIcon) =>
    importIcon("@stratakit/icons/visibility-show").svgVisibilityShow,
  "icon-walk": (importIcon) => importIcon("@stratakit/icons/walk").svgWalk,
  "icon-wifi-disabled": (importIcon) =>
    importIcon("@stratakit/icons/wifi-disabled").svgWifiDisabled,
  "icon-wifi": (importIcon) => importIcon("@stratakit/icons/wifi").svgWifi,
  "icon-window-add": (importIcon) =>
    importIcon("@stratakit/icons/window-add").svgWindowAdd,
  "icon-window-area": (importIcon) =>
    importIcon("@stratakit/icons/window-area").svgWindowArea,
  "icon-window-backward": (importIcon) =>
    importIcon("@stratakit/icons/window-back").svgWindowBack,
  "icon-window-collapse-2": (importIcon) =>
    importIcon("@stratakit/icons/window-collapse").svgWindowCollapse,
  "icon-window-collapse": (importIcon) =>
    importIcon("@stratakit/icons/window-collapse").svgWindowCollapse,
  "icon-window-expand": (importIcon) =>
    importIcon("@stratakit/icons/window-expand").svgWindowExpand,
  "icon-window-forward": (importIcon) =>
    importIcon("@stratakit/icons/window-forward").svgWindowForward,
  "icon-window-full-screen": (importIcon) =>
    importIcon("@stratakit/icons/window-expand").svgWindowExpand,
  "icon-window-maximize": (importIcon) =>
    importIcon("@stratakit/icons/window-maximize").svgWindowMaximize,
  "icon-window-minimize": (importIcon) =>
    importIcon("@stratakit/icons/window-minimize").svgWindowMinimize,
  // "icon-window-new": undefined,
  "icon-window-settings": (importIcon) =>
    importIcon("@stratakit/icons/window-settings").svgWindowSettings,
  "icon-window-split-horizontal": (importIcon) =>
    importIcon("@stratakit/icons/window-split-horizontal")
      .svgWindowSplitHorizontal,
  "icon-window-split-vertical": (importIcon) =>
    importIcon("@stratakit/icons/window-split-vertical").svgWindowSplitVertical,
  "icon-window": (importIcon) =>
    importIcon("@stratakit/icons/window").svgWindow,
  "icon-windows": (importIcon) =>
    importIcon("@stratakit/icons/brand-windows").svgBrandWindows,
  // "icon-xray-view": undefined,
  // "icon-zoom-in-2": undefined,
  "icon-zoom-in": (importIcon) =>
    importIcon("@stratakit/icons/zoom-in-magnifier").svgZoomInMagnifier,
  // "icon-zoom-out-2": undefined,
  "icon-zoom-out": (importIcon) =>
    importIcon("@stratakit/icons/zoom-out-magnifier").svgZoomOutMagnifier,
  // "icon-zoom": undefined,
};
