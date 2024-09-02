/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import "./EditorContainer.scss";
import * as React from "react";
import { Key } from "ts-key-enum";
import type {
  Primitives,
  PrimitiveValue,
  PropertyRecord,
  PropertyValue,
} from "@itwin/appui-abstract";
import { PropertyValueFormat, UiAdmin } from "@itwin/appui-abstract";
import type { CommonProps } from "@itwin/core-react";
import type {
  AsyncErrorMessage,
  PropertyEditorBase,
} from "./PropertyEditorManager";
import { PropertyEditorManager } from "./PropertyEditorManager";

/** Arguments for the Property Updated event callback
 * @public
 */
export interface PropertyUpdatedArgs {
  /** The property being updated. */
  propertyRecord: PropertyRecord;
  /** The new value for the property. */
  newValue: PropertyValue;
}

/** Properties for a property editor component
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface PropertyEditorProps extends CommonProps {
  /** The property being updated. */
  propertyRecord?: PropertyRecord;
  /** Handler for commit */
  onCommit?: (args: PropertyUpdatedArgs) => void;
  /** Handler for cancel */
  onCancel?: () => void;
  /** Handler for blur */
  onBlur?: (event: React.FocusEvent) => void;
  /** Indicates whether the Property Editor should set focus */
  setFocus?: boolean;
  /**
   * Indicates whether value change should call onCommit().
   * @internal
   */
  shouldCommitOnChange?: boolean;
}

/** [[EditorContainer]] React component properties
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof EditorContainer>`
 */
// eslint-disable-next-line deprecation/deprecation
export interface EditorContainerProps extends CommonProps {
  /** The property being updated. */
  propertyRecord: PropertyRecord;
  /** Tooltip text */
  title?: string;
  /** Handler for commit */
  onCommit: (args: PropertyUpdatedArgs) => void;
  /** Handler for cancel */
  onCancel: () => void;
  /** Indicates whether the Property Editor should set focus */
  setFocus?: boolean;

  /** @internal */
  ignoreEditorBlur?: boolean;
  /**
   * Indicates whether value change should call onCommit().
   * @internal
   */
  shouldCommitOnChange?: boolean;
}

interface CloneProps extends PropertyEditorProps {
  ref: (ref: TypeEditor | null) => void;
}

/** Interface implemented by React based type editors
 * @public
 */
export interface TypeEditor {
  getPropertyValue: () => Promise<PropertyValue | undefined>;
  htmlElement: HTMLElement | null;
  hasFocus: boolean;
}

/** EditorContainer React component used by the Tree and PropertyGrid for cell editing.
 * @public
 */
export function EditorContainer(props: EditorContainerProps) {
  const {
    ignoreEditorBlur,
    title,
    shouldCommitOnChange,
    propertyRecord,
    setFocus,
    onCommit,
    onCancel,
    ...rest
  } = props;

  const editorRef = React.useRef<TypeEditor | undefined>();
  const propertyEditorRef = React.useRef<PropertyEditorBase | undefined>();

  const handleClick = (e: React.MouseEvent) => e.stopPropagation();
  const handleContainerBlur = (e: React.FocusEvent) => e.stopPropagation();
  const handleEditorCommit = (args: PropertyUpdatedArgs) => void commit(args);

  const handleContainerCommit = async () => {
    const newValue = editorRef && (await editorRef.current?.getPropertyValue());
    if (newValue === undefined) return;
    void commit({
      propertyRecord,
      newValue,
    });
  };

  const onPressEscape = (e: React.KeyboardEvent) => {
    if (!propertyEditorRef.current?.containerHandlesEscape) return;
    e.stopPropagation();
    onCancel();
  };

  const onPressEnter = (e: React.KeyboardEvent) => {
    if (!propertyEditorRef.current?.containerHandlesEnter) return;
    if (editorRef?.current?.hasFocus) e.stopPropagation();
    void handleContainerCommit();
  };

  const onPressTab = (e: React.KeyboardEvent) => {
    if (!propertyEditorRef.current?.containerHandlesTab) return;
    e.stopPropagation();
    e.preventDefault();
    void handleContainerCommit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case Key.Escape.valueOf():
        onPressEscape(e);
        break;
      case Key.Enter.valueOf():
        onPressEnter(e);
        break;
      case Key.Tab.valueOf():
        onPressTab(e);
        break;
      default:
        if (propertyEditorRef.current?.containerStopsKeydownPropagation)
          e.stopPropagation();
    }
  };

  const handleEditorBlur = () => {
    if (ignoreEditorBlur) return;
    if (!propertyEditorRef.current?.containerHandlesBlur) return;
    void handleContainerCommit();
  };

  const isNewValueValid = async (value: PropertyValue) => {
    if (!propertyEditorRef.current) return false;
    if (!propertyRecord) return false;

    const validateResult = await propertyEditorRef.current.validateValue(
      value,
      propertyRecord
    );

    if (validateResult.encounteredError) {
      displayOutputMessage(validateResult.errorMessage);
      return false;
    }

    return true;
  };

  const displayOutputMessage = (
    errorMessage: AsyncErrorMessage | undefined
  ) => {
    if (!errorMessage) return;
    if (!editorRef) return;

    const htmlElement = editorRef.current?.htmlElement;
    if (htmlElement)
      UiAdmin.messagePresenter.displayInputFieldMessage(
        htmlElement,
        errorMessage.severity,
        errorMessage.briefMessage,
        errorMessage.detailedMessage
      );
    else
      UiAdmin.messagePresenter.displayMessage(
        errorMessage.severity,
        errorMessage.briefMessage,
        errorMessage.detailedMessage,
        errorMessage.messageType
      );
  };

  const commit = async (args: PropertyUpdatedArgs) => {
    const oldValue = args.propertyRecord.value;
    const newValue = args.newValue;

    if (!shouldCommit(oldValue, newValue)) {
      return;
    }

    const isValid = await isNewValueValid(newValue);
    if (!isValid) return;

    if (propertyEditorRef.current && args.propertyRecord) {
      const commitResult = await propertyEditorRef.current.commitValue(
        newValue,
        args.propertyRecord
      );
      if (commitResult.encounteredError) {
        displayOutputMessage(commitResult.errorMessage);
        return;
      }
    }

    onCommit(args);
  };

  const editorProps: CloneProps = {
    ref: (ref) => {
      editorRef.current = ref ?? undefined;
    },
    onCommit: handleEditorCommit,
    onCancel,
    onBlur: handleEditorBlur,
    setFocus: setFocus !== undefined ? setFocus : true,
    propertyRecord,
    shouldCommitOnChange,
    ...rest,
  };

  const propDescription = propertyRecord.property;

  const editorName =
    propDescription.editor !== undefined
      ? propDescription.editor.name
      : undefined;

  propertyEditorRef.current = PropertyEditorManager.createEditor(
    propDescription.typename,
    editorName,
    propDescription.dataController
  );

  const clonedNode = React.isValidElement(propertyEditorRef.current.reactNode)
    ? React.cloneElement(propertyEditorRef.current.reactNode, editorProps)
    : undefined;

  return (
    <span
      className="components-editor-container"
      onBlur={handleContainerBlur}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onContextMenu={handleClick}
      title={title}
      data-testid="editor-container"
      role="presentation"
    >
      {clonedNode}
    </span>
  );
}

function arePrimitiveValuesEqual(
  oldValue: Primitives.Value,
  newValue: Primitives.Value
): boolean {
  if (typeof oldValue !== typeof newValue) {
    return false;
  }
  // directly compare simple types
  if (typeof newValue !== "object" || newValue instanceof Date) {
    return newValue === oldValue;
  }
  // compare all members of arrays
  if (newValue instanceof Array) {
    if (!(oldValue instanceof Array)) {
      return false;
    }
    if (newValue.length !== oldValue.length) {
      return false;
    }
    for (let i = 0; i < newValue.length; i++) {
      if (oldValue[i] !== newValue[i]) {
        return false;
      }
    }
    return true;
  }
  // compare `Point2d` and `Point3d` types
  if ("x" in newValue) {
    if (typeof oldValue !== "object" || !("x" in oldValue)) {
      return false;
    }
    if ("z" in newValue) {
      if (!("z" in oldValue)) {
        return false;
      }
      return (
        newValue.x === oldValue.x &&
        newValue.y === oldValue.y &&
        newValue.z === oldValue.z
      );
    } else if ("z" in oldValue) {
      return false;
    }
    return newValue.x === oldValue.x && newValue.y === oldValue.y;
  }
  // compare instance keys
  if ("className" in newValue) {
    if (typeof oldValue !== "object" || !("className" in oldValue)) {
      return false;
    }
    return (
      oldValue.className === newValue.className && oldValue.id === newValue.id
    );
  }
  return false;
}

function shouldCommit(oldValue: PropertyValue, newValue: PropertyValue) {
  if (
    oldValue.valueFormat !== newValue.valueFormat ||
    newValue.valueFormat !== PropertyValueFormat.Primitive
  ) {
    return true;
  }
  const oldPrimitiveValue = oldValue as PrimitiveValue;
  if (!oldPrimitiveValue.value && !newValue.value) {
    return false;
  }
  if (
    (!oldPrimitiveValue.value && newValue.value) ||
    (oldPrimitiveValue.value && !newValue.value)
  ) {
    return true;
  }
  return !arePrimitiveValuesEqual(oldPrimitiveValue.value!, newValue.value!);
}
