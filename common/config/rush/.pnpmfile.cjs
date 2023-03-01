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
  // `npx update-browserslist-db@latest` do not actually work with rush setup
  // this will essentially do the same work, when the warning pops, check the
  // latest version of `caniuse-lite` package, and put it here...
  if (pkg.dependencies && pkg.dependencies['caniuse-lite']) {
    pkg.dependencies['caniuse-lite'] = '^1.0.30001458';
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
