/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, render } from "@testing-library/react";
import { produce } from "immer";
import * as React from "react";
import { createLayoutStore } from "../../../appui-react/layout/base/LayoutStore.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers.js";
import { useContainersStore } from "../../../appui-react/layout/widget/ContentManager.js";
import { WidgetContentRenderer } from "../../../appui-react/layout/widget/ContentRenderer.js";
import { TestNineZoneProvider } from "../Providers.js";

describe("WidgetContentRenderer", () => {
  const wrapper = (props: React.PropsWithChildren<object>) => (
    <TestNineZoneProvider
      defaultState={addTab(createNineZoneState(), "t1")}
      {...props}
    />
  );

  it("should remove existing content nodes before restoring", () => {
    const renderTo = document.createElement("div");
    renderTo.appendChild(document.createElement("div"));
    useContainersStore.getState().setContainer("t1", renderTo);
    useContainersStore.getState().setContainer("t2", renderTo);

    const spy = vi.spyOn(renderTo, "removeChild");
    render(<WidgetContentRenderer tabId="t1" />, {
      wrapper,
    });

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should remove added content node", () => {
    const renderTo = document.createElement("div");
    useContainersStore.getState().setContainer("t1", renderTo);

    const spy = vi.spyOn(renderTo, "removeChild");
    const { unmount } = render(<WidgetContentRenderer tabId="t1" />, {
      wrapper,
    });

    renderTo.insertBefore(document.createElement("div"), renderTo.firstChild);
    renderTo.appendChild(document.createElement("div"));
    unmount();

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should not render when tab is unloaded", async () => {
    const renderTo = document.createElement("div");
    document.body.appendChild(renderTo);
    useContainersStore.getState().setContainer("t1", renderTo);

    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);

    const layout = createLayoutStore(state);
    const { findByText, queryByText } = render(
      <WidgetContentRenderer tabId="t1">Widget content</WidgetContentRenderer>,
      {
        wrapper: (props: any) => (
          <TestNineZoneProvider layout={layout} {...props} />
        ),
      }
    );

    await findByText("Widget content");

    act(() => {
      layout.setState((prev) =>
        produce(prev, (draft) => {
          draft.tabs.t1.unloaded = true;
        })
      );
    });
    const content = queryByText("Widget content");
    expect(content).toEqual(null);
  });
});
