from enum import Enum


class WaypointType(Enum):
    PICKUP = "Pickup"
    DELIVERY = "Delivery"

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]
