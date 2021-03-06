import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/data';
  private apiUrlNew = 'https://sheltered-scrubland-74330.herokuapp.com/data';
  items: [] = [];

  constructor(private http: HttpClient) {
  }

  toggleShowOrder(showOrder: boolean): boolean {
    return showOrder;
  }

  // loads tasks.
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // loads tasks by name
  getTasksByName(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map((name) =>
        name.sort((a1: Task, a2: Task) => {
          if (a1.title.toLowerCase() < a2.title.toLowerCase()) return -1;
          if (a1.title.toLowerCase() > a2.title.toLowerCase()) return 1;
          return 0;
        })
      )
    );
  }

  // by date
  getTaskByDate(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map((name) =>
        name.sort((a1: Task, a2: Task) => {
          if (a1.due_date < a2.due_date) return -1;
          if (a1.due_date > a2.due_date) return 1;
          return 0;
        })
      )
    );
  }

  // deletes
  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  // updates <---- not functional in UI yet but a future additional (adding/subtracting tags)
  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  // adds
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }
}
