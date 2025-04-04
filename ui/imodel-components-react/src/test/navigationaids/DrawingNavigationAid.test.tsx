/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import * as moq from "typemoq";
import {
  AxisIndex,
  Matrix3d,
  Point3d,
  Transform,
  Vector3d,
} from "@itwin/core-geometry";
import type {
  DrawingViewState,
  IModelConnection,
  ViewManager,
  ViewState,
  ViewState3d,
} from "@itwin/core-frontend";
import { ScreenViewport } from "@itwin/core-frontend";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { TestUtils } from "../TestUtils.js";
import {
  DrawingNavigationAid,
  DrawingNavigationCanvas,
  MapMode,
} from "../../imodel-components-react/navigationaids/DrawingNavigationAid.js";
import { ViewportComponentEvents } from "../../imodel-components-react/viewport/ViewportComponentEvents.js";
import { userEvent } from "@testing-library/user-event";
import type { Mock } from "vitest";

/**
 * Will create a coords value suitable for our use of pointer events.
 * @param xAndY value to assign to x, y, clientX and clientY
 */
function coords(xAndY: number): {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
};
/**
 * Will create a coords value suitable for our use of pointer events.
 * @param x value to assign to x and clientX
 * @param y value to assign to y and clientY
 * @returns coords object suitable for our use of pointer events.
 */
function coords(x: number, y?: number) {
  return {
    x,
    y: y ?? x,
    clientX: x,
    clientY: y ?? x,
  };
}

const cssMatrix3dToBentleyTransform = (mStr: string) => {
  const mat = mStr.match(/matrix3d\(([-\de\. ,]+)\)/);
  if (mat !== null && mat[1] !== undefined) {
    const params = mat[1].split(",");
    if (params.length !== 16) return undefined;
    const p = [];
    for (const param of params) {
      const n = parseFloat(param);
      if (isNaN(n)) {
        return undefined;
      }
      p.push(n);
    }
    return Transform.createRowValues(
      p[0],
      p[4],
      p[8],
      p[12],
      p[1],
      p[5],
      p[9],
      p[13],
      p[2],
      p[6],
      p[10],
      p[14]
    );
  }
  return undefined;
};

describe("DrawingNavigationAid", () => {
  let theUserTo: ReturnType<typeof userEvent.setup>;
  beforeEach(async () => {
    theUserTo = userEvent.setup();
    await TestUtils.initializeUiIModelComponents();
  });

  afterEach(() => {
    TestUtils.terminateUiIModelComponents();
  });

  let extents = Vector3d.create(400, 400);
  let origin = Point3d.createZero();
  let rotation = Matrix3d.createIdentity();
  const connection = moq.Mock.ofType<IModelConnection>();
  const viewState = moq.Mock.ofType<DrawingViewState>();
  viewState.setup((x) => x.id).returns(() => "id1");
  viewState
    .setup((x) => x.classFullName)
    .returns(() => "Bis:DrawingViewDefinition");
  viewState
    .setup((x) => x.is3d)
    .returns(() => (() => false) as DrawingViewState["is3d"]);
  viewState.setup((x) => x.getExtents).returns(() => () => extents);
  viewState.setup((x) => x.getOrigin).returns(() => () => origin);
  viewState.setup((x) => x.getRotation).returns(() => () => rotation);
  const vp = moq.Mock.ofType<ScreenViewport>();
  vp.setup((x) => x.view).returns(() => viewState.object);

  const viewState3d = moq.Mock.ofType<ViewState3d>();
  viewState3d.setup((x) => x.id).returns(() => "id2");
  viewState3d
    .setup((x) => x.classFullName)
    .returns(() => "Bis:ViewDefinition3d");
  viewState3d
    .setup((x) => x.is3d)
    .returns(() => (() => true) as ViewState3d["is3d"]);
  viewState3d.setup((x) => x.getExtents).returns(() => () => extents);
  viewState3d.setup((x) => x.getOrigin).returns(() => () => origin);
  viewState3d.setup((x) => x.getRotation).returns(() => () => rotation);

  const viewManager = moq.Mock.ofType<ViewManager>();
  class ScreenViewportMock extends ScreenViewport {
    public static override create(
      _parentDiv: HTMLDivElement,
      _view: ViewState
    ): ScreenViewport {
      const vpMock = moq.Mock.ofType<ScreenViewport>();
      vpMock.setup((x) => x.view).returns(() => viewState.object);
      return vpMock.object;
    }
  }

  const waitForSpy = async (
    spy: Mock,
    options: { timeout: number } = { timeout: 250 }
  ) => {
    return waitFor(
      () => {
        if (spy.mock.calls.length === 0)
          throw new Error("Waiting for spy timed out!");
      },
      { timeout: options.timeout, interval: 10 }
    );
  };

  describe("<DrawingNavigationAid />", () => {
    it("should render", () => {
      render(<DrawingNavigationAid iModelConnection={connection.object} />);
    });
    it("should exist", async () => {
      const animationEnd = vi.fn();
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          onAnimationEnd={animationEnd}
        />
      );
      const navAid = component.getByTestId("components-drawing-navigation-aid");
      expect(navAid).to.exist;
    });
    it("should not have unrotate button with spatial views", async () => {
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          screenViewportOverride={ScreenViewportMock}
          viewManagerOverride={viewManager.object}
          initialView={viewState3d.object}
        />
      );
      const toggleRotateStyle = component.queryByTestId("toggle-rotate-style");
      expect(toggleRotateStyle).to.not.exist;
    });
    it("should have expected closed dimensions", () => {
      const size = Vector3d.create(96, 96);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          closeSize={size}
        />
      );
      const navAid = component.getByTestId("components-drawing-navigation-aid");
      expect(navAid.style.width).to.equal("96px");
      expect(navAid.style.height).to.equal("96px");
    });
    it("should have expected default closed dimensions", () => {
      const size = DrawingNavigationAid.getDefaultClosedMapSize();
      const component = render(
        <DrawingNavigationAid iModelConnection={connection.object} />
      );
      const navAid = component.getByTestId("components-drawing-navigation-aid");
      expect(navAid.style.width).to.equal(`${size.x}px`);
      expect(navAid.style.height).to.equal(`${size.y}px`);
    });
    it("should have expected opened dimensions", () => {
      const size = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={size}
          initialMapMode={MapMode.Opened}
        />
      );
      const navAid = component.getByTestId("components-drawing-navigation-aid");
      expect(navAid.style.width).to.equal("350px");
      expect(navAid.style.height).to.equal("300px");
    });
    it("should have expected default opened dimensions", () => {
      const size = DrawingNavigationAid.getDefaultOpenedMapSize();
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          initialMapMode={MapMode.Opened}
        />
      );
      const navAid = component.getByTestId("components-drawing-navigation-aid");
      expect(navAid.style.width).to.equal(`${size.x}px`);
      expect(navAid.style.height).to.equal(`${size.y}px`);
    });
    it("should change from closed to opened when clicked", async () => {
      const animationEnd = vi.fn();
      const closedSize = Vector3d.create(96, 96);
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          closeSize={closedSize}
          openSize={openedSize}
          animationTime={0.1}
          onAnimationEnd={animationEnd}
        />
      );

      const navAid = component.getByTestId("components-drawing-navigation-aid");
      const drawingContainer = component.getByTestId("drawing-container");

      expect(navAid.style.width).to.equal("96px");
      expect(navAid.style.height).to.equal("96px");
      await theUserTo.click(drawingContainer);

      await waitForSpy(animationEnd, { timeout: 1000 });

      const navAid2 = component.queryByTestId(
        "components-drawing-navigation-aid"
      );
      expect(navAid2).to.exist;
      expect(navAid2!.style.width).to.equal("350px");
      expect(navAid2!.style.height).to.equal("300px");
    });
    it("should change from closed to opened when view-window clicked", async () => {
      const animationEnd = vi.fn();
      const closedSize = Vector3d.create(96, 96);
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          closeSize={closedSize}
          openSize={openedSize}
          animationTime={0.1}
          onAnimationEnd={animationEnd}
        />
      );

      const navAid = component.getByTestId("components-drawing-navigation-aid");
      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(navAid.style.width).to.equal("96px");
      expect(navAid.style.height).to.equal("96px");
      await theUserTo.click(drawingWindow);

      await waitForSpy(animationEnd, { timeout: 1000 });

      const navAid2 = component.queryByTestId(
        "components-drawing-navigation-aid"
      );
      expect(navAid2).to.exist;
      expect(navAid2!.style.width).to.equal("350px");
      expect(navAid2!.style.height).to.equal("300px");
    });
    it("should change from closed to opened when clicked with rotateMinimapWithView", async () => {
      const animationEnd = vi.fn();
      const closedSize = Vector3d.create(96, 96);
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          closeSize={closedSize}
          openSize={openedSize}
          animationTime={0.1}
          onAnimationEnd={animationEnd}
          initialRotateMinimapWithView={true}
        />
      );

      const navAid = component.getByTestId("components-drawing-navigation-aid");
      const drawingContainer = component.getByTestId("drawing-container");

      expect(navAid.style.width).to.equal("96px");
      expect(navAid.style.height).to.equal("96px");
      await theUserTo.click(drawingContainer);

      await waitForSpy(animationEnd, { timeout: 1000 });

      const navAid2 = component.queryByTestId(
        "components-drawing-navigation-aid"
      );
      expect(navAid2).to.exist;
      expect(navAid2!.style.width).to.equal("350px");
      expect(navAid2!.style.height).to.equal("300px");
    });
    it("should change from opened to closed on Escape keypress", async () => {
      const animationEnd = vi.fn();
      const closedSize = Vector3d.create(96, 96);
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          closeSize={closedSize}
          openSize={openedSize}
          animationTime={0.1}
          onAnimationEnd={animationEnd}
          initialMapMode={MapMode.Opened}
        />
      );

      const navAid = component.getByTestId("components-drawing-navigation-aid");
      const drawingContainer = component.getByTestId("drawing-container");

      expect(navAid.style.width).to.equal("350px");
      expect(navAid.style.height).to.equal("300px");
      drawingContainer.dispatchEvent(
        new KeyboardEvent("keyup", {
          bubbles: true,
          cancelable: true,
          key: "Escape",
        })
      );

      await waitForSpy(animationEnd, { timeout: 1000 });

      const navAid2 = component.queryByTestId(
        "components-drawing-navigation-aid"
      );
      expect(navAid2).to.exist;
      expect(navAid2!.style.width).to.equal("96px");
      expect(navAid2!.style.height).to.equal("96px");
    });
    it("should change from opened to closed on Escape keypress with rotateMinimapWithView", async () => {
      const animationEnd = vi.fn();
      const closedSize = Vector3d.create(96, 96);
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          closeSize={closedSize}
          openSize={openedSize}
          animationTime={0.1}
          onAnimationEnd={animationEnd}
          initialMapMode={MapMode.Opened}
          initialRotateMinimapWithView={true}
        />
      );

      const navAid = component.getByTestId("components-drawing-navigation-aid");
      const drawingContainer = component.getByTestId("drawing-container");

      expect(navAid.style.width).to.equal("350px");
      expect(navAid.style.height).to.equal("300px");
      drawingContainer.dispatchEvent(
        new KeyboardEvent("keyup", {
          bubbles: true,
          cancelable: true,
          key: "Escape",
        })
      );

      await waitForSpy(animationEnd, { timeout: 1000 });

      const navAid2 = component.queryByTestId(
        "components-drawing-navigation-aid"
      );
      expect(navAid2).to.exist;
      expect(navAid2!.style.width).to.equal("96px");
      expect(navAid2!.style.height).to.equal("96px");
    });
    it("should change from opened to closed on Esc keypress(Edge)", async () => {
      const animationEnd = vi.fn();
      const closedSize = Vector3d.create(96, 96);
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          closeSize={closedSize}
          openSize={openedSize}
          animationTime={0.1}
          onAnimationEnd={animationEnd}
          initialMapMode={MapMode.Opened}
        />
      );

      const navAid = component.getByTestId("components-drawing-navigation-aid");
      const drawingContainer = component.getByTestId("drawing-container");

      expect(navAid.style.width).to.equal("350px");
      expect(navAid.style.height).to.equal("300px");
      drawingContainer.dispatchEvent(
        new KeyboardEvent("keyup", {
          bubbles: true,
          cancelable: true,
          key: "Escape",
        })
      );

      await waitForSpy(animationEnd, { timeout: 1000 });

      const navAid2 = component.queryByTestId(
        "components-drawing-navigation-aid"
      );
      expect(navAid2).to.exist;
      expect(navAid2!.style.width).to.equal("96px");
      expect(navAid2!.style.height).to.equal("96px");
    });
    it("should change from opened to closed onOutsideClick", async () => {
      const animationEnd = vi.fn();
      const closedSize = Vector3d.create(96, 96);
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <div data-testid="outside">
          <DrawingNavigationAid
            iModelConnection={connection.object}
            closeSize={closedSize}
            openSize={openedSize}
            animationTime={0.1}
            onAnimationEnd={animationEnd}
            initialMapMode={MapMode.Opened}
          />
        </div>
      );

      const navAid = component.getByTestId("components-drawing-navigation-aid");
      const outside = component.getByTestId("outside");

      expect(navAid.style.width).to.equal("350px");
      expect(navAid.style.height).to.equal("300px");

      await theUserTo.click(outside);

      await waitForSpy(animationEnd, { timeout: 1000 });

      const navAid2 = component.queryByTestId(
        "components-drawing-navigation-aid"
      );
      expect(navAid2).to.exist;
      expect(navAid2!.style.width).to.equal("96px");
      expect(navAid2!.style.height).to.equal("96px");
    });
    describe("onViewRotationChangeEvent", () => {
      beforeEach(() => {
        extents = Vector3d.create(400, 400);
        origin = Point3d.createZero();
        rotation = Matrix3d.createIdentity();
      });
      it("should update onViewRotationChangeEvent", async () => {
        const component = render(
          <DrawingNavigationAid
            iModelConnection={connection.object}
            viewport={vp.object}
          />
        );
        const viewWindow = component.getByTestId("drawing-view-window");
        expect(viewWindow.style.transform).to.equal(
          "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 47.5, 47.5, 0, 1)"
        );
        ViewportComponentEvents.onViewRotationChangeEvent.emit({
          viewport: vp.object,
        });
        await waitFor(() => {
          expect(viewWindow.style.transform).to.equal(
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 32, 32, 0, 1)"
          );
        });
      });
      it("should update onViewRotationChangeEvent with rotateMinimapWithView", async () => {
        const component = render(
          <DrawingNavigationAid
            iModelConnection={connection.object}
            viewport={vp.object}
            initialRotateMinimapWithView={true}
          />
        );
        const viewWindow = component.getByTestId("drawing-view-window");
        expect(viewWindow.style.transform).to.equal(
          "translate(47.5px, 47.5px)"
        );
        ViewportComponentEvents.onViewRotationChangeEvent.emit({
          viewport: vp.object,
        });
        await waitFor(() => {
          expect(viewWindow.style.transform).to.equal("translate(32px, 32px)");
        });
      });
      it("should update with rotation", async () => {
        const component = render(
          <DrawingNavigationAid
            iModelConnection={connection.object}
            viewport={vp.object}
          />
        );
        const viewWindow = component.getByTestId("drawing-view-window");
        expect(viewWindow.style.transform).to.equal(
          "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 47.5, 47.5, 0, 1)"
        );
        rotation = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.Z);
        ViewportComponentEvents.onViewRotationChangeEvent.emit({
          viewport: vp.object,
        });
        await waitFor(() => {
          expect(viewWindow.style.transform).to.equal(
            "matrix3d(0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 32, 32, 0, 1)"
          );
        });
      });
      it("should update with rotation in opened mode", async () => {
        const size = Vector3d.create(240, 240);
        const component = render(
          <DrawingNavigationAid
            iModelConnection={connection.object}
            viewport={vp.object}
            openSize={size}
            initialMapMode={MapMode.Opened}
          />
        );
        const navAid = component.getByTestId(
          "components-drawing-navigation-aid"
        );
        const viewWindow = component.getByTestId("drawing-view-window");
        expect(viewWindow.style.transform).to.equal(
          "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 119.5, 119.5, 0, 1)"
        );
        rotation = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.Z);
        ViewportComponentEvents.onViewRotationChangeEvent.emit({
          viewport: vp.object,
        });
        await waitFor(() => {
          expect(viewWindow.style.transform).to.equal(
            "matrix3d(0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 80, 80, 0, 1)"
          );
        });
        expect(navAid.style.width).to.equal("240px");
        expect(navAid.style.height).to.equal("240px");
      });
      it("should update rotation and reset on un-rotate", async () => {
        const animationEnd = vi.fn();
        const component = render(
          <DrawingNavigationAid
            iModelConnection={connection.object}
            onAnimationEnd={animationEnd}
            viewport={vp.object}
            animationTime={0.1}
          />
        );
        const viewWindow = component.getByTestId("drawing-view-window");
        expect(viewWindow.style.transform).to.equal(
          "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 47.5, 47.5, 0, 1)"
        );
        rotation = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.Z);
        ViewportComponentEvents.onViewRotationChangeEvent.emit({
          viewport: vp.object,
        });

        await waitFor(() => {
          expect(viewWindow.style.transform).to.equal(
            "matrix3d(0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 32, 32, 0, 1)"
          );
        });
        const unRotate = component.getByTestId("drawing-unrotate-button");
        unRotate.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        await waitForSpy(animationEnd, { timeout: 1000 });
        expect(viewWindow.style.transform).to.equal(
          "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 32, 32, 0, 1)"
        );
      });
      it("should update rotation and reset on un-rotate with rotateMinimapWithView", async () => {
        const animationEnd = vi.fn();
        const component = render(
          <DrawingNavigationAid
            iModelConnection={connection.object}
            onAnimationEnd={animationEnd}
            initialRotateMinimapWithView={true}
            viewport={vp.object}
            animationTime={0.1}
          />
        );
        const viewWindow = component.getByTestId("drawing-view-window");
        expect(viewWindow.style.transform).to.equal(
          "translate(47.5px, 47.5px)"
        );
        rotation = Matrix3d.create90DegreeRotationAroundAxis(AxisIndex.Z);
        ViewportComponentEvents.onViewRotationChangeEvent.emit({
          viewport: vp.object,
        });
        await waitFor(() => {
          expect(viewWindow.style.transform).to.equal("translate(32px, 32px)");
        });
        const unRotate = component.getByTestId("drawing-unrotate-button");
        unRotate.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        await waitForSpy(animationEnd, { timeout: 1000 });
        await waitFor(() => {
          expect(viewWindow.style.transform).to.equal("translate(32px, 32px)");
        });
      });
    });
    it("should update panning", async () => {
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={openedSize}
          initialMapMode={MapMode.Opened}
        />
      );

      const drawingContainer = component.getByTestId("drawing-container");
      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 174.5, 149.5, 0, 1)"
      );

      await theUserTo.pointer([
        { keys: "[MouseLeft>]", target: drawingContainer, coords: coords(4) },
        { coords: coords(6) },
        { keys: "[/MouseLeft]" },
      ]);
      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 176.5, 151.5, 0, 1)"
      );
    });
    it("should update panning with rotateMinimapWithView", async () => {
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={openedSize}
          initialMapMode={MapMode.Opened}
          initialRotateMinimapWithView={true}
        />
      );

      const drawingContainer = component.getByTestId("drawing-container");
      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "translate(174.5px, 149.5px)"
      );

      await theUserTo.pointer([
        { keys: "[MouseLeft>]", target: drawingContainer, coords: coords(4) },
        { coords: coords(6) },
        { keys: "[/MouseLeft]" },
      ]);
      expect(drawingWindow.style.transform).to.equal(
        "translate(176.5px, 151.5px)"
      );
    });
    it("should update moving", async () => {
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={openedSize}
          initialMapMode={MapMode.Opened}
        />
      );

      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 174.5, 149.5, 0, 1)"
      );

      await theUserTo.pointer([
        { keys: "[MouseLeft>]", target: drawingWindow, coords: coords(4) },
        { coords: coords(6) },
        { keys: "[/MouseLeft]" },
      ]);
      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 176.5, 151.5, 0, 1)"
      );
    });
    it("should update moving with rotateMinimapWithView", async () => {
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={openedSize}
          initialMapMode={MapMode.Opened}
          initialRotateMinimapWithView={true}
        />
      );

      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "translate(174.5px, 149.5px)"
      );

      await theUserTo.pointer([
        { keys: "[MouseLeft>]", target: drawingWindow, coords: coords(4) },
        { coords: coords(6) },
        { keys: "[/MouseLeft]" },
      ]);
      expect(drawingWindow.style.transform).to.equal(
        "translate(176.5px, 151.5px)"
      );
    });
    it("should update moving in collapsed mode", async () => {
      const closedSize = Vector3d.create(96, 96);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          closeSize={closedSize}
        />
      );

      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 47.5, 47.5, 0, 1)"
      );

      await theUserTo.pointer([
        { keys: "[MouseLeft>]", target: drawingWindow, coords: coords(4) },
        { coords: coords(6) },
        { keys: "[/MouseLeft]" },
      ]);
      const expectedMatrix = cssMatrix3dToBentleyTransform(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 49.5, 49.5, 0, 1)"
      );
      const drawingWindowMatrix = cssMatrix3dToBentleyTransform(
        drawingWindow.style.transform
      )!;
      expect(
        expectedMatrix &&
          drawingWindowMatrix.matrix.isAlmostEqual(expectedMatrix.matrix)
      ).toEqual(true);
    });
    it("should update pan-move", async () => {
      const closedSize = Vector3d.create(96, 96);
      const component = render(
        <>
          <div data-testid={"other"} />
          <DrawingNavigationAid
            iModelConnection={connection.object}
            closeSize={closedSize}
          />
        </>
      );

      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 47.5, 47.5, 0, 1)"
      );

      await theUserTo.pointer([
        { keys: "[MouseLeft>]", target: drawingWindow, coords: coords(50) },
        { coords: coords(0) },
        { coords: coords(-50) },
      ]);
      await new Promise((r) => {
        setTimeout(r, 100);
      });
      await theUserTo.pointer([{ keys: "[/MouseLeft]" }]);
      await theUserTo.pointer([
        {
          target: component.getByTestId("other"),
          keys: "[MouseLeft>]",
          coords: coords(0),
        },
        { target: drawingWindow, coords: coords(-50) },
        { keys: "[/MouseLeft]" },
      ]);
      const mat = drawingWindow.style.transform.match(
        /matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ([-\d\.]+), ([-\d\.]+), 0, 1\)/
      );
      const x = parseFloat(mat![1]);
      const y = parseFloat(mat![2]);
      expect(x).to.be.lessThan(47.5);
      expect(y).to.be.lessThan(47.5);
    });
    it("should update pan-move successively", async () => {
      const closedSize = Vector3d.create(96, 96);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          closeSize={closedSize}
        />
      );

      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 47.5, 47.5, 0, 1)"
      );

      await theUserTo.pointer([
        { keys: "[MouseLeft>]", target: drawingWindow, coords: coords(50) },
        { coords: coords(0) },
        { coords: coords(-50) },
      ]);
      await new Promise((r) => {
        setTimeout(r, 40);
      });
      await theUserTo.pointer([{ keys: "[/MouseLeft]" }]);

      await theUserTo.pointer([
        { keys: "[MouseLeft>]", target: drawingWindow, coords: coords(50) },
        { coords: coords(0) },
        { coords: coords(-50) },
      ]);
      await new Promise((r) => {
        setTimeout(r, 40);
      });
      await theUserTo.pointer([{ keys: "[/MouseLeft]" }]);
      const mat = drawingWindow.style.transform.match(
        /matrix3d\(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ([-\d\.]+), ([-\d\.]+), 0, 1\)/
      );
      const x = parseFloat(mat![1]);
      const y = parseFloat(mat![2]);
      expect(x).to.be.lessThan(47.5);
      expect(y).to.be.lessThan(47.5);
    });
    it("should mouse wheel out", async () => {
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={openedSize}
          initialMapMode={MapMode.Opened}
        />
      );

      const drawingNavigationAid = component.getByTestId(
        "components-drawing-navigation-aid"
      );
      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 174.5, 149.5, 0, 1)"
      );
      expect(drawingWindow.style.height).to.equal("1px");
      expect(drawingWindow.style.width).to.equal("1px");

      fireEvent.wheel(drawingNavigationAid, { deltaY: 2 });

      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 190.45454545454544, 135.9090909090909, 0, 1)"
      );
      expect(drawingWindow.style.height).to.equal("0.9090909090909091px");
      expect(drawingWindow.style.width).to.equal("0.9090909090909091px");
    });
    it("should mouse wheel out with rotateMinimapWithView", async () => {
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={openedSize}
          initialMapMode={MapMode.Opened}
          initialRotateMinimapWithView={true}
        />
      );

      const drawingNavigationAid = component.getByTestId(
        "components-drawing-navigation-aid"
      );
      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "translate(174.5px, 149.5px)"
      );
      expect(drawingWindow.style.height).to.equal("1px");
      expect(drawingWindow.style.width).to.equal("1px");

      fireEvent.wheel(drawingNavigationAid, { deltaY: 2 });

      expect(drawingWindow.style.transform).to.equal(
        "translate(190.45454545454544px, 135.9090909090909px)"
      );
      expect(drawingWindow.style.height).to.equal("0.9090909090909091px");
      expect(drawingWindow.style.width).to.equal("0.9090909090909091px");
    });
    it("should mouse wheel in", async () => {
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={openedSize}
          initialMapMode={MapMode.Opened}
        />
      );

      const drawingNavigationAid = component.getByTestId(
        "components-drawing-navigation-aid"
      );
      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 174.5, 149.5, 0, 1)"
      );
      expect(drawingWindow.style.height).to.equal("1px");
      expect(drawingWindow.style.width).to.equal("1px");

      fireEvent.wheel(drawingNavigationAid, { deltaY: -2 });

      expect(drawingWindow.style.transform).to.equal(
        "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 156.95, 164.45, 0, 1)"
      );
      expect(drawingWindow.style.height).to.equal("1.1px");
      expect(drawingWindow.style.width).to.equal("1.1px");
    });
    it("should mouse wheel in with rotateMinimapWithView", async () => {
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={openedSize}
          initialMapMode={MapMode.Opened}
          initialRotateMinimapWithView={true}
        />
      );

      const drawingNavigationAid = component.getByTestId(
        "components-drawing-navigation-aid"
      );
      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.transform).to.equal(
        "translate(174.5px, 149.5px)"
      );
      expect(drawingWindow.style.height).to.equal("1px");
      expect(drawingWindow.style.width).to.equal("1px");

      fireEvent.wheel(drawingNavigationAid, { deltaY: -2 });

      expect(drawingWindow.style.transform).to.equal(
        "translate(156.95px, 164.45px)"
      );
      expect(drawingWindow.style.height).to.equal("1.1px");
      expect(drawingWindow.style.width).to.equal("1.1px");
    });
    it("should zoom out with button", async () => {
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={openedSize}
          initialMapMode={MapMode.Opened}
        />
      );

      const zoomOutButton = component.getByTestId("drawing-zoom-out-button");
      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.height).to.equal("1px");
      expect(drawingWindow.style.width).to.equal("1px");

      fireEvent.click(zoomOutButton);

      expect(drawingWindow.style.height).to.equal("0.7142857142857143px");
      expect(drawingWindow.style.width).to.equal("0.7142857142857143px");
    });
    it("should zoom in with button", async () => {
      const openedSize = Vector3d.create(350, 300);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          openSize={openedSize}
          initialMapMode={MapMode.Opened}
        />
      );

      const zoomInButton = component.getByTestId("drawing-zoom-in-button");
      const drawingWindow = component.getByTestId("drawing-view-window");

      expect(drawingWindow.style.height).to.equal("1px");
      expect(drawingWindow.style.width).to.equal("1px");

      fireEvent.click(zoomInButton);

      expect(drawingWindow.style.height).to.equal("1.4px");
      expect(drawingWindow.style.width).to.equal("1.4px");
    });
    it("should toggle rotation mode with button", async () => {
      const closedSize = Vector3d.create(96, 96);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          closeSize={closedSize}
        />
      );

      const toggleButton = component.getByTestId("toggle-rotate-style");

      fireEvent.click(toggleButton);
      expect(toggleButton.classList.contains("checked")).toEqual(true);
    });
    it("should toggle rotation mode with button with viewport", async () => {
      const closedSize = Vector3d.create(96, 96);
      const component = render(
        <DrawingNavigationAid
          iModelConnection={connection.object}
          viewport={vp.object}
          closeSize={closedSize}
        />
      );

      const toggleButton = component.getByTestId("toggle-rotate-style");

      ViewportComponentEvents.onViewRotationChangeEvent.emit({
        viewport: vp.object,
      });
      fireEvent.click(toggleButton);
      expect(toggleButton.classList.contains("checked")).toEqual(true);
    });
  });
  describe("<DrawingNavigationCanvas />", () => {
    it("should render", () => {
      render(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={1}
          viewId={viewState.object.id}
        />
      );
    });
    it("should update", () => {
      const component = render(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={undefined}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={1}
        />
      );
      component.rerender(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={1}
          viewId={viewState.object.id}
        />
      );
    });
    it("should update from view to new view", () => {
      const component = render(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={undefined}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={1}
        />
      );
      component.rerender(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={1}
          viewId={viewState.object.id}
        />
      );
      const newState = moq.Mock.ofType<DrawingViewState>();
      newState.setup((x) => x.id).returns(() => "id2");
      newState
        .setup((x) => x.getExtents)
        .returns(() => () => Vector3d.create(2, 2));
      newState
        .setup((x) => x.getOrigin)
        .returns(() => () => Point3d.create(3, 3));
      newState
        .setup((x) => x.getRotation)
        .returns(
          () => () => Matrix3d.createRowValues(0, 1, 0, 1, 0, 0, 0, 0, 1)
        );
      component.rerender(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={newState.object}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={1}
          viewId={newState.object.id}
        />
      );
    });
    it("should update origin", () => {
      const component = render(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={1}
          viewId={viewState.object.id}
        />
      );
      const newOrigin = Point3d.createZero();
      component.rerender(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={newOrigin}
          extents={extents}
          rotation={rotation}
          zoom={1}
          viewId={viewState.object.id}
        />
      );
    });
    it("should update extents", () => {
      const component = render(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={1}
          viewId={viewState.object.id}
        />
      );
      const newExtents = Vector3d.createZero();
      component.rerender(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={origin}
          extents={newExtents}
          rotation={rotation}
          zoom={1}
          viewId={viewState.object.id}
        />
      );
    });
    it("should update zoom", () => {
      const component = render(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={1}
          viewId={viewState.object.id}
        />
      );
      component.rerender(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={2}
          viewId={viewState.object.id}
        />
      );
    });
    it("should update rotation", () => {
      const component = render(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={origin}
          extents={extents}
          rotation={rotation}
          zoom={1}
          viewId={viewState.object.id}
        />
      );
      const newRotation = Matrix3d.createIdentity();
      component.rerender(
        <DrawingNavigationCanvas
          canvasSizeOverride={true}
          viewManagerOverride={viewManager.object}
          screenViewportOverride={ScreenViewportMock}
          view={viewState.object}
          origin={origin}
          extents={extents}
          rotation={newRotation}
          zoom={1}
          viewId={viewState.object.id}
        />
      );
    });
  });
});
