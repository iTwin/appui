/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** Interface for icon menu search items */
export interface IconMenuSearch {
  type: "search";
}

/** Type for search expanded state tuple */
export type SearchExpandedState = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];
