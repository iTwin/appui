/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import sinon from "sinon";
import * as React from "react";
import type {
  BasePropertyEditorParams,
  SliderEditorParams,
} from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  StandardEditorNames,
} from "@itwin/appui-abstract";
import { SliderEditor } from "../../components-react/editors/SliderEditor";
import TestUtils, { MineDataController, userEvent } from "../TestUtils";
import { EditorContainer } from "../../components-react/editors/EditorContainer";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager";
import { findInstance } from "../ReactInstance";
import { Key } from "ts-key-enum";

describe("<SliderEditor />", () => {
  before(async () => {
    await TestUtils.initializeUiComponents();
  });
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    theUserTo = userEvent.setup();
  });

  it("should render with no record", () => {
    render(<SliderEditor />);
    expect(screen.getByTestId("components-popup-button")).to.exist;
  });

  it("getValue returns proper value after componentDidMount & setState", async () => {
    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    render(<SliderEditor propertyRecord={record} />);

    expect(screen.getByRole("button", { name: "50" })).to.exist;
  });

  it("new props updates the display", async () => {
    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    const { rerender } = render(<SliderEditor propertyRecord={record} />);

    const newRecord = TestUtils.createNumericProperty(
      "Test",
      60,
      StandardEditorNames.Slider
    );
    rerender(<SliderEditor propertyRecord={newRecord} />);
    expect(screen.getByRole("button", { name: "60" })).to.exist;
  });

  it("calls onCommit on OK button click", async () => {
    const spyOnCommit = sinon.spy();
    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    render(<SliderEditor propertyRecord={record} onCommit={spyOnCommit} />);

    await theUserTo.click(screen.getByTestId("components-popup-button"));

    await theUserTo.click(screen.getByTestId("components-popup-ok-button"));

    expect(spyOnCommit.calledOnce).to.be.true;
  });

  it("calls onCancel on Cancel button click", async () => {
    const spyOnCancel = sinon.spy();
    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    render(<SliderEditor propertyRecord={record} onCancel={spyOnCancel} />);

    await theUserTo.click(screen.getByTestId("components-popup-button"));

    await theUserTo.click(screen.getByTestId("components-popup-cancel-button"));

    expect(spyOnCancel.calledOnce).to.be.true;
  });

  it("calls onCommit on Enter key", async () => {
    const spyOnCommit = sinon.spy();
    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    render(<SliderEditor propertyRecord={record} onCommit={spyOnCommit} />);

    await theUserTo.click(screen.getByTestId("components-popup-button"));

    await theUserTo.keyboard("{Enter}");

    expect(spyOnCommit.calledOnce).to.be.true;
  });

  it("calls onCancel on Escape key", async () => {
    const spyOnCancel = sinon.spy();
    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    render(<SliderEditor propertyRecord={record} onCancel={spyOnCancel} />);

    await theUserTo.click(screen.getByTestId("components-popup-button"));

    await theUserTo.keyboard("{Escape}");

    expect(spyOnCancel.calledOnce).to.be.true;
  });

  it("renders editor for 'number' type and 'slider' editor using SliderEditor", () => {
    const propertyRecord = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={() => {}}
        onCancel={() => {}}
      />
    );
    expect(
      renderedComponent.container.querySelector(".components-slider-editor")
    ).to.not.be.empty;
  });

  it("calls onCommit for Change", async () => {
    const propertyRecord = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    const spyOnCommit = sinon.spy();
    render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );

    await theUserTo.click(screen.getByTestId("components-popup-button"));
    await theUserTo.click(screen.getByRole("slider"));
    await theUserTo.click(screen.getByTestId("components-popup-ok-button"));

    expect(spyOnCommit.calledOnce).to.be.true;
  });

  it("should render Editor Params reversed track coloring", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 0,
      maximum: 100,
      step: 5,
      reversed: true,
      showTooltip: true,
      tooltipBelow: true,
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    const track =
      component.container.ownerDocument.querySelector(".iui-slider-track");
    expect(track).to.exist;
    expect((track as HTMLElement).style.right).to.eq("0%");
    expect((track as HTMLElement).style.left).to.eq("50%");
    component.unmount();
  });

  it("should render Editor Params reversed track coloring", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 0,
      maximum: 100,
      step: 5,
      reversed: false,
      showTooltip: true,
      tooltipBelow: true,
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    const track =
      component.container.ownerDocument.querySelector(".iui-slider-track");
    expect(track).to.exist;
    expect((track as HTMLElement).style.left).to.eq("0%");
    expect((track as HTMLElement).style.right).to.eq("50%");
    component.unmount();
  });

  it("should render Editor Params w/decimal step", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 0,
      maximum: 5,
      step: 1.5,
      mode: 1,
      showTooltip: true,
      showMinMax: false,
      maxIconSpec: "icon-placeholder",
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      3,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    expect(
      component.container.ownerDocument.querySelector(".iui-tooltip")
        ?.textContent
    ).to.eq("3.0");
    component.unmount();
  });

  it("should render Editor Params w/decimal step", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 0,
      maximum: 5,
      step: 1.5,
      mode: 1,
      showTooltip: true,
      showMinMax: false,
      maxIconSpec: "icon-placeholder",
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      3,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    expect(
      component.container.ownerDocument.querySelector(".iui-tooltip")
        ?.textContent
    ).to.eq("3.0");
    component.unmount();
  });

  it("should render Editor Params w/ticks no tick labels", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const formatTooltip = (value: number): string => value.toFixed(2);
    const formatTick = (value: number): string => value.toFixed(1);
    const getTickCount = (): number => 2; // 2 segment / 3 ticks 0-50-100
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 1,
      maximum: 100,
      step: 5,
      mode: 1,
      showTooltip: true,
      tooltipBelow: true,
      showMinMax: true,
      maxIconSpec: "icon-placeholder",
      showTicks: true,
      showTickLabels: false,
      getTickCount,
      formatTooltip,
      formatTick,
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    expect(
      component.container.ownerDocument.querySelector("span.iui-slider-min")
        ?.textContent
    ).to.eq("1");
    expect(
      component.container.ownerDocument.querySelector(".iui-tooltip")
        ?.textContent
    ).to.eq("50.00");
    const maxLabel = component.container.ownerDocument.querySelector(
      "span.iui-slider-max"
    );
    expect(maxLabel?.querySelector(".icon-placeholder")).to.exist;
    const ticks = component.container.ownerDocument.querySelectorAll(
      "span.iui-slider-tick"
    );
    expect(ticks.length).to.eq(3);
    component.unmount();
  });
  it("should render Editor Params w/ticks", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const formatTooltip = (value: number): string => value.toFixed(2);
    const formatTick = (value: number): string => value.toFixed(1);
    const getTickCount = (): number => 1;
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 1,
      maximum: 100,
      mode: 1,
      showTooltip: true,
      tooltipBelow: true,
      showMinMax: true,
      maxIconSpec: "icon-placeholder",
      showTicks: true,
      showTickLabels: true,
      getTickCount,
      formatTooltip,
      formatTick,
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    expect(
      component.container.ownerDocument.querySelector("span.iui-slider-min")
        ?.textContent
    ).to.eq("1");
    expect(
      component.container.ownerDocument.querySelector(".iui-tooltip")
        ?.textContent
    ).to.eq("50.00");
    const maxLabel = component.container.ownerDocument.querySelector(
      "span.iui-slider-max"
    );
    expect(maxLabel?.querySelector(".icon-placeholder")).to.exist;
    const ticks = component.container.ownerDocument.querySelectorAll(
      "span.iui-slider-tick"
    );
    expect(ticks.length).to.eq(2);
    expect(ticks[0]?.textContent).to.eq("1.0");
    expect(ticks[1]?.textContent).to.eq("100.0");
    component.unmount();
  });

  it("should render Editor Params w/defined ticks values", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const getTickValues = (): number[] => [0, 50, 100];
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 0,
      maximum: 100,
      step: 5,
      mode: 1,
      showTooltip: true,
      tooltipBelow: true,
      showMinMax: true,
      showTicks: true,
      showTickLabels: true,
      getTickValues,
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    expect(
      component.container.ownerDocument.querySelector("span.iui-slider-min")
        ?.textContent
    ).to.eq("0");
    expect(
      component.container.ownerDocument.querySelector(".iui-tooltip")
        ?.textContent
    ).to.eq("50");
    expect(
      component.container.ownerDocument.querySelector("span.iui-slider-max")
        ?.textContent
    ).to.eq("100");
    const ticks = component.container.ownerDocument.querySelectorAll(
      "span.iui-slider-tick"
    );
    expect(ticks.length).to.eq(3);
    expect(ticks[0]?.textContent).to.eq("0");
    expect(ticks[1]?.textContent).to.eq("50");
    expect(ticks[2]?.textContent).to.eq("100");

    component.unmount();
  });

  it("should render Editor Params w/defined formatted ticks values", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const formatTick = (value: number): string => value.toFixed(1);
    const getTickValues = (): number[] => [0, 50, 100];
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 0,
      maximum: 100,
      step: 5,
      mode: 1,
      showTooltip: true,
      tooltipBelow: true,
      showMinMax: true,
      showTicks: true,
      showTickLabels: true,
      getTickValues,
      formatTick,
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    expect(
      component.container.ownerDocument.querySelector("span.iui-slider-min")
        ?.textContent
    ).to.eq("0");
    expect(
      component.container.ownerDocument.querySelector(".iui-tooltip")
        ?.textContent
    ).to.eq("50");
    expect(
      component.container.ownerDocument.querySelector("span.iui-slider-max")
        ?.textContent
    ).to.eq("100");
    const ticks = component.container.ownerDocument.querySelectorAll(
      "span.iui-slider-tick"
    );
    expect(ticks.length).to.eq(3);
    expect(ticks[0]?.textContent).to.eq("0.0");
    expect(ticks[1]?.textContent).to.eq("50.0");
    expect(ticks[2]?.textContent).to.eq("100.0");

    component.unmount();
  });

  it("should render Editor Params w/ticks and default labels", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const getTickCount = (): number => 4; // four segments
    // const getTickValues = (): number[] => [1, 100];
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 0,
      maximum: 100,
      step: 5,
      mode: 1,
      showTooltip: true,
      tooltipBelow: true,
      showMinMax: true,
      showTicks: true,
      showTickLabels: true,
      getTickCount,
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    expect(
      component.container.ownerDocument.querySelector("span.iui-slider-min")
        ?.textContent
    ).to.eq("0");
    expect(
      component.container.ownerDocument.querySelector(".iui-tooltip")
        ?.textContent
    ).to.eq("50");
    expect(
      component.container.ownerDocument.querySelector("span.iui-slider-max")
        ?.textContent
    ).to.eq("100");
    const ticks = component.container.ownerDocument.querySelectorAll(
      "span.iui-slider-tick"
    );
    expect(ticks.length).to.eq(5);
    expect(ticks[0]?.textContent).to.eq("0");
    expect(ticks[1]?.textContent).to.eq("25");
    expect(ticks[2]?.textContent).to.eq("50");
    expect(ticks[3]?.textContent).to.eq("75");
    expect(ticks[4]?.textContent).to.eq("100");

    component.unmount();
  });

  it("should render Editor Params icon labels", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const formatTooltip = (value: number): string => value.toFixed(1);
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 1,
      maximum: 100,
      step: 5,
      mode: 1,
      showTooltip: true,
      tooltipBelow: true,
      showMinMax: true,
      maxIconSpec: "icon-placeholder",
      minIconSpec: "icon-placeholder",
      showTicks: true,
      showTickLabels: true,
      formatTooltip,
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    expect(
      component.container.ownerDocument.querySelector(".iui-tooltip")
        ?.textContent
    ).to.eq("50.0");
    expect(
      component.container.ownerDocument
        .querySelector("span.iui-slider-min")
        ?.querySelector(".icon-placeholder")
    ).to.exist;
    expect(
      component.container.ownerDocument
        .querySelector("span.iui-slider-max")
        ?.querySelector(".icon-placeholder")
    ).to.exist;
    component.unmount();
  });

  it("should render Editor Params string labels", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 1,
      maximum: 100,
      showTooltip: true,
      tooltipBelow: true,
      showMinMax: true,
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));
    expect(
      component.container.ownerDocument.querySelector(".iui-tooltip")
        ?.textContent
    ).to.eq("50");
    expect(
      component.container.ownerDocument.querySelector("span.iui-slider-min")
        ?.textContent
    ).to.eq("1");
    expect(
      component.container.ownerDocument.querySelector("span.iui-slider-max")
        ?.textContent
    ).to.eq("100");
    component.unmount();
  });

  it("should render Editor Params and trigger handleChange callback", async () => {
    const editorParams: BasePropertyEditorParams[] = [];
    const sliderParams: SliderEditorParams = {
      type: PropertyEditorParamTypes.Slider,
      size: 100,
      minimum: 1,
      maximum: 100,
      step: 5,
      showTooltip: true,
      tooltipBelow: true,
      showMinMax: false,
      maxIconSpec: "icon-placeholder",
      showTicks: true,
      showTickLabels: true,
    };
    editorParams.push(sliderParams);

    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider,
      editorParams
    );
    const component = render(<SliderEditor propertyRecord={record} />);
    await theUserTo.click(screen.getByTestId("components-popup-button"));

    const thumb =
      component.container.ownerDocument.querySelector(".iui-slider-thumb");
    expect(thumb).to.exist;
    fireEvent.keyDown(thumb!, { key: Key.ArrowRight });
    await TestUtils.flushAsyncOperations();
    expect(
      component.container.ownerDocument.querySelector(".iui-tooltip")
        ?.textContent
    ).to.eq("55");

    component.unmount();
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const propertyRecord = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    propertyRecord.property.dataController = "myData";

    const spyOnCommit = sinon.spy();
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );
    expect(renderedComponent).not.to.be.undefined;
    const popupButton = await waitFor(() =>
      renderedComponent.getByTestId("components-popup-button")
    );
    expect(popupButton).not.to.be.null;

    fireEvent.keyDown(popupButton, { key: Key.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit.called).to.be.false;

    PropertyEditorManager.deregisterDataController("myData");
  });
  it("should receive focus", async () => {
    const propertyRecord = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    const renderedComponent = render(
      <SliderEditor propertyRecord={propertyRecord} />
    );
    expect(renderedComponent).not.to.be.undefined;
    const popupButton = await renderedComponent.findByTestId(
      "components-popup-button"
    );
    expect(popupButton).not.to.be.null;
    popupButton.focus();
    const editor = findInstance(renderedComponent.container.firstChild);
    expect(editor).not.to.be.null;
    expect(editor.hasFocus).to.be.true;
  });
});
