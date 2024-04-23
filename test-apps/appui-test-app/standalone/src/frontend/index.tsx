/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "../../lib/webfont/bentley-icons-generic-webfont.css";
import "@itwin/itwinui-react/styles.css";
import "./index.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import classnames from "classnames";
import { connect, Provider } from "react-redux";
import { Store } from "redux"; // createStore,
import { Key } from "ts-key-enum";
import {
  RealityDataAccessClient,
  RealityDataClientOptions,
} from "@itwin/reality-data-client";
import {
  ActionsUnion,
  AppNotificationManager,
  AppUiSettings,
  BackstageComposer,
  ConfigurableUiContent,
  createAction,
  DeepReadonly,
  FrameworkAccuDraw,
  FrameworkReducer,
  FrameworkRootState,
  FrameworkToolAdmin,
  FrameworkUiAdmin,
  FrontstageDeactivatedEventArgs,
  getKeyinsFromToolList,
  IModelViewportControl,
  InitialAppUiSettings,
  ModalFrontstageClosedEventArgs,
  PresentationSelectionScope,
  SafeAreaContext,
  SafeAreaInsets,
  SessionStateActionId,
  StandardContentToolsUiItemsProvider,
  StateManager,
  StatusBarItemUtilities,
  StatusBarSection,
  SyncUiEventDispatcher,
  SYSTEM_PREFERRED_COLOR_THEME,
  ThemeManager,
  ToolbarDragInteractionContext,
  UiFramework,
  UiItemsManager,
  UiStateStorageHandler,
} from "@itwin/appui-react";
import {
  Id64String,
  Logger,
  LoggingMetaData,
  LogLevel,
  ProcessDetector,
  UnexpectedErrors,
} from "@itwin/core-bentley";
import {
  BentleyCloudRpcManager,
  BentleyCloudRpcParams,
  RpcConfiguration,
} from "@itwin/core-common";
import { ElectronApp } from "@itwin/core-electron/lib/cjs/ElectronFrontend";
import {
  AccuSnap,
  IModelApp,
  IModelConnection,
  LocalUnitFormatProvider,
  NativeAppLogger,
  NativeAppOpts,
  SelectionTool,
  SnapMode,
  ToolAdmin,
  ViewClipByPlaneTool,
} from "@itwin/core-frontend";
import { getObjectClassName } from "@itwin/core-react";
import { FrontendDevTools } from "@itwin/frontend-devtools";
import { HyperModeling } from "@itwin/hypermodeling-frontend";
import { getSupportedRpcs } from "../common/rpcs";
import {
  loggerCategory,
  TestAppConfiguration,
} from "../common/TestAppConfiguration";
import { AppUi } from "./appui/AppUi";
import { LocalFileOpenFrontstage } from "./appui/frontstages/LocalFileStage";
import { MainFrontstage } from "./appui/frontstages/MainFrontstage";
import { AppSettingsTabsProvider } from "./appui/settingsproviders/AppSettingsTabsProvider";
import {
  AbstractUiItemsProvider,
  AppPreviewFeatures,
  AppUiTestProviders,
  ContentLayoutStage,
  CustomContentFrontstage,
  CustomStageUiItemsProvider,
  FloatingWidgetsUiItemsProvider,
  InspectUiItemInfoToolProvider,
  MessageUiItemsProvider,
  PopoutWindowsFrontstage,
  previewFeaturesToggleProvider,
  registerCustomFrontstage,
  SynchronizedFloatingViewportStage,
  TestFrontstageProvider,
  WidgetApiStage,
} from "@itwin/appui-test-providers";
import { getUrlParam, useHandleURLParams } from "./UrlParams";
import {
  addExampleFrontstagesToBackstage,
  registerExampleFrontstages,
} from "./appui/frontstages/example-stages/ExampleStagesBackstageProvider";
import {
  editorFrontstageProvider,
  editorUiItemsProvider,
  initializeEditor,
} from "./appui/frontstages/EditorFrontstageProvider";
import { useEditorToolSettings } from "./appui/useEditorToolSettings";
import { AppLanguageSelect, AppLocalizationProvider } from "./Localization";

// Initialize my application gateway configuration for the frontend
RpcConfiguration.developmentMode = true;

/** Action Ids used by redux and to send sync UI components. Typically used to refresh visibility or enable state of control.
 * Use lower case strings to be compatible with SyncUi processing.
 */
export enum SampleAppUiActionId {
  setTestProperty = "sampleapp:settestproperty",
  setAnimationViewId = "sampleapp:setAnimationViewId",
  setIsIModelLocal = "sampleapp:setisimodellocal",
  setInitialViewIds = "sampleapp:setInitialViewIds",
}

export interface SampleAppState {
  testProperty: string;
  animationViewId: string;
  isIModelLocal: boolean;
  initialViewIds: string[];
}

const initialState: SampleAppState = {
  testProperty: "",
  animationViewId: "",
  isIModelLocal: true,
  initialViewIds: [],
};

// An object with a function that creates each OpenIModelAction that can be handled by our reducer.
export const SampleAppActions = {
  setTestProperty: (testProperty: string) =>
    createAction(SampleAppUiActionId.setTestProperty, testProperty),
  setAnimationViewId: (viewId: string) =>
    createAction(SampleAppUiActionId.setAnimationViewId, viewId),
  setIsIModelLocal: (isIModelLocal: boolean) =>
    createAction(SampleAppUiActionId.setIsIModelLocal, isIModelLocal),
  setInitialViewIds: (viewIds: string[]) =>
    createAction(SampleAppUiActionId.setInitialViewIds, viewIds),
};

class SampleAppAccuSnap extends AccuSnap {
  public override getActiveSnapModes(): SnapMode[] {
    const snaps: SnapMode[] = [];
    if (SampleAppIModelApp.store.getState().frameworkState) {
      const snapMode =
        SampleAppIModelApp.store.getState().frameworkState.configurableUiState
          .snapMode;
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

export type SampleAppActionsUnion = ActionsUnion<typeof SampleAppActions>;

function SampleAppReducer(
  state: SampleAppState = initialState,
  action: SampleAppActionsUnion
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
    case SampleAppUiActionId.setInitialViewIds: {
      return { ...state, initialViewIds: action.payload };
    }
  }
  return state;
}

// React-redux interface stuff
export interface RootState extends FrameworkRootState {
  sampleAppState: SampleAppState;
}

interface SampleIModelParams {
  iTwinId: string;
  iModelId: string;
  viewIds?: string[];
  stageId?: string;
}

export class SampleAppIModelApp {
  public static sampleAppNamespace?: string;
  public static iModelParams: SampleIModelParams | undefined;
  public static testAppConfiguration: TestAppConfiguration | undefined;
  private static _appStateManager: StateManager | undefined;

  public static get store(): Store<RootState> {
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
      this._appStateManager = new StateManager({
        sampleAppState: SampleAppReducer,
        frameworkState: FrameworkReducer,
      });
    }

    // register core commands not automatically registered
    ViewClipByPlaneTool.register();
  }

  public static async initialize() {
    await UiFramework.initialize(undefined, undefined);

    IModelApp.toolAdmin.defaultToolId = SelectionTool.toolId;

    // No longer necessary, but useful to test legacy behavior until uiAdmin is completely removed:
    // IModelApp.uiAdmin.updateFeatureFlags({ allowKeyinPalette: true });
    // The updated way of doing things would be something like this:
    const keyins = getKeyinsFromToolList(IModelApp.tools.getToolList());
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === Key.F2.valueOf()) {
        UiFramework.showKeyinPalette(keyins);
      }
    });

    // store name of this registered control in Redux store so it can be access by extensions
    UiFramework.setDefaultIModelViewportControlId(IModelViewportControl.id);

    // default to showing imperial formatted units
    await IModelApp.quantityFormatter.setActiveUnitSystem("imperial");
    await IModelApp.quantityFormatter.setUnitFormattingSettingsProvider(
      new LocalUnitFormatProvider(IModelApp.quantityFormatter, true)
    ); // pass true to save per imodel

    const availableScopes: PresentationSelectionScope[] = [
      { id: "element", label: "Element" },
      { id: "assembly", label: "Assembly" },
      { id: "top-assembly", label: "Top Assembly" },
    ];
    UiFramework.dispatchActionToStore(
      SessionStateActionId.SetAvailableSelectionScopes,
      availableScopes
    );

    await FrontendDevTools.initialize();
    await HyperModeling.initialize();
    // await MapLayersUI.initialize({ featureInfoOpts: { onMapHit: DefaultMapFeatureInfoTool.onMapHit } });

    AppSettingsTabsProvider.initializeAppSettingProvider();

    // Create and register the AppUiSettings instance to provide default for ui settings in Redux store
    const lastTheme =
      (window.localStorage &&
        window.localStorage.getItem("uifw:defaultTheme")) ??
      SYSTEM_PREFERRED_COLOR_THEME;
    const defaults: InitialAppUiSettings = {
      colorTheme: lastTheme ?? SYSTEM_PREFERRED_COLOR_THEME,
      dragInteraction: false,
      widgetOpacity: 0.8,
      showWidgetIcon: true,
      autoCollapseUnpinnedPanels: false,
      toolbarOpacity: 0.5,
    };

    // initialize any settings providers that may need to have defaults set by iModelApp
    UiFramework.registerUserSettingsProvider(new AppUiSettings(defaults));

    UiFramework.useDefaultPopoutUrl = true;
    UiFramework.visibility.autoHideUi = false;

    // initialize state from all registered UserSettingsProviders
    await UiFramework.initializeStateFromUserSettingsProviders();

    // register the localized strings for the package and set up that contains the sample UiItems providers
    await AppUiTestProviders.initializeLocalizationAndState();

    // Register item providers
    UiItemsManager.register(
      new AbstractUiItemsProvider(AppUiTestProviders.localizationNamespace)
    );
    UiItemsManager.register(new MessageUiItemsProvider());
    UiItemsManager.register(new FloatingWidgetsUiItemsProvider(), {
      providerId: "widget-api-stage-floating-widget",
      stageIds: [WidgetApiStage.stageId],
    });
    UiItemsManager.register(
      new InspectUiItemInfoToolProvider(
        AppUiTestProviders.localizationNamespace
      )
    );
    UiItemsManager.register(previewFeaturesToggleProvider);
    UiItemsManager.register(new CustomStageUiItemsProvider());
    UiItemsManager.register({
      id: "language",
      getStatusBarItems: () => [
        StatusBarItemUtilities.createCustomItem(
          "language",
          StatusBarSection.Right,
          0,
          <AppLanguageSelect />
        ),
      ],
    });

    // Register frontstages
    CustomContentFrontstage.register(AppUiTestProviders.localizationNamespace);
    WidgetApiStage.register(AppUiTestProviders.localizationNamespace);
    ContentLayoutStage.register(AppUiTestProviders.localizationNamespace);
    UiFramework.frontstages.addFrontstageProvider(new TestFrontstageProvider());
    registerCustomFrontstage();
    SynchronizedFloatingViewportStage.register(
      AppUiTestProviders.localizationNamespace
    );
    PopoutWindowsFrontstage.register(AppUiTestProviders.localizationNamespace);

    if (ProcessDetector.isElectronAppFrontend) {
      await initializeEditor();
      UiFramework.frontstages.addFrontstageProvider(editorFrontstageProvider);
      UiItemsManager.register(editorUiItemsProvider, {
        stageIds: [editorFrontstageProvider.id],
      });
      UiItemsManager.register(new StandardContentToolsUiItemsProvider(), {
        stageIds: [editorFrontstageProvider.id],
      });
    }

    // TODO: should not be required. Start event loop to open key-in palette.
    IModelApp.startEventLoop();
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

  public static async setViewIdAndOpenMainStage(
    iModelConnection: IModelConnection,
    viewIdsSelected: Id64String[]
  ) {
    // we create a Frontstage that contains the views that we want.
    let stageId: string;
    const defaultFrontstage = MainFrontstage.stageId;

    registerExampleFrontstages();
    addExampleFrontstagesToBackstage();

    // Reset QuantityFormatter UnitsProvider with new iModelConnection
    // Remove comments once RPC error processing is fixed
    // const schemaLocater = new ECSchemaRpcLocater(iModelConnection);
    // await IModelApp.quantityFormatter.setUnitsProvider(new SchemaUnitProvider(schemaLocater));

    // store the IModelConnection in the sample app store - this may trigger redux connected components
    UiFramework.setIModelConnection(iModelConnection, true);

    // store off the selected viewIds so the content group provider knows what view(s) to show
    if (viewIdsSelected.length) {
      SampleAppIModelApp.setInitialViewIds(viewIdsSelected);
    }

    if (this.iModelParams && this.iModelParams.stageId)
      stageId = this.iModelParams.stageId;
    else if (SampleAppIModelApp.testAppConfiguration?.readWrite) {
      stageId = editorFrontstageProvider.id;
    } else {
      stageId = defaultFrontstage;
    }

    if (stageId === defaultFrontstage) {
      if (stageId === MainFrontstage.stageId) {
        MainFrontstage.register();
      }
    }

    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      stageId
    );
    if (frontstageDef) {
      void UiFramework.frontstages
        .setActiveFrontstageDef(frontstageDef)
        .then(() => {
          // Frontstage & ScreenViewports are ready
          Logger.logInfo(
            SampleAppIModelApp.loggerCategory(this),
            `Frontstage & ScreenViewports are ready`
          );
        });
    } else {
      throw new Error(`Frontstage with id "${stageId}" does not exist`);
    }
  }

  public static async showLocalFileStage() {
    // open to the Local File frontstage
    await LocalFileOpenFrontstage.open();
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
      UiFramework.dispatchActionToStore(
        SampleAppUiActionId.setTestProperty,
        value,
        immediateSync
      );
    }
  }

  public static getInitialViewIds() {
    return SampleAppIModelApp.store.getState().sampleAppState.initialViewIds;
  }

  public static getTestProperty(): string {
    return SampleAppIModelApp.store.getState().sampleAppState.testProperty;
  }

  public static saveAnimationViewId(value: string, immediateSync = false) {
    if (value !== SampleAppIModelApp.getTestProperty()) {
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
    UiFramework.dispatchActionToStore(
      SampleAppUiActionId.setIsIModelLocal,
      isIModelLocal,
      immediateSync
    );
  }

  public static setInitialViewIds(viewIds: string[], immediateSync = false) {
    UiFramework.dispatchActionToStore(
      SampleAppUiActionId.setInitialViewIds,
      viewIds,
      immediateSync
    );
  }

  public static get isIModelLocal(): boolean {
    return SampleAppIModelApp.store.getState().sampleAppState.isIModelLocal;
  }

  public static async showFrontstage(frontstageId: string) {
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      frontstageId
    );
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
  }
}

function AppDragInteractionComponent(props: {
  dragInteraction: boolean;
  children: React.ReactNode;
}) {
  return (
    <ToolbarDragInteractionContext.Provider value={props.dragInteraction}>
      {props.children}
    </ToolbarDragInteractionContext.Provider>
  );
}

function mapDragInteractionStateToProps(state: RootState) {
  return {
    dragInteraction:
      state.frameworkState.configurableUiState.useDragInteraction,
  };
}

const AppDragInteraction = connect(mapDragInteractionStateToProps)(
  AppDragInteractionComponent
);

const SampleAppViewer = () => {
  useEditorToolSettings();

  React.useEffect(() => {
    AppUi.initialize();
  }, []);

  React.useEffect(() => {
    void SampleAppIModelApp.showLocalFileStage();
  }, []);

  const _handleFrontstageDeactivatedEvent = (
    args: FrontstageDeactivatedEventArgs
  ): void => {
    Logger.logInfo(
      SampleAppIModelApp.loggerCategory(this),
      `Frontstage exit: id=${args.deactivatedFrontstageDef.id} totalTime=${args.totalTime} engagementTime=${args.engagementTime} idleTime=${args.idleTime}`
    );
  };

  const _handleModalFrontstageClosedEvent = (
    args: ModalFrontstageClosedEventArgs
  ): void => {
    Logger.logInfo(
      SampleAppIModelApp.loggerCategory(this),
      `Modal Frontstage close: title=${args.modalFrontstage.title} totalTime=${args.totalTime} engagementTime=${args.engagementTime} idleTime=${args.idleTime}`
    );
  };

  React.useEffect(() => {
    UiFramework.frontstages.onFrontstageDeactivatedEvent.addListener(
      _handleFrontstageDeactivatedEvent
    );
    UiFramework.frontstages.onModalFrontstageClosedEvent.addListener(
      _handleModalFrontstageClosedEvent
    );
    return () => {
      UiFramework.frontstages.onFrontstageDeactivatedEvent.removeListener(
        _handleFrontstageDeactivatedEvent
      );
      UiFramework.frontstages.onModalFrontstageClosedEvent.removeListener(
        _handleModalFrontstageClosedEvent
      );
    };
  }, []);

  useHandleURLParams();

  return (
    <AppPreviewFeatures>
      <AppLocalizationProvider>
        <Provider store={SampleAppIModelApp.store}>
          <ThemeManager>
            <SafeAreaContext.Provider value={SafeAreaInsets.All}>
              <AppDragInteraction>
                <UiStateStorageHandler>
                  <AppViewerContent />
                </UiStateStorageHandler>
              </AppDragInteraction>
            </SafeAreaContext.Provider>
          </ThemeManager>
        </Provider>
      </AppLocalizationProvider>
    </AppPreviewFeatures>
  );
};

function AppViewerContent() {
  const mode = getUrlParam("mode");
  return (
    <div
      style={{
        display: "grid",
        height: "100%",
        gridAutoRows: mode === "header" ? "80px 1fr" : "0 1fr",
      }}
    >
      <h2>App Header</h2>
      <ConfigurableUiContent appBackstage={<BackstageComposer />} />
    </div>
  );
}

function App() {
  const mode = getUrlParam("mode");
  if (mode === "portal" || mode === "portal-overflow") {
    return (
      <div
        className={classnames(
          "app-portal",
          mode === "portal-overflow" && "app-overflow"
        )}
      >
        <div className="app-header">Header</div>
        <div className="app-viewer">
          <SampleAppViewer />
        </div>
      </div>
    );
  }
  return <SampleAppViewer />;
}

// If we are using a browser, close the current iModel before leaving
window.addEventListener("beforeunload", async () => {
  await SampleAppIModelApp.closeCurrentIModel();
});

// Similar to `Logger.initializeToConsole`, but doesn't stringify meta-data.
function initializeToConsole() {
  const logConsole =
    (level: string) =>
    (category: string, message: string, metaData: LoggingMetaData) => {
      const metaObj = Logger.getMetaData(metaData);
      console.log(`${level} | ${category} | ${message}`, metaObj); // eslint-disable-line no-console
    };

  Logger.initialize(
    logConsole("Error"),
    logConsole("Warning"),
    logConsole("Info"),
    logConsole("Trace")
  );
}

// main entry point.
async function main() {
  // Popout widget content is loaded by main window, avoid app-reinitialization.
  if (window.location.href.endsWith("iTwinPopup")) return;

  // initialize logging
  initializeToConsole();
  Logger.setLevelDefault(LogLevel.Warning);
  Logger.setLevel(loggerCategory, LogLevel.Info);
  Logger.setLevel("ViewportComponent", LogLevel.Info);

  ToolAdmin.exceptionHandler = async (err: any) =>
    Promise.resolve(UnexpectedErrors.handle(err));

  // retrieve, set, and output the global configuration variable
  SampleAppIModelApp.testAppConfiguration = {};
  SampleAppIModelApp.testAppConfiguration.fullSnapshotPath =
    import.meta.env.IMJS_UITESTAPP_SNAPSHOT_FULLPATH;
  SampleAppIModelApp.testAppConfiguration.snapshotPath =
    SampleAppIModelApp.getSnapshotPath();
  SampleAppIModelApp.testAppConfiguration.bingMapsKey =
    import.meta.env.IMJS_BING_MAPS_KEY;
  SampleAppIModelApp.testAppConfiguration.mapBoxKey =
    import.meta.env.IMJS_MAPBOX_KEY;
  SampleAppIModelApp.testAppConfiguration.cesiumIonKey =
    import.meta.env.IMJS_CESIUM_ION_KEY;
  if (ProcessDetector.isElectronAppFrontend) {
    SampleAppIModelApp.testAppConfiguration.readWrite =
      SampleAppIModelApp.isEnvVarOn("IMJS_READ_WRITE");
  }
  Logger.logInfo(
    "Configuration",
    JSON.stringify(SampleAppIModelApp.testAppConfiguration)
  );

  const mapLayerOpts = {
    BingMaps: SampleAppIModelApp.testAppConfiguration.bingMapsKey
      ? {
          key: "key",
          value: SampleAppIModelApp.testAppConfiguration.bingMapsKey,
        }
      : undefined,
    MapboxImagery: SampleAppIModelApp.testAppConfiguration.mapBoxKey
      ? {
          key: "access_token",
          value: SampleAppIModelApp.testAppConfiguration.mapBoxKey,
        }
      : undefined,
  };

  const realityDataClientOptions: RealityDataClientOptions = {
    /** API Version. v1 by default */
    // version?: ApiVersion;
    /** API Url. Used to select environment. Defaults to "https://api.bentley.com/realitydata" */
    baseUrl: `https://${
      import.meta.env.IMJS_URL_PREFIX
    }api.bentley.com/realitydata`,
  };
  // Start the app.
  await SampleAppIModelApp.startup({
    iModelApp: {
      accuSnap: new SampleAppAccuSnap(),
      toolAdmin: new FrameworkToolAdmin(),
      notifications: new AppNotificationManager(),
      // eslint-disable-next-line deprecation/deprecation
      uiAdmin: new FrameworkUiAdmin(),
      accuDraw: new FrameworkAccuDraw(),
      realityDataAccess: new RealityDataAccessClient(realityDataClientOptions),
      renderSys: { displaySolarShadows: true },
      rpcInterfaces: getSupportedRpcs(),
      mapLayerOptions: mapLayerOpts,
      tileAdmin: {
        cesiumIonKey: SampleAppIModelApp.testAppConfiguration.cesiumIonKey,
      },
    },
  });
  await SampleAppIModelApp.initialize();

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root") as HTMLElement
  );
}

// Entry point - run the main function
void main();
