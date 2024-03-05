/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./PlayButton.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { Icon } from "@itwin/core-react";
import { SvgPause, SvgPlay } from "@itwin/itwinui-icons-react";
import { UiIModelComponents } from "../UiIModelComponents";

interface PlayButtonProps extends CommonProps {
  isPlaying: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  tooltip?: string;
}

/** Play/pause button used in timeline components.
 * @internal
 */
export function PlayButton(props: PlayButtonProps) {
  const [isPlaying, setIsPlaying] = React.useState(props.isPlaying);
  let title = props.tooltip;

  if (!title)
    title = UiIModelComponents.translate(
      isPlaying ? "timeline.pause" : "timeline.play"
    );

  return (
    <button
      title={title}
      className={classnames("components-play-button", props.className)}
      onClick={() => {
        const newIsPlaying = !isPlaying;
        setIsPlaying(newIsPlaying);

        if (newIsPlaying) {
          props.onPlay?.();
        } else {
          props.onPause?.();
        }
      }}
    >
      <span className="icon" data-testid={isPlaying ? "pause" : "play"}>
        <Icon
          iconSpec={isPlaying ? <SvgPause /> : <SvgPlay />}
          data-testid={isPlaying ? "pause" : "play"}
        />
      </span>
    </button>
  );
}
