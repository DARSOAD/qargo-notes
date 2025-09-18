import { http } from "../../../shared/api/http";
import type { Note, CreateNotePayload } from "../types";

export const NotesRepository = {
  async list(): Promise<Note[]> {
    return http<Note[]>("/notes", { method: "GET" });
  },

  async create(data: CreateNotePayload): Promise<string> {
    return http<string>("/notes/create", { method: "POST", body: data });
  },

  async remove(id: number): Promise<void> {
    await http(`/notes/${id}`, { method: "DELETE" });
  },
};
