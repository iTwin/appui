/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BasePropertyEditorParams,
  DialogItem,
  DialogPropertySyncItem,
  PropertyDescription,
  PropertyValueFormat,
} from "@itwin/appui-abstract";
import { EventHandled, PrimitiveTool } from "@itwin/core-frontend";
import { Tag, TagContainer } from "@itwin/itwinui-react";
import {
  PropertyEditorBase,
  PropertyEditorProps,
  TypeEditor,
} from "@itwin/components-react";

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

export class CustomEditorTool extends PrimitiveTool {
  public static override toolId = "CustomEditorTool";

  // All tags are active initially
  private _activeTagIds: TagData["id"][] = tagsStore.map((tag) => tag.id);

  public override requireWriteableTarget() {
    return false;
  }

  public override onRestartTool() {
    return this.exitTool();
  }

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

export class CustomTagsPropertyEditor extends PropertyEditorBase {
  public get reactNode(): React.ReactNode {
    return <CustomTagsEditor />;
  }
}

// Data structure for tags
interface TagData {
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

// Custom property editor param for tags.
interface TagsParam extends BasePropertyEditorParams {
  type: "custom-tags-param";
  tags: TagData[];
}

// Helper to create custom tags param.
function createTagsParam(tags: TagData[]): BasePropertyEditorParams {
  return {
    type: createTagsParam.type,
    tags,
  } as TagsParam;
}
createTagsParam.type = "custom-tags-param";

// eslint-disable-next-line react-refresh/only-export-components
const CustomTagsEditor = React.forwardRef<TypeEditor, PropertyEditorProps>(
  (props, ref) => {
    const { propertyRecord } = props;
    const elRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(
      ref,
      () => ({
        getPropertyValue: async () => {
          return undefined;
        },
        htmlElement: null,
        hasFocus: false,
      }),
      []
    );
    const tags = React.useMemo(() => {
      if (!propertyRecord) return [];
      const params = propertyRecord.property.editor?.params;
      const tagsParam = params?.find((param): param is TagsParam => {
        return param.type === createTagsParam.type;
      });
      return tagsParam?.tags ?? [];
    }, [propertyRecord]);

    return (
      <TagContainer ref={elRef}>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            style={{
              blockSize: "var(--iui-size-l)",
            }}
            onRemove={() => {
              if (!props.propertyRecord) return;

              const tagIds = tags.map((t) => t.id);
              const newTagIds = tagIds.filter((id) => id !== tag.id);
              props.onCommit?.({
                propertyRecord: props.propertyRecord,
                newValue: {
                  valueFormat: PropertyValueFormat.Primitive,
                  value: JSON.stringify(newTagIds),
                },
              });
            }}
          >
            {tag.label}
          </Tag>
        ))}
      </TagContainer>
    );
  }
);
