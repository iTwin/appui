/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { FlatGridTestUtils } from "./flat-items/FlatGridTestUtils";
import type { MutablePropertyGridModel } from "../../../../components-react/propertygrid/internal/PropertyGridModel";
import { PropertyGridEventHandler } from "../../../../components-react/propertygrid/internal/PropertyGridEventHandler";
import type { PropertyGridModelSource } from "../../../../components-react/propertygrid/internal/PropertyGridModelSource";
import { PropertyGridModelChangeEvent } from "../../../../components-react";

describe("PropertyGridEventHandler", () => {
  describe("onExpansionToggledFactory", () => {
    it("Should return function which sets expansion to true when current expansion is false and updates model", () => {
      const modelSourceStub = {
        modifyModel: vi.fn(),
        onModelChanged: new PropertyGridModelChangeEvent(),
      } as unknown as PropertyGridModelSource;
      const modelStub = {
        getItem: vi.fn(),
      } as unknown as MutablePropertyGridModel;
      const eventHandler = new PropertyGridEventHandler(modelSourceStub);
      const mockItem = FlatGridTestUtils.createMockCategorizedStruct("Struct");
      const modifyModelSpy = vi.spyOn(modelSourceStub, "modifyModel");
      vi.spyOn(mockItem, "isExpanded", "get").mockReturnValue(false);
      const isExpandedSpy = vi.spyOn(mockItem, "isExpanded", "set");

      const getItemSpy = vi
        .spyOn(modelStub, "getItem")
        .mockReturnValue(mockItem);

      const expectedSelectionKey = "SomeSelectionKey";
      eventHandler.onExpansionToggled(expectedSelectionKey);

      const modifyModel = modifyModelSpy.mock.calls[0][0];
      modifyModel(modelStub);

      expect(getItemSpy).toHaveBeenCalledWith(expectedSelectionKey);
      expect(isExpandedSpy).toHaveBeenCalledOnce();
      expect(isExpandedSpy).toHaveBeenCalledWith(true);
    });
  });
});
