import React from "react"

export default function StartGame(props) {
    return (
        <div className="start-game-container">
        
            <div className="shape-one"> 
                <img src="blob5.png"/>
            </div>
            <div className="shape-two"> 
                <img src="blob6.png"/>
            </div>
            
            <div className="title-container">
                <h1 className="title"> Quizzical </h1>
                <button className="start-btn" onClick={props.startQuiz}> Start Quiz </button>
            </div>
            
        </div>
    )
}