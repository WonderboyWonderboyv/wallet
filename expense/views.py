# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404
from .models import Expense
from rest_framework.views import APIView
from rest_framework import status
from .serializers import ExpenseSerializer

# Create your views here.
def home(request):
	context = locals()
	return render(request,'index.html', context)
def chart(request):
	context = locals()
	return render(request,'chart.html', context)

class ExpenseListView(APIView):
	def get(self, request):
		expense = Expense.objects.all()
		serializer = ExpenseSerializer(expense, many=True)
		return Response(serializer.data)
	def put(self, request):
		serializer = ExpenseSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_404_BAD_REQUEST)

class ExpenseDetailView(APIView):
	def get(self, request, pk):
		expense = get_object_or_404(Expense, pk=pk)
		serializer = ExpenseSerializer(expense)
		return Response(serializer.data)
	def delete(self, request, pk):
		expense = get_object_or_404(Expense, pk=pk)
		expense.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


