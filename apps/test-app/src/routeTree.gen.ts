/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SigninCallbackImport } from './routes/signin-callback'
import { Route as LocalImport } from './routes/local'
import { Route as ITwinsImport } from './routes/iTwins'
import { Route as BriefcaseImport } from './routes/briefcase'
import { Route as BlankImport } from './routes/blank'
import { Route as LocalFileNameImport } from './routes/local_.$fileName'
import { Route as ITwinITwinIdImport } from './routes/iTwin_.$iTwinId'
import { Route as ITwinITwinIdIModelIModelIdImport } from './routes/iTwin.$iTwinId.iModel.$iModelId'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const SigninCallbackRoute = SigninCallbackImport.update({
  path: '/signin-callback',
  getParentRoute: () => rootRoute,
} as any)

const LocalRoute = LocalImport.update({
  path: '/local',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/local.lazy').then((d) => d.Route))

const ITwinsRoute = ITwinsImport.update({
  path: '/iTwins',
  getParentRoute: () => rootRoute,
} as any)

const BriefcaseRoute = BriefcaseImport.update({
  path: '/briefcase',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/briefcase.lazy').then((d) => d.Route))

const BlankRoute = BlankImport.update({
  path: '/blank',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/blank.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const LocalFileNameRoute = LocalFileNameImport.update({
  path: '/local/$fileName',
  getParentRoute: () => rootRoute,
} as any)

const ITwinITwinIdRoute = ITwinITwinIdImport.update({
  path: '/iTwin/$iTwinId',
  getParentRoute: () => rootRoute,
} as any)

const ITwinITwinIdIModelIModelIdRoute = ITwinITwinIdIModelIModelIdImport.update(
  {
    path: '/iTwin/$iTwinId/iModel/$iModelId',
    getParentRoute: () => rootRoute,
  } as any,
)

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
    '/iTwins': {
      id: '/iTwins'
      path: '/iTwins'
      fullPath: '/iTwins'
      preLoaderRoute: typeof ITwinsImport
      parentRoute: typeof rootRoute
    }
    '/local': {
      id: '/local'
      path: '/local'
      fullPath: '/local'
      preLoaderRoute: typeof LocalImport
      parentRoute: typeof rootRoute
    }
    '/signin-callback': {
      id: '/signin-callback'
      path: '/signin-callback'
      fullPath: '/signin-callback'
      preLoaderRoute: typeof SigninCallbackImport
      parentRoute: typeof rootRoute
    }
    '/iTwin/$iTwinId': {
      id: '/iTwin/$iTwinId'
      path: '/iTwin/$iTwinId'
      fullPath: '/iTwin/$iTwinId'
      preLoaderRoute: typeof ITwinITwinIdImport
      parentRoute: typeof rootRoute
    }
    '/local/$fileName': {
      id: '/local/$fileName'
      path: '/local/$fileName'
      fullPath: '/local/$fileName'
      preLoaderRoute: typeof LocalFileNameImport
      parentRoute: typeof rootRoute
    }
    '/iTwin/$iTwinId/iModel/$iModelId': {
      id: '/iTwin/$iTwinId/iModel/$iModelId'
      path: '/iTwin/$iTwinId/iModel/$iModelId'
      fullPath: '/iTwin/$iTwinId/iModel/$iModelId'
      preLoaderRoute: typeof ITwinITwinIdIModelIModelIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  BlankRoute,
  BriefcaseRoute,
  ITwinsRoute,
  LocalRoute,
  SigninCallbackRoute,
  ITwinITwinIdRoute,
  LocalFileNameRoute,
  ITwinITwinIdIModelIModelIdRoute,
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
        "/iTwins",
        "/local",
        "/signin-callback",
        "/iTwin/$iTwinId",
        "/local/$fileName",
        "/iTwin/$iTwinId/iModel/$iModelId"
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
    "/iTwins": {
      "filePath": "iTwins.tsx"
    },
    "/local": {
      "filePath": "local.tsx"
    },
    "/signin-callback": {
      "filePath": "signin-callback.tsx"
    },
    "/iTwin/$iTwinId": {
      "filePath": "iTwin_.$iTwinId.tsx"
    },
    "/local/$fileName": {
      "filePath": "local_.$fileName.tsx"
    },
    "/iTwin/$iTwinId/iModel/$iModelId": {
      "filePath": "iTwin.$iTwinId.iModel.$iModelId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
