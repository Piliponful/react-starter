const srpcFunctionNames = [
  'saveMessage',
  'getMessages',
  'createUser',
  'verifyUser',
  'createGroup',
  'getGroups',
  'setSelectedGroup',
  'createCompositeGroup',
  'getUserToken'
]

export const useSrpcApi = () => {
  const callSrpc = (method, params) => {
    return window.fetch('/api', {
      method: 'post',
      body: JSON.stringify({ method, params }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        const result = response.json()

        if (result.error) {
          throw new Error(result.error)
        }

        return result
      })
  }

  return Object.fromEntries(srpcFunctionNames.map(i => [i, params => callSrpc(i, params)]))
}