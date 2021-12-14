import { NavLink } from "react-router-dom";
import { useFilter } from "./filter-store";
import { useFilteredNotes } from "./notes-queries";

export default function Sidebar() {
  const [filter, setFilter] = useFilter();
  const { data: notes, isLoading, error, isPreviousData } = useFilteredNotes();

  function renderNotes() {
    if (isLoading) {
      return "loading...";
    }
    if (error) {
      return <div className="error">{error}</div>;
    }
    return notes.map((note) => (
      <NavLink
        style={{ opacity: isPreviousData ? 0.5 : 1 }}
        key={note.id}
        className="sidenote"
        to={`/notes/${note.id}`}
      >
        {note.title}
      </NavLink>
    ));
  }

  return (
    <div className="sidebar">
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <NavLink exact className="sidenote" to="/">
        All notes
      </NavLink>
      {renderNotes()}
    </div>
  );
}
