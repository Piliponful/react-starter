interface Window {
  mixpanel: {
    track: (event: string, properties?: Record<string, any>) => void
  }
  gtag: (command: string, event: string, params: Record<string, any>) => void
  __staticRouterHydrationData: any
}
