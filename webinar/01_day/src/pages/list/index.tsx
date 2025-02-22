import "./style.css";
import AddToCart from "../../assets/add.png";

type ListProps = {
	onCartClick: () => void;
};

function List({ onCartClick }: ListProps) {
	// const data = [{ id: 1, title: "1", amount: 100 }];

	// const cart = useSelector(function (state) {
	//   return state?.cart?.cart;
	// });

	// const movies = useSelector(function (state) {
	//   return state.movies.movies;
	// });

	// const isLoading = useSelector(function (state) {
	//   return state.movies.isLoading;
	// });

	// const dispatch = useDispatch();

	// console.log(cart);

	// function handleAddToCart(movie) {
	//   return () => {
	//     dispatch(addToCart(movie));
	//   };
	// }

	// if (isLoading) {
	//   return <h1>Loading Data...</h1>;
	// }
	//console.log(movies);
	return (
		<div className="movie-list" onClick={onCartClick}>
			{/* {!!movies &&
        movies?.map((movie) => {
          const { title, discount, thumbnail_width, thumbnail } = movie;

          return ( */}
			<div className="movie-card">
				<img width="140px" height="170px" />
				<span>Title</span>
				<div className="cart-btn">
					<button className="cart-srap">
						<span> Add to Cart</span> <img src={AddToCart} height="22px" />
					</button>
				</div>
				{/* {!!discount &&  */}
				<span>"This is free"</span>
				{/* } */}
				<span>INR </span>
			</div>
			{/* );
         })} */}
		</div>
	);
}

export default List;
