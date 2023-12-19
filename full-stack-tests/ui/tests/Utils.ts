/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BrowserContext, expect, Locator, Page } from "@playwright/test";

export async function runKeyin(page: Page, keyin: string) {
  const ui = page.locator("#uifw-configurableui-wrapper");
  await ui.waitFor();
  await page.keyboard.press("Control+F2");
  const input = page.locator(`[placeholder="Enter key-in"]`);
  await input.fill(keyin);
  await input.press("Enter");
}

type PanelSide = "left" | "right" | "top" | "bottom";

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
  return page.locator(`[title="${label}"]`);
}

export function statusBarItemLocator(page: Page, label: string) {
  return page.locator(`[title="${label}"]`);
}

export function backstageItemLocator(page: Page, label: string) {
  return page.getByText(label, { exact: true });
}

export function popoutButtonLocator(widget: Locator) {
  return widget.locator('[title="Pop out active widget tab"]');
}

type PanelLocatorArgs = { page: Page; side: PanelSide } | { tab: Locator };

export function panelLocator(args: PanelLocatorArgs) {
  if ("tab" in args) {
    return args.tab.page().locator(".nz-widgetPanels-panel", { has: args.tab });
  }
  return args.page.locator(`.nz-widgetPanels-panel.nz-${args.side}`);
}

export function titleBarHandleLocator(widget: Locator) {
  return widget.locator(".nz-handle");
}

export function frontstageLocator(page: Page) {
  return page.locator(".uifw-widgetPanels-frontstage");
}

type OutlineLocatorArgs =
  | { page: Page; side: PanelSide }
  | { panel: Locator; sectionIndex: 0 | 1 };

export function outlineLocator(args: OutlineLocatorArgs): Locator;
export function outlineLocator(args: WidgetLocatorArgs): Locator[];

export function outlineLocator(args: OutlineLocatorArgs | WidgetLocatorArgs) {
  if ("side" in args) {
    return args.page.locator(`.nz-outline-panelOutline.nz-${args.side}`);
  }

  if ("sectionIndex" in args) {
    return args.panel.locator(
      `.nz-outline-sectionOutline.nz-${args.sectionIndex}`
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
  sectionId: 0 | 1,
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
  sectionId: 0 | 1,
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

export enum WidgetState {
  Open = 0,
  Closed = 1,
  Hidden = 2,
  Floating = 3,
  Unloaded = 4,
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
    clientX: bounds.x,
    clientY: bounds.y,
  });
  await body.dispatchEvent("mouseup");
}

export async function openComponentExamples(
  page: Page,
  baseURL: string | undefined
) {
  await page.goto(`${baseURL}?frontstage=appui-test-providers:WidgetApi`);
  await page.locator(".nz-toolbar-button-button").click();
  await page.getByRole("menuitem", { name: "Component Examples" }).click();
}

export function trackWidgetLifecycle(page: Page, widgetId: string) {
  const lifecycle = {
    mountCount: 0,
    unMountCount: 0,
  };
  page.on("console", (msg) => {
    if (msg.text() === `Widget ${widgetId} mount`) lifecycle.mountCount++;
    if (msg.text() === `Widget ${widgetId} unmount`) lifecycle.unMountCount++;
  });
  return lifecycle;
}
