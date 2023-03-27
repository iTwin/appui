/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { FileInfo, API, Options } from "jscodeshift";
import { transformFrontstage } from "../utils/TransformFrontstage";
import { transformStagePanel } from "../utils/TransformStagePanel";
import { transformWidget } from "../utils/TransformWidget";
import { transformZone } from "../utils/TransformZone";

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.findJSXElements("Widget").forEach((widget) => {
    const widgetConfig = transformWidget(j, widget);
    widget.replace(widgetConfig);
  });
  root.findJSXElements("Zone").forEach((zone) => {
    const zoneConfig = transformZone(j, zone);
    zone.replace(zoneConfig);
  });
  root.findJSXElements("StagePanel").forEach((stagePanel) => {
    const stagePanelConfig = transformStagePanel(j, stagePanel);
    stagePanel.replace(stagePanelConfig);
  });
  root.findJSXElements("Frontstage").forEach((frontstage) => {
    const frontstageConfig = transformFrontstage(j, frontstage);
    frontstage.replace(frontstageConfig);
  });

  return root.toSource(options.printOptions);
}


