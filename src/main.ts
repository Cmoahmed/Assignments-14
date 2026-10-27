import { Admin } from "./models/Admin";
import { Note } from "./models/Note";
import { NoteBook } from "./models/NoteBook";
import { Storage } from "./models/Storage";
import { User } from "./models/User";

// Question 1: Create a valid user and display safe information only.
const user = new User(1, "Maya", "maya@example.com", "secret", "01000000000", 24);
user.displayInfo();

// Question 2: Admin inherits User and delegates note operations to NoteBook.
const admin = new Admin(2, "Amina", "admin@example.com", "admin-secret", "01111111111", 30);

// Questions 3 and 6: The note points to the existing user as its author.
const note = new Note(1, "Welcome", "This is a short note for the OOP assignment.", user);
console.log(`Preview: ${note.preview()}`);

// Question 4: The notebook owns and manages its notes.
const notebook = new NoteBook();
notebook.addNote(note);
console.log(`Notes in notebook: ${notebook.getNotes().length}`);
notebook.removeNote(note.id);

// Question 5: One user can reference multiple independently created notebooks.
const secondNotebook = new NoteBook();
user.addNotebook(notebook);
user.addNotebook(secondNotebook);
console.log(`User notebooks: ${user.getNotebooks().length}`);

// Question 2: Admin manages notes through the notebook's public methods.
admin.manageNotes(notebook, note, "add");
admin.manageNotes(notebook, note, "remove");

// Question 7: The generic storage works with both numbers and strings.
const numberStorage = new Storage<number>();
numberStorage.addItem(10);
numberStorage.addItem(20);
numberStorage.removeItem(10);
console.log("Numbers:", numberStorage.getAllItems());
const stringStorage = new Storage<string>();
stringStorage.addItem("notes");
console.log("Strings:", stringStorage.getAllItems());

// Question 1: Invalid ages are rejected with a clear error.
try {
  user.age = 17;
} catch (error) {
  console.log(error instanceof Error ? error.message : error);
}
