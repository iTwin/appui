import * as React from "react";
import { usePreviewFeatures } from "../../preview/PreviewFeatures.js";
import { MessageCenterField } from "./MessageCenterField.js";
import { MessageCenterFieldSK } from "./MessageCenterFieldSk.js";

/**
 * Selects which version of the Message Center to use based on preview features.
 */
export default function MessageCenterSelector() {
  const preview = usePreviewFeatures();

  return preview.useStratakit ? (
    <MessageCenterFieldSK />
  ) : (
    <MessageCenterField />
  );
}
