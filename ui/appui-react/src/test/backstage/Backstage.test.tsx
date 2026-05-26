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
import { childStructure, selectorMatches, userEvent } from "../TestUtils.js";
import { render, screen } from "@testing-library/react";
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

    expect(screen.getByRole("menuitem", { name: "Custom Label" })).to.satisfy(
      selectorMatches("li.nz-backstage-item")
    );
  });

  it("should invoke execute", async () => {
    const spy = vi.fn();
    const actionItem = getActionItem({ execute: spy });
    render(<BackstageActionItem item={actionItem} />);

    await theUserTo.click(screen.getByRole("menuitem"));

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should render with TechnicalPreview badgeType (old)", async () => {
    render(
      <BackstageActionItem
        item={getActionItem({ badge: BadgeType.TechnicalPreview })}
      />
    );

    expect(screen.getByRole("menuitem")).to.satisfy(
      childStructure(".nz-badge .core-badge-technicalPreviewBadge")
    );
  });

  it("should render with New badgeType (old)", async () => {
    render(
      <BackstageActionItem item={getActionItem({ badge: BadgeType.New })} />
    );

    expect(screen.getByRole("menuitem")).to.satisfy(
      childStructure(".nz-badge .core-badge-newBadge")
    );
  });

  it("should render with Deprecated badgeKind (new)", async () => {
    render(
      <BackstageActionItem item={getActionItem({ badgeKind: "deprecated" })} />
    );

    expect(screen.getByRole("menuitem")).to.satisfy(
      childStructure(".nz-badge .core-badge-deprecatedBadge")
    );
  });
});

describe("BackstageStageLauncher", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("should render", async () => {
    render(<BackstageStageLauncher item={getStageLauncherItem()} />);

    expect(screen.getByRole("menuitem", { name: "Custom Label" })).to.satisfy(
      selectorMatches("li.nz-backstage-item")
    );
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

    await theUserTo.click(screen.getByRole("menuitem"));
    expect(spy).toHaveBeenCalledWith("Frontstage-1");
  });

  it("should not activate if frontstage is not found", async () => {
    const spy = vi.spyOn(UiFramework.frontstages, "setActiveFrontstage");

    render(<BackstageStageLauncher item={getStageLauncherItem()} />);
    await theUserTo.click(screen.getByRole("menuitem"));

    expect(spy).not.toBeCalled();
  });

  it("should honor isActive prop override", () => {
    render(
      <BackstageStageLauncher item={getStageLauncherItem({ isActive: true })} />
    );

    expect(screen.getByRole("menuitem", { name: "Custom Label" })).to.satisfy(
      selectorMatches("li.nz-backstage-item.nz-active")
    );
  });
});
