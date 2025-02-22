import "./style.css";
import Cart from "../../assets/cart.png";
import Redux from "../../assets/redx.png";
import ReactPNG from "../../assets/react.webp";

type NavProps = {
	onCartClick: () => void;
};

function Nav({ onCartClick }: NavProps) {
	// const cart = useSelector(function (state) {
	//   return state.cart.cart;
	// });

	const cartCount = 0;

	// Object.keys(cart || {}).forEach((key) => {
	//   const data = cart[key];
	//   cartCount = cartCount + data.count;
	// });

	return (
		<div className="nav">
			<div className="nav-dex">
				<span>Anatomy of </span> <img src={Redux} height="22px" /> Redux and RTK{" "}
				<img src={ReactPNG} height="22px" />
			</div>

			<button className="img-btn" onClick={onCartClick}>
				<span> Cart {cartCount}</span> <img src={Cart} height="22px" />
			</button>
		</div>
	);
}

export default Nav;
