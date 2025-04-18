/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContentView
 */

import { UiEvent } from "@itwin/appui-abstract";
import type { ContentControl } from "../content/ContentControl.js";
import type {
  ContentGroup,
  ContentGroupProps,
  ContentProps,
} from "../content/ContentGroup.js";
import type { ContentLayoutDef } from "../content/ContentLayout.js";
import { DialogChangedEvent } from "../dialog/DialogManagerBase.js";
import type { FrameworkStackedDialog } from "./FrameworkDialogs.js";
import type { UiItemsProvider } from "../ui-items-provider/UiItemsProvider.js";
import type { UiFramework } from "../UiFramework.js";
import type { ContentLayoutProps } from "../content/ContentLayoutProps.js";

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
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class MouseDownChangedEvent extends UiEvent<MouseDownChangedEventArgs> {}

/** [[ActiveContentChangedEvent]] Args interface.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ActiveContentChangedEventArgs {
  /** React node of the old content.
   * @deprecated in 4.16.0. Save activated content {@link ActiveContentChangedEventArgs.id} instead to identify previous content.
   */
  oldContent?: React.ReactNode;
  /** React node of the newly activated content.
   * @deprecated in 4.16.0. Use {@link ActiveContentChangedEventArgs.id} instead to identify the activated content.
   */
  activeContent?: React.ReactNode;
  /** Id of activated content. */
  id?: ContentProps["id"];
}

/** Active Content Changed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class ActiveContentChangedEvent extends UiEvent<ActiveContentChangedEventArgs> {}

/** Content Dialog Changed Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
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
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onMouseDownChangedEvent: MouseDownChangedEvent;

  /** Determines if the mouse is down in a content view */
  readonly isMouseDown: boolean;

  /** Sets the mouse down status for a content view */
  setMouseDown(mouseDown: boolean): void;

  /** Gets the [[ActiveContentChangedEvent]] */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onActiveContentChangedEvent: ActiveContentChangedEvent;

  /** Fires when floating contents are added or removed */

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  readonly onAvailableContentChangedEvent: UiEvent<{ contentId: string }>;

  /** Sets the active content. */
  setActiveId(contentId?: ContentProps["id"]): void;

  /** Gets the active content id. */
  getActiveId(): ContentProps["id"] | undefined;

  /** Gets the active content as a React.ReactNode.
   * @deprecated in 4.16.0. Use {@link FrameworkContent.getActiveId} instead.
   */
  getActive(): React.ReactNode | undefined;

  /** Return the active ContentControl.
   * @deprecated in 4.16.0. Use {@link FrameworkContent.getActiveId} instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  getActiveContentControl(): ContentControl | undefined;

  /** @deprecated in 4.16.0. Use {@link UiItemsProvider} to provide a floating widget. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  addFloatingContentControl(contentControl?: ContentControl): void;

  /** @deprecated in 4.16.0. Unregister {@link UiItemsProvider} to remove a floating widget. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  dropFloatingContentControl(contentControl?: ContentControl): void;

  /** Sets the active [[ContentControl]].
   * @deprecated in 4.16.0. Use {@link FrameworkContent.setActiveId} instead.
   */
  setActive(
    activeContent?: React.ReactNode,
    forceEventProcessing?: boolean
  ): void;

  /** Refreshes the active [[ContentControl]].
   * @deprecated in 4.16.0. Use {@link FrameworkContent.setActiveId} or use conditional rendering in your components.
   */
  refreshActive(activeContent: React.ReactNode): void;

  /**
   * Determines if content displays a Sheet view.
   * @param content ContentControl to check
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  isContentSheetView(content: ContentControl | undefined): boolean;

  /**
   * Determines if content displays a Drawing view.
   * @param content ContentControl to check
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  isContentDrawingView(content: ContentControl | undefined): boolean;

  /**
   * Determines if content displays a Spatial view.
   * @param content ContentControl to check
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  isContentSpatialView(content: ContentControl | undefined): boolean;

  /**
   * Determines if content displays a Orthographic view.
   * @param content ContentControl to check
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  isContentOrthographicView(content: ContentControl | undefined): boolean;

  /**
   * Determines if content displays a 3d view.
   * @param content ContentControl to check
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  isContent3dView(content: ContentControl | undefined): boolean;

  /**
   * Determines if viewport supports use of a camera.
   * @param content ContentControl to check
   * @deprecated in 4.16.0. Uses a deprecated class {@link ContentControl}.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
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
   * @deprecated in 4.15.0. Use `modeless` or `modal` properties of {@link UiFramework.dialogs} instead.
   */
  readonly dialogs: FrameworkStackedDialog<ContentDialogInfo> & {
    /** Content Dialog Changed Event */
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    readonly onContentDialogChangedEvent: ContentDialogChangedEvent;
  };
}
