from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Project(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=200)
    description = models.TextField()
    technology_stack = models.CharField(max_length=200)
    future_scope = models.TextField()
    # Uploaded zip file (source code)
    source_code = models.FileField(upload_to='projects/source_codes/')
    # Documentation file (could be PDF/Word etc.)
    documentation = models.FileField(upload_to='projects/documentations/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class DownloadRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="download_requests")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="download_requests")
    description = models.TextField(help_text="Why do you want to download the source code?")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request by {self.user.username} for {self.project.title}"
