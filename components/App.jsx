import { useState } from "react"
import Splash from "./Splash"
import Quiz from "./Quiz"

export default function App() {
    const [screen, setScreen] = useState("splash")
    const [questions, setQuestions] = useState({})

    return (
        <main>
            {
                screen === "splash" 
                ? <Splash toggleScreen={setScreen} updateQuestions={setQuestions} /> 
                : <Quiz toggleScreen={setScreen} questions={questions} />
            }
        </main>
    )
}