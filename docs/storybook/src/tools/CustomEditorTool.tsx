/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
  BasePropertyEditorParams,
  DialogItem,
  DialogPropertySyncItem,
  PropertyDescription,
} from "@itwin/appui-abstract";
import { EventHandled } from "@itwin/core-frontend";
import { StoryPrimitiveTool } from "./StoryTool";

const properties = {
  tags: "tagsProperty",
} as const;

function createTagsProperty(tags: TagData[]): PropertyDescription {
  return {
    typename: "custom-tags",
    name: properties.tags,
    displayLabel: "Custom Property",
    editor: {
      // Provide tag data to the custom property editor component
      params: [createTagsParam(tags)],
    },
  };
}

export class CustomEditorTool extends StoryPrimitiveTool {
  public static override toolId = "CustomEditorTool";

  // All tags are active initially
  private _activeTagIds: TagData["id"][] = tagsStore.map((tag) => tag.id);

  public override async onDataButtonDown() {
    // Reset active tags
    this._activeTagIds = tagsStore.map((tag) => tag.id);
    this.syncToolSettingsProperties([
      {
        propertyName: properties.tags,
        property: createTagsProperty(tagsStore),
        value: {},
      },
    ]);
    return EventHandled.Yes;
  }

  public override supplyToolSettingsProperties(): DialogItem[] | undefined {
    const activeTags = tagsStore.filter((tag) =>
      this._activeTagIds.includes(tag.id)
    );
    return [
      {
        property: createTagsProperty(activeTags),
        // We are using params to pass active tag data to the component
        value: {},
        editorPosition: {
          columnIndex: 0,
          rowPriority: 0,
        },
      },
    ];
  }

  public override async applyToolSettingPropertyChange(
    updatedValue: DialogPropertySyncItem
  ): Promise<boolean> {
    // Sync active tag changes from the component
    switch (updatedValue.propertyName) {
      case properties.tags: {
        const tagIdsStr = updatedValue.value.value;
        if (typeof tagIdsStr !== "string") return false;
        this._activeTagIds = JSON.parse(tagIdsStr);
        return true;
      }
    }

    return false;
  }
}

// Custom property editor param for tags.
export interface TagsParam extends BasePropertyEditorParams {
  type: "custom-tags-param";
  tags: TagData[];
}

// Helper to create custom tags param.
export function createTagsParam(tags: TagData[]): BasePropertyEditorParams {
  return {
    type: createTagsParam.type,
    tags,
  } as TagsParam;
}
createTagsParam.type = "custom-tags-param";

// Data structure for tags
export interface TagData {
  id: string;
  label: string;
}

const tagsStore: TagData[] = [
  {
    id: "1",
    label: "Tag 1",
  },
  {
    id: "2",
    label: "Tag 2",
  },
  {
    id: "3",
    label: "Tag 3",
  },
];
