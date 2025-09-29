from django.db import transaction, IntegrityError
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response

from orders.constants import HttpParams
from orders.models import Order
from orders.serializers import OrderSerializer


class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Order.objects.all().select_related("customer").prefetch_related("waypoints")

        # optional filters
        customer_name = self.request.query_params.get(HttpParams.CUSTOMER_NAME)
        date = self.request.query_params.get(HttpParams.DATE)

        if customer_name:
            queryset = queryset.filter(customer__full_name__icontains=customer_name)
        if date:
            queryset = queryset.filter(date=date)

        return queryset

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().create(request, *args, **kwargs)
        except IntegrityError:
            return Response(
                {"error": "Duplicate waypoint detected for this order"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all().select_related("customer").prefetch_related("waypoints")
    serializer_class = OrderSerializer
    lookup_field = "order_number"
    lookup_url_kwarg = "order_number"