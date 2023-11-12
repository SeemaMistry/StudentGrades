from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from user_profile.models import UserProfile
from .serializers import UserSerializer
from django.contrib import auth
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticated(APIView):
    def get(self, request, format=None):
        # check if user is authenticated
        try: 
            isAuthenticated = User.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})     
        except:
             return Response({'error': 'Something went wrong when checking authentication status'})
        

@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, ) # allow access without CSRF token

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        # create new user
        try:
            if password == re_password:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'username already exists'})
                else:
                    if len(password) < 6:
                        return Response({'error': 'Passwords must be at least 6 characters'})
                    else:
                        user = User.objects.create_user(username=username, password=password)
                        user.save()

                        # create new profile
                        user = User.objects.get(id=user.id)
                        user_profile = UserProfile(user=user, first_name='', last_name='', phone='', city='')
                        user_profile.save()
                        return Response({'success' : 'new user created successfully'})
            else:
                return Response({'error': 'Passwords do not match'})
        except:
            return Response({'error': 'Something went wrong when registering account'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'user authenticated', 'username' : username})
            else:
                return Response({'error': 'error authenticating'})
        except:
            return Response({'error': 'Something went wrong when logging in'})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'logged Out'})
        except:
            return Response({'error': 'error logging out'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success' : 'CSRF cookie set'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class DeleteUserView(APIView):
    permission_classes = (permissions.AllowAny, )

    def delete(self, request, format=None):
        try:
            # get user and delete it 
            user = request.user
            user = User.objects.filter(id=user.id).delete()

            return Response({'success': 'user was deleted'})
        except:
            return Response({'error': 'Something went wrong when deleting user'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class DisplayAllUsers(APIView):
        permission_classes = (permissions.AllowAny, )

        def get(self, request, format=None):
            try:
                # get all the users
                users = User.objects.all()
                users = UserSerializer(users, many=True)
                return Response({'success': 'All users were retrived from database', 'users': users.data})
            except:
                return Response({'error': 'Something went wrong when displaying all users'})
