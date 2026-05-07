/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { Tag, TagContainer } from "@itwin/itwinui-react";
import {
  PropertyEditorBase,
  PropertyEditorProps,
  TypeEditor,
} from "@itwin/components-react";
import { createTagsParam, TagsParam } from "./CustomEditorTool";

export class TagsPropertyEditorLegacy extends PropertyEditorBase {
  public get reactNode(): React.ReactNode {
    return <CustomTagsEditor />;
  }
}

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
