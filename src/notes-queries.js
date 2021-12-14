import { useEffect, useState } from "react";
import axios from "axios";

export function useNotes() {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  async function fetchNotes() {
    try {
      setIsLoading(true);

      const newNotes = (await axios.get("http://localhost:5000/notes")).data;

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
      const newNote = (await axios.get(`http://localhost:5000/notes/${noteId}`))
        .data;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function createNote(input) {
    try {
      setIsLoading(true);
      const newNote = (await axios.post("http://localhost:5000/notes", input))
        .data;
      setIsLoading(false);
      return newNote;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    createNote,
  };
}
