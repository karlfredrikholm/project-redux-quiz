import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #3f55a5;
  font-family: 'Montserrat', sans-serif;
  padding-bottom: .8rem;

  & progress {
    height: 3rem;
    width: 25rem;
    transition: all 500ms ease;
  }
`

export const ProgressBar = () => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  return (
    <ProgressContainer>
      <progress
        id="progress"
        value={question.id}
        max="11" />
      <label htmlFor="progress">{question.id} / 10
      </label>
    </ProgressContainer>
  )
}