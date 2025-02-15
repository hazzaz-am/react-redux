import { useState } from "react";
import AddProduct from "./features/products/AddProduct";
import ProductLists from "./features/products/ProductLists";
import { ProductType } from "./features/products/types";

function App() {
	const [editableProduct, setEditableProduct] = useState<ProductType | null>(
		null
	);
	const [productId, setProductId] = useState<string | null>(null);

	function handleEditableProduct(product: ProductType) {
		setEditableProduct({ ...product });
		setProductId(product.id);
	}

	function handleClearForm() {
		setEditableProduct(null);
		setProductId(null);
	}

	return (
		<>
			<AddProduct
				editableProduct={editableProduct}
				onHandleClearForm={handleClearForm}
				productId={productId}
			/>
			<ProductLists onHandleEditableProduct={handleEditableProduct} />
		</>
	);
}

export default App;
