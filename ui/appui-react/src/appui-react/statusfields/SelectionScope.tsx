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
import type { CommonProps } from "@itwin/core-react";
import { Label, Select } from "@itwin/itwinui-react";
import { UiFramework } from "../UiFramework";
import { FooterIndicator } from "../layout/footer/Indicator";
import { useTranslation } from "../hooks/useTranslation";
import { useReduxFrameworkState } from "../uistate/useFrameworkState";
import type { PresentationSelectionScope } from "../redux/SessionState";

interface SelectionScopeFieldProps extends CommonProps {
  /** Describes which selection scope is active. Uses redux store as a fallback. Defaults to `""`. */
  activeScope?: string;
  /** Describes available selection scoped. Uses redux store as a fallback. Defaults to `{ id: "element", label: "Element" }`. */
  selectionScopes?: PresentationSelectionScope[];
  /** Describes available selection scoped. Uses redux store as a fallback. Defaults to `{ id: "element", label: "Element" }`. */
  onChange?: (scope: string) => void;
}

/** `SelectionScopeField` component is designed to be specified in a status bar.
 * It displays the active selection scope and the stored list of scopes from which the user can change the active selection scope.
 * @public
 */
export function SelectionScopeField(props: SelectionScopeFieldProps) {
  const { translate } = useTranslation();
  const reduxActiveSelectionScope = useReduxFrameworkState(
    // eslint-disable-next-line deprecation/deprecation
    (state) => state?.sessionState.activeSelectionScope
  );
  const reduxAvailableSelectionScopes = useReduxFrameworkState(
    // eslint-disable-next-line deprecation/deprecation
    (state) => state?.sessionState.availableSelectionScopes
  );

  const activeSelectionScope =
    props.activeScope ?? reduxActiveSelectionScope ?? "";
  const availableSelectionScopes = React.useMemo(
    () =>
      props.selectionScopes ??
      reduxAvailableSelectionScopes ?? [{ id: "element", label: "Element" }],
    [props.selectionScopes, reduxAvailableSelectionScopes]
  );

  const options = React.useMemo(
    () =>
      availableSelectionScopes.map((scope) => {
        return { value: scope.id, label: scope.label };
      }),
    [availableSelectionScopes]
  );

  const updateSelectValue = (newValue: string) => {
    if (!newValue) return;
    if (props.onChange) {
      props.onChange(newValue);
      return;
    }

    // eslint-disable-next-line deprecation/deprecation
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
