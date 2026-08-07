from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

from .models import Message, Note
from .serializers import NoteSerializer


class HealthView(APIView):
    def get(self, request):
        message = Message.objects.order_by("-created_at").first()

        return Response({
            "status": "ok",
            "message": message.text if message else "No message found"
        })


class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all().order_by("-created_at")
    serializer_class = NoteSerializer


class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer