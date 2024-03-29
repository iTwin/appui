/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, within } from "@testing-library/react";
import {
  SelectionScopeField,
  SessionStateActionId,
  StatusBar,
  UiFramework,
} from "../../appui-react";
import TestUtils, { waitForPosition } from "../TestUtils";

describe(`SelectionScopeField`, () => {
  describe("Bare tests", () => {
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

      const component = render(
        <Provider store={TestUtils.store}>
          <StatusBar>
            <SelectionScopeField />
          </StatusBar>
        </Provider>
      );

      const comboBox = within(
        component.getByTestId("components-selectionScope-selector")
      ).getByRole("combobox");
      fireEvent.click(comboBox);
      await waitForPosition();

      fireEvent.click(component.getByText("Assembly"));

      expect(UiFramework.getActiveSelectionScope()).to.be.equal("assembly");
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
