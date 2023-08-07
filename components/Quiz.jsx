import { useState, useEffect } from "react"
import { decode } from "html-entities"

export default function Quiz({toggleScreen, questions}) {
    const [formData, setFormData] = useState({
        q0: "",
        q1: "",
        q2: "",
        q3: "",
        q4: ""
    })
    const [shuffledAnswers, setShuffledAnswers] = useState(false)

    useEffect(() => {
        console.log("running effect")
    }, [])

    function isBlank(item) {
        if (item === "") {
            return true
        } else {
            return false
        }
    }

    function shuffleAnswers(array) {
        console.log("shuffledAnswers", shuffledAnswers)
        if (shuffledAnswers) {
            return
        } else {
            console.log("shuffling")
    
            let questionsFromState = Object.values(formData)
            console.log(array)
            console.log(questionsFromState)
            
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

        setShuffledAnswers(true)
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