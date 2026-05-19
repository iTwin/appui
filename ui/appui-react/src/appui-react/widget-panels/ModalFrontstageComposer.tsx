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
import { ConfigurableUiContext } from "../configurableui/ConfigurableUiContent.js";

/** @internal */
export function ModalFrontstageComposer() {
  const { renderModalFrontstage } = React.useContext(ConfigurableUiContext);
  const info = useActiveModalFrontstage();
  const handleCloseModal = React.useCallback(
    () => UiFramework.frontstages.closeModalFrontstage(),
    []
  );

  if (!info) return null;
  return (
    <>
      {renderModalFrontstage ? (
        renderModalFrontstage({ info, isOpen: true })
      ) : (
        <ModalFrontstage
          isOpen={true}
          title={info.title}
          navigateBack={handleCloseModal}
          appBarRight={info.appBarRight}
          backButton={info.backButton}
        >
          {info.content}
        </ModalFrontstage>
      )}
    </>
  );
}
