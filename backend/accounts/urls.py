from django.urls import path
from .views import SignupView, GetCSRFToken
urlpatterns = [
    path('register', SignupView.as_view()),
    path('csrf_cookies', GetCSRFToken.as_view())
]