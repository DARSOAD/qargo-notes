export type Note = {
    id: number;
    title: string;
    content: string;
    user_id?: number;
  };
  
  export type CreateNotePayload = {
    title: string;
    content: string;
  };
  