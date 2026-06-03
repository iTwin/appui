/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { BadgeType } from "@itwin/core-react";
import type {
  BackstageActionItem as BackstageActionItemDef,
  BackstageStageLauncher as BackstageStageLauncherDef,
} from "../../appui-react.js";
import { UiFramework } from "../../appui-react.js";
import { childStructure, userEvent } from "../TestUtils.js";
import { render, screen, within } from "@testing-library/react";
import {
  BackstageActionItem,
  BackstageStageLauncher,
} from "../../appui-react/backstage/Backstage.js";

/** @internal */
export const getActionItem = (
  item?: Partial<BackstageActionItemDef>
): BackstageActionItemDef => ({
  execute: () => {},
  groupPriority: 100,
  id: "Action",
  itemPriority: 50,
  label: "Custom Label",
  ...(item ? item : {}),
});

/** @internal */
export const getStageLauncherItem = (
  item?: Partial<BackstageStageLauncherDef>
): BackstageStageLauncherDef => ({
  groupPriority: 100,
  id: "Stage",
  itemPriority: 50,
  label: "Custom Label",
  stageId: "stage-1",
  ...(item ? item : {}),
});

describe("BackstageActionItem", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("should render", () => {
    render(<BackstageActionItem item={getActionItem()} />);
    screen.getByRole("button", { name: "Custom Label" });
  });

  it("should invoke execute", async () => {
    const spy = vi.fn();
    const actionItem = getActionItem({ execute: spy });
    render(<BackstageActionItem item={actionItem} />);

    await theUserTo.click(screen.getByRole("button"));

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should render with TechnicalPreview badgeType (old)", () => {
    render(
      <BackstageActionItem
        item={getActionItem({ badge: BadgeType.TechnicalPreview })}
      />
    );

    expect(screen.getByRole("listitem")).to.satisfy(
      childStructure(".core-badge-technicalPreviewBadge")
    );
  });

  it("should render with New badgeType (old)", () => {
    render(
      <BackstageActionItem item={getActionItem({ badge: BadgeType.New })} />
    );

    expect(screen.getByRole("listitem")).to.satisfy(
      childStructure(".core-badge-newBadge")
    );
  });

  it("should render with Deprecated badgeKind (new)", () => {
    render(
      <BackstageActionItem item={getActionItem({ badgeKind: "deprecated" })} />
    );

    expect(screen.getByRole("listitem")).to.satisfy(
      childStructure(".core-badge-deprecatedBadge")
    );
  });
});

describe("BackstageStageLauncher", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("should render", () => {
    render(<BackstageStageLauncher item={getStageLauncherItem()} />);
    screen.getByRole("button", { name: "Custom Label" });
  });

  it("should activate frontstage", async () => {
    vi.spyOn(UiFramework.frontstages, "hasFrontstage").mockImplementation(
      (id) => {
        return id === "Frontstage-1";
      }
    );
    const spy = vi.spyOn(UiFramework.frontstages, "setActiveFrontstage");

    render(
      <BackstageStageLauncher
        item={getStageLauncherItem({ stageId: "Frontstage-1" })}
      />
    );

    await theUserTo.click(screen.getByRole("button"));
    expect(spy).toHaveBeenCalledWith("Frontstage-1");
  });

  it("should not activate if frontstage is not found", async () => {
    const spy = vi.spyOn(UiFramework.frontstages, "setActiveFrontstage");

    render(<BackstageStageLauncher item={getStageLauncherItem()} />);
    await theUserTo.click(screen.getByRole("button"));

    expect(spy).not.toBeCalled();
  });

  it("should honor isActive prop override", () => {
    render(
      <BackstageStageLauncher item={getStageLauncherItem({ isActive: true })} />
    );

    const stageItem = screen.getByRole("button", { name: "Custom Label" });
    expect(stageItem?.getAttribute("aria-current")).toEqual("true");
  });
});
