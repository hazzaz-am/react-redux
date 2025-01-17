import { useDispatch } from "react-redux";
import { decrement, increment, reset } from "./counterSlice";
import { useAppSelector } from "../../app/hooks";

export const Counter = () => {
  const count = useAppSelector(state => state.counter.value)

  const dispatch = useDispatch()
  return (
		<div>
			<h2>Count: {count}</h2>
			<button onClick={() => dispatch(increment())}>Increment</button>
			<button onClick={() => dispatch(decrement())}>Decrement</button>
			<button onClick={() => dispatch(reset())}>Reset</button>
		</div>
	);
}