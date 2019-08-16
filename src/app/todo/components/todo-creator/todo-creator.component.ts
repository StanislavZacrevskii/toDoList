import {
    Component,
    OnInit
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

import { TodoService } from '../../todo.service';
import { Task } from 'src/app/todo/todo.interface';

@Component({
    selector: 'app-todo-creator',
    templateUrl: './todo-creator.component.html',
    styleUrls: ['./todo-creator.component.scss']
})
export class TodoCreatorComponent implements OnInit {

    constructor(private toDoService: TodoService,
                private formBuilder: FormBuilder) {
        this.toDoService.toDoListArray.subscribe(
            (toDo) => {
                this.toDoListArray = toDo;
            }
        )
    }

    public toDoListArray: Task[] = [];
    public taskForm: FormGroup;

    public regExpNotEmpty = new RegExp("^(?=\\s*\\S).*$");

    ngOnInit() {
        this.taskForm = this.formBuilder.group({
            'description': ['', [Validators.required, Validators.pattern(this.regExpNotEmpty)]]
        })
    }

    addNewItem(newTask: any) {
        if (this.taskForm.get('description').valid) {
            newTask.value.trim();
            this.toDoService.addNewItem(newTask.value);
            this.taskForm.reset();
        }
        
    }

}
