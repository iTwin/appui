/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { connect } from "react-redux";
import { SnapMode } from "@itwin/core-frontend";
import { Snap, SnapModePanel } from "@itwin/appui-layout-react";
import { UiFramework } from "../UiFramework";
import type { CommonProps, IconSpec } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { StatusBarLabelIndicator } from "../statusbar/LabelIndicator";
import snapModeKeypoint from "@bentley/icons-generic/icons/snaps.svg";
import snapModeIntersection from "@bentley/icons-generic/icons/snaps-intersection.svg";
import snapModeCenter from "@bentley/icons-generic/icons/snaps-center.svg";
import snapModeNearest from "@bentley/icons-generic/icons/snaps-nearest.svg";
import snapModeOrigin from "@bentley/icons-generic/icons/snaps-origin.svg";
import snapModeMidpoint from "@bentley/icons-generic/icons/snaps-midpoint.svg";
import snapModeBisector from "@bentley/icons-generic/icons/snaps-bisector.svg";

// cSpell:ignore multione

/** Defines properties supported by the SnapMode Field Component.
 */
interface SnapModeFieldProps extends CommonProps {
  snapMode: number;
}

/** Define the properties that will be used to represent the available snap modes. */
interface SnapModeFieldEntry {
  label: string;
  value: number;
  iconName: string;
}

function getIconFromIconName(iconName: string): IconSpec {
  let iconSpec = snapModeKeypoint;
  switch (iconName) {
    case "snaps":
      iconSpec = snapModeKeypoint;
      break;
    case "snaps-intersection":
      iconSpec = snapModeIntersection;
      break;
    case "snaps-center":
      iconSpec = snapModeCenter;
      break;
    case "snaps-nearest":
      iconSpec = snapModeNearest;
      break;
    case "snaps-origin":
      iconSpec = snapModeOrigin;
      break;
    case "snaps-midpoint":
      iconSpec = snapModeMidpoint;
      break;
    case "snaps-bisector":
      iconSpec = snapModeBisector;
      break;
  }
  return iconSpec;
}

/**
 * Snap Mode Field React component. This component is designed to be specified in a status bar definition. It will
 * display the active snap mode that AccuSnap will use and allow the user to select a new snap mode.
 */
function SnapModeFieldComponent(props: SnapModeFieldProps) {
  const snapModes: SnapModeFieldEntry[] = React.useMemo(
    () => [
      {
        label: UiFramework.translate("snapModeField.keypoint"),
        value: SnapMode.NearestKeypoint as number,
        iconName: "snaps",
      },
      {
        label: UiFramework.translate("snapModeField.intersection"),
        value: SnapMode.Intersection as number,
        iconName: "snaps-intersection",
      },
      {
        label: UiFramework.translate("snapModeField.center"),
        value: SnapMode.Center as number,
        iconName: "snaps-center",
      },
      {
        label: UiFramework.translate("snapModeField.nearest"),
        value: SnapMode.Nearest as number,
        iconName: "snaps-nearest",
      },
      {
        label: UiFramework.translate("snapModeField.origin"),
        value: SnapMode.Origin as number,
        iconName: "snaps-origin",
      },
      {
        label: UiFramework.translate("snapModeField.midpoint"),
        value: SnapMode.MidPoint as number,
        iconName: "snaps-midpoint",
      },
      {
        label: UiFramework.translate("snapModeField.bisector"),
        value: SnapMode.Bisector as number,
        iconName: "snaps-bisector",
      },
    ],
    []
  );

  /** Return icon class name for a specific snapMode. */
  const getSnapModeIconNameFromMode = React.useCallback(
    function (snapMode: number): string {
      for (const mode of snapModes) {
        if (mode.value === snapMode) return mode.iconName;
      }

      /* istanbul ignore else */
      if (snapMode > 0) return "snaps-multione";

      /* istanbul ignore next */
      return "placeholder";
    },
    [snapModes]
  );

  const title = UiFramework.translate("snapModeField.snapMode");
  return (
    <StatusBarLabelIndicator
      iconSpec={getIconFromIconName(
        getSnapModeIconNameFromMode(props.snapMode)
      )}
      title={title}
      label={title}
      popup={
        <SnapModePanel title={title}>
          {snapModes.map((item, index) => (
            <Snap
              key={`SM_${index}`}
              onClick={() => UiFramework.setAccudrawSnapMode(item.value)}
              isActive={(props.snapMode & item.value) === item.value}
              icon={
                <Icon
                  className={`icon`}
                  iconSpec={getIconFromIconName(item.iconName)}
                />
              }
            >
              {item.label}
            </Snap>
          ))}
        </SnapModePanel>
      }
    />
  );
}

/** Function used by Redux to map state data in Redux store to props that are used to render this component. */
function mapStateToProps(state: any) {
  const frameworkState = state[UiFramework.frameworkStateKey]; // since app sets up key, don't hard-code name
  /* istanbul ignore next */
  if (!frameworkState) return undefined;

  return { snapMode: frameworkState.configurableUiState.snapMode };
}

// we declare the variable and export that rather than using export default.
/**
 * Snap Mode Field React component. This component is designed to be specified in a status bar definition. It will
 * display the active snap mode that AccuSnap will use and allow the user to select a new snap mode.
 * This Field React component is Redux connected.
 * @public
 */
export const SnapModeField = connect(mapStateToProps)(SnapModeFieldComponent);
