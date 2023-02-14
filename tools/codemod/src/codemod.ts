#!/usr/bin/env node

/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import * as path from "path";
import * as yargs from "yargs";
import { run as jscodeshift } from "jscodeshift/src/Runner";
import type { Options } from "jscodeshift";

async function run(definition: string, paths: string[], optionOverrides: Options) {
  const transformFile = path.resolve(__dirname, "..", "transforms", "typed-transforms.ts");

  const options = {
    extensions: "ts,tsx",
    parser: "ts",
    babel: true,
    verbose: 1,
    definition,
    ...optionOverrides,
  };
  await jscodeshift(transformFile, paths, options);
}

yargs
  .command({
    command: "$0 <definition> <paths...>",
    describe: "Applies a `@itwin/appui-codemod` to the specified paths",
    builder: (command) => {
      return command
        .positional("definition", {
          description: "Path to a definition file",
          type: "string",
          demandOption: true,
        })
        .positional("paths", {
          description: "Paths forwarded to `jscodeshift`",
          type: "string",
          array: true,
          demandOption: true,
        })
    },
    handler: (argv) => {
      const { definition, paths, _, $0, ...options } = argv;
      return run(
        definition,
        paths,
        options,
      );
    },
  })
  .scriptName("npx @itwin/appui-codemod")
  .example("$0 ./appui-4.0.json src", "")
  .help()
  .parse();
