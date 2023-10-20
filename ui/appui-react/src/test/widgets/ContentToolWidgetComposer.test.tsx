/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { render } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as React from "react";
import { BackstageAppButton } from "../../appui-react";
import { ContentToolWidgetComposer } from "../../appui-react/widgets/ContentToolWidgetComposer";
import TestUtils, { childStructure } from "../TestUtils";

describe("ContentToolWidgetComposer", () => {
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  afterAll(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("ContentToolWidgetComposer should render", () => {
    const { container } = render(<ContentToolWidgetComposer />);

    expect(container).to.satisfy(
      childStructure([
        ".nz-app-button:empty",
        ".nz-vertical-toolbar-container:empty",
        ".nz-horizontal-toolbar-container:empty",
      ])
    );
  });

  it("ContentToolWidgetComposer with backstage button should render", () => {
    const cornerButton = <BackstageAppButton icon={"icon-bentley-systems"} />;
    const { container } = render(
      <ContentToolWidgetComposer cornerButton={cornerButton} />
    );

    expect(container).to.satisfy(
      childStructure(".nz-app-button .icon-bentley-systems")
    );
  });
});
