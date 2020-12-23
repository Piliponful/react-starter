import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'

import HideHOC from '../../../HideHOC'

import { GET_GROUPS, SET_SELECTED_GROUP } from '../../../../srpcFunctionNames'

const GroupList = () => {
  const [groups, setGroups] = useState([])

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

  const setSelectedGroup = groupId => {
    window.fetch(CONFIG.apiUrl, {
      method: 'post',
      body: JSON.stringify({ method: SET_SELECTED_GROUP, params: { jwt, groupId } }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          throw new Error(result.error)
        }
      })
  }

  return <ul>
    {
      groups.map(group => (
        <span key={group.id}>
          {group.name}
          <button onClick={() => setSelectedGroup(group.id)}>Filter By This Group</button>
        </span>
      ))
    }
  </ul>
}

export default HideHOC('hideGroupList')(GroupList)
