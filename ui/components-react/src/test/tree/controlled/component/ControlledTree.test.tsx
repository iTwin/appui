/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import { VariableSizeList } from "react-window";
import sinon from "sinon";
import * as moq from "typemoq";
import { PropertyRecord } from "@itwin/appui-abstract";
import { CheckBoxState } from "@itwin/core-react";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { SelectionMode } from "../../../../components-react/common/selection/SelectionModes";
import type { ControlledTreeProps } from "../../../../components-react/tree/controlled/component/ControlledTree";
import {
  ControlledTree,
  useControlledTreeLayoutStorage,
} from "../../../../components-react/tree/controlled/component/ControlledTree";
import { from } from "../../../../components-react/tree/controlled/Observable";
import type { TreeEvents } from "../../../../components-react/tree/controlled/TreeEvents";
import type {
  MutableTreeModelNode,
  TreeModel,
} from "../../../../components-react/tree/controlled/TreeModel";
import type { ITreeNodeLoader } from "../../../../components-react/tree/controlled/TreeNodeLoader";
import type { HighlightableTreeProps } from "../../../../components-react/tree/HighlightingEngine";
import { HighlightingEngine } from "../../../../components-react/tree/HighlightingEngine";
import TestUtils from "../../../TestUtils";
import { SparseArray } from "../../../../components-react/tree/controlled/internal/SparseTree";
import * as useElementsScrollStorageModule from "../../../../components-react/common/UseElementsScrollStorage";

describe("ControlledTree", () => {
  const nodeLoaderMock = moq.Mock.ofType<ITreeNodeLoader>();
  const treeModelMock = moq.Mock.ofType<TreeModel>();
  const defaultProps: ControlledTreeProps = {
    model: treeModelMock.object,
    nodeLoader: nodeLoaderMock.object,
    eventsHandler: {} as TreeEvents,
    selectionMode: SelectionMode.Single,
    width: 200,
    height: 200,
  };
  let node: MutableTreeModelNode;

  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  after(() => {
    TestUtils.terminateUiComponents();
  });

  beforeEach(() => {
    treeModelMock.reset();
    nodeLoaderMock.reset();

    node = {
      id: "0",
      label: PropertyRecord.fromString("label", "label"),
      checkbox: {
        isVisible: false,
        state: CheckBoxState.Off,
        isDisabled: false,
      },
      depth: 0,
      description: "Test Node Description",
      isExpanded: false,
      isLoading: false,
      numChildren: undefined,
      isSelected: false,
      parentId: undefined,
      item: {
        id: "0",
        label: PropertyRecord.fromString("label", "label"),
        description: "Test Node Description",
      },
    };

    nodeLoaderMock
      .setup((x) => x.loadNode(moq.It.isAny(), moq.It.isAny()))
      .returns(() => from([]));
  });

  const mockVisibleNode = () => {
    treeModelMock.reset();

    const nodes = new SparseArray<string>();
    nodes.setLength(1);
    nodes.set(0, node.id);

    treeModelMock
      .setup((x) => x.getRootNode())
      .returns(() => ({ id: undefined, depth: -1, numChildren: 1 }));
    treeModelMock
      .setup((x) => x.getChildren(undefined))
      .mockReturnValue(() => nodes);
    treeModelMock.setup((x) => x.getNode(node.id)).mockReturnValue(() => node);
    treeModelMock
      .setup((x) => x.getChildOffset(undefined, node.id))
      .returns(() => 0);
    treeModelMock
      .setup((x) => x.iterateTreeModelNodes(undefined))
      .returns([node][Symbol.iterator]);
  };

  it("renders loading spinner if root nodes are not loaded", () => {
    treeModelMock
      .setup((x) => x.getRootNode())
      .returns(() => ({ id: undefined, depth: -1, numChildren: undefined }));

    const { container } = render(<ControlledTree {...defaultProps} />);

    const message = container.querySelector(
      ".components-controlledTree-loader"
    );
    expect(message).to.not.be.null;
  });

  it("renders no data message if there are no nodes", () => {
    treeModelMock
      .setup((x) => x.getRootNode())
      .returns(() => ({ id: undefined, depth: -1, numChildren: 0 }));

    const { container } = render(<ControlledTree {...defaultProps} />);

    const message = container.querySelector(
      ".components-controlledTree-errorMessage"
    );
    expect(message).to.not.be.null;
  });

  it("renders tree with loaded root nodes", () => {
    mockVisibleNode();

    const { container } = render(<ControlledTree {...defaultProps} />);

    const tree = container.querySelector(".components-controlledTree");
    expect(tree).to.not.be.null;
  });

  it("renders node with description", () => {
    mockVisibleNode();

    const { getByText } = render(
      <ControlledTree {...defaultProps} descriptionsEnabled={true} />
    );

    getByText("Test Node Description");
  });

  it("renders node with icon", () => {
    mockVisibleNode();
    node.item.icon = "test-icon";

    const { container } = render(
      <ControlledTree {...defaultProps} iconsEnabled={true} />
    );

    const iconNode = container.querySelector(".test-icon");
    expect(iconNode).to.not.be.undefined;
  });

  it("renders highlighted node", () => {
    mockVisibleNode();
    const highlightProps: HighlightableTreeProps = {
      searchText: "label",
      activeMatch: {
        nodeId: node.id,
        matchIndex: 0,
      },
    };

    const verticalScrollSpy = sinon.spy();
    sinon.replace(
      VariableSizeList.prototype,
      "scrollToItem",
      verticalScrollSpy
    );

    const { container } = render(
      <ControlledTree
        {...defaultProps}
        descriptionsEnabled={true}
        nodeHighlightingProps={highlightProps}
      />
    );

    const tree = container.querySelector(
      `.${HighlightingEngine.ACTIVE_CLASS_NAME}`
    );
    expect(tree).to.not.be.null;
  });

  it("uses provided tree renderer", () => {
    mockVisibleNode();

    const treeRenderer = () => <div />;
    const spy = sinon.spy(treeRenderer);

    render(<ControlledTree {...defaultProps} treeRenderer={spy} />);

    expect(spy).toHaveBeenCalled();
  });

  it("uses provided spinner renderer", () => {
    treeModelMock
      .setup((x) => x.getRootNode())
      .returns(() => ({ id: undefined, depth: -1, numChildren: undefined }));

    const spinnerRenderer = () => <div />;
    const spy = sinon.spy(spinnerRenderer);

    render(<ControlledTree {...defaultProps} spinnerRenderer={spy} />);

    expect(spy).toHaveBeenCalled();
  });

  it("uses provided no data renderer", () => {
    treeModelMock
      .setup((x) => x.getRootNode())
      .returns(() => ({ id: undefined, depth: -1, numChildren: 0 }));

    const noDataRenderer = () => <div />;
    const spy = sinon.spy(noDataRenderer);

    render(<ControlledTree {...defaultProps} noDataRenderer={spy} />);

    expect(spy).toHaveBeenCalled();
  });

  it("selects node", async () => {
    const user = userEvent.setup();
    mockVisibleNode();
    const treeEvents = {
      onSelectionReplaced: sinon.fake<
        Parameters<Required<TreeEvents>["onSelectionReplaced"]>,
        ReturnType<Required<TreeEvents>["onSelectionReplaced"]>
      >(),
    };
    const { getByRole } = render(
      <ControlledTree {...defaultProps} eventsHandler={treeEvents} />
    );

    const treeNode = getByRole("treeitem");
    await user.click(treeNode);

    expect(treeEvents.onSelectionReplaced).toHaveBeenCalled();
  });
});

describe("useControlledTreeTransientState", () => {
  it("invokes `useElementScrollStorage`", () => {
    const stub = sinon.stub(
      useElementsScrollStorageModule,
      "useElementsScrollStorage"
    );
    renderHook(() => useControlledTreeLayoutStorage());

    expect(stub).to.be.calledWith("ReactWindow__VariableSizeList");
  });
});
