from rest_framework import serializers
from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    # Nested replies for threaded feedback
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Feedback
        fields = [
            'id', 'project', 'user', 'rating', 'comment', 'parent',
            'helpful_count', 'is_approved', 'created_at', 'updated_at', 'replies'
        ]
        read_only_fields = ['id', 'user', 'helpful_count', 'created_at', 'updated_at', 'replies']

    def get_replies(self, obj):
        # Recursively serialize replies
        if obj.replies.exists():
            return FeedbackSerializer(obj.replies.all(), many=True, context=self.context).data
        return []
