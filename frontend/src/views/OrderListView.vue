<script setup lang="ts">
import { onMounted } from "vue";
import { useOrders } from "@/composables/useOrders";
import { UiState } from "@/enums/UiState";
import OrderListItem from "@/components/OrderListItem.vue";

const { listState, orders, listError, fetchOrders } = useOrders();

onMounted(() => {
    fetchOrders();
});
</script>

<template>
    <div>
        <h1>Orders</h1>

        <div v-if="listState === UiState.Loading">Loading orders...</div>
        <div v-else-if="listState === UiState.Empty">No orders found</div>
        <div v-else-if="listState === UiState.Failure">Error: {{ listError }}</div>
        <ul v-else>
            <OrderListItem v-for="o in orders" :key="o.id" :order="o" />
        </ul>
    </div>
</template>
