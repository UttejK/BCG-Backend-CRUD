from django.contrib import admin

from price_optimizer.models import Product

admin.site.site_header = "Price Optimizer Admin"
admin.site.site_title = "Price Optimizer Admin Portal"
admin.site.index_title = "Welcome to the Price Optimizer Admin Portal"

# Register your models here.
admin.site.register(Product)
