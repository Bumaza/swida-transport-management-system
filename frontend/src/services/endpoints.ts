
export class APIEndpoints {
    // Orders
    static readonly ORDERS = "/orders/";               // list & create
    static readonly ORDER_DETAIL = (id: number) => `/orders/${id}/`; // retrieve
}