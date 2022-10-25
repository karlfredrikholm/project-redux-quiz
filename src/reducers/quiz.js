import { createSlice } from '@reduxjs/toolkit'

// Change these to your own questions!
const questions = [
  { id: 1,
    questionText: 'Which book is the show Game of Thrones based on?',
    options: ['The prisoner of Azkaban', 'A Song of Ice and Fire', 'Eragon', 'House of the Dragon'],
    correctAnswerIndex: 1 },
  { id: 2,
    questionText: 'Who is Reginald Kenneth Dwight better known as?',
    options: ['Elton John', 'John Lennon', 'John Legend', 'Elon Musk'],
    correctAnswerIndex: 0 },
  { id: 3,
    questionText: 'Which song by Ed Sheeran is his most streamed one?',
    options: ['Thinking out loud', 'Shivers', 'Don`t', 'Shape of you'],
    correctAnswerIndex: 3 },
  { id: 4,
    questionText: 'For which film did Steven Spielberg win his first Oscar?',
    options: ['Saving Private Ryan', 'Indiana Jones and the Temple of Doom', 'Schindler`s List', 'Catch Me If You Can'],
    correctAnswerIndex: 2 },
  { id: 5,
    questionText: 'In the 2022 series Severance the main characters are working at a company where they get "severed" from something when they come to work. What?',
    options: ['Their feelings', 'Their memory of who they are outside of work', 'Their perception of time', 'One of their five senses'],
    correctAnswerIndex: 1 },
  { id: 6,
    questionText: 'Whitney Houston sang `I will always love you` for the Bodyguard soundtrack. Who wrote and sang the original song?',
    options: ['Celine Dion', 'Kenny Loggins', 'Aretha Franklin', 'Dolly Parton'],
    correctAnswerIndex: 3 }
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})
