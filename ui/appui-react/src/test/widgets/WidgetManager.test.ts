/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Logger } from "@itwin/core-bentley";
import type { UiItemsProvider, Widget } from "../../appui-react";
import {
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  UiItemsManager,
  WidgetDef,
  WidgetManager,
  WidgetState,
} from "../../appui-react";
import { TestUtils } from "../TestUtils";

class TestUiProvider implements UiItemsProvider {
  public readonly id = "TestUiProvider-Widget";

  public provideWidgets(
    stageId: string,
    _stageUsage: string,
    location: StagePanelLocation,
    _section?: StagePanelSection
  ): ReadonlyArray<Widget> {
    const widgets: Widget[] = [];
    if (stageId === "TestStage" && location === StagePanelLocation.Right) {
      widgets.push({
        id: "test2",
        content: "Hello World!",
      });
    } else if (stageId === "TestStage") {
      widgets.push({
        id: "test3",
        content: "Hello World!",
      });
    } else if (
      stageId === "TestStageWithFloatingWidgets" &&
      location === StagePanelLocation.Right
    ) {
      widgets.push({
        id: "test-floating-1",
        content: "Hello World!",
        priority: 0,
        defaultState: WidgetState.Floating,
        canFloat: {
          defaultPosition: { x: 100, y: 200 },
          defaultSize: { width: 400, height: 200 },
          containerId: "my-floating-container",
          isResizable: false,
        },
      });
      widgets.push({
        id: "test-floating-2",
        content: "Hello World 2!",
        defaultState: WidgetState.Floating,
        canFloat: true,
        priority: 100,
      });
    }
    return widgets;
  }
}

describe("WidgetManager", () => {
  let widgetManager: WidgetManager;

  beforeEach(() => {
    widgetManager = new WidgetManager();
  });

  it("addWidgetDef should log error when no stageId or stageUsage is provided", () => {
    const spy = vi.spyOn(Logger, "logError");
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      undefined,
      undefined,
      StagePanelLocation.Bottom
    );
    expect(spy).toHaveBeenCalledOnce();
  });

  it("addWidgetDef should add a WidgetDef targeting a stageId", () => {
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      "TestStage",
      undefined,
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgets.length).toEqual(1);
  });

  it("addWidgetDef should add a WidgetDef targeting a stageUsage", () => {
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      undefined,
      "TestUsage",
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgetCount).toEqual(1);
  });

  it("addWidgetDef should add another WidgetDef", () => {
    const widgetDef = WidgetDef.create({
      id: "test1",
    });

    widgetManager.addWidgetDef(
      widgetDef,
      undefined,
      "TestUsage",
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgetCount).toEqual(1);

    const widgetDef2 = WidgetDef.create({
      id: "test2",
    });
    widgetManager.addWidgetDef(
      widgetDef2,
      "TestStage",
      undefined,
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgetCount).toEqual(2);
  });

  it("addWidgetDef should not add a duplicate WidgetDef", () => {
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      undefined,
      "TestUsage",
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgetCount).toEqual(1);
    widgetManager.addWidgetDef(
      widgetDef,
      undefined,
      "TestUsage",
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgetCount).toEqual(1);
  });

  it("getWidgetDefs should find a WidgetDef targeting a stageId", () => {
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      "TestStage",
      undefined,
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgetCount).toEqual(1);

    const widgetDefs = widgetManager.getWidgetDefs(
      "TestStage",
      StageUsage.General,
      StagePanelLocation.Bottom
    );
    expect(widgetDefs).toBeTruthy();
    if (widgetDefs) expect(widgetDefs.length).toEqual(1);
  });

  it("getWidgetDefs should find a WidgetDef targeting a stageUsage", () => {
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      undefined,
      "TestUsage",
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgetCount).toEqual(1);

    const widgetDefs = widgetManager.getWidgetDefs(
      "TestStage",
      "TestUsage",
      StagePanelLocation.Bottom
    );
    expect(widgetDefs).toBeTruthy();
    if (widgetDefs) expect(widgetDefs.length).toEqual(1);
  });

  it("getWidgetDefs should find a WidgetDef with location & section", () => {
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      "TestStage",
      "TestUsage",
      StagePanelLocation.Bottom,
      StagePanelSection.Start
    );
    expect(widgetManager.widgetCount).toEqual(1);

    const widgetDefs = widgetManager.getWidgetDefs(
      "TestStage",
      "TestUsage",
      StagePanelLocation.Bottom,
      StagePanelSection.Start
    );
    expect(widgetDefs).toBeTruthy();
    if (widgetDefs) expect(widgetDefs.length).toEqual(1);
  });

  it("getWidgetDefs should get a WidgetDef from an 'addon' UiItemsProvider", async () => {
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      "TestStage",
      undefined,
      StagePanelLocation.Right
    );
    expect(widgetManager.widgetCount).toEqual(1);

    const testUiProvider = new TestUiProvider();
    UiItemsManager.register(testUiProvider);
    await TestUtils.flushAsyncOperations();

    const widgetDefs = widgetManager.getWidgetDefs(
      "TestStage",
      StageUsage.General,
      StagePanelLocation.Right
    );
    expect(widgetDefs).toBeTruthy();
    if (widgetDefs) expect(widgetDefs.length).toEqual(2);

    const zoneWidgetDefs = widgetManager.getWidgetDefs(
      "TestStage",
      StageUsage.General,
      StagePanelLocation.Bottom
    );
    expect(zoneWidgetDefs).toBeTruthy();
    if (zoneWidgetDefs) expect(zoneWidgetDefs.length).toEqual(1);

    UiItemsManager.unregister(testUiProvider.id);
  });

  it("getWidgetDefs should get a WidgetDef with default floating stage from an 'addon' UiItemsProvider", async () => {
    const testUiProvider = new TestUiProvider();
    UiItemsManager.register(testUiProvider);
    await TestUtils.flushAsyncOperations();

    const widgetDefs = widgetManager.getWidgetDefs(
      "TestStageWithFloatingWidgets",
      StageUsage.General,
      StagePanelLocation.Right
    );
    expect(widgetDefs).toBeTruthy();
    expect(widgetDefs?.length).toEqual(2);
    expect(widgetDefs?.[0].floatingContainerId).toEqual(
      "my-floating-container"
    );
    expect(widgetDefs?.[0].defaultFloatingPosition).to.eql({ x: 100, y: 200 });
    UiItemsManager.unregister(testUiProvider.id);
  });

  it("getWidgetDefs should not find a WidgetDef if no match", () => {
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      "TestStage",
      "TestUsage",
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgetCount).toEqual(1);

    const widgetDefs = widgetManager.getWidgetDefs(
      "NotUsage",
      "NotStage",
      StagePanelLocation.Bottom,
      StagePanelSection.Start
    );
    expect(widgetDefs).to.be.undefined;
  });

  it("removeWidgetDef should remove a WidgetDef", () => {
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      "TestStage",
      "TestUsage",
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgetCount).toEqual(1);

    const result = widgetManager.removeWidgetDef("test");
    expect(result).toEqual(true);
    expect(widgetManager.widgetCount).toEqual(0);
  });

  it("removeWidgetDef should not remove a WidgetDef if not found", () => {
    const widgetDef = WidgetDef.create({
      id: "test",
    });
    widgetManager.addWidgetDef(
      widgetDef,
      "TestStage",
      "TestUsage",
      StagePanelLocation.Bottom
    );
    expect(widgetManager.widgetCount).toEqual(1);

    const result = widgetManager.removeWidgetDef("test2");
    expect(result).toEqual(false);
    expect(widgetManager.widgetCount).toEqual(1);
  });
});
