/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  IModelViewportControl,
  PreviewFeatures,
  PreviewFeaturesProvider,
  StandardContentLayouts,
  UiFramework,
} from "@itwin/appui-react";
import { IModelApp } from "@itwin/core-frontend";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage } from "../Utils";
import {
  LockPropertyTool,
  createLockPropertyTool,
} from "../tools/LockPropertyTool";
import {
  CustomFormattedNumberParams,
  PropertyEditorParamTypes,
  StandardEditorNames,
  StandardTypeNames,
} from "@itwin/appui-abstract";

type PreviewStoryProps = Pick<
  Required<PreviewFeatures>,
  "toolSettingsLockButton"
> & {
  lockLabel?: string;
  disabled?: boolean;
  propertyType?: `${StandardTypeNames.Boolean}` | `${StandardTypeNames.Number}`;
};

/** `toolSettingsLockButton` preview feature. Displays the default tool settings lock editor as an icon button rather than a checkbox. */
export function PreviewStory(props: PreviewStoryProps) {
  return (
    <PreviewFeaturesProvider
      features={{
        toolSettingsLockButton: props.toolSettingsLockButton,
      }}
    >
      <AppUiStory
        layout="fullscreen"
        demoIModel={{ default: "blank" }}
        frontstages={[
          createFrontstage({
            contentGroupProps: {
              id: "ViewportContentGroup",
              layout: StandardContentLayouts.singleView,
              contents: [
                {
                  id: "ViewportContent",
                  classId: IModelViewportControl,
                },
              ],
            },
            hideToolSettings: false,
          }),
        ]}
        onInitialize={async () => {
          IModelApp.tools.register(
            createLockPropertyTool({
              lockLabel: props.lockLabel,
              disabled: props.disabled,
              initialValue: props.propertyType === "number" ? 1 : undefined,
              propertyOverrides: {
                typename: props.propertyType,
                ...(props.propertyType === "number"
                  ? {
                      editor: {
                        name: StandardEditorNames.NumberCustom,
                        params: [
                          {
                            type: PropertyEditorParamTypes.CustomFormattedNumber,
                            formatFunction: (x) => x.toString(),
                            parseFunction: (x) => ({
                              value: Number(x),
                              parseError: undefined,
                            }),
                          } as CustomFormattedNumberParams,
                        ],
                      },
                    }
                  : {}),
              },
            }),
            UiFramework.localizationNamespace
          );
        }}
        onFrontstageActivated={async () => {
          await IModelApp.tools.run(LockPropertyTool.toolId);
        }}
      />
    </PreviewFeaturesProvider>
  );
}
