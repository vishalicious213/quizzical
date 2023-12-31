import { useState, useEffect } from "react"
import { decode } from "html-entities"
import Confetti from "react-confetti"

export default function Quiz({toggleScreen, questions}) {
    const [formData, setFormData] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState(0)
    const [useConfetti, setUseConfetti] = useState(false)

    useEffect(() => {
        generateQuestions()
    }, [])

    useEffect(() => {
        if (score === 5) {
            setUseConfetti(true)
            console.log("Confetti")
        }
    }, [score])

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
    }

    function handleSubmit(event) {
        event.preventDefault()
        setSubmitted(true)

        formData.forEach(q => {
            if (q.correct === q.selected) {
                setScore(prevScore => prevScore + 1)
            }
        })

        if (submitted) {
            toggleScreen("splash")
        }
    }

    function buttonClass(qIndex, answer) {
        const selected = decode(formData[qIndex].selected)
        const correct = decode(formData[qIndex].correct)

        if (submitted && selected === answer && correct === answer) {
            return "answer right-answer"
        } else if (submitted && selected === answer && correct !== answer) {
            return "answer wrong-answer"
        } else if (submitted && correct === answer) {
            return "answer right-answer"
        } else if (selected === answer) {
                return "answer selected-answer"
        } else {
            return "answer"
        }
    }

    function labelClass(qIndex, answer) {
        const selected = decode(formData[qIndex].selected)
        const correct = decode(formData[qIndex].correct)

        if (submitted && selected === answer && correct === answer) {
            return "right-answer"
        } else if (submitted && selected === answer && correct !== answer) {
            return "wrong-answer"
        } else if (submitted && correct === answer) {
            return "right-answer"
        } else if (selected === answer) {
                return "selected-answer"
        } else {
            return ""
        }
    }

    return (
        <form className="quiz" onSubmit={handleSubmit}>
            {useConfetti && <div className="confetti"><Confetti /></div>}

            {
                formData.map((quizItem, qIndex) => {
                    return (
                        <div key={qIndex} className={submitted ? "question no-click" : "question"}>
                            <h2 className="question-title">{decode(quizItem.question)}</h2>
                            <div className="answers">
                            {
                                quizItem.answers.map((answer, aIndex) => {
                                    return (
                                        <div 
                                            key={aIndex} 
                                            className={buttonClass(qIndex, decode(answer))}
                                        >
                                            <label 
                                                htmlFor={`q${qIndex}a${aIndex}`}
                                                className={labelClass(qIndex, decode(answer))}
                                            >
                                                <input 
                                                    type="radio"
                                                    id={`q${qIndex}a${aIndex}`}
                                                    name={`q${qIndex}`}
                                                    value={decode(answer)}
                                                    checked={formData[`q${qIndex}`] === decode(answer)}
                                                    onChange={(event) => handleChange(event, qIndex)}
                                                />
                                                {decode(answer)}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    )
                })
            }

            <div className={submitted ? "score show" : "score hide"}>You scored {score}/{formData.length} correct answers.</div>

            <button className="quiz-btn">{submitted ? "Play again" : "Check answers"}</button>
        </form>
    )
}