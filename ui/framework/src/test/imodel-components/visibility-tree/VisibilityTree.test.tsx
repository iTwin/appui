/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as moq from "@bentley/presentation-common/lib/test/_helpers/Mocks"; // tslint:disable-line: no-direct-imports
import { createRandomId } from "@bentley/presentation-common/lib/test/_helpers/random"; // tslint:disable-line: no-direct-imports
import * as sinon from "sinon";
import { render, cleanup, waitForElement, within, fireEvent } from "@testing-library/react";
import { expect } from "chai";
import TestUtils from "../../TestUtils";
import { BeEvent, Id64String, using } from "@bentley/bentleyjs-core";
import { IModelConnection, ViewState, Viewport, ViewState3d, SpatialViewState, PerModelCategoryVisibility } from "@bentley/imodeljs-frontend";
import { KeySet, ECInstanceNodeKey, StandardNodeTypes, BaseNodeKey, InstanceKey } from "@bentley/presentation-common";
import { SelectionManager, Presentation, SelectionChangeEvent } from "@bentley/presentation-frontend";
import { IPresentationTreeDataProvider } from "@bentley/presentation-components";
import { initialize as initializePresentationTesting, terminate as terminatePresentationTesting, HierarchyBuilder } from "@bentley/presentation-testing";
import { isPromiseLike } from "@bentley/ui-core";
import { TreeDataChangesListener, TreeNodeItem } from "@bentley/ui-components";
import { VisibilityTree } from "../../../ui-framework";
import { VisibilityHandler, VisibilityHandlerProps } from "../../../ui-framework/imodel-components/visibility-tree/VisibilityTree";

describe("VisibilityTree", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();

    // note: this is needed for AutoSizer used by the Tree to
    // have non-zero size and render the virtualized list
    Object.defineProperties(HTMLElement.prototype, {
      offsetHeight: { get: () => 200 },
      offsetWidth: { get: () => 200 },
    });
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  describe("#unit", () => {

    const imodelMock = moq.Mock.ofType<IModelConnection>();
    const selectionManagerMock = moq.Mock.ofType<SelectionManager>();
    let dataProvider: IPresentationTreeDataProvider;

    beforeEach(() => {
      cleanup();

      imodelMock.reset();
      selectionManagerMock.reset();
      dataProvider = {
        imodel: imodelMock.object,
        rulesetId: "",
        onTreeNodeChanged: new BeEvent<TreeDataChangesListener>(),
        getFilteredNodePaths: async () => [],
        getNodeKey: (node: TreeNodeItem) => (node as any).__key,
        getNodesCount: async () => 0,
        getNodes: async () => [],
        loadHierarchy: async () => { },
      };

      const selectionChangeEvent = new SelectionChangeEvent();
      selectionManagerMock.setup((x) => x.selectionChange).returns(() => selectionChangeEvent);
      selectionManagerMock.setup((x) => x.getSelectionLevels(imodelMock.object)).returns(() => []);
      selectionManagerMock.setup((x) => x.getSelection(imodelMock.object, moq.It.isAny())).returns(() => new KeySet());
      Presentation.selection = selectionManagerMock.object;
    });

    after(() => {
      Presentation.terminate();
    });

    const setupDataProvider = (nodes: TreeNodeItem[]) => {
      dataProvider.getNodesCount = async () => nodes.length;
      dataProvider.getNodes = async () => nodes.map((n) => ({ __key: createKey("element", n.id), ...n }));
    };

    const setupDataProviderForEachNodeType = () => {
      setupDataProvider([
        createSubjectNode(),
        createModelNode(),
        createCategoryNode(),
        createElementNode(),
      ]);
    };

    const createSubjectNode = () => ({
      __key: createKey("subject", "subject_id"),
      id: "subject",
      label: "subject",
      extendedData: {
        isSubject: true,
      },
    });

    const createModelNode = () => ({
      __key: createKey("model", "model_id"),
      id: "model",
      label: "model",
      extendedData: {
        isModel: true,
      },
    });

    const createCategoryNode = (parentModelKey?: InstanceKey) => ({
      __key: createKey("category", "category_id"),
      id: "category",
      parentId: "model",
      label: "category",
      extendedData: {
        isCategory: true,
        modelId: parentModelKey ? parentModelKey.id : undefined,
      },
    });

    const createElementNode = (modelId?: Id64String, categoryId?: Id64String) => ({
      __key: createKey("element", "element_id"),
      id: "element",
      label: "element",
      extendedData: {
        modelId,
        categoryId,
      },
    });

    const createKey = (type: "subject" | "model" | "category" | "element", id: Id64String): ECInstanceNodeKey => {
      let className: string;
      switch (type) {
        case "subject": className = "MyDomain:Subject"; break;
        case "model": className = "MyDomain:PhysicalModel"; break;
        case "category": className = "MyDomain:SpatialCategory"; break;
        default: className = "MyDomain:SomeElementType";
      }
      return {
        type: StandardNodeTypes.ECInstanceNode,
        instanceKey: { className, id },
        pathFromRoot: [],
      };
    };

    describe("<VisibilityTree />", () => {

      const visibilityHandlerMock = moq.Mock.ofType<VisibilityHandler>();

      beforeEach(() => {
        visibilityHandlerMock.reset();
      });

      const isNodeChecked = (node: HTMLElement): boolean => {
        const cb = node.querySelector("input");
        return cb!.checked;
      };

      it("should match snapshot", async () => {
        setupDataProvider([{ id: "test", label: "test-node" }]);
        visibilityHandlerMock.setup(async (x) => x.getDisplayStatus(moq.It.isAny())).returns(async () => ({ isDisplayed: false }));
        const result = render(<VisibilityTree imodel={imodelMock.object} dataProvider={dataProvider} visibilityHandler={visibilityHandlerMock.object} />);
        await waitForElement(() => result.getByText("test-node"), { container: result.container });
        expect(result.baseElement).to.matchSnapshot();
      });

      it("requests data provider to load the hierarchy if `enablePreloading` is set in props", async () => {
        const spy = sinon.spy(dataProvider, "loadHierarchy");
        render(<VisibilityTree imodel={imodelMock.object} dataProvider={dataProvider}
          visibilityHandler={visibilityHandlerMock.object} enablePreloading={true} />);
        expect(spy).to.be.calledOnce;
      });

      it("renders nodes without checkboxes when they're not instance-based", async () => {
        setupDataProvider([createElementNode()]);
        dataProvider.getNodeKey = (): BaseNodeKey => ({ type: "test", pathFromRoot: [] });

        visibilityHandlerMock.setup((x) => x.getDisplayStatus(moq.It.isAny())).returns(() => ({ isDisplayed: false }));

        const result = render(<VisibilityTree imodel={imodelMock.object} visibilityHandler={visibilityHandlerMock.object} dataProvider={dataProvider} />);
        const renderedNode = await waitForElement(() => result.getByText("element"));
        expect(within(renderedNode).queryAllByTestId("tree-node-checkbox").length).to.eq(0);
      });

      it("renders nodes as unchecked when they're not displayed", async () => {
        setupDataProviderForEachNodeType();
        visibilityHandlerMock.setup(async (x) => x.getDisplayStatus(moq.It.isAny())).returns(async () => ({ isDisplayed: false }));

        const result = render(<VisibilityTree imodel={imodelMock.object} visibilityHandler={visibilityHandlerMock.object} dataProvider={dataProvider} />);
        await waitForElement(() => result.getByText("model"));
        const nodes = result.getAllByTestId("tree-node");
        expect(nodes.length).to.eq(4);
        nodes.forEach((node) => expect(isNodeChecked(node)).to.be.false);
      });

      it("renders nodes as checked when they're displayed", async () => {
        setupDataProviderForEachNodeType();
        visibilityHandlerMock.setup(async (x) => x.getDisplayStatus(moq.It.isAny())).returns(async () => ({ isDisplayed: true }));

        const result = render(<VisibilityTree imodel={imodelMock.object} visibilityHandler={visibilityHandlerMock.object} dataProvider={dataProvider} />);
        await waitForElement(() => result.getByText("model"));
        const nodes = result.getAllByTestId("tree-node");
        expect(nodes.length).to.eq(4);
        nodes.forEach((node) => expect(isNodeChecked(node)).to.be.true);
      });

      it("re-renders nodes on `onVisibilityChange` callback", async () => {
        const node = createModelNode();
        setupDataProvider([node]);

        let cb: undefined | (() => void);
        visibilityHandlerMock.setup((x) => x.onVisibilityChange = moq.It.isAny()).callback((value) => cb = value).verifiable();
        visibilityHandlerMock.setup((x) => x.getDisplayStatus(moq.It.isAny())).returns(() => ({ isDisplayed: false })).verifiable(moq.Times.exactly(2));
        const result = render(<VisibilityTree imodel={imodelMock.object} visibilityHandler={visibilityHandlerMock.object} dataProvider={dataProvider} />);
        await waitForElement(() => {
          const renderedNode = result.getByTestId("tree-node");
          if (isNodeChecked(renderedNode))
            throw new Error("expecting unchecked node");
          return renderedNode;
        });
        visibilityHandlerMock.verifyAll();

        visibilityHandlerMock.reset();
        visibilityHandlerMock.setup((x) => x.getDisplayStatus(moq.It.isAny())).returns(() => ({ isDisplayed: true })).verifiable(moq.Times.exactly(1));
        cb!();
        await waitForElement(() => {
          const renderedNode = result.getByTestId("tree-node");
          if (!isNodeChecked(renderedNode))
            throw new Error("expecting checked node");
          return renderedNode;
        });
        visibilityHandlerMock.verifyAll();
      });

      it("calls visibility handler's `changeVisibility` on node checkbox state changes to 'checked'", async () => {
        const node = createModelNode();
        setupDataProvider([node]);
        visibilityHandlerMock.setup(async (x) => x.getDisplayStatus(moq.It.isAny())).returns(async () => ({ isDisplayed: false }));
        visibilityHandlerMock.setup(async (x) => x.changeVisibility(node, true)).verifiable();

        const result = render(<VisibilityTree imodel={imodelMock.object} visibilityHandler={visibilityHandlerMock.object} dataProvider={dataProvider} />);
        await waitForElement(() => result.getByText("model"));
        const renderedNode = result.getByTestId("tree-node");
        const cb = renderedNode.querySelector("input");
        fireEvent.click(cb!);

        visibilityHandlerMock.verifyAll();
      });

    });

    describe("VisibilityHandler", () => {

      interface ViewportMockProps {
        viewState?: ViewState;
        perModelCategoryVisibility?: PerModelCategoryVisibility.Overrides;
        onViewedCategoriesPerModelChanged?: BeEvent<(vp: Viewport) => void>;
        onViewedCategoriesChanged?: BeEvent<(vp: Viewport) => void>;
        onViewedModelsChanged?: BeEvent<(vp: Viewport) => void>;
        onAlwaysDrawnChanged?: BeEvent<() => void>;
        onNeverDrawnChanged?: BeEvent<() => void>;
      }
      const mockViewport = (props?: ViewportMockProps) => {
        if (!props)
          props = {};
        if (!props.viewState)
          props.viewState = moq.Mock.ofType<ViewState>().object;
        if (!props.perModelCategoryVisibility)
          props.perModelCategoryVisibility = moq.Mock.ofType<PerModelCategoryVisibility.Overrides>().object;
        if (!props.onViewedCategoriesPerModelChanged)
          props.onViewedCategoriesPerModelChanged = new BeEvent<(vp: Viewport) => void>();
        if (!props.onViewedCategoriesChanged)
          props.onViewedCategoriesChanged = new BeEvent<(vp: Viewport) => void>();
        if (!props.onViewedModelsChanged)
          props.onViewedModelsChanged = new BeEvent<(vp: Viewport) => void>();
        if (!props.onAlwaysDrawnChanged)
          props.onAlwaysDrawnChanged = new BeEvent<() => void>();
        if (!props.onNeverDrawnChanged)
          props.onNeverDrawnChanged = new BeEvent<() => void>();
        const vpMock = moq.Mock.ofType<Viewport>();
        vpMock.setup((x) => x.iModel).returns(() => imodelMock.object);
        vpMock.setup((x) => x.view).returns(() => props!.viewState!);
        vpMock.setup((x) => x.perModelCategoryVisibility).returns(() => props!.perModelCategoryVisibility!);
        vpMock.setup((x) => x.onViewedCategoriesPerModelChanged).returns(() => props!.onViewedCategoriesPerModelChanged!);
        vpMock.setup((x) => x.onViewedCategoriesChanged).returns(() => props!.onViewedCategoriesChanged!);
        vpMock.setup((x) => x.onViewedModelsChanged).returns(() => props!.onViewedModelsChanged!);
        vpMock.setup((x) => x.onAlwaysDrawnChanged).returns(() => props!.onAlwaysDrawnChanged!);
        vpMock.setup((x) => x.onNeverDrawnChanged).returns(() => props!.onNeverDrawnChanged!);
        return vpMock;
      };

      const createHandler = (partialProps?: Partial<VisibilityHandlerProps>): VisibilityHandler => {
        if (!partialProps)
          partialProps = {};
        const props: VisibilityHandlerProps = {
          viewport: partialProps.viewport || mockViewport().object,
          dataProvider: partialProps.dataProvider || dataProvider,
          onVisibilityChange: partialProps.onVisibilityChange || sinon.stub(),
        };
        return new VisibilityHandler(props);
      };

      interface SubjectModelIdsMockProps {
        imodelMock: moq.IMock<IModelConnection>;
        subjectsHierarchy: Map<Id64String, Id64String[]>;
        subjectModels: Map<Id64String, Id64String[]>;
      }

      const mockSubjectModelIds = (props: SubjectModelIdsMockProps) => {
        const q1 = `SELECT ECInstanceId id, Parent.Id parentId FROM bis.Subject WHERE Parent IS NOT NULL`;
        props.imodelMock.setup((x) => x.query(q1))
          .returns(async function* () {
            const list = new Array<{ id: Id64String, parentId: Id64String }>();
            props.subjectsHierarchy.forEach((ids, parentId) => ids.forEach((id) => list.push({ id, parentId })));
            while (list.length)
              yield list.shift();
          });
        const q2 = `SELECT p.ECInstanceId id, p.Parent.Id subjectId FROM bis.InformationPartitionElement p JOIN bis.Model m ON m.ModeledElement.Id = p.ECInstanceId`;
        props.imodelMock.setup((x) => x.query(q2))
          .returns(async function* () {
            const list = new Array<{ id: Id64String, subjectId: Id64String }>();
            props.subjectModels.forEach((modelIds, subjectId) => modelIds.forEach((modelId) => list.push({ id: modelId, subjectId })));
            while (list.length)
              yield list.shift();
          });
      };

      describe("constructor", () => {

        it("should subscribe for viewport change events", () => {
          const vpMock = mockViewport();
          createHandler({ viewport: vpMock.object });
          expect(vpMock.object.onViewedCategoriesPerModelChanged.numberOfListeners).to.eq(1);
          expect(vpMock.object.onViewedCategoriesChanged.numberOfListeners).to.eq(1);
          expect(vpMock.object.onViewedModelsChanged.numberOfListeners).to.eq(1);
          expect(vpMock.object.onAlwaysDrawnChanged.numberOfListeners).to.eq(1);
          expect(vpMock.object.onNeverDrawnChanged.numberOfListeners).to.eq(1);
        });

      });

      describe("dispose", () => {

        it("should unsubscribe from viewport change events", () => {
          const vpMock = mockViewport();
          using(createHandler({ viewport: vpMock.object }), (_) => {
          });
          expect(vpMock.object.onViewedCategoriesPerModelChanged.numberOfListeners).to.eq(0);
          expect(vpMock.object.onViewedCategoriesChanged.numberOfListeners).to.eq(0);
          expect(vpMock.object.onViewedModelsChanged.numberOfListeners).to.eq(0);
          expect(vpMock.object.onAlwaysDrawnChanged.numberOfListeners).to.eq(0);
          expect(vpMock.object.onNeverDrawnChanged.numberOfListeners).to.eq(0);
        });

      });

      describe("getDisplayStatus", () => {

        it("returns disabled when node is not an instance node", async () => {
          const node = {
            __key: {
              type: "custom",
              pathFromRoot: [],
            },
            id: "custom",
            label: "custom",
          };

          const vpMock = mockViewport();

          await using(createHandler({ viewport: vpMock.object }), async (handler) => {
            const result = handler.getDisplayStatus(node);
            expect(isPromiseLike(result)).to.be.false;
            expect(result).to.include({ isDisplayed: false, isDisabled: true });
          });
        });

        describe("subject", () => {

          it("return disabled when active view is not spatial", async () => {
            const node = createSubjectNode();
            const vpMock = mockViewport();
            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.true;
              if (isPromiseLike(result))
                expect(await result).to.include({ isDisplayed: false, isDisabled: true });
            });
          });

          it("return false when all models are not displayed", async () => {
            const node = createSubjectNode();
            const key = node.__key.instanceKey;

            mockSubjectModelIds({
              imodelMock,
              subjectsHierarchy: new Map([["0x0", [key.id]]]),
              subjectModels: new Map([[key.id, ["0x1", "0x2"]]]),
            });

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x1")).returns(() => false);
            viewStateMock.setup((x) => x.viewsModel("0x2")).returns(() => false);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.true;
              if (isPromiseLike(result))
                expect(await result).to.include({ isDisplayed: false });
            });
          });

          it("return true when at least one direct model is displayed", async () => {
            const node = createSubjectNode();
            const key = node.__key.instanceKey;

            mockSubjectModelIds({
              imodelMock,
              subjectsHierarchy: new Map([["0x0", [key.id]]]),
              subjectModels: new Map([[key.id, ["0x1", "0x2"]]]),
            });

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x1")).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x2")).returns(() => false);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.true;
              if (isPromiseLike(result))
                expect(await result).to.include({ isDisplayed: true });
            });
          });

          it("return true when at least one nested model is displayed", async () => {
            const node = createSubjectNode();
            const key = node.__key.instanceKey;

            mockSubjectModelIds({
              imodelMock,
              subjectsHierarchy: new Map([[key.id, ["0x1"]], ["0x1", ["0x2", "0x3"]]]),
              subjectModels: new Map([["0x3", ["0x4", "0x5"]]]),
            });

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x4")).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x5")).returns(() => false);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.true;
              if (isPromiseLike(result))
                expect(await result).to.include({ isDisplayed: true });
            });
          });

          it("initializes subject models cache only once", async () => {
            const node = createSubjectNode();
            const key = node.__key.instanceKey;

            mockSubjectModelIds({
              imodelMock,
              subjectsHierarchy: new Map([["0x0", [key.id]]]),
              subjectModels: new Map([[key.id, ["0x1", "0x2"]]]),
            });

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel(moq.It.isAny())).returns(() => false);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              await Promise.all([handler.getDisplayStatus(node), handler.getDisplayStatus(node)]);
              // expect the `query` to be called only twice (once for subjects and once for models)
              imodelMock.verify((x) => x.query(moq.It.isAnyString()), moq.Times.exactly(2));
            });
          });

        });

        describe("model", () => {

          it("return disabled when active view is not spatial", async () => {
            const node = createModelNode();
            const vpMock = mockViewport();
            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false, isDisabled: true });
            });
          });

          it("return true when displayed", async () => {
            const node = createModelNode();
            const key = node.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel(key.id)).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: true });
            });
          });

          it("returns false when not displayed", async () => {
            const node = createModelNode();
            const key = node.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel(key.id)).returns(() => false);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false });
            });
          });

        });

        describe("category", () => {

          it("return disabled when model not displayed", async () => {
            const parentModelNode = createModelNode();
            const parentModelKey = parentModelNode.__key.instanceKey;
            const categoryNode = createCategoryNode(parentModelKey);

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel(parentModelKey.id)).returns(() => false);

            const vpMock = mockViewport({ viewState: viewStateMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(categoryNode);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false, isDisabled: true });
            });
          });

          it("return true when model displayed, category not displayed but per-model override says it's displayed", async () => {
            const parentModelNode = createModelNode();
            const parentModelKey = parentModelNode.__key.instanceKey;
            const categoryNode = createCategoryNode(parentModelKey);
            const categoryKey = categoryNode.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory(categoryKey.id)).returns(() => false);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel(parentModelKey.id)).returns(() => true);

            const perModelCategoryVisibilityMock = moq.Mock.ofType<PerModelCategoryVisibility.Overrides>();
            perModelCategoryVisibilityMock.setup((x) => x.getOverride(parentModelKey.id, categoryKey.id)).returns(() => PerModelCategoryVisibility.Override.Show);

            const vpMock = mockViewport({ viewState: viewStateMock.object, perModelCategoryVisibility: perModelCategoryVisibilityMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(categoryNode);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: true });
            });
          });

          it("return true when model displayed, category displayed and there're no per-model overrides", async () => {
            const parentModelNode = createModelNode();
            const parentModelKey = parentModelNode.__key.instanceKey;
            const categoryNode = createCategoryNode(parentModelKey);
            const key = categoryNode.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory(key.id)).returns(() => true);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel(parentModelKey.id)).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(categoryNode);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: true });
            });
          });

          it("return false when model displayed, category displayed but per-model override says it's not displayed", async () => {
            const parentModelNode = createModelNode();
            const parentModelKey = parentModelNode.__key.instanceKey;
            const categoryNode = createCategoryNode(parentModelKey);
            const categoryKey = categoryNode.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory(categoryKey.id)).returns(() => true);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel(parentModelKey.id)).returns(() => true);

            const perModelCategoryVisibilityMock = moq.Mock.ofType<PerModelCategoryVisibility.Overrides>();
            perModelCategoryVisibilityMock.setup((x) => x.getOverride(parentModelKey.id, categoryKey.id)).returns(() => PerModelCategoryVisibility.Override.Hide);

            const vpMock = mockViewport({ viewState: viewStateMock.object, perModelCategoryVisibility: perModelCategoryVisibilityMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(categoryNode);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false });
            });
          });

          it("return false when model displayed, category not displayed and there're no per-model overrides", async () => {
            const parentModelNode = createModelNode();
            const parentModelKey = parentModelNode.__key.instanceKey;
            const categoryNode = createCategoryNode(parentModelKey);
            const key = categoryNode.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory(key.id)).returns(() => false);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel(parentModelKey.id)).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(categoryNode);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false });
            });
          });

          it("return false when category has no parent model and category is not displayed", async () => {
            const categoryNode = createCategoryNode();
            const categoryKey = categoryNode.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory(categoryKey.id)).returns(() => false);

            const vpMock = mockViewport({ viewState: viewStateMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(categoryNode);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false });
            });
          });

        });

        describe("element", () => {

          it("returns disabled when modelId not set", async () => {
            const node = createElementNode(undefined, "0x1");

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel(moq.It.isAny())).returns(() => true);
            const vpMock = mockViewport({ viewState: viewStateMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false, isDisabled: true });
            });
          });

          it("returns disabled when model not displayed", async () => {
            const node = createElementNode("0x2", "0x1");

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x2")).returns(() => false);
            const vpMock = mockViewport({ viewState: viewStateMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false, isDisabled: true });
            });
          });

          it("returns false when model displayed, category displayed, but element is in never displayed list", async () => {
            const node = createElementNode("0x2", "0x1");
            const key = node.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x1")).returns(() => true);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x2")).returns(() => true);
            const vpMock = mockViewport({ viewState: viewStateMock.object });
            const neverDrawn = new Set([key.id]);
            vpMock.setup((x) => x.neverDrawn).returns(() => neverDrawn);
            vpMock.setup((x) => x.alwaysDrawn).returns(() => undefined);

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false });
            });
          });

          it("returns true when model displayed and element is in always displayed list", async () => {
            const node = createElementNode("0x2", "0x1");
            const key = node.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x1")).returns(() => false);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x2")).returns(() => true);
            const vpMock = mockViewport({ viewState: viewStateMock.object });
            const alwaysDrawn = new Set([key.id]);
            vpMock.setup((x) => x.neverDrawn).returns(() => undefined);
            vpMock.setup((x) => x.alwaysDrawn).returns(() => alwaysDrawn);

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: true });
            });
          });

          it("returns true when model displayed, category displayed and element is in neither 'never' nor 'always' displayed", async () => {
            const node = createElementNode("0x2", "0x1");

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x1")).returns(() => true);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x2")).returns(() => true);
            const vpMock = mockViewport({ viewState: viewStateMock.object });
            vpMock.setup((x) => x.alwaysDrawn).returns(() => undefined);
            vpMock.setup((x) => x.neverDrawn).returns(() => undefined);

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: true });
            });
          });

          it("returns false when model displayed, category not displayed and element is in neither 'never' nor 'always' displayed", async () => {
            const node = createElementNode("0x2", "0x1");

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x1")).returns(() => false);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x2")).returns(() => true);
            const vpMock = mockViewport({ viewState: viewStateMock.object });
            vpMock.setup((x) => x.alwaysDrawn).returns(() => undefined);
            vpMock.setup((x) => x.neverDrawn).returns(() => undefined);

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false });
            });
          });

          it("returns false when model displayed, category displayed and some other element is exclusively 'always' displayed", async () => {
            const node = createElementNode("0x2", "0x1");

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x1")).returns(() => true);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x2")).returns(() => true);
            const vpMock = mockViewport({ viewState: viewStateMock.object });
            vpMock.setup((x) => x.isAlwaysDrawnExclusive).returns(() => true);
            vpMock.setup((x) => x.alwaysDrawn).returns(() => new Set([createRandomId()]));
            vpMock.setup((x) => x.neverDrawn).returns(() => undefined);

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false });
            });
          });

          it("returns false when model displayed, categoryId not set and element is in neither 'never' nor 'always' displayed", async () => {
            const node = createElementNode("0x2", undefined);

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory(moq.It.isAny())).returns(() => true);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x2")).returns(() => true);
            const vpMock = mockViewport({ viewState: viewStateMock.object });
            vpMock.setup((x) => x.alwaysDrawn).returns(() => new Set());
            vpMock.setup((x) => x.neverDrawn).returns(() => new Set());

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              const result = handler.getDisplayStatus(node);
              expect(isPromiseLike(result)).to.be.false;
              expect(result).to.include({ isDisplayed: false });
            });
          });

        });

      });

      describe("changeVisibility", () => {

        it("does nothing when node is not an instance node", async () => {
          const node = {
            __key: {
              type: "custom",
              pathFromRoot: [],
            },
            id: "custom",
            label: "custom",
          };

          const vpMock = mockViewport();
          vpMock.setup((x) => x.addViewedModels(moq.It.isAny())).verifiable(moq.Times.never());

          await using(createHandler({ viewport: vpMock.object }), async (handler) => {
            await handler.changeVisibility(node, true);
            vpMock.verifyAll();
          });
        });

        describe("subject", () => {

          it("does nothing for non-spatial views", async () => {
            const node = createSubjectNode();

            const viewStateMock = moq.Mock.ofType<ViewState>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => false);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            vpMock.setup((x) => x.addViewedModels(moq.It.isAny())).verifiable(moq.Times.never());

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              // note: need to override to avoid running a query on the imodel
              (handler as any).getSubjectModelIds = async () => ["0x1", "0x2"];

              await handler.changeVisibility(node, true);
              vpMock.verifyAll();
            });
          });

          it("makes all subject models visible", async () => {
            const node = createSubjectNode();
            const subjectModelIds = ["0x1", "0x2"];

            const viewStateMock = moq.Mock.ofType<SpatialViewState>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            vpMock.setup((x) => x.addViewedModels(subjectModelIds)).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              // note: need to override to avoid running a query on the imodel
              (handler as any).getSubjectModelIds = async () => subjectModelIds;

              await handler.changeVisibility(node, true);
              vpMock.verifyAll();
            });
          });

          it("makes all subject models hidden", async () => {
            const node = createSubjectNode();
            const subjectModelIds = ["0x1", "0x2"];

            const viewStateMock = moq.Mock.ofType<SpatialViewState>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            vpMock.setup((x) => x.changeModelDisplay(subjectModelIds, false)).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              // note: need to override to avoid running a query on the imodel
              (handler as any).getSubjectModelIds = async () => subjectModelIds;

              await handler.changeVisibility(node, false);
              vpMock.verifyAll();
            });
          });

        });

        describe("model", () => {

          it("does nothing for non-spatial views", async () => {
            const node = createModelNode();

            const viewStateMock = moq.Mock.ofType<ViewState>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => false);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            vpMock.setup((x) => x.addViewedModels(moq.It.isAny())).verifiable(moq.Times.never());

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              await handler.changeVisibility(node, true);
              vpMock.verifyAll();
            });
          });

          it("makes model visible", async () => {
            const node = createModelNode();
            const key = node.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<SpatialViewState>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            vpMock.setup((x) => x.addViewedModels([key.id])).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              await handler.changeVisibility(node, true);
              vpMock.verifyAll();
            });
          });

          it("makes model hidden", async () => {
            const node = createModelNode();
            const key = node.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<SpatialViewState>();
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });
            vpMock.setup((x) => x.changeModelDisplay([key.id], false)).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              await handler.changeVisibility(node, false);
              vpMock.verifyAll();
            });
          });

        });

        describe("category", () => {

          it("makes category visible through per-model override when it's not visible through category selector", async () => {
            const parentModelNode = createModelNode();
            const parentModelKey = parentModelNode.__key.instanceKey;
            const categoryNode = createCategoryNode(parentModelKey);
            const categoryKey = categoryNode.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory(categoryKey.id)).returns(() => false);

            const perModelCategoryVisibilityMock = moq.Mock.ofType<PerModelCategoryVisibility.Overrides>();

            const vpMock = mockViewport({ viewState: viewStateMock.object, perModelCategoryVisibility: perModelCategoryVisibilityMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              await handler.changeVisibility(categoryNode, true);
              perModelCategoryVisibilityMock.verify((x) => x.setOverride(parentModelKey.id, categoryKey.id, PerModelCategoryVisibility.Override.Show), moq.Times.once());
              vpMock.verify((x) => x.changeCategoryDisplay(moq.It.isAny(), moq.It.isAny(), moq.It.isAny()), moq.Times.never());
            });
          });

          it("makes category hidden through override when it's visible through category selector", async () => {
            const parentModelNode = createModelNode();
            const parentModelKey = parentModelNode.__key.instanceKey;
            const categoryNode = createCategoryNode(parentModelKey);
            const categoryKey = categoryNode.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory(categoryKey.id)).returns(() => true);

            const perModelCategoryVisibilityMock = moq.Mock.ofType<PerModelCategoryVisibility.Overrides>();

            const vpMock = mockViewport({ viewState: viewStateMock.object, perModelCategoryVisibility: perModelCategoryVisibilityMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              await handler.changeVisibility(categoryNode, false);
              perModelCategoryVisibilityMock.verify((x) => x.setOverride(parentModelKey.id, categoryKey.id, PerModelCategoryVisibility.Override.Hide), moq.Times.once());
              vpMock.verify((x) => x.changeCategoryDisplay(moq.It.isAny(), moq.It.isAny(), moq.It.isAny()), moq.Times.never());
            });
          });

          it("removes category override and enables all sub-categories when making visible and it's visible through category selector", async () => {
            const parentModelNode = createModelNode();
            const parentModelKey = parentModelNode.__key.instanceKey;
            const categoryNode = createCategoryNode(parentModelKey);
            const categoryKey = categoryNode.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory(categoryKey.id)).returns(() => true);

            const perModelCategoryVisibilityMock = moq.Mock.ofType<PerModelCategoryVisibility.Overrides>();

            const vpMock = mockViewport({ viewState: viewStateMock.object, perModelCategoryVisibility: perModelCategoryVisibilityMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              await handler.changeVisibility(categoryNode, true);
              perModelCategoryVisibilityMock.verify((x) => x.setOverride(parentModelKey.id, categoryKey.id, PerModelCategoryVisibility.Override.None), moq.Times.once());
              vpMock.verify((x) => x.changeCategoryDisplay([categoryKey.id], true, true), moq.Times.once());
            });
          });

          it("removes category override when making hidden and it's hidden through category selector", async () => {
            const parentModelNode = createModelNode();
            const parentModelKey = parentModelNode.__key.instanceKey;
            const categoryNode = createCategoryNode(parentModelKey);
            const categoryKey = categoryNode.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory(categoryKey.id)).returns(() => false);

            const perModelCategoryVisibilityMock = moq.Mock.ofType<PerModelCategoryVisibility.Overrides>();

            const vpMock = mockViewport({ viewState: viewStateMock.object, perModelCategoryVisibility: perModelCategoryVisibilityMock.object });

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              await handler.changeVisibility(categoryNode, false);
              perModelCategoryVisibilityMock.verify((x) => x.setOverride(parentModelKey.id, categoryKey.id, PerModelCategoryVisibility.Override.None), moq.Times.once());
              vpMock.verify((x) => x.changeCategoryDisplay(moq.It.isAny(), moq.It.isAny(), moq.It.isAny()), moq.Times.never());
            });
          });

          it("makes category visible in selector and enables all sub-categories when category has no parent model", async () => {
            const categoryNode = createCategoryNode();
            const categoryKey = categoryNode.__key.instanceKey;

            const vpMock = mockViewport();
            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              await handler.changeVisibility(categoryNode, true);
              vpMock.verify((x) => x.changeCategoryDisplay([categoryKey.id], true, true), moq.Times.once());
            });
          });

          it("makes category hidden in selector when category has no parent model", async () => {
            const categoryNode = createCategoryNode();
            const categoryKey = categoryNode.__key.instanceKey;

            const vpMock = mockViewport();
            vpMock.setup((x) => x.changeCategoryDisplay([categoryKey.id], false)).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              await handler.changeVisibility(categoryNode, false);
              vpMock.verify((x) => x.changeCategoryDisplay([categoryKey.id], false, false), moq.Times.once());
            });
          });

        });

        describe("element", () => {

          it("makes element visible by only removing from never displayed list when element's category is displayed", async () => {
            const node = createElementNode("0x4", "0x3");
            const key = node.__key.instanceKey;
            const assemblyChildrenIds = ["0x1", "0x2"];

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x3")).returns(() => true);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x4")).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });

            const alwaysDisplayed = new Set<string>();
            const neverDisplayed = new Set([key.id]);
            vpMock.setup((x) => x.isAlwaysDrawnExclusive).returns(() => false);
            vpMock.setup((x) => x.alwaysDrawn).returns(() => alwaysDisplayed);
            vpMock.setup((x) => x.neverDrawn).returns(() => neverDisplayed);
            vpMock.setup((x) => x.setNeverDrawn(moq.It.is((set) => (set.size === 0)))).verifiable();
            vpMock.setup((x) => x.setAlwaysDrawn(moq.It.is((set) => (set.size === 0)), false)).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              // note: need to override to avoid running queries on the imodel
              (handler as any).getAssemblyElementIds = async () => assemblyChildrenIds;

              await handler.changeVisibility(node, true);
              vpMock.verifyAll();
            });
          });

          it("makes element visible by removing from never displayed list and adding to always displayed list when category is not displayed", async () => {
            const node = createElementNode("0x4", "0x3");
            const key = node.__key.instanceKey;
            const assemblyChildrenIds = ["0x1", "0x2"];

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x4")).returns(() => false);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x3")).returns(() => false);

            const vpMock = mockViewport({ viewState: viewStateMock.object });

            const alwaysDisplayed = new Set<string>();
            const neverDisplayed = new Set([key.id]);
            vpMock.setup((x) => x.isAlwaysDrawnExclusive).returns(() => false);
            vpMock.setup((x) => x.alwaysDrawn).returns(() => alwaysDisplayed);
            vpMock.setup((x) => x.neverDrawn).returns(() => neverDisplayed);
            vpMock.setup((x) => x.setAlwaysDrawn(moq.It.is((set) => {
              return set.size === 3
                && set.has(key.id)
                && assemblyChildrenIds.reduce<boolean>((result, id) => (result && set.has(id)), true);
            }), false)).verifiable();
            vpMock.setup((x) => x.setNeverDrawn(moq.It.is((set) => (set.size === 0)))).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              // note: need to override to avoid running a query on the imodel
              (handler as any).getAssemblyElementIds = async () => assemblyChildrenIds;

              await handler.changeVisibility(node, true);
              vpMock.verifyAll();
            });
          });

          it("makes element visible by adding to always displayed list when category is displayed, but element is hidden due to other elements exclusively always drawn", async () => {
            const node = createElementNode("0x4", "0x3");
            const key = node.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x4")).returns(() => true);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x3")).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });

            const alwaysDisplayed = new Set<Id64String>([createRandomId()]);
            vpMock.setup((x) => x.isAlwaysDrawnExclusive).returns(() => true);
            vpMock.setup((x) => x.alwaysDrawn).returns(() => alwaysDisplayed);
            vpMock.setup((x) => x.neverDrawn).returns(() => undefined);
            vpMock.setup((x) => x.setAlwaysDrawn(moq.It.is((set) => {
              return set.size === 2 && set.has(key.id);
            }), true)).verifiable();
            vpMock.setup((x) => x.setNeverDrawn(moq.It.is((set) => (set.size === 0)))).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              // note: need to override to avoid running a query on the imodel
              (handler as any).getAssemblyElementIds = async () => [];

              await handler.changeVisibility(node, true);
              vpMock.verifyAll();
            });
          });

          it("makes element hidden by only removing from always displayed list when element's category is not displayed", async () => {
            const node = createElementNode("0x4", "0x3");
            const key = node.__key.instanceKey;
            const assemblyChildrenIds = ["0x1", "0x2"];

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x3")).returns(() => false);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x4")).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });

            const alwaysDisplayed = new Set([key.id]);
            const neverDisplayed = new Set<string>();
            vpMock.setup((x) => x.isAlwaysDrawnExclusive).returns(() => false);
            vpMock.setup((x) => x.alwaysDrawn).returns(() => alwaysDisplayed);
            vpMock.setup((x) => x.neverDrawn).returns(() => neverDisplayed);
            vpMock.setup((x) => x.setNeverDrawn(moq.It.is((set) => (set.size === 0)))).verifiable();
            vpMock.setup((x) => x.setAlwaysDrawn(moq.It.is((set) => (set.size === 0)), false)).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              // note: need to override to avoid running queries on the imodel
              (handler as any).getAssemblyElementIds = async () => assemblyChildrenIds;

              await handler.changeVisibility(node, false);
              vpMock.verifyAll();
            });
          });

          it("makes element hidden by removing from always displayed list and adding to never displayed list when category is displayed", async () => {
            const node = createElementNode("0x4", "0x3");
            const key = node.__key.instanceKey;
            const assemblyChildrenIds = ["0x1", "0x2"];

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x3")).returns(() => true);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x4")).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });

            const alwaysDisplayed = new Set([key.id]);
            const neverDisplayed = new Set<string>();
            vpMock.setup((x) => x.isAlwaysDrawnExclusive).returns(() => false);
            vpMock.setup((x) => x.alwaysDrawn).returns(() => alwaysDisplayed);
            vpMock.setup((x) => x.neverDrawn).returns(() => neverDisplayed);
            vpMock.setup((x) => x.setAlwaysDrawn(moq.It.is((set) => (set.size === 0)), false)).verifiable();
            vpMock.setup((x) => x.setNeverDrawn(moq.It.is((set) => {
              return set.size === 3
                && set.has(key.id)
                && assemblyChildrenIds.reduce<boolean>((result, id) => (result && set.has(id)), true);
            }))).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              // note: need to override to avoid running a query on the imodel
              (handler as any).getAssemblyElementIds = async () => assemblyChildrenIds;

              await handler.changeVisibility(node, false);
              vpMock.verifyAll();
            });
          });

          it("makes element hidden by removing from always displayed list when category is displayed and there are exclusively always drawn elements", async () => {
            const node = createElementNode("0x4", "0x3");
            const key = node.__key.instanceKey;

            const viewStateMock = moq.Mock.ofType<ViewState3d>();
            viewStateMock.setup((x) => x.viewsCategory("0x3")).returns(() => true);
            viewStateMock.setup((x) => x.isSpatialView()).returns(() => true);
            viewStateMock.setup((x) => x.viewsModel("0x4")).returns(() => true);

            const vpMock = mockViewport({ viewState: viewStateMock.object });

            const alwaysDisplayed = new Set([key.id, createRandomId()]);
            vpMock.setup((x) => x.isAlwaysDrawnExclusive).returns(() => true);
            vpMock.setup((x) => x.alwaysDrawn).returns(() => alwaysDisplayed);
            vpMock.setup((x) => x.neverDrawn).returns(() => undefined);
            vpMock.setup((x) => x.setAlwaysDrawn(moq.It.is((set) => (set.size === 1 && !set.has(key.id))), true)).verifiable();
            vpMock.setup((x) => x.setNeverDrawn(moq.It.is((set) => (set.size === 0)))).verifiable();

            await using(createHandler({ viewport: vpMock.object }), async (handler) => {
              // note: need to override to avoid running a query on the imodel
              (handler as any).getAssemblyElementIds = async () => [];

              await handler.changeVisibility(node, false);
              vpMock.verifyAll();
            });
          });

        });

      });

      describe("visibility change callback", () => {

        it("calls the callback on `onAlwaysDrawnChanged` event", async () => {
          const evt = new BeEvent();
          const vpMock = mockViewport({ onAlwaysDrawnChanged: evt });
          const spy = sinon.spy();
          await using(createHandler({ viewport: vpMock.object, onVisibilityChange: spy }), async (_) => {
            evt.raiseEvent(vpMock.object);
            await new Promise((resolve) => setTimeout(resolve));
            expect(spy).to.be.calledOnce;
          });
        });

        it("calls the callback on `onNeverDrawnChanged` event", async () => {
          const evt = new BeEvent();
          const vpMock = mockViewport({ onNeverDrawnChanged: evt });
          const spy = sinon.spy();
          await using(createHandler({ viewport: vpMock.object, onVisibilityChange: spy }), async (_) => {
            evt.raiseEvent(vpMock.object);
            await new Promise((resolve) => setTimeout(resolve));
            expect(spy).to.be.calledOnce;
          });
        });

        it("calls the callback on `onViewedCategoriesChanged` event", async () => {
          const evt = new BeEvent();
          const vpMock = mockViewport({ onViewedCategoriesChanged: evt });
          const spy = sinon.spy();
          await using(createHandler({ viewport: vpMock.object, onVisibilityChange: spy }), async (_) => {
            evt.raiseEvent(vpMock.object);
            await new Promise((resolve) => setTimeout(resolve));
            expect(spy).to.be.calledOnce;
          });
        });

        it("calls the callback on `onViewedModelsChanged` event", async () => {
          const evt = new BeEvent();
          const vpMock = mockViewport({ onViewedModelsChanged: evt });
          const spy = sinon.spy();
          await using(createHandler({ viewport: vpMock.object, onVisibilityChange: spy }), async (_) => {
            evt.raiseEvent(vpMock.object);
            await new Promise((resolve) => setTimeout(resolve));
            expect(spy).to.be.calledOnce;
          });
        });

        it("calls the callback on `onViewedCategoriesPerModelChanged` event", async () => {
          const evt = new BeEvent();
          const vpMock = mockViewport({ onViewedCategoriesPerModelChanged: evt });
          const spy = sinon.spy();
          await using(createHandler({ viewport: vpMock.object, onVisibilityChange: spy }), async (_) => {
            evt.raiseEvent(vpMock.object);
            await new Promise((resolve) => setTimeout(resolve));
            expect(spy).to.be.calledOnce;
          });
        });

        it("calls the callback once when multiple affecting events are fired", async () => {
          const evts = {
            onViewedCategoriesPerModelChanged: new BeEvent<(vp: Viewport) => void>(),
            onViewedCategoriesChanged: new BeEvent<(vp: Viewport) => void>(),
            onViewedModelsChanged: new BeEvent<(vp: Viewport) => void>(),
            onAlwaysDrawnChanged: new BeEvent<() => void>(),
            onNeverDrawnChanged: new BeEvent<() => void>(),
          };
          const vpMock = mockViewport({ ...evts });
          const spy = sinon.spy();
          await using(createHandler({ viewport: vpMock.object, onVisibilityChange: spy }), async (_) => {
            evts.onViewedCategoriesPerModelChanged.raiseEvent(vpMock.object);
            evts.onViewedCategoriesChanged.raiseEvent(vpMock.object);
            evts.onViewedModelsChanged.raiseEvent(vpMock.object);
            evts.onAlwaysDrawnChanged.raiseEvent();
            evts.onNeverDrawnChanged.raiseEvent();
            await new Promise((resolve) => setTimeout(resolve));
            expect(spy).to.be.calledOnce;
          });
        });

      });

    });

  });

  describe("#integration", () => {

    let imodel: IModelConnection;
    const testIModelPath = "src/test/test-data/JoesHouse.bim";

    before(() => {
      initializePresentationTesting();
    });

    after(() => {
      terminatePresentationTesting();
    });

    beforeEach(async () => {
      imodel = await IModelConnection.openSnapshot(testIModelPath);
    });

    afterEach(async () => {
      await imodel.closeSnapshot();
    });

    it("shows correct hierarchy", async () => {
      const hierarchyBuilder = new HierarchyBuilder(imodel);
      const hierarchy = await hierarchyBuilder.createHierarchy(VisibilityTree.RULESET);
      expect(hierarchy).to.matchSnapshot();
    });

    it("renders component with real data and no active viewport", async () => {
      const result = render(<VisibilityTree imodel={imodel} />);
      await waitForElement(() => result.getByText("Joe's house.bim"), { timeout: 60 * 1000 });
      expect(result.container).to.matchSnapshot();
    });

  });

});
