/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import * as React from "react";
import * as sinon from "sinon";
import { render } from "@testing-library/react";
import { WidgetDef, WidgetState } from "../../appui-react";
import { PopoutWidget } from "../../appui-react/childwindow/PopoutWidget";
import TestUtils from "../TestUtils";

describe("PopoutWidget", () => {
  const sandbox = sinon.createSandbox();
  const widgetDef = WidgetDef.create({
    id: "w1",
    defaultState: WidgetState.Open,
  });

  afterEach(async () => {
    sandbox.restore();
  });

  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
  });

  afterAll(() => {
    TestUtils.terminateUiFramework();
  });

  it("will render", () => {
    sandbox.stub(widgetDef, "reactNode").get(() => <div>Hello</div>);
    const renderedComponent = render(
      <PopoutWidget widgetContainerId="testContainer" widgetDef={widgetDef} />
    );
    expect(renderedComponent.queryByText("Hello")).not.to.be.null;
    renderedComponent.unmount();
  });
});
