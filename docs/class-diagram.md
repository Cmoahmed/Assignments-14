<!-- Part B - Question 1: UML Class Diagram -->
# UML Class Diagram

The editable Mermaid source is in `class-diagram.mmd`.

```mermaid
classDiagram
    class User {
        +readonly number id
        +string name
        +string email
        -string password
        #string phone
        -number _age
        +number age
        -NoteBook[] notebooks
        +displayInfo() void
        +addNotebook(notebook: NoteBook) void
        +removeNotebook(notebook: NoteBook) boolean
        +getNotebooks() readonly NoteBook[]
    }
    class Admin {
        +manageNotes(notebook: NoteBook, note: Note, action: string) boolean
    }
    class Note {
        +readonly number id
        +string title
        +string content
        +readonly User userId
        +getAuthor() User
        +preview(maxLength: number) string
    }
    class NoteBook {
        -Note[] notes
        +addNote(note: Note) void
        +removeNote(noteId: number) boolean
        +getNotes() readonly Note[]
    }
    class Storage~T~ {
        -T[] items
        +addItem(item: T) void
        +removeItem(item: T) boolean
        +getAllItems() T[]
    }
    User <|-- Admin : Inheritance
    NoteBook "1" *-- "0..*" Note : Composition
    User "1" o-- "0..*" NoteBook : Aggregation
    User "1" <-- "0..*" Note : Association (author)
```

## UML legend

- Hollow triangle (`Admin` → `User`): **Inheritance**; Admin extends User.
- Filled diamond at `NoteBook`: **Composition**; the notebook owns zero or more Notes.
- Hollow diamond at `User`: **Aggregation**; the user references zero or more independently created NoteBooks.
- The separate **Association** between `Note` and `User` shows that each note has exactly one author and a user may author zero or more notes. It is not one of the three ownership/inheritance relationships above.

`+` is public, `-` private, and `#` protected. The multiplicities match the implementation: one notebook may contain zero or more notes; one user may reference zero or more notebooks; every note has one author.
