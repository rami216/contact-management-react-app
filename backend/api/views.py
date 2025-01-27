from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.filters import SearchFilter


class UserAPIView(APIView):
  permission_classes = [AllowAny]
  
  def post(self,request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ContactAPIView(APIView):
  permission_classes = [IsAuthenticated]
  def get(self, request):
        search_query = request.query_params.get('search', None)
        contacts = Contact.objects.all()

        if search_query:
            contacts = contacts.filter(
                first_name__icontains=search_query
            ) | contacts.filter(
                last_name__icontains=search_query
            ) | contacts.filter(
                email__icontains=search_query
            ) | contacts.filter(
                phone__icontains=search_query
            )

        paginator = PageNumberPagination()
        paginator.page_size = 10
        paginated_contacts = paginator.paginate_queryset(contacts, request)

        serializer = ContactSerializer(paginated_contacts, many=True)
        return paginator.get_paginated_response(serializer.data)
  
  def post(self,request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
          serializer.save()  # Save the new contact
          return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  def delete(self,request,pk):
    try:
            # Attempt to retrieve the contact by its primary key
        contact = Contact.objects.get(pk=pk)
        contact.delete()  # Delete the contact
        return Response({"message": "Contact deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Contact.DoesNotExist:
        return Response(
            {"error": "Contact not found."}, 
            status=status.HTTP_404_NOT_FOUND
        )
  def put(self, request, pk):
        try:
            contact = Contact.objects.get(pk=pk)  # Fetch the contact by its primary key
            serializer = ContactSerializer(contact, data=request.data)  # Bind data to the existing instance
            if serializer.is_valid():
                serializer.save()  # Save the updated contact
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Contact.DoesNotExist:
            return Response(
                {"error": "Contact not found."},
                status=status.HTTP_404_NOT_FOUND
            )