/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContentView
 */

import type { ContentLayoutProps } from "@itwin/appui-abstract";
import { UiEvent } from "@itwin/appui-abstract";
import type { ContentControl } from "../content/ContentControl";
import type {
  ContentGroup,
  ContentGroupProps,
  ContentProps,
} from "../content/ContentGroup";
import type { ContentLayoutDef } from "../content/ContentLayout";
import { DialogChangedEvent } from "../dialog/DialogManagerBase";
import type { FrameworkStackedDialog } from "./FrameworkDialogs";
import { UiItemsProvider } from "../ui-items-provider/UiItemsProvider";

/** [[MouseDownChangedEvent]] Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface MouseDownChangedEventArgs {
  /** Indicates whether the mouse is down */
  mouseDown: boolean;
}

/** Mouse Down Changed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class MouseDownChangedEvent extends UiEvent<MouseDownChangedEventArgs> {}

/** [[ActiveContentChangedEvent]] Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ActiveContentChangedEventArgs {
  /** React node of the old content.
   * @deprecated in 4.15.0. Save activated content {@link id} instead to identify previous content.
   */
  oldContent?: React.ReactNode;
  /** React node of the newly active content. */
  activeContent?: React.ReactNode;
  /** Id of activated content. */
  id?: ContentProps["id"];
}

/** Active Content Changed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class ActiveContentChangedEvent extends UiEvent<ActiveContentChangedEventArgs> {}

/** Content Dialog Changed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class ContentDialogChangedEvent extends DialogChangedEvent {}

/** @public */
export interface ContentDialogInfo {
  reactNode: React.ReactNode;
  zIndex: number;
  parentDocument: Document;
}

/**
 * [[UiFramework.content]] interface
 * @public
 */
export interface FrameworkContent {
  /** Gets the [[MouseDownChangedEvent]] */
  // eslint-disable-next-line deprecation/deprecation
  readonly onMouseDownChangedEvent: MouseDownChangedEvent;

  /** Determines if the mouse is down in a content view */
  readonly isMouseDown: boolean;

  /** Sets the mouse down status for a content view */
  setMouseDown(mouseDown: boolean): void;

  /** Gets the [[ActiveContentChangedEvent]] */
  // eslint-disable-next-line deprecation/deprecation
  readonly onActiveContentChangedEvent: ActiveContentChangedEvent;

  /** Fires when floating contents are added or removed */

  // eslint-disable-next-line deprecation/deprecation
  readonly onAvailableContentChangedEvent: UiEvent<{ contentId: string }>;

  /** Sets the active content. */
  setActiveId(contentId?: ContentProps["id"]): void;

  /** Gets the active content id. */
  getActiveId(): ContentProps["id"] | undefined;

  /** Gets the active content as a React.ReactNode.
   * @deprecated in 4.15.0. Use {@link getActiveId} instead.
   */
  getActive(): React.ReactNode | undefined;

  /** Return the active ContentControl.
   * @deprecated in 4.15.0. Use {@link getActiveId} instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  getActiveContentControl(): ContentControl | undefined;

  /** @deprecated in 4.15.0. Use {@link UiItemsProvider} to provide a floating widget. */
  // eslint-disable-next-line deprecation/deprecation
  addFloatingContentControl(contentControl?: ContentControl): void;

  /** @deprecated in 4.15.0. Unregister {@link UiItemsProvider} to remove a floating widget. */
  // eslint-disable-next-line deprecation/deprecation
  dropFloatingContentControl(contentControl?: ContentControl): void;

  /** Sets the active [[ContentControl]].
   * @deprecated in 4.15.0. Use {@link setActiveId} instead.
   */
  setActive(
    activeContent?: React.ReactNode,
    forceEventProcessing?: boolean
  ): void;

  /** Refreshes the active [[ContentControl]].
   * @deprecated in 4.15.0. Use {@link setActiveId} or use conditional rendering in your components.
   */
  refreshActive(activeContent: React.ReactNode): void;

  /**
   * Determines if content displays a Sheet view.
   * @param content ContentControl to check
   * @deprecated in 4.15.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line deprecation/deprecation
  isContentSheetView(content: ContentControl | undefined): boolean;

  /**
   * Determines if content displays a Drawing view.
   * @param content ContentControl to check
   * @deprecated in 4.15.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line deprecation/deprecation
  isContentDrawingView(content: ContentControl | undefined): boolean;

  /**
   * Determines if content displays a Spatial view.
   * @param content ContentControl to check
   * @deprecated in 4.15.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line deprecation/deprecation
  isContentSpatialView(content: ContentControl | undefined): boolean;

  /**
   * Determines if content displays a Orthographic view.
   * @param content ContentControl to check
   * @deprecated in 4.15.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line deprecation/deprecation
  isContentOrthographicView(content: ContentControl | undefined): boolean;

  /**
   * Determines if content displays a 3d view.
   * @param content ContentControl to check
   * @deprecated in 4.15.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line deprecation/deprecation
  isContent3dView(content: ContentControl | undefined): boolean;

  /**
   * Determines if viewport supports use of a camera.
   * @param content ContentControl to check
   * @deprecated in 4.15.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line deprecation/deprecation
  contentSupportsCamera(content: ContentControl | undefined): boolean;

  /** Manage content layouts.
   * @public
   */
  readonly layouts: {
    /** build a layout key that is unique for group layout combination */
    getKey(props: { contentGroupId: string; layoutId: string }): string;

    /** Return a LayoutDef that is specific to a content group.
     * @returns the [[ContentLayoutDef]] if found, or undefined otherwise
     */
    getForGroup(
      contentGroupProps: ContentGroupProps | ContentGroup,
      overrideContentLayout?: ContentLayoutProps
    ): ContentLayoutDef;

    /** Finds a Content Layout with a given id.
     * @param layoutKey  group specific layout id, see `getLayoutKey`
     * @returns the [[ContentLayoutDef]] if found, or undefined otherwise
     */
    find(layoutKey: string): ContentLayoutDef | undefined;

    /** Adds a Content Layout.
     * @param layoutId  the id of the Content Layout to add
     * @param layoutDef  the Content Layout definition to add
     */
    add(layoutId: string, layoutDef: ContentLayoutDef): void;

    /** Gets the active Content Layout */
    readonly activeLayout: ContentLayoutDef | undefined;

    /** Gets the active Content Group */
    readonly activeContentGroup: ContentGroup | undefined;

    /** Sets the active Content Layout, Content Group and Content Control.
     * @param contentLayoutDef  Content layout to make active
     * @param contentGroup  Content Group to make active
     */
    setActive(
      contentLayoutDef: ContentLayoutDef,
      contentGroup: ContentGroup
    ): Promise<void>;

    /** Sets the active Content Group.
     * @param contentGroup  Content Group to make active
     */
    setActiveContentGroup(contentGroup: ContentGroup): Promise<void>;

    /** Refreshes the active layout and content group.
     */
    refreshActive(): void;
  };
  /**
   * Manage dialogs displaying managed content.
   * @beta
   */
  readonly dialogs: FrameworkStackedDialog<ContentDialogInfo> & {
    /** Content Dialog Changed Event */
    // eslint-disable-next-line deprecation/deprecation
    readonly onContentDialogChangedEvent: ContentDialogChangedEvent;
  };
}
