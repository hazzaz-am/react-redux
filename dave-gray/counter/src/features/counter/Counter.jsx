import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount, reset } from "./counterSlice";
import { useState } from "react";

const Counter = () => {
	const [incrementByValue, setIncrementByValue] = useState(0);
	const count = useSelector((state) => state.counterR.value);
	const dispatch = useDispatch();

	const addValue = Number(incrementByValue) || 0;

	function resetAll() {
		setIncrementByValue(0);
    dispatch(reset())
	}

	return (
		<section>
			<p>{count}</p>
			<div>
				<button onClick={() => dispatch(increment())}>+</button>
				<button onClick={() => dispatch(decrement())}>-</button>
			</div>

			<input
				type="text"
				value={incrementByValue}
				onChange={(event) => setIncrementByValue(event.target.value)}
			/>
			<div>
				<button onClick={() => dispatch(incrementByAmount(addValue))}>
					Add Value
				</button>
			<button onClick={resetAll}>Reset</button>
			</div>

		</section>
	);
};
export default Counter;
