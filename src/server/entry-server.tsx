import { renderToString } from 'react-dom/server'
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router'
import { HeroUIProvider, ToastProvider } from '@heroui/react'

import { routes } from '../client/routes'

import '../client/styles.css'

function createFetchRequest(req, res) {
  const origin = `${req.protocol}://${req.get('host')}`
  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()
  res.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values as string)
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}

export async function render(req, res, {}) {
  const { query, dataRoutes } = createStaticHandler(routes)
  const remixRequest = createFetchRequest(req, res)
  const context = await query(remixRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  const html = renderToString(
    <HeroUIProvider>
      <ToastProvider />
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </HeroUIProvider>
  )

  return { html }
}
