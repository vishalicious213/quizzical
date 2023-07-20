import { useState } from "react"

export default function Splash({screen, toggleScreen}) {
    const [formData, setFormData] = useState({
        category: "",
        difficulty: "",
        type: ""
    })

    function handleChange() {
        console.log("selected")
    }

    return (
        <section className="splash">
            <h1>Quizzical</h1>
            <div className="splash-desc">Test your knowledge on a variety of fun and interesting topics</div>
            
            <form>
                <fieldset>
                    <legend>Difficulty</legend>
                    
                    <input 
                        type="radio"
                        id="easy"
                        name="difficulty"
                        value="easy"
                        checked={formData.difficulty === "easy"}
                        onChange={handleChange}
                    />
                    <label htmlFor="easy">Easy</label>

                    <input 
                        type="radio"
                        id="medium"
                        name="difficulty"
                        value="medium"
                        checked={formData.difficulty === "medium"}
                        onChange={handleChange}
                    />
                    <label htmlFor="medium">Medium</label>

                    <input 
                        type="radio"
                        id="hard"
                        name="difficulty"
                        value="hard"
                        checked={formData.difficulty === "hard"}
                        onChange={handleChange}
                    />
                    <label htmlFor="hard">Hard</label>

                </fieldset>
            </form>
            <button onClick={() => toggleScreen("quiz")}>Start quiz</button>
        </section>
    )
}