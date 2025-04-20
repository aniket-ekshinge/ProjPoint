# projpoint/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token  # Import the built-in view
import sys
from django.conf import settings
from django.conf.urls.static import static

print("Loading projpoint.urls", file=sys.stderr)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),  # Use the correct app name and path
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/projects/', include('apps.projects.urls')),
    path('api/feedback/', include('apps.feedback.urls')),
    path("api/recommend/", include("apps.recommender.urls")),
    path('api/queries/', include('apps.queries.urls')),

            # Add other app includes as needed

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

