/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ConditionalStringValue } from "@itwin/appui-abstract";
import { PropsHelper } from "../../appui-react";
import { SvgCut } from "@itwin/itwinui-icons-react";

describe("PropsHelper", () => {
  it("Shallow Equals", () => {
    const obj1 = {
      firstName: "John",
      lastName: "Doe",
      address: "101 Main Street",
      zip: 10101,
    };
    const obj2 = {
      firstName: "John",
      lastName: "Doe",
      address: "101 Main Street",
      zip: 10101,
    };
    expect(PropsHelper.isShallowEqual(obj1, obj2)).toEqual(true);

    const obj3 = {
      firstName: "John",
      lastName: "Doe",
      address: "102 Main Street",
      zip: 10101,
    };
    expect(PropsHelper.isShallowEqual(obj1, obj3)).toEqual(false);
  });

  it("Get Icon JSX", () => {
    const iconTest = PropsHelper.getIcon("placeholder");
    expect(iconTest).toBeTruthy();
    expect(iconTest!.props.iconSpec).toEqual("placeholder");
  });

  it("Get undefined Icon", () => {
    const iconTest = PropsHelper.getIcon(null);
    expect(iconTest).toEqual(undefined);
  });

  let outString: string | undefined;
  const stringGetter = () => "Got String?";

  it("String spec", () => {
    const defaultStringSpec = PropsHelper.getStringSpec("Hello World!");
    expect(defaultStringSpec).toBeTruthy();
    expect(defaultStringSpec).toEqual("Hello World!");
  });

  it("StringGetter spec", () => {
    const stringGetterSpec = PropsHelper.getStringSpec(stringGetter);
    expect(stringGetterSpec).toBeTruthy();
    outString = undefined;
    outString = PropsHelper.getStringFromSpec(stringGetterSpec);
    expect(outString).toBeTruthy();
    expect(outString).toEqual("Got String?");
  });

  it("Explicit String spec - key ignored since explicit string specified", () => {
    const stringAndKeySpec = PropsHelper.getStringSpec(
      stringGetter,
      "UiFramework:snapModeField.snapMode"
    );
    expect(stringAndKeySpec).toBeTruthy();
    outString = undefined;
    outString = PropsHelper.getStringFromSpec(stringAndKeySpec);
    expect(outString).toBeTruthy();
    expect(outString).toEqual("Got String?");
  });

  it("Use stringKey for undefined explicitValue", () => {
    const undefinedStringAndKeySpec = PropsHelper.getStringSpec(
      undefined,
      "UiFramework:snapModeField.snapMode"
    );
    expect(undefinedStringAndKeySpec).toBeTruthy();
    outString = undefined;
    outString = PropsHelper.getStringFromSpec(undefinedStringAndKeySpec);
    expect(outString).toBeTruthy();
    expect(outString).toEqual("snapModeField.snapMode"); // since test are not setting up localization we get string without namespace.
  });

  it("Use stringKey for blank explicitValue", () => {
    const undefinedStringAndKeySpec = PropsHelper.getStringSpec(
      "",
      "UiFramework:snapModeField.snapMode"
    );
    expect(undefinedStringAndKeySpec).toBeTruthy();
    outString = undefined;
    outString = PropsHelper.getStringFromSpec(undefinedStringAndKeySpec);
    expect(outString).toBeTruthy();
    expect(outString).toEqual("snapModeField.snapMode"); // since test are not setting up localization we get string without namespace.
  });

  it("Use ConditionalStringValue for label", () => {
    const conditionalStringSpec = PropsHelper.getStringSpec(
      new ConditionalStringValue(() => "HelloWorld", ["dummy"])
    );
    expect(conditionalStringSpec).toBeTruthy();
    outString = undefined;
    outString = PropsHelper.getStringFromSpec(conditionalStringSpec);
    expect(outString).toBeTruthy();
    expect(outString).toEqual("HelloWorld");
  });

  it("Get Icon from ConditionalStringValue", () => {
    const iconTest = PropsHelper.getIcon(
      new ConditionalStringValue(() => "conditional-icon", ["dummy"])
    );
    expect(iconTest).toBeTruthy();
    expect(iconTest!.props.iconSpec).toEqual("conditional-icon");
  });

  it("get abstract props for react icon", () => {
    const props = PropsHelper.getAbstractPropsForReactIcon(<SvgCut />); // eslint-disable-line deprecation/deprecation
    expect(props.icon).toEqual("#-react-iconspec-node-#");
  });
});
