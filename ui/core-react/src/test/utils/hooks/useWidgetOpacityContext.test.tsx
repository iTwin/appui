/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import {
  useProximityToMouse,
  WidgetElementSet,
} from "../../../core-react/utils/hooks/useProximityToMouse.js";
import {
  useWidgetOpacityContext,
  WidgetOpacityContext,
} from "../../../core-react/utils/hooks/useWidgetOpacityContext.js";

function WidgetOpacityChild() {
  const { ref } = useWidgetOpacityContext<HTMLDivElement>();
  return <div ref={ref} />;
}

interface WidgetOpacityParentProps {
  elementSet: WidgetElementSet;
}

function WidgetOpacityParent(props: WidgetOpacityParentProps) {
  const { elementSet } = props;
  const proximityScale = useProximityToMouse(elementSet);

  return (
    <WidgetOpacityContext.Provider
      value={{
        addRef: (ref) => {
          elementSet.add(ref);
        },
        removeRef: (ref) => {
          elementSet.delete(ref);
        },
        proximityScale,
      }}
    >
      <div>
        <WidgetOpacityChild />
      </div>
    </WidgetOpacityContext.Provider>
  );
}

describe("useWidgetOpacityContext", () => {
  it("should use the widget opacity context", () => {
    const elementSet = new WidgetElementSet();

    render(<WidgetOpacityParent elementSet={elementSet} />);

    expect(elementSet.size).toEqual(1);
  });
});
