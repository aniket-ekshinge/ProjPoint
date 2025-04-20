from django.urls import path
from .views import QueryViewSet, AnswerViewSet

query_list   = QueryViewSet.as_view({'get': 'list', 'post': 'create'})
query_detail = QueryViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})

answer_list   = AnswerViewSet.as_view({'get': 'list', 'post': 'create'})
answer_detail = AnswerViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})

urlpatterns = [
    # Query endpoints
    path('queries/', query_list, name='query-list'),
    path('queries/<int:pk>/', query_detail, name='query-detail'),

    # Answer endpoints (nested under query)
    path('queries/<int:query_pk>/answers/', answer_list, name='answer-list'),
    path('queries/<int:query_pk>/answers/<int:pk>/', answer_detail, name='answer-detail'),
]
