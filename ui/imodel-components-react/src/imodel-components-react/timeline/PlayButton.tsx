/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { SvgPause, SvgPlay } from "@itwin/itwinui-icons-react";
import { UiIModelComponents } from "../UiIModelComponents";
import { IconButton } from "@itwin/itwinui-react";

interface PlayButtonProps {
  isPlaying: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

/** Play/pause button used in timeline components.
 * @internal
 */
export function PlayButton({ isPlaying, onPlay, onPause }: PlayButtonProps) {
  const label = React.useMemo(() => {
    return UiIModelComponents.translate(
      isPlaying ? "timeline.pause" : "timeline.play"
    );
  }, [isPlaying]);

  return (
    <IconButton
      styleType="borderless"
      label={label}
      onClick={() => {
        if (isPlaying) {
          onPause?.();
          return;
        }

        onPlay?.();
      }}
    >
      {isPlaying ? <SvgPause /> : <SvgPlay />}
    </IconButton>
  );
}
