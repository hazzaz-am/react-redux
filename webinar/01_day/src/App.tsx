import { useState } from "react";

import "./App.css";
import Nav from "./pages/nav";
import Cart from "./pages/cart";
import List from "./pages/list";


function App() {
	const [showCart, setShowCart] = useState(false);

	// const network = useNetwork();

	// if (!network.isLoading && !network.data) {
	// 	network.fetch();
	// }

	function handleCartClick() {
		setShowCart(!showCart);
	}

	return (
		<>
			<div>
				<Nav onCartClick={handleCartClick} />
				<Cart />
				<List onCartClick={handleCartClick} />
			</div>
		</>
	);
}

export default App;
