/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { API, FileInfo } from "jscodeshift";
import { AttributeHandle, chain, configToObjectExpression, extractExpression, handleAsStagePanel, handleAsToolWidget, handleJSXElement, rename } from "./Utils/jsxElementAttributeHandles";


export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const frontstageAttrHandles = new Map<string | undefined, AttributeHandle | null>([
    ["key", null],
    ["id", extractExpression],
    ["version", extractExpression],
    ["defaultTool", null],
    ["contentGroup", extractExpression],
    ["isInFooterMode", null],
    ["usage", extractExpression],
    ["applicationData", null],
    ["contentManipulationTools", chain(rename("contentManipulation"), extractExpression, handleAsToolWidget())],
    ["viewNavigationTools", chain(rename("viewNavigation"), extractExpression, handleAsToolWidget())],
    ["toolSettings", chain(extractExpression, handleAsToolWidget())],
    ["statusBar", chain(extractExpression, handleAsToolWidget())],
    ["leftPanel", chain(extractExpression, handleAsStagePanel())],
    ["topPanel", chain(extractExpression, handleAsStagePanel())],
    ["rightPanel", chain(extractExpression, handleAsStagePanel())],
    ["bottomPanel", chain(extractExpression, handleAsStagePanel())],
  ]);

  const frontstages = root.findJSXElements("Frontstage");
  frontstages.forEach((frontstage) => {
    const configProps = handleJSXElement(j, frontstage, frontstageAttrHandles);

    const obj = configToObjectExpression(j, configProps);
    frontstage.replace(obj);
  });

  return root.toSource({ trailingComma: true });
}
