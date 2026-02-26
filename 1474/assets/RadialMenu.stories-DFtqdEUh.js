import { r as reactExports, c as classnames, j as jsxRuntimeExports } from "./iframe-MZ9GDAUV.js";
import { b7 as Point, H as Icon } from "./appui-react-CxqBCL1K.js";
import { S as Svg2D } from "./2D-C_I84eoA.js";
import { S as Svg3D } from "./3D-p0WossVA.js";
import { S as SvgActivity } from "./Activity-DJbYB5_Y.js";
import { A as AppUiDecorator } from "./Decorators-ByA6YP1P.js";
import { K as Key_enumExports } from "./Key.enum-BlUwKc_n.js";
import "./client-CdcWlIUh.js";
class Line {
  p1;
  p2;
  constructor(p1, p2) {
    this.p1 = p1 || new Point();
    this.p2 = p2 || new Point();
  }
  /** checks for equality with the components of this, and line parameter */
  equals = (line) => this.p1.equals(line.p1) && this.p2.equals(line.p2);
}
class Circle {
  center;
  radius;
  constructor(center, radius) {
    this.center = center || new Point();
    this.radius = radius || 0;
  }
}
class Annulus {
  center;
  inner;
  outer;
  constructor(center, innerRadius, outerRadius) {
    this.center = center || new Point();
    this.inner = new Circle(center, innerRadius);
    this.outer = new Circle(center, outerRadius);
  }
}
class AnnularSector {
  parent;
  startAngle;
  endAngle;
  path;
  innerStart;
  outerStart;
  start;
  innerEnd;
  outerEnd;
  end;
  /**
   * initialize AnnularSector on parent annulus, and generate SVG Path to store in this.path
   * @param parent parent annulus to initialize sector on.
   * @param startAngle angle to begin the annular sector on.
   * @param endAngle angle to end the annular sector on.
   */
  constructor(parent, startAngle, endAngle) {
    this.parent = parent;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    const { x: cx, y: cy } = parent.center;
    const inner = parent.inner.radius;
    const outer = parent.outer.radius;
    this.innerStart = new Point(cx + inner * Math.cos(startAngle), cy + inner * Math.sin(startAngle));
    this.outerStart = new Point(cx + outer * Math.cos(startAngle), cy + outer * Math.sin(startAngle));
    this.start = new Line(this.innerStart, this.outerStart);
    this.outerEnd = new Point(cx + outer * Math.cos(endAngle), cy + outer * Math.sin(endAngle));
    this.innerEnd = new Point(cx + inner * Math.cos(endAngle), cy + inner * Math.sin(endAngle));
    this.end = new Line(this.outerEnd, this.innerEnd);
    const angleDiff = endAngle - startAngle;
    const largeArc = angleDiff % (Math.PI * 2) > Math.PI ? 1 : 0;
    const sectorCommands = [];
    sectorCommands.push(`M${this.innerStart.x},${this.innerStart.y}`);
    sectorCommands.push(`L${this.outerStart.x},${this.outerStart.y}`);
    sectorCommands.push(`A${outer},${outer} 0 ${largeArc} 1 ${this.outerEnd.x},${this.outerEnd.y}`);
    sectorCommands.push(`L${this.innerEnd.x},${this.innerEnd.y}`);
    sectorCommands.push(`A${inner},${inner} 0 ${largeArc} 0 ${this.innerStart.x},${this.innerStart.y}`);
    sectorCommands.push(`z`);
    this.path = sectorCommands.join(" ");
  }
}
class RadialMenu extends reactExports.Component {
  _root = null;
  _selectedButton = null;
  static defaultProps = {
    labelRotate: false,
    selected: -1
  };
  state = {
    sectors: []
  };
  constructor(props) {
    super(props);
  }
  render() {
    const width = 2 * (this.props.outerRadius + 1);
    let x = this.props.left, y = this.props.top;
    if (this.props.left && this.props.top && typeof this.props.left === "number" && typeof this.props.top === "number") {
      x = this.props.left;
      y = this.props.top;
      if (x < 0)
        x = 0;
      if (x > window.innerWidth - width)
        x = window.innerWidth - width;
      if (y < 0)
        y = 0;
      if (y > window.innerHeight - width)
        y = window.innerHeight - width;
    }
    const divStyle = {
      left: x,
      top: y,
      ...this.props.style
    };
    return reactExports.createElement(
      "div",
      { ref: (el) => {
        this._root = el;
      }, className: classnames("core-radial-menu", { opened: this.props.opened }, this.props.className), style: divStyle, "data-testid": "core-radial-menu" },
      reactExports.createElement("svg", { xmlns: "http://w3.org/2000/svg", version: "1.1", width, height: width, className: "core-radial-menu-container" }, reactExports.Children.map(this.props.children, (child, index) => {
        if (!child || typeof child !== "object" || !("props" in child))
          return child;
        const childElement = child;
        return reactExports.cloneElement(childElement, {
          key: index,
          ref: (el) => {
            if (this.props.selected === index)
              this._selectedButton = el;
          },
          selected: index === this.props.selected,
          labelRotate: childElement.props.labelRotate || this.props.labelRotate,
          annularSector: this.state.sectors[index]
        });
      }))
    );
  }
  componentDidMount() {
    this._generateAnnularSectors();
    setTimeout(() => {
      window.addEventListener("keyup", this._handleKeyUp);
      window.addEventListener("mouseup", this._handleClick);
    });
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this._handleKeyUp);
    window.removeEventListener("mouseup", this._handleClick);
  }
  /** @internal */
  componentDidUpdate(prevProps) {
    if (prevProps.innerRadius !== this.props.innerRadius || prevProps.outerRadius !== this.props.outerRadius) {
      this._generateAnnularSectors();
    }
  }
  _handleKeyUp = (event) => {
    if (event.key === Key_enumExports.Key.Escape.valueOf() && this.props.onEsc)
      this.props.onEsc(event);
  };
  _handleClick = (event) => {
    if (event.target instanceof HTMLElement && this._root && !event.target.contains(this._root) && this.props.onBlur)
      this.props.onBlur(event);
  };
  /** Manually call onSelect of highlighted button. */
  select = () => {
    if (this._selectedButton)
      this._selectedButton.select();
  };
  _generateAnnularSectors = () => {
    const n = reactExports.Children.count(this.props.children);
    const angle = 2 * Math.PI / n;
    const outer = this.props.outerRadius;
    const inner = this.props.innerRadius;
    const offset = -Math.PI / 8;
    const annulus = new Annulus(new Point(outer + 1, outer + 1), inner + 1, outer - 1);
    const sectors = [];
    for (let i = 0; i < n; i++) {
      sectors.push(new AnnularSector(annulus, angle * i + offset, angle * (i + 1) + offset));
    }
    this.setState({ sectors });
  };
}
class RadialButton extends reactExports.Component {
  state = {
    hover: this.props.selected || false
  };
  constructor(props) {
    super(props);
  }
  render() {
    const sector = this.props.annularSector;
    let p = new Point();
    let size = 0;
    let t = "";
    let path = "";
    if (sector) {
      size = sector.start.p1.getDistanceTo(sector.end.p2) * 2;
      path = sector.path;
      const parent = sector.parent;
      const { x: cx, y: cy } = parent.center;
      const r = (parent.inner.radius + parent.outer.radius) / 2;
      const angle = (sector.startAngle + sector.endAngle) / 2;
      p = new Point(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      if (this.props.labelRotate) {
        let a = angle * 180 / Math.PI + 90;
        while (a > 180)
          a -= 360;
        while (a < -180)
          a += 360;
        if (a > 90)
          a -= 180;
        if (a < -90)
          a += 180;
        t = `rotate(${a} ${p.x}, ${p.y})`;
      }
    }
    return reactExports.createElement(
      "g",
      { onMouseOver: this._handleMouseOver, onMouseOut: this._handleMouseOut, onClick: this._handleClick },
      reactExports.createElement("path", { className: classnames("core-radial-menu-sector", { selected: this.state.hover }, this.props.className), style: this.props.style, d: path }),
      reactExports.createElement(
        "foreignObject",
        { transform: t, x: p.x - size / 2, y: p.y - 16, width: size, height: size, className: "core-radial-menu-button-svg" },
        reactExports.createElement(
          "div",
          { xmlns: "http://www.w3.org/1999/xhtml", className: "core-radial-menu-button-container" },
          reactExports.createElement(
            "div",
            { className: "core-radial-menu-button-icon" },
            reactExports.createElement(Icon, { iconSpec: this.props.icon })
          ),
          reactExports.createElement("div", { className: "core-radial-menu-button-content" }, this.props.children)
        )
      )
    );
  }
  /** Manually call this.props.onSelect */
  select = () => {
    if (this.props.onSelect)
      this.props.onSelect(void 0);
  };
  _handleClick = (event) => {
    if (this.props.onSelect)
      this.props.onSelect(event);
  };
  _handleMouseOver = (_event) => {
    this.setState({ hover: true });
  };
  _handleMouseOut = (_event) => {
    this.setState({ hover: false });
  };
}
const { action } = __STORYBOOK_MODULE_ACTIONS__;
const meta = {
  title: "Deprecated/RadialMenu",
  component: RadialMenu,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    opened: true,
    innerRadius: 150,
    outerRadius: 220,
    left: "50%",
    top: "50%",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(RadialButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg2D, {}), onSelect: action("Item 1"), children: "Item 1" }), /* @__PURE__ */ jsxRuntimeExports.jsx(RadialButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg3D, {}), onSelect: action("Item 2"), children: "Item 2" }), /* @__PURE__ */ jsxRuntimeExports.jsx(RadialButton, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SvgActivity, {}), onSelect: action("Item 3"), children: "Item 3" })]
  }
};
const Basic = {};
Basic.parameters = {
  ...Basic.parameters,
  docs: {
    ...Basic.parameters?.docs,
    source: {
      originalSource: "{}",
      ...Basic.parameters?.docs?.source
    }
  }
};
const __namedExportsOrder = ["Basic"];
export {
  Basic,
  __namedExportsOrder,
  meta as default
};
