/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BriefcaseConnection,
  IModelApp,
  Viewport,
  ViewState,
} from "@itwin/core-frontend";

function updateEditorToolSettingsForIModelInViewport(viewport: Viewport) {
  const view = viewport.view;
  const iModel = view.iModel;

  if (!iModel.isBriefcaseConnection()) return;

  // Select first category if no category is selected.
  if (!iModel.editorToolSettings.category) {
    for (const catId of view.categorySelector.categories) {
      iModel.editorToolSettings.category = catId;
      break;
    }
  }

  // Select first or base model if no model is selected.
  if (!iModel.editorToolSettings.model) setDefaultModelAsActive(view, iModel);
}

function setDefaultModelAsActive(view: ViewState, iModel: BriefcaseConnection) {
  if (view.is2d()) {
    iModel.editorToolSettings.model = view.baseModelId;
    return;
  }

  if (view.isSpatialView()) {
    for (const modId of view.modelSelector.models) {
      iModel.editorToolSettings.model = modId;
      return;
    }
  }
}

/** @internal */
export function useEditorToolSettings() {
  React.useEffect(() => {
    return IModelApp.viewManager.onSelectedViewportChanged.addListener(
      (args) => {
        const viewport = args.current;
        viewport && updateEditorToolSettingsForIModelInViewport(viewport);
      }
    );
  }, []);
}
