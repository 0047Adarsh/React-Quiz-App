export default function FinishScreen({maxPoints, points, dispatch})
{
    const winPercentage = (points/maxPoints) * 100;
    return (
        <> 
        <p className="result">
            You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(winPercentage)}%).
        </p>
        <button className="btn btn-ui" onClick={()=>{dispatch({type:"restart"})}}>Restart Quiz</button>
        </>

    );
} 