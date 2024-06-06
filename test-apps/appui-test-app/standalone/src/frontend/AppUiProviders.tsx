/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
  UiItemsProvider,
  useToggleCameraViewToolbarItem,
} from "@itwin/appui-react";

export function AppUiProviders({ children }: React.PropsWithChildren<{}>) {
  const toggleCameraView = useToggleCameraViewToolbarItem();
  const provider = React.useMemo<UiItemsProvider>(() => {
    return {
      id: "wip",
      getToolbarItems: () => {
        return [
          {
            ...toggleCameraView,
            layouts: {
              standard: {
                orientation: ToolbarOrientation.Vertical,
                usage: ToolbarUsage.ViewNavigation,
              },
            },
          },
        ];
      },
    };
  }, [toggleCameraView]);
  React.useEffect(() => {
    UiItemsManager.register(provider);
    return () => UiItemsManager.unregister(provider.id);
  }, [provider]);
  return <>{children}</>;
}
