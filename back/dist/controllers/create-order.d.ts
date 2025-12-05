export interface IProductRequestData {
    id: number;
    amount: number;
}
export interface IOrderCreateRequest {
    products: IProductRequestData[];
    phoneNumber: string;
    address: string;
}
//# sourceMappingURL=create-order.d.ts.map