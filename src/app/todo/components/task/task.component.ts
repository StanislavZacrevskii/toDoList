import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from 'src/app/todo/todo.interface';
import { Confirm } from 'src//app/shared/components/confirm-dialog/confirm.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

    @Input() task: Task;
    @Output() changeTask = new EventEmitter();
    @Output() deleteTask = new EventEmitter();
    @Output() confirm: Confirm;

    constructor() { }

    ngOnInit() {
    }

    taskComplete(task: Task) {
        this.changeTask.emit(task);
    }

    confirmTaskDelete(task: Task) {
        this.confirm = {
            message: 'Are you sure that you want to delete task. It is permanent action',
            accept: () => {
                this.deleteTask.emit(task);
            },
            reject: () => {
                this.confirm = null;
            }
        }
        
    }

}
