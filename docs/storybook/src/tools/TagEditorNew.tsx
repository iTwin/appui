/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Tag, TagContainer } from "@itwin/itwinui-react";
import {
  createEditorSpec,
  EditorProps,
  isPropertyRecordEditorMetadata,
  PropertyRecordEditorMetadata,
  TextValue,
  ValueUtilities,
} from "@itwin/components-react";
import { createTagsParam, TagsParam } from "./CustomEditorTool";

export const TagsEditorSpec = createEditorSpec({
  Editor: TagsEditor,
  isMetadataSupported: isPropertyRecordEditorMetadata,
  isValueSupported: ValueUtilities.isText,
});

// eslint-disable-next-line react-refresh/only-export-components
function TagsEditor({
  metadata,
  onChange,
}: EditorProps<PropertyRecordEditorMetadata, TextValue>) {
  const tags = React.useMemo(() => {
    const params = metadata.params;
    const tagsParam = params?.find((param): param is TagsParam => {
      return param.type === createTagsParam.type;
    });
    return tagsParam?.tags ?? [];
  }, [metadata]);
  return (
    <TagContainer>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          style={{
            blockSize: "var(--iui-size-l)",
          }}
          onRemove={() => {
            const tagIds = tags.map((t) => t.id);
            const newTagIds = tagIds.filter((id) => id !== tag.id);
            onChange({
              value: JSON.stringify(newTagIds),
            });
          }}
        >
          {tag.label}
        </Tag>
      ))}
    </TagContainer>
  );
}
