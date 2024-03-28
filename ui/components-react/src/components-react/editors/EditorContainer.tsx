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
import type { PropertyRecord, PropertyValue } from "@itwin/appui-abstract";
import { UiAdmin } from "@itwin/appui-abstract";
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
 */
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

/** @internal */
interface CloneProps extends PropertyEditorProps {
  ref: (ref: any) => void;
}

/** Interface implemented by React based type editors
 * @public
 */
export interface TypeEditor {
  getPropertyValue: () => Promise<PropertyValue | undefined>;
  htmlElement: HTMLElement | null;
  hasFocus: boolean;
}

/**
 * EditorContainer React component used by the Tree and PropertyGrid for cell editing.
 * @public
 */
export function EditorContainer(props: EditorContainerProps) {
  const {
    ignoreEditorBlur,
    title,
    className,
    style,
    shouldCommitOnChange,
    propertyRecord,
    setFocus,
    onCommit,
    onCancel,
  } = props;

  let propertyEditor: PropertyEditorBase;
  const editorRef = React.useRef<TypeEditor | null>(null);

  const setEditorRef = (ref: TypeEditor | null) => {
    editorRef.current = ref;
  };

  function createEditor(): React.ReactNode {
    const editorProps: CloneProps = {
      ref: setEditorRef,
      onCommit: handleEditorCommit,
      onCancel: handleCancel,
      onBlur: handleEditorBlur,
      setFocus: setFocus !== undefined ? setFocus : true,
      className,
      propertyRecord,
      style,
      shouldCommitOnChange,
    };

    const propDescription = propertyRecord.property;

    const editorName =
      propDescription.editor !== undefined
        ? propDescription.editor.name
        : undefined;
    propertyEditor = PropertyEditorManager.createEditor(
      propDescription.typename,
      editorName,
      propDescription.dataController
    );

    const editorNode: React.ReactNode = propertyEditor.reactNode;

    let clonedNode: React.ReactNode = null;
    // istanbul ignore else
    if (React.isValidElement(editorNode)) {
      clonedNode = React.cloneElement(editorNode, editorProps);
    }

    return clonedNode;
  }

  const handleContainerCommit = async (): Promise<void> => {
    const newValue = editorRef && (await editorRef.current?.getPropertyValue());
    // istanbul ignore else
    if (newValue !== undefined) {
      void commit({
        propertyRecord,
        newValue,
      });
    }
  };

  const handleEditorCommit = (args: PropertyUpdatedArgs): void => {
    void commit(args);
  };

  const handleCancel = () => onCancel();

  // Focus Event Handlers
  const handleEditorBlur = () => {
    // istanbul ignore else
    if (
      ignoreEditorBlur &&
      propertyEditor &&
      propertyEditor.containerHandlesBlur
    )
      void onPressEscape();
  };

  const handleContainerBlur = (e: React.FocusEvent) => e.stopPropagation();
  const handleClick = (e: React.MouseEvent) => e.stopPropagation();

  // Keyboard Event Handlers

  const onPressEscape = (): void => {
    // istanbul ignore else
    if (propertyEditor && propertyEditor.containerHandlesEscape) {
      handleCancel();
    }
  };

  const onPressEnter = (e: React.KeyboardEvent): void => {
    // istanbul ignore else
    if (propertyEditor && propertyEditor.containerHandlesEnter) {
      // istanbul ignore else
      if (editorRef && editorRef.current?.hasFocus) e.stopPropagation();
      void handleContainerCommit();
    }
  };

  const onPressTab = (e: React.KeyboardEvent): void => {
    // istanbul ignore else
    if (propertyEditor && propertyEditor.containerHandlesTab) {
      e.stopPropagation();
      void handleContainerCommit();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case Key.Escape.valueOf():
        onPressEscape();
        break;
      case Key.Enter.valueOf():
        onPressEnter(e);
        break;
      case Key.Tab.valueOf():
        onPressTab(e);
        break;
      default:
        if (propertyEditor && propertyEditor.containerStopsKeydownPropagation)
          e.stopPropagation();
    }
  };

  const isNewValueValid = async (value: PropertyValue): Promise<boolean> => {
    let isValid = true;

    // istanbul ignore else
    if (propertyEditor && propertyRecord) {
      const validateResult = await propertyEditor.validateValue(
        value,
        propertyRecord
      );

      if (validateResult.encounteredError) {
        displayOutputMessage(validateResult.errorMessage);
        isValid = false;
      }
    } else {
      isValid = false;
    }

    return isValid;
  };

  const displayOutputMessage = (
    errorMessage: AsyncErrorMessage | undefined
  ) => {
    // istanbul ignore else
    if (errorMessage && editorRef) {
      const htmlElement = editorRef && editorRef.current?.htmlElement;
      // istanbul ignore else
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
    }
  };

  const commit = async (args: PropertyUpdatedArgs) => {
    const newValue = args.newValue;
    const isValid = await isNewValueValid(newValue);
    if (isValid) {
      let doCommit = true;
      // istanbul ignore else
      if (propertyEditor && args.propertyRecord) {
        const commitResult = await propertyEditor.commitValue(
          newValue,
          args.propertyRecord
        );
        if (commitResult.encounteredError) {
          displayOutputMessage(commitResult.errorMessage);
          doCommit = false;
        }
      }

      if (doCommit) {
        onCommit(args);
      }
    }
  };

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
      {createEditor()}
    </span>
  );
}
