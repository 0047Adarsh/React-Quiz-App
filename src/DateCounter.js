import { useReducer } from "react";

function reducer(state, action)
{
  switch(action.type)
  {
    case "increase":
      return {...state, count: state.count + state.step}
    case "decrease":
      return {...state, count: state.count - state.step}
    case "set":
      return {...state, count: action.value}
    case "setStep":
      return {...state, step: action.value }
    case "reset":
      return {count:0,   step:1}
      default:
        throw new Error("Unknown Action");
  }
}
function DateCounter() {
  const initialState = {count:0, step:1}
  const [state, dispatch] = useReducer(reducer, initialState);

  const {count, step} = state;

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type:"decrease"});
  };

  const inc = function () {
    dispatch({type:"increase"});
  };

  const defineCount = function (e) {
    dispatch({type:"set", value:Number(e.target.value)})
  };

  const defineStep = function (e) {
    dispatch({type:"setStep", value: Number(e.target.value)})
  };

  const reset = function () {
    dispatch({type:"reset"})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
