import Choice from '../components/Choice.jsx'

export default function Question(props) { 
    
    const choiceElements = props.question.choices.map((c, i) => { 
        const choice = {...c, index: i}
        return <Choice 
                    key={choice.id} 
                    choice={choice} 
                    question={props.question} 
                    guess={props.guess}
                    setGuesses={props.setGuesses}
                    scored={props.scored}
                /> 
        }
    )
    
    return (
        <fieldset className='question-box'>
        <legend className='question-text'>{props.question.question}</legend>
            <div className="choices-container">
            {choiceElements}
            </div>
        </fieldset>
    )    
}


