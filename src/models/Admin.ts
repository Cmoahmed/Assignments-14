import { User } from "./User";
import type { Note } from "./Note";
import type { NoteBook } from "./NoteBook";

// Question 2: Inheritance - Admin
export class Admin extends User {
  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    super(id, name, email, password, phone, age);
  }

  manageNotes(notebook: NoteBook, note: Note, action: string): boolean {
    if (action === "add") {
      if (notebook.getNotes().some((existing) => existing.id === note.id)) return false;
      notebook.addNote(note);
      return true;
    }
    if (action === "remove") return notebook.removeNote(note.id);
    return false;
  }
}
