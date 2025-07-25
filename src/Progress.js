export default function Progress({points, numQuestions, index,maxPoints, answer})
{
    return <header className="progress">
    <progress max={numQuestions} value={index + Number(answer!==null)}/>
    <p>Questions <strong>{index + 1}</strong>/{numQuestions}</p>
    <p><strong>{points}</strong>/{maxPoints} points</p>
    </header>
}