export interface ProductType {
    id:number;
    isNewProd: boolean;
    isHit: boolean;
    price: number;
    name: string;
    rating: number;
    description: string;
    characteristics:string;
}

export interface PaginatedResponse {
    goods: ProductType[];
    currentPage: number;
    totalPages: number;
    total: number;
}