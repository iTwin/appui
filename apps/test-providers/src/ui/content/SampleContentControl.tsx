/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { ConfigurableCreateInfo, ContentControl } from "@itwin/appui-react";
import "./SampleContentControl.scss";
import { Flex } from "@itwin/itwinui-react";

// eslint-disable-next-line @typescript-eslint/no-deprecated
export class SampleContentControl extends ContentControl {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  constructor(info: ConfigurableCreateInfo, options: any) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    super(info, options);
    this.reactNode = (
      <div className="test-content-container">
        <Flex justifyContent="center">Hello World!</Flex>
      </div>
    );
  }
}
