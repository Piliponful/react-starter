import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocalStorage } from '@rehooks/local-storage'

import { GET_GROUPS } from '../../../../srpcFunctionNames'

export const GroupList = () => {
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

  const hideGroupList = useSelector(state => state.components.hideGroupList)

  if (hideGroupList) {
    return null
  }

  return <ul>{groups.map(group => group.name)}</ul>
}
