import NotesPage from "../components/NotesPage";

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <h1>📚 StudyHub</h1>
        <p>Organize your notes and learn full-stack development.</p>
      </header>

      <NotesPage />
    </main>
  );
}