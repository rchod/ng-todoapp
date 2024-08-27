import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem, TODOITEM_STATUS } from 'src/app/models/todo-item';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css'],
  imports: [FormsModule, NgClass],
})
export class TodoListItemComponent {
  @Input() item!: TodoItem;
  TODOITEM_STATUS = TODOITEM_STATUS;
  set _checked(val: boolean) {
    this.item.status = TODOITEM_STATUS.DONE;
  }
  get _checked() {
    return this.item.status === TODOITEM_STATUS.DONE;
  }

  isDone(): boolean {
    return this.item.status === TODOITEM_STATUS.DONE;
  }
}
