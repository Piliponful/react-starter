const initialState = { jwt: null }

export default (state = initialState, action = {}) => {
  const { type, payload = {} } = action
  const { jwt } = payload

  const typeToFunc = {
    'createUserResult': () => ({ jwt })
  }

  // default action handler just returns state unmodified
  const actionHandler = typeToFunc[type] || (() => state)
  return actionHandler()
}
