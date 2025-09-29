from rest_framework import serializers
from customers.models import Customer
from customers.serializers import CustomerSerializer
from orders.constants import HttpParams
from orders.models import Waypoint, Order


class WaypointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waypoint
        fields = ['location', 'type']


class OrderSerializer(serializers.ModelSerializer):
    waypoints = WaypointSerializer(many=True)
    customer_name = serializers.CharField(write_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['order_number', 'customer_name', 'customer', 'date', 'waypoints']

    def create(self, validated_data):
        waypoints_data = validated_data.pop(HttpParams.WAYPOINTS)
        customer_name = validated_data.pop(HttpParams.CUSTOMER_NAME)

        # get or create customer
        customer, _ = Customer.objects.get_or_create(full_name=customer_name)

        # create order
        order = Order.objects.create(customer=customer, **validated_data)

        # create waypoints
        for wp_data in waypoints_data:
            Waypoint.objects.create(order=order, **wp_data)

        return order

    def validate_waypoints(self, value):
        seen = set()
        for wp in value:
            key = (wp["location"].lower(), wp["type"])
            if key in seen:
                raise serializers.ValidationError(
                    f"Duplicate waypoint: {wp['type']} at {wp['location']}"
                )
            seen.add(key)
        return value