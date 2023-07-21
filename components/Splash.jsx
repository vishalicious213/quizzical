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
                        <option value="anime">Entertainment: Anime & Manga</option>
                        <option value="board-games">Entertainment: Board Games</option>
                        <option value="books">Entertainment: Books</option>
                        <option value="cartoons">Entertainment: Cartoon & Animation</option>
                        <option value="comics">Entertainment: Comics</option>
                        <option value="film">Entertainment: Film</option>
                        <option value="music">Entertainment: Music</option>
                        <option value="musicals">Entertainment: Musicals & Theatres</option>
                        <option value="tv">Entertainment: Television</option>
                        <option value="video-games">Entertainment: Video Games</option>
                        <option value="science">Science & Nature</option>
                        <option value="computers">Science: Computers</option>
                        <option value="gadgets">Science: Gadgets</option>
                        <option value="math">Science: Mathematics</option>
                        <option value="animals">Animals</option>
                        <option value="art">Art</option>
                        <option value="celebrities">Celebrities</option>
                        <option value="geography">Geography</option>
                        <option value="history">History</option>
                        <option value="myth">Mythology</option>
                        <option value="politics">Politics</option>
                        <option value="sports">Sports</option>
                        <option value="vehicles">Vehicles</option>
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