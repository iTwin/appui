#----------------------------------------------------------------------------------------------
# Copyright (c) Bentley Systems, Incorporated. All rights reserved.
# Licensed under the MIT License. See LICENSE.md in the project root for license terms.
#----------------------------------------------------------------------------------------------
FROM mcr.microsoft.com/playwright:v1.41.2-jammy

# Install rush
RUN npm install -g @microsoft/rush

# Copy local files (see `Dockerfile.dockerignore` for skipped files)
COPY . /appui

# Set the work directory
WORKDIR appui/e2e-tests

# Install dependencies
RUN rush install --to e2e-tests

# Build
RUN rush build --to e2e-tests
