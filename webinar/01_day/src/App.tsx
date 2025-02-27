import { useState } from "react";

import "./App.css";
import Nav from "./pages/nav";
import Cart from "./pages/cart";
import List from "./pages/list";
import useNetwork from "./network/useNetwork";

function App() {
	const [showCart, setShowCart] = useState(false);

	const network = useNetwork();

	if (network?.state?.length === 0) {
		network?.fetch();
	}

	function handleCartClick() {
		setShowCart(!showCart);
	}

	return (
		<>
			<div>
				<Nav onCartClick={handleCartClick} />
				{showCart && <Cart />}
				{!showCart && <List />}
			</div>
		</>
	);
}

export default App;
