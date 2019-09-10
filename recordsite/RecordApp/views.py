from django.shortcuts import render

from django.http import HttpResponse


def records(request):
   context = {}
   return render(request,'records/register.html',context)

