"use client";

import { useState } from "react";
import { createNote } from "../lib/api";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await createNote({
        title,
        content,
      });

      setTitle("");
      setContent("");

      // Refresh to show new note
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to create note.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: "20px" }}>➕ Add a New Note</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>

          <input
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Content</label>

          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Note"}
        </button>
      </form>
    </div>
  );
}