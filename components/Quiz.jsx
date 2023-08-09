import { useState, useEffect } from "react"
import { decode } from "html-entities"

export default function Quiz({toggleScreen, questions}) {
    const [formData, setFormData] = useState([
        {
            q0: questions[0].question,
            answer: questions[0].correct_answer,
            wrong: questions[0].incorrect_answers
        }
    ])

    useEffect(() => {
        generateQuestions()
    }, [])

    function generateQuestions() {
        // console.log(questions)
        let questionsArray = []
        
        questions.forEach(q => {
            let newQuestion = {
                question: q.question,
                answers: [...q.incorrect_answers, q.correct_answer],
                correct: q.correct_answer
            }
            // newQuestion.question = q.question
            // newQuestion.answers = [...q.incorrect_answers, q.correct_answer]
            
            // console.log(q.question, q.correct_answer, q.incorrect_answers)
            // console.log(newQuestion)
            questionsArray.push(newQuestion)
        }
            // questionsArray.push(
            // q.question,
            // q.correct_answer,
            // q.incorrect_answers
        )

        console.log(questionsArray)

        // questions.forEach(q => console.log(q.question))
    }

    // console.log(formData)
    return (
        <section>
            QUIZ
        </section>
    )
}