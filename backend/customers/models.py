from django.db import models

from core.models import TimeStampedModel


class Customer(TimeStampedModel):
    full_name = models.CharField(max_length=255, null=False, blank=False)

    def __str__(self):
        return self.full_name