/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import * as React from "react";
import { Provider } from "react-redux";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { render } from "@testing-library/react";
import {
  SelectionScopeField,
  SessionStateActionId,
  StatusBar,
  UiFramework,
} from "../../appui-react";
import TestUtils, {
  handleError,
  selectChangeValueByIndex,
  stubScrollIntoView,
} from "../TestUtils";

describe(`SelectionScopeField`, () => {
  describe("Bare tests", () => {
    beforeAll(async () => {
      await NoRenderApp.startup();
      await TestUtils.initializeUiFramework();
    });

    afterAll(async () => {
      TestUtils.terminateUiFramework();
      await IModelApp.shutdown();
    });

    it("SelectionScopeField with default data", () => {
      const component = render(
        <Provider store={TestUtils.store}>
          <StatusBar>
            <SelectionScopeField />
          </StatusBar>
        </Provider>
      );
      expect(component).not.to.be.undefined;
      const selectElement = component.getByTestId(
        "components-selectionScope-selector"
      ) as HTMLSelectElement;
      expect(selectElement).not.to.be.null;
      expect(UiFramework.getActiveSelectionScope()).to.be.equal("element");
    });

    it("SelectionScopeField with multiple scopes", async () => {
      UiFramework.dispatchActionToStore(
        SessionStateActionId.SetAvailableSelectionScopes,
        [
          { id: "element", label: "Element" },
          { id: "assembly", label: "Assembly" },
          { id: "top-assembly", label: "Top Assembly" },
        ]
      );

      UiFramework.dispatchActionToStore(
        SessionStateActionId.SetSelectionScope,
        "top-assembly"
      );

      // UiFramework.frameworkState!.sessionState.availableSelectionScopes = 1;
      const component = render(
        <Provider store={TestUtils.store}>
          <StatusBar>
            <SelectionScopeField />
          </StatusBar>
        </Provider>
      );
      expect(component).not.to.be.undefined;
      const selectElement = component.getByTestId(
        "components-selectionScope-selector"
      ) as HTMLSelectElement;
      expect(selectElement).not.to.be.null;
      expect(UiFramework.getActiveSelectionScope()).to.be.equal("top-assembly");
      // expect(selectElement.selectedIndex).to.be.equal(2);
    });
  });

  // before we can test setting scope to a valid scope id we must make sure Presentation Manager is initialized.
  describe("Test that requires Presentation", () => {
    const shutdownIModelApp = async () => {
      if (IModelApp.initialized) await IModelApp.shutdown();
    };

    beforeAll(async () => {
      await shutdownIModelApp();

      await TestUtils.initializeUiFramework();
    });

    afterAll(async () => {
      TestUtils.terminateUiFramework();
    });

    stubScrollIntoView();

    it("SelectionScopeField with specific scopes", async () => {
      UiFramework.dispatchActionToStore(
        SessionStateActionId.SetAvailableSelectionScopes,
        [
          { id: "element", label: "Element" },
          { id: "assembly", label: "Assembly" },
          { id: "top-assembly", label: "Top Assembly" },
        ]
      );

      UiFramework.dispatchActionToStore(
        SessionStateActionId.SetSelectionScope,
        "top-assembly"
      );

      // UiFramework.frameworkState!.sessionState.availableSelectionScopes = 1;
      const component = render(
        <Provider store={TestUtils.store}>
          <StatusBar>
            <SelectionScopeField />
          </StatusBar>
        </Provider>
      );
      expect(component).not.to.be.undefined;
      const selectElement = component.getByTestId(
        "components-selectionScope-selector"
      ) as HTMLSelectElement;
      expect(selectElement).not.to.be.null;
      selectChangeValueByIndex(selectElement, 1, handleError); // use index now that labels are localized in frontend
      await TestUtils.flushAsyncOperations();
      expect(UiFramework.getActiveSelectionScope()).to.be.equal("assembly");
      // expect(selectElement.selectedIndex).to.be.equal(1);
    });

    it("SelectionScopeField should properly handle override scope labels", async () => {
      UiFramework.dispatchActionToStore(
        SessionStateActionId.SetAvailableSelectionScopes,
        [
          { id: "element", label: "Functional Element" },
          { id: "assembly", label: "Functional Assembly" },
          { id: "top-assembly", label: "Functional TopAssembly" },
        ]
      );

      UiFramework.dispatchActionToStore(
        SessionStateActionId.SetSelectionScope,
        "top-assembly"
      );

      const component = render(
        <Provider store={TestUtils.store}>
          <StatusBar>
            <SelectionScopeField />
          </StatusBar>
        </Provider>
      );
      expect(component).not.to.be.undefined;
      const selectElement = component.getByTestId(
        "components-selectionScope-selector"
      ) as HTMLSelectElement;
      expect(selectElement).not.to.be.null;
      expect(UiFramework.getActiveSelectionScope()).to.be.equal("top-assembly");
      component.getByText("Functional TopAssembly");
      UiFramework.dispatchActionToStore(
        SessionStateActionId.SetSelectionScope,
        "assembly"
      );
      await component.findByText("Functional Assembly");
      UiFramework.dispatchActionToStore(
        SessionStateActionId.SetSelectionScope,
        "element"
      );
      await component.findByText("Functional Element");
    });
  });
});
