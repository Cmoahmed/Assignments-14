import type { Note } from "./Note";

// Question 4: Composition - NoteBook owns its collection of Notes.
export class NoteBook {
  // Notes are managed through this notebook's methods; callers receive a copy.
  private readonly notes: Note[] = [];

  addNote(note: Note): void {
    if (!this.notes.some((existing) => existing.id === note.id)) this.notes.push(note);
  }

  removeNote(noteId: number): boolean {
    const index = this.notes.findIndex((note) => note.id === noteId);
    if (index === -1) return false;
    this.notes.splice(index, 1);
    return true;
  }

  getNotes(): readonly Note[] {
    return [...this.notes];
  }
}
