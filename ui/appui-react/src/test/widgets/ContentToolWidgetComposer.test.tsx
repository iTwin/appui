/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { EmptyLocalization } from "@itwin/core-common";
import { MockRender } from "@itwin/core-frontend";
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import { BackstageAppButton } from "../../appui-react";
import { ContentToolWidgetComposer } from "../../appui-react/widgets/ContentToolWidgetComposer";
import TestUtils, { childStructure } from "../TestUtils";

describe("ContentToolWidgetComposer", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
    await MockRender.App.startup({ localization: new EmptyLocalization() });
  });

  after(async () => {
    await MockRender.App.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("ContentToolWidgetComposer should render", () => {
    const { container } = render(<ContentToolWidgetComposer />);

    expect(container).to.satisfy(childStructure([
      ".nz-app-button:empty",
      ".nz-vertical-toolbar-container:empty",
      ".nz-horizontal-toolbar-container:empty",
    ]));
  });

  it("ContentToolWidgetComposer with backstage button should render", () => {
    const cornerButton = <BackstageAppButton icon={"icon-bentley-systems"} />;
    const { container } = render(<ContentToolWidgetComposer cornerButton={cornerButton} />);

    expect(container).to.satisfy(childStructure(
      ".nz-app-button .icon-bentley-systems",
    ));
  });
});

