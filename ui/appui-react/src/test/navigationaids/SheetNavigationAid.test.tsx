/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import * as React from "react";
import * as moq from "typemoq";
import type { IModelConnection } from "@itwin/core-frontend";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { render } from "@testing-library/react";
import { CardContainer, SheetNavigationAid } from "../../appui-react";
import TestUtils, { childStructure } from "../TestUtils";

describe("SheetNavigationAid", () => {
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  afterAll(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  const connection = moq.Mock.ofType<IModelConnection>();
  afterEach(() => {
    connection.reset();
  });

  describe("<SheetNavigationAid />", () => {
    it("renders in progress correctly", () => {
      const { container } = render(
        <SheetNavigationAid iModelConnection={connection.object} />
      );

      expect(container).to.satisfy(
        childStructure(".uifw-sheet-navigation .iui-progress-indicator-radial")
      );
    });

    it("listen on CardContainer.cardSelectedEvent", () => {
      const { container } = render(
        <SheetNavigationAid iModelConnection={connection.object} />
      );
      CardContainer.onCardSelectedEvent.emit({ id: 5, index: 5 });
      expect(container).to.satisfy(
        childStructure(".uifw-sheet-navigation .iui-progress-indicator-radial")
      );
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
});
