from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.generics import RetrieveAPIView
from .models import Project, DownloadRequest
from .serializers import ProjectSerializer, DownloadRequestSerializer
from .permissions import IsOwnerOrAdminForDelete


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrAdminForDelete]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProjectDetailView(RetrieveAPIView):
    """
    Custom view to fetch a single project and include user-specific access info.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        project = self.get_object()
        serializer = self.get_serializer(project)

        request_obj = DownloadRequest.objects.filter(
            user=request.user,
            project=project
        ).first()

        return Response({
            **serializer.data,
            "has_access": request_obj and request_obj.status == 'approved',
            "request_status": request_obj.status if request_obj else None
        })

class CreateDownloadRequestView(generics.CreateAPIView):
    """
    Endpoint for a user to request download of a project's source code.
    """
    queryset = DownloadRequest.objects.all()
    serializer_class = DownloadRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DownloadRequestListView(generics.ListAPIView):
    """
    Admin view to list all pending download requests.
    """
    queryset = DownloadRequest.objects.filter(status='pending')
    serializer_class = DownloadRequestSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class ApproveDownloadRequestView(generics.UpdateAPIView):
    """
    Admin view to approve or reject a download request.
    """
    queryset = DownloadRequest.objects.all()
    serializer_class = DownloadRequestSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        new_status = request.data.get('status')
        if new_status not in ['approved', 'rejected']:
            return Response({"error": "Status must be 'approved' or 'rejected'."}, status=status.HTTP_400_BAD_REQUEST)
        instance.status = new_status
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

