import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { deleteProductById, fetchProducts } from "./productSlice";
import { ProductType } from "./types";

type ProductListsProps = {
	onHandleEditableProduct: (product: ProductType, productId: string) => void;
};

const ProductLists = ({ onHandleEditableProduct }: ProductListsProps) => {
	const { isLoading, products, error } = useAppSelector(
		(state) => state.productsR
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div>
			<h2>ProductLists</h2>
			<section className="products">
				{products.map((product) => (
					<article className="product" key={product.id}>
						<h4>Title: {product.title}</h4>
						<p>Description: {product.description}</p>
						<p>Price: {product.price}</p>
						<button onClick={() => dispatch(deleteProductById(product.id))}>
							Delete
						</button>
						<button onClick={() => onHandleEditableProduct(product, product.id)}>
							Edit
						</button>
					</article>
				))}
			</section>
		</div>
	);
};
export default ProductLists;
