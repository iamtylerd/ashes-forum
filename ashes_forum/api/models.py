from django.db import models

# Create your models here.
class SignUp(models.Model):
  email = models.EmailField(max_length=120)
  created_on = models.DateTimeField(auto_now_add=True)