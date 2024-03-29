/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  Point3d,
  Range3d,
  Vector3d,
  YawPitchRollAngles,
} from "@itwin/core-geometry";
import type {
  CategorySelectorProps,
  DisplayStyleProps,
  HydrateViewStateResponseProps,
  ModelSelectorProps,
  SheetProps,
  SpatialViewDefinitionProps,
  ViewStateProps,
} from "@itwin/core-common";
import { EcefLocation, IModelReadRpcInterface } from "@itwin/core-common";
import type { ScreenViewport, ViewState } from "@itwin/core-frontend";
import {
  DrawingViewState,
  EmphasizeElements,
  IModelApp,
  IModelConnection,
  NoRenderApp,
  SheetViewState,
  SpatialViewState,
  SubCategoriesCache,
} from "@itwin/core-frontend";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import * as React from "react";
import * as moq from "typemoq";
import type {
  ConfigurableCreateInfo,
  ContentProps,
  FrontstageConfig,
  StageContentLayoutProps,
} from "../../appui-react";
import {
  ContentGroup,
  ContentLayoutDef,
  FrontstageProvider,
  StageContentLayout,
  UiFramework,
  ViewportContentControl,
} from "../../appui-react";
import { ViewUtilities } from "../../appui-react/utils/ViewUtilities";
import TestUtils from "../TestUtils";

describe("StageContentLayout", () => {
  const extents = Vector3d.create(400, 400);
  const origin = Point3d.createZero();
  const delta = Point3d.createZero();

  const imodelMock = moq.Mock.ofType<IModelConnection>();
  const viewsMock = moq.Mock.ofType<IModelConnection.Views>();
  const rpcMock = moq.Mock.ofType<IModelReadRpcInterface>();

  imodelMock.setup((x) => x.views).mockReturnValue(() => viewsMock.object);
  imodelMock
    .setup((x) => x.subcategories)
    .returns(() => new SubCategoriesCache(imodelMock.object));
  imodelMock
    .setup((x) => x.models)
    .returns(() => new IModelConnection.Models(imodelMock.object));
  imodelMock
    .setup((x) => x.ecefLocation)
    .returns(
      () =>
        new EcefLocation({
          origin: Point3d.createZero(),
          orientation: YawPitchRollAngles.createRadians(0, 0, 0),
        })
    );
  imodelMock
    .setup((x) => x.projectExtents)
    .returns(() => Range3d.create(Point3d.createZero()));

  rpcMock
    .setup(async (x) => x.hydrateViewState(moq.It.isAny(), moq.It.isAny()))
    .returns(async () => ({} as HydrateViewStateResponseProps));

  const viewDefinitionProps1: SpatialViewDefinitionProps = {
    cameraOn: false,
    origin,
    extents,
    camera: { lens: 0, focusDist: 1, eye: [0, 0, 0] },
    classFullName: "Bis:SpatialViewDefinition",
    id: "id1",
    modelSelectorId: "id1",
    categorySelectorId: "id1",
    displayStyleId: "id1",
    model: "model",
    code: { spec: "spec", scope: "scope" },
  };

  const viewDefinitionProps2 = {
    cameraOn: false,
    origin,
    extents,
    camera: { lens: 0, focusDist: 1, eye: [0, 0, 0] },
    classFullName: "Bis:DrawingViewDefinition",
    id: "id1",
    categorySelectorId: "id1",
    displayStyleId: "id1",
    model: "model",
    code: { spec: "spec", scope: "scope" },
    baseModelId: "model",
    delta,
    angle: 0,
  };

  const viewDefinitionProps3 = {
    cameraOn: false,
    origin,
    extents,
    camera: { lens: 0, focusDist: 1, eye: [0, 0, 0] },
    classFullName: "Bis:SheetViewDefinition",
    id: "id1",
    categorySelectorId: "id1",
    displayStyleId: "id1",
    model: "model",
    code: { spec: "spec", scope: "scope" },
    baseModelId: "model",
    delta,
    angle: 0,
  };

  const categorySelectorProps: CategorySelectorProps = {
    categories: ["category1"],
    model: "model",
    code: { spec: "spec", scope: "scope" },
    classFullName: "schema:classname",
  };

  const modelSelectorProps: ModelSelectorProps = {
    models: ["model1"],
    model: "model",
    code: { spec: "spec", scope: "scope" },
    classFullName: "schema:classname",
  };

  const displayStyleProps: DisplayStyleProps = {
    model: "model",
    code: { spec: "spec", scope: "scope" },
    classFullName: "schema:classname",
  };

  const sheetProps: SheetProps = {
    model: "model",
    code: { spec: "spec", scope: "scope" },
    classFullName: "schema:classname",
    width: 100,
    height: 100,
  };

  const viewStateProps1: ViewStateProps = {
    viewDefinitionProps: viewDefinitionProps1,
    categorySelectorProps,
    modelSelectorProps,
    displayStyleProps,
  };

  const viewStateProps2: ViewStateProps = {
    viewDefinitionProps: viewDefinitionProps2,
    categorySelectorProps,
    modelSelectorProps,
    displayStyleProps,
  };

  const viewStateProps3: ViewStateProps = {
    viewDefinitionProps: viewDefinitionProps3,
    categorySelectorProps,
    modelSelectorProps,
    displayStyleProps,
    sheetProps,
    sheetAttachments: [],
  };

  let viewState: ViewState;

  viewsMock
    .setup((x) => x.load)
    .returns(() => async (_viewId: string) => viewState);

  const viewportMock = moq.Mock.ofType<ScreenViewport>();

  beforeEach(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();

    // Required for StageContentLayout
    UiFramework.controls.register("TestViewport", TestViewportContentControl);
  });

  beforeEach(async () => {
    vi.spyOn(IModelReadRpcInterface, "getClientForRouting").returns(
      rpcMock.object
    );
  });

  afterEach(async () => {
    await IModelApp.shutdown();
    sinon.restore();
    TestUtils.terminateUiFramework();
  });

  class TestViewportContentControl extends ViewportContentControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactNode = <div />;

      this.viewport = viewportMock.object;
    }
  }
  class Frontstage1 extends FrontstageProvider {
    public static stageId = "Test1";
    public override get id(): string {
      return Frontstage1.stageId;
    }

    public contentLayoutDef = new ContentLayoutDef({
      id: "SingleContent",
      description: "App:ContentLayoutDef.SingleContent",
    });

    public override frontstageConfig(): FrontstageConfig {
      const contentGroup = new ContentGroup({
        id: "MyContentGroup",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "TestViewport",
            classId: TestViewportContentControl,
            applicationData: { label: "Content 1a", bgColor: "black" },
          },
        ],
      });

      return {
        id: this.id,
        version: 1,
        contentGroup,
        viewNavigation: {
          id: "viewNavigation",
          content: <>NavigationWidget</>,
        },
      };
    }
  }

  beforeEach(async () => {
    UiFramework.frontstages.clearFrontstageProviders();

    viewportMock.reset();
    viewportMock.setup((x) => x.view).mockReturnValue(() => viewState);
  });

  it("should create and parse Spatial saved view layout", async () => {
    const vs = SpatialViewState.createFromProps(
      viewStateProps1,
      imodelMock.object
    );
    imodelMock
      .setup(async (x) => x.findClassFor(moq.It.isAny(), moq.It.isAny()))
      .returns(async () => Promise.resolve<any>(SpatialViewState));

    if (vs) viewState = vs;
    else throw Error("Couldn't create ViewState");

    let serializedSavedViewLayoutProps = "";

    const frontstageProvider = new Frontstage1();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      Frontstage1.stageId
    );
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

    if (frontstageDef) {
      if (
        UiFramework.content.layouts.activeLayout &&
        UiFramework.content.layouts.activeContentGroup
      ) {
        const savedViewLayoutProps = StageContentLayout.viewLayoutToProps(
          UiFramework.content.layouts.activeLayout,
          UiFramework.content.layouts.activeContentGroup
        );
        const serialized = JSON.stringify(savedViewLayoutProps);

        serializedSavedViewLayoutProps = serialized;
      }
    }

    const iModelConnection = imodelMock.object;
    if (serializedSavedViewLayoutProps && iModelConnection) {
      // Parse StageContentLayoutProps
      const savedViewLayoutProps: StageContentLayoutProps = JSON.parse(
        serializedSavedViewLayoutProps
      );
      // Create ContentLayoutDef
      const contentLayoutDef = new ContentLayoutDef(
        savedViewLayoutProps.contentLayoutProps ??
          savedViewLayoutProps.contentGroupProps.layout
      );
      // Create ViewStates
      const viewStates = await StageContentLayout.viewStatesFromProps(
        iModelConnection,
        savedViewLayoutProps
      );

      expect(contentLayoutDef.description).toEqual("Single Content View");
      expect(viewStates.length).toEqual(1);

      const viewState0 = viewStates[0];
      if (viewState0) {
        const bisBaseName = ViewUtilities.getBisBaseClass(
          viewState0.classFullName
        );
        expect(ViewUtilities.isSpatial(bisBaseName)).toEqual(true);
      }

      // attempting to emphasize the elements should return false because it wasn't saved
      const contentGroup = new ContentGroup(
        savedViewLayoutProps.contentGroupProps
      );
      expect(
        StageContentLayout.emphasizeElementsFromProps(
          contentGroup,
          savedViewLayoutProps
        )
      ).to.be.false;
    }
  });

  it("should create and parse Drawing saved view layout", async () => {
    const emphasizeElements = new EmphasizeElements();
    emphasizeElements.wantEmphasis = true;
    viewportMock.setup((x) => x.neverDrawn).mockReturnValue(() => undefined);
    viewportMock.setup((x) => x.alwaysDrawn).mockReturnValue(() => undefined);

    const vs = DrawingViewState.createFromProps(
      viewStateProps2,
      imodelMock.object
    );
    imodelMock
      .setup(async (x) => x.findClassFor(moq.It.isAny(), moq.It.isAny()))
      .returns(async () => Promise.resolve<any>(DrawingViewState));

    if (vs) viewState = vs;
    else throw Error("Couldn't create ViewState");

    let serializedSavedViewLayoutProps = "";

    const frontstageProvider = new Frontstage1();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      frontstageProvider.id
    );
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

    if (frontstageDef) {
      if (
        UiFramework.content.layouts.activeLayout &&
        UiFramework.content.layouts.activeContentGroup
      ) {
        const getEmphasizeElements = EmphasizeElements.get;
        EmphasizeElements.get = () => emphasizeElements;

        const savedViewLayoutProps = StageContentLayout.viewLayoutToProps(
          UiFramework.content.layouts.activeLayout,
          UiFramework.content.layouts.activeContentGroup,
          true,
          (contentProps: ContentProps) => {
            if (contentProps.applicationData)
              delete contentProps.applicationData;
          }
        );

        EmphasizeElements.get = getEmphasizeElements;
        const serialized = JSON.stringify(savedViewLayoutProps);
        serializedSavedViewLayoutProps = serialized;
      }
    }

    const iModelConnection = imodelMock.object;
    if (serializedSavedViewLayoutProps && iModelConnection) {
      // Parse StageContentLayoutProps
      const savedViewLayoutProps: StageContentLayoutProps = JSON.parse(
        serializedSavedViewLayoutProps
      );
      // Create ContentLayoutDef
      const contentLayoutDef = new ContentLayoutDef(
        savedViewLayoutProps.contentLayoutProps ??
          savedViewLayoutProps.contentGroupProps.layout
      );
      // Create ViewStates
      const viewStates = await StageContentLayout.viewStatesFromProps(
        iModelConnection,
        savedViewLayoutProps
      );

      expect(contentLayoutDef.description).toEqual("Single Content View");
      expect(viewStates.length).toEqual(1);

      const viewState0 = viewStates[0];
      if (viewState0) {
        const bisBaseName = ViewUtilities.getBisBaseClass(
          viewState0.classFullName
        );
        expect(ViewUtilities.isDrawing(bisBaseName)).toEqual(true);
      }

      const contentGroup = new ContentGroup(
        savedViewLayoutProps.contentGroupProps
      );
      expect(contentGroup.propsId).toEqual("MyContentGroup");

      // activate the layout
      await UiFramework.content.layouts.setActive(
        contentLayoutDef,
        contentGroup
      );

      // emphasize the elements
      expect(
        StageContentLayout.emphasizeElementsFromProps(
          contentGroup,
          savedViewLayoutProps
        )
      ).toEqual(true);
    }
  });

  it("should create and parse Sheet saved view layout", async () => {
    const vs = SheetViewState.createFromProps(
      viewStateProps3,
      imodelMock.object
    );
    imodelMock
      .setup(async (x) => x.findClassFor(moq.It.isAny(), moq.It.isAny()))
      .returns(async () => Promise.resolve<any>(SheetViewState));

    if (vs) viewState = vs;
    else throw Error("Couldn't create ViewState");

    let serializedSavedViewLayoutProps = "";

    const frontstageProvider = new Frontstage1();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
      frontstageProvider.id
    );
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

    if (frontstageDef) {
      if (
        UiFramework.content.layouts.activeLayout &&
        UiFramework.content.layouts.activeContentGroup
      ) {
        const savedViewLayoutProps = StageContentLayout.viewLayoutToProps(
          UiFramework.content.layouts.activeLayout,
          UiFramework.content.layouts.activeContentGroup,
          true,
          (contentProps: ContentProps) => {
            if (contentProps.applicationData)
              delete contentProps.applicationData;
          }
        );
        const serialized = JSON.stringify(savedViewLayoutProps);

        serializedSavedViewLayoutProps = serialized;
      }
    }

    const iModelConnection = imodelMock.object;
    if (serializedSavedViewLayoutProps && iModelConnection) {
      // Parse StageContentLayoutProps
      const savedViewLayoutProps: StageContentLayoutProps = JSON.parse(
        serializedSavedViewLayoutProps
      );
      // Create ContentLayoutDef
      const contentLayoutDef = new ContentLayoutDef(
        savedViewLayoutProps.contentLayoutProps ??
          savedViewLayoutProps.contentGroupProps.layout
      );
      // Create ViewStates
      const viewStates = await StageContentLayout.viewStatesFromProps(
        iModelConnection,
        savedViewLayoutProps
      );

      expect(contentLayoutDef.description).toEqual("Single Content View");
      expect(viewStates.length).toEqual(1);

      const viewState0 = viewStates[0];
      if (viewState0) {
        const bisBaseName = ViewUtilities.getBisBaseClass(
          viewState0.classFullName
        );
        expect(ViewUtilities.isSheet(bisBaseName)).toEqual(true);
      }
    }
  });
});
