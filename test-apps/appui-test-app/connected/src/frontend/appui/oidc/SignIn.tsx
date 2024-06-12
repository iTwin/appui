/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module OIDC
 */

import "./SignIn.scss";
import classnames from "classnames";
import * as React from "react";
import { CommonProps } from "@itwin/core-react";
import { Button } from "@itwin/itwinui-react";
import { ProcessDetector } from "@itwin/core-bentley";
import { Key } from "ts-key-enum";
import { TestAppLocalization } from "../../useTranslation";

// cspell:ignore signingin

/** Properties for the [[SignIn]] component
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface SignInProps extends CommonProps {
  /** Handler for clicking the Sign-In button */
  onSignIn: () => void;
  /** Handler for clicking the Register link */
  onRegister?: () => void;
}

/** @internal */
interface SignInState {
  isSigningIn: boolean;
  prompt: string;
  signInButton: string;
  profilePrompt: string;
  registerAnchor: string;
  signingInMessage: string;
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
      prompt: TestAppLocalization.translate("signIn.prompt"),
      signInButton: TestAppLocalization.translate("signIn.signInButton"),
      profilePrompt: TestAppLocalization.translate("signIn.profilePrompt"),
      registerAnchor: TestAppLocalization.translate("signIn.register"),
      signingInMessage: ProcessDetector.isElectronAppFrontend
        ? TestAppLocalization.translate("signIn.signingInMessage")
        : "",
    };
  }

  private _onSignInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this._onSigningIn();
  };

  private _onSigningIn = () => {
    this.setState({ isSigningIn: true });
    this.props.onSignIn();
  };

  private _handleKeyUp = (
    event: React.KeyboardEvent,
    onActivate?: () => void
  ) => {
    const key = event.key;

    switch (key) {
      case Key.Enter.valueOf():
      case " ":
        onActivate && onActivate();
        break;
    }
  };

  public override render() {
    /**
     * Note: In the case of electron, the signin happens in a disconnected web browser. We therefore show
     * a message to direc the user to the browser. Also, since we cannot capture the errors in the browser,
     * to clear the state of the signin UI, we instead allow signin button to be clicked multiple times.
     * See https://authguidance.com/2018/01/11/desktop-apps-overview/ for the pattern
     */
    let disableSignInOnClick = true;
    if (ProcessDetector.isElectronAppFrontend) {
      disableSignInOnClick = false;
    }

    return (
      <div
        className={classnames("components-signin", this.props.className)}
        style={this.props.style}
      >
        <div className="components-signin-content">
          <span className="icon icon-user" />
          {this.state.isSigningIn ? (
            <span className="components-signin-prompt">
              {this.state.signingInMessage}
            </span>
          ) : (
            <span className="components-signin-prompt">
              {this.state.prompt}
            </span>
          )}
          <Button
            className="components-signin-button"
            styleType="cta"
            disabled={this.state.isSigningIn && disableSignInOnClick}
            onClick={this._onSignInClick}
            onKeyUp={(e: React.KeyboardEvent<HTMLButtonElement>) =>
              this._handleKeyUp(e, this._onSigningIn)
            }
          >
            {this.state.signInButton}
          </Button>
          {this.props.onRegister !== undefined && (
            <span className="components-signin-register">
              {this.state.profilePrompt}
              <button
                onClick={this.props.onRegister}
                onKeyUp={(e) => this._handleKeyUp(e, this.props.onRegister)}
                role="link"
                tabIndex={0}
              >
                {this.state.registerAnchor}
              </button>
            </span>
          )}
        </div>
      </div>
    );
  }
}
