import "./style.css";
import AddToCart from "../../assets/add.png";
import { useSelector } from "react-redux";
import { InitialStateType } from "../../store/reducers/movie-list";

type ListProps = {
	onCartClick: () => void;
};

function List({ onCartClick }: ListProps) {
	// const data = [{ id: 1, title: "1", amount: 100 }];
	const moviesFromStore = useSelector(function (state: InitialStateType) {
		return state;
	});

	const { isLoading, movies } = moviesFromStore;


	// const dispatch = useDispatch();


	// function handleAddToCart(movie) {
	//   return () => {
	//     dispatch(addToCart(movie));
	//   };
	// }

	if (isLoading) {
		return <h1>Loading Data...</h1>;
	}

	return (
		<div className="movie-list" onClick={onCartClick}>
			{!!movies &&
				movies?.map((movie) => {
					const { title, thumbnail_width, thumbnail } = movie;

					return (
						<div className="movie-card" key={thumbnail}>
							<img width="140px" height="170px" src={thumbnail} />
							<span>{title}</span>
							<div className="cart-btn">
								<button className="cart-srap" >
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
// onClick={handleAddToCart(movie)}