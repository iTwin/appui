/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  BrowserContext,
  ConsoleMessage,
  expect,
  Locator,
  Page,
} from "@playwright/test";
import type { PanelSide } from "../../ui/appui-react/src/appui-react/layout/widget-panels/PanelTypes";
import { WidgetState } from "../../ui/appui-react/src/appui-react/widgets/WidgetState";
import { StagePanelState } from "../../ui/appui-react/src/appui-react/stagepanels/StagePanelState";

export { StagePanelState, WidgetState, PanelSide };

export type SectionId = 0 | 1;

export async function runKeyin(page: Page, keyin: string) {
  const ui = page.locator("#uifw-configurableui-wrapper");
  await ui.waitFor();
  await page.keyboard.press("Control+F2");
  const input = page.locator(`[placeholder="Enter key-in"]`);
  await input.fill(keyin);
  await input.press("Enter");
}

type FloatingWidgetLocatorArgs = { page: Page; id: string } | { tab: Locator };

export function floatingWidgetLocator(args: FloatingWidgetLocatorArgs) {
  if ("tab" in args) {
    return args.tab
      .page()
      .locator(".nz-widget-floatingWidget", { has: args.tab });
  }
  return args.page.locator(`[data-widget-id="${args.id}"]`);
}

type WidgetLocatorArgs = { tab: Locator } | { panel: Locator };

export function widgetLocator(args: WidgetLocatorArgs) {
  if ("tab" in args)
    return args.tab.page().locator(".nz-widget-widget", { has: args.tab });
  return args.panel.locator(".nz-widget-widget");
}

export function tabLocator(page: Page, label: string) {
  return page.locator(`[title="${label}"]`);
}

export function activeTabLocator(widget: Locator) {
  return widget.locator(".nz-active");
}

export function toolbarItemLocator(page: Page, label: string) {
  return page.getByRole("button", {
    name: label,
  });
}

export function statusBarItemLocator(page: Page, label: string) {
  return page.locator(`[title="${label}"]`);
}

export function backstageItemLocator(page: Page, label: string) {
  return page.getByText(label, { exact: true });
}

type PanelLocatorArgs = { page: Page; side: PanelSide } | { tab: Locator };

export function panelLocator(args: PanelLocatorArgs) {
  if ("tab" in args) {
    return args.tab.page().locator(".nz-widgetPanels-panel", { has: args.tab });
  }
  return args.page.locator(`.nz-widgetPanels-panel.nz-${args.side}`);
}

export function panelTargetLocator(args: { page: Page; side: PanelSide }) {
  return args.page.locator(
    `.nz-target-targetContainer.nz-${args.side} .nz-target-panelTarget`
  );
}

export function titleBarHandleLocator(widget: Locator) {
  return widget.locator(".nz-handle");
}

export function frontstageLocator(page: Page) {
  return page.locator(".uifw-widgetPanels-frontstage");
}

type OutlineLocatorArgs =
  | { page: Page; side: PanelSide }
  | { panel: Locator; sectionId: SectionId };

export function outlineLocator(args: OutlineLocatorArgs): Locator;
export function outlineLocator(args: WidgetLocatorArgs): Locator[];

export function outlineLocator(args: OutlineLocatorArgs | WidgetLocatorArgs) {
  if ("side" in args) {
    return args.page.locator(`.nz-outline-panelOutline.nz-${args.side}`);
  }

  if ("sectionId" in args) {
    return args.panel.locator(
      `.nz-outline-sectionOutline.nz-${args.sectionId}`
    );
  }

  const widget = widgetLocator(args);
  return [
    widget.locator(".nz-outline-widgetOutline"),
    widget.locator(".nz-outline-tabOutline"),
  ];
}

export function panelSectionLocator(
  page: Page,
  side: PanelSide,
  sectionId: SectionId,
  options?: { has?: Locator }
) {
  const panel = panelLocator({ side, page });
  return panel.locator(`.nz-panel-section-${sectionId}`, options);
}

export interface SavedFrontstageState {
  nineZone: {
    floatingWidgets: {
      allIds: string[];
    };
    popoutWidgets: {
      allIds: string[];
    };
    widgets: {
      [id in string]: {
        id: string;
        activeTabId: string;
        tabs: string[];
      };
    };
    tabs: {
      [id in string]: {
        id: string;
      };
    };
    savedTabs: {
      allIds: string[];
      byId: {
        [id in string]: {
          popoutBounds: {
            bottom: number;
            left: number;
            right: number;
            top: number;
          };
        };
      };
    };
  };
}

/** Assertion helper that polls saved frontstage state from local storage until `conditionFn` is satisfied. */
export async function expectSavedFrontstageState<
  T extends SavedFrontstageState
>(context: BrowserContext, conditionFn: (state: T) => boolean) {
  await expect
    .poll(async () => {
      const storage = await context.storageState();
      const origin = storage.origins[0];
      const localStorage = origin.localStorage;
      const setting = localStorage.find(({ name }) => {
        return name.startsWith("uifw-frontstageSettings.frontstageState[");
      });
      if (!setting) return undefined;
      const state = JSON.parse(setting.value);
      return conditionFn(state);
    }, {})
    .toBeTruthy();
}

/** Asserts that a tab is in a specified panel section. */
export async function expectTabInPanelSection(
  tab: Locator,
  side: PanelSide,
  sectionId: SectionId,
  message?: string
) {
  const page = tab.page();
  const section = panelSectionLocator(page, side, sectionId, {
    has: tab,
  });
  await expect(
    section,
    `expected tab to be in panel '${side}' section '${sectionId}' ${message}`
  ).toBeVisible();
}

export async function openFrontstage(page: Page, frontstageId: string) {
  const toggleBackstage = page.locator(`.nz-app-button button`);
  await toggleBackstage.click();

  const backstageItem = page.locator(
    `[data-item-type="backstage-item"][data-item-id="${frontstageId}"]`
  );
  await backstageItem.click();
}

export async function setWidgetState(
  page: Page,
  widgetId: string,
  widgetState: WidgetState
) {
  await runKeyin(page, `widget setstate ${widgetId} ${widgetState}`);
}

export async function dragTab(tab: Locator, target: Locator) {
  const page = tab.page();
  const body = page.locator("body");
  await tab.dispatchEvent("mousedown", { clientX: 0, clientY: 0 });
  await tab.dispatchEvent("mousemove", { clientX: 20, clientY: 20 });
  const bounds = (await target.boundingBox())!;
  await body.dispatchEvent("mousemove", {
    clientX: bounds.x + bounds.width / 2,
    clientY: bounds.y + bounds.height / 2,
  });
  await body.dispatchEvent("mouseup");
}

export async function dragWidget(
  widget: Locator,
  options?: Parameters<Locator["dragTo"]>[1]
) {
  const page = widget.page();
  const titleBarHandle = titleBarHandleLocator(widget);
  const titleBarButtons = widget.locator(".nz-widget-widgetActions");
  const frontstage = frontstageLocator(page);

  // Widget tabs or title bar buttons overlay the handle. Make sure we drag the handle.
  const handleBounds = (await titleBarHandle.boundingBox())!;
  const buttonBounds = (await titleBarButtons.boundingBox())!;
  await titleBarHandle.dragTo(frontstage, {
    sourcePosition: {
      x: handleBounds.width - buttonBounds.width - 5,
      y: 5,
    },
    ...options,
  });
}

export async function openComponentExamples(
  page: Page,
  baseURL: string | undefined
) {
  await page.goto(`${baseURL}/blank?frontstageId=widget-api&menu=0`);
  await page.getByRole("button", { name: "Open backstage menu" }).click();
  await page.getByRole("menuitem", { name: "Component Examples" }).click();
}

export function trackConsole<T = string>(
  page: Page,
  select?: (msg: ConsoleMessage) => Promise<T>
) {
  const messages: T[] = [];
  page.on("console", async (message) => {
    if (select === undefined) {
      messages.push(message.text() as T);
      return;
    }
    const selected = await select(message);
    if (selected === undefined) return;
    messages.push(selected);
  });
  return messages as ReadonlyArray<T>;
}

export async function popoutWidget(widget: Locator) {
  const context = widget.page().context();
  const popoutButton = widget.getByRole("button", {
    name: "Pop out active widget tab",
  });
  const [popoutPage] = await Promise.all([
    context.waitForEvent("page"),
    popoutButton.click(),
  ]);
  await popoutPage.waitForLoadState(); // TODO: childWindow is only added after 'load' event
  return popoutPage;
}
