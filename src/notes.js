import { useEffect, useState } from "react";

export function useNotes() {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://my-json-server.typicode.com/adamkleingit/react-query-fake-server/notes"
    )
      .then((res) => res.json())
      .then((newNotes) => {
        setNotes(newNotes);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return {
    notes,
    isLoading,
    error
  };
}

export function useNote(id) {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://my-json-server.typicode.com/adamkleingit/react-query-fake-server/notes/${id}`
    )
      .then((res) => res.json())
      .then((newNote) => {
        setNote(newNote);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [id]);

  return {
    note,
    isLoading,
    error
  };
}
