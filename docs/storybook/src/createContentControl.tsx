/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ConfigurableCreateInfo, ContentControl } from "@itwin/appui-react";

export function createContentControl(
  reactNode: React.ReactNode
): new (info: ConfigurableCreateInfo, options: any) => ContentControl {
  return class extends ContentControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactNode = reactNode;
    }
  };
}
