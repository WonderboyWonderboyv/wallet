# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.
class Expense(models.Model):
	GROCERY = "GR"
	ENTERTAINMENT = "EN"
	VEHICLE = "VE"
	MISCELLANEOUS = "MI"
	EXPENSE_CHOICES= (
    (GROCERY, "Grocery"),
    (ENTERTAINMENT, "Entertainment"),
    (VEHICLE, "Vehicle"),
    (MISCELLANEOUS, "miscellaneous"),
	)

	title = models.CharField(max_length=120)
	expense_category = models.CharField(max_length=2,choices=EXPENSE_CHOICES,default=GROCERY)
	cash = models.IntegerField(default=0)
	time = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title


	