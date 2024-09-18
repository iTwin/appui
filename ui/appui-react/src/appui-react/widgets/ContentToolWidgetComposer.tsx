/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import classnames from "classnames";
import * as React from "react";
import { ToolbarComposer } from "../toolbar/ToolbarComposer";
import { ToolWidgetComposer } from "./ToolWidgetComposer";
import { useUiVisibility } from "../hooks/useUiVisibility";
import { ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem";

/**
 * Props for [[ContentToolWidgetComposer]].
 * @public
 * @deprecated in 4.17.0. Use `React.ComponentProps<typeof ContentToolWidgetComposer>`
 */
export interface ContentToolWidgetComposerProps {
  /** If default backstage button is desired use <BackstageAppButton />. */
  cornerButton?: React.ReactNode;
}

/**
 * ContentToolWidgetComposer composes a Tool Widget with no tools defined by default. UiItemsProviders
 * are used to populate the toolbars. See [[StandardContentToolsProvider]].
 * @example
 * ToolWidget with no corner button
 * ```
 * <ContentToolWidgetComposer />
 * ```
 * ToolWidget with corner button
 * ```
 * const cornerButton = <BackstageAppButton icon={<SvgBentleySystems />} />;
 * <ContentToolWidgetComposer cornerButton={cornerButton} />
 * ```
 * ToolWidget with custom corner button
 * ```
 * const cornerButton = <BackstageAppButton icon={<SvgBentleySystems />}
 *   label="Toggle Backstage display",
 *   execute={() => UiFramework.backstage.getBackstageToggleCommand().execute()} />;
 * <ContentToolWidgetComposer cornerButton={cornerButton} />
 * ```
 *
 * BackstageCornerButton,
 * @public
 */
export function ContentToolWidgetComposer(
  /* eslint-disable-next-line deprecation/deprecation */
  props: ContentToolWidgetComposerProps
) {
  const { cornerButton } = props;
  const uiIsVisible = useUiVisibility();
  const className = classnames(!uiIsVisible && "nz-hidden");
  return (
    <ToolWidgetComposer
      className={className}
      cornerItem={cornerButton}
      horizontalToolbar={
        <ToolbarComposer
          items={[]}
          usage={ToolbarUsage.ContentManipulation}
          orientation={ToolbarOrientation.Horizontal}
        />
      }
      verticalToolbar={
        <ToolbarComposer
          items={[]}
          usage={ToolbarUsage.ContentManipulation}
          orientation={ToolbarOrientation.Vertical}
        />
      }
    />
  );
}
