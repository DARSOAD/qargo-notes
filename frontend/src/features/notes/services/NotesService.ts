import { NotesRepository } from "../repository/NotesRepository";
import type { Note, CreateNotePayload } from "../types";

export const NotesService = {
  list: (): Promise<Note[]> => NotesRepository.list(),
  create: (payload: CreateNotePayload): Promise<string> => NotesRepository.create(payload),
  remove: (id: number): Promise<void> => NotesRepository.remove(id),
};
