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
  AppNotificationManager,
  ConfigurableUiContent,
  FrameworkAccuDraw,
  FrameworkToolAdmin,
  Frontstage,
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
import { IModelApp } from "@itwin/core-frontend";
import { FrontendIModelsAccess } from "@itwin/imodels-access-frontend";
import { IModelsClient } from "@itwin/imodels-client-authoring";
import { ProgressLinear, ThemeProvider } from "@itwin/itwinui-react";
import { createFrontstage } from "./Utils";
import { DemoIModel, useDemoIModel } from "../.storybook/addons/DemoIModel";
import { openDemoIModel } from "./openDemoIModel";

export interface AppUiStoryProps {
  appBackstage?: React.ReactNode;
  children?: React.ReactNode;
  demoIModel?: boolean | { default: DemoIModel };
  frontstages?: Frontstage[] | (() => Frontstage[]);
  itemProviders?: UiItemsProvider[];
  layout?: "fullscreen";
  onInitialize?: () => Promise<void>;
  onFrontstageActivated?: () => void;
  /** Only display provided children, otherwise, add ConfigurableUIContent component below children. Defaults to false; */
  displayChildrenOnly?: boolean;
}

export function AppUiStory(props: AppUiStoryProps) {
  const demoIModel = useStoryDemoIModel(props);
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    let ignore = false;

    const startup = async () => {
      await IModelApp.startup({
        accuDraw: new FrameworkAccuDraw(),
        toolAdmin: new FrameworkToolAdmin(),
        hubAccess: new FrontendIModelsAccess(
          new IModelsClient({
            api: {
              baseUrl: "https://api.bentley.com/imodels",
            },
          })
        ),
        authorizationClient: new DemoAuthClient(),
        notifications: new AppNotificationManager(),
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
      demoIModel && (await openDemoIModel(demoIModel));
      await props.onInitialize?.();

      for (const provider of props.itemProviders ?? []) {
        UiItemsManager.register(provider);
      }

      const frontstages = getFrontstages(props.frontstages);
      for (const frontstage of frontstages) {
        UiFramework.frontstages.addFrontstage(frontstage);
      }
      for (const provider of props.itemProviders ?? []) {
        UiItemsManager.register(provider);
      }

      if (ignore) return;
      setInitialized(true);
    };

    const shutdown = async () => {
      await UiFramework.getIModelConnection()?.close();
      await UiFramework.frontstages.setActiveFrontstageDef(undefined);
      UiFramework.frontstages.clearFrontstageProviders();
      for (const provider of props.itemProviders ?? []) {
        UiItemsManager.unregister(provider.id);
      }
      UiFramework.terminate();
      await IModelApp.shutdown();
    };

    const cleanup = appInitializer.initialize(startup, shutdown);
    return () => {
      ignore = true;
      setInitialized(false);
      cleanup();
    };
  }, [props, demoIModel]);
  if (!initialized) return <Initializer />;
  return <Initialized {...props} />;
}

function Initialized(props: AppUiStoryProps) {
  const { frontstages: frontstagesGetter, onFrontstageActivated } = props;
  React.useEffect(() => {
    let ignore = false;
    const frontstages = getFrontstages(frontstagesGetter);
    const frontstage = frontstages[0];
    (async function () {
      if (!frontstage) return;
      await UiFramework.frontstages.setActiveFrontstage(frontstage.id);
      if (ignore) return;
      onFrontstageActivated?.();
    })();
    return () => {
      ignore = true;
    };
  }, [frontstagesGetter, onFrontstageActivated]);
  return (
    <>
      <Provider store={UiFramework.store}>
        <ThemeManager>
          {props.children}
          {!props.displayChildrenOnly && (
            <ConfigurableUiContent
              style={{
                height:
                  props.layout === "fullscreen"
                    ? "100vh"
                    : "calc(100vh - 2rem)",
              }}
              appBackstage={props.appBackstage}
              widgetIcon={true}
            />
          )}
        </ThemeManager>
      </Provider>
    </>
  );
}

function Initializer() {
  return (
    <ThemeProvider>
      <ProgressLinear indeterminate labels={["Getting things ready!"]} />
    </ThemeProvider>
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

function getFrontstages(frontstages: AppUiStoryProps["frontstages"]) {
  if (!frontstages) return [createFrontstage()];
  if (Array.isArray(frontstages)) return frontstages;
  return frontstages();
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

const appInitializer = (() => {
  let latestStartup: () => Promise<void>;
  let initializer:
    | {
        cleanup: () => Promise<void>;
        startup: () => Promise<void>;
      }
    | undefined;
  return {
    initialize: (
      startup: () => Promise<void>,
      shutdown: () => Promise<void>
    ) => {
      latestStartup = startup;
      let ignore = false;

      void (async () => {
        // Run existing cleanup.
        if (initializer) {
          await initializer.cleanup();
        }

        // Initializer cleanup called.
        if (ignore) return;
        // Run latest initializer only.
        if (startup !== latestStartup) return;

        let shutdownPromise: Promise<void> | undefined;
        initializer = {
          cleanup: async () => {
            // Shutdown is already running.
            if (shutdownPromise) {
              await shutdownPromise;
              return;
            }

            // Wait for startup before running the shutdown.
            await startupPromise;
            shutdownPromise = shutdown();
            await shutdownPromise;
          },
          startup,
        };

        const startupPromise = startup();
        await startupPromise;
      })();
      return () => {
        ignore = true;
        if (initializer?.startup !== startup) return;
        void initializer.cleanup();
      };
    },
  };
})();

function useStoryDemoIModel(props: AppUiStoryProps) {
  const demoIModel = useDemoIModel();
  if (!props.demoIModel) return undefined;

  if (props.demoIModel === true) {
    return demoIModel;
  }

  return demoIModel ?? props.demoIModel?.default;
}
