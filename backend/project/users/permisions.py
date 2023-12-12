from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrAdminCanReadUpdate(BasePermission):
    message = "Доступ запрещен. Вы не являетесь владельцем или администратором."

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if request.method == 'POST':
            return True
        if request.user.is_authenticated:
            try:
                return obj.creator == request.user or request.user.role == 'admin' or request.user.role == 'moderator'
            except AttributeError:
                return request.user.role == 'admin' or request.user.role == 'moderator'
        else:
            return False
