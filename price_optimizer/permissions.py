from rest_framework.permissions import BasePermission

METHOD_TO_CODENAME = {
    "GET": "view_product",
    "HEAD": "view_product",
    "OPTIONS": "view_product",
    "POST": "add_product",
    "PUT": "change_product",
    "PATCH": "change_product",
    "DELETE": "delete_product",
}


class ProductModelPermission(BasePermission):
    """
    Checks model permissions for price_optimizer.Product for FBVs.
    Requires request.user (use IsAuthenticated before this).
    """

    def has_permission(self, request, view):
        codename = METHOD_TO_CODENAME.get(request.method)
        if not codename:
            return False
        return request.user.has_perm(f"price_optimizer.{codename}")
