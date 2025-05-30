/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import type { ModalFrontstageInfo } from "../../appui-react.js";
import {
  FrontstageDef,
  ModalFrontstage,
  SettingsModalFrontstage,
} from "../../appui-react.js";
import TestUtils from "../TestUtils.js";
import { UiFramework } from "../../appui-react/UiFramework.js";
import type {
  SettingsManager,
  SettingsTabEntry,
  SettingsTabsProvider,
} from "@itwin/core-react";
import {
  useSaveBeforeActivatingNewSettingsTab,
  useSaveBeforeClosingSettingsContainer,
} from "@itwin/core-react";
import { IModelApp } from "@itwin/core-frontend";
import { ConditionalBooleanValue } from "@itwin/appui-abstract";

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

function renderModalFrontstage(isOpen: boolean): React.ReactElement<any> {
  const activeModalFrontstage: ModalFrontstageInfo | undefined =
    UiFramework.frontstages.activeModalFrontstage;
  if (!activeModalFrontstage) {
    throw new Error();
  }

  const { title, content, appBarRight } = activeModalFrontstage;

  return (
    <ModalFrontstage
      isOpen={isOpen}
      title={title}
      navigateBack={() => {}}
      closeModal={() => {}}
      appBarRight={appBarRight}
    >
      {content}
    </ModalFrontstage>
  );
}

describe("ModalSettingsStage", () => {
  it("will display no settings when none are registered", () => {
    const modalFrontstage = new SettingsModalFrontstage();
    UiFramework.frontstages.openModalFrontstage(modalFrontstage);

    const wrapper = render(renderModalFrontstage(true));
    expect(
      wrapper.container.querySelectorAll("div.uifw-modal-frontstage").length
    ).toEqual(1);

    const centeredDiv = wrapper.container.querySelectorAll(
      "div.uicore-centered"
    );
    expect(centeredDiv.length).toEqual(1);
    expect(centeredDiv[0].textContent).toEqual("settings.noSettingsAvailable");

    UiFramework.frontstages.closeModalFrontstage();
    wrapper.unmount();
  });

  it("will open no available settings message", () => {
    const spy = vi.spyOn(IModelApp.notifications, "outputMessage");
    SettingsModalFrontstage.showSettingsStage("page1");
    expect(spy).toHaveBeenCalledOnce();
  });

  it("will return action item", () => {
    const backstageActionItem = SettingsModalFrontstage.getBackstageActionItem(
      400,
      40
    );
    expect(backstageActionItem.groupPriority).to.be.eql(400);
    expect(backstageActionItem.itemPriority).to.be.eql(40);
    expect(backstageActionItem.icon).toBeTruthy();
    expect(backstageActionItem.label).toBeTruthy();
    expect(
      ConditionalBooleanValue.getValue(backstageActionItem.isHidden)
    ).toEqual(true);
  });

  class TestSettingsProvider implements SettingsTabsProvider {
    public readonly id = "AppSettingsProvider";

    public getSettingEntries(
      _stageId: string,
      _stageUsage: string
    ): ReadonlyArray<SettingsTabEntry> | undefined {
      return [
        {
          tabId: "page1",
          itemPriority: 10,
          pageWillHandleCloseRequest: true,
          label: "Page 1",
          tooltip: "Page1",
          icon: "icon-measure",
          page: (
            <TestModalSettingsPage
              settingsManager={UiFramework.settingsManager}
              title="Page 1"
            />
          ),
        },
        {
          tabId: "page-2",
          itemPriority: 20,
          label: "Page2",
          subLabel: "subLabel page2",
          tooltip: <span>react-tooltip</span>,
          icon: "icon-paintbrush",
          page: <div>Page 2</div>,
        },
        {
          tabId: "page-3",
          itemPriority: 30,
          label: "page3",
          page: <div>Page 3</div>,
        },
        {
          tabId: "page-4",
          itemPriority: 40,
          label: "page4",
          subLabel: "disabled page4",
          isDisabled: true,
          page: <div>Page 4</div>,
        },
      ];
    }
  }

  it("will display settings because they are registered", async () => {
    const settingsManager = UiFramework.settingsManager;

    const frontstageDef = new FrontstageDef();
    await frontstageDef.initializeFromConfig({
      id: "old",
      version: 1,
      usage: "General",
      contentGroup: TestUtils.TestContentGroup2,
    });
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);

    settingsManager.addSettingsProvider(new TestSettingsProvider());
    // const modalFrontstage = new SettingsModalFrontstage();
    // UiFramework.frontstages.openModalFrontstage(modalFrontstage);
    SettingsModalFrontstage.showSettingsStage(); // set the stage using static

    const wrapper = render(renderModalFrontstage(true));

    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll("div.uifw-modal-frontstage").length
      ).toEqual(1);
    });
    await waitFor(() => {
      const liPage1 = wrapper.container.querySelector(
        `li[data-for='page1']`
      ) as HTMLLIElement;
      expect(liPage1.classList.contains("core-active")).toEqual(true);
    });

    SettingsModalFrontstage.showSettingsStage("page2");
    await waitFor(() => {
      const liPage2 = wrapper.container.querySelector(
        `li[data-for='page-2']`
      ) as HTMLLIElement;
      expect(liPage2.classList.contains("core-active")).toEqual(true);
    });

    SettingsModalFrontstage.showSettingsStage("page-3");
    await waitFor(() => {
      const liPage3 = wrapper.container.querySelector(
        `li[data-for='page-3']`
      ) as HTMLLIElement;
      expect(liPage3.classList.contains("core-active")).toEqual(true);
    });

    settingsManager.removeSettingsProvider("AppSettingsProvider");
    UiFramework.frontstages.closeModalFrontstage();
    wrapper.unmount();
  });

  it("set initial stage via tab-id", async () => {
    const settingsManager = UiFramework.settingsManager;

    const frontstageDef = new FrontstageDef();
    await frontstageDef.initializeFromConfig({
      id: "old",
      version: 1,
      usage: "General",
      contentGroup: TestUtils.TestContentGroup2,
    });
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);

    settingsManager.addSettingsProvider(new TestSettingsProvider());
    SettingsModalFrontstage.showSettingsStage("page-3");

    const wrapper = render(renderModalFrontstage(true));
    await TestUtils.flushAsyncOperations();

    SettingsModalFrontstage.showSettingsStage("page-3");
    await waitFor(() => {
      const liPage3 = wrapper.container.querySelector(
        `li[data-for='page-3']`
      ) as HTMLLIElement;
      expect(liPage3.classList.contains("core-active")).toEqual(true);
    });

    settingsManager.removeSettingsProvider("AppSettingsProvider");
    UiFramework.frontstages.closeModalFrontstage();
    wrapper.unmount();
  });

  it("set initial stage via tab name", async () => {
    const settingsManager = UiFramework.settingsManager;

    const frontstageDef = new FrontstageDef();
    await frontstageDef.initializeFromConfig({
      id: "old",
      version: 1,
      usage: "General",
      contentGroup: TestUtils.TestContentGroup2,
    });
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);

    settingsManager.addSettingsProvider(new TestSettingsProvider());
    SettingsModalFrontstage.showSettingsStage("page2");

    const wrapper = render(renderModalFrontstage(true));

    await waitFor(() => {
      const liPage2 = wrapper.container.querySelector(
        `li[data-for='page-2']`
      ) as HTMLLIElement;
      expect(liPage2.classList.contains("core-active")).toEqual(true);
    });

    settingsManager.removeSettingsProvider("AppSettingsProvider");
    UiFramework.frontstages.closeModalFrontstage();
    wrapper.unmount();
  });
});
