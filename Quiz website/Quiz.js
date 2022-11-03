import React from "react"

export default function Quiz(props) {
    

    return (
        <div className="question-container-new">
            <h2> {props.question.question} </h2>
            
            <button className="answer-btn" id={props.id} onClick={(event) => props.chooseAnswer(props.answers ? props.answers[0] : "Loading", event, props.id)}> 
                {props.answers ? props.answers[0] : "Loading"}  
            </button>
            
            <button className="answer-btn" id={props.id} onClick={(event) => props.chooseAnswer(props.answers ? props.answers[1] : "Loading", event, props.id)}> 
                {props.answers ? props.answers[1] : "Loading"}  
            </button>
            
            <button className="answer-btn" id={props.id} onClick={(event) => props.chooseAnswer(props.answers ? props.answers[2] : "Loading", event, props.id)}> 
                {props.answers ? props.answers[2] : "Loading"}  
            </button>
            
            <button className="answer-btn" id={props.id} onClick={(event) => props.chooseAnswer(props.answers ? props.answers[3] : "Loading", event, props.id)}> 
                {props.answers ? props.answers[3] : "Loading"} 
            </button>
        </div>
    )
}