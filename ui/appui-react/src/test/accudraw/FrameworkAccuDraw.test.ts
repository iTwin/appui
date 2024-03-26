/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { IModelAppOptions } from "@itwin/core-frontend";
import {
  BeButtonEvent,
  CompassMode,
  CurrentState,
  IModelApp,
  ItemField,
  NoRenderApp,
  RotationMode,
} from "@itwin/core-frontend";
import TestUtils, { storageMock } from "../TestUtils";
import { FrameworkAccuDraw } from "../../appui-react/accudraw/FrameworkAccuDraw";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";
import { UiFramework } from "../../appui-react/UiFramework";

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

  after(() => {
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  describe("FrameworkAccuDraw", () => {
    beforeEach(async () => {
      await TestUtils.initializeUiFramework();

      const opts: IModelAppOptions = {};
      opts.accuDraw = new FrameworkAccuDraw();
      await NoRenderApp.startup(opts);
    });

    afterEach(async () => {
      await IModelApp.shutdown();
      TestUtils.terminateUiFramework();
      beforeEach(async () => {
        const accuDraw = new FrameworkAccuDraw();
        vi.spyOn(IModelApp, "accuDraw").get(() => accuDraw);
      });

      it("FrameworkAccuDraw.displayNotifications should set & return correctly", () => {
        FrameworkAccuDraw.displayNotifications = false;
        expect(FrameworkAccuDraw.displayNotifications).to.be.false;
        FrameworkAccuDraw.displayNotifications = true;
        expect(FrameworkAccuDraw.displayNotifications).toEqual(true);
      });

      it("should call onCompassModeChange & emit onAccuDrawSetModeEvent & set conditionals", () => {
        FrameworkAccuDraw.displayNotifications = true;
        const spy = vi.fn();
        const spyMessage = vi.spyOn(IModelApp.notifications, "outputMessage");
        const remove =
          FrameworkAccuDraw.onAccuDrawSetCompassModeEvent.addListener(spy);

        IModelApp.accuDraw.setCompassMode(CompassMode.Polar);
        FrameworkAccuDraw.isPolarModeConditional.refresh();
        expect(
          ConditionalBooleanValue.getValue(
            FrameworkAccuDraw.isPolarModeConditional
          )
        ).toEqual(true);
        expect(spy).toHaveBeenCalledOnce();
        spyMessage.calledOnce.should.true;
        spyMessage.mockReset();

        IModelApp.accuDraw.setCompassMode(CompassMode.Rectangular);
        FrameworkAccuDraw.isRectangularModeConditional.refresh();
        expect(
          ConditionalBooleanValue.getValue(
            FrameworkAccuDraw.isRectangularModeConditional
          )
        ).toEqual(true);
        spy.calledTwice.should.true;
        spyMessage.calledOnce.should.true;
        spyMessage.mockReset();

        FrameworkAccuDraw.displayNotifications = false;
        IModelApp.accuDraw.setCompassMode(CompassMode.Polar);
        spyMessage.called.should.false;
        spyMessage.mockReset();

        remove();
      });

      it("should call onFieldLockChange & emit onAccuDrawSetFieldLockEvent", () => {
        const spy = vi.fn();
        const remove =
          FrameworkAccuDraw.onAccuDrawSetFieldLockEvent.addListener(spy);
        IModelApp.accuDraw.setFieldLock(ItemField.X_Item, true);
        expect(spy).toHaveBeenCalledOnce();
        spy.mockReset();
        IModelApp.accuDraw.setFieldLock(ItemField.Y_Item, true);
        expect(spy).toHaveBeenCalledOnce();
        spy.mockReset();
        IModelApp.accuDraw.setFieldLock(ItemField.Z_Item, true);
        expect(spy).toHaveBeenCalledOnce();
        spy.mockReset();
        IModelApp.accuDraw.setFieldLock(ItemField.ANGLE_Item, true);
        expect(spy).toHaveBeenCalledOnce();
        spy.mockReset();
        IModelApp.accuDraw.setFieldLock(ItemField.DIST_Item, true);
        expect(spy).toHaveBeenCalledOnce();
        spy.mockReset();
        remove();
      });

      it("should set rotation & conditionals correctly & notify", () => {
        FrameworkAccuDraw.displayNotifications = true;
        const spyMessage = vi.spyOn(IModelApp.notifications, "outputMessage");

        IModelApp.accuDraw.setRotationMode(RotationMode.Top);
        FrameworkAccuDraw.isTopRotationConditional.refresh();
        expect(
          ConditionalBooleanValue.getValue(
            FrameworkAccuDraw.isTopRotationConditional
          )
        ).toEqual(true);
        spyMessage.calledOnce.should.true;
        spyMessage.mockReset();
        IModelApp.accuDraw.setRotationMode(RotationMode.Front);
        FrameworkAccuDraw.isFrontRotationConditional.refresh();
        expect(
          ConditionalBooleanValue.getValue(
            FrameworkAccuDraw.isFrontRotationConditional
          )
        ).toEqual(true);
        spyMessage.calledOnce.should.true;
        spyMessage.mockReset();
        IModelApp.accuDraw.setRotationMode(RotationMode.Side);
        FrameworkAccuDraw.isSideRotationConditional.refresh();
        expect(
          ConditionalBooleanValue.getValue(
            FrameworkAccuDraw.isSideRotationConditional
          )
        ).toEqual(true);
        spyMessage.calledOnce.should.true;
        spyMessage.mockReset();
        IModelApp.accuDraw.setRotationMode(RotationMode.View);
        FrameworkAccuDraw.isViewRotationConditional.refresh();
        expect(
          ConditionalBooleanValue.getValue(
            FrameworkAccuDraw.isViewRotationConditional
          )
        ).toEqual(true);
        spyMessage.calledOnce.should.true;
        spyMessage.mockReset();
        IModelApp.accuDraw.setRotationMode(RotationMode.ACS);
        FrameworkAccuDraw.isACSRotationConditional.refresh();
        expect(
          ConditionalBooleanValue.getValue(
            FrameworkAccuDraw.isACSRotationConditional
          )
        ).toEqual(true);
        spyMessage.calledOnce.should.true;
        spyMessage.mockReset();
        IModelApp.accuDraw.setRotationMode(RotationMode.Context);
        FrameworkAccuDraw.isContextRotationConditional.refresh();
        expect(
          ConditionalBooleanValue.getValue(
            FrameworkAccuDraw.isContextRotationConditional
          )
        ).toEqual(true);
        spyMessage.calledOnce.should.true;
        spyMessage.mockReset();

        FrameworkAccuDraw.displayNotifications = false;
        IModelApp.accuDraw.setRotationMode(RotationMode.Top);
        spyMessage.calledOnce.should.false;
        spyMessage.mockReset();
      });

      it("should call onFieldValueChange & emit onAccuDrawSetFieldValueToUiEvent", () => {
        const spy = vi.fn();
        const remove =
          FrameworkAccuDraw.onAccuDrawSetFieldValueToUiEvent.addListener(spy);
        IModelApp.accuDraw.setValueByIndex(ItemField.X_Item, 1.0);
        IModelApp.accuDraw.onFieldValueChange(ItemField.X_Item);
        expect(spy).toHaveBeenCalledOnce();
        remove();
      });

      it("should emit onAccuDrawSetFieldFocusEvent", () => {
        const spy = vi.fn();
        const remove =
          FrameworkAccuDraw.onAccuDrawSetFieldFocusEvent.addListener(spy);
        IModelApp.accuDraw.setFocusItem(ItemField.X_Item);
        expect(spy).toHaveBeenCalledOnce();
        remove();
      });

      it("should emit onAccuDrawGrabInputFocusEvent", () => {
        const spy = vi.fn();
        const remove =
          FrameworkAccuDraw.onAccuDrawGrabInputFocusEvent.addListener(spy);
        IModelApp.accuDraw.grabInputFocus();
        expect(spy).toHaveBeenCalledOnce();
        remove();
      });

      it("hasInputFocus should return false", () => {
        expect(IModelApp.accuDraw.hasInputFocus).to.be.false;
      });

      it("should emit onAccuDrawSetFieldValueToUiEvent & onAccuDrawSetFieldFocusEvent", () => {
        const spyValue = vi.fn();
        const remove =
          FrameworkAccuDraw.onAccuDrawSetFieldValueToUiEvent.addListener(
            spyValue
          );
        const spyFocus = vi.fn();
        const removeFocusSpy =
          FrameworkAccuDraw.onAccuDrawSetFieldFocusEvent.addListener(spyFocus);

        IModelApp.accuDraw.currentState = CurrentState.Deactivated;
        IModelApp.accuDraw.onMotion(new BeButtonEvent());
        spyValue.called.should.false;
        spyValue.mockReset();

        IModelApp.accuDraw.currentState = CurrentState.Active;
        IModelApp.accuDraw.onMotion(new BeButtonEvent());
        spyValue.called.should.true;
        spyFocus.called.should.true;
        spyValue.mockReset();
        spyFocus.mockReset();

        IModelApp.accuDraw.dontMoveFocus = true;
        IModelApp.accuDraw.onMotion(new BeButtonEvent());
        spyValue.called.should.true;
        spyFocus.called.should.false;

        remove();
        removeFocusSpy();
      });

      it("should save/retrieve displayNotifications to/from user storage", async () => {
        FrameworkAccuDraw.displayNotifications = true;
        await TestUtils.flushAsyncOperations();
        expect(FrameworkAccuDraw.displayNotifications).toEqual(true);
        FrameworkAccuDraw.displayNotifications = false;
        await TestUtils.flushAsyncOperations();
        expect(FrameworkAccuDraw.displayNotifications).to.be.false;

        const instance = new FrameworkAccuDraw();
        await instance.loadUserSettings(UiFramework.getUiStateStorage());
        await TestUtils.flushAsyncOperations();
        expect(FrameworkAccuDraw.displayNotifications).to.be.false;
      });
    });
  });
});
