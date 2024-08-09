/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "../../lib/webfont/bentley-icons-generic-webfont.css";
import "@itwin/itwinui-react/styles.css";
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import {
  ActionsUnion,
  createAction,
  DeepReadonly,
  FrameworkReducer,
  FrameworkRootState,
  SafeAreaContext,
  SafeAreaInsets,
  StateManager,
  SyncUiEventDispatcher,
  ThemeManager,
  UiFramework,
  UiStateStorageHandler,
} from "@itwin/appui-react";
import { ProcessDetector } from "@itwin/core-bentley";
import {
  BentleyCloudRpcManager,
  BentleyCloudRpcParams,
} from "@itwin/core-common";
import { ElectronApp } from "@itwin/core-electron/lib/cjs/ElectronFrontend";
import {
  AccuSnap,
  IModelApp,
  NativeAppLogger,
  NativeAppOpts,
  SnapMode,
  ViewClipByPlaneTool,
} from "@itwin/core-frontend";
import { getObjectClassName } from "@itwin/core-react";
import { TestAppConfiguration } from "../common/TestAppConfiguration";
import {
  AppPreviewFeatures,
  WidgetContentProvider,
} from "@itwin/appui-test-providers";
import { getUrlParam, usePreviewFeatureURLParams } from "./UrlParams";
import { AppLocalizationProvider } from "./Localization";

/** Action Ids used by redux and to send sync UI components. Typically used to refresh visibility or enable state of control.
 * Use lower case strings to be compatible with SyncUi processing.
 */
export enum SampleAppUiActionId {
  setTestProperty = "sampleapp:settestproperty",
  setAnimationViewId = "sampleapp:setAnimationViewId",
  setIsIModelLocal = "sampleapp:setisimodellocal",
}

export interface SampleAppState {
  testProperty: string;
  animationViewId: string;
  isIModelLocal: boolean;
}

const initialState: SampleAppState = {
  testProperty: "",
  animationViewId: "",
  isIModelLocal: true,
};

// An object with a function that creates each OpenIModelAction that can be handled by our reducer.
export const SampleAppActions = {
  setTestProperty: (testProperty: string) =>
    // eslint-disable-next-line deprecation/deprecation
    createAction(SampleAppUiActionId.setTestProperty, testProperty),
  setAnimationViewId: (viewId: string) =>
    // eslint-disable-next-line deprecation/deprecation
    createAction(SampleAppUiActionId.setAnimationViewId, viewId),
  setIsIModelLocal: (isIModelLocal: boolean) =>
    // eslint-disable-next-line deprecation/deprecation
    createAction(SampleAppUiActionId.setIsIModelLocal, isIModelLocal),
};

export class SampleAppAccuSnap extends AccuSnap {
  public override getActiveSnapModes(): SnapMode[] {
    const snaps: SnapMode[] = [];
    if (SampleAppIModelApp.store.getState().frameworkState) {
      const snapMode =
        SampleAppIModelApp.store.getState().frameworkState.configurableUiState
          .snapMode; // eslint-disable-line deprecation/deprecation
      if ((snapMode & SnapMode.Bisector) === (SnapMode.Bisector as number))
        snaps.push(SnapMode.Bisector);
      if ((snapMode & SnapMode.Center) === (SnapMode.Center as number))
        snaps.push(SnapMode.Center);
      if (
        (snapMode & SnapMode.Intersection) ===
        (SnapMode.Intersection as number)
      )
        snaps.push(SnapMode.Intersection);
      if ((snapMode & SnapMode.MidPoint) === (SnapMode.MidPoint as number))
        snaps.push(SnapMode.MidPoint);
      if ((snapMode & SnapMode.Nearest) === (SnapMode.Nearest as number))
        snaps.push(SnapMode.Nearest);
      if (
        (snapMode & SnapMode.NearestKeypoint) ===
        (SnapMode.NearestKeypoint as number)
      )
        snaps.push(SnapMode.NearestKeypoint);
      if ((snapMode & SnapMode.Origin) === (SnapMode.Origin as number))
        snaps.push(SnapMode.Origin);
    } else {
      snaps.push(SnapMode.NearestKeypoint);
    }
    return snaps;
  }
}

// eslint-disable-next-line deprecation/deprecation
export type SampleAppActionsUnion = ActionsUnion<typeof SampleAppActions>;

function SampleAppReducer(
  state: SampleAppState = initialState,
  action: SampleAppActionsUnion
  // eslint-disable-next-line deprecation/deprecation
): DeepReadonly<SampleAppState> {
  switch (action.type) {
    case SampleAppUiActionId.setTestProperty: {
      return { ...state, testProperty: action.payload };
    }
    case SampleAppUiActionId.setAnimationViewId: {
      return { ...state, animationViewId: action.payload };
    }
    case SampleAppUiActionId.setIsIModelLocal: {
      return { ...state, isIModelLocal: action.payload };
    }
  }
  return state;
}

// React-redux interface stuff
// eslint-disable-next-line deprecation/deprecation
export interface RootState extends FrameworkRootState {
  sampleAppState: SampleAppState;
}

export class SampleAppIModelApp {
  public static sampleAppNamespace?: string;
  public static testAppConfiguration: TestAppConfiguration | undefined;
  // eslint-disable-next-line deprecation/deprecation
  private static _appStateManager: StateManager | undefined;

  public static get store(): Store<RootState> {
    // eslint-disable-next-line deprecation/deprecation
    return StateManager.store as Store<RootState>;
  }

  public static async startup(opts: NativeAppOpts): Promise<void> {
    const iModelAppOpts = {
      ...opts.iModelApp,
    };

    const rpcParams: BentleyCloudRpcParams = {
      info: { title: "appui-test-app", version: "v1.0" },
      uriPrefix: "http://localhost:3001",
    };
    BentleyCloudRpcManager.initializeClient(
      rpcParams,
      opts.iModelApp!.rpcInterfaces! // eslint-disable-line deprecation/deprecation
    );
    if (ProcessDetector.isElectronAppFrontend) {
      await ElectronApp.startup({ ...opts, iModelApp: iModelAppOpts });
      NativeAppLogger.initialize();
    } else {
      await IModelApp.startup(iModelAppOpts);
    }

    window.onerror = function (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    };

    this.sampleAppNamespace = "SampleApp";
    await IModelApp.localization.registerNamespace(this.sampleAppNamespace);

    // use new state manager that allows dynamic additions from extensions and snippets
    if (!this._appStateManager) {
      // eslint-disable-next-line deprecation/deprecation
      this._appStateManager = new StateManager({
        sampleAppState: SampleAppReducer,
        // eslint-disable-next-line deprecation/deprecation
        frameworkState: FrameworkReducer,
      });
    }

    // register core commands not automatically registered
    ViewClipByPlaneTool.register();
  }

  public static loggerCategory(obj: any): string {
    const className = getObjectClassName(obj);
    const category = `appui-test-app.${className}`;
    return category;
  }

  public static async closeCurrentIModel() {
    if (SampleAppIModelApp.isIModelLocal) {
      const currentIModelConnection = UiFramework.getIModelConnection();
      if (currentIModelConnection) {
        SyncUiEventDispatcher.clearConnectionEvents(currentIModelConnection);
        await currentIModelConnection.close();
        UiFramework.setIModelConnection(undefined);
        SampleAppIModelApp.setIsIModelLocal(true, true);
      }
    }
  }

  public static isEnvVarOn(envVar: string): boolean {
    return (
      import.meta.env[envVar] === "1" || import.meta.env[envVar] === "true"
    );
  }

  public static getSnapshotPath(): string | undefined {
    const snapshotPath = getUrlParam("snapshotPath");
    return snapshotPath !== undefined
      ? decodeURIComponent(snapshotPath)
      : import.meta.env.IMJS_UITESTAPP_SNAPSHOT_FILEPATH;
  }

  public static setTestProperty(value: string, immediateSync = false) {
    if (value !== SampleAppIModelApp.getTestProperty()) {
      // eslint-disable-next-line deprecation/deprecation
      UiFramework.dispatchActionToStore(
        SampleAppUiActionId.setTestProperty,
        value,
        immediateSync
      );
    }
  }

  public static getTestProperty(): string {
    return SampleAppIModelApp.store.getState().sampleAppState.testProperty;
  }

  public static saveAnimationViewId(value: string, immediateSync = false) {
    if (value !== SampleAppIModelApp.getTestProperty()) {
      // eslint-disable-next-line deprecation/deprecation
      UiFramework.dispatchActionToStore(
        SampleAppUiActionId.setAnimationViewId,
        value,
        immediateSync
      );
    }
  }

  public static getAnimationViewId(): string {
    return SampleAppIModelApp.store.getState().sampleAppState.animationViewId;
  }

  public static setIsIModelLocal(
    isIModelLocal: boolean,
    immediateSync = false
  ) {
    // eslint-disable-next-line deprecation/deprecation
    UiFramework.dispatchActionToStore(
      SampleAppUiActionId.setIsIModelLocal,
      isIModelLocal,
      immediateSync
    );
  }

  public static get isIModelLocal(): boolean {
    return SampleAppIModelApp.store.getState().sampleAppState.isIModelLocal;
  }
}

const SampleAppViewer = () => {
  const featureOverrides = usePreviewFeatureURLParams();
  return (
    <WidgetContentProvider>
      <AppPreviewFeatures featureOverrides={featureOverrides}>
        <AppLocalizationProvider>
          <Provider store={SampleAppIModelApp.store}>
            <ThemeManager>
              <SafeAreaContext.Provider value={SafeAreaInsets.All}>
                <UiStateStorageHandler />
              </SafeAreaContext.Provider>
            </ThemeManager>
          </Provider>
        </AppLocalizationProvider>
      </AppPreviewFeatures>
    </WidgetContentProvider>
  );
};

// If we are using a browser, close the current iModel before leaving
window.addEventListener("beforeunload", async () => {
  await SampleAppIModelApp.closeCurrentIModel();
});

// main entry point.
export async function main() {
  // Popout widget content is loaded by main window, avoid app-reinitialization.
  if (window.location.href.endsWith("iTwinPopup")) return;
}
