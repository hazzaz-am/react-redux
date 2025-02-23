import "./style.css";
import Delete from "../../assets/delete.png";
import Checkout from "../../assets/checkout.png";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../store/actions/cart-actions/cartActions";
import { RootState } from "../../store";

function Cart() {
	const cart = useSelector((state: RootState) => state.cart.cart);
	const dispatch = useDispatch();

	const handleRemoveMovie = (key: string) => {
		dispatch(removeFromCart(key));
	};

	return (
		<div className="card list">
			{Object.keys(cart).map((key) => {
				const product = cart[key as keyof typeof cart];

				const { count, value } = product;
				const { title, thumbnail, thumbnail_width: amount } = value;

				return (
					<div className="movi-cart" key={thumbnail}>
						<div className="row-x">
							<img height="100px" width="60px" src={thumbnail} />
							<span className="movie-name">{title}</span>
						</div>

						<div className="calu">
							x {product.count} = {count * amount}
						</div>

						<button className="btn" onClick={() => handleRemoveMovie(key)}>
							Remove <img src={Delete} height="22px" />
						</button>
					</div>
				);
			})}

			{/* <h4>Total: {total}</h4> */}

			<button className="btn">
				Checkout <img height="22px" src={Checkout} />
			</button>
		</div>
	);
}

export default Cart;
