const initialState = {
  messages: []
}

export default (state = initialState, action = {}) => {
  const { type, payload = {} } = action
  const { message, messages } = payload

  const typeToFunc = {
    'saveMessageResult': () => ({ ...state, messages: [...state.messages, message] }),
    'getMessagesResult': () => ({ ...state, messages })
  }

  // default action handler just returns state unmodified
  const actionHandler = typeToFunc[type] || (() => state)
  return actionHandler()
}
