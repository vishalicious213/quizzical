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

    console.log(questions)

    function shuffleAnswers(array) {
        if (array.length === 2 ) {
            array.sort()
            array.reverse()
        }

        if (array.length > 2) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log("QUIZZED")
    }

    return (
        <form className="quiz" onSubmit={handleSubmit}>
            {
                questions.map((question, index) => {
                    let answersArr = [
                        ...question.incorrect_answers,
                        question.correct_answer
                    ]

                    shuffleAnswers(answersArr)

                    return (
                        <div key={index} className="question">
                            <h2 className="question-title">{decode(question.question)}</h2>
                            {
                                answersArr.map((answer, index) => {
                                    return (
                                        <button key={index} className="answer">{decode(answer)}</button>
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