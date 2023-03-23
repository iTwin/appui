/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import * as moq from "typemoq";
import { IModelApp, NoRenderApp, ScreenViewport, ViewState3d } from "@itwin/core-frontend";
import {
  ConfigurableCreateInfo, ConfigurableUiControlType, ContentGroup,
  FloatingContentControl, FloatingViewportContentControl, FrontstageConfig, FrontstageProvider, SupportsViewSelectorChange,
  UiFramework,
  ViewportContentControl,
} from "../../appui-react";
import TestUtils, { storageMock } from "../TestUtils";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";

const mySessionStorage = storageMock();

const propertyDescriptorToRestore = Object.getOwnPropertyDescriptor(window, "sessionStorage")!;

describe("ViewportContentControl", () => {

  const viewportMock = moq.Mock.ofType<ScreenViewport>();
  const viewMock = moq.Mock.ofType<ViewState3d>();

  before(async () => {
    Object.defineProperty(window, "sessionStorage", {
      get: () => mySessionStorage,
    });

    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();

    InternalFrontstageManager.isInitialized = false;
    InternalFrontstageManager.initialize();
  });

  after(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();

    // restore the overriden property getter
    Object.defineProperty(window, "sessionStorage", propertyDescriptorToRestore);
  });

  class TestViewportContentControl extends ViewportContentControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactNode = <div />;

      this.setIsReady();
    }

    public override get viewport(): ScreenViewport | undefined { return viewportMock.object; }

  }

  class Frontstage1 extends FrontstageProvider {
    public static stageId = "Test1";
    public override get id(): string {
      return Frontstage1.stageId;
    }

    public override frontstageConfig(): FrontstageConfig {
      const contentGroup = new ContentGroup(
        {
          id: "test-group",
          layout: StandardContentLayouts.singleView,
          contents: [
            {
              id: "test",
              classId: TestViewportContentControl,
              applicationData: { label: "Content 1a", bgColor: "black" },
            },
          ],
        },
      );
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
    viewMock.setup((view) => view.classFullName).returns(() => "SheetViewDefinition");
    viewportMock.reset();
    viewportMock.setup((viewport) => viewport.view).returns(() => viewMock.object);

    UiFramework.frontstages.clearFrontstageProviders();
    await UiFramework.frontstages.setActiveFrontstageDef(undefined);
  });

  it("Frontstage should support ViewportContentControl", async () => {
    const frontstageProvider = new Frontstage1();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(frontstageProvider.id);
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

    if (frontstageDef) {
      expect(UiFramework.content.layouts.activeLayout?.id).to.eq("uia:singleView");

      const contentControl = UiFramework.content.getActiveContentControl();
      expect(contentControl).to.not.be.undefined;

      if (contentControl) {
        expect(contentControl.isViewport).to.be.true;
        expect(contentControl.viewport).to.not.be.undefined;
        expect(contentControl.getType()).to.eq(ConfigurableUiControlType.Viewport);

        const supportsContentControl = contentControl as unknown as SupportsViewSelectorChange;
        expect(supportsContentControl.supportsViewSelectorChange).to.be.true;
      }
    }
  });

  it("ViewportContentControl should return proper navigation aid for class name", async () => {
    const frontstageProvider = new Frontstage1();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(frontstageProvider.id);
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

    if (frontstageDef) {
      expect(UiFramework.content.layouts.activeLayout?.id).to.eq("uia:singleView");

      const contentControl = UiFramework.content.getActiveContentControl();
      expect(contentControl).to.not.be.undefined;

      if (contentControl) {
        expect(contentControl.navigationAidControl).to.eq("SheetNavigationAid");

        viewMock.reset();
        viewMock.setup((view) => view.classFullName).returns(() => "DrawingViewDefinition");
        expect(contentControl.navigationAidControl).to.eq("DrawingNavigationAid");

        viewMock.reset();
        viewMock.setup((view) => view.classFullName).returns(() => "SpatialViewDefinition");
        expect(contentControl.navigationAidControl).to.eq("CubeNavigationAid");

        viewMock.reset();
        viewMock.setup((view) => view.classFullName).returns(() => "OrthographicViewDefinition");
        expect(contentControl.navigationAidControl).to.eq("CubeNavigationAid");
      }
    }
  });

  it("UiFramework.frontstages.setActiveFrontstageDef should cause onActiveContentChangedEvent", async () => {
    const spyMethod = sinon.spy();
    const remove = UiFramework.content.onActiveContentChangedEvent.addListener(spyMethod);

    const frontstageProvider = new Frontstage1();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(Frontstage1.stageId);
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

    await TestUtils.flushAsyncOperations();
    expect(spyMethod.called).to.be.true;

    remove();
  });

  it("Can add and locate floating Content", async () => {
    const floatingNode = <div />;
    class TestFloatingContentControl extends FloatingContentControl {
      constructor() {
        super("TestFloatingContentControl", "TestFloatingContentControl", floatingNode);
      }
      // public override get viewport(): ScreenViewport | undefined { return viewportMock.object; }
    }
    const floatingViewportNode = <div />;

    class TestFloatingViewportContentControl extends FloatingViewportContentControl {
      constructor() {
        super("TestFloatingViewportContentControl", "TestFloatingViewportContentControl", null);
      }
      public override get viewport(): ScreenViewport | undefined { return viewportMock.object; }
    }

    const frontstageProvider = new Frontstage1();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(frontstageProvider.id);
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

    if (frontstageDef) {
      expect(UiFramework.content.layouts.activeLayout?.id).to.eq("uia:singleView");
      const contentControl = UiFramework.content.getActiveContentControl();
      expect(contentControl).to.not.be.undefined;

      const floatingControl = new TestFloatingContentControl();

      UiFramework.content.addFloatingContentControl(floatingControl);
      UiFramework.content.setActive(floatingControl.reactNode);

      let activeControl = UiFramework.content.getActiveContentControl();
      expect(activeControl).to.be.eql(floatingControl);

      UiFramework.content.dropFloatingContentControl(floatingControl);

      const floatingViewportControl = new TestFloatingViewportContentControl();
      UiFramework.content.addFloatingContentControl(floatingViewportControl);
      floatingViewportControl.reactNode = floatingViewportNode;

      UiFramework.content.setActive(floatingViewportControl.reactNode);

      activeControl = UiFramework.content.getActiveContentControl();
      expect(activeControl).to.be.eql(floatingViewportControl);

      UiFramework.content.dropFloatingContentControl(floatingViewportControl);
    }
  });

});
