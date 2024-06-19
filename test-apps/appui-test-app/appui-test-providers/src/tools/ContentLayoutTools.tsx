/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  ConditionalStringValue,
  StandardContentLayouts,
} from "@itwin/appui-abstract";
import {
  ContentGroup,
  ContentGroupProps,
  ContentProps,
  StageContentLayout,
  StageContentLayoutProps,
  SyncUiEventId,
  ToolbarItemUtilities,
  UiFramework,
} from "@itwin/appui-react";
import { IModelConnection, Tool } from "@itwin/core-frontend";
import { ConditionalIconItem, LocalStateStorage } from "@itwin/core-react";
import { SvgWindow, SvgWindowSplitVertical } from "@itwin/itwinui-icons-react";

import layoutRestoreIconSvg from "@bentley/icons-generic/icons/download.svg";
import layoutSaveIconSvg from "@bentley/icons-generic/icons/upload.svg";
import { ViewportComponent } from "@itwin/imodel-components-react";

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
    if (
      UiFramework.frontstages.activeFrontstageDef &&
      UiFramework.content.layouts.activeLayout &&
      UiFramework.content.layouts.activeContentGroup
    ) {
      const localSettings = new LocalStateStorage();

      // Create props for the Layout, ContentGroup and ViewStates
      const savedViewLayoutProps = StageContentLayout.viewLayoutToProps(
        UiFramework.content.layouts.activeLayout,
        UiFramework.content.layouts.activeContentGroup,
        true,
        (contentProps) => {
          if (!contentProps.applicationData) return;
          delete contentProps.applicationData.iModelConnection;
          delete contentProps.applicationData.viewState;
        }
      );

      if (savedViewLayoutProps.contentLayoutProps)
        delete savedViewLayoutProps.contentLayoutProps;

      if (UiFramework.frontstages.activeFrontstageDef.contentGroupProvider)
        savedViewLayoutProps.contentGroupProps =
          UiFramework.frontstages.activeFrontstageDef.contentGroupProvider.prepareToSaveProps(
            savedViewLayoutProps.contentGroupProps
          );

      await localSettings.saveSetting(
        "ContentGroupLayout",
        getIModelSpecificKey(
          UiFramework.frontstages.activeFrontstageDef.id,
          UiFramework.getIModelConnection()
        ),
        savedViewLayoutProps
      );
    }
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
    const contentGroup = new ContentGroup(contentGroupProps);

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

const getSplitWindowCmdIcon = () => {
  return 1 ===
    UiFramework.frontstages.activeFrontstageDef?.contentGroup?.contentPropsList
      .length ? (
    <SvgWindowSplitVertical />
  ) : (
    <SvgWindow />
  );
};

export function createSplitSingleViewportToolbarItem() {
  const id = "splitSingleViewportCommandDef";
  const icon = new ConditionalIconItem(getSplitWindowCmdIcon, [
    SyncUiEventId.ActiveContentChanged,
  ]);
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
    if (
      activeFrontstageDef &&
      1 === activeFrontstageDef.contentGroup?.contentPropsList.length &&
      activeFrontstageDef.contentControls[0].viewport
    ) {
      const vp = activeFrontstageDef.contentControls[0].viewport;
      if (vp) {
        const contentPropsArray: ContentProps[] = [];
        const viewState1 = vp.view.clone();
        viewState1.description = "imodel-view-0";
        contentPropsArray.push({
          id: "imodel-view-0",
          classId: "",
          content: (
            <ViewportComponent viewState={viewState1} imodel={vp.view.iModel} />
          ),
          applicationData: {
            featureOptions: {
              defaultViewOverlay: {
                enableScheduleAnimationViewOverlay: true,
                enableAnalysisTimelineViewOverlay: true,
                enableSolarTimelineViewOverlay: true,
              },
            },
          },
        });

        const viewState2 = vp.view.clone();
        viewState2.description = "imodel-view-1";
        contentPropsArray.push({
          id: "imodel-view-1",
          classId: "",
          content: (
            <ViewportComponent viewState={viewState2} imodel={vp.view.iModel} />
          ),
          applicationData: {
            featureOptions: {
              defaultViewOverlay: {
                enableScheduleAnimationViewOverlay: true,
                enableAnalysisTimelineViewOverlay: true,
                enableSolarTimelineViewOverlay: true,
              },
            },
          },
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

        const contentGroup = new ContentGroup(contentGroupProps);
        await UiFramework.content.layouts.setActiveContentGroup(contentGroup);
      }
    } else if (
      activeFrontstageDef &&
      2 === activeFrontstageDef.contentGroup?.contentPropsList.length &&
      activeFrontstageDef.contentControls[0].viewport
    ) {
      const vp = activeFrontstageDef.contentControls[0].viewport;
      if (vp) {
        const contentPropsArray: ContentProps[] = [];
        contentPropsArray.push({
          id: "imodel-view-0",
          classId: "",
          content: (
            <ViewportComponent
              viewState={vp.view.clone()}
              imodel={vp.view.iModel}
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

        const contentGroup = new ContentGroup(contentGroupProps);
        await UiFramework.content.layouts.setActiveContentGroup(contentGroup);
      }
    }
  };
  return ToolbarItemUtilities.createActionItem(id, 0, icon, label, execute);
}
