import { isArray } from "lodash";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useFilter } from "./filter-store";
import axios from "axios";

export function useNotes() {
  async function fetchNotes() {
    return (await axios.get("http://localhost:5000/notes")).data;
  }
  return useQuery(["notes", "list"], fetchNotes);
}

export function useFilteredNotes() {
  const [filter] = useFilter();

  async function fetchNotesWithFilter(filter) {
    const res = await fetch(`http://localhost:5000/notes?q=${filter}`);

    return (await res.json()).map((note) => ({
      id: note.id,
      title: note.title,
    }));
  }
  return useQuery(
    ["notes", "list", filter],
    () => fetchNotesWithFilter(filter),
    {
      keepPreviousData: true,
    }
  );
}

export function useNote(id) {
  const queryClient = useQueryClient();

  async function fetchNote() {
    return (await axios.get(`http://localhost:5000/notes/${id}`)).data;
  }

  function getPlaceholderData() {
    return queryClient
      .getQueriesData(["notes", "list"])
      ?.map(([_, data]) => data)
      ?.filter((data) => data?.length)
      ?.flatMap((data) => data)
      ?.find((item) => item.id.toString() === id);
  }

  return useQuery(["notes", "id", id], fetchNote, {
    placeholderData: getPlaceholderData(),
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  async function createNote(input) {
    return (await axios.post("http://localhost:5000/notes", input)).data;
  }
  return useMutation((input) => createNote(input), {
    onSuccess: (newNote) => {
      queryClient.setQueriesData(["notes", "list"], (old) => {
        if (old) {
          return [...old, newNote];
        }
      });
      queryClient.invalidateQueries(["notes", "list"]);
    },
  });
}
