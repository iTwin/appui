/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type {
  ConfigurableCreateInfo,
  FrontstageConfig,
} from "../../appui-react.js";
import {
  ContentControl,
  ContentGroup,
  FrontstageProvider,
  MessageCenterField,
  StandardContentLayouts,
  StatusBarWidgetControl,
  WidgetState,
} from "../../appui-react.js";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";

/** @internal */
export class TestContentControl extends ContentControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);

    this.reactNode = <div />;
  }
}

/** @internal */
export class TestWidgetElement extends React.Component {
  public override componentDidMount() {}

  public override componentWillUnmount() {}

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

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup({
      id: "test-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "main",
          classId: TestContentControl,
          applicationData: { label: "Content 1a", bgColor: "black" },
        },
      ],
    });

    return {
      id: this.id,
      version: 1,
      contentGroup,
      usage: "MyUsage",
      contentManipulation: {
        id: "contentManipulation",
        content: <div />,
      },
      toolSettings: {
        id: "toolSettings",
      },
      leftPanel: {
        sections: {
          start: [
            {
              id: "widget3",
              defaultState: WidgetState.Open,
            },
          ],
          end: [
            {
              id: "widget4",
              defaultState: WidgetState.Open,
            },
          ],
        },
      },
      rightPanel: {
        sections: {
          start: [
            {
              id: "widget1",
              defaultState: WidgetState.Open,
              content: <div />,
            },
            {
              id: "widget6_2",
              content: <div />,
            },
          ],
          end: [
            {
              id: "widget1",
              defaultState: WidgetState.Open,
              content: <div />,
            },
            {
              id: "widget2",
              defaultState: WidgetState.Hidden,
              content: <div />,
            },
          ],
        },
      },
      statusBar: {
        id: "statusBar",
        icon: <SvgPlaceholder />,
        labelKey: "App:widgets.StatusBar",
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

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup({
      id: "test-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "main",
          classId: TestContentControl,
          applicationData: { label: "Content 1a", bgColor: "black" },
        },
      ],
    });

    return {
      id: this.id,
      version: 1,
      contentGroup,
      usage: "MyUsage",
      contentManipulation: {
        id: "contentManipulation",
        content: <div />,
      },
      toolSettings: {
        id: "toolSettings",
      },
      leftPanel: {
        sections: {
          start: [
            {
              id: "widget3",
              defaultState: WidgetState.Open,
            },
          ],
          end: [
            {
              id: "widget4",
              defaultState: WidgetState.Open,
            },
          ],
        },
      },
      rightPanel: {
        sections: {
          start: [
            {
              id: "widget1",
              defaultState: WidgetState.Open,
              content: <div />,
            },
            {
              id: "widget6_2",
              content: <div />,
            },
          ],
          end: [
            {
              id: "widget1",
              defaultState: WidgetState.Open,
              content: <div />,
            },
            {
              id: "widget2",
              defaultState: WidgetState.Hidden,
              content: <div />,
            },
          ],
        },
      },
      statusBar: {
        id: "statusBar",
        icon: <SvgPlaceholder />,
        labelKey: "App:widgets.StatusBar",
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

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup = new ContentGroup({
      id: "test-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "main",
          classId: TestContentControl,
        },
      ],
    });

    return {
      id: this.id,
      version: 1,
      contentGroup,
    };
  }
}
