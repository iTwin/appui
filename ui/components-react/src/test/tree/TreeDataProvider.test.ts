/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { PropertyRecord } from "@itwin/appui-abstract";
import type {
  ITreeDataProvider,
  TreeDataProviderMethod,
  TreeDataProviderPromise,
  TreeDataProviderRaw,
} from "../../components-react/tree/TreeDataProvider.js";
import {
  hasChildren,
  isTreeDataProviderInterface,
  isTreeDataProviderMethod,
  isTreeDataProviderPromise,
  isTreeDataProviderRaw,
} from "../../components-react/tree/TreeDataProvider.js";

describe("TreeDataProvider", () => {
  const emptyRawProvider: TreeDataProviderRaw = [];
  const emptyPromiseProvider: TreeDataProviderPromise =
    Promise.resolve(emptyRawProvider);
  const emptyMethodProvider: TreeDataProviderMethod = async () =>
    emptyPromiseProvider;
  const emptyInterfaceProvider: ITreeDataProvider = {
    getNodesCount: async () => 0,
    getNodes: emptyMethodProvider,
  };

  describe("isTreeDataProviderRaw", () => {
    it("returns expected results", () => {
      expect(isTreeDataProviderRaw(emptyRawProvider)).toEqual(true);
      expect(isTreeDataProviderRaw(emptyPromiseProvider)).toEqual(false);
      expect(isTreeDataProviderRaw(emptyMethodProvider)).toEqual(false);
      expect(isTreeDataProviderRaw(emptyInterfaceProvider)).toEqual(false);
    });
  });

  describe("isTreeDataProviderPromise", () => {
    it("returns expected results", () => {
      expect(isTreeDataProviderPromise(emptyRawProvider)).toEqual(false);
      expect(isTreeDataProviderPromise(emptyPromiseProvider)).toEqual(true);
      expect(isTreeDataProviderPromise(emptyMethodProvider)).toEqual(false);
      expect(isTreeDataProviderPromise(emptyInterfaceProvider)).toEqual(false);
    });
  });

  describe("isTreeDataProviderMethod", () => {
    it("returns expected results", () => {
      expect(isTreeDataProviderMethod(emptyRawProvider)).toEqual(false);
      expect(isTreeDataProviderMethod(emptyPromiseProvider)).toEqual(false);
      expect(isTreeDataProviderMethod(emptyMethodProvider)).toEqual(true);
      expect(isTreeDataProviderMethod(emptyInterfaceProvider)).toEqual(false);
    });
  });

  describe("isTreeDataProviderInterface", () => {
    it("returns expected results", () => {
      expect(isTreeDataProviderInterface(emptyRawProvider)).toEqual(false);
      expect(isTreeDataProviderInterface(emptyPromiseProvider)).toEqual(false);
      expect(isTreeDataProviderInterface(emptyMethodProvider)).toEqual(false);
      expect(isTreeDataProviderInterface(emptyInterfaceProvider)).toEqual(true);
    });
  });

  it("hasChildren handles ImmediatelyLoadedTreeNodeItem", () => {
    const withChildren = {
      label: PropertyRecord.fromString("Raw Node 2"),
      id: "2",
      description: "node 2 child",
      children: [
        {
          label: PropertyRecord.fromString("Raw Node 2.1"),
          id: "2.1",
          parentId: "2",
          description: "node 2.1 child",
        },
      ],
    };
    const noChildren = {
      label: PropertyRecord.fromString("Raw Node 1"),
      id: "1",
      description: "node 1 child",
    };

    expect(hasChildren(withChildren)).toEqual(true);
    expect(hasChildren(noChildren)).toEqual(false);
  });

  it("hasChildren handles DelayLoadedTreeNodeItem", () => {
    const withChildren = {
      label: PropertyRecord.fromString("Interface Node 1"),
      id: "1",
      hasChildren: true,
    };
    const noChildren = {
      label: PropertyRecord.fromString("Interface Node 2"),
      id: "2",
      hasChildren: false,
    };
    expect(hasChildren(withChildren)).toEqual(true);
    expect(hasChildren(noChildren)).toEqual(false);
  });
});
