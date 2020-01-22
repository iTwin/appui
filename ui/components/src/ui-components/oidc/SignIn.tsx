/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module OIDC
 */

import * as React from "react";
import classnames from "classnames";

import { UiComponents } from "../UiComponents";
import { CommonProps } from "@bentley/ui-core";

import "./SignIn.scss";

/************************************************************************
 * SignInDialog - OIDC sign-in dialog.
 ***********************************************************************/

/** Properties for the [[SignIn]] component
 * @public
 */
export interface SignInProps extends CommonProps {
  /** Handler for clicking the Sign-In button */
  onSignIn: () => void;
  /** Handler for clicking the Register link */
  onRegister?: () => void;
  /** Handler for clicking the Offline link */
  onOffline?: () => void;
  /** Disable the signin button after the sign-in process has started. If unspecified defaults to true.
   * @internal
   */
  disableSignInOnClick?: boolean;
  /** Show a message when signing in
   * @internal
   */
  signingInMessage?: string;
}

/** @internal */
interface SignInState {
  isSigningIn: boolean;
  prompt: string;
  signInButton: string;
  profilePrompt: string;
  registerAnchor: string;
  offlineButton: string;
}

/**
 * SignIn React presentational component
 * @public
 */
export class SignIn extends React.PureComponent<SignInProps, SignInState> {

  constructor(props: SignInProps) {
    super(props);

    this.state = {
      isSigningIn: false,
      prompt: UiComponents.translate("signIn.prompt"),
      signInButton: UiComponents.translate("signIn.signInButton"),
      profilePrompt: UiComponents.translate("signIn.profilePrompt"),
      registerAnchor: UiComponents.translate("signIn.register"),
      offlineButton: UiComponents.translate("signIn.offlineButton"),
    };
  }

  private _onSignInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({ isSigningIn: true });
    this.props.onSignIn();
  }

  public render() {
    const disableSignInOnClick = this.props.disableSignInOnClick === undefined ? true : this.props.disableSignInOnClick; // disableSignInOnClick defaults to true!
    return (
      <div className={classnames("components-signin", this.props.className)} style={this.props.style}>
        <div className="components-signin-content">
          <span className="icon icon-user" />
          <span className="components-signin-prompt">{this.state.prompt}</span>
          <button className="components-signin-button" type="button" disabled={this.state.isSigningIn && disableSignInOnClick} onClick={this._onSignInClick}>{this.state.signInButton}</button>
          {this.props.onRegister !== undefined &&
            <span className="components-signin-register">{this.state.profilePrompt}<a onClick={this.props.onRegister}>{this.state.registerAnchor}</a></span>
          }
          {this.props.onOffline !== undefined &&
            <a className="components-signin-offline" onClick={this.props.onOffline}>{this.state.offlineButton}</a>
          }
          {this.state.isSigningIn && this.props.signingInMessage !== undefined &&
            <span className="components-signingin-message">{this.props.signingInMessage}</span>
          }
        </div>
      </div>
    );
  }
}
