/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import snapModeBisector from "@bentley/icons-generic/icons/snaps-bisector.svg";
import snapModeCenter from "@bentley/icons-generic/icons/snaps-center.svg";
import snapModeIntersection from "@bentley/icons-generic/icons/snaps-intersection.svg";
import snapModeMidpoint from "@bentley/icons-generic/icons/snaps-midpoint.svg";
import snapModeNearest from "@bentley/icons-generic/icons/snaps-nearest.svg";
import snapModeOrigin from "@bentley/icons-generic/icons/snaps-origin.svg";
import snapModeKeypoint from "@bentley/icons-generic/icons/snaps.svg";
import { SnapMode } from "@itwin/core-frontend";
import type { CommonProps, IconSpec } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import * as React from "react";
import { connect } from "react-redux";
import { UiFramework } from "../UiFramework";
import { SnapModePanel } from "../layout/footer/snap-mode/Panel";
import { Snap } from "../layout/footer/snap-mode/Snap";
import { useTranslation } from "../hooks/useTranslation";
import { Button } from "@itwin/itwinui-react";
import { StatusBarPopover } from "../statusbar/popup/StatusBarPopover";

// cSpell:ignore multione

/** Defines properties supported by the SnapMode Field Component.
 */
// eslint-disable-next-line deprecation/deprecation
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
  const { translate } = useTranslation();

  const snapModes: SnapModeFieldEntry[] = [
    {
      label: translate("snapModeField.keypoint"),
      value: SnapMode.NearestKeypoint as number,
      iconName: "snaps",
    },
    {
      label: translate("snapModeField.intersection"),
      value: SnapMode.Intersection as number,
      iconName: "snaps-intersection",
    },
    {
      label: translate("snapModeField.center"),
      value: SnapMode.Center as number,
      iconName: "snaps-center",
    },
    {
      label: translate("snapModeField.nearest"),
      value: SnapMode.Nearest as number,
      iconName: "snaps-nearest",
    },
    {
      label: translate("snapModeField.origin"),
      value: SnapMode.Origin as number,
      iconName: "snaps-origin",
    },
    {
      label: translate("snapModeField.midpoint"),
      value: SnapMode.MidPoint as number,
      iconName: "snaps-midpoint",
    },
    {
      label: translate("snapModeField.bisector"),
      value: SnapMode.Bisector as number,
      iconName: "snaps-bisector",
    },
  ];

  /** Return icon class name for a specific snapMode. */
  const getSnapModeIconNameFromMode = (snapMode: number) => {
    for (const mode of snapModes) {
      if (mode.value === snapMode) return mode.iconName;
    }

    if (snapMode > 0) return "snaps-multione";

    return "placeholder";
  };

  const title = translate("snapModeField.snapMode");
  return (
    <StatusBarPopover
      content={
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
    >
      <Button
        styleType="borderless"
        title={title}
        endIcon={
          <Icon
            iconSpec={getIconFromIconName(
              getSnapModeIconNameFromMode(props.snapMode)
            )}
          />
        }
      >
        {title}
        <StatusBarPopover.ExpandIndicator />
      </Button>
    </StatusBarPopover>
  );
}

/** Function used by Redux to map state data in Redux store to props that are used to render this component. */
function mapStateToProps(state: any) {
  const frameworkState = state[UiFramework.frameworkStateKey]; // since app sets up key, don't hard-code name

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
