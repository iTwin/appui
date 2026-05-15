/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ConfigurableUi
 */

import * as React from "react";
import type { StagePanelSection } from "../stagepanels/StagePanelSection.js";
import type { StagePanelLocation } from "../stagepanels/StagePanelLocation.js";
import { ConfigurableUiContext } from "./ConfigurableUiContent.js";
import { WidgetPanelsFrontstage } from "../widget-panels/Frontstage.js";
import { CursorInformation } from "../cursor/CursorInformation.js";
import { CursorPopupMenu } from "../cursor/cursormenu/CursorMenu.js";
import { CursorPopupRenderer } from "../cursor/cursorpopup/CursorPopupManager.js";
import { ModalDialogRenderer } from "../dialog/ModalDialogManager.js";
import { ModelessDialogRenderer } from "../dialog/ModelessDialogManager.js";
import { ElementTooltip } from "../feedback/ElementTooltip.js";
import { KeyboardShortcutMenu } from "../keyboardshortcut/KeyboardShortcutMenu.js";
import { InputFieldMessage } from "../messages/InputField.js";
import { PointerMessage } from "../messages/Pointer.js";
import { PopupRenderer } from "../popup/PopupManager.js";
import { ContentDialogRenderer } from "../dialog/ContentDialogManager.js";
import { appUi, UiFramework } from "../UiFramework.js";
import { InternalConfigurableUiManager } from "./InternalConfigurableUiManager.js";
import { MessageRenderer } from "../messages/MessageRenderer.js";
import {
  TOOLBAR_OPACITY_DEFAULT,
  WIDGET_OPACITY_DEFAULT,
} from "../theme/ThemeId.js";
import { useReduxFrameworkState } from "../uistate/useReduxFrameworkState.js";
import { ChildWindowRenderer } from "../childwindow/ChildWindowRenderer.js";
import { useActiveIModelConnection } from "../hooks/useActiveIModelConnection.js";
import { EditorsRegistryProvider } from "@itwin/components-react";
import {
  IModelConnectionProvider,
  QuantityEditorSpec,
} from "@itwin/imodel-components-react";
import { ThemeProvider } from "@itwin/itwinui-react";
import { Point } from "@itwin/core-react/internal";
import { WrapperContext } from "./ConfigurableUiContent.js";

interface ToolSettingsLocation {
  section: StagePanelSection;
  location: StagePanelLocation;
}

/** Properties for [[CondensedLayout]].
 * @alpha
 */
export interface CondensedLayoutProps {
  /** Overrides widget specific actions displayed in the title bar area.
   * @alpha
   */
  widgetActions?: React.ReactNode;
  /** When enabled keeps the tool settings visible to the end user.
   * @alpha
   */
  visibleToolSettings?: boolean;
  /** Tool settings related configuration.
   * @alpha
   */
  toolSettings?: {
    /** The default location of the tool settings.
     * @alpha
     */
    defaultLocation?: ToolSettingsLocation;
  };
  /** Content rendered in a reserved zone between the widget panels, overlaying the main content area.
   * @alpha
   */
  contentOverlay?: React.ReactNode;
}

const defaultEditors = [QuantityEditorSpec];

/**
 * A condensed layout variant that eliminates wasted whitespace by rendering the status bar as
 * floating pills at the bottom of the center area and tool settings as a collapsible overlay
 * at the top center. The `contentOverlay` prop allows an iframe parent to reserve space at the
 * top of the content area.
 *
 * Use this as the `layout` prop on a frontstage configuration:
 * ```tsx
 * const frontstage = {
 *   ...config,
 *   layout: <CondensedLayout />,
 * };
 * ```
 * @alpha
 */
export function CondensedLayout(props: CondensedLayoutProps) {
  const {
    widgetActions,
    visibleToolSettings = false,
    toolSettings,
    contentOverlay,
  } = props;
  const context = React.useContext(ConfigurableUiContext);
  const {
    appBackstage,
    widgetOpacity,
    toolbarOpacity,
    idleTimeout,
    intervalTimeout,
  } = context;

  const contentElementRef = React.useRef<HTMLElement>(null);
  useWidgetOpacity(widgetOpacity);
  useToolbarOpacity(toolbarOpacity);
  const [mainElement, setMainElement] = React.useState<HTMLElement>();
  const [portalContainer, setPortalContainer] = React.useState<HTMLElement>();
  React.useEffect(() => {
    UiFramework.keyboardShortcuts.setFocusToHome();
  }, []);

  React.useEffect(() => {
    InternalConfigurableUiManager.activityTracker.initialize({
      idleTimeout,
      intervalTimeout,
    });
    return () => {
      InternalConfigurableUiManager.activityTracker.terminate();
    };
  }, [idleTimeout, intervalTimeout]);
  useVisibleToolSettings(visibleToolSettings);

  return (
    <ConfigurableUiContext.Provider
      value={React.useMemo(
        () => ({
          ...context,
          contentElementRef,
          widgetActions,
          toolSettings,
          contentOverlay,
          statusBarOverlay: true,
        }),
        [context, widgetActions, toolSettings, contentOverlay]
      )}
    >
      <main
        role="main"
        id="uifw-configurableui-wrapper"
        className={context.className}
        style={context.style}
        onMouseMove={(e) => {
          const point = new Point(e.pageX, e.pageY);
          CursorInformation.handleMouseMove(point, e.view.document);
        }}
        ref={(el) => setMainElement(el ?? undefined)}
      >
        <WrapperContext.Provider value={mainElement ?? document.body}>
          <ThemeProvider
            style={{ height: "100%" }}
            portalContainer={portalContainer}
          >
            <IModelProvider>
              <EditorsRegistryProvider editors={defaultEditors}>
                {appBackstage}
                <WidgetPanelsFrontstage />

                <PointerMessage />
                {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
                <KeyboardShortcutMenu />
                {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
                <InputFieldMessage />
                <CursorPopupMenu />
                <CursorPopupRenderer />
                <PopupRenderer />
                <ElementTooltip />
                <MessageRenderer />
                <ChildWindowRenderer windowManager={appUi.windowManager} />
                <div
                  className="uifw-configurableui-portalContainer"
                  ref={(instance) => setPortalContainer(instance ?? undefined)}
                >
                  <ContentDialogRenderer />
                  <ModelessDialogRenderer />
                  <ModalDialogRenderer />
                </div>
              </EditorsRegistryProvider>
            </IModelProvider>
          </ThemeProvider>
        </WrapperContext.Provider>
      </main>
    </ConfigurableUiContext.Provider>
  );
}

function IModelProvider({ children }: React.PropsWithChildren) {
  const iModelConnection = useActiveIModelConnection();
  if (!iModelConnection) return <>{children}</>;
  return (
    <IModelConnectionProvider iModelConnection={iModelConnection}>
      {children}
    </IModelConnectionProvider>
  );
}

function useWidgetOpacity(widgetOpacity: number | undefined) {
  const reduxWidgetOpacity = useReduxFrameworkState((state) => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return state?.configurableUiState.widgetOpacity;
  });
  const opacity = widgetOpacity ?? reduxWidgetOpacity ?? WIDGET_OPACITY_DEFAULT;

  React.useEffect(() => {
    const currentWidgetOpacity =
      document.documentElement.style.getPropertyValue("--buic-widget-opacity");
    if (currentWidgetOpacity === opacity.toString()) return;
    document.documentElement.style.setProperty(
      "--buic-widget-opacity",
      opacity.toString()
    );
    return () => {
      document.documentElement.style.removeProperty("--buic-widget-opacity");
    };
  }, [opacity]);
}

function useToolbarOpacity(toolbarOpacity: number | undefined) {
  const reduxToolbarOpacity = useReduxFrameworkState((state) => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return state?.configurableUiState.toolbarOpacity;
  });
  const opacity =
    toolbarOpacity ?? reduxToolbarOpacity ?? TOOLBAR_OPACITY_DEFAULT;
  React.useEffect(() => {
    const currentToolbarOpacity =
      document.documentElement.style.getPropertyValue("--buic-toolbar-opacity");
    if (currentToolbarOpacity === opacity.toString()) return;
    document.documentElement.style.setProperty(
      "--buic-toolbar-opacity",
      opacity.toString()
    );
    return () => {
      document.documentElement.style.removeProperty("--buic-toolbar-opacity");
    };
  }, [opacity]);
}

function useVisibleToolSettings(visibleToolSettings: boolean) {
  React.useEffect(() => {
    if (!visibleToolSettings) return;
    return UiFramework.frontstages.onToolSettingsReloadEvent.addListener(() => {
      const frontstage = UiFramework.frontstages.activeFrontstageDef;
      const toolSettings = frontstage?.toolSettings;
      if (!toolSettings) return;
      toolSettings.show();
    });
  }, [visibleToolSettings]);
}
