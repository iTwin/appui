/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { MessageCenterField } from "../../../statusfields/message-center/MessageCenterField.js";
import { MessageCenterFieldSK } from "./MessageCenterFieldSk.js";
import { usePreviewFeatures } from "../../PreviewFeatures.js";

/**
 * Selects which version of the Message Center to use based on preview features.
 */
export const MessageCenterSelector = (): React.JSX.Element => {
  const { useStratakit } = usePreviewFeatures();
  return useStratakit ? <MessageCenterFieldSK /> : <MessageCenterField />;
};

export default MessageCenterSelector;
