from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrCreateOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if request.method == 'POST':
            return True
        elif request.method == 'PUT':
            return True
        return bool(request.user.is_staff or request.user.is_superuser)

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET' or request.method == 'PUT':
            return obj.id == request.user.id or request.user.is_staff
        return obj.id == request.user.id or request.user.is_staff
