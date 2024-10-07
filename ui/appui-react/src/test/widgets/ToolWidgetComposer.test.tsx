/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { UiFramework } from "../../appui-react.js";
import { ToolWidgetComposer } from "../../appui-react/widgets/ToolWidgetComposer.js";
import { BackstageAppButton } from "../../appui-react/widgets/BackstageAppButton.js";
import TestUtils, { childStructure, storageMock } from "../TestUtils.js";

describe("FrameworkAccuDraw localStorage Wrapper", () => {
  const localStorageToRestore = Object.getOwnPropertyDescriptor(
    window,
    "localStorage"
  )!;
  const localStorageMock = storageMock();

  beforeEach(async () => {
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  describe("ToolWidgetComposer", () => {
    it("ToolWidgetComposer should render correctly", () => {
      const { container } = render(<ToolWidgetComposer />);

      expect(container).to.satisfy(
        childStructure([
          ".nz-tools-widget .nz-app-button",
          ".nz-tools-widget .nz-vertical-toolbar-container",
          ".nz-tools-widget .nz-horizontal-toolbar-container",
        ])
      );
    });

    it("ToolWidgetComposer with should render", () => {
      const { container } = render(
        <ToolWidgetComposer
          cornerItem={<BackstageAppButton icon="icon-test" />}
        />
      );
      expect(container).to.satisfy(
        childStructure([".nz-tools-widget .nz-app-button .icon-test"])
      );
    });

    it("BackstageAppButtonProps should render", () => {
      const { rerender } = render(<BackstageAppButton icon={"icon-home"} />);
      expect(screen.getByRole("button")).to.satisfy(
        childStructure([
          ".uifw-app-button-small .icon.icon-home",
          ".nz-bars .nz-bar + .nz-bar + .nz-bar",
        ])
      );

      rerender(<BackstageAppButton icon={"icon-bentley"} />);
      expect(screen.getByRole("button")).to.satisfy(
        childStructure([
          ".uifw-app-button-small .icon.icon-bentley",
          ".nz-bars .nz-bar + .nz-bar + .nz-bar",
        ])
      );
    });

    it("BackstageAppButtonProps should render specified icon", async () => {
      render(<BackstageAppButton iconNode="icon-test" />);
      screen.getByText("icon-test");
    });

    it("BackstageAppButton should execute on click", () => {
      const spy = vi.fn();
      const component = render(
        <Provider store={TestUtils.store}>
          <BackstageAppButton icon={"icon-test"} execute={spy} label="Hello" />
        </Provider>
      );
      const button = component.getByTitle("Hello");
      const icon = component.container.querySelector("i.icon.icon-test");
      expect(icon).toBeTruthy();
      fireEvent.click(button);
      expect(spy).toHaveBeenCalled();
    });

    it("BackstageAppButton should render with defaults", () => {
      const spy = vi.spyOn(UiFramework.backstage, "toggle");
      const component = render(
        <Provider store={TestUtils.store}>
          <BackstageAppButton />
        </Provider>
      );
      const button = component.container.querySelector("button");
      fireEvent.click(button!);
      expect(spy).toHaveBeenCalled();
    });
  });
});
