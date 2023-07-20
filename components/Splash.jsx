export default function Splash({screen, toggleScreen}) {
    console.log(screen)

    return (
        <section className="splash">
            <h1>Quizzical</h1>
            <div className="splash-desc">Some description if needed</div>
            <button onClick={() => toggleScreen("quiz")}>Start quiz</button>
        </section>
    )
}