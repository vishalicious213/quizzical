export default function Splash({screen, toggleScreen}) {
    console.log(screen)

    return (
        <section className="splash">
            <h1>Quizzical</h1>
            <div>Some description if needed</div>
            <button>Start quiz</button>
        </section>
    )
}