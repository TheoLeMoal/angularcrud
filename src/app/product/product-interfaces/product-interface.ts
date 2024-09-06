export interface ProductInterface {
  id: string;
  name: string;
  description?: string;
  price: number;
}
export interface NewProductInterface extends Omit<ProductInterface, 'id'> {}
export interface PatchProductInterface extends Partial<NewProductInterface> {}
