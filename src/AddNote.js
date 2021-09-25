import { useState } from "react";

export default function AddNote() {
  const [title, setTitle] = useState("title");
  const [body, setBody] = useState("body");
  return (
    <form>
      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Body:</label>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <button>Save</button>
    </form>
  );
}
