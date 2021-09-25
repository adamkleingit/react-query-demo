import { useParams } from "react-router-dom";
import { useNote } from "./notes-queries";

export default function Note() {
  const { noteId } = useParams();
  const { data: note, isLoading, error } = useNote(noteId);
  if (isLoading) {
    return "loading... ";
  }
  if (error) {
    return error;
  }
  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.body || "loading..."}</p>
    </div>
  );
}
