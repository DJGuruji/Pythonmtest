from rest_framework import serializers
from .models import Product, Variant, SubVariant
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import timedelta
from datetime import datetime


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        expiration_time = datetime.utcnow() + timedelta(days=7)
        token.set_exp(expiration_time.timestamp())
        token["username"] = user.username
        token["email"] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["username"] = self.user.username
        data["email"] = self.user.email
        return data


class SubVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubVariant
        fields = ["id", "option", "stock"]

class VariantSerializer(serializers.ModelSerializer):
    subvariants = SubVariantSerializer(many=True)

    class Meta:
        model = Variant
        fields = ["id", "name", "subvariants","stocks"]

class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True)

    class Meta:
        model = Product
        fields = ["id", "ProductName", "ProductCode", "TotalStock", "variants"]
