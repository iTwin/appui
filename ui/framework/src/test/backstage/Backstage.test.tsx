/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import * as sinon from "sinon";
import {
  Backstage,
  CommandLaunchBackstageItem,
  FrontstageLaunchBackstageItem,
  SeparatorBackstageItem,
  TaskLaunchBackstageItem,
  FrontstageManager,
  FrontstageActivatedEventArgs,
  ConfigurableUiManager,
  TaskPropsList,
  WorkflowPropsList,
  FrontstageProvider,
  Frontstage,
  FrontstageProps,
} from "../../ui-framework";
import TestUtils from "../TestUtils";
import { BackstageItem as NZ_BackstageItem } from "@bentley/ui-ninezone";
import { CoreTools } from "../../ui-framework/CoreToolDefinitions";
import { SyncUiEventDispatcher } from "../../ui-framework/syncui/SyncUiEventDispatcher";
import { BackstageItemState } from "../../ui-framework/backstage/Backstage";

describe("Backstage", () => {
  const testEventId = "test-state-function-event";

  before(async () => {
    await TestUtils.initializeUiFramework();

    FrontstageManager.setActiveFrontstageDef(undefined); // tslint:disable-line:no-floating-promises
  });

  describe("<Backstage />", () => {
    it("should render - isVisible", () => {
      mount(<Backstage isVisible={true} />);
    });

    it("should render - !isVisible", () => {
      mount(<Backstage isVisible={false} />);
    });

    it("renders correctly - isVisible", () => {
      shallow(<Backstage isVisible={true} />).should.matchSnapshot();
    });

    it("renders correctly - !isVisible", () => {
      shallow(<Backstage isVisible={false} />).should.matchSnapshot();
    });

    it("with child items", () => {
      const commandHandler = () => { };
      shallow(
        <Backstage isVisible={true}>
          <CommandLaunchBackstageItem commandId="my-command-id" labelKey="UiFramework:tests.label" iconSpec="icon-placeholder" execute={commandHandler} />
          <SeparatorBackstageItem />
          <FrontstageLaunchBackstageItem frontstageId="Test1" labelKey="UiFramework:tests.label" iconSpec="icon-placeholder" />
          <SeparatorBackstageItem />
          <TaskLaunchBackstageItem taskId="Task1" workflowId="ExampleWorkflow" labelKey="UiFramework:tests.label" iconSpec="icon-placeholder" />
        </Backstage>,
      ).should.matchSnapshot();
    });

    it("SeparatorBackstageItem should render", () => {
      mount(<SeparatorBackstageItem />);
    });

    it("SeparatorBackstageItem renders correctly", () => {
      shallow(<SeparatorBackstageItem />).should.matchSnapshot();
    });

    it("CommandLaunchBackstageItem should render & execute", () => {
      const spyMethod = sinon.stub();
      let stateFuncRun = false;
      const stateFunc = (state: Readonly<BackstageItemState>): BackstageItemState => {
        stateFuncRun = true;
        return { ...state, isEnabled: false } as BackstageItemState;
      };
      const wrapper = mount(
        <CommandLaunchBackstageItem commandId="my-command-id" labelKey="UiFramework:tests.label"
          descriptionKey="UiFramework:tests.subtitle" iconSpec="icon-placeholder" execute={spyMethod}
          stateSyncIds={[testEventId]} stateFunc={stateFunc} />,
      );

      expect(stateFuncRun).to.be.false;
      SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(testEventId);
      expect(stateFuncRun).to.be.true;

      const backstageItem = wrapper.find(NZ_BackstageItem);
      backstageItem.find(".nz-backstage-item").simulate("click");
      expect(spyMethod.calledOnce).to.be.true;
      wrapper.unmount();
    });

    it("CommandLaunchBackstageItem should render & execute with args", () => {
      let argsPassed = false;
      const testExecute = (args: any) => { if (args) argsPassed = true; };
      const wrapper = mount(
        <CommandLaunchBackstageItem commandId="my-command-id" labelKey="UiFramework:tests.label"
          descriptionKey="UiFramework:tests.subtitle" iconSpec="icon-placeholder" execute={testExecute}
          getCommandArgs={() => (["arg1", "arg2"])}
        />,
      );

      expect(argsPassed).to.be.false;
      const backstageItem = wrapper.find(NZ_BackstageItem);
      backstageItem.find(".nz-backstage-item").simulate("click");
      expect(argsPassed).to.be.true;
      wrapper.unmount();
    });

    it("CommandLaunchBackstageItem renders correctly", () => {
      const commandHandler = () => { };
      shallow(<CommandLaunchBackstageItem commandId="my-command-id" labelKey="UiFramework:tests.label" iconSpec="icon-placeholder" execute={commandHandler} />).should.matchSnapshot();
    });

    it("FrontstageLaunchBackstageItem should render & execute", () => {
      const spyMethod = sinon.stub();
      let stateFuncRun = false;
      const stateFunc = (state: Readonly<BackstageItemState>): BackstageItemState => {
        stateFuncRun = true;
        return { ...state, isActive: true } as BackstageItemState;
      };

      class Frontstage1 extends FrontstageProvider {
        public get frontstage(): React.ReactElement<FrontstageProps> {
          return (
            <Frontstage
              id="Test1"
              defaultTool={CoreTools.selectElementCommand}
              defaultLayout="FourQuadrants"
              contentGroup="TestContentGroup1"
            />
          );
        }
      }
      ConfigurableUiManager.addFrontstageProvider(new Frontstage1());

      const remove = FrontstageManager.onFrontstageActivatedEvent.addListener((_args: FrontstageActivatedEventArgs) => spyMethod());
      const wrapper = mount(
        <FrontstageLaunchBackstageItem frontstageId="Test1" labelKey="UiFramework:tests.label" iconSpec="icon-placeholder"
          stateSyncIds={[testEventId]} stateFunc={stateFunc} />,
      );

      expect(stateFuncRun).to.be.false;
      SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(testEventId);
      expect(stateFuncRun).to.be.true;
      wrapper.update();

      const backstageItem = wrapper.find(NZ_BackstageItem);
      backstageItem.find(".nz-backstage-item").simulate("click");
      setImmediate(() => {
        expect(spyMethod.calledOnce).to.be.true;
        remove();
        wrapper.unmount();
      });
    });

    it("FrontstageLaunchBackstageItem renders correctly", () => {
      shallow(<FrontstageLaunchBackstageItem frontstageId="Test1" labelKey="UiFramework:tests.label" iconSpec="icon-placeholder" />).should.matchSnapshot();
    });

    it("TaskLaunchBackstageItem should render & execute", () => {
      class Frontstage1 extends FrontstageProvider {
        public get frontstage(): React.ReactElement<FrontstageProps> {
          return (
            <Frontstage
              id="Test1"
              defaultTool={CoreTools.selectElementCommand}
              defaultLayout="FourQuadrants"
              contentGroup="TestContentGroup1"
            />
          );
        }
      }
      const frontstageProvider = new Frontstage1();
      ConfigurableUiManager.addFrontstageProvider(frontstageProvider);

      const taskPropsList: TaskPropsList = {
        tasks: [
          {
            id: "Task1",
            primaryStageId: "Test1",
            iconSpec: "icon-placeholder",
            labelKey: "SampleApp:backstage.task1",
          },
        ],
      };

      ConfigurableUiManager.loadTasks(taskPropsList);

      // Test Workflows
      const workflowPropsList: WorkflowPropsList = {
        defaultWorkflowId: "default-workflow",
        workflows: [
          {
            id: "ExampleWorkflow",
            iconSpec: "icon-placeholder",
            labelKey: "SampleApp:Test.my-label",
            defaultTaskId: "task1",
            tasks: ["Task1"],
          },
        ],
      };

      ConfigurableUiManager.loadWorkflows(workflowPropsList);

      const spyMethod = sinon.stub();
      const stateFunc = sinon.stub();
      const remove = FrontstageManager.onFrontstageActivatedEvent.addListener((_args: FrontstageActivatedEventArgs) => spyMethod());
      const wrapper = mount(
        <TaskLaunchBackstageItem taskId="Task1" workflowId="ExampleWorkflow" labelKey="UiFramework:tests.label" iconSpec="icon-placeholder"
          stateSyncIds={[testEventId]} stateFunc={stateFunc} />,
      );
      const backstageItem = wrapper.find(NZ_BackstageItem);

      expect(stateFunc.calledOnce).to.be.false;
      SyncUiEventDispatcher.dispatchImmediateSyncUiEvent(testEventId);
      expect(stateFunc.calledOnce).to.be.true;

      backstageItem.find(".nz-backstage-item").simulate("click");
      setImmediate(() => {
        expect(spyMethod.calledOnce).to.be.true;
        remove();
        wrapper.unmount();
      });
    });

    it("TaskLaunchBackstageItem renders correctly", () => {
      shallow(<TaskLaunchBackstageItem taskId="Task1" workflowId="ExampleWorkflow" labelKey="UiFramework:tests.label" iconSpec="icon-placeholder" />).should.matchSnapshot();
    });

  });
});
