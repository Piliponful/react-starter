import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'
import { useLocalStorage } from '@rehooks/local-storage'
import decodeJwt from 'jwt-decode'
import projectXUI from 'project-x-ui'

import HideHOC from '../../../HideHOC'

import { GET_MESSAGES, SAVE_MESSAGE } from '../../../../srpcFunctionNames'
import { CREATE_GROUP } from '../../../../actions/groups'

const { leafs: { QuestionCard } } = projectXUI

const MessageList = ({ messageColumn }) => {
  const messages = useSelector(state => state.messages)

  const [jwt] = useLocalStorage('jwt')

  const { userId } = decodeJwt(jwt)

  const dispatch = useDispatch()
  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)
  const dispatchGetMessages = () => dispatchSrpcCall(GET_MESSAGES, { jwt, messageColumn })
  const dispatchCreateGroup = (messageId, content) =>
    dispatch({
      type: CREATE_GROUP, payload: { group: { messageId, content, userCount: messages.find(m => m.id === messageId).answersCount[content] } }
    })
  const dispatchSaveMessage = (messageId, content) => dispatchSrpcCall(SAVE_MESSAGE, { jwt, content, parentMessageId: messageId })

  useEffect(() => {
    dispatchGetMessages()
  }, [])

  return <>{(messages[messageColumn] || [])
    .map(m => <QuestionCard
      key={m.id}
      name={m.content}
      answersCount={m.answersCount}
      currentUserAnswer={m.currentUserAnswer}
      respond={content => dispatchSaveMessage(m.id, content)}
      createNewGroup={content => dispatchCreateGroup(m.id, content)}
      yourOwnQuestion={userId === m.userId}
    />)
  }</>
}

export default HideHOC('hideMessageList')(MessageList)
