/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { SpecialKey } from "@itwin/appui-abstract";
import { ExpandableBlock, ExpandableBlockProps } from "@itwin/itwinui-react";

/** Sample component using ExpandableBlock with an expanded state  */
// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line deprecation/deprecation
export const SampleExpandableBlock: React.FC<ExpandableBlockProps> = (props: ExpandableBlockProps) => {
  const [expanded, setExpanded] = React.useState(props.isExpanded);

  const handleClick = React.useCallback((_isExpanding: boolean): void => {
    setExpanded(!expanded);

  }, [expanded, props]);

  return (
    // eslint-disable-next-line deprecation/deprecation
    <ExpandableBlock {...props} isExpanded={expanded} onToggle={handleClick} />
  );
};
