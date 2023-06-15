/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Dialog
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import type { DialogProps } from "./Dialog";
import { Dialog } from "./Dialog";

/** Properties for the [[GlobalDialog]] component
 * @public
 * @deprecated in 4.2. Props of a deprecated [GlobalDialog]($core-react) component.
 */
// eslint-disable-next-line deprecation/deprecation
export interface GlobalDialogProps extends DialogProps {
  identifier?: string;
}

/** State properties for the [[GlobalDialog]] component
 * @public
 * @deprecated in 4.2. State properties for a deprecated [GlobalDialog]($core-react) component.
 */
export interface GlobalDialogState {
  parentDocument: Document | null;
}

/** GlobalDialog React component used to display a [[Dialog]] on the top of screen
 * @public
 * @deprecated in 4.2. Use [Dialog]($itwinui-react) instead.
 */
export class GlobalDialog extends React.Component<
  GlobalDialogProps, // eslint-disable-line deprecation/deprecation
  GlobalDialogState // eslint-disable-line deprecation/deprecation
> {
  private _container?: HTMLDivElement;

  // eslint-disable-next-line deprecation/deprecation
  public override readonly state: GlobalDialogState = {
    parentDocument: null,
  };

  // eslint-disable-next-line deprecation/deprecation
  constructor(props: GlobalDialogProps) {
    super(props);
  }

  private _handleRefSet = (popupDiv: HTMLElement | null) => {
    const parentDocument = popupDiv?.ownerDocument ?? null;
    if (parentDocument) {
      this._container = parentDocument.createElement("div");
      this._container.id =
        this.props.identifier !== undefined
          ? `dialog-${this.props.identifier}`
          : "core-dialog";
      let rt = parentDocument.getElementById(
        "core-dialog-root"
      ) as HTMLDivElement;
      if (!rt) {
        rt = parentDocument.createElement("div");
        rt.id = "core-dialog-root";
        parentDocument.body.appendChild(rt);
      }
      rt.appendChild(this._container);

      // used to support component rendering in pop-out window
      this.setState({ parentDocument });
    }
  };

  public override componentWillUnmount() {
    // istanbul ignore else
    if (this._container && this._container.parentElement) {
      // cleanup
      this._container.parentElement.removeChild(this._container);
    }
  }

  public override render(): React.ReactNode {
    const { identifier, ...props } = this.props;
    return (
      <div ref={this._handleRefSet}>
        {this.state.parentDocument &&
          ReactDOM.createPortal(
            <Dialog {...props} />, // eslint-disable-line deprecation/deprecation
            this.state.parentDocument.body
          )}
      </div>
    );
  }
}
