/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  SvgCheckmark,
  SvgSearch,
  SvgVisibilityHalf,
  SvgVisibilityHide,
  SvgVisibilityShow,
} from "@itwin/itwinui-icons-react";
import { IconButton, Tabs, ToggleSwitch } from "@itwin/itwinui-react";

export function WidgetLayout(props: React.PropsWithChildren<{}>) {
  return <div style={{ padding: "0.5em" }}>{props.children}</div>;
}

WidgetLayout.Tools = Tools;
WidgetLayout.Tabs = WidgetTabs;

function Tools() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <IconButton styleType="borderless">
          <SvgVisibilityShow />
        </IconButton>
        <IconButton styleType="borderless">
          <SvgVisibilityHide />
        </IconButton>
        <IconButton styleType="borderless">
          <SvgVisibilityHalf />
        </IconButton>
      </div>
      <IconButton styleType="borderless">
        <SvgSearch />
      </IconButton>
    </div>
  );
}

function WidgetTabs() {
  return (
    <Tabs type="pill" labels={["Pill tab 1", "Pill tab 2"]}>
      <ToggleSwitch label="Toggle feature No.1" icon={<SvgCheckmark />} />
      <ToggleSwitch checked={true} disabled label="This you cannot change" />
      <ToggleSwitch label="Toggle feature No.2" />
    </Tabs>
  );
}
