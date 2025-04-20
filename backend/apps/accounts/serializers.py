# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # Write-only to ensure the password is never exposed in responses
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'college_id', 'full_name',
                  'phone_number', 'academic_year', 'branch', 'password', 'is_staff',)
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

class BulkUserUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class AcademicYearUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['academic_year']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Expose all non-sensitive fields (password is excluded)
        fields = ('id', 'email', 'username', 'college_id', 'full_name',
                  'phone_number', 'academic_year', 'branch', 'is_staff')
