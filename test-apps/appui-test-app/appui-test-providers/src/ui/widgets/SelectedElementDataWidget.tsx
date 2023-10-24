/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
  UiFramework,
  useSpecificWidgetDef,
  WidgetState,
} from "@itwin/appui-react";
import { Centered } from "@itwin/core-react";
import * as React from "react";

/** Hook used to return ids from selected element */
export function useIdOfSelectedElements() {
  const [locatedIds, setLocatedIds] = React.useState<string[]>([
    ...(UiFramework.getIModelConnection()?.selectionSet.elements ?? []),
  ]);

  React.useEffect(() => {
    const iModel = UiFramework.getIModelConnection();
    return iModel?.selectionSet.onChanged.addListener((ev) => {
      const selection = ev.set;
      const selectIds = Array.from(selection.elements);
      setLocatedIds(selectIds);
    });
  }, []);

  return locatedIds;
}

export function SelectedElementDataWidgetComponent() {
  const idList = useIdOfSelectedElements();
  const widgetDef = useSpecificWidgetDef(
    "appui-test-providers:elementDataListWidget"
  );

  React.useEffect(() => {
    // using setTimeout to give time for frontstage to load before calling setWidgetState
    if (idList.length === 0) {
      setTimeout(() => widgetDef?.setWidgetState(WidgetState.Hidden));
    } else {
      setTimeout(() => widgetDef?.setWidgetState(WidgetState.Open));
    }
  }, [idList, widgetDef]);

  if (0 === idList.length) {
    return (
      <Centered>
        <p className="center-text">Select element/elements</p>
      </Centered>
    );
  }
  return (
    <Centered>
      <p className="center-text">{idList.length} element(s) selected</p>
    </Centered>
  );
}
