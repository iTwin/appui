/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

import "./DefaultDialogGridContainer.scss";
import classnames from "classnames";
import * as React from "react";
import { ToolSettingsContentContext } from "../widgets/ToolSettingsContent.js";
import type { ComponentGenerator } from "./ComponentGenerator.js";
import { LockProvider } from "../editors/LockProvider.js";

enum LayoutMode {
  Wide = 0,
  Narrow = 1,
}

/**
 * Component to provide grid of property editors
 * @public
 */
export function ToolSettingsGridContainer({
  componentGenerator,
}: {
  componentGenerator: ComponentGenerator;
}) {
  const { availableContentWidth } = React.useContext(
    ToolSettingsContentContext
  );
  const layoutMode = toLayoutMode(availableContentWidth);
  const className = classnames(
    "uifw-tool-settings-grid-container",
    LayoutMode.Narrow === layoutMode && "uifw-default-narrow"
  );
  return (
    <DialogGridContainer
      componentGenerator={componentGenerator}
      containerClassName={className}
    />
  );
}

interface DialogGridContainerProps {
  componentGenerator: ComponentGenerator;
  containerClassName?: string;
}

/** @internal */
export function DialogGridContainer({
  componentGenerator,
  containerClassName,
}: DialogGridContainerProps) {
  const className = classnames("uifw-default-container", containerClassName);
  return (
    <div className={className}>
      {componentGenerator.uiDataProvider.rows.map((row, index) => (
        <LockProvider key={index}>
          {componentGenerator.getRow(row, index)}
        </LockProvider>
      ))}
    </div>
  );
}

/** DefaultDialogGridContainer populates a React node with the items specified by the UiLayoutDataProvider
 * @public
 */
export function DefaultDialogGridContainer({
  componentGenerator,
  isToolSettings,
}: {
  componentGenerator: ComponentGenerator;
  isToolSettings?: boolean;
}) {
  return !!isToolSettings ? (
    <ToolSettingsGridContainer componentGenerator={componentGenerator} />
  ) : (
    <DialogGridContainer componentGenerator={componentGenerator} />
  );
}

const toLayoutMode = (width: number) => {
  return width < 250 && width > 0 ? LayoutMode.Narrow : LayoutMode.Wide;
};
