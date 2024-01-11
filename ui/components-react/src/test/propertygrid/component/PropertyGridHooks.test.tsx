/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type {
  IPropertyDataProvider,
  PropertyData,
} from "../../../components-react";
import {
  PropertyDataChangeEvent,
  usePropertyGridModelSource,
} from "../../../components-react";

import { expect } from "chai";
import { renderHook } from "@testing-library/react-hooks";

describe("PropertyGridHooks", () => {
  const dataProvider: IPropertyDataProvider = {
    onDataChanged: new PropertyDataChangeEvent(),
    getData: async (): Promise<PropertyData> => ({} as PropertyData),
  };

  it("usePropertyGridModelSource", async () => {
    const { result } = renderHook(() =>
      /* eslint-disable-next-line deprecation/deprecation*/
      usePropertyGridModelSource({
        dataProvider,
      })
    );

    expect(result.current).to.not.be.undefined;
  });
});
