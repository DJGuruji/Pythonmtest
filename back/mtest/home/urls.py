from django.urls import path
from .views import (
    CreateProductAPIView,
    ListProductAPIView,
    AddStockAPIView,
    RemoveStockAPIView,
    SubvariantListAPIView,
)
from .views import SignupView, LoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),  
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Product-related endpoints
    
    path("products/", CreateProductAPIView.as_view(), name="create-product"),
    path("products/list/", ListProductAPIView.as_view(), name="list-products"),
    
    # Stock management endpoints
    path("subvariants/<int:subvariant_id>/add_stock/", AddStockAPIView.as_view(), name="add-stock"),

    path("subvariants/", SubvariantListAPIView.as_view(), name="subvariant-list"),
    path("subvariants/<uuid:subvariant_id>/remove_stock/", RemoveStockAPIView.as_view(), name="remove-stock"),
]
