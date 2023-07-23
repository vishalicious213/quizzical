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

        if (questionsFromState.every(isBlank)) {
            if (array.length > 2) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log("QUIZZED", formData)
    }

    function handleChange(event, qIndex) {
        const {name, value} = event.target

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
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

                    return (
                        <div key={qIndex} className="question">
                            <h2 className="question-title">{decode(question.question)}</h2>
                            {
                                answersArr.map((answer, aIndex) => {
                                    return (
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