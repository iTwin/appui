/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */

export * from "./core-react/UiCore.js";

export * from "./core-react/badge/Badge.js";
export * from "./core-react/badge/BadgeType.js";

export * from "./core-react/base/Div.js";
export * from "./core-react/base/DivWithOutsideClick.js";
export * from "./core-react/base/Centered.js";
export * from "./core-react/base/FillCentered.js";
export * from "./core-react/base/FlexWrapContainer.js";
export * from "./core-react/base/Gap.js";
export * from "./core-react/base/PointerEvents.js";
export * from "./core-react/base/ScrollView.js";

export * from "./core-react/button/UnderlinedButton.js";

export * from "./core-react/checklistbox/CheckListBox.js";

export * from "./core-react/contextmenu/ContextMenu.js";
export * from "./core-react/contextmenu/ContextMenuDirection.js";
export * from "./core-react/contextmenu/ContextMenuDivider.js";
export * from "./core-react/contextmenu/ContextMenuItem.js";
export * from "./core-react/contextmenu/ContextSubMenu.js";
export * from "./core-react/contextmenu/GlobalContextMenu.js";
export * from "./core-react/contextmenu/PopupContextMenu.js";

export * from "./core-react/dialog/Dialog.js";
export * from "./core-react/dialog/GlobalDialog.js";

export * from "./core-react/elementseparator/ElementSeparator.js";

export * from "./core-react/enums/Alignment.js";
export * from "./core-react/enums/CheckBoxState.js";
export * from "./core-react/enums/Orientation.js";
export * from "./core-react/enums/SortDirection.js";
export * from "./core-react/enums/TimeFormat.js";

export * from "./core-react/expandable/ExpandableList.js";

export * from "./core-react/focus/ItemKeyboardNavigator.js";
export * from "./core-react/focustrap/FocusTrap.js";

export * from "./core-react/hocs/withIsPressed.js";
export * from "./core-react/hocs/withOnOutsideClick.js";
export * from "./core-react/hocs/withTimeout.js";

export { LocalizationProvider } from "./core-react/l10n/LocalizationProvider.js";
export { usePackageTranslation } from "./core-react/l10n/usePackageTranslation.js";

export * from "./core-react/icons/ConditionalIconItem.js";
export * from "./core-react/icons/IconComponent.js";
export * from "./core-react/icons/SvgPath.js";
export * from "./core-react/icons/WebFontIcon.js";

export * from "./core-react/autosuggest/AutoSuggest.js";

export * from "./core-react/imagecheckbox/ImageCheckBox.js";

export * from "./core-react/inputs/InputLabel.js";
export * from "./core-react/inputs/InputStatus.js";
export * from "./core-react/inputs/iconinput/IconInput.js";
export * from "./core-react/inputs/LabeledComponentProps.js";
export * from "./core-react/inputs/numberinput/NumberInput.js";

export * from "./core-react/listbox/Listbox.js";

export * from "./core-react/loading/LoadingBar.js";
export * from "./core-react/loading/LoadingPrompt.js";
export * from "./core-react/loading/LoadingSpinner.js";
export * from "./core-react/loading/LoadingStatus.js";

export * from "./core-react/messagebox/MessageBox.js";

export * from "./core-react/notification/MessageRenderer.js";
export * from "./core-react/notification/MessageType.js";

export * from "./core-react/popup/Popup.js";

export * from "./core-react/radialmenu/RadialMenu.js";
export * from "./core-react/radialmenu/Annulus.js";

export * from "./core-react/searchbox/SearchBox.js";

export * from "./core-react/settings/SettingsManager.js";
export * from "./core-react/settings/SettingsContainer.js";

export * from "./core-react/tabs/VerticalTabs.js";
export * from "./core-react/tabs/Tabs.js";

export * from "./core-react/text/BodyText.js";
export * from "./core-react/text/BlockText.js";
export * from "./core-react/text/DisabledText.js";
export * from "./core-react/text/FilteredText.js";
export * from "./core-react/text/MutedText.js";
export * from "./core-react/text/StyledText.js";
export * from "./core-react/text/TextProps.js";

export {
  ExpansionToggle,
  ExpansionToggleProps,
} from "./core-react/tree/ExpansionToggle.js";
export { TreeBranch, TreeBranchProps } from "./core-react/tree/Branch.js";
export {
  TreeNode,
  TreeNodeProps,
  NodeCheckboxProps,
  NodeCheckboxRenderer,
  NodeCheckboxRenderProps,
} from "./core-react/tree/Node.js";
export { Tree, TreeProps } from "./core-react/tree/Tree.js";
export {
  TreeNodePlaceholder,
  TreeNodePlaceholderProps,
} from "./core-react/tree/Placeholder.js";

export * from "./core-react/uistate/UiStateEntry.js";
export * from "./core-react/uistate/UiStateStorage.js";
export * from "./core-react/uistate/LocalStateStorage.js";

export * from "./core-react/utils/IconHelper.js";
import { registerIconWebComponent } from "./core-react/utils/IconWebComponent.js";
export * from "./core-react/utils/Point.js";
export * from "./core-react/utils/Props.js";
export * from "./core-react/utils/Rectangle.js";
export * from "./core-react/utils/Size.js";
export * from "./core-react/utils/Timer.js";
export * from "./core-react/utils/UiGeometry.js";
export * from "./core-react/utils/flattenChildren.js";
export * from "./core-react/utils/getBestBWContrastColor.js";
export * from "./core-react/utils/getCssVariable.js";
export * from "./core-react/utils/getDisplayName.js";
export * from "./core-react/utils/getUserColor.js";
export * from "./core-react/utils/shallowDiffers.js";
export * from "./core-react/utils/typeUtils.js";
export * from "./core-react/utils/isPromiseLike.js";
export * from "./core-react/utils/ListenerType.js";
export * from "./core-react/utils/ScrollPositionMaintainer.js";
export * from "./core-react/utils/getObjectClassName.js";

export * from "./core-react/utils/hooks/useDisposable.js";
export * from "./core-react/utils/hooks/useEffectSkipFirst.js";
export * from "./core-react/utils/hooks/useEventListener.js";
export * from "./core-react/utils/hooks/useOnOutsideClick.js";
export * from "./core-react/utils/hooks/useProximityToMouse.js";
export * from "./core-react/utils/hooks/useRefEffect.js";
export * from "./core-react/utils/hooks/useRefs.js";
export * from "./core-react/utils/hooks/useRefState.js";
export * from "./core-react/utils/hooks/useResizeObserver.js";
export * from "./core-react/utils/hooks/useTargeted.js";
export * from "./core-react/utils/hooks/useWidgetOpacityContext.js";
export * from "./core-react/utils/hooks/useInterval.js";
export * from "./core-react/utils/hooks/useCrossOriginPopup.js";

registerIconWebComponent();

/** @docs-package-description
 * The core-react package contains general purpose React components, such as Dialog, MessageBox, SearchBox, RadialMenu and SplitButton.
 */
/**
 * @docs-group-description AutoSuggest
 * Component for input with an auto-suggestion dropdown.
 */
/**
 * @docs-group-description Base
 * Low-level classes and components for building application UI.
 */
/**
 * @docs-group-description Button
 * Components for working with various Buttons.
 */
/**
 * @docs-group-description Checkbox
 * Component is a wrapper for the `<input type="checkbox">` HTML element.
 */
/**
 * @docs-group-description CheckListBox
 * Components for working with a Check listbox.
 */
/**
 * @docs-group-description Common
 * Common classes and enums used across various UI components.
 */
/**
 * @docs-group-description ContextMenu
 * Components for working with a Context Menu.
 */
/**
 * @docs-group-description Dialog
 * Components for working with a Dialog or MessageBox.
 */
/**
 * @docs-group-description ElementSeparator
 * Components for working with a ElementSeparator.
 */
/**
 * @docs-group-description Expandable
 * Components for working with a ExpandableBlock or ExpandableList.
 */
/**
 * @docs-group-description Form
 * Components used to create a Form using supplied properties to specify fields.
 */
/**
 * @docs-group-description Icon
 * Component that renders core-react icon when given an icon name or SVG source.
 */
/**
 * @docs-group-description Inputs
 * Components for working with input controls, such as Input, IconInput and NumberInput.
 */
/**
 * @docs-group-description Listbox
 * Components for working with a Listbox.
 */
/**
 * @docs-group-description Loading
 * Components for working with Loading spinners and progress indicators and bars.
 */
/**
 * @docs-group-description Notification
 * Components for working with messages and tooltips.
 */
/**
 * @docs-group-description Popup
 * Components for working with a Popup.
 */
/**
 * @docs-group-description RadialMenu
 * Components for working with a RadialMenu.
 */
/**
 * @docs-group-description Radio
 * Component is a wrapper for the `<input type="radio">` HTML element.
 */
/**
 * @docs-group-description SearchBox
 * Components for working with a SearchBox.
 */
/**
 * @docs-group-description Select
 * Component is a wrapper for the `<select>` HTML element.
 */
/**
 * @docs-group-description Settings
 * Manager and UI Components that allow users to modify settings for different packages and extensions.
 */
/**
 * @docs-group-description Slider
 * Component displays a range slider with thumbs for changing the value.
 */
/**
 * @docs-group-description SplitButton
 * Components for working with a SplitButton.
 */
/**
 * @docs-group-description Tabs
 * Components for working with horizontal or vertical tabs.
 */
/**
 * @docs-group-description Text
 * Components for working with styled text.
 */
/**
 * @docs-group-description Tiles
 * Components for a container rendering elements that can be grouped together.
 */
/**
 * @docs-group-description Toggle
 * Components for working with a Toggle switch.
 */
/**
 * @docs-group-description Tooltip
 * Components for working with a Tooltip.
 */
/**
 * @docs-group-description Tree
 * Presentation React components for working with a Tree.
 */
/**
 * @docs-group-description UiStateStorage
 * Interfaces and classes for working with persistent UI settings.
 */
/**
 * @docs-group-description Utilities
 * Various utility classes, functions and React hooks for working with a UI.
 */
