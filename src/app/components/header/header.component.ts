import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { TaskService } from 'src/app/services/task.service';
import { AlphService } from 'src/app/services/alph.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showAddTask!: boolean;
  showOrder!: boolean;
  subscription!: Subscription;

  constructor(
    private uiService: UiService,
    private alphService: AlphService,
    private router: Router
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
    this.subscription = this.alphService
      .onAlphToggle()
      .subscribe((value) => (this.showOrder = value));
  }

  ngOnInit(): void {}

  // activates alph/chron toggle button
  toggleAlph() {
    this.alphService.toggleAlph();
  }

  // shows the form
  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
}
