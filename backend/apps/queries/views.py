from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Query, Answer
from .serializers import QuerySerializer, AnswerSerializer

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class QueryViewSet(viewsets.ModelViewSet):
    queryset = Query.objects.all().order_by('-created_at')
    serializer_class = QuerySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class AnswerViewSet(viewsets.ModelViewSet):
    serializer_class = AnswerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Answer.objects.filter(query_id=self.kwargs['query_pk']).order_by('created_at')

    def perform_create(self, serializer):
        query = Query.objects.get(pk=self.kwargs['query_pk'])
        serializer.save(responder=self.request.user, query=query)