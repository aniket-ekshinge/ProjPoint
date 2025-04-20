from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Feedback(models.Model):
    project = models.ForeignKey('projects.Project', on_delete=models.CASCADE, related_name='feedbacks')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedbacks')
    rating = models.PositiveSmallIntegerField(default=5)  # 1-5 stars
    comment = models.TextField()
    # For threaded replies; null means this is a top-level feedback
    parent = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)
    # Count how many users found this feedback helpful/upvoted it
    helpful_count = models.PositiveIntegerField(default=0)
    # Flag for moderation: if False, feedback is hidden from public view
    is_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Feedback by {self.user.username} on {self.project.title}"
