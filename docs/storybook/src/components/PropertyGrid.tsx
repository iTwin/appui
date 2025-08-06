/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  PropertyData,
  PropertyDataChangeEvent,
  VirtualizedPropertyGridWithDataProvider,
} from "@itwin/components-react";
import { useMemo } from "react";

type VirtualizedPropertyGridWithDataProviderProps = React.ComponentProps<
  typeof VirtualizedPropertyGridWithDataProvider
>;
interface PropertyGridStoryProps
  extends Omit<VirtualizedPropertyGridWithDataProviderProps, "dataProvider"> {
  data: PropertyData;
}

export function PropertyGridStory(props: PropertyGridStoryProps) {
  const { data, ...rest } = props;

  const provider = useMemo(
    () => ({
      getData: async () => data,
      onDataChanged: new PropertyDataChangeEvent(),
    }),
    [data]
  );

  return (
    <VirtualizedPropertyGridWithDataProvider
      {...rest}
      dataProvider={provider}
    />
  );
}
