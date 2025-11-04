from django.urls import path

from price_optimizer.views import product_detail, products_list

urlpatterns = [
    path("products/", view=products_list, name="products list"),
    path("products/<int:pk>", view=product_detail, name="individual product"),
]
