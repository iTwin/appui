/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useActiveFrontstageDef } from "@itwin/appui-react";

export function useWidgetDef(id: string) {
  const frontstageDef = useActiveFrontstageDef();
  return frontstageDef?.findWidgetDef(id);
}

// Copy of View Attribute Widget with logs for mounting and unmounting
export function PopoutMountUnmountWidgetComponent() {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("POPOUT COMPONENT MOUNT");
    return () => {
      // eslint-disable-next-line no-console
      console.log("POPOUT COMPONENT UNMOUNT");
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        overflowY: "auto",
      }}
    >
      Mount Unmount Widget
    </div>
  );
}
