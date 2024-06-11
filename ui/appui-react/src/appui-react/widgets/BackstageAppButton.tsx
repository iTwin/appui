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
import { UiFramework } from "../UiFramework";
import { AppButton } from "../layout/widget/tools/button/App";
import { useTranslation } from "../hooks/useTranslation";

/** Properties for the [[BackstageAppButton]] React component
 * @public
 */
export interface BackstageAppButtonProps {
  /** Icon specification for the App button */
  icon?: IconSpec;
  /** If specified overrides the default label shown in tooltip. */
  label?: string;
  /** If specified overrides the default action that displays the backstage. */
  execute?: () => void;
}

/** BackstageAppButton used to toggle display of Backstage and is shown in the corner of the ToolWidget.
 * @public
 */
export function BackstageAppButton({
  icon,
  label,
  execute,
}: BackstageAppButtonProps) {
  const { translate } = useTranslation();
  const backstageLabel = label ?? translate("commands.openBackstage");
  const backstageIcon = icon ?? <SvgHome />;
  const isInitialMount = React.useRef(true);
  const divClassName = "uifw-app-button-small";
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

  return (
    <div ref={ref} className={divClassName}>
      <AppButton
        small={true}
        mouseProximity={buttonProximityScale}
        onClick={handleClick}
        icon={<Icon iconSpec={backstageIcon} />}
        title={backstageLabel}
      />
    </div>
  );
}
