/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from "@testing-library/react";
import * as React from "react";
import {
  NonPrimitivePropertyLabelRenderer,
  PrimitivePropertyLabelRenderer,
} from "../../../../components-react";
import {
  childStructure,
  selectorMatches,
  styleMatch,
  userEvent,
} from "../../../TestUtils";

describe("PrimitivePropertyLabelRenderer ", () => {
  it("renders correctly when offset is not provided", () => {
    const { container } = render(
      <PrimitivePropertyLabelRenderer>Title</PrimitivePropertyLabelRenderer>
    );

    expect(container.firstElementChild).that.satisfy(
      styleMatch({ paddingLeft: "0px" })
    );
    expect(screen.getByText("Title")).to.exist;
  });

  it("renders correctly when offset is provided", () => {
    const { container } = render(
      <PrimitivePropertyLabelRenderer className="test-class" offset={50}>
        Title
      </PrimitivePropertyLabelRenderer>
    );

    expect(container.firstElementChild)
      .that.satisfy(styleMatch({ paddingLeft: "50px" }))
      .satisfy(selectorMatches(".test-class"));
  });
});

describe("NonPrimitivePropertyLabelRenderer  ", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });
  it("renders correctly", () => {
    render(
      <NonPrimitivePropertyLabelRenderer
        className="test-class-name"
        isExpanded={false}
        onCollapse={() => {}}
        onExpand={() => {}}
      >
        Title
      </NonPrimitivePropertyLabelRenderer>
    );

    expect(screen.getByRole("presentation"))
      .to.satisfy(childStructure("svg"))
      .satisfy(selectorMatches(".test-class-name"))
      .not.satisfy(childStructure(".components-expanded"));
    expect(screen.getByText("Title")).to.exist;
  });

  it("manipulates expand icon correctly when expanded", () => {
    render(
      <NonPrimitivePropertyLabelRenderer
        isExpanded={true}
        onCollapse={() => {}}
        onExpand={() => {}}
      >
        Title
      </NonPrimitivePropertyLabelRenderer>
    );

    expect(screen.getByRole("presentation")).to.satisfy(
      childStructure(".components-expanded")
    );
  });

  it("calls onExpand when label gets clicked while collapsed", async () => {
    const onExpand = vi.fn();

    render(
      <NonPrimitivePropertyLabelRenderer
        isExpanded={false}
        onCollapse={() => {}}
        onExpand={onExpand}
      >
        Title
      </NonPrimitivePropertyLabelRenderer>
    );

    await theUserTo.click(screen.getByRole("presentation"));

    expect(onExpand).toHaveBeenCalledOnce();
  });

  it("calls onCollapse when label gets clicked while expanded", async () => {
    const onCollapse = vi.fn();

    render(
      <NonPrimitivePropertyLabelRenderer
        isExpanded={true}
        onCollapse={onCollapse}
        onExpand={() => {}}
      >
        Title
      </NonPrimitivePropertyLabelRenderer>
    );

    await theUserTo.click(screen.getByRole("presentation"));

    expect(onCollapse).toHaveBeenCalledOnce();
  });
});
