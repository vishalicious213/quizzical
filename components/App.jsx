import { useState } from "react"
import Splash from "./Splash"
import Quiz from "./Quiz"

export default function App() {
    const [screen, setScreen] = useState("splash")

    return (
        <main>
            {
                screen === "splash" 
                ? <Splash screen={screen} toggleScreen={setScreen} /> 
                : <Quiz screen={screen} toggleScreen={setScreen} />
            }
        </main>
    )
}