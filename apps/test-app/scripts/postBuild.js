/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from "node:fs";

try {
  fs.writeFileSync("lib/package.json", '{ "type": "commonjs" }');
} catch (e) {
  console.error("Cannot create package.json", e);
}
