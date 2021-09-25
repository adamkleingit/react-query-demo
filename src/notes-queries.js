import { useEffect, useState } from "react";

export function useNotes() {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  async function fetchNotes() {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/notes");
      const newNotes = await res.json();
      setNotes(newNotes);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    isLoading,
    error,
  };
}

export function useNote(id) {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchNote(noteId) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/notes/${noteId}`);
      const newNote = await res.json();
      setNote(newNote);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchNote(id);
  }, [id]);
  return {
    note,
    isLoading,
    error,
  };
}

export function useCreateNote() {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function createNote(input) {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/notes", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newNote = await res.json();
      setNote(newNote);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  return {
    note,
    isLoading,
    error,
    createNote,
  };
}
