/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as React from "react";
import type { IModelAppOptions } from "@itwin/core-frontend";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { FrameworkAccuDraw } from "../../appui-react/accudraw/FrameworkAccuDraw";
import { AccuDrawWidget } from "../../appui-react/accudraw/AccuDrawWidget";
import { TestUtils } from "../TestUtils";
import { render, screen } from "@testing-library/react";

describe("AccuDrawWidget", () => {
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();

    const opts: IModelAppOptions = {};
    opts.accuDraw = new FrameworkAccuDraw();
    await NoRenderApp.startup(opts);
  });

  afterAll(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("should render AccuDrawWidget correctly", () => {
    render(<AccuDrawWidget />);
    expect(screen.getByLabelText<HTMLInputElement>("X").value).to.equal(
      "0'-0\""
    );
    expect(screen.getByLabelText<HTMLInputElement>("Y").value).to.equal(
      "0'-0\""
    );
  });
});
