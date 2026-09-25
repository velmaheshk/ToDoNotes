import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoFormComponent } from './todo-form/todo-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TodoFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ToDoNotes');
}
