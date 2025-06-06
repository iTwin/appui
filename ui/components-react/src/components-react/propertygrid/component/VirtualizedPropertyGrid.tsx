/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** @packageDocumentation
 * @module PropertyGrid
 */
import "./VirtualizedPropertyGrid.scss";
import classnames from "classnames";
import * as React from "react";
import type {
  ListChildComponentProps,
  VariableSizeListProps,
} from "react-window";
import { areEqual, VariableSizeList } from "react-window";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { assert } from "@itwin/core-bentley";
import { createContextWithMandatoryProvider } from "../../common/UseContextWithMandatoryProvider.js";
import type { PropertyUpdatedArgs } from "../../editors/EditorContainer.js";
import type { ActionButtonRenderer } from "../../properties/renderers/ActionButtonRenderer.js";
import type { PropertyGridColumnInfo } from "../../properties/renderers/PropertyGridColumns.js";
import type { PropertyValueRendererManager } from "../../properties/ValueRendererManager.js";
import { FilteredType } from "../dataproviders/filterers/PropertyDataFiltererBase.js";
import type {
  FlatGridItem,
  GridCategoryItem,
} from "../internal/flat-items/FlatGridItem.js";
import { MutableCategorizedPrimitiveProperty } from "../internal/flat-items/MutableCategorizedPrimitiveProperty.js";
import { MutableCustomGridCategory } from "../internal/flat-items/MutableCustomGridCategory.js";
import { FlatGridItemType } from "../internal/flat-items/MutableFlatGridItem.js";
import { MutableGridCategory } from "../internal/flat-items/MutableGridCategory.js";
import { FlatPropertyRenderer } from "../internal/flat-properties/FlatPropertyRenderer.js";
import type { IPropertyGridEventHandler } from "../internal/PropertyGridEventHandler.js";
import type { IPropertyGridModel } from "../internal/PropertyGridModel.js";
import type { PropertyCategoryRendererProps } from "../PropertyCategoryRendererManager.js";
import { PropertyCategoryRendererManager } from "../PropertyCategoryRendererManager.js";
import type {
  IPropertyDataProvider,
  PropertyCategory,
} from "../PropertyDataProvider.js";
import { ColumnResizingPropertyListPropsSupplier } from "./ColumnResizingPropertyListPropsSupplier.js";
import { FlatItemNestedBorderWrapper } from "./FlatItemNestedBorderWrapper.js";
import { PropertyCategoryBlock } from "./PropertyCategoryBlock.js";
import type {
  CommonPropertyGridProps,
  PropertyGridContentHighlightProps,
} from "./PropertyGridCommons.js";
import { PropertyGridCommons } from "./PropertyGridCommons.js";
import { PropertyGridEventsRelatedPropsSupplier } from "./PropertyGridEventsRelatedPropsSupplier.js";
import { useElementsScrollStorage } from "../../common/UseElementsScrollStorage.js";
import { Orientation } from "../../common/Orientation.js";

/** Properties for [[VirtualizedPropertyGrid]] React component
 * @public
 */
export interface VirtualizedPropertyGridProps extends CommonPropertyGridProps {
  /** Property grid view model that defines what needs to be rendered */
  model: IPropertyGridModel;
  /** Handler of the events raised from the property grid */
  eventHandler: IPropertyGridEventHandler;
  /** Property data provider used by the property grid */
  dataProvider: IPropertyDataProvider;
  /** Properties for highlighting property data in the grid. */
  highlight?: PropertyGridContentHighlightProps;
  /** Custom property category renderer manager. Defaults to [[PropertyCategoryRendererManager.defaultManager]]. */
  propertyCategoryRendererManager?: PropertyCategoryRendererManager;
  /** Width of the property grid component. */
  width: number;
  /** Height of the property grid component. */
  height: number;
  /**
   * Specifies which editors system should be used: legacy or the new one.
   * @default "legacy"
   * @beta
   */
  editorSystem?: "legacy" | "new";
}

/** State of [[VirtualizedPropertyGrid]] React component
 * @internal
 */
interface VirtualizedPropertyGridState {
  /** List of PropertyGrid categories */
  gridItems: FlatGridItem[];
  /** Actual orientation used by the property grid */
  orientation: Orientation;
  /** Keeps record of dynamic node heights */
  dynamicNodeHeights: Map<string, number>;
}

/**
 * Context of [[VirtualizedPropertyGrid]] component.
 * @internal
 */
export interface PropertyGridInternalContext {
  gridItems: FlatGridItem[];
  gridEventHandler: IPropertyGridEventHandler;
  gridModel: IPropertyGridModel;

  style?: React.CSSProperties;
  className?: string;
  gridContext: VirtualizedPropertyGridContext;
  onItemHeightChanged: (index: number, key: string, height: number) => void;
}

/**
 * Context of the surrounding [[VirtualizedPropertyGrid]] component.
 * @public
 */
export interface VirtualizedPropertyGridContext {
  orientation: Orientation;
  gridWidth: number;

  isPropertyHoverEnabled: boolean;
  isPropertySelectionEnabled: boolean;
  selectedPropertyKey?: string;
  isPropertyEditingEnabled?: boolean;

  alwaysShowEditor?: (property: PropertyRecord) => boolean;
  onPropertyClicked?: (property: PropertyRecord, key?: string) => void;
  onPropertyRightClicked?: (property: PropertyRecord, key?: string) => void;
  onPropertyContextMenu?: (
    property: PropertyRecord,
    e: React.MouseEvent
  ) => void;

  editingPropertyKey?: string;
  onEditCommit?: (
    args: PropertyUpdatedArgs,
    category: PropertyCategory
  ) => void;
  onEditCancel?: () => void;
  editorSystem: "legacy" | "new";

  eventHandler: IPropertyGridEventHandler;
  dataProvider: IPropertyDataProvider;

  actionButtonRenderers?: ActionButtonRenderer[];
  propertyValueRendererManager?: PropertyValueRendererManager;
  propertyCategoryRendererManager?: PropertyCategoryRendererManager;

  columnRatio: number;
  columnInfo: PropertyGridColumnInfo;
  isResizeHandleBeingDragged: boolean;
  isResizeHandleHovered: boolean;
  onColumnRatioChanged: (ratio: number) => void | {
    ratio: number;
  };
  onResizeHandleDragChanged: (newValue: boolean) => void;
  onResizeHandleHoverChanged: (newValue: boolean) => void;

  highlight?: PropertyGridContentHighlightProps;
}

const [
  PropertyGridInternalContextProvider,
  _PropertyGridInternalContextConsumer,
  usePropertyGridInternalContext,
] = createContextWithMandatoryProvider<PropertyGridInternalContext>(
  "PropertyGridInternalContext"
);

const ACTION_BUTTON_DEFAULT_WIDTH = 90;
const CATEGORY_HEADER_HEIGHT = 42;
const CATEGORY_PROPERTY_HEIGHT = 28;
const VERTICAL_CATEGORY_PROPERTY_HEIGHT = 48;

/**
 * VirtualizedPropertyGrid React component.
 * @public
 */
export class VirtualizedPropertyGrid extends React.Component<
  VirtualizedPropertyGridProps,
  VirtualizedPropertyGridState
> {
  private _listRef = React.createRef<VariableSizeList>();

  constructor(props: VirtualizedPropertyGridProps) {
    super(props);
    this.state = {
      gridItems: [],
      orientation:
        props.orientation ??
        PropertyGridCommons.getCurrentOrientation(
          props.width,
          undefined,
          props.isOrientationFixed,
          props.horizontalOrientationMinWidth
        ),
      dynamicNodeHeights: new Map(),
    };
  }

  /** @internal */
  public override componentDidUpdate(prevProps: VirtualizedPropertyGridProps) {
    if (
      this.props.orientation !== prevProps.orientation ||
      this.props.isOrientationFixed !== prevProps.isOrientationFixed ||
      this.props.horizontalOrientationMinWidth !==
        prevProps.horizontalOrientationMinWidth ||
      this.props.width !== prevProps.width
    )
      this.updateOrientation(this.props.width);

    if (this.props.model !== prevProps.model) {
      if (this._listRef.current) this._listRef.current.resetAfterIndex(0);
    }

    if (
      this.props.highlight !== prevProps.highlight &&
      this.props.highlight?.activeHighlight &&
      this.state.gridItems.length !== 0
    ) {
      let index = 0;
      let foundMatchingItem = false;
      for (const item of this.state.gridItems) {
        if (
          (item instanceof MutableCategorizedPrimitiveProperty &&
            this.props.highlight.activeHighlight.highlightedItemIdentifier ===
              item.derivedRecord.property.name) ||
          (item instanceof MutableGridCategory &&
            this.props.highlight.activeHighlight.highlightedItemIdentifier ===
              item.name)
        ) {
          foundMatchingItem = true;
          break;
        }
        index++;
      }
      if (foundMatchingItem) {
        if (this._listRef.current) this._listRef.current.scrollToItem(index);
      }
    }
  }

  /** @internal */
  public static getDerivedStateFromProps(
    props: VirtualizedPropertyGridProps,
    state: VirtualizedPropertyGridState
  ): VirtualizedPropertyGridState | null {
    return {
      ...state,
      gridItems: props.model.getVisibleFlatGrid(),
    };
  }

  private updateOrientation(width: number) {
    const { orientation, isOrientationFixed, horizontalOrientationMinWidth } = {
      ...this.props,
    };
    const currentOrientation = PropertyGridCommons.getCurrentOrientation(
      width,
      orientation,
      isOrientationFixed,
      horizontalOrientationMinWidth
    );

    if (currentOrientation !== this.state.orientation) {
      this.setState({ orientation: currentOrientation });
    }
  }

  /**
   * Calculate given node height depending on it's type, position in category, parent category depth and current orientation.
   * @param node FlatGridItem node for which to calculate height
   * @returns current height of node.
   */
  private calculateNodeHeight(node: FlatGridItem) {
    return getPropertyHeight(this.state);

    function getPropertyHeight(state: VirtualizedPropertyGridState) {
      const dynamicHeight = state.dynamicNodeHeights.get(node.key);
      if (dynamicHeight !== undefined) {
        if (node instanceof MutableCustomGridCategory) {
          return CATEGORY_HEADER_HEIGHT + (node.isExpanded ? dynamicHeight : 0);
        }

        return dynamicHeight;
      }

      if (node.type === FlatGridItemType.Category) {
        return CATEGORY_HEADER_HEIGHT;
      }

      return state.orientation === Orientation.Vertical
        ? VERTICAL_CATEGORY_PROPERTY_HEIGHT
        : CATEGORY_PROPERTY_HEIGHT;
    }
  }

  private _handleNodeHeightChange = (
    index: number,
    key: string,
    newHeight: number
  ) => {
    if (this.state.dynamicNodeHeights.get(key) === newHeight) {
      return;
    }

    this.setState(
      (state) => {
        return {
          ...state,
          dynamicNodeHeights: new Map(state.dynamicNodeHeights).set(
            key,
            newHeight
          ),
        };
      },
      () => this._listRef.current!.resetAfterIndex(index)
    );
  };

  private _calculateNodeHeightByIndex = (index: number) => {
    const node = this.state.gridItems[index];
    return this.calculateNodeHeight(node);
  };

  private calculateEstimatedHeight() {
    let sum = 0;
    for (const node of this.state.gridItems)
      sum += this.calculateNodeHeight(node);

    return Math.ceil(sum / this.state.gridItems.length);
  }

  private _getNodeKey = (index: number) => {
    const node = this.state.gridItems[index];
    return node.key;
  };

  private _getMaxItemDepth = () => {
    let depth = 0;
    for (const item of this.state.gridItems) {
      if (depth < item.depth) {
        depth = item.depth;
      }
    }
    return depth + 1;
  };

  public override render() {
    const defaultActionButtonWidth =
      (this.props.actionButtonRenderers?.length ?? 0) > 0
        ? ACTION_BUTTON_DEFAULT_WIDTH
        : undefined;

    return (
      <ColumnResizingPropertyListPropsSupplier
        orientation={this.state.orientation}
        width={this.props.width}
        minLabelWidth={this.props.minLabelWidth}
        minValueWidth={this.props.minValueWidth}
        actionButtonWidth={
          this.props.actionButtonWidth !== undefined
            ? this.props.actionButtonWidth
            : defaultActionButtonWidth
        }
        maxPropertyDepth={this._getMaxItemDepth()}
      >
        {(columnResizeContext) => (
          <PropertyGridEventsRelatedPropsSupplier
            isPropertySelectionEnabled={
              this.props.isPropertySelectionEnabled ?? false
            }
            isPropertySelectionOnRightClickEnabled={
              this.props.isPropertySelectionOnRightClickEnabled
            }
            isPropertyEditingEnabled={this.props.isPropertyEditingEnabled}
            onPropertyContextMenu={this.props.onPropertyContextMenu}
            onPropertyUpdated={this.props.onPropertyUpdated}
            onPropertySelectionChanged={this.props.onPropertySelectionChanged}
            isPropertyHoverEnabled={this.props.isPropertyHoverEnabled ?? false}
          >
            {(selectionContext) => {
              const gridContext: VirtualizedPropertyGridContext = {
                orientation: columnResizeContext.orientation,
                gridWidth: this.props.width,

                isPropertyHoverEnabled: selectionContext.isPropertyHoverEnabled,
                isPropertySelectionEnabled:
                  selectionContext.isPropertySelectionEnabled,
                selectedPropertyKey: selectionContext.selectedPropertyKey,
                isPropertyEditingEnabled: this.props.isPropertyEditingEnabled,

                alwaysShowEditor: this.props.alwaysShowEditor,
                onPropertyClicked: selectionContext.onPropertyClicked,
                onPropertyRightClicked: selectionContext.onPropertyRightClicked,
                onPropertyContextMenu: selectionContext.onPropertyContextMenu,

                editingPropertyKey: selectionContext.editingPropertyKey,
                onEditCommit: selectionContext.onEditCommit,
                onEditCancel: selectionContext.onEditCancel,
                editorSystem: this.props.editorSystem ?? "legacy",

                eventHandler: this.props.eventHandler,
                dataProvider: this.props.dataProvider,

                actionButtonRenderers: this.props.actionButtonRenderers,
                propertyValueRendererManager:
                  this.props.propertyValueRendererManager,
                propertyCategoryRendererManager:
                  this.props.propertyCategoryRendererManager,

                columnRatio: columnResizeContext.columnRatio,
                columnInfo: columnResizeContext.columnInfo,
                isResizeHandleBeingDragged:
                  columnResizeContext.isResizeHandleBeingDragged,
                isResizeHandleHovered:
                  columnResizeContext.isResizeHandleHovered,
                onColumnRatioChanged: columnResizeContext.onColumnChanged,
                onResizeHandleDragChanged:
                  columnResizeContext.onResizeHandleDragChanged,
                onResizeHandleHoverChanged:
                  columnResizeContext.onResizeHandleHoverChanged,

                highlight: this.props.highlight,
              };

              const renderContext: PropertyGridInternalContext = {
                gridItems: this.state.gridItems,
                gridEventHandler: this.props.eventHandler,
                gridModel: this.props.model,
                style: this.props.style,
                className: this.props.className,
                onItemHeightChanged: this._handleNodeHeightChange,
                gridContext,
              };

              return (
                <PropertyGridInternalContextProvider value={renderContext}>
                  <VirtualizedPropertyGridInternal
                    width={this.props.width}
                    height={this.props.height}
                    itemCount={this.state.gridItems.length}
                    itemSize={this._calculateNodeHeightByIndex}
                    estimatedItemSize={this.calculateEstimatedHeight()}
                    overscanCount={10}
                    layout="vertical"
                    style={this.props.style}
                    itemKey={this._getNodeKey}
                    ref={this._listRef}
                  />
                </PropertyGridInternalContextProvider>
              );
            }}
          </PropertyGridEventsRelatedPropsSupplier>
        )}
      </ColumnResizingPropertyListPropsSupplier>
    );
  }
}

const VirtualizedPropertyGridInternal = React.forwardRef<
  VariableSizeList,
  Omit<VariableSizeListProps, "children">
>(function VirtualizedPropertyGridInternal(props, ref) {
  const { gridContext } = usePropertyGridInternalContext(FlatGridItemNode);

  React.useEffect(() => {
    return gridContext.dataProvider.onDataChanged.addListener(() => {
      gridContext.onEditCancel?.();
    });
  }, [gridContext]);

  return (
    <div
      className={classnames(
        "components-virtualized-property-grid",
        "components-smallEditor-host"
      )}
    >
      <VariableSizeList
        {...props}
        className={classnames(
          "components-property-grid-wrapper",
          "ReactWindow__VariableSizeList",
          props.className
        )}
        ref={ref}
      >
        {FlatGridItemNode}
      </VariableSizeList>
    </div>
  );
});

/**
 * Returns callbacks for persisting and restoring [[VirtualizedPropertyGrid]] layout state.
 * Returned `ref` should be set on container containing [[VirtualizedPropertyGrid]].
 * @public
 */
export function useVirtualizedPropertyGridLayoutStorage<T extends Element>() {
  return useElementsScrollStorage<T>("ReactWindow__VariableSizeList");
}

const FlatGridItemNode = React.memo(
  ({ index, style: virtualizedListStyle }: ListChildComponentProps) => {
    const {
      gridItems,
      gridEventHandler,
      gridModel,
      gridContext,
      className,
      style,
      onItemHeightChanged,
    } = usePropertyGridInternalContext(FlatGridItemNode);
    const node = gridItems[index];
    const divRef = React.useRef<HTMLDivElement>(null);
    const previousHeightRef = React.useRef(0);

    const onExpansionToggled = React.useCallback(
      () => gridEventHandler.onExpansionToggled(node.selectionKey),
      [gridEventHandler, node.selectionKey]
    );
    const onHeightChanged = React.useCallback(
      (newHeight: number) => onItemHeightChanged(index, node.key, newHeight),
      [onItemHeightChanged, index, node.key]
    );

    const minHeight = React.useMemo(() => {
      if (node.type === FlatGridItemType.Category)
        return CATEGORY_HEADER_HEIGHT;

      return gridContext.orientation === Orientation.Vertical
        ? VERTICAL_CATEGORY_PROPERTY_HEIGHT
        : CATEGORY_PROPERTY_HEIGHT;
    }, [gridContext.orientation, node.type]);

    React.useLayoutEffect(() => {
      assert(divRef.current !== null);
      const refHeight = divRef.current.getBoundingClientRect().height;
      const currentHeight = Math.max(refHeight, minHeight);

      if (currentHeight !== previousHeightRef.current) {
        onHeightChanged(currentHeight);
        previousHeightRef.current = currentHeight;
      }
    });

    function getDisplayNode() {
      const lastInNumberOfCategories = node.lastInNumberOfCategories;
      switch (node.type) {
        case FlatGridItemType.Category:
          const categoryRendererManager =
            gridContext.propertyCategoryRendererManager ??
            PropertyCategoryRendererManager.defaultManager;
          const customRenderer =
            categoryRendererManager.getCategoryComponent(node);
          const wrapperClassName = classnames(
            "virtualized-grid-node-content",
            customRenderer !== undefined
              ? "virtualized-grid-node-custom-category"
              : "virtualized-grid-node-category"
          );
          return (
            <FlatItemNestedBorderWrapper
              borderCount={node.depth}
              bottomBorderCount={lastInNumberOfCategories}
              className={wrapperClassName}
            >
              <PropertyCategoryBlock
                className={className}
                style={style}
                category={node.derivedCategory}
                onExpansionToggled={onExpansionToggled}
                highlight={
                  gridContext.highlight?.filteredTypes?.includes(
                    FilteredType.Category
                  )
                    ? gridContext.highlight
                    : undefined
                }
              >
                {customRenderer !== undefined && (
                  <CustomCategoryContent
                    renderer={customRenderer}
                    categoryItem={node}
                    gridContext={gridContext}
                    onHeightChanged={onHeightChanged}
                  />
                )}
              </PropertyCategoryBlock>
            </FlatItemNestedBorderWrapper>
          );
        case FlatGridItemType.Array:
        case FlatGridItemType.Struct:
        case FlatGridItemType.Primitive:
          const selectionKey = node.selectionKey;
          const parentCategoryItem = gridModel.getItem(
            node.parentCategorySelectionKey
          ) as GridCategoryItem;

          return (
            <FlatItemNestedBorderWrapper
              borderCount={parentCategoryItem.depth + 1}
              bottomBorderCount={lastInNumberOfCategories}
              className="virtualized-grid-node-content"
            >
              <FlatPropertyRenderer
                key={node.key}
                uniqueKey={selectionKey}
                propertyRecord={node.derivedRecord}
                orientation={gridContext.orientation}
                indentation={node.depth}
                width={gridContext.gridWidth}
                isHoverable={gridContext.isPropertyHoverEnabled}
                isSelectable={gridContext.isPropertySelectionEnabled}
                isSelected={selectionKey === gridContext.selectedPropertyKey}
                onClick={gridContext.onPropertyClicked}
                onRightClick={gridContext.onPropertyRightClicked}
                onContextMenu={gridContext.onPropertyContextMenu}
                category={parentCategoryItem.derivedCategory}
                isEditing={selectionKey === gridContext.editingPropertyKey}
                isPropertyEditingEnabled={gridContext.isPropertyEditingEnabled}
                alwaysShowEditor={gridContext.alwaysShowEditor}
                onEditCommit={gridContext.onEditCommit}
                onEditCancel={gridContext.onEditCancel}
                editorSystem={gridContext.editorSystem}
                isExpanded={node.isExpanded}
                onExpansionToggled={onExpansionToggled}
                onHeightChanged={onHeightChanged}
                actionButtonRenderers={gridContext.actionButtonRenderers}
                propertyValueRendererManager={
                  gridContext.propertyValueRendererManager
                }
                columnRatio={gridContext.columnRatio}
                columnInfo={gridContext.columnInfo}
                isResizeHandleBeingDragged={
                  gridContext.isResizeHandleBeingDragged
                }
                isResizeHandleHovered={gridContext.isResizeHandleHovered}
                onColumnRatioChanged={gridContext.onColumnRatioChanged}
                onResizeHandleDragChanged={
                  gridContext.onResizeHandleDragChanged
                }
                onResizeHandleHoverChanged={
                  gridContext.onResizeHandleHoverChanged
                }
                highlight={
                  gridContext.highlight
                    ? {
                        applyOnLabel:
                          gridContext.highlight.filteredTypes?.includes(
                            FilteredType.Label
                          ) ?? false,
                        applyOnValue:
                          gridContext.highlight.filteredTypes?.includes(
                            FilteredType.Value
                          ) ?? false,
                        ...gridContext.highlight,
                      }
                    : undefined
                }
              />
            </FlatItemNestedBorderWrapper>
          );
      }
    }

    return (
      <div className="virtualized-grid-node" style={virtualizedListStyle}>
        <div
          className="virtualized-grid-node-content-wrapper"
          style={{
            minHeight: `${minHeight}px`,
            display: "grid",
          }}
        >
          <div
            ref={divRef}
            className="virtualized-grid-node-content-wrapper-item"
          >
            {getDisplayNode()}
          </div>
        </div>
      </div>
    );
  },
  areEqual
);

FlatGridItemNode.displayName = "FlatGridItemNode";

interface CustomCategoryContentProps {
  categoryItem: GridCategoryItem;
  renderer: React.ComponentType<PropertyCategoryRendererProps>;
  gridContext: VirtualizedPropertyGridContext;
  onHeightChanged: (newHeight: number) => void;
}

const CustomCategoryContent: React.FC<CustomCategoryContentProps> = (props) => {
  const { onHeightChanged } = props;
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    assert(divRef.current !== null);
    const contentHeight = divRef.current.getBoundingClientRect().height;
    onHeightChanged(contentHeight);
  }, [props.gridContext.orientation, onHeightChanged]);

  return <div ref={divRef}>{React.createElement(props.renderer, props)}</div>;
};
