import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocalStorage } from '@rehooks/local-storage'

import { GET_GROUPS, GET_MESSAGES } from '../../../../srpcFunctionNames'

export const GroupList = () => {
  const [groups, setGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(null)

  const dispatch = useDispatch()

  const [jwt] = useLocalStorage('jwt')

  useEffect(() => {
    window.fetch(CONFIG.apiUrl, {
      method: 'post',
      body: JSON.stringify({ method: GET_GROUPS, params: { jwt } }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          throw new Error(result.error)
        }

        setGroups(result.groups)
      })
  }, [])

  useEffect(() => {
    window.fetch(CONFIG.apiUrl, {
      method: 'post',
      body: JSON.stringify({ method: GET_MESSAGES, params: { jwt, groupId: selectedGroupId } }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          throw new Error(result.error)
        }

        dispatch({ type: `${GET_MESSAGES}Result`, payload: { messages: result.messages } })
      })
  }, [selectedGroupId])

  return <ul>
    {
      groups.map(group => (
        <span key={group.id}>
          {group.name}
          <button onClick={() => setSelectedGroupId(group.id)}>Filter By This Group</button>
        </span>
      ))
    }
  </ul>
}
