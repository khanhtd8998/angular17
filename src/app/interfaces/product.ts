export interface Category {
  _id?: string;
  name?: string;
  slug?: string;
  description?: string;
  hide?: boolean;
  image?: string,
  createdAt?: Date;
  updatedAt?: Date;
}




export interface Product {
  _id?: string,
  name: string,
  price: number,
  description: string,
  category: Category,
  image: string,
  hide?: boolean,
  discountPercentage?: number,
  rating?: number,
  stock?: number,
  brand?: string,
  createdAt?: string,
  updatedAt?: string
}

export interface ProductRequest {
  _id?: string,
  name?: string,
  price?: number,
  description?: string,
  category?: string,
  image?: string,
  hide?: boolean,
  brand?: string,
  rating?: number,
  stock?: number,
  discountPercentage?: number,
  createdAt?: string,
  updatedAt?: string
}


