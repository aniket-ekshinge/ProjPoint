from rest_framework import viewsets, permissions
from .models import Feedback
from .serializers import FeedbackSerializer

class FeedbackViewSet(viewsets.ModelViewSet):
    """
    Provides CRUD endpoints for feedback.
    - List feedback (optionally filtered by project).
    - Create feedback (automatically sets the user).
    - Allows updating or deleting only if permitted.
    """
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
         project_id = self.request.query_params.get('project')
         qs = Feedback.objects.filter(is_approved=True, parent__isnull=True)
         if project_id:
              qs = qs.filter(project_id=project_id)
         return qs


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
