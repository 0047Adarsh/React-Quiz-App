import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen"
import Questions from "./Questions"
import NextButton from "./NextButton"
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
  questions: [], 
  status: "loading",
  index: 0,
  answer:null,
  points:0,
  timer:null
};

function reducer(state, action)
{
  switch(action.type)
  {
    case "recData":
      return {...state, questions: action.payload, status:"ready"};
    case "dataCrashed":
      return {...state, status:"failed"}
    case "start":
      return {...state, status:"active", timer: state.questions.length * 30}
    case "newAnswer":
      const question = state.questions.at(state.index);
      
      return {...state, answer:action.payload, points: action.payload===question.correctOption ? state.points + question.points:state.points}
    case "next-question":
      return {...state, index:state.index + 1, answer:null}
    case "finished":
      return {...state, status:"finished"}
    case "tick":
      return {...state, timer: state.timer -1, status:state.timer===0?"finished":state.status}; 
    case "restart":
      return {...initialState, questions:state.questions, status:"ready"};
    default:
      throw new Error("Not a valid one");
  }
}

export default function App()
{
  
  const [{questions, status, index, answer, points, timer}, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur)=>prev + cur.points,0);

  useEffect(function(){
    fetch('http://localhost:8000/questions').then((res)=>
      res.json()).then(data=>dispatch({type:"recData", payload : data}))
      .catch((err)=>dispatch({type:"dataCrashed"}));
  }
  , []);
  return(<div className="app">
    <Header />
    <Main>
      {status==="loading" && <Loader />}
      {status==="failed" && <Error />}
      {status==="ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
      {status==="active" && (<>
      <Progress points={points} index={index} numQuestions={numQuestions} maxPoints={maxPoints} answer={answer}/>
      <Questions questions={questions[index]} dispatch={dispatch} answer={answer} points={points}/>
      <Footer> 
        <Timer dispatch={dispatch} timer={timer}/>
        <NextButton dispatch={dispatch} index={index} numQuestions={numQuestions}/>     
      </Footer>
       </>)
      }
      {status==="finished" && (
        <FinishScreen maxPoints={maxPoints} points={points} dispatch={dispatch}/>
      )}
    </Main>
  </div>)
}