export const PRODUCT_TAGS = ["lifestyle", "mobile", "motor", "work"] as const;
export type Tag = (typeof PRODUCT_TAGS)[number];

export interface Product {
  _id: string;
  name: string;
  price: number;
  isForSale: boolean;
  /** @deprecated alias kept for back-compat — prefer isForSale */
  sale?: boolean;
  tags: Tag[];
  imgSrc: string | null;
  /** @deprecated alias of imgSrc */
  photo?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductInput {
  name: string;
  price: number;
  isForSale: boolean;
  tags: Tag[];
  photo: File;
}

export interface UpdateProductInput {
  name?: string;
  price?: number;
  isForSale?: boolean;
  tags?: Tag[];
  photo?: File;
}

export interface ProductsListQuery {
  search?: string;
  tag?: string;
  minPrice?: number;
  maxPrice?: number;
  isForSale?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
