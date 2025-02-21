var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
import { j as jsxRuntimeExports } from "./jsx-runtime-f7WWSPSb.js";
import { w as within, f as fireEvent2 } from "./index-CLzPx0K9.js";
import { aZ as LineSegment3d, a_ as Point3d, n as StagePanelLocation, o as StagePanelSection, W as WidgetState, u as StagePanelState } from "./appui-react-BIGfyRyB.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-D7VdQcAK.js";
import { c as createFrontstage, r as removeProperty, a as createWidget } from "./Utils-DOW3fYw3.js";
import "./index-R26Bfrts.js";
import "./Dialog-G-zkgOIV.js";
import "./SvgCloseSmall-2ldVV_sh.js";
import "./index-CHBBkG1-.js";
import "./iframe-ClLUjPXt.js";
import "../sb-preview/runtime.js";
import "./_commonjs-dynamic-modules-lq-lihFa.js";
import "./index-oY8aizO2.js";
import "./client-DRUEp2wC.js";
import "./debounce-CTTNlY27.js";
import "./index-CBpxrBZN.js";
import "./index-DLlB04eo.js";
import "./index-Brmgc-W4.js";
import "./index-BdOSk9or.js";
import "./DemoIModel-zibz9A5r.js";
function FrontstageStory(props) {
  const frontstage = createFrontstage({
    ...props.frontstage,
    rightPanelProps: {
      sizeSpec: 250
    },
    hideStatusBar: props.hideStatusBar,
    hideToolSettings: props.hideToolSettings
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppUiStory, { layout: "fullscreen", frontstages: [frontstage], ...props });
}
FrontstageStory.__docgenInfo = { "description": "[FrontstageProvider](https://www.itwinjs.org/reference/appui-react/frontstage/frontstageprovider/) can be used to configure a frontstage.", "methods": [], "displayName": "FrontstageStory", "props": { "frontstage": { "required": false, "tsType": { "name": "Partial", "elements": [{ "name": "StandardFrontstageProps" }], "raw": "Partial<StandardFrontstageProps>" }, "description": "" } } };
class VirtualCursorElement extends HTMLElement {
  constructor() {
    super(...arguments);
    __publicField(this, "_removeListeners", []);
    __publicField(this, "top", 100);
    __publicField(this, "left", 100);
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const overlay = document.createElement("div");
    overlay.setAttribute("class", "overlay");
    const cursor = document.createElement("div");
    cursor.setAttribute("class", "cursor");
    const cursorSize = 25;
    const style = document.createElement("style");
    style.textContent = `
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 9999;
      }

      .cursor {
        width: ${cursorSize}px;
        height: ${cursorSize}px;

        background: red;
        border-radius: 50%;
        border: 1px solid black;
        opacity: 0.5;
      }

      .cursor.down {
        background: yellow;
      }
    `;
    const setCursorPosition = (top, left) => {
      this.top = top;
      this.left = left;
      cursor.style.transform = `translate(${left}px, ${top}px)`;
    };
    const setCursorDown = (down) => {
      if (down) cursor.classList.add("down");
      if (!down) cursor.classList.remove("down");
    };
    setCursorPosition(this.top, this.left);
    setCursorDown(false);
    const getNewPosition = (e) => {
      const left = e.pageX - cursorSize / 2;
      const top = e.pageY - cursorSize / 2;
      return { left, top };
    };
    const handleMouseMove = (e) => {
      const { left, top } = getNewPosition(e);
      setCursorPosition(top, left);
    };
    const handleMouseDown = (e) => {
      const { left, top } = getNewPosition(e);
      setCursorPosition(top, left);
      setCursorDown(true);
    };
    const handleMouseUp = (e) => {
      const { left, top } = getNewPosition(e);
      setCursorPosition(top, left);
      setCursorDown(false);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    const stopPropagation = (e) => {
      e.stopPropagation();
    };
    overlay.addEventListener("mousemove", stopPropagation);
    overlay.addEventListener("mousedown", stopPropagation);
    overlay.addEventListener("mouseup", stopPropagation);
    this._removeListeners.push(
      () => document.removeEventListener("mousemove", handleMouseMove),
      () => document.removeEventListener("mousedown", handleMouseDown),
      () => document.removeEventListener("mouseup", handleMouseUp),
      () => overlay.removeEventListener("mousemove", stopPropagation),
      () => overlay.removeEventListener("mousedown", stopPropagation),
      () => overlay.removeEventListener("mouseup", stopPropagation)
    );
    shadow.appendChild(style);
    shadow.appendChild(overlay);
    overlay.appendChild(cursor);
  }
  disconnectedCallback() {
    for (const removeListener of this._removeListeners) {
      removeListener();
    }
  }
}
function createCursorEvents(initialPosition, onMove, options) {
  let currentPosition = initialPosition;
  const duration = 250;
  return {
    move: async (to) => {
      const start = Date.now();
      const line = LineSegment3d.create(
        new Point3d(currentPosition.x, currentPosition.y, 0),
        new Point3d(to.x, to.y, 0)
      );
      return new Promise((resolve) => {
        const move = () => {
          const now = Date.now();
          const elapsed = now - start;
          const fraction = elapsed / duration;
          if (fraction < 1) {
            const position = line.fractionToPoint(fraction);
            onMove({ x: position.x, y: position.y });
            requestAnimationFrame(move);
            return;
          }
          onMove(to);
          currentPosition = to;
          resolve();
        };
        requestAnimationFrame(move);
      });
    }
  };
}
if (!customElements.get("virtual-cursor-element"))
  customElements.define("virtual-cursor-element", VirtualCursorElement);
const meta = {
  title: "Frontstage/FrontstageProvider",
  component: FrontstageStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => /* @__PURE__ */ jsxRuntimeExports.jsx(Page, {})
    },
    layout: "fullscreen"
  },
  args: {
    hideStatusBar: true,
    hideToolSettings: true
  },
  argTypes: {
    frontstage: removeProperty(),
    itemProviders: removeProperty()
  }
};
const Overview = {
  args: {
    itemProviders: [{
      id: "widgets",
      getWidgets: () => {
        const layouts = {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.Start
          }
        };
        return [createWidget(1, {
          defaultState: WidgetState.Floating,
          canFloat: {
            defaultPosition: {
              x: 20,
              y: 50
            },
            isResizable: true
          },
          layouts
        }), createWidget(2, {
          layouts
        })];
      }
    }]
  }
};
const Panels = {
  args: {
    frontstage: {
      leftPanelProps: {
        defaultState: StagePanelState.Open,
        pinned: true,
        minSize: 120,
        size: 150
      },
      rightPanelProps: {
        minSize: 120,
        size: 150
      },
      topPanelProps: {
        defaultState: StagePanelState.Open,
        pinned: true,
        minSize: 90,
        size: 100
      },
      bottomPanelProps: {
        minSize: 90,
        size: 100
      }
    },
    itemProviders: [{
      id: "widgets",
      getWidgets: () => [createWidget(1, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Top panel" }),
        layouts: {
          standard: {
            location: StagePanelLocation.Top,
            section: StagePanelSection.Start
          }
        }
      }), createWidget(2, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Left panel" }),
        layouts: {
          standard: {
            location: StagePanelLocation.Left,
            section: StagePanelSection.Start
          }
        }
      }), createWidget(3, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Bottom panel" }),
        layouts: {
          standard: {
            location: StagePanelLocation.Bottom,
            section: StagePanelSection.Start
          }
        }
      }), createWidget(4, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Right panel" }),
        layouts: {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.Start
          }
        }
      })]
    }]
  }
};
const PanelSections = {
  args: {
    frontstage: {
      rightPanelProps: {
        minSize: 120,
        size: 150
      },
      bottomPanelProps: {
        minSize: 90,
        size: 100
      }
    },
    itemProviders: [{
      id: "widgets",
      getWidgets: () => [createWidget(1, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Start section" }),
        layouts: {
          standard: {
            location: StagePanelLocation.Bottom,
            section: StagePanelSection.Start
          }
        }
      }), createWidget(2, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "End section" }),
        layouts: {
          standard: {
            location: StagePanelLocation.Bottom,
            section: StagePanelSection.End
          }
        }
      }), createWidget(3, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Start section" }),
        layouts: {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.Start
          }
        }
      }), createWidget(4, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "End section" }),
        layouts: {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.End
          }
        }
      })]
    }]
  }
};
const FloatingWidgets = {
  args: {
    itemProviders: [{
      id: "widgets",
      getWidgets: () => [createWidget(1, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Floating widget" }),
        defaultState: WidgetState.Floating,
        canFloat: {
          defaultPosition: {
            x: 20,
            y: 20
          }
        }
      }), createWidget(2, {
        content: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Floating widget" }),
        defaultState: WidgetState.Floating,
        canFloat: {
          defaultPosition: {
            x: 20,
            y: 200
          }
        }
      })]
    }]
  }
};
const WidgetContainer = {
  args: {
    frontstage: {
      rightPanelProps: {
        size: 300
      }
    },
    itemProviders: [{
      id: "widgets",
      getWidgets: () => {
        const layouts = {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.Start
          }
        };
        return [createWidget(1, {
          defaultState: WidgetState.Floating,
          canFloat: {
            defaultPosition: {
              x: 20,
              y: 20
            },
            containerId: "fw1"
          },
          layouts
        }), createWidget(2, {
          defaultState: WidgetState.Floating,
          canFloat: {
            containerId: "fw1"
          },
          layouts
        }), createWidget(3, {
          canFloat: {
            containerId: "fw1"
          },
          layouts
        }), createWidget(4, {
          canFloat: {
            containerId: "fw1"
          },
          layouts
        }), createWidget(5, {
          canFloat: {
            containerId: "fw1"
          },
          layouts
        })];
      }
    }]
  }
};
const Interaction = {
  args: {
    itemProviders: [{
      id: "widgets",
      getWidgets: () => {
        const layouts = {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.Start
          }
        };
        return [createWidget(1, {
          layouts
        }), createWidget(2, {
          layouts
        })];
      }
    }]
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const virtualMouse = new VirtualCursorElement();
    canvasElement.append(virtualMouse);
    const cursorEvents = createCursorEvents({
      x: virtualMouse.left,
      y: virtualMouse.top
    }, (to) => {
      fireEvent2.mouseMove(canvasElement.ownerDocument, {
        clientX: to.x,
        clientY: to.y
      });
    });
    await step("test", async () => {
      const widget = await canvas.findByTitle("Widget 2", void 0, {
        timeout: 5e3
      });
      const initialBounds = widget.getBoundingClientRect();
      const startPos = {
        x: initialBounds.x + 10,
        y: initialBounds.y + 10
      };
      const moveTo = {
        x: initialBounds.x - 300,
        y: initialBounds.y + 200
      };
      await wait(1e3);
      await cursorEvents.move(startPos);
      await wait(1e3);
      fireEvent2.mouseDown(widget, {
        clientX: startPos.x,
        clientY: startPos.y
      });
      await cursorEvents.move(moveTo);
      await wait(500);
      fireEvent2.mouseUp(widget.ownerDocument, {
        clientX: moveTo.x,
        clientY: moveTo.y
      });
    });
  }
};
async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
Overview.parameters = {
  ...Overview.parameters,
  docs: {
    ...(_a = Overview.parameters) == null ? void 0 : _a.docs,
    source: {
      originalSource: '{\n  args: {\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => {\n        const layouts = {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.Start\n          }\n        };\n        return [createWidget(1, {\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            defaultPosition: {\n              x: 20,\n              y: 50\n            },\n            isResizable: true\n          },\n          layouts\n        }), createWidget(2, {\n          layouts\n        })];\n      }\n    }]\n  }\n}',
      ...(_c = (_b = Overview.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
    }
  }
};
Panels.parameters = {
  ...Panels.parameters,
  docs: {
    ...(_d = Panels.parameters) == null ? void 0 : _d.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstage: {\n      leftPanelProps: {\n        defaultState: StagePanelState.Open,\n        pinned: true,\n        minSize: 120,\n        size: 150\n      },\n      rightPanelProps: {\n        minSize: 120,\n        size: 150\n      },\n      topPanelProps: {\n        defaultState: StagePanelState.Open,\n        pinned: true,\n        minSize: 90,\n        size: 100\n      },\n      bottomPanelProps: {\n        minSize: 90,\n        size: 100\n      }\n    },\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => [createWidget(1, {\n        content: <b>Top panel</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Top,\n            section: StagePanelSection.Start\n          }\n        }\n      }), createWidget(2, {\n        content: <b>Left panel</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Left,\n            section: StagePanelSection.Start\n          }\n        }\n      }), createWidget(3, {\n        content: <b>Bottom panel</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Bottom,\n            section: StagePanelSection.Start\n          }\n        }\n      }), createWidget(4, {\n        content: <b>Right panel</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.Start\n          }\n        }\n      })]\n    }]\n  }\n}',
      ...(_f = (_e = Panels.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
    }
  }
};
PanelSections.parameters = {
  ...PanelSections.parameters,
  docs: {
    ...(_g = PanelSections.parameters) == null ? void 0 : _g.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstage: {\n      rightPanelProps: {\n        minSize: 120,\n        size: 150\n      },\n      bottomPanelProps: {\n        minSize: 90,\n        size: 100\n      }\n    },\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => [createWidget(1, {\n        content: <b>Start section</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Bottom,\n            section: StagePanelSection.Start\n          }\n        }\n      }), createWidget(2, {\n        content: <b>End section</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Bottom,\n            section: StagePanelSection.End\n          }\n        }\n      }), createWidget(3, {\n        content: <b>Start section</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.Start\n          }\n        }\n      }), createWidget(4, {\n        content: <b>End section</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.End\n          }\n        }\n      })]\n    }]\n  }\n}',
      ...(_i = (_h = PanelSections.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
    }
  }
};
FloatingWidgets.parameters = {
  ...FloatingWidgets.parameters,
  docs: {
    ...(_j = FloatingWidgets.parameters) == null ? void 0 : _j.docs,
    source: {
      originalSource: '{\n  args: {\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => [createWidget(1, {\n        content: <b>Floating widget</b>,\n        defaultState: WidgetState.Floating,\n        canFloat: {\n          defaultPosition: {\n            x: 20,\n            y: 20\n          }\n        }\n      }), createWidget(2, {\n        content: <b>Floating widget</b>,\n        defaultState: WidgetState.Floating,\n        canFloat: {\n          defaultPosition: {\n            x: 20,\n            y: 200\n          }\n        }\n      })]\n    }]\n  }\n}',
      ...(_l = (_k = FloatingWidgets.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
    }
  }
};
WidgetContainer.parameters = {
  ...WidgetContainer.parameters,
  docs: {
    ...(_m = WidgetContainer.parameters) == null ? void 0 : _m.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstage: {\n      rightPanelProps: {\n        size: 300\n      }\n    },\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => {\n        const layouts = {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.Start\n          }\n        };\n        return [createWidget(1, {\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            defaultPosition: {\n              x: 20,\n              y: 20\n            },\n            containerId: "fw1"\n          },\n          layouts\n        }), createWidget(2, {\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            containerId: "fw1"\n          },\n          layouts\n        }), createWidget(3, {\n          canFloat: {\n            containerId: "fw1"\n          },\n          layouts\n        }), createWidget(4, {\n          canFloat: {\n            containerId: "fw1"\n          },\n          layouts\n        }), createWidget(5, {\n          canFloat: {\n            containerId: "fw1"\n          },\n          layouts\n        })];\n      }\n    }]\n  }\n}',
      ...(_o = (_n = WidgetContainer.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
    }
  }
};
Interaction.parameters = {
  ...Interaction.parameters,
  docs: {
    ...(_p = Interaction.parameters) == null ? void 0 : _p.docs,
    source: {
      originalSource: '{\n  args: {\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => {\n        const layouts = {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.Start\n          }\n        };\n        return [createWidget(1, {\n          layouts\n        }), createWidget(2, {\n          layouts\n        })];\n      }\n    }]\n  },\n  play: async ({\n    canvasElement,\n    step\n  }) => {\n    const canvas = within(canvasElement);\n    const virtualMouse = new VirtualCursorElement();\n    canvasElement.append(virtualMouse);\n    const cursorEvents = createCursorEvents({\n      x: virtualMouse.left,\n      y: virtualMouse.top\n    }, to => {\n      fireEvent.mouseMove(canvasElement.ownerDocument, {\n        clientX: to.x,\n        clientY: to.y\n      });\n    });\n    await step("test", async () => {\n      const widget = await canvas.findByTitle("Widget 2", undefined, {\n        timeout: 5000\n      });\n      const initialBounds = widget.getBoundingClientRect();\n      const startPos = {\n        x: initialBounds.x + 10,\n        y: initialBounds.y + 10\n      };\n      const moveTo = {\n        x: initialBounds.x - 300,\n        y: initialBounds.y + 200\n      };\n      await wait(1000);\n      await cursorEvents.move(startPos);\n      await wait(1000);\n      fireEvent.mouseDown(widget, {\n        clientX: startPos.x,\n        clientY: startPos.y\n      });\n      await cursorEvents.move(moveTo);\n      await wait(500);\n      fireEvent.mouseUp(widget.ownerDocument, {\n        clientX: moveTo.x,\n        clientY: moveTo.y\n      });\n    });\n  }\n}',
      ...(_r = (_q = Interaction.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
    }
  }
};
const __namedExportsOrder = ["Overview", "Panels", "PanelSections", "FloatingWidgets", "WidgetContainer", "Interaction"];
export {
  FloatingWidgets,
  Interaction,
  Overview,
  PanelSections,
  Panels,
  WidgetContainer,
  __namedExportsOrder,
  meta as default
};
