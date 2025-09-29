<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useOrders } from "@/composables/useOrders";
import { UiState } from "@/enums/UiState";

const route = useRoute();
const { detailState, order, detailError, fetchOrderDetail } = useOrders();

onMounted(() => {
    const id = String(route.params.id);
    fetchOrderDetail(id);
});
</script>

<template>
    <div>
        <h1>Order Detail</h1>

        <div v-if="detailState === UiState.Loading">Loading order...</div>
        <div v-else-if="detailState === UiState.Failure">Error: {{ detailError }}</div>
        <div v-else-if="order">
            <h2>{{ order.order_number }}</h2>
            <p>Customer: {{ order.customer.full_name }}</p>
            <p>Date: {{ order.date }}</p>

            <h3>Waypoints</h3>
            <ul>
                <li v-for="wp in order.waypoints" :key="wp.id">
                    {{ wp.type }} → {{ wp.location }}
                </li>
            </ul>
        </div>
    </div>
</template>
