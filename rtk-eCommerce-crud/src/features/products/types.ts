
export type ProductType = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
}

export type InitialStateType = {
	isLoading: boolean;
	products: ProductType[];
	error: null | string;
};