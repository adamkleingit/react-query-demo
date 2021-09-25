import { Link } from "react-router-dom";
import { useNotes } from "./notes-queries";

export default function Notes() {
  const { data: notes, isLoading, error } = useNotes();

  function renderNotes() {
    if (isLoading) {
      return "loading...";
    }
    if (error) {
      return <div className="error">{error}</div>;
    }
    return notes.map((note) => (
      <Link key={note.id} className="nodeitem" to={`/notes/${note.id}`}>
        <h3>{note.title}</h3>
      </Link>
    ));
  }

  return <div>{renderNotes()}</div>;
}
