import { NavLink } from "react-router-dom";
import { useNotes } from "./notes";

export default function Sidebar() {
  const { notes, isLoading, error } = useNotes();

  function renderNotes() {
    if (isLoading || !notes) {
      return "loading...";
    }
    if (error) {
      return <div className="error">{error}</div>;
    }
    return notes.map((note) => (
      <NavLink key={note.id} className="sidenote" to={`/notes/${note.id}`}>
        {note.title}
      </NavLink>
    ));
  }

  return (
    <div className="sidebar">
      {renderNotes()}
      <NavLink exact className="sidenote" to="/">
        All notes
      </NavLink>
      <NavLink exact className="sidenote" to="/add">
        Add note
      </NavLink>
    </div>
  );
}
