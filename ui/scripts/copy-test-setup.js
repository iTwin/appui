/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
const fs = require("fs");
const path = require("path");
fs.copyFileSync(path.join(__dirname, "setup-tests.js"), path.join(process.cwd(), "lib", "test", "setup.js"));