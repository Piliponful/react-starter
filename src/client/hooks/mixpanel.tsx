import React, { createContext, useContext, useEffect, useRef } from 'react'

interface MixpanelContextType {
  mixpanel: React.RefObject<any>
}

const MixpanelContext = createContext<MixpanelContextType | null>(null)

const mock = {
  identify: () => {
    // console.log('mock mixpanel identify for local')
  },
  track: event => {
    // console.log(`mock mixpanel track for local, event: ${event}`)
  },
  people: {
    set: () => {
      // console.log('mock mixpanel people.set for local')
    },
  },
}

export const MixpanelProvider = ({ children }) => {
  const mixpanelRef = useRef(null)
  useEffect(() => {
    const main = async () => {
      if (import.meta.env.VITE_HOST === 'poll.cc') {
        // Import Mixpanel SDK
        const mixpanel = (await import('mixpanel-browser')).default

        // Near entry of your product, init Mixpanel
        mixpanel.init('18286ddb7a0f100b017feae63a1e08fd', {
          track_pageview: 'url-with-path',
          persistence: 'localStorage',
        })
        mixpanelRef.current = mixpanel
        window.mixpanel = mixpanel
      } else {
        mixpanelRef.current = mock
        window.mixpanel = mock
      }
    }
    main()
  }, [])

  return (
    <MixpanelContext.Provider value={{ mixpanel: mixpanelRef }}>
      {children}
    </MixpanelContext.Provider>
  )
}

export const useMixpanel = () => {
  const context = useContext(MixpanelContext)
  if (!context) {
    throw new Error('useMixpanel must be used within a MixpanelProvider')
  }
  return context
}
