/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { ToolList } from "@itwin/core-frontend";
import type { IMatch } from "../utils/matchesWords";

/** @public */
export namespace Keyin {
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
   * @internal
   */
  export enum KeyinFieldLocalization {
    /** Include only non-localized key-in strings. */
    NonLocalized,
    /** Include only localized key-in strings. */
    Localized,
    /** Include localized and non-localized strings for each key-in. */
    Both,
  }
}

/**
 * Parses a given ToolList for its tools keyins, filtering based on a KeyinFieldLocalization value.
 * @internal
 */
export function getKeyinsFromToolList(toolList: ToolList, localizedKeyinPreference: Keyin.KeyinFieldLocalization = Keyin.KeyinFieldLocalization.NonLocalized): Keyin.KeyinEntry[] {
  const toolKeyins: Keyin.KeyinEntry[] = [];
  for (const tool of toolList) {
    switch (localizedKeyinPreference) {
      case Keyin.KeyinFieldLocalization.Localized:
        toolKeyins.push({ value: tool.keyin });
        break;
      case Keyin.KeyinFieldLocalization.Both:
        toolKeyins.push({ value: tool.keyin });
        // istanbul ignore else
        if (tool.keyin === tool.englishKeyin) break;
      // istanbul ignore next
      default: // eslint-disable-line no-fallthrough
      case Keyin.KeyinFieldLocalization.NonLocalized:
        // istanbul ignore next
        if (
          Keyin.KeyinFieldLocalization.NonLocalized ===
          localizedKeyinPreference ||
          (Keyin.KeyinFieldLocalization.Both === localizedKeyinPreference &&
            tool.englishKeyin !== tool.keyin)
        )
          toolKeyins.push({ value: tool.englishKeyin });
        break;
    }
  }

  return toolKeyins;
}
