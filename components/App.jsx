import { useState } from "react"
import Splash from "./Splash"
import Quiz from "./Quiz"

export default function App() {
    const [screen, setScreen] = useState("splash")

    return (
        <main>
            <Splash screen={screen} />
            <Quiz screen={screen} />
        </main>
    )
}