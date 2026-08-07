from django.urls import path

from .views import (
    HealthView,
    NoteListCreateView,
    NoteDetailView,
)

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("notes/", NoteListCreateView.as_view(), name="note-list"),
    path("notes/<int:pk>/", NoteDetailView.as_view(), name="note-detail"),
]