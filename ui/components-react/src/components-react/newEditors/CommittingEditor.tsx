/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useRef, useState } from "react";
import { Editor } from "./Editor.js";
import type { Value } from "./values/Values.js";
import type { EditorProps } from "./Types.js";

type CommittingEditorProps = Omit<EditorProps, "onFinish" | "onChange"> & {
  onCommit: (value?: Value) => void;
  onCancel?: () => void;
};

/**
 *
 */
export function CommittingEditor({
  metadata,
  value,
  onCommit,
  onCancel,
  size,
  ...restProps
}: CommittingEditorProps) {
  const [currentValue, setCurrentValue] = useState<Value | undefined>(value);
  const currentValueRef = useRef({ isChanged: false, value });

  const handleChange = (newValue?: Value) => {
    currentValueRef.current = { isChanged: true, value: newValue };
    setCurrentValue(newValue);
  };

  const handleCommit = () => {
    if (currentValueRef.current.isChanged) {
      onCommit(currentValueRef.current.value);
      return;
    }

    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();

    if (e.key === "Enter" || e.key === "Tab") {
      handleCommit();
    } else if (e.key === "Escape") {
      onCancel?.();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={handleKeyDown}>
      <Editor
        {...restProps}
        metadata={metadata}
        value={currentValue}
        onChange={handleChange}
        size={size}
        onFinish={handleCommit}
      />
    </div>
  );
}
