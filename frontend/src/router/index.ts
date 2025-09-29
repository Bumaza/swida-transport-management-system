import { createRouter, createWebHistory } from "vue-router";
import CreateOrderView from "@/views/CreateOrderView.vue";
import OrderDetailView from "@/views/OrderDetailView.vue";
import OrderListView from "@/views/OrderListView.vue";

const routes = [
    { path: "/", name: "OrderList", component: OrderListView },
    { path: "/orders/:id", name: "OrderDetail", component: OrderDetailView },
    { path: "/create", name: "CreateOrder", component: CreateOrderView },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
