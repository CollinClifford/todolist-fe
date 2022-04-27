import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';
import { AlphService } from 'src/app/services/alph.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  showOrder!: boolean;
  subscription: Subscription;

  constructor(
    private taskService: TaskService,
    private alphService: AlphService
  ) {
    this.subscription = this.alphService
      .onAlphToggle()
      .subscribe((value) => (this.showOrder = value));
  }

  // determines where the sort list is and pulls the information from API in the order
  toggleAlph() {
    this.alphService.toggleAlph();
    if (this.showOrder) {
      this.taskService
        .getTasksByName()
        .subscribe((tasks) => (this.tasks = tasks));
    } else {
      this.taskService
        .getTaskByDate()
        .subscribe((tasks) => (this.tasks = tasks));
    }
  }

  // initiates with standard api call
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  // filters based on click and deletes
  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  // attaches to service
  addTask(task: Task) {
    console.log(task);
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
