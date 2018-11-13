/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { mount, shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { expect } from "chai";
import { Face } from "@bentley/ui-core";
import { Vector3d } from "@bentley/geometry-core";
import {
  CubeNavigationAid,
  NavCubeFace,
  FaceCell,
  HitBoxX,
  HitBoxY,
  HitBoxZ,
  CubeHover,
  ConfigurableUiManager,
  CubeNavigationAidControl,
  AnyWidgetProps,
  WidgetDefFactory,
  NavigationWidgetDef,
} from "../../..//index";
import TestUtils from "../../TestUtils";

describe("CubeNavigationAid", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();

    if (!ConfigurableUiManager.isControlRegistered("CubeNavigationAid"))
      ConfigurableUiManager.registerControl("CubeNavigationAid", CubeNavigationAidControl);
  });

  describe("<CubeNavigationAid />", () => {
    it("should render", () => {
      const wrapper = mount(<CubeNavigationAid />);
      wrapper.unmount();
    });
    it("renders correctly", () => {
      shallow(<CubeNavigationAid />).should.matchSnapshot();
    });
  });
  describe("<NavCubeFace />", () => {
    it("should render", () => {
      mount(<NavCubeFace face={Face.Top} label="test" hoverMap={{}} onFaceCellClick={() => { }} onFaceCellHoverChange={() => { }} />);
    });
    const wrapper = shallow(<NavCubeFace face={Face.Top} label="test" hoverMap={{}} onFaceCellClick={() => { }} onFaceCellHoverChange={() => { }} />);
    it("renders correctly", () => {
      wrapper.should.matchSnapshot();
    });
    describe("methods and callbacks", () => {

      NavCubeFace.faceCellToPos = sinon.spy(NavCubeFace.faceCellToPos);

      wrapper.update();
      describe("faceCellToPos", () => {
        it("should be called when component is rendered", () => {
          NavCubeFace.faceCellToPos.should.have.been.calledWith(Face.Top, 0, 0);
        });
        it("should return correct Point3d", () => {
          const pos = NavCubeFace.faceCellToPos(Face.Back, -1, 1);
          pos.x.should.equal(HitBoxX.Right);
          pos.y.should.equal(HitBoxY.Back);
          pos.z.should.equal(HitBoxZ.Bottom);
        });
      });
    });
  });
  describe("<FaceCell />", () => {
    it("should render", () => {
      mount(<FaceCell onFaceCellClick={cellClick} onFaceCellHoverChange={cellHover} hoverMap={{}} vector={Vector3d.create(1, 1, 1)} face={Face.None} />);
    });
    const cellClick = sinon.spy();
    const cellHover = sinon.spy();
    const pos = Vector3d.create(1, 1, 1);
    const wrapper = shallow(<FaceCell onFaceCellClick={cellClick} onFaceCellHoverChange={cellHover} hoverMap={{}} vector={pos} face={Face.None} />);
    it("should render correctly", () => {
      wrapper.should.matchSnapshot();
    });
    describe("onFaceCellClick", () => {
      it("should be called when cell is clicked", () => {
        cellClick.should.not.have.been.calledOnce;
        const div = wrapper.find(".face-cell").at(0);
        const e1 = new MouseEvent("mousedown", { clientX: 300, clientY: 400 });
        div.simulate("mousedown", e1);
        const e2 = new MouseEvent("mouseup", { clientX: 300, clientY: 400 });
        div.simulate("mouseup", e2);
        cellClick.should.have.been.calledOnce;
        cellClick.should.have.been.calledWithExactly(pos, Face.None);
      });
    });
    describe("onFaceCellHoverChange", () => {
      const div = wrapper.find(".face-cell").at(0);
      const e = new MouseEvent("", { clientX: 300, clientY: 400 });
      it("should be called when cell is hovered", () => {
        div.simulate("mouseover", e);
        cellHover.should.have.been.calledWithExactly(pos, CubeHover.Hover);
      });
      it("should be called when cell is unhovered", () => {
        div.simulate("mouseout", e);
        cellHover.should.have.been.calledWithExactly(pos, CubeHover.None);
      });
      it("should be called when cell is clicked", () => {
        div.simulate("mousedown", e);
        cellHover.should.have.been.calledWithExactly(pos, CubeHover.Active);
      });
      it("should be called when cell is unclicked", () => {
        div.simulate("mouseup", e);
        cellHover.should.have.been.calledWithExactly(pos, CubeHover.None);
      });
    });
  });

  describe("CubeNavigationAidControl", () => {

    const widgetProps: AnyWidgetProps = {
      classId: "NavigationWidget",
      isFreeform: true,
      navigationAidId: "CubeNavigationAid",
    };

    it("CubeNavigationAidControl creates CubeNavigationAid", () => {

      const widgetDef = WidgetDefFactory.create(widgetProps);
      expect(widgetDef).to.be.instanceof(NavigationWidgetDef);

      const navigationWidgetDef = widgetDef as NavigationWidgetDef;

      const reactElement = navigationWidgetDef.reactElement;
      expect(reactElement).to.not.be.undefined;

      const reactNode = navigationWidgetDef.renderCornerItem();
      expect(reactNode).to.not.be.undefined;
    });

  });

});
