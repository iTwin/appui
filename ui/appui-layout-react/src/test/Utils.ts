/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as sinon from "sinon";
import { addTab, NineZoneState, TabState } from "../appui-layout-react";
import { BentleyError } from "@itwin/core-bentley";
import { expect } from "chai";
import { prettyDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
export { userEvent };

before(() => {
  window.requestAnimationFrame = (cb: FrameRequestCallback) => {
    return window.setTimeout(cb, 1);
  };
  window.cancelAnimationFrame = (handle: number) => {
    window.clearTimeout(handle);
  };
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

/** Utiltiy function to add multiple tabs to the state. */
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
  return `${e.tagName}${e.id ? `#${e.id}`: ""}${Array.from(e.classList.values()).map((c) => `.${c}`).join("")}`;
}

/** Returns the full list of classes and tag chain for an element up to HTML */
function currentSelectorInfo(e: HTMLElement) {
  let w = e;
  const chain = [getPartialSelectorInfo(w)];
  while(w.parentElement) {
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
    Object.defineProperty(satisfier, "name",  {value: message});
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
    Object.defineProperty(satisfier, "name", {value: message});
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
    for(const prop in style) {
      if(Object.prototype.hasOwnProperty.call(style, prop)) {
        const value = style[prop];
        if(value instanceof RegExp) {
          expect(e.style, `property ${prop}`).to.have.property(prop).that.match(value);
        } else {
          expect(e.style).to.have.property(prop, value);
        }
      }
    }
    return true;
  };
}
