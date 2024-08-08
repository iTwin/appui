/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LocalFileNameImport } from './routes/local_.$fileName'

// Create Virtual Routes

const LocalLazyImport = createFileRoute('/local')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const LocalLazyRoute = LocalLazyImport.update({
  path: '/local',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/local.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const LocalFileNameRoute = LocalFileNameImport.update({
  path: '/local/$fileName',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/local': {
      id: '/local'
      path: '/local'
      fullPath: '/local'
      preLoaderRoute: typeof LocalLazyImport
      parentRoute: typeof rootRoute
    }
    '/local/$fileName': {
      id: '/local/$fileName'
      path: '/local/$fileName'
      fullPath: '/local/$fileName'
      preLoaderRoute: typeof LocalFileNameImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  LocalLazyRoute,
  LocalFileNameRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/local",
        "/local/$fileName"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/local": {
      "filePath": "local.lazy.tsx"
    },
    "/local/$fileName": {
      "filePath": "local_.$fileName.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
