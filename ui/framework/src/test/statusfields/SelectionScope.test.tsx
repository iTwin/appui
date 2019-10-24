/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { Provider } from "react-redux";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Presentation } from "@bentley/presentation-frontend";
import { IModelApp } from "@bentley/imodeljs-frontend";
import { initializeAsync as initializePresentationTesting, terminate as terminatePresentationTesting } from "@bentley/presentation-testing";
import TestUtils from "../TestUtils";
import {
  StatusBar,
  SelectionScopeField,
  StatusBarWidgetControl,
  WidgetState,
  ConfigurableCreateInfo,
  ConfigurableUiControlType,
  WidgetDef,
  UiFramework,
  SessionStateActionId,
  StatusBarWidgetControlArgs,
  PresentationSelectionScope,
} from "../../ui-framework";

class AppStatusBarWidgetControl extends StatusBarWidgetControl {
  constructor(info: ConfigurableCreateInfo, options: any) {
    super(info, options);
  }

  public getReactNode({ isInFooterMode, onOpenWidget, openWidget }: StatusBarWidgetControlArgs): React.ReactNode {
    return (
      <>
        <SelectionScopeField isInFooterMode={isInFooterMode} onOpenWidget={onOpenWidget} openWidget={openWidget} />
      </>
    );
  }
}

describe("SelectionScopeField", () => {

  let widgetControl: StatusBarWidgetControl | undefined;

  before(async () => {
    await TestUtils.initializeUiFramework();

    const statusBarWidgetDef = new WidgetDef({
      classId: AppStatusBarWidgetControl,
      defaultState: WidgetState.Open,
      isFreeform: false,
      isStatusBar: true,
    });
    widgetControl = statusBarWidgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  afterEach(cleanup);

  it("SelectionScopeField with default data", () => {
    const component = render(<Provider store={TestUtils.store}>
      <StatusBar widgetControl={widgetControl} isInFooterMode={true} />
    </Provider>);
    expect(component).not.to.be.undefined;
    const selectElement = component.getByTestId("components-selectionScope-selector") as HTMLSelectElement;
    expect(selectElement).not.to.be.null;
    expect(selectElement.value).to.be.equal("element");
  });

  it("SelectionScopeField with multiple scopes", async () => {
    UiFramework.dispatchActionToStore(SessionStateActionId.SetAvailableSelectionScopes, [
      { id: "element", label: "Element" } as PresentationSelectionScope,
      { id: "assembly", label: "Assembly" } as PresentationSelectionScope,
      { id: "top-assembly", label: "Top Assembly" } as PresentationSelectionScope,
    ]);

    UiFramework.dispatchActionToStore(SessionStateActionId.SetSelectionScope, "top-assembly");

    // UiFramework.frameworkState!.sessionState.availableSelectionScopes = 1;
    const component = render(<Provider store={TestUtils.store}>
      <StatusBar widgetControl={widgetControl} isInFooterMode={true} />
    </Provider>);
    expect(component).not.to.be.undefined;
    const selectElement = component.getByTestId("components-selectionScope-selector") as HTMLSelectElement;
    expect(selectElement).not.to.be.null;
    expect(selectElement.value).to.be.equal("top-assembly");
    expect(selectElement.selectedIndex).to.be.equal(2);
  });
});

// before we can test setting scope to a valid scope id we must make sure Presentation Manager is initialized.
describe("Test that requires Presentation", () => {

  let widgetControl: StatusBarWidgetControl | undefined;

  const shutdownIModelApp = () => {
    if (IModelApp.initialized)
      IModelApp.shutdown();
  };

  before(async () => {
    shutdownIModelApp();
    Presentation.terminate();

    await initializePresentationTesting();
    await TestUtils.initializeUiFramework();

    const statusBarWidgetDef = new WidgetDef({
      classId: AppStatusBarWidgetControl,
      defaultState: WidgetState.Open,
      isFreeform: false,
      isStatusBar: true,
    });
    widgetControl = statusBarWidgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget) as StatusBarWidgetControl;
  });

  after(() => {
    TestUtils.terminateUiFramework();
    terminatePresentationTesting();
  });

  afterEach(cleanup);

  it("SelectionScopeField with specific scopes", () => {
    UiFramework.dispatchActionToStore(SessionStateActionId.SetAvailableSelectionScopes, [
      { id: "element", label: "Element" } as PresentationSelectionScope,
      { id: "assembly", label: "Assembly" } as PresentationSelectionScope,
      { id: "top-assembly", label: "Top Assembly" } as PresentationSelectionScope,
    ]);

    UiFramework.dispatchActionToStore(SessionStateActionId.SetSelectionScope, "top-assembly");

    // UiFramework.frameworkState!.sessionState.availableSelectionScopes = 1;
    const component = render(<Provider store={TestUtils.store}>
      <StatusBar widgetControl={widgetControl} isInFooterMode={true} />
    </Provider>);
    expect(component).not.to.be.undefined;
    const selectElement = component.getByTestId("components-selectionScope-selector") as HTMLSelectElement;
    expect(selectElement).not.to.be.null;
    expect(selectElement.value).to.be.equal("top-assembly");
    expect(selectElement.selectedIndex).to.be.equal(2);
    fireEvent.click(selectElement);

    // Clicking on an option during test is not working - so trigger change instead
    // const assemblyEntry = component.getByValue("assembly");
    // fireEvent.select(assemblyEntry);
    // fireEvent.click(assemblyEntry);
    fireEvent.change(selectElement, { target: { value: "assembly" } });
    expect(selectElement.selectedIndex).to.be.equal(1);
  });
});
