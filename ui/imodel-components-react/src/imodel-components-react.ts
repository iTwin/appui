/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable @typescript-eslint/no-deprecated */

export { UiIModelComponents } from "./imodel-components-react/UiIModelComponents.js";

export {
  AlphaSlider,
  AlphaSliderProps,
} from "./imodel-components-react/color/AlphaSlider.js";
export {
  ColorPickerButton,
  ColorPickerProps,
} from "./imodel-components-react/color/ColorPickerButton.js";
export {
  ColorPickerDialog,
  ColorPickerDialogProps,
} from "./imodel-components-react/color/ColorPickerDialog.js";
export {
  ColorPickerPopup,
  ColorPickerPopupProps,
} from "./imodel-components-react/color/ColorPickerPopup.js";
export {
  HueSlider,
  HueSliderProps,
} from "./imodel-components-react/color/HueSlider.js";
export {
  SaturationPicker,
  SaturationPickerProps,
} from "./imodel-components-react/color/SaturationPicker.js";
export {
  ColorSwatch,
  ColorSwatchProps,
} from "./imodel-components-react/color/Swatch.js";

export {
  ColorEditor,
  ColorPropertyEditor,
} from "./imodel-components-react/editors/ColorEditor.js";
export {
  WeightEditor,
  WeightPropertyEditor,
} from "./imodel-components-react/editors/WeightEditor.js";

export {
  QuantityInput,
  QuantityProps,
} from "./imodel-components-react/inputs/QuantityInput.js";
export {
  QuantityNumberInput,
  QuantityNumberInputProps,
  StepFunctionProp,
} from "./imodel-components-react/inputs/QuantityNumberInput.js";

export {
  LineWeightSwatch,
  LineWeightSwatchProps,
} from "./imodel-components-react/lineweight/Swatch.js";
export {
  WeightPickerButton,
  WeightPickerProps,
} from "./imodel-components-react/lineweight/WeightPickerButton.js";

export {
  Cube,
  CubeProps,
  Face,
} from "./imodel-components-react/navigationaids/Cube.js";
export {
  CubeNavigationAid,
  CubeNavigationAidProps,
  CubeNavigationHitBoxX,
  CubeNavigationHitBoxY,
  CubeNavigationHitBoxZ,
} from "./imodel-components-react/navigationaids/CubeNavigationAid.js";
export {
  DrawingNavigationAid,
  DrawingNavigationAidProps,
} from "./imodel-components-react/navigationaids/DrawingNavigationAid.js";

export {
  FormatPanel,
  FormatPanelProps,
} from "./imodel-components-react/quantityformat/FormatPanel.js";
export {
  FormatPrecision,
  FormatPrecisionProps,
} from "./imodel-components-react/quantityformat/FormatPrecision.js";
export {
  FormatSample,
  FormatSampleProps,
} from "./imodel-components-react/quantityformat/FormatSample.js";
export {
  FormatTypeOption,
  FormatTypeOptionProps,
} from "./imodel-components-react/quantityformat/FormatType.js";
export {
  FormatUnitLabel,
  FormatUnitLabelProps,
} from "./imodel-components-react/quantityformat/FormatUnitLabel.js";
export {
  FormatUnits,
  FormatUnitsProps,
} from "./imodel-components-react/quantityformat/FormatUnits.js";
export {
  MiscFormatOptions,
  MiscFormatOptionsProps,
} from "./imodel-components-react/quantityformat/MiscFormatOptions.js";
export {
  QuantityFormatPanel,
  QuantityFormatPanelProps,
} from "./imodel-components-react/quantityformat/QuantityFormatPanel.js";

export {
  AnimationFractionChangeHandler,
  PlaybackSettings,
  PlaybackSettingsChangeHandler,
  SolarDataProvider,
  SolarPlaybackProgressHandler,
  TimelineDataProvider,
  TimelineDateDisplay,
  TimelinePausePlayAction,
  TimelinePausePlayArgs,
  TimelineScale,
} from "./imodel-components-react/timeline/interfaces.js";
export { BaseTimelineDataProvider } from "./imodel-components-react/timeline/BaseTimelineDataProvider.js";
export {
  TimelineComponent,
  TimelineComponentProps,
  TimelineDateMarkerProps,
  TimelineMenuItemOption,
  TimelineMenuItemProps,
} from "./imodel-components-react/timeline/TimelineComponent.js";
export { SolarTimeline } from "./imodel-components-react/timeline/SolarTimeline.js";
export { BaseSolarDataProvider } from "./imodel-components-react/timeline/BaseSolarDataProvider.js";

export {
  ViewStateProp,
  ViewportComponent,
  ViewportProps,
} from "./imodel-components-react/viewport/ViewportComponent.js";
export {
  ViewportComponentEvents,
  CubeRotationChangeEvent,
  CubeRotationChangeEventArgs,
  DrawingViewportChangeEvent,
  DrawingViewportChangeEventArgs,
  StandardRotationChangeEvent,
  StandardRotationChangeEventArgs,
  ViewClassFullNameChangedEvent,
  ViewClassFullNameChangedEventArgs,
  ViewIdChangedEvent,
  ViewIdChangedEventArgs,
  ViewRotationChangeEvent,
  ViewRotationChangeEventArgs,
} from "./imodel-components-react/viewport/ViewportComponentEvents.js";

export { ToolUtilities } from "./imodel-components-react/ToolUtilities.js";

// #region "SideEffects"

import { StandardEditorNames, StandardTypeNames } from "@itwin/appui-abstract";
import { PropertyEditorManager } from "@itwin/components-react";
import { ColorPropertyEditor } from "./imodel-components-react/editors/ColorEditor.js";
import { WeightPropertyEditor } from "./imodel-components-react/editors/WeightEditor.js";

PropertyEditorManager.registerEditor(
  StandardTypeNames.Number,
  ColorPropertyEditor,
  StandardEditorNames.ColorPicker
);
PropertyEditorManager.registerEditor(
  StandardTypeNames.Number,
  WeightPropertyEditor,
  StandardEditorNames.WeightPicker
);

// #endregion "SideEffects"

/** @docs-package-description
 * The imodel-components-react package contains React components that depend on the core-frontend, core-common or core-quantity packages.
 * The components pertain to Color, Cube, LineWeight, Navigation Aids, Quantity Inputs, Timeline and Viewport.
 */
/**
 * @docs-group-description Color
 * Classes and components for working with and picking a Color.
 */
/**
 * @docs-group-description Common
 * Common classes used across various UI components.
 */
/**
 * @docs-group-description Cube
 * Component for 3D Cube.
 */
/**
 * @docs-group-description Inputs
 * Input Components that format and parse input for IModelApps.
 */
/**
 * @docs-group-description LineWeight
 * Classes and components for working with and picking a Line Weight.
 */
/**
 * @docs-group-description NavigationAids
 * Classes and components for working with Navigation Aids.
 */
/**
 * @docs-group-description PropertyEditors
 * Classes and components for working with Property Editors.
 */
/**
 * @docs-group-description QuantityFormat
 * Classes and components for working with a Quantity Formats.
 */
/**
 * @docs-group-description Timeline
 * Classes and components that provide a timeline
 */
/**
 * @docs-group-description Viewport
 * Classes and components for working with a Viewport.
 */
