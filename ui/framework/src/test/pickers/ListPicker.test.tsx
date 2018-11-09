/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { expect } from "chai";
import * as enzyme from "enzyme";
import * as sinon from "sinon";
import TestUtils from "../TestUtils";
import {
  ListPicker,
  ListItem,
  ListPickerItem,
  ExpandableSection,
  ListPickerBase,
  ListItemType,
} from "../../index";

const title = "Test";
const listItems = new Array<ListItem>();
const setEnabled = sinon.spy();

describe("ListPicker", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  it("should render correctly", () => {
    enzyme.shallow(
      <ListPicker
        title={title}
        items={listItems}
        setEnabled={setEnabled}
      />,
    ).should.matchSnapshot();
  });

  let listPickerWrapper: enzyme.ShallowWrapper<any>;
  let listPickerInstance: ListPicker;

  beforeEach(() => {
    listPickerWrapper = enzyme.shallow(
      <ListPicker
        title={title}
        items={listItems}
        setEnabled={setEnabled}
      />,
    );
    listPickerInstance = listPickerWrapper.instance() as ListPicker;
  });

  describe("isSpecialItem", () => {
    it("should return true if item key is special", () => {
      expect(
        listPickerInstance.isSpecialItem({
          key: ListPicker.Key_All,
        } as ListItem),
      ).to.be.true;

      expect(
        listPickerInstance.isSpecialItem({
          key: ListPicker.Key_Invert,
        } as ListItem),
      ).to.be.true;

      expect(
        listPickerInstance.isSpecialItem({
          key: ListPicker.Key_None,
        } as ListItem),
      ).to.be.true;

      expect(
        listPickerInstance.isSpecialItem({
          key: ListPicker.Key_Separator,
        } as ListItem),
      ).to.be.true;
    });

    it("should return true if item type is special", () => {
      expect(
        listPickerInstance.isSpecialItem({
          key: "",
          type: ListItemType.Container,
        } as ListItem),
      ).to.be.true;
    });

    it("should return false if item type is not special", () => {
      expect(
        listPickerInstance.isSpecialItem({
          key: "",
          type: ListItemType.Item,
        } as ListItem),
      ).to.be.false;
    });
  });

  it("should unmount correctly", () => {
    const component = enzyme.mount(
      <ListPicker
        title={title}
        items={listItems}
        setEnabled={setEnabled}
      />,
    );
    component.unmount();
  });
});

describe("ListPickerItem", () => {
  it("should render correctly", () => {
    enzyme.shallow(
      <ListPickerItem
        key="key"
      />,
    ).should.matchSnapshot();
  });

  it("should unmount correctly", () => {
    const component = enzyme.mount(
      <ListPicker
        title={title}
        items={listItems}
        setEnabled={setEnabled}
      />,
    );
    component.unmount();
  });
});

describe("ExpandableSection", () => {
  it("should render correctly", () => {
    enzyme.shallow(<ExpandableSection />);
  });

  it("should unmount correctly", () => {
    const component = enzyme.mount(
      <ExpandableSection />,
    );
    component.unmount();
  });
});

describe("ListPickerBase", () => {
  let listPickerBaseWrapper: enzyme.ShallowWrapper<any>;
  let listPickerBaseInstance: ListPickerBase;

  beforeEach(() => {
    listPickerBaseWrapper = enzyme.shallow(
      <ListPickerBase
        title={title}
        items={listItems}
        setEnabled={setEnabled}
      />);
    listPickerBaseInstance = listPickerBaseWrapper.instance() as ListPickerBase;
  });

  it("should render correctly", () => {
    enzyme.shallow(
      <ListPickerBase
        title={title}
        items={listItems}
        setEnabled={setEnabled}
      />,
    ).should.matchSnapshot();
  });

  it("should minimize", () => {
    listPickerBaseInstance.minimize();
    expect(listPickerBaseWrapper.state("expanded")).to.be.false;
  });

  it("should return true if expanded", () => {
    listPickerBaseWrapper.setState({ expanded: true });
    listPickerBaseInstance.forceUpdate();
    expect(listPickerBaseInstance.isExpanded()).to.be.true;
  });

  it("should return false if not expanded", () => {
    listPickerBaseWrapper.setState({ expanded: false });
    listPickerBaseInstance.forceUpdate();
    expect(listPickerBaseInstance.isExpanded()).to.be.false;
  });

  it("should return expanded content", () => {
    listPickerBaseInstance.getExpandedContent();
  });

  it("should unmount correctly", () => {
    const component = enzyme.mount(
      <ListPickerBase
        title={title}
        items={listItems}
        setEnabled={setEnabled}
      />,
    );
    component.unmount();
  });
});
