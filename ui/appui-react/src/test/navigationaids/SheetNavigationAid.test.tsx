/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as moq from "typemoq";
import type { IModelConnection } from "@itwin/core-frontend";
import { render } from "@testing-library/react";
import { SheetNavigationAid } from "../../appui-react";
import { childStructure } from "../TestUtils";

describe("SheetNavigationAid", () => {
  const connection = moq.Mock.ofType<IModelConnection>();

  it("renders correctly", () => {
    const { container } = render(
      <SheetNavigationAid iModelConnection={connection.object} />
    );

    expect(container).to.satisfy(childStructure(".uifw-sheet-navigation"));
  });

  it("handles slow iModel Connection", () => {
    // Take control of an async operation that mounting the component triggers...
    let resolver: (
      value:
        | IModelConnection.ViewSpec[]
        | PromiseLike<IModelConnection.ViewSpec[]>
    ) => void = () => {};
    const promise = new Promise<IModelConnection.ViewSpec[]>((resolve) => {
      resolver = resolve;
    });
    connection
      .setup((x) => x.views)
      .returns(() => ({ getViewList: async () => promise } as any));

    // Mount and unmount the component
    const { unmount } = render(
      <SheetNavigationAid iModelConnection={connection.object} />
    );
    unmount();
    // ... resolve the async operation after component is unmounted.
    expect(() => resolver([])).to.not.throw();
  });
});
