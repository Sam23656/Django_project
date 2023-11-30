from rest_framework.permissions import BasePermission


class IsAdminOrCreateOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        elif request.method == 'PUT':
            return True
        return bool(request.user.is_staff or request.user.is_superuser)
