/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { render } from "@testing-library/react";
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import type { ModalFrontstageInfo } from "../../appui-react";
import { ModalFrontstage, UiFramework } from "../../appui-react";
import TestUtils from "../TestUtils";

const navigationBackSpy = sinon.spy();
const closeModalSpy = sinon.spy();

function renderModalFrontstage(isOpen: boolean): React.ReactElement<any> {
  const activeModalFrontstage: ModalFrontstageInfo | undefined =
    UiFramework.frontstages.activeModalFrontstage;
  if (!activeModalFrontstage) {
    throw Error;
  }

  const { title, content, appBarRight } = activeModalFrontstage;

  return (
    <ModalFrontstage
      isOpen={isOpen}
      title={title}
      navigateBack={navigationBackSpy}
      closeModal={closeModalSpy}
      appBarRight={appBarRight}
    >
      {content}
    </ModalFrontstage>
  );
}

class TestModalFrontstage implements ModalFrontstageInfo {
  public title: string = "Test Modal Frontstage";

  public get content(): React.ReactNode {
    return <div />;
  }

  public get appBarRight(): React.ReactNode {
    return <input type="text" defaultValue="Hello" />;
  }
}

describe("ModalFrontstage", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  after(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("openModalFrontstage, updateModalFrontstage & closeModalFrontstage", () => {
    const modalFrontstage = new TestModalFrontstage();

    const changedEventSpy = sinon.spy();
    const closedEventSpy = sinon.spy();
    const removeListener =
      UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(
        changedEventSpy
      );
    const removeListener2 =
      UiFramework.frontstages.onModalFrontstageClosedEvent.addListener(
        closedEventSpy
      );

    UiFramework.frontstages.openModalFrontstage(modalFrontstage);
    expect(changedEventSpy.calledOnce).toEqual(true);

    const { baseElement, rerender } = render(renderModalFrontstage(false));

    rerender(renderModalFrontstage(true));
    expect(
      baseElement.querySelectorAll("div.uifw-modal-frontstage").length
    ).toEqual(1);

    const backButton = baseElement.querySelectorAll<HTMLButtonElement>(
      "button.nz-toolbar-button-back"
    );
    expect(backButton.length).toEqual(1);

    UiFramework.frontstages.updateModalFrontstage();
    expect(changedEventSpy.calledTwice).toEqual(true);

    backButton[0].click();
    expect(navigationBackSpy.calledOnce).toEqual(true);
    expect(closeModalSpy.calledOnce).toEqual(true);

    UiFramework.frontstages.closeModalFrontstage();
    expect(changedEventSpy.calledThrice).toEqual(true);
    expect(closedEventSpy.calledOnce).toEqual(true);

    removeListener();
    removeListener2();
  });
});
