from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrCreateOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS or request.method == 'POST' or request.method == 'PUT':
            return True
        return request.user.is_staff or request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET' or request.method == 'PUT':
            return obj == request.user or request.user.is_staff
        return obj == request.user or request.user.is_staff

