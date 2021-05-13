import React, { useContext } from 'react'
import projectXUI from 'project-x-ui'
import { useLocalStorage } from '@rehooks/local-storage'

import MessageInput from './components/MessageInput'
import MessageList from './components/MessageList'
import GroupList from './components/GroupList'
import GroupComposition from './components/GroupComposition'
import ActionsPanel from './components/ActionsPanel'

const { shallow: { Sidebar, MainScreen, QuestionCardsRow, GroupsContainer }, context: { MainScreenSwipeContext } } = projectXUI

const MainScreenWithQuestions = () => (
  <MainScreen>
    <QuestionCardsRow title='Most answered'>
      <MessageList messageColumn='mostAnswered' />
    </QuestionCardsRow>
    <QuestionCardsRow title='Unanimous'>
      <MessageList messageColumn='unanimous' />
    </QuestionCardsRow>
    <QuestionCardsRow title='Latest'>
      <MessageList messageColumn='latest' />
    </QuestionCardsRow>
  </MainScreen>
)

const SidebarWithGroups = () => (
  <Sidebar title='Groups'>
    <GroupComposition />
    <GroupsContainer>
      <GroupList />
    </GroupsContainer>
    <MessageInput />
    <ActionsPanel />
  </Sidebar>
)

const SidebarWithQuestions = () => (
  <Sidebar title='Questions'>
    <MessageList messageColumn='mostAnswered' />
  </Sidebar>
)

export const AuthorizedScreen = () => {
  const [jwt] = useLocalStorage('jwt')

  if (!jwt) {
    return null
  }

  const { mainScreen } = useContext(MainScreenSwipeContext)

  return (
    <>
      {mainScreen ? <SidebarWithGroups /> : <SidebarWithQuestions />}
      {mainScreen ? <MainScreenWithQuestions /> : null}
    </>
  )
}
