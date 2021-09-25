import { useParams } from "react-router-dom";
import { useNote } from "./notes";

export default function Note() {
  const { noteId } = useParams();
  const { note, isLoading, error } = useNote(noteId);
  if (isLoading || !note) {
    return "loading... ";
  }
  if (error) {
    return error;
  }
  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.body}</p>
    </div>
  );
}
