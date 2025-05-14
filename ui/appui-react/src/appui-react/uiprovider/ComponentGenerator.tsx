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
  DialogItem,
  DialogItemValue,
  DialogRow,
} from "@itwin/appui-abstract";
import {
  PropertyValueFormat,
  UiLayoutDataProvider,
} from "@itwin/appui-abstract";
import type { PropertyUpdatedArgs } from "@itwin/components-react";
import { EditorContainer, PropertyRecordEditor } from "@itwin/components-react";
import {
  LockContext,
  PropertyEditorProvider,
} from "@itwin/components-react/internal";
import { assert, Logger } from "@itwin/core-bentley";
import { Label } from "@itwin/itwinui-react";
import type { ToolSettingsEntry } from "../widget-panels/ToolSettings.js";
import { useToolSettingsNewEditors } from "../preview/tool-settings-new-editors/useToolsSettingsNewEditors.js";
import { LockPropertyEditorName } from "./LockEditor.js";

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

      if (!mySyncItem) return;
      setIsDisabled(!!mySyncItem.isDisabled);
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

function PropertyEditor(props: {
  uiDataProvider: UiLayoutDataProvider;
  itemPropertyName: string;
  lockPropertyName?: string;
  onCancel?: () => void;
}) {
  const { uiDataProvider, itemPropertyName, lockPropertyName, onCancel } =
    props;
  const propertyName = lockPropertyName ?? itemPropertyName;
  const isLock = !!lockPropertyName;
  const getPropertyRecord = React.useCallback(() => {
    const dialogItem = uiDataProvider.items.find(
      (item) => item.property.name === itemPropertyName
    );
    if (!dialogItem) return undefined;

    const recordItem = isLock ? dialogItem.lockProperty : dialogItem;
    if (!recordItem) return undefined;

    const newRecord = UiLayoutDataProvider.getPropertyRecord(recordItem);
    if (isLock && newRecord.property.editor) {
      newRecord.property.editor.name ??= LockPropertyEditorName;
    }

    if (!isLock) {
      // Lock property should have no effect on the disabled state.
      newRecord.isDisabled = dialogItem.isDisabled;
    }
    return newRecord;
  }, [isLock, uiDataProvider, itemPropertyName]);

  const [propertyRecord, setPropertyRecord] = React.useState(() =>
    getPropertyRecord()
  );

  React.useEffect(() => {
    return uiDataProvider.onSyncPropertiesChangeEvent.addListener((args) => {
      const mySyncItem = args.properties.find(
        (syncItem) => syncItem.propertyName === propertyName
      );
      if (!mySyncItem) return;
      if (!propertyRecord) return;

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
    });
  }, [uiDataProvider, propertyRecord, propertyName]);

  React.useEffect(() => {
    return uiDataProvider.onItemsReloadedEvent.addListener(() => {
      setPropertyRecord(getPropertyRecord());
    });
  }, [uiDataProvider, getPropertyRecord]);

  const handleCommit = React.useCallback(
    (commit: PropertyUpdatedArgs) => {
      // UiLayoutDataProvider supports only primitive property types
      assert(
        commit.newValue.valueFormat === PropertyValueFormat.Primitive &&
          commit.propertyRecord.value.valueFormat ===
            PropertyValueFormat.Primitive
      );
      if (!propertyRecord) return;

      const dialogItem = uiDataProvider.items.find(
        (item) => item.property.name === itemPropertyName
      );
      if (dialogItem && dialogItem.lockProperty) {
        // Lock the property when edited.
        const lockProperty = dialogItem.lockProperty;
        uiDataProvider.applyUiPropertyChange({
          value: {
            ...lockProperty.value,
            value: true,
          },
          propertyName: lockProperty.property.name,
        });
      }

      const newPropertyValue = propertyRecord.copyWithNewValue(commit.newValue);
      uiDataProvider.applyUiPropertyChange({
        value: commit.newValue as DialogItemValue,
        propertyName,
        isDisabled: newPropertyValue.isDisabled,
      });
      // Now have the uiDataProvider refetch the latest property values from the tool
      uiDataProvider.reloadDialogItems(true);
    },
    [propertyName, propertyRecord, uiDataProvider, itemPropertyName]
  );
  const handleCancel = React.useCallback(() => {}, []);

  const useNewEditors = useToolSettingsNewEditors();

  if (!propertyRecord) return null;
  return (
    <div
      key={propertyName}
      className={isLock ? "uifw-default-property-lock" : "uifw-default-editor"}
    >
      <PropertyEditorProvider
        uiDataProvider={uiDataProvider}
        itemPropertyName={itemPropertyName}
        lockPropertyName={lockPropertyName}
      >
        {useNewEditors ? (
          <PropertyRecordEditor
            propertyRecord={propertyRecord}
            onCommit={handleCommit}
            onCancel={onCancel ?? handleCancel}
            editorSystem="new"
            size="small"
          />
        ) : (
          <EditorContainer
            propertyRecord={propertyRecord}
            onCommit={handleCommit}
            onCancel={onCancel ?? handleCancel}
          />
        )}
      </PropertyEditorProvider>
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

  private getEditor(item: DialogItem, isLock = false): React.ReactNode {
    const propertyName = item.property.name;
    const lockPropertyName = (() => {
      if (!isLock) return undefined;
      assert(!!item.lockProperty);
      return item.lockProperty.property.name;
    })();
    return (
      <PropertyEditor
        key={lockPropertyName ?? propertyName}
        uiDataProvider={this.uiDataProvider}
        itemPropertyName={propertyName}
        lockPropertyName={lockPropertyName}
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
      ? this.getEditor(rowItem, true)
      : null;
    const label = UiLayoutDataProvider.editorWantsLabel(rowItem)
      ? this.getEditorLabel(rowItem)
      : null;

    return (
      <LeftLockAndLabel
        key={`lock-${record.property.name}`}
        lockEditor={lockEditor}
        label={label}
        multiplePropertiesOnRow={multiplePropertiesOnRow}
      />
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
    return this.uiDataProvider.rows.map((row, index) =>
      this.getToolSettingsEntry(row, index)
    );
  }
}

interface LeftLockAndLabelProps {
  lockEditor?: React.ReactNode;
  label?: React.ReactNode;
  multiplePropertiesOnRow: boolean;
}

function LeftLockAndLabel({
  lockEditor,
  label,
  multiplePropertiesOnRow,
}: LeftLockAndLabelProps) {
  const { lockDecoration } = React.useContext(LockContext) ?? {};
  const classNames = multiplePropertiesOnRow
    ? "uifw-default-lock-and-label uifw-default-wide-only-display"
    : "uifw-default-lock-and-label";
  return (
    <div className={classNames}>
      {lockDecoration ? undefined : lockEditor}
      {label}
    </div>
  );
}
