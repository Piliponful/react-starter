const initialState = []

export default (state = initialState, action = {}) => {
  const { type: functionName, payload: returnValue = {} } = action
  const { message, messages } = returnValue

  const updateStateByFunctionName = {
    saveMessageResult: () => ([...state, message]),
    getMessagesResult: () => messages
  }

  // default action handler just returns state unmodified
  const actionHandler = updateStateByFunctionName[functionName] || (() => state)
  return actionHandler()
}
