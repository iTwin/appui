import * as React from "react";
import { useRef, useState } from "react";
import type { Value, ValueMetadata } from "./Types.js";
import { Editor } from "./Editor.js";

interface CommittingEditorProps {
  metadata: ValueMetadata;
  value?: Value;
  onCommit: (value: Value) => void;
  onCancel?: () => void;
  size?: "small" | "large";
}

/**
 *
 */
export function CommittingEditor({
  metadata,
  value,
  onCommit,
  onCancel,
  size,
}: CommittingEditorProps) {
  const [currentValue, setCurrentValue] = useState<Value | undefined>();
  const currentValueRef = useRef(currentValue);

  const handleChange = (newValue: Value) => {
    currentValueRef.current = newValue;
    setCurrentValue(newValue);
  };

  const handleCommit = () => {
    if (currentValueRef.current !== undefined) {
      onCommit(currentValueRef.current);
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
        metadata={metadata}
        value={currentValue ?? value}
        onChange={handleChange}
        size={size}
        onFinish={handleCommit}
      />
    </div>
  );
}
