import { useState, useEffect } from "react"
import { decode } from "html-entities"

export default function Quiz({toggleScreen, questions}) {
    const [formData, setFormData] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(() => {
        generateQuestions()
    }, [])

    // add questions and shuffled answers to state
    function generateQuestions() {
        let questionsArray = []

        questions.forEach(q => {
            let shuffledAnswers = shuffleAnswers([...q.incorrect_answers, q.correct_answer])
            let newQuestion = {
                question: q.question,
                answers: shuffledAnswers,
                correct: q.correct_answer,
                selected: false
            }

            questionsArray.push(newQuestion)
        })

        setFormData(questionsArray)
    }

    // shuffle answers for each question
    function shuffleAnswers(answersArr) {
        // true/false answers always show "True" first
        if (answersArr.length === 2 ) {
            answersArr.sort()
            answersArr.reverse()
        }

        // multiple choice answers get shuffled
        if (answersArr.length > 2) {
            for (let i = answersArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answersArr[i], answersArr[j]] = [answersArr[j], answersArr[i]];
            }
        }

        return answersArr
    }

    function handleChange(event, index) {
        // update formData and set "selected" to button's value
        setFormData(prevState => {
            const updatedFormData = [...prevState]

            updatedFormData[index] = {
                ...updatedFormData[index],
                selected: event.target.value
            }

            return updatedFormData
        })

        // if (event.target.value === decode(formData[index].correct)) {
        //     console.log("Correct")
        // } else {
        //     console.log("Incorrect")
        // }
    }

    function handleSubmit(event) {
        event.preventDefault()
        setSubmitted(true)

        formData.forEach(q => {
            console.log(q.correct, q.selected)
            if (q.correct === q.selected) {
                setScore(prevScore => prevScore + 1)
            }
        })
        
        console.log(score)
        console.log("submit handler", formData)
    }

    function buttonClass(qIndex, answer) {
        const selected = decode(formData[qIndex].selected)
        const correct = decode(formData[qIndex].correct)

        if (submitted && 
            selected === decode(answer) && 
            correct === decode(answer)) {
            return "answer right-answer"
        } else if (submitted && 
            selected === decode(answer) && 
            correct !== decode(answer)) {
            return "answer wrong-answer"
        } else if (selected === decode(answer)) {
                return "answer selected-answer"
        } else {
            return "answer"
        }
    }

    function labelClass(qIndex, answer) {
        const selected = decode(formData[qIndex].selected)
        const correct = decode(formData[qIndex].correct)

        if (submitted && 
            selected === decode(answer) && 
            correct === decode(answer)) {
            return "right-answer"
        } else if (submitted && 
            selected === decode(answer) && 
            correct !== decode(answer)) {
            return "wrong-answer"
        } else if (selected === decode(answer)) {
                return "selected-answer"
        } else {
            return ""
        }
    }

    return (
        <form className="quiz" onSubmit={handleSubmit}>
            {
                formData.map((quizItem, qIndex) => {
                    return (
                        <div key={qIndex} className="question">
                            <h2 className="question-title">{decode(quizItem.question)}</h2>
                            {
                                quizItem.answers.map((answer, aIndex) => {
                                    return (
                                        <div 
                                            key={aIndex} 
                                            className={buttonClass(qIndex, answer)}
                                        >
                                            <input 
                                                type="radio"
                                                id={`q${qIndex}a${aIndex}`}
                                                name={`q${qIndex}`}
                                                value={decode(answer)}
                                                checked={formData[`q${qIndex}`] === decode(answer)}
                                                onChange={(event) => handleChange(event, qIndex)}
                                            />
                                            <label 
                                                htmlFor={`q${qIndex}a${aIndex}`}
                                                className={labelClass(qIndex, answer)}
                                            >
                                                {decode(answer)}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }

            <div className={submitted ? "score show" : "score hide"}>You scored {score}/{formData.length} correct answers.</div>

            <button className="quiz-btn">{submitted ? "Play again" : "Check answers"}</button>
        </form>
    )
}