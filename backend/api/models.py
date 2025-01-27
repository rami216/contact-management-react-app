from django.db import models

# Create your models here.

class Contact(models.Model):
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  email = models.EmailField(unique=True)
  phone = models.CharField(max_length=15, unique=True)
  created_at = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return f"{self.first_name}"
  