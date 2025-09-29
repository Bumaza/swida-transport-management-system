<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useOrders } from "@/composables/useOrders";
import { UiState } from "@/enums/UiState";
import OrderListItem from "@/components/OrderListItem.vue";

const { listState, orders, listError, fetchOrders } = useOrders();

const customerName = ref("");
const date = ref("");

const applyFilters = () => {
    fetchOrders({
        customer_name: customerName.value || null,
        date: date.value || null,
    });
};

onMounted(() => {
    fetchOrders();
});
</script>

<template>
    <div>
        <h1>Orders</h1>

        <div style="margin-bottom: 1rem">
            <input v-model="customerName" placeholder="Filter by customer name" @keyup.enter="applyFilters" />
            <input v-model="date" type="date" />
            <button type="button" @click="applyFilters">Apply Filters</button>
        </div>

        <div v-if="listState === UiState.Loading">Loading orders...</div>
        <div v-else-if="listState === UiState.Empty">No orders found</div>
        <div v-else-if="listState === UiState.Failure">Error: {{ listError }}</div>
        <ul v-else>
            <OrderListItem v-for="o in orders" :key="o.id" :order="o" />
        </ul>
    </div>
</template>
