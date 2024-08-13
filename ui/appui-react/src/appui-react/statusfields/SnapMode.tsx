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
import type { CommonProps } from "@itwin/core-react";
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
  iconSpec: string;
}

// Field entry of all possible snap modes.
const allSnapModeFieldEntries: SnapModeFieldEntry[] = [
    {
      label: "snapModeField.keypoint",
      value: SnapMode.NearestKeypoint as number,
      iconSpec: snapModeKeypoint,
    },
    {
      label: "snapModeField.intersection",
      value: SnapMode.Intersection as number,
      iconSpec: snapModeIntersection,
    },
    {
      label: "snapModeField.center",
      value: SnapMode.Center as number,
      iconSpec: snapModeCenter,
    },
    {
      label: "snapModeField.nearest",
      value: SnapMode.Nearest as number,
      iconSpec: snapModeNearest,
    },
    {
      label: "snapModeField.origin",
      value: SnapMode.Origin as number,
      iconSpec: snapModeOrigin,
    },
    {
      label: "snapModeField.midpoint",
      value: SnapMode.MidPoint as number,
      iconSpec: snapModeMidpoint,
    },
    {
      label: "snapModeField.bisector",
      value: SnapMode.Bisector as number,
      iconSpec: snapModeBisector,
    },
  ];

/** Return the number of snap active in the bitmask. */
function getSnapCount(snapMode: SnapMode): number {
  return Object.values(SnapMode).reduce<number>((count, snap) => {
    if (typeof snap === "number" && snap & snapMode) {
      // Check if the snap is present in the bitmask.
      count++;
    }
    return count;
  }, 0);
}

/** Defines properties supported by the SnapMode Field Component. */
// eslint-disable-next-line deprecation/deprecation
interface SnapModeFieldProps extends CommonProps {
  /** The list of snap modes displayed in the status bar. Default to all the modes.*/
  availableSnapModes?: SnapMode[];
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
  // The snap modes displayed in the menu.
  const snapModeEntries : SnapModeFieldEntry[] = allSnapModeFieldEntries.filter((entry)=>{
    if(props.availableSnapModes && props.availableSnapModes.length > 0){
      // Filter out the snap modes that are not available.
      return props.availableSnapModes.some(availableSnap => availableSnap === entry.value as SnapMode);
    }
    return true;
  });

  // The state of the snap mode(s) clicked/toggled by the user.
  const reduxSnapMode = useReduxFrameworkState(
    // eslint-disable-next-line deprecation/deprecation
    (state) => state?.configurableUiState.snapMode
  );

  // The current snap mode(s) active. It's a bitmask, so multiple modes can be active simultaneousely.
  const snapMode =
  // Use the snap mode overriden via props, if available.
  (props.snapMode && snapModeEntries.some(entry => entry.value === props.snapMode as number)) ? props.snapMode :
  // Use the snap mode stored in redux.
  reduxSnapMode ? reduxSnapMode :
  // Default to Keypoint, if available.
  (snapModeEntries.some(entry => entry.value === SnapMode.NearestKeypoint as number)) ? SnapMode.NearestKeypoint :
  // Default to the first entry in the menu.
  snapModeEntries[0].value;

  // eslint-disable-next-line deprecation/deprecation
  let endIcon = <Icon iconSpec={snapModeKeypoint} />;
  if(getSnapCount(snapMode) === 1){
    const singleEntry = snapModeEntries.find(entry => (entry.value & snapMode) === entry.value);
    if(singleEntry && singleEntry.iconSpec){
      // eslint-disable-next-line deprecation/deprecation
      endIcon = <Icon iconSpec={singleEntry.iconSpec} />;
    }
  }
  const title = translate("snapModeField.snapMode");
  return (
    <StatusBarPopover
      content={
        <SnapModePanel title={title}>
          {snapModeEntries.map((entry, index) => (
            <Snap
              key={`SM_${index}`}
              onClick={() => {
                if (props.onChange) {
                  props.onChange(entry.value);
                  return;
                }
                // Bitwise XOR. Toggles the value in the bitmask. Allows multiple snap modes to be active at the same time.
                const snapModeMask = snapMode ^ entry.value;
                // Checking for zero ensures that at least one mode remain active at all times.
                if (snapModeMask !== 0) {
                  // eslint-disable-next-line deprecation/deprecation
                  UiFramework.setAccudrawSnapMode(snapModeMask);
                }
              }}
              isActive={(snapMode & entry.value) === entry.value}
              icon={
                // eslint-disable-next-line deprecation/deprecation
                <Icon
                  className={`icon`}
                  iconSpec={entry.iconSpec}
                />
              }
            >
              {translate(entry.label)}
            </Snap>
          ))}
        </SnapModePanel>
      }
    >
      <Button
        styleType="borderless"
        title={title}
        endIcon={endIcon}
      >
        {title}
        <StatusBarPopover.ExpandIndicator />
      </Button>
    </StatusBarPopover>
  );
}
