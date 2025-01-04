import uuid
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Variant, SubVariant
from rest_framework.generics import ListAPIView
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated 
from .pagination import ProductPagination 
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from .serializers import CustomTokenObtainPairSerializer
from .serializers import *
from django.shortcuts import get_object_or_404
from decimal import Decimal 
import logging


#Signup
class SignupView(APIView):
    permission_classes = [] 

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)


        user = User.objects.create_user(username=username, password=password)

        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)


#Login

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


#Creating Product

logger = logging.getLogger(__name__)

class CreateProductAPIView(APIView):
    permission_classes = [IsAuthenticated]  

    def post(self, request):
        data = request.data
        logger.debug(f"Received data: {data}")  
        
        try:
            
            created_user = request.user
            
            product = Product.objects.create(
                ProductName=data["name"],
                ProductID=str(uuid.uuid4()),
                ProductCode=data.get("code", uuid.uuid4().hex[:10]),
                CreatedUser=created_user 
            )

            logger.debug(f"Created product: {product}")

            for variant_data in data.get("variants", []):
                variant = Variant.objects.create(product=product, name=variant_data["name"])
                for option in variant_data["options"]:
                    SubVariant.objects.create(variant=variant, option=option)
            
            return Response({"message": "Product created successfully"}, status=status.HTTP_201_CREATED)
        
        except KeyError as e:
            logger.error(f"Missing field: {e}")
            return Response({"error": f"Missing field: {e}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Listing Product
@permission_classes([IsAuthenticated])
class ListProductAPIView(ListAPIView):
    queryset = Product.objects.prefetch_related("variants__subvariants").all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination



#Add SUbvarient

logger = logging.getLogger(__name__)
class AddStockAPIView(APIView):
    def post(self, request, subvariant_id):
        logger.info(f"Received request to add stock for subvariant_id: {subvariant_id}")
        try:
            subvariant = get_object_or_404(SubVariant, id=subvariant_id)
            stock = request.data.get("stock")
            
            if not stock:
                logger.error(f"Stock value missing for subvariant_id: {subvariant_id}")
                return Response({"message": "Stock is required"}, status=status.HTTP_400_BAD_REQUEST)

            try:
              
                stock = Decimal(stock)
            except (ValueError, InvalidOperation):
                logger.error(f"Invalid stock value provided for subvariant_id: {subvariant_id}: {stock}")
                return Response({"message": "Invalid stock value provided"}, status=status.HTTP_400_BAD_REQUEST)

            subvariant.stock += stock
            subvariant.save()

            logger.info(f"Stock added successfully for subvariant_id: {subvariant_id}")
            return Response({"message": "Stock added successfully"}, status=status.HTTP_200_OK)
        
        except Exception as e:
            logger.error(f"Error adding stock for subvariant_id: {subvariant_id}: {str(e)}")
            return Response({"message": "Internal Server Error", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#Remove subvarient
@permission_classes([IsAuthenticated])
class RemoveStockAPIView(APIView):
    def post(self, request, subvariant_id):
        try:
            subvariant = SubVariant.objects.get(id=subvariant_id)
            stock = Decimal(request.data.get("stock", 0))
            if stock <= 0:
                return Response({"error": "Stock must be a positive number"}, status=status.HTTP_400_BAD_REQUEST)
            if subvariant.stock >= stock:
                subvariant.stock -= stock
                subvariant.save()

                product = subvariant.variant.product
                product.TotalStock -= stock
                product.save()

                return Response({"message": "Stock removed successfully"}, status=status.HTTP_200_OK)
            return Response({"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST)
        except SubVariant.DoesNotExist:
            return Response({"error": "SubVariant not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Listing SUbvarient
class SubvariantListAPIView(ListAPIView):
    queryset = SubVariant.objects.all()
    serializer_class = SubVariantSerializer 
    
    
    # Add Stock To Varient
class AddVStockAPIView(APIView):
    def post(self, request, pk):
        variant = get_object_or_404(Variant, pk=pk)
        additional_stock = request.data.get("stock", 0)
        try:
            additional_stock = Decimal(additional_stock)
            variant.stocks += additional_stock
            variant.save()
            return Response({"message": "Stock added successfully", "stocks": variant.stocks}, status=status.HTTP_200_OK)
        except ValueError:
            return Response({"error": "Invalid stock value"}, status=status.HTTP_400_BAD_REQUEST)

# Remove Varient Stock
class RemoveVStockAPIView(APIView):
    def post(self, request, pk):
        variant = get_object_or_404(Variant, pk=pk)
        reduce_stock = request.data.get("stock", 0)
        try:
            reduce_stock = Decimal(reduce_stock)
            if reduce_stock > variant.stocks:
                return Response({"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST)
            variant.stocks -= reduce_stock
            variant.save()
            return Response({"message": "Stock removed successfully", "stocks": variant.stocks}, status=status.HTTP_200_OK)
        except ValueError:
            return Response({"error": "Invalid stock value"}, status=status.HTTP_400_BAD_REQUEST)

# List Variants
class ListVariantsAPIView(APIView):
    def get(self, request):
        variants = Variant.objects.all()
        serializer = VariantSerializer(variants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
