/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { Provider } from "react-redux";
import { UiFramework } from "../../appui-react";
import { ToolWidgetComposer } from "../../appui-react/widgets/ToolWidgetComposer";
import { BackstageAppButton } from "../../appui-react/widgets/BackstageAppButton";
import TestUtils, { childStructure, storageMock } from "../TestUtils";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";

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
    beforeEach(async () => {
      await TestUtils.initializeUiFramework();
      await NoRenderApp.startup();
    });

    afterEach(async () => {
      TestUtils.terminateUiFramework();
      await IModelApp.shutdown();
    });

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

    it("BackstageAppButtonProps should update with default icon", async () => {
      const { rerender } = render(<BackstageAppButton icon={"icon-test"} />);
      rerender(<BackstageAppButton />);
      expect(screen.getByRole("button")).to.satisfy(
        childStructure([
          ".uifw-app-button-small .icon:not(.icon-home).core-svg-icon",
          ".nz-bars .nz-bar + .nz-bar + .nz-bar",
        ])
      );
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
      expect(icon).not.to.be.null;
      fireEvent.click(button);
      spy.called.should.true;
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
      spy.called.should.true;
    });
  });
});
