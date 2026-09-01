/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable @typescript-eslint/no-restricted-imports */

import { Icon } from "@stratakit/mui";
import svg2d from "@stratakit/icons/2d.svg";
import svg3d from "@stratakit/icons/3d.svg";
import svgActivity from "@stratakit/icons/activity.svg";
import svgAdd from "@stratakit/icons/add.svg";
import svgAddCircle from "@stratakit/icons/add-circle.svg";
import svgAirplane from "@stratakit/icons/airplane.svg";
import svgAnnotation from "@stratakit/icons/annotation.svg";
import svgArrowDown from "@stratakit/icons/arrow-down.svg";
import svgArrowLeft from "@stratakit/icons/arrow-left.svg";
import svgArrowRight from "@stratakit/icons/arrow-right.svg";
import svgArrowUp from "@stratakit/icons/arrow-up.svg";
import svgAttach from "@stratakit/icons/attach.svg";
import svgAutomatic from "@stratakit/icons/automatic.svg";
import svgBasket from "@stratakit/icons/basket.svg";
import svgBentleySystems from "@stratakit/icons/bentley-systems.svg";
import svgBlank from "@stratakit/icons/blank.svg";
import svgBookmark from "@stratakit/icons/bookmark.svg";
import svgCalendar from "@stratakit/icons/calendar.svg";
import svgCamera from "@stratakit/icons/camera.svg";
import svgCameraVideo from "@stratakit/icons/camera-video.svg";
import svgCameraVideoDisabled from "@stratakit/icons/camera-video-disabled.svg";
import svgCaretDown from "@stratakit/icons/caret-down.svg";
import svgCaretLeft from "@stratakit/icons/caret-left.svg";
import svgCaretRight from "@stratakit/icons/caret-right.svg";
import svgCaretUp from "@stratakit/icons/caret-up.svg";
import svgChartBar from "@stratakit/icons/chart-bar.svg";
import svgChartLine from "@stratakit/icons/chart-line.svg";
import svgChartPie from "@stratakit/icons/chart-pie.svg";
import svgChat from "@stratakit/icons/chat.svg";
import svgCheckboxDeselect from "@stratakit/icons/checkbox-deselect.svg";
import svgCheckboxSelect from "@stratakit/icons/checkbox-select.svg";
import svgCheckmark from "@stratakit/icons/checkmark.svg";
import svgChevronDown from "@stratakit/icons/chevron-down.svg";
import svgChevronLeft from "@stratakit/icons/chevron-left.svg";
import svgChevronRight from "@stratakit/icons/chevron-right.svg";
import svgChevronUp from "@stratakit/icons/chevron-up.svg";
import svgCircle from "@stratakit/icons/circle.svg";
import svgClipboard from "@stratakit/icons/clipboard.svg";
import svgClock from "@stratakit/icons/clock.svg";
import svgCloseCircular from "@stratakit/icons/close-circular.svg";
import svgCloud from "@stratakit/icons/cloud.svg";
import svgCloudDownload from "@stratakit/icons/cloud-download.svg";
import svgCloudOffline from "@stratakit/icons/cloud-offline.svg";
import svgCloudUpload from "@stratakit/icons/cloud-upload.svg";
import svgCompare from "@stratakit/icons/compare.svg";
import svgComputer from "@stratakit/icons/computer.svg";
import svgCrop from "@stratakit/icons/crop.svg";
import svgCursor from "@stratakit/icons/cursor.svg";
import svgCursorClick from "@stratakit/icons/cursor-click.svg";
import svgDatabase from "@stratakit/icons/database.svg";
import svgDelete from "@stratakit/icons/delete.svg";
import svgDetails from "@stratakit/icons/details.svg";
import svgDeveloper from "@stratakit/icons/developer.svg";
import svgDisconnect from "@stratakit/icons/disconnect.svg";
import svgDismiss from "@stratakit/icons/dismiss.svg";
import svgDockBottom from "@stratakit/icons/dock-bottom.svg";
import svgDockLeft from "@stratakit/icons/dock-left.svg";
import svgDockRight from "@stratakit/icons/dock-right.svg";
import svgDockTop from "@stratakit/icons/dock-top.svg";
import svgDocument from "@stratakit/icons/document.svg";
import svgDocumentBlank from "@stratakit/icons/document-blank.svg";
import svgDocumentLocked from "@stratakit/icons/document-locked.svg";
import svgDocumentReference from "@stratakit/icons/document-reference.svg";
import svgDocumentation from "@stratakit/icons/documentation.svg";
import svgDownload from "@stratakit/icons/download.svg";
import svgDragHandleVertical from "@stratakit/icons/drag-handle-vertical.svg";
import svgDraw from "@stratakit/icons/draw.svg";
import svgDuplicate from "@stratakit/icons/duplicate.svg";
import svgEdit from "@stratakit/icons/edit.svg";
import svgEditAll from "@stratakit/icons/edit-all.svg";
import svgEllipse from "@stratakit/icons/ellipse.svg";
import svgEmail from "@stratakit/icons/email.svg";
import svgEmailAt from "@stratakit/icons/email-at.svg";
import svgExit from "@stratakit/icons/exit.svg";
import svgExport from "@stratakit/icons/export.svg";
import svgEyedropper from "@stratakit/icons/eyedropper.svg";
import svgEyedropperDrop from "@stratakit/icons/eyedropper-drop.svg";
import svgEyedropperFilled from "@stratakit/icons/eyedropper-filled.svg";
import svgFeedback from "@stratakit/icons/feedback.svg";
import svgFilter from "@stratakit/icons/filter.svg";
import svgFind from "@stratakit/icons/find.svg";
import svgFireExtinguisher from "@stratakit/icons/fire-extinguisher.svg";
import svgFitToView from "@stratakit/icons/fit-to-view.svg";
import svgFlag from "@stratakit/icons/flag.svg";
import svgFolder from "@stratakit/icons/folder.svg";
import svgFolderAdd from "@stratakit/icons/folder-add.svg";
import svgFolderChevronDown from "@stratakit/icons/folder-chevron-down.svg";
import svgFolderChevronUp from "@stratakit/icons/folder-chevron-up.svg";
import svgFolderExport from "@stratakit/icons/folder-export.svg";
import svgFolderImport from "@stratakit/icons/folder-import.svg";
import svgFolderLock from "@stratakit/icons/folder-lock.svg";
import svgFolderOpen from "@stratakit/icons/folder-open.svg";
import svgFolderRemove from "@stratakit/icons/folder-remove.svg";
import svgFolderShortcut from "@stratakit/icons/folder-shortcut.svg";
import svgFontBold from "@stratakit/icons/font-bold.svg";
import svgFontColor from "@stratakit/icons/font-color.svg";
import svgFontItalic from "@stratakit/icons/font-italic.svg";
import svgFontSize from "@stratakit/icons/font-size.svg";
import svgFontUnderline from "@stratakit/icons/font-underline.svg";
import svgFunction from "@stratakit/icons/function.svg";
import svgGestureOneFingerDoubleTap from "@stratakit/icons/gesture-one-finger-double-tap.svg";
import svgGestureOneFingerDrag from "@stratakit/icons/gesture-one-finger-drag.svg";
import svgGestureOneFingerTap from "@stratakit/icons/gesture-one-finger-tap.svg";
import svgGesturePinch from "@stratakit/icons/gesture-pinch.svg";
import svgGestureTouch from "@stratakit/icons/gesture-touch.svg";
import svgGestureTwoFinger from "@stratakit/icons/gesture-two-finger.svg";
import svgGestureTwoFingerDrag from "@stratakit/icons/gesture-two-finger-drag.svg";
import svgGestureTwoFingerTap from "@stratakit/icons/gesture-two-finger-tap.svg";
import svgGlobe from "@stratakit/icons/globe.svg";
import svgGraphScatterChart from "@stratakit/icons/graph-scatter-chart.svg";
import svgGroup from "@stratakit/icons/group.svg";
import svgHand from "@stratakit/icons/hand.svg";
import svgHierarchyTree from "@stratakit/icons/hierarchy-tree.svg";
import svgHistory from "@stratakit/icons/history.svg";
import svgHome from "@stratakit/icons/home.svg";
import svgHourglass from "@stratakit/icons/hourglass.svg";
import svgIBeam from "@stratakit/icons/i-beam.svg";
import svgImage from "@stratakit/icons/image.svg";
import svgImodel from "@stratakit/icons/imodel.svg";
import svgImport from "@stratakit/icons/import.svg";
import svgImportant from "@stratakit/icons/important.svg";
import svgImportantVery from "@stratakit/icons/important-very.svg";
import svgInfo from "@stratakit/icons/info.svg";
import svgInstall from "@stratakit/icons/install.svg";
import svgIsolate from "@stratakit/icons/isolate.svg";
import svgIssue from "@stratakit/icons/issue.svg";
import svgItem from "@stratakit/icons/item.svg";
import svgKeyboard from "@stratakit/icons/keyboard.svg";
import svgLabel from "@stratakit/icons/label.svg";
import svgLayers from "@stratakit/icons/layers.svg";
import svgLightbulb from "@stratakit/icons/lightbulb.svg";
import svgLine from "@stratakit/icons/line.svg";
import svgLink from "@stratakit/icons/link.svg";
import svgList from "@stratakit/icons/list.svg";
import svgLocation from "@stratakit/icons/location.svg";
import svgLock from "@stratakit/icons/lock.svg";
import svgLockUnlocked from "@stratakit/icons/lock-unlocked.svg";
import svgLoop from "@stratakit/icons/loop.svg";
import svgManager from "@stratakit/icons/manager.svg";
import svgMap from "@stratakit/icons/map.svg";
import svgMeasure from "@stratakit/icons/measure.svg";
import svgMeasureAngle from "@stratakit/icons/measure-angle.svg";
import svgMeasureDistance from "@stratakit/icons/measure-distance.svg";
import svgMeasureLocation from "@stratakit/icons/measure-location.svg";
import svgMenu from "@stratakit/icons/menu.svg";
import svgMerge from "@stratakit/icons/merge.svg";
import svgModel from "@stratakit/icons/model.svg";
import svgMoreHorizontal from "@stratakit/icons/more-horizontal.svg";
import svgMoreHorizontalCircle from "@stratakit/icons/more-horizontal-circle.svg";
import svgMoreVertical from "@stratakit/icons/more-vertical.svg";
import svgMoreVerticalCircle from "@stratakit/icons/more-vertical-circle.svg";
import svgMouseClick from "@stratakit/icons/mouse-click.svg";
import svgMouseClickLeft from "@stratakit/icons/mouse-click-left.svg";
import svgMouseClickMiddle from "@stratakit/icons/mouse-click-middle.svg";
import svgMouseClickRight from "@stratakit/icons/mouse-click-right.svg";
import svgMove from "@stratakit/icons/move.svg";
import svgNetwork from "@stratakit/icons/network.svg";
import svgNew from "@stratakit/icons/new.svg";
import svgNotification from "@stratakit/icons/notification.svg";
import svgNotificationSettings from "@stratakit/icons/notification-settings.svg";
import svgObjectScale from "@stratakit/icons/object-scale.svg";
import svgPaintbrush from "@stratakit/icons/paintbrush.svg";
import svgPalette from "@stratakit/icons/palette.svg";
import svgPanorama from "@stratakit/icons/panorama.svg";
import svgPanoramaModel from "@stratakit/icons/panorama-model.svg";
import svgPerspective from "@stratakit/icons/perspective.svg";
import svgPin from "@stratakit/icons/pin.svg";
import svgPinUnpin from "@stratakit/icons/pin-unpin.svg";
import svgPlaceholder from "@stratakit/icons/placeholder.svg";
import svgPolygon from "@stratakit/icons/polygon.svg";
import svgPrint from "@stratakit/icons/print.svg";
import svgPrintPreview from "@stratakit/icons/print-preview.svg";
import svgPrintSettings from "@stratakit/icons/print-settings.svg";
import svgProcess from "@stratakit/icons/process.svg";
import svgProperties from "@stratakit/icons/properties.svg";
import svgPuzzle from "@stratakit/icons/puzzle.svg";
import svgReCenter from "@stratakit/icons/re-center.svg";
import svgReadOnly from "@stratakit/icons/read-only.svg";
import svgRecords from "@stratakit/icons/records.svg";
import svgRectangle from "@stratakit/icons/rectangle.svg";
import svgRedo from "@stratakit/icons/redo.svg";
import svgRefresh from "@stratakit/icons/refresh.svg";
import svgRemove from "@stratakit/icons/remove.svg";
import svgRename from "@stratakit/icons/rename.svg";
import svgReorder from "@stratakit/icons/reorder.svg";
import svgReplace from "@stratakit/icons/replace.svg";
import svgReports from "@stratakit/icons/reports.svg";
import svgRoad from "@stratakit/icons/road.svg";
import svgRotateLeft from "@stratakit/icons/rotate-left.svg";
import svgRotatePoint from "@stratakit/icons/rotate-point.svg";
import svgRotateRight from "@stratakit/icons/rotate-right.svg";
import svgRowsCollapse from "@stratakit/icons/rows-collapse.svg";
import svgRowsCollapseAll from "@stratakit/icons/rows-collapse-all.svg";
import svgRowsExpand from "@stratakit/icons/rows-expand.svg";
import svgRowsExpandAll from "@stratakit/icons/rows-expand-all.svg";
import svgSave from "@stratakit/icons/save.svg";
import svgSaveAs from "@stratakit/icons/save-as.svg";
import svgSaveSettings from "@stratakit/icons/save-settings.svg";
import svgSaveUpdate from "@stratakit/icons/save-update.svg";
import svgSavedView from "@stratakit/icons/saved-view.svg";
import svgScreenshare from "@stratakit/icons/screenshare.svg";
import svgScreenshareStop from "@stratakit/icons/screenshare-stop.svg";
import svgScript from "@stratakit/icons/script.svg";
import svgScriptRun from "@stratakit/icons/script-run.svg";
import svgScriptStatus from "@stratakit/icons/script-status.svg";
import svgSearch from "@stratakit/icons/search.svg";
import svgSelection from "@stratakit/icons/selection.svg";
import svgSelectionClear from "@stratakit/icons/selection-clear.svg";
import svgSend from "@stratakit/icons/send.svg";
import svgSettings from "@stratakit/icons/settings.svg";
import svgShare from "@stratakit/icons/share.svg";
import svgSmartphone from "@stratakit/icons/smartphone.svg";
import svgSmileyHappy from "@stratakit/icons/smiley-happy.svg";
import svgSmileyNeutral from "@stratakit/icons/smiley-neutral.svg";
import svgSmileySad from "@stratakit/icons/smiley-sad.svg";
import svgSmileyVeryHappy from "@stratakit/icons/smiley-very-happy.svg";
import svgSmileyVerySad from "@stratakit/icons/smiley-very-sad.svg";
import svgSortAscending from "@stratakit/icons/sort-ascending.svg";
import svgSortDescending from "@stratakit/icons/sort-descending.svg";
import svgSorting from "@stratakit/icons/sorting.svg";
import svgSpin from "@stratakit/icons/spin.svg";
import svgStar from "@stratakit/icons/star.svg";
import svgStarFilled from "@stratakit/icons/star-filled.svg";
import svgStatusDraft from "@stratakit/icons/status-draft.svg";
import svgStatusError from "@stratakit/icons/status-error.svg";
import svgStatusPending from "@stratakit/icons/status-pending.svg";
import svgStatusRejected from "@stratakit/icons/status-rejected.svg";
import svgStatusRunning from "@stratakit/icons/status-running.svg";
import svgStatusSuccess from "@stratakit/icons/status-success.svg";
import svgStatusUpdate from "@stratakit/icons/status-update.svg";
import svgStatusWarning from "@stratakit/icons/status-warning.svg";
import svgTable from "@stratakit/icons/table.svg";
import svgTableOfContents from "@stratakit/icons/table-of-contents.svg";
import svgTechnicalPreview from "@stratakit/icons/technical-preview.svg";
import svgTechnicalPreviewBadge from "@stratakit/icons/technical-preview-badge.svg";
import svgText from "@stratakit/icons/text.svg";
import svgTextMedium from "@stratakit/icons/text-medium.svg";
import svgTextSmall from "@stratakit/icons/text-small.svg";
import svgThumbnails from "@stratakit/icons/thumbnails.svg";
import svgTimer from "@stratakit/icons/timer.svg";
import svgUndo from "@stratakit/icons/undo.svg";
import svgUngroup from "@stratakit/icons/ungroup.svg";
import svgUnlink from "@stratakit/icons/unlink.svg";
import svgUpdate from "@stratakit/icons/update.svg";
import svgUpload from "@stratakit/icons/upload.svg";
import svgUser from "@stratakit/icons/user.svg";
import svgUserAdd from "@stratakit/icons/user-add.svg";
import svgUserAway from "@stratakit/icons/user-away.svg";
import svgUsers from "@stratakit/icons/users.svg";
import svgValidate from "@stratakit/icons/validate.svg";
import svgVisibilityHide from "@stratakit/icons/visibility-hide.svg";
import svgVisibilityPartial from "@stratakit/icons/visibility-partial.svg";
import svgVisibilityShow from "@stratakit/icons/visibility-show.svg";
import svgWalk from "@stratakit/icons/walk.svg";
import svgWifi from "@stratakit/icons/wifi.svg";
import svgWifiDisabled from "@stratakit/icons/wifi-disabled.svg";
import svgWindow from "@stratakit/icons/window.svg";
import svgWindowAdd from "@stratakit/icons/window-add.svg";
import svgWindowArea from "@stratakit/icons/window-area.svg";
import svgWindowBack from "@stratakit/icons/window-back.svg";
import svgWindowBackward from "@stratakit/icons/window-backward.svg";
import svgWindowCollapse from "@stratakit/icons/window-collapse.svg";
import svgWindowForward from "@stratakit/icons/window-forward.svg";
import svgWindowFullScreen from "@stratakit/icons/window-full-screen.svg";
import svgWindowMaximize from "@stratakit/icons/window-maximize.svg";
import svgWindowMinimize from "@stratakit/icons/window-minimize.svg";
import svgWindowPopout from "@stratakit/icons/window-popout.svg";
import svgWindowSettings from "@stratakit/icons/window-settings.svg";
import svgWindowSplitHorizontal from "@stratakit/icons/window-split-horizontal.svg";
import svgWindowSplitVertical from "@stratakit/icons/window-split-vertical.svg";
import svgWindowsLogo from "@stratakit/icons/windows-logo.svg";
import svgZoomInMagnifer from "@stratakit/icons/zoom-in-magnifer.svg";
import svgZoomOutMagnifer from "@stratakit/icons/zoom-out-magnifer.svg";

/* eslint-enable @typescript-eslint/no-restricted-imports */

import { StrataKitSymbol } from "./appui-react/preview/PreviewFeatures.js";

/** @public */
export function enable() {
  const modules = {
    "@stratakit/mui": {
      // 'IconProps' from external module cannot be named. ts(4058)
      Icon: Icon as unknown as typeof Icon,
    },
    "@stratakit/icons/2d.svg": svg2d,
    "@stratakit/icons/3d.svg": svg3d,
    "@stratakit/icons/activity.svg": svgActivity,
    "@stratakit/icons/add-circle.svg": svgAddCircle,
    "@stratakit/icons/add.svg": svgAdd,
    "@stratakit/icons/airplane.svg": svgAirplane,
    "@stratakit/icons/annotation.svg": svgAnnotation,
    "@stratakit/icons/arrow-down.svg": svgArrowDown,
    "@stratakit/icons/arrow-left.svg": svgArrowLeft,
    "@stratakit/icons/arrow-right.svg": svgArrowRight,
    "@stratakit/icons/arrow-up.svg": svgArrowUp,
    "@stratakit/icons/attach.svg": svgAttach,
    "@stratakit/icons/automatic.svg": svgAutomatic,
    "@stratakit/icons/basket.svg": svgBasket,
    "@stratakit/icons/bentley-systems.svg": svgBentleySystems,
    "@stratakit/icons/blank.svg": svgBlank,
    "@stratakit/icons/bookmark.svg": svgBookmark,
    "@stratakit/icons/calendar.svg": svgCalendar,
    "@stratakit/icons/camera-video-disabled.svg": svgCameraVideoDisabled,
    "@stratakit/icons/camera-video.svg": svgCameraVideo,
    "@stratakit/icons/camera.svg": svgCamera,
    "@stratakit/icons/caret-down.svg": svgCaretDown,
    "@stratakit/icons/caret-left.svg": svgCaretLeft,
    "@stratakit/icons/caret-right.svg": svgCaretRight,
    "@stratakit/icons/caret-up.svg": svgCaretUp,
    "@stratakit/icons/chart-bar.svg": svgChartBar,
    "@stratakit/icons/chart-line.svg": svgChartLine,
    "@stratakit/icons/chart-pie.svg": svgChartPie,
    "@stratakit/icons/chat.svg": svgChat,
    "@stratakit/icons/checkbox-deselect.svg": svgCheckboxDeselect,
    "@stratakit/icons/checkbox-select.svg": svgCheckboxSelect,
    "@stratakit/icons/checkmark.svg": svgCheckmark,
    "@stratakit/icons/chevron-down.svg": svgChevronDown,
    "@stratakit/icons/chevron-left.svg": svgChevronLeft,
    "@stratakit/icons/chevron-right.svg": svgChevronRight,
    "@stratakit/icons/chevron-up.svg": svgChevronUp,
    "@stratakit/icons/circle.svg": svgCircle,
    "@stratakit/icons/clipboard.svg": svgClipboard,
    "@stratakit/icons/clock.svg": svgClock,
    "@stratakit/icons/close-circular.svg": svgCloseCircular,
    "@stratakit/icons/cloud-download.svg": svgCloudDownload,
    "@stratakit/icons/cloud-offline.svg": svgCloudOffline,
    "@stratakit/icons/cloud-upload.svg": svgCloudUpload,
    "@stratakit/icons/cloud.svg": svgCloud,
    "@stratakit/icons/compare.svg": svgCompare,
    "@stratakit/icons/computer.svg": svgComputer,
    "@stratakit/icons/crop.svg": svgCrop,
    "@stratakit/icons/cursor-click.svg": svgCursorClick,
    "@stratakit/icons/cursor.svg": svgCursor,
    "@stratakit/icons/database.svg": svgDatabase,
    "@stratakit/icons/delete.svg": svgDelete,
    "@stratakit/icons/details.svg": svgDetails,
    "@stratakit/icons/developer.svg": svgDeveloper,
    "@stratakit/icons/disconnect.svg": svgDisconnect,
    "@stratakit/icons/dismiss.svg": svgDismiss,
    "@stratakit/icons/dock-bottom.svg": svgDockBottom,
    "@stratakit/icons/dock-left.svg": svgDockLeft,
    "@stratakit/icons/dock-right.svg": svgDockRight,
    "@stratakit/icons/dock-top.svg": svgDockTop,
    "@stratakit/icons/document-blank.svg": svgDocumentBlank,
    "@stratakit/icons/document-locked.svg": svgDocumentLocked,
    "@stratakit/icons/document-reference.svg": svgDocumentReference,
    "@stratakit/icons/document.svg": svgDocument,
    "@stratakit/icons/documentation.svg": svgDocumentation,
    "@stratakit/icons/download.svg": svgDownload,
    "@stratakit/icons/drag-handle-vertical.svg": svgDragHandleVertical,
    "@stratakit/icons/draw.svg": svgDraw,
    "@stratakit/icons/duplicate.svg": svgDuplicate,
    "@stratakit/icons/edit-all.svg": svgEditAll,
    "@stratakit/icons/edit.svg": svgEdit,
    "@stratakit/icons/ellipse.svg": svgEllipse,
    "@stratakit/icons/email-at.svg": svgEmailAt,
    "@stratakit/icons/email.svg": svgEmail,
    "@stratakit/icons/exit.svg": svgExit,
    "@stratakit/icons/export.svg": svgExport,
    "@stratakit/icons/eyedropper-drop.svg": svgEyedropperDrop,
    "@stratakit/icons/eyedropper-filled.svg": svgEyedropperFilled,
    "@stratakit/icons/eyedropper.svg": svgEyedropper,
    "@stratakit/icons/feedback.svg": svgFeedback,
    "@stratakit/icons/filter.svg": svgFilter,
    "@stratakit/icons/find.svg": svgFind,
    "@stratakit/icons/fire-extinguisher.svg": svgFireExtinguisher,
    "@stratakit/icons/fit-to-view.svg": svgFitToView,
    "@stratakit/icons/flag.svg": svgFlag,
    "@stratakit/icons/folder-add.svg": svgFolderAdd,
    "@stratakit/icons/folder-chevron-down.svg": svgFolderChevronDown,
    "@stratakit/icons/folder-chevron-up.svg": svgFolderChevronUp,
    "@stratakit/icons/folder-export.svg": svgFolderExport,
    "@stratakit/icons/folder-import.svg": svgFolderImport,
    "@stratakit/icons/folder-lock.svg": svgFolderLock,
    "@stratakit/icons/folder-open.svg": svgFolderOpen,
    "@stratakit/icons/folder-remove.svg": svgFolderRemove,
    "@stratakit/icons/folder-shortcut.svg": svgFolderShortcut,
    "@stratakit/icons/folder.svg": svgFolder,
    "@stratakit/icons/font-bold.svg": svgFontBold,
    "@stratakit/icons/font-color.svg": svgFontColor,
    "@stratakit/icons/font-italic.svg": svgFontItalic,
    "@stratakit/icons/font-size.svg": svgFontSize,
    "@stratakit/icons/font-underline.svg": svgFontUnderline,
    "@stratakit/icons/function.svg": svgFunction,
    "@stratakit/icons/gesture-one-finger-double-tap.svg":
      svgGestureOneFingerDoubleTap,
    "@stratakit/icons/gesture-one-finger-drag.svg": svgGestureOneFingerDrag,
    "@stratakit/icons/gesture-one-finger-tap.svg": svgGestureOneFingerTap,
    "@stratakit/icons/gesture-pinch.svg": svgGesturePinch,
    "@stratakit/icons/gesture-touch.svg": svgGestureTouch,
    "@stratakit/icons/gesture-two-finger-drag.svg": svgGestureTwoFingerDrag,
    "@stratakit/icons/gesture-two-finger-tap.svg": svgGestureTwoFingerTap,
    "@stratakit/icons/gesture-two-finger.svg": svgGestureTwoFinger,
    "@stratakit/icons/globe.svg": svgGlobe,
    "@stratakit/icons/graph-scatter-chart.svg": svgGraphScatterChart,
    "@stratakit/icons/group.svg": svgGroup,
    "@stratakit/icons/hand.svg": svgHand,
    "@stratakit/icons/hierarchy-tree.svg": svgHierarchyTree,
    "@stratakit/icons/history.svg": svgHistory,
    "@stratakit/icons/home.svg": svgHome,
    "@stratakit/icons/hourglass.svg": svgHourglass,
    "@stratakit/icons/i-beam.svg": svgIBeam,
    "@stratakit/icons/image.svg": svgImage,
    "@stratakit/icons/imodel.svg": svgImodel,
    "@stratakit/icons/import.svg": svgImport,
    "@stratakit/icons/important-very.svg": svgImportantVery,
    "@stratakit/icons/important.svg": svgImportant,
    "@stratakit/icons/info.svg": svgInfo,
    "@stratakit/icons/install.svg": svgInstall,
    "@stratakit/icons/isolate.svg": svgIsolate,
    "@stratakit/icons/issue.svg": svgIssue,
    "@stratakit/icons/item.svg": svgItem,
    "@stratakit/icons/keyboard.svg": svgKeyboard,
    "@stratakit/icons/label.svg": svgLabel,
    "@stratakit/icons/layers.svg": svgLayers,
    "@stratakit/icons/lightbulb.svg": svgLightbulb,
    "@stratakit/icons/line.svg": svgLine,
    "@stratakit/icons/link.svg": svgLink,
    "@stratakit/icons/list.svg": svgList,
    "@stratakit/icons/location.svg": svgLocation,
    "@stratakit/icons/lock-unlocked.svg": svgLockUnlocked,
    "@stratakit/icons/lock.svg": svgLock,
    "@stratakit/icons/loop.svg": svgLoop,
    "@stratakit/icons/manager.svg": svgManager,
    "@stratakit/icons/map.svg": svgMap,
    "@stratakit/icons/measure-angle.svg": svgMeasureAngle,
    "@stratakit/icons/measure-distance.svg": svgMeasureDistance,
    "@stratakit/icons/measure-location.svg": svgMeasureLocation,
    "@stratakit/icons/measure.svg": svgMeasure,
    "@stratakit/icons/menu.svg": svgMenu,
    "@stratakit/icons/merge.svg": svgMerge,
    "@stratakit/icons/model.svg": svgModel,
    "@stratakit/icons/more-horizontal-circle.svg": svgMoreHorizontalCircle,
    "@stratakit/icons/more-horizontal.svg": svgMoreHorizontal,
    "@stratakit/icons/more-vertical-circle.svg": svgMoreVerticalCircle,
    "@stratakit/icons/more-vertical.svg": svgMoreVertical,
    "@stratakit/icons/mouse-click-left.svg": svgMouseClickLeft,
    "@stratakit/icons/mouse-click-middle.svg": svgMouseClickMiddle,
    "@stratakit/icons/mouse-click-right.svg": svgMouseClickRight,
    "@stratakit/icons/mouse-click.svg": svgMouseClick,
    "@stratakit/icons/move.svg": svgMove,
    "@stratakit/icons/network.svg": svgNetwork,
    "@stratakit/icons/new.svg": svgNew,
    "@stratakit/icons/notification-settings.svg": svgNotificationSettings,
    "@stratakit/icons/notification.svg": svgNotification,
    "@stratakit/icons/object-scale.svg": svgObjectScale,
    "@stratakit/icons/paintbrush.svg": svgPaintbrush,
    "@stratakit/icons/palette.svg": svgPalette,
    "@stratakit/icons/panorama-model.svg": svgPanoramaModel,
    "@stratakit/icons/panorama.svg": svgPanorama,
    "@stratakit/icons/perspective.svg": svgPerspective,
    "@stratakit/icons/pin-unpin.svg": svgPinUnpin,
    "@stratakit/icons/pin.svg": svgPin,
    "@stratakit/icons/placeholder.svg": svgPlaceholder,
    "@stratakit/icons/polygon.svg": svgPolygon,
    "@stratakit/icons/print-preview.svg": svgPrintPreview,
    "@stratakit/icons/print-settings.svg": svgPrintSettings,
    "@stratakit/icons/print.svg": svgPrint,
    "@stratakit/icons/process.svg": svgProcess,
    "@stratakit/icons/properties.svg": svgProperties,
    "@stratakit/icons/puzzle.svg": svgPuzzle,
    "@stratakit/icons/re-center.svg": svgReCenter,
    "@stratakit/icons/read-only.svg": svgReadOnly,
    "@stratakit/icons/records.svg": svgRecords,
    "@stratakit/icons/rectangle.svg": svgRectangle,
    "@stratakit/icons/redo.svg": svgRedo,
    "@stratakit/icons/refresh.svg": svgRefresh,
    "@stratakit/icons/remove.svg": svgRemove,
    "@stratakit/icons/rename.svg": svgRename,
    "@stratakit/icons/reorder.svg": svgReorder,
    "@stratakit/icons/replace.svg": svgReplace,
    "@stratakit/icons/reports.svg": svgReports,
    "@stratakit/icons/road.svg": svgRoad,
    "@stratakit/icons/rotate-left.svg": svgRotateLeft,
    "@stratakit/icons/rotate-point.svg": svgRotatePoint,
    "@stratakit/icons/rotate-right.svg": svgRotateRight,
    "@stratakit/icons/rows-collapse-all.svg": svgRowsCollapseAll,
    "@stratakit/icons/rows-collapse.svg": svgRowsCollapse,
    "@stratakit/icons/rows-expand-all.svg": svgRowsExpandAll,
    "@stratakit/icons/rows-expand.svg": svgRowsExpand,
    "@stratakit/icons/save-as.svg": svgSaveAs,
    "@stratakit/icons/save-settings.svg": svgSaveSettings,
    "@stratakit/icons/save-update.svg": svgSaveUpdate,
    "@stratakit/icons/save.svg": svgSave,
    "@stratakit/icons/saved-view.svg": svgSavedView,
    "@stratakit/icons/screenshare-stop.svg": svgScreenshareStop,
    "@stratakit/icons/screenshare.svg": svgScreenshare,
    "@stratakit/icons/script-run.svg": svgScriptRun,
    "@stratakit/icons/script-status.svg": svgScriptStatus,
    "@stratakit/icons/script.svg": svgScript,
    "@stratakit/icons/search.svg": svgSearch,
    "@stratakit/icons/selection-clear.svg": svgSelectionClear,
    "@stratakit/icons/selection.svg": svgSelection,
    "@stratakit/icons/send.svg": svgSend,
    "@stratakit/icons/settings.svg": svgSettings,
    "@stratakit/icons/share.svg": svgShare,
    "@stratakit/icons/smartphone.svg": svgSmartphone,
    "@stratakit/icons/smiley-happy.svg": svgSmileyHappy,
    "@stratakit/icons/smiley-neutral.svg": svgSmileyNeutral,
    "@stratakit/icons/smiley-sad.svg": svgSmileySad,
    "@stratakit/icons/smiley-very-happy.svg": svgSmileyVeryHappy,
    "@stratakit/icons/smiley-very-sad.svg": svgSmileyVerySad,
    "@stratakit/icons/sort-ascending.svg": svgSortAscending,
    "@stratakit/icons/sort-descending.svg": svgSortDescending,
    "@stratakit/icons/sorting.svg": svgSorting,
    "@stratakit/icons/spin.svg": svgSpin,
    "@stratakit/icons/star-filled.svg": svgStarFilled,
    "@stratakit/icons/star.svg": svgStar,
    "@stratakit/icons/status-draft.svg": svgStatusDraft,
    "@stratakit/icons/status-error.svg": svgStatusError,
    "@stratakit/icons/status-pending.svg": svgStatusPending,
    "@stratakit/icons/status-rejected.svg": svgStatusRejected,
    "@stratakit/icons/status-running.svg": svgStatusRunning,
    "@stratakit/icons/status-success.svg": svgStatusSuccess,
    "@stratakit/icons/status-update.svg": svgStatusUpdate,
    "@stratakit/icons/status-warning.svg": svgStatusWarning,
    "@stratakit/icons/table-of-contents.svg": svgTableOfContents,
    "@stratakit/icons/table.svg": svgTable,
    "@stratakit/icons/technical-preview-badge.svg": svgTechnicalPreviewBadge,
    "@stratakit/icons/technical-preview.svg": svgTechnicalPreview,
    "@stratakit/icons/text-medium.svg": svgTextMedium,
    "@stratakit/icons/text-small.svg": svgTextSmall,
    "@stratakit/icons/text.svg": svgText,
    "@stratakit/icons/thumbnails.svg": svgThumbnails,
    "@stratakit/icons/timer.svg": svgTimer,
    "@stratakit/icons/undo.svg": svgUndo,
    "@stratakit/icons/ungroup.svg": svgUngroup,
    "@stratakit/icons/unlink.svg": svgUnlink,
    "@stratakit/icons/update.svg": svgUpdate,
    "@stratakit/icons/upload.svg": svgUpload,
    "@stratakit/icons/user-add.svg": svgUserAdd,
    "@stratakit/icons/user-away.svg": svgUserAway,
    "@stratakit/icons/user.svg": svgUser,
    "@stratakit/icons/users.svg": svgUsers,
    "@stratakit/icons/validate.svg": svgValidate,
    "@stratakit/icons/visibility-hide.svg": svgVisibilityHide,
    "@stratakit/icons/visibility-partial.svg": svgVisibilityPartial,
    "@stratakit/icons/visibility-show.svg": svgVisibilityShow,
    "@stratakit/icons/walk.svg": svgWalk,
    "@stratakit/icons/wifi-disabled.svg": svgWifiDisabled,
    "@stratakit/icons/wifi.svg": svgWifi,
    "@stratakit/icons/window-add.svg": svgWindowAdd,
    "@stratakit/icons/window-area.svg": svgWindowArea,
    "@stratakit/icons/window-back.svg": svgWindowBack,
    "@stratakit/icons/window-backward.svg": svgWindowBackward,
    "@stratakit/icons/window-collapse.svg": svgWindowCollapse,
    "@stratakit/icons/window-forward.svg": svgWindowForward,
    "@stratakit/icons/window-full-screen.svg": svgWindowFullScreen,
    "@stratakit/icons/window-maximize.svg": svgWindowMaximize,
    "@stratakit/icons/window-minimize.svg": svgWindowMinimize,
    "@stratakit/icons/window-popout.svg": svgWindowPopout,
    "@stratakit/icons/window-settings.svg": svgWindowSettings,
    "@stratakit/icons/window-split-horizontal.svg": svgWindowSplitHorizontal,
    "@stratakit/icons/window-split-vertical.svg": svgWindowSplitVertical,
    "@stratakit/icons/window.svg": svgWindow,
    "@stratakit/icons/windows-logo.svg": svgWindowsLogo,
    "@stratakit/icons/zoom-in-magnifer.svg": svgZoomInMagnifer,
    "@stratakit/icons/zoom-out-magnifer.svg": svgZoomOutMagnifer,
  } as const;
  return {
    [StrataKitSymbol]: {
      modules,
    },
  };
}
