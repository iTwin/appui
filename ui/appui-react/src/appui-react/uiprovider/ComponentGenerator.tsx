/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

import "./DefaultDialogGridContainer.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  BaseDialogItem,
  DialogItem,
  DialogItemValue,
  DialogPropertySyncItem,
  DialogRow,
} from "@itwin/appui-abstract";
import {
  PropertyValueFormat,
  UiLayoutDataProvider,
} from "@itwin/appui-abstract";
import type { PropertyUpdatedArgs } from "@itwin/components-react";
import { PropertyRecordEditor } from "@itwin/components-react";
import { EditorContainer } from "@itwin/components-react";
import type { ToolSettingsEntry } from "../widget-panels/ToolSettings.js";
import { assert, Logger } from "@itwin/core-bentley";
import { Label } from "@itwin/itwinui-react";
import { useToolSettingsNewEditors } from "../preview/tool-settings-new-editors/useToolsSettingsNewEditors.js";

function EditorLabel({
  uiDataProvider,
  item,
  isLeftmostRecord,
}: {
  uiDataProvider: UiLayoutDataProvider;
  item: DialogItem;
  isLeftmostRecord?: boolean;
}) {
  const [isDisabled, setIsDisabled] = React.useState(!!item.isDisabled);
  const displayLabel = React.useMemo(() => {
    return item.property.displayLabel || item.property.name;
  }, [item]);

  // listen for tool sync property events and update the isDisabled state
  React.useEffect(() => {
    return uiDataProvider.onSyncPropertiesChangeEvent.addListener((args) => {
      const mySyncItem = args.properties.find(
        (syncItem) => syncItem.propertyName === item.property.name
      );
      if (mySyncItem) {
        setIsDisabled(!!mySyncItem.isDisabled);
      }
    });
  }, [uiDataProvider, item]);

  const className = classnames(
    "uifw-default-label",
    !!isLeftmostRecord && "uifw-default-narrow-only-display"
  );
  return (
    <Label
      className={className}
      htmlFor={item.property.name}
      disabled={isDisabled}
    >
      {displayLabel}:
    </Label>
  );
}

function PropertyEditor({
  uiDataProvider,
  initialItem,
  isLock = false,
  setFocus,
  onCancel,
}: {
  uiDataProvider: UiLayoutDataProvider;
  initialItem: BaseDialogItem;
  isLock?: boolean;
  setFocus?: boolean;
  onCancel?: () => void;
}) {
  const getLatestRecordValue = React.useCallback(
    (initial: BaseDialogItem) => {
      let newRecord = UiLayoutDataProvider.getPropertyRecord(initial);

      const foundItem = isLock
        ? uiDataProvider.items.find(
            (item) => item.lockProperty?.property.name === initial.property.name
          )
        : uiDataProvider.items.find(
            (item) => item.property.name === initial.property.name
          );
      if (foundItem) {
        if (isLock) {
          newRecord = newRecord.copyWithNewValue({
            value: foundItem.lockProperty!.value.value,
            valueFormat: PropertyValueFormat.Primitive,
          });
          newRecord.isDisabled = foundItem.lockProperty!.isDisabled;
        } else {
          newRecord = newRecord.copyWithNewValue({
            value: foundItem.value.value,
            valueFormat: PropertyValueFormat.Primitive,
          });
          newRecord.isDisabled = foundItem.isDisabled;
        }
      }
      return newRecord;
    },
    [isLock, uiDataProvider.items]
  );

  const currentRecord = getLatestRecordValue(initialItem);
  const [propertyRecord, setPropertyRecord] = React.useState(currentRecord);

  // monitor tool for sync UI events
  React.useEffect(() => {
    return uiDataProvider.onSyncPropertiesChangeEvent.addListener((args) => {
      const mySyncItem = args.properties.find(
        (syncItem: DialogPropertySyncItem) =>
          syncItem.propertyName === initialItem.property.name
      );
      if (mySyncItem) {
        const newPropertyValue = propertyRecord.copyWithNewValue(
          {
            value: mySyncItem.value.value,
            valueFormat: PropertyValueFormat.Primitive,
            displayValue: mySyncItem.value.displayValue,
          },
          mySyncItem.property
        );

        if (mySyncItem.property) {
          if (mySyncItem.property.name === mySyncItem.propertyName) {
            newPropertyValue.isDisabled = mySyncItem.isDisabled;
            setPropertyRecord(newPropertyValue);
          } else {
            Logger.logError(
              "PropertyEditor",
              `Error trying to replace propertyName=${mySyncItem.propertyName} with property named ${mySyncItem.property.name}`
            );
          }
        } else {
          newPropertyValue.isDisabled = mySyncItem.isDisabled;
          setPropertyRecord(newPropertyValue);
        }
      }
    });
  }, [uiDataProvider, propertyRecord, initialItem.property.name]);

  React.useEffect(() => {
    return uiDataProvider.onItemsReloadedEvent.addListener(() => {
      const newItem = findDialogItem(
        uiDataProvider,
        initialItem.property.name,
        isLock
      );
      if (!newItem) return;
      setPropertyRecord(getLatestRecordValue(newItem));
    });
  }, [uiDataProvider, initialItem.property.name, getLatestRecordValue, isLock]);

  const className = React.useMemo(
    () => (isLock ? "uifw-default-property-lock" : "uifw-default-editor"),
    [isLock]
  );
  const handleCommit = React.useCallback(
    (commit: PropertyUpdatedArgs) => {
      // UiLayoutDataProvider supports only primitive property types
      assert(
        commit.newValue.valueFormat === PropertyValueFormat.Primitive &&
          commit.propertyRecord.value.valueFormat ===
            PropertyValueFormat.Primitive
      );
      const newPropertyValue = propertyRecord.copyWithNewValue(commit.newValue);
      const syncItem: DialogPropertySyncItem = {
        value: commit.newValue as DialogItemValue,
        propertyName: initialItem.property.name,
        isDisabled: newPropertyValue.isDisabled,
      };
      uiDataProvider.applyUiPropertyChange(syncItem);
      // Now have the uiDataProvider refetch the latest property values from the tool
      uiDataProvider.reloadDialogItems(true);
    },
    [initialItem.property.name, propertyRecord, uiDataProvider]
  );
  const handleCancel = () => {};

  const useNewEditors = useToolSettingsNewEditors();

  return (
    <div key={initialItem.property.name} className={className}>
      {useNewEditors ? (
        <PropertyRecordEditor
          key={initialItem.property.name}
          propertyRecord={propertyRecord}
          setFocus={setFocus}
          onCommit={handleCommit}
          onCancel={onCancel ?? handleCancel}
          editorSystem="new"
          size="small"
        />
      ) : (
        <EditorContainer
          key={initialItem.property.name}
          propertyRecord={propertyRecord}
          setFocus={setFocus}
          onCommit={handleCommit}
          onCancel={onCancel ?? handleCancel}
        />
      )}
    </div>
  );
}

/** Utility methods to generate react ui from DialogRow specs
 * @public
 */
export class ComponentGenerator {
  constructor(
    private _uiDataProvider: UiLayoutDataProvider,
    private _onCancel?: () => void
  ) {}

  public get uiDataProvider() {
    return this._uiDataProvider;
  }

  private getEditor(
    item: BaseDialogItem,
    isLock = false,
    setFocus = false
  ): React.ReactNode {
    return (
      <PropertyEditor
        key={item.property.name}
        uiDataProvider={this.uiDataProvider}
        initialItem={item}
        isLock={isLock}
        setFocus={setFocus}
        onCancel={this._onCancel}
      />
    );
  }

  private generateRowWithButtonGroupEditors(
    row: DialogRow,
    rowIndex: number
  ): React.ReactNode {
    if (1 === row.items.length) {
      return (
        <div
          key={row.items[0].property.name}
          className="uifw-default-inline-editor-group uifw-default-center-across-width"
        >
          {this.getEditor(row.items[0])}
        </div>
      );
    }

    return (
      <div
        key={rowIndex}
        className="uifw-default-inline-editor-group uifw-default-center-across-width"
      >
        <div className="uifw-default-inline-editor-group">
          {row.items.map((item) => this.getEditor(item))}
        </div>
      </div>
    );
  }

  private generateEntryWithButtonGroupEditors(
    row: DialogRow,
    rowIndex: number
  ): ToolSettingsEntry {
    if (1 === row.items.length) {
      return {
        labelNode: "",
        editorNode: (
          <div
            key={row.items[0].property.name}
            className="uifw-default-inline-editor-group uifw-default-center-across-width"
          >
            {this.getEditor(row.items[0])}
          </div>
        ),
      };
    }

    return {
      labelNode: "",
      editorNode: (
        <div
          key={rowIndex}
          className="uifw-default-inline-editor-group uifw-default-center-across-width"
        >
          <div className="uifw-default-inline-editor-group">
            {row.items.map((item) => this.getEditor(item))}
          </div>
        </div>
      ),
    };
  }

  private getEditorLabel(
    item: DialogItem,
    isLeftmostRecord = false
  ): React.ReactNode {
    return (
      <EditorLabel
        uiDataProvider={this.uiDataProvider}
        item={item}
        isLeftmostRecord={isLeftmostRecord}
      />
    );
  }

  private getLeftLockAndLabel(
    rowItem: DialogItem,
    multiplePropertiesOnRow: boolean
  ): React.ReactNode {
    const record = UiLayoutDataProvider.getPropertyRecord(rowItem);
    const lockEditor = UiLayoutDataProvider.hasAssociatedLockProperty(rowItem)
      ? this.getEditor(rowItem.lockProperty!, true)
      : null;
    const label = UiLayoutDataProvider.editorWantsLabel(rowItem)
      ? this.getEditorLabel(rowItem)
      : null;
    const classNames = multiplePropertiesOnRow
      ? "uifw-default-lock-and-label uifw-default-wide-only-display"
      : "uifw-default-lock-and-label";
    return (
      <div key={`lock-${record.property.name}`} className={classNames}>
        {lockEditor}
        {label}
      </div>
    );
  }

  private getInlineLabelAndEditor(
    item: DialogItem,
    isLeftmostRecord: boolean
  ): React.ReactNode {
    const label = UiLayoutDataProvider.editorWantsLabel(item)
      ? this.getEditorLabel(item, isLeftmostRecord)
      : null;
    return (
      <div
        key={item.property.name}
        className="uifw-default-inline-label-and-editor"
      >
        {label}
        {this.getEditor(item)}
      </div>
    );
  }

  private getRowWithMultipleEditors(row: DialogRow): React.ReactNode {
    return (
      <div className="uifw-default-inline-editor-group">
        {row.items.map((item: DialogItem, index: number) =>
          this.getInlineLabelAndEditor(item, index === 0)
        )}
      </div>
    );
  }

  private getDivForRow(row: DialogRow): React.ReactNode {
    if (row.items.length === 1) return this.getEditor(row.items[0]);
    return this.getRowWithMultipleEditors(row);
  }

  public getRow(row: DialogRow, rowIndex: number): React.ReactNode {
    if (UiLayoutDataProvider.onlyContainButtonGroupEditors(row)) {
      return this.generateRowWithButtonGroupEditors(row, rowIndex);
    } else {
      return (
        <React.Fragment key={rowIndex}>
          {this.getLeftLockAndLabel(row.items[0], row.items.length > 1)}
          {this.getDivForRow(row)}
        </React.Fragment>
      );
    }
  }

  public getToolSettingsEntry(
    row: DialogRow,
    rowIndex: number
  ): ToolSettingsEntry {
    if (UiLayoutDataProvider.onlyContainButtonGroupEditors(row)) {
      return this.generateEntryWithButtonGroupEditors(row, rowIndex);
    } else {
      return {
        labelNode: this.getLeftLockAndLabel(row.items[0], row.items.length > 1),
        editorNode: this.getDivForRow(row),
      };
    }
  }

  /** ToolSettingsEntries are used by the tool settings bar. */
  public getToolSettingsEntries(): ToolSettingsEntry[] {
    return this.uiDataProvider.rows.map((row: DialogRow, index: number) =>
      this.getToolSettingsEntry(row, index)
    );
  }
}

function findDialogItem(
  uiDataProvider: UiLayoutDataProvider,
  propertyName: string,
  isLock: boolean
) {
  const dialogItem = uiDataProvider.items.find((item) => {
    if (isLock) {
      return item.lockProperty?.property.name === propertyName;
    }
    return item.property.name === propertyName;
  });
  return isLock ? dialogItem?.lockProperty : dialogItem;
}
