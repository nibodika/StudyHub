"use client";

import { useState } from "react";
import { Note } from "../types/note";
import { updateNote } from "../lib/api";

interface EditNoteModalProps {
  note: Note;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditNoteModal({
  note,
  onClose,
  onUpdated,
}: EditNoteModalProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await updateNote(note.id, {
        title,
        content,
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update note.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="section-title">✏️ Edit Note</h2>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="form-group">
            <label>Content</label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
            />
          </div>

          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}