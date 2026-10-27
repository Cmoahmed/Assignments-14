import type { User } from "./User";

// Question 3: Class - Note
export class Note {
  // Question 6: userId is the actual associated author object, as required.
  constructor(
    public readonly id: number,
    public title: string,
    public content: string,
    public readonly userId: User,
  ) {}

  getAuthor(): User {
    return this.userId;
  }

  preview(maxLength = 50): string {
    if (!Number.isInteger(maxLength) || maxLength < 0) {
      throw new Error("Preview length must be a non-negative whole number.");
    }
    if (this.content.length <= maxLength) return this.content;
    return `${this.content.slice(0, maxLength)}…`;
  }
}
