export default function Quiz({toggleScreen, questions}) {
    console.log(questions)

    return (
        <section className="quiz">
            {
                questions.map((question, index) => (
                        <div key={index} className="question">
                            <h2 className="question-title">{question.question}</h2>
                        </div>
                ))
            }
        </section>
    )
}