/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Text */

import * as React from "react";
import { TextProps } from "./TextProps";
import { StyledText } from "./StyledText";

/** Styled leading text React functional component
 * @public
 */
export const LeadingText: React.FunctionComponent<TextProps> = (props: TextProps) => {  // tslint:disable-line:variable-name
  return <StyledText {...props} mainClassName="uicore-text-leading" />;
};
