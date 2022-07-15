from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SignUpSerializer
from .models import SignUp



# Create your views here.
class SignUpView(APIView):
    serializer_class = SignUpSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            queryset = SignUp.objects.filter(email=email)
            if queryset.exists():
                # Throw error
                return Response("Test", status=status.HTTP_409_CONFLICT)
            else:
                signup = SignUp(email=email)
                signup.save()
            return Response(SignUpSerializer(signup).data, status=status.HTTP_200_OK)
