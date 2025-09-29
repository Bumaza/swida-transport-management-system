import type {WaypointType} from "@/dto/orders/WaypointType.ts";

export interface Waypoint {
    id?: number;
    location: string;
    type: WaypointType;
}