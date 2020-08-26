import { HIDE_SIGNUP, HIDE_MESSAGE_INPUT, HIDE_MESSAGE_LIST } from '../actions/components'
import { INITIALIZATION } from '../actions/misc'

const initialState = {
  hideSignUp: false,
  hideMessageInput: true,
  hideMessageList: true,
  hideGroupList: true
}

export default (state = initialState, action = {}) => {
  const { type, payload } = action

  const updateStateByFunctionName = {
    [HIDE_SIGNUP]: () => ({ ...state, hideSignUp: payload }),
    [HIDE_MESSAGE_INPUT]: () => ({ ...state, hideMessageInput: payload }),
    [HIDE_MESSAGE_LIST]: () => ({ ...state, hideMessageList: payload }),
    [INITIALIZATION]: () => {
      const isJWTPresent = Boolean(payload.jwt)

      return ({
        hideSignUp: isJWTPresent,
        hideMessageInput: !isJWTPresent,
        hideMessageList: !isJWTPresent,
        hideGroupList: !isJWTPresent
      })
    }
  }

  const actionHandler = updateStateByFunctionName[type] || (() => state)
  return actionHandler()
}
