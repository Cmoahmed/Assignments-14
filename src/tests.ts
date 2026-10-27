import assert from "node:assert/strict";
import { Admin } from "./models/Admin";
import { Note } from "./models/Note";
import { NoteBook } from "./models/NoteBook";
import { Storage } from "./models/Storage";
import { User } from "./models/User";

// Question 1: Test age boundaries, validation, and password-safe display.
const makeUser = (age: number) => new User(1, "Maya", "maya@example.com", "hidden-pass", "0100", age);
assert.equal(makeUser(18).age, 18);
assert.equal(makeUser(60).age, 60);
for (const age of [17, 61, 18.5]) assert.throws(() => makeUser(age), /Age must be/);
const user = makeUser(25);
assert.throws(() => { user.age = 61; }, /Age must be/);
assert.equal(user.age, 25);
const originalLog = console.log;
let displayed = "";
console.log = (...values: unknown[]) => { displayed += values.join(" "); };
user.displayInfo();
console.log = originalLog;
assert.match(displayed, /Maya/);
assert.doesNotMatch(displayed, /hidden-pass/);

// Question 3: Short content remains unchanged and long content gets an ellipsis.
const note = new Note(10, "Title", "Short", user);
assert.equal(note.preview(), "Short");
const longNote = new Note(11, "Long", "abcdefghijklmnopqrstuvwxyz", user);
assert.equal(longNote.preview(5), "abcde…");
assert.equal(longNote.getAuthor(), user);

// Question 4: Add, list, remove, and safe-copy behavior for notebook notes.
const notebook = new NoteBook();
notebook.addNote(note);
assert.equal(notebook.getNotes().length, 1);
const noteCopy = notebook.getNotes() as Note[];
noteCopy.pop();
assert.equal(notebook.getNotes().length, 1);
assert.equal(notebook.removeNote(10), true);
assert.equal(notebook.removeNote(999), false);

// Question 5: Notebook references can be added and removed independently.
const notebookTwo = new NoteBook();
user.addNotebook(notebook);
user.addNotebook(notebookTwo);
assert.equal(user.getNotebooks().length, 2);
const notebookCopy = user.getNotebooks() as NoteBook[];
notebookCopy.pop();
assert.equal(user.getNotebooks().length, 2);
assert.equal(user.removeNotebook(notebook), true);
assert.equal(user.removeNotebook(notebook), false);
assert.equal(notebook.getNotes().length, 0);

// Question 2: Admin uses NoteBook methods for add and remove operations.
const admin = new Admin(2, "Admin", "admin@example.com", "secret", "0101", 35);
assert.equal(admin.manageNotes(notebook, note, "add"), true);
assert.equal(admin.manageNotes(notebook, note, "add"), false);
assert.equal(admin.manageNotes(notebook, note, "remove"), true);
assert.equal(admin.manageNotes(notebook, note, "unknown"), false);

// Question 7: Generic storage supports number and string values and returns copies.
const numbers = new Storage<number>();
numbers.addItem(1);
numbers.addItem(2);
assert.deepEqual(numbers.getAllItems(), [1, 2]);
assert.equal(numbers.removeItem(1), true);
assert.equal(numbers.removeItem(5), false);
const numbersCopy = numbers.getAllItems();
numbersCopy.push(3);
assert.deepEqual(numbers.getAllItems(), [2]);
const strings = new Storage<string>();
strings.addItem("hello");
assert.deepEqual(strings.getAllItems(), ["hello"]);

console.log("All assignment tests passed.");
