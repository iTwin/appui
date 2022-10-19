/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import { StagePanelLocation } from "@itwin/appui-abstract";
import { CommonProps } from "@itwin/core-react";
import { ContentGroup, ContentGroupProvider } from "../content/ContentGroup";
import { ToolItemDef } from "../shared/ToolItemDef";
import { StagePanelProps } from "../stagepanels/StagePanel";
import { StagePanelDef } from "../stagepanels/StagePanelDef";
import { FrontstageActivatedEventArgs, FrontstageManager } from "./FrontstageManager";
import { WidgetProps } from "../widgets/WidgetProps";

/** Properties for a [[Frontstage]] component.
 * @public
 */
export interface FrontstageProps extends CommonProps {
  /** Id for the Frontstage */
  id: string;
  /** Tool that is started once the Frontstage is activated */
  defaultTool: ToolItemDef;
  /** The Content Group providing the Content Views */
  contentGroup: ContentGroup | ContentGroupProvider;
  /** Id of the Content View to be activated initially */
  defaultContentId?: string;
  /** Any application data to attach to this Frontstage. */
  applicationData?: any;
  /** Usage type for this Frontstage. */
  usage?: string;
  /** Frontstage version. Used to force saved layout reinitialization after changes to frontstage.
   * @note This value should be increased when changes are made to Frontstage.
   * Increasing the value will make sure to reinitialize App layout instead of restoring to old layout.
   * Version increase is required when widgets are added/removed.
   */
  version?: number;
  /** if isIModelIndependent then frontstage is independent from any iModel. */
  isIModelIndependent?: boolean;

  /** The Zone in the top-left corner that shows tools typically used to query and modify content. To be used in place of deprecated topLeft zone definition. */
  contentManipulation?: React.ReactElement<WidgetProps>;
  /** The Zone the that shows settings for the active tool. To be used in place of deprecated topCenter zone definition. */
  toolSettings?: React.ReactElement<WidgetProps>;
  /** The Zone in the top-right corner that shows view navigation tools. To be used in place of deprecated topRight zone definition */
  viewNavigation?: React.ReactElement<WidgetProps>;
  /** The status bar Zone shown as the application footer. To be used in place of deprecated bottomCenter zone definition. */
  statusBar?: React.ReactElement<WidgetProps>;

  /** The StagePanel on the top of the AppUi container. */
  topPanel?: React.ReactElement<StagePanelProps>;
  /** The StagePanel on the very top across the full width.
   * @deprecated Only topPanel is supported in UI 2.0 */
  topMostPanel?: React.ReactElement<StagePanelProps>;
  /** The StagePanel on the left.  */
  leftPanel?: React.ReactElement<StagePanelProps>;
  /** The StagePanel on the right.  */
  rightPanel?: React.ReactElement<StagePanelProps>;
  /** The StagePanel on the bottom of the AppUi container.  */
  bottomPanel?: React.ReactElement<StagePanelProps>;
  /** The StagePanel on the very bottom across the full width.
   * @deprecated Only bottomPanel is supported in UI 2.0  */
  bottomMostPanel?: React.ReactElement<StagePanelProps>;
}

/** Frontstage React component.
 * A Frontstage is a full-screen configuration designed to enable the user to accomplish a task.
 * @public
 */
export class Frontstage extends React.Component<FrontstageProps> {
  /** @internal */
  public static createStagePanelDef(panelLocation: StagePanelLocation, props: FrontstageProps): StagePanelDef | undefined {
    const panelDef = new StagePanelDef();

    const panelElement = Frontstage.getStagePanelElement(panelLocation, props);
    panelDef.initializeFromProps(panelElement?.props, panelLocation);

    return panelDef;
  }

  private static getStagePanelElement(location: StagePanelLocation, props: FrontstageProps): React.ReactElement<StagePanelProps> | undefined {
    let panelElement: React.ReactElement<StagePanelProps> | undefined;

    switch (location) {
      case StagePanelLocation.Top:
        panelElement = props.topPanel;
        break;
      case StagePanelLocation.TopMost:
        panelElement = props.topMostPanel;  // eslint-disable-line deprecation/deprecation
        break;
      case StagePanelLocation.Left:
        panelElement = props.leftPanel;
        break;
      case StagePanelLocation.Right:
        panelElement = props.rightPanel;
        break;
      case StagePanelLocation.Bottom:
        panelElement = props.bottomPanel;
        break;
      case StagePanelLocation.BottomMost:
        panelElement = props.bottomMostPanel; // eslint-disable-line deprecation/deprecation
        break;
      // istanbul ignore next
      default:
        throw new RangeError();
    }

    // Panels can be undefined in a Frontstage

    return panelElement;
  }

  /** @internal */
  public override render(): React.ReactNode {
    return null;
  }
}

/** Hook that returns active frontstage id.
 * @public
 */
export const useActiveFrontstageId = () => {
  const def = useActiveFrontstageDef();
  const id = React.useMemo(() => def ? /* istanbul ignore next */ def.id : "", [def]);
  return id;
};

/** @internal */
export function useActiveFrontstageDef() {
  const [def, setDef] = React.useState(FrontstageManager.activeFrontstageDef);
  React.useEffect(() => {
    // istanbul ignore next
    const handleActivated = (args: FrontstageActivatedEventArgs) => {
      setDef(args.activatedFrontstageDef);
    };
    FrontstageManager.onFrontstageActivatedEvent.addListener(handleActivated);
    return () => {
      FrontstageManager.onFrontstageActivatedEvent.removeListener(handleActivated);
    };
  }, []);
  return def;
}

/** Hook that returns the widgetDef for a specific widgetId within the active frontstage.
 * @public
 */
export function useSpecificWidgetDef(widgetId: string) {
  const frontstageDef = useActiveFrontstageDef();
  return frontstageDef?.findWidgetDef(widgetId);
}
