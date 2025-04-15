from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

class NoteListCreate(generics.ListCreateAPIView): # This class is used to list and create notes
    serializer_class = NoteSerializer # This line is used to define the serializer for the Note model
    permission_classes = [IsAuthenticated] # This line is used to set the permission classes for the view

    def get_queryset(self): # This method is used to get the queryset for the view
        user = self.request.user # This line is used to get the user from the request
        return Note.objects.filter(author=user) # This line is used to filter the notes by the author

    def perform_create(self, serializer): # This method is used to perform the create action
        if serializer.is_valid(): # This line is used to check if the serializer is valid
            serializer.save(author=self.request.user) # This line is used to save the note with the author
        else:
            print(serializer.errors) # This line is used to print the errors if the serializer is not valid


class NoteDelete(generics.DestroyAPIView): # This class is used to delete a note
    serializer_class = NoteSerializer # This line is used to define the serializer for the Note model
    permission_classes = [IsAuthenticated] # This line is used to set the permission classes for the view

    def get_queryset(self): # This method is used to get the queryset for the view
        user = self.request.user # This line is used to get the user from the request
        return Note.objects.filter(author=user) # This line is used to filter the notes by the author


class CreateUserView(generics.CreateAPIView): # This class is used to create a new user
    queryset = User.objects.all() # This line is used to get all the users from the database
    serializer_class = UserSerializer # This line is used to define the serializer for the User model
    permission_classes = [AllowAny] # This line is used to set the permission classes for the view