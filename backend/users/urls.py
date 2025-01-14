from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path
from . import views

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.register, name='user-register'),
    path('api/checkout/', views.checkout, name='user-checkout'),
    path('', views.home, name='home'),
    path('profile/<int:id>/', views.get_profile, name='get-profile'),
    path('update/<int:id>', views.update_profile, name='update-profile'),
]