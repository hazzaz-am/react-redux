import { useState } from "react";
import AddProduct from "./features/products/AddProduct";
import ProductLists from "./features/products/ProductLists";
import { ProductType } from "./features/products/types";

function App() {
	const [editableProduct, setEditableProduct] = useState<ProductType | null>(null);
	const [productId, setProductId] = useState<string | null>(null)

	function handleEditableProduct(product: ProductType, productId: string) {
		setEditableProduct({ ...product });
		setProductId(productId)
	}

	function handleCancelUpdate() {
		setEditableProduct(null)
		setProductId(null)
	}

	return (
		<>
			<AddProduct
				editableProduct={editableProduct}
				productId={productId}
				onHandleCancelUpdate={handleCancelUpdate}
			/>
			<ProductLists onHandleEditableProduct={handleEditableProduct} />
		</>
	);
}

export default App;
