/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const packageDir = process.cwd();
const packageFilePath = path.join(packageDir, "package.json");

const packageContent = fs.readFileSync(packageFilePath, { encoding: "utf8" });
const packageJson = JSON.parse(packageContent);

// Set the package.json to commonjs
packageJson.type = "commonjs";
const cjsPackageContent = JSON.stringify(packageJson, null, 2);
fs.writeFileSync(packageFilePath, cjsPackageContent);

// Run tsc with the provided arguments
const [_0, _1, ...tscArgs] = process.argv;
spawnSync("tsc", tscArgs, { stdio: "inherit" });

// Restore the original package.json
fs.writeFileSync(packageFilePath, packageContent);
