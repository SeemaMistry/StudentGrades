from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) # each account is linked to one profile
    
    # set fields
    first_name = models.CharField(max_length=225, default='')
    last_name = models.CharField(max_length=225, default='')
    phone = models.CharField(max_length=20, default='')
    city = models.CharField(max_length=20, default='')

    def __str__(self):
        return self.first_name + self.last_name
