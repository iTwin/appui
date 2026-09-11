/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { StrataKitIcon } from "@itwin/core-react/internal";
import { SvgPause, SvgPlay } from "@itwin/itwinui-icons-react";
import { IconButton } from "@itwin/itwinui-react";
import { useTranslation } from "../useTranslation.js";

interface PlayButtonProps {
  isPlaying: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

/** Play/pause button used in timeline components.
 * @internal
 */
export function PlayButton({ isPlaying, onPlay, onPause }: PlayButtonProps) {
  const { translate } = useTranslation();
  const label = translate(isPlaying ? "timeline.pause" : "timeline.play");

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
      {isPlaying ? (
        <StrataKitIcon
          module="@stratakit/icons/pause.svg"
          iconNode={<SvgPause />}
        />
      ) : (
        <StrataKitIcon
          module="@stratakit/icons/play.svg"
          iconNode={<SvgPlay />}
        />
      )}
    </IconButton>
  );
}
