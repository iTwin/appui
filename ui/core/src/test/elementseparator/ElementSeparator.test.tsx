/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { mount } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { ElementSeparator, RatioChangeResult } from "../../ui-core/elementseparator/ElementSeparator";
import { Orientation } from "../../ui-core/enums/Orientation";

describe("ElementSeparator", () => {
  let clock: sinon.SinonFakeTimers;
  before(() => {
    clock = sinon.useFakeTimers({ now: Date.now() });
  });

  after(() => {
    clock.restore();
  });

  const throttleMs = 16;
  function moveElement(moveAmount: { clientX: number } | { clientY: number }, moveDelayMs: number = throttleMs) {
    document.dispatchEvent(new MouseEvent("pointermove", moveAmount));
    clock.tick(moveDelayMs);
  }

  type UncontrolledRatioCallback = sinon.SinonSpy<[number], void>;
  type ControlledRatioCallback = sinon.SinonSpy<[number], RatioChangeResult>;
  type TestRatioCallbackTypes = { onRatioChanged: UncontrolledRatioCallback } | { onRatioChanged: ControlledRatioCallback };

  enum TestCallbackType {
    Uncontrolled,
    Controlled,
  }

  function setupElementSeparatorCallbackIndifferentTests(callbackType: TestCallbackType) {
    const testCaseName = TestCallbackType[callbackType];
    describe(`Callback indifferent tests: ${testCaseName}`, () => {
      let props: TestRatioCallbackTypes;
      let onRatioChanged: UncontrolledRatioCallback | ControlledRatioCallback;

      beforeEach(() => {
        switch (callbackType) {
          case TestCallbackType.Uncontrolled:
            onRatioChanged = sinon.spy((_: number) => { return; });
            props = { onRatioChanged };
            return;
          case TestCallbackType.Controlled:
            onRatioChanged = sinon.spy((ratio: number) => ({ ratio }));
            props = { onRatioChanged };
            return;
          default:
            const unhandledType: never = callbackType;
            throw new Error(`Unhandled test type: ${unhandledType}`);
        }
      });

      it("calls onRatioChanged when it gets dragged horizontally", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerdown", { clientX: 50 });
        moveElement({ clientX: 70 });

        expect(onRatioChanged.callCount).to.be.equal(1);
        expect(onRatioChanged.calledWith(0.7), "Called with wrong argument").to.be.true;
      });

      it("calls onRatioChanged when it gets dragged vertically", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Vertical}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerdown", { clientY: 50 });
        moveElement({ clientY: 70 });

        expect(onRatioChanged.callCount).to.be.equal(1);
        expect(onRatioChanged.calledWith(0.7), "Called with wrong argument").to.be.true;
      });

      it("calls onRatioChanged when it gets dragged 1px", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerdown", { clientX: 50 });
        moveElement({ clientX: 51 });

        expect(onRatioChanged.callCount).to.be.equal(1);
      });

      it("calls onRatioChanged only once when moved multiple times in the same throttle frame", async () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerdown", { clientX: 50 });
        moveElement({ clientX: 60 }, 1);
        moveElement({ clientX: 80 }, 1);

        clock.tick(throttleMs);

        expect(onRatioChanged.callCount).to.be.equal(1);
        expect(onRatioChanged.calledWith(0.8)).to.be.true;

      });

      it("stops calling onRatioChanged when dragging stops", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerdown", { clientX: 50 });
        moveElement({ clientX: 70 });

        expect(onRatioChanged.callCount).to.be.equal(1);

        document.dispatchEvent(new MouseEvent("pointerup"));
        moveElement({ clientX: 90 });

        expect(onRatioChanged.callCount, "Called when dragging stopped").to.be.equal(1);
      });

      it("does not call onRatioChanged when dragging without movableArea set", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerdown", { clientX: 50 });
        moveElement({ clientX: 70 });

        expect(onRatioChanged.callCount).to.be.equal(0);
      });

      it("stops calling onRatioChanged when pointerdown event happens while still dragging", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerdown", { clientX: 50 });
        moveElement({ clientX: 70 });

        expect(onRatioChanged.callCount).to.be.equal(1);

        elementSeparator.simulate("pointerdown", { clientY: 70 });
        moveElement({ clientX: 90 });

        expect(onRatioChanged.callCount, "Called when dragging stopped").to.be.equal(1);
      });

      it("should not have hover classes when element created", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Found hover class on freshly created element").to.be.equal(0);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Found unhover class on freshly created element").to.be.equal(0);
      });

      it("should have hover class when pointer enters element", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerover");

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Did not find hover class on hovered element").to.be.equal(1);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Found unhover class on hovered element").to.be.equal(0);
      });

      it("should have unhover class when pointer leaves element", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerover");
        elementSeparator.simulate("pointerout");

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Did not find hover class on hovered element").to.be.equal(0);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Found unhover class on hovered element").to.be.equal(1);
      });

      it("should call onResizeHandleHoverChanged when pointer enters or leaves", () => {
        const onHoverChanged = sinon.spy();

        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            onResizeHandleHoverChanged={onHoverChanged}
            {...props}
          />);

        elementSeparator.simulate("pointerover");
        expect(onHoverChanged.calledOnce, "Was not called on pointer enter").to.be.true;

        elementSeparator.simulate("pointerout");
        expect(onHoverChanged.calledTwice, "Was not called on pointer leave").to.be.true;
      });

      it("should call isResizeHandleBeingDragged when pointer down or up", () => {
        const onDragChanged = sinon.spy();

        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            onResizeHandleDragChanged={onDragChanged}
            {...props}
          />);

        elementSeparator.simulate("pointerdown");
        expect(onDragChanged.callCount, "Was not called on pointer down").to.be.equal(1);

        document.dispatchEvent(new MouseEvent("pointerup"));
        expect(onDragChanged.callCount, "Was not called on pointer up").to.be.equal(2);
      });

      it("should have hover class when pointer down", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerdown");

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Did not find hover class on hovered element").to.be.equal(1);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Found unhover class on hovered element").to.be.equal(0);
      });

      it("should have unhover class when pointer up", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            {...props}
          />);

        elementSeparator.simulate("pointerdown");
        document.dispatchEvent(new MouseEvent("pointerup"));

        elementSeparator.mount();

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Found hover class on unhovered element").to.be.equal(0);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Did not find unhover class on unhovered element").to.be.equal(1);
      });

      it("should have hover class when group is hovered", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            isResizeHandleHovered={true}
            {...props}
          />);

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Did not find hover class on hovered element").to.be.equal(1);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Found unhover class on hovered element").to.be.equal(0);
      });

      it("should have no class when group is not hovered and element has not been hovered or dragged once", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            isResizeHandleHovered={false}
            {...props}
          />);

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Found hover class on unhovered element").to.be.equal(0);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Found unhover class on never hovered element").to.be.equal(0);
      });

      it("should have unhovered class when group is not hovered and element has been hovered or dragged", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            isResizeHandleHovered={false}
            {...props}
          />);

        elementSeparator.setProps({ isResizeHandleHovered: true });
        elementSeparator.setProps({ isResizeHandleHovered: false });

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Found hover class on unhovered element").to.be.equal(0);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Did not find unhover class on unhovered element").to.be.equal(1);
      });

      it("should have hover class when group is dragged", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            isResizeHandleBeingDragged={true}
            {...props}
          />);

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Did not find hover class on hovered element").to.be.equal(1);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Found unhover class on hovered element").to.be.equal(0);
      });

      it("should have no class when group is not dragged and element has not been hovered or dragged once", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            isResizeHandleBeingDragged={false}
            {...props}
          />);

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Found hover class on unhovered element").to.be.equal(0);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Found unhover class on never hovered element").to.be.equal(0);
      });

      it("should have unhovered class when group is not dragged and element has been hovered or dragged", () => {
        const elementSeparator = mount(
          <ElementSeparator
            orientation={Orientation.Horizontal}
            movableArea={100}
            ratio={0.5}
            isResizeHandleBeingDragged={false}
            {...props}
          />);

        elementSeparator.setProps({ isResizeHandleBeingDragged: true });
        elementSeparator.setProps({ isResizeHandleBeingDragged: false });

        expect(elementSeparator.find(".core-element-separator-group-hovered").length, "Found hover class on unhovered element").to.be.equal(0);
        expect(elementSeparator.find(".core-element-separator-group-unhovered").length, "Did not find unhover class on unhovered element").to.be.equal(1);
      });
    });
  }

  setupElementSeparatorCallbackIndifferentTests(TestCallbackType.Controlled);
  setupElementSeparatorCallbackIndifferentTests(TestCallbackType.Uncontrolled);

  it("should update ratio if update is not needed but element hovered", () => {
    const onRatioChanged = sinon.spy();

    const elementSeparator = mount(
      <ElementSeparator
        orientation={Orientation.Horizontal}
        movableArea={100}
        onRatioChanged={onRatioChanged}
        ratio={0.5}
      />);

    elementSeparator.simulate("pointerover");
    elementSeparator.simulate("pointerdown", { clientX: 50 });
    moveElement({ clientX: 70 });
    elementSeparator.mount();

    expect(onRatioChanged.callCount).to.be.equal(1);

    moveElement({ clientX: 90 });
    expect(onRatioChanged.callCount).to.be.equal(2);
  });

  it("should update ratio if update is needed but element not hovered", () => {
    const onRatioChanged = sinon.spy((ratio: number) => ({ ratio }));

    const elementSeparator = mount(
      <ElementSeparator
        orientation={Orientation.Horizontal}
        movableArea={100}
        onRatioChanged={onRatioChanged}
        ratio={0.5}
      />);

    elementSeparator.simulate("pointerdown", { clientX: 50 });
    moveElement({ clientX: 70 });
    expect(onRatioChanged.callCount).to.be.equal(1);

    moveElement({ clientX: 90 });
    expect(onRatioChanged.callCount).to.be.equal(2);
  });

  it("should update ratio if update is needed and element is hovered", () => {
    const onRatioChanged = sinon.spy((ratio: number) => ({ ratio }));

    const elementSeparator = mount(
      <ElementSeparator
        orientation={Orientation.Horizontal}
        movableArea={100}
        onRatioChanged={onRatioChanged}
        ratio={0.5}
      />);

    elementSeparator.simulate("pointerover");
    elementSeparator.simulate("pointerdown", { clientX: 50 });
    moveElement({ clientX: 70 });
    expect(onRatioChanged.callCount).to.be.equal(1);

    moveElement({ clientX: 90 });
    expect(onRatioChanged.callCount).to.be.equal(2);
  });

  it("should not update ratio if update is not needed and element is not hovered (draggable area left)", () => {
    const onRatioChanged = sinon.spy();

    const elementSeparator = mount(
      <ElementSeparator
        orientation={Orientation.Horizontal}
        movableArea={100}
        onRatioChanged={onRatioChanged}
        ratio={0.5}
      />);

    elementSeparator.simulate("pointerdown", { clientX: 50 });
    moveElement({ clientX: 70 });
    expect(onRatioChanged.callCount, "First ratio change should always be called").to.be.equal(1);

    moveElement({ clientX: 90 });
    expect(onRatioChanged.callCount, "Called ratio change when it was not hovered and update was not needed").to.be.equal(1);
  });

  it("should start updating on hover after leaving draggable area", () => {
    const onRatioChanged = sinon.spy();

    const elementSeparator = mount(
      <ElementSeparator
        orientation={Orientation.Horizontal}
        movableArea={100}
        onRatioChanged={onRatioChanged}
        ratio={0.5}
      />);

    elementSeparator.simulate("pointerdown", { clientX: 50 });
    moveElement({ clientX: 70 });
    expect(onRatioChanged.callCount, "First ratio change should always be called").to.be.equal(1);

    moveElement({ clientX: 90 });
    expect(onRatioChanged.callCount, "Called ratio change when it was not hovered and update was not needed").to.be.equal(1);

    elementSeparator.simulate("pointerover");
    moveElement({ clientX: 40 });
    expect(onRatioChanged.callCount, "Ratio change should be called again after pointer is hovering").to.be.equal(2);
  });
});
