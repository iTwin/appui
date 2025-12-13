/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import type { ConditionalValue } from "../shared/ConditionalValue.js";

type PanelType = "information" | "dynamic" | (string & {});

interface CommonPanel {
  /** Unique identifier of the panel. */
  readonly id: string;
  /** Content of the panel. */
  readonly content: React.ReactNode;
  /** Type of the panel. */
  readonly type?: PanelType;
  readonly label?: string | ConditionalValue<string | undefined>;
}

interface InformationPanel extends CommonPanel {
  readonly type: "information";
}

/** @internal */
export interface DynamicPanel extends CommonPanel {
  readonly type: "dynamic";
  readonly placement: "left" | "right" | (string & {});
}

/** Describes the data needed to provide a panel.
 * @public
 */
export type Panel = CommonPanel | InformationPanel | DynamicPanel;

/** @internal */
export function isDynamicPanel(panel: Panel): panel is DynamicPanel {
  return panel.type === "dynamic";
}
