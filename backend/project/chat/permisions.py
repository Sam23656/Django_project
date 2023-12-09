from rest_framework.permissions import BasePermission, SAFE_METHODS


class ListOrDetailPermission(BasePermission):
    message = "Доступ запрещен."

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True