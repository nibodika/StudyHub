from django.core.cache import cache

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
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Note.objects.all().order_by("-created_at")

    def list(self, request, *args, **kwargs):
        cached_notes = cache.get("notes")

        if cached_notes:
            return Response(cached_notes)

        queryset = self.get_queryset()

        serializer = self.get_serializer(queryset, many=True)

        cache.set(
            "notes",
            serializer.data,
            timeout=300
        )

        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save()
        cache.delete("notes")


class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_update(self, serializer):
        serializer.save()

        # Clear cache after updating note
        cache.delete("notes")

    def perform_destroy(self, instance):
        instance.delete()

        # Clear cache after deleting note
        cache.delete("notes")