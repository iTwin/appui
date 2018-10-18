/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module ContentView */

import { ContentControl } from "./ContentControl";
import { ConfigurableUiManager } from "./ConfigurableUiManager";
import { ConfigurableUiControlType, ConfigurableUiControlConstructor, ConfigurableCreateInfo } from "./ConfigurableUiControl";
import { StandardViewId } from "@bentley/imodeljs-frontend";

// -----------------------------------------------------------------------------
// ContentGroupDef and associated enums & interfaces
// -----------------------------------------------------------------------------

/** Enumeration for the iModel view class */
export enum ViewClass {
  Drawing,
  Sheet,
  Orthographic,
  Camera,
}

/** Interface for the definition of a color */
export interface ColorDef {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** Interface for the definition of a view specification */
export interface ViewSpecDef {
  viewDefinitionClass: ViewClass;
  viewRotation: StandardViewId;
}

/** Properties for content displayed in a content view */
export interface ContentProps {
  id?: string;
  classId: string | ConfigurableUiControlConstructor;

  featureId?: string;
  sourceFile?: string;

  backgroundColor?: ColorDef;
  defaultViewSpec?: ViewSpecDef;

  applicationData?: any;
}

/** Properties for a [[ContentGroup]] */
export interface ContentGroupProps {
  id?: string;
  contents: ContentProps[];
}

// -----------------------------------------------------------------------------
// ContentGroup class
// -----------------------------------------------------------------------------

/** ContentGroup class. ContentGroups define content displayed in content views that are laid out using a [ContentLayout].
 */
export class ContentGroup {
  private static _sId = 0;

  public groupId: string;
  public contentPropsList: ContentProps[];
  private _contentControls = new Map<string, ContentControl>();
  private _contentSetMap = new Map<React.ReactNode, ContentControl>();

  constructor(groupProps: ContentGroupProps) {
    if (groupProps.id !== undefined)
      this.groupId = groupProps.id;
    else {
      ContentGroup._sId++;
      this.groupId = "ContentGroup-" + ContentGroup._sId;
    }

    this.contentPropsList = groupProps.contents;
  }

  public getContentControl(contentProps: ContentProps, index: number): ContentControl | undefined {
    let id: string;
    if (contentProps.id !== undefined)
      id = contentProps.id;
    else
      id = this.groupId + "-" + index;

    let contentControl: ContentControl | undefined;

    if (!this._contentControls.get(id)) {
      if (typeof contentProps.classId === "string") {
        if (!this._contentControls.get(id) && ConfigurableUiManager.isControlRegistered(contentProps.classId)) {
          contentControl = ConfigurableUiManager.createControl(contentProps.classId, id, contentProps.applicationData) as ContentControl;
          if (contentControl.getType() !== ConfigurableUiControlType.Content && contentControl.getType() !== ConfigurableUiControlType.Viewport) {
            throw Error("ContentGroup.getContentControl error: classId '" + contentProps.classId + "' is registered to a control that is NOT a ContentControl");
          }
        }
      } else {
        const info = new ConfigurableCreateInfo(contentProps.classId.name, id, id);
        contentControl = new contentProps.classId(info, contentProps.applicationData) as ContentControl;
      }

      if (contentControl)
        this._contentControls.set(id, contentControl);
    }

    return this._contentControls.get(id);
  }

  public getContentNodes(): React.ReactNode[] {
    const contentNodes: React.ReactNode[] = new Array<React.ReactNode>();

    this._contentSetMap.clear();

    this.contentPropsList.map((contentProps: ContentProps, index: number) => {
      const control = this.getContentControl(contentProps, index);
      if (control) {
        contentNodes.push(control.reactElement);
        this._contentSetMap.set(control.reactElement, control);
      }
    });

    return contentNodes;
  }

  public getControlFromElement(node: React.ReactNode): ContentControl | undefined {
    return this._contentSetMap.get(node);
  }

  public getContentControls(): ContentControl[] {
    const contentControls: ContentControl[] = new Array<ContentControl>();

    this.contentPropsList.map((contentProps: ContentProps, index: number) => {
      const control = this.getContentControl(contentProps, index);
      if (control) {
        contentControls.push(control);
      }
    });

    return contentControls;
  }

}

// -----------------------------------------------------------------------------
// ContentGroupManager class
// -----------------------------------------------------------------------------

/** ContentGroup Manager class.
 */
export class ContentGroupManager {
  private static _groups: { [groupId: string]: ContentGroup } = {};

  public static loadGroups(groupPropsList: ContentGroupProps[]) {
    groupPropsList.map((groupProps, _index) => {
      this.loadGroup(groupProps);
    });
  }

  public static loadGroup(groupProps: ContentGroupProps) {
    const group = new ContentGroup(groupProps);
    if (groupProps.id)
      this.addGroup(groupProps.id, group);
    else
      throw Error();
  }

  public static findGroup(groupId: string): ContentGroup {
    return this._groups[groupId];
  }

  public static addGroup(groupId: string, group: ContentGroup) {
    this._groups[groupId] = group;
  }
}
