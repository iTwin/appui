/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { Key } from "ts-key-enum";
import type {
  PrimitiveValue,
  PropertyDescription,
  PropertyValue,
} from "@itwin/appui-abstract";
import {
  AlternateDateFormats,
  PropertyRecord,
  PropertyValueFormat,
  StandardTypeNames,
  TimeDisplay,
} from "@itwin/appui-abstract";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  EditorContainer /* PropertyUpdatedArgs */,
} from "../../components-react/editors/EditorContainer.js";
import { DateTimeEditor } from "../../components-react/editors/DateTimeEditor.js";
import TestUtils, { MineDataController } from "../TestUtils.js";
import { PropertyEditorManager } from "../../components-react/editors/PropertyEditorManager.js";
import { findInstance } from "../ReactInstance.js";

function createDateProperty(propertyName: string, value: Date, option: number) {
  const v: PropertyValue = {
    valueFormat: PropertyValueFormat.Primitive,
    value,
  };

  let typename = StandardTypeNames.DateTime;
  let converter: any;

  switch (option) {
    case 0:
      typename = StandardTypeNames.DateTime;
      break;
    case 1:
      typename = StandardTypeNames.ShortDate;
      break;
    case 2:
      typename = StandardTypeNames.DateTime;
      converter = { options: { timeDisplay: TimeDisplay.H24M } }; // DateTime with 24hr time
      break;
    case 3:
      typename = StandardTypeNames.DateTime;
      converter = { options: { timeDisplay: TimeDisplay.H24MS } }; // DateTime with 24hr time
      break;
    case 4:
      typename = StandardTypeNames.DateTime;
      converter = { options: { timeDisplay: TimeDisplay.H12MSC } }; // DateTime with 12hr time
      break;
    case 5:
      typename = StandardTypeNames.ShortDate;
      converter = { name: "mm-dd-yyyy" };
      break;
    case 6:
      typename = StandardTypeNames.DateTime;
      converter = {
        options: { alternateDateFormat: AlternateDateFormats.IsoDateTime },
      };
      break;
    case 7:
      typename = StandardTypeNames.ShortDate;
      converter = {
        options: { alternateDateFormat: AlternateDateFormats.IsoShort },
      };
      break;
    case 8:
      typename = StandardTypeNames.ShortDate;
      converter = {
        options: { alternateDateFormat: AlternateDateFormats.UtcShort },
      };
      break;
    case 9:
      typename = StandardTypeNames.ShortDate;
      converter = {
        options: { alternateDateFormat: AlternateDateFormats.UtcShortWithDay },
      };
      break;
    case 10:
      typename = StandardTypeNames.DateTime;
      converter = {
        options: { alternateDateFormat: AlternateDateFormats.UtcDateTime },
      };
      break;
    case 11:
      typename = StandardTypeNames.DateTime;
      converter = {
        options: {
          alternateDateFormat: AlternateDateFormats.UtcDateTimeWithDay,
        },
      };
      break;
    case 12:
      typename = StandardTypeNames.ShortDate;
      converter = {
        options: { alternateDateFormat: AlternateDateFormats.IsoDateTime },
      };
      break;
    case 13:
      typename = StandardTypeNames.DateTime;
      converter = {
        options: { alternateDateFormat: AlternateDateFormats.IsoShort },
      };
      break;
    case 14:
      typename = StandardTypeNames.DateTime;
      converter = {
        options: { alternateDateFormat: AlternateDateFormats.UtcShort },
      };
      break;
    case 15:
      typename = StandardTypeNames.DateTime;
      converter = {
        options: { alternateDateFormat: AlternateDateFormats.UtcShortWithDay },
      };
      break;
    case 16:
      typename = StandardTypeNames.ShortDate;
      converter = {
        options: { alternateDateFormat: AlternateDateFormats.UtcDateTime },
      };
      break;
    case 17:
    default:
      typename = StandardTypeNames.ShortDate;
      converter = {
        options: {
          alternateDateFormat: AlternateDateFormats.UtcDateTimeWithDay,
        },
      };
      break;
  }

  const pd: PropertyDescription = {
    typename, // ShortDate | DateTime
    converter,
    name: propertyName,
    displayLabel: propertyName,
  };
  return new PropertyRecord(v, pd);
}

describe("<DateTimeEditor />", () => {
  const date = new Date(2018, 0, 1);
  const jan4Ticks = new Date(2018, 0, 4).getTime();

  it("long date should render", async () => {
    const spy = vi.fn();
    const record = createDateProperty("Test", date, 0); // 0 creates a long DateTime record
    const renderedComponent = render(
      <DateTimeEditor showTime={true} propertyRecord={record} onCommit={spy} />
    );
    await waitFor(() =>
      renderedComponent.getByText(date.toLocaleString().replace("\u202f", " "))
    );
    const originalValue = (record.value as PrimitiveValue).value as Date;
    expect(originalValue.getTime()).toEqual(date.getTime());
    expect(renderedComponent).toBeTruthy();
    const popupButton = await renderedComponent.findByTestId(
      "components-popup-button"
    );
    fireEvent.click(popupButton);
    const timeDiv = await renderedComponent.findByTestId(
      "components-time-input"
    );
    const hrInput = timeDiv.querySelector(
      ".components-time-input"
    ) as HTMLInputElement;
    expect(hrInput).toBeTruthy();
    hrInput.focus();
    fireEvent.change(hrInput, { target: { value: "09" } });
    hrInput.blur();

    const okButton = renderedComponent.getByTestId(
      "components-popup-ok-button"
    );
    fireEvent.click(okButton);
    await TestUtils.flushAsyncOperations();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("long utc date should render", async () => {
    const spyOnCommit = vi.fn();
    const record = createDateProperty("Test", date, 13); // 13 creates a long utc DateTime record
    const renderedComponent = render(
      <DateTimeEditor
        showTime={true}
        propertyRecord={record}
        onCommit={spyOnCommit}
      />
    );
    const popupButton = await renderedComponent.findByTestId(
      "components-popup-button"
    );
    fireEvent.click(popupButton);
    const timeDiv = await renderedComponent.findByTestId(
      "components-time-input"
    );
    const hrInput = timeDiv.querySelector(
      ".components-time-input"
    ) as HTMLInputElement;
    expect(hrInput).toBeTruthy();
    hrInput.focus();
    fireEvent.change(hrInput, { target: { value: "09" } });
    hrInput.blur();
    const okButton = renderedComponent.getByTestId(
      "components-popup-ok-button"
    );
    fireEvent.click(okButton);
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).toHaveBeenCalledOnce();
    fireEvent.click(popupButton);
  });

  it("short date should render", async () => {
    const record = createDateProperty("Test", date, 1); // 1 creates a short DateTime record
    const { getByText, findByTestId } = render(
      <DateTimeEditor showTime={true} propertyRecord={record} />
    );
    await waitFor(() => expect(getByText(date.toLocaleDateString())).to.exist);
    const originalValue = (record.value as PrimitiveValue).value as Date;
    expect(originalValue.getTime()).toEqual(date.getTime());
    // expect(renderedComponent).toBeTruthy();
    const popupButton = await findByTestId("components-popup-button");
    fireEvent.click(popupButton);
    fireEvent.keyDown(popupButton, { key: Key.Enter });
  });

  it("all variations should render", async () => {
    let record = createDateProperty("Test", date, 0);
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={record}
        title="date"
        onCommit={() => {}}
        onCancel={() => {}}
      />
    );

    for (let i = 1; i < 18; i++) {
      record = createDateProperty("Test", date, i);
      renderedComponent.rerender(
        <EditorContainer
          propertyRecord={record}
          title="date"
          onCommit={() => {}}
          onCancel={() => {}}
        />
      );
      const popupButton = renderedComponent.getByTestId(
        "components-popup-button"
      );
      expect(popupButton).toBeTruthy();
    }
  });

  it("renders editor for 'date' type", async () => {
    const spyOnCommit = vi.fn();
    const record = createDateProperty("Test", date, 10);
    const renderedComponent = render(
      <EditorContainer
        propertyRecord={record}
        title="date"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );
    expect(renderedComponent).toBeTruthy();
    const popupButton = await renderedComponent.findByTestId(
      "components-popup-button"
    );
    fireEvent.click(popupButton);
    const portalDiv = await renderedComponent.findByTestId("core-popup");

    const dataValueSelector = `li[data-value='${jan4Ticks}']`; // Jan 4 2018 (UTC-0)
    const dayEntry = portalDiv.querySelector(dataValueSelector);
    expect(dayEntry).toBeTruthy();

    fireEvent.click(dayEntry!);
    await TestUtils.flushAsyncOperations();

    const okButton = portalDiv.querySelector(".components-popup-ok-button");
    fireEvent.click(okButton!);
    await TestUtils.flushAsyncOperations();

    expect(spyOnCommit).toHaveBeenCalledOnce();
  });

  it("renders editor for 'date' type - cancel", async () => {
    const spyOnCommit = vi.fn();
    const record1 = createDateProperty("Test", date, 0);
    const record2 = createDateProperty("Test", date, 10);

    const renderedComponent = render(
      <EditorContainer
        propertyRecord={record1}
        title="date"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );
    renderedComponent.rerender(
      <EditorContainer
        propertyRecord={record2}
        title="date"
        onCommit={spyOnCommit}
        onCancel={() => {}}
      />
    );

    expect(renderedComponent).toBeTruthy();
    const popupButton = await renderedComponent.findByTestId(
      "components-popup-button"
    );
    fireEvent.click(popupButton);
    const portalDiv = await renderedComponent.findByTestId("core-popup");

    const dataValueSelector = `li[data-value='${jan4Ticks}']`; // Jan 4 2018 (UTC-0)
    const dayEntry = portalDiv.querySelector(dataValueSelector);
    expect(dayEntry).toBeTruthy();
    fireEvent.click(dayEntry!);

    const cancelButton = renderedComponent.getByTestId(
      "components-popup-cancel-button"
    );
    fireEvent.click(cancelButton);
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();
  });

  it("should not commit if DataController fails to validate", async () => {
    PropertyEditorManager.registerDataController("myData", MineDataController);
    const propertyRecord = createDateProperty("Test", date, 10);
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
    const popupButton = await renderedComponent.findByTestId(
      "components-popup-button"
    );
    expect(popupButton).toBeTruthy();

    fireEvent.keyDown(popupButton, { key: Key.Enter });
    await TestUtils.flushAsyncOperations();
    expect(spyOnCommit).not.toBeCalled();

    PropertyEditorManager.deregisterDataController("myData");
  });

  it("should receive focus", async () => {
    const record = createDateProperty("Test", date, 0); // 0 creates a long DateTime record
    const renderedComponent = render(
      <DateTimeEditor showTime={true} propertyRecord={record} />
    );
    expect(
      await waitFor(() =>
        renderedComponent.getByText(
          date.toLocaleString().replace("\u202f", " ")
        )
      )
    ).to.exist;
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
