/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { StatusBarComposer } from "@itwin/appui-react";

export function StatusBarComposerStory(
  props: React.ComponentProps<typeof StatusBarComposer>
) {
  return (
    <div style={{ height: "36px", display: "flex" }}>
      <StatusBarComposer {...props} />
    </div>
  );
}
