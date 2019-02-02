import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

import { Todo } from './Models/Todo';

@Component({
  selector: 'app-todos', // directive here
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService:TodoService) { } // constructor is used to import services

    ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    }); //.subscribe works just like .then in promises
  }


    deleteTodo(todo:Todo) {
      // Remove from UI
      this.todos = this.todos.filter(t => t.id !== todo.id);
      // Remove from Server
      this.todoService.deleteTodo(todo).subscribe();
      // console.log('delete me');
    }

    addTodo(todo:Todo) {
      this.todoService.addTodo(todo).subscribe(todo => {
        this.todos.push(todo);
      });
    }
}
