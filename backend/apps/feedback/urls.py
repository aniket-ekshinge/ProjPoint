# apps/feedback/urls.py
from django.urls import path
from .views import FeedbackViewSet
from rest_framework.routers import DefaultRouter
import sys
print("Loading apps.projects.urls", file=sys.stderr)


router = DefaultRouter()
router.register(r'', FeedbackViewSet, basename='feedback')

urlpatterns = router.urls
