import React from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import decodeJwt from 'jwt-decode'

import BinaryResponse from './components/BinaryResponse'

export const MessageItem = ({
  message,
  selectedResponse
}) => {
  const [jwt] = useLocalStorage('jwt')

  const { userId } = decodeJwt(jwt)

  return (
    <li>
      {message.content}
      {message.userId !== userId ? <BinaryResponse messageId={message.id} selectedResponse={selectedResponse} /> : null}
      {selectedResponse ? `Your response: ${selectedResponse}` : null}
    </li>
  )
}
