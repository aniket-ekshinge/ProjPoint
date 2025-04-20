# recommender/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .engine import recommend_projects

class ProjectRecommendationView(APIView):
    def post(self, request):
        query = request.data.get("query", "")
        domain = request.data.get("domain", None)
        complexity = request.data.get("complexity", None)

        if not query:
            return Response({"error": "Query is required"}, status=status.HTTP_400_BAD_REQUEST)

        recommendations = recommend_projects(query, top_n=5, domain_filter=domain, complexity_filter=complexity)
        return Response(recommendations)
