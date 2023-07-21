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
                <fieldset className="category">
                    <legend>Category</legend>

                    <select 
                        id="favColor"
                        value={formData.category}
                        onChange={handleChange}
                        name="category"
                    >
                        <option value="">- Choose -</option>
                        <option value="general">General Knowledge</option>
                        <option value="books">Entertainmant: Books</option>
                        <option value="film">Entertainmant: Film</option>
                        <option value="music">Entertainmant: Music</option>
                        <option value="musicals">Entertainmant: Musicals & Theatres</option>
                        <option value="tv">Entertainmant: Television</option>
                        <option value="video-games">Entertainmant: Video Games</option>
                        <option value="board-games">Entertainmant: Board Games</option>
                        <option value="comics">Entertainmant: Comics</option>
                        <option value="anime">Entertainmant: Anime & Manga</option>
                        <option value="cartoons">Entertainmant: Cartoon & Animation</option>
                    </select>
                </fieldset>

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

                <fieldset className="type">
                    <legend>Question type</legend>
                    
                    <div className="radio-container">
                        <input 
                            className="radio"
                            type="radio"
                            id="multi"
                            name="type"
                            value="multi"
                            checked={formData.type === "multi"}
                            onChange={handleChange}
                        />
                        <label htmlFor="multi">Multiple choice</label>
                    </div>

                    <div className="radio-container">
                        <input 
                            className="radio"
                            type="radio"
                            id="tf"
                            name="type"
                            value="tf"
                            checked={formData.type === "tf"}
                            onChange={handleChange}
                        />
                        <label htmlFor="tf">True / False</label>
                    </div>
                </fieldset>
            </form>
            <button onClick={() => toggleScreen("quiz")}>Start quiz</button>
        </section>
    )
}