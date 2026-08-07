"use client";

import { useEffect, useMemo, useState } from "react";
import { deleteNote, getNotes } from "../lib/api";
import { Note } from "../types/note";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadNotes() {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    try {
      await deleteNote(id);
      loadNotes();
    } catch (error) {
      console.error(error);
      alert("Failed to delete note.");
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const query = search.toLowerCase();

      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    });
  }, [notes, search]);

  if (loading) {
    return <div className="loading">Loading notes...</div>;
  }

  return (
    <>
      <NoteForm />

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <h2>📒 My Notes</h2>
            <p style={{ color: "#6b7280" }}>
              {filteredNotes.length} note(s)
            </p>
          </div>

          <input
            type="text"
            placeholder="🔍 Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "280px",
            }}
          />
        </div>

        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <h3>No notes found</h3>
            <p>Create one or change your search.</p>
          </div>
        ) : (
          <NotesList
            notes={filteredNotes}
            onDelete={handleDelete}
            onUpdated={loadNotes}
          />
        )}
      </div>
    </>
  );
}