/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ConfigurableCreateInfo, ContentControl } from "@itwin/appui-react";

export interface ReactContentControlOptions {
  node: React.ReactNode;
}

export class ReactContentControl extends ContentControl {
  constructor(
    info: ConfigurableCreateInfo,
    options: ReactContentControlOptions
  ) {
    super(info, options);

    this.reactNode = options.node;
  }
}
