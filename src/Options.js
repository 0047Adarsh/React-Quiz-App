function Options({options, answer, dispatch}) {
    const hasAnswered = answer !== null;

    return (
            <div className="options">
                {options.options.map((option,index)=>
                    <button className={`btn btn-option ${answer===index?"answer":""} ${hasAnswered?index===options.correctOption?"correct":"wrong":""}`} 
                    key={option} disabled={hasAnswered} onClick={()=>dispatch({type:"newAnswer", payload:index})}>{option}</button>
                )}
            </div>
        
    )
}

export default Options
