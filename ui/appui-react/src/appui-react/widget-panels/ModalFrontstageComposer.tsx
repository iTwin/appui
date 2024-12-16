/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */
import * as React from "react";
import type { ModalFrontstageInfo } from "../framework/FrameworkFrontstages.js";
import { ModalFrontstage } from "../frontstage/ModalFrontstage.js";
import { UiFramework } from "../UiFramework.js";

/** @internal */
export function useActiveModalFrontstageInfo() {
  const [activeModalFrontstageInfo, setActiveModalFrontstageInfo] =
    React.useState(UiFramework.frontstages.activeModalFrontstage);
  React.useEffect(() => {
    return UiFramework.frontstages.onModalFrontstageChangedEvent.addListener(
      (args) => {
        setActiveModalFrontstageInfo(
          args.modalFrontstageCount === 0
            ? undefined
            : UiFramework.frontstages.activeModalFrontstage
        );
      }
    );
  }, [setActiveModalFrontstageInfo]);
  return activeModalFrontstageInfo;
}

/** @internal */
export function ModalFrontstageComposer({
  stageInfo,
}: {
  stageInfo: ModalFrontstageInfo | undefined;
}) {
  const handleCloseModal = React.useCallback(
    () => UiFramework.frontstages.closeModalFrontstage(),
    []
  );
  if (!stageInfo) return null;

  const { title, content, appBarRight, backButton } = stageInfo;

  return (
    <ModalFrontstage
      isOpen={true}
      title={title}
      closeModal={handleCloseModal}
      appBarRight={appBarRight}
      backButton={backButton}
    >
      {content}
    </ModalFrontstage>
  );
}
