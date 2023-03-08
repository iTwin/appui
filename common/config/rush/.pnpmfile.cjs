const forcedDep = {};
// Until iTwin.js 4.0 is actually released and we have proper versions range in packages.
[
  [[
    "@itwin/appui-abstract",
    "@itwin/build-tools",
    "@itwin/core-backend",
    "@itwin/core-bentley",
    "@itwin/core-common",
    "@itwin/core-electron",
    "@itwin/core-frontend",
    "@itwin/core-geometry",
    "@itwin/core-i18n",
    "@itwin/core-markup",
    "@itwin/core-mobile",
    "@itwin/core-orbitgt",
    "@itwin/core-quantity",
    "@itwin/core-telemetry",
    "@itwin/core-webpack-tools",
    "@itwin/ecschema-metadata",
    "@itwin/ecschema-rpcinterface-common",
    "@itwin/ecschema-rpcinterface-impl",
    "@itwin/editor-frontend",
    "@itwin/editor-backend",
    "@itwin/editor-common",
    "@itwin/express-server",
    "@itwin/frontend-devtools",
    "@itwin/hypermodeling-frontend",
    "@itwin/map-layers",
    "@itwin/map-layers-auth",
    "@itwin/presentation-common",
    "@itwin/webgl-compatibility",
  ], "4.0.0-dev.37"],
  [["@itwin/electron-authorization"], "^0.11.0"],
  [[
    "@itwin/imodels-access-backend",
    "@itwin/imodels-access-frontend",
    "@itwin/imodels-client-authoring",
    "@itwin/imodels-client-management",
  ], "^3.0.0"],
  [["electron"], "^23.0.0"],
// Build an object with keys with the above
// { "@itwin/appui-abstract": "4.0.0-dev.37",
//      ...
//   "electron": "^23.0.0"}
].forEach(versions => {
  const v = versions[1];
  versions[0].forEach(p => forcedDep[p] = v)
});

function readPackage(pkg) {
  if (
    (pkg.name == "typedoc" || pkg.name == "@microsoft/api-extractor") &&
    pkg.dependencies &&
    pkg.dependencies["typescript"]
  ) {
    pkg.dependencies["typescript"] = "~4.4.0";
  }

  // Hacky mess: For external packages to this monorepo that have peer dependencies on packages
  // in this repo, we need to do some magic in order to get the peerDeps to point to a correct
  // version of the packages. Update the pkg.json real dependency list to
  // Note that these dependencies are only ever allowed for testing purposes and should not be the
  // dependency of any published packages.
  else if (pkg.name == "@itwin/map-layers") {
    pkg.dependencies["@itwin/appui-layout-react"] = "workspace:*";
    pkg.dependencies["@itwin/appui-react"] = "workspace:*";
    pkg.dependencies["@itwin/components-react"] = "workspace:*";
    pkg.dependencies["@itwin/core-react"] = "workspace:*"
    pkg.dependencies["@itwin/imodel-components-react"] = "workspace:*";
  }

  for(const dep of Object.keys(forcedDep)) {
    if(pkg.dependencies?.[dep]) {
      pkg.dependencies[dep] = forcedDep[dep];
    }
    if(pkg.devDependencies?.[dep]) {
      pkg.devDependencies[dep] = forcedDep[dep];
    }
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
