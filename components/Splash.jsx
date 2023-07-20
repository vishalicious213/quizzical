import { useState } from "react"

export default function Splash({screen, toggleScreen}) {
    const [formData, setFormData] = useState({
        category: "",
        difficulty: "",
        type: ""
    })

    return (
        <section className="splash">
            <h1>Quizzical</h1>
            <div className="splash-desc">Test your knowledge on a variety of fun and interesting topics</div>
            
            <form action=""></form>
            <button onClick={() => toggleScreen("quiz")}>Start quiz</button>
        </section>
    )
}