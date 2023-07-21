export default function Quiz({toggleScreen, questions}) {
    console.log(questions)

    return (
        <section className="quiz">
            {
                questions.map((question, index) => {
                    let answersArr = [
                        ...question.incorrect_answers,
                        question.correct_answer
                    ]
                    console.log(answersArr)

                    return (
                        <div key={index} className="question">
                            <h2 className="question-title">{question.question}</h2>
                            {
                                answersArr.map((answer, index) => {
                                    return (
                                        <button key={index} className="answer">{answer}</button>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </section>
    )
}