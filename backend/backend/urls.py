from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"), # This line is used to get the token for the user
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"), # This line is used to refresh the token for the user
    path("api-auth/", include("rest_framework.urls")), # rest_framework.urls is a module that provides authentication-related URLs for the Django REST Framework. It includes URLs for login, logout, and password reset functionality.
    path("api/", include("api.urls")),  # This line is used to include the URLs for the API
]

# In this case, rest_framework is a Python package that provides a powerful and flexible toolkit for building Web APIs. It is commonly used in Django projects to simplify the process of creating RESTful APIs.

# The line of code you provided, path("api-auth/", include("rest_framework.urls")), is using the include function from the urls.py file to include the URLs provided by the rest_framework.urls module. This allows you to easily add authentication and other API-related URLs to your project.

# By including the rest_framework.urls module, you get access to pre-defined URLs for features such as login, logout, and password reset. These URLs are automatically wired up to the appropriate views and can be customized to fit your project's needs.

# Overall, the rest_framework.urls module simplifies the process of setting up authentication and other API-related URLs in your Django project when using the Django REST Framework.