/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { ConditionalIconItem } from "../../core-react/icons/ConditionalIconItem";
import type { IconSpec } from "../../core-react/icons/IconComponent";

const iconSpec1: IconSpec = "icon1.svg";
const iconSpec2: IconSpec = "icon2.svg";
const defaultIconSpec: IconSpec = "defaultIcon.svg";
const icon1Getter = (): IconSpec => iconSpec1;
const icon2Getter = (): IconSpec => iconSpec2;
const syncEventIds = ["sync-id-one", "sync-id-two", "sync-id-THREE"];

describe("ConditionalIconItem", () => {
  it("should construct without initial string value", () => {
    const sut = new ConditionalIconItem(icon1Getter, syncEventIds);
    expect(sut.value).to.be.equal(iconSpec1);
  });

  it("should construct with initial value", () => {
    const sut = new ConditionalIconItem(
      icon1Getter,
      syncEventIds,
      defaultIconSpec
    );
    expect(sut.value).to.be.equal(defaultIconSpec);
    expect(sut.refresh()).to.be.true;
    expect(sut.value).to.be.equal(iconSpec1);
  });

  it("should construct with initial value that matches stringGetter function", () => {
    const sut = new ConditionalIconItem(icon1Getter, syncEventIds, iconSpec1);
    expect(sut.value).to.be.equal(iconSpec1);
    expect(sut.refresh()).to.be.false;
    expect(sut.value).to.be.equal(iconSpec1);
  });

  it("test static getValue method", () => {
    expect(ConditionalIconItem.getValue(undefined)).to.be.undefined;
    expect(ConditionalIconItem.getValue("icon1.svg")).to.be.equal("icon1.svg");
    expect(
      ConditionalIconItem.getValue(
        new ConditionalIconItem(icon1Getter, syncEventIds, defaultIconSpec)
      )
    ).to.be.equal(defaultIconSpec);
    expect(
      ConditionalIconItem.getValue(
        new ConditionalIconItem(icon2Getter, syncEventIds, defaultIconSpec)
      )
    ).to.be.equal(defaultIconSpec);
    expect(
      ConditionalIconItem.getValue(
        new ConditionalIconItem(icon1Getter, syncEventIds)
      )
    ).to.be.equal(iconSpec1);
    expect(
      ConditionalIconItem.getValue(
        new ConditionalIconItem(icon2Getter, syncEventIds)
      )
    ).to.be.equal(iconSpec2);
  });

  it("test static refreshValue method", () => {
    const sut = new ConditionalIconItem(
      icon1Getter,
      syncEventIds,
      defaultIconSpec
    );
    expect(sut.value).to.be.equal(defaultIconSpec);
    expect(ConditionalIconItem.refreshValue(sut, new Set<string>(["cat"]))).to
      .be.false;
    expect(sut.value).to.be.equal(defaultIconSpec);
    expect(
      ConditionalIconItem.refreshValue(sut, new Set<string>(["sync-id-two"]))
    ).to.be.true;
    expect(sut.value).to.be.equal(iconSpec1);
    expect(
      ConditionalIconItem.refreshValue(undefined, new Set<string>(["cat"]))
    ).to.be.false;
  });

  it("test static refreshValue method with capitalized ids", () => {
    const sut = new ConditionalIconItem(
      icon1Getter,
      syncEventIds,
      defaultIconSpec
    );
    expect(sut.value).to.be.equal(defaultIconSpec);
    expect(ConditionalIconItem.refreshValue(sut, new Set<string>(["cat"]))).to
      .be.false;
    expect(sut.value).to.be.equal(defaultIconSpec);
    expect(
      ConditionalIconItem.refreshValue(sut, new Set<string>(["sync-id-three"]))
    ).to.be.true;
    expect(sut.value).to.be.equal(iconSpec1);
    expect(
      ConditionalIconItem.refreshValue(undefined, new Set<string>(["cat"]))
    ).to.be.false;
  });

  it("isConditionalIconItem should evaluate to true for instances", () => {
    const sut = new ConditionalIconItem(
      icon1Getter,
      syncEventIds,
      defaultIconSpec
    );

    expect(ConditionalIconItem.isConditionalIconItem(sut)).to.be.true;
    expect(ConditionalIconItem.isConditionalIconItem("icon.svg")).to.be.false;
  });
});
