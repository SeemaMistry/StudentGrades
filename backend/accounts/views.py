from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from user_profile.models import UserProfile
from django.contrib.auth.models import User


class SignupView(APIView):
    permission_classes = (permissions.AllowAny, ) # allow access without CSRF token

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        # create new user
        if password == re_password:
            if User.objects.filter(username=username).exists():
                return Response({'error': 'username already exists'})
            else:
                if len(password) < 6:
                    Response({'error': 'Passwords must be at least 6 characters'})
                else:
                    user = User.objects.create_user(username=username, password=password)
                    user.save()
                    
                    # create new profile
                    user = User.objects.get(username=username)
                    user_profile = UserProfile(user, first_name='', last_name='', phone='', city='')
                    user_profile.save()
                    return Response({'success' : 'new user created successfully'})
        else:
            return Response({'error': 'Passwords do not match'})
