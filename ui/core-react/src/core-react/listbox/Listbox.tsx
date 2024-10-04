/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Listbox
 */
import * as React from "react";
import classnames from "classnames";
import { Key } from "ts-key-enum";

import "./Listbox.scss";
import { Guid } from "@itwin/core-bentley";

/** Ideas borrowed from  https://reacttraining.com/reach-ui/listbox */

/* eslint-disable @typescript-eslint/no-deprecated */

/** `Listbox` value.
 * @public
 * @deprecated in 4.12.0. Value used in a deprecated component {@link Listbox}.
 */
export type ListboxValue = string;

/** `Listbox` Props.
 * @public
 * @deprecated in 4.12.0. Props of deprecated component {@link Listbox}.
 */
export interface ListboxProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  id?: string;
  selectedValue?: ListboxValue;
  ariaLabel?: any;
  ariaLabelledBy?: any;
  onListboxValueChange?: (
    newValue: ListboxValue,
    isControlOrCommandPressed?: boolean
  ) => void;
}

/** `ListboxItem` Props.
 * @public
 * @deprecated in 4.12.0. Props of deprecated component {@link ListboxItem}.
 */
export interface ListboxItemProps
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  /** The unique item's value. */
  value: ListboxValue;
  /** set if item is disabled. */
  disabled?: boolean;
}

/** `Listbox` Context.
 * @public
 * @deprecated in 4.12.0. Props of deprecated context {@link ListboxContext}.
 */
export interface ListboxContextProps {
  listboxId?: string;
  listboxValue?: ListboxValue;
  focusValue?: ListboxValue;
  onListboxValueChange: (
    newValue: ListboxValue,
    isControlOrCommandPressed?: boolean
  ) => void;
  listboxRef?: React.RefObject<HTMLUListElement>;
}

/** Context set up by listbox for use by `ListboxItems` .
 * @public
 * @deprecated in 4.12.0. Context of deprecated component {@link Listbox}.
 */
export const ListboxContext = React.createContext<ListboxContextProps>({
  onListboxValueChange: (_newValue: ListboxValue | undefined) => {},
});

function makeId(...args: Array<string | number | null | undefined>) {
  return args.filter((val) => val != null).join("--");
}

function getOptionValueArray(childNodes: React.ReactNode): ListboxItemProps[] {
  return React.Children.toArray(childNodes)
    .filter((node) => React.isValidElement(node) && node.props.value)
    .map(
      (optionNode) =>
        (optionNode as React.ReactElement).props as ListboxItemProps
    );
}

function processKeyboardNavigation(
  optionValues: ListboxItemProps[],
  itemIndex: number,
  key: string
): [number, boolean] {
  let keyProcessed = false;
  let newIndex = itemIndex >= 0 ? itemIndex : 0;

  // Note: In aria example Page Up/Down just moves up or down by one item. See https://www.w3.org/TR/wai-aria-practices-1.1/examples/listbox/js/listbox.js
  if (key === Key.ArrowDown.valueOf() || key === Key.PageDown.valueOf()) {
    for (let i = itemIndex + 1; i < optionValues.length; i++) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key.ArrowUp.valueOf() || key === Key.PageUp.valueOf()) {
    for (let i = itemIndex - 1; i >= 0; i--) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key.Home.valueOf()) {
    for (let i = 0; i < optionValues.length; i++) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  } else if (key === Key.End.valueOf()) {
    for (let i = optionValues.length - 1; i >= 0; i--) {
      if (!optionValues[i].disabled) {
        newIndex = i;
        break;
      }
    }
    keyProcessed = true;
  }
  return [newIndex, keyProcessed];
}

/** Single select `Listbox` component
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.
 */
export function Listbox(props: ListboxProps) {
  const {
    ariaLabel,
    ariaLabelledBy,
    id,
    children,
    selectedValue,
    className,
    onListboxValueChange,
    onKeyDown,
    ...otherProps
  } = props;
  const listRef = React.useRef<HTMLUListElement>(null);
  const [listId] = React.useState(() => {
    return id ?? Guid.createValue();
  });
  const optionValues = React.useMemo(
    () => getOptionValueArray(children),
    [children]
  );
  const classes = React.useMemo(
    () => classnames("core-listbox", className),
    [className]
  );
  const [currentValue, setCurrentValue] = React.useState<
    ListboxValue | undefined
  >(selectedValue);
  const [focusValue, setFocusValue] = React.useState<ListboxValue | undefined>(
    currentValue
  );

  React.useEffect(() => {
    setCurrentValue(selectedValue);
    setFocusValue(selectedValue);
  }, [selectedValue]);

  const scrollTopRef = React.useRef(0);
  const handleValueChange = React.useCallback(
    (newValue: ListboxValue, isControlOrCommandPressed?: boolean) => {
      if (newValue !== currentValue) {
        setCurrentValue(newValue);
        setFocusValue(newValue);
        if (onListboxValueChange)
          onListboxValueChange(newValue, isControlOrCommandPressed);
      }
    },
    [setCurrentValue, currentValue, onListboxValueChange]
  );

  const focusOption = React.useCallback(
    (itemIndex: number) => {
      if (itemIndex >= 0 && itemIndex < optionValues.length) {
        const newSelection = optionValues[itemIndex];
        const listElement = listRef.current as HTMLUListElement;
        const optionToFocus = listElement.querySelector<HTMLLIElement>(
          `li[data-value="${newSelection.value}"]`
        );
        if (optionToFocus && listElement) {
          let newScrollTop = listElement.scrollTop;

          if (listElement.scrollHeight > listElement.clientHeight) {
            const scrollBottom =
              listElement.clientHeight + listElement.scrollTop;
            const elementBottom =
              optionToFocus.offsetTop + optionToFocus.offsetHeight;
            if (elementBottom > scrollBottom) {
              newScrollTop = elementBottom - listElement.clientHeight;
            } else if (optionToFocus.offsetTop < listElement.scrollTop) {
              newScrollTop = optionToFocus.offsetTop;
            }
            scrollTopRef.current = newScrollTop;
          }
          setFocusValue(newSelection.value);
        }
      }
    },
    [optionValues]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      if (optionValues.length < 1) return;

      const itemIndex =
        undefined === focusValue
          ? -1
          : optionValues.findIndex(
              (optionValue) => optionValue.value === focusValue
            );

      if (event.key === " ") {
        event.preventDefault();
        if (focusValue)
          handleValueChange(
            focusValue,
            event.getModifierState("Control") || event.getModifierState("Meta")
          ); // Control or Command
        return;
      } else {
        const [newItemIndex, keyProcessed] = processKeyboardNavigation(
          optionValues,
          itemIndex,
          event.key
        );
        if (keyProcessed) {
          event.preventDefault();
          focusOption(newItemIndex);
          return;
        }
      }

      if (onKeyDown) onKeyDown(event);
    },
    [focusValue, optionValues, focusOption, onKeyDown, handleValueChange]
  );

  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    const list = listRef.current as HTMLUListElement;

    if (isInitialMount.current) {
      isInitialMount.current = false;

      if (undefined !== focusValue) {
        const itemIndex = optionValues.findIndex(
          (optionValue) => optionValue.value === focusValue
        );
        focusOption(itemIndex);
      }
    } else {
      list.scrollTop = scrollTopRef.current;
    }
  }, [focusValue, focusOption, optionValues]);

  const handleOnScroll = React.useCallback(
    (_event: React.UIEvent<HTMLUListElement, UIEvent>) => {
      if (listRef.current) scrollTopRef.current = listRef.current.scrollTop;
    },
    []
  );

  const handleOnFocus = React.useCallback(
    (_event: React.FocusEvent<HTMLUListElement>) => {
      if (!focusValue || 0 === focusValue.length) {
        if (currentValue) {
          setFocusValue(currentValue);
        } else {
          if (optionValues.length > 0) setFocusValue(optionValues[0].value);
        }
      }
    },
    [currentValue, focusValue, optionValues]
  );

  return (
    <ul
      className={classes}
      // If the listbox is not part of another widget, then it has a visible
      // label referenced by `aria-labelledby` on the element with role
      // `listbox`.
      // https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox
      // If an `aria-label` is passed, we should skip `aria-labelledby` to
      // avoid confusion.
      aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
      aria-label={ariaLabel}
      // An element that contains or owns all the listbox options has role
      // listbox.
      // https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox
      role="listbox"
      // https://www.w3.org/TR/wai-aria-practices-1.2/examples/listbox/listbox-collapsible.html
      tabIndex={0}
      // https://www.w3.org/TR/wai-aria-practices-1.2/examples/listbox/listbox-scrollable.html
      aria-activedescendant={makeId(currentValue, listId)}
      {...otherProps}
      ref={listRef}
      id={listId}
      onKeyDown={handleKeyDown}
      onScroll={handleOnScroll}
      data-value={currentValue}
      data-focusvalue={focusValue}
      onFocus={handleOnFocus}
    >
      <ListboxContext.Provider
        value={{
          listboxValue: currentValue,
          focusValue,
          listboxId: listId,
          onListboxValueChange: handleValueChange,
          listboxRef: listRef,
        }}
      >
        {children}
      </ListboxContext.Provider>
    </ul>
  );
}

/** `ListboxItem` component.
 * @public
 * @deprecated in 4.12.0. Use {@link https://itwinui.bentley.com/docs/list iTwinUI list} instead.
 */
export function ListboxItem(props: ListboxItemProps) {
  const { children, value, className, disabled, ...otherProps } = props;

  const { listboxValue, focusValue, listboxId, onListboxValueChange } =
    React.useContext(ListboxContext);

  const hasFocus = focusValue === value;

  const classes = React.useMemo(
    () => classnames("core-listbox-item", hasFocus && "focused", className),
    [className, hasFocus]
  );
  const itemRef = React.useRef<HTMLLIElement>(null);
  const isSelected = listboxValue === value;

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      event.preventDefault();
      const selectedValue = event.currentTarget?.dataset?.value;
      if (undefined !== selectedValue) {
        onListboxValueChange(selectedValue, event.ctrlKey);
      }
    },
    [onListboxValueChange]
  );

  const getItemId = React.useCallback(() => {
    return makeId(value, listboxId);
  }, [listboxId, value]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      // In a single-select listbox, the selected option has `aria-selected`
      // set to `true`.
      // https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox
      aria-selected={isSelected}
      // Applicable to all host language elements regardless of whether a
      // `role` is applied.
      // https://www.w3.org/WAI/PF/aria/states_and_properties#global_states_header
      aria-disabled={disabled || undefined}
      // Each option in the listbox has role `option` and is a DOM descendant
      // of the element with role `listbox`.
      // https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox
      role="option"
      className={classes}
      {...otherProps}
      ref={itemRef}
      id={getItemId()}
      // used for css styling
      data-value={value}
      onClick={handleClick}
    >
      {children}
    </li>
  );
}
