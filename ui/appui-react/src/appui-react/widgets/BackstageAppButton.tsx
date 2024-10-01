/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { ProcessDetector } from "@itwin/core-bentley";
import type { IconSpec } from "@itwin/core-react";
import { Icon, useWidgetOpacityContext } from "@itwin/core-react";
import { SvgHome } from "@itwin/itwinui-icons-react";
import { UiFramework } from "../UiFramework.js";
import { AppButton } from "../layout/widget/tools/button/App.js";
import { useTranslation } from "../hooks/useTranslation.js";

/** Properties of {@link BackstageAppButton} component.
 * @public
 */
export interface BackstageAppButtonProps {
  /** If specified overrides the default icon.
   * @deprecated in 4.16.0. Use {@link BackstageAppButtonProps.iconNode} instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  icon?: IconSpec;
  iconNode?: React.ReactNode;
  /** If specified overrides the default label. */
  label?: string;
  /** If specified overrides the default action that toggles the backstage. */
  execute?: () => void;
}

/** Component shown in the top-left corner of the content manipulation area. It is usually used to toggle the display of a backstage or navigate between frontstages.
 * @public
 */
export function BackstageAppButton({
  // eslint-disable-next-line deprecation/deprecation
  icon,
  iconNode,
  label,
  execute,
}: BackstageAppButtonProps) {
  const { translate } = useTranslation();
  label = label ?? translate("commands.openBackstage");
  const isInitialMount = React.useRef(true);
  const { onElementRef, proximityScale } = useWidgetOpacityContext();
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClick = React.useCallback(() => {
    if (execute) {
      execute();
      return;
    }

    UiFramework.backstage.toggle();
  }, [execute]);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      onElementRef(ref);
    }
  }, [onElementRef]);

  let buttonProximityScale: number | undefined;

  if (
    (UiFramework.visibility.useProximityOpacity || // eslint-disable-line deprecation/deprecation
      UiFramework.visibility.snapWidgetOpacity) &&
    !ProcessDetector.isMobileBrowser
  ) {
    buttonProximityScale = proximityScale;
  }

  // eslint-disable-next-line deprecation/deprecation
  const specIcon = icon ? <Icon iconSpec={icon} /> : undefined;
  return (
    <div ref={ref} className="uifw-app-button-small">
      <AppButton
        small={true}
        mouseProximity={buttonProximityScale}
        onClick={handleClick}
        icon={iconNode ?? specIcon ?? <SvgHome />}
        title={label}
      />
    </div>
  );
}
