import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from 'src/app/todo/todo.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

    @Input() task: Task;
    @Output() changeTask = new EventEmitter();
    @Output() deleteTask = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    taskComplete(task: Task) {
        task.completeFlag = true;
        this.changeTask.emit();
    }

    taskDelete(task: Task) {
        this.deleteTask.emit(task);
    }

}
