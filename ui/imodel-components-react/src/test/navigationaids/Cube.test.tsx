/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Matrix3d } from "@itwin/core-geometry";
import {
  Cube,
  CubeFace,
  Face,
} from "../../imodel-components-react/navigationaids/Cube";
import { render, screen } from "@testing-library/react";
import { selectorMatches, styleMatch } from "../TestUtils";

describe("Cube", () => {
  describe("<Cube />", () => {
    it("renders correctly", () => {
      const r = Matrix3d.createIdentity();
      render(<Cube rotMatrix={r} />);
      expect(screen.getByTestId("components-cube-face-front"))
        .to.satisfy(selectorMatches(".face.cube-front"))
        .and.to.satisfy(
          styleMatch({
            transform:
              "matrix3d(1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1)",
          })
        );
      expect(screen.getByTestId("components-cube-face-back"))
        .to.satisfy(selectorMatches(".face.cube-back"))
        .and.to.satisfy(
          styleMatch({
            transform:
              "matrix3d(-1, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0, 1)",
          })
        );
      expect(screen.getByTestId("components-cube-face-right"))
        .to.satisfy(selectorMatches(".face.cube-right"))
        .and.to.satisfy(
          styleMatch({
            transform:
              "matrix3d(0, -1, 0, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 0, 0, 1)",
          })
        );
      expect(screen.getByTestId("components-cube-face-left"))
        .to.satisfy(selectorMatches(".face.cube-left"))
        .and.to.satisfy(
          styleMatch({
            transform:
              "matrix3d(0, 1, 0, 0, 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 0, 1)",
          })
        );
      expect(screen.getByTestId("components-cube-face-top"))
        .to.satisfy(selectorMatches(".face.cube-top"))
        .and.to.satisfy(
          styleMatch({
            transform:
              "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
          })
        );
      expect(screen.getByTestId("components-cube-face-bottom"))
        .to.satisfy(selectorMatches(".face.cube-bottom"))
        .and.to.satisfy(
          styleMatch({
            transform:
              "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)",
          })
        );
    });
    it("renders with faces correctly", () => {
      const r = Matrix3d.createIdentity();
      render(
        <Cube
          rotMatrix={r}
          faces={{
            [Face.Top]: <div>Top Face</div>,
            [Face.Bottom]: <div>Bottom Face</div>,
            [Face.Front]: <div>Front Face</div>,
            [Face.Back]: <div>Back Face</div>,
            [Face.Left]: <div>Left Face</div>,
            [Face.Right]: <div>Right Face</div>,
          }}
        />
      );
      expect(
        screen.getByTestId("components-cube-face-front")
      ).to.have.nested.property("firstElementChild.innerHTML", "Front Face");
      expect(
        screen.getByTestId("components-cube-face-back")
      ).to.have.nested.property("firstElementChild.innerHTML", "Back Face");
      expect(
        screen.getByTestId("components-cube-face-right")
      ).to.have.nested.property("firstElementChild.innerHTML", "Right Face");
      expect(
        screen.getByTestId("components-cube-face-left")
      ).to.have.nested.property("firstElementChild.innerHTML", "Left Face");
      expect(
        screen.getByTestId("components-cube-face-top")
      ).to.have.nested.property("firstElementChild.innerHTML", "Top Face");
      expect(
        screen.getByTestId("components-cube-face-bottom")
      ).to.have.nested.property("firstElementChild.innerHTML", "Bottom Face");
    });
  });
  describe("<CubeFace />", () => {
    it("renders correctly", () => {
      const r = Matrix3d.createIdentity();
      render(<CubeFace rotMatrix={r} face={Face.Top} />);
      expect(screen.getByTestId("components-cube-face-top"))
        .to.satisfy(selectorMatches(".face.cube-top"))
        .and.to.satisfy(
          styleMatch({
            transform:
              "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
          })
        );
    });
    it("correctly renders nothing when face is Face.None", () => {
      const r = Matrix3d.createIdentity();
      const { container } = render(<CubeFace rotMatrix={r} face={Face.None} />);
      expect(container).to.have.property("innerHTML", "");
    });
  });
});
