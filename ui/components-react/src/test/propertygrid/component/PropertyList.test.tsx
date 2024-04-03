/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Orientation } from "@itwin/core-react";
import TestUtils from "../../TestUtils";
import {
  getPropertyKey,
  PropertyList,
} from "../../../components-react/propertygrid/component/PropertyList";
import { fireEvent, render } from "@testing-library/react";

describe("PropertyList", () => {
  it("should call `onPropertyClicked` when clicked on a primitive property", async () => {
    const primitiveRecord = TestUtils.createPrimitiveStringProperty(
      "primitive",
      "value"
    );
    const structRecord = TestUtils.createStructProperty("struct", {
      testProperty: TestUtils.createPrimitiveStringProperty("test", "value"),
    });
    const arrayRecord = TestUtils.createArrayProperty("array", [
      TestUtils.createPrimitiveStringProperty("test", "value"),
    ]);

    const onPropertyClicked = vi.fn();
    const { container } = render(
      <PropertyList
        orientation={Orientation.Horizontal}
        width={800}
        properties={[primitiveRecord, structRecord, arrayRecord]}
        onPropertyClicked={onPropertyClicked}
      />
    );
    await TestUtils.flushAsyncOperations();
    expect(onPropertyClicked).not.toBeCalled();

    const clickableComponents = container.querySelectorAll(
      ".components-property-record--horizontal"
    );
    expect(clickableComponents.length).toEqual(3);

    const primitiveProperty = clickableComponents[0];
    fireEvent.click(primitiveProperty);
    expect(onPropertyClicked).toHaveBeenCalledWith(
      primitiveRecord,
      "primitive"
    );
    onPropertyClicked.mockReset();

    const structProperty = clickableComponents[1];
    fireEvent.click(structProperty);
    expect(onPropertyClicked).not.toBeCalled();

    const arrayProperty = clickableComponents[2];
    fireEvent.click(arrayProperty);
    expect(onPropertyClicked).not.toBeCalled();
  });

  it("should call `onPropertyRightClicked` when right clicked on a primitive property", async () => {
    const primitiveRecord = TestUtils.createPrimitiveStringProperty(
      "primitive",
      "value"
    );
    const structRecord = TestUtils.createStructProperty("struct", {
      testProperty: TestUtils.createPrimitiveStringProperty("test", "value"),
    });
    const arrayRecord = TestUtils.createArrayProperty("array", [
      TestUtils.createPrimitiveStringProperty("test", "value"),
    ]);

    const onPropertyRightClicked = vi.fn();
    const { container } = render(
      <PropertyList
        orientation={Orientation.Horizontal}
        width={800}
        properties={[primitiveRecord, structRecord, arrayRecord]}
        onPropertyRightClicked={onPropertyRightClicked}
      />
    );
    await TestUtils.flushAsyncOperations();
    expect(onPropertyRightClicked).not.toBeCalled();

    const clickableComponents = container.querySelectorAll(
      ".components-property-record--horizontal"
    );
    expect(clickableComponents.length).toEqual(3);

    const primitiveProperty = clickableComponents[0];
    fireEvent.contextMenu(primitiveProperty);
    expect(onPropertyRightClicked).toHaveBeenCalledWith(
      primitiveRecord,
      "primitive"
    );
    onPropertyRightClicked.mockReset();

    const structProperty = clickableComponents[1];
    fireEvent.contextMenu(structProperty);
    expect(onPropertyRightClicked).not.toBeCalled();

    const arrayProperty = clickableComponents[2];
    fireEvent.contextMenu(arrayProperty);
    expect(onPropertyRightClicked).not.toBeCalled();
  });

  it("should call onEditCommit", async () => {
    const primitiveRecord = TestUtils.createPrimitiveStringProperty(
      "primitive",
      "value"
    );
    const structRecord = TestUtils.createStructProperty("struct", {
      testProperty: TestUtils.createPrimitiveStringProperty("test", "value"),
    });
    const arrayRecord = TestUtils.createArrayProperty("array", [
      TestUtils.createPrimitiveStringProperty("test", "value"),
    ]);

    const spy = vi.fn();
    const category = { name: "Cat1", label: "Category 1", expand: true };
    const editingPropertyKey = getPropertyKey(category, primitiveRecord);
    const propertyList = render(
      <PropertyList
        orientation={Orientation.Horizontal}
        width={800}
        properties={[primitiveRecord, structRecord, arrayRecord]}
        onEditCommit={spy}
        category={category}
        editingPropertyKey={editingPropertyKey}
      />
    );

    const inputNode = propertyList.container.querySelector("input");
    expect(inputNode).toBeTruthy();

    fireEvent.keyDown(inputNode as HTMLElement, { key: "A" });
    fireEvent.keyDown(inputNode as HTMLElement, { key: "Enter" });
    await TestUtils.flushAsyncOperations();
    expect(spy).toHaveBeenCalledOnce();
  });
});
