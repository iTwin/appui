/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import { Point, PointProps } from "../../utilities/Point";
import { Rectangle, RectangleProps } from "../../utilities/Rectangle";
import { SizeProps } from "../../utilities/Size";
import { ResizeHandle } from "../../widget/rectangular/ResizeHandle";
import { NineZone, NineZoneProps, WidgetZoneIndex, ZonesType } from "./NineZone";
import { Widget } from "./Widget";
import { WidgetZone, StatusZoneManager, StatusZoneManagerProps, ZonePropsBase } from "./Zone";
import { TargetType, TargetZoneProps } from "./Target";

/** @alpha */
export type NineZoneFactory = (props: NineZoneProps) => NineZone;

/** @alpha */
export class StateManager {
  private _lastStackId = 1;
  private _nineZoneFactory: NineZoneFactory;

  public constructor(nineZoneFactory: NineZoneFactory) {
    this._nineZoneFactory = nineZoneFactory;
  }

  public handleTabClick(widgetId: WidgetZoneIndex, tabIndex: number, state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);

    const widget = model.getWidget(widgetId);

    const isClosing = tabIndex === widget.props.tabIndex;

    return this.handleWidgetStateChange(widgetId, tabIndex, !isClosing, state);
  }

  public handleWidgetStateChange(widgetId: WidgetZoneIndex, tabIndex: number, isOpening: boolean, state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);

    const widget = model.getWidget(widgetId);
    const zone = widget.zone;

    const isClosing = !isOpening;

    if (isClosing && zone.isFloating())
      return state;

    if (isClosing && widget.props.tabIndex !== tabIndex)
      return state;

    // Close all widgets
    const widgets = zone.props.widgets.map((w) => ({
      ...w,
      tabIndex: -1,
    }));
    const widgetIndex = widgets.findIndex((w) => w.id === widgetId);

    const newState: NineZoneProps = {
      ...model.props,
      zones: {
        ...model.props.zones,
        [zone.props.id]: {
          ...model.props.zones[zone.props.id],
          widgets: isClosing ? widgets :
            [
              // Open clicked widget
              ...widgets.slice(0, widgetIndex),
              {
                ...widgets[widgetIndex],
                tabIndex,
              },
              ...widgets.slice(widgetIndex + 1),
            ],
        },
      },
    };

    return newState;
  }

  public layout(size: SizeProps, state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);
    model.root.size = size;

    const newState: NineZoneProps = {
      ...model.props,
      size: {
        ...size,
      },
      zones: {
        ...model.props.zones,
        ...Object.keys(model.props.zones).reduce((acc: Partial<ZonesType>, key) => {
          const id = Number(key) as WidgetZoneIndex;
          const bounds = model.getWidgetZone(id).getLayout().getInitialBounds();
          acc[id] = {
            ...model.props.zones[id],
            isLayoutChanged: false,
            bounds,
          };
          return acc;
        }, {}),
      },

    };

    return newState;
  }

  public handleResize(zoneId: WidgetZoneIndex, x: number, y: number, handle: ResizeHandle, filledHeightDiff: number, state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);
    model.getWidgetZone(zoneId).getLayout().resize(x, y, handle, filledHeightDiff);

    const newState: NineZoneProps = {
      ...model.props,
      zones: {
        ...model.props.zones,
        ...Object.keys(model.props.zones).reduce((acc: Partial<ZonesType>, key) => {
          const id = Number(key) as WidgetZoneIndex;
          const zone = state.zones[id];

          const layout = model.getWidgetZone(id).getLayout();
          const bounds = layout.bounds.equals(zone.bounds) ? zone.bounds : layout.bounds;
          const isLayoutChanged = zoneId === id ? true : zone.isLayoutChanged;

          const oldFloatingBounds = zone.floating ? zone.floating.bounds : undefined;
          const newFloatingBounds = layout.floatingBounds;

          let floating = zone.floating;
          if (newFloatingBounds && oldFloatingBounds && !newFloatingBounds.equals(oldFloatingBounds)) {
            floating = {
              ...state.zones[id].floating,
              stackId: state.zones[id].floating!.stackId,
              bounds: newFloatingBounds,
            };
          }

          const noChange = bounds === zone.bounds &&
            floating === zone.floating &&
            isLayoutChanged === zone.isLayoutChanged;

          if (noChange) {
            acc[id] = zone;
            return acc;
          }

          acc[id] = {
            ...model.props.zones[id],
            bounds,
            floating,
            isLayoutChanged,
          };
          return acc;
        }, {}),
      },
    };

    return newState;
  }

  public setIsInFooterMode(isInFooterMode: boolean, state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);
    const root = model.root;
    if (root.isInFooterMode === isInFooterMode)
      return state;

    root.isInFooterMode = isInFooterMode;

    const newState: NineZoneProps = {
      ...model.props,
      zones: {
        ...model.props.zones,
        ...Object.keys(model.props.zones).reduce((acc: Partial<ZonesType>, key) => {
          const id = Number(key) as WidgetZoneIndex;
          const zone = model.getWidgetZone(id);
          const bounds = zone.getLayout().getInitialBounds();

          acc[id] = {
            ...model.props.zones[id],
            bounds,
            ...(id === StatusZoneManager.id && { isInFooterMode } as StatusZoneManagerProps),
          };

          return acc;
        }, {}),
      },
    };

    return newState;
  }

  public mergeZone(toMergeId: WidgetZoneIndex, targetId: WidgetZoneIndex, state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);
    const zone = model.getWidgetZone(toMergeId);
    const target = model.getWidgetZone(targetId);
    if (!zone.canBeMergedTo(target))
      return state;

    const newState: NineZoneProps = {
      ...state,
      zones: {
        ...state.zones,
        [toMergeId]: {
          ...state.zones[toMergeId],
          widgets: [],
        },
        [targetId]: {
          ...state.zones[targetId],
          widgets: [
            ...state.zones[targetId].widgets,
            {
              id: toMergeId,
              tabIndex: -1,
            },
          ],
        },
      },
    };
    return newState;
  }

  public handleWidgetTabDragStart(widgetId: WidgetZoneIndex, tabId: number, initialPosition: PointProps, offset: PointProps, state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);

    const widget = model.getWidget(widgetId);
    const zone = widget.zone;
    if (!zone.isWidgetOpen)
      return state;

    const isUnmerge = zone.getWidgets().length > 1;
    const defaultZone = widget.defaultZone;
    if (!defaultZone.props.allowsMerging)
      return state;

    const unmergeBounds = zone.getUnmergeWidgetBounds(widget);
    let floatingBounds: RectangleProps = Rectangle.create(widget.zone.props.bounds).offset(offset);
    if (widget.isInHomeZone)
      floatingBounds = defaultZone.props.floating ? defaultZone.props.floating.bounds : defaultZone.props.bounds;

    const keepSomeZonesMerged = zone.getWidgets().length > unmergeBounds.length;
    return {
      ...model.props,
      zones: {
        ...model.props.zones,
        ...Object.keys(model.props.zones).reduce((acc: Partial<ZonesType>, key) => {
          const id = Number(key) as WidgetZoneIndex;
          const mergedZone = unmergeBounds.find((z) => z.id === id);

          if (!mergedZone)
            return acc;

          const isDefaultZone = id === defaultZone.id;
          const isZone = id === zone.id;
          const unsetAnchor = !isDefaultZone;
          const filterOthers = isZone && keepSomeZonesMerged;

          const filteredWidgets = model.props.zones[zone.props.id].widgets.filter((w) => {
            if (filterOthers)
              return w.id !== widgetId;
            return w.id === id;
          });

          const isZoneOpen = filteredWidgets.some((w) => w.tabIndex > 0);
          const widgets = isZoneOpen ? filteredWidgets : filteredWidgets.map((w, index) => {
            const isFirstWidget = index === 0;
            const isClosed = w.tabIndex < 1;
            const tabIndex = isDefaultZone ? tabId : 1;
            const openWidget = isFirstWidget && isClosed;
            if (openWidget) {
              return {
                ...w,
                tabIndex,
              };
            }

            return w;
          });

          acc[id] = {
            ...model.props.zones[id],
            ...defaultZone.id === id ? {
              floating: {
                bounds: floatingBounds,
                stackId: this._lastStackId++,
              },
            } : {},
            ...unsetAnchor ? { anchor: undefined } : {},
            bounds: mergedZone.bounds,
            widgets,
          };

          return acc;
        }, {}),
      },
      draggingWidget: {
        id: widgetId,
        tabIndex: tabId,
        lastPosition: {
          x: initialPosition.x,
          y: initialPosition.y,
        },
        isUnmerge,
      },
    };
  }

  public handleWidgetTabDragEnd(state: NineZoneProps): NineZoneProps {
    if (!state.draggingWidget)
      return state;

    if (!state.target) {
      return {
        ...state,
        draggingWidget: undefined,
      };
    }

    switch (state.target.type) {
      case TargetType.Merge: {
        return this.mergeDrop(state);
      }
      case TargetType.Back: {
        return this.backDrop(state);
      }
    }
  }

  public handleWidgetTabDrag(dragged: PointProps, state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);
    const draggingWidget = model.draggingWidget;

    if (!draggingWidget)
      return state;

    const draggingZone = draggingWidget.defaultZone;
    if (!draggingZone.props.floating)
      return state;

    const newBounds = Rectangle.create(draggingZone.props.floating.bounds).offset(dragged);
    const lastPosition = Point.create(draggingWidget.props.lastPosition).offset(dragged);
    const newState: NineZoneProps = {
      ...model.props,
      zones: {
        ...model.props.zones,
        [draggingZone.props.id]: {
          ...model.props.zones[draggingZone.props.id],
          floating: {
            ...model.props.zones[draggingZone.props.id].floating,
            bounds: newBounds,
          },
        } as ZonePropsBase,
      },
      draggingWidget: {
        ...draggingWidget.props,
        lastPosition,
      },
    };

    return newState;
  }

  public handleTargetChanged(target: TargetZoneProps | undefined, state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);
    const draggingWidget = model.draggingWidget;

    if (!draggingWidget || !target)
      return {
        ...state,
        target: undefined,
      };

    return {
      ...state,
      target: {
        zoneId: target.zoneId,
        type: target.type,
      },
    };
  }

  private mergeDrop(state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);

    if (!model.target)
      return model.props;

    const draggingWidget = model.draggingWidget;
    if (!draggingWidget)
      return model.props;

    const targetZone = model.target.zone;
    const draggingZone = draggingWidget.zone;

    const zonesToUpdate: Partial<ZonesType> = {};
    const bounds = Rectangle.create(draggingZone.props.bounds).outerMergeWith(targetZone.props.bounds);

    const contentZone = model.getContentZone();
    const statusZone = model.getStatusZone();
    const alignedCells = [
      targetZone.cell,
      ...targetZone.cell.getAlignedCellsTo(draggingZone.cell),
      draggingZone.cell,
    ];
    const alignedCellsFiltered = alignedCells.filter((cell) => {
      if (contentZone.cell.equals(cell))
        return false;
      if (statusZone.props.isInFooterMode && statusZone.cell.equals(cell))
        return false;
      return true;
    });
    const alignedZones = alignedCellsFiltered.map((cell) => model.findZone(cell))
      .filter<WidgetZone>((z): z is WidgetZone => z.isWidgetZone());
    const zoneWidgets = alignedZones.map((z) => z.getWidgets());
    let widgets: Widget[] = [];
    widgets = widgets.concat(...zoneWidgets);

    for (const zone of alignedZones)
      if (zone.equals(targetZone))
        zonesToUpdate[zone.props.id] = {
          ...model.props.zones[zone.props.id],
          bounds,
          floating: undefined,
          widgets: [
            ...widgets.map((w) => {
              if (w.equals(draggingWidget.widget))
                return {
                  ...w.props,
                };
              return {
                ...w.props,
                tabIndex: -1,
              };
            }),
          ],
          anchor: draggingZone.defaultHorizontalAnchor,
        };
      else
        zonesToUpdate[zone.props.id] = {
          ...model.props.zones[zone.props.id],
          floating: undefined, // dragging zone is merged and should not float anymore
          widgets: [], // dragging zone is merged and should contain no widgets
        };

    return {
      ...model.props,
      zones: {
        ...model.props.zones,
        ...zonesToUpdate,
      },
      draggingWidget: undefined,
    };
  }

  private backDrop(state: NineZoneProps): NineZoneProps {
    const model = this._nineZoneFactory(state);

    const draggingWidget = model.draggingWidget;
    if (!draggingWidget)
      return state;

    const draggingZone = draggingWidget.zone;
    return {
      ...model.props,
      zones: {
        ...model.props.zones,
        [draggingZone.id]: {
          ...model.props.zones[draggingZone.id],
          floating: undefined,
          anchor: undefined,
        },
      },
      draggingWidget: undefined,
    };
  }

  public setAllowsMerging(zoneId: WidgetZoneIndex, allowsMerging: boolean, state: NineZoneProps): NineZoneProps {
    if (state.zones[zoneId].allowsMerging === allowsMerging)
      return state;

    return {
      ...state,
      zones: {
        ...state.zones,
        [zoneId]: {
          ...state.zones[zoneId],
          allowsMerging,
        },
      },
    };
  }
}

const defaultFactory = (props: NineZoneProps): NineZone => {
  return new NineZone(props);
};

/** @alpha */
// tslint:disable-next-line:variable-name
export const DefaultStateManager = new StateManager(defaultFactory);
