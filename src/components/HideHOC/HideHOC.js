import React from 'react'
import { useSelector } from 'react-redux'

export const HideHOC = fieldName => Component => props => {
  const hideMessageList = useSelector(state => state.components[fieldName])

  if (hideMessageList) {
    return () => null
  }

  return <Component {...props} />
}
