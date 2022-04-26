import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AlphService {
  private showAlp: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleAlph(): void {
    this.showAlp = !this.showAlp;
    this.subject.next(this.showAlp)
  }

  onAlphToggle(): Observable<any> {
    return this.subject.asObservable();
  }

}