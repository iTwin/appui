/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from "chai";
import * as sinon from "sinon";
import * as React from "react";
import { Key } from "ts-key-enum";
import { ColorByName, ColorDef } from "@itwin/core-common";
import type { IModelAppOptions } from "@itwin/core-frontend";
import {
  CompassMode,
  IModelApp,
  ItemField,
  NoRenderApp,
} from "@itwin/core-frontend";
import { Orientation } from "@itwin/core-react";
import TestUtils, { selectAllBeforeType, userEvent } from "../TestUtils";
import { FrameworkAccuDraw } from "../../appui-react/accudraw/FrameworkAccuDraw";
import { AccuDrawFieldContainer } from "../../appui-react/accudraw/AccuDrawFieldContainer";
import { FrameworkUiAdmin } from "../../appui-react/uiadmin/FrameworkUiAdmin";
import type { AccuDrawUiSettings } from "../../appui-react/accudraw/AccuDrawUiSettings";
import { UiFramework } from "../../appui-react";

// cspell:ignore uiadmin

function requestNextAnimation() {}

describe("AccuDrawFieldContainer", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });
  const rnaDescriptorToRestore = Object.getOwnPropertyDescriptor(
    IModelApp,
    "requestNextAnimation"
  )!;

  before(async () => {
    // Avoid requestAnimationFrame exception during test by temporarily replacing function that calls it.
    // Tried replacing window.requestAnimationFrame first but that did not work.
    Object.defineProperty(IModelApp, "requestNextAnimation", {
      get: () => requestNextAnimation,
    });

    await TestUtils.initializeUiFramework();

    const opts: IModelAppOptions = {};
    opts.accuDraw = new FrameworkAccuDraw();
    opts.uiAdmin = new FrameworkUiAdmin();
    await NoRenderApp.startup(opts);
  });

  after(async () => {
    await IModelApp.shutdown();

    Object.defineProperty(
      IModelApp,
      "requestNextAnimation",
      rnaDescriptorToRestore
    );

    TestUtils.terminateUiFramework();
  });

  it("should render Vertical", () => {
    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
    render(<AccuDrawFieldContainer orientation={Orientation.Vertical} />);
  });

  it("should render Horizontal", () => {
    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
    render(<AccuDrawFieldContainer orientation={Orientation.Horizontal} />);
  });

  it("should emit onAccuDrawSetFieldValueToUiEvent", () => {
    const spy = sinon.spy();
    const remove =
      FrameworkAccuDraw.onAccuDrawSetFieldValueToUiEvent.addListener(spy);
    render(<AccuDrawFieldContainer orientation={Orientation.Vertical} />);
    IModelApp.accuDraw.setFocusItem(ItemField.X_Item);
    IModelApp.accuDraw.onFieldValueChange(ItemField.X_Item);
    spy.calledOnce.should.true;
    spy.resetHistory();
    IModelApp.accuDraw.onFieldValueChange(ItemField.Y_Item);
    spy.calledOnce.should.true;
    spy.resetHistory();
    IModelApp.accuDraw.onFieldValueChange(ItemField.Z_Item);
    spy.calledOnce.should.true;
    spy.resetHistory();
    IModelApp.accuDraw.onFieldValueChange(ItemField.ANGLE_Item);
    spy.calledOnce.should.true;
    spy.resetHistory();
    IModelApp.accuDraw.onFieldValueChange(ItemField.DIST_Item);
    spy.calledOnce.should.true;
    spy.resetHistory();
    remove();
  });

  it("should emit onAccuDrawSetFieldLockEvent", () => {
    const spy = sinon.spy();
    const remove =
      FrameworkAccuDraw.onAccuDrawSetFieldLockEvent.addListener(spy);
    render(<AccuDrawFieldContainer orientation={Orientation.Vertical} />);
    IModelApp.accuDraw.setFieldLock(ItemField.X_Item, true);
    spy.calledOnce.should.true;
    spy.resetHistory();
    IModelApp.accuDraw.setFieldLock(ItemField.Y_Item, true);
    spy.calledOnce.should.true;
    spy.resetHistory();
    IModelApp.accuDraw.setFieldLock(ItemField.Z_Item, true);
    spy.calledOnce.should.true;
    spy.resetHistory();
    IModelApp.accuDraw.setFieldLock(ItemField.ANGLE_Item, true);
    spy.calledOnce.should.true;
    spy.resetHistory();
    IModelApp.accuDraw.setFieldLock(ItemField.DIST_Item, true);
    spy.calledOnce.should.true;
    spy.resetHistory();
    remove();
  });

  it("should emit onAccuDrawSetFieldFocusEvent", async () => {
    const spy = sinon.spy();
    const remove =
      FrameworkAccuDraw.onAccuDrawSetFieldFocusEvent.addListener(spy);
    const wrapper = render(
      <AccuDrawFieldContainer orientation={Orientation.Vertical} />
    );
    expect(IModelApp.accuDraw.hasInputFocus).to.be.false;

    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
    await TestUtils.flushAsyncOperations();

    IModelApp.accuDraw.setFocusItem(ItemField.X_Item);
    spy.calledOnce.should.true;
    let input = wrapper.queryByTestId("uifw-accudraw-x");
    expect(input).not.to.be.null;
    expect(document.activeElement === input).to.be.true;
    spy.resetHistory();

    IModelApp.accuDraw.setFocusItem(ItemField.Y_Item);
    spy.calledOnce.should.true;
    input = wrapper.queryByTestId("uifw-accudraw-y");
    expect(input).not.to.be.null;
    expect(document.activeElement === input).to.be.true;
    spy.resetHistory();

    input = wrapper.queryByTestId("uifw-accudraw-z");
    expect(input).to.be.null;

    IModelApp.accuDraw.setCompassMode(CompassMode.Polar);
    await TestUtils.flushAsyncOperations();

    IModelApp.accuDraw.setFocusItem(ItemField.ANGLE_Item);
    spy.calledOnce.should.true;
    input = wrapper.queryByTestId("uifw-accudraw-angle");
    expect(input).not.to.be.null;
    expect(document.activeElement === input).to.be.true;
    spy.resetHistory();

    IModelApp.accuDraw.setFocusItem(ItemField.DIST_Item);
    spy.calledOnce.should.true;
    input = wrapper.queryByTestId("uifw-accudraw-distance");
    expect(input).not.to.be.null;
    expect(document.activeElement === input).to.be.true;
    spy.resetHistory();

    await TestUtils.flushAsyncOperations();
    expect(IModelApp.accuDraw.hasInputFocus).to.be.true;

    remove();
  });

  it("should emit onAccuDrawSetFieldFocusEvent and show Z field", async () => {
    const spy = sinon.spy();
    const remove =
      FrameworkAccuDraw.onAccuDrawSetFieldFocusEvent.addListener(spy);
    render(
      <AccuDrawFieldContainer
        orientation={Orientation.Vertical}
        showZOverride={true}
      />
    );
    expect(IModelApp.accuDraw.hasInputFocus).to.be.false;

    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);

    await waitFor(() => {
      screen.getByTestId("uifw-accudraw-z");
    });

    IModelApp.accuDraw.setFocusItem(ItemField.Z_Item);
    spy.calledOnce.should.true;
    await TestUtils.flushAsyncOperations();
    expect(document.activeElement).to.eq(screen.getByTestId("uifw-accudraw-z"));
    spy.resetHistory();

    expect(IModelApp.accuDraw.hasInputFocus).to.be.true;

    remove();
  });

  it("should emit onAccuDrawGrabFieldFocusEvent", async () => {
    const spySet = sinon.spy();
    const removeSet =
      FrameworkAccuDraw.onAccuDrawSetFieldFocusEvent.addListener(spySet);
    const wrapper = render(
      <AccuDrawFieldContainer orientation={Orientation.Vertical} />
    );
    expect(IModelApp.accuDraw.hasInputFocus).to.be.false;

    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
    await TestUtils.flushAsyncOperations();

    IModelApp.accuDraw.setFocusItem(ItemField.X_Item);
    spySet.calledOnce.should.true;
    const input = wrapper.queryByTestId("uifw-accudraw-x");
    expect(input).not.to.be.null;
    expect(document.activeElement === input).to.be.true;

    UiFramework.keyboardShortcuts.setFocusToHome();
    expect(document.activeElement === input).to.be.false;

    const spyGrab = sinon.spy();
    const removeGrab =
      FrameworkAccuDraw.onAccuDrawGrabInputFocusEvent.addListener(spyGrab);
    IModelApp.accuDraw.grabInputFocus();
    spyGrab.calledOnce.should.true;
    expect(document.activeElement === input).to.be.true;

    removeSet();
    removeGrab();
  });

  it("should emit onAccuDrawSetModeEvent", () => {
    const spy = sinon.spy();
    const remove =
      FrameworkAccuDraw.onAccuDrawSetCompassModeEvent.addListener(spy);
    render(<AccuDrawFieldContainer orientation={Orientation.Vertical} />);
    IModelApp.accuDraw.setCompassMode(CompassMode.Polar);
    spy.calledOnce.should.true;
    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
    spy.calledTwice.should.true;
    remove();
  });

  it("should call onValueChanged & setFieldValueFromUi", async () => {
    const spy = sinon.spy();
    const remove =
      FrameworkAccuDraw.onAccuDrawSetFieldValueFromUiEvent.addListener(spy);
    render(<AccuDrawFieldContainer orientation={Orientation.Vertical} />);

    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);

    await theUserTo.type(
      screen.getByTestId("uifw-accudraw-x"),
      "22.3",
      selectAllBeforeType()
    );
    await waitFor(() => {
      spy.calledOnce.should.true;
    });
    spy.resetHistory();

    await theUserTo.type(
      screen.getByTestId("uifw-accudraw-y"),
      "22.3",
      selectAllBeforeType()
    );
    await waitFor(() => {
      spy.calledOnce.should.true;
    });
    spy.resetHistory();

    expect(screen.queryByTestId("uifw-accudraw-z")).to.be.null;

    IModelApp.accuDraw.setCompassMode(CompassMode.Polar);

    await waitFor(async () => {
      await theUserTo.type(
        screen.getByTestId("uifw-accudraw-angle"),
        "22.3",
        selectAllBeforeType()
      );
    });
    await waitFor(() => {
      spy.calledOnce.should.true;
    });
    spy.resetHistory();

    await theUserTo.type(
      screen.getByTestId("uifw-accudraw-distance"),
      "22.3",
      selectAllBeforeType()
    );
    await waitFor(() => {
      spy.calledOnce.should.true;
    });
    spy.resetHistory();

    remove();
  });

  it("should call onValueChanged & setFieldValueFromUi & show the Z field", async () => {
    const spy = sinon.spy();
    const remove =
      FrameworkAccuDraw.onAccuDrawSetFieldValueFromUiEvent.addListener(spy);
    render(
      <AccuDrawFieldContainer
        orientation={Orientation.Vertical}
        showZOverride={true}
      />
    );

    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);

    await waitFor(async () => {
      await theUserTo.type(
        screen.getByTestId("uifw-accudraw-z"),
        "22.3",
        selectAllBeforeType()
      );
    });
    await waitFor(() => {
      spy.calledOnce.should.true;
    });

    remove();
  });

  it("should set focus to home on Esc", () => {
    const spy = sinon.spy(UiFramework.keyboardShortcuts, "setFocusToHome");
    const wrapper = render(
      <AccuDrawFieldContainer orientation={Orientation.Vertical} />
    );

    IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);

    const input = wrapper.queryByTestId("uifw-accudraw-x");
    expect(input).not.to.be.null;
    fireEvent.keyDown(input!, { key: Key.Escape });
    spy.calledOnce.should.true;

    (UiFramework.keyboardShortcuts.setFocusToHome as any).restore();
  });

  describe("FrameworkAccuDraw.uiStateStorage", () => {
    const bgColorTest = ColorByName.red;
    const fgColorTest = ColorByName.black;
    const labelTest = "label-test";
    const iconTest = "icon-test";

    const fullSettings: AccuDrawUiSettings = {
      xStyle: { display: "inline" },
      yStyle: { display: "inline" },
      zStyle: { display: "inline" },
      angleStyle: { display: "inline" },
      distanceStyle: { display: "inline" },
      xBackgroundColor: ColorDef.create(bgColorTest),
      yBackgroundColor: ColorDef.create(bgColorTest),
      zBackgroundColor: ColorDef.create(bgColorTest),
      angleBackgroundColor: ColorDef.create(bgColorTest),
      distanceBackgroundColor: ColorDef.create(bgColorTest),
      xForegroundColor: ColorDef.create(fgColorTest),
      yForegroundColor: ColorDef.create(fgColorTest),
      zForegroundColor: ColorDef.create(fgColorTest),
      angleForegroundColor: ColorDef.create(fgColorTest),
      distanceForegroundColor: ColorDef.create(fgColorTest),
      xLabel: labelTest,
      yLabel: labelTest,
      zLabel: labelTest,
      angleLabel: labelTest,
      distanceLabel: labelTest,
      xIcon: iconTest,
      yIcon: iconTest,
      zIcon: iconTest,
      angleIcon: iconTest,
      distanceIcon: iconTest,
    };

    it("should support FrameworkAccuDraw.uiStateStorage- set after render", async () => {
      const emptySettings: AccuDrawUiSettings = {};

      const spy = sinon.spy();
      FrameworkAccuDraw.uiStateStorage = undefined;
      const remove =
        FrameworkAccuDraw.onAccuDrawUiSettingsChangedEvent.addListener(spy);
      const wrapper = render(
        <AccuDrawFieldContainer
          orientation={Orientation.Vertical}
          showZOverride={true}
        />
      );

      const settingsTest = async (count: number) => {
        spy.calledOnce.should.true;

        let labelElements = wrapper.queryAllByLabelText(labelTest);
        await waitFor(() => {
          expect(labelElements.length).to.eq(count);
        });

        const inputElements = wrapper.container.querySelectorAll("input");
        expect(inputElements.length).to.eq(count);
        for (const inputElement of inputElements) {
          expect(inputElement.getAttribute("style")).to.eq(
            "display: inline; background-color: rgb(255, 0, 0); color: rgb(0, 0, 0);"
          );
        }

        const iElements = wrapper.container.querySelectorAll(`i.${iconTest}`);
        expect(iElements.length).to.eq(count);

        FrameworkAccuDraw.uiStateStorage = emptySettings;
        spy.calledTwice.should.true;
        await waitFor(() => {
          labelElements = wrapper.queryAllByLabelText(labelTest);
          expect(labelElements.length).to.eq(0);
        });

        FrameworkAccuDraw.uiStateStorage = undefined;
        spy.calledThrice.should.true;
        labelElements = wrapper.queryAllByLabelText(labelTest);
        expect(labelElements.length).to.eq(0);
      };

      IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
      expect(wrapper.queryAllByLabelText(labelTest).length).to.eq(0);
      FrameworkAccuDraw.uiStateStorage = fullSettings;
      await TestUtils.flushAsyncOperations();
      await settingsTest(3);

      spy.resetHistory();

      IModelApp.accuDraw.setCompassMode(CompassMode.Polar);
      expect(wrapper.queryAllByLabelText(labelTest).length).to.eq(0);
      FrameworkAccuDraw.uiStateStorage = fullSettings;
      await TestUtils.flushAsyncOperations();
      await settingsTest(2);

      remove();
    });

    it("should support FrameworkAccuDraw.uiStateStorage - set before render", async () => {
      const spy = sinon.spy();
      FrameworkAccuDraw.uiStateStorage = fullSettings;
      const remove =
        FrameworkAccuDraw.onAccuDrawUiSettingsChangedEvent.addListener(spy);
      const wrapper = render(
        <AccuDrawFieldContainer
          orientation={Orientation.Vertical}
          showZOverride={true}
        />
      );

      const settingsTest = async (count: number) => {
        const labelElements = wrapper.queryAllByLabelText(labelTest);
        await waitFor(() => {
          expect(labelElements.length).to.eq(count);
        });

        const inputElements = wrapper.container.querySelectorAll("input");
        expect(inputElements.length).to.eq(count);
        for (const inputElement of inputElements) {
          expect(inputElement.getAttribute("style")).to.eq(
            "display: inline; background-color: rgb(255, 0, 0); color: rgb(0, 0, 0);"
          );
        }

        const iElements = wrapper.container.querySelectorAll(`i.${iconTest}`);
        expect(iElements.length).to.eq(count);
      };

      IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
      await TestUtils.flushAsyncOperations();
      await settingsTest(3);

      IModelApp.accuDraw.setCompassMode(CompassMode.Polar);
      await TestUtils.flushAsyncOperations();
      await settingsTest(2);

      remove();
    });

    it("should support FrameworkAccuDraw.uiStateStorage with various color combinations", async () => {
      const backgroundSettings: AccuDrawUiSettings = {
        xBackgroundColor: ColorDef.create(bgColorTest),
      };

      const foregroundSettings: AccuDrawUiSettings = {
        xForegroundColor: ColorDef.create(fgColorTest),
      };

      const bgStringSettings: AccuDrawUiSettings = {
        xBackgroundColor: "rgba(255, 0, 0, 0.5)",
      };

      const fgStringSettings: AccuDrawUiSettings = {
        xForegroundColor: "rgba(0, 0, 255, 0.5)",
      };

      const wrapper = render(
        <AccuDrawFieldContainer
          orientation={Orientation.Vertical}
          showZOverride={true}
        />
      );
      IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);

      FrameworkAccuDraw.uiStateStorage = backgroundSettings;
      await TestUtils.flushAsyncOperations();
      let input = wrapper.queryByTestId("uifw-accudraw-x");
      expect(input).not.to.be.null;
      expect(input!.getAttribute("style")).to.eq(
        "background-color: rgb(255, 0, 0);"
      );

      FrameworkAccuDraw.uiStateStorage = foregroundSettings;
      await TestUtils.flushAsyncOperations();
      input = wrapper.queryByTestId("uifw-accudraw-x");
      expect(input).not.to.be.null;
      expect(input!.getAttribute("style")).to.eq("color: rgb(0, 0, 0);");

      FrameworkAccuDraw.uiStateStorage = bgStringSettings;
      await TestUtils.flushAsyncOperations();
      input = wrapper.queryByTestId("uifw-accudraw-x");
      expect(input).not.to.be.null;
      expect(input!.getAttribute("style")).to.eq(
        "background-color: rgba(255, 0, 0, 0.5);"
      );

      FrameworkAccuDraw.uiStateStorage = fgStringSettings;
      await TestUtils.flushAsyncOperations();
      input = wrapper.queryByTestId("uifw-accudraw-x");
      expect(input).not.to.be.null;
      expect(input!.getAttribute("style")).to.eq(
        "color: rgba(0, 0, 255, 0.5);"
      );
    });
  });
});
