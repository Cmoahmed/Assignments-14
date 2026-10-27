import type { NoteBook } from "./NoteBook";

// Question 1: Base Class - User
export class User {
  private _age: number;
  // Question 5: Aggregation - User keeps references to independently created notebooks.
  private readonly notebooks: NoteBook[] = [];

  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    private password: string,
    protected phone: string,
    age: number,
  ) {
    this._age = User.validateAge(age);
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = User.validateAge(value);
  }

  private static validateAge(age: number): number {
    if (!Number.isInteger(age) || age < 18 || age > 60) {
      throw new Error("Age must be a whole number between 18 and 60.");
    }
    return age;
  }

  displayInfo(): void {
    console.log(`ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
  }

  // Question 5: These methods manage references without owning notebook lifetimes.
  addNotebook(notebook: NoteBook): void {
    if (!this.notebooks.includes(notebook)) this.notebooks.push(notebook);
  }

  removeNotebook(notebook: NoteBook): boolean {
    const index = this.notebooks.indexOf(notebook);
    if (index === -1) return false;
    this.notebooks.splice(index, 1);
    return true;
  }

  getNotebooks(): readonly NoteBook[] {
    return [...this.notebooks];
  }
}
