import { useState, useEffect } from "react"
import { decode } from "html-entities"

export default function Quiz({toggleScreen, questions}) {
    const [formData, setFormData] = useState([])

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

    function handleChange() {
        console.log("change handler")
    }

    function handleSubmit() {
        console.log("submit handler")
    }

    console.log(formData)

    return (
        <section>
            QUIZ
        </section>
    )
}