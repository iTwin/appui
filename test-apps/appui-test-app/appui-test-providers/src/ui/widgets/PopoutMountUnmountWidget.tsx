/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

export function PopoutMountUnmountWidgetComponent() {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("POPOUT COMPONENT MOUNT");
    return () => {
      // eslint-disable-next-line no-console
      console.log("POPOUT COMPONENT UNMOUNT");
    };
  }, []);

  return <div>Mount Unmount Widget</div>;
}
