export default function Splash({screen, toggleScreen}) {
    console.log(screen)

    return (
        <section className="splash">
            <h1>Quizzical</h1>
            <div className="splash-desc">Test your knowledge on a variety of fun and interesting topics</div>
            <button onClick={() => toggleScreen("quiz")}>Start quiz</button>
        </section>
    )
}