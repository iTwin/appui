/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import sinon from "sinon";
import * as moq from "typemoq";
import * as React from "react";
import { renderHook } from "@testing-library/react-hooks";
import type {
  TreeEventHandler,
  TreeEventHandlerParams,
} from "../../../components-react/tree/controlled/TreeEventHandler";
import {
  usePagedTreeNodeLoader,
  useTreeEventsHandler,
  useTreeModel,
  useTreeModelSource,
  useTreeNodeLoader,
} from "../../../components-react/tree/controlled/TreeHooks";
import type { TreeModelNodeInput } from "../../../components-react/tree/controlled/TreeModel";
import { MutableTreeModel } from "../../../components-react/tree/controlled/TreeModel";
import { TreeModelSource } from "../../../components-react/tree/controlled/TreeModelSource";
import type { ITreeNodeLoader } from "../../../components-react/tree/controlled/TreeNodeLoader";
import type {
  TreeDataProvider,
  TreeDataProviderRaw,
} from "../../../components-react/tree/TreeDataProvider";
import type { PrimitiveValue } from "@itwin/appui-abstract";
import { PropertyRecord } from "@itwin/appui-abstract";
import { render, waitFor } from "@testing-library/react";
import TestUtils from "../../TestUtils";

describe("useTreeModel", () => {
  beforeEach(() => {});

  it("subscribes to onModelChange event and returns visible nodes", () => {
    const modelSource = new TreeModelSource();
    const spy = sinon.spy(modelSource.onModelChanged, "addListener");
    const { result } = renderHook(
      (props: { modelSource: TreeModelSource }) =>
        useTreeModel(props.modelSource),
      { initialProps: { modelSource } }
    );
    expect(result.current).to.eq(modelSource.getModel());
    expect(spy).to.have.been.calledOnce;
  });

  it("resubscribes to onModelChangeEvent when model source changes", () => {
    const modelSource = new TreeModelSource();
    const firstModelEventAddSpy = sinon.spy(
      modelSource.onModelChanged,
      "addListener"
    );
    const firstModelEventRemoveSpy = sinon.spy(
      modelSource.onModelChanged,
      "removeListener"
    );
    const { result, rerender } = renderHook(
      (props: { modelSource: TreeModelSource }) =>
        useTreeModel(props.modelSource),
      { initialProps: { modelSource } }
    );
    expect(result.current).to.eq(modelSource.getModel());
    expect(firstModelEventAddSpy).to.have.been.calledOnce;

    const newModelSource = new TreeModelSource();
    const newModelEventAddSpy = sinon.spy(
      newModelSource.onModelChanged,
      "addListener"
    );

    rerender({ modelSource: newModelSource });
    expect(result.current).to.eq(newModelSource.getModel());
    expect(firstModelEventRemoveSpy).to.have.been.calledOnce;
    expect(newModelEventAddSpy).to.have.been.calledOnce;
  });

  describe("handles tree model modifications", async () => {
    function createNodeInput(label: string): TreeModelNodeInput {
      const labelRecord = PropertyRecord.fromString(label);
      return {
        id: "root",
        isExpanded: false,
        isLoading: false,
        isSelected: false,
        item: {
          id: "root",
          label: labelRecord,
        },
        label: labelRecord,
      };
    }

    function TestComponent({ modelSource }: { modelSource: TreeModelSource }) {
      React.useEffect(() => {
        // simulate some additional changes to tree model
        modelSource.modifyModel((model) => {
          const modelNode = model.getNode("root");
          if (!modelNode) {
            return;
          }
          modelNode.label = PropertyRecord.fromString(
            `${(modelNode.label.value as PrimitiveValue).displayValue}-Updated`
          );
        });
      }, [modelSource]);

      const treeModel = useTreeModel(modelSource);

      return (
        <div>
          {
            (treeModel.getNode("root")?.label.value as PrimitiveValue)
              .displayValue
          }
        </div>
      );
    }

    before(async () => {
      await TestUtils.initializeUiComponents();
    });

    after(() => {
      TestUtils.terminateUiComponents();
    });

    it("until subscription to `onModelChangedEvent`", async () => {
      const newModel = new MutableTreeModel();
      newModel.setChildren(undefined, [createNodeInput("InitialNode")], 0);
      const testModelSource = new TreeModelSource(newModel);
      const { getByText } = render(
        <TestComponent modelSource={testModelSource} />
      );

      await waitFor(() => getByText("InitialNode-Updated"));
    });
  });
});

describe("useTreeNodeLoader", () => {
  const dataProviderMock: TreeDataProviderRaw = [];
  const modelSourceMock = moq.Mock.ofType<TreeModelSource>();

  it("creates NodeLoader", () => {
    const { result } = renderHook(
      (props: {
        dataProvider: TreeDataProvider;
        modelSource: TreeModelSource;
      }) => useTreeNodeLoader(props.dataProvider, props.modelSource),
      {
        initialProps: {
          dataProvider: dataProviderMock,
          modelSource: modelSourceMock.object,
        },
      }
    );

    expect(result.current).to.not.be.undefined;
  });

  it("returns same NodeLoader if data provider does not changes", () => {
    const { result, rerender } = renderHook(
      (props: {
        dataProvider: TreeDataProvider;
        modelSource: TreeModelSource;
      }) => useTreeNodeLoader(props.dataProvider, props.modelSource),
      {
        initialProps: {
          dataProvider: dataProviderMock,
          modelSource: modelSourceMock.object,
        },
      }
    );
    const nodeLoader = result.current;
    rerender({
      dataProvider: dataProviderMock,
      modelSource: modelSourceMock.object,
    });

    expect(result.current).to.be.eq(nodeLoader);
  });

  it("creates new NodeLoader when data provider changes", () => {
    const { result, rerender } = renderHook(
      (props: {
        dataProvider: TreeDataProvider;
        modelSource: TreeModelSource;
      }) => useTreeNodeLoader(props.dataProvider, props.modelSource),
      {
        initialProps: {
          dataProvider: dataProviderMock,
          modelSource: modelSourceMock.object,
        },
      }
    );

    const firstNodeLoader = result.current;
    const newDataProviderMock: TreeDataProviderRaw = [];
    rerender({
      dataProvider: newDataProviderMock,
      modelSource: modelSourceMock.object,
    });

    expect(result.current).to.not.be.deep.eq(firstNodeLoader);
  });
});

describe("usePagedTreeNodeLoader", () => {
  const dataProviderMock: TreeDataProviderRaw = [];
  const modelSourceMock = moq.Mock.ofType<TreeModelSource>();

  it("creates PagedNodeLoader", () => {
    const { result } = renderHook(
      (props: {
        dataProvider: TreeDataProvider;
        modelSource: TreeModelSource;
        pageSize: number;
      }) =>
        usePagedTreeNodeLoader(
          props.dataProvider,
          props.pageSize,
          props.modelSource
        ),
      {
        initialProps: {
          dataProvider: dataProviderMock,
          pageSize: 10,
          modelSource: modelSourceMock.object,
        },
      }
    );

    expect(result.current).to.not.be.undefined;
  });

  it("returns same PagedNodeLoader if dependencies do not changes", () => {
    const { result, rerender } = renderHook(
      (props: {
        dataProvider: TreeDataProvider;
        modelSource: TreeModelSource;
        pageSize: number;
      }) =>
        usePagedTreeNodeLoader(
          props.dataProvider,
          props.pageSize,
          props.modelSource
        ),
      {
        initialProps: {
          dataProvider: dataProviderMock,
          pageSize: 10,
          modelSource: modelSourceMock.object,
        },
      }
    );
    const nodeLoader = result.current;
    rerender({
      dataProvider: dataProviderMock,
      pageSize: 10,
      modelSource: modelSourceMock.object,
    });

    expect(result.current).to.be.eq(nodeLoader);
  });

  it("creates new PagedNodeLoader when data provider changes", () => {
    const { result, rerender } = renderHook(
      (props: {
        dataProvider: TreeDataProvider;
        modelSource: TreeModelSource;
        pageSize: number;
      }) =>
        usePagedTreeNodeLoader(
          props.dataProvider,
          props.pageSize,
          props.modelSource
        ),
      {
        initialProps: {
          dataProvider: dataProviderMock,
          pageSize: 10,
          modelSource: modelSourceMock.object,
        },
      }
    );

    const firstNodeLoader = result.current;
    const newDataProviderMock: TreeDataProviderRaw = [];
    rerender({
      dataProvider: newDataProviderMock,
      pageSize: 10,
      modelSource: modelSourceMock.object,
    });

    expect(result.current).to.not.be.deep.eq(firstNodeLoader);
  });

  it("creates new PagedNodeLoader when page size changes", () => {
    const { result, rerender } = renderHook(
      (props: {
        dataProvider: TreeDataProvider;
        modelSource: TreeModelSource;
        pageSize: number;
      }) =>
        usePagedTreeNodeLoader(
          props.dataProvider,
          props.pageSize,
          props.modelSource
        ),
      {
        initialProps: {
          dataProvider: dataProviderMock,
          pageSize: 10,
          modelSource: modelSourceMock.object,
        },
      }
    );

    const firstNodeLoader = result.current;
    rerender({
      dataProvider: dataProviderMock,
      pageSize: 20,
      modelSource: modelSourceMock.object,
    });

    expect(result.current).to.not.be.deep.eq(firstNodeLoader);
  });
});

describe("useTreeModelSource", () => {
  const dataProviderMock: TreeDataProviderRaw = [];

  it("creates model source", () => {
    const { result } = renderHook(
      (props: { dataProvider: TreeDataProvider }) =>
        useTreeModelSource(props.dataProvider),
      { initialProps: { dataProvider: dataProviderMock } }
    );

    expect(result.current).to.not.be.undefined;
  });
});

describe("useTreeEventsHandler", () => {
  it("creates and disposes events handler using factory function", () => {
    const disposeSpy = sinon.spy();
    const handler = { dispose: disposeSpy };
    const factory = sinon.mock().returns(handler);
    const { result, unmount } = renderHook(
      (props: { factory: () => TreeEventHandler }) =>
        useTreeEventsHandler(props.factory),
      { initialProps: { factory } }
    );
    expect(factory).to.be.calledOnce;
    expect(result.current).to.eq(handler);
    expect(disposeSpy).to.not.be.called;
    unmount();
    expect(disposeSpy).to.be.calledOnce;
  });

  it("creates and disposes events handler using event handler params", () => {
    const nodeLoaderMock = moq.Mock.ofType<ITreeNodeLoader>();
    const modelSourceMock = moq.Mock.ofType<TreeModelSource>();
    const { result, unmount } = renderHook(
      (props: { params: TreeEventHandlerParams }) =>
        useTreeEventsHandler(props.params),
      {
        initialProps: {
          params: {
            nodeLoader: nodeLoaderMock.object,
            modelSource: modelSourceMock.object,
          },
        },
      }
    );
    expect(result.current).to.not.be.undefined;
    const disposeSpy = sinon.spy(result.current, "dispose");
    expect(disposeSpy).to.not.be.called;
    unmount();
    expect(disposeSpy).to.be.calledOnce;
  });
});
