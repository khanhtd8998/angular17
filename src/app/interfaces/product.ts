export interface Product {
    _id?: string,
    name: string,
    price: number,
    description: string,
    category: string,
    image: string,
    hide?: boolean,
    discountPercentage?: string,
    rating?: number,
    stock?: number,
    brand?: string,
    createdAt?: string,
    updatedAt?: string
}

// interface Category {
//     _id: string;
//     name: string;
//     slug: string;
//     description: string;
//     hide: boolean;
//     products: string[];
//     createdAt: string;
//     updatedAt: string;
//   }
// export interface Product {
//     _id: string,
//     name: string,
//     price: number,
//     description: string,
//     category: Category;
//     hide: boolean,
//     discountPercentage: string,
//     rating: number,
//     stock: number,
//     brand: string,
//     createdAt: string,
//     updatedAt: string
// }

  