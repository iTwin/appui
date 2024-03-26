/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { renderHook } from "@testing-library/react-hooks";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import { useConditionalSynchedItems } from "../../components-react/toolbar/useConditionalSynchedItems";
import { ConditionalIconItem } from "@itwin/core-react";
import { BeUiEvent } from "@itwin/core-bentley";

interface BeUiEventProps {
  eventIds: Set<string>;
}

describe("useConditionalSynchedItems", () => {
  it("Should support no Conditionals in items and return provided items", () => {
    const items = [
      { id: "Btn1" },
      { id: "Btn2" },
      { id: "Btn3" },
      {
        id: "Grp4",
        items: [
          { id: "Btn5" },
          {
            id: "Grp6",
            items: [{ id: "Btn7" }],
          },
        ],
      },
      { id: "Btn8" },
    ];
    const event = new BeUiEvent<BeUiEventProps>();
    const { result } = renderHook(() => {
      return useConditionalSynchedItems(items, event);
    });

    expect(result.current).toEqual(items);

    event.emit({ eventIds: new Set() });
    expect(result.current).toEqual(items);
  });

  it("Should update initial items on mount", () => {
    const items = [
      {
        stringValue: new ConditionalStringValue(
          () => "value",
          ["string-update"]
        ),
      },
    ];
    const event = new BeUiEvent<BeUiEventProps>();
    const { result } = renderHook(() => {
      return useConditionalSynchedItems(items, event);
    });

    const updatedItems = result.current;
    expect(updatedItems).to.not.eq(items);
  });

  it("Should not update items when unrelated events are emitted", () => {
    const items = [
      {
        stringValue: new ConditionalStringValue(
          () => "value",
          ["string-update"]
        ),
      },
    ];
    const event = new BeUiEvent<BeUiEventProps>();
    const { result } = renderHook(() => {
      return useConditionalSynchedItems(items, event);
    });

    const updatedItems = result.current;

    event.emit({ eventIds: new Set(["other-event"]) });
    expect(result.current).toEqual(updatedItems);
  });

  it("Should not update items when conditional do not change value on related event", () => {
    const items = [
      {
        stringValue: new ConditionalStringValue(
          () => "value",
          ["string-update"]
        ),
      },
    ];
    const event = new BeUiEvent<BeUiEventProps>();
    const { result } = renderHook(() => {
      return useConditionalSynchedItems(items, event);
    });

    const updatedItems = result.current;

    event.emit({ eventIds: new Set(["string-update"]) });
    expect(result.current).toEqual(updatedItems);
  });

  it("Should update items when conditional change value on related event", () => {
    const state = {
      value: "initialValue",
    };
    const items = [
      {
        stringValue: new ConditionalStringValue(
          () => state.value,
          ["string-update"]
        ),
      },
    ];
    const event = new BeUiEvent<BeUiEventProps>();
    const { result } = renderHook(() => {
      return useConditionalSynchedItems(items, event);
    });

    const updatedItems = result.current;
    state.value = "updatedItem";

    event.emit({ eventIds: new Set(["string-update"]) });
    expect(result.current).to.not.eq(updatedItems);
  });

  it("Should support all types of known conditionals", () => {
    const state = {
      iconValue: "initialIcon",
      stringValue: "initialString",
      boolValue: true,
    };
    const items = [
      {
        iconValue: new ConditionalIconItem(() => state.iconValue, ["change"]),
        stringValue: new ConditionalStringValue(
          () => state.stringValue,
          ["change"]
        ),
        booleanValue: new ConditionalBooleanValue(
          () => state.boolValue,
          ["change"]
        ),
      },
    ];
    const event = new BeUiEvent<BeUiEventProps>();
    const { result } = renderHook(() => {
      return useConditionalSynchedItems(items, event);
    });

    state.iconValue = "updatedIcon";
    state.stringValue = "updatedString";
    state.boolValue = false;
    event.emit({ eventIds: new Set(["change"]) });

    expect(ConditionalIconItem.getValue(result.current[0].iconValue)).toEqual(
      "updatedIcon"
    );
    expect(
      ConditionalStringValue.getValue(result.current[0].stringValue)
    ).toEqual("updatedString");
    expect(
      ConditionalBooleanValue.getValue(result.current[0].booleanValue)
    ).toEqual(false);
  });

  it("Should support nested conditionals", () => {
    const level1State = {
      value: "initial1",
    };
    const level2State = {
      value: "initial2",
    };
    const items = [
      {
        items: [
          {
            stringValue: new ConditionalStringValue(
              () => level1State.value,
              ["change-1", "change-both"]
            ),
            items: [
              {
                stringValue: new ConditionalStringValue(
                  () => level2State.value,
                  ["change-both"]
                ),
              },
            ],
          },
        ],
      },
    ];
    const event = new BeUiEvent<BeUiEventProps>();
    const { result } = renderHook(() => {
      return useConditionalSynchedItems(items, event);
    });

    expect(
      ConditionalStringValue.getValue(result.current[0].items[0].stringValue)
    ).toEqual("initial1");
    expect(
      ConditionalStringValue.getValue(
        result.current[0].items[0].items[0].stringValue
      )
    ).toEqual("initial2");

    level1State.value = "updated1";
    level2State.value = "updated2";
    event.emit({ eventIds: new Set(["change-1"]) });
    expect(
      ConditionalStringValue.getValue(result.current[0].items[0].stringValue)
    ).toEqual("updated1");
    expect(
      ConditionalStringValue.getValue(
        result.current[0].items[0].items[0].stringValue
      )
    ).toEqual("initial2");

    level1State.value = "final1";
    level2State.value = "final2";
    event.emit({ eventIds: new Set(["change-both"]) });
    expect(
      ConditionalStringValue.getValue(result.current[0].items[0].stringValue)
    ).toEqual("final1");
    expect(
      ConditionalStringValue.getValue(
        result.current[0].items[0].items[0].stringValue
      )
    ).toEqual("final2");
  });

  it("Should support `undefined` syncUiEvent arg", () => {
    const items = [
      {
        stringValue: new ConditionalStringValue(() => "value", ["event"]),
      },
    ];
    const { result } = renderHook(() => {
      return useConditionalSynchedItems(items, undefined);
    });

    expect(
      ConditionalStringValue.getValue(result.current[0].stringValue)
    ).toEqual("value");
  });

  it("Should properly unregister from syncUiEvent", () => {
    const items = [
      {
        stringValue: new ConditionalStringValue(() => "value", ["event"]),
      },
    ];
    const event = new BeUiEvent<BeUiEventProps>();
    const spy = vi.spyOn(event, "removeListener");
    const { unmount } = renderHook(() => {
      return useConditionalSynchedItems(items, event);
    });

    expect(spy).not.toBeCalled();
    unmount();
    expect(spy).toHaveBeenCalled();
  });
});
