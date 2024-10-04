/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./DisplayStyleField.scss";
import classnames from "classnames";
import * as React from "react";
import { Id64String } from "@itwin/core-bentley";
import {
  DisplayStyle2dState,
  DisplayStyle3dState,
  DisplayStyleState,
  IModelApp,
  ScreenViewport,
} from "@itwin/core-frontend";
import { Select, SelectOption } from "@itwin/itwinui-react";
import { CommonProps } from "@itwin/core-react";
import { useTranslation } from "../../useTranslation.js";

/** This component is designed to be specified in a status bar definition to select the display style in the active IModel view.
 * It is used to enable/disable display of shadows.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function DisplayStyleField(props: CommonProps) {
  const { translate } = useTranslation();
  const [viewport, setViewport] = React.useState<ScreenViewport | undefined>();
  const [displayStyles, setDisplayStyles] = React.useState(
    () => new Map<Id64String, DisplayStyleState>()
  );
  const [styleEntries, setStyleEntries] = React.useState<
    SelectOption<string>[]
  >(() => []);
  const [displayStyleId, setDisplayStyleId] = React.useState("");

  const setStateFromViewport = React.useCallback(
    async (newViewport?: ScreenViewport) => {
      if (!newViewport) return;

      const newDisplayStyles = new Map<Id64String, DisplayStyleState>();
      const is3d = newViewport.view.is3d();
      const sqlName = is3d
        ? DisplayStyle3dState.classFullName
        : DisplayStyle2dState.classFullName;
      const displayStyleProps = await newViewport.iModel.elements.queryProps({
        from: sqlName,
        where: "IsPrivate=FALSE",
      });
      const newStyleEntries: SelectOption<string>[] = [];
      let emptyNameSuffix = 0;
      for (const displayStyleProp of displayStyleProps) {
        let name = displayStyleProp.code.value!;
        if (name.length === 0) {
          emptyNameSuffix++;
          const unnamedPrefix = translate("statusFields.unnamedDisplayStyle");
          name = `${unnamedPrefix}-${emptyNameSuffix}`;
        }
        newStyleEntries.push({ value: displayStyleProp.id!, label: name });
        let displayStyle: DisplayStyleState;
        if (is3d)
          displayStyle = new DisplayStyle3dState(
            displayStyleProp,
            newViewport.iModel
          );
        else
          displayStyle = new DisplayStyle2dState(
            displayStyleProp,
            newViewport.iModel
          );
        newDisplayStyles.set(displayStyleProp.id!, displayStyle);
      }

      setDisplayStyles(newDisplayStyles);
      setStyleEntries(newStyleEntries);
      setViewport(newViewport);
      setDisplayStyleId(newViewport.view.displayStyle.id);
    },
    [translate]
  );
  React.useEffect(() => {
    void setStateFromViewport(IModelApp.viewManager.selectedView);
    return IModelApp.viewManager.onSelectedViewportChanged.addListener(
      (args) => {
        void setStateFromViewport(args.current);
      }
    );
  }, [setStateFromViewport]);

  const handleDisplayStyleSelected = React.useCallback(
    async (newValue: string) => {
      if (!viewport) return;

      const style = displayStyles.get(newValue)!.clone();
      if (!style) return;
      await style.load();
      viewport.displayStyle = style;
      viewport.invalidateScene();
      viewport.synchWithView();
      setDisplayStyleId(newValue);
    },
    [displayStyles, viewport]
  );

  if (!viewport) return null;
  return (
    <Select
      options={styleEntries}
      value={displayStyleId}
      onChange={handleDisplayStyleSelected}
      title={translate("statusFields.displayStyle.tooltip")}
      aria-label={translate("statusFields.displayStyle.label")}
      className={classnames(
        "uifw-statusFields-displayStyle-selector",
        props.className
      )}
      style={props.style}
      size="small"
    />
  );
}
