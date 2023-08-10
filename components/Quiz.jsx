import { useState, useEffect } from "react"
import { decode } from "html-entities"

export default function Quiz({toggleScreen, questions}) {
    const [formData, setFormData] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState({0:"", 1:"", 2:"", 3:"", 4:""})
    let answerClass = ""

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
                correct: q.correct_answer
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
        // console.log(index, event.target.value, decode(formData[index].correct))
        // console.log(selectedAnswer[index])

        setSelectedAnswer(prevState => ({
            ...prevState,
            [index]: event.target.value
        }))

        console.log(selectedAnswer)

        if (event.target.value === decode(formData[index].correct)) {
            console.log("Correct")
        } else {
            console.log("Incorrect")
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log("submit handler", formData)
    }

    function theClass(qIndex, answer) {
        if (selectedAnswer[qIndex] === decode(answer)) {
            return "answer selected-answer"
        } else {
            return "answer"
        }
        // return "answer right-answer"
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
                                            className={theClass(qIndex, answer)}
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
                                                className={selectedAnswer[qIndex] === decode(answer) ? "selected-answer" : ""}
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

            <button className="quiz-btn">Check answers</button>
        </form>
    )
}