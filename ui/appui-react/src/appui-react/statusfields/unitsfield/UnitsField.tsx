/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import "./UnitsField.scss";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { SvgLightbulbHollow } from "@itwin/itwinui-icons-react";
import type { SelectOption } from "@itwin/itwinui-react";
import { IconButton, List, ListItem } from "@itwin/itwinui-react";
import { TitleBar } from "../../layout/footer/dialog/TitleBar";
import { StatusBar } from "../../statusbar/StatusBar";
import { FooterIndicator } from "../../layout/footer/Indicator";
import { IModelApp } from "@itwin/core-frontend";
import type { UnitSystemKey } from "@itwin/core-quantity";

/** Props for [[UnitsField]].
 * @internal
 */
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

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      !buttonRef.current ||
      !(e.target instanceof Node) ||
      buttonRef.current.contains(e.target)
    )
      return;

    setIsOpen(false);
  };

  const handleUnitsChange = async (value: string) => {
    setUnits(value);
    await IModelApp.quantityFormatter.setActiveUnitSystem(
      value as UnitSystemKey
    );
    setIsOpen(false);
  };

  return (
    <>
      <div title={label} className="nz-footer-units-field">
        <FooterIndicator className="units-indicator">
          <IconButton
            className="units-button"
            styleType="borderless"
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
          >
            <SvgLightbulbHollow />
          </IconButton>
        </FooterIndicator>
      </div>
      <StatusBar.Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOutsideClick={handleOutsideClick}
        target={buttonRef.current}
      >
        <TitleBar title={title}></TitleBar>
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
      </StatusBar.Popup>
    </>
  );
}
