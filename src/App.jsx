import { useState, useEffect, useRef } from 'react'
import { decode } from 'he'
import { shuffle } from './util/util.js'
import { nanoid } from 'nanoid'
import Welcome from './components/Welcome.jsx'
import './App.css'
import Quiz from './components/Quiz.jsx'

function App() {

  const [categories, setCategories] = useState([])
  const [gameOn, setGameOn] = useState(false)
  const [gameData, setGameData] = useState([])
  const hasFetched = useRef(false)

  useEffect(() => { 
      if (hasFetched.current) { return }
      hasFetched.current = true
      fetchCategories()
    }, 
    []
  )

  function fetchCategories() {
    fetch("https://opentdb.com/api_category.php")
      .then(res => { return res.json() })
      .then(data => { 
          console.log(data.trivia_categories)
          setCategories(data.trivia_categories)
          fetchToken()
        }
      )
  }

  function fetchToken() {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then(res => { return res.json() })
      .then(data => { 
          if (data.response_code === 0) {
            sessionStorage.setItem("token", data.token)
          } else {
            alert("Oops... something went wrong")
          }
          console.log(sessionStorage.getItem("token"))
        }
      )
  }

  function fetchTrivia(parameters) {
    var url = "https://opentdb.com/api.php?&type=multiple"
    url += ("&amount=" + parameters.amount)
    if (parameters.category) {
      url += ("&category=" + parameters.category)
    }
    if (parameters.difficulty) {
      url += ("&difficulty=" + parameters.difficulty)
    }
    if (sessionStorage.getItem("token")) {
       url += ("&token=" + sessionStorage.getItem("token"))
    }
    console.log(url)
    fetch(url)
      .then(res => { return res.json() })
      .then(data => { 
          const array = data.results.map((item) => {
              let choices = item.incorrect_answers.map(ans => ({ id: nanoid(), answer: decode(ans), isCorrect: false }))
              choices.push({ id: nanoid(), answer: decode(item.correct_answer), isCorrect: true })
              return {
                id: nanoid(),
                question: decode(item.question), 
                choices: shuffle(choices)
              }
            }
          )
          setGameData(array)
        }
      )
  }

  function onStartGameClicked(parameters) {
    fetchTrivia(parameters)
    setGameOn(true)
  }

  function onResetGameClicked() {
    setGameOn(false)
  }

  return ( 
    <main className='welcome-page'>
      {gameOn 
        ? <Quiz 
            data={gameData} 
            resetGame={onResetGameClicked}
          />
        : <Welcome 
            categories={categories} 
            startGame={onStartGameClicked} 
          />
      }
    </main> 
  )
}

export default App
