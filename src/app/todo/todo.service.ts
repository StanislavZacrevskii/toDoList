import { Injectable } from '@angular/core';
import {
    WindowRefService,
    ICustomWindow
} from '../shared/services/window-ref.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Task } from './todo.interface';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private _window: ICustomWindow;

    private toDoList = new BehaviorSubject([]);
    toDoListArray = this.toDoList.asObservable();

    constructor(windowRef: WindowRefService) {
        this._window = windowRef.nativeWindow;
    }

    getToDoList(): void {
        this.toDoList.next(JSON.parse(this._window.localStorage.getItem("myToDoList")));
        JSON.parse(this._window.localStorage.getItem("myToDoList"));
    }

    addNewItem(newTaskDescription: string): Observable<any> {
        this.toDoList.value.push({
            description: newTaskDescription,
            createOn: new Date,
            completeFlag: false
        });

        return of(this._window.localStorage.setItem("myToDoList", JSON.stringify(this.toDoList.value)));
    }

    changeTask(task: Task): void {
        this.toDoList.value[this.toDoList.value.indexOf(task)].completeFlag = true;

        this._window.localStorage.setItem("myToDoList", JSON.stringify(this.toDoList.value));
    }

    deleteTask(task: Task): void {
        this.toDoList.value.splice(this.toDoList.value.indexOf(task), 1);

        this._window.localStorage.setItem("myToDoList", JSON.stringify(this.toDoList.value));
    }
}
