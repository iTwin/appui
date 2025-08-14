/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import type { PopoutWidgetState } from "../../layout/state/WidgetState.js";
import { WidgetOutline } from "../../layout/outline/WidgetOutline.js";
import { WidgetTarget } from "../../layout/target/WidgetTarget.js";
import { WidgetContentContainer } from "../../layout/widget/ContentContainer.js";
import { WidgetTabBar } from "../../layout/widget/TabBar.js";
import { Widget, WidgetProvider } from "../../layout/widget/Widget.js";
import { NineZone } from "../../layout/base/NineZone.js";
import type { FrontstageDef } from "../../frontstage/FrontstageDef.js";
import { useLayoutStore } from "../../widget-panels/Frontstage.js";

interface PopoutWidgetProps {
  id: PopoutWidgetState["id"];
}

function PopoutWidget(props: PopoutWidgetProps) {
  const { id } = props;
  const content = React.useMemo(
    () => (
      <WidgetContentContainer>
        <WidgetTarget />
        <WidgetOutline />
      </WidgetContentContainer>
    ),
    []
  );
  return (
    <WidgetProvider id={props.id}>
      <Widget widgetId={id}>
        <WidgetTabBar />
        {content}
      </Widget>
    </WidgetProvider>
  );
}

interface ChildWindowPopoutWidgetProps extends PopoutWidgetProps {
  frontstageDef: FrontstageDef;
}

/** @internal */
export function ChildWindowPopoutWidget(props: ChildWindowPopoutWidgetProps) {
  const { frontstageDef, ...rest } = props;
  const layout = useLayoutStore(frontstageDef);
  return (
    <NineZone dispatch={frontstageDef.dispatch} layout={layout}>
      <PopoutWidget {...rest} />
    </NineZone>
  );
}
