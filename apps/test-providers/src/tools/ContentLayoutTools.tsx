/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { ConditionalStringValue } from "@itwin/appui-abstract";
import {
  ContentGroup,
  ContentGroupProps,
  ContentProps,
  LocalStateStorage,
  StageContentLayout,
  StageContentLayoutProps,
  StandardContentLayouts,
  SyncUiEventId,
  ToolbarActionItem,
  ToolbarItemUtilities,
  UiFramework,
  useConditionalValue,
} from "@itwin/appui-react";
import { IModelConnection, ScreenViewport, Tool } from "@itwin/core-frontend";
import { SvgWindow, SvgWindowSplitVertical } from "@itwin/itwinui-icons-react";

import layoutRestoreIconSvg from "@bentley/icons-generic/icons/download.svg";
import layoutSaveIconSvg from "@bentley/icons-generic/icons/upload.svg";
import { ViewportContent } from "../ui/ViewportContent";

function getIModelSpecificKey(
  inKey: string,
  iModelConnection: IModelConnection | undefined
) {
  const imodelId = iModelConnection?.iModelId ?? "unknownImodel";
  return `[${imodelId}]${inKey}`;
}

export async function hasSavedViewLayoutProps(
  activeFrontstageId: string,
  iModelConnection: IModelConnection | undefined
) {
  const localSettings = new LocalStateStorage();
  return localSettings.hasSetting(
    "ContentGroupLayout",
    getIModelSpecificKey(activeFrontstageId, iModelConnection)
  );
}

export async function getSavedViewLayoutProps(
  activeFrontstageId: string,
  iModelConnection: IModelConnection
) {
  const localSettings = new LocalStateStorage();
  const result = await localSettings.getSetting(
    "ContentGroupLayout",
    getIModelSpecificKey(activeFrontstageId, iModelConnection)
  );

  if (!result.setting) return undefined;

  // Parse StageContentLayoutProps
  const savedViewLayoutProps: StageContentLayoutProps | undefined =
    result.setting;

  return savedViewLayoutProps;
}

export class SaveContentLayoutTool extends Tool {
  public static override toolId = "SaveContentLayoutTool";
  public static override iconSpec = layoutSaveIconSvg;
  public static override get minArgs() {
    return 0;
  }
  public static override get maxArgs() {
    return 0;
  }
  public static override get keyin(): string {
    return "content layout save";
  }

  public static override get englishKeyin(): string {
    return this.keyin;
  }

  public override async run(): Promise<boolean> {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return true;

    const activeLayout = UiFramework.content.layouts.activeLayout;
    if (!activeLayout) return true;

    const activeContentGroup = UiFramework.content.layouts.activeContentGroup;
    if (!activeContentGroup) return true;
    const localSettings = new LocalStateStorage();

    // Create props for the Layout, ContentGroup and ViewStates
    const savedViewLayoutProps = StageContentLayout.viewLayoutToProps(
      activeLayout,
      activeContentGroup,
      true
    );

    if (savedViewLayoutProps.contentLayoutProps)
      delete savedViewLayoutProps.contentLayoutProps;

    if (frontstageDef.contentGroupProvider)
      savedViewLayoutProps.contentGroupProps =
        frontstageDef.contentGroupProvider.prepareToSaveProps(
          savedViewLayoutProps.contentGroupProps
        );

    savedViewLayoutProps.contentGroupProps.contents =
      savedViewLayoutProps.contentGroupProps.contents.map((content) => {
        const newContent = content;
        delete newContent.content;
        return newContent;
      });

    await localSettings.saveSetting(
      "ContentGroupLayout",
      getIModelSpecificKey(frontstageDef.id, UiFramework.getIModelConnection()),
      savedViewLayoutProps
    );
    return true;
  }
}

export class RestoreSavedContentLayoutTool extends Tool {
  public static override toolId = "RestoreSavedContentLayoutTool";
  public static override iconSpec = layoutRestoreIconSvg;
  public static override get minArgs() {
    return 0;
  }
  public static override get maxArgs() {
    return 0;
  }
  public static override get keyin(): string {
    return "content layout restore";
  }
  public static override get englishKeyin(): string {
    return this.keyin;
  }

  public override async run(): Promise<boolean> {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return true;

    const iModelConnection = UiFramework.getIModelConnection();
    if (!iModelConnection) return true;

    const savedViewLayoutProps = await getSavedViewLayoutProps(
      frontstageDef.id,
      iModelConnection
    );
    if (!savedViewLayoutProps) return true;

    let contentGroupProps = savedViewLayoutProps.contentGroupProps;
    if (frontstageDef.contentGroupProvider)
      contentGroupProps =
        frontstageDef.contentGroupProvider.applyUpdatesToSavedProps(
          savedViewLayoutProps.contentGroupProps
        );

    const contentGroup = new ContentGroup({
      ...contentGroupProps,
      contents: contentGroupProps.contents.map((content) => {
        return {
          ...content,
          content: <ViewportContent />,
        };
      }),
    });

    // activate the layout
    await UiFramework.content.layouts.setActiveContentGroup(contentGroup);

    // emphasize the elements
    StageContentLayout.emphasizeElementsFromProps(
      contentGroup,
      savedViewLayoutProps
    );
    return true;
  }
}

function SplitWindowIcon() {
  const split = useConditionalValue(
    () =>
      1 ===
      UiFramework.frontstages.activeFrontstageDef?.contentGroup
        ?.contentPropsList.length,
    [SyncUiEventId.ActiveContentChanged]
  );
  if (split) return <SvgWindowSplitVertical />;
  return <SvgWindow />;
}

export function createSplitSingleViewportToolbarItem(
  getViewport: (content: ContentProps) => ScreenViewport | undefined,
  // eslint-disable-next-line deprecation/deprecation
  overrides?: Omit<Partial<ToolbarActionItem>, "icon">
) {
  const id = "splitSingleViewportCommandDef";
  const label = new ConditionalStringValue(
    () =>
      1 ===
      UiFramework.frontstages.activeFrontstageDef?.contentGroup
        ?.contentPropsList.length
        ? "Split Content View"
        : "Single Content View",
    [SyncUiEventId.ActiveContentChanged]
  );
  const execute = async () => {
    // if the active frontstage is only showing an single viewport then split it and have two copies of it
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!activeFrontstageDef) return;

    const contentGroup = activeFrontstageDef.contentGroup;
    if (!contentGroup) return;

    if (contentGroup.contentPropsList.length === 0) return;

    const viewport = getViewport(contentGroup.contentPropsList[0]);
    if (!viewport) return;

    if (1 === contentGroup.contentPropsList.length) {
      const contentPropsArray: ContentProps[] = [];
      const viewState1 = viewport.view.clone();
      viewState1.description = "imodel-view-0";
      contentPropsArray.push({
        id: "imodel-view-0",
        classId: "",
        content: (
          <ViewportContent
            viewState={viewState1}
            imodel={viewport.view.iModel}
          />
        ),
      });

      const viewState2 = viewport.view.clone();
      viewState2.description = "imodel-view-1";
      contentPropsArray.push({
        id: "imodel-view-1",
        classId: "",
        content: (
          <ViewportContent
            viewState={viewState2}
            imodel={viewport.view.iModel}
          />
        ),
      });

      let contentGroupProps: ContentGroupProps = {
        id: "split-vertical-group",
        layout: StandardContentLayouts.twoVerticalSplit,
        contents: contentPropsArray,
      };

      if (activeFrontstageDef.contentGroupProvider)
        contentGroupProps =
          activeFrontstageDef.contentGroupProvider.applyUpdatesToSavedProps(
            contentGroupProps
          );

      const newContentGroup = new ContentGroup(contentGroupProps);
      await UiFramework.content.layouts.setActiveContentGroup(newContentGroup);
    } else if (2 === contentGroup.contentPropsList.length) {
      const contentPropsArray: ContentProps[] = [];
      contentPropsArray.push({
        id: "imodel-view-0",
        classId: "",
        content: (
          <ViewportContent
            viewState={viewport.view.clone()}
            imodel={viewport.view.iModel}
            renderViewOverlay={() => undefined}
          />
        ),
      });

      let contentGroupProps: ContentGroupProps = {
        id: "single-content",
        layout: StandardContentLayouts.singleView,
        contents: contentPropsArray,
      };
      if (activeFrontstageDef.contentGroupProvider)
        contentGroupProps =
          activeFrontstageDef.contentGroupProvider.applyUpdatesToSavedProps(
            contentGroupProps
          );

      const newContentGroup = new ContentGroup(contentGroupProps);
      await UiFramework.content.layouts.setActiveContentGroup(newContentGroup);
    }
  };
  return ToolbarItemUtilities.createActionItem({
    id,
    icon: <SplitWindowIcon />,
    label,
    execute,
    ...overrides,
  });
}
