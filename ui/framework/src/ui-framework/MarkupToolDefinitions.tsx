/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Tools */

import {
  SelectTool,
  LineTool,
  RectangleTool,
  PolygonTool,
  CloudTool,
  EllipseTool,
  ArrowTool,
  DistanceTool,
  SketchTool,
  SymbolTool,
  PlaceTextTool,
} from "@bentley/imodeljs-markup";
import { ToolItemDef } from "./shared/ToolItemDef";

/** Utility Class that provides definitions of tools provided by imodeljs-markup package. These definitions can be used to populate the UI.
 *  Note: Application must call 'MarkupApp.initialize()' or 'MarkupApp.start()' before using these definitions.
 * @public
 */
// istanbul ignore next
export class MarkupTools {
  public static get selectToolDef() {
    return ToolItemDef.getItemDefForTool(SelectTool, "icon-cursor");
  }

  public static get lineToolDef() {
    return ToolItemDef.getItemDefForTool(LineTool);
  }

  public static get rectangleToolDef() {
    return ToolItemDef.getItemDefForTool(RectangleTool);
  }

  public static get polygonToolDef() {
    return ToolItemDef.getItemDefForTool(PolygonTool);
  }

  public static get cloudToolDef() {
    return ToolItemDef.getItemDefForTool(CloudTool);
  }

  public static get ellipseToolDef() {
    return ToolItemDef.getItemDefForTool(EllipseTool);
  }

  public static get arrowToolDef() {
    return ToolItemDef.getItemDefForTool(ArrowTool);
  }

  public static get distanceToolDef() {
    return ToolItemDef.getItemDefForTool(DistanceTool);
  }

  public static get sketchToolDef() {
    return ToolItemDef.getItemDefForTool(SketchTool);
  }

  public static get placeTextToolDef() {
    return ToolItemDef.getItemDefForTool(PlaceTextTool);
  }

  public static get symbolToolDef() {
    return ToolItemDef.getItemDefForTool(SymbolTool);
  }
}
