/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  type PropertyDescription,
  type PropertyRecord,
  StandardTypeNames,
} from "@itwin/appui-abstract";
import type { EditorSpec } from "@itwin/components-react";
import { EditorsRegistryProvider } from "@itwin/components-react";
import { usePreviewFeatures } from "../PreviewFeatures.js";
import { LockPropertyEditorName } from "../../editors/LockEditor.js";
import { LockEditorSpec } from "../../new-editors/LockEditor.js";
import { TextEditorSpec } from "../../new-editors/TextEditor.js";
import { NumericEditorSpec } from "../../new-editors/NumericEditor.js";
import { CustomNumberEditorSpec } from "../../new-editors/CustomNumberEditor.js";

/** @internal */
export function useLockButtonPropertyRecord(
  record: PropertyRecord,
  enabled: boolean
) {
  const { toolSettingsLockButton } = usePreviewFeatures();
  return React.useMemo(() => {
    if (!enabled) return record;
    if (!toolSettingsLockButton) return record;

    // Allow consumers to override the default lock editor.
    if (!isDefaultLockEditor(record.property)) return record;

    const newRecord = record.copyWithNewValue(record.value, {
      ...record.property,
      editor: {
        ...record.property.editor,
        name: LockPropertyEditorName,
      },
    });
    return newRecord;
  }, [enabled, toolSettingsLockButton, record]);
}

function isDefaultLockEditor(property: PropertyDescription) {
  if (
    property.typename !== StandardTypeNames.Bool.valueOf() &&
    property.typename !== StandardTypeNames.Boolean.valueOf()
  )
    return false;
  if (property.editor?.name) return false;
  return true;
}

/** @internal */
export function ToolSettingsEditorsProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <EditorsRegistryProvider
      editors={React.useCallback((editors: EditorSpec[]) => {
        return [
          ...editors,
          CustomNumberEditorSpec,
          LockEditorSpec,
          TextEditorSpec,
          NumericEditorSpec,
        ];
      }, [])}
    >
      {children}
    </EditorsRegistryProvider>
  );
}
