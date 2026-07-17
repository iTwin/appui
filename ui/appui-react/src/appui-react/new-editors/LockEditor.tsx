/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type {
  BooleanValue,
  EditorProps,
  ValueMetadata,
} from "@itwin/components-react";
import { createEditorSpec, ValueUtilities } from "@itwin/components-react";
import { IconButton } from "@itwin/itwinui-react";
import { SvgLock, SvgLockUnlocked } from "@itwin/itwinui-icons-react";
import { LockPropertyEditorName } from "../editors/LockEditor.js";
import {
  PropertyEditorContext,
  useLockProperty,
} from "../editors/LockProvider.js";
import { StrataKitIcon } from "../preview/use-stratakit/StrataKitIcon.js";

const svgLock = async () => import("@stratakit/icons/lock.svg");
const svgLockUnlocked = async () =>
  import("@stratakit/icons/lock-unlocked.svg");

/** @internal */
export const LockEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is ValueMetadata =>
    metadata.type === "bool" &&
    metadata.preferredEditor === LockPropertyEditorName,
  isValueSupported: ValueUtilities.isBoolean,
  Editor: LockEditor,
});

/** Used in tool settings as the default lock editor when `toolSettingsLockButton` preview feature is enabled.
 * @internal
 */
function LockEditor({
  value,
  onChange,
  commit,
  disabled,
  size,
}: EditorProps<ValueMetadata, BooleanValue>) {
  const context = React.useContext(PropertyEditorContext);
  const property = useLockProperty(
    context
      ? {
          provider: context.uiDataProvider,
          itemPropertyName: context.itemPropertyName,
        }
      : undefined
  );
  const displayLabel = property?.property.displayLabel;
  const label = displayLabel ? displayLabel : "Toggle lock";

  const currentValue = value?.value ?? false;
  return (
    <IconButton
      label={label}
      size={size}
      styleType="borderless"
      isActive={currentValue}
      disabled={disabled}
      onClick={() => {
        const newValue = { value: !currentValue };
        onChange(newValue);
        commit?.();
      }}
    >
      {currentValue ? (
        <StrataKitIcon href={svgLock} iconNode={<SvgLock />} />
      ) : (
        <StrataKitIcon href={svgLockUnlocked} iconNode={<SvgLockUnlocked />} />
      )}
    </IconButton>
  );
}
