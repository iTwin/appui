/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { SvgLightbulbHollow } from "@itwin/itwinui-icons-react";
import {
  IconButton,
  List,
  ListItem,
  type SelectOption,
} from "@itwin/itwinui-react";
import { IModelApp } from "@itwin/core-frontend";
import type { UnitSystemKey } from "@itwin/core-quantity";
import { StatusBarDialog, StatusBarPopover } from "@itwin/appui-react";

/** Props for [[UnitsField]].
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
interface UnitsFieldProps extends CommonProps {
  label?: string;
  title: string;
  options: SelectOption<string>[];
}

/** Component used for setting the active unit system.
 * @internal
 */
export function UnitsField(props: UnitsFieldProps) {
  const { label, title, options } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [units, setUnits] = React.useState(
    IModelApp.quantityFormatter.activeUnitSystem as string
  );

  const handleUnitsChange = async (value: string) => {
    setUnits(value);
    await IModelApp.quantityFormatter.setActiveUnitSystem(
      value as UnitSystemKey
    );
    setIsOpen(false);
  };

  return (
    <StatusBarPopover
      visible={isOpen}
      onVisibleChange={setIsOpen}
      content={
        <>
          <StatusBarDialog.TitleBar title={title}></StatusBarDialog.TitleBar>
          <List>
            {options.map((option: SelectOption<string>) => (
              <ListItem
                actionable
                key={option.value}
                active={option.value === units}
                onClick={async () => handleUnitsChange(option.value)}
              >
                {option.label}
              </ListItem>
            ))}
          </List>
        </>
      }
    >
      <IconButton styleType="borderless" label={label}>
        <SvgLightbulbHollow />
        <StatusBarPopover.ExpandIndicator />
      </IconButton>
    </StatusBarPopover>
  );
}
