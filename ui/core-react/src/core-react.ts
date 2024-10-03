/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */

export { UiCore } from "./core-react/UiCore.js";

export { BadgeType } from "./core-react/badge/BadgeType.js";

export { Div, DivProps } from "./core-react/base/Div.js";
export { DivWithOutsideClick } from "./core-react/base/DivWithOutsideClick.js";
export { Centered } from "./core-react/base/Centered.js";
export { FillCentered } from "./core-react/base/FillCentered.js";
export { FlexWrapContainer } from "./core-react/base/FlexWrapContainer.js";
export { Gap, GapProps } from "./core-react/base/Gap.js";
export { ScrollView } from "./core-react/base/ScrollView.js";

export {
  UnderlinedButton,
  UnderlinedButtonProps,
} from "./core-react/button/UnderlinedButton.js";

export {
  CheckListBox,
  CheckListBoxItem,
  CheckListBoxItemProps,
  CheckListBoxSeparator,
} from "./core-react/checklistbox/CheckListBox.js";

export {
  ContextMenu,
  ContextMenuProps,
} from "./core-react/contextmenu/ContextMenu.js";
export { ContextMenuDirection } from "./core-react/contextmenu/ContextMenuDirection.js";
export { ContextMenuDivider } from "./core-react/contextmenu/ContextMenuDivider.js";
export {
  ContextMenuItem,
  ContextMenuItemProps,
} from "./core-react/contextmenu/ContextMenuItem.js";
export {
  ContextSubMenu,
  ContextSubMenuProps,
} from "./core-react/contextmenu/ContextSubMenu.js";
export {
  GlobalContextMenu,
  GlobalContextMenuProps,
} from "./core-react/contextmenu/GlobalContextMenu.js";
export {
  PopupContextMenu,
  PopupContextMenuProps,
} from "./core-react/contextmenu/PopupContextMenu.js";

export {
  Dialog,
  DialogAlignment,
  DialogProps,
} from "./core-react/dialog/Dialog.js";
export {
  GlobalDialog,
  GlobalDialogProps,
  GlobalDialogState,
} from "./core-react/dialog/GlobalDialog.js";

export {
  ElementSeparator,
  ElementSeparatorProps,
  RatioChangeResult,
} from "./core-react/elementseparator/ElementSeparator.js";

export {
  HorizontalAlignment,
  VerticalAlignment,
} from "./core-react/enums/Alignment.js";
export {
  CheckBoxInfo,
  CheckBoxState,
} from "./core-react/enums/CheckBoxState.js";
export { Orientation } from "./core-react/enums/Orientation.js";
export { SortDirection } from "./core-react/enums/SortDirection.js";
export { TimeFormat } from "./core-react/enums/TimeFormat.js";

export {
  ExpandableList,
  ExpandableListProps,
} from "./core-react/expandable/ExpandableList.js";

export {
  withIsPressed,
  WithIsPressedProps,
} from "./core-react/hocs/withIsPressed.js";
export {
  withOnOutsideClick,
  WithOnOutsideClickProps,
} from "./core-react/hocs/withOnOutsideClick.js";
export {
  withTimeout,
  WithTimeoutProps,
} from "./core-react/hocs/withTimeout.js";

export { LocalizationProvider } from "./core-react/l10n/LocalizationProvider.js";

export { ConditionalIconItem } from "./core-react/icons/ConditionalIconItem.js";
export { Icon, IconProps, IconSpec } from "./core-react/icons/IconComponent.js";
export { SvgPath, SvgPathProps } from "./core-react/icons/SvgPath.js";
export {
  WebFontIcon,
  WebFontIconProps,
} from "./core-react/icons/WebFontIcon.js";

export {
  AsyncGetAutoSuggestDataFunc,
  AutoSuggest,
  AutoSuggestData,
  AutoSuggestProps,
  GetAutoSuggestDataFunc,
} from "./core-react/autosuggest/AutoSuggest.js";

export {
  ImageCheckBox,
  ImageCheckBoxProps,
} from "./core-react/imagecheckbox/ImageCheckBox.js";

export { InputLabel, InputLabelProps } from "./core-react/inputs/InputLabel.js";
export { InputStatus } from "./core-react/inputs/InputStatus.js";
export {
  IconInput,
  IconInputProps,
} from "./core-react/inputs/iconinput/IconInput.js";
export {
  LabeledComponentProps,
  MessagedComponentProps,
} from "./core-react/inputs/LabeledComponentProps.js";
export {
  NumberInput,
  NumberInputProps,
  StepFunctionProp,
} from "./core-react/inputs/numberinput/NumberInput.js";

export {
  Listbox,
  ListboxContext,
  ListboxContextProps,
  ListboxItem,
  ListboxItemProps,
  ListboxProps,
  ListboxValue,
} from "./core-react/listbox/Listbox.js";

export {
  LoadingBar,
  LoadingBarProps,
} from "./core-react/loading/LoadingBar.js";
export {
  LoadingPrompt,
  LoadingPromptProps,
} from "./core-react/loading/LoadingPrompt.js";
export {
  LoadingSpinner,
  LoadingSpinnerProps,
  RadialSizeType,
} from "./core-react/loading/LoadingSpinner.js";
export {
  LoadingStatus,
  LoadingStatusProps,
} from "./core-react/loading/LoadingStatus.js";

export {
  MessageBox,
  MessageBoxProps,
  MessageContainer,
  MessageContainerProps,
} from "./core-react/messagebox/MessageBox.js";

export {
  MessageRenderer,
  MessageRendererProps,
} from "./core-react/notification/MessageRenderer.js";
export {
  MessageType,
  ReactMessage,
} from "./core-react/notification/MessageType.js";

export { Popup, PopupProps } from "./core-react/popup/Popup.js";

export {
  RadialButton,
  RadialButtonProps,
  RadialMenu,
  RadialMenuProps,
} from "./core-react/radialmenu/RadialMenu.js";

export { SearchBox, SearchBoxProps } from "./core-react/searchbox/SearchBox.js";

export {
  ActivateSettingsTabEvent,
  ActivateSettingsTabEventArgs,
  ProcessSettingsContainerCloseEvent,
  ProcessSettingsContainerCloseEventArgs,
  ProcessSettingsTabActivationEvent,
  ProcessSettingsTabActivationEventArgs,
  SettingsManager,
  SettingsProvidersChangedEvent,
  SettingsProvidersChangedEventArgs,
  SettingsTabEntry,
  SettingsTabsProvider,
} from "./core-react/settings/SettingsManager.js";
export {
  SettingsContainer,
  SettingsContainerProps,
  useSaveBeforeActivatingNewSettingsTab,
  useSaveBeforeClosingSettingsContainer,
} from "./core-react/settings/SettingsContainer.js";

export { VerticalTabs } from "./core-react/tabs/VerticalTabs.js";
export {
  MainTabsProps,
  TabLabel,
  Tabs,
  TabsProps,
} from "./core-react/tabs/Tabs.js";

export { BodyText } from "./core-react/text/BodyText.js";
export { BlockText } from "./core-react/text/BlockText.js";
export { DisabledText } from "./core-react/text/DisabledText.js";
export {
  FilteredText,
  FilteredTextProps,
} from "./core-react/text/FilteredText.js";
export { MutedText } from "./core-react/text/MutedText.js";
export { StyledText, StyledTextProps } from "./core-react/text/StyledText.js";
export { TextProps } from "./core-react/text/TextProps.js";

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

export { UiStateEntry } from "./core-react/uistate/UiStateEntry.js";
export {
  UiStateStorage,
  UiStateStorageResult,
  UiStateStorageStatus,
} from "./core-react/uistate/UiStateStorage.js";
export { LocalStateStorage } from "./core-react/uistate/LocalStateStorage.js";

export { IconHelper } from "./core-react/utils/IconHelper.js";
export {
  ClassNameProps,
  CommonDivProps,
  CommonProps,
  NoChildrenProps,
  OmitChildrenProp,
} from "./core-react/utils/Props.js";
export { RectangleProps } from "./core-react/utils/Rectangle.js";
export { SizeProps } from "./core-react/utils/Size.js";
export { ExecuteHandler, Timer } from "./core-react/utils/Timer.js";
export {
  getCssVariable,
  getCssVariableAsNumber,
} from "./core-react/utils/getCssVariable.js";
export { Omit } from "./core-react/utils/typeUtils.js";
export { ScrollPositionMaintainer } from "./core-react/utils/ScrollPositionMaintainer.js";

export {
  useDisposable,
  useOptionalDisposable,
} from "./core-react/utils/hooks/useDisposable.js";
export { useEffectSkipFirst } from "./core-react/utils/hooks/useEffectSkipFirst.js";
export {
  OutsideClickEvent,
  useOnOutsideClick,
} from "./core-react/utils/hooks/useOnOutsideClick.js";
export {
  ElementResizeObserver,
  RenderPropsArgs,
  ResizableContainerObserver,
} from "./core-react/utils/hooks/useResizeObserver.js";
export { useInterval } from "./core-react/utils/hooks/useInterval.js";
export { useCrossOriginPopup } from "./core-react/utils/hooks/useCrossOriginPopup.js";

import { registerIconWebComponent } from "./core-react/utils/IconWebComponent.js";

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
