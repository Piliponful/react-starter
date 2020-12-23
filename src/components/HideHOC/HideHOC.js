import React from 'react'
import { useSelector } from 'react-redux'

export const HideHOC = fieldName => Component => props => {
  const hideComponent = useSelector(state => state.components[fieldName])

  if (hideComponent) {
    return null
  }

  return <Component {...props} />
}
