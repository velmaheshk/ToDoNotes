import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoNoteService } from '../service/todoform.service';
 

@Component({
  selector: 'app-todo-form',
   standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoFormComponent  {
newTitle = signal('');
  newDescription = signal('');
  editingId = signal<string | null>(null);
  editTitle = signal('');
  editDescription = signal('');
 
  constructor(public notesService: TodoNoteService) {}
 
  addNote(): void {
    this.notesService.add(this.newTitle(), this.newDescription());
    this.newTitle.set('');
    this.newDescription.set('');
  }
 
  startEdit(id: string, title: string, description?: string): void {
    this.editingId.set(id);
    this.editTitle.set(title);
    this.editDescription.set(description ?? '');
  }
 
  saveEdit(id: string): void {
    this.notesService.update(id, {
      title: this.editTitle(),
      description: this.editDescription(),
    });
    this.editingId.set(null);
  }
 
  cancelEdit(): void {
    this.editingId.set(null);
  }
 
  toggle(id: string): void {
    this.notesService.toggleComplete(id);
  }
 
  delete(id: string): void {
    this.notesService.remove(id);
  }
 
  clearCompleted(): void {
    this.notesService.clearCompleted();
  }
}
 
