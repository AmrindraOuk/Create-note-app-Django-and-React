from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") # This line is used to create a foreign key relationship with the User model. The related_name attribute allows us to access the notes of a user using user.notes.all()

    def __str__(self): # This method is used to return the string representation of the Note model 
        return self.title