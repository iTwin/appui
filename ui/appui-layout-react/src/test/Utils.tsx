/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { BentleyError } from "@itwin/core-bentley";
import { prettyDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addTab, NineZoneState, TabState, useActiveSendBackWidgetIdStore, useContainersStore } from "../appui-layout-react";

export { userEvent };

before(() => {
  window.requestAnimationFrame = (cb: FrameRequestCallback) => {
    return window.setTimeout(cb, 1);
  };
  window.cancelAnimationFrame = (handle: number) => {
    window.clearTimeout(handle);
  };
});

const initialSendBackState = useActiveSendBackWidgetIdStore.getState();
const initialContainersState = useContainersStore.getState();
beforeEach(() => {
  useActiveSendBackWidgetIdStore.setState(initialSendBackState, true);
  useContainersStore.setState(initialContainersState, true);
});

/** @internal */
export const createRect = (left: number, top: number, right: number, bottom: number): DOMRect => DOMRect.fromRect({
  x: left,
  y: top,
  width: right - left,
  height: bottom - top,
});

/** @internal */
export class ResizeObserverMock implements ResizeObserver {
  public constructor(public readonly callback: ResizeObserverCallback) {
  }

  public observe(_: Element): void {
  }

  public unobserve(_: Element): void {
  }

  public disconnect(): void {
  }
}

declare module "sinon" {
  interface SinonStubStatic {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    <T extends (...args: any) => any>(): sinon.SinonStub<Parameters<T>, ReturnType<T>>;
  }
}

/** @internal */
export type SinonSpy<T extends (...args: any) => any> = sinon.SinonSpy<Parameters<T>, ReturnType<T>>;
/** @internal */
export type SinonStub<T extends (...args: any) => any> = sinon.SinonStub<Parameters<T>, ReturnType<T>>;

/** Waits until all async operations finish */
export async function flushAsyncOperations() {
  return new Promise((resolve) => setTimeout(resolve, 300));
}

/** Utility function to add multiple tabs to the state. */
export function addTabs(state: NineZoneState, ids: string[], args?: Partial<TabState> | undefined) {
  for (const id of ids) {
    state = addTab(state, id, args);
  }
  return state;
}

/** Helper that invokes meta data handler of a thrown BentleyError.
 * @internal
 */
export function handleMetaData(fn: Function) {
  return () => {
    try {
      fn();
    } catch (e) {
      if (e instanceof BentleyError)
        e.getMetaData();
      throw e;
    }
  };
}

/** Returns tag, id and classes of the information used by CSS selectors */
function getPartialSelectorInfo(e: HTMLElement) {
  return `${e.tagName}${e.id ? `#${e.id}` : ""}${Array.from(e.classList.values()).map((c) => `.${c}`).join("")}`;
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
    const message = `\b\b\b\b\b\b\b\b\b\b\belement.matches('${selectors}'); current element selector: '${currentSelectorInfo(e)}'\n\n${prettyDOM()}`;
    Object.defineProperty(satisfier, "name", { value: message });
    return e.matches(selectors);
  };
  return satisfier;
}

/**
 * Function to generate a `satisfy` function and the relevant error message.
 * @param selectors selector string used in `querySelector` of the element tested (an array will require each selector to pass through `querySelector`)
 * @returns satisfy function which returns `!!tested.querySelector(selectors)`
 */
export function childStructure(selectors: string | string[]) {
  const satisfier = (e: HTMLElement) => {
    const failedSelectors = (Array.isArray(selectors) ? selectors : [selectors])
      .filter((selector) => !e.querySelector(selector));
    // \b\b\b... removes default "[Function : " part to get clear message in output.
    const message = `\b\b\b\b\b\b\b\b\b\b element.querySelector(\n'${failedSelectors.join("'\n AND \n'")}'\n); but is: \n${prettyDOM(e)}`;
    Object.defineProperty(satisfier, "name", { value: message });
    return failedSelectors.length === 0;
  };
  return satisfier;
}

/**
 * Type to allow CSSStyleDeclaration to be a regexp that will be matched against the
 * property instead of the string value.
 */
type Matchable<T> = { [P in keyof T]: T[P] | RegExp; };

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
          expect(e.style, `property ${prop}`).to.have.property(prop).that.match(value);
        } else {
          expect(e.style).to.have.property(prop, value);
        }
      }
    }
    return true;
  };
}

/**
 * Creates an option object that works with both React17 and React18 version of renderHooks.
 * @param Wrapper Component that should wrap the provided hook call.
 * @param props Needed props for the component.
 * @returns renderHook option object
 */
export function withWrapperAndProps<P>(Wrapper: React.FunctionComponent<P> | React.ComponentClass<P> | string, props: P) {
  return {
    wrapper: function ChildrenWrapper(childrenOnly: React.PropsWithChildren<{}>) {
      return <Wrapper {...props} {...childrenOnly} />;
    },
  };
}
