from django.urls import path
from .views import (
    SignupView, LoginView,
    CreateProductAPIView,
    ListProductAPIView,
    AddStockAPIView,
    RemoveStockAPIView,
    SubvariantListAPIView,
      AddVStockAPIView, RemoveVStockAPIView, ListVariantsAPIView
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
  
)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),  
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("products/", CreateProductAPIView.as_view(), name="create-product"),
    path("products/list/", ListProductAPIView.as_view(), name="list-products"),
    path("subvariants/<int:subvariant_id>/add_stock/", AddStockAPIView.as_view(), name="add-stock"),
    path("subvariants/", SubvariantListAPIView.as_view(), name="subvariant-list"),
    path("subvariants/<int:subvariant_id>/remove_stock/", RemoveStockAPIView.as_view(), name="remove-stock"),
    path('variants/', ListVariantsAPIView.as_view(), name='list-variants'),
    path('variants/<int:pk>/add_stock/', AddVStockAPIView.as_view(), name='add-stock'),
    path('variants/<int:pk>/remove_stock/', RemoveVStockAPIView.as_view(), name='remove-stock'),

]
