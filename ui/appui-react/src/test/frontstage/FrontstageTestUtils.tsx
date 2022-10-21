/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { StandardContentLayouts, WidgetState } from "@itwin/appui-abstract";
import {
  ConfigurableCreateInfo, ContentControl, ContentGroup, CoreTools, FrontstageProps, FrontstageProvider,
  MessageCenterField, StatusBarWidgetControl, WidgetControl,
} from "../../appui-react";
import { ToolItemDef } from "../../appui-react/shared/ToolItemDef";

/** @internal */
export class TestContentControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    this.reactNode = <div />;
  }
}

/** @internal */
export class TestWidget extends WidgetControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    this.reactNode = <TestWidgetElement />;
  }
}

/** @internal */
export class TestWidgetElement extends React.Component {
  public override componentDidMount() {
  }

  public override componentWillUnmount() {
  }

  public override render() {
    return <div />;
  }
}

/** @internal */
export class AppStatusBarWidgetControl extends StatusBarWidgetControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
  }

  public getReactNode(): React.ReactNode {
    return (
      <>
        <MessageCenterField />
      </>
    );
  }
}

/** @internal */
export class TestFrontstage extends FrontstageProvider {
  public static stageId = "TestFrontstage";
  public get id(): string {
    return TestFrontstage.stageId;
  }

  public get defaultToolDef() {
    return new ToolItemDef({
      toolId: "dummy",
      iconSpec: "dummy",
      label: "dummy",
      description: "dummy",
      execute: async () => { },
    });
  }

  public override get frontstage(): FrontstageProps {
    const myContentGroup: ContentGroup = new ContentGroup(
      {
        id: "test-group",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "main",
            classId: TestContentControl,
            applicationData: { label: "Content 1a", bgColor: "black" },
          },
        ],
      },
    );

    return {
      id: this.id,
      defaultTool: this.defaultToolDef,
      contentGroup: myContentGroup,
      defaultContentId: "defaultContentId",
      applicationData: { key: "value" },
      usage: "MyUsage",
      contentManipulation: {
        isFreeform: true,
        element: <div />,
        applicationData: { key: "value" },
      },
      toolSettings: {
        isToolSettings: true,
      },
      leftPanel: {
        sections: {
          start: {
            widgets: [{
              id: "widget3",
              defaultState: WidgetState.Open,
              control: TestWidget,
              onWidgetStateChanged: () => { },
              saveTransientState: () => { },
              restoreTransientState: () => false,
            }],
          },
          end: {
            widgets: [{
              id: "widget4",
              defaultState: WidgetState.Open,
              control: TestWidget,
            }],
          },
        },
      },
      rightPanel: {
        sections: {
          start: {
            widgets: [
              {
                id: "widget1",
                defaultState: WidgetState.Open,
                element: <div />,
              },
              {
                id: "widget6_2",
                element: < div />,
              },
            ],
          },
          end: {
            widgets: [
              {
                id: "widget1",
                defaultState: WidgetState.Open,
                element: <div />,
              },
              {
                id: "widget2",
                defaultState: WidgetState.Hidden,
                element: < div />,
              },
            ],
          },
        },
      },
      statusBar: {
        id: "statusBar",
        isStatusBar: true,
        iconSpec: "icon-placeholder",
        labelKey: "App:widgets.StatusBar",
        control: AppStatusBarWidgetControl,
        applicationData: { key: "value" },
      },
    };
  }
}

/** @internal */
export class TestFrontstage2 extends FrontstageProvider {
  public static stageId = "TestFrontstage2";
  public override get id(): string {
    return TestFrontstage2.stageId;
  }

  public override get frontstage(): FrontstageProps {
    const myContentGroup: ContentGroup = new ContentGroup(
      {
        id: "test-group",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "main",
            classId: TestContentControl,
            applicationData: { label: "Content 1a", bgColor: "black" },
          },
        ],
      },
    );

    return {
      id: this.id,
      defaultTool: CoreTools.selectElementCommand,
      contentGroup: myContentGroup,
      defaultContentId: "defaultContentId",
      applicationData: { key: "value" },
      usage: "MyUsage",
      contentManipulation: {
        isFreeform: true,
        element: <div />,
        applicationData: { key: "value" },
      },
      toolSettings: {
        isToolSettings: true,
      },
      leftPanel: {
        sections: {
          start: {
            widgets: [{
              id: "widget3",
              defaultState: WidgetState.Open,
              control: TestWidget,
              onWidgetStateChanged: () => { },
              saveTransientState: () => { },
              restoreTransientState: () => false,
            }],
          },
          end: {
            widgets: [{
              id: "widget4",
              defaultState: WidgetState.Open,
              control: TestWidget,
            }],
          },
        },
      },
      rightPanel: {
        sections: {
          start: {
            widgets: [
              {
                id: "widget1",
                defaultState: WidgetState.Open,
                element: <div />,
              },
              {
                id: "widget6_2",
                element: <div />,
              },
            ],
          },
          end: {
            widgets: [
              {
                id: "widget1",
                defaultState: WidgetState.Open,
                element: <div />,
              },
              {
                id: "widget2",
                defaultState: WidgetState.Hidden,
                element: <div />,
              },
            ],
          },
        },
      },
      statusBar: {
        id: "statusBar",
        isStatusBar: true,
        iconSpec: "icon-placeholder",
        labelKey: "App:widgets.StatusBar",
        control: AppStatusBarWidgetControl,
        applicationData: { key: "value" },
      },
    };
  }
}

/** @internal */
export class TestFrontstage3 extends FrontstageProvider {
  public static stageId = "TestFrontstage3";
  public override get id(): string {
    return TestFrontstage3.stageId;
  }

  public override get frontstage(): FrontstageProps {
    const myContentGroup: ContentGroup = new ContentGroup(
      {
        id: "test-group",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "main", classId: TestContentControl,
          },
        ],
      },
    );

    return {
      id: this.id,
      defaultTool: new ToolItemDef({ toolId: "test" }),
      contentGroup: myContentGroup,
      defaultContentId: "defaultContentId",
    };
  }
}
