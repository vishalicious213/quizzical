import { useState, useEffect } from "react"
import { decode } from "html-entities"

export default function Quiz({toggleScreen, questions}) {
    const [formData, setFormData] = useState([])

    useEffect(() => {
        generateQuestions()
    }, [])

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

    function shuffleAnswers(answersArr) {
        if (answersArr.length === 2 ) {
            answersArr.sort()
            answersArr.reverse()
        }

        if (answersArr.length > 2) {
            for (let i = answersArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [answersArr[i], answersArr[j]] = [answersArr[j], answersArr[i]];
            }
        }

        return answersArr
    }

    console.log(formData)
    return (
        <section>
            QUIZ
        </section>
    )
}