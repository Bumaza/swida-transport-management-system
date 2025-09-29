from django.contrib import admin
from orders.models import Waypoint, Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    search_fields = ['order_number', 'customer__name']
    list_filter = ['created_at']
    ordering = ['created_at']


@admin.register(Waypoint)
class WaypointAdmin(admin.ModelAdmin):
    search_fields = ['location', 'order__order_number']
    list_filter = ['type']
    raw_id_fields = ['order']

