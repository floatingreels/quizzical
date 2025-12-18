import { useState } from 'react'

export default function Welcome(props) {

    const [parameters, setParameters] = useState({amount: 5, category: null, difficulty: null})
    const categoryElements = props.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)

    function handleSubmitForm(event) {
        event.preventDefault()
        console.log("Start quiz pressed")
        props.startGame(parameters)
    }

    function handleChange(event) {
        setParameters((prevParams) => {
            var newParams = {...prevParams}
            switch (event.target.name) {
            case "quiz-amount":
                newParams.amount = Number(event.target.value)
                break
            case "quiz-category":
                newParams.category = event.target.value === "any" ? null : event.target.value
                break
            case "quiz-difficulty": 
                newParams.difficulty = event.target.value === "any" ? null : event.target.value
                break
            }
            console.log(newParams)
            return newParams    
        })
    }

    return (
        <section className="welcome">
            <h1 className="quiz-title">Quizzical</h1>
            <p className="quiz-description">...so you think you know stuff? Choose a topic and difficulty and find out!</p>
            <form onSubmit={handleSubmitForm}>
                <div className="quiz-input-container">
                <input 
                    type="number" 
                    name="quiz-amount" 
                    id="quiz-amount" 
                    min="1" 
                    max="10" 
                    value={parameters.amount}
                    onChange={handleChange}
                >
                </input>
                <select 
                    name="quiz-category"
                    onChange={handleChange}
                >
			        <option value="any">Any Category</option>
                    {categoryElements}
                </select>
                <select 
                    name="quiz-difficulty"
                    onChange={handleChange}
                >
			        <option value="any">Any</option>
			        <option value="easy">Easy</option>
			        <option value="medium">Medium</option>
			        <option value="hard">Difficult</option>
                </select>
                </div>
                <br/>
                <button 
                    className="quiz-button-start"  
                    type="submit">Start quiz!
                </button>
            </form>
        </section>
    )
}