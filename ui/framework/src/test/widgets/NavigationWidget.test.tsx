/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { expect } from "chai";
import { mount, shallow } from "enzyme";
import * as moq from "typemoq";
import TestUtils from "../TestUtils";
import {
  AnyWidgetProps,
  WidgetState,
  NavigationWidgetDef,
  ToolButton,
  NavigationWidget,
  ContentControl,
  ConfigurableCreateInfo,
  FrontstageManager,
  ItemList,
} from "../../ui-framework";
import { Toolbar, Direction } from "@bentley/ui-ninezone";
import { ConfigurableUiManager } from "../../ui-framework/configurableui/ConfigurableUiManager";
import { NavigationAidControl } from "../../ui-framework/navigationaids/NavigationAidControl";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import { CoreTools } from "../../ui-framework/CoreToolDefinitions";

describe("NavigationWidget", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  const widgetProps: AnyWidgetProps = {
    id: "navigationWidget",
    classId: "NavigationWidget",
    defaultState: WidgetState.Open,
    isFreeform: true,
    iconSpec: "icon-home",
    labelKey: "SampleApp:Test.my-label",
    navigationAidId: "StandardRotationNavigationAid",
    horizontalDirection: Direction.Top,
    verticalDirection: Direction.Left,
  };

  it("NavigationWidgetDef from WidgetProps", () => {

    const widgetDef = new NavigationWidgetDef(widgetProps);
    expect(widgetDef).to.be.instanceof(NavigationWidgetDef);

    const navigationWidgetDef = widgetDef as NavigationWidgetDef;

    const reactElement = navigationWidgetDef.reactElement;
    expect(reactElement).to.not.be.undefined;

    const reactNode = navigationWidgetDef.renderCornerItem();
    expect(reactNode).to.not.be.undefined;
  });

  const horizontalToolbar =
    <Toolbar
      expandsTo={Direction.Bottom}
      items={
        <>
          <ToolButton toolId="tool1" iconSpec="icon-placeholder" labelKey="SampleApp:buttons.tool1" />
          <ToolButton toolId="tool2" iconSpec="icon-placeholder" labelKey="SampleApp:buttons.tool2" />
        </>
      }
    />;

  const verticalToolbar =
    <Toolbar
      expandsTo={Direction.Left}
      items={
        <>
          <ToolButton toolId="tool1" iconSpec="icon-placeholder" labelKey="SampleApp:buttons.tool1" />
          <ToolButton toolId="tool2" iconSpec="icon-placeholder" labelKey="SampleApp:buttons.tool2" />
        </>
      }
    />;

  it("NavigationWidget should render", () => {
    const wrapper = mount(
      <NavigationWidget
        horizontalToolbar={horizontalToolbar}
        verticalToolbar={verticalToolbar}
      />,
    );
    wrapper.unmount();
  });

  it("NavigationWidget should render correctly", () => {
    shallow(
      <NavigationWidget
        id="navigationWidget"
        horizontalToolbar={horizontalToolbar}
        verticalToolbar={verticalToolbar}
      />,
    ).should.matchSnapshot();
  });

  it("NavigationWidget should render with an item list", () => {
    const hItemList = new ItemList([CoreTools.selectElementCommand]);
    const vItemList = new ItemList([CoreTools.fitViewCommand]);

    const wrapper = mount(
      <NavigationWidget
        horizontalItems={hItemList}
        verticalItems={vItemList}
      />,
    );
    wrapper.unmount();
  });

  it("NavigationWidget should support update", () => {
    const wrapper = mount(
      <NavigationWidget
        horizontalToolbar={horizontalToolbar}
        verticalToolbar={verticalToolbar}
      />,
    );
    expect(wrapper.find(ToolButton).length).to.eq(4);

    wrapper.setProps({ verticalToolbar: undefined });
    wrapper.update();
    expect(wrapper.find(ToolButton).length).to.eq(2);

    wrapper.unmount();
  });

  class TestContentControl extends ContentControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactElement = <div />;
    }
  }

  class TestNavigationAidControl extends NavigationAidControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactElement = <div>Test Navigation Aid</div>;
    }
  }

  it("NavigationWidgetDef with invalid navigation aid should throw Error", () => {
    const def = new NavigationWidgetDef({
      navigationAidId: "Aid1",
    });
    ConfigurableUiManager.registerControl("Aid1", TestContentControl);
    expect(() => def.renderCornerItem()).to.throw(Error);
    ConfigurableUiManager.unregisterControl("Aid1");
  });

  it("NavigationWidgetDef should handle updateNavigationAid", () => {
    const def = new NavigationWidgetDef({
      navigationAidId: "Aid1",
    });
    ConfigurableUiManager.registerControl("Aid1", TestNavigationAidControl);

    const element = def.reactElement;
    expect(def.reactElement).to.eq(element);
    const wrapper = mount(element as React.ReactElement<any>);

    const connection = moq.Mock.ofType<IModelConnection>();
    FrontstageManager.setActiveNavigationAid("Aid1", connection.object);
    wrapper.update();

    FrontstageManager.setActiveToolId(CoreTools.selectElementCommand.toolId);

    ConfigurableUiManager.unregisterControl("Aid1");
    wrapper.unmount();
  });

});
