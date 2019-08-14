import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo.service';
import { Task } from 'src/app/todo/todo.interface'

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

    constructor(private toDoService: TodoService) {
        this.toDoService.toDoListArray.subscribe(
            (toDo) => {
                this.toDoListArray = toDo;
            }
        )
    }

    public toDoListArray: Task[] = [];

    ngOnInit() {
        this.getToDoList();
    }

    public getToDoList() {
        this.toDoService.getToDoList().subscribe(
            (todo) => {
                this.toDoListArray = todo;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    changeTask() {
        this.toDoService.setToDoItem(JSON.stringify(this.toDoListArray)).subscribe();
    }

    deleteTask(task: Task) {
        this.toDoListArray.splice(this.toDoListArray.indexOf(task), 1);
        this.toDoService.setToDoItem(JSON.stringify(this.toDoListArray));
    }
}
