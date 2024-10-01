/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as moq from "typemoq";
import { render } from "@testing-library/react";
import type { ScreenViewport, ViewState3d } from "@itwin/core-frontend";
import {
  ConfigurableUiControlType,
  ContentGroup,
  FrontstageProvider,
  IModelViewportControl,
  StandardContentLayouts,
  UiFramework,
} from "../../appui-react.js";
import type {
  ConfigurableCreateInfo,
  FrontstageConfig,
  IModelViewportControlOptions,
  SupportsViewSelectorChange,
} from "../../appui-react.js";
import { storageMock } from "../TestUtils.js";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager.js";

const mySessionStorage = storageMock();
const propertyDescriptorToRestore = Object.getOwnPropertyDescriptor(
  window,
  "sessionStorage"
)!;

describe("IModelViewportControl", () => {
  const viewportMock = moq.Mock.ofType<ScreenViewport>();
  const viewMock = moq.Mock.ofType<ViewState3d>();

  beforeEach(async () => {
    Object.defineProperty(window, "sessionStorage", {
      get: () => mySessionStorage,
    });

    InternalFrontstageManager.isInitialized = false;
    InternalFrontstageManager.initialize();
  });

  afterEach(async () => {
    // restore the overriden property getter
    Object.defineProperty(
      window,
      "sessionStorage",
      propertyDescriptorToRestore
    );
  });

  class TestViewportContentControl extends IModelViewportControl {
    public static override get id() {
      return "TestApp.IModelViewport";
    }

    constructor(
      info: ConfigurableCreateInfo,
      options: IModelViewportControlOptions
    ) {
      super(info, { ...options, deferNodeInitialization: true }); // force deferNodeInitialization for subclass
      this.setIsReady();
    }

    protected override _getViewOverlay = (
      _viewport: ScreenViewport
    ): React.ReactNode => {
      return <div data-testid="ViewOverlay">ViewOverlay</div>;
    };

    protected override initializeReactNode() {
      this._reactNode = (
        <div data-testid="MainContent">
          {this._getViewOverlay(this.viewport!)}
        </div>
      );
    }

    public override get viewport(): ScreenViewport | undefined {
      return viewportMock.object;
    }
  }

  class Frontstage1 extends FrontstageProvider {
    public static stageId = "Test1";
    public override get id(): string {
      return Frontstage1.stageId;
    }

    public override frontstageConfig(): FrontstageConfig {
      const contentGroup = new ContentGroup({
        id: "test",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "main",
            classId: TestViewportContentControl,
            applicationData: { label: "Content 1a", bgColor: "black" },
          },
        ],
      });

      return {
        id: this.id,
        version: 1,
        contentGroup,
        viewNavigation: {
          id: "viewNavigation",
          content: <>NavigationWidget</>,
        },
      };
    }
  }

  beforeEach(async () => {
    viewMock.reset();
    viewMock
      .setup((view) => view.classFullName)
      .returns(() => "SheetViewDefinition");
    viewportMock.reset();
    viewportMock
      .setup((viewport) => viewport.view)
      .returns(() => viewMock.object);

    UiFramework.frontstages.clearFrontstageProviders();
    await UiFramework.frontstages.setActiveFrontstageDef(undefined);
  });

  it("Overridden IModelViewportControl should deferNodeInitialization", async () => {
    const frontstageProvider = new Frontstage1();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      Frontstage1.stageId
    );
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

    if (frontstageDef) {
      expect(UiFramework.content.layouts.activeLayout).to.exist;

      const contentControl = UiFramework.content.getActiveContentControl();
      expect(contentControl).toBeTruthy();
      expect(contentControl instanceof TestViewportContentControl).toEqual(
        true
      );

      if (contentControl) {
        expect(contentControl.isViewport).toEqual(true);
        expect(contentControl.viewport).toBeTruthy();
        expect(contentControl.getType()).toEqual(
          ConfigurableUiControlType.Viewport
        );

        const supportsContentControl =
          contentControl as unknown as SupportsViewSelectorChange;
        expect(supportsContentControl.supportsViewSelectorChange).toEqual(true);

        const controlNode = (contentControl as TestViewportContentControl)
          .reactNode;
        expect(controlNode).toBeTruthy();
        expect(React.isValidElement(controlNode)).toEqual(true);

        const componentWrapper = render(controlNode as React.ReactElement);
        expect(componentWrapper).toBeTruthy();
        expect(componentWrapper.getByTestId("MainContent")).toBeTruthy();
        expect(componentWrapper.getByTestId("ViewOverlay")).toBeTruthy();
      }
    }
  });
});
