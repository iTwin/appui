/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import sinon from "sinon";
import React, { forwardRef, useImperativeHandle } from "react";
import { render } from "@testing-library/react";
import { useElementScrollStorage } from "../../components-react/common/UseElementScrollStorage";

describe("useElementScrollStorage", () => {
  const containerClassName = "some-container";

  interface TestComponentAttributes {
    persist: () => void;
    restore: () => void;
  }

  // eslint-disable-next-line react/display-name
  const TestComponent = forwardRef<
    TestComponentAttributes,
    { lookupClassName?: string }
  >(({ lookupClassName }, testRef) => {
    const { ref, persist, restore } = useElementScrollStorage<HTMLDivElement>(
      lookupClassName ?? containerClassName
    );
    useImperativeHandle(
      testRef,
      () => ({
        persist,
        restore,
      }),
      [persist, restore]
    );

    return (
      <div ref={ref}>
        <div className={containerClassName}>Test Element</div>
      </div>
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  it("persists and restores scroll state", () => {
    const ref = React.createRef<TestComponentAttributes>();
    const { getByText } = render(<TestComponent ref={ref} />);

    const element = getByText("Test Element");

    let getterCalled = false;
    let setScroll: number = 0;
    sinon
      .stub(element, "scrollTop")
      .get(() => {
        getterCalled = true;
        return 10;
      })
      .set((value: number) => {
        setScroll = value;
      });

    ref.current!.persist();
    expect(getterCalled).to.be.true;

    ref.current!.restore();
    expect(setScroll).to.be.eq(10);
  });

  it("does nothing if element is not found", () => {
    const ref = React.createRef<TestComponentAttributes>();
    const { queryByText } = render(
      <TestComponent ref={ref} lookupClassName="invalid-class" />
    );

    expect(queryByText("Test Element")).to.not.be.null;

    let getterCalled = false;
    let scrollValue: number | undefined;
    sinon
      .stub(HTMLElement.prototype, "scrollTop")
      .get(() => {
        getterCalled = true;
        return 10;
      })
      .set((value: number) => {
        scrollValue = value;
      });

    ref.current!.persist();
    expect(getterCalled).to.be.false;

    ref.current!.restore();
    expect(scrollValue).to.be.undefined;
  });
});
