/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { ToolbarItemContext } from "@itwin/components-react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";

import type { ListItem} from "../../appui-react";
import {
  ExpandableSection, ListItemType, ListPicker, ListPickerItem,
} from "../../appui-react";
import TestUtils, { childStructure, selectorMatches, userEvent } from "../TestUtils";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
const title = "Test";
const listItems = new Array<ListItem>();
const setEnabled = sinon.spy();

describe("ListPicker", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(()=>{
    theUserTo = userEvent.setup();
  });
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
      children: [{
        enabled: false,
        type: ListItemType.Item,
        name: "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
      }],
    };
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

  before(async () => {
    await TestUtils.flushAsyncOperations();
  });

  it("should render correctly", () => {
    render(
      <Provider store={TestUtils.store}>
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
            searchBox={true}
            setEnabled={setEnabled}
          />
        </ToolbarItemContext.Provider>
      </Provider>
    );
    expect(screen.getByRole("button", {name: "Test"})).to.satisfy(childStructure(".components-icon .icon.core-svg-icon"));
  });

  it("should support items and functions", async () => {
    const enableAllFunc = sinon.spy();
    const disableAllFunc = sinon.spy();
    const invertFunc = sinon.spy();

    render(
      <Provider store={TestUtils.store}>
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
      </Provider>
    );
    await theUserTo.click(screen.getByRole("button"));

    await theUserTo.click(screen.getByText("pickerButtons.all"));
    expect(enableAllFunc).to.be.called;

    await theUserTo.click(screen.getByText("pickerButtons.none"));
    expect(disableAllFunc).to.be.called;

    await theUserTo.click(screen.getByText("pickerButtons.invert"));
    expect(invertFunc).to.be.called;

    await theUserTo.click(screen.getByText("123456789012345678901234567890"));
    expect(setEnabled).to.be.called;
  });

  describe("isSpecialItem", () => {
    let listPickerInstance: ListPicker;

    beforeEach(() => {
      listPickerInstance = new ListPicker({items: listItems, setEnabled, title});
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
      render(
        <ListPickerItem
          key="key"
        />,
      );
      expect(screen.getByRole("button")).to.satisfy(selectorMatches(".ListPicker-item"));
    });

    it("renders class props correctly", () => {
      render(
        <ListPickerItem
          key="key"
          isActive={true}
          isFocused={true}
        />,
      );
      expect(screen.getByRole("button")).to.satisfy(selectorMatches(".is-active.is-focused"));
    });
  });

  describe("ExpandableSection", () => {
    it("should render correctly", () => {
      render(<ExpandableSection />);
      expect(screen.getByRole("region")).to.satisfy(childStructure(
        ".nz-toolbar-item-expandable-group-group > .ListPickerInnerContainer-header"
      ));
    });

    it("should handle onClick", async () => {
      render(
        <ExpandableSection />,
      );
      await theUserTo.click(screen.getByRole("button"));
      expect(screen.getByRole("button")).to.satisfy(selectorMatches(".ListPickerInnerContainer-header-expanded"));
    });
  });
});
