import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/store";
import { addProduct, updateProductById } from "./productSlice";
import { ProductType } from "./types";

const INITIAL_STATE = {
	title: "",
	description: "",
	category: "",
	price: 0,
};

type AddProductProps = {
	editableProduct: ProductType | null;
	productId: string | null;
	onHandleCancelUpdate: () => void;
};

const AddProduct = ({
	editableProduct,
	productId,
	onHandleCancelUpdate,
}: AddProductProps) => {
	const [product, setProduct] = useState({ ...INITIAL_STATE });

	const dispatch = useAppDispatch();

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

	function handleProductSubmission(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const id = crypto.randomUUID();

		if (editableProduct && productId) {
			dispatch(
				updateProductById({
					id: productId,
					product: {
						id: productId,
						...product,
					},
				})
			);
			onHandleCancelUpdate();
		} else {
			dispatch(addProduct({ id, ...product }));
		}
		setProduct({ ...INITIAL_STATE });
	}

	function handleCancel() {
		onHandleCancelUpdate();
		setProduct({ ...INITIAL_STATE });
	}

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
				{" "}
				{editableProduct && productId ? "Updated Product" : "Add Product"}{" "}
			</button>
			{editableProduct && productId && (
				<button onClick={handleCancel}>Cancel</button>
			)}
		</form>
	);
};
export default AddProduct;
