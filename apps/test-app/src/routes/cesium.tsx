/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createFileRoute } from '@tanstack/react-router'
import { appInitializer } from '../frontend/AppInitializer'
import {
  createBlankConnection,
  createBlankViewState,
} from '@itwin/appui-test-providers'
import { UiFramework } from '@itwin/appui-react'
import { AppParams } from '../frontend/SearchParams'
import { registerFrontstages } from '../frontend/registerFrontstages'

export const Route = createFileRoute('/cesium')({
  loader: async () => {
    await appInitializer.initialize()

    const iModelConnection = createBlankConnection()
    const viewState = createBlankViewState(iModelConnection)

    registerFrontstages({ iModelConnection, viewState })
    UiFramework.setIModelConnection(iModelConnection)
    UiFramework.setDefaultViewState(viewState)
  },
  validateSearch: (search: AppParams) => {
    return search
  },
  shouldReload: (ctx) => {
    return ctx.cause === 'enter'
  },
  gcTime: 0,
})
