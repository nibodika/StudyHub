import { Note } from "../types/note";
import NoteCard from "./NoteCard";

interface NotesListProps {
  notes: Note[];
  onDelete: (id: number) => void;
  onUpdated: () => void;
}

export default function NotesList({
  notes,
  onDelete,
  onUpdated,
}: NotesListProps) {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onUpdated={onUpdated}
        />
      ))}
    </div>
  );
}