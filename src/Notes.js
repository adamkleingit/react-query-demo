import { Link } from "react-router-dom";
import { useNotes } from "./notes";

export default function Notes() {
  const { notes, isLoading, error } = useNotes();

  function renderNotes() {
    if (isLoading || !notes) {
      return "loading...";
    }
    if (error) {
      return <div className="error">{error}</div>;
    }
    return notes.map((note) => (
      <Link key={note.id} className="nodeitem" to={`/notes/${note.id}`}>
        <h3>{note.title}</h3>
        <p>{note.body.slice(0, 10)}...</p>
      </Link>
    ));
  }

  return <div className="sidebar">{renderNotes()}</div>;
}
