import type {Customer} from "@/dto/customers/Customer.ts";
import type {Waypoint} from "@/dto/orders/Waypoint.ts";



export interface OrderResponse {
    id: number;
    order_number: string;
    customer: Customer;
    date: string;
    waypoints: Waypoint[];
}