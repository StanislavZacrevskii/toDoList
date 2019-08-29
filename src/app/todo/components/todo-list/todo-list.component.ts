import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo.service';
import { Task } from 'src/app/todo/todo.interface';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    constructor(private toDoService: TodoService) {}

    public toDoListArray: Task[] = [];

    ngOnInit() {
        this.getToDoList();
        this.toDoService.toDoListArray.subscribe(
            (toDo) => {
                this.toDoListArray = toDo;
            }
        );
    }

    public getToDoList() {
        this.toDoService.getToDoList();
    }

    changeTask(task: Task) {
        this.toDoService.changeTask(task);
    }

    deleteTask(task: Task) {
        this.toDoService.deleteTask(task);
    }
}
