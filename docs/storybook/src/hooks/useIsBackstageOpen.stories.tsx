/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  BackstageComposer,
  ConfigurableUiContent,
  IModelViewportControl,
  StageUsage,
  StandardFrontstageProvider,
  UiFramework,
  useBackstageManager,
  useIsBackstageOpen,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { AppUiDecorator } from "../AppUiDecorator";

function Demo() {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    void (async function () {
      await IModelApp.startup();
      await UiFramework.initialize(undefined);
      UiFramework.frontstages.addFrontstageProvider(
        new StandardFrontstageProvider({
          id: "main-frontstage",
          usage: StageUsage.Private,
          contentGroupProps: {
            id: "ViewportContentGroup",
            layout: StandardContentLayouts.singleView,
            contents: [
              {
                id: "ViewportContent",
                classId: IModelViewportControl,
                applicationData: {},
              },
            ],
          },
          cornerButton: (
            <BackstageAppButton
              label="Toggle Backstage"
              icon="icon-bentley-systems"
              execute={() => {
                UiFramework.backstage.getBackstageToggleCommand().execute();
              }}
            />
          ),
          hideStatusBar: true,
          hideToolSettings: true,
          hideNavigationAid: true,
        })
      );
      void UiFramework.frontstages.setActiveFrontstage("main-frontstage");
      setInitialized(true);
    })();
  }, []);
  if (!initialized) return null;
  return <Initialized />;
}

function Initialized() {
  const manager = useBackstageManager();
  const isOpen = useIsBackstageOpen(manager);
  return (
    <>
      <pre>
        <code>isOpen: {String(isOpen)}</code>
      </pre>
      <ConfigurableUiContent
        style={{ height: 300 }}
        appBackstage={<BackstageComposer />}
      />
    </>
  );
}

const meta: Meta = {
  title: "Hooks/useIsBackstageOpen",
  component: Demo,
  decorators: [AppUiDecorator],
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof Demo>;

export const Basic: Story = {};
