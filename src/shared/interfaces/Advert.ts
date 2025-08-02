export interface Advert {
  _id: string;
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  imgSrc: string;
}

export interface CreateAdvertRequest {
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  imgSrc?: string;
}

export interface CreateAdvertFormData {
  name: string;
  sale: boolean;
  price: number;
  tags: string; // In form it's a string, needs to be converted to array
}