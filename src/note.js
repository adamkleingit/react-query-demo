import { useParams } from "react-router-dom";
import { useNote } from "./notes-queries";

export default function Note() {
  const { noteId } = useParams();
  const { note, isLoading, error } = useNote(noteId);
  if (isLoading || !note) {
    return "loading... ";
  }
  if (error) {
    return <div className="error">Error fetching note</div>;
  }
  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.body}</p>
    </div>
  );
}
