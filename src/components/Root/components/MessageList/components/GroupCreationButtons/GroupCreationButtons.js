import React from 'react'

import { useDispatch } from 'react-redux'

import { CREATE_GROUP } from '../../../../../../actions/groups'

export const GroupCreationButtons = ({ messageId }) => {
  const dispatch = useDispatch()

  const dispatchCreateGroup = content => dispatch({ type: CREATE_GROUP, payload: { group: { messageId, content } } })

  return (
    <span>
      <button onClick={() => dispatchCreateGroup('Yes')}>Create Group that answered Yes</button>
      <button onClick={() => dispatchCreateGroup('No')}>Create Group that answered No</button>
    </span>
  )
}
