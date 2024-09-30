/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  ContentGroup,
  ContentGroupProvider,
  Frontstage,
  FrontstageUtilities,
  StageContentLayout,
  StageUsage,
  StandardContentLayouts,
  UiFramework,
} from "@itwin/appui-react";
import { getSavedViewLayoutProps } from "../../tools/ContentLayoutTools";
import { ViewportContent } from "../ViewportContent";

/** The ContentLayoutStageContentGroupProvider provides a class with the primary method `provideContentGroup` to provide a ContentGroup
 * to a stage when the stage is activated. This provider will look to see if the user saved out a ContentGroup to use when a stage and
 * specific iModel is opened. See `SaveContentLayoutTool` in `ContentLayoutTools.tsx` to see tool that saved the layout and ViewStates.
 * If no saved state was found `UiFramework.getDefaultViewState` is used to specify the ViewState and `StandardContentLayouts.singleView`
 * is used to specify the layout. The `prepareToSaveProps` prepare the JSON to be saved to local storage when saving ContentGroup data. The
 * method `applyUpdatesToSavedProps` is used to make any updates to the saved JSON before it is applied to the stage.
 */
class ContentLayoutStageContentGroupProvider extends ContentGroupProvider {
  public override async contentGroup(
    config: Frontstage
  ): Promise<ContentGroup> {
    const primaryViewState = UiFramework.getDefaultViewState()?.clone();
    if (primaryViewState) {
      primaryViewState.description = "imodel-view-primary";
    }
    const id = "primaryContent";
    const defaultContent = new ContentGroup({
      id: "content-layout-stage-frontstage-main-content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id,
          classId: "",
          content: (
            <ViewportContent
              contentId={id}
              renderViewOverlay={() => undefined}
              viewState={primaryViewState}
            />
          ),
        },
      ],
    });

    const iModelConnection = UiFramework.getIModelConnection();
    if (!iModelConnection) return defaultContent;

    const savedViewLayoutProps = await getSavedViewLayoutProps(
      config.id,
      iModelConnection
    );
    if (!savedViewLayoutProps) return defaultContent;

    const viewStates = await StageContentLayout.viewStatesFromProps(
      iModelConnection,
      savedViewLayoutProps
    );
    if (viewStates.length > 0) {
      const defaultViewState = viewStates[0];
      if (defaultViewState) {
        UiFramework.setDefaultViewState(defaultViewState);
      }
    }

    return new ContentGroup({
      ...savedViewLayoutProps.contentGroupProps,
      contents: savedViewLayoutProps.contentGroupProps.contents.map(
        (content, index) => {
          const viewState = viewStates[index];
          return {
            ...content,
            content: (
              <ViewportContent
                viewState={viewState}
                renderViewOverlay={() => undefined}
              />
            ),
          };
        }
      ),
    });
  }
}

const contentGroupProvider = new ContentLayoutStageContentGroupProvider();
export function createContentLayoutFrontstage() {
  return FrontstageUtilities.createStandardFrontstage({
    id: createContentLayoutFrontstage.stageId,
    contentGroupProps: contentGroupProvider,
    cornerButton: <BackstageAppButton icon="icon-bentley-systems" />,
    usage: StageUsage.General,
  });
}
createContentLayoutFrontstage.stageId = "content-layout";
