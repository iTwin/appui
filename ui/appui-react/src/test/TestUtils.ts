/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Store } from "redux";
import { createStore } from "redux";
import type * as sinon from "sinon";
import { fireEvent, prettyDOM } from "@testing-library/react";
import { expect } from "chai";

import type {
  ContentLayoutProps,
  PrimitiveValue,
  PropertyDescription,
  PropertyEditorInfo,
} from "@itwin/appui-abstract";
import {
  PropertyRecord,
  PropertyValueFormat,
  StandardContentLayouts,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import type { UiStateStorage, UiStateStorageResult } from "@itwin/core-react";
import { UiStateStorageStatus } from "@itwin/core-react";

import type {
  ActionsUnion,
  DeepReadonly,
  FrameworkState,
} from "../appui-react";
import {
  combineReducers,
  ContentGroup,
  createAction,
  FrameworkReducer,
  SyncUiEventDispatcher,
  UiFramework,
} from "../appui-react";
import { TestContentControl } from "./frontstage/FrontstageTestUtils";
import userEvent from "@testing-library/user-event";
export { addPanelWidget } from "@itwin/appui-layout-react/lib/cjs/appui-layout-react/state/internal/PanelStateHelpers";
export {
  addTab,
  createDraggedTabState,
} from "@itwin/appui-layout-react/lib/cjs/appui-layout-react/state/internal/TabStateHelpers";
export {
  addDockedToolSettings,
  addWidgetToolSettings,
} from "@itwin/appui-layout-react/lib/cjs/appui-layout-react/state/internal/ToolSettingsStateHelpers";
export {
  addFloatingWidget,
  addPopoutWidget,
} from "@itwin/appui-layout-react/lib/cjs/appui-layout-react/state/internal/WidgetStateHelpers";
export { userEvent };

interface SampleAppState {
  placeHolder?: boolean;
}

const initialState: SampleAppState = {
  placeHolder: false,
};

/** */
export interface RootState {
  sampleAppState: SampleAppState;
  testDifferentFrameworkKey?: FrameworkState;
}

export const SampleAppActions = {
  // eslint-disable-next-line jsdoc/require-jsdoc
  example: () => createAction("SampleApp:EXAMPLE"),
};

/** @internal */
export type SampleAppActionsUnion = ActionsUnion<typeof SampleAppActions>;

function SampleAppReducer(
  state: SampleAppState = initialState,
  action: SampleAppActionsUnion
): DeepReadonly<SampleAppState> {
  switch (action.type) {
    case "SampleApp:EXAMPLE": {
      return { ...state, placeHolder: true };
    }
  }

  return state;
}

/** @internal */
export class TestUtils {
  private static _uiFrameworkInitialized = false;
  public static store: Store<RootState>;

  private static _rootReducer: any;

  public static async initializeUiFramework(testAlternateKey = false) {
    if (!TestUtils._uiFrameworkInitialized) {
      if (testAlternateKey) {
        // this is the rootReducer for the test application.
        this._rootReducer = combineReducers({
          sampleAppState: SampleAppReducer,
          testDifferentFrameworkKey: FrameworkReducer,
        });
      } else {
        // this is the rootReducer for the test application.
        this._rootReducer = combineReducers({
          sampleAppState: SampleAppReducer,
          frameworkState: FrameworkReducer,
        });
      }

      // eslint-disable-next-line deprecation/deprecation
      this.store = createStore(
        this._rootReducer,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      );

      if (testAlternateKey)
        await UiFramework.initialize(this.store, "testDifferentFrameworkKey");
      else await UiFramework.initialize(this.store);

      TestUtils._uiFrameworkInitialized = true;
    }
    UiFramework.toolSettings.clearToolSettingsData();
    UiFramework.useDefaultPopoutUrl = true;
    SyncUiEventDispatcher.setTimeoutPeriod(0); // disables non-immediate event processing.
  }

  public static terminateUiFramework() {
    UiFramework.terminate();
    TestUtils._uiFrameworkInitialized = false;
  }

  /** Define Content Layouts referenced by Frontstages. */
  public static fourQuadrants: ContentLayoutProps = {
    id: "FourQuadrants",
    description: "SampleApp:ContentLayoutDef.FourQuadrants",
    horizontalSplit: {
      id: "FourQuadrants.MainHorizontal",
      percentage: 0.5,
      top: {
        verticalSplit: {
          id: "FourQuadrants.TopVert",
          percentage: 0.5,
          left: 0,
          right: 1,
        },
      },
      bottom: {
        verticalSplit: {
          id: "FourQuadrants.BottomVert",
          percentage: 0.5,
          left: 2,
          right: 3,
        },
      },
    },
  };

  /** Define Content Groups referenced by Frontstages. */
  public static TestContentGroup1 = new ContentGroup({
    id: "TestContentGroup1",
    layout: StandardContentLayouts.fourQuadrants,
    contents: [
      {
        id: "test:TestContentControl1",
        classId: TestContentControl,
        applicationData: { label: "Content 1a", bgColor: "black" },
      },
      {
        id: "test:TestContentControl2",
        classId: TestContentControl,
        applicationData: { label: "Content 2a", bgColor: "black" },
      },
      {
        id: "test:TestContentControl3",
        classId: TestContentControl,
        applicationData: { label: "Content 3a", bgColor: "black" },
      },
      {
        id: "test:TestContentControl4",
        classId: TestContentControl,
        applicationData: { label: "Content 4a", bgColor: "black" },
      },
    ],
  });

  public static TestContentGroup2 = new ContentGroup({
    id: "TestContentGroup2",
    layout: StandardContentLayouts.singleView,
    contents: [
      {
        id: "test:TestContentControl2",
        classId: TestContentControl,
        applicationData: { label: "Content 1a", bgColor: "black" },
      },
    ],
  });

  /** Waits until all async operations finish */
  public static async flushAsyncOperations() {
    return new Promise((resolve) => setTimeout(resolve));
  }

  public static createBubbledEvent(type: string, props = {}) {
    const event = new Event(type, { bubbles: true });
    Object.assign(event, props);
    return event;
  }

  public static createPrimitiveStringProperty(
    name: string,
    rawValue: string,
    displayValue: string = rawValue.toString(),
    editorInfo?: PropertyEditorInfo
  ) {
    const value: PrimitiveValue = {
      displayValue,
      value: rawValue,
      valueFormat: PropertyValueFormat.Primitive,
    };

    const description: PropertyDescription = {
      displayLabel: name,
      name,
      typename: StandardTypeNames.String,
    };

    if (editorInfo) description.editor = editorInfo;

    const property = new PropertyRecord(value, description);
    property.isReadonly = false;
    return property;
  }
}

// cSpell:ignore testuser mailinator saml

/** @internal */
export const storageMock = () => {
  const storage: { [key: string]: any } = {};
  return {
    setItem: (key: string, value: string) => {
      storage[key] = value || "";
    },
    getItem: (key: string) => {
      return key in storage ? storage[key] : null;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: (i: number) => {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
  };
};

/** @internal */
export class UiStateStorageStub implements UiStateStorage {
  public async deleteSetting(): Promise<UiStateStorageResult> {
    return {
      status: UiStateStorageStatus.Success,
      setting: {},
    };
  }

  public async getSetting(): Promise<UiStateStorageResult> {
    return {
      status: UiStateStorageStatus.NotFound,
      setting: {},
    };
  }

  public async saveSetting(): Promise<UiStateStorageResult> {
    return {
      status: UiStateStorageStatus.Success,
      setting: {},
    };
  }
}

/** Stubs requestAnimationFrame. */
export function stubRaf() {
  const raf = window.requestAnimationFrame;
  const caf = window.cancelAnimationFrame;

  before(() => {
    window.requestAnimationFrame = (cb: FrameRequestCallback) => {
      return window.setTimeout(cb, 0);
    };
    window.cancelAnimationFrame = (handle: number) => {
      window.clearTimeout(handle);
    };
  });

  after(() => {
    window.requestAnimationFrame = raf;
    window.cancelAnimationFrame = caf;
  });
}

declare module "sinon" {
  interface SinonStubStatic {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    <T extends (...args: any) => any>(): sinon.SinonStub<
      Parameters<T>,
      ReturnType<T>
    >;
  }
}

/** Get a iTwinUI Button with a given label */
export function getButtonWithText(
  container: HTMLElement,
  label: string,
  onError?: (msg: string) => void
): Element | undefined {
  const selector = "button.iui-button";
  const buttons = container.querySelectorAll(selector);
  if (buttons.length <= 0)
    onError && onError(`Couldn't find any '${selector}' buttons`);

  const button = [...buttons].find((btn) => {
    const span = btn.querySelector("span");
    return span!.textContent === label;
  });
  if (!button) onError && onError(`No button found with '${label}' label`);

  return button;
}

/**
 * Select component pick value using index
 */
export const selectChangeValueByIndex = (
  select: HTMLElement,
  index: number,
  onError?: (msg: string) => void
): void => {
  fireEvent.click(select.querySelector(".iui-select-button") as HTMLElement);
  const tippy = select.ownerDocument.querySelector(
    "[data-tippy-root]"
  ) as HTMLElement;
  const menu = tippy.querySelector(".iui-menu") as HTMLUListElement;
  if (!menu) onError && onError(`Couldn't find menu`);
  expect(menu).to.exist;

  const menuItem = menu.querySelectorAll("li");
  if (menuItem[index] === undefined)
    onError && onError(`Couldn't find menu item ${index}`);
  expect(menuItem[index]).to.not.be.undefined;

  fireEvent.click(menuItem[index]);
};

/**
 * Select component change value using text of menu item to find item
 */
export const selectChangeValueByText = (
  select: HTMLElement,
  label: string,
  onError?: (msg: string) => void
): void => {
  fireEvent.click(select.querySelector(".iui-select-button") as HTMLElement);
  const tippy = select.ownerDocument.querySelector(
    "[data-tippy-root]"
  ) as HTMLElement;
  const menu = tippy.querySelector(".iui-menu") as HTMLUListElement;
  if (!menu) onError && onError(`Couldn't find menu`);
  expect(menu).to.exist;

  const menuItems = menu.querySelectorAll("li span.iui-content");
  if (menuItems.length <= 0) onError && onError("Couldn't find any menu items");
  expect(menuItems.length).to.be.greaterThan(0);

  const menuItem = [...menuItems].find((span) => span.textContent === label);
  if (!menuItem)
    onError && onError(`Couldn't find menu item with '${label}' label`);
  expect(menuItem).to.not.be.undefined;

  fireEvent.click(menuItem!);
};

/**
 * Select component test number of options
 */
export const selectTestOptionCount = (
  select: HTMLElement,
  expectedCount: number,
  onError?: (msg: string) => void
): void => {
  fireEvent.click(select.querySelector(".iui-select-button") as HTMLElement);
  const tippy = select.ownerDocument.querySelector(
    "[data-tippy-root]"
  ) as HTMLElement;
  const menu = tippy.querySelector(".iui-menu") as HTMLUListElement;
  if (!menu) onError && onError(`Couldn't find menu`);
  expect(menu).to.exist;

  const menuItems = menu.querySelectorAll("li span.iui-content");
  if (menuItems.length <= 0) onError && onError(`Couldn't find any menu items`);

  expect(menuItems.length).to.eq(expectedCount);

  fireEvent.click(select.querySelector(".iui-select-button") as HTMLElement);
};

/** Handle an error when attempting to get an element */
export function handleError(msg: string) {
  console.log(msg); // eslint-disable-line no-console
}

/** Stubs scrollIntoView. */
export function stubScrollIntoView() {
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  const scrollIntoViewMock = function () {};

  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });
}

/** Returns tag, id and classes of the information used by CSS selectors */
function getPartialSelectorInfo(e: HTMLElement) {
  return `${e.tagName}${e.id ? `#${e.id}` : ""}${Array.from(
    e.classList.values()
  )
    .map((c) => `.${c}`)
    .join("")}`;
}

/** Returns the full list of classes and tag chain for an element up to HTML */
function currentSelectorInfo(e: HTMLElement) {
  let w = e;
  const chain = [getPartialSelectorInfo(w)];
  while (w.parentElement) {
    w = w.parentElement;
    chain.unshift(getPartialSelectorInfo(w));
  }
  return chain.join(" > ");
}

/**
 * Function to generate a `satisfy` function and the relevant error message.
 * @param selectors selector string used in `matches`
 * @returns satisfy function which returns `tested.matches(selectors)`
 */
export function selectorMatches(selectors: string) {
  const satisfier = (e: HTMLElement) => {
    // \b\b\b... removes default "[Function : " part to get clear message in output.
    const message = `\b\b\b\b\b\b\b\b\b\b\belement.matches('${selectors}'); current element selector: '${currentSelectorInfo(
      e
    )}'\n\n${prettyDOM()}`;
    Object.defineProperty(satisfier, "name", { value: message });
    return e.matches(selectors);
  };
  return satisfier;
}

/**
 * Function to generate a `satisfy` function and the relevant error message.
 * @param selectors selector string used in `querySelector` of the element tested.
 * @returns satisfy function which returns `!!tested.querySelector(selectors)`
 */
export function childStructure(selectors: string | string[]) {
  const satisfier = (e: HTMLElement) => {
    const failedSelectors = (
      Array.isArray(selectors) ? selectors : [selectors]
    ).filter((selector) => !e.querySelector(selector));
    // \b\b\b... removes default "[Function : " part to get clear message in output.
    const message = `\b\b\b\b\b\b\b\b\b\b element.querySelector(\n'${failedSelectors.join(
      "'\n AND \n'"
    )}'\n); but is: \n${prettyDOM(e)}`;
    Object.defineProperty(satisfier, "name", { value: message });
    return failedSelectors.length === 0;
  };
  return satisfier;
}

/**
 * Type to allow CSSStyleDeclaration to be a regexp that will be matched against the
 * property instead of the string value.
 */
type Matchable<T> = { [P in keyof T]: T[P] | RegExp };

/**
 * Function to generate a `satisfy` function
 * @param style Style object to compare, each properties of this object should be on the element style
 * @returns satisfy function
 */
export function styleMatch(style: Matchable<Partial<CSSStyleDeclaration>>) {
  return (e: HTMLElement) => {
    expect(e).to.be.instanceOf(HTMLElement).and.have.property("style");
    for (const prop in style) {
      if (Object.prototype.hasOwnProperty.call(style, prop)) {
        const value = style[prop];
        if (value instanceof RegExp) {
          expect(e.style, `property ${prop}`)
            .to.have.property(prop)
            .that.match(value);
        } else {
          expect(e.style).to.have.property(prop, value);
        }
      }
    }
    return true;
  };
}

/**
 * Create a selectAll option object for userevent.type.
 * @returns userevent type option parameter which selects all when entering (to replace the content)
 */
export function selectAllBeforeType() {
  return {
    initialSelectionStart: 0,
    initialSelectionEnd: Infinity,
  };
}

export default TestUtils;
