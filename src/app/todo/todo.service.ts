import { Injectable } from '@angular/core';
import {
    WindowRefService,
    ICustomWindow
} from '../shared/services/window-ref.service';
import { Observable, of, BehaviorSubject } from 'rxjs';

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

    getToDoList(): Observable<any[]> {
        this.toDoList.next(JSON.parse(this._window.localStorage.getItem("myToDoList")));
        return of(JSON.parse(this._window.localStorage.getItem("myToDoList")));
    }

    setToDoItem(toDoList: string): Observable<any> {
        return of(this._window.localStorage.setItem("myToDoList", toDoList));
    }
}
