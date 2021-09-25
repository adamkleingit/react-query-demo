import { isArray } from "lodash";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useFilter } from "./filter-store";

export function useNotes() {
  async function fetchNotes() {
    const res = await fetch("http://localhost:5000/notes");

    return res.json();
  }
  return useQuery("notes", fetchNotes);
}

export function useFilteredNotes() {
  const [filter] = useFilter();

  async function fetchNotesWithFilter(filter) {
    const res = await fetch(`http://localhost:5000/notes?q=${filter}`);

    return res.json();
  }
  return useQuery(
    ["notes", "filter", filter],
    () => fetchNotesWithFilter(filter),
    {
      keepPreviousData: true,
    }
  );
}

export function useNote(id) {
  const queryClient = useQueryClient();
  const [filter] = useFilter();

  async function fetchNote() {
    const res = await fetch(`http://localhost:5000/notes/${id}`);

    return res.json();
  }

  function getPlaceholderData() {
    const notesData = queryClient.getQueriesData("notes") || [];
    const notes = notesData
      .map(([_, data]) => data)
      .filter((data) => data?.length)
      .flatMap((data) => data);

    const note = notes.find((item) => item.id.toString() === id);

    return note;
  }

  return useQuery(["notes", "id", id], fetchNote, {
    placeholderData: getPlaceholderData(),
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  async function createNote(input) {
    const res = await fetch("http://localhost:5000/notes", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }
  return useMutation((input) => createNote(input), {
    onSuccess: (newNote) => {
      queryClient.setQueriesData("notes", (old) => {
        if (isArray(old)) {
          return [...old, newNote];
        }
        return old;
      });
      queryClient.invalidateQueries("notes", {
        exact: true,
      });
    },
  });
}
