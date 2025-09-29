import type {Waypoint} from "@/dto/orders/Waypoint.ts";

export interface OrderRequest {
    order_number: string;
    customer_name: string;
    date: string;
    waypoints: Waypoint[];
}