import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/services/todo.service';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms'

interface Task {
    description: string,
    createOn: any,
    completeFlag: boolean
};
@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

    constructor(private toDoService: TodoService,
                private formBuilder: FormBuilder) { }

    public toDoListArray: Task[] = [];
    public taskForm: FormGroup;

    ngOnInit() {
        this.taskForm = this.formBuilder.group({
            'description': ['', [Validators.required]]
        })
        this.getToDoList();
    }

    getToDoList() {
        if (this.toDoService.getToDoList()) {
            this.toDoListArray = JSON.parse(this.toDoService.getToDoList());
        }
    }

    setToDoItem(newTask: any) {
        if (this.taskForm.get('description').valid && newTask.value.length) {
            this.toDoListArray.push({
                description: newTask.value,
                createOn: new Date,
                completeFlag: false
            });
            this.toDoService.setToDoItem(JSON.stringify(this.toDoListArray));
            this.taskForm.reset();
        }
        
    }

    taskComplete(task: Task) {
        let taskIndax = this.toDoListArray.indexOf(task);
        this.toDoListArray[taskIndax].completeFlag = true;
        this.toDoService.setToDoItem(JSON.stringify(this.toDoListArray));
    }

    taskDelete(task: Task) {
        this.toDoListArray.splice(this.toDoListArray.indexOf(task), 1);
        this.toDoService.setToDoItem(JSON.stringify(this.toDoListArray));
    }
}
