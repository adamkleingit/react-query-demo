import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useCreateNote } from "./notes-queries";

export default function AddNote() {
  const history = useHistory();
  const { createNote, error, isLoading } = useCreateNote();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const newNote = await createNote({ title, body });
    history.push(`/notes/${newNote.id}`);
  }

  return (
    <form onSubmit={onSubmit}>
      {error ? <div className="error">{error}</div> : null}
      <label>Title:</label>
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Body:</label>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <button disabled={isLoading}>{isLoading ? "Saving..." : "Save"}</button>
    </form>
  );
}
