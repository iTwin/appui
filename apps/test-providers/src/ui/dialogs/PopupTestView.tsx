/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  CursorMenuItemProps,
  FloatingViewportContent,
  UiFramework,
  useActiveIModelConnection,
} from "@itwin/appui-react";

import "./PopupTestView.scss";
import ViewDefinitionSelector, {
  getViewDefinitions,
} from "../components/ViewDefinitionSelector.js";
import { Id64String } from "@itwin/core-bentley";
import { Button } from "@itwin/itwinui-react";
import { ScreenViewport } from "@itwin/core-frontend";

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
  const viewportRef = React.useRef<ScreenViewport>(null);

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
          {/* eslint-disable-next-line deprecation/deprecation */}
          <FloatingViewportContent
            contentId={contentId}
            initialViewState={initialViewState}
            onContextMenu={handleContextMenu}
            viewportRef={viewportRef}
          />
        </div>
      )}
      <Button
        onClick={() => {
          viewportRef?.current?.openToolTip("Test tooltip", { x: 100, y: 50 });
        }}
      >
        Open tooltip
      </Button>
    </div>
  );
}
