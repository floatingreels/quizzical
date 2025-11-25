import { useState } from 'react'
import Question from '../components/Question.jsx'

export default function Quiz(props) {

    const [score, setScore] = useState("")
    const [guesses, setGuesses] = useState(Array.apply(null, Array(5)).map(function () {})) //initialise array with values (undefined) so iterations are possible


  const questionElements = props.data.map((q, i) => {
    const question = {...q, index: i}
    return <Question 
                key={question.id} 
                question={question}
                guess={guesses[i]}
                setGuesses={setGuesses}
                scored={score.length > 0}
              />
      }
  )

  function handleSubmitForm(event) {
    event.preventDefault()
    const correctAnswers = guesses.reduce((score, g, i) => {
            const points = props.data[i].choices[g].isCorrect ? 1 : 0
            return score + points
        }, 
        0
    )
    setScore(`You scored ${correctAnswers}/${props.data.length} correct answers`)
  }

  function handleResetRound(event) {
    event.preventDefault()
    props.resetGame()
    setScore("")
    setGuesses(Array.apply(null, Array(5)).map(function () {}))
  }
  

    return (
         <section className="quiz">
            <form onReset={handleResetRound} onSubmit={handleSubmitForm}>
                {questionElements}
                <div className="quiz-button-container">
                    {score && <p className="quiz-score-label">{score}</p>}
                    <button className="quiz-button-form" type={score ? "reset" : "submit"}>{score ? "Play again" : "Check answers" }</button>
                </div>
            </form>
        </section>
    )
}