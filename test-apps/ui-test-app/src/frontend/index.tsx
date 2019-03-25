/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, combineReducers, Store } from "redux";
import { Provider } from "react-redux";
import {  RpcConfiguration, RpcOperation, IModelToken, ElectronRpcManager,
          ElectronRpcConfiguration, BentleyCloudRpcManager } from "@bentley/imodeljs-common";
import { IModelApp, IModelConnection, SnapMode, AccuSnap } from "@bentley/imodeljs-frontend";
import { I18NNamespace } from "@bentley/imodeljs-i18n";
import { Config, OidcFrontendClientConfiguration, AccessToken } from "@bentley/imodeljs-clients";
import { Presentation } from "@bentley/presentation-frontend";
import { UiCore } from "@bentley/ui-core";
import { UiComponents, BeDragDropContext} from "@bentley/ui-components";
import { UiFramework, FrameworkState, FrameworkReducer, AppNotificationManager,
         IModelInfo, FrontstageManager, createAction, ActionsUnion, DeepReadonly,
         ConfigurableUiContent, ThemeManager, DragDropLayerRenderer, SyncUiEventDispatcher } from "@bentley/ui-framework";
import { Id64String } from "@bentley/bentleyjs-core";
import getSupportedRpcs from "../common/rpcs";
import { AppUi } from "./appui/AppUi";
import AppBackstage, { BackstageShow, BackstageHide } from "./appui/AppBackstage";
import { ViewsFrontstage } from "./appui/frontstages/ViewsFrontstage";
import { Tool1 } from "./tools/Tool1";
import { Tool2 } from "./tools/Tool2";
import { AppSelectTool } from "./tools/AppSelectTool";
import { ToolWithSettings } from "./tools/ToolWithSettings";

// Mobx demo
import { configure as mobxConfigure } from "mobx";

import "./index.scss";

// Initialize my application gateway configuration for the frontend
let rpcConfiguration: RpcConfiguration;
const rpcInterfaces = getSupportedRpcs();
if (ElectronRpcConfiguration.isElectron)
  rpcConfiguration = ElectronRpcManager.initializeClient({}, rpcInterfaces);
else
  rpcConfiguration = BentleyCloudRpcManager.initializeClient({ info: { title: "ui-test-app", version: "v1.0" }, uriPrefix: "http://localhost:3001" }, rpcInterfaces);

// WIP: WebAppRpcProtocol seems to require an IModelToken for every RPC request
for (const definition of rpcConfiguration.interfaces())
  RpcOperation.forEach(definition, (operation) => operation.policy.token = (_request) => new IModelToken("test", "test", "test", "test"));

// cSpell:ignore BACKSTAGESHOW BACKSTAGEHIDE SETIMODELCONNECTION setTestProperty
/** Action Ids used by redux and to send sync UI components. Typically used to refresh visibility or enable state of control.
 * Use lower case strings to be compatible with SyncUi processing.
 */
export const enum SampleAppUiActionId {
  showBackstage = "sampleapp:backstageshow",
  hideBackstage = "sampleapp:backstagehide",
  setIModelConnection = "sampleapp:setimodelconnection",
  setAccessToken = "sampleapp:setaccesstoken",
  setTestProperty = "sampleapp:settestproperty",
}

export interface SampleAppState {
  backstageVisible: boolean;
  currentIModelConnection?: IModelConnection;
  accessToken?: AccessToken;
  testProperty: string;
}

const initialState: SampleAppState = {
  backstageVisible: false,
  testProperty: "",
};

// An object with a function that creates each OpenIModelAction that can be handled by our reducer.
// tslint:disable-next-line:variable-name
export const SampleAppActions = {
  showBackstage: () => createAction(SampleAppUiActionId.showBackstage),
  hideBackstage: () => createAction(SampleAppUiActionId.hideBackstage),
  setIModelConnection: (iModelConnection: IModelConnection) => createAction(SampleAppUiActionId.setIModelConnection, iModelConnection ),
  setAccessToken: (accessToken: AccessToken) => createAction(SampleAppUiActionId.setAccessToken, accessToken ),
  setTestProperty: (testProperty: string) => createAction(SampleAppUiActionId.setTestProperty, testProperty),
};

class SampleAppAccuSnap extends AccuSnap {
  public getActiveSnapModes(): SnapMode[] {
    const snaps: SnapMode[] = [];
    if (SampleAppIModelApp.store.getState().frameworkState) {
      const snapMode = SampleAppIModelApp.store.getState().frameworkState!.configurableUiState.snapMode;
      if ((snapMode & SnapMode.Bisector) === SnapMode.Bisector as number) snaps.push(SnapMode.Bisector);
      if ((snapMode & SnapMode.Center) === SnapMode.Center as number) snaps.push(SnapMode.Center);
      if ((snapMode & SnapMode.Intersection) === SnapMode.Intersection as number) snaps.push(SnapMode.Intersection);
      if ((snapMode & SnapMode.MidPoint) === SnapMode.MidPoint as number) snaps.push(SnapMode.MidPoint);
      if ((snapMode & SnapMode.Nearest) === SnapMode.Nearest as number) snaps.push(SnapMode.Nearest);
      if ((snapMode & SnapMode.NearestKeypoint) === SnapMode.NearestKeypoint as number) snaps.push(SnapMode.NearestKeypoint);
      if ((snapMode & SnapMode.Origin) === SnapMode.Origin as number) snaps.push(SnapMode.Origin);
    } else {
      snaps.push(SnapMode.NearestKeypoint);
    }
    return snaps;
  }
}

export type SampleAppActionsUnion = ActionsUnion<typeof SampleAppActions>;

function SampleAppReducer(state: SampleAppState = initialState, action: SampleAppActionsUnion): DeepReadonly<SampleAppState> {
  switch (action.type) {
    case SampleAppUiActionId.showBackstage: {
      return { ...state, backstageVisible: true };
    }
    case SampleAppUiActionId.hideBackstage: {
      return { ...state, backstageVisible: false };
    }
    case SampleAppUiActionId.setIModelConnection: {
      return { ...state, currentIModelConnection: action.payload };
    }
    case SampleAppUiActionId.setAccessToken: {
      return { ...state, accessToken: action.payload };
    }
    case SampleAppUiActionId.setTestProperty: {
      return { ...state, testProperty: action.payload };
    }
  }

  return state;
}

// React-redux interface stuff
export interface RootState {
  sampleAppState: SampleAppState;
  frameworkState?: FrameworkState;
}

// subclass of IModelApp needed to use IModelJs API
export class SampleAppIModelApp extends IModelApp {
  public static sampleAppNamespace: I18NNamespace;
  public static store: Store<RootState>;
  public static rootReducer: any;

  protected static onStartup() {
    IModelApp.notifications = new AppNotificationManager();
    IModelApp.accuSnap = new SampleAppAccuSnap();

    this.sampleAppNamespace = IModelApp.i18n.registerNamespace("SampleApp");
    // this is the rootReducer for the sample application.
    this.rootReducer = combineReducers<RootState>({
      sampleAppState: SampleAppReducer,
      frameworkState: FrameworkReducer,
    } as any);

    // create the Redux Store.
    this.store = createStore(this.rootReducer,
      (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

    // register local commands.

    // Configure a CORS proxy in development mode.
    if (process.env.NODE_ENV === "development")
      Config.App.set("imjs_dev_cors_proxy_server", `http://${window.location.hostname}:3001`); // By default, this will run on port 3001

    // Mobx configuration
    mobxConfigure({ enforceActions: "observed" });
  }

  public static async initialize() {
    Presentation.initialize();
    Presentation.selection.scopes.activeScope = "top-assembly";
    UiCore.initialize(SampleAppIModelApp.i18n); // tslint:disable-line:no-floating-promises
    UiComponents.initialize(SampleAppIModelApp.i18n); // tslint:disable-line:no-floating-promises

    let oidcConfiguration: OidcFrontendClientConfiguration;
    const scope = "openid email profile organization feature_tracking imodelhub context-registry-service imodeljs-router reality-data:read";
    if (ElectronRpcConfiguration.isElectron) {
      const clientId = Config.App.get("imjs_electron_test_client_id");
      const redirectUri = Config.App.get("imjs_electron_test_redirect_uri");
      oidcConfiguration = { clientId, redirectUri, scope };
    } else {
      const clientId = Config.App.get("imjs_browser_test_client_id");
      const redirectUri = Config.App.get("imjs_browser_test_redirect_uri");
      oidcConfiguration = { clientId, redirectUri, scope };
    }

    await UiFramework.initialize(SampleAppIModelApp.store, SampleAppIModelApp.i18n, oidcConfiguration, "frameworkState");

    // initialize Presentation
    Presentation.initialize({
      activeLocale: IModelApp.i18n.languageList()[0],
    });

    // Register tools.
    BackstageShow.register(this.sampleAppNamespace);
    BackstageHide.register(this.sampleAppNamespace);
    Tool1.register(this.sampleAppNamespace);
    Tool2.register(this.sampleAppNamespace);
    ToolWithSettings.register(this.sampleAppNamespace);
    AppSelectTool.register();
    IModelApp.toolAdmin.defaultToolId = AppSelectTool.toolId;
  }

  public static async openViews(projectId: string, iModelId: string, viewIdsSelected: Id64String[]) {
    // open the imodel
    const iModelConnection = await UiFramework.iModelServices.openIModel(projectId, iModelId);

    // store the IModelConnection in the sample app store
    SampleAppIModelApp.setIModelConnection(iModelConnection, true);

    SyncUiEventDispatcher.initializeConnectionEvents(iModelConnection);

    // we create a FrontStage that contains the views that we want.
    const frontstageProvider = new ViewsFrontstage(viewIdsSelected, iModelConnection);
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    FrontstageManager.setActiveFrontstageDef(frontstageProvider.frontstageDef).then(() => { // tslint:disable-line:no-floating-promises
      // Frontstage & ScreenViewports are ready
      // tslint:disable-next-line:no-console
      console.log("Frontstage is ready");
    });
  }

  public static async handleWorkOffline() {
    if (!FrontstageManager.activeFrontstageDef) {
      await SampleAppIModelApp.showFrontstage ("Test4");
    }
  }

  public static async showIModelIndex(contextId: string, iModelId: string) {
    const currentConnection = SampleAppIModelApp.getIModelConnection();
    if (!currentConnection || (currentConnection.iModelToken.iModelId !== iModelId)) {
      // open the imodel
      const iModelConnection = await UiFramework.iModelServices.openIModel(contextId, iModelId);

      // store the IModelConnection in the sample app store
      SampleAppIModelApp.setIModelConnection(iModelConnection, true);
    }

    await SampleAppIModelApp.showFrontstage ("IModelIndex");
  }

  public static async showIModelOpen(_iModels: IModelInfo[]) {
    await SampleAppIModelApp.showFrontstage ("IModelOpen");
  }

  public static async showSignIn() {
    await SampleAppIModelApp.showFrontstage ("SignIn");
  }

  public static setTestProperty(value: string, immediateSync = false) {
    if (value !== SampleAppIModelApp.getTestProperty()) {
      UiFramework.dispatchActionToStore(SampleAppUiActionId.setTestProperty, value, immediateSync);
    }
  }

  public static getTestProperty(): string {
    return SampleAppIModelApp.store.getState().sampleAppState.testProperty;
  }

  public static setIModelConnection(iModelConnection: IModelConnection, immediateSync = false) {
    UiFramework.dispatchActionToStore(SampleAppUiActionId.setIModelConnection, iModelConnection, immediateSync);
  }

  public static setAccessToken(accessToken: AccessToken, immediateSync = false) {
    UiFramework.dispatchActionToStore(SampleAppUiActionId.setAccessToken, accessToken, immediateSync);
  }

  public static getAccessToken(): AccessToken | undefined {
    return SampleAppIModelApp.store.getState().sampleAppState.accessToken;
  }

  public static getIModelConnection(): IModelConnection | undefined {
    return SampleAppIModelApp.store.getState().sampleAppState.currentIModelConnection;
  }

  public static async showFrontstage(frontstageId: string) {
    const frontstageDef = FrontstageManager.findFrontstageDef(frontstageId);
    FrontstageManager.setActiveFrontstageDef(frontstageDef); // tslint:disable-line:no-floating-promises
  }
}

export class SampleAppViewer extends React.Component<any> {
  constructor(props: any) {
    super(props);

    SampleAppIModelApp.startup();

    // wait for both our i18n namespaces to be read.
    SampleAppIModelApp.initialize().then(() => { // tslint:disable-line:no-floating-promises

      AppUi.initialize();

      // tslint:disable-next-line:no-console
      console.log("Versions:", (window as any).iModelJsVersions);

      SampleAppIModelApp.showSignIn(); // tslint:disable-line:no-floating-promises
    });
  }

  public render(): JSX.Element {
    return (
      <Provider store={SampleAppIModelApp.store} >
        <ThemeManager>
          <BeDragDropContext>
            <ConfigurableUiContent appBackstage={<AppBackstage />} />
            <DragDropLayerRenderer />
          </BeDragDropContext>
        </ThemeManager>
      </Provider >
    );
  }
}

ReactDOM.render( <SampleAppViewer />, document.getElementById("root") as HTMLElement);
