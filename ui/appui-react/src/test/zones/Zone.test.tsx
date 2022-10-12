/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */
import * as React from "react";
import { UiFramework, Zone } from "../../appui-react";
import TestUtils, { mount } from "../TestUtils";

describe("Zone", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
    UiFramework.setUiVersion("1");
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("should render", () => {
    mount(<Zone />);
  });
});
