/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  IModelApp,
  NoRenderApp,
  SelectionTool,
  Tool,
} from "@itwin/core-frontend";
import { Orientation, Size } from "@itwin/core-react";
import type { ItemProps } from "../../appui-react";
import {
  ActionButtonItemDef,
  CommandItemDef,
  ToolItemDef,
} from "../../appui-react";
import TestUtils from "../TestUtils";

describe("Item", () => {
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  afterAll(async () => {
    TestUtils.terminateUiFramework();
    await IModelApp.shutdown();
  });

  it("CommandItemDef with no commandId should get generated id", () => {
    const commandItem = new CommandItemDef({
      iconSpec: "icon-placeholder",
    });
    expect(
      commandItem.id.substring(0, CommandItemDef.commandIdPrefix.length)
    ).to.eq(CommandItemDef.commandIdPrefix);
    commandItem.execute(); // Just for 'else' coverage
  });

  it("CommandItemDef should set and get description", () => {
    const commandItem = new CommandItemDef({
      iconSpec: "icon-placeholder",
    });
    commandItem.setDescription("Hello");
    expect(commandItem.description).to.eq("Hello");
    commandItem.setDescription(() => "World");
    expect(commandItem.description).to.eq("World");
  });

  it("CommandItemDef with getCommandArgs should call it on execute", () => {
    const spyMethod = vi.fn();
    const commandItem = new CommandItemDef({
      iconSpec: "icon-placeholder",
      execute: () => {},
      getCommandArgs: () => spyMethod(),
    });
    commandItem.execute();
    expect(spyMethod).toHaveBeenCalledOnce();
  });

  it("CommandItemDef with onItemExecuted should call it on execute", () => {
    const spyMethod = vi.fn();
    const commandItem = new CommandItemDef(
      {
        iconSpec: "icon-placeholder",
        execute: () => {},
      },
      spyMethod
    );
    commandItem.execute();
    expect(spyMethod).toHaveBeenCalledOnce();
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
    expect(toolItem.isPressed).to.be.true;
    expect(toolItem.isActive).to.be.true;
  });

  it("ToolItemDef helper function", () => {
    const toolItem = ToolItemDef.getItemDefForTool(
      SelectionTool,
      "icon-override"
    );
    expect(toolItem.iconSpec).to.be.eq("icon-override");
    expect(toolItem.label).not.to.be.undefined;
    expect(toolItem.tooltip).not.to.be.undefined;
    expect(toolItem.execute).not.to.be.undefined;
    expect(toolItem.description).not.to.be.undefined;
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
    expect(toolItem.iconSpec).to.be.eq(undefined);
    expect(TestImmediate.isValid).to.be.false;

    toolItem.execute();

    const spyMethod = vi.spyOn(IModelApp.tools, "run");
    toolItem.execute();
    expect(TestImmediate.isValid).to.be.true;
    expect(spyMethod).toHaveBeenNthCalledWith(1, "1");
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
    expect(testItem.getDimension(Orientation.Horizontal)).to.eq(
      ActionButtonItemDef.defaultButtonSize
    );
  });

  it("ActionButtonItemDef with size returns correct dimension", () => {
    const testItem = new TestItemDef({
      iconSpec: "icon-placeholder",
    });
    testItem.handleSizeKnown(new Size(200, 100));
    expect(testItem.getDimension(Orientation.Horizontal)).to.eq(200);
    expect(testItem.getDimension(Orientation.Vertical)).to.eq(100);
  });
});
