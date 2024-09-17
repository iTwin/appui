/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { UiFramework } from "@itwin/appui-react";

export function useActiveContentId() {
  const [activeId, setActiveId] = React.useState(
    UiFramework.content.getActiveId()
  );
  React.useEffect(() => {
    return UiFramework.content.onActiveContentChangedEvent.addListener(
      (args) => {
        setActiveId(args.id);
      }
    );
  }, []);
  return activeId;
}
