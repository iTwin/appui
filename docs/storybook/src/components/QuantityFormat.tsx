/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { QuantityFormatSettingsPage } from "@itwin/appui-react";
import { UnitSystemKey } from "@itwin/core-quantity";

type QuantityFormatSettingsPageProps = React.ComponentProps<
  typeof QuantityFormatSettingsPage
>;
interface QuantityFormatStoryProps
  extends Omit<QuantityFormatSettingsPageProps, "availableUnitSystems"> {
  availableUnitSystems: UnitSystemKey[];
}

export function QuantityFormatStory(props: QuantityFormatStoryProps) {
  const { availableUnitSystems, ...rest } = props;

  return (
    <QuantityFormatSettingsPage
      key={rest.initialQuantityType}
      availableUnitSystems={new Set(availableUnitSystems)}
      {...rest}
    />
  );
}
