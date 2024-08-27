import { Component } from '@angular/core';
import { TodoItem, TODOITEM_STATUS } from 'src/app/models/todo-item';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

const FILTER_ALL = -1;
const trackById = (index: number, item: TodoItem) => item.id;

@Component({
  standalone: true,
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [
    TodoListItemComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TodoListComponent {
  TODOITEM_STATUS = TODOITEM_STATUS;
  TODO_LIST: TodoItem[] = [];
  newTodoItem = new FormControl('');
  _filter = FILTER_ALL;
  trackById = trackById;

  getTodoList() {
    return this._filter >= 0 ? this.filterBy(+this._filter) : this.TODO_LIST;
  }

  filterBy(status: number) {
    return this.TODO_LIST.filter((a) => a.status === status);
  }

  getRemainingTodos() {
    return this.TODO_LIST.filter((a) => a.status !== TODOITEM_STATUS.DONE)
      .length;
  }

  addTodoItem() {
    if (this.newTodoItem.value!.trim().length == 0) {
      return;
    }
    this.TODO_LIST.unshift({
      id: Date.now(),
      content: this.newTodoItem.value!.trim(),
      status: TODOITEM_STATUS.OPEN,
    });

    this.newTodoItem.reset();
  }

  checkAll() {
    const status = this.isAllChecked()
      ? TODOITEM_STATUS.OPEN
      : TODOITEM_STATUS.DONE;
    this.TODO_LIST = this.TODO_LIST.map((a) => ({ ...a, status }));
  }

  isAllChecked() {
    return this.TODO_LIST.every((a) => a.status === TODOITEM_STATUS.DONE);
  }

  clearCompleted() {
    this.TODO_LIST = this.TODO_LIST.filter(
      (a) => a.status !== TODOITEM_STATUS.DONE
    );
  }
}
