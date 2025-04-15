from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta: # This class is used to define the serializer for the User model
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}} # This field is set to write-only to prevent users from seeing it in the response such as pasword. 

    def create(self, validated_data): # This method is used to create a new user
        print(validated_data)
        user = User.objects.create_user(**validated_data) # This method is used to create a new user with the validated data
        return user


class NoteSerializer(serializers.ModelSerializer): # This class is used to define the serializer for the Note model
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}} # This field is set to read-only to prevent users from modifying it