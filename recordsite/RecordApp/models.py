from django.db import models

# Create your models here.
class Registration(models.Model):
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    Mobile = models.IntegerField()
    City = models.CharField(max_length=100)
    State = models.CharField(max_length=100)
       
    def __str__(self):
        return self.FirstName