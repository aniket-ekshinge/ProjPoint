from rest_framework import serializers
from .models import Project, DownloadRequest

class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # We show the URL for the documentation file but not for source code.
    documentation_url = serializers.SerializerMethodField(read_only=True)
    source_code_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Project
        fields = (
            'id', 'owner', 'title', 'description', 'technology_stack',
            'future_scope', 'source_code', 'documentation', 'source_code_url', 'documentation_url',
            'created_at', 'updated_at'
        )

    def get_documentation_url(self, obj):
        request = self.context.get('request')
        if obj.documentation:
            return request.build_absolute_uri(obj.documentation.url)
        return None


    def get_source_code_url(self, obj):
        request = self.context.get('request')
        if not obj.source_code:
            return None

        # check for an approved request
        approved = DownloadRequest.objects.filter(
            project=obj,
            user=request.user,
            status='approved'
        ).exists()

        if approved:
            return request.build_absolute_uri(obj.source_code.url)
        return "Download restricted – request permission."

class DownloadRequestSerializer(serializers.ModelSerializer):
    project_title = serializers.ReadOnlyField(source='project.title')
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = DownloadRequest
        fields = (
            'id', 'project', 'project_title', 'user',
            'description', 'status', 'created_at'
        )
