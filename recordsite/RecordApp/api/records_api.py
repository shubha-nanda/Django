from RecordApp.models import Registration
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect

@csrf_exempt
def Display(request):
        if request.method == "POST":
                Register = Registration.objects.create(
                        FirstName = json.loads(request.body)['FirstName'],
                        LastName = json.loads(request.body)['LastName'],
                        Mobile = json.loads(request.body)['Mobile'],
                        City = json.loads(request.body)['City'],
                        State = json.loads(request.body)['State']
                        )
                Register.save()         
                return HttpResponse(json.dumps({'success':True}))   



@csrf_exempt
def allRecords(request):
        collegesData = Registration.objects.all()
        collegesList= []
        for college in collegesData:
                collegeData = {}
                collegeData['id'] = college.id
                collegeData['FirstName'] = college.FirstName
                collegeData['LastName'] = college.LastName
                collegeData['Mobile'] = college.Mobile
                collegeData['City'] = college.City
                collegeData['State'] =  college.State 
                collegesList.append(collegeData)
                
        return HttpResponse(json.dumps(collegesList))    

@csrf_exempt
def Update(request):
    if request.method == 'POST':
        RecordsData = Registration.objects.filter(
            id = json.loads(request.body)["id"]
            ).update(
            FirstName = json.loads(request.body)["FirstName"],
            LastName = json.loads(request.body)["LastName"],
            Mobile =  json.loads(request.body)["Mobile"],
            City = json.loads(request.body)["City"],
            State = json.loads(request.body)["State"]           
            )
                   
        return HttpResponse(json.dumps({'success':True}))  

@csrf_exempt
def deleteRecord(request):
    if request.method == 'POST':
        deleteRecords = Registration.objects.get(id=json.loads(request.body)['id']).delete()     
        return HttpResponse(json.dumps({'success':True}))  

@csrf_exempt
def DisplayRecord(request):
    if request.method == 'POST':
        selectedRecord = Registration.objects.filter(id=json.loads(request.body)['id'])
        collegesList= []
        for college in selectedRecord:
                collegeData = {}
                collegeData['id'] = college.id
                collegeData['FirstName'] = college.FirstName
                collegeData['LastName'] = college.LastName
                collegeData['Mobile'] = college.Mobile
                collegeData['City'] = college.City
                collegeData['State'] =  college.State 
                
                      
        return HttpResponse(json.dumps(collegeData))   

