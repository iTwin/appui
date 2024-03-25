/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import {
  SettingsContainer,
  useSaveBeforeActivatingNewSettingsTab,
  useSaveBeforeClosingSettingsContainer,
} from "../../core-react/settings/SettingsContainer";
import type { SettingsTabEntry } from "../../core-react/settings/SettingsManager";
import { SettingsManager } from "../../core-react/settings/SettingsManager";
import TestUtils from "../TestUtils";

// cSpell:ignore sublabel
function TestModalSettingsPage({
  settingsManager,
  title,
}: {
  settingsManager: SettingsManager;
  title: string;
}) {
  const saveChanges = (afterSaveFunction: (args: any) => void, args?: any) => {
    // for testing just immediately call afterSaveFunction
    afterSaveFunction(args);
  };

  useSaveBeforeClosingSettingsContainer(settingsManager, saveChanges);
  useSaveBeforeActivatingNewSettingsTab(settingsManager, saveChanges);
  return <div>{title}</div>;
}

describe("<SettingsContainer />", () => {
  const settingsManager = new SettingsManager();

  const tabs: SettingsTabEntry[] = [
    {
      tabId: "page1",
      itemPriority: 10,
      pageWillHandleCloseRequest: true,
      label: "Page 1",
      tooltip: "Page1",
      icon: "icon-measure",
      page: (
        <TestModalSettingsPage
          settingsManager={settingsManager}
          title="Page 1"
        />
      ),
    },
    {
      tabId: "page2",
      itemPriority: 20,
      label: "Page2",
      subLabel: "sublabel page2",
      tooltip: <span>react-tooltip</span>,
      icon: "icon-paintbrush",
      page: <div>Page 2</div>,
    },
    {
      tabId: "page3",
      itemPriority: 30,
      label: "page3",
      subLabel: "sublabel page2",
      page: <div>Page 3</div>,
    },
    {
      tabId: "tab-page4",
      itemPriority: 40,
      label: "page4",
      subLabel: "disabled page4",
      isDisabled: true,
      page: <div>Page 4</div>,
    },
  ];

  it("should render with category header", async () => {
    // note we are setting current tab to "page 2" to avoid the async tab activation process that would
    // ensue if the current tab was page 1 that set pageWillHandleCloseRequest to true.
    const wrapper = render(
      <SettingsContainer
        showHeader={true}
        tabs={tabs}
        settingsManager={settingsManager}
        currentSettingsTab={tabs[1]}
      />
    );
    const liPage2 = wrapper.container.querySelector(
      `li[data-for='page2']`
    ) as HTMLLIElement;
    expect(liPage2.classList.contains("core-active")).toEqual(true);

    const headerDiv = wrapper.container.querySelector(
      `div.core-settings-container-right-header`
    );
    expect(headerDiv).to.not.be.null;
  });

  it("should render", async () => {
    const spy = vi.fn();

    // note we are setting current tab to "page 2" to avoid the async tab activation process that would
    // ensue if the current tab was page 1 that set pageWillHandleCloseRequest to true.
    const wrapper = render(
      <SettingsContainer
        tabs={tabs}
        settingsManager={settingsManager}
        currentSettingsTab={tabs[1]}
        onSettingsTabSelected={spy}
      />
    );
    // no header should be located since showHeader not specified
    const headerDiv = wrapper.container.querySelector(
      `div.core-settings-container-right-header`
    );
    expect(headerDiv).to.be.null;

    let activePageSelector = `li[data-for='page2']`;
    const liPage2 = wrapper.container.querySelector(
      activePageSelector
    ) as HTMLLIElement;
    expect(liPage2.classList.contains("core-active")).toEqual(true);

    const tab3 = wrapper.getByTestId("page3");
    fireEvent.click(tab3);
    await TestUtils.flushAsyncOperations();
    activePageSelector = `li[data-for='page3']`;
    const liPage3 = wrapper.container.querySelector(
      activePageSelector
    ) as HTMLLIElement;
    expect(liPage3.classList.contains("core-active")).toEqual(true);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should trigger tab activation", async () => {
    const spy = vi.fn();

    // note we are setting current tab to "page 2" to avoid the async tab activation process that would
    // ensue if the current tab was page 1 that set pageWillHandleCloseRequest to true.
    const wrapper = render(
      <SettingsContainer
        tabs={tabs}
        settingsManager={settingsManager}
        onSettingsTabSelected={spy}
      />
    );
    let activePageSelector = `li[data-for='page1']`;
    const liPage1 = wrapper.container.querySelector(
      activePageSelector
    ) as HTMLLIElement;
    expect(liPage1.classList.contains("core-active")).toEqual(true);

    const tab3 = wrapper.getByTestId("page3");
    fireEvent.click(tab3);

    await Promise.all(spy.returnValues);

    activePageSelector = `li[data-for='page3']`;
    const liPage3 = wrapper.container.querySelector(
      activePageSelector
    ) as HTMLLIElement;
    expect(liPage3.classList.contains("core-active")).toEqual(true);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("simulate tab activation via keyin", async () => {
    const spy = vi.fn();

    const wrapper = render(
      <SettingsContainer
        tabs={tabs}
        settingsManager={settingsManager}
        onSettingsTabSelected={spy}
        currentSettingsTab={tabs[1]}
      />
    );

    settingsManager.activateSettingsTab("page3");

    await waitFor(() => {
      const activePageSelector = `li[data-for='page3']`;
      const liPage3 = wrapper.container.querySelector(
        activePageSelector
      ) as HTMLLIElement;
      expect(liPage3.classList.contains("core-active")).toEqual(true);
    });
    expect(spy).toHaveBeenCalledOnce();

    spy.resetHistory();
    settingsManager.closeSettingsContainer(spy);
  });

  it("simulate tab 4 activation via keyin", async () => {
    const spy = vi.fn();

    const wrapper = render(
      <SettingsContainer
        tabs={tabs}
        settingsManager={settingsManager}
        onSettingsTabSelected={spy}
      />
    );

    settingsManager.activateSettingsTab("page4");
    await TestUtils.flushAsyncOperations();
    // should not activate page 4 since it is disabled
    const activePageSelector = `li[data-for='page1']`;
    const liPage1 = wrapper.container.querySelector(
      activePageSelector
    ) as HTMLLIElement;
    expect(liPage1.classList.contains("core-active")).toEqual(true);
  });

  it("should trigger close activation", async () => {
    const spy = vi.fn();

    // note we are setting current tab to "page 2" to avoid the async tab activation process that would
    // ensue if the current tab was page 1 that set pageWillHandleCloseRequest to true.
    const wrapper = render(
      <SettingsContainer tabs={tabs} settingsManager={settingsManager} />
    );
    const activePageSelector = `li[data-for='page1']`;
    const liPage1 = wrapper.container.querySelector(
      activePageSelector
    ) as HTMLLIElement;
    expect(liPage1.classList.contains("core-active")).toEqual(true);

    // trigger the close container processing
    settingsManager.closeSettingsContainer(spy);
    await Promise.all(spy.returnValues);

    wrapper.unmount();
  });
});
