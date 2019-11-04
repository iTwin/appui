/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Tree */

import { Observable, Subscription } from "./Observable";
import { CheckBoxState } from "@bentley/ui-core";

/**
 * Tree events listener used to listen and handle tree events.
 * @alpha
 */
export interface TreeEvents {
  onNodeExpanded?(event: TreeNodeEvent): void;
  onNodeCollapsed?(event: TreeNodeEvent): void;

  onSelectionModified?(event: TreeSelectionModificationEvent): Subscription | undefined;
  onSelectionReplaced?(event: TreeSelectionReplacementEvent): Subscription | undefined;

  onCheckboxStateChanged?(event: TreeCheckboxStateChangeEvent): Subscription | undefined;
}

/**
 * Data structure that describes tree node event payload.
 * @alpha
 */
export interface TreeNodeEvent {
  nodeId: string;
}

/**
 * Data structure that describes tree selection modification event payload.
 * @alpha
 */
export interface TreeSelectionModificationEvent {
  modifications: Observable<TreeSelectionChange>;
}

/**
 * Data structure that describes tree selection change.
 * @alpha
 */
export interface TreeSelectionChange {
  selectedNodeIds: string[];
  deselectedNodeIds: string[];
}

/**
 * Data structure that describes tree selection replacement event payload.
 * @alpha
 */
export interface TreeSelectionReplacementEvent {
  replacements: Observable<{ selectedNodeIds: string[] }>;
}

/**
 * Data structure that describes tree checkbox state change event payload.
 * @alpha
 */
export interface TreeCheckboxStateChangeEvent {
  stateChanges: Observable<CheckboxStateChange[]>;
}

/**
 * Data structure that describes checkbox state change.
 * @alpha
 */
export interface CheckboxStateChange {
  nodeId: string;
  newState: CheckBoxState;
}
