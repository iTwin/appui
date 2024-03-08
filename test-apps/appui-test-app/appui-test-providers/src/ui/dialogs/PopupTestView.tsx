/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  FloatingViewportContent,
  UiFramework,
  useActiveIModelConnection,
} from "@itwin/appui-react";

import "./PopupTestView.scss";
import ViewDefinitionSelector, {
  getViewDefinitions,
} from "../components/ViewDefinitionSelector";
import { Id64String } from "@itwin/core-bentley";
import { CursorMenuItemProps } from "@itwin/appui-react/lib/cjs/appui-react/shared/MenuItem";

export function PopupTestView({
  contentId,
  showViewPicker,
}: {
  contentId: string;
  showViewPicker?: boolean;
}) {
  const menuItems: CursorMenuItemProps[] = React.useMemo(() => {
    return [
      {
        id: "Item1",
        label: "Item ~1",
        icon: "icon-placeholder",
        submenu: [
          {
            id: "0",
            item: {
              label: "SubMenu Item ~1",
              icon: "icon-placeholder",
              execute: () => {},
            },
          },
          {
            id: "1",
            item: {
              label: "SubMenu Item ~2",
              icon: "icon-placeholder",
              execute: () => {},
            },
          },
        ],
      },
      {
        id: "Item2",
        item: { label: "Item ~2", icon: "icon-placeholder", execute: () => {} },
      },
      {
        id: "Item3",
        item: { label: "Item ~3", icon: "icon-placeholder", execute: () => {} },
      },
    ];
  }, []);

  const activeIModelConnection = useActiveIModelConnection();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [initialViewState, setInitialViewState] = React.useState(
    UiFramework.getDefaultViewState()
  );

  React.useEffect(() => {
    async function fetchView() {
      if (undefined === initialViewState && activeIModelConnection) {
        const definitions = await getViewDefinitions(activeIModelConnection);
        if (definitions && definitions.length) {
          const viewState = await activeIModelConnection.views.load(
            definitions[0].id
          );
          setInitialViewState(viewState);
        }
      }
    }
    void fetchView();
  }, [activeIModelConnection, initialViewState]);

  const onViewDefinitionChanged = React.useCallback(
    async (viewId?: Id64String) => {
      if (activeIModelConnection && viewId) {
        const viewState = await activeIModelConnection.views.load(viewId);
        setInitialViewState(viewState);
      }
    },
    [activeIModelConnection]
  );

  const handleContextMenu = React.useCallback(
    (e: React.MouseEvent): boolean => {
      e.preventDefault();
      UiFramework.openContextMenu(menuItems, { x: e.pageX, y: e.pageY });

      return false;
    },
    [menuItems]
  );

  return (
    <div
      ref={divRef}
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "100%",
        position: "relative",
        minWidth: "400px",
        minHeight: "300px",
      }}
    >
      {!!showViewPicker && initialViewState && (
        <div>
          <ViewDefinitionSelector
            imodel={initialViewState.iModel}
            selectedViewDefinition={initialViewState.id}
            onViewDefinitionSelected={onViewDefinitionChanged}
          />
        </div>
      )}
      {initialViewState && (
        <div>
          <FloatingViewportContent
            contentId={contentId}
            initialViewState={initialViewState}
            onContextMenu={handleContextMenu}
          />
        </div>
      )}
    </div>
  );
}
