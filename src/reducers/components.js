import { INITIALIZATION, HIDE_GROUP_COMPOSITION } from '../actions/components'

const initialState = {
  hideAuthorizationScreen: false,
  hideAuthorizedScreen: true,
  hideGroupComposition: true
}

export default (state = initialState, action = {}) => {
  const { type, payload } = action

  const updateStateByFunctionName = {
    [INITIALIZATION]: () => {
      const isJWTPresent = Boolean(payload.jwt)

      return ({
        ...state,
        hideAuthorizedScreen: !isJWTPresent,
        hideAuthorizationScreen: isJWTPresent
      })
    },
    [HIDE_GROUP_COMPOSITION]: () => ({ ...state, showGroupComposition: payload })
  }

  const actionHandler = updateStateByFunctionName[type] || (() => state)
  return actionHandler()
}
