/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import * as sinon from "sinon";
import {
  Backstage,
  CommandLaunchBackstageItem,
  FrontstageLaunchBackstageItem,
  TaskLaunchBackstageItem,
  FrontstageManager,
  SyncUiEventDispatcher,
} from "../../ui-framework";
import TestUtils, { MockAccessToken } from "../TestUtils";
import { SeparatorBackstageItem } from "../../ui-framework/backstage/Separator";

describe("Backstage", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();

    FrontstageManager.setActiveFrontstageDef(undefined); // tslint:disable-line:no-floating-promises
    SyncUiEventDispatcher.initialize();   // To process Backstage events
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  describe("<Backstage />", () => {
    it("should render - isVisible", () => {
      const wrapper = mount(<Backstage isVisible={true} />);
      wrapper.unmount();
    });

    it("should render - !isVisible", () => {
      const wrapper = mount(<Backstage isVisible={false} />);
      wrapper.unmount();
    });

    it("renders correctly - isVisible", () => {
      shallow(<Backstage isVisible={true} />).dive().should.matchSnapshot();
    });

    it("renders correctly - !isVisible", () => {
      shallow(<Backstage isVisible={false} />).dive().should.matchSnapshot();
    });

    it("renders correctly with header", () => {
      shallow(<Backstage header={<div> Hello World! </div>} />).dive().should.matchSnapshot();
    });

    it("renders correctly with AccessToken", () => {
      shallow(<Backstage accessToken={new MockAccessToken()} />).dive().should.matchSnapshot();
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
      ).dive().should.matchSnapshot();
    });

    it("should show", () => {
      const wrapper = mount(<Backstage isVisible={false} />);
      expect(Backstage.isBackstageVisible).to.be.false;
      Backstage.show();
      expect(Backstage.isBackstageVisible).to.be.true;
      wrapper.unmount();
    });

    it("should hide", () => {
      const wrapper = mount(<Backstage isVisible={true} />);
      expect(Backstage.isBackstageVisible).to.be.true;
      Backstage.hide();
      expect(Backstage.isBackstageVisible).to.be.false;
      wrapper.unmount();
    });

    it("should toggle", () => {
      const wrapper = mount(<Backstage isVisible={false} />);
      expect(Backstage.isBackstageVisible).to.be.false;

      const toggleCommand = Backstage.backstageToggleCommand;
      toggleCommand.execute();
      expect(Backstage.isBackstageVisible).to.be.true;

      toggleCommand.execute();
      expect(Backstage.isBackstageVisible).to.be.false;

      wrapper.unmount();
    });

    it("should show by updating isVisible prop", () => {
      const wrapper = mount(<Backstage isVisible={false} />);
      expect(Backstage.isBackstageVisible).to.be.false;
      wrapper.setProps({ isVisible: true });
      expect(Backstage.isBackstageVisible).to.be.true;
      wrapper.unmount();
    });

    it("should close when clicking the overlay", () => {
      const spyMethod = sinon.spy();
      const wrapper = mount(<Backstage isVisible={true} onClose={spyMethod} />);
      expect(Backstage.isBackstageVisible).to.be.true;
      const overlay = wrapper.find("div.nz-backstage-backstage_overlay");
      overlay.simulate("click");
      expect(Backstage.isBackstageVisible).to.be.false;
      expect(spyMethod.calledOnce).to.be.true;
      wrapper.unmount();
    });
  });
});
