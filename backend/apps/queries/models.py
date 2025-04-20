from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Query(models.Model):
    """A question posted by a user."""
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='queries')
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Answer(models.Model):
    """An answer provided by a user for a given query."""
    query = models.ForeignKey(Query, on_delete=models.CASCADE, related_name='answers')
    responder = models.ForeignKey(User, on_delete=models.CASCADE, related_name='answers')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Answer to {self.query_id} by {self.responder}"  
