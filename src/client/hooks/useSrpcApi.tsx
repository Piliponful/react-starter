import { isObject } from 'lodash-es'
import { addToast } from '@heroui/react'

const srpcFunctionNames = []

export const useSrpcApi = () => {
  const callSrpc = (
    method: string,
    params: Record<string, any>,
    needToThrow: boolean = false
  ): Promise<any> => {
    const jwt = localStorage.getItem('jwt')
    return fetch(import.meta.env.VITE_API_URL, {
      method: 'post',
      body: JSON.stringify({ method, params: { ...params, jwt } }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.error || !result.success) {
          const message =
            (isObject(result.error) ? result.error.message : result.error) ||
            'Internal Server Error'
          if (needToThrow) {
            throw new Error(result.error || 'Internal Server Error')
          } else {
            addToast({
              title: 'Error',
              description: message,
              color: 'danger',
              timeout: 5000000,
            })
          }
        }

        return result
      })
  }

  return Object.fromEntries(
    srpcFunctionNames.map(i => [
      i,
      (params: Record<string, any> = {}, needToThrow: boolean = false) =>
        callSrpc(i, params, needToThrow),
    ])
  )
}
