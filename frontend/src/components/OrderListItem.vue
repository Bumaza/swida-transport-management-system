<script setup lang="ts">
import { useRouter } from "vue-router";
import type { OrderResponse } from "@/dto/orders/OrderResponse";

const props = defineProps<{
    order: OrderResponse;
}>();

const router = useRouter();

const goToDetail = (orderId: string) => {
    console.log(orderId)
    router.push({ name: "OrderDetail", params: { id: orderId }});
};
</script>

<template>
    <li class="order-item" @click="goToDetail(order.order_number)">
        <span><strong>{{ order.order_number }}</strong> – {{ order.customer.full_name }}</span>
        <span>{{ order.date }}</span>
        <span>{{ order.waypoints.length }} waypoints</span>
    </li>
</template>

<style scoped>
.order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    transition: background 0.2s;
}
.order-item:hover {
    background: #f5f5f5;
}
</style>
