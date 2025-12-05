export interface ICategory {
    id: number;
    title: string;
    description: string;
}
export interface ICategoryErrors {
    title?: string;
    description?: string;
    alredayCreated?: string;
    noExistedCategory?: string;
    emptyIdParam?: string;
}
export interface ICategoryCreateResponse {
    id: number;
}
export interface ICategoryIdParam {
    id: number;
}
export interface ICategoryCreateRequest {
    title: string;
    description: string;
}
//# sourceMappingURL=category.d.ts.map