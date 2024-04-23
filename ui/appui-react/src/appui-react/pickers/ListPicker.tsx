/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Picker
 */

import "./ListPicker.scss";
import classnames from "classnames";
import * as React from "react";
import {
  Columns,
  GroupColumn,
  Panel,
  PopupItem,
  Title,
} from "@itwin/components-react";
import type { CommonProps, SizeProps } from "@itwin/core-react";
import { Icon, SearchBox } from "@itwin/core-react";
import { ToolbarDragInteractionContext } from "../toolbar/DragInteraction";
import { UiFramework } from "../UiFramework";
import {
  SvgChevronDown,
  SvgChevronRight,
  SvgList,
} from "@itwin/itwinui-icons-react";

/** Enum for the list picker item type
 * @beta
 */
export enum ListItemType {
  Item = 0,
  Separator = 1,
  Container = 2,
}

/** List picker item
 * @beta
 */
export interface ListItem {
  [key: string]: any;
  id?: string;
  name?: string;
  enabled: boolean;
  type?: ListItemType;
  children?: ListItem[];
}

/** Properties for the [[ListPicker]] component
 * @beta
 */
export interface ListPickerProps {
  title: string;
  items: ListItem[];
  iconSpec?: string | React.ReactNode;
  setEnabled: (item: ListItem, enabled: boolean) => any;
  onExpanded?: (expand: boolean) => void;
  onSizeKnown?: (size: SizeProps) => void;
  searchBox?: boolean;
  onSearchValueChange?: (search: string) => void;
  panelOnly?: boolean;
  expanded?: boolean;
}

/** Properties for the [[ListPickerItem]] component
 * @beta
 */
export interface ListPickerItemProps extends CommonProps {
  key: any;
  isActive?: boolean;
  isFocused?: boolean;
  onClick?: () => void;
  label?: string;
}

/** List Picker Item React component
 * @beta
 */
export class ListPickerItem extends React.PureComponent<ListPickerItemProps> {
  /** Renders ListPickerItem */
  public override render() {
    const itemClassName = classnames(
      "ListPicker-item",
      this.props.isActive && "is-active",
      this.props.isFocused && "is-focused",
      this.props.className
    );
    // TODO - if cut off, show a title
    const title: string | undefined =
      this.props.label && this.props.label.length > 25
        ? this.props.label
        : undefined;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        className={itemClassName}
        onClick={this.props.onClick}
        role="button"
        tabIndex={-1}
      >
        <div className="label" title={title}>
          {this.props.label}
        </div>
      </div>
    );
  }
}

/** Properties for the [[ExpandableSection]] component
 * @beta
 */
export interface ExpandableSectionProps extends CommonProps {
  title?: string;
  expanded?: boolean;
  /** Content */
  children?: React.ReactNode;
}

/** State for the [[ExpandableSection]] component
 * @internal
 */
interface ExpandableSectionState {
  expanded: boolean;
}

/** Expandable Section React component
 * @beta
 */
export class ExpandableSection extends React.PureComponent<
  ExpandableSectionProps,
  ExpandableSectionState
> {
  /** Creates an ExpandableSection */
  constructor(props: ExpandableSectionProps) {
    super(props);
    this.state = { expanded: !!this.props.expanded };
  }

  public override async componentDidUpdate(
    prevProps: Readonly<ExpandableSectionProps>
  ) {
    if (this.props.expanded !== prevProps.expanded) {
      this.setState({ expanded: true });
    }
  }

  private _onClick = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  /** Renders ExpandableSection */
  public override render() {
    const className = classnames(
      "nz-toolbar-item-expandable-group-group",
      this.props.className
    );

    const icon = this.state.expanded ? (
      <Icon iconSpec={<SvgChevronDown />} />
    ) : (
      <Icon iconSpec={<SvgChevronRight />} />
    );

    return (
      <Panel
        className={className}
        style={this.props.style}
        key={this.props.title}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          onClick={this._onClick}
          className={
            this.state.expanded
              ? "ListPickerInnerContainer-header-expanded"
              : "ListPickerInnerContainer-header"
          }
          role="button"
          tabIndex={-1}
          aria-expanded={this.state.expanded}
        >
          <div className="ListPickerInnerContainer-header-content">
            <div className="ListPickerInnerContainer-expander">{icon}</div>
            <div className="ListPickerInnerContainer-title">
              {this.props.title}
            </div>
          </div>
        </div>
        {this.state.expanded ? (
          <GroupColumn>{this.props.children}</GroupColumn>
        ) : (
          <div />
        )}
      </Panel>
    );
  }
}

/** @beta */
export function getListPanel(props: ListPickerProps): React.ReactNode {
  const expandSingleSection = (): boolean => {
    const populatedContainers = props.items.filter((item: ListItem) => {
      return (
        item.type === ListItemType.Container && item.children!.length !== 0
      );
    });
    return populatedContainers.length === 1;
  };

  const listItemToElement = (item: ListItem, itemIndex: number) => {
    switch (item.type) {
      case ListItemType.Item:
        return (
          <ListPickerItem
            {...props}
            key={itemIndex.toString()}
            label={item.name}
            isActive={item.enabled}
            onClick={
              // istanbul ignore next
              () => {
                props.setEnabled(item, !item.enabled);
              }
            }
          />
        );
      case ListItemType.Separator:
        return (
          <div key={itemIndex.toString()} className="ListPicker-separator" />
        );
      case ListItemType.Container:
        if (item.children!.length !== 0) {
          return (
            <ExpandableSection
              key={itemIndex.toString()}
              title={item.name}
              className="ListPickerInnerContainer"
              expanded={
                props.expanded === true
                  ? !expandSingleSection()
                  : expandSingleSection()
              }
            >
              <GroupColumn>{item.children!.map(listItemToElement)}</GroupColumn>
            </ExpandableSection>
          );
        } else {
          return <div key={itemIndex.toString()} />;
        }
      // istanbul ignore next
      default:
        return <div key={itemIndex.toString()} />;
    }
  };

  return (
    <Panel className="ListPickerContainer">
      <Title>{props.title}</Title>
      {props.searchBox && props.onSearchValueChange && (
        // eslint-disable-next-line deprecation/deprecation
        <SearchBox
          className="ListPickerSearchBox"
          onValueChanged={props.onSearchValueChange}
        />
      )}
      <Columns>
        <GroupColumn className="ListPicker-column">
          {props.items.map(listItemToElement)}
        </GroupColumn>
      </Columns>
    </Panel>
  );
}

/**
 * List picker toolbar popup item.
 * Used to provide an expandable list of items to enable/disable items.
 * @beta
 */
function ListPickerPopupItem(props: ListPickerProps) {
  const icon = props.iconSpec ? (
    /* istanbul ignore next */ typeof props.iconSpec === "string" ? (
      <Icon iconSpec={props.iconSpec} />
    ) : (
      <i className="icon uifw-item-svg-icon">{props.iconSpec}</i>
    )
  ) : (
    <Icon iconSpec={<SvgList />} />
  );

  return (
    <ToolbarDragInteractionContext.Consumer>
      {(isEnabled) => {
        return props.panelOnly === true ? (
          getListPanel(props)
        ) : (
          <PopupItem
            hideIndicator={isEnabled}
            icon={icon}
            title={props.title}
            panel={getListPanel(props)}
          />
        );
      }}
    </ToolbarDragInteractionContext.Consumer>
  );
}

/** Properties for the [[ListPicker]] component
 * @beta
 */
export interface ListPickerPropsExtended extends ListPickerProps {
  enableAllFunc?: () => void;
  disableAllFunc?: () => void;
  invertFunc?: () => void;
}

/**
 * List Picker that lets the user pick from a list of items to enable/disable
 * It also provides options to enable all, disable all and invert selection
 * @beta
 */
export class ListPicker extends React.Component<ListPickerPropsExtended> {
  public static get Key_All() {
    return -3;
  }
  public static get Key_None() {
    return -2;
  }
  public static get Key_Invert() {
    return -1;
  }
  public static get Key_Separator() {
    return -4;
  }

  /** Creates a ListPicker */
  constructor(props: ListPickerPropsExtended) {
    super(props);
  }

  // Creates an array of items containing the separator and special requests (all, none, invert)
  private createItems(items: ListItem[]): ListItem[] {
    const newItems: ListItem[] = [];

    // Create special buttons (All/None/Invert)
    if (this.props.enableAllFunc) {
      let allEnabled = true;
      items.map((item: ListItem) => {
        allEnabled = allEnabled && item.enabled;
      });
      newItems.push({
        key: ListPicker.Key_All,
        name: UiFramework.translate("pickerButtons.all"),
        enabled: allEnabled,
        type: ListItemType.Item,
      });
    }
    if (this.props.disableAllFunc) {
      let allDisabled = false;
      items.map((item: ListItem) => {
        allDisabled = allDisabled || item.enabled;
      });
      newItems.push({
        key: ListPicker.Key_None,
        name: UiFramework.translate("pickerButtons.none"),
        enabled: !allDisabled,
        type: ListItemType.Item,
      });
    }
    if (this.props.invertFunc) {
      newItems.push({
        key: ListPicker.Key_Invert,
        name: UiFramework.translate("pickerButtons.invert"),
        enabled: false,
        type: ListItemType.Item,
      });
    }
    if (
      this.props.enableAllFunc ||
      this.props.disableAllFunc ||
      this.props.invertFunc
    ) {
      newItems.push({
        key: ListPicker.Key_Separator,
        name: UiFramework.translate("pickerButtons.separator"),
        enabled: false,
        type: ListItemType.Separator,
      });
    }

    // Push items
    items.map((item) => {
      newItems.push(item);
    });
    return newItems;
  }

  /**
   * Checks if item is a special item.
   * @param item Item to check
   */
  public isSpecialItem(item: ListItem) {
    return (
      item.key === ListPicker.Key_All ||
      item.key === ListPicker.Key_Invert ||
      item.key === ListPicker.Key_None ||
      item.type !== ListItemType.Item ||
      item.key === ListPicker.Key_Separator
    );
  }

  // Handle enabling/disabling the items
  // This will call the this.props.setEnabled function to provide the parent with a chance to process it
  private _setEnabled = (item: ListItem, enabled: boolean) => {
    if (this.isSpecialItem(item)) {
      switch (item.key) {
        case ListPicker.Key_All: {
          // istanbul ignore else
          if (this.props.enableAllFunc) this.props.enableAllFunc();
          return;
        }
        case ListPicker.Key_None: {
          // istanbul ignore else
          if (this.props.disableAllFunc) this.props.disableAllFunc();
          return;
        }
        case ListPicker.Key_Invert: {
          // istanbul ignore else
          if (this.props.invertFunc) this.props.invertFunc();
          return;
        }
      }
    }

    // Call on parent to do processing of the item
    this.props.setEnabled(item, enabled);
  };

  /** Renders ListPicker */
  public override render() {
    return (
      <ListPickerPopupItem
        {...this.props}
        title={this.props.title}
        setEnabled={this._setEnabled}
        onExpanded={this.props.onExpanded}
        items={this.createItems(this.props.items)}
        iconSpec={this.props.iconSpec}
      />
    );
  }
}
