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
import { Icon } from "@itwin/core-react";
import type { CommonProps, IconSpec } from "@itwin/core-react";
import * as React from "react";
import { UiFramework } from "../UiFramework";
import { SnapModePanel } from "../layout/footer/snap-mode/Panel";
import { Snap } from "../layout/footer/snap-mode/Snap";
import { useTranslation } from "../hooks/useTranslation";
import { useReduxFrameworkState } from "../uistate/useReduxFrameworkState";
import { Button } from "@itwin/itwinui-react";
import { StatusBarPopover } from "../statusbar/popup/StatusBarPopover";

/** Define the properties that will be used to represent the available snap modes. */
interface SnapModeFieldEntry {
  label: string;
  value: number;
  iconName: string;
}

// eslint-disable-next-line deprecation/deprecation
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
 * Return the number of snap active in the bitmask.
 */
function getSnapCount(snapMode: SnapMode): number {
  return Object.values(SnapMode).reduce<number>((count, snap) => {
    if (typeof snap === "number" && snap & snapMode) {
      // Check if the snap is present in the bitmask.
      count++;
    }
    return count;
  }, 0);
}

/** Return icon class name for a specific snapMode. */
const getSnapModeIconNameFromMode = (
  modeEntries: SnapModeFieldEntry[],
  snapMode: number
) => {
  for (const modeEntry of modeEntries) {
    if (modeEntry.value === snapMode) return modeEntry.iconName;
  }

  if (snapMode > 0) return "snaps-multione";

  return "placeholder";
};

/** Defines properties supported by the SnapMode Field Component. */
// eslint-disable-next-line deprecation/deprecation
interface SnapModeFieldProps extends CommonProps {
  /** The list of snap supported by the app. Default to all the modes.
   */
  snapModes?: SnapMode[];
  /** Uses redux store as a fallback. Defaults to {@link SnapMode.NearestKeypoint}.
   * @note Enum flags are supported.
   */
  snapMode?: SnapMode;
  onChange?: (newSnapMode: SnapMode) => void;
}

/** `SnapModeField` component designed to be specified in a status bar. It will
 * display the active snap mode that AccuSnap will use and allow the user to select a new snap mode.
 * @public
 */
export function SnapModeField(props: SnapModeFieldProps) {
  const { translate } = useTranslation();
  const reduxSnapMode = useReduxFrameworkState(
    // eslint-disable-next-line deprecation/deprecation
    (state) => state?.configurableUiState.snapMode
  );

  const snapModeChoices = props.snapModes ?? [];
  let snapMode = props.snapMode ?? reduxSnapMode ?? SnapMode.NearestKeypoint;

  let snapModes: SnapModeFieldEntry[] = [
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

  if (snapModeChoices.length > 0) {
    // Remove all snap mode not present in snapModeChoices.
    snapModes = snapModes.filter((snapModeFieldEntry) =>
      snapModeChoices.includes(snapModeFieldEntry.value)
    );
    if (
      (!props.snapMode || !snapModeChoices.includes(props.snapMode)) &&
      !snapModeChoices.includes(SnapMode.NearestKeypoint)
    ) {
      // The default snap mode have been filtered out. Default to the first one.
      snapMode = snapModeChoices[0];
    }
  }

  const iconName = getSnapModeIconNameFromMode(snapModes, snapMode);

  const title = translate("snapModeField.snapMode");
  return (
    <StatusBarPopover
      content={
        <SnapModePanel title={title}>
          {snapModes.map((item, index) => (
            <Snap
              key={`SM_${index}`}
              onClick={() => {
                if (props.onChange) {
                  props.onChange(item.value);
                  return;
                }
                // Bitwise XOR. Toggles the value in the bitmask. Allows multiple snap modes to be active at the same time.
                const snapModeMask = snapMode ^ item.value;
                // Checking for zero ensures that at least one mode remain active at all times.
                if (snapModeMask !== 0) {
                  // eslint-disable-next-line deprecation/deprecation
                  UiFramework.setAccudrawSnapMode(snapModeMask);
                }
              }}
              isActive={(snapMode & item.value) === item.value}
              icon={
                // eslint-disable-next-line deprecation/deprecation
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
          getSnapCount(snapMode) > 1 ? (
            // eslint-disable-next-line deprecation/deprecation
            <Icon iconSpec={snapModeKeypoint} />
          ) : (
            // eslint-disable-next-line deprecation/deprecation
            <Icon iconSpec={getIconFromIconName(iconName)} />
          )
        }
      >
        {title}
        <StatusBarPopover.ExpandIndicator />
      </Button>
    </StatusBarPopover>
  );
}
