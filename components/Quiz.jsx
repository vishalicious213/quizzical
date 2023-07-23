import { useState } from "react"
import { decode } from "html-entities"

export default function Quiz({toggleScreen, questions}) {
    const [formData, setFormData] = useState({
        q0: "",
        q1: "",
        q2: "",
        q3: "",
        q4: ""
    })

    // console.log(questions)

    function isBlank(item) {
        if (item === "") {
            return true
        } else {
            return false
        }
    }

    function shuffleAnswers(array) {
        let questionsFromState = Object.values(formData)
        
        if (array.length === 2 ) {
            array.sort()
            array.reverse()
        }

        // let result = questionsFromState.every(isBlank)
        // console.log(result)

        if (questionsFromState.every(isBlank)) {
            console.log("state is empty")    
            if (array.length > 2) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
        } else {
            console.log("state has data")
            console.log(questionsFromState)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log("QUIZZED", formData)
    }

    function handleChange(event, qIndex) {
        const {name, value} = event.target
        // console.log(event.target)
        // console.log(`q${qIndex}`, name, value)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })

        console.log("formData", formData)
    }

    return (
        <form className="quiz" onSubmit={handleSubmit}>
            {
                questions.map((question, qIndex) => {
                    let answersArr = [
                        ...question.incorrect_answers,
                        question.correct_answer
                    ]

                    shuffleAnswers(answersArr)
                    // console.log(qIndex, answersArr)

                    return (
                        <div key={qIndex} className="question">
                            <h2 className="question-title">{decode(question.question)}</h2>
                            {
                                answersArr.map((answer, aIndex) => {
                                    // console.log(`q${qIndex}`, `a${aIndex}`, answer)
                                    return (
                                        // <button key={index} className="answer">{decode(answer)}</button>
                                        <div key={aIndex} className="answer">
                                            <input 
                                                type="radio"
                                                id={`q${qIndex}a${aIndex}`}
                                                name={`q${qIndex}`}
                                                value={decode(answer)}
                                                checked={formData[`q${qIndex}`] === decode(answer)}
                                                onChange={(event) => handleChange(event, qIndex)}
                                            />
                                            <label htmlFor={`q${qIndex}a${aIndex}`}>{decode(answer)}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }

            <button className="quiz-btn">Check answers</button>
        </form>
    )
}