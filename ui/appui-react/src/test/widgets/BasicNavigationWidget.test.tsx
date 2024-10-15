/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as moq from "typemoq";
import { Matrix3d } from "@itwin/core-geometry";
import {
  IModelApp,
  type OrthographicViewState,
  type ScreenViewport,
} from "@itwin/core-frontend";
import type { ViewportContentControl } from "../../appui-react.js";
import {
  BasicNavigationWidget,
  CommandItemDef,
  ToolbarHelper,
  UiFramework,
} from "../../appui-react.js";
import { childStructure } from "../TestUtils.js";
import { render } from "@testing-library/react";

describe("BasicNavigationWidget", () => {
  beforeEach(() => {
    const getLocalizedString = IModelApp.localization.getLocalizedString;
    vi.spyOn(IModelApp.localization, "getLocalizedString").mockImplementation(
      (key) => {
        // Workaround tool flyover localization.
        const suffix = ".flyover";
        if (typeof key === "string" && key.endsWith(".flyover"))
          return key.slice(0, -suffix.length);
        return getLocalizedString(key);
      }
    );
  });

  it("BasicNavigationWidget should render correctly", () => {
    const { getByRole } = render(<BasicNavigationWidget />);
    getByRole("button", { name: "tools.View.Rotate" });
    getByRole("button", { name: "tools.View.Pan" });
    getByRole("button", { name: "tools.View.Fit" });
    getByRole("button", { name: "tools.View.WindowArea" });
    getByRole("button", { name: "tools.View.Undo" });
    getByRole("button", { name: "tools.View.Redo" });
    getByRole("button", { name: "tools.View.Walk" });
  });

  const testH1Def = new CommandItemDef({
    commandId: "test-h1-tool",
    execute: (): void => {},
    iconSpec: "icon-developer",
    label: "test-h1-tool",
  });

  const testV1Def = new CommandItemDef({
    commandId: "test-v1-tool",
    execute: (): void => {},
    iconSpec: "icon-developer",
    label: "test-v1-tool",
  });

  const testV2Def = new CommandItemDef({
    commandId: "test-v2-tool",
    execute: (): void => {},
    iconSpec: "icon-developer",
    label: "test-v2-tool",
  });

  const testH2Def = new CommandItemDef({
    commandId: "test-h2-tool",
    execute: (): void => {},
    iconSpec: "icon-developer",
    label: "test-h2-tool",
  });

  it("BasicNavigationWidget with suffix and prefix items should render correctly", () => {
    const { rerender, getByRole, queryByText } = render(
      <BasicNavigationWidget
        additionalVerticalItems={ToolbarHelper.createToolbarItemsFromItemDefs([
          testV1Def,
          testV2Def,
        ])}
        additionalHorizontalItems={ToolbarHelper.createToolbarItemsFromItemDefs(
          [testH1Def, testH2Def]
        )}
      />
    );

    getByRole("button", { name: "test-v1-tool" });
    getByRole("button", { name: "test-v2-tool" });
    getByRole("button", { name: "test-h1-tool" });
    getByRole("button", { name: "test-h2-tool" });

    rerender(
      <BasicNavigationWidget
        additionalVerticalItems={undefined}
        additionalHorizontalItems={undefined}
      />
    );

    expect(queryByText("test-v1-tool")).toEqual(null);
    expect(queryByText("test-v2-tool")).toEqual(null);
    expect(queryByText("test-h1-tool")).toEqual(null);
    expect(queryByText("test-h2-tool")).toEqual(null);
  });

  it("BasicNavigationWidget should init navigation aid from active content control", () => {
    const viewportMock = moq.Mock.ofType<ScreenViewport>();
    const contentControlMock = moq.Mock.ofType<ViewportContentControl>();
    contentControlMock
      .setup((control) => control.viewport)
      .returns(() => viewportMock.object);
    contentControlMock
      .setup((control) => control.navigationAidControl)
      .returns(() => "StandardRotationNavigationAid");

    const spatialViewStateMock = moq.Mock.ofType<OrthographicViewState>();
    spatialViewStateMock.setup((view) => view.is3d()).returns(() => true);
    spatialViewStateMock
      .setup((view) => view.classFullName)
      .returns(() => "Bis:OrthographicViewDefinition");
    const rotation = Matrix3d.createIdentity();
    spatialViewStateMock
      .setup((view) => view.getRotation())
      .returns(() => rotation);

    viewportMock.reset();
    viewportMock
      .setup((viewport) => viewport.view)
      .returns(() => spatialViewStateMock.object);

    vi.spyOn(UiFramework.content, "getActiveContentControl").mockReturnValue(
      contentControlMock.object
    );

    const { container } = render(<BasicNavigationWidget />);

    expect(container).to.satisfy(
      childStructure(
        `.nz-navigation-aid-container .uifw-standard-rotation-navigation`
      )
    );
  });
});
