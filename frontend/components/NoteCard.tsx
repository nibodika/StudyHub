"use client";

import { useState } from "react";
import { Note } from "../types/note";
import EditNoteModal from "./EditNoteModal";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
  onUpdated: () => void;
}

export default function NoteCard({
  note,
  onDelete,
  onUpdated,
}: NoteCardProps) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <div className="card note-card">
        <h3>{note.title}</h3>

        <p>{note.content}</p>

        <div className="note-footer">
          <small className="note-date">
            {new Date(note.created_at).toLocaleString()}
          </small>

          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              ✏️ Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={() => onDelete(note.id)}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>

      {editing && (
        <EditNoteModal
          note={note}
          onClose={() => setEditing(false)}
          onUpdated={onUpdated}
        />
      )}
    </>
  );
}