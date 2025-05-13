import { Navigate } from 'react-router'

import { Landing } from './components/Landing'

export const routes = [
  {
    index: true,
    element: <Landing />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]
