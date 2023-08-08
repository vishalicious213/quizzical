import { useState } from "react"
import { decode } from "html-entities"

export default function Quiz({toggleScreen, questions}) {
    const [formData, setFormData] = useState([
        {
            q0: questions[0].question,
            answer: questions[0].correct_answer,
            wrong: questions[0].incorrect_answers
        }

    ])
    console.log(questions)
    console.log(formData)
    return (
        <section>
            QUIZ
        </section>
    )
}