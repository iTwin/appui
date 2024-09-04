#----------------------------------------------------------------------------------------------
# Copyright (c) Bentley Systems, Incorporated. All rights reserved.
# Licensed under the MIT License. See LICENSE.md in the project root for license terms.
#----------------------------------------------------------------------------------------------
FROM mcr.microsoft.com/playwright:v1.46.1-jammy

# Install rush
RUN npm install -g @microsoft/rush

# Set the work directory
WORKDIR appui

# Copy for `rush install`
COPY rush.json ./
COPY common/autoinstallers common/autoinstallers
COPY common/scripts common/scripts
COPY common/config common/config
COPY docs/storybook/package.json docs/storybook/
COPY e2e-tests/package.json e2e-tests/
COPY test-apps/appui-test-app/appui-test-providers/package.json test-apps/appui-test-app/appui-test-providers/
COPY test-apps/appui-test-app/connected/package.json test-apps/appui-test-app/connected/
COPY test-apps/appui-test-app/standalone/package.json test-apps/appui-test-app/standalone/
COPY tools/codemod/package.json tools/codemod/
COPY ui/appui-react/package.json ui/appui-react/
COPY ui/components-react/package.json ui/components-react/
COPY ui/core-react/package.json ui/core-react/
COPY ui/imodel-components-react/package.json ui/imodel-components-react/

# Install dependencies
RUN rush install --to e2e-tests

# Copy for `rush build`
COPY ui ui
COPY test-apps test-apps

# Build
RUN rush build --to e2e-tests

# Copy for `playwright`
COPY e2e-tests e2e-tests

# Set the work directory
WORKDIR /appui/e2e-tests
