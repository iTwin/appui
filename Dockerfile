#----------------------------------------------------------------------------------------------
# Copyright (c) Bentley Systems, Incorporated. All rights reserved.
# Licensed under the MIT License. See LICENSE.md in the project root for license terms.
#----------------------------------------------------------------------------------------------
FROM mcr.microsoft.com/playwright:v1.41.2-jammy

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
COPY apps/test-providers/package.json apps/test-providers/
COPY apps/test-app/package.json apps/test-app/
COPY tools/codemod/package.json tools/codemod/
COPY ui/appui-react/package.json ui/appui-react/
COPY ui/components-react/package.json ui/components-react/
COPY ui/core-react/package.json ui/core-react/
COPY ui/imodel-components-react/package.json ui/imodel-components-react/

# Install dependencies
RUN rush install --to e2e-tests

# Copy for `rush build`
COPY ui ui
COPY apps apps

# Build
RUN rush build --to e2e-tests

# Copy for `playwright`
COPY e2e-tests e2e-tests

# Set the work directory
WORKDIR /appui/e2e-tests
