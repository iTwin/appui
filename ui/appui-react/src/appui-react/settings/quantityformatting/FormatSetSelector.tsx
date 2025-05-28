/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Settings
 */

import * as React from "react";
import { Button, IconButton, LabeledInput, Select } from "@itwin/itwinui-react";
import type { FormatSet } from "@itwin/ecschema-metadata";
import { SvgAdd } from "@itwin/itwinui-icons-react";
import { UiFramework } from "../../UiFramework.js";
import { Dialog } from "@itwin/itwinui-react";

/** Props for [[FormatSetSelector]]
 * @beta
 */
interface FormatSetSelectorProps {
  /** The currently selected FormatSet */
  selectedFormatSet?: FormatSet;
  /** The callback to call when the FormatSet is changed */
  onFormatSetChanged: (newFormatSet: FormatSet) => void;
  /** The available FormatSets */
  availableFormatSets: FormatSet[];

  createNewFormatSet?: (newFormatSet: FormatSet) => void;
}

/** Select control to set the "active" Format Set. This setting determine what units are displayed for quantity values (i.e. foot vs meter).
 * @beta
 */
export function FormatSetSelector(props: FormatSetSelectorProps) {
  const {
    selectedFormatSet,
    onFormatSetChanged,
    availableFormatSets,
    createNewFormatSet,
  } = props;
  const handleFormatSetChanged = React.useCallback(
    (formatSetName: string) => {
      const foundFormatSet = availableFormatSets.find(
        (formatSet) => formatSet.name === formatSetName
      );
      foundFormatSet &&
        onFormatSetChanged &&
        onFormatSetChanged(foundFormatSet);
    },
    [availableFormatSets, onFormatSetChanged]
  );

  const formatSetOptions = availableFormatSets.map((formatSet) => ({
    value: formatSet.name,
    label: formatSet.label ?? formatSet.name,
  }));

  const openCreateFormatSetDialog = React.useCallback(() => {
    if (!createNewFormatSet) {
      return;
    }
    UiFramework.dialogs.modal.open(
      <CreateFormatSetDialog createNewFormatSet={createNewFormatSet} />
    );
  }, [createNewFormatSet]);
  return (
    <div className="quantity-format-set-selector-container">
      <span className="uicore-label">Available Format Sets</span>
      <div className="format-set-selector-row">
        <Select
          data-testid="format-set-selector"
          options={formatSetOptions}
          onChange={handleFormatSetChanged}
          className="format-set-selector"
        />
        {createNewFormatSet && (
          <IconButton
            data-testid="open-format-set-dialog"
            onClick={openCreateFormatSetDialog}
            label="Create new Format Set"
          >
            <SvgAdd />
          </IconButton>
        )}
      </div>
    </div>
  );
}

/**
 * @beta
 * @returns
 */
export function CreateFormatSetDialog({
  createNewFormatSet,
}: {
  createNewFormatSet: (newFormatSet: FormatSet) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [name, setName] = React.useState<string | undefined>(undefined);
  const [label, setLabel] = React.useState<string | undefined>(undefined);

  const onNameChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );

  const onLabelChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(event.target.value);
    },
    []
  );

  const readyToSave = React.useCallback(() => {
    return !!name && !!label;
  }, [name, label]);

  const handleOk = React.useCallback(() => {
    if (readyToSave()) {
      const newFormatSet: FormatSet = {
        name: name!,
        label: label!,
        formats: {},
      };
      createNewFormatSet(newFormatSet);
    }
    setIsOpen(false);
    handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToSave]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    UiFramework.dialogs.modal.close();
  }, []);

  return (
    <Dialog isOpen={isOpen}>
      <Dialog.Backdrop />
      <Dialog.Main>
        <Dialog.TitleBar titleText="New Format Set" />
        <Dialog.Content>
          <LabeledInput
            displayStyle="inline"
            data-testid="format-set-dialog-name"
            label="Format Set Name"
            placeholder="Enter Unique Name"
            onChange={onNameChange}
            value={name}
          />
          <LabeledInput
            displayStyle="inline"
            data-testid="format-set-dialog-label"
            label="Format Set Label"
            placeholder="Enter Label"
            onChange={onLabelChange}
            value={label}
          />
        </Dialog.Content>
        <Dialog.ButtonBar>
          <Button
            data-testid="format-set-add"
            styleType="high-visibility"
            disabled={!readyToSave()}
            onClick={handleOk}
          >
            Save
          </Button>
          <Button
            data-testid="format-set-cancel"
            styleType="default"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Dialog.ButtonBar>
      </Dialog.Main>
    </Dialog>
  );
}
