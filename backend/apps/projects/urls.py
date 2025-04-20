from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ProjectViewSet,
    ProjectDetailView,
    CreateDownloadRequestView,
    DownloadRequestListView,
    ApproveDownloadRequestView,
)

router = DefaultRouter()
router.register(r'', ProjectViewSet, basename='project')

# custom endpoints must come before router URLs to avoid router catching their paths
custom_urls = [
    path('<int:pk>/details/', ProjectDetailView.as_view(), name='project-detail'),
    path('create-download-request/', CreateDownloadRequestView.as_view(), name='create-download-request'),
    path('list-download-requests/', DownloadRequestListView.as_view(), name='list-download-requests'),
    path('download-request/<int:pk>/approve/', ApproveDownloadRequestView.as_view(), name='approve-download-request'),
]

urlpatterns = custom_urls + router.urls + [ 
    path('<int:pk>/details/', ProjectDetailView.as_view(), name='project-detail'),
    path('create-download-request/', CreateDownloadRequestView.as_view(), name='create-download-request'),
    path('list-download-requests/', DownloadRequestListView.as_view(), name='list-download-requests'),
    path('download-request/<int:pk>/approve/', ApproveDownloadRequestView.as_view(), name='approve-download-request'),
]
