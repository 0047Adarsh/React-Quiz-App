export default function NextButton({dispatch,index,numQuestions})
{
    if(index<numQuestions-1)
    return <button className="btn btn-ui" onClick={()=>(dispatch({type:"next-question"}))} >Next</button>;

    if(index===numQuestions-1)
    return <button className="btn btn-ui" onClick={()=>(dispatch({type:"finished"}))} >Finish</button>;
}