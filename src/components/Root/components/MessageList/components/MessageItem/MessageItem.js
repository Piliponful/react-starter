import React from 'react'

import BinaryResponse from './components/BinaryResponse'

export const MessageItem = ({
  message,
  selectedResponse
}) => (
  <li>
    {message.content}
    <BinaryResponse messageId={message.id} selectedResponse={selectedResponse} />
    {selectedResponse ? `Your response: ${selectedResponse}` : null}
  </li>
)
