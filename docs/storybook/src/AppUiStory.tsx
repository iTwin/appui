/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { Provider } from "react-redux";
import {
  Controls,
  Description,
  Primary,
  Subtitle,
  Title,
} from "@storybook/blocks";
import {
  ConfigurableUiContent,
  FrameworkToolAdmin,
  FrontstageProvider,
  StateManager,
  ThemeManager,
  UiFramework,
  UiItemsManager,
  UiItemsProvider,
} from "@itwin/appui-react";
import {
  AuthorizationClient,
  BentleyCloudRpcManager,
  IModelReadRpcInterface,
  IModelTileRpcInterface,
  SnapshotIModelRpcInterface,
} from "@itwin/core-common";
import {
  CheckpointConnection,
  IModelApp,
  IModelConnection,
  ViewCreator3d,
} from "@itwin/core-frontend";
import { FrontendIModelsAccess } from "@itwin/imodels-access-frontend";
import { IModelsClient } from "@itwin/imodels-client-authoring";
import { createFrontstageProvider } from "./Utils";
import { DemoIModel, useDemoIModel } from "../.storybook/addons/DemoIModel";

export interface AppUiStoryProps {
  appBackstage?: React.ReactNode;
  children?: React.ReactNode;
  onInitialize?: () => Promise<void>;
  itemProviders?: UiItemsProvider[];
  layout?: "fullscreen";
  frontstageProviders?: FrontstageProvider[] | (() => FrontstageProvider[]);
}

let cleanup: Promise<void>;

export function AppUiStory(props: AppUiStoryProps) {
  const demoIModel = useDemoIModel();

  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    void (async function () {
      await cleanup;
      await IModelApp.startup({
        toolAdmin: new FrameworkToolAdmin(),
        hubAccess: new FrontendIModelsAccess(
          new IModelsClient({
            api: {
              baseUrl: "https://api.bentley.com/imodels",
            },
          })
        ),
        authorizationClient: new DemoAuthClient(),
      });
      await UiFramework.initialize(undefined);
      BentleyCloudRpcManager.initializeClient(
        {
          info: {
            title: "visualization",
            version: "v4.0",
          },
          pathPrefix: "https://api.bentley.com/imodeljs",
        },
        [
          IModelReadRpcInterface,
          IModelTileRpcInterface,
          SnapshotIModelRpcInterface,
        ]
      );
      demoIModel && (await openIModel(demoIModel));
      await props.onInitialize?.();

      const frontstageProviders = getFrontstageProviders(
        props.frontstageProviders
      );
      for (const provider of frontstageProviders) {
        UiFramework.frontstages.addFrontstageProvider(provider);
      }
      for (const provider of props.itemProviders ?? []) {
        UiItemsManager.register(provider);
      }
      setInitialized(true);
    })();
    return () => {
      cleanup = (async () => {
        await UiFramework.frontstages.setActiveFrontstageDef(undefined);
        UiFramework.frontstages.clearFrontstageProviders();
        for (const provider of props.itemProviders ?? []) {
          UiItemsManager.unregister(provider.id);
        }
        UiFramework.getIModelConnection()?.close();
        UiFramework.terminate();
        await IModelApp.shutdown();
      })();
      setInitialized(false);
    };
  }, [props]);
  if (!initialized) return null;
  return <Initialized {...props} />;
}

function Initialized(props: AppUiStoryProps) {
  React.useEffect(() => {
    const frontstageProviders = getFrontstageProviders(
      props.frontstageProviders
    );
    const defaultProvider = frontstageProviders[0];
    defaultProvider &&
      void UiFramework.frontstages.setActiveFrontstage(defaultProvider.id);
  }, []);
  return (
    <>
      <Provider store={StateManager.store}>
        <ThemeManager>
          {props.children}
          <ConfigurableUiContent
            style={{
              height:
                props.layout === "fullscreen" ? "100vh" : "calc(100vh - 2rem)",
            }}
            appBackstage={props.appBackstage}
          />
        </ThemeManager>
      </Provider>
    </>
  );
}

export function Page() {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
    </>
  );
}

function getFrontstageProviders(
  frontstageProviders: AppUiStoryProps["frontstageProviders"]
) {
  if (!frontstageProviders) return [createFrontstageProvider()];
  if (Array.isArray(frontstageProviders)) return frontstageProviders;
  return frontstageProviders();
}

class DemoAuthClient implements AuthorizationClient {
  private accessToken: Promise<string> | undefined = undefined;

  public async getAccessToken(): Promise<string> {
    this.accessToken ??= (async () => {
      const response = await fetch(
        "https://connect-itwinjscodesandbox.bentley.com/api/userToken"
      );
      const result = await response.json();
      setTimeout(
        () => (this.accessToken = undefined),
        new Date(result._expiresAt).getTime() - new Date().getTime() - 5000
      );
      return `Bearer ${result._jwt}`;
    })();
    return this.accessToken;
  }
}

export async function openIModel({
  iTwinId,
  iModelId,
}: Pick<DemoIModel, "iTwinId" | "iModelId">) {
  const iModelConnection = await CheckpointConnection.openRemote(
    iTwinId,
    iModelId
  );
  UiFramework.setIModelConnection(iModelConnection, true);
  const viewState = await getViewState(iModelConnection);
  UiFramework.setDefaultViewState(viewState, true);
}

async function getViewState(iModelConnection: IModelConnection) {
  const viewCreator = new ViewCreator3d(iModelConnection);
  return viewCreator.createDefaultView();
}
