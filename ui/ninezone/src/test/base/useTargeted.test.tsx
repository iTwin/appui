/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { useTargeted } from "../../ui-ninezone/base/useTargeted";

// tslint:disable-next-line: variable-name
const Targeted = (props: { children?: (targeted: boolean) => React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const targeted = useTargeted(ref);
  return (
    <div ref={ref} >
      {props.children && props.children(targeted)}
    </div>
  );
};

describe("useTargeted", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("should add event listeners", () => {
    const spy = sandbox.spy(document, "addEventListener");
    mount(<Targeted />);

    spy.calledOnceWithExactly("pointermove", sinon.match.any as any).should.true;
  });

  it("should remove event listeners", () => {
    const spy = sandbox.spy(document, "removeEventListener");
    const sut = mount(<Targeted />);
    sut.unmount();

    spy.calledOnceWithExactly("pointermove", sinon.match.any as any).should.true;
  });
});
