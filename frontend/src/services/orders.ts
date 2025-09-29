import type {OrderRequest} from "@/dto/orders/OrderRequest.ts";
import type {AxiosResponse} from "axios";
import type {OrderResponse} from "@/dto/orders/OrderResponse.ts";
import {http} from "@/services/api.ts";
import {APIEndpoints} from "@/services/endpoints.ts";


export const OrdersAPI = {
    // POST /api/orders/ → create
    async createOrder(order: OrderRequest): Promise<AxiosResponse<OrderResponse>> {
        return http.post<OrderResponse>(APIEndpoints.ORDERS, order);
    },

    // GET /api/orders/ → list with optional filters
    async getOrders(params?: { customer_name?: string; date?: string }): Promise<AxiosResponse<OrderResponse[]>> {
        return http.get<OrderResponse[]>(APIEndpoints.ORDERS, { params });
    },

    // GET /api/orders/{id}/ → detail
    async getOrder(id: number): Promise<AxiosResponse<OrderResponse>> {
        return http.get<OrderResponse>(APIEndpoints.ORDER_DETAIL(id));
    },
};