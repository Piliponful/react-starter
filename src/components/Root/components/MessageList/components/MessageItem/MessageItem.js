import React from 'react'

import BinaryResponse from './components/BinaryResponse'

export default ({ message }) => <li>{message.content}<BinaryResponse messageId={message.id} /></li>
