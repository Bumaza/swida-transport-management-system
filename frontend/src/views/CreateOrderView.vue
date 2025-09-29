<script setup lang="ts">
import {ref, watch} from "vue";
import {useCreateOrder} from "@/composables/useCreateOrder";
import {UiState} from "@/enums/UiState";
import {WaypointType} from "@/dto/orders/WaypointType";

const {state, data: createdOrder, error, createOrder} = useCreateOrder();

const orderNumber = ref("");
const customerName = ref("");
const date = ref("");
const waypoints = ref([{location: "", type: WaypointType.Pickup}]);

const addWaypoint = () => {
    waypoints.value.push({location: "", type: WaypointType.Delivery});
};

const removeWaypoint = (index: number) => {
    waypoints.value.splice(index, 1);
};

const submit = () => {
    createOrder({
        order_number: orderNumber.value,
        customer_name: customerName.value,
        date: date.value,
        waypoints: waypoints.value,
    });
};

watch(
    () => state.value,
    (newState) => {
        if (newState === UiState.Data && createdOrder.value) {
            orderNumber.value = "";
            customerName.value = "";
            date.value = "";
            waypoints.value = [{location: "", type: WaypointType.Pickup}];
        }
    }
);

</script>

<template>
    <div>
        <h1>Create Order</h1>

        <form @submit.prevent="submit">
            <div>
                <label>Order Number</label>
                <input v-model="orderNumber" required/>
            </div>

            <div>
                <label>Customer Name</label>
                <input v-model="customerName" required/>
            </div>

            <div>
                <label>Date</label>
                <input v-model="date" type="date" required/>
            </div>

            <div>
                <h3>Waypoints</h3>
                <div v-for="(wp, index) in waypoints" :key="index" class="mb-2 flex gap-2 items-center">
                    <input v-model="wp.location" placeholder="Location" required/>
                    <select v-model="wp.type">
                        <option :value="WaypointType.Pickup">Pickup</option>
                        <option :value="WaypointType.Delivery">Delivery</option>
                    </select>
                    <button
                        type="button"
                        @click="removeWaypoint(index)"
                        v-if="index > 0"
                    >
                        ❌ Remove
                    </button>
                </div>
                <button type="button" @click="addWaypoint">+ Add Waypoint</button>
            </div>

            <button type="submit">Create Order</button>
        </form>

        <div v-if="state === UiState.Loading">Creating order...</div>
        <div v-else-if="state === UiState.Failure">Error: {{ error }}</div>
        <div v-else-if="state === UiState.Data && createdOrder">
            ✅ Order created: {{ createdOrder.order_number }}
        </div>
    </div>
</template>
