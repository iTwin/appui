import { j as jsxRuntimeExports } from "./iframe-DNdoMX4Q.js";
import { bd as LineSegment3d, be as Point3d, w as StagePanelState, p as StagePanelSection, q as StagePanelLocation, W as WidgetState } from "./appui-react-glMK-yaN.js";
import { A as AppUiStory, P as Page } from "./AppUiStory-BWJJvhLI.js";
import { c as createFrontstage, r as removeProperty, a as createWidget } from "./Utils-CtqzyU6g.js";
import "./preload-helper-UZRgTS1n.js";
import "./Key.enum-YmMvjtrc.js";
import "./client-7SU87-Ux.js";
import "./index-C9p5eh_j.js";
import "./blocks-C7SkmsIk.js";
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
  _removeListeners = [];
  top = 100;
  left = 100;
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
const { fireEvent, within } = __STORYBOOK_MODULE_TEST__;
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
      fireEvent.mouseMove(canvasElement.ownerDocument, {
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
      fireEvent.mouseDown(widget, {
        clientX: startPos.x,
        clientY: startPos.y
      });
      await cursorEvents.move(moveTo);
      await wait(500);
      fireEvent.mouseUp(widget.ownerDocument, {
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
    ...Overview.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => {\n        const layouts = {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.Start\n          }\n        };\n        return [createWidget(1, {\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            defaultPosition: {\n              x: 20,\n              y: 50\n            },\n            isResizable: true\n          },\n          layouts\n        }), createWidget(2, {\n          layouts\n        })];\n      }\n    }]\n  }\n}',
      ...Overview.parameters?.docs?.source
    }
  }
};
Panels.parameters = {
  ...Panels.parameters,
  docs: {
    ...Panels.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstage: {\n      leftPanelProps: {\n        defaultState: StagePanelState.Open,\n        pinned: true,\n        minSize: 120,\n        size: 150\n      },\n      rightPanelProps: {\n        minSize: 120,\n        size: 150\n      },\n      topPanelProps: {\n        defaultState: StagePanelState.Open,\n        pinned: true,\n        minSize: 90,\n        size: 100\n      },\n      bottomPanelProps: {\n        minSize: 90,\n        size: 100\n      }\n    },\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => [createWidget(1, {\n        content: <b>Top panel</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Top,\n            section: StagePanelSection.Start\n          }\n        }\n      }), createWidget(2, {\n        content: <b>Left panel</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Left,\n            section: StagePanelSection.Start\n          }\n        }\n      }), createWidget(3, {\n        content: <b>Bottom panel</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Bottom,\n            section: StagePanelSection.Start\n          }\n        }\n      }), createWidget(4, {\n        content: <b>Right panel</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.Start\n          }\n        }\n      })]\n    }]\n  }\n}',
      ...Panels.parameters?.docs?.source
    }
  }
};
PanelSections.parameters = {
  ...PanelSections.parameters,
  docs: {
    ...PanelSections.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstage: {\n      rightPanelProps: {\n        minSize: 120,\n        size: 150\n      },\n      bottomPanelProps: {\n        minSize: 90,\n        size: 100\n      }\n    },\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => [createWidget(1, {\n        content: <b>Start section</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Bottom,\n            section: StagePanelSection.Start\n          }\n        }\n      }), createWidget(2, {\n        content: <b>End section</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Bottom,\n            section: StagePanelSection.End\n          }\n        }\n      }), createWidget(3, {\n        content: <b>Start section</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.Start\n          }\n        }\n      }), createWidget(4, {\n        content: <b>End section</b>,\n        layouts: {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.End\n          }\n        }\n      })]\n    }]\n  }\n}',
      ...PanelSections.parameters?.docs?.source
    }
  }
};
FloatingWidgets.parameters = {
  ...FloatingWidgets.parameters,
  docs: {
    ...FloatingWidgets.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => [createWidget(1, {\n        content: <b>Floating widget</b>,\n        defaultState: WidgetState.Floating,\n        canFloat: {\n          defaultPosition: {\n            x: 20,\n            y: 20\n          }\n        }\n      }), createWidget(2, {\n        content: <b>Floating widget</b>,\n        defaultState: WidgetState.Floating,\n        canFloat: {\n          defaultPosition: {\n            x: 20,\n            y: 200\n          }\n        }\n      })]\n    }]\n  }\n}',
      ...FloatingWidgets.parameters?.docs?.source
    }
  }
};
WidgetContainer.parameters = {
  ...WidgetContainer.parameters,
  docs: {
    ...WidgetContainer.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    frontstage: {\n      rightPanelProps: {\n        size: 300\n      }\n    },\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => {\n        const layouts = {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.Start\n          }\n        };\n        return [createWidget(1, {\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            defaultPosition: {\n              x: 20,\n              y: 20\n            },\n            containerId: "fw1"\n          },\n          layouts\n        }), createWidget(2, {\n          defaultState: WidgetState.Floating,\n          canFloat: {\n            containerId: "fw1"\n          },\n          layouts\n        }), createWidget(3, {\n          canFloat: {\n            containerId: "fw1"\n          },\n          layouts\n        }), createWidget(4, {\n          canFloat: {\n            containerId: "fw1"\n          },\n          layouts\n        }), createWidget(5, {\n          canFloat: {\n            containerId: "fw1"\n          },\n          layouts\n        })];\n      }\n    }]\n  }\n}',
      ...WidgetContainer.parameters?.docs?.source
    }
  }
};
Interaction.parameters = {
  ...Interaction.parameters,
  docs: {
    ...Interaction.parameters?.docs,
    source: {
      originalSource: '{\n  args: {\n    itemProviders: [{\n      id: "widgets",\n      getWidgets: () => {\n        const layouts = {\n          standard: {\n            location: StagePanelLocation.Right,\n            section: StagePanelSection.Start\n          }\n        };\n        return [createWidget(1, {\n          layouts\n        }), createWidget(2, {\n          layouts\n        })];\n      }\n    }]\n  },\n  play: async ({\n    canvasElement,\n    step\n  }) => {\n    const canvas = within(canvasElement);\n    const virtualMouse = new VirtualCursorElement();\n    canvasElement.append(virtualMouse);\n    const cursorEvents = createCursorEvents({\n      x: virtualMouse.left,\n      y: virtualMouse.top\n    }, to => {\n      fireEvent.mouseMove(canvasElement.ownerDocument, {\n        clientX: to.x,\n        clientY: to.y\n      });\n    });\n    await step("test", async () => {\n      const widget = await canvas.findByTitle("Widget 2", undefined, {\n        timeout: 5000\n      });\n      const initialBounds = widget.getBoundingClientRect();\n      const startPos = {\n        x: initialBounds.x + 10,\n        y: initialBounds.y + 10\n      };\n      const moveTo = {\n        x: initialBounds.x - 300,\n        y: initialBounds.y + 200\n      };\n      await wait(1000);\n      await cursorEvents.move(startPos);\n      await wait(1000);\n      fireEvent.mouseDown(widget, {\n        clientX: startPos.x,\n        clientY: startPos.y\n      });\n      await cursorEvents.move(moveTo);\n      await wait(500);\n      fireEvent.mouseUp(widget.ownerDocument, {\n        clientX: moveTo.x,\n        clientY: moveTo.y\n      });\n    });\n  }\n}',
      ...Interaction.parameters?.docs?.source
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
