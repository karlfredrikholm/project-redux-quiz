/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { quiz } from 'reducers/quiz'
import { ProgressBar } from './ProgressBar';
import { Button } from './StyledComponents/Button';
import { ButtonContainer } from './StyledComponents/ButtonContainer';

export const HeadLineContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const QuestionHeadline = styled.h1`
  color: #3f55a5;
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  padding: 0 1.5rem;
`

export const Question = () => {
  const [disabled, setDisabled] = useState(false);
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answer = useSelector(
    (state) => state.quiz.answers.find((a) => (a.questionId === question.id))
  )
  const dispatch = useDispatch();
  console.log(question);

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  const onAnswerSubmit = (questionId, answerIndex) => {
    dispatch(quiz.actions.submitAnswer({ questionId, answerIndex }))
    setDisabled(true);

    setTimeout(() => {
      dispatch(quiz.actions.goToNextQuestion())
      setDisabled(false)
    }, 1500);
  }

  const changeBgButton = (answerIndex) => {
    if (!answer) {
      return false
    } else if (question.correctAnswerIndex === answerIndex) {
      return '#ACD1AF'
    } else if (question.correctAnswerIndex !== answerIndex) {
      return '#F47174'
    }
  }

  return (
    <>
      <HeadLineContainer>
        <QuestionHeadline>{question.questionText}</QuestionHeadline>
      </HeadLineContainer>
      <ButtonContainer>
        {question.options.map((option, index) => {
          return <Button background={changeBgButton(index)} disabled={disabled} onClick={() => onAnswerSubmit(question.id, index)} key={option} type="button">{option}</Button>
        })}
      </ButtonContainer>
      <ProgressBar />
    </>
  )
}