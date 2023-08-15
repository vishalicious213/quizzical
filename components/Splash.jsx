import { useState } from "react"

export default function Splash({toggleScreen, updateQuestions}) {
    const [formData, setFormData] = useState({
        category: "9",
        difficulty: "easy",
        type: "both",
        token: localStorage.getItem("quizzical") || ""
    })

    function handleChange(event) {
        console.log("token", formData.token)
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function getParams() {
        let questionType

        if (formData.type === "both") {
            questionType = ""
        } else {
            questionType = `&type=${formData.type}`
        }

        if (formData.token === "") {
            console.log("no token")
            getToken()
            console.log(formData)
        } else {
            console.log(localStorage.getItem("quizzical"))
        }

        let urlParams = `?amount=5&category=${formData.category}&difficulty=${formData.difficulty}${questionType}`
        return urlParams
    }

    async function getToken() {
        await fetch("https://opentdb.com/api_token.php?command=request")
            .then(response => response.json())
            .then(data => {
                console.log(data.token)
                localStorage.setItem("quizzical", data.token)
                // setFormData(prevFormData => {
                //     return {
                //         ...prevFormData,
                //         token: data.token
                //     }
                // })
            })
            console.log(formData)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        let urlParams = getParams()
        let apiResponse = {}

        // console.log(urlParams)
        await fetch(`https://opentdb.com/api.php${urlParams}`)
            .then(response => response.json())
            .then(data => apiResponse = data)

        // console.log(apiResponse)
        if (apiResponse.response_code === 1) {
            warning()
        } else {
            updateQuestions(apiResponse.results)
            toggleScreen("quiz")
        }
    }

    function warning() {
        const warningEl = document.getElementById("warning")
        warningEl.textContent = "Not enough questions of that type"
        setTimeout(() => warningEl.textContent = "", 3000)
    }

    return (
        <section className="splash">
            <h1>Quizzical</h1>
            <div className="splash-desc">Test your knowledge on a variety of fun and interesting topics</div>
            
            <form className="setup-form" onSubmit={handleSubmit}>
                <fieldset className="category">
                    <legend>Category</legend>

                    <select 
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                        name="category"
                    >
                        <option value="9">General Knowledge</option>
                        <option value="27">Animals</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="31">Entertainment: Anime & Manga</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="32">Entertainment: Cartoon & Animation</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals & Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="20">Mythology</option>
                        <option value="24">Politics</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="21">Sports</option>
                        <option value="28">Vehicles</option>
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
                            id="both"
                            name="type"
                            value="both"
                            checked={formData.type === "both"}
                            onChange={handleChange}
                        />
                        <label htmlFor="both">Any type</label>
                    </div>
                    
                    <div className="radio-container">
                        <input 
                            className="radio"
                            type="radio"
                            id="multiple"
                            name="type"
                            value="multiple"
                            checked={formData.type === "multiple"}
                            onChange={handleChange}
                        />
                        <label htmlFor="multiple">Multiple choice</label>
                    </div>

                    <div className="radio-container">
                        <input 
                            className="radio"
                            type="radio"
                            id="boolean"
                            name="type"
                            value="boolean"
                            checked={formData.type === "boolean"}
                            onChange={handleChange}
                        />
                        <label htmlFor="boolean">True / False</label>
                    </div>
                </fieldset>
                
                <div id="warning" className="warning"></div>

                <button className="start-btn">Start quiz</button>
            </form>
        </section>
    )
}