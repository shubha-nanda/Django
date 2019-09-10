from django.urls import path
from .api import records_api
from .static.js import *


from . import views



urlpatterns = [
    path('records/', views.records, name='records'),
    path('records/Display/', records_api.Display, name='Display'),
    path('records/allRecords/', records_api.allRecords, name='allRecords'),
    path('records/DisplayRecord/', records_api.DisplayRecord, name='DisplayRecord'),
    path('records/deleteRecord/', records_api.deleteRecord, name='deleteRecord'),
    path('records/Update/', records_api.Update, name='Update'),

]

