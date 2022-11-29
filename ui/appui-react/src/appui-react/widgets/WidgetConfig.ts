/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { AbstractWidgetProps } from "@itwin/appui-abstract";
import { IconProps } from "@itwin/core-react";
import { ConfigurableUiControlConstructor } from "../configurableui/ConfigurableUiControl";

/** Configuration from which a widget is created.
 * @public
 */
export interface WidgetConfig extends Omit<AbstractWidgetProps, "getWidgetContent" | "id">, IconProps {
  readonly id: string;
  /** if set, it is used to define a key that is used to look up a localized string. This value is used only if label is not explicitly set. */
  readonly labelKey?: string;
  /** if set, it is used to define a key that is used to look up a localized string. This value is used only if tooltip is not explicitly set. */
  readonly tooltipKey?: string;
  /** A [[WidgetControl]] providing information about the Widget. */
  readonly control?: ConfigurableUiControlConstructor;
  /** A React component for the Widget. */
  readonly element?: React.ReactNode;
  /** Control's class id */
  readonly classId?: string | ConfigurableUiControlConstructor;
  /** @alpha */
  readonly preferredPanelSize?: "fit-content";
}
