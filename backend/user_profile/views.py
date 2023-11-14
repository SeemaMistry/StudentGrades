from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from .models import UserProfile
from django.contrib.auth.models import User
from .serializers import UserPerofileSerializer


class GetUserProfileView(APIView):
    def get(self, request, format=None):
        try:
            # get user
            user = self.request.user

            user = User.objects.get(id=user.id)

            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserPerofileSerializer(user_profile)

            return Response({'success': 'successfully got user profile', 'profile': user_profile.data})
        except:
             return Response({'error': 'Something went wrong when retrieving user profile'})

class UpdateUserProfileView(APIView):
    def put(self, request, format=None):
        try:
            # get current user and update their profile
            user = self.request.user
            data = self.request.data
            first_name = data['first_name']
            last_name = data['last_name']
            phone = data['phone']
            city = data['city']

            user = User.objects.get(id=user.id)

            user_profile = UserProfile.objects.filter(user=user).update(first_name=first_name, last_name=last_name, city=city, phone=phone)
            user_profile = UserProfile.objects.get(user=user)
            user_profile = UserPerofileSerializer(user_profile)

            return Response({'success': 'successfully got user profile', 'profile': user_profile.data})
        except:
            return Response({'error': 'Something went wrong when updating user profile'})
