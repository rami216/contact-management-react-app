from django.urls import path
from . import views
urlpatterns = [
    path("contacts/",views.ContactAPIView.as_view(),name="contacts_list"),
    path("contacts/<int:pk>/", views.ContactAPIView.as_view(), name="contact_detail"),
]
