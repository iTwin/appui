/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LocalImport } from './routes/local'
import { Route as BriefcaseImport } from './routes/briefcase'
import { Route as BlankImport } from './routes/blank'
import { Route as LocalFileNameImport } from './routes/local_.$fileName'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const LocalRoute = LocalImport.update({
  path: '/local',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/local.lazy').then((d) => d.Route))

const BriefcaseRoute = BriefcaseImport.update({
  path: '/briefcase',
  getParentRoute: () => rootRoute,
} as any)

const BlankRoute = BlankImport.update({
  path: '/blank',
  getParentRoute: () => rootRoute,
} as any)

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
    '/blank': {
      id: '/blank'
      path: '/blank'
      fullPath: '/blank'
      preLoaderRoute: typeof BlankImport
      parentRoute: typeof rootRoute
    }
    '/briefcase': {
      id: '/briefcase'
      path: '/briefcase'
      fullPath: '/briefcase'
      preLoaderRoute: typeof BriefcaseImport
      parentRoute: typeof rootRoute
    }
    '/local': {
      id: '/local'
      path: '/local'
      fullPath: '/local'
      preLoaderRoute: typeof LocalImport
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
  BlankRoute,
  BriefcaseRoute,
  LocalRoute,
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
        "/blank",
        "/briefcase",
        "/local",
        "/local/$fileName"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/blank": {
      "filePath": "blank.tsx"
    },
    "/briefcase": {
      "filePath": "briefcase.tsx"
    },
    "/local": {
      "filePath": "local.tsx"
    },
    "/local/$fileName": {
      "filePath": "local_.$fileName.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
