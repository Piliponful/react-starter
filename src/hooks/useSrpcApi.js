const srpcFunctionNames = [
  'saveMessage',
  'getMessages',
  'createUser',
  'verifyUser',
  'createGroup',
  'getGroups',
  'setSelectedGroup',
  'createCompositeGroup',
  'getUserToken',
  'getCompositeGroupUserCount'
]

export const useSrpcApi = () => {
  const callSrpc = (method, params) => {
    return window.fetch(process.env.API_URL, {
      method: 'post',
      body: JSON.stringify({ method, params })
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
