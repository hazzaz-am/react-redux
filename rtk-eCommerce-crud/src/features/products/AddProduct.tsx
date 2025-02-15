import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
	useAddProductMutation,
	useUpdateProductMutation,
} from "../../services/productsApi";
import { ProductType } from "./types";

const INITIAL_STATE = {
	title: "",
	description: "",
	category: "",
	price: 0,
};

type AddProductProps = {
	onHandleClearForm: () => void;
	editableProduct: ProductType | null;
	productId: string | null;
};

const AddProduct = ({
	editableProduct,
	productId,
	onHandleClearForm,
}: AddProductProps) => {
	const [product, setProduct] = useState({ ...INITIAL_STATE });

	const [addProduct] = useAddProductMutation();
	const [updateProduct] = useUpdateProductMutation();

	const { title, description, category, price } = product;

	function handleProductInput(
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const name = event.target.name;
		const value = event.target.value;

		setProduct({
			...product,
			[name]: value,
		});
	}

	async function handleProductSubmission(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const id = crypto.randomUUID();

		if (editableProduct && productId) {
			try {
				await updateProduct({
					id: productId,
					updatedProduct: {
						id: productId,
						...product,
					},
				});
				onHandleClearForm();
			} catch (error) {
				if (error instanceof Error) {
					console.log(error.message);
				}
			}
		} else {
			try {
				await addProduct({ id, ...product });
			} catch (error) {
				if (error instanceof Error) {
					console.log(error.message);
				}
			}
		}

		setProduct({ ...INITIAL_STATE });
	}

	// function handleCancel() {
	// 	onHandleCancelUpdate();
	// 	setProduct({ ...INITIAL_STATE });
	// }

	useEffect(() => {
		if (editableProduct) {
			setProduct({ ...editableProduct });
		}
	}, [editableProduct]);

	return (
		<form onSubmit={handleProductSubmission}>
			<div>
				<label>Title</label>
				<input name="title" value={title} onChange={handleProductInput} />
			</div>
			<div>
				<label>Price</label>
				<input name="price" value={price} onChange={handleProductInput} />
			</div>
			<div>
				<label>Description</label>
				<textarea
					name="description"
					value={description}
					onChange={handleProductInput}
				/>
			</div>
			<div>
				<label>Category</label>
				<input name="category" value={category} onChange={handleProductInput} />
			</div>
			<button type="submit">
				{editableProduct && productId ? "Update Product" : "Add Product"}
			</button>
			{/* {editableProduct && productId && (
				<button onClick={handleCancel}>Cancel</button>
			)} */}
		</form>
	);
};
export default AddProduct;
