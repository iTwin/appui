/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import { connect } from "react-redux";
import { UiFramework } from "../UiFramework.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Private function that will map store's iModelConnection to the 'iModelConnection', 'iModel', and 'imodel' properties of props. This
 * is not ideal but it is a result of not having standard prop name for an iModelConnection.
 */
const iModeMapStateToProps = (mapStateToProps: any) => {
  return (state: any, ownProps: any) => {
    const frameworkState = state[UiFramework.frameworkStateKey]; // since app sets up key, don't hard-code name

    if (!frameworkState) {
      if (mapStateToProps) return mapStateToProps(state, ownProps);
      return {};
    }

    const storeProps = {
      iModelConnection: frameworkState.sessionState.iModelConnection,
      imodel: frameworkState.sessionState.iModelConnection,
      iModel: frameworkState.sessionState.iModelConnection,
    };

    if (mapStateToProps) {
      return {
        ...storeProps,
        ...mapStateToProps(state, ownProps),
      };
    }

    return storeProps;
  };
};

/** Function that will map store's iModelConnection and defaultViewState to the props 'iModelConnection', 'iModel', 'imodel',
 * and 'viewState' property of props
 */
const iModelAndViewMapStateToProps = (mapStateToProps: any) => {
  return (state: any, ownProps: any) => {
    const frameworkState = state[UiFramework.frameworkStateKey]; // since app sets up key, don't hard-code name

    if (!frameworkState) return {};

    const props = {
      ...ownProps,
      iModelConnection: frameworkState.sessionState.iModelConnection, // this prop is required by Unified Selection (TODO: standardize on use)
      iModel: frameworkState.sessionState.iModelConnection, // this prop is needed by many components
      imodel: frameworkState.sessionState.iModelConnection, // this prop is needed by ViewportProps
      viewState: frameworkState.sessionState.defaultViewState,
    };
    if (mapStateToProps) return mapStateToProps(state, props);

    return props;
  };
};

/** Function that will connect a component to the IModelConnection data in the Redux store.
 * @param mapStateToProps optional user function that, if defined, will be executed to provide additional properties from store.
 * @param mapDispatchToProps data passed to Redux connect function.
 * @public
 * @deprecated in 4.15.0. Components should take iModel connection as props.
 */
export const connectIModelConnection = (
  mapStateToProps?: any,
  mapDispatchToProps?: any
) => {
  return connect(iModeMapStateToProps(mapStateToProps), mapDispatchToProps);
};

/** Function that will connect a component to the IModelConnection data in the Redux store
 * @param mapStateToProps optional user function that, if defined, will be executed to provide additional properties from store.
 * @param mapDispatchToProps data passed to Redux connect function.
 * @beta
 *
 * @example
 *   // connect component for both getting and setting ImodelConnection data from Redux store.
 *  import { connectIModelConnection, sessionStateMapDispatchToProps, SessionStateActionsProps } from "@itwin/appui-react";
 *
 *  export interface ComponentProps extends SessionStateActionsProps {
 *    myData: string;
 *  }
 *
 *  export const ConnectControl = connectIModelConnection(null, sessionStateMapDispatchToProps)(ComponentClass);
 *
 *  //  this then allows connected control to update the store using a call like shown below.
 *  this.props.setNumItemsSelected(30);
 * @deprecated in 4.15.0. Components should take iModel connection and view state as props.
 */
export const connectIModelConnectionAndViewState = (
  mapStateToProps?: any,
  mapDispatchToProps?: any
) => {
  return connect(
    iModelAndViewMapStateToProps(mapStateToProps),
    mapDispatchToProps
  );
};
