/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as sinon from "sinon";
import { renderHook } from "@testing-library/react-hooks";
import { useEffectSkipFirst } from "../../ui-core/utils/CustomHooks";

// tslint:disable: react-hooks-nesting
describe("useEffectSkipFirst", () => {

  it("does not invoke callback on first effect", () => {
    const spy = sinon.spy();
    renderHook(
      (props: { callback: () => void, deps?: any[] }) => useEffectSkipFirst(props.callback, props.deps),
      { initialProps: { callback: spy, deps: [true] } },
    );

    expect(spy).to.not.be.called;
  });

  it("invokes callback when dependencies change", () => {
    const spy = sinon.spy();
    const { rerender } = renderHook(
      (props: { callback: () => void, deps?: any[] }) => useEffectSkipFirst(props.callback, props.deps),
      { initialProps: { callback: spy, deps: [true] } },
    );

    expect(spy).to.not.be.called;

    rerender({ callback: spy, deps: [false] });

    expect(spy).to.be.calledOnce;
  });

});
