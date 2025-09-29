import { ref } from "vue";
import type { OrderResponse } from "@/dto/orders/OrderResponse";
import { useUiState } from "./useUiState";
import {OrdersAPI} from "@/services/orders.ts";

export function useOrders() {
    // state for list
    const {
        state: listState,
        data: orders,
        error: listError,
        setLoading: setListLoading,
        setData: setListData,
        setEmpty: setListEmpty,
        setFailure: setListFailure,
    } = useUiState<OrderResponse[]>();

    // state for detail
    const {
        state: detailState,
        data: order,
        error: detailError,
        setLoading: setDetailLoading,
        setData: setDetailData,
        setFailure: setDetailFailure,
    } = useUiState<OrderResponse>();

    // fetch orders (list)
    const fetchOrders = async (filters?: { customer_name?: string; date?: string }) => {
        try {
            setListLoading();
            const res = await OrdersAPI.getOrders(filters);
            if (res.data.length === 0) {
                setListEmpty();
            } else {
                setListData(res.data);
            }
        } catch (err: any) {
            setListFailure(err.message || "Failed to fetch orders");
        }
    };

    // fetch single order detail
    const fetchOrderDetail = async (id: number) => {
        try {
            setDetailLoading();
            const res = await OrdersAPI.getOrder(id);
            setDetailData(res.data);
        } catch (err: any) {
            setDetailFailure(err.message || "Failed to fetch order detail");
        }
    };

    return {
        // list
        listState,
        orders,
        listError,
        fetchOrders,

        // detail
        detailState,
        order,
        detailError,
        fetchOrderDetail,
    };
}