# accounts/urls.py
from django.urls import path
from .views import (
    UserLoginView,
    AdminLoginView,
    BulkUserUploadView,
    ChangePasswordView,
    UserAcademicYearUpdateView,
    ProfileView
)

urlpatterns = [
    path('user-login/', UserLoginView.as_view(), name='user-login'),
    path('admin-login/', AdminLoginView.as_view(), name='admin-login'),
    path('upload-students/', BulkUserUploadView.as_view(), name='upload-students'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('update-my-academic-year/', UserAcademicYearUpdateView.as_view(), name='update-my-academic-year'),
    path('profile/', ProfileView.as_view(), name='profile'),
]
