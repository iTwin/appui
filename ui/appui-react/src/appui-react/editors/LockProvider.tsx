/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import * as React from "react";
import type { UiLayoutDataProvider } from "@itwin/appui-abstract";
import { InputWithDecorations } from "@itwin/itwinui-react";
import { SvgLock, SvgLockUnlocked } from "@itwin/itwinui-icons-react";
import { produce } from "immer";
import { usePreviewFeatures } from "../preview/PreviewFeatures.js";

/** This is used to notify the parent component that the lock decoration is displayed in the editor
 * and a separate lock component should not be displayed as a sibling.
 * @internal
 */
export const LockContext = React.createContext<
  | {
      /** Describes if the lock is displayed as an editor decoration. */
      lockDecorations: Record<string, true>;
      /** Called by editors that display lock decoration. */
      setLockDecoration: (
        propertyName: string,
        lockDecoration: boolean
      ) => void;
    }
  | undefined
>(undefined);

/** @internal */
export function LockProvider({ children }: React.PropsWithChildren) {
  const [lockDecorations, setLockDecorations] = React.useState<
    Record<string, true>
  >({});
  const setLockDecoration = React.useCallback(
    (propertyName: string, lockDecoration: boolean) => {
      setLockDecorations(
        produce((draft) => {
          if (lockDecoration) {
            draft[propertyName] = true;
            return;
          }

          delete draft[propertyName];
        })
      );
    },
    []
  );
  return (
    <LockContext.Provider
      value={React.useMemo(
        () => ({
          lockDecorations,
          setLockDecoration,
        }),
        [lockDecorations, setLockDecoration]
      )}
    >
      {children}
    </LockContext.Provider>
  );
}

/** Additional context for property editors that support lock decoration.
 * @internal
 */
export const PropertyEditorContext = React.createContext<
  | {
      uiDataProvider: UiLayoutDataProvider;
      itemPropertyName: string;
      /** Specified when rendering a lock editor. */
      lockPropertyName: string | undefined;
    }
  | undefined
>(undefined);

type PropertyEditorContextType = React.ContextType<
  typeof PropertyEditorContext
>;

interface PropertyEditorProviderProps
  extends NonNullable<PropertyEditorContextType> {
  children?: React.ReactNode;
}

/** @internal */
export function PropertyEditorProvider(props: PropertyEditorProviderProps) {
  const { children, uiDataProvider, itemPropertyName, lockPropertyName } =
    props;
  return (
    <PropertyEditorContext.Provider
      value={React.useMemo(
        () => ({
          uiDataProvider,
          itemPropertyName,
          lockPropertyName,
        }),
        [uiDataProvider, itemPropertyName, lockPropertyName]
      )}
    >
      {children}
    </PropertyEditorContext.Provider>
  );
}

/** Returns `true` if the lock decoration should be displayed.
 * @internal
 */
export function useLockDecoration() {
  const { lockPropertyName, itemPropertyName, uiDataProvider } =
    React.useContext(PropertyEditorContext) ?? {};
  const { toolSettingsLockButton } = usePreviewFeatures();
  const dialogItem = React.useMemo(
    () =>
      uiDataProvider?.items.find(
        (item) => item.property.name === itemPropertyName
      ),
    [uiDataProvider, itemPropertyName]
  );
  return (
    !!toolSettingsLockButton && !lockPropertyName && !!dialogItem?.lockProperty
  );
}

interface UseLockPropertyArgs {
  provider: UiLayoutDataProvider;
  itemPropertyName: string;
}

/** @internal */
export function useLockProperty(args: UseLockPropertyArgs | undefined) {
  const { provider, itemPropertyName } = args ?? {};
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const listeners = provider
        ? [
            provider.onItemsReloadedEvent.addListener(onStoreChange),
            provider.onSyncPropertiesChangeEvent.addListener(onStoreChange),
          ]
        : [];
      return () => listeners.forEach((l) => l());
    },
    [provider]
  );
  const getSnapshot = React.useCallback(() => {
    const dialogItem = provider?.items.find(
      (item) => item.property.name === itemPropertyName
    );
    return dialogItem?.lockProperty;
  }, [provider, itemPropertyName]);
  return React.useSyncExternalStore(subscribe, getSnapshot);
}

/** This component displays a lock button in the property editor when the `toolSettingsLockButton` preview feature is enabled.
 * @alpha
 */
export function LockButtonInputDecoration() {
  const { itemPropertyName, uiDataProvider: provider } =
    React.useContext(PropertyEditorContext) ?? {};
  const { setLockDecoration } = React.useContext(LockContext) ?? {};
  const lockDecoration = useLockDecoration();

  const lockProperty = useLockProperty(
    provider && itemPropertyName
      ? {
          provider,
          itemPropertyName,
        }
      : undefined
  );

  React.useLayoutEffect(() => {
    if (!lockDecoration) return;
    if (!setLockDecoration) return;
    if (!itemPropertyName) return;
    setLockDecoration(itemPropertyName, true);
    return () => {
      setLockDecoration(itemPropertyName, false);
    };
  }, [setLockDecoration, itemPropertyName, lockDecoration]);

  if (!lockDecoration) return null;

  const isLocked = !!lockProperty?.value.value;
  const displayLabel = lockProperty?.property.displayLabel;
  const label = displayLabel ? displayLabel : "Toggle lock";
  const disabled = lockProperty?.isDisabled;
  return (
    <InputWithDecorations.Button
      isActive={isLocked}
      label={label}
      disabled={disabled}
      size="small"
      styleType="borderless"
      onClick={() => {
        if (!provider) return;
        if (!lockProperty) return;

        provider.applyUiPropertyChange({
          value: {
            ...lockProperty.value,
            value: !isLocked,
          },
          propertyName: lockProperty.property.name,
        });
        provider.reloadDialogItems();
      }}
    >
      {isLocked ? <SvgLock /> : <SvgLockUnlocked />}
    </InputWithDecorations.Button>
  );
}
