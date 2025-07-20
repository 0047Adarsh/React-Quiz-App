import Options from "./Options"

function Questions({questions, dispatch, answer, points}) {
    return (
        <div>
            <h4>{questions.question}</h4>
            <Options options={questions} dispatch={dispatch} answer={answer} />
        </div>
    )
}

export default Questions
