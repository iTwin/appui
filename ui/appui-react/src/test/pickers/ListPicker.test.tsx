/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */
import { expect } from "chai";
import { ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { ToolbarItemContext } from "@itwin/components-react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";

import {
  ExpandableSection, FrameworkVersion, ListItem, ListItemType, ListPicker, ListPickerItem, ListPickerPropsExtended, UiFramework,
} from "../../appui-react";
import TestUtils, { mount } from "../TestUtils";
import { Provider } from "react-redux";

const title = "Test";
const listItems = new Array<ListItem>();
const setEnabled = sinon.spy();

describe("ListPicker", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();

    const listItem: ListItem = {
      enabled: true,
      type: ListItemType.Item,
      name: "123456789012345678901234567890",
    };
    listItems.push(listItem);

    const separatorItem: ListItem = {
      enabled: false,
      type: ListItemType.Separator,
    };
    listItems.push(separatorItem);

    const containerItem: ListItem = {
      enabled: true,
      type: ListItemType.Container,
      children: [],
    };
    containerItem.children!.push(listItem);
    listItems.push(containerItem);

    const emptyContainerItem: ListItem = {
      enabled: true,
      type: ListItemType.Container,
      children: [],
    };
    listItems.push(emptyContainerItem);
  });

  after(async () => {
    TestUtils.terminateUiFramework();
    await IModelApp.shutdown();
  });

  describe("v2 rendering", () => {
    before(async () => {
      UiFramework.setUiVersion("2");
      await TestUtils.flushAsyncOperations();
    });

    it("should render correctly", () => {
      shallow(
        <Provider store={TestUtils.store}>
          <FrameworkVersion>
            <ToolbarItemContext.Provider
              value={{
                hasOverflow: false,
                useHeight: false,
                onResize: () => { },
              }}
            >
              <ListPicker
                title={title}
                items={listItems}
                setEnabled={setEnabled}
              />
            </ToolbarItemContext.Provider>
          </FrameworkVersion>
        </Provider>
      ).should.matchSnapshot();
    });

    it("v2 should mount & unmount correctly", () => {
      const enableAllFunc = () => { };
      const disableAllFunc = () => { };
      const invertFunc = () => { };

      const component = mount(
        <Provider store={TestUtils.store}>
          <FrameworkVersion>
            <ToolbarItemContext.Provider
              value={{
                hasOverflow: false,
                useHeight: false,
                onResize: () => { },
              }}
            >
              <ListPicker
                title={title}
                items={listItems}
                setEnabled={setEnabled}
                enableAllFunc={enableAllFunc}
                disableAllFunc={disableAllFunc}
                invertFunc={invertFunc}
              />
            </ToolbarItemContext.Provider>
          </FrameworkVersion>
        </Provider>
      );
      component.unmount();
    });
  });

  describe("isSpecialItem", () => {
    let listPickerWrapper: ShallowWrapper<any>;
    let listPickerInstance: ListPicker;

    beforeEach(() => {
      listPickerWrapper = shallow(
        <ListPicker
          title={title}
          items={listItems}
          setEnabled={setEnabled}
        />,
      );
      listPickerInstance = listPickerWrapper.instance() as ListPicker;
    });

    it("should return true if item key is special", () => {
      expect(
        listPickerInstance.isSpecialItem({
          key: ListPicker.Key_All,
          enabled: true,
        } as ListItem),
      ).to.be.true;

      expect(
        listPickerInstance.isSpecialItem({
          key: ListPicker.Key_Invert,
          enabled: true,
        } as ListItem),
      ).to.be.true;

      expect(
        listPickerInstance.isSpecialItem({
          key: ListPicker.Key_None,
          enabled: true,
        } as ListItem),
      ).to.be.true;

      expect(
        listPickerInstance.isSpecialItem({
          key: ListPicker.Key_Separator,
          enabled: true,
        } as ListItem),
      ).to.be.true;
    });

    it("should return true if item type is special", () => {
      expect(
        listPickerInstance.isSpecialItem({
          key: "",
          type: ListItemType.Container,
          enabled: true,
        } as ListItem),
      ).to.be.true;
    });

    it("should return false if item type is not special", () => {
      expect(
        listPickerInstance.isSpecialItem({
          key: "",
          type: ListItemType.Item,
          enabled: true,
        } as ListItem),
      ).to.be.false;
    });
  });

  describe("ListPickerItem", () => {
    it("should render correctly", () => {
      shallow(
        <ListPickerItem
          key="key"
        />,
      ).should.matchSnapshot();
    });

    it("should unmount correctly", () => {
      const unknownItem: ListItem = {
        key: "unknown-item",
        name: "unknown",
        enabled: false,
        type: ListItemType.Item,
      };

      const singleItemList = new Array<ListItem>();
      singleItemList.push(unknownItem);

      const component = mount(
        <ListPickerItem
          key="key"
          isActive={true}
          isFocused={true}
        />,
      );
      component.unmount();
    });

  });

  describe("ExpandableSection", () => {
    it("should render correctly", () => {
      shallow(<ExpandableSection />);
    });

    it("should unmount correctly", () => {
      const component = mount(
        <ExpandableSection />,
      );
      component.unmount();
    });

    it("should handle onClick", () => {
      const component = mount(
        <ExpandableSection />,
      );
      component.find("div.ListPickerInnerContainer-header").simulate("click");
      component.update();
      component.find("div.ListPickerInnerContainer-header-expanded");
      expect(component.length).to.eq(1);
    });
  });
});
