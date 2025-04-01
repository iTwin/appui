/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import * as React from "react";
import type { Value } from "./values/Values.js";
import { areEqual } from "./values/ValueUtilities.js";

interface UseCommittableValueProps {
  initialValue?: Value;
  onCommit: (value?: Value) => void;
  onCancel?: () => void;
}

/**
 * Custom React hook that provides to commit or cancel value changes by editor using
 * `Enter` or `Escape` keys.
 *
 * Example usage:
 *
 * ```tsx
 * function MyValueEditor({ initialValue, ...editorProps }: Props) {
 *   const { value, onChange, onKeyDown, commit, cancel } = useCommittableValue({
 *     initialValue,
 *     onCommit: (newValue) => {
 *       // commit new value
 *     }
 *     onCancel: () => {
 *       // restore to initial value or close editor
 *     }
 *   })
 *
 *   return <div onKeyDown={onKeydown}>
 *     <Editor
 *       {...editorProps}
 *       value={value}
 *       onChange={onChange}
 *       commit={commit}
 *       cancel={cancel}
 *     />
 *   </div>
 * }
 * ```
 *
 * @beta
 */
export function useCommittableValue({
  initialValue,
  onCancel,
  onCommit,
}: UseCommittableValueProps) {
  const initialValueRef = React.useRef(initialValue);
  const [currentValue, setCurrentValue] = React.useState<Value | undefined>(
    initialValue
  );
  const currentValueRef = React.useRef<{
    state: "changed" | "cancelled" | "initial";
    value?: Value;
  }>({
    state: "initial",
    value: initialValue,
  });

  const handleChange = (newValue?: Value) => {
    currentValueRef.current = { state: "changed", value: newValue };
    setCurrentValue(newValue);
  };

  const handleCommit = () => {
    if (
      currentValueRef.current.state === "changed" &&
      !areEqual(currentValueRef.current.value, initialValueRef.current)
    ) {
      onCommit(currentValueRef.current.value);
      return;
    }
    if (currentValueRef.current.state === "cancelled") {
      return;
    }
    onCancel?.();
  };

  const handleCancel = () => {
    currentValueRef.current = { state: "cancelled" };
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();

    if (e.key === "Enter" || e.key === "Tab") {
      handleCommit();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return {
    onChange: handleChange,
    onKeydown: handleKeyDown,
    commit: handleCommit,
    cancel: handleCancel,
    value: currentValue,
  };
}
