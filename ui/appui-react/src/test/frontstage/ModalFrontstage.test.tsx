/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import type { ModalFrontstageInfo } from "../../appui-react.js";
import { ModalFrontstage, UiFramework } from "../../appui-react.js";

const navigationBackSpy = vi.fn();
const closeModalSpy = vi.fn();

function renderModalFrontstage(isOpen: boolean): React.ReactElement<any> {
  const activeModalFrontstage: ModalFrontstageInfo | undefined =
    UiFramework.frontstages.activeModalFrontstage;
  if (!activeModalFrontstage) {
    throw new Error();
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
  it("openModalFrontstage, updateModalFrontstage & closeModalFrontstage", () => {
    const modalFrontstage = new TestModalFrontstage();

    const changedEventSpy = vi.fn();
    const closedEventSpy = vi.fn();
    const removeListener =
      UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(
        changedEventSpy
      );
    const removeListener2 =
      UiFramework.frontstages.onModalFrontstageClosedEvent.addListener(
        closedEventSpy
      );

    UiFramework.frontstages.openModalFrontstage(modalFrontstage);
    expect(changedEventSpy).toHaveBeenCalledOnce();

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
    expect(changedEventSpy).toHaveBeenCalledTimes(2);

    backButton[0].click();
    expect(navigationBackSpy).toHaveBeenCalledOnce();
    expect(closeModalSpy).toHaveBeenCalledOnce();

    UiFramework.frontstages.closeModalFrontstage();
    expect(changedEventSpy).toHaveBeenCalledTimes(3);
    expect(closedEventSpy).toHaveBeenCalledOnce();

    removeListener();
    removeListener2();
  });
});
