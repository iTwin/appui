/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import "./index.scss";      // Should be the first import in index.tsx to bring in BWC in the correct place

import * as React from "react";
import * as ReactDOM from "react-dom";
import { CSSProperties } from "react";
import { createStore, combineReducers, Store } from "redux";
import { Provider } from "react-redux";
import {
    RpcConfiguration, RpcOperation, IModelToken, IModelReadRpcInterface, IModelTileRpcInterface,
    ElectronRpcManager, ElectronRpcConfiguration, BentleyCloudRpcManager,
} from "@bentley/imodeljs-common";
import { IModelApp, IModelConnection, SnapMode, AccuSnap } from "@bentley/imodeljs-frontend";
import { I18NNamespace } from "@bentley/imodeljs-i18n";
import { Config, OidcFrontendClientConfiguration } from "@bentley/imodeljs-clients";

import { WebFontIcon } from "@bentley/ui-core";
import { UiCore } from "@bentley/ui-core";
import { UiComponents } from "@bentley/ui-components";
import {
    UiFramework,
    FrameworkState,
    FrameworkReducer,
    OverallContent,
    AppNotificationManager,
    IModelInfo,
    FrontstageManager,
    createAction, ActionsUnion, DeepReadonly,
} from "@bentley/ui-framework";
import { Id64String } from "@bentley/bentleyjs-core";

import { AppUi } from "./appui/AppUi";
import AppBackstage, { BackstageShow, BackstageHide, BackstageToggle } from "./appui/AppBackstage";
import { ViewsFrontstage } from "./appui/frontstages/ViewsFrontstage";
import { MeasurePointsTool } from "./tools/MeasurePoints";

// Initialize my application gateway configuration for the frontend
let rpcConfiguration: RpcConfiguration;
const rpcInterfaces = [IModelTileRpcInterface, IModelReadRpcInterface];
if (ElectronRpcConfiguration.isElectron)
    rpcConfiguration = ElectronRpcManager.initializeClient({}, rpcInterfaces);
else
    rpcConfiguration = BentleyCloudRpcManager.initializeClient({ info: { title: "ui-test-app", version: "v1.0" } }, rpcInterfaces);

// WIP: WebAppRpcProtocol seems to require an IModelToken for every RPC request
for (const definition of rpcConfiguration.interfaces())
    RpcOperation.forEach(definition, (operation) => operation.policy.token = (_request) => new IModelToken("test", "test", "test", "test"));

export interface SampleAppState {
    backstageVisible?: boolean;
    currentIModelConnection?: IModelConnection;
}

const initialState: SampleAppState = {
    backstageVisible: false,
};

// An object with a function that creates each OpenIModelAction that can be handled by our reducer.
// tslint:disable-next-line:variable-name
export const SampleAppActions = {
    showBackstage: () => createAction("SampleApp:BACKSTAGESHOW"),
    hideBackstage: () => createAction("SampleApp:BACKSTAGEHIDE"),
    setIModelConnection: (iModelConnection: IModelConnection) => createAction("SampleApp:SETIMODELCONNECTION", { iModelConnection }),
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
        case "SampleApp:BACKSTAGESHOW": {
            return { ...state, backstageVisible: true };
        }
        case "SampleApp:BACKSTAGEHIDE": {
            return { ...state, backstageVisible: false };
        }
        case "SampleApp:SETIMODELCONNECTION": {
            return { ...state, currentIModelConnection: action.payload.iModelConnection };
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
            Config.App.set("imjs_dev_cors_proxy_server", `http://${window.location.hostname}:${process.env.CORS_PROXY_PORT}`); // By default, this will run on port 3001
    }

    private static getOidcConfig(): OidcFrontendClientConfiguration {
        const clientId = Config.App.get("imjs_test_oidc_client_id");
        const baseUri = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ``}`;
        const redirectUri = `${baseUri}${Config.App.get("imjs_test_oidc_redirect_path")}`;
        return { clientId, redirectUri };
    }

    public static async initialize() {
        UiCore.initialize(SampleAppIModelApp.i18n);
        UiComponents.initialize(SampleAppIModelApp.i18n);

        await UiFramework.initialize(SampleAppIModelApp.store, SampleAppIModelApp.i18n, SampleAppIModelApp.getOidcConfig());

        // Register tools.
        BackstageShow.register(this.sampleAppNamespace);
        BackstageHide.register(this.sampleAppNamespace);
        BackstageToggle.register(this.sampleAppNamespace);
        MeasurePointsTool.register(this.sampleAppNamespace);
    }

    public static async handleIModelViewsSelected(iModelInfo: IModelInfo, viewIdsSelected: Id64String[]) {

        const accessToken = SampleAppIModelApp.store.getState().frameworkState!.overallContentState.accessToken!;
        const projectInfo = iModelInfo.projectInfo;
        const wsgId = iModelInfo.wsgId;

        // open the imodel
        const iModelConnection = await UiFramework.iModelServices.openIModel(accessToken, projectInfo, wsgId);

        const payload = { iModelConnection };
        SampleAppIModelApp.store.dispatch({ type: "SampleApp:SETIMODELCONNECTION", payload });

        // we create a FrontStage that contains the views that we want.
        const frontstageProvider = new ViewsFrontstage(viewIdsSelected, iModelConnection);
        FrontstageManager.addFrontstageProvider(frontstageProvider);
        FrontstageManager.setActiveFrontstageDef(frontstageProvider.frontstageDef).then(() => {
            // Frontstage & ScreenViewports are ready
            // tslint:disable-next-line:no-console
            console.log("Frontstage is ready");
        });
    }

    public static handleWorkOffline() {
        if (!FrontstageManager.activeFrontstageDef) {
            const frontstageDef = FrontstageManager.findFrontstageDef("Test4");
            FrontstageManager.setActiveFrontstageDef(frontstageDef);
        }
    }
}

SampleAppIModelApp.startup();

// wait for both our i18n namespaces to be read.
SampleAppIModelApp.initialize().then(() => {
    //  create the application icon.
    const applicationIconStyle: CSSProperties = {
        width: "50px",
        height: "50px",
        fontSize: "50px",
        color: "red",
        marginLeft: "10px",
    };
    const applicationIcon = React.createElement(WebFontIcon, { iconName: "icon-construction-worker", style: applicationIconStyle });
    const overallContentProps = {
        appHeaderIcon: applicationIcon,
        appHeaderMessage: SampleAppIModelApp.i18n.translate("SampleApp:Header.welcome"),
        appBackstage: <AppBackstage />,
        onIModelViewsSelected: SampleAppIModelApp.handleIModelViewsSelected,
        onWorkOffline: SampleAppIModelApp.handleWorkOffline,
    };

    AppUi.initialize();

    ReactDOM.render(
        <Provider store={SampleAppIModelApp.store} >
            <OverallContent {...overallContentProps} />
        </Provider >,
        document.getElementById("root") as HTMLElement,
    );
});
