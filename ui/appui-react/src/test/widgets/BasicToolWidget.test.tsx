/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { render } from "@testing-library/react";
import * as React from "react";
import { ToolbarHelper, UiFramework } from "../../appui-react";
import { CommandItemDef } from "../../appui-react/shared/CommandItemDef";
import { BasicToolWidget } from "../../appui-react/widgets/BasicToolWidget";
import TestUtils, { childStructure } from "../TestUtils";

describe("BasicToolWidget", () => {
  beforeEach(() => {
    sinon
      .stub(Element.prototype, "getBoundingClientRect")
      .callsFake(function rect(this: any) {
        if (
          this instanceof HTMLButtonElement ||
          this.firstElementChild?.tagName === "BUTTON"
        ) {
          return DOMRect.fromRect({ width: 16, height: 16 });
        }
        return DOMRect.fromRect({ width: 300, height: 300 });
      });
  });

  beforeEach(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  afterEach(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("BasicToolWidget should render correctly", () => {
    vi.spyOn(UiFramework.content, "getActiveContentControl").mockReturnValue({
      viewport: {
        findFeatureOverrideProviderOfType() {},
        view: {
          is2d() {
            return false;
          },
          iModel: {
            selectionSet: {
              elements: new Set<string>([""]),
              size: 1,
            },
          },
        },
      },
    } as any);
    const { container } = render(<BasicToolWidget />);

    expect(container).to.satisfy(
      childStructure([
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(1) [data-item-id='Select']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(2) [data-item-id='measureTools-group']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(3):last-child [data-item-id='sectionTools-group']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(1) [data-item-id='UiFramework.ClearSelection']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(2) [data-item-id='UiFramework.HideSelected']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(3) [data-item-id='UiFramework.IsolateSelected']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(4):last-child [data-item-id='UiFramework.EmphasizeSelected']`,
        `.nz-app-button .nz-bars .nz-bar + .nz-bar + .nz-bar`,
      ])
    );
  });

  it("BasicToolWidget with bentley B should render", () => {
    const { container } = render(
      <BasicToolWidget icon={"icon-bentley-systems"} />
    );
    expect(container).to.satisfy(
      childStructure([`.nz-app-button .icon-bentley-systems`])
    );
  });

  it("BasicToolWidget with Categories and Models should render", () => {
    vi.spyOn(UiFramework.content, "getActiveContentControl").mockReturnValue({
      viewport: {
        findFeatureOverrideProviderOfType() {},
        view: {
          is2d() {
            return false;
          },
          iModel: {
            selectionSet: {
              elements: new Set<string>([""]),
              size: 1,
            },
          },
        },
      },
    } as any);
    const { container } = render(
      <BasicToolWidget showCategoryAndModelsContextTools={true} />
    );

    expect(container).to.satisfy(
      childStructure([
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(1) [data-item-id='Select']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(2) [data-item-id='measureTools-group']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(3):last-child [data-item-id='sectionTools-group']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(1) [data-item-id='UiFramework.ClearSelection']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(2) [data-item-id='UiFramework.HideSelectionGroup']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(3) [data-item-id='UiFramework.IsolateSelectionGroup']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(4):last-child [data-item-id='UiFramework.EmphasizeSelected']`,
        `.nz-app-button .nz-bars .nz-bar + .nz-bar + .nz-bar`,
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

  it("BasicToolWidget with suffix and prefix items should render correctly", () => {
    const { container } = render(
      <BasicToolWidget
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
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(1) [data-item-id='Select']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(2) [data-item-id='test-v1-tool']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(3) [data-item-id='measureTools-group']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(4) [data-item-id='test-v2-tool']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(5):last-child [data-item-id='sectionTools-group']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(1) [data-item-id='test-h1-tool']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(2):last-child [data-item-id='test-h2-tool']`,
        `.nz-app-button .nz-bars .nz-bar + .nz-bar + .nz-bar`,
      ])
    );
  });

  it("BasicToolWidget should refresh when props change", () => {
    const { container, rerender } = render(
      <BasicToolWidget
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
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(1) [data-item-id='Select']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(2) [data-item-id='test-v1-tool']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(3) [data-item-id='measureTools-group']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(4) [data-item-id='test-v2-tool']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(5):last-child [data-item-id='sectionTools-group']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(1) [data-item-id='test-h1-tool']`,
        `.components-items.components-horizontal .components-toolbar-item-container:nth-child(2):last-child [data-item-id='test-h2-tool']`,
        `.nz-app-button .nz-bars .nz-bar + .nz-bar + .nz-bar`,
      ])
    );

    rerender(
      <BasicToolWidget
        additionalVerticalItems={undefined}
        additionalHorizontalItems={undefined}
      />
    );
    expect(container).to.satisfy(
      childStructure([
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(1) [data-item-id='Select']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(2) [data-item-id='measureTools-group']`,
        `.components-items.components-vertical .components-toolbar-item-container:nth-child(3):last-child [data-item-id='sectionTools-group']`,
        `.nz-horizontal-toolbar-container:empty`,
        `.nz-app-button .nz-bars .nz-bar + .nz-bar + .nz-bar`,
      ])
    );
  });
});
