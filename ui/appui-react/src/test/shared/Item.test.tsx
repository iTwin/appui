/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp, SelectionTool, Tool } from "@itwin/core-frontend";
import { Orientation } from "@itwin/core-react";
import type { ItemProps } from "../../appui-react.js";
import {
  ActionButtonItemDef,
  CommandItemDef,
  ToolItemDef,
} from "../../appui-react.js";

describe("Item", () => {
  it("CommandItemDef with no commandId should get generated id", () => {
    const commandItem = new CommandItemDef({
      iconSpec: "icon-placeholder",
    });
    expect(
      commandItem.id.substring(0, CommandItemDef.commandIdPrefix.length)
    ).toEqual(CommandItemDef.commandIdPrefix);
    commandItem.execute(); // Just for 'else' coverage
  });

  it("CommandItemDef should set and get description", () => {
    const commandItem = new CommandItemDef({
      iconSpec: "icon-placeholder",
    });
    commandItem.setDescription("Hello");
    expect(commandItem.description).toEqual("Hello");
    commandItem.setDescription(() => "World");
    expect(commandItem.description).toEqual("World");
  });

  it("CommandItemDef with getCommandArgs should call it on execute", () => {
    const spy = vi.fn();
    const commandItem = new CommandItemDef({
      iconSpec: "icon-placeholder",
      execute: () => {},
      getCommandArgs: () => spy(),
    });
    commandItem.execute();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("CommandItemDef with onItemExecuted should call it on execute", () => {
    const spy = vi.fn();
    const commandItem = new CommandItemDef(
      {
        iconSpec: "icon-placeholder",
        execute: () => {},
      },
      spy
    );
    commandItem.execute();
    expect(spy).toHaveBeenCalledOnce();
  });

  it("ToolItemDef with no execute has no commandHandler", () => {
    const toolItem = new ToolItemDef({
      toolId: "test",
      iconSpec: "icon-placeholder",
    });
    toolItem.execute(); // Does nothing
  });

  it("ToolItemDef with isPressed and isActive", () => {
    const toolItem = new ToolItemDef({
      toolId: "test",
      iconSpec: "icon-placeholder",
      isPressed: true,
      isActive: true,
    });
    expect(toolItem.isPressed).toEqual(true);
    expect(toolItem.isActive).toEqual(true);
  });

  it("ToolItemDef helper function", () => {
    const toolItem = ToolItemDef.getItemDefForTool(
      SelectionTool,
      "icon-override"
    );
    expect(toolItem.iconSpec).toEqual("icon-override");
    expect(toolItem.label).not.toEqual(undefined);
    expect(toolItem.tooltip).not.toEqual(undefined);
    expect(toolItem.execute).toBeTruthy();
    expect(toolItem.description).not.toEqual(undefined);
  });

  class TestImmediate extends Tool {
    public static isValid = false;

    public static override toolId = "Test.Immediate";
    public override async run(v1: string, v2: number): Promise<boolean> {
      TestImmediate.isValid = v1 === "test-string" && v2 === 2;
      return true;
    }
    public static override get minArgs() {
      return 2;
    }
    public static override get maxArgs() {
      return 2;
    }
    public override async parseAndRun(
      v1: string,
      v2: string
    ): Promise<boolean> {
      if (arguments.length !== 2) return false;
      return this.run(v1, parseInt(v2, 10));
    }
  }

  it("ToolItemDef helper function should process tool with multiple args of different types", async () => {
    const namespaceName = "dummy";
    await IModelApp.localization.registerNamespace(namespaceName);
    TestImmediate.register(namespaceName);

    const toolItem = ToolItemDef.getItemDefForTool(
      TestImmediate,
      undefined,
      "test-string",
      2
    );
    expect(toolItem.iconSpec).toEqual(undefined);
    expect(TestImmediate.isValid).toEqual(false);

    toolItem.execute();

    const spy = vi.spyOn(IModelApp.tools, "run");
    toolItem.execute();
    expect(TestImmediate.isValid).toEqual(true);
    expect(spy).toHaveBeenCalledWith("Test.Immediate", "test-string", 2);
  });

  class TestItemDef extends ActionButtonItemDef {
    public toolId: string = "";

    constructor(itemProps: ItemProps) {
      super(itemProps);
    }

    public get id(): string {
      return "";
    }
  }

  it("ActionButtonItemDef with no size returns default dimension of 42", () => {
    const testItem = new TestItemDef({
      iconSpec: "icon-placeholder",
    });
    expect(testItem.getDimension(Orientation.Horizontal)).toEqual(
      ActionButtonItemDef.defaultButtonSize
    );
  });

  it("ActionButtonItemDef with size returns correct dimension", () => {
    const testItem = new TestItemDef({
      iconSpec: "icon-placeholder",
    });
    testItem.handleSizeKnown({ width: 200, height: 100 });
    expect(testItem.getDimension(Orientation.Horizontal)).toEqual(200);
    expect(testItem.getDimension(Orientation.Vertical)).toEqual(100);
  });
});
