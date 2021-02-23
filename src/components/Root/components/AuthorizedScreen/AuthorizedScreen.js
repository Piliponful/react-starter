import React from 'react'
import projectXUI from 'project-x-ui'

import HideHOC from '../../../HideHOC'

import MessageInput from './components/MessageInput'
import MessageList from './components/MessageList'
import GroupList from './components/GroupList'
import GroupComposition from './components/GroupComposition'

const { shallow: { Sidebar, MainScreen, QuestionCardsRow, GroupsContainer } } = projectXUI

const AuthorizedScreen = () => (
  <>
    <Sidebar>
      <GroupComposition />
      <GroupsContainer>
        <GroupList />
      </GroupsContainer>
      <MessageInput />
    </Sidebar>
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
  </>
)

export default HideHOC('hideAuthorizedScreen')(AuthorizedScreen)
