/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContentView
 */

import type * as React from "react";
import type { ScreenViewport } from "@itwin/core-frontend";
import { UiError } from "@itwin/appui-abstract";
import type { ConfigurableUiControlConstructor } from "../configurableui/ConfigurableUiControl.js";
import {
  ConfigurableCreateInfo,
  ConfigurableUiControlType,
} from "../configurableui/ConfigurableUiControl.js";
import { UiFramework } from "../UiFramework.js";
import type { ContentControl } from "./ContentControl.js";
import { InternalConfigurableUiManager } from "../configurableui/InternalConfigurableUiManager.js";
import type { Frontstage } from "../frontstage/Frontstage.js";
import type { ContentLayoutProps } from "./ContentLayoutProps.js";
import type { ConditionalValue } from "../shared/ConditionalValue.js";

/** Properties for content displayed in a content view
 * @public
 */
export interface ContentProps {
  /** A unique id for the Content View within the group. */
  id: string;
  /** The class name or [[ConfigurableUiControlConstructor]] of the content control.
   * @deprecated in 4.16.0. Use {@link ContentProps.content} instead and specify an empty string for this property. This will be made optional in 5.0.0.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  classId: string | ConfigurableUiControlConstructor;
  /** Optional application data passed down to the content view.
   * @deprecated in 4.16.0. Use {@link ContentProps.content} instead.
   */
  applicationData?: any;
  /** Content to be displayed in the content view. */
  content?: React.ReactNode;
  /** Describes if the content should display the active strip.
   * If `undefined` the strip will be displayed only if this content is active and multiple contents are available.
   * Floating content controls (deprecated API) and `ContentOverlay` components are considered as content nodes.
   */
  renderActiveStrip?: boolean | ConditionalValue<boolean | undefined>;
}

/** Properties for a [[ContentGroup]]
 * @public
 */
export interface ContentGroupProps {
  /** An id for the [[ContentGroup]]. This id is used to locate a ContentGroup and it also can be used by an ContentGroupProvider to save/restore content settings */
  id: string;
  /** Content Layout Id or complete set of [[ContentLayoutProps]]  */
  layout: ContentLayoutProps;
  /** A collection of [[ContentProps]], one for each content view */
  contents: ContentProps[];
}

/** Abstract class that can be implemented and specified by frontstage to dynamically construct
 * content group just prior to activating the frontstage.
 * @public
 */
export abstract class ContentGroupProvider {
  /** Return the contentGroup based on the `Frontstage`. */
  public abstract contentGroup(frontstage: Frontstage): Promise<ContentGroup>;

  /** Allow provider to update any data stored in ContentGroupProps. Typically this may
   * be to remove applicationData entries.
   */
  public prepareToSaveProps(contentGroupProps: ContentGroupProps) {
    return contentGroupProps;
  }

  /** Allow provider to update any stored ContentGroupProps be it is to be used to create ContentGroup and layouts.
   * Typically this may be to add applicationData to content entries.
   */
  public applyUpdatesToSavedProps(contentGroupProps: ContentGroupProps) {
    return contentGroupProps;
  }

  /** Allow provider to save any content group data before the stage deactivated. */
  public async onFrontstageDeactivated() {}
}

/** Callback to process content properties during toJSON method
 * @public
 */
export type ContentCallback = (content: ContentProps) => void;

/** ContentGroup class. Content Groups define content displayed in content views that are laid out using a [[ContentLayout]].
 * @public
 */
export class ContentGroup {
  private static _sId = 0;
  public groupId: string;
  public propsId: string;
  public layout: ContentLayoutProps;
  public contentPropsList: ContentProps[];

  public get id() {
    return this.groupId;
  }

  constructor(contentGroupProps: ContentGroupProps) {
    this.layout = { ...contentGroupProps.layout };
    this.propsId = contentGroupProps.id;
    // ensure we have a unique groupId for each instance of a content group - this will be used to generate a key in the React controls
    this.groupId = `[${contentGroupProps.id}-${ContentGroup._sId++}]`;
    this.contentPropsList = contentGroupProps.contents;
  }

  /** Gets the React nodes representing the content views in this content group.
   * @deprecated in 4.16.0. Use {@link ContentGroup.contentPropsList} instead.
   */
  public getContentNodes(): React.ReactNode[] {
    const contentNodes: React.ReactNode[] = new Array<React.ReactNode>();

    this._contentSetMap.clear();

    this.contentPropsList.forEach((contentProps, index) => {
      if (contentProps.content) {
        contentNodes.push(contentProps.content);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const control = this.getContentControl(contentProps, index);
      if (!control) return;

      contentNodes.push(control.reactNode);
      this._contentSetMap.set(control.controlId, control);
    });

    return contentNodes;
  }

  /** Refreshes the React nodes representing the Content Views in this Content Group. */
  public refreshContentNodes() {
    this._contentSetMap.clear();
  }

  /** Called when Frontstage is deactivated. */
  public onFrontstageDeactivated(): void {
    this.clearContentControls();
  }

  /** Called when Frontstage is ready. */
  public onFrontstageReady(): void {}

  /** Clears the map of content controls. */
  public clearContentControls(): void {
    this._contentControls.clear();
  }

  /** Creates [[ContentGroupProps]] for JSON purposes.
   * @public
   */
  public toJSON(contentCallback?: ContentCallback): ContentGroupProps {
    const contentGroupProps: ContentGroupProps = {
      id: this.propsId,
      layout: this.layout,
      contents: this.contentPropsList,
    };

    contentGroupProps.contents.forEach((content, index) => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      if (typeof content.classId !== "string") {
        const classId = InternalConfigurableUiManager.getConstructorClassId(
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          content.classId
        );
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        if (classId !== undefined) content.classId = classId;
        else
          throw new UiError( // eslint-disable-line @typescript-eslint/no-deprecated
            UiFramework.loggerCategory("ContentGroup"),
            `toJSON: ContentControl at index ${index} is NOT registered with a string id`
          );

        if (typeof contentCallback === "function") contentCallback(content);
      }
    });

    return contentGroupProps;
  }

  /** Gets Viewports from Viewport Content Controls.
   * @internal
   */
  public getViewports(): Array<ScreenViewport | undefined> {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const contentControls = this.getContentControls();
    const viewports = new Array<ScreenViewport | undefined>();

    contentControls.forEach((control) => {
      if (control.isViewport && control.viewport) {
        viewports.push(control.viewport);
      } else {
        viewports.push(undefined);
      }
    });

    return viewports;
  }

  /* eslint-disable @typescript-eslint/no-deprecated */

  private _contentControls = new Map<string, ContentControl>();
  private _contentSetMap = new Map<string, ContentControl>();

  /** Gets a [[ContentControl]] from the Content Group based on its [[ContentProps]].
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  public getContentControl(
    contentProps: ContentProps,
    _index: number
  ): ContentControl | undefined {
    // ensure we have a unique control Id for each instance of a content control - this will be used as a key for the React control - see `ContentControl.getKeyedReactNode`
    const id = `${contentProps.id}::${this.groupId}`;
    let contentControl: ContentControl | undefined;

    if (!this._contentControls.get(contentProps.id)) {
      let usedClassId: string = "";

      if (typeof contentProps.classId === "string") {
        if (
          !this._contentControls.get(contentProps.id) &&
          UiFramework.controls.isRegistered(contentProps.classId)
        ) {
          contentControl = UiFramework.controls.create(
            contentProps.classId,
            id,
            contentProps.applicationData,
            contentProps.id
          ) as ContentControl;
          usedClassId = contentProps.classId;
        }
      } else {
        const info = new ConfigurableCreateInfo(
          contentProps.classId.name,
          id,
          contentProps.id
        );
        contentControl = new contentProps.classId(
          info,
          contentProps.applicationData
        ) as ContentControl;
        usedClassId = contentProps.classId.name;
      }

      if (contentControl) {
        if (
          contentControl.getType() !== ConfigurableUiControlType.Content &&
          contentControl.getType() !== ConfigurableUiControlType.Viewport
        ) {
          throw new UiError(
            UiFramework.loggerCategory("ContentGroup"),
            `getContentControl error: '${usedClassId}' is NOT a ContentControl or ViewportContentControl`
          );
        }
        contentControl.initialize();
        this._contentControls.set(contentProps.id, contentControl);
      }
    }

    return this._contentControls.get(contentProps.id);
  }

  /** Gets a [[ContentControl]] from the Content Group with a given ID.
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  public getContentControlById(id: string): ContentControl | undefined {
    return this._contentControls.get(id);
  }

  /** Gets the [[ContentControl]] associated with a given React node representing a Content View.
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  public getControlFromElement(
    node: React.ReactNode
  ): ContentControl | undefined {
    if (this._contentSetMap.size === 0) this.getContentNodes();

    if (node && (node as React.ReactElement<any>).key) {
      const key = (node as React.ReactElement<any>).key as string;
      // key has format `${contentProps.id}::${this.groupId}` which is stored as unique id
      const controlId = key.split("::", 1)[0];
      return this._contentSetMap.get(controlId);
    }

    return undefined;
  }

  /** Gets an array of the content controls representing the Content Views.
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  public getContentControls(): ContentControl[] {
    const contentControls: ContentControl[] = new Array<ContentControl>();

    this.contentPropsList.forEach((contentProps, index) => {
      const control = this.getContentControl(contentProps, index);
      if (!control) return;

      contentControls.push(control);
    });

    return contentControls;
  }

  /* eslint-enable @typescript-eslint/no-deprecated */
}
