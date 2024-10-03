/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import type { IImageLoader, LoadedImage } from "../common/IImageLoader.js";
import type { TreeNodeItem } from "./TreeDataProvider.js";

/** Interface for a tree image loader
 * @public
 */
export interface ITreeImageLoader extends IImageLoader {
  load: (item: TreeNodeItem) => LoadedImage | undefined;
}

/** Default image loader for the tree
 * @public
 */
export class TreeImageLoader implements ITreeImageLoader {
  /** Loads image data from either [[TreeNodeItem]] */
  public load(item: TreeNodeItem): LoadedImage | undefined {
    if (!item.icon) return undefined;

    return {
      sourceType: "webfont-icon",
      value: item.icon,
    };
  }
}
