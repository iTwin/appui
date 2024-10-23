/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { ToolbarHelper, UiFramework } from "../../appui-react.js";
import { CommandItemDef } from "../../appui-react/shared/CommandItemDef.js";
import { BasicToolWidget } from "../../appui-react/widgets/BasicToolWidget.js";
import { childStructure } from "../TestUtils.js";
import { IModelApp } from "@itwin/core-frontend";

describe("BasicToolWidget", () => {
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
    const { getByRole } = render(<BasicToolWidget />);

    getByRole("button", { name: "buttons.openBackstageMenu" });

    getByRole("button", { name: "tools.Select" });
    getByRole("button", { name: "tools.measureTools" });
    getByRole("button", { name: "tools.sectionTools" });
    getByRole("button", { name: "buttons.clearSelection" });
    getByRole("button", { name: "tools.hideSelected" });
    getByRole("button", { name: "tools.isolateSelected" });
    getByRole("button", { name: "tools.emphasizeSelected" });
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
    const { getByRole } = render(
      <BasicToolWidget showCategoryAndModelsContextTools={true} />
    );

    getByRole("button", { name: "tools.Select" });
    getByRole("button", { name: "tools.measureTools" });
    getByRole("button", { name: "tools.sectionTools" });
    getByRole("button", { name: "buttons.clearSelection" });
    getByRole("button", { name: "tools.hide" });
    getByRole("button", { name: "tools.isolate" });
    getByRole("button", { name: "tools.emphasizeSelected" });
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

  it("BasicToolWidget should refresh when props change", async () => {
    const { rerender, getByRole, queryByRole } = render(
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

    getByRole("button", { name: "test-h1-tool" });
    getByRole("button", { name: "test-h2-tool" });
    getByRole("button", { name: "test-v1-tool" });
    getByRole("button", { name: "test-v2-tool" });

    rerender(
      <BasicToolWidget
        additionalVerticalItems={undefined}
        additionalHorizontalItems={undefined}
      />
    );

    expect(queryByRole("button", { name: "test-h1-tool" })).toEqual(null);
    expect(queryByRole("button", { name: "test-h2-tool" })).toEqual(null);
    expect(queryByRole("button", { name: "test-v1-tool" })).toEqual(null);
    expect(queryByRole("button", { name: "test-v2-tool" })).toEqual(null);
  });
});
