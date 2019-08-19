import { Injectable } from '@angular/core';
import {
    WindowRefService,
    ICustomWindow
} from '../shared/services/window-ref.service';
import { BehaviorSubject } from 'rxjs';
import { Task } from './todo.interface';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private _window: ICustomWindow;

    private toDoList = new BehaviorSubject<Task[]>([]);
    public toDoListArray = this.toDoList.asObservable()
        .pipe(tap( data => this.saveData(data)));

    constructor(windowRef: WindowRefService) {
        this._window = windowRef.nativeWindow;
    }

    getToDoList(): void {
        this.toDoList.next(JSON.parse(this._window.localStorage.getItem("myToDoList")));
    }

    addNewItem(newTaskDescription: string): void {
        const newToDo = this.toDoList.value.slice();
        newToDo.push(
            {
                description: newTaskDescription,
                createOn: new Date,
                completeFlag: false
            });
        this.toDoList.next(newToDo);
    }

    changeTask(task: Task): void {
        const newToDo = this.toDoList.value.slice();
        newToDo.map((e) => {
            if(e.createOn === task.createOn) {
                e.completeFlag = true;
            }
        });
        this.toDoList.next(newToDo);
    }

    deleteTask(task: Task): void {
        const newToDo = this.toDoList.value.slice();
        newToDo.splice(this.toDoList.value.indexOf(task), 1);
        this.toDoList.next(newToDo);
    }

    saveData(data: Task[]) {
        this._window.localStorage.setItem("myToDoList", JSON.stringify(data));
    }
}
