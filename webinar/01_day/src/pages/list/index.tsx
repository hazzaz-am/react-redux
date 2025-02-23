import "./style.css";
import AddToCart from "../../assets/add.png";
import { useDispatch, useSelector } from "react-redux";
import { InitialStateType } from "../../store/reducers/movie-list";
import { ListType } from "../../types/types";
import { addToCart } from "../../store/actions/movie-list";

function List() {
	// const data = [{ id: 1, title: "1", amount: 100 }];
	const moviesFromStore = useSelector(function (state: InitialStateType) {
		return state;
	});

	const { isLoading, movies, cart } = moviesFromStore;
	console.log(cart);

	const dispatch = useDispatch();

	function handleAddToCart(movie: ListType) {
			dispatch(addToCart(movie));
	}

	if (isLoading) {
		return <h1>Loading Data...</h1>;
	}

	return (
		<div className="movie-list">
			{!!movies &&
				movies?.map((movie) => {
					const { title, thumbnail_width, thumbnail } = movie;

					return (
						<div className="movie-card" key={thumbnail}>
							<img width="140px" height="170px" src={thumbnail} />
							<span>{title}</span>
							<div className="cart-btn">
								<button
									className="cart-srap"
									onClick={() => handleAddToCart(movie)}
								>
									<span> Add to Cart</span>{" "}
									<img src={AddToCart} height="22px" />
								</button>
							</div>
							{/* {!!discount && <span>"This is free"</span>} */}
							<span>INR {thumbnail_width}</span>
						</div>
					);
				})}
		</div>
	);
}

export default List;
//
