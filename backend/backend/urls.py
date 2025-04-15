from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"), # This line is used to get the token for the user
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"), # This line is used to refresh the token for the user
    path("api-auth/", include("rest_framework.urls")), # This line is used to include the authentication URLs for the API
    path("api/", include("api.urls")),  # This line is used to include the URLs for the API
]