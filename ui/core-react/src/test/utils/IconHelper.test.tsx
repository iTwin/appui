/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ConditionalStringValue } from "@itwin/appui-abstract";
import { IconHelper } from "../../core-react/utils/IconHelper";
import { ConditionalIconItem } from "../../core-react";

describe("IconHelper", () => {
  it("should get string icon data", () => {
    const iconSpec = IconHelper.getIconData("cat");
    expect(iconSpec).to.be.equal("cat");

    const iconNode = IconHelper.getIconReactNode(iconSpec);
    expect(iconNode).not.to.be.undefined;
    expect((iconNode as React.ReactElement).props.iconSpec).toEqual("cat");
  });

  it("should get null icon data", () => {
    const iconNode = IconHelper.getIconReactNode("");
    expect(iconNode).to.be.null;
  });

  it("should get null icon data in empty conditional string", () => {
    const iconNode = IconHelper.getIconReactNode(
      new ConditionalStringValue(() => "", ["dummy"])
    );
    expect(iconNode).to.be.null;
  });

  it("should get null icon data if null passed in", () => {
    const iconNode = IconHelper.getIconReactNode(null);
    expect(iconNode).to.be.null;
  });

  it("should get null icon data if internal data not set", () => {
    const iconNode = IconHelper.getIconReactNode(IconHelper.reactIconKey);
    expect(iconNode).to.be.null;
  });

  it("should get react node back", () => {
    const iconNode = IconHelper.getIconReactNode(
      <i className="icon icon-placeholder" />
    );
    expect(iconNode).not.to.be.undefined;
    expect(React.isValidElement(iconNode)).toEqual(true);
  });

  it("should get conditionalString icon data", () => {
    const iconSpec = IconHelper.getIconData(
      new ConditionalStringValue(() => "dog", ["dummy"])
    );
    expect((iconSpec as ConditionalStringValue).value).to.be.equal("dog");

    const iconNode = IconHelper.getIconReactNode(iconSpec);
    expect(iconNode).not.to.be.undefined;
    expect((iconNode as React.ReactElement).props.iconSpec).toEqual("dog");
  });

  it("should get react icon data", () => {
    const internalData = new Map<string, any>(); // used to store ReactNode if iconSpec hold a ReactNode
    const iconSpec = IconHelper.getIconData(<span>Test</span>, internalData);
    expect(iconSpec).to.be.equal(IconHelper.reactIconKey);

    const iconNode = IconHelper.getIconReactNode(iconSpec, internalData);
    expect(iconNode).not.to.be.undefined;
    expect(
      (iconNode as React.ReactElement).props.iconSpec.props.children
    ).toEqual("Test");
  });

  it("should get reactNode for ConditionalIconItem", () => {
    const internalData = new Map<string, any>(); // used to store ReactNode if iconSpec hold a ReactNode
    const iconSpec = IconHelper.getIconData(
      new ConditionalIconItem(() => {
        return <span>Test</span>;
      }, ["dummy"]),
      internalData
    );

    const iconNode = IconHelper.getIconReactNode(iconSpec, internalData);
    expect(iconNode).not.to.be.null;
    expect(iconNode).not.to.be.undefined;
    expect(
      (iconNode as React.ReactElement).props.iconSpec.props.children
    ).toEqual("Test");

    const iconNodeDirect = IconHelper.getIconReactNode(
      new ConditionalIconItem(() => {
        return <span>Plum</span>;
      }, ["dummy"])
    );
    expect(iconNodeDirect).not.to.be.null;
    expect(iconNodeDirect).not.to.be.undefined;
    expect(
      (iconNodeDirect as React.ReactElement).props.iconSpec.props.children
    ).toEqual("Plum");
  });

  it("should get empty string back", () => {
    const iconSpec = IconHelper.getIconData(null);
    expect(iconSpec).to.be.equal("");
  });
});
