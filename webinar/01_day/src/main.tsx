import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createStore } from "redux";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);

type ActionType = {
	type: string;
	payload: string | number;
};

type StateType = {
	name: string | number;
};

const initialState: StateType = {
	name: "JS",
};

function reducer(state = initialState, action: ActionType) {
	if (action.type === "UPDATE_NAME") {
		return {
			...state,
			name: action.payload,
		};
	}

	if (action.type === "UPDATE_AGE") {
		return {
			...state,
			name: action.payload,
		};
	}

	return state;
}

const action: ActionType = {
	type: "UPDATE_NAME",
	payload: "JS",
};

const myAction: ActionType = {
	type: "UPDATE_AGE",
	payload: 20,
};

const store = createStore(reducer);

store.subscribe(() => {
	console.log("Store Changed", store.getState());
});

store.dispatch(action);
store.dispatch(myAction);

console.log(store.getState());
