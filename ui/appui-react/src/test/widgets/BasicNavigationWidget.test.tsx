/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as moq from "typemoq";
import { Matrix3d } from "@itwin/core-geometry";
import type {
  OrthographicViewState,
  ScreenViewport,
} from "@itwin/core-frontend";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { ViewportContentControl } from "../../appui-react";
import {
  BasicNavigationWidget,
  CommandItemDef,
  ToolbarHelper,
  UiFramework,
} from "../../appui-react";
import TestUtils, { childStructure } from "../TestUtils";
import { render } from "@testing-library/react";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

describe("BasicNavigationWidget", () => {
  beforeEach(() => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
      function rect(this: any) {
        if (
          this instanceof HTMLButtonElement ||
          this.firstElementChild?.tagName === "BUTTON"
        ) {
          return DOMRect.fromRect({ width: 16, height: 16 });
        }
        return DOMRect.fromRect({ width: 300, height: 300 });
      }
    );
  });
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  afterAll(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("BasicNavigationWidget should render correctly", () => {
    const { container } = render(<BasicNavigationWidget />);
    expect(container).to.satisfy(
      childStructure([
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(1) [data-item-id='View.Rotate']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(2) [data-item-id='View.Pan']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(3) [data-item-id='View.Fit']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(4) [data-item-id='View.WindowArea']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(5) [data-item-id='View.Undo']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(6):last-child [data-item-id='View.Redo']`,
        `.components-items.components-vertical .components-toolbar-item-container:only-child [data-item-id='View.Walk']`,
      ])
    );
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
    const { container } = render(
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
    expect(container).to.satisfy(
      childStructure([
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(1) [data-item-id='View.Rotate']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(2) [data-item-id='test-h1-tool']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(3) [data-item-id='View.Pan']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(4) [data-item-id='test-h2-tool']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(5) [data-item-id='View.Fit']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(6) [data-item-id='View.WindowArea']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(7) [data-item-id='View.Undo']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(8):last-child [data-item-id='View.Redo']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(1) [data-item-id='View.Walk']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(2) [data-item-id='test-v1-tool']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(3):last-child [data-item-id='test-v2-tool']`,
      ])
    );
  });

  it("BasicNavigationWidget should refresh when props change", () => {
    const { rerender, container } = render(
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
    expect(container).to.satisfy(
      childStructure([
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(1) [data-item-id='View.Rotate']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(2) [data-item-id='test-h1-tool']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(3) [data-item-id='View.Pan']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(4) [data-item-id='test-h2-tool']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(5) [data-item-id='View.Fit']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(6) [data-item-id='View.WindowArea']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(7) [data-item-id='View.Undo']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(8):last-child [data-item-id='View.Redo']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(1) [data-item-id='View.Walk']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(2) [data-item-id='test-v1-tool']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(3):last-child [data-item-id='test-v2-tool']`,
      ])
    );

    rerender(
      <BasicNavigationWidget
        additionalVerticalItems={undefined}
        additionalHorizontalItems={undefined}
      />
    );

    expect(container).to.satisfy(
      childStructure([
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(1) [data-item-id='View.Rotate']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(2) [data-item-id='View.Pan']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(3) [data-item-id='View.Fit']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(4) [data-item-id='View.WindowArea']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(5) [data-item-id='View.Undo']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(6):last-child [data-item-id='View.Redo']`,
        `.components-items.components-vertical .components-toolbar-item-container:only-child [data-item-id='View.Walk']`,
      ])
    );
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
