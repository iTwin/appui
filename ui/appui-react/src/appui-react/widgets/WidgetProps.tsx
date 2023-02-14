/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { AbstractWidgetProps } from "@itwin/appui-abstract";

/** Properties of a Widget.
 * @public // TODO: 4.x cleanup
 */
export interface CommonWidgetProps extends Readonly<AbstractWidgetProps> { // eslint-disable-line deprecation/deprecation
  /** Id used to uniquely identify the widget. */
  readonly id: string;
}
