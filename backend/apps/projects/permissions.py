from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrAdminForDelete(BasePermission):
    """
    Custom permission:
      - For safe methods, allow everyone.
      - For updates, only the owner can update.
      - For delete, only admin users can delete.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if request.method == 'DELETE':
            return request.user and request.user.is_staff
        # For update (PUT/PATCH), only the owner is allowed.
        return obj.owner == request.user
