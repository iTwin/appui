/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import {
  UiFramework,
  WidgetState,
  useActiveFrontstageDef,
  FrontstageDef,
  WidgetDef,
} from "@itwin/appui-react";
import { CommonProps } from "@itwin/core-react";
import { List, ListItem } from "@itwin/itwinui-react";

export function WidgetsInfo(props: CommonProps) {
  const frontstageDef = useActiveFrontstageDef();
  const widgetDefs = useWidgetDefs(frontstageDef);
  React.useEffect(() => {
    return UiFramework.frontstages.onWidgetStateChangedEvent.addListener(
      (args) =>
        console.log(
          "onWidgetStateChangedEvent",
          args.widgetDef.id,
          args.widgetState
        )
    );
  }, []);
  return (
    <List
      style={{
        position: "absolute",
        top: "4em",
        right: "0.5em",
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: 8,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.36)",
        ...props.style,
      }}
    >
      {widgetDefs.map((widgetDef) => (
        <WidgetInfo key={widgetDef.id} widgetDef={widgetDef} />
      ))}
    </List>
  );
}

interface WidgetInfoProps extends CommonProps {
  widgetDef: WidgetDef;
}

function WidgetInfo({ widgetDef }: WidgetInfoProps) {
  const id = widgetDef.id;
  const [state, setState] = React.useState(widgetDef.state);
  React.useEffect(() => {
    return UiFramework.frontstages.onWidgetStateChangedEvent.addListener(
      (args) => {
        if (args.widgetDef.id !== id) return;
        setState(args.widgetState);
      }
    );
  }, [id]);
  return (
    <ListItem>
      <ListItem.Content>
        {widgetDef.id}
        <ListItem.Description>{widgetDef.label}</ListItem.Description>
      </ListItem.Content>
      {WidgetState[state]}
    </ListItem>
  );
}

function getWidgetDefs(frontstageDef: FrontstageDef | undefined) {
  if (!frontstageDef) return [];
  return [...frontstageDef.widgetDefs];
}

function useWidgetDefs(frontstageDef: FrontstageDef | undefined) {
  const [widgets] = React.useState(() => getWidgetDefs(frontstageDef));
  return widgets;
}
