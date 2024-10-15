/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import snapModeBisector from "../icons/snaps-bisector.svg";
import snapModeCenter from "../icons/snaps-center.svg";
import snapModeIntersection from "../icons/snaps-intersection.svg";
import snapModeMidpoint from "../icons/snaps-midpoint.svg";
import snapModeNearest from "../icons/snaps-nearest.svg";
import snapModeOrigin from "../icons/snaps-origin.svg";
import snapModeKeypoint from "../icons/snaps.svg";
import { SnapMode } from "@itwin/core-frontend";
import { Icon } from "@itwin/core-react";
import type { CommonProps } from "@itwin/core-react";
import * as React from "react";
import { UiFramework } from "../UiFramework.js";
import { SnapModePanel } from "../layout/footer/snap-mode/Panel.js";
import { Snap } from "../layout/footer/snap-mode/Snap.js";
import { useTranslation } from "../hooks/useTranslation.js";
import { useReduxFrameworkState } from "../uistate/useReduxFrameworkState.js";
import { Button } from "@itwin/itwinui-react";
import { StatusBarPopover } from "../statusbar/popup/StatusBarPopover.js";

/** Define the properties that will be used to represent the available snap modes. */
interface SnapModeFieldEntry {
  labelKey: string;
  value: number;
  iconSpec: string;
}

// Field entry of all possible snap modes.
const allSnapModeFieldEntries: SnapModeFieldEntry[] = [
  {
    labelKey: "snapModeField.keypoint",
    value: SnapMode.NearestKeypoint as number,
    iconSpec: snapModeKeypoint,
  },
  {
    labelKey: "snapModeField.intersection",
    value: SnapMode.Intersection as number,
    iconSpec: snapModeIntersection,
  },
  {
    labelKey: "snapModeField.center",
    value: SnapMode.Center as number,
    iconSpec: snapModeCenter,
  },
  {
    labelKey: "snapModeField.nearest",
    value: SnapMode.Nearest as number,
    iconSpec: snapModeNearest,
  },
  {
    labelKey: "snapModeField.origin",
    value: SnapMode.Origin as number,
    iconSpec: snapModeOrigin,
  },
  {
    labelKey: "snapModeField.midpoint",
    value: SnapMode.MidPoint as number,
    iconSpec: snapModeMidpoint,
  },
  {
    labelKey: "snapModeField.bisector",
    value: SnapMode.Bisector as number,
    iconSpec: snapModeBisector,
  },
];

/** Return icon for a specific snapMode. */
const getSnapModeIcon = (snapMode: number) => {
  // Get all the modes present in the bitmask.
  const modes: SnapModeFieldEntry[] = allSnapModeFieldEntries.filter(
    (entry) => {
      return (entry.value & snapMode) === entry.value;
    }
  );

  return (
    // eslint-disable-next-line deprecation/deprecation
    <Icon
      iconSpec={modes.length === 1 ? modes[0].iconSpec : snapModeKeypoint}
    />
  );
};

/** Defines properties supported by the SnapMode Field Component. */
// eslint-disable-next-line deprecation/deprecation
interface SnapModeFieldProps extends CommonProps {
  /** Uses redux store as a fallback. Defaults to {@link SnapMode.NearestKeypoint}.
   * @note Enum flags are supported.
   */
  snapMode?: SnapMode;
  /** The list of snap modes available for selection. Defaults to all the modes.*/
  availableSnapModes?: SnapMode[];
  onChange?: (newSnapMode: SnapMode) => void;
}

/** `SnapModeField` component designed to be specified in a status bar. It will
 * display the active snap mode that AccuSnap will use and allow the user to select a new snap mode.
 * @public
 */
export function SnapModeField(props: SnapModeFieldProps) {
  const { translate } = useTranslation();
  const snapModeEntries: SnapModeFieldEntry[] = props.availableSnapModes
    ? allSnapModeFieldEntries.filter((entry) => {
        return (
          props.availableSnapModes &&
          props.availableSnapModes.some(
            (availableSnap) => availableSnap === (entry.value as SnapMode)
          )
        );
      })
    : allSnapModeFieldEntries;

  const reduxSnapMode = useReduxFrameworkState(
    // eslint-disable-next-line deprecation/deprecation
    (state) => state?.configurableUiState.snapMode
  );
  const snapMode = props.snapMode ?? reduxSnapMode ?? SnapMode.NearestKeypoint;

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
                // eslint-disable-next-line deprecation/deprecation
                UiFramework.setAccudrawSnapMode(entry.value);
              }}
              isActive={(snapMode & entry.value) === entry.value}
              icon={
                // eslint-disable-next-line deprecation/deprecation
                <Icon className={`icon`} iconSpec={entry.iconSpec} />
              }
            >
              {translate(entry.labelKey)}
            </Snap>
          ))}
        </SnapModePanel>
      }
    >
      <Button
        styleType="borderless"
        title={title}
        endIcon={getSnapModeIcon(snapMode)}
      >
        {title}
        <StatusBarPopover.ExpandIndicator />
      </Button>
    </StatusBarPopover>
  );
}
