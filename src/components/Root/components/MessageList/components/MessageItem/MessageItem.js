import React from 'react'

import BinaryResponse from './components/BinaryResponse'

export default ({
  message,
  selectedResponse
}) => (
  <li>
    {message.content}
    <BinaryResponse messageId={message.id} selectedResponse={selectedResponse} />
  </li>
)
