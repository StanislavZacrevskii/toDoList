import { Injectable } from '@angular/core';
import {
    WindowRefService,
    ICustomWindow
} from './window-ref.service';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private _window: ICustomWindow;

    constructor(windowRef: WindowRefService) {
        this._window = windowRef.nativeWindow;
    }

    getToDoList() {
        return this._window.localStorage.getItem("myToDoList");
    }

    setToDoItem(toDoList: string) {
        this._window.localStorage.setItem("myToDoList", toDoList);
    }
}
