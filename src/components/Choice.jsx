import { clsx } from 'clsx'

export default function Choice(props) {

    const checked = props.choice.index === props.guess,
        correct = props.scored && props.choice.isCorrect, 
        incorrect = props.scored && checked && !props.choice.isCorrect

  function handleAnswerSelected(event) {
    props.setGuesses(prevGuesses => { 
        let newGuesses =[...prevGuesses]
        const questionIndex = Number(event.target.name)
        const choiceIndex = Number(event.target.value)
        newGuesses[questionIndex] = choiceIndex
        return newGuesses
    })
  }

    return (
        <>
            <input 
                className= {clsx(["radio-btn", props.scored && "scored", correct && "correct", incorrect && "incorrect"])}
                type="radio" 
                id={props.choice.id}  
                name={props.question.index} 
                value={props.choice.index}
                checked={checked}
                onChange={handleAnswerSelected}
            />
            <label 
                className="choice-label"
                htmlFor={props.choice.id}
            >
                {props.choice.answer}
            </label>
            <br />
        </>
    )
}