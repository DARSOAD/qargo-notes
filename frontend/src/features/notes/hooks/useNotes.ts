import { useEffect, useState, useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { NotesService } from "../services/NotesService";
import type { Note, CreateNotePayload } from "../types";
import { HttpError } from "../../../shared/api/http";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setErrorText(null);
    try {
      const data = await NotesService.list();
      setNotes(data);
    } catch (err: unknown) {
      let msg = "Could not load notes";
      if (err instanceof HttpError) msg = err.message;
      else if (err instanceof Error) msg = err.message;
      setErrorText(msg);
      notifications.show({ color: "red", title: "Error", message: msg });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addNote = useCallback(async (payload: CreateNotePayload) => {
    setCreating(true);
    setErrorText(null);

    const tempId = Date.now();
    const optimistic: Note = { id: tempId, title: payload.title, content: payload.content };
    setNotes((prev) => [optimistic, ...prev]);

    try {
      const raw = await NotesService.create(payload); 
      const maybeId = Number(raw);
      if (Number.isFinite(maybeId) && maybeId > 0) {
        setNotes((prev) => {
          const next = [...prev];
          const idx = next.findIndex((n) => n.id === tempId);
          if (idx >= 0) next[idx] = { ...next[idx], id: maybeId };
          return next;
        });
      } else {
        await refresh();
      }
      notifications.show({ title: "Note created", message: "Your note was added." });
    } catch (err: unknown) {
      setNotes((prev) => prev.filter((n) => n.id !== tempId));
      let msg = "Could not create note";
      if (err instanceof HttpError) msg = err.message;
      else if (err instanceof Error) msg = err.message;
      setErrorText(msg);
      notifications.show({ color: "red", title: "Error", message: msg });
      throw err;
    } finally {
      setCreating(false);
    }
  }, [refresh]);

  const removeNote = useCallback(async (id: number) => {
    setDeletingId(id);
    setErrorText(null);
    const snapshot = notes;
    try {
      setNotes((p) => p.filter((n) => n.id !== id));
      await NotesService.remove(id);
      notifications.show({ title: "Note deleted", message: "The note was removed." });
    } catch (err: unknown) {
      setNotes(snapshot); // revert
      let msg = "Could not delete note";
      if (err instanceof HttpError) msg = err.message;
      else if (err instanceof Error) msg = err.message;
      setErrorText(msg);
      notifications.show({ color: "red", title: "Error", message: msg });
      throw err;
    } finally {
      setDeletingId(null);
    }
  }, [notes]);

  return {
    notes,
    loading,
    creating,
    deletingId,
    errorText,
    addNote,
    removeNote,
    refresh,
  };
}
