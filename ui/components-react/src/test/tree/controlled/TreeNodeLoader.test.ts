/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as faker from "faker";
import { defer, from as rxjsFrom } from "rxjs";
import sinon from "sinon";
import { PropertyRecord } from "@itwin/appui-abstract";
import { EmptyLocalization } from "@itwin/core-common";
import { toRxjsObservable } from "../../../components-react/tree/controlled/Observable";
import { MutableTreeModel } from "../../../components-react/tree/controlled/TreeModel";
import { TreeModelSource } from "../../../components-react/tree/controlled/TreeModelSource";
import {
  AbstractTreeNodeLoader,
  handleLoadedNodeHierarchy,
  PagedTreeNodeLoader,
  TreeDataSource,
  TreeNodeLoader,
} from "../../../components-react/tree/controlled/TreeNodeLoader";
import { UiComponents } from "../../../components-react/UiComponents";
import { extractSequence } from "../../common/ObservableTestHelpers";
import { ResolvablePromise } from "../../test-helpers/misc";
import {
  createRandomTreeNodeItem,
  createRandomTreeNodeItems,
  createTreeNodeInput,
} from "./TreeHelpers";

import type { Observable as RxjsObservable } from "rxjs";
import type {
  LoadedNodeHierarchy,
  TreeNodeLoadResult,
} from "../../../components-react/tree/controlled/TreeNodeLoader";
import type {
  Observable,
  Observer,
} from "../../../components-react/tree/controlled/Observable";
import type {
  TreeModelNode,
  TreeModelNodeInput,
  TreeModelRootNode,
  TreeNodeItemData,
} from "../../../components-react/tree/controlled/TreeModel";
import type {
  DelayLoadedTreeNodeItem,
  ImmediatelyLoadedTreeNodeItem,
  ITreeDataProvider,
  TreeDataProviderRaw,
} from "../../../components-react/tree/TreeDataProvider";

const extractLoadedNodeIds = async (obs: Observable<TreeNodeLoadResult>) => {
  const loadResult = await extractSequence(toRxjsObservable(obs));
  if (loadResult.length === 0) return [];
  return loadResult[0].loadedNodes.map((item) => item.id);
};

function createTestTreeNodeItem(
  item: Partial<DelayLoadedTreeNodeItem> & { id: string }
): DelayLoadedTreeNodeItem {
  return {
    label: PropertyRecord.fromString(item.id),
    ...item,
  };
}

describe("TreeNodeLoader", () => {
  const dataProviderStub = {
    getNodes: sinon.stub<
      Parameters<ITreeDataProvider["getNodes"]>,
      ReturnType<ITreeDataProvider["getNodes"]>
    >(),
    getNodesCount: sinon.stub<
      Parameters<ITreeDataProvider["getNodesCount"]>,
      ReturnType<ITreeDataProvider["getNodesCount"]>
    >(),
  };

  function setupTreeNodeLoader(setupModel: (model: MutableTreeModel) => void) {
    const model = new MutableTreeModel();
    setupModel(model);
    return new TreeNodeLoader(dataProviderStub, new TreeModelSource(model));
  }

  before(async () => {
    // needed to enable `immer` patches
    await UiComponents.initialize(new EmptyLocalization());
  });

  after(() => {
    UiComponents.terminate();
  });

  beforeEach(() => {
    dataProviderStub.getNodes.reset();
    dataProviderStub.getNodesCount.reset();
  });

  describe("loadNode", () => {
    it("loads all root nodes", async () => {
      dataProviderStub.getNodes.resolves([
        createTestTreeNodeItem({ id: "A" }),
        createTestTreeNodeItem({ id: "B" }),
      ]);
      dataProviderStub.getNodesCount.resolves(2);

      const nodeLoader = setupTreeNodeLoader(() => {});

      const loadResultObs = nodeLoader.loadNode(
        nodeLoader.modelSource.getModel().getRootNode()
      );
      const loadedIds = await extractLoadedNodeIds(loadResultObs);
      expect(loadedIds).to.be.deep.eq(["A", "B"]);
    });

    it("loads all children for node", async () => {
      dataProviderStub.getNodes.callsFake(async (parent) => {
        return parent?.id === "A"
          ? [
              createTestTreeNodeItem({ id: "A-1" }),
              createTestTreeNodeItem({ id: "A-2" }),
            ]
          : [];
      });
      dataProviderStub.getNodesCount.callsFake(async (parent) =>
        parent?.id === "A" ? 2 : 0
      );
      const nodeLoader = setupTreeNodeLoader((model) => {
        model.setChildren(undefined, [createTreeNodeInput("A")], 0);
      });

      const loadResultObs = nodeLoader.loadNode(
        nodeLoader.modelSource.getModel().getNode("A")!
      );
      const loadedIds = await extractLoadedNodeIds(loadResultObs);
      expect(loadedIds).to.be.deep.eq(["A-1", "A-2"]);
    });

    it("reuses existing request from data provider", async () => {
      const dataProvider = sinon.fake(
        () => new ResolvablePromise<ImmediatelyLoadedTreeNodeItem[]>()
      );
      const modelSource = new TreeModelSource();
      const nodeLoader = new TreeNodeLoader(dataProvider, modelSource);
      nodeLoader.loadNode(modelSource.getModel().getRootNode()).subscribe();
      nodeLoader.loadNode(modelSource.getModel().getRootNode()).subscribe();
      // Node loader will invoke dataProvider in another microtask
      await Promise.resolve();
      await dataProvider.firstCall.returnValue.resolve([]);
      expect(dataProvider).to.have.been.calledOnce;
    });

    it("unschedules node load after cancellation", async () => {
      const dataProvider = sinon.fake(
        () => new ResolvablePromise<ImmediatelyLoadedTreeNodeItem[]>()
      );
      const modelSource = new TreeModelSource();
      const nodeLoader = new TreeNodeLoader(dataProvider, modelSource);
      const subscription = nodeLoader
        .loadNode(modelSource.getModel().getRootNode())
        .subscribe();
      await Promise.resolve();
      expect(dataProvider).to.have.been.calledOnce;
      subscription.unsubscribe();
      // The first subscription no longer has any subscribers, so the initial load operation has been cancelled

      nodeLoader.loadNode(modelSource.getModel().getRootNode()).subscribe();
      // Finalise the first node load to allow SubscriptionScheduler to move onto next observable. As a bonus, after the
      // await, the second subscription will have already propagated to the node loader.
      await dataProvider.firstCall.returnValue.resolve([]);
      expect(dataProvider).to.have.been.calledTwice;
    });

    it("does not put stale nodes into model after cancellation", async () => {
      const nodesPromise = new ResolvablePromise<
        ImmediatelyLoadedTreeNodeItem[]
      >();
      const dataProvider = sinon.fake(() => nodesPromise);
      const modelSource = new TreeModelSource();
      const nodeLoader = new TreeNodeLoader(dataProvider, modelSource);

      const subscription = nodeLoader
        .loadNode(modelSource.getModel().getRootNode())
        .subscribe();
      await Promise.resolve();
      expect(dataProvider).to.have.been.calledOnce;
      subscription.unsubscribe();

      // resolve nodes promise
      await nodesPromise.resolve([
        createTestTreeNodeItem({ id: "A" }),
        createTestTreeNodeItem({ id: "B" }),
      ]);

      expect(modelSource.getModel().getNode("A")).to.be.undefined;
      expect(modelSource.getModel().getNode("B")).to.be.undefined;
    });

    describe("using raw data provider", () => {
      const nodesProvider: ImmediatelyLoadedTreeNodeItem[] = [
        {
          id: "1",
          label: PropertyRecord.fromString("1"),
          children: [
            { id: "1-1", label: PropertyRecord.fromString("1-1") },
            { id: "1-2", label: PropertyRecord.fromString("1-2") },
          ],
        },
        { id: "2", label: PropertyRecord.fromString("2"), children: [] },
      ];

      it("loads all immediately loaded nodes", async () => {
        const nodeLaoder = new TreeNodeLoader(
          nodesProvider,
          new TreeModelSource()
        );
        const loadObs = nodeLaoder.loadNode(
          nodeLaoder.modelSource.getModel().getRootNode()
        );
        const loadedIds = await extractLoadedNodeIds(loadObs);
        expect(loadedIds).to.be.deep.eq(["1", "1-1", "1-2", "2"]);
      });
    });
  });
});

describe("PagedTreeNodeLoader", () => {
  const dataProviderStub = {
    getNodes: sinon.stub<
      Parameters<ITreeDataProvider["getNodes"]>,
      ReturnType<ITreeDataProvider["getNodes"]>
    >(),
    getNodesCount: sinon.stub<
      Parameters<ITreeDataProvider["getNodesCount"]>,
      ReturnType<ITreeDataProvider["getNodesCount"]>
    >(),
  };

  function setupTreeNodeLoader(
    setupModel: (model: MutableTreeModel) => void,
    pageSize: number
  ) {
    const model = new MutableTreeModel();
    setupModel(model);
    return new PagedTreeNodeLoader(
      dataProviderStub,
      new TreeModelSource(model),
      pageSize
    );
  }

  before(async () => {
    // needed to enable `immer` patches
    await UiComponents.initialize(new EmptyLocalization());
  });

  after(() => {
    UiComponents.terminate();
  });

  beforeEach(() => {
    dataProviderStub.getNodes.reset();
    dataProviderStub.getNodesCount.reset();
  });

  describe("[get] pageSize", () => {
    it("returns page size", () => {
      const nodeLoader = setupTreeNodeLoader(() => {}, 2);
      expect(nodeLoader.pageSize).to.be.eq(2);
    });
  });

  describe("[get] dataProvider", () => {
    it("return data provider", () => {
      const nodeLoader = setupTreeNodeLoader(() => {}, 2);
      expect(nodeLoader.dataProvider).to.be.eq(dataProviderStub);
    });
  });

  describe("loadNode", () => {
    it("loads root nodes page when asking for first node", async () => {
      const rootNodes = [
        createTestTreeNodeItem({ id: "A" }),
        createTestTreeNodeItem({ id: "B" }),
        createTestTreeNodeItem({ id: "C" }),
        createTestTreeNodeItem({ id: "D" }),
      ];
      dataProviderStub.getNodesCount.resolves(4);
      dataProviderStub.getNodes.callsFake(async (_parent, pageOptions) =>
        pageOptions?.start === 0 ? rootNodes.slice(0, 2) : rootNodes.slice(2)
      );

      const nodeLoader = setupTreeNodeLoader(() => {}, 2);

      const loadResultObs = nodeLoader.loadNode(
        nodeLoader.modelSource.getModel().getRootNode(),
        0
      );
      const loadedIds = await extractLoadedNodeIds(loadResultObs);
      expect(loadedIds).to.be.deep.eq(["A", "B"]);
    });

    it("loads child nodes page when asking for first child", async () => {
      const childNodes = [
        createTestTreeNodeItem({ id: "A-1" }),
        createTestTreeNodeItem({ id: "A-2" }),
        createTestTreeNodeItem({ id: "A-3" }),
        createTestTreeNodeItem({ id: "A-4" }),
      ];
      dataProviderStub.getNodesCount.callsFake(async () => 4);
      dataProviderStub.getNodes.callsFake(async (_parent, pageOptions) =>
        pageOptions?.start === 0 ? childNodes.slice(0, 2) : childNodes.slice(2)
      );

      const nodeLoader = setupTreeNodeLoader((model) => {
        model.setChildren(undefined, [createTreeNodeInput("A")], 0);
      }, 2);

      const loadResultObs = nodeLoader.loadNode(
        nodeLoader.modelSource.getModel().getNode("A")!,
        0
      );

      const loadedIds = await extractLoadedNodeIds(loadResultObs);
      expect(loadedIds).to.be.deep.eq(["A-1", "A-2"]);
    });

    it("loads children of auto expanded node", async () => {
      const rootNodes = [
        createTestTreeNodeItem({ id: "A", autoExpand: true }),
        createTestTreeNodeItem({ id: "B" }),
      ];
      const childNodes = [
        createTestTreeNodeItem({ id: "A-1" }),
        createTestTreeNodeItem({ id: "A-2" }),
        createTestTreeNodeItem({ id: "A-3" }),
        createTestTreeNodeItem({ id: "A-4" }),
      ];
      dataProviderStub.getNodesCount.callsFake(async (parent) =>
        parent?.id === "A" ? 4 : 2
      );
      dataProviderStub.getNodes.callsFake(async (parent, pageOptions) => {
        if (parent?.id !== "A") {
          return rootNodes;
        }
        return pageOptions?.start === 0
          ? childNodes.slice(0, 2)
          : childNodes.slice(2);
      });

      const nodeLoader = setupTreeNodeLoader(() => {}, 2);

      const loadResultObs = nodeLoader.loadNode(
        nodeLoader.modelSource.getModel().getRootNode(),
        0
      );
      const loadedIds = await extractLoadedNodeIds(loadResultObs);
      expect(loadedIds).to.be.deep.eq(["A", "A-1", "A-2", "B"]);
    });

    it("loads two pages of root nodes", async () => {
      const rootNodes = [
        createTestTreeNodeItem({ id: "A" }),
        createTestTreeNodeItem({ id: "B" }),
        createTestTreeNodeItem({ id: "C" }),
        createTestTreeNodeItem({ id: "D" }),
      ];
      dataProviderStub.getNodesCount.resolves(4);
      dataProviderStub.getNodes.callsFake(async (_parent, pageOptions) =>
        pageOptions?.start === 0 ? rootNodes.slice(0, 2) : rootNodes.slice(2)
      );

      const nodeLoader = setupTreeNodeLoader(() => {}, 2);

      const pageOne = nodeLoader.loadNode(
        nodeLoader.modelSource.getModel().getRootNode(),
        0
      );
      const pageOneLoadedIds = await extractLoadedNodeIds(pageOne);
      expect(pageOneLoadedIds).to.be.deep.eq(["A", "B"]);

      const pageTwo = nodeLoader.loadNode(
        nodeLoader.modelSource.getModel().getRootNode(),
        2
      );
      const pageTwoLoadedIds = await extractLoadedNodeIds(pageTwo);
      expect(pageTwoLoadedIds).to.be.deep.eq(["C", "D"]);
    });

    it("reuses existing page request from data provider", async () => {
      const dataProvider = sinon.fake(
        () => new ResolvablePromise<ImmediatelyLoadedTreeNodeItem[]>()
      );
      const modelSource = new TreeModelSource();
      const nodeLoader = new PagedTreeNodeLoader(dataProvider, modelSource, 5);
      nodeLoader.loadNode(modelSource.getModel().getRootNode(), 0).subscribe();
      nodeLoader.loadNode(modelSource.getModel().getRootNode(), 1).subscribe();
      // Node loader will invoke dataProvider in another microtask
      await Promise.resolve();
      await dataProvider.firstCall.returnValue.resolve([]);
      expect(dataProvider).to.have.been.calledOnce;
    });

    it("unschedules node load after cancellation", async () => {
      const dataProvider = sinon.fake(
        () => new ResolvablePromise<ImmediatelyLoadedTreeNodeItem[]>()
      );
      const modelSource = new TreeModelSource();
      const nodeLoader = new PagedTreeNodeLoader(dataProvider, modelSource, 5);
      const subscription = nodeLoader
        .loadNode(modelSource.getModel().getRootNode(), 0)
        .subscribe();
      await Promise.resolve();
      expect(dataProvider).to.have.been.calledOnce;
      subscription.unsubscribe();
      // The first subscription no longer has any subscribers, so the initial load operation has been cancelled

      nodeLoader.loadNode(modelSource.getModel().getRootNode(), 0).subscribe();
      // Finalise the first node load to allow SubscriptionScheduler to move onto next observable. As a bonus, after the
      // await, the second subscription will have already propagated to the node loader.
      await dataProvider.firstCall.returnValue.resolve([]);
      expect(dataProvider).to.have.been.calledTwice;
    });

    it("does not load more than one page concurrently", async () => {
      const dataProvider = sinon.fake(
        () => new ResolvablePromise<ImmediatelyLoadedTreeNodeItem[]>()
      );
      const modelSource = new TreeModelSource();
      const nodeLoader = new PagedTreeNodeLoader(dataProvider, modelSource, 5);

      nodeLoader.loadNode(modelSource.getModel().getRootNode(), 0).subscribe();
      nodeLoader.loadNode(modelSource.getModel().getRootNode(), 5).subscribe();

      await Promise.resolve();
      expect(dataProvider).to.have.been.calledOnce;

      await dataProvider.firstCall.returnValue.resolve([]);
      expect(dataProvider).to.have.been.calledTwice;
    });

    it("does not put stale nodes into model after cancellation", async () => {
      const nodesPromise = new ResolvablePromise<
        ImmediatelyLoadedTreeNodeItem[]
      >();
      const dataProvider = sinon.fake(() => nodesPromise);
      const modelSource = new TreeModelSource();
      const nodeLoader = new PagedTreeNodeLoader(dataProvider, modelSource, 5);

      const subscription = nodeLoader
        .loadNode(modelSource.getModel().getRootNode(), 0)
        .subscribe();
      await Promise.resolve();
      expect(dataProvider).to.have.been.calledOnce;
      subscription.unsubscribe();

      // resolve nodes promise
      await nodesPromise.resolve([
        createTestTreeNodeItem({ id: "A" }),
        createTestTreeNodeItem({ id: "B" }),
      ]);

      expect(modelSource.getModel().getNode("A")).to.be.undefined;
      expect(modelSource.getModel().getNode("B")).to.be.undefined;
    });

    describe("using raw data provider", () => {
      const nodesProvider: ImmediatelyLoadedTreeNodeItem[] = [
        {
          id: "1",
          label: PropertyRecord.fromString("1"),
          children: [
            { id: "1-1", label: PropertyRecord.fromString("1-1") },
            { id: "1-2", label: PropertyRecord.fromString("1-2") },
          ],
        },
        { id: "2", label: PropertyRecord.fromString("2"), children: [] },
      ];

      it("loads all immediately loaded nodes", async () => {
        const modelSource = new TreeModelSource();
        const nodeLoader = new PagedTreeNodeLoader(
          nodesProvider,
          modelSource,
          5
        );
        const loadObs = nodeLoader.loadNode(
          modelSource.getModel().getRootNode(),
          0
        );
        const loadedIds = await extractLoadedNodeIds(loadObs);
        expect(loadedIds).to.be.deep.eq(["1", "1-1", "1-2", "2"]);
      });
    });
  });
});

describe("AbstractTreeNodeLoader", () => {
  before(async () => {
    // needed to enable `immer` patches
    await UiComponents.initialize(new EmptyLocalization());
  });

  after(() => {
    UiComponents.terminate();
  });

  describe("loadNode", () => {
    it("accepts non-rxjs observables", async () => {
      const modelSource = new TreeModelSource();
      const promise = new ResolvablePromise<void>();
      const nodeLoader = createCustomTreeNodeLoader(modelSource, () => {
        return {
          [Symbol.observable]() {
            return this;
          },
          subscribe(
            observerOrNext?:
              | Observer<LoadedNodeHierarchy>
              | ((value: LoadedNodeHierarchy) => void)
              | null,
            _error?: ((error: any) => void) | null,
            complete?: (() => void) | null
          ) {
            if (typeof observerOrNext === "object") {
              observerOrNext?.complete?.();
            } else {
              complete?.();
            }
            return { closed: true, add() {}, unsubscribe() {} };
          },
        };
      });
      nodeLoader
        .loadNode(modelSource.getModel().getRootNode(), 0)
        .subscribe({ complete: async () => promise.resolve() });
      await promise;
    });

    it("allows one active load at a time", async () => {
      const modelSource = new TreeModelSource();
      const dataProvider = sinon.fake(
        () => new ResolvablePromise<LoadedNodeHierarchy>()
      );

      const nodeLoader = createCustomTreeNodeLoader(modelSource, () =>
        defer(() => rxjsFrom<Promise<LoadedNodeHierarchy>>(dataProvider()))
      );
      nodeLoader.loadNode(modelSource.getModel().getRootNode(), 0).subscribe();
      nodeLoader.loadNode(modelSource.getModel().getRootNode(), 1).subscribe();

      await Promise.resolve();
      expect(dataProvider).to.have.been.calledOnce;

      const hierarchy: LoadedNodeHierarchy = {
        parentId: undefined,
        offset: 0,
        numChildren: undefined,
        hierarchyItems: [],
      };
      await dataProvider.firstCall.returnValue.resolve(hierarchy);
      expect(dataProvider).to.have.been.calledTwice;
    });

    it("does not put stale nodes into model after cancellation", async () => {
      const modelSource = new TreeModelSource();
      const nodesPromise = new ResolvablePromise<LoadedNodeHierarchy>();
      const dataProvider = sinon.fake(() => nodesPromise);
      const nodeLoader = createCustomTreeNodeLoader(modelSource, () =>
        defer(() => rxjsFrom<Promise<LoadedNodeHierarchy>>(dataProvider()))
      );
      const subscription = nodeLoader
        .loadNode(modelSource.getModel().getRootNode(), 0)
        .subscribe();

      await Promise.resolve();
      expect(dataProvider).to.have.been.calledOnce;

      // unsubscribe before completing promise
      subscription.unsubscribe();

      const hierarchy: LoadedNodeHierarchy = {
        parentId: undefined,
        offset: 0,
        numChildren: 1,
        hierarchyItems: [
          {
            item: createTestTreeNodeItem({ id: "A" }),
          },
        ],
      };
      await nodesPromise.resolve(hierarchy);

      expect(nodeLoader.modelSource.getModel().getNode("A")).to.be.undefined;
    });

    function createCustomTreeNodeLoader(
      modelSource: TreeModelSource,
      load: AbstractTreeNodeLoader["load"]
    ): AbstractTreeNodeLoader {
      return new (class extends AbstractTreeNodeLoader {
        constructor() {
          super(modelSource);
        }

        protected load(
          parent: TreeModelNode | TreeModelRootNode,
          childIndex: number
        ): Observable<LoadedNodeHierarchy> {
          return load(parent, childIndex);
        }
      })();
    }
  });
});

describe("TreeDataSource", () => {
  describe("requestItems", () => {
    describe("using TreeDataProviderRaw", () => {
      const rawProvider = [
        {
          id: faker.random.uuid(),
          label: PropertyRecord.fromString(faker.random.uuid(), "label"),
          children: [
            {
              id: faker.random.uuid(),
              label: PropertyRecord.fromString(faker.random.word(), "label"),
              children: [
                {
                  id: faker.random.uuid(),
                  label: PropertyRecord.fromString(
                    faker.random.word(),
                    "label"
                  ),
                },
              ],
            },
          ],
        },
        {
          id: faker.random.uuid(),
          label: PropertyRecord.fromString(faker.random.uuid(), "label"),
          children: [
            {
              id: faker.random.uuid(),
              label: PropertyRecord.fromString(faker.random.word(), "label"),
            },
          ],
        },
      ];

      it("loads one node", async () => {
        const dataSource = new TreeDataSource(rawProvider);

        const request = dataSource.requestItems(undefined, 0, 1, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.deep.eq(rawProvider.slice(0, 1));
      });

      it("loads all nodes", async () => {
        const dataSource = new TreeDataSource(rawProvider);

        const request = dataSource.requestItems(undefined, 0, 0, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.deep.eq(rawProvider);
      });

      it("loads nodes for root node", async () => {
        const rootNode = rawProvider[1];
        const dataSource = new TreeDataSource(rawProvider);

        const request = dataSource.requestItems(rootNode, 0, 0, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.deep.eq(rootNode.children);
      });

      it("loads nodes for parent node in hierarchy", async () => {
        const parentNode: ImmediatelyLoadedTreeNodeItem =
          rawProvider[0].children[0];
        const dataSource = new TreeDataSource(rawProvider);

        const request = dataSource.requestItems(parentNode, 0, 0, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.deep.eq(parentNode.children);
      });

      it("returns empty array if parent is not found", async () => {
        const nonExistingNode = {
          id: faker.random.uuid(),
          label: PropertyRecord.fromString(faker.random.word()),
        };
        const dataSource = new TreeDataSource(rawProvider);

        const request = dataSource.requestItems(nonExistingNode, 0, 0, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.empty;
      });
    });

    describe("using ITreeDataProvider interface", () => {
      it("avoids loading stale data from the data provider", async () => {
        const getNodesCountPromise = new ResolvablePromise<number>();
        const dataProvider: ITreeDataProvider = {
          getNodesCount: sinon.fake(() => getNodesCountPromise),
          getNodes: sinon.fake(),
        };

        const subscription = new TreeDataSource(dataProvider)
          .requestItems(undefined, 0, 1, true)
          .subscribe();
        expect(dataProvider.getNodesCount).to.have.been.calledOnce;

        // Simulating unsubscribing from TreeDataSource in between getNodesCount call and getNodes call
        subscription.unsubscribe();
        await getNodesCountPromise.resolve(1);
        expect(dataProvider.getNodes).not.to.have.been.called;
      });
    });

    describe("using TreeDataProviderMethod", () => {
      const nodeItems = createRandomTreeNodeItems(2);
      const methodProvider = async () => nodeItems;

      it("loads one node", async () => {
        const dataSource = new TreeDataSource(methodProvider);

        const request = dataSource.requestItems(undefined, 0, 1, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.deep.eq(nodeItems.slice(0, 1));
      });

      it("loads all nodes", async () => {
        const dataSource = new TreeDataSource(methodProvider);

        const request = dataSource.requestItems(undefined, 0, 0, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.deep.eq(nodeItems);
      });
    });

    describe("using TreeDataProviderPromise", () => {
      const rawProvider = [
        {
          id: faker.random.uuid(),
          label: PropertyRecord.fromString(faker.random.uuid(), "label"),
          children: [
            {
              id: faker.random.uuid(),
              label: PropertyRecord.fromString(faker.random.word(), "label"),
              children: [
                {
                  id: faker.random.uuid(),
                  label: PropertyRecord.fromString(
                    faker.random.word(),
                    "label"
                  ),
                },
              ],
            },
          ],
        },
        {
          id: faker.random.uuid(),
          label: PropertyRecord.fromString(faker.random.uuid(), "label"),
          children: [
            {
              id: faker.random.uuid(),
              label: PropertyRecord.fromString(faker.random.word(), "label"),
            },
          ],
        },
      ];
      const promiseProvider = new Promise<TreeDataProviderRaw>((resolve) =>
        resolve(rawProvider)
      );

      it("loads one node", async () => {
        const dataSource = new TreeDataSource(promiseProvider);

        const request = dataSource.requestItems(undefined, 0, 1, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.deep.eq(rawProvider.slice(0, 1));
      });

      it("loads all nodes", async () => {
        const dataSource = new TreeDataSource(promiseProvider);

        const request = dataSource.requestItems(undefined, 0, 0, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.deep.eq(rawProvider);
      });

      it("loads nodes for root node", async () => {
        const rootNode = rawProvider[1];
        const dataSource = new TreeDataSource(promiseProvider);

        const request = dataSource.requestItems(rootNode, 0, 0, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.deep.eq(rootNode.children);
      });

      it("loads nodes for parent node in hierarchy", async () => {
        const parentNode: ImmediatelyLoadedTreeNodeItem =
          rawProvider[0].children[0];
        const dataSource = new TreeDataSource(promiseProvider);

        const request = dataSource.requestItems(parentNode, 0, 0, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.deep.eq(parentNode.children);
      });

      it("returns empty array if parent is not found", async () => {
        const nonExistingNode = {
          id: faker.random.uuid(),
          label: PropertyRecord.fromString(faker.random.word()),
        };
        const dataSource = new TreeDataSource(promiseProvider);

        const request = dataSource.requestItems(nonExistingNode, 0, 0, false);
        const result = await extractSequence(rxjsFrom(request));
        expect(result[0].loadedItems).to.be.empty;
      });
    });

    describe("using Unknown tree data provider", () => {
      const waitForCompleteOrError = async <T extends {}>(
        observable: RxjsObservable<T>
      ) => {
        return new Promise<void>((resolve, reject) => {
          observable.subscribe({
            error: (err) => reject(err),
            complete: () => resolve(),
          });
        });
      };

      it("throws error", async () => {
        const dataSource = new TreeDataSource({} as any);

        const request = dataSource.requestItems(undefined, 0, 5, false);
        await expect(waitForCompleteOrError(request)).to.eventually.be.rejected;
      });
    });
  });
});

describe("handleLoadedNodeHierarchy", () => {
  function convertToTreeModelNodeInput(
    item: TreeNodeItemData
  ): TreeModelNodeInput {
    let numChildren: number | undefined;
    if (item.children) {
      numChildren = item.children.length;
    } else if (!item.hasChildren) {
      numChildren = 0;
    }

    return {
      description: item.description,
      isExpanded: !!item.autoExpand,
      id: item.id,
      item,
      label: item.label,
      isLoading: false,
      numChildren,
      isSelected: false,
    };
  }

  let modelSource: TreeModelSource;

  beforeEach(() => {
    modelSource = new TreeModelSource();
  });

  it("handles loaded hierarchy with root nodes", () => {
    const loadedHierarchy: LoadedNodeHierarchy = {
      parentId: undefined,
      offset: 0,
      numChildren: 4,
      hierarchyItems: createRandomTreeNodeItems(6).map((item) => ({ item })),
    };

    handleLoadedNodeHierarchy(modelSource, loadedHierarchy);

    expect(modelSource.getModel().getChildren(undefined)!.getLength()).to.be.eq(
      6
    );
  });

  it("handles loaded hierarchy with root node and child node", () => {
    const loadedHierarchy: LoadedNodeHierarchy = {
      parentId: undefined,
      offset: 0,
      numChildren: 1,
      hierarchyItems: [
        {
          item: createRandomTreeNodeItem(),
          numChildren: 1,
          children: [
            {
              item: createRandomTreeNodeItem(),
            },
          ],
        },
      ],
    };
    handleLoadedNodeHierarchy(modelSource, loadedHierarchy);

    expect(modelSource.getModel().getChildren(undefined)!.getLength()).to.be.eq(
      1
    );
    expect(
      modelSource
        .getModel()
        .getChildren(loadedHierarchy.hierarchyItems[0].item.id)!
        .getLength()
    ).to.be.eq(1);
  });

  it("handles loaded hierarchy with child for existing parent node", () => {
    const parentNode = createRandomTreeNodeItem();
    modelSource.modifyModel((model) => {
      model.setNumChildren(undefined, 1);
      model.setChildren(
        undefined,
        [convertToTreeModelNodeInput(parentNode)],
        0
      );
      const node = model.getNode(parentNode.id);
      node!.isLoading = true;
    });

    const loadedHierarchy: LoadedNodeHierarchy = {
      parentId: parentNode.id,
      offset: 0,
      numChildren: 1,
      hierarchyItems: [
        {
          item: createRandomTreeNodeItems(1, parentNode.id)[0],
        },
      ],
    };
    handleLoadedNodeHierarchy(modelSource, loadedHierarchy);

    expect(
      modelSource.getModel().getChildren(parentNode.id)!.getLength()
    ).to.be.eq(1);
    expect(modelSource.getModel().getNode(parentNode.id)!.isLoading).to.be
      .false;
  });

  it("does not add children if parent was collapsed and children should be disposed", () => {
    const parentNode = createRandomTreeNodeItem();
    modelSource.modifyModel((model) => {
      model.setChildren(
        undefined,
        [convertToTreeModelNodeInput(parentNode)],
        0
      );
    });

    const loadedHierarchy: LoadedNodeHierarchy = {
      parentId: parentNode.id,
      offset: 0,
      numChildren: undefined,
      hierarchyItems: [
        {
          item: createRandomTreeNodeItems(1, parentNode.id)[0],
        },
      ],
    };
    handleLoadedNodeHierarchy(modelSource, loadedHierarchy);

    expect(modelSource.getModel().getChildren(parentNode.id)).to.be.undefined;
  });

  it("updates existing expanded nodes in the same position", () => {
    const root1 = createRandomTreeNodeItem("root1", undefined, "root-node-1");
    const root2 = createRandomTreeNodeItem("root2", undefined, "root-node-2");
    const root3 = createRandomTreeNodeItem("root3", undefined, "root-node-3");
    const child1 = createRandomTreeNodeItem("child1", root2.id, "child-node-1");
    const child2 = createRandomTreeNodeItem("child2", root3.id, "child-node-2");
    const newNode = createRandomTreeNodeItem(
      "new-root1",
      undefined,
      "new-root-node"
    );
    modelSource.modifyModel((model) => {
      model.setChildren(
        undefined,
        [
          convertToTreeModelNodeInput(root1),
          { ...convertToTreeModelNodeInput(root2), isExpanded: true },
          {
            ...convertToTreeModelNodeInput(root3),
            isExpanded: true,
            description: "description",
          },
        ],
        0
      );
      model.setChildren(root2.id, [convertToTreeModelNodeInput(child1)], 0);
      model.setChildren(root3.id, [convertToTreeModelNodeInput(child2)], 0);
    });

    const loadedHierarchy: LoadedNodeHierarchy = {
      parentId: undefined,
      offset: 0,
      numChildren: undefined,
      hierarchyItems: [
        {
          item: newNode,
        },
        {
          item: {
            ...root2,
            label: PropertyRecord.fromString("new-label"),
            hasChildren: true,
          },
        },
        {
          item: { ...root3, description: undefined, hasChildren: true },
        },
      ],
    };
    handleLoadedNodeHierarchy(modelSource, loadedHierarchy);

    expect(modelSource.getModel().getNode(root1.id)).to.be.undefined;
    expect(modelSource.getModel().getNode(newNode.id)).to.be.not.undefined;
    expect(modelSource.getModel().getNode(root2.id)?.label).to.be.deep.equal(
      PropertyRecord.fromString("new-label")
    );
    expect(modelSource.getModel().getNode(child1.id)).to.be.not.undefined;
    expect(modelSource.getModel().getNode(root3.id)?.description).to.be.equal(
      ""
    );
    expect(modelSource.getModel().getNode(child2.id)).to.be.not.undefined;
  });
});
