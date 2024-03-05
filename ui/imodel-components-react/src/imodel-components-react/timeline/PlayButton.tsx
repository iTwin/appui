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
export function PlayButton({
  className,
  isPlaying,
  tooltip,
  onPlay,
  onPause,
}: PlayButtonProps) {
  const title = React.useMemo(() => {
    if (tooltip) return tooltip;
    return UiIModelComponents.translate(
      isPlaying ? "timeline.pause" : "timeline.play"
    );
  }, [isPlaying, tooltip]);

  return (
    <button
      title={title}
      className={classnames("components-play-button", className)}
      onClick={() => {
        if (isPlaying) {
          onPause?.();
          return;
        }

        onPlay?.();
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
