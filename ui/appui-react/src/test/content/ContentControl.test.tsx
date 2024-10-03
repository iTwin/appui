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
  StandardContentLayouts,
  UiFramework,
} from "../../appui-react.js";

describe("ContentControl", () => {
  class TestContentControl extends ContentControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactNode = <div />;
    }
  }

  beforeEach(() => {
    UiFramework.controls.register("TestContentControl", TestContentControl);
  });

  afterEach(() => {
    UiFramework.controls.unregister("TestContentControl");
  });

  it("activated", async () => {
    const myContentGroup: ContentGroup = new ContentGroup({
      id: "myContentGroup",
      layout: StandardContentLayouts.singleView,
      contents: [
        { id: "main", classId: TestContentControl, applicationData: "data1" },
        {
          id: "secondary",
          classId: TestContentControl,
          applicationData: "data2",
        },
      ],
    });

    class Frontstage1 extends FrontstageProvider {
      public static stageId = "ContentFrontstage1";
      public override get id(): string {
        return Frontstage1.stageId;
      }

      public override frontstageConfig(): FrontstageConfig {
        return {
          id: this.id,
          version: 1,
          contentGroup: myContentGroup,
        };
      }
    }

    UiFramework.frontstages.addFrontstageProvider(new Frontstage1());

    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      Frontstage1.stageId
    );
    expect(frontstageDef).toBeTruthy();

    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
    const contentGroup = frontstageDef!.contentGroup;
    expect(contentGroup).toBeTruthy();

    const contentSet = contentGroup!.getContentNodes();
    expect(contentSet.length).toEqual(2);

    const contentControl = contentGroup!.getControlFromElement(contentSet[1])!;
    expect(contentControl).toBeTruthy();

    const activatedMethod = vi.spyOn(contentControl, "onActivated");
    UiFramework.content.setActive(contentSet[1]);
    expect(activatedMethod).toHaveBeenCalledOnce();

    expect(contentControl.isViewport).toEqual(false);
    expect(contentControl.viewport).toEqual(undefined);
    expect(contentControl.navigationAidControl.length).toEqual(0);
  });

  it("deactivated", async () => {
    const contentGroup2: ContentGroup = new ContentGroup({
      id: "contentGroup2",
      layout: StandardContentLayouts.twoHorizontalSplit,
      contents: [
        { id: "main", classId: TestContentControl, applicationData: "data1" },
        {
          id: "secondary",
          classId: TestContentControl,
          applicationData: "data2",
        },
      ],
    });

    class Frontstage2 extends FrontstageProvider {
      public static stageId = "ContentFrontstage2";
      public override get id(): string {
        return Frontstage2.stageId;
      }

      public override frontstageConfig(): FrontstageConfig {
        return {
          id: this.id,
          version: 1,
          contentGroup: contentGroup2,
        };
      }
    }

    UiFramework.frontstages.addFrontstageProvider(new Frontstage2());

    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      Frontstage2.stageId
    );
    expect(frontstageDef).toBeTruthy();

    if (frontstageDef) {
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
      const contentGroup = frontstageDef.contentGroup;
      expect(contentGroup).toBeTruthy();

      if (contentGroup) {
        const contentSet = contentGroup.getContentNodes();
        expect(contentSet.length).toEqual(2);

        const contentControl = contentGroup.getControlFromElement(
          contentSet[0]
        );
        expect(contentControl).toBeTruthy();

        if (contentControl) {
          const deactivatedMethod = vi.spyOn(contentControl, "onDeactivated");
          UiFramework.content.setActive(contentSet[1]);
          expect(deactivatedMethod).toHaveBeenCalledOnce();

          const activatedMethod = vi.spyOn(contentControl, "onActivated");
          UiFramework.content.refreshActive(contentSet[0]);
          expect(activatedMethod).toHaveBeenCalledOnce();
        }
      }
    }
  });
});
