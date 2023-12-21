/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useThisWidget, WidgetState } from "@itwin/appui-react";
import { Button } from "@itwin/itwinui-react";

export function UseThisWidgetHookWidget() {
  const thisWidget = useThisWidget();
  const thisWidgetText = JSON.stringify(thisWidget);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {thisWidgetText}
      </div>
      <Button onClick={() => thisWidget.setState(WidgetState.Closed)}>
        Set Closed
      </Button>
      <Button onClick={() => thisWidget.setState(WidgetState.Open)}>
        Set Open
      </Button>
      <Button onClick={() => thisWidget.setState(WidgetState.Hidden)}>
        Set Hidden
      </Button>
      <Button onClick={() => thisWidget.setState(WidgetState.Unloaded)}>
        Set Unloaded
      </Button>
    </div>
  );
}
