import { hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { HeroUIProvider, ToastProvider } from '@heroui/react'

import { routes } from './routes'

import './styles.css'

const router = createBrowserRouter(routes, {
  hydrationData: window.__staticRouterHydrationData,
})

hydrateRoot(
  document.querySelector('#app'),
  <HeroUIProvider>
    <ToastProvider />
    <RouterProvider router={router} />
  </HeroUIProvider>
)
