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
  IModelViewportControl,
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
  iModelConnection: IModelConnection | undefined
) {
  const localSettings = new LocalStateStorage();
  const result = await localSettings.getSetting(
    "ContentGroupLayout",
    getIModelSpecificKey(activeFrontstageId, iModelConnection)
  );

  if (result.setting) {
    // Parse StageContentLayoutProps
    const savedViewLayoutProps: StageContentLayoutProps = result.setting;
    if (iModelConnection) {
      // Create ViewStates
      const viewStates = await StageContentLayout.viewStatesFromProps(
        iModelConnection,
        savedViewLayoutProps
      );
      if (0 === viewStates.length) return undefined;

      // Add applicationData to the ContentProps
      savedViewLayoutProps.contentGroupProps.contents.forEach(
        (contentProps: ContentProps, index: number) => {
          contentProps.applicationData = {
            viewState: viewStates[index],
            iModelConnection,
          };
        }
      );
    }
    return savedViewLayoutProps;
  }
  return undefined;
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
        (contentProps: ContentProps) => {
          if (contentProps.applicationData) {
            if (contentProps.applicationData.iModelConnection)
              delete contentProps.applicationData.iModelConnection;
            if (contentProps.applicationData.viewState)
              delete contentProps.applicationData.viewState;
          }
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
    if (UiFramework.frontstages.activeFrontstageDef) {
      const savedViewLayoutProps = await getSavedViewLayoutProps(
        UiFramework.frontstages.activeFrontstageDef.id,
        UiFramework.getIModelConnection()
      );
      if (savedViewLayoutProps) {
        let contentGroupProps = savedViewLayoutProps.contentGroupProps;
        if (UiFramework.frontstages.activeFrontstageDef.contentGroupProvider)
          contentGroupProps =
            UiFramework.frontstages.activeFrontstageDef.contentGroupProvider.applyUpdatesToSavedProps(
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
      }
    }
    return true;
  }
}

const getSplitWindowCmdIcon = () => {
  return 1 ===
    UiFramework.frontstages.activeFrontstageDef?.contentGroup?.getContentControls()
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
      UiFramework.frontstages.activeFrontstageDef?.contentGroup?.getContentControls()
        .length
        ? "Split Content View"
        : "Single Content View",
    [SyncUiEventId.ActiveContentChanged]
  );
  const execute = async () => {
    // if the active frontstage is only showing an single viewport then split it and have two copies of it
    const activeFrontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (
      activeFrontstageDef &&
      1 === activeFrontstageDef.contentGroup?.getContentControls().length &&
      activeFrontstageDef.contentControls[0].viewport
    ) {
      const vp = activeFrontstageDef.contentControls[0].viewport;
      if (vp) {
        const contentPropsArray: ContentProps[] = [];
        contentPropsArray.push({
          id: "imodel-view-0",
          classId: IModelViewportControl.id,
          applicationData: {
            viewState: vp.view.clone(),
            iModelConnection: vp.view.iModel,
            featureOptions: {
              defaultViewOverlay: {
                enableScheduleAnimationViewOverlay: true,
                enableAnalysisTimelineViewOverlay: true,
                enableSolarTimelineViewOverlay: true,
              },
            },
          },
        });
        contentPropsArray.push({
          id: "imodel-view-1",
          classId: IModelViewportControl.id,
          applicationData: {
            viewState: vp.view.clone(),
            iModelConnection: vp.view.iModel,
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
      2 === activeFrontstageDef.contentGroup?.getContentControls().length &&
      activeFrontstageDef.contentControls[0].viewport
    ) {
      const vp = activeFrontstageDef.contentControls[0].viewport;
      if (vp) {
        const contentPropsArray: ContentProps[] = [];
        contentPropsArray.push({
          id: "imodel-view-0",
          classId: IModelViewportControl.id,
          applicationData: {
            viewState: vp.view.clone(),
            iModelConnection: vp.view.iModel,
          },
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
