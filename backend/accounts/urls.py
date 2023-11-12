from django.urls import path
from .views import SignupView, GetCSRFToken, LoginView, LogoutView, CheckAuthenticated, DeleteUserView, DisplayAllUsers
urlpatterns = [
    path('register', SignupView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('authenticated', CheckAuthenticated.as_view()),
    path('deleteUser',  DeleteUserView.as_view()),
    path('getAllUsers', DisplayAllUsers.as_view())
]