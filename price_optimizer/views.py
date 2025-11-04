from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from price_optimizer.models import Product
from price_optimizer.permissions import ProductModelPermission
from price_optimizer.serializers import ProductSerializer


# Create your views here.
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated, ProductModelPermission])
def products_list(request):
    try:
        if request.method == "GET":
            queryset = Product.objects.all()

            name_filter = request.GET.get("name", None)
            if name_filter:
                queryset = queryset.filter(name__icontains=name_filter)

            product_filter = request.GET.get("category", None)
            if product_filter:
                queryset = queryset.filter(category__iexact=product_filter)

            serializer = ProductSerializer(queryset, many=True)

            return Response(serializer.data)

        elif request.method == "POST":
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Fallback
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated, ProductModelPermission])
def product_detail(request, pk):
    try:
        product_item = Product.objects.get(pk=pk)

        if request.method == "GET":
            serializer = ProductSerializer(product_item)
            return Response(serializer.data)

        elif request.method in ["PUT", "PATCH"]:
            partial = request.method == "PATCH"
            serializer = ProductSerializer(
                product_item, data=request.data, partial=partial
            )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == "DELETE":
            product_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        # Fallback
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
