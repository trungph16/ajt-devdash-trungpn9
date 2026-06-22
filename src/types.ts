export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type ProductCard =
  Pick<
    Product,
    | "id"
    | "title"
    | "price"
    | "thumbnail"
    | "category"
    | "stock"
  >;

export type ProductFilter =
  Partial<{
    keyword: string;
    category: string;
    minPrice: number;
    maxPrice: number;
  }>;

export type ReadonlyProduct =
  Readonly<Product>;