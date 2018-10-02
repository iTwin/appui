/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 - present Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { expect } from "chai";
import TestUtils from "../TestUtils";
import {
  ConfigurableUIManager,
  ItemPropsList,
  ToolItemDef,
  FrontstageManager,
  WidgetControl,
  ConfigurableCreateInfo,
  ContentGroupProps,
  ContentGroupManager,
  ContentLayoutProps,
  ContentLayoutManager,
  TaskPropsList,
  TaskManager,
  WorkflowManager,
  WorkflowPropsList,
} from "../../src/index";

describe("ConfigurableuIManager", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
    ConfigurableUIManager.initialize();
  });

  it("loadCommonItems & commonItems", () => {
    const commonItemsList: ItemPropsList = {
      items: [
        {
          toolId: "tool1",
          iconClass: "icon-placeholder",
          labelKey: "SampleApp:buttons.tool1",
        },
      ],
    };
    ConfigurableUIManager.loadCommonItems(commonItemsList);
    expect(ConfigurableUIManager.commonItems.get("tool1")).to.not.be.undefined;
  });

  it("addCommonItem & commonItems", () => {
    const item = {
      toolId: "tool2",
      iconClass: "icon-placeholder",
      labelKey: "SampleApp:buttons.tool2",
    };
    const itemDef = new ToolItemDef(item);
    ConfigurableUIManager.addCommonItem(itemDef);
    expect(ConfigurableUIManager.commonItems.get("tool2")).to.not.be.undefined;
  });

  it("loadFrontstages & findFrontstageDef", () => {
    const frontstagePropsList = [
      {
        id: "TestFrontstage1",
        defaultToolId: "PlaceLine",
        defaultLayout: "TwoHalvesVertical",
        contentGroup: "TestContentGroup1",
        defaultContentId: "TestContent1",
      },
    ];
    ConfigurableUIManager.loadFrontstages(frontstagePropsList);
    expect(ConfigurableUIManager.findFrontstageDef("TestFrontstage1")).to.not.be.undefined;
  });

  it("findFrontstageDef passed no argument", () => {
    FrontstageManager.setActiveFrontstageDef(undefined);
    expect(ConfigurableUIManager.findFrontstageDef()).to.be.undefined;
  });

  it("loadFrontstage & findItem", () => {
    const frontstageProps = {
      id: "TestFrontstage2",
      defaultToolId: "PlaceLine",
      defaultLayout: "TwoHalvesVertical",
      contentGroup: "TestContentGroup2",
      defaultContentId: "TestContent2",
      items: [
        {
          toolId: "frontstageTool",
          iconClass: "icon-placeholder",
          labelKey: "SampleApp:buttons.frontstageTool",
        },
      ],
    };
    ConfigurableUIManager.loadFrontstage(frontstageProps);
    const frontstageDef = ConfigurableUIManager.findFrontstageDef("TestFrontstage2");
    expect(frontstageDef).to.not.be.undefined;
    FrontstageManager.setActiveFrontstageDef(frontstageDef);
    expect(ConfigurableUIManager.findItem("frontstageTool")).to.not.be.undefined;
    expect(ConfigurableUIManager.findItem("tool2")).to.not.be.undefined;
  });

  class TestWidget extends WidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactElement = <div />;
    }
  }

  it("registerControl & createConfigurable using same classId", () => {
    ConfigurableUIManager.registerControl("TestWidget", TestWidget);
    expect(ConfigurableUIManager.createControl("TestWidget", "1")).to.not.be.undefined;
  });

  it("registerControl trying to register a classId already registered", () => {
    expect(() => ConfigurableUIManager.registerControl("TestWidget", TestWidget)).to.throw(Error);
  });

  it("createConfigurable trying to create an unregistered control", () => {
    expect(() => ConfigurableUIManager.createControl("invalid", "1")).to.throw(Error);
  });

  it("loadContentGroup", () => {
    const contentGroupProps: ContentGroupProps = {
      id: "testContentGroup1",
      contents: [
        {
          classId: "TestContentControl",
          applicationData: { label: "Content 1a", bgColor: "black" },
        },
      ],
    };
    ConfigurableUIManager.loadContentGroup(contentGroupProps);
    expect(ContentGroupManager.findGroup("testContentGroup1")).to.not.be.undefined;
  });

  it("loadContentGroups", () => {
    const contentGroupProps: ContentGroupProps[] = [
      {
        id: "testContentGroup2",
        contents: [
          {
            classId: "TestContentControl",
            applicationData: { label: "Content 1a", bgColor: "black" },
          },
        ],
      },
    ];
    ConfigurableUIManager.loadContentGroups(contentGroupProps);
    expect(ContentGroupManager.findGroup("testContentGroup2")).to.not.be.undefined;
  });

  it("loadContentLayout", () => {
    const contentLayoutProps: ContentLayoutProps = {
      // Three Views, one on the left, two stacked on the right.
      id: "testContentLayout1",
      descriptionKey: "SampleApp:ContentDef.ThreeRightStacked",
      priority: 85,
      verticalSplit: {
        percentage: 0.50,
        left: 0,
        right: { horizontalSplit: { percentage: 0.50, top: 1, bottom: 2 } },
      },
    };
    ConfigurableUIManager.loadContentLayout(contentLayoutProps);
    expect(ContentLayoutManager.findLayout("testContentLayout1")).to.not.be.undefined;
  });

  it("loadContentLayouts", () => {
    const contentLayoutProps: ContentLayoutProps[] = [
      {
        // Three Views, one on the left, two stacked on the right.
        id: "testContentLayout2",
        descriptionKey: "SampleApp:ContentDef.ThreeRightStacked",
        priority: 85,
        verticalSplit: {
          percentage: 0.50,
          left: 0,
          right: { horizontalSplit: { percentage: 0.50, top: 1, bottom: 2 } },
        },
      },
    ];
    ConfigurableUIManager.loadContentLayouts(contentLayoutProps);
    expect(ContentLayoutManager.findLayout("testContentLayout2")).to.not.be.undefined;
  });

  it("loadTasks", () => {
    const taskPropsList: TaskPropsList = {
      tasks: [
        {
          id: "Task1",
          primaryStageId: "Test1",
          iconClass: "icon-placeholder",
          labelKey: "SampleApp:backstage.task1",
        },
        {
          id: "Task2",
          primaryStageId: "Test2",
          iconClass: "icon-placeholder",
          labelKey: "SampleApp:backstage.task2",
        },
      ],
    };

    ConfigurableUIManager.loadTasks(taskPropsList);
    expect(TaskManager.findTask("Task1")).to.not.be.undefined;
  });

  it("loadWorkflows", () => {
    const workflowPropsList: WorkflowPropsList = {
      defaultWorkflowId: "default-workflow",
      taskPicker: {
        classid: "taskpicker-class",
        iconClass: "taskpicker-icon",
        labelKey: "taskpicker-label",
      },
      workflows: [
        {
          id: "ExampleWorkflow",
          iconClass: "icon-placeholder",
          labelKey: "Protogist:Test.my-label",
          defaultTaskId: "task1",
          tasks: ["Task1", "Task2"],
        },
      ],
    };

    ConfigurableUIManager.loadWorkflows(workflowPropsList);
    expect(WorkflowManager.findWorkflow("ExampleWorkflow")).to.not.be.undefined;
  });

});
