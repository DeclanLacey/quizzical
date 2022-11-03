import React from "react"
import StartGame from "./StartGame"
import Quiz from "./Quiz"


export default function App() {
    
    const [quizStarted, setQuizStarted] = React.useState(false)
    const [quizQuestions, setQuizQuestions] = React.useState([])    
    const [quizAnswers, setQuizAnswers] = React.useState([])
    const [chosenAnswers, setChosenAnswers] = React.useState([])
    const [score, setScore] = React.useState(-1)
    const [showNewGameBtn, setShowNewGameBtn] = React.useState(false)
    const [startNewGame, setStartNewGame] = React.useState(false)
    
///////Function to start the inital quiz//////////////

    function startQuiz() {
        setQuizStarted(true)
        
    }
    
//////////Side effect fetching data from the API whenever startNewGame is changed ///////

     React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                setQuizQuestions(data.results)   
            })
            setStartNewGame[false]
    }, [startNewGame])
   
///////////// Function that runs every time an answer is chosen for a question ///////////////

    function chooseAnswer(answer, event, id) {
        let ansCorrect = quizQuestions[id].correct_answer
        let ansWrongOne = quizQuestions[id].incorrect_answers[0]
        let ansWrongTwo = quizQuestions[id].incorrect_answers[1]
        let ansWrongThree = quizQuestions[id].incorrect_answers[2]
        
        if (chosenAnswers.includes(answer) ) {
            event.target.style.backgroundColor = "#FFFFFF"
            event.target.style.color = "#00171F"
            setChosenAnswers(prevAns => {
                return prevAns = prevAns.filter(item => item != answer)
            })
            
        }else if (chosenAnswers.includes(ansCorrect) || chosenAnswers.includes(ansWrongOne) || chosenAnswers.includes(ansWrongTwo) || chosenAnswers.includes(ansWrongThree)) {
            
        }else {
            setChosenAnswers(prevAns => {
                return [
                    ...prevAns,
                    answer
                ]
            })
            
            event.target.style.backgroundColor = "#023E8A"
            event.target.style.color = "#FFFFFF"
        } 
    }
    
////////////// Function that runs when the submit answers button is clicked //////////////////

    function submitAnswers() {
        setScore(0)
        chosenAnswers.map(ans => {
            
            for (let i = 0; i < quizQuestions.length; i++) {
                if (quizQuestions[i].correct_answer.includes(ans)) {
                    setScore(prevScore => {
                        return prevScore + 1
                    })
                } else {
                } 
            }
        })
      setShowNewGameBtn(true)
      
      
      
    }
    
///////////// Function that runs when the new quiz button is clicked ////////////
    function newGame() {
        setShowNewGameBtn(false)
        setScore(-1)
        setChosenAnswers([])
        setQuizAnswers([])
        setQuizQuestions([])
        setStartNewGame(true)
    }

///////////// Function that shuffles the answers pulled from the API so the correct one is in a different spot every time //////////////////

     function randomArray() {
        quizQuestions.map(item => {
            let answers = []
            let randomIndex = Math.floor(Math.random() * 3)
            answers.splice(randomIndex, 0, item.correct_answer)
            answers.splice(randomIndex, 0, item.incorrect_answers[0])
            answers.splice(randomIndex, 0, item.incorrect_answers[1])
            answers.splice(randomIndex, 0, item.incorrect_answers[2])
            setQuizAnswers(prevAns => {
            return [
                    ...prevAns,
                    answers
                    ]
            })
        })
    }
    
////////// Side effect that decides when the above function runs //////////

    React.useEffect(() => {
        randomArray()
    }, [quizQuestions])
    
////////// The function that is mapping over the data from the API and passing it along to the Quiz component ////////////////

let count = -1
const questions = quizQuestions.map(object => {
        count ++
        return (
            <Quiz
                id={count}
                question={object}
                key={object.question}
                chooseAnswer={chooseAnswer}
                answers={quizAnswers[count]}
            />
        )
    })
   
    return (
        <div>
            <div>
                {quizStarted ?
                    <div className="all-questions-container">
                        <div className="shape-one"> 
                            <img src="blob5.png"/>
                        </div>
                        <div className="shape-two"> 
                            <img src="blob6.png"/>
                        </div>
                        <div className="all-questions-new">
                        {questions}
                        </div>
                    </div>
                    
                    :
                    <StartGame
                        startQuiz={startQuiz}
                    />
                }
                
            </div>
            
            {chosenAnswers.length >= 5 ?
                <div className="btn-container">
                    {showNewGameBtn ? 
                    <button className="changing-btn" onClick={newGame}> New Game </button> : <button className="changing-btn" onClick={submitAnswers}> Submit Answers </button>}
                    {score >= 0 && chosenAnswers.length >= 5 ? <p className="score"> Score: {score}/5 </p> : ""}
                </div>
            :
                <div> </div>
            }
        </div>
    )
}

