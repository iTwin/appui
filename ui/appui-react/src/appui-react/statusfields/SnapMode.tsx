/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import { SnapMode } from "@itwin/core-frontend";
import type { CommonProps } from "@itwin/core-react";
import * as React from "react";
import { UiFramework } from "../UiFramework.js";
import { SnapModePanel } from "../layout/footer/snap-mode/Panel.js";
import { Snap } from "../layout/footer/snap-mode/Snap.js";
import { useTranslation } from "../hooks/useTranslation.js";
import { useReduxFrameworkState } from "../uistate/useReduxFrameworkState.js";
import { Button, Icon } from "@itwin/itwinui-react";
import { StatusBarPopover } from "../statusbar/popup/StatusBarPopover.js";
import { SvgSnapsBisector } from "../icons/snaps/SvgSnapsBisector.js";
import { SvgSnapsCenter } from "../icons/snaps/SvgSnapsCenter.js";
import { SvgSnapsIntersection } from "../icons/snaps/SvgSnapsIntersection.js";
import { SvgSnapsMidpoint } from "../icons/snaps/SvgSnapsMidpoint.js";
import { SvgSnapsNearest } from "../icons/snaps/SvgSnapsNearest.js";
import { SvgSnapsOrigin } from "../icons/snaps/SvgSnapsOrigin.js";
import { SvgSnaps } from "../icons/snaps/SvgSnaps.js";

/** Define the properties that will be used to represent the available snap modes. */
interface SnapModeFieldEntry {
  labelKey: string;
  value: number;
  icon: React.ReactElement;
}

// Field entry of all possible snap modes.
const allSnapModeFieldEntries: SnapModeFieldEntry[] = [
  {
    labelKey: "snapModeField.keypoint",
    value: SnapMode.NearestKeypoint as number,
    icon: <SvgSnaps />,
  },
  {
    labelKey: "snapModeField.intersection",
    value: SnapMode.Intersection as number,
    icon: <SvgSnapsIntersection />,
  },
  {
    labelKey: "snapModeField.center",
    value: SnapMode.Center as number,
    icon: <SvgSnapsCenter />,
  },
  {
    labelKey: "snapModeField.nearest",
    value: SnapMode.Nearest as number,
    icon: <SvgSnapsNearest />,
  },
  {
    labelKey: "snapModeField.origin",
    value: SnapMode.Origin as number,
    icon: <SvgSnapsOrigin />,
  },
  {
    labelKey: "snapModeField.midpoint",
    value: SnapMode.MidPoint as number,
    icon: <SvgSnapsMidpoint />,
  },
  {
    labelKey: "snapModeField.bisector",
    value: SnapMode.Bisector as number,
    icon: <SvgSnapsBisector />,
  },
];

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

  // Get all the modes present in the bitmask.
  const enabledSnaps: SnapModeFieldEntry[] = allSnapModeFieldEntries.filter(
    (entry) => {
      return (entry.value & snapMode) === entry.value;
    }
  );

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
              icon={<Icon>{entry.icon}</Icon>}
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
        endIcon={
          enabledSnaps.length === 1 ? enabledSnaps[0].icon : <SvgSnaps />
        }
      >
        {title}
        <StatusBarPopover.ExpandIndicator />
      </Button>
    </StatusBarPopover>
  );
}
