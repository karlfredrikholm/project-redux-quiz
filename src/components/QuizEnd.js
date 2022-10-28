import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
// import { StartPage } from './StartPage'
import { quiz } from 'reducers/quiz'
import { ImCross, ImCheckmark } from 'react-icons/im'
import { Button } from './StyledComponents/Button'

export const EndTitle = styled.h1`
font-family: 'Montserrat', sans-serif;
color: #3f55a5;
`

export const EndText = styled.p`
font-family: 'Montserrat', sans-serif;
font-size: ${(props) => (props.large ? '23px' : '19px')};
font-weight: bold;
color: #3f55a5;
`

export const QuizEnd = () => {
  const dispatch = useDispatch()
  const selectedAnswer = useSelector((state) => state.quiz.answers)
  console.log(selectedAnswer)
  return (
    <div>
      <EndTitle>Thanks for playing!</EndTitle>
      {selectedAnswer.map((item) => {
        /* eslint-disable-next-line max-len */
        return <EndText key={item.answer}>{item.isCorrect ? <ImCheckmark color="#ACD1AF" /> : <ImCross color="#F47174" />} {item.answer}</EndText>
      })}
      <EndText large>Want to play again?</EndText>
      <Button type="button" onClick={() => dispatch(quiz.actions.restart())}>Restart</Button>
    </div>
  )
}