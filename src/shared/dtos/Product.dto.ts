export type Tag = "Laptop" | "Tablet" | "Smartphone" | "Desktop";

export interface ProductData {
  name: string;
  price: number;
  isForSale?: boolean;
  photo?: {
    data: Buffer | null;
    contentType: string;
  };
  tags?: Tag[];
}

export interface Product extends ProductData {
  _id: string;
  sale?: boolean;
  imgSrc?: string;
}

export interface CreateProductDTO {
  name: string;
  price: number;
  isForSale?: boolean;
  tags?: Tag[];
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
