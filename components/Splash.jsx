import { useState } from "react"

export default function Splash({screen, toggleScreen}) {
    const [formData, setFormData] = useState({
        category: "",
        difficulty: "",
        type: ""
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <section className="splash">
            <h1>Quizzical</h1>
            <div className="splash-desc">Test your knowledge on a variety of fun and interesting topics</div>
            
            <form className="setup-form">
                <fieldset className="difficulty">
                    <legend>Difficulty</legend>
                    
                    <div className="radio-container">
                        <input 
                            className="radio"
                            type="radio"
                            id="easy"
                            name="difficulty"
                            value="easy"
                            checked={formData.difficulty === "easy"}
                            onChange={handleChange}
                        />
                        <label htmlFor="easy">Easy</label>
                    </div>

                    <div className="radio-container">
                        <input 
                            className="radio"
                            type="radio"
                            id="medium"
                            name="difficulty"
                            value="medium"
                            checked={formData.difficulty === "medium"}
                            onChange={handleChange}
                        />
                        <label htmlFor="medium">Medium</label>
                    </div>

                    <div className="radio-container">
                        <input 
                            className="radio"
                            type="radio"
                            id="hard"
                            name="difficulty"
                            value="hard"
                            checked={formData.difficulty === "hard"}
                            onChange={handleChange}
                        />
                        <label htmlFor="hard">Hard</label>
                    </div>
                </fieldset>
            </form>
            <button onClick={() => toggleScreen("quiz")}>Start quiz</button>
        </section>
    )
}