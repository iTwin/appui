/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { QuantityFormatSettingsPageV2, QuantityFormatterSettingsOptionsV2 } from "@itwin/appui-react";

export function QuantityFormatStory(props: QuantityFormatterSettingsOptionsV2) {
  const { formatSets, ...rest } = props;

  return (
    <QuantityFormatSettingsPageV2
      formatSets={formatSets}
      {...rest}
    />
  );
}
