/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 *  @module Tools
 */

import type { ToolList } from "@itwin/core-frontend";
import type { IMatch } from "../utils/matchesWords";
/**
 * Defines a keyin entry to show/filter in UI
 * @public
 */
export interface KeyinEntry {
  /** string that matched a filter string */
  value: string;
  /** define array of start and end positions of filter matches. */
  matches?: IMatch[];
  /** true if entry was loaded from key-in history */
  isHistory?: boolean;
}

/**
 * Controls whether localized and/or non-localized key-in strings appear in a KeyinField's auto-completion list.
 * @public
 */
export enum KeyinFieldLocalization {
  /** Include only non-localized key-in strings. */
  NonLocalized,
  /** Include only localized key-in strings. */
  Localized,
  /** Include localized and non-localized strings for each key-in. */
  Both,
}

/**
 * Parses a given ToolList for its tools keyins, filtering based on a KeyinFieldLocalization value.
 * @internal
 */
export function getKeyinsFromToolList(
  toolList: ToolList,
  localizedKeyinPreference: KeyinFieldLocalization = KeyinFieldLocalization.NonLocalized
): KeyinEntry[] {
  const toolKeyins: KeyinEntry[] = [];
  for (const tool of toolList) {
    switch (localizedKeyinPreference) {
      case KeyinFieldLocalization.Localized:
        toolKeyins.push({ value: tool.keyin });
        break;
      case KeyinFieldLocalization.Both:
        toolKeyins.push({ value: tool.keyin });
        if (tool.keyin === tool.englishKeyin) break;
      default: // eslint-disable-line no-fallthrough
      case KeyinFieldLocalization.NonLocalized:
        if (
          KeyinFieldLocalization.NonLocalized === localizedKeyinPreference ||
          (KeyinFieldLocalization.Both === localizedKeyinPreference &&
            tool.englishKeyin !== tool.keyin)
        )
          toolKeyins.push({ value: tool.englishKeyin });
        break;
    }
  }

  return toolKeyins;
}
