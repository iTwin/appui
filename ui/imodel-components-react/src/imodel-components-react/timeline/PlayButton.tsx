/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./PlayButton.scss";
import classnames from "classnames";
import * as React from "react";
import { CommonProps, Icon } from "@itwin/core-react";
import { SvgPause, SvgPlay } from "@itwin/itwinui-icons-react";
import { UiIModelComponents } from "../UiIModelComponents";

interface PlayButtonProps extends CommonProps {
  isPlaying: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  tooltip?: string;
}

interface PlayButtonState {
  isPlaying: boolean;
}

/** Play/Pause button used on timeline control
 * @internal
 */
export class PlayButton extends React.Component<
  PlayButtonProps,
  PlayButtonState
> {
  constructor(props: PlayButtonProps, context?: any) {
    super(props, context);

    this.state = { isPlaying: this.props.isPlaying };
  }

  /** @internal */
  public override componentDidUpdate() {
    if (this.props.isPlaying !== this.state.isPlaying) {
      this.setState((_, props) => ({ isPlaying: props.isPlaying }));
    }
  }

  private _onClick = () => {
    const _isPlaying = !this.state.isPlaying;

    this.setState({ isPlaying: _isPlaying });

    if (_isPlaying) {
      // istanbul ignore else
      if (this.props.onPlay) this.props.onPlay();
    } else {
      // istanbul ignore else
      if (this.props.onPause) this.props.onPause();
    }
  };

  public override render() {
    const { tooltip } = this.props;
    const iconSpec = this.state.isPlaying ? <SvgPause /> : <SvgPlay />;
    let title = tooltip;

    if (!title)
      title = UiIModelComponents.translate(
        this.state.isPlaying ? "timeline.pause" : "timeline.play"
      );

    return (
      <button
        data-testid={this.props.className}
        title={title}
        className={classnames("play-button", this.props.className)}
        onClick={this._onClick}
      >
        <span
          className="icon"
          data-testid={this.state.isPlaying ? "pause" : "play"}
        >
          <Icon
            iconSpec={iconSpec}
            data-testid={this.state.isPlaying ? "pause" : "play"}
          />
        </span>
      </button>
    );
  }
}
