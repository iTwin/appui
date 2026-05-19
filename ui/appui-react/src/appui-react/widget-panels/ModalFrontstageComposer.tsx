/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */
import * as React from "react";
import { ModalFrontstage } from "../frontstage/ModalFrontstage.js";
import { UiFramework } from "../UiFramework.js";
import { useActiveModalFrontstage } from "../hooks/useActiveModalFrontstage.js";

/** @internal */
export function ModalFrontstageComposer() {
  const stageInfo = useActiveModalFrontstage();
  const handleCloseModal = React.useCallback(
    () => UiFramework.frontstages.closeModalFrontstage(),
    []
  );

  if (!stageInfo) return null;

  const { title, content, appBarRight, backButton } = stageInfo;

  if (stageInfo.layout) {
    return <>{stageInfo.layout}</>;
  }

  return (
    <ModalFrontstage
      isOpen={true}
      title={title}
      navigateBack={handleCloseModal}
      appBarRight={appBarRight}
      backButton={backButton}
    >
      {content}
    </ModalFrontstage>
  );
}
