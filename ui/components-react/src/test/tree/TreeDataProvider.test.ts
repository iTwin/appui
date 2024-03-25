/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { PropertyRecord } from "@itwin/appui-abstract";
import { expect } from "chai";
import type {
  ITreeDataProvider,
  TreeDataProviderMethod,
  TreeDataProviderPromise,
  TreeDataProviderRaw,
} from "../../components-react/tree/TreeDataProvider";
import {
  hasChildren,
  isTreeDataProviderInterface,
  isTreeDataProviderMethod,
  isTreeDataProviderPromise,
  isTreeDataProviderRaw,
} from "../../components-react/tree/TreeDataProvider";

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
      expect(isTreeDataProviderRaw(emptyPromiseProvider)).to.be.false;
      expect(isTreeDataProviderRaw(emptyMethodProvider)).to.be.false;
      expect(isTreeDataProviderRaw(emptyInterfaceProvider)).to.be.false;
    });
  });

  describe("isTreeDataProviderPromise", () => {
    it("returns expected results", () => {
      expect(isTreeDataProviderPromise(emptyRawProvider)).to.be.false;
      expect(isTreeDataProviderPromise(emptyPromiseProvider)).toEqual(true);
      expect(isTreeDataProviderPromise(emptyMethodProvider)).to.be.false;
      expect(isTreeDataProviderPromise(emptyInterfaceProvider)).to.be.false;
    });
  });

  describe("isTreeDataProviderMethod", () => {
    it("returns expected results", () => {
      expect(isTreeDataProviderMethod(emptyRawProvider)).to.be.false;
      expect(isTreeDataProviderMethod(emptyPromiseProvider)).to.be.false;
      expect(isTreeDataProviderMethod(emptyMethodProvider)).toEqual(true);
      expect(isTreeDataProviderMethod(emptyInterfaceProvider)).to.be.false;
    });
  });

  describe("isTreeDataProviderInterface", () => {
    it("returns expected results", () => {
      expect(isTreeDataProviderInterface(emptyRawProvider)).to.be.false;
      expect(isTreeDataProviderInterface(emptyPromiseProvider)).to.be.false;
      expect(isTreeDataProviderInterface(emptyMethodProvider)).to.be.false;
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
    expect(hasChildren(noChildren)).to.be.false;
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
    expect(hasChildren(noChildren)).to.be.false;
  });
});
