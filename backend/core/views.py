from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Message


class HealthView(APIView):
    def get(self, request):
        message = Message.objects.order_by("-created_at").first()

        return Response({
            "status": "ok",
            "message": message.text if message else "No message found"
        })