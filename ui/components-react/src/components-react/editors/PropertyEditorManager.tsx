/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import * as React from "react";
import { TextEditor } from "./TextEditor.js";
import type {
  DisplayMessageType,
  MessageSeverity,
  PropertyDescription,
  PropertyRecord,
  PropertyValue,
} from "@itwin/appui-abstract";

/** Asynchronous Error Message returned as part of [[AsyncValueProcessingResult]]
 * @public
 */
export interface AsyncErrorMessage {
  severity: MessageSeverity;
  briefMessage: string;
  detailedMessage?: string;
  messageType?: DisplayMessageType;
}

/** Asynchronous Value Process Result
 * @public
 */
export interface AsyncValueProcessingResult {
  encounteredError: boolean;
  returnValue?: PropertyValue;
  errorMessage?: AsyncErrorMessage;
}

/** DataControllers can be implemented per typename to validate and commit values.
 * @public
 */
export interface DataController {
  validateValue(
    newValue: PropertyValue,
    record: PropertyRecord
  ): Promise<AsyncValueProcessingResult>;
  commitValue(
    newValue: PropertyValue,
    record: PropertyRecord
  ): Promise<AsyncValueProcessingResult>;
}

/** PropertyEditor is the base class for all property editors.
 * @public
 */
export abstract class PropertyEditorBase implements DataController {
  public get containerHandlesBlur(): boolean {
    return true;
  }
  public get containerHandlesEscape(): boolean {
    return true;
  }
  public get containerHandlesEnter(): boolean {
    return true;
  }
  public get containerHandlesTab(): boolean {
    return true;
  }
  public get containerStopsKeydownPropagation(): boolean {
    return true;
  }

  public customDataController: DataController | undefined = undefined;

  public abstract get reactNode(): React.ReactNode;

  public applyEditorParams(
    _property: PropertyDescription,
    _record: PropertyRecord
  ): void {}

  public async commitValue(
    newValue: PropertyValue,
    record: PropertyRecord
  ): Promise<AsyncValueProcessingResult> {
    if (this.customDataController)
      return this.customDataController.commitValue(newValue, record);

    return { encounteredError: false };
  }

  public async validateValue(
    newValue: PropertyValue,
    record: PropertyRecord
  ): Promise<AsyncValueProcessingResult> {
    if (this.customDataController)
      return this.customDataController.validateValue(newValue, record);

    return { encounteredError: false };
  }
}

/** DataControllerBase is the base class for all Data Controllers.
 * @public
 */
export abstract class DataControllerBase implements DataController {
  public async commitValue(
    _newValue: PropertyValue,
    _record: PropertyRecord
  ): Promise<AsyncValueProcessingResult> {
    return { encounteredError: false };
  }

  public async validateValue(
    _newValue: PropertyValue,
    _record: PropertyRecord
  ): Promise<AsyncValueProcessingResult> {
    return { encounteredError: false };
  }
}

const editors: { [index: string]: new () => PropertyEditorBase } = {};

/** Manages Property Editors. Property Editors are registered with and created by the manager.
 * @public
 */
export class PropertyEditorManager {
  private static _dataControllers: {
    [index: string]: new () => DataControllerBase;
  } = {};

  public static registerEditor(
    editType: string,
    editor: new () => PropertyEditorBase,
    editorName?: string
  ): void {
    const fullEditorName = getFullEditorName(editType, editorName);

    if (editors.hasOwnProperty(fullEditorName)) {
      const nameOfEditor = editors[fullEditorName].name;
      throw Error(
        `PropertyEditorManager.registerEditor error: type '${fullEditorName}' already registered to '${nameOfEditor}'`
      );
    }
    editors[fullEditorName] = editor;
  }

  public static registerDataController(
    controllerName: string,
    controller: new () => DataControllerBase
  ): void {
    if (PropertyEditorManager._dataControllers.hasOwnProperty(controllerName)) {
      throw Error(
        `PropertyEditorManager.registerDataController error: type '${controllerName}' already registered to '${(typeof PropertyEditorManager
          ._dataControllers[controllerName]).toString()}'`
      );
    }
    PropertyEditorManager._dataControllers[controllerName] = controller;
  }

  /** @internal */
  public static deregisterDataController(controllerName: string): void {
    if (PropertyEditorManager._dataControllers.hasOwnProperty(controllerName)) {
      delete PropertyEditorManager._dataControllers[controllerName];
    }
  }

  public static createEditor(
    editType: string,
    editorName?: string,
    dataControllerName?: string
  ): PropertyEditorBase {
    const fullEditorName = getFullEditorName(editType, editorName);

    let editor: PropertyEditorBase;
    if (editors.hasOwnProperty(fullEditorName))
      editor = new editors[fullEditorName]();
    else if (editors.hasOwnProperty(editType)) editor = new editors[editType]();
    else editor = new BasicPropertyEditor();

    if (dataControllerName) {
      if (
        PropertyEditorManager._dataControllers.hasOwnProperty(
          dataControllerName
        )
      )
        editor.customDataController =
          new PropertyEditorManager._dataControllers[dataControllerName]();
      else
        throw Error(
          `PropertyEditorManager.createEditor error: data controller '${dataControllerName}' is not registered`
        );
    }

    return editor;
  }

  public static hasCustomEditor(editType: string, editorName: string): boolean {
    const fullEditorName = getFullEditorName(editType, editorName);
    return editors.hasOwnProperty(fullEditorName);
  }
}

/** Basic Property Editor registered for the "text" and "string" type names.
 * It uses the [[TextEditor]] React component.
 * @public
 */
export class BasicPropertyEditor extends PropertyEditorBase {
  public get reactNode(): React.ReactNode {
    return <TextEditor />;
  }
}

function getFullEditorName(editType: string, editorName?: string) {
  let fullEditorName = editType;
  if (editorName) fullEditorName += `:${editorName}`;
  return fullEditorName;
}

/** Used to override the default property editors from the `appui-react` package.
 * @internal
 */
export function registerDefaultPropertyEditor(
  editType: string,
  editor: new () => PropertyEditorBase,
  editorName?: string,
  override = false
) {
  const fullEditorName = getFullEditorName(editType, editorName);

  // Ignore if already registered and override is disabled.
  if (editors.hasOwnProperty(fullEditorName) && !override) return;

  editors[fullEditorName] = editor;
}
