# recommender/urls.py
from django.urls import path
from .views import ProjectRecommendationView

urlpatterns = [
    path('recommend/', ProjectRecommendationView.as_view(), name='project-recommendation'),
]
