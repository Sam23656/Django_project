from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrAdminCanReadUpdate(BasePermission):
    message = "Доступ запрещен. Вы не являетесь владельцем или администратором."

    def has_object_permission(self, request, view, obj):
        print(request.user)
        if request.method in SAFE_METHODS:
            return True

        if request.method == 'POST' and request.user.is_superuser:
            return True

        return obj.creator == request.user or request.user.is_superuser
