/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type { Decorator } from "@storybook/react";

export const withResizer: Decorator = (Story, context) => {
  const resizer = !!context.globals.resizer;
  return (
    <div
      style={
        resizer
          ? {
              resize: "both",
              overflow: "auto",
              padding: "10px",
              border: "2px solid black",
            }
          : undefined
      }
    >
      <Story />
    </div>
  );
};

export const resizerGlobalType = {
  description: "Story resizer",
  defaultValue: undefined,
  toolbar: {
    title: "Resizer",
    icon: "tablet",
    items: [
      { title: "Enable", value: "true" },
      { title: "Disable", type: "reset" },
    ],
  },
};
