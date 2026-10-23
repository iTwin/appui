/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * This subpath export is required to conditionally import StrataKit packages.
 * Remove this with next major version and replace with regular imports.
 *
 * Ensure, that the StrataKit types are not exposed in case the `skipLibCheck: false` option is used:
 * StrataKit package imports should not be used in .d.ts files.
 */
import type * as React from "react";
import { StrataKitSymbol } from "./appui-react/preview/PreviewFeatures.js";
import type { StrataKitIconModules } from "@itwin/core-react/internal";

// cSpell:disable

/* eslint-disable @typescript-eslint/no-restricted-imports */

import { Icon } from "@stratakit/mui";
import { PortalContext } from "@stratakit/foundations";
import { RootContext } from "@stratakit/foundations/secret-internals";
import { svg2D } from "@stratakit/icons/2d";
import { svg3D } from "@stratakit/icons/3d";
import { svgActivity } from "@stratakit/icons/activity";
import { svgAdd } from "@stratakit/icons/add";
import { svgAddCircle } from "@stratakit/icons/add-circle";
import { svgAddSquare } from "@stratakit/icons/add-square";
import { svgAirplane } from "@stratakit/icons/airplane";
import { svgAlignBottom } from "@stratakit/icons/align-bottom";
import { svgAlignCenterHorizontal } from "@stratakit/icons/align-center-horizontal";
import { svgAlignCenterVertical } from "@stratakit/icons/align-center-vertical";
import { svgAlignLeft } from "@stratakit/icons/align-left";
import { svgAlignRight } from "@stratakit/icons/align-right";
import { svgAlignTop } from "@stratakit/icons/align-top";
import { svgAnnotation } from "@stratakit/icons/annotation";
import { svgArchive } from "@stratakit/icons/archive";
import { svgArrowDown } from "@stratakit/icons/arrow-down";
import { svgArrowLeft } from "@stratakit/icons/arrow-left";
import { svgArrowRight } from "@stratakit/icons/arrow-right";
import { svgArrowUp } from "@stratakit/icons/arrow-up";
import { svgAttach } from "@stratakit/icons/attach";
import { svgAutomagic } from "@stratakit/icons/automagic";
import { svgBasket } from "@stratakit/icons/basket";
import { svgBolt } from "@stratakit/icons/bolt";
import { svgBookmark } from "@stratakit/icons/bookmark";
import { svgBrandBentleySystems } from "@stratakit/icons/brand-bentley-systems";
import { svgBrandWindows } from "@stratakit/icons/brand-windows";
import { svgCalendar } from "@stratakit/icons/calendar";
import { svgCamera } from "@stratakit/icons/camera";
import { svgCameraVideo } from "@stratakit/icons/camera-video";
import { svgCameraVideoDisabled } from "@stratakit/icons/camera-video-disabled";
import { svgCaretDown } from "@stratakit/icons/caret-down";
import { svgCaretLeft } from "@stratakit/icons/caret-left";
import { svgCaretRight } from "@stratakit/icons/caret-right";
import { svgCaretUp } from "@stratakit/icons/caret-up";
import { svgChartBar } from "@stratakit/icons/chart-bar";
import { svgChartLine } from "@stratakit/icons/chart-line";
import { svgChartPie } from "@stratakit/icons/chart-pie";
import { svgChat } from "@stratakit/icons/chat";
import { svgCheckboxDeselect } from "@stratakit/icons/checkbox-deselect";
import { svgCheckboxSelect } from "@stratakit/icons/checkbox-select";
import { svgCheckmark } from "@stratakit/icons/checkmark";
import { svgChevronDown } from "@stratakit/icons/chevron-down";
import { svgChevronLeft } from "@stratakit/icons/chevron-left";
import { svgChevronRight } from "@stratakit/icons/chevron-right";
import { svgChevronUp } from "@stratakit/icons/chevron-up";
import { svgCircle } from "@stratakit/icons/circle";
import { svgClipboard } from "@stratakit/icons/clipboard";
import { svgClock } from "@stratakit/icons/clock";
import { svgCloud } from "@stratakit/icons/cloud";
import { svgCloudDownload } from "@stratakit/icons/cloud-download";
import { svgCloudLightning } from "@stratakit/icons/cloud-lightning";
import { svgCloudOffline } from "@stratakit/icons/cloud-offline";
import { svgCloudUpload } from "@stratakit/icons/cloud-upload";
import { svgCollapseRows } from "@stratakit/icons/collapse-rows";
import { svgCollapseRowsAll } from "@stratakit/icons/collapse-rows-all";
import { svgCompare } from "@stratakit/icons/compare";
import { svgComputer } from "@stratakit/icons/computer";
import { svgCrop } from "@stratakit/icons/crop";
import { svgCrossSection } from "@stratakit/icons/cross-section";
import { svgCursor } from "@stratakit/icons/cursor";
import { svgCursorClick } from "@stratakit/icons/cursor-click";
import { svgDashboard } from "@stratakit/icons/dashboard";
import { svgDatabase } from "@stratakit/icons/database";
import { svgDelete } from "@stratakit/icons/delete";
import { svgDeliverables } from "@stratakit/icons/deliverables";
import { svgDetails } from "@stratakit/icons/details";
import { svgDeveloper } from "@stratakit/icons/developer";
import { svgDisconnect } from "@stratakit/icons/disconnect";
import { svgDismiss } from "@stratakit/icons/dismiss";
import { svgDismissCircle } from "@stratakit/icons/dismiss-circle";
import { svgDistributeCenterHorizontal } from "@stratakit/icons/distribute-center-horizontal";
import { svgDistributeCenterVertical } from "@stratakit/icons/distribute-center-vertical";
import { svgDistributeLeft } from "@stratakit/icons/distribute-left";
import { svgDistributeRight } from "@stratakit/icons/distribute-right";
import { svgDistributeTop } from "@stratakit/icons/distribute-top";
import { svgDockBottom } from "@stratakit/icons/dock-bottom";
import { svgDockLeft } from "@stratakit/icons/dock-left";
import { svgDockRight } from "@stratakit/icons/dock-right";
import { svgDockTop } from "@stratakit/icons/dock-top";
import { svgDocument } from "@stratakit/icons/document";
import { svgDocumentBlank } from "@stratakit/icons/document-blank";
import { svgDocumentLocked } from "@stratakit/icons/document-locked";
import { svgDocumentPDF } from "@stratakit/icons/document-pdf";
import { svgDocumentReference } from "@stratakit/icons/document-reference";
import { svgDocumentation } from "@stratakit/icons/documentation";
import { svgDownload } from "@stratakit/icons/download";
import { svgDragHandleVerticalLarge } from "@stratakit/icons/drag-handle-vertical";
import { svgDraw } from "@stratakit/icons/draw";
import { svgDuplicate } from "@stratakit/icons/duplicate";
import { svgEdit } from "@stratakit/icons/edit";
import { svgEditAll } from "@stratakit/icons/edit-all";
import { svgEllipse } from "@stratakit/icons/ellipse";
import { svgEmail } from "@stratakit/icons/email";
import { svgEmailAt } from "@stratakit/icons/email-at";
import { svgExit } from "@stratakit/icons/exit";
import { svgExpandRows } from "@stratakit/icons/expand-rows";
import { svgExpandRowsAll } from "@stratakit/icons/expand-rows-all";
import { svgExport } from "@stratakit/icons/export";
import { svgEyedropper } from "@stratakit/icons/eyedropper";
import { svgEyedropperDrop } from "@stratakit/icons/eyedropper-drop";
import { svgEyedropperFilled } from "@stratakit/icons/eyedropper-filled";
import { svgFastBackward } from "@stratakit/icons/fast-backward";
import { svgFastForward } from "@stratakit/icons/fast-forward";
import { svgFeedback } from "@stratakit/icons/feedback";
import { svgFilter } from "@stratakit/icons/filter";
import { svgFind } from "@stratakit/icons/find";
import { svgFireExtinguisher } from "@stratakit/icons/fire-extinguisher";
import { svgFitToView } from "@stratakit/icons/fit-to-view";
import { svgFlag } from "@stratakit/icons/flag";
import { svgFolder } from "@stratakit/icons/folder";
import { svgFolderAdd } from "@stratakit/icons/folder-add";
import { svgFolderChevronDown } from "@stratakit/icons/folder-chevron-down";
import { svgFolderChevronUp } from "@stratakit/icons/folder-chevron-up";
import { svgFolderExport } from "@stratakit/icons/folder-export";
import { svgFolderImport } from "@stratakit/icons/folder-import";
import { svgFolderLock } from "@stratakit/icons/folder-lock";
import { svgFolderOpen } from "@stratakit/icons/folder-open";
import { svgFolderRemove } from "@stratakit/icons/folder-remove";
import { svgFolderShortcut } from "@stratakit/icons/folder-shortcut";
import { svgFontBold } from "@stratakit/icons/font-bold";
import { svgFontColor } from "@stratakit/icons/font-color";
import { svgFontItalic } from "@stratakit/icons/font-italic";
import { svgFontSize } from "@stratakit/icons/font-size";
import { svgFontUnderline } from "@stratakit/icons/font-underline";
import { svgFrameBackward } from "@stratakit/icons/frame-backward";
import { svgFrameForward } from "@stratakit/icons/frame-forward";
import { svgFunction } from "@stratakit/icons/function";
import { svgGestureOneFingerDoubleTap } from "@stratakit/icons/gesture-one-finger-double-tap";
import { svgGestureOneFingerDrag } from "@stratakit/icons/gesture-one-finger-drag";
import { svgGestureOneFingerTap } from "@stratakit/icons/gesture-one-finger-tap";
import { svgGesturePinch } from "@stratakit/icons/gesture-pinch";
import { svgGestureTouch } from "@stratakit/icons/gesture-touch";
import { svgGestureTwoFinger } from "@stratakit/icons/gesture-two-finger";
import { svgGestureTwoFingerDrag } from "@stratakit/icons/gesture-two-finger-drag";
import { svgGestureTwoFingerTap } from "@stratakit/icons/gesture-two-finger-tap";
import { svgGlobe } from "@stratakit/icons/globe";
import { svgGoToEnd } from "@stratakit/icons/go-to-end";
import { svgGoToStart } from "@stratakit/icons/go-to-start";
import { svgGraphScatterChart } from "@stratakit/icons/graph-scatter-chart";
import { svgGroup } from "@stratakit/icons/group";
import { svgHand } from "@stratakit/icons/hand";
import { svgHelp, svgHelpLarge } from "@stratakit/icons/help";
import { svgHierarchyTree } from "@stratakit/icons/hierarchy-tree";
import { svgHistory } from "@stratakit/icons/history";
import { svgHome } from "@stratakit/icons/home";
import { svgHourglass } from "@stratakit/icons/hourglass";
import { svgIBeam } from "@stratakit/icons/i-beam";
import { svgImage } from "@stratakit/icons/image";
import { svgIModel } from "@stratakit/icons/imodel";
import { svgImport } from "@stratakit/icons/import";
import { svgImportant } from "@stratakit/icons/important";
import { svgImportantVery } from "@stratakit/icons/important-very";
import { svgInfo, svgInfoLarge } from "@stratakit/icons/info";
import { svgInstall } from "@stratakit/icons/install";
import { svgIsolate } from "@stratakit/icons/isolate";
import { svgIssue } from "@stratakit/icons/issue";
import { svgITwin } from "@stratakit/icons/itwin";
import { svgKeyboard } from "@stratakit/icons/keyboard";
import { svgLabel } from "@stratakit/icons/label";
import { svgLayers } from "@stratakit/icons/layers";
import { svgLightbulb } from "@stratakit/icons/lightbulb";
import { svgLine } from "@stratakit/icons/line";
import { svgLink } from "@stratakit/icons/link";
import { svgList } from "@stratakit/icons/list";
import { svgLocation } from "@stratakit/icons/location";
import { svgLock } from "@stratakit/icons/lock";
import { svgLockUnlocked } from "@stratakit/icons/lock-unlocked";
import { svgLoop } from "@stratakit/icons/loop";
import { svgManager } from "@stratakit/icons/manager";
import { svgMap } from "@stratakit/icons/map";
import { svgMeasure } from "@stratakit/icons/measure";
import { svgMeasureAngle } from "@stratakit/icons/measure-angle";
import { svgMeasureArea } from "@stratakit/icons/measure-area";
import { svgMeasureDistance } from "@stratakit/icons/measure-distance";
import { svgMeasureLocation } from "@stratakit/icons/measure-location";
import { svgMeasurePerpendicularDistance } from "@stratakit/icons/measure-perpendicular-distance";
import { svgMenu } from "@stratakit/icons/menu";
import { svgMerge } from "@stratakit/icons/merge";
import { svgMinusCircle } from "@stratakit/icons/minus-circle";
import { svgModel } from "@stratakit/icons/model";
import { svgMoon } from "@stratakit/icons/moon";
import { svgMoreHorizontal } from "@stratakit/icons/more-horizontal";
import { svgMoreHorizontalCircle } from "@stratakit/icons/more-horizontal-circle";
import { svgMoreVertical } from "@stratakit/icons/more-vertical";
import { svgMoreVerticalCircle } from "@stratakit/icons/more-vertical-circle";
import { svgMouseClick } from "@stratakit/icons/mouse-click";
import { svgMouseClickLeft } from "@stratakit/icons/mouse-click-left";
import { svgMouseClickMiddle } from "@stratakit/icons/mouse-click-middle";
import { svgMouseClickRight } from "@stratakit/icons/mouse-click-right";
import { svgMove } from "@stratakit/icons/move";
import { svgNetwork } from "@stratakit/icons/network";
import { svgNew } from "@stratakit/icons/new";
import { svgNotifications } from "@stratakit/icons/notifications";
import { svgNotificationsSettings } from "@stratakit/icons/notifications-settings";
import { svgObjectEdit } from "@stratakit/icons/object-edit";
import { svgObjectScale } from "@stratakit/icons/object-scale";
import { svgPaintBrush } from "@stratakit/icons/paint-brush";
import { svgPalette } from "@stratakit/icons/palette";
import { svgPanorama } from "@stratakit/icons/panorama";
import { svgPanoramaModel } from "@stratakit/icons/panorama-model";
import { svgPause } from "@stratakit/icons/pause";
import { svgPauseCircle } from "@stratakit/icons/pause-circle";
import { svgPerspective } from "@stratakit/icons/perspective";
import { svgPin } from "@stratakit/icons/pin";
import { svgPinUnpin } from "@stratakit/icons/pin-unpin";
import { svgPlaceholder } from "@stratakit/icons/placeholder";
import { svgPlay } from "@stratakit/icons/play";
import { svgPlayBackward } from "@stratakit/icons/play-backward";
import { svgPlayCircle } from "@stratakit/icons/play-circle";
import { svgPolygon } from "@stratakit/icons/polygon";
import { svgPrint } from "@stratakit/icons/print";
import { svgPrintPreview } from "@stratakit/icons/print-preview";
import { svgPrintSettings } from "@stratakit/icons/print-settings";
import { svgProcess } from "@stratakit/icons/process";
import { svgProject } from "@stratakit/icons/project";
import { svgProperties } from "@stratakit/icons/properties";
import { svgPuzzle } from "@stratakit/icons/puzzle";
import { svgReCenter } from "@stratakit/icons/re-center";
import { svgReadOnly } from "@stratakit/icons/read-only";
import { svgRecord } from "@stratakit/icons/record";
import { svgRecords } from "@stratakit/icons/records";
import { svgRectangle } from "@stratakit/icons/rectangle";
import { svgRedo } from "@stratakit/icons/redo";
import { svgRefresh } from "@stratakit/icons/refresh";
import { svgRename } from "@stratakit/icons/rename";
import { svgReorder } from "@stratakit/icons/reorder";
import { svgReplace } from "@stratakit/icons/replace";
import { svgReport } from "@stratakit/icons/report";
import { svgRoad } from "@stratakit/icons/road";
import { svgRotateLeft } from "@stratakit/icons/rotate-left";
import { svgRotatePoint } from "@stratakit/icons/rotate-point";
import { svgRotateRight } from "@stratakit/icons/rotate-right";
import { svgRule } from "@stratakit/icons/rule";
import { svgSave } from "@stratakit/icons/save";
import { svgSaveAs } from "@stratakit/icons/save-as";
import { svgSaveSettings } from "@stratakit/icons/save-settings";
import { svgSavedViews } from "@stratakit/icons/saved-views";
import { svgScreenshare } from "@stratakit/icons/screenshare";
import { svgScreenshareStop } from "@stratakit/icons/screenshare-stop";
import { svgScript } from "@stratakit/icons/script";
import { svgScriptRun } from "@stratakit/icons/script-run";
import { svgScriptStatus } from "@stratakit/icons/script-status";
import { svgSearch } from "@stratakit/icons/search";
import { svgSelection } from "@stratakit/icons/selection";
import { svgSelectionClear } from "@stratakit/icons/selection-clear";
import { svgSend } from "@stratakit/icons/send";
import { svgSettings } from "@stratakit/icons/settings";
import { svgShare } from "@stratakit/icons/share";
import { svgSmartphone } from "@stratakit/icons/smartphone";
import { svgSmileyHappy } from "@stratakit/icons/smiley-happy";
import { svgSmileyNeutral } from "@stratakit/icons/smiley-neutral";
import { svgSmileySad } from "@stratakit/icons/smiley-sad";
import { svgSmileyVeryHappy } from "@stratakit/icons/smiley-very-happy";
import { svgSmileyVerySad } from "@stratakit/icons/smiley-very-sad";
import { svgSnapBisector } from "@stratakit/icons/snap-bisector";
import { svgSnapCenter } from "@stratakit/icons/snap-center";
import { svgSnapIntersection } from "@stratakit/icons/snap-intersection";
import { svgSnapKeypoint } from "@stratakit/icons/snap-keypoint";
import { svgSnapMidpoint } from "@stratakit/icons/snap-midpoint";
import { svgSnapNearest } from "@stratakit/icons/snap-nearest";
import { svgSnapOrigin } from "@stratakit/icons/snap-origin";
import { svgSnapPerpendicular } from "@stratakit/icons/snap-perpendicular";
import { svgSnapTangent } from "@stratakit/icons/snap-tangent";
import { svgSnowflake } from "@stratakit/icons/snowflake";
import { svgSortAscending } from "@stratakit/icons/sort-ascending";
import { svgSortDescending } from "@stratakit/icons/sort-descending";
import { svgSorting } from "@stratakit/icons/sorting";
import { svgSpin } from "@stratakit/icons/spin";
import { svgStar } from "@stratakit/icons/star";
import { svgStatusDraft } from "@stratakit/icons/status-draft";
import {
  svgStatusError,
  svgStatusErrorLarge,
} from "@stratakit/icons/status-error";
import { svgStatusPending } from "@stratakit/icons/status-pending";
import {
  svgStatusRejected,
  svgStatusRejectedLarge,
} from "@stratakit/icons/status-rejected";
import { svgStatusRunning } from "@stratakit/icons/status-running";
import {
  svgStatusSuccess,
  svgStatusSuccessLarge,
} from "@stratakit/icons/status-success";
import { svgStatusUpdate } from "@stratakit/icons/status-update";
import {
  svgStatusWarning,
  svgStatusWarningLarge,
} from "@stratakit/icons/status-warning";
import { svgStop } from "@stratakit/icons/stop";
import { svgStopCircle } from "@stratakit/icons/stop-circle";
import { svgSun } from "@stratakit/icons/sun";
import { svgTable } from "@stratakit/icons/table";
import { svgTableOfContents } from "@stratakit/icons/table-of-contents";
import { svgTag } from "@stratakit/icons/tag";
import { svgTechnicalPreview } from "@stratakit/icons/technical-preview";
import { svgTechnicalPreviewBadge } from "@stratakit/icons/technical-preview-badge";
import { svgText } from "@stratakit/icons/text";
import { svgTextAlignCenter } from "@stratakit/icons/text-align-center";
import { svgTextAlignJustify } from "@stratakit/icons/text-align-justify";
import { svgTextAlignLeft } from "@stratakit/icons/text-align-left";
import { svgTextAlignRight } from "@stratakit/icons/text-align-right";
import { svgTimeline } from "@stratakit/icons/timeline";
import { svgTimer } from "@stratakit/icons/timer";
import { svgUndo } from "@stratakit/icons/undo";
import { svgUngroup } from "@stratakit/icons/ungroup";
import { svgUnlink } from "@stratakit/icons/unlink";
import { svgUpdate } from "@stratakit/icons/update";
import { svgUpload } from "@stratakit/icons/upload";
import { svgUser } from "@stratakit/icons/user";
import { svgUserAdd } from "@stratakit/icons/user-add";
import { svgUserAway } from "@stratakit/icons/user-away";
import { svgUsers } from "@stratakit/icons/users";
import { svgValidate } from "@stratakit/icons/validate";
import { svgVertex } from "@stratakit/icons/vertex";
import { svgVisibilityHide } from "@stratakit/icons/visibility-hide";
import { svgVisibilityInvert } from "@stratakit/icons/visibility-invert";
import { svgVisibilityPartial } from "@stratakit/icons/visibility-partial";
import { svgVisibilityShow } from "@stratakit/icons/visibility-show";
import { svgWalk } from "@stratakit/icons/walk";
import { svgWifi } from "@stratakit/icons/wifi";
import { svgWifiDisabled } from "@stratakit/icons/wifi-disabled";
import { svgWindow } from "@stratakit/icons/window";
import { svgWindowAdd } from "@stratakit/icons/window-add";
import { svgWindowArea } from "@stratakit/icons/window-area";
import { svgWindowBack } from "@stratakit/icons/window-back";
import { svgWindowCollapse } from "@stratakit/icons/window-collapse";
import { svgWindowExpand } from "@stratakit/icons/window-expand";
import { svgWindowForward } from "@stratakit/icons/window-forward";
import { svgWindowMaximize } from "@stratakit/icons/window-maximize";
import { svgWindowMinimize } from "@stratakit/icons/window-minimize";
import { svgWindowPopout } from "@stratakit/icons/window-popout";
import { svgWindowSettings } from "@stratakit/icons/window-settings";
import { svgWindowSplitHorizontal } from "@stratakit/icons/window-split-horizontal";
import { svgWindowSplitVertical } from "@stratakit/icons/window-split-vertical";
import { svgZoomInMagnifier } from "@stratakit/icons/zoom-in-magnifier";
import { svgZoomOutMagnifier } from "@stratakit/icons/zoom-out-magnifier";

/* eslint-enable @typescript-eslint/no-restricted-imports */

/** @public */
export function enable() {
  const modules = {
    "@stratakit/mui": {
      Icon: Icon as React.ComponentType<IconProps>,
    },
    "@stratakit/foundations": {
      PortalContext,
    },
    "@stratakit/foundations/secret-internals": {
      RootContext: RootContext as React.Context<RootContextValue>,
    },
    "@stratakit/icons/2d": { svg2D },
    "@stratakit/icons/3d": { svg3D },
    "@stratakit/icons/activity": { svgActivity },
    "@stratakit/icons/add": { svgAdd },
    "@stratakit/icons/add-circle": { svgAddCircle },
    "@stratakit/icons/add-square": { svgAddSquare },
    "@stratakit/icons/airplane": { svgAirplane },
    "@stratakit/icons/align-bottom": { svgAlignBottom },
    "@stratakit/icons/align-center-horizontal": { svgAlignCenterHorizontal },
    "@stratakit/icons/align-center-vertical": { svgAlignCenterVertical },
    "@stratakit/icons/align-left": { svgAlignLeft },
    "@stratakit/icons/align-right": { svgAlignRight },
    "@stratakit/icons/align-top": { svgAlignTop },
    "@stratakit/icons/annotation": { svgAnnotation },
    "@stratakit/icons/archive": { svgArchive },
    "@stratakit/icons/arrow-down": { svgArrowDown },
    "@stratakit/icons/arrow-left": { svgArrowLeft },
    "@stratakit/icons/arrow-right": { svgArrowRight },
    "@stratakit/icons/arrow-up": { svgArrowUp },
    "@stratakit/icons/attach": { svgAttach },
    "@stratakit/icons/automagic": { svgAutomagic },
    "@stratakit/icons/basket": { svgBasket },
    "@stratakit/icons/bolt": { svgBolt },
    "@stratakit/icons/bookmark": { svgBookmark },
    "@stratakit/icons/brand-bentley-systems": { svgBrandBentleySystems },
    "@stratakit/icons/brand-windows": { svgBrandWindows },
    "@stratakit/icons/calendar": { svgCalendar },
    "@stratakit/icons/camera-video-disabled": { svgCameraVideoDisabled },
    "@stratakit/icons/camera-video": { svgCameraVideo },
    "@stratakit/icons/camera": { svgCamera },
    "@stratakit/icons/caret-down": { svgCaretDown },
    "@stratakit/icons/caret-left": { svgCaretLeft },
    "@stratakit/icons/caret-right": { svgCaretRight },
    "@stratakit/icons/caret-up": { svgCaretUp },
    "@stratakit/icons/chart-bar": { svgChartBar },
    "@stratakit/icons/chart-line": { svgChartLine },
    "@stratakit/icons/chart-pie": { svgChartPie },
    "@stratakit/icons/chat": { svgChat },
    "@stratakit/icons/checkbox-deselect": { svgCheckboxDeselect },
    "@stratakit/icons/checkbox-select": { svgCheckboxSelect },
    "@stratakit/icons/checkmark": { svgCheckmark },
    "@stratakit/icons/chevron-down": { svgChevronDown },
    "@stratakit/icons/chevron-left": { svgChevronLeft },
    "@stratakit/icons/chevron-right": { svgChevronRight },
    "@stratakit/icons/chevron-up": { svgChevronUp },
    "@stratakit/icons/circle": { svgCircle },
    "@stratakit/icons/clipboard": { svgClipboard },
    "@stratakit/icons/clock": { svgClock },
    "@stratakit/icons/cloud-download": { svgCloudDownload },
    "@stratakit/icons/cloud-lightning": { svgCloudLightning },
    "@stratakit/icons/cloud-offline": { svgCloudOffline },
    "@stratakit/icons/cloud-upload": { svgCloudUpload },
    "@stratakit/icons/cloud": { svgCloud },
    "@stratakit/icons/collapse-rows-all": { svgCollapseRowsAll },
    "@stratakit/icons/collapse-rows": { svgCollapseRows },
    "@stratakit/icons/compare": { svgCompare },
    "@stratakit/icons/computer": { svgComputer },
    "@stratakit/icons/crop": { svgCrop },
    "@stratakit/icons/cross-section": { svgCrossSection },
    "@stratakit/icons/cursor-click": { svgCursorClick },
    "@stratakit/icons/cursor": { svgCursor },
    "@stratakit/icons/dashboard": { svgDashboard },
    "@stratakit/icons/database": { svgDatabase },
    "@stratakit/icons/delete": { svgDelete },
    "@stratakit/icons/deliverables": { svgDeliverables },
    "@stratakit/icons/details": { svgDetails },
    "@stratakit/icons/developer": { svgDeveloper },
    "@stratakit/icons/disconnect": { svgDisconnect },
    "@stratakit/icons/dismiss-circle": { svgDismissCircle },
    "@stratakit/icons/dismiss": { svgDismiss },
    "@stratakit/icons/distribute-center-horizontal": {
      svgDistributeCenterHorizontal,
    },
    "@stratakit/icons/distribute-center-vertical": {
      svgDistributeCenterVertical,
    },
    "@stratakit/icons/distribute-left": { svgDistributeLeft },
    "@stratakit/icons/distribute-right": { svgDistributeRight },
    "@stratakit/icons/distribute-top": { svgDistributeTop },
    "@stratakit/icons/dock-bottom": { svgDockBottom },
    "@stratakit/icons/dock-left": { svgDockLeft },
    "@stratakit/icons/dock-right": { svgDockRight },
    "@stratakit/icons/dock-top": { svgDockTop },
    "@stratakit/icons/document-blank": { svgDocumentBlank },
    "@stratakit/icons/document-locked": { svgDocumentLocked },
    "@stratakit/icons/document-pdf": { svgDocumentPDF },
    "@stratakit/icons/document-reference": { svgDocumentReference },
    "@stratakit/icons/document": { svgDocument },
    "@stratakit/icons/documentation": { svgDocumentation },
    "@stratakit/icons/download": { svgDownload },
    "@stratakit/icons/drag-handle-vertical": {
      svgDragHandleVerticalLarge,
    },
    "@stratakit/icons/draw": { svgDraw },
    "@stratakit/icons/duplicate": { svgDuplicate },
    "@stratakit/icons/edit-all": { svgEditAll },
    "@stratakit/icons/edit": { svgEdit },
    "@stratakit/icons/ellipse": { svgEllipse },
    "@stratakit/icons/email-at": { svgEmailAt },
    "@stratakit/icons/email": { svgEmail },
    "@stratakit/icons/exit": { svgExit },
    "@stratakit/icons/expand-rows-all": { svgExpandRowsAll },
    "@stratakit/icons/expand-rows": { svgExpandRows },
    "@stratakit/icons/export": { svgExport },
    "@stratakit/icons/eyedropper-drop": { svgEyedropperDrop },
    "@stratakit/icons/eyedropper-filled": { svgEyedropperFilled },
    "@stratakit/icons/eyedropper": { svgEyedropper },
    "@stratakit/icons/fast-backward": { svgFastBackward },
    "@stratakit/icons/fast-forward": { svgFastForward },
    "@stratakit/icons/feedback": { svgFeedback },
    "@stratakit/icons/filter": { svgFilter },
    "@stratakit/icons/find": { svgFind },
    "@stratakit/icons/fire-extinguisher": { svgFireExtinguisher },
    "@stratakit/icons/fit-to-view": { svgFitToView },
    "@stratakit/icons/flag": { svgFlag },
    "@stratakit/icons/folder-add": { svgFolderAdd },
    "@stratakit/icons/folder-chevron-down": { svgFolderChevronDown },
    "@stratakit/icons/folder-chevron-up": { svgFolderChevronUp },
    "@stratakit/icons/folder-export": { svgFolderExport },
    "@stratakit/icons/folder-import": { svgFolderImport },
    "@stratakit/icons/folder-lock": { svgFolderLock },
    "@stratakit/icons/folder-open": { svgFolderOpen },
    "@stratakit/icons/folder-remove": { svgFolderRemove },
    "@stratakit/icons/folder-shortcut": { svgFolderShortcut },
    "@stratakit/icons/folder": { svgFolder },
    "@stratakit/icons/font-bold": { svgFontBold },
    "@stratakit/icons/font-color": { svgFontColor },
    "@stratakit/icons/font-italic": { svgFontItalic },
    "@stratakit/icons/font-size": { svgFontSize },
    "@stratakit/icons/font-underline": { svgFontUnderline },
    "@stratakit/icons/frame-backward": { svgFrameBackward },
    "@stratakit/icons/frame-forward": { svgFrameForward },
    "@stratakit/icons/function": { svgFunction },
    "@stratakit/icons/gesture-one-finger-double-tap": {
      svgGestureOneFingerDoubleTap,
    },
    "@stratakit/icons/gesture-one-finger-drag": { svgGestureOneFingerDrag },
    "@stratakit/icons/gesture-one-finger-tap": { svgGestureOneFingerTap },
    "@stratakit/icons/gesture-pinch": { svgGesturePinch },
    "@stratakit/icons/gesture-touch": { svgGestureTouch },
    "@stratakit/icons/gesture-two-finger-drag": { svgGestureTwoFingerDrag },
    "@stratakit/icons/gesture-two-finger-tap": { svgGestureTwoFingerTap },
    "@stratakit/icons/gesture-two-finger": { svgGestureTwoFinger },
    "@stratakit/icons/globe": { svgGlobe },
    "@stratakit/icons/go-to-end": { svgGoToEnd },
    "@stratakit/icons/go-to-start": { svgGoToStart },
    "@stratakit/icons/graph-scatter-chart": { svgGraphScatterChart },
    "@stratakit/icons/group": { svgGroup },
    "@stratakit/icons/hand": { svgHand },
    "@stratakit/icons/help": { svgHelp, svgHelpLarge },
    "@stratakit/icons/hierarchy-tree": { svgHierarchyTree },
    "@stratakit/icons/history": { svgHistory },
    "@stratakit/icons/home": { svgHome },
    "@stratakit/icons/hourglass": { svgHourglass },
    "@stratakit/icons/i-beam": { svgIBeam },
    "@stratakit/icons/image": { svgImage },
    "@stratakit/icons/imodel": { svgIModel },
    "@stratakit/icons/import": { svgImport },
    "@stratakit/icons/important-very": { svgImportantVery },
    "@stratakit/icons/important": { svgImportant },
    "@stratakit/icons/info": { svgInfo, svgInfoLarge },
    "@stratakit/icons/install": { svgInstall },
    "@stratakit/icons/isolate": { svgIsolate },
    "@stratakit/icons/issue": { svgIssue },
    "@stratakit/icons/itwin": { svgITwin },
    "@stratakit/icons/keyboard": { svgKeyboard },
    "@stratakit/icons/label": { svgLabel },
    "@stratakit/icons/layers": { svgLayers },
    "@stratakit/icons/lightbulb": { svgLightbulb },
    "@stratakit/icons/line": { svgLine },
    "@stratakit/icons/link": { svgLink },
    "@stratakit/icons/list": { svgList },
    "@stratakit/icons/location": { svgLocation },
    "@stratakit/icons/lock-unlocked": { svgLockUnlocked },
    "@stratakit/icons/lock": { svgLock },
    "@stratakit/icons/loop": { svgLoop },
    "@stratakit/icons/manager": { svgManager },
    "@stratakit/icons/map": { svgMap },
    "@stratakit/icons/measure-angle": { svgMeasureAngle },
    "@stratakit/icons/measure-area": { svgMeasureArea },
    "@stratakit/icons/measure-distance": { svgMeasureDistance },
    "@stratakit/icons/measure-location": { svgMeasureLocation },
    "@stratakit/icons/measure-perpendicular-distance": {
      svgMeasurePerpendicularDistance,
    },
    "@stratakit/icons/measure": { svgMeasure },
    "@stratakit/icons/menu": { svgMenu },
    "@stratakit/icons/merge": { svgMerge },
    "@stratakit/icons/minus-circle": { svgMinusCircle },
    "@stratakit/icons/model": { svgModel },
    "@stratakit/icons/moon": { svgMoon },
    "@stratakit/icons/more-horizontal-circle": { svgMoreHorizontalCircle },
    "@stratakit/icons/more-horizontal": { svgMoreHorizontal },
    "@stratakit/icons/more-vertical-circle": { svgMoreVerticalCircle },
    "@stratakit/icons/more-vertical": { svgMoreVertical },
    "@stratakit/icons/mouse-click-left": { svgMouseClickLeft },
    "@stratakit/icons/mouse-click-middle": { svgMouseClickMiddle },
    "@stratakit/icons/mouse-click-right": { svgMouseClickRight },
    "@stratakit/icons/mouse-click": { svgMouseClick },
    "@stratakit/icons/move": { svgMove },
    "@stratakit/icons/network": { svgNetwork },
    "@stratakit/icons/new": { svgNew },
    "@stratakit/icons/notifications-settings": { svgNotificationsSettings },
    "@stratakit/icons/notifications": { svgNotifications },
    "@stratakit/icons/object-edit": { svgObjectEdit },
    "@stratakit/icons/object-scale": { svgObjectScale },
    "@stratakit/icons/paint-brush": { svgPaintBrush },
    "@stratakit/icons/palette": { svgPalette },
    "@stratakit/icons/panorama-model": { svgPanoramaModel },
    "@stratakit/icons/panorama": { svgPanorama },
    "@stratakit/icons/pause-circle": { svgPauseCircle },
    "@stratakit/icons/pause": { svgPause },
    "@stratakit/icons/perspective": { svgPerspective },
    "@stratakit/icons/pin-unpin": { svgPinUnpin },
    "@stratakit/icons/pin": { svgPin },
    "@stratakit/icons/placeholder": { svgPlaceholder },
    "@stratakit/icons/play-backward": { svgPlayBackward },
    "@stratakit/icons/play-circle": { svgPlayCircle },
    "@stratakit/icons/play": { svgPlay },
    "@stratakit/icons/polygon": { svgPolygon },
    "@stratakit/icons/print-preview": { svgPrintPreview },
    "@stratakit/icons/print-settings": { svgPrintSettings },
    "@stratakit/icons/print": { svgPrint },
    "@stratakit/icons/process": { svgProcess },
    "@stratakit/icons/project": { svgProject },
    "@stratakit/icons/properties": { svgProperties },
    "@stratakit/icons/puzzle": { svgPuzzle },
    "@stratakit/icons/re-center": { svgReCenter },
    "@stratakit/icons/read-only": { svgReadOnly },
    "@stratakit/icons/record": { svgRecord },
    "@stratakit/icons/records": { svgRecords },
    "@stratakit/icons/rectangle": { svgRectangle },
    "@stratakit/icons/redo": { svgRedo },
    "@stratakit/icons/refresh": { svgRefresh },
    "@stratakit/icons/rename": { svgRename },
    "@stratakit/icons/reorder": { svgReorder },
    "@stratakit/icons/replace": { svgReplace },
    "@stratakit/icons/report": { svgReport },
    "@stratakit/icons/road": { svgRoad },
    "@stratakit/icons/rotate-left": { svgRotateLeft },
    "@stratakit/icons/rotate-point": { svgRotatePoint },
    "@stratakit/icons/rotate-right": { svgRotateRight },
    "@stratakit/icons/rule": { svgRule },
    "@stratakit/icons/save-as": { svgSaveAs },
    "@stratakit/icons/save-settings": { svgSaveSettings },
    "@stratakit/icons/save": { svgSave },
    "@stratakit/icons/saved-views": { svgSavedViews },
    "@stratakit/icons/screenshare-stop": { svgScreenshareStop },
    "@stratakit/icons/screenshare": { svgScreenshare },
    "@stratakit/icons/script-run": { svgScriptRun },
    "@stratakit/icons/script-status": { svgScriptStatus },
    "@stratakit/icons/script": { svgScript },
    "@stratakit/icons/search": { svgSearch },
    "@stratakit/icons/selection-clear": { svgSelectionClear },
    "@stratakit/icons/selection": { svgSelection },
    "@stratakit/icons/send": { svgSend },
    "@stratakit/icons/settings": { svgSettings },
    "@stratakit/icons/share": { svgShare },
    "@stratakit/icons/smartphone": { svgSmartphone },
    "@stratakit/icons/smiley-happy": { svgSmileyHappy },
    "@stratakit/icons/smiley-neutral": { svgSmileyNeutral },
    "@stratakit/icons/smiley-sad": { svgSmileySad },
    "@stratakit/icons/smiley-very-happy": { svgSmileyVeryHappy },
    "@stratakit/icons/smiley-very-sad": { svgSmileyVerySad },
    "@stratakit/icons/snap-bisector": { svgSnapBisector },
    "@stratakit/icons/snap-center": { svgSnapCenter },
    "@stratakit/icons/snap-intersection": { svgSnapIntersection },
    "@stratakit/icons/snap-keypoint": { svgSnapKeypoint },
    "@stratakit/icons/snap-midpoint": { svgSnapMidpoint },
    "@stratakit/icons/snap-nearest": { svgSnapNearest },
    "@stratakit/icons/snap-origin": { svgSnapOrigin },
    "@stratakit/icons/snap-perpendicular": { svgSnapPerpendicular },
    "@stratakit/icons/snap-tangent": { svgSnapTangent },
    "@stratakit/icons/snowflake": { svgSnowflake },
    "@stratakit/icons/sort-ascending": { svgSortAscending },
    "@stratakit/icons/sort-descending": { svgSortDescending },
    "@stratakit/icons/sorting": { svgSorting },
    "@stratakit/icons/spin": { svgSpin },
    "@stratakit/icons/star": { svgStar },
    "@stratakit/icons/status-draft": { svgStatusDraft },
    "@stratakit/icons/status-error": { svgStatusError, svgStatusErrorLarge },
    "@stratakit/icons/status-pending": { svgStatusPending },
    "@stratakit/icons/status-rejected": {
      svgStatusRejected,
      svgStatusRejectedLarge,
    },
    "@stratakit/icons/status-running": { svgStatusRunning },
    "@stratakit/icons/status-success": {
      svgStatusSuccess,
      svgStatusSuccessLarge,
    },
    "@stratakit/icons/status-update": { svgStatusUpdate },
    "@stratakit/icons/status-warning": {
      svgStatusWarning,
      svgStatusWarningLarge,
    },
    "@stratakit/icons/stop-circle": { svgStopCircle },
    "@stratakit/icons/stop": { svgStop },
    "@stratakit/icons/sun": { svgSun },
    "@stratakit/icons/table-of-contents": { svgTableOfContents },
    "@stratakit/icons/table": { svgTable },
    "@stratakit/icons/tag": { svgTag },
    "@stratakit/icons/technical-preview-badge": { svgTechnicalPreviewBadge },
    "@stratakit/icons/technical-preview": { svgTechnicalPreview },
    "@stratakit/icons/text-align-center": { svgTextAlignCenter },
    "@stratakit/icons/text-align-justify": { svgTextAlignJustify },
    "@stratakit/icons/text-align-left": { svgTextAlignLeft },
    "@stratakit/icons/text-align-right": { svgTextAlignRight },
    "@stratakit/icons/text": { svgText },
    "@stratakit/icons/timeline": { svgTimeline },
    "@stratakit/icons/timer": { svgTimer },
    "@stratakit/icons/undo": { svgUndo },
    "@stratakit/icons/ungroup": { svgUngroup },
    "@stratakit/icons/unlink": { svgUnlink },
    "@stratakit/icons/update": { svgUpdate },
    "@stratakit/icons/upload": { svgUpload },
    "@stratakit/icons/user-add": { svgUserAdd },
    "@stratakit/icons/user-away": { svgUserAway },
    "@stratakit/icons/user": { svgUser },
    "@stratakit/icons/users": { svgUsers },
    "@stratakit/icons/validate": { svgValidate },
    "@stratakit/icons/vertex": { svgVertex },
    "@stratakit/icons/visibility-hide": { svgVisibilityHide },
    "@stratakit/icons/visibility-invert": { svgVisibilityInvert },
    "@stratakit/icons/visibility-partial": { svgVisibilityPartial },
    "@stratakit/icons/visibility-show": { svgVisibilityShow },
    "@stratakit/icons/walk": { svgWalk },
    "@stratakit/icons/wifi-disabled": { svgWifiDisabled },
    "@stratakit/icons/wifi": { svgWifi },
    "@stratakit/icons/window-add": { svgWindowAdd },
    "@stratakit/icons/window-area": { svgWindowArea },
    "@stratakit/icons/window-back": { svgWindowBack },
    "@stratakit/icons/window-collapse": { svgWindowCollapse },
    "@stratakit/icons/window-expand": { svgWindowExpand },
    "@stratakit/icons/window-forward": { svgWindowForward },
    "@stratakit/icons/window-maximize": { svgWindowMaximize },
    "@stratakit/icons/window-minimize": { svgWindowMinimize },
    "@stratakit/icons/window-popout": { svgWindowPopout },
    "@stratakit/icons/window-settings": { svgWindowSettings },
    "@stratakit/icons/window-split-horizontal": { svgWindowSplitHorizontal },
    "@stratakit/icons/window-split-vertical": { svgWindowSplitVertical },
    "@stratakit/icons/window": { svgWindow },
    "@stratakit/icons/zoom-in-magnifier": { svgZoomInMagnifier },
    "@stratakit/icons/zoom-out-magnifier": { svgZoomOutMagnifier },
  } as const satisfies StrataKitIconModules & Record<string, unknown>;
  return {
    [StrataKitSymbol]: {
      modules,
    },
  };
}

interface IconProps extends React.ComponentProps<"svg"> {
  /** Size of the icon. Defaults to `"regular"` (16px), can be set to `"large"` (24px). */
  size?: "regular" | "large";
}

interface RootContextValue {
  /** Element to customize the portal provider. */
  portalProvider?: React.ReactElement | undefined;
}
