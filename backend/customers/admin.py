from django.contrib import admin
from customers.models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    search_fields = ['full_name']
    ordering = ('-created_at',)
    readonly_fields = ['created_at', 'updated_at']


