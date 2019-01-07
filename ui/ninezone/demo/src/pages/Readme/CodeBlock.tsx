/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as HighlightJs from "highlight.js";
import * as React from "react";

export interface Props {
  language: string;
  value: string;
}

export default class CodeBlock extends React.PureComponent<Props> {
  private _code = React.createRef<HTMLElement>();

  public componentDidMount() {
    this.highlightCode();
  }

  public componentDidUpdate() {
    this.highlightCode();
  }

  public render() {
    return (
      <pre>
        <code ref={this._code} className={this.props.language}>
          {this.props.value}
        </code>
      </pre>
    );
  }

  private highlightCode() {
    if (!this._code.current)
      return;

    HighlightJs.highlightBlock(this._code.current);
  }
}
