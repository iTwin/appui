/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { renderHook } from "@testing-library/react";
import TestUtils from "./TestUtils.js";
import { useTranslation } from "../components-react/l10n/useTranslation.js";

describe("useTranslation", () => {
  it("should fallback to default value", () => {
    TestUtils.terminateUiComponents();
    const { result } = renderHook(() => useTranslation());
    expect(result.current.translate("general.search")).to.eq("Search");
  });
});
