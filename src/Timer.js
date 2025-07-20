import { useEffect } from "react"

function Timer({dispatch, timer}) {

    const mins = Math.floor(timer/60);
    const seconds = timer%60;

    useEffect(function(){
        const id = setInterval(function(){
            dispatch({type:"tick"})
        },1000);

        return ()=>clearInterval(id)
    },[dispatch])
    return (
        <div className="timer">
            <p>{mins<10&&"0"}{mins}:{seconds<10&&"0"}{seconds}</p>
        </div>
    )
}

export default Timer
