/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import "./AccuDrawFieldContainer.scss";
import classnames from "classnames";
import * as React from "react";
import type { ColorDef } from "@itwin/core-common";
import type { ScreenViewport } from "@itwin/core-frontend";
import { CompassMode, IModelApp, ItemField } from "@itwin/core-frontend";
import type { CommonProps, UiStateStorage } from "@itwin/core-react";
import { Orientation } from "@itwin/core-react";
import { getCSSColorFromDef } from "@itwin/imodel-components-react";

import { AccuDrawInputField } from "./AccuDrawInputField";
import { FrameworkAccuDraw } from "./FrameworkAccuDraw";
import type { AccuDrawUiSettings } from "./AccuDrawUiSettings";
import angleIconSvg from "./angle.svg";
import distanceIconSvg from "./distance.svg";
import { UiFramework } from "../UiFramework";

/** Properties for [[AccuDrawFieldContainer]] component
 * @beta
 */
// eslint-disable-next-line deprecation/deprecation
export interface AccuDrawFieldContainerProps extends CommonProps {
  /** Orientation of the fields */
  orientation: Orientation;
  /** Optional parameter for persistent UI settings. Defaults to LocalStateStorage. */
  uiSettingsStorage?: UiStateStorage;
  /** @internal */
  showZOverride?: boolean;
}

let AccuDrawContainerIndex = 0;

function determineShowZ(vp?: ScreenViewport): boolean {
  const showZ = vp !== undefined ? vp.view.is3d() : false;
  return showZ;
}

const defaultXLabel = "X";
const defaultYLabel = "Y";
const defaultZLabel = "Z";

/** AccuDraw Ui Field Container displays [[AccuDrawInputField]] for each field
 * @beta
 */
export function AccuDrawFieldContainer(props: AccuDrawFieldContainerProps) {
  const {
    className,
    style,
    orientation,
    uiSettingsStorage,
    showZOverride,
    ...otherProps
  } = props;

  const [containerIndex] = React.useState(() => ++AccuDrawContainerIndex);
  const xInputRef = React.useRef<HTMLInputElement>(null);
  const yInputRef = React.useRef<HTMLInputElement>(null);
  const zInputRef = React.useRef<HTMLInputElement>(null);
  const angleInputRef = React.useRef<HTMLInputElement>(null);
  const distanceInputRef = React.useRef<HTMLInputElement>(null);
  const focusField = React.useRef<ItemField | undefined>(undefined);
  const [mode, setMode] = React.useState(() => IModelApp.accuDraw.compassMode);
  const [xLock, setXLock] = React.useState(() =>
    IModelApp.accuDraw.getFieldLock(ItemField.X_Item)
  );
  const [yLock, setYLock] = React.useState(() =>
    IModelApp.accuDraw.getFieldLock(ItemField.Y_Item)
  );
  const [zLock, setZLock] = React.useState(() =>
    IModelApp.accuDraw.getFieldLock(ItemField.Z_Item)
  );
  const [angleLock, setAngleLock] = React.useState(() =>
    IModelApp.accuDraw.getFieldLock(ItemField.ANGLE_Item)
  );
  const [distanceLock, setDistanceLock] = React.useState(() =>
    IModelApp.accuDraw.getFieldLock(ItemField.DIST_Item)
  );
  const [showZ, setShowZ] = React.useState(true);

  const [uiSettings, setUiSettings] = React.useState<
    AccuDrawUiSettings | undefined
  >(FrameworkAccuDraw.uiStateStorage);
  React.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawUiSettingsChangedEvent.addListener(
      () => {
        setUiSettings(FrameworkAccuDraw.uiStateStorage);
      }
    );
  }, []);

  const getFieldInput = (field: ItemField) => {
    switch (field) {
      case ItemField.X_Item:
        return getCurrent(xInputRef);
      case ItemField.Y_Item:
        return getCurrent(yInputRef);
      case ItemField.Z_Item:
        return getCurrent(zInputRef);
      case ItemField.ANGLE_Item:
        return getCurrent(angleInputRef);
      case ItemField.DIST_Item:
        return getCurrent(distanceInputRef);
    }
  };

  const getInputToFocus = React.useCallback((field: ItemField | undefined) => {
    const fieldInput = field === undefined ? undefined : getFieldInput(field);
    if (fieldInput) {
      if (document.activeElement === fieldInput) return undefined;
      return fieldInput;
    }

    const focusedInput = [
      xInputRef,
      yInputRef,
      zInputRef,
      angleInputRef,
      distanceInputRef,
    ].find((inputRef) => document.activeElement === inputRef.current);

    // One of AccuDraw input fields is focused already.
    if (focusedInput) return undefined;

    // Focus one of fallback fields.
    let fallbackInput = getFieldInput(ItemField.DIST_Item);
    if (fallbackInput) return fallbackInput;

    fallbackInput = getFieldInput(ItemField.X_Item);
    return fallbackInput;
  }, []);

  // Moves focus to `field` input if not focused OR fallbacks to default field if none of accudraw fields are focused.
  const setFocusToField = React.useCallback(
    (field: ItemField | undefined) => {
      const input = getInputToFocus(field);
      if (!input) return;

      input.focus();
      input.select();
    },
    [getInputToFocus]
  );

  React.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawSetFieldLockEvent.addListener((args) => {
      switch (args.field) {
        case ItemField.X_Item:
          setXLock(args.lock);
          break;
        case ItemField.Y_Item:
          setYLock(args.lock);
          break;
        case ItemField.Z_Item:
          setZLock(args.lock);
          break;
        case ItemField.ANGLE_Item:
          setAngleLock(args.lock);
          break;
        case ItemField.DIST_Item:
          setDistanceLock(args.lock);
          break;
      }
    });
  }, []);

  React.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawSetFieldFocusEvent.addListener(
      (args) => {
        focusField.current = args.field;
        setFocusToField(focusField.current);
      }
    );
  }, [setFocusToField]);

  React.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawGrabInputFocusEvent.addListener(() => {
      setFocusToField(focusField.current);
    });
  }, [setFocusToField]);

  React.useEffect(() => {
    return FrameworkAccuDraw.onAccuDrawSetCompassModeEvent.addListener(
      (args) => {
        setMode(args.mode);
      }
    );
  }, []);

  const handleValueChanged = React.useCallback(
    (field: ItemField, stringValue: string) => {
      FrameworkAccuDraw.setFieldValueFromUi(field, stringValue);
    },
    []
  );

  const handleEscPressed = React.useCallback(() => {
    UiFramework.keyboardShortcuts.setFocusToHome();
  }, []);

  React.useEffect(() => {
    setShowZ(
      showZOverride || determineShowZ(IModelApp.viewManager.selectedView)
    );

    return IModelApp.viewManager.onSelectedViewportChanged.addListener(
      (args) => {
        setShowZ(determineShowZ(args.current));
      }
    );
  }, [showZOverride]);

  const createFieldStyle = (
    inStyle: React.CSSProperties | undefined,
    backgroundColor: ColorDef | string | undefined,
    foregroundColor: ColorDef | string | undefined
  ): React.CSSProperties | undefined => {
    let fieldStyle: React.CSSProperties | undefined;
    let rgbaString = "";
    if (inStyle || backgroundColor || foregroundColor) {
      fieldStyle = inStyle ? inStyle : {};
      if (backgroundColor) {
        rgbaString =
          typeof backgroundColor === "string"
            ? backgroundColor
            : getCSSColorFromDef(backgroundColor);
        fieldStyle = { ...fieldStyle, backgroundColor: rgbaString };
      }
      if (foregroundColor) {
        rgbaString =
          typeof foregroundColor === "string"
            ? foregroundColor
            : getCSSColorFromDef(foregroundColor);
        fieldStyle = { ...fieldStyle, color: rgbaString };
      }
    }
    return fieldStyle;
  };

  const xStyle = React.useMemo(() => {
    if (!uiSettings) return undefined;
    return createFieldStyle(
      uiSettings.xStyle,
      uiSettings.xBackgroundColor,
      uiSettings.xForegroundColor
    );
  }, [uiSettings]);
  const yStyle = React.useMemo(() => {
    if (!uiSettings) return undefined;
    return createFieldStyle(
      uiSettings.yStyle,
      uiSettings.yBackgroundColor,
      uiSettings.yForegroundColor
    );
  }, [uiSettings]);
  const zStyle = React.useMemo(() => {
    if (!uiSettings) return undefined;
    return createFieldStyle(
      uiSettings.zStyle,
      uiSettings.zBackgroundColor,
      uiSettings.zForegroundColor
    );
  }, [uiSettings]);
  const angleStyle = React.useMemo(() => {
    if (!uiSettings) return undefined;
    return createFieldStyle(
      uiSettings.angleStyle,
      uiSettings.angleBackgroundColor,
      uiSettings.angleForegroundColor
    );
  }, [uiSettings]);
  const distanceStyle = React.useMemo(() => {
    if (!uiSettings) return undefined;
    return createFieldStyle(
      uiSettings.distanceStyle,
      uiSettings.distanceBackgroundColor,
      uiSettings.distanceForegroundColor
    );
  }, [uiSettings]);
  const xLabel = uiSettings?.xLabel ?? defaultXLabel;
  const yLabel = uiSettings?.yLabel ?? defaultYLabel;
  const zLabel = uiSettings?.zLabel ?? defaultZLabel;
  const angleLabel = uiSettings?.angleLabel;
  const distanceLabel = uiSettings?.distanceLabel;

  const classNames = classnames(
    "uifw-accudraw-field-container",
    orientation === Orientation.Vertical ? "uifw-vertical" : "uifw-horizontal",
    className
  );

  const delay = 250;
  const labelCentered =
    xLabel !== undefined &&
    xLabel.length === 1 &&
    yLabel !== undefined &&
    yLabel.length === 1 &&
    zLabel !== undefined &&
    zLabel.length === 1;

  return (
    <div className={classNames} style={style} {...otherProps}>
      {mode === CompassMode.Rectangular && (
        <>
          <AccuDrawInputField
            ref={xInputRef}
            isLocked={xLock}
            className="uifw-accudraw-x-value"
            style={xStyle}
            field={ItemField.X_Item}
            id={`uifw-accudraw-x-${containerIndex}`}
            data-testid="uifw-accudraw-x"
            label={xLabel}
            // eslint-disable-next-line deprecation/deprecation
            iconSpec={uiSettings?.xIcon}
            icon={uiSettings?.xIconNode}
            labelCentered={labelCentered}
            valueChangedDelay={delay}
            onValueChanged={(stringValue) =>
              handleValueChanged(ItemField.X_Item, stringValue)
            }
            onEscPressed={handleEscPressed}
          />
          <AccuDrawInputField
            ref={yInputRef}
            isLocked={yLock}
            className="uifw-accudraw-y-value"
            style={yStyle}
            field={ItemField.Y_Item}
            id={`uifw-accudraw-y-${containerIndex}`}
            data-testid="uifw-accudraw-y"
            label={yLabel}
            // eslint-disable-next-line deprecation/deprecation
            iconSpec={uiSettings?.yIcon}
            icon={uiSettings?.yIconNode}
            labelCentered={labelCentered}
            valueChangedDelay={delay}
            onValueChanged={(stringValue) =>
              handleValueChanged(ItemField.Y_Item, stringValue)
            }
            onEscPressed={handleEscPressed}
          />
          {showZ && (
            <AccuDrawInputField
              ref={zInputRef}
              isLocked={zLock}
              className="uifw-accudraw-z-value"
              style={zStyle}
              field={ItemField.Z_Item}
              id={`uifw-accudraw-z-${containerIndex}`}
              data-testid="uifw-accudraw-z"
              label={zLabel}
              // eslint-disable-next-line deprecation/deprecation
              iconSpec={uiSettings?.zIcon}
              icon={uiSettings?.zIconNode}
              labelCentered={labelCentered}
              valueChangedDelay={delay}
              onValueChanged={(stringValue) =>
                handleValueChanged(ItemField.Z_Item, stringValue)
              }
              onEscPressed={handleEscPressed}
            />
          )}
        </>
      )}
      {mode === CompassMode.Polar && (
        <>
          <AccuDrawInputField
            ref={distanceInputRef}
            isLocked={distanceLock}
            className="uifw-accudraw-distance-value"
            style={distanceStyle}
            field={ItemField.DIST_Item}
            id={`uifw-accudraw-distance-${containerIndex}`}
            data-testid="uifw-accudraw-distance"
            label={distanceLabel}
            // eslint-disable-next-line deprecation/deprecation
            iconSpec={uiSettings?.distanceIcon ?? distanceIconSvg}
            icon={uiSettings?.distanceIconNode}
            valueChangedDelay={delay}
            onValueChanged={(stringValue) =>
              handleValueChanged(ItemField.DIST_Item, stringValue)
            }
            onEscPressed={handleEscPressed}
          />
          <AccuDrawInputField
            ref={angleInputRef}
            isLocked={angleLock}
            className="uifw-accudraw-angle-value"
            style={angleStyle}
            field={ItemField.ANGLE_Item}
            id={`uifw-accudraw-angle-${containerIndex}`}
            data-testid="uifw-accudraw-angle"
            label={angleLabel}
            // eslint-disable-next-line deprecation/deprecation
            iconSpec={uiSettings?.angleIcon ?? angleIconSvg}
            icon={uiSettings?.angleIconNode}
            valueChangedDelay={delay}
            onValueChanged={(stringValue) =>
              handleValueChanged(ItemField.ANGLE_Item, stringValue)
            }
            onEscPressed={handleEscPressed}
          />
        </>
      )}
    </div>
  );
}

function getCurrent<T>(ref: React.RefObject<T>) {
  if (ref.current === null) return undefined;
  return ref.current;
}
