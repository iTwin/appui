/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./SelectionScope.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import type { CommonProps } from "@itwin/core-react";
import { Label, Select } from "@itwin/itwinui-react";
import { UiFramework } from "../UiFramework";
import { FooterIndicator } from "../layout/footer/Indicator";
import { useTranslation } from "../hooks/useTranslation";
import { useFrameworkState } from "../redux/useFrameworkState";

/** `SelectionScopeField` component is designed to be specified in a status bar.
 * It displays the active selection scope and the stored list of scopes from which the user can change the active selection scope.
 * @public
 */
export function SelectionScopeField(props: CommonProps) {
  const { translate } = useTranslation();
  const frameworkState = useFrameworkState();
  assert(!!frameworkState);
  const { activeSelectionScope, availableSelectionScopes } =
    frameworkState.sessionState;

  const options = React.useMemo(
    () =>
      availableSelectionScopes.map((scope) => {
        return { value: scope.id, label: scope.label };
      }),
    [availableSelectionScopes]
  );

  const updateSelectValue = (newValue: string) => {
    if (!newValue) return;
    UiFramework.setActiveSelectionScope(newValue);
  };

  return (
    <FooterIndicator
      className={classnames(
        "uifw-statusFields-selectionScope",
        props.className
      )}
      style={props.style}
    >
      <Label className="uifw-statusFields-selectionScope-label">
        {translate("selectionScopeField.label")}:
      </Label>
      <Select
        className="uifw-statusFields-selectionScope-selector"
        value={activeSelectionScope}
        options={options}
        onChange={updateSelectValue}
        data-testid="components-selectionScope-selector"
        title={translate("selectionScopeField.toolTip")}
        size="small"
      />
    </FooterIndicator>
  );
}
