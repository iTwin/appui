/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { Key } from "ts-key-enum";
import type {
  BasePropertyEditorParams,
  SliderEditorParams,
} from "@itwin/appui-abstract";
import {
  PropertyEditorParamTypes,
  StandardEditorNames,
} from "@itwin/appui-abstract";
import { SliderEditor } from "../../components-react/editors/SliderEditor.js";
import TestUtils, { MineDataController, userEvent } from "../TestUtils.js";
import { EditorContainer } from "../../components-react/editors/EditorContainer.js";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager.js";
import { findInstance } from "../ReactInstance.js";

describe("<SliderEditor />", () => {
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
    const spyOnCommit = vi.fn();
    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    render(<SliderEditor propertyRecord={record} onCommit={spyOnCommit} />);

    await theUserTo.click(screen.getByTestId("components-popup-button"));

    await theUserTo.click(screen.getByTestId("components-popup-ok-button"));

    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("calls onCancel on Cancel button click", async () => {
    const spyOnCancel = vi.fn();
    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    render(<SliderEditor propertyRecord={record} onCancel={spyOnCancel} />);

    await theUserTo.click(screen.getByTestId("components-popup-button"));

    await theUserTo.click(screen.getByTestId("components-popup-cancel-button"));

    expect(spyOnCancel).toHaveBeenCalledOnce();
  });

  it("calls onCommit on Enter key", async () => {
    const spyOnCommit = vi.fn();
    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    render(<SliderEditor propertyRecord={record} onCommit={spyOnCommit} />);

    await theUserTo.click(screen.getByTestId("components-popup-button"));

    await theUserTo.keyboard("{Enter}");

    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("calls onCancel on Escape key", async () => {
    const spyOnCancel = vi.fn();
    const record = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    render(<SliderEditor propertyRecord={record} onCancel={spyOnCancel} />);

    await theUserTo.click(screen.getByTestId("components-popup-button"));

    // Close slider tooltip.
    await theUserTo.keyboard("{Escape}");

    // Close editor popup.
    await theUserTo.keyboard("{Escape}");

    expect(spyOnCancel).toHaveBeenCalledOnce();
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
    const spyOnCommit = vi.fn();
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

    expect(spyOnCommit).toHaveBeenCalledOnce();
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
    await theUserTo.click(component.getByTestId("components-popup-button"));
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
    await theUserTo.click(component.getByTestId("components-popup-button"));
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
    await theUserTo.click(component.getByTestId("components-popup-button"));
    component.getByText("3.0");
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
    component.getByText("50.00");

    const ticks = component.queryAllByTestId("components-tick");
    expect(ticks).to.have.length(3);
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

    component.getByText("50.00");

    const slider = component.getByRole("slider");
    expect(slider.getAttribute("aria-valuemin")).toEqual("1");
    expect(slider.getAttribute("aria-valuemax")).toEqual("100");
    expect(slider.getAttribute("aria-valuenow")).toEqual("50");

    // Ticks
    const ticks = component
      .queryAllByTestId("components-tick")
      .map((tick) => tick.textContent);
    expect(ticks).to.eql(["1.0", "100.0"]);
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

    // Ticks
    const ticks = component
      .queryAllByTestId("components-tick")
      .map((tick) => tick.textContent);
    expect(ticks).to.eql(["0", "50", "100"]);
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

    const ticks = component
      .queryAllByTestId("components-tick")
      .map((tick) => tick.textContent);
    expect(ticks).to.eql(["0.0", "50.0", "100.0"]);
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

    const ticks = component
      .queryAllByTestId("components-tick")
      .map((tick) => tick.textContent);
    expect(ticks).to.eql(["0", "25", "50", "75", "100"]);
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
      maxIconSpec: "icon-placeholder-max",
      minIconSpec: "icon-placeholder-min",
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
      component.container.ownerDocument.querySelector(".icon-placeholder-min")
    ).to.exist;
    expect(
      component.container.ownerDocument.querySelector(".icon-placeholder-max")
    ).to.exist;
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

    const slider = component.getByRole("slider");
    fireEvent.keyDown(slider, { key: Key.ArrowRight });

    expect(slider.getAttribute("aria-valuenow")).toEqual("55");
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const propertyRecord = TestUtils.createNumericProperty(
      "Test",
      50,
      StandardEditorNames.Slider
    );
    propertyRecord.property.dataController = "myData";

    const spyOnCommit = vi.fn();
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={propertyRecord}
        title="abc"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );
    expect(renderedComponent).toBeTruthy();
    const popupButton = await waitFor(() =>
      renderedComponent.getByTestId("components-popup-button")
    );
    expect(popupButton).toBeTruthy();

    fireEvent.keyDown(popupButton, { key: Key.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();

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
    expect(renderedComponent).toBeTruthy();
    const popupButton = await renderedComponent.findByTestId(
      "components-popup-button"
    );
    expect(popupButton).toBeTruthy();
    popupButton.focus();
    const editor = findInstance(renderedComponent.container.firstChild);
    expect(editor).toBeTruthy();
    expect(editor.hasFocus).toEqual(true);
  });
});
