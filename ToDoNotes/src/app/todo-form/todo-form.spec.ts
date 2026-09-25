import { Injectable, signal, computed } from '@angular/core';
import { TodoNote } from './todo-note.model';
 
const STORAGE_KEY = 'angular_todo_notes';
 
@Injectable({ providedIn: 'root' })
export class TodoNoteService {
  private readonly _notes = signal<TodoNote[]>(this.load());
 
  readonly notes = computed(() => this._notes());
  readonly pendingCount = computed(
    () => this._notes().filter(n => !n.completed).length
  );
 
  private load(): TodoNote[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as TodoNote[]) : [];
    } catch {
      return [];
    }
  }
 
  private persist(notes: TodoNote[]): void {
    this._notes.set(notes);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // localStorage unavailable (e.g. private browsing) — fail silently
    }
  }
 
  add(title: string, description?: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;
 
    const newNote: TodoNote = {
      id: crypto.randomUUID(),
      title: trimmed,
      description: description?.trim() || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.persist([newNote, ...this._notes()]);
  }
 
  update(id: string, changes: Partial<Pick<TodoNote, 'title' | 'description'>>): void {
    this.persist(
      this._notes().map(n => (n.id === id ? { ...n, ...changes } : n))
    );
  }
 
  toggleComplete(id: string): void {
    this.persist(
      this._notes().map(n =>
        n.id === id ? { ...n, completed: !n.completed } : n
      )
    );
  }
 
  remove(id: string): void {
    this.persist(this._notes().filter(n => n.id !== id));
  }
 
  clearCompleted(): void {
    this.persist(this._notes().filter(n => !n.completed));
  }
}
 