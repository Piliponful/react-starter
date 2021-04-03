import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from '@rehooks/local-storage'
import decodeJwt from 'jwt-decode'
import projectXUI from 'project-x-ui'

import { useSrpcApi } from '../../../../../../hooks/useSrpcApi'

import { SET_NEW_GROUP } from '../../../../../../actions/newGroup'

const { leafs: { QuestionCard } } = projectXUI

export const MessageList = ({ messageColumn }) => {
  const [messages, setMessages] = useState([])
  const selectedGroupId = useSelector(state => state.selectedGroupId)
  const selectedForComposition = useSelector(state => state.selectedForCompositionGroupIds)
  const dispatch = useDispatch()

  const [jwt] = useLocalStorage('jwt')

  const { userId } = decodeJwt(jwt)

  const srpcApi = useSrpcApi()

  useEffect(() => {
    srpcApi.getMessages({ jwt, messageColumn }).then(({ messages }) => setMessages(messages))
  }, [selectedGroupId])

  const createGroup = (messageId, content) => {
    if (selectedForComposition.length !== 0) {
      return
    }

    const newGroup = {
      messageId,
      content,
      userCount: messages.find(m => m.id === messageId).answersCount[content]
    }

    dispatch({
      type: SET_NEW_GROUP,
      payload: newGroup
    })
  }

  const respond = (messageId, content) => {
    srpcApi.saveMessage({ jwt, content, parentMessageId: messageId })
    setMessages(messages.map(m => m.id === messageId ? ({ ...m, currentUserAnswer: content }) : m))
  }

  return (
    <>
      {messages.map(m =>
        (
          <QuestionCard
            key={m.id}
            name={m.content}
            answersCount={m.answersCount}
            currentUserAnswer={m.currentUserAnswer}
            respond={content => respond(m.id, content)}
            createNewGroup={content => createGroup(m.id, content)}
            yourOwnQuestion={userId === m.userId}
          />
        )
      )}
    </>
  )
}
