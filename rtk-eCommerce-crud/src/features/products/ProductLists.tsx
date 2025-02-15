import {
	useDeleteProductMutation,
	useGetProductsQuery,
} from "../../services/productsApi";
import { ProductType } from "./types";

type ProductListsProps = {
	onHandleEditableProduct: (product: ProductType) => void;
};

const ProductLists = ({ onHandleEditableProduct }: ProductListsProps) => {
	const { data, isLoading, error } = useGetProductsQuery();
	const [deleteProduct] = useDeleteProductMutation();

	if (isLoading) {
		return <p>Loading .....</p>;
	}

	if (error) {
		if ("status" in error) {
			// FetchBaseQueryError (RTK Query API error)
			return <p>{JSON.stringify(error.data) || "An error occurred"}</p>;
		} else if (error instanceof Error) {
			// JavaScript Network Error
			return <p>{error.message}</p>;
		}
		return <p>An unexpected error occurred</p>;
	}

	function deleteProductById(id: string) {
		deleteProduct(id);
	}

	return (
		<div>
			<h2>ProductLists</h2>
			<section className="products">
				{data?.map((product) => (
					<article className="product" key={product.id}>
						<h4>Title: {product.title}</h4>
						<p>Description: {product.description}</p>
						<p>Price: {product.price}</p>
						<button onClick={() => deleteProductById(product.id)}>
							Delete
						</button>
						<button onClick={() => onHandleEditableProduct(product)}>
							Edit
						</button>
					</article>
				))}
				{/*  */}
			</section>
		</div>
	);
};
export default ProductLists;
