/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type { CommonProps } from "@itwin/core-react";
import { LabeledSelect } from "@itwin/itwinui-react";
import classnames from "classnames";
import * as React from "react";
import type { ConnectedComponent } from "react-redux";
import { connect } from "react-redux";
import { UiFramework } from "../UiFramework";
import type { PresentationSelectionScope } from "../redux/SessionState";
import "./SelectionScope.scss";
import { useTranslation } from "../hooks/useTranslation";

/** Defines properties supported by the SelectionScopeField Component.
 * @public
 */
interface SelectionScopeFieldProps extends CommonProps {
  activeSelectionScope: string;
  availableSelectionScopes: PresentationSelectionScope[];
}

/**
 * Status Field React component. This component is designed to be specified in a status bar definition.
 */
function SelectionScopeFieldComponent(props: SelectionScopeFieldProps) {
  const { translate } = useTranslation();

  const options = React.useMemo(
    () =>
      props.availableSelectionScopes.map((scope) => {
        return { value: scope.id, label: scope.label };
      }),
    [props.availableSelectionScopes]
  );

  const updateSelectValue = (newValue: string) => {
    if (newValue) {
      UiFramework.setActiveSelectionScope(newValue);
    }
  };

  return (
    <div
      className={classnames(
        "uifw-statusFields-selectionScope",
        props.className
      )}
      style={props.style}
    >
      <LabeledSelect
        className="uifw-statusFields-selectionScope-selector"
        label={`${translate("selectionScopeField.label")}:`}
        labelProps={{ className: "uifw-statusFields-selectionScope-label" }}
        wrapperProps={{ style: { rowGap: "0px" } }} // TODO: remove when https://github.com/iTwin/iTwinUI/issues/2051 is fixed
        displayStyle="inline"
        value={props.activeSelectionScope}
        options={options}
        onChange={updateSelectValue}
        data-testid="components-selectionScope-selector"
        title={translate("selectionScopeField.toolTip")}
        size="small"
      />
    </div>
  );
}

/** Function used by Redux to map state data in Redux store to props that are used to render this component. */
function mapStateToProps(state: any) {
  const frameworkState = state[UiFramework.frameworkStateKey]; // since app sets up key, don't hard-code name

  if (!frameworkState) return undefined;

  return {
    activeSelectionScope: frameworkState.sessionState.activeSelectionScope,
    availableSelectionScopes:
      frameworkState.sessionState.availableSelectionScopes,
  };
}

/**
 * SelectionScopeField React component. This component is designed to be specified in a status bar definition. It will
 * display the active selection scope from `UiFramework.getActiveSelectionScope()`, and display the stored list of scopes from
 * `UiFramework.getAvailableSelectionScopes()` to allow the user to change the active selection scope, using `UiFramework.setActiveSelectionScope()`.
 * This React component is Redux connected.
 * @public
 */
export const SelectionScopeField: ConnectedComponent<
  typeof SelectionScopeFieldComponent,
  CommonProps
> = connect(mapStateToProps)(SelectionScopeFieldComponent);
