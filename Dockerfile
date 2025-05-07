#----------------------------------------------------------------------------------------------
# Copyright (c) Bentley Systems, Incorporated. All rights reserved.
# Licensed under the MIT License. See LICENSE.md in the project root for license terms.
#----------------------------------------------------------------------------------------------
FROM mcr.microsoft.com/playwright:v1.46.1-jammy

# Install pnpm
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@10

# Set the work directory
WORKDIR /appui

# Copy for `pnpm install`
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY common/scripts common/scripts
COPY docs/storybook/package.json docs/storybook/
COPY e2e-tests/package.json e2e-tests/
COPY patches/ patches/
COPY apps/test-providers/package.json apps/test-providers/
COPY apps/test-app/package.json apps/test-app/
COPY tools/codemod/package.json tools/codemod/
COPY ui/appui-react/package.json ui/appui-react/
COPY ui/components-react/package.json ui/components-react/
COPY ui/core-react/package.json ui/core-react/
COPY ui/imodel-components-react/package.json ui/imodel-components-react/

# Install dependencies
RUN pnpm install

# Copy for `pnpm build`
COPY ui ui
COPY apps apps

# Build for tests
ENV IMJS_TESTS=1

# Build
RUN pnpm --filter e2e-tests... build

# Copy for `playwright`
COPY e2e-tests e2e-tests

# Set the work directory
WORKDIR /appui/e2e-tests
