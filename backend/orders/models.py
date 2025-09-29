from django.db import models
from core.models import TimeStampedModel
from customers.models import Customer
from orders.enums import WaypointType


class Order(TimeStampedModel):
    order_number = models.CharField(
        max_length=64,
        unique=True,
        db_index=True,
        verbose_name="Order Number",
        help_text="Unique identifier for the transport order"
    )

    customer = models.ForeignKey(
        Customer,
        related_name="orders",
        on_delete=models.PROTECT,
        db_index=True
    )

    date = models.DateField(db_index=True)

    class Meta:
        db_table = "orders"
        verbose_name = "Order"
        verbose_name_plural = "Orders"
        indexes = [
            models.Index(fields=["order_number"], name="idx_order_number"),
            models.Index(fields=["customer", "date"], name="idx_order_customer_date"),
        ]

    def __str__(self):
        return f"{self.order_number} - {self.customer.full_name}"


class Waypoint(TimeStampedModel):
    order = models.ForeignKey(Order, related_name="waypoints", on_delete=models.CASCADE)
    location = models.CharField(max_length=255, null=False, blank=False)
    type = models.CharField(
        max_length=16,
        choices=WaypointType.choices(),
        null=False,
        blank=False,
    )


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["order", "location", "type"],
                name="unique_waypoint_per_order"
            )
        ]

    def __str__(self):
        return f"{self.type} 📍 {self.location} #{self.order.order_number}"
