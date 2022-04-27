import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  id: number = 1;
  title!: string;
  description!: string;
  due_date!: string;
  tags!: string;
  showAddTask!: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  
  onSubmit() {
    // simple error handling, constructs the task object and 
    if (!this.title) {
      alert('Please add a task');
      return;
    }

    // constructs new object based on user input
    const newTask = {
      title: this.title,
      description: this.description,
      due_date: this.due_date,
      tags: this.tags,
    };

    // sends task to service
    this.onAddTask.emit(newTask);

    // resets form
    this.title = '';
    this.description = '';
    this.due_date = '';
    this.tags = '';
  }
}
