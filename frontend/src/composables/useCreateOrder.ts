import {ref} from "vue";
import type {OrderRequest} from "@/dto/orders/OrderRequest";
import type {OrderResponse} from "@/dto/orders/OrderResponse";
import {useUiState} from "./useUiState";
import {OrdersAPI} from "@/services/orders.ts";

export function useCreateOrder() {
    const {state, data, error, setLoading, setData, setFailure} = useUiState<OrderResponse>();

    const createOrder = async (order: OrderRequest) => {
        try {
            setLoading();
            const res = await OrdersAPI.createOrder(order);
            setData(res.data);
        } catch (err: any) {
            if (err.response && err.response.data) {
                let validationError = JSON.stringify(err.response.data, null, 2);
                setFailure(`Validation error ${validationError}`);
            } else {
                setFailure(err.message || "Failed to create order");
            }
        }
    };

    return {state, data, error, createOrder};
}
